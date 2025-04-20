import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    cors: true,
    proxy: {
      // 代理所有API请求
      '/dashboard': {
        target: 'http://8.141.124.102:8000',
        changeOrigin: true
      },
      '/stores': {
        target: 'http://8.141.124.102:8000',
        changeOrigin: true
      },
      '/upload': {
        target: 'http://8.141.124.102:8000',
        changeOrigin: true
      }
    }
  }
})
