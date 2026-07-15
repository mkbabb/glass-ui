// AX.W48 — proof:glass-material-demo π render arm, the live moving-specular +
// biting-tint readback (the INTERACTION gate the demo-route source gate cannot
// prove). Mirrors the constellation-warp-live shape: a REAL device render + a
// pointer-driven position readback, NOT a grep for a source string.
//
// THE DEFECT (D8): `/substrates/glass-material` narrated a "pointer-anchored
// catch-light" the SFC never composed — `useSpecularTracking` was absent, no
// --mouse-x was ever written, and with `--glass-specular-intensity-rest: 0`
// (W09's correct dormancy) the ::before opacity is 0 at rest, so a static frame
// reads as flat DEAD plates. The tint "demo" set only --glass-tint-source with no
// --glass-tint-strength, so the color-mix(in oklab,…) was a 0% no-op (clicking a
// sample changed nothing). The SOURCE gate (proof-glass-material-demo.mjs) proves
// the SFC now BINDS the seams; this spec proves the seams actually PAINT.
//
// The fail-CLOSED contract:
//   - hover a headline plate + move the pointer across it → the host writes a LIVE
//     --mouse-x/--mouse-y AND the ::before opacity lifts off 0 (the unwired HEAD
//     state has neither — a dead plate); the catch-light POSITION tracks the
//     pointer (a second hover point reads a DIFFERENT --mouse-x).
//   - click an "aurora rose"/"aurora teal" tint sample → the tinted plate's
//     computed background MEASURABLY shifts (the color-mix now bites; the
//     0%-strength HEAD state shifts zero).
//
// Born-RED at HEAD (no --mouse-x write ever appears; the tint click shifts
// nothing). Exit non-zero — never SKIP-with-EXIT=0 — the W00 fail-CLOSED contract.
//
// The orchestrator ALSO drives this readback via chrome-devtools-mcp on a real
// Chrome (the cardinal lesson — the live tuning + verification arm); this spec is
// the workspace-resident fail-CLOSED twin.

import { test, expect } from "@playwright/test";
// Resolve the glass-material scene off the W00 manifest re-source (the anti-drift
// source-of-truth) WITHOUT editing W00's PI_TARGETS — resolveScene is the public
// seam this wave composes (it ADDS a sibling gate). A manifest rename FAILS the
// resolution rather than driving a dead route.
import { resolveScene } from "./pi-manifest.ts";

const GLASS_MATERIAL = resolveScene("substrates", "glass-material");

// The headline plates carry data-specular-plate so the spec has a stable anchor
// (NOT a brittle nth-child). The tinted plate carries data-tint-plate.
const PLATE = "[data-specular-plate]";
const TINT_PLATE = "[data-tint-plate]";

test.setTimeout(120_000);

// Parse "oklab(L a b / α)" / "rgb(...)" / "color(...)" into a comparable numeric
// vector so a "measurable shift" is a real ΔE-ish distance, not a string compare
// (the computed background may serialize differently across the color-mix).
function colorVec(s: string): number[] {
    const nums = [...s.matchAll(/-?\d*\.?\d+(?:e-?\d+)?/g)].map((m) => Number(m[0]));
    return nums.length ? nums : [NaN];
}
function colorDist(a: number[], b: number[]): number {
    const n = Math.min(a.length, b.length);
    if (n === 0) return 0;
    let sum = 0;
    for (let i = 0; i < n; i++) sum += (a[i] - b[i]) ** 2;
    return Math.sqrt(sum);
}

test.describe("glass-material-demo (π lane — moving specular + biting tint, fail-CLOSED)", () => {
    test("the named live canvas publishes live provenance and changing luminance", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GLASS_MATERIAL.path, { waitUntil: "networkidle" });

        const sample = page.locator('[data-glass-sample="live"]').first();
        await sample.scrollIntoViewIfNeeded();
        await expect(sample).toHaveAttribute("data-material", "functional-glass");
        await page.waitForFunction(
            () => {
                const el = document.querySelector('[data-glass-sample="live"]');
                return (
                    el?.getAttribute("data-backdrop-sample-state") === "sampled" &&
                    el.getAttribute("data-backdrop-sample-source") === "canvas"
                );
            },
            undefined,
            { timeout: 5000 },
        );

        const first = await sample.evaluate((el) =>
            (el as HTMLElement).style.getPropertyValue("--glass-backdrop-luma"),
        );
        await page.waitForTimeout(900);
        const second = await sample.evaluate((el) =>
            (el as HTMLElement).style.getPropertyValue("--glass-backdrop-luma"),
        );
        expect(first, "the live canvas should produce a luminance write").not.toBe("");
        expect(second, "the named canvas changes luminance over time").not.toBe(first);
    });

    test("the headline catch-light tracks the pointer and the tint sample bites the surface", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GLASS_MATERIAL.path, { waitUntil: "networkidle" });
        await page.waitForSelector(PLATE, { timeout: 8000 });
        await page.waitForTimeout(400);

        // ── (1) MOVING SPECULAR — the catch-light tracks the pointer ────────
        const plate = page.locator(PLATE).first();
        const box = await plate.boundingBox();
        expect(box, "no headline specular plate on the route").not.toBeNull();
        if (!box) return;

        // Read the rest state BEFORE any hover (the dead-plate baseline).
        const restState = await plate.evaluate((el) => {
            const before = getComputedStyle(el as HTMLElement, "::before");
            return {
                mouseX: (el as HTMLElement).style.getPropertyValue("--mouse-x") || "",
                beforeOpacity: Number(before.opacity),
            };
        });
        // At rest the seam has not written --mouse-x and the recipe's rest rung is 0.
        expect(
            restState.mouseX,
            "the rest state should carry no --mouse-x write (the centred fallback)",
        ).toBe("");

        // Hover near the LEFT third, move the pointer, and read the host write.
        const lx = box.x + box.width * 0.25;
        const rx = box.x + box.width * 0.75;
        const cy = box.y + box.height * 0.5;

        await page.mouse.move(lx, cy, { steps: 6 });
        await page.waitForTimeout(120);
        const leftState = await plate.evaluate((el) => {
            const before = getComputedStyle(el as HTMLElement, "::before");
            return {
                mouseX: (el as HTMLElement).style.getPropertyValue("--mouse-x") || "",
                beforeOpacity: Number(before.opacity),
            };
        });

        await page.mouse.move(rx, cy, { steps: 6 });
        await page.waitForTimeout(120);
        const rightState = await plate.evaluate((el) => {
            const before = getComputedStyle(el as HTMLElement, "::before");
            return {
                mouseX: (el as HTMLElement).style.getPropertyValue("--mouse-x") || "",
                beforeOpacity: Number(before.opacity),
            };
        });

        // The seam WRITES --mouse-x on pointer-move (the dead-plate HEAD state never
        // writes it). PRM is no-preference in the config so the write is live.
        expect(
            leftState.mouseX,
            "no --mouse-x written on hover — the useSpecularTracking seam is not composed/bound (dead plate)",
        ).not.toBe("");
        expect(
            rightState.mouseX,
            "no --mouse-x written on the second hover point",
        ).not.toBe("");

        // The catch-light POSITION tracks the pointer: the left-third and
        // right-third hovers write DIFFERENT --mouse-x percentages.
        const leftPct = Number(leftState.mouseX.replace("%", ""));
        const rightPct = Number(rightState.mouseX.replace("%", ""));
        expect(Number.isFinite(leftPct) && Number.isFinite(rightPct)).toBe(true);
        expect(
            rightPct - leftPct,
            `the catch-light must MOVE with the pointer (left=${leftState.mouseX}, right=${rightState.mouseX}) — a static frame writes the same value`,
        ).toBeGreaterThan(10);

        // The ::before catch-light is ALIVE on hover (opacity lifts off the rest 0).
        expect(
            Math.max(leftState.beforeOpacity, rightState.beforeOpacity),
            "the ::before catch-light opacity never lifts off 0 on hover — the gleam is dead",
        ).toBeGreaterThan(0);

        // Move the pointer off the plate (settle back).
        await page.mouse.move(box.x - 40, box.y - 40, { steps: 3 });

        // ── (2) BITING TINT — the sample shifts the plate background ────────
        const tintPlate = page.locator(TINT_PLATE).first();
        await tintPlate.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);

        const bgBefore = await tintPlate.evaluate(
            (el) => getComputedStyle(el as HTMLElement).backgroundColor,
        );

        // Click a non-zero tint sample (the glass Button carrying data-tint-sample
        // with a non-empty source). The "none" sample is data-tint-sample="".
        const sample = page
            .locator('[data-tint-sample]:not([data-tint-sample=""])')
            .first();
        await sample.click();
        await page.waitForTimeout(250);

        const bgAfter = await tintPlate.evaluate(
            (el) => getComputedStyle(el as HTMLElement).backgroundColor,
        );

        const shift = colorDist(colorVec(bgBefore), colorVec(bgAfter));
        expect(
            shift,
            `the tint sample must MEASURABLY shift the plate background (before="${bgBefore}", after="${bgAfter}") — a 0%-strength color-mix shifts zero`,
        ).toBeGreaterThan(0.001);
    });
});
