require("dotenv").config();
const request = require('request');
const Express = require('express');
const App = Express();
const axios = require('axios');
const BodyParser = require('body-parser');
const PORT = 8000;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

//connection to ElephantSQL
const { Client } = require('pg')

const dbParams = require('../lib/db.js');
const db = new Client(dbParams);
db.connect()
  .then(res => {
    console.log("connected")
  })
  .catch(err => console.error('query error', err.stack));

const routes = require('../routes/routes')
const userAuthRoutes = require('../routes/userAuthRoutes')

App.use("/api", routes(db));
App.use("/api", userAuthRoutes(db));

const getToken = function() {
  axios({
    url: process.env.TOKEN_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  })
    .then((res) => {
      console.log("SUCCESS");
      const token = res.data.access_token;
      console.log("!@#!@#!@", token);
      return token;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

getToken()

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

