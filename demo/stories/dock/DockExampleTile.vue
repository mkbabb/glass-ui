<script setup lang="ts">
// DockExampleTile — the ONE demo chassis for the dock-morph gallery (BE.W-LIQUID-MORPH /
// audit §W10). The 7 gallery examples used to RE-PASTE the tile chassis (bg/stage/
// caption/label/hint), the glass-plate triplet, AND the `--ex-spring`/`--ex-ease` bezier
// 5-10× each — a 2nd motion authority off the shipped `--spring-*` register. This factors
// the duplication ONCE:
//
//   • the bg slot (each example passes its own warm-cream gradient via `#bg`),
//   • the caption props (`label` + `hint`),
//   • the SPRING tokens declared ONCE here — and they are the SHIPPED `--spring-snappy`/
//     `--spring-bouncy` register (NOT a bespoke `cubic-bezier(0.34, 1.32, …)` overshoot
//     re-minted per tile; the gallery now reads the SAME motion authority the engines do),
//   • the PRM block declared ONCE — every transition inside a tile collapses to 0.01ms
//     under `prefers-reduced-motion: reduce` (the example never re-declares it).
//
// THE FIELD CONTRACT. The stage is `[data-glass-field]` — the ambient-tint field
// `useBloomUp`'s 4th color channel warms (it walks up to the nearest `[data-glass-field]`
// ancestor and writes `--glass-ambient-hue`/`--glass-ambient-strength` HERE, never on the
// blooming surface). So a `useBloomUp` example inside this tile gets the field-warm for
// free (the liquid-morph.css `.liquid-stage` precedent, applied to the demo chassis). The
// `.dock-example-stage` re-points the `--glass-tint-source`/`--glass-tint-strength`
// self-engage seam toward the ambient hue — neutral by default (transparent / 0% = the
// warm-cream no-op floor).
//
// Each example COMPOSES the gated library engine (useBloomUp / useDockFission) inside the
// default slot — the demo is a CONSUMER of the real primitives, never a CSS-transition
// facsimile re-fork. The chassis owns ZERO morph logic; it is layout + the field.
import { ref } from "vue";

defineProps<{
    /** The bold label shown in the caption (the surface name). */
    label: string;
    /** The mono sub-caption hint (the morph it demonstrates). */
    hint: string;
}>();

// The stage element — exposed so an example can pass it as the bloom field ref if it wants
// an explicit handle (the auto-walk to `[data-glass-field]` covers the implicit case).
const stageRef = ref<HTMLElement | null>(null);
defineExpose({ stageRef });
</script>

<template>
    <div class="dock-example-tile">
        <!-- the example's own warm-cream gradient backdrop the glass reads against. A
             STATIC gradient (no live GL — the one-GL-per-route budget; the gallery's live
             aurora rides the route-level <DockStage> the gallery hoists). -->
        <div class="dock-example-bg" aria-hidden="true">
            <slot name="bg" />
        </div>

        <!-- the stage — the [data-glass-field] the bloom's 4th color channel warms. The
             example mounts its real-primitive-driven surface here. -->
        <div ref="stageRef" data-glass-field class="dock-example-stage">
            <slot />
        </div>

        <p class="dock-example-caption">
            <span class="dock-example-label">{{ label }}</span>
            <span class="dock-example-hint">{{ hint }}</span>
        </p>
    </div>
</template>

<style scoped>
.dock-example-tile {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: var(--radius-card);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent);

    /* ── THE SHIPPED spring register, declared ONCE for every example inside this tile.
       The gallery now reads the SAME motion authority the engines do — NO bespoke
       `cubic-bezier(0.34, 1.32, 0.5, 1)` overshoot re-minted per tile. An example that
       needs the enter-overshoot reads `--ex-spring` (= --spring-bouncy, the emphatic
       bloom); the effects/exit legs read `--ex-ease` (= --ease-out, no overshoot — a
       closing surface must not overshoot past gone). The durations are the per-spring
       settle clocks (W-GLASS-CAL Unit 3 — never a generic --duration-*). ── */
    --ex-spring: var(--spring-bouncy);
    --ex-spring-duration: var(--spring-bouncy-duration);
    --ex-snappy: var(--spring-snappy);
    --ex-snappy-duration: var(--spring-snappy-duration);
    --ex-ease: var(--ease-out);
}

/* the STATIC warm-cream gradient backdrop (the example fills the #bg slot). */
.dock-example-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}
/* the #bg slot's gradient element fills the bg layer. */
.dock-example-bg :slotted(*) {
    position: absolute;
    inset: 0;
}

/* the stage — the field the bloom warms; the example's surface mounts here. */
.dock-example-stage {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    min-block-size: 17rem;
    padding: 1.5rem;
    /* the ambient-tint field seam — useBloomUp writes --glass-ambient-hue/-strength here
       and every glass plate inside WARMS toward the source's color as it blooms (the iOS
       "the whole world takes on the album's color"). Neutral by default (transparent hue,
       0% strength = the warm-cream no-op floor; the registered @property customs make the
       strength ramp INTERPOLATE). The liquid-morph.css `.liquid-stage` precedent. */
    --glass-tint-source: var(--glass-ambient-hue, transparent);
    --glass-tint-strength: var(--glass-ambient-strength, 0%);
}

.dock-example-caption {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.85rem 1.1rem;
    background: color-mix(in oklab, var(--card), transparent 12%);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-block-start: 1px solid color-mix(in oklab, var(--foreground) 8%, transparent);
}
.dock-example-label {
    font-size: 0.85rem;
    font-weight: 650;
    color: var(--foreground);
}
.dock-example-hint {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.68rem;
    color: var(--muted-foreground);
}

/* ── THE PRM BLOCK declared ONCE for the whole gallery — every transition inside any tile
   collapses to 0.01ms under reduce (the example never re-declares it). The `:deep()`
   reaches the slotted example's transitions; the bloom/fission JS engines own their own
   PRM snap (the spring's respectReducedMotion), so this covers the chassis + any residual
   example CSS transition (none should animate a layout property — proof:no-layout-animation
   guards that the moment it widens to demo/). ── */
@media (prefers-reduced-motion: reduce) {
    .dock-example-tile :deep(*) {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
    }
}
</style>
