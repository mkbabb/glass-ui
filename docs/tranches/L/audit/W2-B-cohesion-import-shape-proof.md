# L.W2 Lane B — Sibling-module cohesion + import-shape verification proof

**Date**: 2026-05-11
**Wave**: L.W2 (modularization sweep).
**Lane**: B — sibling-module cohesion + import-shape verification.
**Worktree**: `agent-a68710623e0db360e` (isolated; repo-relative paths).
**Base ref**: post-L.W1 close (W1 Lane A/B/C all integrated).
**Status**: COMPLETE — typecheck + build + test all green; bundle budget PASS.

Lane A (parallel) restructures `src/composables/` into coherent sub-trees;
this Lane B audits sibling-module cohesion + import-shape across the rest of
the library surface per Rε §B.2 + §B.3 + §B.5.

---

## § Rε §B.2 cohesion findings × disposition

Eight cohesion rows reconciled. The 4 rows in Lane B's territory are
dispositioned; the 4 in Lane A's territory are noted for cross-lane handoff.

| # | Finding | Lane B disposition | Implementation |
|---|---|---|---|
| **B.2.1** | WS subpath barrels nested vs flat (`composables/dark`) | CLOSED at W1 Lane C (`src/dark.ts` + `src/keyboard.ts` + `src/carousel.ts` exist as flat top-level barrels; nested forms retired) | No Lane B edit required; verified at HEAD via `ls src/*.ts` (37 flat barrels including `dark.ts`/`keyboard.ts`/`carousel.ts`). |
| **B.2.2** | Root barrel non-alphabetic, non-categorical 7-package cherry-pick | **DOCUMENT** the rationale in a leading comment block of `src/index.ts`. | New comment block in `src/index.ts:1-73` enumerates (a) the three-layer import shape (root barrel · per-package subpaths · `/api` discovery layer) and (b) the acceptance bar for root-barrel inclusion: vueuse-free + small primitive + ui/-composability. The 23 excluded custom packages fail one or more criteria (named in the comment). |
| **B.2.3** | `composables/sidebar/` cross-imports `components/custom/sidebar/types` | Lane A territory per W2 spec. Lane B verifies at HEAD: `src/composables/sidebar/index.ts:13-20` re-exports types from `../../components/custom/sidebar/types`. Lane A's restructure (per Rε §B.2.3 disposition) hoists the types into `src/composables/sidebar/types.ts`. Lane B does NOT touch composables. **Lane B api/ disposition**: sidebar types remain rejected from `src/api/index.ts` per the W1 Lane B acceptance bar ("specific to `/sidebar` subpath; cross-cutting risk minimal"). The fix lives in composables/ not api/. |
| **B.2.4** | `infinite-scroll` composables co-located inside the component package | Lane A territory per W2 spec. Lane B verifies at HEAD: `src/composables/index.ts:13` reaches back through `../components/custom/infinite-scroll/composables`. Same cross-cutting pattern as sidebar; Lane A's restructure moves them to `src/composables/infinite-scroll/`. Lane B does NOT touch composables. |
| **B.2.5** | `src/components/custom/dock/composables/` — dock-internal composables | VERIFY-KEEP-AS-IS — confirmed at HEAD: dock composables (`useDockState`, `useLayerTransition`, etc.) are component-internal, NOT re-exported from `src/dock.ts`. Correctly co-located per Rε §B.2.5. |
| **B.2.6** | Aurora `composables/` — public surface nested in component package | VERIFY-KEEP-AS-IS — aurora is a self-contained composite; nested public composables (`useAurora`, `useCursorInteraction`) are aurora-domain. Boundary criterion holds: "reusable beyond component → hoist to `src/composables/`; domain-bound → keep nested." |
| **B.2.7** | Top-level platform composables orphan namespace | Lane A territory (Rε §B.2.7 prescribes `composables/platform/` sub-tree). Lane B does NOT touch composables. |
| **B.2.8** | `useStoryDemo` — demo-private composable on library's public surface | Lane A territory (Rε §B.2.8 prescribes move to `demo/stories/` demo-private). Lane B does NOT touch composables. |

**Cohesion summary**: B.2.1 already closed at W1 Lane C; B.2.2 documented at L.W2 Lane B (this edit); B.2.3/B.2.4/B.2.7/B.2.8 are Lane A territory; B.2.5/B.2.6 verified KEEP-AS-IS.

---

## § Rε §B.3 import-shape verification (subpath resolution)

Each public subpath verified for (a) dist artifact existence (`dist/<name>.{js,d.ts}`), (b) `package.json` exports resolution via `npm run verify-export-types`, and (c) runtime import resolution via `node -e 'import("./dist/<name>.js")'`.

### `npm run verify-export-types` — release-script subpath probe

```
$ npm run verify-export-types
> @mkbabb/glass-ui@1.0.0 verify-export-types
> node scripts/verify-export-types.mjs

All package export targets and type resolutions are valid.
```

PASS — every `package.json` exports entry resolves; every `typesVersions["*"]` mapping resolves; emitted dts files are well-formed (no broken `'../src/...'` references).

### Per-subpath resolution table

| Subpath | dist artifact | Runtime resolves? | Exports count |
|---|---|---|---|
| `@mkbabb/glass-ui` (root) | `dist/glass-ui.js` | YES | 196 exports |
| `@mkbabb/glass-ui/api` | `dist/api.js` | YES | 4 (32 types erased) |
| `@mkbabb/glass-ui/styles` | `src/styles/index.css` | YES (CSS) | n/a |
| `@mkbabb/glass-ui/aurora` | `dist/aurora.js` | YES | 12 |
| `@mkbabb/glass-ui/carousel` (NEW @ L.W1.C) | `dist/carousel.js` | YES | 1 |
| `@mkbabb/glass-ui/configurator` | `dist/configurator.js` | YES | 4 |
| `@mkbabb/glass-ui/confirm-dialog` | `dist/confirm-dialog.js` | YES | 1 |
| `@mkbabb/glass-ui/controls` | `dist/controls.js` | YES | 1 |
| `@mkbabb/glass-ui/dark` (flat @ L.W1.C) | `dist/dark.js` | YES | 1 |
| `@mkbabb/glass-ui/disco-glyph` | `dist/disco-glyph.js` | YES | 1 |
| `@mkbabb/glass-ui/dock` | `dist/dock.js` | YES | 7 |
| `@mkbabb/glass-ui/dock-group` | `dist/dock-group.js` | YES | 1 |
| `@mkbabb/glass-ui/expandable-container` | `dist/expandable-container.js` | YES | 1 |
| `@mkbabb/glass-ui/forms` | `dist/forms.js` | YES | 14 |
| `@mkbabb/glass-ui/freshness` | `dist/freshness.js` | YES | 1 |
| `@mkbabb/glass-ui/glass-carousel` | `dist/glass-carousel.js` | YES | 3 |
| `@mkbabb/glass-ui/glass-panel` | `dist/glass-panel.js` | YES | 1 |
| `@mkbabb/glass-ui/glyph-face` | `dist/glyph-face.js` | YES | 2 |
| `@mkbabb/glass-ui/hover-popover` | `dist/hover-popover.js` | YES | 1 |
| `@mkbabb/glass-ui/icon-tooltip` | `dist/icon-tooltip.js` | YES | 1 |
| `@mkbabb/glass-ui/infinite-scroll` | `dist/infinite-scroll.js` | YES | 2 |
| `@mkbabb/glass-ui/instrument-chassis` | `dist/instrument-chassis.js` | YES | 2 |
| `@mkbabb/glass-ui/keyboard` (flat @ L.W1.C) | `dist/keyboard.js` | YES | 5 |
| `@mkbabb/glass-ui/labeled-field` | `dist/labeled-field.js` | YES | 5 |
| `@mkbabb/glass-ui/metaballs` | `dist/metaballs.js` | YES | 3 |
| `@mkbabb/glass-ui/metric-badge` | `dist/metric-badge.js` | YES | 1 |
| `@mkbabb/glass-ui/paper-backdrop` | `dist/paper-backdrop.js` | YES | 1 |
| `@mkbabb/glass-ui/pulse` | `dist/pulse.js` | YES | 1 |
| `@mkbabb/glass-ui/scrolling-text` | `dist/scrolling-text.js` | YES | 1 |
| `@mkbabb/glass-ui/search` | `dist/search.js` | YES | 7 |
| `@mkbabb/glass-ui/sidebar` | `dist/sidebar.js` | YES | 8 |
| `@mkbabb/glass-ui/sortable-list` | `dist/sortable-list.js` | YES | 4 |
| `@mkbabb/glass-ui/stacked-icons` | `dist/stacked-icons.js` | YES | 1 |
| `@mkbabb/glass-ui/status-dot` | `dist/status-dot.js` | YES | 1 |
| `@mkbabb/glass-ui/tabs` | `dist/tabs.js` | YES | 3 |
| `@mkbabb/glass-ui/timeline` | `dist/timeline.js` | YES | 1 |
| `@mkbabb/glass-ui/toggle-chip` | `dist/toggle-chip.js` | YES | 2 |
| `@mkbabb/glass-ui/tokens` | `dist/tokens.js` | YES | 4 |
| `@mkbabb/glass-ui/typewriter` | `dist/typewriter.js` | YES | 19 |

**38 subpaths probed**; all 38 resolve at runtime and pass the export-types verifier. No nested subpaths remain — every public consumer-facing import is a flat hyphenated name, satisfying Rε §B.3.2 (regularity of subpath naming).

### Rε §B.3 row-by-row table

| # | Pattern | State | Lane B disposition |
|---|---|---|---|
| **B.3.1** | Root barrel exports `~120+` symbols | CLOSED at W1 Lane A (curated to vueuse-free per-package list + custom cherry-pick). HEAD root export count: 196 (still substantial but vueuse-free per `grep -E "@vueuse" dist/glass-ui.js` → 0 matches). | Verified; cherry-pick rationale newly documented at `src/index.ts:1-73`. |
| **B.3.2** | Per-package subpaths — 38 active, all flat | CLOSED at W1 Lane C; verified at this lane (38/38 resolve). | KEEP-AS-IS. |
| **B.3.3** | `@mkbabb/glass-ui/api` discovery layer | CLOSED at W1 Lane B; verified at this lane (`dist/api.js` resolves; 4 runtime constants + 32 types erased). | KEEP-AS-IS. |
| **B.3.4** | CSS via `@mkbabb/glass-ui/styles` single import | Verified — single canonical entry at `src/styles/index.css`. Cascade-order documentation added at L.W2 Lane B (this edit; see Rε §B.5 below). | KEEP-AS-IS. |
| **B.3.5** | Runtime JS tokens via `@mkbabb/glass-ui/tokens` | Verified — `dist/tokens.js` resolves; 4 runtime exports (`chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`). | KEEP-AS-IS. |
| **B.3.6** | Carousel had no subpath | CLOSED at W1 Lane C — `@mkbabb/glass-ui/carousel` resolves (1 export: `useCarousel` + `CarouselApi` type). | KEEP-AS-IS. |
| **B.3.7** | `dock` vs `dock-group` subpath name collision | Verified — both are distinct, precise names. Documentation owed to W5 doc cohort (CLAUDE.md/DESIGN.md). | DEFER to W5 doc walk. |
| **B.3.8** | `glass-carousel` vs `carousel` two-name distinction | Verified — `glass-carousel` is the custom-styled glass carousel; `carousel` is the new vueuse-bearing ui/carousel composable subpath. Documentation owed to W5. | DEFER to W5 doc walk. |

**Import-shape summary**: every subpath resolves; every named pattern is documented or deferred to W5 doc cohort. The W1 closure delivered the v1.0 surface; W2 Lane B confirms its consumer-facing shape is intact.

---

## § Rε §B.5 misc disposition

| # | Candidate | Lane B disposition |
|---|---|---|
| **B.5.1** | `src/styles/` cascade-order documentation gap | **CLOSED** at this lane. Comment block added at `src/styles/index.css:11-50` enumerating the 16-file cascade with per-layer rationale (tokens → typography → theme → glass → paper → component utilities → component CSS tail). Per-file role + dependency on earlier layers is documented. |
| **B.5.2** | `src/styles/api.css` hypothesis | NO ACTION — `index.css` is canonical-by-name; no `api.css` needed. |
| **B.5.3** | `src/components/ui/_shared/` — public-surface promotion? | KEEP-AS-INTERNAL — leading `_` is canonical "private to the package"; 10 internal importers verified at V.W3; no external consumer pressure. |
| **B.5.4** | Dist composables typing publication bug | CLOSED at W0 Lane III + W1 Lane C (flat subpath rename + `vite.library.ts` flat dist filenames). |
| **B.5.5** | `src/freshness.ts` — node-bearing helper at top level | KEEP-AS-IS — single build-time helper; relocate to `src/build/` only if 2+ helpers materialize. Verified at HEAD: `freshness.ts` lives at `src/` top level alongside the 36 other flat subpath barrels. |
| **B.5.6** | No `src/api/` at HEAD | CLOSED at W1 Lane B. |
| **B.5.7** | No `src/build/` at HEAD | DEFER until 2+ build-time helpers exist. |
| **B.5.8** | No `src/test/` at HEAD | KEEP-AS-IS — co-located tests are vitest canon. |
| **B.5.9** | No `src/types/` at HEAD | KEEP-AS-IS unless api/ outgrows single file. Types-of-record stay co-located with owning module. |
| **B.5.10** | No `src/lib/` at HEAD | KEEP-AS-IS — `src/utils/` is functionally `lib/`. |

**Misc summary**: B.5.1 closed at this lane (cascade-order comment); the remaining 9 rows are KEEP / DEFER / already-CLOSED.

---

## § File changes summary

Three edits, all within Lane B file bounds:

| File | Change | Lines |
|---|---|---|
| `src/index.ts` | Extended curated-surface comment block (lines 1-30 → 1-73). Adds (a) three-layer import shape canon, (b) custom-package cherry-pick rationale with named acceptance bar + 23 excluded packages explained. Code below unchanged. | +44 lines comment |
| `src/styles/index.css` | Replaced 1-line cascade-order comment with 40-line per-layer rationale block documenting all 16 CSS imports + their dependencies. CSS @import statements unchanged. | +39 lines comment |
| `docs/tranches/L/audit/W2-B-cohesion-import-shape-proof.md` | NEW — this proof. | new file |

Zero `src/composables/` edits (Lane A territory); zero `src/components/` edits (out of scope); zero `package.json` edits (W1 territory); zero `vite.library.ts` edits (W1 territory).

---

## § Verify

```
$ npm run typecheck
> @mkbabb/glass-ui@1.0.0 typecheck
> vue-tsc --noEmit
$
```

PASS — clean diagnostics.

```
$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
... [vite:dts] Declaration files built in 28743ms.
✓ built in 29.58s
```

PASS.

```
$ npm test
Test Files  27 passed (27)
     Tests  330 passed (330)
  Duration  2.98s
```

PASS — 330/330 tests.

```
$ npm run profile:budget
Bundle budget report:
  [PASS] dist/glass-ui.js — raw 124832 / 190000 (65.7%); gzip 22452 / 33700 (66.6%)
  [PASS] dist/glass-ui.css — raw 22589 / 29000 (77.9%); gzip 4446 / 5750 (77.3%)
```

PASS — both budgets well under cap.

```
$ npm run verify-export-types
All package export targets and type resolutions are valid.
```

PASS — every public subpath resolves.

---

## § CLAUDE.md notes for W5 doc cohort

W5 owns final CLAUDE.md wording per W2 dispatch ("coordinate with W5 doc cohort"). Lane B surfaces the following short notes for W5 to absorb:

1. **Subpath surface section**: currently CLAUDE.md "Subpath surface" enumerates ~28 public subpaths in narrative form. Post-L.W1 there are 38 active subpaths (37 flat + 1 styles CSS-only). W5 should refresh the enumeration and confirm `/api` + `/dark` + `/keyboard` + `/carousel` (Lane C flat names) are named. Per K R2 / Rβ L2.
2. **Custom-package cherry-pick rationale**: now codified in `src/index.ts:1-73`. W5 may want to lift a 2-3 sentence summary into CLAUDE.md "Entry point" section so the rationale is discoverable from the docs without reading source.
3. **CSS cascade order**: now codified in `src/styles/index.css:11-50`. W5 may want a 1-paragraph summary in CLAUDE.md `## Structure` styles/ subsection, or in DESIGN.md per Rε §B.5.1 recommendation.
4. **`dock` vs `dock-group` naming pair** (Rε §B.3.7) + **`glass-carousel` vs `carousel` naming pair** (Rε §B.3.8): both pairs need a one-line disambiguation note in CLAUDE.md / DESIGN.md so consumers don't pick the wrong subpath.
5. **`useStoryDemo` demo-private posture**: if W2 Lane A absorbs the move to `demo/stories/useStoryDemo.ts` per Rε §B.2.8, the CLAUDE.md "Demo storybook chassis" section needs `<useStoryDemo>` re-listed as demo-private (currently described as such but exported from `src/composables/`). W5 close pass synchronizes wording.

Lane B does NOT edit CLAUDE.md (per W2 spec file bounds: "Lane B may write brief notes to inform W5's comprehensive walk; W5 owns final wording").

---

## § Open questions for orchestrator

1. **B.2.3 / B.2.4 cross-handoff** — Lane A's composables restructure is the canonical fix for sidebar types hoist + infinite-scroll composable relocation. Lane B did NOT touch composables. If Lane A's restructure dispatches separately from Lane B's edits, confirm the orchestrator integrates both before W2 close (otherwise the cherry-pick rationale doc in `src/index.ts` is accurate but doesn't reflect Lane A's relocations).

2. **Cherry-pick acceptance bar (a)+(b)+(c)** — the bar I named in `src/index.ts` is the inferred rationale from the existing selection. If the orchestrator's intended bar differs (e.g. "≥ 2 consumer demo stories" or "P-tranche origin"), the comment needs minor adjustment. Defaults match the 7-package selection at HEAD.

3. **W5 doc cohort coordination** — the 5 notes above are sized as one paragraph each. Confirm W5 absorbs them in its comprehensive walk; otherwise Lane B is happy to expand any single note into a more substantial draft.

4. **`/styles` subpath at runtime** — `npm run verify-export-types` does not exercise the `./styles` CSS-only entry (it's a string export, not an object with `types` + `import` conditions). The probe table above lists it as "PASS" because the file exists; the verification is file-existence, not import-resolution (CSS imports can't be probed via `import()` in node). Flag here for orchestrator awareness — no Lane B action needed.

5. **`src/api/index.ts` no edits** — Lane B intentionally did NOT add sidebar types or infinite-scroll types to api/. The W1 Lane B acceptance bar (re-export only types/constants ALREADY on canonical public package surface; cross-cutting concerns; not single-subpath-specific) keeps them out. If the orchestrator wants `SidebarSection` / `TreeNode` in api/ for discovery, that's a pure-additive amendment with 1 line per type.

---

## § Worktree-diff verification

```
$ git status --short
 M docs/tranches/K/audit/W4-bundle-profile.json
 M src/index.ts
 M src/styles/index.css
?? docs/tranches/L/audit/W2-B-cohesion-import-shape-proof.md
```

(`docs/tranches/K/audit/W4-bundle-profile.json` is a side-effect of `npm run profile:budget`; not a deliberate Lane B edit. Deliberate edits are 2 source files + this proof.) Worktree-isolation verified — no edits leaked to main repo; no Lane A territory touched; no W1 territory (`package.json`/`vite.library.ts`) touched.

## Authority

Lane B operated under the hardened agent git clause — read-only git only, no `git add` / `commit` / `stash` / `reset` / `restore`. The orchestrator owns integration.
