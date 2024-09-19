import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cinema',
  plugins: [react()],
  server: {
    port: 5004,
  },
  resolve: {
    extensions: ['.scss', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      layouts: resolve(__dirname, './src/layouts'),
      pages: resolve(__dirname, './src/pages'),
      store: resolve(__dirname, './src/store'),
    },
  },
});
