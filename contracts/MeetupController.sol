pragma solidity ^0.4.17;

import './Meetup.sol';

contract MeetupController {
  address owner = msg.sender;

  address[] meetups;
  mapping (address => uint[]) organizerMeetups;
  MeetupObject[] meetupObjects;

  struct MeetupObject {
    address identifier;
    uint applicationStartedAt;
    uint applicationEndedAt;
    uint date;
  }
    
  event MeetupSet(
    address meetupAddress,
    address _organizer, string _name,
    string _place,
    uint _applicationStartedAt, uint _applicationEndedAt, uint _date,
    uint _minFee, uint _capacity
  );

  function setupMeetup(address _organizer, string _name, string _place, uint _applicationStartedAt, uint _applicationEndedAt, uint _date, uint _minFee, uint _capacity)
    public
    returns (address meetupAddress)
  {
    meetupAddress = new Meetup(_organizer, _name, _place, _applicationStartedAt, _applicationEndedAt, _date, _minFee, _capacity, owner);
    uint idx = meetups.length;
    meetups.push(meetupAddress);
    organizerMeetups[_organizer].push(idx);
    meetupObjects.push(MeetupObject(meetupAddress, _applicationStartedAt, _applicationEndedAt, _date));
    MeetupSet(meetupAddress, _organizer, _name, _place, _applicationStartedAt, _applicationEndedAt, _date, _minFee, _capacity);
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

  function getUpcomingMeetups()
    public
    constant
    returns (address[] _meetups)
  {
    uint fixedLength = 6;
    uint length = (meetupObjects.length > fixedLength) ? fixedLength : meetupObjects.length;
    _meetups = new address[](length);
    uint skipCount = 0;
    for (uint i = 0; i < length; i++) {
      if (i + skipCount > meetupObjects.length) {
        return _meetups;
      }
      for (uint j = i + skipCount; j < meetupObjects.length; j++) {
        if (meetupObjects[j].date > now) {
          _meetups[i] = meetupObjects[j].identifier;
          break; // 内側のforだけ抜けたい
        } else {
          skipCount += 1;
        }
      }
    }
  }

  function getUpcomingMeetupObjects()
    public
    constant
    returns (MeetupObject[] _meetups)
  {
    uint fixedLength = 6;
    uint length = (meetupObjects.length > fixedLength) ? fixedLength : meetupObjects.length;
    _meetups = new MeetupObject[](length);
    uint skipCount = 0;
    for (uint i = 0; i < length; i++) {
      if (i + skipCount > meetupObjects.length) {
        return sortedMeetups(_meetups);
      }
      for (uint j = i + skipCount; j < meetupObjects.length; j++) {
        if (meetupObjects[j].date > now) {
          _meetups[i] = meetupObjects[j];
          break; // 内側のforだけ抜けたい
        } else {
          skipCount += 1;
        }
      }
    }
    return sortedMeetups(_meetups);
  }

  function sortedMeetups(MeetupObject[] _meetups)
    private
    constant
    returns (MeetupObject[] sorted)
  {
    uint len = _meetups.length;
    uint i = 0;
    uint j = 0;

    sorted = new MeetupObject[](len);

    for(i = 0; i < len; i++) {
      sorted[i] = _meetups[i];
    }

    for(i = 1; i < sorted.length; i++ ) {
      var c = sorted[i];

      for(j = i; j > 0 && sorted[j-1].date < c.date; j-- ) {
        sorted[j] = sorted[j-1];
      }

      sorted[j] = c;
    }
  }
}
