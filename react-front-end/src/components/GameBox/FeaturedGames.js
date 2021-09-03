import React from "react"
import GameBox from "./GameBox"
import "./FeaturedGame.scss"

export default function FeaturedGame(props) {

  return (
  <div className="featured">
    {props.state.games.map((game) => {
      return <GameBox key={game.id} id={game.id} title={game.name} description={game.summary} platform={game.platform} cover={game.cover} />
    })}
  </div> 
  )
}