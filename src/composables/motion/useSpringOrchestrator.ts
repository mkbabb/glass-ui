// Deprecation shim — `useSpringOrchestrator` was renamed to
// `useNumericTransition` at AL.W9-δ to reclaim the "spring" name for the
// physics-based `useSpring` composable (W9-β). The orchestrator never
// implemented spring physics; the historical name conflated easing-based
// numeric interpolation with mass-stiffness-damping spring physics, and
// the latter now needs the name.
//
// This shim re-exports `useNumericTransition` under the old name so any
// downstream consumer that hasn't migrated continues to resolve. It will
// be removed at the next major version bump (v3.0). New callers should
// import `useNumericTransition` directly.
import {
    useNumericTransition,
    type SpringSnapshot,
    type UseNumericTransitionOptions,
} from "./useNumericTransition";

/**
 * @deprecated Renamed to `useNumericTransition` at AL.W9-δ to reclaim the
 * "spring" name for the physics-based `useSpring` composable. This shim
 * resolves to the same implementation and will be removed at the next
 * major version (v3.0). Migrate to `useNumericTransition`.
 */
export const useSpringOrchestrator = useNumericTransition;

/**
 * @deprecated Renamed to `UseNumericTransitionOptions` at AL.W9-δ. This
 * shim will be removed at the next major version (v3.0). Migrate to
 * `UseNumericTransitionOptions`.
 */
export type UseSpringOrchestratorOptions<K extends string> =
    UseNumericTransitionOptions<K>;

// `SpringSnapshot` keeps its name — it's the value-shape contract for the
// orchestrator and is independent of the composable's identity. Re-exported
// here so consumers reaching the old module path still resolve the type.
export type { SpringSnapshot };
