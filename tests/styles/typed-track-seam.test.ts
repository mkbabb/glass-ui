import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress";
import { Slider } from "@glass/components/slider";

// vitest runs from the repo root; resolve source/dist/package paths from there.
const ROOT = process.cwd();

/* BJ.W4-TYPEDSEAM — born-RED census gates that bite the exact f9b9d16e defects
   the W4-TRACK-ADJUDICATION-C2 rejected. These are the CHEAP contract/census
   predicates the adjudication §7 routes to standing tests (engine pixels +
   installed-tarball fixtures remain retained evidence / routed arms). Each `it`
   below was watched going RED against the rejected bytes before the cut landed:
     · restore `--track-bg` anywhere         -> §3.1 collision gate RED
     · restore `.value-mark(s)` selectors     -> §2.1 generic-DOM gate RED
     · re-route one shared property           -> §3.2 typed-split gate RED
     · re-add `.progress-rail { --glass-...: }`-> §3.2 inheritance gate RED
     · feed a gradient to the Progress color   -> §3.2 color-grammar gate RED
     · repoint `./styles.css` -> glass-ui.css  -> §4.1 export gate RED
     · drop/reorder a manifest import          -> §4.1 manifest gate RED */

const src = (rel: string) => readFileSync(resolve(ROOT, "src", rel), "utf8");

const W4_STYLE_SOURCES = [
    "styles/glass/track-well.css",
    "styles/glass/value-marks.css",
    "components/slider/Slider.vue",
    "components/progress/Progress.vue",
];

describe("W4 typed-seam — generic `--track-bg` is absent (§3.1)", () => {
    it.each(W4_STYLE_SOURCES)("has no `--track-bg` token in %s", (rel) => {
        expect(src(rel)).not.toMatch(/--track-bg/);
    });

    it("keeps only a muted fallback background on the shared well (no shared paint axis)", () => {
        const wellCss = src("styles/glass/track-well.css");
        expect(wellCss).toMatch(/background:\s*var\(--muted-medium\)\s*;/);
        // no shared public background custom-property is re-minted on the well
        expect(wellCss).not.toMatch(/--glass-track-well-bg/);
    });
});

describe("W4 typed-seam — generic mark selectors are renamed (§2.1)", () => {
    it("value-marks register emits ONLY the glass-namespaced selectors", () => {
        const css = src("styles/glass/value-marks.css");
        expect(css).toMatch(/\.glass-value-marks\b/);
        expect(css).toMatch(/\.glass-value-mark\b/);
        // no un-namespaced generic selector survives (word-boundary excludes the glass- form)
        expect(css).not.toMatch(/(?<!glass-)\bvalue-marks?\s*[.,{[]/);
    });

    it("Slider + Progress templates emit ONLY the glass-namespaced mark classes", () => {
        for (const rel of ["components/slider/Slider.vue", "components/progress/Progress.vue"]) {
            const vue = src(rel);
            expect(vue).toMatch(/class="glass-value-marks"/);
            expect(vue).toMatch(/class="glass-value-mark"/);
            expect(vue).not.toMatch(/class="value-marks?"/);
        }
    });
});

describe("W4 typed-seam — the two typed public inputs, split by grammar (§3.2)", () => {
    it("Slider `.slider-track` reads --glass-slider-track-background (standard + spectrum)", () => {
        const vue = src("components/slider/Slider.vue");
        expect(vue).toMatch(
            /background:\s*var\(--glass-slider-track-background,\s*var\(--muted-medium\)\)/,
        );
        expect(vue).toMatch(
            /background:\s*var\(--glass-slider-track-background,\s*var\(--secondary\)\)/,
        );
        expect(vue).not.toMatch(/--glass-progress-track-color/);
    });

    it("Progress reads --glass-progress-track-color and never assigns it locally", () => {
        const vue = src("components/progress/Progress.vue");
        // determinate rail background reads the typed color with the warm fallback
        expect(vue).toMatch(
            /background:\s*var\(--glass-progress-track-color,\s*var\(--progress-track-on-glass\)\)/,
        );
        // NO local declaration masking an inherited ancestor override (a `:` assignment)
        expect(vue).not.toMatch(/--glass-progress-track-color\s*:/);
        expect(vue).not.toMatch(/--glass-slider-track-background/);
    });

    it("the Progress color property is never fed a gradient (color grammar only)", () => {
        const vue = src("components/progress/Progress.vue");
        // a gradient written INTO the typed color property is the rejected overload;
        // the property may only ever be a var() READ, so no `...track-color: linear-gradient`
        expect(vue).not.toMatch(/--glass-progress-track-color[^;]*(linear|radial|conic)-gradient/);
    });
});

describe("W4 typed-seam — the component-only export is completed (§4.1)", () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));

    it("`./styles.css` points at the generated component manifest, not the bare SFC bundle", () => {
        expect(pkg.exports["./styles.css"]).toBe("./dist/component-styles.css");
        expect(pkg.exports["./styles.css"]).not.toBe("./dist/glass-ui.css");
    });

    it("canonical `./styles` is unchanged and non-duplicated", () => {
        expect(pkg.exports["./styles"]).toBe("./dist/styles/index.css");
    });

    it("the generated manifest folds the two W4 partials before the SFC bundle, in order", () => {
        const manifest = resolve(ROOT, "dist/component-styles.css");
        if (!existsSync(manifest)) {
            // dist is a build artifact; the ordered-import invariant is asserted only
            // when a build is present. The generator itself is fail-closed on missing
            // targets, and the installed-tarball fixture is the routed §4.2 arm.
            return;
        }
        const body = readFileSync(manifest, "utf8");
        const order = [...body.matchAll(/@import\s+"([^"]+)"/g)].map((m) => m[1]);
        expect(order).toEqual([
            "./styles/glass/track-well.css",
            "./styles/glass/value-marks.css",
            "./glass-ui.css",
        ]);
    });
});

describe("W4 typed-seam — runtime DOM census (mounted components)", () => {
    it("mounted Slider emits glass-namespaced marks and no generic ones", () => {
        const wrapper = mount(Slider, {
            props: { modelValue: [40], max: 100, marks: [25, 50, 75], "aria-label": "L" },
        });
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
        expect(wrapper.find(".value-mark").exists()).toBe(false);
        expect(wrapper.find(".value-marks").exists()).toBe(false);
    });

    it("mounted Progress rail carries no inline --track-bg (no local paint knob)", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 40, marks: [25, 50, 75] },
        });
        const rail = wrapper.get(".progress-rail");
        expect(rail.attributes("style") ?? "").not.toMatch(/--track-bg/);
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
    });
});
