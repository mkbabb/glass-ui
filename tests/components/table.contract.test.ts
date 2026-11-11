import { readFileSync } from "node:fs";
import { join } from "node:path";

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

// Rounded table containers: the radius, the clip and the plate live on ONE element,
// `.table-container`, which `<Table>` renders and a consumer's own `<table>` can wear.
describe("Table container", () => {
    const css = (rel: string): string =>
        readFileSync(join(process.cwd(), rel), "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ");

    it("renders the table inside the one container class", () => {
        const wrapper = mount(Table, { slots: { default: "<tbody><tr><td>x</td></tr></tbody>" } });
        const container = wrapper.get('[data-slot="table-container"]');
        expect(container.classes()).toEqual(["table-container"]);
    });

    it("rounds, clips and scrolls on that element, on the plate, with no border", () => {
        const rule = css("src/components/table/styles.css").match(/\.table-container \{([^}]*)\}/)?.[1] ?? "";
        expect(rule).toContain("border-radius: var(--radius-card)");
        expect(rule).toContain("overflow: auto");
        expect(rule).toContain("background: var(--glass-plate-quiet)");
        expect(rule).not.toMatch(/\bborder(?:-(?:top|right|bottom|left|block|inline|width|style|color)[a-z-]*)?:/);
        // the main cascade carries it, so a plain table needs no component import
        expect(css("src/styles/index.css")).toContain('@import "../components/table/styles.css";');
        // DataTable's root no longer clips: the container is the one clip
        expect(css("src/components/data-table/styles.css")).not.toMatch(/\.data-table \{[^}]*overflow/);
    });

    it("paints no second plate inside a glass surface", () => {
        const nested =
            css("src/components/table/styles.css").match(
                /:is\(\.glass-wash, \.glass-quiet, \.glass-resting, \.glass-floating, \.glass-overlay\) \.table-container \{([^}]*)\}/,
            )?.[1] ?? "";
        expect(nested).toContain("background: transparent");
        expect(nested).toContain("box-shadow: none");
        expect(nested).not.toMatch(/radius|overflow/);
    });
});
