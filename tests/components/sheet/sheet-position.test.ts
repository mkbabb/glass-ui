// 10.1.1 · atlas G-1 — an open sheet is `position: fixed` whatever material it wears.
//
// RED on 10.1.0: the content's class list carried no position utility, and its
// `position: fixed` sat in `:where([data-slot="sheet-content"])` (0,0,0), which always
// lost to `.glass-floating { position: relative }` (0,1,0) in the same layer, so every
// sheet rendered in document flow. happy-dom runs no cascade, so the witness reads the
// two facts the cascade is decided by: the utility on the element, and the absence of
// a competing `position` in the sheet's own rule. The engine half is the e2e witness
// (tests-visual/release-10-1-1.spec.ts).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { SheetContent } from "@glass/components/sheet";
import { Dialog, DialogDescription, DialogTitle } from "@glass/components/dialog";

const SHEET_CSS = readFileSync(
    resolve(process.cwd(), "src/components/sheet/styles.css"),
    "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const wrapper of mounted.splice(0)) wrapper.unmount();
});

async function openSheet(side: "top" | "right" | "bottom" | "left") {
    const Host = defineComponent(() => () =>
        h(Dialog, { open: true }, () =>
            h(SheetContent, { id: `sheet-${side}`, side, motion: "off" }, () => [
                h(DialogTitle, { class: "sr-only" }, () => "Sheet"),
                h(DialogDescription, { class: "sr-only" }, () => "Sheet position fixture."),
            ]),
        ),
    );
    mounted.push(
        mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } }),
    );
    await nextTick();
    await nextTick();
    return document.getElementById(`sheet-${side}`)!;
}

describe("SheetContent — G-1, the sheet is fixed, not in flow", () => {
    for (const side of ["top", "right", "bottom", "left"] as const) {
        it(`side=${side}: the content carries the \`fixed\` utility beside its material`, async () => {
            const content = await openSheet(side);
            expect(content.classList.contains("fixed")).toBe(true);
            expect(content.classList.contains("glass-floating")).toBe(true);
        });
    }

    it("the sheet's own :where() rule authors no competing position", () => {
        const rule = SHEET_CSS.match(/:where\(\[data-slot="sheet-content"\]\)\s*\{([^}]*)\}/);
        expect(rule).not.toBeNull();
        expect(rule![1]).not.toMatch(/\bposition\s*:/);
    });
});
