import React from "react"


export default function gameBox(props) {
  
  return (
    <div>
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
    </div>
  )
}