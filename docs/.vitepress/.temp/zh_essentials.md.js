import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"核心概念","description":"","frontmatter":{},"headers":[],"relativePath":"zh/essentials.md","filePath":"zh/essentials.md","lastUpdated":1772775967000}');
const _sfc_main = { name: "zh/essentials.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念&quot;">​</a></h1><h2 id="runtask" tabindex="-1">runTask <a class="header-anchor" href="#runtask" aria-label="Permalink to &quot;runTask&quot;">​</a></h2><p><code>runTask</code> 执行一个异步任务，返回任务句柄：</p><ol><li><code>result</code></li><li><code>cancel</code></li><li><code>onState</code></li><li><code>getState</code></li></ol><p><code>taskFn</code> 使用 <code>params</code> 获取本次执行输入。</p><h2 id="runparallel" tabindex="-1">runParallel <a class="header-anchor" href="#runparallel" aria-label="Permalink to &quot;runParallel&quot;">​</a></h2><p><code>runParallel</code> 负责并发段：</p><ol><li>并发上限 <code>concurrency</code></li><li>失败策略 <code>mode: fail-fast | collect-all</code></li></ol><h2 id="createrunner" tabindex="-1">createRunner <a class="header-anchor" href="#createrunner" aria-label="Permalink to &quot;createRunner&quot;">​</a></h2><p>在应用初始化时集中定义默认策略：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> runner</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}"> =</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> createRunner</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">({ concurrency: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">4</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, mode: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;fail-fast&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> });</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/essentials.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const essentials = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  essentials as default
};
