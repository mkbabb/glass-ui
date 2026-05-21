<script setup lang="ts">
import { computed, ref, useId, watch, type HTMLAttributes } from "vue";
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
 * BouncyTabs / DockLayerGroup at the parent governs which layer is
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
        /** Controlled open state. Pair with `@update:open`. */
        open?: boolean;
        /** Uncontrolled initial state. */
        defaultOpen?: boolean;
        class?: HTMLAttributes["class"];
        /** Body wrapper class override. */
        bodyClass?: HTMLAttributes["class"];
    }>(),
    {
        // Vue 3 Boolean prop coercion forces `undefined → false` for optional
        // boolean props that have no `default`. Without this `undefined`
        // override, `<ConfiguratorLayer label="…">` (no :open) would receive
        // `props.open === false` and the `ref(props.open ?? props.defaultOpen)`
        // initializer below would default to `false` instead of `true`.
        // Pre-M.W2 the original `<Collapsible :open="internalOpen">`
        // composition silently inherited the same bug — all layers
        // initialized closed, which under Lighthouse cold-load surfaced as
        // part of the F-ε-3 recursion symptom.
        open: undefined,
        defaultOpen: true,
    },
);

const emit = defineEmits<{
    (e: "update:open", value: boolean): void;
}>();

const internalOpen = ref(props.open ?? props.defaultOpen);

watch(
    () => props.open,
    (v) => {
        if (v !== undefined) internalOpen.value = v;
    },
);

// Vue 3.5 useId() — generates an SSR-stable, instance-unique id for the
// collapsible region (a11y aria-controls pairing). No counter state, no
// HMR collision risk.
const fallbackId = `configurator-layer-body-${useId()}`;
const bodyId = computed(() => props.id ?? fallbackId);

function onToggle(): void {
    const next = !internalOpen.value;
    internalOpen.value = next;
    emit("update:open", next);
}

const stateAttr = computed(() => (internalOpen.value ? "open" : "closed"));
</script>

<template>
    <div
        :class="cn('configurator-layer border-b border-border/40 last:border-b-0', props.class)"
        :data-state="stateAttr"
    >
        <button
            type="button"
            :class="
                cn(
                    'configurator-layer-trigger',
                    'group flex w-full items-center justify-between gap-2 px-3 py-2',
                    'text-left transition-colors hover:bg-foreground/5 focus-ring',
                )
            "
            :aria-expanded="internalOpen"
            :aria-controls="bodyId"
            :data-state="stateAttr"
            @click="onToggle"
        >
            <div class="flex min-w-0 items-baseline gap-2">
                <span class="text-sm font-semibold text-foreground">{{ label }}</span>
                <span
                    v-if="sub"
                    class="truncate text-micro font-mono text-muted-foreground/70"
                >
                    {{ sub }}
                </span>
            </div>
            <ChevronDown
                class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
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
        <div
            :id="bodyId"
            role="region"
            :aria-hidden="!internalOpen"
            :data-state="stateAttr"
            class="configurator-layer-region grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
            :style="{ gridTemplateRows: internalOpen ? '1fr' : '0fr' }"
        >
            <div class="min-h-0 overflow-hidden">
                <div :class="cn('configurator-layer-body px-3 py-2 space-y-2', props.bodyClass)">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
