import Axios from 'axios';
import React, { useContext, useState } from 'react';
import { getUserId } from "../../helpers/dbHelpers";
import { authContext } from "../../providers/AuthProvider";
import {ButtonLike, ButtonUnlike} from './LikeButton';

export default function LikeButtons(props) {
  const [user_id, setUserId] = useState();
  const review_id = props.reviewId;
  const [liked, setLiked] = useState([]);
  const {token, username} = useContext(authContext);
  if (token && !user_id) {
    console.log("getting userid");
    getUserId(username)
    .then(res => {
      if (res.length > 0) {
        console.log("setting userid = ", res[0].id);
        setUserId(res[0].id);
        Axios.get("/api/comment/like", {
          params: {
            user_id: res[0].id,
            review_id 
          }
        })
        .then((response) => {
          let likes = [];
          response.data.forEach(element => {
            likes.push(element.type);
          });
          console.log("user's likes are ", likes);
          setLiked(likes);
          
        })
      }
    })
  }

  

  const onLike = event => {
    event.preventDefault();
    Axios.post("/api/comment/like", {
      params: {
        review_id,
        user_id,
        likeType: "like"
      }
    })
    .then((response) => {
      let likes = [];
      response.data.forEach(element => {
        likes.push(element.type);
      });
      setLiked(likes);
    })
  }

  const onHmm = event => {
    event.preventDefault();
    Axios.post("/api/comment/like", {
      params: {
        review_id,
        user_id,
        likeType: "hmm"
      }
    })
    .then((response) => {
      let likes = [];
      response.data.forEach(element => {
        likes.push(element.type);
      });
      setLiked(likes);
    })
  }

  const onHaha = event => {
    event.preventDefault();
    Axios.post("/api/comment/like", {
      params: {
        review_id,
        user_id,
        likeType: "haha"
      }
    })
    .then((response) => {
      let likes = [];
      response.data.forEach(element => {
        likes.push(element.type);
      });
      setLiked(likes);
    })
  }
  let likeButton = <ButtonLike type="like" likes={props.like} />
  let hmmButton = <ButtonLike type="hmm" likes={props.hmm} /> 
  let hahaButton = <ButtonLike type="haha" likes={props.haha} />
  if (token) {
    if (liked.includes("like")) {
      likeButton = <ButtonUnlike type="like" likes={props.like} action={onLike} />
    } else {
      likeButton = <ButtonLike type="like" likes={props.like} action={onLike} />
    }

    if (liked.includes("hmm")) {
      hmmButton = <ButtonUnlike type="hmm" likes={props.hmm} action={onHmm} />
    } else {
      hmmButton = <ButtonLike type="hmm" likes={props.hmm} action={onHmm} />
    }

    if (liked.includes("haha")) {
      hahaButton = <ButtonUnlike type="haha" likes={props.haha} action={onHaha} />
    } else {
      hahaButton = <ButtonLike type="haha" likes={props.haha} action={onHaha} />
    }
  }
 

  return (
    <div className='likes'>
      {likeButton}
      {hmmButton}
      {hahaButton}
    </div>
  )
}