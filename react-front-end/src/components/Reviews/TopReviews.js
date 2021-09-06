import React, { useContext } from "react";
import "./TopReviews.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import LikeButtons from "./LikeButtons";

export default function TopReviews(props) {
  return (
    <div class="allReviewsBox">
      {props.reviews.map((review) => {
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
              <div className="review-info-top">
                <a class="username"href={userLink}> {review.username}</a>

                <div class="reviewContent">{review.content}</div>
              </div>

              {/* <hr /> */}
              <div class="ratings">
                <div class="ratingStars">
                  {ratingStars.map((isFilled) => {
                    if (isFilled) {
                      return <FontAwesomeIcon icon={faStar} />;
                    } else {
                      return <FontAwesomeIcon icon={emptyStar} />;
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

            <div class="gameDisplay">
              <div>
                <a href={gameLink}>
                  <img
                    class="homePageReviewGameCover"
                    src={review.cover}
                    alt={review.name}
                  />
                </a>
              </div>
              <div>
                <a href={gameLink}> {review.name} </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
