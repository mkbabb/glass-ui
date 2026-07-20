# REFABLE RF-2 — Round-1/2 drift + hygiene censuses (redo)

- **Unit**: RF-2 — doc-and-canon drift + dead-code/dual-paths + colocation census (A07)
- **Original edict**: census doc-vs-disk drift (docs + canon documents vs the actual tree); census dead code and dual paths in src/ + demo/; census the tree against the recursive colocation edict A07.
- **modelId**: `claude-fable-5`
- **Step-2 boundary**: the full ANEW pass ran first against primary sources only — the complete src/+demo/ tree walk, a resolver-correct module-graph reachability walk from the `libraryEntryMap()` + demo + test entries (with `@glass/`, `@mkbabb/glass-ui/*`, `<style src>`, and `import.meta.glob` resolution), the canon/doc path-reference sweep, package.json/exports/policy-map cross-checks, and read-only sibling-repo consumer greps. The first opus artifact (`round-1/doc-and-canon-drift.md`) was opened only after that pass closed; the other three followed in sequence, each claim re-proven on disk.
- **Opus artifacts scrutinized**: `round-1/doc-and-canon-drift.md`, `round-1/dead-code-and-dual-paths.md`, `round-2/colocation-census-edict-a07-….md`, `round-2b-confirm/colocation-census-edict-a07.md`.

## Verdict table

### Round-1 — doc-and-canon-drift

| # | Claim | Verdict | Correction / evidence |
|---|-------|---------|----------------------|
| D1 | Token system unenforceable; raw values ship (drawer `blur(14px)`, SortableList `999px`, segmented `0.3125rem`/`0.25rem`); no proof-*.mjs live | **RATIFIED** | Re-proven: `src/components/drawer/styles.css:379`, `SortableList.vue:144`, `segmented.css:169/306`; `scripts/` holds 7 scripts + lib/, zero proof-*; `package.json` has no proof script |
| D2a | design-idioms §3 home-map rows stale + §7 central-partial rule inverted by the shipped layout | **RATIFIED** | §7 verified in the canonical copy too (`docs/design/design-idioms.md:217-225` still mandates "CENTRAL partial (a `src/styles/*.css` file …), NOT in the component's feature-dir"); 4 §3 rows stale in the canonical copy (`src/styles/cards.css`, `dock-controls.css`, `feedback-tone.css`, `instrument-chassis.css`) plus `src/utils/coalesceMetric.ts`, `_shared/useSurfaceAxis.ts`, `scripts/proof-customizability-census.mjs` |
| D2b | "…the doc was never updated", evidence cited exclusively from `docs/precepts/design-idioms.md` | **OPUS-WRONG** | The artifact audited the `docs/precepts` SUBMODULE copy and missed the canonical in-repo home (`docs/design/`, named by `docs/canon/README.md`). The canonical copy WAS partially updated — its menu row already reads `src/components/_shared/menu.css` and the `utilities/animate.css` row is gone. Two of the six cited stale rows do not exist in the doc of record; the two homes have silently diverged (see F1) |
| D3 | `--corner-k-soft/-sharp` dead tokens kept on a rationale citing the nonexistent `proof:squircle-language` source-arm | **RATIFIED** | `radius.css:112-116` cites the gate; zero `var(--corner-k-soft\|-sharp)` consumers; no such proof script exists |
| D4 | `--radius-input` misnomer — consumed by Skeleton/Avatar/Command, while Input rides `--radius-pill` | **RATIFIED** | `radius.css:35`; `field-control.css:34` (`data-kind="input"` → `--radius-pill`); the three consumers re-proven |
| D5 | tunable-anim documents a fictional 4px `--glass-reveal-blur` default | **RATIFIED** | Line 121 in BOTH copies; code binds per-register `motion-registers.css:57/64/71/80` = 6/2/0/8px. Peripheral slip in the opus claim text ("2px/6px/8px") — the tooltip rung is 0px, per its own evidence |
| D6 | Blur ladder value-collapse (quiet=resting=7px, floating=overlay=11px) + 17px @2dppx overlay jump undocumented | **RATIFIED** | `tokens/glass.css:86-97`, `light-dark.css:34-37`, deep 16px at `glass-deep.css:56` |

### Round-1 — dead-code-and-dual-paths

| # | Claim | Verdict | Correction / evidence |
|---|-------|---------|----------------------|
| X1 | `glass-chip.css` + `glass-atom.css` orphaned from the cascade by the BI chip-fold; `<Chip>`/`<Badge glass>` classes unstyled in dist | **RATIFIED** | Independently re-derived before opening the artifact: zero `@import`/`<style src>` anywhere; 0 hits for either class in `dist/glass-ui.css` AND `dist/styles/index.css` while the partials ship as loose assets in `dist/styles/glass/`; commit 490cc46e deleted `icon-chip/styles.css` carrying the `@import` |
| X2 | `fourier-field/presets.ts` unreachable + obsolete parallel schema; demo hand-rolls its own variants | **RATIFIED** | Re-derived by graph walk; no importer ever (index.ts exports math/constants/composable only); `demo/stories/substrates/fourier-field.vue` owns live variant bundles |
| X3 | Five dead aggregation barrels (`composables/index.ts`, `glass/wave/index.ts`, `glass/webgpu/index.ts`, `sortable-list/composables/index.ts`, `typewriter/composables/index.ts`) + false header in `composables/index.ts` | **RATIFIED** | Same five re-derived independently; leaf-direct imports verified (`SortableList.vue:3`, `TypewriterText.vue:47`); root barrel imports sub-trees directly. Addendum: the same header also names a nonexistent `sortable/` sub-tree, and the barrel `export * from "../components/infinite-scroll/composables"` reaches across the tree |
| X4 | `useStagger` public with zero in-repo use and an unbacked "has external consumers" comment | **RATIFIED** (doc-gap) | No consumer-evidence doc exists — that defect stands. FABLE evidence upgrade: the comment is TRUE — speedtest imports `useStagger` from `@mkbabb/glass-ui/motion-core` in live source (`useResultReveal.ts:36` + ResultStack/SpeedtestResults). Routing is "write the evidence doc", never "retire" |

### Round-2 — colocation census

| # | Claim | Verdict | Correction / evidence |
|---|-------|---------|----------------------|
| C1 | §7 is the dead layout; index.css already `@import`s feature-dir styles at cascade rungs | **RATIFIED** | Every cited line number re-verified (`index.css:183-186, 204-206, 211-212, 225, 227, 229, 237`) |
| C2 | Carve-out: "glass-chip.css … consumed by chip AND combobox (2 surfaces) … correctly central" | **OPUS-WRONG** | Combobox's only "glass-chip" is a code COMMENT (`Combobox.vue:16`); the sole class consumers are the chip family. And the file is not in the cascade at all — the round-1 layer's own orphan finding contradicts this row. Comment-mistaken-for-consumer error class |
| C3 | `composables/glass/wave/` single-consumer (liquid-grid) → colocate | **RATIFIED** | Re-derived; 3 liquid-grid import sites only; off-public |
| C4 | `glass/textureUpload.ts` aurora-only → colocate | **RATIFIED** | Exactly 3 aurora importers (auroraImageSource, wgpuSetup, constants/presets) — not in my initial net; verified on challenge |
| C5 | sidebar: "ZERO library-internal consumers … MOVE to demo + DROP the ./sidebar export (clean break, no library consumer depends on it)" | **OPUS-WRONG** | The in-repo census part holds (no src consumers; demo ×3 + tests), but the proposal's premise is false: **fourier-analysis consumes `useSidebarState` from `@mkbabb/glass-ui/sidebar` in two live SFCs** (`web/src/components/paper/MobileFloatingToc.vue:4`, `PaperSidebar.vue:8`). Dropping the export breaks a real external consumer; any demote must run the consumer-updates ruling, not a "no consumer" clean break |
| C6 | `accent-tone.css` chip-only → colocate | **RATIFIED** | Class user = `chipVariants.ts` only; composable users = chip + the /color quarantine home |
| C7 | `_shared/` exceeds "the ~15-entry break-into-common-modules threshold of A07"; carve into field/menu/feedback/surface/motion | **OPUS-WRONG** (threshold + carve), observation survives | A07 (FEEDBACK-LEDGER row 74) contains NO numeric threshold — "~15-entry threshold of A07" is invented. The proposed surface/ and motion/ groupings are incohesive (disclosure-context+resolveSurfaceClass+primitive are unrelated; `axes.ts` is the published `/axes` grammar-subpath source and cannot be filed under `_shared/motion/`), and round-2b proposes a DIFFERENT carve (surface = resolveSurfaceClass+axes) — the two rounds contradict each other. The downstream FABLE-COLOCATION rejection of the over-carve is **re-verified as correct on the merits**. What survives: 21 flat entries with visible field*/menu*/feedback* clusters — a partial carve is defensible |
| C8 | handmark splits helpers inconsistently vs blob/aurora | **RATIFIED** (shape), counts and fix-direction corrected | Disk shape confirmed (6 loose pure-paint helpers + composables/useHandMark.ts). But "blob all 13 helpers under composables/" = 12 on disk; "aurora 17 under composables/" = 15. And brush/freehand/geometry/ink/noise/texture are pure geometry/paint modules, not composables — if normalized, the honest home is a `handmark/paint/` (or stay flat, already A07-colocated), not `composables/` |
| C9 | `useDockCtaReceive` dock-named in shared motion/ — borderline | **RATIFIED** | Plus F15: it is dual-exported on BOTH `/motion` and `/dock` — two public homes for one symbol |

### Round-2b — confirmation pass (net-new rows only; dup rows carry the round-2 verdicts)

| # | Claim | Verdict | Correction / evidence |
|---|-------|---------|----------------------|
| B1 | backdrop-luminance 3-file cluster dock-only among src components → RELAY as A05 question | **RATIFIED** | `GlassDock.vue` sole src component importer; 2 demo showcases; not on a public barrel |
| B2 | sidebar evidence rows: "useSidebarState has zero consumers anywhere"; "a single src reach, useDockSearch importing useScrollTo"; manifest as consumer | **OPUS-WRONG** | (1) fourier-analysis imports `useSidebarState` ×2 (live source) — "anywhere" is false; (2) `useDockSearch.ts` contains NO import of `useScrollTo` — only comments (lines 30/102); (3) `manifest.ts` mentions the family only inside a story-description string. Comment/string-mistaken-for-consumer, twice more |
| B3 | styles-root grouping note (12 loose root stylesheets; scroll-*/glass-* stragglers) | **RATIFIED** | Enumeration checks out (19 root .css minus 7 aggregators) |
| B4 | "Per-component CSS is now colocated as `<component>/styles.css` across ~40 components" | **OPUS-WRONG** | 20 `styles.css` files exist under src/components (49 component-tree .css total incl. dock/ + tabs/ subdirs + _shared). ~40 is double the disk truth |
| B5 | Demo tree conforms (stories 139 / chassis 30 / shell 21); conforming src exemplars | **RATIFIED** | All three counts verified exactly; dock composables = 14 as claimed. Aurora composable count is the exception: round-2 says 17, round-2b says 16, disk says 15 — the numeric-drift class (also **OPUS-WRONG**, folded here) |

## FABLE-NEW (absent from all four opus layers)

| # | Finding | Evidence |
|---|---------|----------|
| F1 | **Dual-home design-doc divergence**: `docs/design/` (canonical, per canon/README) and the `docs/precepts` SUBMODULE both carry the four design docs; 3 of 4 differ (`design-idioms`, `motion-canon`, `tunable-anim`; `affordance-map` identical). All four opus layers cite `docs/precepts/` and never note the canonical home or the divergence | `diff docs/design docs/precepts`; `git ls-files` shows `docs/precepts` as a submodule pinned at b0f6134 |
| F2 | `docs/design/tunable-anim.md` dock rows stale vs code: row 64 `0.68, 0.64 (BD.W-ANIM-IOS27-TUNE)` and row 77 `--spring-dock-duration 0.66s` — code is `springPreset("dock")` = (0.3, 0.82) and `--spring-dock-settle: 0.19s` chain | `springPresets.ts:95-98`; `scheme-spring.css:143/150` |
| F3 | `docs/design/motion-canon.md:204` `DRAWER_SNAP (0.5, 0.74)` vs code `(0.32, 0.8)` | `drawer/constants.ts:11` |
| F4 | `docs/design/motion-canon.md` cites dead gate scripts `proof-animation-coherence.mjs` + `proof-no-layout-animation.mjs` | Neither exists under scripts/ |
| F5 | `docs/canon/glass-system.md:81-83` cites nonexistent `_shared/useSurfaceAxis.ts` (live mechanism: `_shared/resolveSurfaceClass.ts`) and lists retired GlassPanel + Sheet as live surface-axis carriers | Grep: no useSurfaceAxis in src/; glass-panel retired (BI.W-GLASS-DEDUP), sheet folded (BI.W-DIALOG-PLACEMENT) |
| F6 | Peer-table drift: `docs/canon/dependencies.md` + `deps-currency.md` list 10 peers; package.json has 11 — `embla-carousel ^8.0` (the bare package beside embla-carousel-vue) is missing from both binding tables (`citedDeps()` is the dep-rot arm's source). dependencies.md prose also still names Sheet | package.json peerDependencies |
| F7 | `CONTRIBUTING.md` describes a changesets release flow (`.changeset/config.json`, `npx changeset`, Version Packages PR) and `npm run proof:all` — no `.changeset/`, no changesets devDep, no proof script exists | package.json scripts/devDeps; no .changeset dir |
| F8 | `README.md:72` + `canon-doc.mjs:40` call structure.md "GENERATED … machine-truth … never hand-maintained" — no generator exists in scripts/; the doc is hand prose | scripts/ inventory |
| F9 | `subpath-policy.mjs` classification count comments all stale: "PUBLISH (23)"=21, "PUBLISH (33)"=31, "INTERNAL (17)"=13, "INTERNAL (2)"=1 (map↔disk itself is clean: 66=66; export-key arithmetic 74 = 12+5+52+5 verified) | Programmatic count over COMPONENT_CLASS |
| F10 | `demo/chassis/code/Code.vue` is dead — zero importers; `CodeBlock.vue` is the live surface. Missed by the dead-code layer | Graph walk + direct grep |
| F11 | `composables/glass/wave/index.ts` header still cites deleted paper-grid + concentric as co-consumers — the shared-leaf rationale died with BI.W-VIZ-DELETIONS, strengthening the C3 move | wave/index.ts:1-3 |
| F12 | `src/styles/draw-in.css` is completion-seal-single-consumer (`.draw-rule` family) at global styles root — an A07 colocation candidate neither round flagged (round-2b lists it only as a loose global file) | Sole users: completion-seal styles.css/constants/composable |
| F13 | `DESIGN.md` present-tense claims about deleted demo files (`dock-with-slider.vue`, `stories/aurora.vue` old path, `motion/metaballs.vue`, `primitives/configurator.vue`) | Path checks; e.g. DESIGN.md:1144 "lives at …dock-with-slider.vue" |
| F14 | `affordance-map.md` (both copies) stale paths: `dock-controls/{dark-mode-toggle,icon-button,triggers}.css` (now `dock/styles/controls/*`) + `toggle/index.ts` (no toggle family — switch/toggle-group) | Path checks |
| F15 | `useDockCtaReceive` is dual-exported on BOTH `/motion` (motion/index.ts) and `/dock` (dock/index.ts) — two public homes for one symbol; any colocation move must pick one and run the clean-break rule | Both barrels re-export it |

**Deliberate non-findings re-proven** (dual-path suspects that are correct design, recorded so they are not re-litigated): watercolor-dot prng re-export over the shared procedural leaf; blob `easing.ts` component-scoped with rationale; the touch-gate trio (dock composes `dom/useTouchGate`; sortable's is a handle/capture resolver); `useTokenColor` vs `useResolveTokenColor` distinct documented roles; the four per-family `uniformBridgeWGPU.ts` + two `wgpuSetup.ts` are same-PATTERN component-specific layout tables (a shared-generator candidate, not copy-paste dead weight); the retired-name demo stories (sheet/hover-card/hover-popover/context-menu) are live successor-API pattern pages; root barrel vueuse-free claim HOLDS (real `from "@vueuse"` importers: dock, input, textarea, dark, keyboard — none on the root walk).

## ROUTING (PROPOSE only — no band/PLAN/ASK/coordination edits made)

1. **REGISTRY truth-up (sidebar)**: strike every "zero consumers / drop ./sidebar" row derived from round-2/2b; record fourier-analysis (`useSidebarState` ×2, live source) as the external contract. Any demote runs the consumer-updates ruling (marked addendum in fourier-analysis's tranche), never a "no consumer" clean break.
2. **REGISTRY truth-up (glass-chip carve-out)**: strike "glass-chip.css correctly central (chip+combobox)" — chip-only by class use AND cascade-orphaned; the fix-wave should wire the import and colocate per A07 (chip/) in one motion with the X1 repair.
3. **Band amendment (BAND-COLOCATION)**: replace the `_shared` 5-way carve with a cohesion-backed partial carve (field/, menu/, feedback/) or none; strike the invented "~15-entry A07 threshold" language; do not file `axes.ts` under any `_shared/motion/`. This ratifies the FABLE-COLOCATION rejection with independent grounds (inter-round carve contradiction + the /axes subpath source).
4. **Band amendment (dead-code wave)**: add `demo/chassis/code/Code.vue` to the retire list beside the five barrels + fourier presets; add `draw-in.css` → completion-seal colocation; wave/ move gains the F11 stale-header evidence.
5. **Doc truth-up wave (in-repo)**: `docs/design/tunable-anim.md` dock rows → (0.3, 0.82)/0.19s-chain; `motion-canon.md` DRAWER_SNAP → (0.32, 0.8) + drop the two dead proof-script references; remaining stale `design-idioms.md` §3 rows + §7 rewrite (per the ratified census truth); `affordance-map.md` path refresh; `glass-system.md` useSurfaceAxis → resolveSurfaceClass + drop GlassPanel/Sheet from the carrier list; `dependencies.md` + `deps-currency.md` add the `embla-carousel ^8.0` row + drop the Sheet mention; CONTRIBUTING.md release-flow rewrite to the real tag-push flow (no changesets, no proof:all); README.md:72 + canon-doc.mjs comment drop the "GENERATED" claim or restore a generator; `subpath-policy.mjs` count comments 21/31/13/1; `composables/index.ts` header (or delete with the barrel).
6. **Outbound correction draft (docs/precepts submodule)**: the three diverged docs need a single-home decision — either the submodule syncs from `docs/design/` or the in-repo copies become the sole home and the submodule drops them. PROPOSE the mark; never edit the submodule from this repo.
7. **Numeric hygiene for any REGISTRY rows derived from round-2/2b**: `<component>/styles.css` count is 20 (not ~40); aurora composables 15 (not 17/16); useStagger's external-consumer comment is TRUE (speedtest via `/motion-core`) — the missing artifact is the consumer-evidence doc, not the consumer.

## Lead record notes (2026-07-19, ledger C2 — annotations per RU-03-COLOCATION R7; the rows and routings above are history, unmodified)

1. **Routing 4's `draw-in.css` half is CORRECTED downstream — its premise fails at HEAD.**
   F12's "completion-seal-single-consumer" read does not survive: `.draw-rule`/`[data-draw-in]`
   have ZERO element consumers in src+demo (re-grepped this pass — no `.vue`/`.ts` hit);
   completion-seal's "draw-in" mentions are prose and its live mechanism is its own
   `--seal-draw` recipe; `draw-in.css:27-30` fences the members apart. The disposition is
   family-C A05 (`A05-DRAW-IN` on REDUCTION W3's roster), allowlisted in COLOCATION W3 — NOT a
   colocation move (RU-03-COLOCATION N1).
2. **C2's refutation is RIGHT but INCOMPLETE at the demo layer.** The `Combobox.vue:16`
   comment-not-consumer ruling stands; "the sole class consumers are the chip family" misses
   `demo/stories/forms/combobox.vue:132` — a live `class="glass-chip glass-capsule …"` element
   binding (re-verified this pass). glass-chip's KEEP-CENTRAL basis is the corrected 2-surface
   census (RU-03-COLOCATION N2).

RF-2's C5/C7/C8/B2 cores all re-verified sound by the same union — these two notes are the
record's only corrections.
