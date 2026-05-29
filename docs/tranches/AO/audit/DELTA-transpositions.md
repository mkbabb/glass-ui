# AO audit — lane DELTA: architectural transpositions

Read-only survey. Candidates are root structural moves for elegance, simplicity, and
performance — no workarounds, no legacy shims. Ranked by load-bearing-ness. Built on
GAMMA + BETA sibling findings (not re-derived).

Measurements taken at HEAD (`vite@8.0.13` / Rolldown, `vue-tsc@3.3.1`, `typescript@6.0.3`):

- `vite build` (no heap prefix): **547 MB peak RSS, ~1 s**, exit 0.
- `vue-tsc --project tsconfig.build.json` (emit-types, no prefix): **739 MB peak RSS**, exit 0.
- `dist/glass-ui.js` (gated): 36_479 raw / **8_632 gzip** — 25.6% of the 33_700 gzip cap (**~25 KiB gzip slack**).
- `dist/glass-ui.css` (gated): 43_090 raw / **7_805 gzip** — 90.2% of the 8_650 gzip cap (**~845 B gzip slack**).

---

## Ranked candidate table

| # | Prio | Candidate | CSS-budget-relevant | Gain axis | AO wave |
|---|------|-----------|---------------------|-----------|---------|
| D1 | P0 | The budget gate measures the WRONG CSS artifact | YES (root cause) | correctness/perf | AO W1 |
| D2 | P0 | iter-build / canonical build fight over `dist/` (dist-wipe footgun) | YES (causes D1) | simplicity/correctness | AO W1 |
| D3 | P0 | Drop the `--max-old-space-size=8192` prefix (4 sites) + resync §Build | no | simplicity | AO W1 |
| D4 | P1 | Re-base the CSS budget against the artifact a consumer actually downloads | YES | correctness | AO W2 (after D1/D2) |
| D5 | P1 | Per-subpath cap enforcement (promote the reported table to a gate) | partial | perf-guard | AO W2 |
| D6 | P2 | Token-cascade tree-shake audit (`@theme` / `@utility` consolidation) | YES | perf | AO W3 |
| D7 | P2 | Collapse the 76-entry `src/<flat>.ts` mirror layer | no | simplicity | AO W3 |

---

## D1 — P0 — the budget gate measures the wrong CSS artifact (the binding-constraint root cause)

**WHAT.** `profile:budget` runs `iter-build` then measures `dist/glass-ui.css`. But
`dist/glass-ui.css` is ONLY the Vite-extracted SFC-scoped component CSS (`.glass-slider`,
`.metric-row`, `.glass-carousel`, … — 7_805 gzip at HEAD). It is NOT what a consumer
downloads. A consumer does `@import "@mkbabb/glass-ui/styles"`, which resolves to
`dist/styles/index.css` — the token cascade — which in turn `@import "../glass-ui.css"`
(the AN.W1 fold). The real consumer-facing stylesheet is `index.css` (2_441 gzip) **plus**
the folded SFC bundle (7_805 gzip) = **~10_202 gzip combined**, before the inlined font
corpus on the separate `/styles/fonts` path. The gate's "90.2% of budget / 845 B slack"
is a number about a fragment the consumer never imports in isolation.

**WHY.** The whole point of a gzip budget is to gate the bytes a consumer pays. The gate
currently gates the SFC sub-bundle and is blind to the token-cascade half. A regression in
`tokens.css` / `theme.css` / `utilities.css` (the cascade arm) does not move the gated
number at all — those files are tree-shaken into `index.css` by Tailwind, never into
`glass-ui.css`. The binding constraint GAMMA flagged is real, but it is being measured on
the wrong file: the true consumer draw is ~10.2 KiB gzip, not 7.8.

**IMPACT.** Make the gate measure the resolved `/styles` artifact (the post-fold
`dist/styles/index.css` with its `@import` graph flattened, or the concatenation the
consumer's bundler produces). This requires the canonical build (with `publishStyleAssets()`)
to have run — which is exactly D2's fix. Once D1+D2 land, the gate reflects reality and the
budget can be re-based against it (D4).

**RISK.** Low-medium. The measurement must flatten `@import` (resolve `index.css` +
`glass-ui.css`); a naive `gzip dist/styles/index.css` reads 2_441 and misses the fold. Use a
post-build concatenation of the import graph, or measure the two files' combined gzip.

---

## D2 — P0 — iter-build wipes `dist/styles`; the gate leaves dist half-built

**WHAT.** `vite.iter.config.ts` carries only `[tailwindcss(), vue()]` — it omits
`publishStyleAssets()`. Vite's `emptyOutDir` defaults true for an `outDir` inside the
project root, so every `iter-build` (and therefore every `profile:budget` run, which shells
`iter-build`) WIPES `dist/` and never recreates `dist/styles/`, `dist/fonts/`, or the folded
`/styles` bundle. After `profile:budget`, `dist/` is missing the entire styles+fonts
publication. The orchestrator works around this by re-running the canonical `build` last —
a manual ordering constraint that should not exist.

**WHY.** Two build configs that write the same `dist/` with different completeness is a
footgun, not a design. The clean gestalt is one of:
- (a) Fold `publishStyleAssets()` into a shared plugin list both configs consume, so
  iter-build produces the SAME `dist/` shape as canonical (just without dts). Then iter-build
  and the gate never leave a half-built tree, D1's measurement target always exists, and the
  re-run-build-last workaround dissolves.
- (b) Give iter-build a separate `outDir` (e.g. `dist-iter/`) so it physically cannot stomp
  the canonical `dist/`. The gate then measures the canonical `dist/` (built once) and never
  races.

(a) is the more idiomatic move — iter-build's only legitimate divergence from canonical is
skipping the slow dts arm; the styles/fonts publication is cheap (`cpSync` + regex) and
belongs in both. Then `iter-build` becomes "canonical build minus dts," a clean subset.

**IMPACT.** Removes the manual "re-run build last" ordering. Makes `profile:budget` leave a
complete, shippable `dist/`. Unblocks D1 (gate has a real artifact to measure).

**RISK.** Low. `publishStyleAssets` is idempotent (guards on `existsSync` + `includes`).
Sharing it adds ~50 ms to iter-build (`cpSync` of `src/styles` + font inlining).

---

## D3 — P0 — drop the `--max-old-space-size=8192` heap prefix (GAMMA handoff)

**WHAT.** The prefix lives at 4 enforcing sites — `package.json` `build` + `build:watch`,
`scripts/release.sh:81`, `.github/workflows/release.yml:31` (plus a stale comment at
`ci.yml:14`/`:40`). It was provisioned for the old `vite-plugin-dts` + `api-extractor`
toolchain whose per-entry type-graph walk peaked ~6.7 GB. That toolchain is GONE — deps
show zero `api-extractor` / `vite-plugin-dts`; dts is now emitted by
`vue-tsc --project tsconfig.build.json`. Measured at HEAD: vite-build arm 547 MB RSS,
emit-types arm 739 MB RSS — both an order of magnitude under Node's default ~4 GB old-space
heap. The prefix is pure dead weight.

**WHY.** Self-documenting build scripts. The `CLAUDE.md` §Build paragraph still narrates the
retired api-extractor / 6.7-GB story as the "documented baseline" — stale canon that
misleads anyone reading the build contract. Greenfield voice: there is no api-extractor
history to preserve.

**IMPACT.** Delete the prefix at all 4 sites; rewrite the §Build paragraph to describe the
`vue-tsc` dts arm and the real ~740 MB / ~7 s envelope. Cheap, but load-bearing for
doc-truth — the build contract is currently a fiction.

**RISK.** Very low. Verified both arms run clean with the prefix removed.

---

## D4 — P1 — re-base the CSS budget against the real consumer artifact

**WHAT.** Once D1+D2 land and the gate measures the resolved `/styles` bundle (~10.2 KiB
gzip combined), the current 8_650 ceiling is meaningless (it was set against the 7.8-KiB SFC
fragment). Re-base ONCE against the true draw, with the canonical ~10% headroom, and stop
the N.W0 → P.W0 → P.W3 → Q.W4 "bump-at-every-close" cadence the script's comment block
documents — that cadence is a symptom of the gate never measuring the thing that actually
grows (the cascade arm).

**WHY.** The budget should track what ships. The bump-chain in `profile-bundle.mjs` (five
re-baselines) is the gate chasing a fragment while the real bytes drift untracked.

**IMPACT.** A principled single re-base against the resolved bundle; the cascade arm becomes
visible to the gate, so future cascade regressions actually trip it.

**RISK.** Low. Pure threshold + measurement-target change. Sequence AFTER D1/D2.

**CSS-budget-relevant: this IS the binding-constraint resolution.**

---

## D5 — P1 — enforce per-subpath caps (promote the reported table to a gate)

**WHAT.** `profile-bundle.mjs` already computes the full per-subpath gzip table
(`subpathEntries`, written to `W4-subpath-sizes.md`) but it is "reported not enforced"
(GAMMA). There is no glass-ui-side equivalent of muster's per-critical-path gate. A subpath
like `aurora` (a standalone ~16 KiB WebGL chunk) could regress silently.

**WHY.** The 76-entry split exists precisely so a consumer pays only for what they import. A
budget on the root barrel does not protect any individual subpath. Per-subpath caps make a
regression NAME the offending chunk.

**IMPACT.** Add a `subpathBudgets` map (or a per-entry % drift threshold against the last
artifact) to the enforce path. Start with caps on the heavy entries (`aurora`, `dock`,
`configurator`, `command`) rather than all 65.

**RISK.** Medium — too many hard per-entry caps becomes noise. Mitigate with a drift-%
threshold against the committed `W4-bundle-profile.json` baseline rather than absolute caps,
so the gate flags relative regressions, not arbitrary ceilings.

---

## D6 — P2 — token-cascade tree-shake / `@theme`+`@utility` consolidation

**WHAT.** Source `tokens.css` is 84.9 KB (26 KiB gzip) and `utilities.css` 37.7 KB
(10.4 KiB gzip), but Tailwind tree-shakes both into the consumer's `index.css` against
actual `@theme`/`@utility` usage. The question is whether the cascade declares rungs/utilities
with no consumer that survive into the shipped bundle. This is the CSS-headroom reclamation
GAMMA flagged — but the gain is only realized once D1 makes the cascade arm measurable.

**WHY.** Reclaim gzip headroom without losing canon: dedup duplicated declarations,
consolidate adjacent `@utility` recipes, retire any rung with zero consumers (per the
visual-load-bearing-ness invariant). Token duplication between the SFC bundle and the
cascade is already minimal (12 vars in the SFC bundle vs 405 in tokens.css — no meaningful
overlap), so the gain is in the cascade itself, not the fold.

**IMPACT.** Modest gzip reclamation on the cascade arm. Sequence AFTER D1 so the win is
measurable.

**RISK.** Medium — must run the overfitting audit (`docs/audits/overfitting-audit.md`) to
confirm a rung has zero consumers before retiring it. Per-rung measurement (D1's per-file
gzip already exists for source files) lets a regression name the offending file.

---

## D7 — P2 — collapse the 76-entry `src/<flat>.ts` mirror layer

**WHAT.** Every subpath is a one-line `src/<flat>.ts` doing `export * from "./components/<dir>"`
(`button.ts`, `card.ts`, … 76 entries in `libraryEntries`). This mirror layer exists so
Vite's `lib.entry` map has a flat target per subpath. It is mechanical boilerplate kept in
sync by hand with `package.json` exports + `typesVersions`.

**WHY.** Simplicity — three parallel lists (the `src/<flat>.ts` files, `libraryEntries`,
`package.json` exports) must agree. A single generated source (one manifest → derives entries
+ exports + typesVersions) removes the drift class. But this is a refactor of generated-glue,
not a perf or correctness win, and the per-subpath split is load-bearing (do not collapse the
DIST split, only the AUTHORING boilerplate).

**IMPACT.** A `subpaths.config.ts` manifest consumed by `vite.library.ts` and a
`package.json` exports generator. Removes hand-sync drift.

**RISK.** Medium — touches the publication contract; must keep `verify-export-types` +
`proof:resolution` green. Lowest priority; defer unless drift actually bites.

---

## Summary — CSS-budget relevance (the binding constraint)

The binding constraint (GAMMA: glass-ui.css at 90.2% gzip) is, on inspection, a
**mis-measurement**, not a genuine ceiling crunch:

- **D1** (gate measures the wrong artifact) is the ROOT — the 845-B slack is computed on a
  7.8-KiB SFC fragment, while the real consumer draw is ~10.2 KiB gzip combined.
- **D2** (dist-wipe footgun) is why D1 persists — iter-build never leaves the folded artifact
  in `dist/` for the gate to measure.
- **D4** re-bases the budget against the real artifact once D1/D2 land.
- **D6** reclaims cascade headroom, but only becomes measurable after D1.

D3 (heap prefix) is the cheap standalone GAMMA handoff — orthogonal to CSS, pure
simplicity/doc-truth.

P0 cluster (D1+D2+D3) is one coherent AO W1: fix the build/gate so it measures reality and
sheds the dead heap prefix. Everything downstream (D4/D6) depends on it.
