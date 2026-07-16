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
        expect(wrapper.emitted("update:sort")?.at(-1)?.[0]).toEqual({
            key: "name",
            direction: "desc",
        });
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
        expect(row.classes()).not.toContain("hover:bg-muted/50");
        expect(row.classes()).not.toContain("data-[state=selected]:bg-muted");
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

        expect(rows[0].classes()).toContain("data-table-row-interactive");
        expect(rows[0].attributes("aria-selected")).toBe("true");
        expect(rows[1].attributes("aria-selected")).toBe("false");
        expect(rows.map((row) => row.attributes("tabindex"))).toEqual(["0", "-1"]);
        (rows[1].element as HTMLElement).focus();
        await rows[1].trigger("keydown", { key: "Enter" });

        expect(wrapper.emitted("update:selectedRowId")?.at(-1)?.[0]).toBe("2");
        expect(wrapper.emitted("select")?.at(-1)?.[0]).toStrictEqual(grace);

        await wrapper.setProps({ rows: [grace, ada], selectedRowId: "2" });
        const movedGrace = wrapper.findAll("tbody tr")[0];
        expect(movedGrace.attributes("aria-selected")).toBe("true");
        expect(document.activeElement).toBe(movedGrace.element);
    });

    it("moves the sole mounted tab stop without owning off-window navigation", async () => {
        const wrapper = mountTable(
            [
                { _id: "1", name: "Ada" },
                { _id: "2", name: "Grace" },
                { _id: "3", name: "Katherine" },
            ],
            { selectable: true, selectedRowId: "1", tabbableRowId: "1" },
        );
        const rows = wrapper.findAll("tbody tr");

        (rows[0].element as HTMLElement).focus();
        await rows[0].trigger("keydown", { key: "ArrowDown" });
        expect(wrapper.emitted("update:tabbableRowId")?.at(-1)?.[0]).toBe("2");

        await wrapper.setProps({ tabbableRowId: "2" });
        expect(rows.map((row) => row.attributes("tabindex"))).toEqual(["-1", "0", "-1"]);
        expect(document.activeElement).toBe(rows[1].element);
    });

    it("roves a focus-only virtual shell without turning rows into selectors", async () => {
        const wrapper = mountTable(
            [
                { _id: "40", name: "Ada" },
                { _id: "41", name: "Grace" },
            ],
            { tabbableRowId: "40" },
        );
        const rows = wrapper.findAll("tbody tr");

        expect(rows.map((row) => row.attributes("tabindex"))).toEqual(["0", "-1"]);
        expect(rows[0].attributes("aria-selected")).toBeUndefined();
        await rows[0].trigger("keydown", { key: "ArrowDown" });
        expect(wrapper.emitted("update:tabbableRowId")?.at(-1)?.[0]).toBe("41");

        await rows[0].trigger("keydown", { key: "Enter" });
        expect(wrapper.emitted("select")).toBeUndefined();
        expect(wrapper.emitted("update:selectedRowId")).toBeUndefined();
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
                getRowIndex: (row: Row) => row.absoluteIndex!,
                getRowAttrs: (row: Row) => ({
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
            getRowIndex: (row: Row) => row.absoluteIndex!,
            getRowAttrs: (row: Row) => ({
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

    it("places grid semantics on the native table without changing the wrapper", () => {
        const wrapper = mountTable([{ _id: "1", name: "Ada" }], {
            role: "grid",
            ariaLabel: "Schools",
            ariaColCount: 4,
        });
        const table = wrapper.find("table");

        expect(table.attributes()).toMatchObject({
            role: "grid",
            "aria-label": "Schools",
            "aria-colcount": "4",
        });
        expect(table.element.parentElement?.hasAttribute("role")).toBe(false);
        expect(wrapper.find("thead tr").attributes("aria-rowindex")).toBe("1");
    });

    it("keeps an empty grid's placeholder outside the logical row count", () => {
        const wrapper = mountTable([], {
            role: "grid",
            ariaLabel: "Schools",
            ariaColCount: 1,
            ariaRowCount: 1,
        });

        expect(wrapper.find("table").attributes("aria-rowcount")).toBe("1");
        expect(wrapper.find("tbody tr").attributes("role")).toBe("presentation");
    });

    it("distinguishes loading, filtered-empty, and error states", async () => {
        const wrapper = mountTable([], { status: "loading" });
        expect(wrapper.attributes("data-state")).toBe("loading");
        expect(wrapper.attributes("aria-busy")).toBe("true");

        await wrapper.setProps({ status: "ready", filtered: true });
        expect(wrapper.attributes("data-state")).toBe("filtered-empty");
        expect(wrapper.text()).toContain("No matching rows");

        await wrapper.setProps({ status: "error", filtered: false });
        expect(wrapper.attributes("data-state")).toBe("error");
        expect(wrapper.find('[role="alert"]').text()).toContain("Unable to load data");
    });
});

describe("DataTable row identity", () => {
    it("rejects rows with missing identity", () => {
        expect(() => mountTable([{ name: "Ada" }])).toThrow(
            "Row 0 has no stable identity",
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

    it("rejects duplicate row identities", () => {
        const rows: Row[] = [
            { _id: "same", name: "Ada" },
            { _id: "same", name: "Grace" },
        ];
        expect(() => mountTable(rows)).toThrow("Duplicate row identity same");
    });
});
