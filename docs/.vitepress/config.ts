import { defineConfig } from 'vitepress';

function normalizeBase(input?: string): string {
  if (!input || input.trim() === '') return '/';
  const withLeading = input.startsWith('/') ? input : `/${input}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

const base = normalizeBase(process.env.DOCS_BASE);

export default defineConfig({
  title: 'mangoo',
  description: 'Native-first async task guardrails',
  base,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'mangoo',
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'API', link: '/api-reference' },
      { text: 'React', link: '/react' },
      { text: 'Vue', link: '/vue' },
      { text: '中文', link: '/zh/' },
      { text: 'GitHub', link: 'https://github.com/haoyinag/mangoo' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/haoyinag/mangoo' }],
    search: { provider: 'local' },
    footer: {
      message: 'Released under MIT License.',
      copyright: 'Copyright © 2026 mangoo contributors'
    },
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/getting-started' },
            { text: 'Core Concepts', link: '/core-concepts' }
          ]
        },
        {
          text: 'Core APIs',
          items: [
            { text: 'runTask', link: '/run-task' },
            { text: 'runParallel', link: '/run-parallel' },
            { text: 'Error Handling', link: '/error-handling' }
          ]
        },
        {
          text: 'Framework Adapters',
          items: [
            { text: 'React: useTask', link: '/react' },
            { text: 'Vue: useTask', link: '/vue' }
          ]
        },
        {
          text: 'Reference',
          items: [{ text: 'API Reference', link: '/api-reference' }]
        }
      ],
      '/zh/': [
        {
          text: '开始使用',
          items: [
            { text: '简介', link: '/zh/introduction' },
            { text: '10 分钟上手', link: '/zh/get-started' },
            { text: '核心概念', link: '/zh/essentials' }
          ]
        },
        {
          text: '核心 API',
          items: [
            { text: 'runTask', link: '/zh/run-task' },
            { text: 'runParallel', link: '/zh/run-parallel' },
            { text: '取消与 Signal', link: '/zh/signal-guide' },
            { text: '并发模式对照', link: '/zh/parallel-mode-table' }
          ]
        },
        {
          text: '框架适配',
          items: [
            { text: 'React 用法', link: '/zh/react' },
            { text: 'Vue 用法', link: '/zh/vue' }
          ]
        },
        {
          text: '参考与实践',
          items: [
            { text: 'API 参考', link: '/zh/api-reference' },
            { text: '最佳实践', link: '/zh/best-practices' },
            { text: '常见问题', link: '/zh/faq' },
            { text: '版本说明', link: '/zh/version' }
          ]
        }
      ]
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/'
    }
  }
});
