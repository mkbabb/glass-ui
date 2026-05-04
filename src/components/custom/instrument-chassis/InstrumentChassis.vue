<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";
import RegionDivider from "./RegionDivider.vue";

export type InstrumentChassisPhase =
    | "ready"
    | "ping"
    | "download"
    | "upload"
    | "complete";

/**
 * <InstrumentChassis> — single glass surface composing strip / dial / control
 * regions, glued together by twin-line hairline grooves.
 *
 * Three slots compose vertically with two `<RegionDivider>` instances between
 * them. The chassis owns the `--phase-color` cascade via `data-phase`; phase
 * label, hero number, and phase progress fill all read it through one CSS
 * custom property, no per-element listener wiring.
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
        <header class="instrument-strip">
            <slot name="strip" />
        </header>
        <RegionDivider orientation="horizontal" />
        <main class="instrument-dial">
            <slot name="dial" />
        </main>
        <RegionDivider orientation="horizontal" />
        <footer class="instrument-control">
            <slot name="control" />
        </footer>
    </section>
</template>
