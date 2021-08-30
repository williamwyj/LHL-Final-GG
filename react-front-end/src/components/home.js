import React from 'react';
import axios from 'axios';
import "./home.scss"

import GameBox from "./HomePage/GameBox/GameBox"

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
      <h1>Home Page</h1>
      <button>
        Fetch Data Home Page
      </button>    
      <section className="topGames">
        {state.games.map((game) => {
          console.log(game);
        return <GameBox key={game.id} id={game.id} title={game.title} description={game.description} platform={game.platform} cover={game.cover} />
        })}
      </section> 
      <section className="topReviews">

      </section>   
    </div>
  );
  
}

