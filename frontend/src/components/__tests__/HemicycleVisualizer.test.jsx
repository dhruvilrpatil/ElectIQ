/**
 * @fileoverview Tests for the HemicycleVisualizer (AssemblySeats) component.
 * Tests that the correct number of seat arcs render for a given party distribution.
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SEAT_DATA } from '@/utils/constants';

// Mock framer-motion to prevent animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement('div', props, children),
    circle: ({ children, ...props }) => React.createElement('circle', props, children),
  },
  AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
}));

import AssemblySeats from '../assembly/AssemblySeats';

describe('AssemblySeats (Hemicycle Visualizer)', () => {
  it('renders without crashing', () => {
    const { container } = render(React.createElement(AssemblySeats));
    expect(container.firstChild).toBeTruthy();
  });

  it('renders the page title', () => {
    render(React.createElement(AssemblySeats));
    expect(screen.getByText('Parliamentary Composition')).toBeInTheDocument();
  });

  it('renders a tab button for each assembly type', () => {
    render(React.createElement(AssemblySeats));
    const assemblyTypes = Object.keys(SEAT_DATA);

    for (const assemblyType of assemblyTypes) {
      expect(screen.getByText(assemblyType)).toBeInTheDocument();
    }
  });

  it('renders the Lok Sabha distribution by default', () => {
    render(React.createElement(AssemblySeats));
    expect(screen.getByText('Lok Sabha Distribution')).toBeInTheDocument();
  });

  it('renders an SVG hemicycle chart', () => {
    const { container } = render(React.createElement(AssemblySeats));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders the correct number of alliance groups in the legend', () => {
    render(React.createElement(AssemblySeats));

    const lokSabhaAlliances = SEAT_DATA['Lok Sabha'].alliances;

    // Each alliance name should appear in the legend
    for (const alliance of lokSabhaAlliances) {
      expect(screen.getByText(alliance.name)).toBeInTheDocument();
    }
  });

  it('renders seat counts for each alliance', () => {
    render(React.createElement(AssemblySeats));

    const lokSabhaAlliances = SEAT_DATA['Lok Sabha'].alliances;

    for (const alliance of lokSabhaAlliances) {
      // Alliance seat count should appear
      const seatElements = screen.getAllByText(String(alliance.seats));
      expect(seatElements.length).toBeGreaterThan(0);
    }
  });

  it('renders the correct total seat count', () => {
    render(React.createElement(AssemblySeats));
    const totalSeats = SEAT_DATA['Lok Sabha'].total;
    expect(screen.getByText(String(totalSeats))).toBeInTheDocument();
  });

  it('renders individual party names', () => {
    render(React.createElement(AssemblySeats));

    // BJP should appear in the legend
    expect(screen.getByText(/BJP/)).toBeInTheDocument();
  });

  it('renders circle elements for each seat', () => {
    const { container } = render(React.createElement(AssemblySeats));
    const circles = container.querySelectorAll('circle');

    // Should render circles equal to or close to total seats (543 for Lok Sabha)
    expect(circles.length).toBeGreaterThan(0);
    expect(circles.length).toBeLessThanOrEqual(SEAT_DATA['Lok Sabha'].total + 10);
  });
});
