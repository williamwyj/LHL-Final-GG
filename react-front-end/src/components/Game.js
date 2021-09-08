import React, { useState, useEffect, useContext } from 'react';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { getUserId, grabGameById, grabTopReviewsById, grabUserGameLikeFollow } from '../helpers/dbHelpers';

//import context
import { authContext } from "../providers/AuthProvider";

//components for the GameInformation container
import Review from "./GamePage/Review"
import GameDescription from './GamePage/GameDescription';
import UserButtons from './GamePage/UserButtons';

import Screenshots from './GamePageComponents/Screenshots';

import TopReviews from './Reviews/TopReviews';

export default function Game(props) {

  //import context
  const { username, token } = useContext(authContext)

  const [game, setGame] = useState({
    gameData : {},
    reviewsData: [],
    userGameData : {},
    load: true
  })
  
  const [date, setDate] = useState('')
  const [shots, setShots] = useState([1])

  const { id } = useParams();
  const [reviewInputMode, setReviewInputMode] = useState("GameDescription")
  // let game = ''
  // state of star rating
  
  useEffect(() => {

    if (username) {
      getUserId(username).then((data)=>{
        const userId = data[0].id
        Promise.all([
          grabGameById(id),
          grabTopReviewsById(id),
          grabUserGameLikeFollow(userId,id),
        ]).then((all)=>{
          const gameData = all[0][0]
          const reviewsData = all[1]
          const {liked, played, user_id} = all[2][0] ? all[2][0] : {liked:false, played:false, user_id : userId}
          const date = new Date(all[0][0].first_release_date * 1000)
          const year = date.getFullYear()
          setDate(year)
          setShots(all[0][0].screenshots)
          setGame({gameData, reviewsData, userGameData : {liked, played, user_id}, load:false})
        }).catch(err => {
          console.log("ERROR", err.message)// .json({ error: err.message });
        });
      }).catch(err => {
        console.log("ERROR", err.message)// .json({ error: err.message });
      });
    } else if (!username) {
      Promise.all([
        grabGameById(id),
        grabTopReviewsById(id),
      ]).then((all)=>{
        const gameData = all[0][0]
        const reviewsData = all[1]
        const date = new Date(all[0][0].first_release_date * 1000)
        const year = date.getFullYear()
        setDate(year)
        setShots(all[0][0].screenshots)
        setGame({gameData, reviewsData, load:false})
      }).catch(err => {
        console.log("ERROR", err.message)// .json({ error: err.message });
      });
    }

  }, [reviewInputMode, game.load]);


  if(typeof game != 'object'){
    return null
  }

  return (
    <>
    {game.load && 
      <div className="loadingSpinner">
        <Spinner animation="border" role="status" variant="light" >
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      </div>  
    }
    {!game.load && 
    <div className="main-container">
      <div className="game-info">
        <div className="cover">
          <img className="cover-img" src={game.gameData.cover} alt={game.gameData.name}/>
        </div>
        <div className="game-details">
          <div className="top">
            <h2 >{ game.gameData.name }</h2>
            <h4>{date}</h4>
          </div>
              {reviewInputMode === "WriteReview" && <Review gameId={id} setReviewInputMode={setReviewInputMode}/>}
              {reviewInputMode === "GameDescription" && <GameDescription gameDescription={game.gameData.summary} />}
          <div className="bottom">
          </div>
        </div>
        <div className = "user-game-interactions">
          <div className="UserButtons">
          {username && <UserButtons 
            token={token}
            userId={game.userGameData.user_id}
            gameId={id}
            writeReview={()=>setReviewInputMode("WriteReview")} 
            hideWriteReview={()=>setReviewInputMode("GameDescription")}
            userLiked={game.userGameData.liked}
            userPlayed={game.userGameData.played}
          />}
          {!username && <p className="user-game-interaction-text">Login to review and Like a Game</p>}
        </div>
      </div>
      </div>
      <div className="carousel">
    <Carousel fade interval={1000} controls={false}>
    <Carousel.Item>
        <img
          className="slideshow-image"
          src={shots[0]}
        />
      </Carousel.Item>
    <Carousel.Item>
        <img
          className="slideshow-image"
          src={shots[1]}
        />
      </Carousel.Item>
    <Carousel.Item>
        <img
          className="slideshow-image"
          src={shots[2]}
        />
      </Carousel.Item>
    </Carousel>
    </div>
      {!game.reviewsData[0] && <p>No reviews for this game have been made yet</p>}
      {game.reviewsData[0] && <TopReviews reviews={game.reviewsData} />}
      
    
    </div>
    }
    </>
  )
}

