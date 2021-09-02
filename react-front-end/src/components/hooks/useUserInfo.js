import { useState, useEffect } from "react";
import axios from 'axios';

export default function useUserInfo(userId) {
  const [state, setState] = useState({

  })

  useEffect(()=>{
    axios.get('api/user')
  }, [])

  return { state }
}
