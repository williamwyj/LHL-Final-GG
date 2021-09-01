const express = require('express');
const router = express.Router();

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

  // router.get('/register', (req, res) => {
  //   console.log(req.query.user);
  //   console.log(req.query.password);
  // })

  return router;
}

// 