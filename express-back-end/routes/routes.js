// This file is loaded in server.js into /api, all routes are prefixed with /api

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/games", (req, res) => {
    db.query("SELECT * FROM games;")
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //top reviews with the most like, hmm and haha
  router.get('/topReviews', (req,res) => {
    db.query(
    `SELECT id, "like" + "hmm" + "haha" AS total FROM (
      SELECT 
        reviews.id AS id,
        COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
        COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
        COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha"
      FROM reviews JOIN likes ON (reviews.id = likes.review_id)
      WHERE likes.type IN ('like', 'hmm', 'haha')
      GROUP BY reviews.id
      ORDER BY reviews.id
    ) AS reviewlikes ORDER BY total DESC;`)
      .then((data => {
        const reviewId = data.rows.map(element => element.id).toString()
        db.query(
          `SELECT 
            reviews.id, reviews.user_id, reviews.game_id, reviews.content, reviews.rating, 
            COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
            COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
            COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha",
            users.username, games.name, games.cover
          FROM reviews 
          JOIN likes ON (reviews.id = likes.review_id)
          JOIN users ON (reviews.user_id = users.id)
          JOIN games ON (reviews.game_id = games.id)
          WHERE likes.type IN ('like', 'hmm', 'haha') AND reviews.id IN (${reviewId})
          GROUP BY reviews.id, users.username, games.name, games.cover;`
        )
          .then((data => {
            res.json(data.rows);
          }))
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      }))
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      
  })

  //top user, users with the most followers
  router.get('/mostFollowedUsers', (req,res) => {
    db.query(
      `SELECT user_id, users.username, count(*) FROM followers JOIN users ON user_id = users.id GROUP BY user_id, users.username ORDER BY count DESC;`
    )
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //search
  //easy refactor later on
  router.get('/search', (req, res) => {
    db.query(`SELECT * FROM games WHERE lower(name) LIKE ('%' || $1 || '%');`, [req.query.input])
    .then((data => {
      res.json(data.rows)
    }))
    .catch(err => {
      console.log(err.message)
      res.json({ error: err.message})
    });
  })
  
  //get specific game by Id 
  router.get("/gameId", (req, res) => {
    db.query("SELECT * FROM games WHERE id = $1;", [req.query.input])
      .then((data) => {
        console.log("ROUTES", data.rows)
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  
  return router  
}
