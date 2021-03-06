import React from 'react';
import useToken from './hooks/useToken'
import Button from 'react-bootstrap/Button'
import { NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Logout.scss'

export default function Logout(props) {
  const {username} = useToken();
  
  return (
    <span id="userButtons">
      <Link to={'/'}>
        <Button variant="primary" onClick={props.Logout}>
          Logout
        </Button>
      </Link>
      <NavDropdown title="Profile" id="navbarScrollingDropdown">
      <NavDropdown.Item href={`/user/${username}`} >User Page</NavDropdown.Item>
      <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
      </NavDropdown>
    </span>
  )
}