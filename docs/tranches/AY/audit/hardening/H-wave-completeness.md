# H-wave-completeness — adversarial hardening: is the AY + L wave SET complete?

**Lane** H-wave-completeness · **Mode** RED-TEAM (read-only; findings + wave-spec inputs) ·
**HEAD** glass-ui `at-dock-convergence`, slides `main` · **Captured** 2026-06-09 ·
**Verdict: NOT-COHESIVE** (the wave set has TWO un-reconciled numbering systems, ZERO authored
AY wave specs, three phantom L waves, ~6 corpus/finding items with NO owning wave, and ~10 waves
authored on a STALE base that would RE-LAND shipped work — when ALL executed AS WRITTEN they do
NOT perfect the library + slides).

---

## TL;DR for the orchestrator

The job of this lane is the meta-question: map EVERY corpus item + sibling finding to an AY or L
wave; find gaps with no owner, redundant/superseded waves, and decide whether the executed set
PERFECTS the two products. The answer is **no, not as the set stands** — for five structural
reasons:

1. **DUAL NUMBERING, UN-RECONCILED.** AY has two plan documents with two incompatible wave-ID
   schemes. `AY.md` uses 30 named waves (`W-CON1`…`W-PUB1`). `AY-DRAFT.md` uses 9 positional
   close-waves (`AY.W0`…`AY.W8`). They are NOT the same set re-labeled — the DRAFT is the AX-close
   batch ONLY (god-modules, gates, publish), while `AY.md` Band E re-expresses the SAME close as
   named waves (`W-GOD1`/`W-CSS1`/`W-LEG1`/`W-LIVE1`/`W-CLOSE1`/`W-PUB1`/`W-NDA`). Every sibling
   hardening lane folds into the NAMED system (130 named-wave refs vs 2 stray `AY.W0`/`AY.W7`
   refs), so the DRAFT's W0-W8 IDs are effectively orphaned — yet the DRAFT is the ONLY document
   that actually AUTHORS the close waves (defect→objective→edit-sites→HARD-GATE per wave). The
   named Band-E rows in `AY.md` are one-line table cells. **An orchestrator dispatching off `AY.md`
   gets named waves with no spec; dispatching off `AY-DRAFT.md` gets specs under IDs nothing else
   references.** This must reconcile to ONE scheme before any dispatch (`AY.md:92-98` ↔ `AY-DRAFT.md:138-148`).

2. **ZERO AY WAVE SPECS EXIST.** `docs/tranches/AY/waves/` does not exist (confirmed `ls` exit 1).
   All 30 AY waves are one-line `AY.md` table rows. Per `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"` +
   `§"Goal criterion + completion criterion"` a wave needs a defect→objective→edit-sites→
   evidence-backed-HARD-GATE spec; NONE is authored. Six sibling lanes independently flag this as
   a BLOCKER (H-storybook F1, H-dock, H-fourier §6, H-slides-adopt-deploy F2, H-godmodule F7,
   H-precept-drift F5). This is the single largest completeness gap: a 30-wave plan with 0 authored
   waves is not a dispatchable set.

3. **THREE PHANTOM L WAVES.** `L.md:54-56` lists `L.W-MOB`, `L.W-CHR`, `L.W-ADOPT`, but `L-DRAFT.md`
   §2 (`:87-95`) jumps `L.W4 → L.W5` with NO row for any of them, and `docs/tranches/L/waves/`
   contains ONLY `L.W1`…`L.W7` (7 files, confirmed). The single most-cited directive of the whole
   engagement — the constellation-consume root-cause fix (corpus #1/#2/#28, the "exemplar to KILL")
   — is carried by `L.W-ADOPT`, a one-line `L.md` row with no DRAFT entry and no spec file. The
   DRAFT and the published plan disagree on the wave set itself.

4. **~6 ITEMS WITH NO OWNING WAVE (NET-NEW NEEDED).** The corpus + sibling findings name work that
   maps to NO existing AY/L wave: glass cohesion enforcement (H-glass-cohesion F6 — Drawer is
   OPAQUE, a BLOCKER; no wave owns it), motion cohesion library-wide (H-motion-cohesion — "NONE …
   AY has NO motion-cohesion wave"), a11y/perf (H-a11y-perf — 6 findings incl. Safari prefix +
   maximal-glass compositing cost, no wave owns them), the carry-closure register completeness
   (H-chronic-defer — `AY.W-CARRY`), the per-component frontend-design convergence (H-past-conversation
   — `AY.W-CONVERGE`), the colocation/design-idiom restructure (H-past-conversation — `AY.W-COLOCATE`),
   the deck-chassis lift (H-slides-adopt-deploy F8 — `AY.W-DECK`), and the second bespoke-copy class
   (H-overfitting F4 — the feedback-coder Fourier arm). These are real corpus-derived obligations
   with no home in the 30-wave + 10-wave set.

5. **~10 WAVES ON A STALE BASE (would RE-LAND shipped work).** SEVEN sibling lanes independently
   prove the AUDIT-LEDGER is stale relative to AX HEAD: warp shipped (AX.W17), slider two-only
   shipped (AX.W59), fourier-field exported + live-consumed, the `--ui-scale` touch/type system
   shipped (AX.W51), the 4 READMEs exist. Waves authored to the AY.md text (W-CON2 "build warp",
   W-SLD1 "collapse the zoo", W-SCALE1 "build the system", W-FF2 "abstract + export", W-DOC1 "write
   READMEs") would re-do shipped work or re-litigate settled dispositions. **The executed set would
   churn, not perfect.** A net-new `AY.W0-REGROUND` is the prerequisite that several lanes demand.

The corpus-to-wave coverage is otherwise broad — every NUMBERED corpus item (1-30) does route to a
named wave. The failure is not "an item has no wave"; it is "the waves are mis-scoped, dual-numbered,
unauthored, partly phantom, and partly aimed at already-shipped work." That is a NOT-COHESIVE set.

---

## §1 — The dual-numbering defect (the load-bearing structural finding)

`AY.md §2` is organized into Bands A-E with **30 named waves**:

| Band | waves |
|---|---|
| A (SOTA component perfection) | W-CON1/2/3, W-AUR1/2/3/4, W-BLOB1/2/3, W-FF1/2, W-DOCK1/2/3 |
| B (library-wide systems) | W-SCALE1/2, W-SLD1/2 |
| C (storybook + docs) | W-SB1/2/3, W-DOC1 |
| D (instrument-chassis) | W-IC1 |
| E (the AX close) | W-GOD1, W-CSS1, W-LEG1, W-LIVE1, W-CLOSE1, W-PUB1, W-NDA |

`AY-DRAFT.md §2` is organized as **9 positional waves** (`AY.W0`…`AY.W8`) covering ONLY the
AX-close batch (the same scope as `AY.md` Band E):

| DRAFT wave | scope | AY.md Band-E equivalent |
|---|---|---|
| AY.W0 | owed-DELTA capture sweep (W19+W56) | (no named equivalent — DROPPED in AY.md) |
| AY.W1 | TS/Vue god-module carves | W-GOD1 |
| AY.W2 | CSS carves + .css-aware gate | W-CSS1 |
| AY.W3 | legacy-gate hardening | W-LEG1 |
| AY.W4 | live-gate CI decision | W-LIVE1 |
| AY.W5 | consumer-adoption ledger (W34 port) | (no named equivalent — DROPPED in AY.md) |
| AY.W6 | terminal close (proof:ay-final + FINAL) | W-CLOSE1 |
| AY.W7 | publish hinge | W-PUB1 |
| AY.W8 | residual-planned umbrella triage | (no named equivalent — DROPPED in AY.md) |

**Three DRAFT waves have NO named-system equivalent** (AY.W0 owed-DELTA, AY.W5 consumer-ledger,
AY.W8 residual-triage) — they fell out when `AY.md` re-expressed the close. So the named system is
NOT a superset: it DROPPED the owed-DELTA sweep (which H-cardinal §6 + AY-DRAFT D8 prove is real —
W56 is `live-pending (DELTA owed)`), the consumer-staleness ledger (which AY-DRAFT D6 proves is
`proof:consumer-staleness` born-RED on 12 real stale imports), and the residual-planned triage
(AY-DRAFT D11 — W20/W21/W28-W32/W35/W39/W41/W42/W43/W49). Conversely the DRAFT has NO Band A/B/C/D
(the entire SOTA-perfection body). **Neither document is complete; they cover disjoint halves under
incompatible IDs.**

Worse, the sibling lanes route into a THIRD informal layer of net-new named waves (`AY.W-CARRY`,
`AY.W-CONVERGE`, `AY.W-COLOCATE`, `AY.W-DECK`) that exist in no plan document at all.

**The fix:** ONE reconciled wave inventory (§5 below) under ONE numbering scheme (the named
`W-*` system, since 130 sibling refs use it), folding the three dropped DRAFT waves back in as
named waves (W-DELTA0, W-CONSUMER, W-TRIAGE), and authoring the ~6 net-new waves. THEN author all
specs under `docs/tranches/AY/waves/`.

---

## §2 — Corpus → wave coverage map (every standing request, owner, gap)

I walked all 30 corpus items (PROMPT-CORPUS §B-F) + the recap directive against the AY/L wave set.
Coverage status: **OWNED** (a wave exists), **OWNED-BUT-MIS-SCOPED** (wave exists but the scope is
stale/wrong), **PHANTOM** (named in plan, no spec/DRAFT row), **UNOWNED** (no wave at all).

### Corpus §B — glass-ui (AY)

| # | corpus item | owning wave | status | note |
|---|---|---|---|---|
| 1 | Constellation first-class + slides consumes | W-CON1/3 + L.W-ADOPT | OWNED-BUT-MIS-SCOPED | lib component DONE (AX.W17); wave should be VERIFY+export, not build (H-constellation, H-past-conv #2) |
| 2 | click WARP + easter eggs | W-CON2 | OWNED-BUT-MIS-SCOPED | warp SHIPPED+gated (AX.W17, `proof:constellation-warp-live`); only easter eggs net-new (H-precept-drift F1, H-proto-constellation-warp) |
| 3 | constellation translucency both modes | W-CON1 | OWNED | genuine tune; `--constellation-alpha` exists |
| 4 | touch-target + type-scale GENERAL | W-SCALE1/2 | OWNED-BUT-MIS-SCOPED | `--ui-scale` system SHIPPED (AX.W51); residue = form-atom floors + desktop-fluid ladder; `proof:touch-target` is PHANTOM (H-touch-scale, H-a11y-perf H-5) |
| 5 | dock lockstep + rail + dock-with-slider | W-DOCK1/2/3 | OWNED-BUT-MIS-SCOPED | lockstep arch SOLVED + gated; gate is TAUTOLOGICAL (H-dock HEADLINE); progress-bar half is a SLIDES concern mis-folded as glass-ui (H-dock D4) |
| 6 | aurora SOTA | W-AUR1/2/3/4 | OWNED-BUT-MIS-SCOPED | core+OKLCh+WGSL shipped; "FULL migration"/atoms partly done; `≥N` gate placeholder (H-aurora, H-research-aurora, H-precept-drift F4) |
| 7 | blob SOTA | W-BLOB1/2/3 | OWNED | the largest open live-truth gap (H-cardinal §6 W08/W15/W16 no DELTA) |
| 8 | fourier-field fold | W-FF1/2 | OWNED-BUT-MIS-SCOPED | element EXISTS+exported+live-consumed; W43 intensity-fix NEVER landed (component visibly broken); ≥2nd consumer is LIVE not hypothetical (H-fourier) |
| 9 | slider zoo → scrubber+spectrum | W-SLD1/2 | OWNED-BUT-MIS-SCOPED | collapse SHIPPED (AX.W59); design CONTRADICTION (rounded-knob ask vs locked cylinder); residue = reconcile + consumer-boundary gate (H-slider) |
| 10 | dock-with-slider broken | W-DOCK3 | OWNED-BUT-MIS-SCOPED | contract wired; no captured DELTA; CLAUDE.md cites a non-existent story (H-dock D5, H-slider F5) |
| 11 | storybook prune + restructure | W-SB1/2/3 | OWNED-BUT-MIS-SCOPED | half the named routes already actioned (AX.W19); gates already PASS; orphan COMPONENTS survive a route-only prune (H-storybook, H-overfitting F3) |
| 12 | instrument-chassis scope | W-IC1 | OWNED (thin) | a decision-only wave; NO focused lane challenged it — under-examined |
| 13 | DI/boundaries; no legacy | W-GOD1/CSS1/LEG1 | OWNED | DI mostly CLOSED (H-godmodule F8); residue = god-modules + legacy gates |
| 14 | storybook perfected + research READMEs | W-DOC1 + W-SB3 | OWNED-BUT-MIS-SCOPED | 4 READMEs EXIST (H-precept-drift F4); W-DOC1 is a quality-uplift not a from-zero write; W-SB3 language gate is prose-only (H-storybook F9) |

### Corpus §C/§D — slides (L)

| # | corpus item | owning wave | status | note |
|---|---|---|---|---|
| 15 | 5/6/7 cohesive rebuild | L.W1 | OWNED-BUT-MIS-SCOPED | xray-redolent headline UNDER-SPECCED (no tokens/composition); eyeball gates (H-slides-567 F2/F3) |
| 16 | xray redolent + two-column + links | L.W1 | OWNED-BUT-MIS-SCOPED | headline string WRONG in every doc; blue-highlight mis-described (H-slides-567 F2) |
| 17 | nutrition-label UNTRUE → reword | L.W1/W2 | OWNED-BUT-MIS-SCOPED | the "fix" RATIFIES the over-claim (non-fix; H-slides-567 F4) |
| 18 | ~$5M clip | (done) | OWNED | verify in capture |
| 19 | slide renames | (done) | OWNED | verify cohesion |
| 20 | don't name Pitt + hypothetical | L.W3 | OWNED | — |
| 21 | "People and AI" caption overlap | L.W3 | OWNED | — |
| 22 | ~$5M arithmetic honest | L.W2 | OWNED-BUT-MIS-SCOPED | circular dependency on L.W4; §F already constrains it (H-slides-backlog F3) |
| 23 | constellation every befitting slide | L.W1 + AY | OWNED | bookend contradiction (H-slides-567 F1) |
| 24 | mobile squish/occlusion/etc | **L.W-MOB** | **PHANTOM** | no DRAFT row, no spec; done sub-items mis-tracked (H-slides-mobile-chrome) |
| 25 | access-modal glass-styled; locked-blur | **L.W-CHR** | **PHANTOM** | no DRAFT row, no spec; modal+pptx ALREADY DONE; locked-blur INVERTED (H-slides-mobile-chrome F4) |
| 26 | pptx light/dark popover | **L.W-CHR** | **PHANTOM** | ALREADY DONE (`DeckSettings.vue`); wave hunts done work (H-slides-mobile-chrome F4) |
| 27 | named language rewrites | L.W2/W4 | OWNED | "Let's work together" is itself rule-8 (H-slides-backlog) |
| 28 | slides consume glass-ui every befitting | **L.W-ADOPT** | **PHANTOM** | no DRAFT row, no spec; deck-CHASSIS unaddressed (H-slides-adopt-deploy F1/F8) |
| 29 | feedback-coder honesty + J-docs | L.W6/W7 | OWNED-BUT-MIS-SCOPED | 0.72 gate blesses wrong metric; J is unexecuted plan; option-B is a phantom-fold (H-feedback-coder) |
| 30 | recap/augment/chronic/multi-agent | (this audit) | OWNED | the meta-process |

**Coverage verdict:** every numbered corpus item routes to SOME wave — there is no item with
literally zero owner. BUT 3 L items (24/25/26/28) route to PHANTOM waves; ~13 items route to
MIS-SCOPED waves (stale base or wrong scope); and the items below (§3) route to NO wave at all.

---

## §3 — Items with NO owning wave (the net-new set)

These are corpus-derived or finding-derived obligations that map to NO existing AY/L wave row:

| # | obligation | source | proposed net-new wave |
|---|---|---|---|
| N1 | **Glass cohesion enforcement** — `.glass-drawer` is OPAQUE (BLOCKER); Slider off `--glass-level`; always-wired specular tracks (keyframes-I.W6); no inventory-complete gate | H-glass-cohesion F1-F6 | **AY.W-GLASS** (the inventory-complete `proof:glass-cohesion` + Drawer re-author + Slider onto the knob) |
| N2 | **Motion cohesion library-wide** — `--dock-press-spring` off-doctrine; cartoon-surface violates §6; `proof:animation-coherence` RED + not in CI + too-narrow scope; Toast on tw-animate-css | H-motion-cohesion F1-F9 ("AY has NO motion-cohesion wave") | **AY.W-MOTION** (widen `proof:animation-coherence` to full surface set + register-assignment + CI; reconcile the off-doctrine survivors) |
| N3 | **a11y/perf/Safari** — W55 darken DORMANT (never engaged); unprefixed backdrop-filter ships (Safari trap); useSpecularTracking layout-thrash per pointermove; maximal-glass nested-backdrop cost ungated; dark-contrast oracle stale post-W54 | H-a11y-perf H-1..H-6 | **AY.W-A11Y-PERF** (engage W55 by default; ship the webkit prefix in dist; rAF-coalesce specular; frame-budget gate; re-derive the contrast oracle for glass) |
| N4 | **Carry-closure register completeness** — register covers 3 of ~25 booked items; G-4/G-5/G-6 promised-never-encoded; slides has NO carry-closure gate; `proof:no-bespoke-constellation` named-but-unbuilt | H-chronic-defer §1-§6 | **AY.W-CARRY** (onboard the full AT BOOK backlog; completeness clause; slides-side register) |
| N5 | **Per-component frontend-design convergence** — the user's verbatim "6 frontend-design agents … converge on a library optimum … gaps in glass-ui vs slides"; W-SB3 (storybook language) is a thin proxy | H-past-conversation §a | **AY.W-CONVERGE** (per-major-component glass-ui↔slides FIT audit → keep/extend/fix dispositions) |
| N6 | **Colocation + design-idiom restructure** — the user's verbatim "feature-dir colocation … sub-component dirs … localized design-idiom area"; W-GOD1 is line-count-only, W-CSS1 is carve-only | H-past-conversation §b/§c, H-godmodule | **AY.W-COLOCATE** (the structural feature-dir + `@apply`/`@utility`/`@theme` idiom-home pattern) |
| N7 | **Deck-chassis lift** — slides `src/deck/` is a wholesale bespoke chassis, SOURCE-marked "consumer #1 of the eventual `/deck`"; glass-ui ships only `/deck-progress`; the real "befitting component → glass-ui" body | H-slides-adopt-deploy F8 | **AY.W-DECK** (lift the deck chassis to `/deck` under ≥2-consumer bar, OR an explicit keep-bespoke decision) |
| N8 | **Second bespoke-copy class** — the feedback-coder Fourier deck arm (`theme.css --m-red: var(--viz-fourier)` + DESIGN-FOURIER*); `evalFourier` dead export; header-ribbon/glass-panel/useTokenColor orphan COMPONENTS | H-overfitting F2/F3/F4 | fold into **L.W-ADOPT** (CLASS not instance) + **W-SB1** (component-RETIRE verdict, not route-prune) |
| N9 | **The three dropped DRAFT waves** — owed-DELTA sweep (W19+W56), consumer-staleness ledger (12 stale imports), residual-planned triage (10 AX `planned` waves) | AY-DRAFT D6/D8/D11; H-cardinal §6 | **W-DELTA0 + W-CONSUMER + W-TRIAGE** (re-fold the DRAFT into the named system) |

That is **~9 net-new waves** the current 30+10 set does not contain. Several (N1/N2/N3) are
BLOCKER-class — the glass Drawer is opaque, the motion gate is RED and out of CI, and W55 is inert
in every shipping surface. A "perfected library" cannot ship with a glass Drawer that paints no
glass and a maximal-glass default that is unreadable over the bright backgrounds W60 is supposed
to add.

---

## §4 — Redundant / superseded / mis-scoped waves (the prune-or-recast set)

| wave | issue | disposition |
|---|---|---|
| **AY.W0 / W5 / W8 (DRAFT)** vs **AY.md Band E** | dual-numbering — DRAFT authors close waves the named system dropped | RECONCILE: fold W0→W-DELTA0, W5→W-CONSUMER, W8→W-TRIAGE into the named system; retire the DRAFT scheme |
| **W-CON2 "build warp"** | warp SHIPPED+gated (AX.W17) | RE-CAST: VERIFY warp live (capture) + easter-eggs net-new only |
| **W-SLD1 "collapse the zoo"** | collapse SHIPPED (AX.W59) | RE-CAST: reconcile the rounded-knob-vs-cylinder design CONTRADICTION (user-judged capture); doc-currency; consumer-boundary gate. NOT a re-collapse |
| **W-SCALE1 "build the system"** | `--ui-scale` system SHIPPED (AX.W51) | RE-CAST: EXTEND `--ui-scale` to form-atoms + desktop-fluid ladder; do NOT fork a parallel `--touch-target` axis; the `proof:touch-target` gate is PHANTOM — author it as a real axe-runtime gate |
| **W-FF2 "abstract + export"** | element EXISTS+exported | RE-CAST: LAND the W43 intensity fix (component visibly broken); resolve the LIVE cross-repo math duplication; restore 3-substrate parity |
| **W-DOC1 "write READMEs"** | 4 READMEs EXIST | RE-CAST: quality-uplift to the research-backed bar, not a from-zero write |
| **W-DOCK1 "diagnose from first principles"** | lockstep arch SOLVED + gated | RE-CAST: VERIFY-OR-FALSIFY (capture the live collapse; re-diagnose only if the lag persists); the lockstep gate is TAUTOLOGICAL — author a real entering-child onset assertion |
| **W-DOCK3 progress-bar half** | no glass-ui edit-site; already de-docked in slides H.W2 | RE-HOME the progress-bar clause to L (verify-row); the glass-ui gate asserts only what glass-ui owns |
| **W-SB1 "remove routes"** | half the routes don't exist (AX.W19); gates already PASS | RE-CAST: per-route KEEP/FIX/RETIRE verdict (the H-storybook §2 table); component-RETIRE verdict not route-prune; NEW gates that bind the OPEN work |
| **L.W-MOB / W-CHR / W-ADOPT** | PHANTOM (no DRAFT row, no spec) | AUTHOR them; reconcile `L.md` ↔ `L-DRAFT.md` ↔ `waves/`; re-scope W-CHR to the live gap (locked-blur inversion), not done work |

No wave should be DELETED outright — each carries a real (if mis-scoped) obligation. The prune is a
RE-CAST + RECONCILE, not a removal. The one genuine retirement candidate is the DRAFT W0-W8
ID scheme (superseded by the named system once the three dropped waves are folded back).

---

## §5 — The reconciled wave inventory (what the SET should be)

When the dual-numbering is reconciled, the stale base is corrected, and the net-new waves are
added, the complete AY + L set is:

### AY (glass-ui) — proposed reconciled inventory (~34 waves)

**Band 0 — re-ground (net-new, BLOCKS all else)**
- **W0-REGROUND** — re-derive the AUDIT-LEDGER status column vs AX `PROGRESS.md` + live gates +
  source; mark warp/slider/ui-scale/fourier/READMEs DONE-or-PARTIAL with file:line; correct the
  5 mis-marked rows (H-precept-drift, H-past-conversation, H-overfitting F1 all demand this).

**Band A — SOTA component perfection (re-cast to VERIFY+perfect)**
- W-CON1 (translucency tune + RO re-fit), W-CON2 (warp VERIFY + easter-eggs net-new), W-CON3 (export-ready VERIFY + `proof:no-bespoke-constellation` homed in SLIDES)
- W-AUR1 (research, N-bound gate), W-AUR2 (the genuine migration sliver, not "FULL"), W-AUR3 (painterly), W-AUR4 (interactive)
- W-BLOB1 (research), W-BLOB2 (visual + DELTA — the largest live-truth gap), W-BLOB3 (interaction + frame-budget)
- W-FF1 (rebase the RED W43 spec), W-FF2 (LAND the intensity fix + math-leaf duplication + parity)
- W-DOCK1 (VERIFY-OR-FALSIFY the lag), W-DOCK2 (real entering-child lockstep gate + rail cohesion), W-DOCK3 (dock+slider DELTA + story; progress-bar re-homed to L)

**Band B — library-wide systems**
- W-SCALE1 (EXTEND `--ui-scale` + desktop-fluid ladder), W-SCALE2 (form-atom hit-area utility + real `proof:touch-target` axe gate)
- W-SLD1 (reconcile the rounded-knob design contradiction), W-SLD2 (consumer-boundary gate + verify)

**Band C — storybook + docs**
- W-SB1 (per-route verdict + component-RETIRE for orphans + native-top-layer fold + header-ribbon retire), W-SB2 (scattered-dock triage + metric co-location + speedtest-boundary closed), W-SB3 (real language-consistency gate), W-DOC1 (README quality-uplift)

**Band D — instrument-chassis**
- W-IC1 (the scope decision — UNDER-EXAMINED; no focused lane challenged it)

**Band E — the AX close (the DRAFT folded into named waves)**
- W-DELTA0 (owed-DELTA sweep W19+W56 — the dropped DRAFT W0), W-GOD1 (TS/Vue carves), W-CSS1 (CSS carves + .css-aware CI gate), W-LEG1 (legacy gates), W-LIVE1 (live-gate CI decision + cardinal-gate extension to `complete` rows + AY-pathing), W-CONSUMER (consumer-staleness ledger — the dropped DRAFT W5), W-CARRY (carry-closure register completeness — net-new), W-CLOSE1 (terminal close + FINAL + overfitting audit + budget rebaseline), W-TRIAGE (residual-planned umbrella — the dropped DRAFT W8), W-PUB1 (publish hinge), W-NDA (native-drawer WATCH row)

**Band F — cohesion + structure (net-new)**
- W-GLASS (glass cohesion inventory gate + Drawer re-author + Slider onto the knob), W-MOTION (motion cohesion gate widen + CI + register-assignment), W-A11Y-PERF (W55 default-engage + Safari prefix + specular rAF + frame-budget gate + glass-aware contrast oracle), W-CONVERGE (per-component glass-ui↔slides FIT audit), W-COLOCATE (feature-dir + design-idiom restructure), W-DECK (deck-chassis lift decision)

### L (slides) — proposed reconciled inventory (~12 waves)
- L.W1 (5/6/7 rebuild — with the xray-redolent token/composition spec + machine gates per H-slides-567), L.W2 (P0s — facts pulled forward per H-slides-backlog), L.W3 (P1 redundancy — deletion-proof gate), L.W4 (conformance gate re-arch + cardinal-gate port + OQ decisions table)
- **L.W-MOB** (AUTHOR — manifest↔position gate, per-slide DELTA, real occlusion gate), **L.W-CHR** (AUTHOR — re-scoped to locked-blur inversion + verify done work + stale-count sweep), **L.W-ADOPT** (AUTHOR — befitting-component inventory + constellation integration-model port + `?freeze` seam + CLASS-level bespoke-copy gate)
- L.W5 (deploy — gate decomposed into verifiable artefacts), L.W6 (feedback-coder honesty — corrected metric gate + retracted-floor sites), L.W7 (J-docs — kill option-B phantom-fold, A-clean cherry-pick or delete)

That is the COMPLETE set. When every wave in it executes to its (corrected) hard gate, the library
+ slides are perfected: glass is cohesive (incl. the Drawer), motion rides one doctrine, every
shared visual is a perfected exported primitive its consumers compose with no bespoke copies, the
storybook is pruned to a coherent demo, touch/type/a11y is a library-wide system with real gates,
the chronic-defer register is complete, and both decks deploy live with captured DELTAs.

---

## §6 — Chronic-misses (the wave-set-level recurrence)

- **The dual plan-document drift** — AY carries `AY.md` + `AY-DRAFT.md` with incompatible wave
  schemes; L carries `L.md` + `L-DRAFT.md` that disagree on the wave SET (3 phantom L waves). The
  AX tranche had the same `AX.md` ↔ DRAFT drift the GOLDEN.md MASTER-PLAN had to consolidate. This
  is a ≥2-tranche planning-coherence chronic: the plan and its draft diverge and nobody reconciles
  before dispatch.
- **The stale-base ledger** — the AUDIT-LEDGER was authored at the session limit, never re-grounded
  ("Re-run the parallel auditors post-2:30pm-ET reset" — the re-run never happened). The user's own
  MEMORY (`project_workflow_stale_worktree_trap`) names this exact failure. SEVEN sibling lanes
  independently caught the same 5 mis-marked rows. This is the meta-chronic that spawns re-litigation.
- **Phantom hard gates across the set** — `proof:no-bespoke-constellation`, `proof:touch-target`,
  the pptx-200-in-CI gate, the "axe pass" gate (no axe harness), the W-AUR1/W-BLOB1 `≥N` placeholder
  — multiple waves name gates that do not exist. A wave whose hard gate is fictional cannot close on
  evidence (H-overfitting F5, H-a11y-perf H-5, H-slides-adopt-deploy F5, H-slides-mobile-chrome §6).
- **Net-new cohesion waves perennially homeless** — glass cohesion, motion cohesion, and a11y/perf
  have been findings since the glass-first/adaptive-glass landings (AX.W54/W55) and never got an
  enforcing wave. They are about to slip a tranche AGAIN with no AY home.

---

## §7 — Convergence criteria (the acceptance bar for THIS lane)

The wave set is "complete" when ALL hold:

1. **ONE numbering scheme.** `AY.md` and `AY-DRAFT.md` reconcile to the named `W-*` system; the
   three dropped DRAFT waves (owed-DELTA, consumer-ledger, residual-triage) are folded back as named
   waves; `L.md` ↔ `L-DRAFT.md` ↔ `waves/` agree on the L set. A reader of EITHER plan document gets
   the SAME wave inventory.
2. **Every wave is authored.** `docs/tranches/AY/waves/` exists with a spec per wave (defect →
   objective → edit-sites → evidence-backed HARD GATE + goal/completion criteria); the three phantom
   L waves (W-MOB/W-CHR/W-ADOPT) have spec files.
3. **Every corpus item + sibling finding maps to a named, authored wave** — the §2 + §3 tables
   resolve to zero UNOWNED and zero PHANTOM rows; the ~9 net-new waves (§3) are added.
4. **No wave is on a stale base.** A net-new W0-REGROUND re-grounds the AUDIT-LEDGER to HEAD
   file:line; every VERIFY-vs-build mis-scope (§4) is re-cast; no wave re-lands shipped work.
5. **Every hard gate names a real artefact.** No phantom `proof:*`; no `≥N` placeholder; no
   eyeball/adversarial-read gate; the cardinal-lesson DELTA discipline is machine-enforced
   (AY-pathed + slides-ported `proof:live-verified-ledger`).
6. **The executed set provably perfects both products** — the BLOCKER-class cohesion gaps (opaque
   Drawer, RED motion gate, dormant W55) have enforcing waves; both decks deploy live with captured
   DELTAs; no consumer carries a bespoke copy of a befitting glass-ui visual.

---

## §8 — waveSpecInputs (concrete material for the reconcile + the net-new waves)

**For the RECONCILE (a W0-PLAN / pre-dispatch step):**
- **Defect:** `AY.md:92-98` (named Band-E waves) ↔ `AY-DRAFT.md:138-148` (positional W0-W8) are
  disjoint schemes; `AY-DRAFT.md` W0/W5/W8 (owed-DELTA, consumer-ledger, residual-triage) have NO
  named equivalent; `docs/tranches/AY/waves/` does not exist; `L.md:54-56` lists L.W-MOB/W-CHR/W-ADOPT
  absent from `L-DRAFT.md:87-95` + `docs/tranches/L/waves/`.
- **Objective:** ONE named-wave inventory (§5); author every spec; fold the 3 dropped DRAFT waves +
  the ~9 net-new waves; reconcile the L set.
- **Edit-sites:** `docs/tranches/AY/AY.md §2` (the consolidated table), NEW `docs/tranches/AY/waves/*.md`
  (one per wave), `docs/tranches/AY/PROGRESS.md` (NEW — H-cardinal §3 demands it for the AY-pathed
  cardinal gate), `slides/docs/tranches/L/L.md` + `L-DRAFT.md` + NEW `waves/L.W-{MOB,CHR,ADOPT}.md`.
- **HARD GATE (evidence-backed):** a `proof:wave-inventory-coherent` (or a doc-reconciliation
  checklist) asserting (a) every wave-ID in `AY.md §2` has a spec file in `waves/`; (b) every spec
  file's ID appears in `AY.md §2`; (c) the AUDIT-LEDGER row count = the corpus item count with each
  routed to a named wave; (d) `L.md` wave-IDs = `waves/` files = `L-DRAFT.md` rows. Bite: add a
  `W-FOO` row with no spec → RED; leave a phantom L wave → RED.

**For W0-REGROUND (the stale-base fix, BLOCKS all Band A):**
- **Defect:** `AUDIT-LEDGER.md:21,23,27,28,33` mark warp/touch-scale/fourier/slider/READMEs
  UNADDRESSED/DEFERRED; HEAD ships all five (`Constellation.vue:52` warpOnClick AX.W17;
  `tokens.css:1172` `--ui-scale` AX.W51; `slider/index.ts:42` two-only AX.W59;
  `fourier-field/index.ts` exported; the 4 `README.md` files).
- **Objective:** re-derive each status vs AX `PROGRESS.md` + the named proof gate + live source;
  re-label DONE/PARTIAL with file:line (the AT W0-L4 ledger format).
- **HARD GATE:** a re-grounded AUDIT-LEDGER where every DONE/PARTIAL row cites a HEAD file:line +
  the landed git SHA; cross-checked against the H-touch-scale / H-slider / H-overfitting refutations;
  zero row marked undone for live-verified code.

**For W-GLASS (net-new, BLOCKER — N1):**
- **Defect:** `drawer.css:35-51` `.glass-drawer { background-color: var(--background) }` — OPAQUE, no
  `backdrop-filter`, no `--glass-level`, no oklab tint (H-glass-cohesion F5); `Slider.vue:199`
  `blur(2px)` literal off `--glass-level` (F3); `glass.css:151-154` always-wired specular `::before`
  (F1); `proof:glass-one-model` is an 8-file canary not an inventory (F6).
- **Objective:** re-author Drawer onto `glass-floating`; route Slider onto `--glass-level`; make the
  moving-specular transition opt-in (Card pattern); an inventory-complete `proof:glass-cohesion` gate.
- **HARD GATE:** every glass surface flattens to solid at `--glass-level: 0` (π readback incl. Slider
  + Drawer); `proof:glass-cohesion` enumerates the full surface set + the keyframes-I.W6 track count → 0.

**For W-MOTION (net-new — N2):**
- **Defect:** `tokens.css:1771` `--dock-press-spring: var(--spring-bouncy)` off-doctrine (F1);
  `cards.css:40-42` translate-bouncy + box-shadow-ease-apple (F2); `proof:animation-coherence`
  (`package.json:670`) NOT in CI + RED on the speedtest `--ease-apple-spring` census (F5); scans only
  3 CSS files (F6).
- **Objective:** re-point the off-doctrine survivors; widen the gate to the full animated-surface set
  + a register-assignment assertion; put it in CI green.
- **HARD GATE:** `proof:animation-coherence` GREEN + CI-tagged + register-assignment-asserting; zero
  hardcoded ms/bezier/bare-keyword survivors on surface transitions.

**For W-A11Y-PERF (net-new — N3):**
- **Defect:** W55 darken DORMANT (`grep glass-backdrop slides/src demo/` empty, H-a11y-perf H-1);
  `dist/styles/glass.css` ships 1 webkit-prefixed of 16 backdrop-filter (Safari trap, H-2);
  `useSpecularTracking.ts:48-67` getBoundingClientRect + matchMedia per pointermove (H-3); no
  frame-budget gate for maximal-glass nesting (H-4); `proof-dark-semantic-contrast.mjs` oracle over
  solid `--card` not the translucent plate (H-6).
- **Objective:** engage W55 by default; ship the webkit prefix in dist; rAF-coalesce specular; a
  nested-backdrop frame-budget gate; re-derive the contrast oracle for glass.
- **HARD GATE:** π contrast readback over the ACTUAL shipping glass-over-bright surface clears 4.5:1;
  a gate asserts the webkit prefix present in shipped CSS; a bounded forced-layout count over a
  synthetic pointer sweep.

(W-CARRY, W-CONVERGE, W-COLOCATE, W-DECK inputs are authored in their owning sibling lanes —
H-chronic-defer §6, H-past-conversation §a/§b, H-slides-adopt-deploy F8 — and fold here as
inventory rows.)
