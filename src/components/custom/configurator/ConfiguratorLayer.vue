<script setup lang="ts">
import { computed, useId, type HTMLAttributes } from "vue";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../../../utils/cn";

/**
 * <ConfiguratorLayer> — labeled section inside a <Configurator>'s controls
 * column. Provides a header trigger + chevron affordance + collapsible body.
 * Authors stack multiple layers to express the per-axis split (per R2 §C:
 * aurora has Medium / Palette / Flow / Texture / Comp / Nuclei; blob has
 * Mood / Body / Surface / Color / Motion / Pointer / Render).
 *
 * The layer is uncontrolled by default (`defaultOpen` opens at mount);
 * pass `:open` + `@update:open` for controlled mode (e.g., when a
 * SegmentedTabs / DockLayerGroup at the parent governs which layer is
 * active).
 *
 * # M.W2 Lane A (F-ε-3 fix) — recursion-free reveal
 *
 * Earlier versions composed `<Collapsible>` + `<CollapsibleContent>` from
 * reka-ui to drive the height transition. Under Lighthouse's strict cold-
 * load discipline (CPU throttle + network throttle + headless Chrome
 * stable layout gating) this surfaced a watcher-graph race inside reka-
 * ui's `<Presence>` + `<CollapsibleContent>` height-measurement watchers
 * — `getComputedStyle(node).animationName` + `getBoundingClientRect()`
 * reads inside a `watch([isOpen, presentRef.value?.present])` callback
 * created a non-convergent loop that tripped Vue's 100-iteration
 * recursion cap on `<Configurator>`.
 *
 * This component now uses the canonical CSS-only animated-reveal pattern
 * (`grid-template-rows: 0fr ↔ 1fr` with `transition-[grid-template-rows]`)
 * which requires no JS watchers and produces no reactive graph. The
 * a11y surface (`role="button"` + `aria-expanded` + `aria-controls`)
 * matches the prior reka-ui shape; consumers do not need to migrate.
 *
 * Cf. `docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md`.
 */
const props = withDefaults(
    defineProps<{
        /** Header label (large, semantic). */
        label: string;
        /** Optional sub-label / token reference (small, monospaced). */
        sub?: string;
        /** Optional id used by external state (e.g., a sibling tab row). */
        id?: string;
        /** Uncontrolled initial state. */
        defaultOpen?: boolean;
        /**
         * Opt-in inter-row hairline. When set, sibling rows inside the body
         * are separated by a `border-border/30` top rule (the first row stays
         * flush). Default `false` keeps the body gap-only (pre-AU.W9 visual).
         */
        dividers?: boolean;
        class?: HTMLAttributes["class"];
        /** Body wrapper class override. */
        bodyClass?: HTMLAttributes["class"];
    }>(),
    {
        // `defineModel("open")` reads `undefined` (not the Boolean-coerced
        // `false`) when no `v-model:open` is bound, so the seed below picks
        // `defaultOpen` (true) for the uncontrolled case — the prior
        // `open: undefined` withDefaults override is no longer needed.
        defaultOpen: true,
    },
);

// Vue 3.5 defineModel — replaces the manual `open` prop + `update:open` emit +
// the `internalOpen` mirror + the external-sync watch. When a parent binds
// `v-model:open` the model IS the parent's value (controlled mode); when
// unbound (or bound to `undefined`) the local model seeds from `defaultOpen`,
// preserving the prior `props.open ?? props.defaultOpen` uncontrolled cadence.
const open = defineModel<boolean | undefined>("open", { default: undefined });

if (open.value === undefined) {
    open.value = props.defaultOpen;
}

// Vue 3.5 useId() — generates an SSR-stable, instance-unique id for the
// collapsible region (a11y aria-controls pairing). No counter state, no
// HMR collision risk.
const fallbackId = `configurator-layer-body-${useId()}`;
const bodyId = computed(() => props.id ?? fallbackId);

function onToggle(): void {
    open.value = !open.value;
}

const stateAttr = computed(() => (open.value ? "open" : "closed"));
</script>

<template>
    <!-- No per-section radius: rounding is owned at the container root clip (Configurator.vue rounded-panel + overflow-hidden); flush sections keep straight border-b dividers — a per-section radius only deforms the hairline on a transparent border-only element. -->
    <!-- BA.W-CONFIG-CHASSIS.1 (CFG-4) — the SECTION divider reads the dark-adaptive
         --configurator-divider-section token (off the inline `border-border/40`
         alpha that vanished on the dark glass plate). The `border-b` width stays
         Tailwind; the COLOR comes from the scoped `.configurator-layer` rule below
         (which also paints the faint section tonal step). -->
    <div
        data-slot="configurator-layer"
        :class="
            cn(
                'configurator-layer border-b last:border-b-0',
                props.class,
            )
        "
        :data-state="stateAttr"
    >
        <button
            type="button"
            data-slot="configurator-layer-trigger"
            :class="
                cn(
                    'configurator-layer-trigger',
                    // Glass-atoms section trigger: tap-squish press-spring +
                    // transition-control surface cross-fade + the canonical
                    // focus-ring under the full four-state contract. The press
                    // springs on the same register every band atom uses.
                    'group flex w-full items-center justify-between gap-2 px-3 py-2',
                    'tap-squish transition-control text-left hover:bg-foreground/5 focus-ring',
                )
            "
            :aria-expanded="open"
            :aria-controls="bodyId"
            :data-state="stateAttr"
            @click="onToggle"
        >
            <div class="flex min-w-0 items-baseline gap-2">
                <!-- The SECTION register (AZ.W-HIERARCHY D6-3): the label reads as a
                     section (√φ subheading / 600 via .configurator-section-label),
                     NOT a row — lifting off the prior flat `text-small font-semibold`.
                     The class consumes the minted --configurator-section-{size,weight}. -->
                <span class="configurator-section-label truncate">{{ label }}</span>
                <span
                    v-if="sub"
                    class="truncate text-micro font-mono text-muted-foreground/70"
                >
                    {{ sub }}
                </span>
            </div>
            <!-- BG.W-DISCLOSURE-ROTATE — the chevron rides the ONE shared
                 `transition-disclosure` register (btn.css): the `rotate` longhand on
                 `--spring-snappy-duration` + the weighty `--ease-cartoon-punch` arrival.
                 The prior scoped `transition: transform …` transitioned the WRONG property
                 (Tailwind's `rotate-180` writes `rotate`, not `transform`, so it SNAPPED);
                 folded onto the register the Accordion + Select carets share. -->
            <ChevronDown
                class="h-4 w-4 shrink-0 text-muted-foreground group-data-[state=open]:rotate-180 transition-disclosure"
                aria-hidden="true"
            />
        </button>
        <!--
            CSS-only animated reveal: the outer grid morphs its single row
            from `0fr` to `1fr` with `transition-[grid-template-rows]`; the
            inner wrapper sets `overflow: hidden` and `min-h-0` so the inner
            body collapses cleanly. No Vue watchers; no DOM-measurement
            race. Matches the reka-ui `data-state` vocabulary so existing
            consumer CSS (chevron rotate, etc.) keeps working.
        -->
        <!-- inert pulls the collapsed subtree from tab order + a11y tree—the aria-hidden-focus closure -->
        <div
            :id="bodyId"
            role="region"
            :aria-hidden="!open"
            :inert="!open || undefined"
            :data-state="stateAttr"
            class="configurator-layer-region grid motion-reduce:transition-none"
            :style="{ gridTemplateRows: open ? '1fr' : '0fr' }"
        >
            <div class="min-h-0 overflow-hidden">
                <!-- BA.W-CONFIG-CHASSIS.1 (CFG-4) — the inter-row divider reads the
                     dark-adaptive --configurator-divider token (off the inline
                     `border-border/30` alpha). The `border-t`/`pt-2` arbitrary
                     variants stay (the WIDTH + spacing); `data-dividers` keys the
                     scoped COLOR rule below. -->
                <div
                    :data-dividers="props.dividers || undefined"
                    :class="
                        cn(
                            'configurator-layer-body px-3 py-2 space-y-2',
                            props.dividers && '[&>*+*]:border-t [&>*+*]:pt-2',
                            props.bodyClass,
                        )
                    "
                >
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/*
 * Section-reveal MOTION (the D1 "faster/smoother/springier" ask). The
 * `grid-template-rows: 0fr ↔ 1fr` reveal machinery is the M.W2 Lane A
 * recursion-free CSS-only pattern — UNTOUCHED. Only its TIMING moves: from
 * the prior flat `duration-200 ease-out` bezier onto the §6 enter register —
 * the fast snappy spring (`--spring-snappy`) at `--duration-fast`. The
 * height axis is a layout property; the snappy `linear()` overshoot reads as
 * a quick settle (sub-perceptual peak), not a sluggish 200ms ramp. The
 * chevron rotation is owned by the shared `transition-disclosure` register
 * (BG.W-DISCLOSURE-ROTATE, btn.css) — no scoped chevron transition survives here.
 */
.configurator-layer-region {
    transition: grid-template-rows var(--duration-fast) var(--spring-snappy);
}
@media (prefers-reduced-motion: reduce) {
    .configurator-layer-region {
        transition: none;
    }
}
</style>
