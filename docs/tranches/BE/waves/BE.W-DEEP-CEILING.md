## BE.W-DEEP-CEILING — re-decide + (if the budget clears) land the Apple-nav deep-glass 18-20px ceiling (absorbs BD.W-DEEP-PUSH)

- **Band:** 2 — Liquid Glass material, Safari-first · **Severity:** major · **Status:** SPEC (tranche-dev; NOT executed) · **Deps:** none inbound; absorbs the still-owed **BD.W-DEEP-PUSH** (the BD wave converged but was never executed — the no-silent-drop discipline carries it into BE). **Sequence:** independent; the budget MEASUREMENT is the work, run on the rebuilt BE floor.
- **One-line goal:** Re-run the deferred budget call on the rebuilt BE floor and — IFF a fresh per-frame `proof:nested-backdrop-budget` + chrome-devtools `performance_start_trace` measurement clears — push the deep tier `--glass-blur-deep-radius` 16px → 18-20px (toward the live-measured apple.com nav `blur(20px)` ceiling) on the EXISTING `--glass-depth` LERP, the deep saturate staying ≤ the baked 1.8 ceiling; the warm-cream identity + the calm content default both INVIOLATE. Land-or-hold, never a silent over-spend.

---

## Goal — what ships, the iOS-27 betters-claim

This is the iOS-27 thick-material CEILING push the BB band landed at a budget-clearing 16px and BC/BD conditionally deferred. The mechanism is ENTIRELY shipped — the deep tier (`--glass-blur-deep-*`), the `--glass-depth` LERP axis, the `.glass-deep` decoration, the `deep` CardTier rung, and the baked `--glass-saturate-deep-ceiling: 1.8` ALL shipped at BB.W-DEEP-GLASS. The OWED item is the ONE deferred VALUE call: the deep radius stayed at 16px with the 18-20px push "BOOKED if the budget bites" (glass-deep.css:54-57).

This wave is the re-measurement BD specced (BD.W-DEEP-GLASS-20PX, converged-but-never-executed — DEEP-CEILING absorbs it): re-measure the per-frame budget on the rebuilt BE floor and land the 18-20px push IFF it clears, else re-stamp HELD with the recorded number. The push lands the apple.com-nav-grade thick refractive glass on the deep tier (the hero glass, the dock, the CTA) — the iOS-27 maximal liquid-glass material — while the calm content tiers STAY calm (the two-register discipline).

**The betters-claim:** Apple's nav frosts at `blur(20px) saturate(1.8)` over a flat scroll-under panel; glass-ui's deep tier matches the MATERIAL but over the warm-aurora craft — the same thick refraction, over a live colored substrate, the warm-cream light-concentration ceiling keeping it just-rich (not the garish smear an 1.8 saturate would be over a colored field).

---

## Starting state — the exact HEAD src + the born-RED anchor (verified on disk)

**`src/styles/tokens/glass-deep.css` — VERIFIED by reading `:54-99`.**
- `:54` — `--glass-blur-deep-radius: 16px;` with the inline note `/* in [14,20], STRICTLY > calm floating 13px; BUDGET CALL (L4): stays 16px, the 18-20px push toward the apple.com nav ceiling is BOOKED behind a recorded profile:budget clearance. */` (the born-RED anchor: the radius is at the deferred 16px, NOT the 18-20px ceiling).
- `:58` — `--glass-saturate-deep: 1.5;` (`>= 1.5 toward Apple 1.8, > calm floating 1.18; ≤ ceiling`).
- `:61` — `--glass-saturate-deep-ceiling: 1.8;` (the apple.com-nav saturate CEILING, BAKED — load-bearing).
- `:73-89` — the `--glass-blur-deep-active-radius` LERP reads BOTH `var(--glass-depth)` and `var(--glass-level)` (the genuine driver — lifting `--glass-blur-deep-radius` shifts the depth-1 ENDPOINT; the depth-0 floor = calm `--glass-blur-floating-radius` 13px, the `--glass-level` compose UNTOUCHED). VERIFIED the recipe is a real LERP, not a literal.
- `:97-99` — the composed `--glass-blur-deep: blur(var(--glass-blur-deep-active-radius)) saturate(var(--glass-saturate-deep-active))`.

**`scripts/proof-glass-legibility.mjs:304-345` (`detectDeepBudget`) — VERIFIED by reading.** The L4 clause reads `--glass-blur-deep-radius`/`--glass-saturate-deep`/`--glass-saturate-deep-ceiling` from `tokens/glass-deep.css`:
- `:318-321` — IF `radPx >= 18`: budget cleared; `radPx > 20` reds ("past the apple.com nav 20px ceiling").
- `:322-333` — ELSE (16px stay): the BOOKING must be recorded (`:327` — `/BUDGET CALL|booked|book(s|ed)? the (18-20|full 20|18-20px)/i` AND `/profile:budget/i`); a silent stay reds; `radPx ∈ [14,20]`.
- `:335-343` — the deep saturate ≤ the baked 1.8 ceiling; the ceiling ≤ 1.8.

**`scripts/proof-glass-depth.mjs:54-102` — VERIFIED.** D2 asserts `deepRadius ∈ [14,20]` (APPLE_BAND `:58`) AND `deepRadius > 13` (CALM_FLOATING_RADIUS `:54`) AND `deepSaturate >= 1.5` (DEEP_SATURATE_FLOOR `:59`). A push to 18-20px stays GREEN on D2 by construction (in-band, deeper). D3 freezes the base radius primitives (the calm content default INVIOLATE).

**`scripts/proof-nested-backdrop-budget.mjs` — VERIFIED present (head).** The live per-frame gate: mounts the nested glass-Button-in-Card-in-Dialog stack on `:5199`, measures the nested `backdrop-filter` depth + frame-time series under a scroll/resize jiggle, asserts depth ≤ ceiling + median under the 60fps budget. `['local']`-tagged, fail-CLOSED locally.

**`src/styles/tokens/dark-arm.css:240-255` — VERIFIED.** The dark deep saturate companions are BAKED (`/* The dark dock/deep saturate stay baked (off-ladder footprint rungs) */`); the dark deep arm mirrors the W-DARK-MATERIAL saturate/brightness — RADIUS-only across modes (the dark arm reads the SAME `--glass-blur-deep-radius`).

**`docs/tranches/BD/waves/BD.W-DEEP-GLASS-20PX.md` — VERIFIED present.** The converged-but-never-executed BD spec DEEP-CEILING absorbs (same mechanism, same gate, the re-measurement on the BE floor — the BD wave was PLANNING-ONLY, never built).

**Born-RED summary:** the deep radius is at 16px; the apple.com-nav 18-20px ceiling is BOOKED, not landed. The BD-specific born-RED is the PAINT bar: the deep-glass π asserts the resolved deep `backdrop-filter` blur radius `>= 18px` AND the live frame budget clears — RED at 16px until the build lands (Arm A) or the bite is recorded (Arm B).

---

## Build — the CONDITIONAL VALUE EDIT gated on a fresh live per-frame measurement

**ZERO mechanism change, ZERO new token, ZERO recipe edit — the budget DECISION is the work; the radius value is its output.** Two arms, decided by the measurement:

### Arm A — the budget CLEARS (the push lands)
Edit `glass-deep.css:54`:
```css
--glass-blur-deep-radius: 20px; /* (or 18px) — budget CLEARED 2026-06-DD: nested-backdrop-budget
                                   median frame <Nms under the 60fps budget on the deep route,
                                   the live apple.com nav blur(20px) ceiling reached. Off the
                                   BB-booked 16px (the BD.W-DEEP-PUSH re-measurement on the BE floor). */
```
Optionally lift `--glass-saturate-deep` toward 1.6 (`:58`) — ONLY if the warm-aurora light-concentration read stays just-rich, NOT garish (the conservative call keeps 1.5 over the colored substrate even when the budget clears the blur — the radius is the primary "more glass" lever). The ceiling `--glass-saturate-deep-ceiling: 1.8` (`:61`) is UNTOUCHED. The LERP recipe (`:73-89`), the `--glass-level` compose, the calm depth-0 floor (13px), and the dark-arm companions are ALL byte-untouched — only the depth-1 endpoint value moves. If 18px clears but 20px bites, land 18px and re-book the 18→20 step with the recorded 20px number.

### Arm B — the budget BITES (re-stamp HELD)
`glass-deep.css:54` STAYS at `16px`. The inline `:54-57` budget-call note is UPDATED to record the FRESH BE measurement (the per-frame cost that bit, the date, the route) so the L4 booking is the CURRENT honest record. The 18-20px push is re-booked WITH the recorded throttle number (the recorded conservative fall — the budget-binding fence working as designed).

**The decision procedure (the wave's actual work):** run `proof:nested-backdrop-budget` + a chrome-devtools-MCP `performance_start_trace` over the deep route (`/substrates/glass-material` with `tier="deep"` over the live aurora) at 16px (baseline) and at 18px + 20px (candidate), on the real GPU, measuring median + p95 frame time under a scroll/resize jiggle. The push lands ONLY if the candidate median stays under the 60fps budget (16.7ms) with headroom matching the 16px baseline within tolerance. **The number IS the deliverable.**

**Compositor-only / Safari-safe / PRM notes:** CSS-token-only (zero shader, zero animation — `proof:no-layout-animation` irrelevant). The deep blur is `backdrop-filter` (Safari-safe via the existing `-webkit-` prefix pass). The deep tier COMPOSES `--glass-level`, so the a11y brackets (`prefers-reduced-transparency: reduce` → `--glass-level: 0` → `blur(0)`) reach the deep plate for FREE (the opaque escape) — no new PRM leg.

---

## Gate — proof:glass-legibility L4 (re-pointed) + proof:glass-depth D2 (GREEN by construction), born-RED → GREEN

**NO new gate is authored.** The deep-tier budget call is ALREADY machine-locked by `proof:glass-legibility` L4 (`detectDeepBudget`, `:304-345`) — the BE build re-points the existing clause's measurement; the verdict differs by arm.

### Arm A (push lands) — the gate transitions
- **Born-RED state (HEAD at BE open):** at 16px L4 is GREEN-by-recorded-booking (it records `budgetCall: "stayed (16px, booking recorded)"`). The BE-specific born-RED is the PAINT bar: the deep-glass π asserts the resolved deep blur radius `>= 18px` — RED at 16px until the build lands.
- **GREEN at the build:** `--glass-blur-deep-radius >= 18` → L4 `:318-321` flips to `budgetCall: "cleared (>=18px)"`, the `radPx > 20` guard holds (18-20 ≤ 20). `proof:glass-depth` D2 stays GREEN (18-20 ∈ [14,20], > 13). `proof:glass-cal` + D3 stay GREEN (calm floor frozen).
- **The binding additional gate:** `proof:nested-backdrop-budget` GREEN on the candidate radius — the per-frame measurement that AUTHORIZES the push. If it reds at the candidate, the push is NOT landed (it falls to Arm B).

### Arm B (re-stamp HELD) — the gate stays GREEN honestly
- L4 stays GREEN via the recorded-booking path (`:322-333`): the 16px stay with the FRESH BE budget note matching `/BUDGET CALL/i` + `/profile:budget/i`. The disposition flips to HELD-with-current-number in the FOLD-LEDGER (no row deletion — L-inv-8).

### The self-test bite (the planted defect that MUST red)
The L4 self-test carries the load-bearing bites (`proof-glass-legibility.mjs`, VERIFIED): (a) a silent 16px-stay with NO budget booking reds; (b) a deep saturate 2.0 over the 1.8 ceiling reds. The BE-specific planted defect: **a deep radius `21px` (one past the apple.com nav ceiling) MUST red** L4 `:321` (`radPx > 20`). A second: **a push to 18px landed WITHOUT a recorded budget measurement in the inline note** — the honest-gate requires the cleared-budget number recorded, not just the value bumped (an un-measured 20px bump cannot green).

**Extend-vs-new:** NO new gate, NO new mechanism, NO new token (the clean-break discipline is N/A — nothing to retire; a value re-decision on a shipped mechanism). The L4 clause + the glass-depth π already exist; BE re-points their measurement (the BD precedent exactly).

---

## π — the binding paint readback

**Extend `tests-visual/glass-depth.spec.ts` (Chromium + WebKit, LOCAL real-render).** VISUAL wave (Arm A) → a `proof:ba-gestalt` glass/CTA verdict + a captured DELTA on real GPU, both modes × desktop+mobile. NO source-green close; "rides W-REFLECT3" FORBIDDEN (G8).

- **π readback (Arm A):** getComputedStyle on a `.glass-deep` surface over the live aurora, parse the resolved `backdrop-filter` blur radius, assert `>= 18px` AND read it against the calm floating 13px so the DELTA is measured (the richer diffusion reads). The `--glass-depth: 0.5` mid-depth read still LERPs to half-way (a host-dialed half-depth lands mid — the axis stayed a genuine driver). Both modes.
- **The captured DELTA (chrome-devtools-MCP):** the `.glass-deep` surface at 16px (BEFORE — BB's W-DEEP-GLASS-DELTA prior capture) vs 18-20px (AFTER) over the warm-aurora paper-grid, BOTH modes, with the MEASURED median frame-time annotated on each (the budget proof) + the resolved blur radius. A human reads: visibly MORE glass (richer refraction, apple.com-nav-grade) over the warm-cream craft, CLS≈0 (the static reserve holds). Lands at `docs/tranches/BE/audit/visual/W-DEEP-CEILING-DELTA.md` with the apple.com nav `blur(20)/sat(1.8)` ground annotated (the comparison ceiling — glass-ui matches the MATERIAL but over craft).
- **The frame-budget capture IS the load-bearing paint (Arm A):** the deep route under a scroll jiggle, the per-frame trace showing the median under 16.7ms at the candidate radius — the number that authorized the push, captured.
- **Both modes + Safari (where liquid):** the WebKit project asserts the deep frost paints at the candidate radius (the deep blur is `backdrop-filter` — Safari-safe; the deep tier reads on Safari, not a Chromium-only enhancement).
- **Arm B paint verification:** no paint (the value did not change); the DELTA is the recorded frame-budget number proving the bite + the FOLD-LEDGER HELD re-stamp. A re-stamp-HELD wave does NOT earn a `proof:ba-gestalt` verdict (zero-pixel-delta — the W-PRUNE-CONSOLIDATE precedent).

---

## Jubilance — the sited delights

- **FLOOR (Arm A) — the thick refractive deep glass.** The deep tier reads the apple.com-nav-grade material (richer diffusion, the "more glass" read) over the warm-aurora craft — the iOS-27 maximal liquid-glass, sited at the hero glass / dock / CTA. The delight is the depth of the refraction over the colored field.
- **FLOOR — the dark deep glows MORE.** The dark deep arm (saturate 1.55 / brightness 1.16 companion) lights the backdrop THROUGH the thicker frost (the luminous-dark transmissive read) — "dark glass glows where light passes," intensified at the deep tier.
- **No new motion** — the deep tier is a MATERIAL register (the `--glass-depth` LERP is host-dialed, not auto-animated); this wave is the radius VALUE, not a new animation.

---

## Fences — what stays byte-untouched / warm-cream identity / no-legacy

1. **The calm content default is INVIOLATE** (`proof:glass-cal` B1-B3 + `proof:glass-depth` D3). `--glass-blur-floating-radius` = 13px (the depth-0 LERP floor) and every base `--glass-blur-*-radius` STAY frozen. The push moves ONLY the deep depth-1 endpoint — a blind un-dial of a base primitive REVERTS the user's "a hair too much" call and reds D3. The deep tier is a SEPARATE family the calm ladder never reads (D5 baseTierDeepLeak).
2. **The budget is binding** (the BC/BD fence verbatim). Arm A lands ONLY on a CLEARED `proof:nested-backdrop-budget` + a captured per-frame trace. A push past a bite is the forbidden silent over-spend. The full 20px is the LIMIT (L4 `:321` reds `> 20`), never an overshoot.
3. **The warm-cream identity holds.** The radius is RICHER diffusion, not a hue shift. The deep saturate stays ≤ the baked 1.8 apple.com-nav ceiling and conservatively at 1.5 over the warm-aurora substrate (an over-juiced colored substrate reads garish — AX.W52 D19). No ppmycota/cool hue enters a token.
4. **The `--glass-depth` LERP recipe is inviolate.** The push edits the VALUE token (`:54`), never the `calc()` recipe (`:73-89`) — `proof:glass-depth` D1 (`deepRadiusReadsDepth`) + D4 (`deepRadiusComposesLevel`) stay GREEN. A hardcoded magnitude dropping `var(--glass-depth)`/`var(--glass-level)` reds.
5. **The dark deep arm is RADIUS-only across modes** — the dark saturate/brightness companions (dark-arm.css:240+) read the SAME `--glass-blur-deep-radius`; the push reaches both modes off the ONE token (no per-mode radius fork).
6. **No new gate, no new mechanism, no new token, no alias** — the L4 clause + the glass-depth π already exist; BE re-points their measurement. Substitution-vs-inheritance: a consumer retunes the deep radius via `--glass-blur-deep-radius` on a scope (presets-in-consumers — the library default IS its identity).
7. **The fold-ledger absorbs BD.W-DEEP-PUSH** — the BD converged-but-never-built wave is carried here (no silent drop); the disposition is BUILD (Arm A) or HELD-with-current-number (Arm B), recorded in proof:fold-ledger.

**Risk:** the deep route may genuinely bite on real mobile GPU (the most expensive idiom on a 4×-CPU-throttle mobile profile). The DECISION is the work; the conservative Arm-B fall is the recorded, honest outcome IFF the measurement bites — not a failure, the budget-binding fence working as designed. The wave is NOT "land 20px" — it is "MEASURE, then land-or-hold."
