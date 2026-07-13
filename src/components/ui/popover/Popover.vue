<script setup lang="ts">
// <Popover> — the sealed overlay union (BI.W-OVERLAY-UNION, the D-FACTOR flagship).
//
// ONE noun with a `trigger` axis (click | hover | context) that switches the reka
// ROOT internally: fine-hover → HoverCardRoot (reka's hover-open/defer-leave timer);
// click / context / coarse-pointer-promoted-hover → PopoverRoot (tap-toggle). The
// Kronecker fold of HoverPopover + HoverCard onto ONE primitive (UF-P7/UF-J6). The
// compound children (`<PopoverTrigger>`/`<PopoverContent>`) read the resolved root
// through the provided union context so ONE markup shape serves both roots.
import { computed, watch } from "vue";
import { HoverCardRoot, PopoverRoot } from "reka-ui";
import type { PopoverRootProps } from "reka-ui";
import { useOptionalDockContext } from "../../custom/dock/composables/dockContext";
import { providePopoverUnion } from "./popoverContext";
import type { Trigger } from "../_shared/axes";

const props = withDefaults(
    defineProps<
        Omit<PopoverRootProps, "open"> & {
            /** The trigger axis — click (default) · hover · context. */
            trigger?: Trigger;
            /** ms before the fine-hover branch opens (HoverCardRoot). */
            openDelay?: number;
            /** ms before the fine-hover branch closes on leave. */
            closeDelay?: number;
            /**
             * Hold the parent `<GlassDock>` open while this popover is visible.
             * The ONE `watch(open)` below serves BOTH roots — no-op outside a
             * dock context (the inject falls back to null).
             */
            keepDockOpen?: boolean;
        }
    >(),
    {
        trigger: "click",
        openDelay: 250,
        closeDelay: 150,
        keepDockOpen: false,
    },
);

/**
 * Public `v-model:open` — `defineModel` with NO default. reka's HoverCardRoot
 * (and PopoverRoot) evaluate `passive: props.open === void 0` at setup, so a
 * defaulted `false` would FORCE the controlled path and swallow the uncontrolled
 * hover cadence. Undefined → passive/uncontrolled (reka owns state, emits
 * `update:open`); a parent that binds `v-model:open` receives the debounced
 * `update:open` re-emit (defineModel re-emits when reka writes the ref through
 * the `v-model:open` binding on the reka root — the outer re-emit is wired, not a
 * silent no-op).
 */
const open = defineModel<boolean>("open");

// Coarse-pointer detection — a fine-hover trigger is structurally dead on touch
// (reka's `excludeTouch` gates the pointerenter open), so promote it to the
// tap-toggle PopoverRoot branch. Evaluated once (a pointer type does not change
// mid-session on real hardware); SSR-safe (window guarded).
const isCoarsePointer =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

const usesHoverRoot = computed(
    () => props.trigger === "hover" && !isCoarsePointer,
);

// PROVIDE the resolved-root flag so `<PopoverTrigger>`/`<PopoverContent>` render
// the reka trigger/content that matches the live root.
providePopoverUnion({ usesHoverRoot });

// ── keepDockOpen — the ONE watch(open) serving BOTH roots. ──
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

// The reka PopoverRoot passthrough (defaultOpen / modal) minus the union-only
// keys; `open` is owned by defineModel + the `v-model:open` binding.
const rootProps = computed(() => ({
    defaultOpen: props.defaultOpen,
    modal: props.modal,
}));
</script>

<template>
    <!-- fine-hover → reka HoverCardRoot (hover-open + defer-on-leave timers). -->
    <HoverCardRoot
        v-if="usesHoverRoot"
        data-slot="popover"
        v-model:open="open"
        :open-delay="openDelay"
        :close-delay="closeDelay"
    >
        <slot />
    </HoverCardRoot>
    <!-- click / context / coarse-hover → reka PopoverRoot (tap-toggle). -->
    <PopoverRoot v-else data-slot="popover" v-model:open="open" v-bind="rootProps">
        <slot />
    </PopoverRoot>
</template>
