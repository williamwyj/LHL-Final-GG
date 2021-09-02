import React from "react"
import { Link } from "react-router-dom"

import "./GameBox.scss"
import useGameStats from "./hooks/useGameLikes"

export default function gameBox(props) {

  const { state } = useGameStats(props.id)

  return (
  <Link to={`/game/${props.id}`}>
    <div className="homePageFeaturedGame">
      <img className="homePageGameCover" src={props.cover} alt={props.name}/>
    </div>
  </Link>
  )
}