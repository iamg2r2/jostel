import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches the GitHub Pages repo name.
// Change '/jostel-faculty-companion/' to '/<your-repo-name>/' before deploying,
// or to '/' if you deploy to a custom domain / user root site.
export default defineConfig({
  plugins: [react()],
  base: '/jostel-faculty-companion/',
})
