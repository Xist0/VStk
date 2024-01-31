import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  server: {
    watch:{
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 80,
    proxy: {
    },
    https: {
      key: './CRMServe-private.key',
      cert: './CRMServe.crt',
    }
  },
  plugins: [react()],
})
