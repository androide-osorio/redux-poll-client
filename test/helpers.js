// configure any helper you need for testing here
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiImmutable from 'chai-immutable';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';

/**
 * Setup mock DOM for react testing
 */
function initMockDOM() {
  // initialize a simple HTML document
  // that will be rendered to a DOM tree
  const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
  const win = doc.defaultView;

  // hoist the window and window.document
  // globals to the node global object
  global.document = doc;
  global.window = win;

  Object.keys(window).forEach((key) => {
    if (!(key in global)) {
      global[key] = window[key];
    }
  });
}

//-----------------------------------------------------

/**
 * render a React component with the specified props.
 * @param {React.Component} Compoment  the component class to render
 * @param {Object}          props      the component's props (defaults to no props).
 *
 * @return {Object} an object with the rendered component and related metadata
 */
export function renderShallowComponent(ComponentClass, props = {}) {
  const renderer = TestUtils.createRenderer();
  renderer.render(
    React.createElement(ComponentClass, props, null)
  );
  const component = renderer.getRenderOutput();

  return { props, component, renderer };
}

// configure any chai helper here
chai.use(sinonChai);
chai.use(chaiImmutable);

// initialize testing DOM
initMockDOM();
