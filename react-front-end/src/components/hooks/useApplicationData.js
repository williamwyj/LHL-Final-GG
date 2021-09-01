import React, { useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData() {
  const [state, setState] = useState({
    games: [],
    reviews: [],
    users: []
  })

  const setHomeData = function(homePageGames, homepageReviews, homepageUsers) {
    const games = homePageGames;
    const reviews = homepageReviews
    const users = homepageUsers
    return {...state, games, reviews, users}
  }

  useEffect(()=>{
    Promise.all([
      axios
        .get('api/games'),
      axios
        .get('api/topReviews'),
      axios
        .get('api/mostFollowedUsers')
    ]).then((all) => {
      // get only first 4 games for home page display
      const homepageGames = all[0].data.slice(0,4)
      // get only first 3 top reviews for home page display
      const homepageReviews = all[1].data.slice(0,3)
      // get only first 3 most followed users for home page display
      const homepageUsers = all[2].data.slice(0,3)
      setState(setHomeData(homepageGames, homepageReviews, homepageUsers))
    })
  }, [])

  return { state }
}