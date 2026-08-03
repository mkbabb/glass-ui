import { mount } from "@vue/test-utils";
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
    it("gives every routed story one concise lede", () => {
        expect(
            CATEGORIES.flatMap((category) =>
                category.stories.filter((story) => !story.blurb),
            ),
        ).toEqual([]);
    });

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
        expect(wrapper.findAll(".optical-bench-signature")).toHaveLength(0);
        expect(wrapper.findAll('[data-testid="watercolor-swatch"]')).toHaveLength(0);
        expect(wrapper.findAll("a")).toHaveLength(CATEGORIES.length);
        expect(wrapper.get('a[href="/forms"]').text()).toBe("Forms");
        expect(wrapper.text()).not.toContain("/forms");
    });

    it("renders one descriptive 404 heading and a focusable recovery link", async () => {
        const router = testRouter();
        await router.push("/missing");
        await router.isReady();

        const host = document.createElement("div");
        document.body.append(host);
        const wrapper = mount(NotFound, {
            attachTo: host,
            global: { plugins: [router] },
        });

        expect(wrapper.findAll("h1")).toHaveLength(1);
        expect(wrapper.get("h1").text()).toBe("Page not found");
        expect(wrapper.findAll('[data-slot="card-header"]')).toHaveLength(1);

        const recovery = wrapper.get('a[href="/"]');
        const recoveryEl = recovery.element as HTMLAnchorElement;
        recoveryEl.focus();
        expect(document.activeElement).toBe(recoveryEl);

        wrapper.unmount();
        host.remove();
    });
});
