import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import SearchPage from './components/SearchPage/SearchPage';

ReactDOM.render(
  <AuthProvider>
    <App />
    <BrowserRouter>
    <Switch>
      <Route exact path='/search' component={SearchPage} />
    </Switch>
    </BrowserRouter>
  </AuthProvider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
