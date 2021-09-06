import React from "react";
import axios from "axios";
import "./Home.scss";

import FeaturedGame from "./GameBox/FeaturedGames";
import TopUsers from "./HomePage/TopUsers";

import useApplicationData from "./hooks/useApplicationData";
import TopReviews from "./Reviews/TopReviews";

export default function Home() {
  const { state } = useApplicationData();
  // const fetchData = () => {
  //   axios.get('/api/games') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API
  //   })
  // }

  return (
    <div className="App">
      <div className="home-intro-heading">
        <div className="title-line-left">
          <div className="word-holder">Good games are...</div>
        </div>
        <div className="title-line-right">
          <div className="word-holder">Trash </div>
          </div>
        <div className="title-line-right delayed">
          <div className="word-holder">Indie</div>
        </div>
        <div className="title-line-right delayed">
          <div className="word-holder">Indie</div>
          </div>
      </div>
      <div className="home-body">
        <div className="homePageGamesTitle">What's Hot This Week</div>
        <FeaturedGame state={state} />
        <div className="topReviewsUsers">
          <TopReviews reviews={state.reviews} />

          <ul className="topUsers">
            {state.users.map((user) => {
              return (
                <TopUsers
                  userId={user.user_id}
                  username={user.username}
                  followers={user.count}
                  thumbnail={user.thumbnail}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
