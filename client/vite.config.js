import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/analyze-symptoms': 'http://localhost:5000',
      '/hospitals': 'http://localhost:5000',
      '/chat': 'http://localhost:5000'
    }
  }
})
