// B7c C3-2: the palette's groups keep their content height.
//
// reka's ComboboxContent (the CommandList) renders as an inline flex column, bounded by
// `--overlay-max-block`. `.command__group` sets `overflow: hidden`, which drops a flex
// item's automatic minimum height to 0, so a long list shrank every group to fit. On the
// atlas palette the short "Dashboards" group collapsed under the input with its heading
// under "School units" and its rows unreachable (B7B-DOCK relay row 3). The browser
// witness is `tests-visual/CommandDialog.b7c.spec.ts`; this case pins the two facts it
// rests on: the list is a flex column, and a group does not shrink in it.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { defineComponent, nextTick } from "vue";
import { Command, CommandGroup, CommandItem, CommandList } from "@glass/components/command";

function declarations(selector: string): Record<string, string> {
    const file = resolve(process.cwd(), "src/components/command/styles.css");
    const out: Record<string, string> = {};
    postcss.parse(readFileSync(file, "utf8"), { from: file }).walkRules((rule) => {
        if (rule.selectors.includes(selector)) {
            rule.walkDecls((decl) => {
                out[decl.prop] = decl.value;
            });
        }
    });
    return out;
}

describe("command groups in the list", () => {
    it("the list is a flex column, so its children are flex items", async () => {
        const Host = defineComponent({
            components: { Command, CommandGroup, CommandItem, CommandList },
            template: `
                <Command :open="true">
                    <CommandList>
                        <CommandGroup heading="Dashboards">
                            <CommandItem value="sci">SCI</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            `,
        });
        const wrapper = mount(Host, { attachTo: document.body });
        await nextTick();
        const list = document.querySelector<HTMLElement>('[data-slot="command-list"]')!;
        expect(list.style.display).toBe("flex");
        expect(list.style.flexDirection).toBe("column");
        expect(list.querySelector(".command__group")?.parentElement).toBe(list);
        wrapper.unmount();
    });

    it("a group clips its overflow but keeps its content height", () => {
        const group = declarations(".command__group");
        expect(group.overflow).toBe("hidden");
        expect(group.flex === "none" || group["flex-shrink"] === "0").toBe(true);
    });
});
