// Interaction probe for BG.W-DOCK-RAIL-REINVENT: drives the macOS-stack fan-out and
// measures box-inviolate (dock deltaW/deltaH), the asymmetric-golden overhang ratio,
// and compositor-only channels (getAnimations). Captures fanned screenshots per stack.
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
        await page.waitForTimeout(1000);

        // Measure REST for all stacks.
        const rest = await page.evaluate(() => {
            const round = (r) => ({
                x: +r.x.toFixed(1),
                y: +r.y.toFixed(1),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
                l: +r.left.toFixed(1),
                t: +r.top.toFixed(1),
                rr: +r.right.toFixed(1),
                b: +r.bottom.toFixed(1),
            });
            const stacks = Array.from(document.querySelectorAll(".dock-stack"));
            return stacks.map((s, i) => {
                s.setAttribute("data-probe-idx", String(i));
                const frame = s.closest(".glass-dock-frame");
                const dock = frame
                    ? frame.querySelector(".glass-dock")
                    : s.closest(".glass-dock");
                const cs = getComputedStyle(s);
                const overhang = cs.getPropertyValue("--dock-rail-overhang").trim();
                const overhangMinor = cs
                    .getPropertyValue("--dock-rail-overhang-minor")
                    .trim();
                const golden = cs.getPropertyValue("--dock-rail-golden").trim();
                const hairline = cs.getPropertyValue("--dock-rail-hairline").trim();
                return {
                    idx: i,
                    orientation: s.getAttribute("data-orientation"),
                    modeAttr: s.getAttribute("data-mode"),
                    cls: s.className,
                    overhang,
                    overhangMinor,
                    golden,
                    hairline,
                    stackBox: round(s.getBoundingClientRect()),
                    dockBox: dock ? round(dock.getBoundingClientRect()) : null,
                    hasFrame: !!frame,
                };
            });
        });

        // For each stack: expand it (pointerenter + wait past intent + spring settle),
        // measure fanned, record getAnimations, screenshot, then collapse.
        const perStack = [];
        for (let i = 0; i < rest.length; i++) {
            const sel = `.dock-stack[data-probe-idx="${i}"]`;
            const el = await page.$(sel);
            if (!el) {
                perStack.push({ idx: i, error: "not-found" });
                continue;
            }
            // dispatch pointerenter (hover-intent path)
            await page.evaluate((s) => {
                const node = document.querySelector(s);
                if (!node) return;
                node.dispatchEvent(
                    new PointerEvent("pointerenter", { bubbles: false }),
                );
            }, sel);
            await page.waitForTimeout(650); // 60ms intent + spring settle

            const fanned = await page.evaluate((s) => {
                const round = (r) => ({
                    x: +r.x.toFixed(1),
                    y: +r.y.toFixed(1),
                    w: +r.width.toFixed(1),
                    h: +r.height.toFixed(1),
                    l: +r.left.toFixed(1),
                    t: +r.top.toFixed(1),
                    rr: +r.right.toFixed(1),
                    b: +r.bottom.toFixed(1),
                });
                const node = document.querySelector(s);
                const frame = node.closest(".glass-dock-frame");
                const dock = frame
                    ? frame.querySelector(".glass-dock")
                    : node.closest(".glass-dock");
                const isExpanded = node.classList.contains("is-expanded");
                const members = Array.from(node.querySelectorAll(".dock-stack-member"));
                // union bbox of all members (the fanned strip extent)
                let ml = Infinity,
                    mt = Infinity,
                    mr = -Infinity,
                    mb = -Infinity;
                for (const m of members) {
                    const r = m.getBoundingClientRect();
                    ml = Math.min(ml, r.left);
                    mt = Math.min(mt, r.top);
                    mr = Math.max(mr, r.right);
                    mb = Math.max(mb, r.bottom);
                }
                const memberUnion =
                    members.length && isFinite(ml)
                        ? {
                              l: +ml.toFixed(1),
                              t: +mt.toFixed(1),
                              rr: +mr.toFixed(1),
                              b: +mb.toFixed(1),
                          }
                        : null;
                // getAnimations() channels across the stack subtree
                let anims = [];
                try {
                    const subtree = [node, ...node.querySelectorAll("*")];
                    for (const n of subtree) {
                        for (const a of n.getAnimations
                            ? n.getAnimations()
                            : []) {
                            let props = [];
                            try {
                                if (a.effect && a.effect.getKeyframes) {
                                    const kf = a.effect.getKeyframes();
                                    const keys = new Set();
                                    for (const k of kf)
                                        for (const p of Object.keys(k))
                                            if (
                                                ![
                                                    "offset",
                                                    "computedOffset",
                                                    "easing",
                                                    "composite",
                                                ].includes(p)
                                            )
                                                keys.add(p);
                                    props = [...keys];
                                }
                            } catch (e) {}
                            anims.push({
                                type: a.constructor.name,
                                timeline: a.timeline
                                    ? a.timeline.constructor.name
                                    : null,
                                props,
                            });
                        }
                    }
                } catch (e) {
                    anims = [{ error: String(e) }];
                }
                return {
                    isExpanded,
                    memberCount: members.length,
                    memberSizes: members.map((m) => {
                        const r = m.getBoundingClientRect();
                        return {
                            w: +r.width.toFixed(1),
                            h: +r.height.toFixed(1),
                        };
                    }),
                    memberUnion,
                    stackBox: round(node.getBoundingClientRect()),
                    dockBox: dock ? round(dock.getBoundingClientRect()) : null,
                    anims,
                };
            }, sel);

            // screenshot the fanned state (only for the first two stacks to limit files)
            const shot = `${OUT}/rail-chrome-${slug}-${mode}-fanned-s${i}.png`;
            await page.screenshot({ path: shot, fullPage: false });

            // collapse
            await page.evaluate((s) => {
                const node = document.querySelector(s);
                if (node)
                    node.dispatchEvent(
                        new PointerEvent("pointerleave", { bubbles: false }),
                    );
            }, sel);
            await page.waitForTimeout(400);

            perStack.push({ idx: i, fanned, shot });
        }

        const rec = { route, slug, mode, rest, perStack };
        all.push(rec);
        console.log(
            JSON.stringify({
                route,
                mode,
                stacks: rest.length,
                summary: perStack.map((p) => ({
                    idx: p.idx,
                    exp: p.fanned?.isExpanded,
                    members: p.fanned?.memberCount,
                })),
            }),
        );
        await ctx.close();
    }
}
await browser.close();
import { writeFileSync } from "node:fs";
writeFileSync(
    `${OUT}/interaction-probe.json`,
    JSON.stringify(all, null, 2),
);
console.log("WROTE interaction-probe.json");
