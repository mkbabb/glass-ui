<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PointerDownOutsideEvent } from "../_shared/interaction";
import type { FloatingPlacementProps } from "../_shared/overlay";

export interface SelectContentProps extends FloatingPlacementProps {
    class?: HTMLAttributes["class"];
}

export interface SelectContentEmits {
    closeAutoFocus: [event: Event];
    escapeKeyDown: [event: KeyboardEvent];
    pointerDownOutside: [event: PointerDownOutsideEvent];
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, useAttrs, watch } from "vue";
import {
    injectSelectRootContext,
    SelectContent as RekaSelectContent,
    SelectPortal as RekaSelectPortal,
    SelectViewport as RekaSelectViewport,
} from "reka-ui";
import SelectScrollButton from "./SelectScrollButton.vue";
import { cn } from "../_shared/class-names";
import { useDockParticipation } from "../_shared/overlay";

defineOptions({
    name: "SelectContent",
    inheritAttrs: false,
});

const props = withDefaults(defineProps<SelectContentProps>(), {
    side: "bottom",
    /* The 4px gap to the trigger is a placement offset, as it is on the menu and the
       popover, so the collision measure counts it. It used to be a translate that
       moved the plate after reka measured, eating 4px of the 16px padding. */
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
});
const emit = defineEmits<SelectContentEmits>();
const attrs = useAttrs();

/* The placement contract is the component's, so it is spread LAST — that is what
 * makes it a contract, and it is why there is no local three-key attribute
 * denylist here any more. A denylist that exists only to stop a consumer from
 * winning an argument the spread order already settles is a second authority on
 * the same question. (The library-wide retired-attribute list is W-OVERLAY's one
 * home; this component owes it nothing.) */
const selectRoot = injectSelectRootContext(null);

/* THE SHEET FORM (U/B7 D-6). Below 30rem a listbox anchored to a trigger has no
 * width to grow into and covers what the reader was choosing for, so it opens as a
 * bottom sheet: anchored to a virtual edge at the foot of the viewport, opening
 * upward, at full width. The reference reads the viewport on every call, so a
 * resize or a URL-bar retraction re-anchors it through floating-ui's own update.
 * The query is held only while the listbox is open, so a closed Select keeps no
 * listener; it is read synchronously on open, before the content renders. */
const SHEET_QUERY = "(width < 30rem)";
const sheet = shallowRef(false);
let sheetQuery: MediaQueryList | null = null;
const syncSheet = () => {
    sheet.value = sheetQuery?.matches ?? false;
};
const releaseSheetQuery = () => {
    sheetQuery?.removeEventListener("change", syncSheet);
    sheetQuery = null;
};
watch(
    () => selectRoot?.open.value ?? false,
    (open) => {
        releaseSheetQuery();
        if (open && typeof window !== "undefined" && typeof window.matchMedia === "function") {
            sheetQuery = window.matchMedia(SHEET_QUERY);
            sheetQuery.addEventListener("change", syncSheet);
        }
        syncSheet();
    },
    { immediate: true, flush: "sync" },
);
onBeforeUnmount(releaseSheetQuery);
const viewportFoot = {
    getBoundingClientRect: () =>
        new DOMRect(0, window.innerHeight, document.documentElement.clientWidth, 0),
};

/* Body scroll stays free (U/B7 D-2). reka's lock writes `overflow: hidden` onto
 * `body`; under a root whose overflow is not `visible` that turns `body` into the
 * scroll container and drops every sticky ancestor, and the listbox with it, to
 * its in-flow position. The viewport inside the plate holds its own scroll and
 * contains overscroll, so the page behind it does not move. */
const rootAttrs = computed(() => ({
    ...attrs,
    position: "popper" as const,
    bodyLock: false,
    collisionPadding: 16,
    ...(sheet.value
        ? {
              reference: viewportFoot,
              side: "top" as const,
              sideOffset: 0,
              align: "start" as const,
              alignOffset: 0,
              avoidCollisions: false,
          }
        : {
              side: props.side,
              sideOffset: props.sideOffset,
              align: props.align,
              alignOffset: props.alignOffset,
              avoidCollisions: true,
          }),
}));
/* The stamp comes from the ONE module now, not from a hand-copied attribute
   pair. The listbox PLATE stays #81's (`[data-slot="select-content"]`,
   glass/overlay-plate.css) — only the portal seam moves here.
   A listbox a dock seat opened is a dropdown, and it closes when that dock collapses,
   through the select root's own open channel (O-102 (3)), as the menu does. The
   inject is not the guard against a rootless part: reka's own content injects the
   same context strictly and throws, so a rootless SelectContent still fails loud;
   only a part rendered with reka stubbed out (the contract tests) reaches null. */
const dock = useDockParticipation({
    close: () => {
        if (selectRoot?.open.value) selectRoot.onOpenChange(false);
    },
});
</script>

<template>
    <RekaSelectPortal>
        <!--
      THE PLATE IS PRECOMPILED, and it has to be. Every rule that decides how this
      listbox looks and how tall it may grow — the collision bound, the overlay
      veil, the 1px perimeter ink, the warm portal field, the scale origin — lives
      in `styles/glass/overlay-plate.css` as plain attribute-selector CSS keyed on
      `[data-slot="select-content"]`. A Tailwind utility here would compile only
      into a `dist/*.js` render chunk that no consumer content-scan reaches; a
      precompiled rule ships in `dist/glass-ui.css` whatever the consumer's JIT
      does. SelectContent clips at the bound and SelectViewport is the only
      vertical scroll owner, which is what keeps reka's active-option scrolling
      correct (one scroll port, never nested).
    -->
        <RekaSelectContent
            v-bind="{ ...rootAttrs, ...dock.portalAttrs.value }"
            data-reveal="menu"
            data-slot="select-content"
            :data-form="sheet ? 'sheet' : undefined"
            :class="
                cn(
                    'relative z-popover min-w-(--overlay-min-width) overflow-hidden text-popover-foreground glass-reveal',
                    sheet ? 'rounded-t-card' : 'rounded-card',
                    'glass-floating glass-field-portal',
                    props.class,
                )
            "
            @close-auto-focus="emit('closeAutoFocus', $event)"
            @escape-key-down="emit('escapeKeyDown', $event)"
            @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
            <SelectScrollButton direction="up" />
            <!-- The viewport is the scroll port AND the fade port: one element, so the
                 edge feather reads the SAME scroll state reka scrolls. Its inset and
                 the option corner derived from it are precompiled together in
                 glass/overlay-plate.css — the law lives beside the plate it measures
                 against, not in a utility here. -->
            <RekaSelectViewport
                data-slot="select-viewport"
                data-fade-start
                data-fade-end
                :class="
                    cn(
                        'fading-scroll fading-scroll--y w-full min-w-(--reka-select-trigger-width)',
                    )
                "
            >
                <slot />
            </RekaSelectViewport>
            <SelectScrollButton direction="down" />
        </RekaSelectContent>
    </RekaSelectPortal>
</template>
