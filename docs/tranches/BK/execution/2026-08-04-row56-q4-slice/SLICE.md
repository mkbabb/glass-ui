# Row #56 · the Q-4 RECEIVER SLICE — a structured backdrop for `/navigation/tabs` + `/forms/slider`

**Wave** BK #56 `W-DEMO-TRUTH`, Q-4 slice only · **landed early** because it is π-1's hard
precondition (W-FROST `APOTHEOSIS-SPEC.md` §12: "`/navigation/tabs` + `/forms/slider` must mount a
structured backdrop or their material π is inadmissible").
**Not this slice** — the wave's remainder (the hierarchy rows, `ShowcaseFrame surface="opaque"`
×118, the manifest seam) is untouched.

**Files** (the whole diff):

- `demo/stories/navigation/tabs.vue`
- `demo/stories/forms/slider.vue`

No chassis file, no token file, no manifest row was edited.

---

## §1 · WHY

FROST Q-2 makes a structured substrate the **admissibility precondition** of every transmission
quadruple ("only evidence's σ 50.78 is admissible; a π on a flat field is void by σ-degeneracy").
Q-4 routes the two demo routes that carry the measured specimens to #56 as a receiver row.

Measured baseline on both routes at HEAD: they are `page`-variant rows, so `StoryHero`'s field
never mounts and the only thing behind the glass is the recessive shell aurora at its
`opacityCeiling` 0.5 — **σ = 1.8 (light) / 1.9 (dark)**. A blur radius over that is invisible; both
routes' material π was inadmissible by construction.

## §2 · THE IDIOM CHOSEN — the FIELD-WELL

Each glass specimen now sits in a `.specimen-well`: a **field-well**, the house idiom the
configurator gallery already ships.

| layer | what it is | precedent cited |
|---|---|---|
| the FIELD (low frequency) | the device-free `auroraFallbackGround` raster on the well's own background, at `background-size: cover` / `background-position: center` / smooth upscale | `src/components/configurator/styles.css` §3 field-well — "the device-free `auroraFallbackGround` background-image is set inline per tile … the well is the COLOURFUL field; the warm-glass capsule frames it". The same bake the aurora preset cards use (`demo/stories/substrates/aurora/usePresetThumbnails.ts`) and the same one `AppShell.vue` paints as its eager first-paint surface |
| the RULING (high frequency) | the shipped `.grid-bg` blueprint wash, its two strength knobs dialled up on the well only | `demo/chassis/hero/story-hero.css:139` (the utility, mounted verbatim) + `src/styles/tokens/scale-paper.css:133-134`, which names `--grid-line` / `--grid-line-major` **the consumer strength knobs**. The pitch rhythm (`--grid-pitch` 1rem / `--grid-major` 5rem) is the shared one, untouched |

Nothing new was minted: no one-off texture, no pasted raw CSS texture, no GL context. The field is
**one CPU field sample at setup** — a parked raster, not a live surface — so the demo's perf budget
and the one-GL-per-route fence are both unmoved, and there is nothing for PRM to pause.

**The palette.** The field is each route's **own category hero palette** (`cat-navigation`,
`cat-forms` — the per-category identity `manifest.ts` declares), **hue and chroma kept**, with only
its L band re-registered for a plate:

- **light `[0.58, 0.97]`** — the pastel hero wash folded DOWN into a band a 7-11px blur can
  visibly bite. At the shipped hero L the wash is too pale to measure through.
- **dark `[0.04, 0.64]`** — the house **luminous-dark** model (`aurora-hero.ts`
  §`shellAuroraConfigDark`: low L, warm hue, chroma KEPT so the field glows ember rather than
  collapsing to charcoal) on a **wider** band. The page-wide shell wash must stay recessive
  because prose rides it; a specimen well carries none, so it can hold real structure. Selected via
  a plain `.dark .specimen-well` ancestor rule — a scoped `:global(.dark)` silently drops.

**What is deliberately NOT welled.** The three `variant="underline"` paper sections on
`/navigation/tabs` (lines 260, 281, 376 — the responsive-collapse section is also underline; the
count was corrected at adjudication). That material declares NO plate, NO blur and NO track — it has nothing to
transmit and no π to feed, and a field behind it would destroy the paper read the section exists to
show.

## §3 · THE LAWS, HELD

- **Backdrop-root.** The field and the ruling both paint BEHIND the specimen (`> .grid-bg` at
  `z-index: 0`, `> :not(.grid-bg)` at `z-index: 1`), and the slice ADDS no `filter`,
  `backdrop-filter`, `opacity`, `mix-blend-mode`, `isolation` or `contain` anywhere. The well's
  rounding is carried by `border-radius: inherit` on the ruling plane, not by `overflow`/`contain`.
  (Corrected at adjudication — the original blanket "every glass box keeps the page as its backdrop
  root" was over-broad on two pre-existing counts: (a) the tabs wells sit inside `.glass-card`
  wrappers, which carry `backdrop-filter: var(--glass-blur-resting)` + `contain: paint`
  (`glass/surfaces.css`, `glass/material.css`), so a welled tabs specimen's backdrop root is the
  CARD — whose composite contains the well field painted crisp, a descendant untouched by the
  card's own frost, so the transmission read is unharmed; (b) the tabs indicator `.glass-capsule`
  reads through `.glass-capsule-track`, which carries its own `backdrop-filter:
  var(--glass-blur-quiet)` (`glass/glass-capsule.css`) — **π-1 must take the tabs transmission read
  off the TRACK, not the traveling capsule**, or it measures a doubly-blurred plate and
  under-reports transmission.)
- **No masking fallback.** The ground is the PRIMARY surface, not a stand-in for a dead live field —
  the same standing the `AppShell` boundary gives it.
- **PRM.** Nothing animates. Static in both modes.
- **Specimens untouched.** Not one prop, class or `v-model` on a `SegmentedTabs` or `Slider` changed;
  the stories' section structure, headings and blurbs are byte-unchanged. The only markup added is
  the well wrapper and its aria-hidden ruling plane.
- **Prose stays off the field.** Every caption, label and blurb remains on the page surface; the well
  wraps the specimen only. The `--muted-foreground` register is never asked to clear AA over a
  structured field.

## §4 · THE σ ACHIEVED

Measured by a headless probe (`sampleAuroraField` at the SAME 12×12 lattice the shipped raster
paints, composited at 1-CSS-px with the ruling at its shipped strengths, Rec.601 luma 0-255, crop =
the well interior behind the specimen). This is the paint modelled, not a paint capture — **the
capture of record is the driver's π-1**.

```
BASELINE (what both routes had — shell field @ ceiling 0.5, no ruling)
  light   σ = 1.8   μ = 232.5
  dark    σ = 1.9   μ =  21.7

SHIPPED .specimen-well
  /navigation/tabs  light  strip 300×72    σ = 42.4  μ = 169.7  [71..220]   σ_LF = 40.5  σ_HF = 12.6
  /navigation/tabs  dark   strip 300×72    σ = 40.3  μ =  79.5  [24..182]   σ_LF = 38.5  σ_HF = 11.9
  /navigation/tabs  light  wide  560×72    σ = 43.0  μ = 169.5  [68..220]   σ_LF = 41.3  σ_HF = 12.0
  /navigation/tabs  dark   wide  560×72    σ = 41.1  μ =  79.7  [24..182]   σ_LF = 39.2  σ_HF = 12.4
  /forms/slider     light  track 480×48    σ = 41.5  μ = 170.6  [71..220]   σ_LF = 39.7  σ_HF = 12.1
  /forms/slider     dark   track 480×48    σ = 40.7  μ =  79.6  [25..181]   σ_LF = 38.9  σ_HF = 12.0
  /forms/slider     light  vert  120×260   σ = 40.3  μ = 170.2  [71..220]   σ_LF = 37.2  σ_HF = 15.5
  /forms/slider     dark   vert  120×260   σ = 39.3  μ =  79.7  [24..183]   σ_LF = 36.5  σ_HF = 14.6

  (Adjudication note: 120×260 is NOT the shipped vertical geometry — the vertical slider is
  `width: var(--slider-track-height, 0.375rem)` × `height: 12rem` (Slider.vue), so the real well
  is ≈56×228 after the clamp padding. An independent probe at 56×228 measured σ = 42.1 light /
  40.9 dark — above the tabled row; the claim survives at the shipped geometry.)

σ_LF = σ surviving a 7px box blur (the shipped frost radius) — the σ_kept carrier
σ_HF = the residual the blur destroys — the hf_kept carrier
```

**σ ≈ 39-43 in BOTH modes, every well geometry** — a 21× lift off the 1.8/1.9 baseline, in the
σ≈50-class neighbourhood the Q-2 ruling names. It is honestly **not** 50.78: that figure was read
off a photographic exemplar, and no house idiom reaches it without either abandoning the warm-cream
identity or pushing the plate dark enough to endanger on-glass text. What it is instead is
**spectrally balanced on purpose**: a substrate whose σ were all high-frequency hairline would
starve `σ_kept` (structure that cannot survive any blur reads as a material failure that is really a
substrate artefact), and one that were all low-frequency wash would starve `hf_kept` (nothing for a
blur to destroy). Both arms now have a carrier.

**The dial, if π-1 wants a different number.** The two knobs are deliberately local to the well:
`--grid-line` / `--grid-line-major` on `.specimen-well > .grid-bg` (HF), and the `plateField(...)`
L band (LF). Neither touches a token file or another route.

## §5 · VERIFY GATE

```
$ npx vue-tsc --noEmit
(clean — no output)

$ npx vitest run tests/demo tests/components/ui
 RUN  v4.1.10 /Users/mkbabb/Programming/glass-ui
 Test Files  38 passed (38)
      Tests  200 passed (200)
   Duration  4.33s

$ npx vitest run tests/gates            # courtesy, demo files touched
 Test Files  6 passed (6)
      Tests  57 passed (57)
```

Scoped-CSS compile check (`@vue/compiler-sfc`, both files) — the `.dark` arm survives scoping as a
plain ancestor, exactly as required:

```
.specimen-well[data-v-x] { … }
.dark .specimen-well[data-v-x] { … }
.specimen-well > .grid-bg[data-v-x] { … }
.specimen-well[data-v-x] > :not(.grid-bg) { … }
```

## §6 · OWED / ROUTED ONWARD

1. **The paint capture.** σ above is modelled. π-1's two-mode capture is the seat of record and
   should re-state the measured substrate σ in its manifest (Q-2/A-10: "σ≈50 substrate named in the
   manifest").
2. **A DRY fold.** `plateField` + the `.specimen-well` rules are duplicated across the two stories
   because this slice's wall is the two story files. The natural home is the chassis half of #56
   (the same row that owns `ShowcaseFrame surface="opaque"` ×118) — a `surface`/`field` frame prop
   would absorb both copies and let any other specimen route opt in.
3. **On-glass legibility over a real substrate** is now observable on these two routes for the first
   time. Any finding there belongs to #31's a11y contrast arms and #22's veil ladder, not to a
   flatter substrate — flattening it back is exactly the "the demo lies about the material" defect
   #56 exists to kill.

## §7 · ADJUDICATION — LANDED-CANDIDATE (2026-08-04, Fable seat)

Verified on disk by an independent seat: wall held (the whole lane diff is the two story files +
this record; `dock/overview.vue` is the concurrent grasp lane's prose), binding parity exact vs
HEAD (14/14 `v-model` + `aria-label` on slider, 10/11 on tabs), 7 wells / 7 ruling planes on tabs
(3 underline sections unwelled), 13 static + 6 matrix wells on slider, z 0/1 layering + plain
`.dark` ancestor + `border-radius: inherit` all present, precedents cited verbatim
(configurator §3 field-well, `.grid-bg` story-hero.css:139, `--grid-line`/`--grid-line-major`
knobs scale-paper.css). Gates re-run by the seat: `vue-tsc --noEmit` clean;
`vitest run tests/demo tests/components/ui` 38 files / 200 tests green. σ corroborated by two
independent probes (39.3–43.0 and 40.9–44.6, separate code paths); the seat minted no third —
**the driver's live π-1 capture is the seat of record for σ admissibility.**

Corrections applied in place at adjudication: §2 underline count (two→three), §3 backdrop-root
claim narrowed (the `.glass-card` ancestor plate + the capsule-track read, above), §4 vertical
geometry note. Residue banked beyond §6: (a) π-1 takes the tabs read off `.glass-capsule-track`;
(b) dark-band field luma reaches ~182 under a dark plate carrying ~230-luma ink — a plausibly
AA-marginal cell that π-1 must CAPTURE, then route to #31/#22; (c) no unit test can guard the
field — under happy-dom `canvas.toDataURL()` yields an empty PNG and `auroraFallbackGround`
returns a bogus non-null raster, so the green `tests/demo` run proves structure only, never paint.
