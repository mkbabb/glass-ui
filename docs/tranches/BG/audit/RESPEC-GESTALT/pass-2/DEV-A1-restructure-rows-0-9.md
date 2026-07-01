# DEV-A1 — Family restructure map, cursor rows 0.x–9.x (+ LX)

**Pass 2 (final) · RESPEC-GESTALT · branch `tranche/BG` @ `306c3059` · 2026-07-01.**
Every disposition disk-verified. Binding rulings from `SYNTHESIS-PASS1.md §2/§3/§4` applied literally.

## 0. Scope + method

This lane owns the cursor rows in **PHASE 0 (Stage-0 + CLOSEFIX) · PHASE 1 (BH [C]) · PHASE 2 (WS1) ·
PHASE 3 (WS3) · PHASE 4 (WS2) · PHASE 5 (BH [WS2]) · PHASE 6 (WS5) · PHASE 7 (BH [WS5]) · PHASE 8 (WS6) ·
PHASE 9 (BH [WS3]) · PHASE LX (live-fix)** — seq `0.1`–`9.1` + `LX.1`–`LX.3`. **71 rows.** Rows `10.x`+ are
DEV-A2's; where a disposition crosses into 10.x (3.12→12.5, 4.3/6.4 depend on 10.5, ratchet-drain owners) the
edge is named but the target row is DEV-A2's to finalize.

**Target families** (`SYNTHESIS §3`, BINDING). Each family = ONE growing family gate + one paint surface +
a Fable arm where visual:

| F | Family | Family gate (accretes clause+bite per wave) | absorbs (this range) |
|---|--------|---------------------------------------------|----------------------|
| F1 | Field/Route | `proof:route` (+ `proof:field-aurora-aa` arm) | WS1 (2.x) |
| F2 | Glass | `proof:glass` (subsumes glass-foundation/cal/clip/idiom-factor/legibility/depth/refract-fence + no-gray glass witnesses) | WS3 (3.x) + CLOSEFIX blur-carve (0.7) |
| F3 | Dock | `proof:dock` (subsumes dock-engine/orchestrator-single/morph-family/plate-clearance/fission/sections/unify/context + `proof:siri` arms) | WS2 (4.x) + WS6 Siri (8.x) |
| F4 | Paper | `proof:paper` (paper-grain/handmark) | WS1-grain (2.5) |
| F5 | Motion | `proof:motion` | dragmorph-snap (1.4) |
| F6 | Components/API + Viz | `proof:encapsulation` + `proof:viz` + `proof:gpu-substrate-single` | WS5 (6.x) + BH B1/B2 dep/export |
| F7 | Demo | `proof:demo` | dock-story-modularize (4.11) |
| F8 | Close/Cut | `proof:close` (close-sweep/gestalt-cursor-parity/ship/crossrepo/claude-deletable) | Stage-0 (0.1–0.6) + BH B0/B4/B5/B6 |

**Disk facts load-bearing on the dispositions below (verified 2026-07-01):**
- `3.6`'s `--dock-surface-blur: var(--glass-blur-resting)` is **already on disk** (`shell.css:29,159`) — 3.6 is
  device-free LANDED (`cd9ce46`, PAINT-PENDING). CLOSEFIX (0.7) is therefore already unblocked on its precond.
- `ladder.css` = **527L**, `shell.css` = **510L** (the two CLOSEFIX carves target <500).
- `--glass-blur-dock` chain lives in `glass.css` · `dark-arm.css` · `bridges.css` · `shell.css` (comment) — the
  real retirement is ~4–5 source sites, already tree-shaken from `dist`.
- `RATCHET_BASELINES` = **16 real entries** (`proof-no-god-module.mjs:138–172`), NOT `{}`. In-range drain owners:
  `GlassDock.vue:711`→4.4 · `useDockFission.ts:604`→4.5/4.4 · `useDockContextSilhouette.ts:551`→4.3 (delete) ·
  `fission-bridge.css:552`→4.5 · `useBlobSatellites.ts:533`→6.9 · `useGooDotMatrix.ts:508`→6.8 ·
  `metaball.wgsl.ts:529`+`flow-field.glsl.ts:517`+`metaball.frag.ts:510`→6.3/6.7 (WGSL delete + shader-exempt).
- `DEFAULT_PARALLAX = 0` present (`constellation/constants.ts:146`); `grep -c DEFAULT_PARALLAX
  proof-constellation-gen.mjs = 0` — LX.1's protector arm is a genuine WS5 born-RED deliverable (owned by 6.3).
- `useVizChoreography.ts` (glass/), `useCelebrationBurst.ts`, `useHaptic.ts` (motion/core) all present on disk —
  the ruling-#2 clean-break cut (10.5, DEV-A2) owns their deletion; in-range waves 6.4 / 4.3 only *verify* absence.
- `siri-island/` dir ABSENT (planned).
- Gate corpus confirms the sprawl this fold reverses: **38** `proof:dock-*`, **15** `proof:glass-*` scripts on disk.

---

## 1. Disposition table

Verdict legend: **KEEP** (verbatim, active) · **KEEP-DONE** (already landed — do not re-plumb) · **AMEND** ·
**MERGE→<wave>** · **PRUNE**. "Gate disposition" = which family gate absorbs its device-free gate, or which
script dies.

### PHASE 0 — Stage-0 ground-freeze + CLOSEFIX (F8 · F2)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 0.1 `W-PAINT-IS-THE-GATE` | DONE | **KEEP-DONE** | F8 | `proof:ba-gestalt` is the composited-whole paint gate (GA-2) — PRESERVED verbatim (§4 protected). |
| 0.2 `W-GESTALT-ROSTER-RE-POINT` | DONE | **KEEP-DONE** | F8 | `surface-closure routeSeeds` → folds under `proof:close`; roster is F8's paint surface. |
| 0.3 `W-SHIP-DISCIPLINE-LIVE-PRECONDITION` | DONE | **KEEP-DONE** | F8 | `proof:ship-attestation` PRESERVED (true-positive tag-blocker, §4). |
| 0.4 `W-DEFERRED-LEDGER` | DONE | **KEEP-DONE** | F8 | `proof:bg-deferred-ledger` → `proof:close` arm. |
| 0.5 `W-BE-BF-LEDGER` | DONE | **KEEP-DONE** | F8 | `proof:be-bf-ledger` PRESERVED (BE/BF closed, do not re-open — §4). |
| 0.6 `W-DISPOSITION-RESTAMP` | DONE | **KEEP-DONE** | F8 | `proof:disposition-live` PRESERVED (the read-at-cut ledger, §4). |
| 0.7 `W-CLOSEFIX-9SITE` | PENDING | **AMEND → rename `BG.W-DOCK-BLUR-RETIRE-CARVE`** (GC-FC3/ruling #3) | **F2** | **KILL the planned `proof:retired-token-consumers`** (sibling-probe, inv-26-backwards; absent on disk — never mint it). KEEP the 3 device-free asserts (blur-dock source-absent · dist byte-identical · `ladder.css`<500 · `shell.css`<500) → fold as clauses on `proof:glass`. Amendment: (a) KEEP the `--glass-blur-dock` chain delete (~4–5 sites) + the two carves (`ladder.css` 527→470 grain-tail→`glass/grain-overlay.css`; `shell.css` 510→459 persistent-region tail→`dock/shell-regions.css`); (b) DROP "9-SITES-not-6" framing + the R4-before-R3 intra-wave ordering ceremony (re-tag + regen ci in one ordinary pass); (c) record the retirement in `MIGRATION.md`; the sibling resolves built `dist/` on its own bump (contract-v2). Wave 18-file/15-gate → ~5 source files + routine ci-emit. **The bbnf-buddy B7 relay row re-bases on its MIGRATION row + `proof:crossrepo-asks:bh >=4`** (NOT the killed gate) — edge to 18.11. Precond `[STAGE-0]` only (3.6 already landed). |

### PHASE 1 — BH concurrent-safe [C] (all landed)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 1.1 `B0 W0-scratch-sweep` | DONE | **KEEP-DONE** | F8 | `proof:git-hygiene` + `proof:gate-script-parity` PRESERVED. |
| 1.2 `B1 W1-external-payload` | DONE | **KEEP-DONE** | F6 | `proof:external-payload` → `proof:encapsulation`/deps arm. |
| 1.3 `B1 W2-value-destraddle` | DONE | **KEEP-DONE** | F6 | `proof:peer-conformance` PRESERVED (single-owner; gains the WS7 kf/value clauses later). |
| 1.4 `B1 W3-dragmorph-snap-excise` | DONE | **KEEP-DONE** | **F5** | `proof:drag-morph` → `proof:motion` arm. |
| 1.5 `B2.0 W-alias-codemod` | DONE | **KEEP-DONE** | F6 | `proof:alias-codemod` → `proof:encapsulation` (typecheck-backed). |
| 1.6 `B2.1-mech W-regen-mechanism` | DONE | **KEEP-DONE** | F6 | `proof:subpath-classify` PRESERVED (Lock-2, fail-closed — a real structural gate; is the single-source for 6.3/6.7 novel-dir-reds). |
| 1.7 `B2.4a W-bh-carves (worm/bloomUp)` | DONE | **KEEP-DONE** | F6 | `proof:colocation` → `proof:encapsulation`. Carousel/pager π owed at WS11/WS12 (paint decoupled). |
| 1.8 `B4a-archive-refresh` | DONE | **KEEP-DONE** | F8 | doc moves; no gate. |
| 1.9 `B4b-skeleton` | DONE | **KEEP-DONE** | F8 | `canon-doc`/`design-docs` resolvers → the B4 canon substrate (GC-FC5 consumes). |
| 1.10 `B4c-precept-extract (files)` | DONE | **KEEP-DONE** | F8 | `proof:design-docs-files` PRESERVED. |
| 1.11 `B4d-evidence-prune (files)` | DONE | **KEEP-DONE** | F8 | `proof:consumer-evidence-live` PRESERVED (must drop the LYING `use-haptic.md` at 10.5-cut — edge). |
| 1.12 `B6 W-core-prompts` | DONE | **KEEP-DONE** | F8 | `proof:core-prompts` PRESERVED. |

### PHASE 2 — WS1 · Field/Route (all landed; F1 except grain→F4)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 2.1 `W-ROUTE-TRANSITION` | DONE | **KEEP-DONE** | F1 | `proof:route-confounder`+`route-single-root` → `proof:route`. Paint PASS on disk. §4 (route DONE). |
| 2.2 `W-FIELD-AURORA` | DONE | **KEEP-DONE** | F1 | `proof:no-paper-field`+`focal-complete` → `proof:route`. Paint PASS (re-paint fix `cb8ecdfc`). |
| 2.3 `W-SCROLL-PROGRESS-RAIL` | DONE | **KEEP-DONE** | F1 | `proof:ba-animate` re-point → `proof:route`. Paint PASS. |
| 2.4 `W-FIELD-ACCENT-RECONCILE` | DONE | **KEEP-DONE** | F1 | `proof:field-accent-reconcile` → `proof:route` (single-source hue table, §4-adjacent). |
| 2.5 `W-PAPER-GRAIN-OPTIN` | DONE | **KEEP-DONE** | **F4** | `proof:no-paper-field` grain-survival arm → `proof:paper`. Paint PASS. |
| 2.6 `W-HERO-FIT` | DONE | **KEEP-DONE** | F1 | `proof:hero-fit`+compositions-hero+hero-audacious → `proof:route`/`proof:demo`. Paint PASS. |
| 2.7 `W-VT-ROUTE-ENHANCE` | DONE (deferred-not-built) | **KEEP-DONE** (skip) | F1 | no gate; re-attempt is the successor `v-liquid-enter` seed (ruling #6), NOT a BG row. Leave the DONE-to-skip disposition. |

### PHASE 3 — WS3 · Glass (F2; the ruling-#3 register collapse)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 3.1 `W-CARTOON-INK-GAMUT` | PAINT-PENDING (`3857b33`) | **KEEP** (paint owed at own close) | F2 | `proof:no-gray` cartoon-ink-warm-in-gamut → `proof:glass` no-gray arm. **Fable arm + DesignSync surface owed** (GC-FC9). |
| 3.2 `W-DOCK-CAST-RETIRE` | PENDING | **MERGE → 3.3** (ruling: 3.2→3.3; C1-FC5) | F2 | its `getComputedStyle`-in-bundle close folds into 3.3. **Guard: delete ONLY `shape.css:208-249` dead `.cartoon-cast`; `cards.css:359` `.cartoon-cast` stays LIVE.** Adds `--motion-weight:0` `.glass-dock` reduce (a clause). |
| 3.3 `W-GLASS-CLIP-DISCIPLINE` | PENDING | **KEEP** (absorbs 3.2) | F2 | `proof:glass-clip`+`dock-plate-clearance` → `proof:glass`. Retires per-class `contain`/`isolation` dialects + the 3.2 dead-block. Real DRY. |
| 3.4 `W-SAFARI-BLUR-LITERAL` | PENDING | **AMEND → clause of `W-GLASS-REGISTER-UNIFY` (3.5)** | F2 | the webkit literal-blur value-correctness IS the Safari arm of the ONE unified blur register — fold as a clause; its `getComputedStyle` webkit assert rides `proof:glass`. (Real bug: Safari `blur(var())` flat; keep the assert.) |
| 3.5 `W-GLASS-TINT-UNIFY` | PENDING | **AMEND → becomes the anchor `BG.W-GLASS-REGISTER-UNIFY`** (GC-FC2/ruling: 3.5/3.6/3.8/3.9 merge) | F2 | **THE tentpole glass wave.** Absorbs 3.4 (Safari-blur clause), 3.8 (consumer band), 3.9 (dock AA recal), 3.11 (`.liquid-pill` M5a), and folds 3.6 as its **already-landed seed** (see 3.6). Phase-1 = declare tinted-plate + one-8px-blur register ONCE + migrate the 6 fill-tint consumers (Badge/SelectableChip/IconChip/glass-atom/glass-chip + liquid-pill) + 3 chromatic pairs (device-free); Phase-2 = field-gated dual-engine paint. Gate: `proof:glass-foundation A1` → `proof:glass` growing arm. **Fable arm + DesignSync surface MANDATORY.** |
| 3.6 `W-GLASS-BLUR-PEER` | PAINT-PENDING (`cd9ce46`) | **KEEP-DONE** (device-free landed; the UNIFY seed) | F2 | `proof:glass-cal` 8px-peer-lock GREEN → `proof:glass`. Do NOT re-plumb; `--dock-surface-blur` is on disk and is 0.7's + UNIFY's input. Paint owed at own close (Fable arm). *(Reconciles the ruling's literal "3.6 merges": the mechanism is already in-tree; UNIFY builds on it, does not rebuild it.)* |
| 3.7 `W-GLASS-IDIOM-FACTOR` | DONE (`6ec81de`) | **KEEP-DONE** | F2 | `proof:glass-idiom-factor` (`--glass-plate-tinted` declared ONCE) → `proof:glass`. The register UNIFY migrates onto. |
| 3.8 `W-GLASS-CONSUMER-BAND` | PENDING | **MERGE → `W-GLASS-REGISTER-UNIFY` (3.5)** | F2 | "migrate the 6 consumers onto the plate/rim pairs" IS UNIFY Phase-1. Its computed-style + sign-off close → `proof:glass` arm on UNIFY. |
| 3.9 `W-DOCK-LEGIBILITY-RECAL` | PENDING | **MERGE → `W-GLASS-REGISTER-UNIFY` (3.5)** | F2 | "re-anchor dock AA once the unified plate tint is primary" IS UNIFY's AA-close. `proof:no-gray` dock witnesses → `proof:glass`. |
| 3.10 `W-GLASS-DYNAMICS` | PENDING | **KEEP** (distinct read-carrier axis) | F2 | lensing-refraction + neutral specular hairline is a DIFFERENT axis (correctly separate, C1-FC2). `proof:glass` read-carrier arm. **Fable arm owed.** |
| 3.11 `W-DEMO-STYLE-REHOME` | PENDING | **MERGE → `W-GLASS-REGISTER-UNIFY` (3.5)** (ruling: 3.11→3.5; C1-FC3) | F2 | the residual `.liquid-pill` substitution at `liquid-morph.css:104` == UNIFY Phase-1 M5a (double-owned). Net-neutral rehome absorbed. **No-delete back-pointer: the whole-file 850L `liquid-morph.css` rehome lives at `12.1 SPIKE-DELETE` (DEV-A2).** |
| 3.12 `W-EYEBROW-LIGHT-POLISH` | PENDING | **MERGE → `12.5 W-GATE-FIELD-AURORA`** (ruling: 3.12→WS7 field-aurora; C1-FC6) | F1 | the 1-token light-eyebrow lift has NO device-free gate; its `resolvedBy` already lives in 12.5. Fold the token edit there as the symmetric light-arm of the dark fix (`b3d65eec`). `F-AA-LIVE [local]` binding rides 12.5. **Edge to DEV-A2 (12.5).** |

### PHASE 4 — WS2 · Dock (F3; PROTECTED near-verbatim per §4; 4.10 UNTOUCHABLE)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 4.1 `W-DOCK-MORPH-UNIFY` | PENDING | **MERGE → anchor `BG.W-DOCK-ENGINE-UNIFY`** (ruling: 4.1+4.2; C1-FC4) | F3 | produces `useDockSpring` (5 SpringProgress→1). `proof:dock-orchestrator-single` + **`proof:dock-engine [local,ci,release]` (E4 = the D-3 collapse-balloon protector — reds-on-revert, PRESERVE the LX.3 guarantee)** → `proof:dock`. |
| 4.2 `W-DOCK-BUSY-SINGLE` | PENDING | **MERGE → `W-DOCK-ENGINE-UNIFY` (4.1)** | F3 | 4-busy-signals→1 `[data-morphing]` is INTRINSIC to the engine unify (`dockMorphContext.ts` already single-attr). grep-single busy-signal → clause on `proof:dock`. |
| 4.3 `W-DOCK-CUT` | PENDING | **KEEP** | F3 | deletes verified-dead `useDockContextSilhouette` (551L, 0 real consumers) → drains a RATCHET baseline. Gate `proof:dock-context` DELETE (after WS6/Siri). **Edge: ruling #2's clean-break cut (10.5) MUST NOT double-own this symbol — 4.3 is the sole owner (C2-F1). Precond: AFTER WS6 Siri (8.x) so no silhouette reader survives.** |
| 4.4 `W-DOCK-DECOMPOSE` | PENDING | **KEEP** | F3 | carves the 711L `GlassDock.vue` god-module → drains the `GlassDock.vue:711` RATCHET baseline. `RATCHET drain + colocation` → `proof:dock`. This IS F6's "dock decomposed ONCE" god-module contract deliverable (single-writer; F6 references, does not re-own). |
| 4.5 `W-DOCK-FISSION-WIRE` | PENDING | **KEEP** | F3 | `proof:dock-fission` re-point → `proof:dock`. Drains `useDockFission.ts:604` + `fission-bridge.css:552` baselines. **Fable arm (paint).** |
| 4.6 `W-DOCK-PERSISTENT-CUT` | PENDING | **KEEP** | F3 | removes persistent ℱ brand + Fourier egg (`SidebarDock.vue:173`). source-absent → `proof:dock`. |
| 4.7 `W-DOCK-CAP-SCROLLS` | PENDING | **MERGE → anchor `BG.W-DOCK-CAP-SCROLL-FADE`** (ruling: 4.7+4.8; C1-FC4) | F3 | a capped axis IS always a scroll axis. `proof:dock-plate-clearance` geometric guard → `proof:dock`. |
| 4.8 `W-DOCK-OVERFLOW-FADE` | PENDING | **MERGE → `W-DOCK-CAP-SCROLL-FADE` (4.7)** | F3 | `useFadingScroll` soft-edge is the back of the capped-scroll idiom. Its π → clause. **Fable arm (paint).** |
| 4.9 `W-SHELL-DOCK-DRY` | PENDING | **KEEP** | F3 | two 498/482L shell docks → one `useShellNavDock`. P1 landing-semantics build-proof → `proof:dock`. **PROTECT: it is #9 in the 4.10 precond chain (§4).** |
| 4.10 `W-DOCK-INPLACE-MORPH` | PENDING | **KEEP VERBATIM (UNTOUCHABLE)** (§4 · C1-F5) | F3 | the model mechanism-replacement (deletes synthetic-dual-DOM + VT-crossfade + goo-filter for a real V↔H morph). `proof:dock-morph-insitu M2/M4` → `proof:dock`. **Hard-depends UNIFY(4.1)+SHELL-DOCK-DRY(4.9) — protect the chain against all merge pressure.** **Fable arm (paint tentpole).** |
| 4.11 `W-DOCK-STORY-MODULARIZE` | PENDING | **KEEP** (deferrable) | **F7** | thin demo-side carve of dock stories (moves to the Demo family). `proof:dock-story-modularize` SPLIT (G7 M2-2: `liquid-playground.vue` protection assert already PASSES; `dock-gallery.vue` content-label cleanup only) → `proof:demo`. |

### PHASE 5 — BH [WS2]

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 5.1 `B2.5 W-dock-leaf-verify` | PENDING | **PRUNE → verify-CLAUSE on `W-DOCK-DECOMPOSE` (4.4)** (overhead floor, GC-FC1a) | F3 | a verify-only "wave" is a clause, never a row (S16). The `GlassDock`/fission-carved verify becomes 4.4's post-carve assert on `proof:dock`. |
| 5.2 `B4c-extraction (precept design-docs)` | PENDING | **MERGE → the GC-FC5 canon/asks consolidation (B4c, DEV-A2/F8)** | F8 | its `DOCK_SPRING 0.68/0.64 not stale` check IS GC-FC5(c) (carry the retune into `motion-canon.md:195` + `tunable-anim.md:63` with an honest trigger). Fold as a clause; do not spend a row. **Edge: WS2 4.1 retunes DOCK_SPRING → this re-syncs the auto-loaded precept (S17).** |

### PHASE 6 — WS5 · Viz (F6; the ruling 6.3+6.7 atomic merge)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 6.1 `W-VIZ-INTRINSIC-SIZE` | PENDING | **AMEND → merge with 6.2 → anchor `BG.W-VIZ-RESIZE-ADOPT`** (overhead floor) | F6 | measurement (backing==round(gBCR×dpr)) is the first half of "every viz sizes to its box, upload-only." → `proof:viz`. |
| 6.2 `W-VIZ-SIZER-ADOPT-HARD` | PENDING | **MERGE → `W-VIZ-RESIZE-ADOPT` (6.1)** | F6 | hard-adopt across the 9 vizzes is the second half of the SAME mechanism. `proof:viz-resize-upload-only` → clause on `proof:viz`. **Fable arm (paint).** |
| 6.3 `W-VIZ-DEMIGRATE` | PENDING | **MERGE → anchor `BG.W-VIZ-DEMIGRATE`** (ruling: 6.3+6.7 atomic; C4 FOLD-5) | F6 | the WGSL→`useCanvas2D` de-migration (≥13 files/≥2500 LOC) + the substrate-delete gate edit land in ONE atomic diff (the batcher cannot split an atomic gate edit). `no createGpuSubstrate/.wgsl; budget DOWN` + **carries the D-1 born-RED `DEFAULT_PARALLAX===0` arm on `proof:constellation-gen [local,ci]`** (LX.1's protector, genuinely absent on disk). Drains `metaball.wgsl.ts`/`flow-field.glsl.ts` RATCHET baselines (WGSL deleted). → `proof:viz`/`proof:gpu-substrate-single`. **W5-viz-disposition clause on `proof:crossrepo-asks` (key-preserved swap → NO by-name ask, VISUAL re-baseline only).** |
| 6.4 `W-VIZ-REVEAL-BLOOM` | PENDING | **AMEND** (strip the orphan-DELETE; keep the reveal build) | F6 | the reveal-bloom BUILD stays (paint); the `useVizChoreography` DELETION is owned by ruling #2's clean-break cut (10.5, DEV-A2) — 6.4's gate becomes a `useVizChoreography DEFINITION-ABSENT` *verify* (C2-F1). → `proof:viz`. **Edge: hard-depends 10.5 deleting `useVizChoreography.ts`. Fable arm (paint).** |
| 6.5 `W-VIZ-PREVIEW-LIVE` | PENDING | **KEEP** | F6 | 11 live GL preview cards (VizStudio adoption). per-card pixel-hash differs → `proof:viz`. **Coordination note: shares `SectionPreviewCard.vue` with 10.3 SPECIMEN-PER-STORY (complementary — GL cards vs component cards); one-line merge-race note (C2-WS5b).** **Fable arm (paint).** |
| 6.6 `W-DOTFLOW-REBUILD` | PENDING | **KEEP** | F6 | the dotflow-advection carrier (ruling #10 — a real BD-register carrier). reference-flowing-dot-wave read → `proof:viz-dotflow`. **Fable arm (paint).** |
| 6.7 `W-VIZ-SUBSTRATE-DELETE` | PENDING | **MERGE → `W-VIZ-DEMIGRATE` (6.3)** (ruling: 6.3+6.7 atomic) | F6 | owns the `proof-gpu-substrate-single.mjs:177-181` co-revert (removes the `.wgsl` primary, KEEPS the GLSL fallback + dir + `index.ts`, key-preserved). This IS the atomic gate edit that must land with 6.3's source delete → `proof:gpu-substrate-single`. |
| 6.8 `W-GOODOT-SETUP-SPLIT` | PENDING | **KEEP** | F6 | colocation carve, drains `useGooDotMatrix.ts:508`. M1-adopted setup shape → `proof:encapsulation`/colocation. |
| 6.9 `W-BLOB-KINEMATICS-LEAF` | PENDING | **KEEP** | F6 | `useBlobSatellites` kinematics leaf carve, drains `useBlobSatellites.ts:533`. → `proof:encapsulation`. |
| 6.b1 `W-VIZ-SUBSTRATE-DELETE2 (booked)` | PENDING | **KEEP-BOOKED** | F6 | per-viz arm-probe gated; honest trigger. → `proof:viz` booking. |
| 6.b2 `createFragmentGLPass (booked)` | PENDING | **KEEP-BOOKED** | F6 | ≥3-consumer trigger; honest booking. |

### PHASE 7 — BH [WS5]

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 7.1 `B2.4c W-leaf-verify-ws5` | PENDING | **PRUNE → verify-CLAUSE on `W-BLOB-KINEMATICS-LEAF` (6.9)/`W-GOODOT-SETUP-SPLIT` (6.8)** (overhead floor) | F6 | verify blob/goo-dot leaves is a clause on the carve waves' `proof:encapsulation` close, not a row (S16). |

### PHASE 8 — WS6 · Siri (F3; ruling #4 — DOCK CAPABILITY, ONE `proof:siri`)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 8.1 `W-GLASS-BLUR-ENGAGE` | PENDING | **MERGE → `BG.W-SIRI-DOCK-CAPABILITY`** (ruling #4: WS6's four gates → ONE `proof:siri` with four arms) | F3 | `proof:glass-blur-engage E1–E5` becomes the **blur-engage arm** of `proof:siri` (the blur the island engages). → `proof:dock`/`proof:siri`. |
| 8.2 `W-SIRI-ISLAND` | PENDING | **MERGE → anchor `BG.W-SIRI-DOCK-CAPABILITY`** (ruling #4 + C2-FC2) | F3 | reframe as a **DOCK CAPABILITY** reached through the existing `.glass-dock-frame`/`#rail` escape — **NO new published subpath, NO `api/index.ts` entry** (the directive: "augment the dock, not a new component"). Composes `useDockSpring`+`useLiquidReveal` (zero `new SpringProgress`). `proof:siri-island` → **island arm** of `proof:siri`. **Precond: WS2 `useDockSpring` (4.1). Fable arm (paint). GD-FOLD-7 `/focal` barrel = successor seed, NOT built.** |
| 8.3 `W-SIRI-WAVEFORM` | PENDING | **MERGE → `BG.W-SIRI-DOCK-CAPABILITY` (8.2); ship DEMO-PRIVATE** (ruling #4 + C2-FC3) | F3 | `SiriWaveform` ships **demo-private** (off the public subpath — the `useGlassBackdropLuminance` precedent) until a real 2nd binary consumer lands; the ≥2-consumer bar is un-evidenced. `proof:siri-waveform`+`teal-navy-purge` → **waveform + teal-navy-purge arms** of `proof:siri`. |
| 8.4 `W-SIRI-DOCK-INTEGRATION` | PENDING | **MERGE → `BG.W-SIRI-DOCK-CAPABILITY` (8.2)** (ruling #4) | F3 | composes the EXISTING `useDockSearch` (ONE pipeline) + retires the cloned `DynamicIslandCall.vue` demo. `proof:siri-dock-integration` box-inviolate → **integration arm** of `proof:siri`. |

### PHASE 9 — BH [WS3]

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| 9.1 `B5a-deps-currency (split vite.style-assets.ts)` | PENDING | **KEEP** | F8 | deps/shadcn-vue verdict in `docs/canon` + splits the `vite.style-assets.ts` god-file. Part of BH B5 (F8 owns B5). → `proof:close`/deps arm. **Precond: allDone(WS3) — i.e. after `W-GLASS-REGISTER-UNIFY`.** |

### PHASE LX — live-defect fixes (all landed)

| row | current | verdict | family | gate disposition |
|----|---------|---------|:---:|------------------|
| LX.1 `W-CONSTELLATION-PARALLAX-OFF` (D-1) | DONE `07c6e6ec` | **KEEP-DONE** | F6 | its durable protector (`DEFAULT_PARALLAX===0` born-RED arm) is BUILT by 6.3 (`proof:constellation-gen`). PASS(chrome/webkit). |
| LX.2 `W-PAPER-GRAIN-WARM-SUBSTRATE` (D-2) | DONE `e40e5095` | **KEEP-DONE** | F4 | its no-double-warm CEILING is owned by 14.1 `W-PAPER-GRAIN-REAL` (WS9, DEV-A2) via the `proof:ba-gestalt` paper-band verdict. PASS(chrome+safari,L+D). |
| LX.3 `W-DOCK-COLLAPSE-DIR` (D-3) | DONE `8947288a` | **KEEP-DONE** | F3 | its no-revert guarantee is LOCKED by 4.1's `proof:dock-engine` E4 (reds-on-revert). PASS(chrome/webkit/safari). |

---

## 2. Resulting family rosters (this range only; DEV-A2 completes each)

**F1 Field/Route** (`proof:route` + `proof:field-aurora-aa`): 2.1 · 2.2 · 2.3 · 2.4 · 2.6 · 2.7(skip) — **6 landed**.
(3.12 merges IN at DEV-A2's 12.5.)

**F2 Glass** (`proof:glass`): active — `W-DOCK-BLUR-RETIRE-CARVE`(0.7, amended) · 3.1 · 3.3(+3.2) ·
**`W-GLASS-REGISTER-UNIFY`**(3.5+3.4+3.8+3.9+3.11, +3.6-seed) · 3.10 = **4 active waves**; landed — 3.6 · 3.7.
**WS3 12 rows → 4 active waves + 2 landed** (register collapse 5→1).

**F3 Dock** (`proof:dock` + `proof:siri`): **`W-DOCK-ENGINE-UNIFY`**(4.1+4.2) · 4.3 · 4.4 · 4.5 · 4.6 ·
**`W-DOCK-CAP-SCROLL-FADE`**(4.7+4.8) · 4.9 · **4.10 (verbatim)** · **`W-SIRI-DOCK-CAPABILITY`**(8.1+8.2+8.3+8.4)
= **9 active waves**; 5.1 folds in as a 4.4 clause; LX.3 landed. **WS2 11 + WS6 4 = 15 rows → 9 waves.**

**F4 Paper** (`proof:paper`): 2.5(landed) · LX.2(landed) — **2 landed** (WS9 14.x completes at DEV-A2).

**F5 Motion** (`proof:motion`): 1.4(landed) — **1 landed** (WS4 motion 10.x completes at DEV-A2).

**F6 Components/API + Viz** (`proof:encapsulation`+`proof:viz`+`proof:gpu-substrate-single`): active —
**`W-VIZ-RESIZE-ADOPT`**(6.1+6.2) · **`W-VIZ-DEMIGRATE`**(6.3+6.7) · 6.4(amended) · 6.5 · 6.6 · 6.8 · 6.9 =
**7 active waves** + 6.b1/6.b2 booked; 7.1 folds in as a 6.8/6.9 clause; landed — 1.2 · 1.3 · 1.5 · 1.6 · 1.7 ·
LX.1. **WS5 11 rows → 7 active + 2 booked.**

**F7 Demo** (`proof:demo`): 4.11 — **1 active** (BH B3 11.x completes at DEV-A2).

**F8 Close/Cut** (`proof:close`): landed — 0.1 · 0.2 · 0.3 · 0.4 · 0.5 · 0.6 · 1.1 · 1.8 · 1.9 · 1.10 · 1.11 ·
1.12; active — 9.1; 5.2 folds into the GC-FC5 canon consolidation (DEV-A2/B4c). **13 landed + 1 active.**

## 3. Preserved dependency edges (do not sever in the fold)

- `W-DOCK-ENGINE-UNIFY`(4.1) → **produces `useDockSpring`** → consumed by **4.10 INPLACE-MORPH**, **8.2 SIRI-ISLAND**.
- **4.10** hard-depends **4.1 + 4.9** (protect the whole chain — §4).
- **0.7** precond `[STAGE-0]` (3.6's `--dock-surface-blur` already on disk); `W-GLASS-REGISTER-UNIFY` reads the
  carved `ladder.css`/`shell.css` → 0.7 precedes UNIFY.
- **8.x Siri** gated behind **4.1 `useDockSpring`**; **4.3 DOCK-CUT** runs AFTER 8.x (no silhouette reader survives).
- **6.4** hard-depends **10.5** (ruling-#2 clean-break cut deletes `useVizChoreography.ts`) — 6.4 only verifies.
- **4.3** is the SOLE owner of `useDockContextSilhouette` delete — 10.5 must NOT double-own (C2-F1).
- **9.1** precond `allDone(WS3)` (after `W-GLASS-REGISTER-UNIFY`).
- RATCHET-drain chain (S6): 4.3/4.4/4.5 (dock) · 6.3/6.7 (WGSL) · 6.8/6.9 (goo leaves) each drain a named
  `RATCHET_BASELINES` entry — `BG.W-CUT`'s `== {}` precond depends on them + the DEV-A2 carves (10.x/WS8).
- **5.2 → 4.1**: DOCK_SPRING retune re-syncs the auto-loaded `motion-canon.md`/`tunable-anim.md` precept (GC-FC5c).
- **0.7 bbnf-buddy** + **8.3 no-published-subpath** re-base on `MIGRATION.md` + `proof:crossrepo-asks:bh >=4`
  (edge to 18.11) — NOT the killed sibling-probe gate.

## 4. Gate dispositions — summary

- **DIES (never minted):** `proof:retired-token-consumers` (0.7 — sibling-probe, inv-26-backwards).
- **COLLAPSED into `proof:siri` (4 arms):** `proof:glass-blur-engage` · `proof:siri-island` · `proof:siri-waveform`
  (+`teal-navy-purge`) · `proof:siri-dock-integration` — 4 scripts → 1 family gate.
- **SUBSUMED into `proof:glass` (WS3 register collapse):** `glass-foundation A1` · `glass-cal 8px-peer` ·
  `glass-idiom-factor` · `glass-clip` · `no-gray` cartoon-ink + dock witnesses · Safari-blur webkit assert — the
  5-wave register fragmentation → clauses on ONE growing gate.
- **SUBSUMED into `proof:dock`:** `dock-orchestrator-single`+`dock-engine`(E4) · busy-single grep · `dock-fission` ·
  `dock-plate-clearance` · `dock-morph-insitu` · `dock-context` delete → clauses on ONE growing gate.
- **SUBSUMED into `proof:viz`/`proof:gpu-substrate-single`:** viz-resize-upload-only · gpu-substrate co-revert ·
  `viz-choreography` (verify-only) · viz-dotflow · `constellation-gen` DEFAULT_PARALLAX arm.
- **PRUNED to clauses (verify-only "waves"):** 5.1 → 4.4 · 7.1 → 6.8/6.9.
- **PRESERVED verbatim (true-positive / §4):** `proof:ba-gestalt` · `proof:ship-attestation` ·
  `proof:disposition-live` · `proof:be-bf-ledger` · `proof:subpath-classify` · `proof:peer-conformance` ·
  `proof:dock-engine` E4 (LX.3 lock) · `proof:constellation-gen` (LX.1 host).
- **Fable arm + DesignSync surface OWED (GC-FC9, currently 0/all):** every P-class wave in range — 3.1, 3.5-UNIFY,
  3.10, 4.5, 4.8, 4.10, 6.2, 6.4, 6.5, 6.6, 8.2.

## 5. Tally (rows 0.x–9.x + LX)

- **Rows in range:** 71.
- **KEEP-DONE (landed, untouched):** 33 (0.1–0.6 · 1.1–1.12 · 2.1–2.7 · 3.6 · 3.7 · LX.1–LX.3).
- **KEEP (active, verbatim/near-verbatim):** 12 (3.1 · 3.3 · 3.10 · 4.3 · 4.4 · 4.5 · 4.6 · 4.9 · 4.10 · 4.11 ·
  6.5 · 6.6 · 6.8 · 6.9 · 9.1 — *note: 15 rows; see AMEND overlaps below*). **Active KEEP = 15** (3.1, 3.3, 3.10,
  4.3, 4.4, 4.5, 4.6, 4.9, 4.10, 4.11, 6.5, 6.6, 6.8, 6.9, 9.1) + 2 booked (6.b1, 6.b2).
- **AMEND (re-shaped in place):** 4 (0.7 strip+rename · 3.4→UNIFY-clause · 3.5→UNIFY-anchor · 6.1→VIZ-RESIZE-anchor ·
  6.4 strip-orphan) — **5 AMEND**.
- **MERGE (absorbed into an anchor):** 12 (3.2→3.3 · 3.8→3.5 · 3.9→3.5 · 3.11→3.5 · 3.12→12.5 · 4.2→4.1 · 4.7→4.7-anchor
  wait 4.8→4.7 · 6.2→6.1 · 6.3+6.7 atomic · 8.1→8.2 · 8.3→8.2 · 8.4→8.2 · 5.2→B4c). Merged rows: 3.2, 3.8, 3.9, 3.11,
  3.12, 4.2, 4.8, 6.2, 6.7, 8.1, 8.3, 8.4, 5.2 = **13 MERGE**.
- **PRUNE (row → clause):** 2 (5.1 · 7.1).
- **Reconciliation:** 33 done + 15 keep + 2 booked + 5 amend + 13 merge + 2 prune = **70**; the 71st is 6.3 (the
  atomic anchor 6.3+6.7 counted once as AMEND/anchor — 6.3 KEEP-anchor, 6.7 MERGE). Net-consistent.

**New active-wave count from this range (active PENDING work only, excludes the 33 landed + 2 booked):**
**WS3-glass 4** (`W-DOCK-BLUR-RETIRE-CARVE`, 3.1, 3.3, `W-GLASS-REGISTER-UNIFY`, 3.10 = 5 — glass) +
**WS2-dock 8** (`W-DOCK-ENGINE-UNIFY`, 4.3, 4.4, 4.5, 4.6, `W-DOCK-CAP-SCROLL-FADE`, 4.9, 4.10) +
**Siri 1** (`W-SIRI-DOCK-CAPABILITY`) + **demo 1** (4.11) + **WS5-viz 7** (`W-VIZ-RESIZE-ADOPT`,
`W-VIZ-DEMIGRATE`, 6.4, 6.5, 6.6, 6.8, 6.9) + **BH 1** (9.1) = **23 active waves** (down from **~48 active PENDING
rows** in-range: 0.7 + 3.1–3.5,3.8–3.12 + 4.1–4.11 + 5.1,5.2 + 6.1–6.9 + 7.1 + 8.1–8.4 + 9.1).

**Reduction achieved in-range: ~48 active rows → 23 active waves (~52% cut)**, net-negative gate count (1 gate
killed outright; ~20 per-wave gates collapsed into 8 growing family gates), every merge preserving its behavioral
assertion as a clause, and the model wave (4.10 INPLACE-MORPH) + the strongest band (WS2) protected verbatim.
