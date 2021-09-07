import React from 'react';
import Button from 'react-bootstrap/Button'

export default function UnlikeButton(props) {
  return (
    <Button className="UnlikeButton" onClick={props.unlikeButtonState}>Unlike</Button>
  )
}