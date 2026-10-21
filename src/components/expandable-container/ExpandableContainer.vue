<template>
    <Teleport to="body" :disabled="!open">
        <FocusScope
            ref="scope"
            as-child
            :loop="open"
            :trapped="open"
            @mount-auto-focus="onScopeMountAutoFocus"
        >
            <div
                class="expandable-container"
                :data-state="open ? 'expanded' : 'collapsed'"
                :data-surface="open ? surface : undefined"
                :role="open ? 'dialog' : undefined"
                :aria-label="open ? expandLabel : undefined"
                :aria-modal="open || undefined"
                v-bind="$attrs"
            >
                <div class="expandable-container__chrome" :hidden="open">
                    <slot
                        name="expand-trigger"
                        :expand="expand"
                        :label="expandLabel"
                    >
                        <button
                            type="button"
                            data-part="trigger"
                            data-control-target
                            data-mode="expand"
                            :data-position="buttonPosition"
                            :aria-label="expandLabel"
                            @click="expand"
                        >
                            <Maximize2 class="expandable-container__icon" aria-hidden="true" />
                        </button>
                    </slot>
                </div>

                <div class="expandable-container__chrome" :hidden="!open">
                    <slot
                        name="fullscreen-chrome"
                        :collapse="collapse"
                        :label="collapseLabel"
                        :fullscreen="true"
                    >
                        <button
                            type="button"
                            data-part="trigger"
                            data-control-target
                            data-mode="collapse"
                            :data-position="buttonPosition"
                            :aria-label="collapseLabel"
                            @click="collapse"
                        >
                            <Minimize2 class="expandable-container__icon" aria-hidden="true" />
                        </button>
                    </slot>
                </div>

                <div data-part="panel">
                    <slot :fullscreen="open" />
                </div>
            </div>
        </FocusScope>
    </Teleport>
</template>

<script lang="ts">
/* THE SCROLL LOCK RIDES THE ROOT, NOT `body` (U/B7 D-2). `overflow: hidden` on `body`,
 * under a root whose own overflow is not `visible` (a consumer's `overflow-x: clip`),
 * makes `body` a scroll container, so every sticky element on the page drops to its
 * in-flow position while the lock holds. On the root element the value propagates to
 * the viewport, which stays the page's one scroller, and the root's
 * `scrollbar-gutter: stable` keeps the layout from shifting when the bar hides. It also
 * no longer shares `body` with reka's own modal lock, so the two cannot restore each
 * other's stale value when they close out of order (U-F04). */
let rootOverflowLockDepth = 0;
let rootOverflowBeforeLock: string | null = null;

function acquireRootOverflowLock() {
    if (typeof document === "undefined") return false;

    const root = document.documentElement;
    if (rootOverflowLockDepth === 0) {
        rootOverflowBeforeLock = root.style.overflow;
        root.style.overflow = "hidden";
    }
    rootOverflowLockDepth += 1;
    return true;
}

function releaseRootOverflowLock() {
    if (typeof document === "undefined" || rootOverflowLockDepth === 0) return;

    rootOverflowLockDepth -= 1;
    if (rootOverflowLockDepth === 0) {
        document.documentElement.style.overflow = rootOverflowBeforeLock ?? "";
        rootOverflowBeforeLock = null;
    }
}
</script>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from "vue";
import { Maximize2, Minimize2 } from "@lucide/vue";
import { FocusScope } from "reka-ui";
import { registerShortcut } from "../../composables/keyboard";
import type { Surface } from "../_shared/axes";
import { FOCUSABLE_SELECTOR } from "../_shared/focus";

defineOptions({ inheritAttrs: false });

/*
 * THE ROOT CARRIES NO GLASS RUNG, and the omission is the design. This element IS
 * the world scrim when open, and `.glass-overlay` carries
 * `backdrop-filter: var(--glass-blur-overlay)` — which would put every expanded
 * subtree, live GPU stages included, inside a filtered compositing group. That is
 * precisely what the configurator's material discipline forbids
 * (`configurator/styles.css` §0: "the stage remains outside every filtered
 * ancestor"), and the scrim takes no rung on the glass ladder in any case. It paints
 * `--overlay-scrim` and nothing else; a consumer's own plate paints INSIDE
 * `[data-part="panel"]`, where it belongs.
 *
 * The template below is comment-free on purpose: `<FocusScope as-child>` merges a
 * SINGLE child vnode, and a template comment is a vnode. One added comment cost this
 * component its focus trap and its unmount — measured, not theorised.
 */

const props = withDefaults(
    defineProps<{
        buttonPosition?: "left" | "right";
        expandLabel?: string;
        collapseLabel?: string;
        surface?: Surface;
    }>(),
    {
        buttonPosition: "right",
        expandLabel: "Fullscreen",
        collapseLabel: "Exit fullscreen",
        surface: "glass",
    },
);

const open = defineModel<boolean>("open", { default: false });
const scope = ref<{ $el: HTMLElement } | null>(null);

function getContainer() {
    const element = scope.value?.$el;
    return element instanceof HTMLElement ? element : null;
}

function expand() {
    open.value = true;
}

function collapse() {
    open.value = false;
}

let holdsRootOverflowLock = false;
let unregEsc: (() => void) | null = null;
let restoreTarget: HTMLElement | null = null;

function syncRootOverflowLock(fullscreen: boolean) {
    if (fullscreen && !holdsRootOverflowLock) {
        holdsRootOverflowLock = acquireRootOverflowLock();
    } else if (!fullscreen && holdsRootOverflowLock) {
        releaseRootOverflowLock();
        holdsRootOverflowLock = false;
    }
}

function focusFullscreen() {
    const target =
        getContainer()?.querySelector<HTMLElement>("[autofocus]") ??
        getContainer()?.querySelector<HTMLElement>('[data-mode="collapse"]') ??
        getContainer()?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (target ?? getContainer())?.focus();
}

async function enterFullscreenFocus() {
    await nextTick();
    await nextTick();
    focusFullscreen();
}

// The collapse-side fallback: the expand affordance first, else the first focusable in
// the visible chrome. The chrome leg is COMPOSED from the shared `FOCUSABLE_SELECTOR`
// (one focusable definition per repo) rather than a hand-kept subset — the old list
// dropped `input`/`select`/`textarea`/`summary`/`[contenteditable]` and carried no
// `:not([disabled])`, so it could hand focus to a disabled button.
const CHROME_RESTORE_SELECTOR = [
    '[data-mode="expand"]',
    ...FOCUSABLE_SELECTOR.split(", ").map(
        (candidate) => `.expandable-container__chrome:not([hidden]) ${candidate}`,
    ),
].join(", ");

function restoreFocus() {
    const target = restoreTarget?.isConnected
        ? restoreTarget
        : getContainer()?.querySelector<HTMLElement>(CHROME_RESTORE_SELECTOR);
    restoreTarget = null;
    target?.focus();
}

function onScopeMountAutoFocus(event: Event) {
    // The scope exists in both placements so the single child subtree is never
    // remounted. Expansion focus is therefore owned by the open transition.
    event.preventDefault();
}

watch(
    open,
    (isOpen, wasOpen) => {
        syncRootOverflowLock(isOpen);

        if (isOpen && !wasOpen) {
            const active =
                typeof document !== "undefined" ? document.activeElement : null;
            restoreTarget = active instanceof HTMLElement ? active : null;
            unregEsc = registerShortcut("Escape", collapse, {
                label: "Exit fullscreen",
                group: "UI",
                allowInInput: true,
            });
            void enterFullscreenFocus();
        } else if (!isOpen && wasOpen) {
            unregEsc?.();
            unregEsc = null;
            nextTick(restoreFocus);
        }
    },
    { immediate: true },
);

onUnmounted(() => {
    unregEsc?.();
    unregEsc = null;
    syncRootOverflowLock(false);
});
</script>

<style src="./styles.css"></style>
