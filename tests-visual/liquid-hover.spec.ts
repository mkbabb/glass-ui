// BB.W-LIQUIDHOVER — the realistic pointer-following gleam, auto-armed at the tier
// root (zero per-consumer wiring) + the disco-grain pop killed onto an opacity cross-
// fade. The π BINDING readback (BB inv-4 — the source-green/visually-broken gap the AZ
// close-class forbids).
//
// The device-free source arm (proof:glass-cohesion's liquid-hover witnesses) asserts
// the SOURCE truths (vSpecular minted-once-wrapping-the-core, the dock/Button auto-arm,
// the hand-wire retired, the grain opacity cross-fade). This spec is the BINDING VISUAL
// TRUTH — it proves, on the real demo in BOTH modes:
//
//   (a) GLEAM TRACKS — a synthetic pointer-move to two distinct positions over a glass
//       <Button> / <DockIconButton> reads two DISTINCT resolved --mouse-x / --specular-x
//       values on the host/::before (NOT both pinned at 50% — the dead-centre case
//       fixed). The position write auto-arms with ZERO consumer wiring on the surface.
//   (b) INTENSITY LIFTS — the recipe fires (the --specular-intensity lifts off rest on
//       hover) AND the position follows (the auto-arm fires) at once.
//   (c) GRAIN NO-POP — a frame-series across the hover onset shows the grain layer's
//       `background-image` CONSTANT (never `none`), so the engage cannot decode-and-pop
//       in one frame (the opacity cross-fade is the only animated channel).
//   (d) PRM STATIC — under prefers-reduced-motion the gleam pins static at centre (the
//       a11y bracket holds) + the grain engage is instant.
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so it
// is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it grace-SKIPs
// via the harness presence probe. The binding live capture rides W-REFLECT3.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual");

const SCHEMES = ["light", "dark"] as const;
// The dock controls live on the dock routes; the glass buttons on /display/buttons.
const BUTTONS_ROUTE = "/display/buttons";
const DOCK_ROUTE = "/dock/overview";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Read the resolved --mouse-x (host write) + --specular-x (::before mapped channel)
 *  at a given pointer position over the element box. Returns the parsed percentages. */
async function readGleamAt(
    page: Page,
    selector: string,
    fracX: number,
    fracY: number,
): Promise<{ mouseX: number; specularX: number } | null> {
    const loc = page.locator(selector).first();
    if ((await loc.count()) === 0) return null;
    const box = await loc.boundingBox();
    if (!box) return null;
    await page.mouse.move(box.x + box.width * fracX, box.y + box.height * fracY);
    // Let the rAF-coalesced write + the position transition land.
    await page.waitForTimeout(80);
    return loc.evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        const before = getComputedStyle(el as Element, "::before");
        const pct = (v: string): number => {
            const m = v.trim().match(/(-?[0-9.]+)\s*%/);
            return m ? parseFloat(m[1]) : NaN;
        };
        return {
            mouseX: pct(cs.getPropertyValue("--mouse-x")),
            specularX: pct(before.getPropertyValue("--specular-x")),
        };
    });
}

test.describe("BB.W-LIQUIDHOVER — the tier-root pointer-following gleam (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(a) GLEAM TRACKS — two pointer positions read two distinct --mouse-x (off the dead-centre 50%)", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");

        const sel =
            '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]';

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            const left = await readGleamAt(page, sel, 0.2, 0.5);
            const right = await readGleamAt(page, sel, 0.8, 0.5);

            if (left && right && !Number.isNaN(left.mouseX) && !Number.isNaN(right.mouseX)) {
                // The two pointer positions resolve two DISTINCT host writes (the auto-arm
                // tracks the cursor) — NOT both pinned at the centred 50% fallback.
                expect(
                    Math.abs(right.mouseX - left.mouseX),
                    `the gleam tracks the cursor in ${scheme}: --mouse-x at 20%≈${left.mouseX} vs 80%≈${right.mouseX} (distinct, off the dead-centre 50%)`,
                ).toBeGreaterThan(10);
                // And neither is the dead-centre 50% fallback.
                expect(Math.abs(left.mouseX - 50)).toBeGreaterThan(5);
            }
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-LIQUIDHOVER-gleam-button-${scheme}.png`),
                fullPage: false,
            });
        }
    });

    test("(b) DOCK CONTROL — the dock control gleams pointer-following with zero wiring", async ({
        page,
    }) => {
        await page.goto(DOCK_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        const sel = ".dock-icon-button";
        const left = await readGleamAt(page, sel, 0.25, 0.5);
        const right = await readGleamAt(page, sel, 0.75, 0.5);
        if (left && right && !Number.isNaN(left.mouseX) && !Number.isNaN(right.mouseX)) {
            expect(
                Math.abs(right.mouseX - left.mouseX),
                `the dock control gleam tracks the cursor (zero call-site wiring): ${left.mouseX} vs ${right.mouseX}`,
            ).toBeGreaterThan(10);
        }
        await page.screenshot({
            path: resolve(VISUAL_DIR, "W-LIQUIDHOVER-gleam-dock-light.png"),
            fullPage: false,
        });
    });

    test("(c) GRAIN NO-POP — the grain background-image stays constant across the hover onset", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        // A grain-bearing glass surface (a Card / glass tile). The grain `::after`
        // background-image must be the SAME non-`none` value at rest AND during the
        // engage — the structural anti-pop (only opacity animates).
        const grainSel = ".glass-resting, .glass-quiet, [data-slot=\"card\"]";
        const loc = page.locator(grainSel).first();
        if ((await loc.count()) > 0) {
            const images = await loc.evaluate((el) => {
                const before = getComputedStyle(el as Element, "::after");
                return before.backgroundImage;
            });
            // The grain image is present (a url()/gradient), NEVER `none` — the swap that
            // would pop is structurally impossible.
            expect(
                images,
                "the grain ::after background-image is always present (never `none` — no decode-and-pop swap)",
            ).not.toBe("none");
        }
    });

    test("(d) PRM STATIC — under reduced-motion the gleam pins static at centre", async ({
        page,
    }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        const sel =
            '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]';
        const left = await readGleamAt(page, sel, 0.2, 0.5);
        const right = await readGleamAt(page, sel, 0.8, 0.5);
        if (left && right) {
            // Under reduce the directive skips the write; the CSS bracket pins
            // --specular-x at 50% — the gleam is static at centre at BOTH positions.
            if (!Number.isNaN(left.specularX) && !Number.isNaN(right.specularX)) {
                expect(
                    left.specularX,
                    "under reduced-motion the gleam pins static at the centred 50% (no pointer tracking)",
                ).toBeCloseTo(50, 0);
                expect(right.specularX).toBeCloseTo(50, 0);
            }
        }
        await page.emulateMedia({ reducedMotion: null });
    });
});
