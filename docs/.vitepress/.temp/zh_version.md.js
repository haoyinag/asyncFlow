import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"版本","description":"","frontmatter":{},"headers":[],"relativePath":"zh/version.md","filePath":"zh/version.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/version.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="版本" tabindex="-1">版本 <a class="header-anchor" href="#版本" aria-label="Permalink to &quot;版本&quot;">​</a></h1><ul><li>锁定基线：<code>v0.1</code></li><li>当前研发轨道：<code>v0.2-draft</code>（P0 + P1 已实现）</li><li>日期：2026-03-06</li></ul><p>v0.2 是否推进，取决于真实项目使用数据。</p></div>`);
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
