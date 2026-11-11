// O-214 — after a pointer open, the highlight alone marks the checked row.
//
// reka focuses the checked row by script on every open, and the engines report that
// focus as `:focus-visible` after a pointer open (the trigger's own mouse focus was
// prevented), so the row drew the keyboard ring beside its highlight. The trigger now
// records the input that opened the list, the content stamps it, and the menu row drops
// its ring under `[data-open-input="pointer"]` until a key is pressed in the list. The
// paint witness is docs/release-11.1.0/fix-2/witness (both engines, 390 and 1440).

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { injectSelectOpenInput, provideSelectOpenInput } from "@glass/components/select/openInput";

describe("Select open input", () => {
    it("defaults to keyboard and records the input that opens the list", async () => {
        let seen: ReturnType<typeof injectSelectOpenInput> = null;
        const Child = defineComponent(() => {
            seen = injectSelectOpenInput();
            return () => h("span");
        });
        mount(defineComponent(() => {
            provideSelectOpenInput();
            return () => h(Child);
        }));
        expect(seen!.input.value).toBe("keyboard");
        seen!.mark("pointer");
        await nextTick();
        expect(seen!.input.value).toBe("pointer");
        seen!.mark("keyboard");
        expect(seen!.input.value).toBe("keyboard");
    });

    it("is absent outside a Select, so a rootless part reads nothing", () => {
        let seen: unknown = "unset";
        mount(defineComponent(() => {
            seen = injectSelectOpenInput();
            return () => h("span");
        }));
        expect(seen).toBeNull();
    });

    it("drops the row ring only under a pointer open", () => {
        const menu = readFileSync(join(process.cwd(), "src/components/_shared/menu/menu.css"), "utf8");
        expect(menu.replace(/\s+/g, " ")).toContain(
            '[data-open-input="pointer"] .glass-menu-row:focus-visible { outline: none; }',
        );
    });
});
