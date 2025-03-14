// app/utils/date-time.test.ts
import { describe, it, expect } from 'vitest';
import {
    formatGameTime,
    isValidTimezone,
    isValidDateFormat,
    getDefaultDate,
    TIMEZONES,
} from '../utils/date-time';

describe('Date and Time Utilities', () => {
    describe('formatGameTime', () => {
        it('formats game time in the specified timezone', () => {
            const dateStr = '2025-03-17T18:30:00Z';
            const result = formatGameTime(dateStr, 'America/New_York');

            // Check that it contains the expected date parts
            expect(result).toContain('Mar 17, 2025');
            expect(result).toMatch(/\d{1,2}:\d{2} [AP]M/); // Contains time format
            expect(result).toContain('(EDT)'); // Eastern Daylight Time
        });

        it('returns the original string if it cannot be parsed', () => {
            const invalidDate = 'not-a-date';
            expect(formatGameTime(invalidDate, 'America/New_York')).toBe(invalidDate);
        });
    });

    describe('isValidTimezone', () => {
        it('returns true for valid timezones', () => {
            expect(isValidTimezone('America/New_York')).toBe(true);
            expect(isValidTimezone('Asia/Tokyo')).toBe(true);
        });

        it('returns false for invalid timezones', () => {
            expect(isValidTimezone('Not/A/Timezone')).toBe(false);
            expect(isValidTimezone(null)).toBe(false);
            expect(isValidTimezone('')).toBe(false);
        });
    });

    describe('isValidDateFormat', () => {
        it('returns true for valid date formats', () => {
            expect(isValidDateFormat('2025-03-17')).toBe(true);
            expect(isValidDateFormat('2023-12-31')).toBe(true);
        });

        it('returns false for invalid date formats', () => {
            expect(isValidDateFormat('03/17/2025')).toBe(false);
            expect(isValidDateFormat('2025-3-17')).toBe(false);
            expect(isValidDateFormat(null)).toBe(false);
            expect(isValidDateFormat('')).toBe(false);
        });
    });

    describe('getDefaultDate', () => {
        it("returns today's date in YYYY-MM-DD format", () => {
            const result = getDefaultDate();
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    });

    describe('TIMEZONES', () => {
        it('contains the expected timezone formats', () => {
            expect(TIMEZONES).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        value: expect.any(String),
                        label: expect.any(String),
                    }),
                ]),
            );

            // Check specific timezones exist
            const timezoneValues = TIMEZONES.map((tz) => tz.value);
            expect(timezoneValues).toContain('America/New_York');
            expect(timezoneValues).toContain('Asia/Tokyo');
        });
    });
});
