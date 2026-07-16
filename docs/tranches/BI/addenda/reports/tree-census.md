# glass-ui working-tree transaction census

**Repo:** `/Users/mkbabb/Programming/glass-ui` @ branch `tranche/BI`, HEAD `e5b3a209`.
**Transaction size (git status --porcelain):** 695 modified (` M`), 155 deleted (` D`), 105 untracked entries (`??`) → 112 untracked *files* once the 5 collapsed dirs are expanded. Total 955 status rows.
**Method:** read-only. No git mutations, no build, no test run. Every claim below carries a path or SHA. `git ls-files` = tracked-at-HEAD; ` D` = deleted in working tree; `??` = untracked new.

The working tree is authoring a **`7.0.0 (unreleased)`** changeset (CHANGELOG.md:3) on top of `package.json` version `6.0.0` (already published to npm). It is one giant "consolidation / apotheosis" cut that (a) flattens and colocates component CSS/types, (b) consolidates several component families, (c) retires the entire tranche-execution harness + verification engine, and (d) rewrites all 134 formation wave specs into short as-built status records.

---

## 1. Domain map

Counts are of top-level porcelain rows (untracked dirs count as 1 here; see §3 for expansion).

| Domain | Modified | Deleted | Untracked | Apparent intent (from sampled diffs) |
|---|---:|---:|---:|---|
| `src/components` | 254 | 63 | 39 | Component apotheosis: colocate CSS into per-component `styles.css` (untracked), split typed `types.ts`/`context.ts` out, drop public CVA variant modules, retire/consolidate families. |
| `src/composables` | 39 | 10 | 3 | Motion clean-break: delete `curves`, `suite`, `useGooMorph`, `morphSignatures`, `useCharStagger`, `usePrioritizedTask`, `gooBarbellGeometry`; rename to `useStagger`/`useReducedMotion`; glass shader relocation. |
| `src/styles` | 58 | 1 | 2 | Token-graph + material rework: `tokens/` (17 files) reworked, `manifest.ts` added, `responsive.css` added, big cuts to `glass/material.css`, `glass-chip.css`, `glass-atom.css`, `scheme-motion.css`; delete `glass/progress-rail.css`. |
| `demo/chassis` | 20 | 3 | 2 | Chassis terminalization: delete `PermutationGrid.vue`, `useSectionReveal.ts`, `SpecimenFrame.vue`; add `TransitionRouteLink.vue`/`routeTransition.ts`. |
| `demo/stories` | 94 | 15 | 7 | Story-per-public-concept bijection: consolidate metric*/chip*/surface/palette stories into single `metric.vue`/`chip.vue`/`surface.vue`/`chart-palette.vue`; add `pager-dots.vue`, `deck/`. |
| `demo/shell` | 8 | 1 | 1 | Shell restraint: delete `useShellScrollProgress.ts`; add `DockFacetMenu.vue`. |
| `demo/*` (other) | 3 | 0 | 1 | New `demo/examples/` (Card/Configurator/Toaster examples). |
| `docs` | 145 | 4 | 1 | Rewrite all **134** formation wave specs to as-built stubs (−23,597/+2,387 lines aggregate); 11 canon/design docs updated; delete cursor/receipt/bootstrap artifacts; add valuejs coordination inbox. |
| `scripts` | 7 | 22 | 0 | Retire tranche harness + verification engine + one-off archaeology scripts + git hooks. |
| `tests` | 47 | 29 | 49 | Migrate to a `*.contract.test.ts` model; delete harness/feature-gone tests; net **+15** test files. |
| `tests-visual` | 0 | 4 | 0 | (Counted under root/other by prefix.) Drop 4 Playwright visual specs; no successor visual dir. |
| build config | 3 | 0 | 0 | `package.json` (−228/+152, exports reshaped), `package-lock.json`, `vite.library.ts` (−2). |
| ci / root / other | 16 | 7 | 0 | `.github/workflows/{ci,release}.yml`; delete `.githooks/commit-msg`, `.retired-classes.txt`, `components.json`; README/DESIGN/MIGRATION/CHANGELOG. |

---

## 2. Deletion ledger (155)

### (a) Tranche-harness / verification-engine / evidence deletions — 22 scripts + 4 docs + 11 harness tests = **37**

The formation's entire execution + verification substrate is being erased.

**scripts/ harness (10):**
- `scripts/tranche/bootstrap-receipt.mjs`, `bootstrap-receipt.schema.json`, `cursor-schema.json`, `cursor.mjs`, `transaction-envelope.mjs`, `wave-receipt-schema.json` — the receipt/cursor/exactly-once envelope built by P000/P001.
- `scripts/verify.mjs` — the single verification engine (crypto+spawn sandboxed verifier, `scripts/verify.mjs`:1) that P000 (WAVE-INDEX row P000: "single verification-engine bootstrap") created.
- `scripts/verification/discover.mjs`, `evidence-plan.schema.json`, `external-scenario.schema.json`, `invariants.mjs`, `mutation-fixtures.mjs` — semantic discovery + invariant + mutation fixtures.

**scripts/ archaeology + hooks (12):** `install-hooks.mjs`, `regen-structure.mjs`, `constellation.mjs`, `profile-aurora.mjs`, `aurora-profile/harness-browser.mjs`, `aurora-arresting-metric.mjs`, `read-blob-shaders.mjs`, `read-css-monoliths.mjs`, `read-dock-css.mjs`, `__tests__/proof-vt-names.test.ts` (counted in harness tests below), plus the two shader/css readers. One-off scripts (consistent with P130 "owned profiling ... instead of one-off archaeology scripts").

**docs evidence (4):** `docs/tranches/BI/BOOTSTRAP.json` (authority manifest, `authority: GIT_FIRST_PARENT_PLUS_COMMITTED_RECEIPTS`), `docs/tranches/BI/EXECUTION-PROGRESS.md` (the 135-line progress ledger recording only P000 DONE @1c2cda3a and P001 DONE; P002–P133 PLANNED), `docs/tranches/BI/FORMATION/execution-cursor.seed.json` (cursor seed), `docs/tranches/BI/evidence/BI.W-P001/receipt.json` (the ONLY wave receipt that ever existed).

**harness/verification tests (11):** `tests/tranche/{bootstrap-receipt,cursor,transaction-envelope}.test.ts`, `tests/verification/{engine,external-scenario-contract}.test.ts`, `scripts/__tests__/proof-vt-names.test.ts`, `tests/scripts/{proof-animation-coherence,proof-demo-control-live,proof-slider-two-only,proof-xr-producer-repairs,storybook-complete}.detect.test.ts`.

### (b) Component / demo / style retirements & consolidations — **~90**

Confirmed by CHANGELOG "7.0.0 (unreleased)" and matching `package.json` export-key removals (all coherent — no dangling export, see §4).

- **Metric consolidation (P117):** delete `src/components/metric-{badge,cell,stack}/*` (11 files) + demo `metric-cell/stack/metrics/metric-badge.vue` (4) → untracked `src/components/metric/` (Metric/MetricCell/MetricRow/MetricStack + index/types/styles/README) + `demo/stories/data/metric.vue`. Exports: `-./metric-badge -./metric-cell -./metric-stack +./metric`.
- **DarkModeToggle rename (P082):** delete `src/components/controls/*` (DarkModeToggle.vue, README, css, index) + demo/tests → untracked `src/components/dark-mode-toggle/*`. Exports: `-./controls +./dark-mode-toggle`.
- **ColorSwatch privatization (P081):** delete `src/components/color-swatch/*` → untracked `demo/stories/substrates/aurora/config/ColorSwatch.vue` (configurator-private). Export `-./color-swatch`.
- **Chip consolidation (P091):** delete demo `selectable-chip.vue`, `toggle-chip.vue`, and `src/components/icon-chip/*` → untracked `demo/stories/forms/chip.vue`. Export `-./icon-chip`.
- **Icon-tooltip / SpaView / Notification / Goo-filter retirements:** delete `src/components/{icon-tooltip,spa-view,notification,goo-filter}/*` + their stories. Exports `-./icon-tooltip -./spa-view -./notification`.
- **Toggle (standalone) retired:** delete `src/components/toggle/{Toggle.vue,index.ts}`; `toggle-group/` survives (untracked `toggleVariants.ts`). `./toggle` was never an export at HEAD — no broken export. **UNVERIFIED** whether this satisfies P089 "Toggle apotheosis" (title says apotheosize, transaction deletes the standalone).
- **SplitChars retired:** delete `src/components/split-chars/*` + `demo/stories/motion/split-chars.vue`. **UNVERIFIED** vs P079 "SplitChars apotheosis" (title says apotheosize, transaction deletes).
- **Dock simplification (P034/P041):** delete `DockSection.vue`, `DockStack.vue`, `composables/useDockFisheye.ts`, `useDockPopover.ts`, `styles/{fisheye,popover,section}.css`. CHANGELOG explicitly: "Dock removes the unconsumed DockSection, DockStack, and fisheye surfaces."
- **Progress rework (P075):** delete `progress/{ProgressDefault,ProgressGradient,ProgressLiquid}.vue`, `valueMarks.css`, `src/styles/glass/progress-rail.css` → untracked `progress/types.ts`.
- **Others:** `card/{ScrollCard,ScrollCardHeader}.vue`, `carousel/{CarouselNext,CarouselPrevious}.vue`, `focus-scope/*` (P100 privatization), `instrument-chassis/ChassisDivider.vue`, `tabs/composables/useEyeglassLive.ts`, `_shared/{menuItemVariants,useControlSize,useSurfaceAxis}.ts`, `aurora/blob RESEARCH.md`, aurora `procedural-color.wgsl.ts`, glass shaders `glass-refract.glsl.ts`/`procedural-color.glsl.ts`/`glassShader.wgsl`, `demo/chassis/{PermutationGrid,SpecimenFrame,useSectionReveal}`, `demo/shell/useShellScrollProgress.ts`, demo `chart-chassis-palette`, `surface-taxonomy`, `curve-families.ts`, `PaletteLayer.vue`.

### (c) Test deletions — coverage successor analysis (34 total: 29 `tests/`, 4 `tests-visual/`, 1 `scripts/__tests__/`)

Net test count grows: 321 tracked-at-HEAD → **−34 / +49 untracked = net +15**. Migration is to a `*.contract.test.ts` model (e.g. `tests/components/ui/surface/Surface.test.ts`).

**Rename/consolidation — successor CONFIRMED (8):**
- `DarkModeToggle.icon-morph` + `DarkModeToggle.interaction` → `tests/components/dark-mode-toggle.contract.test.ts` (untracked)
- `HeaderRibbon.focus` → `tests/components/header-ribbon.contract.test.ts`
- `InstrumentChassis.phase-canon` → `tests/components/instrument-chassis.contract.test.ts`
- `metric-badge/zero-value` + `metric-stack/MetricStack` → `tests/components/metric.contract.test.ts` (**zero-value case preserved**, asserts `value:0 → "0"` at metric.contract.test.ts:52,62)
- `labeled-field.spec` → `tests/components/labeled-field.contract.test.ts`
- `menuItemVariants.spec` → `tests/menuRowClass.spec.ts`
- `composables/motion/useCharStagger` → `useStagger.test.ts`
- `composables/useSpringPress` → `composables/motion/press.test.ts` (tests `useLiquidPress`; `useSpringPress.ts` **survives** as an internal helper imported by `useSpring.ts`+`useLiquidPress.ts`, so its behavior is transitively covered — **direct unit coverage of `useSpringPress` is dropped**, minor).

**Feature genuinely removed — coverage legitimately dropped, no successor needed (11, all consistent with 7.0.0 changelog / apotheosis titles):**
- `dock/dock-fit-fisheye`, `dock/useDockPopover` (fisheye+popover removed — CHANGELOG-documented)
- `goo-filter/GooFilter.reactivity` (goo-filter component removed)
- `composables/usePrioritizedTask` (composable removed)
- `composables/motion/scroll-reveal-once` (`vScrollRevealOnce` is **GONE from src** entirely — grep of `src/` returns nothing)
- `composables/motion/curves`, `suite`, `convergence` (`curves.ts`+`suite.ts` deleted; `./motion-curves` export removed; `MOTION_CURVES` no longer defined anywhere in `src/`. `dependency-boundary.test.ts` (untracked) now guards the keyframes.js boundary — partial successor for `convergence`)
- `instrument-chassis/InstrumentChassis.spine-variant` (`ChassisDivider.vue` removed)
- `tests-visual/_metric-zero-capture`, `metric-hover` (metric consolidation), `icon-chip` (icon-chip removed), `glass-glow-fix` — 4 Playwright visual specs dropped with **no successor visual dir** (part of harness retirement).

**Harness (11):** listed in §2(a) — legitimately removed with the harness they test.

> **No silently-dropped product-behavior coverage was found**: every deleted component/composable test either has a named contract successor or corresponds to a feature the transaction removes from `src/`. The one genuine reduction is direct-unit coverage of the surviving-but-now-internal `useSpringPress`.

### (d) Other deletions — **4**
`.githooks/commit-msg`, `scripts/install-hooks.mjs` (git-hook tooling), `.retired-classes.txt` (P126 "semantic retirement facts instead of the 20-row retired-claim snapshot"), `components.json` (shadcn registry file — P010/P127 package singularity), `demo/stories/foundations/chart-chassis-palette.vue`.

---

## 3. Untracked ledger (105 rows → 112 files)

5 collapsed dirs expand to: `demo/examples/` (CardExample, ConfiguratorExample, ToasterExample), `demo/stories/motion/deck/` (DeckGooFilter.vue, gooBarbellGeometry.ts, useDeckGoo.ts), `src/components/dark-mode-toggle/` (4), `tests/components/ui/alert/` (Alert.test.ts), `tests/components/ui/surface/` (Surface.test.ts).

- **New component sources / colocation (39):** per-component `styles.css` (avatar, button, command, data-table, dropdown-menu, expandable-container, header-ribbon, number-field, tags-input, metric); typed `types.ts`/`context.ts` (input, instrument-chassis, labeled-field, progress, slider, textarea, number-field, tags-input, dialog `dialogStageContext`, command `dialogContext`); new `_shared/` primitives (`FeedbackMark.vue`, `control-size.ts`, `disclosure-context.ts`, `disclosure.css`, `feedback.ts`, `field-control.css`, `fieldControl.ts`, `menuRowClass.ts`, `resolveSurfaceClass.ts`); `metric/` family (8); `dark-mode-toggle/` (4); `blob/composables/resolveBlobSurface.ts`; `toggle-group/toggleVariants.ts`.
- **New composables / styles (5):** `composables/motion/useReducedMotion.ts`; `composables/glass/procedural/color.glsl.ts` + `color.wgsl.ts` (relocated shaders); `styles/tokens/manifest.ts`; `styles/utilities/responsive.css`.
- **New demo stories/examples (14):** `metric.vue`, `surface.vue`, `chip.vue`, `chart-palette.vue`, `pager-dots.vue`, `deck/` (3), `demo/examples/` (3), `demo/chassis/{TransitionRouteLink.vue,routeTransition.ts}`, `demo/shell/DockFacetMenu.vue`, aurora-config `ColorSwatch.vue`.
- **New tests (49):** ~35 `tests/components/*.contract.test.ts` (accordion, avatar, badge, carousel, chip, collapsible, combobox, command, dark-mode-toggle, dropdown-menu, expandable-container, fading-scroll, header-ribbon, infinite-scroll, input, instrument-chassis, label, labeled-field, metric, number-field, paper-backdrop, popover, pulse, select, slider, status-dot, table, tags-input, textarea, tooltip, typewriter, watercolor-dot); `tests/components/custom/{aurora/uniform-packing,blob/blob-surface,deck/DeckGoo.private,drawer/Drawer.motion-lifecycle}.test.ts`; `tests/components/ui/{_shared/useMotionAxis, alert/Alert, surface/Surface, dialog/dialog-stage-ownership}.test.ts`; `tests/composables/motion/{dependency-boundary,press,useElementMorph,useReducedMotion,useStagger}.test.ts`; `tests/{demo/code-block, menuRowClass.spec, scripts/profile-bundle-value-js, styles/token-graph}.test.ts`.
- **Coordination doc (1):** `docs/tranches/BI/coordination/valuejs-inbox-2026-07-15-v-formation.md` (P125 D3 value.js pinned-consumer inbox).
- **Junk: NONE.** No `.DS_Store`, tmp, log, bak, swp, orig, or editor droppings in the untracked set.

---

## 4. Buildability assessment (in principle)

**Import graph: intact.** Grep of `src/` + `demo/` for every deleted component/composable module basename finds **0 surviving importers** (the only apparent hit, `components/toggle`, was `toggle-group`). Deleted `_shared` and `motion` modules likewise have 0 surviving refs. `MOTION_CURVES`/`vScrollRevealOnce`/`curves`/`suite` are absent from `src/` — no dangling internal use.

**Export map: coherent.** `package.json` exports were reshaped `−228/+152`. Removed keys (`./color-swatch ./controls ./focus-scope ./icon-chip ./icon-tooltip ./metric-badge ./metric-cell ./metric-stack ./motion-curves ./notification ./spa-view`) exactly match the deletions; added keys (`./dark-mode-toggle ./metric`) match the new dirs. Resolving all 143 export targets against disk finds only `./fonts/* → dist/fonts/*` "missing" — an unbuilt `dist/` glob, expected in a source tree. **No export points at a deleted component.**

Caveat: this is a static import/export check, not a compile. `npm run typecheck`/`build` were **not** run (read-only fence). Colocated `styles.css`/`types.ts` are untracked, so `.gitignore` scope and Vite glob inclusion are unverified by this census.

---

## 5. RISK ROWS

**R1 — CRITICAL — the release-gating substrate is being deleted rather than satisfied.** EXECUTION-READINESS.md:106-110 declares "Release remains forbidden until all 134 cursor rows are terminal, ... FINAL/tag/package bytes agree," and lines 76-77 make "first-parent Git plus committed receipts" the authority with the cursor as reconstructable cache. This transaction deletes the cursor engine (`scripts/tranche/cursor.mjs`), the transaction envelope, both receipt schemas, the bootstrap manifest (`docs/tranches/BI/BOOTSTRAP.json`), the cursor seed, the progress ledger (`EXECUTION-PROGRESS.md`), and the **only** committed receipt (`evidence/BI.W-P001/receipt.json`). Only P000/P001 ever had receipts (EXECUTION-PROGRESS.md records P002–P133 as PLANNED); npm is already at 6.0.0 published. Net: the machine that was supposed to prove the 134 rows terminal is erased while the contract that requires it survives (FORMATION/ specs + FINAL-PRECONDITIONS.md remain). Post-transaction there is **no cursor, no receipts, no ledger, no verification engine** — the audit trail for waves P002–P133 is unrecoverable from this repo.

**R2 — CRITICAL — the P000-bootstrapped single verification engine (`scripts/verify.mjs`) is deleted.** WAVE-INDEX P000's stated deliverable is "single verification-engine bootstrap"; `scripts/verify.mjs` is that engine. Its deletion, together with `scripts/verification/{invariants,discover,mutation-fixtures}.mjs` and `tests/verification/*`, removes the mechanism that would re-verify any invariant. Verification is not migrated to a successor visible in this tree.

**R3 — MAJOR — all 134 formation wave specs are overwritten with as-built stubs (−23,597/+2,387 lines).** Each `docs/tranches/BI/FORMATION/waves/BI.W-Pxxx.md` is reduced to a few lines (e.g. `BI.W-P046.md` 268→9 lines). The new text is honest present-tense status ("IMPLEMENTED — NATIVE DUAL-ENGINE ACCEPTANCE PENDING") but the original audit-grounded formulation — invariants, builder subjects, repair rows, π contracts — is destroyed in-place, eliminating the spec-vs-implementation diffability the formation was built to provide. Several stubs self-declare **PENDING** acceptance, contradicting any "terminal" claim.

**R4 — MAJOR — a published-version / in-flight-version / contract mismatch.** `package.json` = 6.0.0 (published), CHANGELOG top = "7.0.0 (unreleased)", formation contract expects 134-row terminal closure before release. The transaction advances 7.0.0 content while deleting the closure machinery — i.e. it moves toward another release while removing the evidence that would authorize one. Independent audit + two-clean-convergence-pass preconditions (EXECUTION-READINESS.md:108-109) have no surviving harness to run against.

**R5 — MINOR — title-vs-action mismatch on two "apotheosis" waves.** P089 "Toggle apotheosis" and P079 "SplitChars apotheosis" name an apotheosis, but the transaction **deletes** `src/components/toggle/*` and `src/components/split-chars/*` outright (Toggle folded toward `toggle-group`; SplitChars has no successor dir). No build break (neither was an export), but whether this satisfies those waves is UNVERIFIED from the tree alone.

**R6 — MINOR — `useSpringPress` direct-unit coverage dropped.** `tests/composables/useSpringPress.test.ts` deleted while `src/composables/motion/useSpringPress.ts` survives as an internal helper; only transitive coverage via `press.test.ts` (`useLiquidPress`) remains.

**R7 — NOTE — `docs/precepts` submodule is dirty.** Gitlink moved `44961f0f...` → `44961f0f...-dirty`; the precepts submodule working tree has uncommitted changes (P131 "inert local gitlink" territory).

---

## 6. P-waves this transaction appears to ADVANCE (title-match inference only)

**Discipline note:** with the receipt/cursor/verification substrate deleted, no wave can be confirmed DONE from this tree. The list below is what the changed paths are *consistent with*, judged against WAVE-INDEX titles — **not** an attestation of completion.

- **Structure (P005–P013):** ui/custom flatten, barrel dissolve, CSS colocation (`styles.css` untracked across ~10 components), demo terminal + private-chassis re-home. Exports flattened.
- **Verification-architecture (P014):** contradicted more than advanced — the discovery/mutation revalidation engine is deleted (R2).
- **Design foundation (P015–P022):** `styles/tokens/` (17 files) + `tokens/manifest.ts` + `token-graph.test.ts`; material/type/color CSS rework; `styles/utilities/responsive.css`.
- **Motion (P023–P032):** curves/suite/gooMorph/charStagger clean break; `useReducedMotion`, `useStagger`, `press`, `useElementMorph`, `dependency-boundary` tests; `scheme-motion.css`.
- **Dock (P033–P042):** DockSection/Stack/fisheye/popover removal; `DockFacetMenu.vue`.
- **Procedural (P043–P054):** shader relocation (`glass/procedural/color.{glsl,wgsl}.ts`), aurora/blob RESEARCH.md prune, `aurora/uniform-packing` + `blob/blob-surface` tests, P046 aurora stub.
- **Demo (P055–P062):** story-per-concept consolidation, `demo/examples/`, `code-block.test.ts`.
- **Component apotheosis (P063–P124):** the bulk — Surface P063, Metric P117, DarkModeToggle P082, ColorSwatch P081, Chip P091, Progress P075, Toggle P089*, SplitChars P079*, PagerDots P118, Deck P121, plus ~35 `*.contract.test.ts`.
- **Retirements:** StackedIcons P083, BorderProgress P085 (both already gone pre-HEAD; `./stacked-icons` removed at 6.0.0 per CHANGELOG).
- **Contracts (P125–P133):** valuejs inbox P125, `.retired-classes.txt` deletion P126, `package.json`/`package-lock` P127, `vite.library.ts` P128, docs rewrite P129, `docs/precepts` gitlink P131.

(*) P079/P089 flagged in R5.

---

## Evidence appendix (commands)
- `git status --porcelain=v1` → 695 M / 155 D / 105 ?? ; `--untracked-files=all` → 112 untracked files.
- `git diff --numstat -- docs/tranches/BI/FORMATION/waves/` → added=2387 deleted=23597.
- `git show HEAD:docs/tranches/BI/EXECUTION-PROGRESS.md` → 135 lines; P000 DONE @`1c2cda3a`, P001 DONE, P002–P133 PLANNED.
- `git show HEAD:docs/tranches/BI/evidence/BI.W-P001/receipt.json` → sole receipt, indexes cursor.mjs/transaction-envelope.mjs/EXECUTION-PROGRESS.md (all deleted).
- Export resolve: 143 targets checked, 1 missing (`dist/fonts/*`, unbuilt).
- Importer grep of 23 deleted module paths across `src`+`demo` → 0 surviving refs.
