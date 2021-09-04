import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById } from '../helpers/dbHelpers';
import { Button, Carousel } from 'react-bootstrap'

export default function Game(props) {
  const [game, setGame] = useState("")
  const { id } = useParams();
  // let game = ''

  useEffect(() => {
    grabGameById(id)
    .then((result) => {
      setGame(result[0])
    });
  }, []);

  // const screenshots = game.screenshots.map((img) =>
  //   <Carousel.Item interval={1000}>
  //     <img className="slideshow-image "src={game.screenshots[0]}/>
  //   </Carousel.Item>
  // )

  return (
    <div className="main-container">
      <div className="game-info">
        <div className="imgGallery">
          <img className="gallery-img" src={game.cover}/>
        </div>
        <div className="game-details">
          <div className="top">
            <h2 >{ game.name }</h2>
            <span>{ game.summary }</span>
          </div>
          <div className="bottom">
          </div>
        </div>
        <div className = "user-game-interactions">
          <span>buttons to like/review/follow the GAME</span>
            <Button className="btn"> submit review </Button> 
        </div>
      </div>
      <div>
        {/* plug in reviews component */}
      </div>
    </div>
  )
}

