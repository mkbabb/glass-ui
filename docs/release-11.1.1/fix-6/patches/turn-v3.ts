import { watch, type Ref } from "vue";

const isHeightMotion = (a: Animation): a is CSSAnimation =>
    a instanceof CSSAnimation &&
    (a.animationName === "disclosure-open" || a.animationName === "disclosure-close");

/**
 * The input, 0 to 1, at which a `linear()` easing first reaches `share`, read from its
 * stops by arithmetic: each stop is an output at an input (inputs left out are spread
 * evenly between their neighbours), and the curve is straight between stops.
 */
function inputAt(easing: string, share: number): number {
    const body = /^linear\((.*)\)$/.exec(easing.trim())?.[1];
    if (!body) throw new Error(`the disclosure's easing is not linear(): ${easing}`);
    const stops: [number, number | null][] = [];
    for (const entry of body.split(",")) {
        const [out, ...ins] = entry.trim().split(/\s+/);
        if (ins.length === 0) stops.push([parseFloat(out), null]);
        else for (const at of ins) stops.push([parseFloat(out), parseFloat(at) / 100]);
    }
    if (stops[0][1] === null) stops[0][1] = 0;
    if (stops[stops.length - 1][1] === null) stops[stops.length - 1][1] = 1;
    let most = 0;
    for (let i = 0; i < stops.length; i++) {
        const at = stops[i][1];
        if (at === null) continue;
        most = Math.max(most, at);
        stops[i][1] = most;
    }
    for (let i = 1; i < stops.length; i++) {
        if (stops[i][1] !== null) continue;
        let j = i;
        while (stops[j][1] === null) j++;
        const a = stops[i - 1][1]!;
        const b = stops[j][1]!;
        for (let k = i; k < j; k++) stops[k][1] = a + ((b - a) * (k - i + 1)) / (j - i + 1);
    }
    for (let i = 0; i < stops.length - 1; i++) {
        const [y0, x0] = stops[i] as [number, number];
        const [y1, x1] = stops[i + 1] as [number, number];
        if (y0 >= share) return x0;
        if (y1 >= share) return x0 + ((share - y0) / (y1 - y0)) * (x1 - x0);
    }
    return 1;
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
