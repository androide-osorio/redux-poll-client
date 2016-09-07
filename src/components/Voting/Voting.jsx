import React, { PropTypes } from 'react';

// import child components
import Vote from './Vote';
import Winner from './Winner';

/**
 * This component enables voting for a specified pair
 */
export default class Voting extends React.Component {
  /**
   * render the component
   * @return {React.Element}
   */
  render() {
    let currentChild = <Vote {...this.props} />;

    if(this.props.winner) {
      currentChild = <Winner ref="winner" winner={this.props.winner} />;
    }

    return (<div>
      { currentChild }
    </div>);
  }
}
