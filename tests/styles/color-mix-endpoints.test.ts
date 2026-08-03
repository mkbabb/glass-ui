import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

// The seated invariant: no color-mix endpoint may itself be a color-mix. Safari 18
// drops the whole declaration on nesting. `literalNested` is the written-source arm;
// `resolvedNested` follows var() producers one graph deep for the four files the
// de-nesting cured, so a re-nested token cannot smuggle the defect back in.

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

describe("color-mix endpoint structure", () => {
    it("rejects literal nested endpoints across executable CSS and CSS Vue style blocks", () => {
        const styles = collectStyles(files(root));
        expect(styles.some(({ id }) => id.includes(".vue#style-"))).toBe(true);

        const report = analyze(styles);
        expect(report.literalNested).toEqual([]);

        for (const file of [
            join(root, "components/dock/styles/morph.css"),
            join(root, "components/drawer/styles.css"),
            join(root, "styles/glass/material.css"),
            join(root, "components/_shared/field/field-surfaces.css"),
        ])
            expect(report.resolvedNested.filter((entry) => entry.startsWith(`${file}:`))).toEqual([]);
    });
});
