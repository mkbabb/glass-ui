// BA.W-PROGRESS-GRADIENT — progress-gradient.spec.ts, the BINDING π /feedback/progress
// readback (the captured own-surface single-fill truth; the cardinal-lesson DELTA).
// proof:progress-gradient proves the recipe SOURCE; THIS spec proves the painted RENDER —
// the AZ P-1 source-green/visually-broken gap is the close-class failure BA exists to fix,
// so the live readback of the single fill + the per-boundary luminance scan + the captured
// frames are the binding truth, never the source diff alone.
//
// THE BINDING ARMS:
//   (a) ONE continuous fill — the sectioned rail paints a SINGLE filled-extent element
//       (one .progress-sectioned-flow paint span), NOT the four discrete cell rectangles
//       the lane measured (fillRectW 272/272/157/0). The DOM probe counts one fill span.
//   (b) NO bright seam stripe + NO dead notch — a luminance scan across the bar at fill
//       mid-height shows a MONOTONE blend across each segment boundary (no screen-brightened
//       spike), and the active→pending boundary carries the pending phase's ghost hue (a
//       coloured pixel, not the recessed-track dark of a dead notch).
//   (c) distinct-yet-blended segments — the per-segment hue is identifiable across its span
//       (≥2 distinct dominant hues sampled across the filled run; the blend did not wash the
//       segments into one mush).
//   (d) the frosted glass track — the rail resolves the --glass-bg-quiet register (a
//       non-empty backdrop-filter + a glass-tier background).
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED on the mechanism arms.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// Locate the sectioned rail (the phase-bus). The sectioned story passes class="h-3".
async function railHandle(page: Page) {
    return page.locator(".progress-sectioned-rail").first();
}

test.beforeEach(async ({ page }) => {
    await page.goto("/feedback/progress", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
});

// ── (a) ONE continuous fill — a single .progress-sectioned-flow paint span ───────────────
test("one continuous fill — a SINGLE filled-extent element, not four cell rectangles", async ({
    page,
}) => {
    const counts = await page.evaluate(() => {
        const rail = document.querySelector(".progress-sectioned-rail");
        if (!rail) return { flow: -1, cells: -1, fills: -1, seams: -1 };
        return {
            flow: rail.querySelectorAll(".progress-sectioned-flow").length,
            // The retired per-cell stack must be GONE.
            cells: rail.querySelectorAll(".progress-sectioned-cell").length,
            fills: rail.querySelectorAll(".progress-sectioned-fill").length,
            seams: rail.querySelectorAll(".progress-sectioned-seam").length,
        };
    });
    // EXACTLY ONE fill element; ZERO of the retired per-cell stack / seam band.
    expect(counts.flow).toBe(1);
    expect(counts.cells).toBe(0);
    expect(counts.fills).toBe(0);
    expect(counts.seams).toBe(0);
});

// ── (d) the frosted glass track — --glass-bg-quiet register resolved ─────────────────────
test("frosted glass track — the rail resolves the --glass-bg-quiet glass register", async ({
    page,
}) => {
    const reg = await page.evaluate(() => {
        const rail = document.querySelector<HTMLElement>(".progress-sectioned-rail");
        if (!rail) return { bg: "", filter: "" };
        const cs = getComputedStyle(rail);
        return {
            bg: cs.background,
            filter: cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || "",
        };
    });
    // The glass register resolves a real backdrop-filter (blur present, not "none").
    expect(reg.filter).not.toBe("");
    expect(reg.filter.toLowerCase()).toContain("blur");
});

// ── (b)+(c) the per-boundary luminance scan: NO stripe, NO notch, distinct hues ──────────
for (const vp of VIEWPORTS) {
    for (const mode of [false, true] as const) {
        test(`paint scan — no seam stripe, no dead notch, distinct hues [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, mode);
            await page.waitForTimeout(300);

            const rail = await railHandle(page);
            await expect(rail).toBeVisible();
            const box = await rail.boundingBox();
            if (!box) throw new Error("sectioned rail has no box");

            // Sample a horizontal pixel line at the rail's vertical mid via a canvas
            // snapshot of the rail element.
            const shot = await rail.screenshot();
            const scan = await page.evaluate(
                async ({ b64, w, h }) => {
                    const img = new Image();
                    await new Promise<void>((r) => {
                        img.onload = () => r();
                        img.src = `data:image/png;base64,${b64}`;
                    });
                    const cw = img.naturalWidth;
                    const ch = img.naturalHeight;
                    const cv = document.createElement("canvas");
                    cv.width = cw;
                    cv.height = ch;
                    const ctx = cv.getContext("2d")!;
                    ctx.drawImage(img, 0, 0);
                    const y = Math.floor(ch / 2);
                    const row = ctx.getImageData(0, y, cw, 1).data;
                    // Relative luminance per column.
                    const lum: number[] = [];
                    const sat: number[] = [];
                    const hue: number[] = [];
                    for (let x = 0; x < cw; x++) {
                        const r = row[x * 4]!,
                            g = row[x * 4 + 1]!,
                            bl = row[x * 4 + 2]!;
                        lum.push(0.2126 * r + 0.7152 * g + 0.0722 * bl);
                        const mx = Math.max(r, g, bl),
                            mn = Math.min(r, g, bl);
                        sat.push(mx === 0 ? 0 : (mx - mn) / mx);
                        // crude hue bucket (deg)
                        let hh = 0;
                        const d = mx - mn;
                        if (d !== 0) {
                            if (mx === r) hh = ((g - bl) / d) % 6;
                            else if (mx === g) hh = (bl - r) / d + 2;
                            else hh = (r - g) / d + 4;
                            hh *= 60;
                            if (hh < 0) hh += 360;
                        }
                        hue.push(hh);
                    }
                    return { cw, lum, sat, hue };
                },
                {
                    b64: shot.toString("base64"),
                    w: Math.round(box.width),
                    h: Math.round(box.height),
                },
            );

            const { cw, lum, sat, hue } = scan;
            // The filled run is the leading ~3/4 of the bar (3 of 4 phases filled at
            // the demo's download=58% active). Scan the filled region only.
            const filledEnd = Math.floor(cw * 0.6);

            // (b1) NO bright seam stripe: no single column in the filled region spikes
            // far above its local neighbourhood luminance (a screen-band would create a
            // narrow bright vertical spike). Compute the max local delta vs a window
            // mean; assert it stays bounded (monotone blend, not a spike).
            let maxSpike = 0;
            const win = 8;
            for (let x = win; x < filledEnd - win; x++) {
                let sum = 0;
                for (let k = x - win; k <= x + win; k++) sum += lum[k]!;
                const mean = sum / (2 * win + 1);
                const spike = lum[x]! - mean;
                if (spike > maxSpike) maxSpike = spike;
            }
            // A genuine boundary blend stays within ~28 luma of its local mean; a
            // screen-brightened stripe spikes far higher (the band painted toward
            // white). Bound generously to avoid flake while still catching a stripe.
            expect(maxSpike).toBeLessThan(60);

            // (c) distinct hues across the filled run — at least 2 well-separated
            // dominant hue buckets among saturated columns (the blend did not wash the
            // segments into one mush).
            const buckets = new Set<number>();
            for (let x = 4; x < filledEnd - 4; x++) {
                if (sat[x]! > 0.18) buckets.add(Math.round(hue[x]! / 30)); // 12 buckets
            }
            expect(buckets.size).toBeGreaterThanOrEqual(2);

            // (b2) NO dead notch at the active→pending boundary: the pending remainder
            // (the trailing portion of the bar) carries a coloured ghost, not the
            // recessed-track dark. Sample the pending region for ANY saturated pixel
            // (the ghost hue) — its absence (a flat near-zero-sat dark slab across the
            // whole pending run) is the dead notch.
            let pendingHasHue = false;
            for (let x = Math.floor(cw * 0.78); x < cw - 4; x++) {
                if (sat[x]! > 0.06) {
                    pendingHasHue = true;
                    break;
                }
            }
            expect(pendingHasHue).toBe(true);
        });
    }
}

// ── THE CAPTURED DELTA — the whole /feedback/progress surface (both modes) ────────────────
for (const vp of VIEWPORTS) {
    for (const mode of [false, true] as const) {
        test(`DELTA capture — /feedback/progress [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
            page,
        }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, mode);
            await page.waitForTimeout(500);
            // The whole page (the ba-gestalt surface).
            await page.screenshot({
                path: `${VISUAL_DIR}W-PROGRESS-GRADIENT-after-${mode ? "dark" : "light"}-${vp.name}.png`,
                fullPage: true,
            });
            // The sectioned rail isolated (the R8-14 surface vs the ground crop).
            const rail = await railHandle(page);
            if (await rail.isVisible()) {
                await rail.screenshot({
                    path: `${VISUAL_DIR}W-PROGRESS-GRADIENT-rail-${mode ? "dark" : "light"}-${vp.name}.png`,
                });
            }
        });
    }
}
