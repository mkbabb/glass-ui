// D4-D′ spec probe · §7.3 item 8: the canon "one declaration" case read on the PARSED selector, not on text.
// Every rule in src/**/*.css that declares a corner is matched (happy-dom `Element.matches`, so any spelling:
// quoted, unquoted, `:is()`, `:where()`, a second sheet) against two live elements: an item in a `cell` group and
// the same item in a `pill` group. A rule that reaches the cell item and not the pill item is a shape-specific
// corner; there must be exactly one, in toggle-group/styles.css, on the field rung. Copied into a worktree's
// tests/styles/ to run; the plant is `TILE_CANON_PLANT=1`, which adds a re-spelled second declaration.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

const ROOT = join(__dirname, "../..");
function cssFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? cssFiles(join(dir, d.name)) : d.name.endsWith(".css") ? [join(dir, d.name)] : [],
    );
}
const PLANT = `.toggle-group:is([data-shape=cell]) .toggle-group__item { border-radius: var(--radius-panel); }`;

function mount(shape: "cell" | "pill"): Element {
    document.body.innerHTML = `<div class="toggle-group" data-shape="${shape}" data-size="md" data-type="single"><button class="toggle-group__item control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring" data-state="on"></button></div>`;
    return document.querySelector(".toggle-group__item")!;
}
const reaches = (el: Element, sel: string) => {
    // a pseudo-element or a state pseudo-class paints the item in some state; drop them to read the host's reach
    const host = sel.replace(/::?(before|after|hover|active|focus-visible|focus)\b(\([^)]*\))?/g, "");
    try { return el.matches(host.trim() || "*"); } catch { return false; }
};

describe("the tile corner is one declaration, read on the parsed selector", () => {
    it("exactly one rule reaches a cell item and not a pill item with a corner, on the field rung", () => {
        const sheets = cssFiles(join(ROOT, "src")).map((f) => ({ f, css: readFileSync(f, "utf8") }));
        if (process.env.TILE_CANON_PLANT) sheets.push({ f: "PLANT.css", css: PLANT });
        const hits: { f: string; sel: string; value: string }[] = [];
        for (const { f, css } of sheets) {
            postcss.parse(css).walkDecls(/^border(-(top|bottom)-(left|right))?-radius$/, (d) => {
                const rule = d.parent;
                if (!rule || rule.type !== "rule") return;
                for (const sel of (rule as postcss.Rule).selectors) {
                    const cell = reaches(mount("cell"), sel), pill = reaches(mount("pill"), sel);
                    if (cell && !pill) hits.push({ f: f.replace(ROOT + "/", ""), sel, value: d.value });
                }
            });
        }
        console.log(JSON.stringify(hits, null, 1));
        expect(hits).toHaveLength(1);
        expect(hits[0]).toMatchObject({ f: "src/components/toggle-group/styles.css", value: "var(--radius-field)" });
    });
});
