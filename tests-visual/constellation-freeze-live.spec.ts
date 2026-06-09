// AY.W-CON3 — proof:constellation-freeze-live, the π-lane deterministic-capture
// freeze render observation. A byte-for-byte structural mirror of the AY.W-CON2
// constellation-egg-live + AY.W-CON1 constellation-refit-live gates: a REAL
// device render + per-frame ENGINE-STATE readback off the demo
// `__constellationFreeze` handle, NOT a grep.
//
// The CPU-oracle blindspot (the W01 lesson): the freeze unit tests + typecheck
// ALL pass while the LIVE field could never actually freeze (a stepField that
// runs anyway), leak a live `now` into the overlay (a phase-driven mark that
// varies under a "frozen" field), lay out a fresh Math.random field per load (a
// non-reproducible capture), or never honour the `?freeze` URL hook. So this spec
// mounts the REAL <Constellation :freeze :seed :drawOverlay> on a real device,
// reads the node-position + overlay-phase hash off the `__constellationFreeze`
// handle, and asserts determinism + stillness + the URL auto-derive.
//
// ASSERTS (born-RED at HEAD — the `freeze` prop / the `?freeze` seam / the
// `__constellationFreeze` handle do not exist, so the handle is absent and the
// determinism/stillness asserts cannot run):
//   (1) CROSS-RUN-DETERMINISM — mounting the SAME `<Constellation :freeze
//       :seed>` TWICE (two page loads) yields BYTE-IDENTICAL node-position +
//       overlay-phase hashes. A non-seeded layout / a live-`now` leak REDs here.
//   (2) FRAME-STILLNESS — on ONE frozen instance, the node-position +
//       overlay-phase hash at frame 1 EQUALS the hash after ≥30 rAF advances. A
//       field that still steps OR a live `now` handed to the overlay REDs here.
//   (3) URL-AUTO-DERIVE — a `<Constellation>` with NO `freeze` prop is STATIC
//       under a `?freeze` URL (the hook fires) and ADVANCES under no capture URL
//       (the live path). Born-RED: with no seam the field always advances.

import { test, expect } from "@playwright/test";
// Resolve the constellation scene off the W00 manifest re-source (the anti-drift
// source-of-truth) WITHOUT editing W00's `PI_TARGETS` — `resolveScene` is the
// public seam this gate composes (it ADDS a sibling gate, it does not edit W00's
// members).
import { resolveScene } from "./pi-manifest.ts";

const CONSTELLATION = resolveScene("substrates", "constellation");

interface FreezeSample {
    handlePresent: boolean;
    /** a stable hash of field.nodes positions (rounded) + the warp focal. */
    nodeHash: string;
    /** the recipe's frozen-phase pulse-ring radius (the overlay-phase observable). */
    pulseRadius: number;
    /** node count (so a zero-node mount is caught explicitly). */
    nodeCount: number;
}

/** Quantise a number to 0.01px so float jitter does not break the hash. */
function q(n: number): number {
    return Math.round(n * 100) / 100;
}

test.setTimeout(120_000);

test.describe("constellation-freeze-live (π lane — fail-CLOSED, AY.W-CON3)", () => {
    // ── (1) CROSS-RUN-DETERMINISM + (2) FRAME-STILLNESS ──────────────────────
    test("a ?freeze static frame is reproducible across runs AND still within a run", async ({
        page,
    }) => {
        // The reader: hash field.nodes positions + the warp focal + the frozen
        // overlay pulse radius off the __constellationFreeze handle, after first
        // paint. Returns handlePresent:false if the seam never mounted (born-RED).
        const readFreeze = async (): Promise<FreezeSample> =>
            page.evaluate(async () => {
                const f = (window as unknown as Record<string, unknown>)
                    .__constellationFreeze as
                    | {
                          field?: {
                              nodes: { x: number; y: number }[];
                              warp: { x: number; y: number };
                          };
                          overlayPulseRadius?: () => number;
                      }
                    | undefined;
                if (!f || !f.field || !f.overlayPulseRadius) {
                    return {
                        handlePresent: false,
                        nodeHash: "",
                        pulseRadius: -1,
                        nodeCount: 0,
                    };
                }
                const field = f.field;
                const nextFrame = () =>
                    new Promise<void>((res) => requestAnimationFrame(() => res()));
                // let the substrate paint its first frame + lay out the field.
                for (let i = 0; i < 6; i++) await nextFrame();
                const round = (n: number) => Math.round(n * 100) / 100;
                const parts: string[] = [];
                for (const n of field.nodes) parts.push(`${round(n.x)},${round(n.y)}`);
                parts.push(`w:${round(field.warp.x)},${round(field.warp.y)}`);
                return {
                    handlePresent: true,
                    nodeHash: parts.join("|"),
                    pulseRadius: round(f.overlayPulseRadius()),
                    nodeCount: field.nodes.length,
                };
            });

        // RUN 1 — first mount.
        await page.goto(CONSTELLATION.path);
        const freezeCanvas = page.locator("canvas.constellation-canvas").last();
        await freezeCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await freezeCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const f = (window as unknown as Record<string, unknown>)
                    .__constellationFreeze as
                    | { field?: { nodes: unknown[]; w: number } }
                    | undefined;
                return !!f?.field && f.field.nodes.length > 0 && f.field.w > 0;
            },
            { timeout: 15_000 },
        );
        const run1 = await readFreeze();

        // (2) FRAME-STILLNESS — sample the SAME instance again after ≥30 rAF
        // advances. A frozen field + a frozen overlay `now` hash IDENTICALLY.
        await page.evaluate(async () => {
            const nextFrame = () =>
                new Promise<void>((res) => requestAnimationFrame(() => res()));
            for (let i = 0; i < 36; i++) await nextFrame();
        });
        const run1later = await readFreeze();

        // RUN 2 — a SECOND full mount (reload), the same seeded freeze instance.
        await page.reload();
        await freezeCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await freezeCanvas.scrollIntoViewIfNeeded();
        await page.waitForFunction(
            () => {
                const f = (window as unknown as Record<string, unknown>)
                    .__constellationFreeze as
                    | { field?: { nodes: unknown[]; w: number } }
                    | undefined;
                return !!f?.field && f.field.nodes.length > 0 && f.field.w > 0;
            },
            { timeout: 15_000 },
        );
        const run2 = await readFreeze();

        // The handle MUST be present — its absence is the born-RED state (no
        // freeze seam → nothing to sample). A fail-CLOSED RED, not a skip.
        expect(
            run1.handlePresent && run2.handlePresent,
            "window.__constellationFreeze is absent — the ?freeze deterministic-capture seam did not mount (born-RED: no freeze to drive)",
        ).toBe(true);
        expect(
            run1.nodeCount,
            "the frozen field has zero nodes — the static-frame layout did not run",
        ).toBeGreaterThan(0);

        // (1) CROSS-RUN-DETERMINISM — two seeded mounts are BYTE-IDENTICAL.
        expect(
            run2.nodeHash,
            `cross-run node positions DIFFER between two ?freeze mounts — the seeded static frame is NOT reproducible (run1 ≠ run2). A live Math.random layout or a stepped field leaked.`,
        ).toBe(run1.nodeHash);
        expect(
            run2.pulseRadius,
            `cross-run overlay pulse radius DIFFERS (${run1.pulseRadius} vs ${run2.pulseRadius}) — a live \`now\` reached drawOverlay (the phase did not clamp under freeze)`,
        ).toBe(run1.pulseRadius);

        // (2) FRAME-STILLNESS — the same instance does NOT advance.
        expect(
            run1later.nodeHash,
            `the frozen field ADVANCED within one run (frame-1 ≠ later-now) — stepField ran under freeze (no drift / no warp / no wander allowed)`,
        ).toBe(run1.nodeHash);
        expect(
            run1later.pulseRadius,
            `the overlay pulse radius ADVANCED within one run (${run1.pulseRadius} → ${run1later.pulseRadius}) — a live \`now\` was handed to drawOverlay under freeze`,
        ).toBe(run1.pulseRadius);
    });

    // ── (3) URL-AUTO-DERIVE ──────────────────────────────────────────────────
    test("an explicit-freeze-OMITTED instance is static under ?freeze and live without it", async ({
        page,
    }) => {
        // The refit/wander instance (the THIRD <Constellation>, exposed via
        // __constellationRefit) carries NO `freeze` prop — so its static-vs-live
        // state is driven ENTIRELY by the location.search auto-derive. Sample its
        // node-position drift over ≥40 frames under each URL. `awaitMotion` polls
        // until the substrate's offscreen/content-visibility park has lifted
        // (the field is ACTUALLY advancing) before measuring — without it the
        // live arm can read a still-parked field as "the live path is dead" (the
        // egg-spec un-park precedent, a false RED under runner contention).
        const driftOver = async (awaitMotion: boolean): Promise<number> =>
            page.evaluate(async (waitForMotion: boolean) => {
                const r = (window as unknown as Record<string, unknown>)
                    .__constellationRefit as
                    | { field?: { nodes: { x: number; y: number }[]; w: number } }
                    | undefined;
                if (!r?.field || r.field.nodes.length === 0) return -1;
                const field = r.field;
                const nextFrame = () =>
                    new Promise<void>((res) => requestAnimationFrame(() => res()));
                const sumPos = () => {
                    let s = 0;
                    for (const n of field.nodes) s += n.x + n.y;
                    return s;
                };
                if (waitForMotion) {
                    // Poll up to 120 frames for the park to lift (a live field MOVES;
                    // a parked one is frozen). Bail to sampling on the first moved
                    // frame, or after the cap (then the drift assert itself REDs).
                    let prevPos = sumPos();
                    for (let i = 0; i < 120; i++) {
                        await nextFrame();
                        const now = sumPos();
                        if (Math.abs(now - prevPos) > 1e-3) break;
                        prevPos = now;
                    }
                } else {
                    // a static frame needs no un-park wait; just settle a few frames.
                    for (let i = 0; i < 8; i++) await nextFrame();
                }
                const start = sumPos();
                let travel = 0;
                let prev = start;
                for (let i = 0; i < 44; i++) {
                    await nextFrame();
                    const now = sumPos();
                    travel += Math.abs(now - prev);
                    prev = now;
                }
                return travel;
            }, awaitMotion);

        const waitRefit = async () =>
            page.waitForFunction(
                () => {
                    const r = (window as unknown as Record<string, unknown>)
                        .__constellationRefit as
                        | { field?: { nodes: unknown[]; w: number } }
                        | undefined;
                    return !!r?.field && r.field.nodes.length > 0 && r.field.w > 0;
                },
                { timeout: 15_000 },
            );

        // (3a) under ?freeze — the field is STATIC (the URL hook fires).
        await page.goto(`${CONSTELLATION.path}?freeze`);
        const refitCanvas = page.locator("canvas.constellation-canvas").nth(2);
        await refitCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await refitCanvas.scrollIntoViewIfNeeded();
        await waitRefit();
        // settle so the substrate has painted the (frozen) static frame.
        await page.waitForTimeout(600);
        const frozenTravel = await driftOver(false);
        expect(
            frozenTravel,
            "the __constellationRefit handle vanished under ?freeze (born-RED: no auto-derive seam)",
        ).toBeGreaterThanOrEqual(0);
        // a STATIC frame has ~0 positional travel (float noise only).
        expect(
            frozenTravel,
            `under ?freeze the freeze-OMITTED field still drifted (total travel ${frozenTravel.toFixed(3)}px) — the location.search auto-derive hook did NOT fire`,
        ).toBeLessThan(1);

        // (3b) under NO capture URL — the field ADVANCES (the live path).
        await page.goto(CONSTELLATION.path);
        await refitCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await refitCanvas.scrollIntoViewIfNeeded();
        await waitRefit();
        // give the substrate a beat to lift the offscreen/content-visibility park.
        await page.waitForTimeout(800);
        const liveTravel = await driftOver(true);
        expect(
            liveTravel,
            `without a capture URL the field did NOT drift (total travel ${liveTravel.toFixed(3)}px) — the live path is dead or the freeze leaked into the non-capture load`,
        ).toBeGreaterThan(1);
    });
});
