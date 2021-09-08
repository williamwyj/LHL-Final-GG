import React from 'react'
import "./GameDescription.scss"

const putInPlace = function(array){
  return array.map(value => `${value} `)
}

export default function GameDescription(props) {
  return (
    <span>
      {props.gameDescription}  
      <footer>
        {putInPlace(props.platforms)}
      </footer>
    </span>
  )
}