import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { List } from 'immutable';

// import react component
import Voting from '../../src/components/Voting/Voting';

/**
 * Application Component specs
 */
describe('Voting Component', () => {
  let component, votedWith;
  let vote = (entry) => votedWith = entry;
  let initialProps = { pair: ['Kill Bill', 'Pulp Fiction'], vote };

  // render the component and get it, along with the props
  // it now has after rendering
  before(() => {
    component = renderIntoDocument(
      React.createElement(Voting, initialProps, null)
    );
    votedWith = null;
  });

  beforeEach(() => {
    initialProps = { pair: ['Kill Bill', 'Pulp Fiction'], vote };
  });

  // test data immutability in the component
  it('renders as pure component', () => {
    const container = document.createElement('div');
    let component = ReactDOM.render(
      React.createElement(Voting, initialProps, null), container
    );

    // assert that the first button has the appropiate label
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Kill Bill');

    initialProps.pair[0] = 'The Hateful Eight';
    // simulate component re-rendering
    component = ReactDOM.render(
      React.createElement(Voting, initialProps, null), container
    );

    // the data inside the component should not have changed
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Kill Bill');
  });

  // test data immutability in the component
  it('updates DOM when a prop changes', () => {
    const props = Object.assign(
      {}, initialProps, { pair: new List(initialProps.pair) }
    );
    const container = document.createElement('div');
    let component = ReactDOM.render(
      React.createElement(Voting, props, null), container
    );

    // assert that the first button has the appropiate label
    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Kill Bill');

    // create new immutable props with changes
    const newPair = props.pair.set(0, 'The Hateful Eight');
    const newProps = Object.assign({}, props, { pair: newPair });
    // simulate component re-rendering
    component = ReactDOM.render(
      React.createElement(Voting, newProps, null), container
    );

    // the data inside the component should have changed
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('The Hateful Eight');
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
