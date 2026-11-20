// U/B8r I-2 and I-3, the two dock rows atlas found on its figure dock (REPORT-B8 §6.1).
//
// I-2: a dock control scaled to 1.1 on hover (`--scale-hover-dock`), so atlas's
// "Table view" toggle deformed under the pointer in Chromium, Firefox and WebKit. A
// hover answers with fill and gleam, never with size (atlas MO-09; the owner's order of
// 2026-10-19).
//
// I-3: a collapsed horizontal dock was always drawn as `--radius-circle` (50%). A dock
// whose `#persistent` control sits beside the summary is two cells wide, so 50% drew an
// oval lozenge over 40 px (atlas F-20). A stadium dock takes half its cross extent there,
// a capsule; a finite shape keeps a 16 px bar corner (`--radius-pill`).
//
// jsdom has no cascade, so these are source detectors on comment-stripped CSS. The
// engine half is atlas's `PlateDock.browser.spec.ts` (computed `scale` under hover and
// the collapsed dock's used radius, in three engines). Both arms fail on c3b73337a.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const decomment = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

function cssFiles(dir: string): string[] {
    return readdirSync(join(process.cwd(), dir), { withFileTypes: true, recursive: true })
        .filter((e) => e.isFile() && e.name.endsWith(".css"))
        .map((e) => join(e.parentPath ?? (e as unknown as { path: string }).path, e.name).slice(process.cwd().length + 1));
}

/** Every `…:hover… { … }` block whose body declares `scale` or `transform`. */
function hoverScales(css: string): string[] {
    const out: string[] = [];
    for (const m of decomment(css).matchAll(/([^{};]*:hover[^{]*)\{([^{}]*)\}/g))
        if (/(^|[\s;])(scale|transform)\s*:/.test(m[2])) out.push(m[1].trim());
    return out;
}

describe("U/B8r I-2: no dock control scales on hover", () => {
    it("no dock style rule scales under :hover", () => {
        const hits = cssFiles("src/components/dock/styles").flatMap((f) =>
            hoverScales(read(f)).map((sel) => `${f}: ${sel}`),
        );
        expect(hits).toEqual([]);
    });

    it("the dock hover-scale token is deleted, with no reader left", () => {
        expect(decomment(read("src/styles/tokens/scale-paper.css"))).not.toMatch(/--scale-hover-dock\s*:/);
        for (const f of cssFiles("src"))
            expect(decomment(read(f)), f).not.toMatch(/var\(--scale-hover-dock\)/);
    });
});

describe("U/B8r I-3: the two-cell collapsed dock is not drawn as a circle", () => {
    const morph = decomment(read("src/components/dock/styles/morph.css"));
    const run = decomment(read("src/components/dock/styles/run.css"));

    it("the circle stays for the square collapsed dock of a finite shape", () => {
        expect(morph).toMatch(
            // W-I.8 R-1 (RU-9), restated: the rest corner is keyed on the posture class alone;
            // the carrier reads it after the class changes and writes the plate in travel.
            /\.glass-dock\.collapsed:not\(\.vertical\):not\(\.shape-pill\)\s*\{\s*border-radius:\s*var\(--radius-circle\);/,
        );
    });

    it("a finite-shape collapsed dock with a persistent control beside a summary keeps the bar corner", () => {
        expect(morph).toMatch(
            // W-I.8 R-1 (RU-9), restated: keyed on the posture class alone; the 16 px bar
            // corner is 6dc977fe2's (`--radius-pill`).
            /\.glass-dock\.collapsed:not\(\.vertical\):not\(\.shape-pill\):has\(\.dock-persistent\):has\(\s*\.dock-layer--summary:not\(:empty\)\s*\)\s*\{\s*border-radius:\s*var\(--radius-pill\);/,
        );
    });

    it("the stadium's corner is half its cross extent in every posture: a circle on one cell, a capsule on two", () => {
        // W-I.8 R-1 (RU-13), restated: a pill rests at half its cross extent at any height, at
        // the dock's radius token, the stadium by default; a host's `--radius-dock: 1rem` is
        // the bar corner in every posture (6dc977fe2), and the carrier bounds a travel by it.
        expect(run).toMatch(/\.glass-dock\.shape-pill\s*\{\s*border-radius:\s*var\(--radius-dock\);/);
        expect(run).toMatch(/--dock-cap-rest:\s*min\(var\(--radius-dock\), calc\(var\(--dock-cross\) \/ 2\)\)/);
        // W-I.8 RU-35, restated: the cross extent is the density tokens' (the first paint is
        // already a stadium); `--dock-plate-cross-px` is an output the carrier writes on the
        // root, read by no rule of glass.
        expect(run).toMatch(/--dock-cross:\s*calc\(var\(--dock-layer-height\) \+ 2 \* var\(--dock-padding-block\)\);/);
        expect(run).toMatch(/\.glass-dock\.vertical\s*\{\s*--dock-cross:\s*calc\(var\(--dock-control-size\) \+ 2 \* var\(--dock-padding-inline\)\);/);
        expect(run).not.toMatch(/var\(\s*--dock-plate-cross-px/);
        // W-I.8 R-1 (RU-13), restated: mid-travel nothing is scaled, so no counter-scaled
        // corner exists; the carrier writes half the plate's painted cross extent.
        expect(run).not.toMatch(/--dock-size-scale/);
    });
});
