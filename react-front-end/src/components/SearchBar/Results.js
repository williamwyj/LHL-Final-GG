import React from "react";
import { NavDropdown } from "react-bootstrap";

import { searchGame } from "../../helpers/dbHelpers";

export default function Results(props) {
  
  const results = props.results

  console.log("RESULTS JSX", results)

  return results.map(result => (
    <NavDropdown.Item href="#action4">${result.name}</NavDropdown.Item>
  ))
}
