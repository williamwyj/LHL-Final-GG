import React from 'react';
import Button from 'react-bootstrap/Button'

export default function Login(props) {
  
  return (
    <span>
      <Button variant="primary" onClick={props.Login}>
        Login
      </Button>
      <Button variant="primary" onClick={props.Signup}>
        Sign up
      </Button>
    </span>
  )
}