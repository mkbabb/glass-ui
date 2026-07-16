# Reference-media full analysis — the iOS-27 corpus, vision-verified (FAM-I)

**Analyst:** Fable reference-media fork (BI-addenda). **Method:** vision-first (read the actual
frames), ladders second. Every claim cites a frame file or a ladder line. Read-only throughout.

## The headline (read this first)

**The reference corpus is already EXHAUSTIVELY and ACCURATELY mined.** The four BI-era ladders —
`DOCK-LADDER.md`, `MOTION-LADDER.md`, `TABS-GLASS-LADDER.md`, `SUFFUSION-MAP.md` (in
`docs/tranches/BI/design/ios27-reference/`) — pixel-measured the source videos frame-by-frame,
and each explicitly OVERRIDES the earlier BD-era `IOS27-REFERENCE.md` over-claims. My vision
spot-checks (below) confirm the ladders are faithful to what the frames actually show. **The
analysis debt is paid; the "unmined residue" is genuinely small.** The value this fork adds is
therefore not new measurement — it is (1) independent vision confirmation that the ladders are
trustworthy, (2) three genuine *mints* the ladders flag as having NO house register, (3) a
gap-map of shipped/diverging/retired/unbuilt vs each target, and (4) a **media-provenance
alarm**: the most-authoritative source videos are not preserved in the repo.

---

## 1. Corpus inventory

### In-repo (durable, git-tracked)
| location | media | covers |
|---|---|---|
| `docs/tranches/BD/viz/liquid-video/` | `ANALYSIS.md` + `sheet-00..06.jpg` (7 contact sheets) + `frames/f001..f061.jpg` (61) | iOS-27 Control-Center open→settle→dismiss→re-open (the liquid ENTRANCE reference) |
| `docs/tranches/BD/viz/video-audit/v1-tabs-glass/` | `ANALYSIS.md` + 19 frames | Maps detented SHEET (mislabeled "tabs"; it is the glass-material/detent witness) |
| `docs/tranches/BD/viz/video-audit/v2-dock-a/` | `ANALYSIS.md` + 24 frames | home carousel + the minimized dock triad — the hue-bleed exemplar |
| `docs/tranches/BD/viz/video-audit/v3-dock-b/` | `ANALYSIS.md` + 76 frames | Apple-Music full drive: tab switches, scroll dock fission/merge, sheet bloom, drill-in |
| `docs/tranches/BD/viz/video-audit/v4-dotflow/` | 29 frames | the Cowork/Anthropic halftone dot-field backdrop |
| `docs/tranches/BE/prototype/visual/` | `liquid-morph-expand{,-v2}.gif`, `liquid-vh-morph.gif` | glass-ui's OWN liquid-morph prototypes (not iOS) |
| `docs/tranches/BF/audit/live-spotcheck/` | `island-*.png` (3) | glass-ui's OWN dynamic-island split renders (goo-neck spotcheck) |
| `docs/tranches/BG/audit/ios27-eyeglass-tabs/` | `strip-t1..t4.png` + `ext/` 60fps strip | Find-My eyeglass tab-pill (the loupe corpus) |
| `docs/tranches/BG/audit/visual/liquid-grid-*.png` (~24) | glass-ui's own dual-engine liquid-grid captures |
| `docs/tranches/AZ/audit/visual/W-MORPH-SHOWCASE-*.png` | glass-ui's own V↔H liquid-morph captures |

### The authoritative BI-era ladders (measured, but from OUT-OF-REPO video)
`DOCK-LADDER.md` (V1/V2 Apple-Music 60/120fps), `MOTION-LADDER.md` (videos A/B/C: Control Center,
Maps detent, notifications, Siri, Spotlight), `TABS-GLASS-LADDER.md` (Find-My eyeglass + Maps
sheet + IMG_1874), `SUFFUSION-MAP.md` (the de-dup binding map, R1–R26). These are the MOST
authoritative artifacts in the whole corpus — and their sources are `~/Downloads/New Folder With
Items 4/` (see §7 provenance alarm).

---

## 2. Per-moment frame analyses (vision-verified, recreate-grade facts)

### M-1 · Control-Center liquid ENTRANCE — `liquid-video/sheet-02.jpg` [confirmed]
The settled CC modules are translucent frosted plates over the blurred olive wallpaper: the
connectivity quad, the "Chabrier: L'étoile" mini-player with transport, the round toggle rows
(flashlight/timer/remote/battery; Shazam/mirror/hearing), the pill sliders. Dismiss (top-right →
bottom row) shows the modules **compact and fade while the home screen un-blurs to sharp** — the
scale change is subtle; **blur + fade are the dominant channels**. **This directly confirms
MOTION-LADDER §4's correction of BD-T10**: the overlay layer materializes as one blurred ghost at
~0.93–0.95 scale, NOT a pronounced 0.88 volume-preserving squish. Recreate-grade: entrance =
blur-led materialize (blur-from 6–10px, scale-from ~0.93–0.95, fade coupled), overshoot ≤2–3%;
the round controls carry the most visible small→full growth but it is gentle, not a bounce.

### M-2 · Dock minimized TRIAD — `v3-dock-b/f040.jpg` [confirmed]
The Apple-Music dock at rest in its scrolled state: **left circle (active-tab red glyph) · center
transmissive mini-player capsule ("The Sleeping Beauty · Tchaikovsky" + thumb + ▶) · right circle
(Search)**, with clear backdrop gaps reading the album grid between the three pieces. Every
silhouette is a stadium/circle (radius = height/2). The center capsule is a moderate-frost
transmissive plate — the album grid ghosts through, text stays crisp. **Confirms DOCK-LADDER §1
geometry** (triad: bud d ≈ 0.8× bar, center capsule, gaps 45–47px) and §5 optics (moderate frost,
hue-preserving, self-luminant over the varied backdrop).

### M-3 · The goo neck — glass-ui's OWN render vs the reference — `BF/island-split-mid-goo-neck.png` [finding]
glass-ui's dynamic-island split (Timer capsule ↔ "You Are (Not) Alone" music capsule) shows a
**pronounced, clearly-visible concave metaball neck** bridging the two bodies mid-split. **This is
MORE neck than the reference sustains.** DOCK-LADDER §3 (measured at 60fps) found the real iOS
waist lives **1–2 frames (17–33ms)** as a shallow lobe-bulge, then a clean gap — "a persistent
stringy bridge is fan-fiction" (C3). glass-ui's own render over-renders the neck relative to the
measured reference. **Gap-map consequence: IF fission is ever rebuilt (Q021), the goo waist must
be TIGHTENED (≤2-frame shallow bulge), not the long strand the BF prototype shows.**

### M-4 · The dot-field backdrop — `v4-dotflow/f015.jpg` [confirmed + gap]
The Cowork/Anthropic surface: a **halftone dot-field, DENSE at the edges and corners, CLEAR in a
central void behind the content column** ("What can I take off your plate?" card + input + task
list). Warm-grey dots over near-black; the field recedes behind the content. **Confirms
IOS27-REFERENCE T17 exactly**: a radial density-gradient vignette, content-deferential — NOT a
flow field. glass-ui's former `DotFlowField` was a wave-advected streamline flow (wrong gestalt),
and it is **ABSENT at HEAD** (retired viz — see §5). So this reference target has NO house
equivalent today.

### M-5 · The eyeglass loupe (not re-read; ladder trusted)
`TABS-GLASS-LADDER.md` measures the Find-My pill exhaustively (two-rest-state machine, edge-
asymmetric arrival, loupe magnification, accent-ink choreography). Given the ladder's depth and my
confirmations on M-1/M-2/M-4, I did not spend vision budget re-deriving it. The ladder is trusted;
the gap-map (§5) reflects it.

---

## 3. Ladder cross-check (frames say vs ladder claim)

| ladder claim | frames say | verdict |
|---|---|---|
| MOTION §4: CC overlay = blur+fade dominant, scale subtle ~0.93–0.95, ≤2–3% overshoot (corrects BD-T10's 0.88 squish) | sheet-02: modules compact+fade, home un-blurs; scale change subtle | **CONFIRMED** |
| DOCK §1: minimized triad = circle+capsule+circle, stadium r=h/2, gaps 45–47px, transmissive | v3 f040: exactly that | **CONFIRMED** |
| DOCK §3 / C3: real goo waist ≤2 frames, no persistent strand | BF island render shows a LONG neck (glass-ui's own over-render) | **CONFIRMED (and glass-ui diverges — the render exceeds the reference)** |
| IOS27-REF T17: dot-field = radial density-gradient vignette, dense edges/clear center, warm-grey/near-black | v4 f015: exactly that | **CONFIRMED** |
| DOCK C1: the "accent-flood on tab commit" was a red card read THROUGH the plate, not an EFFECTS wash | (not re-imaged; ladder's photometric evidence is decisive) | trusted — do NOT build `--dock-accent-flood-t` |
| DOCK C7 / MOTION C7: shipped DOCK_SPRING (0.68/ζ0.64) moved AWAY from the measured band (0.28±0.04/ζ0.82) | (FAM-H confirms codex re-tuned to 0.30/ζ0.82) | **CONFIRMED corrected in code** |

No ladder claim was contradicted by the frames. The ladders are faithful.

---

## 4. THE UNMINED RESIDUE (ranked) — what the corpus shows that the ladders/library do NOT yet capture

The residue is small because the ladders are thorough. Ranked by suffusion value:

1. **[MINT] Progressive graded sheet-edge band (SUFFUSION G3 / TABS §8-8).** The Maps sheet top
   edge is a **13–40 CSS-px progressive blur/tint ramp** (map nearly sharp in the first ~40 rec-px
   below the edge, deep frost by ~100–120). **No house register expresses this** (grep: 0). It is a
   genuine mint — a mask-graded backdrop layer, Safari-safe (never `backdrop-filter: url()`). High
   value: it is the single most distinctive "iOS glass edge" tell, and glass-ui's flat-edged
   sheets read subtly wrong without it.
2. **[REFERENCE; IMPLEMENTATION DECLINED BY V-A122] Asymmetric backdrop-blur ENGAGE register
   (SUFFUSION M8/R23).** Overlay-pull backdrop
   blur ramps **engage 50–100ms / release 250–300ms** (a 1:3 asymmetry) — the inverse of the
   surface enter:exit 3:1. The original media census found no house register. A later source census
   finds `--glass-blur-engage-t` read only by Drawer, with Dock merely named as a booked consumer in
   a comment. Control-Center-class only, one-shot, Safari-fenced (never a steady-state re-blur):
   Drawer is explicitly ineligible because it is material-constant (§G4). The ≥2-consumer floor is
   therefore unmet: preserve the measurement, remove the orphan Drawer radius drive, and mint no
   register or parallel clock.
3. **[BUILD or RATIFY] The eyeglass TWO-REST-STATE machine (TABS §1 / SUFFUSION E1).** The pill is
   NOT a static loupe: **SETTLED = inset 0.80–0.88× ink-darkened plate (no ring/specular/magnify)
   ⇄ LIVE = proud 1.07–1.18× domed loupe**, driven by **touch/motion, never backdrop sampling**,
   with an edge-asymmetric arrival (leading edge overshoots 10%/recovers ~117ms; trailing edge
   pours in ~270ms later). glass-ui ships the eyeglass LOOK (`.glass-lens` as the pill default —
   FAM-H) but **NOT the `--eyeglass-live-t` two-rest-state scalar** (grep: 0) nor the two-clock
   lead/trail release. This is the richest single "suffuse-from" target still open. It is also the
   home of the currently-unconsumed `eyeglass` spring (FAM-H H-3, Q020).
4. **[measured, feeds retune] The edge-asymmetric liquid arrival (TABS §2 / SUFFUSION R9).** Lead
   spring (~117ms recovery) + critically-damped follower (τ≈270ms) on ONE integrator — shared by
   the eyeglass release AND the pager worm. glass-ui's `INDICATOR_RELEASE_AT_ARRIVAL` single-switch
   cannot produce it. Feeds the motion band, not a standalone wave.
5. **[calibration] Deep-frost stage for the eyeglass demo (TABS §5/§8-7).** The reference tab BAR
   is deep-class (~94% contrast kill, σ≈18.3 CSS-px); the eyeglass loupe needs the frosted field to
   lens. glass-ui's calm dock 9px is a deliberate house divergence, but the eyeglass STAGE reads
   wrong without the deep register. Small calibration.

Everything else the corpus shows is either already shipped, already retired-by-ruling, or already
corrected in code (FAM-H). There is no large hidden seam.

---

## 5. Gap map (target → state → evidence → addenda verdict)

State: (a) shipped-faithful · (b) shipped-diverging · (c) retired-by-ruling · (d) never-built.

| target | state | evidence | addenda verdict |
|---|---|---|---|
| Dock morph spring (T1/D1) | **(a)** | FAM-H: codex re-tuned to 0.30/ζ0.82 (measured band) | do-not-relitigate; π-confirm at Q022 |
| Dock triad geometry (D5) | **(a)** | v3 f040 matches; `useDockSpring` ships | do-not-relitigate |
| Dock scroll-fission / goo / V↔H / Siri island (T2/T3/D3) | **(c)** | `useDockFission` ABSENT from `dock/composables` (only `useDockSpring`); FAM-H H-2 (UF-C3 Safari risk) | **Q021 ratify-or-rebuild (user-gated).** If rebuild: DOCK-LADDER §3 honest-goo bounds (waist ≤2 frames — M-3 shows glass-ui over-necks) |
| Tab/dock selection indicator = eyeglass (T4/D8) | **(b)** | `.glass-lens` pill default ships (FAM-H); `--eyeglass-live-t` scalar ABSENT (grep 0) | **the eyeglass two-rest-state wave** (residue #3) + Q020 spring wiring |
| Bloom-up + live-behind (T5) | **(a)** | engines ship; app-zoom → arrival class | do-not-relitigate; now-playing reconcile stays a demo item |
| Drawer detent glass opaque-at-full (T6/G4) | **(a)** | `--glass-drawer-t` → `--glass-level` coupling PRESENT (drawer/styles.css:10,134); `--stage-t` present | **LANDED since BD** — do-not-relitigate; π-confirm the peek/half-translucent → full-opaque at Q003 |
| Hue-bleed transmissive glass (T7/D6) | **(a)** | real `backdrop-filter` per-pixel locality (C6: a sampled dominant-hue would paint WRONG) | do-not-relitigate; keep `useGlassBackdropLuminance` luminance-only |
| Backdrop-blur ENGAGE asymmetric (T9/M8) | **(d)** | later census: one orphan Drawer reader, Dock comment only; no second eligible consumer | **DECLINED by V-A122** — remove the orphan radius drive, preserve the CC-class reference; Drawer remains fixed-radius/material-constant |
| Progressive graded sheet edge (G3) | **(d)** | grep 0 graded-edge/edge-band | **residue #1 — mint** (highest value) |
| Liquid entrance general (T10) | **(b)** | `.glass-reveal` ships; the shape correction (blur-led, ~0.93–0.95 scale) + generalization is the delta; the 0.88 grammar over-rotates scale | motion-band register calibration (blur-from 6–10px, scale-from 0.93–0.95) |
| Living backdrop / Aurora (T11) | **(a/bettered)** | Aurora real-mesh + Kuwahara superior to the reference mesh | do-not-relitigate |
| Marquee (T12), Audacious type (T15) | **(a/bettered)** | ScrollingText; φ display ladder + −1.5% tracking | do-not-relitigate |
| Dot-flow halftone-vignette backdrop (T17) | **(c)** | `dot-flow-field` component ABSENT at HEAD (user-ordered viz DELETE, TAIL reg#15 "failed 30+ attempts"); v4 f015 shows the target | **user-gated REVIVAL row** — the reference is desirable ("suffuse-from") but the viz was explicitly killed; reviving needs a ruling. NOT a silent addenda build |
| Notification capsule (T14) | **(b)** | enter should be gentle-class center-seed bloom (t90 300–375ms, 0% overshoot), not snappy; exit 100–117ms not ≤40ms | motion-band `enter-transient` register (MOTION §5/M5) |

---

## 6. Registry rows (FAM-I — for the parent's REGISTRY.md)

| id | finding | disposition |
|---|---|---|
| I-1 | Graded sheet-edge band (13–40 CSS-px progressive blur/tint ramp) has NO house register | MINT wave (residue #1); Safari-safe mask-graded layer; π born-RED on a flat-edge sheet |
| I-2 | Asymmetric backdrop-blur engage register (50–100ms / 250–300ms); later census finds one orphan Drawer-only reader | DECLINED by V-A122: remove the orphan radius drive; the ≥2-consumer floor is unmet and Drawer is not eligible under §G4 |
| I-3 | Eyeglass two-rest-state machine (`--eyeglass-live-t`, touch/motion driver, lead/trail asymmetric release) not built; only the static `.glass-lens` look ships | BUILD wave (residue #3) — folds Q020 (eyeglass spring wiring) in; the richest open suffuse-from target |
| I-4 | glass-ui's own fission goo-neck (BF spotcheck) OVER-renders vs the ≤2-frame reference waist | binds Q021: IF fission rebuilt, tighten the waist to the DOCK-LADDER §3 bound |
| I-5 | dot-flow halftone-vignette backdrop (T17) is a desirable suffuse-from target but the viz was user-DELETED | user-gated REVIVAL row on the judgment roster (Q051) — not a silent build |
| I-6 | Drawer opaque-at-full coupling (T6) has LANDED since the BD-era gap — do-not-relitigate | remove from any "open" list; π-confirm only |
| I-7 | **PROVENANCE ALARM**: the four BI ladders' source videos are in `~/Downloads/New Folder With Items 4/` — 0 preserved in-repo | see §7 — preserve to `docs/tranches/BI/design/ios27-reference/source/` (a real durability risk) |

---

## 7. PROVENANCE ALARM (durability finding)

The **most authoritative** reference artifacts — the pixel-measured `DOCK/MOTION/TABS-GLASS`
ladders — cite sources in `~/Downloads/New Folder With Items 4/` (e.g. `ScreenRecording_06-20-2026
18-47-21_1.MP4`, `...18-48-52_1.MP4`, the 06-22/06-24 videos, `IMG_1874.PNG`). **Zero
ScreenRecording source videos are preserved in the repo** (`find docs -iname 'ScreenRecording*' →
0`). The folder still exists on disk today, but it is a transient, generically-named Downloads
folder — one cleanup away from loss. If those videos vanish, the ladders' measurements can never be
re-derived or re-verified, and the reference re-examination the whole motion/dock/glass calibration
rests on becomes unfalsifiable prose. The in-repo media is only the lower-fps BD contact
sheets/frames (61 + 19+24+76+29 = 209 frames), which cannot reproduce the 60/120fps kinematic fits.

**Recommendation (a real addenda row, user-gated because it adds repo weight):** copy the source
videos (or at minimum native-rate frame strips of the measured windows) into
`docs/tranches/BI/design/ios27-reference/source/` so the ladders are re-derivable from committed
bytes alone — the same discipline the ladders' own "re-extract with the §0 ffmpeg commands"
footers assume but the repo does not currently satisfy.

---

## 8. Bottom line for the addenda

The user's "find them, analyze them, fully" order is largely **already satisfied** by the BI-era
ladders — and my vision pass confirms those ladders are trustworthy, not optimistic prose. So the
media lens does NOT spawn a large analysis band. It yields: **two builds/mints** (graded-edge-band,
eyeglass two-rest-state), **one explicit decline** (backdrop-engage until a second eligible
Control-Center-class consumer exists), **two user-gated rulings** (fission revive/ratify with a
tightened goo-neck; dot-flow halftone revival), **several do-not-relitigate confirmations** (dock
spring, triad geometry, drawer opaque-at-full, hue locality, Aurora, type, marquee), and one
**provenance-preservation row** that protects the whole calibration corpus from loss. All feed the
existing Band-3 (motion/dock) and a small new glass-material sub-band, not a fresh tranche.
