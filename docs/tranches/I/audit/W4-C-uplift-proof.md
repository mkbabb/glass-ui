# I.W4.C — Motion + Compositions Aesthetic Uplift Proof

**Agent**: I.W4.C
**Wave**: I.W4 (R-NEW-1 41-story aesthetic uplift)
**Lane scope**: 4 motion stories + 1 compositions story
**Date**: 2026-05-05
**Status**: complete

## Summary

5 of 41 NEEDS-REPAIR stories per `docs/tranches/H/audit/W4-design-fidelity-rerun.md`
uplifted to bold-maximalist commitment. Each story now opens with a
`<CreamSurface>` chassis containing a `<DisplayHero variation="wonk">` headline
threaded with the assigned section accent, an introductory paragraph, and a
`<FlourishDivider tone="section-N">` rule. For motion stories the demo
viewport stays clean below the divider — the animation is the gesture, the
chrome above stamps the design-language commitment. For
`compositions/settings.vue` the labelled-field family remains the page-level
gesture; the wrapper hero promotes the page from corporate-safe to
identity-forward.

The motion-story pattern follows `bezier-canvas.vue` and `confetti.vue` (already
uplifted in prior waves) — `<StoryPage>` then `<CreamSurface>` then header
(eyebrow + DisplayHero + blurb) then `<FlourishDivider>` then existing demo
content preserved verbatim. Settings follows the `audacious-hero.vue`/
`math-paper.vue` shape with the section-11 (neutral-densely-informational)
accent leading.

The dispatch suggested `size="display-2"`. `<DisplayHero>` only supports
`display-3 | display-mega | display-ultra`. Motion stories use `display-3`
(restrained — the demo is the protagonist); settings uses `display-mega`
(page-level commitment for a compositions surface). This matches the
established split: motion stories like `bezier-canvas` and `confetti`
do not use a display-mega hero, while compositions like `audacious-hero`
do.

## Files modified (5)

| Path | Section accent | Hero rung | CreamSurface tone | Headline |
|---|---|---|---|---|
| `demo/stories/motion/springs.vue` | section-2 | display-3 | warm | Spring physics |
| `demo/stories/motion/stagger.vue` | section-7 | display-3 | cool | Stagger |
| `demo/stories/motion/transitions.vue` | section-4 | display-3 | warm | Transitions |
| `demo/stories/motion/typewriter.vue` | section-9 | display-3 | warm | Typewriter |
| `demo/stories/compositions/settings.vue` | section-11 | display-mega | warm | Settings |

## Per-story accent rationale

- **springs → section-2**: assigned. Mathy, vivid — damped-harmonic
  closed-form math gets a pastel-green band that signals "physics" without
  warring with the in-stage hue parameter (which sweeps 12→220).
- **stagger → section-7**: assigned. Stagger reveals work well in cool —
  the cool-cream substrate frames the 24-tile fade-in grid so the reveal
  cadence reads cleanly. Tile numerals tinted section-7 for a unifying
  rhythm.
- **transitions → section-4**: assigned. Section-4 threads the in-card
  "hello" pill across the six demos (replacing the previous
  `--viz-fourier` hardcode) so every transition's payload carries the
  page accent — the vehicle stays consistent while the entry/exit shape
  varies.
- **typewriter → section-9**: assigned. Warm-cream substrate pairs with
  the typed phrase rotating in the section-9 accent (replacing the
  previous `--viz-fourier`). The Fraunces display headline sets the
  type-as-protagonist mood; cadence controls preserved untouched below.
- **compositions/settings → section-11**: assigned. Settings is densely
  informational — section-11 (neutral) leads the page without competing
  with the four group-accent eyebrows below (account/2, appearance/5,
  notifications/8, accessibility/11). The labelled-field family IS the
  body gesture; the hero adds page-level commitment without saturating.

## Repair pattern applied

### Motion (4 stories)

```vue
<StoryPage>
  <CreamSurface tone="warm|cool" class="relative overflow-hidden">
    <header class="flex flex-col items-center gap-[var(--space-phi-2)] text-center">
      <p class="section-label" :style="{ color: 'var(--section-color-N)' }">
        § N · <subtitle>
      </p>
      <DisplayHero size="display-3" variation="wonk"
                   :style="{ color: 'var(--section-color-N)' }">
        <Headline>
      </DisplayHero>
      <p class="text-prose max-w-prose text-foreground/80">
        <2-3 sentence story rationale>
      </p>
    </header>

    <FlourishDivider tone="section-N" class="my-[var(--space-phi-3)]" />

    <!-- existing demo content preserved verbatim -->
  </CreamSurface>
</StoryPage>
```

The wrapper is the gesture. The demo viewport (stage / grid / cards / phrase)
stays clean below the divider per the dispatch's
"don't over-style the demo viewport — the animation needs visual breathing
room" guidance.

For `transitions.vue` the per-card "hello" payload was re-tinted from
`--viz-fourier` to `--section-color-4` so the page accent threads through
all six demos.

For `typewriter.vue` the rotating phrase span was re-tinted from
`--viz-fourier` to `--section-color-9` so the typed glyphs ride the page
accent.

For `stagger.vue` the per-tile numeric label was re-tinted to
`--section-color-7` so each revealed tile carries the page accent on
arrival.

### Compositions/settings (1 story)

Same wrapper, but with `display-mega` instead of `display-3` (compositions
warrant the audacious rung) and the existing four-group body wrapped in
`max-w-3xl mx-auto` inside the CreamSurface to preserve the original
form-factor centering.

## Hard gate verification

### typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(green)
```

Run after each story per dispatch protocol; all five runs green.

### build

```
$ npm run build
...
[vite:dts] Declaration files built in 13739ms.
✓ built in 14.39s
```

JS bundle + dts emit clean. (One pre-cleanup attempt failed with a stale
`UnderlineTabs.vue.d.ts` cache miss in the dist tree — pre-existing
flakiness documented in `docs/tranches/I/audit/W6-perf-infrastructure.md` §4
and W4-A2-uplift-proof.md residual risks. Cleared `dist/` and rebuilt clean.)

### test

```
$ npm run test
> @mkbabb/glass-ui@0.6.1 test
> vitest run
 Test Files  18 passed (18)
      Tests  266 passed (266)
   Duration  1.85s
```

All 266 tests pass. No story-uplift regressed any unit-test fixture.

## Design-fidelity gate self-assessment

Each of the five stories now lands a deliberate, design-language-committed
gesture visible in <2 s per the G-audit-δ criterion:

- **CreamSurface chassis** — warm/cool tone substrate ✓
- **DisplayHero variation="wonk"** — Fraunces WONK headline ✓
- **FlourishDivider tone="section-N"** — accent-tinted rule ✓
- **Section-accent threading** — eyebrow + headline color + (where
  applicable) in-demo payload tint ✓
- **Demo content preserved** — every interactive control, every animation
  driver, every model binding survives the wrapper ✓

Motion stories no longer read as corporate-safe galleries; the chrome
commits even when the demo viewport stays clean. Settings reads as a
deliberate compositions page rather than a generic options panel.

## Bounds compliance

- May MODIFY (5 listed stories): all 5 modified, no others.
- May CREATE (this proof doc): created.
- Must NOT touch (`src/`, manifest.ts, other stories, foundations stories,
  tests): unchanged.

The worktree contains modifications from sibling lanes (W4.A1, W4.A2, W4.B)
operating on disjoint primitives + containers stories per the
multi-agent dispatch — those are out-of-bounds for verification of this
lane and were not edited by this agent.

## Residual risks

- **Playwright runtime probe**: the W7 close ceremony will re-run the full
  design-fidelity rerun to verify across all 41 uplifted stories; this
  lane self-attests against the gate criterion but does not Playwright-
  probe per the dispatch protocol.
- **Build dts flakiness**: pre-existing per W6-perf-infrastructure.md §4 —
  cold dist-tree state can produce stale-cache misses. Documented and
  remediated by `rm -rf dist && npm run build`. Not introduced by this lane.
- **DisplayHero `display-2` not a real rung**: dispatch said `display-2`;
  component supports `display-3`/`display-mega`/`display-ultra`. Used
  `display-3` for motion (closest restrained rung) and `display-mega` for
  compositions/settings (page-level commitment). Same disposition as
  W4.A2's lane proof. No source change required.
- **Stagger story scroll-to-reveal**: the existing 40vh spacer is
  preserved so the reveal still lands below first-paint fold; the hero
  + flourish above does not push the spacer out of frame because the
  reveal triggers on viewport intersection, not page-top distance.

## Authority

Per I.W4 wave spec hard gate (a): every assigned NEEDS-REPAIR story passes
the design-fidelity gate. This lane's 5-story set commits a deliberate
gesture per the bold-maximalist canon — verifiable by inspection of the
five `<CreamSurface>` heroes against the gate criterion. W7 close ceremony
re-runs binding.
