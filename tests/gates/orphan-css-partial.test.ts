// BJ.W-STATIC-HYGIENE gate (B) — `gate:orphan-CSS-partial`, the CSS-reachability closure.
//
// THE INVARIANT: every `.css` partial under `src/` is reachable from a published entry.
// A partial reachable by no channel is dead weight that reads alive — the file exists, the
// rules are written, review sees them, and the dist ships nothing. That is how the chip
// register shipped with zero rules while every device-free oracle passed.
//
// BOTH CHANNELS (the FABLE-COLOCATION P6 clause, reaffirmed RU-11 / RU-03-COLOCATION R5).
// An `@import`-only walker is wrong twice over: 19 references across 18 SFCs consume CSS
// via `<style src=`, and a component-dir partial referenced by neither channel sits outside
// an `src/styles/`-scoped walk entirely. So reachability is:
//   (1) the transitive `@import` closure of the DECLARED CSS entry roots, and
//   (2) a component reference — `<style src=` or a JS-side `import "./x.css"`.
// The roots are DERIVED from `package.json` `exports`, never hand-listed: a hand-list is a
// second source of truth that drifts, and `styles/fonts` is a real published entry (a
// separate subpath by design, not an orphan).
//
// AUTHORED BORN-RED (BAND-GATES §Wave 3 §Acceptance). The fix — re-homing the two
// `@import`s — is BJ.W-CSS-CLOSURE-RESTORE (BAND-MATERIAL W7); this file authors the gate
// only and edits none of its CSS. The binding assertion carries `it.fails` (the
// EXPECTED-RED latch) so CI reads born-RED as GREEN and ROT as RED; when W7 lands the
// re-home the assertion starts passing, `it.fails` inverts, and W7 drops the marker.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// `process.cwd()` is the vitest root and the house idiom (token-graph.test.ts) — happy-dom
// leaves `import.meta.url` non-file.
const REPO_ROOT = process.cwd();
const SRC = join(REPO_ROOT, "src");

const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        return entry.isDirectory() ? walk(path) : [path];
    });

const stripComments = (text: string): string => text.replace(/\/\*[\s\S]*?\*\//g, "");

/**
 * The published CSS entry roots, derived from `package.json` `exports`. Each dist target
 * maps back to its `src/` twin — the build copies `src/styles/**` to `dist/styles/**`, and
 * `./styles.css` (the SFC-only bundle) is a BUILD artefact with no `src/` partial, so it
 * contributes no root.
 */
export const declaredCssRoots = (pkg: Record<string, unknown>): string[] => {
    const exportsMap = (pkg.exports ?? {}) as Record<string, unknown>;
    return Object.values(exportsMap)
        .map((target) => (typeof target === "string" ? target : ""))
        .filter((target) => target.startsWith("./dist/styles/") && target.endsWith(".css"))
        .map((target) => join(REPO_ROOT, target.replace("./dist/", "src/")));
};

/** Channel 1 — the transitive `@import` closure from the declared roots. */
export const importClosure = (roots: string[]): Set<string> => {
    const seen = new Set<string>();
    const queue = [...roots];

    while (queue.length > 0) {
        const file = queue.pop() as string;
        if (seen.has(file) || !existsSync(file)) continue;
        seen.add(file);

        const css = stripComments(readFileSync(file, "utf8"));
        for (const match of css.matchAll(/@import\s+(?:url\()?["']([^"']+)["']/g)) {
            const spec = match[1];
            // Bare specifiers are package imports (`tailwindcss`), not repo partials.
            if (spec.startsWith(".")) queue.push(resolve(dirname(file), spec));
        }
    }

    return seen;
};

/** Channel 2 — component references: `<style src=` and JS-side `import "./x.css"`. */
export const componentReferences = (files: string[]): Set<string> => {
    const refs = new Set<string>();

    for (const file of files.filter((f) => /\.(?:vue|ts|tsx|js|mjs)$/.test(f))) {
        const text = readFileSync(file, "utf8");
        for (const match of text.matchAll(/<style[^>]*\ssrc=["']([^"']+)["']/g))
            refs.add(resolve(dirname(file), match[1]));
        for (const match of text.matchAll(/import\s+["']([^"']+\.css)["']/g))
            refs.add(resolve(dirname(file), match[1]));
    }

    return refs;
};

const pkg = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8"));
const files = walk(SRC);
const roots = declaredCssRoots(pkg);
const reachable = new Set([...importClosure(roots), ...componentReferences(files)]);

const orphans = files
    .filter((file) => file.endsWith(".css"))
    .filter((file) => !reachable.has(file))
    .map((file) => relative(REPO_ROOT, file));

describe("gate:orphan-CSS-partial — every src/ partial is reachable by a channel", () => {
    it("the closure is anchored — the declared roots resolve and the walk is non-trivial", () => {
        expect(roots.length).toBeGreaterThan(0);
        for (const root of roots) expect(existsSync(root)).toBe(true);
        // A walker that resolved nothing would report every partial orphaned and read as a
        // catastrophic RED that is really a broken instrument.
        expect(reachable.size).toBeGreaterThan(files.filter((f) => f.endsWith(".css")).length / 2);
    });

    // EXPECTED-RED at HEAD. GREEN when BJ.W-CSS-CLOSURE-RESTORE (MATERIAL W7) re-homes the
    // glass-chip/glass-atom `@import`s; `it.fails` then inverts and W7 drops the marker.
    it.fails("EXPECTED-RED — no src/ CSS partial is orphaned", () => {
        expect(orphans.join("\n")).toBe("");
    });

    // The latch above passes on ANY non-empty set. This one keeps the teeth while it is up: a
    // NEWLY orphaned partial, or a PARTIAL re-home by MATERIAL W7, reds here.
    it("the born-RED set neither grows nor partially shrinks under the latch", () => {
        expect(orphans).toEqual([
            "src/styles/glass/glass-atom.css",
            "src/styles/glass/glass-chip.css",
        ]);
    });

    it("self-test bite — a planted orphan partial reds", () => {
        // Drive the reachability predicate on a synthetic tree rather than mutating `src/`:
        // a bite that writes into the corpus it measures is not a bite, it is a side effect.
        const plantedTree = [
            join(SRC, "styles", "index.css"),
            join(SRC, "styles", "planted-orphan.css"),
        ];
        const plantedOrphans = plantedTree.filter((file) => !reachable.has(file));

        expect(plantedOrphans.map((f) => relative(REPO_ROOT, f))).toEqual([
            "src/styles/planted-orphan.css",
        ]);
    });

    it("self-test bite — channel 2 rescues what channel 1 cannot reach", () => {
        const closure = importClosure(roots);
        // Channel 1: a partial the declared-root @import graph pulls in transitively.
        expect(closure.has(join(SRC, "styles", "glass", "ladder.css"))).toBe(true);
        // Channel 2 must carry REAL weight. Asserting that every componentReferences member
        // sits in `reachable` is true by construction and would still pass with the
        // `<style src=` arm broken — at which point the gate reports the 18-SFC false-RED set.
        const exemplar = join(SRC, "components", "_shared", "field", "field-control.css");
        expect(closure.has(exemplar), "the exemplar is genuinely channel-1-unreachable").toBe(false);
        expect(reachable.has(exemplar), "channel 2 rescues it").toBe(true);
        const rescued = [...componentReferences(files)].filter((ref) => !closure.has(ref));
        expect(rescued.length, "channel 2 rescues the <style src= corpus").toBeGreaterThan(10);
    });
});
