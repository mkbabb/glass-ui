export { cn } from "./cn";
// AZ.W-METRIC-UNIFY — the shared value-display core the four Metric* surfaces
// consume (the canonical empty-check + placeholder default; kills the latent
// truthy-coalesce zero-value bug).
export {
    coalesceMetric,
    METRIC_PLACEHOLDER,
    type MetricValue,
    type MetricValueProps,
} from "./coalesceMetric";
// The CSS scroll/view-timeline feature predicates — kept in the root barrel,
// sourced directly from their behaviour module.
export {
    supportsScrollTimeline,
    supportsViewTimeline,
} from "../composables/motion/supportsCssTimeline";
