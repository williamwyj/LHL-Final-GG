import React from "react";
import { NavDropdown, Navbar } from "react-bootstrap";

import { searchGame } from "../../helpers/dbHelpers";

export default function Results(props) {
  
  const results = props.results

  console.log("RESULTS JSX", results)

  return results.map(result => (
    <Navbar.text>${result.name.toString()}</Navbar.text>
  ))
}
