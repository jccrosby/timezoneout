import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../date-picker';

describe('DatePicker Component', () => {
    const mockOnDateChange = vi.fn();

    beforeEach(() => {
        mockOnDateChange.mockClear();
    });

    it('renders with the provided date', () => {
        render(<DatePicker selectedDate="2025-03-17" onDateChange={mockOnDateChange} />);
        expect(screen.getByTestId('date-picker')).toHaveValue('2025-03-17');
    });

    it('calls onDateChange when date input changes', () => {
        render(<DatePicker selectedDate="2025-03-17" onDateChange={mockOnDateChange} />);

        const input = screen.getByTestId('date-picker');
        fireEvent.change(input, { target: { value: '2025-03-18' } });

        expect(mockOnDateChange).toHaveBeenCalledWith('2025-03-18');
    });

    it('navigates to previous day when previous button is clicked', () => {
        render(<DatePicker selectedDate="2025-03-17" onDateChange={mockOnDateChange} />);

        const prevButton = screen.getByLabelText(/Previous day/i);
        fireEvent.click(prevButton);

        expect(mockOnDateChange).toHaveBeenCalledWith('2025-03-16');
    });

    it('navigates to next day when next button is clicked', () => {
        render(<DatePicker selectedDate="2025-03-17" onDateChange={mockOnDateChange} />);

        const nextButton = screen.getByLabelText(/Next day/i);
        fireEvent.click(nextButton);

        expect(mockOnDateChange).toHaveBeenCalledWith('2025-03-18');
    });

    it('clears the date when clear button is clicked', () => {
        render(<DatePicker selectedDate="2025-03-17" onDateChange={mockOnDateChange} />);

        const clearButton = screen.getByLabelText(/Clear date/i);
        fireEvent.click(clearButton);

        expect(mockOnDateChange).toHaveBeenCalledWith('');
    });

    it('does not display navigation or clear buttons when no date is selected', () => {
        render(<DatePicker onDateChange={mockOnDateChange} />);

        expect(screen.queryByLabelText(/Previous day/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/Next day/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/Clear date/i)).not.toBeInTheDocument();
    });
});
