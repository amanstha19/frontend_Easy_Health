import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to /admin to the Django server
      '/admin': 'http://localhost:8000',
      // If you have other APIs, you can add them here as well
      '/api': 'http://localhost:8000',
    },
  },
})
