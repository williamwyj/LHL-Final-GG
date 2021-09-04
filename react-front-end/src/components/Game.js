import React, { useState, useEffect } from 'react';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById, grabTopReviewsById } from '../helpers/dbHelpers';
import StarRating from './ProfilePage/StarRating';


export default function Game() {
  const [game, setGame] = useState({
    gameData : {},
    reviewsData: []

  })
  const { id } = useParams();
  // let game = ''
  // state of star rating
  const [rating, setRating] = useState(0);
  // color of star rating
  const color = {
    filled : "#f5eb3b",
    unfilled: "#DCDCDC"
  }

  useEffect(() => {
    Promise.all([
      grabGameById(id),
      grabTopReviewsById(id)
    ]).then((all)=>{
      const gameData = all[0][0]
      const reviewsData = all[1]
      setGame({gameData, reviewsData})
    })
  }, []);
  console.log("Game data, ", game)

  return (
    <div>
      <h1>Game ID is { id }</h1>     
      <h2>Game name is { game.gameData.name }</h2>
      {game.reviewsData.map(review => {
        return <div>
          <p>{review.username}</p>
          <p>{review.content}</p>
          <p>{review.rating}</p>
          </div>
      })}
      <StarRating count={10} rating={rating} onRating={rate => setRating(rate)} color={color}/>
    </div>
  )
}

