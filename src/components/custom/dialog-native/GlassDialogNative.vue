<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from "vue";
import { cn } from "../../../utils";

/**
 * <GlassDialogNative> — the native-`<dialog>` glass pilot (AQ.W6 §Design 5).
 *
 * A real `<dialog class="glass-top-layer">` top-layer surface. Entry/exit is
 * PURE CSS from the `.glass-top-layer` grammar (`@starting-style` + `overlay` +
 * `allow-discrete` + a glass `::backdrop`; animations.css §TOP-LAYER) — no
 * per-frame JS, no `useSpringMount`. Light-dismiss is the native `closedby="any"`
 * with a ≤ 12-LOC backdrop-click shim as the feature-detected fallback for
 * engines without `HTMLDialogElement.closedBy`.
 *
 * DISPOSITION (W8 overfitting audit): this is the simple-confirm/settings PILOT
 * only — one heading, optional short form, a close action. reka-ui `Dialog` is
 * UNCHANGED and stays the default for every compound focus-trap case (nested
 * focus zones, async content, the drag-dismiss `spring` opt-in). The pilot ships
 * gated to a demo story (its consumer) pending the muster J.W6 ≥2-consumer
 * adoption; it is NOT on the public barrel or a flat subpath yet (no overfit
 * surface). `commandfor`/`command` (Baseline LIMITED) is the PREFERRED trigger
 * wiring where supported; the JS `showModal()`/`close()` path (exposed below)
 * is the kept default for non-supporting targets.
 *
 * Baseline: `<dialog>` + `showModal` = Widely; `dialog-closedby` = Newly
 * (≤ 20-LOC shim fallback); `invoker-commands` (`commandfor`) = LIMITED
 * (progressive — the JS open path stays default).
 */
const props = withDefaults(
    defineProps<{
        /** Light-dismiss on backdrop/Esc — `closedby="any"`. Default true. */
        lightDismiss?: boolean;
        /** id so a sibling `<button commandfor=… command="show-modal">` can
         *  target this dialog (the declarative-open path). */
        id?: string;
        /** `aria-labelledby` target — the id of the consumer's heading. */
        labelledby?: string;
        /** Class merged onto the `<dialog>` surface. */
        class?: string;
    }>(),
    {
        lightDismiss: true,
    },
);

const dlg = useTemplateRef<HTMLDialogElement>("dlg");

const SUPPORTS_CLOSEDBY =
    typeof HTMLDialogElement !== "undefined" &&
    "closedBy" in HTMLDialogElement.prototype;

function showModal() {
    dlg.value?.showModal();
}
function close(returnValue?: string) {
    dlg.value?.close(returnValue);
}
defineExpose({ showModal, close });

/* Light-dismiss fallback — when `closedBy` is unsupported, a click on the
   dialog's own box outside its content (i.e. on the backdrop region of the
   `<dialog>` element itself) closes it. The ≤ 12-LOC Newly-Available shim. */
function onBackdropClick(e: MouseEvent) {
    if (!props.lightDismiss || SUPPORTS_CLOSEDBY) return;
    if (e.target === dlg.value) dlg.value?.close();
}

onMounted(() => {
    if (!SUPPORTS_CLOSEDBY && props.lightDismiss) {
        dlg.value?.addEventListener("click", onBackdropClick);
    }
});
onUnmounted(() => {
    dlg.value?.removeEventListener("click", onBackdropClick);
});
</script>

<template>
    <dialog
        ref="dlg"
        :id="id"
        :class="cn('glass-top-layer glass-floating rounded-dialog', props.class)"
        :closedby="lightDismiss ? 'any' : 'closerequest'"
        :aria-labelledby="labelledby"
    >
        <!-- Consumer owns the heading (the `aria-labelledby` target) + close. -->
        <slot :close="close" />
    </dialog>
</template>

<style scoped>
dialog.glass-top-layer {
    border: none;
    padding: var(--dialog-native-padding, 1.5rem);
    max-width: var(--dialog-native-max-width, 28rem);
    color: var(--foreground);
}
</style>
