const express = require('express');
const router = express.Router();

//generate a token with random characters
function makeToken(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}


module.exports = (db) => {
  router.get('/login', (req, res) => {
    const username = req.query.user;
    const password = req.query.password;
    db.query(`SELECT token FROM users WHERE username='${username}' AND password='${password}';`)
      .then((token => {
        res.json(token.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    console.log(req.query.user);
    console.log(req.query.password);
  })

  router.post('/register', (req, res) => {
    console.log("username is ", req.body.params.user);
    console.log("password is ", req.body.params.password);
    const username = req.body.params.user;
    const password = req.body.params.password;
    const newToken = makeToken(5)
    console.log("new token is ", newToken)
    db.query(`INSERT INTO users (username, password, token) VALUES ('${username}', '${password}', '${newToken}') RETURNING token`)
      .then(token => {
        res.json(token.rows)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router;
}

 