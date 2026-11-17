import { watch, type Ref } from "vue";

const isHeightMotion = (a: Animation): a is CSSAnimation =>
    a instanceof CSSAnimation &&
    (a.animationName === "disclosure-open" || a.animationName === "disclosure-close");

/**
 * The input, 0 to 1, at which `easing` first reaches `share`. The easing is read on a
 * clock that belongs to no timeline and no element, so the reading touches nothing on
 * the page: the first of 64 samples at or past `share`, then halved down to it.
 */
function inputAt(easing: string, share: number): number {
    const effect = new KeyframeEffect(null, null, { duration: 1000, easing, fill: "both" });
    const clock = new Animation(effect, null);
    const eased = (x: number) => {
        clock.currentTime = x * 1000;
        return Number(effect.getComputedTiming().progress ?? x);
    };
    let hi = 1;
    for (let i = 1; i <= 64; i++) {
        if (eased(i / 64) >= share) {
            hi = i / 64;
            break;
        }
    }
    let lo = hi - 1 / 64;
    for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        if (eased(mid) < share) lo = mid;
        else hi = mid;
    }
    return (lo + hi) / 2;
}

/**
 * A disclosure reversed mid-motion turns from the height it stands at.
 *
 * The region opens and closes on two keyframes (`disclosure-open`, `disclosure-close`),
 * and a keyframe starts at its first stop, so a flip mid-motion would restart from the
 * far end: the region empties or fills in one frame. When the state flips while one of
 * them runs, this reads the height the region stands at before the flip and gives the
 * region a negative `animation-delay` (inline) before the flip renders, so the new
 * keyframe starts at the moment it passes that height and carries on from there on its
 * own clock. The moment comes from the region's own easing and duration. The running
 * animation's time is never written: the delay is CSS, set before the new keyframe
 * exists. The next flip clears it.
 *
 * `open` is the root's open state; `id` names the content element.
 */
export function useDisclosureTurn(open: Ref<boolean>, id: string): void {
    let delayed = false;
    watch(
        open,
        (opening) => {
            if (typeof document === "undefined") return;
            const el = document.getElementById(id);
            if (!el || typeof el.getAnimations !== "function") return;
            const running = el
                .getAnimations()
                .find((a) => isHeightMotion(a) && a.playState === "running");
            const from = running ? el.getBoundingClientRect().height : 0;
            if (delayed) {
                el.style.animationDelay = "";
                delayed = false;
            }
            if (!running) return;
            const style = getComputedStyle(el);
            const size = parseFloat(style.getPropertyValue("--disclosure-content-size"));
            const duration = Number(running.effect?.getComputedTiming().duration ?? 0);
            if (!(size > 0) || !(duration > 0)) return;
            // The share of its travel the new keyframe has covered where it passes `from`.
            const share = Math.min(1, Math.max(0, opening ? from / size : 1 - from / size));
            const at = inputAt(style.animationTimingFunction, share) * duration;
            el.style.animationDelay = `${-at}ms`;
            delayed = true;
        },
        { flush: "pre" },
    );
}
