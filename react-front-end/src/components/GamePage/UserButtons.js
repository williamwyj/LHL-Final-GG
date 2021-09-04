import React, {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'

//import 3 buttons, 2 state for each button

//Write Review and Hide Write Review
import WriteReviewButton from "./WriteReviewButton"
import HideWriteReviewButton from "./HideWriteReviewButton"

//Like button and Unlike button
import LikeButton from "./LikeButton"
import UnlikeButton from "./UnlikeButton"

//Follow button and Unfollow button
import PlayedButton from './PlayedButton'
import NotPlayedButton from './NotPlayedButton'

export default function UserButtons(props) {
  const [state, setState] = useState({
    writeReview: "WriteReview",
    Like: props.userLiked,
    Played: props.userPlayed
  })
  useEffect(()=>{
    setState({
      ...state,
      Like: props.userLiked,
      Played: props.userPlayed

    })
  },[props.userLiked, props.userPlayed])
  console.log("UserButton props", props.userLiked)

  console.log("UserButton state, ", state)
  //Function to switch on write review and switch button to Hide Write Review
  const writeReviewState = () => {
    props.writeReview()
    setState({...state, writeReview:"HideWriteReview"})
  }

  //Function to swith off write review and switch button to Write Review
  const hideWriteReviewState = () =>  {
    props.hideWriteReview()
    setState({...state, writeReview:"WriteReview"})
  }

  //Function to Like and switch to Unlike Button
  const likeButtonState = () => {
    setState({...state, Like: false})
  }

  //Function to UnLike and switch to Like Button
  const unlikeButtonState = () => {
    setState({...state, Like: true})
  }

  //Function to Follow and switch to Unfollow Button
  const playedButtonState = () => {
    setState({...state, Played: false})
  }

  //Function to UnLike and switch to Like Button
  const notPlayedButtonState = () => {
    setState({...state, Played: true})
  }

  return (
    <div className="UserButtons" >
      {state.writeReview === "WriteReview" && <WriteReviewButton writeReviewState={writeReviewState} />}
      {state.writeReview === "HideWriteReview" && <HideWriteReviewButton hideWriteReview={hideWriteReviewState}/>}

      {state.Like === true && <LikeButton likeButtonState={likeButtonState}/>}
      {state.Like === false && <UnlikeButton unlikeButtonState={unlikeButtonState}/>}

      {state.Played === true && <PlayedButton playedButtonState={playedButtonState}/>}
      {state.Played === false && <NotPlayedButton notPlayedButtonState={notPlayedButtonState}/>}
    </div>
  )
}