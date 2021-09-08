import React from 'react';

import UserProfile from './ProfilePage/UserProfile'
import FeaturedGame from './GameBox/FeaturedGames';
import TopReviews from './Reviews/TopReviews'

import useUserInfo from './hooks/useUserInfo';

import Spinner from 'react-bootstrap/Spinner'

import "./Profile.scss"
import { useParams } from 'react-router-dom';

import UserProfile from "./ProfilePage/UserProfile";
import FeaturedGame from "./GameBox/FeaturedGames";
import TopReviews from "./Reviews/TopReviews";

import useUserInfo from "./hooks/useUserInfo";

import "./Profile.scss";
import { useParams } from "react-router-dom";

export default function Profile() {
  //get the id from url
  const { name } = useParams();
  const {state} = useUserInfo(name);
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
      <div className="userPageReviews">
        {state.topReviews && <TopReviews reviews={state.topReviews} />}
        {!state.topReviews[0] && (
          <p>
            You have not written any reviews! Write a review to feature on your
            profile page!
          </p>
        )}
      </div>
    </div>
    }
    </>
  );
}
