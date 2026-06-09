# AY.W-MOTION2 — the FULL keyframes.js suite + the complete curve library, first-class in /motion

**State:** OPEN (user-directed 2026-06-09: "we should have the entire suite of keyframes.js items
herein, alongside all curves") · **Repo:** glass-ui · **Band:** B (library systems)
**Depends on:** W-MOTION (landed — the doctrine re-point + the widened `proof:animation-coherence`).
**Coordinates with:** W-ANIM1 (the audit grades against the suite this wave surfaces), W-UNDERLINE
(its load clock is the first new consumer of the re-exported `NumericAnimation`).

## §1 — The gap

glass-ui's `/motion` cherry-picks composables (`useSpringOrchestrator`, `useAnimatedNumber`,
`useCountup`, …) but does NOT surface the keyframes.js suite itself — a consumer wanting
`NumericAnimation`, `Sequence`, the spring constructors, or the full easing-curve set must add a
direct `@mkbabb/keyframes.js` + `@mkbabb/value.js` dependency and learn a second vocabulary. The
deck, sci-report, and the demo all reach around glass-ui for the same primitives glass-ui already
peers on. Meanwhile the CSS half (`--spring-*`, `--ease-*`, tokens.css §2) names a curve vocabulary
the JS half does not export 1:1 — two halves of ONE motion system, published asymmetrically.

## §2 — Objective

1. **Re-export the keyframes.js suite** through `/motion` (the keyframes-bearing subpath — NOT the
   root barrel; the root stays dependency-light per the L.W1 SCC discipline): `NumericAnimation`,
   `Sequence`, the spring/keyframe constructors, the player/orchestration types — the WHOLE public
   suite, re-exported verbatim (no wrappers, no renames; glass-ui is the distribution seam, not a
   fork).
2. **The complete curve library**: every value.js easing (the `ease*` family) + the house spring
   presets re-exported from ONE place, with the CSS↔JS curve TABLE made code: a
   `MOTION_CURVES` map binding each `--ease-*`/`--spring-*` token name to its JS twin (the §6
   easing-doctrine table, machine-readable). One vocabulary, both halves.
3. **The curve gallery demo story**: every curve rendered live (a small multiples grid — each curve
   animating a dot + its plot), light/dark, with the token name + JS name side by side. The
   doctrine's "which easing for which job" table rendered as the story's legend.
4. **api/ types + README** (`/motion` becomes the documented home of the WHOLE motion system).

## §3 — HARD GATE

1. **SUITE-COMPLETE (born-RED):** a parity gate — every public export of the pinned
   `@mkbabb/keyframes.js` + the value.js easing set appears in the `/motion` dts
   (`verify-export-types` + a generated parity manifest; REDs today since none are re-exported).
2. **CURVE-TABLE-BOUND:** `MOTION_CURVES` covers every `--ease-*`/`--spring-*` token declared in
   tokens.css §2 (a source-witness sweep; a token without a JS twin REDs — the two halves cannot
   drift).
3. **GALLERY DELTA:** the curve-gallery story captured light+dark (the cardinal protocol);
   `proof:live-verified-ledger:ay` green on the row.
4. **No-fork invariant:** grep — zero re-implementations; every re-export resolves into the peer
   (the distribution-seam discipline).

## §4 — Scope fence

- No new animation engine, no wrapper API, no renames — re-export verbatim.
- The root barrel stays keyframes-free (`/motion` is the bearing subpath; `/motion-core` keeps its
  dependency-free leaves).
- Consumer re-points (deck/sci-report dropping their direct keyframes.js imports for the glass-ui
  seam) ride their own tranches; recorded, not forced here.
