// BJ.W-STATIC-HYGIENE gate (A) — `gate:token-hygiene`.
//
// THE INVARIANT: every radius and every backdrop blur in `src/` resolves through the
// token ladder. A raw length in `border-radius` or in a `backdrop-filter: blur()` is a
// rung minted outside the ladder — unlintable, unretunable, and invisible to the token
// graph.
//
// This gate authored BORN-RED (BAND-GATES §Wave 3 §Acceptance) and has since FLIPPED to an
// ordinary GREEN assertion: MATERIAL W1 (radii — incl. the two segmented tab literals via
// the OPEN-1c contextual seam) and W2 (the drawer blur) repointed every shipped violation,
// so `src/` now carries no off-ladder radius or backdrop blur. The `it.fails` EXPECTED-RED
// latch and its interim residue pin are retired; the binding assertion is a plain `it` that
// reds on ANY new off-ladder literal.
//
// OPEN-6 (the allowlist) is ruled here, at wave time, by what the ladder can express:
//   1. Ladder SOURCE files (`src/styles/theme/**`, `src/styles/tokens/**`, `tokens.css`)
//      define the rungs and cannot consume them.
//   2. Any value carrying `var(` is on-ladder, including `calc()`/`max()`/`min()`/`clamp()`
//      wrappers around a rung.
//   3. Percentage radii are GEOMETRY, not rungs — `50%` (a true circle), the organic-blob
//      multi-value forms, the squircle-ish `18%`/`22%`. A ladder rung cannot express them.
//   4. Zero and the CSS-wide keywords (`inherit`, `initial`, `unset`, `revert`, `none`).
//   5. `@supports` PRELUDES — a feature probe must carry a literal; a `var()` tests nothing.
//   6. `filter: blur()` is NOT in scope. The `--glass-blur-*` ladder governs the BACKDROP
//      channel; element blur is a different axis with no rungs to bypass.
// Comments are stripped before scanning — a literal named in prose is not a declaration.

import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

// The vitest root is the repo root (`vitest.config.ts` sits there); happy-dom leaves
// `import.meta.url` non-file, so `process.cwd()` is the house idiom (token-graph.test.ts).
const REPO_ROOT = process.cwd();
const SRC = join(REPO_ROOT, "src");

// Ladder-source files: they mint the rungs, so they hold the literals by definition.
const LADDER_SOURCES = [
    join("src", "styles", "theme") + sep,
    join("src", "styles", "tokens") + sep,
    join("src", "styles", "tokens.css"),
];

const RAW_LENGTH = /(?<![\w.-])(\d*\.?\d+)(px|rem|em|ch|vh|vw|vmin|vmax|pt|cm|mm|in|pc|q)\b/i;

export interface TokenHygieneViolation {
    file: string;
    line: number;
    channel: "radius" | "backdrop-blur";
    value: string;
}

/** Strip comments and `@supports` preludes; both carry literals that are not declarations. */
const stripNonDeclarations = (text: string): string =>
    text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/@supports[^{]*\{/g, (m) => m.replace(/[^\n]/g, " "));

const isOffLadder = (value: string): boolean =>
    !value.includes("var(") && RAW_LENGTH.test(value) && !/^\s*0\s*$/.test(value);

/**
 * The scanner, exported so the self-test bite drives it on synthetic content rather than
 * on the tree — a bite that mutated `src/` would be a gate that edits what it measures.
 */
export const scanTokenHygiene = (file: string, text: string): TokenHygieneViolation[] => {
    const violations: TokenHygieneViolation[] = [];
    const lines = stripNonDeclarations(text).split("\n");

    lines.forEach((line, index) => {
        const radius = /(?:^|[;{}\s])border-(?:(?:top|bottom)-(?:left|right)-|(?:start|end)-(?:start|end)-)?radius\s*:\s*([^;}]+)/.exec(line);
        if (radius && isOffLadder(radius[1])) {
            violations.push({
                file,
                line: index + 1,
                channel: "radius",
                value: radius[1].trim(),
            });
        }

        const backdrop = /backdrop-filter\s*:\s*([^;}]+)/.exec(line);
        if (backdrop) {
            const blur = /blur\(([^)]*)\)/.exec(backdrop[1]);
            if (blur && isOffLadder(blur[1])) {
                violations.push({
                    file,
                    line: index + 1,
                    channel: "backdrop-blur",
                    value: backdrop[1].trim(),
                });
            }
        }
    });

    return violations;
};

const sourceFiles = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return sourceFiles(path);
        return /\.(?:css|vue)$/.test(path) ? [path] : [];
    });

const scanned = sourceFiles(SRC)
    .map((path) => relative(REPO_ROOT, path))
    .filter((rel) => !LADDER_SOURCES.some((exempt) => rel.startsWith(exempt)))
    .flatMap((rel) => scanTokenHygiene(rel, readFileSync(join(REPO_ROOT, rel), "utf8")));

const format = (list: TokenHygieneViolation[]): string =>
    list.map((v) => `${v.file}:${v.line} [${v.channel}] ${v.value}`).join("\n");

describe("gate:token-hygiene — radius/backdrop-blur literals off the ladder", () => {
    // ORDINARY GREEN (flipped from the born-RED `it.fails` latch once MATERIAL W1/W2 landed).
    // Reds on ANY new off-ladder literal — file-grain, never line-grain (THE ANCHOR LAW). The
    // interim residue pin (the two `segmented.css` radii, held pending OPEN-1c) is retired now
    // that the OPEN-1c contextual seam repointed both onto `var(--bouncy-slider-radius)`.
    it("src/ carries no off-ladder radius or backdrop blur", () => {
        expect(format(scanned)).toBe("");
    });

    it("self-test bite — a planted literal reds on both channels", () => {
        const planted = scanTokenHygiene(
            "planted.css",
            [
                ".a { border-radius: 999px; }",
                ".b { backdrop-filter: blur(9px) saturate(1.2); }",
                ".c { border-start-start-radius: 12px; }",
            ].join("\n"),
        );

        expect(planted.map((v) => `${v.line}:${v.channel}`)).toEqual([
            "1:radius",
            "2:backdrop-blur",
            "3:radius",
        ]);
    });

    it("self-test bite — the allowlisted forms do not red", () => {
        const clean = scanTokenHygiene(
            "clean.css",
            [
                ".a { border-radius: var(--radius-pill); }",
                ".b { border-radius: calc(var(--radius-card) - 2px); }",
                ".c { border-radius: 50%; }",
                ".d { border-radius: 48% 52% 55% 45% / 52% 48% 45% 55%; }",
                ".e { border-radius: inherit; }",
                ".f { border-radius: 0; }",
                ".g { backdrop-filter: var(--glass-blur-resting); }",
                ".h { filter: blur(0.5px); }",
                "/* border-radius: 4px in prose is not a declaration */",
                "@supports (backdrop-filter: blur(1px)) { .i { color: red; } }",
            ].join("\n"),
        );

        expect(format(clean)).toBe("");
    });
});
