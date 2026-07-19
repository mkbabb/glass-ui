# MARKS-C-MUSIC — the V1 music-app segment (EXEMPLARS-2)

Seat: V1-MUSIC. Verified-model: claude-fable-5 (read verbatim from this seat's system context).
Source: `/Users/mkbabb/Downloads/ScreenRecording_07-18-2026 14-56-16_1.MP4` — 66.045s, 1206x2622,
VFR (~57.5fps avg on a 240-tick timebase; presentation ticks are uniform 16.7ms with DROP GAPS
under load). All px are source px; ÷3 for pt. Charter marks 1–5 (`EXEMPLARS-2-CHARTER.md`); the
chatgpt/gemini segments (marks 6–8) belong to the V1-APPS seat. The music segment runs t=0–15.8
(app-close); 15.8–20.4 is home screen + Spotify, used below only as a contrast datum.

VFR caveat, mapped: the recorder's drop-gap clusters land at t=1.40–1.75 (one 67ms + five
25–30ms gaps — INSIDE the album-open event), t=9.12/9.49 (inside the fusion window), and
t=16.79/16.91 (Spotify launch, not ours). Every duration through those windows is a bracket,
not a point; the fps filter duplicates frames at gaps and every burst was stasis-checked
(bit-identical consecutive frames flagged, e.g. fusion f8=f9).

Frame ladders (seat dir `…/scratchpad/exemplars2/V1-MUSIC/`, README stamps every t0; contract:
frame f-N sits at t = t0 + (N−1)/fps):

| burst | t0 | fps | n | event |
|---|---|---|---|---|
| survey10 | 0.00 | 10 | 215 | full-segment survey (half-scale) + dock-strip ladder |
| b24-albumopen | 1.10 | 24 | 24 | album page opens from the grid cell |
| b24-albumclose | 3.05 | 24 | 14 | album page pops back to the library |
| b60-npexpand1 | 4.30 | 60 | 34 | now-playing expands from the collapsed pill |
| b24-npdismiss | 5.50 | 24 | 30 | the long scrubbed dismissal |
| b60-rest-library | 6.70 | 60 | 30 | collapsed-trio idle window |
| b24-scroll | 7.10 | 24 | 46 | library scroll play over the collapsed dock |
| b60-fusion | 9.00 | 60 | 40 | THE FUSION: trio → stacked double dock (eyeglass tap) |
| b60-rest-search | 10.00 | 60 | 30 | stacked-dock idle window |
| b60-lens | 10.85 | 60 | 66 | lens travel Search → Library |
| b60-npexpand2 | 11.70 | 60 | 32 | expansion #2, from the stack |
| b60-rest-np | 12.10 | 60 | 30 | now-playing idle window |
| b60-npcollapse2 | 12.50 | 60 | 66 | collapse #2 + stack re-formation (landing fit) |
| b60-npexpand3 | 13.30 | 60 | 30 | expansion #3 |
| b60-npcollapse3 | 14.20 | 60 | 66 | collapse #3 (second landing sample) |
| b60-marquee | 2.20 | 60 | 45 | pill marquee velocity window |

Method: dock-strip ladder (bottom-band crops across all 215 survey frames) for the state
timeline; per-row MEDIAN vertical-gradient coherent-edge tracker (the prior corpus's
rank-flap-proof method) for card/pill/bar geometry; band luminance for medium timing;
per-region consecutive-frame diffs for idle/breath analysis; 1-D cross-correlation (per-frame
and cumulative) for the marquee; damped-oscillator grid fits (linear LSQ for phase, bracket at
≤1.15×RMS) for landings; full-res crop reads at 60fps for anatomy. MEASURED / BOUNDED /
INCONCLUSIVE marked throughout; the prior corpus's two aliasing artifacts (the 12fps "blink",
the "detent arrest") govern — no geometry claim below rests on a sub-24fps read, and
finger-owned motion is separated from free springs by the stasis/constant-velocity tests
(MARKS C1/C3 discipline).

## Scene index (this seat's window)

| t (s) | scene |
|---|---|
| 0.0–1.2 | Library (Recently Added), COLLAPSED dock trio, track playing |
| 1.2–1.8 | album page opens from the tapped grid cell (windowing) — VFR gap cluster here |
| 1.8–3.1 | album page rest (marquee runs) |
| 3.15–3.55 | album page pops back to the library (window shrink + dissolve) |
| 4.30–4.85 | now-playing expands from the pill (expansion #1, from the trio) |
| 4.85–5.5 | now-playing rest |
| 5.54–6.5 | the LONG dismissal: finger-scrubbed descent, ~0.7s, release near bottom |
| 6.5–7.1 | collapsed trio restored; idle |
| 7.2–8.9 | scroll play: two down-scrolls, a fling back to top — dock state NEVER changes |
| 9.05–9.55 | THE FUSION: eyeglass tap → trio becomes the stacked double dock; Search page |
| 9.55–10.9 | stacked dock quiescent on Search |
| 10.93–11.35 | lens travel Search → Library (tab switch, page hard-cut) |
| 11.75–12.18 | expansion #2 (from the stack; the bar dives off-screen) |
| 12.55–13.08 | collapse #2: card condenses into the pill (ζ0.83 landing), bar rises back |
| 13.38–13.8 | expansion #3 |
| 14.25–14.8 | collapse #3 (second landing sample, register identical) |
| 14.8–15.4 | stack quiescent |
| 15.45–15.8 | app-close zoom (body into icon, medium after — the C7 family) |
| 15.8–20.4 | home screen; Spotify (contrast: static opaque mini-player + tab bar, no fission, no lens, no glass) |

## The dock geometry (both states, measured at rest)

COLLAPSED (the fissioned trio — one row, three separate glass bodies, bottom inset ~90px):
- active-tab circle, left: red Library jar glyph, center ≈ (155, 2460), d ≈ 130px (43pt)
- now-playing mini pill, centre: x 270–950 (680px = 227pt), y 2390–2532 (h 142px = 47pt);
  art thumb + two-line marquee title + pause. No skip button in this state.
- eyeglass circle, right: center ≈ (1055, 2460), d ≈ 130px — the search glyph
- pill top edge (slab tracker) = 2390–2393

QUIESCENT STACK (the double dock — two full-width glass slabs):
- now-playing pill: x 65–1140 (1075px = 358pt), y 2205–2345 (h 140px); art + marquee title +
  pause + SKIP — the pill gains a control when it widens
- tab bar: x 65–1140, y 2372–2559 (h ~187px = 62pt): Home / New / Radio / Library / Search,
  the active tab under a tinted LENS capsule (~235px wide, protruding past the label row)
- stack gap pill-bottom → bar-top ≈ 27px; content reads through both slabs (heavy blur tier)

Codex law 4 confirmed in both states: circle = tap target, stadium pill = the player, slab =
the bar; the trio and the stack are the same role grammar at two fission levels.

---

## MARK 1 — breath of life: the dock, the search bar, fission/fusion

The honest measurement: **the life is transitional and transmissive, not idle.**

- **Idle is parked.** The quiescent stack over the Search page is bit-still: per-region mean
  consecutive diffs 0.02–0.27 across pill/bar/lens/content for 0.5s (b60-rest-search) — no
  pulse, no shimmer, no drift. The now-playing screen at rest is the same (art region diff
  ≤0.065 over the clean 0.25s window; the blurred-art backdrop does not visibly animate at
  this sampling — BOUNDED: drift under ~1px/s can't be excluded on a 0.25s window). Music's
  chrome runs law 11's restraint floor at ZERO. Our edict deliberately exceeds this — see the
  verdict below.
- **The marquee is the idle heartbeat.** The pill title scrolls its long Liszt title at
  ≈80–84 px/s (~27pt/s; cumulative cross-correlation: +42px over 0.5s, +60px over 0.73s,
  MEASURED) with multi-second pauses between cycles (two 0.5s rest windows caught it parked,
  shift 0±2px). Per-frame shift is sub-quantization (~1.35px/frame) — a per-frame tracker
  reads 0; only the cumulative read is honest.
- **Press acknowledgment is luminous, not geometric.** The pill tap brightens the dock band
  +3% for ~50ms before any motion (rowlum 84.7→87.4, f3–5 of npexpand1); the eyeglass glyph
  turns red on press ~35–70ms before the fusion moves. Engagement is displayed by LIGHT first
  — kin to MARKS §3's press-charge and law 9's "light changes ~80ms before shape".
- **Scroll-time life is transmission.** During the scroll play the dock's geometry never
  moves, but every glass body transmits the scene: region diffs run 20–60% of the passing
  content's diff amplitude, and the eyeglass circle SPIKES (up to 99 vs content 63) when
  bright album art passes beneath it — the lens bends what crosses it. The dock is alive
  because the world moves through it (law 2's adaptive tint, live).
- **State memory.** Every departure returns to the state it left: the scrubbed dismissal
  (from the trio) restores the trio; collapses #2/#3 (from the stack) restore the stack. The
  dock keeps its state through every morph, and the marquee keeps its scroll offset through
  the fusion (readable, advancing, in every fusion frame — law 17 re-attested).

OUR LANGUAGE: iOS parks; we don't. The transmissive register is the lesson to take — our
glass should visibly carry passing content (suffusion transmission scalar), our eyeglass
should bend it, and the press-light-first ordering (luminance ack ~50ms before geometry)
enters the engagement suffusion scalars. But the idle floor stays OURS: the law-11 breathing
floor (~7.6pt/s drift, ±20% mass) is a declared BEST-iOS divergence — warm-cream glass that
never goes bit-still, with the marquee-with-pauses duty cycle (motion, rest, motion) as the
honest cadence instead of constant crawl.

## MARK 2 — the dock's tabs and the eyeglass effect

Two eyeglasses, one object: the fissioned SEARCH CIRCLE (the literal ⌕ glyph) and the
stacked bar's LENS CAPSULE are the same body — the fusion transforms one into the other in
place (measured in b60-fusion: the circle reddens on press, then GROWS into the wide lens as
the bar forms around it; it never blinks or hands off).

The lens travel (Search → Library tab switch, b60-lens, t0=10.85):

| phase | t | duration | evidence |
|---|---|---|---|
| press-charge at DESTINATION | 10.933–11.0 | ~83ms | Library-slot redness blooms 63→107 (+70%), whole-bar peak +8% — the destination heats before anything moves |
| page hard-cut under the lens | 11.017 | ≤17–33ms | Search tiles → dark Library in 1–2 frames; every glass metric follows its backdrop (the bar is honest glass) |
| lens travel, one body | ~10.98–11.08 | ~100–133ms | 60fps crops: the capsule stretches to span BOTH slots mid-travel; the Library icon and "Search" glyph DOUBLE and WARP under it — literal refraction, glyph ghosting visible in single frames |
| cool-down + label crisping | 11.08–11.35 | ~250ms | label un-smears, capsule contracts from oversized to seated |

- The "eyeglass effect" is literal optics, MEASURED visually at 60fps: content under the
  traveling capsule refracts (doubling, curvature — f-010/011/013 show "Lib rary" split and
  the ⌕ bent into a C). This is the deepest refraction attestation in either corpus —
  stronger than Find My's rim warp and Safari's fringe.
- One-body law: third app confirmed (after MARKS C4/C5). No blink at any frame.
- Codex 16(b) sharpened: "page content swaps ≤83ms — a hard cut under a fluid lens" → the cut
  is ≤17–33ms at 60fps; travel ~100–133ms sits at the fast end of 16(b)'s ~170ms; the
  press-charge (destination-side, +70% redness, ~83ms) is a NEW clause this corpus adds —
  Find My charges the source, Music charges the destination.
- The whole-bar dimming at the cut is NOT a lens property — it is the glass following the
  page swap beneath (the confound is named so nobody re-measures it as a "blink").

OUR LANGUAGE: the lens ships as a true refractive body — backdrop-sampled tint (law 2), rim
protrusion kept (16b's load-bearing clause), and our addition: the destination press-charge
as a suffusion spark that arrives BEFORE the lens, so the eye is led. Sibling legibility
under the traveling lens (MARKS §3 note 5) remains our improvement to make: iOS still smears
the label for ~150ms; ours keeps glyphs legible through the glass. Warm-cream capsule, deft
oversize-then-seat landing, never a blink.

## MARK 3 — the album expands FROM the dock in one continuous timeline

The charter question — one interpolation or chained segments? channel desync? — answered
with three samples (t=4.30, 11.75, 13.38; all tap-committed, so the full curve is
system-owned, not finger-owned):

**It is ONE body on ONE gesture clock, with detuned channels inside it.** The pill does not
open a player; the pill BECOMES the player. Chained-segments: NO. Desync: YES, deliberate,
inside the single timeline (law 5's detuned-channel canon, cleanly re-attested):

| channel | onset (rel. tap ack) | clock | evidence |
|---|---|---|---|
| press ack (pill brightens +3%) | 0 | ~50ms | rowlum f3–5 |
| body geometry + medium dim | +50ms, SAME frame | dim ramps ~170ms (−33% top-band lum); body ~350ms | rowlum f6; coherent edges |
| artwork thumb → hero | rides the body | trackable from +200ms; settles +480ms; exp tail τ≈57ms; whole-approach fit ζ≈0.96 [0.95–0.96], NO overshoot | cardedge fit, rms 0.83px |
| content crossfade inside the body | +170–230ms | ~100ms overlap: the pill's title row rides the card's TOP edge and fades out while the np title block fades in at its DESTINATION slot | 60fps crops f-012–015 |
| transport/volume block | +230ms (~180ms after body) | slides up from BELOW the screen edge, τ≈54ms tail, settles +520ms, no overshoot | coherent pair 2542→2205 |
| (from the stack only) tab bar | +50ms | dives below the screen edge in ~80–130ms | npexpand2 edges 2372→2483→gone |

- Total press→still ≈ 430–480ms across all three samples — duration-stable (law 14a).
- The artwork is the CONTINUITY CARRIER: one art element, continuously interpolated from the
  60px thumb slot to the ~1080px hero, never duplicated, never crossfaded. The np title block
  fades in AT its final position (law 5's pre-composed chrome: revealed, not reflowed).
- The two content channels share one ease constant (τ 57 vs 54ms) at different onsets —
  detune the CLOCKS, share the CURVE.
- Arrival is near-critical (ζ≈0.96): the deploy lands DEAD, no bounce. Contrast the collapse
  landing (mark 5: ζ0.83, one overshoot) — iOS spends its bounce budget on arrivals INTO the
  dock, never on departures from it.
- Siblings during expansion #1: the jar circle and eyeglass stay put and fade in place
  (~100ms) as the card overruns them; on return they are re-materialized by the landing
  choreography. The trio is never dragged along.

OUR LANGUAGE: this is the dock-expand choreography API, measured: one scalar drives the body;
named channels (medium, body, carrier, content-cross, controls) at fixed onsets
(0/+50/+170/+230ms), one shared τ≈55ms ease tail; deploy arrives critically damped, landing
back home arrives at DOCK_SPRING (mark 5). Our warm glass does the same with our palettes —
and our marquee/art carrier rides the morph uncut (law 17), which glass-ui's dock band
already holds sacred.

## MARK 4 — pages expand FROM the album cover; the windowing transition

Open (b24-albumopen, t0=1.10; the VFR drop cluster sits INSIDE this event — every duration
here is BOUNDED, ±1–2 display frames):

1. Tap on the grid cell (the red Liszt cover, cell x≈610–890, y≈1450–1740).
2. t≈1.39: the destination page materializes as a PRE-COMPOSED MINIATURE WINDOW — the entire
   album page (art, title, Play pill, metadata, first track rows) already laid out, scaled to
   ~50%, rounded-corner, floating over the library — while the library dims behind it (same
   clock, no lead measurable at 24fps through the drop gaps).
3. t≈1.39–1.64: the window scales to full-bleed, ~250ms, decelerating; the anchor tracks from
   the tapped cell's column toward screen center (origin BOUNDED: consistent with the cell
   position in every readable frame, not frame-nailed — the recorder dropped exactly here).
4. t≈1.64–1.77: header/nav solidify; settled. Total ≈ 400ms.

Close (b24-albumclose, t0=3.05): the mirror, faster and cut short — the page shrinks toward
its source cell but DISSOLVES at ~35–40% scale (~200ms, 3.175–3.38) while the library
un-dims concurrently. Entry with full ceremony, exit evaporating early: law 8's asymmetric
exit, on a page window.

- THE DOCK IS INVARIANT: through open and close, the collapsed trio never moves, never
  re-layers — the windowing happens BEHIND the dock furniture. Pages are content; the dock is
  chrome; the two never share a timeline. (Law 5's struck nav clause said push/pop is
  slide+parallax — Music's library→album is NOT a slide; it is a scaling window, i.e. the
  app-zoom grammar used INSIDE an app. That is a genuine refinement to law 5's scoping: the
  scaling-card grammar appears in-app when the source is a CELL (cover) rather than a nav
  row.)
- "Contextually switches to the next page": confirmed as stated — the new page carries its
  full context from first visibility (pre-composed), and the switch is the window REPLACING
  the library, not a lateral slide.

OUR LANGUAGE: the card-window morph preset — grow a pre-composed miniature from the source
cell under a same-clock dim, land at ~250ms/critically-damped, dissolve-don't-complete on the
way back (~200ms, release at ~35%). Our deft rounding keeps the miniature's radius
role-correct at every scale (law 4's concentric nesting), and the dock invariance rule is
adopted verbatim: no page transition may perturb dock geometry, ever.

## MARK 5 — THE DOUBLE DOCK

The state machine, as filmed: QUIESCENT STACK (pill above full bar) ↔ FISSIONED TRIO
(active-tab circle left, now-playing pill centre, eyeglass right). The segment opens already
in the trio (pre-scrolled before recording) and shows every transition EXCEPT the
scroll-collapse:

**The fusion (trio → stack), tap-triggered, fully choreographed (b60-fusion, t0=9.00) —
per-phase timeline:**

| t | phase | measurement |
|---|---|---|
| 9.05–9.08 | eyeglass press | glyph reddens (ack ≤70ms before motion) |
| 9.083 | THE MERGE | the jar circle is swallowed INTO the pill's stretching left edge — goo fusion, one outline (law 6, intra-body) |
| 9.083–9.233 | pill lift + widen | top 2393→2197 in ~150ms (189px = 63pt), widening 680→1075px; overshoots UP +7px (f17–19), relaxes to 2204 by 9.383. Marquee NEVER stops (law 17) |
| 9.183–9.25 | bar materializes | slab edges (top 2372, bottom 2559) form IN PLACE under the rising pill, ~65–80ms — the bar is born, not slid |
| 9.15–9.25 | icon fan-out, red-birth stagger | icons materialize L→R ~50ms/slot (New f10, Radio f11–12, Library f13–14), each born RED-HOT and cooling to white; the jar TRAVELS from its collapsed spot into the Library slot with motion blur (f13, glyph doubling) — the active-tab icon is the bar's continuity carrier |
| 9.117–9.32 | eyeglass → lens | the search circle grows in place into the lens capsule, oversized at ~9.32, seated by ~9.4 |
| 9.2 | page cut | Library content → black, behind the dock morph |
| 9.517 | Search tiles arrive | the page completes 280ms AFTER the dock settles — the dock LEADS, the page follows |

Total: tap → dock settled ≈ 300ms; full scene ≈ 500ms. Three simultaneous conservation
tricks: the pill conserves its content (marquee uncut), the bar conserves the active tab (the
traveling jar), the lens conserves the search affordance (circle→capsule in place). Nothing
blinks; every body has a parent.

**The collapse-into-stack landing (card → pill + bar), two samples, THE FIT:**

The np card condenses INTO the pill (one body again — the card's top edge becomes the pill's
top edge) while the tab bar rises from BELOW the screen edge. The two bodies arrive from
OPPOSITE directions and land on different curves:

| body | curve | sample #2 (t0=12.50) | sample #3 (t0=14.20) |
|---|---|---|---|
| pill (from above, fast) | underdamped spring | crosses rest at ~1920px/s, overshoot +31px, ζ=0.83 [0.81–0.85], f_d=1.62Hz [1.52–1.70], rms 0.57px, settle ≈ 300ms | crosses at ~2460px/s, +31px, ζ=0.83 [0.78–0.88], f_d=1.60Hz [1.36–1.80], rms 0.97px |
| bar (from below) | pure exponential | τ≈35ms, ~10 frames, NO overshoot | same anatomy, lands f31 both times |

- **The register is the C2 register.** ζ0.83/f_d 1.6Hz here vs the Maps flung-collapse ζ0.80
  [0.77–0.88]/f_d 1.7Hz [1.4–2.0] — four independent samples across two apps and two corpora
  now agree. Codex 14(c) (single ~9% overshoot, ζ≈0.75–0.85, no second bounce): CONFIRMED
  with constants. `springPreset("dock")` on-disk (0.30, ζ0.82) ⇒ f_d 1.91Hz: ζ dead-on; f_d
  sits just above this fit's bracket and inside C2's — the joint corpus now prefers f_d
  1.6–1.7Hz, i.e. the response nudge 0.30→0.35 that C2 called optional is now the
  centered choice (X2's judgement, two more votes).
- Overshoot stays velocity-bought: +31px at 1920–2460px/s crossing ≈ 0.013–0.016 px per px/s
  — same order as C2's ≈0.02 (BOUNDED; two points, tracker ±2px).
- The card's exit before the landing is FRONT-LOADED: ~100–120ms visible exit at up to
  ~4000px/s, then the un-dim tail ~270ms (medium relaxes after content — MARKS §5/C6's close
  desync, third surface).

**What is NOT on film (honesty):** the scroll-collapse direction (stack → trio). Throughout
the scroll play the dock was ALREADY the trio and never changed; after the collapses restored
the stack the user never scrolled again. Two 16(a) clauses are nonetheless attested from the
negative space: the fling-back-to-top at t≈8.6–8.9 did NOT re-expand the trio ("momentum
rebound never re-expands" — confirmed), and the eyeglass tap DID reset to the full stack
("any tab switch resets to full" — confirmed, and now measured at 60fps as the fusion
timeline above). The scroll-collapse itself: INCONCLUSIVE in this corpus; its prior
attestation stands in law 16(a) (~330ms, three-body goo, displacement-gated) from the RU-15
lineage.

**The scrubbed dismissal (b24-npdismiss) — the scrub law on the player:** the whole 0.7s
descent is finger-owned (steady ~1500px/s, no deceleration profile, no catch, no reversal —
the C1/C3 constant-velocity test), with the un-dim tracking scrub position 1:1 (law 7d's
position-mapped material, on the player card), completing into the trio on release. Every
np expansion/collapse is scrub-interruptible in principle; this corpus shows the scrub side
once and the committed side five times.

Contrast datum: Spotify's bottom (16.8–20.4) is the same LAYOUT (mini-player above a tab
bar) with zero of the behavior — opaque statics, no fission, no lens, no transmission. The
double dock is not a layout; it is a state machine with conservation laws.

OUR LANGUAGE: this is the testament the charter named — a dock is not a monolith, not one
orientation, not one width. Our facilities already speak fission/fusion; what this corpus
adds is the CONSERVATION DISCIPLINE: every fission body must have a parent and a carrier
(content, active-icon, affordance), landings into the dock run DOCK_SPRING (the on-disk
{0.30→0.35, ζ0.82} is corpus-true; never trust a remembered literal), births are warm
(red-hot → cool, ours in warm-cream → parchment), the bar materializes rather than slides,
and opposite-direction arrivals (pill from above, bar from below) are the signature of a
two-body landing. The dock leads its page by ~280ms — choreograph the furniture first, let
the world catch up.

---

## The register table (all fits, this corpus)

| event | constant | grade |
|---|---|---|
| pill landing (collapse #2) | ζ=0.83 [0.81–0.85], f_d=1.62Hz [1.52–1.70], rms 0.57px, settle ≈300ms | MEASURED |
| pill landing (collapse #3) | ζ=0.83 [0.78–0.88], f_d=1.60Hz [1.36–1.80], rms 0.97px | MEASURED |
| landing overshoot | +31px at 1920–2460px/s crossing (≈0.013–0.016 px per px/s) | BOUNDED |
| bar rise into place | exponential τ≈35ms, no overshoot | MEASURED |
| bar dive (expansion from stack) | ~80–130ms to off-screen | MEASURED |
| expansion arrival (art carrier) | ζ≈0.96 [0.95–0.96], exp tail τ≈57ms, no overshoot | MEASURED |
| controls slide-up | τ≈54ms, onset +180ms after body, no overshoot | MEASURED |
| fusion pill lift | 189px in ~150ms, +7px overshoot, relaxed +150ms (spring fit rms 8.3px — animation-owned ease, constants not publishable) | BOUNDED |
| expansion total | 430–480ms press→still, three samples | MEASURED |
| medium dim ramp | ~170ms, −33% top-band luminance; un-dim ~270ms on close | MEASURED |
| lens travel | ~100–133ms one-body; destination press-charge +70% redness over ~83ms; page cut ≤17–33ms | MEASURED |
| album window open / close | ~250ms grow (~400ms total) / ~200ms shrink, dissolving at ~35% | BOUNDED (VFR drops inside the open) |
| marquee | ≈80–84px/s (~27pt/s) cumulative, multi-second pauses | MEASURED (cumulative), BOUNDED (per-frame) |
| idle (stack, np, trio) | bit-still (region diffs ≤0.27 over 0.25–0.5s windows) | MEASURED (windows), BOUNDED (slow drift <1px/s not excluded) |

## The codex ledger (confirms / refines / contradicts)

- Law 14(c) release spring: **CONFIRMED with constants** — ζ0.83, f_d 1.6Hz, one overshoot,
  no second bounce, two fresh samples; joint with C2, four samples, two apps.
- Law 16(a): "momentum rebound never re-expands" and "any tab switch resets to full" —
  **both CONFIRMED** from this corpus's negative and positive space; the fusion direction now
  has a 60fps per-phase timeline. Scroll-collapse: not re-attested here (INCONCLUSIVE), prior
  attestation stands.
- Law 16(b) tap lens: **SHARPENED** — page hard-cut ≤17–33ms (was ≤83ms); travel 100–133ms;
  NEW clause: destination-side press-charge (+70% redness, ~83ms) precedes travel.
- Law 17 continuity of state: **RE-ATTESTED** — the marquee scrolls uncut through the fusion;
  the artwork carrier is never duplicated; state memory across every departure/return.
- Law 5 detuned channels + pre-composed chrome: **RE-ATTESTED, and REFINED in scope** — the
  scaling-window grammar appears IN-APP when the source is a cover cell (library→album), so
  "app zooms only" is too narrow; cell-sourced page pushes use the window grammar too.
- Law 8 asymmetric exit: **RE-ATTESTED twice** (album window dissolves at ~35%; np card exits
  front-loaded with the medium trailing ~270ms).
- Law 6 goo: **RE-ATTESTED intra-body** (jar swallowed into the pill; card condensing into
  the pill as one outline).
- Law 11 restraint floor: **CONTRADICTED BY ABSENCE in this app's chrome** — Music's dock and
  player idle at zero ambient motion. Law 11's breathing floor derives from editorial cards;
  the chrome-level floor remains OUR divergence, held deliberately.
- Law 2 adaptive tint: **RE-ATTESTED live** — the bar's whole register follows the page cut;
  scroll transmission 20–60%.

## Moments deserving denser bursts (not cut this pass)

1. The scroll-collapse direction (stack → trio) — absent here; needs a recording that scrolls
   while stacked. The ONE missing limb of the double-dock state machine.
2. The fusion at 120–240fps — the jar's slot-travel and the icon red-birth overlap inside
   ~50ms windows; 60fps gives 3 frames per icon.
3. A slow scrubbed np expansion (finger-held) — all three captured expansions are
   tap-committed; the height-mapped reveal ladder (MARKS §6's law) is untested on this
   surface in this corpus.
4. The album-open re-shot without recorder drops — the origin anchor (tapped cell) is
   BOUNDED only because the VFR gap cluster sits exactly inside the event.
5. The lens under a LONG-PRESS drag (Find My's 16(c) regime) in Music — does Music's lens do
   velocity elongation? Not exercised in this recording.

## The marks ledger

- **1 breath of life** → life is transitional + transmissive; idle PARKS (marquee 80px/s with
  pauses; +3% luminance press-ack ~50ms before motion; glass transmits 20–60% of scroll
  motion, eyeglass spikes on bright transits; quiescent stack bit-still) → MEASURED →
  suffusion engagement scalars + transmission scalar; the law-11 idle floor stays our
  declared divergence.
- **2 tabs + eyeglass** → the lens is literal refractive optics: one-body capsule stretches
  across 2 slots, glyphs double/warp beneath it; ~83ms destination press-charge (+70%
  redness) → ≤33ms page hard-cut under the fluid lens → 100–133ms travel → ~250ms cool →
  MEASURED → goo-lens engine; codex 16(b) sharpened, one-body law third-app confirmed.
- **3 album from the dock** → ONE continuous body confirmed: the pill IS the card; artwork is
  the continuity carrier; desync inside one timeline (dim+body same frame, content crossfade
  mid-flight, controls +180ms from below, shared τ≈55ms); arrival near-critical ζ≈0.96;
  430–480ms press→still, duration-stable ×3 → MEASURED → the dock-expand choreography API
  (named channels, fixed onsets, one ease).
- **4 pages from the cover** → windowing = a pre-composed ~50% miniature growing from the
  tapped cell in ~250ms under a same-clock dim, dock invariant throughout; close dissolves at
  ~35% (law-8 asymmetry) → MEASURED anatomy, BOUNDED timings/origin (VFR drops inside the
  event) → the card-window morph preset + the dock-invariance rule.
- **5 THE DOUBLE DOCK** → the state machine measured: fusion trio→stack in ~300ms (pill +63pt
  lift with +7px overshoot, bar born in place ~65–80ms, icons red-birth stagger ~50ms/slot,
  the jar travels to its slot, the eyeglass BECOMES the lens, marquee uncut); collapse
  landing ζ=0.83 f_d≈1.6Hz ×2 (= the C2 register; codex 14(c) confirmed); pill-from-above +
  bar-from-below opposite-direction arrival; dock leads its page by ~280ms; scroll-collapse
  direction NOT on film (INCONCLUSIVE; 16(a)'s no-momentum-re-expand + tab-switch-reset both
  confirmed) → DOCK_SPRING corpus-true at {response→0.35, ζ0.82}; the fission/fusion
  conservation discipline enters the dock band.
