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
    const newToken = makeToken(5)
    db.query(`UPDATE users SET token='${newToken}' WHERE username='${username}' AND password='${password}' RETURNING token;`)
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

  router.post('/logout', (req, res) => {
    const token = req.body.params.token;
    const username = req.body.params.user;
    console.log("Token is ", token)
    console.log("Username is", username)
    db.query(`UPDATE users SET token=NULL WHERE token='${token}' AND username='${username}'`)
      .then((data) => {
        console.log('db updated')
        res.status(201).json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post('/register', (req, res) => {
    const username = req.body.params.user;
    const password = req.body.params.password;
    db.query(`INSERT INTO users (username, password) VALUES ('${username}', '${password}')`)
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

 