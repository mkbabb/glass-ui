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

    // O-23 L-1—the observer root is the viewport. The component's own root <div> is a
    // correct IntersectionObserver root only when a consumer makes it the scroll port;
    // under an ancestor port its box contains the sentinel and every reconnect loads
    // again until `hasMore` is false. Root null clips by every ancestor port, and
    // `scrollMargin` carries the threshold into nested ports.
    it("observes against the viewport with the threshold carried into nested scroll ports", async () => {
        const wrapper = mount(InfiniteScroll, {
            props: { hasMore: true, isLoading: false, threshold: 160 },
        });
        await nextTick();
        const observer = TestIntersectionObserver.instances.at(-1)!;

        expect(observer.options?.root ?? null).toBeNull();
        expect(observer.options?.rootMargin).toBe("0px 0px 160px 0px");
        expect(observer.options?.scrollMargin).toBe("0px 0px 160px 0px");
    });
});
