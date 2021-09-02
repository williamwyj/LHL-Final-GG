import { useState } from 'react';

//custom hook to get, set and remove token

export default function useToken() {
  //get token from session storage
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    //if token exist then return the token
    if (userToken) return userToken.token;
  }
  //get username from session storage
  const getUsername = () => {
    const usernameString = sessionStorage.getItem('username');
    const username = JSON.parse(usernameString);
    //if token exist then return the token
    if (username) return username.username;
  }
  
  //invoke getToken, if there is no token then token set to undefined
  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState(getUsername());
  //for logging in, save new token and set state to new token
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };
  const saveUsername = username => {
    sessionStorage.setItem('username', JSON.stringify(username));
    setUsername(username.username);
  }
  //for logging out, remove token from session storage and set state token to undefined.
  const removeToken = () => {
    sessionStorage.removeItem('token');
    setToken();
  }
  const removeUsername = () => {
    sessionStorage.removeItem('username');
    setUsername();
  }
  return {
    setToken: saveToken,
    token,
    removeToken,
    setUsername: saveUsername,
    username,
    removeUsername
  }
}