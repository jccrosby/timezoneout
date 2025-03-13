import { useEffect, useState } from 'react';
import type { Game } from '~/types';
import { TIMEZONES } from '~/utils/date-time';
import { DatetimeDisplay } from './datetime-display';

export type BaseballScheduleProps = {
    games: Game[];
    selectedDate?: string;
    selectedTimezone?: string;
};

export function BaseballSchedule({ games, selectedDate, selectedTimezone }: BaseballScheduleProps) {
    return (
        <div className="p-5 font-sans">
            {games.length === 0 ? (
                <div className="p-4 text-gray-500">No games scheduled for {selectedDate}</div>
            ) : (
                <>
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
                                {selectedTimezone ? (
                                    <p className="mt-2 text-sm">
                                        <span className="font-bold">Selected Timezone:</span>{' '}
                                        {selectedTimezone}
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
