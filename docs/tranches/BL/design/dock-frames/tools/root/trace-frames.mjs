// trace-frames.mjs <out.json> [tree=base] [cycles=10] [throttle=4]
// What fills a morph's first frames. Chromium only (Playwright's headless shell, the CDP
// timeline), the fourier repro at 1440 light, under a CPU throttle. Each rendered frame
// of each open and close is marked in the trace (`console.timeStamp`), so a frame's
// interval is the time between two marks, and the main thread's top-level events in
// that interval are summed by name. One browser, one context, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TREES = join(HERE, "../../trees");
const [outPath, tree = "base", cyclesArg = "10", throttleArg = "4"] = process.argv.slice(2);
const cycles = +cyclesArg, throttle = +throttleArg;
const require = createRequire(join(TREES, tree, "package.json"));
const pw = require("playwright");
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const SEL = "[data-testid=fourier-dock]";

const SAMPLER = `(() => {
  window.__mark = (label, ms) => new Promise((done) => {
    const d = document.querySelector('${SEL}');
    const rows = []; const t0 = performance.now(); let i = 0;
    const tick = (now) => {
      const m = d.hasAttribute('data-morphing') ? 1 : 0;
      console.timeStamp('df|' + label + '|' + i + '|' + m);
      rows.push({ i, t: +(now - t0).toFixed(1), m });
      i++;
      if (now - t0 < ms) requestAnimationFrame(tick); else done(rows);
    };
    requestAnimationFrame(tick);
  });
})()`;

const browser = await pw.chromium.launch({ args: ["--use-angle=metal", "--enable-gpu-rasterization"] });
const out = { tree, cycles, throttle, morphs: [] };
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
  try {
    await ctx.addInitScript(SAMPLER);
    const dist = join(TREES, tree, "slim-dist");
    await ctx.route(`http://${tree}.test/**`, (rt) => {
      const u = new URL(rt.request().url());
      let p = u.pathname.replace(/^\/slim\/?/, "");
      if (!p || p.endsWith("/")) p += "index.html";
      const f = join(dist, p);
      if (!existsSync(f)) return rt.fulfill({ status: 404, body: "" });
      return rt.fulfill({ status: 200, body: readFileSync(f), headers: { "content-type": TYPES[extname(f)] ?? "application/octet-stream" } });
    });
    const page = await ctx.newPage();
    try {
      await page.goto(`http://${tree}.test/slim/?c=fourier-dock&scheme=light`, { waitUntil: "load" });
      await page.waitForFunction(() => window.__animReady === true, null, { timeout: 20000 });
      await page.waitForTimeout(800);
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: throttle });
      await browser.startTracing(page, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "disabled-by-default-devtools.timeline.frame", "toplevel", "blink.user_timing", "v8.execute", "gpu", "viz", "cc"] });
      const b = await page.locator(SEL).boundingBox();
      for (let c = 0; c < cycles; c++) {
        const oP = page.evaluate((l) => window.__mark(l, 1000), `open${c}`);
        await page.waitForTimeout(60);
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
        await oP;
        await page.waitForTimeout(300);
        const cP = page.evaluate((l) => window.__mark(l, 1000), `close${c}`);
        await page.waitForTimeout(60);
        await page.evaluate((s) => { const d = document.querySelector(s); const seat = d.querySelector('.dock-layer--full [data-glass-dock-seat]'); seat.focus({ preventScroll: true }); seat.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); }, SEL);
        await cP;
        await page.mouse.move(1436, 896);
        await page.waitForTimeout(400);
      }
      const buf = await browser.stopTracing();
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
      await cdp.detach();
      const events = JSON.parse(buf.toString()).traceEvents;
      // The renderer's main thread: the thread the marks were stamped on.
      const marks = events.filter((e) => e.name === "TimeStamp" && String(e.args?.data?.message ?? "").startsWith("df|"))
        .map((e) => { const [, label, i, m] = e.args.data.message.split("|"); return { label, i: +i, m: +m, ts: e.ts, pid: e.pid, tid: e.tid }; });
      const main = marks[0] ? { pid: marks[0].pid, tid: marks[0].tid } : null;
      const onMain = events.filter((e) => main && e.pid === main.pid && e.tid === main.tid && e.ph === "X" && e.dur);
      const otherThreads = events.filter((e) => main && e.pid === main.pid && e.tid !== main.tid && e.ph === "X" && e.dur);
      const threads = {};
      for (const e of events) if (e.ph === "M" && e.name === "thread_name") threads[`${e.pid}:${e.tid}`] = e.args?.name;
      const labels = [...new Set(marks.map((m) => m.label))];
      for (const label of labels) {
        const ms = marks.filter((m) => m.label === label).sort((a, b) => a.i - b.i);
        const first = ms.findIndex((m) => m.m === 1);
        if (first < 0) continue;
        const frames = [];
        for (let k = Math.max(1, first); k < Math.min(ms.length, first + 8); k++) {
          const a = ms[k - 1].ts, z = ms[k].ts;
          // Top-level events on the main thread that start in the interval, by name; the
          // script ones by their function or URL.
          const inside = onMain.filter((e) => e.ts >= a && e.ts < z);
          const by = {};
          for (const e of inside) {
            const fn = e.args?.data?.functionName || e.args?.data?.url?.split("/").pop() || "";
            const key = ["FunctionCall", "EvaluateScript", "TimerFire", "FireAnimationFrame", "EventDispatch"].includes(e.name) ? `${e.name}${fn ? ":" + fn : ""}${e.args?.data?.type ? ":" + e.args.data.type : ""}` : e.name;
            by[key] = (by[key] ?? 0) + e.dur / 1000;
          }
          const top = Object.entries(by).filter(([k]) => !["RunTask", "ThreadControllerImpl::RunTask"].includes(k)).sort((x, y) => y[1] - x[1]).slice(0, 12).map(([k, v]) => [k, +v.toFixed(2)]);
          const runTask = (by.RunTask ?? 0) + (by["ThreadControllerImpl::RunTask"] ?? 0);
          const raster = otherThreads.filter((e) => e.ts >= a && e.ts < z && /Raster|Decode/.test(e.name)).reduce((s, e) => s + e.dur / 1000, 0);
          const ult = inside.filter((e) => e.name === "UpdateLayoutTree").map((e) => e.args?.elementCount ?? e.args?.data?.elementCount ?? null);
          // Every other thread, in every process: the top events by summed time.
          const others = {};
          for (const e of events) {
            if (e.ph !== "X" || !e.dur || e.ts < a || e.ts >= z || (main && e.pid === main.pid && e.tid === main.tid)) continue;
            const key = `${threads[`${e.pid}:${e.tid}`] ?? e.tid}|${e.name}`;
            others[key] = (others[key] ?? 0) + e.dur / 1000;
          }
          const elsewhere = Object.entries(others).sort((x, y) => y[1] - x[1]).slice(0, 8).map(([k, v]) => [k, +v.toFixed(2)]);
          frames.push({ k: k - first + 1, ms: +((z - a) / 1000).toFixed(1), mainBusy: +runTask.toFixed(2), raster: +raster.toFixed(2), styleElements: ult, top, elsewhere });
        }
        out.morphs.push({ label, frames });
      }
    } finally { await page.close(); }
  } finally { await ctx.close(); }
} finally { await browser.close(); writeFileSync(outPath, JSON.stringify(out)); }
