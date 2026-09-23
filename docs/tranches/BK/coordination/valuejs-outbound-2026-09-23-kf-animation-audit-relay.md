SERVED MODEL: claude-opus-5-5

# O-60 — keyframes.js · the frame-by-frame animation audit's glass-touching rows (33 of 228)

**From**: value.js tranche X orchestrator (COHESION §0bn, 2026-09-23) · **To**: glass-ui BK dir, for BL · **Mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-kf-animation-audit-relay.md`, byte-identical.

The owner, verbatim: *"Mark that most of the animations are broken, like the amiga animation does not layer and compose properly--audit every animation and frame by frame thereof, too."* and *"route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root."*

The full register (228 rows, headed real-GPU frame captures of keyframes.js at kf `d78bed01`→`57b4815c` on glass 7.0.0) is `value.js/docs/tranches/X/keyframes/audit/KF-ANIMATION-AUDIT.md` (commit `728f82c6`); capture scripts and logs under `value.js/docs/tranches/X/keyframes/evidence/animation-audit/` (frames on disk, not committed). These are the rows whose cause cites glass-ui bytes — please rule each at the root (some are consumer-shared; the row text names the split). Heaviest cluster: the **dock morph** (KFA-7, -8, -13, -50, -51, -52, -53, -109, -110, -111, -112, -189, -221, -222): first-expand inside an 80 px plate, wrap-then-snap on a 0.5 px under-measure, the crossfade's leaving row wrapping, whole-dock blur held through the settle tail, negative corner radius on spring overshoot, the collapsed Play moving 58–77 px under the press.

| Row | Severity · title |
|---|---|
| KFA-7 | BROKEN · The collapsed transport face overflows its pill: Play hangs outside the glass and the channel name spills across a 56 px circle |
| KFA-8 | BROKEN · First expand after load morphs inside an 80 px plate: the row wraps into a 4-row column spilling past the glass, then snaps to 536 px |
| KFA-11 | BROKEN · EasingPicker is crushed into a ~41 px thumbnail curve in both hosts (Curve tab and TimingFunctionPanel) |
| KFA-13 | BROKEN · Pressing the collapsed transport pill's Play does not play: the hover-expand moves Play ~58-77 px within 60 ms, so the press lands on the Select trigger or is cancelled |
| KFA-23 | HIGH · Cold load: a page-wide 1.9-2.5 s main-thread stall (a FrameRequestCallback in glass-ui's useRAFLoop chunk) freezes the cube's attitude settle mid-sweep, which then snaps |
| KFA-27 | HIGH · The skeleton shimmer does not reach the plate for ~1.4 s after mount, so a real cold load shows a static blank plate and is gone before the first sweep |
| KFA-37 | HIGH · Dragging a handle past y∈[0,1] re-fits the viewBox mid-gesture: the whole plot slides ~12 px under the hand and the handle drifts off the pointer |
| KFA-50 | HIGH · Dock morph crossfade is layered wrongly: on every collapse, the leaving row wraps into a vertical column that spills ~150 px below the capsule while the summary glyph double-exposes over the label ('H⌂me', 'C[glyp |
| KFA-51 | HIGH · Every expand morph wraps the last control to a second row (a 0.5 px under-measure), then snaps back at settle |
| KFA-52 | HIGH · The staggered child reveal is swallowed by the controls' own opacity/scale CSS transitions (the two are applied on top of each other) |
| KFA-53 | HIGH · The dock morph blurs the whole dock and holds the blur through the settle tail; the collapse end pose is a squared, soft rectangle that snaps to a sharp circle |
| KFA-61 | HIGH · The scrub rail looks greyed out and disabled: no elapsed fill and a near-invisible thumb (the owner's "timeline is always greyed out") |
| KFA-74 | MEDIUM · A one-shot 0.75-1.05 s page-wide freeze ~8-11 s after load stops the hero wave mid-cycle and swallows glyph lifts (a synchronous GPU readback in the dock's luma sampler) |
| KFA-78 | MEDIUM · More than half of every 5 s shimmer cycle is a dead, frozen plate between sweeps |
| KFA-95 | MEDIUM · Arrow/Home keys are handled twice, by the focused widget and by the global transport shortcut (Square's box turns magenta and stays; the ribbon playhead lurches +2 steps at random) |
| KFA-109 | MEDIUM · The dock's staggered onset order is non-monotone: hidden separators and a stray span take nth-child slots, and @mbabb falls outside the ladder |
| KFA-110 | MEDIUM · During expand the dock's row content paints outside the glass plate (a counter-scaled full-width row over a narrow plate) |
| KFA-111 | MEDIUM · Spring overshoot drives the dock's wrap-mode corner radius negative: square corners flash at the end of every expand |
| KFA-112 | MEDIUM · The dock collapses under a resting pointer after a Scene select, Controls select or @mbabb menu closes |
| KFA-115 | MEDIUM · The dark-mode switch is out of sync: the plate snaps dark while label ink fades through the plate's luminance, so Scene and Keyboard vanish mid-swap and @mbabb keeps a light pill |
| KFA-132 | LOW · The aurora's resume() clock resets to t=1 s instead of continuing, so the field snaps back after every pause, tab-hide or off-screen resume |
| KFA-133 | LOW · The aurora placeholder ground does not match the first canvas frame, so arming cross-dissolves between two different compositions |
| KFA-134 | LOW · The hero wave's claimed in-content pause (`--motion-weight: 0`) cannot be reached from any UI, so the infinite wave can only be stopped by OS reduced-motion |
| KFA-136 | LOW · Scene-swap direction types are derived but nothing consumes them: the swap would be the bare UA 250 ms fade plus a 34 px incidental morph |
| KFA-163 | LOW · Select dropdown content never slides: its translate is pinned at `0 4px`, while menus and popovers slide 8 px |
| KFA-164 | LOW · Occasional 1-4 frame hitches ~100 ms into an overlay's enter (mostly within baseline noise) |
| KFA-168 | LOW · The glass-ui `--spring-smooth` curve jumps to its end value in the final frame (a 4× velocity spike) |
| KFA-188 | MEDIUM · Bézier handles and endpoints at x=0 or x=1 are half-clipped by the svg viewport (the viewBox has no x padding) |
| KFA-189 | MEDIUM · The collapsed-face Play is squashed into a 32×40 vertical capsule, different from the expanded 40×40 circle, and the two crossfade over each other on every morph |
| KFA-202 | LOW · The skeleton sweep is a dark, low-contrast shadow band, not a light sheen |
| KFA-221 | LOW · After collapse, the dock's spilled leaving layer stays in layout (~150 px below the capsule) for ~2 s after it has visibly faded |
| KFA-222 | LOW · The collapsed transport pill hover-scales to 1.1, and the expand morph then starts from that scaled box (the height drops 61.6→56 in one frame) |
| KFA-228 | LOW · The easing select trigger shows the name and description run together ('ease-in-outslow start & end', 'cubic-beziercustom curve') |
