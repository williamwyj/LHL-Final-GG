import React, { useState, useEffect, useContext } from 'react';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { getUserId, grabGameById, grabTopReviewsById, grabUserGameLikeFollow } from '../helpers/dbHelpers';

//import context
import { authContext } from "../providers/AuthProvider";

//components for the GameInformation container
import Review from "./GamePage/Review"
import GameDescription from './GamePage/GameDescription';
import UserButtons from './GamePage/UserButtons';

export default function Game() {

  //import context
  const { username, token } = useContext(authContext)

  const [game, setGame] = useState({
    gameData : {},
    reviewsData: [],
    userGameData : {}

  })
  const { id } = useParams();
  const [reviewInputMode, setReviewInputMode] = useState("GameDescription")
  // let game = ''
  // state of star rating
  
  useEffect(() => {
    getUserId(username).then((data)=>{
      const userId = data[0].id
      console.log("UserId, ", userId)
      Promise.all([
        grabGameById(id),
        grabTopReviewsById(id),
        grabUserGameLikeFollow(userId,id),
      ]).then((all)=>{
        const gameData = all[0][0]
        const reviewsData = all[1]
        console.log("user game relationship", all[2][0])
        const {liked, played, user_id} = all[2][0]
        setGame({gameData, reviewsData, userGameData : {liked, played, user_id}})
      }).catch(err => {
        console.log("ERROR", err.message)// .json({ error: err.message });
      });
    }).catch(err => {
      console.log("ERROR", err.message)// .json({ error: err.message });
    });

    
  }, [reviewInputMode]);

  console.log(game)
  console.log("userGameData.liked, ", game.userGameData.liked)

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
          <UserButtons 
            token={token}
            userId={game.userGameData.user_id}
            gameId={id}
            writeReview={()=>setReviewInputMode("WriteReview")} 
            hideWriteReview={()=>setReviewInputMode("GameDescription")}
            userLiked={game.userGameData.liked}
            userPlayed={game.userGameData.played}

          />
        </div>
      </section>
      {game.reviewsData.map(review => {
        return <div className="GameReview" key={review.review_id}>
            <p>User {review.username}</p>
            <p>Review {review.content}</p>
            <p>Rating {review.rating}</p>
          </div>
      })}
    </div>
  )
}

