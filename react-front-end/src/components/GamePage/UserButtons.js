import React, {useState,useEffect} from 'react'
import { likeUnlikeGame, playedNotPlayedGame } from '../../helpers/dbHelpers'

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

//style
import './UserButtons.scss'

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
  },[props.userLiked, props.userPlayed  ])
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
    likeUnlikeGame(props.userId, props.gameId, true)
    setState({...state, Like: true})
  }

  //Function to UnLike and switch to Like Button
  const unlikeButtonState = () => {
    likeUnlikeGame(props.userId, props.gameId, false)
    setState({...state, Like: false})
  }

  //Function to Follow and switch to Unfollow Button
  const playedButtonState = () => {
    playedNotPlayedGame(props.userId, props.gameId, false)
    setState({...state, Played: false})
  }

  //Function to UnLike and switch to Like Button
  const notPlayedButtonState = () => {
    playedNotPlayedGame(props.userId, props.gameId, true)
    setState({...state, Played: true})
  }

  return (
    <div className="userButtons" >
      {props.token && state.writeReview === "WriteReview" && <WriteReviewButton writeReviewState={writeReviewState} />}
      {props.token && state.writeReview === "HideWriteReview" && <HideWriteReviewButton hideWriteReview={hideWriteReviewState}/>}

      {props.token && state.Like === false && <LikeButton likeButtonState={likeButtonState}/>}
      {props.token && state.Like === true && <UnlikeButton unlikeButtonState={unlikeButtonState}/>}

      {props.token && state.Played === true && <PlayedButton playedButtonState={playedButtonState}/>}
      {props.token && state.Played === false && <NotPlayedButton notPlayedButtonState={notPlayedButtonState}/>}
    </div>
  )
}