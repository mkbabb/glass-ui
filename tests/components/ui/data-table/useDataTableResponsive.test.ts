import { ref } from "vue";
import { describe, expect, it, vi } from "vitest";

// Drive the container measurement directly: `useElementSize` is the ResizeObserver
// seam the composable reads, and jsdom never lays out a real width. Mocking it
// lets the unit exercise the card-vs-table breakpoint logic deterministically.
const measuredWidth = ref(0);
vi.mock("@vueuse/core", () => ({
    useElementSize: () => ({ width: measuredWidth, height: ref(0) }),
}));

import { useDataTableResponsive } from "../../../../src/components/ui/data-table/composables/useDataTableResponsive";
import type { DataTableColumn } from "../../../../src/components/ui/data-table/types";

const columns: DataTableColumn[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "team", label: "Team" },
];

function makeResponsive(width: number, responsive = true, cardBreakpoint = 640) {
    measuredWidth.value = width;
    return useDataTableResponsive({
        columns: () => columns,
        responsive: () => responsive,
        cardBreakpoint: () => cardBreakpoint,
    });
}

describe("useDataTableResponsive", () => {
    it("splits columns into a header + body projection", () => {
        const { headerColumn, bodyColumns } = makeResponsive(0);
        expect(headerColumn.value?.key).toBe("name");
        expect(bodyColumns.value.map((c) => c.key)).toEqual(["role", "team"]);
    });

    it("is tabular at/above the breakpoint", () => {
        const { isCard } = makeResponsive(800);
        expect(isCard.value).toBe(false);
    });

    it("swaps to cards below the breakpoint in responsive mode", () => {
        const { isCard } = makeResponsive(480);
        expect(isCard.value).toBe(true);
    });

    it("stays tabular below the breakpoint when responsive is off", () => {
        const { isCard } = makeResponsive(480, false);
        expect(isCard.value).toBe(false);
    });

    it("suppresses the pre-measure frame (width 0 never reads as card)", () => {
        const { isCard } = makeResponsive(0);
        expect(isCard.value).toBe(false);
    });

    it("reacts when the measured width crosses the breakpoint", () => {
        const { isCard } = makeResponsive(800);
        expect(isCard.value).toBe(false);
        measuredWidth.value = 400;
        expect(isCard.value).toBe(true);
    });
});
