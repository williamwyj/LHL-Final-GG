const express = require('express');
const router = express.Router();

module.exports = (db) => {

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

  

  return router  
}