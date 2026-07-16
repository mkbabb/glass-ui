import type { Component } from "vue";
import { describe, expect, it } from "vitest";

import { makeLazy } from "../../demo/stories/manifest/lazy";

describe("story resolver", () => {
    it("returns the selected module's default export", async () => {
        const marker = { name: "PresentStub" } as unknown as Component;
        const resolveStory = makeLazy({
            "./x/y.vue": () => Promise.resolve({ default: marker }),
        });

        await expect(resolveStory("x", "y")()).resolves.toBe(marker);
    });

    it("rejects a missing manifest key immediately", () => {
        expect(() => makeLazy({})("phantom", "story")).toThrowError(
            "Missing story module: phantom/story",
        );
    });
});
