import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, h, markRaw, type Component, type PropType } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import DataTable from "../DataTable.vue";
import type { DataTableColumn } from "../types";

interface Row {
    _id?: string;
    slug?: string;
    name: string;
    meta?: {
        id: string;
    };
}

const StickyNameCell = defineComponent({
    props: {
        row: {
            type: Object as PropType<Row>,
            required: true,
        },
    },
    setup(props) {
        const initialName = props.row.name;

        return () => h("span", `${initialName}->${props.row.name}`);
    },
});

const columns: DataTableColumn[] = [
    {
        key: "name",
        label: "Name",
        component: markRaw(StickyNameCell),
    },
];

function mountTable(rows: Row[], props: Record<string, unknown> = {}) {
    return mount(DataTable as Component, {
        props: {
            columns,
            rows,
            total: rows.length,
            page: 1,
            pageSize: 10,
            infinite: true,
            ...props,
        },
    });
}

function rowText(wrapper: VueWrapper, index: number): string {
    return wrapper.findAll("tbody tr")[index]?.text() ?? "";
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe("DataTable page defineModel round-trip", () => {
    // AU.W8b.5 — the `page` model is now `defineModel<number>("page")`; the
    // `update:sort` channel STAYS a plain emit (it carries {key,direction}).
    it("emits update:page when a pagination control is clicked", async () => {
        const rows: Row[] = Array.from({ length: 30 }, (_, i) => ({
            _id: String(i),
            name: `Row ${i}`,
        }));
        const wrapper = mount(DataTable as Component, {
            props: {
                columns,
                rows: rows.slice(0, 10),
                total: 30,
                page: 1,
                pageSize: 10,
                infinite: false,
            },
        });
        const next = wrapper.find('button[aria-label="Next page"]');
        expect(next.exists()).toBe(true);
        await next.trigger("click");
        expect(wrapper.emitted("update:page")?.at(-1)?.[0]).toBe(2);
    });

    it("reflects an external page write in the active pagination control", async () => {
        const rows: Row[] = Array.from({ length: 30 }, (_, i) => ({
            _id: String(i),
            name: `Row ${i}`,
        }));
        const wrapper = mount(DataTable as Component, {
            props: {
                columns,
                rows: rows.slice(10, 20),
                total: 30,
                page: 1,
                pageSize: 10,
                infinite: false,
            },
        });
        await wrapper.setProps({ page: 2 });
        // The Previous-page control is enabled only when page > 1.
        const prev = wrapper.find('button[aria-label="Previous page"]');
        expect(prev.attributes("disabled")).toBeUndefined();
    });

    it("keeps update:sort as a plain event emit (not a model)", async () => {
        const sortableColumns: DataTableColumn[] = [
            { key: "name", label: "Name", sortable: true },
        ];
        const wrapper = mount(DataTable as Component, {
            props: {
                columns: sortableColumns,
                rows: [{ _id: "1", name: "Ada" }],
                total: 1,
                page: 1,
                pageSize: 10,
                infinite: true,
            },
        });
        await wrapper.find("thead th").trigger("click");
        expect(wrapper.emitted("update:sort")?.at(-1)?.[0]).toEqual({
            key: "name",
            direction: "asc",
        });
    });
});

describe("DataTable row identity", () => {
    it("falls back to stable object identity when the configured row key is missing", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const rows: Row[] = [{ name: "Ada" }, { name: "Grace" }];
        const wrapper = mountTable(rows);

        expect(rowText(wrapper, 0)).toContain("Ada->Ada");

        await wrapper.setProps({ rows: [rows[1], rows[0]] });

        expect(rowText(wrapper, 0)).toContain("Grace->Grace");
        expect(rowText(wrapper, 1)).toContain("Ada->Ada");
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining("Missing row identity"),
        );
    });

    it("uses getRowId for stable identity across immutable row updates", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const wrapper = mountTable(
            [
                { slug: "ada", name: "Ada" },
                { slug: "grace", name: "Grace" },
            ],
            {
                getRowId: (row: Row) => row.slug,
            },
        );

        await wrapper.setProps({
            rows: [
                { slug: "grace", name: "Grace" },
                { slug: "ada", name: "Ada" },
            ],
        });

        expect(rowText(wrapper, 0)).toContain("Grace->Grace");
        expect(rowText(wrapper, 1)).toContain("Ada->Ada");
        expect(warn).not.toHaveBeenCalled();
    });

    it("uses nested rowKey values for stable identity across immutable row updates", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const wrapper = mountTable(
            [
                { meta: { id: "ada" }, name: "Ada" },
                { meta: { id: "grace" }, name: "Grace" },
            ],
            {
                rowKey: "meta.id",
            },
        );

        await wrapper.setProps({
            rows: [
                { meta: { id: "grace" }, name: "Grace" },
                { meta: { id: "ada" }, name: "Ada" },
            ],
        });

        expect(rowText(wrapper, 0)).toContain("Grace->Grace");
        expect(rowText(wrapper, 1)).toContain("Ada->Ada");
        expect(warn).not.toHaveBeenCalled();
    });

    it("warns and falls back to object identity for duplicate row keys", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const rows: Row[] = [
            { _id: "same", name: "Ada" },
            { _id: "same", name: "Grace" },
        ];
        const wrapper = mountTable(rows);

        await wrapper.setProps({ rows: [rows[1], rows[0]] });

        expect(rowText(wrapper, 0)).toContain("Grace->Grace");
        expect(rowText(wrapper, 1)).toContain("Ada->Ada");
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining("Duplicate row identity"),
        );
    });
});
