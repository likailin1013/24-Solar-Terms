import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 独立部署：移除 @lark-apaas/coding-preset-vite-react 与飞书平台构建注入
// （Slardar 监控 / feishucdn 性能脚本 / 字节日志 SDK / {{appId}} 等服务端占位符 /
//  Google Fonts → miaoda.feishu.cn 字体镜像等），改用原生 Vite 配置，
//  产物为纯静态文件，可部署到任意静态托管 / CDN。
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  plugins: [react(), tailwindcss()],
  build: {
    // 产物直接输出到 dist/（不再使用 dist/client）
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    host: 'localhost',
    port: Number(process.env.CLIENT_DEV_PORT) || 8080,
    strictPort: true,
  },
})
