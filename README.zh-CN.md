# mangoo

`mangoo` 是一个“原生优先”的异步护栏库。

## 当前状态
- 基线版本：`v0.1`（已锁定）
- 当前研发轨道：`v0.2-draft`（已落 P0+P1）

## 当前主 API
- `runTask`
- `runParallel`
- `createRunner`
- `useTask`（`mangoo/react`）
- `useTask`（`mangoo/vue`）

## 设计原则
1. 业务主线保持原生 `async/await`
2. 统一状态/取消/并发/错误护栏
3. 核心层框架无关
4. 核心层请求库无关

## 官方文档
- 英文： [official/README.md](./official/README.md)
- 中文： [official/README.zh-CN.md](./official/README.zh-CN.md)

## 使用指南
- [official/USAGE_REACT.zh-CN.md](./official/USAGE_REACT.zh-CN.md)
- [official/USAGE_VUE.zh-CN.md](./official/USAGE_VUE.zh-CN.md)

## 常用命令
```bash
npm install mangoo
npm test
npm run build
```
