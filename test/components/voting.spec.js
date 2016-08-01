import { expect } from 'chai';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';

// import react component
import Voting from '../../src/components/Voting/Voting';

/**
 * Application Component specs
 */
describe('Voting Component', () => {
  let component, votedWith;
  const vote = (entry) => votedWith = entry;
  const initialProps = {
    pair: ['Kill Bill', 'Pulp Fiction'],
    vote
  };

  // render the component and get it, along with the props
  // it now has after rendering
  before(() => {
    component = renderIntoDocument(
      React.createElement(Voting, initialProps, null)
    );
    votedWith = null;
  });

  // component can render two buttons with
  // the props provided to it
  it('renders a pair of buttons with the current entries', () => {
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContext).to.equal(initialProps[0]);
    expect(buttons[1].textContext).to.equal(initialProps[1]);
  });

  it('invokes callback when a button is clicked', () => {
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    // simulate a click event into one of the component's buttons
    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('Kill Bill');
  });
})
