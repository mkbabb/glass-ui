import { nextTick, watch, type Ref } from "vue";

const isDisclosureMotion = (a: Animation): a is CSSAnimation =>
    a instanceof CSSAnimation && a.animationName.startsWith("disclosure-");

/**
 * A disclosure reversed mid-motion turns from the height it stands at.
 *
 * The region opens and closes on two keyframes (`disclosure-open`, `disclosure-close`),
 * and a keyframe starts at its first stop, so a flip mid-motion would restart from the
 * far end: the region empties or fills in one frame. When the state flips while one of
 * them runs, this reads the height the region stands at before the flip and, in the same
 * task, seeks the new keyframe to the moment it passes that height, so no frame paints
 * the far end. The new motion then carries on from there on its own clock.
 *
 * `open` is the root's open state; `id` names the content element.
 */
export function useDisclosureTurn(open: Ref<boolean>, id: string): void {
    watch(
        open,
        () => {
            if (typeof document === "undefined") return;
            const el = document.getElementById(id);
            if (!el || typeof el.getAnimations !== "function") return;
            const running = el
                .getAnimations()
                .find((a) => isDisclosureMotion(a) && a.playState === "running");
            if (!running) return;
            const from = el.getBoundingClientRect().height;
            // reka's content measures its size after the flip's render, in its own
            // continuation of the same `nextTick`, with the animation off, and restores
            // it: that restored keyframe is the one to seek. This watcher runs first (it
            // belongs to the wrapping component), so the seek waits one further step.
            void nextTick()
                .then(() => undefined)
                .then(() => {
                    const next = el
                        .getAnimations()
                        .find((a) => isDisclosureMotion(a) && a !== running);
                    const end = Number(next?.effect?.getComputedTiming().endTime ?? 0);
                    if (!next || !(end > 0)) return;
                    const closing = next.animationName === "disclosure-close";
                    let lo = 0;
                    let hi = end;
                    for (let i = 0; i < 14; i++) {
                        const mid = (lo + hi) / 2;
                        next.currentTime = mid;
                        const h = el.getBoundingClientRect().height;
                        if (closing ? h > from : h < from) lo = mid;
                        else hi = mid;
                    }
                    next.currentTime = (lo + hi) / 2;
                });
        },
        { flush: "pre" },
    );
}
