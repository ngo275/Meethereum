const Contract = {
  meetupABI: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawRefund","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"applicationEndedAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"candidatesCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"date","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidates","outputs":[{"name":"applicantID","type":"address"},{"name":"name","type":"string"},{"name":"fee","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"apply","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"capacity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"organizer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"publishApprovedApplicants","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isApplicationApproved","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"aborted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"place","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkRefund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"applicationStartedAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"refunds","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"invitations","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"approvedApplicants","outputs":[{"name":"applicantID","type":"address"},{"name":"name","type":"string"},{"name":"fee","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"cancel","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"abortEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isApplied","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_organizer","type":"address"},{"name":"_name","type":"string"},{"name":"_place","type":"string"},{"name":"_applicationStartedAt","type":"uint256"},{"name":"_applicationEndedAt","type":"uint256"},{"name":"_date","type":"uint256"},{"name":"_minFee","type":"uint256"},{"name":"_capacity","type":"uint256"},{"name":"_owner","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_meetupAddress","type":"address"},{"indexed":false,"name":"_name","type":"string"}],"name":"Aborted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_applicantID","type":"address"},{"indexed":false,"name":"_name","type":"string"}],"name":"Applied","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_applicantID","type":"address"},{"indexed":false,"name":"_name","type":"string"}],"name":"Canceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_applicantIDs","type":"address[]"}],"name":"ApplicationApproved","type":"event"}],
  meetupControllerABI: [{"constant":true,"inputs":[],"name":"getUpcomingMeetups","outputs":[{"name":"_meetups","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_organizer","type":"address"},{"name":"_name","type":"string"},{"name":"_place","type":"string"},{"name":"_applicationStartedAt","type":"uint256"},{"name":"_applicationEndedAt","type":"uint256"},{"name":"_date","type":"uint256"},{"name":"_minFee","type":"uint256"},{"name":"_capacity","type":"uint256"}],"name":"setupMeetup","outputs":[{"name":"meetupAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_organizer","type":"address"}],"name":"getOrganizerMeetups","outputs":[{"name":"_meetups","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"meetupAddress","type":"address"},{"indexed":false,"name":"_organizer","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_place","type":"string"},{"indexed":false,"name":"_applicationStartedAt","type":"uint256"},{"indexed":false,"name":"_applicationEndedAt","type":"uint256"},{"indexed":false,"name":"_date","type":"uint256"},{"indexed":false,"name":"_minFee","type":"uint256"},{"indexed":false,"name":"_capacity","type":"uint256"}],"name":"MeetupSet","type":"event"}],
  meetupControllerAddress: '0xc9f1d0C85226D9F252bb79654f7865bB5c654d03'
}

export default Contract;