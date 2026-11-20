import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The page form (docs/tranches/BL/design/demo-site/FORM.md, section 1): a header that
// scrolls away, then the stage, the variants and the code, each from its own slot.

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const strip = (src: string): string =>
    src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");

const storyPage = strip(read("demo/chassis/page/StoryPage.vue"));
const heroSheet = strip(read("demo/chassis/hero/story-hero.css"));
const layout = strip(read("demo/chassis/layout.css"));

describe("the page form", () => {
    it("the header is marked, and it does not stick", () => {
        expect(storyPage).toContain("data-story-header");
        expect(storyPage).not.toContain("useScrollChrome");
        expect(storyPage).not.toContain("scroll-chrome");
        expect(heroSheet).not.toMatch(/position:\s*sticky/);
        expect(layout).not.toMatch(/\.story-header[^{]*\{[^}]*position:\s*sticky/);
    });

    it("the header uses no muted ink", () => {
        expect(storyPage).not.toContain("text-muted-foreground");
    });

    it("the stage, variants and code arrive through their own slots, in order", () => {
        const stage = storyPage.indexOf('<slot name="stage"');
        const variants = storyPage.indexOf('<slot name="variants"');
        const code = storyPage.indexOf('<slot name="code"');
        expect(stage).toBeGreaterThan(storyPage.indexOf("data-story-header"));
        expect(variants).toBeGreaterThan(stage);
        expect(code).toBeGreaterThan(variants);
    });

    it("the stage sizes are declared once", () => {
        expect(layout).toMatch(/\[data-story-stage="tall"\]\s*\{[^}]*block-size:\s*var\(--story-stage-tall\)/);
        expect(layout).toMatch(/\[data-story-stage="fit"\]\s*\{[^}]*min-block-size:\s*var\(--story-stage-fit-min\)/);
    });
});
