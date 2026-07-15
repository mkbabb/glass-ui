import { ref } from "vue";
import { describe, expect, it } from "vitest";

import { useDataTableResponsive } from "@glass/components/data-table/composables/useDataTableResponsive";
import type { DataTableColumn } from "@glass/components/data-table/types";

interface Row {
    name: string;
    speed: number;
    latency: number;
}

const columns: DataTableColumn<Row>[] = [
    { key: "name", label: "Name" },
    { key: "speed", label: "Speed" },
    { key: "latency", label: "Latency" },
];

// AW.W14 — the responsive card-vs-table projection extracted from DataTable.vue.
describe("useDataTableResponsive (AW.W14)", () => {
    it("stays tabular at/above the card breakpoint", () => {
        const width = ref(800);
        const { isCard } = useDataTableResponsive<Row>({
            columns,
            responsive: true,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(isCard.value).toBe(false);
    });

    it("swaps to the card projection below the breakpoint", () => {
        const width = ref(400);
        const { isCard } = useDataTableResponsive<Row>({
            columns,
            responsive: true,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(isCard.value).toBe(true);
    });

    it("guards the pre-measure frame (width 0 never flashes the card layout)", () => {
        const width = ref(0);
        const { isCard } = useDataTableResponsive<Row>({
            columns,
            responsive: true,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(isCard.value).toBe(false);
    });

    it("stays tabular when responsive is off, regardless of width", () => {
        const width = ref(200);
        const { isCard } = useDataTableResponsive<Row>({
            columns,
            responsive: false,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(isCard.value).toBe(false);
    });

    it("splits the columns: first → header line, rest → label/value body", () => {
        const width = ref(400);
        const { headerColumn, bodyColumns } = useDataTableResponsive<Row>({
            columns,
            responsive: true,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(headerColumn.value?.key).toBe("name");
        expect(bodyColumns.value.map((c) => c.key)).toEqual(["speed", "latency"]);
    });

    it("re-derives isCard reactively when the width crosses the breakpoint", () => {
        const width = ref(800);
        const { isCard } = useDataTableResponsive<Row>({
            columns,
            responsive: true,
            cardBreakpoint: 640,
            containerWidth: width,
        });
        expect(isCard.value).toBe(false);
        width.value = 320;
        expect(isCard.value).toBe(true);
    });
});
