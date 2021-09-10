import Axios from "axios";
import React, { useState } from "react"

import "./TopUsers.scss"

export default function TopUsers(props) {
  const userLink = `/user/${props.username}`;
  const [reviews, setReviews] = useState(0);
  const [icon, setIcon] = useState();
  Axios.get("/api/user/reviewStats", {
    params: {
      userId : props.userId
    }
  })
  .then(res => {
    setReviews(res.data[0].reviews);
  })
  .catch(err => {
    console.log(err);
  })
  Axios.get("/api/user", {
    params: {
      userId : props.userId
    }
  })
  .then(res => {
    setIcon(res.data[0].thumbnail);
  })
  return (
  <div className="homePageTopUsers">
    <img id="usericon" src ={icon} alt="userimg"/>
    <a className="userName" href={userLink}> {props.username}</a>
    <div> Reviews: {reviews} </div>
    <div> Followers: {props.followers} </div>
  </div>
  )
}