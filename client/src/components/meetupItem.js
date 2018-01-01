import React, {Component} from 'react';
// import PropTypes from 'prop-types';

export default class MeetupItem extends Component {
  render() {
    return (
      <div>
        <span className='meetup-capacity'>定員{this.props.capacity}名</span><br/>
        <span className='meetup-minFee'>参加料金{this.props.minFee}ETH</span>
      </div>
    );
  }
}

// MeetupItem.propTypes = {
//   name: PropTypes.string,
//   address: PropTypes.string
// }