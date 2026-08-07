// BK row #46 (GF-TIMELINE) — the partition, the ordinal hue law, the aggregate.
//
// The lane mints ZERO gates (the gates-abrogation mandate is user law, and the
// register receipt is byte-identical across this cut). Its obligations ship as
// unit cases instead, each written so a named mutation reds it — the bar a proof
// gate would have had to clear anyway, without a seat.
//
// These are pure-function asserts: `geometry.ts` stays a file precisely so the
// partition can be checked without a mount.

import { describe, expect, it, vi } from "vitest";

import {
    HUE_OFFSET,
    HUE_STOPS,
    HUE_STRIDE,
    accentFor,
    aggregate,
    fillFor,
    layout,
} from "@glass/components/timeline/geometry";
import type { TimelineSegment } from "@glass/components/timeline/types";

const seg = (
    key: string,
    extra: Partial<TimelineSegment> = {},
): TimelineSegment => ({ key, label: key[0]!.toUpperCase() + key.slice(1), ...extra });

describe("T-PART-1 — non-monotone `at` CLAMPS, and is never reordered", () => {
    it("holds the author's order and collapses the offender to zero width", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const spans = layout([
            seg("a", { at: 0.5 }),
            seg("b", { at: 0.3 }),
        ]);
        warn.mockRestore();

        // MUTATION THAT REDS THIS: remove the clamp, or substitute a sort.
        // A sort would give [0.3, 0.5] with the keys swapped — the silent
        // failure mode the clamp exists to make visible.
        expect(spans.map((s) => s.at)).toEqual([0.5, 0.5]);
        expect(spans.map((s) => s.width)).toEqual([0.5, 0]);
    });

    it("warns, so the author sees the violation they cannot see in the paint", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        layout([seg("a", { at: 0.5 }), seg("b", { at: 0.3 })]);
        expect(warn).toHaveBeenCalledTimes(1);
        expect(String(warn.mock.calls[0]?.[0])).toContain("non-monotone");
        warn.mockRestore();
    });

    it("stays silent on a lawful set", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        layout([seg("a", { at: 0.3 }), seg("b", { at: 0.5 })]);
        expect(warn).not.toHaveBeenCalled();
        warn.mockRestore();
    });
});

describe("T-PART-2 — the aggregate is normalized over the OWNED axis", () => {
    it("reports 1.0 when every phase of a 0.94-tail dataset completes", () => {
        const set = [
            seg("a", { at: 0.4, state: "completed" }),
            seg("b", { at: 0.7, state: "completed" }),
            seg("c", { at: 0.94, state: "completed" }),
        ];
        // MUTATION THAT REDS THIS: divide by 1 instead of Σwidth — a process
        // scoped to 94% of the axis would then stall at 0.94 forever.
        expect(aggregate(set)).toBeCloseTo(1, 10);
    });

    it("leaves the trailing remainder unowned — no span, no mark", () => {
        const spans = layout([
            seg("a", { at: 0.4 }),
            seg("b", { at: 0.94 }),
        ]);
        expect(spans.at(-1)?.at).toBeCloseTo(0.94, 10);
        expect(spans.reduce((acc, s) => acc + s.width, 0)).toBeCloseTo(0.94, 10);
    });
});

describe("T-PART-3 — omitted `at` takes equal shares", () => {
    it("all-omitted is the plain equal split", () => {
        const spans = layout([seg("a"), seg("b"), seg("c")]);
        // MUTATION THAT REDS THIS: perturb the remainder distribution.
        for (const span of spans) expect(span.width).toBeCloseTo(1 / 3, 12);
        expect(spans.map((s) => s.at)).toEqual([1 / 3, 2 / 3, 1]);
    });

    it("an interior run shares only the axis its pinned neighbours leave", () => {
        const spans = layout([
            seg("a", { at: 0.2 }),
            seg("b"),
            seg("c"),
            seg("d", { at: 0.8 }),
        ]);
        expect(spans.map((s) => s.at)).toEqual([0.2, 0.4, 0.6000000000000001, 0.8]);
        expect(spans[1]?.width).toBeCloseTo(0.2, 10);
        expect(spans[2]?.width).toBeCloseTo(0.2, 10);
    });

    it("a trailing run runs to 1", () => {
        const spans = layout([seg("a", { at: 0.5 }), seg("b"), seg("c")]);
        expect(spans.at(-1)?.at).toBeCloseTo(1, 10);
    });
});

describe("T-STATE-1 — active without progress is INDETERMINATE, not 0.5 and not 0", () => {
    it("reports no fill fraction at all", () => {
        // MUTATION THAT REDS THIS: restore the fabricated 0.5 default (or
        // substitute a fabricated 0 — a smaller lie, still a lie, and it paints
        // a running phase as not-started).
        expect(fillFor(seg("b", { state: "active" }))).toBeNull();
        expect(fillFor(seg("b", { state: "active", progress: 0.4 }))).toBe(0.4);
        expect(fillFor(seg("b", { state: "completed" }))).toBe(1);
        expect(fillFor(seg("b", { state: "pending" }))).toBe(0);
        expect(fillFor(seg("b"))).toBe(0);
    });

    it("contributes 0 to the aggregate", () => {
        const set = [
            seg("a", { at: 0.5, state: "completed" }),
            seg("b", { at: 1, state: "active" }),
        ];
        expect(aggregate(set)).toBeCloseTo(0.5, 10);
    });

    it("clamps an out-of-range progress rather than painting past the span", () => {
        expect(fillFor(seg("b", { progress: 4 }))).toBe(1);
        expect(fillFor(seg("b", { progress: -2 }))).toBe(0);
    });
});

describe("T-HUE-1 — the ordinal hue law", () => {
    it("is (HUE_OFFSET + HUE_STRIDE·i) mod HUE_STOPS over i 0..25", () => {
        // MUTATION THAT REDS THIS: change either integer.
        for (let i = 0; i <= 25; i += 1) {
            expect(accentFor(i)).toBe(`var(--section-color-${(2 + 4 * i) % 13})`);
        }
    });

    it("visits all thirteen stops before repeating — gcd(stride, stops) = 1", () => {
        const seen = new Set<string>();
        for (let i = 0; i < HUE_STOPS; i += 1) seen.add(accentFor(i));
        expect(seen.size).toBe(HUE_STOPS);
        expect(accentFor(HUE_STOPS)).toBe(accentFor(0));
        expect([HUE_OFFSET, HUE_STRIDE, HUE_STOPS]).toEqual([2, 4, 13]);
    });
});

describe("zero-width and coincident spans stay legal", () => {
    it("paints no fill and stacks the marks at the shared point", () => {
        const spans = layout([
            seg("a", { at: 0.5, state: "completed" }),
            seg("b", { at: 0.5, state: "completed" }),
            seg("c", { at: 1, state: "pending" }),
        ]);
        expect(spans[1]?.width).toBe(0);
        expect(spans[0]?.at).toBe(spans[1]?.at);
    });

    it("an empty set has no axis and no aggregate", () => {
        expect(layout([])).toEqual([]);
        expect(aggregate([])).toBe(0);
    });
});
