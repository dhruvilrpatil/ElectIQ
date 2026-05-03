/**
 * Calculates hemicycle seat visualiser geometry without React dependencies.
 */

/**
 * Converts polar coordinates to Cartesian for SVG.
 * @param {number} cx - Centre X.
 * @param {number} cy - Centre Y.
 * @param {number} radius - Radius.
 * @param {number} angleInDegrees - Angle in degrees.
 * @returns {{ x: number, y: number }} Cartesian coordinates.
 */
function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const rad = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/**
 * Generates an SVG arc path 'd' string.
 * @param {number} cx
 * @param {number} cy
 * @param {number} innerR - Inner radius.
 * @param {number} outerR - Outer radius.
 * @param {number} startAngle - Start angle in degrees.
 * @param {number} endAngle - End angle in degrees.
 * @returns {string} SVG path d attribute.
 */
function describeArc(cx, cy, innerR, outerR, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerR, endAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    'M', outerStart.x, outerStart.y,
    'A', outerR, outerR, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    'L', innerStart.x, innerStart.y,
    'A', innerR, innerR, 0, largeArcFlag, 1, innerEnd.x, innerEnd.y,
    'Z',
  ].join(' ');
}

/**
 * Calculates SVG arc coordinates for each party in the hemicycle.
 * @param {Array<{party: string, seats: number, colour: string, alliance: string}>} parties
 * @param {number} totalSeats - Total seats in the house.
 * @param {Object} svgConfig - { cx, cy, innerRadius, outerRadius, startAngle, endAngle }
 * @returns {Array<{party, seats, colour, alliance, path: string, midAngle: number}>} Array of arc data for each party.
 */
export function calculateHemicycleArcs(parties, totalSeats, svgConfig = {}) {
  const {
    cx = 400,
    cy = 400,
    innerRadius = 150,
    outerRadius = 350,
    startAngle = 0,
    endAngle = 180,
  } = svgConfig;

  const totalAngle = endAngle - startAngle;

  // Sort by alliance so allied parties are adjacent
  const allianceOrder = { NDA: 0, INDIA: 1, Others: 2 };
  const sorted = [...parties]
    .filter((p) => p.seats > 0)
    .sort((a, b) => (allianceOrder[a.alliance] || 3) - (allianceOrder[b.alliance] || 3));

  let currentAngle = startAngle;
  return sorted.map((party) => {
    const span = (party.seats / totalSeats) * totalAngle;
    const arcStartAngle = currentAngle;
    const arcEndAngle = currentAngle + span;
    const midAngle = arcStartAngle + span / 2;

    const path = describeArc(cx, cy, innerRadius, outerRadius, arcStartAngle, arcEndAngle);
    currentAngle = arcEndAngle;

    return {
      party: party.party,
      seats: party.seats,
      colour: party.colour,
      alliance: party.alliance,
      path,
      midAngle,
    };
  });
}

export default { calculateHemicycleArcs };
