import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { describe, expect, it } from "vitest";

import CatalogLanding from "../../demo/chassis/landing/CatalogLanding.vue";
import NotFound from "../../demo/shell/NotFound.vue";
import { CATEGORIES } from "../../demo/stories/manifest";

function testRouter() {
    return createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: "/", component: { template: "<div />" } },
            { path: "/:pathMatch(.*)*", component: NotFound },
        ],
    });
}

describe("demo landing semantics", () => {
    it("lists every manifest category from one primary heading", () => {
        const wrapper = mount(CatalogLanding, {
            global: {
                stubs: {
                    TooltipProvider: { template: "<div><slot /></div>" },
                    StoryHero: {
                        props: ["title"],
                        template: "<div><h1>{{ title }}</h1><slot /></div>",
                    },
                    SectionPreviewCard: {
                        props: ["to", "title"],
                        template: '<a :href="to">{{ title }}</a>',
                    },
                },
            },
        });

        expect(wrapper.findAll("h1")).toHaveLength(1);
        expect(wrapper.get("h1").text()).toBe("Glass UI");
        expect(wrapper.findAll("a")).toHaveLength(CATEGORIES.length);
        expect(wrapper.get('a[href="/forms"]').text()).toBe("Forms");
    });

    it("renders one descriptive 404 heading and a working recovery action", async () => {
        const router = testRouter();
        await router.push("/missing");
        await router.isReady();

        const wrapper = mount(NotFound, { global: { plugins: [router] } });

        expect(wrapper.findAll("h1")).toHaveLength(1);
        expect(wrapper.get("h1").text()).toBe("Page not found");

        await wrapper.get("button").trigger("click");
        await flushPromises();
        expect(router.currentRoute.value.path).toBe("/");
    });
});
