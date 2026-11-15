// smoke.mjs <port> [--engine chromium|webkit]: one look at each MEASURE-3 behaviour (no judge).
import * as pw from "playwright";
const port = process.argv[2]; const engine = process.argv.includes("--engine") ? process.argv[process.argv.indexOf("--engine") + 1] : "chromium";
const exe = engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {};
const browser = await pw[engine].launch({ headless: true, ...exe });
const out = {};
const sampleJs = (sel, ms) => `new Promise((res) => { const rows = []; const t0 = performance.now(); const f = () => { const t = performance.now() - t0; rows.push([+t.toFixed(1), ...(${sel})()]); if (t < ${ms}) requestAnimationFrame(f); else res(rows); }; requestAnimationFrame(f); })`;
async function ctx(w, h, coarse) {
    const c = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: coarse, ...(coarse && engine === "chromium" ? { isMobile: true } : {}) });
    return c;
}
try {
    // 1. the tall pill: content inside the curve at open rest
    for (const cell of ["w-layers", "w-xf"]) {
        const c = await ctx(1440, 900, false); const p = await c.newPage();
        await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`); await p.waitForSelector(`[data-testid=${cell}]`); await p.waitForTimeout(700);
        await p.mouse.move(8, 8); const b = await p.locator(`[data-testid=${cell}]`).boundingBox(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); await p.waitForTimeout(1200);
        out[cell] = await p.evaluate((cell) => {
            const d = document.querySelector(`[data-testid=${cell}]`); const R = d.getBoundingClientRect(); const r = Math.min(R.width, R.height) / 2;
            const run = d.querySelector(".dock-run"); let worst = 0;
            for (const ch of run.children) { const q = ch.getBoundingClientRect(); for (const [x, y] of [[q.left, q.top], [q.right, q.top], [q.left, q.bottom], [q.right, q.bottom]]) { const cx = Math.min(Math.max(x, R.left + r), R.right - r), cy = Math.min(Math.max(y, R.top + r), R.bottom - r); worst = Math.max(worst, Math.hypot(x - cx, y - cy) - r); } }
            return { cls: d.className, w: +R.width.toFixed(1), h: +R.height.toFixed(1), inset: d.style.getPropertyValue("--dock-curve-inset"), pad: getComputedStyle(d).paddingLeft, worstOutside: +worst.toFixed(2) };
        }, cell);
        await c.close();
    }
    // 2. O-358 at 360, 390 (touch) and 1440
    for (const [w, coarse] of [[360, true], [390, true], [1440, false]]) {
        const c = await ctx(w, 800, coarse); const p = await c.newPage();
        await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-many`); await p.waitForSelector("[data-testid=w-many]"); await p.waitForTimeout(700);
        const s = p.locator("[data-testid=w-many] .dock-layer--summary"); const sb = await s.boundingBox();
        if (coarse) await p.touchscreen.tap(sb.x + sb.width / 2, sb.y + sb.height / 2); else await p.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2, { steps: 4 });
        await p.waitForTimeout(1200);
        out[`w-many-${w}`] = await p.evaluate(() => {
            const d = document.querySelector("[data-testid=w-many]"); const run = d.querySelector(".dock-run"); const rr = run.getBoundingClientRect(); const P = d.querySelector(".dock-plate").getBoundingClientRect();
            const seats = [...run.children].map((e) => { const q = e.getBoundingClientRect(); const vis = Math.max(0, Math.min(q.right, rr.right, P.right) - Math.max(q.left, rr.left, P.left)); return +(vis / q.width).toFixed(2); });
            return { cls: d.className.includes("expanded"), compact: run.hasAttribute("data-compact"), dockW: +d.getBoundingClientRect().width.toFixed(1), scroll: run.scrollWidth - run.clientWidth, seatsVisible: seats.join(",") };
        });
        await c.close();
    }
    // 3. keyframes's transport by touch at 390
    { const c = await ctx(390, 844, true); const p = await c.newPage(); await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-transport`); await p.waitForSelector("[data-testid=w-transport]"); await p.waitForTimeout(700);
      out.transport = await p.evaluate(() => ({ cls: document.querySelector("[data-testid=w-transport]").className, hoverNone: matchMedia("(hover: none)").matches })); await c.close(); }
    // 4. a seat joining and leaving the open dock
    { const c = await ctx(1440, 900, false); const p = await c.newPage(); await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-seatset`); await p.waitForSelector("[data-testid=w-seatset]"); await p.waitForTimeout(700);
      const b = await p.locator("[data-testid=w-seatset]").boundingBox(); await p.mouse.move(8, 8); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); await p.waitForTimeout(1200); await p.mouse.move(8, 120);
      const fn = `() => { const e = document.querySelector('[data-testid=w-seatset-extra]'); return e ? [getComputedStyle(e).opacity, e.hasAttribute('data-dock-leaving') ? 'L' : '', Math.round(e.getBoundingClientRect().left)] : ['-'] }`;
      const join = p.evaluate(sampleJs(fn, 450)); await p.evaluate(() => document.querySelector("[data-testid=w-seatset-add]").click()); out.join = (await join).filter((_, i) => i % 3 === 0).map((r) => r.join(":")).join(" ");
      await p.waitForTimeout(500);
      const leave = p.evaluate(sampleJs(fn, 450)); await p.evaluate(() => document.querySelector("[data-testid=w-seatset-add]").click()); out.leave = (await leave).filter((_, i) => i % 3 === 0).map((r) => r.join(":")).join(" ");
      await c.close(); }
    // 5. the rim through a fold
    { const c = await ctx(1440, 900, false); const p = await c.newPage(); await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-rim`); await p.waitForSelector("[data-testid=w-rim]"); await p.waitForTimeout(700);
      const fn = `() => { const P = document.querySelector('[data-testid=w-rim] .dock-plate').getBoundingClientRect(); const r = document.querySelector('[data-testid=w-rim-rim]'); const q = r.getBoundingClientRect(); return [+(Math.max(Math.abs(P.left-q.left),Math.abs(P.right-q.right),Math.abs(P.top-q.top),Math.abs(P.bottom-q.bottom))).toFixed(2), getComputedStyle(r).borderTopLeftRadius, getComputedStyle(document.querySelector('[data-testid=w-rim] .dock-plate')).borderTopLeftRadius, r.style.getPropertyValue('--scroll-progress-rim-fill')] }`;
      const b = await p.locator("[data-testid=w-rim]").boundingBox(); await p.mouse.move(8, 8);
      const unfold = p.evaluate(sampleJs(fn, 500)); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
      const rows = await unfold; out.rim = { maxDev: Math.max(...rows.map((r) => r[1])), sample: rows.filter((_, i) => i % 8 === 0).map((r) => r.slice(1).join("/")).join(" ") };
      await c.close(); }
    // 6. six controls at 360
    { const c = await ctx(360, 780, true); const p = await c.newPage(); await p.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-ctl6`); await p.waitForSelector("[data-testid=w-ctl6]"); await p.waitForTimeout(700);
      const s = await p.locator("[data-testid=w-ctl6] .dock-layer--summary").boundingBox(); await p.touchscreen.tap(s.x + s.width / 2, s.y + s.height / 2); await p.waitForTimeout(1200);
      out.ctl6 = await p.evaluate(() => { const d = document.querySelector("[data-testid=w-ctl6]"); const R = d.querySelector(".dock-plate").getBoundingClientRect(); const run = d.querySelector(".dock-run"); return { open: d.className.includes("expanded"), w: R.width, left: R.left, right: R.right, clipped: [...run.children].filter((e) => { const q = e.getBoundingClientRect(); return q.left < R.left - 0.5 || q.right > R.right + 0.5 || q.left < 0 || q.right > innerWidth; }).length }; });
      await c.close(); }
} finally { await browser.close(); }
console.log(JSON.stringify(out, null, 1));
