import React from 'react';

import UserProfile from './ProfilePage/UserProfile'
import GameBox from "./HomePage/GameBox/GameBox"
import useUserInfo from './hooks/useUserInfo';

import "./Profile.scss"
import { useParams } from 'react-router-dom';




export default function Profile() {
  //get the id from url
  const { name } = useParams();
  const {state} = useUserInfo(name);
  return (
    <div>
      <UserProfile thumbnail={state.thumbnail} id={state.id} username={state.username} followers={state.followers} followerNames={state.followerNames} followed={state.followed} reviews={state.reviews}/>
      <div className="featured">
        {state.games.map((game) => {
          return <GameBox key={game.id} id={game.id} title={game.name} description={game.summary} platform={game.platform} cover={game.cover} />
        })}
      </div>      
    </div>
  );
}