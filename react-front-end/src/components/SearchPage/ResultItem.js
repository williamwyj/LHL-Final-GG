import React from "react";
import { NavDropdown, Navbar } from "react-bootstrap";

import { searchGame } from "../../helpers/dbHelpers";

export default function ResultItem(props) {

  return (
    <section className="gameResult">
      <img 
      className="cover"
      src={props.cover}
      />
      <article>
        <title>{props.name}</title>
        {props.summary}
        <footer>{props.platforms}</footer>
      </article>
      
    </section> 
  )
}