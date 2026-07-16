import { ref } from "vue";
import { describe, expect, it } from "vitest";

import { useDataTableRowIdentity } from "@glass/components/data-table/composables/useDataTableRowIdentity";

interface Row {
    _id?: string;
    name: string;
}

describe("useDataTableRowIdentity", () => {
    it("keys rows by their explicit unique id (the dotted rowKey path)", () => {
        const rows = ref<Row[]>([
            { _id: "a", name: "Alpha" },
            { _id: "b", name: "Beta" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        const keys = rowEntries.value.map((e) => e.key);
        expect(keys).toEqual(["a", "b"]);
        expect(rowEntries.value[0].row.name).toBe("Alpha");
    });

    it("honors an explicit getRowId resolver over the rowKey", () => {
        const rows = ref<Row[]>([
            { _id: "ignored", name: "Alpha" },
            { _id: "ignored2", name: "Beta" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
            getRowId: (row: Row) => row.name,
        });

        expect(rowEntries.value.map((e) => e.key)).toEqual(["Alpha", "Beta"]);
    });

    it("accepts a zero-argument resolver without mistaking it for reactive input", () => {
        const rows = ref<Row[]>([{ _id: "ignored", name: "Alpha" }]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
            getRowId: () => "fixed",
        });

        expect(rowEntries.value[0]?.key).toBe("fixed");
    });

    it("does not mask an invalid explicit resolver with rowKey fallback", () => {
        const rows = ref<Row[]>([{ _id: "fallback", name: "Alpha" }]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
            getRowId: () => undefined,
        });

        expect(() => rowEntries.value).toThrow("Row 0 has no stable identity");
    });

    it("rejects a row with no stable identity", () => {
        const rows = ref<Row[]>([
            { _id: "a", name: "Alpha" },
            { name: "NoId" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        expect(() => rowEntries.value).toThrow("Row 1 has no stable identity");
    });

    it("rejects duplicate identities", () => {
        const rows = ref<Row[]>([
            { _id: "dup", name: "First" },
            { _id: "dup", name: "Second" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        expect(() => rowEntries.value).toThrow("Duplicate row identity dup");
    });
});
