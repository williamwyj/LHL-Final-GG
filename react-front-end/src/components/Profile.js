import React, { useState } from 'react';

import UserProfile from './ProfilePage/UserProfile'
import FeaturedGame from './GameBox/FeaturedGames';
import TopReviews from './Reviews/TopReviews'

import useUserInfo from './hooks/useUserInfo';

import Spinner from 'react-bootstrap/Spinner'

import "./Profile.scss"
import { useParams } from 'react-router-dom';
import FollowingUsers from './ProfilePage/FollowingUsers';
import Axios from 'axios';


export default function Profile() {
  //get the id from url
  const { name } = useParams();
  const {state} = useUserInfo(name);
  const [followings, setFollowing] = useState([]);
  Axios.get("/api/followedNames", {params: {userId: state.id}})
  .then(res => {setFollowing(res.data)})

  return (
    <>
    {state.load && 
      <div className="loadingSpinner">
        <Spinner animation="border" role="status" variant="light" >
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
      </div>  
    }
    {!state.load &&
    <div>
      <UserProfile
        thumbnail={state.thumbnail}
        id={state.id}
        username={state.username}
        followers={state.followers}
        followerNames={state.followerNames}
        followed={state.followed}
        reviews={state.reviews}
      />
      <FeaturedGame state={state} />  
      <div class="reviews-and-following">
        <div class="reviews">
          {state.topReviews && <TopReviews reviews={state.topReviews} />}
          {!state.topReviews[0] && <p>You have not written any reviews! Write a review to feature on your profile page!</p>}
        </div>
        <div class="following">
          {followings.map(following => <FollowingUsers follower={following.username}/>)}
        </div>
      
      </div>
    </div>
    }
    </>
  );
}
