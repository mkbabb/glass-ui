# MARKS-C-APPS — the V1 chatgpt + gemini segments (EXEMPLARS-2)

Seat: V1-APPS. Verified-model: claude-fable-5 (read verbatim from this seat's system context).
Source: `/Users/mkbabb/Downloads/ScreenRecording_07-18-2026 14-56-16_1.MP4` — 66.045s, 1206x2622,
VFR (~57.5fps avg, 240-tick timebase). All px are source px; ÷3 for pt. Charter marks 6-8
(`EXEMPLARS-2-CHARTER.md`); the music segment (marks 1-5) belongs to the music seat.

Frame ladders (seat dir `…/scratchpad/exemplars2/V1-APPS/`, README stamps every t0):
survey10 (t0=0.0, 10fps, full video) + fifteen 24fps event bursts + five 60fps physics bursts
(`b24-*`, `b60-*` — contract: frame f-N sits at t = t0 + (N−1)/fps; the fps filter resamples the
VFR input to CFR output timestamps, so the contract holds). VFR caveat: the recording itself
duplicates frames under load (b60-sliderin f-012–016 are bit-identical) — every duration bracket
below absorbs that; no fit below leans on a single frame interval.

Method: montage sweeps for anatomy; numeric trackers (`measure.py`) for physics — bright-pill
bbox tracking, per-band Gaussian-σ fitting (sharp frame re-blurred and grid-searched against the
engaged frame, luminance renormalized), keyboard-glyph-top edge tracking, row-luminance dark-run
card tracking, circular-median hue sampling, autocorrelation pitch. MEASURED / BOUNDED /
INCONCLUSIVE marked throughout; the prior corpus's two aliasing artifacts (the 12fps "blink",
the "detent arrest") govern the discipline — nothing here is claimed off a 10fps read alone.

## Scene index (this seat's window)

| t (s) | scene |
|---|---|
| 20.4–23.0 | app-paging carousel (Spotify→Music→Photos→ChatGPT), card expands to full-bleed |
| 23.6–26.4 | ChatGPT (Codex thread): two momentum scrolls, rest |
| 26.6–27.0 | keyboard rise (~350ms) |
| 28.80–29.05 | effort-slider EXPANSION #1 + gradient-blur onset |
| 29.6–32.3 | drag play: Extra High→High→Medium→High→Extra High, engaged holds |
| 32.35–32.43 | slider COLLAPSE #1 (fill evaporates, label flies home) |
| 33.5–36.5 | engagement #2: re-expand, drag EH→Medium→EH, release at 36.43–36.55 |
| 37.6–41.4 | long momentum scroll through the thread |
| 41.5–41.9 | push to the Projects page (slide + parallax) |
| 43.40–43.6 | sidebar drawer snap-open + staggered population |
| 45.7–46.3 | app-close zoom (body ~330ms, medium resolves after) |
| 46.4–47.2 | Siri/Spotlight "Search or Ask" pull-down #1 (full deploy) |
| 48.9–50.0 | sheet dismissal (content-first, medium-last) |
| 50.4–51.4 | pull #2: the scrubbed medium, held partial |
| 51.45–52.1 | release COMMIT: keyboard pop + panel fade + settle |
| 52.6–53.3 | typing "Gem" |
| 53.42–54.0 | recents→results drawer morph (veil → condense → grow-with-content) |
| 54.0–54.4 | Gemini app-open zoom; 54.4–55.1 black launch splash |
| 55.1–56.2 | Gemini UI arrival; sparkle-field blooms; keyboard rise |
| 56.2–57.7 | field hue walk violet→indigo-blue; 57.8–59.4 DEAD STATIC idle |
| 59.5–60.9 | typing "Hello"; send at ~60.87 |
| 60.9–61.4 | bubble entrance + composer descent + field bloom |
| 62.0–66.0 | full-screen hue sweep blue→green→gold; "Assessing the Input"; "Answer now" |

---

## MARK 6 — ChatGPT: space, the slider, the gradient blur, bubbles, the dock facilities

### 6.1 Space and proportion (MEASURED, static)

- The header is not a bar — three floating glass ISLANDS over scrolling content: a back-chevron
  circle (d≈130px/43pt), a centered two-line title cluster (title ~51px cap semibold, subtitle
  ~42px grey "bbnf-lang · MacBook-Pro"), and one right capsule holding compose+ellipsis
  (~328x130px, r=65 — a stadium pill of two tap-targets). Content scrolls beneath them —
  codex law 4's role grammar (circle=target, pill=action cluster), fissioned rather than fused.
- Assistant prose is PLAIN — no bubble: left margin 48px, measure ~1090px (90% of width), body
  ~51px (17pt), line-height ~84px (28pt), paragraph gap ~+40px. User turns get the dark-grey
  rounded card, right-shifted; artifacts ("122 files changed" diff card) are full-width dark
  cards (x 40–1165, r≈40) with mono green/red counts. The hierarchy is carried by CONTAINMENT
  (card vs plain) and one accent, not by color fields — white-on-black, one orange warning
  glyph, green/red diff accents only.
- The composer is the page's one heavy object: a floating card x 40–1165 (93% width), y
  1325–1600 (h≈275px, r≈56-60), ghost placeholder "Ask Codex" (~51px grey), button row inside:
  + / orange shield-! / "5.5 Extra High" chip / mic / send-up circle (d≈110). Bottom-anchored
  with a fixed inset — the dock posture.

### 6.2 The effort-slider engagement (MEASURED at 60fps)

The composer chip "5.5 Extra High" is the collapsed state of a value slider; engagement morphs
the COMPOSER ITSELF into the slider, in place — no popover, no sheet:

Expansion (b60-sliderin, t0=28.70): nucleation at t=28.800 — a ~75px bright seed at the chip's
x — then the white fill SWEEPS outward asymmetrically: right edge reaches x≈948 within ~33ms,
left edge sweeps 444→239→174→126 over ~170ms; the "5.5 Extra High ›" label lifts out of the
chip and lands centered ABOVE the track. Final geometry: outer track x 90–1125 (w=1035, h≈205,
a full capsule), white fill inset ~30px (h≈143); the label row sits where "Ask Codex" was.
Width peaks at 954px (t=29.00–29.02) then relaxes to 947 — a +7px (~0.7%) overshoot, absorbed
over ~150ms. Total morph ≈250ms including the settle. MEASURED, with the VFR duplicate-frame
caveat inside the sweep.

Drag: three detent labels ever shown across both engagement series — Medium / High / Extra
High — with fill fractions 22% / 53% / 100% of the track; unoccupied detents render as DOTS on
the track (law 12's fill-pill + dots, live). Labels change discretely at detent crossings while
the fill tracks the finger continuously. This is the LIVE MOTION of codex law 12's evidence
stills (IMG_2287/2288 are this exact control in two states): law 12 CONFIRMED and extended —
selection = occupied length, dots = remaining positions, and the growth is finger-scrubbed
between snaps. Detent count: BOUNDED at three (no lower label ever appears, including at the
leftmost drag extreme).

Collapse (b60-sliderout, t0=32.20): a 2px pill lift at t=32.317 (press acknowledgment), then
the fill EVAPORATES in ≤33ms (w 947→892→gone across two frames) while the "5.5" label glyph
FLIES from the label row (y≈1394) back down into its composer chip slot (y≈1478) over
~70–100ms; the composer card is fully re-materialized by 32.43. Deploy≈250ms with ceremony,
dismiss≈100–230ms front-loaded — the codex law 8 entry/exit asymmetry, on a control.

### 6.3 THE GRADIENT BLUR — the focus mechanism, measured

Per-band Gaussian-σ fit (engaged t=31.85 vs content-identical sharp t=33.10), σ in source px,
distance from the slider's vertical center (y≈1533):

| band (y) | distance | fitted σ | note |
|---|---|---|---|
| 150–690 | −1400..−850 | 0 | chat prose fully sharp |
| 780–1050 | −750..−500 | ~1 | threshold softness |
| 1140–1230 | −360 | **10** | the "5 files" status chip — heavy mush |
| 1680–1770 | +190 | (occluded by track surround) | |
| 1770–1950 | +260..+330 | **8–10** | QWERTY row unreadable |
| 1950–2130 | +450 | 2 | A-row soft glow edges |
| 2220–2400 | +550..+650 | ~1 → 0 | Z-row onward sharp |
| 2400–2622 | +700+ | 0 | spacebar row, emoji row crisp |

- The field is an ANNULAR GRADIENT centered on the slider: σ_max ≈ 10px (~3.3pt) inside
  ±~150–360px, decaying to zero by ~450px above and ~600px below. Radius ~10px, extent
  ~900–1000px of affected band, falloff roughly Gaussian-in-distance (σ halves by ~±450px).
- NO SCRIM: luminance ratio engaged/sharp = 0.99–1.01 in every non-pill band — the focus is
  pure blur, zero dimming. (A montage-scale read said "everything blurs and dims" — CORRECTED
  by the fit; the far field is untouched. The thumbnail impression was scale aliasing.)
- Coupling (60fps gradient-energy on the Q-row): blur onset begins the SAME FRAME as fill
  nucleation (28.800) and completes its ramp in ~170ms alongside the sweep; un-blur starts one
  frame after evaporation and clears in ~100–170ms. One channel, one clock — the blur is the
  morph's shadow, not a staged backdrop. MEASURED.
- Codex routing: this is law 1(a)'s "directional ramp behind a floated control" made live —
  and it is an IN-SURFACE-ADJACENT graded blur in the wild (around a control, over sibling
  content), the closest attested kin to our declared `--glass-halo-*` divergence. The judge
  should count it as evidence FOR the halo direction, with the two iOS truths kept: local
  annulus (never whole-screen), and no luminance change.

### 6.4 Chat bubbles and their animation (honesty section)

- No message is SENT in the ChatGPT segment — the composer is only used for slider play. The
  bubble ENTRANCE animation is INCONCLUSIVE for ChatGPT in this corpus; the thread arrives
  fully composed inside the app-open card (pre-composed chrome, law 5) and no per-bubble
  stagger is observable at 24fps during load or scroll.
- What IS observed: the status mini-chips above the composer ("5 files +108 −3",
  "MacBook-Pro is reconnecting", "Reconnecting to task…") swap by fade in place — live-data
  upgrade without reflow, law 17's grammar at chat scale.
- Scroll physics: the long thread scroll (37.6–41.4) decays smoothly over ~0.9s after release
  with no rubber-band event captured; standard iOS deceleration. BOUNDED (finger vs free not
  separable at 10fps for the mid-window; the tail is clean deceleration).
- The measured bubble sibling lives in Gemini (§8/send): fade-in S-curve ~300ms, ~150–200ms
  after commit, position near-static (translation ≤20px if any — BOUNDED).

### 6.5 The dock facilities therein

- **Composer-as-dock, morphing bodily**: the composer is the dock, and the slider engagement
  is an IN-PLACE whole-body morph of it (6.2). Not fission — TRANSFORMATION: one glass body,
  two roles, the label carried across the morph as a continuous element (law 6's one-body
  rule; law 9's staged axes — fill sweep first, label landing second, blur riding the sweep).
- **The stacked mini-dock**: status chips float ABOVE the composer as a second, subordinate
  dock — a quiescent stacked-dock arrangement kin to Music's double-dock (mark 5, the music
  seat's file), at utility scale. They fade in place, never travel.
- **Header fission**: three separate islands (6.1) — the dock-is-not-a-monolith thesis in the
  header position.
- **The sidebar drawer** (b24-drawer, t0=43.30): tap → the left menu crosses ~60% of its
  travel inside the first 40–80ms, lands by ~150ms, settle tail ~200ms; the pushed Projects
  page stays parked as a right-edge sliver (parallax push, not overlay). The menu's own rows
  POPULATE in a stagger after landing — Images → Pinned → Finances arrive over ~200ms
  (staggered reactive entry, law 8, on a drawer). MEASURED at 24fps.
- **App-paging carousel** (b24-entry): bottom-edge horizontal swipe pages between live app
  cards at ~88% scale over the blurred wallpaper — gesture-scrubbed, each card live; the
  ChatGPT card settles then expands to full-bleed in ~800ms total. The card-over-medium
  grammar of law 5's app-zoom family, sideways.
- **Close zoom** (b24-appclose): body shrinks into the home grid in ~330ms while the wallpaper
  medium resolves ~250ms AFTER the body lands — MARKS C7's one-body + medium-after, replicated.

DESIGN NOTES (ranked):
1. The composer→slider whole-body morph is the strongest new pattern in the corpus: a dock
   that BECOMES its own control, label carried continuously, blur riding the same clock. One
   body, one scalar, three channels detuned inside it.
2. The gradient-blur focus law: local annulus, σ≈10px peak, Gaussian falloff to zero within
   ~2 control-heights, ZERO dimming, clock-locked to the morph. Never a full-screen scrim.
3. Fill-pill detents: value = occupied length, empty detents = dots, labels snap discretely
   while fill scrubs continuously. Min fill ≈ track height (the capsule never collapses past
   a circle).
4. Deploy with ceremony (~250ms, +0.7% overshoot), dismiss by evaporation (≤33ms fill,
   ~85ms label flight). Asymmetry is the felt honesty of a control.
5. Content hierarchy by containment: plain prose vs carded artifacts vs the one heavy
   composer — proportion carried by three weights of surface, not by color.

OUR LANGUAGE: we do not clone a black Codex sheet. The composer-morph slider becomes a
glass-ui facility: `springPreset("dock")` drives the fill sweep (response ~0.30–0.35, ζ0.82 —
the measured +0.7%/150ms relax sits inside its register); the fill is our warm-cream pill on a
frosted track, detent dots as suffusion sparks; the gradient-blur annulus ships as the
`--glass-halo-*` scalar pair (radius≈10px→3.3pt peak, extent≈1.5 control-heights, luminance
LOCKED) — engagement suffusion, not modal scrim. The stacked status mini-dock joins the dock
band's quiescent vocabulary (a second-rank dock riding the first). Deft rounding: track
capsule r=h/2, composer r≈19pt — the concentric law 4 nesting we already enforce.

---

## MARK 7 — the Siri-contextual pull-down, the partial black-dock, the drawer morph

(The "Search or Ask" Spotlight/Siri sheet, entered from the home screen; the Gemini app is
reached THROUGH it. The V2 seat owns the island Siri invocation — this is the home-screen
contextual sheet.)

### 7.1 The open choreography (pull #1, t=46.4–47.2 — MEASURED at 24fps)

| channel | start | end | duration |
|---|---|---|---|
| wallpaper blur + home-grid recession (scale ~0.92, slight down-slide) | 46.43 | ~46.7 | ~250ms — leads |
| "Search or Ask" pill forms at top | ~46.5 | ~46.65 | ~150ms |
| recents card condenses in (8 apps, 2x4, born as frosted ghost) | ~46.7 | ~47.0 | ~300ms |
| contextual actions populate (New chat/Recents/Link on Clipboard/Open Link) | ~46.9 | ~47.1 | ~200ms |
| keyboard rises | ~46.85 | ~47.15 | ~300ms — last-in |
| total | | | ~800ms, all overlapped |

Codex law 5/8 exactly: medium leads, bodies condense from ghosts, chrome (keyboard) last-in.
The context is LIVE: the actions row knows the last app (New chat) and the clipboard (Open
Link + the instagram URL preview) — the sheet is contextual, not a static launcher.

### 7.2 The scrubbed medium and the commit (MEASURED/BOUNDED at 60fps)

- Pull #2 (50.4–51.4) proves the sheet is a TRACKED LEADER (law 15): pull distance maps 1:1
  to (blur, grid recession) continuously — held partial for a full second at mid-blur with
  NOTHING deployed. The panel and keyboard are not scrub-mapped; they are COMMIT bodies.
- Release commit (b60-siricommit, t0=51.35): the keyboard pops from below to near-final in
  ≤100ms (glyph-top 2471→1993 inside two frames at 51.43–51.45); the panel fades in over
  ~200ms behind it (region luminance 76.9→30, 51.58–51.78); then one slow assembly settle —
  the tracked edge descends 1950→1995 over ~250ms (51.85–52.10), i.e. a ~45px upward
  overshoot returned monotonically. BOUNDED (glyph tracking mixes elements mid-deploy; the
  smooth exponential tail is real but its owner — keyboard top vs panel bottom — is not
  isolated). Law 15's "fixed ~200–250ms pop regardless of pull speed": CONFIRMED in kind.
- Dismissal (48.9–50.0): keyboard drops first (~48.88), panel lifts/fades (~49.5–49.75, the
  49.7 pop-off spike), the blur medium relaxes LAST (~49.7–50.0). Content-first, medium-last —
  law 8's exit half, and MARKS §5's close desync, on a third surface. MEASURED at 24fps.

### 7.3 The partial black-dock (MEASURED, material)

The siri menu's panels are PARTIAL-SCREEN BLACK DOCKS floating on the blurred wallpaper: the
recents+actions card interior means RGB ≈ (44,43,38) over an olive-bright wallpaper region
(65,68,41 below it) — near-black at ~85-90% opacity with a faint warm-green leak (a whisper of
adaptive tint, law 2, at the darkest register iOS ships). Not glass — a black dock,
deliberately heavier than CC's translucent tiles, spanning only part of the height; the
keyboard beneath is standard dark; the wallpaper breathes around all edges. The "partial"
quality is the point: the sheet is an archipelago of black islands on a live medium, never a
full-bleed modal.

### 7.4 The recents→results drawer morph — the movement of momentum (MEASURED at 60fps)

Typing "Gem" (b60-gemsearch, t0=53.35):

1. **The veil** (t=53.417, ONE frame): the recents grid dissolves into a full-height dark
   veil — instant, the whole panel darkens as one body.
2. **The condense sweep** (53.42–53.53, ~120ms): the veil's bottom edge retracts upward
   1672→1009px; per-frame velocities 2.5k → 5.9k → 10.2k → 6.5k → 5.8k → 4.9k → 4.0k px/s —
   an accelerate-then-decelerate BELL, a thrown mass caught softly, no oscillation. This is
   the momentum: the drawer condenses toward its result form with real mass, critically
   damped at arrival. MEASURED (edge-tracked, 7 samples across the bell).
3. **Grow-with-content** (53.55–54.0, ~450ms): the compact card (top y=389) then EXTENDS
   DOWNWARD as sections land — Gemini action row (Type / Open mic / Talk Live) → "Photos From
   Apps" header → thumbnail strip → second row → Settings footer — each arrival pushing the
   card taller with decelerating steps. The drawer literally grows with its content — law
   17's skeleton-first population expressed as GEOMETRY, the counter-pole to law 7(e)'s rigid
   mask reveal. Sheets are rigid; drawers grow.

### 7.5 Through to Gemini (MEASURED, with an honesty line)

Tap → the sheet DISSOLVES (~120ms, un-blur glimpse of home) → the app card zooms to
full-bleed in ~250ms → then ~1.3s of pure BLACK: the Gemini launch splash. The black hold is
app cold-start, not choreography — excluded from every motion verdict. The UI then FADES from
black (55.1–55.7) with the header/greeting/input arriving as one crossfade, keyboard last
(55.7–56.1).

DESIGN NOTES (ranked):
1. Scrub the medium, commit the furniture: pull = 1:1 blur+recession; panels/keyboard deploy
   only on release, as a fixed-duration pop. Never scrub-map a keyboard.
2. The condense-sweep bell (~120ms, peak ~10k px/s, no bounce) is the momentum signature for
   drawer morphs — mass without wobble.
3. Drawers grow with content top-down (~450ms of staggered section arrivals); sheets stay
   rigid. Two grammars, never mixed.
4. The partial black-dock: near-black islands (~88% opacity, faint backdrop tint) on a live
   blurred medium, partial coverage always — the menu is heavier than glass but never a
   full-screen modal.
5. Context-alive rows (clipboard, last app) make the sheet feel inhabited — engagement
   displayed before any input.

OUR LANGUAGE: the black-dock register enters our palette as the NIGHT DOCK — near-opaque
warm-charcoal (our cream inverted, not pure #000) with the law-2 tint whisper kept, partial
islands over a live suffusion field. The condense bell routes into the goo-morph engine as a
seeded-velocity condense (single scalar, `springPreset("dock")` at ζ≥0.95 for the no-wobble
arrival); grow-with-content becomes the dock drawer's population choreography (sections as
suffusion-staggered arrivals, ~80ms steps). The scrub/commit split is already our law 15
posture — the sheet confirms it for pull-DOWN surfaces.

---

## MARK 8 — the Gemini dot matrix and its color transitions

### 8.1 Anatomy (MEASURED, full-res)

The "dots" are four-pointed SPARKLE glyphs — the Gemini spark motif tiled as a halftone
field — in a staggered lattice, pitch ≈30px (~10pt) horizontally (autocorrelation peak at 30;
row stagger ~20px), sitting BEHIND the composer band. Glyph size and brightness GRADE with
proximity to the input pill — large/bright adjacent, dissolving to nothing ~400px out: a
halftone gradient by GLYPH SIZE, not opacity alone. The field's upper boundary is a scalloped
wave, not a straight fade.

### 8.2 Emergence and the idle freeze (MEASURED)

- Bloom: the field materializes at t≈55.3 in a warm pink-red wash around the input, walks
  through violet (hue ~259 at 55.8) → indigo → BLUE, settling at hue 233 by ~57.6 (~1.5–2.3s
  of hue walk; the earliest hue samples are low-population — the pink onset is a visual read
  at 24fps, the 259→233 walk is sampled). Saturation holds ~0.44 while value settles ~0.05 —
  a dark ember field, not a glow.
- THE FREEZE: from t=57.8 to 59.4 the survey diff is 0.00 — the idle field is a STATIC
  bitmap. No breathing, no drift, no twinkle. Google parks the field; the transitions are
  event-gated. (Typing 59.5+ wakes only the text; the field stays parked until send.)

### 8.3 The send bloom and the hue sweep (MEASURED)

- Send (~60.87): composer descends 141px on a clean exponential (τ≈58ms, ~300ms, zero
  overshoot); the "Hello" bubble (dark charcoal capsule, x 840–1106+, h≈186, full-round,
  top-RIGHT) fades in S-curved over ~300ms, delayed ~150–200ms behind the keyboard drop —
  bubble AFTER furniture, the reply space cleared first.
- The field then goes FULL-SCREEN and saturates (sat 0.44→0.69, val 0.05→0.13 by 61.8) and
  the hue SWEEPS: 224° (61.2) → 217 (62.4) → 203 (62.7) → 183 (63.0) → 167 (63.3) → 152
  (63.9) → 135 (64.2) → 100 (64.5) → 73 (64.8) → 44 (65.4) → 27 (65.7). That is ~197° of
  travel in 3.6s ≈ 55°/s, monotone through blue→cyan→green→gold→amber — one direction, no
  dithering, a slow spectral rotation as the "thinking" display.
- The full-screen field is NOT the sparkle lattice: it is a laminar TOPOGRAPHIC-WAVE contour
  field (layered ridge lines, organic silhouettes) drifting slowly, brightest behind the
  header, near-black mid-screen. Two textures, two roles: sparkle-halftone = idle invitation
  around the input; wave-contours = full-screen thinking. "Assessing the Input" shimmers
  top-left from ~64.3; the "Answer now" interrupt chip fades in bottom-center ~64.4 —
  engagement affordances riding the field, not boxed above it.

DESIGN NOTES (ranked):
1. Two-texture grammar: an intimate size-graded sparkle halftone around the input at idle; a
   full-bleed slow wave field while thinking. The STATE is told by texture, the PROGRESS by
   hue.
2. The hue sweep as thinking display: monotone, single-direction, ~55°/s — slow enough to
   read as patience, fast enough to prove life.
3. Event-gated color: bloom on arrival, freeze at idle (Google's choice), bloom+sweep on
   send.
4. Affordances ride the field ("Answer now" floating IN the color, not on a bar) — the
   ambient layer stays the stage.

OUR LANGUAGE — and the one place we refuse the exemplar: the IDLE FREEZE violates the
breath-of-life edict; a glass-ui field NEVER parks (our restraint floor, codex law 11, keeps
~7.6pt/s drift + ±20% mass breathing at idle — the measured iOS ambient register — where
Gemini drops to zero). We take the two-texture grammar and the hue-sweep-as-progress: the
sparkle lattice re-derived with OUR glyph (a four-point star is Gemini's mark, not ours — we
seed the halftone with our aurora particles at the same 10pt pitch and size-gradient law),
hue driven through our cartoon-technicolor palette on the oklch wheel at ~50–60°/s while a
task runs, over our warm-cream/charcoal fields rather than dead black. The composer descent
(τ≈58ms exponential) and bubble-after-furniture ordering fold into the chat archetype's
suffusion scalars.

---

## The marks ledger

- **6a space/proportion** → header as three glass islands, prose-vs-card containment
  hierarchy, composer as the one heavy dock (93% width, r≈19pt) → MEASURED → routes to the
  chat archetype's layout tokens + law 4 radius table.
- **6b slider engagement** → composer→slider whole-body morph: nucleate-and-sweep ~250ms,
  +0.7% overshoot relax; detents Medium/High/EH at 22/53/100% fill with dot remainders;
  collapse = ≤33ms evaporation + ~85ms label flight → MEASURED → law 12 LIVE-CONFIRMED; fill
  spring into `springPreset("dock")` register.
- **6c THE GRADIENT BLUR** → annular field on the slider: σ_max≈10px, extent ±450–600px,
  Gaussian-like falloff, ZERO dimming, clock-locked to the morph (~170ms both ways) →
  MEASURED → the `--glass-halo-*` divergence gains its first wild kin; law 1(a) extended.
- **6d chat bubbles** → ChatGPT send unobserved (INCONCLUSIVE — honest); status chips
  fade-swap in place (law 17); scroll decay ~0.9s clean (BOUNDED); Gemini's send bubble is
  the measured sibling (S-curve ~300ms, delayed ~150ms).
- **6e dock facilities** → composer-dock morph + stacked status mini-dock + header fission +
  drawer snap (~80ms travel, staggered population) + app-paging carousel + close zoom
  (body 330ms, medium +250ms after) → MEASURED/BOUNDED per event → dock band vocabulary.
- **7 siri-contextual menu** → open = 5 detuned channels over ~800ms (medium leads 250ms,
  keyboard last); scrubbed-medium/commit-furniture split; commit pop ≤100ms + ~45px
  overshoot settle (BOUNDED); dismissal content-first medium-last; partial BLACK-dock at
  ~88% opacity with tint whisper; drawer morph = veil → condense bell (~120ms, peak
  ~10k px/s, no wobble) → grow-with-content (~450ms) → MEASURED → night-dock register +
  goo-morph condense + law 15/17 confirmations.
- **8 dot-matrix color** → sparkle-halftone (pitch 30px, size-graded) idle field: bloom
  pink→violet→blue walk ~2s, then FROZEN (diff 0.00); send: full-screen wave-contour field,
  hue sweep 224°→27° at ~55°/s, sat 0.44→0.69; "Answer now" riding the field → MEASURED →
  two-texture grammar + hue-as-progress adopted; the idle freeze REFUSED per the
  breath-of-life edict (law 11 keeps our floor breathing).

## Moments deserving denser bursts (not cut this pass)

1. The slider fill during detent CROSSINGS at 60fps — does the fill snap-assist near detents
   or track purely? (24fps drag reads as pure tracking; a 60fps hold-near-detent would
   decide.)
2. The siri commit overshoot owner — a dedicated panel-bottom edge tracker to isolate the
   ~45px overshoot body (currently BOUNDED).
3. The ChatGPT thread-load first frames at 60fps — whether bubbles carry any ≤80ms entrance
   stagger inside the app-open card.
4. A Gemini send with a LONG reply — whether the hue sweep rate is fixed (~55°/s) or scales
   with expected latency; and the wave-field drift velocity, unmeasured here.
5. The app-paging carousel at 60fps — card scale/parallax constants for the sideways
   app-zoom grammar.
