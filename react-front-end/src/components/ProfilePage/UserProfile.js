import React, {useContext,useEffect} from 'react';
import { authContext } from "../../providers/AuthProvider";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import useFollow from '../hooks/useFollow';
import FollowButton from './FollowButton';
import UnFollowButton from './UnFollowButton';
import followFunctions from './followFunctions';

import "./UserProfile.scss"



export default function UserProfile(props) {

  const { token, username } = useContext(authContext);
  const followerNames = props.followerNames.map(follower => follower.username)
  const { follow, unfollow } = followFunctions()
  //function for the follow button
  const onFollowSubmit = event => {
    event.preventDefault();
    follow(username, props.id).then(()=>transition("UnFollowButton"))
  }
  //function for the unfollow button
  const onUnFollowSubmit = event => {
    event.preventDefault();
    unfollow(username, props.id).then(()=>transition("FollowButton"))
  }
  const {mode, transition} = useFollow(followerNames.includes(username) ? "UnFollowButton" : "FollowButton")

  return (
    <section className="container userprofile">
      <div className="profileimgname"> 
        <img className="profileimg" src={props.thumbnail} alt={props.username} />
        {props.username}
        {token && !(props.username === username) && mode === "FollowButton" && <FollowButton follow={onFollowSubmit}/>}
        {token && !(props.username === username) && mode === "UnFollowButton" && <UnFollowButton unfollow={onUnFollowSubmit}/>}
      </div>
      <div className="profilestats">
          <p>Reviews: {props.reviews}</p>
          <p>Followers: {props.followers}</p>
          <p>Followed:{props.followed}</p>
      </div>
    </section>
  )
}