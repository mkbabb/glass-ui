import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

// gate:G-WK-COLORMIX-BUDGET — this file is that gate's DETECTOR SEAT (the roster's
// BUILD seat, "no nested color-mix() endpoints"). Safari 18 drops the whole declaration
// when a color-mix endpoint is itself a color-mix.
//
// SEATED, LITERAL ONLY. `literalNested` — every color-mix endpoint written as a
// color-mix in the source, across all executable CSS and CSS Vue style blocks — is 0,
// and that is the invariant this file enforces.
// KNOWN-LIVE, NOT GATED. RESOLVED nesting (a var() endpoint whose PRODUCER is a
// color-mix) ships repo-wide and is NOT gated here: 75 endpoint contexts across 23
// files at this HEAD (51 before the row-6 cure round re-expressed the dock plate as a
// rung lerp) — components/dock/styles/dock.css (24, the round's own top contributor and
// the repo's largest single site: the plate's rung lerp, 100% of the 51→75 delta),
// the ladder's plate recipe over every rung, rim.css
// (11), surfaces.css (4), shadow.css (4), and 2 in tokens/glass.css itself. It stands
// pending row-6's Safari π ruling; do not read this file's green as covering it.
// The `resolvedNested` arm below is therefore a REGRESSION FENCE on the files the
// de-nesting cured that still exist — three of the original four; `drawer/styles.css`
// left with its family at BK #39 — and `inspect()` recurses UNBOUNDED, not "one hop".

type StyleSource = { id: string; css: string };
type Call = { name: string; args: string[] };
type Report = { literalNested: string[]; resolvedNested: string[] };

const root = join(process.cwd(), "src");

const files = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        return entry.isDirectory() ? files(path) : [path];
    });

const vueStyles = (file: string, source: string): StyleSource[] =>
    Array.from(source.matchAll(/^\s*<style\b([^>]*)>([\s\S]*?)<\/style\s*>/gim)).flatMap(
        (match, index) => {
            const lang = match[1].match(/\blang\s*=\s*["']?([\w-]+)/i)?.[1].toLowerCase();
            return !lang || lang === "css" ? [{ id: `${file}#style-${index + 1}`, css: match[2] }] : [];
        },
    );

const collectStyles = (paths: readonly string[]): StyleSource[] =>
    paths.filter((file) => /\.(?:css|vue)$/.test(file)).sort().flatMap((file) => {
        const source = readFileSync(file, "utf8");
        return file.endsWith(".css") ? [{ id: file, css: source }] : vueStyles(file, source);
    });

// PostCSS owns CSS structure; this walker only balances functions and splits their arguments.
const calls = (value: string): Call[] => {
    const found: Call[] = [];
    const walk = (from: number, to: number): void => {
        for (let i = from; i < to; i += 1) {
            if (value.startsWith("/*", i)) { i = value.indexOf("*/", i + 2); if (i < 0) return; continue; }
            if (value[i] === "'" || value[i] === '"') {
                const quote = value[i];
                for (i += 1; i < to && value[i] !== quote; i += 1) if (value[i] === "\\") i += 1;
                continue;
            }
            const match = value.slice(i, to).match(/^([A-Za-z_][\w-]*)\s*\(/);
            if (!match) continue;
            const open = i + match[0].length - 1;
            let depth = 1; let part = open + 1; let close = -1;
            const args: string[] = [];
            for (let j = open + 1; j < to; j += 1) {
                if (value.startsWith("/*", j)) { j = value.indexOf("*/", j + 2); if (j < 0) break; continue; }
                if (value[j] === "'" || value[j] === '"') {
                    const quote = value[j];
                    for (j += 1; j < to && value[j] !== quote; j += 1) if (value[j] === "\\") j += 1;
                    continue;
                }
                if (value[j] === "(") depth += 1;
                else if (value[j] === ")" && --depth === 0) { args.push(value.slice(part, j).trim()); close = j; break; }
                else if (value[j] === "," && depth === 1) { args.push(value.slice(part, j).trim()); part = j + 1; }
            }
            if (close < 0) continue;
            found.push({ name: match[1].toLowerCase(), args });
            walk(open + 1, close);
            i = close;
        }
    };
    walk(0, value.length);
    return found;
};

const analyze = (sources: StyleSource[]): Report => {
    const declarations: Array<{ id: string; value: string }> = [];
    const producers = new Map<string, string[]>();
    for (const source of sources) {
        postcss.parse(source.css, { from: source.id }).walkDecls((decl) => {
            declarations.push({ id: `${source.id}:${decl.prop}`, value: decl.value });
            if (decl.prop.startsWith("--"))
                producers.set(decl.prop, [...(producers.get(decl.prop) ?? []), decl.value]);
        });
    }
    const literalNested = new Set<string>();
    const resolvedNested = new Set<string>();
    const inspect = (value: string, stack: string[], context: string, resolved: boolean): void => {
        const valueCalls = calls(value);
        if (valueCalls.some((call) => call.name === "color-mix"))
            (resolved ? resolvedNested : literalNested).add(context);
        for (const call of valueCalls.filter((candidate) => candidate.name === "var")) {
            const name = call.args[0]?.match(/^--[\w-]+$/)?.[0];
            if (!name) continue;
            if (call.args.length > 1) inspect(call.args.slice(1).join(", "), stack, `${context} fallback`, resolved);
            if (stack.includes(name)) continue;
            (producers.get(name) ?? []).forEach((candidate, index) =>
                inspect(candidate, [...stack, name], `${context} ${name}#${index + 1}`, true));
        }
    };
    for (const declaration of declarations)
        for (const mix of calls(declaration.value).filter((call) => call.name === "color-mix"))
            mix.args.slice(1, 3).forEach((endpoint, index) =>
                inspect(endpoint, [], `${declaration.id} endpoint ${index + 1}`, false));
    return { literalNested: [...literalNested], resolvedNested: [...resolvedNested] };
};

describe("gate:G-WK-COLORMIX-BUDGET — color-mix endpoint structure", () => {
    it("rejects literal nested endpoints across executable CSS and CSS Vue style blocks", () => {
        const styles = collectStyles(files(root));
        expect(styles.some(({ id }) => id.includes(".vue#style-"))).toBe(true);

        const report = analyze(styles);
        expect(report.literalNested).toEqual([]);

        // BK #39 (2026-08-06): `components/drawer/styles.css` struck from this table —
        // the file was deleted whole with the drawer family, and a per-file clause whose
        // subject does not exist filters to `[]` and passes VACUOUSLY. A deleted subject
        // is ABSENT, not green (⊕²⁵); the fence is three files now, not four.
        for (const file of [
            join(root, "components/dock/styles/morph.css"),
            join(root, "styles/glass/material.css"),
            join(root, "components/_shared/field/field-surfaces.css"),
        ])
            expect(report.resolvedNested.filter((entry) => entry.startsWith(`${file}:`))).toEqual([]);
    });
});
