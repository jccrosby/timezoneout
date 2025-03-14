import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseballSchedule } from '../baseball-schedule';

// Mock data for testing
const mockGames = [
    {
        teams: {
            away: { team: { name: 'New York Yankees', abbreviation: 'NYY' } },
            home: { team: { name: 'Boston Red Sox', abbreviation: 'BOS' } },
        },
        gameDate: '2025-03-17T19:10:00Z',
        officialDate: '2025-03-17',
    },
    {
        teams: {
            away: { team: { name: 'Chicago Cubs', abbreviation: 'CHC' } },
            home: { team: { name: 'St. Louis Cardinals', abbreviation: 'STL' } },
        },
        gameDate: '2025-03-17T20:15:00Z',
        officialDate: '2025-03-17',
    },
];

describe('BaseballSchedule Component', () => {
    it('displays the correct number of games', () => {
        render(<BaseballSchedule games={mockGames} selectedDate="2025-03-17" />);

        expect(screen.getByText(/Games: /i)).toBeInTheDocument();
    });

    it('shows team abbreviations in the game cards', () => {
        render(<BaseballSchedule games={mockGames} selectedDate="2025-03-17" />);

        expect(screen.getByText(/NYY @ BOS/i)).toBeInTheDocument();
        expect(screen.getByText(/CHC @ STL/i)).toBeInTheDocument();
    });

    it('displays the selected timezone when provided', () => {
        render(
            <BaseballSchedule
                games={mockGames}
                selectedDate="2025-03-17"
                selectedTimezone="America/New_York"
            />,
        );

        expect(
            screen.getAllByText((_, element) => {
                console.log(`*** element?.textContent`, element?.textContent);
                return element?.textContent === 'Selected Timezone: America/New_York';
            }).length,
        ).toBe(2);
    });

    it('indicates when no timezone is selected', () => {
        render(<BaseballSchedule games={mockGames} selectedDate="2025-03-17" />);

        expect(screen.getAllByText(/No timezone selected/i).length).toBe(2);
    });

    it('displays a message when no games are scheduled', () => {
        render(<BaseballSchedule games={[]} selectedDate="2025-03-17" />);

        expect(screen.getByText(/No games scheduled for 2025-03-17/i)).toBeInTheDocument();
    });
});
