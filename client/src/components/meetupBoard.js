import React, {Component, PropTypes} from 'react';
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'
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
      return {address: address, name: name}
    });
    return meetupDetails;
  }

  render() {
    return (
      <Col xs={12} md={12} className='meetup-board' key='meetup-board'>
        <ListGroup meetups={this.state.meetups}>
          {this.state.meetups.map((m) => {
            return (
              <ListGroupItem key={m.address}>
                <MeetupItem address={m.address} name={m.name}></MeetupItem>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    )
  }

}