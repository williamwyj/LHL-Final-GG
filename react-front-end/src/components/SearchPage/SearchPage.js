import React from 'react';
import {  } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import Results from './Results';
import SearchBar from '../SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.scss'

import { searchGame } from '../../helpers/dbHelpers';

export default function SearchPage(props){
  const passProp = () => {
    let location = useLocation();
    return location.state
  }

  const [term, setTerm] = useState('')//passProp());
  const [results, setResults] = useState(
    {
      load:false,
      games:[]
    });
    
  useEffect(() => {
    if (term !== "") {
      setResults({...results, load:true})
      searchGame(term)
      .then((games) => {
        console.log('Navigation', games)
        setResults({games, load:false})
      });
    };
  }, [term]);

  // const results = props.results
  return (
    <section className="results_page">
    <SearchBar id="searchPageSearchBar" onSearch={(term) => setTerm(term)}/>
    <h2>Results</h2>
      {results.load && 
        <div className="loadingSpinner">
          <Spinner animation="border" role="status" variant="light" >
            <span className="visually-hidden">Loading...</span>
          </Spinner> 
        </div>  
      }
      {!results.load &&
        <Results
          game={results.games}
        />
      }
  </section>

  );
}