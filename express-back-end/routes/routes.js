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

  router.get('/topReviews/game', (req,res) => {
    const gameId = req.query.gameId

    db.query(
    `SELECT reviews.id AS review_id, reviews.game_id AS game_id, COALESCE(tab.like + tab.hmm + tab.haha, 0) AS total
      FROM reviews
      LEFT JOIN (
      SELECT review_id,
        COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
        COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
        COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha"
      FROM likes
      GROUP BY review_id
      ) tab
      ON reviews.id = tab.review_id
      WHERE reviews.game_id = ${gameId}
      ORDER BY total DESC;`)
      .then((data => {
        !data.rows[0] && res.json(data.rows)
        const reviewId = data.rows.map(element => element.review_id).toString()
        data.rows[0] && 
          db.query(
            `SELECT reviews.id, reviews.game_id AS game_id, reviews.content, reviews.rating, users.username AS username, reviews.user_id AS user_id, games.name AS name, games.cover AS cover, COALESCE(tab.like, 0) AS like, COALESCE(tab.hmm, 0) AS hmm, COALESCE(tab.haha, 0) AS haha, COALESCE(tab.like+tab.hmm+tab.haha, 0) AS total
              FROM reviews
              LEFT JOIN (
              SELECT review_id,
                COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
                COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
                COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha"
              FROM likes
              GROUP BY review_id
              ) tab ON reviews.id = tab.review_id
              JOIN games on (reviews.game_id = games.id)
              JOIN users ON (reviews.user_id = users.id)
              WHERE reviews.game_id = ${gameId} AND reviews.id IN (${reviewId})
              GROUP BY reviews.id, users.username, games.name, games.cover, tab.like, tab.hmm, tab.haha
              ORDER BY total DESC;`
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

  //route to get names of all followed users
  router.get('/followedNames', (req, res) => {
    db.query(`
      SELECT users.username
      FROM users
      INNER JOIN followers
      ON users.id=followers.user_id
      WHERE followers.follower_id = ${req.query.userId}
    `)
    .then((data => {
      res.json(data.rows);
    }))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
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
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //user_game_relationship stats based on games, liked, played, play_list
  router.get('/gameuserstats', (req,res)=> {
    const gameId = req.query.gameId
    db.query(`
      SELECT 
      game_id AS id,
      COUNT(*) FILTER (WHERE liked = 'TRUE') AS "liked",
      COUNT(*) FILTER (WHERE played = 'TRUE') AS "played",
      COUNT(*) FILTER (WHERE play_list = 'TRUE') AS "play_list"
      FROM user_game_relationships WHERE game_id = ${gameId}
      GROUP BY game_id;
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

  router.get('/comment/like', (req, res) => {
    const reviewId = req.query.review_id;
    const userId = req.query.user_id;
    db.query(`SELECT type FROM likes WHERE (review_id = ${reviewId} AND user_id = ${userId});`)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  // route for like buttons
  router.post('/comment/like', (req, res) => {
    const reviewId = req.body.params.review_id;
    const userId = req.body.params.user_id;
    const likeType = req.body.params.likeType;
    let query = `INSERT INTO likes (user_id, review_id, type) VALUES (${userId}, ${reviewId}, '${likeType}');`;
    let findid = `SELECT id FROM likes WHERE (user_id = ${userId} AND review_id = ${reviewId} AND type = '${likeType}');`;
    db.query(findid)
    .then((data => {
      if (data.rows.length === 0) {
        db.query(query)
        .then((data) => {
          db.query(`SELECT type FROM likes WHERE (review_id = ${reviewId} AND user_id = ${userId});`)
          .then(data => {
            res.json(data.rows);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });    
      } else {
        let repeatsArray = [];
        data.rows.forEach(element => {
          repeatsArray.push(element.id);
        });
        db.query(`DELETE FROM likes WHERE id IN (${repeatsArray });`)
        .then((data) => {
          db.query(`SELECT type FROM likes WHERE (review_id = ${reviewId} AND user_id = ${userId});`)
          .then(data => {
            res.json(data.rows);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        })      
      }}))
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

  //route to add new review

  router.post('/review/new', (req, res)=>{
    const gameId = req.body.params.gameId;
    const userId = req.body.params.userId;
    const review = req.body.params.review;
    const rating = req.body.params.rating;

    db.query(`
      INSERT INTO reviews (user_id, game_id, content, rating) VALUES (${userId}, ${gameId}, '${review}', ${rating})
    `).then((data => {
      res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  //route to retrieve user like and follow game data
  router.get('/user/gameLikeFollow', (req, res)=>{
    const userId = req.query.userId
    const gameId = req.query.gameId
    db.query(`
      SELECT * FROM user_game_relationships WHERE user_id = ${userId} AND game_id=${gameId}
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


  //route to like or unlike game
  router.post('/user/likeUnlikeGame', (req,res)=>{
    const gameId = req.body.params.gameId;
    const userId = req.body.params.userId;
    const likeUnlike = req.body.params.likeUnlike;
    //update the db, if this row does not exist, the update will not work and then insert will work, insert will not work if row already exist
    db.query(`
      UPDATE user_game_relationships SET liked=${likeUnlike} WHERE user_id=${userId} AND game_id=${gameId};
      INSERT INTO user_game_relationships (user_id, game_id, liked, played, play_list) SELECT ${userId}, ${gameId}, ${likeUnlike}, false, false WHERE NOT EXISTS (SELECT * FROM user_game_relationships WHERE user_id=${userId} AND game_id=${gameId});
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
  //route to played or not played game
  router.post('/user/playedNotPlayedGame', (req,res)=>{
    const gameId = req.body.params.gameId;
    const userId = req.body.params.userId;
    const playedNotPlayed = req.body.params.playedNotPlayed;
    db.query(`
      UPDATE user_game_relationships SET played=${playedNotPlayed} WHERE user_id=${userId} AND game_id=${gameId};
      INSERT INTO user_game_relationships (user_id, game_id, liked, played, play_list) SELECT ${userId}, ${gameId}, false, ${playedNotPlayed}, false WHERE NOT EXISTS (SELECT * FROM user_game_relationships WHERE user_id=${userId} AND game_id=${gameId});
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

  //top reviews with the most like, hmm and haha
  router.get('/user/topReviews', (req,res) => {
    const userId = req.query.userId
    db.query(
      `SELECT reviews.id AS review_id, reviews.game_id AS game_id, reviews.user_id, COALESCE(tab.like + tab.hmm + tab.haha, 0) AS total
        FROM reviews
        LEFT JOIN (
        SELECT review_id,
          COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
          COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
          COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha"
        FROM likes
        GROUP BY review_id
        ) tab
        ON reviews.id = tab.review_id
        WHERE reviews.user_id = ${userId}
        ORDER BY total DESC;`)
        .then((data => {
          !data.rows[0] && res.json(data.rows)
          const reviewId = data.rows.map(element => element.review_id).toString()
          data.rows[0] && 
            db.query(
              `SELECT reviews.id, reviews.user_id, reviews.game_id, reviews.content, reviews.rating, users.username, games.name, games.cover, COALESCE(tab.like, 0) AS like, COALESCE(tab.hmm, 0) AS hmm, COALESCE(tab.haha, 0) AS haha, COALESCE(tab.like+tab.hmm+tab.haha, 0) AS total
                FROM reviews
                LEFT JOIN (
                SELECT review_id,
                  COUNT(*) FILTER (WHERE likes.type = 'like') AS "like",
                  COUNT(*) FILTER (WHERE likes.type = 'hmm') AS "hmm",
                  COUNT(*) FILTER (WHERE likes.type = 'haha') AS "haha"
                FROM likes
                GROUP BY review_id
                ) tab ON reviews.id = tab.review_id
                JOIN games on (reviews.game_id = games.id)
                JOIN users ON (reviews.user_id = users.id)
                WHERE reviews.user_id = ${userId} AND reviews.id IN (${reviewId})
                GROUP BY reviews.id, users.username, games.name, games.cover, tab.like, tab.hmm, tab.haha
                ORDER BY total DESC;`
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

router.get('/user/followed', (req, res) => {
  const userId = req.query.userId
  db.query(`
    SELECT user_id FROM followers WHERE follower_id = ${userId}
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

  return router  
}