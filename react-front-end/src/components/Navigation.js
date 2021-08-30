import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import logoName from './image/Logo-removebg-preview.png'
import logoController from './image/controller.png'


  
export default function Navigation() {
  

  return (
    <div >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={logoName}
              width="60"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <img
              alt="logo"
              src={logoController}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Good Games
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" id="button-addon2">Search</Button>
          </Form>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/game">Games</Nav.Link>
            <Nav.Link href="/user">Members</Nav.Link>  
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="#home">Create an Account</Nav.Link>
            <Nav.Link href="#features">Sign in</Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">User Page</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Logo Out</NavDropdown.Item>
            </NavDropdown>  
          </Nav>
          
        </Container>
      </Navbar>
    </div>
  );
}
