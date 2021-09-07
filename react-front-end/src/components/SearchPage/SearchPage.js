import React from 'react';
import {  } from 'react-bootstrap';
import Results from './Results';
import SearchBar from '../SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { searchGame } from '../../helpers/dbHelpers';

export default function SearchPage(props){
  const passProp = () => {
    let location = useLocation();
    return location.state
  }

  const [term, setTerm] = useState('')//passProp());
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (term !== "") {
      searchGame(term)
      .then((games) => {
        console.log('Navigation', games)
        setResults(games)
      });
    };
  }, [term]);

  // const results = props.results
  return (
  <section className="results_page">
    <SearchBar id="searchPageSearchBar" onSearch={(term) => setTerm(term)}/>
    <h2>Results</h2>
      <Results
        game={results}
      />
  </section>

  );
}