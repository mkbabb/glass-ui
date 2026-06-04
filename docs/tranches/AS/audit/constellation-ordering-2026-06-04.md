# Constellation — canonical execution ordering (2026-06-04)

From a 9-agent parallel scan of every repo's active tranche. The graph collapses to
one keystone and three tiers. The held glass-ui-R2 contract question is RESOLVED by
the scan: value.js's K.W2.5 independently specced reverting `inv-K-4` (the
`development` exports condition) back to contract-v2 — so glass-ui R2 = **STRIP**,
coordinated, both repos reverting the condition together.

## The keystone — glass-ui 3.2.0

Six repos wait on glass-ui's 3.2.0 publish (most of its primitives are already
committed-unpushed: dock `useId` [3.1.1], `asideSide` P1, `useTextHighlight` P4,
`DockIconButton as/asChild` P6, `vt.ready` P8, `deriveAurora` W7). Publishing it is
the single highest-leverage move; everything downstream un-gates off it.

## Tier 0 — now, fully parallel (no cross-deps)

| Session | Move | Why it's tier-0 |
|---|---|---|
| **glass-ui AS.W2b** | R1 externalize value.js + R3 `--spacing` gate | un-RED the matrix (the publish floor) |
| **glass-ui R2 ⇄ value.js K.W2.5** | STRIP the `inv-K-4` `development` keys, both repos, in lockstep | the contract revert that greens `proof:resolution` |
| **value.js K.W2.6** | the Tailwind `@source` emission P0 | independent app fix |
| **fourier J.W2-fix / W2-transpose** | docs-only DEV folds (palette-PATCH decision; delete phantom version chain) | no code, no deps |
| **keyframes B.W1+** | execute B; cut 3.0.0 | value.js K.W4 waits on keyframes 3.0.0 |
| **bbnf AZ-I** | continue; playground fossil already clean | independent |

## Gate — glass-ui AS.W6 → publish 3.2.0 (after Tier 0's glass-ui + R2)

`overfitting audit + gates.mjs matrix green + FINAL + tag → --provenance publish
through the repaired CI`. This is the constellation unlock.

## Tier 1 — off the 3.2.0 publish (parallel)

| Session | Move | Also needs |
|---|---|---|
| **value.js K.W3/W4/W5** | consume 3.2.0 + primitives; aurora-derive | K.W4 also needs keyframes 3.0.0 |
| **fourier J.W5/W6** | WC frontend-design + e2e/axe; inv-27 green | bump `^3.1.1` first to clear the `glass-dock-1` e2e red |
| **muster K.W2-W4** | the measurement coda (CLS→≤0.05, clean-host) | `asideSide` shipped; native-drawer still an ask |
| **words A.W1-W6** | Workbox PWA + CWV/INP | `useTextHighlight` shipped; Fraunces still BOOKED (gates A.W5) |
| **speedtest AT-R2+** | VT re-founding | `vt.ready` shipped (AS.W7 P8) → AT-R2 unblocked |
| **slides C.W0-W2** | mobile polish + dock rebuild | C.W3-W4 need a NEW glass-ui `/deck` subpath (file the ask) |

## Tier 2 — close

fourier J.W8 + K-deploy (the deploy-of-record + measure) · value.js K.W6 close + L
· M-DEPLOY / M-MEASURE (the booked AFTER numbers).

## Critical path

`glass-ui AS.W2b (R1+R3) + R2-strip → AS.W6 → publish 3.2.0 → {fourier J.W6, value.js
K.W4, muster, speedtest, slides}`. keyframes 3.0.0 is a parallel sub-critical edge
(gates value.js K.W4). The two booked glass-ui debts that still block specific
consumer waves: **Fraunces @font-face** (words A.W5) and a **`/deck` subpath**
(slides C.W3).
