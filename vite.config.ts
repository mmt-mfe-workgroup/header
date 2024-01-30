import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'header-component',
      filename: 'remoteEntry.js',
      // Modules to expose
      exposes: {
        './App': './src/RemoteApp',
      },
      remotes: {
        UI: 'https://useless-distribution.surge.sh/assets/remoteEntry.js',
      },
    }),
  ],
  build: {
    target: 'esnext',
  },
})
