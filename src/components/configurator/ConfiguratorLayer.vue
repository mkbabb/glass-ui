<script setup lang="ts">
import { computed, useId, type HTMLAttributes } from "vue";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../_shared/class-names";

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
 * Recursion-free reveal
 *
 * The reveal is the canonical CSS-only animated-reveal pattern
 * (`grid-template-rows: 0fr ↔ 1fr` with `transition-[grid-template-rows]`)
 * which requires no JS watchers and produces no reactive graph. A
 * JS-watcher collapsible (a reka-ui `<Collapsible>` + `<CollapsibleContent>`
 * height transition) is deliberately NOT used: under Lighthouse's strict cold-
 * load discipline (CPU throttle + network throttle + headless Chrome
 * stable layout gating) reka-ui's `<Presence>` + `<CollapsibleContent>`
 * height-measurement watchers — `getComputedStyle(node).animationName` +
 * `getBoundingClientRect()` reads inside a `watch([isOpen,
 * presentRef.value?.present])` callback — form a non-convergent loop that
 * trips Vue's 100-iteration recursion cap on `<Configurator>`. The
 * a11y surface (`role="button"` + `aria-expanded` + `aria-controls`) is the
 * standard collapsible shape.
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
         * flush). Default `false` keeps the body gap-only.
         */
        dividers?: boolean;
        class?: HTMLAttributes["class"];
        /** Body wrapper class override. */
        bodyClass?: HTMLAttributes["class"];
    }>(),
    {
        // `defineModel("open")` reads `undefined` (not the Boolean-coerced
        // `false`) when no `v-model:open` is bound, so the seed below picks
        // `defaultOpen` (true) for the uncontrolled case — no `open: undefined`
        // withDefaults override is needed.
        defaultOpen: true,
    },
);

// Vue 3.5 defineModel drives the open state — no manual `open` prop +
// `update:open` emit + `internalOpen` mirror + external-sync watch. When a parent
// binds `v-model:open` the model IS the parent's value (controlled mode); when
// unbound (or bound to `undefined`) the local model seeds from `defaultOpen`,
// matching a `props.open ?? props.defaultOpen` uncontrolled cadence.
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
    <!-- The section is a concentric
         CARD, not a flush-square hairline block. The `border` (all-side) width is
         Tailwind; the concentric `border-radius` (max(floor, ctx − inset)) + the
         `overflow: hidden` clip + the section tint + the CARD border-color come from
         the scoped `.configurator-layer` rule in configurator.css, which reads the
         Law-1 relay off the parent ctx (the <Configurator> root site #1 / the gear
         Sheet site #3). The section carries a per-section radius, not a flush
         "no-radius / border-b" block (clean break). The dark-adaptive
         --configurator-divider-section token still
         carries the border color so the card edge survives both glass plates. -->
    <div
        data-slot="configurator-layer"
        :class="
            cn(
                'configurator-layer border',
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
                    'group flex w-full items-center justify-between gap-2 py-2',
                    'tap-squish transition-control text-left hover:bg-foreground/5 focus-ring',
                )
            "
            :aria-expanded="open"
            :aria-controls="bodyId"
            :data-state="stateAttr"
            @click="onToggle"
        >
            <div class="flex min-w-0 items-baseline gap-2">
                <!-- Section label:
                     section (√φ subheading / 600 via .configurator-section-label),
                     NOT a row — a rung above the body-row label register.
                     The class consumes the minted --configurator-section-{size,weight}. -->
                <span class="configurator-section-label truncate">{{ label }}</span>
                <span
                    v-if="sub"
                    class="truncate text-micro font-mono text-muted-foreground/70"
                >
                    {{ sub }}
                </span>
            </div>
            <!-- The chevron rides the shared
                 `transition-disclosure` register (btn.css): the `rotate` longhand on
                 `--spring-present-duration` + the weighty `--ease-cartoon-punch` arrival.
                 A scoped `transition: transform …` would transition the WRONG property
                 (Tailwind's `rotate-180` writes `rotate`, not `transform`, so it would SNAP);
                 the chevron shares the register the Accordion + Select carets use. -->
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
                <!-- The inter-row divider reads the
                     dark-adaptive --configurator-divider token (off the inline
                     `border-border/30` alpha). The `border-t`/`pt-2` arbitrary
                     variants stay (the WIDTH + spacing); `data-dividers` keys the
                     scoped color rule below. The body drops its
                     raw `px-3` literal; its inline padding is the ONE
                     --configurator-pad-inline anchor (configurator.css), aligned with
                     the section trigger + the sheet chrome. -->
                <div
                    :data-dividers="props.dividers || undefined"
                    :class="
                        cn(
                            'configurator-layer-body py-2 space-y-2',
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
 * Section-reveal MOTION. The
 * `grid-template-rows: 0fr ↔ 1fr` reveal machinery is the
 * recursion-free CSS-only pattern. Its timing is the travel register —
 * `--spring-dock` on its OWN `--spring-dock-duration` clock (the clock fence: a
 * disclosure is coordinated extent under pointer intent, and a spring replayed over
 * a generic wall clock is the curve compressed). The height axis is a layout
 * property; the row lands dead, which reads as a quick settle rather than a
 * sluggish linear ramp. The
 * chevron rotation is owned by the shared `transition-disclosure` register
 * (`btn.css`); no scoped chevron transition survives here.
 */
.configurator-layer-region {
    transition: grid-template-rows var(--spring-dock-duration) var(--spring-dock);
}
@media (prefers-reduced-motion: reduce) {
    .configurator-layer-region {
        transition: none;
    }
}
</style>
