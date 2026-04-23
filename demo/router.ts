import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { CATEGORIES, resolveStory, firstStory } from "./stories/manifest";

const defaultTarget = firstStory();

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: { name: "story", params: defaultTarget },
    },
    {
        path: "/:category/:story",
        name: "story",
        component: () => import("./stories/StoryPage.vue"),
        props: true,
    },
    // Shallow per-category redirect to its first story.
    ...CATEGORIES.map((c) => ({
        path: `/${c.id}`,
        redirect: { name: "story", params: { category: c.id, story: c.stories[0].id } },
    })),
    {
        path: "/:pathMatch(.*)*",
        redirect: { name: "story", params: defaultTarget },
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(_to, _from, saved) {
        return saved ?? { top: 0 };
    },
});

export { resolveStory };
