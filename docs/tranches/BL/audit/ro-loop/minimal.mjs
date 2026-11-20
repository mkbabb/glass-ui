#!/usr/bin/env node
// The engine behaviour alone, no glass code. A script inserts a stylesheet that answers
// late, then (a task later) a box with a button in it. Observer S watches the box (depth
// 3) and reads nothing; observer B watches the button (depth 4). Variants of B's callback:
//   read   getBoundingClientRect() on the button (what useBarShape does)
//   style  getComputedStyle(button).minBlockSize only
//   noop   nothing
// Logged: each delivery's frame and box, and the window `error`.
//   node minimal.mjs [--browser webkit|chromium] [--reps 3] [--hold 800]
// PW=<path to another install's playwright/index.mjs> runs another WebKit build (read-only).
const { chromium, webkit } = await import(process.env.PW ?? "playwright");

const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : d);
const engine = opt("--browser", "webkit");
const reps = Number(opt("--reps", "3"));
const holdMs = Number(opt("--hold", "800"));
const ORIGIN = "https://ro-minimal.test";

const html = (variant) => `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0">
<script>
window.__log = []; window.__err = []; let frame = 0;
(function tick(){ frame++; requestAnimationFrame(tick); })();
addEventListener("error", (e) => __err.push({ frame, msg: e.message }), true);
const variant = ${JSON.stringify(variant)};
addEventListener("load", () => {
  const link = document.createElement("link"); link.rel = "stylesheet"; link.href = "/slow.css";
  link.onload = () => __log.push({ frame, what: "slow.css loaded" });
  document.head.append(link);
  setTimeout(() => {
    const box = document.createElement("div"); box.id = "box"; box.style.cssText = "padding:16px";
    const button = document.createElement("button"); button.textContent = "Secondary";
    box.append(button); document.body.append(box);
    new ResizeObserver(([e]) => __log.push({ frame, who: "S box", bb: [e.borderBoxSize[0].inlineSize, e.borderBoxSize[0].blockSize] })).observe(box);
    new ResizeObserver(([e]) => {
      const t0 = performance.now();
      if (variant === "read") button.getBoundingClientRect();
      if (variant === "style") getComputedStyle(button).minBlockSize;
      __log.push({ frame, who: "B button", bb: [e.borderBoxSize[0].inlineSize, e.borderBoxSize[0].blockSize], ms: +(performance.now() - t0).toFixed(2) });
    }).observe(button);
  }, 30);
});
</script></body></html>`;

const browser = await { webkit, chromium }[engine].launch();
try {
    for (const variant of ["read", "style", "noop"]) {
        let red = 0;
        let sample = null;
        for (let rep = 0; rep < reps; rep++) {
            const context = await browser.newContext({ viewport: { width: 800, height: 600 } });
            try {
                await context.route(`${ORIGIN}/**`, async (r) => {
                    const path = new URL(r.request().url()).pathname;
                    if (path === "/slow.css") {
                        await new Promise((d) => setTimeout(d, holdMs));
                        return r.fulfill({ contentType: "text/css", body: "body{}" }).catch(() => {});
                    }
                    return r.fulfill({ contentType: "text/html", body: html(variant) });
                });
                const page = await context.newPage();
                await page.goto(`${ORIGIN}/`);
                await page.waitForTimeout(holdMs + 700);
                const got = await page.evaluate(() => ({ log: window.__log, err: window.__err }));
                if (got.err.length) red++;
                sample ??= got;
            } finally {
                await context.unrouteAll({ behavior: "ignoreErrors" });
                await context.close();
            }
        }
        console.log(`${engine} B=${variant}: RO loop error in ${red}/${reps}`);
        for (const l of sample.log) console.log(`   f${l.frame} ${l.who ?? l.what}${l.bb ? ` ${l.bb.map((v) => +v.toFixed(2)).join("x")}` : ""}${l.ms !== undefined ? ` ${l.ms}ms` : ""}`);
        for (const e of sample.err) console.log(`   f${e.frame} ERROR ${e.msg}`);
    }
} finally {
    await browser.close();
}
