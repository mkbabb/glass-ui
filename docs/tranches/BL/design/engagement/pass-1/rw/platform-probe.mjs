// D5 pass 1 · R-W · platform probe. Feature support + four behaviour reads, headless
// Chromium and Playwright WebKit. Usage: node platform-probe.mjs [--out <dir>]
// Playwright WebKit is not Safari: real Safari is UNMEASURED (owner's safaridriver checkbox).
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { loadavg } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outIx = process.argv.indexOf("--out");
const out = outIx > 0 ? process.argv[outIx + 1] : join(here, "logs");
mkdirSync(out, { recursive: true });
const load = () => loadavg().map((x) => x.toFixed(2)).join("/");

// The house spring rows, from src/composables/motion/spring/springPresets.ts:65-97.
const PRESETS = { press: [0.2, 0.8], dock: [0.3, 0.88], panel: [0.4, 0.71] };

const PAGE = String.raw`<!doctype html><meta charset=utf-8>
<style>
@property --e { syntax: "<number>"; inherits: false; initial-value: 0; }
body { margin: 0; font: 14px system-ui; }
#reg, #unreg { width: 40px; height: 40px; background: #888; }
#mover { position: absolute; left: 0; top: 200px; width: 40px; height: 40px; background: #567; }
#anchor { position: absolute; left: 300px; top: 400px; width: 80px; height: 30px; anchor-name: --a; }
#pop { position-anchor: --a; position-area: bottom; margin: 0; inset: auto; width: 60px; height: 20px;
  opacity: 1; transition: opacity 300ms linear, display 300ms allow-discrete, overlay 300ms allow-discrete; }
@starting-style { #pop:popover-open { opacity: 0; } }
#pop::backdrop { backdrop-filter: blur(6px); }
</style>
<div id=reg></div><div id=unreg></div><div id=mover></div>
<button id=anchor>anchor</button><div id=pop popover=manual>pop</div>`;

let STAGE_ENGINE = "";
async function evalIn(page, fn, arg, label = "stage") {
  const t0 = Date.now(); console.error(`[${STAGE_ENGINE}] ${label} start load ${load()}`);
  const r = await Promise.race([page.evaluate(fn, arg), new Promise((_, rej) => setTimeout(() => rej(new Error(`${label} timed out 180s`)), 180000))]);
  console.error(`[${STAGE_ENGINE}] ${label} done ${Date.now() - t0}ms load ${load()}`); return r;
}

function springLinear([response, zeta], v0 = 0, dist = 1, n = 60, dur) {
  // Analytic damped spring from x=0 to 1 with initial velocity v0 (units: dist/s),
  // sampled into a linear() string. ω_n = 2π/response (SwiftUI's response).
  const w = (2 * Math.PI) / response;
  const v = v0 / dist; // normalized
  const x = (t) => {
    if (zeta < 1) {
      const wd = w * Math.sqrt(1 - zeta * zeta);
      // x(t) = 1 + e^{-ζωt}(A cos ω_d t + B sin ω_d t); x(0) = 0 → A = -1; x'(0) = v → B = (v - ζω)/ω_d
      return 1 + Math.exp(-zeta * w * t) * (-Math.cos(wd * t) + ((v - zeta * w) / wd) * Math.sin(wd * t));
    }
    // critical
    return 1 + Math.exp(-w * t) * (-1 + (v - w) * t);
  };
  let T = dur;
  if (!T) { T = 0; while (T < 5) { T += 0.005; if (Math.abs(1 - x(T)) < 1e-3 && Math.abs(1 - x(T + 0.05)) < 1e-3) break; } }
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(+x((T * i) / n).toFixed(4));
  pts[n] = 1;
  return { easing: `linear(${pts.join(", ")})`, durMs: Math.round(T * 1000) };
}

async function runEngine(name, type) {
  STAGE_ENGINE = name; console.error(`[${name}] launch load ${load()}`);
  const browser = await type.launch();
  console.error(`[${name}] launched`);
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  await page.setContent(PAGE);
  await page.evaluate(`window.__spring = ${springLinear.toString()};`);
  const rec = { engine: name, version: browser.version(), loadStart: load() };
  try {

  // 1 · support
  rec.support = await evalIn(page, () => {
    const s = (p) => CSS.supports(p);
    const btn = document.createElement("button"); const dlg = document.createElement("dialog");
    const div = document.createElement("div"); div.popover = "hint";
    const inp = document.createElement("input"); inp.type = "checkbox";
    return {
      "linear() easing": s("transition-timing-function: linear(0, 1.1 60%, 1)"),
      "@property (CSS.registerProperty)": typeof CSS.registerProperty === "function",
      "transition-behavior: allow-discrete": s("transition-behavior: allow-discrete"),
      "@starting-style": typeof CSSStartingStyleRule !== "undefined",
      "popover attribute": typeof HTMLElement.prototype.showPopover === "function",
      'popover="hint"': div.popover === "hint",
      "anchor-name": s("anchor-name: --a"),
      "position-area": s("position-area: bottom"),
      "position-try-fallbacks: flip-block": s("position-try-fallbacks: flip-block"),
      "anchor() function": s("top: anchor(--a bottom)"),
      "anchor-scope": s("anchor-scope: all"),
      "position-visibility": s("position-visibility: anchors-visible"),
      "command / commandfor": "command" in btn && "commandForElement" in btn,
      "interestfor (interest invokers)": "interestForElement" in btn,
      "dialog closedby": "closedBy" in dlg,
      ":open selector": s("selector(:open)"),
      "document.startViewTransition": typeof document.startViewTransition === "function",
      "element.startViewTransition (scoped)": typeof Element.prototype.startViewTransition === "function",
      "view-transition-class": s("view-transition-class: a"),
      "animation-timeline: scroll()": s("animation-timeline: scroll()"),
      "animation-timeline: view()": s("animation-timeline: view()"),
      "scrollend event": "onscrollend" in window,
      "scrollsnapchange event": "onscrollsnapchange" in window,
      "container-type: scroll-state": s("container-type: scroll-state"),
      "interpolate-size": s("interpolate-size: allow-keywords"),
      "calc-size()": s("width: calc-size(auto, size)"),
      "if()": s("width: if(media(width > 1px): 1px; else: 2px)"),
      "sibling-index()": s("width: calc(sibling-index() * 1px)"),
      "corner-shape": s("corner-shape: squircle"),
      "animation-composition": s("animation-composition: add"),
      "WAAPI composite add": (() => { try { const a = div.animate([{ opacity: 0 }], { composite: "add" }); const ok = a.effect.composite === "add"; a.cancel(); return ok; } catch { return false; } })(),
      "Animation.commitStyles": typeof Animation.prototype.commitStyles === "function",
      "getCoalescedEvents": typeof PointerEvent.prototype.getCoalescedEvents === "function",
      "getPredictedEvents": typeof PointerEvent.prototype.getPredictedEvents === "function",
      "navigator.vibrate": typeof navigator.vibrate === "function",
      "input switch attribute": "switch" in inp,
      "touch-action: pan-y": s("touch-action: pan-y"),
      "overscroll-behavior": s("overscroll-behavior: contain"),
      "field-sizing": s("field-sizing: content"),
      "contrast-color()": s("color: contrast-color(red)"),
      "@scope": typeof CSSScopeRule !== "undefined",
      "timeline-trigger / animation-trigger": s("timeline-trigger: --t view()") || s("animation-trigger: --t play-forwards"),
    };
  }, undefined, "support");

  // 2 · a registered <number> carries a linear() spring's overshoot; an unregistered one flips
  const panel = springLinear(PRESETS.panel);
  rec.registered = await evalIn(page, async ({ easing, durMs }) => {
    const sample = async (el) => {
      el.style.transition = `--e ${durMs}ms ${easing}`;
      el.getBoundingClientRect();
      el.style.setProperty("--e", "1");
      const vals = []; const t0 = performance.now();
      while (performance.now() - t0 < durMs + 100) {
        await new Promise(requestAnimationFrame);
        vals.push(parseFloat(getComputedStyle(el).getPropertyValue("--e")));
      }
      const fin = vals.filter(Number.isFinite);
      return { frames: vals.length, distinct: new Set(fin.map((v) => v.toFixed(3))).size, max: Math.max(...fin), first: fin[0], last: fin.at(-1) };
    };
    const unreg = document.getElementById("unreg"); unreg.style.setProperty("--u", "0");
    const unregSample = async () => {
      unreg.style.transition = `--u ${durMs}ms ${easing}`; unreg.getBoundingClientRect(); unreg.style.setProperty("--u", "1");
      const vals = []; const t0 = performance.now();
      while (performance.now() - t0 < durMs + 100) { await new Promise(requestAnimationFrame); vals.push(getComputedStyle(unreg).getPropertyValue("--u").trim()); }
      return { frames: vals.length, distinct: new Set(vals).size, first: vals[0] };
    };
    return { durMs, registered: await sample(document.getElementById("reg")), unregistered: await unregSample() };
  }, panel, "registered");

  // 3 · interruption: a CSS transition retargeted mid-flight vs a WAAPI spring seeded with the
  //     measured velocity. Reads the velocity just before and just after the retarget.
  const dock = springLinear(PRESETS.dock);
  rec.retarget = await evalIn(page, async ({ dock, PRESETS }) => {
    const el = document.getElementById("mover");
    const xOf = () => new DOMMatrix(getComputedStyle(el).transform).m41;
    const frame = () => new Promise(requestAnimationFrame);
    const run = async (mode) => {
      el.getAnimations().forEach((a) => a.cancel());
      el.style.transition = "none"; el.style.transform = "translateX(0px)"; el.getBoundingClientRect();
      el.style.transition = `transform ${dock.durMs}ms ${dock.easing}`;
      el.style.transform = "translateX(300px)";
      const tr = []; const t0 = performance.now(); let retargeted = false; let tR = 0;
      while (performance.now() - t0 < 1000) {
        await frame();
        const t = performance.now() - t0; const x = xOf(); tr.push([t, x]);
        if (!retargeted && t >= 90 && tr.length >= 3) {
          retargeted = true; tR = t;
          const n = tr.length; const v = ((tr[n - 1][1] - tr[n - 2][1]) / (tr[n - 1][0] - tr[n - 2][0])) * 1000; // px/s
          if (mode === "css") {
            el.style.transform = "translateX(0px)"; // CSS retarget: starts from the current value, its own curve
          } else if (mode === "cssSeeded") {
            // CSS retarget with a per-release linear() carrying v0: one style write of the timing function
            const ease = window.__spring(PRESETS.dock, v, 0 - x);
            el.style.transition = `transform ${ease.durMs}ms ${ease.easing}`;
            el.style.transform = "translateX(0px)";
          } else {
            // WAAPI: freeze where we are, then a spring from x toward 0 seeded with v
            const from = x; const dist = 0 - from; // negative
            const ease = window.__spring(PRESETS.dock, v, dist);
            el.style.transition = "none"; el.style.transform = `translateX(${from}px)`;
            el.animate([{ transform: `translateX(${from}px)` }, { transform: "translateX(0px)" }], { duration: ease.durMs, easing: ease.easing, fill: "forwards" });
          }
        }
      }
      // velocities around the retarget
      const i = tr.findIndex(([t]) => t >= tR);
      const vel = (a, b) => ((tr[b][1] - tr[a][1]) / (tr[b][0] - tr[a][0])) * 1000;
      return { tR: +tR.toFixed(1), xAtR: +tr[i][1].toFixed(2), vBefore: +vel(i - 2, i - 1).toFixed(0), vAfter1: +vel(i, i + 1).toFixed(0), vAfter2: +vel(i + 1, i + 2).toFixed(0), frames: tr.length };
    };
    return { css: await run("css"), cssSeeded: await run("cssSeeded"), waapiSeeded: await run("waapi") };
  }, { dock, PRESETS }, "retarget");

  // 4 · popover: top layer + anchor position + @starting-style entry + ::backdrop filter
  rec.popover = await evalIn(page, async () => {
    const pop = document.getElementById("pop"); const a = document.getElementById("anchor");
    pop.showPopover();
    const ops = []; for (let i = 0; i < 8; i++) { await new Promise(requestAnimationFrame); ops.push(+parseFloat(getComputedStyle(pop).opacity).toFixed(3)); }
    const pr = pop.getBoundingClientRect(), ar = a.getBoundingClientRect();
    const res = {
      open: pop.matches(":popover-open"),
      entryOpacityFrames: ops,
      anchoredBelow: Math.abs(pr.top - ar.bottom) < 1.5,
      centredOnAnchor: Math.abs(pr.left + pr.width / 2 - (ar.left + ar.width / 2)) < 1.5,
      popRect: [pr.left, pr.top].map((v) => +v.toFixed(1)),
      anchorRect: [ar.left, ar.bottom].map((v) => +v.toFixed(1)),
      backdropFilter: getComputedStyle(pop, "::backdrop").backdropFilter || getComputedStyle(pop, "::backdrop").webkitBackdropFilter,
    };
    pop.hidePopover();
    return res;
  }, undefined, "popover");
  rec.loadEnd = load();
  } catch (e) { rec.error = String(e).slice(0, 400); rec.loadAtError = load(); }
  finally { await browser.close(); }
  return rec;
}

const results = [];
for (const [name, type] of [["chromium", chromium], ["webkit", webkit]].filter(([n]) => !process.env.ENGINES || process.env.ENGINES.split(",").includes(n))) {
  try {
    results.push(await runEngine(name, type));
  } catch (e) { results.push({ engine: name, error: String(e), load: load() }); }
}
const file = join(out, `platform-probe-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
writeFileSync(file, JSON.stringify(results, null, 2));
console.log(file);
console.log(JSON.stringify(results, null, 2));
