import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ESLint } from 'eslint'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
})
