import React from "react"
import { Link } from "react-router-dom"

import "./TopUsers.scss"

export default function TopUsers(props) {
  return (
  <li className="homePageTopUsers">
    <img src ={props.thumbnail}/>
    User Name
    {props.username}
    Followers
    {props.followers}
  </li>
  )
}