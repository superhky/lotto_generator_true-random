
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // base를 '/'로 설정하여 Cloudflare Pages의 표준 경로를 따릅니다.
  base: '/',
})
