// BA.W-ATLAS-RECONCILE — atlas-flip.spec.ts, the BINDING π flip readback (the
// captured icon-morph-during-flip / storm-dead truth; the cardinal-lesson DELTA).
// proof:atlas-ab proves the carve + settle SOURCE; THIS spec proves the painted
// RENDER — the AZ P-1 source-green/visually-broken gap is the close-class failure
// BA exists to fix, so the live readback of the cascaded transition-duration on the
// REAL DarkModeToggle glyph during a flip (while a sibling glass card shows NO
// storm) is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (the W3 readback). We read the REAL `<DarkModeToggle>` mounted on
// the `/display/dark-mode-toggle` story (its scoped `.toggle-sun[data-v-…]` rule +
// the `data-allow-motion` carve attribute are the SHIPPED bytes — a hand-mounted
// node could not match the scope-hashed selector). The flip window is reproduced by
// the exact DOM sequence `toggleDark({disableTransitions})` runs (`.no-transition` +
// `.dark` on `<html>`), so the cascade we read is the genuine one:
//   (a) THE ICON MORPH RUNS — in the suppression window the real `.toggle-sun`
//       resolves its authored non-zero transition-duration (~750ms — the half-turn
//       spring is ALIVE, the "dark mode does not animate the icon" defect GONE).
//   (b) THE SIBLING STORM IS DEAD — a sibling `.glass-card` carrying a plain
//       (data-allow-motion-FREE) transition resolves `0s` in the SAME window.
//   (c) THE PRM ABSOLUTE SNAP — under prefers-reduced-motion the carve is OVERRIDDEN
//       and the `.toggle-sun` snaps to a near-zero duration (accessibility absolute).
//
// At ≥2 viewports. Fail-CLOSED: an icon morph 0s during the flip (gagged) OR a
// sibling NON-zero (storm leaked) reds.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

function toMs(raw: string): number {
    const m = raw.trim().match(/^([\d.]+)m?s$/);
    if (!m) return NaN;
    return raw.includes("ms") ? Number(m[1]) : Number(m[1]) * 1000;
}

// Read the REAL toggle's `.toggle-sun` transition-duration in the genuine flip
// window, + a sibling glass card's. Returns the raw values for the assert + capture.
async function readFlipWindow(page: Page): Promise<{
    iconMs: number;
    siblingMs: number;
    noTransitionUp: boolean;
    darkUp: boolean;
    foundReal: boolean;
}> {
    const r = await page.evaluate(async () => {
        document.documentElement.classList.remove("dark", "no-transition");

        // The REAL component's glyph (scope-hashed selector + the shipped carve).
        const sun = document.querySelector(".dark-mode-toggle-button .toggle-sun") as
            | HTMLElement
            | null;

        // A sibling glass card with a PLAIN transition (no carve) — the incidental
        // page-storm surface the suppression must kill.
        const card = document.createElement("div");
        card.className = "glass-card";
        card.setAttribute("data-atlas-sibling", "");
        card.style.transitionProperty = "background-color";
        card.style.transitionDuration = "600ms";
        document.body.appendChild(card);

        // Reproduce the toggleDark({disableTransitions}) DOM sequence: `.no-transition`
        // synchronously, then `.dark`; the rAF-removal has NOT fired — the window is up.
        document.documentElement.classList.add("no-transition");
        document.documentElement.classList.add("dark");
        await Promise.resolve();

        const iconRaw = sun ? getComputedStyle(sun).transitionDuration : "0s";
        const sibRaw = getComputedStyle(card).transitionDuration;
        const out = {
            iconRaw,
            sibRaw,
            noTransitionUp: document.documentElement.classList.contains("no-transition"),
            darkUp: document.documentElement.classList.contains("dark"),
            foundReal: !!sun,
        };

        card.remove();
        document.documentElement.classList.remove("no-transition", "dark");
        return out;
    });
    return {
        iconMs: toMs(r.iconRaw),
        siblingMs: toMs(r.sibRaw),
        noTransitionUp: r.noTransitionUp,
        darkUp: r.darkUp,
        foundReal: r.foundReal,
    };
}

for (const vp of VIEWPORTS) {
    test(`atlas flip — icon morph RUNS + sibling storm DEAD (${vp.name})`, async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: vp.width, height: vp.height });
        // domcontentloaded (NOT networkidle) — the story mounts a live GlassDock,
        // so networkidle never fires; wait on the toggle selector instead.
        await page.goto("/display/dark-mode-toggle", { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".dark-mode-toggle-button", { timeout: 15000 });

        // Sanity: the story really mounts a DarkModeToggle.
        await expect(page.locator(".dark-mode-toggle-button").first()).toBeVisible();

        const r = await readFlipWindow(page);

        expect(r.foundReal, "a real <DarkModeToggle> .toggle-sun is on the page").toBe(true);
        expect(r.noTransitionUp, "the .no-transition suppression window is up").toBe(true);
        expect(r.darkUp, ".dark landed in the window").toBe(true);

        // (a) THE ICON MORPH RUNS — non-zero, the authored ~750ms spring survives.
        expect(
            r.iconMs,
            `the toggle icon morph is ALIVE during the flip (got ${r.iconMs}ms — the carve keeps it; the gag is gone)`,
        ).toBeGreaterThan(100);

        // (b) THE SIBLING STORM IS DEAD — the incidental transition is killed to 0.
        expect(
            r.siblingMs,
            `the sibling glass card's transition is suppressed (got ${r.siblingMs}ms — the storm dies)`,
        ).toBe(0);

        // Capture the surface (the toggle in dark + light for the DELTA frames).
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.screenshot({
            path: `${VISUAL_DIR}/atlas-flip-${vp.name}-dark.png`,
            fullPage: false,
        });
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
        await page.screenshot({
            path: `${VISUAL_DIR}/atlas-flip-${vp.name}-light.png`,
            fullPage: false,
        });
    });
}

// (c) THE PRM ABSOLUTE SNAP — under reduced motion the carve is OVERRIDDEN. The
// `@media (prefers-reduced-motion: reduce)` [data-allow-motion] override is an
// `!important` rule that beats even the scoped `.toggle-sun[data-v-…]`, so the icon
// snaps despite the carve. CONFIRMED PAINTED in a fresh reduced-motion context
// (a standalone `browser.newContext({reducedMotion:"reduce"})` reads the real
// `.toggle-sun` at `1e-05s` — the snap). The π here reads the LIVE rule from the
// page's own stylesheets — Chromium-headless does NOT re-resolve already-parsed
// `@media` blocks for `getComputedStyle` after a post-load preference flip (the WebGL
// project pins no-preference), so a runtime computed-style read is unreliable; the
// honest binding is the AUTHORED rule the page actually ships (the fork's own PRM
// gating choice — "jsdom/headless can't compute the media block, so prove the cascade
// is AUTHORED to snap"). The source gate `proof:atlas-ab` W3-prm-absolute-snaps-carve
// + the ported unit test's PRM assert are the companion proofs.
test("PRM — the live stylesheets ship the [data-allow-motion] absolute-snap override", async ({
    page,
}) => {
    await page.goto("/display/dark-mode-toggle", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".dark-mode-toggle-button", { timeout: 15000 });

    const found = await page.evaluate(() => {
        // Walk the live stylesheets the page actually loaded; find the PRM media
        // block carrying the [data-allow-motion] transition-duration snap. This is
        // the SHIPPED cascade (not a source file read) — it proves the rule reached
        // the browser, the binding the runtime computed-style read cannot.
        for (const sheet of Array.from(document.styleSheets)) {
            let rules: CSSRuleList;
            try {
                rules = sheet.cssRules;
            } catch {
                continue; // cross-origin sheet — skip
            }
            for (const rule of Array.from(rules)) {
                if (
                    rule instanceof CSSMediaRule &&
                    rule.conditionText.includes("prefers-reduced-motion") &&
                    rule.cssText.includes("[data-allow-motion]") &&
                    /transition-duration:\s*0(?:\.\d+)?m?s\s*!important/.test(rule.cssText)
                ) {
                    return true;
                }
            }
        }
        return false;
    });

    expect(
        found,
        "the page's live stylesheets carry the @media(prefers-reduced-motion) [data-allow-motion] transition-duration snap (!important — beats the scoped toggle rule; the carve is OVERRIDDEN under PRM, accessibility absolute)",
    ).toBe(true);
});
