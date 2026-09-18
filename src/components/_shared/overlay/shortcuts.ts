// The MODAL KEYBOARD BARRIER — the overlay half of `suspendShortcuts()`.
//
// An app registers accelerators on `window` through the keyboard registry; a modal
// overlay takes the keyboard away from the page while it is open, and every one of
// those accelerators firing behind it is a bug the consumer cannot fix from
// markup. One watch, four holders — the same shape `useDockParticipation` takes for
// the keep-open token, and for the same reason: four hand-rolled copies of a
// suspend/resume pair is four places to forget the resume.

import { onScopeDispose, watch } from "vue";
import { suspendShortcuts } from "../../../composables/keyboard";

/**
 * Hold a shortcut barrier for as long as `active` reads true.
 *
 * ORDERING is the whole contract and it is why this runs `immediate` in SETUP:
 * the barrier admits registrations made AFTER it, so it has to be raised before
 * the overlay's own content mounts and registers anything. A `pre`-flush watch
 * fires ahead of the render that mounts that content, and the immediate arm covers
 * an overlay that is open on its first frame.
 *
 * The release is idempotent, so the scope-dispose arm is safe beside a close.
 */
export function useModalShortcutBarrier(active: () => boolean): void {
    let resume: (() => void) | null = null;

    const release = (): void => {
        resume?.();
        resume = null;
    };

    watch(
        active,
        (isActive) => {
            if (!isActive) release();
            else resume ??= suspendShortcuts();
        },
        { immediate: true },
    );

    onScopeDispose(release);
}
