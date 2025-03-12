import { useState, useEffect } from 'react';

export type DatePickerProps = {
    selectedDate?: string;
    onDateChange: (date: string) => void;
};

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded-md ml-2"
            />
        </div>
    );
}
