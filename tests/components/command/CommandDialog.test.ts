import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { ComboboxRoot, DialogRoot } from "reka-ui";
import {
    CommandDialog,
    CommandInput,
    CommandItem,
    CommandList,
} from "@glass/components/command";
import { DialogDescription, DialogTitle } from "@glass/components/dialog";

describe("CommandDialog", () => {
    it("forwards command selection through its shared model", async () => {
        const Host = defineComponent({
            components: {
                CommandDialog,
                CommandInput,
                CommandItem,
                CommandList,
                DialogDescription,
                DialogTitle,
            },
            setup() {
                return { open: ref(true), selected: ref("first") };
            },
            template: `
                <CommandDialog v-model="selected" v-model:open="open">
                    <DialogTitle class="sr-only">Commands</DialogTitle>
                    <DialogDescription class="sr-only">Search and run a command.</DialogDescription>
                    <CommandInput />
                    <CommandList>
                        <CommandItem value="first">First</CommandItem>
                        <CommandItem value="second">Second</CommandItem>
                    </CommandList>
                </CommandDialog>
            `,
        });

        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        const options = document.querySelectorAll<HTMLElement>('[role="option"]');
        expect(options).toHaveLength(2);
        options[1]!.click();
        await nextTick();

        expect(wrapper.vm.selected).toBe("second");
        wrapper.unmount();
    });

    /* THE UNCONTROLLED ARM — the one the component always claimed to have and the
     * one that could not open. `CommandDialogProps extends DialogProps`, so `open`
     * / `modal` / `unmountOnHide` are bare optional booleans: Vue casts each
     * ABSENT Boolean prop to `false`, and the wholesale props spread then handed
     * those casts to `<Dialog>` as explicit values. Measured before the cure —
     * `DialogRoot` received `{open: false, modal: false, unmountOnHide: false}`,
     * `ComboboxRoot` received `open: false`, and the palette rendered ZERO
     * options while its host had asked for none of that. The two things asserted
     * here are the two halves of the fault: what reka is told, and what paints. */
    it("opens uncontrolled and hands reka no `open: false`", async () => {
        const Host = defineComponent({
            components: {
                CommandDialog,
                CommandInput,
                CommandItem,
                CommandList,
                DialogDescription,
                DialogTitle,
            },
            setup() {
                return { selected: ref("first") };
            },
            // No `open`, no `v-model:open` — only the starting value.
            template: `
                <CommandDialog v-model="selected" default-open>
                    <DialogTitle class="sr-only">Commands</DialogTitle>
                    <DialogDescription class="sr-only">Search and run a command.</DialogDescription>
                    <CommandInput />
                    <CommandList>
                        <CommandItem value="first">First</CommandItem>
                        <CommandItem value="second">Second</CommandItem>
                    </CommandList>
                </CommandDialog>
            `,
        });

        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        // The palette opened: the plate mounted and the list painted its rows.
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(2);

        // …and nothing downstream was told it is controlled. `undefined` is the
        // only value reka's passive `useVModel` reads as "nobody owns this".
        const dialogRoot = wrapper.findComponent(DialogRoot);
        expect(dialogRoot.props("open")).toBeUndefined();
        // The two reka defaults an absent-prop cast silently inverted.
        expect(dialogRoot.props("modal")).toBe(true);
        expect(dialogRoot.props("unmountOnHide")).toBe(true);

        const comboboxRoot = wrapper.findComponent(ComboboxRoot);
        expect(comboboxRoot.props("open")).toBeUndefined();
        expect(comboboxRoot.props("defaultOpen")).toBe(true);

        wrapper.unmount();
    });
});
