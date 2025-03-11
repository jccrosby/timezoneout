import { formatGameTime } from '~/utils/date-time';

export const DatetimeDisplay = ({ date, timezone }: { date: string; timezone: string }) => {
    return (
        <p className="mt-2 text-sm">
            <span className="font-bold">{timezone}:</span> {formatGameTime(date, timezone)}
        </p>
    );
};
