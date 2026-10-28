// U/B7b X3 — SFC component styles load with their component, not with `/styles`.
//
// Library mode folded every SFC `<style>` into one `dist/glass-ui.css`, and the build
// imported that bundle into `dist/styles/index.css`. Every consumer of
// `@mkbabb/glass-ui/styles` therefore paid for the status dot, timeline, pager-dot goo,
// progress, data table and the rest on first paint: 40,252 B decoded in the 10.2.0
// candidate, whether or not a page rendered one of them. The build now splits CSS per
// chunk and each chunk imports its own sheet, as the F5 component sheets already do.
//
// Build ACCEPTANCE: it reads `dist/`.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, posix } from "node:path";

import { describe, expect, it } from "vitest";

const DIST = join(process.cwd(), "dist");
const ENTRY = "styles/index.css";
const LAYER_ORDER = readFileSync(join(process.cwd(), "src/styles/index.css"), "utf8").match(/^@layer [^;{]+;/m)?.[0];

const strip = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

/** The `@import` closure of a dist sheet, dist-relative. */
function importClosure(entry: string): string[] {
    const seen = new Set<string>();
    const queue = [entry];
    while (queue.length) {
        const file = queue.pop() as string;
        if (seen.has(file)) continue;
        seen.add(file);
        for (const m of strip(readFileSync(join(DIST, file), "utf8")).matchAll(/@import\s+["'](\.[^"']+)["']/g)) {
            queue.push(posix.normalize(posix.join(dirname(file), m[1])));
        }
    }
    return [...seen];
}

const chunks = existsSync(DIST) ? readdirSync(DIST).filter((f) => f.endsWith(".js")) : [];
const chunkSheets = (chunk: string): string[] =>
    [...readFileSync(join(DIST, chunk), "utf8").matchAll(/^import\s+"(\.\/[^"]+\.css)";$/gm)].map((m) =>
        posix.normalize(m[1]),
    );

describe.skipIf(!existsSync(join(DIST, ENTRY)))("SFC sheets ride their chunks (U/B7b X3)", () => {
    it("keeps every scoped SFC rule out of the /styles entry closure", () => {
        const closure = importClosure(ENTRY);
        expect(closure).not.toContain("glass-ui.css");
        const scoped = closure.filter((file) => /\[data-v-[0-9a-f]{8}\]/.test(readFileSync(join(DIST, file), "utf8")));
        expect(scoped).toEqual([]);
    });

    it("has the chunk that owns each scope id import the sheet that styles it", () => {
        const sheets = readdirSync(DIST).filter((f) => f.endsWith(".css"));
        const scopeIds = new Set<string>();
        for (const sheet of sheets) {
            for (const m of readFileSync(join(DIST, sheet), "utf8").matchAll(/\[data-v-([0-9a-f]{8})\]/g)) scopeIds.add(m[1]);
        }
        expect(scopeIds.size).toBeGreaterThan(0);
        const unloaded: string[] = [];
        for (const id of scopeIds) {
            const owners = chunks.filter((chunk) => readFileSync(join(DIST, chunk), "utf8").includes(`data-v-${id}`));
            const loaded = owners.some((chunk) =>
                chunkSheets(chunk).some((sheet) => readFileSync(join(DIST, sheet), "utf8").includes(`[data-v-${id}]`)),
            );
            if (!loaded) unloaded.push(`data-v-${id} (${owners.join(", ") || "no chunk"})`);
        }
        expect(unloaded).toEqual([]);
    });

    it("opens every chunk sheet with the layer order /styles declares", () => {
        expect(LAYER_ORDER).toBeTruthy();
        const loaded = [...new Set(chunks.flatMap(chunkSheets))].filter((sheet) => !sheet.startsWith("components/"));
        expect(loaded.length).toBeGreaterThan(0);
        const bare = loaded.filter((sheet) => !readFileSync(join(DIST, sheet), "utf8").startsWith(LAYER_ORDER as string));
        expect(bare).toEqual([]);
    });
});
