const axios = require('axios')


// function to receive the access token from Twitch
// I read that it's good practice to leave the access token obscured
const getToken = async function() {
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
const platformMatch = function (id) {
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

*/
const coverImageSizing = function(image_id, size) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${image_id}.png`
}

//pass in search input for a game
const searchGame = async function(input) {
  const token = await getToken() 
  console.log('token:', token)
    // const token = variable;
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
        response.data.map(arr => { return arr});
        // console.log("?????????", response.data.map(arr => arr.cover));
        // response.data.forEach(arr => coverFind(arr.cover));
        // console.log('????????', response.data.forEach(arr => (console.log(arr.genres))));
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

console.log(searchGame('mario'));

// export { coverMatch, searchGame };
