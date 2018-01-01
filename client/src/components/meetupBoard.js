import React, {Component, PropTypes} from 'react';
import { ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap'
import Meetup from '../utils/meetup';
import MeetupItem from './meetupItem';
const { map } = require('p-iteration');

export default class MeetupBoard extends Component {
  constructor() {
    super();
    this.meetup = new Meetup();
    this.state = {
      meetups: []
    }
  }

  async componentDidMount() {
    const meetupDetails = await this.getMeetups();
    console.log(meetupDetails);
    this.setState({meetups: meetupDetails});
  }

  async getMeetups() {
    const meetups = await this.meetup.getOrganizerMeetups();
    const meetupDetails = await map(meetups, async address => {
      const name = await this.meetup.getMeetupName(address);
      const capacity = await this.meetup.getMeetupCapacity(address);
      // const minFee = await this.meetup.getMeetupMinFee(address);
      return {address: address, name: name, capacity: capacity, minFee: 0};
    });
    return meetupDetails;
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3} className='meetup-board' key='meetup-board'>
          <ListGroup meetups={this.state.meetups}>
            {this.state.meetups.map((m) => {
              return (
                <ListGroupItem key={m.address} header={m.name}>
                  <MeetupItem capacity={m.capacity} minFee={m.minFee}></MeetupItem>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    )
  }

}