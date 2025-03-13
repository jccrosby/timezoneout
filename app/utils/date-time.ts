import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const TIMEZONES = [
    // North America
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    // Europe
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET)' },
    // Asia
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
    // Australia
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
];

export const formatGameTime = (dateString: string, specifiedTimezone: string) => {
    try {
        return formatInTimeZone(
            parseISO(dateString),
            specifiedTimezone,
            'MMM d, yyyy h:mm a (zzz)',
        );
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};

// Function to get default date (today's date formatted as YYYY-MM-DD)
export const getDefaultDate = (): string => {
    return format(new Date(), 'yyyy-MM-dd');
};

// Function to validate timezone
export const isValidTimezone = (timezone: string | null): boolean => {
    if (!timezone) return false;
    return TIMEZONES.some((tz) => tz.value === timezone);
};

// Function to validate date format (YYYY-MM-DD)
export const isValidDateFormat = (date: string | null): boolean => {
    if (!date) return false;
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
};
