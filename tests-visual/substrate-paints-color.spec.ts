// AX.W00 — proof:substrate-paints-color, the SHARED substrate-paints-non-black
// readPixels primitive (the W07 aurora + W08 blob per-surface gates compose it).
//
// The CPU-oracle blindspot (slices 6 F2, 10 F1, 11 F1, 12 F4): the entire
// proof:aurora-* / proof:blob-* fleet is static-text / CPU-math — a BLACK live
// aurora and a FLOODED live blob both pass it. This spec mounts the REAL component
// on a REAL device, reads back the canvas, and asserts on the painted image.
//
// READBACK MECHANISM (AX.W00 orchestrator real-device fix). A WebGL2/WebGPU canvas
// is NOT reliably readable via `ctx.drawImage(canvas) + getImageData`: without
// `preserveDrawingBuffer:true` the drawing buffer reads EMPTY after compositing
// (the blob read 0.000 that way), and a raw readback GPU-stalls on software GL. The
// only robust cross-context readback is a COMPOSITED element screenshot
// (`locator.screenshot()`), decoded with pngjs — it captures exactly the displayed
// pixels, regardless of the GL context's preserveDrawingBuffer. On a dev box the
// real GPU (Metal) paints; a GPU-less CI runner SwiftShader-degrades (the gate
// driver SKIPs befitting-silent when no browser binary is installed).
//
//   AURORA — DEFAULT (initial preset) + best-effort each preset at t=1: the MEAN
//            max(R,G,B) over the INTERIOR clears a non-black floor. A blacked
//            render → mean ≈ 0 → RED. The per-preset hue/chroma parity is W10/W11;
//            W00 owns ONLY the non-black floor.
//   BLOB   — BLOB_CONFIG_DEFAULTS: the LOOSE non-flood COVERAGE band ~0.10–0.70 of
//            the canvas (fraction of pixels DIFFERING from the corner background —
//            a composited screenshot has no alpha, so the transparent margin reads
//            as background, and "painted" = "differs from the corner"). Catches BOTH
//            the flood (→1) AND the blank (→0). W08's TIGHT 0.25–0.6 droplet band is
//            a strict SUBSET (anything W08 passes, this passes).
//
// keyframes I-1/I-2 instrument design: the SCENES + preset keys are re-sourced from
// the manifest (pi-manifest.ts), and each readback is a NAMED-REGION baseline
// sampled 3× with an anti-flake MEDIAN verdict (a single flaky frame cannot flip it).

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS, sourcePresetKeys } from "./pi-manifest.ts";

// ── BJ.W-PIXEL-FLOOR-CI — the planted self-test bite ─────────────────────────
// A floor that has never been SEEN to fail is theatre, so `PI_PLANT` mutates the
// render and the CI job asserts the floors go RED
// (`pi-gate-verify.mjs --expect=planted-red`).
//
// Each floor gets the plant its own readback can SEE. That is not a detail: two
// plausible plants were measured and REJECTED because the readback was blind to
// them, and a plant the readback cannot see proves nothing.
//   · `.aurora-root { filter: brightness(0) }` applied — computed
//     `filter=brightness(0)` — while the canvas screenshot still read 88-176. The
//     composited-canvas capture path does not honour an ancestor CSS filter.
//   · No-op'ing the draw calls read 88-176 too: that is the palette-coloured
//     PLACEHOLDER GROUND behind the canvas, which is exactly how an unpainted
//     surface slips past a naive non-black floor.
//
// AURORA — the fragment shader is rewritten to emit opaque black BEFORE load. Real
// geometry, real draw calls, real compositing; only the computed colour changes. A
// live, armed WebGL2 path that paints black is precisely the CPU-oracle blindspot
// this floor exists to catch. (The prototypes patched are the ones the PAGE calls —
// never `getContext()` from the test side, the context-steal trap; the page keeps
// its own context.)
// BLOB   — the canvas is dropped from the composite with `opacity: 0` AFTER load.
//   The compositor honours that (unlike the filter above), so the readback sees a
//   canvas contributing no pixels — the blank/dead-context class the coverage
//   floor's lower bound owns. The shader plant is NOT used here: it was measured
//   NOT to bite the coverage metric, so the honest bite is the one that does.
type Plant = "black-aurora" | "blob-blank";
const PI_PLANT = process.env.PI_PLANT ?? "";
const planted = (kind: Plant): boolean => PI_PLANT === kind || PI_PLANT === "all";

/** AURORA: force every fragment shader to opaque black. Must precede `goto`. */
async function plantBlackAurora(page: Page): Promise<void> {
    if (!planted("black-aurora")) return;
    await page.addInitScript(() => {
        const gl = WebGL2RenderingContext.prototype;
        const fragments = new WeakSet<WebGLShader>();

        const realCreateShader = gl.createShader;
        gl.createShader = function (type: number) {
            const shader = realCreateShader.call(this, type);
            if (shader && type === this.FRAGMENT_SHADER) fragments.add(shader);
            return shader;
        };

        const realShaderSource = gl.shaderSource;
        gl.shaderSource = function (shader: WebGLShader, source: string) {
            if (!fragments.has(shader)) return realShaderSource.call(this, shader, source);
            const black = source.startsWith("#version 300 es")
                ? "#version 300 es\nprecision highp float;\nout vec4 planted;\nvoid main(){planted=vec4(0.0,0.0,0.0,1.0);}"
                : "precision highp float;\nvoid main(){gl_FragColor=vec4(0.0,0.0,0.0,1.0);}";
            return realShaderSource.call(this, shader, black);
        };
    });
    console.log("PLANT black-aurora: fragment shaders forced to opaque black");
}

/** BLOB: drop the canvas from the composite. Applied after the canvas mounts. */
async function plantBlankBlob(page: Page): Promise<void> {
    if (!planted("blob-blank")) return;
    await page.addStyleTag({
        content: "canvas.goo-blob-canvas { opacity: 0 !important; }",
    });
    console.log("PLANT blob-blank: canvas dropped from the composite");
}

// ── BJ.W-PIXEL-FLOOR-CI — forcing the WebGL floor path on a GPU-less runner ──
//
// `resolveRenderMode` (src/components/aurora/constants/renderMode.ts) applies a
// UNIVERSAL software-raster guard: a renderer string matching swiftshader/llvmpipe/
// basic-render forces the `"css"` substrate for ANY WebGL-arming mode, because a
// full-viewport software-rastered GL layer wedges input on a real user's machine.
// That guard is correct for users and fatal for this gate — on the ubuntu CI runner
// it means the WebGL floor path never runs and the pixel floor reads the static
// palette ground.
//
// The library's NAMED escape is the `forceWebGLUnderSoftwareRaster` runtime option,
// but it is a COMPONENT PROP: a spec that drives the routed demo cannot pass it. So
// the harness engages the SAME policy branch from the outside, by masking the
// `WEBGL_debug_renderer_info` extension the probe reads. `probeWebGL2Renderer`
// returns `null` for a masked extension, and `isSoftwareWebGLRenderer` maps `null`
// to `false` — its documented "never downgrade a renderer we cannot PROVE is
// software" branch. Scope: ONE extension name, the diagnostic adapter string only.
//
// SECOND, the substrate must be WebGL2 and not WebGPU. `data-aurora-substrate` is
// the resolved MODE ("webgl" vs "css"), NOT the engine: with `navigator.gpu`
// present the aurora arms the WebGPU (Dawn) backend underneath a `"webgl"` mode —
// measured on this dev box, where the demo's own renderer badge read
// `WebGPU · apple · metal-3` while the mode attribute said `webgl`. WebGPU-on-
// SwiftShader is the fragile path this wave was told NOT to gate on, so the harness
// removes `navigator.gpu` and the aurora takes the WebGL2 backend — the
// deterministic floor path. Which engine ACTUALLY ran is then asserted from the
// demo's `data-renderer` attribute, never assumed.
//
// Never `getContext()` on the live canvas (the context-steal trap that fabricates a
// black fallback); this patches prototypes the PAGE calls and reads DOM attributes.
const PI_FORCE_WEBGL = process.env.PI_FORCE_WEBGL !== "0";

async function forceWebGLFloorPath(page: Page): Promise<void> {
    if (!PI_FORCE_WEBGL) return;
    await page.addInitScript(() => {
        const proto = WebGL2RenderingContext.prototype;
        const real = proto.getExtension;
        proto.getExtension = function (name: string) {
            if (name === "WEBGL_debug_renderer_info") return null;
            return real.call(this, name);
        } as typeof proto.getExtension;

        Object.defineProperty(navigator, "gpu", {
            configurable: true,
            get: () => undefined,
        });
    });
}

/**
 * FAIL-ON-SKIP / PATH ASSERTION (BJ.W-PIXEL-FLOOR-CI, adjudicated ruling 5).
 *
 * The aurora placeholder GROUND is palette-COLORED, and an element screenshot
 * composites whatever sits behind a transparent canvas — so a DEAD GL path reads
 * non-black off the ground and the pixel floor passes vacuously. The floor is only
 * sound when the live path is proven to have run, so this asserts, BEFORE any
 * readback, that
 *   (a) the resolved MODE is `webgl`, not the `css` degrade the software-raster
 *       guard selects (`src/components/aurora/constants/renderMode.ts`);
 *   (b) the ENGINE that actually armed is `webgl2` — read off the demo's renderer
 *       badge (`data-renderer`, RendererStatus.vue), which reports the resolved
 *       `RendererStatus.engine`. The mode attribute alone does NOT witness this:
 *       `webgl` mode arms WebGPU wherever `navigator.gpu` exists;
 *   (c) the badge reports `data-state="ready"` and the canvas carries
 *       `aurora-canvas--armed` — `useAurora` sets both only when the backend
 *       readiness promise resolves, i.e. a real context was acquired.
 *
 * Every fact is read from ATTRIBUTES — never `getContext()`, which STEALS a live
 * canvas's context and fabricates the very black fallback this gate hunts.
 *
 * A `css` resolve, a non-WebGL2 engine, or an unarmed canvas is RED, never a skip:
 * a silent degrade is the `gate:unwired-gate-non-execution` this wave exists to cure.
 */
async function assertLiveWebGLPath(page: Page, canvas: Locator): Promise<void> {
    // The aurora sits BELOW the fold on this route (y≈874 in a 1280×800 viewport).
    // Playwright's `visible` is a non-empty box, NOT in-viewport — and the arm is
    // deferred behind an IntersectionObserver with `content-visibility: auto`, so an
    // off-screen aurora NEVER arms and the readback silently samples the placeholder
    // ground. Scroll it into view so the live path actually engages.
    await canvas.scrollIntoViewIfNeeded();

    const root = page.locator("[data-aurora-substrate]").first();
    await root.waitFor({ state: "attached", timeout: 20_000 });
    const substrate = await root.getAttribute("data-aurora-substrate");
    expect(
        substrate,
        `aurora resolved the "${substrate}" substrate, not the WebGL floor path — the software-raster guard degraded this runner to the static ground. A degrade is RED here, never a skip: the pixel floor reads the palette ground and passes vacuously on the css path. Force the WebGL path on this runner (BAND-GATES W2 §OPEN-5).`,
    ).toBe("webgl");

    await expect(
        canvas,
        `aurora canvas never armed (no "aurora-canvas--armed") — the backend readiness never resolved, so NO context was acquired and any non-black reading is the placeholder ground, not a live paint. RED, never a skip.`,
    ).toHaveClass(/aurora-canvas--armed/, { timeout: 30_000 });

    const badge = page.locator("output.renderer-status[data-renderer]").first();
    await expect(
        badge,
        `the aurora renderer badge never reached data-state="ready" — the backend did not arm. RED, never a skip.`,
    ).toHaveAttribute("data-state", "ready", { timeout: 30_000 });
    const engine = await badge.getAttribute("data-renderer");
    expect(
        engine,
        `aurora armed the "${engine}" engine, not the WebGL2 floor path. This gate reads back ONLY the deterministic WebGL2 path (WebGPU-on-SwiftShader is the fragile arm this wave does not gate on) — the harness removes navigator.gpu to force it, so a non-webgl2 engine here means the force failed. RED, never a skip.`,
    ).toBe("webgl2");
}

// ── tunables (the W00 LOOSE floors) ──────────────────────────────────────────
const AURORA_INTERIOR_INSET = 0.2; // sample the central 60% box (avoid edge fade)
const AURORA_MEAN_CHANNEL_FLOOR = 8; // interior MEAN max(R,G,B); real ≈237, planted-black ≈0.3
const BLOB_INTERIOR_INSET = 0.12; // exclude the outer rounded-corner band from coverage
const BLOB_COVERAGE_MIN = 0.1; // W00 LOOSE floor (W08 narrows to 0.25)
const BLOB_COVERAGE_MAX = 0.7; // W00 LOOSE ceil (W08 narrows to 0.55)
const BLOB_FRAMES = 6; // read back N frames; verdict over the peak
const ANTI_FLAKE_RUNS = 3; // 3-run named-region baseline (median verdict)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| over the modal bg = "painted"

// The aurora 12-preset drive on a real-GPU screenshot pass is well under this, but
// software-GL degrade + the procedural settle want generous headroom.
test.setTimeout(180_000);

/** Median of a numeric array (the robust 3-run anti-flake verdict). */
function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/**
 * MEAN per-pixel max(R,G,B) over the interior inset box — the non-black floor.
 *
 * The metric is the mean, not the maximum, because the readback region is the
 * canvas's BOUNDING BOX and the demo stage draws chrome over it — the nuclei
 * markers, the renderer badge, the hint caption — which are DOM siblings of the
 * aurora root, not part of the substrate. Against a MAX floor a single lit marker
 * pixel carries the whole assertion: the planted black-aurora self-test measured
 * maxChannel 88 over a canvas that was verifiably, entirely black, and passed.
 * The mean separates the two states by three orders of magnitude — 237.3 on the
 * real render against 0.3 on the planted black one — so a black substrate reds
 * however much demo chrome floats above it.
 */
function interiorMeanChannel(png: PNG, inset: number): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let sum = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            sum += Math.max(data[i]!, data[i + 1]!, data[i + 2]!);
            total++;
        }
    }
    return sum / total;
}

/**
 * The MODAL background RGB — the most-common 16-step-quantized colour over the whole
 * canvas. For a contained droplet that is the cream field. UNLIKE a 4-corner average
 * it is immune to the rounded-card clip's dark corner pixels (the goo-blob story
 * mounts each canvas in a `rounded-card overflow-hidden` cell, so the literal corners
 * fall OUTSIDE the clip and read dark — a corner-average false-floods even a contained
 * droplet, exactly what W08's blob-render.spec.ts robust metric corrects).
 */
function modalBackground(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const key =
            ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    let best = 0;
    let bestKey = 0;
    for (const [k, c] of counts) if (c > best) ((best = c), (bestKey = k));
    return [((bestKey >> 8) & 0xf) << 4, ((bestKey >> 4) & 0xf) << 4, (bestKey & 0xf) << 4];
}

/**
 * Coverage = fraction of INTERIOR-INSET pixels DIFFERING from the MODAL background by a
 * perceptual threshold. The inset excludes the rounded-corner band; the modal bg is
 * clip-robust. A contained droplet leaves a margin (coverage in-band), a flood fills it
 * (→1), a blank paints nothing (→0). W08's TIGHT band (0.25–0.55) is a strict SUBSET of
 * this LOOSE floor, measured on the SAME metric (subset-consistent by construction).
 */
function interiorCoverage(png: PNG, inset: number, threshold: number): number {
    const { width: w, height: h, data } = png;
    const bg = modalBackground(png);
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let differ = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const d =
                Math.abs(data[i]! - bg[0]!) +
                Math.abs(data[i + 1]! - bg[1]!) +
                Math.abs(data[i + 2]! - bg[2]!);
            if (d > threshold) differ++;
            total++;
        }
    }
    return differ / total;
}

test.describe("substrate-paints-color (π lane — fail-CLOSED)", () => {
    test("aurora paints a non-black interior on DEFAULT + every preset at t=1", async ({
        page,
    }) => {
        await plantBlackAurora(page);
        await forceWebGLFloorPath(page);
        await page.goto(PI_TARGETS.aurora.path);
        const auroraCanvas = page.locator("canvas.aurora-canvas").first();
        await auroraCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await assertLiveWebGLPath(page, auroraCanvas);

        // Re-source the preset keys (anti-drift manifest check) — the SCENES/preset
        // list is the source-of-truth manifest, never a hand list. The WALK below
        // covers every sourced key; the count is only the STALENESS witness, re-pinned
        // deliberately at each roster change. 17 is the on-disk count at wire time
        // (BJ.W-PIXEL-FLOOR-CI cured a stale 13 that RED-ed on staleness, not paint —
        // a false-RED would poison this gate's born-RED discipline on day one).
        // GF-AURORA W5 (PRESET-REDUCTION 17→10) re-pins this at its cut.
        const presetKeys = sourcePresetKeys();
        expect(presetKeys.length).toBe(17);

        const results: Record<string, number> = {};
        async function settleAndRead(label: string) {
            await page.waitForTimeout(600); // procedural loop → t≈1 steady state
            const reads: number[] = [];
            for (let r = 0; r < ANTI_FLAKE_RUNS; r++) {
                reads.push(interiorMeanChannel(await grab(auroraCanvas), AURORA_INTERIOR_INSET));
                await page.waitForTimeout(100);
            }
            results[label] = median(reads);
            // The LIVE-π discipline banks MEASURED FIGURES, never a claim: the JSON
            // report's stdout carries the number every labelled read actually saw, so
            // the banked artefact reproduces the real-vs-planted separation.
            console.log(
                `PI aurora ${label} meanChannel=${results[label]!.toFixed(1)} floor=${AURORA_MEAN_CHANNEL_FLOOR}`,
            );
        }

        // DEFAULT (the story's initial preset render) — the binding floor.
        await settleAndRead("DEFAULT");

        // The banked DELTA half: the composited element screenshot of the arm that
        // ran, named by arm so the green and planted captures coexist.
        await auroraCanvas.screenshot({
            path: `.cache/aurora-${PI_PLANT === "" ? "green" : PI_PLANT}.png`,
        });

        // The per-preset drive. The picker is the demo's OWN preset row
        // (`demo/stories/substrates/aurora/PresetPickerRow.vue`, slotted into
        // VizStudio's #presets): plain `type="button"` tiles carrying
        // `data-preset-tile` + `aria-pressed`, deliberately NOT `role="tab"` (an ARIA
        // contradiction the component rejects by name). The tile count must equal the
        // sourced key count and each click must LATCH `aria-pressed` — without both,
        // every labelled read re-measures DEFAULT and the 17-preset coverage this
        // floor reports is coverage it never obtained. There is no keyboard fallback:
        // a fallback that masks a dead primary is forbidden.
        const picker = page.locator("button[data-preset-tile]");
        const n = await picker.count();
        expect(
            n,
            `aurora preset picker resolved ${n} tiles against ${presetKeys.length} sourced keys — the walk cannot switch presets and every read would re-measure DEFAULT. RED, never a silent single-preset pass.`,
        ).toBe(presetKeys.length);
        for (let i = 0; i < presetKeys.length; i++) {
            await picker.nth(i).click();
            await expect(
                picker.nth(i),
                `preset tile ${presetKeys[i]} did not become active — the preset did not switch`,
            ).toHaveAttribute("aria-pressed", "true", { timeout: 5_000 });
            await settleAndRead(presetKeys[i]!);
        }

        // SENSITIVITY LIMIT — measured, not assumed. A preset carrying a low config
        // `alpha` is composited at that CSS opacity (`runtime.ts` syncPresentationAlpha
        // writes `canvas.style.opacity`), so the page ground reads THROUGH a dead
        // canvas and this composite metric cannot see the black. Measured under the
        // plant: every preset reads ~0.4 at opacity 1, SPEEDTEST reads 140.5 at
        // opacity 0.26. The floor therefore bites 17 of 18 reads; a black substrate on
        // a low-alpha preset is NOT covered here and belongs to the per-preset
        // hue/chroma parity gates (Family G W10/W11), which read chroma collapse
        // rather than a composite mean.
        const black = Object.entries(results).filter(
            ([, mean]) => !(mean > AURORA_MEAN_CHANNEL_FLOOR),
        );
        expect(
            black,
            `aurora painted a BLACK interior (mean channel <= ${AURORA_MEAN_CHANNEL_FLOOR}) for: ${black
                .map(([k, v]) => `${k}=${v.toFixed(1)}`)
                .join(", ")} — the black-canvas class the CPU oracles miss`,
        ).toEqual([]);
    });

    test("blob paints a contained non-flood droplet on BLOB_CONFIG_DEFAULTS", async ({
        page,
    }) => {
        // Half the enforced surface must witness its own path too: without the force
        // the blob arms Dawn wherever `navigator.gpu` exists, i.e. WebGPU-on-
        // SwiftShader on the runner — the fragile arm this wave was told NOT to gate
        // on. Force the deterministic WebGL2 path, then ASSERT which engine ran.
        await forceWebGLFloorPath(page);
        await page.goto(PI_TARGETS.blob.path);
        // The goo-blob story mounts SEVERAL <Blob> instances; the first is the
        // BLOB_CONFIG_DEFAULTS render.
        const blobCanvas = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });

        const blobBadge = page.locator("output.renderer-status[data-renderer]").first();
        await expect(
            blobBadge,
            `the blob renderer badge never reached data-state="ready" — the backend did not arm. RED, never a skip.`,
        ).toHaveAttribute("data-state", "ready", { timeout: 30_000 });
        expect(
            await blobBadge.getAttribute("data-renderer"),
            `blob armed a non-webgl2 engine — this gate reads back ONLY the deterministic WebGL2 path (WebGPU-on-SwiftShader is the fragile arm this wave does not gate on). RED, never a skip.`,
        ).toBe("webgl2");

        await plantBlankBlob(page);

        // Read N frames per run; the verdict is the PEAK coverage (the droplet
        // breathes/orbits, so coverage oscillates — the peak is the most-filled
        // frame, which must STILL leave a transparent margin).
        const peaks: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let peak = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const cov = interiorCoverage(
                    await grab(blobCanvas),
                    BLOB_INTERIOR_INSET,
                    COLOR_DIFF_THRESHOLD,
                );
                if (cov > peak) peak = cov;
                await page.waitForTimeout(80);
            }
            peaks.push(peak);
        }
        const verdict = median(peaks);
        console.log(
            `PI blob coverage=${verdict.toFixed(3)} band=[${BLOB_COVERAGE_MIN},${BLOB_COVERAGE_MAX}]`,
        );

        expect(
            verdict,
            `blob coverage ${verdict.toFixed(3)} is below the non-blank floor ${BLOB_COVERAGE_MIN} — the blob did not paint (blank/black canvas)`,
        ).toBeGreaterThanOrEqual(BLOB_COVERAGE_MIN);
        expect(
            verdict,
            `blob coverage ${verdict.toFixed(3)} exceeds the non-flood ceil ${BLOB_COVERAGE_MAX} — the blob FLOODED the canvas (no transparent margin)`,
        ).toBeLessThanOrEqual(BLOB_COVERAGE_MAX);
    });
});
