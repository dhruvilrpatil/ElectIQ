// Contains data detailing the various voting methods available in Indian elections.
const votingMethodsData = [
  {
    id: 'polling-booth',
    method: 'In-Person Voting (Polling Booth)',
    when: 'Election Day only',
    howToRequest: 'No request needed — vote at your assigned booth',
    keyDeadline: 'Polling day; arrive before closing time',
    bestFor: 'All voters — most common method',
    availability: 'All constituencies across India',
    steps: [
      { num: 1, title: 'Find Your Polling Booth', detail: 'Visit voters.eci.gov.in → "Know Your Polling Station" or SMS EPIC <number> to 1950.' },
      { num: 2, title: 'Carry Valid Photo ID', detail: 'Bring your EPIC (voter ID card) or one of the 12 alternate IDs accepted by ECI (Aadhaar, Passport, PAN, etc.).' },
      { num: 3, title: 'Queue at the Booth', detail: 'Separate queues are available for women, senior citizens (80+), and PwD voters. Anyone in the queue at closing time is entitled to vote.' },
      { num: 4, title: 'Verification by Polling Officer', detail: 'The polling officer checks your ID and electoral roll entry. Your finger is marked with indelible ink.' },
      { num: 5, title: 'Cast Your Vote on EVM', detail: 'Enter the voting compartment. Press the button next to your chosen candidate on the Ballot Unit. A VVPAT slip appears briefly confirming your vote.' },
    ],
  },
  {
    id: 'postal-ballot',
    method: 'Postal Ballot',
    when: 'Before Election Day',
    howToRequest: 'Apply via Form 12 / 12A to the Returning Officer',
    keyDeadline: 'Application before the deadline notified with each election',
    bestFor: 'Service voters (armed forces, para-military, government abroad), seniors 85+, PwD, and voters under Essential Services',
    availability: 'Expanded in 2024 — seniors 85+ and PwD can opt to vote at home',
    steps: [
      { num: 1, title: 'Check Eligibility', detail: 'Service voters, seniors 85+, persons with disabilities, essential services workers, and detainees are eligible for postal ballot.' },
      { num: 2, title: 'Submit Application', detail: 'Fill Form 12 (service voters) or Form 12A (other eligible voters) and submit to your Returning Officer before the deadline.' },
      { num: 3, title: 'Receive Ballot Paper', detail: 'The ballot paper is sent to your registered address along with declaration form and return envelope.' },
      { num: 4, title: 'Mark and Seal', detail: 'Mark the ballot in the presence of an authorised witness. Seal in the inner envelope and then the outer envelope.' },
      { num: 5, title: 'Return the Ballot', detail: 'Post it back to the Returning Officer so it arrives before the counting begins (usually before 8:00 AM on counting day).' },
    ],
  },
  {
    id: 'home-voting',
    method: 'Home Voting (Seniors 85+ & PwD)',
    when: 'Before Election Day (scheduled by BLO)',
    howToRequest: 'Register online at voters.eci.gov.in or through BLO',
    keyDeadline: 'Registration deadline announced with each election schedule',
    bestFor: 'Senior citizens (85+ years) and persons with disabilities (40%+ benchmark disability)',
    availability: 'Introduced in 2019; expanded in 2024 Lok Sabha election',
    steps: [
      { num: 1, title: 'Register for Home Voting', detail: 'Submit your application at voters.eci.gov.in or fill Form 12D through your local Booth Level Officer (BLO).' },
      { num: 2, title: 'Receive Confirmation', detail: 'ECI/BLO will confirm your home voting slot and date.' },
      { num: 3, title: 'Polling Team Visits', detail: 'An authorised polling team carries a small EVM/ballot to your home at the scheduled time.' },
      { num: 4, title: 'Cast Your Vote', detail: 'Vote using the portable EVM brought by the team. Indelible ink is applied as usual.' },
    ],
  },
  {
    id: 'evm-in-person',
    method: 'EVM + VVPAT (Electronic Voting)',
    when: 'Election Day at polling booth',
    howToRequest: 'Standard in-person voting — no special request',
    keyDeadline: 'On polling day',
    bestFor: 'All voters — default method across India since 2004 Lok Sabha',
    availability: '100% of constituencies',
    steps: [
      { num: 1, title: 'Ballot Unit Activated', detail: 'The Presiding Officer enables the EVM using the Control Unit\'s "Ballot" button.' },
      { num: 2, title: 'Press Your Candidate\'s Button', detail: 'The Ballot Unit shows all candidates with name, party symbol, and serial number. Press the blue button next to your choice.' },
      { num: 3, title: 'Verify VVPAT Slip', detail: 'The VVPAT prints a paper slip visible through a glass window for 7 seconds before dropping into the sealed box.' },
      { num: 4, title: 'Vote Recorded', detail: 'A beep and red light on the Control Unit confirm a vote is recorded. The EVM is now locked until the officer re-enables it for the next voter.' },
    ],
  },
];

export default votingMethodsData;
