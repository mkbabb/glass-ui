import {
    cpSync,
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

import postcss, { type Container } from "postcss";

import { minifyCss } from "./scripts/lib/minify-css.mjs";
// @ts-ignore — the runtime policy is an intentionally untyped shared ESM leaf.
import { buildEntrySet, CSS_FONT_EXPORTS, readTree } from "./scripts/lib/subpath-policy.mjs";

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

export type StyleClosure = {
    sources: Set<string>;
    copySources: Set<string>;
    cssSources: Set<string>;
    fontSources: Set<string>;
    fontRoots: string[];
    orderedCssSources: string[];
};

function filesUnder(root: string): string[] {
    if (!existsSync(root)) return [];
    return readdirSync(root, { recursive: true })
        .map((path) => resolve(root, path.toString()))
        .filter((path) => {
            try {
                return statSync(path).isFile();
            } catch {
                return false;
            }
        });
}

function resolveSourceReference(from: string, reference: string): string | null {
    const clean = reference.split(/[?#]/, 1)[0];
    if (!clean.startsWith(".")) return null;
    const base = resolve(dirname(from), clean);
    const candidates = [
        base,
        `${base}.css`,
        `${base}.ts`,
        `${base}.js`,
        `${base}.vue`,
        `${base}.svg`,
        `${base}.woff2`,
        `${base}.woff`,
        `${base}.ttf`,
        `${base}.otf`,
        `${base}.png`,
        `${base}.jpg`,
        `${base}.jpeg`,
        `${base}.gif`,
        `${base}.webp`,
        resolve(base, "index.css"),
        resolve(base, "index.ts"),
    ];
    return candidates.find((path) => existsSync(path) && statSync(path).isFile()) ?? null;
}

function isCodeBearingSource(path: string): boolean {
    return /\.(?:vue|jsx?|tsx?|mjs|mts|cjs|cts)$/.test(path);
}

function cssReferences(source: string): string[] {
    const cleaned = source
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/url\(\s*(["'])data:[\s\S]*?\1\s*\)/g, "");
    const references: string[] = [];
    const importPattern = /@import\s+(?:url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)|"([^"]+)"|'([^']+)')/g;
    for (const match of cleaned.matchAll(importPattern)) {
        const reference = match.slice(1).find(Boolean);
        if (reference) references.push(reference);
    }
    const urlPattern = /url\(\s*["']?([^"')\s]+)["']?\s*\)/g;
    for (const match of cleaned.matchAll(urlPattern)) references.push(match[1]);
    return references;
}

function localCssProperties(source: string): { produced: Set<string>; consumed: Set<string> } {
    const parsed = postcss.parse(source);
    const produced = new Set<string>();
    const consumed = new Set<string>();
    parsed.walkDecls((decl) => {
        if (decl.prop.startsWith("--")) produced.add(decl.prop);
        for (const match of decl.value.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)) consumed.add(match[1]);
    });
    return { produced, consumed };
}

type InlineStyle = { id: string; owner: string; source: string };

function inlineStyles(path: string): InlineStyle[] {
    const source = readFileSync(path, "utf8");
    const styles: InlineStyle[] = [];
    let index = 0;
    for (const match of source.matchAll(/^[ \t]*<style\b([^>]*)>([\s\S]*?)^[ \t]*<\/style>/gim)) {
        const attributes = match[1] ?? "";
        if (/\bsrc\s*=/.test(attributes)) continue;
        styles.push({ id: `${path}#style-${index++}`, owner: path, source: match[2] ?? "" });
    }
    return styles;
}

function visitVue(
    path: string,
    visitCss: (path: string) => void,
    visitInlineCss: (style: InlineStyle) => void,
    visitScript: (path: string) => void,
): void {
    const source = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    for (const match of source.matchAll(/<style\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
        const css = resolveSourceReference(path, match[1]);
        if (css) visitCss(css);
        else throw new Error(`${path}: dangling SFC style reference ${match[1]}`);
    }
    for (const style of inlineStyles(path)) visitInlineCss(style);
    for (const match of source.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g)) {
        const reference = match[1] ?? match[2];
        if (!reference.startsWith(".")) continue;
        const target = resolveSourceReference(path, reference);
        if (!target) throw new Error(`${path}: dangling SFC/script reference ${reference}`);
        if (target.endsWith(".css")) visitCss(target);
        else if (/\.(?:vue|ts|js)$/.test(target)) visitScript(target);
    }
}

type FontRoot = { sourceRoot: string; targetPrefix: string };

function declaredStyleRoots(root: string): { cssRoots: string[]; fontRoots: FontRoot[] } {
    const cssRoots: string[] = [];
    const fontRoots: FontRoot[] = [];
    for (const target of Object.values(CSS_FONT_EXPORTS) as string[]) {
        const relativeTarget = target.replace(/^\.\/dist\//, "");
        const wildcard = relativeTarget.indexOf("*");
        if (wildcard !== -1) {
            fontRoots.push({
                sourceRoot: resolve(root, "src", relativeTarget.slice(0, wildcard)),
                targetPrefix: relativeTarget.slice(0, wildcard),
            });
        } else if (relativeTarget.endsWith(".css")) {
            const source = resolve(root, "src", relativeTarget);
            if (existsSync(source)) cssRoots.push(source);
        }
    }
    return { cssRoots: [...new Set(cssRoots)], fontRoots };
}

function declaredFontSource(reference: string, fontRoots: FontRoot[]): string | null {
    const normalized = reference.replace(/^@mkbabb\/glass-ui\//, "");
    for (const { sourceRoot, targetPrefix } of fontRoots) {
        if (!normalized.startsWith(targetPrefix)) continue;
        const candidate = resolve(sourceRoot, normalized.slice(targetPrefix.length));
        if (!candidate.startsWith(`${sourceRoot}/`)) return null;
        return candidate;
    }
    return null;
}

export function collectStyleClosure(root: string): StyleClosure {
    const { cssRoots: declaredCssRoots, fontRoots: declaredFontRoots } = declaredStyleRoots(root);
    const sources = new Set<string>();
    const copySources = new Set<string>();
    const cssSources = new Set<string>();
    const orderedCssSources: string[] = [];
    const fontSources = new Set<string>();
    const addCopySource = (path: string, owner: string): void => {
        if (isCodeBearingSource(path)) {
            throw new Error(`${owner}: code-bearing source cannot be a published style asset ${path}`);
        }
        copySources.add(path);
    };
    const cssNodes = new Map<string, { id: string; owner: string; source: string; file: string | null }>();
    for (const path of filesUnder(resolve(root, "src")).filter((path) => path.endsWith(".css"))) {
        cssNodes.set(path, { id: path, owner: path, source: readFileSync(path, "utf8"), file: path });
    }
    for (const path of filesUnder(resolve(root, "src")).filter((path) => path.endsWith(".vue"))) {
        for (const style of inlineStyles(path)) cssNodes.set(style.id, { ...style, file: null });
    }
    const producers = new Map<string, Set<string>>();
    for (const node of cssNodes.values()) {
        for (const property of localCssProperties(node.source).produced) {
            const paths = producers.get(property) ?? new Set<string>();
            paths.add(node.id);
            producers.set(property, paths);
        }
    }
    const analyzedCss = new Set<string>();
    const publishedCss = new Set<string>();
    const visitCssNode = (
        node: { id: string; owner: string; source: string; file: string | null },
        publish = false,
    ): void => {
        if (!node) return;
        if (node.file && !existsSync(node.file)) throw new Error(`style closure: missing source ${node.file}`);
        const analyze = !analyzedCss.has(node.id);
        const promote = publish && !publishedCss.has(node.id);
        if (!analyze && !promote) return;
        if (analyze) analyzedCss.add(node.id);
        if (promote) publishedCss.add(node.id);
        if (node.file && analyze) {
            sources.add(node.file);
            cssSources.add(node.file);
            orderedCssSources.push(node.file);
        }
        if (node.file && promote) addCopySource(node.file, node.owner);
        if (analyze) {
            for (const property of localCssProperties(node.source).consumed) {
                for (const producer of producers.get(property) ?? []) {
                    const producerNode = cssNodes.get(producer);
                    if (producerNode) visitCssNode(producerNode);
                }
            }
        }
        for (const reference of cssReferences(node.source)) {
            const font = declaredFontSource(reference, declaredFontRoots);
            if (font) {
                if (!existsSync(font)) throw new Error(`${node.owner}: dangling font reference ${reference}`);
                sources.add(font);
                fontSources.add(font);
                if (publish) addCopySource(font, node.owner);
                continue;
            }
            if (/^(?:[a-z][a-z+.-]*:|#|\/\/|\/|var\()/i.test(reference)) continue;
            const target = resolveSourceReference(node.owner, reference);
            if (!target) throw new Error(`${node.owner}: dangling CSS reference ${reference}`);
            sources.add(target);
            if (declaredFontRoots.some(({ sourceRoot }) => target.startsWith(`${sourceRoot}/`))) fontSources.add(target);
            if (target.endsWith(".css")) {
                const targetNode = cssNodes.get(target) ?? {
                    id: target,
                    owner: target,
                    source: readFileSync(target, "utf8"),
                    file: target,
                };
                cssNodes.set(target, targetNode);
                visitCssNode(targetNode, publish);
            } else if (publish) addCopySource(target, node.owner);
        }
    };
    const visitCss = (path: string, publish = false): void => {
        if (!existsSync(path)) throw new Error(`style closure: missing source ${path}`);
        const node = cssNodes.get(path) ?? {
            id: path,
            owner: path,
            source: readFileSync(path, "utf8"),
            file: path,
        };
        cssNodes.set(path, node);
        visitCssNode(node, publish);
    };
    const visitInlineCss = (style: InlineStyle): void => {
        const node = cssNodes.get(style.id);
        if (node) visitCssNode(node);
    };
    const visitingScripts = new Set<string>();
    const visitScript = (path: string): void => {
        if (!path || visitingScripts.has(path) || !existsSync(path)) return;
        visitingScripts.add(path);
        sources.add(path);
        if (path.endsWith(".vue")) {
            visitVue(path, visitCss, visitInlineCss, visitScript);
            return;
        }
        const source = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
        for (const match of source.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g)) {
            const reference = match[1] ?? match[2];
            if (!reference.startsWith(".")) continue;
            const target = resolveSourceReference(path, reference);
            if (!target) throw new Error(`${path}: dangling public reference ${reference}`);
            if (target.endsWith(".css")) visitCss(target);
            else if (/\.(?:vue|ts|js)$/.test(target)) visitScript(target);
            else addCopySource(target, path);
        }
    };
    for (const source of Object.values(buildEntrySet(readTree({ repoRoot: root })).entries) as string[]) {
        visitScript(resolve(root, source));
    }
    for (const path of declaredCssRoots) {
        if (!existsSync(path)) throw new Error(`style closure: declared CSS root is missing ${path}`);
        visitCss(path, true);
    }
    return {
        sources,
        copySources,
        cssSources,
        fontSources,
        fontRoots: declaredFontRoots.map(({ sourceRoot }) => sourceRoot),
        orderedCssSources,
    };
}

export function copyStyleAssets(
    root: string,
    closure: StyleClosure,
    outputRoot: string,
): {
    srcFonts: string;
    distStyles: string;
    distComponents: string;
} {
    const srcStyles = resolve(root, "src/styles");
    const distStyles = resolve(outputRoot, "styles");
    const srcComponents = resolve(root, "src/components");
    const distComponents = resolve(outputRoot, "components");
    const sourceFonts = resolve(root, "src/fonts");
    const copyFilter = (sourceRoot: string) => (source: string): boolean => {
        if (source === sourceRoot || closure.copySources.has(source)) return true;
        if (!existsSync(source)) return false;
        if (!statSync(source).isDirectory()) return false;
        return [...closure.copySources].some((candidate) => candidate.startsWith(`${source}/`));
    };
    cpSync(srcComponents, distComponents, { recursive: true, filter: copyFilter(srcComponents) });
    cpSync(srcStyles, distStyles, { recursive: true, filter: copyFilter(srcStyles) });
    cpSync(sourceFonts, resolve(outputRoot, "fonts"), {
        recursive: true,
        filter: copyFilter(sourceFonts),
    });
    const srcFonts = closure.fontRoots[0];
    if (!srcFonts) throw new Error("style closure: no declared font export root");
    return { srcFonts, distStyles, distComponents };
}

/** Every `.css` under each root — a root may be a directory to walk or a single file. */
function cssFilesUnder(...roots: string[]): string[] {
    return roots.flatMap((root) => {
        if (!existsSync(root)) return [];
        if (statSync(root).isFile()) return root.endsWith(".css") ? [root] : [];
        return filesUnder(root).filter((path) => path.endsWith(".css"));
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
    const sfcBundle = resolve(dirname(distStyles), "glass-ui.css");
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
 * WHY BOTH LEGS, EMITTED AT BUILD: Safari ≤17 implements the webkit-only form, so
 * the shipped policy is that every backdrop declaration carries both — including
 * `backdrop-filter: none` resets — rather than a source-side `@supports` restatement
 * (the collapsed capability ladder, `glass/a11y-fallback.css`). The lexical minifier
 * is prefix-blind and preserves the normalized pair; the shipped bytes are asserted
 * by G-GLASS-HAS-FROST arm (b) in `tests/styles/backdrop-prefix-normalization.test.ts`.
 */
export function normalizeBackdropFilterPairs(css: string): string {
    const stylesheet = postcss.parse(css);

    const normalizeContainer = (container: Container) => {
        for (let index = 0; index < (container.nodes?.length ?? 0); index++) {
            const node = container.nodes?.[index];
            if (
                !node ||
                node.type !== "decl" ||
                (node.prop !== "backdrop-filter" && node.prop !== "-webkit-backdrop-filter")
            ) {
                continue;
            }

            const next = container.nodes?.[index + 1];
            if (
                node.prop === "-webkit-backdrop-filter" &&
                next?.type === "decl" &&
                next.prop === "backdrop-filter" &&
                next.value === node.value &&
                next.important === node.important
            ) {
                index++;
                continue;
            }

            if (
                node.prop === "backdrop-filter" &&
                next?.type === "decl" &&
                next.prop === "-webkit-backdrop-filter" &&
                next.value === node.value &&
                next.important === node.important
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
    };

    normalizeContainer(stylesheet);
    stylesheet.walk((node) => {
        if (node.type === "rule" || node.type === "atrule") {
            normalizeContainer(node);
        }
    });

    return stylesheet.toString();
}

/**
 * normalizeShippedBackdropPairs — apply the pass in place over the emitted CSS.
 * Each path is a directory (walked for `.css`) or a single `.css` file.
 */
export function normalizeShippedBackdropPairs(...paths: string[]): void {
    for (const path of cssFilesUnder(...paths)) {
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
