# v2-dock-a — iOS-27 Apple Music frame-by-frame audit

**Source:** 24 frames (`frames/f001..f024.jpg`), 18:48->18:49 wall-clock, ~1s span.
**Surface:** iOS 26/27 **Apple Music — Listen Now / Home**. The "dock" here is the
persistent floating Liquid-Glass **mini-player** (album-art · scrolling title ·
pause · search) pinned bottom-center, plus a Dynamic-Island **notification capsule**.
Motion content: (1) a horizontal **playlist carousel** paging with momentum, (2) the
floating mini-player **transmitting + tinting the vibrant cards behind it**, (3) the
track title **marquee-scrolling**, (4) a **notification banner** dismissing. This is
a *glass-transmission · floating-dock-persistence · momentum-scroll · marquee*
reference — the dock-morph/sub-dock content is light; the **transmissive glass +
vibrant-card backdrop + audacious type** content is heavy.

---

## Frame-by-frame ledger

### Act 1 — notification capsule dismiss (f001->f002)
- **f001:** Liquid-Glass **notification banner** (avatar + 2-line text + "now") over
  the top, transmissive — the Evangelion art reads THROUGH it, dimmed + blurred.
- **f002:** banner **GONE** in one frame (<=~40ms) — a fast fade-slide-out, exit
  no-overshoot (already fully gone by f002; a closing surface does not overshoot).

### Act 2 — playlist carousel pages with momentum (f002->f024)
Five vibrant full-bleed gradient cards with audacious 2-line display type (~70px,
tight ~1.05 leading, white): New Music (pink) -> Heavy Rotation (gold) -> Your
Essentials (violet) -> Get Up! (red) -> Chill (teal).
- **f002->f004:** pink slides left, gold enters right, lands centered by f004 —
  fast eased momentum (a fling, not linear drag); **peek** of +/-neighbours always
  ~10-15% (a card is never alone).
- **f004->f007:** gold holds (near-identical) — the fling **settles** calm; NO
  visible card-snap overshoot/bounce-back ( z~=1 overdamped, not a springy z<1).
- **f007->f012:** violet enters+holds, then red (Get Up!) enters f012.
- **f004->f006, f012->f018, f018->f024:** the card art is a **live animated
  mesh-gradient** — the gold amber-bands drift, the red plume re-forms, the teal
  bloom breathes frame-to-frame (an aurora-class living backdrop, not a JPEG).
- **f018->f024:** Chill (teal) lands centered + holds, its green bloom breathing.

### Act 3 — floating mini-player dock (persistent, ALL frames)
- The capsule is pinned bottom-center across **every frame** — NEVER scrolls with
  the carousel, NEVER collapses (the persistent floating-dock register).
- **Transmission (headline):** transmissive Liquid Glass — the vibrant cards +
  Stations row behind read THROUGH it, blurred + tinted; the tint **tracks** the
  backdrop (picks up purple from the violet card, shifts as cards pass). The pause +
  search controls sit on lighter inset glass pucks — **nested glass-on-glass**
  (a control tier above the capsule plate).
- **Marquee (f013->f024):** the title scrolls left at constant velocity — "Daphnis
  Et Chloe" (f013) -> "...Danse..." (f015) -> "Danse Religieuse" (f020) ->
  "Religieuse - Modere / ...onic, Pierre Boulez" (f024). Linear ~constant px/frame,
  NOT spring-eased (a ticker reads at constant speed — correctly the one non-spring
  motion in the clip).
- album-art thumb + pause glyph + search puck are static; no control-state anim.

### NOT in this clip (honest scoping)
No dock collapse/expand, no V<->H morph, no sub-dock goo-fission, no tab-indicator
slide, no album-art fade-swap, no contextual section change. The dock is
form-invariant — one persistent transmissive media capsule. Binding comparisons:
transmissive glass fidelity · vibrant living-backdrop · floating-persistent-dock ·
nested glass-on-glass · audacious card type · momentum carousel · marquee ·
notification-capsule entrance/exit.

---

## glass-ui CURRENT vs reference — gap ledger

### G1 — Transmissive glass over a LIVE vibrant backdrop (HEADLINE)
**Reference:** vibrant card colors bleed through the capsule, blurred + saturated,
and the tint **tracks** the backdrop hue (purple->neutral as the violet card leaves).
**glass-ui CURRENT:** machinery EXISTS + strong — `--glass-blur-dock` (blur(9px)) +
`--glass-saturate-*` + W-DARK-MATERIAL's `saturate(1.22-1.35) brightness(1.06-1.18)`
luminosity-lift (backdrop glows through in dark), `backdrop-filter` on every tier,
and `useGlassBackdropLuminance` — the sampled observer writing `--glass-backdrop`/
`--glass-backdrop-luma` for the dock so the plate darkens/lifts to track a live
aurora (wired ON for the dock by default). Transmission + dynamic-tracking is near
parity in principle.
**GAP (real):** (a) the dock blur is the *calm* 9px; the reference media capsule
reads **deeper** (Apple 20px-class). `.glass-deep` (16px/sat 1.5) exists but the
**dock does not opt in** — a media dock over vibrant art is exactly the deep case.
(b) the observer reads **luminance only**, NOT **chroma/hue** — so the dock darkens
over a bright card but does NOT pick up the card's HUE the way the reference goes
purple/teal. The hue-tracking transmission is a chroma sample the observer omits.
**WAVE -> propose BD.W-DOCK-DEEP-TRANSMIT:** (i) the floating media-dock opts into
`.glass-deep` (or a `--glass-blur-dock` lift into the 14-20px band for the media
variant); (ii) extend `useGlassBackdropLuminance` to sample a **dominant-hue** term
feeding a bounded `--glass-accent`/`--glass-accent-strength` (BB.W-GLASS-ACCENT
already exists — wire the *sampled* hue into the rim+core so the dock bleeds the
backdrop hue). Reuses W-GLASS-ACCENT + the observer; no new compositing seam.

### G2 — Nested glass-on-glass (control pucks)
**Reference:** pause + search on lighter inset glass pucks ON the capsule — a clean
two-tier stack.
**glass-ui CURRENT:** the tier ladder supports it (`--glass-bg-floating` puck on a
`--glass-bg-dock` plate); `DockIconButton` carries the control register + `vSpecular`.
**GAP:** small — verify the media-dock control pucks compose the **element-level
oklab tint** (not the pre-baked `--glass-bg-dock`) so the puck reads forward over a
vibrant backdrop (the W-BUTTON-GLASS `--glass-bg-floating-tinted` precedent).
**WAVE:** folds into BD.W-DOCK-DEEP-TRANSMIT.

### G3 — Living vibrant card backdrop (animated mesh-gradient)
**Reference:** each card is a live animated mesh-gradient (drifting/breathing).
**glass-ui CURRENT:** `<Aurora>` is the living-gradient engine (real fluid mesh +
the `breathing` register made perceptible at BA-VJS-2) — present and arguably
*better*. **GAP:** no calm per-card "living artwork" preset (one-GL-per-route budget
means N live cards isn't free; the reference uses a cheap CSS/static-mesh living
gradient per card). **WAVE -> propose BD.W-LIVING-ARTWORK (LOW):** a compositor-only
CSS-conic/mesh "living artwork" card backdrop (the `auroraFallbackGround` static
mesh generalized to a slow PRM-static drift) so a card grid reads living without N
GL contexts. Content-surface affordance, not a dock concern.

### G4 — Floating-persistent media-dock register
**Reference:** a floating capsule detached from the edge, pinned bottom-center,
persistent through all scroll, with peek margins.
**glass-ui CURRENT:** `GlassDock`/`BottomDock` + `alwaysExpanded` exist. The
**floating-media-capsule** shape (album-art + marquee title + transport — a *media*
dock not a *nav* dock) is NOT a first-class register; it'd be hand-composed.
**GAP:** medium — no canonical "now-playing floating media capsule" demo/preset.
**WAVE -> propose BD.W-MEDIA-DOCK:** a `demo/stories` composition (NOT a new
component — composes `GlassDock` + `ScrollingText` + `DockIconButton` + album-art
slot) demonstrating the persistent transmissive media capsule; feeds the
`proof:ba-gestalt` dock verdict.

### G5 — Marquee (now-playing title scroll)
**Reference:** title scrolls left at constant velocity.
**glass-ui CURRENT:** `<ScrollingText>` IS the overflow-marquee primitive.
**GAP: NONE — at parity.** Wire it in the G4 media-dock. The linear constant-velocity
is correct (do NOT spring-ease a ticker — a marquee is steady-state EFFECTS-class,
not a spatial arrival; the one sanctioned non-spring motion).

### G6 — Carousel momentum + snap + peek
**Reference:** flings with momentum, snaps card-to-card with a calm z~=1 settle (NO
springy bounce on the *card snap*), and shows peek margins (+/-neighbours visible).
**glass-ui CURRENT:** `/carousel` (embla) provides momentum + snap; `PagerDots`.
**GAP:** verify (a) the snap is **calm-overdamped**, not bouncy — the reference card
snap is NOT springy (Apple reserves the bouncy spring for *open/morph*, not
*carousel snap*; an over-springy carousel reads cheap). The "liquid-weight universal"
note pushes bounce everywhere, but THIS reference shows the carousel snap is
calm — momentum YES, snap-bounce NO on a content carousel. (b) peek margins set so
neighbours show. **WAVE -> BD.W-CAROUSEL-CADENCE (audit):** likely a no-op if embla
snap is already calm; RED->GREEN only if the demo over-springs the snap.

### G7 — Notification capsule entrance/exit
**Reference:** transmissive banner appears + dismisses with a fast fade-slide (exit
no-overshoot, <=2-frame).
**glass-ui CURRENT:** `Toast`/`Notification` + `.glass-reveal` (scale+fade+blur-settle
bloom, snappy spring; exit `--ease-out` no-overshoot) + W-FEEDBACK-TONE colored-glass.
Entrance/exit grammar **at parity** (`.glass-reveal` IS the iOS-27 materialize).
**GAP:** verify the toast default composes `surface="glass"` (transmissive) over a
vibrant backdrop, not an opaque plate — W-SURFACE-AXIS + W-FEEDBACK-TONE route it.
Likely at parity; confirm in the `proof:ba-gestalt` feedback verdict.

### G8 — Audacious card display type
**Reference:** audacious 2-line display (~70px, tight ~1.05 leading, white).
**glass-ui CURRENT:** the sqrt-phi display ladder + BB.W-DISPLAY-TRACKING (-1.5%
Apple tracking + 1.05 leading). **GAP: NONE — at parity or bettered.**

---

## Priority summary

| # | Gap | Severity | Wave |
|---|-----|----------|------|
| G1 | Dock blur calm-9px not deep; observer tracks L not HUE -> no backdrop-hue bleed | **HIGH** | BD.W-DOCK-DEEP-TRANSMIT (new) |
| G2 | Media-dock control pucks need element-level tint (nested glass over vibrant) | MED | folds into G1 |
| G4 | No first-class floating media-capsule register/demo (art+marquee+transport) | MED | BD.W-MEDIA-DOCK (new demo) |
| G6 | Verify carousel snap calm-overdamped + peek (NOT over-springy) | MED | BD.W-CAROUSEL-CADENCE (audit) |
| G3 | No calm CSS "living artwork" per-card backdrop preset | LOW | BD.W-LIVING-ARTWORK (new, low) |
| G5/G7/G8 | Marquee · notification bloom · audacious type | **PARITY** | verify in ba-gestalt |

**At parity / bettered:** marquee (`ScrollingText`), audacious type (display ladder +
W-DISPLAY-TRACKING), notification bloom (`.glass-reveal`), transmission machinery
(backdrop-filter + saturate + dynamic luminance observer), living-gradient engine
(Aurora, superior).

**The one true HIGH gap:** the dock's transmission is **luminance-only + calm-blur**.
The reference's signature is **deep transmissive glass that picks up the backdrop
HUE** (purple/teal bleed). glass-ui has every piece — `.glass-deep`, the luminance
observer, the `--glass-accent` per-instance chromatic-rim axis — but they are NOT
wired together for the floating media-dock: the observer must also sample a
dominant-hue term feeding a bounded `--glass-accent`, and the media-dock must opt
into the deep blur tier. BD.W-DOCK-DEEP-TRANSMIT is the single change that moves the
dock from "transmissive in principle" to "iOS-27 hue-bleeding liquid glass" — fully
aligned with, and via the real-mesh Aurora engine arguably bettering, the reference.
