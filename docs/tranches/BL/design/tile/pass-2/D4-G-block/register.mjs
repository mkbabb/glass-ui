#!/usr/bin/env node
// D4-G block test · question 2, REGISTRATION (REGISTRY §6.2). Does the body stay on its tile?
//   node register.mjs --arms glide=<build>,land=<build> [--engines chromium,webkit] --json <file>
// Builds: build.mjs with route-glide / route-land (the body arms; the edge arm has no body to register).
// Every cell mutates the page once (or scrolls it frame by frame) and then reads, on each of the following animation
// frames, the body's border box against the selected item's border box in client coordinates. Drift is the largest
// of |Δx|, |Δy|, |Δw|, |Δh|. A cell PASSES when every sampled frame reads ≤ 0.5 px.
// THE READ IS POST-PAINT: an animation-frame callback queues a task (MessageChannel), and the task reads, so each
// sample is the geometry that frame's rendering (style, layout, the ResizeObserver step and the writes it caused)
// produced and painted. A read inside the animation-frame callback itself forces the layout of changes the frame
// has not processed yet, so it reports a drift the screen never shows. Runs 1 and 2 (logs/register-run{1,2}.log)
// read there and are superseded: every FAIL in the six they print is a single frame of that early read (run 1 on
// resize and reflow; run 2 on the K2 font swap and the Playwright WebKit content-visibility reveal).
// The page counts every ResizeObserver it constructs and what each observes (an init script wraps the
// constructor), so "the one ResizeObserver" is read, not assumed.
// Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox).
import fs from "node:fs";
import path from "node:path";
import { browser, closeBrowsers, parseArgs, serve, acquireLock, browserCensus, load, ENGINE_LABEL } from "../../harness/lib.mjs";

const a = parseArgs();
if (!a.arms || !a.json) { console.error("usage: node register.mjs --arms glide=<build>,land=<build> --json <file> [--engines …]"); process.exit(2); }
const ARMS = a.arms.split(",").map((kv) => { const [name, dir] = kv.split("="); return { name, dir: path.resolve(dir) }; });
const ENGINES = (typeof a.engines === "string" ? a.engines : "chromium,webkit").split(",");
const FONT = "/System/Library/Fonts/Supplemental/Courier New Bold.ttf";
const TOL = 0.5;

const INIT = () => {
  const RO = window.ResizeObserver;
  window.__ro = { made: 0, targets: [] };
  window.ResizeObserver = class extends RO {
    constructor(cb) { super(cb); window.__ro.made++; }
    observe(el, o) {
      window.__ro.targets.push(el.dataset?.slot || el.className?.toString?.().slice(0, 40) || el.tagName);
      return super.observe(el, o);
    }
  };
  const frame = () => new Promise((r) => requestAnimationFrame(() => { const c = new MessageChannel(); c.port1.onmessage = () => r(); c.port2.postMessage(0); }));
  const box = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
  const on = () => [...document.querySelectorAll("[data-item]")].find((e) => e.dataset.state === "on");
  const port = () => { let e = document.querySelector("[data-group]"); while (e && e !== document.body) { const s = getComputedStyle(e); if (/(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 1) return e; e = e.parentElement; } return null; };
  function drift() {
    const b = document.querySelector("[data-selection-body]"), t = on();
    if (!b || !t) return { none: true };
    const B = box(b), T = box(t);
    const d = { dx: B.x - T.x, dy: B.y - T.y, dw: B.w - T.w, dh: B.h - T.h };
    return { ...Object.fromEntries(Object.entries(d).map(([k, v]) => [k, +v.toFixed(2)])), max: +Math.max(...Object.values(d).map(Math.abs)).toFixed(2),
      tile: Object.values(T).map((v) => +v.toFixed(2)), opacity: getComputedStyle(b).opacity };
  }
  // run a mutation, then sample `n` frames (or step a per-frame action for `n` frames)
  async function sample(n, mutate, perFrame) {
    const out = [];
    if (mutate) await mutate();
    for (let i = 0; i < n; i++) {
      if (perFrame) perFrame(i);
      await frame();
      out.push(drift());
    }
    return out;
  }
  window.__reg = { frame, box, on, port, drift, sample };
  // ?cvspacer=1: a 1600 px gap after the first catalogue section, from before the first render, so the Back section's
  // tiles lie past every engine's content-visibility proximity margin at mount and are never rendered before reveal
  if (new URLSearchParams(location.search).get("cvspacer")) {
    const st = document.createElement("style");
    st.textContent = ".catalogue-section:first-of-type { margin-bottom: 1600px; }"; // first-of-type: the body span is the group's first child
    const put = () => { if (document.head) { document.head.append(st); return true; } return false; };
    if (!put()) new MutationObserver((_, o) => { if (put()) o.disconnect(); }).observe(document, { childList: true, subtree: true });
  }
  window.__supports = { anchor: CSS.supports("anchor-name: --a") && CSS.supports("position-anchor: --a"), anchorSize: CSS.supports("width: anchor-size(width)"), sizeAdjust: CSS.supports("font-size-adjust: 1") };
};

const servers = {};
for (const arm of ARMS) servers[arm.name] = await serve(path.join(arm.dir, "dist"));
const lock = await acquireLock("D4-G register");
const run = { started: new Date().toISOString(), loadStart: load(), census: browserCensus().n, lockWaitS: lock.waitedS, cells: [] };
console.log(`register · lock waited ${lock.waitedS}s · other browsers ${run.census} · load ${run.loadStart}`);

async function open(engine, arm, scene, sel, extra = "") {
  const b = await browser(engine);
  const ctx = await b.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.addInitScript(`(${INIT.toString()})()`);
  await page.route("**/__swap.ttf", async (route) => {
    await new Promise((r) => setTimeout(r, 700));
    await route.fulfill({ status: 200, contentType: "font/ttf", body: fs.readFileSync(FONT) });
  });
  await page.goto(`${servers[arm.name].url}/index.html?scene=${scene}&sel=${sel}${extra}`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await page.mouse.move(1, 1);
  await page.waitForTimeout(700);
  return { ctx, page, errors };
}

const judge = (frames) => {
  const f = frames.filter((x) => !x.none);
  const worst = f.reduce((m, x) => Math.max(m, x.max), 0);
  const bad = f.map((x, i) => (x.max > TOL ? i : -1)).filter((i) => i >= 0);
  return { verdict: f.length && worst <= TOL ? "PASS" : "FAIL", frames: f.length, worstPx: +worst.toFixed(2), framesOver: bad.length, firstOver: bad[0] ?? null, first: f[0] ?? null };
};

// ── the cells ─────────────────────────────────────────────────────────────────
// Each returns { frames, note } from the page. K1 = preset-migrated, K2 = specimen-migrated.
const CELLS = [
  { id: "mount", sites: ["preset", "specimen"], sel: 1, n: 6, fn: () => window.__reg.sample(6) },
  { id: "scroll-port", sites: ["specimen"], sel: 5, n: 40, fn: async () => {
    const p = window.__reg.port(); const top0 = p.scrollTop;
    const frames = await window.__reg.sample(40, null, (i) => { p.scrollTop = top0 + (i < 20 ? 9 * (i + 1) : 9 * (40 - i)); });
    return { frames, note: `port ${p.className.slice(0, 40)} scrollHeight ${p.scrollHeight} clientHeight ${p.clientHeight}; scrolled 0 → ${9 * 20} → ${9} px, one step per frame` };
  } },
  { id: "content-visibility", sites: ["specimen"], sel: 7, n: 12, fn: async () => {
    const t = window.__reg.on(), p = window.__reg.port();
    const cv = getComputedStyle(t).contentVisibility;
    const before = window.__reg.box(t), pr = p.getBoundingClientRect();
    const offscreen = before.y > pr.bottom;
    const skipped = typeof t.checkVisibility === "function" ? !t.checkVisibility({ contentVisibilityAuto: true }) : null;
    const atMount = window.__reg.drift();
    const frames = await window.__reg.sample(12, () => { p.scrollTop = p.scrollHeight; });
    const after = window.__reg.box(t);
    return { frames: [atMount, ...frames], note: `content-visibility ${cv}; selected tile offscreen at mount ${offscreen}, skipped ${skipped} (tile y ${before.y.toFixed(1)} vs port bottom ${pr.bottom.toFixed(1)}); tile h ${before.h.toFixed(2)} skipped → ${after.h.toFixed(2)} rendered; frame 0 is the read at mount (skipped)` };
  } },
  { id: "content-visibility-far", sites: ["specimen"], sel: 7, n: 12, query: "&cvspacer=1", fn: async () => {
    const t = window.__reg.on(), p = window.__reg.port();
    const before = window.__reg.box(t), pr = p.getBoundingClientRect();
    const skipped = typeof t.checkVisibility === "function" ? !t.checkVisibility({ contentVisibilityAuto: true }) : null;
    const atMount = window.__reg.drift();
    const frames = await window.__reg.sample(12, () => { t.scrollIntoView({ block: "nearest" }); });
    const after = window.__reg.box(t);
    return { frames: [atMount, ...frames], note: `a 1600 px spacer ahead of the Back section; skipped at mount ${skipped}; selected tile ${(before.y - pr.bottom).toFixed(0)} px below the port at mount; tile h ${before.h.toFixed(2)} skipped → ${after.h.toFixed(2)} rendered (scrollIntoView); frame 0 is the read at mount` };
  } },
  // The frame ledger for the content-visibility reveal: a persistent animation-frame counter; a probe-only
  // ResizeObserver on the selected TILE logs the frame its new size is delivered in; a MutationObserver on the BODY's
  // style logs the frame the writer moved it in. Same frame = the body was written before that frame painted
  // (ResizeObserver callbacks and the microtasks they queue run inside the rendering step, before paint).
  { id: "content-visibility-ledger", sites: ["specimen"], sel: 7, n: 14, query: "&cvspacer=1", fn: async () => {
    const t = window.__reg.on(), b = document.querySelector("[data-selection-body]");
    let fno = 0; let live = true; const tick = () => { fno++; if (live) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    const log = [];
    const ro = new ResizeObserver((es) => { for (const e of es) log.push({ f: fno, what: "tile RO delivered", h: +e.borderBoxSize[0].blockSize.toFixed(2) }); });
    ro.observe(t);
    await window.__reg.frame(); log.length = 0;
    const mo = new MutationObserver(() => log.push({ f: fno, what: "body written", h: +b.getBoundingClientRect().height.toFixed(2) }));
    mo.observe(b, { attributes: true, attributeFilter: ["style"] });
    const skipped = typeof t.checkVisibility === "function" ? !t.checkVisibility({ contentVisibilityAuto: true }) : null;
    const f0 = fno;
    const frames = await window.__reg.sample(14, () => { t.scrollIntoView({ block: "nearest" }); log.push({ f: fno, what: "scrollIntoView" }); }, () => log.push({ f: fno, what: "post-paint read", h: +window.__reg.box(t).h.toFixed(2), body: +window.__reg.box(b).height?.toFixed?.(2) || +b.getBoundingClientRect().height.toFixed(2) }));
    live = false; ro.disconnect(); mo.disconnect();
    return { frames, note: `skipped at mount ${skipped}; ledger (frame numbers relative to the reveal) ${log.map((e) => `${e.f - f0}:${e.what}${e.h !== undefined ? " h " + e.h : ""}${e.body !== undefined ? " body " + e.body : ""}`).join("; ")}` };
  } },
  { id: "resize", sites: ["preset", "specimen"], sel: 1, n: 12, fn: async () => {
    const host = document.querySelector("[data-scene]"); const w0 = host.getBoundingClientRect().width;
    const frames = await window.__reg.sample(12, () => { host.style.width = "380px"; });
    return { frames, note: `host ${w0} → 380 px; columns ${getComputedStyle(document.querySelector(".specimen-grid") ?? document.querySelector("[data-group]")).gridTemplateColumns.split(" ").length}` };
  } },
  { id: "auto-fill-reflow", sites: ["specimen"], sel: 3, n: 24, fn: async () => {
    const host = document.querySelector("[data-scene]"), grid = () => getComputedStyle(document.querySelector(".specimen-grid")).gridTemplateColumns.split(" ").length;
    const c0 = grid();
    const a1 = await window.__reg.sample(12, () => { host.style.width = "720px"; }); const c1 = grid();
    const a2 = await window.__reg.sample(12, () => { host.style.width = "300px"; }); const c2 = grid();
    return { frames: [...a1, ...a2], note: `columns ${c0} → ${c1} (host 720 px) → ${c2} (host 300 px)` };
  } },
  { id: "keyed-reorder", sites: ["preset"], sel: 1, n: 12, fn: async () => {
    const before = window.__reg.box(window.__reg.on());
    const frames = await window.__reg.sample(12, () => window.__tile.reorder());
    const after = window.__reg.box(window.__reg.on());
    return { frames, note: `the selected tile moved (${before.x.toFixed(1)}, ${before.y.toFixed(1)}) → (${after.x.toFixed(1)}, ${after.y.toFixed(1)}) with its size unchanged` };
  } },
  { id: "font-swap", sites: ["preset", "specimen"], sel: 3, n: 110, fn: async () => {
    const t = window.__reg.on(); const sizes = [];
    const st = document.createElement("style");
    st.textContent = `@font-face { font-family: "SwapTest"; src: url("/__swap.ttf") format("truetype"); font-display: swap; size-adjust: 260%; }
      [data-group] :is(span, h3) { font-family: "SwapTest", ui-serif, Georgia, serif !important; }`;
    const frames = await window.__reg.sample(110, () => { document.head.append(st); }, () => { sizes.push(window.__reg.box(t)); });
    const loaded = [...document.fonts].some((f) => f.family.replace(/"/g, "") === "SwapTest" && f.status === "loaded");
    const changes = sizes.map((s, i) => (i && (Math.abs(s.w - sizes[i - 1].w) + Math.abs(s.h - sizes[i - 1].h) + Math.abs(s.y - sizes[i - 1].y) > 0.1 ? i : -1))).filter((i) => i > 0);
    const allTiles = [...document.querySelectorAll("[data-item]")].map((e) => e.getBoundingClientRect().height.toFixed(2));
    return { frames, note: `SwapTest (Courier New Bold at size-adjust 260%, served after 700 ms, font-display: swap) loaded ${loaded}; the selected tile's box changed at frames [${changes.join(", ")}]; item heights now ${[...new Set(allTiles)].join(" / ")}` };
  } },
  // OUTSIDE THE SIX (stress): the items move while the container keeps its size. Reported, not the verdict.
  { id: "stress-dir-flip", sites: ["preset", "specimen"], sel: 1, n: 12, stress: true, fn: async () => {
    const g = document.querySelector("[data-group]"); const r0 = g.getBoundingClientRect();
    const frames = await window.__reg.sample(12, () => { g.dir = "rtl"; });
    const r1 = g.getBoundingClientRect();
    return { frames, note: `group dir ltr → rtl; container ${r0.width.toFixed(2)}×${r0.height.toFixed(2)} → ${r1.width.toFixed(2)}×${r1.height.toFixed(2)}` };
  } },
];

const ONLY = typeof a.only === "string" ? a.only.split(",") : null;
for (const engine of ENGINES) for (const arm of ARMS) for (const cell of CELLS.filter((c) => !ONLY || ONLY.includes(c.id))) for (const site of cell.sites) {
  const scene = `${site}-migrated`;
  const P = await open(engine, arm, scene, cell.sel, cell.query ?? "");
  const l0 = load();
  let res;
  try { res = await P.page.evaluate(cell.fn); } catch (e) { res = { frames: [], note: `HARNESS ERROR ${String(e).slice(0, 200)}` }; }
  if (Array.isArray(res)) res = { frames: res, note: "" };
  const ro = await P.page.evaluate(() => window.__ro);
  if (!run.supports?.[engine]) (run.supports ??= {})[engine] = await P.page.evaluate(() => window.__supports);
  const j = judge(res.frames);
  const row = { engine: ENGINE_LABEL[engine], arm: arm.name, site: site === "preset" ? "K1" : "K2", cell: cell.id, stress: !!cell.stress, ...j, note: res.note,
    resizeObservers: { made: ro.made, groupObservers: ro.targets.filter((t) => t === "toggle-group").length, targets: ro.targets }, pageErrors: P.errors, load: l0,
    series: res.frames.map((f) => (f.none ? null : f.max)) };
  run.cells.push(row);
  console.log(`${row.engine.padEnd(17)} ${arm.name.padEnd(5)} ${row.site} ${cell.id.padEnd(18)} ${j.verdict} worst ${j.worstPx} px over ${j.frames} frames (${j.framesOver} > ${TOL}${j.firstOver !== null ? `, first at frame ${j.firstOver}` : ""}) · RO ${ro.made} (on the group ${row.resizeObservers.groupObservers}) · ${res.note} · load ${l0}${P.errors.length ? " · ERRORS " + P.errors.join(" | ") : ""}`);
  await P.ctx.close();
}
run.loadEnd = load();
run.ended = new Date().toISOString();
fs.writeFileSync(a.json, JSON.stringify(run, null, 1));
const six = run.cells.filter((c) => !c.stress);
console.log(`the six: ${six.filter((c) => c.verdict === "PASS").length}/${six.length} PASS · stress: ${run.cells.filter((c) => c.stress && c.verdict === "PASS").length}/${run.cells.filter((c) => c.stress).length} · load ${run.loadStart} → ${run.loadEnd}`);
await closeBrowsers();
for (const s of Object.values(servers)) await s.close();
lock.release();
