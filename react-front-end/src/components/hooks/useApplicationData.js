import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios';



export default function useApplicationData() {
  const [state, setState] = useState({
    games: [],
    reviews: []
  })

  const setHomeData = function(homePageData) {
    const games = homePageData;
    return {...state, games}
  }

  useEffect(()=>{
    Promise.all([
      axios
        .get('api/games')
    ]).then((all) => {
      // get only first 4 games for home page display
      const homepageGame = all[0].data.slice(0,4)
      setState(setHomeData(homepageGame))
    })
  }, [])

  return { state }
}