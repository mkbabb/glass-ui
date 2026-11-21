<script setup lang="ts">
import { injectDialogRootContext } from "reka-ui";
import { useRootScrollLock } from "../_shared/overlay";

/**
 * The scrim element under `ModalOverlay`'s presence. It is reka's `DialogOverlayImpl`
 * less one line: reka's overlay takes `useBodyScrollLock`, which writes
 * `overflow: hidden` (and a padding compensation) onto `body`. Under a consumer root
 * whose overflow is not `visible`, that turns `body` into the page's scroller while a
 * modal is open, so sticky elements drop out of place and the page can jump when it
 * lets go (U/B7b: the atlas homepage finder, 4 of 4 cells per engine). This scrim holds
 * the page still through the one root lock instead (`_shared/overlay`), for exactly as
 * long as reka's lock held it: while the scrim is present.
 */
const props = defineProps<{ present: boolean }>();

const root = injectDialogRootContext();
useRootScrollLock(() => props.present);

/* A touch press on the scrim ends in the click reka's outside dismissal waits for. WebKit
   sends that click neither after the cancelled press nor, with the cancel taken off, after
   an uncancelled one (RU-72, MEASURE-8 S6), so the scrim sends it on the press's pointerup.
   The dismissal listens once, so Chromium's own click after it closes nothing more, and a
   `locked` dialog still refuses the press. */
function onPointerup(event: PointerEvent): void {
    if (event.pointerType === "touch") (event.currentTarget as HTMLElement).click();
}
</script>

<template>
    <div
        :data-state="root.open.value ? 'open' : 'closed'"
        style="pointer-events: auto"
        @pointerdown.left.self.prevent
        @pointerup.self="onPointerup"
    >
        <slot />
    </div>
</template>
