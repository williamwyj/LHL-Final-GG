import React from 'react';
import { useState, useCallback, useEffect } from 'react';

import useDebounce from '../hooks/useDebounce'
import { searchGame } from '../../helpers/apiHelpers';

export default function SearchBar(props) {
  const [value, setValue] = useState('')
  const term = useDebounce(value, 400)

  const onSearch = useCallback(props.onSearch, [term]);

  useEffect(() => {
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
        />
      </form>
    </section>
  );
}