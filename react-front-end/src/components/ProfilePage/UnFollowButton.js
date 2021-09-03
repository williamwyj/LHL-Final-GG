import React from 'react';
import Button from 'react-bootstrap/Button'

export default function FollowButton(props) {
  return (
    <Button variant="primary" onClick={props.unfollow}>
        Unfollow
    </Button>
  )
}