// BG.W-DOCK-RAIL-REINVENT — NON-AUTHORING Chrome leg (CDP → real Chrome / Metal GPU).
// Proven C18 method: boots ?capture over BUILT :5200, polls data-capture-ready.
// Per route × mode: captures REST + FANNED screenshots and runs the COMPUTED-DOM
// checks the criteria name — containment (every rest stack pixel inside the dock
// plate bbox), the φ² asymmetric crossing (resolved --dock-rail-overhang :
// --dock-rail-overhang-minor ≈ 2.618 AND the painted fanned-bbox outward:inward),
// box-INVIOLATE (deltaW=deltaH=0 rest→fanned), the hairline token, wrap/visibleCount,
// and (on a non-capture twin page) the compositor-only transition-property set +
// the reactive focus→is-expanded wiring.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9477";
const BASE = "http://localhost:5200";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/rail-reinvent";

// route, slug, viewport (desktop → SidebarDock aside; mobile → BottomDock bar)
const TARGETS = [
    { route: "/dock/rail", slug: "rail-desktop", vp: { width: 1440, height: 900 } },
    { route: "/dock/rail", slug: "rail-mobile", vp: { width: 430, height: 932 } },
    { route: "/dock/liquid-playground", slug: "liquid", vp: { width: 1440, height: 900 } },
];
const MODES = ["light", "dark"];

const browser = await chromium.connectOverCDP(CDP);
const report = [];

// The measurement fn — runs in the page. Returns per-.dock-stack geometry.
const measure = () => {
    const round = (n) => Math.round(n * 100) / 100;
    const stacks = Array.from(document.querySelectorAll(".dock-stack"));
    const out = [];
    for (const stack of stacks) {
        // The owning dock plate box (the box-INVIOLATE subject).
        const frame = stack.closest(".glass-dock-frame");
        const dock = frame ? frame.querySelector(".glass-dock") : null;
        const dockBox = dock ? dock.getBoundingClientRect() : null;
        const cs = getComputedStyle(stack);
        const orient = stack.getAttribute("data-orientation") || "?";
        const mode = stack.getAttribute("data-mode") || "?";
        // resolved rail tokens
        const px = (v) => {
            const n = parseFloat(v);
            return Number.isFinite(n) ? n : null;
        };
        const overhang = px(cs.getPropertyValue("--dock-rail-overhang"));
        const overhangMinor = px(cs.getPropertyValue("--dock-rail-overhang-minor"));
        const golden = px(cs.getPropertyValue("--dock-rail-golden"));
        const hairline = px(cs.getPropertyValue("--dock-rail-hairline"));
        const visible = px(cs.getPropertyValue("--dock-stack-visible"));
        const fanEl = stack.querySelector(".dock-stack-fan");
        const wrapAttr = fanEl ? fanEl.hasAttribute("data-wrap") : false;
        const scrollsAttr = fanEl ? fanEl.hasAttribute("data-scrolls") : false;
        const members = Array.from(stack.querySelectorAll(".dock-stack-member"));
        const isFacets = mode === "facets";

        // REST containment: the VISIBLE (opacity>0.02) rest paint must sit inside the
        // dock plate bbox. At rest members are opacity 0 → only the core + hairline paint.
        const core = stack.querySelector(".dock-stack-core");
        const coreBox = core ? core.getBoundingClientRect() : null;
        let coreInside = null;
        if (coreBox && dockBox) {
            coreInside =
                coreBox.left >= dockBox.left - 0.6 &&
                coreBox.right <= dockBox.right + 0.6 &&
                coreBox.top >= dockBox.top - 0.6 &&
                coreBox.bottom <= dockBox.bottom + 0.6;
        }
        // Any member VISIBLE at rest? (should be none — opacity 0)
        let restVisibleMembers = 0;
        for (const m of members) {
            if (parseFloat(getComputedStyle(m).opacity) > 0.02) restVisibleMembers++;
        }

        out.push({
            orient,
            mode,
            isFacets,
            dockBox: dockBox
                ? { x: round(dockBox.x), y: round(dockBox.y), w: round(dockBox.width), h: round(dockBox.height) }
                : null,
            coreBox: coreBox
                ? { x: round(coreBox.x), y: round(coreBox.y), w: round(coreBox.width), h: round(coreBox.height) }
                : null,
            coreInside,
            restVisibleMembers,
            memberCount: members.length,
            overhang,
            overhangMinor,
            goldenToken: golden,
            overhangRatio: overhang && overhangMinor ? round(overhang / overhangMinor) : null,
            hairline,
            visible,
            wrapAttr,
            scrollsAttr,
        });
    }
    return out;
};

// The fanned measurement — after forcing .is-expanded on all stacks.
const measureFanned = () => {
    const round = (n) => Math.round(n * 100) / 100;
    const stacks = Array.from(document.querySelectorAll(".dock-stack"));
    const out = [];
    for (const stack of stacks) {
        const frame = stack.closest(".glass-dock-frame");
        const dock = frame ? frame.querySelector(".glass-dock") : null;
        const dockBox = dock ? dock.getBoundingClientRect() : null;
        const orient = stack.getAttribute("data-orientation") || "?";
        const members = Array.from(stack.querySelectorAll(".dock-stack-member"));
        // union of VISIBLE fanned member bboxes
        let minL = Infinity, minT = Infinity, maxR = -Infinity, maxB = -Infinity, vis = 0;
        for (const m of members) {
            if (parseFloat(getComputedStyle(m).opacity) < 0.5) continue;
            const b = m.getBoundingClientRect();
            if (b.width < 1 || b.height < 1) continue;
            vis++;
            minL = Math.min(minL, b.left); minT = Math.min(minT, b.top);
            maxR = Math.max(maxR, b.right); maxB = Math.max(maxB, b.bottom);
        }
        // outward:inward relative to the crossed edge.
        let outward = null, inward = null, paintedRatio = null, edge = null;
        if (dockBox && vis > 0) {
            if (orient === "vertical") {
                // rail axis = trailing (inline-end) edge; outward = right of dock.right
                edge = dockBox.right;
                outward = round(maxR - edge);
                inward = round(edge - minL);
            } else {
                // horizontal → crosses TOP edge; outward = above dock.top
                edge = dockBox.top;
                outward = round(edge - minT);
                inward = round(maxB - edge);
            }
            paintedRatio = inward !== 0 ? round(outward / inward) : null;
        }
        out.push({
            orient,
            visibleFanned: vis,
            fanBbox: vis > 0 ? { l: round(minL), t: round(minT), r: round(maxR), b: round(maxB) } : null,
            dockBox: dockBox ? { x: round(dockBox.x), y: round(dockBox.y), w: round(dockBox.width), h: round(dockBox.height) } : null,
            outward, inward, paintedRatio, edge: round(edge),
        });
    }
    return out;
};

for (const { route, slug, vp } of TARGETS) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: vp,
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 30000 },
        );
        await page.waitForTimeout(900);

        const glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (!gl) return "no-webgl";
                const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
            } catch (e) { return "err:" + e.message; }
        });
        const engineBadge = await page.evaluate(() => {
            const b = document.querySelector("[data-engine-badge], .capture-engine-badge");
            return b ? b.textContent.trim().slice(0, 80) : null;
        });

        // REST measurement + screenshot
        const rest = await page.evaluate(measure);
        const restPng = `${OUT}/rail-${slug}-chrome-${mode}-rest.png`;
        await page.screenshot({ path: restPng, fullPage: false });

        // Force FANNED (capture.css kills transitions → jumps to settled fanned frame).
        await page.evaluate(() => {
            for (const s of document.querySelectorAll(".dock-stack")) s.classList.add("is-expanded");
        });
        await page.waitForTimeout(250);
        const fanned = await page.evaluate(measureFanned);
        const fanPng = `${OUT}/rail-${slug}-chrome-${mode}-fanned.png`;
        await page.screenshot({ path: fanPng, fullPage: false });

        report.push({ route, slug, mode, vp, glRenderer, engineBadge, restPng, fanPng, rest, fanned });
        console.log(`[cap] ${slug} ${mode} stacks=${rest.length} fannedStacks=${fanned.length} badge=${engineBadge}`);
        await ctx.close();
    }
}

// ── Compositor-only + reactive-wiring twin (NON-capture page) ────────────────
// Read the live transition-property set (capture.css zeros transitions) + verify
// focus→is-expanded flips reactively.
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/dock/liquid-playground`, { waitUntil: "load", timeout: 30000 }).catch(() => {});
    // hash router? try both — the app uses history mode; navigate then wait.
    await page.goto(`${BASE}/dock/liquid-playground`, { waitUntil: "load", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const wiring = await page.evaluate(async () => {
        const stack = document.querySelector(".dock-stack");
        if (!stack) return { found: false };
        const member = stack.querySelector(".dock-stack-member");
        const mcs = member ? getComputedStyle(member) : null;
        const tp = mcs ? mcs.transitionProperty : "";
        const layoutProps = ["width", "height", "inline-size", "block-size", "inset", "top", "left", "right", "bottom", "padding", "margin"];
        const animatesLayout = layoutProps.filter((p) => tp.includes(p));
        // reactive wiring: focus the core, see if .is-expanded appears
        const core = stack.querySelector(".dock-stack-core");
        const before = stack.classList.contains("is-expanded");
        if (core) core.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const afterFocus = stack.classList.contains("is-expanded");
        // reset + test pointerenter (hysteresis)
        stack.dispatchEvent(new FocusEvent("focusout", { bubbles: true, relatedTarget: document.body }));
        await new Promise((r) => setTimeout(r, 40));
        stack.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
        await new Promise((r) => setTimeout(r, 140));
        const afterHover = stack.classList.contains("is-expanded");
        return { found: true, transitionProperty: tp, animatesLayout, before, afterFocus, afterHover };
    });
    report.push({ wiringProbe: wiring });
    console.log(`[wiring] ${JSON.stringify(wiring)}`);
    await ctx.close();
}

await browser.close();
import { writeFileSync } from "node:fs";
writeFileSync(`${OUT}/chrome-report.json`, JSON.stringify(report, null, 2));
console.log(`\nWROTE ${OUT}/chrome-report.json`);
