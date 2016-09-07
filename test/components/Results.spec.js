import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { List, Map } from 'immutable';

// import react component
import Results from '../../src/components/Results/Results';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Kill Bill', 'Pulp fiction');
    const tally = new Map({'Kill Bill': 5});
    const component = renderIntoDocument(
      React.createElement(Results, {pair, tally} ,null)
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [movie1, movie2] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(movie1).to.contain('Kill Bill');
    expect(movie1).to.contain('5');
    expect(movie2).to.contain('Pulp fiction');
    expect(movie2).to.contain('0');
  });

});
