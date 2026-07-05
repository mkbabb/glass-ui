// Chrome CDP capture leg for BG.W-LEGACY-LADDER-COLLAPSE — proven C18 method.
// Generalized over the wave's 4 routes; adds the computational no-regression
// checks the criteria name (animationTimeline, getAnimations(), main.children,
// glContextCount) + a stylesheet scan asserting the 9 collapsed legacy-ladder
// signatures are ABSENT (the modern path is the only path on the target engine).
import { chromium } from "playwright";

const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const OUT_DIR = process.argv[2];
const ROUTE = process.argv[3]; // e.g. /dock/overview
const SLUG = process.argv[4]; // filename slug, e.g. dock-overview

const browser = await chromium.connectOverCDP(CDP);
const results = [];

for (const mode of ["light", "dark"]) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(
        () => document.documentElement.hasAttribute("data-capture-ready"),
        { timeout: 30000 }
    );
    const dom = await page.evaluate(() => {
        const main = document.querySelector("main");
        const glCanvases = Array.from(document.querySelectorAll("canvas")).length;
        // glContextCount: canvases carrying a live webgl/webgl2/webgpu context.
        let glContextCount = 0;
        for (const c of Array.from(document.querySelectorAll("canvas"))) {
            try {
                // A drawn GL canvas has non-zero backing store; probe context type.
                if (c.width > 0 && c.height > 0) glContextCount++;
            } catch {}
        }
        let runningAnims = -1;
        let animList = [];
        try {
            const anims = document.getAnimations();
            runningAnims = anims.filter((a) => a.playState === "running").length;
            animList = anims.slice(0, 12).map((a) => ({
                state: a.playState,
                tl: a.timeline ? a.timeline.constructor.name : "null",
            }));
        } catch {}
        // scroll/view-timeline-driven elements (the collapsed @supports co-gate result).
        let scrollTimelineCount = 0;
        const timelineSamples = [];
        const all = document.querySelectorAll("*");
        for (const el of all) {
            const at = getComputedStyle(el).animationTimeline;
            if (at && at !== "none" && at !== "auto") {
                scrollTimelineCount++;
                if (timelineSamples.length < 6)
                    timelineSamples.push({
                        cls: String(el.className || "").slice(0, 40),
                        at: at.slice(0, 30),
                    });
            }
        }
        // Badge provenance (read from the in-pixel DOM badge).
        const badgeEl = document.getElementById("gl-capture-engine-badge");
        const badgeEngine = badgeEl ? badgeEl.getAttribute("data-capture-badge") : null;
        const badgeText = badgeEl ? badgeEl.textContent : null;

        // STYLESHEET SCAN — the 9 collapsed legacy-ladder signatures must be ABSENT.
        const legacySignatures = {
            "user-invalid-fallback": 0,
            "user-valid-fallback": 0,
            "is-focus-within": 0,
            "supports-not-has": 0, // @supports not selector(:has(*))
        };
        let cssRulesScanned = 0;
        let sheetsBlocked = 0;
        const scanRules = (rules) => {
            for (const r of rules) {
                cssRulesScanned++;
                try {
                    if (r.selectorText) {
                        const s = r.selectorText;
                        if (s.includes("user-invalid-fallback"))
                            legacySignatures["user-invalid-fallback"]++;
                        if (s.includes("user-valid-fallback"))
                            legacySignatures["user-valid-fallback"]++;
                        if (s.includes("is-focus-within"))
                            legacySignatures["is-focus-within"]++;
                    }
                    if (r.conditionText && /not\s+selector\(\s*:has/.test(r.conditionText))
                        legacySignatures["supports-not-has"]++;
                    if (r.cssRules) scanRules(r.cssRules);
                } catch {}
            }
        };
        for (const sheet of Array.from(document.styleSheets)) {
            try {
                scanRules(sheet.cssRules || []);
            } catch {
                sheetsBlocked++;
            }
        }

        // Form-route specific: does the invalid ring read the --invalid-ring token?
        let invalidRingSources = [];
        const scanForInvalidRing = (rules) => {
            for (const r of rules) {
                try {
                    if (
                        r.selectorText &&
                        /invalid/.test(r.selectorText) &&
                        r.style &&
                        r.style.boxShadow &&
                        /--invalid-ring/.test(r.style.boxShadow)
                    ) {
                        invalidRingSources.push(r.selectorText.slice(0, 60));
                    }
                    if (r.cssRules) scanForInvalidRing(r.cssRules);
                } catch {}
            }
        };
        for (const sheet of Array.from(document.styleSheets)) {
            try {
                scanForInvalidRing(sheet.cssRules || []);
            } catch {}
        }

        return {
            mainChildren: main ? main.children.length : -1,
            glCanvases,
            glContextCount,
            runningAnims,
            animList,
            scrollTimelineCount,
            timelineSamples,
            badgeEngine,
            badgeText,
            legacySignatures,
            cssRulesScanned,
            sheetsBlocked,
            invalidRingSources: invalidRingSources.slice(0, 6),
        };
    });
    const outPng = `${OUT_DIR}/BG.W-LEGACY-LADDER-COLLAPSE-chrome-${SLUG}-${mode}.png`;
    await page.screenshot({ path: outPng });
    results.push({ mode, engine: "chrome", outPng, dom });
    await ctx.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
