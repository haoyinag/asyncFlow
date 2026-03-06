import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"简介","description":"","frontmatter":{},"headers":[],"relativePath":"zh/introduction.md","filePath":"zh/introduction.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/introduction.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h1><p><code>mangoo</code> 是一个“轻量异步护栏层”。</p><p>它不替代 <code>async/await</code>，而是给你补齐以下能力：</p><ul><li>任务状态管理（<code>idle/running/success/error/aborted</code>）</li><li>取消语义（<code>AbortSignal</code>）</li><li>并发控制（限流、失败策略）</li><li>React / Vue 一致的 Hook 心智</li></ul><h2 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h2><ul><li>表单提交流程：保存、校验、写审计日志</li><li>页面初始化：多个接口并发加载</li><li>可取消操作：切路由、切条件时中断旧请求</li><li>需要统一错误对象和状态上报的业务</li></ul><h2 id="不适用场景" tabindex="-1">不适用场景 <a class="header-anchor" href="#不适用场景" aria-label="Permalink to &quot;不适用场景&quot;">​</a></h2><ul><li>你只需要一次性 <code>await fetch()</code>，没有状态/取消/并发诉求</li><li>你已经有完整状态机系统，且团队不希望引入另一层抽象</li></ul></div>`);
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
