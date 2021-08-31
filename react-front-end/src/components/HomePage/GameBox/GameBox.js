import React from "react"
import { Link } from "react-router-dom"

import "./GameBox.scss"

export default function gameBox(props) {
  return (
  <Link to={`/game/${props.id}`}>
    <div class="homePageFeaturedGame">
      <img class="homePageGameCover" src={props.cover} alt={props.title} rounded />
    </div>
  </Link>
  )
}

{/* <div>
  Game ID
  {props.id}
  Game Title
  {props.title}
  Description
  {props.description}
  Platform
  {props.platform}
  Cover Art
  <img src={props.cover} alt="gameCover" />
</div> */}