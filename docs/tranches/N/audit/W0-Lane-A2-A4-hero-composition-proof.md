# N.W0 Lane A2 + A4 — hero composition wire (MetaballCanvas ambient + TypewriterText headline)

## Disposition

Both wires landed in a single coordinated edit to
`demo/stories/compositions/hero.vue`.

- **A2 (metaballs ambient backdrop)** — `<MetaballCanvas>` added as an
  opt-in ambient layer behind the hero card's existing radial-gradient
  background. Gated by `isWebGLSupported() && !prefersReducedMotion`.
  Contained to the hero frame via a scoped `:deep(canvas)` override
  (the upstream component ships `position: fixed; inset: 0` which is
  viewport-pinned; the override re-targets to `position: absolute`
  inside the hero's `relative isolate` containing block). Opacity
  `0.6` and `mix-blend-mode: soft-light` keep the blobs ambient
  rather than foreground-competing with the warm-palette gradients.
- **A4 (typewriter headline)** — `<TypewriterText>` types the
  surrounding prose while the italic-f signature glyph is preserved
  as static markup between two TypewriterText segments. Segment 1
  (`"A design system "`) types first with no cursor; on `@complete`,
  segment 2 (`"or mathematicians, writers & makers."`) mounts with a
  220ms `startDelay` and a visible blinking cursor. Reduced-motion
  collapses to the original static h2 markup (unchanged from
  baseline).

Status: GREEN at typecheck-delta and build.

## File changes summary

Single file modified: `demo/stories/compositions/hero.vue`
(+175 / -10).

- Imports: `MetaballCanvas`, `isWebGLSupported`, type `MetaballConfig`
  from `src/components/custom/metaballs`; `TypewriterText` from
  `src/components/custom/typewriter`; `computed`, `ref` from `vue`.
- New `<script setup>` state:
  - `prefersReducedMotion` — synchronous SSR-safe `matchMedia` probe
    feeding both wire gates.
  - `showMetaballs` — `computed` gating `<MetaballCanvas>` on WebGL
    support AND non-reduced-motion.
  - `animateHeadline` — boolean gating the typewriter v-if.
  - `heroMetaballConfig: MetaballConfig` — ambient-tuned config
    (see § A2 rationale).
  - `headlineSeg1`, `headlineSeg2`, `seg1Done` — typewriter sequence
    state.
- Template: `<MetaballCanvas v-if="showMetaballs">` added as a
  sibling of the existing `<div class="relative z-10 ...">` content
  block (canvas's hardcoded `-z-10` keeps it behind content). The
  `<h2>` body is split into `<template v-if="animateHeadline">`
  (typewriter pair around static italic-f) and `<template v-else>`
  (verbatim original static h2). The hero frame now carries an
  additional `hero-frame` class for `:deep()` targeting.
- New scoped `<style>` block re-targets the metaballs canvas
  `position` from `fixed` to `absolute` inside `.hero-frame`, and
  dials opacity/blend-mode for ambient composition.

## A2 — metaballs config rationale

The hero composition's primary aesthetic comes from three radial
gradients in warm/cool tones (`--section-color-0` ember/peach at
top-left, `--section-color-2` amber at top-right,
`--section-color-5` cyan-blue at bottom-center). The metaballs
layer is **ambient**, not feature — it must add subtle motion
without competing for foreground attention.

Config knob choices (vs `DEFAULT_METABALL_CONFIG`):

| Knob | Default | Hero | Why |
|---|---|---|---|
| `blobCount` | 8 | **5** | Fewer blobs at larger radii read as broad atmosphere rather than discrete glowing dots. |
| `baseRadius` | 0.12 | **0.22** | Large blobs blend into the gradient backdrop instead of punching through. |
| `speed` | 0.08 | **0.04** | Slow drift; ambient, not animated. |
| `orbitAmplitude` | 0.3 | **0.22** | Gentle motion; blobs stay near center and don't sweep across text. |
| `threshold` | 1.0 | **0.85** | Lower density threshold + larger blobs → softer surface. |
| `edgeSoftness` | 0.3 | **0.5** | Wider smoothstep → blobs feather into the gradient floor rather than show crisp silhouettes. |
| `bgAlpha` | 0 | 0 | Fully transparent; layered above radial gradients (no flat fill). |
| `colors` | red/orange palette | **palette-matched 5** | `#F4A593` `#F5C76E` `#7CC0DB` `#E89B7E` `#F0B65A` — pulled from the same warm/cool tones as the radial stops. |

Alpha strategy: the canvas itself blends at `bgAlpha=0` (transparent
WebGL background); the scoped `:deep(canvas)` rule adds
`opacity: 0.6` + `mix-blend-mode: soft-light`. Soft-light blending
darkens the bright gradient lobes and lifts the muted regions —
exactly the ambient "atmosphere" read.

**Reduced-motion strategy**: the v-if collapses the entire canvas
when `prefers-reduced-motion: reduce` matches at composable-call
time. We do NOT rely on the canvas's internal reduced-motion freeze
(which holds a single deterministic frame but still allocates a
WebGL context); for a hero we'd rather not pay the WebGL cost when
the user has signalled they don't want motion. The radial gradients
alone fully carry the static aesthetic.

**WebGL gate**: `isWebGLSupported()` is the synchronous F-ε-3
canonical probe (per M.W2 Lane A — see
`MetaballCanvas.vue` docstring lines 14-57). Called at setup time
inside a `computed`, it returns a stable boolean for the v-if so
there's no mount/unmount cycle.

## A4 — typewriter strategy

The existing h2 has a signature glyph — the italic-f at
`var(--viz-fourier)` color with `WONK 1` font-variation-settings.
The brief is explicit: preserve it. Three strategies were considered:

1. **Single TypewriterText typing the whole headline** — would
   either lose the italic-f (rendered as plain "f") or require
   per-character class injection (TypewriterText.vue's
   `tw-char` class is uniform per instance; no per-char
   styling API). Rejected.
2. **Render italic-f as a character word via the `words` prop** —
   would type/delete the f along with the rest; the f's "anchored,
   signature" feel is incompatible with typing-then-deleting it.
   Rejected.
3. **Two-segment TypewriterText around static italic-f** — types
   "A design system " (no cursor), holds while the italic-f
   appears as static markup, then types "or mathematicians,
   writers & makers." with a visible blinking cursor. The italic-f
   reads as the **anchor** the prose lays itself around — a
   deliberate visual mark, not a typed character. Chosen.

Timing knobs:
- `baseSpeed: 55` (default 150) — fast enough to feel responsive,
  slow enough to feel deliberate.
- `firstAnimationSpeedFactor: 0.7` — first-pass mild speed-up so
  the headline doesn't drag on initial page paint.
- `variance: 0.35` — gentle natural rhythm jitter.
- `errorRate: 0.008` — rare typos (the headline is a brand
  statement; many typos would feel sloppy, but a stray correction
  every few mounts adds typewriter charm).
- `startDelay: 220` on seg 2 — short pause after the italic-f
  appears so the eye can register the glyph before prose resumes.
- `interactive: false` — disables click-to-backspace (this is a
  hero headline, not a playable demo).

**Italic-f preservation**: the `<span class="fourier-f font-display
italic">f</span>` markup is byte-identical in both the typewriter
branch and the static fallback branch. WONK font-variation-settings,
viz-fourier color, 1.1em size — all preserved verbatim.

**Reduced-motion fallback**: the `<template v-else>` branch
renders the verbatim original h2 markup (the diff at the static
branch is zero; it's the pre-wire string copied in). When
`prefers-reduced-motion: reduce` matches, the user sees exactly
what they saw before this lane landed.

## Verification

- **typecheck**: GREEN at delta (26 baseline errors, 26 after edit;
  same 2 unrelated files — `demo/stories/data/timeline-continuous.vue`,
  `demo/stories/data/timeline-segmented.vue`; `hero.vue` produces 0
  errors before and after).
- **build**: GREEN with `NODE_OPTIONS=--max-old-space-size=8192`
  (default heap OOM'd, which is a pre-existing condition unrelated
  to this edit — `npm run build` always needs the larger heap on
  this machine per the dispatch instructions). 638 modules
  transformed in ~25s; dts declarations also built.
- **git diff --stat**: `demo/stories/compositions/hero.vue | 185
  +++++++++++++++++++++++++++++++++++-- (1 file changed, 175
  insertions(+), 10 deletions(-))`.

## Open questions for orchestrator

1. **Canvas containment idiom** — I used a scoped `<style>` block
   with `.hero-frame :deep(canvas)` to override the upstream
   `position: fixed` to `position: absolute`. The cleaner long-term
   shape is a `<MetaballCanvas>` prop like `position?: "fixed" |
   "absolute"` (or `contain?: boolean`) so consumers don't need a
   :deep() override for ambient-backdrop use cases. This would land
   under O or a follow-up wave; tagging it here so it isn't lost.
2. **Demo-side reduced-motion probe canonicalization** — three
   files in demo/ now spell out the same `window.matchMedia(...)
   .matches` probe. If a demo-private composable (e.g., a
   `useReducedMotion` parallel to the V.W4 `useStoryDemo`) lands,
   this and any future ambient-backdrop wires should fold into it.
3. **Mix-blend-mode darkmode** — `mix-blend-mode: soft-light` was
   tuned against the light theme's warm gradients. Dark theme may
   want `screen` or `lighten` for the same ambient read. The hero
   composition story does not theme-toggle at present, so this is
   not in-scope; flagging for the N.W4 consumer audit.
4. **Italic-f flow during typing** — when segment 1 types out, the
   italic-f appears at the right edge of the displayed text and the
   line wraps around it. With `text-display-4` at hero scale + the
   `max-w-4xl` content container, the f stays on the first line on
   wide viewports. On narrow viewports the f may briefly appear on
   line 2 during typing and reflow to line 1 once seg 2 begins.
   Visually inspected as acceptable; if not, alternative is to
   start with `headlineSeg1 + "f"` as a single typewriter pass and
   absolutely-position the italic-f overlay. Deferred unless flagged.

## Worktree diff verification output

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a466231386fa39a57 diff --stat
 demo/stories/compositions/hero.vue | 185 +++++++++++++++++++++++++++++++++++--
 1 file changed, 175 insertions(+), 10 deletions(-)

$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a466231386fa39a57 status
On branch worktree-agent-a466231386fa39a57
Changes not staged for commit:
	modified:   demo/stories/compositions/hero.vue
```

Only `demo/stories/compositions/hero.vue` modified; in-bounds per
the lane spec.
