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

    return (
        <div className="mb-4 flex items-center">
            <label htmlFor="date-picker" className="font-medium mx-2">
                Date:
            </label>
            {date && (
                <button
                    onClick={() => navigateDate('previous')}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md border border-r-0 border-gray-300"
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
                    id="date-picker"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="p-2 border border-gray-300"
                />
            </div>

            {date && (
                <button
                    onClick={() => navigateDate('next')}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md border border-l-0 border-gray-300"
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
