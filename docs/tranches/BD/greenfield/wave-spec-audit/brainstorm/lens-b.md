# wave-spec-audit — brainstorm lens-b (CROSS-ENGINE / PERF-FIRST)

> The Band-E META-PASS over the WHOLE tranche: the 116 BD/union wave specs + the 37 greenfield
> WAVE-AMENDMENTs, audited for cogency / correctness / up-to-dateness / inter-wave coherence /
> DUP / phantom-deps / the cross-cutting DESIGN-ADHERENCE CONSISTENCY GATE. Designed through the
> cross-engine + performance-first lens: the audit is itself a **mechanism**, and the mechanism
> must catch the WebKit/perf traps that ride invisibly through 37 amendments. This is a
> CONSOLIDATING AUDIT, not a per-component greenfield. NO new component is designed here — what is
> "designed anew" is the **audit harness + the consolidated ledger + the consistency verdict**.

---

## 0. CORE IDEA (the lens applied to a doc-audit)

A 116-wave + 37-amendment corpus is a **build graph**, not a pile of prose. The fittest audit is
not 32 agents re-reading prose for vibes — it is a **deterministic, scriptable LINTER over the
corpus-as-graph**, with a small human-judgement residue. Three machine passes produce the evidence;
one synthesis pass produces the ledger. The cross-engine/perf lens is the differentiator: the
single highest-leverage consistency failure in a glass+goo+motion tranche is a **per-item engine
fork** (an item that quietly mints its own `feGaussianBlur`, its own `backdrop-filter:url`, its own
field, its own motion currency) — and a graph-linter finds those in seconds where 32 readers miss
them. The audit's job is to prove the corpus **collapses to ONE of each cross-cutting primitive**
(one `paper-field`, one `<GooFilter>`, one `--motion-weight`/`--ease-cartoon-punch`, one
`.glass-capsule` warm floor, one `.cartoon-cast` caster) and that the build-DAG is acyclic and
phantom-free.

**The three machine passes (all scriptable, all re-runnable to 2-consecutive-clean):**

1. **THE SLUG GRAPH** — extract every `BD.W-…` / `W-…` slug, every `DEPEND`/`CONSUME`/`AUGMENT`/
   `MERGE`/`SUPERSEDE`/`PRUNE`/`EXCISE`/`INHERIT`/`NEW` edge, and every wave-file on disk. Build the
   directed graph. Lint: (a) **phantom node** — a slug DEPENDED-ON but never authored (NEW) by any
   amendment and absent from disk; (b) **cycle** — a DEPEND loop (a build-DAG must be a DAG); (c)
   **dangling supersede** — a `SUPERSEDE`/`PRUNE` target with surviving inbound DEPENDs (a consumer
   still pointing at a retired wave); (d) **dup-mint** — two amendments both authoring the SAME
   primitive under different slugs (the `GLASS-FIELD`/`PAGE-FIELD` class of collision); (e)
   **claims-extant** — a consumer wave that asserts a primitive exists rather than DEPENDing on its
   mint wave.
2. **THE PRECEPT MATRIX** — for each of the ~70 converged items × the 7 precept axes (GLASS, PAPER,
   AURORA/proc, RADII/concentric, CARTOON-shadow, PLAYFUL-ios27-motion, ONE-shared-register),
   grep-detect the **named token/utility/§L-cite** the item composes for that axis. A cell is GREEN
   only if the item cites the ONE canonical source (the same `paper-field` / `--glass-capsule` /
   `--motion-weight` / `.cartoon-cast` / `--radius-concentric` every sibling cites), AMBER if it
   names the axis but via a private fork, RED if absent where the precept demands it. The
   consistency verdict is this matrix.
3. **THE CROSS-ENGINE FLOOR** — for every motion/goo/glass-refract mechanism in the corpus, assert
   the §L7 arm is named (channel + WebKit fallback + fence) and that it routes through the ONE
   `<GooFilter>`/`BD.W-MORPH-FIELD-WELD` rather than a private filter. Lint for the forbidden
   literals: `backdrop-filter: url(#` un-gated by `@supports`, a second `feGaussianBlur`, a raw
   `linear-gradient(-58deg…)` (the `--glass-key` literal leak), naive ellipsoid goo (no
   `path()`/barbell/`smin` neck), a `box-shadow` animation (paint-bound, not compositor) where the
   `.cartoon-cast` transform is mandated.

The pass results feed ONE synthesis: the **CONSOLIDATED TRANCHE-AMENDMENT LEDGER** (every wave:
STAND / AMEND / PRUNE / NEW, in DAG order) + the **consistency verdict** + a **convergence %**.

---

## 1. WHY THIS LENS WINS HERE (perf-first ⇒ graph-first)

The brief offers no live route — the consistency gate references live findings already captured in
the 37 deltas. So my lens cannot be "go measure pixels"; the pixels are measured. The perf-first
discipline transfers to the **audit itself**: a 32-agent prose re-read is the un-optimized
mechanism (O(agents × waves), high variance, no determinism, re-running gives different answers — a
fake-gate generator). The fit mechanism is **one linter + one matrix + one synthesis**, which is
deterministic, cheap, re-runnable, and catches exactly the class of bug the corpus is most exposed
to: **silent forks of cross-cutting primitives**. A glass/goo/motion design system's worst
consistency failure is N parallel implementations of the same effect with N subtly-different
WebKit-incorrect arms; the graph linter is the only mechanism that surfaces all N at once. KISS:
the audit is `grep + sort + comm + a graph walk`, not a fleet.

---

## 2. FINDINGS THE LENS ALREADY SURFACED (the live linter run, this session)

Run against the corpus as it stands (37 amendments, 116 union waves):

### 2a. The DAG is coherent and the cross-engine floor HELD
- **Cross-engine arm coverage = 37/37.** Every amendment names a §L7 arm (sRGB / `@supports`-gate /
  WebKit fallback / PRM). Zero perf-lens gaps. This is the headline good news: the §L7 discipline is
  consistent across the whole corpus, not just the named Safari waves.
- **ONE `<GooFilter>` — the fork is killed.** No amendment mints its own `feGaussianBlur` /
  `filter:url(#goo…)`. The blend-morph-engine GOLDEN's mega-wave correctly **COLLAPSES** to `1 NEW
  WELD (BD.W-MORPH-FIELD-WELD) + 1 NEW token (BD.W-MORPH-PUNCH-TOKENS) + 5 AUGMENTs + 2 RECONCILE +
  0 PRUNE`, unifying the ~7 forked morph mechanisms (`useGooMorph`/`useLiquidMorph`/`useLiquidFlex`/
  `useDockOrientationMorph`/`useDockMorphWindow`/`dockMorphMeasure`/`useDockFission`) behind ONE
  `useMorphField` + ONE `<GooFilter>`. All goo/morph consumers (carousel-deck, dock-fission,
  dock-hub, timeline, the viz fields) DEPEND on `BD.W-GOO-BARBELL-NECK` / `BD.W-MORPH-FIELD-WELD`,
  never re-fork. **This is the single most important consistency win and the linter confirms it.**
- **The carousel SUPERSEDE lands.** `carousel-deck` SUPERSEDEs `W-GOO-CAROUSEL-DECK` +
  `W-GOO-MORPH-REFINE` + `W-PAGER-GOO-MORPH` and INHERITs `W-GOO-CAROUSEL-DECK-FIX2` verbatim (dark
  arm + travel-gate). The three superseded waves have no surviving consumer DEPENDs in the
  amendment graph → the supersede is clean, not dangling.
- **The aurora PRUNE/EXCISE lands.** `W-AURORA-METALLIC` + `W-BLURRED-IMAGE-BG` are PRUNEd (folded
  into NEW `BD.W-AUR-METAL-FINISH` / `BD.W-AUR-IMAGE-SOURCE`); the `BD.W-AUR-METAL.md` 10/11 +
  finish-split framing is EXCISED (superseded by `BD.W-AUR-METAL-FINISH`). The slug `BD.W-AUR-METAL`
  must be retired from disk by the ledger (it is on disk in `union/waves/`).

### 2b. THE ONE REAL DUP-MINT COLLISION (resolved, must be ledger-pinned)
- `BD.W-GLASS-FIELD` (glass-material delta) and `BD.W-PAGE-FIELD` (page-background delta) were both
  going to mint `@utility paper-field`. The page-background amendment **already records the MERGE
  resolution**: ONE `@utility paper-field`, TWO acceptance floors — `BD.W-GLASS-FIELD` = the
  glass-floor arm (~0.012 composite-behind-glass), `BD.W-PAGE-FIELD` = the field-floor (0.045) +
  base-wash + per-route arm. **No dual path.** The ledger MUST pin this: `paper-field` is co-minted
  by `BD.W-PAGE-FIELD`; `BD.W-GLASS-FIELD` becomes its glass-floor acceptance arm (NOT a second
  mint). Nine siblings DEPEND on these names — the canonical resolution must be stated once at the
  top of the ledger so no consumer mis-points.

### 2c. SLUG-PREFIX HYGIENE (the one cross-reference defect)
- `select-forms` cites **`BD.W-GLASS-ABROGATE-GRAY`** but the file on disk is **`W-GLASS-ABROGATE-
  GRAY.md`** (no `BD.` prefix) — and `design-language-edicts` AUGMENTs the un-prefixed
  `W-GLASS-ABROGATE-GRAY`. **A prefix mismatch is a phantom-dependency in disguise** (a graph walk
  treats `BD.W-GLASS-ABROGATE-GRAY` as an un-authored node). The ledger must normalize: pick ONE
  canonical slug (the disk reality `W-GLASS-ABROGATE-GRAY`, OR rename to `BD.W-` and move the file)
  and rewrite the stray citation. Same class for any `W-…` vs `BD.W-…` straddle (the union set has
  both prefixes — `W-DOCK-CORE` vs `BD.W-DOCK-CONSTELLATION`; the ledger states the prefix law).
- `BD.W-MOTION-WEIGHT-CANON` is cited as **"REDUNDANT and NOT authored"** (a non-action). Good — but
  the ledger must record it as an explicit NON-NODE so a future graph walk doesn't re-flag it as a
  phantom. Same for any "considered-then-declined" slug.

### 2d. PHANTOM-SCAN (the perf-lens's deliverable)
- The linter found **~66 cited `BD.W-…` slugs absent from disk**. The overwhelming majority are
  **legitimately NEW** — declared/authored by exactly one amendment (the linter cross-checks: a slug
  is a phantom ONLY if DEPENDED-ON but never matched by a `NEW`/mint declaration). Spot-checked
  authored-correctly: `BD.W-GOO-BARBELL-NECK` (goo-morph), `BD.W-GLASS-KEY-EDGE` (glass-material),
  `BD.W-CARTOON-PUNCH`/`BD.W-CARTOON-CEL-INK`/`BD.W-CARTOON-CASTER` (motion-spring/cartoon-shadow),
  `BD.W-MORPH-FIELD-WELD`/`BD.W-MORPH-PUNCH-TOKENS` (blend-morph-engine), `BD.W-OVERLAY-PANEL`
  (overlays), `BD.W-SCROLL-LIQUID-ENGINE` (scroll-choreography), `BD.W-GOO-BRIDGE-SHELL`
  (carousel-deck). **The grep also produced ~6 truncation artefacts** (`BD.W-BLOB-`, `BD.W-PAGE-`,
  `BD.W-FIELD-AURORA-`, `BD.W-WAVE-FIELD-`) — line-wrapped slugs, not real nodes; the linter's final
  pass must de-wrap before declaring phantoms. **Residual TRUE-phantom risk = the small set a single
  pass cannot disambiguate** (a slug DEPENDED in amendment X, "authored" only by a prose sentence in
  amendment Y that the `NEW`-regex missed). That residue is the ONE place human judgement is owed —
  the synthesis pass resolves each by reading both citation sites.

### 2e. THE CONSISTENCY MATRIX — the cross-cutting verdict
The 7-axis × ~70-item matrix is GREEN-dominant by construction (every per-item brief carried the
engine LAW; the deltas live-grounded each). The matrix's JOB is to catch the locally-converged-but-
globally-divergent cell. Candidates the lens flags for the synthesis to adjudicate:
- **GLASS** — all of tabs/buttons/cards/chips/select/overlays/timeline reconcile onto the ONE
  `.glass-capsule` warm-floor + `paper-field` + `--glass-key` edge (cards' no-dup ledger is the
  template: "NO new field wave, NO new edge wave, NO new motion currency, DEPEND the siblings").
  Matrix asserts NONE re-mint. ✓ on spot-check.
- **CARTOON** — the `.cartoon-cast` inert-child caster (NOT `::before`/`::after` on the carrier — the
  light-dark inset-shadow trap + the white-flip defect) is the ONE caster; buttons (`.btn-punch`),
  cards (`<Card surface="cartoon">`), and the cartoon-shadow item all name it as consumer #1/#2/#3.
  Matrix asserts no item re-introduces an animated `box-shadow` or a `::after`-on-carrier caster.
- **MOTION** — `--motion-weight` (rest 0.62) + `--ease-cartoon-punch` (raw `linear()`, NOT a
  SPRING_PRESETS row) are DEPENDed by ~23 items. Matrix asserts NONE re-author the token, NONE put
  the punch in the spring solver, ALL carve PRM → `--motion-weight:0` / `--ease-standard`.
- **AURORA/PAPER/RADII** — the §3 field-floor (0.045 mean OKLab chroma), the visible paper grain
  (multiply/screen, not self-cancelling overlay), the √φ radii + concentric rule — each axis has ONE
  source wave; matrix asserts every consumer CONSUMEs it.

---

## 3. THE AUDIT HARNESS (the buildable mechanism — KISS, re-runnable)

A single committed script `docs/tranches/BD/greenfield/wave-spec-audit/audit.mjs` (NO new runtime
dep — pure node + the corpus on disk). It emits THREE artefacts the synthesis consumes:

```
audit.mjs
  ├─ pass 1  slug-graph.json     { nodes:[{slug, onDisk, authoredBy, status}],
  │                                edges:[{from,to,kind}], lints:[phantom|cycle|dangling|dup|claims-extant] }
  ├─ pass 2  precept-matrix.csv  rows = items, cols = 7 axes, cells = GREEN|AMBER|RED + cited-source
  └─ pass 3  xengine-floor.json  per-mechanism { item, channel, webkitFallback, fence, forbidden-literal-hits }
```

- **Pass 1** — regex the slugs + the edge-verbs from every `WAVE-AMENDMENT.md` + the union/waves
  filenames; de-wrap line-broken slugs FIRST (join lines, then tokenize); build the graph; run the 5
  lints. A phantom = `DEPENDed ∧ ¬authored ∧ ¬onDisk`. Topo-sort → the DAG build order (Band 0
  tokens/floors → field/edge/caster → consumers); a failed sort = a cycle to break.
- **Pass 2** — for each item, grep its amendment for the canonical source token of each axis
  (`paper-field`, `--glass-capsule`/`--glass-bg-floor`, `--field-h`/§3, `--radius-concentric`,
  `.cartoon-cast`, `--motion-weight`/`--ease-cartoon-punch`, the shared-register cite). GREEN = cites
  the ONE source; AMBER = names a private fork; RED = silent where the precept applies. The matrix IS
  the consistency verdict.
- **Pass 3** — grep every motion/goo/glass-refract mention for its §L7 arm; flag the forbidden
  literals (`url(#` outside `@supports`, second `feGaussianBlur`, `-58deg` literal, animated
  `box-shadow`, naive ellipsoid). This is the perf-lens core — it is what 32 readers miss.

The harness re-runs after the ledger lands → **2-consecutive-clean** is the convergence proof, not a
judge's word. (`feedback_live_pi_oklab_paint_arm` for the chroma readbacks already in the deltas;
this harness is the STRUCTURAL complement to those PIXEL gates.)

---

## 4. THE CONSOLIDATED LEDGER SHAPE (the deliverable)

A single `WAVE-AMENDMENT.md` (the wave-spec-audit's own) + a `LEDGER.md` table, DAG-ordered:

| order | wave (canonical slug) | verdict | source | notes |
|---|---|---|---|---|
| 0 | `BD.W-DESIGN-LANGUAGE-CONGRUENCE` / `BD.W-DESIGN-PRECEPT-AMENDMENT` | STAND | edicts | precept source, applied |
| 1 | `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` · `BD.W-CARTOON-CEL-INK` | NEW | motion/cartoon | the currency every consumer DEPENDs |
| 2 | `BD.W-PAGE-FIELD` (co-mints `paper-field`) ; `BD.W-GLASS-FIELD` = its glass-floor ARM | NEW+MERGE | page-bg/glass | **ONE mint, two floors — pinned** |
| 2 | `BD.W-GLASS-KEY-EDGE` · `BD.W-CARTOON-CASTER` | NEW | glass/cartoon | edge + the inert caster |
| 3 | `BD.W-MORPH-FIELD-WELD` · `BD.W-MORPH-PUNCH-TOKENS` · `BD.W-GOO-BARBELL-NECK` | NEW | morph | ONE `<GooFilter>` + the neck |
| 4+ | tabs/buttons/cards/chips/select/overlays/timeline/viz consumers | AUGMENT | siblings | all DEPEND, none re-mint |
| — | `W-AURORA-METALLIC` · `W-BLURRED-IMAGE-BG` | PRUNE | aurora | folded into AUR-METAL-FINISH / AUR-IMAGE-SOURCE |
| — | `BD.W-AUR-METAL` (10/11 + finish-split framing) | EXCISE | aurora | superseded; retire from disk |
| — | `W-GOO-CAROUSEL-DECK` · `W-GOO-MORPH-REFINE` · `W-PAGER-GOO-MORPH` | SUPERSEDE | carousel | by the GooBridge shell + barbell |
| — | `BD.W-MOTION-WEIGHT-CANON` | NON-NODE | — | considered, declined as redundant (record so it isn't re-flagged) |

Plus the **slug-hygiene fixes** (the `BD.W-GLASS-ABROGATE-GRAY` ↔ `W-GLASS-ABROGATE-GRAY` prefix
normalize) and the **NON-NODE register** (declined slugs, so the next graph walk is clean).

**SYSTEMIC findings as waves** (the brief's §4): the §3 two-root-causes (flat page + dissolved edge)
+ transmitted-not-halo are owned by `BD.W-PAGE-FIELD`/`BD.W-GLASS-KEY-EDGE`; the fake-gate-fraud rule
(no device-free green that passes a gray/broken surface — the paint-DELTA must be the gate) is owned
by `BD.W-GATE-TRUTH-AUDIT` (on disk, AUGMENT to add the corpus-linter as the structural arm); the
7 build-traps + the teal-navy-purge re-warm are AUGMENTs onto the precept-source + glass waves. The
audit's job is to CONFIRM each systemic finding has a home wave — not to author a new one.

---

## 5. CROSS-ENGINE / A11y CARVE (the lens's binding law on the audit)

- The audit asserts the corpus is **paired-engine-honest**: every goo/glass-refract mechanism's
  acceptance is a Chromium+WebKit paired-π capture, never a single-engine green (`design.md §L7`).
  Pass 3 flags any wave whose gate is single-engine. (The deltas already carry both; the audit
  proves the SET does.)
- **PRM/reduced-transparency consistency**: pass 2 adds a column asserting every motion/glass item
  carves PRM → `--motion-weight:0` / `--ease-standard` and reduced-transparency → opaque fallback.
  A missing carve is a RED cell. The cartoon `.cartoon-cast` survives PRM as a static (no-travel)
  legibility anchor and survives reduced-transparency (opaque ink) — the audit asserts no item
  PRM-zeroes the ink itself (the over-carve defect).
- The audit is **doc-only** (no live route, per the brief) — its evidence is the linter + the
  already-captured deltas; it adds NO new pixel gate, only the STRUCTURAL graph/matrix proof.

---

## 6. THE BOLDEST MOVE

**Make the audit a committed, re-runnable LINTER (`audit.mjs`) that treats the 116+37 corpus as a
build-graph + a 7-axis precept-matrix — and gate the tranche's convergence on `2-consecutive-clean`
from THAT script, not from a fleet of readers.** The convergence % becomes a computed number
(`green-cells / total-cells` over the matrix, AND `0 phantoms ∧ 0 cycles ∧ 0 dangling-supersede ∧
0 dup-mint ∧ 0 forbidden-literal` over the graph), re-derivable by anyone, immune to the fake-gate
fraud the corpus itself legislates against. The cross-engine lens insists the audit hold itself to
the same bar it holds the waves to: **deterministic, re-runnable, default-broken, no judge's
word** — the structural twin of the paint-arm π gate.

---

## 7. CONVERGENCE VERDICT (this lens's read of the corpus AS-IS)

- **DAG**: coherent. ONE real dup-mint (`GLASS-FIELD`/`PAGE-FIELD`) — already resolved, needs ledger
  pin. ONE slug-prefix defect (`BD.W-GLASS-ABROGATE-GRAY`). ~6 grep-truncation false-phantoms.
  Residual true-phantom risk: small, human-resolvable in synthesis.
- **Cross-engine floor**: 37/37 amendments name a §L7 arm. ONE `<GooFilter>` (no fork). Clean.
- **Consistency matrix**: GREEN-dominant; the morph/glass/motion/cartoon primitives each collapse to
  ONE source; the systemic findings each have a home wave.
- **Estimated whole-tranche convergence ≈ 90%** pending: (1) the ledger pin of the field MERGE +
  the prefix normalize + the NON-NODE register, (2) the synthesis resolving the residual phantom set,
  (3) the `audit.mjs` harness landing + 2-consecutive-clean. The substance is converged; the
  remaining 10% is the STRUCTURAL consolidation this audit exists to produce.
