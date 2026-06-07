import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    getNestedValue,
    useDataTableRowIdentity,
} from "../../../../src/components/ui/data-table/composables/useDataTableRowIdentity";

interface Row {
    _id?: string;
    slug?: string;
    name: string;
    meta?: { id: string };
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("getNestedValue", () => {
    it("walks a dotted path off a nested row", () => {
        expect(getNestedValue({ meta: { id: "ada" } }, "meta.id")).toBe("ada");
    });

    it("returns undefined for a missing path without throwing", () => {
        expect(getNestedValue({ name: "Ada" }, "meta.id")).toBeUndefined();
        expect(getNestedValue(null, "anything")).toBeUndefined();
    });
});

describe("useDataTableRowIdentity", () => {
    it("keys rows by their explicit identity from getRowId", () => {
        const rows = ref<Row[]>([
            { slug: "ada", name: "Ada" },
            { slug: "grace", name: "Grace" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows: () => rows.value,
            rowKey: () => "_id",
            getRowId: () => (row) => row.slug,
        });

        expect(rowEntries.value.map((e) => e.key)).toEqual(["ada", "grace"]);

        // An immutable reorder keeps each row pinned to its identity.
        rows.value = [rows.value[1], rows.value[0]];
        expect(rowEntries.value.map((e) => e.key)).toEqual(["grace", "ada"]);
    });

    it("keys rows by a nested rowKey path", () => {
        const rows = ref<Row[]>([
            { meta: { id: "ada" }, name: "Ada" },
            { meta: { id: "grace" }, name: "Grace" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows: () => rows.value,
            rowKey: () => "meta.id",
        });

        expect(rowEntries.value.map((e) => e.key)).toEqual(["ada", "grace"]);
    });

    it("falls back to a stable generated symbol when identity is missing, warning once", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const rows = ref<Row[]>([{ name: "Ada" }, { name: "Grace" }]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows: () => rows.value,
            rowKey: () => "_id",
        });

        const firstKeys = rowEntries.value.map((e) => e.key);
        expect(firstKeys.every((k) => typeof k === "symbol")).toBe(true);
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining("Missing row identity"),
        );

        // The generated key is pinned to object identity — same rows, same keys.
        const original = rows.value;
        rows.value = [original[1], original[0]];
        const reorderedKeys = rowEntries.value.map((e) => e.key);
        expect(reorderedKeys[0]).toBe(firstKeys[1]);
        expect(reorderedKeys[1]).toBe(firstKeys[0]);
    });

    it("warns and generates symbols for duplicate explicit identities", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const rows = ref<Row[]>([
            { _id: "same", name: "Ada" },
            { _id: "same", name: "Grace" },
        ]);
        const { rowEntries } = useDataTableRowIdentity<Row>({
            rows: () => rows.value,
            rowKey: () => "_id",
        });

        const keys = rowEntries.value.map((e) => e.key);
        expect(keys.every((k) => typeof k === "symbol")).toBe(true);
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining("Duplicate row identity"),
        );
    });
});
