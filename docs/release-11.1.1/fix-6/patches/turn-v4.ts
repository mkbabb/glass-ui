import { nextTick, watch, type Ref } from "vue";

const MOTIONS = ["disclosure-open", "disclosure-close", "disclosure-turn-open", "disclosure-turn-close"];

const isHeightMotion = (a: Animation): a is CSSAnimation =>
    a instanceof CSSAnimation && MOTIONS.includes(a.animationName);

/**
 * A disclosure reversed mid-motion turns from the height it stands at.
 *
 * The region opens and closes on two keyframes (`disclosure-open`, `disclosure-close`),
 * and a keyframe starts at its first stop, so a flip mid-motion would restart from the
 * far end: the region empties or fills in one frame. When the state flips while the
 * region's height is moving, this reads the height and block padding it stands at
 * before the flip and names, inline, the turn keyframe for the new direction
 * (`disclosure-turn-open`, `disclosure-turn-close`), whose first stop is that height and
 * padding. The new motion starts at its own beginning, from where the region stands, on
 * the region's clock and curve. The keyframe is never seeked and never delayed.
 *
 * `open` is the root's open state; `id` names the content element.
 */
export function useDisclosureTurn(open: Ref<boolean>, id: string): void {
    watch(
        open,
        (opening) => {
            if (typeof document === "undefined") return;
            const el = document.getElementById(id);
            if (!el || typeof el.getAnimations !== "function") return;
            const moving = el
                .getAnimations()
                .some((a) => isHeightMotion(a) && a.playState === "running");
            if (!moving) return;
            const size = `${el.getBoundingClientRect().height}px`;
            const style = getComputedStyle(el);
            const pad = `${style.paddingBlockStart} ${style.paddingBlockEnd}`;
            // reka's content measures its size after the flip's render, in its own
            // continuation of the same `nextTick`, with the animation off, and then hands
            // the animation name back to the stylesheet, which also clears a turn named
            // on an earlier flip. This watcher runs first (it belongs to the wrapping
            // component), so the turn is named one step further on.
            void nextTick()
                .then(() => undefined)
                .then(() => {
                    el.style.setProperty("--disclosure-turn-size", size);
                    el.style.setProperty("--disclosure-turn-pad", pad);
                    el.style.animationName = opening ? "disclosure-turn-open" : "disclosure-turn-close";
                });
        },
        { flush: "pre" },
    );
}
