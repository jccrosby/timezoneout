// test/setup.js
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

// Mock Remix components/hooks
vi.mock('@remix-run/react', async () => {
    const actual = await vi.importActual('@remix-run/react');
    return {
        ...actual,
        useLoaderData: vi.fn(),
        useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    };
});
