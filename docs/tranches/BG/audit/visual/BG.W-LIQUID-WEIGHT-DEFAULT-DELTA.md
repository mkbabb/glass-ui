# BG.W-LIQUID-WEIGHT-DEFAULT — dual-engine paint judgment (F5.2)

**Verdict: FAIL (dual-engine, both modes).** Non-authoring paint judge · 2026-07-05.

The transition-register inversion PAINTS its DEFAULT and its CALM opt-out correctly in
both engines both modes — but the wave FAILS its own binding gate on two counts: (1) the
**PRM arm of the named π spec** (`tests-visual/liquid-weight-default.spec.ts`) fails in
BOTH engines BOTH modes — under `prefers-reduced-motion: reduce` the interactive-atom
spatial leg STILL resolves the spring `linear()` (the vestibular floor is broken); this is
the exact "PRM keeps the overshoot" source-green/render-broken class the spec header names.
(2) **Row 2 (dock-hover-press) is UNWIRED** — the `useLiquidPress springPreset('press')`
binding on `DockIconButton` writing `--dock-press-t` that the row's ROUGH→MATCHES pass bar
requires does not exist in source; the dock press stays the CSS `:active` no-overshoot
floor (the §2.8 ROUGH state, unchanged).

---

## Pipeline (proven C18 method, dual-engine)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).
- `npm run demo:dist:build` → fresh `dist-demo/` (hash `index-BuM-75x2.css`); served on `:5200` (BUILT bytes). Built CSS carries `:root{--transition-liquid-spatial:var(--spring-smooth)}`, `.motion-calm{--transition-liquid-spatial:var(--ease-standard)}`, and the PRM `@media(reduce){:root{--transition-liquid-spatial:var(--ease-standard)}}`.
- **Chrome leg** — real Chrome 149 / CDP `:9478`, `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` (real Metal), `@1x 1440×900`.
- **Safari leg** — off-screen WKWebView keystone (`docs/tranches/BG/audit/.wkshot-bin`), `ENGINE WEBKIT / Apple GPU`, `2880×1800 @2x`, badge-provenanced from pixels.
- **π readback** — the named spec + a byte-faithful mirror, run in NORMAL mode (`page.goto("/")`) — the `?capture` mode blanket-freezes transitions (`html[data-capture] *{transition:none!important}`) so the π/gesture reads MUST run outside capture mode; the settled captures use `?capture`.

---

## §1 · The binding π readback (`liquid-weight-default.spec.ts` — the named gate)

The `scale`-leg resolved `transition-timing-function` tail on a live `.tap-squish` /
`.interactive-item` probe (mirror of the spec's `scaleLegTimingFunction`), both engines,
both modes. Chromium via real-Chrome CDP (Metal), WebKit bundled. Built bytes `:5200`.

| Arm | Requirement | chromium (Metal) light | chromium dark | webkit light | webkit dark |
|---|---|---|---|---|---|
| (a) DEFAULT `.tap-squish` | spring `linear(` | **PASS** | **PASS** | **PASS** | **PASS** |
| (a) DEFAULT `.interactive-item` | spring `linear(` | **PASS** | **PASS** | **PASS** | **PASS** |
| (b) CALM `.tap-squish` | `cubic-bezier(` | **PASS** | **PASS** | **PASS** | **PASS** |
| (b) CALM `.interactive-item` | `cubic-bezier(` | **PASS** | **PASS** | **PASS** | **PASS** |
| **(c) PRM `.tap-squish`** | `cubic-bezier(` | **FAIL** (linear) | **FAIL** | **FAIL** | **FAIL** |
| **(c) PRM `.interactive-item`** | `cubic-bezier(` | **FAIL** (linear) | **FAIL** | **FAIL** | **FAIL** |

**The named spec run confirms it** (`npx playwright test … liquid-weight-default --project=chromium-headless-new`): **2 failed / 8 passed** — the two failures are the PRM light + PRM dark tests, received string `linear(0 0%, 0.09979 2.041%, …)` where `cubic-bezier(` is required.

**Direct root-token probe (both engines, built bytes):** emulate `reducedMotion: reduce` → `matchMedia("(prefers-reduced-motion: reduce)").matches === true` (emulation verified applied), yet `getComputedStyle(document.documentElement).getPropertyValue("--transition-liquid-spatial")` still resolves `linear(0, .09979 2.041%, …)` (the `--spring-smooth` curve), NOT `--ease-standard` (`cubic-bezier(.4, 0, .2, 1)`). The PRM re-alias never wins.

Artifacts: `liquid-weight/pi-readback.json`, `liquid-weight/chrome-settled-pi.json`, `liquid-weight/prm-probe` (inline log).

---

## §2 · The four verdict rows (§4.1)

| # | Facility | Pass bar | This judgment |
|---|---|---|---|
| 1 | tabs-indicator-glide | CLOSE→MATCHES | settled render correct (glass pill track + indicator, both modes); the frame-series MATCHES bar (stretch ≥1.30 / cap→~1.15 amendment / arrival glyph pop / trailing label fade) NOT re-verified — NOT the decisive failure |
| 2 | **dock-hover-press** | ROUGH→MATCHES | **FAIL — UNWIRED.** `useLiquidPress`/`springPreset('press')`/`--dock-press-t` absent on `DockIconButton` + every dock control; press stays the CSS `:active` no-overshoot floor (§2.8 ROUGH) |
| 3 | dialog-glass-reveal | enter ≥6 / exit ≥4 | prerequisite `W-OVERLAY-ENTER-PAINT` (F5.R1) DONE + paint-verified; settled dialog route renders correct both modes; not re-frame-series'd here |
| 4 | dock-collapse-expand | 0 glyph-aspect distortion | prerequisite `W-DOCK-GLYPH-RIGID` (F3.R1) DONE + paint-verified (glyphAspect 1.0, 0/518 frames OOB); not re-frame-series'd here |
| 5 | the weight-default inversion | default spring `linear()` + `.motion-calm` opt-out | **default + calm arms PASS** (both engines both modes); **PRM arm FAIL** (see §1) |

Row 2 + the row-5 PRM arm are the decisive failures; a close requires all four rows at
pass bars AND the π readback (default→spring, calm→bezier, **PRM→bezier**).

---

## §3 · defectLocalization

### DEFECT A (primary, decisive) — the PRM re-alias is defeated by source-order cascade

- **Symptom:** under `prefers-reduced-motion: reduce`, `--transition-liquid-spatial` on `:root` resolves the `--spring-smooth` `linear()` curve (overshoot) instead of `--ease-standard`. Every base interactive scale leg (`.tap-squish`/`.interactive-item`/`btn-interactive`) keeps its spring overshoot under reduce — the vestibular floor is broken. Both engines, both modes.
- **Root cause (source-order):** the base default `:root { --transition-liquid-spatial: var(--spring-smooth) }` lives at **`src/styles/tokens/scheme-spring.css:152`**; the PRM re-alias `@media (prefers-reduced-motion: reduce) { :root { --transition-liquid-spatial: var(--ease-standard) } }` lives at **`src/styles/tokens/scheme-motion.css:397`**. `tokens.css` imports `scheme-motion.css` (line 28) THEN `scheme-spring.css` (line 34, "immediately after"). Both declarations target `:root` (equal specificity 0,1,0). In the built bundle the base default (byte pos 286599) lands AFTER the PRM `@media` block (byte pos 282358), so at equal specificity the base default WINS even when the reduce query matches → the PRM re-alias is inert.
- **Why `.motion-calm` is unaffected:** `.motion-calm` sets the token on a *descendant host*, so `.tap-squish` inherits the calm value by proximity (not cascade order) — the calm opt-out correctly resolves `cubic-bezier(` in all four combos. The bug is specific to the `:root`-vs-`:root` PRM contest.

### DEFECT B (secondary) — row 2 dock-hover-press is unwired

- **Symptom:** the dock control press carries no interruptible spring / `--dock-press-t` coupling; it is the CSS `.dock-icon-button:active` no-overshoot squish toward `--scale-press-dock` (`dock-controls.css`) — the exact §2.8 ROUGH state.
- **Root cause:** `src/components/custom/dock/DockIconButton.vue` composes `dock-icon-button glass-specular-track glass-capsule-hover` and does NOT bind `useLiquidPress`; `--dock-press-t` appears only as a comment in `src/composables/motion/useLiquidPress.ts:73`, never written by any dock consumer. The row-2 pass bar (bind `useLiquidPress springPreset('press')` on `DockIconButton`/the dock control families writing `--dock-press-t`, ≤2-frame answer, +1-2% rebound, interruptible velocity-continuous re-seat, DOCK_SPRING {0.68,0.64} untouched) is UNMET.

---

## §4 · mustFix[]

1. **Relocate the PRM re-alias AFTER the base default in the cascade** so `@media (prefers-reduced-motion: reduce) { :root { --transition-liquid-spatial: var(--ease-standard) } }` wins under reduce. Since `scheme-spring.css` is imported last of the two, move the PRM `@media` re-alias of `--transition-liquid-spatial` into `scheme-spring.css` after line 152 (or otherwise raise its cascade precedence). Keep the `.motion-calm` opt-out (already correct). Re-run `tests-visual/liquid-weight-default.spec.ts` — the two PRM tests must go GREEN in chromium + webkit; the direct root-token read under emulated reduce must resolve `cubic-bezier(.4, 0, .2, 1)`.
2. **Wire row 2**: bind `useLiquidPress` (`squish` on, `springPreset('press')`) on `DockIconButton`/the dock control families, writing `--dock-press-t` so the darken/specular leg couples to the spring physics (interruptible velocity-continuous re-seat; +1-2% rebound; ≤2-frame answer; DOCK_SPRING {0.68,0.64} untouched; the CSS `:active` floor stays the PRM/no-JS fallback). Then the row-2 frame-series must read ROUGH→MATCHES.
3. After both fixes, re-run the F5.2 sweep as a live-gesture frame-series (tabs-indicator-glide + dock-hover-press + dialog-glass-reveal + dock-collapse-expand) in both engines both modes; wave closes only with 0 BORKED, the four rows at their pass bars, and the π readback GREEN incl. PRM→bezier.

---

## §5 · What WORKS (positive evidence)

- **Row 5 default inversion PAINTS:** `.tap-squish` + `.interactive-item` default scale leg resolves the spring `linear(0, .09979 2.041%, …)` (`--spring-smooth`) in BOTH engines BOTH modes — weight is the transition vocabulary, not a per-site opt-in.
- **Calm opt-out works:** under `.motion-calm` both atoms resolve `cubic-bezier(.4, 0, .2, 1)` (no overshoot) — both engines, both modes.
- **The token is GENERATED drift-proof** (`--spring-smooth` = the 49-stop `linear()` from `regen-spring-tokens.mjs`); `var(--stretch,1)` identity-rest honest.
- **Settled visual correctness:** all 3 routes render content-real both engines both modes — recessive warm aurora (no conic banding / no oversaturation), grain calm, hero fits its envelope, dark register reads as luminous transmissive glass. Dual-engine provenance badges decoded from pixels (CHROME·ANGLE-Metal-M5-Max + WEBKIT·Apple-GPU).
- **Prerequisites DONE + paint-verified:** `W-DOCK-GLYPH-RIGID` (F3.R1), `W-DOCK-PANE-OVERLAP` (F3.R2), `W-OVERLAY-ENTER-PAINT` (F5.R1), `W-MOTION-SPINE` (F5.1) — so rows 3 + 4 carry their fixes.

---

## §6 · Capture manifest (12 PNGs — all resolve on disk, valid PNG)

Chrome (real Metal M5 Max, `@1x 1440×900`):
- `liquid-weight/liqweight-{tabs,dock,dialog}-chrome-{light,dark}-desktop.png` (6)

Safari/WebKit keystone (Apple GPU, `@2x 2880×1800`):
- `liquid-weight/liqweight-{tabs,dock,dialog}-safari-{light,dark}-desktop.png` (6)

Data: `liquid-weight/pi-readback.json`, `liquid-weight/chrome-settled-pi.json`.

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (after).
