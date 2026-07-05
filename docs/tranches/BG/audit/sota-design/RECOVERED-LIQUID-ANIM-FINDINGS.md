# SOTA liquid-animation audit — RECOVERED findings (the ONE lane that completed before the run was killed 2026-07-04)

The audit was stopped (redundant with the prior iOS27-MOTION-TRUTH + no-fallback analyses). Of 13 findings, ~8 VALIDATE existing waves; the 5 NEW high-leverage ones are folded (see §DISPOSITION).

## [1] overlay enter/exit (Dialog·Popover)
- **now:** ENTER bloom now PAINTS both engines (scale 0.93/0.83->1 + blur 4->0 + opacity, 6-31 intermediate frames, +3% interior overshoot — PAINT-PASS-LOG F5.R1), but EXIT paints 0 frames on Dialog+Popover both engines/modes: reka usePresence (Presence/usePresence.js:44) unmounts when animationName==='none', and .glass-reveal's exit is a CSS transition; scrim reaches 80% dim at ~257-392ms vs the reference ~100ms
- **target:** iOS-27 sheet class: exit ~130-150ms squish+fade, >=4 painted frames, zero overshoot-past-gone; scrim >=80% dim within ~100ms of launch, released WITH the exit (one gesture one clock)
- **lever:** @keyframes glass-reveal-out (scale/opacity/filter on --ease-out <=150ms) on [data-state=closed] so reka awaits animationend (the Sheet sheet-animate precedent); couple the reka DialogOverlay dim to the launch window. Owned by F5.R1 W-OVERLAY-ENTER-PAINT (PENDING, fix owed) + 17.4 congruence

## [2] sheet/bloom overshoot assignment
- **now:** bouncy (+9.5%, springPresets.ts) rides dialog/success entrances while every iOS-27 reference sheet/bloom/drawer-seat arrival is MONOTONIC (zeta~0.85-1.0, zero overshoot — IOS27-MOTION-TRUTH §1 binding assignment); the SPRING_PRESETS [0,10%] band itself is correct
- **target:** overshoot only on small-element entrances (+2-5%) and the tab-arrival glyph pop (~+6%); sheets/blooms/drawers critically damped
- **lever:** per-surface register ASSIGNMENT (dialog/sheet enter -> snappy/smooth; bouncy reserved for small emphatic one-shots), never a SPRING_PRESETS table retune — F5 motion band (F5.2 sweep weighs it; motion-truth §5 calibration note is the authority)

## [3] pull-to-morph tab gesture
- **now:** useDragMorph's architecture (kf Draggable + SpringProgress + tanh useLiquidFlex + decayRest C1 fling) BEATS the published web bar, but three calibration numbers sit under the frame-measured reference: stretch cap 1.11 -> painted aspect ~1.23 vs 1.30-1.35; arrival glyph pop ABSENT; trailing old-label ink fade ABSENT (IOS27 §2.4, the one CLOSE facility)
- **target:** mid-flight aspect >=1.30 re-rounding at arrival <=1px overshoot; +6% linear glyph dip-recover over ~6 frames on arrival; old-label ink fades 370-400ms AFTER spatial arrival on --ease-out; full gesture <=0.45s
- **lever:** F5.2 W-LIQUID-WEIGHT-DEFAULT tabs row: cap 1.11->~1.15 WITH the recorded anti-taffy bbox-fence amendment; one-shot press-register glyph pop (IconChip-reveal precedent, PRM-static); trailing --ease-out EFFECTS leg (P1/P3)

## [4] dock press physics
- **now:** dock controls press on the CSS :active floor only — no spring squish, no interruptible re-seat, no rebound (IOS27 §2.8 ROUGH; D7); the reference press answers in 4-6 frames with an alive rebound
- **target:** press answer <=2 frames, volume-preserving squish <=1.04, velocity-continuous mid-release re-press, +1-2% rebound, darken/specular leg coupled to one --dock-press-t drive
- **lever:** bind useLiquidPress (springPreset('press') 0.2/0.8 — the W-PRESS-UNIFY booked consumer #3) on DockIconButton + the dock control families; CSS floor stays no-JS fallback, PRM snaps — F5.2 dock-hover-press row

## [5] dock morph paint (glyph rigidity + pane overlap)
- **now:** both PENDING with fixes owed (git log e45a3056/9347b945): glyphs scaleX-distort with the plate incl. a standing collapsed-rest sliver, and the pane swap is sequential with a blank-plate dead-zone + box dip below both endpoints — the reference morphs the PLATE while glyphs stay rigid, panes co-present
- **target:** zero glyph aspect distortion any frame (±5% of rest); no >30%-travel frame with empty pill; overlapped crossfade on the ONE --dock-morph-t (leaving persists to t~0.6, entering by t~0.15); box monotonic between pre-measured endpoints
- **lever:** W-DOCK-GLYPH-RIGID (inner content counter-scale calc(1/max(--dock-size-scale,0.06)) or clip-aperture; transform:none at rest) + W-DOCK-PANE-OVERLAP — both drafted IOS27 §4.5, D band, fixes owed on the running build

## [6] drawer snap residue
- **now:** W-DRAWER-PAINT-BIND is DONE (scalar writes, 1:1 drag, release snap paints, DRAWER_SNAP retuned {0.5,0.74} with sanctioned ~3% give) BUT the open-settle and button-driven re-snap POP with 0 intermediate frames at 120fps — only the pointer path calls ensureSpring().reset(live,0); the open-watch and activeSnapPoint-watch set .target without a re-seat (PAINT-PASS-LOG F5.R2 observation)
- **target:** every detent transition rides the spring timeline (~0.3s exponential settle, no overshoot) regardless of trigger path — gesture, open, or programmatic
- **lever:** route the open-watch + activeSnapPoint-watch through the same spring re-seat seam in useDrawerSnap — 17.4 W-ANIMATION-CONGRUENCE one-clock row (already routed there by the paint judge)

## [7] gesture-coupled blur
- **now:** iOS-27 backdrop-blur engage is GESTURE-coupled (<=33ms on a flick, ~0.77s on a slow pull — never a fixed tween; the only sanctioned fixed-clock blur is the trailing ~300ms dismiss de-blur); glass-ui's blur legs are all fixed-clock
- **target:** blur t bound to the live gesture scalar for drag-driven engages (drawer scrim/page-recede, dock expand), fixed-clock blur only on the trailing dismiss leg
- **lever:** read the blur leg off the existing gesture scalars (--glass-drawer-t / --stage-t / --dock-expand-t) instead of a duration — a NEW gap-row (the motion-truth §5 W-BACKDROP-BLUR-ENGAGE note), M/F5 motion band

## [8] glass thickness vs prominence
- **now:** WWDC25 grammar: larger glass = thicker material AUTOMATICALLY (deeper shadows, more pronounced lensing, softer scattering as a control flexes into a menu); glass-ui's deep tier (16px/1.5, inside the Apple band) is opt-in per class — thickness does not track surface prominence
- **target:** menu > popover > button material thickness by construction; a control blooming into a menu gains depth as part of the morph
- **lever:** map the existing --glass-depth inheriting scalar onto the tier ladder (overlay/menu rungs default a higher depth than content rungs; optionally @container-size-keyed) — zero new machinery, F2 glass band

## [9] content-adaptive glass separation
- **now:** useGlassBackdropLuminance is dock-only + demo-private; iOS adapts EVERY floating element (shadows sharpen as text scrolls underneath, light spills from colorful content, per-component light/dark flip) — the overlay band has only the static unconditional darken
- **target:** every floating tier adapts dynamically: luminance-keyed tint + a shadow-prominence leg under busy/scrolling backdrops; sampled accent spill bounded at whisper strength
- **lever:** promote the observer on its booked 2nd-binary trigger (overlay band) + add a box-shadow leg keyed off --glass-backdrop-luma; the sampled light-spill rides the existing --glass-accent OKLab seam — F2 glass band

## [10] contrast metric on translucent plates
- **now:** the house legibility bar is WCAG-2 4.5:1 everywhere; the published SOTA consensus for composited translucent surfaces is APCA Lc (ratio contrast mis-ranks glass composites — Lucky Graphics 2026 practice; the on-glass-fg family was derived against composites but audited in WCAG ratios)
- **target:** APCA Lc >= ~60 body / ~75 small-text audited on the COMPOSITED plate, alongside (never replacing) the AA arm
- **lever:** inline the APCA formula in the pi paint-arm helper (scripts paint-arm / tests-visual readbacks) as a parallel witness — a NEW gap-row, Q band (quality/close gates)

## [11] kinetic audacious type
- **now:** the static half MATCHES/BEATS the 2026 award bar and is machine-locked (sqrt-phi ladder to 352px, -1.5%/1.05 display signature, one-color-event proof:suffuse ledger), but the kinetic half under-delivers in paint: pre-fix the hero cluster read as a plain text fade (IOS27 §2.6); W-ROUTE-ENTER-VISIBLE is now DONE so the substrate exists; SplitChars/useCharStagger have no flagship painted consumer
- **target:** hero display type arrives with gravity — 60-120ms eyebrow->title->blurb bands readable in frames, expo-out/gentle no-bounce on the display tier, >=1 flagship per-glyph sequence entrance (the award-bar words-in-sequence), PRM-static
- **lever:** F7 demo band spend: the redesigned StoryPage carries the entrance beats (F7.1 rider already binds it); stage one SplitChars hero on a flagship route; verify via the landed W-ROUTE-ENTER-VISIBLE frame-series rig

## [12] micro-interaction density
- **now:** the codified rules (proportion fence, one-GL-per-route, one-color-event, one-loop viz discipline, interruptibility as named contract) BEAT the published guidance in specificity, but live density is BELOW the alive floor: the motion-truth ledger opened 5 BORKED / 2 ROUGH and the drain is mid-flight (route+drawer DONE; overlay-exit, dock glyph/pane, dock press owed)
- **target:** every interactive atom answers <=2 frames on physics, exits faster than enters, zero uncaused motion beyond the ONE staged field, no in-gesture main-thread hold >100ms
- **lever:** REPAIR before addition: finish the D1-D10 drain (F5.R1 + dock rows + press binding) then run the F5.2 weight-default inversion + 17.4 stall-budget histogram; adding new micro-interactions first pushes toward busy while still failing alive

## [13] runtime lens animation
- **now:** the data-URI feDisplacementMap scale cannot be var()-driven (CSSWG #542) so the press lens-swell rides the scale param only and morphs cannot carry continuous lensing; the WWDC grammar shows lensing intensifying continuously as glass flexes to larger sizes
- **target:** lens depth animates with the morph/press (the published web path: in-document SVG filter mount with a JS-written scale, or a discrete stepped swap), displacement kept small (~0.02 UV class), fringe confined to the rim
- **lever:** the already-booked W-LENSING encoding successor (in-document-SVG mount) — F2 glass band; drive the scale write from the existing press/morph scalars (--glass-btn-press-t / --dock-morph-t), compositor-only

---

## §DISPOSITION (orchestrator, 2026-07-04)

**VALIDATES-EXISTING (no new action — the finding confirms a wave already in the plan):**
[1] overlay exit → F5.R1 (fixed, glass-reveal-out) · [3] tab pull-morph calibration → F5.2 tabs row (has the cap→1.15 + glyph-pop + trailing-fade clauses) · [4] dock press → F5.2 dock-hover-press row (useLiquidPress) · [5] dock glyph/pane → F3.R1/R2 (in flight) · [11] kinetic type → F7.1 entrance-beats rider · [12] micro-density → "repair before addition" (validates the current sequencing) · [13] runtime lens → already-BOOKED W-LENSING encoding successor.

**NEW-FOLD (genuinely new, high-leverage, low-effort — applied):**
- [8] glass thickness-by-prominence → **NEW F2.5 W-GLASS-DEPTH-TIER**: map the existing `--glass-depth` inheriting scalar onto the tier ladder (overlay/menu rungs default a higher depth than content rungs — menu > popover > button by construction; zero new machinery).
- [7] gesture-coupled blur → **NEW F5.4 W-BACKDROP-BLUR-ENGAGE**: the blur leg reads off the LIVE gesture scalar (`--glass-drawer-t`/`--stage-t`/`--dock-expand-t`), not a fixed duration — the iOS-27 blur-tracks-the-finger signature; fixed-clock blur only on the trailing dismiss leg.
- [10] APCA on composited plates → **NEW F8.8 W-APCA-CONTRAST**: add APCA Lc as a PARALLEL witness (≥~60 body / ~75 small) alongside the WCAG-2 AA arm in the π paint-arm helper — the SOTA metric for glass composites (AA mis-ranks translucent surfaces).
- [2] overshoot assignment → **clause on F5.2**: the positive assignment — dialog/sheet/drawer ENTER rides snappy/smooth (monotonic, ζ≥0.85), bouncy reserved for small emphatic one-shots + the tab-arrival glyph pop; NOT a SPRING_PRESETS retune, a per-surface register choice.
- [6] drawer all-paths-spring + [9] shadow-prominence → **clauses on 17.4 / NF.3**: every drawer detent transition (gesture · open · programmatic) routes through the ONE spring re-seat (17.4); a `box-shadow` prominence leg keyed off `--glass-backdrop-luma` + bounded light-spill via `--glass-accent` on the overlay band (NF.3).
