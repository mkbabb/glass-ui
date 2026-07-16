import { afterEach, describe, expect, it } from "vitest";
import { router, shellFieldActive } from "../../demo/router";
import { CATEGORIES } from "../../demo/stories/manifest";

describe("demo route field ownership", () => {
    afterEach(async () => {
        await router.push("/");
    });

    it("keeps one story-owned field across DockStage route navigation", async () => {
        await router.push("/dock/overview");
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);
        expect(shellFieldActive.value).toBe(false);

        await router.push("/dock/layers");
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);
        expect(shellFieldActive.value).toBe(false);
    });

    it("lets the Aurora studio exclusively own its route field", async () => {
        const aurora = CATEGORIES.find(({ id }) => id === "substrates")?.stories.find(
            ({ id }) => id === "aurora",
        );
        expect(aurora?.background).toBe("paper");

        await router.push("/substrates/aurora");
        expect(router.currentRoute.value.meta.focal).toBe(true);
        expect(router.currentRoute.value.meta.suppressesShellField).toBe(true);
        expect(shellFieldActive.value).toBe(false);
    });
});
