import React, {useState, useContext, useEffect } from 'react';
import { authContext } from "../providers/AuthProvider"

import { Navbar, Container, Nav, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'


import logoName from "./image/Logo-removebg-preview.png";
import logoController from "./image/controller.png";
import './Navigation.scss'
import Axios from 'axios';


//helper functions
import { searchGame } from "../helpers/dbHelpers";

//React components
import Results from "./SearchPage/Results";
import SearchBar from "./SearchBar/SearchBar";

//custom hooks to toggle login/register and logout/Profile buttons
import useToken from './hooks/useToken'
import useLogin from './hooks/useLogin'

//Login and Logout components
import Login from './Login'
import Logout from './Logout'

export default function Navigation() {

  //Code for livesearch
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (term != "") {
      searchGame(term)
      .then((games) => {
        console.log('Navigation', games)
        setResults(games)
      });
    };
  }, [term]);

  /* Code for user Auth */
  const { login, logout } = useContext(authContext);
  
  const {token, username} = useToken();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const onUserInput = ({target}) => setUser(target.value);
  const onPasswordInput = ({target}) => setPassword(target.value);
  const onLoginSubmit = event => {
    event.preventDefault();
    if(user) {
      login(user, password).then((message)=>{
        if(message === "Wrong credentials!"){
          setShowLogin(true)
        } else if (!message){
        transition("Logout")
        }
      })
    }
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
      login(user,password).then(()=>transition("Logout"))
    })
    .catch(err => {
      console.log(err);
    })
    setUser();
    setPassword();
  }
  //custom hook to toggle login/register and logout/Profile buttons
  const {mode, transition} = useLogin(token ? "Login" : "Logout")
  useEffect(()=>{
    if(!token) {
      transition("Login")
    } else if (token) {
      transition("Logout")
    }
  },[token])

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="logo"
              src={logoName}
              width="60"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <img
              alt="logo"
              src={logoController}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Good Games
          </Navbar.Brand>
          <Form className="d-flex">
            <SearchBar onSearch={(term) => setTerm(term)}
            />
            {/* <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              // onSearch={(term) => setTerm(term)}
              onChange={(event) => setTerm(event.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button> */}
          </Form>
          <Nav className="me-auto">
            <Na href="/">Home</Nav.Link>
            <Nav.Link href="/game">Games</Nav.Link>
            <Nav.Link href="/user">Members</Nav.Link>
          </Nav>
          <Nav className="me-auto">
          {mode === "Login" && (<Login Login={()=>setShowLogin(!showLogin)} Signup={()=>setShowRegister(!showRegister)} />)}
          {mode === "Logout" && (<Logout Logout={()=>logout(username, token).then(()=>transition("Login"))}/>)}
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
