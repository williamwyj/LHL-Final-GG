import { useState, useEffect } from "react";
import axios from 'axios';
import emptyBoxArt from "../image/EmptyBoxArt.png"

export default function useUserInfo(username) {
  const [state, setState] = useState({
    id: 0,
    username,
    thumbnail: '',
    reviews: 0,
    followers: 0,
    followerNames: [],
    followed: 0,
    games: []
  })
  useEffect(()=>{
    axios.get('/api/userId', {
      params: {
        username
      }
    }).then((data)=>{
      const userId = data.data[0].id
      Promise.all([
        //get username information including name, thumbnail, # of reviews
        axios.get("/api/user", {
          params: {
            userId
          }
        }),
        //get user number of followers, how many others the user follows
        axios.get("/api/user/followStats", {
          params: {
            userId
          }
        }),
        // get user liked games
        axios.get("/api/user/favoritegames", {
          params: {
            userId
          }
        }),
        axios.get("/api/user/followers", {
          params: {
            userId
          }
        }),
        axios.get("/api/user/reviewStats", {
          params: {
            userId
          }
        }),
        axios.get("/api/user/topReviews", {
          params: {
            userId
          }
        })
      ]).then((all)=>{
        const {id, thumbnail} = all[0].data[0]
        const {followers}= all[1].data[0].rows[0] ? all[1].data[0].rows[0] : {followers : 0};
        const {followed} = all[1].data[1].rows[0] ? all[1].data[1].rows[0] : {followed : 0};
        const games = all[2].data;
        const followerNames = all[3].data[0] ? all[3].data : [];
        const {reviews} = all[4].data[0] ? all[4].data[0] : {reviews : 0};
        const topReviews = all[5].data
        if (games.length < 4) {
          //if user liked less than 4 games, fill in with prompt to add games
          for (let i = games.length; i < 4 ; i++) {
            games.push({
              id : i,
              name : "noGame",
              cover: emptyBoxArt
            });
          }
        }
        setState({...state, id, thumbnail, reviews, followers, followed, games, followerNames, topReviews})
      }).catch(err => {
        console.log(err);
      })
    }) 
  }, [])

  return { state }
}
