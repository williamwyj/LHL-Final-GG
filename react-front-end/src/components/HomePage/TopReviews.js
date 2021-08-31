import React from "react"
import { Link } from "react-router-dom"

import "./TopReviews.scss"

export default function TopReviews(props) {
  return (
  <li className="homePageFeaturedReviews">
    User ID
    {props.user_id}
    User Name
    {props.username}
    Game ID
    {props.gameId}
    Game Title
    {props.gameTitle}
    <img className="homePageReviewGameCover" src={props.gameCover} alt={props.gameTitle}/>
    Content
    {props.content}
    Rating
    {props.rating}
    Like
    {props.like}
    Hmm
    {props.hmm}
    Haha
    {props.haha}
  </li>
  )
}