<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, useId, watch } from "vue";
import {
    HoverCardContent,
    HoverCardPortal,
    HoverCardRoot,
    HoverCardTrigger,
} from "reka-ui";
import { cn } from "../../../utils";
import { useOptionalDockContext } from "../dock/composables/dockContext";

/**
 * <HoverPopover> — hover-triggered floating label.
 *
 * Substrate carry-forward of A5 §10 row 4 — IconTooltip's tooltip register
 * is too quiet for chassis-tier dock-icon-button consumers (SettingsCog,
 * ActionCluster). HoverPopover ships a popover-tier substrate (glass +
 * border + radius) at tooltip cadence: hover-trigger, defer-on-leave
 * timer, adaptive `side`/`align` that auto-flips off viewport edges.
 *
 * Default register: a single line of label text, sized for icon-button
 * accompaniment (max-width clamps; subtle vertical padding). Pass a
 * default slot for richer content (kbd hints, secondary lines). The
 * `content` prop is the convenience path — most consumers want a single
 * label string.
 *
 * Composition rests on reka-ui's HoverCard primitives so the
 * collision-avoidance + open/close timer machinery come for free; this
 * component is mostly a tighter substrate + a label-shaped default.
 *
 * J.W3.B — `keepDockOpen` extends the primitive with the dock-keep
 * sink contract. While the popover is open inside a `<GlassDock>`,
 * the dock's collapse timer is suppressed via the parent-provided
 * `dockKeepOpen` / `dockRelease` callbacks. No-op outside a dock
 * context — the inject fallbacks are `null`, so non-dock consumers
 * pay nothing.
 */

const props = withDefaults(
    defineProps<{
        /** Convenience: label text. Slot wins if both supplied. */
        content?: string;
        /** Side relative to trigger. Defaults `top` (tooltip register). */
        side?: "top" | "right" | "bottom" | "left";
        /** Alignment along the side. Defaults `center`. */
        align?: "start" | "center" | "end";
        /**
         * ms before opening on hover. Defaults 250 — same as IconTooltip's
         * TooltipProvider cadence so the two read in unison across the
         * dock cluster. Hover-popover-specific (vs. the generic reka-ui
         * `open-delay`) so deeper-nested popovers can extend the defer
         * without colliding with sibling cadence vocabulary.
         */
        hoverOpenDelay?: number;
        /**
         * ms before closing on hover-leave. The "defer-on-leave" timer
         * the dispatch packet calls for; ~150ms gives the pointer time
         * to skim across cluster gaps without flickering.
         */
        closeDelay?: number;
        /** sideOffset in px. Defaults 6 — wider than tooltip's 4. */
        sideOffset?: number;
        /** Class merged onto the rendered HoverPopover content element. */
        class?: HTMLAttributes["class"];
        /**
         * J.W3.B — when mounted inside a `<GlassDock>`, hold the parent
         * dock open while this popover is visible. Hooks the
         * `dockKeepOpen` / `dockRelease` provide/inject contract and
         * is a no-op outside a dock context. The dock's collapse timer
         * is ref-counted so multiple keep-open holds compose cleanly.
         * Also marks the portaled HoverCard content with
         * `data-glass-dock-portal` + `data-glass-dock-owner` so the
         * dock's click-away handler treats clicks inside the popover
         * as "inside the dock".
         */
        keepDockOpen?: boolean;
        /**
         * AQ.W6 — opt into the native `interestfor` + `popover="hint"` path
         * when the browser supports interest invokers. Default `false` →
         * reka-ui `HoverCard` (the unchanged default). When `true` AND the
         * engine supports interest invokers, the trigger carries
         * `interestfor` (an implicit anchor) and the panel renders as a
         * `popover="hint"` top-layer surface driven by the `.glass-top-layer`
         * grammar. When `true` but unsupported, it falls straight through to
         * the reka-ui HoverCard — zero behaviour change.
         *
         * Baseline: `interest-invokers` + `popover-hint` = LIMITED →
         * progressive-enhancement only; reka-ui stays the default path. No
         * polyfill (substrate cannot drag one).
         */
        native?: boolean;
    }>(),
    {
        side: "top",
        align: "center",
        hoverOpenDelay: 250,
        closeDelay: 150,
        sideOffset: 6,
        keepDockOpen: false,
        native: false,
    },
);

/**
 * AB.W2 — open-state two-way binding via Vue 3.5 `defineModel`.
 *
 * `open` is the single source of truth for the dock-keep-open watcher, the
 * `update:open` surface, and reka-ui's HoverCardRoot `v-model:open`. The
 * `{ default: false }` preserves the prior `props.open ?? false` uncontrolled
 * cadence — reka writes the local model ref to drive its internal open state
 * when no parent `v-model:open` is bound; a parent that binds it controls the
 * value and receives `update:open` (the debounced signal honoring
 * `hoverOpenDelay`/`closeDelay`). The prior dual-watch reconciliation
 * (external `props.open` → internal `isOpen` + internal `isOpen` →
 * `update:open` emit) is RETIRED — `defineModel` collapses both legs.
 */
const open = defineModel<boolean>("open", { default: false });

const contentClass = computed(() =>
    cn(
        "z-popover hover-popover-panel popover-animate",
        props.class,
    ),
);

/* AQ.W6 — the native `interestfor` opt-in. Active ONLY when the consumer
   passes `:native="true"` AND the engine supports interest invokers; otherwise
   the component renders the reka-ui HoverCard default below (the kept path). */
const SUPPORTS_INTEREST =
    typeof HTMLButtonElement !== "undefined" &&
    "interestForElement" in HTMLButtonElement.prototype;
const useNative = computed(() => props.native && SUPPORTS_INTEREST);

// A page-unique id wires the trigger's `interestfor` to the `popover="hint"`
// panel (the implicit-anchor + invoker contract).
const nativeId = `gl-hover-popover-${useId() ?? "0"}`;

/* J.W3.B — dock-keep-open sink. Track open state via the `open` model
   (reka's `v-model:open` writes it); while the popover is visible AND
   `keepDockOpen` is set, hold the parent dock open via the provide/inject
   contract `<GlassDock>` ships through `useDockState`. Outside a dock context
   the injects fall back to null and the watcher is a no-op. */

/* AQ.W6 native path — the `popover="hint"` panel's `toggle` event is the
   open-state source (reka's `v-model:open` is not in play). Sync it into the
   shared `open` model so the dock-keep-open watcher + `update:open` surface
   fire identically on both paths. */
function onNativeToggle(e: Event) {
    const next = (e as ToggleEvent).newState === "open";
    if (next !== open.value) open.value = next;
}
/* O.W2 Lane C — `dockId` + keep-open / release callables consolidated under
   the canonical typed-context helper. Outside a `<GlassDock>` the helper
   returns `null` and every `dock?.…` access is a no-op (befitting silent
   default per invariant 25). */
const dock = useOptionalDockContext();
let isHeld = false;

watch(open, (next) => {
    if (!props.keepDockOpen) return;
    if (next && !isHeld) {
        dock?.keepOpen();
        isHeld = true;
    } else if (!next && isHeld) {
        dock?.release();
        isHeld = false;
    }
});

/* Portaled HoverCard content lives outside the dock root, so the
   dock's click-away handler would otherwise treat clicks inside the
   popover as outside-dismiss. Marking the rendered content with the
   dock-portal attrs opts the portal into the dock's
   `isTeleportedTarget` allowlist. */
const portalAttrs = computed(() =>
    props.keepDockOpen && dock?.id
        ? { "data-glass-dock-portal": "", "data-glass-dock-owner": dock.id }
        : {},
);
</script>

<template>
    <!-- AQ.W6 native path — `interestfor` trigger + `popover="hint"` panel.
         Only rendered when `:native` is set AND the engine supports interest
         invokers; the panel rides the `.glass-top-layer` grammar (§2). -->
    <template v-if="useNative">
        <span class="hover-popover-native-trigger" :interestfor="nativeId">
            <slot name="trigger">
                <slot />
            </slot>
        </span>
        <div
            :id="nativeId"
            popover="hint"
            :class="cn('glass-top-layer hover-popover-panel', props.class)"
            v-bind="portalAttrs"
            @toggle="onNativeToggle"
        >
            <slot name="content">
                <span class="hover-popover-label">{{ content }}</span>
            </slot>
        </div>
    </template>

    <!-- Default (kept) path — reka-ui HoverCard. -->
    <HoverCardRoot
        v-else
        v-model:open="open"
        :open-delay="hoverOpenDelay"
        :close-delay="closeDelay"
    >
        <HoverCardTrigger as-child>
            <slot name="trigger">
                <slot />
            </slot>
        </HoverCardTrigger>
        <HoverCardPortal>
            <HoverCardContent
                :side="side"
                :align="align"
                :side-offset="sideOffset"
                :avoid-collisions="true"
                :class="contentClass"
                v-bind="portalAttrs"
            >
                <slot name="content">
                    <span class="hover-popover-label">{{ content }}</span>
                </slot>
            </HoverCardContent>
        </HoverCardPortal>
    </HoverCardRoot>
</template>
