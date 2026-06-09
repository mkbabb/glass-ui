// AX.W46 — proof:blob-live-truth arm C (mood half), the mood-DELTA PERSISTENCE π lane.
//
// The born-RED witness for D7 (blob-mood totally broken — the auto-mood clobbers a
// manual setMood every frame). At HEAD `useMetaballRenderer` calls `mood.update(...)`
// UNCONDITIONALLY every non-reduced frame BEFORE `mood.tick(...)`; with no pointer/no
// click/short-idle `update` falls through to `setMood("idle")`. So one frame (~16ms)
// after the demo mood pill fires `blobRef.setMood(m)`, the auto-arc force-retargets
// back to idle — every mood renders IDENTICAL (the auto-arc idle), the UI lies (the
// pressed pill highlights but the render never changes). The manual-mood LATCH (D7)
// gives the public `setMood` a first-class override the auto-arc respects (manual >
// auto until a fresh live interaction releases it).
//
// THE MEASURE — the MOTION RATE (the mean abs frame-to-frame per-pixel delta). The
// mood drives orbit speed (excited = fast orbit, sleepy = slow), wobble, and the
// sheen, so the per-frame painted delta is a robust mood-DERIVED rendered signal: a
// pinned `excited` orbits FAST (high motion rate), a pinned `sleepy` orbits SLOW (low
// rate). At HEAD both clobber to idle within a frame → the rates are EQUAL (ratio ≈ 1,
// RED). After the latch the manual pin PERSISTS → excited's rate is many× sleepy's
// (GREEN), and it HOLDS across an idle window (not silently dragged back to idle).
//
// READBACK MECHANISM — the same composited-element-screenshot readback the
// blob-render spec uses (the robust cross-GL-context decode via pngjs). The motion
// rate is the mean of consecutive-frame deltas over N frames after the mood transition
// settles. The verdict is RATIO-based (excited/sleepy) so it is invariant to the
// absolute body/color of the fixture.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { resolveScene } from "./pi-manifest.ts";

// The blob-mood demo route (re-sourced from the manifest, never a hand path). The hero
// is a single interactive <GooBlob> driven by the mood-pill row.
const MOOD_SCENE = resolveScene("substrates", "blob-mood");

// ── tunables (live-set against the AFTER mood-delta render) ────────────────────────
// The mood pill row: idle · happy · curious · sleepy · excited (blob-mood.vue MOODS).
const SETTLE_AFTER_TRANSITION_MS = 2800; // sleepy's cross-fade is the slowest (~2.5s)
const EXCITED_SETTLE_MS = 1200;          // excited's cross-fade (~0.6s)
const IDLE_HOLD_MS = 1500;               // the persistence window (a manual mood must HOLD)
const MOTION_FRAMES = 6;                 // frames per motion-rate sample
const MOTION_GAP_MS = 90;                // inter-frame gap
// Live AFTER: excited ≈ 2.3–3.0, sleepy ≈ 0.12–0.14 → ratio ≈ 19–21. At HEAD both
// clobber to idle → ratio ≈ 1. The floor 3 is a wide born-RED margin (the live ratio
// is ~20×; a clobbered render is ~1×).
const EXCITED_VS_SLEEPY_MIN_RATIO = 3;
// Persistence: a pinned excited HELD across the idle window stays clearly above the
// sleepy rate (live ≈ 5–7×). A clobber-to-idle would collapse it to the sleepy/idle
// floor. The floor 2 proves it did NOT get dragged back to idle within a frame.
const PERSIST_VS_SLEEPY_MIN_RATIO = 2;

test.setTimeout(180_000);

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Mean abs per-pixel RGB delta between two frames — the MOTION rate signal. */
function frameDelta(a: PNG, b: PNG): number {
    const n = Math.min(a.data.length, b.data.length);
    let sum = 0;
    let count = 0;
    for (let i = 0; i < n; i += 4) {
        sum +=
            Math.abs(a.data[i]! - b.data[i]!) +
            Math.abs(a.data[i + 1]! - b.data[i + 1]!) +
            Math.abs(a.data[i + 2]! - b.data[i + 2]!);
        count++;
    }
    return count === 0 ? 0 : sum / count;
}

/** The mean motion rate over N consecutive frames (mean of consecutive-frame deltas). */
async function motionRate(page: Page, blob: Locator): Promise<number> {
    const frames: PNG[] = [];
    for (let f = 0; f < MOTION_FRAMES; f++) {
        frames.push(await grab(blob));
        await page.waitForTimeout(MOTION_GAP_MS);
    }
    let sum = 0;
    for (let i = 1; i < frames.length; i++) sum += frameDelta(frames[i - 1]!, frames[i]!);
    return sum / (frames.length - 1);
}

/** Click a mood pill (a labeled <button> in the demo mood row) — a MANUAL setMood. */
async function clickMood(page: Page, mood: string): Promise<void> {
    await page.getByRole("button", { name: mood, exact: true }).first().click();
}

test.describe("blob-mood-live (π lane — the manual-mood DELTA + PERSISTENCE)", () => {
    test("a manual setMood drives a VISIBLE mood-derived render delta that PERSISTS (D7 — the auto-mood clobber is fixed)", async ({
        page,
    }) => {
        await page.goto(MOOD_SCENE.path);
        const blob = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blob.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(900); // let the initial mood + orbit settle

        // ── Pin SLEEPY (the slow-orbit mood) — a MANUAL setMood via the pill. ──
        await clickMood(page, "sleepy");
        await page.waitForTimeout(SETTLE_AFTER_TRANSITION_MS);
        const sleepyRate = await motionRate(page, blob);

        // ── Pin EXCITED (the fast-orbit mood) — a MANUAL setMood via the pill. ──
        await clickMood(page, "excited");
        await page.waitForTimeout(EXCITED_SETTLE_MS);
        const excitedRate = await motionRate(page, blob);

        // 1. MOOD-DERIVED DELTA — excited (fast orbit) renders MANY× the motion of
        //    sleepy (slow orbit). At HEAD both clobber to idle within a frame → the
        //    rates are EQUAL (ratio ≈ 1), the documented-lie (the pill highlights but
        //    the render never changes). The latch makes the manual setMood AUTHORITATIVE.
        const ratio = excitedRate / Math.max(sleepyRate, 0.01);
        expect(
            ratio,
            `manual mood-delta ratio excited/sleepy = ${ratio.toFixed(2)} (excited motion ${excitedRate.toFixed(3)} vs sleepy ${sleepyRate.toFixed(3)}) is below ${EXCITED_VS_SLEEPY_MIN_RATIO} — the two manual moods render IDENTICALLY (the auto-mood clobbers the manual setMood back to idle within a frame; the manual setMood is a documented LIE)`,
        ).toBeGreaterThanOrEqual(EXCITED_VS_SLEEPY_MIN_RATIO);

        // 2. PERSISTENCE — the pinned excited mood HOLDS across an idle window (no
        //    pointer/click on the canvas), NOT silently dragged back to idle. A clobber
        //    would collapse the rate to the sleepy/idle floor; a held pin stays clearly
        //    above it.
        await page.waitForTimeout(IDLE_HOLD_MS);
        const excitedRateAfterIdle = await motionRate(page, blob);
        const persistRatio = excitedRateAfterIdle / Math.max(sleepyRate, 0.01);
        expect(
            persistRatio,
            `pinned-excited motion after a ${IDLE_HOLD_MS}ms idle window = ${excitedRateAfterIdle.toFixed(3)} (${persistRatio.toFixed(2)}× sleepy) is below ${PERSIST_VS_SLEEPY_MIN_RATIO}× — the manual setMood did NOT persist (the auto-mood arc dragged it back toward idle; the latch must hold a user-pinned mood until a fresh live interaction)`,
        ).toBeGreaterThanOrEqual(PERSIST_VS_SLEEPY_MIN_RATIO);

        // 3. RELEASE — a fresh pointer-over the LIVE canvas releases the latch back to
        //    the autonomic arc (the demo's "auto-drives from interaction" blurb stays
        //    true). We confirm the release path runs without error and the loop stays
        //    live (a held hover auto-promotes to `curious`, so the render keeps moving) —
        //    the auto-arc owns the precise post-release mood.
        const box = await blob.boundingBox();
        if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.waitForTimeout(500);
        }
        const afterHoverRate = await motionRate(page, blob);
        expect(
            afterHoverRate,
            `after a fresh pointer-over the live canvas the motion rate = ${afterHoverRate.toFixed(3)} — the render froze (the latch release stalled the loop); a fresh interaction must hand control back to the live auto-arc`,
        ).toBeGreaterThan(0.01);
    });
});
