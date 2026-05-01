import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SEAT_DATA } from '../../utils/constants';
import styles from './AssemblySeats.module.css';

/**
 * HemicycleChart visualizes the seat distribution of an assembly.
 * @param {Object} props
 * @param {Array} props.alliances
 * @param {number} props.total
 * @returns {JSX.Element}
 */
function HemicycleChart({ alliances, total }) {
  const dots = useMemo(() => {
    const calculatedDots = [];
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
        
        calculatedDots.push(
          <motion.circle 
            key={id} 
            cx={cx} 
            cy={cy} 
            r={dotRadius} 
            fill={alliance ? alliance.color : '#CCC'} 
            aria-label={alliance ? `${alliance.name} seat` : 'Seat'}
            role="img"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: id * 0.0015, duration: 0.3 }}
          />
        );
        id++;
      }
    }
    return calculatedDots;
  }, [alliances, total]);

  return (
    <div className={styles.chartContainer}>
      <svg viewBox="0 0 400 200" className={styles.svg} role="img" aria-labelledby="hemicycle-title hemicycle-desc">
        <title id="hemicycle-title">Hemicycle Chart</title>
        <desc id="hemicycle-desc">A half-circle chart representing the {total} seats of the assembly.</desc>
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
