import React from "react";
import { NavDropdown, Navbar } from "react-bootstrap";

import { searchGame } from "../../helpers/dbHelpers";
import ResultItem from "./ResultItem";

export default function Results(props) {
  
  return props.game.map(game => (
    <ResultItem cover={game.cover} platforms={game.platforms} summary={game.summary} name={game.name} id={game.id}/>
  ));
}
