# SPEC-SPINE-CONDUCTOR — the merged kernel (F1×F3), pass 3

Seat: p3:SPINE-CONDUCTOR. Verified-model: claude-fable-5 (the system-context model ID,
returned verbatim). 2026-07-19.

This spec ABSORBS SPEC-F1-SCALAR-SPINE and SPEC-F3-CHANNEL-CONDUCTOR per ARBITRATION §1.3–1.5
and the PASS-3 CHARTER §1 rulings. The pass-1 specs stand untouched on disk as history; where
any text disagrees, precedence is: CHARTER §1 rulings → ARBITRATION ruling → this spec → the
cured pass-1 specs → prototype comments. Registry key **F1×F3**, family name
**SPINE-CONDUCTOR**, public primitive name **`useLiquidSpine`** (sworn here; the ARBITRATION
sketch was binding in shape, illustrative in spelling — the spelling is now law).

THE DRAFTING LAW governs (user, 2026-07-19, verbatim-standing): "we don't want to recreate
these UIs directly: just their abstract concepts, animations, etc. We should have these
generalized component facilities for their atomic affordances." Everything below is a
register, contract, state machine, or component facility. Our design language governs every
painted expression: warm cream, deft rounding, our palettes, the ONE warm frosted canon
(NOVELTY-ROSTER §3.5-A) — the F1 referent's cool-slate tint and cyan glow are HISTORICAL
(DESIGN M3) and nothing here copies them forward.

Src stays untouched this tranche. Every on-disk change ruled here is EXACT TEXT executed at
the FINAL wave set (§9), per the pass-2 U1 precedent; BJ owns src.

Evidence base: the merged prototype `../../prototypes/spine-conductor/` (index.html +
check.mjs + PROBE-NOTES.md) — **node battery 87/87 gates PASS (+1 info), 2026-07-19**
(`[P4-KERNEL]`: the pass-3 71 plus the 15 M-1/M-2 cure gates; `[P4-AGG]`: +1 domain-fence
gate, CRIT-KERNEL minor 3), the union of F1's 38 and
F3's 19 with duplicates folded, the charter's register gates, and the pass-4 kernel-cure
sections. The parent prototypes stand untouched as pass-2 evidence.

---

## 0. The family, in one paragraph

One kernel: F1's SCALAR-SPINE (the gesture scalar — extended domain, three regimes, rubber
map, terminal detents plus declared weak wells, the committed-intent latch, closed-form
spring registers) drives F3's CHANNEL-CONDUCTOR (the rack — three laws: cliff, follow,
spring; three modifiers: sat input shaping, drive-time direction overrides, delay+source
gating) plus the light channel (lead/hold/cool — codex law 19's clock, minted at CHARTER
R-5). The spine IS the rack's identity channel; every other channel is a first-order or
sprung law off the spine's `(value, velocity, target, regime, intent)`. Zero authored
timelines: the close-order inversion, the empty-medium beat, the depth-graded travel, the
periphery lag, and the light lead all fall out of coupling constants, and the union battery
proves each from the shipped code. The mount fence holds: the kernel mounts only where ≥2
channels with DIFFERENT laws follow one gesture scalar; single-scalar single-law surfaces
keep `useDockSpring`.

## 1. The primitive — `useLiquidSpine`

```ts
const s = useLiquidSpine({
  el: surfaceRoot,
  domain: {                        // ── the SCALAR-SPINE register ──
    muDown: 0.10, muUp: 0.19,      // margin depth, travel units — deeper UP ([DESIGN], OG8 re-grade; the μ_up>μ_down separation law survives)
    rubber: { c: 0.55 },           // hyperbolic map via DragOptions.transform — zero engine edits; c is [DESIGN] (BLOCKED-BY-CORPUS, C1)
    tCommit: 0.08,                 // taffy dead-band (≥70px video scale, C1)
    detents: [0, 1],               // terminal — Draggable.snap
    wells: [{ t: 0.55, kind: "weak" }],  // KERNEL-OWNED [P4-KERNEL] — the momentum-projected catch scheduler (G3) lives in release()/tick()
  },
  channels: {                      // ── the CHANNEL-CONDUCTOR register ──
    medium:    cliff({ attack: 0.020, release: 0.120, sat: 0.12, occ: { opening: 0.02, closing: 0.10 } }),
    geometry:  identity(),         // the spine itself — per-surface register pair, direction-overridable
    content:   follow({ tau: 0.065, close: { tau: 0.055 }, key: "intent" }),
    periphery: follow({ tau: 0.070, delay: 0.100, source: "content" }),
    light:     light({ attack: 0.020, hold: 0.200, cool: 0.375 }),  // consumed by the F5 layer (R1)
  },
});
s.scrub(g);  s.release(target, vFinger, register?);  s.seat(t);   // the three drive verbs; intent latches at drive
```

> **`domain.wells` is KERNEL-IMPLEMENTED as of pass 4 `[P4-KERNEL 2026-07-19]`** (the M-2
> cure): `useLiquidSpine` consumes `domain.wells`, `release()` consults the G3
> momentum-projected trigger itself, the arrival-or-170ms dwell machine is kernel-owned
> with `catching()` as its observation surface, and a scrub cancels the dwell C1. The four
> pass-3 call-site copies are COLLAPSED (`simMidCatch` + Maps pointer-up + the scripted
> button run the kernel path; the page dwell machine is deleted). Seam gates: the 8-row
> M-2 battery section (9 rows as of `[P4-AGG]` — the domain fence gate joined it; battery 87/87). The §7.1 slot-axis lens obligation has its kernel mechanism.
> **The REST of the domain block stays CONTRACT-ONLY, disclosed** (PROBE-NOTES §4.10):
> rubber is applied caller-side (the map is proven, the `DragOptions.transform` seam lands
> at adoption), μ/tCommit live as page CSS calc bands, detents ride Draggable.snap at
> adoption — proven-by-prototype remains `channels`/registers/verbs/`domain.wells`.

- Publishes `--scrub-t` (`inherits: true`, surface root, never body) — the suffusion roster
  name is ADOPTED; F1's `--gl-t` dies into it, clean break, no alias. Per-channel vars ride
  beside it; the JS surface is `(value, velocity, target, regime, intent)`. The prototype
  publishes under the `--sc-` prefix; the shipped name is `--scrub-t` + `--ch-*`-class
  channel names, decided at the FINAL wave set with the registry.
- The `inherits: true` subtree class carries its measured price card (F3 G2, safari-arm):
  WebKit 26.5 baseline 7.3ms → 14.7ms avg at +240..+960 inheriting consumers, worst 18ms,
  zero >24ms — a 60Hz budget through ~1000 consumers; Chrome recalc 0.312ms/frame at +960
  (19× margin). Root scoped tight; per-row JS writes stay REJECTED.
- Authoring surfaces, both kept (ARBITRATION §1.2): the ≤5-line channel manifest declares
  the CLOCK RACK; per-element calc bands of the published spine var declare what each
  ELEMENT does with it (the reveal ladder — scrub-coherent by construction, pure function of
  the var). The paused-animation idiom stays REJECTED on the scrub path; F1's
  CSS-transition-follower arm stays restricted to NON-choreography channels (G10), with the
  R2 continuity probe as its standing entry ticket — whose precondition is a CLEAN run
  `[P3-AGG 2026-07-19, CRIT-SPINE minor 4]`: the storm gate is GREEN clean on both engines
  but RED under recording/first-run contention (order 9a row 8); any CI-class environment
  must warm-run without capture contention or the ticket false-fails.
- The degenerate no-JS CSS manifest survives for one-shot surfaces (F3's census carries it).

### 1.1 The three laws and three modifiers (a fourth law needs a MARKS-grade measurement; a fifth clock is refusal)

| law | step | clock selection |
|---|---|---|
| cliff | exact exponential toward the arm's target | TARGET-directional (attack rising / release falling) — the occupancy target flips MID-drive by design; that flip IS the beat mechanism |
| follow | exact exponential toward intent / source / drive target | drive-latched direction pair (G6) |
| spring | semi-implicit Euler ×8 (the kernel integrator) | (response, ζ) pair LATCHED at drive time (G6 — the falsification-proven gate carries: pre-cure per-frame inference fails at dev 1.9e-1) |
| identity | the spine's closed form | per-surface register pair; direction override picks the register per drive |
| light | cliff attack + the hold/cool release law | phase machine: lead → arrival hold → cool → idle; a held scrub SUSTAINS (law 20) |

Modifiers: `sat` (input shaping, scrub arm), direction overrides (`close:{…}`), `delay` +
`source` (wake-armed dead-time gate, then chase the LIVE source — G5 semantics; arms on
wake-from-parked only, mid-flight retargets never re-arm, `seat()` clears). G5's
"wake-from-parked" means GESTURE-SCOPED arming, **CURED IN THE KERNEL
`[P4-KERNEL 2026-07-19]`** (filed `[P3-AGG]`, CRIT-SPINE minors 5/M-1): park never
masquerades as gesture end. Both defects fixed at the one root — `Spine.scrubIdle` is a
closed-form wall-clock idle decay applied idempotently AT DRIVE TIME (a parked kernel and a
ticking kernel age identically; a still finger releases with a still finger's velocity —
pre-cure 3.0/s frozen and +4.0% unearned peak, post-cure 0.0021/s and 1.0007), and
`parkedMidScrub` keeps a park-under-live-gesture from re-arming the periphery dead-time
gate (periphery live ≤60ms after resume; pre-cure froze ≥100ms). Gates: the 7-row M-1/D2
battery section + the live still-hold cell (Chrome measured |v| 0.0054/s, peak−1 0.0008).
**`sat`×`source` composition is FENCED** (F3 OG3 — closed): the kernel throws at
construction; `settled()` judges source-routed channels against their live source, so no
predicate can permit a permanent rAF spin. Gate: check.mjs "sat×source composition throws".

### 1.2 The intent/direction law — ONE law, two faces (F3 OG1, closed)

Committed intent LATCHES at drive time everywhere. Face one (the scrub face, F1 G6): during
scrub, p = value + 0.15·v̄ with v̄ through a first-order τ=120ms filter, hysteresis 0.5±0.10,
pointer-idle decay (τ=100ms after 80ms still). Face two (the rack face, F3 G6): each drive
latches every channel's direction, which selects its (response, ζ)/τ override pair; nothing
is inferred per frame. The dither row runs at pointer frequency (±0.04 @ 6Hz): zero flips
from either latch state; slow cross flips exactly once; a fast flick commits at value 0.416
< 0.5 (projection lead). All six gates green in the union battery; the live dither rows
stand VERIFIED from pass-2 re-verify (both engines) and re-enter the paint queue only if the
merged page's intent path diverges from F1's (it does not — same class, same constants).

## 2. The laws of the merged family

### 2.1 The medium law, unified (worklist item 1 — DECIDED)

- **Scrub arm = the sat position map** (F3's, Q10-adjudicated): under a finger,
  `medium = clamp01(g / sat)` — position-mapped, reversible, thinning below `sat`. N8 is
  CLOSED as architecture: the softened onset is a per-surface `sat` declaration (larger sat,
  toward 1/φ) — a register of this law, not a mechanism. Battery: sub-sat catch holds
  medium = g/sat ±0.02 (measured 0.8415 vs want 0.8333 — the approach-from-above tail inside
  tolerance), steps law-bounded.
- **Release arm = the emergent occupancy rule** (F1's, ADJUDICATED by the union interrupt
  battery as ARBITRATION §1.2 required): target-conditioned θ (0.02 open-intent / 0.10
  close-intent — the ONE blessed rule, G5), attack 20ms / release 120ms. The authored-hold
  dialect (F3's `hold 0.25 + τ0.17`) is SUPERSEDED: under the union battery it cannot
  produce the dip row's measured partial relax (its medium min is 1.0 against the
  [0.40, 0.85] band — the F1 arm of the union scenarios), while the emergent rule passes
  BOTH arms: held catch at g≥sat → medium min 1.0000 exactly; sub-θ catch at +330ms →
  medium min 0.5353 inside [0.40, 0.85], content min 0.0025, re-settle 1075ms. The beat is
  EMERGENT (measured 102ms inside [63, 217]) — desync by constants, never an authored
  timeline. The interrupt medium-min band carries its honest label:
  `[DESIGN, MARKS §5 qualitative anchor]` (F1 OG2, closed).

### 2.2 The constant table (worklist item 8 — DECIDED ONCE, here)

| constant | value | provenance |
|---|---|---|
| arrival register ("dock") | **{response 0.35, ζ 0.82}** ⇒ f_d 1.6353Hz | CHARTER R-1: 0.30→0.35 AMENDED, ζ HELD — centered on the dock-event fits (Music collapses ζ0.83/f_d 1.60–1.62 ×2 at `MARKS-C-MUSIC.md:277,330-331`, Maps ζ0.80/1.7, the C2 tail 1.62Hz). The overpull register (0.35, 0.80) CONVERGES into it — ONE arrival register, no second authority. Zero-seed overshoot 1.1% analytic (measured 0.81% in sim); k·v arrival gain 0.0233s inside the corpus 0.016–0.030 and dead on the popover's 0.023–0.025 attestation |
| medium clocks | attack **20ms** / release 120ms | attack DECIDED BY FAILURE in the dialect adjudication: the superseded 30ms arm breaches the ≤100ms cliff under the merged occupancy onset (measured 106.7ms > 100); 20ms lands 76.9ms. Release 120ms lands medium-gone 617.9ms inside MARKS 600–650 |
| content clocks | attack **65ms** / release **55ms** | release RATIFIED by corpus (CHARTER R-7 — τ≈54/57/58ms, three independent surfaces); attack decided by the DECLARED centering metric — both dialect arms pass the band, 65ms deviates 1.1ms from the MARKS band center vs 70ms's 14ms. The superseded dialect {30, 70} is history in PROBE-NOTES §3 |
| periphery | τ70ms + delay 100ms, source-routed | measured lag 136.9ms inside [63, 177] (MARKS 80–160 ±17) |
| light | attack 20ms · hold 200ms · cool 375ms | R-5/law 19 + R1's input 2: travel lead t90 50.3ms, arrival hold 214.8ms measured, cool 368ms inside the C5 350–400 band ±17 |
| CC per-surface pairs | open (0.60, 1.0) / close (0.50, 1.0) / catch (0.62, 0.95) | presets-in-consumers seam — a direction override on the identity channel. F1's cc-open (0.95, 1.0) and its 560–620ms s90 lock RETIRE with their register (supersession recorded); geometry t99 633.9ms inside [583, 667], s90 371.5ms inside the C6 gesture-owned range |
| pin-release | (0.22, 0.75) | [DESIGN] — C3 bounds-only, INCONCLUSIVE, unchanged |
| panel | **{0.40, 0.71}** MINTED | CHARTER R-2 — the fired-presentation register (f_d 1.7605Hz inside the measured [1.70, 1.85]; intrinsic overshoot 4.21% inside the ζ-bracket-derived 3.5–5.5%). The ONE class where overshoot is NOT velocity-bought (codex 14(e)); a fired black dock on the gesture register lands dead. V-BLACKDOCK's fired-deploy arm consumes it |
| orb-drop | **{0.22, 1.0}** MINTED | CHARTER R-3 — the invocation drop: ζ=1.0 MEASURED (zero overshoot), response 0.22 [DESIGN] inside the 215±33ms flight (x(215ms) = 0.9846); the energy display is the light build, never bounce |
| the [0,10%] fence | STANDS whole | R-4: §8.2 dissolved outright (no 30–50% intrinsic class exists anywhere in the corpus, `MARKS.md:391-393`); worst register in the table is panel at 4.21% — battery-swept every row |

All spring arithmetic above: f_d = (1/response)·√(1−ζ²), recomputed by the battery, never
quoted. **Nobody re-litigates these constants between here and the FINAL wave set** (the
R-1 clause). The popover residual stands named honestly: at 0.35 the anchored-menu enter
sits ~0.065Hz below its own bracket (~4%, under the cross-surface spread); if it reads dead
after adoption, the licensed cure is a per-consumer response override at the
presets-in-consumers seam — never a table fork.

### 2.3 The EXEMPLARS-2 confirmations, carried as spec law

1. **The popover lands on `springPreset("dock")` verbatim** (MARKS-D-POPOVER §3/§9): five
   independent fits, two samples — ζ 0.82 [0.77–0.88], f_d 1.7–1.95Hz, response ≈0.30–0.32s,
   overshoot velocity-bought at g≈0.0246 px/(px/s), settle ≈180ms; "iOS 27 runs ONE
   terminal-arrival register across the dock morph and the context-menu open"
   (`MARKS-D-POPOVER.md:105-107,193-207`). This retroactively ratifies DOCK_SPRING as the
   HOUSE arrival register, not a dock-local constant — which is exactly why the R-1
   amendment lands on the ONE row and the overpull register dies into it. Popover-class
   enters adopt the dock register with split channel clocks (fade ~100ms < scrim ~195ms <
   geometry ~330ms — the same 1:4 detune, second surface class).
2. **The panel register is real and distinct** (MARKS-D-SIRI mark 3, re-derived on resume):
   both axes ONE spring, intrinsic 4.5–4.8% overshoot, text born blurred condensing ~190ms,
   rim flare +0.5s/+0.85s. The two-registers-two-intents law (gesture-scrubbed → dock;
   FIRED → panel) is codex law 14(e)/9 territory, written in place by the charter.
3. **Staging lives across CHANNELS, not axes** (codex law 9 as amended): the measured squash
   overshoots final height (trough ~3.7× net) and the widen begins DURING the squash — the
   clean sequencing lives in the channel rack (medium → geometry → content → periphery →
   light), never in per-axis phases. The kernel has no per-axis stagers and never will; an
   ordered-axis need is expressed as two channels with different clocks.

### 2.4 The light channel (corpus feed #5 — landed; law 19/20 grounding)

The light channel is a NAMED trailing channel of the kernel: cliff-class attack (t90
50.3ms — light leads every travel), arrival HOLD (~200ms, armed when the spine parks and
the core settles), COOL (τ = cool/3 ⇒ measured 368ms inside the C5 350–400 band), zero idle
term. Under a held scrub the light SUSTAINS at full — law 20's hold envelope (engagement
light is state, not event); release-arrival starts the cool. The kernel and F4 are the sole
writers of the three lens-light inputs (R1): `--engage-t` (F4, θ-exempt), the kernel's
light-channel var (travel lead/hold/cool), `--energy` (F4, θ-gated arrival heat). **F5 owns
every painted expression** — the layer, the barbell anatomy, the sibling-legibility gate;
this kernel ships clocks only. The light channel is EXCLUDED from the rack's step-bound
gates with its reason printed in SC-BANDS: its attack is the licensed cut class (law
16(b)/(c), ≤17–33ms slam); it is gated by its own lead/hold/cool rows instead.

### 2.5 The close order — and the mirrored-exit kill (corpus feed #4)

The family's close grammar, now battery-proven end to end: **content leaves first (release
τ55ms, corpus-ratified) → the empty-medium beat (emergent, 102ms measured) → the medium
relaxes (gone at 617.9ms)**. Exits never mirror entries (codex law 8, exit-never-mirrors
CANON-CITED twice). Two register splits within the grammar, both corpus-grounded: CC-class
surfaces run the full inversion with the beat; popover-class surfaces close as ONE-body
fade-led exhales (~200ms, τ≈50–90ms, no beat — scrim overlaps and finishes last,
MARKS-D-POPOVER §7). The on-disk contradiction is `glass-reveal-out`
(`src/styles/animations.css:157+` — "the enter bloom REVERSED: the SAME three coupled
channels" on one clock, by its own comment): it violates law 8 on dialog AND toast. CURE
ORDERED as EXACT TEXT at the FINAL wave set (§9 row 3): the exit decomposes to the fade-led
three-clock grammar (opacity leads on its own ~100–180ms clock; scale follows mild and
never overshoots; the medium relaxes LAST on its own release), popover-class pinned ~180ms,
reka's animation-gated unmount preserved (a @keyframes exit remains — the grammar changes,
not the kind).

### 2.6 The detuned three-channel growth register (corpus feed #11 — the founding demand)

The named choreography for every grow-from-source surface (mini↔full player, dock
grow-to-card, card-window): **blur/medium < geometry < artwork/content**, with the
soft-bitmap tail on the carried art. Anchor timings, corpus: rest→full-bleed flight
[90, 210]ms; collapse morph ~200–250ms with the displacement gate separate (V-A R3/R4); the
dock-expand choreography measured whole at MARKS-C-MUSIC mark 3 — one scalar drives the
body; named channels at fixed onsets (0/+50/+170/+230ms), one shared τ≈55ms ease tail;
deploy arrives near-critical (ζ≈0.96, art-carrier fit) while landing-home arrives at the
dock register (ζ0.83 ×2) — the two-intents split again (`MARKS-C-MUSIC.md:199-205`). As a
manifest this is four channels + onsets — the delay modifier already expresses the onsets;
the H1 ladder (below) is its held-intermediate proof surface. MEASURED CORPUS,
adopted-not-novel: no roster row, one kernel recipe.

### 2.7 The status-migration recipe (corpus feed #17)

Readouts relocate as BODIES, never fade-swap (law 17; the mid-flight capture V-A a1
s8-0294). Kernel recipe: the migrating chip is a follow channel source-routed off the
carrying surface's geometry with a short τ (content-class), riding `useElementMorph`-class
FLIP at the endpoints; its content upgrades IN PLACE on arrival (no skeleton if the value
rode along). Primitive exists on disk (`useDockCtaReceive`, `useElementMorph`); the
contract lands with the census consumer (dock grow-to-card manifest). Recipe here, build at
the wave set.

### 2.8 The drawer velocity-projection cure (corpus feed #3 — EXACT TEXT for the wave set)

The one outright physics contradiction on disk:
`src/components/drawer/composables/useDrawerSnap.ts:361-365` (full path — the earlier pin
dropped the directory segment, corrected `[P3-AGG 2026-07-19]`) advances exactly
ONE detent in the drag direction on a fling, where the corpus projects the target and skips
intermediates (measured 5,900–15,000px/s skips, law 7(c) re-confirmed both directions). The
cure is the spine's own law and ships as EXACT TEXT (§9 row 4):
`target = detentNearest(frac + v·τ)`, τ≈0.2s, applied over the effective ladder; the
dismiss clause (`target <= 0` closes) and the slow-release nearest-detent arm stand
unchanged. τ 0.2s is [DESIGN] within the decayRest family (the same projection class as the
G3 well trigger, k = 1/τ = 5/s); the battery's well truth-table is its falsifiability
pattern, and the drawer band gains a projected-skip row at adoption.

### 2.9 The dock-invariance invariant (CHARTER R-9 — spec-law)

**No page transition may perturb dock geometry, ever** (MARKS-C-MUSIC mark 4: "the
windowing happens BEHIND the dock furniture… Pages are content; the dock is chrome; the two
never share a timeline", adopted verbatim at `MARKS-C-MUSIC.md:240-241`). Single-app
attestation, so spec-law, not codex-law. Kernel consequence: a page-transition spine may
not mount on, write to, or re-layer any dock surface; the dock's own kernel is the only
writer of dock geometry. This is a named invariant for the census consumers and a review
gate for every grow-to-card manifest.

## 3. Substrate relations — the no-second-authority section (worklist item 7, carried verbatim)

Substrate relations, sworn: kf `Draggable` (scrub regime) and `SpringProgress` (glide) are
consumed, never wrapped; `springPresets` stays the single named-register authority with
per-surface pairs at the presets-in-consumers seam (F3 G1's cure carries over);
`useLeadTrail` stays shipped as the N=2 primitive and is expressible as a two-channel
manifest (probed — source routing load-bearing); `useDockSpring` stays for single-scalar
single-law surfaces. The fence holds, its letter sharpened so it keeps bite
`[P3-AGG 2026-07-19, CRIT-SPINE minor 7]`: the kernel mounts only where ≥2 NON-IDENTITY
channels with different laws follow one gesture scalar, OR one non-identity channel plus
the domain register in use. Identity plus a lone light rim does NOT qualify — the Maps
fixture mounts as a battery HARNESS under this fence, never as a census precedent; Carousel
stays excluded even the day it gains a light channel.

"Consume SpringProgress" defined per register (F3 OG4, closed): the IDENTITY channel rides
the closed-form SpringProgress parametrization (ω = 2π/response — `springSampler` in the
kernel block is that closed form); EXTRA sprung rack channels ride the kernel integrator
(semi-implicit Euler ×8) under the useLeadTrail-class license, direction pair latched at
drive. The lead-trail expressibility row runs in the union battery (trail never leads
through the rise; joint park).

Seams out (binding): **F4** — the spine registers as the scope's spring source at every
release and passes finger-space velocity (the gauge seam; a carrier that does not is a
build failure); **F5** — medium writes route through `claimMediumWriter` (one writer per
region, R3); the light-channel var is read by the F5 layer and nobody else paints it.

## 4. The compositor-first invariant, re-sworn once

The hot-path vocabulary is transform / opacity / filter **plus clip-path on the growth
channel** (the REGISTRY PASS-2 amendment, carried): R5 Chrome residency GREEN (0 paints
intersecting the card body across six growth windows, 0 in-flight frames >24ms) — no
revert. Pass-3 residency note `[P3-AGG 2026-07-19, CRIT-SPINE minor 3]`: the order-10
GREEN-B re-run recorded a residual ~2/frame doc-level Paint pair (`#document`+`HTML`,
~0.25ms/frame, total 12.8ms per 520ms window; `mapsSurface` attribution 13 ≈ 25% of growth
frames — under the ≥50% revert trigger, 0 tasks >24ms) — cheap, bounded, watched, not a
revert; WebKit residency attribution stays TOOL-DEFER (Web Inspector), cost-bounded
meanwhile (flick-open max 19ms, 0 >24ms at 67Hz). The revert clause stays armed as written
(per-frame main-thread Paint on ≥50% of growth frames → reserved-footprint transforms +
counter-transform). The medium rides element OPACITY over a constant blur radius — never an
animated radius (H4/#8, answered in WebKit paint on both parents' video paths).

## 5. The union battery (worklist item 2 — ONE battery)

`check.mjs` extracts SC-KERNEL and SC-BANDS from `index.html` (the exact shipped code and
bands — zero drift on either; printed = gated, the F3 G8 discipline family-wide; the LIVE
pin cells gate two-sided against these same printed bands as of `[P4-AGG 2026-07-19]`,
CRIT-KERNEL M-A). **87 gates + 1 info, all PASS** as of the pass-4 agglomeration
(`[P4-KERNEL 2026-07-19]` 71 → 86; `[P4-AGG]` +1 domain-fence gate = 87). Composition:

- **Register arithmetic (10):** the R-1/R-2/R-3 rulings as falsifiable gates (pair
  identity, f_d brackets, zero-seed overshoots, k·v gain, orb flight, the [0,10%] fence
  swept over every row, depth grade 1.20 exact).
- **The spine (28):** overpull return + flung landing (C2 parity on the converged register)
  + pin (C3 bounds) + the G3 catch with its 10-row truth table + the intent law (6) + C1
  retarget continuity (2) + rubber/breathe (3 — the ONE side-breathe constant, OG3 closed:
  0.036/0.964 = +3.73% inside [3.4, 4.1]%, with the page's rect-read live cell beside it).
- **The rack (31; 10+28+31+2+7+9 = the 87 headline — the pass-3 count 10+28+31+2 = 71 was
  corrected `[P3-AGG 2026-07-19, CRIT-SPINE minor 1]`, grew the two pass-4 cure sections
  below, then +1 M-2 domain-fence gate `[P4-AGG]`):** open (medium cliff, content, geometry t99 + s90, periphery lag, light
  lead/hold/cool, joint park) + close (content out, emergent beat, medium gone) + the UNION
  interrupt scenarios — held arm (medium min 1.0000, region-asserted, steps law-bounded)
  AND dip arm (medium min 0.5353 in [0.40, 0.85], re-settle) — + sub-sat scrub arm + tempo
  invariance + 60Hz continuity + PRM one-poll + the G6 latch pair + H3 lens-clock
  (REG-LOCK demonstration, out of the corpus headline — F3 OG2) + lead-trail + the
  sat×source fence.
- **The dialect adjudication (2):** §2.2's decisions, run live — the superseded arms fail
  or lose on the declared metric IN the battery, so the choice is falsifiable, not taste.
- **M-1/D2 park-mid-scrub (7) `[P4-KERNEL]`:** the park-is-real precondition + aged release
  velocity + closed-form decay parity + geometry peak (pre-cure 1.0401, post 1.0007) + the
  no-hold falsifiability guard (bought velocity must still buy overshoot) + the two minor-5
  gesture-scoped-arming rows. The still-hold row also gates LIVE on the page.
- **M-2 domain.wells seam (8) `[P4-KERNEL]`:** kernel-owned catch/dwell/onward + scrub-cancel
  with C1 recapture + dwell-preserves-gesture-intent with its monotone guard + the no-wells
  passthrough (an undeclared domain costs nothing).

Dedup ledger and retired rows: PROBE-NOTES §3 (the parent batteries' every row is mapped —
kept, merged, re-derived, or retired-with-register).

## 6. The manifest census (worklist item 3) and migration order

The F3 §7 census re-stated against the merged manifest shape — six mount points, manifests
≤5 lines each, now with the domain block available where a gesture owns the surface:

| consumer | manifest sketch | notes |
|---|---|---|
| Drawer | domain {ladder detents, rubber, wells:none} + medium/content/light | FIRST in migration; carries the §2.8 projection cure; its inner-list handoff remains F2's named native-arm candidate (bank unchanged) |
| Dialog / sheet + ModalOverlay | the three N2 permutation manifests, popover-class close (no beat) | consumes §2.5's exit grammar |
| CommandDialog | `--scrub-t` master: slab+dim+blur+push off one scalar; fixed release pop | the Spotlight grammar (corpus feed #9) rides after the F4 scalar contract |
| dock grow-to-card | the §2.6 detuned growth manifest + §2.7 status migration + §2.9 invariance gate | the H1 ladder's real growth surface (worklist item 6) |
| SegmentedTabs lens bar | the slot-axis lens configuration (§7.1) with F5 | the shared integration artifact |
| ExpandableContainer | conditional — mounts only when its content graduates to ≥2 channel laws | fence-honest |

Named NON-consumers with reasons carry over verbatim (Carousel single-scalar, HeaderRibbon
scroll-mapped, one-shot overlays → the degenerate CSS manifest). Migration order kept:
Drawer → Dialog/N2 → CommandDialog → dock grow-to-card → SegmentedTabs-with-F5.

## 7. The transferred probe obligations (the merge-seat burden, named and owed)

These are pass-3 integration work; nothing here is claimed proven by this spec:

1. **The slot-axis lens artifact** (R2's fixed acceptance set, verbatim): ≥3 wells;
   velocity-seeded travel; the momentum tick (jumps ≥2 slots tick intermediate wells via
   the [DESIGN] catch scheduler, gated against the N3 tick-vs-budget test — a 4-slot jump
   must not feel slower than its 500ms control-register budget); C4/C5 as binding laws
   (one-body platform grammar; mid-cool re-seat C¹ on the lens body); F5's fence anatomy as
   the light body with the sibling gate pixel-sampled ≥4.5:1 at bloom peak on both engines
   (the analytic model recalibrated per engine FIRST — the Chrome 15:1 vs predicted
   ~4.2–5.5 defect). PLUS the R-9 destination-charge row: the DESTINATION press-charges
   before travel (+70% slot redness over ~83ms class, Music) where Find My charges the
   source — both charge sites in the acceptance set. The suffusion G-row contract, N3, and
   N5 consolidate their evidence here.
2. **R4 cross-surface composition** — one spine per surface, coupling only through
   channels/followers, exercised against the f-0097–0117 three-concurrent-spine Find My
   swap.
3. **The H1 card ladder on a real growth surface** (drawer or dock grow-to-card manifest),
   scrub-coherent at held intermediates, resolving F3's H1-consumed contingency; clip-path
   ruling per §4.
4. **The merged page's paint run** — the QUEUED-PAINT ledger in PROBE-NOTES §5 joins the
   §O-3 serialized browser arm (order 9's class): both engines, video path for WebKit
   material, `?hud=0`, captures stamped and paired.

## 8. The G-series carry — every parent cure alive in the merged artifact

**F1:** G2 band law (every band source-labeled — carried into SC-BANDS whole); G3
projected-momentum catch (the 10-row truth table runs verbatim; one landing metric, the
park epsilon both sides); G4/H1 clip-path ruling (§4); G5 the ONE occupancy rule (§2.1); G6
intent law (§1.2); G7 PRM scenario-target fix (the page's `scenario(target, fn)` carries
it); G8 H3 demotion (clocks+seam only — the H3 battery rows are REG-LOCK demonstrations);
G9 H6 cession to F4 (§3 seams; the word ACCELERATION stays struck); G10 CSS-arm restriction
(+ R2 probe carried); G11 the two asymmetries separated (§1 domain comment); G12 the C2
register adoption — now superseded upward by R-1's convergence (one register instead of
two).
**F1 OG closes:** OG1 — the −21% height-compression constant RE-GRADED [DESIGN] (the
licensed alternative; no bound-compression register is minted, so X2 §8.1 stays dissolved
with the travel-squish fence standing); OG2 — the dip-min band retagged (battery row);
OG3 — ONE side-breathe constant with derivation + check band + live geometry cell; OG8 —
the μ pair re-graded [DESIGN], separation law kept; OG9 — superseded by absorption: the
reverify verdicts are folded into THIS spec's evidence lines, and SPEC-F1 is history.

**F3:** G1 per-surface pair pinned (§2.2 CC rows); G2 inherits ruling + price card (§1);
G4 sat modifier + sub-sat gate (§2.1); G5 delay-gate semantics (§1.1); G6 direction latch +
falsification-proven gate (battery); G7 normalized depth grade (battery, 1.20 exact); G8
one BANDS block (SC-BANDS); G9 paint-side sampling mode (the page checkbox re-points the
recorder at computed style — scrim opacity, row-0 translateY inverted, rail opacity, light
opacity); G12 census (§6); G13 hygiene (parked badge poll, tempo rebuild carries velocity).
**F3 OG closes:** OG1 — §1.2 is the ONE merged intent/direction section, dither row in
battery; OG2 — the og band's source restated (C6-checked) + H3 rows labeled REG-LOCK
demonstration and excluded from the corpus headline; OG3 — the sat×source fence with its
check row; OG4 — "consume SpringProgress" defined per register (§3).

## 9. The FINAL-wave-set orders from this spec (EXACT-TEXT class; src untouched until then)

1. ~~`springPresets.ts`: dock row response 0.30 → **0.35** (ζ 0.82 held)~~, + the **panel**
   {0.40, 0.71} and **orb-drop** {0.22, 1.0} rows with the charter's comment texts (R-2/R-3
   verbatim). Consumers update per the consumer-updates ruling.

   > **[2026-08-10 · BK #67 W-2 · lane α unit-2] The dock half of row 1 is SUPERSEDED AND CLOSED
   > THE OTHER WAY; the panel/orb-drop halves LANDED.** #26 W-SPRING-RETUNE shipped the dock row
   > as **{0.30, ζ0.88}** (`springPresets.ts:84-87`, verified on disk this seat) — not 0.35/0.82.
   > The order is not re-issued, because the landed pair was measured **corpus-truer than the one
   > this row asks for**. At MARKS.md C2's own measured crossing velocity (570px/s of ~870px), on
   > C2's own fit window ("tail from rest-crossing", n=21, ζ 0.77–0.88, f_d 1.38–1.80Hz):
   >
   > | quantity | MARKS C2 datum | {0.35, ζ0.82} | **{0.30, ζ0.88} (landed)** |
   > |---|---|---|---|
   > | peak overshoot | +11px | 13.26px (+20.5%) | **10.88px (−1.1%)** |
   > | overshoot per crossing vel | 0.02 s (data 0.019) | 0.02327 s | **0.01909 s** |
   > | settle \|x\|<3px from crossing | 183ms (model 169–183) | 193ms | **161ms** |
   > | extremum dwell | ~50ms | 43ms | **41ms** |
   > | second excursion | none ≥1px | 0.0000px | **0.0000px** |
   > | f_d | tail bracket 1.38–1.80Hz | 1.6353Hz | **1.5832Hz** |
   >
   > Every figure produced by `prototypes/spine-conductor/check.mjs` this seat, never quoted. The
   > register gate no longer names a pair at all: it reads `springPresets.ts` off disk (SPEC §3's
   > single-named-register-authority law) and reds on drift from either side.
   >
   > Rows 2 and 4 are likewise closed without a byte — see their own brackets.
2. `scheme-spring.css`: ONE regen pass re-deriving the header + curves from
   `SPRING_PRESETS` (the no-second-authority root) — kills the stale "dock: (0.68s,
   ζ=0.64)" comment at `scheme-spring.css:31` and lands the new rows' curves in the same
   stroke (R-4).

   > **[2026-08-10 · BK #67 W-1 residue · lane α unit-2] DONE — nothing owed.** Detector, real
   > exit code: `node scripts/regen-spring-tokens.mjs --check` → **exit 0**, emitting
   > `--spring-dock: response=0.3s, ζ=0.88, settle=0.21s`. The refuted `{0.68, 0.64}` header is
   > gone from `scheme-spring.css`; the generated job table at `:44` carries the landed rows.
   > This is what retires **DOC-TRUTH T1** by the `FINAL.md:32` seam clause's own first branch.

3. `animations.css` `glass-reveal-out`: the mirrored exit decomposes to the fade-led
   three-clock grammar per §2.5 (keyframes kind preserved for reka's unmount gate).

   > **[2026-08-10 · BK #67 W-6 · lane α unit-2] STANDS OPEN, and the byte is REFUSED-ON-FENCE,
   > not on merit.** The surface is live and unstarted — `src/styles/animations.css:157`
   > (`@keyframes glass-reveal-out`) with its reduced twin at `:186`, and the mirroring
   > commentary it must stop being at `src/styles/glass/reveal.css:174,188`. That path is outside
   > lane α's stated fence (`src/components/dock/**` · IOS27-MICRO surfaces ·
   > `src/components/search/**` → `src/composables/search/` · docs canon/relay), and three lanes
   > were writing this tree concurrently while this seat ran. One driver word ("α owns the #67
   > src surfaces") lands it; the census above is the whole of the scouting it needs.

4. ~~`useDrawerSnap.ts:361-365`: the velocity-projection cure per §2.8, verbatim formula.~~

   > **[2026-08-10 · BK #67 W-6 · lane α unit-2] DISCHARGED BY SUBTRACTION — the surface is
   > gone.** Detectors, both empty: `find src -name 'useDrawerSnap*'` and
   > `grep -rn 'useDrawerSnap' src/`. `src/components/drawer/` does not exist either. The drawer's
   > private register died with it — `springPresets.ts:138` records `DRAWER_SNAP` as *"DISCHARGED
   > BY SUBTRACTION: the sheet's detent engine names `bloom` and `dock` from this table, so the
   > private seventh register died with the file that held it rather than being ratified into
   > one."* There is no velocity-projection cure to apply and no file to apply it to. This row
   > closes; it is not carried.

5. The `--scrub-t` publication name + channel-var names land with the registry sync (H-4);
   `--gl-t` dies, no alias.

   > **[2026-08-10 · BK #67 W-2 · lane α unit-2] half DONE by subtraction, half born-RED and
   > UNSTARTED.** `grep -rn -- '--gl-t\b' src/ demo/` → **empty**: the name to kill is already
   > dead and no alias was left behind, so the clean-break half needs no act. `--scrub-t` is
   > **0 files in `src/`, 0 in `demo/`** — it publishes with the kernel port, which has not
   > landed (see the W-2 port-readiness ledger in this unit's RECORD).

## 10. Honest remainders (worklist items 9–10 — carried, never upgraded)

- PRM/park unification: DONE in the kernel (one-poll seat, frozen ticks, joint park; node
  row green) — the both-engines LIVE re-run rides the paint queue.
- TOOL-DEFER: WebKit recalc/residency attribution (Web Inspector class); the merged page
  inherits the same stamps — the campaign-level Web Inspector session or explicit park
  remains the §O-4 decision, not this spec's.
- DEVICE-DEFER: iOS touch rubber-band, real-device Safari everything; the F2 bank holds
  exactly as ruled (re-evaluates only at the device lane + this census — §6 names the
  drawer's inner-list handoff as the standing native-arm candidate).
- BLOCKED-BY-CORPUS: U13 rubber-band ratio c≈0.55 stays [DESIGN] (C1 — unmeasurable without
  a touch-indicator recording; the MARKS note is the §O-4 rider).
- The light channel's PAINTED truth (bloom overshoot, sibling legibility under the cream
  rim) is F5's lane on the shared artifact — this spec ships clocks and node evidence only.

## Honesty line

This seat drove no browser. Evidence produced this session: the merged prototype and its
node battery (71/71 + 1 info at the pass-3 write `[P4-AGG 2026-07-19: historical figure —
the battery now stands at 87/87; CRIT-KERNEL minor 1]`, output banked in PROBE-NOTES), run
against the exact shipped
blocks. Every corpus figure cites its organ; every derived spring figure was recomputed by
the battery's own arithmetic helpers, not quoted. The adjudications (§2.1, §2.2) were
decided by battery rows that could have gone the other way — the superseded medium arm
FAILS a real band and the superseded content arm loses on a metric declared before it ran.
Paint claims are queued, not asserted; the parent prototypes and specs stand untouched as
pass-2 evidence.
