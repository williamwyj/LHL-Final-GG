import React from "react";
import "./TopReviews.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar }  from "@fortawesome/free-regular-svg-icons";

 
export default function TopReviews(props) {
  

  return (
    <div class="allReviewsBox">
    {props.reviews.map(review => {
      const userLink = `/user/${review.user_id}`;
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
        <div class="singleReviewBox">
        <div class="reviewInfo">
          <div> 
            <a href={userLink}> {review.username}</a>
          </div>
          
          <div class="reviewContent"> 
            {review.content}
          </div>
          <hr />
          <div class="ratings"> 
            <div class="ratingStars">
              {ratingStars.map(isFilled => {
                if (isFilled) {
                  return <FontAwesomeIcon icon={faStar} />
                } else {
                  return <FontAwesomeIcon icon={emptyStar}/>
                }
              })}
            </div>
            <div class="rating">
              👍
              {review.like}
            </div>
            <div class="rating">
              🤔  
              {review.hmm}
            </div>
            <div class="rating">
              🤣
              {review.haha}
            </div>
          </div>    
        </div>

        <div class="gameDisplay">
          <div> 
            <img class="homePageReviewGameCover" src={review.cover} alt={review.name}/>
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