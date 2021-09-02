import { useState } from "react";
import axios from 'axios';

export default function useGameLikes(game) {

  //game argument passed in is a game id
  const [state, setState] = useState({});

  axios.get(`api/likes/${game}`).then((data)=>console.log(data.rows))

  return {state}
}