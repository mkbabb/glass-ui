// AX.W16 — proof:blob-integration, the blob's INTEGRATION gate (born-RED→GREEN).
//
// The structural antidote to the static-defineExpose-green-while-the-seam-is-dead
// class: at HEAD the WCAG-2.2.2 pause seam was a RUNTIME NO-OP — `GooBlob.vue` called
// `useMetaballRenderer({...})` and DISCARDED the return, so `pause`/`resume` were
// never exposed, the README documented a seam that did not exist, and a consumer
// following the docs got a pause button that did nothing WITH ZERO ERROR (the `?.`
// optional-chain swallowed the `undefined`). Every static gate shipped GREEN over it.
//
// This spec is a RUNTIME rAF-PARK OBSERVATION (NOT a defineExpose-string regex — the
// AX gate-philosophy lesson). It mounts the REAL interactive `<GooBlob>` wired to a
// `DockBackgroundToggle` via `v-model:paused`, drives the surface, and observes the
// ACTUAL loop:
//
//   1. PAUSE PARKS THE LOOP. While running, two screenshots ~250ms apart DIFFER (the
//      membrane warps / satellites orbit). After clicking the pause toggle, two
//      screenshots ~250ms apart are IDENTICAL (the rAF parked — the surface froze).
//      Resume → frames differ again. Born-RED at HEAD (pause was undefined → the loop
//      never parked → the after-pause frames still differed).
//   2. MULTI-INSTANCE CONTEXT BOUND. The re-cast goo-blob grid mounts a BOUNDED number
//      of live WebGL2 contexts (the GL hero tier; the static register is WatercolorDots).
//      Asserts the live `WebGL2RenderingContext` count stays under the cap. Born-RED at
//      HEAD (the 4-cell grid + live-color = 5 GL contexts, growing per instance).
//   3. README-VS-CODE defineExpose CONSISTENCY. Every method in the README "Exposed"
//      table appears in `GooBlob.vue`'s `defineExpose` (or the prop/emit surface). This
//      is a doc-vs-code consistency assert (a precept-valid artefact form). Born-RED at
//      HEAD (`pause`/`resume` were in the table but not the expose list).
//
// READBACK MECHANISM (inherited from AX.W00). A WebGL2 canvas is NOT reliably read via
// `getImageData` without `preserveDrawingBuffer`. The robust cross-context readback is
// a COMPOSITED element screenshot (`locator.screenshot()`); the PARK observation is a
// FRAME-DELTA between two screenshots (a running loop changes pixels; a parked loop
// does not) — NOT a pixel readback of a single frame.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";
import { PI_TARGETS, resolveScene } from "./pi-manifest.ts";

const LIBRARY_ROOT = fileURLToPath(new URL("..", import.meta.url));

// ── tunables ───────────────────────────────────────────────────────────────────
const SETTLE_MS = 600; // let the demand loop settle into the resting pose
const BOUNCE_SAMPLES = 6; // frames sampled across a click bounce; the verdict is the PEAK
const BOUNCE_GAP_MS = 45; // gap between bounce samples (~270ms total window)
const MOTION_DELTA_MIN = 0.05; // a RUNNING click-bounce changes ≥ this fraction of the body
const PARKED_DELTA_MAX = 0.01; // a PARKED click changes ≤ this fraction (no bounce renders)
const CONTEXT_CAP = 6; // the live WebGL2-context bound on one page (re-cast grid)
const DELTA_THRESHOLD = 12; // |ΔR|+|ΔG|+|ΔB| over which a pixel "changed" frame-to-frame

test.setTimeout(180_000);

/** Composited element screenshot → decoded RGBA. */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

// The canvas is 160% of the visible WRAPPER; the WRAPPER carries a `:hover`
// drop-shadow with a CSS `transition: filter` (GooBlob.vue) that shows THROUGH the
// transparent canvas border in a composited screenshot — a CSS artefact, NOT a canvas
// render. So the motion-delta is measured over the OPAQUE BODY CENTER (the central
// ~28% band) ONLY, where the lit dome is fully opaque and no wrapper shadow reaches.
// This isolates the rAF-park truth from the hover artefact (an empirically-swept crop:
// at 0.36 the running click-bounce reads ≈ 0.58 while a paused click reads 0.0000).
const INTERIOR_CROP = 0.36; // central ~28% — the opaque dome, no transparent shadow border

/**
 * Fraction of INTERIOR pixels that changed by > DELTA_THRESHOLD between two same-size
 * frames (the blob-body render delta; the transparent hover-shadow border is excluded).
 */
function frameDelta(a: PNG, b: PNG): number {
    if (a.width !== b.width || a.height !== b.height) return 1; // size change = max delta
    const { width: w, height: h, data: da } = a;
    const { data: db } = b;
    const x0 = Math.floor(w * INTERIOR_CROP);
    const x1 = Math.ceil(w * (1 - INTERIOR_CROP));
    const y0 = Math.floor(h * INTERIOR_CROP);
    const y1 = Math.ceil(h * (1 - INTERIOR_CROP));
    let changed = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            total++;
            const d =
                Math.abs(da[i]! - db[i]!) +
                Math.abs(da[i + 1]! - db[i + 1]!) +
                Math.abs(da[i + 2]! - db[i + 2]!);
            if (d > DELTA_THRESHOLD) changed++;
        }
    }
    return total === 0 ? 0 : changed / total;
}

/**
 * The PEAK body-center delta over a CLICK BOUNCE — the confound-free pause witness.
 *
 * A click fires the one-shot spring impulse (`pulse`): the body radius overshoots then
 * rings back, a LARGE opaque-dome change. When the loop is RUNNING the bounce renders
 * (a big body-center delta); when the loop is PARKED (paused) the click does nothing
 * (the rAF is suspended — zero render). The pointer is moved AWAY before the baseline
 * frame so the `:hover` drop-shadow does not confound the read. The bounce is sampled
 * over `BOUNCE_SAMPLES` frames; the verdict is the PEAK delta (the bounce timing is
 * sub-frame so a single sample can miss the overshoot).
 */
async function clickBouncePeak(page: Page, canvas: Locator): Promise<number> {
    const box = await canvas.boundingBox();
    if (!box) return 0;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // Settle with the pointer FAR away (no hover shadow), then capture the at-rest baseline.
    await page.mouse.move(2, 2);
    await page.waitForTimeout(220);
    const baseline = await grab(canvas);
    // Click the body to fire the bounce; immediately move away so the hover shadow does
    // not contaminate the bounce frames.
    await page.mouse.click(cx, cy);
    await page.mouse.move(2, 2);
    let peak = 0;
    for (let s = 0; s < BOUNCE_SAMPLES; s++) {
        await page.waitForTimeout(BOUNCE_GAP_MS);
        const frame = await grab(canvas);
        peak = Math.max(peak, frameDelta(baseline, frame));
    }
    // Let the bounce fully settle + re-park before the next observation.
    await page.waitForTimeout(SETTLE_MS);
    return peak;
}

test.describe("blob-integration (π lane — fail-CLOSED, the pause-seam + context-bound + README gate)", () => {
    test("the v-model:paused seam PARKS the rAF loop — pause freezes the surface, resume restarts it", async ({
        page,
    }) => {
        // The interactive hero story wires a DockBackgroundToggle to the blob via
        // v-model:paused (the live π fixture). Resolved from the manifest (anti-drift).
        await page.goto(resolveScene("substrates", "blob-interaction").path);
        const blob = page.locator('[data-testid="interactive-blob"] canvas');
        await blob.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(SETTLE_MS);

        // RUNNING baseline — a click fires the bounce, which renders a large body-center
        // delta (the loop is live). This is the confound-free motion source (the pointer
        // is moved away so the hover drop-shadow does not pollute the read).
        const running = await clickBouncePeak(page, blob);
        expect(
            running,
            `the running blob's click-bounce body delta ${running.toFixed(4)} is below ${MOTION_DELTA_MIN} — a click did not render the spring impulse (the render is frozen/broken before any pause — not a valid pause witness)`,
        ).toBeGreaterThanOrEqual(MOTION_DELTA_MIN);

        // Click PAUSE (the DockBackgroundToggle). The seam must suspend the rAF — so a
        // click now fires NO bounce (the impulse cannot render on a parked loop). This is
        // the load-bearing pause witness: pause beats the click.
        const pauseToggle = page.locator('[data-testid="blob-pause-toggle"]');
        await pauseToggle.click();
        await page.waitForTimeout(220); // let the suspend settle
        const paused = await clickBouncePeak(page, blob);
        expect(
            paused,
            `after clicking pause the blob's click-bounce body delta ${paused.toFixed(4)} exceeds ${PARKED_DELTA_MAX} — a click STILL rendered a bounce, so the rAF loop did NOT park (the v-model:paused seam is a no-op; the HEAD dead-seam regression)`,
        ).toBeLessThanOrEqual(PARKED_DELTA_MAX);

        // Click RESUME. The loop must restart — a click fires the bounce again.
        await pauseToggle.click();
        await page.waitForTimeout(220);
        const resumed = await clickBouncePeak(page, blob);
        expect(
            resumed,
            `after clicking resume the blob's click-bounce body delta ${resumed.toFixed(4)} is below ${MOTION_DELTA_MIN} — a click did not render the bounce after resume (resume is a no-op)`,
        ).toBeGreaterThanOrEqual(MOTION_DELTA_MIN);
    });

    test("the multi-instance grid stays UNDER the live WebGL2-context cap (the re-cast holds)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        await page
            .locator('canvas[data-testid="goo-blob-canvas"]')
            .first()
            .waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(SETTLE_MS);

        // Count the LIVE WebGL2 contexts on the page: every <canvas> whose context can
        // be re-acquired as 'webgl2' is a live GL surface (a WatercolorDot is CSS/SVG —
        // it has no canvas, so it does NOT count). The re-cast routes the static color
        // register to WatercolorDots, so only the FEW GL heroes hold a context.
        const liveContexts = await page.evaluate(() => {
            let n = 0;
            for (const c of Array.from(document.querySelectorAll("canvas"))) {
                // getContext('webgl2') returns the SAME live context for a canvas that
                // already has one; a 2D/none canvas returns null.
                const gl = (c as HTMLCanvasElement).getContext("webgl2");
                if (gl) n++;
            }
            return n;
        });
        expect(
            liveContexts,
            `the goo-blob story holds ${liveContexts} live WebGL2 contexts — over the cap ${CONTEXT_CAP}. The static color register must route to WatercolorDot (CSS/SVG, zero GL context); only the few GL heroes may hold a context (AX.W16 F2; commit 9427536's context-exhaustion class)`,
        ).toBeLessThanOrEqual(CONTEXT_CAP);
        // And it must hold at least ONE (the hero is a real GL surface, not all re-cast away).
        expect(
            liveContexts,
            "the goo-blob story holds ZERO live WebGL2 contexts — the GL hero was entirely re-cast away (the substrate-with-consumer invariant: the GL blob must still ship a live hero)",
        ).toBeGreaterThanOrEqual(1);
    });

    test("README 'Exposed' table is CONSISTENT with GooBlob's defineExpose (doc-vs-code)", async () => {
        const readme = readFileSync(
            `${LIBRARY_ROOT}src/components/custom/goo-blob/README.md`,
            "utf8",
        );
        const sfc = readFileSync(
            `${LIBRARY_ROOT}src/components/custom/goo-blob/GooBlob.vue`,
            "utf8",
        );

        // The exposed SURFACE = the defineExpose members + the prop/emit names (the
        // pause seam is reachable via BOTH the imperative pause()/resume() AND the
        // v-model:paused prop, so a method documented as a prop counts as exposed).
        const exposeMatch = sfc.match(/defineExpose\(\{([\s\S]*?)\}\)/);
        const exposeBlock = exposeMatch?.[1] ?? "";
        const exposedNames = new Set(
            [...exposeBlock.matchAll(/\b([a-zA-Z_]\w*)\b/g)].map((m) => m[1]!),
        );
        // Props/emits also count as the public seam.
        for (const m of sfc.matchAll(/\bemit\(["']update:(\w+)["']/g)) {
            exposedNames.add(m[1]!);
            exposedNames.add(`${m[1]!}`);
        }
        // The `paused` prop backs pause()/resume(); record the prop name + the verbs.
        if (/\bpaused\??:/.test(sfc)) {
            exposedNames.add("paused");
            exposedNames.add("pause");
            exposedNames.add("resume");
        }

        // Parse the README "Exposed (via `defineExpose`)" table: each row's leading
        // cell names a member — `nudge()`, `setMood(m)`, `currentMood`, or a combined
        // `pause()` / `resume()`. Extract only the member NAME(S) (the identifier(s)
        // that immediately precede a `(` OR stand alone as a bare member), NOT the
        // call ARGS (`setMood(m)` documents `setMood`, never the arg `m`).
        const exposedSection = readme.split(/### Exposed/)[1]?.split(/\n###/)[0] ?? "";
        const documented = new Set<string>();
        for (const row of exposedSection.matchAll(/^\|\s*`([^`]+)`/gm)) {
            const cell = row[1]!;
            // A backtick cell may hold multiple members joined by `/` — each is either
            // `name(args)` (a method) or a bare `name` (a ref/value). Take the name
            // that precedes `(`, else the whole bare token. Drop call ARGS entirely.
            for (const part of cell.split("/")) {
                const method = part.match(/([a-zA-Z_]\w*)\s*\(/);
                if (method) {
                    documented.add(method[1]!);
                } else {
                    const bare = part.match(/([a-zA-Z_]\w*)/);
                    if (bare) documented.add(bare[1]!);
                }
            }
        }

        const missing = [...documented].filter((d) => !exposedNames.has(d));
        expect(
            missing,
            `the README "Exposed" table documents members NOT in GooBlob.vue's defineExpose/prop surface: ${missing.join(", ")} — the doc drifted from the code (the HEAD pause/resume-in-table-not-in-expose class). Exposed surface: ${[...exposedNames].sort().join(", ")}`,
        ).toEqual([]);
    });
});
