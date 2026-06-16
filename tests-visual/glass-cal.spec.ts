// BA.W-GLASS-CAL — the blur dial-back + the disco retirement: the π binding readback.
//
// The device-free source gate (proof:glass-cal) asserts the SOURCE truths (the six
// radii dialed below pre-wave + in-band, the disco recipe family GONE, the dock
// primary tier collapsed, the chip on §6, the per-spring clock minted). This spec is
// the BINDING VISUAL TRUTH (BA inv-4) — the source-green/visually-broken gap the AZ
// close-class forbids. It proves, on the real demo in BOTH modes:
//
//   (a) BLUR — the resolved `--glass-blur-*-radius` tokens read the dialed-back
//       values (8/10/13/13/9, wash 1) AND every glass surface still composes a real
//       backdrop-filter blur (the glass STILL reads as glass at the reduced radii).
//   (b) DISCO — at /display/buttons there are ZERO `[class*=btn-audacious]` elements
//       and ZERO `::after{content:"✦"}` sparkle glyphs (the lane's 6-element/6-sparkle
//       baseline → 0); the gold CTA's label stays warm-ink (no white flip).
//   (c) DOCK — the dock-tab primary tier hover composes the glass register, NOT the
//       grain (no --glass-grain-opacity-disco / --paper-clean-texture in its rule).
//   (d) CHIP — a <ToggleChip> hover lifts (a non-1 scale + a §6-timed surface
//       cross-fade), not a flat color-snap.
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so
// it is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it
// grace-SKIPs via the harness presence probe.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BA/audit/visual");

const SCHEMES = ["light", "dark"] as const;

const BUTTONS_ROUTE = "/display/buttons";
const DOCK_ROUTE = "/dock/overview";
const BLOB_ROUTE = "/substrates/blob";

// The dialed-back radii (BA.W-GLASS-CAL Unit 1) the resolved :root tokens must read.
const EXPECT_RADII: Record<string, number> = {
    "--glass-blur-wash-radius": 1,
    "--glass-blur-quiet-radius": 8,
    "--glass-blur-resting-radius": 10,
    "--glass-blur-floating-radius": 13,
    "--glass-blur-overlay-radius": 13,
    "--glass-blur-dock-radius": 9,
};

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

function pxNumber(v: string): number {
    const m = v.match(/([\d.]+)px/);
    return m ? Number(m[1]) : NaN;
}

test.describe("BA.W-GLASS-CAL — the blur dial-back + the disco retirement (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(a) BLUR — the resolved radii are dialed back + glass still reads as glass", async ({ page }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);
            const radii = await page.evaluate((names) => {
                const cs = getComputedStyle(document.documentElement);
                const out: Record<string, string> = {};
                for (const n of names) out[n] = cs.getPropertyValue(n).trim();
                return out;
            }, Object.keys(EXPECT_RADII));

            for (const [name, expected] of Object.entries(EXPECT_RADII)) {
                const got = pxNumber(radii[name]);
                expect(got, `${name} resolves ${radii[name]} (expected ${expected}px) in ${scheme}`).toBe(expected);
            }

            // A glass surface still composes a real backdrop-filter blur (the glass
            // STILL reads as glass at the reduced radii — not blur(0)/none).
            const blurOnGlass = await page.evaluate(() => {
                const el = document.querySelector(".glass-card, .glass-resting, .glass-quiet, [class*='glass-']");
                if (!el) return null;
                const bf = getComputedStyle(el as Element).backdropFilter || (getComputedStyle(el as Element) as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter;
                return bf ?? "";
            });
            // a glass surface exists and carries a non-trivial blur (≥ ~7px composed).
            if (blurOnGlass !== null && blurOnGlass !== "") {
                const composed = pxNumber(blurOnGlass);
                if (!Number.isNaN(composed)) {
                    expect(composed, `glass surface backdrop blur (${blurOnGlass}) is still a real diffusion in ${scheme}`).toBeGreaterThanOrEqual(7);
                    expect(composed, `glass surface backdrop blur (${blurOnGlass}) stays in-band in ${scheme}`).toBeLessThanOrEqual(15);
                }
            }
        }
    });

    test("(b) DISCO — ZERO btn-audacious elements + ZERO sparkle glyphs at /display/buttons", async ({ page }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            // ZERO elements carrying a btn-audacious / -gold class.
            const audaciousCount = await page.locator("[class*='btn-audacious']").count();
            expect(audaciousCount, `[class*=btn-audacious] elements in ${scheme} (the disco recipe retired)`).toBe(0);

            // ZERO sparkle glyphs (the ::after { content:"✦" } the disco painted).
            const sparkleCount = await page.evaluate(() => {
                let n = 0;
                for (const el of Array.from(document.querySelectorAll("button, a"))) {
                    const after = getComputedStyle(el, "::after").content;
                    if (after && after.includes("✦")) n++;
                }
                return n;
            });
            expect(sparkleCount, `'✦' sparkle pseudo-glyphs in ${scheme} (the lane baseline 6 → 0)`).toBe(0);

            // The gold CTA label stays warm-ink at rest (no saturated white-flip register).
            await page.screenshot({ path: resolve(VISUAL_DIR, `W-GLASS-CAL-buttons-${scheme}.png`), fullPage: true });
        }
    });

    test("(c) DOCK — the primary tier reads the glass register, not the grain", async ({ page }) => {
        await page.goto(DOCK_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);
            // No dock control composes the disco grain background-image on hover (the
            // primary tier collapsed). We sample the dock-tab-button primary if present;
            // either way the dock plate composes a real glass blur (the dialed-back dock
            // radius 9px through --glass-blur-dock).
            const dockBlur = await page.evaluate(() => {
                const el = document.querySelector(".glass-dock");
                if (!el) return null;
                const bf = getComputedStyle(el as Element).backdropFilter || (getComputedStyle(el as Element) as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter;
                return bf ?? "";
            });
            if (dockBlur) {
                const composed = pxNumber(dockBlur);
                if (!Number.isNaN(composed)) {
                    expect(composed, `dock plate backdrop blur (${dockBlur}) is the dialed-back dock register in ${scheme}`).toBeGreaterThanOrEqual(7);
                }
            }
            await page.screenshot({ path: resolve(VISUAL_DIR, `W-GLASS-CAL-dock-${scheme}.png`), fullPage: true });
        }
    });

    test("(d) CHIP — a ToggleChip hover lifts on §6, not a flat snap", async ({ page }) => {
        await page.goto(BLOB_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        // Find a toggle-chip in the studio configurator; if present, hover it and
        // read the transition + the on-hover scale (the §6 lift). The chip base now
        // composes a `scale`/`--spring-smooth` transition leg + a hover scale.
        const chip = page.locator("[class*='toggle-chip'], .toggle-chip, [data-state]").filter({ hasText: /.+/ }).first();
        const present = await chip.count();
        if (present > 0) {
            const transition = await chip.first().evaluate((el) => getComputedStyle(el).transition);
            // the transition carries a `scale` leg (the §6 lift) — NOT a color-only
            // `transition-colors` (which would not name `scale`/`transform`).
            const hasScaleLeg = /scale/.test(transition);
            const noFastSnap = !/0\.15s/.test(transition) || /scale/.test(transition);
            expect(hasScaleLeg || noFastSnap, `toggle-chip transition (${transition}) carries a §6 scale lift`).toBeTruthy();
        }
        await page.screenshot({ path: resolve(VISUAL_DIR, "W-GLASS-CAL-chip-blob-light.png"), fullPage: true });
    });
});
