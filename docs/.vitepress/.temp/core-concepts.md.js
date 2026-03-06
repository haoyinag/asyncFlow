import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Core Concepts","description":"","frontmatter":{},"headers":[],"relativePath":"core-concepts.md","filePath":"core-concepts.md","lastUpdated":null}');
const _sfc_main = { name: "core-concepts.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="core-concepts" tabindex="-1">Core Concepts <a class="header-anchor" href="#core-concepts" aria-label="Permalink to &quot;Core Concepts&quot;">​</a></h1><h2 id="_1-task" tabindex="-1">1) Task <a class="header-anchor" href="#_1-task" aria-label="Permalink to &quot;1) Task&quot;">​</a></h2><p>A task is one async workflow executed through <code>runTask</code>.</p><p>A task has:</p><ul><li><code>id</code></li><li><code>result</code> promise</li><li><code>cancel(reason?)</code></li><li>state subscription (<code>onState</code>, <code>getState</code>)</li></ul><h2 id="_2-state" tabindex="-1">2) State <a class="header-anchor" href="#_2-state" aria-label="Permalink to &quot;2) State&quot;">​</a></h2><p>Each task run exposes one state snapshot model:</p><ul><li><code>status</code>: <code>idle | running | success | error | aborted</code></li><li><code>loading</code>: boolean</li><li><code>data</code>: success payload</li><li><code>error</code>: <code>AsyncTaskError | null</code></li><li><code>meta</code>: user-defined mutable meta object</li><li><code>startedAt</code> / <code>endedAt</code></li></ul><h2 id="_3-cancellation-model" tabindex="-1">3) Cancellation model <a class="header-anchor" href="#_3-cancellation-model" aria-label="Permalink to &quot;3) Cancellation model&quot;">​</a></h2><p><code>mangoo</code> cancels by aborting an internal <code>AbortController</code>.</p><p>Important:</p><ul><li>cancellation is cooperative</li><li>your async code (or HTTP client) must honor <code>signal</code></li><li>if underlying work ignores <code>signal</code>, it may still complete</li></ul><h2 id="_4-parallel-model" tabindex="-1">4) Parallel model <a class="header-anchor" href="#_4-parallel-model" aria-label="Permalink to &quot;4) Parallel model&quot;">​</a></h2><p><code>runParallel</code> executes task array with a concurrency limit.</p><p>Modes:</p><ul><li><code>fail-fast</code>: reject immediately on first failure and abort siblings</li><li><code>collect-all</code>: wait all, then reject with <code>AggregateError</code> if any failed</li></ul><h2 id="_5-runner" tabindex="-1">5) Runner <a class="header-anchor" href="#_5-runner" aria-label="Permalink to &quot;5) Runner&quot;">​</a></h2><p><code>createRunner({ concurrency, mode })</code> gives a preconfigured pair:</p><ul><li><code>runner.runTask(...)</code></li><li><code>runner.runParallel(...)</code></li></ul><p>Defaults are only for <code>runParallel</code>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("core-concepts.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const coreConcepts = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  coreConcepts as default
};
