import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { describe, expect, it } from "vitest";
import InfiniteScroll from "@glass/components/infinite-scroll/InfiniteScroll.vue";
import { TestIntersectionObserver } from "../setup";

describe("InfiniteScroll", () => {
    it("re-observes after loading without eagerly requesting another page", async () => {
        const wrapper = mount(InfiniteScroll, {
            props: { hasMore: true, isLoading: false },
        });
        await nextTick();
        const sentinel = wrapper.get('[aria-hidden="true"]').element;
        const first = TestIntersectionObserver.instances.at(-1)!;

        first.trigger(sentinel);
        expect(wrapper.emitted("load-more")).toHaveLength(1);
        expect(first.unobserve).toHaveBeenCalledWith(sentinel);

        await wrapper.setProps({ isLoading: true });
        await wrapper.setProps({ isLoading: false });
        await nextTick();

        const reconnected = TestIntersectionObserver.instances.at(-1)!;
        expect(reconnected).not.toBe(first);
        expect(reconnected.observe).toHaveBeenCalledWith(sentinel);
        expect(wrapper.emitted("load-more")).toHaveLength(1);

        reconnected.trigger(sentinel);
        expect(wrapper.emitted("load-more")).toHaveLength(2);
    });
});
