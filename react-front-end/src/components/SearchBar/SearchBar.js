import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useDebounce from '../hooks/useDebounce'
import { searchGame } from '../../helpers/dbHelpers';

export default function SearchBar(props) {
  const [value, setValue] = useState('')
  const term = useDebounce(value, 400)

  const onSearch = useCallback(props.onSearch, [term]);
  //look into this useCallback shit

  useEffect(() => {
    console.log("SEARCH BAR COMPONENT TERM:", term)
    console.log("SEARCH BAR COMPONENT VALUE:", value)
    onSearch(term);
  }, [term, onSearch]);

  return (
    <section className={"search" + "d-flex"}>
      <form className="search__form" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Games"
          name="search"
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
          autoComplete="off"
        />
        <Link to='/search'>
          <Button 
          type="submit"
          variant="outline-secondary" 
          id="button-addon2">
            🔍
          </Button>
        </Link>
      </form>
    </section>
  );
}