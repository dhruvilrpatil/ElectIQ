import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      // Custom plugin to replace %VITE_*% patterns in index.html
      name: 'html-env-replace',
      transformIndexHtml(html) {
        return html.replace(/%VITE_(\w+)%/g, (_, key) => {
          return process.env[`VITE_${key}`] || '';
        });
      },
    },
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
