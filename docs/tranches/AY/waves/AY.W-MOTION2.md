# AY.W-MOTION2 — the FULL keyframes.js suite + the complete curve library, first-class in /motion

**State:** OPEN (user-directed 2026-06-09: "we should have the entire suite of keyframes.js items
herein, alongside all curves") · **Repo:** glass-ui · **Band:** B (library systems)
**Depends on:** W-MOTION (landed — the doctrine re-point + the widened `proof:animation-coherence`).
**Coordinates with:** W-ANIM1 (the audit grades against the suite this wave surfaces), W-UNDERLINE
(its load clock is the first new consumer of the re-exported `NumericAnimation`).

## §1 — The gap

glass-ui's `/motion` cherry-picks composables (`useSpring`, `useAnimatedNumber`,
`useCountup`, … — NOT `useSpringOrchestrator`, which has zero hits in `src/`; that name is a
CLAUDE.md staleness owned by W-DOC1 R8) but does NOT surface the keyframes.js suite itself — a consumer wanting
`NumericAnimation`, `Sequence`, the spring constructors, or the full easing-curve set must add a
direct `@mkbabb/keyframes.js` + `@mkbabb/value.js` dependency and learn a second vocabulary. The
deck, sci-report, and the demo all reach around glass-ui for the same primitives glass-ui already
peers on. Meanwhile the CSS half (`--spring-*`, `--ease-*`, tokens.css §2) names a curve vocabulary
the JS half does not export 1:1 — two halves of ONE motion system, published asymmetrically.

## §2 — Objective

0. **MOVE 0 (BLOCKING — the pin bump).** Bump the `@mkbabb/keyframes.js` devDependency
   `^2.2.0` → `^4.1.0` (`package.json:746`) BEFORE any re-export lands. The installed 2.2.0 dist
   carries only 11 runtime exports (`ElementMorph, ManualTimeline, NumericAnimation, RAFPlayback,
   ScrollTimeline, SmoothProgress, SpringProgress, Timeline, loadAnimationEngine,
   springLinearStops, springTimingFunction`) — NO `Sequence`, `stagger`, `flip`, `flipShared`,
   `drag`, `Draggable`, `decay`, `decayRest`, `toEasing`, or `resolveEasing`. §2.1 names `Sequence`
   and gate §3.1 demands the WHOLE suite: against the 2.2.0 pin, SUITE-COMPLETE is unsatisfiable as
   written (`vue-tsc` fails on the first missing re-export). 4.1.0 is published; the peer range
   already allows it (`package.json:715` — `^2.2.0 || ^3.0.0 || ^4.0.0`). Bump risk is LOW and
   verified in-repo, not by research: the three classes glass-ui constructs (`SpringProgress`,
   `SmoothProgress`, `NumericAnimation` — 9 import sites in `src/`) persist across 2.2.0→4.1.0, and
   every call site already passes a CALLABLE `timingFunction`
   (`src/composables/motion/useNumericTransition.ts:43,52`; `src/composables/motion/useCountup.ts:11-12,120`),
   matching 4.x's fail-explicit easing redesign (keyframes.js `src/animation/easing.ts:1-17`).
   Acceptance: `npm run typecheck` + the motion test files GREEN on the bumped install.
1. **Re-export the keyframes.js suite** through `/motion` (the keyframes-bearing subpath — NOT the
   root barrel; the root stays dependency-light per the L.W1 SCC discipline): `NumericAnimation`,
   `Sequence`, the spring/keyframe constructors, the player/orchestration types — the WHOLE public
   suite, re-exported verbatim (no wrappers, no renames; glass-ui is the distribution seam, not a
   fork). **STATIC/DYNAMIC split (load-bearing):** "the whole public suite" means the 4.1.0
   STATIC barrel — the 24 static runtime exports + the erased types + `loadAnimationEngine`
   ITSELF — and NOT the 16-member heavy engine surface (`Animation`, `CSSKeyframesAnimation`,
   `AnimationGroup`, `animate`, `presets`, `MotionPath`, `DrawSVG`, …) that 4.x deliberately
   gates behind `loadAnimationEngine()` (keyframes.js `src/animation/index.ts:138-197` — the
   package's value.js isolation boundary). Re-exporting the engine members statically would
   flatten that boundary and drag the heavy graph onto `/motion`'s eager chunk. Consumers reach
   the engine the same way keyframes.js consumers do: `await loadAnimationEngine()` through the
   re-exported loader.
2. **The complete curve library**: every value.js easing (the `ease*` family) + the house spring
   presets re-exported from ONE place, with the CSS↔JS curve TABLE made code: a
   `MOTION_CURVES` map binding each `--ease-*`/`--spring-*` token name to its JS twin (the §6
   easing-doctrine table, machine-readable). One vocabulary, both halves. Two binding sub-clauses:
   - **Single-source the (response, ζ) pairs (no second authority).** `MOTION_CURVES` MUST NOT
     re-type the five spring preset pairs (smooth 0.5/ζ0.86 · snappy 0.35/ζ0.65 · bouncy 0.5/ζ0.45
     · gentle 0.7/ζ1.0 · dock 0.32/ζ0.7). Lift the `PRESETS` table out of
     `scripts/regen-spring-tokens.mjs:52-83` into a shared `src/` module that BOTH the regen
     script and `MOTION_CURVES` import — the no-second-authority discipline the regen header
     itself names (`regen-spring-tokens.mjs:30-32`). Each spring row's JS twin is then
     `springTimingFunction(preset)` over the SAME pair the CSS `linear()` string was solved from —
     drift-proof against future retunes by construction.
   - **The value.js static-edge is decided by MEASUREMENT, not assertion.** Re-exporting the
     value.js `ease*` family statically from `/motion` adds value.js to `dist/motion.js`'s eager
     graph — the exact edge keyframes 4.x keeps OFF its light barrel by design (see §2.1's
     STATIC/DYNAMIC split). Run `npm run profile:bundle` BOTH ways and decide on the numbers:
     (a) accept the edge on `/motion` (value.js is already a transitive peer `^0.10.0 || ^0.11.0`,
     `package.json:716`), or (b) carve the curve library to a flat value.js-only sibling subpath
     (the `/color` leaf pattern; in-corpus precedent: the AP.W3 SCC carve, `src/motion.ts:17-31` —
     a cheap import must not drag a heavy peer). Record the measured per-subpath gzip delta and
     the chosen arm in the wave DELTA.
3. **The curve gallery demo story**: every curve rendered live (a small multiples grid — each curve
   animating a dot + its plot), light/dark, with the token name + JS name side by side. The
   doctrine's "which easing for which job" table rendered as the story's legend.
4. **api/ types + README** (`/motion` becomes the documented home of the WHOLE motion system).

## §3 — HARD GATE

1. **SUITE-COMPLETE (born-RED):** a parity gate — every public export of the pinned
   `@mkbabb/keyframes.js` + the value.js easing set appears in the `/motion` dts
   (`verify-export-types` + a generated parity manifest; REDs today since none are re-exported).
   Preconditioned on §2 MOVE 0 (the 4.1.0 pin bump) — against 2.2.0 the named `Sequence` row
   cannot exist. The generated manifest is TWO-TIERED:
   - **STATIC rows** — the 4.1.0 static barrel (24 runtime exports + the erased types +
     `loadAnimationEngine` itself): asserted PRESENT in the `/motion` dts.
   - **DYNAMIC rows** — the 16-member `AnimationEngine` surface (`Animation`,
     `CSSKeyframesAnimation`, `AnimationGroup`, `getAnimationId`, `getTimingFunction`,
     `resolveKeyframes`, `animate`, `MotionPath`, `fromMotionPath`, `DrawSVG`, `fromDrawSVG`,
     `presets`, `DIRECTIONS`, `FILL_MODES`, `defaultOptions`, `defaultLayerConfig`): asserted
     REACHABLE THROUGH `loadAnimationEngine()` (a typed probe `await`ing the loader), NOT present
     in the static dts — static presence of a DYNAMIC row is itself a RED (the isolation boundary
     must not flatten).
   - **VERSION STAMP:** the manifest records the exact keyframes.js AND value.js versions it
     enumerated against (today: keyframes.js 4.1.0 post-bump; value.js 0.10.0 installed —
     0.10.0's dist already carries the full registry maps `timingFunctions` 55 /
     `timingFunctionDescriptions` 34 / `bezierPresets` 23, verified live, so NO value.js bump is
     required; the sibling repo is 0.11.2). A later dep bump REDs the stamp and forces a manifest
     re-run instead of silently widening the surface.
2. **CURVE-TABLE-BOUND:** `MOTION_CURVES` covers every `--ease-*`/`--spring-*` token declared in
   tokens.css §2 (a source-witness sweep; a token without a JS twin REDs — the two halves cannot
   drift). **The alias set is CLOSED, with a recorded fence:**
   - **Canonical rows (one row each):** the five generated springs `--spring-{smooth,snappy,
     bouncy,gentle,dock}` (`tokens.css:191-195`) + the bezier core `--motion-ease-{standard,out,
     in,out-expo}` (`tokens.css:198-201`) + `--motion-ease-apple` (`tokens.css:209`).
   - **Alias rows (resolve-through, asserted as ALIASES not duplicated twins):** the tokens.css §2
     aliases `--ease-{standard,out,in,out-expo,apple}`, `--ease-spring`,
     `--ease-decelerate`/`--ease-accelerate` (`tokens.css:203-214`) AND the theme.css @theme
     quartet `--ease-spring-{smooth,snappy,bouncy,gentle}` + `--ease-spring`
     (`theme.css:410-413,420`) — the sweep MUST read theme.css too, or the quartet escapes the
     gate. Each alias row points at its canonical row; the gate REDs an alias whose target row is
     missing, and REDs a NEW `--ease-*`/`--spring-*` declaration in either file that has neither
     a canonical nor an alias row (deterministic: row-per-alias with resolve-through semantics).
   - **Out-of-fence (recorded):** §2-EXTERNAL derived tokens that merely CONSUME a spring
     (`--vt-ease` `tokens.css:1762`, `--dock-resize-spring` `:1782`, `--dock-press-spring`
     `:1801`, `--animate-ambient-pulse-easing` `:241`) are consumers, not curve declarations —
     outside the sweep by the recorded fence (they resolve through their target's row).
3. **GALLERY DELTA:** the curve-gallery story captured light+dark (the cardinal protocol);
   `proof:live-verified-ledger:ay` green on the row.
4. **No-fork invariant:** grep — zero re-implementations; every re-export resolves into the peer
   (the distribution-seam discipline). The grep NAMES `cssTwinFor` (keyframes.js
   `src/animation/easing.ts:50` — the shipped JS-name→CSS-string direction): `MOTION_CURVES` is
   the REVERSE direction (CSS-token-name→JS-callable) and must not re-implement the forward one;
   any glass-ui-local function mapping a JS easing name to a CSS string is a fork of `cssTwinFor`
   and REDs. Same clause for `springTimingFunction`/`springLinearStops` (the solver pair) and the
   value.js registry maps — `MOTION_CURVES` rows REFERENCE peer symbols, never inline copies of
   stop lists or control points.

## §4 — Scope fence

- No new animation engine, no wrapper API, no renames — re-export verbatim.
- The root barrel stays keyframes-free (`/motion` is the bearing subpath; `/motion-core` keeps its
  dependency-free leaves).
- **MOVE 0 bumps the DEV pin only** (`package.json:746` `^2.2.0` → `^4.1.0`); the PEER range
  (`:715`) already admits `^4.0.0` and does not change. No value.js bump (0.10.0 suffices — §3.1
  version stamp).
- **The `loadAnimationEngine()` boundary is preserved verbatim** — no static re-export of any
  engine member; the manifest's DYNAMIC tier (gate §3.1) is the machine check.
- The value.js static-edge placement (`/motion` vs a flat curve-leaf sibling) is decided INSIDE
  this wave by the §2.2 `profile:bundle` measurement — not deferred, and not pre-decided here.
- Consumer re-points (deck/sci-report dropping their direct keyframes.js imports for the glass-ui
  seam) ride their own tranches; recorded, not forced here.
