import React from 'react';
import Button from 'react-bootstrap/Button'

export default function LikeButton(props) {
  return (
    <Button className="LikeButton" onClick={props.likeButtonState}>Like</Button>
  )
}