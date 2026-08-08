import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import DockSeparator from "@glass/components/dock/DockSeparator.vue";

// ─────────────────────────────────────────────────────────────────────────────
// BK #72 W-RAIL-RENAME-THEN-BUILD — the G-ONE-NAME **rail arm** (seats +0; the arm
// binds under the seat TERMINAL-ROSTER:337 already declares: "rail-vocabulary →
// G-ONE-NAME"). SEAT-BINDING.json is untouched and the register receipt is
// byte-identical across this cut.
//
// TWO halves, because the row is RENAME-**THEN**-BUILD and neither half alone is the
// wave:
//
//   §A THE STRIKE. ARCHAEOLOGY §4 N2 (E29): the owner corrected the noun ≥2× — "The
//      rail should not be a vertical dock--its a hairline that sits INSIDE the
//      horizontal or vertical dock." At HEAD the code taught the REJECTED meaning:
//      `--dock-rail-padding` was the VERTICAL dock's padding, `--dock-rail-extend-length`
//      its reach, `--dock-rail-accent-*` its selected bar, and the prose said "vertical
//      rail" outright. TR#72's stated detector is `rg -w rail
//      src/components/dock/styles` → target 0. That detector cannot see a camelCase
//      identifier (`showRail` has a word char before the `R`), so a SECOND detector is
//      stated and both are asserted — a census that misses `showRail` is the J-10 class
//      this row itself once violated.
//
//   §B THE BUILD. The hairline the owner named was a PHANTOM at HEAD: `DockSeparator`
//      stamped `data-rail-anchor` + `.dock-separator--anchor` for an `#rail` line that
//      exists in no file, and BOTH markers were read by exactly zero selectors and zero
//      code. Five builds, zero surviving components (ARCHAEOLOGY E29). The build makes
//      the anchored separator REAL: `.dock-hairline` spans the dock's CROSS EXTENT in
//      all three layouts, and the dock band's two rival hairline colours collapse onto
//      the ONE `--dock-hairline` name (that collapse IS G-ONE-NAME).
//
// Mutation bites are recorded in the row's RECORD.md §Mutations.
// ─────────────────────────────────────────────────────────────────────────────

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

/** Every file under `rel`, recursively. */
function walk(rel: string): string[] {
    const out: string[] = [];
    for (const e of readdirSync(join(process.cwd(), rel), { withFileTypes: true })) {
        const child = `${rel}/${e.name}`;
        if (e.isDirectory()) out.push(...walk(child));
        else out.push(child);
    }
    return out.sort();
}

/**
 * DETECTOR 1 — TR#72's own, stated verbatim there: word-boundary `rail`
 * (`rg -w rail <path>`). Case-sensitive; matches `rail`, `--dock-rail-padding`,
 * `rail-end`. Does NOT match `trail`/`trailing` (word char before) and does NOT match
 * `showRail` — which is why detector 2 exists.
 */
const D1 = /\brail\b/g;

/**
 * D1's CASE HARDENING. D1 is TR's detector verbatim and stays that way; the whole-word
 * noun in the other two casings (`Rail`, `RAIL`) is asserted separately in case 1 so the
 * census figure keeps its provenance while the blind spot does not survive.
 */
const D1_ANY_CASE = /\brail\b/gi;

/**
 * DETECTOR 2 — the IDENTIFIER arm TR#72's "forbidden in identifiers" clause needs.
 * Matches the noun in any casing that is not a longer lowercase word:
 *   `rail` ✓ · `--dock-rail-padding` ✓ · `railPosition` ✓ · `showRail` ✓ ·
 *   `DockRailContext` ✓ · `DOCK_RAIL_KEY` ✓ · `trail` ✗ · `trailing` ✗ · `trailArc` ✗ ·
 *   `useLeadTrail` ✗ · `TRAIL_MS` ✗
 * The third arm is the SCREAMING_CASE one: an injection key or a constant carries the
 * noun as `RAIL`, which neither of the first two arms sees.
 */
const D2 = /(?:(?<![A-Za-z])rail|Rail|(?<![A-Za-z])RAIL)(?![a-z])/g;

/** occurrences · lines · files, the three figures TR#72 states. */
function census(paths: readonly string[], re: RegExp) {
    let occ = 0;
    let lines = 0;
    const files: string[] = [];
    for (const p of paths) {
        const text = read(p);
        const hits = text.match(new RegExp(re.source, re.flags));
        if (!hits) continue;
        occ += hits.length;
        const ls = text
            .split("\n")
            .filter((l) => new RegExp(re.source).test(l)).length;
        lines += ls;
        files.push(p);
    }
    return { occ, lines, files };
}

const DOCK_STYLES = walk("src/components/dock/styles");
const DOCK_BAND = walk("src/components/dock");
const TOKEN_FILES = walk("src/styles/tokens").filter((p) => p.endsWith(".css"));

describe("G-ONE-NAME · rail arm — the rail-as-vertical-dock vocabulary is struck", () => {
    it("1. TR#72's own detector reaches 0 in src/components/dock/styles", () => {
        const c = census(DOCK_STYLES, D1);
        // The pre-cut figure re-derived at this seat was 115 occ / 103 lines / 13 files
        // (TR's ⊕⁵ pin of 114/102/13 had drifted by one in `shell.css`). Target 0.
        expect({ occ: c.occ, lines: c.lines, files: c.files.length }).toEqual({
            occ: 0,
            lines: 0,
            files: 0,
        });
        // …and the same word in the other two casings, which TR's case-sensitive
        // detector cannot see.
        expect(census(DOCK_STYLES, D1_ANY_CASE).files).toEqual([]);
    });

    it("2. the identifier detector reaches 0 across the whole dock band", () => {
        const c = census(DOCK_BAND, D2);
        expect(c.files).toEqual([]);
    });

    it("3. no `--dock-*rail*` token survives in the token layer", () => {
        const offenders = TOKEN_FILES.filter((p) => /--dock-[\w-]*rail/.test(read(p)));
        expect(offenders).toEqual([]);
    });

    it("4. G-RELAY — no file anywhere still reads a dock `rail` token, class or API", () => {
        // The token/class/attribute arm is not the whole relay: the PROP, the context
        // key and the placement class are reads too, and a consumer left on any of them
        // is the same silent no-op. `DockRail(?!-)` is the identifier position only —
        // the hyphenated PROSE form (`DockRail-chip`, one line in
        // `src/styles/glass/surfaces-pager.css`, the PAGER register RECORD §7 routes to
        // #40 W-PAGER) is a mention, not a read, and this row does not reach into
        // another lane's file to strike prose.
        const DOCK_RAIL_READ =
            /--dock-[\w-]*rail|dock-layer-rail|dock-rail-|data-rail-anchor|showRail|railPosition|DockRail(?!-)|DOCK_RAIL|rail-(?:start|end)/;
        const roots = ["src", "demo", "tests"];
        const offenders: string[] = [];
        for (const root of roots) {
            for (const p of walk(root)) {
                if (p === "tests/styles/dock-name-canon.test.ts") continue;
                if (DOCK_RAIL_READ.test(read(p))) offenders.push(p);
            }
        }
        expect(offenders).toEqual([]);
    });
});

describe("the hairline INSIDE the dock is BUILT (E29's actual referent)", () => {
    const layerGroup = read("src/components/dock/styles/layer-group.css");

    it("5. an anchored <DockSeparator> stamps the hairline; a plain one does not", () => {
        const anchored = mount(DockSeparator, { props: { anchor: true } });
        expect(anchored.classes()).toContain("dock-hairline");
        expect(anchored.attributes("data-dock-hairline")).toBe("true");

        const plain = mount(DockSeparator);
        expect(plain.classes()).not.toContain("dock-hairline");
        expect(plain.attributes("data-dock-hairline")).toBeUndefined();
        // Both are still the same separator primitive — the hairline is a REGISTER of
        // the separator, never a second component (the five-builds lesson).
        expect(plain.classes()).toContain("dock-separator");
        expect(anchored.classes()).toContain("dock-separator");
    });

    it("6. the hairline spans the CROSS EXTENT of its layout root in all three layouts", () => {
        // A row dock's hairline is a FULL-HEIGHT vertical rule (the plain separator is a
        // half-height sliver); a column dock's is a full-WIDTH horizontal rule; the grid
        // dock's already spanned and keeps doing so.
        //
        // BOTH arms root at `:is(.glass-dock, .dock-layer-group)`: the layer group is a
        // layout root in its own right everywhere else in that partial, and an arm that
        // named only `.glass-dock` made a standalone `<DockLayerGroup>` + `anchor` a
        // paint no-op. `:is()` and not `:where()` — the arms must keep their specificity
        // over the `.dock-separator` layout rules they override.
        const ROOT = String.raw`:is\(\.glass-dock, \.dock-layer-group\)`;
        const rowRule = layerGroup.match(
            new RegExp(`${ROOT}:not\\(\\.vertical\\):not\\(\\.layout-grid\\) \\.dock-hairline\\s*\\{([^}]*)\\}`),
        )?.[1];
        expect(rowRule).toBeDefined();
        expect(rowRule).toMatch(/align-self:\s*stretch/);
        expect(rowRule).toMatch(/height:\s*100%/);

        const colRule = layerGroup.match(
            new RegExp(`${ROOT}\\.vertical \\.dock-hairline\\s*\\{([^}]*)\\}`),
        )?.[1];
        expect(colRule).toBeDefined();
        expect(colRule).toMatch(/align-self:\s*stretch/);
        expect(colRule).toMatch(/width:\s*100%/);

        expect(layerGroup).toMatch(
            /\.glass-dock\.layout-grid \.dock-separator\s*\{[^}]*grid-column:\s*1 \/ -1/,
        );
    });

    it("7. ONE hairline name — `--dock-hairline` declared once, read by both painters", () => {
        const decls = TOKEN_FILES.flatMap((p) =>
            (read(p).match(/^\s*--dock-hairline\s*:/gm) ?? []).map(() => p),
        );
        // Declared exactly once in the base (light) arm; a dark-arm re-resolve is
        // allowed and is NOT a second name.
        expect(decls.length).toBeGreaterThanOrEqual(1);

        // Both hairline painters in the dock band read that ONE name: the separator /
        // hairline background, and all four of the layer-switcher's divider edges.
        const sep = layerGroup.match(/\.dock-separator\s*\{([^}]*)\}/)?.[1];
        expect(sep).toMatch(/background:\s*var\(--dock-hairline\)/);

        // EVERY 1px rule in the partial reads the one name — no rival literal, no
        // second token, on any of the four `switcher-{start,end} × {row,column}` arms.
        const rules = [
            ...layerGroup.matchAll(/border-(?:right|left|top|bottom):\s*([^;]+);/g),
        ].map((m) => m[1].replace(/\s+/g, " ").trim());
        expect(rules.length).toBe(7);
        expect(
            rules.filter((v) => v !== "none" && v !== "1px solid var(--dock-hairline)"),
        ).toEqual([]);

        // …and no rival hairline colour name survives anywhere in the dock band.
        const band = DOCK_BAND.map(read).join("\n");
        expect(band).not.toMatch(/--dock-layer-switcher-divider/);
        expect(band).not.toMatch(/var\(--surface-tint-15\)/);
    });
});
