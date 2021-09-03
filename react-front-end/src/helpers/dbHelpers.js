const axios = require('axios');

const getImage = function(image_id, size) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.png`
}

const searchGame = function(text) {
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
  
  const grabGameById = function(id) {
    return axios.get(`/api/gameId`, {
      params: { 
        input: id 
      }
    })
      .then((res => {
        console.log("DBHELPERS GRABGAMEFUNCTION", res.data)
        return res.data
      }))
      .catch(err => {
        console.log("ERROR", err.message)// .json({ error: err.message });
      });
    }; 

    // grabGameById(2928)


  export { searchGame, getImage, grabGameById }



