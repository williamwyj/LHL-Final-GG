import React from "react"
import { Link } from "react-router-dom"

import "./TopUsers.scss"

export default function TopUsers(props) {
  return (
  <li className="homePageTopUsers">
    User ID
    {props.user_id}
    User Name
    {props.username}
    Followers
    {props.followers}
  </li>
  )
}