import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"zh/best-practices.md","filePath":"zh/best-practices.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/best-practices.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h1><h2 id="_1-主流程用原生-await" tabindex="-1">1. 主流程用原生 await <a class="header-anchor" href="#_1-主流程用原生-await" aria-label="Permalink to &quot;1. 主流程用原生 await&quot;">​</a></h2><p><code>mangoo</code> 负责护栏，不负责改写业务结构。</p><h2 id="_2-只在并发段使用-runparallel" tabindex="-1">2. 只在并发段使用 runParallel <a class="header-anchor" href="#_2-只在并发段使用-runparallel" aria-label="Permalink to &quot;2. 只在并发段使用 runParallel&quot;">​</a></h2><p>串行依赖链保持原生写法，可读性最好。</p><h2 id="_3-始终透传-signal" tabindex="-1">3. 始终透传 signal <a class="header-anchor" href="#_3-始终透传-signal" aria-label="Permalink to &quot;3. 始终透传 signal&quot;">​</a></h2><p>取消是否生效，关键在你的请求层是否支持 <code>signal</code>。</p><h2 id="_4-meta-只放-过程信息" tabindex="-1">4. meta 只放“过程信息” <a class="header-anchor" href="#_4-meta-只放-过程信息" aria-label="Permalink to &quot;4. meta 只放“过程信息”&quot;">​</a></h2><p>建议把 <code>meta</code> 用于：步骤、进度、调试字段；不要放大对象。</p><h2 id="_5-ui-层统一处理三种结果" tabindex="-1">5. UI 层统一处理三种结果 <a class="header-anchor" href="#_5-ui-层统一处理三种结果" aria-label="Permalink to &quot;5. UI 层统一处理三种结果&quot;">​</a></h2><ul><li><code>success</code>: 正常渲染</li><li><code>error</code>: 展示错误并上报</li><li><code>aborted</code>: 静默结束或轻提示</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/best-practices.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const bestPractices = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  bestPractices as default
};
