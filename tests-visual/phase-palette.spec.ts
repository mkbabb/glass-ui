// BB.W-PHASE-PALETTE — phase-palette.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:phase-palette
// proves the SOURCE structure (the complete arm reads `--phase-complete-color`,
// the token defaults to gold at the chassis root, the WCAG twin pairs 1:1, the
// canon is recorded); THIS spec proves the painted RENDER on the real demo route
// over the global `/styles` cascade — the A1-1/P-1 source-green/visually-broken
// gap is the exact AZ close-class BB exists to fix, so the live render is the
// binding truth, never the source diff alone.
//
// THE BINDING ARMS (the real /data/instrument-chassis demo route, driven
// to phase="complete"; the chassis root carries `data-phase="complete"` so the
// `[data-phase="complete"]` arm + its `--phase-color` cascade resolve):
//
//   (a) UN-OVERRIDING → GOLD BYTE-IDENTICAL — an un-overriding chassis at
//       data-phase="complete" resolves `--phase-color` to the SAME gold the
//       chassis ships by default (the back-compat floor). We read the resolved
//       `--phase-color` AND a control element computed `color: var(--phase-color)`
//       and assert it equals the resolved `--color-gold` token (the gold default
//       reached the bus, byte-identical to HEAD's hardcoded form).
//   (b) OVERRIDING → CONSUMER INK — a chassis under an ancestor that SETS
//       `--phase-complete-color` to a NON-gold ink (a synthetic violet) resolves
//       `--phase-color` to the CONSUMER ink at data-phase="complete", NOT gold
//       (the consumer-chooses-the-ink proof — the bus carried the IDENTITY).
//   (c) WCAG LABEL TWIN TRACKS — under the override, `--phase-color-label`
//       resolves the consumer label ink (a synthetic violet-dark); un-overriding
//       it resolves the gold-dark default (the twin demotes in lockstep).
//   (d) MODE-ROBUST — (a) holds under `.dark` (the `--color-gold` dual arm flips
//       the default with no hardcoded dark re-declaration in the complete arm).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a complete-phase `--phase-color` that
// does NOT match the gold default un-overriding / that does NOT track the consumer
// ink under the override reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual", import.meta.url),
);

const CHASSIS_ROUTE = "/data/instrument-chassis";
const CHASSIS_SEL = ".instrument-chassis";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// A synthetic non-gold consumer ink + its WCAG-dark twin (the violet
// `--viz-legendre` family the ask names — a NON-gold register to prove the
// override reaches the bus). Solid opaque rgb so the readback is unambiguous.
const CONSUMER_INK = "rgb(155, 110, 220)";
const CONSUMER_INK_LABEL = "rgb(95, 60, 150)";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

/** Drive the demo phase state machine to "complete" by clicking its button. */
async function driveComplete(page: Page): Promise<void> {
    const btn = page.getByRole("button", { name: "COMPLETE", exact: true });
    await btn.waitFor({ state: "visible", timeout: 8000 });
    await btn.click();
    // Let the phase-handoff transition settle (the typed --phase-tint-amount
    // transition is 600ms; the --phase-color flips immediately on the class swap).
    await page.waitForTimeout(300);
    await page
        .locator(`${CHASSIS_SEL}[data-phase="complete"]`)
        .first()
        .waitFor({ state: "visible", timeout: 8000 });
}

/**
 * Read the resolved `--phase-color` / `--phase-color-label` customs AND the
 * resolved `--color-gold` / `--color-gold-dark` reference tokens at the
 * complete-phase chassis (via a probe element that computes
 * `color: var(--phase-color)`), so we compare RESOLVED colors (the byte-identical
 * floor is a resolved-color equality, robust to the `var()` indirection).
 */
async function readPhaseColors(page: Page): Promise<{
    phaseColor: string;
    phaseColorLabel: string;
    gold: string;
    goldDark: string;
} | null> {
    const chassis = page.locator(`${CHASSIS_SEL}[data-phase="complete"]`).first();
    if ((await chassis.count()) === 0) return null;
    return chassis.evaluate((el) => {
        const resolve = (prop: string): string => {
            // A throwaway probe child resolves `color: var(<prop>)` to an rgb()
            // computed value (getPropertyValue on a custom returns the raw
            // unresolved `var(--color-gold)` string — we need the RESOLVED color).
            const probe = document.createElement("span");
            probe.style.color = `var(${prop})`;
            probe.style.display = "none";
            el.appendChild(probe);
            const c = getComputedStyle(probe).color;
            probe.remove();
            return c;
        };
        return {
            phaseColor: resolve("--phase-color"),
            phaseColorLabel: resolve("--phase-color-label"),
            gold: resolve("--color-gold"),
            goldDark: resolve("--color-gold-dark"),
        };
    });
}

/** Inject an ancestor host that SETS the consumer completion ink, then re-read. */
async function readUnderOverride(page: Page): Promise<{
    phaseColor: string;
    phaseColorLabel: string;
} | null> {
    return page.evaluate(
        ({ sel, ink, inkLabel }) => {
            const chassis = document.querySelector(
                `${sel}[data-phase="complete"]`,
            ) as HTMLElement | null;
            if (!chassis) return null;
            // Set the consumer tokens on an ANCESTOR — the arm reads them via
            // INHERITANCE (the cascade-win the spec's Dispatch names). We use the
            // chassis's own parent as the override host.
            const host = chassis.parentElement ?? document.documentElement;
            host.style.setProperty("--phase-complete-color", ink);
            host.style.setProperty("--phase-complete-color-label", inkLabel);
            const resolve = (prop: string): string => {
                const probe = document.createElement("span");
                probe.style.color = `var(${prop})`;
                probe.style.display = "none";
                chassis.appendChild(probe);
                const c = getComputedStyle(probe).color;
                probe.remove();
                return c;
            };
            const out = {
                phaseColor: resolve("--phase-color"),
                phaseColorLabel: resolve("--phase-color-label"),
            };
            // Restore so a later read in the same page is clean.
            host.style.removeProperty("--phase-complete-color");
            host.style.removeProperty("--phase-complete-color-label");
            return out;
        },
        { sel: CHASSIS_SEL, ink: CONSUMER_INK, inkLabel: CONSUMER_INK_LABEL },
    );
}

/** Normalize an rgb()/rgba() string to a comparable `r,g,b` triple. */
function rgbTriple(c: string): string {
    const m = c.match(/(\d+)\D+(\d+)\D+(\d+)/);
    return m ? `${m[1]},${m[2]},${m[3]}` : c;
}

test.describe("BB.W-PHASE-PALETTE — the complete-phase consumer-ink seam π readback", () => {
    mkdirSync(VISUAL_DIR, { recursive: true });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";

            test(`un-overriding complete → gold byte-identical — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(CHASSIS_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await driveComplete(page);

                const r = await readPhaseColors(page);
                expect(r, "the complete-phase chassis must render").not.toBeNull();
                if (!r) return;

                // (a) + (d) — `--phase-color` resolves the gold default BYTE-IDENTICAL
                // to `--color-gold` (the back-compat floor, both modes).
                expect(
                    rgbTriple(r.phaseColor),
                    `complete --phase-color must equal --color-gold (${mode})`,
                ).toBe(rgbTriple(r.gold));
                // The WCAG twin un-overriding resolves the gold-dark default.
                expect(
                    rgbTriple(r.phaseColorLabel),
                    `complete --phase-color-label must equal --color-gold-dark (${mode})`,
                ).toBe(rgbTriple(r.goldDark));

                await page.screenshot({
                    path: `${VISUAL_DIR}/phase-palette-default-gold-${vp.name}-${mode}.png`,
                });
            });

            test(`overriding host → consumer ink (not gold) — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(CHASSIS_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await driveComplete(page);

                const gold = (await readPhaseColors(page))?.gold ?? "";
                const ov = await readUnderOverride(page);
                expect(ov, "the override readback must resolve").not.toBeNull();
                if (!ov) return;

                // (b) — the consumer ink reaches the bus: `--phase-color` is the
                // injected violet, NOT gold (the bus carried the IDENTITY).
                expect(
                    rgbTriple(ov.phaseColor),
                    `under the --phase-complete-color override, --phase-color must be the consumer ink (${mode})`,
                ).toBe(rgbTriple(CONSUMER_INK));
                expect(
                    rgbTriple(ov.phaseColor),
                    `the override must NOT paint gold (${mode})`,
                ).not.toBe(rgbTriple(gold));
                // (c) — the WCAG twin tracks the consumer label ink.
                expect(
                    rgbTriple(ov.phaseColorLabel),
                    `the WCAG twin --phase-color-label must track the consumer label ink (${mode})`,
                ).toBe(rgbTriple(CONSUMER_INK_LABEL));

                await page.screenshot({
                    path: `${VISUAL_DIR}/phase-palette-consumer-ink-${vp.name}-${mode}.png`,
                });
            });
        }
    }
});
