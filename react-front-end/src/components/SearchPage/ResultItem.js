import React from "react";
import { NavDropdown, Navbar } from "react-bootstrap";
import './ResultItem.scss'

import { searchGame } from "../../helpers/dbHelpers";

export default function ResultItem(props) {

  return (
    <section className="gameResult">
      <img 
      className="cover"
      src={props.cover}
      />
      <article classname="writeup">
        <title>{props.name}</title>
        {props.summary}
        <footer classname="platforms--footer">{props.platforms}</footer>
      </article>
      
    </section> 
  )
}