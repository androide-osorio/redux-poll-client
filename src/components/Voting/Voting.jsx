import React, { PropTypes } from 'react';

/**
 * This component enables voting for a specified pair
 */
export default class Voting extends React.Component {
  /**
   * get the pair data from props.
   * @return {Object}
   */
  getPair() {
    return this.props.pair || [];
  }

  /**
   * render the component
   * @return {React.Element}
   */
  render() {
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button key={entry}>
            <h1>{entry}</h1>
          </button>
        )}
      </div>
    );
  }
}
