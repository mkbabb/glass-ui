<script setup lang="ts">
import { computed } from "vue";
import { ToastPortal, ToastProvider, ToastViewport } from "reka-ui";
import Toast from "./Toast.vue";
import ToastClose from "./ToastClose.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastDescription from "./ToastDescription.vue";
import { useToastQueue, removeToast } from "./use-toast";
import { cn } from "../_shared/class-names";

export type ToasterPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

const props = withDefaults(defineProps<{ position?: ToasterPosition }>(), {
    position: "bottom-right",
});

const toasts = useToastQueue();

type QueuedToast = (typeof toasts)["value"][number];

// Imperative content is owned by this renderer, not forwarded as accidental
// attributes to ToastRoot. The internal open listener remains in the root
// binding so close, timeout, Escape, and swipe requests keep their one path.
function toastRootProps(toast: QueuedToast) {
    const {
        id: _id,
        title: _title,
        description: _description,
        action: _action,
        ...rootProps
    } = toast;
    return rootProps;
}

// Exit-complete slot release. A dismissed toast leaves on `.glass-vaporize`
// (`glass/dissolve.css`): three keyframes — the two backdrop channels and the panel's
// own paint — sharing ONE end-time, which reka's `usePresence` awaits and which the
// reduced-motion carve keeps by name. Their `animationend` bubbles to the ToastRoot
// (this native listener falls through to it). When one fires for a root exit keyframe
// on the root itself — never a descendant's ink animation, hence the `target ===
// currentTarget` guard — the surface has finished releasing, so we drop the entry from
// the queue and free its `TOAST_LIMIT` slot. This is the whole removal path: no
// deferred timer.
//
// THE SET MUST BE THE RECIPE'S OWN NAMES. A guard naming a keyframe the root does not
// run admits nothing, `removeToast` is never reached, and dismissed toasts squat their
// slots until they evict live ones — with the queue suite green over a fabricated
// event. `tests/components/toast.queue.test.ts` reads both this set and the shipped
// `animation-name` list out of the stylesheet and reds when they drift apart. All three
// end on the same frame, so the first one through does the removal and the other two
// find nothing to remove.
const VAPORIZE_ROOT_KEYFRAMES = new Set([
    "glass-vaporize-saturate",
    "glass-vaporize-panel",
    "glass-vaporize-blur",
]);
function onToastExitComplete(id: string, event: AnimationEvent) {
    if (event.target !== event.currentTarget) return;
    if (!VAPORIZE_ROOT_KEYFRAMES.has(event.animationName)) return;
    removeToast(id);
}

// Invariant viewport chrome — identical across every anchor. The anchor
// fragment (flex-direction + edge) is interleaved between the two halves
// so the `bottom-right` default composes to the base viewport class.
const VIEWPORT_BASE = "fixed top-0 z-toast flex max-h-screen w-full";
const VIEWPORT_PAD = "p-4";
const VIEWPORT_WIDTH = "md:max-w-[420px]";

// Per-position anchor: `[direction, edge]`. `direction` is the flex stack
// order (placed BEFORE the padding); `edge` is the responsive anchor
// (placed AFTER the padding). Bottom anchors stack newest-at-bottom via
// the mobile-top reverse + the `sm:` bottom override; top anchors stack
// newest-on-top with a plain `flex-col` and drop the reverse.
const VIEWPORT_ANCHOR: Record<ToasterPosition, readonly [string, string]> = {
    "bottom-right": [
        "flex-col-reverse",
        "sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col",
    ],
    "bottom-left": [
        "flex-col-reverse",
        "sm:bottom-0 sm:left-0 sm:top-auto sm:flex-col",
    ],
    "bottom-center": [
        "flex-col-reverse",
        "sm:bottom-0 sm:left-1/2 sm:top-auto sm:-translate-x-1/2 sm:flex-col",
    ],
    "top-right": ["right-0 flex-col", ""],
    "top-left": ["left-0 flex-col", ""],
    "top-center": ["left-1/2 -translate-x-1/2 flex-col", ""],
};

const viewportClass = computed(() => {
    const [direction, edge] = VIEWPORT_ANCHOR[props.position];
    return cn(VIEWPORT_BASE, direction, VIEWPORT_PAD, edge, VIEWPORT_WIDTH);
});
</script>

<template>
    <ToastProvider>
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toastRootProps(toast)"
            @animationend="onToastExitComplete(toast.id, $event)"
        >
            <div class="grid gap-1">
                <ToastTitle v-if="toast.title">
                    {{ toast.title }}
                </ToastTitle>
                <ToastDescription v-if="toast.description">
                    {{ toast.description }}
                </ToastDescription>
            </div>
            <component :is="toast.action" v-if="toast.action" />
            <ToastClose />
        </Toast>
        <!--
      The glass-first × position:fixed trap guard.
      A `fixed` ToastViewport mounted inside a glass surface re-anchors to that
      surface's box: any ancestor with `backdrop-filter` (or `filter`/`transform`/
      `will-change`) establishes a CONTAINING BLOCK for fixed descendants, so the
      viewport's `bottom-0`/`right-0` resolve against the glass card, not the
      viewport — the toasts paint glued to the card. With making
      backdrop-filter ubiquitous this bites ANY fixed overlay inside glass.
      ToastPortal teleports the viewport to <body>, escaping every glass
      containing block so `fixed` anchors to the viewport as intended.
    -->
        <!--
      The toast announce contract. reka's
      ToastViewport carries `role="region"` but NOT `aria-live`, so a screen
      reader gets the landmark but no announce-on-toast. Marking the viewport
      region `aria-live="polite"` (+ `aria-atomic="false"` so each toast
      announces as it arrives, not the whole region) delivers the polite
      announce contract the a11y pair names. The `$attrs` fall through to reka's
      Primitive, landing on the rendered region element.
    -->
        <ToastPortal>
            <ToastViewport
                :class="viewportClass"
                aria-live="polite"
                aria-atomic="false"
            />
        </ToastPortal>
    </ToastProvider>
</template>
