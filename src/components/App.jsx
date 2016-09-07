import React from 'react';
import {List, Map} from 'immutable';

// mock voting pair, for testing purposes
const pair = new List(['Kill Bill', 'Pulp Fiction']);
const tally = new Map({'Trainspotting': 5, '28 Days Later': 4});

/**
 * App component class
 */
export default class App extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {pair, tally});
  }
}
