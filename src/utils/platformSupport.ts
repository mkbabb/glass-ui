// platformSupport — the consolidated platform feature-detection surface
// (AS.W3 A1). Three Baseline-Newly-Available capabilities the motion + DOM
// substrate progressively-enhances on now each carry a `supports*` predicate;
// re-exporting them through one module gives consumers a single import for the
// branch-your-own-logic case, while the `*Safe` wrappers + harden logic stay
// co-located with the behaviour they guard.
//
// `supportsPostTask` is the local guard (its `postTaskSafe` wrapper lives on the
// `/motion-core` leaf `usePrioritizedTask`); the timeline + move-before
// predicates are re-exported from their behaviour modules.

export { supportsMoveBefore } from "./moveBefore";
export {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "../composables/motion/supportsCssTimeline";

/**
 * True when `scheduler.postTask` is available — the feature-detected predicate
 * gating the prioritized-task fast path (vs the MessageChannel macrotask
 * fallback in `postTaskSafe`).
 */
export function supportsPostTask(): boolean {
    const scheduler = (globalThis as { scheduler?: { postTask?: unknown } })
        .scheduler;
    return typeof scheduler?.postTask === "function";
}
