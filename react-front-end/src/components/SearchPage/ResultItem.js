import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ResultItem(props) {

  console.log('RESULT ITEM PLATFORMS:', props.platforms)

  const putInPlace = function(array){
    return array.map(value => `${value} `)
  }

  return (
    <nav className="gameResult">
      <Nav.Link href={`/game/${props.id}`}>
      <img 
      className="cover"
      src={props.cover}
      />
      <article>
        <title>{props.name}</title>
        {props.summary}
        <footer>{putInPlace(props.platforms)}</footer>
      </article>
      </Nav.Link>
    </nav> 
  )
}