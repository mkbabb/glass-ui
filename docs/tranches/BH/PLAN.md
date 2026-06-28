# Tranche BH — Repo cleanup, de-indirection, 5.0.0 restructure

**Status:** developed (tranche-dev complete, awaiting execution greenlight).
**Version target:** 4.2.0 → **5.0.0** (cut jointly with BG at BG's close — see §2).
**Runs:** interleaved with the live **BG** tranche (BG owns the entire `src/` + `demo/` + `scripts/gates.mjs` + `src/index.ts` write-set; BH dodges it per §3).
**Convergence:** 91/100 over three pass-loops (research → prototype → critique → synthesize); both final critics rated the basis `authorable: true`. Basis: `docs/tranches/BH/research/` (3 synthesis docs, 8 lane reports, 20 runnable prototypes).

---

## §1 Binding question

The repo is **disciplined, not dirty.** The Pass-1 legacy sweep found `TODO`/`FIXME`/`@deprecated` in `src/` = **0**, and every "clean break / RETIRED / DEFINITION-ABSENT" claim spot-verifies TRUE on disk. So BH is not a bug-hunt. It is a **structural de-indirection + de-monolithing pass plus one doc-architecture migration**, closing five convergent facts every research lane surfaced independently:

1. **Three stacked redundancy layers in the export surface** — `src/subpaths/` (79 one-line mirror barrels) + `src/api/` (854L discovery aggregator) + 7 trivial flat `src/*.ts` barrels — all exist only to feed the build entry map. The 5.0.0 clean break collapses them to ONE generated entry-set sourced from the real colocated barrels.
2. **16 god-modules >500L** — 3 are single cohesive shader strings (exempt, not split); the rest carve by cohesion. BG already owns 8 of the 12 src carves; BH owns 3.
3. **CLAUDE.md (941L) is a live-contract map fused to a wave-note archive.** ~16 gates `readFileSync` it; they ENOENT-break on deletion unless re-homed first. Deleting it without redistributing its live contracts is a silent loss — forbidden by the project's own fail-explicit rule.
4. **One real payload bug** — `@lucide/vue` is bundled into `dist` because `libraryExternal` lists the dead `lucide-vue-next` + `vaul-vue` instead of the live `@lucide/vue`; every consumer double-loads lucide. Plus the value.js `^0.13.0 || ^1.0.0` straddle that contradicts the canon's own retirement claim.
5. **BG is the gating reality** — BH's file-moving / export / gate / CLAUDE bands sequence after the owning BG wave; only pure-docs / new-file / build-config / deps bands run truly concurrently.

Backbone currency is a non-issue: reka-ui 2.10, tailwind 4.3.1, vite 8 / Rolldown, ts 6.0, vitest 4.1.9, vueuse 14 are all live-latest. shadcn-vue `update` is correctly NOT a maintenance path (the glass diff is ~100% drift) — the real upstream track is reka's semver, and the `ui/custom` split is the service boundary that keeps it updatable.

---

## §2 Framing decisions (user-locked)

| # | Decision | Choice | Consequence in this plan |
|---|---|---|---|
| 1 | **CLAUDE.md disposition** | **Hard-delete, no replacement** | B4f deletes the file outright; nothing replaces the auto-injection boot seam. The live CONTRACTS still redistribute first (silent-loss fence). Future sessions boot from `docs/precepts` (submodule, auto-present) + the memory system + a discoverable `docs/canon/README.md` index — but no auto-loaded project manual. The ~16 CLAUDE-reading gates re-home before the delete. Gate becomes `file gone + rg=0`. |
| 2 | **Published export surface** | **Clean-break reshape → 5.0.0** | `src/subpaths/` dies, `/api` folds, no backwards-compat aliases. The actual break is small (see §7): exactly ONE dropped key (`./api`) + 3 orphan re-homes; 200 of 203 /api symbols are pure import-path swaps. |
| 3 | **Sequencing vs BG** | **Interleaved** | Every BH wave declares file-bounds; concurrent-safe bands run now, file-moving bands sequence after the owning BG wave (full close = **WS12**). §3 is the protocol. |
| 4 | **Release cut** | **Joint 5.0.0** | BG closes, BH lands the restructure + reshape, the whole thing cuts once as 5.0.0. One major, one migration event, one MIGRATION.md reshape (B4e). |
| 5 | **Precepts submodule writes** | **Repo-local draft + cross-repo ask** | B4c stages the design-doc extraction as new repo files (`docs/design/`) and B6 drafts the prompts repo-local; both issue by-name asks to `mkbabb/precepts`. No in-repo submodule mutation. |

**Defaulted minors (no override taken):** curated-but-GENERATED exports with a fail-CLOSED regen gate · keep the `ui/custom` split (no `base/glass` rename; the `@glass` alias makes a later rename a one-line target change) · DEFER the 164-script detector-kit refactor past BH · ADD `proof:consumer-evidence-live` · keep `components.json` (fix `baseColor: slate`) · keep `.changeset` · delete the dead `.browserslistrc` · re-target `.githooks/commit-msg` off the stale `--tranche=BB`.

---

## §3 The BG-interleave protocol (the dominant constraint)

BG build order (from `docs/tranches/BG/FINAL.md`): core **WS1→WS3→WS2→WS5→WS6→WS4→WS7**, then deep-morphism **WS8→WS9→WS10→WS11**, then the **WS12 coherence capstone LAST**. ~110 waves. **"Full BG close" = after WS12**, not WS7 (the dominant Pass-1 error, corrected in Pass-2).

**Hard-collision files** (BG + BH both write): `src/index.ts` (WS4/WS7), `scripts/gates.mjs` (WS1/7/10/12), `src/components/ui/**` (WS10/WS12), `CLAUDE.md` (15 BG specs append), the dock god-modules (WS2), the viz/glass substrate god-modules (WS3/WS5/WS8). The ONE shared file BH touches concurrently is `vite.library.ts` (BG-WS6 edits different lines — coordinate the file, not the lines, with a merge checkpoint).

**Truly concurrent with BG (now):** B0 · B1 (a/b/c) · B2.0 (alias+codemod) · B2.1-mechanism · B2.4a (the 3 BH carves) · B4a · B4b-skeleton · B4c-files · B4d-files · B5a (after WS3) · B6.

**Sequence after the named BG wave:** B2.4b (after WS4) · B2.4c (after WS5) · B2.5 (after WS2) · B4c-extraction (after WS2). **After WS12 (full close):** B2.1-swap · B2.2 · B2.3 · B2.6 · B3 (all δ after WS4) · B4b-content · B4d-registration · B4e · B5b · B5c · B7. **B4f (CLAUDE.md delete) is the absolute last act** — after WS12 and after B5c re-homes the gates.

The only intra-post-WS12 sequencing edges: `B5c → B4f` and `{B2.6, B4e} → B4f`. The DAG is acyclic.

---

## §4 The band + wave table

Sequencing legend: **[C]** concurrent · **[WSn]** after BG.WSn · **[WS12]** after full BG close.

### B0 — Repo hygiene / scratch-sweep · 1 wave
- **W0-scratch-sweep [C], first.** Files: `git rm --cached test-results/` (3 accidentally-tracked Playwright artefacts); `git clean -ndX` preview then force the 99 root scratch images (28MB, gitignored); `rm -rf .playwright .tmp`; delete the dead `.browserslistrc`; `git mv BD-CONTINUATION-PROMPT.md docs/tranches/BD/`; append `.gitignore` (`.tmp/`, `.playwright/`, `test-results/`); re-target `.githooks/commit-msg` off `--tranche=BB` to env-driven. Do NOT touch BG's `D .retired-classes.txt`.
- **Gate:** `git status` scratch-clean + `git ls-files | rg 'test-results/|\.browserslistrc' = 0` + a dry-run-preview artefact.

### B1 — Legacy excision + payload fix · 2-3 waves
- **W1-external-payload [C], coordinate file with WS6.** `vite.library.ts:60-74` libraryExternal — drop dead `lucide-vue-next`+`vaul-vue`, add `@lucide/vue` (+`perfect-freehand` if it leaks); re-baseline `profile:budget` downward. **Gate:** dist-grep no `createLucideIcon-*`/lucide-in-vendor; budget GREEN.
- **W2-value-destraddle [C].** `package.json:1058` (deps) + `:1096` (peerDeps) `^0.13.0 || ^1.0.0` → `^1.2.0` (keyframes 5.1.0 transitively deps value `^1.2.0`). Typecheck the 9 import sites against 1.x first. **Gate:** `proof:peer-conformance`/`proof:constellation-spine` non-vacuously GREEN.
- **W3-dragmorph-snap-excise [C].** Excise the ~12L `commitSnapOnRelease` re-roll → kf 5.1.0 `DragOptions.snap` (`snap: targets.map(t => t.center)`); KEEP `nearestTarget`/`nearestValue`. Fix the `useVizChoreography` stale `Oscillator` comment. **Gate:** green build + green drag-morph unit/π. (The 3 CONSUME interims carry ZERO upstream asks — all met at the pinned 5.1.0/1.2.0; border-progress already discharged.)

### B2 — Src restructure → 5.0.0 export surface · ~9-10 waves (most-likely-to-split band)
- **W-alias-codemod (B2.0) [C], first.** The 3-plane `@glass` alias (`tsconfig.json` paths + `vite.config.ts` resolve.alias + **`vitest.config.ts` resolve.alias** — vitest does not read vite's) + the proven 492-rewrite demo codemod + the proven 227-rewrite tests codemod. Decouples 700+ deep-relative `../../../src/...` imports from src depth so every later move is one-line. **Gate:** `npm run test` + `npm run typecheck` + demo route-walk GREEN (pure depth-decouple, no semantic delta).
- **W-regen-mechanism (B2.1-mech) [C].** Author the **fail-CLOSED** `regen-exports.mjs` (`research/proto/regen-exports-failclosed.mjs`) + the 3 policy maps (CURATED 11 + COMPOSABLE_SUBPATHS 7 + the exhaustive PUBLISH/INTERNAL/CURATED per-dir classification) + the shared map module feeding both `libraryEntries()` and the generator + the symbol-fidelity existence check. **Gate:** real→exit 0 EXACT_REPRODUCTION; `--inject-unclassified`→exit 1; `--break-fidelity`→exit 1 (the 3 RAN cases as the self-test bite).
- **W-regen-swap (B2.1-swap) [WS12].** Glob-swap + delete `src/subpaths/` (79 files) + regen `package.json` exports against the **landed post-WS12 surface** (captures WS6's +2 siri subpaths + WS5's viz deletes/renames — re-derived via the generator, NOT the 4.2.0 snapshot) + re-author `flatten-subpath-types.mjs` for the new colocated dts emit + Stage-B rewrite of `tests/public-surface.spec.ts`. **Gate:** `verify-export-types` post-build GREEN; `proof:subpath-enumeration` re-pinned; the spec's `exactSubpathRuntimeSurfaces` arm GREEN (the no-silent-vanish proof).
- **W-api-fold (B2.2) [WS12].** Fold-delete `src/api/` (both files); drop the `./api` key; the 3 orphan re-homes (Surface→/card, MenuItemVariants→/command, ControlSize→/forms — each ADDS one export, the only 3 of 203) + fix the stale `search/index.ts:5`/`api/index.ts:500` ControlSize prose; add the 203-row migration-map arm to `public-surface.spec`; re-point the ~9 source-importing fixture gates (deck-progress-rail, control-tokens, storybook-complete, glass-prune, completion-seal, instrument-scope, config-chassis, viz-papergrid, spa-view). **Gate:** the 203-row map arm GREEN; `proof:crossrepo-asks` names the 2 /api consumer dispositions.
- **W-curated-relocate (B2.3) [WS12].** Relocate `src/types/html-attributes.d.ts`→`src/`; move the 11 curated flat barrels `src/*.ts`→`src/entries/` (keys + chunk names UNCHANGED — source-only, not export breaks). **Gate:** `verify-export-types` GREEN; unchanged key count.
- **W-bh-carves (B2.4a) [C]** (the optional `motion/gooBarbellGeometry.ts` shared-geometry fold sequences after WS4). `CarouselContent.vue`→`ui/carousel/composables/useCarouselWorm.ts`; `PagerDots.vue`→`pager-dots/composables/usePagerWorm.ts`; `useBloomUp.ts`→audit-then-relocate (AppSwitcher-only signal → likely single-consumer relocate). **Gate:** `proof:no-god-module` GREEN with the shader exemption (`src/**/*.{wgsl,glsl,frag,vert}.ts` — RAN clean, catches exactly the 3 shader god-modules); carved-leaf reader-gates follow the composition into the leaf; byte-identical render π.
- **W-leaf-verify-ws4 (B2.4b) [WS4].** Consume/verify `createCanvasLifecycle`/`useWebGPUCanvas`/`useGlassBackdropLuminance`/`SegmentedTabs` match BG's landed leaf shapes; re-point BH reader-gate expectations if BG diverged. Zero BH carve.
- **W-leaf-verify-ws5 (B2.4c) [WS5].** Consume/verify `useBlobSatellites`/`useGooDotMatrix`.
- **W-dock-leaf-verify (B2.5) [WS2].** Consume/verify `GlassDock`/`useDockFission` (carved by WS2) + `useDockContextSilhouette` DEFINITION-ABSENT (deleted by WS2) + reconcile the stale `AppSwitcher.vue:3` comment. Zero BH carve.
- **W-styles-colocation (B2.6) [WS12].** The 9 SAFE sheets (border-progress, completion-seal, configurator, instrument-chassis, hover-popover, drawer, segmented-tabs, select, icon-chip) via the PROVEN GATHER + @import-rewrite mechanism (NOT lightningcss bundle — that breaks the critical/deferred split); `critical-partition.mjs` UNCHANGED; `package.json` `files[]` audit (`npm pack --dry-run`); the ~30 gate path-literal re-points fold into the post-WS12 gates pass. KEEP global: tokens/theme/typography/glass roots, the 5-reader `glass-specular-track`, menu, feedback-tone, dock-controls, cards, paper, transitions/animations/scroll, utilities, fonts. **Gate:** `diff -r dist/styles_before dist/styles_after` EMPTY + a built-consumer smoke import.

### B3 — Demo restructure · ~6 waves · all after WS4
("after WS4" covers WS1/WS2/WS5's demo splits too — WS4 is build-last among the demo-god-module owners.)
- **δ1-code-fold-consume [WS4].** Adopt BG-WS4's fold direction (CodeBlock→Code); do NOT re-fold. Consume/verify the DemoFrame/StorySectionHeader deletes (`_chassis` extirpation is BG-WS4's job — BH verifies it landed).
- **δ2-dock-layers-shell [WS4]** (overlaps WS2 `BG.W-SHELL-DOCK-DRY` — verify-against). Dissolve `demo/composables/` (no top-level composables dir): `useStoryNavigation`→`chassis/`, `useContextualDockLayers`→`shell/`.
- **δ3/δ4-chassis-colocation [WS4]** (overlaps WS4 chassis-consolidate). The flat `stories/` root files → `chassis/{page,hero,section,landing,showcase,code,play}/`; `story-hero.css` split; `layout/`→`shell/`; `presets/`→`configurator/presets/`; orphaned `stories/aurora/`→`stories/substrates/aurora/`; eggs sub-dir colocation.
- **δ5/δ6-manifest-carve+glob [WS4].** Split `manifest.ts` (1236L)→`chassis/manifest/{rows/<category>, types, lazy, categories, landing, index}` AND change the glob `./*/*.vue`→`./*/*/index.vue` (key `./${cat}/${id}/index.vue`) **in the same wave as the first per-story-dir move** (without it every story renders blank — runtime route-walk evidence, NOT grep). Reconcile `BG.W-MANIFEST-COLOCATE` (BG keeps `manifest.ts`, folds the 4 parallel maps) — decide row-split vs accept on the post-WS4 line count. **KISS guard:** a story stays FLAT `<cat>/<id>.vue` unless it has colocated parts/composables/constants (mixed glob, dir-form winning) so ~80 trivial stories don't get contrivance-dirs.
- **δ-stories-smoke-repoint [WS4].** Re-point `tests/stories.smoke.spec.ts` with the manifest carve; assert every row resolves.
- **Band gate:** runtime route-walk (non-null component per manifest row — grep insufficient); the 82-script/292-literal `/index.vue` edits + 10 manifest re-points + the `**`-walker re-baseline GREEN; stories.smoke GREEN.

### B4 — Docs: CLAUDE.md delete + redistribution + precepts extraction · ~7 waves
- **B4a-archive-refresh [C].** Archive `docs/constellation/`, `docs/audits/runs/2026-06-03-glass-ui-self/`; refresh `docs/instructions/README.md`; dedup `style-audit.md`; refresh `overfitting-audit.md`.
- **B4b-skeleton [C].** Author `docs/canon/` + `docs/design/` SCAFFOLDS (empty-but-present) + the two resolver seams (`scripts/lib/canon-doc.mjs` + `design-docs.mjs`, both prototyped) + `auditCanonHomes()`/`auditDesignHomes()` + a `docs/canon/README.md` index + **generate `structure.md` from disk** (the same colocated-barrel glob regen-exports uses) so the 5-reader hot file cannot drift.
- **B4b-content [WS12], per-component after the owning wave.** The actual contract-prose copy. The redistribute SOURCE is a moving target (12 un-applied Append/INSERT blocks + 75 BB/BC/BD/BE wave tokens in the live CLAUDE.md; BG WS2/9/10/12 rewrite DOCK_SPRING/handmark/de-shadcn/RATCHET prose). motion-system DOCK_SPRING after WS2; glass-system + READMEs after WS3/WS8; handmark README after WS9; de-shadcn after WS10. `auditCanonHomes()` asserts content-complete (non-empty + the contract token present), not skeleton-present. Author the ~28 missing per-component READMEs (canonical-readme-shape; 22 exist).
- **B4c-precept-extract [files C / extraction WS2 / gate re-points WS12].** Extract the 4 glass-ui design docs (`design-idioms`, `motion-canon`, `tunable-anim`, `affordance-map`) from the precepts SUBMODULE → `docs/design/` as new repo files; re-point the 10 precept-reading gates via `design-docs.mjs`; **by-name ask to `mkbabb/precepts` for the upstream delete** (repo-local draft + ask, per §2). Extraction after WS2 (which rewrites DOCK_SPRING `0.32/0.7`→`0.68/0.64` — else BH extracts the stale value). EXCLUDE the 2 `cross-repo-dev-resolution.md` readers (stay base); `infra/`+`glossary/` stay (fourier/feedback-coder content).
- **B4d-evidence-prune [files C / registration WS12].** Prune ~25-30 of 44 dead `consumer-evidence/` files; add `proof:consumer-evidence-live` (every file gate-referenced OR deleted).
- **B4e-doc-slim [WS12].** Slim CHANGELOG (267KB)/DESIGN (163KB)/MIGRATION (97KB); reshape MIGRATION for the 5.0.0 by-name-ask map; refresh README import examples. **Dual-doc coordination:** `proof:on-glass-fg`+`proof:surface-axis` read BOTH CLAUDE.md AND MIGRATION.md — sequence their two parse-target moves TOGETHER with B5c. `proof:ay/az/ba-final` CHANGELOG-section targets follow the archive split.
- **B4f-claude-delete [WS12 + after B5c, ABSOLUTE LAST].** DELETE CLAUDE.md (no replacement, per §2-#1). All live contracts already redistributed (B4b); all ~16 reader gates already re-homed (B5c). **Gate:** `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` (readFileSync sites) = 0; the file is gone; every redistributed contract has a live gate asserting against its new home.
- **Band gate:** `auditCanonHomes()`+`auditDesignHomes()` GREEN; `proof:consumer-evidence-live` GREEN; no gate reads a deleted doc.

### B5 — Backbone + build-mechanism + gate/script consolidation · ~4 waves
- **B5a-deps-currency [WS3].** Record the dependency-currency + shadcn-vue verdict in `docs/canon` (keep `components.json` for `add`, fix `baseColor: slate`); split the `vite.style-assets.ts` god-module (566L) → `style-fold`/`utility-emit`/`critical-split` sub-plugins. (WS3-touched at L497-501; WS9 touches the SFC-fold — after WS3 minimum.)
- **B5b-gate-manifest-extract [WS12].** Extract the gates.mjs table+prose → `scripts/gates.manifest.mjs`; `gates.mjs`→~300L runner; `--list local|ci|release|full` byte-identical. Design the manifest as the append-merge surface for all post-BG row work. **Gate:** `--list` byte-identical pre/post.
- **B5c-gate-rehome [WS12].** The 16 CLAUDE-readers via `canon-doc.mjs` + the 10 precept-readers via `design-docs.mjs`. `proof:claude-structure-sync`→generated `structure.md` (the png-arm splits to `proof:visual-png-tracked`); `proof:doc-override-idiom`→README.md; `accent-tone` DROPS the read. **Cross-reference the table against the B2 deletion set** (gates that also read deleted wiring — `accent-tone` reads `src/subpaths/selectable-chip.ts` — re-point BOTH arms or ENOENT-break). **Re-emit `ci.yml`** (`npm run gates:emit-ci`) + assert `proof:gen-ci-fresh` GREEN (ci.yml is generated + byte-matched in the RELEASE set — a drifted ci.yml refuses to publish). **Gate:** `proof:gate-manifest-sound` GREEN + no gate readFileSyncs a deleted doc; `proof:gen-ci-fresh` GREEN.
- **B5d-detector-kit — DEFER past BH** (164-script blast radius). Do the closed-wave gate-census subset only.

### B6 — Three reusable core prompts · 1 wave · [C]
- **W-core-prompts.** Authored repo-local at `docs/tranches/BH/prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-FRONTEND}.md` (+ README). Carry the live anti-pattern catalog by name; obey STYLE.md. Per §2-#5 the promotion to `docs/precepts/instructions/prompts/` is a by-name ask to `mkbabb/precepts`, NOT an in-repo submodule mutation. **Gate:** prompts exist, cross-linked, cite the binding edicts; a self-consistency read (no STYLE.md banned words). (This deliverable is authored as part of tranche-dev — see `prompts/`.)

### B7 — Consumer-migration cross-repo asks · 1-2 waves · [WS12]
- **W-api-ask-roster.** The 5.0.0 export break is **exactly ONE dropped key (`./api`) + its 203-symbol re-home** (the flat-barrel moves + subpaths-delete are key-preserving). The roster is **exactly 2 by-name asks**: muster→/aurora (`useAuroraConfig.ts:47`, `DEFAULT_AURORA_CONFIG`+`AuroraConfig`); speedtest→/timeline (`PhaseTimeline.vue:52`, `TimelineSegment`, + drop the dead `vite.config.mjs:1033` optimizeDeps string in the same ask). Map authored at `docs/tranches/BH/coordination/asks-and-consumes.md`; asks issue at the 5.0.0 cut after B2.2 lands. **Cross-reference:** BG-WS5 OWNS the viz-subpath (`/constellation`, `/fourier-field`) consumer migration with SLIDES as the named consumer — confirm BG-WS5 carries it (the post-WS12 export-delta surfaces any key drop). The constellation census records bbnf-buddy + slides-K as non-/api consumers (all keys preserved, no ask). The B1c kf/value interims carry ZERO asks. **Gate:** `proof:crossrepo-asks` GREEN; the 203-row map byte-complete against the export diff.

**Total: ~30 waves across 8 bands.**

---

## §5 Residual risks accepted into execution

None blocks authoring; all are flagged-at-execution, both final critics confirm.

1. **Re-baseline-after-WS12 (the dominant residual, gate-FORCED).** The 203-row /api map + the fail-closed classification + the `proof:subpath-enumeration` baseline are 4.2.0 snapshots. The binding 5.0.0 versions can only be derived post-WS12 against the landed surface (WS6 +2 siri, WS5 viz deletes/renames). The fail-closed gate FORCES classification of each BG-added dir but cannot pre-judge PUBLISH-vs-INTERNAL for a novel dir — a human call at re-baseline against the WS5/WS6 specs. Mechanical re-run procedure: re-run `regen-exports-failclosed.mjs` + `regen-api-migration.mjs` post-WS12, classify surfaced dirs, regen, re-pin, re-emit ci.yml.
2. **Symbol-set fidelity is binding only post-build.** The static gate proves barrel-EXISTS; `verify-export-types` + the rewritten `public-surface.spec` prove the symbol set faithful on real dist (lands B2.1 after WS12). The 203-row map is the input contract, not a substitute.
3. **`flatten-subpath-types.mjs` re-author** is specced (not yet built) — owed at B2.1.
4. **The regen still hard-codes `CSS_FONT_EXPORTS` + the `./api` `TYPES_OVERRIDE`** verbatim — the B2.2 drop needs manual removal of that override entry.
5. **speedtest's `vite.config.mjs:1033` build-config string** is distinct from the source import — folded into the speedtest B7 ask so it is complete.
6. **`words/frontend/glass-ui/` is a vendored d6 fork** (inv-11 lineage), NOT a registry consumer — owes no 5.0.0 ask. Disposition note, not a B7 row.
7. **B2 wave-count overflow** — 9 sub-moves + 4 amendments realistically lands 9-10 waves; authored with the amendments as named sub-moves so the band splits cleanly.

---

## §6 Execution de-risk tooling (built + RAN)

All under `docs/tranches/BH/research/proto/` — rebuilt as real gates during execution:
- `regen-exports-failclosed.mjs` — RAN 3 cases (real→exit0 EXACT_REPRODUCTION 96/96 keys; `--inject-unclassified`→exit1; `--break-fidelity`→exit1). Becomes `proof:subpath-classify`.
- `regen-api-migration.mjs` + `API-MIGRATION-MAP.md` + `api-migration-{table,rows,summary}.json` — the 203-row /api fold map (199 types + 4 consts), union-complete (0 dropped/dup/phantom).
- `canon-doc.mjs` / `design-docs.mjs` — the two gate-rehome resolver seams (RAN fail-explicit).
- `codemod-glass-alias.mjs` (492 demo rewrites) + `codemod-tests-glass-alias.mjs` (227 tests rewrites) — both RAN clean, 0 regex-unsafe.
- `shader-exemption-probe.mjs` — RAN clean (`src/**/*.{wgsl,glsl,frag,vert}.ts`, catches exactly the 3 shader god-modules).
- `P3.3-SIBLING-CONSUMER-ROSTER.md` — the read-only sibling grep (the exact 2-ask B7 roster).
- `P5-god-module-carve-plans.md` — symbol-level carve plans for the 13 non-shader god-modules.

---

## §7 The 5.0.0 break, exactly

The whole consumer-facing break is: **drop `./api`** + re-home its 203 symbols onto their owning subpaths (200 pure path-swaps; 3 orphans add an export — Surface→/card, MenuItemVariants→/command, ControlSize→/forms). Across the entire constellation, exactly **2 sibling repos** import `/api` (muster, speedtest) — each owes a one-line by-name ask. Every other published key is preserved by the regen (proven: 96/96 keys reproduce, `./api` the only intentional drop). The flat-barrel relocations (B2.3) and the subpaths-delete (B2.1) are key-preserving and carry no consumer break.

---

## §8 Convergence record

Three pass-loops (the user's methodology: research → synthesize → prototype → critique → synthesize, looped):
- **Pass 1** (8 research lanes + synthesis) → **74%.** Established the shape; reframed "dirty" to "disciplined, de-indirection."
- **Pass 2** (5 prototypes + 4 critics [62,79,63,76] + synthesis) → **82%.** Proved the export-glob mechanism (0-delta), corrected the BG-close anchor (WS12 not WS7), found `/api` is a 164→203-symbol fold with a sibling consumer.
- **Pass 3** (3 prototypes + 2 critics [90,91] + synthesis) → **91%, authorable.** Built the 203-row map, made the regen gate fail-CLOSED, grepped the exact sibling roster, specced the tests-tree codemod.

The remaining 9% is interleave-inherent (the post-WS12 re-baseline) — gate-forced mechanical re-runs of proven scripts, not unresolved design.

---

## §9 Execution start

The plan is developed; execution awaits greenlight (BG is mid-flight). The **concurrent-safe bands run now without touching BG's write-set**: B0 (scratch sweep), B1 (the lucide payload bug + value.js de-straddle + the snap excise), B2.0 (the `@glass` alias + codemods), B2.1-mechanism, B2.4a (the 3 carves), B4a/B4b-skeleton/B4c-files/B4d-files, B5a (after WS3), B6 (the prompts). The file-moving / export / gate / CLAUDE bands sequence after WS12 per §3. The whole tranche cuts jointly with BG as **5.0.0**.
