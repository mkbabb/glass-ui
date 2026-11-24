// BM pass 4 (copied from pass 3, page list extended with P4-bud; R3b rebuilt and P2-scroll edited by the pass-3 fold): runs each page's script once against a stub DOM, with no browser, to catch errors in the
// start-up path and in one press of each control. It proves nothing about layout or paint.
// Run: guarded --light -- node docs/tranches/BM/study/pass-4/check/stub-run.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGES = path.resolve(HERE, "../../pages");
const mkEl = (id) => {
  const listeners = {}, attrs = {}, cls = new Set(), props = {};
  const el = {
    id, dataset: {}, textContent: "", innerHTML: "", hidden: false, clientWidth: 300,
    style: { setProperty: (k, v) => { props[k] = v; }, removeProperty() {} },
    classList: { add: (...c) => c.forEach((x) => cls.add(x)), remove: (...c) => c.forEach((x) => cls.delete(x)), toggle: (c, on) => { (on ?? !cls.has(c)) ? cls.add(c) : cls.delete(c); }, contains: (c) => cls.has(c) },
    setAttribute: (k, v) => { attrs[k] = String(v); }, getAttribute: (k) => attrs[k] ?? null, removeAttribute: (k) => { delete attrs[k]; },
    toggleAttribute: (k, on) => { if (on) attrs[k] = ""; else delete attrs[k]; },
    addEventListener: (t, f) => { (listeners[t] ||= []).push(f); }, fire: (t, e = {}) => (listeners[t] || []).forEach((f) => f({ currentTarget: el, target: el, stopPropagation() {}, ...e })),
    appendChild() {}, contains: () => false, closest: () => el, getBoundingClientRect: () => ({ left: 0, top: 0, width: 300, height: 300 }),
    getAnimations: () => [], animate: () => ({ cancel() {}, commitStyles() {}, startTime: 0, currentTime: 0, finished: Promise.resolve() }), parentElement: null,
    getContext: () => new Proxy({}, { get: (t, k) => (k in t ? t[k] : () => {}), set: (t, k, v) => { t[k] = v; return true; } }),
    setPointerCapture() {}, width: 300, height: 300, querySelectorAll: () => [],
  };
  el.parentElement = el;
  return el;
};
const els = {};
const getEl = (id) => (els[id] ||= mkEl(id));
for (const f of ["R1", "R2", "R4", "R5", "R6", "R7", "P2-scroll", "R3", "R3b", "P4-bud"]) {
  const html = readFileSync(path.join(PAGES, f + ".html"), "utf8");
  const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  for (const k of Object.keys(els)) delete els[k];
  const buttons = [...html.matchAll(/<button([^>]*)>/g)].map((m, i) => {
    const id = (m[1].match(/id="([^"]+)"/) || [])[1] || `btn${i}`, el = getEl(id);
    for (const [, k, v] of m[1].matchAll(/data-([a-z]+)="([^"]*)"/g)) el.dataset[k] = v;
    return el;
  });
  const winListeners = {};
  const ctx = {
    navigator: { userAgent: "Mozilla/5.0 (iPhone) AppleWebKit Version/27.2 Mobile Safari" },
    document: {
      getElementById: getEl, querySelector: () => getEl("q"),
      querySelectorAll: (sel) => /data-for/.test(sel) ? buttons.filter((b) => b.dataset.for) : /\.seat/.test(sel) ? buttons.filter((b) => b.dataset.k) : /\[data-mode\]|\.seg/.test(sel) ? buttons.filter((b) => b.dataset.mode) : buttons,
      documentElement: Object.assign(getEl("root"), { scrollHeight: 3000 }), createElement: () => mkEl("new"),
      addEventListener() {}, timeline: { currentTime: 0 },
    },
    window: {}, CSS: { supports: () => true }, getComputedStyle: () => ({ clipPath: "shape(from 0px 0px)" }),
    matchMedia: () => ({ matches: false, addEventListener() {} }), performance: { now: () => 0 },
    requestAnimationFrame: () => 1, cancelAnimationFrame() {}, setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {},
    addEventListener: (t, f) => { (winListeners[t] ||= []).push(f); }, scrollY: 0, innerHeight: 800, Math, String, Number, Array, Object, JSON, URL,
  };
  ctx.window = ctx;
  let status = "ok";
  try {
    vm.runInNewContext(js, ctx);
    for (const b of buttons) b.fire("click");
    for (const b of buttons) b.fire("click");
    ctx.scrollY = 400; (winListeners.scroll || []).forEach((h) => h());
  } catch (e) { status = "ERROR " + e.message; }
  console.log(f.padEnd(10), status);
}
