import type { Route } from './+types/home';
import { BaseballSchedule } from '../components/baseball-schedule';
import { DatePicker } from '~/components/date-picker';
import { TimezonePicker } from '~/components/timezone-picker';
import { useState, useEffect } from 'react';
import { getDefaultDate, isValidTimezone, isValidDateFormat } from '~/utils/date-time';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Baseball Schedule' },
        { name: 'description', content: 'MLB Baseball Schedule' },
    ];
}

export default function Home() {
    const [serviceUrl, setServiceUrl] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string | undefined>();
    const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(undefined);

    // Read URL parameters on initial load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        // Handle date parameter
        const dateParam = urlParams.get('date');
        if (dateParam && isValidDateFormat(dateParam)) {
            setSelectedDate(dateParam);
        }

        // Handle timezone parameter
        const timezoneParam = urlParams.get('tz');
        if (timezoneParam && isValidTimezone(timezoneParam)) {
            setSelectedTimezone(timezoneParam);
        }
    }, []);

    // Update URL when selections change
    useEffect(() => {
        const urlParams = new URLSearchParams();

        // Add date parameter
        urlParams.set('date', selectedDate);

        // Only add timezone if specified
        if (selectedTimezone) {
            urlParams.set('tz', selectedTimezone);
        }

        // Update URL without reloading the page
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [selectedDate, selectedTimezone]);

    const handleServiceUrlChange = (url: string) => {
        setServiceUrl(url);
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    const handleTimezoneChange = (timezone: string | undefined) => {
        setSelectedTimezone(timezone);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                <TimezonePicker
                    selectedTimezone={selectedTimezone}
                    onTimezoneChange={handleTimezoneChange}
                />
            </div>
            <div className="mb-4 text-center">
                <p className="text-md font-medium">
                    Service URL:{' '}
                    {serviceUrl ? (
                        <a
                            href={serviceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline">
                            {serviceUrl}
                        </a>
                    ) : (
                        ''
                    )}
                </p>
            </div>
            <BaseballSchedule
                selectedDate={selectedDate}
                timezone={selectedTimezone}
                onServiceUrlChange={handleServiceUrlChange}
            />
        </div>
    );
}
