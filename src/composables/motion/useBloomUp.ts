// Shared-element bloom: useElementMorph owns geometry and managed playback;
// this wrapper contributes only the destination-field colour channel.

import { onScopeDispose, watch, type Ref } from "vue";
import { type SpringPresetName } from "./springPresets";
import { useElementMorph } from "./useElementMorph";
import {
    clampStrength,
    releaseField,
    resolveField,
    resolveHue,
    writeFieldHue,
    writeFieldStrength,
} from "./bloomUpField";

export type BloomUpPreset = Extract<SpringPresetName, "snappy" | "bouncy">;

export interface UseBloomUpOptions {
    /** The spring register (default `snappy`). */
    preset?: BloomUpPreset;
    /** Starting destination blur in pixels. Default `4`. */
    blur?: number;
    /** Explicit field hue; otherwise read from the source's `--glass-ambient-hue`. */
    fieldHue?: string;
    /** Destination field; otherwise use the nearest `[data-glass-field]` ancestor. */
    field?: Ref<HTMLElement | null>;
    /** Ambient strength percentage, clamped to `0..8`. Default `8`. */
    fieldStrength?: number;
    /** Snap spatial motion under reduced motion. Default `true`. */
    respectReducedMotion?: boolean;
    /** Seat a newly mounted destination before paint. Default `true`. */
    autoPrime?: boolean;
    /** Fired once when the bloom reaches its terminal state. */
    onBloomed?: () => void;
}

export interface UseBloomUpReturn {
    bloom: () => void;
    reset: () => void;
    prime: () => void;
    blooming: Readonly<Ref<boolean>>;
}

/**
 * Bloom a destination from a source rect while warming its surrounding field.
 * Geometry and paint share `useElementMorph`'s one spring clock; this wrapper has no
 * scheduler or `ElementMorph` instance of its own.
 */
export function useBloomUp(
    source: Ref<HTMLElement | null>,
    dest: Ref<HTMLElement | null>,
    options: UseBloomUpOptions = {},
): UseBloomUpReturn {
    const strength = clampStrength(options.fieldStrength);
    let field: HTMLElement | null = null;
    let hue: string | null = null;

    const morph = useElementMorph(dest, {
        source,
        destination: "self",
        channels: { opacity: true, blur: options.blur ?? 4 },
        preset: options.preset ?? "snappy",
        respectReducedMotion: options.respectReducedMotion,
        onFrame(progress) {
            if (field && hue) writeFieldStrength(field, strength * progress);
        },
        onSettled() {
            if (field && hue) writeFieldStrength(field, strength);
            options.onBloomed?.();
        },
    });

    function release(): void {
        releaseField(field);
        field = null;
        hue = null;
    }

    function bloom(): void {
        const el = dest.value;
        if (!el) return;

        release();
        field = resolveField(el, options.field);
        hue = resolveHue(source.value, options.fieldHue);
        if (field && hue) writeFieldHue(field, hue);
        morph.play();
    }

    function prime(): void {
        const el = dest.value;
        if (!el || morph.playing.value) return;
        el.style.opacity = "0";
        morph.seat(0);
    }

    function reset(): void {
        morph.cancel();
        morph.clear();
        release();
    }

    if (options.autoPrime !== false) {
        watch(
            dest,
            (el) => {
                if (el && !morph.playing.value) prime();
            },
            { flush: "pre" },
        );
    }

    onScopeDispose(release);

    return { bloom, reset, prime, blooming: morph.playing };
}
