import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import type { Plugin } from "vite";

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
 * `:root,:host` `@theme` var block — glass-ui already ships BOTH (tokens.css +
 * theme.css), so we keep ONLY: the `@layer utilities` rules (flattened), the
 * `@property --tw-*` declarations, and the `@supports` block that initializes
 * `--tw-*` vars (the var machinery border/duration/etc. utilities reference).
 * The base reset and theme var block are dropped.
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

    const header =
        "/* P9 — glass-ui's own component-utility rules, emitted build-\n" +
        "   independently from glass-ui's native @theme so a bare consumer\n" +
        "   (no @source glob) paints them. Generated by\n" +
        "   vite.style-assets.ts emitComponentUtilities; do not hand-edit. */\n";
    writeFileSync(
        resolve(distStyles, "components.css"),
        header + kept.toString() + "\n",
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
    const sourceAt = indexSrc.indexOf("@source");
    const comment =
        "/* P9 — component-utility rules (rounded-panel, text-muted-foreground,\n" +
        "   …) shipped build-independently so a bare consumer paints them. */\n";
    const folded =
        sourceAt === -1
            ? `${indexSrc}\n${comment}${compImport}\n`
            : `${indexSrc.slice(0, sourceAt)}${comment}${compImport}\n\n${indexSrc.slice(sourceAt)}`;
    writeFileSync(distIndex, folded, "utf-8");
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
                    const sourceAt = indexSrc.indexOf("@source");
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
        },
    };
}
