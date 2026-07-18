# SPEC-F1-SCALAR-SPINE — the spine + follower bank

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
PASS-2 CURE AMENDMENTS applied in place 2026-07-18 (cure seat F1, verified-model claude-fable-5) —
the change log and ARGUED-DOWN notes live in §7; the cure ledger at
`../../PASS-2/cures-F1.md`. Constants herein are re-fit to MARKS including its PASS-2
CORRECTIONS (C1–C7); the pass-1 text they replace is quoted in §7, not silently overwritten.
Status: ACTIVE. Inputs: REGISTRY §F1, MARKS (whole, incl. PASS-2 CORRECTIONS), F1 digest + probe,
X1/X2/X3 digests, CRIT-F1, AGGLOMERATION, the PASS-2 safari-arm pack, SUFFUSION-MATRIX §3.3.
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
- Domain: `[−μ_down, 1 + μ_up]`, μ asymmetric. Two asymmetries, never conflated (G11): MARGIN
  DEPTH is in travel units and is deeper UP (the video pins ~130px past the top detent vs a
  ~60–95px down cap; the prototype ships μ_down 0.10 < μ_up 0.19); COMPRESSION GAIN is the feel
  and is harder DOWN (−7.8% width measured (C1) / −21% height (pass-1 read, unverified by the
  re-burst) vs ~−1% at the top pin). "How forbidden the region is" prices the gain, not the
  depth. The overpull margins are part of the domain, not an exception.
- Three regimes: `scrub` (finger-mapped through kf `Draggable`; the iOS hyperbolic rubber-band
  `x·d·c/(d + c·x)`, c≈0.55, applied in `DragOptions.transform` — zero engine edits; `bounds` at the
  domain edges), `glide` (release: `SpringProgress` seeded with the 100ms-window release velocity;
  C¹ by construction via `set target`/`reset(value, velocity)`), `parked` (settled — zero rAF, the
  `useDockSpring` self-dispose discipline).
- Publication: `--gl-t` written per frame on the surface root (the shipped `--dock-morph-t`
  contract — inheriting subtree spine; the `inherits: false` house rule fences per-element velocity
  channels, not spines). JS surface publishes `(value, velocity, target, regime)`.
- The pre-commit taffy zone is a scrub dead-band: the first ≥70px (≈0.08 of travel — C1 corrected
  the pass-1 ~40px read) map into `t < t_commit` with the compression transfer live and the growth
  transfer at 0. Prototype `t_commit = 0.08`.

**The follower bank.** A channel is one follower scalar chasing `g_c(spine state)` under an
(attack, release) clock pair. Exactly three follower kinds cover the corpus:
- position-keyed (medium/blur: occupancy rule below; attack τ=20ms, release τ=120ms — re-fit to
  MARKS §5/C6, see the H5 table) — persistence across interrupted cycles falls out of follower
  state;
- target-keyed (content fade: keys on the spine's COMMITTED INTENT, not position — the probe's one
  structural discovery; attack τ=65ms, release τ=55ms) — the close-order inversion falls out;
- identity (stretch: the spine itself, spring-shaped).

**The ONE blessed parameterization (G5).** Occupancy is one stateless target-conditioned rule:
`medium target = value > θ ? 1 : 0` with `θ = 0.02` while the committed intent is OPEN and `0.10`
while it is CLOSED. The pass-1 probe's per-scenario constants and positional fade ramp are
SUPERSEDED — its interrupt milestones (medium-min 0.46, fade-min 0.23) are historical; the
blessed rule's values are medium-min 0.58 sim / 0.60–0.64 live and fade-min ~0.00, and ~0.00 is
the better corpus match (MARKS: "a pure blurred-dimmed field with NO content"). Probe, spec, and
prototype now state this one rule.

**The intent law (G6 — written jointly with F3; latch at drive time).** The committed intent is a
LATCH, the one follower-facing bit of state the spine carries:
- any `glideTo(target)` or `seat(target)` latches `intent = target ≥ 0.5` — latch at drive time;
- during scrub: `p = value + 0.15·v̄`, where `v̄` is the LSQ window velocity through a first-order
  τ=120ms filter; the latch flips up only at `p ≥ 0.5 + 0.10`, down only at `p ≤ 0.5 − 0.10`;
- pointer-idle decay: after 80ms without a move sample, `v` and `v̄` decay with τ=100ms — a held
  finger re-zeroes velocity by design, not by the stale-LSQ accident the browser seat found;
- gates: ±0.04 @ 6Hz dither about the commit point produces ZERO flips from either latch state; a
  slow deliberate cross flips exactly once; a short fast flick commits before value reaches 0.5
  (projection lead survives the filter). All three are check.mjs gates and a live battery row.

Implementation is dual with a RESTRICTION (G10): JS followers in the spine's `onFrame` are the
choreography arm (the probe's proven shape). CSS-transition followers (registered `<number>`
props with per-state durations; the R2 Safari-paint precondition now holds — safari-arm, max jump
0.227 ≤ 0.30) are admitted for NON-choreography channels only: a fixed-duration transition
retargeted mid-flight is not rate-faithful to the exponential clock (0.46→1 over a fixed 60ms is
a different clock than τ=20ms attack from 0.46), and the bank's signature outputs — the
empty-medium beat, the interrupt medium-min — are rate-dependent. The CSS arm joins the
choreography path only if a beat/min parity probe between arms lands green under the interrupt
scenario (`linear()`-shaped exponential easing or per-retarget duration ∝ remaining distance).
PRM: spine seats instantly AND every follower seats (`transition: none` under the media query; JS
followers snap) — zero in-between frames.

**The transfer authoring surface.** Per element: static `--gl-band` constants + one calc declaration
per channel. Curve vocabulary on the Safari floor: `clamp((var(--gl-t) − B0)/(B1 − B0), 0, 1)`
(universal), `progress()` (Safari 26/Chromium), `exp()` sigmoid for the blur cliff (Safari 15.4+),
`sign()` for direction gates, `linear()` for measured curve shapes (17.2+). No keyframes, no WAAPI
objects on the scrub path.

**The detent policy.** Terminal detents are `DragOptions.snap` (engine-side, nearest-target re-seat
from projected `decayRest`). The transient weak well is a DECLARED per-surface detent and pure
design vocabulary — MARKS C3 voided the corpus instance (both corpus collapses cross 1976–2017
uncaught; §6's "~170ms catch" is a design hypothesis carried by the suffusion matrix's detent
rows, not a corpus fact). The catch scheduler (G3): on release, project the RELEASE MOMENTUM
decayRest-style (under `v′ = −k·v`, speed falls linearly with distance, k=3/s) — if that momentum
path reaches a declared weak well still carrying |v| ≥ 2.2/s, retarget the well; exit at
arrival-or-170ms; retarget onward. Every retarget is C¹ via `set target`. No engine fork. The
trigger consults the momentum path and never the closed-form glide — the terminal spring
manufactures velocity at any crossing, which would make the trigger unfailable (honesty law).
Falsifiable gates: the trigger truth table (a fast fall released at 0.70 catches; a slow ease
does not; a −3.2 flick from full does not — the C2 landing stays clean with the well declared),
dwell 120–220ms, well proximity ≤0.12 during dwell, and a landing time on the spine's own park
metric, sim = live (the pass-1 588-vs-406ms delta was exactly a landing-metric mismatch — sim
gated |x|<0.006 ∧ |v|<0.1, live gated the park epsilon 0.0015/0.02, a ~90–180ms looser cut at
the dock register's decay rate ζω≈17/s; one metric now, sim 571ms, live must land ±40ms of it).

**Registers (R3 CLOSED — MARKS C2).** In-domain morphs stay on DOCK. The 24fps re-burst
arbitrated the springback: the only free spring transient in the corpus fits ζ = 0.80 (bracket
0.77–0.88), f_d = 1.7Hz (bracket 1.4–2.0; response ≈ 0.35s), settle ≈180ms from rest-crossing,
overshoot VELOCITY-BOUGHT at ≈0.02s·v_cross and never intrinsic (zero-seed intrinsic ≈1.5% of
displacement). Consequences:
- `overpull / arrival` = (0.35, ζ 0.80) — the C2 register; the pass-1 `overpull-springback`
  (0.40±0.05, ζ 0.30–0.38) pointed the wrong way and is dead. The shipped `springPreset("dock")`
  (0.30, 0.82) sits INSIDE the fitted bracket — the library arm uses the dock row as-is (the
  response nudge 0.30→0.35 is within-bracket, optional); no second authority.
- `pin-release` ≈ (0.22, ζ 0.75) — kept as a DESIGN register: C3 grades its corpus evidence
  bounds-only INCONCLUSIVE (~130px in ~90ms, ≥3,000px/s through the detent, finger contamination
  not excludable). The register satisfies the bounds; its settle band is a regression lock.
- The fence question DISSOLVES (SUFFUSION §6 q2): no 30–50% intrinsic overshoot exists anywhere
  in the corpus; the global [0%,10%] preset fence stands with room to spare, no chartered
  exemption, no local-register-because-of-the-fence rationale.

## 2. Mechanism per hallmark

**H1 growth ladder — mechanism RULED (G4): clip-path inset growth.** Reserved-footprint surface;
the top edge travels as `clip-path: inset(calc((1 − grow) · H) 0 0 round r)` on the card body —
bottom edge pinned by construction. The pass-1 `translateY`+`scaleY` sentence is dead: scaleY
growth smears content through the whole travel (a distortion MARKS never shows during growth),
and the content counter-transform it would need is a second moving part with a seam risk at every
scrubbed intermediate. Cost of the ruling, priced in paint: Chrome 150 — R1 40-consumer battery
0 dropped/180 frames, forced-read avg 0.292ms; WebKit 26.5 — flick-open 35 frames avg 14.03ms,
max 19ms, 0 >24ms at 67Hz (safari-arm). Compositor RESIDENCY attribution remains open as R5
(WebKit TOOL-DEFER — Web Inspector; a Chrome DevTools trace is queued to the re-verify seat): the
invariant amendment below stands on the cadence bounds and reverts to reserved-footprint
transforms + counter-transform if a residency trace shows per-frame main-thread paint. INVARIANT
AMENDMENT: the family's hot-path vocabulary is transform/opacity/filter PLUS clip-path on the
growth channel, admitted under the measured frame-cadence budget. `scaleX`/`scaleY` remain the
compression and taffy channels, where small-amplitude content deformation is the point (glass and
content deform as one body — MARKS §2). Sides breathe as a `scaleX` band peaking +4.5%. The
reveal ladder is a utility class with a per-rung index property: rung N's band is
`calc(0.4 + 0.1 * var(--gl-rung))`, handle 0–5%, title ghost 10–30%, title solid 30–50% (MARKS §6
note 4) — height-mapped, so the Find My held-height proof (reveal a pure function of height) is
satisfied identically under scrub and glide. Each rung is fade + ~30–60px rise; icons emerge from
a clipped tray at the bottom margin (small additive recipe beside `.liquid-enter` — X2's named
gap). The surface never presents as one bitmap because every rung is a live per-element transfer.

**The ladder authoring surface (the SUFFUSION §3.3 forPass2 demand, answered).** F1 owns it, and
it is the calc-band vocabulary above — static per-rung band constants + one `clamp()` declaration
per channel — NOT the paused-animation negative-delay idiom. Grounds: a calc band is a pure
function of the spine var, so scrub coherence at every intermediate holds by construction (the
held-height proof follows with no animation object to pause or seek), and the family's own law
bans keyframes/WAAPI objects on the scrub path. `linear()` supplies measured curve shapes inside
the same vocabulary. The paused-animation idiom re-enters only as the glide-side compile target
(X1 idiom 1), never as the ladder's authoring surface. The demand's second half — hysteresis —
is answered in §1: direction asymmetry lives in the (attack, release) clock pairs, statefulness
lives in follower state plus the ONE intent latch; the medium's LAYER anatomy and its persistence
machine (what the published scalar drives in paint) are F5's, and that handoff is named in H4 —
F1 owns every clock, F5 owns every layer.

**H2 overpull compression + springback.** `t < 0` / `t > 1` are ordinary domain regions: the
compression transfer maps margin depth to a container-level `scale` (down: width −7.8% measured
(C1); height −21% pass-1 read, unverified by the re-burst; up past detent: ~−1% — magnitude a
function of how forbidden the region is), anchored bottom-center. Content deforms with the
container for free because the compression is one transform on the container tree (the press
substrate already proves this). Displacement is saturating (hyperbolic law) — the finger travels
far, the dock caps at its margin; the rubber-band RATIO is unmeasurable from this corpus (C1: no
touch overlay), so c≈0.55 stays design vocabulary from the iOS kin. Release (C1/C2): the corpus
overpull playground contains NO free springback — every apparent springback was finger-carried —
so the release law comes from the one free transient, the flung-collapse landing: the
`overpull/arrival` register (0.35, ζ 0.80), overshoot velocity-bought at ≈0.02s·v_cross (zero-seed
releases land dead, intrinsic ≈1.5%), settle ≈180ms from rest-crossing. The pass-1 "one overshoot
~30–50%, settle ≤250ms" law is VOID (it was fitted to hand motion). The top pin releases on
`pin-release` (design register, C3 bounds-only). Bound asymmetry is domain-constant asymmetry
(μ, compression gain, register) — not a special case, and margin depth vs compression gain stay
separated per §1.

**H3 lens — DEMOTED to clocks + seam (G8).** F1's claim here is the CLOCK CONTRACT only: a LIGHT
follower with fast attack (bloom/wash leads) and a GEOMETRY channel on the spine's spring (capsule
follows) — "light leads, geometry follows" as two clocks off one spine; press-charge as an
engagement follower keyed on pointerdown (charge precedes motion, MARKS §3); oversized arrival as
velocity-seeded overshoot in the scale channel (~110–120%) plus a hold-then-release light follower
(~200ms hot hold; press→settle 1.2–1.4s is the nav ritual, geometry travel itself 150–250ms — C5).
No F1 artifact exercises these clocks in pass 1–2; the acceptance row in §3 says CLOCKS+SEAM ONLY
and the body evidence lives in F5 (whose blink sampler and travel captures are the paint record).
The corpus strengthened the seam law meanwhile: C4 overturned the Safari "blink" (one continuous
body at 60fps — the one-body morph is PLATFORM GRAMMAR, both apps), and C5 proved the lens
re-seats mid-cool under rapid re-taps with no reset — the C¹ re-seat law on the lens body itself.
DOMAIN NOTE (the slot axis, formally): a tab bar is a discrete-well landscape — N STRONG wells at
slot centers on the same normalized domain (slot index i maps affinely to t = i/(N−1); extended
margins for edge overpull unchanged). Strong wells are `snap` targets; the transient weak-well
vocabulary (§1) applies between them (the suffusion G-row momentum tick: jumps ≥2 slots tick
intermediate detents via the same catch scheduler). Multi-well is a domain CONFIGURATION, not a
new domain type. Magnification ~5–8% is a content-scale transfer under the capsule. The lens BODY
anatomy (barbell, goo, sibling legibility) is F5's turf; the seam: the light body consumes the
spine's (value, velocity) exactly as `usePagerWorm` consumes `useLeadTrail`. The slot-axis probe
(≥3 wells, velocity-seeded travel, split clocks driving two rects) belongs to the pass-2 merged
spine-conductor artifact — argued down as an F1-solo artifact in §7.

**H4 material tiers.** F1 does not own material. It publishes the channels the material consumes:
the medium follower drives a registered medium scalar that the glass recipe reads as OPACITY over a
constant blur radius (never an animated radius — X1 §E, F5 concur); tier budgets stay on the shipped
five-rung ladder (`glass-capsule.css` + `tokens/glass.css`); the 1px top rim rides the existing
`--glass-rim-top`/`--glass-specular` legs. Specular/light events gate on the H6 energy channel —
engagement only, never idle.

**H5 multi-clock choreography.** The follower bank IS the mechanism, and after the pass-2 re-fit
the gate bands are MARKS-derived with the sim value a point inside them (G2 — the pass-1 table
gated on probe parity and is superseded; regression locks on the adopted constants live in
check.mjs, labeled `[REG-LOCK]`). The blessed parameterization (§1), one table:

| scenario | sim (check.mjs) | MARKS band (source) |
|---|---|---|
| open: medium 95% | 92ms | ≤100ms (§5 cliff; attack τ re-fit 25→20ms) |
| open: fade 95% | 194ms | 150–250ms (§5) |
| open: stretch 90% | 589ms | ~300–650ms gesture-owned (§5+C6); reg-lock 560–620 |
| open: fade:stretch | 1:3.0 | 1:2.4–1:4.3 (§5 raw component bands 600–650/150–250) |
| close: fade out | 164ms | 130–210ms (§5 ~170, two samples ± the 24fps grid) |
| close: empty-medium beat | 161ms | 100–200ms (§5, C6-confirmed) |
| close: medium gone | 623ms | 600–650ms (§5 ~620 + C6 ~630; release τ re-fit 140→120ms) |
| interrupt: medium minimum | 0.58, never resolves | ≥0.4 qualitative floor, ≤0.85 dip-proof (§5) |
| interrupt: fade minimum | ~0.00 | ~0 — "pure blurred-dimmed field with NO content" (§5) |

The two constants that moved, and why: the pass-1 clocks put open-medium-95% at 107ms against a
corpus cliff of ≤100ms and close-medium-gone at 683ms against a corpus ~620–630ms — the pass-1
bands had been widened to fit the constants (CRIT-F1 G2's finding); pass 2 re-fit the constants
to the corpus instead. Live columns are re-measured by the re-verify seat under these bands
(PASS-2 reverify-queue §F1); the pass-1 Chrome and WebKit live numbers predate the re-fit and
stand only as history. Close-order inversion is emergent (intent-keyed fade + position-keyed
medium), not authored. Depth grading (+20% per row) and periphery lag (~100ms) are per-element
transfer parameters, not new followers. Interrupt catch is free: the spine is scrub-re-enterable
at any instant and followers integrate from live state.

**H6 momentum facility — CEDED to F4 (G9; AGGLOMERATION §3 item 4).** F4 ENERGY-FIELD owns the
ALL-components facility: the kinematics primitive, the six-scalar contract, the per-role gain
table, the adopter set, and the adoption gate are F4's pass-2 deliverables, not this spec's. What
F1 contributes, exactly: (a) the spine PUBLISHES `(value, velocity, target, regime)` and exposes
the `(g, ġ_release)` seam into the field at every release; (b) the demo channel `--gl-vw =
tanh(|ṫ|·k)` feeding `writeVelocityWeight` (`--flex-vel` non-inheriting, `--motion-weight`
governor) remains as the seam's living exhibit; (c) velocity-seeded release is engine-native, and
overshoot on fast arrival is spring math (v₀ > ωₙ·Δ) — now with corpus constants (C2:
≈0.02s·v_cross), never a synthetic bounce. The word ACCELERATION is struck from this family's
facility claim per the suffusion ruling (§3.1-4): acceleration is expressed as `--impulse` (a
decaying release-burst event channel, F4's) and as the catch/arrest vocabulary — no continuous
acceleration variable exists or will.

## 3. MARKS acceptance targets

| target | mechanism | evidence |
|---|---|---|
| bottom pinned, top travels, sides +4–5% (§1) | clip-path growth (G4 ruling) + per-axis transfer bands | Chrome+WebKit geometry parity to the hundredth; bottom edge sub-pixel immobile on both engines |
| reveal ladder, per-element fade+rise (§1/§6) | rung-indexed calc bands of `--gl-t` (the owned authoring surface) | `--dock-morph-t` descendant-calc precedent live at HEAD; ladder-reads-as-ladder screenshots, both engines |
| pin-past-detent, ~1% squeeze, ~130px/~90ms snapback (§1, C3 bounds-only) | up margin + compression transfer + pin-release DESIGN register | sim 81% @83ms in [75, 92] bounds band; C3: INCONCLUSIVE corpus grade stated |
| overpull −7.8%w measured / −21%h unverified, one body, bottom anchor (§2, C1) | margin compression transfer as container scale | press substrate proves content-deforms-free; live −6.2%/−17.4% at 0.83 depth, linear (both engines) |
| flung landing: velocity-bought overshoot, ~180ms settle (§2, C2) | `overpull/arrival` register (0.35, 0.80) | check.mjs: overshoot/v 0.020s in [0.015, 0.030]; settle-from-crossing 151ms in [140, 220]; zero-seed ≤3% |
| ≥70px taffy zone (§2, C1) | scrub dead-band below t_commit = 0.08 | domain construction |
| lens clocks: light leads, geometry follows; charge; oversized arrival (§3) | CLOCKS + SEAM ONLY (G8 demotion) — slot-axis = N strong wells on the same domain | body evidence lives in F5 (blink sampler, travel captures); C4/C5 prove one-body + C¹ re-seat as platform grammar |
| three clocks, close inversion, empty beat (§5) | follower bank, ONE blessed parameterization | H5 table — MARKS-derived bands, sim a point inside each |
| medium persists across interrupts (§5) | position-keyed follower state + intent latch | sim min 0.58 / live 0.60–0.64 in [0.40, 0.85]; fade-min ~0.00 |
| scrub/spring two regimes, velocity inheritance (§6) | Draggable + SpringProgress re-seat | engine-native, shipped in useDockSpring/useDragMorph |
| detents: terminal snap; DECLARED weak wells, momentum-projected ~170ms catch (§6 DESIGN — C3 voided the corpus instance) | snap[] + decayRest-style momentum trigger + arrival-or-170ms scheduler | check.mjs truth table (fires/refuses both ways), dwell 170ms in [120, 220], landing metric unified sim=live |
| intent never strobes under a held dither (§1 intent law) | latch + projection + hysteresis + idle decay | check.mjs: 0 flips both states; 1 flip on slow cross; early commit on flick |
| everything a scrub (Beyond) | spine scrub-re-enterable at any instant | regime machine |

## 4. Safari-2026 feasibility

All load-bearing pieces sit at or below the floor: `@property` 16.4, `exp()`/`sign()` 15.4,
`linear()` 17.2, `progress()` 26 (with `clamp()` as the universal arm). No worklets, no WAAPI
objects on the scrub path; glide may compile to velocity-seeded `linear()` WAAPI where the spine
owner prefers compositor playback (X1 idiom 1), but the JS spring loop is sufficient and shipped.
Chromium ≥84 does dependency-aware custom-property invalidation; the web.dev benchmark puts WebKit
near Chromium. The R1 cost hole is now half-filled: WebKit 26.5 runs the 40-consumer battery at 0
dropped/180 frames with write avg 0.039ms (safari-arm) — the cadence bound holds on the floor
engine; recalc ATTRIBUTION (the true style-recalc trace) remains TOOL-DEFER to desktop Safari Web
Inspector, with the Chrome-side trace queued to the re-verify seat.

## 5. The prototype that proves the riskiest claim

**Riskiest claim: the follower bank reproduces the CC choreography in PAINT — open bands, close
inversion, the empty-medium beat, and the held-featureless-blur interrupt — while the spine is
scrubbed and caught mid-flight.** Built and proven on both engines in pass 1–2 (Chrome 150 +
WebKit 26.5) on the pass-1 constants; the pass-2 re-fit constants re-run under the corrected
bands is queued (PASS-2 reverify-queue §F1). Capture per the live-π law (screenshot + paired-π,
Chrome AND Safari-proxy): open ≤100(+1 frame)/150–250/560–620ms, close 130–210ms fade +
100–200ms beat + 600–650ms medium-gone, interrupt medium-min in [0.40, 0.85] never clearing. The
same page carries the R1 recalc trace and the R2 two-element CSS-transition-follower
scrub-reversal probe (continuity-only — §1 restriction).

## 6. Open gaps

| # | gap | owner/next move |
|---|---|---|
| R1 | PARTIAL — natural cadence green on both engines (Chrome 0 dropped/180 @98Hz; WebKit 0 dropped/180, write avg 0.039ms @67Hz); recalc ATTRIBUTION open | WebKit: TOOL-DEFER (desktop Safari Web Inspector); Chrome DevTools trace queued to the re-verify seat |
| R2 | CLOSED for continuity — GREEN both engines (Chrome max jump 0.149; WebKit 0.227 ≤ 0.30) | rate-fidelity is NOT closed: the CSS arm stays restricted to non-choreography channels (§1/G10) until the beat/min parity probe lands |
| R3 | CLOSED — MARKS C2 arbitrated: ζ 0.80 (0.77–0.88), f_d 1.7Hz (1.4–2.0), settle ≈180ms, overshoot velocity-bought | constants adopted (§1 registers); the shipped dock row is corpus-true |
| R4 | two concurrent gestures on one surface (jockey + tab swap) | one spine per SURFACE, one spine per element, cross-surface coupling only through followers; exercise against the f-0097–0117 three-channel swap |
| R5 | PARTIAL — clip-path growth cost bound green in WebKit (max 19ms, 0 >24ms) and Chrome; RESIDENCY attribution open | WebKit TOOL-DEFER; Chrome trace queued to the re-verify seat; H1 reverts to transforms+counter-transform if red |
| — | honest boundary: cross-SURFACE choreography (the Find My card swap runs three concurrent spines) is conducted above the spine; F1 composes by publishing state | the pass-2 arbitration seat (F1×F3 merge or documented boundary); the slot-axis probe lands there too |

Note for round 2: F1's follower bank and F3's channel rack are the same mathematical object reached
independently — first-order laws with direction-asymmetric clocks off one gesture scalar. The
family routes differ in where the scalar lives (spine domain + engine regimes vs conductor manifest)
and converge on the kernel. That independent convergence is evidence, not a merge — the merge is
round 2's call.

## 7. PASS-2 CURE LOG (cure seat F1, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Every CRIT-F1 gap disposed;
the artifact-level ledger is `../../PASS-2/cures-F1.md`; live re-measurement obligations are
queued at `../../PASS-2/reverify-queue.md` §F1. Quoted-and-voided pass-1 text, for the record:

- §1 domain read "deep down margin, shallow up margin — MARKS §2 note 3" → replaced by the
  margin-depth vs compression-gain separation (G11).
- §1 register text "`overpull-springback` ≈ (0.40±0.05, ζ 0.30–0.38 provisional)… The shipped
  dock row (0.30, 0.82) is ruled OUT as the overpull register" → VOID both ways by MARKS C1/C2:
  the fitted bracket tracked hand motion, and the dock row sits INSIDE the corrected bracket.
- §2 H1 "top travels via `translateY`+`scaleY` channels" → replaced by the clip-path ruling (G4).
- §2 H2 "one overshoot (~30–50% of overpull), settle ≤250ms" → VOID (C1/C2).
- §2 H5 probe-parity table (106/193/589/163/172/681/0.46) → superseded by the re-fit table; the
  0.46 medium-min belonged to the unbles­sed probe parameterization (G5).
- §3 row "detents magnetic both ways, ~170ms catch (§6)" citing MARKS as corpus → re-graded
  DESIGN (C3 voided the corpus instance).

**ARGUED-DOWN notes (declined critique closes, with evidence):**

1. **G8's slot-axis probe as an F1-solo artifact — declined; demotion taken instead.** The
   critique offered either a minimal F1 slot-axis probe or an honest demotion. Demotion is the
   honest branch: the clocks the probe would exercise are exactly the light/geometry rack the
   pass-2 merged spine-conductor (AGGLOMERATION §4 item 4) must own once, and an F1-solo rig
   would be a consumer-less duplicate built days before its real home exists. The domain note
   (H3) closes the formal gap now; the probe obligation transfers, named, to the merge seat.
2. **G10's rate-faithful CSS arm — declined for pass 2; the restriction taken instead.** Making
   fixed-duration transitions rate-faithful requires per-retarget duration recomputation or
   `linear()`-exponential easings — a real design, but the JS arm already carries every
   choreography channel and is the proven shape on both engines. Restricting the CSS arm to
   non-choreography channels loses nothing the corpus demands; the parity probe stays as the
   CSS arm's entry ticket (§1, §6-R2).
3. **G2's "re-fit register values inside the R3 bracket for the settle" — overtaken.** The
   critique's settle cure assumed the pass-1 ζ 0.28–0.38 bracket; C1/C2 dissolved the premise
   (the 323–332ms live settle was measured against a band fitted to finger motion). The adopted
   register's bands replace the whole question.

**The SUFFUSION §3.3 forPass2 demand — answer index:** ladder authoring surface owned at §2-H1
(calc bands, paused-animation idiom rejected for the scrub path); hysteresis answered at §1 (the
intent latch + asymmetric clocks + follower state), with the medium's layer anatomy and
persistence machine named honestly as F5's at §2-H1/H4.
