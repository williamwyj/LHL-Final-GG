import React from "react";
import { NavDropdown } from "react-bootstrap";

import { searchGame } from "../../helpers/apiHelpers";

export default function Results(props) {
  
  const results = searchGame(props.search)

  return (
    <> </>
  )
}
