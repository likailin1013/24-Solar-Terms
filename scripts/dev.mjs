#!/usr/bin/env node
// 启动 Vite 开发服务器（跨平台，替代缺失的 bash 脚本）
// 用法: npm run dev
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const viteBin = resolve(root, 'node_modules', 'vite', 'bin', 'vite.js');

const child = spawn(process.execPath, [viteBin], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    CLIENT_BASE_PATH: process.env.CLIENT_BASE_PATH || '/',
    // 独立部署：禁用 Google Fonts → miaoda.feishu.cn 改写，避免飞书私有域请求。
    MIAODA_FONTS_MIRROR_OFF: process.env.MIAODA_FONTS_MIRROR_OFF || '1',
  },
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('error', (err) => {
  console.error(`[dev] 启动 Vite 失败: ${err.message}`);
  console.error('[dev] 请确认已执行 npm install（node_modules/vite 存在）');
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
