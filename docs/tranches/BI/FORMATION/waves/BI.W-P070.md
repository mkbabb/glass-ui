# BI.W-P070 — Skeleton apotheosis

Status: **done**.

`Skeleton` is one decorative reserved-content shape. It strips role/ARIA overrides and
stays hidden from AT; the owning region carries loading semantics. Geometry remains
consumer-owned. Its single transform-only scan exists only under
`prefers-reduced-motion: no-preference`, with static reduced-transparency and forced-color
states. No variant or surface styling authority remains.

Owner coverage: `tests/components/ui/skeleton/Skeleton.test.ts`.
