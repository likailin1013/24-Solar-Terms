import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  build: {
    // 覆盖 preset 默认的 dist/client，产物直接输出到 dist/
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
