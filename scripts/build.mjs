#!/usr/bin/env node
// 类型检查 + 生产构建（跨平台，替代缺失的 bash scripts/build.sh）
// 用法: npm run build
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const useShell = process.platform === 'win32';

function run(cmd, args, label) {
  console.log(`\n> ${label}`);
  const result = spawnSync(cmd, args, { cwd: root, stdio: 'inherit', shell: useShell });
  if (result.error) {
    console.error(`[build] 无法执行 "${cmd}": ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`[build] "${cmd} ${args.join(' ')}" 失败 (exit ${result.status})`);
    process.exit(result.status ?? 1);
  }
}

run('npx', ['tsc', '-p', 'tsconfig.app.json'], '① 类型检查 (tsc -p tsconfig.app.json)');
run('npx', ['vite', 'build'], '② 生产构建 (vite build)');
console.log('\n构建完成 ✅ 产物输出到 dist/');
