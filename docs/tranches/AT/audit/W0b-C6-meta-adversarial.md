# AT.W0b — C6: meta-adversarial — challenge the WHOLE augmented AT plan

**Lens C6.** Not a domain lens. The other 17 lenses (W0-L1..6, W0b-A1..6, W0b-B1..6)
each argued FORWARD inside their patch — better shaders, harder gates, richer dock
design. C6 reads the SUM of those 17 and asks the one question none of them is
positioned to ask: **after every lens has folded its augmentation, is the augmented
AT still a tranche that closes green and publishes 3.3.0 — or has the collective
weight of "while the shader is open" / "the once-a-tranche moment" / "rides the W6
fold" turned a focused blob-lift into an unshippable everything-bag?**

The brief: attack the augmented plan as a WHOLE. Is the SOTA research actionable or
aspirational? Does the dock work belong in AT? Does color consolidation add risk? Is
the gate set fail-closed, or are there unguarded claims? What is the single biggest
risk to AT closing green? Find the gaps the 17 lenses missed because each was looking
at its own tree.

Severity legend (inherited): **S1** blocks publish / ships-broken · **S2** ships
quietly wrong on a real path · **S3** hygiene / scope / overfit-risk · **S4**
record/claim accuracy. C6 adds one process-severity: **P0** — a planning defect that,
if uncorrected, makes the tranche unclosable as scoped.

All glass-ui facts are HEAD-verified (file:line / shell-confirmed inline). The SOTA
findings of the A/B lenses are TAKEN AS GIVEN (C6 does not re-fetch the web — it
audits whether those findings are *actionable within AT's constraints*).

---

## §0 — Executive: the seven meta-verdicts

| # | Target (the WHOLE-plan claim) | Verdict | Sev | The must-fix |
|---|---|---|---|---|
| **C6-1** | The augmented AT is still a 9-wave blob tranche | **REFUTED — SCOPE EXPLOSION** | **P0** | The 17 lenses fold ≈**45 net-new slices** + **4 net-new waves** (`W2b` aurora-quality, `W4.5` dock-motion, `W7.D` dock-design, the headless-WebGL harness sub-wave) into a plan that booked NONE of them. AT as-augmented is 2-3 tranches wearing one letter. **Triage into MUST/SHOULD/BOOK before W1 finalizes, or AT cannot close.** |
| **C6-2** | The dock work belongs in AT | **MOSTLY REFUTED** | **S2/P0** | AT's headline is the blob lift + AS-residual fold. The dock CORRECTNESS folds (B6 `strictTemplates`, state-machine spec, VT-race) are legit W6 residual-debt. The dock DESIGN waves (B1 magnification, B3 motion-spring, B2 layer-rail) are **a new feature tranche** with ZERO connection to the blob headline and no AS-residual provenance — they belong in **AT's successor**, not AT. |
| **C6-3** | The SOTA shader augmentations will land | **HALF ACTIONABLE / HALF ASPIRATIONAL** | **S2** | A1's `fwidth` AA + rotated fbm are real single-line wins. But the headline gate that would PROVE them (A6-4's headless-WebGL golden) **does not exist in-repo and AT books no time to build it**. The shader changes are actionable; the *evidence that they're correct* is aspirational. A shader wave whose only gate is "a human looked once" is not gated. |
| **C6-4** | The color consolidation (`/color` extract) is upside | **NET-NEUTRAL-TO-NEGATIVE for AT** | **S2** | A5 found the LATENT GAMMA/LINEAR BUG that the `/color` extraction's `oklchToLinear` default would ship — a visible darkening on the headline primitive. A5+A6+A3 each found a DIFFERENT problem with `/color` (over-scope, symlink cycle, chunk-vs-inline). Three independent lenses each had to *repair* the extraction. **The `/color` subpath is the single most-contested decision in the plan; the safe move is to NOT ship a `/color` subpath in AT** (keep `cssToOklch` aurora-local, ship the resolver from `/goo-blob`). |
| **C6-5** | The gate set is complete + fail-closed | **TWO UNGUARDED CLAIMS** | **S1** | (a) **The WebGL-harness gap:** the two riskiest artefacts (aurora re-fold, D1 shader) are gated ONLY by happy-dom tests that never touch a GPU — the plan CLAIMS "gated" where no gate runs the GPU (A6-4). (b) **The manual-visual reliance:** ≥5 of the augmented gates terminate in "a human confirms it looks right" — un-regression-locked, un-CI-able. A tranche cannot be "all gates green" when its load-bearing gates are eyeballs. |
| **C6-6** | The wave DAG survives the augmentation | **REFUTED** | **S2** | The added work breaks the file-disjoint parallelism the plan's DAG relies on. A4's `W2b` aurora-quality writes `aurora.frag.ts` — the SAME file W2's byte-parity gate freezes. A1's 5 shader edits + A2's color-space rewrite + A5's gamma flip all land in `metaball.frag.ts` in W5 — no longer "one D1 transposition" but a 6-change shader rewrite under one gate. The "∥ file-disjoint" claim is now false. |
| **C6-7** | The biggest risk is technical | **REFUTED — it's PROCESS** | **P0** | The single biggest risk to AT closing green + publishing 3.3.0 is NOT a shader bug or a gamma error — those are findable. It is **scope-incontinence**: 17 lenses each added "just one more slice while we're here," and the plan has no triage gate to say no. An over-scoped AT either slips (never closes) or ships half-gated (closes dishonestly). The fix is a **W1 triage decision-table** that explicitly DEFERS the design waves and the aspirational gates. |

**The one-sentence headline:** the blob lift is sound and the 17 lenses are individually
excellent, but **collectively they have proposed a tranche that cannot close as scoped** —
the must-fix is a hard triage at W1-finalize that keeps AT = (blob lift + the *correctness*
residual fold + the *one* harness that gates the GPU) and BOOKS the dock-design, aurora-
quality, and aspirational-shader work to AT's successor. Without that triage, AT's biggest
risk is not shipping wrong — it's never shipping.

---

## C6-1 — the scope explosion (P0, the headline)

### The arithmetic the 17 lenses never summed

Each W0b lens closes with an "AUGMENTED-AT proposals" table. C6 is the first to ADD
them up. Counting net-new slices/waves each lens folds into the plan (verified by
reading each lens's §-proposals table):

| Lens | Net-new slices proposed | New wave proposed? |
|---|---|---|
| A1 (metaball SDF) | 6 (fwidth AA, normalized smin, rotated fbm, premultiply-invariant, gamut-safe chroma, + the wave RENAME) | "shader-quality wave" (re-scopes W5) |
| A2 (OKLab shader) | 3 (linear-space perturb, matrix-source pin, gamut step) | — (hardens W5) |
| A3 (WebGL perf) | 3 (`needsAnimation` predicate, `maxFps`/`qualityScale`, postTask wire) | — (hardens W2/W6) |
| A4 (aurora gradient) | 3 (dither, OKLab LUT, harmony steering) | **`AT.W2b` aurora-quality** |
| A5 (color seam) | 5 (gamma pin, 2-tier proof, `/color` re-scope, CSS-native note, coverage bank) | — (hardens W2/W4) |
| A6 (blob adversarial) | 11 (incl. the **headless-WebGL harness** — itself a sub-wave) | harness sub-wave (S1) |
| B1 (dock icon design) | 7 | **`AT.W7.D` dock-interaction** |
| B2 (layer-rail design) | dock-rail design slices | (rail wave) |
| B3 (dock motion) | spring-curve + micro-interactions | **`AT.W4.5` dock-motion** |
| B4 (interaction a11y) | dock a11y slices | (folds W6/W7) |
| B5 (orientation/overflow) | overflow-collapse + CQ-unit refactor | (hardens W7) |
| B6 (dock adversarial) | 6 (`strictTemplates`, state-machine spec, VT-race, overflow clean-break, labelling, doc-rot) | (folds W6/W7) |

**Shell-verified:** none of these waves or the magnification/motion/aurora-quality
slices exist in the plan today —
`grep -niE "magnif|proximity|W7\.D|W4\.5|stagger|shader-quality" AT.md AT.W1` returns
NOTHING (the one `W2b` hit in `AT.md:51` is a reference to an *AS-era* wave, not A4's
new aurora-quality `W2b` — a name collision that itself proves the planners and the
A4 lens were not coordinating).

The plan as written (`AT.md §Wave sequence`) is **9 waves, 1 blob headline**. The plan
as AUGMENTED is **≈13 waves** (the original 9 + `W2b` + `W4.5` + `W7.D` + the harness
sub-wave) carrying **≈45 net-new slices** on top of the AS-residual fold that was
ALREADY the heaviest non-headline load any recent tranche carried (47 ledger items,
`W0-L4`). This is not a tranche. It is a release train.

### Why this is P0, not S3

The overfitting precept and the no-gold-plating discipline exist to stop exactly this.
But the subtler failure is that **each lens's augmentation is individually defensible**
("the shader is already open — fold the quality delta in"; "the once-a-tranche substrate
moment — close the aurora gaps"; "file-disjoint from the blob — the dock design rides
free"). The fallacy is compositional: 45 individually-cheap slices is not a cheap
tranche, it is an unclosable one. Every "while we're here" shares the SAME close gate,
the SAME overfitting audit, the SAME publish — and the close cost is superlinear in
slice count (each slice can fail the gate, each is a merge-conflict surface, each is a
line in the FINAL that must be true).

→ **MUST-FIX C6-1 (P0, W1-finalize):** AT.W1 must close with an explicit **triage
decision-table** that sorts all ≈45 W0b proposals into:
- **MUST** (blocks the headline being correct: the gamma pin A5-1, the `needsFrame`
  predicate A6-1.b, the inv-K-3 source proof A5-2, the premultiply invariant A1-4).
- **SHOULD** (cheap + on-the-bench + genuinely free: fwidth AA A1-1, rotated fbm A1-3 —
  IF and only if the harness gate exists to prove them, C6-3).
- **BOOK → AT-successor** (the dock-design waves B1/B2/B3, the aurora-quality W2b A4,
  the adaptive-DPR / OffscreenCanvas name-forwards, the analytic-derivative noise).
**Gate:** the W1-finalize doc carries the triage table; the wave count after triage is
≤ the booked 9 (+ AT MAY admit the harness sub-wave as the ONE addition, C6-5). If the
triaged wave count exceeds 10, AT is mis-scoped and must split.

---

## C6-2 — does the dock work belong in AT? (S2 / P0)

### The provenance test

AT's stated identity (`AT.md:1-11`) is two things: **(1) the blob-primitive lift** +
**(2) the AS-residual correctness fold** — "the handful of AS-residual correctness debts
the W0b/post-publish audits surfaced." Every item in AT must trace to one of those two.
Apply that test to the dock work:

| Dock proposal | Traces to blob headline? | Traces to AS-residual debt? | Verdict |
|---|---|---|---|
| B6 `strictTemplates`/`checkUnknownProps` | no | YES — the W7 `scroll-on-overflow` silent-no-op IS an AS-residual debt (`96858c8`→`00bd5f9`) | **W6 — belongs** |
| B6 dock state-machine spec | no | YES — the "booked-not-built dock binding-verification guard" is named in `AT.md:168` | **W6 — belongs** |
| B6 VT-race / `isTransitioning` reconcile | no | borderline — the AQ.W6 VT fork is pre-AS; the *defect* is residual | **W6 — admit (correctness)** |
| B5/B6 overflow-collapse (`wrap` delete) | no | YES — `AT.md:171` already books it | **W7 — belongs** |
| B6 labelling + doc-rot | no | YES — folds the ι hygiene sweep (`AT.md:173`) | **W7 — belongs** |
| **B1 proximity magnification** | **no** | **NO — net-new design feature** | **BOOK → successor** |
| **B1 glass-affordance / press-scale / stagger** | no | no — design-maturity, not a debt | **BOOK → successor** |
| **B3 dock-motion spring-curve wave (`W4.5`)** | no | no — "None of this is in the current AT plan" (B3's own §0 admits it) | **BOOK → successor** |
| **B2 layer-rail redesign** | no | no — design | **BOOK → successor** |

### The finding

The dock CORRECTNESS work is legitimately AT's — it IS the AS-residual fold the plan
named, and B6 is right that `strictTemplates` is the categorical fix the booked
point-gate missed. **Admit it.** But the dock DESIGN work (B1, B2, B3 — magnification,
glass affordances, stagger, spring-curve unification, layer-rail) is a *new feature
tranche*. B3's own executive summary concedes "None of this is in the current AT plan…
B3 proposes a focused AT dock-motion wave." That is the tell: a lens proposing a NEW
WAVE for work with no headline-provenance is describing AT's *successor*, not AT.

The danger is that the dock design is *seductive* — it is genuinely good design work
(macOS-Tahoe magnification, Liquid-Glass affordances), it is file-disjoint from the
blob, and it "rides the W6/W7 fold the plan already opened." But "rides the fold" is the
exact compositional fallacy of C6-1. The dock-design waves would roughly DOUBLE AT's
implementation surface for zero headline value, and they carry their own risk (a
magnification interaction is a real INP/pointer-event surface; a spring-curve change is
a feel-regression surface) that has nothing to do with whether the blob lift is sound.

→ **MUST-FIX C6-2 (P0, W1-finalize):** AT admits the dock CORRECTNESS slices (B6
`strictTemplates` + state-machine spec + VT-race + overflow-collapse + doc-rot) into
W6/W7 as AS-residual debt. AT BOOKS the dock DESIGN waves (B1 magnification/affordance/
stagger, B2 layer-rail, B3 motion-spring) to **AT's successor as a named "dock-design"
tranche** — they are a coherent feature wave that deserves its own letter, not a rider
on a blob tranche. **Gate:** `AT.md` records the split explicitly; no `W4.5`/`W7.D`
design wave appears in AT's sequence; the successor seed is named (alongside the Drawer
`:native` seed `AT.md:176` already carries).

---

## C6-3 — is the SOTA research actionable or aspirational? (S2)

### The bifurcation the lenses don't draw

The A-lenses produced genuinely excellent SOTA — but C6 finds it splits cleanly into
two piles the lenses never separated:

**ACTIONABLE (a code change glass-ui can make + a gate it can run):**
- A1-2 normalized smin (CPU-testable: `smin(a,b,0)==min(a,b)`, C1-continuity).
- A5-1 gamma pin (CPU-testable: `defaultBlobColorResolver("#808080")` ≈ 0.5 gamma not
  0.216 linear).
- A5-2 two-tier inv-K-3 proof (source-graph walk + dist grep — both runnable today,
  reuse `proof-consumers-static.mjs`).
- A3 `needsFrame` predicate / SuspendReason scheduling parity (happy-dom-runnable with
  mocked RAF — A3 §8.2 spells the assertions out).
- A6-3.b working-space pin (CPU unit).

**ASPIRATIONAL (the change is real but the EVIDENCE requires infrastructure AT doesn't
have and doesn't book time to build):**
- A1-1 fwidth AA — the change is one line; *proving it fixes the merge-neck aliasing*
  requires a GPU render at 1× and 2× DPR. Happy-dom cannot. The gate A1 gives is "the
  demo-story manual-visual line gains a check" — **a human eyeballing, not a gate.**
- A1-3 rotated fbm — same: "visual A/B (grid-artifact gone) in the story" — eyeball.
- A4's dither + OKLab LUT + harmony steering — the dither's whole POINT is sub-1/255
  banding visible only on a real 8-bit framebuffer; no CPU test sees it.
- The D1 OKLCh shader's "does the glow read the same" (A1 §6.2, A6-4.a) — the one thing
  the plan ITSELF admits "CPU math can't settle."

### The finding

The actionable pile is fine — fold it (subject to C6-1 triage). The aspirational pile is
the trap: **AT proposes to SHIP shader changes whose correctness is asserted only by a
human looking at a demo once.** That is not a gate. The π visual-evidence precept
(`baseline|close/` + `DELTA.md`) that W7 adopts makes the eyeballing *documented and
reproducible* — a real improvement — but a captured screenshot diff is still a human
judgment, not a fail-closed CI gate. A regression that re-introduces the grid artifact
or shifts the glow passes every CI gate AT runs and is caught only if a human notices in
the capture.

A6-4 already escalated this to S1 and named the fix (the headless-WebGL harness). C6's
meta-point is sharper: **the aspirational shader work is only actionable IF the harness
lands first.** The plan currently has the dependency backwards — it books the shader
changes (W5) as binding and the harness (A6-4) as "optional stretch." Reverse it: the
harness is the PREREQUISITE that converts the aspirational pile to actionable. Without
it, every "fold the quality delta while the shader is open" slice (A1-1, A1-3, A4) is
shipping ungated.

→ **MUST-FIX C6-3 (S2, W1 sequencing):** the SOTA shader/quality augmentations (A1-1
fwidth, A1-3 fbm, A4 dither/LUT) are admitted to AT **ONLY IF the A6-4 headless-WebGL
harness is admitted as a prerequisite wave**. If the harness is BOOKED (C6-5 may decide
it's too heavy for AT), then the aspirational shader slices BOOK with it — AT ships the
*faithful* lift (the demo's shader transposed 1:1, gated by the existing byte/uniform-
parity discipline) and the quality delta lands in the successor WITH its gate. **Gate:**
no shader-QUALITY change (as opposed to the faithful HSV→OKLCh transposition, which is
CPU-gatable) ships in AT without a GPU gate that proves it; the triage table (C6-1)
records each shader slice as "harness-gated" or "booked-with-harness."

---

## C6-4 — does the color consolidation add risk? (S2)

### The three-lens pile-up on `/color`

The `/color` subpath extraction (DEC-AT-2, `AT.W1 §1`) is the most-contested single
decision in the augmented plan. Count the independent lenses that had to REPAIR it:

1. **A5-1** found the **latent gamma/linear bug**: the W1 default
   `oklchToLinear(cssToOklch(css))` returns LINEAR but the metaball shader is gamma-
   end-to-end — a visible *darkening* (~2× luminance error at mid-gray) on the headline
   primitive. The fix is to NOT use `oklchToLinear` — i.e. the W1 `/color` export set is
   wrong at the leaf.
2. **A5-3** found `/color` is **over-scoped**: W1 ships `deriveAurora`/`AuroraHarmony`
   from a leaf named `/color` — aurora-domain symbols wearing a generic name.
3. **A6-3.a** found the **symlink cycle**: `value.js → glass-ui/color → value.js` in the
   `file:`-linked monorepo dev layout (the exact cycle that bit `proof:*` twice per
   MEMORY `project_ci_monorepo_layout_cascade`), PLUS the **chunk-vs-inline ambiguity**
   (is `/aurora` now bigger or smaller?).
4. **A6-3.b** found the **working-space is unspecified in the TYPE** — a consumer's
   gamma resolver + the linear-assuming D1 shader = silent wrong color.

Four distinct defects, three lenses, ONE decision. When a single architectural choice
needs four independent repairs before it's safe, the choice itself is the risk — not any
one repair.

### The finding

A6-3.a already named the less-invasive alternative the plan ignored, and A5 corroborates
it from the gamma angle: **the inv-K-3 point is only that value.js reach is OPT-IN, NOT
that it lives in a new `/color` subpath.** The faithful lift needs exactly two things:
- `cssToOklch` (DOM-free CSS→OKLCh) — can stay aurora-local; goo-blob's default resolver
  imports it from where it lives.
- a gamma-RGB triple helper (A5's `oklchToGammaRgb`) — extract as a helper, NOT a subpath.

Shipping `defaultBlobColorResolver` from `/goo-blob` itself (it MAY import value.js — the
inv-K-3 rule is opt-in, not subpath-isolation) gives the SAME opt-in property with NONE
of the four `/color` defects: no new subpath, no aurora dependency inversion, no symlink
cycle, no over-scoped leaf, no chunk-vs-inline question. The `/color` extraction is the
MORE ELEGANT story (one shared color home) but the HIGHER risk; for a tranche already
over-scoped (C6-1), the elegant-but-risky move is the wrong trade.

→ **MUST-FIX C6-4 (S2, W1 design decision):** AT does NOT ship a `/color` subpath.
Keep `cssToOklch`/the OKLab core aurora-local; extract `oklchToGammaRgb` as a helper;
ship `defaultBlobColorResolver` (gamma-returning, A5-1) from `/goo-blob` directly with a
documented opt-in value.js peer. The `/color` generic-leaf consolidation BOOKS to the C3
color-consolidation tranche (which A5-4 already hands off to) — that is its natural home,
where it can be done without the blob lift's gamma-shader constraint forcing the space.
**Gate:** if AT keeps `/color` against this finding, ALL FOUR repairs (gamma pin,
re-scope, `proof:color-acyclic`, type working-space pin) are BINDING W2 gates and the
symlink-cycle proof must pass in the actual `file:`-link layout, not just the published
dist. The safe path is to not open that surface in AT.

---

## C6-5 — is the gate set complete + fail-closed? (S1)

### The two unguarded claims

The plan's success criteria (`AT.md:72-110`) read as a fully-gated tranche. C6 finds two
load-bearing claims with no fail-closed gate behind them:

**(a) The WebGL-harness gap (A6-4's S1, restated at the plan level).** The two riskiest
artefacts in AT both run on a GPU and are gated by tests that never touch a GPU:
- The W2 aurora re-fold: gated by "frame-parity" which `AT.W1:82` itself hedges as "a
  CPU-readback OR a captured-uniform-sequence." Shell-verified: `vitest.config.ts:18` is
  `happy-dom`, `node_modules/@playwright` absent, `node_modules/gl` (headless-gl) absent
  — **there is no GPU in the test loop.** So the runnable gate is uniform-call-sequence
  parity (A6-2), which is blind to GL-state regressions (blend/clear/VAO/viewport) — the
  EXACT envelope code the extraction moves.
- The W5 D1 shader: gated by a CPU *port* of the GLSL (A6-4.a) — a different code path
  than the GPU compiles. The plan CLAIMS the shader is "gated" (`AT.md:94` "gated by a
  CPU-side vitest OKLCh-equivalence spec"). It is not gated; a TS re-implementation is.

**(b) The manual-visual reliance.** Counting the augmented gates that terminate in a
human judgment: A1-1 (merge-neck looks smooth), A1-3 (grid gone), A2/A6 D1 glow (reads
the same), A4 dither (banding gone), A3 §8.3 (RAF stops off-screen — DevTools), the
DEC-AT-4 "manual visual confirmation line." That is ≥6 load-bearing gates that are
eyeballs. The π precept makes them *reproducible eyeballs* (captured), but a capture diff
is not fail-closed: nothing FAILS the build if the glow regresses.

### Why this is S1, not S2

A tranche's close gate is its contract. `AT.md:110` promises "the gates.mjs-derived
matrix green." Shell-verified: `scripts/gates.mjs` exists (5.5KB) and is the matrix
authority. If the matrix is green while the two riskiest artefacts are gated only by
non-GPU tests + eyeballs, then **"matrix green" is a true statement that means less than
it claims** — the dishonesty L1's S4 class exists to catch, escalated to S1 because it's
the *publish* gate. AT would publish 3.3.0 asserting its shaders are gated when its
shaders are not gated.

### The fix — and the honest fallback

A6-4 says stand up the harness (Playwright + swiftshader, web-confirmed cheap). C6
agrees it is the RIGHT fix AND notes it is the ONE net-new wave AT should admit (it
converts the entire aspirational-shader pile to actionable, C6-3, and gates the aurora
re-fold's real risk, A6-2). But C6 adds the honest fallback the plan needs either way:
**if AT declines the harness (scope, C6-1), it MUST downgrade every GPU claim from
"gated" to "manually-verified, GPU-gate booked-forward" in FINAL** — and the faithful
lift (no quality delta, no D1 quality changes) is the only shader work that ships, gated
by the CPU-equivalence it CAN run. AT cannot have it both ways: either build the harness
and gate the GPU, or ship the faithful lift only and BOOK the quality delta. It may NOT
ship quality changes and call them gated.

→ **MUST-FIX C6-5 (S1, W1 decision + FINAL):** AT makes a binary, recorded decision at
W1-finalize: **HARNESS-IN** (admit the Playwright+swiftshader sub-wave; the aspirational
shader pile lands gated) OR **HARNESS-OUT** (ship the faithful lift only; every quality-
delta shader slice BOOKS to the successor with the harness; FINAL says "GPU artefacts are
manual-visual-verified, GPU golden booked-forward"). **Gate:** the `gates.mjs` matrix
NEVER reports a GPU artefact as "gated" unless a GPU-touching gate runs; the manual-
visual line-items are labeled "manual" in FINAL, not folded into the green-matrix claim.

---

## C6-6 — does the wave DAG survive the augmentation? (S2)

### The file-disjointness claim is now false

The plan's DAG (`AT.md:135-154`) rests on **file-disjoint parallelism**: "W6 (correctness)
∥ the blob waves (file-disjoint)"; B3/B1 claim their dock waves are "file-disjoint from
W2-W5." That claim was true for the ORIGINAL plan. The augmentation breaks it in two
places C6 found by tracing which files each new slice writes:

1. **A4's `W2b` aurora-quality writes `aurora.frag.ts`** (the dither + OKLab-LUT GLSL) —
   the SAME 819-line file (`wc -l` confirmed) that W2's byte-parity gate FREEZES
   ("aurora's paint is frame-parity-identical to 3.2.0," `AT.md:78`). You cannot
   simultaneously freeze a file for parity AND rewrite its shader for quality. `W2b` and
   W2's gate are mutually exclusive on the same artefact — A4 calls `W2b` "riding the W2
   substrate work" but it RIDES OVER the very file W2 must hold still.

2. **W5 is no longer "one D1 transposition."** A1 (6 changes) + A2 (color-space rewrite +
   matrix pin) + A5 (gamma flip) + A6 (gamut step) all land in `metaball.frag.ts` in W5.
   That is a **6-author shader rewrite under one "OKLCh-equivalence" gate** that tests
   only the color math — the AA, smin, fbm, premultiply, and gamut changes are UNGATED by
   that spec (A1-4 itself flags the premultiply ordering "the CPU OKLCh test cannot see").
   The wave's gate covers ~1 of its ~6 changes.

### The finding

The augmentation doesn't just ADD waves (C6-1) — it COUPLES waves that were disjoint and
OVERLOADS gates that were scoped to one change. The DAG's parallelism and the gates'
coverage both degrade silently as slices accrete. This is the compositional failure
again, viewed through the dependency graph: 45 slices don't just sum in cost, they
TANGLE in the file/gate graph.

→ **MUST-FIX C6-6 (S2, W1 sequencing):** (a) If A4's aurora-quality is admitted at all
(C6-1 says BOOK it), it CANNOT share a file-window with W2's parity gate — it must follow
W2's close, as its own wave, with its own (post-parity) gate. The clean answer: BOOK it.
(b) W5's gate must enumerate EVERY shader change it carries and bind EACH to a gate-line
(the OKLCh-equivalence spec covers color math ONLY; AA/smin/fbm/premultiply each need
their own CPU-or-GPU line per A1 §8), OR W5 ships the color transposition alone and the
quality changes BOOK (C6-3). **Gate:** the W1 triage table records, per slice, the file
it writes and the gate-line that covers it; no two admitted waves write the same file in
overlapping windows; no gate claims coverage it doesn't have.

---

## C6-7 — the single biggest risk to AT closing green + publishing 3.3.0 (P0)

### It is not technical

Walk the candidate technical risks and note that each is *findable and fixable*:
- The gamma/linear bug (A5-1) — found, one-line fix, CPU-gatable.
- The VT singleton race (B6-2) — found, the FLIP fallback is the safe degrade.
- The `frostShader` deletion (DEC-AT-1) — verified zero-consumer (`grep -rln frostShader
  src/` returns nothing beyond the file), trivially safe.
- The symlink cycle (A6-3.a) — avoidable by not shipping `/color` (C6-4).

None of these sinks the tranche. They are exactly what the 17-lens audit was FOR, and
they're caught. The technical surface is, after the audit, well-understood.

### It is scope-incontinence

The biggest risk is the one the audit *created*: **17 lenses each found real value and
each wanted to fold it in, and the plan has no mechanism to say no.** The augmented AT
is ~45 slices and ~13 waves wearing one letter. The failure modes:
- **Slip (never closes):** 13 waves of implementation, each gate-able, is a multi-month
  arc. The blob headline — the thing value.js K.W3 is BLOCKED on (`AT.md:204`) — ships
  whenever the LAST dock-design micro-interaction and aurora-dither slice closes. The
  constellation unlock waits on gold-plating.
- **Close dishonestly (ships half-gated):** to close on time, the eyeball gates pass
  without a GPU harness (C6-5), the W5 shader rewrite passes a color-only gate (C6-6),
  and the FINAL claims "all gates green" over artefacts that aren't gated. AT publishes
  3.3.0 with a green matrix that means less than it says.

Both are worse than a SMALL AT that ships the blob lift + the correctness fold + (one
decision) the harness, and BOOKS the rest. A focused AT unblocks value.js fast and
honestly; an everything-bag AT either stalls the constellation or lies in its FINAL.

### The fix

→ **MUST-FIX C6-7 (P0, W1-finalize — the keystone):** AT.W1 closes with a **triage gate**
(folding C6-1's table) that produces a TRIAGED plan of **≤10 waves**:
- **AT core (ships):** W2 substrate (faithful, byte/uniform-parity + A3 scheduling
  parity) · W3 watercolor · W4 goo-blob on the seam (gamma-pinned resolver A5-1, from
  `/goo-blob` not `/color` C6-4, source+dist inv-K-3 proof A5-2) · W5 the FAITHFUL
  HSV→OKLCh transposition (CPU-gatable) · W6 the correctness fold INCLUDING the dock
  CORRECTNESS slices (B6 strictTemplates + state-machine + VT-race) · W7 the slipped
  ships + overflow-collapse + doc-rot · W8 close.
- **AT MAY admit (one decision, C6-5):** the headless-WebGL harness sub-wave — IFF AT
  wants the shader-QUALITY pile gated; else BOOK it with the quality pile.
- **BOOK → AT-successor:** dock-design (B1/B2/B3), aurora-quality (A4 `W2b`), shader-
  quality delta (A1 AA/smin/fbm/premultiply, IF harness-out), `/color` consolidation
  (→ C3 tranche), adaptive-DPR / OffscreenCanvas / analytic-noise name-forwards.

**Gate:** the W1-finalize doc carries the triage table; the triaged wave count is ≤10;
every BOOKed item is named-forward to a specific successor/tranche; FINAL distinguishes
"shipped + gated" from "manual-verified" from "booked." AT closes green because it scoped
itself to what it can gate.

---

## C6-8 — gaps the other 17 lenses missed (the meta-only findings)

These surface ONLY from reading the lenses as a set — no single-domain lens could see
them:

### C6-8.a — the version bump assumes additive, but `strictTemplates` is a breaking dev-experience change (S3)

AT ships 3.3.0 as a MINOR because "the blob subpaths are additive" (`AT.md:52`). True for
the blobs. But B6-1's `strictTemplates`/`checkUnknownProps` — if it propagates to the
published `.d.ts` (B6-1 §49 claims it does, "consumers who run vue-tsc against glass-ui's
published `.d.ts`") — turns previously-silent consumer template typos into RED typechecks
**in consumer builds**. That is a behavior change consumers experience on upgrade. It may
be the RIGHT change, but a minor that newly-fails a consumer's `vue-tsc` is not purely
additive. No lens flagged the semver implication of the strictness change.
→ **W6:** verify whether `checkUnknownProps` leaks into the published dts (it likely does
NOT — it's a `vueCompilerOptions` build-side setting, not a `.d.ts` payload — but the plan
must CONFIRM, not assume) and record the semver reasoning in FINAL. If it leaks, document
it as an intentional, announced dev-experience tightening, not a silent minor.

### C6-8.b — the demo `blob.vue` reconciliation is the load-bearing ≥2 mechanism AND a deletion-risk, and two lenses disagree on its fate (S3)

A6-6.a (retire-or-reconcile the 14.7KB canvas-2D `blob.vue`) and DEC-AT-5/A6-5 (the demo
story is goo-blob's consumer #2) interact in a way neither fully traces: if `blob.vue`
RECONCILES onto `GooBlob`, it becomes the genuine consumer #2 (better than a throwaway);
if it RETIRES, the throwaway `blob-primitives.vue` is the only #2 and the fig-leaf is
thinner. The fate of one file decides whether goo-blob's overfitting bar is "1 real + 1
genuine reconciled consumer" or "1 real + 1 manufactured demo." No lens OWNS this
decision — A6-5 owns the honesty, A6-6.a owns the file, neither decides.
→ **W1:** decide `blob.vue`'s fate as a first-class slice (A6-6.a's gate: `grep -l
metaball demo/` resolves to ONE impl at close) AND tie it to the overfitting record
(A6-5): if reconciled, goo-blob's #2 is the reconciled studio story; if retired, FINAL
records goo-blob as export-bar + 1-real-consumer honestly.

### C6-8.c — `prng.ts` and `oklchToGammaRgb` and the harness are three new "private leaves" justified by the SAME 2-internal-consumer logic the plan dinged goo-blob for (S4)

A6-6.d already caught the `prng` double-standard. C6 generalizes it: the augmented plan
adds `src/utils/prng.ts` (2 internal uses), `oklchToGammaRgb` (A5: aurora + blob), and
(if harness-in) a test-infra leaf — each justified by "≥2 latent/internal consumers." The
plan must apply ONE consistent bar across all of them: private internal leaves clear at
≥2 INTERNAL uses; exported surfaces clear at ≥2 DISTINCT EXTERNAL contexts OR the export
bar. The close audit must tally ALL new leaves on the same rubric, or the overfitting
audit is selectively applied.
→ **W8:** the overfitting audit tallies `prng`, `oklchToGammaRgb`, the harness infra, AND
goo-blob/watercolor on ONE rubric (internal-≥2 vs external-≥2 vs export-bar), each row
labeled with which bar it clears.

### C6-8.d — no lens checked whether `release.yml` actually publishes 3.3.0 green (S2)

Every lens assumes W8 "publishes 3.3.0 through the repaired `release.yml`." MEMORY
(`project_publish_ci_broken`) says push-ci is green at 3.1.1 but **`release.yml` still
needs `NPM_TOKEN`**. AT's headline OUTPUT — the published blob subpaths value.js K.W3 is
blocked on — depends on a release path no lens verified is green for a 3.3.0 tag. The
3.2.0 publish was "verified by a 5-probe adversarial pass against the published tarball"
(`AT.md:5`) — but that was a LOCAL publish per MEMORY, not `release.yml`. If AT plans to
publish via `release.yml` and it needs a secret that isn't set, the constellation unlock
does not happen regardless of how green the gate matrix is.
→ **W8 (and a W1 note):** confirm the 3.3.0 publish PATH (local-publish per MEMORY's
working pattern vs `release.yml` + `NPM_TOKEN`) BEFORE W8, not at W8. The publish is the
single user-domain release leg (`AT.md:213`, confirm-first) — and it is the one step that,
if it fails, makes the entire tranche's headline value undeliverable. This is a
pre-flight, not a close-step.

---

## C6-9 — what the augmented plan got RIGHT (the meta-pass found genuine soundness)

To be fair under the meta-adversarial lens — these survive the whole-plan scrutiny:

- **The blob lift's core thesis is sound.** The home exists, watercolor-dot's ≥2 is
  genuine, the inv-K-3 seam is the right architecture (A5 §3 confirms CSS-native can't
  feed a uniform), the `frostShader` deletion is a verified clean orphan-delete.
- **The correctness fold is legitimately AT's.** The AS-residual debts (DataTable leak,
  peer-optional, `supportsPostTask`, dock binding-guard, R4/R6) trace to AS and belong.
- **The 17-lens audit DID its job.** It found the gamma bug, the VT race, the working-
  space gap, the symlink cycle, the over-scoped `/color` — every one a real defect caught
  before impl. The audit is not the problem; the absence of a TRIAGE step after it is.
- **The honesty discipline is present.** The plan ADMITS goo-blob is thin (`AT.md:44`),
  ADMITS the WebGL harness gap (`AT.md:126`), ADMITS the demo-story-as-consumer motive.
  The fix C6 asks for is to convert those admissions into TRIAGE DECISIONS, not to
  introduce honesty that's missing.

The augmented AT is not WRONG. It is OVER-SCOPED. The difference matters: a wrong plan
needs re-derivation; an over-scoped plan needs a triage gate. C6 prescribes the latter.

---

## C6-10 — the consolidated meta-ledger (top risks + must-fix-before-impl)

| ID | Sev | The whole-plan risk | Must-fix (all at W1-finalize unless noted) |
|---|---|---|---|
| **C6-7** | **P0** | Scope-incontinence is the #1 risk — AT slips or closes dishonestly | A W1 triage gate producing a TRIAGED ≤10-wave plan (the keystone; subsumes C6-1) |
| **C6-1** | **P0** | ≈45 net-new slices + 4 net-new waves folded into a 9-wave plan | The MUST/SHOULD/BOOK triage table |
| **C6-2** | **S2/P0** | Dock DESIGN waves (B1/B2/B3) have no headline-provenance — a new feature tranche | Admit dock CORRECTNESS (B6) into W6/W7; BOOK dock DESIGN to AT-successor |
| **C6-5** | **S1** | "Gated" claimed over GPU artefacts no gate touches + ≥6 eyeball gates | Binary HARNESS-IN/HARNESS-OUT decision; FINAL labels manual gates as manual |
| **C6-4** | **S2** | `/color` subpath needs 4 independent repairs — the most-contested decision | Do NOT ship `/color` in AT; resolver from `/goo-blob`, gamma-pinned; `/color` → C3 |
| **C6-3** | **S2** | SOTA shader quality is aspirational without the harness it depends on | Shader-QUALITY slices admitted ONLY IF harness-in; else BOOK with the harness |
| **C6-6** | **S2** | DAG file-disjointness false; W5 gate covers ~1 of ~6 changes | No two waves write one file in overlapping windows; every shader change → a gate-line |
| **C6-8.d** | S2 | The 3.3.0 publish PATH (`release.yml`+`NPM_TOKEN`) unverified — undeliverable headline | Pre-flight the publish path in W1, not at W8 |
| **C6-8.a** | S3 | `strictTemplates` may be a non-additive consumer dev-experience change under a minor | W6: confirm dts leakage; record semver reasoning |
| **C6-8.b** | S3 | `blob.vue` fate decides goo-blob's ≥2 honesty AND a deletion — un-owned | W1: decide retire-vs-reconcile as a first-class slice, tie to the overfitting record |
| **C6-8.c** | S4 | Three new private leaves use the bar the plan dinged goo-blob for | W8: one consistent overfitting rubric across all new leaves |

### The single binding recommendation

If AT adopts ONE thing from this lens: **insert a triage gate at W1-finalize (C6-7).**
The 17 lenses did the hard work of finding every defect and every opportunity. What they
could not do — because each was inside its own tree — is decide which augmentations AT
can afford to GATE and SHIP versus which it must BOOK. That decision is the difference
between an AT that unblocks the constellation in one focused arc and an AT that either
never closes or closes with a green matrix that doesn't mean what it says. **Triage, then
implement. A small AT that ships honestly beats a complete AT that ships late or
dishonestly — and the blob headline, which value.js is blocked on, deserves the small,
fast, honest AT.**

---

**Provenance note.** C6 introduces NO new web research — it audits the *composition* of
the 17 prior lenses against AT's stated scope. Every glass-ui fact is HEAD-verified this
session: `vitest.config.ts:18` happy-dom; `node_modules/@playwright` + `node_modules/gl`
both ABSENT; `tsconfig*.json` carries NO `strictTemplates`/`checkUnknownProps`; `grep
-rln frostShader src/` returns nothing beyond the file; `package.json` version `3.2.0`;
`aurora.frag.ts` 819 LOC / `runtime.ts` 633 LOC; `scripts/gates.mjs` present (5.5KB); the
magnification/`W4.5`/`W7.D`/`shader-quality` proposals absent from `AT.md`/`AT.W1`. The
A/B lens SOTA findings are taken as given (A6-4 headless-WebGL is web-confirmed-cheap;
A5-1 gamma/linear is first-hand-shader-confirmed; B6-1 strictTemplates is
language-tools-confirmed). The MEMORY references (`project_publish_ci_broken`,
`project_ci_monorepo_layout_cascade`) are the user's auto-memory, cited for the publish-
path and symlink-cycle findings.

**Lenses read in full for this pass:** `AT.md`, `design/AT.W1-blob-primitives.md`,
`W0-L1..L6` (skimmed for the seed claims C6 re-grounds), `W0b-A1`, `W0b-A2`, `W0b-A3`,
`W0b-A4`, `W0b-A5`, `W0b-A6` (in full), `W0b-B1`, `W0b-B3`, `W0b-B5`, `W0b-B6` (in full),
`W0b-B2`/`W0b-B4` (proposals tables). C6 is the first W0b-C lens; no prior C-lens to
build on.
