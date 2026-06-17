# W-CARD-TIER-ALPHA-DELTA — per-tier alpha is canonical at the primitive (BB.B8)

**Wave**: BB.B8 — card-tier-alpha-pin
**Gate**: `proof:card-tier-alpha` (NEW, born-RED → GREEN)
**Routed ask**: speedtest `docs/tranches/AW/asks/ASK-GU-CARD-TIER-ALPHA-PIN.md`
**Placement**: `docs/tranches/BB/coordination/cross-repo-inbound.md` §5 line 113

## THE GAP

glass-ui already SHIPS the per-tier alpha primitives
(`--glass-opacity-{wash,quiet,resting,floating,overlay}` = 0.30/0.50/0.65/0.80/0.95
light; 0.38/0.58/0.72/0.88/0.96 dark; + dock 0.42 + chassis 0.28). But they were
SCATTERED across `tokens/glass.css` (light) and `tokens/dark-arm.css` (dark),
undocumented-as-CANONICAL, and ungated — so a consumer reading the library could
not find a NAMED per-tier alpha to consume, and re-pinned magic numbers per surface
(the speedtest `register.css` `--glass-bg-{tier}` re-declarations). The ASK names
the SUBSTITUTION trap exactly: the composed `--glass-bg-{tier}` is declared at
`:root`, so overriding `--glass-opacity-{tier}` on a DESCENDANT does NOT re-compose
the inherited bg — a consumer must hand-rewrite the full `color-mix` formula.

## THE BUILD (token-first, no recipe touch)

CANONICALIZE the per-tier alpha as the library's NAMED identity register:

- **`tokens/glass.css`** — the LIGHT arm `--glass-opacity-*` primitives gain a
  documented canonical-register header: each `--glass-opacity-{tier}` IS the
  library's canonical alpha (the warm-cream glass ladder identity), alpha-monotonic,
  with the dock/chassis footprint rungs. The header RECORDS the
  substitution-vs-inheritance retune seam (the documented consumer path — read the
  named alpha, or re-declare the composed `--glass-bg-{tier}` per scope with the
  pinned alpha). The `--glass-level` recipe MECHANISM (AX.W54) is BYTE-UNTOUCHED.
- **`tokens/dark-arm.css`** — the DARK arm header records membership in the SAME
  named register, per-mode, each rung lifted ~0.08 over its light counterpart.

The library DEFAULT alphas are its identity (presets-in-consumers). The speedtest
register choices (instrument 0.72 / document 0.78 / wash 0.55 / overlay 0.70)
DIVERGE from the library — they are speedtest's own dark-AA-clearing register, so
they STAY in speedtest as a NAMED preset. A consumer that wants the LIBRARY register
now reads the named token (or a `<Card tier>` rung) and re-pins NOTHING.

### Why no value change

The alphas are ALREADY the library identity; the gap was documentation +
canonicalization + a gate, not the values. Touching the values would be a clean
break with zero consumer benefit. The edits are comment-only (no value, no recipe,
no selector change) — every sibling gate (`proof:glass-level`, `proof:glass-cohesion`,
`proof:no-gray`, `proof:dark-material`, `proof:glass-cal`) stays GREEN by construction.

## THE GATE — proof:card-tier-alpha (born-RED → GREEN)

| clause | assert |
|---|---|
| T1 | each of the 5 ladder tiers + dock + chassis carries the canonical named alpha (light arm) at the library-identity value |
| T2 | the light ladder is alpha-monotonic (wash < quiet < resting < floating < overlay) |
| T3 | the dark arm carries the SAME named register, each rung LIFTED over light + monotonic; dock alpha is mode-invariant (no dark re-pin) |
| T4 | each `--glass-bg-{tier}` composes its named alpha through the EXACT AX.W54 `--glass-level` seam at its ONE `:root` site (recipe untouched) |
| T5 | the canonical register + the substitution-trap retune seam are RECORDED in both arms |
| T6 | consumer-override-deletes-byte-equivalent: a re-pin to the canonical alpha composes the byte-identical fill at level 1 (the deletable no-op proof) |
| self-test | 5 bites — missing tier, non-monotonic ladder, dark arm not lifting, recipe detached from level seam, dock re-pinned in dark — each MUST flag |

**Born-RED proof**: against the pre-wave un-canonicalized source the T5 clauses flag
3 violations (light canon + trap + dark canon absent). GREEN after the canonicalization
edits land. Self-test: all 5 bites flag.

## THE CONSUMER SIDE (speedtest — override-deletion, foreign-tree)

speedtest's `register.css` instrument/document/wash/overlay overrides are NOT a
re-pin of the LIBRARY values (they diverge for the dark-AA register), so they STAY
as a documented consumer preset (presets-in-consumers). On the `^4.1.0` bump,
speedtest reads the canonical named alpha for any tier where it wants the LIBRARY
register (the override deletes byte-equivalently THERE); the divergent register pins
stay. THEIR edit, the foreign-tree fence — glass-ui ships the canon + the gate.

## FILES

- `src/styles/tokens/glass.css` — light-arm canonicalization header (comment-only)
- `src/styles/tokens/dark-arm.css` — dark-arm canonicalization header (comment-only)
- `scripts/proof-card-tier-alpha.mjs` — NEW gate (T1-T6 + 5-bite self-test)

The binding live-π rides W-REFLECT3 (the per-tier composited-fill readback over a
busy backdrop, both modes — the `proof:ba-gestalt` glass-band verdict carries the
gestalt).
