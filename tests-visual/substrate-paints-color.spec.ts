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
//            DIFFERENTIALLY. The verdict is the fraction of sampled pixels where the
//            live composite differs from the SAME region captured with the canvas
//            hidden — i.e. the canvas's OWN contribution, with the story's ground
//            subtracted rather than guessed at. Measured on this device: 0.166 live,
//            0.000 with the canvas dropped from the composite. The metric is NOT W08
//            blob-render.spec.ts's composite-vs-modal-colour coverage, so no subset
//            relation is claimed between the two bands — the numbers are not
//            commensurable.
//
//            THE TWO BOUNDS READ DIFFERENT REGIONS, and that is the point (#50 γ3).
//            · MIN asks "did the canvas paint ANYTHING", so it reads the WHOLE interior
//              inset box — the region its measured 0.166 / 0.000 pair was taken on.
//            · MAX asks "did a transparent MARGIN survive", and a margin that is really
//              the studio stage card's own `overflow-hidden` clip is not the blob's. The
//              canvas is 160% of its wrapper and the stage clips it, so part of the
//              readback box shows the page BEHIND the stage — pixels where the canvas
//              cannot paint at all, identical in the live and baseline reads by
//              construction, and therefore pure DILUTION of any coverage fraction. MAX
//              reads the interior INTERSECTED with the canvas's unclipped rect: the
//              pixels the canvas is actually allowed to paint into.
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
// BLOB CEILING — the SECOND blob plant (#50 γ3), because until it existed the
//   non-flood ceil had never been SEEN to fail and was therefore theatre by this
//   file's own standard. The canvas is given an OPAQUE background, so every pixel it
//   is allowed to paint contributes to the composite and no transparent margin
//   survives — which is exactly the flood class, expressed at the compositor rather
//   than in the shader. Two alternatives were considered and rejected:
//     · a SHADER flood (the black-aurora idiom) would mutate `src/components/blob`'s
//       WebGL2 arm — a path #50 W1 deletes entire, so the plant would be born with a
//       death date one wave away;
//     · driving the studio configurator to a flooding radius would make the plant
//       depend on the physics admitting a flood at all — and #50 W3's energy ceiling
//       exists precisely to forbid one, so the plant could stop biting for the RIGHT
//       reason and read as a hollow gate.
//   The background plant is honest for what this readback MEASURES: the metric is the
//   canvas element's own contribution to the composite, and an opaque background is
//   that contribution at full coverage. `grabBlobBaseline` hides the canvas with
//   `opacity: 0`, which hides the background with it, so the baseline stays the true
//   ground and the differential is the flood.
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
type Plant = "black-aurora" | "blob-blank" | "blob-flood";
const PI_PLANT = process.env.PI_PLANT ?? "";

// `all` drives the two ARM-COMPATIBLE plants, one per floor. `blob-flood` is
// deliberately OUTSIDE it: it and `blob-blank` are mutually exclusive mutations of the
// SAME element — one hides the canvas, one paints it opaque — and `opacity: 0` wins
// over a background, so folding the flood into `all` would silently retire the blank
// bite AND leave the ceiling untested. The flood arm gets its own invocation
// (`gate:pixel-floor:planted:flood`), and `pi-gate-verify.mjs --plant=` is told which
// plant ran so it can pin the assertion that had to bite.
const planted = (kind: Plant): boolean =>
    PI_PLANT === kind || (PI_PLANT === "all" && kind !== "blob-flood");

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

// MAGENTA, not a neutral: the differential threshold is |ΔR|+|ΔG|+|ΔB| > 40, and
// `#ff00ff` scores ≥ 255 against EVERY grey (510 − g) and against both the light and
// dark card grounds this story paints on. A plant colour that could coincide with the
// ground somewhere would under-report its own flood.
const FLOOD_PLANT_COLOR = "#ff00ff";

/** BLOB CEILING: every paintable pixel of the canvas contributes — the flood class. */
async function plantFloodBlob(page: Page): Promise<void> {
    if (!planted("blob-flood")) return;
    await page.addStyleTag({
        content: `canvas[data-testid="goo-blob-canvas"] { background: ${FLOOD_PLANT_COLOR} !important; }`,
    });
    console.log(
        `PLANT blob-flood: canvas background forced to ${FLOOD_PLANT_COLOR} — no transparent margin survives`,
    );
}

// ── the readback REGION (#50 γ3) ─────────────────────────────────────────────
//
// A region is expressed in FRACTIONS of the readback box, never in pixels: the box is
// a composited element screenshot at the device scale factor, so fractions survive both
// the DPR and any layout move, and a rect measured in CSS pixels maps onto the decoded
// PNG without carrying a scale term.
interface Region {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

const insetRegion = (inset: number): Region => ({
    x0: inset,
    y0: inset,
    x1: 1 - inset,
    y1: 1 - inset,
});

const intersectRegion = (a: Region, b: Region): Region => ({
    x0: Math.max(a.x0, b.x0),
    y0: Math.max(a.y0, b.y0),
    x1: Math.min(a.x1, b.x1),
    y1: Math.min(a.y1, b.y1),
});

const regionArea = (r: Region): number =>
    Math.max(0, r.x1 - r.x0) * Math.max(0, r.y1 - r.y0);

/**
 * The sub-rect of the canvas's readback box that the canvas is actually ALLOWED to
 * paint into — its bounding box intersected with every clipping ancestor.
 *
 * This is a PAINT fact, read from layout, and it is why the ceiling can bite at all.
 * The studio stage card is `overflow-hidden` and the canvas is 160% of its wrapper, so
 * the canvas overflows the card and the compositor discards the overflow. An element
 * screenshot still captures the whole bounding box, and outside the clip it captures
 * whatever the PAGE paints there — pixels the canvas cannot touch, identical in the
 * live and baseline reads, and therefore incapable of ever registering as coverage. A
 * ceiling measured over them is measuring a margin the stage owns, not one the blob
 * left.
 *
 * The ROOT element is excluded from the walk by design: its overflow propagates to the
 * viewport (it is a scroll port, not a paint clip) and Playwright captures an element
 * screenshot beyond the viewport, so folding it in would subtract pixels the readback
 * really does contain.
 *
 * Rect intersection is a rectangular approximation of a possibly ROUNDED clip — the
 * corner nibble a `rounded-card` takes is a handful of pixels and is not modelled. It
 * can only make the region slightly OPTIMISTIC, i.e. dilute the ceiling a hair, never
 * fabricate coverage.
 *
 * Read AFTER `scrollIntoViewIfNeeded`, at the same scroll position the screenshot is
 * taken at, or the intersection describes a different frame than the pixels do.
 */
async function unclippedRegion(canvas: Locator): Promise<Region> {
    return canvas.evaluate((el) => {
        const box = el.getBoundingClientRect();
        let left = box.left;
        let top = box.top;
        let right = box.right;
        let bottom = box.bottom;
        for (
            let p = el.parentElement;
            p && p !== document.documentElement;
            p = p.parentElement
        ) {
            const cs = getComputedStyle(p);
            const clips =
                cs.overflowX !== "visible" ||
                cs.overflowY !== "visible" ||
                cs.clipPath !== "none" ||
                cs.contain.split(/\s+/).includes("paint");
            if (!clips) continue;
            const pr = p.getBoundingClientRect();
            left = Math.max(left, pr.left);
            top = Math.max(top, pr.top);
            right = Math.min(right, pr.right);
            bottom = Math.min(bottom, pr.bottom);
        }
        return {
            x0: (left - box.left) / box.width,
            y0: (top - box.top) / box.height,
            x1: (right - box.left) / box.width,
            y1: (bottom - box.top) / box.height,
        };
    });
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
        motion = coverageDiff(next, previous, BLOB_INTERIOR, COLOR_DIFF_THRESHOLD);
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
const BLOB_INTERIOR = insetRegion(BLOB_INTERIOR_INSET);
// The DIFFERENTIAL band (live composite vs the canvas-hidden baseline). MEASURED on
// this device, both arms: live 0.166, canvas dropped 0.000 — so 0.1 sits between the
// two states with the green read 1.66× above it, and the floor is kept where it was
// rather than widened. (Under the OLD composite-vs-modal-colour measure the same
// dropped canvas read 0.195 and PASSED this same MIN; the separation is the metric's,
// not the constant's.)
const BLOB_COVERAGE_MIN = 0.1; // W00 LOOSE floor: green 0.166 / blank 0.000, WHOLE interior
// The ceil is NOT retuned by #50 γ3 — 0.7 stands exactly where W00 put it. What γ3
// gives it is a plant it can be SEEN to fail against (`blob-flood`) and its own
// PAINTABLE region: the interior intersected with the canvas's unclipped rect, so the
// ceiling scores a flood at the share of pixels the canvas could actually reach rather
// than diluting it with the stage card's clip. The two blob bounds therefore read the
// same frames over different denominators, and both are logged. (W08
// blob-render.spec.ts narrows the flood side to 0.55 on ITS own metric; still no subset
// relation is claimed — the numbers remain non-commensurable.)
const BLOB_COVERAGE_MAX = 0.7; // W00 LOOSE ceil, over the PAINTABLE interior
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
 * DIFFERENTIAL coverage = fraction of pixels IN `region` where the LIVE composite
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
function coverageDiff(
    live: PNG,
    base: PNG,
    region: Region,
    threshold: number,
): number {
    if (live.width !== base.width || live.height !== base.height) {
        throw new Error(
            `blob differential readback: live ${live.width}×${live.height} vs baseline ${base.width}×${base.height} — the readback region MOVED between the baseline and the live frame, so the per-pixel difference is meaningless. RED: never resize to force a comparison.`,
        );
    }
    const { width: w, height: h, data: L } = live;
    const B = base.data;
    const x0 = Math.floor(w * region.x0);
    const y0 = Math.floor(h * region.y0);
    const x1 = Math.ceil(w * region.x1);
    const y1 = Math.ceil(h * region.y1);
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
    if (total === 0) {
        throw new Error(
            `blob differential readback: the sample region [${region.x0},${region.y0}]-[${region.x1},${region.y1}] is EMPTY over a ${w}×${h} readback — a fraction over zero pixels is not a verdict. RED: never return a coverage nobody measured.`,
        );
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
        await plantFloodBlob(page);

        // THE CEILING'S OWN REGION (#50 γ3), measured before any readback and at the
        // scroll position the screenshots are taken at. `scrollIntoViewIfNeeded` is
        // Playwright's own pre-screenshot act, done here explicitly so the rects and the
        // pixels describe the same frame.
        await blobCanvas.scrollIntoViewIfNeeded();
        const paintable = await unclippedRegion(blobCanvas);
        const ceilingRegion = intersectRegion(BLOB_INTERIOR, paintable);
        const paintableShare = regionArea(ceilingRegion) / regionArea(BLOB_INTERIOR);
        expect(
            regionArea(ceilingRegion),
            `the blob canvas has NO unclipped interior: its bounding box intersected with every clipping ancestor leaves [${paintable.x0.toFixed(3)},${paintable.y0.toFixed(3)}]-[${paintable.x1.toFixed(3)},${paintable.y1.toFixed(3)}], which misses the interior inset box entirely. The canvas is then wholly hidden behind the stage clip and NOTHING it paints can be read — RED, never a coverage over zero pixels.`,
        ).toBeGreaterThan(0);
        console.log(
            `PI blob paintable=[${paintable.x0.toFixed(3)},${paintable.y0.toFixed(3)}]-[${paintable.x1.toFixed(3)},${paintable.y1.toFixed(3)}] paintableShareOfInterior=${paintableShare.toFixed(3)}`,
        );

        // The BASELINE, taken ONCE and AFTER the plant: the composite with the canvas
        // hidden. Order is load-bearing — under `PI_PLANT` the plant's own permanent
        // hide outlives this helper's scoped one, so live ≡ baseline, the differential
        // collapses to ~0 and the floor REDs at MIN. On the green run the helper
        // restores the canvas and the differential IS the droplet.
        const baseline = await grabBlobBaseline(page, blobCanvas);

        // Read N frames per run; each verdict is the PEAK coverage (the droplet
        // breathes/orbits, so coverage oscillates — the peak is the most-filled
        // frame, which must STILL leave a transparent margin). ONE screenshot per
        // frame, scored twice: the floor over the whole interior, the ceiling over the
        // paintable sub-rect.
        const floorPeaks: number[] = [];
        const ceilPeaks: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let floorPeak = 0;
            let ceilPeak = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const frame = await grab(blobCanvas);
                const whole = coverageDiff(
                    frame,
                    baseline,
                    BLOB_INTERIOR,
                    COLOR_DIFF_THRESHOLD,
                );
                const painted = coverageDiff(
                    frame,
                    baseline,
                    ceilingRegion,
                    COLOR_DIFF_THRESHOLD,
                );
                if (whole > floorPeak) floorPeak = whole;
                if (painted > ceilPeak) ceilPeak = painted;
                await page.waitForTimeout(80);
            }
            floorPeaks.push(floorPeak);
            ceilPeaks.push(ceilPeak);
        }
        const coverage = median(floorPeaks);
        const paintedShare = median(ceilPeaks);
        console.log(
            `PI blob coverage=${coverage.toFixed(3)} floor=${BLOB_COVERAGE_MIN} · paintedShare=${paintedShare.toFixed(3)} ceil=${BLOB_COVERAGE_MAX}`,
        );

        expect(
            coverage,
            `blob coverage ${coverage.toFixed(3)} is below the non-blank floor ${BLOB_COVERAGE_MIN} — the blob did not paint (blank/black canvas)`,
        ).toBeGreaterThanOrEqual(BLOB_COVERAGE_MIN);
        expect(
            paintedShare,
            `blob coverage ${paintedShare.toFixed(3)} of the PAINTABLE interior (${paintableShare.toFixed(3)} of the inset box; the rest is behind the stage card's clip) exceeds the non-flood ceil ${BLOB_COVERAGE_MAX} — the blob FLOODED the canvas (no transparent margin)`,
        ).toBeLessThanOrEqual(BLOB_COVERAGE_MAX);
    });
});
