import React from "react"

import "./GameBox.scss"

export default function gameBox(props) {
  return (
    <div class="homePageFeaturedGame">
      <img class="homePageGameCover" src={props.cover} alt={props.title} rounded />
    </div>
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