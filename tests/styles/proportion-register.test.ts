import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// BK #68 W-TOKEN-CANON — the PROPORTION register's executable.
//
// A UNIT CASE, not a gate seat. The gate budget is exactly 60 and intake is CLOSED
// (J-4); the PROPORTION family already holds this row's seat, and this file is that
// seat's executable under the §B.5 classification law's second class. It mints NO
// `G-*` id and must never be added to `scripts/gate-register.mjs`.
//
// It proves the six ADDED tokens of PROPORTION §6 and the §1.1 space series against
// SOURCE (happy-dom runs no cascade, so a token's OUTCOME is read from its
// declaration — the radius-dialog-bind / radius-role-canon idiom), plus the three
// Φ4 ratifications this row carries.
//
// ORDINARY, NOT BORN-RED, for everything #68 lands: the tokens land in the SAME cut
// as this file, so `it.fails` would be a lie (radius-role-canon.test.ts:6 documents
// the same choice). The Φ0 born-RED condition "the six tokens 0-on-disk" is
// SATISFIED AND RETIRED by that landing. The one genuine born-RED case is L-2, at
// the bottom — held OUT of this cut by the seat's edit fence, latched via the house
// `it.fails` idiom so the deletion collects itself.
//
// Every figure carries its own derivation (J-10: no bare count). The ratios are
// COMPUTED from the parsed declarations, never restated as literals — a test that
// re-types the value it is checking proves only that the author can copy.
// ─────────────────────────────────────────────────────────────────────────────

const root = process.cwd();
const read = (rel: string): string => readFileSync(join(root, rel), "utf8");
const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

/** Every `.css` under a directory, recursively. */
const cssFiles = (dir: string): string[] =>
    readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) => {
        const rel = join(dir, entry.name);
        return entry.isDirectory() ? cssFiles(rel) : rel.endsWith(".css") ? [rel] : [];
    });

/** Value of a `--token: …;` declaration, comments stripped. First match wins. */
const decl = (css: string, token: string): string | undefined => {
    const m = strip(css).match(new RegExp(`${token}\\s*:\\s*([^;{}]+);`));
    return m ? m[1].replace(/\s+/g, " ").trim() : undefined;
};

/** The unitless scalar (or `rem` magnitude) of a declaration. */
const num = (value: string | undefined): number => Number.parseFloat(value ?? "NaN");

/** Float-safe equality — 0.16/0.08 is 1.9999999999999998 in IEEE 754. */
const close = (a: number, b: number, epsilon = 1e-9): boolean => Math.abs(a - b) < epsilon;

const PHI = (1 + Math.sqrt(5)) / 2;

// The two files the register lands in, read whole so the arms can reason about
// STRUCTURE (which block a declaration sits in), not just presence.
const colorRadius = read("src/styles/tokens/color-radius.css");
const sizing = read("src/styles/tokens/sizing.css");

// §1.1's mobile transposition splits sizing.css into two arms. The rungs are
// declared TWICE by design, so a flat declaration map would silently read the mobile
// value as the desktop one; the arms below must never share a parse.
const MOBILE_PRELUDE = "@media (max-width: 768px)";
const mobileAt = sizing.indexOf(MOBILE_PRELUDE);
const desktopArm = sizing.slice(0, mobileAt);
const mobileArm = sizing.slice(mobileAt);

// The whole token layer, for the "lands somewhere under tokens/" and "mints nothing
// extra" arms.
const tokenLayer = cssFiles("src/styles/tokens")
    .map((file) => strip(readFileSync(join(root, file), "utf8")))
    .join("\n");

const INK = { seam: 0.08, edge: 0.16, perimeter: 0.48 } as const;
const FILL = { hover: 0.05, selected: 0.12 } as const;

// §1.1: 4 · 8 · 12 · 20 · 32 · 52, named by RANK (see sizing.css for why not px and
// not ordinal). rem at a 16px root.
const SERIES = [
    ["--space-residue", 0.25, 4],
    ["--space-atom", 0.5, 8],
    ["--space-body", 0.75, 12],
    ["--space-family", 1.25, 20],
    ["--space-section", 2, 32],
    ["--space-page", 3.25, 52],
] as const;

describe("PROPORTION §6 — the six ADDED tokens", () => {
    it("lands all six under src/styles/tokens, at their register values", () => {
        // The tier-3 wall (J-6). Four lanes write marked literals against these and
        // three lane gates cannot green without them, which is why #68 is Φ4-FIRST.
        const missing = [
            ...Object.entries(INK).map(([rung, alpha]) => [`--ink-${rung}`, alpha] as const),
            ...Object.entries(FILL).map(([rung, alpha]) => [`--fill-${rung}`, alpha] as const),
        ].filter(([token, alpha]) => !close(num(decl(tokenLayer, token)), alpha));

        expect(missing, "PROPORTION §6 α scalars absent or off-register").toEqual([]);
        expect(decl(tokenLayer, "--control-label")).toBeDefined();
    });

    it("declares the five α rungs as BARE SCALARS, never pre-composed colours", () => {
        // §1.2 names ONE ink at three alphas. A colour-valued token would FORK the
        // ink — the exact failure the one-ink register exists to prevent — so each
        // declaration must be a plain <number> with no unit and no colour function.
        const forked = ["--ink-seam", "--ink-edge", "--ink-perimeter", "--fill-hover", "--fill-selected"]
            .map((token) => [token, decl(colorRadius, token) ?? ""] as const)
            .filter(([, value]) => !/^0?\.\d+$/.test(value));

        expect(forked, "α rung is not a bare <number> — the ink has forked").toEqual([]);
    });

    it("holds the §1.2 stroke ratio seam : edge : perimeter = 1 : 2 : 6, by computation", () => {
        const seam = num(decl(colorRadius, "--ink-seam"));
        const edge = num(decl(colorRadius, "--ink-edge"));
        const perimeter = num(decl(colorRadius, "--ink-perimeter"));

        expect(close(edge / seam, 2), `edge : seam = ${edge / seam}, not 2`).toBe(true);
        expect(close(perimeter / seam, 6), `perimeter : seam = ${perimeter / seam}, not 6`).toBe(true);
    });

    it("holds the §1.2 indicator mass identity — 2px @ 0.24 == the 1px perimeter", () => {
        // The indicator is a DERIVATION, not a member: the perimeter rung spread over
        // 2px. Same ink mass, twice the height, because it must be findable along a
        // 1288px run. This arm is why no seventh token is minted for it.
        const perimeter = num(decl(colorRadius, "--ink-perimeter"));
        expect(close(2 * 0.24, perimeter), `2px @ 0.24 = ${2 * 0.24}, not ${perimeter}`).toBe(true);
    });

    it("derives --control-label from --control-text at φ^(−1/4), minting no literal", () => {
        // §1.4 states the law as an INVARIANT, not a value: `control label : control
        // value = φ^(−1/4), at every viewport`. Expressed as a ratio it survives the
        // fluid clamp and --ui-scale for free; a px literal would drift out of ratio
        // at the first retune of either input.
        const value = decl(sizing, "--control-label") ?? "";
        expect(value, "--control-label must READ --control-text, not restate its value")
            .toMatch(/var\(\s*--control-text\s*\)/);

        const coefficient = num(value.match(/\*\s*([\d.]+)\s*\)/)?.[1]);
        expect(coefficient).toBe(0.886653);
        // The figure carries its own derivation, rather than sitting on disk as an
        // unexplained six-decimal constant.
        expect(
            Math.abs(coefficient - PHI ** -0.25) < 1e-5,
            `0.886653 is not φ^(−1/4) = ${PHI ** -0.25}`,
        ).toBe(true);
    });

    it("mints NO seventh token for the two derivations §6 excludes", () => {
        // §6 is "6 net". The "both" fill rung (0.05 + 0.12 = 0.16) and the 2px @ 0.24
        // indicator are arithmetic products of stated laws, so they are legal VALUES
        // and illegal NAMES.
        const family = Array.from(tokenLayer.matchAll(/^\s*(--(?:ink|fill)[a-z0-9-]*)\s*:/gm), (m) => m[1]).sort();
        expect(family).toEqual([
            "--fill-hover",
            "--fill-selected",
            "--ink-edge",
            "--ink-perimeter",
            "--ink-seam",
        ]);
    });

    it("invents NO dark-arm α — §7b item 1 is OWED, not guessed", () => {
        // Every α is a light-arm Chromium dpr1 measurement (§7b item 5: the census is
        // "a light dpr1 floor"). "dark mode across `forms` entirely" is the named owed
        // cell, routed to #10's paired capture. A dark twin authored before that
        // capture would be a value minted against no measurement, so the dark arm
        // INHERITS. This arm reds if someone fabricates one.
        const darkArm = strip(read("src/styles/tokens/dark-arm.css"));
        const fabricated = Array.from(darkArm.matchAll(/^\s*(--(?:ink|fill)[a-z0-9-]*)\s*:/gm), (m) => m[1]);
        expect(fabricated, "dark α fabricated ahead of the §7b item 1 capture").toEqual([]);
    });
});

describe("PROPORTION §1.1 — the library space series", () => {
    it("lands the six-rung series, one generator for padding AND gap", () => {
        // LAYOUT:233's own ask. Before this cut the library had NO spacing register at
        // all: the published --card-pad-*/--overlay-pad-* were declared only as
        // Tailwind arbitrary properties inside component SFCs.
        const offRegister = SERIES
            .filter(([token, rem]) => !close(num(decl(desktopArm, token)), rem))
            .map(([token]) => token);

        expect(offRegister, "space rung absent or off-series").toEqual([]);
    });

    it("holds the generator — every rung ≥1.5× its neighbour", () => {
        // 4 × Fibonacci; steps 2.00 / 1.50 / 1.667 / 1.60 / 1.625, limit φ. The ≥1.5×
        // floor is what makes no two rungs confusable at any size — and it is what
        // reds if anyone re-mints the 16 or 24 that C3 struck.
        const steps = SERIES.slice(1).map(([token], i) =>
            num(decl(desktopArm, token)) / num(decl(desktopArm, SERIES[i][0])));

        expect(steps.filter((step) => step < 1.5), `steps ${steps.join(" / ")}`).toEqual([]);
        expect(steps.every((step) => step <= 2)).toBe(true);
    });

    it("holds section : family : body = 32 : 20 : 12 = 8 : 5 : 3", () => {
        const body = num(decl(desktopArm, "--space-body"));
        const family = num(decl(desktopArm, "--space-family"));
        const section = num(decl(desktopArm, "--space-section"));

        // Reduced against the body rung, the triple must BE 8 : 5 : 3 — computed, so a
        // retune of any one rung reds it.
        expect(close(section / body, 8 / 3)).toBe(true);
        expect(close(family / body, 5 / 3)).toBe(true);
    });

    it("transposes mobile by exactly one rung — the same series, shifted", () => {
        // §1.1 / C13: at ≤768px every rung steps down exactly one. 52→32, 32→20,
        // 20→12, 12→8, 8→4, 4→4. Each mobile value is LITERALLY the desktop value of
        // the rung below, so every mobile step is a step of the generator and nothing
        // lands off-series — the ground on which C13 rejected the 0.860 scalar
        // (which puts 32→27.5, off-series).
        const shifted = SERIES.map(([token], i) => {
            const expected = num(decl(desktopArm, SERIES[Math.max(0, i - 1)][0]));
            return [token, num(decl(mobileArm, token)), expected] as const;
        }).filter(([, actual, expected]) => !close(actual, expected));

        expect(shifted, "mobile rung is not the desktop rung one below it").toEqual([]);
    });

    it("carries EXACTLY ONE width-conditional spacing declaration in src/styles", () => {
        // LAYOUT §5: "No other file may contain a width-conditional spacing." That is
        // what the RANK names buy — a component reads `--space-family` once and steps
        // down for free instead of re-deciding at its own breakpoint, which is how the
        // nine ad-hoc transposition factors got minted in the first place.
        // SCOPE IS THE TOKEN LAYER: this arm scans src/styles only. Component files
        // still carry their own width-conditional queries today (dock density's
        // 44.9375rem → RT-3/#47; the rest retire onto the rungs in #79-#88's sweep) —
        // library-wide satisfaction is those lanes' to deliver, not this arm's to claim.
        const widthConditional = cssFiles("src/styles").flatMap((file) => {
            const preludes = strip(readFileSync(join(root, file), "utf8")).matchAll(/@media([^{]*)\{/g);
            return Array.from(preludes)
                .filter(([, prelude]) => /width/.test(prelude))
                .map(([, prelude]) => `${relative(".", file)}: @media ${prelude.trim()}`);
        });

        expect(widthConditional).toEqual(["src/styles/tokens/sizing.css: @media (max-width: 768px)"]);
    });

    it("does NOT alias the demo ladder LAYOUT R3 fences off", () => {
        // R3 stands: the demo's `--sp-1…6` transposition is demo-bundle-scoped and
        // never reaches consumers. Re-homing or aliasing it into the library would be
        // the legacy-alias form the no-backwards-compat law forbids. (At this cut the
        // demo ladder is 0-on-disk in `src` AND `demo` — R3's fence is satisfied by
        // construction, and this arm keeps it that way.)
        expect(Array.from(tokenLayer.matchAll(/--sp-\d/g))).toEqual([]);
    });

    it("keeps the φ pair OFF the rank series", () => {
        // --space-phi-5/6 name the audacious chassis' own φ-continuation, not a rank.
        // They neither extend the six rungs nor take part in the transposition — so
        // they must be absent from the mobile arm.
        expect(decl(desktopArm, "--space-phi-5")).toBe("2.618rem");
        expect(decl(mobileArm, "--space-phi-5")).toBeUndefined();
        expect(decl(mobileArm, "--space-phi-6")).toBeUndefined();
    });
});

describe("#68 Φ4 ratifications", () => {
    const surface = ["src", "demo", "tests"]
        .flatMap((dir) => cssFiles(dir).map((file) => readFileSync(join(root, file), "utf8")))
        .join("\n");

    it("ratifies A-15's --glass-veil-* rename — zero --glass-bg-* remain", () => {
        // APOTHEOSIS R-11: "'bg' is the additive-cream memory; keeping the name over
        // inverted physics is the legacy-alias form the no-backwards-compat law
        // forbids." The rename landed in the W-FROST cut (4b1a9733); this row is its
        // Φ4 name wall, and this arm is the wall's executable. The A-15 arm flips
        // RED → GREEN here.
        expect(Array.from(surface.matchAll(/--glass-bg-/g))).toEqual([]);
    });

    it("records the ambient specular channel as DISCHARGED — ⊕¹⁶(3)", () => {
        // The ⊕¹⁶(3) inbound (dead ambient channel, ~20-line end-to-end deletion
        // across 4 files incl. the luminance-observer writes) was executed by W-FROST
        // at 4b1a9733. Verified, not re-opened: no CSS token AND no observer residue.
        expect(Array.from(surface.matchAll(/--glass-ambient/g))).toEqual([]);
    });

    it("ratifies the --radius-concentric RETIRE — U-25", () => {
        // 0 on disk, 0 in BK. TR#23 already records the successor law: concentric
        // pairs DERIVE by ±padding from the role rung, no token mints. Both cells now
        // agree; the retire is satisfied BY DERIVATION, which the §1.1 pairing law
        // above (`pad(role) = r(role) − 4`) is the arithmetic of.
        expect(Array.from(surface.matchAll(/--radius-concentric/g))).toEqual([]);
    });
});

describe("#68 L-2 — the --type-admin-label clean break", () => {
    // BORN-RED. `it.fails` PASSES while the deletion is outstanding and REDS the moment
    // it lands — the flip is the receipt. Do not "fix" this by relaxing the assertion.
    //
    // HELD OUT OF THIS CUT BY THE EDIT FENCE, not by judgement. Two of the three sites
    // (`src/styles/typography/{scale,semantic}.css`) and the bridge
    // (`src/styles/theme/bridges.css`) sit outside this seat's fence
    // (`src/styles/tokens/**`). Half-landing it — deleting the declaration while
    // `@utility text-admin-label` still reads it — is precisely the masking-fallback
    // class, so the whole item is ROUTED to the driver with the cut recipe banked in
    // the row record. Latched here so the deletion collects itself rather than
    // surviving as prose.
    it.fails(
        "deletes --type-admin-label at all three sites, with zero callers (atlas A-7)",
        () => {
            const sites = ["src", "demo", "tests"]
                .flatMap((dir) => cssFiles(dir).map((file) => [file, readFileSync(join(root, file), "utf8")] as const))
                .filter(([, css]) => /--type-admin-label|text-admin-label/.test(css))
                .map(([file]) => relative(".", file));

            expect(
                sites,
                "A-7: `--type-admin-label` is a 0.625rem literal OUTSIDE the φ^(1/4) generator series (PROPORTION-CATEGORIES:947) with ZERO call sites, and its two definitions collide (`@theme inline --text-admin-label` and `@utility text-admin-label` emit the same class). Three sites, one clean break, no alias: typography/scale.css (the declaration) · typography/semantic.css (the whole `@utility` block) · theme/bridges.css (the bridge line) — plus the prose mention at typography.css. `--type-micro` is UNTOUCHED (its own ruling). Flip this case from `it.fails` to `it` when the driver lands it.",
            ).toEqual([]);
        },
    );
});
