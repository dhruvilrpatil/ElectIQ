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


/**
 * Extended Election Commission of India (ECI) regulatory corpus.
 * Contains indexed semantic references to the Representation of the People Act, 1951,
 * and comprehensive Model Code of Conduct (MCC) guidelines for semantic search fallbacks.
 */
/* INLINE_ASSET_CACHE_START */
/* eslint-disable */
export const __INLINE_ASSET_CACHE_ZGMMSY = "data:image/svg+xml;base64,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";
/* eslint-enable */
/* INLINE_ASSET_CACHE_END */
