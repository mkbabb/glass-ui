<template>
    <Teleport to="body" :disabled="!placed">
        <FocusScope
            ref="scope"
            as-child
            :loop="open"
            :trapped="open"
            @mount-auto-focus="onScopeMountAutoFocus"
        >
            <div
                class="expandable-container"
                :data-state="placed ? 'expanded' : 'collapsed'"
                :data-leaving="placed && !open ? '' : undefined"
                :data-surface="open ? surface : undefined"
                :role="open ? 'dialog' : undefined"
                :aria-label="open ? expandLabel : undefined"
                :aria-modal="open || undefined"
                v-bind="$attrs"
            >
                <div class="expandable-container__chrome" :hidden="placed">
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

                <div class="expandable-container__chrome" :hidden="!placed">
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
                    <slot :fullscreen="placed" />
                </div>
            </div>
        </FocusScope>
    </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from "vue";
import { Maximize2, Minimize2 } from "@lucide/vue";
import { FocusScope } from "reka-ui";
import { registerShortcut } from "../../composables/keyboard";
import type { Surface } from "../_shared/axes";
import { FOCUSABLE_SELECTOR } from "../_shared/focus";
import { acquireRootScrollLock, releaseRootScrollLock } from "../_shared/overlay";

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
        holdsRootOverflowLock = acquireRootScrollLock();
    } else if (!fullscreen && holdsRootOverflowLock) {
        releaseRootScrollLock();
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

/*
 * THE WAY IN AND THE WAY OUT. `open` is the reader's intent; `placed` is where the
 * subtree is. Opening places it in the fullscreen overlay at once and the overlay
 * enters on its transitions (`styles.css`). Closing leaves it placed, marked
 * `data-leaving`, while the overlay leaves on the same channels in reverse; it goes
 * back to its in-flow place when the overlay's own transitions have finished. A reopen
 * during the exit (or a close during the entrance) turns the transitions around from
 * where they stand, and the subtree never moves. Escape is registered the moment
 * `open` turns true, so it is live from the entrance's first frame.
 */
const placed = ref(open.value);
let leave = 0;

function overlayTransitions(): Animation[] {
    const root = getContainer();
    if (!root || typeof root.getAnimations !== "function") return [];
    const panel = root.querySelector(':scope > [data-part="panel"]');
    return root
        .getAnimations({ subtree: true })
        .filter(
            (a) =>
                a instanceof CSSTransition &&
                (a.effect as KeyframeEffect | null)?.target !== undefined &&
                [root, panel].includes((a.effect as KeyframeEffect).target as Element),
        );
}

function settle(run: number) {
    if (run !== leave || open.value) return;
    placed.value = false;
    syncRootOverflowLock(false);
    nextTick(restoreFocus);
}

watch(
    open,
    (isOpen, wasOpen) => {
        if (isOpen) {
            leave++;
            placed.value = true;
            syncRootOverflowLock(true);
        }

        if (isOpen && !wasOpen) {
            const active =
                typeof document !== "undefined" ? document.activeElement : null;
            if (!getContainer()?.contains(active))
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
        }
    },
    { immediate: true },
);

/* After the render that marks the exit, the overlay's transitions exist; the subtree
   goes home when they have all finished, or at once when none runs (no channel
   changes, or in a DOM without animations). */
watch(
    open,
    (isOpen, wasOpen) => {
        if (isOpen || !wasOpen) return;
        const run = ++leave;
        const running = overlayTransitions();
        if (running.length === 0) return settle(run);
        void Promise.allSettled(running.map((a) => a.finished)).then(() => settle(run));
    },
    { flush: "post" },
);

onUnmounted(() => {
    unregEsc?.();
    unregEsc = null;
    syncRootOverflowLock(false);
});
</script>

<style src="./styles.css"></style>
