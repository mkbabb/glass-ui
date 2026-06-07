import { watch, onUnmounted, type Ref } from "vue";
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { useIntersectionPause } from "../../../../composables/motion/useIntersectionPause";
// AV.W14 — the error-checked compile/link is the shared `glass/webgl/compile`
// leaf; goo-blob keeps its `[GooBlob]` diagnostic label via the `label` arg.
import { compileShader, linkProgram } from "../../../../composables/glass/webgl/compile";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import type { ColorResolver } from "../../../../composables/color";
import { METABALL_VERTEX_SRC } from "../shaders/metaball.vert";
import { METABALL_FRAGMENT_SRC } from "../shaders/metaball.frag";
import { BLOB_CONFIG_DEFAULTS, type BlobConfig } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";

const MAX_SATS = 4;

/** Diagnostic label for the shared compile/link error path (AV.W14). */
const BLOB_LABEL = "[GooBlob]";

/**
 * Canvas is CSS-sized 1.6x its layout wrapper (see GooBlob.vue). Positions are in
 * [-0.5, 0.5] normalized space mapped to canvas UVs. To make the layout footprint
 * represent the "visible blob region" and have the extra 60% of canvas serve as
 * overflow margin for satellite orbits, scale all length-like uniforms by
 * 1/1.6 = 0.625.
 */
const POS_SCALE = 1 / 1.6;

const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uPointerStrength",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uNoiseFreq",
    "uNoiseSpeed",
    "uWarpAmp",
    "uSmoothK",
    "uMerge",
    "uLit",
    "uRimColor",
    "uLightDir",
    "uSpecStrength",
    "uSpecShininess",
    "uRimPower",
    "uRimStrength",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uColorNoiseFreq",
    "uColorNoiseSpeed",
    "uSatCount",
] as const;

type UniformName = (typeof UNIFORM_NAMES)[number];

export interface UseMetaballRendererOptions {
    canvasRef: Ref<HTMLCanvasElement | null>;
    color: Ref<string>;
    mood: BlobMoodSystem;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    config: BlobConfig;
    /**
     * The injected color seam (DEC-AT-2). Resolves a CSS color string to a GAMMA-
     * sRGB triple in [0,1] fed straight into the shader's base-color uniform — the
     * faithful AU.W7 lift paints gamma. REQUIRED: a no-resolver mount throws (the
     * loud failure, not a silent gray) instructing the consumer to pass
     * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` (or their own).
     */
    colorResolver: ColorResolver;
}

/**
 * The GooBlob WebGL renderer — composes the `useWebGLCanvas` substrate (AU.W6).
 *
 * This module owns ONLY the metaball-specific concerns: compiling the shader,
 * building the quad + uniform cache, and uploading the per-frame uniforms derived
 * from the mood / pointer / satellite systems and the injected color resolver. The
 * generic WebGL2 lifecycle — context creation, the suspend/resume model, the
 * demand-driven rAF loop, the tab-visibility owner, the ResizeObserver, and the
 * webglcontextlost/restored robustness — lives in the substrate; this renderer
 * threads its behaviour through the substrate's
 * `setup`/`frame`/`shouldContinue`/`resize`/`teardown` callbacks. It does NOT call
 * `getContext("webgl2")` itself (the single-bootstrap contract).
 *
 * Colors arrive ALREADY resolved to a gamma-sRGB triple via the injected
 * `colorResolver`; the value.js 1×1-canvas DOM probe is gone (the seam replaces it).
 */
export function useMetaballRenderer(options: UseMetaballRendererOptions) {
    const { canvasRef, color, mood, pointer, satellites, config, colorResolver } =
        options;

    if (typeof colorResolver !== "function") {
        throw new Error(
            "[GooBlob] a `colorResolver` is required. Pass `defaultBlobColorResolver` " +
                "from `@mkbabb/glass-ui/color` (or your own `ColorResolver`) — the blob " +
                "resolves its base CSS color through this seam and will not paint without it.",
        );
    }

    // AV.W7 G1 — the reduced-motion freeze is LIFTED into the `useWebGLCanvas`
    // substrate, which OWNS + LIVE-MONITORS the query (a `matchMedia` `change`
    // listener that re-arms one static frame on un-reduce, then parks). The blob
    // no longer reads `matchMedia` once at init and never re-monitors — toggling
    // reduced-motion at runtime now freezes/wakes the blob, not just aurora.
    // `shouldContinue` therefore drops its PRM branch; the substrate's reschedule
    // gate draws the one static frame then parks.

    // Per-frame timing — `frame(timeSec)` gives elapsed seconds; the mood system
    // needs a millisecond delta and the satellite system a millisecond `now`, so
    // derive both from the substrate's seconds clock.
    let lastTimeSec = 0;

    // Memoise the resolver: the consumer cycles through a handful of stable color
    // strings, so the resolve runs once per unique color rather than every frame.
    // Cap defensively against unbounded growth from synthesized values.
    const colorCache = new Map<string, [number, number, number]>();
    function resolveColor(css: string): [number, number, number] {
        const cached = colorCache.get(css);
        if (cached) return cached;
        const rgb = colorResolver(css);
        if (colorCache.size > 256) colorCache.clear();
        colorCache.set(css, rgb);
        return rgb;
    }

    // The rim color (W9.b) may be a `var(--token)` the ColorResolver (value.js)
    // cannot parse. Mirror GooBlob.vue's cascade trick: paint the string onto the
    // canvas element's `color` and read back the browser-resolved `rgb(...)`, then
    // feed THAT to the resolver. A literal (no `var()`) passes straight through.
    // Cached so the cascade read runs once per unique rim string.
    const rimCache = new Map<string, [number, number, number]>();
    function resolveRimColor(css: string, el: HTMLElement | null): [number, number, number] {
        const cached = rimCache.get(css);
        if (cached) return cached;
        let concrete = css;
        if (css.includes("var(") && typeof window !== "undefined" && el) {
            const prev = el.style.color;
            el.style.color = css;
            concrete = getComputedStyle(el).color || css;
            el.style.color = prev;
        }
        const rgb = colorResolver(concrete);
        if (rimCache.size > 64) rimCache.clear();
        rimCache.set(css, rgb);
        return rgb;
    }

    let canvasHandle: ReturnType<typeof createWebGLCanvas> | null = null;
    let paused = false;

    // AV.W7 F4 — wire the RAF through the viewport-intersection seam so a blob
    // scrolled out of the viewport (the `rootMargin:200px` warm band) parks its
    // loop; this is the IntersectionObserver fallback for engines without
    // `contentvisibilityautostatechange` (the substrate's F1 content-visibility
    // path). The substrate owns `tab-hidden` itself, so `pauseWhenHidden:false`
    // keeps exactly one writer per reason — the IO drives ONLY `off-screen`.
    // Both gate the same `isRunning()` set, ORed.
    useIntersectionPause(
        canvasRef,
        {
            pause: () => canvasHandle?.suspend("off-screen"),
            resume: () => canvasHandle?.resume("off-screen"),
        },
        { rootMargin: "200px", pauseWhenHidden: false },
    );

    function start(canvas: HTMLCanvasElement) {
        canvasHandle = createWebGLCanvas(canvas, {
            contextAttrs: {
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                preserveDrawingBuffer: false,
            },
            // Build the program + quad + uniform cache on a fresh context. The
            // substrate calls this on arm() AND on every webglcontextrestored, so a
            // GPU context loss self-heals — the closures below close over the fresh
            // `gl`/`prog`/`U` each time.
            setup: (gl) => {
                const vs = compileShader(
                    gl,
                    gl.VERTEX_SHADER,
                    METABALL_VERTEX_SRC,
                    BLOB_LABEL,
                );
                const fs = compileShader(
                    gl,
                    gl.FRAGMENT_SHADER,
                    METABALL_FRAGMENT_SRC,
                    BLOB_LABEL,
                );
                const prog = linkProgram(gl, vs, fs, BLOB_LABEL);
                gl.useProgram(prog);

                // Full-quad (two triangles) — the source's six-vertex quad.
                const vao = gl.createVertexArray()!;
                gl.bindVertexArray(vao);
                const buf = gl.createBuffer()!;
                gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                gl.bufferData(
                    gl.ARRAY_BUFFER,
                    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
                    gl.STATIC_DRAW,
                );
                const aPos = gl.getAttribLocation(prog, "aPosition");
                gl.enableVertexAttribArray(aPos);
                gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

                // Uniform location cache (scalar/vector uniforms).
                const U = {} as Record<UniformName, WebGLUniformLocation | null>;
                for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);

                // Per-satellite array-element locations.
                const satPosLocs: (WebGLUniformLocation | null)[] = [];
                const satRadLocs: (WebGLUniformLocation | null)[] = [];
                const satOpLocs: (WebGLUniformLocation | null)[] = [];
                for (let i = 0; i < MAX_SATS; i++) {
                    satPosLocs.push(gl.getUniformLocation(prog, `uSatPos[${i}]`));
                    satRadLocs.push(gl.getUniformLocation(prog, `uSatRadius[${i}]`));
                    satOpLocs.push(gl.getUniformLocation(prog, `uSatOpacity[${i}]`));
                }

                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

                function resize() {
                    // AV.W7 F6 — the DPR≤2 clamp is the named `AV_DPR_MAX` ceiling.
                    const dpr = resolveBudgetDpr();
                    // Size from the rendered element, not config — the blob fills its
                    // container.
                    const cssW = canvas.clientWidth || config.canvasSize;
                    const cssH = canvas.clientHeight || config.canvasSize;
                    const w = Math.round(cssW * dpr);
                    const h = Math.round(cssH * dpr);
                    if (canvas.width !== w || canvas.height !== h) {
                        canvas.width = w;
                        canvas.height = h;
                    }
                    gl.viewport(0, 0, w, h);
                }

                function drawFrame(timeSec: number) {
                    const now = performance.now();
                    const dtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
                    lastTimeSec = timeSec;

                    // Advance the simulation systems.
                    mood.tick(dtMs);
                    pointer.tick();
                    satellites.tick(now, mood.params.value);

                    const params = mood.params.value;
                    const rgb = resolveColor(color.value);

                    gl.useProgram(prog);
                    gl.bindVertexArray(vao);

                    gl.uniform2f(U.uResolution, canvas.width, canvas.height);
                    gl.uniform1f(U.uTime, timeSec);
                    gl.uniform3f(U.uBaseColor, rgb[0], rgb[1], rgb[2]);

                    // Pointer
                    const ptr = pointer.pointer.value;
                    gl.uniform2f(U.uPointer, ptr.x * 0.5 * POS_SCALE, ptr.y * 0.5 * POS_SCALE);
                    gl.uniform1f(U.uPointerActive, pointer.active.value ? 1.0 : 0.0);
                    gl.uniform1f(
                        U.uPointerAttraction,
                        config.pointerAttraction + params.pointerAttraction,
                    );
                    gl.uniform1f(U.uPointerStrength, config.pointerStrength * POS_SCALE);

                    // Body — config is the base, mood params modulate.
                    gl.uniform1f(U.uBodyRadius, config.bodyRadius * POS_SCALE);
                    gl.uniform1f(
                        U.uPulsePhase,
                        timeSec * config.pulseFreq * params.pulseFreq * Math.PI * 2,
                    );
                    // normalize to idle baseline
                    gl.uniform1f(
                        U.uPulseAmp,
                        ((config.pulseAmp * params.pulseAmp) / 0.015) * POS_SCALE,
                    );

                    // Surface noise — config controls shape, mood scales amplitude.
                    gl.uniform1f(
                        U.uNoiseAmp,
                        ((config.noiseAmp * params.noiseAmp) / 0.025) * POS_SCALE,
                    );
                    gl.uniform1f(U.uNoiseFreq, config.noiseFreq);
                    gl.uniform1f(U.uNoiseSpeed, config.noiseSpeed);
                    gl.uniform1f(U.uWarpAmp, config.warpAmp);

                    // Gooey — `uSmoothK` is a TRUE blend-band in the shader's UV
                    // space now that the smin is normalized (`k *= 4.0` in
                    // sdf-body.glsl.ts). The prior `/0.22` normalizer + the
                    // `POS_SCALE` multiply are GONE (W9.a): the config value is the
                    // neck-width the consumer reasons about directly. The mood
                    // `smoothK` is a unitless multiplier (1.0 at idle) so a mood
                    // shift widens/tightens the neck without re-introducing a
                    // hidden length transform.
                    gl.uniform1f(
                        U.uSmoothK,
                        config.smoothK * (params.smoothK / BLOB_CONFIG_DEFAULTS.smoothK),
                    );
                    gl.uniform1f(U.uMerge, config.merge === "circular" ? 1.0 : 0.0);

                    // Color perturbation
                    gl.uniform1f(U.uHueRange, config.hueRange + params.hueRange);
                    gl.uniform1f(U.uSatShift, config.satShift + params.satShift);
                    gl.uniform1f(
                        U.uBrightnessShift,
                        config.brightnessShift + params.brightnessShift,
                    );
                    gl.uniform1f(U.uColorNoiseFreq, config.colorNoiseFreq);
                    gl.uniform1f(U.uColorNoiseSpeed, config.colorNoiseSpeed);

                    // Lit glass surface (W9.b) — Blinn-Phong glint + Fresnel rim.
                    // `uRimColor` resolves through the SAME injected ColorResolver
                    // seam as `uBaseColor` (NOT a DOM probe — the `var()`-cascade
                    // read above only un-wraps a token to a concrete string the
                    // resolver then parses). Gated behind `uLit` (default flat).
                    gl.uniform1f(U.uLit, config.lit ? 1.0 : 0.0);
                    const rim = resolveRimColor(config.rimColor, canvas);
                    gl.uniform3f(U.uRimColor, rim[0], rim[1], rim[2]);
                    gl.uniform3f(
                        U.uLightDir,
                        config.lightDir[0],
                        config.lightDir[1],
                        config.lightDir[2],
                    );
                    gl.uniform1f(U.uSpecStrength, config.specStrength);
                    gl.uniform1f(U.uSpecShininess, config.specShininess);
                    gl.uniform1f(U.uRimPower, config.rimPower);
                    gl.uniform1f(U.uRimStrength, config.rimStrength);

                    // Satellites
                    const sats = satellites.sources;
                    gl.uniform1i(U.uSatCount, sats.length);
                    for (let i = 0; i < MAX_SATS; i++) {
                        const posLoc = satPosLocs[i] ?? null;
                        const radLoc = satRadLocs[i] ?? null;
                        const opLoc = satOpLocs[i] ?? null;
                        const sat = sats[i];
                        if (sat) {
                            gl.uniform2f(posLoc, sat.x * POS_SCALE, sat.y * POS_SCALE);
                            gl.uniform1f(radLoc, sat.radius * POS_SCALE);
                            gl.uniform1f(opLoc, sat.opacity);
                        } else {
                            gl.uniform2f(posLoc, 0, 0);
                            gl.uniform1f(radLoc, 0);
                            gl.uniform1f(opLoc, 0);
                        }
                    }

                    gl.clearColor(0, 0, 0, 0);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                    gl.bindVertexArray(null);
                }

                /**
                 * Demand gate. While manually paused (G2) the loop parks; otherwise
                 * the blob is perpetually animated (mood drift + satellite cycle).
                 * The reduced-motion one-static-frame-then-park is now owned by the
                 * substrate's reschedule gate (G1) — it draws the current frame then
                 * parks while `reducedMotion` is live, so this gate stays
                 * motion-only.
                 */
                function shouldContinue(): boolean {
                    return !paused;
                }

                return {
                    frame: drawFrame,
                    shouldContinue,
                    resize,
                    teardown: () => {
                        gl.deleteProgram(prog);
                        gl.deleteShader(vs);
                        gl.deleteShader(fs);
                        gl.deleteBuffer(buf);
                        gl.deleteVertexArray(vao);
                        // The WEBGL_lose_context release is the substrate's job.
                    },
                };
            },
        });

        canvasHandle.arm();
    }

    watch(
        canvasRef,
        (canvas) => {
            if (canvas && !canvasHandle) start(canvas);
        },
        { immediate: true },
    );

    // Repaint on a color change while parked (reduced-motion / paused) so the new
    // color lands without the perpetual loop.
    watch(color, () => canvasHandle?.wake());

    onUnmounted(() => {
        canvasHandle?.dispose();
        canvasHandle = null;
    });

    return {
        pause: () => {
            paused = true;
            canvasHandle?.suspend("manual");
        },
        resume: () => {
            paused = false;
            canvasHandle?.resume("manual");
        },
    };
}

