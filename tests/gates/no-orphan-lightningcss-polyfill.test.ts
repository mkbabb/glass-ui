// U/B8 N-1 (atlas REPORT-B7E §6, MO-05): dist/handmark.css carried
// `--hm-band: var(--lightningcss-light, …) var(--lightningcss-dark, …)` and no dist sheet declared
// either variable, so the band was invalid at computed-value time and the highlight painted black.
// Reads the built dist (`npm run build` first): any sheet that references a lightningcss light-dark
// polyfill variable must have a declaration of it somewhere in the shipped CSS.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST = resolve(__dirname, "../../dist");
function css(dir: string): string[] {
    return readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        return statSync(p).isDirectory() ? css(p) : p.endsWith(".css") ? [p] : [];
    });
}

describe("the shipped CSS has no orphan lightningcss polyfill variable", () => {
    it("declares every --lightningcss-light / --lightningcss-dark it references", () => {
        expect(existsSync(DIST), "build dist first").toBe(true);
        const sheets = css(DIST).map((f) => ({ f: f.slice(DIST.length + 1), s: readFileSync(f, "utf8") }));
        expect(sheets.length).toBeGreaterThan(10);
        const declared = new Set<string>();
        for (const { s } of sheets) for (const m of s.matchAll(/(--lightningcss-(?:light|dark))\s*:/g)) declared.add(m[1]);
        const orphans: string[] = [];
        for (const { f, s } of sheets)
            for (const m of s.matchAll(/var\(\s*(--lightningcss-(?:light|dark))/g))
                if (!declared.has(m[1])) orphans.push(`${f}: ${m[1]}`);
        expect(orphans).toEqual([]);
    });
});
