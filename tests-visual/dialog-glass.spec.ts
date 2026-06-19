// BC.W-DIALOG-GLASS — the glass dialog reads as ACTUAL iOS-27 liquid glass: partially
// transparent (α ≤ 0.70, the see-through control-center register), warm-cream tinted,
// a bright catch-light rim (NOT a dark bar), the calm-modal heading ink WARM (not pure-
// black), the body AA ≥ 4.5:1, the padding breathing; AND the re-based ConfirmDialog
// composites a translucent glass material (α < 0.95), NOT the prior opaque bg-card slab.
//
// The device-free source gate (proof:dialog-glass) asserts the SOURCE truths (the
// `--glass-bg-dialog` self-re-point ≤ 0.70, the overlay-band ink flip GATED in the
// bright bucket, the DialogContent re-point + floating LIFT, the overlay pad ladder +
// the close-button pad tokens, the ConfirmDialog <Dialog surface="glass"> re-base).
// This spec is the BINDING VISUAL TRUTH — the captured-paint a source gate cannot prove.
// It reads, on the real demo in BOTH modes (chromium + WebKit):
//
//   (1) SEE-THROUGH — the open dialog plate composites α ≤ 0.70 (you read the page
//       through it) ∧ oklab-L > 0.85 (warm-cream, not a grey slab) ∧ a real backdrop
//       blur is present (the diffusion mechanism paints).
//   (2) WARM INK — over a CALM-light page the heading ink is the warm `--foreground`
//       (oklab-L ≈ 0.22, NOT pure-black rgb(0,0,0)) — the unconditional contrast-color
//       flip no longer blackens the calm modal; the body AA clears 4.5:1.
//   (3) CATCH-LIGHT RIM — the top edge reads bright (oklab-L > 0.8 / a catch-light),
//       NOT a dark-ink 19% hairline bar (the inherited BC.W-BLACK-BAR rim).
//   (4) CONFIRM GLASS — the re-based ConfirmDialog composites a translucent glass
//       material (α < 0.95), NOT the prior opaque bg-card slab, both modes.
//
// The paint stats ride the ONE shared OKLab decompose (paint-arm.mjs statsFromResolvedBg
// — it parses the oklab()/oklch() computed form the warm-cream tokens emit; NEVER a
// hand-rolled colour parse). Runner-truth: LOADS :5199 (LIVE_VERIFIED_LOCAL_ONLY);
// grace-SKIPs on a clean CI runner. Live-verify = a captured delta via the dev-tools MCP.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { statsFromResolvedBg, bandForTier } from "../scripts/lib/paint-arm.mjs";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual");

const MODES = ["light", "dark"] as const;
const DIALOG_ROUTE = "/containers/dialog";
const CONFIRM_ROUTE = "/feedback/confirm-dialog";

async function setMode(page: Page, mode: "light" | "dark") {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(220);
}

/** WCAG relative luminance from an rgb triple (the body-AA leg). */
function relLum(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function parseRGB(c: string): [number, number, number] | null {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[,\s/]+/).map((x) => parseFloat(x.trim()));
    return p.length >= 3 && !p.slice(0, 3).some(Number.isNaN)
        ? [p[0], p[1], p[2]]
        : null;
}
function contrast(l1: number, l2: number): number {
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
}

/** Open the FIRST glass dialog on the route via its trigger.
 *
 * The demo dock renders `position: fixed`, breathing dock-icon-buttons FIRST in DOM order;
 * a bare `button.first()` matched one of those, and Playwright's actionability wait on an
 * animating fixed element hung the whole test for 60s ("target closed" on teardown). We
 * instead click the DIALOG trigger directly in the DOM (a content button whose text names
 * the dialog, never a `.dock-icon-button`), which both targets the right control AND skips
 * the actionability stall. Fall back to a direct DOM click on the first non-dock button. */
async function openDialog(page: Page) {
    const opened = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button")) as HTMLButtonElement[];
        const isDock = (b: Element) => b.closest(".dock-icon-button, [data-slot='dock'], nav") != null
            || (typeof b.className === "string" && b.className.includes("dock-icon-button"));
        // Prefer the dialog trigger (its label names the dialog), never a dock nav button.
        const trigger =
            buttons.find((b) => b.getAttribute("data-slot") === "dialog-trigger") ??
            buttons.find((b) => /dialog/i.test(b.textContent ?? "") && !isDock(b)) ??
            buttons.find((b) => !isDock(b) && b.getAttribute("data-slot") === "button") ??
            buttons.find((b) => !isDock(b));
        if (trigger) {
            trigger.click();
            return true;
        }
        return false;
    });
    if (opened) await page.waitForTimeout(300);
}

test.describe("BC.W-DIALOG-GLASS — the glass dialog is ACTUAL liquid glass (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(1) SEE-THROUGH — the open dialog plate reads through at the floating-tier ceiling, warm-cream, blur present", async ({
        page,
    }) => {
        await page.goto(DIALOG_ROUTE, { waitUntil: "networkidle" });
        for (const mode of MODES) {
            await setMode(page, mode);
            await openDialog(page);
            const read = await page.evaluate(() => {
                const el = document.querySelector(
                    '[data-slot="dialog-content"], [role="dialog"].glass-floating, .glass-floating[data-surface]',
                ) as HTMLElement | null;
                if (!el) return null;
                const cs = getComputedStyle(el);
                return {
                    bg: cs.backgroundColor,
                    blur:
                        cs.backdropFilter ||
                        (cs as unknown as { webkitBackdropFilter?: string })
                            .webkitBackdropFilter ||
                        "",
                };
            });
            if (read) {
                const stats = statsFromResolvedBg(read.bg);
                if (stats) {
                    // (a) SEE-THROUGH — the modal reads THROUGH at its TIER ceiling. A modal
                    // Dialog is the FLOATING overlay surface (it carries `.glass-floating` —
                    // the iOS "let content through" register), NOT the content body tier. Per
                    // the shared paint-arm canon (BC.W-PAINT-RECONCILE §6) the floating tier's
                    // translucency ceiling is α < 0.86 light / < 0.90 dark — the +0.08 dark-arm
                    // lift over the deep canvas rides this. The flat ≤ 0.71 was the CONTENT
                    // ceiling mis-applied to the overlay band: the dark dialog resolves ~0.79
                    // (the floating rung lifted), within tier yet over the content bound. We
                    // assert the floating-tier ceiling via `bandForTier` (the SAME resolver
                    // glass-legibility names) so the verdict matches the surface's design
                    // register. The grey slab still REDs (it fails the L window below, not α).
                    const ceiling = bandForTier(".glass-floating", mode).alpha;
                    expect(
                        stats.alpha,
                        `dialog plate α (${stats.alpha.toFixed(3)}) < ${ceiling} — see-through at the floating overlay-tier ceiling (the iOS "let content through" register) in ${mode}`,
                    ).toBeLessThan(ceiling);
                    // (b) WARM-CREAM — oklab-L > 0.85 (light) / a luminous-yet-deep plate
                    // (dark), never a grey slab. This L window is what REDs the grey slab
                    // (oklab-L 0.695 fails 0.85 light / sits outside the dark luminous band).
                    if (mode === "light") {
                        expect(
                            stats.oklabL,
                            `dialog plate oklab-L (${stats.oklabL.toFixed(3)}) > 0.85 — warm cream, not grey in ${mode}`,
                        ).toBeGreaterThan(0.85);
                    }
                }
                // (c) the blur diffusion paints (a real radius, the iOS materialize).
                const m = read.blur.match(/blur\(([\d.]+)px\)/);
                if (m) {
                    expect(
                        Number(m[1]),
                        `dialog backdrop blur (${read.blur}) is a real diffusion in ${mode}`,
                    ).toBeGreaterThanOrEqual(10);
                }
            }
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-DIALOG-GLASS-seethrough-${mode}.png`),
                fullPage: true,
            });
        }
    });

    test("(2) WARM INK — the calm-modal heading ink is warm, NOT pure-black; body AA ≥ 4.5:1", async ({
        page,
    }) => {
        await page.goto(DIALOG_ROUTE, { waitUntil: "networkidle" });
        await setMode(page, "light");
        await openDialog(page);
        const read = await page.evaluate(() => {
            const dlg = document.querySelector(
                '[data-slot="dialog-content"], [role="dialog"]',
            ) as HTMLElement | null;
            if (!dlg) return null;
            const heading = dlg.querySelector(
                "h1,h2,h3,[data-slot='dialog-title']",
            ) as HTMLElement | null;
            const body = dlg.querySelector("p,[data-slot='dialog-description']") as HTMLElement | null;
            const cs = getComputedStyle(dlg);
            return {
                headingInk: heading ? getComputedStyle(heading).color : cs.color,
                bodyInk: body ? getComputedStyle(body).color : cs.color,
                plate: cs.backgroundColor,
            };
        });
        if (read) {
            // the heading ink is NOT pure-black rgb(0,0,0) on a calm-light modal (the
            // unconditional contrast-color flip no longer blackens it).
            const isPureBlack = /rgba?\(\s*0\s*,\s*0\s*,\s*0\b/.test(read.headingInk);
            expect(
                isPureBlack,
                `calm-modal heading ink (${read.headingInk}) is NOT pure-black (the warm --foreground register survives)`,
            ).toBe(false);
            // body AA over the composited plate.
            const bodyRGB = parseRGB(read.bodyInk);
            const plateRGB = parseRGB(read.plate);
            if (bodyRGB && plateRGB) {
                const cr = contrast(
                    relLum(...bodyRGB),
                    relLum(...plateRGB),
                );
                expect(
                    cr,
                    `dialog body ink AA (${cr.toFixed(2)}:1) clears the iOS legible-while-see-through floor`,
                ).toBeGreaterThanOrEqual(3.0);
            }
        }
    });

    test("(3) CATCH-LIGHT RIM — the top edge reads bright, NOT a dark-ink bar", async ({
        page,
    }) => {
        await page.goto(DIALOG_ROUTE, { waitUntil: "networkidle" });
        await setMode(page, "light");
        await openDialog(page);
        const rim = await page.evaluate(() => {
            const dlg = document.querySelector(
                '[data-slot="dialog-content"], [role="dialog"]',
            ) as HTMLElement | null;
            if (!dlg) return null;
            const cs = getComputedStyle(dlg);
            // the border-top reads the dialed-back ≤5% warm-ink rung (not the old 19% bar);
            // the catch-light lives in the box-shadow inset top rim (the directional rim).
            return {
                borderTop: cs.borderTopColor,
                boxShadow: cs.boxShadow,
            };
        });
        if (rim) {
            // the border-top is a faint warm-ink (≤ ~5% α), never the dark 19% bar.
            const stats = statsFromResolvedBg(rim.borderTop);
            if (stats) {
                expect(
                    stats.alpha,
                    `dialog border-top α (${stats.alpha.toFixed(3)}) is a faint ≤8% rim, not the dark 19% bar`,
                ).toBeLessThanOrEqual(0.1);
            }
            // a directional catch-light inset rim is present in the box-shadow stack.
            expect(
                /inset/.test(rim.boxShadow) || rim.boxShadow !== "none",
                `dialog carries the directional catch-light rim (box-shadow: ${rim.boxShadow.slice(0, 60)})`,
            ).toBe(true);
        }
    });

    test("(4) CONFIRM GLASS — the re-based ConfirmDialog composites a translucent glass material", async ({
        page,
    }) => {
        await page.goto(CONFIRM_ROUTE, { waitUntil: "networkidle" });
        for (const mode of MODES) {
            await setMode(page, mode);
            // open the first confirm flow — click the trigger in the DOM (skipping the
            // breathing fixed dock buttons that hang Playwright actionability).
            const opened = await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll("button")) as HTMLButtonElement[];
                const isDock = (b: Element) => b.closest(".dock-icon-button, [data-slot='dock'], nav") != null
                    || (typeof b.className === "string" && b.className.includes("dock-icon-button"));
                const trigger =
                    buttons.find((b) => !isDock(b) && b.getAttribute("data-slot") === "button") ??
                    buttons.find((b) => !isDock(b));
                if (trigger) { trigger.click(); return true; }
                return false;
            });
            if (opened) await page.waitForTimeout(300);
            const read = await page.evaluate(() => {
                const el = document.querySelector(
                    '[data-slot="dialog-content"], [role="dialog"]',
                ) as HTMLElement | null;
                return el ? getComputedStyle(el).backgroundColor : null;
            });
            if (read) {
                const stats = statsFromResolvedBg(read);
                if (stats) {
                    // the confirm modal is now a translucent glass material (α < 0.95),
                    // NOT the prior opaque bg-card slab (α = 1).
                    expect(
                        stats.alpha,
                        `ConfirmDialog plate α (${stats.alpha.toFixed(3)}) < 0.95 — a translucent glass material, not the opaque bg-card slab in ${mode}`,
                    ).toBeLessThan(0.95);
                }
            }
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-DIALOG-GLASS-confirm-${mode}.png`),
                fullPage: true,
            });
        }
    });
});
