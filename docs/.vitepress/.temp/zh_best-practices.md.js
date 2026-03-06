import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"最佳实践","description":"","frontmatter":{},"headers":[],"relativePath":"zh/best-practices.md","filePath":"zh/best-practices.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/best-practices.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h1><ol><li>业务主流程保持原生 <code>await</code> 串行。</li><li>仅在并发段使用 <code>runParallel</code>。</li><li>请求层独立封装，不把请求协议耦合到 mangoo。</li><li>组件卸载时确保任务取消（Hook 会自动处理）。</li><li>关键异常建议显式抛出，不做静默吞错。</li></ol></div>`);
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
