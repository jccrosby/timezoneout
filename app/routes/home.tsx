import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { DatePicker } from '~/components/date-picker';
import { TimezonePicker } from '~/components/timezone-picker';
import type { ScheduleData } from '~/types';
import { BaseballSchedule } from '../components/baseball-schedule';
import type { Route } from './+types/home';
import { getObjFromSearchParams } from '~/utils/url';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Baseball Schedule' },
        { name: 'description', content: 'MLB Baseball Schedule' },
    ];
}

export async function loader(loaderArgs: Route.ClientLoaderArgs) {
    const { request } = loaderArgs;
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const date = searchParams.get('date');
    const tz = searchParams.get('tz');
    let serviceUrl = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=team`;
    if (date) {
        serviceUrl += `&date=${date}`;
    }
    if (tz) {
        serviceUrl += `&timezone=${tz}`;
    }

    const response = await fetch(serviceUrl);

    if (!response.ok) {
        return {
            success: false,
            message: response.statusText,
        };
    }

    const data: ScheduleData = await response.json();

    return {
        success: true,
        games: data.dates.length > 0 ? data.dates[0].games : [],
        date,
        tz,
        serviceUrl,
    };
}

export function HydrateFallback() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-4 text-center">
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const { games, date, tz, serviceUrl } = loaderData;
    const [selectedDate, setSelectedDate] = useState<string | undefined>(date || undefined);
    const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>(tz || undefined);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setSearchParams({ ...getObjFromSearchParams(searchParams), date });
    };

    const handleTimezoneChange = (timezone: string) => {
        setSelectedTimezone(timezone);
        setSearchParams({ ...getObjFromSearchParams(searchParams), tz: timezone });
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
                games={games || []}
                selectedDate={selectedDate}
                selectedTimezone={selectedTimezone}
            />
        </div>
    );
}
