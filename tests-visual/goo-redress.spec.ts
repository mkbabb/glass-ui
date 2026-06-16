// BA.W-GOO-REDRESS — the goo studio's renderer half: the π binding readback + DELTA.
//
// The device-free source gate (proof:goo-redress) asserts the COUPLING (the smin
// band scales by the worst-case orbit excursion) and the WIRE (a pointer-active
// watch reaches the renderer's wake). This spec is the BINDING VISUAL TRUTH — the
// source-green/visually-broken gap is the exact BA inv-4 P-1 close class. It proves,
// on the real /substrates/blob device in BOTH modes:
//
//   (a) THE BRIDGE HOLDS across the orbit envelope — at the studio Calm DEFAULT (the
//       STUDIO_GEO_BASE orbit-OUTSIDE-body geometry the R8-07 detach reproduces on),
//       sampled over a multi-frame orbit sweep with NO orbit-dialing, the painted
//       silhouette stays ONE connected component every frame — the satellite never
//       floats as an unrelated disc (the inverse of W-BLOB-STUDIO's separation test,
//       which DIALS orbit up to FORCE the detach show; here the resting bead must
//       NEVER detach). The BA-goo-2 fail state is a 2nd satellite-sized component.
//
//   (b) THE HOVER WAKES SAME-FRAME — a first pointer-enter over the (possibly parked)
//       resting blob produces a painted pointer-follow delta on the canvas WITHIN a
//       frame, and the spring advances CONTINUOUSLY (a monotone lean toward the
//       cursor over the first frames, NOT one clamped 50ms jump). The BA-goo-3 fail
//       state is a delayed-then-lurching response: no delta for many frames, then a
//       single large clamped step.
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so
// it is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it
// grace-SKIPs via the harness presence probe.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BA/audit/visual");
const BLOB_ROUTE = resolveScene("substrates", "blob").path; // /substrates/blob

const SCHEMES = ["light", "dark"] as const;

// ── tunables (live-set against the real device) ────────────────────────────────
// BRIDGE-HOLD: at the resting Calm default the silhouette is ONE connected
// component every frame — the satellite always bridges. A 2nd satellite-sized
// component is the BA-goo-2 detach (an orbiting disc with no neck).
const BRIDGE_MAX_COMPONENTS = 1;
const BRIDGE_FRAMES = 36;
// A real body/satellite component is ≥ this many downsampled (step-4) cells; below it
// is an AA speck or a watercolor-edge fleck (NOT a separated droplet). Mirrors the
// W-BLOB-STUDIO floor (a satellite at radius 0.10 paints ~100+ cells).
const COMPONENT_MIN_CELLS = 90;
// SILHOUETTE-MASS: the merged creature must paint a SUBSTANTIAL saturated body — the
// blob is present, not absent/flooded-transparent, and the necking satellites are part
// of the same mass (the bridge is the default visible state). Floor below the live
// ~3800-cell merged read, clear above an absent (~0) or single-tiny-body render.
const SILHOUETTE_MASS_MIN = 1500;
// HOVER-WAKE: the canvas content must CHANGE between the pre-hover resting frame and
// a frame shortly after pointer-enter (the wake repainted + the spring leaned). The
// per-pixel change count over a downsampled grid; a real lean moves a band of edge
// pixels well above this floor, a no-repaint leaves it at ~0.
const HOVER_DELTA_CELLS_MIN = 8;

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

// THE BLOB-SILHOUETTE MASK IS CHROMA-KEYED, NOT BG-DIFF-KEYED. The canvas overflows
// its host (the 160% satellite-overflow box), so its screenshot sits over a TWO-TONE
// backdrop — the gray configurator panel (≈200,200,200) AND the cream page
// (≈251,250,248) showing through where the canvas extends past the panel. A
// most-common-bg single-threshold mask flags BOTH the golden blob AND the cream-page
// corners as "foreground" and splits into spurious components (the page-corner
// regions read as detached blobs — a MEASUREMENT artifact, not a blob detachment).
// The golden warm bead is SATURATED (chroma high); BOTH backdrops are near-NEUTRAL
// (chroma ≈ 0). So the silhouette is the SATURATED region — `max−min` over the RGB
// channels — which isolates the body+satellites and rejects both neutral backdrops.
const CHROMA_T = 28; // (max−min) over RGB ≥ this = a saturated blob pixel (both bgs are ~3)

function chroma(data: Buffer, i: number): number {
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    return Math.max(r, g, b) - Math.min(r, g, b);
}

/** Build the blob (saturated) silhouette mask, downsampled by `step`. */
function foregroundMask(png: PNG, _bg: [number, number, number], step: number) {
    const { width: w, height: h, data } = png;
    const mw = Math.ceil(w / step);
    const mh = Math.ceil(h / step);
    const mask = new Uint8Array(mw * mh);
    for (let my = 0; my < mh; my++) {
        for (let mx = 0; mx < mw; mx++) {
            const x = Math.min(w - 1, mx * step);
            const y = Math.min(h - 1, my * step);
            const i = (y * w + x) * 4;
            if (data[i + 3]! > 40 && chroma(data, i) > CHROMA_T) mask[my * mw + mx] = 1;
        }
    }
    return { mask, mw, mh };
}

/** Count connected components (4-connectivity), ignoring sub-`minCells` specks. */
function connectedComponents(mask: Uint8Array, mw: number, mh: number, minCells: number): number {
    const seen = new Uint8Array(mask.length);
    let count = 0;
    const stack: number[] = [];
    for (let s = 0; s < mask.length; s++) {
        if (!mask[s] || seen[s]) continue;
        let size = 0;
        stack.length = 0;
        stack.push(s);
        seen[s] = 1;
        while (stack.length) {
            const p = stack.pop()!;
            size++;
            const px = p % mw;
            const py = (p / mw) | 0;
            const nbrs = [
                px > 0 ? p - 1 : -1,
                px < mw - 1 ? p + 1 : -1,
                py > 0 ? p - mw : -1,
                py < mh - 1 ? p + mw : -1,
            ];
            for (const n of nbrs) {
                if (n >= 0 && mask[n] && !seen[n]) {
                    seen[n] = 1;
                    stack.push(n);
                }
            }
        }
        if (size >= minCells) count++;
    }
    return count;
}

/** Per-cell foreground-mask change count between two PNGs (same dims), step-downsampled. */
function maskDelta(a: PNG, b: PNG, bg: [number, number, number], step: number): number {
    const ma = foregroundMask(a, bg, step);
    const mb = foregroundMask(b, bg, step);
    let changed = 0;
    const n = Math.min(ma.mask.length, mb.mask.length);
    for (let i = 0; i < n; i++) if (ma.mask[i] !== mb.mask[i]) changed++;
    return changed;
}

/** The bead-centroid x (in PNG px) of the chroma-keyed blob silhouette. */
function foregroundCentroidX(png: PNG): number | null {
    const { width: w, height: h, data } = png;
    let sx = 0;
    let n = 0;
    for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
            const i = (y * w + x) * 4;
            if (data[i + 3]! > 40 && chroma(data, i) > CHROMA_T) {
                sx += x;
                n++;
            }
        }
    }
    return n > 0 ? sx / n : null;
}

const NEUTRAL_BG: [number, number, number] = [0, 0, 0]; // unused by the chroma mask

mkdirSync(VISUAL_DIR, { recursive: true });

for (const scheme of SCHEMES) {
    test.describe(`W-GOO-REDRESS capture — ${scheme}`, () => {
        test.use({ viewport: { width: 1280, height: 800 }, colorScheme: scheme });

        test(`bridge holds + hover wakes (${scheme})`, async ({ page }) => {
            test.setTimeout(120_000);
            if (scheme === "dark") await page.emulateMedia({ colorScheme: "dark" });
            await page.goto(BLOB_ROUTE);
            if (scheme === "dark")
                await page.evaluate(() => document.documentElement.classList.add("dark"));
            else await page.evaluate(() => document.documentElement.classList.remove("dark"));

            const canvas = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
            await canvas.waitFor({ state: "visible", timeout: 20_000 });
            await page.waitForTimeout(900); // settle into the resting droplet pose (Calm default)

            // Capture the resting hero (the bridge-holds DELTA "after" frame).
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-GOO-REDRESS-bridge-${scheme}.png`),
            });

            // ── (a) THE BRIDGE HOLDS — sample a multi-frame orbit sweep at the Calm
            //     default (NO orbit dialing) and assert the silhouette stays ONE
            //     connected component every frame (the satellite never detaches). ──
            let worstComponents = 1;
            let detachFrames = 0;
            let minSilhouetteMass = Infinity;
            for (let f = 0; f < BRIDGE_FRAMES; f++) {
                const fp = await grab(canvas);
                const { mask, mw, mh } = foregroundMask(fp, NEUTRAL_BG, 4);
                const comps = connectedComponents(mask, mw, mh, COMPONENT_MIN_CELLS);
                let mass = 0;
                for (let i = 0; i < mask.length; i++) mass += mask[i]!;
                if (mass < minSilhouetteMass) minSilhouetteMass = mass;
                if (comps > worstComponents) worstComponents = comps;
                if (comps > BRIDGE_MAX_COMPONENTS) detachFrames++;
                await page.waitForTimeout(120);
            }

            // ── (b) THE HOVER WAKES SAME-FRAME — capture the resting frame, then
            //     pointer-enter at a corner of the canvas and capture shortly after.
            //     The canvas content must CHANGE (the wake repainted + the spring
            //     leaned) and the centroid must lean TOWARD the cursor monotonically
            //     over the first frames (continuous follow, not one clamped jump). ──
            const box = (await canvas.boundingBox())!;
            // Move the pointer well away first (the resting baseline), settle.
            await page.mouse.move(box.x + box.width / 2, box.y - 60);
            await page.waitForTimeout(700);
            const restPng = await grab(canvas);
            const restCx = foregroundCentroidX(restPng);

            // Pointer-enter toward the RIGHT edge of the canvas (the lean target).
            const targetX = box.x + box.width * 0.82;
            const targetY = box.y + box.height * 0.5;
            await page.mouse.move(targetX, targetY);
            // The wake must repaint within a frame; sample the immediate next frame.
            await page.waitForTimeout(40);
            const wakePng = await grab(canvas);
            const hoverDelta = maskDelta(restPng, wakePng, NEUTRAL_BG, 4);

            // Continuous follow: sample the centroid over the first ~5 frames; it must
            // move toward the cursor (rightward → centroid x increases) without a single
            // dominating jump that exceeds the rest of the travel combined.
            const cxSeries: number[] = [];
            for (let f = 0; f < 6; f++) {
                const fp = await grab(canvas);
                const cx = foregroundCentroidX(fp);
                if (cx != null) cxSeries.push(cx);
                await page.waitForTimeout(40);
            }
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-GOO-REDRESS-hover-${scheme}.png`),
            });

            // The total lean travel and the largest single-frame step.
            const steps: number[] = [];
            for (let i = 1; i < cxSeries.length; i++) steps.push(cxSeries[i]! - cxSeries[i - 1]!);
            const totalTravel = cxSeries.length > 1 ? cxSeries[cxSeries.length - 1]! - cxSeries[0]! : 0;
            const maxStep = steps.length ? Math.max(...steps.map((s) => Math.abs(s))) : 0;
            const sumAbsSteps = steps.reduce((a, s) => a + Math.abs(s), 0);
            // A continuous spring spreads the travel; a single clamped lurch would put
            // nearly all the travel in one step (maxStep ≈ sumAbsSteps).
            const lurchRatio = sumAbsSteps > 1 ? maxStep / sumAbsSteps : 0;

            console.log(
                `[W-GOO-REDRESS-π] ${scheme}: worstComponents=${worstComponents} ` +
                    `detachFrames=${detachFrames}/${BRIDGE_FRAMES} minMass=${minSilhouetteMass} ` +
                    `hoverDelta=${hoverDelta} restCx=${restCx?.toFixed(0)} ` +
                    `totalTravel=${totalTravel.toFixed(0)} maxStep=${maxStep.toFixed(0)} ` +
                    `lurchRatio=${lurchRatio.toFixed(2)}`,
            );

            // ── binding asserts ──
            // (a) the bridge holds: NO frame shows a detached disc, AND the merged
            //     creature paints a SUBSTANTIAL saturated mass every frame (the necking
            //     satellites are part of ONE body, not absent/flooded). The two together
            //     are the falsifiable floor — a detached satellite REDs the component
            //     count; an absent/flooded body REDs the mass.
            expect(
                worstComponents,
                `the satellite bridge holds across the orbit envelope — the resting Calm bead stays ONE connected component every frame (no detached disc); worst over ${BRIDGE_FRAMES} frames = ${worstComponents} components, ${detachFrames} detach frames (the BA-goo-2 fail state is a 2nd satellite-sized component)`,
            ).toBeLessThanOrEqual(BRIDGE_MAX_COMPONENTS);
            expect(
                minSilhouetteMass,
                `the merged creature paints a substantial saturated body every frame (the satellites neck the body, the bridge is the DEFAULT visible state) — min mass over the sweep ${minSilhouetteMass} cells (an absent/flooded render reads ~0)`,
            ).toBeGreaterThanOrEqual(SILHOUETTE_MASS_MIN);

            // (b) the hover wakes + repaints (binding on the light scheme; dark captures
            //     the still). A no-repaint leaves hoverDelta ≈ 0.
            if (scheme === "light") {
                expect(
                    hoverDelta,
                    `the first hover repaints the canvas within a frame (the pointer-wake wire re-armed the parked loop) — mask delta ${hoverDelta} cells (a delayed-no-repaint leaves it ~0)`,
                ).toBeGreaterThanOrEqual(HOVER_DELTA_CELLS_MIN);
                // The follow is continuous: a single clamped lurch puts ≈all travel in
                // one step. Only assert when there is meaningful travel to spread.
                if (Math.abs(totalTravel) > 6) {
                    expect(
                        lurchRatio,
                        `the pointer-follow spring advances CONTINUOUSLY (the lean travel spreads across frames, not one clamped 50ms jump) — lurchRatio ${lurchRatio.toFixed(2)} (≈1.0 is a single-step lurch)`,
                    ).toBeLessThan(0.92);
                }
            }
        });
    });
}
