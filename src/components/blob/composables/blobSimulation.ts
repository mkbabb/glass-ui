import { readonly, ref, shallowRef, type Ref } from "vue";
import type { BackingSize } from "../../../composables/glass/webgpu/useGpuSubstrate";
import { usePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";
import { cssToOklch, oklchToGammaRgb } from "../../../composables/color";
import type { BlobConfig, MoodParams } from "../types";
import type { BlobMoodSystem } from "./useBlobMood";
import type { BlobPointer } from "./useBlobPointer";
import type { BlobSatelliteSystem } from "./useBlobSatellites";

/** Per-frame state shared by the WebGPU and WebGL2 upload legs. */
export interface BlobFrameState {
    params: MoodParams;
    rgb: [number, number, number];
    simTimeMs: number;
    timeSec: number;
    resolveColor: (css: string) => [number, number, number];
    rimColor: string;
    paletteStops: string[];
    satColors?: string[];
}

/** The exact terminal frame last drawn while the Blob engine was quiescent. */
export interface BlobSettledFrame {
    readonly timeSec: number;
    readonly simulationTimeMs: number;
    readonly buffer: {
        readonly width: number;
        readonly height: number;
        readonly dpr: number;
    };
    readonly simulationOrigin: { readonly x: 0.5; readonly y: 0.5 };
}

export function resolveBlobSettledFrame(
    frame: BlobFrameState | null,
    size: BackingSize | null,
): BlobSettledFrame | null {
    return frame && size
        ? {
              timeSec: frame.timeSec,
              simulationTimeMs: frame.simTimeMs,
              buffer: { width: size.w, height: size.h, dpr: size.dpr },
              simulationOrigin: { x: 0.5, y: 0.5 },
          }
        : null;
}

interface BlobSimulationDeps {
    color: Ref<string>;
    rimColor: Ref<string>;
    paletteStops: Ref<string[]>;
    satelliteColors?: Ref<string[]>;
    mood: BlobMoodSystem;
    pointer: BlobPointer;
    satellites: BlobSatelliteSystem;
    config: BlobConfig;
    getReducedMotion: () => boolean;
    wake: () => void;
}

export function createBlobSimulation(deps: BlobSimulationDeps) {
    const pointerField = usePointerVelocityField();
    const settled = ref(false);
    const settledFrame = shallowRef<BlobSettledFrame | null>(null);
    const colorCache = new Map<string, [number, number, number]>();
    let lastTimeSec = 0;
    let simTimeMs = 0;
    let paused = false;
    let lastDrawnFrame: BlobFrameState | null = null;
    let backingSize: BackingSize | null = null;
    let wakeTimer: ReturnType<typeof setTimeout> | null = null;

    deps.satellites.onPinch((impulse) => deps.pointer.click(impulse));

    const resolveColor = (css: string): [number, number, number] => {
        const cached = colorCache.get(css);
        if (cached) return cached;
        const rgb = oklchToGammaRgb(cssToOklch(css));
        if (colorCache.size > 256) colorCache.clear();
        colorCache.set(css, rgb);
        return rgb;
    };
    const isQuiescent = (): boolean =>
        deps.mood.isSettled() &&
        deps.pointer.isAtRest() &&
        deps.satellites.isQuiescent();

    const syncSettled = (): boolean => {
        const next = isQuiescent();
        settled.value = next;
        if (next) {
            settledFrame.value = resolveBlobSettledFrame(lastDrawnFrame, backingSize);
        }
        return next;
    };
    const clearWake = (): void => {
        if (wakeTimer === null) return;
        clearTimeout(wakeTimer);
        wakeTimer = null;
    };
    const scheduleWake = (nextEventMs: number): void => {
        clearWake();
        if (typeof setTimeout === "undefined") return;
        const delayMs = Math.min(Math.max(nextEventMs - simTimeMs, 16), 30_000);
        wakeTimer = setTimeout(() => {
            wakeTimer = null;
            deps.wake();
        }, delayMs);
    };

    const resolveFrame = (timeSec: number): BlobFrameState => {
        const rawDtMs = lastTimeSec ? (timeSec - lastTimeSec) * 1000 : 16;
        lastTimeSec = timeSec;
        const dtMs = Math.max(0, Math.min(rawDtMs, 50));
        const reduced = deps.getReducedMotion();
        const tempo = reduced || paused ? 0 : deps.config.tempo;
        const stepMs = tempo * dtMs;
        simTimeMs += stepMs;

        pointerField.setActive(deps.pointer.active.value);
        if (tempo > 0 && deps.pointer.active.value) {
            const raw = deps.pointer.rawPointer();
            pointerField.setPointer(raw.x * 0.5 + 0.5, raw.y * 0.5 + 0.5);
        }
        pointerField.tick(tempo === 0 ? 0 : dtMs);
        const acceleration = pointerField.acceleration.value;
        const velocity = pointerField.velocity.value;
        const deceleration = -(
            acceleration.x * velocity.x +
            acceleration.y * velocity.y
        );
        if (deceleration > 0 && tempo > 0) {
            deps.pointer.click(
                Math.min(0.5, deceleration * 4 + pointerField.burst.value * 0.2),
            );
        }

        if (!reduced) {
            deps.mood.update({
                pointerActive: deps.pointer.active.value,
                clicked: deps.pointer.consumeClick(),
                idleMs: deps.pointer.idleMs(),
            });
        }
        deps.mood.tick(stepMs);
        if (reduced) deps.pointer.rest();
        else deps.pointer.tick(stepMs);
        deps.satellites.tick(simTimeMs, deps.mood.params.value);

        return {
            params: deps.mood.params.value,
            rgb: resolveColor(deps.color.value),
            simTimeMs,
            timeSec,
            resolveColor,
            rimColor: deps.rimColor.value,
            paletteStops: deps.paletteStops.value,
            satColors: deps.satelliteColors?.value,
        };
    };

    const shouldContinue = (): boolean => {
        const quiescent = syncSettled();
        if (paused) return false;
        if (!quiescent) {
            clearWake();
            return true;
        }
        const satelliteHorizon = deps.satellites.nextEventMs(simTimeMs);
        const moodDelay = deps.mood.nextAutoMoodMs();
        const moodHorizon = Number.isFinite(moodDelay)
            ? simTimeMs + moodDelay
            : Infinity;
        scheduleWake(Math.min(satelliteHorizon, moodHorizon));
        return false;
    };

    return {
        resolveFrame,
        shouldContinue,
        recordBackingSize: (size: BackingSize) => {
            backingSize = size;
        },
        recordDraw: (frame: BlobFrameState) => {
            lastDrawnFrame = frame;
            syncSettled();
        },
        pause: () => {
            paused = true;
            clearWake();
        },
        resume: () => {
            paused = false;
        },
        dispose: clearWake,
        settled: readonly(settled),
        settledFrame: readonly(settledFrame),
    };
}
