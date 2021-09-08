import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import './ResultItem.scss'

export default function ResultItem(props) {

  console.log('RESULT ITEM PLATFORMS:', props.platforms)

  const putInPlace = function(array){
    return array.map(value => `${value} `)
  }
  console.log('RESULT ITEM props.name:', props.name);

  return (
      <Nav.Link href={`/game/${props.id}`}>
    <article className="gameResult">
      <img 
      className="cover"
      src={props.cover}
      />
      <div className="information">
      <article classname="writeup">
        <h4>{props.name}</h4>
        {props.summary}
      </article>
        <footer id="platforms" classname="platforms--footer">{putInPlace(props.platforms)}</footer>
      </div>
    </article> 
      </Nav.Link>
  )
}