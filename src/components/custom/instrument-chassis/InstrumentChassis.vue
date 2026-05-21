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
 * <InstrumentChassis> — single glass surface composing strip / dial / control
 * regions, glued together by twin-line hairline grooves.
 *
 * The default `dial` slot always renders (the chassis's primary content).
 * The optional `strip` (header) and `control` (footer) slots — together with
 * the `<ChassisDivider>` adjacent to each — emit markup only when bound.
 * I gate `<header>`, `<footer>`, and the two dividers on `$slots.strip` /
 * `$slots.control` presence, so empty-slot consumers don't have to suppress
 * the markup with `display: none` overrides. Mirrors the `v-if="$slots.status"`
 * idiom InstrumentRail established.
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
 * Consumers slot their own region content. Speedtest, survey, and thank-you
 * all consume this same component; the slots vary per route.
 */
const props = defineProps<{
    /** Active phase. Drives the `--phase-color` cascade across the chassis. */
    phase?: InstrumentChassisPhase;
    class?: HTMLAttributes["class"];
}>();

const classes = computed(() => cn("instrument-chassis", props.class));
</script>

<template>
    <section :class="classes" :data-phase="phase ?? 'ready'">
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
