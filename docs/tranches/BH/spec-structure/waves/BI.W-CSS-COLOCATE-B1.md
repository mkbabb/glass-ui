# BI.W-CSS-COLOCATE-B1 — CSS colocation, the byte-identical file-move + widened walk

> **Wave id:** `BI.W-CSS-COLOCATE-B1` · **band:** S2 (CSS — ATOM B) · **class:** `H` (device-free) · **gate:**
> `proof:css-colocation` (target-uniqueness + subtree-copy UNIT + T1b no-double-emit + zero-scoped-id-collision) ·
> **preconds:** BI.W-FLATTEN-MOVE. Sequenced AFTER ATOM A (ATOM B is orthogonal; `src/styles` untouched by A).
>
> B1 = file-move + widened-walk + colocated-source @imports + walk-flatten. PROVEN byte-identical end-to-end on a
> running demo dev-server (`diff -rq golden dist/styles` EXIT 0; `dist/styles/index.css` sha `675249ea`
> IDENTICAL golden==new; 106==106 files).

## §0 — Verdict

Component-SPECIFIC CSS in the global `src/styles/` tree is a colocation miss vs SOTA (Vuetify colocates
`VBtn.sass`). The file MOVES to its component; the CASCADE ORDER stays global — `index.css` remains the SINGLE
inter-component ordering authority, rewriting each moved `@import` to the honest on-disk SOURCE path. The
published `dist/styles/` cascade is byte-identical. The Vite-dev-alias option is DROPPED (dominated by the
file-move).

## §1 — Placement (T4-consistent, DECIDABLE by the ≥2-family CSS test)

A cascade sheet colocates IFF it is a SINGLE-OWNER sheet (exactly one family reads its rules); it STAYS in
`src/styles/` IFF it is a cross-family SHARED register (≥2 unrelated families):

- **Colocate — single sheet → ROOT SIBLING** `components/<n>/<n>.css` (~10 families: border-progress, drawer,
  select, sheet, completion-seal, hover-popover, floating-panel[single-owner arm], card-scroll, glass-refract,
  cards[single-owner arm]).
- **Colocate — multi-partial → `components/<n>/styles/`** carrying the top sheet + its own-subdir partials (dock
  keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`; tabs, instrument-chassis, configurator).
- **Stay module-level** (cross-family shared register): `menu.css` (5 picker families), `feedback-tone.css`
  (Toast/Notification/Alert), `floating-panel.css`, `cards.css` (`paper-texture`/`cartoon-surface` `@utility`) +
  the genuinely-global cascade (token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`,
  `paper.css`, `animations.css`, `transitions.css`). `icon-chip.css` (the SOLE cross-global `@import`) STAYS
  DOCUMENTED-OWNERSHIP (`README OWNER:` — the B2 `proof:css-ownership`).

## §2 — The build-transform copy-UNIT + the widened walk (EXECUTED byte-identical)

Two fns appended to `vite.style-fold.ts` walk the colocated cascade CSS, copy it into a FLAT `dist/styles/`, then
flatten the shipped `dist/styles/index.css` @imports. The copy UNIT is the component's cascade CSS SUBTREE:

- a root-sibling `components/<n>/<n>.css` — copied whole;
- a `components/<n>/styles/` SUBTREE — copied WHOLE via ONE `cpSync(dir, dist, {recursive:true})` (dock's 17
  partials are `dock.css`-referenced relative @imports; copying only the top sheet strands them and silently
  drops the entire dock `@layer components` cascade).

**The glob is ANY-DEPTH** (the recursive-colocation edict): `src/components/**/*.css` MINUS `**/styles/**`
(any-depth single sheets — catches a 2-level nested `timeline/continuous-rail/continuous-rail.css` a one-level
glob MISSES) UNION `src/components/**/styles/` (multi-partial subtrees). The two globs are STRUCTURALLY DISJOINT
— proven three ways (real-tree basename-intersection EMPTY; a synthetic same-component ambiguity fires born-RED;
a synthetic cross-glob target collision fires born-RED via a `claim()` map).

## §3 — The index.css @import DISCIPLINE (the demo-HMR constraint)

`demo/demo.css:108` does `@import "../src/styles/index.css"` (the SOURCE cascade, for HMR). So `src/styles/
index.css` @imports MUST resolve at SOURCE (`@import "../components/dock/styles/dock.css"`, all verified on disk);
the publish WALK flattens them to `./dock.css` for dist (regex `@import "../components/[^"]*/([^"/]+\.css)"` →
`./$1`). The walk is `cpSync + gather + index-rewrite`, NOT a pure cpSync.

## §4 — TWO colocation classes need distinct build routing

- (a) an SFC-scoped `<style src>`-extracted file (T1b) rides the SFC fold pipeline into `dist/glass-ui.css` and is
  SKIPPED by the cascade walk (an un-predicated walk ships it TWICE, breaking scoping) — a HARD `proof:css-
  colocation` assertion.
- (b) a NON-scoped cascade partial (dock/, tabs/) is copied by the walk.

## §5 — Binding criteria (born-RED → GREEN)

- Born-RED: the colocated paths don't exist yet (ENOENT); the walk hasn't widened.
- GREEN: `proof:css-colocation` — every colocated CSS flattens to a UNIQUE `dist/styles/` target (no clobber); the
  copy UNIT is the subtree; the two-glob disjointness holds; the T1b no-double-emit assertion holds; the SOURCE
  `@import` arm asserts every `index.css` @import resolves at SOURCE; the zero-scoped-id-collision arm (all
  `data-v-` ids distinct — 41 today).
- The binding byte proof: `diff -rq golden dist/styles` EXIT 0; `dist/styles/index.css` sha IDENTICAL golden==new;
  rebuild-vs-rebuild diff EXIT 0.

## §6 — Fences

- **Cascade-ORDER = global; file LOCATION = colocation.** `index.css` remains the SINGLE inter-component ordering
  authority — the `@layer` + source-order ties are INVIOLATE.
- B1 is byte-identical + mechanically trivial. The GATE reader-corpus re-point is B2's (BI.W-CSS-COLOCATE-B2) —
  without B2 the close is RED on ~81 gates; B1 alone does NOT close.
- `icon-chip.css` STAYS (documented-ownership); the genuinely-global cascade + cross-family shared registers stay
  in `src/styles/`.

## §7 — Cross-refs

§2.6 (CSS colocation, B1); §9.6 (ATOM B split); Settled §6 (index.css INVIOLATE).
