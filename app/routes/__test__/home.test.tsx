import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loader } from '../home';

describe('Home Route Loader', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        // Mock global fetch
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                dates: [
                    {
                        games: [
                            {
                                /* mock game data */
                            },
                        ],
                    },
                ],
            }),
        });
    });

    it('fetches data with the correct URL when date is provided', async () => {
        const request = new Request('https://example.com/home?date=2025-03-17');
        await loader({ request, params: {}, context: {} });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('date=2025-03-17'));
    });

    it('includes timezone in URL when provided', async () => {
        const request = new Request('https://example.com/home?date=2025-03-17&tz=Asia/Tokyo');
        await loader({ request, params: {}, context: {} });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('timezone=Asia/Tokyo'));
    });

    it('returns error response when API call fails', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Server error',
        });

        const request = new Request('https://example.com/home');
        const response = await loader({ request, params: {}, context: {} });

        // Access the data directly since the loader returns a data object, not a Response
        expect(response).toHaveProperty('success', false);
        expect(response).toHaveProperty('message', 'Server error');
    });

    it('returns empty games array when no dates in response', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ dates: [] }),
        });

        const request = new Request('https://example.com/home');
        const response = await loader({ request, params: {}, context: {} });

        // Access the data directly
        expect(response).toHaveProperty('games');
        expect(response.games).toEqual([]);
    });
});
