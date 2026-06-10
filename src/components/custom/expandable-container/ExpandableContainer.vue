<template>
    <!-- Normal mode: render inline -->
    <div
        v-if="!open"
        class="relative"
        :class="{ 'gl-expand': vtName !== undefined }"
        :style="vtStyle"
        v-bind="$attrs"
    >
        <button
            class="expandable-container__trigger absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-1.5 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
            :class="buttonPosition === 'left' ? 'left-2 top-2' : 'right-2 top-2'"
            title="Fullscreen"
            :aria-label="expandLabel"
            @click="expand"
        >
            <Maximize2 class="h-4 w-4" />
        </button>
        <slot :fullscreen="false" />
    </div>

    <!-- Fullscreen mode: teleport to body -->
    <Teleport to="body">
        <div
            v-if="open"
            class="fixed inset-0 z-modal flex flex-col bg-background"
            :class="{ 'gl-expand': vtName !== undefined }"
            :style="vtStyle"
        >
            <button
                class="expandable-container__trigger absolute z-10 rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] p-2 text-muted-foreground hover:text-foreground transition-colors shadow-sm border border-border/40"
                :class="buttonPosition === 'left' ? 'left-3 top-3' : 'right-3 top-3'"
                title="Exit fullscreen"
                :aria-label="collapseLabel"
                @click="collapse"
            >
                <Minimize2 class="h-4 w-4" />
            </button>
            <div class="h-full w-full">
                <slot :fullscreen="true" />
            </div>
        </div>
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
import { computed, onMounted, onUnmounted, useId, watch } from "vue";
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
         * the inline plate and the teleported fullscreen surface share ONE
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

watch(open, syncBodyOverflowLock, { immediate: true });

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
</script>
