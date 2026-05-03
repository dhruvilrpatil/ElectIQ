import { useMemo } from 'react';
import { calculateHemicycleArcs } from '../../engine/seatCalculator.js';
import { SEAT_DATA } from '../../utils/constants.js';

/**
 * Renders a hemicycle SVG chart displaying the distribution of seats for a given legislative body.
 * @param {Object} props
 * @param {string} [props.body='Lok Sabha'] - The name of the legislative body to visualise.
 */
export default function SeatVisualiser({ body = 'Lok Sabha' }) {
  const data = SEAT_DATA[body];
  if (!data) return <p>No data available for {body}.</p>;
  const { total, alliances } = data;

  const allParties = alliances.reduce((acc, alliance) => {
    return acc.concat(
      alliance.parties.map((p) => ({ ...p, alliance: alliance.name, colour: alliance.color }))
    );
  }, []);

  const arcs = useMemo(
    () => calculateHemicycleArcs(allParties, total, { cx: 200, cy: 200, innerRadius: 80, outerRadius: 180, startAngle: 0, endAngle: 180 }),
    [allParties, total]
  );

  return (
    <div className="seat-visualiser" aria-label={`${body} seat distribution chart`}>
      <h3 className="seat-visualiser__title">{body}</h3>
      <p className="seat-visualiser__total">Total Seats: {total}</p>
      <div className="seat-visualiser__svg-container">
        <svg viewBox="0 0 400 220" role="img" aria-label="Hemicycle chart">
          {arcs.map((arc, i) => (
            <path key={`${arc.party}-${i}`} d={arc.path} fill={arc.colour} stroke="#fff" strokeWidth="1" className="seat-visualiser__arc" title={`${arc.party}: ${arc.seats} seats`}>
              <title>{`${arc.party}: ${arc.seats} seats (${arc.alliance})`}</title>
            </path>
          ))}
          <path d="M 120 200 L 280 200 Z" stroke="#e0e0e0" strokeWidth="2" />
        </svg>
      </div>
      <div className="seat-visualiser__legend">
        {alliances.map((alliance) => (
          <div key={alliance.name} className="seat-visualiser__legend-item">
            <span className="seat-visualiser__legend-color" style={{ backgroundColor: alliance.color }} aria-hidden="true" />
            <span className="seat-visualiser__legend-label">{alliance.name}: {alliance.seats}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
