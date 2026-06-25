# BD viz · the DOCK hallmark north-star — frame-by-frame against iOS-27, the FLAGSHIP-grade bar

**The dock IS the hallmark.** This doc is the binding quality bar for every dock facility, derived frame-by-frame from the iOS-27 reference (`/tmp/vid-frames/{dockcrop,tabstrip,topcrop,tabs,aurora}` = Apple Music on iOS-27, ~38s, the now-playing accessory over the album-art aurora) + `ORCHESTRATOR-NOTES.md` + the 7 already-specced dock waves. It separates **flagship-grade** from **merely-correct**: a wave can pass its source gate + its π and still read as a competent web-dock instead of the iOS-27 hallmark. The deltas below are the difference.

The seven dock facilities measured: the **stadium pill / constellation** · the **goo-split sub-dock** · the **silhouette morph** · the **liquid-tab** · the **scroll-minimize** · the **link-API** · the **now-playing pill (album-reactive)**. Each gets: what the frames SHOW (the literal reference read), the FLAGSHIP bar, and the MERELY-CORRECT trap the wave must clear.

---

## 0 · What the frames literally show (the ground truth)

The reference is **Apple Music, iOS-27, dark mode throughout**, a vertically-scrolling album-art feed (`New Music` warm-orange · `Get Up!` red · `Chill` teal · `Your Essentials` violet · `Daphnis et Chloé / Ravel` purple), with the now-playing accessory pinned at the bottom and a 5-tab bar beneath it.

- **`dockcrop/` (the now-playing constellation, full-width):** the dock is a **three-island floating constellation** over the live album aurora — a **recessed home circle** (left, dim ghost-disc), a **wide central stadium pill** (album-art chip + 2-line marquee title `Daphnis Et Chloé / By Maurice Ravel` + a **pause glyph**), a **search circle** (right, full live affordance). Even gutters (≈ one circle-diameter). The whole constellation is **translucent** — the red/purple album cards bleed THROUGH the glass plates. The pill plate carries a **purple cast** (the Ravel-purple album → the plate drinks the hue).
- **The scroll cadence (`d001`/`d027`/`d036` expanded ↔ `d018`/`d054`/`d063` minimized):** as the feed scrolls DOWN the whole constellation **condenses** (the pill shrinks, the title compresses, the satellites tuck); when scroll settles / reverses it **re-expands**. The minimize is a clean liquid box-condense, never a jump.
- **`tabstrip/` (the pill, high-res):** the three islands are **distinct glass bodies** — the home + search circles are SEPARATE discs with their OWN faint rims, the pill is a SEPARATE wider stadium. They are siblings over a shared gutter, NOT one continuous bar. The album chip has rounded-square corners; the title is white over the purple-tinted clear plate; the pause glyph is white, weightier than the surrounding chrome.
- **`topcrop/` (the dynamic-island region):** the top status pill morphs (the live-activity capsule) — a SEPARATE liquid element, confirming the platform's "every floating chrome is its own liquid body" language.
- **`aurora/` + `tabs/` (the full app):** the album cards ARE generative auroras absorbing each playlist's hue and flowing; the bottom carries the now-playing pill ABOVE a 5-tab bar (`Home · New · Radio · Library · Search`) with an animated tab indicator. The mini-player **expands into the full now-playing screen** (album art grows, transport + scrubber appear) — the bloom-from-pill.

**The gestalt the frames read as:** liquid-glass bodies that are ALIVE — they drink the content's color, they bleed the backdrop through, they morph/split/condense as living organisms, never rigid chrome. This is the bar.

---

## 1 · The STADIUM PILL + CONSTELLATION (`W-DOCK-CONSTELLATION`)

**Frames:** `dockcrop/d001,d027,d036` · `tabstrip/s001-s050`.

**FLAGSHIP bar:**
- **Three DISTINCT glass bodies, not three pills-in-a-row.** The pill is a WIDE stadium (~70% of dock width, corner-arc == half-height → a true capsule); the satellites are PERFECT circles (aspect 1, diameter == pill height). The frame read is unmistakable: a long capsule flanked by two dots. The π aspect-assert is the floor; the flagship delta is the **proportion** — the pill must dominate (protagonist), the satellites must read as supporting punctuation, the gutter ≈ one satellite-diameter so the constellation breathes (NOT cramped, NOT sprawling).
- **The home satellite is RECESSED — a genuine LEVEL recession, not a tint.** In every frame the home circle is a DIM ghost: lower glass-level (more backdrop bleeds through it than through the search disc), a dimmed glyph. The flagship bar: a viewer reads it as *quieter / further back*, a depth cue — the search disc reads as *here, live*. The merely-correct trap (`W-DOCK-CONSTELLATION` C3 fences it): a home that is just a lighter color, or same-level-different-opacity — it must be the `--glass-level` recession so it reaches the a11y + W55 tint machinery and reads as TRANSMISSION depth.
- **The pill is DEEP glass; the satellites are floating glass.** The protagonist gets `.glass-deep` (16px / saturate-1.5 — the backdrop structure reads a hair more diffuse through it); the satellites stay floating (13px). Flagship: a viewer perceives the pill as THICKER, more refractive glass — a material hierarchy, not a uniform plate.
- **The whole constellation FLOATS over the live aurora.** Translucent plates, the album cards visibly bleeding through. This is the `surface="clear"` contract (the genuine translucency + the mandatory scrim).

**MERELY-CORRECT (the trap to clear):** three rounded rectangles in a flex row with a radius. That passes "it's a dock with sections" but fails the frame: no stadium-vs-circle silhouette contrast, no recessed depth, no deep-vs-floating material step, an opaque or gray plate. The constellation must read as a **floating organism with internal depth**, not a segmented control.

**Flagship measure beyond the π:** a side-by-side overlay of our capture vs `dockcrop/d036` at matched scale — the silhouette outline, the gutter rhythm, the recessed-home dim-delta, and the pill-translucency-over-aurora must MATCH within a hairline. The gestalt verdict is the overlay, not the getImageData scan alone.

---

## 2 · The GOO-SPLIT SUB-DOCK (`W-DOCK-SUBDOCK` + `W-DOCK-GOO-SPACING`)

**Frames:** the V1 dock band (the now-playing peels off → the abstract bottom accessory) + the iOS-26 `.tabViewBottomAccessory` re-seat law.

**FLAGSHIP bar:**
- **A goo-MERGE before the split, not a hard cut.** Two glass bodies WITHIN `--dock-goo-spacing` (the `GlassEffectContainer(spacing:)` analogue, ~30px) read as ONE fused liquid mass — a continuous warm-cream alpha bridge across the gap (the `filter: url()` sRGB goo, Safari-safe). The split STARTS from this fused state: the now-playing body **stretches a spanning neck** off the core (the `W-FISSION-FILAMENT` filament — stretch → tense → snap), then DETACHES. Flagship: the gap between detaching bodies carries a real liquid NECK that thins and SNAPS, not a piece that translates away with a gap appearing.
- **The split is PERSISTENT (the re-seat), not transient.** At full separation the accessory does NOT fly back — it **re-seats as a standing sub-dock** at the bottom, BESIDE the minimized core (a `--dock-goo-spacing` gutter between them, so it reads DISCRETE). The core dock MINIMIZES (the shipped collapse). This is the iOS-26 re-configuration: the media accessory becomes its own dock. Flagship: a second-frame readback after settle reads the SAME standing accessory (it persisted); the neck is GONE (a standing dock is not tethered — the snap terminus).
- **The merge-threshold is ONE knob, adaptive small-vs-large.** `--dock-goo-spacing` governs blend-vs-discrete; the size-flip (small element flips light↔dark hard, large panel lifts-without-flip) is the Apple HIG read. Flagship: a small satellite over a bright album region INVERTS its ink; the large pill LIFTS its plate without inverting. The dock adapts like iOS, by element SIZE.

**MERELY-CORRECT (the trap to clear):** the piece translates out with `opacity`/`transform` and the gap just appears (no goo neck), OR it flies out and merges back (transient, not a re-configuration), OR the sub-dock floats away free instead of re-seating beside the minimized core. The flagship is the **liquid CONTINUITY** — the bodies were one mass, a neck spanned the split, the accessory re-seated as a standing organism. The `W-DOCK-SUBDOCK` C1/π PERSISTS + C3 re-seat-anchor + C5 no-surviving-neck asserts fence the three traps; the flagship is that all three read as ONE coherent liquid event.

**Safari floor (ABSOLUTE):** the goo is `filter: url()` + `color-interpolation-filters="sRGB"` (NEVER `backdrop-filter: url()` — WebKit 245510); the standing sub-dock is own-blur `.glass-floating`; the re-seat is `transform`/`position: absolute` in the non-clipping `.glass-dock-frame` (the backdrop-stacking-context trap avoided). The webkit π co-captures the goo neck + the standing sub-dock.

---

## 3 · The SILHOUETTE MORPH (`W-SILHOUETTE-REALIZE` → consumed by CONSTELLATION/SUBDOCK/LINK-API)

**Frames:** the now-playing pill ↔ tab-bar context changes (the pill is the `bar+pill` resting silhouette; a context switch reshapes to `bar` / `split` / `search`).

**FLAGSHIP bar:**
- **ONE descriptor state-machine, the FLIP transition.** The dock is a single organism whose silhouette is DATA (`DockSilhouetteDescriptor[]` — `bar | bar+pill | split | search`). A context change re-flows the SAME islands via the shipped `ElementMorph` FLIP — the home/pill/search slots morph between layouts, never a hard swap. Flagship: a context switch reads as the constellation BREATHING into a new shape (a fuse-meld on `--dock-silhouette-fuse-t`), the islands gliding to new slots with the goo bridging where they fuse.
- **The fuse-meld is liquid.** When the pill MELDS into the tab-bar (the `bar` silhouette), the bodies goo-blend (within `--dock-goo-spacing`) into the continuous bar; when it splits OUT, the neck spans. The morph is the SAME goo language as the fission — one liquid vocabulary across split AND meld.

**MERELY-CORRECT (the trap):** N feature-flag booleans (`isPill`, `isSplit`, `isSearch`) each toggling a CSS class with a `transition` — that re-collapses the organism into a switch-statement of states (the SEED §2 anti-pattern). The flagship is ONE descriptor machine + ONE FLIP engine — the dock is a living organism, not a state enum. The single-writer fence (`W-DOCK-CONSTELLATION` C4) is binding: CONSTELLATION/SUBDOCK/LINK-API CONSUME the wired silhouette; only `W-SILHOUETTE-REALIZE` calls `setSilhouette`.

---

## 4 · The LIQUID-TAB (`W-TABS-LIQUID` + `W-TAB-IOS-CAPSULE`)

**Frames:** `aurora/f001,f036` + `tabs/f060` (the 5-tab bar with the animated indicator) + `ORCHESTRATOR-NOTES` USER-VERBATIM 5-phase.

**FLAGSHIP bar — the 5-beat envelope:**
1. **Grow** — the indicator inflates FROM the current tab (a distinct grow phase, not an instant slide).
2. **Blob OVERSHOOT** — it becomes *slightly bigger than needed* (a metaball over-inflation, area > target by ~1.08-1.12× at peak).
3. **Travel swollen** — the inflated blob GLIDES to the destination (gel-stretch along the axis via the reciprocal `--stretch`).
4. **Settle liquid** — a soft ζ<1 settle at the destination (a small overshoot-undershoot, NOT a hard stop).
5. **Shrink-to-fit** — de-inflates to the destination tab's footprint.

The flagship read: selecting a tab is a **metaball that grows past the target, glides swollen, settles, shrinks to fit** — the iOS-27 "physically morphs maintaining the translucent material" read. Compose the SECOND `useLiquidFlex` AREA channel (`--tab-blob`) ON TOP of the existing travel-squish `--stretch`, ONE schedule, ONE clock.

**MERELY-CORRECT (the trap):** a rigid slide, OR today's travel-squish-and-release (phases 1+3+4 smeared, NO distinct grow, NO overshoot-past-target, NO shrink-close). That reads as a gel-stretch during the glide — competent, but not the 5-beat liquid morph. The cap MUST stay LOW (≤1.2 — the anti-taffy bar); a rubber-band overshoot is the OTHER failure. The flagship is the precise 1.1× metaball swell — felt, not seen-as-stretch.

**Safari (no fall needed):** pure compositor `scale` on the indicator's own box (`@property --tab-blob` interpolation, Baseline) — paints identically on WebKit. The pill material inflates; the underline hairline does NOT (it has no body to deform).

---

## 5 · The SCROLL-MINIMIZE (`W-SCROLL-MINIMIZE`)

**Frames:** the `dockcrop/` scroll cadence — `d001`/`d027`/`d036` (expanded) ↔ `d018`/`d054`/`d063` (minimized) as the feed scrolls.

**FLAGSHIP bar:**
- **DIRECTIONAL, not positional.** Scroll DOWN → minimize to the perfect-circle summary (give content the full viewport); scroll UP / reach-top → restore the full bar. Keyed off the SIGN of the scroll delta (the iOS `.tabBarMinimizeBehavior.onScrollDown`), NOT scroll position. Flagship: the dock minimizes the moment the user commits to reading downward, restores the instant they reach back up — a reading-posture read, anticipatory.
- **The minimize IS the shipped collapse morph — liquid box-condense, no jump.** The `--dock-morph-t` box morph runs to the collapsed footprint over the RESERVED footprint (compositor `transform: scale`, controls tuck, perfect circle shows) — the SAME morph the pointer-leave collapse paints. NO layout jump, NO content reflow.
- **Dead-banded, never thrashing.** The `HOVER_INTENT_MS` (60ms) hysteresis + a ~8px dead-band kill the jitter — a 2px wobble at the bottom of a list never flips the dock. Flagship: only a SUSTAINED directional scroll flips it; a jitter does nothing.

**MERELY-CORRECT (the trap):** a second minimize state-machine beside `useDockState` (C1 one-registry bite), OR conflation with the `--dock-grow` position-condense (C2 wrong-axis bite — they are DISJOINT, mutually-exclusive per dock), OR a jitter-thrash (no dead-band). The flagship is the ONE organism's collapse reachable from scroll OR pointer, dead-banded, directional. The double-shrink (`minimizeOnScroll` + `condenseOnScroll` on ONE dock) is structurally forbidden (the C7 not-both-bound guard).

---

## 6 · The LINK-API (`W-DOCK-LINK-API`)

**Frames:** the mini-player → full now-playing bloom + the dock dropdowns/selects opening from their triggers.

**FLAGSHIP bar:**
- **ONE verb facade — the dock as a living organism that LINKS OUT.** `useDockLink(dockRef, { fission, silhouette })` exposes FOUR verbs — `toSurface` (bloom a surface FROM a dock control's rect), `receive` (morph an external CTA INTO a dock control), `split`, `silhouette` — each a thin delegation to the shipped engine, ONE spring family two directions (bloom-out 1→0, receive-in 0→1). Flagship: every dock-originated transition reads as the SAME liquid spring — a dropdown blooms FROM its trigger (source-rect origin, not a center zoom), the now-playing surface opens bloomed from the pill, a CTA flies + congests INTO the dock.
- **Portaled overlays bloom from their RECT.** `DockSelectTrigger`/`DockDropdownTrigger` compose `useLiquidReveal` against the reka content node (via reka's PUBLISHED `:ref` — NEVER a `[data-reka-*]` internal-selector reach, the silent-no-op trap). Flagship: a dock dropdown grows FROM the trigger (small-at-trigger → settled), not the generic anchor zoom.

**MERELY-CORRECT (the trap):** four hand-wired composables against four rect conventions (no facade — the KISS+DRY charter unmet), OR a `useDockLink` that re-forks the bloom inside itself (a fifth rAF — C1 kills it), OR a `defineExpose` handle-discovery reach (the template-ref silent-no-op trap — C8 kills it). The flagship is ONE coherent verb surface; the merely-correct is scattered wiring that happens to work.

---

## 7 · The NOW-PLAYING PILL — album-reactive (`W-DOCK-NOWPLAYING-PILL`)

**Frames:** `dockcrop/d001,d036` + `tabstrip/s001-s050` (the purple-cast pill over the Ravel-purple album).

**FLAGSHIP bar — the single most-repeated iOS-27 delight:**
- **The plate DRINKS the album's hue.** The pill ABSORBS the playing album's dominant color (Ravel-purple album → purple-cast plate) via `--glass-fill-tint` off the `--glass-ambient-hue` sample (the 12-bucket OKLCh histogram over the album art). Flagship: a viewer reads the glass as having drunk the content's color — the plate hue VISIBLY tracks the album (a gray album → null hue → no tint, the correct neutral fall). Sub-perceptual + bounded (a WHISPER absorbed into the glass, the warm-cream identity holds — NOT a saturated colored slab).
- **CLEAR translucency — a genuine window onto the content.** `surface="clear"` (~0.55-0.62) STRUCTURALLY COUPLED to the mandatory dimming-scrim (the Apple Clear contract — the live album grid bleeds through WHILE the title clears AA). Flagship: the album cards read THROUGH the pill, never an opaque slab; the title stays legible via the scrim, never a contrast collapse.
- **The transport MORPHS, never hard-swaps.** Play↔pause is a `clip-path`/`opacity` glyph crossfade (compositor, cross-engine), not a swap. The title is a `<ScrollingText>` marquee (byte-reused, PRM-stopped). Tappable-while-collapsed via the `#persistent` slot (no new engine).

**MERELY-CORRECT (the trap):** a static-tinted or un-tinted pill (no album reactivity — the headline FLOOR missing), OR an opaque plate (no content bleed-through), OR a hard play/pause icon swap. The flagship is the **album-reactive living window** — the glass drinks the color, the content bleeds through, the transport morphs. The N3 album-hue-plate-tint + N2 clear-contract asserts are the floor; the flagship is that the plate hue is VISIBLY the album's, frame-matched to the reference.

---

## 8 · The cross-cutting flagship bar (what makes ALL of it hallmark-grade)

These bind EVERY dock facility — a wave that nails its own delta but breaks one of these is merely-correct, not flagship:

1. **Liquid CONTINUITY — bodies are one mass that splits/melds, never discrete elements that translate.** The goo neck spans every split; the merge-threshold fuses every near pair; the silhouette morph re-flows ONE constellation. The frame read is ALIVE, not animated chrome.
2. **MATERIAL HIERARCHY — depth is real.** The pill is deep glass, the satellites floating, the home recessed (a level recession). A viewer perceives front/back, thick/thin — not a flat plate set. The backdrop bleeds through at DIFFERENT rates per body.
3. **ALBUM/CONTENT REACTIVITY — the glass drinks the content's color.** The pill plate tints to the album hue; the constellation floats over the live aurora that absorbs the playlist hue. The dock is not chrome bolted over content — it is glass that has DRUNK the content.
4. **ONE ORGANISM, ONE ORCHESTRATOR — not N feature-flags.** ONE silhouette descriptor machine, ONE FLIP runner, ONE spring, ONE squish, ONE press, ONE specular writer, ONE `--dock-*` scalar convention. Every transition reads as the SAME spring family. A scattered set of per-state booleans is the disease.
5. **SAFARI-FIRST, ABSOLUTE — every liquid move paints on WebKit.** Goo = `filter: url()` sRGB; glass = own-blur `backdrop-filter`; morphs = compositor `transform`/`opacity`/`filter` (never `backdrop-filter: url()`). Every dock surface enrolls on the webkit Playwright project. A Chromium-only liquid move is a FAILURE, not a degrade.
6. **COMPOSITOR-ONLY on a RESERVED footprint — never a layout jump.** Every morph/split/condense/bloom is `transform`/`scale`/`translate`/`opacity`/`filter`/`clip-path` over a one-time-reserved box. `proof:no-layout-animation` is the floor; the flagship is ZERO CLS across every dock event.
7. **PRM-SAFE BY CONSTRUCTION — the gesture confirms, the motion off.** Every facility seats synchronously under `prefers-reduced-motion: reduce` (the split re-seats in one frame, the minimize collapses instantly, the tab snaps to fit, the bloom snaps to settled) — accessibility absolute, the chrome STILL gives content room, instantly.
8. **The PAINT is the truth, frame-matched.** Each facility closes against its OWN fresh live `:5199` capture (4 PNGs {light,dark}×{desktop,mobile}, LIVE MOTION never reduced) + the webkit π + an oklab readback. The flagship verdict is the **side-by-side overlay against the reference frame** — silhouette, proportion, translucency, hue-absorption, and motion-envelope must MATCH within a hairline, not merely "pass the getImageData scan."

---

## 9 · The flagship-vs-merely-correct ledger (the one-line bar per facility)

| Facility | MERELY-CORRECT (passes gate + π) | FLAGSHIP (matches the frame) |
|---|---|---|
| Constellation | 3 rounded rects in a flex row | wide stadium pill + 2 perfect circles, deep-vs-floating material, recessed-home depth, floating over live aurora |
| Sub-dock | piece translates out, gap appears, merges back | goo-merged mass → spanning neck snaps → standing accessory re-seats beside minimized core, persists |
| Silhouette | N feature-flag classes with transitions | ONE descriptor machine + FLIP fuse-meld, the constellation breathes into new shapes |
| Liquid-tab | rigid slide / travel-squish | 5-beat grow→overshoot→travel-swollen→settle→shrink, ~1.1× metaball swell |
| Scroll-minimize | a min-on-scroll boolean / position-condense | directional dead-banded box-condense to the perfect circle, reading-posture anticipatory |
| Link-API | 4 hand-wired composables | ONE verb facade, ONE spring two directions, dropdowns bloom from their rect |
| Now-playing pill | static-tinted opaque pill, icon swap | plate drinks the album hue, clear window bleeds the content through, transport morphs |

**The binding hallmark test (W-REFLECT, fresh pixels):** overlay each captured facility against its reference frame (`dockcrop/d036` for the constellation, `tabstrip/s*` for the pill, the V1 band for the split, `tabs/f060` for the tab bar). The gestalt PASS is: *a viewer cannot tell which is iOS-27 and which is glass-ui — and where they differ, glass-ui is RICHER* (the album-hue plate-tint, the deep-glass protagonist, the 5-beat overshoot, the persistent re-seat are the betters the reference does not carry). Anything less than that overlay-match is merely-correct, and the wave is not done.
