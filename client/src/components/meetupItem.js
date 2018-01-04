// @flow
import React, {Component} from 'react';

export default class MeetupItem extends Component {
  render() {
    console.log(this.props);
    const isApplied = this.props.isApplied ? '応募済' : '未応募';
    return (
      <div>
        <span className='meetup-candidates'>現在: {this.props.candidatesCount}名 / 定員: {this.props.capacity}名</span><br/>
        <span className='meetup-minFee'>参加料金: {this.props.minFee}ETH</span><br/>
        <span className='meetup-date'>日程: {this.props.date}</span><br/>
        <span className='meetup-place'>開催場所: {this.props.place}</span><br/>
        <span className='meetup-isApplied'>{isApplied}</span>
      </div>
    );
  }
}

type PropTypes = {
  address: string,
  name: string,
  place: string,
  candidatesCount: number,
  capacity: number,
  minFee: number,
  date: date,
  isApplied: bool
};