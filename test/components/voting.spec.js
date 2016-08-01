import { expect } from 'chai';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

// import react component
import Voting from '../../src/components/Voting/Voting';

/**
 * Application Component specs
 */
describe('Voting Component', () => {
  let component, props;
  const initialProps = {
    pair: ['Kill Bill', 'Pulp Fiction']
  };

  // render the component and get it, along with the props
  // it now has after rendering
  before(() => {
    component = renderIntoDocument(
      React.createElement(Voting, initialProps, null)
    );
  });

  it('renders a pair of buttons with the current entries', () => {
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContext).to.equal(initialProps[0]);
    expect(buttons[1].textContext).to.equal(initialProps[1]);
  });
})
