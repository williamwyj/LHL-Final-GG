import React from 'react';
import Button from 'react-bootstrap/Button'

import "./HideWriteReviewButton.scss"

export default function HideWriteReviewButton(props) {
  return (
    <Button className="HideWriteReviewButton" onClick={props.hideWriteReview}>Cancel review</Button>
  )
}