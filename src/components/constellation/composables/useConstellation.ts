// useConstellation — the `<Constellation>` orchestrator (BC.W-VIZ-CONSTELLATION).
//
// The lattice re-homes off the Canvas2D substrate onto `createGpuSubstrate` (WebGPU
// instanced-points + instanced-lines primary, the WebGL2 instanced-arrays twin fallback —
// the §E "WebGPU everywhere, no canvas" mandate). The four Canvas2D draw passes RETIRE; the
// RASTERIZER moves to the GPU. The proximity-graph field step (`stepField` + the interaction
// springs + the CPU `buildEdges` scan) stays the ONE JS math source, run INSIDE the leaf's
// frame callback (the one-loop discipline); it writes the node + edge instance buffers via
// `device.queue.writeBuffer` and the WGSL/GLSL render passes draw them. The shared
// `usePointerVelocityField` is FED `tick(delta)` from the SAME callback (NO second rAF), and
// its velocity/acceleration drive the §6 velocity-aware lean + the flick burst + the
// parallax. The expose shape (field/warpTo/holdWellAt/releaseWell/warpSettled/pinNode/
// isFrozen) is UNCHANGED — the migration is purely a substrate swap.

import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    ref,
    type Ref,
} from "vue";
import { mulberry32, hashString } from "../../../composables/glass/procedural/prng";
import { usePointerVelocityField } from "../../../composables/motion/usePointerVelocityField";
import {
    constellationWellMapping,
    snapshotField,
} from "../../../composables/motion/pointerFieldMappings";
import {
    createGpuSubstrate,
    type GpuBackend,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    seedField,
    stepField,
    refitField,
    buildEdges,
    appendPointerWeb,
    parallaxNodePos,
    BASE_WIDTH,
    type ConstellationField,
    type ConstellationRipple,
    type ConstellationPointer,
    type ConstellationPalette,
    type ConstellationProps,
} from "../constellationField";
import {
    readInteractionConfig,
    warpTo as warpToField,
    warpSettled as warpSettledField,
    fireBurst,
} from "../constellationInteraction";
import {
    readPalette,
    kVisOf,
    parseColorRGBA,
    DEFAULT_PALETTE,
} from "../constellationRender";
import { DEFAULT_PARALLAX, DEFAULT_LINE_WIDTH, E_MAX, MAX_NODES } from "../constants";
import { createConstellationField } from "./createConstellationField";
import type {
    ConstellationRenderState,
    ConstellationWGPUSetupDeps,
} from "./constellationWGPUSetup";
import { createConstellationWGPUSetup } from "./constellationWGPUSetup";
import { createConstellationGLSetup } from "./constellationGLSetup";
import type {
    PackedNode,
    PackedEdge,
    ConstellationUniformValues,
} from "./uniformBridgeWGPU";

/** The route-pointer read a background constellation feeds its own field from. */
export interface ConstellationRoutePointerRead {
    /** Viewport-normalized route pointer (0..1). */
    x: number;
    y: number;
    /** True while a live pointer is over the viewport (and not PRM/paused-silenced). */
    active: boolean;
}

/** The optional composable seams (BI.W-CONSTELLATION-DEDUPE — the interactive-bg feed). */
export interface UseConstellationOptions {
    /**
     * The interactive-BACKGROUND feed. When provided, the constellation reads the route
     * chassis broadcaster each frame and drives a SUBTLE pointer WELL over the KEPT
     * per-node integrator via `constellationWellMapping` (a longer-half-life field, so
     * the background lean is ~2–6%, not the foreground gravity-well pull). Undefined for
     * a foreground demo (which owns its own host listeners). Passed by `Constellation.vue`
     * off the `backgroundInteractive` prop.
     */
    routePointer?: () => ConstellationRoutePointerRead | null;
}

// BI.W-CONSTELLATION-DEDUPE — the SUBTLE background well register. The route feed reuses
// the SAME well integrator (`constellationWell.ts`, byte-frozen) but at a gentler gain +
// wider reach than the foreground `gravityWell` (DEFAULT_WELL_CONFIG gain 19000 / reach 340),
// and the well target is engagement-scaled (never a full held-pull), so the whole field
// leans a SUBTLE fraction toward the route pointer rather than being sucked into it. These
// values are the background register the π at W-REFLECT3 tunes.
const ROUTE_WELL_OVERRIDE = {
    gain: 5200,
    reach: 480,
    maxSpeed: 1.6,
    soften: 24,
    ramp: 4.0,
} as const;
/** The engagement→well-target cap — the subtle-background strength ceiling (never 1). */
const ROUTE_WELL_STRENGTH = 0.5;

/** The imperative seam the SFC re-exposes via `defineExpose`. */
export interface ConstellationExpose {
    field: ConstellationField;
    isFrozen: Ref<boolean>;
    /** The resolved backend (`"webgpu"` where supported, else the WebGL2 instanced twin). */
    backend: () => GpuBackend;
    warpTo(a: { x: number; y: number } | number, b?: number): number;
    holdWellAt(x: number, y: number): boolean;
    releaseWell(): void;
    warpSettled(): boolean;
    pinNode(idx: number): void;
}

export function useConstellation(
    props: ConstellationProps,
    hostRef: Ref<HTMLElement | null>,
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseConstellationOptions = {},
): ConstellationExpose {
    // BI.W-CONSTELLATION-DEDUPE — the interactive-BACKGROUND feed (the route broadcaster
    // read). Present ONLY for a full-bleed `pointer-events:none` background.
    const routePointer = options.routePointer;
    // Mount-once reads — the field seed (count/speed), the link reach, the interaction-mode
    // flags, and the seed. The defaults are filled by the SFC `withDefaults`.
    const count = Math.min(props.count ?? 64, MAX_NODES);
    const link = props.link ?? 132;
    const speed = props.speed ?? 0.16;
    const parallax = props.parallax ?? DEFAULT_PARALLAX;
    const seed = props.seed;
    const warpOnClick = props.warpOnClick ?? false;
    const wander = props.wander ?? false;
    // A background feed materializes a SUBTLE well (the route-register override) even
    // without an explicit `gravityWell` prop, so the field can lean toward the route
    // pointer over the KEPT integrator. An explicit `gravityWell` still wins.
    const gravityWell =
        props.gravityWell || (routePointer ? { ...ROUTE_WELL_OVERRIDE } : false);
    const pinned = props.pinned ?? false;
    const pinnedDrift = props.pinnedDrift ?? false;
    const warpAutoRelease = props.warpAutoRelease ?? false;

    // The shared single-source PRNG (AV.W14). NO private mulberry32 re-roll.
    const rng = computed<() => number>(() => {
        if (seed === undefined) return Math.random;
        const s = typeof seed === "string" ? hashString(seed) : seed;
        return mulberry32(s);
    });

    // The deterministic-capture predicate (AY.W-CON3). An explicit `freeze` prop wins;
    // omitted, it AUTO-DERIVES from the capture URL (?export / ?print / ?freeze).
    const urlFreeze = (): boolean =>
        typeof window !== "undefined" &&
        /[?&](export|print|freeze)\b/.test(window.location.search);
    const rawFreeze = getCurrentInstance()?.vnode.props?.freeze as
        | boolean
        | ""
        | undefined;
    const isFrozen = computed<boolean>(() => {
        if (rawFreeze !== undefined) return rawFreeze === true || rawFreeze === "";
        return urlFreeze();
    });

    // Field + per-instance interaction state — built by the factory.
    const { field, wanderOverride, wellOverride } = createConstellationField(
        wander,
        gravityWell,
        pinned,
        pinnedDrift,
        warpAutoRelease,
    );
    const pointer: ConstellationPointer = { x: -1, y: -1 };
    const ripples: ConstellationRipple[] = [];
    let palette: ConstellationPalette = { ...DEFAULT_PALETTE };
    let paletteDirty = true;
    let prevNow = -1;
    let interactionRead = false;

    // The shared pointer-physics field (NO own rAF — fed by the renderer frame via the
    // resolveFrame `tick`). Velocity drives the §6 lean; acceleration → the flick burst.
    // A BACKGROUND feed runs a LONGER engagement half-life + a weightier attractor so the
    // route-driven well lean is subtle + lagging (the interactive-background register); a
    // foreground lattice keeps the snappy defaults.
    const pointerField = usePointerVelocityField(
        routePointer
            ? {
                  respectReducedMotion: true,
                  halfLifeMs: 600,
                  mass: 1.3,
                  damping: 0.9,
                  attractorResponse: 0.5,
              }
            : { respectReducedMotion: true },
    );

    // The backend handle (resolved after armAsync — "webgpu" where supported, else the
    // WebGL2 instanced twin).
    let handle: ReturnType<typeof createGpuSubstrate> | null = null;
    let resolvedBackend: GpuBackend = "webgpu";
    let cleanup = (): void => {
        pointerField.dispose();
        handle?.dispose();
    };
    onUnmounted(() => cleanup());

    // The hoisted client→canvas-local px mapper (the deck-scale invariant). null pre-mount.
    const toLocalRef = ref<
        | ((e: { clientX: number; clientY: number }) => ConstellationPointer | null)
        | null
    >(null);

    // Pre-allocated packed-row arrays (re-filled each frame — no per-frame alloc).
    const nodeRows: PackedNode[] = [];
    const edgeUniforms: ConstellationUniformValues = blankUniforms();

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;
        const paletteObserver =
            typeof MutationObserver === "undefined"
                ? null
                : new MutationObserver(() => {
                      paletteDirty = true;
                      handle?.wake();
                  });
        paletteObserver?.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const reducedMotionNow = (): boolean => {
            if (handle) return handle.reducedMotion;
            return (
                typeof window !== "undefined" &&
                !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
            );
        };

        // ── The pointer→canvas-local mapper + the pointer-field wiring on the host ──
        const host = hostRef.value;
        const toLocal = (e: {
            clientX: number;
            clientY: number;
        }): ConstellationPointer | null => {
            const r = canvas.getBoundingClientRect();
            if (!r.width || !r.height) return null;
            const nx = (e.clientX - r.left) / r.width;
            const ny = (e.clientY - r.top) / r.height;
            if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return null;
            return { x: nx * field.w, y: ny * field.h };
        };
        toLocalRef.value = toLocal;

        const pointerReactiveNow = (): boolean => props.pointerReactive ?? true;
        const onPointerMove = (ev: PointerEvent): void => {
            if (isFrozen.value || reducedMotionNow()) return;
            pointerField.onPointerMove(ev);
            if (!pointerReactiveNow()) {
                pointer.x = -1;
                pointer.y = -1;
                return;
            }
            const loc = toLocal(ev);
            if (loc) {
                pointer.x = loc.x;
                pointer.y = loc.y;
            }
            handle?.wake();
        };
        const onPointerLeave = (): void => {
            pointerField.onPointerLeave();
            pointer.x = -1;
            pointer.y = -1;
        };
        const onPointerEnter = (): void => {
            pointerField.onPointerEnter();
            handle?.wake();
        };
        const onClick = (ev: PointerEvent): void => {
            if (!warpOnClick || isFrozen.value || reducedMotionNow()) return;
            const loc = toLocal(ev);
            if (loc) warpToField(field, loc.x, loc.y);
            handle?.wake();
        };
        const target = host ?? canvas;
        if (!isFrozen.value) {
            target.addEventListener("pointermove", onPointerMove);
            target.addEventListener("pointerenter", onPointerEnter);
            target.addEventListener("pointerleave", onPointerLeave);
            if (warpOnClick) target.addEventListener("pointerdown", onClick);
        }
        cleanup = () => {
            paletteObserver?.disconnect();
            target.removeEventListener("pointermove", onPointerMove);
            target.removeEventListener("pointerenter", onPointerEnter);
            target.removeEventListener("pointerleave", onPointerLeave);
            target.removeEventListener("pointerdown", onClick);
            pointerField.dispose();
            handle?.dispose();
        };

        // ── The per-frame resolve (the ONE JS math source + the shared pointer tick) ──
        const resolveFrame = (timeSec: number): ConstellationRenderState | null => {
            const dpr = Math.min(
                (typeof window !== "undefined" && window.devicePixelRatio) || 1,
                2,
            );
            // BG.W-VIZ-RESIZE-ADOPT — the field lays out in CSS px derived from the
            // LEAF-sized backing store (round(gBCR × dpr) ÷ dpr), never clientWidth
            // (which reads 0 under a content-visibility skip).
            const w = canvas.width ? canvas.width / dpr : BASE_WIDTH;
            const h = canvas.height ? canvas.height / dpr : 720;
            const k = w / BASE_WIDTH;
            field.canvas = canvas;
            const kFloorRaw = parseFloat(
                getComputedStyle(canvas).getPropertyValue("--constellation-k-floor"),
            );
            field.kFloor = Number.isFinite(kFloorRaw) ? kFloorRaw : undefined;
            field.dpr = dpr;

            // Lay out / re-fit the field on a size change (the first sized frame seeds it).
            if (field.w !== w || field.h !== h) {
                const prevW = field.w;
                const prevH = field.h;
                field.w = w;
                field.h = h;
                field.k = k;
                if (!field.nodes.length) {
                    field.nodes = seedField(rng.value, count, w, h, speed);
                    field.warp.x = w / 2;
                    field.warp.y = h / 2;
                } else {
                    refitField(field, prevW, prevH);
                }
                if (!interactionRead) {
                    interactionRead = true;
                    const cfgs = readInteractionConfig(canvas);
                    field.warpCfg = cfgs.warp;
                    if (field.well) field.well.cfg = { ...cfgs.well, ...wellOverride };
                    if (field.wander) {
                        field.wander.minIdle =
                            wanderOverride.minIdle ?? cfgs.wander.minIdle;
                        field.wander.jitter =
                            wanderOverride.jitter ?? cfgs.wander.jitter;
                    }
                }
            }
            if (paletteDirty) {
                palette = readPalette(canvas);
                paletteDirty = false;
            }
            field.k = k;

            const nowMs = timeSec * 1000;
            const dt = prevNow < 0 ? 0 : (nowMs - prevNow) / 1000;
            const deltaMs = prevNow < 0 ? 0 : nowMs - prevNow;
            prevNow = nowMs;

            const isStatic = isFrozen.value || reducedMotionNow();

            if (isStatic && field.well) {
                field.well.strength = 0;
                field.well.target = 0;
                field.well.x = -1;
                field.well.y = -1;
            }

            // BI.W-CONSTELLATION-DEDUPE — the interactive-BACKGROUND feed. A full-bleed
            // `pointer-events:none` background cannot receive its own pointer events, so it
            // reads the route chassis broadcaster and feeds the SAME shared field (NO second
            // listener, NO own rAF). The viewport-normalized route pointer is re-projected
            // into THIS canvas's local box (correct for both a full-bleed hero and a boxed
            // page), gating `active` to an in-canvas pointer.
            if (routePointer && !isStatic) {
                const rp = routePointer();
                let inside = false;
                if (rp && rp.active && typeof window !== "undefined") {
                    const rect = canvas.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        const nx = (rp.x * window.innerWidth - rect.left) / rect.width;
                        const ny = (rp.y * window.innerHeight - rect.top) / rect.height;
                        inside = nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1;
                        if (inside) pointerField.setPointer(nx, ny);
                    }
                }
                pointerField.setActive(inside);
            }

            // Advance the shared pointer field (the no-own-rAF discipline) — tick(0) under
            // PRM/static (the deterministic freeze; no live velocity).
            pointerField.tick(isStatic ? 0 : deltaMs);

            // BI.W-CONSTELLATION-DEDUPE — drive the SUBTLE well over the KEPT per-node
            // integrator (constellationWell.ts, byte-frozen) from the field snapshot via the
            // pure `constellationWellMapping`. The well centre rides the smoothed attractor
            // (canvas-local px); the well target is the engagement envelope capped at
            // `ROUTE_WELL_STRENGTH` (never a full held-pull) — so the whole field leans a
            // subtle fraction toward the route pointer. `stepWell` (inside `stepField`) reads
            // `field.well.{x,y,target}`; this only writes them (the integrator is untouched).
            // The static case is already zeroed by the `isStatic && field.well` reset above.
            if (routePointer && field.well && !isStatic) {
                const wellMap = constellationWellMapping(snapshotField(pointerField));
                field.well.x = wellMap.x * w;
                field.well.y = wellMap.y * h;
                field.well.target = wellMap.engagement * ROUTE_WELL_STRENGTH;
            }

            const pointerReactive = props.pointerReactive ?? true;
            const opacityCeiling = props.opacityCeiling ?? 1;
            const accentEdges = props.accentEdges ?? false;

            // The §6 velocity-aware lean: map the shared field's velocity (normalized-host
            // px/s) → canvas-local px/frame for stepField's pointer term.
            const livePointer = pointerReactive ? pointer : null;
            let pointerVel: ConstellationPointer | null = null;
            if (livePointer && !isStatic) {
                const vel = pointerField.velocity.value;
                // normalized 0..1/s → canvas px/frame (×w, /60).
                pointerVel = { x: (vel.x * w) / 60, y: (vel.y * h) / 60 };
                // The acceleration → flick burst (the §6 accel term). A high burst snaps the
                // focal toward the cursor + drops a ripple.
                if (pointer.x >= 0) {
                    fireBurst(field, pointer, pointerField.burst.value, ripples);
                }
            }

            if (!isStatic) {
                stepField(
                    field,
                    k,
                    speed,
                    livePointer,
                    dt,
                    nowMs,
                    rng.value,
                    pointerVel,
                );
            }

            // ── Resolve the uniforms (the ONE color source — readPalette JS-side) ──
            // BG.W-VIZ-RESIZE-ADOPT — `dpr` is the field-layout dpr computed above.
            const kVis = kVisOf(field);
            const resW = canvas.width || Math.round(w * dpr);
            const resH = canvas.height || Math.round(h * dpr);
            const u = edgeUniforms;
            u.resolutionX = resW;
            u.resolutionY = resH;
            u.dpr = dpr;
            u.kVis = kVis;
            u.time = timeSec;
            u.lineWidth = DEFAULT_LINE_WIDTH;
            u.opacityCeiling = opacityCeiling;
            u.alpha = palette.alpha;
            u.edgeAlpha = palette.edgeAlpha;
            u.edgeFocusAlpha = palette.edgeFocusAlpha;
            u.edgeAccentAlpha = palette.edgeAccentAlpha;
            u.edgeFloor = palette.edgeFloor;
            u.node = parseColorRGBA(palette.node);
            u.nodeDim = parseColorRGBA(palette.nodeDim);
            u.line = parseColorRGBA(palette.line);
            u.accent = parseColorRGBA(palette.accent);

            // ── Pack the node rows (parallax-offset SCREEN positions; backing-store px) ──
            const par = isStatic ? 0 : parallax;
            const ptr = pointerReactive ? pointer : null;
            nodeRows.length = 0;
            const scaleX = resW / Math.max(w, 1);
            const scaleY = resH / Math.max(h, 1);
            for (let i = 0; i < field.nodes.length; i++) {
                const node = field.nodes[i];
                const sp = parallaxNodePos(node, ptr, w, h, par);
                nodeRows.push({
                    x: sp.x * scaleX,
                    y: sp.y * scaleY,
                    r: node.r,
                    dim: node.dim ? 1 : 0,
                });
            }

            // ── Build the edge SET (the ONE math source — buildEdges + the pointer-web) ──
            const accentIndex = accentEdges
                ? field.pinnedIndex >= 0
                    ? field.pinnedIndex
                    : field.focalIndex
                : -1;
            const edges = buildEdges(field, link, accentIndex, E_MAX);
            if (pointerReactive && !isStatic)
                appendPointerWeb(edges, field, link, pointer, E_MAX);
            // map edge endpoints into backing-store px (parallax not applied to edges — the
            // hairlines connect the BASE node graph; node parallax is a sub-perceptual depth).
            const edgeRows: PackedEdge[] = [];
            for (const e of edges) {
                edgeRows.push({
                    ax: e.ax * scaleX,
                    ay: e.ay * scaleY,
                    bx: e.bx * scaleX,
                    by: e.by * scaleY,
                    alpha: e.alpha,
                    accent: e.accent,
                    focus: e.focus,
                });
            }

            return { nodes: nodeRows, edges: edgeRows, uniforms: u };
        };

        const setupDeps: Omit<ConstellationWGPUSetupDeps, "canvas"> = {
            resolveFrame,
            shouldContinue: () => true,
        };

        handle = createGpuSubstrate(canvas, {
            mode: "live",
            respectReducedMotion: true,
            // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing measurement + sizing
            // (round(gBCR × dprPolicy)); both setups' `resize` are upload-only.
            dprPolicy: resolveBudgetDpr,
            // BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom.
            revealBloom: true,
            setupWGPU: createConstellationWGPUSetup({ canvas, ...setupDeps }),
            setupGL: createConstellationGLSetup({ canvas, ...setupDeps }),
        });
        void handle.armAsync().then(() => {
            resolvedBackend = handle?.backend ?? "webgpu";
        });
    });

    return {
        field,
        isFrozen,
        backend: () => resolvedBackend,
        warpTo(a: { x: number; y: number } | number, b?: number): number {
            if (typeof a === "number" && typeof b === "number") {
                const local = toLocalRef.value?.({ clientX: a, clientY: b });
                if (!local) return -1;
                return warpToField(field, local.x, local.y);
            }
            const pt = a as { x: number; y: number };
            return warpToField(field, pt.x, pt.y);
        },
        holdWellAt(x: number, y: number): boolean {
            if (!field.well) return false;
            field.well.x = x;
            field.well.y = y;
            field.well.target = 1;
            return true;
        },
        releaseWell(): void {
            if (!field.well) return;
            field.well.target = 0;
        },
        warpSettled(): boolean {
            return warpSettledField(field);
        },
        pinNode(idx: number): void {
            field.pinnedIndex = idx;
            if (field.pinnedDrift) field.pinnedDrift.nextAt = -1;
        },
    };
}

/** A cold uniform-value record (re-filled each frame — no per-frame alloc). */
function blankUniforms(): ConstellationUniformValues {
    return {
        resolutionX: 0,
        resolutionY: 0,
        dpr: 1,
        kVis: 1,
        time: 0,
        lineWidth: DEFAULT_LINE_WIDTH,
        opacityCeiling: 1,
        alpha: DEFAULT_PALETTE.alpha,
        edgeAlpha: DEFAULT_PALETTE.edgeAlpha,
        edgeFocusAlpha: DEFAULT_PALETTE.edgeFocusAlpha,
        edgeAccentAlpha: DEFAULT_PALETTE.edgeAccentAlpha,
        edgeFloor: DEFAULT_PALETTE.edgeFloor,
        node: [0.7, 0.69, 0.64, 1],
        nodeDim: [0.8, 0.78, 0.74, 1],
        line: [0.11, 0.09, 0.08, 1],
        accent: [0.7, 0.31, 0.19, 1],
    };
}
