const axios = require('axios')


// function to receive the access token from Twitch
// I read that it's good practice to leave the access token obscured
const getToken = function () {
  axios({
    url: process.env.TOKEN_URL,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    },
  })
    .then((res) => {
      console.log("SUCCESS");
      const token = res.data.access_token;
      console.log("!@#!@#!@", token);
      return token;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
//pass in a game's 'cover' prop to find it's cover art
const coverMatch = function (id) {
  axios({
    url: "https://api.igdb.com/v4/covers",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${res.body.access_token}`,
    },
    data: `fields url; where id = ${id};`,
  })
    .then((response) => {
      console.log("><><><><", response.data);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

//pass in search input for a game
const searchGame = function (input) {
  getToken().then((variable) => {
    //grab our token
    const token = variable;
    axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: `search "${input}"; fields name, platforms ,cover; limit 5;`,
    })
      .then((response) => {
        console.log("!!!!!!!!", response.data);
        // console.log("?????????", response.data.map(arr => arr.cover));
        // response.data.forEach(arr => coverFind(arr.cover));
        // console.log('????????', response.data.forEach(arr => (console.log(arr.genres))));
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
};

console.log(searchGame('mario'));

// export { coverMatch, searchGame };
