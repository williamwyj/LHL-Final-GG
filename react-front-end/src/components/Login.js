import React from 'react';
import useToken from './hooks/useToken'
import Button from 'react-bootstrap/Button'
import { NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Login(props) {
  const {token, getToken, username} = useToken();
  
  return (
    <div>
      <Button variant="primary" onClick={props.Login}>
        Login
      </Button>
      <Button variant="primary" onClick={props.Signup}>
        Sign up
      </Button>
    </div>
  )
}