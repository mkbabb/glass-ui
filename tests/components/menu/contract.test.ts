import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import {
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

afterEach(() => {
    vi.useRealTimers();
    while (mounted.length) mounted.pop()?.unmount();
});

function mountMenu(trigger: "click" | "context" = "click") {
    const Host = defineComponent({
        components: {
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
            <DropdownMenu
                :trigger="'${trigger}'"
                :open="'${trigger}' === 'click' ? open : undefined"
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
            </DropdownMenu>
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

describe("DropdownMenu contract", () => {
    it("rejects menu parts without an owning root", () => {
        expect(() => mount(DropdownMenuItem)).toThrow(
            "DropdownMenu parts must be used within DropdownMenu",
        );
    });

    it("keeps the click branch to one portaled menu and restores focus on execute", async () => {
        const wrapper = mountMenu();
        const trigger = await openClickMenu(wrapper);
        const menus = document.body.querySelectorAll(
            '[role="menu"][data-state="open"]',
        );

        expect(menus).toHaveLength(1);
        expect(
            document.body.querySelectorAll('[data-slot="menu-content"]'),
        ).toHaveLength(1);
        expect(wrapper.element.contains(menus[0]!)).toBe(false);

        (document.body.querySelector('[role="menuitem"]') as HTMLElement).click();
        await nextTick();
        expect((wrapper.vm as unknown as { executed: string[] }).executed).toEqual([
            "first",
        ]);
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        await new Promise((resolve) => setTimeout(resolve, 30));
        expect(document.activeElement).toBe(trigger.element);
    });

    it("keeps the context branch to one pointer-anchored portal", async () => {
        const wrapper = mountMenu("context");
        const trigger = wrapper.get("button");
        trigger.element.focus();
        await trigger.trigger("contextmenu", {
            button: 2,
            clientX: 40,
            clientY: 60,
        });
        await nextTick();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 30));

        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);
        expect(
            document.body.querySelectorAll('[data-slot="menu-content"]'),
        ).toHaveLength(1);

        document.body
            .querySelector<HTMLElement>('[data-slot="menu-content"]')!
            .dispatchEvent(
                new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
            );
        await nextTick();
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        await new Promise((resolve) => setTimeout(resolve, 30));
        expect(document.activeElement).toBe(trigger.element);
    });

    it("honors default and controlled open state in the click branch", async () => {
        const DefaultHost = defineComponent({
            components: {
                DropdownMenu,
                DropdownMenuContent,
                DropdownMenuItem,
                DropdownMenuTrigger,
            },
            setup() {
                return {};
            },
            template: `
                <DropdownMenu default-open>
                    <DropdownMenuTrigger as-child>
                        <button type="button">Default menu</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Default command</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            `,
        });
        const defaultWrapper = mount(DefaultHost, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(defaultWrapper);
        await nextTick();
        await nextTick();

        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);

        defaultWrapper.unmount();
        mounted.pop();

        const ControlledHost = defineComponent({
            components: {
                DropdownMenu,
                DropdownMenuContent,
                DropdownMenuItem,
                DropdownMenuTrigger,
            },
            setup() {
                return { open: ref(true) };
            },
            template: `
                <DropdownMenu v-model:open="open">
                    <DropdownMenuTrigger as-child>
                        <button type="button">Controlled menu</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Controlled command</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            `,
        });
        const controlledWrapper = mount(ControlledHost, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(controlledWrapper);
        await nextTick();
        await nextTick();

        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);

        (controlledWrapper.vm as unknown as { open: boolean }).open = false;
        await nextTick();
        await nextTick();
        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(0);

        (controlledWrapper.vm as unknown as { open: boolean }).open = true;
        await nextTick();
        await nextTick();
        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);
    });

    it("rejects synthetic context state before rendering an anchorless menu", () => {
        expect(() =>
            mount(DropdownMenu, {
                props: { trigger: "context", open: true },
            }),
        ).toThrow("Context menus open from an invocation anchor");
    });

    it.each(["click", "context"] as const)(
        "renders the default %s trigger as a non-submitting button",
        (trigger) => {
            const Host = defineComponent({
                components: { DropdownMenu, DropdownMenuTrigger },
                setup: () => ({ trigger }),
                template: `
                    <form>
                        <DropdownMenu :trigger="trigger">
                            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                        </DropdownMenu>
                    </form>
                `,
            });
            const wrapper = mount(Host);
            mounted.push(wrapper);
            expect(wrapper.get("button").attributes("type")).toBe("button");
        },
    );

    it("keeps context long-press on the native touch path", async () => {
        vi.useFakeTimers();
        const wrapper = mountMenu("context");
        const trigger = wrapper.get("button");

        await trigger.trigger("pointerdown", {
            pointerType: "touch",
            clientX: 24,
            clientY: 36,
        });
        await nextTick();
        await vi.advanceTimersByTimeAsync(700);
        await nextTick();

        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true);
        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);
    });

    it("preserves keyboard roving focus and typeahead", async () => {
        const wrapper = mountMenu();
        const trigger = wrapper.get("button");
        trigger.element.focus();
        await trigger.trigger("keydown", { key: "ArrowDown" });
        await nextTick();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 30));

        const menu = document.body.querySelector<HTMLElement>(
            '[role="menu"][data-state="open"]',
        )!;
        menu.focus();
        menu.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Home", bubbles: true }),
        );
        await nextTick();
        expect(document.activeElement?.textContent).toContain("First command");

        document.activeElement?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }),
        );
        await nextTick();
        expect(document.activeElement?.textContent).toContain("Grid");

        document.activeElement?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "m", bubbles: true }),
        );
        await nextTick();
        expect(document.activeElement?.textContent).toContain("More");
    });

    it("preserves checkbox/radio roles and rejects disabled execution", async () => {
        const wrapper = mountMenu();
        await openClickMenu(wrapper);

        const checkbox = document.body.querySelector<HTMLElement>(
            '[role="menuitemcheckbox"]',
        )!;
        checkbox.click();
        await nextTick();
        expect((wrapper.vm as unknown as { checked: boolean }).checked).toBe(true);

        const radioWrapper = mountMenu();
        await openClickMenu(radioWrapper);
        const radios = Array.from(
            document.body.querySelectorAll<HTMLElement>('[role="menuitemradio"]'),
        ).filter(
            (radio) =>
                (radio.closest('[role="menu"]') as HTMLElement | null)?.dataset
                    .state === "open",
        );
        radios[1]!.click();
        await nextTick();
        expect((radioWrapper.vm as unknown as { radio: string }).radio).toBe("two");

        const disabledWrapper = mountMenu();
        await openClickMenu(disabledWrapper);
        const disabled = Array.from(
            document.body.querySelectorAll<HTMLElement>('[role="menuitem"]'),
        ).find((item) => item.textContent?.includes("Disabled"))!;
        disabled.click();
        expect(
            (disabledWrapper.vm as unknown as { executed: string[] }).executed,
        ).toEqual([]);
    });

    it("layers one submenu portal and keeps submenu/root keyboard ownership", async () => {
        const wrapper = mountMenu();
        const trigger = await openClickMenu(wrapper);
        const subTrigger = document.body.querySelector<HTMLElement>(
            '[data-slot="menu-sub-trigger"]',
        )!;
        subTrigger.focus();
        subTrigger.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
        );
        await nextTick();
        await nextTick();

        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(2);
        expect(
            document.body.querySelectorAll('[data-slot="menu-sub-content"]'),
        ).toHaveLength(1);

        document.body
            .querySelector<HTMLElement>('[data-slot="menu-sub-content"]')!
            .dispatchEvent(
                new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
            );
        await nextTick();
        expect(
            document.body.querySelectorAll('[role="menu"][data-state="open"]'),
        ).toHaveLength(1);

        document.activeElement?.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
        );
        await nextTick();
        expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false);
        await new Promise((resolve) => setTimeout(resolve, 30));
        expect(document.activeElement).toBe(trigger.element);
    });

    it("does not publish a consumer-wrappable portal", async () => {
        const surface = await import("@glass/components/menu");
        expect(surface).not.toHaveProperty("DropdownMenuPortal");
    });
});
