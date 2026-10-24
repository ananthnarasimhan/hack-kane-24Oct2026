import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = process.env.GITHUB_ACTIONS === 'true'
  ? '/hack-kane-24Oct2026/'
  : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
