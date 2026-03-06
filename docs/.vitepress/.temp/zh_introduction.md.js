import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"简介","description":"","frontmatter":{},"headers":[],"relativePath":"zh/introduction.md","filePath":"zh/introduction.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/introduction.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h1><h2 id="mangoo-解决什么问题" tabindex="-1">mangoo 解决什么问题 <a class="header-anchor" href="#mangoo-解决什么问题" aria-label="Permalink to &quot;mangoo 解决什么问题&quot;">​</a></h2><p>日常业务里，原生 <code>async/await</code> 很清晰，但通常会重复写这些逻辑：</p><ol><li><code>loading/error/data</code> 状态维护</li><li>组件卸载取消请求</li><li>并发任务限流</li><li>异步错误格式不统一</li></ol><p>mangoo 的定位是：保留原生写法，只抽离这些重复护栏。</p><h2 id="不做什么" tabindex="-1">不做什么 <a class="header-anchor" href="#不做什么" aria-label="Permalink to &quot;不做什么&quot;">​</a></h2><ol><li>不绑定 axios/fetch</li><li>不要求后端返回固定结构</li><li>不强制 DSL 编排</li></ol></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/introduction.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const introduction = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  introduction as default
};
