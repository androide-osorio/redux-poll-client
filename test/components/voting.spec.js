import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
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
  let vote = (entry) => votedWith = entry;
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

  describe('handles UI after voting', () => {
    let component, buttons;
    const props = Object.assign(
      {}, initialProps, { hasVoted: 'Kill Bill' }
    );

    // render the component and get it, along with the props
    // it now has after rendering
    before(() => {
      component = renderIntoDocument(
        React.createElement(Voting, props, null)
      );
      buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    });

    it('disables buttons when user has voted', () => {
      expect(buttons[0].hasAttribute('disabled')).to.equal(true);
      expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds a label to the button of the voted entry', () => {
      expect(buttons[0].textContent).to.contain('Voted');
    });
  });

  describe('handles winner', () => {
    let component, buttons;
    const props = Object.assign(
      {}, initialProps, { winner: 'Kill Bill' }
    );

    // render the component and get it, along with the props
    // it now has after rendering
    before(() => {
      component = renderIntoDocument(
        React.createElement(Voting, props, null)
      );
      buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    });

    it('renders just the winner when there is one', () => {
      expect(buttons.length).to.equal(0);

      const winner = ReactDOM.findDOMNode(component.refs.winner);
      expect(winner).to.be.ok;
      expect(winner.textContent).to.contain('Kill Bill');
    });
  });
})
