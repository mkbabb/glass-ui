// BJ.W-RAMP-RESET gate — `gate:type-hygiene` (BAND-GATES W4).
//
// THE INVARIANT: type sizing resolves through the √φ ladder, never through
// Tailwind's built-in `text-sm`/`text-xs` rungs (which are STATIC and silently
// bypass the fluid clamps), never through a raw `text-[<len>]` arbitrary, and —
// for the enumerated control-text declarations — never through a raw CSS
// font-size/letter-spacing literal that a named `--type-*` token expresses,
// and never through a `var(--text-sm)`/`var(--text-xs)` reference to a @theme
// key the ramp reset CLEARED to `initial` (a guaranteed-invalid resolution that
// falls back to inherit — the exact bypass class the `var()` channel let ship).
//
// AUTHORED BORN-RED in BAND-GATES W4, FLIPPED GREEN in the SAME CUT by
// BAND-MATERIAL W6 (`BJ.W-TYPE-CODEMOD`): the codemod migrated the utility set
// onto `text-small`/`text-micro`, the four CSS-declaration sites repoint to
// `var(--type-*)`, and `theme/bridges.css` clears the `text-sm`/`text-xs`
// namespace keys so a residual is a build-visible unknown. Because the flip is
// same-cut this ships as the STANDING GREEN regression lock (no `it.fails`
// scaffold to strip) with self-test bites proving teeth — the RULING-2 "never
// RED-at-tag" law.
//
// COUNTING METHOD (the load-bearing filter, MATERIAL W6 §Design / APOTHEOSIS
// MECH-02/D-12). The utility arm scans `.vue`/`.ts` under `src` + `demo` for the
// two collision rungs and the raw arbitrary form. A `text-sm`/`text-xs`
// substring inside a LARGER token (`var(--control-text-sm)`,
// `text-[length:var(--control-text-sm)]`) is a legitimate token reference, NOT a
// utility — the negative lookbehind `(?<![-\w])` excludes it (the exact
// inflation the bare word-boundary grep suffers). `text-[length:var(…)]` reads
// are token-legitimate and out of scope by construction (the arbitrary pattern
// requires a numeric first char). The CSS-declaration arm is scoped to the
// component stylesheet channel — raw rem/px `font-size` and the caps-tracking
// `letter-spacing: 0.1em` literal in `src/components/**/*.css` — the precise
// born-RED set (SVG-coordinate inline styles and the tokenized typography canon
// are a different channel and out of scope). The PostCSS arms inspect declaration
// values only; selectors, comments, and at-rule preludes are intentionally outside
// the census, while declarations nested inside at-rules remain visible to
// `walkDecls`. A CSS parse failure throws, so malformed input fails closed.

import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

const REPO_ROOT = process.cwd();

// ── Utility-class arm ──────────────────────────────────────────────────────

// The two static collision rungs, as a UTILITY (not a substring of a larger
// token). `\b` on the right protects `text-small`; `(?<![-\w])` on the left
// excludes `--control-text-sm` / `text-[length:var(--control-text-sm)]`.
const BANNED_UTILITY = /(?<![-\w])text-(?:sm|xs)\b/g;
// Raw-size arbitrary: `text-[10px]` / `text-[0.7rem]` / `text-[0.7em]`. The
// numeric first char excludes `text-[length:var(…)]` and `text-[color:…]`.
const RAW_ARBITRARY = /(?<![-\w])text-\[[0-9.]+(?:px|rem|em)\]/g;

export interface TypeUtilityViolation {
    file: string;
    line: number;
    value: string;
}

/** Scanner exported so the self-test bite drives it on synthetic content. */
export const scanTypeUtilities = (file: string, text: string): TypeUtilityViolation[] => {
    const violations: TypeUtilityViolation[] = [];
    text.split("\n").forEach((line, index) => {
        for (const re of [BANNED_UTILITY, RAW_ARBITRARY]) {
            re.lastIndex = 0;
            let m: RegExpExecArray | null;
            while ((m = re.exec(line)) !== null) {
                violations.push({ file, line: index + 1, value: m[0] });
            }
        }
    });
    return violations;
};

// ── CSS-declaration arm ────────────────────────────────────────────────────

const RAW_FONT_SIZE = /(?:^|[\s,(])\d*\.?\d+(?:px|rem|em)\b/i;
const CAPS_TRACKING = /(?:^|\s)0\.1em(?:\s|$)/;
const VAR_FUNCTION = /[vV][aA][rR]\(/;
// A reference to a @theme key the ramp reset cleared to `initial`. `bridges.css`
// clears `--text-sm`/`--text-xs`, so any surviving `var(--text-sm)` resolves to
// a guaranteed-invalid value → the declaration falls back to inherit. Banned
// across ALL src CSS (not just components) so a dangling reference to a cleared
// key cannot ship GREEN again — the class of bypass that stranded `.card-description`.
const CLEARED_VAR = /[vV][aA][rR]\(\s*(--text-(?:sm|xs))\b/g;

const asciiLowerCase = (value: string): string =>
    value.replace(/[A-Z]/g, (character) => character.toLowerCase());

export interface TypeDeclarationViolation {
    file: string;
    line: number;
    channel: "font-size" | "letter-spacing" | "cleared-var";
    value: string;
}

export const scanTypeDeclarations = (file: string, text: string): TypeDeclarationViolation[] => {
    const violations: TypeDeclarationViolation[] = [];
    const root = postcss.parse(text, { from: file });
    root.walkDecls((declaration) => {
        const property = asciiLowerCase(declaration.prop);
        if (
            property === "font-size" &&
            RAW_FONT_SIZE.test(declaration.value) &&
            !VAR_FUNCTION.test(declaration.value)
        ) {
            violations.push({
                file,
                line: declaration.source?.start?.line ?? 1,
                channel: "font-size",
                value: declaration.value.trim(),
            });
        }
        if (property === "letter-spacing" && CAPS_TRACKING.test(declaration.value)) {
            violations.push({
                file,
                line: declaration.source?.start?.line ?? 1,
                channel: "letter-spacing",
                value: declaration.value.trim(),
            });
        }
    });
    return violations;
};

/** Scans for references to the cleared `--text-sm`/`--text-xs` @theme keys. */
export const scanClearedVarRefs = (file: string, text: string): TypeDeclarationViolation[] => {
    const violations: TypeDeclarationViolation[] = [];
    const root = postcss.parse(text, { from: file });
    root.walkDecls((declaration) => {
        CLEARED_VAR.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = CLEARED_VAR.exec(declaration.value)) !== null) {
            violations.push({
                file,
                line: declaration.source?.start?.line ?? 1,
                channel: "cleared-var",
                value: `var(${m[1]})`,
            });
        }
    });
    return violations;
};

// ── Tree walk ──────────────────────────────────────────────────────────────

const walk = (dir: string, test: (path: string) => boolean): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return walk(path, test);
        return test(path) ? [path] : [];
    });

const read = (rel: string): string => readFileSync(join(REPO_ROOT, rel), "utf8");

const utilityFiles = ["src", "demo"].flatMap((root) =>
    walk(join(REPO_ROOT, root), (p) => /\.(?:vue|ts)$/.test(p)).map((p) => relative(REPO_ROOT, p)),
);
const utilityViolations = utilityFiles.flatMap((rel) => scanTypeUtilities(rel, read(rel)));

const componentCssFiles = walk(join(REPO_ROOT, "src", "components"), (p) => p.endsWith(".css")).map(
    (p) => relative(REPO_ROOT, p),
);
const declarationViolations = componentCssFiles.flatMap((rel) => scanTypeDeclarations(rel, read(rel)));

// The cleared-var arm scans ALL src CSS (a dangling `var(--text-sm)` can live in
// any stylesheet channel, not only components — `.card-description` proved it).
const srcCssFiles = walk(join(REPO_ROOT, "src"), (p) => p.endsWith(".css")).map((p) =>
    relative(REPO_ROOT, p),
);
const clearedVarViolations = srcCssFiles.flatMap((rel) => scanClearedVarRefs(rel, read(rel)));

const fmtUtil = (list: TypeUtilityViolation[]): string =>
    list.map((v) => `${v.file}:${v.line} ${v.value}`).join("\n");
const fmtDecl = (list: TypeDeclarationViolation[]): string =>
    list.map((v) => `${v.file}:${v.line} [${v.channel}] ${v.value}`).join("\n");

describe("gate:type-hygiene — off-ladder type utilities and declarations", () => {
    it("no `text-sm`/`text-xs` utility or raw `text-[<len>]` arbitrary in src/ + demo/", () => {
        expect(fmtUtil(utilityViolations)).toBe("");
    });

    it("no raw font-size / caps-tracking literal in src/components/**/*.css", () => {
        expect(fmtDecl(declarationViolations)).toBe("");
        expect(
            scanTypeDeclarations(
                "planted.css",
                ".a { font-size:\n 13px; }\n.b { letter-spacing:\n 0.1em; }",
            ).map((violation) => violation.channel),
        ).toEqual(["font-size", "letter-spacing"]);
        expect(
            scanTypeDeclarations(
                "clean.css",
                "/* font-size: 13px; letter-spacing: 0.1em */ .a { font-size: var(--type-caption); }",
            ),
        ).toEqual([]);
    });

    it("no `var(--text-sm)`/`var(--text-xs)` reference to a cleared @theme key in src/**/*.css", () => {
        expect(fmtDecl(clearedVarViolations)).toBe("");
        expect(
            scanClearedVarRefs(
                "planted.css",
                ".a { font-size: var(\n --text-sm); } .b { font-size: var( --text-xs ); }",
            ).map((violation) => violation.value),
        ).toEqual(["var(--text-sm)", "var(--text-xs)"]);
        expect(
            scanClearedVarRefs(
                "clean.css",
                "/* var(--text-sm) */ .a { font-size: var(--text-small); }",
            ),
        ).toEqual([]);
    });

    it("self-test bite — a planted `text-sm` in a .vue and a raw `text-[13px]` red", () => {
        const planted = scanTypeUtilities(
            "planted.vue",
            [
                `<span class="text-sm">a</span>`,
                `<span class="text-xs">b</span>`,
                `<span class="text-[13px]">c</span>`,
            ].join("\n"),
        );
        expect(planted.map((v) => v.value)).toEqual(["text-sm", "text-xs", "text-[13px]"]);
    });

    it("self-test bite — a planted raw `font-size:13px` reds on the CSS arm", () => {
        const planted = scanTypeDeclarations(
            "planted.css",
            [
                ".a { font-size: 13px; }",
                ".b { letter-spacing: 0.1em; }",
                ".c { FONT-SIZE: 14px; }",
                ".d { LETTER-SPACING: 0.1em; }",
            ].join("\n"),
        );
        expect(planted.map((v) => `${v.channel}`)).toEqual([
            "font-size",
            "letter-spacing",
            "font-size",
            "letter-spacing",
        ]);
    });

    it("self-test bite — a planted `var(--text-sm)`/`var(--text-xs)` reds on the cleared-var arm", () => {
        const planted = scanClearedVarRefs(
            "planted.css",
            [
                ".a { font-size: var(--text-sm); }",
                ".b { font-size: var( --text-xs ); }",
                ".c { font-size: var(--text-small); }", // the LADDER rung — must NOT red
                ".d { FONT-SIZE: VAR(--text-sm); }",
                ".e { FONT-SIZE: VAR(--TEXT-SM); }", // custom-property identifiers remain case-sensitive
            ].join("\n"),
        );
        expect(planted.map((v) => v.value)).toEqual([
            "var(--text-sm)",
            "var(--text-xs)",
            "var(--text-sm)",
        ]);
    });

    it("self-test bite — the on-ladder + token-ref forms do NOT red", () => {
        const utilClean = scanTypeUtilities(
            "clean.ts",
            [
                `"text-small text-micro text-caption text-body"`,
                `"[--control-pill-text:var(--control-text-sm)]"`,
                `"text-[length:var(--control-text-sm)] leading-[1.1]"`,
                `"text-base text-lg text-xl"`, // out of scope — not the collision rungs
            ].join("\n"),
        );
        expect(fmtUtil(utilClean)).toBe("");

        const declClean = scanTypeDeclarations(
            "clean.css",
            [
                ".a { font-size: var(--type-caption); }",
                ".b { letter-spacing: var(--type-tracking-caps); }",
                ".c { FONT-SIZE: VAR(--type-caption); }",
                ".d { LETTER-SPACING: VAR(--type-tracking-caps); }",
                "/* font-size: 13px in prose is not a declaration */",
            ].join("\n"),
        );
        expect(fmtDecl(declClean)).toBe("");
    });
});
