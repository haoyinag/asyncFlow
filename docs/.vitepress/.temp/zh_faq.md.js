import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"zh/faq.md","filePath":"zh/faq.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/faq.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><h2 id="为什么-cancel-后任务还可能成功" tabindex="-1">为什么 <code>cancel()</code> 后任务还可能成功？ <a class="header-anchor" href="#为什么-cancel-后任务还可能成功" aria-label="Permalink to &quot;为什么 \`cancel()\` 后任务还可能成功？&quot;">​</a></h2><p>因为取消是协作式的。若底层异步逻辑没有使用 <code>signal</code>，任务仍可能完成。</p><h2 id="runtask-失败会抛异常吗" tabindex="-1"><code>runTask</code> 失败会抛异常吗？ <a class="header-anchor" href="#runtask-失败会抛异常吗" aria-label="Permalink to &quot;\`runTask\` 失败会抛异常吗？&quot;">​</a></h2><p>任务执行错误不会通过 <code>throw</code> 冒泡；请通过 <code>await task.result</code> 的 <code>status</code> 判断。</p><h2 id="runparallel-在-collect-all-下怎么拿到全部错误" tabindex="-1"><code>runParallel</code> 在 <code>collect-all</code> 下怎么拿到全部错误？ <a class="header-anchor" href="#runparallel-在-collect-all-下怎么拿到全部错误" aria-label="Permalink to &quot;\`runParallel\` 在 \`collect-all\` 下怎么拿到全部错误？&quot;">​</a></h2><p>捕获 <code>AggregateError</code>，读取 <code>error.errors</code>。</p><h2 id="react-vue-一定要用吗" tabindex="-1">React / Vue 一定要用吗？ <a class="header-anchor" href="#react-vue-一定要用吗" aria-label="Permalink to &quot;React / Vue 一定要用吗？&quot;">​</a></h2><p>不需要。核心 API（<code>runTask/runParallel/createRunner</code>）是框架无关的。</p><h2 id="为什么建议从-mangoo-react-或-mangoo-vue-导入-hook" tabindex="-1">为什么建议从 <code>mangoo/react</code> 或 <code>mangoo/vue</code> 导入 Hook？ <a class="header-anchor" href="#为什么建议从-mangoo-react-或-mangoo-vue-导入-hook" aria-label="Permalink to &quot;为什么建议从 \`mangoo/react\` 或 \`mangoo/vue\` 导入 Hook？&quot;">​</a></h2><p>这是包导出约定，能避免入口歧义，也更清晰。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/faq.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  faq as default
};
