# StatusDot

## Artefact path

`src/components/custom/status-dot/` (the published subpath `@mkbabb/glass-ui/status-dot`).

## Verdict

`keep-current` — **booked on the slides SlideXray consumer** (AZ.W-PRUNE2 orchestrator row). The
re-ground confirms the slides usage is still LIVE (1 real external binary consumer), so the
1-consumer census row gets the evidence-doc escape rather than a retire. `StatusDot` is the
`<span>`-rooted live-pulse indicator (the `motion-safe:animate-ping` halo, the `role="img"`-on-
`aria-label` contract, token-tinted variants).

## Consumer proof (re-runnable; re-grounded AZ.W-PRUNE2 2026-06-11)

**External consumers — 1 (slides, LIVE).**

```bash
grep -rln 'StatusDot|glass-ui/status-dot' ~/Programming/slides/src   # → src/decks/til-briefing/slides/SlideXray.vue
```

`slides/src/decks/til-briefing/slides/SlideXray.vue` imports `StatusDot` from
`@mkbabb/glass-ui/status-dot` (`:3`) and mounts it as the live-pulse dot (`:125`), token-tinted to
the deck accent — explicitly "no hand-rolled dot/keyframe" (the slide comment names the library
consumption). The pulse self-disables under `prefers-reduced-motion` (the `motion-safe:animate-ping`
floor).

**Internal consumers — 1 demo (the showcase story, NOT counted).**

```bash
grep -rln 'StatusDot' demo/   # → demo/stories/display/status-dot.vue (the own-route showcase — own-story exclusion)
```

## The named ≥2-consumer TRIGGER

The binding close-criterion is the SECOND real consumer: another deck slide / a sibling repo / a
library surface composing `StatusDot` for a live-status indicator. When the second consumer ships,
record it here; the component then clears the ≥2-consumer bar on its own. Until then this evidence
doc holds the keep on the single slides SlideXray consumer.

## Re-audit proof

This document satisfies `proof:component-orphan` `keep-current` for `StatusDot` while the slides
SlideXray grep still finds the consumer. If `grep -rln 'StatusDot' ~/Programming/slides/src` returns
NONE (the slides usage removed) with no second consumer arriving, the verdict re-grades to
`library-orphan` — formally retire the subpath + export.

## Cross-references

- `slides/src/decks/til-briefing/slides/SlideXray.vue` (the live external consumer — the deck's live-pulse dot).
- `demo/stories/display/status-dot.vue` (the showcase story — own-route, NOT a counted consumer).
