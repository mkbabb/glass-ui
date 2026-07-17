# GF-HANDMARK — CRITIQUE, PASS 2 (fresh Fable critic)

Adversarial critique of `GF-HANDMARK-PASS1.md`. Default-assume WRONG. TRANCHE-DEVELOPMENT: no
source touched; on-disk verification only (evidence = file:line at HEAD `codex/bi-p-q-execution`).
No browser (a Playwright suite owns the seat) — every π stays OWED, exactly as pass 1 concedes.

Authorities re-read in full for this pass: the seven stills (`feedback/F34-…F40-*.png`, READ, not
paraphrased), `FEEDBACK-LEDGER.md:34-40` (the F34-F40 verdicts), the census
(`formation/round-1/component-surface---overfit-census.md:9-15`), `REGISTRY.md` family G + family C,
the shipped family (`src/components/handmark/{HandMark.vue,brush.ts,ink.ts,noise.ts,geometry.ts,constants.ts,types.ts}`),
the demo (`demo/stories/motion/handmark.vue`), and the REAL pencil-boil surface
(`node_modules/@mkbabb/pencil-boil@0.9.2/src/{index,path,vue}.ts`).

---

## 0. Verdict in one line

The **diagnosis is sound and visually corroborated**; the substrate is real (no phantom API); the
honest half of the reframe — *naturalness ⊥ wobble → calm centerline + containment + shape-degrade +
de-jargon* — is codebase-grounded and BESTs the current design. But the route's **advertised
load-bearing unification ("every brush fills ONE variable-width ribbon") is under-justified and partly
CONTRADICTED by the stills**, one of the four pillars (**uniform space / delete `vbH`**) rests on a
causal story that **does not survive HEAD** and silently endangers the box-mode datum path, and the
single most important naturalness lever — **absolute WEIGHT/thinness** — is **not an axis and not a
gate**. Plus a census-fidelity slip (the "11 dead" list enumerates 12 and mis-includes `amplitude`).
Pass-1's self-reported 55% is slightly optimistic; earned convergence **≈48%**. Route A **ADVANCES to
pass-3 prototype, AMENDED** on four points below.

---

## 1. What the pass-1 doc got RIGHT (credited, verified on disk)

- **F34 worm / F36 escape / F38 blob+slab / F39 torn-ring / F40 slivers+jargon are REAL and the roots
  are correctly located.** I READ all seven stills. F34: two fat white filled sausages under
  "future"/"here" (a hull, not a line). F36: the gold multiply slab escapes *below the card's bottom
  border* (dead-center, visible). F38: crayon = a fat RED blob over the "crayon" descender; marker = a
  flat GREEN lozenge. F39: a rust ellipse torn by grain, parts vanishing BEHIND the glyphs. F40: a
  green sliver over "a", a red sliver over the "i", and mono ALL-CAPS jargon eyebrows. Each maps to a
  verified line: boil/crayon/marker/highlighter are `ribbon:"hull"` (`brush.ts:144,188,239,266`); the
  se-guard sliver is `ink.ts:203-210`; the ring is `z-index:-1` (`HandMark.vue:338`) with `grain:0.7`
  (`brush.ts:222`); the highlighter has NO `isolation:isolate` + `overflow:visible` (`HandMark.vue:308-327`).
- **The substrate is REAL — no elegant-reduction phantom.** `createStrokeDrawIn` exists at
  `pencil-boil/src/vue.ts:656` (PRM-aware, `SVGGeometryElement`+opts→`SequenceHandle`, settles to a
  solid stroke) — W5's "adopt it for draw-on" is a real seam, not "and then the hard part." The §4.2
  arithmetic is arithmetically correct: `wobbleLinePoints` `maxDisplace = roughness*len*0.015`
  (`path.ts:89`), so `roughness≈0.25 → ~0.4% span`. `freehand.ts` `getStroke`/`getSvgPathFromStroke`
  genuinely exists — the filled-ribbon primitive is not invented. **A passes the elegant-reduction test.**
- **The se-guard→shape-degrade reframe is principled** and squarely honors the no-masking-fallback
  edict: a datum below min-span degrades its SHAPE, it does not fall its INK back to a hidden sliver.
- **G-NO-JARGON is exactly grounded.** The captions are verified verbatim: `handmark.vue:37` "boil
  brush · the natural morphology", `:50` "highlighter · multiply over the page", `:66` "draw-on ·
  imperative play()", `:119` "box-mode hull · the se-guard (never a vanish)", `:150` "amplitude · the
  excursion knob", plus blurbs leaking "se-guard/hull/byte-identical/wobble÷stroke" — dead-on
  `FEEDBACK-LEDGER.md:40` ("Remove ALL reference to meta text (what is 'SE')").
- **The portfolio discipline is good.** C (field) is honestly BLOCKED on an unspecified field→body
  primitive that is equal-difficulty to the problem; B/D honestly banked. Convergence held at 55% with
  every π OWED (no browser this seat) is an honest cap, not a vacuous claim.

None of the following retracts the above. They amend the LEADING route, not the diagnosis.

---

## 2. FINDING 1 (headline) — "universal filled ribbon" is under-justified and runs AGAINST the stills

Pass 1 elevates *"every brush fills ONE variable-width ribbon"* to a co-equal load-bearing cure (§4.1
axis 2, §4.3, `G-NO-DOUBLE-LINE`, the §3 Family-A "Center"). The evidence points the other way:

- The **four `ribbon:"hull"` (filled) brushes produce the four UGLIEST stills**: boil worm (F34),
  crayon blob (F38), marker slab (F38), highlighter escape (F36). The **two `ribbon:"stroke"` brushes
  produce the LEAST-bad**: pen (F35 — a mild wobble the user calls merely "not pen-like enough", not
  "broken") and pencil (F38 — reads as a thin line). Empirically, in THIS codebase, **stroke reads like
  a line; hull reads like a blob.** Pass 1's own §1 diagnosis even says the worm IS "the hull fill on a
  curvy span." So "make everything a hull fill" is being sold as the cure for a failure that the same
  document attributes to hull fill.
- The doc's defense — *"a filled ribbon has no two edges to read as parallel"* (§2, `G-NO-DOUBLE-LINE`)
  — cures a failure mode (F35 double-line) that is the softest-evidenced of the seven (Finding 2), while
  the cost is **importing the hull's two REAL, verified failure modes** (worm-on-any-curvature; the
  se-guard *vanish* on tiny spans, `ink.ts:198-203`) into pen/pencil, which today have neither.
- The safety net pass 1 offers is "calm centerline + (implicitly) low weight, so the hull stays thin."
  But once the centerline is calm and the weight is low, **a STROKE and a getStroke FILL are visually
  near-identical** — so the fill buys nothing for pen/pencil and adds the tiny-span-vanish regression.

**The two moves are separable and pass 1 fuses them.** *Naturalness ⊥ wobble* (calm centerline + low
weight) is strongly supported. *Fill everything* is a stylistic unification, not a cure, and it is the
wrong lesson to draw from stills where the filled brushes are the disasters. **AMEND:** demote "universal
filled ribbon" from a cure to an *optional* unification; keep pen/pencil as calm low-weight STROKES
unless a pass-3 prototype proves the filled ribbon reads *strictly more* pen-like at equal weight; fill
only where width-variation IS the character (marker/highlighter/crayon — if they survive at all).

## 3. FINDING 2 — the F35 "double-line" root does not survive HEAD (the `vbH` fix already corrects it)

Pass 1 pins F35 on *"thin stroked Catmull-Rom … UNDER `preserveAspectRatio='none'` x-stretch"* (§1
row F35, §2 REPLACED, `G-NO-DOUBLE-LINE`, π-PEN) and makes the x-stretch a "co-cause." But HEAD already
ships the **aspect-correct `vbH` patch** precisely for text-mode underline/strike/highlight:
`boxAspect = host.width/host.height` (`HandMark.vue:189`), `vbH = VB_W / boxAspect` (`:80-89`), applied
as `H = isMeasuredText ? vbH : VB_H` (`geometry.ts:98-101`). That makes the x and y marking-space scales
**equal** for exactly the pen underline — so the text-mode wobble is **NOT differentially x-stretched at
HEAD.** Pass 1 cannot both (a) acknowledge `vbH` "was fighting the flat-ruler" (§2) and (b) still charge
x-stretch as a live cause of F35 — either `vbH` won (then F35 is a wobble-amplitude / thin-stroke read,
cured by the CALM change, not by uniform space) or `vbH` fails (then the doc must CAPTURE that failure,
which it cannot this seat). As written the causal story is internally inconsistent.

Two consequences:

- **The "double-line" is itself an inference, not the user's words.** The user's F35 caption is "should
  be more pen-like, more natural" (`FEEDBACK-LEDGER.md:35`) — not "double line / lens." Reading F35, I
  see one wobbly line, faintly doubled only at the left curve. Pass 1 invents a specific failure mode,
  builds the entire fill-everything unification on curing it, then in §7 gap-1 admits the *root* is
  inferred — but the FAILURE itself is an interpretation, and it is load-bearing. That is thin ice for a
  pillar.
- **Deleting `vbH` + `preserveAspectRatio="none"` (§4.3) is the RISKIEST pillar with the LEAST payoff.**
  For text-mode marks the aspect is already handled by `vbH`, so uniform space is a *refactor*, not a
  cure. Meanwhile the **positioned box/circle/bracket path DEPENDS on the none-stretch to fill the datum
  rect** — the code says so explicitly (`geometry.ts:78,101` "keeps `VB_H` … it DEPENDS on the
  none-stretch"; `HandMark.vue:77`). Pass 1's own §7 gap-3 flags this, but §2/§4.3 still present the
  deletion as a clean win ("kills the x-stretch"). It is a net-neutral-to-negative change for text mode
  and a live regression for box mode. **AMEND:** either capture-prove `vbH` FAILS for the underline
  (justifying deletion) or keep `vbH` for text mode and scope uniform space to box mode only — and in
  either case DRAW the concrete datum geometry under the new space before claiming the pillar.

## 4. FINDING 3 — WEIGHT/thinness is the missing axis (and the missing gate)

The worm (F34) and the blobs (F38) are, above all, **FAT**: boil `weight:7`, crayon `weight:16`, marker
`weight:12`, highlighter `weight:26` (`brush.ts:140,183,234,261`), versus a believable pen underline of
~1.5-2 units. Pass 1's three "independent axes" (§4.1: centerline / width-profile / containment) **omit
absolute weight entirely.** A calm centerline at `weight:7` is still a fat calm worm. There is a
`G-CALM` (excursion) and a `G-NO-DOUBLE-LINE` but **no `G-WEIGHT`** and no stated target thinness
relative to the glyph stroke — which is arguably the #1 lever of "pen-like." Worse, weight semantics are
currently INCONSISTENT across the split pass 1 wants to unify: for `ribbon:"stroke"` the SFC binds
`stroke-width:brush.weight` with `vector-effect:non-scaling-stroke` (`HandMark.vue:291-294`) → weight is
**screen px**; for `ribbon:"hull"` weight is a viewBox `getStroke` size that then STRETCHES. Unifying to
one ribbon is a fine reason to fix this, but pass 1 never states the target. **AMEND:** add WEIGHT as a
first-class axis, a stated pen target (~2 units / a fraction of glyph stroke width), and a `G-WEIGHT`
born-RED gate (RED today: boil 7 / crayon 16 / marker 12 / highlighter 26).

## 5. FINDING 4 — census-fidelity slip: the "11 dead props" list is 12 and mis-includes `amplitude`

Pass 1 §2 (lines 99-101) writes: *"The 11 dead props — `roughness, segments, jagged, amplitude, natural,
overrides, path, points, boilFps, boilFrames, drawDelayMs, drawMs`."* That enumeration is **twelve
items**, and the census's dead-set does **not** contain `amplitude`. The census
(`component-surface---overfit-census.md:11-13`) names the 11 dead as exactly `{boilFps, boilFrames,
drawDelayMs, drawMs, jagged, natural, overrides, path, points, roughness, segments}` and explicitly lists
`amplitude` among the **non-dead** ("Every non-dead prop (brush,shape,color,seed,animation,appear,
amplitude,box) is set only by … `handmark.vue`"). So `amplitude` is *set by the demo*, not dead. Pass 1
is free to RETIRE `amplitude` on merit (it dies with `natural`), but it must not launder that choice as
"census-dead" — the doc's whole authority is census-grounding, and this is a checkable miscount. **AMEND:**
state it straight — "11 census-dead + `amplitude`/`appear` retired-on-merit → delete 13, keep ~4 real
props (`brush · shape · color · animation`, plus hidden `seed`)."

## 6. FINDING 5 (minor) — over-claimed novelty: the open-loop ring already overshoots; the pressure-cut is moot

- **Ring (§4.4).** Pass 1 says "retire the wobbled CLOSED ellipse … draw an OPEN hand-loop that
  overshoots and crosses itself ONCE." But `ellipsePoints` **already** sweeps `2π + (0.05..0.17)`
  (`path.ts:306`, "overshoot → hand-circled") — the overshoot/self-cross is in the substrate. The REAL
  F39 fixes are three verified toggles: `closed:true → open` handling (`geometry.ts:174`), the
  `z-index:-1` layer (`HandMark.vue:338` → front), and dropping the ring's `grain:0.7`
  (`brush.ts:222`). The substantive fixes are right; the "draw an open loop" framing over-states new work.
- **Curvature-pressure cut (§4.3).** Pass 1 lists "cut `addPressure`'s curvature coupling" as an
  independent cure. But `addPressure` thins on curvature via `PRESSURE_BASE*(1 - 2.5*k)`
  (`ink.ts:101-118`); once the centerline is CALM, `k≈0` everywhere → pressure floors to `PRESSURE_BASE`
  → the coupling is already a near-no-op. It is *coupled to* the calm-centerline change, not an
  independent axis. Minor over-counting of "three independent cures."

## 7. FINDING 6 — the highlight-containment vs intentional-multiply tension is asserted, not drawn (concur + sharpen)

Pass 1 §7 gap-4 honestly flags this; I sharpen it. The current escape (F36) is the `weight:26` low-seat
hull (`HIGHLIGHT_RISE=0.22`, `constants.ts:30`) rendered under `overflow:visible` (`HandMark.vue:327`)
with `mix-blend-mode:multiply` + `z-index:-1` (`:340-343`) and NO isolation *by design*
(`:312-316` — the SFC comment insists the multiply MUST hit the page). So the containment fix must
simultaneously: (i) kill the vertical escape, (ii) preserve the round end-cap horizontal overshoot the
`overflow:visible` exists for (`:320-327`), and (iii) keep the multiply compositing against the page
text. A naive `clip-path` inset that stops the vertical bleed will also clip (ii). This is a genuine
three-way constraint and it is **completely unspecified** — "a `clip-path` on the svg to the line-box
rect" (§4.4) is a hand-wave until the actual inset values (asymmetric: tight top/bottom, loose
left/right) are drawn. Load-bearing and OWED for pass 3.

## 8. FINDING 7 — the brush register is a hypothesis, and B/D are under-developed (concur)

§4.5 "cut boil/crayon/marker/ring to Brush-object overrides" is the critic-default, not a demonstrated
verdict — pass 1 says so (§7 gap-2). Correct to flag; it is the one decision that sets the final surface
and it is entirely unearned this seat. Separately, the charter wants each family developed independently
to expose its real gaps *before* cross-pollination; B (corpus) and D (type) are one paragraph each with
no concrete corpus/font source, so they are banked slogans, not competitors. Fine as a pass-1 cap;
must not calcify.

---

## 9. Gate audit (born-RED discipline)

| gate | RED-at-HEAD cited | verified | note |
|------|-------------------|----------|------|
| G-CALM | `constants.ts:57-61` 4 octaves @ 5% span | ✅ `NOISE_OCTAVES=4`, `NOISE_AMP_FRAC=0.05` | sound scalar predicate |
| G-NO-DOUBLE-LINE | `HandMark.vue:271`+`geometry.ts:120` | ⚠️ | root contested — Finding 2; the *predicate* (scanline crossings ≤2) is fine, but its RED cause is mis-attributed to x-stretch |
| G-NO-SLIVER | `ink.ts:203-210`; `brush.ts:183-201` | ✅ se-guard fallback + crayon w16 | sound |
| G-CONTAIN | `HandMark.vue:327` + no clip | ✅ `overflow:visible`, no isolation | sound; spec owed (Finding 6) |
| G-RING-LAYER | `HandMark.vue:331-339` z-index:-1 + grain | ✅ `:338` + `brush.ts:222` | sound |
| G-PROPS | 19 props, 11 dead | ⚠️ | 19 verified; "11 dead" enumeration is 12 incl. `amplitude` (Finding 4) |
| G-NO-JARGON | `handmark.vue:37,50,66,119,150` | ✅ verbatim | strongest-grounded gate |
| **G-WEIGHT** | — | ❌ MISSING | Finding 3 — add it |

Gates are otherwise appropriately small (gates-abrogation mandate) and each (bar the two flagged) names a
real RED line. Good.

---

## 10. Convergence re-score

Pass-1 claimed **55%**. Adjusting for: (−) the central "universal ribbon" unification is weaker than
presented and partly contra-evidence (Finding 1); (−) the uniform-space pillar's F35 story fails at HEAD
and its box-mode regression is unpriced (Finding 2); (−) the dominant naturalness lever (weight) is not
an axis or gate (Finding 3); (−) a census-fidelity slip dents the doc's grounding claim (Finding 4);
(+) diagnosis is verified, substrate is real, the calm/containment/shape-degrade/de-jargon spine is
strong, banking is honest, π is honestly OWED.

**Earned convergence ≈ 48%.** The WELL-supported half (calm centerline + low weight + containment +
shape-degrade + de-jargon) is genuinely convergent and BESTs the current design; the fill-everything +
delete-`vbH` half is the soft underbelly and must be re-argued or scoped down. Route A is the right
leader and ADVANCES, AMENDED.

---

## 11. Pass-3 deliverables (named, ordered)

1. **Prototype + capture the RED baselines** (the one thing that could re-order A vs B): pen underline,
   boil worm, highlight escape → capture π-PEN / π-CALM / π-CONTAIN against F35 / F34 / F36. Still OWED.
2. **Settle fill-vs-stroke empirically, don't assume.** Prototype pen/pencil BOTH ways — calm low-weight
   STROKE vs calm low-weight FILLED ribbon at equal weight — and show which reads more pen-like. Only
   fill everything if it *strictly* wins. Add the WEIGHT axis + a stated pen target + `G-WEIGHT`.
   (Findings 1, 3.)
3. **Reconcile uniform-space with `vbH`.** Either capture-prove `vbH` fails for the text-mode underline
   (earns its deletion) or keep `vbH` for text mode and scope uniform space to box mode — and DRAW the
   concrete box/circle/bracket datum geometry under whatever space you choose (the unpriced regression).
   (Finding 2.)
4. **Draw the highlight-containment spec concretely:** the asymmetric `clip-path` inset (tight
   top/bottom, loose left/right) that kills the vertical escape while preserving the round end-caps AND
   the page multiply — with the exact stacking/`overflow` interplay. (Finding 6.)
5. **Draw the open-loop ring construction concretely:** the `ellipsePoints` sweep-open handling
   (`closed:false`), the single self-cross, the front-z CSS, grain removed — acknowledging the overshoot
   already lives in `path.ts:306`. (Finding 5.)
6. **Earn the brush register:** prototype boil/crayon/marker/ring under the new ribbon and SHOW they
   still can't read natural, or retune-and-keep. The reduced register is currently a hypothesis. (Finding 7.)
7. **Fix the census enumeration:** "11 census-dead + `amplitude`/`appear` retired-on-merit → ~4 real
   props." Precise, not laundered. (Finding 4.)
8. **Develop B (corpus source) and D (font source + span-fit) far enough to expose real gaps,** or
   explicitly demote to appendix per the charter — do not leave them as one-paragraph slogans. (Finding 7.)
