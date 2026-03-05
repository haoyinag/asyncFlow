# mangoo v0.1.0

发布日期：2026-03-06

## 发布信息
- npm 包名：`mangoo`
- 安装：`npm i mangoo`
- 版本：`0.1.0`

## 核心能力
- `runTask`：统一异步任务状态与错误包装
- `runParallel`：并发执行与并发数限制
- `createRunner`：可复用的任务运行器
- `useReactAsyncTask`：React 侧任务 Hook
- `useVueAsyncTask`：Vue 侧任务 Hook

## 工程化改动
- 标准化 npm 发布配置（`exports`、`files`、`prepack`）
- 增加构建清理脚本，避免旧产物污染发布包
- 增加 `LICENSE`（MIT）
- 文档统一为 `mangoo` 包名
