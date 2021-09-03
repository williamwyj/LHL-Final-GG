import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById, grabTopReviewsById } from '../helpers/dbHelpers';

export default function Game(props) {
  const [game, setGame] = useState("")
  const { id } = useParams();
  // let game = ''

  useEffect(() => {
    Promise.all([
      grabGameById(id),
      grabTopReviewsById(id)
    ]).then((all)=>{
      const gameData = all[0].data
      const reviewsData = all[0].data
      setGame({gameData, reviewsData})
    })
    
    // grabGameById(id)
    // .then((result) => {
    //   setGame(result[0])
    // });
  }, []);
  console.log("Game data, ", game)
  return (
    <div>
      <h1>Game ID is { id }</h1>     
      <h2>Game name is { game.name }</h2>
    </div>
  )
}

