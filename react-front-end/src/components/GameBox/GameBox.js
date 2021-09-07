import React from "react"
import { Link } from "react-router-dom"

import "./GameBox.scss"
import useGameUserStats from "./hooks/useGameUserStats"

export default function gameBox(props) {

  const { state } = useGameUserStats(props.id)
  
  return (
  <Link to={`/game/${props.id}`}>
    <div className="gameBox">
      <img className="gameBox" src={props.cover} alt={props.name}/>
      {props.name!== "noGame" && <div className="overlay">
        <div className="gameStats">
          <p>Likes : {state.liked}</p>
          <p>Played : {state.played}</p>
          <p>On Play List : {state.play_list}</p>
        </div>
      </div>}
    </div>
  </Link>
  )
}