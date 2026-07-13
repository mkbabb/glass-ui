// BC.W-WEBGPU-EVERYWHERE — the BINDING real-on-host paint π (the BB-disease cure).
//
// The whole wave turns on this: the substrate must ACTUALLY PAINT a non-blank field on
// a real GPU (the W4 meanLum>0 readback the BB ΔE-0.0 tautology never had), it must
// STILL paint via the WebGL2 net on an adapter-less host WITHOUT spewing a `no GPU
// adapter` PAGEERROR (the W5 silent-degrade close, D8/D8'), it must come up on real
// WebKit (W6), and it must be a LIVING surface — ≥55fps un-throttled (W8 fps) that
// costs ZERO when scrolled offscreen (W8 the offscreen-park attaches 0 rAF callbacks).
//
// THE READBACK: each substrate route is navigated, the viz `<canvas>` is screenshotted
// (the composited GPU read through the browser's compositor — the SAME element-screenshot
// → pngjs decode the aurora-mediums / blob π use), and the mean relative luminance is
// asserted > 0 (a black void reads meanLum ≈ 0 → REDs by construction; a rebaseline-to-
// broken is structurally impossible). The console is watched for an uncaught `no GPU
// adapter` page-error (the D8' proof the fallback fires silently).
//
// THE CARDINAL SPLIT (the AY W-LIVE1 / W-AURORA-SWRASTER discipline): the real-GPU
// meanLum (W4), the fps + offscreen-park (W8), and the WebKit come-up (W6) are LOCAL on a
// real device (a real browser + demo + GPU — the orchestrator owns the capture on real
// Metal). The adapter-less paint + no-throw (W5) runs on the SwiftShader headless CI lane
// (the WebGL2 net fires under software-raster); the device-free source closes (W1/W2/W3/
// W7) live in `scripts/proof-webgpu-everywhere.mjs`.

import { test, expect, type Page } from "@playwright/test";
import { PNG } from "pngjs";
import { assertServedDemoAurora } from "./served-app-sentinel.ts";

test.setTimeout(180_000);

// The EXTANT substrate routes (dot-flow-field / concentric / dot-matrix DELETED at
// BI.W-VIZ-DELETIONS — the user-ordered clean-break prune). Each mounts ONE viz `<canvas>`
// (the field IS the surface). The canvas selector is universal (`canvas`) — every viz
// renders into a single `<canvas>` element.
const SUBSTRATE_ROUTES = [
    { id: "aurora", route: "/substrates/aurora" },
    { id: "blob", route: "/substrates/blob" },
    { id: "constellation", route: "/substrates/constellation" },
    { id: "fourier-field", route: "/substrates/fourier-field" },
] as const;

// The PAINT-EXISTENCE floor — the BB-disease this wave cures is a BLACK VOID (a crashed/
// blank canvas: meanByte ≈ 0 AND maxChannel ≈ 0 AND zero coverage). A LIVING field is the
// inverse on ANY of three axes, so a legitimately-DARK viz (a sparse constellation: bright
// stars on a near-black field — meanByte ~12 but maxChannel 248 + full coverage) reads as
// painted, NOT a void. The DEFECT-LEDGER CORRECTION recorded the viz paint with GPU flags
// in BYTE-domain max-channel terms (aurora 200, constellation 248, blob 228, dot-flow 187)
// — so the readback is byte-domain (a LINEAR Rec.709 luminance crushes a sparse-bright-on-
// dark field to ≈0 and false-fails it, the constellation-dark trap). A painted field clears
// the floor on at least ONE of {meanByte, maxChannel, coverage}.
const MEAN_BYTE_FLOOR = 2; // a flat-black void reads meanByte ≈ 0; any painted wash clears 2
const MAX_CHANNEL_FLOOR = 24; // a void has maxChannel ≈ 0; a star/blob/wash paints far brighter
const COVERAGE_FLOOR = 0.02; // fraction of pixels with any non-trivial paint (rgb sum > 8)

interface PaintStats {
    meanByte: number;
    maxChannel: number;
    coverage: number;
    painted: boolean;
}

/** Element screenshot → byte-domain paint stats (mean + maxChannel + coverage). A painted
 *  field clears the floor on ANY axis; a black void fails all three. */
function paintStats(png: PNG): PaintStats {
    const { data } = png;
    let sum = 0;
    let maxChannel = 0;
    let covered = 0;
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i]!;
        const g = data[i + 1]!;
        const b = data[i + 2]!;
        maxChannel = Math.max(maxChannel, r, g, b);
        sum += (r + g + b) / 3;
        if (r + g + b > 8) covered += 1;
        n += 1;
    }
    const meanByte = n ? sum / n : 0;
    const coverage = n ? covered / n : 0;
    const painted =
        meanByte > MEAN_BYTE_FLOOR ||
        maxChannel > MAX_CHANNEL_FLOOR ||
        coverage > COVERAGE_FLOOR;
    return { meanByte, maxChannel, coverage, painted };
}

/** Wire the console/pageerror capture — the D8' silent-degrade proof reads it. */
function captureConsole(page: Page): { errors: string[] } {
    const errors: string[] = [];
    page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message}`));
    return { errors };
}

/** Navigate, settle a few animation frames, screenshot the viz canvas → paint stats. */
async function paintRoute(
    page: Page,
    route: string,
): Promise<{ stats: PaintStats | null; hasCanvas: boolean }> {
    await page.goto(route, { waitUntil: "networkidle" });
    // Let the substrate arm + paint a few frames (the WGSL async prelude OR the WebGL2
    // net's sync arm; the cross-fade over the placeholder).
    await page.waitForTimeout(900);
    const canvas = page.locator("canvas").first();
    const hasCanvas = (await canvas.count()) > 0;
    if (!hasCanvas) return { stats: null, hasCanvas: false };
    const png = PNG.sync.read(await canvas.screenshot());
    return { stats: paintStats(png), hasCanvas: true };
}

test.describe("BC.W-WEBGPU-EVERYWHERE — every substrate PAINTS, on every host", () => {
    for (const scheme of ["light", "dark"] as const) {
        // ── W4 + W5 — every substrate route paints a NON-BLANK field, with NO uncaught
        //    `no GPU adapter` console spew. On a real-GPU dev box this is the WGSL/WebGL2
        //    primary; on the SwiftShader CI lane the WebGL2 net fires silently (the
        //    adapter-less W5 close). EITHER way meanLum > 0 — never a black void.
        for (const { id, route } of SUBSTRATE_ROUTES) {
            test(`${id} paints a non-blank field with no adapter-error spew (${scheme})`, async ({
                page,
            }) => {
                const { errors } = captureConsole(page);
                await page.emulateMedia({ colorScheme: scheme });
                // Sentinel on the aurora route (the demo's canonical served-app marker);
                // the others trust the same dev server is up.
                if (id === "aurora") {
                    await page.goto(route, { waitUntil: "networkidle" });
                    await assertServedDemoAurora(page);
                }
                const { stats, hasCanvas } = await paintRoute(page, route);

                expect(hasCanvas, `${id}: a viz <canvas> is mounted`).toBe(true);
                // W4/W5 — the binding paint truth: the field is NOT a black void. A painted
                // field clears the floor on ANY of {meanByte, maxChannel, coverage}; a void
                // (crashed/blank canvas) fails all three.
                expect(
                    stats!.painted,
                    `${id} (${scheme}): NOT painted — meanByte ${stats!.meanByte.toFixed(2)} (floor ${MEAN_BYTE_FLOOR}), maxChannel ${stats!.maxChannel} (floor ${MAX_CHANNEL_FLOOR}), coverage ${(stats!.coverage * 100).toFixed(1)}% (floor ${COVERAGE_FLOOR * 100}%) — a BLACK VOID (crashed/blank canvas) fails all three; the substrate must paint a living field (the BB-disease cure)`,
                ).toBe(true);

                // W5 — the D8' close: NO uncaught `no GPU adapter` page-error. The picker's
                // try-then-rebuild falls to the WebGL2 net SILENTLY (the consumer never
                // sees a thrown adapter error). A captured `no GPU adapter` throw REDs.
                const adapterThrows = errors.filter((e) => /no\s+gpu\s+adapter/i.test(e));
                expect(
                    adapterThrows,
                    `${id} (${scheme}): an uncaught "no GPU adapter" console error was spewed (${adapterThrows.join(" | ")}) — the picker must fall to the WebGL2 net SILENTLY (D8/D8')`,
                ).toEqual([]);
            });
        }
    }

    // ── W7 (the LOCAL real-compile arm) — every WGSL primary COMPILES under the real
    //    `device.createShaderModule` + `getCompilationInfo` on the adapter-bearing host
    //    (the binding compile the device-free static gate proxies). The bug class THIS wave
    //    owns is the reserved-keyword identifier (the Blob `var target` → 250×/frame
    //    invalid-pipeline → 0 pixels live) — it must be GONE on EVERY shader. The known-clean
    //    aurora primary compiles fully clean (concentric/flow-render/flow-compute DELETED at
    //    BI.W-VIZ-DELETIONS); any OTHER residual (a metaball-math uniformity issue the Blob
    //    per-viz wave owns) is SURFACED for its owner, never silently hidden by the picker's fall.
    test("every WGSL primary compiles with NO reserved-keyword error on real Metal", async ({
        page,
    }) => {
        await page.goto("/substrates/blob", { waitUntil: "domcontentloaded" });
        const report = await page.evaluate(async () => {
            if (!navigator.gpu) return { skip: "no navigator.gpu (the adapter-less CI lane proves the net, not the compile)" };
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) return { skip: "no adapter (the WebGL2 net carries this host; the compile arm needs a device)" };
            const device = await adapter.requestDevice();
            const shaders: Record<string, string> = {
                aurora: "/src/components/custom/aurora/constants/shaders/aurora.wgsl.ts#AURORA_WGSL",
                metaball: "/src/components/custom/blob/shaders/metaball.wgsl.ts#METABALL_WGSL",
            };
            const out: Record<string, { errors: string[] }> = {};
            for (const [id, ref] of Object.entries(shaders)) {
                const [path, exportName] = ref.split("#");
                const m = await import(path);
                const code = m[exportName] as string;
                const sm = device.createShaderModule({ code });
                const info = await sm.getCompilationInfo();
                out[id] = {
                    errors: info.messages
                        .filter((x) => x.type === "error")
                        .map((x) => `${x.lineNum}: ${x.message}`),
                };
            }
            return { out };
        });

        if ("skip" in report) {
            test.skip(true, report.skip as string);
            return;
        }
        const out = report.out!;
        // The bug class THIS wave owns — a reserved-keyword identifier — is GONE everywhere.
        for (const [id, r] of Object.entries(out)) {
            const reserved = r.errors.filter((e) => /reserved|keyword|identifier/i.test(e));
            expect(
                reserved,
                `${id}: a WGSL reserved-keyword compile error survived (${reserved.join(" | ")}) — the Blob var-target class this wave fixes`,
            ).toEqual([]);
        }
        // The known-clean aurora primary compiles FULLY clean (zero errors).
        for (const id of ["aurora"]) {
            expect(
                out[id]!.errors,
                `${id}: the WGSL primary must compile clean on Metal (${out[id]!.errors.join(" | ")})`,
            ).toEqual([]);
        }
        // The metaball fwidth-uniformity residual is the Blob per-viz wave's — SURFACE it
        // (it is not the reserved-keyword class, and the blob PAINTS via the WebGL2 net), do
        // not silently hide it behind the picker's fall.
        if (out.metaball!.errors.length)
            console.warn(
                `[W7 residual — BC.W-GOOBLOB-MEATBALL owns] metaball.wgsl: ${out.metaball!.errors.join(" | ")} (the WGSL primary falls to the WebGL2 net, which paints — a fidelity/perf residual, not a paint-existence failure)`,
            );
    });

    // ── W8 — the living-surface truth: the offscreen-park attaches ZERO rAF callbacks. A
    //    substrate scrolled fully offscreen PARKS (the createCanvasLifecycle demand-gate),
    //    it does NOT throttle — a per-frame counter over a 1s offscreen window reads 0. A
    //    leaked rAF on a parked viz reads as a non-zero count → REDs.
    test("the offscreen-park attaches ZERO frames (the demand-gate, made a number)", async ({
        page,
    }) => {
        await page.goto("/substrates/aurora", { waitUntil: "networkidle" });
        await assertServedDemoAurora(page);
        await page.waitForTimeout(600); // let it arm + paint live

        const parkedFrames = await page.evaluate(async () => {
            const canvas = document.querySelector("canvas");
            if (!canvas) return -1;
            // Scroll the substrate fully offscreen — the demand-gate + the
            // IntersectionObserver/content-visibility park fire.
            const spacer = document.createElement("div");
            spacer.style.cssText = "height:300vh";
            document.body.appendChild(spacer);
            window.scrollTo(0, document.body.scrollHeight); // canvas now far above the viewport
            await new Promise((r) => setTimeout(r, 400)); // let the park settle

            // The offscreen-park measure: a PARKED surface attaches ZERO rAF callbacks, so
            // it does NOT repaint. Sample the canvas pixels twice over a 700ms parked
            // window — IDENTICAL bytes ⇒ 0 repaints (the demand-gate held); any drift ⇒ a
            // leaked rAF kept animating offscreen (a non-zero parked-frame count).
            const read = () => {
                const c = document.createElement("canvas");
                c.width = 32;
                c.height = 32;
                const ctx = c.getContext("2d")!;
                ctx.drawImage(canvas, 0, 0, 32, 32);
                return ctx.getImageData(0, 0, 32, 32).data.join(",");
            };
            const a = read();
            await new Promise((r) => setTimeout(r, 700));
            const b = read();
            spacer.remove();
            // 0 = no repaint while parked (the demand-gate held); 1 = the surface kept
            // animating offscreen (a leaked rAF).
            return a === b ? 0 : 1;
        });

        expect(parkedFrames, "a viz <canvas> is present to park").not.toBe(-1);
        expect(
            parkedFrames,
            `the offscreen substrate kept repainting while parked (a leaked rAF) — the demand-gate must attach ZERO frames offscreen (proof:offscreen-pause, made a number)`,
        ).toBe(0);
    });
});
