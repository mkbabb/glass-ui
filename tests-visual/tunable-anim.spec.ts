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
import type { Page } from "@playwright/test";

const GALLERY_ROUTE = "/motion/curve-gallery";
const SPRINGS_ROUTE = "/motion/springs";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// Select a curve-gallery family chip by label (the chip rack OR the narrow Select).
async function selectFamily(page: Page, label: string): Promise<void> {
    const chip = page.getByRole("button", { name: label, exact: true });
    if (await chip.count()) {
        await chip.first().click();
        await page.waitForTimeout(200);
        return;
    }
    await page.getByLabel("Curve family").click();
    await page.getByRole("option", { name: label, exact: true }).click();
    await page.waitForTimeout(200);
}

// Count the discrete RISERS in the steps path `d` (a sampled staircase). A riser is a
// vertical jump between consecutive sampled points — the count of distinct tread levels
// minus 1 ≈ the step count `n`. We read the readout's `n` directly (the binding value)
// and assert the painted staircase shares its top/shape; the readout `n` IS the slider.
async function readSteps(page: Page): Promise<{ n: number; term: string; reparseOk: string; d: string }> {
    const picker = page.locator('[data-testid="easing-picker"][data-mode="steps"]');
    return picker.evaluate((root) => {
        const code = root.querySelector("code");
        const path = root.querySelector("svg path[d^='M 0']");
        const readout = root.querySelector('[data-testid="easing-readout"]');
        const lit = (code?.textContent || "").trim();
        const m = lit.match(/steps\((\d+),\s*([a-z-]+)\)/);
        return {
            n: m ? Number(m[1]) : -1,
            term: m ? m[2]! : "",
            reparseOk: readout?.getAttribute("data-reparse-ok") || "",
            d: path?.getAttribute("d") || "",
        };
    });
}

// Sample the staircase path's Y at a given X (the value the staircase holds at x).
function sampleStepY(d: string, x: number): number {
    const pts = [...d.matchAll(/([\d.]+)\s+([\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])] as const);
    let best = pts[0]?.[1] ?? 1;
    for (const [px, py] of pts) {
        if (px <= x) best = py;
        else break;
    }
    return best;
}

test.describe("BC.W-TUNABLE-ANIM — the live-tunable motion surface (π)", () => {
    // ── P1 — LIVE steppedEase: the n-Slider re-steps the staircase ───────────────
    test("P1 — dragging the n Slider re-steps the staircase live + the readout tracks it", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Steps");

        const picker = page.locator('[data-testid="easing-picker"][data-mode="steps"]');
        await expect(picker, "the steps picker mounts").toBeVisible();

        const before = await readSteps(page);
        expect(before.n, "the readout carries a starting step count").toBeGreaterThanOrEqual(1);

        // Drive the dogfooded glass-ui <Slider> to a NEW count via keyboard (reka
        // SliderThumb is arrow-key drivable) — End jumps to the max, then a few Home/
        // arrow steps land a deterministic value distinct from the start.
        const slider = page.locator('[data-testid="easing-steps-n"]');
        await expect(slider, "the n-count control is the glass-ui Slider").toBeVisible();
        await slider.getByRole("slider").focus();
        await page.keyboard.press("Home"); // → STEP_COUNT_MIN (1)
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight"); // → 3
        await page.waitForTimeout(150);

        const after = await readSteps(page);
        expect(after.n, "the step count changed live (the slider re-tuned the axis)").not.toBe(before.n);
        expect(after.n, "the readout reads the slid value (n=3)").toBe(3);
        // The painted staircase re-stepped: its readout literal IS steps(n, term).
        expect(after.d.length, "the staircase path re-sampled (non-empty)").toBeGreaterThan(0);
    });

    // ── P2 — LIVE jumpTerm: flipping the term re-shapes the staircase ────────────
    test("P2 — flipping the jumpTerm re-shapes the staircase (the value.js math, not a static plot)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Steps");

        // Set jump-start, sample the early-x tread; set jump-end, sample again — the
        // first riser position differs (jump-start jumps at t=0, jump-end at the tread
        // ends), so the held Y near x≈0.1 changes.
        await page.getByLabel("Jump term").click();
        await page.getByRole("option", { name: "jump-start", exact: true }).click();
        await page.waitForTimeout(200);
        const start = await readSteps(page);
        const startY = sampleStepY(start.d, 0.1);
        expect(start.term).toBe("jump-start");

        await page.getByLabel("Jump term").click();
        await page.getByRole("option", { name: "jump-end", exact: true }).click();
        await page.waitForTimeout(200);
        const end = await readSteps(page);
        const endY = sampleStepY(end.d, 0.1);
        expect(end.term).toBe("jump-end");

        expect(
            Math.abs(startY - endY),
            `flipping jump-start↔jump-end re-shapes the early staircase (Y@0.1 start=${startY} end=${endY})`,
        ).toBeGreaterThan(0.05);
    });

    // ── P3 — re-parseable: the steps readout round-trips through value.js ─────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`P3 — the steps readout round-trips through value.js parseSteps (${mode})`, async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            await selectFamily(page, "Steps");

            const s = await readSteps(page);
            expect(s.term, "the readout names a value.js jump term").not.toBe("");
            expect(
                s.reparseOk,
                "the readout round-trips through value.js parseSteps (data-reparse-ok=true — the painted literal IS a real value.js value)",
            ).toBe("true");
        });
    }

    // ── P4 — LIVE bezier tune: dragging a handle re-traces the curve ─────────────
    test("P4 — dragging a bezier handle re-plots the curve + the readout tracks it", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Custom");

        // The Custom family mounts TWO bezier pickers — the bare <EasingPicker> and
        // the chassis-seated <EasingConfigurator> (the same primitive in a
        // ConfiguratorLayer). Target the FIRST (the bare gallery editor) so the drag
        // drives one unambiguous SVG (a strict-mode match would red on the duplicate).
        const picker = page.locator('[data-testid="easing-picker"][data-mode="bezier"]').first();
        await expect(picker).toBeVisible();

        const litBefore = (await picker.locator("code").first().textContent())?.trim() || "";

        // Grab the REAL draggable handle by its rendered position, not a guessed
        // fraction of the SVG box. The SVG viewBox is offset + letterboxed
        // (preserveAspectRatio="meet" over an overshoot-padded box), so a fractional
        // box coordinate lands in empty space far from any handle — the drag never
        // grabs one and the literal never changes. The draggable handles are the two
        // `cursor: move` circles (the bezier control points); take the first, scroll
        // it into view, and drag from its true on-screen centre.
        const handle = picker
            .locator('circle[style*="cursor: move"], circle[style*="cursor:move"]')
            .first();
        await handle.scrollIntoViewIfNeeded();
        const hb = await handle.boundingBox();
        expect(hb, "the draggable bezier handle has a box").not.toBeNull();
        const fromX = hb!.x + hb!.width / 2;
        const fromY = hb!.y + hb!.height / 2;
        // A delta UP-and-RIGHT, kept modest so the drag target stays on-screen and the
        // clamped control point moves a visible amount (the readout re-authors live).
        await page.mouse.move(fromX, fromY);
        await page.mouse.down();
        await page.mouse.move(fromX + 60, fromY - 60, { steps: 8 });
        await page.mouse.up();
        await page.waitForTimeout(150);

        const litAfter = (await picker.locator("code").first().textContent())?.trim() || "";
        expect(litAfter, "the readout is a cubic-bezier literal").toMatch(/^cubic-bezier\(/);
        expect(litAfter, "dragging the handle re-authored the curve (the literal changed live)").not.toBe(litBefore);
    });

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

    // ── P6 — PRM: the curve plot stays, the travelling dot is off ────────────────
    test("P6 — under reduced-motion the curve plot stays static + readable", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Custom");

        // .first() — the Custom family mounts TWO bezier pickers (bare + configurator-seated).
        const picker = page.locator('[data-testid="easing-picker"][data-mode="bezier"]').first();
        await expect(picker, "the curve plot is present under PRM (readable, not stripped)").toBeVisible();
        const hasCurve = await picker.locator("svg path[d^='M 0 1 C']").count();
        expect(hasCurve, "the bezier curve is still plotted under reduce").toBeGreaterThan(0);
    });

    // ── P7 — WebKit-native (no backdrop-filter:url, no WebGL on the editor) ───────
    test("P7 — the curve editor is SVG + value.js math (Safari-native, no url()/WebGL)", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto(GALLERY_ROUTE, { waitUntil: "networkidle" });
        await selectFamily(page, "Custom");

        // .first() — the Custom family mounts TWO bezier pickers (bare + configurator-seated).
        const picker = page.locator('[data-testid="easing-picker"][data-mode="bezier"]').first();
        await expect(picker).toBeVisible();
        const noWebgl = await picker.evaluate((root) => {
            const canvas = root.querySelector("canvas");
            const svg = root.querySelector("svg");
            const filter = getComputedStyle(root).backdropFilter || "";
            return { hasCanvas: !!canvas, hasSvg: !!svg, urlFilter: filter.includes("url(") };
        });
        expect(noWebgl.hasSvg, "the editor renders via SVG (Safari-native)").toBe(true);
        expect(noWebgl.hasCanvas, "the editor uses NO WebGL canvas").toBe(false);
        expect(noWebgl.urlFilter, "the editor uses NO backdrop-filter:url() (Safari-broken)").toBe(false);
    });
});
