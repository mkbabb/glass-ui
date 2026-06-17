# W-DESKTOP-RESERVE (B3) — the wide-axis (desktop) chassis dial reserve · DELTA

The speedtest AW v3 relay intake item **B3** (`docs/tranches/BB/coordination/cross-repo-inbound.md` §5 :108): "desktop-reserve `min-block-size` — wide-axis chassis reserve, desktop dial, CLS≈0; deletes the speedtest App.vue interim."

## The defect (the wide-axis CLS hole)

glass-ui reserved the InstrumentChassis dial box from frame 0 **only on the mobile reflow** — the R0G-2 reserve (`min-height` + the `minmax(0,1fr)` meter row) inside `@container chassis (max-width: 44.9375rem)`. The **WIDE box axis had NO library reserve**, so on desktop the `1fr` meter row collapsed to its pre-hydration `<canvas>` intrinsic size and grew on hydration, pushing the results card + dock down — the measured desktop-1440 CLS median 0.109 (`dialReserveEngaged:false`; speedtest AV.W20 trace `dial-desktop-light.json`). The speedtest consumer authored a **local App.vue interim** to cure it (`src/App.vue` :668-669, the AW.W4.1 / DDR-AW-DESKTOP-RESERVE consumer interim):

```css
.app-chassis-spine > .instrument-dial {
    align-items: stretch;
    min-block-size: var(--chassis-max-block-size);   /* the wide-axis reserve */
}
```

That interim explicitly named the library successor: "the library owns the reserve once the ask ships its wide-axis `--instrument-dial-min-height` token (R-CONSUME at W7); until then the consumer authors it here." This wave is that successor.

## The fix (token-first, the exact disjoint complement of the mobile rung)

**1. The desktop dial token** (`src/styles/tokens/offsets.css`). Mint `--instrument-dial-min-block-size-desktop`, default `var(--chassis-max-block-size)` — the library's OWN dock-adjusted dynamic-viewport guardrail (`calc(100dvh - dock - padding - 1rem)`, a pure CSS calc that resolves at first paint with NO JS, the identical budget a centred consumer card clamps to). This is the **DESKTOP DIAL** a consumer overrides; the speedtest-specific value (if it ever differs) stays in speedtest — presets-in-consumers.

**2. The wide-axis reserve rule** (`src/styles/instrument-chassis.css`). A new `@container chassis (min-width: 45rem)` block sets a STATIC `min-block-size` on `.instrument-dial`:

```css
@container chassis (min-width: 45rem) {
    .instrument-chassis .instrument-dial {
        min-block-size: var(
            --instrument-dial-min-block-size-desktop,
            var(--chassis-max-block-size)
        );
    }
}
```

The **exact disjoint complement** of the mobile branch: the mobile ceiling is `max-width: 44.9375rem` (≈719px), so the desktop floor is `min-width: 45rem` (≈720px = 719 + 1px) — the two container-query ranges share no width, so a dial cell is reserved by **exactly ONE branch at every box width** (no overlap, no gap, no competing `min-block-size`). The chassis container is already declared (`container: chassis / inline-size` at :100), so the query resolves off the chassis box, not the viewport.

**CLS-safe:** the reserve is a STATIC `min-block-size` — a frame-0 box reservation, NOT an animated height. It is never a `@keyframes` step nor a `transition`/`transition-property` target, so `proof:no-layout-animation` holds by construction (verified GREEN — 0 layout-property animations off the allowlist).

## The gate — `proof:desktop-reserve` (born-RED→GREEN)

`scripts/proof-desktop-reserve.mjs`, five falsifiable clauses + a self-test bite:

- **D1** — the desktop dial token minted once, default resolving `var(--chassis-max-block-size)` (a baked-literal default REDS — presets-in-consumers).
- **D2** — the wide-axis reserve reads the token INSIDE `@container chassis (min-width: …)` and NOWHERE un-gated (an un-gated base reserve REDS).
- **D3** — the exact disjoint complement: desktop floor px == mobile ceiling px + 1 (an overlap or gap REDS).
- **D4** — CLS-safe: the reserve is STATIC, in NO `@keyframes`/`transition` (an animated min-block-size REDS).
- **D5** — ≥2 consumers (mint + read) — visual-load-bearing.
- **self-test** — five planted violations (flat-rem default, un-gated reserve, overlapping range, transitioned reserve, single-site token) each RED their clause + the good shape passes.

Born-RED verified on the reconstructed pre-wave tree: D1/D2/D3/D5 all fail (4 violations); D4 stays green pre-wave (the no-false-positive clause — there was never an animated reserve). The wave's two edits flip it GREEN (5/5 + bites).

## Fences held

- **Token-first** — the dial is a CSS custom property a consumer overrides; the default is a library-native guardrail token, not a speedtest literal (presets-in-consumers).
- **Compositor-only / `proof:no-layout-animation`** — a static `min-block-size` reserve is never an animation target; the gate stays GREEN.
- **The mobile rung is byte-untouched** — the disjoint range means no edit to the existing `@container chassis (max-width: 44.9375rem)` reserve.
- **No GL / no ppmycota / no rename** — pure token + CSS reserve on the chassis surface.

## Cross-repo successor (foreign-tree fence)

speedtest consumes this rung on the `^4.1.0` bump and **deletes** its local `.app-chassis-spine > .instrument-dial { min-block-size: var(--chassis-max-block-size) }` interim (AW.W4.1 / DDR-AW-DESKTOP-RESERVE R-CONSUME) — THEIR edit, the foreign-tree fence. The default resolves the identical `--chassis-max-block-size` value the interim used, so the consume is byte-equivalent at the default (the consumer retunes only if its meter block-size differs).

## Verification

- `node scripts/proof-desktop-reserve.mjs` → PASS (5/5 + self-test), born-RED on the pre-wave tree.
- `npm run typecheck` → clean.
- `node scripts/proof-no-layout-animation.mjs` → GREEN (the static reserve not flagged).
- `node scripts/proof-no-god-module.mjs` → PASS (instrument-chassis.css 449 lines, under bound).
- lightningcss → both edited CSS files valid.

The binding live-π / `proof:ba-gestalt` chassis-band verdict rides W-REFLECT3 (Batch 7).
