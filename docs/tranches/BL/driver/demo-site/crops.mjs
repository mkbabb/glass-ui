// Crops for the owner: the shell docks folded and open, the two reference pages, the
// front door's cards. Run once against the live site (`--tag before`) and once against
// the local build (`--tag after`).
//
// Machine law: through `~/.claude/guard/guarded` as a browser run; headless shell; the
// GPU flags are the one named exception (canvases must render); one browser, a new
// context per cell, all closed in `finally`.
//
// usage: node crops.mjs --base http://localhost:5451 --tag after --out <dir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base;
const TAG = args.tag;
const OUT = args.out;
fs.mkdirSync(OUT, { recursive: true });
const only = args.only ? new Set(args.only.split(",")) : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};

const JOBS = [
    { id: "buttons", route: "/display/buttons", cells: ["d1440", "l1440", "m390"], full: false },
    { id: "configurator", route: "/containers/configurator", cells: ["d1440", "l1440", "m390"], full: false },
    { id: "cards", route: "/", cells: ["d1440", "m390"], full: false },
    { id: "rail", route: "/display/buttons", cells: ["d1440"], rail: true },
    { id: "pager", route: "/foundations/colors", cells: ["d1440", "m390"], pager: true },
];

const browser = await chromium.launch({
    headless: true,
    args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
});
try {
    for (const job of JOBS) {
        if (only && !only.has(job.id)) continue;
        for (const cellId of job.cells) {
            const C = CELLS[cellId];
            const ctx = await browser.newContext({
                viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1,
            });
            try {
                await ctx.addInitScript(`try{localStorage.setItem("vueuse-color-scheme",${JSON.stringify(C.scheme)})}catch{}`);
                const page = await ctx.newPage();
                await page.goto(BASE + job.route, { waitUntil: "load", timeout: 45000 });
                await page.waitForSelector("#demo-main");
                await sleep(2500);
                const name = (s) => path.join(OUT, `${job.id}-${s}-${cellId}-${TAG}.png`);
                if (job.rail) {
                    const rail = page.locator("[data-testid=sidebar-dock-collapsible]").first();
                    const clip = { x: 0, y: 0, width: 220, height: 900 };
                    await page.mouse.move(720, 450);
                    await page.screenshot({ path: name("open"), clip });
                    // a press in the page, then the pointer away: the rail folds
                    await page.mouse.click(900, 600);
                    await page.mouse.move(1200, 800);
                    await sleep(7500);
                    await page.screenshot({ path: name("folded"), clip });
                    const box = await rail.boundingBox();
                    if (box) {
                        await page.mouse.move(box.x + box.width / 2, box.y + 30, { steps: 4 });
                        await sleep(1500);
                        await page.screenshot({ path: name("reopened"), clip });
                    }
                } else if (job.pager) {
                    await page.evaluate(() => {
                        const m = document.querySelector("#demo-main");
                        m.scrollTo({ top: m.scrollHeight / 2 - m.clientHeight / 2, behavior: "instant" });
                    });
                    await sleep(800);
                    const vh = C.viewport.height, vw = C.viewport.width;
                    const clip = { x: 0, y: vh - 200, width: vw, height: 200 };
                    await page.screenshot({ path: name("folded"), clip });
                    const dock = page.locator("[data-testid=bottom-dock-collapsible]").first();
                    const box = await dock.boundingBox();
                    if (box) {
                        if (C.touch) await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
                        else await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
                        await sleep(1500);
                        await page.screenshot({ path: name("open"), clip });
                    }
                } else {
                    await page.screenshot({ path: name("fold") });
                }
            } catch (e) {
                process.stdout.write(`crop ${job.id} ${cellId}: ${e.message}\n`);
            } finally {
                await ctx.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close().catch(() => {});
}
process.stdout.write(`crops written to ${OUT}\n`);
