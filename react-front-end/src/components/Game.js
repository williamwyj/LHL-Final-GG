import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Game.scss"
import { useParams } from 'react-router-dom';
import { grabGameById } from '../helpers/dbHelpers';

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

  return (
    <div>
      <h1>Game ID is { id }</h1>     
      <h2>Game name is { game.name }</h2>
    </div>
  )
}

