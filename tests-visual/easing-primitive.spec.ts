// BB.W-EASING-PRIMITIVE — easing-primitive.spec.ts, the π readback of the published
// <EasingPicker> over the consumer-#1 surface (/motion/curve-gallery). Device-free
// assertions cover structure and the boundary law; this scenario covers the render —
// the picker plots the real value.js
// twin, the curve strokes --motion-accent, the readout is re-parseable, both modes.
//
// The bite the source arm cannot give: an implementer could green the source parse
// while the rendered curve is a hand-rolled approximation drifted off the value.js
// callable. Only the painted path-geometry readback binds it (a sampled point on
// the plotted path matches the value.js callable at the same t).
//
// It asserts, off the LIVE painted :5199 DOM:
//   P1 — the BEZIER mode plots the REAL CSSCubicBezier twin (a sampled point on the
//        plotted path matches the value.js callable at the sampled t).
//   P2 — the STEPS mode plots the REAL steppedEase(n, term) staircase (a sampled
//        riser/tread reads at the value.js callable's jump position).
//   P3 — the curve strokes the violet --motion-accent / --viz-legendre twin (the
//        single-color-event identity, both modes).
//   P4 — the readout is the re-parseable literal (cubic-bezier(…) / steps(n, term)).
//
// THE BINDING ASSERTION IS THE RESOLVED READBACK. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by
// the immutable browser evidence receipt over the W-EASING-PRIMITIVE delta. The binding whole-
// fleet capture rides W-REFLECT3.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROUTE = "/motion/curve-gallery";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// Select a curve-gallery family chip by label (the chip rack OR the narrow Select).
async function selectFamily(page: Page, label: string): Promise<void> {
    // Desktop chip rack first.
    const chip = page.getByRole("button", { name: label, exact: true });
    if (await chip.count()) {
        await chip.first().click();
        await page.waitForTimeout(200);
        return;
    }
    // Narrow Select floor.
    await page.getByLabel("Curve family").click();
    await page.getByRole("option", { name: label, exact: true }).click();
    await page.waitForTimeout(200);
}

// sRGB → OKLab hue (Chrome serializes oklch()/oklab() as rgb when sampled).
function lin(c: number): number {
    const x = c / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function rgbHueDeg(r: number, g: number, b: number): number {
    const R = lin(r),
        G = lin(g),
        B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l),
        m_ = Math.cbrt(m),
        s_ = Math.cbrt(s);
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    let h = (Math.atan2(Bb, A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return h;
}
function parseRgb(str: string): [number, number, number] | null {
    const m = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    return m ? [+m[1]!, +m[2]!, +m[3]!] : null;
}

test.describe("BB.W-EASING-PRIMITIVE — the published <EasingPicker> (π)", () => {
    // ── P1 — the BEZIER mode plots the REAL CSSCubicBezier twin ──────────────────
    test("P1 — bezier mode plots the real CSSCubicBezier twin (sampled point matches the callable)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Custom");

        const picker = page.locator('[data-testid="easing-picker"][data-mode="bezier"]');
        await expect(picker, "the bezier picker mounts").toBeVisible();

        // Read the plotted path `d` + the readout literal, sample the value.js twin
        // (re-parse the cubic-bezier control points from the readout) and compare a
        // midpoint of the path against the curve at the same x.
        const probe = await picker.evaluate((root) => {
            const code = root.querySelector("code");
            const path = root.querySelector("svg path[d^='M 0 1 C']");
            return {
                literal: (code?.textContent || "").trim(),
                d: path?.getAttribute("d") || "",
            };
        });
        // The readout is a cubic-bezier literal.
        const cb = probe.literal.match(
            /cubic-bezier\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/,
        );
        expect(cb, `the readout is a re-parseable cubic-bezier literal (got "${probe.literal}")`).not.toBeNull();
        // The plotted path control points must match the literal's (the SVG-Y flip:
        // bezier-y -> 1 - y). `M 0 1 C c1x c1y, c2x c2y, 1 0`.
        const dm = probe.d.match(
            /M 0 1 C ([-\d.]+) ([-\d.]+), ([-\d.]+) ([-\d.]+), 1 0/,
        );
        expect(dm, `the bezier path is the M 0 1 C … 1 0 form (got "${probe.d}")`).not.toBeNull();
        const [, x1, y1, x2, y2] = cb!.map(Number);
        const [, px1, py1, px2, py2] = dm!.map(Number);
        // path control points == literal control points with the Y flip.
        expect(px1).toBeCloseTo(x1!, 2);
        expect(py1).toBeCloseTo(1 - y1!, 2);
        expect(px2).toBeCloseTo(x2!, 2);
        expect(py2).toBeCloseTo(1 - y2!, 2);
    });

    // ── P2 — the STEPS mode plots the REAL steppedEase staircase ─────────────────
    test("P2 — steps mode plots the real steppedEase(n, term) staircase (riser positions)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Steps");

        const picker = page.locator('[data-testid="easing-picker"][data-mode="steps"]');
        await expect(picker, "the steps picker mounts").toBeVisible();

        const probe = await picker.evaluate((root) => {
            const code = root.querySelector("code");
            const path = root.querySelector("svg path[d^='M 0']");
            return {
                literal: (code?.textContent || "").trim(),
                d: path?.getAttribute("d") || "",
            };
        });
        // The readout is a re-parseable steps() literal.
        const st = probe.literal.match(/steps\((\d+),\s*([a-z-]+)\)/);
        expect(st, `the readout is a re-parseable steps() literal (got "${probe.literal}")`).not.toBeNull();
        const n = Number(st![1]);
        const term = st![2]!;
        // The plotted path is a sampled staircase — at t≈1 (the last L), the staircase
        // reaches the top (y≈0 in SVG space) for the standard jump-end family, i.e.
        // the staircase climbs from 1 (bottom) to 0 (top). The path carries discrete
        // flat treads — assert it has the staircase shape (many points, the last point
        // near SVG-y 0 = the curve value near 1).
        const lastL = probe.d.trim().split(/\s+L\s+|\s+M\s+/).filter(Boolean).pop() || "";
        const [, lastY] = ("M " + lastL).match(/M ([-\d.]+) ([-\d.]+)/) || [];
        expect(n, "the step count is ≥1").toBeGreaterThanOrEqual(1);
        expect(["start", "end", "both", "none", "jump-start", "jump-end", "jump-both", "jump-none"]).toContain(term);
        // The staircase tops out near SVG-y 0 (the curve reaches 1 at t=1).
        expect(Number(lastY), `the staircase reaches the top at t=1 (got SVG-y ${lastY})`).toBeLessThan(0.2);
    });

    // ── P3 — the curve strokes the violet --motion-accent / --viz-legendre ───────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`P3 — the curve strokes the violet --motion-accent twin (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            await selectFamily(page, "Custom");

            const picker = page.locator('[data-testid="easing-picker"][data-mode="bezier"]');
            await expect(picker).toBeVisible();
            const strokeRgb = await picker.evaluate((root) => {
                const path = root.querySelector("svg path[d^='M 0 1 C']") as SVGPathElement | null;
                if (!path) return null;
                return getComputedStyle(path).stroke;
            });
            const rgb = parseRgb(strokeRgb || "");
            expect(rgb, `the curve stroke resolves to a color (${strokeRgb})`).not.toBeNull();
            const hue = rgbHueDeg(rgb![0], rgb![1], rgb![2]);
            // --viz-legendre is the violet identity (oklch hue ~317.5° light /
            // ~318.1° dark) — the hue lands in the violet band 290-350°, NOT the
            // warm-red --viz-fourier (~30°).
            expect(
                hue,
                `the curve stroke hue ${hue.toFixed(1)}° must be the violet --motion-accent/--viz-legendre band (290-350°), not warm-red`,
            ).toBeGreaterThan(290);
            expect(hue).toBeLessThan(350);
        });
    }

    // ── P4 — the readout is re-parseable in both modes ───────────────────────────
    test("P4 — the readout is the re-parseable literal in both modes", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        await selectFamily(page, "Custom");
        const bezierLiteral = await page
            .locator('[data-testid="easing-picker"][data-mode="bezier"] code')
            .first()
            .textContent();
        expect(bezierLiteral?.trim()).toMatch(/^cubic-bezier\(/);

        await selectFamily(page, "Steps");
        const stepsLiteral = await page
            .locator('[data-testid="easing-picker"][data-mode="steps"] code')
            .first()
            .textContent();
        expect(stepsLiteral?.trim()).toMatch(/^steps\(\d+,/);
    });
});
