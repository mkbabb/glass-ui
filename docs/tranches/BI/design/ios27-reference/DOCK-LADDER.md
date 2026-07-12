# DOCK-LADDER — the iOS-27 dock, measured frame-by-frame (A-DOCK, BI reference re-examination)

**Analyst charter:** the dock facilities in depth — morph kinematics (the G8 spring-band question), goo
fission/merge geometry, glass optics (translucency · rim · hue bleed T7 · nested glass T8), interruption,
press states. Priors re-verified, deepened, and CORRECTED — several BD-era claims do not survive pixel
measurement.

**Sources (read-only corpus, `~/Downloads/New Folder With Items 4/`):**

| id | file | format | content |
|---|---|---|---|
| V1 | `ScreenRecording_06-20-2026 18-47-21_1.MP4` | 1206×2622 @ **60fps**, 38.24s | Apple Music full drive: tab switches, scroll-driven dock fission/merge ×N, sheet bloom, drill-in, Control Center |
| V2 | `ScreenRecording_06-20-2026 18-48-52_1.MP4` | 1206×2622 @ **120fps**, 11.97s | Home carousel + the dock in its MINIMIZED triad the whole clip — the hue-bleed exemplar |

**Method.** 60fps dock-band strips (`ffmpeg -ss <t> -t <dur> -i V1 -vf "crop=1206:500:0:2122,fps=60"`);
frame `f-NNNN` ⇒ wall time `t = t_ss + N/60`. Two strips used throughout: **FIS** (`-ss 10.0 -t 6.0`,
360 frames, contains one full merge + one full fission) and **TAB** (`-ss 0.4 -t 4.2`, 252 frames, four
tab switches; frame `t-NNNN` ⇒ `t = 0.4 + N/60`). Kinematics = weighted-centroid tracking of the
saturated-crimson Library glyph (`R − (G+B)/2 > 110`, largest 1-D cluster) — a free unsaturated tracker,
no endpoint compression (unlike the eyeglass-corpus cyan tracker). Optics = patch means/std + 1px scans.
All coordinates are dock-band crop px (add 2122 for full-frame y). Confidence tags: [H] direct pixel
measurement · [M] tracked with stated bias · [L] qualitative.

---

## §1 The dock's two topological states + geometry [H]

The Apple-Music dock is **two stacked floating capsules** (mini-player above, 5-tab bar below) that
scroll-minimize into **one row of three floating pieces**. Both states measured at rest:

**UNIFIED (rest, top-of-page)** — `ref` frames t=1.0 / FIS f-0220:

| element | x span | y span (crop) | size | notes |
|---|---|---|---|---|
| tab BAR | 51..1153 | 248..438 | **1102 × 190** | stadium (r = h/2 = 95); side margins ~52px; bottom margin to screen edge ~62px |
| mini-player | 62..1142 | ~81..226 | **1080 × ~135** | stadium; gap to bar top ≈ 22px |
| tab slots | centers ≈ 190 / 396 / 602 / 810 / 1016 | | pitch ≈ **206px** (= 68.7pt @3x — far above the 44pt floor) | glyph + label per slot |
| selection lens (rest) | Search: ≈ 905..1140 | ≈ flush with bar | ≈ **235 × ~180** | ≈ 1.14× slot pitch wide; flush-to-slightly-proud (see §4) |

**MINIMIZED TRIAD (rest, scrolled)** — `ref` dockband-12.0 / FIS f-0260; V2 rides this state its whole
duration (with Home as the left bud):

| piece | x span | size | content |
|---|---|---|---|
| left circle | 85..238 | **d ≈ 153** (= 0.80× bar height; 51pt) | the **ACTIVE TAB's** glyph (red Library here; Home in V2) |
| center capsule | 285..930 | **645 × ~137** | mini-player: thumb + truncated title + ▶ (skip-forward DROPPED) |
| right circle | 975..1128 | d ≈ 153 | Search glyph — the persistent affordance |
| gaps | 238→285, 930→975 | **45–47px** | clear backdrop reads between pieces |

Both states sit on the SAME dock row (bar center y ≈ 343 crop / 2465 full); minimizing frees the entire
mini-player row (~250px of content reclaim). The whole register is capsule-geometry: every silhouette is
a stadium or circle, radius = height/2, no squarish rounding anywhere.

**State machine [H]:** scroll-DOWN (content up, ≥ ~4px/frame sustained) → fission ~2–3 frames after
sustained scroll onset (FIS f-0231 scroll start → f-0233 departure). Scroll-UP → merge. The trigger is
direction + tiny velocity, not distance-accumulated (a gentle 240px/s scroll fires it). Route drill-in
does NOT change the dock (§7-C4).

---

## §2 Morph kinematics — the fission/merge spring, measured (the G8 answer)

The Library glyph travels bar-slot ↔ left-circle (~650px) in both directions. Full per-frame
trajectories (glyph centroid x, crop px):

**FISSION** (departure f-0233, t=13.88s): 790 → 715 → 565 → 475 → 396 → 328 → 274 → 233 → 202 → 180 →
166 → 157 → 151.4 → 149.0 → **148.4 (f-0247, min)** → recovers → 155.4 settled (f-0256+).

**MERGE** (departure f-0140, t=12.33s): 159.5 → 200 → 291 → 406 → 499 → 583 → 650 → 681 → 747 → 777 →
796 → 809 → 814 → 818 → **819.0 (f-0154, peak)** → decays → 809.7 settled (f-0165+).

| metric | FISSION | MERGE |
|---|---|---|
| travel | 646px leftward | 650px rightward |
| 90% of travel | ~7 fr ≈ **117ms** | ~8 fr ≈ **133ms** |
| first crossing of rest | 11 fr ≈ **183ms** | 10 fr ≈ **167ms** |
| **overshoot** | 7.0px = **1.1%** of travel (f-0247–49) | 9.3px = **1.4%** (f-0154) |
| overshoot recovery | ~10 fr ≈ 170ms | ~12 fr ≈ 200ms |
| settle to ±2px | ~23 fr ≈ **383ms** | ~25 fr ≈ **417ms** |
| peak velocity | ~150px/fr = **9.0px/ms** at ~2 fr in | ~114px/fr = 6.9px/ms at ~3 fr in |
| damped-spring LSQ fit (zero-v step) | response **0.23s**, ζ **0.92** (rmse 6.3px) | response **0.27s**, ζ **0.82** (rmse 5.6px) |

Direct overshoot → ζ cross-check (zero-v step: overshoot = e^(−πζ/√(1−ζ²))): 1.1% → ζ≈0.82;
1.4% → ζ≈0.80. Fit + overshoot converge:

> **The measured iOS-27 dock-morph spring: response ≈ 0.25–0.32s, ζ ≈ 0.80–0.90.** [M→H]

**The G8 verdict (binding for D-DOCK):** the real thing sits **squarely in the candidate band
(0.3 / ζ 0.8)** — decisively NOT the shipped `DOCK_SPRING` (response 0.68 / ζ 0.64, +7.3% overshoot,
~0.66s envelope settle). The shipped tune is ~2.3× slower with ~6× the overshoot of the reference it
cites ("the 'MORPH MORE on move' reference" — the reference does not do that). It also independently
reproduces the eyeglass-corpus tab-lens fit (response 0.32–0.40 / ζ 0.65–0.85) and the WWDC control band
(0.25–0.35 / 0.75–0.85) named in the D-DOCK PASS-1 prior-art. Three independent measurements, one band.
The "weight" in the reference is carried by the ~150–200ms overshoot-recovery TAIL and the goo
deformation — not by a slow travel. If the liquid-weight edict wants more visible squish, add it in the
deformation channel, never the clock.

Both directions carry the small overshoot — the collapse leg is NOT a no-overshoot exit (it lands ~1%
past and eases back; motion-canon P2's "exit never overshoots" applies to *disappearing* surfaces, not to
this box morph, which is bidirectional-symmetric).

**Concurrent legs + stagger [M]:** the bar carve starts first (f-0233); the mini-player departs its top
row ~3–4 frames (~50–66ms) later (f-0236–37); all legs land together (~f-0247–50). The mini's legs:
translate-Y ≈ 208px down + width 1080→645 over ~12–14 fr (~200–230ms); its y-arrival overshoots ~6px
(~3%) past the seat and recovers [M] — the same spring family drives every leg. On merge the legs run
essentially concurrent (glyph + rise both depart f-0140-41). Total gestalt both directions:
**~350–420ms from first motion to full rest** — brisk arrival, soft landing.

---

## §3 The goo — what the fission/merge deformation ACTUALLY is [H]

The BD prior ("stretching glass necks thin to a metaball waist then snap") overstates the neck. At 60fps:

**Fission (f-0233→0237, ~4 frames of deformation):**
1. **f-0233:** bar intact; the Search glyph shows a positional DOUBLE-EXPOSURE ghost (~44px apart) — the
   content crossfade starts before the silhouette splits.
2. **f-0234:** the ONE waist frame — the search-end lobe bulges (rounder, its top edge rising), a shallow
   CONCAVE crease forms between the Library plate and the search lobe. The waist is a ~10–15% inset per
   edge — never a thin thread.
3. **f-0235:** already fully separated — ~140px clear gap, no visible strand. The "neck" lifetime is
   **1–2 frames (17–33ms)**.
4. f-0235→0244: the left piece is a long stadium CONTRACTING into the active-tab circle (right edge
   sweeps ~790→238) with the dissolving Home/New/Radio glyphs riding INSIDE it as fading blur-ghosts;
   the search stadium rounds into its circle almost in place (the bar peels away from it).

**Merge (f-0145→0148):**
1. **f-0145:** the CONTACT frame — the re-forming bar meets the search stadium with a visible concave
   MENISCUS fillet at the crowns (a real metaball-union read, again ~1–2 frames).
2. f-0146–0148: fused; the arriving left-circle remains visible as a darker disc INSIDE the bar for
   ~2–3 frames; the traveling RED glyph and the seated slot's WHITE glyph coexist as a crossfade pair
   (f-0147–48) — the glyph handoff is **dual-instance crossfade**, not one continuously-reparented node.
   Labels rematerialize by f-0147–52 (blur-dissolve in, ~100ms).

**The honest goo spec:** lobe-bulge → shallow waist (≤2 frames) → clean separation; contact-fillet
(≤2 frames) → absorb-with-interior-ghost. Content = double-exposure crossfades gated to the silhouette.
Nothing ever stretches into a taffy thread; there is no long-lived neck to render. A goo filter that
shows a fused waist for ~2 frames at 60fps and then clean capsules is FAITHFUL; a persistent stringy
bridge is fan-fiction.

---

## §4 The traveling selection lens — the tab indicator is an EYEGLASS [H]

V1 confirms and extends the BG eyeglass-corpus findings on a second app (Music, red accent):

- **The lens slides continuously** between slots (mid-travel captured at t=1.0 full-frame ref and TAB
  t-0167); 1-slot commit ≈ 5–8 frames to cover the target (~83–133ms), depart→settle ≈ 200ms — the same
  spring family as §2. Corroborates the eyeglass prior's response 0.32–0.40 / ζ 0.65–0.85.
- **Mid-travel the lens swells rounder and slightly proud:** ~250px diameter ≈ 1.21× slot pitch, height
  ~195px vs bar 190 (proud ~+20px above the bar top at peak, biased upward). At rest it relaxes to
  ~235px wide, flush-to-slightly-proud. (Find-My's rest pill measured 1.14× proud — proudness is an
  app/tuning axis; Music runs flusher at rest, swells in flight.) [M]
- **Chromatic dispersion at the rim in flight** (t=1.0 lens: clear green/magenta fringing top + bottom;
  TAB t-0167: tab labels visibly DISPLACED/bent around the rim — "Lib**ary**"/"Se**ch**"). The refraction
  is edge-concentrated; the interior is near-unity. [H]
- **THE ACCENT MECHANISM — a rim-gated wipe, not a timed crossfade** (TAB t-0033/t-0036, the money
  frames): as the lens sweeps onto the New tab, the glyph pixels INSIDE the lens rim are already
  accent-RED while the pixels OUTSIDE the rim are still white — the boundary is the rim arc itself,
  per-pixel. The ink transfer is spatially gated by the traveling lens ("ink through the lens is
  accent"). The old tab's red fades over ~4–5 frames as the lens leaves it. [H]
- **The "icon scale-pop ~1.15×" of the BD prior is (mostly) LENS MAGNIFICATION:** in t-0033/36 the
  inside-lens half of the glyph is visibly magnified/displaced while the outside half is not — the pop
  the prior saw is the loupe transiting the glyph, strongest at the rim (edge-displacement), relaxing to
  ~unity as the lens centers. No evidence of an independent per-glyph transform. [M]
- **The lens is CLEAR glass on a FROSTED bar** (measured §5): over the flat red card the lens interior
  reads L 84.8 ≈ the unobscured backdrop (84.5) while the surrounding bar plate reads 110.5 (+31% frost
  lift) — the selected lens is a window of near-unity transmission punched through the frost, plus rim
  refraction. "Selected = the clearest glass on the bar." [H]

---

## §5 Glass optics — transmission, hue bleed (T7), rim, lighting [H]

**Transmission table** (patch means; backdrop → through-plate):

| backdrop | unobscured RGB / L | through plate RGB / L | read |
|---|---|---|---|
| saturated red card (TAB t-0190) | (251, 4, 62) / 84.5 | bar (250, 42, 97) / 110.5 · mini (250, 37, 98) / 107.6 | **hue preserved exactly** (R stays 250), +31% luma, mild whitening; bar ≡ mini (one material) |
| violet card (V2, 120fps) | (68, 20, 95) / 38 | capsule (160, 117, 176) / 137 | hue 278°→283° (Δ5°), luma ×3.6 lift, sat 0.79→0.33 |
| pale-yellow cover (FIS f-0220) | L 179 | L 147 | bright backdrops DARKEN −18% |
| brown painting (f-0220) | L 80 | L 110.5 | +38% lift |
| dark photo (t-0190) | L 29 | L 58 | ~2× lift; texture std 32.3→8.6 (**−73% contrast kill**) |
| near-black (f-0260) | ~0–5 | 39–67 | the plate's self-luminance floor over black |

The plate pulls every backdrop toward a mid-luma band (~L 58–147) while **preserving hue** — blur +
saturate + a shadow-lifting luminosity curve, near-zero own tint. It is decisively NOT a dark slab: over
black it self-reads only L≈40–66.

**HUE BLEED IS PER-PIXEL LOCAL — the headline optics fact.** V2 (t≈5.0, `crop 1206x400+0+2100`): the
center capsule spans the red card and the blue card simultaneously and reads **pink on its left half and
violet on its right half**, the boundary tracking the cards' seam THROUGH the plate; the home circle
reads red, the search circle blue. A plate tinted by any single sampled "dominant hue" cannot produce
this frame. The bleed is local optical transmission (real `backdrop-filter`), so its "tracking" of a
moving backdrop is frame-exact by construction. [H]

**Rim profile** (1px scans): over bright backdrops a **1–2px dark refractive outline** (−28% vs
backdrop; f-0220 x=1000: 126→91) with a faint inner recovery, and on the minimized capsule crown a
**1px dark notch + 1–2px bright specular arc** (f-0260 x=500: 227→127→192→interior). Bottom edge: a soft
~6px shadow notch (−11%). Over near-black the edge is a bare 2–3px alpha step — the rim machinery is
backdrop-adaptive, a whisper by default. [H]

**Lighting gradient:** the capsule interior over black runs L 68 (top) → 39 (bottom), ≈ −43% top-to-bottom
— the specular-top/shadow-base "resting on glass" read, present at rest with zero motion. [H]

**Blur depth:** ghost text through the dock plate stays word-readable (−73% texture kill) vs the Find-My
tab bar's −94% (eyeglass prior §2f). The dock plate blur is MODERATE (est. 8–14px at 1206px ≈ 3–5pt),
not the deepest register; the deep near-unreadable frost belongs to overlay surfaces (Control Center)
and denser tab bars. [M]

**Nested glass-on-glass (T8), corrected:** in the dock band the only true glass-ON-glass is the
**selection lens riding the bar plate** (clear-on-frost, §4). The V2 "pause + search pucks" of the BD
prior are respectively a bare glyph ON the capsule (no puck plate) and a SEPARATE sibling circle — not
nested tiers. [H]

---

## §6 Interruption · press · content adaptation

- **Interruption: NOT WITNESSED.** Every fission/merge in the corpus runs to completion; scroll reversals
  fall between morphs, never mid-flight. No measurable claim possible — the interruptible velocity-carry
  contract stays a platform requirement argued from the spring model (an `SpringProgress` re-seat), not
  from these pixels. [—]
- **Press: no distinct touch-down state resolves at 60fps.** Frames immediately before a commit
  (t-0028..0031) show no darken/scale on the target tab; the first visible response is the lens departure
  itself. If iOS paints a pressed tint here it lives under ~50ms or under the finger. The press-darken
  register (`--dock-control-press-bg`) is therefore NOT reference-mandated on tab commit; do not let a
  slow press animation delay the lens. [M]
- **Content adaptation during minimize [H]:** title truncates to the narrower capsule; the skip-forward
  glyph FADES OUT mid-descent (f-0240–44) leaving thumb + title + ▶; labels drop to glyph-only in the
  buds. Content legs ride the same clock as the silhouette (no lagging second timeline).

---

## §7 Prior corrections (BD-era claims vs. pixels)

| # | prior claim (IOS27-REFERENCE.md / v2/v3 ANALYSIS.md) | verdict | corrected finding |
|---|---|---|---|
| C1 | T4/v3-B: "momentary **accent-flood** — the dock plate flushes crimson on commit, then clears" (f006) | **WRONG — retire** | The crimson is the Search page's red *Apple Music Radio* card arriving BEHIND the dock, read THROUGH the transmissive plate (TAB t-0167/t-0190: "Apple Music" text legible through the plate; the "flood" persists ~46+ frames because the card stays). It is T7 transmission, not an EFFECTS wash. **Do not build `--dock-accent-flood-t`.** |
| C2 | T4/v3-B: "per-tab **icon scale-pop ~1.15×** on activation + label cross-fade" | **REVISED** | The pop is the LENS transiting the glyph (magnification + rim displacement, §4); the ink swap is a **rim-gated spatial wipe**, not a timed cross-fade (t-0033/36). Labels do cross-fade on fission/merge (~5 fr). |
| C3 | T2/v3-D: "fragments **bridged by stretching glass necks** … metaball waist thins then snaps" | **OVERSTATED** | The fused waist lives **1–2 frames (17–33ms)**; separation is lobe-bulge → shallow waist → clean gap; merge is a 1–2-frame contact-fillet then absorb (§3). No long-lived stretching neck exists at 60fps. |
| C4 | T3: "drill-in buds a back-capsule; route changes the dock silhouette — the dock recomposes per context" | **REVISED** | Drill-in (Library→Albums→Giselle, t≈27–31s) leaves the dock UNIFIED and untouched; the back-capsule is a top-of-screen HEADER affordance. The dock's only witnessed recomposition axis is scroll-minimize (§1). Context enters as *which tab is the left bud*. |
| C5 | T8/v2-G2: "pause + search sit on lighter inset glass pucks — nested glass-on-glass" | **REVISED** | Search is a SEPARATE sibling circle; pause is a bare glyph on the capsule. The real nested tier is the selection LENS on the frosted bar (clear-on-frost, §4/§5). |
| C6 | T7/v2-G1: dock should "sample a **dominant-hue** term feeding a bounded `--glass-accent`" (BD.W-DOCK-DEEP-TRANSMIT arm ii) | **REVISED** | The bleed is **per-pixel local** (the two-tone capsule, §5) — a single sampled hue cannot reproduce it and would paint a visibly WRONG plate on any two-color backdrop. Locality comes free with real `backdrop-filter`; keep the sampled observer for LUMINANCE legibility only. A hue term is defensible only as a subtle RIM refinement, never the plate body. |
| C7 | T1: "DOCK_SPRING {0.32, ζ0.7} … none structural — the engine matches the reference feel"; later BD.W-ANIM-IOS27-TUNE retuned to (0.68, ζ0.64) citing this reference | **CORRECTED with numbers** | Measured reference: response 0.25–0.32s, ζ 0.80–0.90, overshoot 1.1–1.4%, full settle ≤ ~420ms (§2). The BD retune moved AWAY from the reference it cited. The original 0.32/0.7 was close; the candidate 0.3/0.8 is closer still. |
| C8 | v3-D: split composition "= [Library●][◀player▶][●Search]" | **REFINED** | The left bud is the **active tab**, whatever it is (Home in V2, Library in V1) — the mapping is active-tab-persists + search-persists + mini-descends, middle tabs dissolve into the contracting piece. |
| C9 | eyeglass prior (BG corpus): proud pill 1.14×, response 0.32–0.40/ζ 0.65–0.85 | **CORROBORATED, one nuance** | Music's lens rests flusher (~flush → +3%) and swells proud mid-travel; kinematics band reproduced independently (§2, §4). Proudness is a per-surface tuning knob, not a fixed constant. |

---

## §8 Library bindings (what these numbers touch)

- **`SPRING_PRESETS.dock` (src/composables/motion/springPresets.ts)** — G8: the shipped (0.68, ζ0.64,
  +7.3%) is refuted by its own cited reference; the measured band is **(response ≈ 0.28±0.04, ζ ≈
  0.82±0.06, overshoot 1–3%)**. The A/B capture pair remains the decision instrument (PASS-2 standing
  item 1), but the reference side of the A/B is now a NUMBER, not a vibe. Note `snappy` (0.48/0.74) is
  also slower than the measured dock morph.
- **Weight lives in deformation, not the clock:** the liquid-weight edict is served by the §3 goo
  (lobe-bulge, waist, contact-fillet, interior ghosts) + the 150–200ms overshoot-recovery tail — layered
  over a brisk ~0.3s spring. Slowing the spring to fake weight contradicts the reference.
- **`useDockFission` / `DOCK_SPLIT_SIGNATURES.media`** — the lateral transport-anchored shape is
  confirmed (C8 refines the piece mapping). The neck spec (§3) bounds the goo filter: waist visible ≤2
  frames, no persistent strands; content = double-exposure crossfade gated to the silhouette; dual-glyph
  handoff. PRM ⇒ instant topology swap stays correct.
- **`BD.W-DOCK-TAB-INDICATOR`'s accent-flood leg** — retire unbuilt (C1). The indicator leg that IS
  reference-true: the traveling clear lens with rim-gated ink transfer (§4), i.e. the eyeglass-tabs wave
  (UF-H1) applied to the dock tab row; the accent-ink wipe wants a lens-mask seam, not an opacity timer.
- **`BD.W-DOCK-DEEP-TRANSMIT`** — arm (i) (deeper blur on the media capsule) is directionally supported
  but bounded: the dock plate is the MODERATE frost (−73% texture kill, ghosts readable), not the deepest
  register (§5). Arm (ii) (sampled dominant-hue accent) is corrected by C6: per-pixel transmission is the
  mechanism; glass-ui's real `backdrop-filter` already has locality — protect it (never rasterize the
  plate to a sampled tint), keep `useGlassBackdropLuminance` on the luminance/legibility axis.
- **Geometry tokens (the D-DOCK greenfield spine):** bar 1102×190 @1206 (margins 52/62px, stadium
  r=h/2); slot pitch 206px (68.7pt); triad circles d≈153 (0.8× bar height, 51pt ≥ 44pt floor); capsule
  645×137; inter-piece gaps 45–47px; mini↔bar gap 22px; minimize reclaims the whole mini row (~250px).
  Lens ≈ 1.14–1.21× pitch, swells rounder + slightly proud in flight.
- **Optics tokens:** hue-preserving transmission (Δhue ≤ 5°), mid-luma pull (dark ×2–3.6 lift, bright
  −18%), self-luminance over black L≈40–66, 1–2px dark outline + 1–2px inner specular arc
  (backdrop-adaptive), −43% top-to-bottom interior lighting gradient, moderate blur. The selected lens =
  near-unity clear window on the frost (its OWN optic, distinct from the bar's).
- **Press:** no reference mandate for a visible pre-commit press state on dock tabs at 60fps (§6) — the
  lens departure IS the feedback; keep `--dock-control-press-bg` subtle and never serialized before the
  travel.

## §9 Open unknowns

1. **Interruption behavior** (mid-morph scroll reversal) — not exercised anywhere in the corpus; the
   velocity-carry contract remains model-argued, unverified against iOS.
2. **Fission trigger precision** — direction + low velocity threshold observed (~4px/frame sustained,
   ~2–3-frame latency); the exact threshold/hysteresis and whether it is velocity- or displacement-gated
   is unresolved.
3. **Sub-60fps press tint** — a <50ms touch-down state could hide between frames (and under the finger).
4. **Lens proudness at rest** varies across apps (Find-My 1.14× vs Music ≈ flush) — which is the system
   default vs per-app tuning is unknowable from two apps.
5. **The mini-player width/height mid-flight deformation** (does the capsule bow/squish beyond its
   width-shrink?) — the edge tracker was confounded by backdrop seams; graded qualitative only
   (no visible ballooning; slight rounding).
6. **V2 flip-lag** — the sampled 120fps window had a static backdrop patch behind the capsule; per-pixel
   locality (§5) makes zero-lag true by construction, but a direct moving-backdrop trace was not captured.

*Scratch artifacts (session-scoped, re-derivable): strips + trackers under
`/private/tmp/claude-504/…/scratchpad/ios27-frames/a-dock/` — `track2.py` (glyph kinematics),
`fit_spring.py` (spring fits), `optics.py`/`optics2.py` (transmission/rim), `geometry.py`,
`hue_track.py`. Every number above carries its frame ref; re-extract with the §0 ffmpeg commands.*
