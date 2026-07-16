// BC.W-AX-COMPLETION-SEAL — the one-shot draw lifecycle.
//
// The seal's MOTION is CSS-driven: the recipe (completion-seal.css) runs the
// `--seal-draw`/`--seal-scale`/`--seal-glint` `@property` animations under the
// `.completion-seal[data-play]` arm, inside a `(prefers-reduced-motion: no-preference)`
// gate. This composable owns the JS-side LIFECYCLE only — it arms the one-shot on
// `play` (writes the `data-play` seam the recipe reads), holds the static fully-drawn
// seal afterward, and SNAPS under reduced motion (it never arms the draw — the seal is
// the correct fully-drawn mark, the motion off, the vestibular floor).
//
// It owns NO rAF loop / no spring integrator (the draw is the CSS `@property`
// interpolation on the SPRING-EASE clock — the no-second-engine fence; the
// registered typed property itself is the animation drive. The seal is COMPOSITOR-ONLY
// (the recipe rides stroke-dashoffset /
// transform / filter) — this leaf writes only the boolean seam + the PRM-snap flag.

import {
    computed,
    onMounted,
    onScopeDispose,
    readonly,
    ref,
    watch,
    type Ref,
} from "vue";
import { useReducedMotion } from "../../../composables/motion/useReducedMotion";

export interface UseCompletionSealOptions {
    /**
     * The draw trigger. When it flips truthy the seal draws ONCE (the consumer fires it
     * on completion). A `Ref` or a getter; default plays on mount (`play` unset → the
     * seal draws when it appears, the canonical completion moment).
     */
    play?: Ref<boolean | undefined> | (() => boolean | undefined);
    /**
     * Honor `prefers-reduced-motion: reduce` — under reduce the seal appears INSTANTLY
     * fully-drawn (no stroke animation, no glint sweep). Default true. (Never forced
     * false — the PRM-safe-by-construction fence.)
     */
    respectReducedMotion?: boolean;
}

export interface UseCompletionSeal {
    /** The reactive `data-play` seam — bind it to `:data-play` on `.completion-seal`. */
    playing: Readonly<Ref<boolean>>;
    /** True once the seal has drawn (or snapped under PRM) — the static held state. */
    drawn: Readonly<Ref<boolean>>;
    /**
     * Whether the motion is suppressed (PRM) — the SFC snaps `--seal-draw: 100%` and
     * omits the `data-play` arm so the recipe's no-preference gate never fires.
     */
    reduced: Readonly<Ref<boolean>>;
    /** Imperatively (re-)fire the one-shot draw (a second completion event). */
    draw: () => void;
}

function readPlay(play: UseCompletionSealOptions["play"]): boolean | undefined {
    if (play == null) return undefined;
    return typeof play === "function" ? play() : play.value;
}

/**
 * The one-shot completion-seal draw. Arms `playing` (the `data-play` seam) for the
 * single draw pass, then settles to the static `drawn` state. Under reduced motion it
 * never arms — `reduced` is true and the seal is the instant fully-drawn mark.
 *
 * Deterministic + SSR-safe (the matchMedia guard) — the recipe owns the paint, this
 * leaf owns the boolean lifecycle.
 */
export function useCompletionSeal(
    options: UseCompletionSealOptions = {},
): UseCompletionSeal {
    const { play, respectReducedMotion = true } = options;

    const playing = ref(false);
    const drawn = ref(false);
    const prefersReducedMotion = useReducedMotion();
    const reduced = computed(() => respectReducedMotion && prefersReducedMotion.value);
    let drawFrame: number | null = null;

    function snap(): void {
        if (drawFrame !== null) {
            cancelAnimationFrame(drawFrame);
            drawFrame = null;
        }
        playing.value = false;
        drawn.value = true;
    }

    function draw(): void {
        if (reduced.value) {
            // PRM: snap to the static fully-drawn seal, never arm the motion.
            snap();
            return;
        }
        // The one-shot: arm `data-play` for one frame's restart, then mark drawn. The
        // recipe runs the `@property` draw on the no-preference gate; `both` fill holds
        // the finished frame, so dropping the arm afterward keeps the static seal.
        playing.value = false;
        if (typeof requestAnimationFrame === "function") {
            if (drawFrame !== null) cancelAnimationFrame(drawFrame);
            drawFrame = requestAnimationFrame(() => {
                drawFrame = null;
                if (reduced.value) {
                    snap();
                    return;
                }
                playing.value = true;
                drawn.value = true;
            });
        } else {
            playing.value = true;
            drawn.value = true;
        }
    }

    watch(reduced, (isReduced) => {
        if (isReduced) snap();
    });

    onScopeDispose(() => {
        if (drawFrame !== null) cancelAnimationFrame(drawFrame);
    });

    // Fire on the `play` trigger (or on mount when `play` is unset — the default draw).
    if (play == null) {
        onMounted(draw);
    } else {
        onMounted(() => {
            if (readPlay(play)) draw();
        });
        watch(
            () => readPlay(play),
            (now, was) => {
                if (now && !was) draw();
            },
        );
    }

    return {
        playing: readonly(playing),
        drawn: readonly(drawn),
        reduced: readonly(reduced),
        draw,
    };
}
