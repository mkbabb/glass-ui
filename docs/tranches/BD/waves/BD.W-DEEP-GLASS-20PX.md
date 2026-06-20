# BD.W-DEEP-GLASS-20PX — re-decide + (if budget clears) land the Apple-nav deep-glass ceiling

- **Band:** 2 — Glass material deepening · **Status:** SPEC (tranche-dev; NOT executed) · **Source dim:** DF (T6) · **Fold-ledger:** Class A row 1 (`→BD.W-DEEP-GLASS-20PX`, trigger = profile:budget per-frame cost clears; else re-stamp HELD).
- **One-line goal:** Re-run the deferred budget call and — IFF a fresh per-frame `profile:budget` / `proof:nested-backdrop-budget` measurement clears — push the deep tier `--glass-blur-deep-radius` 16px → 18-20px (toward the live-measured apple.com nav `blur(20px)` ceiling) on the EXISTING `--glass-depth` LERP, the deep saturate staying ≤ the baked 1.8 ceiling; the warm-cream identity + the calm content default both inviolate.

---

## 1. Band + goal

**Band 2 — Glass material deepening.** This is the iOS-27 thick-material ceiling push the BC band conditionally deferred. The goal is NOT a new mechanism — the deep tier, the `--glass-depth` axis, the `.glass-deep` decoration, the `deep` CardTier rung, and the baked `--glass-saturate-deep-ceiling: 1.8` ALL shipped at BB.W-DEEP-GLASS and the saturate-as-load-bearing-term was pinned at BC.W-GLASS-LEGIBILITY-MEASURED. The owed item is the ONE deferred VALUE call: the deep radius stayed at the budget-clearing 16px with the 18-20px push "BOOKED if the budget bites" (`glass-deep.css:54-57`). BD re-measures the budget on the rebuilt BC floor and lands the push IFF it clears, else re-stamps HELD with the recorded number — never a silent over-spend (`backdrop-filter` radius is glass-ui's single most expensive idiom, super-linear past ~16px).

---

## 2. Starting state (verified on disk)

**`src/styles/tokens/glass-deep.css` — VERIFIED by reading the file.**

- `:54` — `--glass-blur-deep-radius: 16px;` with the inline note `/* in [14,20], STRICTLY > calm floating 13px; BUDGET CALL (L4): stays 16px, the 18-20px push toward the apple.com nav ceiling is BOOKED behind a recorded profile:budget clearance. */`
- `:58` — `--glass-saturate-deep: 1.5;` (`>= 1.5 toward Apple 1.8, > calm floating 1.18; ≤ ceiling`).
- `:61` — `--glass-saturate-deep-ceiling: 1.8;` (the apple.com-nav saturate CEILING, BAKED as the load-bearing term).
- `:73-81` — the `--glass-blur-deep-active-radius` recipe is a genuine LERP that reads BOTH `var(--glass-depth)` and `var(--glass-level)`:
  ```css
  --glass-blur-deep-active-radius:
      calc(
          ( var(--glass-blur-floating-radius)
            + (var(--glass-blur-deep-radius) - var(--glass-blur-floating-radius))
            * var(--glass-depth) )
          * var(--glass-level)
      );
  ```
  So lifting `--glass-blur-deep-radius` to 18-20px shifts the depth-1 ENDPOINT of the LERP; the depth-0 floor (the calm `--glass-blur-floating-radius` = 13px) and the `--glass-level` clarity-scalar compose are UNTOUCHED. This is the substitution-vs-redeclaration discipline in action: the VALUE token changes, the recipe MECHANISM does not.
- `:86-89` — `--glass-saturate-deep-active` LERPs `1.18 → var(--glass-saturate-deep)` on `var(--glass-depth)`. If the budget allows, the saturate may also lift toward the 1.8 ceiling (still ≤ the baked bound).
- `:97-99` — the composed `--glass-blur-deep: blur(var(--glass-blur-deep-active-radius)) saturate(var(--glass-saturate-deep-active));`.

**`scripts/proof-glass-legibility.mjs` — the L4 budget clause, VERIFIED by reading `:304-345` (`detectDeepBudget`).** The clause reads `--glass-blur-deep-radius`, `--glass-saturate-deep`, `--glass-saturate-deep-ceiling` from `tokens/glass-deep.css` and asserts:
- `:318-321` — IF `radPx >= 18`: budget cleared; `radPx > 20` reds ("past the apple.com nav 20px ceiling — the booked successor is the LIMIT, not an overshoot").
- `:322-333` — ELSE (stayed at 16px): the budget BOOKING must be recorded (`:327-328` — the unstripped source must match `/BUDGET CALL|booked|book(s|ed)? the (18-20|full 20|18-20px)/i` AND contain `/profile:budget/i`); a silent stay reds. `radPx` must stay in `[14,20]`.
- `:335-343` — the deep saturate ≤ the baked 1.8 ceiling; the ceiling itself ≤ 1.8.

**`scripts/proof-glass-depth.mjs` — D2, VERIFIED `:133-167`.** Asserts `deepRadius > 13` (strictly deeper than calm floating) AND `deepRadius ∈ [14,20]` (the Apple band) AND `deepSaturate > 1.18` AND `deepSaturate >= 1.5`. The constants `APPLE_BAND = {min:14, max:20}` (`:58`), `DEEP_SATURATE_FLOOR = 1.5` (`:59`), `CALM_FLOATING_RADIUS = 13` (`:54`). A push to 18-20px stays GREEN on D2 by construction (in-band, deeper).

**`scripts/proof-nested-backdrop-budget.mjs` — VERIFIED head.** The live per-frame gate: it runs `tests-visual/nested-backdrop-budget.spec.ts` (Chromium) which mounts the glass-Button-in-glass-Card-in-glass-Dialog nested stack on the live `:5199` demo, measures the nested `backdrop-filter` DEPTH + a frame-time series under a scroll/resize jiggle, and asserts depth ≤ ceiling, `contain: paint` present, median frame under the 60fps budget. `['local']`-tagged, fail-CLOSED locally, `liveArmCiGraceSkip()` under CI.

**`scripts/profile-bundle.mjs` — VERIFIED head.** `profile:budget` (`--enforce`) is the bundle-weight gate (the deep token edit changes ZERO bundle bytes meaningfully — a 2-char value). The BINDING per-frame cost gate is `proof:nested-backdrop-budget` + a fresh chrome-devtools-MCP `performance_start_trace` capture, NOT the bundle gate.

**The supporting on-disk reality:**
- `tests-visual/glass-depth.spec.ts` EXISTS (10164 bytes — the binding π for the deep tier).
- `src/styles/glass/deep.css:41` — `.glass-deep { ... }` the decoration rule (re-points `--glass-blur-floating: var(--glass-blur-deep)`).
- `src/styles/tokens/property-regs.css:230-241` — `@property --glass-depth` registered as a typed inheriting `<number>` (the `--glass-level` twin).
- `docs/tranches/BB/audit/visual/W-DEEP-GLASS-DELTA.md` EXISTS (the prior 16px capture — the BEFORE for the BD comparison).
- Demo deep-tier surfaces: `demo/stories/substrates/glass-panel.vue` + `demo/stories/substrates/glass-material.vue` (the routes where `.glass-deep` / `tier="deep"` paint over the substrate aurora).

**The BC origin (verified `BC.W-GLASS-LEGIBILITY-MEASURED.md:34,43,67`):** "push `--glass-blur-deep` toward 18px / saturate 1.6-1.8 IF the `profile:budget` per-frame cost clears … the full 20px stays booked if the budget bites" + the fence "The budget is binding … no silent over-spend." BD is the re-measurement the BC wave named.

---

## 3. The build

**The build is a CONDITIONAL VALUE EDIT gated on a fresh live per-frame measurement — there is NO mechanism change, NO new token, NO recipe edit.** Two arms, decided by the budget:

### Arm A — the budget CLEARS (the push lands)
Edit `glass-deep.css:54`:
```css
--glass-blur-deep-radius: 20px; /* (or 18px) — budget CLEARED 2026-06-DD: nested-backdrop-budget
                                   median frame <Nms under the 60fps budget on the deep route,
                                   the live apple.com nav blur(20px) ceiling reached (research/
                                   apple-glass.md §1.1). The push off the BC-booked 16px. */
```
Optionally lift `--glass-saturate-deep` toward 1.6 (`:58`) — but ONLY if the warm-aurora light-concentration read stays just-rich, NOT garish (the warm-cream identity bound; the shipped 1.5 is already restrained-by-design over the colored substrate, so the radius is the primary "more glass" lever — the saturate lift is OPTIONAL and the more conservative call is to keep 1.5 even when the budget clears the blur). The ceiling `--glass-saturate-deep-ceiling: 1.8` (`:61`) is UNTOUCHED.

The LERP recipe (`:73-89`), the `--glass-level` compose, the calm depth-0 floor (`--glass-blur-floating-radius` = 13px), and the dark-arm companions (`tokens/dark-arm.css` saturate/brightness) are ALL byte-untouched — only the depth-1 endpoint value moves. Update the inline `:54-57` note to record the cleared budget number (so the L4 honest-gate sees the measurement, not a silent stay). If 18px clears but 20px bites, land 18px and re-book the 18→20 final step with the recorded 20px number.

### Arm B — the budget BITES (re-stamp HELD)
`glass-deep.css:54` STAYS at `16px`. The inline `:54-57` budget-call note is UPDATED to record the FRESH BD measurement (the per-frame cost number that bit, the date, the route) so the L4 booking is the CURRENT honest record, not the stale BC one. The 18-20px push is re-booked to a future tranche WITH the recorded throttle number. This is the recorded conservative fall the SEED + FOLD-LEDGER name ("the full 20px stays booked if the budget bites").

**The decision procedure (the wave's actual work):** run `proof:nested-backdrop-budget` + a chrome-devtools-MCP `performance_start_trace` over the deep route (`/substrates/glass-material` with `tier="deep"` over the live aurora) at 16px (baseline) and at 18px + 20px (candidate), on the real GPU, measuring the median + p95 frame time under a scroll/resize jiggle. The push lands ONLY if the candidate radius median frame stays under the 60fps budget (16.7ms) with headroom matching the 16px baseline within tolerance. The number IS the deliverable; the radius value is its output.

**Fences honoured in both arms:** GL-shader fence N/A (CSS-token only, zero shader touch). profile:budget binding (Arm A only lands on a cleared measurement). Warm-cream identity (radius is diffusion, not hue; saturate stays ≤ 1.8 and conservatively at 1.5). Substitution-vs-inheritance (the value token moves, the LERP/level recipe is inviolate). Calm content default INVIOLATE (`--glass-blur-floating-radius` = 13px frozen — `proof:glass-cal` + `proof:glass-depth` D3 stay GREEN by construction). One-GL-per-route N/A. Presets-in-consumers (the library deep DEFAULT evolves as identity; a consumer who wants a different deep radius overrides `--glass-blur-deep-radius` on a scope — the same token).

---

## 4. The gate — born-RED → GREEN

**No new gate is authored.** The deep-tier budget call is ALREADY machine-locked by `proof:glass-legibility` L4 (`detectDeepBudget`, `:304-345`) — the BD build re-points the existing clause's measurement, and the gate verdict differs by arm:

### Arm A (push lands) — the gate transitions
- **Born-RED state (HEAD at BD open):** at 16px the L4 clause is GREEN-by-recorded-booking — it does NOT red, but it records `budgetCall: "stayed (16px, booking recorded?)"`. The BD-specific born-RED is the PAINT bar: the deep-glass π (`glass-depth.spec.ts` + a new deep-radius readback) asserts the resolved deep `backdrop-filter` blur radius `>= 18px` AND the live frame budget clears — RED at 16px, GREEN only when both clear. This is the wave's born-RED→GREEN: the radius readback fails at HEAD's 16px until the build lands.
- **GREEN at the build:** `--glass-blur-deep-radius >= 18` → L4 `:318-321` flips to `budgetCall: "cleared (>=18px)"`, the `radPx > 20` guard holds (18-20 ≤ 20). `proof:glass-depth` D2 stays GREEN (18-20 ∈ [14,20], > 13). `proof:glass-cal` + D3 stay GREEN (calm floor frozen).
- **The binding additional gate:** `proof:nested-backdrop-budget` GREEN on the candidate radius — the per-frame measurement that AUTHORIZES the push. If it reds at the candidate radius, the push is NOT landed (it falls to Arm B).

### Arm B (re-stamp HELD) — the gate stays GREEN honestly
- L4 stays GREEN via the recorded-booking path (`:322-333`): the 16px stay with the FRESH BD budget note matching `/BUDGET CALL.../i` + `/profile:budget/i`. The disposition flips to HELD-with-current-number in the FOLD-LEDGER (no row deletion — L-inv-8).

### The self-test bite (the planted defect that MUST red)
The L4 self-test already carries the load-bearing bites (`proof-glass-legibility.mjs:430-435`, VERIFIED): (a) `:431-432` — a silent 16px-stay with NO budget booking reds; (b) `:434-435` — a deep saturate 2.0 over the 1.8 ceiling reds. The BD-specific planted defect: **a deep radius `21px` (one past the apple.com nav ceiling) MUST red** L4 `:321` (`radPx > 20` → "past the apple.com nav 20px ceiling"). A second planted defect: **a push to 18px landed WITHOUT a recorded budget measurement in the inline note** — verify the honest-gate requires the cleared-budget number to be recorded, not just the value bumped (extend the L4 booking-record check to the CLEARED arm if it does not already require a recorded number on the push, so an un-measured 20px bump cannot green). The existing self-test arm asserts these bites have teeth every run (`--self-test`).

---

## 5. Paint verification (both modes — the BC anti-disease law)

**This is a VISUAL wave — it earns a `proof:ba-gestalt` glass/CTA verdict and a CAPTURED paint delta on real GPU, both modes × desktop+mobile, per the BC gestalt-first-capture law. NO source-green close; the "rides W-REFLECT3" pattern is FORBIDDEN (proof:ba-gestalt G8).**

- **π readback:** extend `tests-visual/glass-depth.spec.ts` (Chromium + WebKit, LOCAL real-render) — getComputedStyle on a `.glass-deep` surface over the live aurora, parse the resolved `backdrop-filter` blur radius, assert `>= 18px` (Arm A) AND read it against the calm floating 13px so the DELTA is measured (the richer diffusion reads). Both modes. The `--glass-depth: 0.5` mid-depth read still LERPs correctly (a host-dialed half-depth lands half-way, proving the axis stayed a genuine driver).
- **Captured DELTA (chrome-devtools-MCP):** a side-by-side capture of the `.glass-deep` surface at 16px (BEFORE — `W-DEEP-GLASS-DELTA.md`'s prior capture) vs 18-20px (AFTER) over the warm-aurora paper-grid, BOTH modes, with the MEASURED median frame-time annotated on each (the budget proof) + the resolved blur radius. A human reads: visibly MORE glass (richer refraction, the apple.com-nav-grade material) over the warm-cream craft, CLS≈0 (the static reserve holds — no layout animates). Lands at `docs/tranches/BD/audit/visual/W-DEEP-GLASS-20PX-DELTA.md` with the apple.com nav `blur(20)/sat(1.8)` ground annotated alongside (the comparison ceiling — glass-ui matches the material BUT over craft, not a flat scroll-under panel).
- **The frame-budget capture IS the load-bearing paint** (Arm A): the deep route under a scroll jiggle, the per-frame trace showing the median under 16.7ms at the candidate radius — the number that authorized the push, captured.
- **Arm B paint verification:** no paint (the value did not change); the DELTA is the recorded frame-budget number proving the bite + the FOLD-LEDGER HELD re-stamp. A re-stamp-HELD wave does NOT earn a `proof:ba-gestalt` verdict (zero-pixel-delta — the W-PRUNE-CONSOLIDATE precedent).

---

## 6. Fences + risks (what must NOT break)

1. **The calm content default is INVIOLATE** (`proof:glass-cal` B1-B3 + `proof:glass-depth` D3, verified `:62-70` + `:169-205`). `--glass-blur-floating-radius` = 13px (the depth-0 LERP floor) and every base `--glass-blur-*-radius` STAY frozen. The push moves ONLY the deep depth-1 endpoint — a blind un-dial of a base primitive REVERTS the user's "a hair too much" call and reds D3. The deep tier is a SEPARATE family the calm ladder never reads (`proof:glass-depth` D5 baseTierDeepLeak).
2. **The budget is binding** (the BC fence verbatim). Arm A lands ONLY on a CLEARED `proof:nested-backdrop-budget` + a captured per-frame trace. A push past a bite is the forbidden silent over-spend. The full 20px is the LIMIT (L4 `:321` reds `> 20`), never an overshoot.
3. **The warm-cream identity holds.** The radius is RICHER diffusion, not a hue shift. The deep saturate stays ≤ the baked 1.8 apple.com-nav ceiling (`:341-342`) and conservatively at 1.5 over the warm-aurora substrate (the over-juiced-colored-substrate read is garish — AX.W52 D19). No ppmycota/cool hue enters a token.
4. **The `--glass-depth` LERP recipe is inviolate.** The push edits the VALUE token (`:54`), never the `calc()` recipe (`:73-89`) — `proof:glass-depth` D1 (`deepRadiusReadsDepth`/`deepSaturateReadsDepth`) + D4 (`deepRadiusComposesLevel`) stay GREEN. A hardcoded magnitude that drops `var(--glass-depth)` or `var(--glass-level)` reds.
5. **Substitution-vs-inheritance.** A consumer retunes the deep radius by overriding `--glass-blur-deep-radius` on a scope — the SAME token the library default reads. The library default IS its identity (presets-in-consumers).
6. **No new gate, no new mechanism, no new token, no alias** (clean-break discipline N/A — there is nothing to retire; this is a value re-decision on a shipped mechanism). The L4 clause + the glass-depth π already exist; BD re-points their measurement.

**Risk:** the deep route may genuinely bite on real mobile GPU (the most expensive idiom on a 4×-CPU-throttle mobile profile). The DECISION is the work; the conservative Arm-B fall is the recorded, honest outcome IFF the measurement bites — not a failure, the budget-binding fence working as designed. The wave is NOT "land 20px" — it is "MEASURE, then land-or-hold."
