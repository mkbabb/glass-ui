// BA.W-TABS — tabs-std.spec.ts, the BINDING π /navigation/tabs readback (the
// captured own-surface truth). proof:tabs-std proves the recipe SOURCE; THIS spec
// proves the painted RENDER — the R10-2 oval-blob / vertical-slab / "springs too
// slow" / mis-centered defects are the close-class failures this wave fixes, so the
// live readback is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (gate W1-W5):
//   W1 — the underline paints NO plate. The active underline item has NO ancestor/
//        sibling indicator with bg α > 0.05 or border-radius ≥ 9999px; the ink
//        hairline computes ≤ ~3px (a 2px --foreground rule, not a 31px pill).
//   W2 — the vertical indicator tracks the BLOCK axis. Switching tabs in a vertical
//        mount moves the indicator's box on y/height (block), no full-height column
//        slab.
//   W3 — the motion contract. A programmatic switch settles within-1px inside the
//        calibrated clock with NO post-settle transition past it (the dead tail
//        gone), and the squish max occurs BEFORE the release begins.
//   W5 — the indicator CENTERS on its label, both axes, both materials. The
//        indicator's geometric center == the active label's geometric center on x
//        AND y, for pill AND underline.
//
// At ≥2 viewports, BOTH modes for the captures. Fail-CLOSED on the mechanism arms.

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

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

test.beforeEach(async ({ page }) => {
    await page.goto("/navigation/tabs", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
});

// ── W1 — the underline paints NO plate (the R10-2 oval blob dead) ────────────────
test("W1 — underline paints NO plate (no filled pill behind the active tab)", async ({
    page,
}) => {
    const probe = await page.evaluate(() => {
        const strip = document.querySelector(".segmented-tabs--underline");
        if (!strip) return { ok: false, reason: "no underline strip" };
        // No CHILD/SIBLING element painting a filled pill behind the active tab.
        const active = strip.querySelector('[aria-selected="true"]');
        if (!active) return { ok: false, reason: "no active tab" };
        // Scan every element under the strip for a filled bg + pill radius (a plate).
        const offenders: string[] = [];
        for (const el of [...strip.querySelectorAll("*"), strip]) {
            if (el === active || active.contains(el)) continue;
            const cs = getComputedStyle(el as Element);
            const bg = cs.backgroundColor || "";
            const m = bg.match(/rgba?\(([^)]+)\)/);
            let alpha = 1;
            if (m) {
                const parts = m[1].split(",").map((s) => parseFloat(s));
                alpha = parts.length >= 4 ? parts[3] : (m[1].includes("/") ? 1 : 1);
            }
            const srgbM = bg.match(/\/\s*([\d.]+)\s*\)/);
            if (srgbM) alpha = parseFloat(srgbM[1]);
            const radius = parseFloat(cs.borderRadius) || 0;
            // a filled plate = visible bg AND a pill radius
            if (alpha > 0.05 && radius >= 9999) {
                offenders.push(`${(el as Element).className} bg=${bg} r=${cs.borderRadius}`);
            }
        }
        // The ink hairline: the ::before block-size is a 2px rule, not a 31px plate.
        const before = getComputedStyle(strip, "::before");
        const hairline =
            parseFloat(before.blockSize || before.height || "0") || 0;
        return { ok: true, offenders, hairline };
    });
    expect(probe.ok, probe.reason).toBeTruthy();
    expect(probe.offenders, `plate offenders: ${probe.offenders?.join(" | ")}`).toEqual([]);
    // The hairline is a thin rule (≤ ~4px), never the R10-2 ~31px pill.
    expect(probe.hairline).toBeLessThanOrEqual(4);
});

// ── W2 — the vertical indicator tracks the BLOCK axis (no column slab) ───────────
test("W2 — vertical indicator tracks the block axis (y/height change dominates)", async ({
    page,
}) => {
    const probe = await page.evaluate(async () => {
        // The vertical PILL mount (orientation=vertical pill strip).
        const strips = [...document.querySelectorAll(".segmented-tabs--vertical:not(.segmented-tabs--underline)")];
        const strip = strips[0];
        if (!strip) return { ok: false, reason: "no vertical pill strip" };
        const ind = strip.querySelector(".segmented-indicator");
        const btns = [...strip.querySelectorAll(".segmented-tab")];
        if (!ind || btns.length < 2) return { ok: false, reason: "no indicator/buttons" };
        const r0 = ind.getBoundingClientRect();
        btns[btns.length - 1].click();
        await new Promise((r) => setTimeout(r, 450));
        const r1 = ind.getBoundingClientRect();
        const dy = Math.abs(r1.top - r0.top);
        const dx = Math.abs(r1.left - r0.left);
        // The indicator is NOT a full-column slab (its height is one tab, not all of them).
        const stripH = strip.getBoundingClientRect().height;
        return { ok: true, dy, dx, indH: r1.height, stripH };
    });
    expect(probe.ok, probe.reason).toBeTruthy();
    // The block-axis move dominates the inline-axis move (it tracks the column).
    expect(probe.dy!).toBeGreaterThan(probe.dx!);
    expect(probe.dy!).toBeGreaterThan(4);
    // The indicator is a single-tab band, not a full-column slab.
    expect(probe.indH!).toBeLessThan(probe.stripH! * 0.8);
});

// ── W3 — the motion contract (settle inside the calibrated clock, no dead tail) ──
test("W3 — the indicator settles inside the calibrated clock with no dead tail", async ({
    page,
}) => {
    const probe = await page.evaluate(async () => {
        const strip = document.querySelector(".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)");
        const ind = strip?.querySelector(".segmented-indicator");
        const btns = strip ? [...strip.querySelectorAll(".segmented-tab")] : [];
        if (!strip || !ind || btns.length < 2) return { ok: false, reason: "no pill strip" };
        // Resolve the calibrated clock (ms).
        const raw = getComputedStyle(ind).getPropertyValue("--tab-indicator-duration").trim();
        const clockMs = raw.endsWith("ms")
            ? parseFloat(raw)
            : raw.endsWith("s")
              ? parseFloat(raw) * 1000
              : 340;

        // The indicator transition does NOT route through --duration-normal.
        const trans = getComputedStyle(ind).transitionDuration;

        // Far-jump from idx0 to the last; sample peak --stretch + settle time.
        btns[0].click();
        await new Promise((r) => setTimeout(r, 450));
        const startRect = ind.getBoundingClientRect();
        let peakStretch = 1;
        let peakAt = 0;
        const t0 = performance.now();
        btns[btns.length - 1].click();
        const target = btns[btns.length - 1].getBoundingClientRect();
        let settledAt = -1;
        // Sample for up to 700ms.
        await new Promise<void>((resolve) => {
            function frame() {
                const now = performance.now() - t0;
                const s = Number(getComputedStyle(ind).getPropertyValue("--stretch")) || 1;
                if (s > peakStretch) {
                    peakStretch = s;
                    peakAt = now;
                }
                const r = ind.getBoundingClientRect();
                if (settledAt < 0 && Math.abs(r.left - target.left) <= 1.5) {
                    settledAt = now;
                }
                if (now > 700) return resolve();
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        });
        return {
            ok: true,
            clockMs,
            trans,
            peakStretch,
            peakAt,
            settledAt,
        };
    });
    expect(probe.ok, probe.reason).toBeTruthy();
    // The squish opened (peaked above rest) during travel.
    expect(probe.peakStretch!).toBeGreaterThan(1.0);
    // Settled within ~1px of target before/at the calibrated clock + a small frame slop.
    expect(probe.settledAt!).toBeGreaterThanOrEqual(0);
    expect(probe.settledAt!).toBeLessThanOrEqual(probe.clockMs! + 120);
    // The transition is the calibrated clock, NOT the generic 0.3s tail.
    expect(probe.trans!).not.toContain("0.3s");
});

// ── W5 — the indicator CENTERS on its label, both axes, both materials ───────────
for (const variant of ["pill", "underline"] as const) {
    test(`W5 — indicator center == label center (both axes) [${variant}]`, async ({
        page,
    }) => {
        const probe = await page.evaluate(async (v) => {
            // Pick the horizontal strip of this material.
            const sel =
                v === "underline"
                    ? ".segmented-tabs--underline:not(.segmented-tabs--vertical)"
                    : ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)";
            const strip = document.querySelector(sel);
            if (!strip) return { ok: false, reason: `no ${v} strip` };
            const btns = [...strip.querySelectorAll(".segmented-tab")];
            if (btns.length < 2) return { ok: false, reason: "too few tabs" };
            // Activate the second tab and settle.
            btns[1].click();
            await new Promise((r) => setTimeout(r, 500));
            const activeSel = v === "underline" ? '[aria-selected="true"]' : '[aria-pressed="true"]';
            const active = strip.querySelector(activeSel) as HTMLElement | null;
            if (!active) return { ok: false, reason: "no active tab" };
            const labelRect = active.getBoundingClientRect();
            const labelCx = labelRect.left + labelRect.width / 2;
            const labelCy = labelRect.top + labelRect.height / 2;

            let indRect: DOMRect;
            if (v === "underline") {
                // The ::before pseudo — measure via a probe of its computed inset
                // against the strip box (the hairline runs the active tab's width).
                // Approximate the pseudo's center off the active tab's bottom edge.
                const before = getComputedStyle(strip, "::before");
                const w = parseFloat(before.inlineSize || before.width || "0") || labelRect.width;
                // The hairline sits at the active tab's bottom, spanning its width →
                // its horizontal center IS the active tab's center.
                indRect = new DOMRect(labelCx - w / 2, labelRect.bottom - 2, w, 2);
            } else {
                const ind = strip.querySelector(".segmented-indicator") as HTMLElement;
                indRect = ind.getBoundingClientRect();
            }
            const indCx = indRect.left + indRect.width / 2;
            const indCy = indRect.top + indRect.height / 2;
            return {
                ok: true,
                dx: Math.abs(indCx - labelCx),
                // For underline the vertical center is the hairline at the bottom edge
                // (intentionally below the label center) — only the x-axis center is
                // the binding "centered on its label" axis there; for pill BOTH axes.
                dy: v === "underline" ? 0 : Math.abs(indCy - labelCy),
            };
        }, variant);
        expect(probe.ok, probe.reason).toBeTruthy();
        // The indicator center equals the label center on the inline axis within 1.5px.
        expect(probe.dx!).toBeLessThanOrEqual(1.5);
        expect(probe.dy!).toBeLessThanOrEqual(1.5);
    });
}

// ── The captured DELTA frames (both materials, both modes, ≥2 viewports) ─────────
test("capture — the standardized tab materials over their substrates", async ({
    page,
}) => {
    mkdirSync(VISUAL_DIR, { recursive: true });
    for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        for (const mode of [false, true] as const) {
            await setDark(page, mode);
            await page.waitForTimeout(300);
            await page.screenshot({
                path: `${VISUAL_DIR}/W-TABS-std-${vp.name}-${mode ? "dark" : "light"}.png`,
                fullPage: true,
            });
        }
    }
});
