# BH bands × the BG timeline — the interleave map

The execution-side projection of `docs/tranches/BH/PLAN.md §3` onto the live BG build order. Every BH
wave (B0..B7, ~30) is tagged by its BG-interleave class so the orchestrator can fire the concurrent-safe
set now and queue the file-moving / export / gate / CLAUDE bands behind the wave that owns their write-set.

**Class legend** — **[C]** concurrent-safe (run now, dodges BG's write-set) · **[WSn]** unblocks after
BG.WSn lands · **[WS12]** after full BG close. The class is the HARD unblock edge, not the §3 execution
batch (§3 clusters several [WS4] demo waves into the post-WS12 run for convenience — recorded per-row).

**BG build order (the gating axis):** core `WS1→WS3→WS2→WS5→WS6→WS4→WS7`, deep-morphism
`WS8→WS9→WS10→WS11`, then **WS12 coherence capstone LAST** (≈110 waves). "Full BG close" = after WS12,
NOT WS7 (the Pass-1 error, corrected in Pass-2). Joint cut as **5.0.0**.

---

## §1 The interleave table (every BH wave, tagged)

### B0 — Repo hygiene · 1 wave
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| W0-scratch-sweep | **[C]** | — | `test-results/`, root scratch images, `.browserslistrc`, `.gitignore`, `.githooks/commit-msg`, `BD-CONTINUATION-PROMPT.md`→`docs/tranches/BD/` | first. Do NOT touch BG's `D .retired-classes.txt`. |

### B1 — Legacy excision + payload fix · 3 waves
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| W1-external-payload | **[C]** | — | `vite.library.ts:60-74` libraryExternal · `profile:budget` rebaseline | **shared-file checkpoint w/ WS6** (§3 — coordinate the file, not the lines). |
| W2-value-destraddle | **[C]** | — | `package.json:1058,1096` value `^0.13.0\|\|^1.0.0`→`^1.2.0` | typecheck 9 import sites against 1.x first. |
| W3-dragmorph-snap-excise | **[C]** | — | `useDragMorph` snap re-roll → kf 5.1.0 `DragOptions.snap`; `useVizChoreography` stale comment | the 3 CONSUME interims carry ZERO upstream asks. |

### B2 — Src restructure → 5.0.0 export surface · ~9-10 waves
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| W-alias-codemod (B2.0) | **[C]** | — | `tsconfig.json`+`vite.config.ts`+`vitest.config.ts` `@glass` paths; 492 demo + 227 tests rewrites | first in B2. Depth-decouple, no semantic delta — unblocks every later move as one-liners. |
| W-regen-mechanism (B2.1-mech) | **[C]** | — | NEW `scripts/regen-exports.mjs` (fail-CLOSED) + 3 policy maps + shared map module | becomes `proof:subpath-classify`. No src move. |
| W-bh-carves (B2.4a) | **[C]** ¹ | — | `CarouselContent.vue`→`ui/carousel/composables/useCarouselWorm.ts`; `PagerDots.vue`→`pager-dots/composables/usePagerWorm.ts`; `useBloomUp.ts` relocate | ¹**`ui/carousel` arm collides w/ WS10 de-shadcn** — see §2. The optional `motion/gooBarbellGeometry.ts` fold is **[WS4]**. |
| W-dock-leaf-verify (B2.5) | **[WS2]** | WS2 | verify-only: `GlassDock`/`useDockFission` carved · `useDockContextSilhouette` DEFINITION-ABSENT · `AppSwitcher.vue:3` stale comment | ZERO BH carve (WS2 owns the dock god-modules). |
| W-leaf-verify-ws4 (B2.4b) | **[WS4]** | WS4 | verify `createCanvasLifecycle`/`useWebGPUCanvas`/`useGlassBackdropLuminance`/`SegmentedTabs` leaf shapes; re-point BH gate expectations if BG diverged | ZERO BH carve. |
| W-leaf-verify-ws5 (B2.4c) | **[WS5]** | WS5 | verify `useBlobSatellites`/`useGooDotMatrix` | ZERO BH carve. |
| W-regen-swap (B2.1-swap) | **[WS12]** | WS12 | glob-swap + **delete `src/subpaths/` (79)** · regen `package.json` exports vs the **landed** surface · re-author `flatten-subpath-types.mjs` · rewrite `tests/public-surface.spec.ts` | re-baseline checkpoint (captures WS6 +2 siri, WS5 viz deletes/renames). |
| W-api-fold (B2.2) | **[WS12]** | WS12 | **fold-delete `src/api/` (both files)** · drop `./api` key · 3 orphan re-homes (Surface→/card, MenuItemVariants→/command, ControlSize→/forms) · re-point ~9 fixture gates | the only consumer break (§5). |
| W-curated-relocate (B2.3) | **[WS12]** | WS12 | `src/types/html-attributes.d.ts`→`src/`; 11 curated flat `src/*.ts`→`src/entries/` | **key-preserving** (source-only, no export break). |
| W-styles-colocation (B2.6) | **[WS12]** | WS12 | 9 SAFE sheets via GATHER+@import-rewrite; `critical-partition.mjs` UNCHANGED; ~30 gate path-literal re-points fold into the gates pass | **→ B4f edge** (§4). `diff -r dist/styles_before _after` EMPTY. |

### B3 — Demo restructure · ~6 waves · all **[WS4]**
("after WS4" subsumes WS1/WS2/WS5 demo splits — WS4 is build-last among the demo-god-module owners. §3
batches these in the post-WS12 run, but the hard edge is WS4.)
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| δ1-code-fold-consume | **[WS4]** | WS4 | adopt WS4's CodeBlock→Code fold; verify DemoFrame/StorySectionHeader/`_chassis` deletes landed | consume, do NOT re-fold. |
| δ2-dock-layers-shell | **[WS4]** | WS4 | dissolve `demo/composables/`; `useStoryNavigation`→`chassis/`, `useContextualDockLayers`→`shell/` | overlaps WS2 SHELL-DOCK-DRY — verify-against. |
| δ3/δ4-chassis-colocation | **[WS4]** | WS4 | flat `stories/` roots→`chassis/{page,hero,section,…}/`; `layout/`→`shell/`; `presets/`→`configurator/presets/` | overlaps WS4 chassis-consolidate. |
| δ5/δ6-manifest-carve+glob | **[WS4]** | WS4 | split `manifest.ts` (1236L); glob `./*/*.vue`→`./*/*/index.vue` IN THE SAME WAVE as first per-story-dir move | else every story renders blank (runtime route-walk, not grep). KISS: trivial stories stay FLAT. |
| δ-stories-smoke-repoint | **[WS4]** | WS4 | re-point `tests/stories.smoke.spec.ts`; assert every row resolves | |

### B4 — Docs: CLAUDE.md delete + redistribution + precepts extraction · ~7 waves
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| B4a-archive-refresh | **[C]** | — | archive `docs/constellation/`, audit run dirs; refresh instructions/README, overfitting-audit | |
| B4b-skeleton | **[C]** | — | `docs/canon/`+`docs/design/` SCAFFOLDS · `canon-doc.mjs`/`design-docs.mjs` seams · `structure.md` generated from disk | empty-but-present + resolvers. |
| B4c-precept-extract | **[C]** files / **[WS2]** extraction / **[WS12]** gate re-points | WS2, WS12 | extract 4 design docs → `docs/design/`; 10 precept-reader re-points; by-name ask to `mkbabb/precepts` | extraction after WS2 (DOCK_SPRING `0.32/0.7`→`0.68/0.64` — else stale). |
| B4d-evidence-prune | **[C]** files / **[WS12]** registration | WS12 | prune ~25-30 of 44 `consumer-evidence/`; add `proof:consumer-evidence-live` | |
| B4b-content | **[WS12]** | WS12 ² | the contract-prose copy into `docs/canon`; ~28 missing READMEs | ²per-component edges: DOCK_SPRING after WS2 · glass+READMEs after WS3/WS8 · handmark after WS9 · de-shadcn after WS10 · **RATCHET prose after WS12** (the [WS12] floor). |
| B4e-doc-slim | **[WS12]** | WS12 | slim CHANGELOG/DESIGN/MIGRATION; reshape MIGRATION for the 5.0.0 ask-map | **dual-doc:** `proof:on-glass-fg`+`proof:surface-axis` read CLAUDE.md AND MIGRATION.md — move the two parse-targets TOGETHER with B5c. **→ B4f edge** (§4). |
| **B4f-claude-delete** | **[WS12] ABSOLUTE LAST** | WS12 + B5c | **DELETE `CLAUDE.md`** (no replacement) | see §4 — the last act of the tranche. |

### B5 — Backbone + build-mechanism + gate/script consolidation · ~4 waves
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| B5a-deps-currency | **[WS3]** | WS3 | record deps/shadcn-vue verdict in `docs/canon`; split `vite.style-assets.ts` (566L)→3 sub-plugins | WS3 touches L497-501; WS9 touches the SFC-fold (after WS3 min). |
| B5b-gate-manifest-extract | **[WS12]** | WS12 | `gates.mjs` table+prose→`scripts/gates.manifest.mjs`; runner→~300L; `--list` byte-identical | the append-merge surface for post-BG row work. **HARD-COLLISION: `scripts/gates.mjs`** (§2). |
| B5c-gate-rehome | **[WS12]** | WS12 | 16 CLAUDE-readers via `canon-doc.mjs` · 10 precept-readers via `design-docs.mjs` · `claude-structure-sync`→generated `structure.md` · re-emit `ci.yml` | **→ B4f edge** (the readFileSync removal that lets B4f delete safely). cross-ref the B2 deletion set (`accent-tone` reads a deleted subpath — re-point BOTH arms). |
| B5d-detector-kit | **DEFER past BH** | — | — | 164-script blast radius; closed-wave gate-census subset only. |

### B6 — Three reusable core prompts · 1 wave
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| W-core-prompts | **[C]** | — | `docs/tranches/BH/prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-FRONTEND}.md`+README | repo-local; promotion to precepts is a by-name ask. |

### B7 — Consumer-migration cross-repo asks · 1-2 waves
| Wave | Class | Gating | File-bounds / collision | Note |
|------|:-----:|:------:|-------------------------|------|
| W-api-ask-roster | **[WS12]** | WS12 + B2.2 | the 2 by-name asks: muster→/aurora · speedtest→/timeline (+ drop dead `vite.config.mjs:1033`) | issues at the 5.0.0 cut after B2.2 lands. Confirm BG-WS5 owns the viz-subpath/slides migration. |

---

## §2 Hard-collision files + the merge-checkpoint protocol

BG owns the entire `src/` + `demo/` + `scripts/gates.mjs` + `src/index.ts` write-set. The interleave
classes already serialize most of this (the colliding BH waves are [WS12]). The residual concurrent
exposure is one shared build-config file + one [C] carve that grazes a BG-owned dir.

| File | BG writer | BH writer | Resolution |
|------|-----------|-----------|------------|
| `src/index.ts` | WS4, WS7 | B2.1-swap / B2.2 / B2.3 (export reshape) | BH-no-touch until [WS12] — sequencing serializes it. |
| `scripts/gates.mjs` | WS1, WS7, WS10, WS12 | B5b (extract), B5c (rehome), B2.6/B2.2 path re-points | BH-no-touch until [WS12]; B5b extracts AFTER WS12's last `gates.mjs` write. |
| `src/components/ui/**` | WS10 (de-shadcn), WS12 | B2.2 orphan re-homes (card/command/forms barrels); **B2.4a `ui/carousel/CarouselContent.vue` carve** | B2.2 is [WS12] (safe). **B2.4a's carousel arm is the one [C]×WS10 graze** — register a file-checkpoint: land the carve before WS10 rewrites `CarouselContent.vue`, or rebase the carve onto WS10's render. The PagerDots + useBloomUp arms are clear (custom/ + composables/). |
| `CLAUDE.md` | 15 BG specs append (WS1-WS12) + WS2/9/10/12 prose-rewrites | B4b-content (read), B4f (delete) | BH-no-touch until [WS12]; B4f absolute-last (§4). |
| dock god-modules | WS2 (MORPH-UNIFY/DECOMPOSE) | none (B2.5 verifies, B4c extracts prose) | BH carves ZERO dock — WS2 owns it. |
| viz/glass substrate god-modules | WS3, WS5, WS8 | none (B2.4b/B2.4c verify) | BH carves ZERO substrate — BG owns it. |
| `vite.library.ts` | **WS6** (+2 siri subpath entries) | **B1-W1** (libraryExternal lines) | **the ONE genuinely-shared concurrent file.** Coordinate the FILE, not the lines, with a pre-land sync checkpoint between B1-W1 and WS6. |

**Merge-checkpoint protocol.**
1. **Serialize-by-class** — every hard-collision BH wave that WRITES a BG-owned file is [WS12]; the
   interleave classes are the lock. No concurrent write to `src/index.ts` / `gates.mjs` / `CLAUDE.md`.
2. **File-level coordination on the two grazes** — `vite.library.ts` (B1-W1 × WS6) and
   `ui/carousel/CarouselContent.vue` (B2.4a × WS10): coordinate at FILE granularity with an explicit
   sync checkpoint before the BG owner lands; rebase the BH edit onto BG's if BG lands first.
3. **The post-WS12 re-baseline checkpoint** (the dominant residual, PLAN §5-1) — B2.1-swap / B2.2 regen
   `package.json` exports + the 203-row map + `proof:subpath-enumeration` against the **landed** surface,
   NOT the 4.2.0 snapshot: re-run `regen-exports-failclosed.mjs` + `regen-api-migration.mjs`, classify
   the BG-added dirs (WS6 siri, WS5 viz deletes/renames), regen, re-pin, re-emit `ci.yml`.

---

## §3 The post-WS12 sequencing DAG

Once WS12 lands, the [WS12] cluster runs. It is NOT a flat batch — three intra-edges order it (PLAN §3,
acyclic):

```
  B5c ─────────────┐
  {B2.6, B4e} ─────┤──► B4f   (CLAUDE.md delete, absolute last)
```

- **`B5c → B4f`** — B5c re-homes the ~16 CLAUDE-reading gates (via `canon-doc.mjs`) + the 10
  precept-readers (via `design-docs.mjs`); until every `readFileSync('CLAUDE.md')` is gone, B4f's delete
  ENOENT-breaks the gates. B5c MUST precede B4f.
- **`{B2.6, B4e} → B4f`** — B2.6 folds ~30 gate path-literal re-points into the gates pass (the readers
  that also resolve moved style sheets); B4e moves the CLAUDE.md/MIGRATION.md dual-doc parse-targets
  (`proof:on-glass-fg`, `proof:surface-axis`) — both must land their re-points before the file vanishes.
- **B4b-content precedes B4f** by the silent-loss fence — every live contract redistributes into
  `docs/canon` (and gets a live gate at its new home) BEFORE the source is deleted.

All other [WS12] waves (B2.1-swap, B2.2, B2.3, B5b, B7, B4d-registration, B4c-gate-repoints) are
mutually order-free apart from the obvious data edges (B2.1-mech→B2.1-swap; B2.2→B7; B5b→B5c).

---

## §4 B4f — the absolute-last act (CLAUDE.md hard-delete, no replacement)

B4f is the **last wave of the joint tranche** (PLAN §2-#1). It runs ONLY after:
1. **WS12** has landed (the final BG CLAUDE.md prose-rewrite — RATCHET — is done; no further appends).
2. **B4b-content** has redistributed every live contract into `docs/canon` + `docs/design`, each with a
   live gate asserting against its new home (the silent-loss fence — forbidden to lose a contract).
3. **B5c** has re-homed the ~16 reader-gates off CLAUDE.md (`readFileSync` sites → `canon-doc.mjs`) and
   the dual-doc moves (B2.6/B4e) have landed.

Then: `rm CLAUDE.md`, no replacement; future sessions boot from `docs/precepts` (submodule, auto-present)
+ the memory system + the discoverable `docs/canon/README.md` index. **Gate:**
`rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0 · the file is gone · every redistributed contract has a live
gate at its new home.

---

## §5 The 5.0.0 export reshape (subpaths-delete + /api-fold + regen)

Three structural moves collapse the three stacked redundancy layers into ONE generated entry-set:

- **subpaths-delete (B2.1-swap, [WS12])** — delete `src/subpaths/` (79 one-line mirror barrels); the
  build entry-map is re-derived from the real colocated barrels by `regen-exports.mjs`. **Key-preserving**
  (the same `dist/<name>.js` chunk set emits).
- **/api-fold (B2.2, [WS12])** — fold-delete `src/api/` (both files, 854L aggregator); **drop the `./api`
  key** — the ONLY dropped key. 203 symbols re-home: 200 pure import-path swaps + 3 orphans that ADD one
  export each (Surface→/card, MenuItemVariants→/command, ControlSize→/forms).
- **the regen (B2.1-mech [C] authors; B2.1-swap [WS12] runs)** — the fail-CLOSED generator + 3 policy
  maps; `--inject-unclassified`→exit 1, `--break-fidelity`→exit 1. Runs against the **landed post-WS12
  surface** (re-baseline checkpoint, §2) so WS6's +2 siri subpaths + WS5's viz deletes/renames are
  captured by re-derivation, not the 4.2.0 snapshot. `flatten-subpath-types.mjs` re-authored for the
  colocated dts emit. B2.3's 11 curated flat-barrel→`src/entries/` moves are source-only, **key-preserving**.

**The whole consumer break = ONE dropped key (`./api`) + its 203-symbol re-home.** Across the constellation
exactly 2 siblings import `/api` → 2 by-name asks (B7): muster→/aurora, speedtest→/timeline. Every other
published key is preserved (regen proves 96/96 keys reproduce).

---

## §6 Summary

- **Concurrent-now [C] = 12 waves/arms:** B0 · B1{a,b,c} · B2.0 · B2.1-mech · B2.4a · B4a · B4b-skeleton ·
  B4c-files · B4d-files · B6 (B5a is [WS3], not [C]; the mid-flight [WSn] cluster — B2.5/B2.4b/B2.4c/B3×5/
  B4c-extraction/B5a — unblocks across WS2→WS5).
- **After-WS12 [WS12] = 12 acts:** B2.1-swap · B2.2 · B2.3 · B2.6 · B4b-content · B4c-gate-repoints ·
  B4d-registration · B4e · B5b · B5c · B7 · B4f.
- **Absolute-last act:** **B4f** — hard-delete `CLAUDE.md` (no replacement), after WS12 AND after B5c
  re-homes the ~16 reader-gates AND B4b-content redistributes the contracts; gate = `rg CLAUDE.md
  scripts/proof-*.mjs` = 0 + file gone.
