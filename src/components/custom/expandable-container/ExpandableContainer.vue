<template>
    <!-- BI.W-ESC-STACK / A11Y-4 — the inline host is ALWAYS mounted. The expand
         trigger PERSISTS (it is the focus-restore target on collapse — a trigger
         that unmounts cannot be restored to), and the host carries `inert` while
         fullscreen so the page-behind footprint (the covered trigger) is not
         keyboard / AT-reachable under the overlay. The default content renders
         inline ONLY while collapsed; on expand it MOVES into the fullscreen panel
         (a single stateful instance — never a duplicate render). -->
    <div class="relative" :inert="open || undefined" v-bind="$attrs">
        <!-- BC.W-EXPANDABLE-PART — the expand affordance is a chrome HOOK, not a
             hard-coded button. `#expand-trigger` (named slot) REPLACES it; the
             unfilled default below renders today's <Maximize2> corner button
             byte-identical. The button carries `data-part="trigger"`
             + `data-mode="expand"` (the `::part()`-analogue re-skin hook a consumer
             styles via a plain descendant selector — NOT a `:deep()` reach). The
             `expand()` callback flips the SAME `v-model:open` (no parallel state). -->
        <slot name="expand-trigger" :expand="expand" :label="expandLabel">
            <button
                data-part="trigger"
                data-mode="expand"
                class="absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-1.5 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                :class="buttonPosition === 'left' ? 'left-2 top-2' : 'right-2 top-2'"
                title="Fullscreen"
                :aria-label="expandLabel"
                @click="expand"
            >
                <Maximize2 class="h-4 w-4" />
            </button>
        </slot>
        <slot v-if="!open" :fullscreen="false" />
    </div>

    <!-- Fullscreen mode: teleport to body. BA.W-SURFACE-AXIS — the fullscreen
         overlay un-walls onto the floating/overlay GLASS tier (`glass-overlay` +
         the shared `[data-surface]` decoration) so the expand reads as the surface
         LIFTING off the page (a frosted-over-content plate) rather than a solid
         `bg-background` wall erasing it. A consumer who genuinely wants the solid
         wall opts in via `surface="opaque"` (the `--glass-level:0` escape — the wall
         becomes the explicit opt-out, not the silent default).
         BB.W-DEAD-SWEEP — the Teleport is GATED `:disabled="!open"` (the Vue idiom:
         a disabled Teleport renders its children IN PLACE, not to body). The prior
         UNCONDITIONAL `<Teleport to="body">` mounted an empty body anchor on every
         render — the atlas-flagged "always-teleport blank-canvas" residual that
         disturbed body layout/stacking in the inline (`!open`) state. With the
         disabled gate the inline state mounts NO body anchor (the inner `v-if="open"`
         is false AND nothing renders in place); only fullscreen teleports. The
         `open`-driven `syncBodyOverflowLock` watcher is ORTHOGONAL (it fires on the
         `open` state, never on the teleport mount), so the lock ordering is intact. -->
    <Teleport to="body" :disabled="!open">
        <!-- BI.W-ESC-STACK / A11Y-4 — the fullscreen panel composes reka's
             FocusScope (via the house `ui/focus-scope` pass-through — the
             substrate-single discipline): `trapped` keeps Tab inside the overlay,
             the default mount-auto-focus MOVES focus in, and the collapse path
             RESTORES focus to the trigger. reka's own restore captured
             `document.body` (the inline host was already `inert` when the scope
             mounted), so `@unmount-auto-focus` overrides it to the pre-inert
             trigger we captured. `as-child` merges the scope onto the overlay div
             (no wrapper node). -->
        <FocusScope
            v-if="open"
            as-child
            trapped
            @unmount-auto-focus="onFullscreenUnmountAutoFocus"
        >
            <div
                data-part="overlay"
                :data-surface="surface"
                :class="cn(
                    'fixed inset-0 z-modal flex flex-col glass-overlay',
                    surfaceDecoration,
                )"
            >
            <!-- BC.W-EXPANDABLE-PART — the fullscreen-overlay chrome is a HOOK.
                 `#fullscreen-chrome` (named slot) REPLACES it (a branded top
                 toolbar, a custom close); the unfilled default renders today's
                 <Minimize2> corner button byte-identical. `collapse()` flips the
                 SAME `v-model:open`. -->
            <slot
                name="fullscreen-chrome"
                :collapse="collapse"
                :label="collapseLabel"
                :fullscreen="true"
            >
                <button
                    data-part="trigger"
                    data-mode="collapse"
                    class="absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-2 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                    :class="buttonPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'"
                    title="Exit fullscreen"
                    :aria-label="collapseLabel"
                    @click="collapse"
                >
                    <Minimize2 class="h-4 w-4" />
                </button>
            </slot>
            <div data-part="panel" class="h-full w-full">
                <slot :fullscreen="true" />
            </div>
            </div>
        </FocusScope>
    </Teleport>
</template>

<script lang="ts">
let bodyOverflowLockDepth = 0;
let bodyOverflowBeforeLock: string | null = null;

function acquireBodyOverflowLock() {
    if (typeof document === "undefined") return false;

    if (bodyOverflowLockDepth === 0) {
        bodyOverflowBeforeLock = document.body.style.overflow;
        document.body.style.overflow = "hidden";
    }
    bodyOverflowLockDepth += 1;
    return true;
}

function releaseBodyOverflowLock() {
    if (typeof document === "undefined" || bodyOverflowLockDepth === 0) return;

    bodyOverflowLockDepth -= 1;
    if (bodyOverflowLockDepth === 0) {
        document.body.style.overflow = bodyOverflowBeforeLock ?? "";
        bodyOverflowBeforeLock = null;
    }
}
</script>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, watch } from "vue";
import { Maximize2, Minimize2 } from "@lucide/vue";
import { registerShortcut } from "../../../composables/keyboard";
import { FocusScope } from "../../ui/focus-scope";
import { cn } from "../../../utils";
// BA.W-SURFACE-AXIS — the fullscreen overlay routes through the SHARED
// {glass·veil·opaque} axis (it was a solid `bg-background` wall — the IG-B5/FD-6
// off-allowlist miss). Default `glass` (the un-walled frosted-over-content plate);
// `surface="opaque"` is the explicit solid-wall opt-out.
import { decorationClass, type Surface } from "../../ui/_shared/useSurfaceAxis";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        buttonPosition?: "left" | "right";
        /** Accessible name for the expand (fullscreen) button. */
        expandLabel?: string;
        /** Accessible name for the collapse (exit fullscreen) button. */
        collapseLabel?: string;
        /** Surface decoration register for the fullscreen overlay
         *  (BA.W-SURFACE-AXIS) — `glass` (default) frosts over the page;
         *  `opaque` is the solid-wall opt-out; `veil` the borderless plate. */
        surface?: Surface;
    }>(),
    {
        buttonPosition: "right",
        expandLabel: "Fullscreen",
        collapseLabel: "Exit fullscreen",
        surface: "glass",
    },
);

// The veil/opaque decoration on top of the `glass-overlay` base tier (the
// overlay owns the base). BI.W-SURFACE-EXTRACT — decoration-only, no `.replace`
// tier-strip wart. `:data-surface` (template) drives the CSS seam in lockstep.
const surfaceDecoration = computed(() =>
    decorationClass(props.surface),
);

/**
 * Two-way `open` model so consumers can drive fullscreen externally
 * (programmatic toggles, route-driven launches, etc.) while the corner
 * buttons continue to operate without parent wiring.
 */
const open = defineModel<boolean>("open", { default: false });

// BC.W-EXPANDABLE-PART — the ONLY behaviour seam the chrome hooks expose: thin
// wrappers that flip the SAME `v-model:open` (no parallel state ref — the
// one-registry discipline). A consumer's replacement `#expand-trigger` /
// `#fullscreen-chrome` button calls these; the body-lock + teleport + Escape stay
// the SFC's, so there is no machinery a consumer would fork to change the chrome.
function expand() {
    open.value = true;
}
function collapse() {
    open.value = false;
}

let holdsBodyOverflowLock = false;

function syncBodyOverflowLock(fs: boolean) {
    if (fs && !holdsBodyOverflowLock) {
        holdsBodyOverflowLock = acquireBodyOverflowLock();
        return;
    }

    if (!fs && holdsBodyOverflowLock) {
        releaseBodyOverflowLock();
        holdsBodyOverflowLock = false;
    }
}

// BI.W-ESC-STACK / A11Y-4 — the open-transition machine. On OPEN: lock body
// scroll, capture the pre-inert focus (the restore target), and register the
// Escape handler ONLY WHILE OPEN. On CLOSE: unlock + drop the Escape handler.
// The Escape registration lives HERE (register-on-open), NOT in `onMounted`
// (the clean break from the unconditional on-mount handler that let a collapsed
// container swallow Escape from a later overlay — FAM-2). The dispatcher resolves
// Escape LIFO, so while this container is the top-most open overlay its handler
// consumes Escape; a collapsed container holds no handler at all.
let unregEsc: (() => void) | null = null;
let restoreTarget: HTMLElement | null = null;

watch(
    open,
    (isOpen, wasOpen) => {
        syncBodyOverflowLock(isOpen);

        if (isOpen && !wasOpen) {
            // `flush: "pre"` (the default) runs this BEFORE the render applies
            // `inert` to the inline host and the browser blurs the trigger, so
            // `activeElement` here is still the trigger — the collapse restore
            // target.
            const active =
                typeof document !== "undefined" ? document.activeElement : null;
            restoreTarget = active instanceof HTMLElement ? active : null;

            unregEsc = registerShortcut(
                "Escape",
                () => {
                    open.value = false;
                },
                { label: "Exit fullscreen", group: "UI", allowInInput: true },
            );
        } else if (!isOpen && wasOpen) {
            unregEsc?.();
            unregEsc = null;
        }
    },
    { immediate: true },
);

// The collapse focus-restore. reka FocusScope captured `document.body` as its
// own restore target (the inline host was already `inert` when the scope
// mounted), so we `preventDefault` its restore and focus the pre-inert trigger
// instead. `open` is already false here, so the inline host's `inert` is being
// cleared; `nextTick` lets that attribute removal flush before `focus()` (an
// inert element is unfocusable).
function onFullscreenUnmountAutoFocus(event: Event) {
    event.preventDefault();
    const target = restoreTarget;
    restoreTarget = null;
    nextTick(() => target?.focus?.());
}

onUnmounted(() => {
    unregEsc?.();
    unregEsc = null;
    syncBodyOverflowLock(false);
});
</script>
