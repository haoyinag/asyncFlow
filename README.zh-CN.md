# AsyncFlow

AsyncFlow v0.1 是一个“原生优先”的异步护栏库。

## 当前状态
- 版本：`v0.1`
- 状态：暂时锁定

## v0.1 主 API
- `runTask`
- `runParallel`
- `createRunner`
- `useReactAsyncTask`
- `useVueAsyncTask`

## 设计原则
1. 业务主线保持原生 `async/await`
2. 统一状态/取消/并发/错误护栏
3. 核心层框架无关
4. 核心层请求库无关

## 官方文档
- 英文： [official/README.md](./official/README.md)
- 中文： [official/README.zh-CN.md](./official/README.zh-CN.md)

## 示例
- [examples/README.zh-CN.md](./examples/README.zh-CN.md)

## 常用命令
```bash
npm install
npm test
npm run build
```
