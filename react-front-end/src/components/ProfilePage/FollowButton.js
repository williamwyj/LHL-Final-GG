import React from 'react';
import Button from 'react-bootstrap/Button'

export default function FollowButton(props) {
  return (
    <Button variant="primary" type="submit" onClick={props.follow}>
        Follow
    </Button>
  )
}