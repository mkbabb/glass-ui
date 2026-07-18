# SPEC-F1-SCALAR-SPINE — the spine + follower bank

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE. Inputs: REGISTRY §F1, MARKS (whole), F1 digest + probe, X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (schema loads via `ToolSearch select:DesignSync`; live
`list_projects` returns an empty project list — no design-system project exists to sync against, and
pass-1 output is markdown, so design judgment ran in-seat; pass-2 seats producing component previews
should route them through DesignSync).

---

## 1. Architecture

One normalized scalar per liquid surface, plus a bank of cheap followers that carry the memory the
scalar cannot. The pass-1 probe closed the family's hard question in both directions: a pure
direction-symmetric `f(t)` provably fails the CC close order (fade would land at 460ms against the
measured ~170ms), and a bank of first-order followers with asymmetric attack/release clocks off one
spine reproduces open, close, AND interrupt with a single parameterization. The family therefore
ships as spine + bank, and the amendment is principled: the spine stays memoryless and
gesture-coupled; hysteresis lives only in follower state.

**The spine kernel — `useSurfaceSpine` (name illustrative).**
- Domain: `[−μ_down, 1 + μ_up]`, μ asymmetric (deep down margin, shallow up margin — MARKS §2 note 3).
  The overpull margins are part of the domain, not an exception.
- Three regimes: `scrub` (finger-mapped through kf `Draggable`; the iOS hyperbolic rubber-band
  `x·d·c/(d + c·x)`, c≈0.55, applied in `DragOptions.transform` — zero engine edits; `bounds` at the
  domain edges), `glide` (release: `SpringProgress` seeded with the 100ms-window release velocity;
  C¹ by construction via `set target`/`reset(value, velocity)`), `parked` (settled — zero rAF, the
  `useDockSpring` self-dispose discipline).
- Publication: `--gl-t` written per frame on the surface root (the shipped `--dock-morph-t`
  contract — inheriting subtree spine; the `inherits: false` house rule fences per-element velocity
  channels, not spines). JS surface publishes `(value, velocity, target, regime)`.
- The pre-commit taffy zone is a scrub dead-band: the first ~40px map into `t < t_commit` with the
  compression transfer live and the growth transfer at 0.

**The follower bank.** A channel is one follower scalar chasing `g_c(spine state)` under an
(attack, release) clock pair. Exactly three follower kinds cover the corpus:
- position-keyed (medium/blur: occupancy threshold `t > 0.02`, attack τ≈25ms, release τ≈140ms after
  a hold) — persistence across interrupted cycles falls out of follower state;
- target-keyed (content fade: keys on the spine's committed TARGET, not position — the probe's one
  structural discovery; attack τ≈65ms, release τ≈55ms) — the close-order inversion falls out;
- identity (stretch: the spine itself, spring-shaped).
Implementation is dual: CSS-transition followers (registered `<number>` props with per-state
durations) where the R2 probe verifies green in Safari paint; JS followers in the spine's `onFrame`
otherwise (the probe's proven shape). PRM: spine seats instantly AND every follower seats
(`transition: none` under the media query; JS followers snap) — zero in-between frames.

**The transfer authoring surface.** Per element: static `--gl-band` constants + one calc declaration
per channel. Curve vocabulary on the Safari floor: `clamp((var(--gl-t) − B0)/(B1 − B0), 0, 1)`
(universal), `progress()` (Safari 26/Chromium), `exp()` sigmoid for the blur cliff (Safari 15.4+),
`sign()` for direction gates, `linear()` for measured curve shapes (17.2+). No keyframes, no WAAPI
objects on the scrub path.

**The detent policy.** Terminal detents are `DragOptions.snap` (engine-side, nearest-target re-seat
from projected `decayRest`). The transient mid-detent catch is a spine-owner scheduler: on release,
if the glide's projected path crosses a weak well at |v| above threshold, retarget the well; on
arrival-or-170ms, retarget onward. Every retarget is C¹ via `set target`. No engine fork.

**Registers.** In-domain morphs stay on DOCK. Two per-primitive LOCAL registers (the
`springPresets.ts` presets-in-consumers seam), because the measured overpull overshoot violates the
global [0%,10%] fence and the fence should stand for one-shot settles:
- `pin-release` ≈ (0.22, ζ 0.75±0.05) — the top-pin snapback (130px in ≤83ms, ~170ms tail);
- `overpull-springback` ≈ (0.40±0.05, ζ 0.30–0.38 provisional) — the probe surfaced a MARKS-internal
  contradiction (stated ζ 0.5–0.65 vs measured 40–70px overshoot fitting ζ 0.28–0.38); the 24fps
  burst (MARKS wishlist #1) is the arbiter. The shipped dock row (0.30, 0.82) is ruled OUT as the
  overpull register (2px overshoot).

## 2. Mechanism per hallmark

**H1 growth ladder.** Reserved-footprint surface, `transform-origin: bottom center` — bottom edge
pinned by construction, top travels via `translateY`+`scaleY` channels of `--gl-t`. Sides breathe as
a `scaleX` band peaking +4.5%. The reveal ladder is a utility class with a per-rung index property:
rung N's band is `calc(0.4 + 0.1 * var(--gl-rung))`, handle 0–5%, title ghost 10–30%, title solid
30–50% (MARKS §6 note 4) — height-mapped, so the Find My held-height proof (reveal a pure function
of height) is satisfied identically under scrub and glide. Each rung is fade + ~30–60px rise; icons
emerge from a clipped tray at the bottom margin (small additive recipe beside `.liquid-enter` — X2's
named gap). The surface never presents as one bitmap because every rung is a live per-element
transfer.

**H2 overpull compression + springback.** `t < 0` / `t > 1` are ordinary domain regions: the
compression transfer maps margin depth to a container-level `scale` (down: width −7.5%, height −21%;
up past detent: ~−1% — magnitude a function of how forbidden the region is), anchored bottom-center.
Content deforms with the container for free because the compression is one transform on the
container tree (the press substrate already proves this). Displacement is saturating (hyperbolic
law), matching MARKS' finger-travels-far/dock-caps-at-60-70px read. Release: `overpull-springback`
register, one overshoot (~30–50% of overpull), settle ≤250ms; the top pin releases on
`pin-release`. Bound asymmetry is domain-constant asymmetry (μ, compression gain, register) — not a
special case.

**H3 lens.** The tab lens is a spine on the slot axis (domain = slot index, extended margins for
edge overpull) plus followers with deliberately split clocks: a LIGHT follower with fast attack
(bloom/wash leads) and a GEOMETRY channel on the spine's spring (capsule follows) — "light leads,
geometry follows" as two clocks off one spine. Press-charge is an engagement follower keyed on
pointerdown (independent of travel, per MARKS §3 — charge precedes motion). Oversized arrival:
velocity-seeded overshoot in the scale channel (~110–120%) plus a hold-then-release follower on the
light channel (~200ms hot hold, then cool-down; press→settle 1.2–1.4s total). Magnification ~5–8% is
a content-scale transfer under the capsule. The lens BODY anatomy (barbell, goo, sibling legibility)
is F5's turf; F1 supplies the clocks and states its seam: the light body consumes the spine's
(value, velocity) exactly as `usePagerWorm` consumes `useLeadTrail`.

**H4 material tiers.** F1 does not own material. It publishes the channels the material consumes:
the medium follower drives a registered medium scalar that the glass recipe reads as OPACITY over a
constant blur radius (never an animated radius — X1 §E, F5 concur); tier budgets stay on the shipped
five-rung ladder (`glass-capsule.css` + `tokens/glass.css`); the 1px top rim rides the existing
`--glass-rim-top`/`--glass-specular` legs. Specular/light events gate on the H6 energy channel —
engagement only, never idle.

**H5 multi-clock choreography.** The follower bank IS the mechanism, probe-verified against every
MARKS §5 band with ONE parameterization:

| scenario | probe | measured |
|---|---|---|
| open: medium 95% | 106ms | ≤100ms cliff |
| open: fade 95% | 193ms | 150–250ms |
| open: stretch 90% | 589ms | ~600–650ms |
| open: fade:stretch | 1:3.1 | ~1:4 |
| close: fade out | 163ms | ~170ms |
| close: empty-medium beat | 172ms | 100–200ms |
| close: medium gone | 681ms | ~620ms |
| interrupt: medium minimum | 0.46, never resolves | blur held featureless across cycles |

Close-order inversion is emergent (target-keyed fade + position-keyed medium), not authored. Depth
grading (+20% per row) and periphery lag (~100ms) are per-element transfer parameters, not new
followers. Interrupt catch is free: the spine is scrub-re-enterable at any instant and followers
integrate from live state.

**H6 momentum facility.** The spine feeds the existing register: `tanh(|ṫ|·k)` into
`writeVelocityWeight` (`--flex-vel` non-inheriting live channel, `--motion-weight` governor,
site-local `effectiveCap`). The ALL-components facility is the X2/X3 unification: one element-space
kinematics primitive (the `usePointerVelocityField` derived chain — velocity AND acceleration in
px/s — re-homed to element space, event-window-gated like `useDragVelocity`, coalesced-event-fed
with the 100ms LSQ window per X1 §C), projecting onto the existing CSS vocabulary; `--atom-drag-v`
naming retires into it. Velocity-seeded release is engine-native; overshoot only on fast arrival is
spring math (v₀ > ωₙ·Δ), never a synthetic bounce.

## 3. MARKS acceptance targets

| target | mechanism | evidence |
|---|---|---|
| bottom pinned, top travels, sides +4–5% (§1) | origin bottom-center + per-axis transfer bands | X2 verdict table: EXTEND, reserved-footprint architecture accommodates |
| reveal ladder, per-element fade+rise (§1/§6) | rung-indexed calc bands of `--gl-t` | `--dock-morph-t` descendant-calc precedent live at HEAD |
| pin-past-detent, ~1% squeeze, 130px/≤100ms snapback (§1) | up margin + compression transfer + pin-release register | probe: response 0.20–0.22 covers 108–113px in 83ms |
| overpull −7.5%/−21%, one body, bottom anchor (§2) | margin compression transfer as container scale | press substrate proves content-deforms-free |
| springback one overshoot, ≤250ms (§2) | overpull-springback local register | probe C; ζ bracket pending R3 |
| ~40px taffy zone (§2) | scrub dead-band below t_commit | domain construction |
| lens one continuous body, charge, oversized arrival (§3) | slot-axis spine + light/geometry clock split + F5 body | clock split is the bank's native shape; body seam stated |
| three clocks, close inversion, empty beat (§5) | follower bank, one parameterization | probe table §2 above |
| medium persists across interrupts (§5) | position-keyed follower state | probe: medium min 0.46 |
| scrub/spring two regimes, velocity inheritance (§6) | Draggable + SpringProgress re-seat | engine-native, shipped in useDockSpring/useDragMorph |
| detents magnetic both ways, ~170ms catch (§6) | snap[] + weak-well retarget scheduler | design; prototype-verified in pass 2 |
| everything a scrub (Beyond) | spine scrub-re-enterable at any instant | regime machine |

## 4. Safari-2026 feasibility

All load-bearing pieces sit at or below the floor: `@property` 16.4, `exp()`/`sign()` 15.4,
`linear()` 17.2, `progress()` 26 (with `clamp()` as the universal arm). No worklets, no WAAPI
objects on the scrub path; glide may compile to velocity-seeded `linear()` WAAPI where the spine
owner prefers compositor playback (X1 idiom 1), but the JS spring loop is sufficient and shipped.
Chromium ≥84 does dependency-aware custom-property invalidation; the web.dev benchmark puts WebKit
near Chromium. The one honest cost hole is R1: no Safari number exists for a 60fps inheriting spine
var over a card-sized (~40-consumer) subtree — a pass-2 trace, not a design risk, since the shipped
dock already runs this exact contract single-surface.

## 5. The prototype that proves the riskiest claim

**Riskiest claim: the follower bank reproduces the CC choreography in PAINT — open bands, close
inversion, the empty-medium beat, and the held-featureless-blur interrupt — while the spine is
scrubbed and caught mid-flight.** Build the Maps-card + CC-scrim demo on one spine: drag-up growth
with the reveal ladder, release at speed, flick-dismiss, mid-dismiss catch. Capture per the live-π
law (screenshot + paired-π, Chrome AND Safari): open 106/193/589ms ±1 frame at 60fps, close
163ms + ~172ms beat, interrupt medium-min ≥ 0.4. The same page carries the R1 recalc trace
(ms/frame, Safari 26 vs Chrome) and the R2 two-element CSS-transition-follower scrub-reversal probe.

## 6. Open gaps

| # | gap | owner/next move |
|---|---|---|
| R1 | Safari per-frame recalc cost of the inheriting spine var over a card-sized subtree | pass-2 browser trace on the §5 prototype |
| R2 | CSS-transition followers under rapid scrub reversal in Safari paint | 2-element scratch probe; if red, followers stay JS (no architecture change) |
| R3 | exact overpull (ζ, f) — MARKS self-contradiction (stated 0.5–0.65 vs fitted 0.28–0.38) | 24fps re-burst of t≈6.8–7.1; spec carries both brackets until then |
| R4 | two concurrent gestures on one surface (jockey + tab swap) | one spine per SURFACE, one spine per element, cross-surface coupling only through followers; exercise against the f-0097–0117 three-channel swap |
| R5 | compositor residency of clip-path/filter channels riding `calc(var(--gl-t))` in Safari | trace alongside R1 |
| — | honest boundary: cross-SURFACE choreography (the Find My card swap runs three concurrent spines) is conducted above the spine; F1 composes by publishing state | round-2 boundary call with F3 |

Note for round 2: F1's follower bank and F3's channel rack are the same mathematical object reached
independently — first-order laws with direction-asymmetric clocks off one gesture scalar. The
family routes differ in where the scalar lives (spine domain + engine regimes vs conductor manifest)
and converge on the kernel. That independent convergence is evidence, not a merge — the merge is
round 2's call.
