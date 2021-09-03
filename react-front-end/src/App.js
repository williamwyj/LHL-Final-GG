import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Navigation from './components/Navigation';
import Home from "./components/Home";
import User from "./components/User";
import Game from "./components/Game";
import Profile from "./components/Profile";
import { authContext } from "./providers/AuthProvider";
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {

  const { token } = useContext(authContext);
  return (
    

    <Router>
      <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"/>
      <Navigation></Navigation>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:id">
            <Game />
          </Route>
          <Route path="/user/:name">
            {token && <Profile />}
            {!token && <Redirect to="/" />}
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}




