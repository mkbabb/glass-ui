// Critic 8 probe, readings only: the DropdownMenu contract test's own menu (its mountMenu
// and openClickMenu, copied), closed by its first item thirty times, with the time from the
// item's click to focus on the trigger polled every millisecond up to 400 ms. Run beside
// the aurora fuzz test, as the gate runs them, so the other worker loads the machine.
import { writeFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import {
    ContextMenu,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@glass/components/menu";

const mounted: Array<ReturnType<typeof mount>> = [];
function mountMenu(trigger: "click" | "context" = "click") {
    const Host = defineComponent({
        components: {
            ContextMenu,
            DropdownMenu,
            DropdownMenuCheckboxItem,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuRadioGroup,
            DropdownMenuRadioItem,
            DropdownMenuSub,
            DropdownMenuSubContent,
            DropdownMenuSubTrigger,
            DropdownMenuTrigger,
        },
        setup() {
            return {
                checked: ref(false),
                open: ref(false),
                radio: ref("one"),
                executed: ref<string[]>([]),
            };
        },
        template: `
            <component
                :is="'${trigger}' === 'click' ? 'DropdownMenu' : 'ContextMenu'"
                v-bind="'${trigger}' === 'click' ? { open } : {}"
                @update:open="open = $event"
            >
                <DropdownMenuTrigger as-child>
                    <button type="button">Open commands</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem @select="executed.push('first')">First command</DropdownMenuItem>
                    <DropdownMenuCheckboxItem v-model="checked">Grid</DropdownMenuCheckboxItem>
                    <DropdownMenuRadioGroup v-model="radio">
                        <DropdownMenuRadioItem value="one">One</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="two">Two</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuItem disabled @select="executed.push('disabled')">Disabled</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem @select="executed.push('nested')">Nested command</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </component>
        `,
    });
    const wrapper = mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    mounted.push(wrapper);
    return wrapper;
}

async function openClickMenu(wrapper: ReturnType<typeof mount>) {
    const trigger = wrapper.get("button");
    trigger.element.focus();
    await trigger.trigger("click");
    await nextTick();
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 30));
    return trigger;
}

it("times the contract menu's close by its first item", async () => {
    const rows: number[] = [];
    for (let i = 0; i < 30; i++) {
        const wrapper = mountMenu();
        const trigger = await openClickMenu(wrapper);
        const t0 = performance.now();
        (document.body.querySelector('[role="menuitem"]') as HTMLElement).click();
        await nextTick();
        let focused = -1;
        while (performance.now() - t0 < 400 && focused < 0) {
            if (document.activeElement === trigger.element) focused = +(performance.now() - t0).toFixed(1);
            else await new Promise((r) => setTimeout(r, 1));
        }
        rows.push(focused);
        while (mounted.length) mounted.pop()?.unmount();
        await new Promise((r) => setTimeout(r, 0));
    }
    writeFileSync(process.env.FOCUS_OUT!, JSON.stringify(rows));
    expect(rows.length).toBe(30);
});
