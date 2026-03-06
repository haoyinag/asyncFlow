import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"版本说明","description":"","frontmatter":{},"headers":[],"relativePath":"zh/version.md","filePath":"zh/version.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/version.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="版本说明" tabindex="-1">版本说明 <a class="header-anchor" href="#版本说明" aria-label="Permalink to &quot;版本说明&quot;">​</a></h1><p>当前文档基于 <code>v0.2.x</code> API：</p><ul><li><code>runTask</code></li><li><code>runParallel</code></li><li><code>createRunner</code></li><li><code>useTask</code>（React / Vue）</li></ul><p>如果你从更早草案升级，建议重点检查：</p><ul><li>Hook 参数命名是否为 <code>params</code></li><li>是否从 <code>mangoo/react</code>、<code>mangoo/vue</code> 子路径导入</li><li><code>runParallel</code> 失败模式是否符合预期</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/version.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const version = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  version as default
};
