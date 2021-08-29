import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss"

export default function Navbar(props) {
  return (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/game">Game</Link>
    </li>
    <li>
      <Link to="/user">User</Link>
    </li>
  </ul>
  )
}