import { useState, useEffect } from "react";
import axios from 'axios';
import emptyBoxArt from "../image/EmptyBoxArt.png"

export default function useUserInfo(username) {
  const [state, setState] = useState({
    userId: 0,
    username,
    thumbnail: '',
    reviews: 0,
    followers: 0,
    followed: 0,
    games: []
  })
  useEffect(()=>{
    axios.get('/api/userId', {
      params: {
        username
      }
    }).then((data)=>{
      Promise.all([
        //get username information including name, thumbnail, # of reviews
        axios.get("/api/user", {
          params: {
            userId : data.data[0].id
          }
        }),
        //get user number of followers, how many others the user follows
        axios.get("/api/user/follow", {
          params: {
            userId : data.data[0].id
          }
        }),
        // get user liked games
        axios.get("/api/user/favoritegames", {
          params: {
            userId : data.data[0].id
          }
        }),
        //get other games incase user liked less than 4 games
        axios.get("/api/games", {
          params: {
            userId : data.data[0].id
          }
        })
      ]).then((all)=>{
        const {id, thumbnail, reviews} = all[0].data[0]
        const {followers}= all[1].data[0].rows[0]
        const {followed} = all[1].data[1].rows[0]
        // console.log("favorite games ", all[2].data)
        // console.log("games", all[3].data)
        const games = all[2].data;

        if (games.length < 4) {
          //if user liked less than 4 games, fill in with prompt to add games
          const noGame = {
            id : 0,
            name : "noGame",
            cover: emptyBoxArt
          }
          for (let i = games.length; i < 4 ; i++) {
            games.push(noGame)
          }
        }
        setState({...state, id, thumbnail, reviews, followers, followed, games})
      }).catch(err => {
        console.log(err);
      })
    }) 
  }, [])

  return { state }
}
