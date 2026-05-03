// Defines the knowledge base for NLP processing containing intents, keywords, and predefined responses.
const knowledgeBase = {

  // ──────────────────────────────────────────────────────────────
  voter_registration: {
    intent: 'voter_registration',
    keywords: ['register','registration','voter id','epic card','how to register','enroll','voter list','electoral roll','form 6','nvsp','voters portal','matdata','voter card'],
    responses: [{
      headline: 'How to Register as a Voter in India',
      body: 'Any Indian citizen aged 18+ can register on the Electoral Roll. Registration is done through the National Voters\' Service Portal (NVSP) or by submitting Form 6 at your local ERO/AERO office.',
      steps: [
        'Visit voters.eci.gov.in (National Voters\' Service Portal)',
        'Click "Register as New Voter" (Form 6)',
        'Enter your details: name, DOB, address, and aadhaar (optional)',
        'Upload proof of age and address documents',
        'Submit and note your reference number',
        'Your application will be verified by the BLO within 30 days',
        'Download your e-EPIC (digital voter ID) once approved',
      ],
      actions: [
        { label: 'Register on NVSP', url: 'https://voters.eci.gov.in' },
        { label: 'Download e-EPIC', url: 'https://voters.eci.gov.in' },
      ],
      videos: [
        { title: 'How to Register as a Voter Online', url: 'https://www.youtube.com/watch?v=BJCjsgEiQwg' }
      ],
      followUps: ['What documents do I need?', 'How do I check my name on the voter list?', 'What is an EPIC card?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  epic_card: {
    intent: 'epic_card',
    keywords: ['epic card','voter id card','voter card','plastic voter id','electoral photo identity','download voter id','e-epic','voter identity card'],
    responses: [{
      headline: 'EPIC Card — Electors\' Photo Identity Card',
      body: 'The EPIC (Electors\' Photo Identity Card) is issued by the Election Commission of India. It serves as both a voter identity and a general photo ID document. You can now download an e-EPIC (digital version) on your phone.',
      steps: [
        'Visit voters.eci.gov.in',
        'Log in or register with your mobile number',
        'Go to "Download e-EPIC"',
        'Enter your EPIC number or details',
        'Verify via OTP and download the PDF',
      ],
      actions: [
        { label: 'Download e-EPIC', url: 'https://voters.eci.gov.in/download-eEpic' },
      ],
      followUps: ['How do I update my voter ID address?', 'What if my EPIC has errors?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  lok_sabha: {
    intent: 'lok_sabha',
    keywords: ['lok sabha','lower house','house of the people','parliament','mps','lok sabha election','general election','lok sabha seats','543','prime minister election','general elections 2024'],
    responses: [{
      headline: 'Lok Sabha — House of the People',
      body: 'The Lok Sabha is the lower house of India\'s Parliament. It has 543 directly elected seats from single-member constituencies (+ 2 nominated Anglo-Indian seats until 2020). A party or coalition needs 272 seats to form the government.',
      steps: [
        'Elections held every 5 years using First-Past-The-Post (FPTP) system',
        '543 constituencies across India — each elects one MP',
        'Voting age: 18 years | Voting is by EVM + VVPAT',
        'The party with 272+ seats (or coalition majority) forms the government',
        'The leader of the majority party is invited to be Prime Minister',
        '2024 election result: NDA won 293 seats, INDIA bloc won 234 seats',
      ],
      actions: [
        { label: 'ECI Official Results', url: 'https://results.eci.gov.in' },
        { label: 'Know Your Constituency', url: 'https://voters.eci.gov.in' },
      ],
      followUps: ['What is Rajya Sabha?', 'How is a PM elected?', 'What are reserved seats?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  rajya_sabha: {
    intent: 'rajya_sabha',
    keywords: ['rajya sabha','upper house','council of states','rajya sabha election','rajya sabha seats','250','indirect election','mp rajya sabha'],
    responses: [{
      headline: 'Rajya Sabha — Council of States',
      body: 'The Rajya Sabha is the upper house of India\'s Parliament with a maximum of 250 seats. Unlike Lok Sabha, it is a permanent house that is never dissolved. Members are elected indirectly by State Legislative Assemblies.',
      steps: [
        'Not directly elected by the public — elected by elected MLAs of each state',
        'Maximum 250 seats (238 elected + 12 nominated by President)',
        'Members serve 6-year terms; one-third retire every 2 years',
        'Provides representation to states and union territories',
        'Cannot vote on Money Bills but can suggest amendments',
      ],
      actions: [
        { label: 'Rajya Sabha Official Site', url: 'https://rajyasabha.nic.in' },
      ],
      followUps: ['What is the difference between Lok Sabha and Rajya Sabha?', 'Who nominates Rajya Sabha members?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  state_elections: {
    intent: 'state_elections',
    keywords: ['state election','assembly election','vidhan sabha','legislative assembly','mla','state legislature','state assembly','vidhansabha','state government','chief minister'],
    responses: [{
      headline: 'State Legislative Assembly (Vidhan Sabha) Elections',
      body: 'Each Indian state has a Vidhan Sabha (State Legislative Assembly). Elections are held every 5 years under the supervision of the Election Commission of India. The leader of the majority party becomes Chief Minister.',
      steps: [
        'Each constituency in a state elects one MLA (Member of Legislative Assembly)',
        'System: First-Past-The-Post (FPTP) — same as Lok Sabha',
        'State elections are often held separately from Lok Sabha elections',
        'Some states also have a Vidhan Parishad (upper house)',
        'The Governor invites the majority party leader to form the government',
        'A party needs simple majority (50%+1 seats) to govern alone',
      ],
      actions: [
        { label: 'ECI — State Elections', url: 'https://eci.gov.in/statistical-report/state-wise-statistical-report' },
      ],
      followUps: ['What is One Nation One Election?', 'How many MLAs are in each state?', 'What is a no-confidence motion?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  evm: {
    intent: 'evm',
    keywords: ['evm','electronic voting machine','voting machine','how to use evm','button on evm','ballot unit','control unit','vvpat','paper trail','tamper'],
    responses: [{
      headline: 'Electronic Voting Machine (EVM) in India',
      body: 'India uses EVMs — standalone battery-operated devices that record votes electronically. They consist of a Control Unit (with the presiding officer) and a Balloting Unit (at the voting compartment). EVMs are not connected to the internet and are tamper-evident.',
      steps: [
        'The presiding officer enables the EVM using the "Ballot" button on the Control Unit',
        'The voter enters the booth and presses the button next to their candidate\'s symbol on the Ballot Unit',
        'A beep confirms the vote; the VVPAT paper slip appears briefly in a glass window',
        'The voter verifies the slip (name + symbol) — it drops into a sealed compartment',
        'Each EVM can hold up to 2,000 votes and support up to 64 candidates',
      ],
      actions: [
        { label: 'ECI — EVM Information', url: 'https://ecisveep.nic.in/evm/' },
      ],
      videos: [
        { title: 'How Electronic Voting Machine (EVM) Works', url: 'https://www.youtube.com/watch?v=ZJReQ8ao0SU' }
      ],
      followUps: ['What is VVPAT?', 'Can EVM results be challenged?', 'Who manufactures EVMs?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  vvpat: {
    intent: 'vvpat',
    keywords: ['vvpat','paper trail','paper slip','voter verified','voter verified paper audit trail','vvpat counting','vvpat machine'],
    responses: [{
      headline: 'VVPAT — Voter Verified Paper Audit Trail',
      body: 'VVPAT is a printer attached to the EVM Ballot Unit. When a voter casts their vote, a paper slip is printed showing the candidate\'s name and symbol. The voter sees it for 7 seconds through a glass window before it drops into a sealed box.',
      steps: [
        'VVPAT provides a physical paper record of every vote',
        'After voting, the slip is visible for 7 seconds before dropping into a sealed box',
        'At least 5 EVMs per Assembly segment are randomly selected for VVPAT count verification',
        'VVPAT slips act as backup evidence if a dispute arises',
      ],
      actions: [
        { label: 'ECI VVPAT Information', url: 'https://ecisveep.nic.in/evm/' },
      ],
      videos: [
        { title: 'What is VVPAT and How does it work?', url: 'https://www.youtube.com/watch?v=ZJReQ8ao0SU' }
      ],
      followUps: ['How many EVMs are VVPAT-verified?', 'Who manufactures VVPAT machines?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  model_code: {
    intent: 'model_code',
    keywords: ['model code of conduct','mcc','election code','code of conduct','party manifesto rule','free gifts','freebies','model code','election rules'],
    responses: [{
      headline: 'Model Code of Conduct (MCC)',
      body: 'The Model Code of Conduct is a set of guidelines issued by the Election Commission of India to regulate political parties and candidates during elections. It comes into force once the election schedule is announced.',
      steps: [
        'Comes into effect on announcement of election schedule',
        'Governs: speeches, election manifestos, polling booth behaviour, and use of government machinery',
        'Government cannot announce new welfare schemes or policies during MCC period',
        'Ministers cannot use official machinery or staff for campaign activities',
        'Violations are reported to the ECI via the cVIGIL app (upload photo/video evidence)',
        'MCC ends with the completion of the election process',
      ],
      actions: [
        { label: 'cVIGIL — Report MCC Violation', url: 'https://cvigil.eci.gov.in' },
        { label: 'MCC Full Text', url: 'https://eci.gov.in/mcc' },
      ],
      followUps: ['What is cVIGIL?', 'Can candidates promise freebies?', 'Who enforces the MCC?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  nota: {
    intent: 'nota',
    keywords: ['nota','none of the above','reject all candidates','nota button','nota in india'],
    responses: [{
      headline: 'NOTA — None of the Above',
      body: 'NOTA was introduced in Indian elections in 2013 following a Supreme Court order. It allows voters to reject all candidates on the ballot. NOTA has no electoral impact — if NOTA gets the most votes, the candidate with the second-highest votes wins.',
      steps: [
        'NOTA is the last option on the EVM Ballot Unit',
        'Introduced for Lok Sabha and state assembly elections from 2013',
        'Pressing NOTA records your presence but doesn\'t elect anyone',
        'The candidate with the most votes (excluding NOTA) still wins',
        'NOTA has the symbol of a ballot paper with a cross',
      ],
      actions: [
        { label: 'ECI — NOTA Info', url: 'https://eci.gov.in/files/category/4-nota/' },
      ],
      videos: [
        { title: 'Understanding NOTA (None Of The Above)', url: 'https://www.youtube.com/embed/770H5gWsjcI' }
      ],
      followUps: ['What happens if NOTA wins?', 'Which country introduced NOTA first?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  resignation_death: {
    intent: 'resignation_death',
    keywords: ['resign', 'resigns', 'dies', 'death of mp', 'death of mla', 'vacant seat', 'by-election', 'byelection', 'vacated'],
    responses: [{
      headline: 'What Happens if an MP or MLA Resigns or Dies?',
      body: 'If a sitting Member of Parliament (MP) or Member of Legislative Assembly (MLA) resigns, dies, or is disqualified, their seat becomes vacant. Under the Representation of the People Act, 1951, a by-election must be held to fill the vacancy.',
      steps: [
        'The Speaker of the House notifies the Election Commission about the vacancy',
        'The ECI must conduct a by-election within 6 months from the date of vacancy',
        'Exception: No by-election is held if the remainder of the term is less than one year',
        'The newly elected member serves only for the remainder of the original 5-year term',
      ],
      actions: [
        { label: 'By-elections Rules (ECI)', url: 'https://eci.gov.in' },
      ],
      videos: [
        { title: 'By-Elections in India Explained', url: 'https://www.youtube.com/embed/zHk_MWe3nC8' }
      ],
      followUps: ['What is the Representation of the People Act?', 'What happens if a candidate dies before polling?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  jailed_disqualification: {
    intent: 'jailed_disqualification',
    keywords: ['jailed', 'prison', 'arrested', 'criminal case', 'disqualified', 'convicted', 'disqualification', 'jail'],
    responses: [{
      headline: 'Disqualification of Jailed or Convicted Members',
      body: 'Under Section 8 of the Representation of the People Act, 1951, politicians convicted of certain offenses and sentenced to 2 or more years in prison are immediately disqualified from being an MP or MLA.',
      steps: [
        'Immediate Disqualification: Conviction resulting in 2+ years of imprisonment leads to instant disqualification (Lily Thomas vs Union of India, 2013)',
        'Disqualification Period: The individual remains disqualified for the period of imprisonment and a further 6 years after release',
        'Undertrials: Politicians in jail without a conviction can still contest elections',
        'Voting Rights: Persons confined in prison (under sentence, death, or undertrial) cannot vote, but those under preventive detention can',
      ],
      actions: [
        { label: 'RPA 1951 Document', url: 'https://eci.gov.in/files/file/9-representation-of-the-people-act-1951/' },
      ],
      videos: [
        { title: 'Can Convicted Politicians Contest Elections?', url: 'https://www.youtube.com/embed/XqEONHExB4M' }
      ],
      followUps: ['Can an undertrial prisoner vote?', 'What was the Lily Thomas judgment?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  election_day: {
    intent: 'election_day',
    keywords: ['election day','voting day','when is election','poll date','polling date','election schedule','voting date','when to vote','national holiday election'],
    responses: [{
      headline: 'Polling Day in India',
      body: 'Election Day in India is declared a public holiday (Paid Holiday). Lok Sabha 2024 was held in 7 phases (April 19 – June 1, 2024). Results were declared on June 4, 2024.',
      steps: [
        'Election dates are announced by ECI; it\'s a paid public holiday',
        'Polling hours: typically 7:00 AM to 6:00 PM (varies by region)',
        'Bring your EPIC card or any of the 12 alternative photo IDs',
        'Find your polling booth using voters.eci.gov.in or SMS "ECI" to 1950',
        'Anyone in the queue at closing time is entitled to vote',
        'Next General Election: 2029',
      ],
      actions: [
        { label: 'Find Your Polling Booth', url: 'https://voters.eci.gov.in/polling-station-locator' },
        { label: 'ECI Election Calendar', url: 'https://eci.gov.in/elections/election-schedule' },
      ],
      followUps: ['What ID can I carry to the polling booth?', 'What are the polling hours?', 'How many phases in Lok Sabha 2024?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  id_documents: {
    intent: 'id_documents',
    keywords: ['id','identity proof','what to bring','photo id','polling booth id','alternative id','aadhar','driving licence','passport','voter id alternative','12 id'],
    responses: [{
      headline: 'Valid ID Documents at the Polling Booth',
      body: 'You can use your EPIC (voter ID) or any of 12 alternative photo ID documents approved by the Election Commission of India.',
      steps: [
        '1. EPIC (Voter ID Card)',
        '2. Aadhaar Card',
        '3. Passport',
        '4. Driving Licence',
        '5. PAN Card',
        '6. MNREGA Job Card',
        '7. Bank / Post Office Passbook with Photo',
        '8. Health Insurance Smart Card (ESIC)',
        '9. Pension Document with Photo',
        '10. NPR Smart Card',
        '11. Official Identity Card from Central/State Government',
        '12. Unique Disability ID (UDID) Card',
      ],
      actions: [
        { label: 'ECI — Accepted IDs', url: 'https://eci.gov.in' },
      ],
      followUps: ['Is Aadhaar sufficient to vote?', 'What if I lost my voter ID?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  polling_booth: {
    intent: 'polling_booth',
    keywords: ['polling booth','polling station','where to vote','find booth','booth number','find my polling station','voting centre'],
    responses: [{
      headline: 'Find Your Polling Booth',
      body: 'Every voter is assigned to a specific polling booth based on their registered address. Polling booths are typically at schools, government offices, or panchayat buildings.',
      steps: [
        'Visit voters.eci.gov.in → "Know Your Polling Station"',
        'Or SMS: EPIC <your-epic-number> to 1950',
        'Or call the helpline: 1950',
        'Or check your ECI Voter Info Slip distributed before elections',
        'BLOs (Booth Level Officers) can also confirm your booth location',
      ],
      actions: [
        { label: 'Find Polling Station', url: 'https://voters.eci.gov.in/polling-station-locator' },
        { label: 'Helpline 1950', url: 'tel:1950' },
      ],
      followUps: ['What is a BLO?', 'What time do polls open?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  eligibility: {
    intent: 'eligibility',
    keywords: ['eligible','eligibility','who can vote','18 years','citizen','age to vote','can i vote','nri vote','nri voting','overseas voter','prison vote','disqualified'],
    responses: [{
      headline: 'Voting Eligibility in India',
      body: 'To vote in Indian elections you must be: (1) an Indian citizen, (2) at least 18 years old on the qualifying date (January 1 of the registration year), and (3) registered in the electoral roll of a constituency.',
      steps: [
        '✓ Must be an Indian citizen',
        '✓ Minimum age: 18 years as on January 1 of the relevant year',
        '✓ Must be enrolled on the Electoral Roll of a constituency',
        '✗ Persons declared of unsound mind by a competent court',
        '✗ Persons disqualified under any law for corrupt practices',
        '✗ Non-resident citizens (NRIs) can register as overseas voters and vote in person',
        '✓ Prisoners on bail can vote; undertrials and convicts serving sentences cannot',
      ],
      actions: [
        { label: 'Check Eligibility & Register', url: 'https://voters.eci.gov.in' },
      ],
      followUps: ['Can NRIs vote?', 'Can prisoners vote in India?', 'What is the qualifying date?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  election_commission: {
    intent: 'election_commission',
    keywords: ['election commission','eci','election commission of india','chief election commissioner','cec','election body','eci india','independent body','who conducts election'],
    responses: [{
      headline: 'Election Commission of India (ECI)',
      body: 'The Election Commission of India is a constitutional body (Article 324) responsible for administering elections to Parliament, State Legislatures, the President, and the Vice-President of India. It is an independent body insulated from government control.',
      steps: [
        'Established: January 25, 1950 (celebrated as National Voters\' Day)',
        'Headed by: Chief Election Commissioner + 2 Election Commissioners',
        'Conducts: Lok Sabha, Rajya Sabha, State Assembly, President & VP elections',
        'Powers: Can enforce MCC, transfer officials, disqualify candidates',
        'Website: eci.gov.in | Helpline: 1950',
      ],
      actions: [
        { label: 'ECI Official Website', url: 'https://eci.gov.in' },
        { label: 'NVSP Voter Portal', url: 'https://voters.eci.gov.in' },
      ],
      followUps: ['Who is the current Chief Election Commissioner?', 'What is National Voters\' Day?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  nomination: {
    intent: 'nomination',
    keywords: ['nomination','candidate nomination','how to contest election','file nomination','nomination form','how to stand for election','contesting','nomination papers','returning officer'],
    responses: [{
      headline: 'Filing Nomination to Contest an Election',
      body: 'Any eligible Indian citizen can contest an election by filing a nomination with the Returning Officer (RO) of their constituency during the notified period.',
      steps: [
        '1. Be an Indian citizen aged 25+ (Lok Sabha/State) or 30+ (Rajya Sabha)',
        '2. Be a registered voter anywhere in India',
        '3. Obtain Form 2-A (nomination form) from Returning Officer',
        '4. File within the notified nomination period (usually 7–10 days)',
        '5. Deposit security amount: ₹25,000 (general constituency), ₹12,500 (SC/ST)',
        '6. Submit affidavit declaring criminal history, assets, and liabilities (Form 26)',
        '7. Attend scrutiny of nominations; campaign begins post-withdrawal period',
      ],
      actions: [
        { label: 'Affidavit Database', url: 'https://affidavit.eci.gov.in' },
      ],
      followUps: ['What is the deposit for contesting?', 'Can a person with criminal cases contest?', 'What is Form 26?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  reserved_seats: {
    intent: 'reserved_seats',
    keywords: ['reserved seats','sc reserved','st reserved','scheduled caste','scheduled tribe','reservation in elections','reserved constituency','general seat'],
    responses: [{
      headline: 'Reserved Seats in Indian Elections',
      body: 'The Indian Constitution provides reservation of constituencies for Scheduled Castes (SC) and Scheduled Tribes (ST) in the Lok Sabha and State Assemblies, proportional to their population.',
      steps: [
        'Lok Sabha: 84 seats reserved for SC, 47 seats reserved for ST (out of 543)',
        'State Assemblies: Reservation proportional to SC/ST population in each state',
        'Only candidates belonging to the respective SC/ST community can contest from reserved seats',
        'Delimitation Commission reviews constituency boundaries including reserved seats',
        'Reservation is subject to review after each Census under the Delimitation Act',
      ],
      actions: [
        { label: 'Delimitation Commission', url: 'https://www.delimitation.nic.in' },
      ],
      followUps: ['What is delimitation?', 'Do reserved seats change after Census?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  cvigil: {
    intent: 'cvigil',
    keywords: ['cvigil','c-vigil','report violation','mcc violation','complaint election','report bribery','report illegal activity election','election complaint app'],
    responses: [{
      headline: 'cVIGIL — Citizen Vigilance App',
      body: 'cVIGIL is the Election Commission\'s citizen app to report Model Code of Conduct violations instantly. The complaint is automatically geo-tagged and routed to district authorities who must respond within 100 minutes.',
      steps: [
        'Download cVIGIL from App Store or Play Store',
        'Enable location (mandatory for geo-tagging the complaint)',
        'Take a photo or video of the violation (max 2 minutes)',
        'Submit — anonymous reporting is available',
        'Track complaint status within the app',
        'Flying Squads are dispatched within 100 minutes',
      ],
      actions: [
        { label: 'cVIGIL App', url: 'https://cvigil.eci.gov.in' },
      ],
      followUps: ['What MCC violations can I report?', 'Is cVIGIL anonymous?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  vote_counting: {
    intent: 'vote_counting',
    keywords: ['counting','vote counting','result','how votes counted','result day','counting day','evm counting','counting centre','how results declared'],
    responses: [{
      headline: 'How Votes are Counted in India',
      body: 'Votes are counted by opening the Control Units of EVMs at designated Counting Centres under the supervision of Returning Officers and candidates/their representatives.',
      steps: [
        'Counting day is announced with the election schedule',
        'EVMs and VVPAT boxes are brought from strong rooms to counting centres',
        'First: Postal Ballots (including service voter ballots) are counted',
        'Then: EVM results are tabulated round by round for each assembly segment',
        'At least 5 EVMs per assembly segment are verified against VVPAT slips',
        'Running totals are displayed on public notice boards & ECI Results Portal',
        'Returning Officer declares the winner and issues election certificate',
      ],
      actions: [
        { label: 'ECI Results Portal', url: 'https://results.eci.gov.in' },
      ],
      followUps: ['When are results declared?', 'What is a postal ballot?'],
    }],
  },

  // ──────────────────────────────────────────────────────────────
  default: {
    intent: 'default',
    keywords: [],
    responses: [{
      headline: "Namaskar! I'm ElectIQ India",
      body: 'Your AI guide to Indian elections — powered by Election Commission of India data. I can answer questions about voter registration, EVMs, Lok Sabha, Rajya Sabha, Model Code of Conduct, NOTA, and much more.',
      steps: [],
      actions: [
        { label: 'Register to Vote', url: 'https://voters.eci.gov.in' },
        { label: 'ECI Official Site', url: 'https://eci.gov.in' },
      ],
      followUps: ['How do I register as a voter?', 'What is an EPIC card?', 'How does EVM work?', 'What is NOTA?'],
    }],
  },
};

export default knowledgeBase;
