# JUDGE-1 — BD.W-GOO-CAROUSEL-DECK

**VERDICT: FAIL (meetsBar=false).** The de-dup, the Safari-static-filter, the DPR cap, and the
warm-not-gray tint all landed — but the CORE user defect *"It should MORPH BLOB and MEATBALL
from one to another"* / *"does not goo morph"* **STILL REPRODUCES**. The carousel and deck goo
each render exactly ONE mass inside the metaball filter, so there is nothing to goo-merge. A
single convex shape under a goo filter is NOT a blob↔meatball morph — it is a frosted plate
that stretches and slides.

Live-verified on `http://localhost:5173` (Chromium, light mode), real click gestures, frame-series sampled.

---

## THE BLOCKING DEFECT — single-mass "metaball" (the morph the user asked for does NOT exist)

A metaball goo-morph (the Gemini carousel, the Google-deck worm, the W-PAGER-GOO-MORPH that is
DONE) requires **≥2 masses** inside ONE goo filter: the `feGaussianBlur` + alpha-threshold
`feColorMatrix` gooifies them so a NECK wells up BETWEEN them as they approach, then pinches off
as they separate. With a SINGLE mass there is no second body to merge with → no neck, no
pinch-off, no blob↔meatball read. The threshold simply re-sharpens the one blurred rounded-rect
back to ~itself.

**Live proof — the goo layers contain ONE mass each:**

| Surface | Filter host | Masses inside | Verdict |
|---|---|---|---|
| **carousel** `.carousel-goo-layer` (#glass-goo) | 1 | `[carousel-goo-worm]` | ✗ no merge possible |
| **deck** `.deck-goo-layer` (#glass-goo) | 1 | `[deck-goo-worm]` | ✗ no merge possible |
| **pager (DONE, working)** `.pager-goo-layer` (#pager-goo) | **6** | `[goo-dot ×5, goo-worm]` | ✓ worm necks into each dot |

The proven pattern the spec told the builder to REUSE (`.pager-goo-layer`) hosts 5 `goo-dot` +
1 `goo-worm` — the worm travels BETWEEN the dots and the filter merges it INTO and OUT OF each
one (the real worm-morph). The carousel/deck took the single travelling worm and **dropped the
second mass** — so the metaball filter has nothing to act on.

**The author's own CSS comment confirms the conceptual gap** (`CarouselContent.vue:269`):
> "The goo filter merges the worm into ONE metaball silhouette."
A filter cannot "merge" a single mass with itself. And `:275` `filter: url(#glass-goo); /* the
metaball merge */` — there is no merge. The `:218` comment claims *"re-forms at the destination
— the Gemini 'morph blob and meatball' read"* but there is no destination blob to re-form into.

**Mid-morph GESTALT (pinned to peak, screenshotted):** what a user sees during the carousel
transition is a single warm-cream translucent frosted plate sliding over the green "Kelp" slide,
its corners rounded by the goo filter, the text legible through the lens. It is GLASSY and mildly
DISTORTING — but it is a sliding lens, NOT two blobs goo-merging. It does not read as
blob↔meatball. **The defect the user reported ("does not goo morph") is still true.**

---

## WHAT DID LAND (independently verified — these are real)

- **De-dup is REAL.** `useWormMorph.ts` DELETED (0 refs in `src/`); ONE `useGooMorph` engine
  consumed by pager (PagerDots.vue), carousel (CarouselContent.vue), deck (deck.vue). No second
  fork. The engine/role split (embla stays embla, useDeck stays useDeck, ONE transition driver)
  is sound — **the de-dup ask (2) is satisfied.**
- **Safari-static filter is REAL.** `#glass-goo` = `feGaussianBlur stdDeviation="7"` (literal,
  NOT var()-driven), `feColorMatrix` static `0 0 0 20 -9`, `color-interpolation-filters="sRGB"`,
  `-50%/200%` region, regular `filter:` (not `backdrop-filter: url()`). The WebKit-broken
  var()-blur class is structurally absent. ✓
- **DPR cap is REAL.** blob canvas: CSS 768² → backing store 1536² = 2×-capped (AV_DPR_MAX=2), not
  uncapped. The "too slow on Safari" cause (uncapped backing store) is addressed. ✓
- **Warm-not-gray tint.** `.carousel-goo-worm` bg = `oklab(0.980 0.0043 0.0104)` warm radial
  gradient (hue ~67°, chroma ≥0.010). Not gray. ✓
- **Mechanism numbers fire.** carousel worm scaleX 1.07→peak **2.17**→settle 1.07, scaleY pinch
  **0.85**, `--stretch` 1.16, goo opacity 0→0.55→0, embla track scrolls crisply (-12→-446), slide
  advances correctly. PRM `display:none` rule present. Console: ZERO errors (only a pre-existing
  unrelated TooltipProvider `<Transition>` warning on every story page).

**But a passing mechanism on a surface that does not READ as a blob↔meatball morph is a FAIL —
the gestalt is the bar, not the scaleX number.**

---

## CONCRETE REFINEMENTS (to PASS next iteration)

1. **Render ≥2 masses inside the goo layer — this is THE fix.** Reuse the W-PAGER-GOO-MORPH
   pattern literally: the goo layer must host the OUTGOING blob (the departing slide's silhouette,
   pinned at the leaving edge), the travelling WORM, and the INCOMING blob (the arriving slide's
   silhouette at the entering edge). As the worm travels, the metaball filter wells a NECK from the
   outgoing blob → stretches across the gap → merges into the incoming blob → pinches off the
   outgoing. THAT is "morph blob and meatball from one to another." One `goo-worm` span cannot do it.
2. **Verify the merge VISUALLY, not by scaleX.** The next judge must SEE a neck connecting two
   distinct masses mid-transition (screenshot the peak), and see the pinch-off. A scaleX-stretch of
   one droplet is not acceptable.
3. **Re-check `overflow: clip` + `contain: layout paint` on `.carousel-goo-layer`** — with the
   layer sized `inset:0` to the viewport and the worm travelling/scaling beyond bounds (translateX
   to +42, scaleX 2.17), the goo masses near the slide edges (where the neck must form) risk being
   clipped at the layer boundary. The goo region must extend past the gap so the neck reads.
4. **Keep everything that landed** — the de-dup, static filter, DPR cap, warm tint, PRM carve are
   all correct. The fix is purely: add the second/third mass so the metaball actually merges.

---

## LIVE EVIDENCE INDEX

- carousel goo masses: `.carousel-goo-layer` children = `[carousel-goo-worm]` (1) — single mass.
- deck goo masses: `.deck-goo-layer` children = `[deck-goo-worm]` (1) — single mass.
- pager (working ref): `.pager-goo-layer` children = `[goo-dot×5, goo-worm]` (6) — the merge works there.
- `#glass-goo` filter HTML: `feGaussianBlur stdDeviation="7"` literal (Safari-safe). ✓
- blob canvas backing store 1536²=2×-capped. ✓
- carousel transition 180-frame series: scaleX peak 2.17, scaleY 0.85, track -12→-446, goo opacity 0→0.55→0, slide advanced. mechanism fires but gestalt = sliding lens, not metaball merge.
- console: 0 errors both pages.
