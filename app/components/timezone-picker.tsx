import React from 'react';
import { TIMEZONES } from '~/utils/date-time';

interface TimezonePickerProps {
    selectedTimezone: string | undefined;
    onTimezoneChange: (timezone: string | undefined) => void;
}

export function TimezonePicker({ selectedTimezone, onTimezoneChange }: TimezonePickerProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        // Pass undefined if "None" is selected, otherwise pass the selected value
        onTimezoneChange(value === '' ? undefined : value);
    };

    return (
        <div className="mb-4">
            <label htmlFor="timezone-picker" className="mr-2 font-medium">
                Timezone:
            </label>
            <select
                id="timezone-picker"
                value={selectedTimezone || ''}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md bg-white">
                <option value="">Default (No timezone selection)</option>
                {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                        {tz.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
