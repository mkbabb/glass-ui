// Fix seat 2: samples every frame of a fold and an unfold on the fold-content harness:
// each content item's box (clipped by the dock's own clip while it has one) against the
// plate's painted box, and each item's effective opacity. One browser, one context per
// cell, closed in finally.
//   node fold-content-probe.mjs <base-url> <chromium|webkit>
import { chromium, webkit } from "playwright";

const [base, engine = "chromium"] = process.argv.slice(2);
const browser = await (engine === "webkit" ? webkit : chromium).launch();
const sampler = () => {
    const w = window;
    w.__frames = [];
    const items = [...document.querySelectorAll(".fc-dock .dock-layer--full :is([aria-label='Home'],[aria-label='Search'],[aria-label='Settings'],.fc-slider,.fc-inside)")];
    const dock = document.querySelector(".fc-dock");
    const plate = dock.querySelector(".dock-plate");
    const tick = () => {
        const p = plate.getBoundingClientRect();
        const cs = getComputedStyle(dock);
        const clipX = cs.overflowX === "clip" || cs.overflowX === "hidden";
        const clipY = cs.overflowY === "clip" || cs.overflowY === "hidden";
        const d = dock.getBoundingClientRect();
        const f = { morphing: dock.hasAttribute("data-morphing"), t: cs.getPropertyValue("--dock-expand-t").trim(), plate: [p.left, p.top, p.right, p.bottom].map((v) => +v.toFixed(1)), items: [] };
        for (const el of items) {
            let o = 1;
            for (let e = el; e && e !== document.body; e = e.parentElement) {
                const s = getComputedStyle(e);
                o *= +s.opacity;
                if (s.visibility === "hidden" && e === el) o = 0;
            }
            if (getComputedStyle(el).visibility === "hidden") o = 0;
            const r = el.getBoundingClientRect();
            let [l, t, rr, b] = [r.left, r.top, r.right, r.bottom];
            if (clipX) { l = Math.max(l, d.left); rr = Math.min(rr, d.right); }
            if (clipY) { t = Math.max(t, d.top); b = Math.min(b, d.bottom); }
            const run = el.closest(".dock-run");
            if (run) {
                const rs = getComputedStyle(run);
                const rb = run.getBoundingClientRect();
                if (rs.overflowX !== "visible") { l = Math.max(l, rb.left); rr = Math.min(rr, rb.right); }
                if (rs.overflowY !== "visible") { t = Math.max(t, rb.top); b = Math.min(b, rb.bottom); }
            }
            const visible = rr > l && b > t;
            const out = visible ? Math.max(p.left - l, rr - p.right, p.top - t, b - p.bottom, 0) : 0;
            f.items.push({ id: el.getAttribute("aria-label") ?? el.className.split(" ")[0], o: +o.toFixed(3), out: +out.toFixed(1) });
        }
        w.__frames.push(f);
        if (w.__frames.length < (w.__limit ?? 120)) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
try {
    for (const orientation of ["horizontal", "vertical"])
        for (const width of [1440, 390]) {
            const context = await browser.newContext({ viewport: { width, height: 900 } });
            try {
                const page = await context.newPage();
                await page.goto(`${base}/tests-visual/release-11-0-2/fold-content-harness.html?orientation=${orientation}${process.env.FIT ? "&fit=1" : ""}`);
                await page.locator(".fc-dock .dock-plate").waitFor();
                await page.waitForTimeout(600);
                if (process.env.IDLE) {
                    await page.goto(`${base}/tests-visual/release-11-0-2/fold-content-harness.html?orientation=${orientation}&collapse=open${process.env.FIT ? "&fit=1" : ""}`);
                    await page.locator(".fc-dock .dock-plate").waitFor();
                    await page.waitForTimeout(600);
                    const s = await page.locator(".fc-slider .slider-thumb").boundingBox();
                    await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2);
                    await page.waitForTimeout(500);
                    await page.mouse.down();
                    await page.mouse.move(s.x + s.width / 2 + (orientation === "vertical" ? 0 : 30), s.y + s.height / 2 + (orientation === "vertical" ? -30 : 0), { steps: 5 });
                    await page.mouse.up();
                    await page.mouse.move(5, 5);
                    await page.evaluate(() => (window.__limit = 600));
                    await page.evaluate(sampler);
                    await page.waitForTimeout(9000);
                    const frames = (await page.evaluate(() => window.__frames)).filter((f, i, a) => f.morphing || (i > 0 && a[i - 1].morphing) || (i + 1 < a.length && a[i + 1].morphing));
                    let worstOut = 0, worstStep = 0, at = null;
                    for (let i = 0; i < frames.length; i++)
                        for (let k = 0; k < frames[i].items.length; k++) {
                            const it = frames[i].items[k];
                            if (it.o > 0.02 && it.out > worstOut) { worstOut = it.out; at = { i, id: it.id, o: it.o, t: frames[i].t }; }
                            if (i > 0) worstStep = Math.max(worstStep, Math.abs(it.o - frames[i - 1].items[k].o));
                        }
                    console.log(JSON.stringify({ engine, orientation, width, dir: "idle-fold", worstOut, at, worstStep, n: frames.length }));
                    if (process.env.DUMP) console.log(JSON.stringify(frames.map((f) => [f.t, f.plate, f.items.map((x) => `${x.id}:${x.o}/${x.out}`).join(" ")])));
                    continue;
                }
                for (const dir of ["expand", "collapse"]) {
                    await page.evaluate(sampler);
                    await page.evaluate((dir) => (dir === "expand" ? window.__expand() : window.__collapse()), dir);
                    await page.waitForTimeout(2200);
                    const frames = await page.evaluate(() => window.__frames);
                    let worstOut = 0, worstStep = 0, at = null;
                    for (let i = 0; i < frames.length; i++)
                        for (let k = 0; k < frames[i].items.length; k++) {
                            const it = frames[i].items[k];
                            if (it.o > 0.02 && it.out > worstOut) { worstOut = it.out; at = { i, id: it.id, o: it.o, t: frames[i].t }; }
                            if (i > 0) worstStep = Math.max(worstStep, Math.abs(it.o - frames[i - 1].items[k].o));
                        }
                    console.log(JSON.stringify({ engine, orientation, width, dir, worstOut, at, worstStep, n: frames.length }));
                    if (process.env.DUMP) console.log(JSON.stringify(frames.filter((f) => f.morphing).map((f) => [f.t, f.plate, f.items.map((x) => `${x.id}:${x.o}/${x.out}`).join(" ")])));
                }
            } finally {
                await context.close();
            }
        }
} finally {
    await browser.close();
}
