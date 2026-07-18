# MARKS — the frame-by-frame corpus read (IOS27-MICRO)

Seat: claude-fable-5. Corpus: `ScreenRecording_07-17-2026 22-46-16_1.MP4`, 47.425s, 1206x2622 @60fps.
Base frames: `/Users/mkbabb/Downloads/ios27-micro-frames-2026-07-17/f-0001..f-0190` at 4fps — f-N sits at
t=(N-1)/4 s. NOTE: the f-*.png set is 780x1696 (scale 1.546x to video px); all `burst-*` sets are full
1206x2622. Eight 12fps bursts (83ms resolution) were extracted into the same folder:
`burst-mapsgrow` (t0=1.0), `burst-mapscollapse` (3.0), `burst-overpull` (4.8), `burst-ccopen` (12.0),
`burst-ccflick` (13.3), `burst-ccclose` (16.9), `burst-fmtab` (27.3), `burst-safaripill` (39.5); burst
frame N sits at t0+(N-1)/12 s.

Method: visual reads plus two measurements (script: scratchpad `marks-measure.py`) — (a) Gaussian-blurred
absolute diff vs a rest reference, yielding the card's top edge (first row of sustained change) and width
at fixed offsets below the top; (b) band luminance + horizontal-gradient energy (a blur proxy) for the
Control Centre channel timing. All quoted px are original video px (1206x2622) unless marked "display".

## Scene index

| t (s) | frames | scene |
|---|---|---|
| 0.0–1.2 | f-0001–f-0005 | Maps, satellite, rest dock (search pill) |
| 1.2–3.0 | f-0006–f-0013 | expansion #1: drag-up dock→card, pinned overpull at top, release |
| 3.0–4.2 | f-0013–f-0017 | collapse #1 with a mid-detent catch |
| 4.2–7.6 | f-0018–f-0031 | the overpull playground: down-pulls, deep down-pulls, springbacks |
| 7.6–10.9 | f-0031–f-0044 | expansion #2: slow drag to the full detent (Recents visible) |
| 10.9–12.0 | f-0044–f-0049 | collapse #2, fast, to rest |
| 12.0–13.1 | f-0049–f-0053 | Control Centre pull-down (the open choreography) |
| 13.3–14.7 | f-0054–f-0059 | CC flick-dismiss, blur held mid-state, re-pull (interrupt catch) |
| 14.7–16.9 | f-0060–f-0068 | CC second dismiss + re-open cycle (unburst) |
| 16.9–18.3 | f-0069–f-0074 | CC final dismissal (the close choreography) |
| 18.3–19.8 | f-0074–f-0080 | swipe home, Home Screen |
| 19.8–24.0 | f-0080–f-0097 | Find My opens (Items) — eyeglass-tab morphs begin |
| 24.0–31.0 | f-0097–f-0125 | tab play: People→Devices→Items→Devices, full cards per tab |
| 31.0–38.0 | f-0125–f-0153 | Devices card jockeyed by drag: continuous scrub, overpull, rest |
| 38.0–39.0 | f-0153–f-0157 | Find My app-close zoom; Safari opens to tab grid ("478 Tabs") |
| 39.0–42.0 | f-0157–f-0169 | tab-group pill: 478 Tabs→Tmp→478 Tabs (grid slides, lens handoff) |
| 42.0–46.0 | f-0169–f-0185 | further pill play, settle; Safari app-close zoom |
| 46.0–47.4 | f-0185–f-0190 | Home Screen, end |

## 1. Dock-to-card growth (Maps)

Rest dock geometry: top≈2243, span x≈52..1153 (width≈1101 = 91% of screen), bottom edge ≈2600 — a
floating pill with a fixed bottom inset. The card's expanded detent: top≈1546–1592, width≈1150±10.

Growth curve, expansion #1 (burst-mapsgrow, card-top y by diff):

| t (s) | frame | top | note |
|---|---|---|---|
| 1.33 | 005 | ~2120 | pull begins — the dock stretches taller in place |
| 2.00 | 013 | 2017 | Places ghost text emerged; icon discs surfacing from the bottom edge |
| 2.17 | 015 | 1920 | |
| 2.25 | 016 | 1853 | |
| 2.33 | 017 | 1760 | peak velocity zone ~1100–1300 px/s |
| 2.42 | 018 | 1673 | |
| 2.50 | 019 | 1564 | passes the detent (~1573) without stopping |
| 2.58 | 020 | 1469 | hard deceleration (1145→325 px/s in one frame) |
| 2.67–2.92 | 021–024 | 1442 | PINNED — the magnetic ceiling, finger-held past the detent, 250ms |
| 3.00 | 025 | 1573 | released — snapback of ~130px in ≤83ms |
| 3.08 | 026 | 1592 | soft landing tail (~19px, decelerating) |

Horizontal squish/stretch (width at top+50): rest 1101 → mid-rise 1121–1131 → pinned 1131 → settled
detent 1142. The card grows ~+4.5% horizontally (about +20–25px per side); when pinned past the bound it
is ~11px NARROWER than its settled width — pulling past a bound compresses the glass slightly, in either
direction. Left and right edges breathe outward during the rise; the bottom edge stays pinned at its
inset for the whole gesture (diff activity at rows 2560–2615 is content arriving, not edge motion). The
"bottom squish" reads through the corner radii and the icon row surfacing from under the bottom margin,
not through edge translation.

Inner-element stagger (time-keyed here because the drag is live; in Find My the same reveal is
height-keyed): grab handle → "Places" ghost text (011, t=1.83, fade+rise) → icon discs scale in from the
bottom edge (013–015) → icon labels (017) → "Recents" header (019) → Recents row content (021). Each
element fades AND translates up ~30–60px as it lands; nothing pops.

DESIGN NOTES (ranked):
1. The reveal ladder — handle→title-ghost→icons→labels→next-section — with per-element fade+rise is the
   single strongest tell of life; the card must never present as one prerendered bitmap sliding up.
2. Bottom edge pinned, top does the travel, sides breathe +4–5% — reproduce exactly this asymmetry.
3. Pass-the-detent-then-pin: while the finger holds past the detent the card compresses ~1% in width;
   release snaps back ~130px in under 100ms with a ~170ms decelerating tail.
4. Icon discs enter by emerging from under the bottom margin (clipped), not by opacity alone.

## 2. Magnetic overpull

Window t=4.8–7.6 (burst-overpull) plus the top-side pin in hallmark 1.

Down-pull (the dock pulled PAST its maximal down position): the whole dock translates down ~60–70px AND
compresses — width 1101→~1018 (−7.5%), height ~282→~223 (−21%), anchored bottom-center, the bottom edge
never leaving its inset (burst-overpull-025, -031, -034; deep pulls at t=6.8 and 7.3–7.55). The pill's
content ("Apple Maps" text, mic, avatar) scales with the compression — glass and content deform as one
body. The finger clearly travels much farther than 60–70px: displacement is resistively damped
(rubber-band ratio, felt not measured — a later burst could fit the ratio from finger inference).

Release/springback: deep-down at t=6.80 (025) → above-rest overshoot at t=7.05 (028, dock top ~2180 vs
rest 2243, i.e. ~40–70px past rest) → settle. Return ≈150px in ~150–200ms with one visible overshoot —
an underdamped spring in the ζ≈0.5–0.65, ~2–2.5Hz region. Kin to glass-ui's springPreset("dock")
{0.68,0.64}. The up-side bound behaves identically in reverse (hallmark 1's pin at 1442: hard-arrest in
~2 frames, hold, 130px snapback).

Up-stretch from rest: a small pull up from rest stretches the dock taller ~40px before the card growth
commits (burst-overpull-013, t=5.8) — a pre-expansion taffy zone.

DESIGN NOTES (ranked):
1. Overpull = translate + volume compression, bottom-anchored, content deforming with the container. A
   translate-only rubber band reads dead by comparison.
2. Springback must overshoot once (~30–50% of the overpull distance) and settle inside ~250ms.
3. The bound is asymmetric in feel: down-pull compresses hard (−21% height); up-pull past detent
   compresses barely (−1%) — magnitude scales with how "forbidden" the region is.
4. A pre-commit stretch zone (~40px) before the expansion gesture engages gives the dock its taffy feel.

## 3. Eyeglass tabs — Find My vs Safari

Find My (burst-fmtab, one full Devices→Items morph; reverse morph f-0119–f-0125):
- Rest (002, t=27.38): the active tab sits under a bright capsule lens; the icon under the lens renders
  ~5–8% larger than siblings — true magnification, not just tint.
- Press-charge (005, t=27.63): the lens BRIGHTENS in place — a cyan liquid glow blooms past the capsule
  bounds and washes across the whole tab bar (engagement displayed by the entire component).
- Goo travel (008–012, t=27.88–28.22): the glow-blob stretches to span ~2.5 tab slots, covering source
  and target at once; light leads, geometry follows; the source tab de-materializes under the blob and
  re-materializes behind it; chromatic fringes at the blob edge.
- Oversized arrival (014–017, t=28.38–28.63): the lens lands on Items LARGER than rest — taller than the
  bar, bloom still hot — a scale overshoot held ~200ms.
- Cool-down settle (021+, t≈28.97–29.4): bloom cools, capsule shrinks to the rest lens. Press→settle
  ≈1.2–1.4s — deliberately luxurious.
- Chromatic specular: f-0101 shows a rainbow rim on the People lens bottom-left; f-0093/f-0113 show
  refraction-like warping under the blob edge.

Safari (burst-safaripill; grid slide 478 Tabs↔Tmp):
- The pill is itself a scrolling carousel — the active group snaps to center beneath a quasi-fixed lens
  (015→018: "Tmp" centered, "Private" scrolled off-left).
- The lens is a gold/amber shimmer capsule with an animated sheen (the hotspot sits at different x in
  003 vs 026 — a specular sweep), and it slightly magnifies the label.
- The morph is a HANDOFF, not a body: the grid slides (~350–500ms, decelerating, no bounce), and near
  the end the highlight re-forms at the destination while the pill recenters (009–015). At 83ms
  resolution no continuous goo bridge is visible.

What is BETTER in Find My, precisely: (a) morph continuity — one liquid body traveling vs a
disappear/reappear handoff; (b) press feedback — the charge state and the whole-bar glow wash before any
travel; (c) arrival physics — oversized landing + cool-down vs an instant re-form; (d) material depth —
bloom + chromatic fringe + refraction vs flat shimmer. Safari wins only the specular sweep on the idle
capsule and the self-centering carousel behavior.

DESIGN NOTES (ranked):
1. The lens must be ONE continuous body across the whole morph — stretch, bridge, land, never blink.
2. Press-charge before travel: brighten + bloom at the source on pointerdown, glow wash across the bar.
3. Land oversized (~110–120% scale), hold ~200ms, cool to rest — the overshoot is in scale AND light.
4. Keep Safari's two good ideas: the idle specular sweep, and pill self-centering when tabs overflow.
5. Fix iOS's one defect here: sibling labels vanish entirely under the bloom (~300ms of unreadability) —
   ours should keep siblings legible beneath the traveling lens.

## 4. Material

- Two glass tiers everywhere: the CONTAINER (card/dock/CC tile — heavy blur, strong tint) and the
  CONTROL riding it (toggle circle, slider, lens — brighter, more opaque, its own rim). Controls never
  share the container's surface; they sit on it.
- Cards (Maps, Find My): translucent, tinted by the page beneath — teal cards over the teal Find My map,
  neutral grey-green over dark satellite in Maps. Underlying map reads through with a large-radius blur
  (apparent σ several tens of px — map blobs stay recognizable as color masses, never as detail). Text
  on cards is full-opacity white regardless of tint — legibility is never traded.
- Dock/tab bar: brighter and more opaque than cards; a ~1px specular light line along the top edge
  (visible on the Maps dock and the Find My bar); the grab handle is the highest-contrast element.
- The Find My card carries a soft light band at its top edge when raised (f-0142) — an inner top glow,
  not a shadow.
- Control Centre: the deepest stack — wallpaper/app → heavy blur + dim (gradient energy −80%, luminance
  −46% in the upper band) → dark translucent tiles → circular glass toggles → near-opaque white sliders.
  Red/colored states (record, silence) sit on white circles — the one place iOS uses opaque white chips.
- Specular events: the Safari gold capsule sheen sweep; the Find My lens chromatic rim (f-0101); bloom
  during lens travel (fmtab-008–014). No specular event ever appears on a static card — light motion is
  reserved for engagement.
- Overpull compression (hallmark 2) deforms glass AND content together — the material is a body, not a
  window.

DESIGN NOTES (ranked):
1. Enforce the two-tier rule: container glass vs control glass, distinct blur/opacity budgets.
2. Tint from beneath, but clamp text to full contrast — sample the page hue into the card tint only.
3. Reserve specular/light motion for engagement moments (press, travel, landing) — never idle on cards.
4. The 1px top rim light on bars/docks is cheap and load-bearing for the "lit from above" read.

## 5. Control Centre choreography — the desync, measured

Open (burst-ccopen; pull from top-right):

| channel | start | end | duration |
|---|---|---|---|
| background blur + dim | 12.33 | ≤12.42 | ≤83ms — a cliff |
| content opacity/saturation (controls fade in) | 12.42 | ~12.58 | ~150–250ms |
| stretch/position (grid slides down into place) | 12.42 | ~13.05 | ~600–650ms, decelerating |
| right-edge rail (heart/note/antenna) pop-in | ~12.50 | ~12.58 | delayed ~80–160ms after main controls |

At 12.42 (006) the ENTIRE grid is already present but dim and sitting high — compressed toward the top:
the Maps chip then travels down ~227px, the connectivity card ~216px, the bottom row ~278px. Rows deeper
in the stack travel ~20% farther than top rows — a translate-down with a mild stretch component, not a
uniform slide. The fade completes at roughly ¼ of the stretch's duration — "the fading happens FASTER
than the stretching", confirmed and quantified at ~1:4.

Close (burst-ccclose): the mirror desync, content leads harder —

| channel | start | end | duration |
|---|---|---|---|
| content fade+slide-up | 17.48 | ~17.65 | ~170ms |
| blur/dim relaxation | ~17.65 | ~18.10 | ~400–450ms, decelerating tail |

Between 17.65 and 17.73 the screen is a pure blurred-dimmed field with NO content (the coarse frames
f-0057, f-0065 caught the same state in earlier cycles) — the blur is a persistent medium the content
leaves first.

Interrupt catch (burst-ccflick): flick-dismiss at 13.30 → content out by 13.63 → blur HELD featureless
13.72–13.97 (the finger re-engaged mid-dismissal) → re-pull dims the scrim at 14.05–14.13 → content
re-enters compressed-top at 14.22 → settled by ~14.6. The dismissal is a scrub that can be caught and
reversed at any point; the blur medium never resolved between the two cycles.

DESIGN NOTES (ranked):
1. Three channels, three clocks: blur/dim as a near-instant medium change (≤100ms), fade ~4x faster than
   stretch, stretch ~600ms decelerating. Batching any two together kills the breath.
2. On close, invert the order: content leaves first, the medium relaxes after — the empty-blur beat
   (~100–200ms of contentless blur) is a signature moment, keep it.
3. Depth-graded travel: deeper rows travel ~20% farther — one scalar (row index) suffices.
4. Every phase must be scrub-interruptible with state carried over — the medium (blur) persists across
   interrupted cycles rather than resetting.
5. Stagger the periphery (side rails) ~100ms behind the main grid.

## 6. Card-expansion choreography + physics

Velocity inheritance — three gestures, three outcomes (all Maps, measured):
- Fast drag, expansion #1: release velocity ~1150–1300px/s upward → momentum carries the card 27px into
  the magnetic ceiling in one frame, hard-arrests in ~2 frames (1145→325→0 px/s), pins.
- Slow drag, expansion #2 (f-0032–f-0044): the card tracks the finger for ~2.5s through every
  intermediate height, arrives at the detent (top≈1546) with no overshoot at all, holds 1.0s dead still.
- Release from height, collapse #1 (burst-mapscollapse): free fall at ~1570px/s peak, a ~170ms CATCH at
  the mid detent (top 1976–2017 — the "search+Places" height), then the final fall to rest. Collapse #2
  (f-0044→f-0046) covers ~660px in 250ms (~2600px/s) when flung.

So the system demonstrably integrates gesture velocity: same component, overshoot-and-pin under a flick,
zero overshoot under a slow place — the curves are not canned.

The Find My Devices card (f-0129–f-0152) proves the choreography is HEIGHT-mapped, not time-mapped: at
any held height the reveal state is a pure function of height — title ghost at low height (f-0132),
title solid + first rows mid (f-0142–f-0143), dimmer again when jockeyed back down (f-0135 vs f-0134).
The tab bar stays pinned at the bottom throughout; list content slides UNDER it. Full-card detent top
≈1340 (~51% of screen height).

Find My tab-triggered card swaps (People→Devices→Items, f-0097–f-0117): the outgoing card drops+fades as
the incoming card rises+fades in, overlapped, while the map re-frames beneath — three concurrent
channels, none waiting for another.

DESIGN NOTES (ranked):
1. Position under gesture = scrub (height-mapped reveal ladder); position after release = spring seeded
   with release velocity. Both regimes on every expandable component.
2. Detents are magnetic in BOTH directions — passing detents on the way down produces a brief catch
   (~170ms) rather than a stop; implement as a weak spring well crossed at speed.
3. Overshoot only when arriving fast; a slow arrival lands dead — never inject synthetic bounce.
4. Reveal ladder as a function of expansion fraction, per element: handle 0–5%, title ghost 10–30%,
   title solid 30–50%, row N at 40%+10%·N, section headers before their rows.
5. Pinned chrome: the tab bar/dock never travels with the card — content slides beneath it.

## Beyond the hallmarks

- The mid-detent catch (Maps) — a third stop between rest and full, engaged only transiently during
  fast collapses; both directions cross it at 1976–2021.
- The pre-commit taffy zone — ~40px of dock stretch before the expansion gesture engages.
- Everything is a scrub — CC dismissal caught mid-flight and reversed (13.63–14.22) with the blur medium
  persisting across cycles; Find My card jockeyed indefinitely; no animation in the video is
  fire-and-forget except the app-zoom transitions.
- Whole-component engagement glow — the Find My tab bar catches a luminous wash on press, before any
  navigation happens (f-0085, fmtab-005): the component acknowledges touch as a body.
- Lens magnification — the active-tab capsule magnifies its content ~5–8% in both apps: the "eyeglass"
  is literal.
- The pill carousel (Safari) — group names scroll so the active one centers beneath the lens; the lens
  is positionally quasi-fixed while the WORLD moves.
- Content deforms with glass — the overpulled dock scales its text/icons with the container; no
  independent layers.
- iOS's own seams, worth besting: (a) sibling tab labels fully unreadable under the lens bloom for
  ~300ms; (b) the CC blur onset is a ≤83ms cliff — perceptibly abrupt; (c) Safari's lens handoff
  discontinuity (the highlight blinks across rather than traveling); (d) f-0097's map tiles arrive dark
  and pop in late during the People swap.

## Moments deserving denser bursts (unburst or under-resolved)

1. Overpull release t≈6.8–7.1 at 24fps — fit the springback (ζ, f) exactly.
2. Maps collapse landing t≈3.9–4.3 at 24fps — detect/deny a landing micro-bounce at rest.
3. Find My reverse tab morph t≈29.5–31.0 at 12fps — confirm the goo anatomy is direction-symmetric.
4. The second CC cycle t≈15.0–17.0 at 12fps — a second sample of the interrupt-catch behavior.
5. Safari lens handoff t≈40.4–40.8 at 24fps — settle whether any brief bridge exists at 60fps.
6. App-close zooms t≈38.0 and t≈46.0 at 12fps — if the campaign wants the app-zoom morph family.

ALL SIX ARBITRATED at pass 2 — see PASS-2 CORRECTIONS below.

---

## PASS-2 CORRECTIONS (24fps) — the re-burst arbitration

Verified-model: claude-fable-5 (the system-context model ID, returned verbatim). Seat: re-burst
arbitration, no browser. Corrections are ADDITIVE—the sections above are measured history, kept;
every correction cites its section and quotes what it voids. The honesty law governs throughout:
what could not be decided is marked so.

### The burst inventory (frame N sits at t0+(N−1)/fps; all full 1206×2622)

| set | t0 | fps | frames | window |
|---|---|---|---|---|
| burst24-pinrelease | 2.80 | 24 | 19 | the pin release + collapse onset |
| burst24-landing | 3.80 | 24 | 17 | collapse #1 landing |
| burst24-overpull | 4.80 | 24 | 74 | the whole overpull playground |
| burst24-collapse2 | 10.90 | 24 | 31 | the flung collapse + landing |
| burst24-cc2 | 15.00 | 24 | 53 | CC second cycle |
| burst24-fmreverse | 29.40 | 24 | 41 | Find My reverse morphs ×3 |
| burst24-zoom38 | 37.80 | 24 | 29 | Find My close-zoom, Safari open-zoom |
| burst24-lens | 40.20 | 24 | 20 | Safari pill handoff |
| burst24-zoom46 | 45.60 | 24 | 29 | Safari close-zoom |

Provenance note: burst24-overpull frames 001–034 were accidentally clobbered by a same-window
re-extraction during this pass and restored byte-identically from a verified re-extraction at the
same t0 (035–074 cmp-verified against the originals first). Five other burst24 sets in the folder
(cccycle2, mapsland, safarilens, appzoom-fm, appzoom-safari) predate this seat and carry NO
documented t0—their owner should stamp them before use.

Method: (a) geometry trackers—two-peak coherent-edge tracker (median vertical gradient across
x 150–1050 reporting the top TWO edges per frame, defeating the handle/rim rank-flapping that
aliased the 12fps reads), texture-drop slab-top tracker, gold-channel (min(R,G)−B) lens tracker;
(b) 60fps supplementary extraction wherever 24fps could not decide—consecutive-frame max-pixel-diff
stasis analysis (the finger detector: a bit-static screen at a displaced position is a hold, never
a spring), and the lens-bridge question, which wishlist #5 itself defined as a 60fps question. The
video is true 60fps CFR (packet intervals uniformly 16.7ms across 5.8–7.4). Rest calibration: four
static frames (t=0.3, 0.5, 0.7, 11.5) agree to ±1px.

### C1 — §2 overpull springback: VOID—it was fitted to finger motion (wishlist #1)

The 24fps re-burst plus 60fps stasis analysis prove the overpull playground (4.8–7.6) contains NO
free springback. Every motion segment either terminates in a bit-static hold at a position 20–33px
DISPLACED from rest (max pixel diff 2–3 = codec noise, held 83–167ms, then motion RESUMES—a free
spring can neither sit static off-equilibrium nor spontaneously re-launch) or merges into the next
pull. The whole window is finger-scrubbed: down-pulls, up-stretches, hand-carried returns.

- Measured rest (4-frame calibration): dock slab top = 2336–2337, width ≈ 1107. ~~§2/"§1 rest
  top≈2243"~~ was misplaced by ~93px—no slab edge exists at 2243 in any rest frame.
- At t=6.80 the dock is ~26px ABOVE rest, falling under the finger (~~"deep-down at t=6.80"~~ VOID).
- At t=7.05 the dock is ~20px BELOW rest, held bit-static 7.10–7.20 (~~"above-rest overshoot at
  t=7.05 (dock top ~2180 ... ~40–70px past rest)"~~ VOID—slab top never rises past 2264 in the
  whole window; 2180 never occurs; the "40–70px overshoot" was a phantom of the misplaced rest
  plus diff-method noise).
- ~~"Return ≈150px in ~150–200ms with one visible overshoot — an underdamped spring in the
  ζ≈0.5–0.65, ~2–2.5Hz region. Kin to springPreset("dock") {0.68,0.64}."~~ VOID.
- ~~§2 DESIGN NOTE 2 "Springback must overshoot once (~30–50% of the overpull distance) and settle
  inside ~250ms."~~ VOID—superseded by C2's measured law.
- The MARKS-internal contradiction that chartered this seat (stated ζ 0.5–0.65 vs overshoot-fitted
  0.28–0.38 vs a ~250ms settle unreachable at either) DISSOLVES: both brackets fitted hand motion.

What SURVIVES of §2, now measured: the down-pull deformation vocabulary. Down-pull states (e.g.
t=4.80–5.10): slab top down 74–94px from rest, width 1107→~1021 (−7.8%, matching the stated
−7.5%), content deforming with the container. The pre-commit up-stretch zone is REAL and larger
than stated: slab top reaches 72px above rest (2264 at t=5.925) with no card-growth commit—read
~~"~40px"~~ as ≥70px. Height −21% and the bottom-edge claims: unverified this pass (no reliable
slab-bottom track). The rubber-band ratio (F3-U13): UNMEASURABLE from this corpus—no touch
overlay exists, so finger position cannot be inferred; needs a recording with touch indicators.

### C2 — the arbitrated register: ζ≈0.80, f_d≈1.7Hz, settle≈180ms (the flung-collapse landing)

The only free spring transient in the Maps corpus is the collapse #2 landing (wishlist #2's flung
sibling). At 60fps: release between 10.933 and 10.950 from the held full-card state (tracked top
edge ~1465; §6's detent read was 1546—different edge anatomy, the fit is start-agnostic), true
fling—peak ~6,500px/s (~~§6 "~2600px/s"~~ was a 4fps mean; and note collapse #2 IS released, unlike
collapse #1, see C3)—smooth single-regime deceleration, rest-crossing at t=11.200 with ~570px/s,
ONE overshoot of +11px (2347 vs settled 2336.2, ≈1.2% of the ~870px travel), extremum dwell ~50ms,
monotone return, dead at rest by 11.483. No second excursion ≥1px.

Fit method: damped oscillator x(t)=e^(−ζω(t−t0))[B cos(ω_d(t−t0))+C sin(ω_d(t−t0))], grid over
(ζ, f_d) with linear LSQ for (B, C), two windows, alternative model tested:

| window | n | best ζ | best f_d | RMS | bracket (≤1.15×RMS) |
|---|---|---|---|---|---|
| full free segment 11.067–11.517 | 28 | 0.79 | 1.86Hz | 1.17px | ζ 0.78–0.81, f_d 1.72–2.00 |
| tail from rest-crossing | 21 | 0.82 | 1.62Hz | 0.32px | ζ 0.77–0.88, f_d 1.38–1.80 |

Critical-damping alternative REJECTED in both windows (RMS ×4.1 and ×2.0 worse). The linear
second-order model holds across the entire 870px approach+overshoot+return at ~1px residual.

**The corrected overpull/arrival register: ζ = 0.80 (bracket 0.77–0.88), f_d = 1.7Hz (bracket
1.4–2.0; f_n = f_d/√(1−ζ²) ≈ 2.8Hz, response ≈ 0.35s), settle |x|<3px ≈ 180ms from rest-crossing
(model 169–183ms; data 183ms). Overshoot is VELOCITY-BOUGHT, never intrinsic: ≈0.02px per px/s of
crossing velocity at these constants (+11px at 570px/s); the hand-eased collapse #1 lands with
ZERO bounce (C3). §6's "overshoot only when arriving fast" law now has its constants.**

Feed lines:
- F1-R3: closed. ~~Both carried brackets (stated 0.5–0.65 / fitted 0.28–0.38)~~ void; the register
  is ζ 0.77–0.88, f_d 1.4–2.0Hz. SPEC-F1's provisional `overpull-springback` (0.40±0.05,
  ζ 0.30–0.38) points the wrong way—re-derive from (0.35, 0.80).
- F3-U13: the g-mapping stays open—rubber-band ratio unmeasurable here (C1); the RELEASE side of
  U13's moment is now C2's register.
- X2 dock-springback retune: `springPreset("dock")` (0.30, 0.82) ⇒ f_d 1.91Hz, ζ 0.82—INSIDE the
  fitted bracket. The shipped table row is corpus-true as it stands; the drifted header-comment
  {0.68, 0.64} and §2's kinship claim to it are refuted—resolve the drift TOWARD the table (a
  response nudge 0.30→0.35 is within the bracket, optional).
- SUFFUSION §6 q2 (the overshoot-fence exemption): DISSOLVES. No 30–50% intrinsic overshoot exists
  anywhere in the corpus; the measured overshoot is seeded-velocity-earned and ~1–2% of travel.
  The [0,10%] preset fence stands with room to spare; no chartered exemption needed.

### C3 — §1/§6 collapse anatomy: no detent arrest, no mid-detent catch, no free fall in collapse #1

- ~~§1 growth table "3.00 | 025 | 1573 | released — snapback of ~130px in ≤83ms" and "3.08 | 026 |
  1592 | soft landing tail (~19px, decelerating)"~~: the displacement/time is right (130px in
  ~90ms) but the ARREST is false. At 60fps with the two-edge tracker the card passes 1573–1592 at
  2,000–3,000px/s without pausing—the 12fps "arrival at the detent" was handle/rim rank-flapping
  aliasing. The release blends immediately into the user's collapse drag; no free snapback settle
  exists. The pin-release register is INCONCLUSIVE: bounds only (~130px in ~90ms, ≥3,000px/s
  through the detent—if free, hotter than C2's register; finger contamination cannot be excluded).
  §1 DESIGN NOTE 3's snapback clause carries the same caveat.
- ~~§6 "Release from height, collapse #1: free fall at ~1570px/s peak, a ~170ms CATCH at the mid
  detent (top 1976–2017), then the final fall to rest"~~ VOID on all three counts: collapse #1
  runs at CONSTANT ~840px/s for ~0.65s (a free fall accelerates; constant velocity is a finger),
  crosses 1976–2017 at that same steady rate with zero catch, and is hand-eased into the dock
  asymptotically (no bounce—wishlist #2's rest-landing question: DENIED for the eased collapse,
  DETECTED as C2's +11px on the flung one). Collapse #2 also crosses the zone uncaught at
  ~6,000px/s. The mid-detent catch has NO measured instance left; §6 DESIGN NOTE 2 and the ~170ms
  catch constant are design hypotheses now, not corpus facts. (The scene-index row "3.0–4.2
  collapse #1 with a mid-detent catch" inherits this correction; so does §2's "hard-arrest in ~2
  frames" framing of the same event, which is finger-owned deceleration.)
- §6's velocity-inheritance law SURVIVES strengthened: slow-placed arrivals land dead (collapse #1,
  expansion #2), fast arrivals overshoot once, amplitude ∝ crossing velocity (C2).

### C4 — §3 Safari lens handoff: OVERTURNED—the blink was 12fps aliasing (wishlist #5)

At 60fps (t=40.75–40.95) the Safari lens is ONE CONTINUOUS TRAVELING BODY: it whitens in place,
stretches to span source and target (~2 slots wide mid-travel), slides as a single bright capsule
with chromatic fringes at BOTH edges, lands on the destination slightly oversized, cools to the
gold rest lens. Travel ≈165±35ms—the whole event fits inside two 12fps frames, hence the misread.

- ~~§3 "The morph is a HANDOFF, not a body ... At 83ms resolution no continuous goo bridge is
  visible"~~ VOID. ~~"Beyond the hallmarks" seam (c) "Safari's lens handoff discontinuity (the
  highlight blinks across rather than traveling)"~~ VOID—there are three iOS seams, not four.
- The one-body law is therefore PLATFORM GRAMMAR, confirmed in both apps, not a Find My exclusive.
  What still separates Find My: the press-charge + whole-bar wash (Safari shows none), the
  luxurious nav register (~1.2–1.4s press→settle vs ~165ms travel), and the larger bloom/refraction
  depth. §3's DESIGN NOTES stand, but note 4's "keep Safari's two good ideas" undersells it—Safari
  also proves the one-body morph runs honestly at control-register speed.

### C5 — wishlist #3: reverse morph direction-symmetric, CONFIRMED, plus the interrupt re-seat

burst24-fmreverse catches THREE rapid hops (Items→Devices 29.44–29.69, Devices→Items 29.73–29.86,
Items→Devices 30.11–30.23): stretch-bridge spanning ~2 slots, light leading, oversized bloomed
arrival, cool-down—identical anatomy in BOTH directions. New finding: under rapid re-taps the lens
re-seats mid-cool with no reset and no blink—velocity-continuous interruption holds on the lens
body itself. Geometry travel per hop ≈150–250ms; §3's "deliberately luxurious" 1.2–1.4s is the
full press→charge→travel→cool ritual of one deliberate morph, not the geometry's own speed.
Cool-down after the final arrival ≈350–400ms.

### C6 — wishlist #4: CC second cycle CONFIRMS §5's close; one refinement

Second sample (burst24-cc2): content fades out 15.75→15.92 (~170ms ✓), the contentless-blur beat is
present (≥83–125ms at the 24fps grid ✓), the medium relaxes 15.96→16.38 (~400ms decelerating ✓).
This cycle is a FULL close + fresh open (the blur fully resolves before the re-pull at 16.42), so
the interrupt-catch remains single-sampled at 13.3–14.6. Refinement to §5 note 1: the re-open's
stretch ran ~330ms vs cycle 1's ~600–650ms—the open stretch is gesture-owned (scrub-speed-
dependent), not a fixed clock; read "stretch ~600ms" as "stretch = the release tail of a scrubbed
gesture, ~300–650ms observed."

### C7 — wishlist #6: the app-zoom family, recorded

zoom38: app-close = the live app rect shrinks as one body into its icon (~350–450ms) while the home
grid arrives from heavy blur, the medium resolving AFTER the body lands; Safari app-open =
icon→card→fullscreen in ~170–250ms with real content live from the first frames. One body + medium-
after—the same grammar as the dock and CC, at fire-and-forget license. zoom46 extracted for the
record (same family, Safari close).
