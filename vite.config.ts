import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Fix for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'client'), // Entry point for the frontend
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client', 'src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve(__dirname, 'dist'), // Output directory for production build
    rollupOptions: {
      input: resolve(__dirname, 'client', 'index.html'),
    },
  },
});
