const getImage = function(image_id, size) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.png`
}

const searchGame = function(input) {
  return router.get("/games", (req, res) => {
    db.query(`SELECT * FROM games WHERE name LIKE %${input}%;`)
      .then((data => {
        res.json(data.rows);
      }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
};


