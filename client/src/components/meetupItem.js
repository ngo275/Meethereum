import React, {Component, PropTypes} from 'react';
//import PropTypes from 'prop-types';
import { Navbar, Jumbotron, Button, Col } from 'react-bootstrap';

export default class MeetupItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className='meetup-capacity'>定員{this.props.capacity}名</div>
        <div className='meetup-minFee'>参加料金{this.props.minFee}ETH</div>
      </div>
    );
  }
}

// MeetupItem.propTypes = {
//   name: PropTypes.string,
//   address: PropTypes.string
// }