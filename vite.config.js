import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is set to the GitHub Pages repo path so asset URLs resolve correctly
// at https://<user>.github.io/React-App/. For local dev it doesn't apply.
export default defineConfig({
  plugins: [react()],
  base: '/React-App/',
  server: { port: 3000, open: true }
})
