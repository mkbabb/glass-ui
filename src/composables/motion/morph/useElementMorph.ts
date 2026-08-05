// One compositor-only spatial writer. Explicit endpoints own geometry;
// NumericAnimation owns playback and every coupled paint channel.

import { NumericAnimation, springTimingFunction, type MorphRect } from "@mkbabb/keyframes.js";
import {
    onScopeDispose,
    readonly,
    ref,
    watch,
    type ComponentPublicInstance,
    type Ref,
} from "vue";
import { motionTempo } from "../core/motionTempo";
import { springPreset, type SpringPresetName } from "../spring/springPresets";

/** A measured endpoint, or the morphed surface's own settled box. */
export type MorphEndpoint = Ref<HTMLElement | ComponentPublicInstance | null> | "self";
/** The registers the FLIP runner drives: coordinated travel (the default), the fired
 *  deploy, and the room-sized bloom its `useLiquidReveal` leaf defaults to. */
export type ElementMorphPreset = Extract<SpringPresetName, "dock" | "panel" | "bloom">;

export interface MorphChannels {
    opacity?: boolean;
    blur?: number;
}

export interface UseElementMorphOptions {
    /** Where the episode starts. At least one endpoint normally owns `"self"`. */
    source: MorphEndpoint;
    /** Where the episode settles. */
    destination: MorphEndpoint;
    channels?: MorphChannels;
    preset?: ElementMorphPreset;
    respectReducedMotion?: boolean;
    onSettled?: () => void;
    onFrame?: (progress: number) => void;
}

export interface ElementMorphMeasurement {
    readonly travelPx: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly durationMs: number;
}

export interface UseElementMorphReturn {
    play: () => void;
    cancel: () => void;
    clear: (el?: HTMLElement | null) => void;
    /** Seat the explicit source→destination geometry without starting a clock. */
    seat: (progress: number) => void;
    /** Drive a gesture offset through this same spatial writer. */
    offset: (x: number, y: number) => void;
    /** Re-measure and retarget an in-flight episode from its live frame. */
    refresh: () => void;
    playing: Readonly<Ref<boolean>>;
    progress: Readonly<Ref<number>>;
    measurement: Readonly<Ref<ElementMorphMeasurement | null>>;
}

interface Geometry {
    base: MorphRect;
    source: MorphRect;
    destination: MorphRect;
}

interface MorphFrame {
    [channel: string]: number;
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
    opacity: number;
    blur: number;
    clock: number;
}

// The component/element → root-element resolver lives in engine-free `core/asElement`
// (one home; the SCC boundary blocks the /motion-core leaves from importing this
// keyframes-bearing module).
import { asElement } from "../core/asElement";

export function lockSpatialTransition(el: HTMLElement): () => void {
    const previous = el.style.transitionProperty;
    el.style.transitionProperty = "none";
    return () => {
        el.style.transitionProperty = previous;
    };
}

export function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);
const toRect = (rect: DOMRect): MorphRect => ({
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
});
const centerX = (rect: MorphRect): number => rect.x + rect.width / 2;
const centerY = (rect: MorphRect): number => rect.y + rect.height / 2;

/**
 * A single explicit-endpoint FLIP owner for reveal, bloom, receive and gesture
 * configurations. Replacements and resizes retarget from the last painted frame;
 * disappearing foreign endpoints retain the last valid geometry.
 */
export function useElementMorph(
    surface: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseElementMorphOptions,
): UseElementMorphReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const opacityOn = options.channels?.opacity !== false;
    const blurPx = Math.max(0, options.channels?.blur ?? 0);
    const { response, dampingFraction } = springPreset(options.preset ?? "dock");
    const easing = springTimingFunction({ response, dampingFraction });

    const playing = ref(false);
    const progress = ref(0);
    const measurement = ref<ElementMorphMeasurement | null>(null);

    let owner: NumericAnimation<MorphFrame> | null = null;
    let activeEl: HTMLElement | null = null;
    let currentFrame: MorphFrame | null = null;
    let currentGeometry: Geometry | null = null;
    let currentSignature = "";
    let durationMs = response * 4 * 1000;
    let releaseLock: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function stopOwner(): void {
        const active = owner;
        owner = null;
        active?.stop();
    }

    function disconnectObserver(): void {
        resizeObserver?.disconnect();
        resizeObserver = null;
    }

    function clear(elMaybe?: HTMLElement | null): void {
        const el = elMaybe ?? asElement(surface.value);
        if (el) {
            el.style.transform = "";
            el.style.transformOrigin = "";
            el.style.opacity = "";
            el.style.filter = "";
        }
        releaseLock?.();
        releaseLock = null;
    }

    function cancel(): void {
        const el = activeEl;
        stopOwner();
        disconnectObserver();
        if (el) clear(el);
        else {
            releaseLock?.();
            releaseLock = null;
        }
        activeEl = null;
        currentFrame = null;
        currentGeometry = null;
        playing.value = false;
    }

    /** Read the surface's settled box without feeding our current transform back in. */
    function settledRect(el: HTMLElement): MorphRect {
        const transform = el.style.transform;
        el.style.transform = "";
        const rect = toRect(el.getBoundingClientRect());
        el.style.transform = transform;
        return rect;
    }

    function resolveEndpoint(endpoint: MorphEndpoint, base: MorphRect): MorphRect | null {
        if (endpoint === "self") return base;
        const el = asElement(endpoint.value);
        return el ? toRect(el.getBoundingClientRect()) : null;
    }

    function measure(el: HTMLElement): Geometry | null {
        const base = settledRect(el);
        const sourceRect = resolveEndpoint(options.source, base);
        const destinationRect = resolveEndpoint(options.destination, base);
        if (!sourceRect || !destinationRect) return null;
        return { base, source: sourceRect, destination: destinationRect };
    }

    function frameAt(geometry: Geometry, rawProgress: number): MorphFrame {
        const p = clamp01(rawProgress);
        const { base, source: from, destination: to } = geometry;
        const width = from.width + (to.width - from.width) * p;
        const height = from.height + (to.height - from.height) * p;
        const x = from.x + (to.x - from.x) * p;
        const y = from.y + (to.y - from.y) * p;
        const scaleX = base.width > 0 ? width / base.width : 1;
        const scaleY = base.height > 0 ? height / base.height : 1;
        const sourceIsSelf = options.source === "self";
        const destinationIsSelf = options.destination === "self";
        const presence = sourceIsSelf === destinationIsSelf ? 1 : sourceIsSelf ? 1 - p : p;
        const blur = sourceIsSelf === destinationIsSelf ? 0 : sourceIsSelf ? blurPx * p : blurPx * (1 - p);
        return {
            // Center-origin translation keeps unequal endpoint sizes aligned by their
            // measured centers; top-left deltas drift whenever scale changes.
            translateX: x + width / 2 - centerX(base),
            translateY: y + height / 2 - centerY(base),
            scaleX,
            scaleY,
            opacity: opacityOn ? presence : 1,
            blur,
            clock: p,
        };
    }

    function paint(el: HTMLElement, frame: MorphFrame): void {
        currentFrame = frame;
        el.style.transform = `translate(${frame.translateX}px, ${frame.translateY}px) scale(${frame.scaleX}, ${frame.scaleY})`;
        el.style.transformOrigin = "center center";
        if (opacityOn) el.style.opacity = String(clamp01(frame.opacity));
        if (blurPx > 0) el.style.filter = `blur(${Math.max(0, frame.blur).toFixed(2)}px)`;
    }

    function signature(geometry: Geometry): string {
        const { base, source: from, destination: to } = geometry;
        return [
            base.x,
            base.y,
            base.width,
            base.height,
            from.x,
            from.y,
            from.width,
            from.height,
            to.x,
            to.y,
            to.width,
            to.height,
        ].join(":");
    }

    function recordMeasurement(geometry: Geometry): void {
        const { source: from, destination: to } = geometry;
        measurement.value = {
            travelPx: Math.hypot(centerX(to) - centerX(from), centerY(to) - centerY(from)),
            scaleX: from.width > 0 ? to.width / from.width : 1,
            scaleY: from.height > 0 ? to.height / from.height : 1,
            durationMs,
        };
    }

    function finish(el: HTMLElement, animation?: NumericAnimation<MorphFrame>): void {
        if (animation && owner !== animation) return;
        owner = null;
        disconnectObserver();
        const terminal = currentGeometry ? frameAt(currentGeometry, 1) : null;
        clear(el);
        if (opacityOn && terminal) el.style.opacity = String(clamp01(terminal.opacity));
        activeEl = null;
        currentFrame = null;
        progress.value = 1;
        playing.value = false;
        options.onSettled?.();
    }

    function run(
        el: HTMLElement,
        start: MorphFrame,
        end: MorphFrame,
        startProgress: number,
        runDuration: number,
    ): void {
        const animation = new NumericAnimation<MorphFrame>(
            [
                { ...start, clock: 0 },
                { ...end, clock: 1 },
            ],
            {
                duration: runDuration,
                timingFunction: easing,
            },
        );
        owner = animation;
        void animation
            .play((frame) => {
                if (owner !== animation) return;
                if (asElement(surface.value) !== el) {
                    cancel();
                    return;
                }
                const local = clamp01(frame.clock);
                const arrival = startProgress + (1 - startProgress) * local;
                progress.value = arrival;
                paint(el, frame);
                options.onFrame?.(arrival);
            })
            .then(() => finish(el, animation));
    }

    function observe(el: HTMLElement): void {
        disconnectObserver();
        if (typeof ResizeObserver === "undefined") return;
        resizeObserver = new ResizeObserver(refresh);
        const nodes = new Set<HTMLElement>([el]);
        for (const endpoint of [options.source, options.destination]) {
            if (endpoint !== "self") {
                const node = asElement(endpoint.value);
                if (node) nodes.add(node);
            }
        }
        nodes.forEach((node) => resizeObserver?.observe(node));
    }

    function refresh(): void {
        const el = activeEl;
        if (!el || !playing.value || !currentFrame) return;
        const geometry = measure(el);
        if (!geometry) return; // keep the last valid destination if a foreign node leaves
        const nextSignature = signature(geometry);
        if (nextSignature === currentSignature) return;
        currentSignature = nextSignature;
        currentGeometry = geometry;
        recordMeasurement(geometry);
        const start = currentFrame;
        const startProgress = progress.value;
        stopOwner();
        run(
            el,
            start,
            frameAt(geometry, 1),
            startProgress,
            Math.max(1, durationMs * (1 - startProgress)),
        );
    }

    function play(): void {
        const el = asElement(surface.value);
        if (!el) return;
        const interrupted = owner !== null && activeEl === el && currentFrame !== null;
        const liveFrame = interrupted ? currentFrame : null;
        stopOwner();
        if (!interrupted) {
            releaseLock?.();
            releaseLock = lockSpatialTransition(el);
        }
        activeEl = el;
        durationMs = response * 4 * 1000 * motionTempo(el);
        const geometry = measure(el);
        if (!geometry) {
            playing.value = true;
            currentGeometry = null;
            finish(el);
            return;
        }
        currentGeometry = geometry;
        currentSignature = signature(geometry);
        recordMeasurement(geometry);
        const start = liveFrame ?? frameAt(geometry, 0);
        paint(el, start); // synchronous source seat: no full-size first paint
        progress.value = 0;
        playing.value = true;

        if (
            (respectPRM && prefersReducedMotion()) ||
            typeof requestAnimationFrame !== "function"
        ) {
            finish(el);
            return;
        }
        observe(el);
        run(el, start, frameAt(geometry, 1), 0, durationMs);
    }

    function seat(rawProgress: number): void {
        const el = asElement(surface.value);
        if (!el || playing.value) return;
        const geometry = measure(el);
        if (!geometry) {
            if (opacityOn) el.style.opacity = rawProgress < 1 ? "0" : "1";
            return;
        }
        currentGeometry = geometry;
        paint(el, frameAt(geometry, rawProgress));
    }

    function offset(x: number, y: number): void {
        const el = asElement(surface.value);
        if (!el) return;
        stopOwner();
        disconnectObserver();
        activeEl = el;
        releaseLock ??= lockSpatialTransition(el);
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.transformOrigin = "center center";
    }

    const endpointRefs = [options.source, options.destination].filter(
        (endpoint): endpoint is Exclude<MorphEndpoint, "self"> => endpoint !== "self",
    );
    const stopEndpointWatch = watch(
        () => endpointRefs.map((endpoint) => endpoint.value),
        () => {
            if (!activeEl || !playing.value) return;
            observe(activeEl);
            refresh();
        },
        { flush: "post" },
    );

    onScopeDispose(() => {
        stopEndpointWatch();
        cancel();
    });

    return {
        play,
        cancel,
        clear,
        seat,
        offset,
        refresh,
        playing: readonly(playing),
        progress: readonly(progress),
        measurement: readonly(measurement),
    };
}
