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
//   BLOB   — BLOB_CONFIG_DEFAULTS: the LOOSE non-flood COVERAGE band 0.10–0.70, read
//            DIFFERENTIALLY. The verdict is the fraction of interior pixels where the
//            live composite differs from the SAME region captured with the canvas
//            hidden — i.e. the canvas's OWN contribution, with the story's ground
//            subtracted rather than guessed at. Measured on this device: 0.166 live,
//            0.000 with the canvas dropped from the composite. Catches the blank (→0)
//            at MIN and the flood at MAX. The metric is NOT W08 blob-render.spec.ts's
//            composite-vs-modal-colour coverage, so no subset relation is claimed
//            between the two bands — the numbers are not commensurable.
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
//
//   That plant did not bite either while the floor measured the composite against its
//   own MODAL COLOUR. The canvas box is 160% of the wrapper and composites the whole
//   studio stage — badge, config panel, prose, dock — a ground that is nowhere near
//   uniform, so 0.195 of the interior differed from the modal colour with the canvas
//   verifiably GONE and the [0.1, 0.7] band passed a dead canvas. A lower bound that
//   cannot separate dead-canvas from painted-blob is vacuous for precisely the class
//   it owns, so the readback is now DIFFERENTIAL: the same region is captured with the
//   canvas hidden, and coverage is measured live-vs-that-baseline. The plant then
//   pins the live frames ONTO the baseline (its hide outlives the baseline helper's)
//   and the differential collapses to 0.000 — a real, measured bite.
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

/**
 * The BASELINE half of the blob differential readback: the SAME composited region
 * with the canvas dropped out of it, i.e. everything the story paints BEHIND (and
 * over) the canvas. `live − baseline` is then the canvas's own contribution and
 * nothing else.
 *
 * The hide is a style element carrying a UNIQUE id so its removal cannot disturb any
 * other injected style — in particular NOT `plantBlankBlob`'s (an `addStyleTag` node
 * with no id). That is load-bearing for the self-test: under the plant the permanent
 * hide survives this removal, so the live frames keep reading the baseline and the
 * differential collapses to ~0 — the floor REDs at MIN, which is the bite.
 * The selector matches on `data-testid`, the locator idiom the spec already uses.
 *
 * QUIET GROUND (measured, not assumed). The canvas box is 160% of the wrapper and
 * composites the whole studio stage — badge, config panel, prose, dock — and at
 * renderer-ready the page's ENTRANCE reveal is still running: two canvas-hidden reads
 * 0.7s apart differed over 0.191 of the interior, which a stale baseline would charge
 * to the canvas (that is exactly the 0.191 the planted arm read before this wait).
 * The motion is transient — measured 0.000 between hidden reads once settled, and
 * 0.000 again 2.4s later — so the baseline is taken only after two consecutive hidden
 * reads agree to within `BLOB_GROUND_QUIET_EPSILON`. A ground that never quiets
 * hard-fails: a differential against a moving baseline measures the page, not the paint.
 */
const BLOB_BASELINE_STYLE_ID = "pi-blob-baseline-hide";
const BLOB_GROUND_QUIET_EPSILON = 0.002; // settled ground measures 0.000; this is slack
const BLOB_GROUND_QUIET_TIMEOUT_MS = 30_000;

async function grabBlobBaseline(page: Page, canvas: Locator): Promise<PNG> {
    await page.evaluate((id) => {
        const style = document.createElement("style");
        style.id = id;
        style.textContent =
            'canvas[data-testid="goo-blob-canvas"] { opacity: 0 !important; }';
        document.head.appendChild(style);
    }, BLOB_BASELINE_STYLE_ID);
    await page.waitForTimeout(150); // let the compositor land the hide

    let previous = await grab(canvas);
    let quiet: PNG | null = null;
    let motion = 1;
    const deadline = Date.now() + BLOB_GROUND_QUIET_TIMEOUT_MS;
    while (Date.now() < deadline) {
        await page.waitForTimeout(300);
        const next = await grab(canvas);
        motion = interiorCoverageDiff(
            next,
            previous,
            BLOB_INTERIOR_INSET,
            COLOR_DIFF_THRESHOLD,
        );
        previous = next;
        if (motion <= BLOB_GROUND_QUIET_EPSILON) {
            quiet = next;
            break;
        }
    }

    await page.evaluate((id) => {
        document.getElementById(id)?.remove();
    }, BLOB_BASELINE_STYLE_ID);
    await page.waitForTimeout(150); // …and land the restore before the live reads

    if (!quiet) {
        throw new Error(
            `blob differential readback: the ground behind the canvas never went quiet (last motion ${motion.toFixed(3)} > ${BLOB_GROUND_QUIET_EPSILON} after ${BLOB_GROUND_QUIET_TIMEOUT_MS}ms). A baseline that moves charges page motion to the canvas — RED, never a silent stale baseline.`,
        );
    }
    console.log(`PI blob baseline groundMotion=${motion.toFixed(3)}`);
    return quiet;
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
// The DIFFERENTIAL band (live composite vs the canvas-hidden baseline). MEASURED on
// this device, both arms: live 0.166, canvas dropped 0.000 — so 0.1 sits between the
// two states with the green read 1.66× above it, and the floor is kept where it was
// rather than widened. (Under the OLD composite-vs-modal-colour measure the same
// dropped canvas read 0.195 and PASSED this same MIN; the separation is the metric's,
// not the constant's.) The ceil is unchanged and NOT exercised by the blank plant —
// the flood class is W08 blob-render.spec.ts's, on its own metric.
const BLOB_COVERAGE_MIN = 0.1; // W00 LOOSE floor: green 0.166 / blank 0.000
const BLOB_COVERAGE_MAX = 0.7; // W00 LOOSE ceil (the flood side; W08 narrows to 0.55)
const BLOB_FRAMES = 6; // read back N frames; verdict over the peak
const ANTI_FLAKE_RUNS = 3; // 3-run named-region baseline (median verdict)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| live-vs-baseline = "the canvas painted here"

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
 * DIFFERENTIAL coverage = fraction of INTERIOR-INSET pixels where the LIVE composite
 * differs from the CANVAS-HIDDEN baseline by a perceptual threshold. That difference
 * is, by construction, the canvas's OWN contribution to the composite: everything
 * else in the region is identical between the two reads.
 *
 * This replaces a composite-vs-MODAL-COLOUR measure, which was vacuous for the exact
 * class the lower bound owns. The story's backdrop behind the canvas is NOT uniform,
 * so a large share of interior pixels differs from the composite's modal colour with
 * the canvas fully dropped — measured 0.195 under `PI_PLANT=blob-blank`, i.e. a dead
 * canvas sailed through a [0.1, 0.7] band. Only the differential can tell
 * dead-canvas from painted-blob on a non-uniform ground.
 *
 * Both reads are the SAME locator screenshot, so the dimensions must match; a
 * mismatch means the region moved between reads and the difference is meaningless.
 * That hard-fails rather than resizing — a silent resize would fabricate coverage.
 */
function interiorCoverageDiff(
    live: PNG,
    base: PNG,
    inset: number,
    threshold: number,
): number {
    if (live.width !== base.width || live.height !== base.height) {
        throw new Error(
            `blob differential readback: live ${live.width}×${live.height} vs baseline ${base.width}×${base.height} — the readback region MOVED between the baseline and the live frame, so the per-pixel difference is meaningless. RED: never resize to force a comparison.`,
        );
    }
    const { width: w, height: h, data: L } = live;
    const B = base.data;
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
                Math.abs(L[i]! - B[i]!) +
                Math.abs(L[i + 1]! - B[i + 1]!) +
                Math.abs(L[i + 2]! - B[i + 2]!);
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

        // The BASELINE, taken ONCE and AFTER the plant: the composite with the canvas
        // hidden. Order is load-bearing — under `PI_PLANT` the plant's own permanent
        // hide outlives this helper's scoped one, so live ≡ baseline, the differential
        // collapses to ~0 and the floor REDs at MIN. On the green run the helper
        // restores the canvas and the differential IS the droplet.
        const baseline = await grabBlobBaseline(page, blobCanvas);

        // Read N frames per run; the verdict is the PEAK coverage (the droplet
        // breathes/orbits, so coverage oscillates — the peak is the most-filled
        // frame, which must STILL leave a transparent margin).
        const peaks: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let peak = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const cov = interiorCoverageDiff(
                    await grab(blobCanvas),
                    baseline,
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
