import { useEffect, useState } from 'react';
import { formatGameTime, TIMEZONES } from '~/utils/date-time';
import { DatetimeDisplay } from './datetime-display';

interface Team {
    team: {
        name: string;
        abbreviation: string;
    };
}

interface Game {
    teams: {
        away: Team;
        home: Team;
    };
    gameDate: string;
    officialDate: string;
}

interface ScheduleData {
    dates: Array<{
        games: Game[];
    }>;
}

export type BaseballScheduleProps = {
    onServiceUrlChange?: (url: string) => void;
    selectedDate?: string;
    timezone?: string; // Make timezone optional
};

export function BaseballSchedule({
    onServiceUrlChange,
    selectedDate,
    timezone,
}: BaseballScheduleProps) {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                // Build the URL with optional timezone parameter
                let url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=team`;
                if (selectedDate) {
                    url += `&date=${selectedDate}`;
                }
                if (timezone) {
                    url += `&timezone=${timezone}`;
                }

                url += `&cachebuster=${Date.now()}`;

                onServiceUrlChange?.(url);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: ScheduleData = await response.json();

                if (data.dates && data.dates.length > 0) {
                    setGames(data.dates[0].games || []);
                } else {
                    setGames([]);
                }
            } catch (err) {
                setError('Failed to fetch baseball schedule');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [selectedDate, timezone]);

    if (loading) {
        return <div className="flex justify-center items-center p-8">Loading schedule...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-8">Error: {error}</div>;
    }

    return (
        <div className="p-5 font-sans">
            {games.length === 0 ? (
                <div className="p-4 text-gray-500">No games scheduled for {selectedDate}</div>
            ) : (
                <>
                    {/* Add game count display */}
                    <div className="mb-4 text-center">
                        <p className="text-md font-semibold">Games: {games.length}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                        {games.map((game, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md h-full">
                                <h3 className="text-xl font-semibold">
                                    {game.teams.away.team.abbreviation} @{' '}
                                    {game.teams.home.team.abbreviation}
                                </h3>
                                {timezone ? (
                                    <p className="mt-2 text-sm">
                                        <span className="font-bold">Selected Timezone:</span>{' '}
                                        {timezone}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-sm">
                                        <span className="font-bold">No timezone selected</span>
                                    </p>
                                )}
                                <p className="mt-2 text-sm">
                                    <span className="mt-2 font-bold">Raw Date:</span>{' '}
                                    {game.gameDate}
                                </p>
                                <hr className="my-3 border-gray-300" />
                                {TIMEZONES.map((tz) => (
                                    <DatetimeDisplay
                                        key={tz.value}
                                        date={game.gameDate}
                                        timezone={tz.value}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
