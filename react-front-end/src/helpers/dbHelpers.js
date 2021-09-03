const axios = require('axios');

const getImage = function(image_id, size) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.png`
}

const searchGame = function(text) {
  console.log("$$$TEXT$$$", text)
  const value = text.toLowerCase()
  return axios.get("/api/search", {
    params: { 
      input: value 
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log(err)// .json({ error: err.message });
    });
  };


  export { searchGame, getImage }



