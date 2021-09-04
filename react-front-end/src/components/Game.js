import React, { useState, useEffect } from 'react';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById, grabTopReviewsById } from '../helpers/dbHelpers';

//components for the GameInformation container
import Review from "./GamePage/Review"
import GameDescription from './GamePage/GameDescription';
import UserButtons from './GamePage/UserButtons';

export default function Game() {
  const [game, setGame] = useState({
    gameData : {},
    reviewsData: []

  })
  const { id } = useParams();
  const [reviewInputMode, setReviewInputMode] = useState("GameDescription")
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
  }, [reviewInputMode]);
  console.log(game)
  return (
    <div className="GamePage">
      <h1>Game ID is { id }</h1>     
      <h2>Game name is { game.gameData.name }</h2>
      <section className="GameInformation">
        <div className="GameCover">
          <img className="gameCover" src={game.gameData.cover} alt={game.gameData.name}/>
        </div>
        <div className="GameDescriptionReview" >
          {reviewInputMode === "WriteReview" && <Review gameId={id} setReviewInputMode={setReviewInputMode}/>}
          {reviewInputMode === "GameDescription" && <GameDescription gameDescription={game.gameData.summary} />}
        </div>
        <div className="UserButtons">
          <UserButtons writeReview={()=>setReviewInputMode("WriteReview")}/>
        </div>
      </section>
      {game.reviewsData.map(review => {
        return <div className="GameReview" key={review.review_id}>
            <p>User {review.username}</p>
            <p>Review {review.content}</p>
            <p>Rating {review.rating}</p>
          </div>
      })}
      Review
      
      
    </div>
  )
}

