import {
    cpSync,
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

import postcss from "postcss";

import { minifyCss } from "./scripts/lib/minify-css.mjs";

/**
 * vite.style-fold — the STYLE-FOLD sub-plugin of publishStyleAssets
 * (BH.B5a-deps-currency god-module carve). Owns the `/styles` cascade
 * materialization: cpSync `src/styles`+`src/fonts` → `dist/`, fold the SFC
 * scoped bundle into `dist/styles/index.css`, then post-process the shipped
 * copy (base64-inline the fonts + inject the `-webkit-backdrop-filter` prefix
 * pair + minify LAST). The orchestrator (`vite.style-assets.ts`) composes these
 * in order; the component-utility emit (`vite.utility-emit.ts`) is the sibling
 * sub-plugin. (BG.W-CSS-MINIFY / F8.4 pruned the critical/deferred partition
 * sub-plugin `vite.critical-split.ts` — minify made the split's ~13KB saving
 * not worth its wave + gate + manifest + two exports; the `./styles` union is
 * the one byte-complete entry.)
 *
 * The `./styles` export in package.json publishes `dist/styles/index.css`,
 * whose `@font-face` rules reference woff2 faces under the package. Under the
 * cross-repo dev-resolution contract-v2 (docs/precepts/cross-repo-dev-resolution.md
 * §2.1) every exports key points into `dist/`; consumers do not widen
 * `server.fs.allow` into a sibling's `src/` (§2.2), so font URLs that resolve
 * out of `src/fonts/` return 403 from the consumer's Vite.
 *
 * Two architectural responses were possible:
 *
 *   - Option A — copy `src/fonts/` to `dist/fonts/`, preserve relative
 *     `url()` form. Structural blocker: Vite resolves CSS `url()`
 *     against the file's `realpath`, which under the consumer's
 *     `file:` symlink lands at `/Users/.../glass-ui/dist/fonts/...` —
 *     OUTSIDE the consumer's project root, so the `/@fs/` channel
 *     gates on `server.fs.allow` and still 403s. Package-specifier
 *     URLs (`url("@mkbabb/glass-ui/fonts/...")`) likewise fail —
 *     Vite's CSS pipeline does not resolve bare specifiers in `url()`
 *     the way it does in `@import`. The relative URL is structurally
 *     locked to the sibling's realpath; no source rewrite escapes it.
 *
 *   - Option B — inline the woff2 files as `data:font/woff2;base64,…`
 *     URIs in the published CSS at build time. The font request layer
 *     vanishes entirely; the `fs.allow` triangle dissolves. CSS-payload
 *     cost is bounded — total font corpus is 124 KB raw across two
 *     families (Plus Jakarta Sans latin + latin-ext, variable wght
 *     200..800; Fira Code latin + latin-ext, variable wght 300..700) →
 *     ~165 KB base64-encoded, gzips to ~120 KB. Within the inline-asset
 *     register for a once-loaded design-system CSS.
 *
 * Option B chosen — A's blocker is the symlink-realpath axis of Vite's
 * resolver, not a glass-ui internal. The dist CSS is also self-contained
 * for cdn / npm-published consumption: no out-of-tree font requests, no
 * preload-coordination guesswork on the consumer side.
 */

/**
 * atSourceIndex — locate the offset of the real trailing [at-source] AT-RULE in
 * a CSS string, anchoring the dist-only @import folds (SFC bundle + components)
 * just before it so they stay inside the leading import block.
 *
 * Why not a bare substring scan for the token: the authored index.css mentions
 * the token at-source INSIDE comment prose (the BA.W-EMISSION block narrates the
 * dead [dot-dot/components] glob, re-imported this at-source line). A bare
 * indexOf matches that PROSE occurrence FIRST and slices the injection into the
 * MIDDLE of an open comment. The injected fold-comment then carries a comment
 * close delimiter that prematurely closes the OUTER comment, orphaning the rest
 * of the prose as live CSS (the apostrophe in the prose becomes an unterminated
 * string, so every consumer Tailwind v4 build dies). A REAL at-source at-rule
 * begins a statement: it sits at the start of a line after only whitespace.
 * Anchor on that line-start at-rule, never on a prose mention.
 *
 * Returns the byte offset of the at-rule, or -1 (caller appends at EOF).
 */
export function atSourceIndex(css: string): number {
    const m = /^[ \t]*@source\b/m.exec(css);
    return m ? m.index : -1;
}

/** Keep dist-only component imports ahead of the terminal accessibility mode. */
export function terminalImportIndex(css: string): number {
    const mode = /^[ \t]*@import\s+["']\.\/accessibility\.css["'];/m.exec(css);
    return mode ? mode.index : atSourceIndex(css);
}

/**
 * copyStyleAssets — cpSync `src/styles/` → `dist/styles/` and `src/fonts/` →
 * `dist/fonts/` wholesale so `./styles` ships the authored cascade verbatim
 * (live `@import "./X.css"` lines + flat partials) and the `./fonts/*` subpath
 * covers any future per-asset consumer that wants the raw woff2. Returns the
 * resolved font/style dirs the downstream folds read.
 */
export function copyStyleAssets(root: string): {
    srcFonts: string;
    distStyles: string;
    distComponents: string;
} {
    const srcFonts = resolve(root, "src/fonts");
    const distFonts = resolve(root, "dist/fonts");
    const srcStyles = resolve(root, "src/styles");
    const distStyles = resolve(root, "dist/styles");
    const srcComponents = resolve(root, "src/components");
    const distComponents = resolve(root, "dist/components");

    if (existsSync(srcFonts)) {
        cpSync(srcFonts, distFonts, { recursive: true });
    }
    if (existsSync(srcStyles)) {
        cpSync(srcStyles, distStyles, { recursive: true });
    }
    if (existsSync(srcComponents)) {
        cpSync(srcComponents, distComponents, {
            recursive: true,
            filter: (path) => statSync(path).isDirectory() || path.endsWith(".css"),
        });
    }
    return { srcFonts, distStyles, distComponents };
}

function cssFilesUnder(...roots: string[]): string[] {
    return roots.flatMap((root) => {
        if (!existsSync(root)) return [];
        if (statSync(root).isFile()) return root.endsWith(".css") ? [root] : [];
        return (readdirSync(root, { recursive: true }) as string[])
            .filter((path) => path.endsWith(".css"))
            .map((path) => resolve(root, path));
    });
}

/**
 * foldSfcBundle — AN.W1: fold the SFC scoped component CSS into the `/styles`
 * bundle so a single `@import "@mkbabb/glass-ui/styles"` carries the COMPLETE
 * stylesheet: the token cascade (index.css's @import chain) PLUS the
 * per-component `<style scoped>` payload Vite extracts to `dist/glass-ui.css`
 * (Aurora's `.aurora-root` grid layering, Progress/Slider/etc. scoped rules).
 *
 * The two artefacts sit behind two exports — `./styles` (cascade) and
 * `./styles.css` (SFC scoped). The fold appends an `@import` of the SFC bundle
 * into the dist copy of `index.css` (Shape A): least-invasive, the cascade
 * authoring is untouched, and `./styles.css` stays reachable as a transparent
 * SFC-only export. The `@import` is injected into the DIST copy only —
 * `src/styles/index.css` references no built sibling, so the `proof:theme`
 * source-read stays valid.
 *
 * CSS ordering: the SFC `@import` is inserted before the terminal accessibility
 * import (or the trailing `@source` in an older source tree). The SFC bundle
 * lives one dir up from `dist/styles/`, hence `../glass-ui.css`.
 */
export function foldSfcBundle(root: string, distStyles: string): void {
    const distIndex = resolve(distStyles, "index.css");
    const sfcBundle = resolve(root, "dist/glass-ui.css");
    if (existsSync(distIndex) && existsSync(sfcBundle)) {
        const indexSrc = readFileSync(distIndex, "utf-8");
        const sfcImport = '@import "../glass-ui.css";';
        if (!indexSrc.includes(sfcImport)) {
            const sourceAt = terminalImportIndex(indexSrc);
            const folded =
                sourceAt === -1
                    ? `${indexSrc}\n${sfcImport}\n`
                    : `${indexSrc.slice(0, sourceAt)}/* AN.W1 — SFC scoped component CSS (folded so a single\n   @import "@mkbabb/glass-ui/styles" carries cascade + components) */\n${sfcImport}\n\n${indexSrc.slice(sourceAt)}`;
            writeFileSync(distIndex, folded, "utf-8");
        }
    }
}

/**
 * inlineFonts — inline every `url(... .woff2)` reference in the published CSS as
 * a base64 data URI sourced from `src/fonts/`. The URL form expected here is the
 * canonical authored shape: `url("@mkbabb/glass-ui/fonts/<family>/<face>.woff2")`.
 * Resolves the relative path against `srcFonts`, encodes, rewrites in place.
 */
export function inlineFonts(srcFonts: string, ...cssRoots: string[]): void {
    const urlRe = /url\(\s*["']?@mkbabb\/glass-ui\/fonts\/([^"')\s]+)["']?\s*\)/g;
    for (const path of cssFilesUnder(...cssRoots)) {
        const src = readFileSync(path, "utf-8");
        let touched = false;
        const rewritten = src.replace(urlRe, (_match, rel: string) => {
            const fontPath = resolve(srcFonts, rel);
            if (!existsSync(fontPath)) return _match;
            const buf = readFileSync(fontPath);
            const b64 = buf.toString("base64");
            touched = true;
            return `url("data:font/woff2;base64,${b64}")`;
        });
        if (touched) writeFileSync(path, rewritten, "utf-8");
    }
}

/**
 * normalizeBackdropFilterPairs — normalize the shipped CSS after Vite/Lightning emits
 * it. Source and generated bundles may contain either leg; the pass makes every
 * surviving declaration an adjacent, same-value pair in canonical order. Runs
 * after the cpSync, SFC fold, utility emit, and font inline so it covers the
 * complete shipped cascade. Idempotent for an already canonical pair.
 *
 * X4 (value.js A6 + L16) — the shipped policy is that every backdrop declaration
 * carries both forms, including `backdrop-filter: none` resets.
 * The lexical minifier remains prefix-blind and preserves the normalized pair.
 */
export function normalizeBackdropFilterPairs(css: string): string {
    const root = postcss.parse(css);

    root.walkRules((rule) => {
        for (let index = 0; index < (rule.nodes?.length ?? 0); index++) {
            const node = rule.nodes?.[index];
            if (
                !node ||
                node.type !== "decl" ||
                (node.prop !== "backdrop-filter" && node.prop !== "-webkit-backdrop-filter")
            ) {
                continue;
            }

            const next = rule.nodes?.[index + 1];
            if (
                node.prop === "-webkit-backdrop-filter" &&
                next?.type === "decl" &&
                next.prop === "backdrop-filter" &&
                next.value === node.value
            ) {
                index++;
                continue;
            }

            if (
                node.prop === "backdrop-filter" &&
                next?.type === "decl" &&
                next.prop === "-webkit-backdrop-filter" &&
                next.value === node.value
            ) {
                node.prop = "-webkit-backdrop-filter";
                next.prop = "backdrop-filter";
                index++;
                continue;
            }

            if (node.prop === "-webkit-backdrop-filter") {
                node.cloneAfter({ prop: "backdrop-filter" });
            } else {
                node.cloneBefore({ prop: "-webkit-backdrop-filter" });
            }
            index++;
        }
    });

    return root.toString();
}

export function injectWebkitBackdrop(...cssRoots: string[]): void {
    for (const path of cssFilesUnder(...cssRoots)) {
        const src = readFileSync(path, "utf-8");
        const out = normalizeBackdropFilterPairs(src);
        if (out !== src) writeFileSync(path, out, "utf-8");
    }
}

/**
 * minifyStyleAssets — BG.W-CSS-MINIFY (F8.4): minify EVERY published `.css`
 * partial under the `dist/styles` subtree (strip comments + collapse whitespace
 * to a single line) so the shipped `/styles` cascade drops its authoring
 * comments + indentation while `src/styles/*.css` KEEP their comments (this is a
 * PUBLISH-TIME pass, not a source rewrite).
 *
 * The minify is DELIBERATELY conservative + string-aware (`scripts/lib/
 * minify-css.mjs` `minifyCss`): the dist partials are copied RAW so they still
 * carry Tailwind-v4 SOURCE directives (`@theme`/`@utility`/`@apply`/`@source`/
 * `@layer`) the consumer's Tailwind processes, PLUS the normalized backdrop-filter
 * pairs and the `@supports` no-masking fallbacks — a structural minifier
 * (lightningcss/esbuild) would prune the "redundant" webkit prefix, drop a
 * "dead" `@supports` branch, or choke on the non-standard at-rules. The lexical
 * pass touches only comments + whitespace and preserves the `@source "../*.js"`
 * `/*`-in-string byte (the atSourceIndex trap).
 *
 * Runs LAST (after cpSync + SFC-fold + component-utility emit + font-inline +
 * backdrop normalization) so it minifies the COMPLETE shipped cascade. Recursive
 * (the `glass/`, `dock-controls/`, `tokens/`, … subdir
 * partials ship + are `@import`-referenced, so they are minified too).
 * Idempotent by construction (a cpSync-fresh dist is minified once per build).
 */
export function minifyStyleAssets(...cssRoots: string[]): void {
    for (const path of cssFilesUnder(...cssRoots)) {
        const src = readFileSync(path, "utf-8");
        const min = minifyCss(src);
        if (min !== src) writeFileSync(path, min, "utf-8");
    }
}
