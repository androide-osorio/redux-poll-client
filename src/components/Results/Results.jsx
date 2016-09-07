import React from 'react';
import {List, Map} from 'immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * Results component class
 */
export default class Results extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <ul className="results">
      {this.getPair().map(entry =>
        <li key={entry} className="entry">
          <h1>{entry}</h1>
          <span className="voteCount">
            {this.getVotes(entry)}
          </span>
        </li>
      )}
    </ul>;
  }

  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if(this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  }
}
