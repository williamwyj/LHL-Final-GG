require("dotenv").config();
const request = require("request");
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 3003;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

//connection to ElephantSQL
const { Client } = require('pg')

const dbParams = require('../lib/db.js');
console.log('dbparams: ', dbParams)
const db = new Client(dbParams);
db.connect()
  .then(res => {
    console.log("connected")
    console.log(res.rows)
  })
  .catch(err => console.error('query error', err.stack));

// function to receive the access token from Twitch
//good practice to leave the access token obscured
const getToken = (callback) => {
  const options = {
    url: process.env.TOKEN_URL,
    json: true,
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  };
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log("err", err);
    }
    callback(res)
  });
};

getToken(res => console.log('DIDIDIDID IT WORK', res.body.access_token))

const routes = require('../routes/routes')

App.use("/api", routes(db));



// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// App.get('/api/games', (req, res) => {
//   db.query('SELECT * FROM GAMES')
//     .then(data => res.json(data.rows))
// });

App.get('/api/user', (req, res) => res.json({
  message: "n0Sc0peG4MeR",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

