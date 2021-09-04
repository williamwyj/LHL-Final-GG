import React from 'react'
import Button from 'react-bootstrap/Button'

export default function UserButtons(props) {
  return (
    <div className="UserButtons" >
      <Button onClick={props.writeReview}>Write a review</Button>
    </div>
  )
}