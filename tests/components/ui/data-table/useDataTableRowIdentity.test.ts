import { ref } from "vue";
import { describe, expect, it } from "vitest";

import { useDataTableRowIdentity } from "@glass/components/ui/data-table/composables/useDataTableRowIdentity";

interface Row {
    _id?: string;
    name: string;
}

// AW.W14 — the row-identity concern extracted from DataTable.vue.
describe("useDataTableRowIdentity (AW.W14)", () => {
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

    it("falls back to a generated key for a row with a missing id", () => {
        const rows = ref<Row[]>([
            { _id: "a", name: "Alpha" },
            { name: "NoId" }, // no _id
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        const [first, second] = rowEntries.value;
        expect(first.key).toBe("a");
        // The id-less row gets a generated symbol — distinct, object-stable.
        expect(typeof second.key).toBe("symbol");
    });

    it("falls back to generated keys for DUPLICATE ids (object identity)", () => {
        const rows = ref<Row[]>([
            { _id: "dup", name: "First" },
            { _id: "dup", name: "Second" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        const keys = rowEntries.value.map((e) => e.key);
        // Neither duplicate keeps the colliding "dup" — both get generated symbols.
        expect(keys.every((k) => typeof k === "symbol")).toBe(true);
        expect(keys[0]).not.toBe(keys[1]);
    });

    it("keeps a generated key STABLE for the same row object across recomputes", () => {
        const noId: Row = { name: "Stable" };
        const rows = ref<Row[]>([noId]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows,
            rowKey: "_id",
        });

        const firstKey = rowEntries.value[0].key;
        // Force a recompute by re-pointing the rows ref at the SAME object.
        rows.value = [noId];
        expect(rowEntries.value[0].key).toBe(firstKey);
    });
});
