import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
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
});
