import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AssemblySeats.module.css';

const SEAT_DATA = {
  "Lok Sabha": {
    total: 543,
    alliances: [
      { name: "I.N.D.I.A.", color: "#1E88E5", seats: 234, parties: [{name: "INC", seats: 99}, {name: "SP", seats: 37}, {name: "TMC", seats: 29}, {name: "DMK", seats: 22}, {name: "Others", seats: 47}] },
      { name: "Others", color: "#9E9E9E", seats: 16, parties: [{name: "YSRCP", seats: 4}, {name: "IND/Others", seats: 12}] },
      { name: "NDA", color: "#FF8F00", seats: 293, parties: [{name: "BJP", seats: 240}, {name: "TDP", seats: 16}, {name: "JDU", seats: 12}, {name: "Others", seats: 25}] }
    ]
  },
  "Rajya Sabha": {
    total: 245,
    alliances: [
      { name: "I.N.D.I.A.", color: "#1E88E5", seats: 87, parties: [{name: "INC", seats: 26}, {name: "TMC", seats: 13}, {name: "AAP", seats: 10}, {name: "DMK", seats: 10}] },
      { name: "Others", color: "#9E9E9E", seats: 46, parties: [{name: "BJD", seats: 9}, {name: "YSRCP", seats: 11}, {name: "BRS", seats: 5}] },
      { name: "NDA", color: "#FF8F00", seats: 112, parties: [{name: "BJP", seats: 86}, {name: "NCP", seats: 3}, {name: "JD(U)", seats: 4}] }
    ]
  },
  "Maharashtra Assembly": {
    total: 288,
    alliances: [
      { name: "MVA (Opposition)", color: "#1E88E5", seats: 115, parties: [{name: "INC", seats: 45}, {name: "SS(UBT)", seats: 38}, {name: "NCP(SP)", seats: 32}] },
      { name: "Others", color: "#9E9E9E", seats: 28, parties: [{name: "BVA", seats: 3}, {name: "AIMIM", seats: 2}, {name: "IND", seats: 13}] },
      { name: "Mahayuti (Ruling)", color: "#FF8F00", seats: 145, parties: [{name: "BJP", seats: 105}, {name: "SS(Shinde)", seats: 40}] }
    ]
  },
  "UP Assembly": {
    total: 403,
    alliances: [
      { name: "SP+ (Opposition)", color: "#E53935", seats: 125, parties: [{name: "SP", seats: 111}, {name: "RLD", seats: 9}, {name: "SBSP", seats: 5}] },
      { name: "Others", color: "#9E9E9E", seats: 5, parties: [{name: "BSP", seats: 1}, {name: "INC", seats: 2}, {name: "Jansatta", seats: 2}] },
      { name: "NDA (Ruling)", color: "#FF8F00", seats: 273, parties: [{name: "BJP", seats: 255}, {name: "Apna Dal(S)", seats: 12}, {name: "NISHAD", seats: 6}] }
    ]
  }
};

function HemicycleChart({ alliances, total }) {
  const dots = [];
  let currentAllianceIdx = 0;
  let seatsProcessedInAlliance = 0;
  
  const rows = 9;
  const startRadius = 80;
  const endRadius = 180;
  const rowSpacing = (endRadius - startRadius) / (rows - 1);
  
  const seatsPerRow = [];
  let totalCalculated = 0;
  for (let r = 0; r < rows; r++) {
    const radius = startRadius + r * rowSpacing;
    const circumference = Math.PI * radius;
    const seats = Math.floor((circumference / (Math.PI * (startRadius + endRadius) / 2 * rows)) * total);
    seatsPerRow.push(seats);
    totalCalculated += seats;
  }
  
  let diff = total - totalCalculated;
  let r = rows - 1;
  while (diff > 0) {
    seatsPerRow[r]++;
    diff--;
    r = (r - 1 + rows) % rows;
  }
  while (diff < 0) {
    seatsPerRow[r]--;
    diff++;
    r = (r - 1 + rows) % rows;
  }
  
  const dotRadius = total > 400 ? 2.5 : total > 250 ? 3.5 : 4.5;

  let id = 0;
  for (let i = 0; i < rows; i++) {
    const radius = startRadius + i * rowSpacing;
    const count = seatsPerRow[i];
    for (let j = 0; j < count; j++) {
      // Angle goes from 180 deg (Math.PI) to 0 deg. Left to Right.
      const angle = count > 1 ? Math.PI - (j / (count - 1)) * Math.PI : Math.PI / 2;
      const cx = 200 + radius * Math.cos(angle);
      const cy = 190 - radius * Math.sin(angle);
      
      let alliance = alliances[currentAllianceIdx];
      if (alliance && seatsProcessedInAlliance >= alliance.seats) {
        currentAllianceIdx++;
        seatsProcessedInAlliance = 0;
        alliance = alliances[currentAllianceIdx];
      }
      seatsProcessedInAlliance++;
      
      dots.push(
        <motion.circle 
          key={id} 
          cx={cx} 
          cy={cy} 
          r={dotRadius} 
          fill={alliance ? alliance.color : '#CCC'} 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: id * 0.0015, duration: 0.3 }}
        />
      );
      id++;
    }
  }

  return (
    <div className={styles.chartContainer}>
      <svg viewBox="0 0 400 200" className={styles.svg}>
        {dots}
      </svg>
      <div className={styles.chartTotal}>
        <span className={styles.totalNum}>{total}</span>
        <span className={styles.totalLabel}>Seats</span>
      </div>
    </div>
  );
}

export default function AssemblySeats() {
  const [activeTab, setActiveTab] = useState("Lok Sabha");
  const data = SEAT_DATA[activeTab];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Parliamentary Composition</h1>
        <p className={styles.subtitle}>Visual representation of seat distribution across ruling and opposition parties.</p>
      </header>

      <div className={styles.tabs}>
        {Object.keys(SEAT_DATA).map(tab => (
          <button 
            key={tab} 
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.card}
        >
          <h2 className={styles.cardTitle}>{activeTab} Distribution</h2>
          <HemicycleChart alliances={data.alliances} total={data.total} />
          
          <div className={styles.legend}>
            {data.alliances.map((alliance, i) => (
              <div key={i} className={styles.legendItem}>
                <div className={styles.legendHeader}>
                  <span className={styles.dot} style={{ background: alliance.color }} />
                  <span className={styles.allianceName}>{alliance.name}</span>
                  <span className={styles.allianceSeats}>{alliance.seats}</span>
                </div>
                {alliance.parties && alliance.parties.length > 0 && (
                  <div className={styles.partyList}>
                    {alliance.parties.map((party, j) => (
                      <span key={j} className={styles.partyItem}>{party.name} <span className={styles.partySeats}>({party.seats})</span></span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
