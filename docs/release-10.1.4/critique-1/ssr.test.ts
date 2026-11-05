// @vitest-environment node
// SSR: DataTable and a bare useResizeObserver render with no window and no ResizeObserver.
import { createSSRApp, defineComponent, h, ref } from "vue";
import { renderToString } from "vue/server-renderer";
import { expect, test } from "vitest";
import DataTable from "../../../src/components/data-table/DataTable.vue";
import { useResizeObserver } from "../../../src/composables/dom/useResizeObserver";

test("no window", () => {
    expect(typeof window).toBe("undefined");
    expect(typeof ResizeObserver).toBe("undefined");
});

test("DataTable renders on the server as a table (no measurement)", async () => {
    const html = await renderToString(
        createSSRApp(() =>
            h(DataTable, {
                columns: [{ key: "a", label: "A" }],
                rows: [{ _id: "1", a: "x" }],
                responsive: true,
            }),
        ),
    );
    expect(html).toContain("<table");
    expect(html).not.toContain("data-table-cards");
});

test("useResizeObserver in a server setup neither throws nor dispatches", async () => {
    let calls = 0;
    const C = defineComponent(() => {
        const el = ref<HTMLElement | null>(null);
        useResizeObserver(el, () => calls++);
        return () => h("div", { ref: el });
    });
    await renderToString(createSSRApp(C));
    expect(calls).toBe(0);
});
