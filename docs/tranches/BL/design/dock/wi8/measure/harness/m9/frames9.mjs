// frames9.mjs <port> <tag> --engine chromium|webkit --cell <id> [--scheme light|dark] [--action fold|open] [--frames 28]
//             [--every 1] [--q "&k=v"] [--keep 0,8,16]: MEASURE-9 part H. A travel stepped frame by frame on a frozen clock,
// so the same frame can be cropped on two trees (the tip and a plant) and compared pixel by pixel (m9/pixdiff9.py).
// An init script hands the page a clock that stands still: performance.now() and every requestAnimationFrame timestamp
// read a virtual time that moves only when the script advances it, 1000/60 ms at a time; the page keeps producing
// frames, each with a zero step, so the shot of frame k is the dock's frame k at 60 Hz. The dock is opened by hover (1440
// fine) and settled on the real clock; the clock is frozen; the action starts (fold: a press on the page outside the
// dock, which folds at once; open: the pointer moved onto the folded face and held); then frame by frame the clock
// advances one 60 Hz interval and the dock's box (plate's box with 8 px around, the box of the largest frame) is shot.
// Per frame the JSON records the plate's box, the root's --dock-expand-t, every region's clip-path and the plate's
// computed border colour and background. Crops: ../../crops-m9/<tag>/<cell>.<scheme>.<engine>.f<k>.png (every frame
// while comparing; --keep names the frames a strip keeps, and the comparison deletes the rest).
// --action click:<testid> (H10, w-words): the dock is not hovered; the step presses the page's button with that test id
// (the travel is the dock's answer to it), and --stem names the crops (the cell's name by default).
// One browser, one context, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const cell = val("--cell", "w-persist");
const scheme = val("--scheme", "light");
const action = val("--action", "fold");
const frames = +val("--frames", "28");
const extra = val("--q", "");
const clickId = action.startsWith("click:") ? action.slice(6) : null;
const stem = val("--stem", cell);
const pre = val("--pre", "") ? val("--pre", "").split(",") : null;
const dir = new URL(`../../crops-m9/${tag}/`, import.meta.url);
mkdirSync(dir, { recursive: true });
const INIT = `
(() => {
  const realNow = performance.now.bind(performance);
  let vt = 0, frozen = false;
  performance.now = () => (frozen ? vt : realNow());
  const realRaf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => realRaf((ts) => cb(frozen ? vt : ts));
  window.__freeze = () => { vt = realNow(); frozen = true; return vt; };
  window.__advance = (ms) => { vt += ms; return vt; };
})();
`;
const out = { engine, tag, cell, scheme, action, stem, pre, frames: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}${scheme === "dark" ? "&scheme=dark" : ""}${extra}`);
        const D = `[data-testid=${cell}]`;
        await page.waitForSelector(D);
        await page.waitForTimeout(800);
        const b = await page.locator(D).boundingBox();
        if (!clickId) {
            await page.mouse.move(b.x - 30, b.y + b.height / 2);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
            await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
        }
        await page.waitForTimeout(1400);
        const read = () => page.evaluate((D) => {
            const d = document.querySelector(D);
            const p = d.querySelector(".dock-plate");
            const r = p.getBoundingClientRect();
            const cs = getComputedStyle(p);
            return {
                open: d.classList.contains("expanded"), morphing: d.hasAttribute("data-morphing"),
                t: d.style.getPropertyValue("--dock-expand-t") || getComputedStyle(d).getPropertyValue("--dock-expand-t").trim(),
                plate: [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(2)), radius: cs.borderTopLeftRadius,
                border: cs.borderTopColor, bg: cs.backgroundColor, veilTier: cs.getPropertyValue("--glass-veil-tier").trim(),
                clips: [...d.querySelectorAll(":scope > .dock-controls > *")].map((e) => [e.className.toString().split(" ").filter((c) => c.startsWith("dock-")).join("."), e.style.clipPath || ""]),
            };
        }, D);
        if (pre) { for (const id of pre) await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).click(), id); await page.waitForTimeout(1400); }
        out.start = await read();
        if (action === "fold" && !out.start.open) throw new Error("the dock did not open");
        await page.evaluate(() => window.__freeze());
        if (clickId) await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).click(), clickId);
        else if (action === "fold") await page.mouse.click(1430, 890);
        else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
        const shots = [];
        for (let k = 0; k < frames; k++) {
            await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
            const r = await read();
            r.k = k;
            out.frames.push(r);
            shots.push(r.plate);
            await page.evaluate(() => window.__advance(1000 / 60));
        }
        // the crop box: the union of every frame's plate, 8 px around
        const x0 = Math.max(0, Math.floor(Math.min(...shots.map((s) => s[0])) - 8));
        const y0 = Math.max(0, Math.floor(Math.min(...shots.map((s) => s[1])) - 8));
        const x1 = Math.ceil(Math.max(...shots.map((s) => s[0] + s[2])) + 8);
        const y1 = Math.ceil(Math.max(...shots.map((s) => s[1] + s[3])) + 8);
        out.crop = { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
        // second pass: the same travel again on a new page, shot at each frame with the box fixed
        await page.goto("about:blank");
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}${scheme === "dark" ? "&scheme=dark" : ""}${extra}`);
        await page.waitForSelector(D);
        await page.waitForTimeout(800);
        if (!clickId) {
            await page.mouse.move(b.x - 30, b.y + b.height / 2);
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
            await page.mouse.move(b.x + b.width / 2 + 2, b.y + b.height / 2);
        }
        await page.waitForTimeout(1400);
        if (out.pre) for (const id of out.pre) await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).click(), id);
        if (out.pre) await page.waitForTimeout(1400);
        await page.evaluate(() => window.__freeze());
        if (clickId) await page.evaluate((id) => document.querySelector(`[data-testid=${id}]`).click(), clickId);
        else if (action === "fold") await page.mouse.click(1430, 890);
        else await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
        for (let k = 0; k < frames; k++) {
            await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
            const r = await read();
            out.frames[k].again = { plate: r.plate, t: r.t };
            await page.screenshot({ path: new URL(`${stem}.${scheme}.${engine}.f${String(k).padStart(2, "0")}.png`, dir).pathname, clip: out.crop, animations: "allow" });
            await page.evaluate(() => window.__advance(1000 / 60));
        }
    } finally {
        await ctx.close();
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`${stem}.${scheme}.${engine}.json`, dir), JSON.stringify(out, null, 1));
    console.log(`${tag} ${stem} ${scheme} ${engine}: ${out.frames.length} frames, t ${out.frames.map((f) => f.t).slice(0, 12).join(" ")} ...`);
}
