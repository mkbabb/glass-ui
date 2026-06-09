# H-execution-dag — adversarial hardening: the refined execution DAG (AY + L)

**Lane** H-execution-dag · **Mode** RED-TEAM (read-only; the integration meta-lane) ·
**HEAD** glass-ui `at-dock-convergence`, slides `main` (`3765d52`) · **Captured** 2026-06-09 ·
**Verdict: NOT-COHESIVE** (there is NO execution DAG. AY.md §3 + L.md §3 are 5-line prose
"ordering" paragraphs, the DRAFTs explicitly DEFER the DAG — "finalize against the GOLDEN
batch DAG" which was never authored — and the cross-repo publish→re-pin→adopt→deploy hinge,
the single load-bearing edge of the whole engagement, is IMPLICIT in every document and EXPLICIT
in none. Worse, the ordering that DOES exist is built on the stale-base ledger, so it sequences
~7 waves to RE-BUILD shipped work, and the dependency floor of the headline path bottoms out in
three phantom waves and a phantom gate.)

---

## TL;DR for the orchestrator

The job of THIS lane: take ALL 24 sibling findings + the 2 synthesis lanes (H-gaps-master,
H-wave-completeness) and produce the ONE hardened roadmap from HEAD to convergence — the batch
order, the dependency edges, the cross-repo gating, the per-wave DELTA capture, and the
publish + deploy legs. The adversarial finding is that the existing "ordering" is not a DAG at
all and the parts that masquerade as one are WRONG in five structural ways:

1. **THERE IS NO DAG — only two 5-line prose paragraphs.** `AY.md:100-105` (§3 "ordering") and
   `L.md:65-69` (§3 "ordering") are the entire sequencing apparatus for a 22+10-wave, two-repo,
   cross-published engagement. `AY-DRAFT.md` (tail) literally says: *"finalize against the GOLDEN
   batch DAG and the residual-triage outcome before opening the execution phase."* That GOLDEN
   batch DAG does not exist anywhere in either repo (`grep -ri "batch DAG\|execution DAG\|the DAG"
   docs/tranches/AY docs/tranches/AX/audit/GOLDEN*` → only the DRAFT's forward-reference). The
   DAG was deferred to a document that was never written. This lane's deliverable IS that document.

2. **THE LOAD-BEARING CROSS-REPO EDGE IS UNSEQUENCED.** The whole engagement's headline is
   "slides consume perfected glass-ui, no bespoke copies." That requires a precise 5-step
   cross-repo chain: **AY perfects+exports → AY.W-PUB1 publishes (USER-DOMAIN) → slides re-pins
   the EXACT published version (today a caret `^3.9.0`, not a pin) → L.W-ADOPT swaps + deletes
   bespoke → L.W5 deploys.** This chain appears NOWHERE as an ordered edge set. `AY.md:104` says
   "Consumer adoption … is the L tranche, gated on the AY exports" (one clause); `L.md:56` says
   "gated on AY" (two words). Neither names the publish-version arithmetic, the re-pin step, or
   the user-domain hinge ordering. H-slides-adopt-deploy F7 proves the pin is a caret that would
   silently auto-resolve — a stale-dist hazard the cross-repo contract-v2 exists to prevent. The
   single most important dependency in the plan is two unconnected words across two repos.

3. **THE EXISTING ORDER SEQUENCES RE-BUILDS.** `AY.md:101` "Band A research waves run FIRST" is
   correct in SHAPE but built on the stale ledger (H-gaps-master G1: ≥6 shipped+gated features
   marked UNADDRESSED/DEFERRED). So the FIRST batch as written dispatches W-CON2 to "build warp"
   (shipped AX.W17), W-SLD1 to "collapse the zoo" (shipped AX.W59), W-SCALE1 to "build the system"
   (shipped AX.W51), W-FF2 to "abstract+export" (already exported), W-DOC1 to "write READMEs" (4
   exist). An execution that begins by re-building green code is churn-and-regress, not a path to
   convergence. **The DAG's true step-0 is a re-ground that NO ordering paragraph contains.**

4. **THE DEPENDENCY FLOOR IS A VOID.** Trace the headline path bottom-up: L.W5 (deploy) → L.W-ADOPT
   (consume) → AY.W-PUB1 (publish) → AY.W-CON3 (export-ready, gate `proof:no-bespoke-constellation`)
   → AY.W-CON1/2 (perfect). But `AY/waves/` is EMPTY (0 specs), `L.W-ADOPT`/`L.W-MOB`/`L.W-CHR`
   are phantom (no DRAFT row, no spec), `proof:no-bespoke-constellation` does not exist in either
   repo, and `AY/PROGRESS.md` (the cardinal-gate's AY home) does not exist. Every node on the
   critical path below AY.W-PUB1 is either unauthored or fictional. A DAG whose critical-path
   leaves are voids cannot be scheduled.

5. **THE DELTA-CAPTURE LEG IS NOT IN THE DAG.** The cardinal lesson (complete ONLY on a captured
   live DELTA) is the gate on EVERY visual wave's close, which means it is a dependency edge on
   every Band-A/B impl wave AND on L.W5. But the cardinal gate `proof:live-verified-ledger` is
   AX-hardcoded and `complete`-exempt (H-cardinal Holes #1/#2); AY has no PROGRESS.md/visual-dir;
   slides has NO capture gate at all. So the DELTA-capture edge that gates ~15 waves is unenforced
   PROSE on every one of them. The DAG must make "mint the AY+slides cardinal infrastructure" a
   batch-0 node that BLOCKS every downstream visual wave's close — it is currently nowhere.

The cohesive roadmap below (§4) fixes all five: a hard Batch 0 (re-ground + DAG-author +
cardinal-infra + phantom-wave authoring), the correct research→perfect→export→publish→adopt→deploy
batch order, the explicit cross-repo edge set, the per-batch DELTA discipline, and the two
user-domain hinges named as the only manual gates.

---

## §1 — What the two "ordering" sections ACTUALLY say (source-grounded)

**`AY.md:100-105` §3 ordering (verbatim shape):**
- Band A research (W-AUR1/W-BLOB1/W-DOCK1/W-FF1) FIRST.
- Band A impl + Band B/C after their research lands.
- Band E (close) LAST.
- constellation band runs early (unblocks slides-L).
- consumer adoption is L, gated on AY exports. "~22 waves."

**`L.md:65-69` §3 ordering (verbatim shape):**
- L.W1 first; L.W2/W3 depend on W1's settled copy; L.W4 sweeps + resolves OQs.
- L.W-MOB/W-CHR parallel after W1.
- L.W-ADOPT gated on AY.W-CON3.
- L.W5 (deploy) LAST on Track A; Track B (W6/W7) independent.
- "deploy is the user-gated hinge."

These are correct INTUITIONS but they are not a DAG: no node→node edge set, no batch boundaries,
no cross-repo synchronization point, no statement of what BLOCKS what at the gate level, no
DELTA-capture edges, and no placement of the ~9 net-new waves the synthesis lanes demand
(H-gaps-master §3, H-wave-completeness §3). Critically, BOTH sections inherit the dual-numbering
defect (H-wave-completeness §1): `AY.md` orders named waves the DRAFT authors under different IDs;
`L.md` orders three waves the DRAFT and `waves/` do not contain. **An orchestrator cannot dispatch
from these — there is no schedule, the node set is inconsistent across documents, and the
dependency edges are prose hints.**

---

## §2 — The dependency edges the plans MISS (the real graph)

I traced every cross-wave and cross-repo dependency the sibling lanes surfaced. The edges below
are ABSENT or implicit in AY.md §3 / L.md §3:

| # | edge (blocker → dependent) | why it is load-bearing | source |
|---|---|---|---|
| E1 | **W0-REGROUND → ALL Band A** | every impl wave inherits the stale ledger if it doesn't run first; ~7 waves would re-build | H-gaps-master G1, H-chronic-defer §3 |
| E2 | **DAG-AUTHOR + spec-author → ALL dispatch** | 0 AY specs, 3 phantom L specs; nothing is dispatchable until authored | H-wave-completeness §2, H-gaps-master G2 |
| E3 | **cardinal-infra (AY PROGRESS+visual-dir, gate AY-path + slides-port) → every visual wave's CLOSE** | the DELTA edge gates ~15 waves; unenforced prose on all today | H-cardinal Holes #1/#2/#3 |
| E4 | **AY.W-CON1 (refitField transpose-UP) → L.W-ADOPT** | adopting the lib REGRESSES resize re-fit unless the engine grows it FIRST (the lib LACKS what the bespoke copy has) | H-constellation F1 (G6) |
| E5 | **AY.W-CON2/CON3 (`?freeze` seam + anomaly/resolved props) → L.W-ADOPT** | the deploy pptx/shoot pipeline DEPENDS on `?freeze`; the lib has no such seam → deploy regresses | H-slides-adopt-deploy F3/F4 (G20) |
| E6 | **AY.W-CON3 + `proof:no-bespoke-constellation` (homed in SLIDES) → L.W-ADOPT** | the gate that closes the swap inspects SLIDES src, must live there; named-but-unbuilt | H-slides-adopt-deploy F2, H-chronic-defer §G |
| E7 | **AY.W-PUB1 (publish, USER-DOMAIN) → slides re-pin → L.W-ADOPT** | the caret `^3.9.0` must become the EXACT AY-published pin; the version arithmetic is stale before it ships | H-slides-adopt-deploy F7 (G23) |
| E8 | **AY.W-CON1 (`--constellation-alpha` tune) ↔ L.W-ADOPT (engine swap)** | the deck won't READ the lib token until it swaps the engine; translucency falls in the repo gap a 3rd time if unsequenced | H-slides-adopt-deploy F9 |
| E9 | **W-DOCK3 progress-bar clause → L (NOT glass-ui)** | the "progress bar off the dock" half has NO glass-ui edit-site; it is a slides page-element concern mis-folded into an AY wave | H-dock D4, H-wave-completeness §4 |
| E10 | **research waves (W-AUR1/W-BLOB1) → their impl waves** | correct in AY.md, but the research-INPUTS already authored (H-research-aurora, H-research-blob, H-research-dock-anim) must be the FIRST consumed input, not a from-zero 32-agent re-run | H-research-aurora, H-research-blob, H-research-dock-anim |
| E11 | **W-GLASS / W-MOTION / W-A11Y-PERF (net-new BLOCKER-class) → W-CLOSE1** | a "perfected library" cannot close with an opaque Drawer, a RED motion gate, and dormant W55; these have NO home in the current order | H-glass-cohesion, H-motion-cohesion, H-a11y-perf (G5/G18/G25) |
| E12 | **AY.W-CARRY (register=deferral-set) → W-CLOSE1** | the FINAL's "zero chronic-defer carry" claim is gate-FALSE (3 of ~25 rows) unless the register is reconciled before close | H-chronic-defer §6 (G17) |
| E13 | **L.W1 (settled copy) → L.W4 (conformance sweep)** | correct in L.md, but L.W4 also ports the cardinal gate (E3 twin) — a missed edge | H-slides-backlog, H-cardinal §8 |
| E14 | **AY.W-PUB1 ← W-CLOSE1 ← (ALL AY waves green)** | publish is the terminal AY node; it cannot precede the close, which cannot precede every gate green | TRANCHE-AND-WAVE-SPEC §close |

The two user-domain hinges (the ONLY manual gates): **AY.W-PUB1** (npm provenance publish — the
`project_glassui_340_published` memory: push the `v*` tag, release.yml does the gated provenance
publish) and **L.W5** (the CF-Pages deploy + the live-200 probe — held until the deck is reviewed).
Every other node is agent-dispatchable. The DAG must mark these two as the only blocking manual
edges and order everything else around them.

---

## §3 — The publish→re-pin→adopt→deploy hinge (the cross-repo synchronization the DAG must encode)

This is the single most under-specified edge in the engagement, and it recurs as a chronic
(`project_glassui_340_published`: the 3.7.0→3.9.0 churn; H-slides-adopt-deploy F7). The exact
ordered sequence the DAG must encode, with the version arithmetic explicit:

```
1. AY perfects constellation (W-CON1 refitField + alpha tune; W-CON2 warp-VERIFY + eggs;
   W-CON3 ?freeze seam + anomaly/resolved props + export-ready VERIFY).
2. AY perfects every other shared visual (aurora, blob, fourier, dock, slider, scale, glass,
   motion) — the full Band A/B/F body — each closing on its OWN captured DELTA (E3).
3. AY closes (W-CARRY reconcile → W-CLOSE1 FINAL + proof:ay-final green → overfitting audit +
   budget rebaseline).
4. [USER-DOMAIN HINGE 1] AY.W-PUB1 — master-merge + push v3.10.0 (or next minor) tag →
   release.yml gated provenance publish. The agent NEVER pushes; the orchestrator/user does.
5. slides re-pins the EXACT published version: package.json "@mkbabb/glass-ui": "3.10.0"
   (NOT "^3.9.0" — replace the caret with the precise pin; contract-v2 invariant 30).
   npm ci resolves the new pin from the registry.
6. L.W-ADOPT — DELETE slides/src/decks/til-briefing/constellation.ts; consume
   @mkbabb/glass-ui/constellation across SlideTitle/SlideHandoff/SlideAsk; port the
   integration model (DOM-scan controller → N declarative <Constellation> + a captured
   frame-budget DELTA proving no perf regression); the warp + eggs + alpha tune come for free.
   proof:no-bespoke-constellation goes RED→GREEN (deletion + import proof).
7. L.W5 — forward-cut → merge-to-main → [USER-DOMAIN HINGE 2] CF-Pages deploy → post-push
   live-200 probe + paired before/after DELTA capture (cardinal lesson — agent captures AFTER
   the user-domain push).
```

Steps 4 and 7 are the two manual hinges. Steps 1-3 are fully parallelizable AY work; steps 5-6
are slides work that CANNOT begin until step 4 lands. **Today the plan has step 6 (L.W-ADOPT) as
a phantom row "gated on AY" with no step 4/5 between them** — the re-pin is missing entirely and
the publish-version is stale (caret). This is the edge that has slipped slides H→I→K→L (4 tranches,
H-chronic-defer §G): the swap is gated on a publish that keeps not happening, and nobody sequenced
the publish INTO the slides adoption wave.

A subtlety the DAG must also encode (H-slides-adopt-deploy F4/F5): L.W5's deploy gate cites a
"pptx-200 in CI" + "e2e CI green" that do NOT exist in slides CI (`ci.yml` runs only
`vue-tsc --noEmit` + `vite build`; no pptx step, no e2e). The deploy node must DECOMPOSE into
(a) local build/conformance/capture-gate green [agent], (b) the user-domain CF push [HINGE 2],
(c) the post-push live-200 + DELTA [agent]. The fictional CI gates are removed or BUILT, not cited.

---

## §4 — THE REFINED EXECUTION DAG (the deliverable)

Eight batches, HEAD → convergence. Each batch is a barrier: every wave in batch N closes (gates
green + DELTA where visual) before batch N+1 dispatches. Within a batch, waves run in parallel
(≤6-agent ceiling) because their file bounds are disjoint. Cross-repo edges are marked `[X-REPO]`;
manual hinges are marked `[HINGE]`. Wave IDs use the named `W-*` scheme (130 sibling refs use it;
H-wave-completeness §1) with the three folded-back DRAFT waves (W-DELTA0/W-CONSUMER/W-TRIAGE) and
the ~9 net-new waves.

### BATCH 0 — RE-GROUND + DAG-AUTHOR + INFRASTRUCTURE (blocks EVERYTHING; the missing step-0)

Pure documentation + gate-script work, NO source risk; can run as one parallel wave.

| node | does | gate |
|---|---|---|
| **AY.W0-REGROUND** | re-derive every AUDIT-LEDGER row vs AX `PROGRESS.md` + named proof gate + HEAD file:line (the AT W0-L4 format); correct the ≥6 stale-shipped rows | a re-grounded ledger; ZERO row marks undone what ships live-verified (H-gaps-master G1, H-precept-drift, H-chronic-defer §3) |
| **L.W0-REGROUND** | the slides twin: reconcile `L.md` ↔ `L-DRAFT.md` ↔ `waves/`; re-verify the stale 11-slide mobile verdicts vs the live 7-slide manifest | `L.md`/DRAFT/`waves/` agree on the L set (H-wave-completeness §3, H-slides-mobile-chrome) |
| **AY.W-DAG** (this lane's output, formalized) | author the consolidated wave inventory under ONE numbering scheme; fold the 3 dropped DRAFT waves + the ~9 net-new; author EVERY `AY/waves/*.md` + the 3 phantom `L/waves/L.W-{ADOPT,MOB,CHR}.md` spec | `proof:wave-inventory-coherent`: every AY.md §2 ID has a spec; every spec ID is in AY.md §2; L set reconciled (H-wave-completeness §8) |
| **AY.W-CARDINAL-INFRA** | mint `AY/PROGRESS.md` + `AY/audit/visual/`; tranche-parameterize `proof:live-verified-ledger` (cover `complete`, match-filename, depth-header); PORT it to `slides/scripts/` + slides `audit/visual/` | the gate runs born-RED against the 6 AX visual `complete`-exempt rows + reads BOTH tranche paths (H-cardinal §7) |

Batch-0 rationale: it is the prerequisite EVERY synthesis lane demands (H-gaps-master Tier-S
G1/G2/G3/G4; H-wave-completeness §5 Band-0; H-chronic-defer §3). It carries zero source risk
(docs + gate scripts), so it parallelizes cleanly and unblocks correct dispatch of all else. The
DRAFT's own forward-reference ("finalize against the GOLDEN batch DAG before opening execution")
makes this batch the literal precondition the DRAFT names.

### BATCH 1 — RESEARCH CONSUME + COHESION-BLOCKER FIX (the parallel research + blocker repair)

Research waves consume the ALREADY-AUTHORED research briefs (H-research-aurora/blob/dock-anim are
written — these are CONSUME-and-rank, not from-zero 32-agent re-runs; E10). In parallel, the
BLOCKER-class cohesion fixes that any "perfected library" requires.

| node | does | gate |
|---|---|---|
| **W-AUR1** | consume H-research-aurora's falsifiable bar (colorfulness band / structure-tensor / −5/3 spectrum); rank the path-forward | research doc + N-bound gate (not `≥N` placeholder) |
| **W-BLOB1** | TARGETED audit of the OPEN blob items (NOT a settled-question re-sweep); consume H-research-blob | ranked path; default-identity decision recorded |
| **W-DOCK1** | VERIFY-OR-FALSIFY the items-lag (capture the live collapse); re-diagnose only if it persists | the lag captured or falsified (retire the tautological gate; H-dock HEADLINE) |
| **W-FF1** | rebase the born-RED AX.W43 spec to HEAD (the path-forward exists TWICE — re-land, not re-research) | the rebased spec + the cross-repo math-duplication decision |
| **W-GLASS** (net-new) | re-author `.glass-drawer` onto `glass-floating` (OPAQUE today, BLOCKER); route Slider onto `--glass-level`; make moving-specular opt-in; inventory-complete `proof:glass-cohesion` | every glass surface flattens at `level:0` (π readback incl. Drawer+Slider) (G5/G19) |
| **W-MOTION** (net-new) | re-point off-doctrine survivors; widen `proof:animation-coherence` to the full surface set + register-assignment; CI-promote green | gate GREEN + CI-tagged + register-asserting (G18) |

### BATCH 2 — COMPONENT PERFECTION IMPL (the SOTA body; each closes on a captured DELTA)

The largest batch; decompose into sequential mini-waves if the ≤6 ceiling is exceeded (the
ORCHESTRATION discipline). Every wave names `proof:live-verified-ledger` (NOT prose "capture")
and references an own-surface DELTA at ≥2 viewports × {light,dark} (E3).

| node | does | DELTA gate |
|---|---|---|
| **W-CON1** | `refitField` transpose-UP (the lib LACKS the bespoke's re-fit — E4); `--constellation-alpha` both-mode tune | RO re-fit captured; alpha π readback both modes |
| **W-CON2** | warp VERIFY (shipped AX.W17 — capture, don't re-build); eggs net-new (auto-drift target-source + gravity-well only; konami CUT, supernova demo-only per H-proto-constellation-warp) | warp DELTA + `proof:constellation-egg-live` |
| **W-AUR2/3/4** | the genuine migration sliver (strike the done OKLAB/atoms items); painterly mediums + the captured painterly DELTA (NONE exists today); WebGPU retire-or-resurrect DECISION; interactive | the 3 reference-anchored metrics + painterly-medium DELTA (G13) |
| **W-BLOB2/3** | light OKLCh default base (the default renders a DARK coffee-bean — G8); interaction + frame-budget; bind consumer #2 or formally book demo-only + strip speculative DI | default-warmth π born-RED→GREEN; hover-flick + dome-luma BAND DELTA (the largest open live-truth gap) |
| **W-FF2** | LAND the W43 intensity fix (`OUTLINE_PEAK_ALPHA` 0.24 → the model; quadratic decay → the spec); thread `StoryHero :intensity`; restore 3-substrate parity; cross-repo math promotion decision | the `final` preset reads (not a corner stub); 3-substrate DELTA (G7) |
| **W-DOCK2** | real entering-child onset gate (≤ a DECIDED budget; retire the tautology — G10); rail cohesion; DECIDE the stagger reconciliation | the LAST entering child's onset captured ≤ budget; lockstep DELTA |
| **W-DOCK3** | dock+slider DELTA + the missing story (`demo/stories/.../dock-with-slider.vue`); the progress-bar clause RE-HOMED to L (E9 — glass-ui asserts only what it owns) | dock+slider captured working; progress-bar clause moved to L |
| **W-SLD1/2** | reconcile the rounded-knob-vs-locked-cylinder CONTRADICTION (user-judged capture — G9); consumer-boundary gate; NOT a re-collapse | user-judged design DELTA; `proof:slider-two-only` extended |

### BATCH 3 — LIBRARY-WIDE SYSTEMS + STORYBOOK + DOCS + A11Y/PERF (post-component-stable)

| node | does | gate |
|---|---|---|
| **W-SCALE1/2** | EXTEND `--ui-scale` to form-atoms (Switch/Checkbox/Radio/MultiSelect-X off the axis) + a desktop-fluid type ladder; a REAL axe target-size harness (the `proof:touch-target` gate is PHANTOM — build it) | axe target-size pass on coarse; fluid ladder (G15) |
| **W-A11Y-PERF** (net-new) | engage W55 by default (DORMANT — 0 opt-in); ship the webkit `backdrop-filter` prefix in dist (Safari trap); rAF-coalesce specular; nested-backdrop frame-budget gate; re-derive the glass-aware contrast oracle | π contrast over the ACTUAL shipping glass-over-bright ≥4.5:1 (G25) |
| **W-SB1/2/3** | per-route KEEP/FIX/RETIRE verdict (half already actioned AX.W19); component-RETIRE for orphans (header-ribbon/glass-panel/useTokenColor — route-prune ≠ component-retire); native-top-layer FOLD into Dialog; real language-consistency gate | `proof:no-orphan-demo-route` enumerates the named routes; orphan-retire proof (G16) |
| **W-DOC1** | quality-uplift the 4 EXISTING READMEs to the research-backed bar (NOT a from-zero write) | each README cites its W-*1 research |
| **W-IC1** | the instrument-chassis scope decision (UNDER-EXAMINED — no focused lane challenged it) | decision recorded; consumers reconciled |
| **W-CONVERGE** (net-new) | the per-major-component glass-ui↔slides FIT audit (the un-homed transcript directive; W-SB3 is a thin proxy) | per-component keep/extend/fix dispositions (G27) |

### BATCH 4 — STRUCTURE + AX CLOSE PREP (the carve + legacy + carry; before publish)

| node | does | gate |
|---|---|---|
| **W-GOD1** + **W-COLOCATE** | carve the 4 god-modules <500 (return-shape byte-identity — the `proof:composable-return-types` orphan must be WIRED); the sub-component-dir colocation restructure (the BIG reading of the directive, not line-count-only) | `proof:no-god-module` CI-promoted green + .css-aware (G28) |
| **W-CSS1** | CSS monolith carves (tokens 2281 / utilities 1170 / glass 1071) cascade-order-safe; the .css-aware gate | gate green |
| **W-LEG1** | legacy-gate hardening (the AX W27a/b gates were "planned" + NEVER written — ~690 `[A-Z].W` survivors; AUTHOR them) | no-retired-survivor + tag-parity + var-in-arbitrary green (G28) |
| **W-DELTA0** (folded DRAFT W0) | the owed-DELTA backfill sweep (W56 squircle + the 6 AX visual `complete`-exempt rows) | each owed row carries an own-surface DELTA (H-cardinal §6) |
| **W-CONSUMER** (folded DRAFT W5) | the consumer-staleness ledger (`proof:consumer-staleness` born-RED on the 12 stale imports) | green after the consumer re-pins land |
| **W-CARRY** (net-new) | onboard the full AT BOOK backlog into DISPOSITION-REGISTER.json (3 of ~25 today); encode G-4/G-5/G-6 (AX PROGRESS:282 promise unfulfilled); a register-completeness clause | register-row-count = ledger-BOOK-count; completeness gate (G17/C10) |
| **W-LIVE1** | the local-only live-gate CI decision (keep-local+ledger vs SwiftShader/Dawn lane); the cardinal-gate `complete`-coverage extension | decision + (Branch B) lane green |

### BATCH 5 — AY TERMINAL CLOSE → PUBLISH [HINGE 1]

| node | does | gate |
|---|---|---|
| **W-CLOSE1** | overfitting audit (the orphan-scan: `evalFourier` dead export + the library-orphans); FINAL.md; `proof:ay-final`; budget rebaseline; README currency; inheritance cross-walk | `proof:ay-final` green (requires the AY-pathed cardinal gate green); FINAL written |
| **W-TRIAGE** (folded DRAFT W8) | the residual-planned umbrella (W20/W21/W28-32/W35/W39/W41-43/W49) — land/retire/book each | each residual disposed |
| **W-NDA** | the native-drawer WATCH row — trigger re-eval | trigger re-eval green (un-MET → stays booked) |
| **[HINGE 1] W-PUB1** | master-merge + push the `v3.10.0` (or next minor) tag → release.yml gated provenance publish (USER-DOMAIN; agent NEVER pushes) | tag + npm provenance; the published version is the slides re-pin target (E7) |

### BATCH 6 — SLIDES CONTENT (parallel with AY batches 1-5; the L Track A body, NOT gated on AY)

This batch is INDEPENDENT of the AY publish — it is content/copy/mobile/chrome work that consumes
the ALREADY-shipped 3.9.0. It runs in PARALLEL with AY batches 1-5 (the critical insight the prose
ordering misses: only L.W-ADOPT is AY-gated; the rest of L is not).

| node | does | gate |
|---|---|---|
| **L.W1** | the 5/6/7 ground-up rebuild WITH the xray-redolent token/composition spec (UNDER-SPECCED today — no tokens); the resolved-bookend fix (on TWO slides today; gate greps the WRONG attr) | machine gates per H-slides-567 (not eyeball); single-close=1 |
| **L.W2** | the P0s with the ~$5M facts pulled FORWARD (§F already constrains them — break the circular dep) | the 3 P0s resolved; capture |
| **L.W3** | P1 redundancy with a DELETION-PROOF gate (grep-count can't see paraphrase — H-slides-backlog F1) | redundancy gone (deletion proof) |
| **L.W4** | conformance-gate re-arch (inline-wrapper-collapse + em-dash-pre-scan KISS fix); the cardinal-gate slides-port (E3 twin); OQ decisions table | extended gate green + the slides cardinal gate green |
| **L.W-MOB** (AUTHOR) | a manifest↔position contract gate + per-slide portrait captures vs the CURRENT 7-slide manifest (stale 11-slide verdicts — H-slides-mobile-chrome) | per-slide portrait DELTA; real occlusion gate |
| **L.W-CHR** (AUTHOR, re-scoped) | the ONE live defect: the at-rest locked-blur INVERSION (modal + pptx popover ALREADY shipped — verify, don't re-build) | locked-blur captured; stale-count sweep |

### BATCH 7 — SLIDES ADOPT + DEPLOY [HINGE 2] (gated on BATCH 5 HINGE 1)

| node | does | gate |
|---|---|---|
| **slides re-pin** (E7) | replace `"^3.9.0"` with the EXACT AY-published `"3.10.0"`; `npm ci` resolves from registry | the pin is exact (not a caret); build resolves the new lib |
| **L.W-ADOPT** (AUTHOR) | DELETE bespoke `constellation.ts`; consume `/constellation` (warp+eggs+alpha free); port the integration model (DOM-scan → N SFCs + frame-budget DELTA); the befitting-component inventory (the deck-CHASSIS is the elephant — W-DECK decision); `proof:no-bespoke-constellation` RED→GREEN | deletion proof + import resolves + frame-budget DELTA (no perf regression) + `?freeze` static captures render identically (G20) |
| **L.W6/W7** | feedback-coder honesty (the 0.72 is macro-F1 NOT "balanced accuracy" — correct the name; the retracted floor is STILL live — cite + decide); J-docs un-strand (kill option-B phantom-fold — A-clean cherry-pick or delete) | corrected-metric gate; J docs reachable-or-folded with proof (G11/G23) |
| **[HINGE 2] L.W5** | forward-cut → merge-to-main → CF-Pages deploy (USER-DOMAIN); decompose the gate (local green [agent] → user push [HINGE] → post-push live-200 + paired DELTA [agent]); HARD BOUNDARIES preserved | `slides.friday.institute/til-briefing` 200 + paired before/after DELTA (the fictional pptx-200-in-CI clause removed or BUILT — E7/F5) |

L Track B (W6/W7) can run anytime after L.W0 (independent of Track A). The DAG places it in
Batch 7 only for close-batching convenience; it has no AY edge.

---

## §5 — The critical path (the longest dependency chain HEAD → convergence)

```
HEAD (at-dock-convergence)
 └─ AY.W0-REGROUND + AY.W-DAG + AY.W-CARDINAL-INFRA   [BATCH 0]
     └─ W-CON1 (refitField transpose-UP)               [BATCH 2 — E4]
         └─ W-CON2 (warp verify + eggs)                [BATCH 2]
             └─ W-CON3 (?freeze seam + anomaly props)  [BATCH 2 — E5]
                 └─ W-CARRY + W-CLOSE1 (AY close)       [BATCH 4/5 — E12]
                     └─ [HINGE 1] W-PUB1 (publish v3.10)[BATCH 5 — USER]
                         └─ slides re-pin (^3.9 → 3.10) [BATCH 7 — E7]
                             └─ L.W-ADOPT (delete bespoke, consume) [BATCH 7 — E6]
                                 └─ [HINGE 2] L.W5 (deploy + DELTA) [BATCH 7 — USER]
                                     └─ CONVERGENCE
```

The critical path is the CONSTELLATION CONVERGENCE chain — the engagement's headline "exemplar to
KILL." Every other AY band (aurora/blob/fourier/dock/slider/scale/glass/motion) is PARALLEL slack
off this spine, as is the entire L Track A content body (Batch 6). The two user-domain hinges sit
on this critical path; they are the only nodes the agents cannot self-close. **The plan's existing
"ordering" never identifies this critical path, so it cannot tell the orchestrator what to
front-load to compress wall-clock** — front-loading the constellation chain (W-CON1/2/3 in the
FIRST impl batch) is what unblocks the slides headline soonest, which is exactly what `AY.md:104`
gestures at ("constellation band can run early") but never schedules as the critical path it is.

---

## §6 — Chronic-misses (the DAG-level recurrences)

- **The DAG itself is the perennially-deferred artefact.** The AX tranche had the same defect:
  `AX.md` ↔ DRAFT drift that the GOLDEN.md MASTER-PLAN (the "32-lane inventory → MASTER-PLAN (the
  10-batch DAG)" per the git log `c6244e2`) had to consolidate POST-HOC. AY's DRAFT explicitly
  forward-references "the GOLDEN batch DAG" as the thing to "finalize against" — and that DAG was
  never authored for AY. This is a ≥2-tranche planning-coherence chronic: the batch DAG is deferred
  to a document that gets written late or never, so dispatch begins off prose ordering.

- **The cross-repo publish→re-pin hinge slips every tranche.** `project_glassui_340_published`
  records the 3.7.0→3.9.0 churn; H-slides-adopt-deploy F7 proves the pin is STILL a caret. The
  publish-version arithmetic and the re-pin step have NEVER been an explicit ordered edge — they
  live as "gated on AY" prose. The constellation-consume has slipped slides H→I→K→L (4 tranches)
  precisely because the publish it depends on is never sequenced INTO the adoption wave.

- **The DELTA-capture edge is unenforced on every visual wave.** The cardinal lesson is a
  per-wave-close dependency (~15 waves + L.W5), but the gate is AX-hardcoded + `complete`-exempt
  and slides has none. So the edge that should BLOCK ~15 closes is prose on all of them — the
  exact condition that birthed the #1 chronic (7 AX waves inflated live-verified with 0 PNG).

- **Parallel slack is never identified, so wall-clock is over-serialized.** The prose ordering
  implies L is gated on AY wholesale ("consumer adoption is the L tranche, gated on the AY
  exports"), when only L.W-ADOPT is gated. The L content body (Batch 6) is parallelizable with the
  entire AY tranche; the prose never says so, so the plan reads as a long serial chain when most of
  it is parallel.

---

## §7 — Convergence criteria (the acceptance bar for THIS lane)

The execution DAG is "perfected" when ALL hold:

1. **A single authored DAG document exists** — batches, node→node edges, cross-repo `[X-REPO]`
   edges, the two `[HINGE]` user-domain gates, and the critical path — replacing the two 5-line
   prose ordering paragraphs. (Today: no DAG; the DRAFT forward-references a never-written one.)
2. **The cross-repo publish→re-pin→adopt→deploy chain is an EXPLICIT ordered edge set** with the
   version arithmetic stated (caret `^3.9.0` → exact `3.10.0` re-pin), the two user-domain hinges
   named, and the agent-never-pushes clause on both. (Today: two words, "gated on AY".)
3. **The DAG's step-0 is a re-ground + spec-author + cardinal-infra barrier** that BLOCKS all
   downstream dispatch, so no wave runs on the stale ledger and no visual wave closes on prose. The
   ~7 re-build mis-scopes are re-cast to VERIFY before they enter the impl batch. (Today: Band A
   runs first on the stale base.)
4. **Every critical-path leaf is authored, not a void** — `AY/waves/` populated,
   `L/waves/L.W-{ADOPT,MOB,CHR}` authored, `proof:no-bespoke-constellation` built (homed in slides),
   `AY/PROGRESS.md` minted. The dependency floor bottoms out in real artefacts. (Today: all voids.)
5. **The DELTA-capture edge is a real gate on every visual wave's close** — the cardinal gate is
   AY-pathed + slides-ported + `complete`-covering, and each visual wave NAMES it (not prose). The
   two user-domain hinges are the ONLY manual edges; everything else is agent-dispatchable.
6. **Parallel slack is identified** — the L content body (Batch 6) is marked parallelizable with the
   entire AY tranche; only L.W-ADOPT + L.W5 are on the AY-gated critical path. The orchestrator can
   front-load the constellation chain to compress wall-clock to convergence.

---

## §8 — waveSpecInputs (concrete material for the DAG-author wave, AY.W-DAG)

**Defect (file:line):**
- `AY.md:100-105` (§3 ordering) + `L.md:65-69` (§3 ordering) are 5-line prose paragraphs, NOT a
  DAG — no edge set, no batch boundaries, no cross-repo synchronization, no DELTA-capture edges,
  no placement of the ~9 net-new waves.
- `AY-DRAFT.md` (tail) forward-references "the GOLDEN batch DAG" as the artefact to "finalize
  against before opening the execution phase" — it does not exist (`grep -ri "batch DAG" docs/` →
  only the forward-reference).
- The cross-repo hinge: `AY.md:104` "gated on the AY exports" + `L.md:56` "gated on AY" — the
  publish→re-pin→adopt→deploy chain is two words; `slides/package.json` pins `"^3.9.0"` (a caret,
  H-slides-adopt-deploy F7), and the re-pin step is in no wave.
- The cardinal-DELTA edge: `proof-live-verified-ledger.mjs:33-34` AX-hardcoded + `:97`
  `complete`-exempt; `docs/tranches/AY/PROGRESS.md` + `AY/audit/visual/` absent; slides has no
  capture gate (H-cardinal Holes #1/#2/#3) — so the close-edge of ~15 visual waves is unenforced.
- The critical-path floor: `AY/waves/` empty (0 specs); `L.W-{ADOPT,MOB,CHR}` phantom;
  `proof:no-bespoke-constellation` absent both repos (H-wave-completeness §2, H-gaps-master G2/G3).

**Objective:** author the ONE consolidated execution DAG (the §4 eight-batch graph) replacing the
prose ordering; make the cross-repo publish→re-pin→adopt→deploy chain an explicit ordered edge set
with version arithmetic; place Batch 0 (re-ground + spec-author + cardinal-infra) as the blocking
prerequisite; identify the critical path (the constellation convergence spine) and the parallel
slack (the L content body); name the two user-domain hinges as the only manual edges.

**Files/edit-sites:** `docs/tranches/AY/AY.md §3` (replace the prose with the DAG + a batch table);
NEW `docs/tranches/AY/audit/EXECUTION-DAG.md` (the full graph, the critical path, the edge set —
the formalized §4/§5 here); `slides/docs/tranches/L/L.md §3` (the L-side edges + the parallel-slack
note + the re-pin step into L.W-ADOPT); the DAG must reference (not duplicate) the per-wave specs
that AY.W-DAG also authors under `docs/tranches/AY/waves/*.md` + `slides/.../waves/L.W-{ADOPT,MOB,CHR}.md`.

**HARD GATE (evidence-backed):** a `proof:dag-coherent` (or a doc-reconciliation checklist) asserting:
(a) every wave-ID in the §4 batch graph has a spec file AND appears in AY.md §2 / L.md §2; (b) every
cross-repo `[X-REPO]` edge names a concrete artefact on both ends (the publish version, the re-pin
target, the gate that closes the swap); (c) the two `[HINGE]` nodes carry the agent-never-pushes
clause; (d) every visual wave node in Batches 1-3 + L.W5 names `proof:live-verified-ledger` (not
prose "capture") as a close-edge; (e) the critical path is stated and its leaves are all authored
(no void). Bite: add a batch node with no spec → RED; leave the re-pin step out of the
publish→adopt chain → RED; cite a fictional CI gate (pptx-200-in-CI) on a hinge node → RED.
