import React from "react";
import "./TopReviews.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import LikeButtons from "./LikeButtons";

export default function TopReviews(props) {

  return (
    <div className="allReviewsBox">
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
          <div className="userName"> 
            <a href={userLink}> <h5>{review.username}</h5></a>
          </div>
          
          <div className="reviewContent"> 
            {review.content}
          </div>
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
                <LikeButtons
                  reviewId={review.id}
                  like={review.like}
                  haha={review.haha}
                  hmm={review.hmm}
                />
              </div>
            </div>

            <div className="gameDisplay">
              <div>
                <a href={gameLink}>
                  <img
                    className="homePageReviewGameCover"
                    src={review.cover}
                    alt={review.name}
                  />
                </a>
              </div>
              <div className="titleOfReviewedGame">
                <a  href={gameLink}> {review.name} </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
