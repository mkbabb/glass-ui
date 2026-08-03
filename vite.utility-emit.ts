import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

import { collectStyleClosure, terminalImportIndex, type StyleClosure } from "./vite.style-fold";

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
 * every glass-ui-component utility silently no-ops. The `@source
 * "../node_modules/@mkbabb/glass-ui"` workaround (AN.W2 Option B) is fragile and
 * fails silently.
 *
 * The root fix: generate ONLY glass-ui's own component vocabulary in glass-ui's
 * OWN build (native theme context — deterministic, NOT a consumer re-derivation
 * — which is what AN.W2 rejected on payload + brittleness grounds) and ship the
 * emitted rules as static CSS in the dist `/styles` cascade. A consumer then gets
 * them without an `@source` glob of its own.
 *
 * THE SUPPORTED CONSUMER CONTRACT is a TAILWIND-BUILD consumer — one whose own
 * Tailwind v4 build imports `@mkbabb/glass-ui/styles` (glass-ui is Tailwind-first
 * by law). That is the contract this emit serves and the only one it can serve:
 * glass-ui's token layer ships as raw `@theme static{}` blocks
 * (`dist/styles/theme/{radius,bridges,literals}.css`), which are Tailwind at-rules
 * a plain-CSS engine drops wholesale, so the `--radius-*` ladder, the type scale,
 * and the font stacks only become `:root` custom properties inside a Tailwind
 * build. What this emit removes is the SCAN dependency (the utility RULES),
 * not the Tailwind dependency. No plain-CSS compile path is claimed.
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
 * leaves them undefined and the utilities silently no-op in the consumer.
 * The fix emits NO `:root{}` block at all (that would re-emit — and risk
 * clobbering — glass-ui's own tokens): every reference to a Tailwind-owned prop
 * that glass-ui does not itself define is rewritten IN PLACE to carry Tailwind's
 * default as its `var()` fallback. A consumer that defines the prop still wins;
 * one that does not paints the default. `rewriteFallbackValue` recurses, so a
 * nested body (`var(--tw-leading, var(--text-base--line-height))`) is covered
 * too — the un-recursed form shipped weightless `transition-*` utilities.
 *
 * Deterministic + byte-stable: the token set is sorted; no timestamps.
 */
export async function emitComponentUtilities(
    root: string,
    distStyles: string,
    closure: StyleClosure = collectStyleClosure(root),
): Promise<void> {
    const dist = resolve(distStyles, "..");
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
    // Arbitrary-PROPERTY setter tokens (`[--overlay-pad-inline:--spacing(6)]`) are
    // legal Tailwind v4 classes, and they are the DEFINITIONS the emitted reader
    // utilities consume (`px-(--overlay-pad-inline)` is emitted fallback-less by
    // construction — the property is glass-ui's own, so the R3 rewrite correctly
    // leaves it alone). `classish` rejects them on sight (they open on `[`), which
    // shipped the readers with nothing anywhere in the cascade setting the value.
    const propertySetter = /^\[--[\w-]+:[^\s]+\]$/;
    const strRe = /["'`]([^"'`\n]*?)["'`]/g;
    const tokens = new Set<string>();
    for (const path of scanPaths) {
        const src = readFileSync(path, "utf-8");
        let m: RegExpExecArray | null;
        while ((m = strRe.exec(src))) {
            for (const part of m[1].split(/\s+/)) {
                const t = part.trim();
                if (!t || t.length > 120) continue;
                if (!classish.test(t) && !propertySetter.test(t)) continue;
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
    // utilities reference, by rewriting each such `var()` to carry Tailwind's
    // default as its fallback. Three sets:
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
    // The fallback set is referenced ∩ themeOwned − glassDefined — i.e. exactly
    // Tailwind's built-in defaults (`--spacing` &c.) that glass-ui does not own.
    const themeOwned = new Map<string, string>();
    const twThemePath = resolve(
        dirname(require_.resolve("tailwindcss/package.json")),
        "theme.css",
    );
    const twKeyframes = new Map<string, postcss.AtRule>();
    if (existsSync(twThemePath)) {
        const twTheme = postcss.parse(readFileSync(twThemePath, "utf-8"));
        twTheme.walkAtRules("theme", (atRule) => {
            atRule.walkDecls((decl) => {
                if (decl.prop.startsWith("--")) {
                    themeOwned.set(decl.prop, decl.value);
                }
            });
        });
        // Tailwind pairs each `--animate-*` token with the `@keyframes` it names,
        // nested in the same `@theme` block. The token alone is inert.
        twTheme.walkAtRules("keyframes", (atRule) => {
            twKeyframes.set(atRule.params.trim(), atRule);
        });
    }

    const glassDefined = new Set<string>();
    const glassKeyframes = new Set<string>();
    for (const path of closure.cssSources) {
        const parsedSource = postcss.parse(readFileSync(path, "utf-8"));
        parsedSource.walkDecls((decl) => {
            if (decl.prop.startsWith("--")) glassDefined.add(decl.prop);
        });
        parsedSource.walkAtRules("keyframes", (atRule) => {
            glassKeyframes.add(atRule.params.trim());
        });
    }

    const referenced = new Set<string>();
    const keptStr = kept.toString();
    const varRe = /var\(\s*(--[a-zA-Z0-9_-]+)/g;
    let v: RegExpExecArray | null;
    while ((v = varRe.exec(keptStr))) referenced.add(v[1]);

    const baseProps = [...referenced]
        .filter((p) => themeOwned.has(p) && !glassDefined.has(p))
        .sort();
    // PKT-1 (value.js P2 P0 / the T-58 clock CONFOUND) — a handful of Tailwind
    // built-in defaults have a HOUSE token that is their real governing value;
    // emit them THROUGH that token (with the Tailwind literal as the fallback)
    // so the dist never CLOBBERS a consumer's own `@theme` alias with a bare
    // literal. `--default-transition-duration` is the one felt-duration axis
    // every `.transition-*` utility reads: routing it through `--duration-fast`
    // means a consumer (or glass-ui's own tempo band) that retunes the house
    // clock governs the emitted utilities instead of fighting a hardcoded 150ms.
    const houseAlias: Record<string, string> = {
        "--default-transition-duration": "var(--duration-fast, 150ms)",
    };
    const fallbackFor = new Map(
        baseProps.map((property) => [
            property,
            houseAlias[property] ?? themeOwned.get(property) ?? "initial",
        ]),
    );
    const rewriteFallbackValue = (value: string): string => {
        let output = "";
        for (let index = 0; index < value.length; index++) {
            if (!value.startsWith("var(", index)) {
                output += value[index];
                continue;
            }
            let depth = 0;
            let end = index;
            for (; end < value.length; end++) {
                if (value[end] === "(") depth++;
                else if (value[end] === ")" && --depth === 0) break;
            }
            const body = value.slice(index + 4, end);
            const comma = body.indexOf(",");
            const property = body.slice(0, comma === -1 ? undefined : comma).trim();
            const fallback = fallbackFor.get(property);
            const authored = comma === -1 ? "" : `,${rewriteFallbackValue(body.slice(comma + 1))}`;
            output += `var(${property}${authored || (fallback ? `, ${fallback}` : "")})`;
            index = end;
        }
        return output;
    };
    kept.walkDecls((decl) => {
        decl.value = rewriteFallbackValue(decl.value);
    });

    // R4 — a `--animate-*` fallback carries an animation-NAME
    // (`.animate-spin{animation:var(--animate-spin,spin 1s linear infinite)}`);
    // without the `@keyframes` behind that name the animation is inert and the
    // spinner renders static. Ship the backing keyframes for every referenced
    // `--animate-*`, skipping any name glass-ui's own cascade already defines.
    // `baseProps` is sorted, so the emission stays byte-stable.
    for (const property of baseProps) {
        if (!property.startsWith("--animate-")) continue;
        const name = (themeOwned.get(property) ?? "").trim().split(/\s+/)[0];
        const frames = name ? twKeyframes.get(name) : undefined;
        if (frames && !glassKeyframes.has(name)) kept.append(frames.clone());
    }

    const header =
        "/* P9 — glass-ui's own component-utility rules, emitted build-\n" +
        "   independently from glass-ui's native @theme so a TAILWIND-BUILD\n" +
        "   consumer paints them with no @source glob of its own. The token\n" +
        "   layer still ships as @theme, so a Tailwind build is the supported\n" +
        "   contract. Generated by vite.style-assets.ts emitComponentUtilities;\n" +
        "   do not hand-edit. */\n";
    writeFileSync(
        resolve(distStyles, "components.css"),
        header + kept.toString() + "\n",
        "utf-8",
    );

    // 4. Pull components.css into the dist cascade after utilities.css and before
    //    the terminal accessibility mode. The src index.css is untouched.
    const distIndex = resolve(distStyles, "index.css");
    if (!existsSync(distIndex)) return;
    const indexSrc = readFileSync(distIndex, "utf-8");
    // LAYERED import (VALUEJS-R D8-1, 2026-07-03): an UNLAYERED components.css lands the bare
    // Tailwind utility corpus (.hidden et al.) at the cascade TAIL in every /styles consumer,
    // beating their own @layer utilities responsive rules (value.js boot-blocked at >=lg).
    // layer(components) is cascade-inert for glass-ui itself (our @layer order is declared
    // upstream in this same index) and restores consumer-cascade sanity.
    const compImport = '@import "./components.css" layer(components);';
    const legacyImport = '@import "./components.css";';
    if (indexSrc.includes(compImport)) return;
    if (indexSrc.includes(legacyImport)) {
        writeFileSync(distIndex, indexSrc.replace(legacyImport, compImport), "utf-8");
        return;
    }
    const sourceAt = terminalImportIndex(indexSrc);
    const comment =
        "/* P9 — component-utility rules (rounded-panel, text-muted-foreground,\n" +
        "   …) shipped build-independently so a Tailwind-build consumer paints\n" +
        "   them without an @source glob of its own. */\n";
    const folded =
        sourceAt === -1
            ? `${indexSrc}\n${comment}${compImport}\n`
            : `${indexSrc.slice(0, sourceAt)}${comment}${compImport}\n\n${indexSrc.slice(sourceAt)}`;
    writeFileSync(distIndex, folded, "utf-8");
}
