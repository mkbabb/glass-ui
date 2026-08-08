<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { ScrollProgressRimProps } from "./types";

defineOptions({ name: "ScrollProgressRim" });

/* THE SPECTRUM IS THE LIBRARY'S RAINBOW REGISTER (#74 J-9), not a local pick of
   six route-accent rungs. `--section-color-*` is the DEMO's per-route identity
   scale — a component that hard-codes six of its indices ships a spectrum that
   re-tints whenever a route palette moves and that a consumer cannot name. The
   canonical `--rainbow-*` family (tokens/scale-paper.css) is the one spectrum
   vocabulary in the library, already the source for `.btn-rainbow` (utilities/
   btn.css) and the metal sweep (utilities/metal.css); the rim is its third
   consumer, in ROYGBIV order like both of them. A consumer still overrides the
   whole band through `stops`. */
const DEFAULT_STOPS = [
    "var(--rainbow-red)",
    "var(--rainbow-orange)",
    "var(--rainbow-yellow)",
    "var(--rainbow-green)",
    "var(--rainbow-blue)",
    "var(--rainbow-indigo)",
    "var(--rainbow-violet)",
] as const;

const props = withDefaults(defineProps<ScrollProgressRimProps>(), {
    max: 1,
    orientation: "horizontal",
});

const clamp = (value: number, min: number, max: number) =>
    Number.isNaN(value) ? min : Math.min(max, Math.max(min, value));
const max = computed(() =>
    Number.isFinite(props.max) && props.max > 0 ? props.max : 1,
);
const value = computed(() => clamp(props.value, 0, max.value));
const fraction = computed(() => value.value / max.value);
const spectrum = computed(() => (props.stops?.length ? props.stops : DEFAULT_STOPS));

// The spectrum is a LINEAR gradient along the fill axis (never an angular conic):
// as the pill grows it reveals more of the band — the liquid-volume read of law 12.
const spectrumGradient = computed(() => {
    const axis = props.orientation === "vertical" ? "to top" : "to right";
    const stops = spectrum.value;
    if (stops.length === 1) {
        return `linear-gradient(${axis}, ${stops[0]}, ${stops[0]})`;
    }
    const body = stops
        .map(
            (color, index) =>
                `${color} ${((index / (stops.length - 1)) * 100).toFixed(2)}%`,
        )
        .join(", ");
    return `linear-gradient(${axis}, ${body})`;
});

/* One checkpoint per discrete position, at its slot center. A dot the pill has
   reached is CONSUMED — the family's one passed-encoding, declared once in the
   value-marks register and set here by the same `position <= fraction` test
   every composer applies. The fractional `SWALLOW_BAND` crossfade this replaces
   was a second law living in one component's script. */
const marks = computed(() => {
    const segments = props.segments;
    if (!segments?.length) return [];
    return segments.map((_, index) => {
        const position = (index + 0.5) / segments.length;
        return { position, consumed: position <= fraction.value };
    });
});

const style = computed<CSSProperties>(
    () =>
        ({
            "--scroll-progress-rim-fill": `${(fraction.value * 100).toFixed(3)}%`,
            "--scroll-progress-rim-spectrum": spectrumGradient.value,
        }) as CSSProperties,
);
</script>

<template>
    <div
        class="scroll-progress-rim"
        :data-orientation="orientation"
        :style="style"
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin="0"
        :aria-valuenow="value"
        :aria-valuemax="max"
    >
        <span class="scroll-progress-rim__track track-ground" aria-hidden="true">
            <span class="scroll-progress-rim__fill" />
            <span
                v-if="marks.length"
                class="glass-value-marks"
                :data-orientation="orientation === 'vertical' ? 'vertical' : undefined"
            >
                <span
                    v-for="(mark, index) in marks"
                    :key="index"
                    class="glass-value-mark"
                    :data-consumed="mark.consumed || undefined"
                    :style="{
                        '--value-mark-position': `${(mark.position * 100).toFixed(3)}%`,
                    }"
                />
            </span>
        </span>
    </div>
</template>
