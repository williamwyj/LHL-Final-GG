import React from 'react';
import { createContext, useState } from 'react';
import axios from 'axios';
import useToken from "../components/hooks/useToken";

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "" });
  const {token, setToken, removeToken, setUsername, removeUsername} = useToken();

  const login = function (username, password) {
    const user = username;
    
    return axios.get("/api/login", {
      params: {
        user,
        password
      }
    })
    .then((token) => {
      setToken(token.data[0])
      setUsername({username: user})
      setAuth(true);
      setUserInfo({username})
      console.log("user is ", user)
      console.log("userInfo is", userInfo)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const logout = function(username, token) {
    const user = username;
    return axios.post("/api/logout", {
      params: {
        user,
        token
      }
    })
    .then(() => {
      removeToken();
      removeUsername();
      setAuth(false);
      setUserInfo({user: ""});
    })
    .catch(err => {
      console.log(err);
    })
    
  }

  const userData = {token, auth, userInfo, login, logout}

  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  )
};

export const authContext = createContext();