pragma solidity ^0.4.17;

contract Meetup {
  address public organizer;
  address public owner;
  string public name;
  uint public applicationStartedAt;
  uint public applicationEndedAt;
  uint public minFee;
  uint public capacity;
  bool public aborted = false;

  uint private constant OWNER_FEE = 100;
  uint private constant FEE_PRECISION = 10000;

  struct Candidate {
    address applicantID;
    string name;
    uint fee;
  }

  event Aborted(address _meetupAddress, string _name);
  event Applied(address _applicantID, string _name);
  event Canceled(address _applicantID, string _name);
  event ApplicationApproved(address[] _applicantIDs);

  Candidate[] public candidates;
  address[] public invitations;
  mapping (address => Candidate) public approvedApplicants;
  mapping (address => uint) public refunds;

  modifier duringApplicationPeriod() {
    require(now > applicationStartedAt);
    require(now <= applicationEndedAt);
    _;
  }

  modifier afterApplicationEnd() {
    require(now > applicationEndedAt);
    _;
  }

  modifier beforeApplicationEnd() {
    require(now <= applicationEndedAt);
    _;
  }

  modifier notAborted() {
    require(!aborted);
    _;
  }

  modifier onlyOrganizer() {
    require(organizer == msg.sender);
    _;
  }

  modifier onlyAdministrator() {
    require(organizer == msg.sender || owner == msg.sender);
    _;
  }

  function Meetup(address _organizer, string _name, uint _applicationStartedAt, uint _applicationEndedAt,
     uint _minFee, uint _capacity, address _owner) 
    public
    payable   
  {
    organizer = _organizer;
    owner = _owner;
    name = _name;
    applicationStartedAt = _applicationStartedAt;
    applicationEndedAt = _applicationEndedAt;
    minFee = _minFee;
    capacity = _capacity;
  }

  function apply(string _name)
    public
    payable
    // duringApplicationPeriod()
    notAborted()
  {
    require(msg.value >= minFee);

    var c = getCandidate(msg.sender);

    addCandidate(msg.sender, _name, msg.value);
    Applied(msg.sender, _name);
    if (c.applicantID == msg.sender) {
      // return fee if the applicant has already done.
      msg.sender.transfer(c.fee);
    }
  }

  function cancel()
    public
    // duringApplicationPeriod()
    notAborted()
    returns (bool success)
  {
    var c = getCandidate(msg.sender);
    if (c.applicantID == msg.sender) {
      removeCandidate(msg.sender);
      uint refund = refunds[msg.sender] + c.fee;
      msg.sender.transfer(refund);
      refunds[msg.sender] = 0;
      Canceled(msg.sender, c.name);
      success = true;
    } else {
      success = false;
    }
  }

  function isApplied()
    public
    // duringApplicationPeriod()
    notAborted()
    constant
    returns (bool success)
  {
    var c = getCandidate(msg.sender);
    success = c.applicantID == msg.sender;
  }

  function publishApprovedApplicants()
    public
    onlyOrganizer()
    // afterApplicationEnd()
    notAborted()
    returns (bool success)
  {
    uint amount;
    uint approvedApplicantsCount = 0;
    uint i;

    var applicantIDs = new address[](capacity);

    /* Approve prioritized applicantIDs by an owner.*/
    for(i = 0; i < invitations.length && approvedApplicantsCount <= capacity; i++) {
      var c = getCandidate(invitations[i]);
      if (c.applicantID != 0x0 && approvedApplicants[c.applicantID].applicantID == 0x0) {
        approvedApplicants[c.applicantID] = c;
        amount += c.fee;
        applicantIDs[approvedApplicantsCount] = c.applicantID;
        approvedApplicantsCount++;
      }
    }

    /* Sort left candidates by each fee.*/
    Candidate[] memory tmp = sortedCandidates();

    /* Fetch approve candidates until capacity < approvedApplicants.length*/
    for(i = 0; i < tmp.length; i++) {
      var _c = tmp[i];

      /* Add candidates to refunds if this event is full.*/
      if (_c.applicantID != 0x0 && approvedApplicantsCount == capacity) {
        refunds[_c.applicantID] += _c.fee;
      }

      if (_c.applicantID != 0x0 && approvedApplicants[_c.applicantID].applicantID == 0x0 && approvedApplicantsCount < capacity) {
        approvedApplicants[_c.applicantID] = _c;
        amount += _c.fee;
        applicantIDs[approvedApplicantsCount] = _c.applicantID;
        approvedApplicantsCount++;
      }
    }

    /* Send applicantIDs fee to organizer.*/
    uint ownerFee = amount * OWNER_FEE / FEE_PRECISION;
    organizer.transfer(amount - ownerFee);
    owner.transfer(ownerFee);

    ApplicationApproved(applicantIDs);
    success = true;
  }

  function abortEvent()
    public
    onlyAdministrator()
    notAborted()
    // beforeApplicationEnd()
  {
    aborted = true;
    Aborted(address(this), name);
    for(uint i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (c.applicantID != 0x0) {
        refunds[c.applicantID] = c.fee;
      }
    }
  }

  function isApplicationApproved()
    public
    // afterApplicationEnd()
    notAborted()
    constant returns (bool success)
  {
    var c = approvedApplicants[msg.sender];
    success = c.applicantID == msg.sender;
  }

  function checkRefund()
    public
    constant returns (uint)
  {
    return refunds[msg.sender];
  }

  function withdrawRefund()
    public
    returns (bool success)
  {
    require(now > applicationEndedAt || aborted);
    uint refund = refunds[msg.sender];
    if (refund > 0) {
      refunds[msg.sender] = 0;
      msg.sender.transfer(refund);
      success = true;
    } else {
      success = false;
    }
  }

  /*****************************/
  /***** PRIVATE FUNCTIONS *****/
  /*****************************/
  function addCandidate(address _applicantID, string _name, uint _fee) private {
    bool added = false;
    for (uint i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (c.applicantID == _applicantID) {
        candidates[i] = Candidate(_applicantID, _name, _fee);
        added = true;
        break;
      }
    }
    if (!added) {
      candidates.push(Candidate(_applicantID, _name, _fee));
    }
  }

  function removeCandidate(address _applicantID)
    private
    returns (bool success)
  {
    success = false;
    for (uint i = 0; i < candidates.length; i++) {
      var c = candidates[i];
      if (c.applicantID == _applicantID) {
        delete candidates[i];
        success = true;
      }
    }
  }

  function getCandidate(address _applicantID)
    private
    constant
    returns (Candidate c)
  {
    for (uint i = 0; i < candidates.length; i++) {
      var _c = candidates[i];
      if (_c.applicantID == _applicantID) {
        c = _c;
        break;
      }
    }
  }

  function sortedCandidates()
    private
    constant
    returns (Candidate[] sorted)
  {
    uint len = candidates.length;
    uint i = 0;
    uint j = 0;

    sorted = new Candidate[](len);

    for(i = 0; i < len; i++) {
      sorted[i] = candidates[i];
    }

    for(i = 1; i < sorted.length; i++ ) {
      var c = sorted[i];

      for(j = i; j > 0 && sorted[j-1].fee < c.fee; j-- ) {
        sorted[j] = sorted[j-1];
      }

      sorted[j] = c;
    }
  }
}
