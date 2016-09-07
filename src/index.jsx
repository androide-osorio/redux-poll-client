// Require SCSS to allow Webpack live render
import './assets/styles/style.scss';

// Import React and React-dom
import React from 'react'
import { render } from 'react-dom'
// Import elements of React Router
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router'

// Import application Component
import Voting from './components/Voting/Voting';

// Define app container
const destination = document.getElementById("app");

// mock voting pair, for testing purposes
const pair = ['Kill Bill', 'Pulp Fiction'];

// Start Here
render(<Voting pair={pair} hasVoted="Kill Bill" />, destination);
