// `useBlob` — facade for the canon Blob primitive.
//
// Wires the four blob composables (mood + pointer + satellites + renderer)
// into the canonical 30-line stitching the `<Blob>` component will consume
// in Wβ2. Composers wanting custom shells (multi-instance compositions,
// SVG satellites, alternative renderers) call the four directly.
//
// SPEC.md §3 (Public API) + §6 (Composable graph).

import {
    computed,
    ref,
    shallowRef,
    toRef,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

import { useRAFLoop, type RAFLoopTiming } from "../motion";
import { useBlobMood } from "./_internal/useBlobMood";
import { useBlobPointer } from "./_internal/useBlobPointer";
import { useBlobSatellites } from "./_internal/useBlobSatellites";
import { useMetaballRenderer } from "./_internal/useMetaballRenderer";
import {
    BLOB_CONFIG_DEFAULTS,
    type BlobColorHsl,
    type BlobConfig,
    type BlobMood,
    type RendererHandle,
} from "./types";

export interface UseBlobProps {
    /** HSL accent color for the blob; values normalized 0..1. */
    color?: MaybeRefOrGetter<BlobColorHsl>;
    /** Mood character expression; default `"idle"`. */
    mood?: MaybeRefOrGetter<BlobMood>;
    /** Partial overrides merged onto `BLOB_CONFIG_DEFAULTS`. */
    config?: MaybeRefOrGetter<Partial<BlobConfig>>;
    /** Force pointer attraction on coarse-pointer devices. Default false. */
    pointerAttract?: boolean;
    /** PRNG seed for deterministic first frames; default 1618. */
    seed?: number;
}

export interface UseBlobReturn {
    canvasRef: Ref<HTMLCanvasElement | null>;
    render: RendererHandle["render"];
    dispose: RendererHandle["dispose"];
    isWebGL: RendererHandle["isWebGL"];
}

const DEFAULT_COLOR: BlobColorHsl = { h: 0.62, s: 0.65, l: 0.6 };

export function useBlob(props: UseBlobProps): UseBlobReturn {
    const seed = props.seed ?? 1618;

    // Resolve config = defaults ⊕ partial override; keep reactive so live
    // tweaks (mood-driven smoothK, hot-reloaded config) propagate without
    // rebuilding the renderer.
    const partialConfig = toRef(props.config ?? {});
    const config = computed<Required<BlobConfig>>(() => ({
        ...BLOB_CONFIG_DEFAULTS,
        ...partialConfig.value,
    }));

    const mood = toRef(props.mood ?? ("idle" as BlobMood));
    const colorInput = toRef(props.color ?? DEFAULT_COLOR);
    const color = computed<BlobColorHsl>(() => colorInput.value ?? DEFAULT_COLOR);

    const canvasRef = ref<HTMLCanvasElement | null>(null);

    const moodParams = useBlobMood(mood);
    const { attractionForce } = useBlobPointer(canvasRef, {
        force: props.pointerAttract === true,
    });
    // useBlobSatellites consumes the force as a plain Ref<{x,y}>; the
    // readonly wrapper is structurally compatible (read-only access only).
    const pointerForce = attractionForce as unknown as Ref<{
        x: number;
        y: number;
    }>;

    const currentTime = ref(0);
    const sources = useBlobSatellites(config, moodParams, pointerForce, seed, currentTime);

    // Renderer is constructed once the canvas mounts. Until then the facade
    // returns no-op render/dispose; once mounted, calls forward to the live
    // handle. shallowRef so handle replacement does not deep-track the
    // RendererHandle internals.
    const handle = shallowRef<RendererHandle | null>(null);
    const isWebGL = ref(false);

    function buildHandle(): void {
        if (!canvasRef.value) return;
        const next = useMetaballRenderer(
            canvasRef,
            sources as Ref<typeof sources.value>,
            color,
            config,
        );
        handle.value = next;
        // Bridge the renderer's reactive `isWebGL` ref to the facade ref so
        // consumers see one stable Readonly<Ref<boolean>>.
        watch(
            next.isWebGL,
            (v) => {
                isWebGL.value = v;
            },
            { immediate: true },
        );
    }

    watch(
        canvasRef,
        (next, prev) => {
            if (prev && prev !== next) {
                handle.value?.dispose();
                handle.value = null;
            }
            if (next) {
                buildHandle();
                // Paint the static first frame immediately so SSR hydration
                // resolves to a deterministic image (PRM compliance + seed
                // determinism per SPEC.md §11).
                handle.value?.render(currentTime.value);
            }
        },
        { immediate: true },
    );

    // Time driver. `useRAFLoop` with `respectReducedMotion: true` (default)
    // pauses the loop entirely under `prefers-reduced-motion: reduce`; the
    // seeded first frame painted on canvas mount is the static specimen.
    useRAFLoop(
        (timing: RAFLoopTiming) => {
            currentTime.value += timing.delta;
            handle.value?.render(currentTime.value);
        },
        { immediate: true },
    );

    function render(time: number): void {
        handle.value?.render(time);
    }

    function dispose(): void {
        handle.value?.dispose();
        handle.value = null;
    }

    return {
        canvasRef,
        render,
        dispose,
        isWebGL,
    };
}
