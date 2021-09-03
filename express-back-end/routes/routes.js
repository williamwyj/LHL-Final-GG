// This file is loaded in server.js into /api, all routes are prefixed with /api

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/games", (req, res) => {
    db.query("SELECT * FROM games LIMIT 10;")
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

  //get userID from username to be used in profile page
  router.get('/userId', (req,res)=>{
    const username = req.query.username
    console.log("username is ", username)
    db.query(`SELECT users.id FROM users WHERE users.username = '${username}';`)
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //route to get users information with input userId
  router.get('/user', (req,res) => {
    const userId = req.query.userId
    db.query(
      `SELECT * FROM users WHERE id=${userId};
      `)
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //route to get number of reviews for a user with input useId
  router.get('/user/reviewStats', (req, res) => {
    const userId = req.query.userId
    db.query(
      `SELECT users.id,
      COUNT(*) FILTER (WHERE ${userId} = reviews.user_id) AS reviews
      FROM users
      JOIN reviews ON users.id = reviews.user_id
      WHERE users.id = ${userId}
      GROUP BY users.id;
      `)
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.get('/user/followStats', (req, res) => {
    const userId = req.query.userId
    Promise.all([
      db.query(
        `SELECT user_id,
        COUNT(*) AS followers
        FROM followers
        WHERE user_id = ${userId}
        GROUP BY user_id;
        `
      ),
      db.query(
        `SELECT follower_id,
        COUNT(*) AS followed
        FROM followers
        WHERE follower_id = ${userId}
        GROUP BY follower_id;
        `
      )
    ]).then((all => {
      res.json(all);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    
  })

  router.get('/user/favoritegames', (req, res) => {
    const userId = req.query.userId
    db.query(`
      SELECT user_id, games.id, games.name, games.cover
      FROM games
      JOIN user_game_relationships ON games.id = user_game_relationships.game_id
      WHERE user_id = ${userId} AND user_game_relationships.liked = TRUE;
    `).then((data => {
      res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.get('/user/followers', (req, res) => {
    const userId = req.query.userId
    db.query(`
      SELECT follower_id AS id, users.username
      FROM followers
      JOIN users ON followers.follower_id = users.id
      WHERE user_id = ${userId};
    `).then((data => {
      res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  //route to add follower
  router.post('/user/follow', (req, res) => {
    const mainUserId = req.body.params.mainUserId;
    const followUserId = req.body.params.followUserId;
    db.query(`
      INSERT INTO followers (user_id, follower_id) VALUES (${followUserId}, ${mainUserId})
    `).then((data => {
      res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //route to delete follower

  router.post('/user/unfollow', (req, res) => {
    const mainUserId = req.body.params.mainUserId;
    const followUserId = req.body.params.followUserId;
    db.query(`
      DELETE FROM followers WHERE user_id = ${followUserId} AND follower_id = ${mainUserId};
    `).then((data => {
      res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router  
}