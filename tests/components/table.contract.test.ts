import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Table, TableBody, TableCell, TableRow } from "@glass/components/table";

describe("Table foundation contract", () => {
    it("routes native table attributes, class, style, and semantics to table", () => {
        const wrapper = mount(Table, {
            props: {
                class: "consumer-table",
                role: "grid",
                ariaLabel: "Results",
                ariaColCount: 2,
                ariaRowCount: 4,
            },
            attrs: {
                id: "results-table",
                style: "inline-size: 40rem;",
                "data-owner": "report",
            },
            slots: {
                default: "<tbody><tr><td>Result</td></tr></tbody>",
            },
        });

        const container = wrapper.get('[data-slot="table-container"]');
        const table = wrapper.get('table[data-slot="table"]');

        expect(container.attributes("id")).toBeUndefined();
        expect(container.attributes("style")).toBeUndefined();
        expect(container.attributes("role")).toBeUndefined();
        expect(container.classes()).not.toContain("consumer-table");

        expect(table.attributes("id")).toBe("results-table");
        expect(table.attributes("style")).toContain("inline-size: 40rem");
        expect(table.attributes("data-owner")).toBe("report");
        expect(table.attributes("role")).toBe("grid");
        expect(table.attributes("aria-label")).toBe("Results");
        expect(table.attributes("aria-colcount")).toBe("2");
        expect(table.attributes("aria-rowcount")).toBe("4");
        expect(table.classes()).toContain("consumer-table");
    });

    it("keeps base rows visually neutral even when consumers attach state data", () => {
        const wrapper = mount(
            {
                components: { Table, TableBody, TableCell, TableRow },
                template: `
                    <Table>
                        <TableBody>
                            <TableRow data-state="selected">
                                <TableCell>Static content</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                `,
            },
        );
        const row = wrapper.get("tbody tr");

        expect(row.classes()).toContain("border-b");
        expect(row.classes()).not.toContain("transition-colors");
        expect(row.classes()).not.toContain("hover:bg-muted/50");
        expect(row.classes()).not.toContain("data-[state=selected]:bg-muted");
    });
});
