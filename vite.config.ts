import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const resolvePath = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolvePath('./src/app'),
      '@features': resolvePath('./src/features'),
      '@shared': resolvePath('./src/shared'),
      '@services': resolvePath('./src/services'),
      '@nexus-types': resolvePath('./src/types'),
      '@constants': resolvePath('./src/constants'),
    },
  },
})
