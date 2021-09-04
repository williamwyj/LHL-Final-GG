import React from 'react';
import Button from 'react-bootstrap/Button'
import "./NotPlayedButton.scss"

export default function NotPlayedButton(props) {
  return (
    <Button variant="primary" className="NotPlayedButton" onClick={props.notPlayedButtonState}>
        Not Played
    </Button>
  )
}