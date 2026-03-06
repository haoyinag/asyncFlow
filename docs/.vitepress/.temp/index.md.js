import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"mangoo","text":"Native-first async task guardrails","tagline":"Keep async/await. Add safe state, cancellation and concurrency.","actions":[{"theme":"brand","text":"Get Started","link":"/getting-started"},{"theme":"alt","text":"API Reference","link":"/api-reference"},{"theme":"alt","text":"中文文档","link":"/zh/"}]},"features":[{"title":"Native async/await first","details":"Keep task orchestration in plain async functions. No custom task DSL."},{"title":"One task, full state","details":"Every run has status, loading, data, error, meta and timestamps."},{"title":"Practical concurrency control","details":"Use runParallel only where needed, with fail-fast or collect-all modes."}]},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
