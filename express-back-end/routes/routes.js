// This file is loaded in server.js into /api, all routes are prefixed with /api

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query("SELECT * FROM ;")
      .then((data => {
        res.json({ "data" : data.rows});
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router
}