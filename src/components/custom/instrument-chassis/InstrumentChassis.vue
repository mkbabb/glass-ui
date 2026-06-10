<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";
import ChassisDivider from "./ChassisDivider.vue";

export type InstrumentChassisPhase =
    | "ready"
    | "ping"
    | "download"
    | "upload"
    | "jitter"
    | "complete";

/**
 * The chassis register discriminator.
 *
 * - `"glass"` (default) — the canonical chassis surface. Reads the resting
 *   glass tier plus the `--glass-curvature-overlay`, the engraved-bezel
 *   inner stroke, and the phase-color tint cascade. Every speedtest /
 *   survey / thank-you consumer at HEAD lands here.
 *
 * - `"spine"` (AL-W1-α augmented; per AL-X5 §4.1) — the HOUSING register.
 *   Polished SLEEVE, not glass: NO `backdrop-filter`, NO plate opacity,
 *   hairline outer stroke at `--glass-spine-border`, interior radial
 *   vignette that subtly carries the phase-color cascade. Inset from the
 *   viewport by `clamp(0.5rem, 2vw, 1.25rem)` so the chassis edge sits
 *   beyond an inner card's outer edge. Closes the AK W2 chassis-spine
 *   architectural underclaim. Consumed at quiet-content App-level
 *   mounts (the inner card paints its own glass tier — the spine is
 *   the housing that frames it).
 */
export type InstrumentChassisVariant = "glass" | "spine";

/**
 * <InstrumentChassis> — single glass surface composing strip / dial / control
 * regions, glued together by twin-line hairline grooves.
 *
 * The default `dial` slot always renders (the chassis's primary content).
 * The optional `strip` (header) and `control` (footer) slots — together with
 * the `<ChassisDivider>` adjacent to each — emit markup only when bound.
 * I gate `<header>`, `<footer>`, and the two dividers on `$slots.strip` /
 * `$slots.control` presence, so empty-slot consumers don't have to suppress
 * the markup with `display: none` overrides — the `v-if="$slots.status"`
 * slot-gating idiom.
 *
 * The chassis owns the `--phase-color` cascade via `data-phase`; phase label,
 * hero number, and phase progress fill all read it through one CSS custom
 * property, no per-element listener wiring.
 *
 * The chassis carries the engraved-bezel `::before` stroke and the
 * radial-gradient curvature overlay — both are chassis character, persistent
 * at all phases. Disco accents (specular swap, sparkle, phase-glow,
 * disco-grain) are reserved for interactive moments; see `instrument-chassis.css`
 * for the reservation rules.
 *
 * The `variant` prop discriminates the surface register (see
 * `InstrumentChassisVariant` above). The phase cascade (`data-phase`) is
 * orthogonal to the variant — both registers retint identically; only the
 * surface recipe forks.
 *
 * Consumers slot their own region content. Speedtest, survey, and thank-you
 * all consume this same component; the slots vary per route.
 */
const props = withDefaults(
    defineProps<{
        /** Active phase. Drives the `--phase-color` cascade across the chassis. */
        phase?: InstrumentChassisPhase;
        /**
         * Surface register. Defaults to `"glass"` (the canonical chassis
         * plate). Pass `"spine"` at App-level mount paths to get the
         * housing register (polished sleeve, no backdrop-filter, interior
         * vignette + hairline outer stroke).
         */
        variant?: InstrumentChassisVariant;
        class?: HTMLAttributes["class"];
    }>(),
    {
        variant: "glass",
    },
);

const classes = computed(() => cn("instrument-chassis", props.class));
</script>

<template>
    <section
        :class="classes"
        :data-phase="phase ?? 'ready'"
        :data-variant="variant"
    >
        <header v-if="$slots.strip" class="instrument-strip">
            <slot name="strip" />
        </header>
        <ChassisDivider v-if="$slots.strip" orientation="horizontal" />
        <main class="instrument-dial">
            <slot name="dial" />
        </main>
        <ChassisDivider v-if="$slots.control" orientation="horizontal" />
        <footer v-if="$slots.control" class="instrument-control">
            <slot name="control" />
        </footer>
    </section>
</template>
