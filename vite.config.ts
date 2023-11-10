import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@ui': path.resolve(__dirname, './src/shared/ui'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.join(__dirname, '@/shared/styles/_vars.scss')],
      },
    },
  },
  plugins: [react()],
});
