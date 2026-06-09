# AX Inventory — W-close-crossrepo (Close + cross-repo band)

**Lane:** W33 (close — gate fleet, ci.yml drift, overfitting, FINAL), W34 (cross-constellation
idiom + consumer-adoption), W35 (keyframes prune migration DAG), W41 (publisher cross-repo
supplier-edge), W39 (lighthouse). The publish-gated edges.

**Inventory base:** `at-dock-convergence @ 88a2ec5` (HEAD moved past the dispatch's `c72d2ac` —
W45 dock band landed at `56db9e0`/`88a2ec5` since). Version `3.8.0`. Read-only; no edits.

**Cardinal frame:** every wave in this lane is a CLOSE / cross-repo PUBLISH-gated edge. None can
GREEN until the upstream library waves land AND the AX cut publishes. This lane is the terminal
DAG node (W33 dependsOn W00…W42) plus its cross-repo siblings. The dominant finding: **the close
machinery is entirely UN-STARTED at the implementation level** — every wave doc is authored
(planning artefacts present) but ZERO close gate, ZERO FINAL.md, ZERO lighthouse harness, ZERO
W41 supplier-edge gate exists, and the W34 §16 receiver doc is only a narrow band-E stub.

---

## Status table — W33 / W34 / W35 / W41 / W39

| Wave | Charter status | Reality at HEAD | Verdict |
|---|---|---|---|
| **W33** close | planned | wave doc authored; `proof:ax-final` ABSENT, FINAL.md ABSENT, gate-fleet partially registered (11 orphans), ci.yml drift live (20 gates missing), no inheritance cross-walk, no carry-closure gate, no overfitting audit run | **NOT-STARTED (impl)** |
| **W34** cross-repo | planned | wave doc authored; `CONSTELLATION.md` present but it is the NARROW band-E (W17→W30) handoff, NOT the §16 receiver (no per-consumer HEAD/branch/tree-cleanliness for the 10 repos); 2 inbound handoff notes filed | **PARTIAL (stub)** |
| **W35** kf prune DAG | planned | wave doc authored; born-RED witnesses HOLD (header-ribbon + glass-panel STILL in glass-ui tree, still subpath-exported; kf still imports them); cross-repo gates absent both sides | **NOT-STARTED + BLOCKED on W19/W20** |
| **W41** supplier-edge | planned | wave doc authored; `build:watch` STILL JS-only (keystone UNMET); `proof:build-watch-dts`/`proof:peer-devdep-parity` ABSENT; `proof:peer-conformance` exists but UNTAGGED orphan | **NOT-STARTED (impl)** |
| **W39** lighthouse | planned | wave doc authored; no `scripts/lighthouse-demo.mjs`, no budget JSON, no `proof:lighthouse-demo`; constellation-wide ZERO executed Lighthouse | **NOT-STARTED (impl)** + **gated on W18/W22/W38/W40** |

---

## W33 — Close (gate fleet · ci.yml drift · overfitting · inheritance · FINAL)

The terminal wave. `dependsOn AX.W00…AX.W32 + AX.W34…AX.W42` (ENUMERATED, deliberately not "ALL"
— the antidote to the AW.W33 renumber-drift). Born-RED on 6 falsifiable witnesses; all 6 RE-CONFIRMED
RED at current HEAD.

### Live-confirmed RED witnesses (re-measured 2026-06-08 @ 88a2ec5)

1. **`proof:ax-final` does NOT exist.** `ls scripts/proof-ax-final.mjs` → absent; `grep ax-final
   package.json` → 0. No `FINAL.md`, no aggregate close gate. **Naming-lineage snag:** `gates.mjs`
   `proof:au-final` (line 360) is RETIRED-from-release with a note saying *"AV is the successor
   tranche (proof:av-final is its close gate)"* — but `proof:av-final` ALSO does not exist, and the
   W33 wave doc names `proof:ax-final`. The AU→AV→AX close-gate lineage is broken; W33 must author
   `proof:ax-final` and reconcile the dangling `av-final` reference in the `au-final` note.
2. **proof-script↔manifest meta-gate RED — 11 orphan scripts at HEAD** (the doc said 12; one,
   `proof:deck-progress-rail`, has since been registered by W24). Current orphans:
   `proof:affordance-contrast`, `proof:composable-return-types`, `proof:consumers-static`,
   `proof:datatable-split`, `proof:dock-big-dock`, `proof:dock-controls-split`,
   `proof:frostshader-deleted`, `proof:glass-panel-tiers`, `proof:resolution-contract`,
   `proof:supports-post-task-wired`, `proof:theme-style`. **NOTE the gate-tier subtlety:** the
   EXISTING `proof:gate-script-parity` (W00) PASSES because it carries a 5-orphan + 2-dangling
   *baseline allowlist* (AW fleet, "owner-owed"). W33's `proof:gate-fleet-registered` is the
   STRICTER bar — it drives orphans to literal ZERO, retiring the baseline. These 11 are mostly
   AW-era hand-registered debris owed to close.
3. **`proof:no-retired-survivor` (W21-authored) — SCRIPT ABSENT + UNREGISTERED.** `ls
   scripts/proof-no-retired-survivor.mjs` → absent; `grep` package.json + gates.mjs → 0. W21 has
   not landed its script yet; W33 cannot register what does not exist (dependsOn coupling).
4. **The four READMEs carry planned→landed lies + stale defaults.** (Not re-verified line-by-line
   this pass; the wave doc cites aurora/README:312 linear-sRGB lie, goo-blob smoothK 0.28/0.22 vs
   types.ts 0.12, the defineExpose pause/resume table mismatch.) The READMEs exist at
   `src/components/custom/{aurora,goo-blob,dock,constellation}/README.md`.
5. **No inheritance-ledger cross-walk.** `ls docs/tranches/AX/archive/` → absent. §11/§13/§14
   REQUIREMENTS items are prose with no ADDRESSED/RETIRES/ARCHIVES disposition. P-inv-28
   zero-deferral close unmet.
6. **No carry-closure gate (bbnf BD-G7 form).** No `proof:carry-closure`; deferrals tracked as
   prose. Reads W34's `{receiver-wave, close-gate}` ledger as input — which W34 has not authored.

### The ci.yml drift (the named W33 / band-close task — LIVE, MEASURED)

`npm run gates:verify-ci` reports **20 ci-tagged gates MISSING from `.github/workflows/ci.yml`**
(it currently exits 0 — a fail-OPEN report, NOT yet a fail-closed gate):
`proof:dock-region-model`, `proof:aurora-painterly-statistics`,
`proof:aurora-noise-hash-equivalence`, `proof:demo-radial-calm`,
`proof:constellation-substrate-single`, `proof:canvas2d-substrate`,
`proof:resolve-canvas-color`, `proof:text-highlight`, `proof:constellation-field`,
`proof:input-invalid-aria`, `proof:styling-hygiene`, `proof:liquid-glass-material`,
`proof:tabs-unified`, `proof:dock-orchestrator-single`, `proof:dock-hold-contract`,
`proof:dock-wrap-content-driven`, `proof:slider-two-only`, `proof:carousel-glass-atoms`,
`proof:deck-progress-rail`, `proof:squircle-language`.

This is the convergence-plan's flagged **"verify-ci RED — π-gate-in-CI infra decision"** task.
The decision the close must make: give the π/device gates a device-free CI arm OR re-tag them
local-only. Most of the 20 are NOT π-lane (they are dock/tabs/canvas/styling static gates that
SHOULD be in ci.yml) — so the bulk is plain registration drift, with a smaller π-gate-CI-feasibility
sub-decision (canvas2d-substrate, painterly-statistics, demo-radial-calm need a headless device).

### W33 path forward (gestalt)

- Register the late-wave AX gate fleet in `gates.mjs` against **W27a's at-LEAST-ci tag model**
  (W27a authors the model + tag-parity probe + the 2-legacy-gate `['local','ci','release']`
  exception; W33 appends the rest — DISJOINT by phase, coordinate the gate-array region).
- Drive the 11 orphans → 0 (author `proof-gate-fleet-registered.mjs` — the strict meta-gate,
  retiring the baseline allowlist).
- Fix the ci.yml drift: re-tag or add-to-ci every drifted gate; make `gates:verify-ci` fail-CLOSED.
- Author `proof:ax-final` (modeled on `proof-au-final.mjs`; 8 assertions: FINAL-EXISTS /
  GATE-FLEET-REGISTERED / PRIOR-CLOSE-META-ASSERT / ZERO-ORPHANS / INHERITANCE-LEDGER-CLOSED /
  CARRY-CLOSURE / CLEAN-TREE / STAGED-NOT-PUBLISHED). Release-only, NOT ci.
- Author `proof:carry-closure` (reads W34's ledger) + `proof:prod-validation` (npm view == 3.8.0
  + slides.friday.institute HTTP-200 + AX-deck content marker + pptx-200).
- Sweep the 4 READMEs planned→landed AND re-audit against LIVE π-lane captures post-dating the
  substrate-repair waves (W07/W08/W15/W16/W17) — the README figures BECOME the π captures.
- Inheritance-ledger cross-walk (§11/§13/§14 → ADDRESSED/RETIRES/ARCHIVES; write
  `archive/<item>.md` per archived item). Run the overfitting audit + spot-verification.
- ι integrity-sweep (`audit-stash-list.mjs` + reflog + `git log -- docs/precepts/`), precepts-pin
  re-sync (RATIFY-BEFORE-IMPL, real commit only — the gitStatus shows `m docs/precepts` dirty).
- Write FINAL.md + PROGRESS.md; reconcile the §21 end-state (publish + slides deploy); close
  `complete_with_misses` if any leg unmet (NEVER `complete` on headless-green).

---

## W34 — Cross-constellation idiom + consumer-adoption ledger (§16 receiver)

The §16 zero-loss forcing-function HUB. Separate-repo / tracked / tranche-development-only —
glass-ui writes NO sibling source; it authors annexes, the sibling sessions execute the legs.

### Reality

- **`coordination/CONSTELLATION.md` EXISTS but is the WRONG artefact.** The present file is the
  W17 constellation band-E handoff (W17→W30/W31 slides adoption — token/warp seam landing). It is
  NOT the §16 receiver the W34 charter mandates: a per-consumer ledger declaring each of the 10
  named repos' HEAD + branch + `git status --porcelain` tree-cleanliness at coordination time, the
  shared write surfaces, the writer-vs-reader boundaries, and the conflict-resolution protocol
  (the bbnf sibling-baseline-capture ritual). The §16.3 per-consumer idiom census (value.js /
  speedtest / muster / fourier / words / bbnf-buddy / bbnf-playground adoption legs) is NOT authored.
- **Two inbound handoff notes are already filed** under `coordination/`:
  `from-keyframes-W8-specular-consume-edge.md` (kf is on ~3.5.1, fully green, NOT blocked — the
  3.8.0 bump is COSMETIC for it; kf's W34 leg is a tidy-up, no urgency) and
  `from-speedtest-AV-routed-asks.md` (routes `.ready` swallow on useViewTransition, `demandPark`,
  CompletionSeal, 3 a11y asks → fold into W39/W21; R-CONSUME 3.6→3.8 bump publish-gated).
- The per-consumer adoption ledger is fully SPEC'd in the charter §3 W34 block (each leg enumerated
  per repo) but not yet TRANSCRIBED into a `CONSTELLATION.md` receiver table.

### W34 path forward (gestalt)

- Re-author `coordination/CONSTELLATION.md` as the TRUE §16 receiver: the per-consumer
  HEAD/branch/tree-cleanliness table (10 repos, sibling-baseline-capture ritual) + the §16.3 idiom
  census with every consumer leg routed to a `{receiver-wave, close-gate}` (this ledger is the
  INPUT to W33's `proof:carry-closure`). Keep the existing W17 band-E handoff as a §-section, not
  the whole file.
- Fold the 2 inbound handoff notes into the receiver (kf = cosmetic-bump leg; speedtest = the
  routed-asks dispositions).
- The §16.4 zero-loss mandate binds: every harvested item closes in a wave OR carries an explicit
  `{receiver, close-gate}`. W34 is read-only / tranche-development — the legs DISPATCH from sibling
  sessions post-publish.
- **Watch carry:** the pane-slide directional-Transition vocabulary (speedtest hand-rolls it) is a
  ≥2-consumer-gated promotion candidate (1 named consumer at HEAD — record as WATCH).

---

## W35 — keyframes-prune consumer-migration DAG (the BLOCKER edge)

**Severity blocker. dependsOn W00, W19, W20.** The native-first / migrate-before-prune DAG that
makes the W19/W20 prune publish-safe — the SAME class as W28→W29 (speedtest).

### Reality — the born-RED witnesses HOLD, AND the predecessor prune has NOT landed

- **W19/W20 prune has NOT actually landed in glass-ui** — this is the headline divergence. The
  PROGRESS table marks **W19 as "live-verified (DEVELOPED)"** but at HEAD:
  - `src/components/custom/header-ribbon/` is STILL PRESENT (HeaderRibbon.vue + index.ts + types.ts),
    still subpath-exported (`src/subpaths/header-ribbon.ts`, `package.json` `./header-ribbon` export).
  - `src/components/custom/glass-panel/` is STILL PRESENT (GlassPanel.vue + index.ts).
  - `useTokenColor` STILL PRESENT (`src/composables/dom/useTokenColor.ts`, exported).
  - `GlassCarouselPager` / glass-carousel STILL PRESENT (`src/components/ui/carousel/`).
  - The c72d2ac "W19 prunes" commit ONLY removed disco-glyph + glyph-face (gone from src). The
    header-ribbon / glass-panel / token-color / glass-carousel excisions did NOT happen. **W19's
    "DEVELOPED" status is OVER-CLAIMED** (the cardinal-lesson class: a DEVELOPED tag inflated past
    the real source state — flag for the close honesty checklist).
- **kf-side migration witnesses (from the W35 wave doc, live-confirmed against kf tree):**
  - W35 RED-1: `proof:off-headerribbon` absent on kf; `EditorShell.vue:99` still imports
    `@mkbabb/glass-ui/header-ribbon`, mounts `<HeaderRibbon position="right">` as the top chrome bar.
  - W35 RED-2: `proof:off-glasspanel` absent on kf; `EasingCurveCanvas.vue:107` still imports
    `@mkbabb/glass-ui/glass-panel`, mounts `<GlassPanel variant="wash">`.
  - W35 RED-3 (dock-spring consume): kf pinned `^3.4.0`, `proof:dock-morph-settled` RED at +16.3%;
    GREENs on the AX bump. Per `from-keyframes-W8` note, kf has since moved to ~3.5.1 and this leg
    CLOSES for real (the dock-spring retune is published) — reconcile the note vs the wave doc.
- The glass-ui-side `proof:repatriate-local` pattern gates are absent (`grep` → 0); these are the
  W28 model the kf gates mirror.

### W35 path forward (gestalt)

- **The DAG is real and HARD-sequenced:** W19/W20 (glass-ui prune) cannot PUBLISH until the kf legs
  (`proof:off-headerribbon` + `proof:off-glasspanel`) GREEN consumer-side. W19/W20 explicitly
  dependsOn this. glass-ui authors the migration annexes (in `CONSTELLATION.md`); the kf session
  migrates EditorShell → local chrome bar + EasingCurveCanvas → `<Card surface="glass">` /
  `.glass-material`; then glass-ui prunes + publishes.
- **Blocker for THIS lane:** the prune itself (W19/W20) is incomplete in glass-ui — so W35's
  precondition is not met. The close cannot land the W19/W20 prune publish until BOTH (a) glass-ui
  finishes the excision AND (b) the kf migration greens. Surface this as a sequencing GAP.
- The dock-spring consume-leg is NOT a re-fix (§4 note 23 — the published `(0.32,0.7)` curve is the
  SHIPPED-CORRECT oracle); kf bumps + re-verifies, the W01 single-scalar morph COMPOSES with it.

---

## W41 — Publisher-side cross-repo build + supplier-edge hardening (glass-ui-OWNED, in-repo)

The ONLY genuinely-new CONVERGE wave (§4 note 22 — no prior wave homed these). In-repo
package.json/scripts edits, NOT a sibling annex.

### Reality — all 4 witnesses HOLD

1. **`build:watch` STILL JS-only — the keystone UNMET.** `package.json:533` `"build:watch": "vite
   build --watch"` has no `emit-types` arm (contrast `"build": "vite build && npm run emit-types"`).
   This is the ROOT CAUSE of value.js's stale-dist-typecheck class (the 75 TS7016 errors K.W2
   fought) and violates contract-v2 invariant-30 (every `@mkbabb/*` publisher keeps `dist/` fresh
   INCLUDING dts via `build:watch`). A LIBRARY-INTERNAL contract violation (fail-explicit class).
   `proof:build-watch-dts` ABSENT.
2. **devDep↔peer range drift.** devDeps pin `keyframes.js ^2.2.0` / `value.js ^0.10.0` (the floor)
   while peers declare `keyframes.js ^2.2.0||^3.0.0||^4.0.0` / `value.js ^0.10.0||^0.11.0` — builds
   against a NARROWER set than it claims to support. `proof:peer-devdep-parity` ABSENT.
3. **`proof:peer-conformance` is an UNTAGGED orphan.** Script + package.json entry EXIST
   (`scripts/proof-peer-conformance.mjs`, `package.json:552`) but NOT registered in `gates.mjs`
   with ci/release tags (it IS in the release SET via gatesFor but verify the gates.mjs row — grep
   `gates.mjs` for `peer-conformance`). The 2 AW.W27 supplier-edge debts dangle undeclared: (a)
   keyframes-4 ships a stray `@mkbabb/glass-ui: file:../glass-ui` dep that breaks `npm ci` (kf must
   cut 4.0.1 stripping it); (b) the E2 value-0.11 knot.
4. **No keyframes export-surface-stability check** — a peer-range bump can silently drop a
   downstream-relied API (the 3.6.0 `getTimingFunction` removal cascaded to bbnf-buddy).

### W41 path forward (gestalt)

- Re-derive `build:watch` to run BOTH arms incrementally — `vite build --watch` JS PLUS a co-running
  `emit-types --watch` (`vue-tsc --project tsconfig.build.json --watch --emitDeclarationOnly`, with
  flatten-subpath-types re-running on emit). Not a bolt-on — the structural contract-v2 satisfaction.
- Author `proof:build-watch-dts` (dts fresh after a watched src edit), `proof:peer-devdep-parity`
  (devDep floor within peer range), the export-stability check. Bump devDeps to a representative
  point in the peer range.
- Register `proof:peer-conformance` with ci/release tags (W27a tag model).
- Declare the keyframes-4 `file:`-link republish + the E2 value-cap as named handoffs in
  `CONSTELLATION.md` (born-RED until kf cuts 4.0.1 — sibling-session work).
- NO visual surface; structural/packaging. (Cross-refs MEMORY `project_glassui_340_published`
  "keyframes-4 publish bug" + `project_publish_ci_broken`.)

---

## W39 — Lighthouse perf/a11y route matrix (the dropped AW.W32)

**dependsOn W18, W22, W38, W40** — measures the FINAL AX-rebuilt surface, so it sequences LAST
among the close band (after IA + fonts + glass-atoms + dock-nav shell).

### Reality — all witnesses HOLD

- No `scripts/lighthouse-demo.mjs`, no `scripts/lighthouse-demo.budget.json`, no
  `proof:lighthouse-demo` (package.json + gates.mjs both empty on "lighthouse").
- Constellation-wide ZERO executed Lighthouse: AW.W32 (glass-ui arm) never ran; slides H.W11
  orchestrator-deferred and never run. No measured perf/a11y baseline at ANY layer.

### W39 path forward (gestalt)

- Author the harness (`lighthouse` + `chrome-launcher` as devDeps, NEVER peers): build lib → build
  demo → `vite preview` → drive Lighthouse over the manifest-derived route matrix (median of N runs,
  the speedtest W-RATCHET no-single-shot discipline) → per-page JSON → exit non-zero on breach.
- Substrate-aware TWO-TIER budget (`lighthouse-demo.budget.json`): static tier perf≥90/a11y≥95/
  CLS<0.1/LCP≤2.5s/TBT≤300ms; substrate tier (aurora/blob/constellation/glass-material) perf≥75/
  TBT≤600ms with an INLINE rationale. **RATIFY-BEFORE-IMPL:** run the harness FIRST to capture the
  real AX-surface baseline, set each floor at `measured − margin` (NOT a blind AW.W32 port). A
  substrate page that cannot meet 75 is a triumvirate-escalation (a perf regression, book to the
  band — NOT a budget tweak).
- Register `proof:lighthouse-demo` tagged `["local","ci"]` (ci because it needs headless Chrome;
  NOT release). Matches W27a at-LEAST-ci.
- Slides arm = NAMED close gate in `CONSTELLATION.md` (`proof:lighthouse-slides` receiver); the
  slides session executes — glass-ui does NOT run a slides preview from its tree.
- Folds the 3 speedtest a11y asks (Toaster/ToastClose name, FocusScope sentinel, ResponsiveTabs
  aria-label) per `from-speedtest-AV-routed-asks.md`.

---

## DEFERRED items that must FOLD INTO this tranche (this lane)

- **The 5-orphan + 2-dangling `proof:gate-script-parity` baseline allowlist** ("AW fleet,
  owner-owed") — W33's strict `proof:gate-fleet-registered` must RETIRE this baseline (drive to
  literal zero). The 11 current orphan proof scripts are owed to close.
- **The ci.yml drift (20 gates)** — convergence-plan flags it explicitly as the W33/band-close task
  needing the π-gate-in-CI infra decision.
- **The AU→AV→AX close-gate lineage** — `proof:au-final` note dangles a reference to a nonexistent
  `proof:av-final`; W33 authors `proof:ax-final` and reconciles the lineage.
- **The 2 AW.W27 orphan supplier-edge debts** (keyframes-4 `file:`-link, E2 value-0.11 cap) — W41
  declares them as named `CONSTELLATION.md` handoffs (they had no AX home before W41).
- **inv-26 ADOPTION-ASKS hub** (AU-W0 never authored it) — W33 reconciles the speedtest DDR-AS-RC-2/3
  bundle (DockIconButton coarse floor, MetricBadge icon, CompletionSeal/GoldHeadline/CheckDraw,
  ContinuousTimeline check-centring + marker-opt-out, LabeledField for/id) landed-or-still-open.
- **The KEEP-BOOK ledger** (text-box-trim, GlassNativeDrawer/`Drawer :native` ≥2-consumer ASK,
  anchor-positioning, role-typed Dock base) + the standing USER-DOMAIN carries (cred-consolidate
  gate, speedtest deploy freeze + ~550-commit unpushed delta, kf 3.0.0 baseline-drift) — W33
  transcribes into FINAL as WATCH-with-trigger carries.

---

## GAPS — unaddressed prompts / plan divergences

1. **W19/W20 PRUNE INCOMPLETE in glass-ui** (the headline gap for this lane). PROGRESS marks W19
   "live-verified (DEVELOPED)" but header-ribbon + glass-panel + useTokenColor + glass-carousel are
   STILL in the tree and exported. W35's precondition (the prune lands) is NOT met. The close cannot
   land the W19/W20 publish until BOTH the glass-ui excision AND the kf migration green. This is a
   status-inflation that the W33 close-honesty checklist must catch.
2. **W34 `CONSTELLATION.md` is the wrong artefact** — the present file is the narrow W17 band-E
   handoff, not the §16 receiver with the per-consumer HEAD/branch/tree-cleanliness table for the 10
   repos. The §16.3 idiom census is un-transcribed.
3. **kf note vs W35 wave doc contradiction** — `from-keyframes-W8` says kf is on ~3.5.1 / fully green
   / dock-spring CLOSED, while the W35 wave doc's RED-3 measures the `^3.4.0` pin at +16.3%. Reconcile
   (the note is the more recent live grounding; the wave doc baseline is `eaba94f`).
4. **No predecessor-gate-existence for W33's enumerated dependsOn** — W33 cannot be green until EVERY
   prior wave's gate is registered + green, but ~half the AX waves (W06/W14/W18/W20/W21/W25-W32/W36/
   W38/W40/W41-W43 + the convergence W44/W46-W51 + W54/W55) are still `planned`. W33 is the terminal
   node of a DAG most of whose interior is unbuilt. The close is correctly LAST — but this lane's
   completion is bounded by the entire tranche's completion.
5. **No FINAL.md / no PROGRESS.md authored by W33** (PROGRESS.md exists as the live status table but
   is NOT the W33-authored close artefact with per-wave green-run citations).
6. **ci.yml `verify-ci` is fail-OPEN** (exits 0 on drift) — W33 should make it fail-CLOSED, else the
   drift recurs silently (the same class as the AW close that never ran).

---

## The gestalt PATH FORWARD (this lane — planning, not code)

This lane is the TERMINAL DAG node + its publish-gated cross-repo siblings. The correct close order:

1. **W41 FIRST among the close band** (dependsOn only W00) — the `build:watch` dts keystone +
   peer-parity + supplier-edge gates are infra that EVERY consumer dev-resolves through; land it
   early so the cross-repo legs resolve against a fresh-dts publisher.
2. **W34 the §16 receiver** — re-author `CONSTELLATION.md` as the per-consumer ledger; transcribe
   the §16.3 census; fold the 2 inbound handoff notes. This is the INPUT to W33's carry-closure gate,
   so it precedes the close.
3. **W35 + the W19/W20 prune** — the HARD-sequenced DAG: finish the glass-ui excision
   (header-ribbon/glass-panel/token-color/glass-carousel — currently INCOMPLETE), author the kf
   migration annexes, the kf session greens `off-headerribbon`/`off-glasspanel`, THEN the prune
   publishes. The dock-spring consume-leg is a bump-and-verify, NOT a re-fix.
4. **W39 LAST library-side** (dependsOn W18/W22/W38/W40 — the FINAL surface). Run the harness to
   capture the real baseline, RATIFY the substrate-tier floors against `measured − margin`, register
   `["local","ci"]`. Slides arm = named annex, sibling-executed.
5. **W33 the TERMINAL close** — register the late-wave fleet against W27a's at-LEAST-ci model, drive
   the 11 orphans → 0, fix the ci.yml drift (fail-CLOSED), author `proof:ax-final` +
   `proof:carry-closure` + `proof:prod-validation`, sweep the 4 READMEs against LIVE π captures, the
   inheritance cross-walk (§11/§13/§14), the overfitting audit + spot-verify, the ι-sweep + precepts
   pin re-sync, FINAL.md + PROGRESS.md. Reconcile the §21 end-state (publish 3.8.0 → slides deploy →
   prod-validate). Close `complete_with_misses` if any leg unmet.

**Cardinal-lesson discipline (binds this lane):** every README figure is a LIVE π-lane capture
post-dating the substrate-repair waves; FINAL reconciles the LIVE-audited state of every visual wave,
NEVER `complete` on a headless-green fleet. The phantom-owner re-defer anti-pattern (a wave declares
itself "the home", ships the sliver, books the deep half to a next wave) is NAMED in FINAL so AX's own
waves cannot re-defer the aurora/blob/dock READMEs the AW way. The publish-currency findings (Card
specular / VT swallow / useGlobalDark / deriveAurora) are recorded as a PUBLISH HINGE, NOT re-routed
as code defects to re-fix.
