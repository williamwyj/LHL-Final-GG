import React from 'react';
import Button from 'react-bootstrap/Button'
import "./WriteReviewButton.scss"


export default function WriteReviewButton(props) {
  return (
    <Button className="WriteReviewButton" onClick={props.writeReviewState}>Write a review</Button>
  )
}