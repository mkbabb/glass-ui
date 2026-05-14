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
