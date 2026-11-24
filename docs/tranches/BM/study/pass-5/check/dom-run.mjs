// BM pass 5: each page's script run once in happy-dom (no layout, no paint), with every button pressed twice and, on
// P5-mark, a press-drag-release and a cancelled press on every strip. It replaces pass 4's hand-made stub DOM, which
// could not run P5-mark's script. It catches script errors in the start-up path and in each control; it proves
// nothing about layout, paint or timing (happy-dom lays nothing out: every offset is 0).
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-5/check/dom-run.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import { Window } from "happy-dom";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGES = path.resolve(HERE, "../../pages");
const files = ["R1", "R2", "R3", "R3b", "R4", "R5", "R6", "R7", "P2-scroll", "P4-bud", "P5-mark"];
let failed = 0;
for (const f of files) {
  const html = readFileSync(path.join(PAGES, f + ".html"), "utf8");
  const window = new Window({ url: "https://example.invalid/", width: 390, height: 844, settings: { disableJavaScriptEvaluation: true, navigator: { userAgent: "Mozilla/5.0 (iPhone) AppleWebKit Version/27.2 Mobile Safari" } } });
  const { document } = window;
  const errors = [];
  window.addEventListener("error", (e) => errors.push("error: " + (e.error?.message || e.message)));
  // What happy-dom lacks, stubbed so the scripts' own logic runs: Web Animations, hit testing, pointer capture, canvas.
  const anim = () => { const a = { cancel() {}, finish() {}, commitStyles() {}, currentTime: 0, startTime: 0, playState: "running", finished: Promise.resolve(), onfinish: null }; setTimeout(() => a.onfinish && a.onfinish(), 5); return a; };
  window.Element.prototype.animate = anim;
  window.Element.prototype.getAnimations = () => [];
  if (!window.Element.prototype.setPointerCapture) window.Element.prototype.setPointerCapture = () => {};
  document.elementFromPoint = () => document.querySelector(".tab");
  if (!document.timeline) Object.defineProperty(document, "timeline", { value: { get currentTime() { return window.performance.now(); } } });
  window.HTMLCanvasElement.prototype.getContext = () => new Proxy({}, { get: (t, k) => (k in t ? t[k] : () => ({ data: new Uint8ClampedArray(4) })), set: (t, k, v) => { t[k] = v; return true; } });
  document.write(html.replace(/<script>[\s\S]*?<\/script>/g, ""));
  const js = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join("\n");
  try {
    new window.Function(js)();
    for (const pass of [1, 2]) for (const b of document.querySelectorAll("button")) b.click();
    if (f === "P5-mark") {
      for (const strip of document.querySelectorAll(".strip")) {
        const tabs = strip.querySelectorAll(".tab");
        const ev = (type, t, x) => t.dispatchEvent(new window.PointerEvent(type, { bubbles: true, clientX: x, clientY: 5, pointerId: 1 }));
        ev("pointerdown", tabs[0], 2); ev("pointermove", strip, 40); ev("pointermove", strip, 200); ev("pointerup", strip, 200);
        ev("pointerdown", tabs[1], 50); ev("pointerup", strip, 50);
        ev("pointerdown", tabs[2], 90); ev("pointercancel", strip, 90);
        tabs[0].dispatchEvent(new window.KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      }
    }
    await new Promise((r) => setTimeout(r, 60));
  } catch (e) { errors.push("throw: " + e.message); }
  await window.happyDOM.close();
  if (errors.length) failed++;
  console.log(f.padEnd(10), errors.length ? "ERROR " + errors.join(" | ") : "ok");
}
process.exitCode = failed ? 1 : 0;
