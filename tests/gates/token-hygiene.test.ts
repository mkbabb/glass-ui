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
// PostCSS scans declaration values only: selectors, comments, and at-rule preludes are not
// declarations, while declarations nested inside at-rules remain in `walkDecls`. CSS or Vue
// SFC parse failures throw and therefore fail the gate closed rather than returning an empty census.
// One SURFACE is out of scope as a ruled cut: an SFC contributes its `<style>` blocks only, so a
// template inline `style="…"` literal is invisible here — disclosed in full at `cssSources` below.

import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse as parseSfc } from "@vue/compiler-sfc";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { VAR_FUNCTION, asciiLowerCase } from "../utils/cssSyntax";

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
const BLUR_FUNCTION = /blur\(([^)]*)\)/gi;

export interface TokenHygieneViolation {
    file: string;
    line: number;
    channel: "radius" | "backdrop-blur";
    value: string;
}

const isOffLadder = (value: string): boolean =>
    !VAR_FUNCTION.test(value) && RAW_LENGTH.test(value) && !/^\s*0\s*$/.test(value);

const radiusProperty = (property: string): boolean =>
    property === "border-radius" ||
    /^border-(?:(?:top|bottom)-(?:left|right)|(?:start|end)-(?:start|end))-radius$/.test(property);

/**
 * DISCLOSED NARROWING — an SFC contributes its `<style>` blocks ONLY.
 *
 * The scanner became a PostCSS declaration walk to stop grepping lines; PostCSS needs a
 * stylesheet, and the only stylesheets an SFC declares are `descriptor.styles`. So one
 * surface the earlier full-text line scanner did reach is now INVISIBLE to this gate: a
 * raw radius or backdrop blur written into a TEMPLATE inline `style="…"` attribute (or
 * assembled into one by a `:style` binding, which was never scannable in either shape).
 * `src/` carries no such literal today, so nothing is being waved through — but the rule
 * no longer covers that channel, and a future inline `style="border-radius: 12px"` would
 * ship GREEN. Curing it means parsing template attribute values as declaration lists (a
 * second, differently-shaped parse); it is a ruled cut, not an oversight.
 *
 * Everything else stays in scope: declarations nested inside at-rules are reached by
 * `walkDecls`, and selectors, comments, and at-rule preludes are deliberately out (per
 * OPEN-6 rule 5 above).
 */
const cssSources = (file: string, text: string): Array<{ css: string; lineOffset: number }> => {
    if (!file.endsWith(".vue")) return [{ css: text, lineOffset: 0 }];
    const parsed = parseSfc(text, { filename: file });
    if (parsed.errors.length > 0) throw new Error(parsed.errors.join("\n"));
    return parsed.descriptor.styles.map((style) => ({
        css: style.content,
        lineOffset: style.loc.start.line - 1,
    }));
};

/**
 * The scanner, exported so the self-test bite drives it on synthetic content rather than
 * on the tree — a bite that mutated `src/` would be a gate that edits what it measures.
 */
export const scanTokenHygiene = (file: string, text: string): TokenHygieneViolation[] => {
    const violations: TokenHygieneViolation[] = [];
    for (const { css, lineOffset } of cssSources(file, text)) {
        const root = postcss.parse(css, { from: file });
        root.walkDecls((declaration) => {
            const property = asciiLowerCase(declaration.prop);
            if (radiusProperty(property) && isOffLadder(declaration.value)) {
                violations.push({
                    file,
                    line: lineOffset + (declaration.source?.start?.line ?? 1),
                    channel: "radius",
                    value: declaration.value.trim(),
                });
            }
            if (!/(?:^|-)backdrop-filter$/.test(property)) return;
            BLUR_FUNCTION.lastIndex = 0;
            let blur: RegExpExecArray | null;
            while ((blur = BLUR_FUNCTION.exec(declaration.value)) !== null) {
                if (!isOffLadder(blur[1])) continue;
                violations.push({
                    file,
                    line: lineOffset + (declaration.source?.start?.line ?? 1),
                    channel: "backdrop-blur",
                    value: declaration.value.trim(),
                });
            }
        });
    }

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
        const multiline = scanTokenHygiene(
            "planted.css",
            ".a { border-radius:\n 999px; }\n.b { backdrop-filter:\n blur(9px); }",
        );
        expect(multiline.map((violation) => violation.channel)).toEqual([
            "radius",
            "backdrop-blur",
        ]);
        expect(
            scanTokenHygiene(
                "planted.vue",
                `<template><div /></template><style>.a { border-radius:\n 13px; }</style>`,
            ).map((violation) => violation.channel),
        ).toEqual(["radius"]);
        expect(
            scanTokenHygiene(
                "clean.css",
                "/* border-radius: 9px */ @supports (backdrop-filter: blur(9px)) { .a { border-radius: var(--radius-card); } }",
            ),
        ).toEqual([]);
    });

    it("self-test bite — a planted literal reds on both channels", () => {
        const planted = scanTokenHygiene(
            "planted.css",
            [
                ".a { border-radius: 999px; }",
                ".b { backdrop-filter: blur(9px) saturate(1.2); }",
                ".c { border-start-start-radius: 12px; }",
                ".d { BORDER-RADIUS: 23px; }",
                ".e { BACKDROP-FILTER: BLUR(7px); }",
            ].join("\n"),
        );

        expect(planted.map((v) => `${v.line}:${v.channel}`)).toEqual([
            "1:radius",
            "2:backdrop-blur",
            "3:radius",
            "4:radius",
            "5:backdrop-blur",
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
                ".j { BORDER-RADIUS: VAR(--radius-card); }",
                ".k { BACKDROP-FILTER: VAR(--glass-blur-resting); }",
                "/* border-radius: 4px in prose is not a declaration */",
                "@supports (backdrop-filter: blur(1px)) { .i { color: red; } }",
            ].join("\n"),
        );

        expect(format(clean)).toBe("");

        const repeated = scanTokenHygiene(
            "repeated.css",
            ".a { backdrop-filter: blur(var(--glass-blur-resting)) BLUR(0.1EM) blur(7px); }",
        );
        expect(repeated).toHaveLength(2);
        expect(repeated.map(({ file, line, value }) => [file, line, value])).toEqual([
            [
                "repeated.css",
                1,
                "blur(var(--glass-blur-resting)) BLUR(0.1EM) blur(7px)",
            ],
            [
                "repeated.css",
                1,
                "blur(var(--glass-blur-resting)) BLUR(0.1EM) blur(7px)",
            ],
        ]);

        expect(
            scanTokenHygiene(
                "zero.css",
                ".a { backdrop-filter: blur(var(--glass-blur-resting)) blur(0); }",
            ),
        ).toEqual([]);
    });
});
