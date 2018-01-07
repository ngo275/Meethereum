// @flow
import React, {Component} from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export default class MeetupItem extends Component {
  render() {
    console.log(this.props);
    const isApplied = this.props.isApplied ? '応募済' : '未応募';
    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <Row>
          <Col md='8'>
            <span className='meetup-candidates'>現在: {this.props.candidatesCount}名 / 定員: {this.props.capacity}名</span><br/>
            <span className='meetup-minFee'>参加料金: {this.props.minFee}ETH</span><br/>
            <span className='meetup-date'>日程: {this.props.date}</span><br/>
            <span className='meetup-place'>開催場所: {this.props.place}</span><br/>
            {/* <span className='meetup-isApplied'>{isApplied}</span> */}
          </Col>
          <Col md='4'>
            {this.getActionButton()}<br/><br/>
            {this.getRevealButton()}
          </Col>
        </Row>
      </div>
    );
  }

  getActionButton() {
    if (this.props.isApplied) {
      return (
        <Button className="btn btn-primary btn-large centerButton" onClick={this.cancelAction.bind(this)}>キャンセル</Button>
      );
    } else {
      return (
        <Button className="btn btn-primary btn-large centerButton" onClick={this.applyAction.bind(this)}>応募</Button>
      );
    }
  }

  getRevealButton() {
    return (
      <Button className="btn btn-primary btn-large centerButton" onClick={this.publishApprovedApplicants.bind(this)}>抽選</Button>
    );
  }

  async applyAction() {
    try {
      await this.props.applyMeetup(this.props.address);
      toast.success('応募完了しました！');
    } catch(e) {
      toast.error(e);
    }
  }

  async cancelAction() {
    try {
      await this.props.cancelMeetup(this.props.address);
      toast.success('キャンセル完了しました！');
    } catch(e) {
      toast.error(e);
    }
  }

  async publishApprovedApplicants() {
    try {
      await this.props.publishApprovedApplicants(this.props.address);
    } catch(e) {
      toast.error(e);
    }
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
  isApplied: bool,
  applyMeetup: string => void,
  cancelMeetup: string => void,
  publishApprovedApplicants: string => void
};