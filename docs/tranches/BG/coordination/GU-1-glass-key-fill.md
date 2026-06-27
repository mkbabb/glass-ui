# GU-1 — the under-shadow key-light lean (Δ-group `glass-key-fill`, 4.4.0-line)

**Cross-repo ASK from the atlas/sci-report agent (K-PAPER), received 2026-06-26.** READY additive cut.
Ships on the **next-minor 4.4.0-line** — does NOT re-open the parked 4.3.0 (`release/4.3.0`) /
K-I-ROOT-AUTHOR Δ1-6. glass-ui-only (GU-2 `defineExpose({pixels})` on VizTextOverlay is ATLAS-side —
not ours). Source of record: `atlas/docs/tranches/K/paper/K-PAPER-GLASSUI-ASKS.md` (atlas commit a2bf1bd).

**Anchors HEAD-VALIDATED on tranche/BG (v4.2.0) 2026-06-26** — all confirmed live (line numbers exact).

## The problem

glass-ui obeys a single 45° down-left key — the inset rim (`--glass-key-lit-x: -1px` @ glass-fx.css:110,
`--glass-key-shade-x: 1px` @ :112) and the `.shadow-cartoon-*` cel cast both read it. The lone holdout is
the non-inset under-shadow FILL family (glass-fx.css:430-432), which still casts straight down (X = 0).
Lean it into the same hemisphere — law-closure (single-source-of-light truth), not a visible tilt (a
sub-pixel X on an 8-32px blur).

## The 3 edits (all value-only — α/blur/spread untouched)

1. **Mint the token** inside the `BD.W-GLASS-KEY-EDGE` keystone `:root` block, right after
   `--glass-key-shade-x` (glass-fx.css:~113):
   ```css
   --glass-key-direction: -0.375; /* = -3/8 = tan 20.56° down-left — the soft-fill lean
                                     (cel cast = 45° KEY, under-shadow = 20.56° FILL) */
   ```
2. **Derive X on the three under-shadow tiers** (glass-fx.css:430-432) — Y/blur/spread/α byte-identical:
   ```css
   --glass-under-shadow-quiet:   calc(2px * var(--glass-key-direction)) 2px 8px  -1px oklch(0 0 0 / 0.04); /* X: 0 → -0.75px */
   --glass-under-shadow-default: calc(4px * var(--glass-key-direction)) 4px 16px -2px oklch(0 0 0 / 0.08); /* X: 0 → -1.5px  */
   --glass-under-shadow-vivid:   calc(8px * var(--glass-key-direction)) 8px 32px -4px oklch(0 0 0 / 0.12); /* X: 0 → -3px    */
   ```
   Leave `--glass-under-shadow-spine` (:433, `0 1px 0 0`) UNCHANGED — it is an edge-thickness cue,
   intentionally omnidirectional, not a cast.
3. **Re-point the one hand-rolled non-token consumer** — the dock-wrap vivid cast at
   dock/overflow.css:143 (`0 8px 32px -4px color-mix(…)`): change the leading `0` to
   `calc(8px * var(--glass-key-direction))`.

## Framing (the prose that ships with the changeset)

Do NOT cite "Material key+ambient" as authority — Material centers its ambient by design, so leaning it
contradicts the model. The correct pitch: **cel cast = 45° KEY, under-shadow = 20.56° FILL — one light,
two box-shadow conventions; even the soft fill obeys the key hemisphere.** Law-closure, sub-pixel.

Fence the new mis-couple trap in the keystone comment: the block now holds **two magnitudes for one
light** — edge-SELECT px tokens (`--glass-key-{lit,shade}-x`) vs the cast-RATIO (`--glass-key-direction`).

## Holdout ledger (publish in the changeset — explicit scope)

- **LEANS-NOW:** the 3 tiers + every `var()` inheritor (select.css:132, the btn-under-shadow chain,
  ladder rungs, scrubber, GlassTimeline:197, `--shadow-dock-wrap` + the overflow.css:143 re-point).
- **DEFERRED (chartered follow-on):** the `--shadow-sm…2xl` paper family + SortableList:122 drag-lift.
- **INTENTIONALLY-OMNIDIRECTIONAL:** the spine rung, hairline-under-shadow, the uniform rung.

## Safety

The two tests touching these tokens match them by NAME, not literal value → the value-only calc breaks
neither. No `@property` registration (matches the plain `--glass-key-*` convention). No dark-arm
companion — the ink is `oklch(0 0 0 / α)`, mode-invariant.

## Acceptance + sequencing

Apply the 3 edits; re-approve `tests-visual/` baselines for the 7 under-shadow consumers
(human-imperceptible). **Cut on the 4.4.0-line — AFTER 4.3.0 publishes** (the parked `release/4.3.0`
Δ1+Δ2) and ideally after the BG convergence lands. The atlas consumes fallback-first on its next bump
off 4.1.0. This is an additive Δ-group `glass-key-fill`; one commit.
