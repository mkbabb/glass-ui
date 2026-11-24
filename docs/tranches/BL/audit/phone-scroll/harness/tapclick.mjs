// tapclick.mjs — which tapped elements does an engine send a click to?
//
//   node tapclick.mjs <chromium|webkit> <out.json>
//
// One static page per case (no server), each in its own context, tapped once by
// touchscreen.tap at the box's centre at 390x844 with isMobile and hasTouch. Only the
// document listens on every page, in the capture phase, as reka's outside press does
// (it waits for a document `click` after a touch `pointerdown`); it records each
// pointerdown, pointerup and click with its target, so each row says whether the tap made
// a click and where it landed. The cases:
//   doc-only          a div; nothing but the document listens
//   own               a div with its own click listener
//   own-pd            a div with its own click listener whose pointerdown is prevented
//                     (reka's overlay and ModalScrim: `@pointerdown.left.self.prevent`)
//   own-pd-mouse      the same, but pointerdown is prevented only for a non-touch pointer
//   body-none         `body` has `pointer-events: none` (reka's `disableOutsidePointerEvents`,
//                     an open Select) and the tap lands on a div in it with no listener
//   body-none-layer   the same with a fixed layer over it that has `pointer-events: auto`
//                     and its own click listener (the cured outside layer)
//   body-none-bare    that layer without its own click listener
//   own-md            a div with its own click listener whose mousedown is prevented
//                     (the fourth round's ModalScrim)
//   field-own, field-own-pd, field-own-md
//                     a text field focused by script, then the tap on the box of `own`,
//                     `own-pd` and `own-md`; the row also records the focused element
//                     before and after the tap
// One browser per run, one context per case, closed in finally.
// Under the guard: guarded [--exclusive webkit] --timeout 10 -- node tapclick.mjs ...
import { chromium, webkit, devices } from "playwright";
import { writeFileSync } from "node:fs";

const [engine, out] = process.argv.slice(2);
const UA = devices["iPhone 13"].userAgent;

const HEAD = `<!doctype html><meta name=viewport content="width=device-width">
<style>body{margin:0;height:2000px}#box{position:fixed;left:40px;top:200px;width:300px;height:80px;background:#ddd}
#layer{position:fixed;inset:0;pointer-events:auto}</style>`;
const LOG = `<script>
window.__log = [];
for (const t of ["pointerdown", "pointerup", "mousedown", "click"])
  document.addEventListener(t, (e) => __log.push([t, e.target.id || e.target.tagName, e.pointerType || ""]), true);
</script>`;
const CASES = {
    "doc-only": `<div id=box></div>`,
    own: `<div id=box></div><script>box.addEventListener("click", () => {});</script>`,
    "own-pd": `<div id=box></div><script>box.addEventListener("click", () => {});
box.addEventListener("pointerdown", (e) => e.preventDefault());</script>`,
    "own-pd-mouse": `<div id=box></div><script>box.addEventListener("click", () => {});
box.addEventListener("pointerdown", (e) => { if (e.pointerType !== "touch") e.preventDefault(); });</script>`,
    "body-none": `<div id=box></div><script>document.body.style.pointerEvents = "none";</script>`,
    "body-none-layer": `<div id=box></div><div id=layer></div><script>document.body.style.pointerEvents = "none";
layer.addEventListener("click", () => {});</script>`,
    "body-none-bare": `<div id=box></div><div id=layer></div><script>document.body.style.pointerEvents = "none";</script>`,
    "own-md": `<div id=box></div><script>box.addEventListener("click", () => {});
box.addEventListener("mousedown", (e) => e.preventDefault());</script>`,
    "field-own": `<input id=field><div id=box></div><script>box.addEventListener("click", () => {});
field.focus();</script>`,
    "field-own-pd": `<input id=field><div id=box></div><script>box.addEventListener("click", () => {});
box.addEventListener("pointerdown", (e) => e.preventDefault());
field.focus();</script>`,
    "field-own-md": `<input id=field><div id=box></div><script>box.addEventListener("click", () => {});
box.addEventListener("mousedown", (e) => e.preventDefault());
field.focus();</script>`,
};

const browser = engine === "webkit" ? await webkit.launch({ headless: true }) : await chromium.launch({ headless: true });
const rows = [{ meta: { engine, browser: browser.version(), date: new Date().toISOString() } }];
try {
    for (const [id, body] of Object.entries(CASES)) {
        const ctx = await browser.newContext({
            viewport: { width: 390, height: 844 },
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            userAgent: UA,
        });
        try {
            const page = await ctx.newPage();
            await page.setContent(HEAD + LOG + body);
            const active = () => page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName || null);
            const focusBefore = await active();
            await page.touchscreen.tap(190, 240);
            await new Promise((res) => setTimeout(res, 500));
            const log = await page.evaluate(() => window.__log);
            const focusAfter = await active();
            const click = log.find(([t]) => t === "click");
            rows.push({ case: id, click: click ? click[1] : null, focusBefore, focusAfter, log });
            console.log(`${engine} ${id}: click=${click ? click[1] : "none"} focus ${focusBefore} -> ${focusAfter} log=${JSON.stringify(log)}`);
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
    writeFileSync(out, JSON.stringify(rows, null, 1));
}
