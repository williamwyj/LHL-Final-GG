import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../../providers/AuthProvider";

import FollowButton from "./FollowButton";
import UnFollowButton from "./UnFollowButton";
import followFunctions from "./followFunctions";

import "./UserProfile.scss";

export default function UserProfile(props) {
  const { token, username } = useContext(authContext);
  const followerNames = props.followerNames.map(
    (follower) => follower.username
  );
  const { follow, unfollow } = followFunctions();

  //function for the follow button
  const onFollowSubmit = (event) => {
    event.preventDefault();
    follow(username, props.id).then(() => setFollowButton("UnFollowButton"));
  };
  //function for the unfollow button
  const onUnFollowSubmit = (event) => {
    event.preventDefault();
    unfollow(username, props.id).then(() => setFollowButton("FollowButton"));
  };

  const [followButton, setFollowButton] = useState("");

  useEffect(() => {
    followerNames.includes(username)
      ? setFollowButton("UnFollowButton")
      : setFollowButton("FollowButton");
  }, [followerNames.includes(username)]);

  return (
    <section className="container userprofile">
      <div className="profileimgname">
        <img
          className="profileimg"
          src={props.thumbnail}
          alt={props.username}
        />
          <div className="userName">{props.username}</div>
        {token &&
          !(props.username === username) &&
          followButton === "FollowButton" && (
            <FollowButton follow={onFollowSubmit} />
          )}
        {token &&
          !(props.username === username) &&
          followButton === "UnFollowButton" && (
            <UnFollowButton unfollow={onUnFollowSubmit} />
          )}
      </div>
      <div className="profilestats">
        <p>Reviews: {props.reviews}</p>
        <p>Followers: {props.followers}</p>
        <p>Following: {props.followed}</p>
      </div>
    </section>
  );
}
