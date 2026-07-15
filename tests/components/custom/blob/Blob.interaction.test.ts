import { mount } from "@vue/test-utils";
import { readonly, ref } from "vue";
import { beforeEach, describe, expect, it, vi } from "vitest";

const renderer = vi.hoisted(() => ({
    pause: vi.fn(),
    resume: vi.fn(),
    wake: vi.fn(),
}));

vi.mock("@glass/components/blob/composables/useMetaballRenderer", () => ({
    useMetaballRenderer: () => ({
        ...renderer,
        settled: readonly(ref(true)),
    }),
}));

import Blob from "@glass/components/blob/Blob.vue";
import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob/types";

function mountBlob(props: Record<string, unknown> = {}) {
    return mount(Blob, {
        props: {
            color: "#c98f67",
            config: BLOB_CONFIG_DEFAULTS,
            ...props,
        },
        attachTo: document.body,
    });
}

describe("Blob press surface", () => {
    beforeEach(() => vi.clearAllMocks());

    it("is decorative and listener-free by default", () => {
        const wrapper = mountBlob();

        expect(wrapper.get("canvas").attributes("aria-hidden")).toBe("true");
        expect(wrapper.find('[data-testid="goo-blob-hit"]').exists()).toBe(false);
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.attributes("role")).toBeUndefined();

        wrapper.unmount();
    });

    it("opts into one named native button for pointer and keyboard activation", async () => {
        const wrapper = mountBlob({ pressLabel: "Pulse preview" });
        const press = wrapper.get<HTMLButtonElement>('[data-testid="goo-blob-hit"]');

        expect(press.element.tagName).toBe("BUTTON");
        expect(press.attributes("type")).toBe("button");
        expect(press.attributes("aria-label")).toBe("Pulse preview");
        expect(press.attributes("role")).toBeUndefined();
        expect(press.attributes("tabindex")).toBeUndefined();

        press.element.click();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("click")).toHaveLength(1);

        wrapper.unmount();
    });

    it("keeps paused and disabled press surfaces named but inoperable", async () => {
        const wrapper = mountBlob({ pressLabel: "Pulse preview", paused: true });
        const press = wrapper.get<HTMLButtonElement>('[data-testid="goo-blob-hit"]');

        expect(press.attributes("disabled")).toBeDefined();
        press.element.click();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("click")).toBeUndefined();
        expect(renderer.pause).toHaveBeenCalledOnce();

        await wrapper.setProps({ paused: false, disabled: true });
        expect(press.attributes("disabled")).toBeDefined();
        press.element.click();
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted("click")).toBeUndefined();

        wrapper.unmount();
    });
});
