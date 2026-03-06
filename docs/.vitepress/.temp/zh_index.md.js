import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"mangoo","text":"原生优先的异步护栏","tagline":"继续写 async/await，同时获得状态、取消与并发控制。","actions":[{"theme":"brand","text":"10 分钟上手","link":"/zh/get-started"},{"theme":"alt","text":"API 参考","link":"/zh/api-reference"},{"theme":"alt","text":"English","link":"/"}]},"features":[{"title":"不改写业务主线","details":"业务逻辑仍然是普通 async 函数，不引入额外 DSL。"},{"title":"一次执行，一套状态","details":"status/loading/data/error/meta 和时间戳统一可观测。"},{"title":"并发策略可控","details":"并发段用 runParallel，支持 fail-fast 与 collect-all。"}]},"headers":[],"relativePath":"zh/index.md","filePath":"zh/index.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
