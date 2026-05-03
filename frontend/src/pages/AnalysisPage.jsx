import { useState } from 'react';
import SeatVisualiser from '../components/assembly/SeatVisualiser.jsx';
import { SEAT_DATA } from '../utils/constants.js';

/**
 * Renders the page for analysing parliamentary and assembly seat distributions.
 */
export default function AnalysisPage() {
  const [selectedBody, setSelectedBody] = useState('Lok Sabha');
  const bodies = Object.keys(SEAT_DATA);

  return (
    <main className="page analysis-page" id="main-content">
      <div className="analysis-header">
        <h2>Parliamentary & Assembly Analysis</h2>
        <div className="analysis-controls">
          <label htmlFor="body-select" className="sr-only">Select Legislative Body</label>
          <select
            id="body-select"
            value={selectedBody}
            onChange={(e) => setSelectedBody(e.target.value)}
            className="analysis-select"
          >
            {bodies.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="analysis-content">
        <SeatVisualiser body={selectedBody} />
      </div>
    </main>
  );
}
