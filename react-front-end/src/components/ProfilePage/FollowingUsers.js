import Axios from "axios";
import React, { useState } from "react"
import useUserInfo from "../hooks/useUserInfo";

import "./FollowingUsers.scss"

export default function FollowingUsers(props) {
  console.log(props.follower)
  const {state} = useUserInfo(props.follower)

  return (
  <li className="homePageTopUsers">
    <img id="usericon" src ={state.thumbnail} alt="userimg"/>
    <a href={`/user/${props.follower}`}> {props.follower}</a>
    <div> Reviews: {state.reviews} </div>
    <div> Followers: {state.followers} </div>
  </li>
  )
}