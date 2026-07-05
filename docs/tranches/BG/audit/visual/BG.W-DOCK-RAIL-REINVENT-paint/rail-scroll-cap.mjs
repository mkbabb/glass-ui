// Scroll-into-view capture for BG.W-DOCK-RAIL-REINVENT (Chrome/CDP).
// For each route×mode, for each .dock-stack: scroll its owning dock to center,
// screenshot REST, expand (pointerenter + intent + spring settle), screenshot FANNED,
// measure the VISIBLE fan PORT (.dock-stack-fan) overhang vs the dock edge + box-inviolate.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-paint";
const ROUTES = [
    { route: "/dock/rail", slug: "rail" },
    { route: "/dock/liquid-playground", slug: "liquid-playground" },
];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const browser = await chromium.connectOverCDP(CDP);
const all = [];
for (const { route, slug } of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        try {
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
        } catch (e) {}
        await page.waitForTimeout(900);

        const nStacks = await page.evaluate(() => {
            const s = Array.from(document.querySelectorAll(".dock-stack"));
            s.forEach((n, i) => n.setAttribute("data-probe-idx", String(i)));
            return s.length;
        });

        const recs = [];
        for (let i = 0; i < nStacks; i++) {
            const sel = `.dock-stack[data-probe-idx="${i}"]`;
            // scroll owning dock to center
            await page.evaluate((s) => {
                const node = document.querySelector(s);
                const frame = node.closest(".glass-dock-frame") || node;
                (frame.closest(".glass-dock") || frame).scrollIntoView({
                    block: "center",
                    inline: "center",
                });
            }, sel);
            await page.waitForTimeout(500);

            const measure = (s) =>
                page.evaluate((sel) => {
                    const round = (r) => ({
                        l: +r.left.toFixed(1),
                        t: +r.top.toFixed(1),
                        rr: +r.right.toFixed(1),
                        b: +r.bottom.toFixed(1),
                        w: +r.width.toFixed(1),
                        h: +r.height.toFixed(1),
                    });
                    const node = document.querySelector(sel);
                    const frame = node.closest(".glass-dock-frame");
                    const dock = frame
                        ? frame.querySelector(".glass-dock")
                        : node.closest(".glass-dock");
                    const fan = node.querySelector(".dock-stack-fan");
                    const core = node.querySelector(".dock-stack-core");
                    return {
                        orientation: node.getAttribute("data-orientation"),
                        modeAttr: node.getAttribute("data-mode"),
                        expanded: node.classList.contains("is-expanded"),
                        dock: dock ? round(dock.getBoundingClientRect()) : null,
                        fan: fan ? round(fan.getBoundingClientRect()) : null,
                        core: core ? round(core.getBoundingClientRect()) : null,
                        stack: round(node.getBoundingClientRect()),
                    };
                }, s);

            const rest = await measure(sel);
            const restShot = `${OUT}/rail-chrome-${slug}-${mode}-s${i}-rest.png`;
            await page.screenshot({ path: restShot, fullPage: false });

            // expand
            await page.evaluate((s) => {
                document
                    .querySelector(s)
                    .dispatchEvent(new PointerEvent("pointerenter", { bubbles: false }));
            }, sel);
            await page.waitForTimeout(700);
            const fanned = await measure(sel);
            const fanShot = `${OUT}/rail-chrome-${slug}-${mode}-s${i}-fanned.png`;
            await page.screenshot({ path: fanShot, fullPage: false });

            // compute overhang of the visible fan PORT vs dock edge (both axes)
            let overhang = null;
            if (fanned.dock && fanned.fan) {
                const d = fanned.dock,
                    f = fanned.fan;
                overhang = {
                    outLeft: +(d.l - f.l).toFixed(1), // fan beyond dock left
                    outRight: +(f.rr - d.rr).toFixed(1), // fan beyond dock right
                    outTop: +(d.t - f.t).toFixed(1), // fan beyond dock top
                    outBottom: +(f.b - d.b).toFixed(1), // fan beyond dock bottom
                };
            }
            const boxInviolate =
                rest.dock && fanned.dock
                    ? {
                          dW: +(fanned.dock.w - rest.dock.w).toFixed(2),
                          dH: +(fanned.dock.h - rest.dock.h).toFixed(2),
                      }
                    : null;

            // collapse
            await page.evaluate((s) => {
                document
                    .querySelector(s)
                    .dispatchEvent(new PointerEvent("pointerleave", { bubbles: false }));
            }, sel);
            await page.waitForTimeout(300);

            recs.push({
                idx: i,
                orientation: rest.orientation,
                modeAttr: rest.modeAttr,
                rest,
                fanned,
                overhang,
                boxInviolate,
                restShot,
                fanShot,
            });
        }
        all.push({ route, slug, mode, nStacks, recs });
        console.log(
            JSON.stringify({
                route,
                mode,
                nStacks,
                recs: recs.map((r) => ({
                    idx: r.idx,
                    orient: r.orientation,
                    modeAttr: r.modeAttr,
                    exp: r.fanned.expanded,
                    box: r.boxInviolate,
                    overhang: r.overhang,
                })),
            }),
        );
        await ctx.close();
    }
}
await browser.close();
import { writeFileSync } from "node:fs";
writeFileSync(`${OUT}/scroll-cap.json`, JSON.stringify(all, null, 2));
console.log("WROTE scroll-cap.json");
