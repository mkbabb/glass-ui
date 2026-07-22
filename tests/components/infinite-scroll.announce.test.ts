// InfiniteScroll loading/exhausted announce (W4-A11Y-LIVE-REGIONS, W4-A).
//
// The sentinel is aria-hidden and the loading/end states flipped silently to AT.
// A polite live region (the SortableList sr-only model) now announces the
// loading→exhausted transitions. RED at HEAD: no live region exists.

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import InfiniteScroll from "@glass/components/infinite-scroll/InfiniteScroll.vue";

const live = '[aria-live="polite"]';

describe("InfiniteScroll — loading/exhausted announce (W4-A)", () => {
    it("exposes a polite live region, silent while idle", () => {
        const w = mount(InfiniteScroll, { props: { hasMore: true, isLoading: false } });
        const region = w.find(live);
        expect(region.exists()).toBe(true);
        expect(region.text()).toBe("");
    });

    it("announces loading when isLoading flips true", async () => {
        const w = mount(InfiniteScroll, { props: { hasMore: true, isLoading: false } });
        await w.setProps({ isLoading: true });
        expect(w.find(live).text().toLowerCase()).toContain("loading");
    });

    it("announces exhaustion when the list is fully loaded", async () => {
        const w = mount(InfiniteScroll, { props: { hasMore: true, isLoading: false } });
        await w.setProps({ hasMore: false });
        expect(w.find(live).text()).not.toBe("");
        expect(w.find(live).text().toLowerCase()).not.toContain("loading");
    });
});
