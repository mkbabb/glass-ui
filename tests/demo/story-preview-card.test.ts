import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SectionPreviewCard from "../../demo/chassis/landing/SectionPreviewCard.vue";
import {
    resolveCategoryTile,
    resolveStoryTile,
} from "../../demo/chassis/landing/storyTile";
import { CATEGORIES } from "../../demo/stories/manifest";

// The cards (FORM.md section 3): a live preview, then the title. No blurb, no picture.

const ROWS = CATEGORIES.flatMap((category) =>
    category.stories.map((story) => ({ category, story })),
);

const stub = {
    global: {
        stubs: {
            TransitionRouteLink: {
                props: ["to"],
                template: '<a :href="to"><slot /></a>',
            },
        },
    },
};

describe("the card's preview", () => {
    it("is the story's tile where one exists, else its stage, else none", () => {
        for (const { story } of ROWS) {
            const r = resolveStoryTile(story);
            if (story.tile || story.stage) expect(r.kind).toBe("live");
            else expect(r.kind).toBe("none");
        }
    });

    it("a section's card on `/` shows its first page's preview", () => {
        for (const category of CATEGORIES) {
            expect(resolveCategoryTile(category)).toEqual(
                resolveStoryTile(category.stories[0]!),
            );
        }
    });

    it("every stage loader matches a `<id>.stage.vue` on disk", () => {
        for (const { category, story } of ROWS) {
            const file = join(process.cwd(), `demo/stories/${category.id}/${story.id}.stage.vue`);
            expect(Boolean(story.stage), file).toBe(existsSync(file));
        }
    });

    it("the two reference pages ship a stage", () => {
        const stage = (cat: string, id: string) =>
            ROWS.find((r) => r.category.id === cat && r.story.id === id)?.story.stage;
        expect(stage("display", "buttons")).toBeTruthy();
        expect(stage("containers", "configurator")).toBeTruthy();
    });
});

describe("the card", () => {
    it("prints its title once, carries no paragraph and no image", () => {
        const wrapper = mount(SectionPreviewCard, {
            props: { to: "/forms", title: "Forms", tile: { kind: "none" } },
            ...stub,
        });
        expect(wrapper.findAll("p")).toHaveLength(0);
        expect(wrapper.findAll("img")).toHaveLength(0);
        expect(wrapper.text()).toBe("Forms");
        expect(wrapper.find("[data-card-preview]").exists()).toBe(false);
    });

    it("mounts a live preview inert and out of the accessibility tree", () => {
        const wrapper = mount(SectionPreviewCard, {
            props: {
                to: "/display",
                title: "Display",
                tile: { kind: "live", loader: async () => ({ template: "<div />" }) },
            },
            ...stub,
        });
        const preview = wrapper.get("[data-card-preview]");
        expect(preview.attributes("inert")).toBeDefined();
        expect(preview.attributes("aria-hidden")).toBe("true");
    });

    it("is rounded on the 24 px rung, with no inner well", () => {
        const src = readFileSync(
            join(process.cwd(), "demo/chassis/landing/SectionPreviewCard.vue"),
            "utf8",
        );
        expect(src).toContain("border-radius: var(--radius-3xl)");
        expect(src).not.toContain("inset 0");
    });
});
