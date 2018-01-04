import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap'
import MeetupItem from './meetupItem';

export default class MeetupBoard extends Component {
  render() {
    return (
      <Row>
        <Col xs={12} md={6} mdOffset={3} className='meetup-board' key='meetup-board'>
          <ListGroup meetups={this.props.meetups}>
            {this.props.meetups.map((m) => {
              return (
                <ListGroupItem key={m.address} header={m.name} onClick={e => this.props.applyMeetup(m.address)} >
                  <MeetupItem
                    place={m.place}
                    capacity={m.capacity}
                    minFee={m.minFee}
                    isApplied={m.isApplied}
                    candidatesCount={m.candidatesCount}
                    date={m.date}
                  ></MeetupItem>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    )
  }
}