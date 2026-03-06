import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"核心概念","description":"","frontmatter":{},"headers":[],"relativePath":"zh/essentials.md","filePath":"zh/essentials.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/essentials.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念&quot;">​</a></h1><h2 id="task-任务" tabindex="-1">Task（任务） <a class="header-anchor" href="#task-任务" aria-label="Permalink to &quot;Task（任务）&quot;">​</a></h2><p>一次 <code>runTask</code> 执行就是一个任务实例，具备：</p><ul><li><code>id</code></li><li><code>result</code></li><li><code>cancel(reason?)</code></li><li><code>onState</code> / <code>getState</code></li></ul><h2 id="state-状态" tabindex="-1">State（状态） <a class="header-anchor" href="#state-状态" aria-label="Permalink to &quot;State（状态）&quot;">​</a></h2><p>每个任务都有统一状态结构：</p><ul><li><code>status</code>: <code>idle | running | success | error | aborted</code></li><li><code>loading</code></li><li><code>data</code></li><li><code>error</code></li><li><code>meta</code></li><li><code>startedAt</code> / <code>endedAt</code></li></ul><h2 id="cancellation-取消" tabindex="-1">Cancellation（取消） <a class="header-anchor" href="#cancellation-取消" aria-label="Permalink to &quot;Cancellation（取消）&quot;">​</a></h2><p>取消本质是中断 <code>AbortSignal</code>。</p><p>要点：</p><ul><li>取消是“协作式”的</li><li>你的请求层要把 <code>signal</code> 传下去</li><li>底层不响应 <code>signal</code> 时，任务可能仍成功返回</li></ul><h2 id="runner-预配置执行器" tabindex="-1">Runner（预配置执行器） <a class="header-anchor" href="#runner-预配置执行器" aria-label="Permalink to &quot;Runner（预配置执行器）&quot;">​</a></h2><p><code>createRunner({ concurrency, mode })</code> 会返回一组 API：</p><ul><li><code>runner.runTask</code></li><li><code>runner.runParallel</code></li></ul><p>默认配置只影响 <code>runParallel</code>。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/essentials.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const essentials = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  essentials as default
};
