import { useState, useEffect } from "react";
import axios from 'axios';

export default function useGameUserStats(gameId) {

  //game argument passed in is a game id
  const [state, setState] = useState({
    id:0,
    liked:0,
    play_list:0,
    played:0
  });
  useEffect(()=>{axios.get(`api/gameuserstats`, {
    params: {
      gameId
    }
  }).then((data)=>{
    if(data.data[0]) {
      setState(data.data[0])
    }
  })},[])
  

  return {state}
}