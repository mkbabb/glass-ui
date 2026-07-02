import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import type { Plugin } from "vite";

import {
    CRITICAL_PARTIALS,
    DEFERRED_PARTIALS,
    DEFERRED_FOLDS,
    DEFERRED_SOURCE_DIRECTIVE,
} from "./src/styles/critical-partition.mjs";

const require_ = createRequire(import.meta.url);

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
function atSourceIndex(css: string): number {
    const m = /^[ \t]*@source\b/m.exec(css);
    return m ? m.index : -1;
}

/**
 * publishStyleAssets — the post-build CSS/font publish step, shared by both
 * Vite configs (canonical + iter) so every build mode emits the same `dist/`
 * shape (AO inv β — no dist-wipe footgun: the budget gate reads what ships).
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
 *
 * The plugin: cpSync `src/styles/` → `dist/styles/`, then walk each
 * `*.css` file and substitute every `url("../fonts/<rel>")` with a
 * `data:` URI built from `readFileSync("src/fonts/<rel>")`. `src/fonts/`
 * is also cpSync'd to `dist/fonts/` so the `./fonts/*` exports subpath
 * covers any future per-asset consumer that wants the raw woff2 —
 * `@font-face` consumers transparently bypass it.
 */
/**
 * emitComponentUtilities — ship glass-ui's own component-utility RULES in the
 * dist `/styles` bundle, build-independently (P9).
 *
 * The problem: glass-ui's components reference Tailwind-v4 `@theme`-derived
 * utility classes (`rounded-panel`, `text-muted-foreground`, `h-full`,
 * `shrink-0`, the CVA variant classes, …) ONLY inside their compiled
 * `dist/*.js` render functions. Tailwind v4 emits a utility RULE only when a
 * build SCANS a file using it. A consumer's content-scan does not reach
 * glass-ui's `node_modules` `.vue`/`dist/*.js`, so `rounded-panel` &c. resolve
 * to NOTHING in the consumer — `.configurator` computes `border-radius: 0` and
 * every glass-ui-component utility silently no-ops. The documented
 * `@source "../node_modules/@mkbabb/glass-ui"` workaround (CLAUDE.md / AN.W2
 * Option B) is fragile and fails silently.
 *
 * The root fix: generate ONLY glass-ui's own component vocabulary in glass-ui's
 * OWN build (native theme context — deterministic, NOT a consumer re-derivation
 * — which is what AN.W2 rejected on payload + brittleness grounds) and ship the
 * emitted rules as static CSS in the dist `/styles` cascade. A bare consumer
 * (no `@source`) then gets them for free.
 *
 * The recipe — compile via `@tailwindcss/postcss` with:
 *
 *     @import "tailwindcss" source(none);   // disable file scanning
 *     @import "<theme.css>";                // glass-ui's own @theme context
 *     @source inline("<class>"); …          // one safelist line per token
 *
 * `source(none)` disables file-scanning; the per-token `@source inline` lines
 * are the safelist (a single brace-group `{a,b,…}` is poisoned by arbitrary-
 * value brackets — per-token lines are robust). Tailwind emits exactly the
 * listed utilities against glass-ui's `@theme`, so `rounded-panel` resolves to
 * `border-radius: var(--radius-panel)`. Non-utility tokens in the scan
 * (`glass-floating`, `configurator-layer`, …) generate nothing — harmless.
 *
 * The compile output also carries a preflight reset (`@layer base`) + the
 * `:root,:host` `@theme` var block — glass-ui already ships its OWN tokens
 * (tokens.css + theme.css), so we keep ONLY: the `@layer utilities` rules
 * (flattened), the `@property --tw-*` declarations, and the `@supports` block
 * that initializes `--tw-*` vars (the var machinery border/duration/etc.
 * utilities reference). The base reset is dropped.
 *
 * R3 — the dropped `:root,:host` block is also where Tailwind defines its OWN
 * built-in theme defaults (`--spacing`, the `--text-*` ladder, `--ease-in-out`,
 * the `--animate-*` keyframe refs, the `--color-amber-*`/`--color-red-*` palette
 * stops, …). The kept utilities REFERENCE those via `var(--X)` (every `p-*`/
 * `gap-*`/`inset-*` is `calc(var(--spacing) * N)`), so dropping the whole block
 * leaves them undefined and the utilities silently no-op for a bare consumer.
 * glass-ui already ships its own radius/color/text bases, so the fix is NOT to
 * keep the whole theme block (that would re-emit — and risk clobbering — every
 * glass-ui token); it is to emit a MINIMAL `:root{}` carrying exactly the props
 * the kept utilities reference that TAILWIND owns (present in the compiled
 * `:root,:host` block) and that glass-ui's OWN `src/styles` does NOT already
 * define. That is `--spacing` & co. — Tailwind's defaults — and nothing of
 * glass-ui's. Same self-sufficiency posture as tokens.css's radius/color bases.
 *
 * Deterministic + byte-stable: the token set is sorted; no timestamps.
 */
async function emitComponentUtilities(
    root: string,
    distStyles: string,
): Promise<void> {
    const dist = resolve(root, "dist");
    const themePath = resolve(root, "src/styles/theme.css");
    if (!existsSync(dist) || !existsSync(themePath)) return;

    // 1. Extract the distinct class-token set from every dist/*.js render
    //    function + the folded SFC bundle (dist/glass-ui.css). Class strings
    //    are quoted literals; split on whitespace and keep class-shaped tokens.
    const scanPaths = readdirSync(dist)
        .filter((f) => f.endsWith(".js"))
        .map((f) => resolve(dist, f));
    const sfcBundle = resolve(dist, "glass-ui.css");
    if (existsSync(sfcBundle)) scanPaths.push(sfcBundle);

    const classish = /^-?[a-z][a-z0-9]*(?:[-/:][\w./:\-\[\]%(),#=&*~+]*)*$/i;
    const strRe = /["'`]([^"'`\n]*?)["'`]/g;
    const tokens = new Set<string>();
    for (const path of scanPaths) {
        const src = readFileSync(path, "utf-8");
        let m: RegExpExecArray | null;
        while ((m = strRe.exec(src))) {
            for (const part of m[1].split(/\s+/)) {
                const t = part.trim();
                if (!t || t.length > 120) continue;
                if (!classish.test(t)) continue;
                if (!/[a-z]/i.test(t)) continue;
                tokens.add(t);
            }
        }
    }
    const safelist = [...tokens].sort();
    if (safelist.length === 0) return;

    // 2. Compile via the proven recipe.
    const inlineLines = safelist
        .map((t) => `@source inline("${t}");`)
        .join("\n");
    const input = `@import "tailwindcss" source(none);\n@import "${themePath}";\n${inlineLines}\n`;
    const compiled = await postcss([tailwindcss()]).process(input, {
        from: themePath,
        to: undefined,
    });
    const parsed = postcss.parse(compiled.css);

    // 3. Keep ONLY the utility rules + the `--tw-*` var machinery. Drop the
    //    preflight `@layer base`, the `:root,:host` `@theme` var block, and the
    //    empty `@layer` declarations.
    const kept = postcss.root();
    parsed.walkAtRules("layer", (node) => {
        if (node.params === "utilities") {
            node.nodes?.forEach((child) => kept.append(child.clone()));
        }
    });
    parsed.walkAtRules("property", (node) => {
        if (node.params.startsWith("--tw-")) kept.append(node.clone());
    });
    parsed.walkAtRules("supports", (node) => {
        // Keep the `@supports` block ONLY when every declaration it carries is
        // a `--tw-*` custom-property set (the border-style/duration/etc.
        // initializer). This rejects the preflight `::placeholder` reset.
        let onlyTw = true;
        let hasDecl = false;
        node.walkDecls((decl) => {
            hasDecl = true;
            if (!decl.prop.startsWith("--tw-")) onlyTw = false;
        });
        if (hasDecl && onlyTw) kept.append(node.clone());
    });

    // R3 — make `kept` self-sufficient for the Tailwind-OWNED custom props its
    // utilities reference. Three sets:
    //   themeOwned — every `--X` Tailwind's own built-in `@theme` default block
    //                defines, read from the installed `tailwindcss/theme.css`.
    //                NOT from this in-build compile's emitted `:root` block:
    //                `@tailwindcss/vite` and this in-`closeBundle`
    //                `@tailwindcss/postcss` pass share ONE Tailwind v4
    //                design-system instance, so the postcss pass treats the
    //                theme as already-emitted and suppresses the `:root,:host`
    //                var block entirely (it would come back empty). The package
    //                `theme.css` is the authoritative, version-tracking source.
    //   glassDefined — every `--X` glass-ui's own `src/styles/*.css` declares
    //                (tokens.css + theme.css + the rest of the cascade). These
    //                already ship; re-emitting them would duplicate or clobber.
    //   referenced — every `var(--X)` the kept utility rules read.
    // Emit `:root{}` for referenced ∩ themeOwned − glassDefined — i.e. exactly
    // Tailwind's built-in defaults (`--spacing` &c.) that glass-ui does not own.
    const themeOwned = new Map<string, string>();
    const twThemePath = resolve(
        dirname(require_.resolve("tailwindcss/package.json")),
        "theme.css",
    );
    if (existsSync(twThemePath)) {
        postcss.parse(readFileSync(twThemePath, "utf-8")).walkAtRules(
            "theme",
            (atRule) => {
                atRule.walkDecls((decl) => {
                    if (decl.prop.startsWith("--")) {
                        themeOwned.set(decl.prop, decl.value);
                    }
                });
            },
        );
    }

    const glassDefined = new Set<string>();
    const srcStyles = resolve(root, "src/styles");
    if (existsSync(srcStyles)) {
        const declRe = /(?:^|[\s;{])(--[a-zA-Z0-9_-]+)\s*:/g;
        for (const f of readdirSync(srcStyles).filter((n) => n.endsWith(".css"))) {
            // Strip CSS block comments so a `--token` mentioned in prose is not
            // mistaken for a declaration.
            const css = readFileSync(resolve(srcStyles, f), "utf-8").replace(
                /\/\*[\s\S]*?\*\//g,
                "",
            );
            let d: RegExpExecArray | null;
            while ((d = declRe.exec(css))) glassDefined.add(d[1]);
        }
    }

    const referenced = new Set<string>();
    const keptStr = kept.toString();
    const varRe = /var\(\s*(--[a-zA-Z0-9_-]+)/g;
    let v: RegExpExecArray | null;
    while ((v = varRe.exec(keptStr))) referenced.add(v[1]);

    const baseProps = [...referenced]
        .filter((p) => themeOwned.has(p) && !glassDefined.has(p))
        .sort();
    const baseBlock =
        baseProps.length === 0
            ? ""
            : "/* R3 — Tailwind's OWN built-in theme defaults (--spacing, the\n" +
              "   --text-* ladder, --ease-in-out, …) the kept utilities reference;\n" +
              "   glass-ui ships its own radius/color/text bases, so ONLY the\n" +
              "   Tailwind-owned props NOT in glass-ui's tokens are emitted here so\n" +
              "   spacing/typography utilities paint for a bare consumer. */\n" +
              ":root {\n" +
              baseProps
                  .map((p) => `    ${p}: ${themeOwned.get(p)};`)
                  .join("\n") +
              "\n}\n";

    const header =
        "/* P9 — glass-ui's own component-utility rules, emitted build-\n" +
        "   independently from glass-ui's native @theme so a bare consumer\n" +
        "   (no @source glob) paints them. Generated by\n" +
        "   vite.style-assets.ts emitComponentUtilities; do not hand-edit. */\n";
    writeFileSync(
        resolve(distStyles, "components.css"),
        header + baseBlock + kept.toString() + "\n",
        "utf-8",
    );

    // 4. Pull components.css into the dist cascade AFTER utilities.css so a
    //    consumer can still override (the @import sits inside the leading
    //    import block, before the trailing `@source`). The src index.css is
    //    untouched — this @import lands in the DIST copy only.
    const distIndex = resolve(distStyles, "index.css");
    if (!existsSync(distIndex)) return;
    const indexSrc = readFileSync(distIndex, "utf-8");
    const compImport = '@import "./components.css";';
    if (indexSrc.includes(compImport)) return;
    const sourceAt = atSourceIndex(indexSrc);
    const comment =
        "/* P9 — component-utility rules (rounded-panel, text-muted-foreground,\n" +
        "   …) shipped build-independently so a bare consumer paints them. */\n";
    const folded =
        sourceAt === -1
            ? `${indexSrc}\n${comment}${compImport}\n`
            : `${indexSrc.slice(0, sourceAt)}${comment}${compImport}\n\n${indexSrc.slice(sourceAt)}`;
    writeFileSync(distIndex, folded, "utf-8");
}

/**
 * emitCriticalDeferredSplit — partition the resolved `/styles` draw into a small
 * CRITICAL above-the-fold subset (`dist/styles/critical.css`, render-blocking-
 * early) + a DEFERRED below-the-fold tail (`dist/styles/deferred.css`, loaded
 * non-blocking) off the CRITICAL_PARTITION boundary manifest (BB.W-CSS-CRITICAL).
 *
 * The two emitted files each `@import` their bucket's partials in the SAME
 * cascade order the monolith `index.css` declares (load order is load-bearing),
 * so a consumer loading critical-early + deferred-non-blocking gets the exact
 * cascade the union `./styles` resolves. The build-time folds (the SFC scoped
 * payload `../glass-ui.css` + the `components.css` utility surface) + the
 * `@source` content-scan backstop ride DEFERRED — they decorate components that
 * mount after first paint, never the above-the-fold chrome.
 *
 * The union is BYTE-COMPLETE: critical.css's @imports ∪ deferred.css's @imports
 * ≡ the monolith index.css's resolved-draw partial set (every partial + fold in
 * EXACTLY ONE bucket — the W2 partition floor `proof:css-critical` asserts; a
 * fold leaking into critical fails W2 AND the W3 ceiling). The `./styles` union
 * entry (dist/styles/index.css) is UNTOUCHED — it stays the byte-complete
 * one-import simplicity entry; this emit only ADDS two sibling files.
 *
 * Runs AFTER the SFC-fold + emitComponentUtilities so `../glass-ui.css` +
 * `components.css` exist for the deferred file to reference, and BEFORE the
 * font-inline + webkit passes (which read every dist/styles/*.css — they are
 * no-ops on these two pure-@import files, which carry no font url() or
 * backdrop-filter declaration directly; their referenced partials carry those
 * and are processed in place).
 */
function emitCriticalDeferredSplit(distStyles: string): void {
    if (!existsSync(distStyles)) return;

    const buildSubset = (
        label: "CRITICAL" | "DEFERRED",
        partials: readonly string[],
        folds: readonly string[],
        sourceDirective: string | null,
    ): string => {
        const header =
            `/* BB.W-CSS-CRITICAL — the ${label} /styles subset (off\n` +
            "   src/styles/critical-partition.mjs CRITICAL_PARTITION; do not\n" +
            "   hand-edit — the manifest is the SOLE partition source). Each\n" +
            "   @import is a whole cascade partial in the monolith's declared\n" +
            "   load order; critical ∪ deferred is byte-complete. */\n";
        const partialImports = partials
            .map((p) => `@import "./${p}";`)
            .join("\n");
        const foldImports = folds.map((f) => `@import "${f}";`).join("\n");
        const blocks = [header, partialImports, foldImports]
            .filter((b) => b.length > 0)
            .join("\n");
        return sourceDirective
            ? `${blocks}\n\n${sourceDirective}\n`
            : `${blocks}\n`;
    };

    writeFileSync(
        resolve(distStyles, "critical.css"),
        // CRITICAL carries no fold + no @source (those backstop the deferred
        // component utilities) — it is the pure above-the-fold token/ladder/type
        // surface, render-blocking-early.
        buildSubset("CRITICAL", CRITICAL_PARTIALS, [], null),
        "utf-8",
    );
    writeFileSync(
        resolve(distStyles, "deferred.css"),
        // DEFERRED carries the component partials + the SFC-fold +
        // components.css + the @source backstop — the below-the-fold/late-mount
        // tail, loaded non-blocking after first paint.
        buildSubset(
            "DEFERRED",
            DEFERRED_PARTIALS,
            DEFERRED_FOLDS,
            DEFERRED_SOURCE_DIRECTIVE,
        ),
        "utf-8",
    );
}

export function publishStyleAssets(): Plugin {
    return {
        name: "glass-ui:publish-style-assets",
        apply: "build",
        async closeBundle() {
            const root = __dirname;
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

            // AN.W1 — fold the SFC scoped component CSS into the `/styles`
            // bundle so a single `@import "@mkbabb/glass-ui/styles"` carries
            // the COMPLETE stylesheet: the token cascade (this file's @import
            // chain) PLUS the per-component `<style scoped>` payload Vite
            // extracts to `dist/glass-ui.css` (Aurora's `.aurora-root` grid
            // layering, Progress/Slider/etc. scoped rules).
            //
            // The two artefacts sit behind two exports — `./styles`
            // (cascade) and `./styles.css` (SFC scoped). The fold appends an
            // `@import` of the SFC bundle into the dist copy of `index.css`
            // (Shape A): least-invasive, the cascade authoring is untouched,
            // and `./styles.css` stays reachable as a transparent SFC-only
            // export. The `@import` is injected into the DIST copy only —
            // `src/styles/index.css` references no built sibling, so the
            // `proof:theme` source-read stays valid.
            //
            // CSS ordering: the SFC `@import` is inserted before the trailing
            // `@source` at-rule so it sits inside the file's leading @import
            // block (CSS forbids `@import` after a non-import statement). The
            // SFC bundle lives one dir up from `dist/styles/`, hence
            // `../glass-ui.css`.
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

            // P9 — emit glass-ui's own component-utility RULES into
            // dist/styles/components.css and pull it into the dist cascade.
            // Runs AFTER the SFC fold so the `@import "./components.css"` line
            // lands after `@import "../glass-ui.css"` but still inside the
            // leading import block (both before the trailing `@source`). The
            // JS build is already on disk (closeBundle), so the dist/*.js scan
            // sees the full component vocabulary.
            await emitComponentUtilities(root, distStyles);

            // BB.W-CSS-CRITICAL — partition the resolved /styles draw into the
            // CRITICAL above-the-fold subset (dist/styles/critical.css) + the
            // DEFERRED below-the-fold tail (dist/styles/deferred.css) off the
            // CRITICAL_PARTITION manifest. Runs AFTER the SFC-fold +
            // emitComponentUtilities so ../glass-ui.css + components.css exist
            // for the deferred file to @import; BEFORE the font-inline + webkit
            // passes (no-ops on these two pure-@import files). The `./styles`
            // union (index.css) is untouched — this only adds two siblings.
            emitCriticalDeferredSplit(distStyles);

            // Inline every `url(... .woff2)` reference in the published
            // CSS as a base64 data URI sourced from `src/fonts/`. The
            // URL form expected here is the canonical authored shape:
            // `url("@mkbabb/glass-ui/fonts/<family>/<face>.woff2")`.
            // Resolves the relative path against `srcFonts`, encodes,
            // rewrites in place.
            if (!existsSync(distStyles)) return;
            const cssFiles = readdirSync(distStyles).filter((f) =>
                f.endsWith(".css"),
            );
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

            // AY.W-A11Y-PERF O-2a — inject the `-webkit-backdrop-filter` prefix into
            // the SHIPPED dist CSS. The source authors the UNPREFIXED form only (the
            // single-source-of-truth discipline + the Lightning-CSS dedup concern the
            // glass.css policy comment records), so without this pass the shipped
            // `dist/styles/*.css` carries the unprefixed `backdrop-filter` only and a
            // Safari ≤17 engine (which supports ONLY the `-webkit-` form) paints NO
            // blur AND the `@supports not` opaque fallback does NOT fire (Safari 17
            // supports the webkit form, so `@supports not ((backdrop-filter) or
            // (-webkit-backdrop-filter))` is FALSE) — a transparent glass surface with
            // floating text, strictly worse than no-glass. The LIBRARY owns its shipped
            // artefact: this pass emits the prefixed pair at BUILD (the source stays
            // unprefixed; the build adds the pair LAST, so the Lightning dedup never
            // sees both forms in source). For every `backdrop-filter: <v>;` declaration
            // NOT already immediately preceded by a `-webkit-backdrop-filter:`, prepend
            // the prefixed pair with the SAME value. Runs AFTER the cpSync + SFC-fold +
            // component-utility emit + font-inline so it covers the complete shipped
            // cascade. Idempotent (skips a decl already webkit-paired).
            const distCssFiles = readdirSync(distStyles).filter((f) =>
                f.endsWith(".css"),
            );
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
        },
    };
}
