// BJ.W-BOOT-DIET gate — `gate:boot-graph`.
//
// THE INVARIANT: the demo's EAGER boot graph carries only what first paint needs. A
// surface that is hidden at first paint (the configurator Sheet) or deferred past it
// (the shell GL field) must sit behind a dynamic-import seam, and the config path that
// feeds the shell field must not re-drag the component barrel it reads defaults from.
//
// Two arms, both measured — never asserted from prose:
//   SOURCE arm — `AppShell.vue` reaches Aurora/PresetEditor through
//     `defineAsyncComponent`, not a top-level static `import`; `aurora-hero.ts` reads
//     `DEFAULT_AURORA_CONFIG` from the leaf that defines it, not the
//     `@glass/components/aurora` barrel (whose first line re-exports `Aurora.vue`, so a
//     barrel import statically drags the component into any chunk that touches config).
//   BUILD arm — the built `dist-demo/index.html` stays under a modulepreload-count and
//     an eager-JS-byte ceiling.
//
// OPEN-P0 (ruled): the BUILD arm reads a FRESHLY BUILT `dist-demo/`, never a committed
// snapshot — a snapshot goes stale silently and greens over a regressed import graph.
// EXISTENCE IS NOT FRESHNESS: the arm asserts the measured `dist-demo/index.html` is
// NEWER than every source it is built from, because no runner path (`npx vitest run`,
// `iter-test`, `iter-test-watch`, an IDE runner) is obliged to have rebuilt it. The demo
// build runs in the CI test job (`ci.yml`, `release.yml`), not as an `npm test` hook —
// coupling the LIBRARY publish to the DEMO building is a different gate than this one.
// An absent `dist-demo/` FAILS LOUD with the build command rather than skipping: a skip
// is a measurement that silently did not run.
//
// Each arm's detector is a pure function over content, exercised below by a mutation
// bite (a planted static import; a planted barrel import; a planted oversized manifest;
// an UNPARSED manifest) so the gate proves it can fail. The unparsed-manifest bite is
// the one that matters most: a regex parser that finds nothing returns zero, and zero
// passes every ceiling — the hollow-gate class this band exists to cure.
//
// CENSUS COST (BAND-GATES §Wave 1 §Design KEEP bullet; counting method §Acceptance
// OPEN-4): this gate is ONE reserved newcomer but FOURTEEN line-anchored `it(` blocks —
// 5 source arm, 3 build arm, 6 self-test bites. BAND-GATES W1 re-bases the ≤60
// arithmetic against the MEASURED `tests/gates/**` total, not the per-file roster count.
// This seat has no standing to move the pin (formation/stability/TERMINAL-ROUTINGS.md
// §R-6).

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The vitest root is the repo root (`vitest.config.ts` sits there); happy-dom leaves
// `import.meta.url` non-file, so `process.cwd()` is the house idiom.
const REPO_ROOT = process.cwd();
const APP_SHELL = join(REPO_ROOT, "demo", "shell", "AppShell.vue");
const AURORA_HERO = join(REPO_ROOT, "demo", "chassis", "hero", "aurora-hero.ts");
const DIST_DEMO = join(REPO_ROOT, "dist-demo");

// The components that must not be reachable by a top-level static import from the
// always-mounted shell. Aurora carries the WebGL runtime and both shader sets; the
// PresetEditor carries the reka dropdown/select/tooltip/floating stack behind a Sheet
// that only the dock gear or the `,` shortcut opens.
const DEFERRED_SHELL_COMPONENTS = ["Aurora", "PresetEditor"] as const;

// The barrel re-exports `Aurora.vue` on its first line, so any static import from this
// specifier pulls the component even when only a plain-object default was wanted.
const AURORA_BARREL = "@glass/components/aurora";

// The configurator barrel re-exports `PresetEditor.vue` on its first line, exactly like
// the aurora barrel: any EAGER shell module importing the barrel re-drags the Sheet and
// its reka stack into the boot graph and undoes the async boundary. Leaf imports only.
// These are the shell modules that are eager by construction — `AppShell.vue` mounts
// both docks statically, so all three are in the boot graph on every route.
const EAGER_SHELL_MODULES = [
    "demo/shell/AppShell.vue",
    "demo/shell/SidebarDock.vue",
    "demo/shell/BottomDock.vue",
] as const;

// OPEN-P4 — the ceilings, set from the MEASURED post-diet build (56 modulepreloads +
// 1 entry / 483,862 B, the eager `auroraFallbackGround` wash included) with headroom for
// ordinary growth, and far below the MEASURED pre-diet graph (74 + 1 / 791,615 B) so the
// gate cannot green over a reverted cut. Both manifests are banked verbatim at
// docs/tranches/BJ/evidence/W-BOOT-DIET/ — the figures here are a summary of that
// capture, not the record.
//
// The band's DRAFT figures (45 / 450KB) were proposed before measurement and are NOT
// reachable from the three cuts this wave owns: they assumed the reka
// dropdown/floating stack (~68KB) leaves with the configurator, but `DockFacetMenu.vue`
// mounts the same stack inside BOTH docks, which stay eager per OPEN-P3. Reaching the
// draft needs a further cut this wave does not own — see BAND-PERF.md §Wave 1 OPEN-P3/P4.
const MAX_MODULEPRELOADS = 60;
const MAX_EAGER_JS_BYTES = 500 * 1024;

export interface BootGraphViolation {
    file: string;
    line: number;
    detail: string;
}

/** Strip line and block comments so a specifier named in prose is not a declaration. */
function stripComments(source: string): string {
    return source
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/^\s*\/\/.*$/gm, "");
}

/**
 * SOURCE arm (a): top-level static imports of the deferred shell components.
 * A `defineAsyncComponent(() => import(...))` call site carries no `import` statement
 * and is invisible to this scan by construction.
 */
export function scanStaticShellImports(source: string): BootGraphViolation[] {
    const violations: BootGraphViolation[] = [];
    const cleaned = stripComments(source);

    cleaned.split("\n").forEach((text, index) => {
        const match = /^\s*import\s+([^;]+?)\s+from\s+["']([^"']+)["']/.exec(text);
        if (!match) return;
        const [, clause, specifier] = match;

        for (const name of DEFERRED_SHELL_COMPONENTS) {
            // A type-only import erases at build time and drags nothing.
            if (/^\s*type\s/.test(clause)) continue;
            const bound = new RegExp(`(^|[{,\\s])${name}(\\s*[,}]|$)`).test(clause);
            if (!bound) continue;
            violations.push({
                file: "demo/shell/AppShell.vue",
                line: index + 1,
                detail: `top-level static import of ${name} from "${specifier}" — must be defineAsyncComponent`,
            });
        }
    });

    return violations;
}

/**
 * SOURCE arm (b): value imports from the aurora BARREL in the shell-field config path.
 * Type-only imports erase at build time and are permitted.
 */
export function scanAuroraBarrelImports(source: string): BootGraphViolation[] {
    const violations: BootGraphViolation[] = [];
    const cleaned = stripComments(source);

    cleaned.split("\n").forEach((text, index) => {
        const match = /^\s*import\s+([^;]*?)\s*from\s+["']([^"']+)["']/.exec(text);
        if (!match) return;
        const [, clause, specifier] = match;
        if (specifier !== AURORA_BARREL) return;
        if (/^\s*type\s/.test(clause)) return;
        violations.push({
            file: "demo/chassis/hero/aurora-hero.ts",
            line: index + 1,
            detail: `value import from the aurora barrel "${specifier}" — the barrel re-exports Aurora.vue; import from the defining leaf`,
        });
    });

    return violations;
}

/**
 * SOURCE arm (c): value imports of the CONFIGURATOR barrel from an eager shell module.
 * The barrel's first line is `export { default as PresetEditor } from "./PresetEditor.vue"`,
 * so the specifier drags the Sheet. Leaf specifiers (`./configurator/useConfiguratorOpen`)
 * and type-only imports are permitted.
 */
export function scanConfiguratorBarrelImports(
    source: string,
    file: string,
): BootGraphViolation[] {
    const violations: BootGraphViolation[] = [];

    stripComments(source)
        .split("\n")
        .forEach((text, index) => {
            const match =
                /^\s*import\s+([^;]*?)\s*from\s+["'](\.{1,2}\/configurator)["']/.exec(
                    text,
                );
            if (!match) return;
            if (/^\s*type\s/.test(match[1]!)) return;
            violations.push({
                file,
                line: index + 1,
                detail: `value import from the configurator barrel "${match[2]}" — it re-exports PresetEditor.vue; import the leaf module`,
            });
        });

    return violations;
}

export interface EagerGraph {
    modulepreloads: number;
    entryScripts: number;
    eagerJsFiles: string[];
    eagerJsBytes: number;
}

/**
 * BUILD arm: the eager JS set is the entry `<script type=module>` plus every
 * `rel=modulepreload` in `index.html`. `sizeOf` is injected so the parser is exercisable
 * against a planted manifest without touching disk.
 */
export function measureEagerGraph(
    html: string,
    sizeOf: (href: string) => number,
): EagerGraph {
    const preloads = [
        ...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g),
    ].map((m) => m[1]);
    const entries = [
        ...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g),
    ].map((m) => m[1]);

    const eagerJsFiles = [...new Set([...entries, ...preloads])];
    const eagerJsBytes = eagerJsFiles.reduce((sum, href) => sum + sizeOf(href), 0);

    return {
        modulepreloads: preloads.length,
        entryScripts: entries.length,
        eagerJsFiles,
        eagerJsBytes,
    };
}

describe("gate:boot-graph — source arm", () => {
    it("AppShell reaches Aurora and PresetEditor through defineAsyncComponent", () => {
        const source = readFileSync(APP_SHELL, "utf8");
        const violations = scanStaticShellImports(source);
        expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });

    it("AppShell actually declares the async boundaries", () => {
        const source = stripComments(readFileSync(APP_SHELL, "utf8"));
        for (const name of DEFERRED_SHELL_COMPONENTS) {
            expect(
                new RegExp(`const\\s+${name}\\s*=\\s*defineAsyncComponent`).test(
                    source,
                ),
                `${name} must be bound by defineAsyncComponent in AppShell.vue`,
            ).toBe(true);
        }
    });

    it("the shell field's frame-0 ground is EAGER, not inside the async chunk", () => {
        const source = stripComments(readFileSync(APP_SHELL, "utf8"));
        expect(
            /^\s*import\s+\{[^}]*auroraFallbackGround[^}]*\}\s+from/m.test(source),
            "AppShell must statically import auroraFallbackGround — the async Aurora chunk must not own first paint",
        ).toBe(true);
        expect(
            /loadingComponent/.test(source),
            "the async Aurora must ship an eager wash placeholder, else the shell field paints nothing until the chunk resolves",
        ).toBe(true);
    });

    it("the shell-field config reads its defaults off the barrel-free leaf", () => {
        const source = readFileSync(AURORA_HERO, "utf8");
        const violations = scanAuroraBarrelImports(source);
        expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });

    it("no EAGER shell module imports the configurator barrel", () => {
        const all = EAGER_SHELL_MODULES.flatMap((rel) =>
            scanConfiguratorBarrelImports(
                readFileSync(join(REPO_ROOT, rel), "utf8"),
                rel,
            ),
        );
        expect(all, JSON.stringify(all, null, 2)).toEqual([]);
    });
});

/**
 * OPEN-P0: existence is not freshness. A `dist-demo/` older than the newest source it
 * measures is a stale measurement dressed as a green gate.
 */
function newestSourceMtime(): number {
    let newest = 0;
    const walk = (dir: string): void => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
            const full = join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else newest = Math.max(newest, statSync(full).mtimeMs);
        }
    };
    [join(REPO_ROOT, "demo"), join(REPO_ROOT, "src")].forEach(walk);
    return newest;
}

describe("gate:boot-graph — build arm", () => {
    const indexHtml = join(DIST_DEMO, "index.html");

    // OPEN-P0: fail loud, never skip. A skipped measurement greens a regressed graph.
    const built = existsSync(indexHtml);
    const buildHint =
        "dist-demo/index.html is absent — run `npm run demo:dist:build` (npm test runs it first)";

    it("the built demo has a dist-demo to measure", () => {
        expect(built, buildHint).toBe(true);
    });

    it("the dist-demo it measures is NEWER than every source it is built from", () => {
        expect(built, buildHint).toBe(true);
        const builtAt = statSync(indexHtml).mtimeMs;
        const newestSrc = newestSourceMtime();
        expect(
            builtAt,
            `dist-demo/index.html is STALE (built ${new Date(builtAt).toISOString()}, newest source ${new Date(newestSrc).toISOString()}) — run \`npm run demo:dist:build\`; a stale build greens a regressed graph`,
        ).toBeGreaterThan(newestSrc);
    });

    it("the eager graph stays under the modulepreload and byte ceilings", () => {
        expect(built, buildHint).toBe(true);
        const html = readFileSync(indexHtml, "utf8");
        const graph = measureEagerGraph(
            html,
            (href) => statSync(join(DIST_DEMO, href.replace(/^\//, ""))).size,
        );

        const report = `eager graph: ${graph.modulepreloads} modulepreloads + ${graph.entryScripts} entry = ${graph.eagerJsFiles.length} files / ${graph.eagerJsBytes} B`;

        // THE FLOOR, BEFORE THE CEILINGS. The parser is attribute-order-sensitive; if
        // Vite ever emits a different order it returns zeroes, and zero satisfies every
        // ceiling. A manifest that parses to nothing is an unparsed manifest, not a lean
        // graph — red it here rather than green it below.
        expect(graph.entryScripts, report).toBe(1);
        expect(graph.modulepreloads, report).toBeGreaterThan(0);

        expect(graph.modulepreloads, report).toBeLessThanOrEqual(MAX_MODULEPRELOADS);
        expect(graph.eagerJsBytes, report).toBeLessThanOrEqual(MAX_EAGER_JS_BYTES);
    });
});

// Mutation bites — each detector is shown to fail on a planted defect, so a green gate
// above is a measurement and not a vacuous assertion.
describe("gate:boot-graph — self-test", () => {
    it("the static-import detector reds on a planted top-level Aurora import", () => {
        const planted = [
            `import { computed } from "vue";`,
            `import { Aurora } from "@glass/components/aurora";`,
            `import { PresetEditor } from "./configurator";`,
        ].join("\n");

        const violations = scanStaticShellImports(planted);
        expect(violations.map((v) => v.line)).toEqual([2, 3]);
    });

    it("the static-import detector ignores comments and type-only imports", () => {
        const clean = [
            `// import { Aurora } from "@glass/components/aurora";`,
            `import type { Aurora } from "@glass/components/aurora";`,
            `const Aurora = defineAsyncComponent(() => import("@glass/components/aurora"));`,
        ].join("\n");

        expect(scanStaticShellImports(clean)).toEqual([]);
    });

    it("the barrel detector reds on a planted barrel value import", () => {
        const planted = [
            `import type { AuroraConfig } from "@glass/components/aurora";`,
            `import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";`,
            `import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/constants/presets";`,
        ].join("\n");

        const violations = scanAuroraBarrelImports(planted);
        expect(violations.map((v) => v.line)).toEqual([2]);
    });

    it("the configurator-barrel detector reds on a planted barrel import", () => {
        const planted = [
            `import type { Density } from "./configurator";`,
            `import { useConfiguratorOpen } from "./configurator";`,
            `import { useConfiguratorOpen } from "./configurator/useConfiguratorOpen";`,
        ].join("\n");

        expect(
            scanConfiguratorBarrelImports(planted, "x.vue").map((v) => v.line),
        ).toEqual([2]);
    });

    it("the build-arm parser reds rather than greens on an unparsed manifest", () => {
        // `href` before `rel` — the parser requires the reverse, so it finds nothing.
        // Nothing is what satisfies BOTH ceilings, so the FLOOR in the build arm is the
        // only assertion that can catch this drift.
        const reordered = `<link href="/assets/a.js" rel="modulepreload" crossorigin>`;
        const graph = measureEagerGraph(reordered, () => 1);

        expect(graph.modulepreloads).toBe(0);
        expect(graph.eagerJsBytes).toBeLessThanOrEqual(MAX_EAGER_JS_BYTES);
        expect(graph.modulepreloads).toBeLessThanOrEqual(MAX_MODULEPRELOADS);
    });

    it("the build-arm parser reds on a planted oversized manifest", () => {
        const planted = [
            `<script type="module" crossorigin src="/assets/index-AAA.js"></script>`,
            ...Array.from(
                { length: 73 },
                (_, i) =>
                    `<link rel="modulepreload" crossorigin href="/assets/c${i}.js">`,
            ),
        ].join("\n");

        const graph = measureEagerGraph(planted, () => 10 * 1024);

        expect(graph.modulepreloads).toBe(73);
        expect(graph.eagerJsFiles.length).toBe(74);
        expect(graph.modulepreloads).toBeGreaterThan(MAX_MODULEPRELOADS);
        expect(graph.eagerJsBytes).toBeGreaterThan(MAX_EAGER_JS_BYTES);
    });
});
