# R-path-close — the path to AX CLOSE + the next publish cut

Lane R-path-close of the AX step-back inventory. **Read-only / planning ONLY.** This lane
synthesizes the gestalt path to closing AX: the gate-fleet drift (the π-gate-in-CI decision),
the overfitting audit, the cross-repo consumer adoption (W34/W35/W41), the structural waves
(W25-W29), the close wave W33, and the next publish cut.

**Inventory base re-measured LIVE:** `at-dock-convergence @ 77c08c5` (HEAD moved past the
prompt's `c72d2ac` AND past S-gates'/W-close's `88a2ec5` — the inventory pass itself is
advancing the tree). `package.json` version **3.8.0**; `npm view @mkbabb/glass-ui version`
== **3.8.0** (registry == local — nothing published since the AX cut). Tree dirty: 31 entries
(`m docs/precepts` submodule pointer + the F-tranche audit json snaps + the in-flight inventory
`.md` files this very pass writes).

---

## §0 — The one-line verdict

**AX close is entirely UN-STARTED at the implementation level and CANNOT proceed to a tag
today — three independent blockers stand: (1) `profile:budget` is RED (CSS over the
release-gated 140k-gzip budget — the ONLY RED that blocks a tag); (2) the close machinery is
absent (`proof:ax-final`, `FINAL.md`, `archive/`, `proof:carry-closure`, `proof:no-retired-survivor`
all do NOT exist); (3) the W33-enumerated `dependsOn` interior is ~half-unbuilt (all of
W25-W29, W34/W35/W41, W39, and the convergence W46-W51/W54/W55 are `planned`).** The close is
correctly the TERMINAL DAG node — this lane's completion is bounded by the whole tranche's.

Confirmed absent at HEAD (re-`ls`'d this pass):
- `scripts/proof-ax-final.mjs` — **No such file**
- `docs/tranches/AX/FINAL.md` — **No such file**
- `docs/tranches/AX/archive/` — **No such directory**
- `grep -c '"proof:ax-final"' package.json` → **0**
- `grep -c '"proof:no-retired-survivor"' package.json` → **0**
- `grep -c '"proof:carry-closure"' package.json` → **0**

The W33 wave doc (`waves/AX.W33-close-…md`) is fully authored (743 lines) and born-RED on its
SIX falsifiable witnesses — all six RE-CONFIRM RED at HEAD. The plan is excellent; the execution
is the open work.

---

## §1 — What CLOSE requires (the seven legs, decomposed)

W33 is the gate-fleet + close-machinery authorship wave. It touches NO `src/` component/shader/
style code (only README markdown + scripts + docs). Its acceptance is `proof:ax-final` GREEN +
FINAL.md `complete_with_misses`-honest + the live π-capture README re-audit. The legs:

### Leg A — the gate fleet registered + the meta-assertion (RED witnesses 2/3; the verify-ci drift)

The single biggest mechanical close task. Three sub-decisions:

1. **The gate-tag MODEL is the band's true critical-path HEAD — and it is UNMADE.** W27a authors
   the at-LEAST-ci tag model (`local==ci` parity claim; `release` a deliberate subset; the 2
   legacy gates `fail-explicit` + `no-legacy-commentary` tagged `['local','ci','release']` as the
   documented exception). W25a + W33 both pivot on it. **W27a dependsOn only W00 (`complete`) —
   nothing blocks starting the model decision NOW.** It is the precedence anchor for the whole
   structural+close band.

2. **The proof-script↔manifest meta-gate must drive orphans → literal ZERO** (retiring the
   `proof:gate-script-parity` baseline allowlist). At HEAD the EXISTING `proof:gate-script-parity`
   PASSES because it carries a 5-orphan + 2-dangling baseline (AW-era, "owner-owed"). W33's
   STRICTER `proof:gate-fleet-registered` retires that baseline. The current orphan count is
   **~11-12** (`affordance-contrast`, `composable-return-types`, `consumers-static`,
   `datatable-split`, `dock-big-dock`, `dock-controls-split`, `frostshader-deleted`,
   `glass-panel-tiers`, `resolution-contract`, `supports-post-task-wired`, `theme-style` —
   `deck-progress-rail` was registered by W24 since the W33 doc was written). Also prune the
   STALE `KNOWN_DANGLING proof:styling-hygiene` baseline (the `.mjs` exists + runs green).

3. **The verify-ci drift — 20 ci-tagged gates absent from `.github/workflows/ci.yml`** (grew from
   the documented 14). This is the named W33/band-close task. The decision the close MUST make is
   the **π-gate-in-CI infra decision** — and the gestalt answer is NOT "add 20 `run:` lines":
   - Several of the 20 are plain registration drift — static dock/tabs/canvas/styling gates
     (`dock-region-model`, `dock-orchestrator-single`, `dock-hold-contract`,
     `dock-wrap-content-driven`, `tabs-unified`, `squircle-language`, `slider-two-only`,
     `input-invalid-aria`, `styling-hygiene`, `deck-progress-rail`) that SHOULD just be in ci.yml.
   - A smaller set carries a fail-CLOSED π-lane RUNTIME arm needing a browser binary CI lacks
     (`canvas2d-substrate`, `aurora-painterly-statistics`, `demo-radial-calm`,
     `constellation-substrate-single`, `resolve-canvas-color`). The architectural move:
     **split-tag** — the device-free SOURCE-STRUCTURE arms stay ci-tagged (already correct), the
     RUNTIME arms either run on a headless-Chrome CI job (the `tests-visual/` workspace already
     stood up at W00, driving Chrome-headless-new via ANGLE/SwiftShader + Dawn) OR carve to a
     `pi`-tagged aggregate on a device-bearing runner. And **make `verify-ci` fail-CLOSED** (it
     currently exits 0 on drift — a fail-OPEN report, the same silent-recurrence class as the AW
     close that never ran).

### Leg B — `proof:ax-final` + the 3 net-new close gates

Author (modeled on `scripts/proof-au-final.mjs`, release-only NOT ci, DEV-meta):
- `proof:ax-final` — 8 assertions on a clean tree at the tag boundary: FINAL-EXISTS (with the
  enumerated-wave green-run regex over `W00..W42`, incl. W25a/b/W27a/b/W42 — a missing id silently
  exempts a wave), GATE-FLEET-REGISTERED, **PRIOR-CLOSE-META-ASSERT** (the antidote to AW's silent
  renumber-drift — a close that cannot prove its predecessor existed is the AW failure),
  ZERO-ORPHANS, INHERITANCE-LEDGER-CLOSED, CARRY-CLOSURE, CLEAN-TREE (only the USER-DOMAIN dirt
  allowlist), STAGED-NOT-PUBLISHED (a `.changeset/*.md` exists + version still the pre-cut line).
- `proof:gate-fleet-registered` — the meta-gate + tag-parity (Leg A).
- `proof:carry-closure` — the bbnf BD-G7 form; reads W34's `{receiver-wave, close-gate}` ledger;
  returns ZERO un-receivered AX deferred items.
- `proof:prod-validation` — the §21 end-state RE-CHECK: `npm view == <cut>` + slides custom-domain
  HTTP-200 + AX-deck content-marker + pptx-200. Release-only, runs at the live end-state.
- **Naming-lineage snag to reconcile:** `gates.mjs proof:au-final` carries a RETIRED-from-release
  note pointing to a nonexistent `proof:av-final` ("AV is the successor… proof:av-final is its
  close gate") — but `av-final` never existed. The AU→AV→AX close-gate lineage is broken; W33
  authors `proof:ax-final` and FIXES the dangling `av-final` reference.

### Leg C — the four READMEs swept planned→landed + live π-capture re-audit

The READMEs EXIST (aurora 634L, goo-blob 413L, dock 288L, constellation 267L) — this is a
CURRENCY sweep, not authorship. Two passes: (a) editorial planned→landed keyed off the registered
gates (the aurora `:312` "currently linear-sRGB / next color step" lie → "landed, gated by
`proof:aurora-noise-hash-equivalence`"; goo-blob `smoothK` 0.28/0.22 → the reconciled 0.12; the
`defineExpose` pause/resume table → the actual exposed surface; flip iridescence/SSS/rest-pose
"Planned"→shipped); (b) **live π-capture re-audit** — every README figure is a LIVE π-lane
readback whose run-id POST-DATES the substrate-repair waves (aurora W07, blob W08/W15/W16,
constellation W17), so the figure shows a PAINTING substrate, not the maxChannel=0 dead canvas the
AW READMEs were written over. The π screenshots BECOME the README figures (the visual-truth
artefact). All four follow the canonical-readme-shape. **VERIFY the aurora + dock + constellation
get REAL research-READMEs (not stubs) — flagged by R-deferred-glassui §3 carry-row 3.**

### Leg D — the overfitting audit + spot-verification

Run the read-only overfitting audit (`docs/audits/overfitting-audit.md`; every `src/` artefact has
≥2 sites OR is exported OR is a private demo helper). Per the spot-verification gate
(`SPEC.md:269-293`): before retiring any candidate, spot-verify (a) every cited item EXISTS at its
path, (b) every rg count re-runs verbatim, (c) every "zero consumers" resolves through ALL
re-export aliases — a hallucinated retire-candidate is an integrity-sweep BLOCKER. Fold the slides
`SlideNutrition`/`mulberry32`/`menuItemVariants` dup census into the §4 ledger (recorded, not
pruned — slides-repo). The cross-lane R-overfitting inventory is the input.

### Leg E — the inheritance-ledger cross-walk (P-inv-28 zero-deferral)

Enumerate EVERY REQUIREMENTS §11 + §13 (the ~9-10 binding items) + §14 item and assign each
ADDRESSED-at-Wnn (cite wave + green gate) / RETIRES-with-rationale / ARCHIVES (write
`docs/tranches/AX/archive/<item>.md`). "Deferred to next tranche" is NOT an acceptable close-state.
**R-deferred-glassui already drafted this cross-walk** — of the 10 §13 items: 1 fully discharged
(W00 π lane), 1 folded (W30→W23), 2 partial (READMEs, card-lift var-in-arbitrary), 6
routed-but-un-executed (W28/W29, W38, W39, W33, W34/W35, W30-W32 slides). NONE dropped — every item
has a named AX receiver. The fold is COMPLETE at the routing level; EXECUTION is the open work.

### Leg F — the carry-closure gate + ι integrity-sweep + precepts-pin re-sync

`proof:carry-closure` reads W34's ledger + the inheritance cross-walk → zero un-receivered carries.
NAME the **phantom-owner re-defer anti-pattern** in FINAL (a wave declares itself "the home", ships
the sliver, books the deep half to a next wave the next tranche descopes — the M1/M2/M3 re-paper
class the AW READMEs exemplify) so AX's own waves cannot re-defer the aurora/blob/dock READMEs.
Run the ι close-ceremony lane: `git reflog --since=<AX-open>` for agent-attributed mutating ops
(zero is the hard-gate); `scripts/audit-stash-list.mjs` (present at HEAD) on the primary repo +
every worktree; the `git log --since -- docs/precepts/` walk. **Bump the precepts submodule pin
past `63240e6`** IF owed (the gitStatus shows `m docs/precepts` dirty — RATIFY-BEFORE-IMPL, a REAL
"Before/after + compare-at-close" commit only, NEVER a phantom; this is a §21 held-invariant
boundary — never stage `docs/precepts` into the AX drive).

### Leg G — FINAL.md + PROGRESS.md + the §24 lineage-merge + the publish cut

Author `docs/tranches/AX/FINAL.md` per `SPEC.md:188-267`: cite commits + artefacts, reconcile the
GOAL criterion HONESTLY (closes `complete_with_misses` with the goal-miss explicit if ANY leg
unmet — NEVER `complete` on a headless-green fleet). Run the Close-Honesty Checklist. Verify-present
the §24 3.7.0 source deltas (fourier-field, useCanvas2D, constellation-fix — VERIFIED already
present on `at-dock-convergence`). Transcribe the KEEP-BOOK ledger (text-box-trim,
GlassNativeDrawer/`Drawer :native` ≥2-consumer ASK, anchor-positioning, role-typed Dock base) +
the standing USER-DOMAIN carries (cred-consolidate gate, speedtest deploy freeze + ~550-commit
unpushed delta, kf 3.0.0 baseline-drift). Then stage the `.changeset/*.md`.

---

## §2 — The publish-blocking RED (the ONE thing between HEAD and a tag)

`profile:budget` is **RED** and `release`-tagged — the only RED that gates a tag:
- `dist/styles/index.css` raw **555070 / 548000 (101.3%)**, gzip **144852 / 140000 (103.5%)**.
- Every JS subpath PASSES.

The CSS grew past the 140k-gzip budget from the convergence-2 CSS net (W45 dock region-model +
dock-controls, W52 liquid-glass material, W53 tabs, W56 squircle tokens, W59 slider). The 3.8.0 cut
LIFTED the budget to 140k forward-sizing "for the convergence net of the trims" — but the trims
(W25b CSS carves, W19 prunes) have NOT yet landed, so the net is positive. **The precept-clean fix
is a rebaseline AFTER the trims, not before** — a rebaseline to a not-yet-trimmed number would
bless the bloat. Sequence: **W25b (tokens §-seam partials, utilities relocations, floating-panel
dead-chain excise) + W19 (header-ribbon/glass-panel/glyph CSS prune) land → measure → rebaseline at
the trimmed truth.** Owner: W33 rebaseline, GATED on W25b. Because it is release-tagged, NO next cut
can proceed until this is GREEN.

The other four close-blocking REDs (`verify-ci`, `no-god-module`, `no-legacy-commentary`,
`story-language`) block the W33 CLOSE but NOT a tag. `proof:animation-coherence` (the speedtest
3-site `--ease-apple-spring` census) stays correctly OUT of the aggregate — a cross-repo consumer
debt that greens only on the published bump (W34), not a glass-ui src defect.

---

## §3 — The structural waves (W25-W29) — the close PRECONDITION cohort

The ENTIRE J-band (W25a/b, W26, W27a/b) + the K-band (W28/W29) is **NOT-STARTED** — all `planned`,
every gate born-RED at HEAD as the charter predicted, targets GROWN ~30%+. Clean, well-specified,
fully unstarted. The close depends on these:

- **W27a is the band HEAD** (the gate-tag model anchor; dependsOn only W00). Make the model
  decision, re-tag the 2 legacy gates, author `proof:tag-parity` + `proof:no-dead-arbitrary` (the
  var-in-arbitrary non-emit guard), scrub the (now >6) ui/ barrel refs. Small, mechanical,
  unblocks CI-RED. **This is the true critical-path head of the whole close band.**
- **W25a** (consumes W27a's model) — extend `proof:no-god-module` to `.css`, ci-re-tag, re-point
  the dist `@source "../components"` content-scan DEADLINK (still present in `src/styles/index.css`
  AND `dist/styles/index.css` — resolves to a nonexistent `dist/components/` dir, so the library's
  own component-template scan finds nothing in a consumer prod build). Lands BORN-RED on **6** CSS
  violators (not the charter's 4): tokens.css 1983, dock.css 1639, utilities.css 1154, glass.css
  795, + dock-controls.css 531 + theme.css 514 (the last two likely cohesion-EXEMPT — dock-controls
  is an AU.W8b.3 carve, theme.css is the @theme bridge). Update the spec's "4 expected" count.
- **W25b** — SPLIT into tokens-now (independent §-seam partials, glass-specular-track.css →
  glass-material.css rename, floating-panel dead-chain excise — all unblocked) vs utilities-after
  (the ~190-line metric-badge block relocation is GATED on W29's §7/§8 metric-ownership decision +
  W06 dock split + the W21 A-1 twin-line capture). glass.css NOT carved (single cohesion axis).
  **W25b is the budget-fix precondition** (§2).
- **W26** — TS god-module split, by LEG. Unblocked: useMetaballRenderer (690) split, dock
  `syncDerived()`→`computed()`, keyboard reactive-collection, sidebar useSpring re-base. BLOCKED on
  W20: the GlassRenderer detector/filter split (W20 retires GlassPanel + its imperative filter).
  **FOLD the NEW W53 spillover: `SegmentedTabs.vue` (683) is a god-module violator born AFTER the
  W26 spec — currently HOMELESS; W26 must absorb the variant-axis split or be amended to route it.**
  GlassDock (534) + constellationField (510) ride the dock band / W17, confirm not W26.
- **W27b** — LAST, large mechanical sweep. Generalize the gate to a full src/+scripts/+demo/stories
  walk; one-time scrub the ~1017 src/ refs + ~599 scripts/ refs (DELETE landed-at-X notes; REWRITE
  design-WHY tranche-letter-free); finalize the Card stale-prop shim; relocate scripts/ self-tests.
  Includes the `proof:story-language` 1-hit regression (`demo/stories/navigation/dock.vue:86` —
  a fresh `AX.W45` ref the W45 dock edit re-introduced AFTER W58 swept 49 SFCs green; the live proof
  the gate WORKS).
- **W28/W29 (speedtest)** — the chronic muster-block. W28 native-first receive (metric-cell/stack +
  instrument-chassis land in speedtest+muster), W29 the glass-ui prune (the InstrumentChassis retire
  — D12 pass-3 CONFIRMED "remove" — + instrument-rail/metric-pill orphans). HARD-sequenced:
  native-first BEFORE prune (inv-16' wire-before-retire). W29's metric-ownership decision GATES the
  W25b utilities-carve.

---

## §4 — Cross-repo consumer adoption (W34 / W35 / W41) — the publish-gated edges

The §16 zero-loss forcing-function + the prune-migration DAG + the glass-ui-OWNED supplier-edge.
None GREENs until the upstream library waves land AND the AX cut publishes.

- **W41 FIRST among the close band** (dependsOn only W00). The `build:watch` dts keystone is UNMET:
  `package.json "build:watch": "vite build --watch"` has NO `emit-types` arm (contrast `"build":
  "vite build && npm run emit-types"`). This is the ROOT CAUSE of value.js's stale-dist-typecheck
  class and violates contract-v2 invariant-30 (every `@mkbabb/*` publisher keeps `dist/` fresh
  INCLUDING dts via `build:watch`). Re-derive `build:watch` to run BOTH arms incrementally; author
  `proof:build-watch-dts` + `proof:peer-devdep-parity` (devDeps pin the FLOOR `keyframes ^2.2.0` /
  `value ^0.10.0` while peers declare wider — builds against a narrower set than claimed) + the
  keyframes export-stability check; register the UNTAGGED orphan `proof:peer-conformance` with
  ci/release tags. Declare the 2 AW.W27 supplier-edge debts (keyframes-4 stray `file:`-link breaks
  `npm ci`; E2 value-0.11 cap) as named `CONSTELLATION.md` handoffs. Land it EARLY so the cross-repo
  legs resolve against a fresh-dts publisher.
- **W34 the §16 receiver — `coordination/CONSTELLATION.md` is the WRONG artefact.** The present
  file is the NARROW W17 band-E handoff (W17→W30 slides token/warp seam), NOT the §16 receiver: the
  per-consumer HEAD/branch/`git status --porcelain` tree-cleanliness table for the 10 named repos +
  the §16.3 idiom census (value.js/speedtest/muster/fourier/words/bbnf-buddy/bbnf-playground
  adoption legs) is UN-transcribed. Re-author it as the TRUE receiver (the sibling-baseline-capture
  ritual) — **this ledger is the INPUT to W33's `proof:carry-closure`, so it precedes the close.**
  Fold the 2 inbound handoff notes (`from-keyframes-W8` = cosmetic-bump leg; `from-speedtest-AV` =
  routed-asks dispositions).
- **W35 the prune-migration DAG (BLOCKER) — and the HEADLINE divergence: the W19/W20 prune has NOT
  actually landed in glass-ui.** PROGRESS marks W19 "live-verified (DEVELOPED)" but at HEAD
  `header-ribbon/`, `glass-panel/`, `useTokenColor`, `glass-carousel` are STILL PRESENT and
  subpath-exported (the c72d2ac "W19 prunes" commit only removed disco-glyph + glyph-face). **W19's
  "DEVELOPED" status is OVER-CLAIMED — a status-inflation the W33 close-honesty checklist MUST
  catch** (the cardinal-lesson class at the status level). The DAG: W19/W20 (glass-ui excision)
  cannot PUBLISH until the kf legs (`proof:off-headerribbon` + `proof:off-glasspanel`) GREEN
  consumer-side. glass-ui finishes the excision → authors the kf migration annexes → kf session
  migrates EditorShell + EasingCurveCanvas → THEN the prune publishes. The dock-spring consume-leg
  is a bump-and-verify, NOT a re-fix (the published `(0.32,0.7)` curve is the shipped-correct
  oracle). Reconcile the kf-note contradiction (`from-keyframes-W8` says kf on ~3.5.1 / dock-spring
  CLOSED; the W35 wave doc RED-3 measures the `^3.4.0` pin at +16.3% — the note is the more recent
  live grounding).

---

## §5 — The overfitting audit (this lane's intersection)

The R-overfitting cross-lane inventory is the input to Leg D. The single strongest orphaned-FOLD
item the deferred sweep surfaces is **AT-#8 GlassNativeDrawer** (≥2 firm: muster
`MobileInstrumentSheet` + speedtest mobile sheet; retires a real vaul-vue `activeSnapPoint`
re-snap bug) — it has NO AX receiver wave at HEAD. Recommendation: FOLD — route to W20/W21 or mint
a thin native-drawer wave. The PARTIAL fold to verify at close: **AT-#3 DataTable vueuse-free-root**
— the `data-table` root re-export is present (`src/index.ts:88`) + `proof:vueuse-free-root` shipped;
W33 must VERIFY the gate actually proves the root vueuse-free with that line (else it is mis-scoped
— a green-over-leak, a cardinal-lesson candidate at the gate level). The BOOK set (1-consumer
W-ASKS #13/#14/#15/#19, Baseline-gated pilots, divergence-gated convergence-watches) must NOT be
over-folded — the ≥2-consumer bar forbids shipping substrate-without-consumer.

---

## §6 — The next publish cut (3.9.0?)

**The W33 wave doc still names the AX cut "3.8.0" — but 3.8.0 is ALREADY PUBLISHED** (npm latest ==
3.8.0; it shipped the AX dock+aurora+font+spring core BEFORE the convergence-1/2 waves). So the cut
labeled "3.8.0" in the W33 doc is **STALE** — the convergence work (W44-W59 + the structural/cross-
repo close) is a NET-NEW minor that publishes as a **NEXT cut, almost certainly 3.9.0** (the
convergence is additive feature work — region-model dock, unified tabs, liquid-glass material,
squircle tokens, slider redesign — a MINOR bump, not a patch). The `proof:ax-final`
STAGED-NOT-PUBLISHED assertion + `proof:prod-validation` `npm view ==` literal + the changeset
target version must ALL be reconciled from "3.8.0" → **3.9.0** before the close runs. This is a
GAP the W33 doc has not yet absorbed — it was authored when 3.8.0 was the AX cut, before the
convergence rounds re-baselined the published line. (Confirm with the user / the orchestrator
whether 3.9.0 or a 4.0.0 is intended — the squircle/glass-first-class IDENTITY evolution + the W19
prune clean-break + the W29 chassis-retire are arguably a MAJOR; the presets-in-consumers precept
permits the lib's own identity tokens to evolve, but the consumer-facing surface DELETIONS
header-ribbon/glass-panel/instrument-chassis are a breaking change → 4.0.0 is defensible. This is a
NEEDS-USER-DECISION — see R-needs-user-decision.)

The publish DAG (sequential, per §0b EXECUTION MANDATE): glass-ui publish (changeset → `v*` tag →
`release.yml` OIDC provenance — pre-authorized, the 3.6.0/3.7.0/3.8.0 proof) → consumer bumps
(W34/W35 legs green ONLY on the published bump) → slides deploy (merge-to-main → `deploy-pages.yml`)
→ prod-validation (`npm view == <cut>` + `slides.friday.institute` HTTP-200 + content-marker +
pptx-200). FINAL closes `complete_with_misses` if any leg unmet.

---

## §7 — DEFERRED items that must FOLD INTO this tranche (this lane)

- **The `proof:gate-script-parity` 5-orphan + 2-dangling baseline allowlist** → W33's strict
  `proof:gate-fleet-registered` RETIRES it (drive to literal zero).
- **The verify-ci 20-gate drift** → the π-gate-in-CI infra decision (W33/band-close).
- **The broken AU→AV→AX close-gate lineage** (`au-final` note → nonexistent `av-final`) → W33
  authors `ax-final` + reconciles.
- **The 2 AW.W27 orphan supplier-edge debts** (keyframes-4 `file:`-link, E2 value-0.11 cap) → W41
  declares as named `CONSTELLATION.md` handoffs.
- **inv-26 ADOPTION-ASKS hub** (AU-W0 never authored it) → W33 reconciles the speedtest DDR-AS-RC
  bundle (DockIconButton coarse floor, MetricBadge icon, CompletionSeal/GoldHeadline/CheckDraw,
  ContinuousTimeline check-centring + marker-opt-out, LabeledField for/id) landed-or-still-open.
- **SegmentedTabs.vue (683) god-module** → W26 (homeless W53 spillover; the strongest unowned
  structural FOLD).
- **GlassNativeDrawer (AT-#8, ≥2 firm)** → W20/W21 or a thin native-drawer wave (the strongest
  unowned consumer FOLD).
- **The KEEP-BOOK ledger + standing USER-DOMAIN carries** → W33 transcribes into FINAL as
  WATCH-with-trigger.
- **The cut-version reconcile 3.8.0→3.9.0(?/4.0.0)** → W33 changeset + ax-final/prod-validation.

---

## §8 — GAPS / plan divergences (this lane)

1. **W19/W20 PRUNE INCOMPLETE in glass-ui** (the headline status-inflation). PROGRESS marks W19
   "live-verified (DEVELOPED)" but header-ribbon + glass-panel + useTokenColor + glass-carousel are
   STILL in the tree and exported. W35's precondition (the prune lands) is NOT met — the close
   cannot land the W19/W20 publish until BOTH the glass-ui excision AND the kf migration green.
2. **The cut version "3.8.0" in the W33 doc is STALE** (already published). The convergence is a
   new minor (3.9.0) or possibly a major (4.0.0 — breaking consumer-surface deletions). The W33
   STAGED-NOT-PUBLISHED + prod-validation literals are un-reconciled. NEEDS-USER-DECISION.
3. **W34 `CONSTELLATION.md` is the wrong artefact** (the narrow W17 band-E handoff, not the §16
   per-consumer receiver). The §16.3 idiom census is un-transcribed — and it is the INPUT to W33's
   carry-closure gate.
4. **The gate-tag MODEL decision (W27a + W25a shared first act) is UNMADE** — the band's true
   critical-path head, blocked only by W00 (`complete`). Nothing prevents starting it.
5. **W33 is the terminal node of a DAG most of whose interior is unbuilt** (~half the waves still
   `planned`: W06/W14/W18/W20/W21/W25-W29/W36/W38/W39/W40/W41-W43 + convergence W46-W51/W54/W55).
   The close is correctly LAST — but this lane's completion is bounded by the entire tranche's.
6. **`verify-ci` is fail-OPEN** (exits 0 on drift) — W33 makes it fail-CLOSED, else drift recurs
   silently (the AW-close-that-never-ran class).
7. **`profile:budget` rebaseline ORDER risk** — must rebaseline AFTER W25b/W19 trims, never before
   (a rebaseline to the un-trimmed number would bless the bloat). The trims are still owed.

---

## §9 — The gestalt PATH FORWARD (planning, not code)

This lane is the TERMINAL DAG node + its publish-gated cross-repo siblings. The correct close order:

1. **W27a FIRST** (the band head; dependsOn only W00) — the gate-tag MODEL decision (at-LEAST-ci, 2
   named legacy-gate exceptions), re-tag fail-explicit + no-legacy-commentary, author
   `proof:tag-parity` + `proof:no-dead-arbitrary`, scrub the ui/ barrel refs. Unblocks W25a + the
   whole close-band tag model.
2. **W41 EARLY** (dependsOn only W00) — the `build:watch` dts keystone + peer-parity + supplier-edge
   gates; land it so the cross-repo legs resolve against a fresh-dts publisher.
3. **The structural cohort** — W25a (CSS gate-extension + dist `@source` re-point, born-RED on 6),
   W25b tokens-now portion + W19 CSS prune (the budget-fix preconditions), W26 by leg (FOLD the
   SegmentedTabs split), W27b LAST (the large mechanical full-tree sweep). W28/W29 native-first →
   prune (the W29 metric-ownership decision gates W25b utilities-carve).
4. **W34 the §16 receiver** — re-author `CONSTELLATION.md` as the per-consumer ledger; transcribe
   the §16.3 census; fold the 2 inbound notes. The INPUT to W33's carry-closure.
5. **W35 + the W19/W20 prune publish** — finish the glass-ui excision (currently INCOMPLETE), author
   the kf migration annexes, kf session greens off-headerribbon/off-glasspanel, THEN publish.
6. **W39 LAST library-side** (dependsOn W18/W22/W38/W40 — the FINAL surface) — run the harness,
   RATIFY the substrate-tier floors against `measured − margin`, register `["local","ci"]`.
7. **W33 the TERMINAL close** — register the late-wave fleet against W27a's at-LEAST-ci model, drive
   orphans → 0, fix the ci.yml drift (fail-CLOSED + the π-gate-in-CI decision), author
   `proof:ax-final` + `proof:carry-closure` + `proof:prod-validation`, sweep the 4 READMEs against
   LIVE π captures, the inheritance cross-walk (§11/§13/§14), the overfitting audit + spot-verify,
   the ι-sweep + precepts pin re-sync, **rebaseline `profile:budget` AFTER the trims**, reconcile
   the cut version (3.8.0→3.9.0/4.0.0), FINAL.md + PROGRESS.md, the §21 end-state (publish → slides
   deploy → prod-validate). Close `complete_with_misses` if any leg unmet — NEVER `complete` on
   headless-green.

**Cardinal-lesson discipline (binds this lane):** every README figure is a LIVE π-lane capture
post-dating the substrate-repair waves; FINAL reconciles the LIVE-audited state of every visual
wave, NEVER `complete` on a headless-green fleet. The phantom-owner re-defer anti-pattern is NAMED
in FINAL. The publish-currency findings (Card specular / VT swallow / useGlobalDark / deriveAurora)
are recorded as a PUBLISH HINGE, NOT re-routed as code defects to re-fix.
