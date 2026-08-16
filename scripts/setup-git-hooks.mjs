#!/usr/bin/env node
// npm install（prepare）时注册 git 钩子目录：core.hooksPath = .githooks
// 钩子内容见 .githooks/pre-commit（precommit 门禁由 package.json 的 precommit 脚本决定）
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hooksDir = resolve(root, '.githooks');

if (!existsSync(hooksDir)) {
  console.warn('[setup-git-hooks] 未找到 .githooks 目录，跳过');
  process.exit(0);
}

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: root, stdio: 'inherit' });
  console.log('[setup-git-hooks] 已注册 git 钩子: core.hooksPath=.githooks');
} catch (err) {
  console.warn('[setup-git-hooks] 注册失败（非 git 仓库或 git 不可用）: ' + err.message);
}
