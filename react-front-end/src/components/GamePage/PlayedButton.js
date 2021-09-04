import React from 'react';
import Button from 'react-bootstrap/Button'

export default function PlayedButton(props) {
  return (
    <Button variant="primary" type="submit" onClick={props.playedButtonState}>
        Played
    </Button>
  )
}