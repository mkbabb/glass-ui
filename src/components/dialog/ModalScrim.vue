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
</script>

<template>
    <div
        :data-state="root.open.value ? 'open' : 'closed'"
        style="pointer-events: auto"
        @pointerdown.left.self.prevent
    >
        <slot />
    </div>
</template>
