# Q.W3 Lane G — IconTooltip wrap-span revert (Q-cos-13)

Audit-augmentation round-3 HEADLINE. Substrate REVERT.

## Charter

Commit `25e1b5a` (O.W6 Lane D) wrapped every `<IconTooltip>` slot in a
`<span class="icon-tooltip-trigger">` styled `display: inline-flex;
min-width/min-height: 44px` to enforce a WCAG 2.5.5 (44×44) target size.
The span turns the slotted child into a flex item, which strips
`width:100%` semantics from any stretching descendant. keyframes.js's
`PlaybackRibbon` wraps a stretching `<Slider variant="timeline">` inside
`<IconTooltip>`; the Slider's `w-full` resolved against the flex-item
context and collapsed to its ~16px thumb-only nub — the user-reported
"timeline is not correct" symptom (Qο §2 Defect 1).

Mandate: revert the wrap-span so width-stretch is restored, while
preserving the WCAG 44×44 hit-area intent. Diagnose the O.W6 Lane D
audit-logic gap that let the wrap-span ship.

## `git show 25e1b5a` analysis

`25e1b5a` is the O.W6 HEADLINE close (4 parallel lanes, v1.4.0 minor).
Lane D — "44×44 minimum hit-area enforcement" — is the relevant slice.
It touched two sites:

1. `src/components/custom/icon-tooltip/IconTooltip.vue` — inserted
   `<span class="icon-tooltip-trigger"><slot /></span>` inside
   `<TooltipTrigger as-child>`, plus a `<style scoped>` block:

   ```css
   .icon-tooltip-trigger {
       display: inline-flex;
       align-items: center;
       justify-content: center;
       min-width:  var(--icon-tooltip-hit-area, 44px);
       min-height: var(--icon-tooltip-hit-area, 44px);
   }
   ```

2. `src/styles/tokens.css` — added `--icon-tooltip-hit-area: 44px`
   (plus a parallel `--dock-touch-target` token, untouched by this lane).

Lane D's stated source was "speedtest AC.W6 F2.AA-03 / WCAG 2.5.5
target size". The change is correct for its tested corpus (bare-glyph
and icon-button callsites) and wrong for the one untested shape — a
stretching child.

### Why the span breaks width-stretch

`display: inline-flex` makes the `<span>` a flex container and the
slotted child a flex item. A flex item with default `flex: 0 1 auto`
and `width: 100%`, under `justify-content: center`, resolves to its
**content size**, not the container width — `width:100%` no longer
means "fill the parent". Qο's live measurement confirmed the
mechanism: the `.icon-tooltip-trigger` span itself measured 318×44
(full row) while the `<Slider>` inside measured 16×40. The span did
not collapse; the *flex-item context it created* collapsed the child.
This is intrinsic to `inline-flex` — no `min-width`/`width` tweak on
the span alone fixes it; the child must stop being a flex item.

## Chosen path — Path C (retire the wrap-span)

W3.md Lane G offered three paths. **Path C** — retire the wrap-span
entirely; route WCAG hit-area enforcement through the child's own
padding/min-size contract — is chosen. It is the path W3.md names as
"most aligned with the L invariant gestalt-redesigns-over-incremental-
patches". The dispatch authorised a fallback to Path A only if Path C
"cannot preserve the WCAG hit-area for bare-icon-glyph callsites". The
callsite audit below shows Path C **can** preserve it; no fallback.

### What changed

`IconTooltip.vue` — the `<span class="icon-tooltip-trigger">` wrap-span
and its entire `<style scoped>` block are deleted. `<TooltipTrigger
as-child>` now forwards trigger props directly onto the slotted
element via reka-ui's `as-child`. The slotted child IS the trigger:

- a stretching child (`<Slider>`, `<Input>`) keeps its `w-full` because
  it is no longer a flex item — no formatting context is imposed on it;
- an interactive child (`<Button>`) keeps its own four-state + sizing
  contract;
- a bare decorative glyph that needs a hit-area carries it itself, via
  a `min-h-11 min-w-11 inline-flex` host — the same per-component
  padding/min-size contract every other interactive primitive owns
  (J invariant 2 — "interactive elements bundle their own contract").

`tokens.css` — `--icon-tooltip-hit-area: 44px` is retired. With the
wrap-span gone, nothing consumes it; an orphaned token would violate
`feedback_no_backwards_compat` + the overfitting-audit invariant. A
short comment records the retirement in place of the declaration.

`demo/stories/primitives/icon-tooltip.vue` — the canonical-pattern
story slotted **bare** `<Info>` / `<HelpCircle>` / `<AlertTriangle>`
glyphs (the only callsite shape in glass-ui that genuinely needs
hit-area inflation). Each glyph is now wrapped in a
`<span class="inline-flex min-h-11 min-w-11 cursor-help items-center
justify-center">` host — the child's own 44×44 contract, expressed in
plain Tailwind (`11` = 2.75rem = 44px). The story blurb is updated to
describe the new contract.

### How WCAG 44×44 is preserved

The 44×44 target size survives per callsite shape:

| Callsite shape            | Hit-area source (post-revert)                                |
|---------------------------|--------------------------------------------------------------|
| Bare decorative glyph     | `min-h-11 min-w-11 inline-flex` host on the glyph (44×44).   |
| Interactive control       | The control's own contract — `<Button size="icon">` etc.    |
| Text label (`LabeledField`) | N/A — a hover-hint label is not a WCAG 2.5.5 action target. |
| Stretching child (Slider) | N/A — the Slider's own track + thumb own the target size.   |

The O.W6 Lane D intent (icon glyphs reach 44×44) is preserved exactly
where it is meaningful — on bare glyphs — and is no longer force-applied
to shapes that already own a target size or are not action targets.

## Callsite audit

All `<IconTooltip>` callsites in glass-ui `src/` + `demo/`:

| # | Callsite                                       | Slotted child                          | Shape        | Hit-area post-revert |
|---|------------------------------------------------|----------------------------------------|--------------|----------------------|
| 1 | `src/components/custom/labeled-field/LabeledField.vue:3` | `<label class="labeled-field-label">` | Text label   | N/A — hover-hint label, not an action target. `cursor-help` preserved via `.labeled-field-label`. |
| 2 | `demo/stories/containers/hover-card.vue:66,71,76` | `<Button variant="ghost\|glass" size="icon">` | Interactive control | Button owns its four-state + sizing contract (`size="icon"` → `h-10 w-10`; the 40<44 gap is a pre-existing Button concern, out of Lane G scope). |
| 3 | `demo/stories/primitives/icon-tooltip.vue:21,24,27` | bare `<Info>` / `<HelpCircle>` / `<AlertTriangle>` SVG | Bare glyph | **Updated** — each glyph now wrapped in a `min-h-11 min-w-11 inline-flex` host carrying the 44×44 hit-area. |

External-consumer note (out of `src/`+`demo/` scope, recorded for the
W5 keyframes restoration lane): keyframes.js `PlaybackRibbon` wraps a
stretching `<Slider variant="timeline">`. Post-revert the Slider is no
longer a flex item — its `w-full` resolves against the real parent and
the full ~318px pill scrub track is restored. Qο's runtime test-fix
(`width: auto` on the span + `width: 100%` on the child) proved the
attribution; Path C achieves the same result by removing the
flex-item context outright rather than patching around it.

`as-child` single-root requirement: reka-ui's `as-child` forwards props
onto exactly one root element. Every callsite above passes a single
root element (label / Button / glyph-host span) — the requirement holds
at all three callsites. No multi-root callsite exists.

## O.W6 Lane D audit-logic gap

O.W6 Lane D's hit-area enforcement was correct for the corpus it
probed — bare glyphs and icon-buttons — and silently wrong for one
untested shape. The audit gap, precisely:

**The Lane D consumer probe did not include a callsite that wraps a
stretching (`width:100%`-dependent) child inside `<IconTooltip>`.** At
O.W6 the only such callsite in the constellation was keyframes.js's
`PlaybackRibbon` (`<Slider variant="timeline">` inside `<IconTooltip>`).
glass-ui's own demo and the speedtest demo never wrap a stretching
child in `<IconTooltip>` — so the visual-regression surface (glass-ui
demo + speedtest) could not catch it. The defect was invisible in
every tested binary and only manifested in the one untested consumer.

This is the **same audit-blind-spot class** as the rainbow-utilities
D.W2.D retiral (Q.W3 Lane E): a fleet-wide audit drew a conclusion
from a corpus that did not include the one consumer the conclusion
broke. Lane D's variant is a *promotion* gap rather than a *retire*
gap — the audit proved "≥ 2 callsites exist" (true) but never proved
"every callsite shape tolerates an inline-flex wrap-span" (false). The
substrate-without-tested-consumer-binary invariant (L invariant 3/8)
governs *retirals*; O.W6 Lane D shows the same logic is needed for
*substrate additions* — a wrap-span injected around a `<slot />` is a
contract change against every callsite shape, and the audit must
enumerate the shapes, not just count the callsites.

W5 codification (invariant 32 / phantom-class corpus-grep gate)
generalises both Lane E and Lane G into one rule: any audit that adds
or retires shared substrate must run against the **full** consumer
corpus (all repos, all callsite shapes), not glass-ui's own demo alone.

## Verification

- `npm run typecheck` (vue-tsc --noEmit) — GREEN.
- `npx vitest run` — GREEN, 32 files / 377 tests passed.
- `grep -rn "icon-tooltip-trigger" src/ demo/` — no `.icon-tooltip-trigger`
  selector and no `<span class="icon-tooltip-trigger">` wrap-span remain
  (only the retirement-note comment in `tokens.css`).
- `grep -rn "icon-tooltip-hit-area" src/ demo/` — no live declaration or
  consumer; the orphaned token is retired.
- WCAG 44×44: preserved for bare-glyph callsites via the
  `min-h-11 min-w-11 inline-flex` glyph host (demo callsite #3);
  interactive callsites own their own contract.

`npm run build` deliberately not run (dispatch constraint — verify via
typecheck + vitest only).

## Verdict

**Q-cos-13 RESOLVED via Path C.** The `<span class="icon-tooltip-trigger">`
wrap-span is retired; `<IconTooltip>` forwards `as-child` directly onto
the slotted element, so stretching descendants keep `w-full` and the
keyframes.js PlaybackRibbon Slider renders at full pill width. WCAG
2.5.5 (44×44) is preserved through each child's own contract — bare
glyphs via a `min-h-11 min-w-11` host, interactive controls via their
four-state contract. The orphaned `--icon-tooltip-hit-area` token is
retired (no backwards-compat shim). The O.W6 Lane D audit gap — a
consumer probe that counted callsites but never enumerated callsite
*shapes*, missing the stretching-child shape — is diagnosed and folded
into the W5 invariant-32 codification alongside the Lane E parallel.
</content>
</invoke>
