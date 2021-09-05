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
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
  }; 

const grabTopReviewsById = function(gameId) {
  return axios.get('/api/topReviews/game', {
    params: {
      gameId
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}

const getUserId = function(username) {
  return axios.get('/api/userId', {
    params: {
      username
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}

const submitReview = function(gameId, userId, review, rating) {
  return axios.post('/api/review/new', {
    params: {
      gameId,
      userId,
      review,
      rating
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}

const grabUserGameLikeFollow = function(userId, gameId) {
  return axios.get('/api/user/gameLikeFollow', {
    params: {
      userId,
      gameId,
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}

const likeUnlikeGame = function(userId, gameId, likeUnlike) {
  return axios.post('/api/user/likeUnlikeGame', {
    params: {
      userId,
      gameId,
      likeUnlike
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}

const playedNotPlayedGame = function(userId, gameId, playedNotPlayed) {
  return axios.post('/api/user/playedNotPlayedGame', {
    params: {
      userId,
      gameId,
      playedNotPlayed
    }
  })
    .then((res => {
      return res.data
    }))
    .catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });
}


    // grabGameById(2928)

  export { searchGame, getImage, grabGameById, grabTopReviewsById, getUserId, submitReview, grabUserGameLikeFollow, likeUnlikeGame, playedNotPlayedGame }




