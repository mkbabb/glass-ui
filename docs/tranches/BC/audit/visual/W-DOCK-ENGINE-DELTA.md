# BC.W-DOCK-ENGINE — DELTA (the buttery morph, LIVE-verified)

**Binding paint proof:** `proof:dock-animation-live` exits 0 — the dock-root box width ramps over
**22 rising frames** and `--dock-morph-t` over **18 frames** (peak 1.046), smooth + monotone over the
~285-320ms clock. (BB shipped a SNAP: the width rose over only 4 frames, W0=13.875 → W1=489.5 — "the
box snapped/froze, it did not morph". This is the headline BB defect actually fixed.)

## The analytic-vs-live gap (why the orchestrator owns the live π)
DOCK-ENGINE's device-free gate passed — its analytic DOCK_SPRING envelope read 0.932 midpoint travel.
But the LIVE morph snapped. The live capture caught three compounding wiring bugs the analytic gate
could never see:
1. **The root never followed the scalar.** The inner `.dock-layers` reserves its settled `to` footprint
   and morphs via `transform: scaleX()` (paint-only); the root `.glass-dock` (inline-flex) shrink-wrapped
   to the inner's RESERVED full width → it snapped to full on frame 0 while the inner scaled smoothly. The
   gate (and the page reflow) measure the ROOT, which never rode the scalar.
2. **The spring re-arm couldn't restart its glide.** The dock spring always targets 1 (direction lives in
   `--dock-expand-t`), so `set target = 1` on a re-armed spring is idempotent — it couldn't re-seat the
   clock or restart a stopped play() loop; a swap near value≈1 froze `--dock-morph-t`.
3. **The to-measure returned 0.** The root's own pinned `inline-size` recipe clamped the `min-width:0`
   grid child to 0, so `to` measured 0 and the morph same-size-early-returned.

## The fix (compositor-only, box-inviolate)
- The root now RIDES the scalar: the orchestrator measures + writes `--dock-root-morph-from/-to`, and
  `layers.css` drives `inline-size`/`block-size` as a `calc()` of `--dock-morph-t` — NOT a `transition:
  width` (proof:no-layout-animation stays GREEN; the width morph is JS-driven by the SpringProgress).
- A fresh velocity-carrying spring per episode (iOS interruptible continuity) with a guaranteed-running
  play() loop + a synchronous scalar=0 seat (kills the prior loop's residual writes / the endpoint flash).
- The measure lifts the root pin so the grid child measures its real expanded width.
- DOCK_SPRING {0.32, 0.7} + the `--spring-dock` linear() are byte-UNTOUCHED (R2 consume honored).

## What else DOCK-ENGINE landed
The Atlas A-9 `--dock-control-glyph-size` knob (declared at :root + per `[data-density]` + coarse — the
substitution-vs-inheritance dead-knob closed), the compositor will-change promotions ONLY on armed states
(rail hover/active/held + collapsed-hover, never resting), and the fourier `DockIconButton active?` prop
(aria-pressed + data-active reading the shipped `--dock-control-active-bg`).

## Gates
proof:dock-engine · proof:dock-animation-live · proof:no-layout-animation · proof:spring-tokens-synced ·
proof:dock-css-carve all GREEN (3/3 deterministic); 93 dock unit tests pass.
**Booked to the fleet:** proof:dock-tap-integrity (the collapsed-dock tap — pre-existing at HEAD, owned by
DOCK-VERTICAL-FIX / DOCK-COLLAPSED-BOTH).
