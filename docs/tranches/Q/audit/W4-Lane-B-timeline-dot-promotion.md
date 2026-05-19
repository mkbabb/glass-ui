# Q.W4 Lane B — timeline `--timeline-dot-*` knobs → tokens.css (Q-sty-2)

## Charter

Per Qγ T3. Commit `3cb70db` added `--timeline-dot-*` glass knobs to
`ContinuousTimeline.vue` as lower-scope private knobs — good intent (consumers
tune without `:deep()`) but, unlike the existing `§16 TIMELINE`
`--timeline-segment-*` family, never declared in `tokens.css`. Their defaults
lived as SFC-local `var(--timeline-dot-fill, var(--surface-tint-12))`-style
fallbacks. Promote them to `tokens.css §16 TIMELINE` per the feature-token-home
rule.

## What changed

**`src/styles/tokens.css`** — `§16 TIMELINE` gains the 6 boundary-dot glass
knobs (`--timeline-dot-size` / `-size-touch` were already declared; these are
the `3cb70db` additions that were missing):

- `--timeline-dot-fill: var(--surface-tint-12)`
- `--timeline-dot-blur: var(--glass-blur-quiet)`
- `--timeline-dot-ring: var(--glass-border-floating)`
- `--timeline-dot-tint-current: var(--accent, var(--foreground))`
- `--timeline-dot-tint-completed: var(--success, var(--foreground))`
- `--timeline-dot-check-color: var(--timeline-dot-tint-completed)`

Declared values reproduce the prior SFC fallbacks exactly.

**`src/components/custom/timeline/ContinuousTimeline.vue`** — the
`.continuous-dot` resting recipe, the `[data-current]` / `[data-state=completed]`
re-tint selectors, and the `.continuous-dot-check path` stroke now consume each
token bare. The deeply-nested `var(--check-color, var(--tint-completed, …))`
fallback chain collapses to a single `var(--timeline-dot-check-color)`.

`--timeline-dot-size` / `-size-touch` references in `SegmentedTimeline.vue` /
`ContinuousTimeline.vue` still carry a `, 14px` / `, 20px` literal fallback —
those tokens ARE already declared in §16, so the fallbacks are defensive
no-ops, left untouched (not in this lane's scope; T3 is specifically the
`3cb70db` dot-glass knobs).

## Verification

- `npm run typecheck` — GREEN.
- `npx vitest run` — 379/379 GREEN (including the timeline structural-split
  suite).
- Default fallbacks are byte-identical to the declared tokens; zero visual
  change.

## Verdict

**CLOSED.** The `--timeline-dot-*` glass knobs are co-located in
`tokens.css §16 TIMELINE` alongside the `--timeline-segment-*` family;
`ContinuousTimeline.vue` consumes them bare. Timeline now matches the
canonical token-home shape end-to-end.
