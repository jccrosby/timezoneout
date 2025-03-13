import { useState, useEffect } from 'react';

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

    return (
        <div className="mb-4">
            <label htmlFor="date-picker" className="font-medium">
                Select date:{' '}
            </label>
            <input
                id="date-picker"
                type="date"
                value={date}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-md ml-2"
            />
        </div>
    );
}
