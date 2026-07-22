// BJ.W-STATIC-HYGIENE gate (B) — `gate:orphan-CSS-partial`, the CSS-reachability closure.
//
// THE INVARIANT: every `.css` partial under `src/` is reachable from a published entry via the
// SOURCE GRAPH — the transitive `@import` closure of the declared CSS roots, plus the reach-gated
// `<style src=`/`import ".css"` channel. A partial reachable by no channel is dead weight that
// reads alive — the file exists, the rules are written, review sees them, and the dist ships
// nothing. That is how the chip register shipped with zero rules while every device-free oracle
// passed.
//
// SCOPE — SOURCE REACH, NOT A dist/ BYTE READ. This gate reads ZERO `dist/` bytes: it computes a
// source-graph reach approximation (`declaredCssRoots` maps dist→src and reads `src/` only;
// `publicJsReach` walks `src/` modules). dist-presence is only INFERRED from vite's always-emit
// CSS-side-effect semantics — a source-reachable partial rides into `dist/glass-ui.css` because
// vite treats bundled CSS as a side effect. That inference breaks under any `sideEffects`/
// CSS-code-split config drift, and this gate would stay GREEN through it. NOT COVERED here:
// package-OUTPUT omission — the I-12 `./styles.css`→`./dist/glass-ui.css` class where the shared
// selectors ship with ZERO rules — which source reach structurally cannot see.
//
// BOTH CHANNELS (the FABLE-COLOCATION P6 clause, reaffirmed RU-11 / RU-03-COLOCATION R5).
// An `@import`-only walker is wrong twice over: 19 references across 18 SFCs consume CSS
// via `<style src=`, and a component-dir partial referenced by neither channel sits outside
// an `src/styles/`-scoped walk entirely. So reachability is:
//   (1) the transitive `@import` closure of the DECLARED CSS entry roots, and
//   (2) a component reference — `<style src=` or a JS-side `import "./x.css"` — BUT ONLY FROM
//       an SFC/module that is itself reachable from the package's PUBLIC JS export entries.
// The roots are DERIVED from `package.json` `exports`, never hand-listed: a hand-list is a
// second source of truth that drifts, and `styles/fonts` is a real published entry (a
// separate subpath by design, not an orphan). The `exports` walk is RECURSIVE — a CSS leaf
// nested inside a conditional-object target (`{ import: "./dist/styles/x.css" }`) is a root
// too, not only a bare string value.
//
// WHY CHANNEL 2 MUST BE REACH-GATED (BJ COLO-3 / GATES W3 repair). `<style src=` and
// `import "./x.css"` only carry a partial into `dist/glass-ui.css` when their SFC/module is
// bundled — i.e. when it is transitively imported by one of the vite library entries (the same
// fail-closed entry set that mints `package.json` exports, via `libraryEntryMap()`). A partial
// whose ONLY referrer is an UNREACHABLE SFC (never exported, imported by no entry) is NOT
// bundled, so under vite's side-effect emit the rules never reach dist — yet an ungated
// channel-2 walk "rescues" it and the gate reads GREEN over a package that omits it. The reach
// gate closes that hole in the SOURCE approximation: only references from the public JS reach
// set count. (This is still a source-graph proxy for bundling, not a dist byte read — see SCOPE.)
//
// LANDED GREEN by BJ.W-CSS-CLOSURE-RESTORE (BAND-MATERIAL W7, 4442b451): the two `@import`s were
// re-homed to the glass.css closure (chip + atom after glass-capsule.css), so the orphan set
// is now empty and the binding assertion below is a STANDING regression lock — a re-orphaned
// partial reds it. That source repair is preserved intact by this gate repair.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The single-source, fail-closed public-entry map (name → absolute source path). Same leaf that
// feeds vite `libraryEntries()` and the `package.json` exports generator, so the reach root set
// can never drift from a hand-list.
import { libraryEntryMap } from "../../scripts/lib/subpath-policy.mjs";

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

const JS_EXTS = [".ts", ".tsx", ".mjs", ".js", ".vue"];

/**
 * The published CSS entry roots, derived from `package.json` `exports`. RECURSIVE over the
 * conditional-object shape: a `.css` string leaf found anywhere in the exports tree that targets
 * `./dist/styles/**` is a root, mapped back to its `src/` twin (the build copies `src/styles/**`
 * → `dist/styles/**`). `./styles.css` → `./dist/glass-ui.css` (the SFC-only bundle) is a BUILD
 * artefact with no `src/` partial, so it contributes no root and is excluded by the prefix.
 */
export const declaredCssRoots = (pkg: Record<string, unknown>): string[] => {
    const roots: string[] = [];
    const visit = (node: unknown): void => {
        if (typeof node === "string") {
            if (node.startsWith("./dist/styles/") && node.endsWith(".css"))
                roots.push(join(REPO_ROOT, node.replace("./dist/", "src/")));
            return;
        }
        if (node && typeof node === "object")
            for (const value of Object.values(node as Record<string, unknown>)) visit(value);
    };
    visit(pkg.exports ?? {});
    return roots;
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

/** Resolve a JS/TS/Vue import specifier from `fromFile` to an on-disk path (or null). */
const resolveJsImport = (fromFile: string, spec: string): string | null => {
    let base: string;
    if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
    else if (spec.startsWith("@glass/")) base = resolve(SRC, spec.slice("@glass/".length));
    else return null; // bare package specifier — not a repo module

    if (existsSync(base) && statSync(base).isFile()) return base;
    for (const ext of JS_EXTS) if (existsSync(base + ext)) return base + ext;
    if (existsSync(base) && statSync(base).isDirectory())
        for (const ext of JS_EXTS) {
            const idx = join(base, "index" + ext);
            if (existsSync(idx)) return idx;
        }
    return null;
};

/** The non-CSS JS/TS import specifiers a module (incl. a `.vue` file's script) declares. */
const jsImportSpecs = (text: string): string[] => {
    const specs: string[] = [];
    const re =
        /(?:import|export)\b[^;'"]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(text))) {
        const spec = match[1] ?? match[2] ?? match[3];
        if (spec && !spec.endsWith(".css")) specs.push(spec);
    }
    return specs;
};

/**
 * The PUBLIC JS reach set — every `.ts/.tsx/.js/.mjs/.vue` file transitively imported from the
 * fail-closed library entry map. A `<style src=`/`import "./x.css"` reference only carries a
 * partial into `dist` when its module lives in this set; a reference from outside it is a dead
 * SFC that the bundler never sees.
 */
export const publicJsReach = (
    entries: string[] = Object.values(libraryEntryMap(REPO_ROOT)),
): Set<string> => {
    const seen = new Set<string>();
    const queue = [...entries];

    while (queue.length > 0) {
        const file = queue.pop() as string;
        if (seen.has(file) || !existsSync(file)) continue;
        seen.add(file);
        if (!/\.(?:ts|tsx|mjs|js|vue)$/.test(file)) continue;

        for (const spec of jsImportSpecs(readFileSync(file, "utf8"))) {
            const resolved = resolveJsImport(file, spec);
            if (resolved) queue.push(resolved);
        }
    }

    return seen;
};

/** Channel 2, raw — the css → referrers map over a file list (`<style src=` + `import ".css"`). */
export const componentReferenceMap = (files: string[]): Map<string, string[]> => {
    const refs = new Map<string, string[]>();
    const add = (css: string, referrer: string): void => {
        const list = refs.get(css);
        if (list) list.push(referrer);
        else refs.set(css, [referrer]);
    };

    for (const file of files.filter((f) => /\.(?:vue|ts|tsx|js|mjs)$/.test(f))) {
        const text = readFileSync(file, "utf8");
        for (const match of text.matchAll(/<style[^>]*\ssrc=["']([^"']+)["']/g))
            add(resolve(dirname(file), match[1]), file);
        for (const match of text.matchAll(/import\s+["']([^"']+\.css)["']/g))
            add(resolve(dirname(file), match[1]), file);
    }

    return refs;
};

/**
 * The channel-2 rescue set, REACH-GATED: a partial is rescued only when at least one of its
 * referrers is in the public JS reach set. A partial referenced solely by unreachable SFCs is
 * NOT rescued — the fix that closes the dead-SFC hole.
 */
export const rescuedReferences = (
    refMap: Map<string, string[]>,
    reach: Set<string>,
): Set<string> =>
    new Set(
        [...refMap]
            .filter(([, referrers]) => referrers.some((r) => reach.has(r)))
            .map(([css]) => css),
    );

const pkg = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8"));
const files = walk(SRC);
const roots = declaredCssRoots(pkg);
const reach = publicJsReach();
const refMap = componentReferenceMap(files);
const reachable = new Set([...importClosure(roots), ...rescuedReferences(refMap, reach)]);

const orphans = files
    .filter((file) => file.endsWith(".css"))
    .filter((file) => !reachable.has(file))
    .map((file) => relative(REPO_ROOT, file));

describe("gate:orphan-CSS-partial — every src/ partial is reachable from a published entry via the source graph", () => {
    it("the closure is anchored — roots resolve, the walk and the JS reach set are non-trivial", () => {
        expect(roots.length).toBeGreaterThan(0);
        for (const root of roots) expect(existsSync(root)).toBe(true);
        // A walker that resolved nothing would report every partial orphaned and read as a
        // catastrophic RED that is really a broken instrument.
        expect(reachable.size).toBeGreaterThan(files.filter((f) => f.endsWith(".css")).length / 2);
        // The reach set must genuinely traverse the graph, not stall at the 67 entry barrels.
        expect(reach.size).toBeGreaterThan(200);
        expect(reach.has(join(SRC, "components", "input", "Input.vue"))).toBe(true);
        // EXCLUSION invariant — the anchor's INCLUSION checks (`reach.size > 200`, `reach.has(Input)`)
        // prove the walk reaches things; this proves it EXCLUDES things. If a future `export *`
        // barrel widened reach to the whole tree, a genuinely dead SFC would sit IN reach and the
        // reach-gate would silently stop biting while every inclusion check stayed green. Pin that
        // the reach set is a PROPER subset of all JS/Vue modules.
        const allModules = files.filter((f) => /\.(?:ts|tsx|mjs|js|vue)$/.test(f));
        expect(reach.size).toBeLessThan(allModules.length);
    });

    // BANKED PROOF for the I-1.5 recursion arm. On the REAL package.json every CSS export is a
    // bare top-level string, so the recursive walk collects exactly what a flat `Object.values()`
    // walk would — the nested-object CSS-leaf branch never fires on real data and a regression to
    // the flat form would red no gate. These synthetic manifests exercise the branch directly so
    // the required recursion has a mutation watching it: revert `declaredCssRoots` to a flat walk
    // and this test reds.
    it("declaredCssRoots recurses conditional-object CSS export leaves (and skips non-styles leaves)", () => {
        // A `.css` leaf nested inside a conditional-object target IS collected and mapped dist→src.
        const roots = declaredCssRoots({
            exports: {
                "./styles-x": { import: "./dist/styles/nested-leaf.css", types: "./x.d.ts" },
            },
        } as Record<string, unknown>);
        expect(roots).toEqual([join(REPO_ROOT, "src/styles/nested-leaf.css")]);
        // NEGATION — a nested non-CSS (`.js`) leaf, and a `.css` leaf outside `./dist/styles/`,
        // are NOT collected (only `src/styles/**` partials have a `src/` twin).
        expect(
            declaredCssRoots({
                exports: { "./x": { import: "./dist/foo.js", types: "./foo.d.ts" } },
            } as Record<string, unknown>),
        ).toEqual([]);
        expect(
            declaredCssRoots({
                exports: { "./styles.css": { import: "./dist/glass-ui.css" } },
            } as Record<string, unknown>),
        ).toEqual([]);
    });

    // STANDING GREEN (BJ.W-CSS-CLOSURE-RESTORE landed the re-home). Every src/ CSS partial is
    // reachable by a channel; a newly orphaned partial reds here — the regression lock.
    it("no src/ CSS partial is orphaned", () => {
        expect(orphans.join("\n")).toBe("");
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

    // THE DEAD-SFC BITE (BJ COLO-3 / GATES W3). WATCH-A of the acceptance pair: pointing a
    // partial's only referrer at an unreachable/unexported SFC must NOT rescue it. The ungated
    // predicate (any referrer counts) is the OLD hole — it rescues the dead partial; the
    // reach-gated predicate refuses it, so the partial falls into the orphan set and the gate
    // reds. Both arms are asserted so the flip itself is pinned, not just the endpoint.
    it("self-test bite — a partial referenced ONLY by an unreachable SFC is NOT rescued (RED)", () => {
        // The referrer must EXIST on disk so unreachability is witnessed on a real present module,
        // not trivially satisfied by a fabricated path (`publicJsReach` `continue`s on `!existsSync`,
        // so any nonexistent path is vacuously "unreachable" — that proves nothing). `useScrollScene`
        // is a genuine `src/` module that no public entry imports: present AND excluded from reach.
        const deadSfc = join(SRC, "composables", "motion", "scroll", "useScrollScene.ts");
        const deadCss = join(SRC, "components", "_shared", "field", "__dead_orphan__.css");
        expect(existsSync(deadSfc), "the referrer must genuinely exist on disk").toBe(true);
        // A present-but-unimported module is genuinely excluded by the reach algorithm.
        expect(reach.has(deadSfc), "a present-but-unimported module is genuinely excluded").toBe(
            false,
        );

        const deadMap = new Map([[deadCss, [deadSfc]]]);
        // OLD ungated logic (a referrer merely existing) is the hole — it WOULD rescue it.
        const ungated = new Set(
            [...deadMap].filter(([, refs]) => refs.length > 0).map(([css]) => css),
        );
        expect(ungated.has(deadCss), "the pre-fix hole rescues the dead partial").toBe(true);
        // NEW reach-gated logic refuses it → not rescued → orphaned → the gate reds.
        const rescued = rescuedReferences(deadMap, reach);
        expect(rescued.has(deadCss), "the reach gate refuses the dead referrer").toBe(false);
    });

    // WATCH-B of the acceptance pair: a partial referenced by a REACHABLE, EXPORTED SFC stays
    // rescued (GREEN). `field-control.css` is pulled by `<style src=` from Input.vue, itself
    // transitively reachable from the `/forms`+root entries — the reach gate must keep it.
    it("self-test bite — a reachable exported SFC keeps its partial GREEN", () => {
        const liveSfc = join(SRC, "components", "input", "Input.vue");
        const liveCss = join(SRC, "components", "_shared", "field", "field-control.css");
        expect(reach.has(liveSfc), "the exported SFC is reachable").toBe(true);
        const rescued = rescuedReferences(new Map([[liveCss, [liveSfc]]]), reach);
        expect(rescued.has(liveCss), "the reach gate rescues the live partial").toBe(true);
    });

    it("self-test bite — channel 2 rescues what channel 1 cannot reach, and carries real weight", () => {
        const closure = importClosure(roots);
        // Channel 1: a partial the declared-root @import graph pulls in transitively.
        expect(closure.has(join(SRC, "styles", "glass", "ladder.css"))).toBe(true);
        // Channel 2 must carry REAL weight. The exemplar is channel-1-unreachable yet rescued
        // by a reachable SFC — with the `<style src=` arm broken the gate would report the
        // 18-SFC false-RED set.
        const exemplar = join(SRC, "components", "_shared", "field", "field-control.css");
        expect(closure.has(exemplar), "the exemplar is genuinely channel-1-unreachable").toBe(false);
        expect(reachable.has(exemplar), "channel 2 rescues it").toBe(true);
        const rescued = rescuedReferences(refMap, reach);
        expect(rescued.size, "channel 2 rescues the <style src= corpus").toBeGreaterThan(10);
    });
});
