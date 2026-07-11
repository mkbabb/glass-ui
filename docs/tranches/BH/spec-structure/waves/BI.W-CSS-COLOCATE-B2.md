# BI.W-CSS-COLOCATE-B2 — the gate reader-corpus re-point + the corpus-root widen

> **Wave id:** `BI.W-CSS-COLOCATE-B2` · **band:** S2 (CSS — ATOM B) · **class:** `H` (device-free) · **gate:**
> `proof:css-colocation` (SOURCE-reader arm + the `STYLE_CORPUS_ROOTS` widen) + `proof:css-ownership` ·
> **preconds:** BI.W-CSS-COLOCATE-B1. This is riskiest-wave #2 — subtle, wide (without B2 the close is RED on
> ~81 gates). Runs SOLO (batch B6).

## §0 — Verdict

B1 moved the files byte-identically; B2 is the load-bearing MIGRATION COST — every gate hardcoding a MOVABLE
component-CSS `src/styles` path (path-const + `@import`-specifier regex + self-test fixture + cosmetic message)
re-points to the colocated path, PLUS a shared corpus-root constant closes the tree-walker blind spot in ONE
seam. The round-6 adjudication REPLACED the round-5 "locator-leaf DEFER" with this MECHANICAL rewrite + the
corpus-root (the locator leaf is a hard REJECT: phantom 2nd consumer; strictly-greater first-move cost + a new
gate; amortization denominator ≈ 0; the no-legacy edict forbids the indirection).

## §1 — (i) The mechanical per-family path/specifier re-point

Every gate hardcoding a MOVABLE component-CSS `src/styles` path re-points to the colocated path. Measured over
the 3-family mover slice: **17 edit sites across 8 gates** (border-progress 4, completion-seal 5, configurator 8)
— corroborating the ~21-hardcode/13-gate order of magnitude. The blast radius is a ONE-TIME bounded codemod:

- **238 path-const line-sites total, 176 of them the DOCK family** (133 `dock/` partials + 26 `dock.css` sites +
  17 `dock-controls`) = ONE uniform `src/styles/dock/ → src/components/dock/styles/dock/` pass verified by the
  ~50 dock gates;
- the non-dock remainder is 62 path sites + ~15 specifier sites across 39 gates, each family carrying its OWN gate
  that goes born-RED (path ENOENT) → GREEN after re-point.

After the cut the paths are STABLE — no recurring maintenance to amortize.

## §2 — (ii) The shared CORPUS-ROOT constant widen (the sound factoring)

The genuine correctness hole: FOUR tree-walkers root on `walk("src/styles")` ONLY and, post-colocation, develop a
blind spot (a layout-animation planted in the moved `dock/morph.css` would ESCAPE `proof:no-layout-animation`):
`proof-ba-animate.mjs`, `proof-motion2`, `proof-motion-demo`, `proof-affordance-map`. **The round-5 "5
tree-walkers" is CORRECTED to 4** — `proof-no-layout-animation.mjs:286` ALREADY walks `src/components/**/*.css`
and does NOT regress.

Adopt `scripts/lib/style-corpus.mjs` exporting `STYLE_CORPUS_ROOTS = ['src/styles', 'src/components']` (with a
`.css` filter), imported by the 4 blind-spot walkers AND by the build's `cpSync`/`readdir` widen — closing the
blind-spot in ONE seam instead of 4 (the SOTA-idiomatic factoring: ESLint flat-config glob `files:[...]`,
stylelint `**/*.css`, Vite `@import`-graph resolution — never a hand-maintained component→path map).
`gates.manifest.mjs` and `no-masking-manifest.mjs` hardcode `src/styles/dock/*` and update in the SAME pass.

## §3 — (iii) The BASENAME-keyed manifest readers (blocker-fold #7)

The B2 census greps `src/styles`-PATH literals → it structurally MISSES a gate keyed by BARE BASENAME. The
load-bearing case: `src/styles/critical-partition.mjs` (`CRITICAL_PARTIALS`/`DEFERRED_PARTIALS` name the MOVING
single-owner sheets by basename — `border-progress.css`, `select.css`, `drawer.css`, `completion-seal.css`,
`hover-popover.css`, `glass-refract.css`, `dock.css`, `configurator.css`, `segmented-tabs.css`, …) + its consumer
`proof-css-critical.mjs`. NAME both in the B2 corpus. The EMISSION side is colocation-safe by construction
(`vite.style-assets` emits `@import "./${basename}"`, the B1 walk preserves dist basenames), so the partition
does not move — BUT the cut MUST confirm `proof-css-critical`'s `index.css` byte-COMPLETENESS parse extracts
partial identity by BASENAME, not by full `@import` specifier (a specifier-keyed parse false-REDs the instant B1
rewrites `@import "./border-progress.css"` → the colocated path). *(The one-line cut-time confirmation is a clause
of BI.W-DIFFERENTIAL-CLOSE.)*

## §4 — Binding criteria (born-RED → GREEN)

- Born-RED: the 39 non-dock family gates + the ~50 dock gates read the retired `src/styles/<name>.css` paths
  (ENOENT after B1).
- GREEN: `proof:css-colocation` SOURCE-reader arm asserts NO gate reads a colocated CSS by its retired
  `src/styles/<name>.css` path; the corpus-root widen assertion (the 4 blind-spot walkers import
  `STYLE_CORPUS_ROOTS`); `proof:css-ownership` (every `src/styles/*.css` that STAYS global names its single owner
  via `README OWNER:` — prototyped 5/5).

## §5 — Fences

- The locator-leaf is NOT resurrected (hard REJECT). Re-run the mechanical codemod (re-runnable) if a 2nd
  placement move is ever contemplated.
- The basename-keyed critical-partition parse CONFIRMATION is BI.W-DIFFERENTIAL-CLOSE's (this wave NAMES the
  manifest in the corpus; the differential confirms the parse).
- ZERO paint change (the dist cascade is byte-identical from B1).

## §6 — Cross-refs

§2.6 (B2 + R6-2); blocker-fold #7 (basename-keyed); R6-FOLD directive #4; §9.6.
