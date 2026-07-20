# `useStagger` — consumer evidence (G-STAGGER-EVIDENCE)

**Disposition: KEEP.** `useStagger` (the unconditional one-shot staggered reveal-flag
primitive, `@mkbabb/glass-ui/motion-core`) was flagged for deletion by RU-09 R6's
"zero-caller" leg. That premise is REFUTED — the composable has live, current-contract
external consumers across the constellation. RU-09 A9's escape clause fires; RU-09 R6's
DELETE-useStagger leg is overturned (the rest of R6 — the reveal-pair deletes — stands, W3).

## Live consumers (fresh full-constellation grep, 2026-07-20)

| repo | file:line | use |
|---|---|---|
| speedtest | `src/features/speedtest/ui/ResultStack.vue:171` | `import { useStagger } from "@mkbabb/glass-ui/motion-core"` → `useStagger({…})` at `:243` |
| speedtest | `src/features/speedtest/composables/useResultReveal.ts:36` | `import { useStagger } from "@mkbabb/glass-ui/motion-core"` → `useStagger({…})` at `:76` |
| muster | `frontend/src/composables/useVerdictMoment.ts:60` | `import { useStagger } from "@mkbabb/glass-ui/motion-core"` |

Three live current-contract imports across two verticals — well above the A05 ≥2-consumer
bar. `useStagger` ships unchanged on the `/motion-core` engine-free surface.

## Note

`useStaggerReveal` (the IO-gated cousin) is DELETED at REDUCTION W3 (A11 ∩ R6) — zero
consumers anywhere, its `[data-scroll-reveal]` CSS recipe is the replacement. `useStagger` is
the keeper, never the reverse.
