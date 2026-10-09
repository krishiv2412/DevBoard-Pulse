import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const buildTime = Date.now()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-v${buildTime}.js`,
        chunkFileNames: `assets/[name]-[hash]-v${buildTime}.js`,
        assetFileNames: `assets/[name]-[hash]-v${buildTime}.[ext]`,
      },
    },
  },
})
