import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"并发模式对照","description":"","frontmatter":{},"headers":[],"relativePath":"zh/parallel-mode-table.md","filePath":"zh/parallel-mode-table.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/parallel-mode-table.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="并发模式对照" tabindex="-1">并发模式对照 <a class="header-anchor" href="#并发模式对照" aria-label="Permalink to &quot;并发模式对照&quot;">​</a></h1><table tabindex="0"><thead><tr><th>维度</th><th><code>fail-fast</code></th><th><code>collect-all</code></th></tr></thead><tbody><tr><td>默认值</td><td>是</td><td>否</td></tr><tr><td>首个任务失败后</td><td>立刻结束并 reject</td><td>继续等待其余任务</td></tr><tr><td>失败返回形式</td><td><code>AsyncTaskError</code></td><td><code>AggregateError</code></td></tr><tr><td>适合场景</td><td>任一失败就不必继续（如关键链路）</td><td>需要汇总全部子任务结果/错误</td></tr></tbody></table><h2 id="选择建议" tabindex="-1">选择建议 <a class="header-anchor" href="#选择建议" aria-label="Permalink to &quot;选择建议&quot;">​</a></h2><ul><li>页面初始化依赖完整性高：优先 <code>fail-fast</code></li><li>批处理、报表类任务：优先 <code>collect-all</code></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/parallel-mode-table.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const parallelModeTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  parallelModeTable as default
};
