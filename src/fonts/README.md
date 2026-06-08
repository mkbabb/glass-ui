# `src/fonts/` — self-hosted woff2 assets

glass-ui ships its brand register as bundled OFL-1.1 woff2 assets so consumers
self-host via the `@mkbabb/glass-ui/styles/fonts` export rather than re-fetching
from a CDN on every page-load.

## The register

| Family | Role | Axes | `@font-face` |
|--------|------|------|--------------|
| Plus Jakarta Sans | brand TEXT + display (body, headings, prose, display) | wght 200–800 | `font-display: optional` |
| Fira Code | canonical mono (admin labels, code, tabular numerics) | wght 300–700 | `font-display: swap` |

The library DEFAULT body/display register IS Plus Jakarta Sans (`--font-text` /
`--font-display`), with Fira Code on `--font-mono` — no preset opt-out, no
off-canon face. The `.cm-serif` / `text-math` math voice rides a distinct system
serif (`--font-serif`: Georgia/Times), which a consumer overrides if it ships
its own math face.

## On-disk layout

Per-family nested, subset-split (latin + latin-ext):

```
src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2
src/fonts/plus-jakarta-sans/plus-jakarta-sans-latin-ext.woff2
src/fonts/fira-code/fira-code-latin.woff2
src/fonts/fira-code/fira-code-latin-ext.woff2
```

Source canonical: Plus Jakarta Sans
<https://github.com/tokotype/PlusJakartaSans> (OFL-1.1); Fira Code
<https://github.com/tonsky/FiraCode> (OFL-1.1). Both are the variable woff2
latin/latin-ext subsets from the Google Fonts / fontsource distribution.

## How the faces reach a consumer

`src/styles/fonts.css` declares each `@font-face` with a
`url("@mkbabb/glass-ui/fonts/<family>/<face>.woff2")` package-specifier `src`.
At publish the `publishStyleAssets` build plugin base64-inlines each woff2 into
the emitted `dist/styles/fonts.css`, so the corpus travels INSIDE the off-critical
async CSS the consumer imports via `@mkbabb/glass-ui/styles/fonts` — no separate
woff2 fetch crosses the package boundary. The Capsize-calibrated `local()`
fallback faces (`"Plus Jakarta Sans Fallback"` / `"Fira Code Fallback"`) live in
`typography.css` on the critical path and hold the metrics during the
`font-display` window so the swap is geometry-neutral (zero CLS).

## Consumer self-host recipe

A consumer that wants the faces without the `/styles/fonts` bundle imports them
directly off the published export:

```css
@import "@mkbabb/glass-ui/styles/fonts"; /* the base64-inlined face corpus */
```

The exact URL resolution mechanism (bundler-managed asset graph, `?url` async
link, or direct import) is consumer-side; glass-ui guarantees the deterministic
file location inside the published tarball + the `@font-face` family names
(`"Plus Jakarta Sans"`, `"Fira Code"`).
