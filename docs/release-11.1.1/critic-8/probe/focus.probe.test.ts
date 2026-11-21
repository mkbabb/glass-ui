// Critic 8 probe, readings only: the DropdownMenu contract test's close by an item, timed.
// For thirty opens on one tree it records, from the item's click, when the menu content
// leaves the document and when focus lands on the trigger (polled every millisecond up
// to 400 ms), and what is focused at 30 ms, the contract test's own wait.
import { writeFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@glass/components/menu";

const Host = defineComponent({
    components: { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger },
    setup: () => ({ open: ref(false) }),
    template: `
        <DropdownMenu :open="open" @update:open="open = $event">
            <DropdownMenuTrigger as-child><button type="button">Open commands</button></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>First command</DropdownMenuItem>
                <DropdownMenuItem>Second command</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>`,
});

it("times the close by an item", async () => {
    const rows: { gone: number; focused: number; at30: string }[] = [];
    for (let i = 0; i < 30; i++) {
        const wrapper = mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } });
        const trigger = wrapper.get("button");
        trigger.element.focus();
        await trigger.trigger("click");
        await nextTick();
        await nextTick();
        await new Promise((r) => setTimeout(r, 30));
        const t0 = performance.now();
        (document.body.querySelector('[role="menuitem"]') as HTMLElement).click();
        let gone = -1;
        let focused = -1;
        let at30 = "";
        while (performance.now() - t0 < 400 && (gone < 0 || focused < 0)) {
            const t = performance.now() - t0;
            if (gone < 0 && !document.body.querySelector('[role="menu"]')) gone = +t.toFixed(1);
            if (focused < 0 && document.activeElement === trigger.element) focused = +t.toFixed(1);
            if (!at30 && t >= 30) at30 = document.activeElement?.tagName ?? "none";
            await new Promise((r) => setTimeout(r, 1));
        }
        rows.push({ gone, focused, at30 });
        wrapper.unmount();
        await new Promise((r) => setTimeout(r, 5));
    }
    writeFileSync(process.env.FOCUS_OUT!, JSON.stringify(rows));
    expect(rows.length).toBe(30);
});
