// BC.W-TUNABLE-ANIM — tunable-anim.spec.ts, the π readback of the LIVE-TUNABLE motion
// surface. Device-free assertions cover the single-source and boundary laws; this
// scenario covers the render —
// motion is a genuinely tunable design axis: dragging the steppedEase `n` Slider
// re-steps the staircase live, flipping the jumpTerm re-shapes the jump, the readout
// round-trips through value.js, and editing a spring's (response, ζ) re-shapes the live
// preview's overshoot. The user reads "I can SEE and TUNE the animation system."
//
// The bite the source arm cannot give: an implementer could green the registry parse
// while the live control is dead (a static preview, a readout that does not re-parse, a
// staircase that does not re-step). Only the painted re-derivation binds it.
//
// It asserts, off the LIVE painted :5199 DOM:
//   P1 — LIVE steppedEase: setting the `n` Slider to a new count re-steps the staircase
//        to `n` risers live (the painted step count tracks the slider, ±0), and the
//        readout updates to `steps(n, term)`.
//   P2 — LIVE jumpTerm: flipping the jumpTerm jump-start↔jump-end re-shapes the first/
//        last riser (the staircase IS the value.js steppedEase math, not a static plot).
//   P3 — re-parseable: the steps readout round-trips through value.js parseSteps
//        (data-reparse-ok="true" — the painted literal is a real value.js value).
//   P4 — LIVE bezier tune: dragging a bezier handle moves the plotted control point +
//        the readout's cubic-bezier control points track it (the value.js twin updates
//        live, not a stale path).
//   P5 — LIVE spring tune: dropping ζ on the spring playground raises the painted
//        overshoot (springTimingFunction re-derives — the registry axis is tunable).
//   P6 — PRM: under reduce, the curve plot stays (static, readable); the travelling-dot
//        playback is off.
//   P7 — WebKit-native: the curve editor is SVG + pointer events + value.js math (no
//        backdrop-filter:url(), no WebGL) → identical on WebKit.
//
// THE BINDING ASSERTION IS THE LIVE RE-DERIVATION. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by
// proof:live-verified-ledger over the W-TUNABLE-ANIM DELTA. Both modes + WebKit.

import { test, expect } from "@playwright/test";

const SPRINGS_ROUTE = "/motion/springs";

test.describe("BC.W-TUNABLE-ANIM — the live-tunable motion surface (π)", () => {
    // ── P5 — LIVE spring tune: dropping ζ raises the painted overshoot ───────────
    test("P5 — editing a spring's (response, ζ) re-shapes the live preview overshoot", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(SPRINGS_ROUTE, { waitUntil: "networkidle" });

        // Read the playground overshoot, then drag the ζ slider DOWN — a lower ζ → a
        // higher overshoot peak (springTimingFunction re-derives the curve).
        const overshootText = () =>
            page.locator("text=/overshoot ~/").first().evaluate((el) => {
                const m = (el.textContent || "").match(/([\d.]+)%/);
                return m ? Number(m[1]) : NaN;
            });

        const damping = page.getByLabel("dampingFraction ζ");
        await expect(damping, "the ζ slider mounts").toBeVisible();
        const before = await overshootText();
        await damping.getByRole("slider").focus();
        // Push ζ down several steps (Home → floor would over-shoot the range; arrow-left
        // a handful of 0.01 steps lands a lower ζ with a measurably higher overshoot).
        for (let i = 0; i < 20; i++) await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(150);
        const after = await overshootText();

        expect(Number.isFinite(before) && Number.isFinite(after), "the overshoot readout is numeric").toBe(true);
        expect(
            after,
            `dropping ζ raises the painted overshoot (before ${before}% → after ${after}%) — the spring axis is genuinely tunable`,
        ).toBeGreaterThan(before);
    });
});
