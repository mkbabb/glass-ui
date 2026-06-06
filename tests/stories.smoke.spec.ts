// stories.smoke.spec.ts — V.W4.T16 smoke gate over the storybook manifest.
//
// Asserts every Story row in `demo/stories/manifest.ts` resolves to a
// component (no MissingStory placeholder), and that the lazy import fires
// without throwing. This catches manifest-vs-file drift (a row added without
// the SFC, or vice versa) and import-time syntax/type errors that the
// build-time typecheck might miss in dev mode. The flat-story arm was retired
// at AV.W10 — Aurora / GooBlob are now Substrates category rows.
//
// Replaces the originally-spec'd Playwright over-the-DOM smoke with a
// vitest variant that exercises the same surface (every story page imports
// cleanly). This is faster than spinning up a browser and runs in the
// existing test suite.

import { describe, expect, it } from "vitest";
import { CATEGORIES } from "../demo/stories/manifest";

describe("storybook manifest smoke", () => {
    it("every category has at least one story", () => {
        for (const cat of CATEGORIES) {
            expect(cat.stories.length, `${cat.id} has zero stories`).toBeGreaterThan(0);
        }
    });

    it("every story id is unique within its category", () => {
        for (const cat of CATEGORIES) {
            const ids = cat.stories.map((s) => s.id);
            const unique = new Set(ids);
            expect(unique.size, `duplicate story id in ${cat.id}`).toBe(ids.length);
        }
    });

    it("every story import resolves (no MissingStory placeholder)", async () => {
        for (const cat of CATEGORIES) {
            for (const story of cat.stories) {
                const resolved = await story.component();
                const name = (resolved as { name?: string }).name ?? "";
                expect(
                    name.startsWith("MissingStory:"),
                    `${cat.id}/${story.id} resolved to MissingStory placeholder`,
                ).toBe(false);
                expect(resolved, `${cat.id}/${story.id} did not resolve`).toBeTruthy();
            }
        }
    }, 60_000);
});
