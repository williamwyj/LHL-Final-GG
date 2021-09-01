import React from 'react';
import axios from 'axios';
import "./Game.scss"
import { useParams } from 'react-router-dom';

export default function Game(props) {
  //get the id from url
  const { id } = useParams();

  return (
    <div>
      <h1>Game ID is { id }</h1>     
    </div>
  );
}