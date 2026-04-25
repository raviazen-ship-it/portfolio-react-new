import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages site: https://raviazen-ship-it.github.io/portfolio-react-new/
  // Use an absolute base so the site works even if the URL is opened without the trailing slash.
  base: '/portfolio-react-new/',
})
