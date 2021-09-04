import React, { useState, useEffect } from 'react';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById, grabTopReviewsById } from '../helpers/dbHelpers';
import Review from "./GamePage/Review"


export default function Game() {
  const [game, setGame] = useState({
    gameData : {},
    reviewsData: []

  })
  const { id } = useParams();
  // let game = ''
  // state of star rating
  
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

  return (
    <div>
      <h1>Game ID is { id }</h1>     
      <h2>Game name is { game.gameData.name }</h2>
      {game.reviewsData.map(review => {
        return <div key={review.id}>
            
            <p>{review.username}</p>
            <p>{review.content}</p>
            <p>{review.rating}</p>
          </div>
      })}
      Review
      <Review gameId={id}/>
    </div>
  )
}

