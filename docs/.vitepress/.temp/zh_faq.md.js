import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"zh/faq.md","filePath":"zh/faq.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/faq.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><h2 id="q1-会替代-async-await-吗" tabindex="-1">Q1：会替代 async/await 吗？ <a class="header-anchor" href="#q1-会替代-async-await-吗" aria-label="Permalink to &quot;Q1：会替代 async/await 吗？&quot;">​</a></h2><p>不会。mangoo 只做护栏层。</p><h2 id="q2-必须用-axios-吗" tabindex="-1">Q2：必须用 axios 吗？ <a class="header-anchor" href="#q2-必须用-axios-吗" aria-label="Permalink to &quot;Q2：必须用 axios 吗？&quot;">​</a></h2><p>不需要，和请求库无耦合。</p><h2 id="q3-适合所有项目吗" tabindex="-1">Q3：适合所有项目吗？ <a class="header-anchor" href="#q3-适合所有项目吗" aria-label="Permalink to &quot;Q3：适合所有项目吗？&quot;">​</a></h2><p>不一定。若异步流程很简单，可继续纯原生。</p><h2 id="q4-为什么不主推-dsl" tabindex="-1">Q4：为什么不主推 DSL？ <a class="header-anchor" href="#q4-为什么不主推-dsl" aria-label="Permalink to &quot;Q4：为什么不主推 DSL？&quot;">​</a></h2><p>因为大多数业务场景下原生写法更易读。</p></div>`);
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
