import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

import { atSourceIndex } from "./vite.style-fold";

const require_ = createRequire(import.meta.url);

/**
 * vite.utility-emit — the UTILITY-EMIT sub-plugin of publishStyleAssets
 * (BH.B5a-deps-currency god-module carve). Ships glass-ui's own
 * component-utility RULES in the dist `/styles` bundle, build-independently (P9).
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
export async function emitComponentUtilities(
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
