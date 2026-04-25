import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use relative paths so the build works on GitHub Pages even if the repo name changes.
  base: './',
})
