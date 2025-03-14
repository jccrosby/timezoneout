import { useState } from 'react';
import { addDays, format, parseISO } from 'date-fns';

export type DatePickerProps = {
    selectedDate?: string;
    onDateChange: (date: string) => void;
};

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
    const [date, setDate] = useState<string | undefined>(selectedDate || undefined);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        onDateChange(e.target.value);
    };

    const navigateDate = (direction: 'previous' | 'next') => {
        if (!date) return;

        try {
            const currentDate = parseISO(date);
            const newDate =
                direction === 'previous' ? addDays(currentDate, -1) : addDays(currentDate, 1);

            const formattedDate = format(newDate, 'yyyy-MM-dd');
            setDate(formattedDate);
            onDateChange(formattedDate);
        } catch (error) {
            console.error('Error navigating date:', error);
        }
    };

    // Add clear date function
    const clearDate = () => {
        setDate(undefined);
        onDateChange('');
    };

    // Common button style for consistent height
    const buttonClass =
        'px-3 bg-gray-200 hover:bg-gray-300 border border-gray-300 flex items-center h-[38px]';

    return (
        <div className="mb-4 flex items-center">
            <label htmlFor="date-picker" className="font-medium mx-2">
                Date:
            </label>
            {date && (
                <button
                    onClick={() => navigateDate('previous')}
                    className={`${buttonClass} rounded-l-md border-r-0`}
                    aria-label="Previous day">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}

            <div className="flex items-center">
                <input
                    data-testid="date-picker"
                    id="date-picker"
                    type="date"
                    value={date || ''}
                    onChange={handleDateChange}
                    className="p-2 border border-gray-300 h-[38px]"
                />

                {date && (
                    <button
                        onClick={clearDate}
                        className={`${buttonClass} border-l-0`}
                        aria-label="Clear date">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {date && (
                <button
                    onClick={() => navigateDate('next')}
                    className={`${buttonClass} rounded-r-md border-l-0`}
                    aria-label="Next day">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
