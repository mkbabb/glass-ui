import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { semanticTokens, tokenDomains } from "../../src/styles/tokens/manifest";

const sourceFiles = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
        const path = join(dir, entry.name);
        return entry.isDirectory()
            ? sourceFiles(path)
            : /\.(?:css|ts|vue)$/.test(path) ? [path] : [];
    });

const source = sourceFiles(join(process.cwd(), "src"))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
const css = sourceFiles(join(process.cwd(), "src"))
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "");

const declarations = new Map<string, Set<string>>();
for (const match of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
    const refs = declarations.get(match[1]) ?? new Set<string>();
    for (const ref of match[2].matchAll(/var\(\s*(--[\w-]+)/g)) refs.add(ref[1]);
    declarations.set(match[1], refs);
}

const publicTokens = tokenDomains.flatMap((domain) => semanticTokens[domain]);
const definedTokens = new Set([
    ...declarations.keys(),
    ...Array.from(source.matchAll(/\[(--[\w-]+):/g), (match) => match[1]),
]);

describe("semantic token graph", () => {
    it("contains no custom-property alias cycle", () => {
        const visiting = new Set<string>();
        const visited = new Set<string>();
        const cycles: string[] = [];

        const visit = (token: string, path: string[]) => {
            if (visiting.has(token)) {
                cycles.push([...path.slice(path.indexOf(token)), token].join(" -> "));
                return;
            }
            if (visited.has(token)) return;
            visiting.add(token);
            for (const ref of declarations.get(token) ?? []) {
                if (declarations.has(ref)) visit(ref, [...path, ref]);
            }
            visiting.delete(token);
            visited.add(token);
        };

        for (const token of declarations.keys()) visit(token, [token]);
        expect(cycles).toEqual([]);
    });
});
