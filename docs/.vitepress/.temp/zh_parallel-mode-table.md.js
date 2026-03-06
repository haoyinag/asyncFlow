import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"并发模式对照表","description":"","frontmatter":{},"headers":[],"relativePath":"zh/parallel-mode-table.md","filePath":"zh/parallel-mode-table.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/parallel-mode-table.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="并发模式对照表" tabindex="-1">并发模式对照表 <a class="header-anchor" href="#并发模式对照表" aria-label="Permalink to &quot;并发模式对照表&quot;">​</a></h1><table tabindex="0"><thead><tr><th>模式</th><th>含义</th><th>适用场景</th><th>失败行为</th></tr></thead><tbody><tr><td><code>fail-fast</code></td><td>任一失败即中止整体</td><td>首页聚合、关键流程</td><td>第一处错误直接抛出，其他任务中止</td></tr><tr><td><code>collect-all</code></td><td>全部跑完后统一判断</td><td>批处理、统计类任务</td><td>全部结束后，如有失败抛 <code>AggregateError</code></td></tr></tbody></table><h2 id="推荐默认" tabindex="-1">推荐默认 <a class="header-anchor" href="#推荐默认" aria-label="Permalink to &quot;推荐默认&quot;">​</a></h2><ul><li>默认用 <code>fail-fast</code></li><li>只有明确需要“尽量跑完再统一处理”时才用 <code>collect-all</code></li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">await</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> runParallel</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(tasks, </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">undefined</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  concurrency: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">3</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  mode: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;fail-fast&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">});</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/parallel-mode-table.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const parallelModeTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  parallelModeTable as default
};
