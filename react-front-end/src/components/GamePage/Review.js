import React, { useState, useContext } from "react";
import StarRating from './StarRating';

//import react bootstrap 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//import dbhelper function
import { getUserId, submitReview } from "../../helpers/dbHelpers"

//import context
import { authContext } from "../../providers/AuthProvider";

export default function Review(props) {
  //import context
  const { username } = useContext(authContext)

  const [rating, setRating] = useState(0);
  // color of star rating
  const color = {
    filled : "#f5eb3b",
    unfilled: "#DCDCDC"
  }
  const [review, setReview] = useState();
  const onUserInput = ({target}) => setReview(target.value);
  const onReviewSubmit = event => {
    event.preventDefault();
    //getUserId with username, username from context
    getUserId(username).then((data)=>{
      console.log("user id", data[0].id)
      console.log("Review content ", review)
      console.log("Rating ", rating)
      console.log("GameId ", props.gameId)
      const userId = data[0].id
      submitReview(props.gameId, userId, review, rating)
      props.setReviewInputMode("GameDescription")
    })
  }

  return (
    <Form onSubmit={onReviewSubmit}>
      <Form.Group className="mb-3" controlId="formReview">
        <Form.Label>Leave a Review</Form.Label>
        <Form.Control as="textarea" placeholder="Leave a review" rows={3} onChange={onUserInput} value={review}/>
      </Form.Group>
    
      <StarRating count={10} rating={rating} onRating={rate => setRating(rate)} color={color}/>
      <div>
      <Button variant="primary" type="submit" >
            Submit Review
      </Button>
      </div>
    </Form>
  )
}