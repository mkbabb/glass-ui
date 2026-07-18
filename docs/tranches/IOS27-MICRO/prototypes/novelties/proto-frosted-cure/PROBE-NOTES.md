# PROBE-NOTES — PROTO-FROSTED-CURE (R-TABTOGGLE · R-TABS · R-SLIDER · R-EFFERVESCE)

verified-model: claude-fable-5 (system-context model ID, verbatim). Seat novelty:PROTO-3,
IOS27-MICRO novelty loop, 2026-07-18.

Artifact: `index.html` (this directory)—one self-contained standalone file, no build, no
network. Battery: `node check.mjs` — **ALL CHECKS PASS** (60 gates: register bands, defect
pins, the idle-light law, CSS single-source cross-checks, the law-14c sim, the analytic
legibility floor, the discipline fences). Both inline script blocks parse under node vm.

## What the prototype claims

THE GOAL OF GLASS, executed as a register cure: the three user-named defective surfaces
(F5's tabs-toggle POOR; F4's tabs trite/shiny/bright; the slider too shiny) re-registered to
BLURRED-FROSTED on one before/after page—same backdrop per stage, both themes—with the
frosted register DERIVED from F1's good glass, and every specular/light overlay audited to
engagement-only. Plus R-EFFERVESCE: the pop-over retuned to the law-14c release-spring
register (EXEMPLARS-2 V3, NOVELTY-ROSTER card 10).

## The cure recipe (extracted from F1, the good referent)

| leg | F1 source | cured value (dark / light) |
|---|---|---|
| container blur | `f1-scalar-spine/index.html:110` `blur(22px)` | 22px / 26px |
| container saturate | `f1:111` `saturate(1.35)` | 1.35 / 1.5 (licensed under the white diffusing tint, codex law 10) |
| tint does the depth work | `f1:109` low-luminance gradient `.52a→.66a` | warm-shifted `rgb(56 50 44/.55)→rgb(36 32 28/.68)` / cream `.62→.72` |
| rim | `f1:112` hairline `inset 0 0 0 1px white/0.10` | 1px ring `.12` / warm-dark 1px `.14` — never 1.5px, never .45 |
| control tier | MARKS §4:151-153 (brighter, more opaque, own rim) | warm gradient `.20→.12` + one 1px top rim `.22`, blur 12px, NO brightness leg |
| light | MARKS §4:174 engagement-only | every overlay = pure function of `--engage-t`/`--energy`, zero constant term; hue = house warm cream (42° hsl), never cyan |
| licensed idle motion | NOVELTY-ROSTER:308-310 (~8s sweep, one per view) | 8.4s, active capsule only, peak alpha .12, PRM-dead |

## The register delta — the exact CSS causes of the named defects (pinned in check.mjs)

- **F5 tabs-toggle POOR** (`prototypes/f5-optical-medium/index.html`): container `blur(7px)`
  (:69—mirrors the shipped resting 7px; too thin to mush the backdrop into color masses, the
  bar reads as smoked plastic); `--glass-specular: inset 0 1.5px 0 0 white/0.45` on every
  tier at idle (:72—a wet-gloss lip, not the licensed ~1px hairline); control
  `brightness(1.1)` (:71—frost diffuses, it never amplifies); idle sweep at 5.6s
  (:181-182—busier than the ~8s license); cyan light tokens (:203-252—off-palette).
- **F4 tabs shiny/bright** (`prototypes/f4-energy-field/index.html`): `saturate(1.65)` (:81);
  border `white/.13` + inset rim `white/.20` stacked (:83-85—a double-lit edge); the lens a
  white pill at idle (`.15` fill + `.24` border + `.30` rim, :88-92); cyan overlays.
- **F4 slider too shiny**: near-opaque white fill `.95→.78` (:218-219—gloss slab, the
  backdrop dies under it); IDLE knob-ring glow `0.12 + 0.88·E` (:229-234) and IDLE cyan cast
  `0.25 + 0.75·E` (:224-227)—both violate MARKS §4 note 3 outright.

The BEFORE columns reproduce these registers VERBATIM (literals pinned by check.mjs so the
defect column can never quietly improve). The F4 tabs' wash/bloom were already θ-gated
(idle 0)—F4's tab defect is the static register, not the overlay law; the slider carries
both defect classes.

## Mechanisms on the page

1. **Stage law**: each cure target sits before-over-after on ONE shared backdrop—vivid color
   masses + a fine stripe lattice (the blur tell: 7px keeps stripes legible, 22px mushes
   them) + a 13s drifting ferry disc (backdrop liveness on the video path; PRM parks it).
2. **Both themes**: plain per-mode arms on `body[data-theme]`—no `light-dark()` anywhere
   (the inset-shadow trap). The light arm is the codex law-10 frost class: warm diffusing
   tint ~.62-.72 alpha, blur raised to 26px, dark warm text. The BEFORE columns keep their
   as-built dark-only registers in BOTH themes—F4/F5 shipped no light arm; that asymmetry
   is itself evidence, stated on-page.
3. **Engagement plumbing**: `--engage-t` (attack τ60ms / release τ180ms exponential, per
   press) and `--energy` (`tanh(|v|/1000)`, τ120ms decay after release) written by one
   conductor rAF that parks at idle (`rAF parked` readout). Lens travel on the dock register
   (0.30, ζ0.82) via the F1 closed-form sampler; identical physics both rows—only the
   MATERIAL differs.
4. **R-EFFERVESCE**: after = law 14c—60ms latency, spring (0.30, ζ0.80) with v0 26 seeding a
   velocity-BOUGHT 9.1% single overshoot (intrinsic at v0=0: 1.5%—the sim proves the law's
   "never intrinsic" clause), second excursion 0.14% (invisible), flight 299ms incl.
   latency, fade 150ms = geometry·0.6 ≤ 1/φ, one 80ms arrival rim beat cooling over 240ms.
   Before = the off-register for contrast: ζ0.45, 20.5% overshoot, visible 4.2% return
   bounce, fade=geometry, a rim that never cools. Both measured LIVE from the same sampler
   and chip-checked on-page.
5. **The specular audit table**: every `[data-audit]` overlay's computed opacity read ONCE
   at load—cured rows must be exactly 0; the two before-defect rows must be 0.12/0.25; the
   sweep row is LICENSED (8.4s, one per view).
6. **Capture run**: one button drives a deterministic sequence (toggle presses, tab hops,
   slider sweeps, both pop-overs) so the video arm captures one comparable pass per theme.

## check.mjs — the node-verifiable invariants (all green)

- Register bands vs the F1 referent (blur, saturate, rim px/alpha, fill alphas, tint band).
- Defect pins (the before column cannot drift): F5 7px/1.5px/.45/brightness 1.1/5.6s;
  F4 1.65/.95/.12/.25.
- The idle-light law: every cured overlay expression evaluates to 0 at (0,0); engagement
  legs still fire (wash .45 at full engage, ring .85 at full energy, bloom dark below θ_g 0.30).
- CSS single-source cross-checks: the style block literally contains the token values and
  the zero-constant `calc()` forms; exactly ONE `cure-sweep` binding, PRM-dead.
- Discipline fences: no `@supports … backdrop-filter` (the lying gate), no `filter: url(`,
  no `light-dark(`, no cyan hue inside any cure rule, no `getBoundingClientRect` inside a
  rAF job, backdrop-filter never transitioned/animated.
- The law-14c sim (1ms deterministic) + the analytic legibility floor: white-on-cured-dark
  9.13:1, dark-on-cured-light 12.08:1 (declared-constant composite model, the F5 pattern).

## QUEUED-PAINT — every paint claim, deferred to the serialized browser arm

Screenshots are backdrop-filter-blind on Playwright-WebKit; the VIDEO path is the honest
organ (`safari-arm.md:22-31`). Queued, both engines, both themes:

- **QP-1 the frost read (the claim itself)**: paired video, before vs after per stage. The
  stripe lattice must be LEGIBLE through the b5 bar (7px) and MUSHED through the cure bar
  (22/26px); the ferry must read as a soft color mass through the cure at all times.
- **QP-2 idle darkness**: 10s idle video—no light change on any cured surface except one
  8.4s sweep pass on the tabtoggle capsule. The before column shows the 5.6s sweep + idle
  ring/cast for contrast.
- **QP-3 engagement light**: press/travel/release per target—wash/bloom/ring fire warm
  cream during the gesture and die at settle (compare the before column's idle floor).
- **QP-4 sibling legibility**: text contrast on the cured bars at bloom peak, both themes
  (the analytic 9.1/12.1:1 model is the bracket, paint is the gate).
- **QP-5 the effervescence register**: 60fps-class capture of both pop-overs—the after must
  show ONE overshoot and a one-beat rim; the before's double bounce and lingering rim are
  the contrast.
- **QP-6 the micro-demo referent**: the cure bar filmed beside the micro demo's good
  register (the user's paint-side referent)—a judgment call the node battery cannot make.
- **QP-7 cost**: a trace across one capture run—no long-frame regression vs the before
  column (the cure REMOVES gradient paint; it must not add cost), rAF parked at idle.

## Known dishonesties, stated loud

- **The legibility numbers are an analytic model** (declared scene luminances 0.10/0.55,
  luminance-space compositing), not a paint read—QP-4 is the gate.
- **The audit table reads computed style, not painted pixels**—a blend-annihilated overlay
  would pass it while glowing in paint (the σ8 class). QP-2/QP-3 are the paint truth.
- **The before columns run in both themes though F4/F5 were dark-only builds**—their light
  -theme appearance is extrapolation, not a reproduced verdict; the pinned literals are the
  reproduced part.
- **The sweep alpha "peak .12" is a token claim**; the gradient's painted peak under
  plus-lighter-free compositing is close but QP-2 judges it.
- **`-webkit-backdrop-filter` prefixes are belt-and-braces** for standalone file:// opens.
- **The stage shows 4-6 concurrent backdrop surfaces** (before+after visible at once)—a
  comparison-page budget, not a shipping layout; the cure itself adds zero layers over the
  before register (check.mjs perf fences + QP-7).

## Out of scope

The shipped `src/styles/tokens/glass.css` resting-7px ladder is IMPLICATED by this cure
(F5 mirrored it faithfully and was judged POOR)—re-tokenizing the shipped ladder is BJ/
component-pass work, not this prototype's. The lens choreography itself (charge/travel/
oversize) stays F5's; this seat cures only the MATERIAL register. The momentum drawer
(R-MOMENTUM) belongs to PROTO-CONSTELLATION per the roster's §4 seat split.
