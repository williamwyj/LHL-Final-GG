import React from "react"
import { Link } from "react-router-dom"

import "./GameBox.scss"

export default function gameBox(props) {
  return (
  <Link to={`/game/${props.id}`}>
    <div className="homePageFeaturedGame">
      <img className="homePageGameCover" src={props.cover} alt={props.name}/>
    </div>
  </Link>
  )
}