# Qο (omicron) — keyframes.js timeline deep re-audit

Round-2 audit-augmentation, dispatched after Qη round-1 deferred the keyframes.js timeline visual investigation to W5 "after Qη 1.A + 1.B fixes land". The user rejects the defer. This audit drives the timeline regression to ground at the live runtime, attributes each defect to its precise substrate-or-consumer origin, and replaces Qη §1.C's BOTH-PATHS-VIABLE verdict with a conclusive one.

## Section 1 — Timeline-surface inventory in keyframes.js demo

The keyframes.js demo (port 5232 in this audit) wires its animation chrome through a single `<AnimationControlsGroup>` shell. The shell mounts `<AnimationControls>` (a Tabs container with three tabs: Controls / Keyframes / Timeline) and a `<TopDock>` that — when `tabsExternallyManaged` is injected — replaces the in-panel TabsList with a dock-side Select. Every scene that exposes a built-in animation reuses this chrome. Two distinct "timeline" surfaces live inside the shell.

| # | Surface | File | Substrate composition | Visible when |
|---|---------|------|------------------------|--------------|
| 1 | **Scrub-Slider in PlaybackRibbon** | `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue:3-22` | Wraps `<Slider variant="timeline">` (glass-ui) inside `<IconTooltip text="Scrub animation timeline">` (glass-ui custom) inside `<div class="touch-gate-target timeline-green">` (consumer-local) | Controls tab is the active tab in the controls panel |
| 2 | **KeyframeTimeline track** | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:49-142` | Consumer-internal: styled `<div class="timeline-track">` with absolute-positioned tick gridlines, a `bg-primary` playhead line, `.keyframe-marker` diamonds, and `<TimelineCaret>` thumbs. Imports glass-ui's `Card`, `CardContent`, `Tooltip`, `Button`, `Separator`, `Input`, `IconTooltip` but NOT `GlassTimeline` / `GlassScrubber` / `ContinuousTimeline` | Timeline tab is the active tab |

Scenes carrying surfaces (1) + (2): cube, square, simple, amiga, balls. The boxes/playground demos use their own bespoke chrome and don't mount `<AnimationControls>`. The easing scene replaces (1) + (2) entirely with an `<EasingSidebar>` and its own play/reset buttons — no PlaybackRibbon, no KeyframeTimeline.

The "keyframes.js timeline" symptom the user reports therefore reduces to **one of two visible primitives** depending on which Controls-tab the dock-side Select happens to have surfaced. The default tab is Controls — so surface (1), the PlaybackRibbon Slider, is what the user sees first.

## Section 2 — Visual-defect catalogue

### Defect 1 — PlaybackRibbon Slider variant=timeline collapses to a 16px thumb-only nub

- **Surface**: PlaybackRibbon scrub-Slider (surface 1 above).
- **Symptom**: The `<Slider variant="timeline">` renders as a single 16×16 green dot in the upper-left of a 318×44 empty container, instead of filling the row as a pill-shaped scrub track.
- **Live measurement** at `http://localhost:5232/#/square?anim=Transform` after opening the controls panel:
  - `<span class="glass-slider" data-variant="timeline">` boundingRect: 16×40
  - parent `<div class="timeline-green">`: 16×40 (collapsed)
  - grandparent `<span class="icon-tooltip-trigger">`: 318×44 (full row)
  - great-grandparent `<div class="w-full grid gap-2">`: 318×156
- **Screenshots**:
  - `docs/tranches/Q/research/screenshots/q-omicron-timeline-square-controls.png` — full controls panel, Slider visible only as a tiny green dot above the Play / Reverse buttons.
  - `docs/tranches/Q/research/screenshots/q-omicron-timeline-slider-tooltip-wrapper.png` — close-up of the 318×44 IconTooltip wrapper containing the single 16×16 thumb-only Slider.
  - `docs/tranches/Q/research/screenshots/q-omicron-timeline-slider-collapse-closeup.png` — even closer crop of just the Slider element.
- **Root cause** — substrate. Commit `25e1b5a` (tranche-o/w6 "constellation-level substrate promotions + speedtest AC.W6 cohort") introduced O.W6 Lane D in `src/components/custom/icon-tooltip/IconTooltip.vue:17-19,40-46`: the slot was wrapped in a new `<span class="icon-tooltip-trigger">` styled `display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px`. The intent was hit-area enforcement for icon glyphs (WCAG 2.5.5 target size). The unintended consequence: `inline-flex` containers do not stretch to fill their grid cells, and they do not propagate width to children with `width: 100%`. The Slider's `w-full` resolves against a zero-width parent and the Slider shrinks to the thumb's intrinsic 16px.
- **Attribution**: SUBSTRATE — single-commit attributable to `25e1b5a` (glass-ui v1.4.0).
- **Verdict**: **REVERT** the wrapping behaviour for non-icon slot content; specifically, the substrate fix needs either (a) a `width: 100%` rule on `.icon-tooltip-trigger` plus a `:has(> input, > [role="slider"], > .glass-slider)` clause to let stretching children consume the row, or (b) drop the wrapping span entirely and apply hit-area enforcement via padding on the slot host instead (Tailwind: leave hit-area to consumers — `min-h-11 min-w-11` on the slotted button itself). Path (b) is cleaner and consistent with the L invariant 4 "no backwards-compat aliases" rule.
- **Test-fix proof**: injecting `.icon-tooltip-trigger { width: auto } .icon-tooltip-trigger > div { width: 100% }` at runtime restored the Slider to 318px wide. Screenshot at `docs/tranches/Q/research/screenshots/q-omicron-timeline-slider-after-fix-test.png` shows the full pill scrub track with the thumb at the leading edge. Confirms hypothesis.

### Defect 2 — KeyframeTimeline playhead does not animate during playback

- **Surface**: `<KeyframeTimeline>` track in the Timeline tab.
- **Symptom**: When the animation is playing, the `bg-primary` playhead line stays at `left: 0%`. The KeyframeTimeline visual is rigid during play.
- **Live measurement** at `http://localhost:5232/#/cube?anim=Rotations` after Play:
  - `<div class="absolute top-0 h-full w-0.5 bg-primary">.style.left === "0%"` even after 3s of playback.
  - The `useTimeline` composable (`demo/@/components/custom/animation-controls/timeline/composables/useTimeline.ts:32,117,121`) declares `scrubT = ref(0)` and only mutates it from `scrubT.value = ...` on pointer-drag or `moveKeyframe`. No watcher reads from the live `animation.t`.
- **Screenshot**: `docs/tranches/Q/research/screenshots/q-omicron-timeline-keyframetimeline-track-playing.png` — track during playback; playhead still pinned to left edge.
- **Root cause** — consumer. The KeyframeTimeline is purpose-built as a *scrub-and-edit* surface, not a *playback-mirror* surface. The PlaybackRibbon Slider (defect 1) is the one bound to `currentT`. The two are not cross-synchronised. This is a feature gap, not a substrate regression — but it materially contributes to the "timeline is not correct" reading because when the user opens the Timeline tab during playback, the visualisation appears dead.
- **Attribution**: CONSUMER.
- **Verdict**: **CONSUMER-FOLD-IN** — keyframes.js side. Add a `useRAFLoop` (already exported from glass-ui motion) inside `useTimeline` that reads `animation.value.t / animation.value.options.duration` and writes to `scrubT` whenever the animation is playing and the user is not dragging. Trivial wire — one effect, ~10 LOC.

### Defect 3 — KeyframeTimeline renders 3 stacked `.timeline-track` elements (only one visible)

- **Surface**: AnimationControlsGroup with multi-animation registration.
- **Symptom**: `document.querySelectorAll('.timeline-track')` returns 3 elements at `/cube?anim=Rotations`; two have boundingRect 0×0 (hidden via parent `display: none` on the inactive AnimationControls panels), one is visible.
- **Live measurement**: 3 nodes, 1 visible — consumer renders one `<KeyframeTimeline>` per registered animation in the AnimationControlsGroup, all teleporting to `#timeline-expanded-target`, but only the active animation's panel is shown.
- **Attribution**: CONSUMER — by-design (multi-animation registration model). Not a defect per se. Documented here only because it surfaced during DOM inspection and could mislead a future re-probe.
- **Verdict**: NO-OP. Note in the audit log.

### Defect 4 — `useGlassRenderer` / Aurora WebGL background absent on keyframes scenes

- **Surface**: full-page background.
- **Symptom**: every keyframes.js scene renders against a transparent checkered backdrop (browser default for transparent body) rather than the glassmorphic aurora-tinted ground the speedtest demo carries.
- **Attribution**: CONSUMER. keyframes.js has never wired `<Aurora>` or a paper-backdrop globally. Out of scope for "timeline is not correct" — flagging because it's visible in every screenshot and could be misread as a glass-ui regression.
- **Verdict**: NO-OP — pre-existing.

## Section 3 — Failure-mode resolution

The three plausible failure modes named in the dispatch:

| Mode | Hypothesis | Resolution |
|------|------------|------------|
| **1. Consumer-internal regression** | KeyframeTimeline / PlaybackRibbon / Scrubber has a consumer-side bug | PARTIALLY TRUE — defect 2 (playhead frozen during play) is consumer-attributable. But this is a feature gap that pre-dates the regression window and is not the dominant visual failure. |
| **2. Substrate token regression** | The post-P timeline-continuous cohort (`3cb70db`, `b8a61ec`, `63c88b7`) interacts wrong with the consumer | FALSE — these commits touch only `ContinuousTimeline.vue` + `geometry.ts`, and keyframes.js does not consume `<ContinuousTimeline>`. Speedtest (which does) renders the continuous timeline correctly per Qμ (`q-mu-speedtest-timeline-row.png`). Tokens are not the issue. |
| **3. Subsumed by play-button regression** (Qη 1.C theory) | The play button inside the timeline chrome is regressed, and the user reads it as a "timeline" defect | FALSE — the play button renders as expected (rainbow-gradient pill in the dock, outlined "Play" pill in the controls panel). The defect is upstream of the play button: the scrub Slider next to it is collapsed. |

The actual dominant failure mode is a **fourth, unanticipated one**: a substrate regression in `IconTooltip` (commit `25e1b5a`, tranche-o/w6) silently broke any consumer that wraps a `width:100%`-dependent child inside `<IconTooltip>`. The only consumer in the corpus that does this is keyframes.js's PlaybackRibbon. The defect is invisible in glass-ui's own demos and in speedtest because no other consumer wraps a Slider inside IconTooltip.

This is a classic substrate-without-tested-consumer-binary invariant failure — the v1.4.0 IconTooltip change had ≥ 2 callsites (LabeledField + the keyframes demo + others), but only the keyframes demo's callsite mounted a stretching child. The visual-regression test surface (glass-ui demo) did not catch it.

## Section 4 — Qη §1.C revision

| Field | Qη (round-1) | Qο (round-2) |
|-------|--------------|--------------|
| Verdict | BOTH-PATHS-VIABLE — defer disposition to Q.W5 visual re-probe | **REVERT (substrate) + CONSUMER-FOLD-IN (secondary)** |
| Attribution | "no substrate-side reproduction; reads as 1.B overlap" | Substrate — IconTooltip wrapping span (commit `25e1b5a`, tranche-o/w6). Secondary consumer issue is the unanimated playhead. |
| Wave assignment | W5 (defer-then-re-probe) | **W3** for substrate revert; **consumer-side fold-in** for the playhead. No defer remaining. |
| Confidence | LOW (visual unconfirmed) | **HIGH** — live runtime measurement plus runtime test-fix proof. |

Qη §1.C's defer rationale ("VISUAL-PENDING — need post-Qη-1.A-and-1.B fixes to land before re-probing") was based on the assumption that the play-button regression (Qη 1.B) might be the dominant defect inside the timeline chrome and would mask any timeline-side defect. The runtime probe shows the play button is in fact rendering correctly — the timeline-side Slider is the one collapsed. The "no substrate-side reproduction" claim in Qη §1.C was also wrong: the substrate IS reproducing, just at the IconTooltip level (not at the timeline-token level Qη was searching).

## Section 5 — Wave fold-in

| Defect | Owner | Wave | Action |
|--------|-------|------|--------|
| 1 — IconTooltip wrapping span collapses Slider | glass-ui substrate | **W3** | Revert/refactor the `<span class="icon-tooltip-trigger">` wrapping pattern in `src/components/custom/icon-tooltip/IconTooltip.vue:17-19,40-46`. Preferred recipe: drop the wrapping span; document a 44×44 min-hit-area expectation on the slotted child via a utility class (`min-h-11 min-w-11`) instead. Fallback: scope the min-width/min-height rule via `:has()` so stretching children opt out. Either way, ship as a glass-ui patch release. |
| 2 — KeyframeTimeline playhead frozen during play | keyframes.js consumer | **consumer-side, post-Q** | One-effect wire in `useTimeline.ts` reading `animation.value.t` to drive `scrubT`. Track as a keyframes.js issue separate from the Q tranche. |
| 3 — three `.timeline-track` nodes (only one visible) | n/a | — | NO-OP. Documented for re-probe disambiguation. |
| 4 — no aurora backdrop on scenes | keyframes.js consumer | — | NO-OP / out of scope. |

## Operational appendix

- Probe environment: keyframes.js master @ `2183f32`, glass-ui master @ `d244dd5`. keyframes.js dev server on port 5232 with `--mode development` (consumes glass-ui via the `"development"` conditional-exports branch, resolving to `src/` — so the IconTooltip substrate change is live without rebuild).
- Console: 1 error (404 on a self-hosted Fira Code font asset under the glass-ui `@fs/` mount; unrelated to timeline rendering) + a handful of warnings.
- Screenshots inventory (14 total at `docs/tranches/Q/research/screenshots/q-omicron-timeline-*.png`):
  - `*-home-1440.png` — landing.
  - `*-cube-rotations-1440-initial.png` — cube scene with Rotations selected, controls panel closed.
  - `*-cube-controls-open-1440.png` — controls panel open, Controls tab active.
  - `*-dock-tabs-open.png` — dock-side tab Select dropdown attempt.
  - `*-cube-rotations-tab-1440.png` — Timeline tab open, KeyframeTimeline visible.
  - `*-keyframetimeline-track-paused.png` — track at rest, full pill width 310×48 (renders correctly).
  - `*-keyframetimeline-track-playing.png` — track during play; playhead still at 0% (defect 2).
  - `*-cube-playing.png` — full viewport during play.
  - `*-cube-state-full.png` — full viewport state.
  - `*-cube-controls-tab-playing-1440.png` — keyboard-navigation attempt.
  - `*-square-controls.png` — square scene Controls tab; the broken Slider is the tiny green dot above Play/Reverse (defect 1, in context).
  - `*-slider-collapse-closeup.png` — Slider element alone at native size; renders as a single 16×16 dot.
  - `*-slider-tooltip-wrapper.png` — IconTooltip wrapper at native size 318×44; the 16×16 dot floats at the left.
  - `*-slider-after-fix-test.png` — same wrapper after injecting the test CSS fix; full pill scrub track restored.
- Cross-references:
  - `src/components/custom/icon-tooltip/IconTooltip.vue:17-19,40-46` — substrate root cause.
  - `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue:3-22` — consumer site.
  - `src/components/ui/slider/Slider.vue` — Slider variant=timeline definition, blameless.
  - Commit `25e1b5a` (tranche-o/w6) — the regression commit.
  - Qμ §"keyframes.js timeline" — "NOT FOUND in probed routes" was incorrect; this audit reaches the surface.
  - Qη §1.C — verdict revised here.
