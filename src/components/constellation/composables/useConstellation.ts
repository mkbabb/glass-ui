import {
    computed,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    readonly,
    ref,
    shallowRef,
    type Ref,
} from "vue";
import { useCanvas2D } from "../../../composables/glass/canvas2d";
import { hashString, mulberry32 } from "../../../composables/glass/procedural/prng";
import { usePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";
import { readReducedMotion } from "../../../composables/motion/core/useReducedMotion";
import {
    constellationWellMapping,
    snapshotField,
} from "../../../composables/motion/pointer/pointerFieldMappings";
import {
    appendPointerWeb,
    buildEdges,
    refitField,
    seedField,
    stepField,
    type ConstellationField,
    type ConstellationPalette,
    type ConstellationPointer,
    type ConstellationProps,
    type ConstellationRipple,
} from "../constellationField";
import {
    fireBurst,
    readInteractionConfig,
    warpSettled as fieldWarpSettled,
    warpTo as warpFieldTo,
} from "../constellationInteraction";
import {
    drawEdges,
    drawNodes,
    drawPointer,
    drawRipples,
    readPalette,
} from "../constellationRender";
import {
    BASE_WIDTH,
    DEFAULT_PALETTE,
    DEFAULT_PARALLAX,
    E_MAX,
    MAX_NODES,
} from "../constants";
import { createConstellationField } from "./createConstellationField";
import {
    canvas2DRenderer,
    pendingRenderer,
    type RendererStatus,
} from "../../../composables/glass/webgpu/rendererStatus";

export interface ConstellationRoutePointerRead {
    x: number;
    y: number;
    active: boolean;
}

export interface UseConstellationOptions {
    /** Optional route-owned pointer feed for a non-interactive background field. */
    routePointer?: () => ConstellationRoutePointerRead | null;
}

const ROUTE_WELL_OVERRIDE = {
    gain: 5200,
    reach: 480,
    maxSpeed: 1.6,
    soften: 24,
    ramp: 4,
} as const;
const ROUTE_WELL_STRENGTH = 0.5;
const FROZEN_NOW = 0;

export interface ConstellationExpose {
    field: ConstellationField;
    isFrozen: Ref<boolean>;
    warpTo(a: { x: number; y: number } | number, b?: number): number;
    holdWellAt(x: number, y: number): boolean;
    releaseWell(): void;
    warpSettled(): boolean;
    pinNode(idx: number): void;
    rendererStatus: Readonly<Ref<RendererStatus>>;
}

export function useConstellation(
    props: ConstellationProps,
    hostRef: Ref<HTMLElement | null>,
    canvasRef: Ref<HTMLCanvasElement | null>,
    options: UseConstellationOptions = {},
): ConstellationExpose {
    const routePointer = options.routePointer;
    const count = Math.min(props.count ?? 64, MAX_NODES);
    const link = props.link ?? 132;
    // `speed`/`parallax` retired as public props (zero setters) → the opinionated
    // defaults resolve here (parallax off; the flat-lattice drift at 0.16).
    const speed = 0.16;
    const parallax = DEFAULT_PARALLAX;
    const seed = props.seed;
    const warpOnClick = props.warpOnClick ?? false;
    const wander = props.wander ?? false;
    const gravityWell =
        props.gravityWell || (routePointer ? { ...ROUTE_WELL_OVERRIDE } : false);
    const pinned = props.pinned ?? false;
    const pinnedDrift = props.pinnedDrift ?? false;
    const warpAutoRelease = props.warpAutoRelease ?? false;

    const rng = computed<() => number>(() => {
        if (seed === undefined) return Math.random;
        return mulberry32(typeof seed === "string" ? hashString(seed) : seed);
    });

    const rawFreeze = getCurrentInstance()?.vnode.props?.freeze as
        | boolean
        | ""
        | undefined;
    const urlFreeze = (): boolean =>
        typeof window !== "undefined" &&
        /[?&](export|print|freeze)\b/.test(window.location.search);
    const isFrozen = computed(() =>
        rawFreeze === undefined ? urlFreeze() : rawFreeze === true || rawFreeze === "",
    );

    const { field, wanderOverride, wellOverride } = createConstellationField(
        wander,
        gravityWell,
        pinned,
        pinnedDrift,
        warpAutoRelease,
    );
    const pointer: ConstellationPointer = { x: -1, y: -1 };
    const ripples: ConstellationRipple[] = [];
    const toLocalRef = ref<
        ((point: { clientX: number; clientY: number }) => ConstellationPointer | null) | null
    >(null);
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
    const rendererStatus = shallowRef<RendererStatus>(pendingRenderer("canvas2d"));

    let handle: ReturnType<typeof useCanvas2D> | null = null;
    let cleanup = (): void => pointerField.dispose();
    onUnmounted(() => cleanup());

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;

        let palette: ConstellationPalette = { ...DEFAULT_PALETTE };
        let paletteDirty = true;
        let interactionRead = false;
        let previousNow = -1;
        let freezeParkQueued = false;
        let holdTimer: ReturnType<typeof setTimeout> | undefined;

        const reducedMotionNow = (): boolean =>
            handle?.reducedMotion ?? readReducedMotion();
        const toLocal = (point: {
            clientX: number;
            clientY: number;
        }): ConstellationPointer | null => {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return null;
            const x = (point.clientX - rect.left) / rect.width;
            const y = (point.clientY - rect.top) / rect.height;
            return x < 0 || y < 0 || x > 1 || y > 1
                ? null
                : { x: x * field.w, y: y * field.h };
        };
        toLocalRef.value = toLocal;

        const releaseWell = (): void => {
            if (holdTimer !== undefined) clearTimeout(holdTimer);
            holdTimer = undefined;
            if (field.well) field.well.target = 0;
            handle?.wake();
        };

        const target = hostRef.value ?? canvas;
        const listeners: Array<[
            string,
            EventListener,
        ]> = [];
        const listen = (type: string, listener: EventListener): void => {
            target.addEventListener(type, listener);
            listeners.push([type, listener]);
        };

        if (!routePointer && !isFrozen.value) {
            listen("pointerenter", (() => {
                pointerField.onPointerEnter();
                handle?.wake();
            }) as EventListener);
            listen("pointermove", ((event: PointerEvent) => {
                if (reducedMotionNow()) return;
                pointerField.onPointerMove(event);
                const local = toLocal(event);
                if (props.pointerReactive !== false && local) {
                    pointer.x = local.x;
                    pointer.y = local.y;
                } else {
                    pointer.x = -1;
                    pointer.y = -1;
                }
                if (field.well?.target && local) {
                    field.well.x = local.x;
                    field.well.y = local.y;
                }
                handle?.wake();
            }) as EventListener);
            listen("pointerleave", (() => {
                pointerField.onPointerLeave();
                pointer.x = -1;
                pointer.y = -1;
                releaseWell();
            }) as EventListener);
            listen("pointerdown", ((event: PointerEvent) => {
                if (reducedMotionNow()) return;
                const local = toLocal(event);
                if (!local) return;
                if (props.pointerReactive !== false)
                    ripples.push({ ...local, start: -1 });
                if (warpOnClick) warpFieldTo(field, local.x, local.y);
                if (props.gravityWell && field.well) {
                    field.well.x = local.x;
                    field.well.y = local.y;
                    holdTimer = setTimeout(() => {
                        if (field.well) field.well.target = 1;
                        handle?.wake();
                    }, field.well.cfg.holdMs);
                }
                handle?.wake();
            }) as EventListener);
            listen("pointerup", releaseWell as EventListener);
            listen("pointercancel", releaseWell as EventListener);

            if (warpOnClick || props.gravityWell) {
                listen("keydown", ((event: KeyboardEvent) => {
                    if (
                        event.repeat ||
                        (event.key !== "Enter" && event.key !== " ") ||
                        reducedMotionNow()
                    )
                        return;
                    event.preventDefault();
                    const x = field.w / 2;
                    const y = field.h / 2;
                    if (warpOnClick) warpFieldTo(field, x, y);
                    if (props.gravityWell && field.well) {
                        field.well.x = x;
                        field.well.y = y;
                        field.well.target = 1;
                    }
                    handle?.wake();
                }) as EventListener);
                listen("keyup", ((event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") releaseWell();
                }) as EventListener);
            }
        }

        const paletteObserver =
            typeof MutationObserver === "undefined"
                ? null
                : new MutationObserver(() => {
                      paletteDirty = true;
                      if (isFrozen.value) handle?.resume("manual");
                      else handle?.wake();
                  });
        paletteObserver?.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        handle = useCanvas2D({
            canvas: canvasRef,
            respectReducedMotion: true,
            setup: () => ({
                render(ctx, now) {
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    const w = canvas.width ? canvas.width / dpr : BASE_WIDTH;
                    const h = canvas.height ? canvas.height / dpr : 720;
                    const k = w / BASE_WIDTH;
                    field.canvas = canvas;
                    field.dpr = dpr;
                    const kFloor = Number.parseFloat(
                        getComputedStyle(canvas).getPropertyValue(
                            "--constellation-k-floor",
                        ),
                    );
                    field.kFloor = Number.isFinite(kFloor) ? kFloor : undefined;

                    if (field.w !== w || field.h !== h) {
                        const previousWidth = field.w;
                        const previousHeight = field.h;
                        field.w = w;
                        field.h = h;
                        field.k = k;
                        if (field.nodes.length) {
                            refitField(field, previousWidth, previousHeight);
                        } else {
                            field.nodes = seedField(rng.value, count, w, h, speed);
                            field.warp.x = w / 2;
                            field.warp.y = h / 2;
                        }
                        if (!interactionRead) {
                            interactionRead = true;
                            const config = readInteractionConfig(canvas);
                            field.warpCfg = config.warp;
                            if (field.well)
                                field.well.cfg = { ...config.well, ...wellOverride };
                            if (field.wander) {
                                field.wander.minIdle =
                                    wanderOverride.minIdle ?? config.wander.minIdle;
                                field.wander.jitter =
                                    wanderOverride.jitter ?? config.wander.jitter;
                            }
                        }
                    }
                    field.k = k;
                    if (paletteDirty) {
                        palette = readPalette(canvas);
                        paletteDirty = false;
                    }

                    const staticFrame = isFrozen.value || reducedMotionNow();
                    const deltaMs = previousNow < 0 ? 0 : now - previousNow;
                    const dt = deltaMs / 1000;
                    previousNow = now;

                    if (staticFrame && field.well) {
                        field.well.strength = 0;
                        field.well.target = 0;
                        field.well.x = -1;
                        field.well.y = -1;
                    }

                    if (routePointer && !staticFrame) {
                        const route = routePointer();
                        let inside = false;
                        if (route?.active) {
                            const rect = canvas.getBoundingClientRect();
                            if (rect.width && rect.height) {
                                const x =
                                    (route.x * window.innerWidth - rect.left) /
                                    rect.width;
                                const y =
                                    (route.y * window.innerHeight - rect.top) /
                                    rect.height;
                                inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
                                if (inside) pointerField.setPointer(x, y);
                            }
                        }
                        pointerField.setActive(inside);
                    }

                    pointerField.tick(staticFrame ? 0 : deltaMs);
                    if (routePointer && field.well && !staticFrame) {
                        const mapped = constellationWellMapping(
                            snapshotField(pointerField),
                        );
                        field.well.x = mapped.x * w;
                        field.well.y = mapped.y * h;
                        field.well.target =
                            mapped.engagement * ROUTE_WELL_STRENGTH;
                    }

                    const pointerReactive = props.pointerReactive !== false;
                    const livePointer = pointerReactive ? pointer : null;
                    let velocity: ConstellationPointer | null = null;
                    if (livePointer && !staticFrame) {
                        const value = pointerField.velocity.value;
                        velocity = { x: (value.x * w) / 60, y: (value.y * h) / 60 };
                        if (pointer.x >= 0)
                            fireBurst(field, pointer, pointerField.burst.value, ripples);
                    }
                    if (!staticFrame)
                        stepField(
                            field,
                            k,
                            speed,
                            livePointer,
                            dt,
                            now,
                            rng.value,
                            velocity,
                        );

                    const accentIndex = props.accentEdges
                        ? field.pinnedIndex >= 0
                            ? field.pinnedIndex
                            : field.focalIndex
                        : -1;
                    const edges = buildEdges(field, link, accentIndex, E_MAX);
                    if (pointerReactive && !staticFrame)
                        appendPointerWeb(edges, field, link, pointer, E_MAX);

                    const opacity = props.opacityCeiling ?? 1;
                    ctx.clearRect(0, 0, w, h);
                    drawEdges(ctx, field, edges, palette, opacity);
                    drawNodes(
                        ctx,
                        field,
                        palette,
                        opacity,
                        livePointer,
                        staticFrame ? 0 : parallax,
                    );
                    if (pointerReactive && !staticFrame) {
                        drawPointer(ctx, field, pointer, palette, opacity);
                        drawRipples(ctx, field, now, ripples, palette, opacity);
                    }

                    if (props.drawOverlay) {
                        ctx.save();
                        try {
                            props.drawOverlay(
                                ctx,
                                field,
                                staticFrame ? FROZEN_NOW : now,
                            );
                        } finally {
                            ctx.restore();
                        }
                    }

                    if (isFrozen.value && handle && !freezeParkQueued) {
                        freezeParkQueued = true;
                        queueMicrotask(() => {
                            freezeParkQueued = false;
                            handle?.suspend("manual");
                        });
                    }
                },
            }),
        });
        rendererStatus.value = canvas2DRenderer();

        cleanup = () => {
            if (holdTimer !== undefined) clearTimeout(holdTimer);
            paletteObserver?.disconnect();
            for (const [type, listener] of listeners)
                target.removeEventListener(type, listener);
            pointerField.dispose();
            handle?.dispose();
            handle = null;
        };
    });

    return {
        field,
        isFrozen,
        warpTo(a: { x: number; y: number } | number, b?: number): number {
            if (isFrozen.value) return -1;
            const point =
                typeof a === "number" && typeof b === "number"
                    ? toLocalRef.value?.({ clientX: a, clientY: b })
                    : (a as { x: number; y: number });
            if (!point) return -1;
            const index = warpFieldTo(field, point.x, point.y);
            handle?.wake();
            return index;
        },
        holdWellAt(x: number, y: number): boolean {
            if (!field.well || isFrozen.value) return false;
            field.well.x = x;
            field.well.y = y;
            field.well.target = 1;
            handle?.wake();
            return true;
        },
        releaseWell(): void {
            if (!field.well) return;
            field.well.target = 0;
            handle?.wake();
        },
        warpSettled: () => fieldWarpSettled(field),
        pinNode(idx: number): void {
            field.pinnedIndex = idx;
            if (field.pinnedDrift) field.pinnedDrift.nextAt = -1;
            handle?.wake();
        },
        rendererStatus: readonly(rendererStatus),
    };
}
