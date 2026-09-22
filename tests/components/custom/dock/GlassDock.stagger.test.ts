// O-32 §4.3 L-23—the reveal stagger is an edge-in ladder over the CONTROLS.
//
// Each control's `--dock-stagger-onset` is `step × min(distance from the nearer edge,
// 3)`: the two edge controls reveal first and the middle last, symmetric at every row
// length. A DockSeparator is a sibling child of the layer but takes no rung, so a
// hairline neither shifts the ladder nor delays itself. The rungs count with
// `nth-child(… of :not(.dock-separator))` and each is bounded from BOTH ends, so no
// rung can match a child that is nearer the other edge.
//
// A REAL ENGINE: the ladder lives inside `@layer components`, which happy-dom drops.
// The rows are real GlassDock / DockControl / DockSeparator mounts (happy-dom renders
// the markup); Playwright's bundled Chromium resolves the source bytes of
// `layers.css` over that markup. The one instrument is a `<number>` registration of
// `--dock-stagger-onset` with `--dock-stagger-step: 1`, so the computed onset IS the
// rung index.

import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { chromium, type Browser, type Page } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import DockControl from "@glass/components/dock/DockControl.vue";
import DockSeparator from "@glass/components/dock/DockSeparator.vue";
import GlassDock from "@glass/components/dock/GlassDock.vue";

const LAYERS = readFileSync("src/components/dock/styles/layers.css", "utf8");

const INSTRUMENT = `
@property --dock-stagger-onset { syntax: "<number>"; inherits: false; initial-value: 0; }
.glass-dock { --dock-stagger-step: 1; }`;

/** `c` a DockControl, `s` a DockSeparator. */
const ROWS = ["cc", "csccccsc", "ccscccscc", "ccc", "cccc", "ccccc", "ccccccc", "cccccccccc"];

/** Mounted GlassDock markup for one row, marked mid-morph. */
function dockHtml(row: string): string {
    const Host = defineComponent({
        setup: () => () =>
            h(GlassDock, { collapse: "open", "data-row": row }, () =>
                [...row].map((kind, i) =>
                    kind === "s"
                        ? h(DockSeparator)
                        : h(DockControl, { "aria-label": `c${i}` }, () => "•"),
                ),
            ),
    });
    const wrapper = mount(Host);
    const dock = wrapper.get(".glass-dock").element as HTMLElement;
    dock.setAttribute("data-morphing", "");
    const html = dock.outerHTML;
    wrapper.unmount();
    return html;
}

let browser: Browser;
let page: Page;

beforeAll(async () => {
    const docks = ROWS.map(dockHtml).join("\n");
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.setContent(
        `<style>${LAYERS}</style><style>${INSTRUMENT}</style>${docks}`,
    );
}, 60_000);

afterAll(async () => {
    await browser?.close();
});

/** The computed onset of every child of the row's active layer, tagged c/s. */
async function onsets(row: string) {
    return page.evaluate((key) => {
        const layer = document.querySelector(
            `.glass-dock[data-row="${key}"] .dock-layer.is-active`,
        )!;
        return [...layer.children].map((child) => ({
            kind: child.classList.contains("dock-separator") ? "s" : "c",
            onset: Number(
                getComputedStyle(child).getPropertyValue("--dock-stagger-onset"),
            ),
        }));
    }, row);
}

describe("GlassDock reveal stagger—the edge-in ladder over controls", () => {
    it("mounts every child of the row into the active layer", async () => {
        for (const row of ROWS) {
            expect((await onsets(row)).map((c) => c.kind).join("")).toBe(row);
        }
    });

    it.each(ROWS)(
        "row %s: controls ladder edge-in, symmetric; separators take no rung",
        async (row) => {
            const children = await onsets(row);
            const controls = children.filter((c) => c.kind === "c").map((c) => c.onset);
            const n = controls.length;
            const ladder = controls.map((_, i) => Math.min(i, n - 1 - i, 3));

            expect(controls).toEqual(ladder);
            expect(children.filter((c) => c.kind === "s").map((c) => c.onset)).toEqual(
                children.filter((c) => c.kind === "s").map(() => 0),
            );
        },
    );
});
