import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@glass/components/command";
import { DialogDescription, DialogTitle } from "@glass/components/dialog";

const mounted: Array<ReturnType<typeof mount>> = [];

afterEach(() => {
    while (mounted.length) mounted.pop()?.unmount();
});

function mountCommandLab(initiallyOpen = true) {
    const Host = defineComponent({
        components: {
            Command,
            CommandDialog,
            CommandEmpty,
            CommandGroup,
            CommandInput,
            CommandItem,
            CommandList,
            DialogDescription,
            DialogTitle,
        },
        setup() {
            const open = ref(true);
            const show = ref(initiallyOpen);
            const selected = ref<string | null>(null);
            const inlineQuery = ref("");
            const dialogQuery = ref("");
            const executed = ref<string[]>([]);
            const rows = [
                { id: "first", label: "First command", disabled: false },
                { id: "second", label: "Second command", disabled: false },
                { id: "blocked", label: "Blocked command", disabled: true },
            ];
            function execute(id: string) {
                selected.value = id;
                executed.value.push(id);
                open.value = false;
                show.value = false;
            }
            function openDialog() {
                open.value = true;
                show.value = true;
            }
            function updateOpen(value: boolean) {
                open.value = value;
                if (!value) show.value = false;
            }
            return {
                dialogQuery,
                execute,
                executed,
                inlineQuery,
                open,
                openDialog,
                rows,
                selected,
                show,
                updateOpen,
            };
        },
        template: `
            <div>
                <button id="palette-trigger" type="button" @click="openDialog">Open palette</button>
                <Command v-if="!show" v-model="selected">
                    <CommandInput v-model="inlineQuery" aria-label="Search inline commands" />
                    <CommandList>
                        <CommandGroup heading="Commands">
                            <CommandItem
                                v-for="row in rows"
                                :key="row.id"
                                :value="row.id"
                                :text-value="row.label"
                                :disabled="row.disabled"
                                @select="execute(row.id)"
                            >{{ row.label }}</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>

                <CommandDialog
                    v-if="show"
                    v-model="selected"
                    :open="open"
                    @update:open="updateOpen"
                >
                    <DialogTitle>Command palette</DialogTitle>
                    <DialogDescription>Search and run a command.</DialogDescription>
                    <CommandInput v-model="dialogQuery" aria-label="Search dialog commands" />
                    <CommandList>
                        <CommandEmpty>No results</CommandEmpty>
                        <CommandGroup heading="Commands">
                            <CommandItem
                                v-for="row in rows"
                                :key="row.id"
                                :value="row.id"
                                :text-value="row.label"
                                :disabled="row.disabled"
                                @select="execute(row.id)"
                            >{{ row.label }}</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>
        `,
    });
    const wrapper = mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    mounted.push(wrapper);
    return wrapper;
}

async function openDialog(wrapper: ReturnType<typeof mount>) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const trigger = wrapper.get("#palette-trigger");
    (trigger.element as HTMLElement).focus();
    (wrapper.vm as unknown as { openDialog: () => void }).openDialog();
    await nextTick();
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 30));
    return trigger;
}

async function settleDialog() {
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 30));
}

describe("Command contract", () => {
    it("keeps its optional uncontrolled model scalar at runtime", async () => {
        const Host = defineComponent({
            components: { Command, CommandGroup, CommandItem, CommandList },
            setup: () => ({ updates: ref<Array<string | number | null>>([]) }),
            template: `
                <Command multiple @update:model-value="updates.push($event)">
                    <CommandList>
                        <CommandGroup heading="Commands">
                            <CommandItem value="first">First command</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            `,
        });
        const wrapper = mount(Host, { attachTo: document.body });
        mounted.push(wrapper);
        const option = wrapper.get<HTMLElement>('[role="option"]');

        await option.trigger("click");
        await nextTick();

        expect((wrapper.vm as unknown as { updates: string[] }).updates).toEqual([
            "first",
        ]);
        expect(option.attributes("aria-selected")).toBe("true");
    });

    it("leaves inline focus with the caller", async () => {
        const Host = defineComponent({
            components: { Command, CommandInput, CommandList },
            setup: () => ({ show: ref(false) }),
            template: `
                <button type="button" @click="show = true">Show commands</button>
                <Command v-if="show">
                    <CommandInput aria-label="Search inline commands" />
                    <CommandList />
                </Command>
            `,
        });
        const wrapper = mount(Host, { attachTo: document.body });
        mounted.push(wrapper);
        const trigger = wrapper.get("button");
        trigger.element.focus();
        await trigger.trigger("click");
        await nextTick();

        expect(document.activeElement).toBe(trigger.element);
    });

    it("renders a titled modal and filters the dialog collection from its query", async () => {
        const wrapper = mountCommandLab();
        await settleDialog();

        const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')!;
        expect(dialog).toBeTruthy();
        expect(dialog.getAttribute("aria-labelledby")).toBeTruthy();
        expect(document.body.textContent).toContain("Command palette");

        const input = document.body.querySelector<HTMLInputElement>(
            '[aria-label="Search dialog commands"]',
        )!;
        expect(document.activeElement).toBe(input);
        input.value = "Second";
        input.dispatchEvent(new InputEvent("input", { bubbles: true, data: "d" }));
        await nextTick();

        const visibleOptions = Array.from(
            dialog.querySelectorAll<HTMLElement>('[role="option"]'),
        ).filter((option) => !option.hidden && option.style.display !== "none");
        expect(visibleOptions).toHaveLength(1);
        expect(visibleOptions[0]!.textContent).toContain("Second command");
    });

    it("Arrow navigation and Enter execute one shared active identity", async () => {
        const wrapper = mountCommandLab();
        await settleDialog();
        const input = document.body.querySelector<HTMLInputElement>(
            '[aria-label="Search dialog commands"]',
        )!;

        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
        );
        await nextTick();
        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
        );
        await nextTick();
        const activeId = input.getAttribute("aria-activedescendant");
        expect(activeId).toBeTruthy();
        expect(document.getElementById(activeId!)?.getAttribute("role")).toBe("option");
        expect(document.getElementById(activeId!)?.textContent).toContain(
            "Second command",
        );
        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
        );
        await nextTick();

        expect((wrapper.vm as unknown as { selected: string }).selected).toBe("second");
        expect((wrapper.vm as unknown as { executed: string[] }).executed).toEqual([
            "second",
        ]);
        expect(document.body.querySelector('[role="dialog"]')).toBeNull();

        const inlineSecond = Array.from(
            wrapper.findAll<HTMLElement>('[role="option"]'),
        ).find((option) => option.text().includes("Second command"))!;
        expect(inlineSecond.attributes("aria-selected")).toBe("true");
    });

    it("never executes a disabled command", async () => {
        const wrapper = mountCommandLab();
        await settleDialog();
        const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')!;
        const blocked = Array.from(
            dialog.querySelectorAll<HTMLElement>('[role="option"]'),
        ).find((option) => option.textContent?.includes("Blocked command"))!;

        blocked.click();
        await nextTick();
        expect((wrapper.vm as unknown as { executed: string[] }).executed).toEqual([]);
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true);
    });

    it("Escape dismisses without execution and restores the opener", async () => {
        const wrapper = mountCommandLab(false);
        const trigger = await openDialog(wrapper);
        const input = document.body.querySelector<HTMLInputElement>(
            '[aria-label="Search dialog commands"]',
        )!;

        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        await nextTick();
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        expect((wrapper.vm as unknown as { executed: string[] }).executed).toEqual([]);
        expect(document.activeElement).toBe(trigger.element);
    });
});
