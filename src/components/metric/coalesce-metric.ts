import type { MetricValue } from "./types";

interface CoalescedMetric {
    display: string;
    empty: boolean;
    loading: boolean;
}

export function coalesceMetric(
    value: MetricValue,
    placeholder = "—",
    loading = false,
): CoalescedMetric {
    if (loading) return { display: "…", empty: false, loading: true };

    const empty =
        value == null ||
        (typeof value === "string" && value.trim() === "") ||
        (typeof value === "number" && !Number.isFinite(value));

    return {
        display: empty ? placeholder : String(value),
        empty,
        loading: false,
    };
}
