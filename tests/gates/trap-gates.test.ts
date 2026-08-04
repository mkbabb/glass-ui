// BJ TERMINAL-ROSTER row #9 — the B4/B5 verify clause, answered as ARMS (seats +0).
//
// Row #9's own text: "confirm the `light-dark()` inset-shadow and scoped-`:global()` trap
// gates survived the `governedInvariant` migration sweep; if unseated they re-enter as
// ARMS (+0 seats) per J-4's pattern."
//
// MEASURED at HEAD 0a0f95cc, and the answer is worse than "unseated" — neither ever had a
// standing gate. `light-dark()`+inset had exactly one narrow local assertion
// (`tests/components/ui/dialog/graded-backdrop.test.ts`, one region of one file), and
// `:global(` had nothing at all: zero hits across `tests/` and `scripts/`, with `src/`
// carrying a single mention inside a comment. Both were green BY ACCIDENT, unwatched.
//
// Both are user-recorded recurring defect classes — the `:global()` drop is logged at its
// THIRD recurrence — so both re-enter here as arms, not seats:
//   · light-dark() inset-shadow  -> arm of G-RUNG-ONLY   (MATERIAL family)
//   · scoped :global()           -> arm of G-CSS-REACH-UNION (STRUCTURE family)
// The §B.5 budget stays exactly 60. SEAT-BINDING.json records both as `arm-only` so this
// file naming its host seats can never inflate the bound count.
//
// WHY THESE TWO FAIL SILENTLY, which is the whole reason they need a detector:
//   1. An `inset` fragment anywhere inside a `light-dark()` call computes the WHOLE
//      `box-shadow` declaration to `none`. Not the fragment — the declaration. The shadow
//      simply vanishes in both modes and nothing warns.
//   2. `:global(...)` inside a `<style scoped>` block is silently DROPPED from the emitted
//      CSS. The selector never ships; the rule is dead source that reads as live.
// Neither produces a build error, a console warning, or a failing render. Only a detector
// over the source catches them, which is why "currently green" was never the same as safe.
//
// Both detectors are pure functions over content and both carry mutation bites: a planted
// violation must RED, or the arm is the hollow-gate class this tranche abrogated.

import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { parse as parseSfc } from "@vue/compiler-sfc";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

const REPO_ROOT = process.cwd();
const SRC = join(REPO_ROOT, "src");

export interface TrapViolation {
    file: string;
    line: number;
    trap: "light-dark-inset-shadow" | "scoped-global";
    value: string;
}

const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? walk(join(dir, entry.name))
            : [join(dir, entry.name)],
    );

// ── ARM 1 · the light-dark() inset-shadow trap ───────────────────────────────────────
//
// Shadow channel only: `box-shadow` itself, and any custom property whose name carries
// `shadow` (the token ladder's own rungs — `--glass-shadow-*`, `--*-shadow`). A colour
// token may legitimately use `light-dark()`; a shadow may not carry `inset` inside one.

const isShadowChannel = (prop: string): boolean =>
    prop === "box-shadow" || (prop.startsWith("--") && prop.includes("shadow"));

// Parenthesis-aware: returns the body of every `light-dark(` call in the value, so a
// nested `color-mix(..., inset)`-shaped false positive outside the call cannot count and
// an `inset` nested two levels deep inside the call still does.
const lightDarkBodies = (value: string): string[] => {
    const bodies: string[] = [];
    const needle = /light-dark\(/gi;
    let match: RegExpExecArray | null;
    while ((match = needle.exec(value))) {
        let depth = 1;
        let index = match.index + match[0].length;
        const start = index;
        while (index < value.length && depth > 0) {
            if (value[index] === "(") depth += 1;
            else if (value[index] === ")") depth -= 1;
            index += 1;
        }
        bodies.push(value.slice(start, depth === 0 ? index - 1 : value.length));
    }
    return bodies;
};

export const findLightDarkInsetShadow = (
    prop: string,
    value: string,
): boolean =>
    isShadowChannel(prop) &&
    lightDarkBodies(value).some((body) => /(^|[\s,(])inset([\s,)]|$)/i.test(body));

// ── ARM 2 · the scoped :global() drop ────────────────────────────────────────────────

export const findScopedGlobal = (
    sfcSource: string,
): { line: number; text: string }[] => {
    const { descriptor, errors } = parseSfc(sfcSource);
    // Parse failure fails the arm CLOSED rather than returning an empty census.
    if (errors.length) throw new Error(errors[0].message);
    const hits: { line: number; text: string }[] = [];
    for (const block of descriptor.styles) {
        if (!block.scoped) continue;
        block.content.split("\n").forEach((text, offset) => {
            if (text.includes(":global(")) {
                hits.push({ line: block.loc.start.line + offset, text: text.trim() });
            }
        });
    }
    return hits;
};

// ── the census over src/ ─────────────────────────────────────────────────────────────

const censusTrapViolations = (): TrapViolation[] => {
    const violations: TrapViolation[] = [];
    for (const file of walk(SRC)) {
        const rel = relative(REPO_ROOT, file);

        if (file.endsWith(".css")) {
            postcss.parse(readFileSync(file, "utf8"), { from: file }).walkDecls((decl) => {
                if (findLightDarkInsetShadow(decl.prop, decl.value)) {
                    violations.push({
                        file: rel,
                        line: decl.source?.start?.line ?? 0,
                        trap: "light-dark-inset-shadow",
                        value: `${decl.prop}: ${decl.value}`,
                    });
                }
            });
            continue;
        }

        if (!file.endsWith(".vue")) continue;
        const source = readFileSync(file, "utf8");

        for (const hit of findScopedGlobal(source)) {
            violations.push({
                file: rel,
                line: hit.line,
                trap: "scoped-global",
                value: hit.text,
            });
        }

        const { descriptor } = parseSfc(source);
        for (const block of descriptor.styles) {
            if (block.src) continue; // an external `<style src=...>` is censused as CSS
            postcss.parse(block.content, { from: file }).walkDecls((decl) => {
                if (findLightDarkInsetShadow(decl.prop, decl.value)) {
                    violations.push({
                        file: rel,
                        line: block.loc.start.line + (decl.source?.start?.line ?? 1) - 1,
                        trap: "light-dark-inset-shadow",
                        value: `${decl.prop}: ${decl.value}`,
                    });
                }
            });
        }
    }
    return violations;
};

describe("trap gates — the B4/B5 arms (G-RUNG-ONLY · G-CSS-REACH-UNION, seats +0)", () => {
    const violations = censusTrapViolations();

    it("no shadow declaration in src/ carries an `inset` fragment inside a light-dark() call", () => {
        const hits = violations.filter((v) => v.trap === "light-dark-inset-shadow");
        expect(
            hits,
            `an \`inset\` inside light-dark() computes the WHOLE box-shadow to \`none\` — split it into plain per-mode arms:\n${hits
                .map((h) => `  ${h.file}:${h.line} — ${h.value}`)
                .join("\n")}`,
        ).toEqual([]);
    });

    it("no `<style scoped>` block in src/ contains `:global(`", () => {
        const hits = violations.filter((v) => v.trap === "scoped-global");
        expect(
            hits,
            `\`:global()\` inside a scoped block is silently dropped from the emitted CSS — use a plain ancestor selector (\`.dark .x\`):\n${hits
                .map((h) => `  ${h.file}:${h.line} — ${h.value}`)
                .join("\n")}`,
        ).toEqual([]);
    });

    // ── mutation bites: an arm that cannot fail is not an arm ─────────────────────────

    it("BITE — a planted inset inside light-dark() REDs the shadow arm", () => {
        expect(
            findLightDarkInsetShadow(
                "box-shadow",
                "light-dark(inset 0 1px 0 rgb(255 255 255 / 0.1), 0 1px 0 rgb(0 0 0 / 0.4))",
            ),
        ).toBe(true);
        expect(
            findLightDarkInsetShadow(
                "--glass-shadow-floating",
                "0 1px 2px light-dark(rgb(0 0 0 / .1), inset rgb(0 0 0 / .5))",
            ),
        ).toBe(true);
        // nested two deep inside the call still counts
        expect(
            findLightDarkInsetShadow(
                "box-shadow",
                "light-dark(var(--a, inset 0 0 0 red), 0 0 0 blue)",
            ),
        ).toBe(true);
    });

    it("BITE — the shadow arm does not fire on the legal forms it must permit", () => {
        // plain per-mode arms: inset with no light-dark() at all — the CURE, never a hit
        expect(findLightDarkInsetShadow("box-shadow", "inset 0 1px 0 rgb(0 0 0 / .4)")).toBe(
            false,
        );
        // light-dark() on a shadow COLOUR with no inset — legal
        expect(
            findLightDarkInsetShadow(
                "box-shadow",
                "0 1px 2px light-dark(rgb(0 0 0 / .1), rgb(0 0 0 / .5))",
            ),
        ).toBe(false);
        // `inset` OUTSIDE the call is the plain-arm form, not the trap
        expect(
            findLightDarkInsetShadow(
                "box-shadow",
                "inset 0 1px 0 light-dark(white, black)",
            ),
        ).toBe(false);
        // a non-shadow channel may use light-dark() however it likes
        expect(findLightDarkInsetShadow("color", "light-dark(inset, black)")).toBe(false);
        // `inset` as part of a longer identifier is not the keyword
        expect(
            findLightDarkInsetShadow("box-shadow", "light-dark(var(--insetish), black)"),
        ).toBe(false);
    });

    it("BITE — a planted `:global()` in a scoped block REDs the reach arm", () => {
        const planted = [
            "<template><div /></template>",
            "<style scoped>",
            ":global(.dark) .x { color: red; }",
            "</style>",
        ].join("\n");
        expect(findScopedGlobal(planted)).toHaveLength(1);
        expect(findScopedGlobal(planted)[0].text).toContain(":global(");
    });

    it("BITE — the reach arm does not fire on an UNSCOPED block or on the cured form", () => {
        const unscoped = [
            "<template><div /></template>",
            "<style>",
            ":global(.dark) .x { color: red; }",
            "</style>",
        ].join("\n");
        expect(findScopedGlobal(unscoped)).toEqual([]);

        const cured = [
            "<template><div /></template>",
            "<style scoped>",
            ".dark .x { color: red; }",
            "</style>",
        ].join("\n");
        expect(findScopedGlobal(cured)).toEqual([]);
    });
});
