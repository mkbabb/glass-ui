// The shared value-display core for the Metric* family (AZ.W-METRIC-UNIFY).
//
// Four primitives — MetricBadge, MetricPill (delegates to Badge), MetricCell,
// MetricRow — paint the SAME "value + unit + placeholder" gestalt over four
// distinct registers (badge pill / stacked pill / wash tile / subgrid row).
// They used to share NO core: two named the field `amount` and two `value`,
// the `placeholder: "—"` default was redeclared per-SFC, and the empty-check
// DIVERGED — the `amount` copies coalesced on truthiness (`amount || placeholder`
// + `!amount` muted/color gates), which renders a VALID `0` metric as the
// em-dash placeholder, muted, color-stripped (a silent data-falsification bug).
//
// This leaf is the single source for (a) the canonical `placeholder = "—"`
// default and (b) the ONE correct empty-check: only `null` / `undefined` / `""`
// coalesce to the placeholder — a numeric `0` (or the string `"0"`) is a real
// reading and renders as `"0"`. It is the `prng.ts` cross-dir shared-leaf
// precedent (one leaf, ≥ 2 consuming dirs).

/** The canonical em-dash placeholder for an empty Metric* value. */
export const METRIC_PLACEHOLDER = "—";

/** The value type every Metric* primary field accepts. */
export type MetricValue = string | number | null | undefined;

/**
 * The shared value-props shape the four Metric* surfaces extend (each adds its
 * own register-specific props on top — icon, label, size, density, …).
 */
export interface MetricValueProps {
    /** The primary metric. A valid `0` renders `"0"`, never the placeholder. */
    value?: MetricValue;
    /** Unit suffix appended after the value (e.g. "Mbps", "ms"). */
    unit?: string;
    /** Substitute glyph when the value is empty (null / undefined / ""). */
    placeholder?: string;
}

/**
 * The canonical empty-value substitution for the Metric* family.
 *
 * Returns BOTH the display string AND the `isEmpty` flag so a surface's
 * muted/color gates read `isEmpty` (the correct empty signal) rather than the
 * truthy `!value` (the bug — `!0` is `true`). `coalesceMetric(0)` →
 * `{ display: "0", isEmpty: false }`, so a `0` is NOT muted and DOES get its
 * color; only `null` / `undefined` / `""` are empty.
 */
export function coalesceMetric(
    value: MetricValue,
    placeholder: string = METRIC_PLACEHOLDER,
): { display: string; isEmpty: boolean } {
    if (value === null || value === undefined || value === "") {
        return { display: placeholder, isEmpty: true };
    }
    return { display: String(value), isEmpty: false };
}
