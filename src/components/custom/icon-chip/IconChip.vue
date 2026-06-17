<template>
    <span
        v-reveal:[revealArg]="revealStep"
        class="icon-chip"
        :class="
            cn(
                props.bare && 'icon-chip--bare',
                props.duotone && 'icon-chip--duotone',
                props.bloom && 'icon-chip--bloom',
                props.saturated && 'icon-chip--saturated',
                revealOptedIn && 'icon-chip--reveal',
                props.class,
            )
        "
        :data-duotone="props.duotone ? '' : undefined"
        :style="chipStyle"
    >
        <component
            :is="props.icon"
            class="icon-chip__glyph"
            :size="props.glyphSize ?? 22"
            :stroke-width="props.strokeWidth ?? 1.75"
            aria-hidden="true"
        />
    </span>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";
import { vReveal } from "../../../composables/motion/vReveal";
import type { IconChipProps } from "./types";

const DEFAULT_SIZE = 48;
const DEFAULT_GLYPH_SIZE = 22;

const props = defineProps<IconChipProps>();

defineOptions({ name: "IconChip" });

// The event colour — the tone arm (a complete token) wins over the section arm;
// the section arm carries the `--muted-foreground` fallback for an out-of-range
// index (the empty-states paste's fallback, preserved).
const eventColor = computed(() => {
    if (props.tone != null) return props.tone;
    if (props.section != null) {
        return `var(--section-color-${props.section}, var(--muted-foreground))`;
    }
    return "var(--muted-foreground)";
});

// The backplate mix base — the tone arm mixes the tone; the section arm mixes
// the ramp colour with the `--muted` fallback (matching the paste recipe).
const plateColor = computed(() => {
    if (props.tone != null) return props.tone;
    if (props.section != null) {
        return `var(--section-color-${props.section}, var(--muted))`;
    }
    return "var(--muted)";
});

// `vReveal` only animates a chip that opted in. `revealOptedIn` adds the
// `.icon-chip--reveal` class, and the entrance CSS keys off
// `.icon-chip--reveal[data-reveal]` — so a non-opted chip's inert `data-reveal`
// hook (the directive always writes one) never animates. A numeric `reveal` is
// the `--d` stagger index; `true` is index 0; unset/false passes step 0 (inert
// without the opt-in class).
const revealArg = computed<string | undefined>(() => undefined);
const revealOptedIn = computed(
    () => props.reveal != null && props.reveal !== false,
);
const revealStep = computed<number>(() => {
    if (props.reveal === true) return 0;
    if (typeof props.reveal === "number") return props.reveal;
    return 0;
});

// The chip recipe is OWNED here: the diameter floors at glyph × ratio (the d2
// proportion, structural — see icon-chip.css), the backplate + glyph read the
// event tokens. The CSS half (the recipe + the three axes + the dark reconcile)
// is `src/styles/icon-chip.css`.
const chipStyle = computed<CSSProperties>(() => {
    const glyph = props.glyphSize ?? DEFAULT_GLYPH_SIZE;
    return {
        "--icon-chip-event-color": eventColor.value,
        "--icon-chip-plate-color": plateColor.value,
        "--icon-chip-glyph-size": `${glyph}px`,
        "--icon-chip-size": `${props.size ?? DEFAULT_SIZE}px`,
    } as CSSProperties;
});
</script>
