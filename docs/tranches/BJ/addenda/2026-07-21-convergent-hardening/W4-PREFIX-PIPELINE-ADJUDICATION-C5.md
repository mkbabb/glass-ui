# W4 prefix-pipeline adjudication C5

Date: 2026-07-22  
Scope: exact producer mechanism behind the C4 Value spectrum reset failure  
Disposition: **three-pass design converged; folds into MATERIAL W4 emitter/package law; no new row**

## Correction to the causal account

`W4-VALUE-CASCADE-ADJUDICATION-C4.md` (`3126040131025328…`) correctly proves that both public entries
reach a root SFC bundle missing the unprefixed spectrum reset and that the current copy-owned post-process
does not touch that root. C5 sharpens the mechanism: merely adding root `dist/glass-ui.css` to the current
injector would not fix it. The source declaration order triggers Lightning CSS to delete the unprefixed
leg before the publisher runs, and the one-way injector cannot reconstruct a prefix-only declaration.

This conclusion survived the local source/dist parser census, an independent pipeline-owner audit, and a
separate minifier/configuration challenge. No product, test, gate, package or lock byte was edited.

## Exact reproduction

Vite 8.1.5 uses Lightning CSS for production CSS minification. `vite.targets.ts:4-10` targets Chrome/Edge
120, Firefox 114, Safari/iOS 16.4. Direct Lightning CSS 1.32 transformation under those exact targets
produces:

```text
backdrop-filter:none;-webkit-backdrop-filter:none
  → -webkit-backdrop-filter:none

backdrop-filter:none
  → -webkit-backdrop-filter:none;backdrop-filter:none
```

This agrees with Lightning CSS's documented target-driven vendor-prefix ownership: source stays clean and
non-repetitive; the transformer adds the target prefixes. There is no cssnano/PostCSS configuration causing
this loss. Glass's later lexical minifier cannot remove a declaration.

Seven live source declarations violate the repository's existing unprefixed-only policy:

| source | live vendor declaration |
| --- | --- |
| `src/components/slider/Slider.vue` | line 504 |
| `src/components/timeline/GlassTimeline.vue` | lines 192 and 202 |
| `src/components/timeline/SegmentedTimeline.vue` | line 192 |
| `src/components/timeline/ScrubberTimeline.vue` | line 381 |
| `src/components/dock/styles/adaptive-legibility.css` | line 128 |
| `src/components/tabs/styles/segmented.css` | line 215 |

Parsed current `dist/glass-ui.css` (`17d88d73…`) contains ten backdrop-bearing rules: five correct pairs
from unprefixed-only inputs and five prefixed-only rules exactly corresponding to the five SFC manual-pair
declarations. The copy-owned `dist/components/**` tree contains the inverse defect for the two raw CSS
inputs: the injector prepends another prefix, yielding `webkit; standard; webkit` triples. Current
`vite.style-assets.ts` is `28f152d1…`; `vite.style-fold.ts` is `71b074db…`.

## One-owner transform law

The Luna W4 cut must make the ownership boundary explicit:

1. **Source owns only the unprefixed declaration.** Delete all seven live vendor declarations. A
   syntax-aware source census requires zero production `-webkit-backdrop-filter` declarations/writers in
   Vue style blocks, CSS and TS/JS/static-style channels. Comments, policy prose and `@supports` params are
   not declarations. A raw sentinel catches unparsed roots without misclassifying prose.
2. **Vite/Lightning owns the root SFC transform.** `dist/glass-ui.css` is never run through a second
   prefix injector or lexical minifier. In the C3 post-ordered `writeBundle`, require nonempty current
   bundle output and disk equality, parse it, and require exactly one adjacent canonical pair—prefixed
   first, unprefixed second, same value and importance—for every backdrop declaration.
3. **Glass's copy publisher owns raw copied CSS.** `injectWebkitBackdrop` remains one-way and applies only
   to copied `dist/styles/**` and `dist/components/**` before the conservative lexical minifier. Afterward,
   parse and require the same exact-pair law. No duplicate, reverse, value-mismatched or single-leg output
   is admitted.
4. **The emitter owns the manifest last.** Fold the exact `component-styles.css` writer into the single
   `publishStyleAssets()` lifecycle after root/current-output and copied-output validation; remove the
   standalone post-build generator call. Canonical, clean iter, first/subsequent watch and pack therefore
   share one writer and one order.
5. **The graph gate owns occurrences, not transforms.** Validate each physical output once by real path,
   then prove `/styles` and `/styles.css` separately reach the same valid root exactly once in their
   occurrence-aware import graphs. Never rewrite the shared root once per consumer occurrence.

Do not disable Lightning CSS, exclude vendor-prefix features, reorder source pairs, add a symmetric
post-hoc root repair, or inject declarations into aggregate import files. Those approaches broaden build
semantics, preserve split source ownership, or can mask the born-RED defect.

## Born-RED mutation matrix

| id | isolated mutation | required failure |
| --- | --- | --- |
| P1 | restore Slider's vendor declaration after the unprefixed reset | source-prefix census and root pair validator |
| P2 | restore each timeline vendor declaration independently | named source site plus prefixed-only root rule |
| P3 | restore dock or tabs raw vendor declaration | named source site plus copied-output duplicate pair |
| P4 | reorder a manual pair to vendor-first | source-prefix census, even if Lightning output happens to retain both |
| P5 | remove Safari/iOS 16.4 from `glassCssTarget` or suppress target prefix generation | root exact-pair validator |
| P6 | omit root `glass-ui.css` validation while copied trees remain valid | exported-root omission detector |
| P7 | omit copied-tree injection or validation while root remains valid | copied-output exact-pair detector |
| P8 | change pair value, importance, adjacency or order; add a third duplicate | parsed exact-pair diagnostic |
| P9 | pass source text but emit prefixed-only packed root | built/packed/installed graph plus browser sentinel |
| P10 | restore post-build-only manifest generation | clean iter/first-watch missing-export detector |
| P11 | delete, duplicate, swap or redirect either root import | per-entry occurrence graph diagnostic |
| P12 | retain the Value private-selector shim while producer bytes are malformed | producer remains RED despite masked receiver |
| P13 | add Vite-owned root `glass-ui.css` to the publisher transform set | physical-artifact ownership-partition detector |
| P14 | inject a declaration into an `@supports` prelude | parsed query-integrity detector |

Run these after clean full build, clean iter build, first watch build plus rebuild, and extracted pack. The
C4 Chromium/actual-Safari active-blur sentinels and four entry/property cells remain required. This C5
design authorizes no source edit until a declared Luna x-high seat owns the bounded cut and no package,
browser or Value acceptance before immutable installed Glass 8.
