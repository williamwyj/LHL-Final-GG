require("dotenv").config();
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
  console.log(res)
})
.catch(err => console.error('query error', err.stack));





// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});