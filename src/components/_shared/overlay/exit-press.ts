import { computed, onBeforeUnmount, onMounted, type ComputedRef } from "vue";

/**
 * The page takes presses while a surface leaves.
 *
 * A closed surface stays mounted through its exit, and with it reka's dismissable layer,
 * which (for a modal surface or a listbox) sets `pointer-events: none` on `body` and
 * dismisses on any press outside it. During the exit that swallowed the press that
 * should reopen the surface from its trigger, or reach the page behind a leaving sheet,
 * and a touch reopen was dismissed again by its own click.
 *
 * `blockOutside` is what the layer's `disableOutsidePointerEvents` should be: the
 * surface's own setting while it is open, false once it has closed. `letThrough` goes
 * first in the layer's `pointerDownOutside`: a press that began while the surface was
 * already closed is not a dismissal (a dismissal is a press on an open surface; this one
 * may be reopening it), so it prevents the dismissal and returns true.
 */
export function useExitPress(
    open: () => boolean,
    blocks: () => boolean,
): { blockOutside: ComputedRef<boolean>; letThrough: (event: Event) => boolean } {
    let beganClosed = false;
    const onDown = () => {
        beganClosed = !open();
    };
    onMounted(() => document.addEventListener("pointerdown", onDown, true));
    onBeforeUnmount(() => document.removeEventListener("pointerdown", onDown, true));
    return {
        blockOutside: computed(() => open() && blocks()),
        letThrough: (event: Event) => {
            if (beganClosed) event.preventDefault();
            return beganClosed;
        },
    };
}
