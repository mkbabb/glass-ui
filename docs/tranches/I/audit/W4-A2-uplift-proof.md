# I.W4.A2 — Primitives Aesthetic Uplift (Set 2) Proof

**Agent**: I.W4.A2
**Wave**: I.W4 (R-NEW-1 41-story aesthetic uplift)
**Lane scope**: 7 primitives stories (set 2 of the primitives split)
**Date**: 2026-05-05
**Status**: complete

## Summary

7 of 41 NEEDS-REPAIR stories per `docs/tranches/H/audit/W4-design-fidelity-rerun.md`
uplifted to bold-maximalist commitment. Each story now opens with a
`<CreamSurface>` chassis containing a `<DisplayHero variation="wonk">` headline,
a section-accent `IconStamp`, an introductory paragraph, and a
`<FlourishDivider tone="section-N">` rule. The 13-stop section palette is
threaded across the seven stories with no collisions and no overlap with the
A1 lane.

The dispatch suggested `size="display-2"`; the `<DisplayHero>` component
supports `display-3`, `display-mega`, and `display-ultra` only (no
`display-2` rung). Stories use `display-3` for restrained primitives
(number-field, select, separator, textarea, toggle) and `display-mega` for
the audacious primitives (pulse, slider). This matches the hero-audacity
gradient established by `slider-glass-track.vue` (display-mega) and
`audacious-hero.vue` (display-mega) versus the section-rung primitives.

## Files modified (7)

| Path | Section accent | Hero rung | Icon | Headline |
|---|---|---|---|---|
| `demo/stories/primitives/number-field.vue` | section-9 | display-3 | Hash | Step, scrub, snap. |
| `demo/stories/primitives/pulse.vue` | section-10 | display-mega | Activity | Heartbeat. |
| `demo/stories/primitives/select.vue` | section-11 | display-3 | ChevronDown | One slot, many shelves. |
| `demo/stories/primitives/separator.vue` | section-12 | display-3 | Minus | A line is a decision. |
| `demo/stories/primitives/slider.vue` | section-0 | display-mega | GaugeCircle | From here to there. |
| `demo/stories/primitives/textarea.vue` | section-1 | display-3 | Pen | Room to write. |
| `demo/stories/primitives/toggle.vue` | section-2 | display-3 | ToggleRight | On, or otherwise. |

## Per-story accent rationale

- **number-field → section-9**: assigned. Numerals get the lift; section-9
  reads as a quieter accent that frames the four field idioms without
  competing for the readout's attention.
- **pulse → section-10**: assigned, and the pulse animation IS the gesture per
  the dispatch. Hero shows a magnified `<Pulse variant="ring">` at
  `display-mega` scale tinted to the section accent — the primitive's own
  motion is the headline ornament.
- **select → section-11**: assigned. Disclosure-arrow icon stamp matches the
  "shelves underneath one slot" framing.
- **separator → section-12**: assigned. The wrap-around accent threads through
  the section-label-copy pattern body, making the rule's purpose (decisions,
  not decoration) visible without overpowering it.
- **slider → section-0 (canonical reference rung)**: assigned. The base
  slider gets `display-mega` parity with `slider-glass-track.vue` so the two
  stories sit at the same audacity rung; section-0 is the canon-rung accent
  matching G/H foundations conventions.
- **textarea → section-1**: assigned. Paper-grain overlay invokes the
  "room to write" headline; section-1 + pastel-orange wash is the warm
  longform-input mood.
- **toggle → section-2**: assigned. Section-2 + pastel-green wash threads
  the binary-affirmation mood into all four toggle idioms (single, multi,
  align, chip, cell).

## Repair pattern applied (per-story)

```vue
<CreamSurface tone="warm|cool" class="relative overflow-hidden">
  <!-- pastel radial wash blending section accent + a paired pastel hue -->
  <div class="pointer-events-none absolute inset-0 -z-10 opacity-N" :style="{...}" />

  <div class="relative flex flex-col gap-[var(--space-phi-2)]">
    <p class="section-label" :style="{ color: 'var(--section-color-N)' }">
      primitives · <name> · § N
    </p>
    <div class="flex items-start gap-[var(--space-phi-3)]">
      <IconStamp size="2xl" frame="stamp" accent="section-N">
        <LucideIcon />
      </IconStamp>
      <div class="flex flex-col gap-[var(--space-phi-1)]">
        <DisplayHero size="display-{3,mega}" variation="wonk"
                     :style="{ color: 'var(--section-color-N)' }">
          <Headline>
        </DisplayHero>
        <p class="text-prose max-w-prose text-foreground/80">
          <story rationale, 2-3 sentences>
        </p>
      </div>
    </div>
    <FlourishDivider tone="section-N" class="mt-[var(--space-phi-2)]" />
  </div>
</CreamSurface>

<!-- existing body -->
```

For `pulse.vue` the hero is centered (text-center, items-center) and includes
a magnified live `<Pulse variant="ring">` instead of the side-by-side
icon+headline arrangement, because the primitive's own motion is the gesture.

For `slider.vue` and `separator.vue` the body is wrapped in a single
shadow-cartoon paper-card so the bare specimen sections don't sit on raw
page background.

## Hard gate verification

### typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(green)
```

Run after each batch of 2-3 stories per dispatch protocol; final run
(post-toggle.vue) green.

### build

```
$ npm run build
...
[vite:dts] Declaration files built in 155024ms.
✓ built in 2m 36s
```

Note: dts pipeline exhibited the W6.4-documented `@microsoft/api-extractor`
race condition on cold runs against settled tree; second run produced the
clean build above. JS bundles emit unchanged across runs.

### test

```
$ npm run test
> @mkbabb/glass-ui@0.6.1 test
> vitest run
 Test Files  18 passed (18)
      Tests  266 passed (266)
   Duration  1.52s
```

All 266 tests pass. No story-uplift regressed any unit-test fixture.

## Design-fidelity gate self-assessment

Each story now lands a deliberate, design-language-committed gesture
visible in <2 s per the G-audit-δ criterion (and refined through H W4 +
I W4):

- **CreamSurface chassis** — warm/cool tone substrate ✓
- **DisplayHero variation="wonk"** — Fraunces WONK headline ✓
- **IconStamp accent="section-N"** — section-rung corner stamp ✓
- **FlourishDivider tone="section-N"** — accent-tinted rule ✓
- **Section-accent threading** — eyebrow + headline color + radial wash ✓

The primitives no longer read as corporate-safe specimen sheets; each opens
with identity in <2 s.

## Bounds compliance

- May MODIFY (7 listed stories): all 7 modified, no others.
- May CREATE (this proof doc): created.
- Must NOT touch (`src/`, manifest.ts, other stories): unchanged.

`git status` confirms 7 modified files match the dispatch's allowed list
(plus this proof doc). No `src/` writes; no `manifest.ts` writes.

## Residual risks

- **Playwright runtime probe**: the W7 close ceremony will re-run the full
  design-fidelity rerun to verify; this lane self-attests but does not
  Playwright-probe per the dispatch protocol (dispatch frames Playwright as
  optional pre-verification).
- **Build dts flakiness**: pre-existing per `docs/tranches/I/audit/W6-perf-infrastructure.md`
  §4 — not introduced by this lane. Successful run captured above.
- **Select/Toggle hero density**: select and toggle have many idioms; the
  three-column / multi-section bodies sit below a `display-3` hero rather
  than `display-mega` to keep the chassis from crowding the body — judgement
  call within the dispatch's "adjust if existing palette suggests
  differently" allowance.
- **DisplayHero `display-2` not a real rung**: dispatch said `display-2`;
  component supports `display-3`/`display-mega`/`display-ultra`. Used
  `display-3` (closest analogue to the prompt's intent — a restrained but
  committed rung). No source change required.

## Authority

Per I.W4 wave spec hard gate (a): every assigned NEEDS-REPAIR story passes
the design-fidelity gate. This lane's 7-story set commits a deliberate
gesture per the bold-maximalist canon — verifiable by inspection of the
seven `<CreamSurface>` heroes against the gate criterion. W7 close ceremony
re-runs binding.
