import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimezonePicker } from '../timezone-picker';

describe('TimezonePicker Component', () => {
    const mockOnTimezoneChange = vi.fn();

    it('renders with the provided timezone selected', () => {
        render(
            <TimezonePicker
                selectedTimezone="America/New_York"
                onTimezoneChange={mockOnTimezoneChange}
            />,
        );

        const select = screen.getByLabelText(/Timezone/i);
        expect(select).toHaveValue('America/New_York');
    });

    it('calls onTimezoneChange when selection changes', () => {
        render(
            <TimezonePicker
                selectedTimezone="America/New_York"
                onTimezoneChange={mockOnTimezoneChange}
            />,
        );

        const select = screen.getByLabelText(/Timezone/i);
        fireEvent.change(select, { target: { value: 'Asia/Tokyo' } });

        expect(mockOnTimezoneChange).toHaveBeenCalledWith('Asia/Tokyo');
    });

    it('renders the default option when no timezone is selected', () => {
        render(<TimezonePicker onTimezoneChange={mockOnTimezoneChange} />);

        const select = screen.getByLabelText(/Timezone/i);
        expect(select).toHaveValue('');
    });

    it('has multiple timezone options', () => {
        render(<TimezonePicker onTimezoneChange={mockOnTimezoneChange} />);

        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(1);

        // Check that specific timezones are present
        expect(screen.getByText(/Eastern Time/i)).toBeInTheDocument();
        expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();
    });

    it('allows selecting the default (no timezone) option', () => {
        render(
            <TimezonePicker
                selectedTimezone="America/New_York"
                onTimezoneChange={mockOnTimezoneChange}
            />,
        );

        const select = screen.getByLabelText(/Timezone/i);
        fireEvent.change(select, { target: { value: '' } });

        expect(mockOnTimezoneChange).toHaveBeenCalledWith('');
    });
});
