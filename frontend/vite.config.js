import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // <-- Aquí defines el alias
    },
  },
  server: {
    proxy: {
      '/actividades': 'http://localhost:8080',
      '/evaluacion': 'http://localhost:8080',
      '/incidencia': 'http://localhost:8080',
      '/inscripciones': 'http://localhost:8080',
      '/perfiles': 'http://localhost:8080',
      '/proyectos': 'http://localhost:8080',
      '/usuarios': 'http://localhost:8080',
      '/tutorias': 'http://localhost:8080'
    },
  },
})
