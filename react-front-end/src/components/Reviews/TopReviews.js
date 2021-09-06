import React, { useContext } from "react";
import "./TopReviews.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar }  from "@fortawesome/free-regular-svg-icons";
import LikeButtons from "./LikeButtons";

export default function TopReviews(props) {
  console.log("TopReviews props, ", props)
  return (
    <div className="allReviewsBox">
    {!props.reviews[0] && <p>You have not written any reviews! Write a review to feature on your profile page!</p>}
    {props.reviews[0] && props.reviews.map(review => {
      const userLink = `/user/${review.username}`;
      const gameLink = `/game/${review.game_id}`;  
      let ratingStars = [];
      for (let i = 0; i < 10; i++) {
        if (i < review.rating) {
          ratingStars.push(true);
        } else {
          ratingStars.push(false);
        }
      }
      return (
        <div className="singleReviewBox">
        <div className="reviewInfo">
          <div> 
            <a href={userLink}> {review.username}</a>
          </div>
          
          <div className="reviewContent"> 
            {review.content}
          </div>
          <hr />
          <div className="ratings"> 
            <div className="ratingStars">
              {ratingStars.map(isFilled => {
                if (isFilled) {
                  return <FontAwesomeIcon icon={faStar} />
                } else {
                  return <FontAwesomeIcon icon={emptyStar}/>
                }
              })}
            </div>
            <LikeButtons reviewId={review.id} like={review.like} haha={review.haha} hmm={review.hmm}/>
          </div>    
        </div>

        <div className="gameDisplay">
          <div> 
            <img className="homePageReviewGameCover" src={review.cover} alt={review.name}/>
          </div>
          <div> 
            <a href={gameLink}> {review.name} </a>
          </div>
        </div>
        </div>
      )
    })}
    </div>
  )
}