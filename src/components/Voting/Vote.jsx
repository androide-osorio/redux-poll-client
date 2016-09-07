import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Vote extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  /**
   * get the pair data from props.
   * @return {Object}
   */
  getPair() {
    return this.props.pair || [];
  }

  /**
   * Returns true if the user has already voted for an entry
   * @return {Boolean}
   */
  isDisabled() {
    return !!this.props.hasVoted;
  }

  /**
   * returns true if the user voted for the specified entry
   * @param  {string}  entry a vote entry
   * @return {Boolean}       whether the user voted for the asked entry
   */
  hasVotedFor(entry) {
    return this.props.hasVoted === entry
  }

  /**
   * render the component
   * @return {React.Element}
   */
  render() {
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button key={entry}
            onClick={() => this.props.vote(entry) }
            disabled={this.isDisabled()}>
            <h1>{entry}</h1>
            { this.hasVotedFor(entry) ? <label>Voted</label> : null }
          </button>
        )}
      </div>
    );
  }
}
