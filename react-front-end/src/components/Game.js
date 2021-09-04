import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById } from '../helpers/dbHelpers';
import { Button, Carousel } from 'react-bootstrap'
import Screenshots from './GamePageComponents/Screenshots';

export default function Game(props) {
  const [game, setGame] = useState("")
  const [date, setDate] = useState('')
  const [shots, setShots] = useState([1])
  const { id } = useParams();
  // let game = ''

  useEffect(() => {
    grabGameById(id)
    .then((result) => {
      setGame(result[0])
      const date = new Date(result[0].first_release_date * 1000)
      const year = date.getFullYear()
      setDate(year)
      setShots(result[0].screenshots)
    })
  }, []);

  if(typeof game != 'object'){
    return null
  }
  


  return (
    <div className="main-container">
      <div className="game-info">
        <div className="cover">
          <img className="cover-img" src={game.cover}/>
        </div>
        <div className="game-details">
          <div className="top">
            <h2 >{ game.name }</h2>
            <h4>{date}</h4>
          </div>
            <span>{ game.summary }</span>
          <div className="bottom">
          </div>
        </div>
        <div className = "user-game-interactions">
          <span>buttons to like/review/follow the GAME</span>
            <Button className="btn"> submit review </Button> 
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
      <div>
        {/* plug in reviews component */}
      </div>
    </div>
  )
}

