import React from 'react'
import "./GameDescription.scss"

export default function GameDescription(props) {
  return (
    <div className="GameDescription">
      {props.gameDescription}
    </div>
  )
}