import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// import child components
import Vote from './Vote';
import Winner from './Winner';

/**
 * This component enables voting for a specified pair
 */
export default class Voting extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

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
