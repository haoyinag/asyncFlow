import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Signal 决策图（文本版）","description":"","frontmatter":{},"headers":[],"relativePath":"zh/signal-guide.md","filePath":"zh/signal-guide.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/signal-guide.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="signal-决策图-文本版" tabindex="-1">Signal 决策图（文本版） <a class="header-anchor" href="#signal-决策图-文本版" aria-label="Permalink to &quot;Signal 决策图（文本版）&quot;">​</a></h1><h2 id="结论先说" tabindex="-1">结论先说 <a class="header-anchor" href="#结论先说" aria-label="Permalink to &quot;结论先说&quot;">​</a></h2><p><code>signal</code> 是可选接入，不是必须接入。</p><h2 id="决策流程" tabindex="-1">决策流程 <a class="header-anchor" href="#决策流程" aria-label="Permalink to &quot;决策流程&quot;">​</a></h2><ol><li>你的请求层支持 <code>signal</code> 吗？</li></ol><ul><li>是：在请求调用里传 <code>signal</code>，可真正中断网络请求</li><li>否：先不传，任务状态仍可取消，但请求可能继续执行</li></ul><ol start="2"><li>当前页面有竞态风险吗（重复点击、切页中断）？</li></ol><ul><li>是：优先改造关键接口支持 <code>signal</code></li><li>否：可先保持现状，后续再逐步接入</li></ul><ol start="3"><li>哪些接口优先接入 <code>signal</code>？</li></ol><ul><li>登录</li><li>首页聚合请求</li><li>大列表分页</li><li>上传/下载</li></ul><h2 id="实战建议" tabindex="-1">实战建议 <a class="header-anchor" href="#实战建议" aria-label="Permalink to &quot;实战建议&quot;">​</a></h2><ul><li>不要一上来全量改造</li><li>先改“慢接口 + 高价值页面”</li><li>验证收益后再扩展</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/signal-guide.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signalGuide = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  signalGuide as default
};
