const axios = require('axios');
require("dotenv").config();
const corsProxy = require('cors-anywhere')

//to grab the access token from twitch
const getToken = function() {
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
      return token;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


/* size guide:
name_____________|size_________|Extra_________________
cover_small     	90 x 128    	Fit
screenshot_med  	569 x 320   	Lfill, Center gravity
cover_big       	264 x 374   	Fit
logo_med        	284 x 160   	Fit
screenshot_big  	889 x 500   	Lfill, Center gravity
screenshot_huge 	1280 x 720  	Lfill, Center gravity
thumb           	90 x 90     	Thumb, Center gravity
micro           	35 x 35     	Thumb, Center gravity
720p            	1280 x 720  	Fit, Center gravity
1080p           	1920 x 1080 	Fit, Center gravity

for image_id pass the 'cover.image_id' or 'screenshots.image_id' value
*/
const getImage = function(image_id, size) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.png`
}

//pass in search input for a game
const searchGame = function(input) {
    return axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        Accept: "application/json",
        'Client-ID': process.env.CLIENT_ID,
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
      data: `search "${input}"; fields name, summary, platforms.abbreviation, cover.*, screenshots.*; limit 5;`,
    })
      .then((response) => response.data)
      .catch((err) => err.message);
  };

const grabGameById = function(id) {
  return axios({
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    data: `where id = ${id}; fields name, summary, platforms.abbreviation, cover, screenshots.*, cover.*;`,
  })
  .then((response) => {
    response.data.map(arr => console.log(arr));
  })
  .catch((err) => {
    console.error(err.message);
  });
} 

// export { getImage, searchGame, grabGameById };