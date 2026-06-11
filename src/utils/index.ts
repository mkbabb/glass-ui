export { cn } from "./cn";
export { moveBeforeSafe } from "./moveBefore";
// AZ.W-METRIC-UNIFY — the shared value-display core the four Metric* surfaces
// consume (the canonical empty-check + placeholder default; kills the latent
// truthy-coalesce zero-value bug).
export {
    coalesceMetric,
    METRIC_PLACEHOLDER,
    type MetricValue,
    type MetricValueProps,
} from "./coalesceMetric";
// AS.W3 A1 — the consolidated platform feature-detection surface
// (supportsMoveBefore + timeline predicates + supportsPostTask).
export {
    supportsMoveBefore,
    supportsScrollTimeline,
    supportsViewTimeline,
    supportsPostTask,
} from "./platformSupport";
