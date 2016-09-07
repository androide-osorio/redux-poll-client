// Require SCSS to allow Webpack live render
import './assets/styles/style.scss';

// Import React and React-dom
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

// Import application Component
import App from './components/App';
import Voting from './components/Voting/Voting';
import Results from './components/Results/Results';

//-------------------------------------------------
const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Voting} />
      <Route path="/results" component={Results} />
    </Route>
  </Router>
);

// Define app container
const destination = document.getElementById("app");

// Start Here
render(routes, destination);
