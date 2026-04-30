import React, { useState, useMemo } from 'react';
import styles from './LearnPage.module.css';

const SVG = {
  Video: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'text-bottom', marginRight:'8px'}}><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  Book: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'text-bottom', marginRight:'8px'}}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Question: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'text-bottom', marginRight:'8px'}}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Link: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{verticalAlign:'text-bottom', marginRight:'8px'}}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  India: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>,
  Form: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Camera: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Chart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Doc: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Play: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  Globe: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
};

/* Official Indian election YouTube videos */
const VIDEOS = [
  {
    id: 'v1',
    title: 'How to Vote Using EVM & VVPAT',
    description: 'Official ECI video explaining how to use the Electronic Voting Machine and verify your vote via VVPAT.',
    embedId: 'ZJReQ8ao0SU',
    category: 'Voting Process',
    lang: 'Hindi / English',
  },
  {
    id: 'v2',
    title: 'Voter Registration — How to Register Online',
    description: 'Step-by-step guide to registering on the National Voters\' Service Portal (voters.eci.gov.in).',
    embedId: 'BJCjsgEiQwg',
    category: 'Registration',
    lang: 'English',
  },
  {
    id: 'v3',
    title: 'Know Your Vote — ECI Documentary',
    description: 'Election Commission of India\'s documentary on how India conducts the world\'s largest democratic election.',
    embedId: 'nGiqYkFU7_0',
    category: 'Documentary',
    lang: 'English',
  },
  {
    id: 'v4',
    title: 'How Does India Vote? — Lok Sabha Elections Explained',
    description: 'An animated explainer of India\'s Lok Sabha election system, constituencies, and FPTP voting.',
    embedId: 'XGJQNKFYqYI',
    category: 'Explainer',
    lang: 'English',
  },
  {
    id: 'v5',
    title: 'Model Code of Conduct — ECI Guidelines',
    description: 'Official explanation of the Model Code of Conduct and what changes when elections are announced.',
    embedId: 'ZUlptL7Vcas',
    category: 'Rules & Law',
    lang: 'Hindi',
  },
  {
    id: 'v6',
    title: 'NOTA — None of the Above',
    description: 'What NOTA means, when it was introduced, and how to cast a NOTA vote on the EVM.',
    embedId: '770H5gWsjcI',
    category: 'Voting Process',
    lang: 'English',
  },
];

const GLOSSARY = [
  { term: 'ECI', def: 'Election Commission of India — the constitutional body (Article 324) that conducts all elections in India.' },
  { term: 'EPIC', def: 'Electors\' Photo Identity Card — the voter ID card issued by ECI. Now available as digital e-EPIC.' },
  { term: 'EVM', def: 'Electronic Voting Machine — the standalone, battery-operated device used to cast votes in India since 2004 Lok Sabha.' },
  { term: 'VVPAT', def: 'Voter Verified Paper Audit Trail — prints a paper slip for 7 seconds confirming your vote when you press EVM button.' },
  { term: 'NVSP', def: 'National Voters\' Service Portal — the official ECI portal (voters.eci.gov.in) for voter registration and services.' },
  { term: 'MCC', def: 'Model Code of Conduct — ECI guidelines that govern political parties and candidates from announcement of elections until results.' },
  { term: 'NOTA', def: 'None of the Above — the option to reject all candidates on the ballot. Introduced in India in 2013.' },
  { term: 'BLO', def: 'Booth Level Officer — the government official assigned to each polling booth to manage voter list accuracy.' },
  { term: 'ERO', def: 'Electoral Registration Officer — the officer responsible for maintaining the electoral roll in each constituency.' },
  { term: 'Lok Sabha', def: 'The lower house (House of the People) of India\'s Parliament. 543 directly elected seats; a party needs 272 to form government.' },
  { term: 'Rajya Sabha', def: 'The upper house (Council of States) of India\'s Parliament. Members are indirectly elected by state legislative assemblies.' },
  { term: 'Vidhan Sabha', def: 'State Legislative Assembly — the elected lower house of each Indian state\'s legislature.' },
  { term: 'MLA', def: 'Member of Legislative Assembly — an elected representative in a state Vidhan Sabha.' },
  { term: 'MP', def: 'Member of Parliament — an elected representative in the Lok Sabha or Rajya Sabha.' },
  { term: 'Constituency', def: 'A geographic division of voters. India has 543 Lok Sabha constituencies, each electing one MP by FPTP.' },
  { term: 'FPTP', def: 'First Past the Post — the voting system used in India where the candidate with the most votes in a constituency wins.' },
  { term: 'Delimitation', def: 'The process of redrawing constituency boundaries, usually after a Census, conducted by the Delimitation Commission.' },
  { term: 'Reserved Seat', def: 'Constituencies reserved for SC (84 seats in LS) and ST (47 seats in LS) candidates only, per constitutional provisions.' },
  { term: 'Postal Ballot', def: 'A ballot sent by post to service voters (armed forces), seniors 85+, PwD, and essential services workers.' },
  { term: 'cVIGIL', def: 'Citizen Vigilance App — ECI\'s app to report MCC violations with photo/video. Flying squads respond within 100 minutes.' },
  { term: 'Affidavit (Form 26)', def: 'A sworn declaration by a candidate disclosing criminal history, assets, and liabilities, mandatory before filing nomination.' },
  { term: 'Indelible Ink', def: 'The dark blue/purple ink applied to the left index finger of a voter after voting to prevent double voting.' },
  { term: 'Presiding Officer', def: 'The official in charge of a polling booth who controls the EVM and is responsible for fair conduct of polling.' },
  { term: 'Returning Officer', def: 'The district/sub-divisional officer responsible for conducting elections in a constituency and declaring results.' },
  { term: 'Bye-election', def: 'An election held to fill a vacancy in a seat that arose between general elections (e.g., death or resignation of an MP/MLA).' },
];

const FAQS = [
  { q: 'How do I register as a voter in India?', a: 'Visit voters.eci.gov.in, fill Form 6 online, upload proof of age and address, and submit. Your BLO will verify and add you to the electoral roll. You can then download your e-EPIC (digital voter ID).' },
  { q: 'What is the minimum age to vote in India?', a: '18 years as on January 1 of the year for which the voter list is prepared (the qualifying date). You can register before turning 18 if you turn 18 by January 1 of that year.' },
  { q: 'Can I vote without an EPIC (voter ID) card?', a: 'Yes. ECI accepts 12 alternative photo IDs at the polling booth: Aadhaar, Passport, Driving Licence, PAN Card, MNREGA Job Card, Bank Passbook with photo, ESIC Smart Card, Pension Document with Photo, NPR Smart Card, Government ID, Disability ID (UDID).' },
  { q: 'What is the difference between Lok Sabha and Vidhan Sabha elections?', a: 'Lok Sabha elections elect Members of Parliament for the central (federal) government at New Delhi. Vidhan Sabha elections elect MLAs for the state government. Both use the FPTP system. Lok Sabha has 543 seats; Vidhan Sabha sizes vary by state.' },
  { q: 'Can Non-Resident Indians (NRIs) vote?', a: 'Yes, NRIs can register as overseas voters and vote in person at their designated polling booth in India. They cannot vote by post or from abroad. Registration is via Form 6A on NVSP.' },
  { q: 'What is the purpose of indelible ink?', a: 'Indelible blue/purple ink is applied to the left index finger to prevent voters from voting more than once. It is manufactured in Mysore (Karnataka) and stays on for several days.' },
  { q: 'How is the Prime Minister elected?', a: 'The Prime Minister is not directly elected. After the Lok Sabha election, the President invites the leader of the party (or coalition) commanding a majority (272+ seats) to form the government and serve as PM.' },
  { q: 'What happens if no party gets a majority in Lok Sabha?', a: 'This is called a "hung parliament." Parties must form a coalition to get 272+ seats. The President has discretion to invite a coalition leader who commands a majority. If no majority can be formed, fresh elections may be called.' },
  { q: 'What is NOTA and does it affect the election result?', a: 'NOTA (None of the Above) lets you reject all candidates. It does NOT affect the result — the candidate with the most votes (excluding NOTA) still wins, even if NOTA has more votes than the winner. NOTA was introduced in India in October 2013 following a Supreme Court order.' },
  { q: 'How does the EVM prevent fraud?', a: 'EVMs are standalone, battery-operated units with no wireless or internet connectivity. They are manufactured by BEL and ECIL under ECI supervision. Candidates/agents can challenge EVMs via technical expert committee; VVPAT provides paper verification. The Supreme Court has upheld EVM reliability multiple times.' },
  { q: 'What is the Model Code of Conduct?', a: 'MCC is a set of ECI guidelines that kick in the moment election dates are announced. It prohibits announcing new government schemes, using government machinery for campaigns, making hate speeches, and distributing cash/gifts. Violations can be reported via the cVIGIL app.' },
  { q: 'What documents are needed to file nomination for election?', a: 'A candidate needs: (1) Nomination Form 2-A, (2) sworn affidavit in Form 26 (declaring assets, criminal history, liabilities), (3) security deposit (₹25,000 general; ₹12,500 SC/ST), (4) be a registered voter, (5) age 25+ for Lok Sabha/Vidhan Sabha, 30+ for Rajya Sabha.' },
];

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqBtn} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className={styles.faqArrow} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.faqAnswer}>{a}</div>}
    </div>
  );
}

function GlossaryItem({ term, def }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.glossItem}>
      <button className={styles.glossBtn} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className={styles.glossTerm}>{term}</span>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.glossDef}>{def}</div>}
    </div>
  );
}

export default function LearnPage() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0].id);
  const [glossSearch, setGlossSearch] = useState('');

  const filteredGloss = useMemo(() =>
    GLOSSARY.filter(g =>
      g.term.toLowerCase().includes(glossSearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossSearch.toLowerCase())
    ), [glossSearch]);

  const currentVideo = VIDEOS.find(v => v.id === activeVideo) || VIDEOS[0];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Learn About Indian Elections</h1>
        <p className={styles.sub}>Official videos, electoral glossary, and frequently asked questions — all in one place.</p>
      </header>

      {/* ── Quick Access ────────────────────────────────────── */}
      <nav className={styles.quickAccess} aria-label="Quick jumps">
        <a href="#video-section" className={styles.qaLink}><SVG.Video />Official Election Videos</a>
        <a href="#glossary-section" className={styles.qaLink}><SVG.Book />Election Glossary</a>
        <a href="#faq-section" className={styles.qaLink}><SVG.Question />Frequently Asked Questions</a>
        <a href="#resources-section" className={styles.qaLink}><SVG.Link />Official Resources</a>
      </nav>

      {/* ── Video Section ───────────────────────────────────── */}
      <section id="video-section" className={styles.videoSection} aria-label="Video library">
        <h2 className={styles.sectionTitle}><SVG.Video />Official Election Videos</h2>
        <div className={styles.videoLayout}>
          {/* Video list */}
          <div className={styles.videoList} role="list">
            {VIDEOS.map((v) => (
              <button
                key={v.id}
                role="listitem"
                className={`${styles.videoThumb} ${activeVideo === v.id ? styles.videoThumbActive : ''}`}
                onClick={() => setActiveVideo(v.id)}
                aria-pressed={activeVideo === v.id}
              >
                <div className={styles.thumbCategoryPill}>{v.category}</div>
                <div className={styles.thumbTitle}>{v.title}</div>
                <div className={styles.thumbLang}><SVG.Globe /> {v.lang}</div>
              </button>
            ))}
          </div>

          {/* Active video */}
          <div className={styles.videoMain}>
            <div className={styles.videoWrapper}>
              <iframe
                key={currentVideo.embedId}
                src={`https://www.youtube.com/embed/${currentVideo.embedId}?rel=0&modestbranding=1`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className={styles.videoInfo}>
              <span className={styles.categoryPill}>{currentVideo.category}</span>
              <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
              <p className={styles.videoDesc}>{currentVideo.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Glossary ─────────────────────────────────────────── */}
      <section id="glossary-section" className={styles.glossSection} aria-label="Election glossary">
        <h2 className={styles.sectionTitle}><SVG.Book />Election Glossary</h2>
        <input
          type="search"
          className={styles.glossSearch}
          placeholder="Search terms (EVM, VVPAT, NOTA, MCC…)"
          value={glossSearch}
          onChange={(e) => setGlossSearch(e.target.value)}
          aria-label="Search glossary"
        />
        {filteredGloss.length === 0 ? (
          <p className={styles.noResults}>No terms match "{glossSearch}"</p>
        ) : (
          <div className={styles.glossList}>
            {filteredGloss.map((g) => <GlossaryItem key={g.term} term={g.term} def={g.def} />)}
          </div>
        )}
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq-section" className={styles.faqSection} aria-label="Frequently asked questions">
        <h2 className={styles.sectionTitle}><SVG.Question />Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {FAQS.map((f) => <Accordion key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ── Official Links ───────────────────────────────────── */}
      <section id="resources-section" className={styles.linksSection} aria-label="Official resources">
        <h2 className={styles.sectionTitle}><SVG.Link />Official Resources</h2>
        <div className={styles.linksGrid}>
          {[
            { label: 'Electoral Search (Find Voter ID)', url: 'https://electoralsearch.eci.gov.in/', icon: <SVG.Search /> },
            { label: 'ECI Official Website', url: 'https://eci.gov.in', icon: <SVG.India /> },
            { label: 'National Voters\' Service Portal', url: 'https://voters.eci.gov.in', icon: <SVG.Form /> },
            { label: 'cVIGIL — Report MCC Violations', url: 'https://cvigil.eci.gov.in', icon: <SVG.Camera /> },
            { label: 'ECI Results Portal', url: 'https://results.eci.gov.in', icon: <SVG.Chart /> },
            { label: 'Candidate Affidavits', url: 'https://affidavit.eci.gov.in', icon: <SVG.Doc /> },
            { label: 'ECI YouTube Channel', url: 'https://www.youtube.com/@ECIVoterEducation', icon: <SVG.Play /> },
          ].map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
              <span className={styles.linkIcon}>{l.icon}</span>
              <span>{l.label}</span>
              <span className={styles.linkArrow} aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
