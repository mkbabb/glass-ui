// stories.smoke.spec.ts — the storybook manifest smoke gate.
//
// Asserts every Story row in `demo/stories/manifest.ts` resolves to a real SFC
// (no MissingStory placeholder) across four complementary checks:
//
//   1. structural — every category is non-empty + every story id is unique
//                   within its category (manifest hygiene).
//   2. resolver   — the carved `makeLazy` leaf (demo/stories/manifest/lazy.ts)
//                   honours its contract: a KEY MISS returns a render-null
//                   `MissingStory:<cat>/<id>` placeholder (never throws), a KEY
//                   HIT resolves the module's default export.
//   3. disk       — every row's (category, id) has a matching SFC on disk at
//                   `demo/stories/<category>/<id>.vue` — the EXACT key
//                   `makeLazy` builds. This is the device-independent "every row
//                   resolves" truth: it verifies the file the lazy resolver keys
//                   to actually exists, without leaning on Vite's glob runtime.
//   4. runtime    — every `story.component()` lazy import fires + resolves to a
//                   non-MissingStory component (import-time syntax/type errors
//                   surface here).
//
// Re-pointed at BH.B3 for the δ5 manifest-carve: the glob-resolved SFC resolver
// was carved OFF `manifest.ts` into `demo/stories/manifest/lazy.ts` (`makeLazy`),
// so this spec now exercises that carved leaf directly (check 2) beside the
// whole-manifest walk. The chassis primitives colocated to `demo/chassis/**` at
// δ3/δ4 are NOT story rows and are correctly OUTSIDE the `demo/stories/*/*.vue`
// route glob — the disk check keys only on the (category, id) route pair.

import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Component } from "vue";
import { describe, expect, it } from "vitest";
import { CATEGORIES } from "../demo/stories/manifest";
import { makeLazy } from "../demo/stories/manifest/lazy";

const HERE = dirname(fileURLToPath(import.meta.url));
const STORIES_DIR = resolve(HERE, "../demo/stories");

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

    it("makeLazy returns a MissingStory placeholder on a key miss (never throws)", async () => {
        const resolveRow = makeLazy({});
        const resolved = (await resolveRow("phantom-cat", "phantom-id")()) as {
            name?: string;
        };
        expect(resolved.name).toBe("MissingStory:phantom-cat/phantom-id");
    });

    it("makeLazy resolves a present key to its module default export", async () => {
        const marker = { name: "PresentStub" } as unknown as Component;
        const resolveRow = makeLazy({
            "./x/y.vue": () => Promise.resolve({ default: marker }),
        });
        const resolved = await resolveRow("x", "y")();
        expect(resolved).toBe(marker);
    });

    it("every row has a matching SFC on disk (the makeLazy key resolves)", () => {
        for (const cat of CATEGORIES) {
            for (const story of cat.stories) {
                // Mirrors makeLazy's key: `./${cat.id}/${story.id}.vue`.
                const file = resolve(STORIES_DIR, cat.id, `${story.id}.vue`);
                expect(
                    existsSync(file),
                    `${cat.id}/${story.id} has no SFC at demo/stories/${cat.id}/${story.id}.vue`,
                ).toBe(true);
            }
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
