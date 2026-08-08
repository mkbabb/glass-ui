import type { MetricPolarity, MetricValue } from "./types";

interface CoalescedMetric {
    display: string;
    empty: boolean;
    loading: boolean;
}

export interface CoalesceMetricOptions {
    placeholder?: string;
    loading?: boolean;
    /** `12400` → `12.4K`. `Intl.NumberFormat` compact notation, never a hand ladder. */
    compact?: boolean;
    locale?: string;
}

/**
 * The family's ONE data-shaping seam. Every readout in the family — the atom's
 * value, its unit-bearing reading, its delta — passes through this and nothing
 * else, which is why "what counts as empty" has exactly one answer.
 *
 * Finite numbers (including `0` and `-0`) and nonblank strings are readings.
 * Blank strings, non-finite numbers, `null` and `undefined` take the placeholder.
 * `loading` outranks both and masks the value with a stable ellipsis.
 *
 * COMPACT FORMATTING LIVES HERE, not in a standalone atom (A-21). A dashboard
 * that renders 12400 as "12400" wastes the column it was given, and every consumer
 * that fixes that at the call site invents a different rounding. `Intl` already
 * knows every locale's compact form; this hands it the number and returns the
 * string. It applies to NUMBERS only — a string reading is already the author's
 * chosen shape and is passed through untouched.
 */
export function coalesceMetric(
    value: MetricValue,
    placeholderOrOptions: string | CoalesceMetricOptions = "—",
    loading = false,
): CoalescedMetric {
    const options: CoalesceMetricOptions =
        typeof placeholderOrOptions === "string"
            ? { placeholder: placeholderOrOptions, loading }
            : placeholderOrOptions;
    const placeholder = options.placeholder ?? "—";
    const isLoading = options.loading ?? loading;

    if (isLoading) return { display: "…", empty: false, loading: true };

    const empty =
        value == null ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && !Number.isFinite(value));

    if (empty) return { display: placeholder, empty: true, loading: false };

    const display =
        options.compact && typeof value === "number"
            ? new Intl.NumberFormat(options.locale, {
                  notation: "compact",
                  maximumFractionDigits: 1,
              }).format(value)
            : String(value);

    return { display, empty: false, loading: false };
}

/**
 * The polarity a numeric delta carries on its own. A string delta has none — the
 * author states it — and a zero delta is `flat`, not `up`.
 */
export function metricPolarity(delta: MetricValue): MetricPolarity | undefined {
    if (typeof delta !== "number" || !Number.isFinite(delta)) return undefined;
    if (delta > 0) return "up";
    if (delta < 0) return "down";
    return "flat";
}
