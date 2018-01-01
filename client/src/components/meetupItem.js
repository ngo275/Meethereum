import React, {Component, PropTypes} from 'react';
//import PropTypes from 'prop-types';
import { Navbar, Jumbotron, Button, Col } from 'react-bootstrap';

export default class MeetupItem extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Col xs={12} md={12} className='meetup-item' key={this.props.address}>
        <Jumbotron>
          <div className='meetup-name'>{this.props.name}</div>
          <div className='meetup-address'>{this.props.address}</div>
        </Jumbotron>
      </Col>
    )
  }
}

// MeetupItem.propTypes = {
//   name: PropTypes.string,
//   address: PropTypes.string
// }