import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, cpSync } from 'fs'
import { resolve } from 'path'

function copyStaticFiles() {
  return {
    name: 'copy-static-files',
    closeBundle() {
      copyFileSync(resolve('public/sitemap.xml'), resolve('dist/sitemap.xml'))
      copyFileSync(resolve('public/robots.txt'), resolve('dist/robots.txt'))
      copyFileSync(resolve('public/404.html'), resolve('dist/404.html'))
      copyFileSync(resolve('public/favicon.ico'), resolve('dist/favicon.ico'))
      cpSync(resolve('public/favicon'), resolve('dist/favicon'), { recursive: true, force: true })
      cpSync(resolve('public/assets'), resolve('dist/assets'), { recursive: true, force: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyStaticFiles()],
  build: {
    outDir: 'dist',
  },
})
