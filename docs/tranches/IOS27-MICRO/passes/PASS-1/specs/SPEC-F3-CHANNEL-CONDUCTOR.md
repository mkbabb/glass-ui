# SPEC-F3-CHANNEL-CONDUCTOR — coupled clocks off one gesture scalar

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE. Inputs: REGISTRY §F3, MARKS (whole), F3 digest + conductor probe, X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).

---

## 1. Architecture

Desync by coupling constants, never by authored curves. A conductor primitive owns a rack of named
channels per surface, each a follower of the gesture scalar under its own coupling law; the MARKS
choreography falls out of the constants. The pass-1 probe closed the family's riskiest unknown:
four laws, one integrator, zero authored timelines reproduce every MARKS §5/§6 band emergently —
fade/stretch ratio 0.250 against the measured ~1:4, a 117ms empty-medium beat inside the 100–200ms
design band, close-order inversion from per-channel release laws, per-channel interrupt continuity
with the medium persisting across cycles, one joint park predicate, and tempo-invariant ratios.

**The primitive — `useConductor(manifest)`.** Engine-free, `/motion-core`-eligible, one hand-rolled
rAF (semi-implicit Euler spring sub-stepped ×8 + exponential followers — the `useLeadTrail` math),
parks on the joint predicate, PRM seats every channel (the `useRAFLoop` chassis is disqualified —
it pauses under PRM instead of seating).

```ts
const c = useConductor({
  el: surfaceRoot,
  channels: {
    medium:    { law: "cliff",  tau: 0.03, close: { hold: 0.25, tau: 0.17 } },
    geometry:  { law: "spring", preset: "dock" },
    content:   { law: "follow", tau: 0.07, close: { tau: 0.055 } },
    periphery: { law: "follow", tau: 0.07, delay: 0.10, source: "content" },
  },
});
c.scrub(g);            // gesture-live: state = f(position)
c.release(target, v);  // seeds sprung channels with release velocity
c.seat(g);             // instant: mount / resize / PRM
```

- **Law vocabulary, four, closed**: `cliff` (fast follower + release hold), `follow` (first-order
  lag), `spring` (`springPreset` name or (response, ζ)), `delay` (transport delay + source routing).
  Every law takes `open:`/`close:` overrides — the probe proved the laws MUST be
  direction-asymmetric (the measured open/close pairs are one constant per direction per channel).
  No fifth law without a MARKS-grade measurement — the vacuous-generality fence.
- **Channel roles are conventions**: `medium/geometry/content/periphery/light` are documented role
  names with default laws; a typical manifest is ≤5 lines. Depth grading is a per-row GAIN on the
  published geometry value (×(1 + 0.2·depthIndex)), not a channel.
- **Two regimes, one API**: scrub under gesture, velocity-seeded release after; interrupt = calling
  `scrub` mid-release — every law integrates from live state, so the catch is continuous per
  channel by construction.
- **Tempo**: every time constant ×`motionTempo(el)` at construction; the desync ratios are
  tempo-invariant (probe F).
- **CSS seam**: per-channel registered vars (`@property`, `inherits: false` — the property-regs.css
  precedent), written on the surface root only; CSS maps vars to transform/opacity/filter. Honest
  cost statement: a per-frame var write is a one-element style recalc, not a compositor animation —
  the animated properties stay compositor-cheap, the write does not.
- **The no-second-engine fence, resolved by construction**: the conductor is `useLeadTrail`
  generalized from the fixed {lead, trail} pair to a named rack — same math, same one-rAF/park/seat
  contract; `useLeadTrail` becomes expressible as a two-channel manifest and stays shipped as the
  N=2 primitive. To `SpringProgress`: consumer of the preset vocabulary, never a wrapper — kf vector
  lanes are (ω, ζ)-homogeneous and per-instance `play()` would fork N rAFs. Single-scalar morphs
  KEEP `useDockSpring`; the conductor exists only where ≥2 channels with DIFFERENT laws follow one
  gesture scalar. `useStagger` cascades are not absorbed.
- **Adoption boundary**: gesture-coupled surfaces only (~6–10: dock, sheet/card, CC-like scrim,
  lens, pill carousel). The degenerate no-JS manifest — per-property `transition-duration`/`-delay`
  plus the `--spring-*` `linear()` tokens — is the documented default for one-shot surfaces.

**Detents.** The geometry channel's release law owns them: terminal detents are retargets seeded
with release velocity (the `useDockSpring` re-base idiom or kf `Draggable.snap` at the gesture
layer); the transient mid-detent catch is a scheduled weak-well retarget (target the well when the
projected path crosses it at speed; retarget onward at arrival-or-170ms) — same policy as F1, held
in the conductor's release path.

## 2. Mechanism per hallmark

**H1 growth ladder.** Card surface manifest: geometry = spring(preset) following the gesture scalar;
the reveal ladder is per-element CSS bands off the published geometry var (height-mapped — under
scrub the scalar IS position, so the Find My held-height proof holds). Growth asymmetry is CSS
(origin bottom-center, per-axis shaping of the geometry var, sides-breathe band peaking +4.5%);
icons emerge from a clipped tray band. Nothing presents as one bitmap because every element reads
the live var.

**H2 overpull compression + springback.** The gesture scalar g extends past the bounds through a
saturating rubber-band map at the gesture layer (the conductor consumes g, never raw pointers — the
`usePointerVelocityField`/`Draggable` seam). In the margin, a bound-compression channel maps margin
depth to one container-level scale (−7.5%/−21% down, −1% up, bottom-anchored; content deforms free).
Release runs the geometry channel's close law with a bound register override — the underdamped
overpull pair (ζ bracket 0.30–0.65 pending the 24fps burst; the F1 probe's contradiction finding is
adopted as shared input), housed per-primitive under the presets-in-consumers seam. Overshoot only
on fast arrival is analytic (probe D: overshoot iff v₀ > ωₙ·Δ) — no mode switch, no synthetic
bounce. The taffy zone is a gesture-layer dead-band before g engages the geometry channel.

**H3 lens.** A conductor rack on the tab bar: light = cliff (near-instant charge + wash),
geometry = spring (the capsule), content = follow (label magnification ~5–8% as a content-scale
read), periphery = delayed follow (sibling response). "Light leads, geometry follows" is emergent —
τ_light ≪ response_geometry — never authored. Press-charge is the light channel's attack on
pointerdown, before any travel. Oversized arrival: the geometry channel seeded with arrival
velocity overshoots in scale while the light channel's close law holds hot ~200ms then relaxes
(press→settle 1.2–1.4s from the constants). The lens BODY (barbell anatomy, goo, sibling
legibility under bloom) is consumed from F5's layer contract; the conductor supplies its clocks.

**H4 material tiers.** The conductor writes; the material reads. The medium channel var drives
overlay OPACITY at constant blur radius (the glass tiers own `backdrop-filter`; a raw per-frame
blur-radius write is fenced — the `.scroll-chrome` hazard note). Tier budgets stay on the shipped
five-rung ladder; light/specular reads gate on the light channel — engagement only, never idle.

**H5 multi-clock choreography.** The family's proof, measured by the probe with the §1 manifest:

| test | probe | MARKS |
|---|---|---|
| open: medium t90 | 67ms | ≤100ms cliff |
| open: fade t90 | 158ms | 150–250ms |
| open: geometry t99 | 633ms | ~600–650ms |
| open: fade/stretch | 0.250 | ~1:4 |
| open: periphery lag | 142ms | 80–160ms |
| close: content out | 158ms | ~170ms |
| close: empty-medium beat | 117ms | 100–200ms |
| close: medium out | 642ms | ~620ms |
| interrupt | per-channel continuity, medium min 1.000 | blur never resolved between cycles |
| park | 883ms, joint predicate | no idle rAF |
| tempo ×1.3 | ratio 0.253 | desync survives tempo |

Close inversion is per-channel release law; the beat is the gap between release laws; depth grade
is a row gain; every phase is a scrub because every law integrates from live state.

**H6 momentum facility.** The conductor consumes `(g, ġ_release)` and never owns tracking — the
facility lives at the gesture layer: one element-space kinematics primitive unifying the four
in-tree systems (kf Draggable release window, SpringProgress analytic velocity,
`usePointerVelocityField` v+a chain, `useLiquidFlex`/`writeVelocityWeight` CSS law), per X2 §4.
Clean seam, no duplication: components that need momentum WITHOUT choreography couple to the
facility's CSS vars directly; the conductor is only for multi-clock surfaces.

## 3. MARKS acceptance targets

Every §5/§6 band: probe table above, to be reproduced in paint. Growth asymmetry, ladder, taffy,
compression magnitudes: §2 mechanisms, CSS-band + gesture-layer constructions shared with F1 (the
probe-fitted constants transfer). Pin-release and overpull registers: adopted from the shared
register finding (two local pairs; dock row ruled out as the bound register). Detent catch ~170ms:
the weak-well retarget. Everything-is-a-scrub: `scrub()` re-entry at any instant, per-channel
continuity probed (max frame step 0.12, law-bounded).

## 4. Safari-2026 feasibility

The conductor's hot path is JS-integrated vars + compositor-only CSS consumption — nothing above
`@property` (Safari 16.4) and `linear()` tokens (17.2) is required; scroll-driven timelines are an
optional hybrid for the scrub regime (Safari 26.0/26.4, probe-gated via `supportsCssTimeline`,
U12). The two platform unknowns are cost, not capability: per-frame var-write load with N
conductors live (U10 — one non-inheriting element-scoped write is the shipped
`writeVelocityWeight` cost; N-surface stress unmeasured) and the same backdrop-filter interaction
every family shares (F5's turf).

## 5. The prototype that proves the riskiest claim

**Riskiest claim: the probe's emergent choreography survives contact with paint — the rack hits the
MARKS bands in-browser, under scrub, release, AND a mid-close catch, with the medium held
featureless between cycles and zero idle rAF after park.** Build the CC demo: one conductor, the §1
manifest verbatim, scrim + grid + rail, driven by a real drag. Capture per the live-π law (both
engines): the full probe table ±1 frame at 60fps, the interrupt episode (flick-dismiss, catch at
~120ms, re-open), a park assertion (no rAF after settle), and the U10 stress page (3 concurrent
conductors, recalc ms/frame, Safari 26 vs Chrome).

## 6. Open gaps

| # | gap | next move |
|---|---|---|
| U9 | adoption census — the exact 6–10 gesture-coupled surfaces, and the migration line vs the degenerate CSS manifest | pass-2 surface census |
| U10 | per-frame var-write cost, N conductors live | §5 stress trace |
| U11 | light channel ownership — conductor channel vs F5's layer contract (this spec assumes: conductor supplies the clock, F5 supplies the body) | round-2 boundary call |
| U12 | hybrid CSS-timeline scrub (threaded) with the JS rack taking over at release | paint-verified prototype, pass 2 |
| U13 | overpull rubber-band ratio (g mapping, upstream of the rack) | the 24fps burst |
| — | manifest authoring bar: a consumer states ≤5 lines or the family has dissolved into "animations, again" | enforced at the pass-2 API review |

Note for round 2: F3's rack and F1's follower bank are the same kernel reached independently —
first-order direction-asymmetric laws off one gesture scalar, probe-verified twice against the same
MARKS bands with compatible constants. The routes differ on where the scalar's physics lives
(conductor-external gesture layer vs spine-internal regimes) and on the authoring surface (manifest
vs transfer bands). The merge, if any, is round 2's call; this spec keeps the family's center —
coupling constants as the ONLY desync authority — intact.
