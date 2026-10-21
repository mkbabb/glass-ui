import { readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { componentSheets } from "../../vite.component-sheets";
import { collectStyleClosure } from "../../vite.style-fold";

/* atlas U/B7 F5 — per-component sheets leave the `/styles` entry.

   A consumer's entry sheet is `@import "@mkbabb/glass-ui/styles"`. Before this
   change the entry carried the Configurator, MusicStaff, Metric, Deck, Carousel
   and SortableList rules on every page whether or not the component rendered
   (about 30 KB decoded of a 354 KB consumer entry). Each of those components now
   imports its own sheet from script, and the library build keeps that import
   external so the consumer loads it with the component's chunk. */

const ROOT = process.cwd();
const SRC = resolve(ROOT, "src");
const strip = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, "");

const SHEETS: Record<string, string[]> = {
    "components/configurator/styles.css": [
        "components/configurator/Configurator.vue",
        "components/configurator/ConfiguratorLayer.vue",
        "components/configurator/ConfiguratorRow.vue",
    ],
    "components/music-staff/styles.css": ["components/music-staff/MusicStaff.vue"],
    "components/metric/styles.css": [
        "components/metric/Metric.vue",
        "components/metric/MetricRow.vue",
        "components/metric/MetricStack.vue",
    ],
    "components/deck/styles/index.css": [
        "components/deck/DeckStage.vue",
        "components/deck/DeckSlide.vue",
    ],
    "components/carousel/styles.css": [
        "components/carousel/CarouselContent.vue",
        "components/carousel/CarouselItem.vue",
    ],
    "components/sortable-list/styles.css": [
        "components/sortable-list/SortableList.vue",
        "components/sortable-list/SortableItem.vue",
        "components/sortable-list/SortableHandle.vue",
    ],
};

/** The `@import` closure of the `/styles` entry, src-relative. */
function entryClosure(): Set<string> {
    const seen = new Set<string>();
    const queue = [resolve(SRC, "styles/index.css")];
    while (queue.length) {
        const file = queue.pop() as string;
        if (seen.has(file)) continue;
        seen.add(file);
        for (const m of strip(readFileSync(file, "utf8")).matchAll(/@import\s+["'](\.[^"']+)["']/g)) {
            queue.push(resolve(dirname(file), m[1]));
        }
    }
    return new Set([...seen].map((f) => relative(SRC, f)));
}

describe("per-component sheets (atlas U/B7 F5)", () => {
    it("keeps every per-component sheet out of the /styles entry closure", () => {
        const closure = entryClosure();
        for (const sheet of Object.keys(SHEETS)) {
            expect(closure.has(sheet), `${sheet} is still in styles/index.css`).toBe(false);
        }
        // the partials a sheet pulls in leave with it
        for (const partial of ["stage.css", "turn.css", "capture.css", "reveal.css"]) {
            expect(closure.has(`components/deck/styles/${partial}`)).toBe(false);
        }
    });

    it("has each owning component import its sheet from script", () => {
        for (const [sheet, owners] of Object.entries(SHEETS)) {
            for (const owner of owners) {
                const source = readFileSync(resolve(SRC, owner), "utf8");
                const spec = relative(dirname(resolve(SRC, owner)), resolve(SRC, sheet));
                expect(source, `${owner} does not import ${sheet}`).toContain(`import "./${spec}";`);
                expect(source, `${owner} still carries a <style src> lane`).not.toMatch(/<style\b[^>]*\bsrc=/);
            }
        }
    });

    it("publishes each script-imported sheet as its own dist file", () => {
        const closure = collectStyleClosure(ROOT);
        const published = new Set([...closure.copySources].map((f) => relative(SRC, f)));
        for (const sheet of Object.keys(SHEETS)) {
            expect(published.has(sheet), `${sheet} is not copied to dist`).toBe(true);
        }
        for (const partial of ["stage.css", "turn.css", "capture.css", "reveal.css"]) {
            expect(published.has(`components/deck/styles/${partial}`)).toBe(true);
        }
    });

    describe("the build plugin", () => {
        const plugin = componentSheets() as unknown as {
            configResolved: (c: { root: string }) => void;
            resolveId: (s: string, i?: string) => { id: string; external: boolean } | null;
            renderChunk: (code: string) => { code: string } | null;
        };
        plugin.configResolved({ root: ROOT });
        const owner = resolve(SRC, "components/music-staff/MusicStaff.vue");

        it("keeps a script import of a component sheet external", () => {
            const out = plugin.resolveId("./styles.css", owner);
            expect(out?.external).toBe(true);
            const rendered = plugin.renderChunk(`import "${out?.id}";`)?.code;
            expect(rendered).toBe('import "./components/music-staff/styles.css";');
        });

        it("resolves against a script sub-request importer", () => {
            const out = plugin.resolveId("./styles.css", `${owner}?vue&type=script&setup=true&lang.ts`);
            expect(plugin.renderChunk(`import "${out?.id}";`)?.code).toBe(
                'import "./components/music-staff/styles.css";',
            );
        });

        it("leaves Vue style blocks and non-component sheets to the SFC bundle", () => {
            const checkbox = resolve(SRC, "components/checkbox/Checkbox.vue");
            expect(plugin.resolveId("./styles.css?vue&type=style&index=0&src=true&lang.css", checkbox)).toBeNull();
            expect(plugin.resolveId("./tokens.css", resolve(SRC, "styles/index.css"))).toBeNull();
            expect(plugin.resolveId("tw-animate-css", owner)).toBeNull();
        });
    });
});
