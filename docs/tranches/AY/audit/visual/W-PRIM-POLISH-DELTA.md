# W-PRIM-POLISH — the primitive-defect wave (FD-primitives D1-D7) — DELTA

**Wave:** AY.W-PRIM-POLISH · **Status:** live-verified · **Verdict:** PASS (route (a) deepen-plate for D1).

The four headline-surface primitive defects + the slider focus + the checks-band decision,
fixed at the ROOT and re-proven against PIXELS. Routes: `/display/buttons`, `/display/badge`,
`/containers/dialog`, `/forms/slider`, `/forms/checks`. Viewports: **390×844 (REAL mobile)** +
1280×800. Schemes: {light, dark}. Device: Chrome-headless-new, ANGLE→Metal, via
`tests-visual/affordance-contrast-gold.spec.ts` (the D1 painted-pixel π twin) +
`tests-visual/_prim-polish-capture.spec.ts` (the own-surface capture sweep).

---

## D1 — gold CTA light-hover: 1.29:1 → 5.08:1 (PAINTED) [route (a) deepen-plate]

The gold "Next →" hover backplate was a translucent 22-30% gold wash over near-cream glass →
white label at **1.29:1** (vanishing at click intent). Route (a) (the AW.W13-contract-true
path): the hover plate is now an OPAQUE deep gold — a new mode-INVARIANT token
`--color-gold-deep` (`oklch(0.487 0.103 63.0)`, fixed in both modes) as the solid base, with
the shimmer sweep as a ≤18% gold overlay ABOVE it. Deepening toward the mode-flipping
`--foreground` was rejected (it brightened the DARK plate to cream-gold, breaking dark) — the
fixed deep gold holds in both modes.

**Painted-pixel readback (π twin, the binding truth):**

| scheme | label | painted backplate | ratio |
|---|---|---|---|
| light | rgb(255,255,255) | rgb(154,98,20) | **5.08:1** ✓ |
| dark  | rgb(255,255,255) | rgb(157,102,24) | **4.84:1** ✓ |

Gate: `proof:affordance-contrast` (extended, clause 1b — the OPAQUE `--color-gold-deep` base
arm; born-RED on the pale ≤30% wash) + `tests-visual/affordance-contrast-gold.spec.ts`
(born-RED on the 1.29:1 state). Captures: `W-PRIM-POLISH-gold-hover-{mobile390,desktop1280}-{light,dark}.png`.

## D2 — the lying hover specimen: 1.28:1 → 16.69:1 (PAINTED)

`buttons.vue:99` painted `<Button class="bg-primary/90">Hover (sim.)</Button>` — the pre-W54
solid-primary hover on the post-W54 glass default, WITHOUT the text-flip → ink-on-ink
**1.28:1** light / putty-on-putty 1.18:1 dark. Replaced with the REAL default hover:
`class="bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]"`.

**Readback:** the specimen now paints the glass-resting plate (`color(srgb 0.98… / 0.65)`)
with warm-ink `rgb(28,25,23)` text → **16.69:1** (light, over the composited plate). The
specimen teaches what the button actually does. Captures:
`W-PRIM-POLISH-buttons-specimen-{mobile390,desktop1280}-{light,dark}.png`.

## D3 — the dark modal scrim CREAM FOG → ink-receding wash (BOTH modes)

`--overlay-scrim` derived from `--shadow-color: var(--foreground)` → in dark it painted
`srgb(0.91 0.906 0.89 / 0.5)`, a near-WHITE wash that BRIGHTENED the page at the modal moment.
SPLIT off `--shadow-color`: minted `--overlay-scrim-ink: hsl(24 10% 10%)` (a fixed warm
near-black) — `--overlay-scrim{,-strong,-subtle}` derive from it, so the scrim RECEDES to ink
in BOTH modes. Clean break, no alias. The `--shadow-color` / `--shadow-cartoon-*` family is
UNTOUCHED.

**Readback (dark):** `--overlay-scrim` resolves `color-mix(in srgb, hsl(24 10% 10%) 50%,
transparent)` (a DARK wash) — was the cream fog. The capture
`W-PRIM-POLISH-dialog-scrim-{mobile390,desktop1280}-dark.png` shows the page behind the
dialog DIMMING to dark (was flooding bright). Light mode is unchanged (the classic ink scrim).

## D4 — the dark destructive badge: 3.07:1 → 4.75:1 (PAINTED)

The dark destructive badge (`hsl(0 80% 60%)` = rgb(235,71,71) plate, rgb(232,231,227) text at
14px/600) painted **3.07:1**. The Badge-SCOPED `dark:` arm deepens the plate to
`hsl(0 70% 45%)` (rgb(195,34,34)) → **4.75:1**, preserving the loud-saturated register. The
shared `--destructive` token is UNTOUCHED (Button/input-invalid-ring keep their value).
Captures: `W-PRIM-POLISH-badge-destructive-{mobile390,desktop1280}-{light,dark}.png`.

## D5 — the slider thumb focus: 8%-alpha ghost → the button register

The standard `.slider-thumb:focus-visible` carried only a 4px halo at **8% alpha**
(`srgb(0.11 0.098 0.09 / 0.08)`) — a ghost on a 16px knob. Re-pointed to compose
`--focus-ring-shadow` (the warm-ink double ring, 2px @ 30% + 8px halo @ 15% — the SAME token
the `.focus-ring` utility keys off). The spectrum thumb focus rides the same register.

**Readback:** `box-shadow: color(srgb 0.11 0.098 0.09 / 0.3) 0 0 0 2px, color(srgb 0.11 0.098
0.09 / 0.15) 0 0 8px` (light) — the 30%/15% button register, NOT the 8% ghost. Captures:
`W-PRIM-POLISH-slider-focus-desktop1280-{light,dark}.png`.

## D7 — the checks-band decision (canon-decided, size-gated split)

Per the glass-first canon (a surface is EITHER glass OR named on the W54 legibility
allowlist), the checks band was in NEITHER set. **DECISION (canon-decided, NOT a user-hinge):**

- **Checkbox/Radio → ARM B (allowlist).** Appended `checkbox`, `radio-group` to the
  `proof:glass-cohesion` legibility allowlist (the gate that reads it). Rationale: a 16px
  selection atom is below the size where glass reads as glass over a flat substrate (the blur
  is sub-perceptual — ARM A would ship machinery that paints opaque anyway, the
  speculative-substrate overfit). Its checked/unchecked STATE wants MAXIMAL contrast — the
  same legibility argument the allowlist makes for `badge`'s loud pill. The opacity is now
  RATIFIED (blessed, not unconverted). The SFCs are UNCHANGED.
- **Switch track → ARM A (glass).** The Switch TRACK (24×44px) is the one checks-atom large
  enough to read glass: `Switch.vue` composes the `.glass-wash` tier + `.glass-specular-track`
  top-edge, and the unchecked register is `var(--glass-bg-wash)` (was the opaque
  `color-mix(--input 80%, --glass-bg-quiet)`). The checked ON-state stays `--primary` (the
  warm-ink signature, UNCHANGED). The Switch is now a glass surface on the
  `proof:glass-cohesion` band (44 surfaces on-model, GREEN).

The live Switch-glass capture reads CLEAN (the on/off affordance is preserved — the ON-state
ink fill is the signature; the unchecked wash plate reads translucent-with-specular), so the
§3a user-hinge does NOT fire (no worse-than-opaque verdict). Captures:
`W-PRIM-POLISH-switch-glass-{mobile390,desktop1280}-{light,dark}.png`.

## D6 — RECORDED as context, routed (NOT this wave's fix)

The five-identical-pills (default/outline/ghost/glass/glass-wash over flat cream) is the known
W54→W60 sequencing gap — glass laid before the rich page backdrops that make it POP. NOT
chased here (a per-variant tint would FIGHT the W54 glass-first canon). Routed to the
page-redesign band (W60 umbrella). The prose spec-dump on the buttons page routes to W-SB1.

---

## Captured own-surface PNGs (real on-disk, ≥1024 B, `\x89PNG`)

| surface | light | dark |
|---|---|---|
| gold CTA hover (desktop) | `W-PRIM-POLISH-gold-hover-desktop1280-light.png` | `W-PRIM-POLISH-gold-hover-desktop1280-dark.png` |
| gold CTA hover (mobile 390) | `W-PRIM-POLISH-gold-hover-mobile390-light.png` | `W-PRIM-POLISH-gold-hover-mobile390-dark.png` |
| buttons specimen (desktop) | `W-PRIM-POLISH-buttons-specimen-desktop1280-light.png` | `W-PRIM-POLISH-buttons-specimen-desktop1280-dark.png` |
| buttons specimen (mobile 390) | `W-PRIM-POLISH-buttons-specimen-mobile390-light.png` | `W-PRIM-POLISH-buttons-specimen-mobile390-dark.png` |
| dark dialog scrim (desktop) | — (D3 is dark-only) | `W-PRIM-POLISH-dialog-scrim-desktop1280-dark.png` |
| dark dialog scrim (mobile 390) | — (D3 is dark-only) | `W-PRIM-POLISH-dialog-scrim-mobile390-dark.png` |
| dark destructive badge (desktop) | `W-PRIM-POLISH-badge-destructive-desktop1280-light.png` | `W-PRIM-POLISH-badge-destructive-desktop1280-dark.png` |
| dark destructive badge (mobile 390) | `W-PRIM-POLISH-badge-destructive-mobile390-light.png` | `W-PRIM-POLISH-badge-destructive-mobile390-dark.png` |
| slider focus halo (desktop) | `W-PRIM-POLISH-slider-focus-desktop1280-light.png` | `W-PRIM-POLISH-slider-focus-desktop1280-dark.png` |
| switch glass track (desktop) | `W-PRIM-POLISH-switch-glass-desktop1280-light.png` | `W-PRIM-POLISH-switch-glass-desktop1280-dark.png` |
| switch glass track (mobile 390) | `W-PRIM-POLISH-switch-glass-mobile390-light.png` | `W-PRIM-POLISH-switch-glass-mobile390-dark.png` |

All own-surface (`^W-PRIM-POLISH-`), each >1024 B PNG; the `-light.png`/`-dark.png` pair the
ledger own-surface depth-lint requires is present.

---

## Gate evidence

- `proof:affordance-contrast` (extended) — **PASS** (gold deepened-plate arm; born-RED on the
  pale wash). The two stale-regex clauses W-GLASS/`useTokenColor` refactors broke (the
  slider-range `color-mix` form; the GooBlob `tokenColors.resolve` composable seam) are
  re-pointed to the current source — their intent is unchanged, the regexes were stale.
- `tests-visual/affordance-contrast-gold.spec.ts` — **PASS** 2/2 (light 5.08:1, dark 4.84:1).
- `proof:slider-two-only` — **PASS** (the cylinder correction; clause-3 conjunction).
- `proof:glass-cohesion` — **PASS** (44 surfaces on-model; Switch glassed, checkbox/radio
  allowlisted).
- `proof:glass-level`, `proof:primitive-affordance`, `proof:dark-semantic-contrast`,
  `proof:liquid-glass-tokens`, `proof:adaptive-glass` — **PASS** (adjacent fleet green).
- `npx vue-tsc --noEmit` — exit 0.
- `proof:live-verified-ledger:ay` — GREEN with the `W-PRIM-POLISH` row backed by this DELTA →
  the own-surface `^W-PRIM-POLISH-` light+dark PNGs.

**Verdict: PASS.** Every primitive page tells the truth its tokens promise, anchored by
painted-pixel contrast readbacks.
