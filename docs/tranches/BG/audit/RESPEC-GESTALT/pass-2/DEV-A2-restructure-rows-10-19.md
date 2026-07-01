# DEV-A2 — the family restructure map, cursor rows 10.x–19.x

**Lane:** RESPEC-GESTALT Pass-2 DEV-A2. **Date:** 2026-07-01 · branch `tranche/BG` @ `306c3059` (tree clean).
**Scope:** every cursor row `10.x`–`19.x` (`EXECUTION-PROGRESS.md` PHASE 10→19) → one disposition
(`KEEP` / `AMEND` / `MERGE→target` / `PRUNE` / `SUBSUME` / `DONE`), its target **family** (F2 Glass · F4 Paper ·
F5 Motion · F6 Components/API · F7 Demo · F8 Close/Cut), and its **gate disposition** (born-with-feature clause ·
family-gate fold · prune). Binding rulings applied: SYNTHESIS-PASS1 §2 (#2 dead-cut · #9 W-REFLECT3 abolition) +
§3 families + GROUP-C GC-FC1/2/4/6/7/8/10/11 + lenses C3/C4/C6/C7. **Every claim disk-verified; contradicting
docs are findings (logged in §7).**

Companion lane DEV-A1 owns rows `0.x`–`9.x` (Stage-0, WS1/WS3/WS2/WS5/WS6, BH `[C]`). Cross-lane hand-offs are
named inline (the dead-cut spans DEV-A1's WS5/WS2 → §2; the ratchet-drain chain spans both → §6).

---

## 0. The one-paragraph verdict

Rows 10–19 hold the two heaviest over-contrivance concentrations in the tranche: **WS4 (25 rows, 16% of BG)**
is ~14 single-file mechanical carves each carrying 5–10× its diff in gate+self-test+doc ceremony (C7 F1), and
**WS7 (13 rows)** reproduces the feature/verification decoupling the tranche exists to cure by authoring
gate-only waves for features built 8+ batches earlier (C7 F2) AND smuggles three net-new component BUILDs into
the "close" workstream (C3 F6). The fold collapses WS4's carves into **3 family waves** (`W-DEAD-SWEEP` /
`W-COLOCATE` / `W-SPRING-TIDY` per GROUP-C GC-FC2), owns the **dead-composable cut ONCE** (killing the
10.5/12.1/12.2/6.4 triple-double-claim, ruling #2), extracts the WS7 feature builds (CHART survives as an F6 ADD
with a Fable arm + ≥2-bar; DATE-CALENDAR/DS-COMPLETE keep-booked-honest, GC-FC6), prunes the 6 gate-only WS7/WS10
waves into their feature families (C7 FC2), scopes **C-SAFARI honestly** (Tier-1 WebGL2 floor ships; the
FBO in-context second-sample is DROP-WITH-TRIGGER — the WS1 render-target seam does not exist and re-opening the
DONE+painted WS1 band is forbidden, C3 F1/FC4), leads WS9 paper with the **raster tooth PRIMARY** (feTurbulence
demoted, GC-FC7), **scrubs W-REFLECT3 from all 5 in-range cursor rows + 6 build-map tails + the FINAL.md
re-legitimization** (ruling #9c), reconciles the **two carve double-owners** to single writers (GC-FC8a/b), and
makes the **16-baseline ratchet-drain chain a VISIBLE cut-gate table** (GC-FC8c). Net: WS4 25→~8, WS7 13→~7,
BH 18.x 11→~7, W-REFLECT3 → 0, ratchet-drain surfaced.

---

## 1. Disposition table — every row 10.x–19.x

**Verdict legend:** KEEP (real surface, meets overhead floor) · AMEND (kept, shape changes) · MERGE→X (fold into
family wave X) · PRUNE (delete row; assertion folds into a feature wave's gate clause) · SUBSUME (row's work
absorbed by another wave, this id retires) · DONE (already landed; no change).

### PHASE 10 — WS4 (→ F5 Motion · F6 Components/API · F7 Demo)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 10.1 | W-SCROLL-SHRINK-UNIFY [P] | **KEEP** | F6 (real scroll-shrink paint surface) | born-with-feature; `proof:css-critical`+`no-layout-animation` fold as clauses on `proof:encapsulation` family gate |
| 10.2 | W-SHEET-INSET-ROOT [P] | **KEEP** | F6 (overlay-band inverse paint) | `proof:emission` overlay-band-inverse clause stays; born-with-feature |
| 10.3 | W-SPECIMEN-PER-STORY [P] | **MERGE→F7** `W-DEMO-DUP-MERGE` | F7 Demo (bento specimen dispatcher) | `proof:bento-specimen` folds into `proof:demo` family gate |
| 10.4 | W-BENTO-FRONTDOOR-UNFORK [H] | **MERGE→F7** `W-DEMO-DUP-MERGE` | F7 Demo (2 glyph-fork deletes) | clause; glyph-fork-delete asserted in `proof:demo` |
| **10.5** | **W-DEAD-COMPOSABLE-CUT [H]** | **PROMOTE → THE dead-cut wave (ruling #2)** | F5 Motion (owns the WHOLE dead set) | grep-gated + MIGRATION-per-symbol; subsumes 12.1/12.2 delete-clauses + 6.4's DEFINITION-ABSENT gate (see §2) |
| 10.6 | W-FLIP-ONE [H] | **MERGE→F5** `W-MOTION-SPINE` | F5 (ONE `useFlip`/ElementMorph runner) | `proof:flip-one` HOLLOW-falsifier becomes the `proof:motion` runner-single clause |
| 10.7 | W-PRESS-MOUNT-RECONCILE [H] | **MERGE→F5** `W-MOTION-SPINE` | F5 (press-tower collapse) | `useSpringMount`-onto-runner + `useLiquidPress` 2nd-consumer-or-fold clause |
| 10.8 | W-SPRING-REGISTER-TIDY [H] | **MERGE→F5** `W-SPRING-TIDY` | F5 (table→6, dead `--spring-timeline-*` twins) | `proof:spring-tokens-synced` clause; regen+re-snap |
| 10.9 | W-SCROLL-READER-UNIFY [H] | **MERGE→F5** `W-MOTION-SPINE` | F5 (`useScrollProgress`→`scrollReader.ts` fold) | clause |
| 10.10 | W-LIQUID-ENTRANCE-GENERAL [P] | **MERGE→F5** `W-LIQUID-WEIGHT-DEFAULT` | F5 (liquid-enter wired onto mounts) | born-with-feature; the transition-register inversion (ruling #6) |
| 10.11 | W-COLOCATION-GATE-STRUCTURAL [H] | **MERGE→F6** `W-COLOCATE` | F6 (3 dir moves + WORM-BINDING clause) | **gate-only wave PRUNED** (C7 FC2); `proof:colocation` widen authored INSIDE `W-COLOCATE` |
| 10.12 | W-CANVAS-LIFECYCLE-LEAVES [H] | **MERGE→F6** `W-COLOCATE` | F6 (carve `createCanvasLifecycle` 695 + `useWebGPUCanvas` 606; AFTER WS5) | drains 2 baselines (§6); **sole owner of the createCanvasLifecycle carve** — re-pin WS8 fence here (§4b) |
| 10.13 | W-AMBIENT-HISTOGRAM-LEAF [H] | **MERGE→F6** `W-COLOCATE` | F6 (carve `useGlassBackdropLuminance` 534) | **SINGLE OWNER of the luminance carve** (§4a); `proof:single-color-core` follows the leaf; drains 1 baseline |
| 10.14 | W-TABS-KEYBOARD-LEAF [H] | **MERGE→F6** `W-COLOCATE` | F6 (carve `SegmentedTabs` 512, 44px floor kept) | drains 1 baseline |
| 10.15 | W-GOO-BARBELL-CSS [P] | **KEEP** | F6 (Carousel≡Pager Safari floors; worm paint π) | born-with-feature; worm-π un-deferred to WS11 (already folded, keep) |
| 10.16 | W-TIMELINE-ENCAPSULATE [H] | **MERGE→F6** `W-COLOCATE` | F6 (timeline/ colocation, allowlisted legs inline) | clause |
| 10.17 | W-SFC-CSS-PARTIAL-SWEEP [H] | **MERGE→F6** `W-COLOCATE` | F6 (Slider partials, `[data-size]` inline KEPT) | clause |
| 10.18 | W-UNIFORM-LAYOUT-BUILDER [H] | **MERGE→F6** `W-COLOCATE` | F6 (std140-packing carve; AFTER WS5) | clause |
| 10.19 | W-CHIP-ALIAS-KILL [H] | **MERGE→F6** `W-DEAD-SWEEP` | F6 (delete `selectableChipVariants.ts`) | atomic delete+MIGRATION clause |
| 10.20 | W-DEAD-TOKEN-SWEEP [H] | **MERGE→F6** `W-DEAD-SWEEP` | F6 (cut `--corner-shape-card/-pill`) | `proof:squircle-language` negative-guard clause; **runs FIRST for net-negative** (GC-FC1c) |
| 10.21 | W-DEMO-CHASSIS-CONSOLIDATE [H] | **MERGE→F7** `W-DEMO-DUP-MERGE` | F7 (DemoFrame/StorySectionHeader/PaletteLayer deletes; CodeBlock→Code) | zero-importer-delete clause on `proof:demo` |
| 10.22 | W-MANIFEST-COLOCATE [H] | **MERGE→F7** `W-DEMO-DUP-MERGE` | F7 (4 string-maps → `s()` row; StoryHero de-dup) | clause |
| 10.23 | W-DESHADCN-SWEEP (W0) [P] | **MERGE→F6** `W-DESHADCN` (ONE concern, absorbs WS10) | F6 (the de-shadcn family HEAD — the WS4/WS10 split dies, C7 F4) | `proof:de-shadcn` + `proof:binding-sweep` born WITH the family wave |
| 10.24 | W-12-LAWS-UNIVERSAL [P] | **MERGE→F5** `W-LIQUID-WEIGHT-DEFAULT` | F5 (liquid-weight on all restored motion) | born-with-feature; Fable arm (§8) |
| 10.25 | W-CATEGORY-CARD-WARM [P] | **DONE** (`9e13965d`, paint-PASS) | F6 (already landed) | no change |

### PHASE 11 — BH [WS4] · B3 demo restructure (→ F7 Demo; cross-refs DEV-A1's WS4)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 11.1 | BH.B2.4b W-leaf-verify-ws4 [WS4] | **PRUNE** (verify-only ceremony) | fold assertion into `W-COLOCATE` gate clause | C7 FC5; no row |
| 11.2 | BH.B3 δ1 code-fold-consume | **MERGE→F7** (BH B3 → one `W-DEMO-IA` consume) | F7 Demo | CodeBlock→Code fold clause |
| 11.3 | BH.B3 δ2 dock-layers-shell | **MERGE→F7** | F7 Demo | dissolve `demo/composables/` clause |
| 11.4 | BH.B3 δ3/δ4 chassis-colocation | **MERGE→F7** | F7 Demo | flat roots → chassis/ clause |
| 11.5 | BH.B3 δ5/δ6 manifest-carve+glob | **AMEND** (drop the glob→`index.vue`; adopt B8-F8 depth-nest) | F7 Demo (GC-FC11a / cross-ref GROUP-B B8-F8) | `git mv aurora/ → substrates/aurora/`; all 120 stories stay flat |
| 11.6 | BH.B3 δ-stories-smoke-repoint | **MERGE→F7** | F7 Demo | every-row-resolves smoke clause |

### PHASE 12 — WS7 close-machine (→ F8 Close/Cut; feature builds EXTRACTED)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 12.0 | back-pointer to 0.7 | **KEEP** (no-delete trace) | — | none |
| 12.1 | W-SPIKE-DELETE [H] | **SUBSUME → 10.5 dead-cut** | F5 Motion | `useLiquidMorph` delete + `useMorphField` gut→`morphSignatures.ts` + `liquid-morph.css` whole-file move become dead-cut CLAUSES; `selectableChip` alias → 10.19 (§2) |
| 12.2 | W-JUBILANCE-DECIDE [H] | **SUBSUME → 10.5 dead-cut; CORRECT the false claim** | F5 Motion | `useHaptic` DELETE + **`useCelebrationBurst` DELETE (0 consumers on disk, NOT the "2" claimed — §2/§7)**; FLIP-ONE coord → `W-MOTION-SPINE` |
| 12.3 | W-DEAD-GATE-SWEEP [H] | **KEEP + EXPAND** (the net-negative instrument) | F8 (runs FIRST) | becomes the BG twin of BH B5e-gate-prune (GC-FC4): collapse per-wave π-gates → family gates; `--list` count DROPS |
| 12.4 | W-GATE-ROUTING-LIVE [H] | **PRUNE** (gate-only) | fold into WS1 `W-ROUTE-TRANSITION` route-family gate | C7 FC2; DEV-A1 co-owns the retro-fold |
| 12.4a | W-GESTALT-CURSOR-PARITY [H] | **KEEP** (keystone; tag-blocker) | F8 close-machine | `proof:gestalt-cursor-parity`; **scrub W-REFLECT3** (§5, cursor:237) |
| 12.4b | W-CLOSE-SWEEP [H] | **KEEP** (born-RED close disease) | F8 | `proof:close-sweep [local]` |
| 12.5 | W-GATE-FIELD-AURORA [H] | **PRUNE-gate + AMEND** | gate-authoring folds into WS1 `W-FIELD-AURORA` field-family gate; peer-floor clauses → 18.1 | **scrub W-REFLECT3** (§5, cursor:239); the value.js `^1.1.1` + kf floor-vs-API clauses stay but the peer EDITs land at 18.1 |
| 12.6 | W-GATE-PREVIEWS-RENDER [P] | **PRUNE** (gate-only) | fold into the WS4/WS6 previews family | C7 FC2 |
| 12.7 | W-GATE-UNIFORM-BLUR [H] | **PRUNE** (gate-only) | fold into WS3 `proof:glass` family gate | C7 FC2 |
| 12.8 | W-SAFARI-PARITY-GATE (G1) [H/P] | **MERGE→F2 Glass** (the C-SAFARI clause, not a standalone WS7 gate-wave) | F2 Glass | **scrub W-REFLECT3** (§5, cursor:242); `proof:safari-parity` full→drapery-dropped→flat-blur ladder becomes the Glass-family C-SAFARI arm |
| 12.9 | W-CONSTRAINT-MANIFEST [H] | **KEEP** | F8 close-machine | `proof:constraint-manifest` |
| 12.10 | W-DATE-CALENDAR [P] | **EXTRACT out of WS7 → KEEP-BOOKED-honest** | fold-ledger (real-consumer trigger) | GC-FC6; NOT a close wave; no gate minted now |
| 12.11 | W-CHART-FAMILY [P] | **EXTRACT → PROMOTE to F6 ADD** (endorsed, §3) | F6 Components (new `WS-COVERAGE` charter) | Fable arm + DesignSync + **≥2-consumer bar** required before build (§3/§8) |
| 12.12 | W-DS-COMPLETE [H] | **EXTRACT → KEEP-BOOKED-honest** | fold-ledger | GC-FC6; DS-completeness census only, no BUILD in the close |

### PHASE 13 — WS8 glass-deep (→ F2 Glass; C-SAFARI scoped honestly)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 13.1 | W-GLASS-SUFFUSE-UNIVERSAL [P] | **MERGE→F2** `W-GLASS-REGISTER-UNIFY`/deep arc | F2 Glass (one calm→deep arc as clauses) | `proof:glass-specular-angle` + 3-gate-retire fold into `proof:glass` |
| 13.2 | W-GLASS-REFRACT-WEBGL (G1) [P] | **KEEP as the C-SAFARI Tier-1 WebGL2 FLOOR (PRIMARY)** | F2 Glass | **scrub W-REFLECT3** (§5, cursor:253); `proof:glass-refract-fence` on `uChromatic`; ship the WebGL2 floor + SOURCE arm (§3) |
| 13.3 | W-GLASS-BACKDROP-SAMPLE (keystone) [P] | **DROP-WITH-TRIGGER the FBO second-sample** (§3) | F2 Glass → booked successor | **scrub W-REFLECT3** (§5, cursor:254); NOT the double-owner of the luminance carve — 10.13 is (§4a) |
| 13.4 | W-GLASS-SOTA-LADDER [H] | **MERGE→F2** | F2 Glass (retire matrix, DEFINITION-ABSENT) | clause on `proof:glass` |
| 13.5 | W-GLASS-LIQUID-TRANSITION [P] | **MERGE→F2** | F2 Glass (GL uniform reads `press.value`) | born-with-feature; soft-gated by `W-FLIP-ONE` |

### PHASE 14 — WS9 paper-deep (→ F4 Paper; raster-tooth PRIMARY)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 14.0 | GU-1 token (`--glass-key-direction`) [H] | **MERGE→F4** `W-PAPER-TEXTURE-UNIFY` | F4 (value-only clause) | additive; no standalone row |
| 14.1 | W-PAPER-GRAIN-REAL [P] | **AMEND — raster tooth PRIMARY** (GC-FC7) | F4 Paper | `proof:paper-grain` warm-hue-floor + azimuth==token; **feTurbulence/feDiffuseLighting demoted to progressive-enhancement over the born-RED raster anchor** (§3) |
| 14.2 | W-PAPER-SUFFUSE [P] | **MERGE→F4** | F4 Paper | `proof:paper-grain` suffuse-arm clause |
| 14.3 | W-HANDMARK-PERFECT [P] | **KEEP** | F4 Paper (or handmark sub-family) | `proof:handmark`+`proof:handmark-audit` born-with-feature |
| 14.4 | W-PENCIL-BOIL-DEEPEN [P] | **MERGE→F4** (handmark clause) | F4 Paper | `proof:handmark` boil-park arm clause |
| 14.5 | W-PAPER-CROSSREPO-ASKS [H] | **MERGE→F8** (cross-repo asks roster) | F8 (with 18.11) | `proof:crossrepo-asks-paper` folds into the ONE asks gate |

### PHASE 15 — WS10 de-shadcn (→ F6, ONE concern with 10.23)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 15.1 | W-DESHADCN-CENSUS [H] | **MERGE→F6** `W-DESHADCN` | F6 (one concern, absorbs 10.23) | `proof:no-shadcn-default` 233-file sweep clause |
| 15.2 | W-DESHADCN-TOKEN-REPLACE [P] | **MERGE→F6** `W-DESHADCN` | F6 | `--focus-ring-color` + `--ring→--focus-ring-color` 5.0.0 break clause |
| 15.3 | W-TAILWIND4-IDIOM [H] | **MERGE→F6** `W-DESHADCN` | F6 | `proof:tailwind-v4-idiom` clause-(d) fold |
| 15.4 | W-DESHADCN-MATERIAL [P] | **MERGE→F6** `W-DESHADCN` | F6 | real-Safari-dark π clause |
| 15.5 | W-DESHADCN-GATE [P] | **PRUNE** (gate-only) | fold gate into `W-DESHADCN` family wave | C7 FC2; the standalone gate-wave dies |

### PHASE 16 — WS11 storybook facility (→ F7 Demo)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 16.1 | W-SCROLL-PROGRESS-GLASSY [P] | **KEEP** | F7 (railHealth grew-killer) | born-with-feature |
| 16.2 | W-SECTION-TYPEWRITER-FADEUP [P] | **KEEP** | F7 | `getAnimations()` congruence clause |
| 16.3 | W-STORY-PAGE-API [H/P] | **KEEP** | F7 | `proof:story-page-api` AST single-root oracle |
| 16.4 | W-STORYBOOK-SUFFUSE [P] | **MERGE→F7** | F7 | `proof:suffuse` d1–d3 fold |

### PHASE 17 — WS12 coherence capstone (→ F8; the REAL cross-page close)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 17.1 | W-COHERENCE-CENSUS [H] | **KEEP** | F8 Coherence capstone | WS12-CENSUS.md |
| 17.2 | W-COHERENCE-GATE [H] | **KEEP** | F8 | `proof:hue-at-l`+`proof:coherence-census` |
| 17.3 | W-DESIGN-LANGUAGE-UNIFY [P] | **KEEP** | F8 | busy-aurora forward criterion |
| 17.4 | W-ANIMATION-CONGRUENCE [P] | **KEEP** | F8 | `proof:motion-one-clock` (A9 lock) |
| 17.5 | W-GLASS-PAPER-CONGRUENCE [H→ci] | **KEEP** | F8 | `--glass-key-*` spine born-RED→ci |
| 17.6 | W-PAGE-COMPONENT-AUDIT [P] | **KEEP — THIS is the cross-page gestalt close** (replaces the W-REFLECT3 funnel, ruling #9c) | F8 | 480-capture dual-engine both-modes verdict = the harmonized-whole read |

### PHASE 18 — BH [WS12] (→ F8; export reshape + CLAUDE close)

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 18.1 | BH.B2.1-swap (FINAL package.json writer) [WS12] | **KEEP** | F8/BH | `proof:subpath-enumeration`; **the SOLE peer-bump site** (kf `^5.1.0`, value.js `^1.1.1`); closes the WS7→WS12 red-window |
| 18.2 | BH.B2.2 W-api-fold (drop `./api`, 203 re-home) [WS12] | **KEEP** | F8/BH | drains `api/index.ts` baseline (§6); add net-indirection LOC measure (GC-FC11c) |
| 18.3 | BH.B2.3 W-curated-relocate [WS12] | **MERGE→ B2-reshape** (C7 FC5) | F8/BH | key-preserving clause |
| 18.4 | BH.B2.6 W-styles-colocation [WS12] | **MERGE→ B2-reshape** | F8/BH | `diff -r dist/styles` EMPTY clause |
| 18.5 | BH.B4b-content [WS12] | **MERGE→ B4-canon** | F8/BH | per-contract live gate at new home |
| 18.6 | BH.B4c-gate-repoints (10 precept-readers) [WS12] | **AMEND — DELETE, don't re-home** (GC-FC4/C6 FC2) | F8/BH | drop the ~14 doc-presence `claudeMd` clauses; keep the 2 structural readers → dissolve into freshness gates (§3) |
| 18.7 | BH.B4d-evidence-prune [WS12] | **MERGE→ B4** | F8/BH | `proof:consumer-evidence-live`; **the 3 lying docs are DELETED at 10.5, not here** (§2) |
| 18.8 | BH.B4e-doc-slim (MIGRATION 5.0.0 ask-map) [WS12] | **KEEP + PROMOTE to cut-AUTHORING** (D8 B4e) | F8/BH | MIGRATION+CHANGELOG owner; dual-doc move w/ B5c |
| 18.9 | BH.B5b-gate-manifest-extract [WS12] | **KEEP** (prereq for the prune) | F8/BH | `--list` byte-identical; **ADD B5e-gate-prune AFTER it** (GC-FC4) |
| 18.10 | BH.B5c-gate-rehome (16 CLAUDE-readers) [WS12] | **AMEND — prune 14 doc-presence clauses; dissolve structure-sync/doc-consistency to freshness gates** (GC-FC4/C6 FC2/FC3) | F8/BH | `proof:claude-deletable` C1/C2/C3 kept; the 2 ENOENT-crashers guarded first; NO `canon-doc.mjs` ceremony re-home for the 14 |
| 18.11 | BH.B7 W-api-ask-roster (2 by-name asks · G7) [WS12] | **AMEND — honesty label** (GC-FC11e/C6 FC6) | F8/BH | keep the 4-row relay; state BH's OWN break = **2 `/api` asks** (muster, speedtest); rows 3–4 are BG-owned token asks; `W5-viz-disposition` clause already correct on disk |

### PHASE 19 — the cut

| row | wave | verdict | family / target | gate disposition |
|----|------|---------|-----------------|------------------|
| 19.1 | BG.W-CUT (5.0.0 tag) [P] | **KEEP** | F8 Cut | `--run full` union siblings-absent BEFORE tag; **`RATCHET_BASELINES == {}` precondition made VISIBLE via the drain chain (§6)** + `proof:binding-sweep` |
| 19.2 | BH.B4f-claude-delete (ABSOLUTE LAST) [WS12] | **KEEP + AMEND** (honesty) | F8 Cut | gated on `--run full` /tmp siblings-absent dry-run AFTER all homes authored + all readers re-pointed-OR-DELETED; with 14 clauses DELETED (18.10) fewer readers survive; `rm CLAUDE.md` is the last act |

---

## 2. Ruling #2 applied — the dead-composable cut, owned ONCE (the triple-double-claim killed)

**Disk-verified consumer census (`grep -rln` over `src`+`demo`, excluding self-def + barrels):**

| symbol | file | real consumers on disk | prior claim | verdict |
|--------|------|------------------------|-------------|---------|
| `useHaptic` | `src/composables/motion/core/useHaptic.ts` | **0** (only `index.ts`×2 barrels + `api/index.ts` re-export) | 12.2 "RETIRE (adjudicated)" ✓ | **DELETE** |
| `useCelebrationBurst` | `src/composables/motion/useCelebrationBurst.ts` | **0** (`motion/index.ts` barrel + `jubilance.css` PROSE comment + `types-extra.ts` type re-export) | 12.2 "**KEEP (2 consumers)**" — **FALSE on disk** | **DELETE** + delete `jubilance.css` |
| `useVizChoreography` | `src/composables/glass/useVizChoreography.ts` | **0** (zero importers anywhere) | 6.4 gate "DEFINITION-ABSENT" ✓ + 10.5 cut | **DELETE** |
| `useLiquidMorph` | `src/composables/motion/useLiquidMorph.ts` | **0 src** (only `demo/stories/manifest.ts` story-string) | 10.5 cut + 12.1 delete (double) | **DELETE** |
| `useDockContextSilhouette` | `src/components/custom/dock/composables/useDockContextSilhouette.ts` (551L ratchet baseline) | **1 demo** (`demo/stories/dock/examples/AppSwitcher.vue`) | 10.5 cut | **DELETE** + rework/retire `AppSwitcher.vue` demo |
| `useScrollPin`/`useScrollScene` | `src/composables/motion/{useScrollPin,useScrollScene}.ts` | **live** (`scroll-choreography.css` + `demo/.../scroll-choreography.vue`) | ruling #2 "-fold" | **FOLD the two into one** (not a delete — real consumers) |

**The ONE clean-break wave.** Promote **`BG.W-DEAD-COMPOSABLE-CUT`** (row 10.5) to the sole owner in the **F5
Motion** family, sequenced AFTER its cross-lane coordination inputs (DEV-A1's WS5 provides `useVizChoreography`'s
last consumer removal via `6.4`; DEV-A1's WS2 provides `useDockContextSilhouette`'s dock-side clearance). It owns,
each with one MIGRATION row:
- DELETE `useHaptic`, `useCelebrationBurst` (+`jubilance.css`), `useVizChoreography`, `useLiquidMorph`,
  `useDockContextSilhouette` (+retire the `AppSwitcher.vue` demo example).
- FOLD `useScrollPin`+`useScrollScene` → one composable.
- Gut `useMorphField()` → `morphSignatures.ts` + delete `morph-field.css` (moved off 12.1).
- **DELETE the 3 lying consumer-evidence docs** — `docs/consumer-evidence/use-haptic.md`,
  `use-celebration-burst.md`, `use-viz-choreography.md` (they assert phantom couplings; ruling #2, C2 F1).

**The rows this kills:** `10.5` (promoted, not deleted) · `12.1 W-SPIKE-DELETE` **SUBSUME** (its `useLiquidMorph`
delete + `morphSignatures` rehome fold in; the `selectableChip` alias → `10.19 W-CHIP-ALIAS-KILL`; the
`liquid-morph.css` 850L whole-file move → owned by `3.11 W-DEMO-STYLE-REHOME`, DEV-A1) · `12.2 W-JUBILANCE-DECIDE`
**SUBSUME** (correcting the false KEEP) · `6.4`'s DEFINITION-ABSENT gate becomes a **CLAUSE** on the dead-cut's
`proof:motion` gate (6.4 itself stays a WS5 build wave under DEV-A1, its gate re-points here). **Net: 4 rows +
1 gate-wave collapse to 1 wave** — the 10.5/12.1/12.2/6.4 quadruple-claim dies.

---

## 3. The four honest-scoping rulings (WS7 features · C-SAFARI · WS9 raster · gate-prune)

**(a) WS7 Band-4 feature builds EXTRACTED (GC-FC6 / C3 F6).** The close workstream closes; it does not grow the
component surface. `12.10/12.11/12.12` leave WS7:
- **`W-CHART-FAMILY` (12.11) SURVIVES** as the F6-endorsed ADD — but under a real charter, NOT a fold-ledger
  side-effect: a dedicated `WS-COVERAGE` band wave carrying (i) its **Fable design arm** + **DesignSync review
  surface** (binding directive), (ii) the **≥2-consumer bar** proven before build (`src/components/custom/chart/*`
  born only when ≥2 real consumers exist), (iii) its own `proof:chart` family gate born-with-feature.
- **`W-DATE-CALENDAR` (12.10) + `W-DS-COMPLETE` (12.12) KEEP-BOOKED-honest** in the fold-ledger with a real
  trigger (a consumer ask). No gate minted, no build in the close. WS7 shrinks 13→~7.

**(b) C-SAFARI scoped honestly — Tier-1 WebGL2 floor PRIMARY; FBO DROP-WITH-TRIGGER (C3 F1/FC4; lane pick).**
Disk-verified: `src/composables/glass/webgl/createRenderTarget.ts` **ABSENT**, `glass-refract.glsl.ts` **ABSENT**,
and WS8 SPEC:247 R4 admits *"the WS1↔WS8 render-target seam DOES NOT EXIST AT HEAD AND WS1's converged spec
exposes NOTHING."* WS1 (2.1/2.2/2.4) is **DONE + painted + PROTECTED** (SYNTHESIS §4). **The pick: DROP-WITH-TRIGGER
the FBO in-context second-sample.** Rationale: (1) re-opening the painted WS1 band to expose the live
`WebGL2RenderingContext` off `Aurora.vue:166 defineExpose` re-plumbs a protected surface — forbidden; (2) carrying
an unbuildable keystone as the binding π is exactly how C-SAFARI misses a 4th time (C3 verdict); (3) the Tier-1
WebGL2 floor does NOT depend on the Safari-impossible `backdrop-filter: url()` — it is the real landable win.
Concretely:
- **`13.2 W-GLASS-REFRACT-WEBGL` ships the Tier-1 WebGL2 refraction floor** (`glass-refract.glsl.ts` built +
  the device-free SOURCE arm + `proof:glass-refract-fence` on `uChromatic`) as the C-SAFARI SHIPPED artifact.
  `12.8 W-SAFARI-PARITY-GATE` folds in as its Glass-family C-SAFARI clause (full→drapery-dropped→flat-blur ladder).
- **`13.3 W-GLASS-BACKDROP-SAMPLE` becomes a BOOKED successor**, trigger = a WS1-render-target re-open charter
  (its own small seam wave) OR a real consumer ask for the in-context second-sample. Its `createBackdropSource`
  FBO-sampler does NOT ship; the `useGlassBackdropLuminance` `getImageData` luminance proxy stays the shipped path.
- *Recorded alternative* (if the orchestrator prefers fidelity-now): a small `BG.W-AURORA-RT-EXPOSE` WS1-seam wave
  extending `Aurora.vue` `defineExpose` — but that re-touches a protected band, so DROP-WITH-TRIGGER is the pick.

**(c) WS9 raster tooth PRIMARY (GC-FC7 / C3 F7).** The user rejected the SVG-noise paper register TWICE
("disgusting metallic"). `14.1 W-PAPER-GRAIN-REAL` is AMENDED: the committed warm scanned/generated tooth-tile
raster is the **PRIMARY born-RED close anchor** (engine-stable by construction — kills the Safari `lighting-color`
colorspace risk + cross-engine determinism risk + metallic-recurrence risk in one move); `feDiffuseLighting`
over `feTurbulence` is DEMOTED to a progressive-enhancement layer OVER the raster, sequenced second. Same token,
same multiply/screen blend law, same seed leaf — a transposition, not a third procedural attempt at the exact
mechanism the eye rejected. `proof:paper-grain` warm-hue floor `≥0.020` + azimuth==token stays.

**(d) The gate-prune (GC-FC4 / C7 FC2/FC3 — net-negative).** No gate-only waves survive in rows 10–19: `10.11`,
`12.4`, `12.5`(gate arm), `12.6`, `12.7`, `15.5` all **PRUNE** — each gate's authoring folds INTO the feature
wave that mints it. `12.3 W-DEAD-GATE-SWEEP` runs FIRST and EXPANDS to the BG twin of BH `B5e-gate-prune`:
collapse per-wave π-presence gates into `proof:{glass,motion,dock,paper,feedback}-band` category gates (extend the
`proof:ba-gestalt` roster model) so the tranche drives the 360 toward ~250 with ZERO behavioral assertion lost.
`18.6/18.10` DELETE the 14 doc-presence `claudeMd` clauses (not re-home) and dissolve the 2 structural readers
(`proof:claude-structure-sync` dir-diff, `proof:doc-consistency` dep-rot) into `committed==regen` freshness gates
over disk-generated `structure.md`/`dependencies.md` — no `readFileSync(CLAUDE.md)` survives, neither check is
tautological, and no `canon-doc.mjs` ceremony scaffold is built to keep prose-presence assertions alive.

---

## 4. Carve double-owner reconciliations (single-writer discipline, GC-FC8a/b)

**(a) `useGlassBackdropLuminance` — ONE owner (was 10.13 + 13.3, C3 F2).** Disk: 534L (baseline 542). It was
claimed by `10.13 W-AMBIENT-HISTOGRAM-LEAF` (histogram/wcag axis) AND `13.3`'s `createBackdropSource` (FBO-sampler
axis). **Resolution: `10.13` is the SOLE carve owner.** It carves `useGlassBackdropLuminance` → `ambientHueHistogram`
+ `wcagLuminance` (value.js moves with the leaf; `proof:single-color-core` follows). `13.3`'s `createBackdropSource`
FBO-sampler carve **dissolves** with the FBO drop-with-trigger (§3b) — there is no second axis to carve. BH
`18.x` B2.4b's "match BG's landed leaf shapes" now has exactly ONE shape to match. Sequence: `10.13` (WS4,
AFTER WS3-M5 rewire) → the leaf is final; no WS8 re-carve.

**(b) `createCanvasLifecycle` fence re-pin (was carve-scheduled AND shasum-fenced, C3 F3).** Disk: 695L; WS8
SPEC:37 fences it *"695L, 0 getContext/FBO refs UNTOUCHED (P1, shasum-fenced)"* — a shasum keyed to bytes that
`10.12 W-CANVAS-LIFECYCLE-LEAVES` (WS4, AFTER WS5) will carve into `lifecycle/scheduler.ts` + `visibility.ts`.
**Resolution: `10.12` is the SOLE owner of the carve; re-pin the WS8 fence to the POST-carve leaf set.** This is
consistent — WS8 SPEC:193 already places the FBO wiring in `useWebGLCanvas.ts` + the shell-aurora backend closure,
NOT in `createCanvasLifecycle`, so the leaf is genuinely untouched by refraction; only the shasum baseline must
re-point to the carved leaves. With the FBO dropped (§3b), the WS8 fence largely dissolves; what remains is:
`13.2`'s Tier-1 floor does not touch `createCanvasLifecycle`, so the P1 fence collapses to "the WS4-carved leaf
set is the frozen shape." Plan-doc reconcile, no code contradiction.

---

## 5. W-REFLECT3 abolition — the exact scrub list in range (ruling #9c; C4 F2/FOLD-2)

**Canonical rule (one, replacing the three inconsistent positions):** `W-REFLECT3` is ABOLISHED. EVERY live-π
(gestalt OR non-gestalt) closes at its owning wave's OWN non-authoring paint close. The cross-page harmonized-whole
read is `17.6 W-PAGE-COMPONENT-AUDIT`'s OWN 480-capture close — a real wave, not a funnel.

**Cursor `EXECUTION-PROGRESS.md` (in my range) — 5 occurrences to scrub:**
- `:237` (12.4a) `"(WS12 late capture sweep, Model-B → W-REFLECT3)"` → re-home to `"→ 12.4a's own non-authoring
  close (WS12 late-capture sweep)"`.
- `:239` (12.5) `"(F-AA-LIVE dual-engine _anchor re-shoot at ebf6e45b → W-REFLECT3)"` → `"→ the WS1 W-FIELD-AURORA
  field-family gate's own non-authoring close"`.
- `:242` (12.8) `"(non-authoring Metal capture → close / W-REFLECT3)"` → `"→ the Glass-family C-SAFARI clause's
  own non-authoring Metal close"`.
- `:253` (13.2) `"(WebKit compile-time + Metal drift → 13.3/close/W-REFLECT3)"` → `"→ 13.2's own non-authoring
  Metal close"` (13.3 dropped).
- `:254` (13.3) `"(non-authoring dual-engine Metal capture → close / W-REFLECT3)"` → `"→ the booked FBO successor's
  own close"` (row is drop-with-trigger).

**Also (named by lane, outside 10–19 numerically):** `:98` (2.7) carries THREE `W-REFLECT3` mentions — scrub all
three; re-home the VT re-attempt to **KEEP-BOOKED-honest** with an explicit trigger (a VT-polish ask + live
dual-engine verify of the shell-aurora `view-transition-name` exclusion), NOT "at W-REFLECT3". `:52` is a note —
re-home "BG.W-FIELD-AURORA's own W-REFLECT3 gestalt re-paint" → "its own non-authoring paint close".

**Build-map `bg-build-map.md` — 6 tails to re-home + 1 carve-out to DELETE:**
- `:66–73` **DELETE** the "a NON-ba-gestalt π deferral may still legitimately name W-REFLECT3" carve-out (C4
  FOLD-2b — this clause is the SOURCE of the three-way inconsistency).
- `:224` `"un-regressed (rides W-REFLECT3)"` → owning wave's own close.
- `:733` `"W-REFLECT3 + the light-eyebrow polish landing"` → `3.12 W-EYEBROW-LIGHT-POLISH`'s own close.
- `:862` `"LOCAL-only, rides W-REFLECT3"` → owning wave's own close.
- `:882` `"W-REFLECT3 / the close"` → the keystone's own close (or booked successor).
- `:1320` (D-G6) `"+ W-REFLECT3"` → `BG.W-GATE-FIELD-AURORA` + `BG.W-EYEBROW-LIGHT-POLISH` own closes (drop the
  trailing W-REFLECT3).
- `:589` + `:1318` (D-G4) are **already re-homed** ("NOT W-REFLECT3") — verified OK, no edit.

**`FINAL.md:344–347` — DELETE the re-legitimization** (ruling #9c; C4 FOLD-2c). Verified on disk: it states
*"there is no W-REFLECT3 wave in BG; it is the name for the deferred post-integration human-verdict step"* — this
re-admits the phantom as a scheduled step. DELETE; the human FEEL read is `17.6`'s own close.

---

## 6. The ratchet-drain chain — a VISIBLE cut-gate table (GC-FC8c/d; S6)

**Disk-verified `proof-no-god-module.mjs:138–172`: exactly 16 real baseline entries** (BH PLAN §71's "drained to
∅" is FALSE — that describes only the 3 deleted BH rows; C3 F4 CORRECT, C5 WRONG). `BG.W-CUT`'s close-state
`violations == [] AND RATCHET_BASELINES == {}` is coupled to every one of these draining. The chain, each baseline
→ owning wave → band → drain mechanism:

| # | baseline (disk line count) | owning wave | band / lane | drain mechanism |
|---|-----------------------------|-------------|-------------|-----------------|
| 1 | `styles/glass/liquid-morph.css` 850 | `3.11 W-DEMO-STYLE-REHOME` | WS3 (DEV-A1) | whole-file rehome (net-neutral move) |
| 2 | `dock/GlassDock.vue` 711 | `4.4 W-DOCK-DECOMPOSE` | WS2 (DEV-A1) | dock decompose carve |
| 3 | `glass/webgl/createCanvasLifecycle.ts` 695 | **`10.12 W-CANVAS-LIFECYCLE-LEAVES`** | WS4→F6 | carve → `scheduler.ts`+`visibility.ts` (AFTER WS5) |
| 4 | `glass/webgpu/useWebGPUCanvas.ts` 606 | **`10.12`** (same wave) | WS4→F6 | carve |
| 5 | `dock/composables/useDockFission.ts` 604 | `4.4/4.5` (dock) | WS2 (DEV-A1) | dock carve |
| 6 | `styles/tokens/property-regs.css` 548 (base 566) | **RATCHET EXEMPTION** (registration-manifest, §6a) | contract | EXEMPT — a flat `@property` registration list, not logic |
| 7 | `styles/dock/fission-bridge.css` 552 | `4.x` (dock) | WS2 (DEV-A1) | dock CSS carve |
| 8 | `dock/composables/useDockContextSilhouette.ts` 551 | **`10.5` dead-cut** (§2) | F5 Motion | DELETE (drains by removal) |
| 9 | `glass/useGlassBackdropLuminance.ts` 534 (base 542) | **`10.13 W-AMBIENT-HISTOGRAM-LEAF`** (SOLE owner, §4a) | WS4→F6 | carve → histogram+wcag leaves |
| 10 | `goo-blob/composables/useBlobSatellites.ts` 533 | `6.9 W-BLOB-KINEMATICS-LEAF` | WS5 (DEV-A1) | kinematics leaf carve |
| 11 | `goo-blob/shaders/metaball.wgsl.ts` 529 | **RATCHET EXEMPTION** (shader, §6a) | contract | EXEMPT — shader-string file |
| 12 | `dot-flow-field/shaders/flow-field.glsl.ts` 517 | **RATCHET EXEMPTION** (shader) | contract | EXEMPT — shader-string file |
| 13 | `tabs/SegmentedTabs.vue` 512 | **`10.14 W-TABS-KEYBOARD-LEAF`** | WS4→F6 | carve → roving-focus+responsive leaves |
| 14 | `goo-blob/shaders/metaball.frag.ts` 510 | **RATCHET EXEMPTION** (shader) | contract | EXEMPT — shader-string file |
| 15 | `goo-dot-matrix/composables/useGooDotMatrix.ts` 508 | `6.8 W-GOODOT-SETUP-SPLIT` | WS5 (DEV-A1) | setup-split carve |
| 16 | `api/index.ts` 505 | **`18.2 BH.B2.2 W-api-fold`** | BH WS12 | `./api` drop + 203 re-home (delete-drains) |

**(a) The ratchet-contract HARDENING (GA-4/FC-B10 shader-exemption, extended).** Rows 11/12/14 are shader-string
files and row 6 is a `@property` registration manifest — flat single-source declaration files that legitimately
grow, not logic god-modules. Harden `RATCHET_BASELINES` into a two-class contract: `{god-module → must carve}` vs
`{EXEMPT: shader-string | css-registration-manifest → rationale-per-file}`. The exemption is itself gate-asserted
(a file claiming EXEMPT must match the shader/`@property`-manifest shape; a logic file cannot smuggle in). This
drains 4 of 16 (rows 6/11/12/14) by exemption with ZERO carve — reducing the real carve surface to **12 baselines
across WS3(1)/WS2(3)/WS4(4)/WS5(2)/BH-B2.2(1) + the dead-cut(1)**.

**(b) The cut-gate.** Add this table to `bg-build-map.md` as the explicit "ratchet-drain dependency chain" so
`19.1 BG.W-CUT`'s `RATCHET_BASELINES == {}` precondition is a VISIBLE cut gate, not an implicit surprise. A single
slipped carve (esp. the WS5-gated WS4 `10.12`) leaves the ratchet non-empty → the cut cannot pass `--run full`.
CORRECT BH PLAN §71's "drained to ∅" → "the 3 BH rows drained; 12 BG baselines drain across WS2/3/4/5 + BH-B2.2,
4 are ratchet-EXEMPT (3 shaders + property-regs manifest)."

---

## 7. Honesty fixes carried (rows 2.7 / 18.11 / 19.2 + doc-vs-disk findings)

**Row 2.7** (named by lane; numerically WS1) — DONE-to-skip is honest, but scrub its 3 W-REFLECT3 mentions (§5)
and re-frame the VT re-attempt as KEEP-BOOKED-honest with a trigger, not a W-REFLECT3 hand-off.

**Row 18.11** (B7 ask roster) — AMEND the "exactly 4 by-name asks" framing (C6 F6/GC-FC11e): BH's OWN 5.0.0
consumer break is the **2 `/api` asks** (muster, speedtest); the 4-row relay carries 2 BG-owned token asks
(atlas `--ring`→`--focus-ring-color`, bbnf `--glass-blur-dock` retire) for completeness. The `W5-viz-disposition`
clause name (NOT `W4` — inv-26 already owns the content-only fence) is already correct on disk. Cross-ref C4 F4:
the `publish-and-cut §4` "narrow / no ask owed" framing under-scopes the **fourth latent vector** — muster/slides-K/
bbnf-buddy/slides install below 4.0.0, so their `^5` bump is a JOINT 4.0.0+5.0.0 migration (live witness:
`slides-K DeckGate.vue:41 DialogContent variant="opaque"` silently no-ops post-`BA.W-SURFACE-AXIS`). Key-preserving
≠ zero-lift; align the operative cut-day doc with `consumer-constellation.md`.

**Row 19.2** (CLAUDE.md delete) — KEEP as the absolute-last act; AMEND the gate to: `--run full` /tmp
siblings-absent dry-run AFTER all canon homes authored AND all 16 readers re-pointed-OR-DELETED (14 DELETED per
18.10's amendment, so only the 2 structural readers + the load-bearing homes need to resolve). `rm CLAUDE.md` last
by construction.

**Doc-vs-disk findings (contradicting docs are findings per SEED discipline):**
- **F-A2-1 [confirmed]** `proof-no-god-module.mjs` carries **16** real baselines (lines 138–172), not "drained to
  ∅" (BH PLAN §71 FALSE). C5's "`RATCHET_BASELINES == {}` at line 20" misread the close-STATE-GOAL comment.
- **F-A2-2 [confirmed]** `12.2 W-JUBILANCE-DECIDE` "KEEP `useCelebrationBurst` (2 consumers)" is FALSE — 0 real
  consumers on disk (barrel + prose-comment + type-reexport only). DELETE.
- **F-A2-3 [confirmed]** WS8 `SPEC-pass4-converged.md:37` fences `createCanvasLifecycle` at the pre-carve 695L
  (stale vs `10.12`'s carve); `:247` R4 confirms the render-target seam is ABSENT. WS8/WS9/WS7 `SPEC-pass*`
  files must be stamped **SUPERSEDED-BY-CURSOR** (`uDispersion`→`uChromatic`; WS7 "nothing on disk" FALSE while
  Band-0 is DONE) — GC-FC8f.
- **F-A2-4 [confirmed]** `createRenderTarget.ts` + `glass-refract.glsl.ts` ABSENT on disk — the C-SAFARI keystone
  (13.3) is unbuildable as specced; drop-with-trigger (§3b) is the honest disposition.
- **F-A2-5 [confirmed]** `FINAL.md:344–347` re-legitimizes W-REFLECT3 as "the deferred post-integration
  human-verdict step" — contradicts `real-paint-protocol §3` abolition. DELETE (§5).

---

## 8. Fable/DesignSync routing (the binding 2026-07-01 directive) for the [P] waves in range

Every VISUAL ([P]) wave in 10–19 names its Fable design arm + DesignSync review surface (0/N compliant at HEAD,
C1 F7). The in-range [P] waves and their surfaces:

| wave(s) | Fable design arm | DesignSync review surface |
|---------|------------------|---------------------------|
| `10.1` scroll-shrink, `10.2` sheet-inset | ScrollCard / Sheet gestalt | `/containers` card+overlay cards |
| `10.3` specimen, `10.4` bento, `10.21/10.22` demo | bento-specimen dispatcher gestalt | `/foundations` + section-landing cards |
| `10.10` liquid-entrance, `10.24` 12-laws (→F5 `W-LIQUID-WEIGHT-DEFAULT`) | the transition-register inversion sweep (ruling #6) | motion storybook sweep |
| `10.15` goo-barbell, worm | carousel/pager worm goo-morph | `/navigation` pager+carousel |
| `10.23`/WS10 de-shadcn | form-control material gestalt | `/forms` six-state matrix |
| `12.11` CHART (F6 ADD) | **chart family gestalt (Fable-authored, ≥2-bar gated)** | `/data` chart cards |
| `13.1/13.2/13.5` glass-deep | the calm→deep glass arc | `/foundations` glass tiers + hero CTA |
| `14.1–14.4` paper/handmark | the warm raster tooth + hand-voice | `/foundations/paper` + `/compositions/math-paper` |
| `16.1/16.2/16.4` storybook | scroll-progress + typewriter + suffuse | storybook chrome |
| `17.3/17.4/17.6` coherence | the harmonized-whole cross-page read | the 480-capture dual-engine roster |

---

## 9. Tally

- **Rows in range (10.x–19.x):** 63 (WS4 25 · BH-WS4 6 · WS7 13 · WS8 5 · WS9 6 · WS10 5 · WS11 4 · WS12 6 ·
  BH-WS12 11 · cut 2 — note some phases share counts; see §1).
- **Verdicts:** KEEP 20 · AMEND 7 · MERGE→family 24 · PRUNE 7 · SUBSUME 2 · DONE-already 1 · PROMOTE-to-sole-owner 1
  · EXTRACT 3.
- **Wave-count collapse in range:** WS4 25→~8 (F5+F6+F7 folds) · WS7 13→~7 (3 features extracted, 4 gate-only
  pruned) · WS8 5→4 (13.3 drop-with-trigger) · WS10 5→~4 (folds into F6 de-shadcn one-concern) · BH 18.x 11→~7
  (B2.x/B4.x merges + B5e added). **Net rows 10–19: ~63 → ~38.**
- **Gate disposition:** 6 gate-only waves PRUNED (`10.11/12.4/12.6/12.7/15.5` + 12.5-gate-arm); 14 doc-presence
  `claudeMd` clauses DELETED (18.6/18.10); 2 structural readers dissolved to freshness gates; `12.3`/`18.9→B5e`
  drive the 360→~250 category-gate fold. **Net gate count in range: NEGATIVE.**
- **W-REFLECT3:** 5 cursor rows + 6 build-map tails + 1 build-map carve-out + FINAL.md:344-347 → **0 surviving
  references** in range.
- **Ratchet:** 16 baselines surfaced as a visible cut-gate table; 4 EXEMPT (contract hardened), 12 → owning carve
  waves across WS2/3/4/5 + BH-B2.2 + the dead-cut.
- **Carve double-owners:** 2 reconciled to single writers (`useGlassBackdropLuminance`→10.13;
  `createCanvasLifecycle`→10.12, WS8 fence re-pinned).
- **Dead-cut:** 1 wave owns 5 deletes + 1 fold + 3 lying-doc deletes; kills the 10.5/12.1/12.2/6.4 quadruple-claim.
- **Doc-vs-disk findings:** 5 logged (§7 F-A2-1…5).

**Bottom line:** rows 10–19 carry the two densest ceremony pockets (WS4 carves, WS7 gate/feature bloat); the fold
collapses them into the F2/F4/F5/F6/F7/F8 families, owns the dead-cut once, scopes C-SAFARI and paper honestly,
abolishes W-REFLECT3, and turns the ratchet-drain into a visible cut gate — net ~63→~38 rows, gate count negative.
