# AO.W4 — CSS budget re-base + cascade consolidation + R0G-5 token — audit

Closes AO.W4. The CSS cascade consolidates against the honest ceiling the W2 gate now measures, the budget re-bases against the real combined draw, per-subpath drift enforcement lands, and the R0G-5 consumer token ships. Two file-disjoint carves (cascade ‖ gate); Carve B settled the cascade, then Carve A re-based against the measured result.

## Carve B — cascade consolidation + tokens

### R0G-5 — `--surface-public-data-panel` token (additive)
Added to `tokens.css` §5 (the `--card`/`--popover` opaque-surface convention) with a `.dark` mirror and a `--color-surface-public-data-panel` bridge in `theme.css`: light `hsl(44 16% 96%)`, dark `hsl(36 9% 12%)` — a warm-neutral nudge off `--card` (hue 48→44, +4 sat, −2 L) so a consumer's aurora-OFF `/dashboard/*` surfaces stop reading colder than the warm `/admin/*` chrome. Token only.

### Chassis reserve canonical tokens (token-first completion of R0G-2)
Added `--instrument-dial-min-height-mobile: 24rem` + `--instrument-dial-meter-reserve-mobile: minmax(0, 1fr)` to `tokens.css` §10 (matching the inline `var(…, fallback)` W3 landed in `instrument-chassis.css`), so the chassis reserve resolves canonically (J inv 1 token-first). `instrument-chassis.css` untouched (W3 owns it; the fallbacks stay as the safety net).

### drawer.css bug fix
`drawer.css:49` `hsl(var(--background))` → `var(--background)` and `:101` `hsl(var(--drawer-handle-color))` → `var(--drawer-handle-color)` — both tokens are already full `hsl()` values; the double-wrap rendered invalid colors. Zero double-wraps remain.

### D6 — cascade consolidation (conservative)
- **dock.css** — folded the split `--dock-tab-h` density set into the four `.glass-dock[data-density]` blocks, inlined the single-use `--dock-tab-h-{tier}` intermediaries; hoisted the verbatim `:focus-visible`/`:disabled` four-state rules to two shared zero-specificity `:where(…)` group rules (the idiom the file already uses).
- **utilities.css** — `:where()`-hoisted the shared `.hover-lift{,-md,-lg}` transition + the `.shadow-cartoon-{sm,md,lg}` border (true duplicates only).
- **prose trims (greenfield voice)** — tokens.css / dock.css / typography.css / utilities.css version-history + rationale archaeology.
- **No rung retired.** The rainbow family (mis-retired+reverted once), `--configurator-row-*`, the `disco-glyph` phase-tint hook, and the btn-audacious-gold hover scaffold were all considered and LEFT intact (no zero-consumer proof in hand / distinct-recipe-not-duplicate). The "when in doubt, leave it" guardrail held — the interim gate already passed (no breach pressure).

**Reclaim:** pre-consolidation resolved draw 80827 gzip → **post-consolidation 74928 gzip** (gate's `combinedStylesDraw`) — **6476 gzip reclaimed**, above the W1.2-projected ~5500, almost entirely from dock.css dedup + prose trim. `proof:theme` byte-clean (every rung + the new token ships); build + typecheck 0.

## Carve A — re-base + per-subpath enforcement

### D4 — re-based ceiling
`scripts/profile-bundle.mjs` `BUDGETS["dist/styles/index.css"]` = `{ raw: 340_000, gzip: 82_500 }` — the measured post-consolidation resolved draw (gzip 74928 / raw 308645) + ~10% headroom (74928 × 1.10 ≈ 82421 → 82500). Derived, not invented. The SFC-only 8650 ceiling + the N.W0→P.W0→P.W3→Q.W4 bump-at-every-close comment chain retired, replaced with one principled comment.

```
[PASS] dist/styles/index.css — raw 308645 / 340000 (90.8%); gzip 74928 / 82500 (90.8%)
```

The ~91% utilization is the deliberate 10% headroom (the gate trips on >10% cascade growth without a deliberate re-base) — not a near-breach. The old "90.2%" was a phantom against a 7.8 KiB fragment; this 90.8% is against the real ~75 KiB draw.

### D5 — per-subpath drift enforcement
`DRIFT_CEIL = 0.10`, `MIN_GATED_GZIP = 1024`. For each baseline `entry` chunk ≥ 1 KiB: `drift = (cur - base)/base`; FAIL under `--enforce` when `drift > 0.10`; a vanished baseline entry is MISSING-FAIL; a new current entry is reported-not-failed; sub-1-KiB shims SKIP. FAILs fold into `anyBudgetExceeded`; per-chunk `[PASS|FAIL|MISSING|SKIP|NEW]` report lines. The baseline `W4-bundle-profile.json` regenerated post-D1/D2/post-consolidation as the honest drift baseline (the prior one carried the SFC-only CSS row + was generated through the footgun).

```
[PASS] dist/aurora.js — gzip 16470 vs baseline 16470 (drift +0.0%)
[PASS] dist/glass-ui.js — gzip 8642 vs baseline 8642 (drift +0.0%)
```

**Drift probe:** injected a smaller baseline gzip for `aurora.js` (16470 → 13000), re-ran `--enforce` → `[FAIL] dist/aurora.js — gzip 16470 vs baseline 13000 (drift +26.7%)`, exit 1; restored the baseline → exit 0.

**W2 measurement unchanged** — Carve A changed only the ceiling constant, not `combinedStylesDraw`, so the cascade-regression property (a byte in any rung moves the gated number) still holds.

## Gate table

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | typecheck + build exit 0 (default heap) | MET | both 0 |
| 2 | `proof:theme` byte-clean (every rung + the new token ships) | MET | proof:theme 0 |
| 3 | honest gate PASSES with documented headroom | MET | `[PASS] styles/index.css gzip 74928/82500 (90.8%)`, --enforce 0 |
| 4 | per-subpath caps enforced; synthetic regression trips | MET | aurora probe → FAIL +26.7%; restored |
| 5 | visual π re-probe — zero canon regression | DEFERRED→W5 | runs in the close ceremony |
| 6 | W2 fails-on-synthetic-cascade-regression still holds | MET | `combinedStylesDraw` unchanged |

Gates 1-4, 6 MET; gate 5 (visual π) runs at the W5 close. W4 closes.
