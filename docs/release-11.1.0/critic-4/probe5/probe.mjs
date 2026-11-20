// Critic 4 third probe (orchestrator-note-mark-press.md, O-246): does the dock's run mark
// keep a pressed seat's scale? On the second probe's `nav` scene (a run of tab seats whose
// current seat changes on click), activate a seat and, once everything has settled, read
// the mark's box (the five lengths the composable wrote, and the pseudo-element's used
// size) against the seat's layout box (offsetWidth, offsetHeight) and its painted rect.
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label>
// One browser per run, a new context per cell, every context and the browser closed in finally.
import { chromium, webkit } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label] = process.argv.slice(2);
const engine = engineName === "webkit" ? webkit : chromium;
mkdirSync(join(outDir, "png"), { recursive: true });
const PATH = "/docs/release-11.1.0/critic-4/probe4/harness/index.html";
const cells = [];
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");

const read = (i) => {
    const run = document.querySelector(".dock-run[data-run-mark]");
    const seat = document.querySelector(`[data-tab="${i}"]`);
    if (!run) return { error: "no mark" };
    const v = (n) => parseFloat(run.style.getPropertyValue(n));
    const before = getComputedStyle(run, "::before"), r = seat.getBoundingClientRect(), cs = getComputedStyle(seat);
    return {
        current: seat.getAttribute("aria-current"),
        mark: { w: +v("--dock-run-mark-w").toFixed(2), h: +v("--dock-run-mark-h").toFixed(2), x: +v("--dock-run-mark-x").toFixed(2), y: +v("--dock-run-mark-y").toFixed(2), r: +v("--dock-run-mark-r").toFixed(2) },
        pseudo: [before.width, before.height],
        seatLayout: { w: seat.offsetWidth, h: seat.offsetHeight, left: seat.offsetLeft, top: seat.offsetTop },
        seatRect: { w: +r.width.toFixed(2), h: +r.height.toFixed(2) },
        seatScale: cs.scale, seatTransform: cs.transform, bgClip: cs.backgroundClip, border: cs.borderLeftWidth,
    };
};
const center = (page, i) => page.evaluate((i) => { const r = document.querySelector(`[data-tab="${i}"]`).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, i);

const browser = await engine.launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
try {
    for (const [width, touch] of [[390, true], [1440, false], [390, false], [1440, true]]) for (const shape of ["tab", "icon"]) for (const how of ["click", "hold-600", "keyboard", "script"]) for (const theme of how === "click" ? ["light", "dark"] : ["light"]) {
        const name = `${width}-${touch ? "coarse" : "fine"}-${shape}-${how}-${theme}`;
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, hasTouch: touch, isMobile: touch && engineName === "chromium", reducedMotion: "no-preference" });
        try {
            const page = await context.newPage();
            await page.goto(`${base}${PATH}?scene=nav&theme=${theme}&shape=${shape}`, { waitUntil: "load" });
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 15_000 });
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(900);
            const rest = await page.evaluate(read, 1);
            const target = 0; // seat 0 is on screen at both widths; the scene opens on seat 1
            const [x, y] = await center(page, target);
            let during = null;
            if (how === "click") {
                if (touch) await page.touchscreen.tap(x, y);
                else { await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(90); await page.mouse.up(); }
            } else if (how === "hold-600") {
                await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(600);
                during = await page.evaluate((i) => { const s = document.querySelector(`[data-tab="${i}"]`), r = s.getBoundingClientRect(); return { rect: [+r.width.toFixed(2), +r.height.toFixed(2)], layout: [s.offsetWidth, s.offsetHeight], scale: getComputedStyle(s).scale, transform: getComputedStyle(s).transform }; }, target);
                await page.mouse.up();
            } else if (how === "keyboard") {
                await page.evaluate((i) => document.querySelector(`[data-tab="${i}"]`).focus(), target);
                await page.keyboard.press("Enter");
            } else await page.evaluate((i) => window.__select(i), target);
            // Sample the mark while it settles, then at rest.
            const samples = [];
            for (const t of [60, 120, 250, 500]) { await page.waitForTimeout(t === 60 ? 60 : t - samples.at(-1).t); samples.push({ t, ...(await page.evaluate((i) => { const run = document.querySelector(".dock-run"), s = document.querySelector(`[data-tab="${i}"]`), r = s.getBoundingClientRect(); return { markW: parseFloat(run.style.getPropertyValue("--dock-run-mark-w")), rectW: +r.width.toFixed(2), layoutW: s.offsetWidth }; }, target)) }); }
            await page.waitForTimeout(2500);
            const settled = await page.evaluate(read, target);
            const box = await page.locator('[data-probe="nav"]').boundingBox();
            if (how !== "script") await page.screenshot({ path: join(outDir, "png", `${label}-${engineName}-${name}.png`), clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: Math.min(box.width + 16, width), height: box.height + 16 } });
            const dw = settled.mark ? +(settled.mark.w - settled.seatLayout.w).toFixed(2) : null, dh = settled.mark ? +(settled.mark.h - settled.seatLayout.h).toFixed(2) : null;
            cells.push({ cell: name, rest, during, samples, settled, delta: [dw, dh], within: dw !== null && Math.abs(dw) <= 0.5 && Math.abs(dh) <= 0.5 });
        } catch (e) { cells.push({ cell: name, error: String(e).slice(0, 300) }); } finally { await context.close(); }
    }
} finally {
    await browser.close();
}
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify({ engine: engineName, label, cells }, null, 2));
for (const c of cells) console.log(c.cell, c.error ?? `mark ${c.settled.mark?.w}x${c.settled.mark?.h} seat layout ${c.settled.seatLayout?.w}x${c.settled.seatLayout?.h} rect ${c.settled.seatRect?.w}x${c.settled.seatRect?.h} delta ${c.delta} ${c.within ? "WITHIN" : "OFF"}`);
console.log(`VERDICT ${label} ${engineName} ${cells.filter((c) => c.within).length}/${cells.length} within 0.5 px`);
