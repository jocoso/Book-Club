import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000, // Port fallback
    proxy: {
      '/graphql': {
        target: process.env.VITE_API_URL || 'http://localhost:3001', // Use process.env here
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
