import React, {Component} from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import addIcon from '../icons/ic_plus.png';
import Meetup from '../utils/meetup';

export default class AppBar extends Component {
  setupMeetup() {
    console.log('testtest');
    new Meetup().setupMeetup();
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Meetup</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={this.props.newMeetup}>New</NavItem>
          <NavDropdown eventKey={3} title='Mypage' id='basic-nav-dropdown'>
            <MenuItem eventKey={3.1}>Profile</MenuItem>
            <MenuItem eventKey={3.2}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
