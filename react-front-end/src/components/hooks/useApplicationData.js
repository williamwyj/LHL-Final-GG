import React, { useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData() {
  const [state, setState] = useState({
    games: [],
    reviews: []
  })

  const setHomeData = function(homePageGames, homepageReviews) {
    const games = homePageGames;
    const reviews = homepageReviews
    return {...state, games, reviews}
  }

  useEffect(()=>{
    Promise.all([
      axios
        .get('api/games'),
      axios
        .get('api/topReviews')
    ]).then((all) => {
      // get only first 4 games for home page display
      const homepageGames = all[0].data.slice(0,4)
      // get only first 3 top reviews for home page display
      const homepageReviews = all[1].data.slice(0,3)
      setState(setHomeData(homepageGames, homepageReviews))
    })
  }, [])

  return { state }
}