import React from "react"
import { Link } from "react-router-dom"

import "./TopReviews.scss"

export default function TopReviews(props) {
  return (
  <div class="homePageFeaturedGame">
    <img class="homePageGameCover" src={props.cover} alt={props.title} rounded />
  </div>
  )
}