import React from 'react';
import axios from 'axios';

import UserProfile from './ProfilePage/UserProfile'
import "./Profile.scss"
import { useParams } from 'react-router-dom';

export default function Profile(props) {
  //get the id from url
  const { name } = useParams();
  
  return (
    <div>
      <h1>Profile is { name }</h1>
      <UserProfile />     
    </div>
  );
}