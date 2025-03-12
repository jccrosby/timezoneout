import { vercelPreset } from '@vercel/react-router/vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [vercelPreset(), tailwindcss(), reactRouter(), tsconfigPaths()],
});
