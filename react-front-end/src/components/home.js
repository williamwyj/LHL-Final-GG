import React from 'react';
import axios from 'axios';
import "./Home.scss"

import GameBox from "./HomePage/GameBox/GameBox"
import TopReviews from "./HomePage/TopReviews"

import useApplicationData from './hooks/useApplicationData';

export default function Home() {
  const { state } = useApplicationData();
  // const fetchData = () => {
  //   axios.get('/api/games') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API
  //   }) 
  // }

  
  return (
    <div className="App">
      <div className="homePageGamesTitle">
        What's Hot This Week
      </div>
      <div className="featured">
        {state.games.map((game) => {
          return <GameBox key={game.id} id={game.id} title={game.title} description={game.description} platform={game.platform} cover={game.cover} />
        })}
      </div> 
      <div className="topReviewsUsers">
        <ul className="topReviews">
          {state.reviews.map((review) => {
            return <TopReviews key={review.id} userId={review.user_id} username={review.username} gameId={review.game_id} gameTitle={review.title} gameCover={review.cover} content={review.content} rating={review.rating} like={review.like} hmm={review.hmm} haha={review.haha} />
          })}
        </ul>
        <div className="topUsers">
        
        </div>  
      </div>
       
    </div>
  );
  
}

