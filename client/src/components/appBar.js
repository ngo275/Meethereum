import React, {Component} from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import addIcon from '../icons/ic_plus.png';

export default class AppBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='https://www.meetup.com/ja-JP/'>Meetup</a>
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
