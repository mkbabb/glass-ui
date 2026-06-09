# R-path-synthesis — THE master synthesis: the convergent-optimum roadmap from c72d2ac → AX close

**Lane** R-path-synthesis (the single coherent path) · **Type** PLANNING ONLY (no code; the
orchestrator authors the plan from this) · **HEAD** `77c08c5` (3.8.0 published + conv-1 W44-W52 +
conv-2 W53-W59 + W45 dock band DEVELOPED + the pass-3 defect ledger) · **Date** 2026-06-08

> The dispatch named HEAD `c72d2ac`; the band has since advanced to `77c08c5` (W45 dock band landed
> `56db9e0`/`88a2ec5`; the pass-3 ledger `77c08c5`). This synthesis reads the LIVE HEAD, not the stale
> base. It consumes all 31 sibling inventory lanes (`inventory/*.md`) + the convergence ledgers + the
> three defect passes, and returns the ONE convergent path: the wave EXECUTION ORDER, the batching, the
> cardinal-lesson re-verify list, the publish cadence, the slides+constellation edges, and the
> deferred-fold. This is the gestalt path the orchestrator drives — no quick fixes, no workarounds,
> clean breaks, token-first, every wave closing on the LIVE product.

---

## 0 — The one-paragraph gestalt

AX is **routing-COMPLETE, execution-OPEN**. Two convergence rounds folded 17+ live defects into a clean
wave set; the foundational dock+graphics+spring+font+squircle+tabs core LANDED and (mostly) live-verified;
3.8.0 PUBLISHED (the one fully-closed end-state leg). What remains is a large EXECUTION backlog plus a
**soundness debt the cardinal lesson exists to catch**: PROGRESS marks waves `live-verified` that their
own JSONs record `live-pending`, and at least one wave (W19) is `DEVELOPED` over an INCOMPLETE source
prune. The convergent-optimum path is a **strict dependency DAG with three hard serializations** — the
glass-first-class ROOT (W54) unblocks the page-redesign band; the prune (W19/W20) cannot PUBLISH until
the consumer-migration legs green (W35); the chassis-retire cannot prune until the siblings RECEIVE native
(W28→W29). The path is: **discharge the soundness debt first (re-verify the suspect-completes + reconcile
PROGRESS↔JSON), then drive the foundational ROOT waves (W54 glass-first, W43 fourier pull-up, W42 morph
substrate), then the blocker re-opens (W46 blob, W48 glass-material, Q8 gate-pattern), then the page-redesign
umbrella, then the dock-content + IA + aurora/sizing/a11y cohorts, then the cross-repo+slides legs, then the
J/K encapsulation+repatriation, then W33 close**. Every wave closes on a captured live π audit, never
headless-green.

---

## 1 — The DAG: the five foundational tiers everything keys off

Before any execution order, fix the **foundational nodes** — the waves whose landing unblocks the most
downstream work. Get these wrong and the tranche thrashes. From the cross-lane synthesis:

| Tier | Foundational node | Unblocks | State |
|---|---|---|---|
| **F0** | **Soundness reconcile** (PROGRESS↔JSON + the re-verify list) | the trustworthiness of every `complete`/`live-verified` row | DEBT — not a wave, a close-discipline run owed NOW |
| **F1** | **W54 glass-first-class** (`--glass-level` + opaque escape, the ROOT default) | the entire pass-3 page-redesign umbrella (Q4/Q7/Q9), the glass-card-default | NOT-STARTED — pass-3 bumped TOP; research complete; **no wave doc** |
| **F1** | **W56 squircle** (the `--corner-k-*` axis) | W42 morph reads the band; the page-redesign corner language | DONE (live-verified) — the one landed F1 token axis |
| **F2** | **W42 liquid-morph substrate** (`useLiquidMorph`/`--morph-t`/`MorphGroup`) | the carousel Apple-pill (P5/W23b), any element-morph | NOT-STARTED — §18 directive; **second-consumer hinge STALE vs W53** |
| **F2** | **W43 fourier-field first-class** (intensity bundle + SOTA pull-up) | slides J.W2 fourier hero; the per-hero fourier background | NOT-STARTED — pass-3 PULL-UP "execute SOTA NOW" |
| **F3** | **W18 IA tree** (first-class `dock` category, blob-to-one, fourier seat) | W40 shell, W39 lighthouse, the page placement | NOT-STARTED — blocked on W06/W19/W20/W28/W29 demo-row legs |
| **F3** | **W51 `--ui-scale` umbrella** | W45 `--dock-scale` + W50 dropdown-scale reconcile onto ONE axis | NOT-STARTED + **UN-SPECCED** (no wave doc) |
| **F4** | **W28 native-first receive** (the `CONSTELLATION.md` keystone) | W29 chassis-prune, W34/W35/W41 extend the doc | NOT-STARTED — gated on the dirty-sibling wall |
| **F4** | **W41 `build:watch` dts keystone** | every consumer dev-resolves through it; the cross-repo legs | NOT-STARTED — `build:watch` STILL JS-only |

**The two structural keystones the whole cross-repo band hangs on:** `coordination/CONSTELLATION.md` (W28
OPENS it; W34/W35/W41 extend it — ABSENT at HEAD) and the `build:watch` dts arm (W41 — UNMET). Front-load
both: they are the doc/infra every later leg resolves against.

---

## 2 — The soundness debt (discharge FIRST — the cardinal lesson, institutional)

The headline finding across `S-cardinal`, `S-conv2`, `W-close-crossrepo`, `R-path-dock`, `R-path-glass`:
**the cardinal lesson was re-violated at the PROGRESS aggregation layer, twice over, and is being violated a
third time** by the convergence relabels. This is not new capability — it is honesty hygiene the orchestrator
owes before trusting any "done."

**2a. PROGRESS↔JSON status inflation (re-confirmed live).** Six conv waves read `live-verified (DEVELOPED)`
in PROGRESS while their JSONs say `dev-complete-headless-green-live-pending` / `handed-to-orchestrator`, and
**only W01 + W02 have a paired-π `DELTA.md`**. The W00 binding protocol (paired-π BEFORE/AFTER + DELTA, ≥2-3
viewports × light/dark, ≥5 frames, contrast-measured) is unsatisfied for W45/W52/W53/W56/W57/W59. A commit
message is not a captured live audit.

**2b. W19 source-state inflation (verified at HEAD this lane).** PROGRESS marks W19 `live-verified (DEVELOPED)`
but `header-ribbon/`, `glass-panel/`, `useTokenColor.ts` are STILL in the tree and exported — only `disco-glyph`
+ `glyph-face` were pruned. W19's F0 (header-ribbon excision) is an **orphaned deferral**: the wave doc claims
it, HEAD does not honor it, and it is W35-publish-gated (keyframes off HeaderRibbon first). This is the exact
no-silent-deferral risk the precepts forbid.

**2c. The suspect-complete re-verify list (binding before AX close):**
1. **BLOB (W15/W16 → W46)** — `complete` in PROGRESS, live-BROKEN (D4 over-bright, D5 hover lunges, D7 moods
   dead), W46 fix **un-started**. The single largest open live-truth gap.
2. **W52 liquid-glass (absorbs D11/W09)** — shipped at source, NEVER live-DELTA-verified; pass-3 **Q3 refutes
   the hover** ("only on CLICK is it visible") — a live-verified wave the next live pass contradicted.
3. **W53 SegmentedTabs (absorbs D3/W05)** — ran its π arm (glided/squished true), the trustworthy one; confirm
   T4 "two broken tab pages" are sound.
4. **W45 dock band (DK2 hover, DK8 rail, DK4 align, Q1 collapsed-pill)** — frame-count gate GREEN; the
   frontend-design judgments (hover reads, rail aligns) are GATE-GREEN but VISUAL-UNVERIFIED. Pass-3 Q1+Q3
   prove the magnitude TUNE is owed.
5. **W56 / W59 / W57** — each JSON self-declares the live arm owed (`cornerShape readback orchestrator-driven`,
   `handed-to-orchestrator`). Capture the DELTA each names.
6. **W23/P5 carousel** — contrast fixed (done), Apple-liquid-pill un-started (gated on W42).
7. **W17 constellation** — confirmatory read only (low risk).

**2d. The structural fix (W33 close gate, born-RED now).** Mint `proof:live-verified-ledger` (or fold into
`proof:carry-closure`): for every PROGRESS row tagged `complete`/`live-verified`, assert (a) the JSON `status`
is unconditionally complete OR a paired-π `DELTA.md` exists under `audit/`, and (b) the qualifier is carried
into the PROGRESS row. Born-RED against the six relabeled waves. This structurally prevents a fourth inflation.
Add an `audit/visual/` capture discipline (zero screenshots exist in the AX tree today).

**Discharge order for F0:** (1) reconcile the PROGRESS table to each JSON status (re-mark the six to
`live-pending` or back-fill their JSON + a DELTA); (2) strip the `AX.W45` comment from `dock.vue:86` →
`proof:story-language` GREEN (a RED gate at HEAD — blocking); (3) resolve W19 F0 (execute the in-repo
excision, gate publish on W35) so `DEVELOPED` is honest; (4) run one orchestrator MCP sweep over the named
routes + a DELTA per wave. These are hours, not waves — but they gate the trust of everything downstream.

---

## 3 — THE EXECUTION ORDER (foundational → dependent, the convergent-optimum sequence)

Batched per the user's cadence constraint (**ONE big workflow at a time** — concurrent 32-agent trips the
server throttle, learned repeatedly). Each batch ≤6 implementation agents (or ≤7 read-only); strict
serialization only where files collide. Every wave closes on a captured live π audit.

### Batch 0 — Soundness + RED-gate hygiene (NOW, hours not a wave)
- F0 (§2): PROGRESS↔JSON reconcile + the `proof:live-verified-ledger` close gate born-RED; the `dock.vue:86`
  one-line strip → `proof:story-language` GREEN; W19 F0 ownership resolved.
- The orchestrator MCP re-verify sweep over the suspect-completes (§2c) — capture the owed DELTAs.
- **Output:** every `complete`/`live-verified` row is either backed by a DELTA or demoted to `live-pending`.
  No execution proceeds on an inflated status.

### Batch 1 — The glass-first-class ROOT + the morph/fourier foundations (the pass-3 TOP precedence)
The single highest-leverage batch — it unblocks the page-redesign umbrella.
- **W54 glass-first-class** (F1, ROOT). RATIFY the glass boundary FIRST (Class-3 hinge R3 — recorded default:
  navigation/overlay glass-first + functional buttons/items glass + dock-selected glass; content stays opaque;
  do NOT self-ratify content-glass). Then mint `--glass-level` at the ONE `--glass-bg-*` `color-mix` seam +
  the `--glass-blur-*` radii (`level=1` byte-identical), the `opaque` tier rung (the clean collapse: rewrite
  the reduced-transparency/prefers-contrast brackets to set `--glass-level` instead of clobbering ten rungs),
  the two-layer-law canon doc, **fold the Q3 hover re-tune** (1.035 overshot DOWN — re-tune to perceptible-
  but-restrained on `--spring-smooth`), and `proof:glass-level` with a CONTENT-BAND-STAYS-OPAQUE assertion.
  dependsOn W52 (landed).
- **W43 fourier-field SOTA pull-up** (F2) — pass-3 PULL-UP: execute the SOTA research NOW (orchestrator-driven
  drive window), then the per-variant intensity bundle (`peakAlpha`/head-glow/`trailFadeExp`) + `intensity`
  prop, DELETE `OUTLINE_PEAK_ALPHA` (no alias), full citizenship (README/api/story/subpath). It lands as a
  first-class hero background (per-hero unique: aurora | constellation | fourier).
- **W42 liquid-morph substrate** (F2) — RE-EVALUATE the second-consumer hinge against the post-W53 reality
  FIRST (R7: W53 unified tabs onto its OWN `useTabIndicator` engine, so the tab-indicator may no longer be the
  natural second consumer). GO only iff the second consumer reads BETTER off the substrate. W01's `--dock-morph-t`
  is the first consumer; the carousel Apple-pill (P5) is the candidate second.
- **Coherence note:** these four glass-character axes (`--glass-level` W54, `--corner-k-*` W56, `--morph-t`
  W42, `--glass-backdrop-luma` W55-next) must cross-walk for ONE token grammar — schedule the coherence pass
  after W54/W55 author (R-path-glass §5).

### Batch 2 — The blocker re-opens (live-broken surfaces, the user's loudest)
- **W46 blob live-truth tune** (BLOCKER D4/D5/D7) — gate FLOORS→BANDS (so "louder" stops passing), lighting/
  pointer cohort DOWN to a calm wet bead, `excitedHoldMs`→manual-mood latch. The single largest un-started
  live-truth gap. Close on a paired-π DELTA over goo-blob + blob-mood (light/dark, hover centroid).
- **W48 glass-material demo reauthor** (BLOCKER D8/P9) — ZERO library edits; rewire the SFC to the shipped
  seams (`useSpecularTracking` + `specularStyle`/`@pointermove`, non-zero `--glass-tint-strength`, `.glass-card`
  + real glass `Button`). The new `proof:glass-material-demo` is the demo-route falsifier. SEQUENCE-AFTER W18
  (W18 may relocate the SFC) — but it is a BLOCKER, so if W18 slips, run it on the current page and re-home later.
- **W44 dark-mode semantic-token contrast** (D10) — token-first lift dark `--destructive` to ≥4.6:1, both arms
  in lockstep, new `proof:dark-semantic-contrast`. Sequenced BEFORE W39 (W39's dark a11y arm measures it).
- **Q8 gate-pattern demo fix** (BLOCKER) — `/compositions/gate-pattern` literally locks the user out. A demo
  fix, route to the page-redesign / demo cohort but treat as a blocker (a broken demo page).

### Batch 3 — The dock band finish (W45 TUNE → W06 → dock-unify-root)
Strictly serial on the shared dock files (`dock.css`/`GlassDock.vue`/`dock-controls.css`).
- **W45 live-truth TUNE** — the paired-π DELTA at ≥2 viewports × light/dark + the magnitude tunes the live
  audit surfaces: **Q1 (collapsed pill size)** + **Q3/DK2 (hover reads on HOVER, not just active — pin a
  near-critical curve, NOT `--spring-dock`)** + the DK3 page-flow RATIFY. Re-mark W45 `live-pending` until close.
- **W06 carve + honesty + showcase** — DELETE `foundations/dock-active-tokens.vue` (debris still shipping);
  ONE dock home; type-narrow `variant="rail"` (DK9 — RATIFY A vs B); carve `dock.css` (1639 lines → partials,
  AS the SETTLED W45 model — carve-last is load-bearing); the morph/animation/layer SHOWCASE + vertical-vs-rail
  contrast section. **AMEND the W06 spec FIRST** (GAP-4: it predates D14 and its RATIFY-#1 contradicts the W18
  first-class `dock` category).
- **dock-unify-root** (pass-3 net-new W45-follow) — "all docks same root: home-LEFT, navs, dividers" + Q1
  collapsed-pill sizing finalize. The demand-side adoption of W45's `#persistent` region. Likely a W45b/W06 fold.

### Batch 4 — The page-redesign umbrella (NET-NEW wave — blocked on W54)
The pass-3 headline that supersedes the "glass is opt-in" posture. Subsumes/extends W18+W40+W57+W58. Author
the NET-NEW **page-redesign / demo-IA-hierarchy** wave: every story page in a glass card (Q4/Q7/Q9) with
paper/grid/aurora/constellation/fourier backgrounds + proper hierarchy + the speedtest-grid idiom (P8) + the
StorySection migration (P10-structural half). Each hero card GLASSY over a full-page unique background (P7/Q9).
Folds Q5 (motion-page union) + Q6 (broken motion section + background) + Q2 (aurora preview black-bar).
dependsOn **W54** (the glass-card default) + **W55** (legible glass over light heros).

### Batch 5 — The IA spine + demo-shell (W18 → W40)
- **W18 IA tree** — first-class `dock` category, dissolve `tools`, split `primitives` Forms/Display, blob trio
  → ONE `substrates/blob` (D6), add `substrates/fourier-field` (the W43 seat), register
  `proof:storybook-complete`, re-baseline `EXPECTED_TREE` LAST. **Fold the P8 grid + P10-migration augment
  clauses into the spec FIRST.** dependsOn W06 + the prune-wave demo-row legs (W19/W20/W28/W29).
- **W40 demo-shell** — rebuild SidebarDock/BottomDock on the AX-rebuilt GlassDock over the reinvented tree;
  promote the runtime falsifier from fail-open SKIP to fail-CLOSED; re-scope+register the five coherence gates.
  D9 (red-underline subtle/none). dependsOn W18.
- **Re-verify W57** at W18 close (the four Aurora heros may move; re-home if so — W57 ran BEFORE W18, a
  sequencing violation flagged in W-demo-ia).

### Batch 6 — The aurora/sizing/a11y cohorts (parallel-ish, file-disjoint)
- **Aurora**: W38 configurator reauthor (D1 non-idiomatic chrome + pass-3 "faster/springy"; the native selects
  → `LabeledSelect`/`LabeledSlider`/`ConfiguratorLayer`; R2 ColorSwatch RATIFY default KEEP-NATIVE), W47
  preset-roster (D2 name van-Gogh, Q2 black-bar thumbnail), W14 WebGPU painterly parity-or-EXCISE (R9 default
  EXCISE). W38 SEQUENCE-AFTER W18 (SFC relocate race).
- **Sizing**: **AUTHOR W51 FIRST** (it has NO wave doc — the D18 `--ui-scale` umbrella; RATIFY whether it
  re-anchors the already-landed `--dock-scale` or vice versa), then W50 dropdown type-scale re-anchors as a
  one-line derivation, then W45's `--dock-scale` reconciles. ONE scale system, three specializations.
- **a11y**: W55 adaptive-glass (G2 — `--glass-backdrop-luma` via `@container style()`, thread the dock seam;
  do NOT fold into W36), W36 forced-colors skin (coordinate the opaque a11y path with W54/W55 — ONE opaque
  path serves all three), W44 already in Batch 2.

### Batch 7 — Cross-repo + slides legs (the §0b end-state leg-2 + leg-3 preconditions)
- **W41 FIRST** (dependsOn only W00) — the `build:watch` dts keystone + peer-parity + supplier-edge gates;
  infra every consumer dev-resolves through.
- **W34** the §16 receiver — re-author `CONSTELLATION.md` as the per-consumer HEAD/branch/tree-cleanliness
  ledger (10 repos, sibling-baseline-capture ritual) + the idiom census; fold the 2 inbound handoff notes. The
  INPUT to W33's carry-closure gate.
- **W28→W29 chassis-retire DAG** — W21 FIRST (un-retired MIGRATION.md truth + `proof:no-retired-survivor` +
  `/metric-pill` subpath) → W28 R-clean gate-0 (the orchestrator lands BOTH siblings on clean trees — the
  chronic dirty-sibling wall, the single highest-risk dependency) → W28 R0 receive (sibling-executed annexes)
  ‖ W29 orphan-prune half (instrument-rail + metric-pill, zero consumers, PARALLEL — pull forward) → W29
  repatriate-prune half (behind W28 GREEN). Chassis-retire is CONFIRMED (pass-3 "REMOVE, yes").
- **W35 prune-migration DAG** — finish the glass-ui W19/W20 excision (header-ribbon/glass-panel/token-color/
  glass-carousel — INCOMPLETE at HEAD), author the kf migration annexes, the kf session greens
  `off-headerribbon`/`off-glasspanel`, THEN the prune publishes. The dock-spring leg is bump-and-verify, NOT
  a re-fix.
- **W30-W32 slides** — RE-GROUND against post-I HEAD (W30/W31 ~70% already-shipped by slides H/I). The genuine
  remaining: W32 `reveal.ts`/`useCountup.ts`→`vReveal`/`useCountup` swap + LabeledField error pattern + the
  W30 constellation `light-dark(` residual. **+ the K-branch re-seed** (the user flagged slides specifically:
  the 5/6/7 single-close redesign stranded on a stale 11-slide base — re-seed onto live `main`, then execute).
  The slides J fourier-intensity consume is cross-repo coupled to W43.

### Batch 8 — Encapsulation J-band (born-RED, the §11 sweep)
- **W25a/W25b** CSS god-module gate + carves (tokens/utilities/floating-panel; glass.css NOT carved — single
  cohesion axis). **W25b MUST land BEFORE the profile:budget rebaseline** (the CSS trims bring the real number
  down — rebaseline at the trimmed truth, not the lifted ceiling).
- **W26** TS god-module splits — useMetaballRenderer (690), GlassDock (534, grew under W45), constellationField
  (510), **+ the NEW SegmentedTabs.vue (683) W53 spillover — assign it an owner (split the variant bodies onto
  the shared `useTabIndicator`)**.
- **W27a** legacy gate-hardening (barrel scrub, tag-parity, var-in-arbitrary guard) + **W27b** legacy commentary
  full-tree sweep (generalize the gate to demo/stories too — the place the W45 regression leaked).

### Batch 9 — W39 lighthouse, then W33 the TERMINAL close
- **W39 lighthouse** LAST library-side (dependsOn W18/W22/W38/W40 — the FINAL surface). RATIFY the substrate-tier
  floors against `measured − margin`, register `["local","ci"]`.
- **W33 close** — the π-gate-in-CI infra decision (the keystone of the 20-gate `verify-ci` drift — split-tag,
  NOT bulk-add); drive the 11 orphans → 0; author `proof:ax-final` + `proof:carry-closure` + `proof:prod-validation`
  + the `proof:live-verified-ledger` (§2d); profile:budget rebaseline (AFTER W25b); the 4 research-backed READMEs
  (aurora/dock/constellation/blob — blob done in-wave) as LIVE π captures; the inheritance cross-walk (§11/§13/§14
  → ADDRESSED/RETIRES/ARCHIVES); the overfitting audit; the ι-sweep + precepts-pin re-sync (RATIFY-BEFORE-IMPL,
  the `m docs/precepts` dirty tree); FINAL.md. Reconcile the §21 end-state; close `complete_with_misses` if any
  leg unmet (NEVER `complete` on headless-green).

---

## 4 — The publish cadence (the §0b sequential deploy DAG)

The end-state is three sequential legs; the cadence is **NOT** "publish once at the end" — it is gated:

1. **glass-ui publishes** the AX cut (a 3.9.0/4.0.0 bump) — **BLOCKED on `profile:budget` GREEN** (the only
   RED that gates a TAG; needs W25b carves → rebaseline). This is the keystone every downstream leg resolves
   against. **The provenance discipline:** the slides standing rule "only pin a main-sourced publish" is
   VIOLATED today (3.8.0 published from `at-dock-convergence` branch-tip, not `master`). The
   `at-dock-convergence → master` merge + a provenance-clean re-tag is a HARD predecessor of the slides J/K
   close — fold it into the W33 close.
2. **Consumer bumps** — born-RED consumer gates green ONLY on the published bump (the `proof:animation-coherence`
   speedtest 3-site fix, the kf migration legs, the W34 adoption legs). These DISPATCH from sibling sessions
   post-publish (glass-ui authors annexes; siblings execute — inv-16).
3. **Slides deploy** (leg-2) → CF-Pages deploy-pages.yml → prod validation (slides.friday.institute HTTP-200 +
   AX-deck content marker). The K-branch redesign can land independently (low pin-coupling); the J fourier
   consume is W43-gated.

**Operational readiness (probed live 2026-06-08): ZERO hard user-gates** — gh authed, release.yml OIDC
provenance GREEN, npm authed, CF-Pages + all 3 secrets set, AWS authed. No user-gate stands between the drive
and the §21 end-state. Full authorization is durable this tranche.

---

## 5 — The cardinal-lesson re-verify list (the binding live-audit gate before close)

Consolidated from `S-cardinal` §4, ordered by severity/un-resolvedness. NONE of these closes until a captured
live π audit (paired-π BEFORE/AFTER + DELTA, ≥2-3 viewports × light/dark) is GREEN on the real device via
chrome-devtools-mcp:

1. **BLOB W46** (un-started fix over a live-broken surface) — goo-blob + blob-mood.
2. **W52 liquid-glass** (Q3 hover refutes the `live-verified` stamp) — speedtest-card / dock / glass-Card-over-
   aurora, light+dark; confirm the bloom is gone AND the corner radials read calm AND the hover READS.
3. **W53 SegmentedTabs** (confirm the squish is no longer jarring; T4 broken-pages sound).
4. **W45 dock band** (DK2 hover / DK8 rail / DK4 align / Q1 collapsed-pill — the frontend-design judgments,
   beyond the frame-count gate).
5. **W56 / W59 / W57** (each JSON self-declares the live arm owed — capture the named DELTA).
6. **W23/P5 carousel** (Apple-liquid-pill, gated on W42).
7. **W17 constellation** (confirmatory only).

The structural enforcement: `proof:live-verified-ledger` (born-RED) makes "live-verified" mean a captured
DELTA exists, not a commit-message claim. This is the W33 close gate that prevents a fourth inflation.

---

## 6 — The deferred-fold (zero-loss; every item LANDS, RETIRES with rationale, or ARCHIVES)

The deferred ledger is COMPLETE at the routing level (R-deferred-glassui §1: all 9 REQUIREMENTS §13 items
have named AX receivers; the AT-L4 47-row fold cleared the bulk; the no-legacy sweep is clean). The OPEN
items that MUST fold into AX execution:

- **The one orphaned ≥2 FOLD: GlassNativeDrawer (AT-#8)** — firm 2-consumer (muster + speedtest mobile sheets),
  correctness-retiring (a vaul-vue re-snap bug), has NO AX receiver wave. Route to W20/W21 or mint a thin
  native-drawer wave. The strongest un-routed item in the lane.
- **W19 F0 header-ribbon** (§2b) — the orphaned in-repo deferral; execute + W35-gate-publish.
- **The §13 research-backed READMEs** (aurora/dock/constellation) — W33; verify they are real, not stubs.
- **The chassis-retire (D12, CONFIRMED "REMOVE")** — W28/W29; the sequencing IS the deliverable.
- **The W34 §16 receiver + the 2 inbound handoff notes** (kf cosmetic-bump leg, speedtest routed-asks).
- **The W41 supplier-edge debts** (keyframes-4 `file:`-link republish, E2 value-0.11 cap) — named handoffs.
- **The KEEP-BOOK set HOLDS with triggers intact** — do NOT over-fold the 1-consumer W-ASKS (#13/#14/#15/#19),
  the Baseline-gated pilots, the divergence-gated convergence-watches. The overfitting bar (≥2 OR exported OR
  demo-private) forbids shipping substrate-without-consumer.

The terminal: **W33's `proof:carry-closure` gate runs GREEN with zero un-receivered AX deferred items** —
the institutionalized P-inv-28 zero-deferral close. It reads W34's `{receiver-wave, close-gate}` ledger.

---

## 7 — The gate-fleet close health (the five close-blocking REDs)

From `S-gates` + `W-close-crossrepo`. The fleet is fundamentally SOUND (the bijection meta-gate GREEN; the
manifest single-source; the fail-CLOSED π lane the structural antidote). The REDs are expected born-RED /
carry-forward with named owners:

| RED gate | Tag | Owner | Blocks TAG? | Blocks W33 close? |
|---|---|---|---|---|
| `verify-ci` (20-gate drift, fail-OPEN) | meta | W33 — the π-in-CI split-tag decision | no | **YES** |
| `proof:no-god-module` (4: +SegmentedTabs 683) | local | W26 (3) + **W53-spillover unassigned** | no | **YES** |
| `proof:no-legacy-commentary` (7 barrel refs) | local | W27a | no | **YES** |
| `profile:budget` (CSS 103.5% gzip) | local·ci·**release** | W33 rebaseline gated on **W25b** | **YES** | **YES** |
| `proof:story-language` (1, W45 regression) | local | Batch-0 one-line strip / W27b | no | **YES** |
| `proof:animation-coherence` (speedtest census) | un-aggregated orphan | W34 (publish-gated) | no | no |

The keystone: **the π-gate-in-CI infra decision** (W33) — split-tag the SOURCE arms (ci-tagged, run
everywhere) from the RUNTIME arms (a headless-Chrome CI job via the W00 tests-visual workspace, OR a separate
`pi`-tagged device-bearing runner). Do NOT bulk-add 20 `run:` lines. `proof:ax-final` does NOT exist yet —
W33 authors it; until then there is no terminal close gate.

---

## 8 — The needs-user-decision batch (surface as ONE crisp set so gated waves drive)

From `R-needs-user-decision`. The orchestrator surfaces these; agents NEVER self-ratify a Class-3 hinge:

- **GENUINE design calls** (no safe auto-default): **R3** glass-first-class boundary (confirm nav/overlay
  default + level-knob + opaque-escape, NOT glass-on-content — the W54 §RATIFY, highest-leverage in the
  tranche); **R1** squircle "and the like" membership (big-dock-only default; the user ticks extra surfaces).
- **§5.3 ratify with strong defaults the user need only confirm**: **R2** ColorSwatch (default KEEP-NATIVE);
  **R5** glass-scrubber rename (default ACCEPT `standard`).
- **One STALE hinge needing re-evaluation before adjudication**: **R7** W42 second-consumer — W53 unified tabs
  onto its own engine, so the tab-indicator may no longer be the natural `useLiquidMorph` consumer. Re-diagnose
  against post-W53 reality BEFORE asking the user.
- **RESOLVED** (record, do not re-ask): R4 chassis-retire (already-decided REMOVE; PROGRESS-note owed), R6
  specular `off`/`subtle` (resolved-by-intent), R8 Fraunces (shipped), R9 WebGPU (autonomous EXCISE), R10
  POS_SCALE (decided-once). P1 use-token-color is a DIVERGENCE (W19 kept it as a constellation consumer; pass-3
  re-asks to replace it IN THE VERTICAL DOCK with a darkmode toggle — the composable stays, the demo story
  changes; surface for adjudication).

---

## 9 — The slides + constellation edges (leg-2/leg-3 of the end-state)

From `C-slides` + `C-slides-glassui` + `W-close-crossrepo`:

- **The slides AX L-band is ~70% already-shipped** by the slides repo's own H/I tranches. RE-GROUND W30/W31
  against post-I HEAD — do NOT re-execute discharged work or claim false AX credit. The genuine remaining: W32
  motion-adoption swap + LabeledField error pattern + the W30 constellation `light-dark(` residual.
- **The K-branch trap (user-flagged):** the 5/6/7 single-close redesign is a ratified plan stranded on a STALE
  11-slide base (forked from a Tranche-F-era commit, predates the G.W5 11→7 restructure). It must be RE-SEEDED
  onto deployed `main` (the 7-slide tree) before ANY execution. The single highest-value slides deliverable;
  low pin-coupling (editorial), can land independent of the glass-ui AX close.
- **The J fourier-intensity cross-repo hinge:** the deployed Fourier hero is a near-invisible whisper (0.24
  ceiling); the target is hero ≈0.55 / final ≈0.45. The glass-ui half is **W43**; the slides consume is J.W2.
  Sequenced: glass-ui ships W43 → `at-dock-convergence`→`master` provenance-clean publish → slides re-pins +
  consumes + the J.W2 floor gate proves fail-on-old/pass-on-new.
- **The constellation ≥2-consumer swap** (now unblocked — 3.8.0 ships `./constellation`; til-briefing still
  deck-local) — decide execute-or-close in writing (J.W9); executing it also resolves the W30 `light-dark(`
  residual at source.
- **The provenance discipline is a constellation invariant:** the glass-ui AX close (merge + provenance-clean
  re-tag) is the sequenced predecessor of both slides J.W9 and any K deploy.
- **Cardinal-lesson note:** both decks are LIVE-200 but "deployed" ≠ "legible" — J's thesis is the Fourier hero
  + Slide-2 bank render to near-nothing under green gates (the exact headless-green/visually-broken class). Any
  slides close audits on the LIVE product with a measured floor (coverage-fraction + ground-contrast luminance
  delta), never a presence check.

---

## 10 — GAPS this synthesis surfaces (plan divergences the orchestrator must close)

1. **W51 has NO wave doc** — the D18 `--ui-scale` umbrella the convergence sequences FIRST and W45/W50
   specialize. Author it before anything reads `--ui-scale`. The highest-priority authoring gap. RATIFY whether
   it re-anchors the already-landed `--dock-scale` or the dock scale was always the specialization.
2. **W54 + W55 have NO wave docs** — the two glass-band twins (the pass-3 TOP-precedence ROOT + the G2 adaptive
   dock). Research complete; specs un-authored. W54 carries the live R3 RATIFY hinge.
3. **The page-redesign umbrella has NO wave** — the pass-3 Q4/Q7/Q9 cohort. Mint it (subsumes/extends
   W18+W40+W57+W58); it is BLOCKED on W54.
4. **The W06 spec contradicts W18** (GAP-4) — W06 predates D14 and its RATIFY-#1 recommends flat `navigation/`
   siblings, contradicting W18's first-class `dock` category. Amend W06 BEFORE dispatch.
5. **W19 `DEVELOPED` is over-claimed** (§2b) — header-ribbon/glass-panel/useTokenColor still in tree. The close-
   honesty checklist must catch the status inflation.
6. **The dock-unify-root (pass-3) has no wave doc** — the "all docks same root" extension; author it.
7. **W42 second-consumer is STALE vs W53** (R7) — re-diagnose before the wave opens.
8. **No `audit/visual/` capture discipline** — zero screenshots exist; "MCP live-verified" is unfalsifiable
   without captures. W33 close gate requires the paired-π artefact set per visual wave.
9. **W34's `CONSTELLATION.md` is the wrong artefact** — the narrow W17 band-E handoff, not the §16 per-consumer
   receiver. Re-author it (it is the INPUT to `proof:carry-closure`).
10. **`build:watch` is JS-only** (W41) — the contract-v2 dts-freshness violation every consumer dev-resolves
    through. Land it early.

---

## 11 — The single coherent path (the orchestrator's drive sequence, one line per stage)

1. **Batch 0** — soundness reconcile (PROGRESS↔JSON + re-verify sweep + the `dock.vue:86` strip + W19 F0 + the
   `proof:live-verified-ledger` born-RED). Hours. Gates the trust of everything.
2. **Author the missing specs** — W51 (`--ui-scale`), W54 (glass-first ROOT), W55 (adaptive-glass), the
   page-redesign umbrella, the dock-unify-root; amend W06 (D14 + W18-category); re-diagnose W42's second consumer.
3. **Batch 1** — W54 (ROOT, RATIFY R3 first) + W43 (fourier SOTA pull-up) + W42 (morph substrate). Unblocks the
   page-redesign.
4. **Batch 2** — the blockers: W46 (blob), W48 (glass-material), W44 (dark contrast), Q8 (gate-pattern).
5. **Batch 3** — the dock finish: W45-TUNE → W06 (carve+showcase) → dock-unify-root.
6. **Batch 4** — the page-redesign umbrella (glass cards + per-hero backgrounds + P8 grid + P10 migration).
7. **Batch 5** — W18 (IA tree) → W40 (shell) → re-verify W57.
8. **Batch 6** — aurora (W38/W47/W14) ‖ sizing (W51→W50→W45 reconcile) ‖ a11y (W55/W36/W44).
9. **Batch 7** — cross-repo + slides: W41 → W34 → W21→W28→W29 (chassis DAG) ‖ W35 (prune-migration) → W30-W32
   re-ground + K-branch re-seed.
10. **Batch 8** — encapsulation: W25a/b (carves before budget rebaseline) → W26 (+SegmentedTabs owner) → W27a/b.
11. **Batch 9** — W39 (lighthouse) → **W33 close** (π-in-CI, ax-final, carry-closure, READMEs, budget rebaseline,
    inheritance cross-walk, ι-sweep, precepts re-sync, FINAL) → publish (provenance-clean, master-merged) →
    consumer bumps → slides deploy → prod-validate. Close `complete_with_misses` if any leg unmet.

**The governing discipline (binds every stage):** GESTALT redesigns over patches; clean breaks, no legacy, no
compat shims; token-first; component-over-class; the overfitting bar (≥2 OR exported OR demo-private); and
above all **the cardinal lesson — a wave is complete ONLY when audited GREEN on the LIVE product, captured as
a paired-π DELTA, never collapsed to headless-green.** The single path from `77c08c5` to AX close is this DAG,
driven one batch at a time, each closing on the real device.
