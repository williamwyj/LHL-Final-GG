import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import logoName from './image/Logo-removebg-preview.png'
import logoController from './image/controller.png'
import './Navigation.scss'
import Axios from 'axios';

import useToken from './hooks/useToken'

  
export default function Navigation() {

  const {token, setToken, removeToken} = useToken();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const onUserInput = ({target}) => setUser(target.value);
  const onPasswordInput = ({target}) => setPassword(target.value);
  const onLoginSubmit = event => {
    event.preventDefault();
    Axios.get("/api/login", {
      params: {
        user,
        password
      }
    })
    .then((token) => {
      setToken(token.data[0])
    })
    .catch(err => {
      console.log(err);
    })
    setUser();
    setPassword();
  }
  const onRegisterSubmit = event => {
    event.preventDefault();
    Axios.post("/api/register", {
      params: {
        user,
        password
      }
    })
    .then((token)=>{
      setToken(token.data[0])
    })
    .catch(err => {
      console.log(err);
    })
    setUser();
    setPassword();
  }

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
          {!token ?
            <div>
              <Button variant="primary" onClick={() => setShowLogin(!showLogin)}>
                Login
              </Button>
              <Button variant="primary" onClick={() => setShowRegister(!showRegister)}>
                Sign up
              </Button>
            </div>
          : <div className="userButtons">
              <Button variant="primary" onClick={()=>removeToken()}>
                Logout
              </Button>
              <NavDropdown title="Profile" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">User Page</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Logo Out</NavDropdown.Item>
              </NavDropdown>
            </div>
          }
          
              
          </Nav>
        </Container>
      </Navbar>

      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up for GG!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onRegisterSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={onUserInput} value={user}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={onPasswordInput} value={password}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => setShowRegister(false)}>
            Register
          </Button>
        </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log in to GG!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onLoginSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={onUserInput} value={user}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={onPasswordInput} value={password}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={() => setShowLogin(false)}>
            Login
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
      </div>
    );
}
