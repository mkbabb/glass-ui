<template>
    <!--
        AX.W… (E14 root) — the SINGLE-SURFACE re-parent. The default slot renders
        EXACTLY ONCE, in a host wrapped by a `<Teleport>` whose `:disabled` toggles
        with `open`. When `open` flips true the SAME VNode subtree (the same child
        component instances, the same `<canvas>`) is RE-PARENTED into `body` — Vue's
        Teleport MOVES the real DOM nodes, it does NOT re-render the slot — so an
        imperative canvas (ECharts) keeps its one instance bound to its one host in
        BOTH states, DETERMINISTICALLY. The double-`renderSlot` that blanked the
        teleported canvas (a fresh, never-initialised 300×150) is gone: there is one
        slot, one host, one handler set.

        The outer anchor stays in the document flow so the inline layout box is
        preserved while the surface is teleported away (no reflow jump on
        expand/collapse). The chrome (the corner trigger, the fullscreen scaffold)
        co-teleports with the host inside the same Teleport root.
    -->
    <div
        ref="anchorEl"
        class="expandable-container__anchor relative"
        :class="{ 'gl-expand': vtName !== undefined && !open }"
        :style="open ? undefined : vtStyle"
        v-bind="$attrs"
    >
        <Teleport to="body" :disabled="!open">
            <div
                ref="surfaceEl"
                :class="[
                    'expandable-container__surface',
                    open
                        ? 'fixed inset-0 z-modal flex flex-col bg-background'
                        : 'relative',
                    { 'gl-expand': vtName !== undefined && open },
                ]"
                :style="open ? vtStyle : undefined"
            >
                <button
                    v-if="!open"
                    class="expandable-container__trigger absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-1.5 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                    :class="buttonPosition === 'left' ? 'left-2 top-2' : 'right-2 top-2'"
                    title="Fullscreen"
                    :aria-label="expandLabel"
                    @click="expand"
                >
                    <Maximize2 class="h-4 w-4" />
                </button>
                <button
                    v-else
                    class="expandable-container__trigger absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-2 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                    :class="buttonPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'"
                    title="Exit fullscreen"
                    :aria-label="collapseLabel"
                    @click="collapse"
                >
                    <Minimize2 class="h-4 w-4" />
                </button>
                <!--
                    The ONE default slot. `fullscreen` reflects the live state so a
                    consumer can re-layout its chart; it is the SAME element across
                    the re-parent, so the binding flips on the SAME instance — no
                    second mount, no second ECharts `init`.
                -->
                <div :class="open ? 'h-full w-full' : 'contents'">
                    <slot :fullscreen="open" />
                </div>
            </div>
        </Teleport>
    </div>
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
import { computed, nextTick, onMounted, onUnmounted, useId, useTemplateRef, watch } from "vue";
import { Maximize2, Minimize2 } from "@lucide/vue";
import { registerShortcut } from "../../../composables/keyboard";
import { startViewTransition } from "../../../composables/motion/useViewTransition";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
    defineProps<{
        buttonPosition?: "left" | "right";
        /** Accessible name for the expand (fullscreen) button. */
        expandLabel?: string;
        /** Accessible name for the collapse (exit fullscreen) button. */
        collapseLabel?: string;
        /**
         * Opt into the `gl-expand` plate → fullscreen MORPH (D6.c M7). When set,
         * the inline anchor and the teleported fullscreen surface share ONE
         * `view-transition-name` (this prop, suffixed by an app-unique `useId()`
         * so two ExpandableContainers on a page never collide their groups — the
         * proof:vt-names mandate), and the open/close toggle is wrapped in
         * `startViewTransition` so the plate's rect MORPHS to the fullscreen rect
         * (and back) instead of jump-cutting. A passed string namespaces the pair
         * (e.g. `"chart"`); pass an empty string for a bare `useId()` name.
         * Omitted (default) ⇒ NO view-transition-name, the legacy instant toggle —
         * byte-identical to the pre-M7 behaviour. PRM + unsupported engines take
         * `startViewTransition`'s instant fallback (the open/close still runs).
         */
        viewTransitionName?: string;
    }>(),
    {
        buttonPosition: "right",
        expandLabel: "Fullscreen",
        collapseLabel: "Exit fullscreen",
        viewTransitionName: undefined,
    },
);

/**
 * Two-way `open` model so consumers can drive fullscreen externally
 * (programmatic toggles, route-driven launches, etc.) while the corner
 * buttons continue to operate without parent wiring.
 */
const open = defineModel<boolean>("open", { default: false });

/**
 * Re-parent SETTLE callback (E14 root). Fires AFTER the host's DOM nodes have
 * been moved into (or out of) the fullscreen surface and Vue's patch has
 * flushed — one `nextTick`. An imperative-canvas consumer (ECharts, a WebGL
 * field) subscribes this to call `chart.resize()` so its ONE instance re-lays-
 * out to the new host box DETERMINISTICALLY, in both directions. `fullscreen`
 * tells the consumer which surface it just landed in. This is the deterministic
 * replacement for the prior double-render's ResizeObserver-timing accident.
 */
const emit = defineEmits<{
    /** The surface finished re-parenting; `fullscreen` is its new state. */
    settle: [fullscreen: boolean];
}>();

const anchorEl = useTemplateRef<HTMLElement>("anchorEl");
const surfaceEl = useTemplateRef<HTMLElement>("surfaceEl");

// App-unique view-transition-name for the morph pair. Minted from Vue's
// app-scoped `useId()` (NOT a module-level counter — the GlassDock collision
// trap proof:vt-names guards) and namespaced by the consumer's prop. `undefined`
// when the consumer does not opt in (the legacy instant toggle). The `vtName`
// binding is one expression (single-statement) so proof:vt-names' dataflow tracer
// reaches `_vtId` → `useId()` through the chain (a multi-line RHS truncates at the
// gate's binding-capture).
const _vtId = useId();
const vtName = computed<string | undefined>(() => props.viewTransitionName === undefined ? undefined : `gl-expand-${props.viewTransitionName}-${_vtId}`);
// The kebab `"view-transition-name"` key (NOT the camelCase IDL spelling) so the
// mint is VISIBLE to proof:vt-names' script-region scan + dataflow-traced to the
// `useId()` above (the gate guards the gl-expand consumer against a future
// counter-fed name).
const vtStyle = computed(() => vtName.value === undefined ? undefined : { "view-transition-name": vtName.value });

// Open/close, wrapped in `startViewTransition` when the morph is opted in. The
// helper carries the PRM + unsupported fallbacks (the toggle ALWAYS runs; only
// the morph is conditional — information parity), so a bare call is the instant
// legacy toggle on a non-opted container.
function expand() {
    if (vtName.value === undefined) {
        open.value = true;
        return;
    }
    startViewTransition(() => {
        open.value = true;
    });
}
function collapse() {
    if (vtName.value === undefined) {
        open.value = false;
        return;
    }
    startViewTransition(() => {
        open.value = false;
    });
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

// The body-overflow lock syncs IMMEDIATELY — a container mounted already-open
// (`:open="true"`) acquires the lock on mount (the lifecycle-cleanup contract).
watch(open, syncBodyOverflowLock, { immediate: true });

// The re-parent SETTLE — NON-immediate (the initial mount is not a re-parent; the
// first frame's own ResizeObserver/layout owns the first paint). `open` changing
// toggles the Teleport's `:disabled`, which MOVES the surface DOM nodes; one
// `nextTick` later the move has flushed and the host has its new box — fire the
// settle so an imperative consumer resizes its single instance.
watch(open, (fs) => {
    void nextTick(() => emit("settle", fs));
});

let unregEsc: (() => void) | null = null;

onMounted(() => {
    unregEsc = registerShortcut(
        "Escape",
        () => {
            if (open.value) collapse();
        },
        { label: "Exit fullscreen", group: "UI", allowInInput: true },
    );
});

onUnmounted(() => {
    unregEsc?.();
    syncBodyOverflowLock(false);
});

// Exposed for consumers that drive the surface imperatively (and for the
// re-parent determinism proof, which reads the live host element across states).
defineExpose({ anchorEl, surfaceEl, expand, collapse });
</script>
