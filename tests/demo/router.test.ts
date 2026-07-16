import { describe, expect, it } from "vitest";

import { router } from "../../demo/router";

describe("demo route hierarchy", () => {
    it("routes the root to the catalog landing", () => {
        const route = router.resolve("/");

        expect(route.name).toBe("home");
        expect(route.redirectedFrom).toBeUndefined();
    });

    it("preserves canonical category and story routes", () => {
        expect(router.resolve("/forms").name).toBe("category:forms");
        expect(router.resolve("/forms/inputs").name).toBe("story:forms:inputs");
        expect(router.resolve("/data/data-table").name).toBe(
            "story:data:data-table",
        );
    });

    it.each([
        "/forms/label",
        "/compositions/hero",
        "/does-not-exist",
    ])("routes %s to the semantic 404", (path) => {
        const route = router.resolve(path);

        expect(route.name).toBe("not-found");
        expect(route.redirectedFrom).toBeUndefined();
    });
});
