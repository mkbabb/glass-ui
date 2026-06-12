# Atlas C-Cargo: state-vs-spec (BA fleet lane)

The three design-grade cargo items in the atlas letter register C. Read against
master HEAD (`fca660e2`, the BA-authoring tree at v3.13.0 base) and the d6 fork
(`feat/d6-library-3.10`, tip `2755ebbd`). Severities `[S1|S2|S3]`; gestalt
directions, not patches.

**The framing the letter's prose obscures**: all three cargo items live on the
**FORK lineage, not master**. The handmark family (which carries the highlighter)
was minted in `91b8c2f2` (the D6 wave, 3.10.0 — the fork's base) and NEVER
reached master HEAD (`git ls-tree HEAD | grep handmark` = 0 files). The atlas's
"your tree ships ~90% dormant" refers to the **d6 fork's** handmark — the tree the
atlas consumed on the 3.11.x/3.12.0 publishes. So C-1 and (the engine for) C-2 are
not "flip a flag on master" — they are **port-then-engage** from the fork, and the
A-list B-list census lane covers the porting; C-CARGO covers the design deltas to
apply AS the port lands. Net: the BA amendment must (1) port handmark, (2) apply
the four highlighter field deltas, (3) wire pencil-boil into GlassUnderline's
`boil` variant, (4) mint a silver quad mirroring the surviving static gold tokens.

---

## C-1 — THE HIGHLIGHTER ("~90% dormant")

**What ships (fork `2755ebbd`, NOT master).** The handmark family carries a
complete `highlighter` register — but every one of the four field deltas the atlas
names is mis-set in the preset OR swallowed in render. The capability is all
present-but-inert: the brush field machinery (ribbon/cap/taper/blend) EXISTS, the
geometry case EXISTS, the multiply CSS EXISTS — and not one of them is wired to
paint a correct highlight. "90% dormant" is exact.

The five deltas (the letter lists 4 + "isolation must not trap the multiply" = 5):

**(a) geometry rides LOW not middle** `[S2]`
- HEAD: `src/components/custom/handmark/geometry.ts:86-87` (fork) — the
  `case "highlight":` returns `L(x1, cy, x2, cy)` where `cy = box ? box.y+box.h/2 : VB_H/2`
  (`geometry.ts:62`) — the band rides the **box vertical center**. The inline
  comment even declares it: *"the centerline rides the box middle."*
- The underline case already has the correct idiom: it seats on a **MEASURED
  baseline** (`baselineFrac`, `geometry.ts:50-74`) — `VB_H × (baselineFrac + UNDERLINE_GAP)`.
  The highlight band must seat on the **x-height/baseline band** (a real
  highlighter rides the low two-thirds of the line, the ink sitting on the
  baseline and rising to ~x-height), NOT vertically centered.
- Flip: re-seat the highlight centerline from `cy` to a baseline-anchored low band
  (a `yBase`-relative offset that uses the measured `baselineFrac`, raised by
  ~half the weight so the 26-unit slab covers x-height down to the baseline). This
  is a geometry re-author, not a constant tweak — the highlight needs its OWN
  y-band derivation, parallel to the underline's, not a shared `cy`.

**(b) engage ribbon:"hull"** `[S2]`
- HEAD: `brush.ts:222` (fork) — the `highlighter` preset is `ribbon:"stroke"`. The
  preset's own comment header (`brush.ts:147`) flags the hull as a deferred field
  delta: *"hull (ribbon:'stroke' — the width-variance hull is a later
  field-delta)."* The `ribbon:"hull"` path is fully built (`ink.ts:108-128` — the
  vendored perfect-freehand `getStroke` body with pressure + taper easing), just
  un-selected for the highlighter.
- Flip: set the `highlighter` preset to `ribbon:"hull"`. CAVEAT — this is the only
  delta that drags the vendored `freehand.ts` perfect-freehand core into the
  highlighter's chunk (it treeshakes away while every preset is `ribbon:"stroke"`,
  per `ink.ts:8-10`). Engaging hull on a default-reached preset means the pf body
  ships whenever the highlighter does. That is acceptable (the hull IS the
  variable-width-slab read the atlas wants), but the chunk-size note belongs in the
  cut notes + a `profile:budget` rebaseline.

**(c) non-zero taper** `[S3]`
- HEAD: `brush.ts:221` (fork) — `taper: { start: 0, end: 0, ease: "linear" }`. A
  highlighter with zero taper is a hard rectangle; a real marker has a lift-on /
  dry run-out at each end. The `TaperSpec` is fully honored by the hull body
  (`ink.ts:116-117` → pf `start.taper`/`end.taper`).
- Flip: give the highlighter a small non-zero taper (e.g. `{ start: 6, end: 10,
  ease: "out-cubic" }` — the marker preset at `brush.ts:201` already uses that
  shape). Trivial value change; ONLY paints once (b) engages hull (the
  `ribbon:"stroke"` branch ignores taper).

**(d) cap:"square" must reach the DOM** `[S1]` — TWO swallow seams, both load-bearing
- HEAD seam 1: `brush.ts:234` (fork) — the preset DOES set `cap: "square"`. But the
  stroke ink stage NEVER emits it: `ink.ts` (the `ribbon:"stroke"` branch, ~line
  140) builds the `InkPath` with `{ d, stroke, opacity, blend }` and **no `cap`
  field** — `b.cap` is read nowhere in `ink()`. The brush carries the cap; the ink
  stage drops it on the floor.
- HEAD seam 2: `HandMark.vue:294-296` (fork) — the SFC hardcodes
  `.hm__path { stroke-linecap: round }` in scoped CSS, overriding ANY cap the path
  could carry. Even if `ink.ts` emitted `stroke-linecap`, this CSS would clobber it
  (a class selector beats the attribute? no — but the SFC sets it on every path
  unconditionally, so a per-path attr is the only escape and it isn't emitted).
- Flip: (1) thread `b.cap` through `ink.ts` into the emitted `InkPath` (add a `cap`
  field, bind it `stroke-linecap` on the `<path>` in `HandMark.vue:242-253`); (2)
  drop the hardcoded `stroke-linecap: round` from `HandMark.vue:295` (let the
  per-path attr win) OR make the CSS read a `--hm-cap` custom prop the brush sets.
  This is the cleanest of the five — a prop genuinely swallowed before render, the
  atlas's diagnosis is precise. `[S1]` because it's a two-layer swallow that no
  single edit fixes (both the ink emit AND the CSS override must yield).

**(e) isolation must not trap the multiply** `[S1]`
- HEAD: `HandMark.vue:265-266` (fork) — `.hm { isolation: isolate }` with the
  comment *"highlighter multiply must compose against the page, not sibling marks."*
  Paired with `HandMark.vue:291-292` — `.hm[data-behind="true"] .hm__svg {
  z-index: -1; mix-blend-mode: multiply }`.
- The TRAP: `isolation: isolate` creates a **new stacking context** on `.hm`. A
  `mix-blend-mode: multiply` only blends against what's BEHIND it **within the same
  stacking context** — so the isolated `.hm` makes the highlighter multiply against
  the (transparent) isolated group's backdrop, NOT the page content behind the
  word. The comment's INTENT ("compose against the page") is exactly defeated by
  the mechanism (`isolate` walls it OFF from the page). The author reached for
  `isolate` to stop sibling-mark bleed and got page-isolation as a side effect.
- Flip: this is a stacking-context redesign, not a one-liner. The multiply highlight
  must live in a context that includes the page text behind it — either (i) drop
  `isolation: isolate` and accept sibling marks compose (rare — one mark per word),
  or (ii) lift the `mix-blend-mode: multiply` element OUT of the isolated `.hm`
  (render the behind-band as a sibling of the word in the parent's context, not a
  child of the isolated span). `[S1]` — the multiply is the whole point of a
  highlighter and it currently composes against nothing.

**Severity gestalt**: (d)+(e) are `[S1]` because they mean the highlighter
**cannot render its defining behavior** (square-cap slab + multiply-over-text) even
when mounted — that IS the "dormant." (a)+(b) are `[S2]` (wrong-but-visible read).
(c) is `[S3]` (polish). The gestalt direction: do not "fix the five" as five
patches — author a single **highlighter-correct path** in the handmark port (a
baseline-low hull slab with taper, square cap reaching the DOM, multiply in a
page-inclusive context), gated by a born-RED test that mounts a highlight and reads
back all five (the geometry y-band, the hull fill, the non-zero taper width, the
`stroke-linecap=square` attribute, the multiply-against-page π). The fork carries no
highlight demo (`git grep shape=highlight 2755ebbd` = 0), so the "dormant" is also
**unexercised** — the test IS the first consumer.

---

## C-2 — THE NATURAL-UNDERLINE MORPHOLOGY

**What ships (master `/underline`, AY H6).** `GlassUnderline.vue`
(`src/components/custom/underline/`) is a draw-on wavering pen underline — but its
wobble is **TWO HARDCODED static d-strings**, not procedural morphology:
- `GlassUnderline.vue:129-130` — `STROKE_D = "M1,6 C18,3 30,8 48,5 S78,3 99,6"` and
  `GHOST_D = "M1,7.1 …"`. Authored ONCE, byte-matched to the sci-report source. The
  header even declares the invariant: *"The wobble is in the path CONTROL POINTS,
  authored once"* (`:14`), *"FILTER-FREE … no feTurbulence"* (`:10`).
- The `variant: "pen" | "pencil" | "crayon" | "boil"` axis (`:62`, `types.ts:13`)
  is **explicitly unproven headroom that renders pen today** — *"pencil | crayon |
  boil are UNPROVEN headroom — the API seam for a future wave, NOT shipped (they
  render pen today)"* (`:39-41`).

**The gap to the atlas spec** (their 4 axes):
- **scale-relative amplitude**: ABSENT. The wobble amplitude is baked into fixed
  control-point y-values in a `0..100 × 0..10` viewBox stretched by
  `preserveAspectRatio="none"` — so the wave deforms with the word width, the
  amplitude is NOT scale-relative, it's viewBox-relative-then-stretched (a long
  word's wobble flattens, a short word's exaggerates). The spec wants amplitude
  proportional to the rendered scale.
- **irregular 2-4 periods**: ABSENT. The single d-string has a FIXED period count
  (the `C…S…` cubic = ~2 humps), identical for every instance, every word, every
  mount. No irregularity, no per-instance variation.
- **pressure taper**: ABSENT. `stroke-width` is a uniform `--gu-stroke-width`
  (`:286`); the ghost is `+1` uniform (`:297`). No variable-width pressure profile.
- **seed discipline**: ABSENT. There is no seed — the geometry is deterministic by
  being IDENTICAL (one constant), not by being seeded-reproducible. The spec wants
  per-instance variation that's stable under a seed.

**The engine that closes the gap is the fork's pencil-boil** (`3b10db81` adds
`@mkbabb/pencil-boil ^0.4.0`; master's `package.json` has NO pencil-boil dep —
confirmed). pencil-boil exports `perturbPoints` / `mulberry32` / `catmullRomToBezier`
(the fork's handmark imports all three, `ink.ts:18-19`) — exactly the procedural
wobble engine GlassUnderline's `boil` variant promised. The fork's HandMark
`shape:"underline"` (`geometry.ts:wobbleLinePoints` → pencil-boil) is the natural
morphology the editorial underline lacks.

**Gestalt direction**: do NOT fork a third underline impl. Wire the fork's
pencil-boil engine into GlassUnderline's existing `boil`/`pencil`/`crayon` variant
seam — the `paths` escape tuple (`GlassUnderline.vue:91-96`, the full
`{stroke, ghost, viewBox, len}`) is already the injection point. A `variant="boil"`
underline computes its `STROKE_D` from `perturbPoints(seeded line, …)` instead of
the constant, honoring scale-relative amplitude (derive from the rendered width
GlassUnderline already measures for nowrap), irregular periods (a seeded period
count in 2-4), and pressure taper (the `ribbon:"hull"` pf body, same as the
highlighter's (b)). **FILTER-FREE survives**: pencil-boil's wobble is in control
points, not a `feTurbulence` — the same invariant GlassUnderline's header already
holds (`:10`). The keyframes-draw clock (load/scroll/static, the dash model) is
UNTOUCHED — only the path GEOMETRY becomes procedural; the draw stays the
dashoffset sweep.

**Born-RED gates port from the atlas spec** (their spec file is in their repo; work
from the letter's 4 named axes):
- `boil` variant emits a path that DIFFERS from `pen`'s constant `STROKE_D` (the
  "renders pen today" no-op dies).
- amplitude scales with rendered width (π: two widths → proportional peak
  deviation, not a stretched-constant).
- period count is in [2,4] and varies by seed (two seeds → different period counts
  or phase).
- a seed reproduces byte-identical geometry across mounts (the seed-discipline
  determinism floor).

**Seed-discipline TENSION** `[S2]`: the house seed home is `src/utils/prng.ts`
(`mulberry32` + `hashString`, the watercolor-dot/goo-blob single-source). The fork's
pencil-boil ships its OWN `mulberry32`, and handmark imports `mulberry32` FROM
pencil-boil (`ink.ts:18`), NOT from the house leaf. Two `mulberry32` sources is the
seam to reconcile: either (a) GlassUnderline's `boil` seeds via the house
`src/utils/prng.ts` and feeds pencil-boil's `perturbPoints` the house-seeded stream,
or (b) the cut notes formally record pencil-boil's `mulberry32` as the seed home for
the hand-voice family (and `prng.ts` stays the seed home for the WebGL organic
shapes). Recommend (a) — ONE seed leaf, the house identity; pencil-boil's perturb
math consumes a house-seeded RNG. Do not let the port quietly fork the seed source.

---

## C-3 — THE SILVER STRUCTURE QUAD

**What ships.** The gold family is a complete **quad** —
`scale-paper.css:78-80,88` mints `--gold` / `--gold-light` / `--gold-dark` /
`--gold-deep` (4 stops, oklch), bridged through `theme/bridges.css:209-212` to the
`--color-gold-*` namespace, with light/dark arms (`light-dark.css:154-156`,
`dark-arm.css:196-198`). **Silver appears NOWHERE in `src/`** — only in the atlas
letter. "Gold shipped; the structure metal never did" is exact.

**What a "structure quad" is**: the silver sibling of gold — a 4-stop metal ramp for
**structural / chrome accents** (frame edges, structural dividers, the cool-metal
counterpart to gold's warm-accent register). Gold is the warm CTA/headline metal;
silver is the cool structural metal. The quad shape mirrors gold:
`--silver` (the mid) / `--silver-light` (the catch-light highlight) /
`--silver-dark` (the recessed groove) / `--silver-deep` (the fixed
mode-invariant structural plate, gold-deep's sibling).

**Recommended token shape** (mirror gold's exact cascade — token-first, presets-in-
consumers respected: this is a LIBRARY identity metal, not a consumer preset):
- `scale-paper.css §13a` (beside gold): four `--silver-*` oklch stops at gold's
  chroma-low, hue-neutral-cool register (a desaturated cool-gray-blue: ~hue 250-260,
  chroma ~0.02-0.04 — silver is near-achromatic-cool, deliberately low-chroma so it
  reads as METAL not as a blue accent). NOTE the BA W-NO-GRAY wave (the warm-chroma
  floor, C<0.020 resolves achromatic) — silver must sit ABOVE that floor or be
  explicitly exempt (a structural metal IS legitimately near-achromatic; coordinate
  with W-NO-GRAY so silver isn't swept into the warm-48 ladder). `[S2]` tension —
  name it in the cut.
- `theme/bridges.css`: `--color-silver-*: var(--silver-*)` (the namespace bridge,
  gold's pattern at `:209-212`).
- light/dark arms (`light-dark.css` + `dark-arm.css`) mirroring gold's per-mode
  stops — a structural metal reads differently light vs dark (a cool highlight in
  light, a cool sheen in dark).

**Consumer truth — the ≥2-consumer tension, flagged honestly** `[S2]`:
- **Consumer 1 = the atlas** (their structural-chrome accent need; the letter is the
  ask).
- **Consumer 2 — the in-repo candidate**: the closest in-repo structural surface is
  `instrument-chassis.css` — it consumes `--color-gold` as its `--phase-color`
  (`:181-182`), the warm structural-accent register, and SURVIVES W-GLASS-CAL (the
  disco retirement spares the instrument-chassis gold). The honest read: the chassis
  bezel/groove-divider is the natural silver consumer (a cool metal bezel is the
  structural-chrome archetype), but it currently has no silver demand — proposing
  silver there is speculative-substrate UNLESS the BA amendment also lands a chassis
  silver-variant or a demo surface that USES it. **The ≥2-consumer invariant (J inv
  10 / L inv 8) is in genuine tension**: gold has the instrument-chassis + the
  CTA-button + the gold-shimmer headline (3 in-repo); silver would ship with ONE
  external consumer (atlas) and ZERO in-repo binary consumers.
- **Recommendation, honest**: ship the silver quad ONLY if the BA amendment ALSO
  mints an in-repo consumer — the cleanest is a `<Card surface="structure">` or an
  instrument-chassis `--chassis-metal: silver` variant + a demo story exercising it
  (the showcase surface). If no in-repo consumer materializes, **DEFER the silver
  quad to a DISPOSITION-REGISTER BOOK row** (the L inv-8 pattern the BA W-CLOSE
  already uses for ~28 BOOK rows) — minted-when-second-consumer-lands, not shipped
  speculative. Do NOT ship a 4-token metal ramp with one external consumer and call
  it visual-load-bearing; that is the exact substrate-without-consumer anti-pattern
  the house gates (`proof:overfitting`) catch at close.

---

## CROSS-CUT — collisions + compositions with authored BA waves

**The THREE-underline-register map (the load-bearing reconciliation — name it so
two waves don't fork three registers):**

There are THREE distinct underline/ink-mark registers in flight. They are NOT the
same family and must stay distinct — but the relationship must be NAMED:

1. **`.paper-ink-mark`** — minted by **W-SURFACE-AXIS scope 8**
   (`BA.W-SURFACE-AXIS.md:79`), consumed by **W-TABS** (`BA.W-TABS.md:66`). A
   **STATIC straight 2px `--foreground` ink hairline** — no plate, no blur, no
   wobble, no draw. The tab underline indicator + the math-paper section rail
   (`border-l-[3px]`). A MARK register (typography paper section), NOT a
   `[data-surface]` plate rung. The indicator engine drives its inline
   position/width; the mark itself is a flat line.
2. **`GlassUnderline`** (`/underline`, AY H6) — the **EDITORIAL animated draw-on
   wavering pen underline**. Static d-string wobble TODAY (C-2's target: make it
   procedural via pencil-boil). A delight mark under a word/headline, FILTER-FREE,
   keyframes-draw.
3. **HandMark `shape:"underline"`** (fork) — the **procedural pencil-boil hand
   centerline**. The hand-voice family's underline (the masthead default).

**The relationship to name** (so the BA amendment doesn't fork them):
- `.paper-ink-mark` is a STRUCTURAL hairline (tab indicators, section rails) — a
  STRAIGHT line, the engine positions it. It is NOT an editorial wobble and NOT a
  hand mark. W-TABS/W-SURFACE-AXIS own it. **No collision** with C-2 — they're
  different jobs (structural indicator vs editorial delight).
- `GlassUnderline` (C-2) and `HandMark shape:"underline"` (the fork) ARE the same
  morphology family — both want a wavering hand line. The reconciliation: **C-2's
  procedural-underline engine SHOULD be the fork's pencil-boil, the SAME engine
  HandMark uses** — so the port lands ONE wobble engine (pencil-boil's
  `perturbPoints`) feeding BOTH `GlassUnderline variant="boil"` AND
  `HandMark shape:"underline"`. Do not let C-2 author a second procedural wobble
  while the handmark port brings pencil-boil's. **They COMPOSE on pencil-boil**, and
  the seed-discipline reconciliation (C-2's `mulberry32` tension) covers both.
- The risk the BA amendment must avoid: a W-TABS agent extending `.paper-ink-mark`
  toward "natural" + a C-2 agent authoring procedural wobble + the handmark port
  bringing a third = **three forked wobble engines**. The fence: `.paper-ink-mark`
  stays a STRAIGHT structural hairline (W-TABS's explicit "2px hairline, no plate" —
  it does NOT become a wobble); C-2 + handmark share pencil-boil. ONE structural
  hairline register, ONE procedural-hand engine, cleanly disjoint.

**C-1 (highlighter) × W-GLASS-CAL (gold-disco retirement)** — **COMPOSES, no
collision.** W-GLASS-CAL.2 retires the gold DISCO recipe (`btn-audacious`,
sparkle-sweep, the animated gold sweep) — but hinge H2(a) keeps the STATIC gold
register + the multiply/mix-blend idioms are unrelated to the disco. The
highlighter's `mix-blend-mode: multiply` (`HandMark.vue:292`) is the SAME blend
vocabulary the house already uses across paper.css / cards.css — it is not disco,
not retired, FENCED-IN. No overlap.

**C-3 (silver quad) × W-GLASS-CAL (gold-disco retirement)** — **COMPOSES, the
critical clarification.** W-GLASS-CAL retires the gold DISCO RECIPE, NOT the
`--color-gold-*` TOKENS. The four gold token stops (`scale-paper.css:78-88`) SURVIVE
(H2(a): "the at-rest `--color-gold` wash … survives"; the static `.gold-shimmer`
gradient is FENCED-OUT per `BA.W-GLASS-CAL.md:32`). So the silver quad mirrors the
**surviving static gold token shape**, NOT the dying disco recipe — it inherits
gold's token cascade (scale-paper → bridges → light-dark/dark-arm) and never touches
`btn-audacious`. The silver quad is purely additive token-mint; W-GLASS-CAL is
purely recipe-retirement. They are file-disjoint (silver in `scale-paper.css §13a` +
`bridges.css`; disco-retire in `utilities/btn.css` + `animations.css`). **No
collision** — the only coordination is the W-NO-GRAY warm-chroma-floor exemption for
silver's near-achromatic stops (named above).

**The cut mechanics (register D / hinge H4)**: C-1+C-2 require the handmark family +
pencil-boil dep to LAND on master (the A/B census lane owns the port; C-CARGO owns
the field deltas). The new `@mkbabb/pencil-boil ^0.4.0` peer + the engaged hull pf
body are bundle-size events → `profile:budget` rebaseline + a cut-note line. All
three cargo items reinforce hinge H4 arm (a) **4.0.0** (the honest major) — they're
additive capability, but they ride the same cut as the disco-retirement breaks, and
the handmark/highlighter port is a surface ADDITION (new `/handmark` subpath) the
semver-major cut should name explicitly in the lineage notes.
