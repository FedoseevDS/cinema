import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cinema',
  plugins: [react()],
  server: {
    port: 5004,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
