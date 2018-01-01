pragma solidity ^0.4.17;

import './Meetup.sol';

contract MeetupController {
  address owner = msg.sender;

  address[] meetups;
  mapping (address => uint[]) organizerMeetups;
    
  event MeetupSet(
    address meetupAddress,
    address _organizer, string _name,
    uint _applicationStartedAt, uint _applicationEndedAt,
    uint _minFee, uint _capacity
  );


  // @TODO: add meetup date.
  function setupMeetup(address _organizer, string _name, uint _applicationStartedAt, uint _applicationEndedAt, uint _date, uint _minFee, uint _capacity)
    public
    returns (address meetupAddress)
  {
    meetupAddress = new Meetup(_organizer, _name, _applicationStartedAt, _applicationEndedAt, _date, _minFee, _capacity, owner);
    uint idx = meetups.length;
    meetups.push(meetupAddress);
    organizerMeetups[_organizer].push(idx);
    MeetupSet(meetupAddress, _organizer, _name, now, _applicationEndedAt, _minFee, _capacity);
  }
  
  function getOrganizerMeetups(address _organizer)
    public
    constant
    returns (address[] _meetups)
  {
    var oms = organizerMeetups[_organizer];
    _meetups = new address[](oms.length);
    for (uint i = 0; i < oms.length; i++) {
      _meetups[i] = meetups[oms[i]];
    }
  }
}
