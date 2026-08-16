# 岁时记 · 二十四节气古风经营游戏

古风悠闲经营单页应用：以隐士身份随二十四节气轮转经营庭院，参与节气活动，收集物候风物，邂逅山中访客。纯前端实现，数据全部内置 mock，玩家进度持久化到 localStorage。

## 技术栈

| 类别 | 选型 |
|---|---|
| 框架 | React 19 + TypeScript 5.9 |
| 构建 | Vite 8（`@lark-apaas/coding-preset-vite-react`） |
| 样式 | Tailwind CSS v4 + 自定义主题变量 |
| 路由 | react-router-dom 7（BrowserRouter） |
| 动画 | framer-motion + CSS keyframes |
| UI 组件 | shadcn/ui（`src/components/ui/`，Radix 封装） |
| 图标 / 反馈 | lucide-react / sonner |
| 平台基建 | `@lark-apaas/client-toolkit-lite` |

## 常用命令

```bash
npm install        # 安装依赖（同时注册 git 钩子：core.hooksPath=.githooks）
npm run dev        # 启动 Vite 开发服务器（node scripts/dev.mjs）
npm run build      # 类型检查 + 生产构建（node scripts/build.mjs，产物输出到 dist/）
npm run typecheck  # 仅类型检查（tsc -p tsconfig.app.json）
npm run lint       # 类型检查 + ESLint
npm run precommit  # 提交门禁（= npm run lint）
```

## 目录结构

```
├── index.html                 # Vite 挂载点（<div id="root">）
├── vite.config.ts             # 别名：@ → src、@shared → shared
├── components.json            # shadcn/ui 配置
├── scripts/                   # 构建/开发脚本（dev.mjs / build.mjs / setup-git-hooks.mjs）
├── .githooks/pre-commit       # git 钩子（npm install 时注册 core.hooksPath=.githooks）
├── public/                    # favicon / icons
└── src/
    ├── index.tsx              # 入口：createRoot → BrowserRouter → AppContainer → ErrorBoundary（勿修改）
    ├── app.tsx                # 路由配置：index → HomePage，* → NotFoundPage
    ├── index.css              # 样式入口（引入 tailwind + 主题 + 字体）
    ├── tailwind-theme.css     # CSS 变量主题（背景/前景/主色/边框等 token）
    ├── typography.css         # 宋体/书法排版
    ├── pages/
    │   ├── HomePage/          # 游戏主页面（编排中枢）
    │   └── NotFoundPage/      # 404 兜底
    ├── components/            # 业务组件（14 个，见下）
    │   └── ui/                # shadcn/ui 基础组件（勿修改）
    ├── hooks/
    │   ├── useGameProgress.ts # 游戏进度状态中枢（localStorage 持久化）
    │   └── use-mobile.ts
    ├── data/                  # 内置 mock 数据（solarTerms / visitors / flowers / decorations / handcrafts）
    └── lib/                   # 工具（season-images / utils）
```

## 业务组件（src/components/）

| 分组 | 组件 | 职责 |
|---|---|---|
| 常驻场景 | `StatusBar` | 顶部状态栏：节气 / 天气 / 岁时值进度 |
| 常驻场景 | `ParticleLayer` | 四季飘落粒子（花·萤·叶·雪） |
| 常驻场景 | `TermTimeline` | 24 节气时间轴，点击切换 |
| 常驻场景 | `SealButtons` | 右侧印章按钮组（面板入口） |
| 卷轴容器 | `ScrollPanel` | 卷轴式抽屉/弹窗容器 |
| 面板 | `TermDetailPanel` | 节气详情：活动 / 食膳 / 物候 |
| 面板 | `HandbookPanel` | 风物志图鉴（物候 / 食膳 / 器物 / 花卉） |
| 面板 | `VisitorsPanel` | 山中访客（已遇 / 未遇） |
| 面板 | `GardenPanel` | 庭院布置 |
| 面板 | `HandcraftPanel` | 手作工坊 |
| 面板 | `SettingsPanel` | 设置 / 重置进度 |
| 交互特效 | `SolarWheel` | 24 节气轮盘 |
| 交互特效 | `ActivityGame` | 互动小游戏（点击收集 / 顺序点击） |
| 交互特效 | `SealStamp` | 盖章动画 |

## 数据与持久化

- **游戏内容**：全部为内置 mock 常量，无后端 ——
  - 24 节气（含三候 / 活动 / 食膳 / 作物）与四季色板：`src/data/solarTerms.ts`
  - 访客：`src/data/visitors.ts`；花卉：`src/data/flowers.ts`
  - 装饰物：`src/data/decorations.ts`；手作器物：`src/data/handcrafts.ts`
- **玩家进度**：`src/hooks/useGameProgress.ts` 为唯一状态源（12 字段 × 12 操作），经 `scopedStorage` 持久化到 localStorage，key = `__game_suishiji_progress_v2`
- **图片资源**：季节庭院 / 角色图 URL 配置于 `src/lib/season-images.ts`

## 路由配置

- `BrowserRouter` 已在 `src/index.tsx` 配置，`app.tsx` 中禁止再包裹 Router
- 新增页面：在 `src/app.tsx` 的 `<Routes>` 内注册 `<Route>`，页面文件放 `src/pages/<PageName>/`

## 主题变量

主题色定义在 `src/tailwind-theme.css`，通过 `:root` CSS 变量 + `@theme inline` 注册到 Tailwind。

| 用途 | Tailwind 类 | CSS 变量 |
|---|---|---|
| 页面背景 | `bg-background` | `--background` |
| 主文本 | `text-foreground` | `--foreground` |
| 卡片背景 | `bg-card` | `--card` |
| 次要文本 | `text-muted-foreground` | `--muted-foreground` |
| 主色 | `bg-primary` / `text-primary` | `--primary` |
| 强调色 | `bg-accent` | `--accent` |
| 边框 | `border-border` | `--border` |
| 危险色 | `text-destructive` | `--destructive` |
| 图表色 | `bg-chart-1` ~ `bg-chart-5` | `--chart-1` ~ `--chart-5` |

HSL 格式使用空格分隔：`--primary: hsl(5 75% 45%);`

## 禁止修改的文件

| 文件 | 原因 |
|---|---|
| `src/index.tsx` | Provider 层级 + 样式引入，由模板管理 |
| `src/components/ui/*` | shadcn/ui 内置组件，版本锁定 |

## 导入路径

```typescript
// @/ 别名 → src/
import { cn } from "@/lib/utils";
import { useGameProgress } from "@/hooks/useGameProgress";

// @shared/ 别名 → shared/（当前为占位目录）
import configData from "@shared/static/config.json";
```
