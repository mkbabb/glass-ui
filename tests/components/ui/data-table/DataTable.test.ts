import { mount, type VueWrapper } from "@vue/test-utils";
import { defineComponent, h, markRaw, type Component, type PropType } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import DataTable from "@glass/components/data-table/DataTable.vue";
import type { DataTableColumn } from "@glass/components/data-table/types";

interface Row {
    _id?: string;
    slug?: string;
    name: string;
    absoluteIndex?: number;
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

const NestedButtonCell = defineComponent({
    template: '<button type="button" data-nested-action>Open</button>',
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
        attachTo: document.body,
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

class NarrowResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}
    observe(target: Element) {
        this.callback(
            [
                {
                    target,
                    contentRect: { width: 320, height: 240 },
                } as ResizeObserverEntry,
            ],
            this as unknown as ResizeObserver,
        );
    }
    unobserve() {}
    disconnect() {}
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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
        await wrapper.find("thead th button").trigger("click");
        expect(wrapper.emitted("update:sort")?.at(-1)?.[0]).toEqual({
            key: "name",
            direction: "asc",
        });
    });
});

describe("DataTable interaction semantics", () => {
    it("keeps sortable-header focus and exposes truthful aria-sort", async () => {
        const sortableColumns: DataTableColumn[] = [
            { key: "name", label: "Name", sortable: true },
        ];
        const wrapper = mountTable([{ _id: "1", name: "Ada" }], {
            columns: sortableColumns,
            sort: { key: "name", direction: "asc" },
        });
        const head = wrapper.find("thead th");
        const command = head.find("button");

        expect(command.text()).toContain("Name");
        expect(head.attributes("aria-sort")).toBe("ascending");
        (command.element as HTMLButtonElement).focus();
        await command.trigger("click");
        await wrapper.setProps({ sort: { key: "name", direction: "desc" } });

        expect(head.attributes("aria-sort")).toBe("descending");
        expect(document.activeElement).toBe(command.element);
    });

    it("leaves rows noninteractive unless controlled selection is enabled", async () => {
        const wrapper = mountTable([{ _id: "1", name: "Ada" }]);
        const row = wrapper.find("tbody tr");

        expect(row.attributes("tabindex")).toBeUndefined();
        expect(row.attributes("aria-selected")).toBeUndefined();
        expect(row.classes()).not.toContain("cursor-pointer");
        await row.trigger("click");
        expect(wrapper.emitted("select")).toBeUndefined();
    });

    it("does not turn a nested button click into row selection", async () => {
        const wrapper = mountTable([{ _id: "1", name: "Ada" }], {
            columns: [
                {
                    key: "name",
                    label: "Name",
                    component: markRaw(NestedButtonCell),
                },
            ],
            selectable: true,
            selectedRowId: null,
        });

        await wrapper.find("[data-nested-action]").trigger("click");
        expect(wrapper.emitted("update:selectedRowId")).toBeUndefined();
        expect(wrapper.emitted("select")).toBeUndefined();
    });

    it("selects when a visible cell descendant is clicked", async () => {
        const ada = { _id: "1", name: "Ada" };
        const wrapper = mountTable([ada], {
            selectable: true,
            selectedRowId: null,
        });

        await wrapper.find("tbody td span").trigger("click");
        expect(wrapper.emitted("update:selectedRowId")?.at(-1)?.[0]).toBe("1");
        expect(wrapper.emitted("select")?.at(-1)?.[0]).toStrictEqual(ada);
    });

    it("selects from keyboard through stable row identity and retains focus", async () => {
        const ada = { _id: "1", name: "Ada" };
        const grace = { _id: "2", name: "Grace" };
        const wrapper = mountTable([ada, grace], {
            selectable: true,
            selectedRowId: "1",
        });
        const rows = wrapper.findAll("tbody tr");

        expect(rows[0].attributes("aria-selected")).toBe("true");
        expect(rows[1].attributes("aria-selected")).toBe("false");
        (rows[1].element as HTMLElement).focus();
        await rows[1].trigger("keydown", { key: "Enter" });

        expect(wrapper.emitted("update:selectedRowId")?.at(-1)?.[0]).toBe("2");
        expect(wrapper.emitted("select")?.at(-1)?.[0]).toStrictEqual(grace);

        await wrapper.setProps({ rows: [grace, ada], selectedRowId: "2" });
        const movedGrace = wrapper.findAll("tbody tr")[0];
        expect(movedGrace.attributes("aria-selected")).toBe("true");
        expect(document.activeElement).toBe(movedGrace.element);
    });

    it("projects the same controlled selection contract onto responsive cards", async () => {
        vi.stubGlobal("ResizeObserver", NarrowResizeObserver);
        const wrapper = mountTable(
            [
                { _id: "1", name: "Ada" },
                { _id: "2", name: "Grace" },
            ],
            { responsive: true, selectable: true, selectedRowId: "2" },
        );

        await vi.waitFor(() => expect(wrapper.find('[role="listbox"]').exists()).toBe(true));
        const cards = wrapper.findAll('[role="option"]');
        expect(cards).toHaveLength(2);
        expect(cards[1].attributes("aria-selected")).toBe("true");

        await cards[0].trigger("keydown", { key: " " });
        expect(wrapper.emitted("update:selectedRowId")?.at(-1)?.[0]).toBe("1");
    });

    it("keeps native-table row indices out of responsive cards", async () => {
        vi.stubGlobal("ResizeObserver", NarrowResizeObserver);
        const wrapper = mountTable(
            [
                { _id: "40", name: "Ada", absoluteIndex: 42 },
                { _id: "41", name: "Grace", absoluteIndex: 43 },
            ],
            {
                responsive: true,
                selectable: true,
                ariaRowCount: 101,
                tabbableRowId: "41",
                getRowAttrs: (row: Row) => ({
                    "aria-rowindex": row.absoluteIndex,
                    "data-absolute-index": row.absoluteIndex,
                }),
            },
        );

        await vi.waitFor(() => expect(wrapper.find('[role="listbox"]').exists()).toBe(true));
        const cards = wrapper.findAll("[data-absolute-index]");
        expect(wrapper.find("table").exists()).toBe(false);
        expect(wrapper.find('[aria-rowcount="101"]').exists()).toBe(false);
        expect(cards.map((card) => card.attributes("aria-rowindex"))).toEqual([
            undefined,
            undefined,
        ]);
        expect(cards.map((card) => card.attributes("data-absolute-index"))).toEqual([
            "42",
            "43",
        ]);
        expect(cards.map((card) => card.attributes("tabindex"))).toEqual(["-1", "0"]);
    });

    it("projects caller-windowed row semantics without owning the window", async () => {
        const rows: Row[] = [
            { _id: "40", name: "Ada", absoluteIndex: 42 },
            { _id: "41", name: "Grace", absoluteIndex: 43 },
        ];
        const rowRef = vi.fn();
        const wrapper = mountTable(rows, {
            ariaRowCount: 101,
            tabbableRowId: "41",
            getRowAttrs: (row: Row) => ({
                "aria-rowindex": row.absoluteIndex,
                "data-absolute-index": row.absoluteIndex,
            }),
            rowRef,
        });
        const mountedRows = wrapper.findAll("tbody tr");

        expect(wrapper.find("table").attributes("aria-rowcount")).toBe("101");
        expect(mountedRows.map((row) => row.attributes("aria-rowindex"))).toEqual([
            "42",
            "43",
        ]);
        expect(mountedRows.map((row) => row.attributes("tabindex"))).toEqual([
            "-1",
            "0",
        ]);
        expect(rowRef).toHaveBeenCalledWith(mountedRows[0].element, rows[0], 0);
        expect(rowRef).toHaveBeenCalledWith(mountedRows[1].element, rows[1], 1);

        await wrapper.setProps({ rows: [rows[1]] });
        expect(rowRef).toHaveBeenCalledWith(null, rows[0], 0);
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
