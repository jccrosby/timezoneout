// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        //environment: 'happy-dom',
        environment: 'jsdom', // Make sure this is jsdom
        setupFiles: ['./vitest.setup.js'],
        include: ['**/*.test.{ts,tsx}'],
        globals: true,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './app'),
        },
    },
});
