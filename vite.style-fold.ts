import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

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
} {
    const srcFonts = resolve(root, "src/fonts");
    const distFonts = resolve(root, "dist/fonts");
    const srcStyles = resolve(root, "src/styles");
    const distStyles = resolve(root, "dist/styles");

    if (existsSync(srcFonts)) {
        cpSync(srcFonts, distFonts, { recursive: true });
    }
    if (existsSync(srcStyles)) {
        cpSync(srcStyles, distStyles, { recursive: true });
    }
    return { srcFonts, distStyles };
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
 * CSS ordering: the SFC `@import` is inserted before the trailing `@source`
 * at-rule so it sits inside the file's leading @import block (CSS forbids
 * `@import` after a non-import statement). The SFC bundle lives one dir up from
 * `dist/styles/`, hence `../glass-ui.css`.
 */
export function foldSfcBundle(root: string, distStyles: string): void {
    const distIndex = resolve(distStyles, "index.css");
    const sfcBundle = resolve(root, "dist/glass-ui.css");
    if (existsSync(distIndex) && existsSync(sfcBundle)) {
        const indexSrc = readFileSync(distIndex, "utf-8");
        const sfcImport = '@import "../glass-ui.css";';
        if (!indexSrc.includes(sfcImport)) {
            const sourceAt = atSourceIndex(indexSrc);
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
export function inlineFonts(srcFonts: string, distStyles: string): void {
    if (!existsSync(distStyles)) return;
    const cssFiles = readdirSync(distStyles).filter((f) => f.endsWith(".css"));
    const urlRe = /url\(\s*["']?@mkbabb\/glass-ui\/fonts\/([^"')\s]+)["']?\s*\)/g;
    for (const file of cssFiles) {
        const path = resolve(distStyles, file);
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
 * injectWebkitBackdrop — AY.W-A11Y-PERF O-2a: inject the
 * `-webkit-backdrop-filter` prefix into the SHIPPED dist CSS. The source authors
 * the UNPREFIXED form only (the single-source-of-truth discipline + the
 * Lightning-CSS dedup concern the glass.css policy comment records), so without
 * this pass the shipped `dist/styles/*.css` carries the unprefixed
 * `backdrop-filter` only and a Safari ≤17 engine (which supports ONLY the
 * `-webkit-` form) paints NO blur AND the `@supports not` opaque fallback does
 * NOT fire (Safari 17 supports the webkit form, so `@supports not
 * ((backdrop-filter) or (-webkit-backdrop-filter))` is FALSE) — a transparent
 * glass surface with floating text, strictly worse than no-glass. The LIBRARY
 * owns its shipped artefact: this pass emits the prefixed pair at BUILD (the
 * source stays unprefixed; the build adds the pair LAST, so the Lightning dedup
 * never sees both forms in source). For every `backdrop-filter: <v>;`
 * declaration NOT already immediately preceded by a `-webkit-backdrop-filter:`,
 * prepend the prefixed pair with the SAME value. Runs AFTER the cpSync +
 * SFC-fold + component-utility emit + font-inline so it covers the complete
 * shipped cascade. Idempotent (skips a decl already webkit-paired).
 */
export function injectWebkitBackdrop(distStyles: string): void {
    if (!existsSync(distStyles)) return;
    const distCssFiles = readdirSync(distStyles).filter((f) => f.endsWith(".css"));
    // Match an unprefixed `backdrop-filter: <value>;` DECLARATION (a property
    // line in a rule body), NOT a `@supports`/`@container` query condition
    // (those live inside `( … )` preludes — `(backdrop-filter: blur(1px))` — and
    // carry NO trailing `;`, so injecting there would CORRUPT the at-rule query).
    // The match requires:
    //   - the property name immediately preceded by a `{`, `;`, or newline+ws
    //     (a declaration boundary) AND not part of `-webkit-backdrop-filter`
    //     (the `[^-]` guard), and
    //   - a trailing `;` (a real declaration terminator).
    // The value excludes a bare `)` so a greedy match cannot spill across an
    // `@supports` prelude's `) or (` operators (the corruption class). A value
    // with a `var(...)`/`blur(Npx)` contains balanced parens, so to allow those
    // we match a value with BALANCED NESTED parens up to THREE levels:
    // `(?:[^;{}()]|<G3>)+` where `<G3>` is a paren group that may itself contain
    // paren groups two more deep — runs of non-paren text OR one balanced (nesting)
    // paren group — terminated by `;`. This admits `var(--glass-blur-wash)` (1
    // level), `blur(var(--top-layer-backdrop-blur, 8px))` (2 levels — the Safari
    // `blur(var())` case, BG.W-GLASS-REGISTER-UNIFY: the prior single-level
    // `\([^()]*\)` STOPPED at the inner `(` of a `blur(var(…))`, so the whole
    // declaration NEVER matched → NO `-webkit-` pair reached the shipped dist →
    // Safari ≤17 painted no blur on the `.glass-top-layer` entry), and
    // `blur(calc(var(--r) * var(--l)))` (3 levels) but still STOPS at the `;`
    // before any query operator. The `-webkit-backdrop-filter:` (M4a alias-parity)
    // arm is emitted from the SAME resolved `value.trim()`, so its value tracks the
    // unprefixed one exactly. Locked by `proof:glass`'s safari-blur-var arm.
    const bdfDeclRe =
        /([{};]|\n)(\s*)backdrop-filter\s*:\s*((?:[^;{}()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))+);/g;
    for (const file of distCssFiles) {
        const path = resolve(distStyles, file);
        const src = readFileSync(path, "utf-8");
        let changed = false;
        const out = src.replace(
            bdfDeclRe,
            (
                match,
                boundary: string,
                indent: string,
                value: string,
                offset: number,
            ) => {
                // Exclude the `-webkit-backdrop-filter` property (the boundary
                // char before would be `-`, which is not in our boundary class,
                // so this is belt-and-suspenders) and skip a decl ALREADY
                // webkit-paired (the hand-authored pair — Slider/ContinuousRail/
                // useGlassRenderer/Drawer): never double-inject.
                const lookbackStart = Math.max(0, offset - 120);
                const lookback = src.slice(lookbackStart, offset + 1);
                if (/-webkit-backdrop-filter\s*:[^;{}]*;\s*$/.test(lookback)) {
                    return match;
                }
                changed = true;
                return `${boundary}${indent}-webkit-backdrop-filter: ${value.trim()};\n${indent}backdrop-filter: ${value.trim()};`;
            },
        );
        if (changed) writeFileSync(path, out, "utf-8");
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
 * `@layer`) the consumer's Tailwind processes, PLUS the `injectWebkitBackdrop`
 * pairs and the `@supports` no-masking fallbacks — a structural minifier
 * (lightningcss/esbuild) would prune the "redundant" webkit prefix, drop a
 * "dead" `@supports` branch, or choke on the non-standard at-rules. The lexical
 * pass touches only comments + whitespace and preserves the `@source "../*.js"`
 * `/*`-in-string byte (the atSourceIndex trap).
 *
 * Runs LAST (after cpSync + SFC-fold + component-utility emit + font-inline +
 * webkit-inject) so it minifies the COMPLETE shipped cascade — and so the
 * `injectWebkitBackdrop` newline/`;`-boundary regex reads the un-collapsed text
 * first. Recursive (the `glass/`, `dock-controls/`, `tokens/`, … subdir
 * partials ship + are `@import`-referenced, so they are minified too).
 * Idempotent by construction (a cpSync-fresh dist is minified once per build).
 */
export function minifyStyleAssets(distStyles: string): void {
    if (!existsSync(distStyles)) return;
    const entries = readdirSync(distStyles, { recursive: true }) as string[];
    for (const rel of entries) {
        if (!rel.endsWith(".css")) continue;
        const path = resolve(distStyles, rel);
        const src = readFileSync(path, "utf-8");
        const min = minifyCss(src);
        if (min !== src) writeFileSync(path, min, "utf-8");
    }
}
