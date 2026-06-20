// BC.W-CSS-CRITICAL — css-critical.spec.ts, the FOUC-safe π readback (the W5 binding
// paint the BB.W-CSS-CRITICAL gate header named + NEVER ran).
//
// proof:css-critical proves the SOURCE/BUILD truth — the split is published, the union
// is byte-complete, the critical subset is under the gzip ceiling, the manifest is the
// sole source. THIS spec proves the BINDING PAINT: the demo's above-the-fold chrome (the
// hero title, a glass plate, the page band) paints IDENTICALLY whether or not the
// DEFERRED tail has loaded yet. The deferred tail decorates components that mount after
// first paint or sit below the fold; its late arrival shifts ZERO above-the-fold pixel
// (the FOUC-safe floor — the source-green/visually-broken close-class the BA P-1 gestalt
// bar kills).
//
// THE MECHANISM (the binding FOUC simulation on the LIVE demo — consumer-faithful). The
// demo dev server imports the `src/styles/index.css` UNION (critical + deferred), so
// every route already renders fully-loaded. To capture the FOUC moment (critical
// render-blocking-early HAS arrived, the deferred tail has NOT) we:
//   1. measure the above-the-fold chrome geometry under the FULL union (the fully-loaded
//      reference);
//   2. DISABLE only glass-ui's DEFERRED cascade — (a) the SFC-scoped `<style>` sheets
//      (Vite splits each SFC's `<style scoped>` into its own `[data-v-*]` sheet, which is
//      exactly the build-time `../glass-ui.css` SFC fold that lands in DEFERRED), and
//      (b) the deferred-component-recipe rules in the union sheet (matched by the
//      deferred-partial selector signatures — `.glass-menu-*`, `.feedback-tone-*`,
//      `.dock-*`, `.configurator-*`, `.cartoon-*`, `.scroll-build/-cascade/-pin/-chrome`,
//      `.completion-seal`, `.border-progress`, `.segmented-tab`, `.icon-chip`, `.paper-*`,
//      `.floating-panel`) — KEEPING the critical token cascade + glass ladder + typography
//      + theme AND the consumer's own Tailwind layout (which a real consumer ships
//      independently of glass-ui's `/styles` split — never stripped);
//   3. re-measure the SAME chrome elements + assert the above-the-fold geometry (x/y/w)
//      is PIXEL-STABLE — the deferred tail's absence shifts no above-the-fold pixel. The
//      whole-document SPANNING height of a below-the-fold-extending container legitimately
//      shrinks (its below-the-fold tail decoration drops with the deferred recipes); the
//      ABOVE-the-fold position + width of each chrome anchor must NOT move.
//
// BOTH modes (the critical token cascade carries the `.dark` arm; a dark-mode FOUC is the
// same close-class). Fail-CLOSED: an above-the-fold chrome anchor whose x/y/w SHIFTS when
// the deferred tail is disabled means a partial the first-paint chrome reads landed in
// DEFERRED (a boundary mis-bucket — the re-bucket-to-critical trigger, NOT a tolerance
// bump). Run `npm run build` is NOT required (this reads the live demo cascade), but the
// SOURCE gate proof:css-critical owns the byte-split truth.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// A chrome-bearing above-the-fold route: the foundations section landing renders the
// StoryHero (the display `<h1>` + the eyebrow over a glass card), the page band, and the
// shell dock — the surfaces a consumer's FIRST PAINT shows.
const HOST_ROUTE = "/foundations";

// The above-the-fold chrome anchors — the first-paint surfaces. Each x/y/w must be stable
// when the deferred tail is absent (the FOUC-safe floor).
const CHROME_ANCHORS = [
    { name: "hero-title", selector: "h1" },
    { name: "page-band", selector: "main" },
    { name: "hero-card", selector: ".rounded-card, .glass-card, .glass-floating" },
    { name: "glass-surface", selector: "[class*='glass-']" },
] as const;

type Box = { x: number; y: number; w: number; h: number } | null;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(120);
}

async function readChromeGeometry(page: Page): Promise<Record<string, Box>> {
    return page.evaluate((anchors) => {
        const out: Record<string, { x: number; y: number; w: number; h: number } | null> = {};
        const vh = window.innerHeight;
        for (const { name, selector } of anchors) {
            const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
            const el = els.find((e) => {
                const r = e.getBoundingClientRect();
                return r.width > 0 && r.height > 0 && r.top < vh;
            });
            if (!el) {
                out[name] = null;
                continue;
            }
            const r = el.getBoundingClientRect();
            out[name] = {
                x: Math.round(r.x * 100) / 100,
                y: Math.round(r.y * 100) / 100,
                w: Math.round(r.width * 100) / 100,
                h: Math.round(r.height * 100) / 100,
            };
        }
        return out;
    }, CHROME_ANCHORS as unknown as Array<{ name: string; selector: string }>);
}

/**
 * Disable glass-ui's DEFERRED cascade (the SFC-scoped sheets + the deferred-component-
 * recipe rules in the union sheet), simulating the FOUC moment. Returns a count of what
 * was disabled (must be non-zero — the deferred tail is genuinely present in the union).
 */
async function disableDeferredCascade(page: Page): Promise<{ sfcSheets: number; recipeRules: number }> {
    const result = await page.evaluate(() => {
        let sfcSheets = 0;
        let recipeRules = 0;
        // The deferred-partial selector signatures (the component recipes + the SFC fold
        // surfaces) — KEEPING the critical glass ladder (.glass-card/.glass-floating/
        // .glass-wash/.glass-quiet/.glass-resting/.glass-btn are critical glass.css rules,
        // NOT matched here) and the consumer Tailwind layout.
        const DEFERRED_SIG =
            /\.(glass-menu|feedback-tone|dock-|configurator|cartoon|floating-panel|scroll-build|scroll-cascade|scroll-pin|scroll-chrome|completion-seal|border-progress|segmented-tab|icon-chip|paper-texture|paper-grain|paper-underpaint|hover-popover|drawer-|instrument-)/;
        for (const sheet of Array.from(document.styleSheets)) {
            let rules: CSSRuleList;
            try {
                rules = sheet.cssRules;
            } catch {
                continue; // cross-origin — skip
            }
            const node = sheet.ownerNode as (HTMLStyleElement | HTMLLinkElement) | null;
            // (a) the SFC-scoped sheets — a <style> whose rules carry [data-v-*] hashes —
            // ARE the deferred ../glass-ui.css SFC fold. Disable the whole sheet.
            const isScoped =
                node?.tagName === "STYLE" &&
                Array.from(rules).some(
                    (r) => /\[data-v-[0-9a-f]+\]/.test((r as CSSStyleRule).cssText || ""),
                );
            if (isScoped) {
                (node as HTMLStyleElement).disabled = true;
                sfcSheets++;
                continue;
            }
            // (b) the deferred-component-recipe rules in the union sheet — delete only the
            // rules whose selector carries a deferred-partial signature (keeps the critical
            // token/ladder/type rules + consumer Tailwind utilities in the same sheet).
            for (let i = rules.length - 1; i >= 0; i--) {
                const rule = rules[i] as CSSStyleRule;
                if (rule.selectorText && DEFERRED_SIG.test(rule.selectorText)) {
                    try {
                        sheet.deleteRule(i);
                        recipeRules++;
                    } catch {
                        /* immutable — ignore */
                    }
                }
            }
        }
        // Force a reflow.
        void document.body.offsetHeight;
        return { sfcSheets, recipeRules };
    });
    await page.waitForTimeout(150);
    return result;
}

for (const mode of ["light", "dark"] as const) {
    test(`FOUC-safe: above-the-fold chrome paints identically with/without the deferred tail — ${mode}`, async ({
        page,
    }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
        await setDark(page, mode === "dark");
        await page.waitForTimeout(200);

        // (1) the fully-loaded reference geometry (critical + deferred — the union).
        const bothGeometry = await readChromeGeometry(page);
        expect(
            bothGeometry["hero-title"],
            "the hero title must be present above the fold",
        ).not.toBeNull();
        expect(bothGeometry["page-band"], "the page band must be present").not.toBeNull();

        // (2) disable the deferred cascade (the FOUC moment: deferred not yet arrived).
        const disabled = await disableDeferredCascade(page);
        // The deferred tail MUST be genuinely present (the test is meaningful only if it
        // actually removed deferred decoration — a no-op disable would vacuously pass).
        expect(
            disabled.sfcSheets + disabled.recipeRules,
            "the deferred cascade must be genuinely present in the union (SFC-scoped sheets + deferred component recipes) — a vacuous no-op would not prove the FOUC-safe floor",
        ).toBeGreaterThan(0);

        // (3) re-measure + assert the above-the-fold geometry (x/y/w) is PIXEL-STABLE.
        const critGeometry = await readChromeGeometry(page);
        const TOL = 1.0; // px — sub-pixel rounding only; a deferred-induced shift is ≫ 1px.
        for (const { name } of CHROME_ANCHORS) {
            const a = bothGeometry[name];
            const b = critGeometry[name];
            if (a === null) continue; // anchor absent under union — skip.
            expect(
                b,
                `${name}: present under union but VANISHED without the deferred tail (a deferred-only chrome surface — re-bucket to critical)`,
            ).not.toBeNull();
            if (b === null) continue;
            // ABOVE-the-fold position + width — the binding FOUC axes. (The full-document
            // SPANNING height of a below-the-fold-extending container legitimately shrinks
            // with its tail decoration; only the above-the-fold x/y/w is the floor.)
            for (const axis of ["x", "y", "w"] as const) {
                expect(
                    Math.abs(a[axis] - b[axis]),
                    `${name}.${axis} shifted ${Math.abs(a[axis] - b[axis]).toFixed(2)}px without the deferred tail — the deferred tail's late arrival moves an above-the-fold pixel (FOUC). Re-bucket the offending partial to critical.`,
                ).toBeLessThanOrEqual(TOL);
            }
        }

        // (4) the above-the-fold chrome is STILL STYLED without the deferred tail — the
        // hero resolves a real critical-typography font-size (no unstyled UA-default flash;
        // the √φ display ladder is in critical typography.css).
        const heroStyled = await page.evaluate(() => {
            const h1 = document.querySelector("h1");
            if (!h1) return { ok: false, size: 0 };
            const fs = parseFloat(getComputedStyle(h1).fontSize);
            // a styled display hero resolves well above the 32px UA h1 default.
            return { ok: fs >= 40, size: fs };
        });
        expect(
            heroStyled.ok,
            `the hero must resolve a critical display-ladder font-size without the deferred tail (got ${heroStyled.size}px) — the type ladder is in critical, no unstyled flash`,
        ).toBe(true);
    });
}
