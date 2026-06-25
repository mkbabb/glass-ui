# WAVE-AMENDMENT — cartoon-shadow register

> The concrete tranche amendment reconciling the cartoon-shadow golden (AS HARDENED by the three
> challenges, folded in `DELTA-ASSAY.md §2`) against the extant 116-wave set in
> `docs/tranches/BD/union/waves/`. Reference implementation: **`GOLDEN.md`** as corrected by
> **`DELTA-ASSAY.md`** (the five load-bearing hardenings H1–H5). Tranche-DEV only (build W-CUT/
> user-gated). Every NEW token verified EMPTY on `:root` live → the gates are genuinely born-RED.

---

## A. DEPEND (existing waves — already book the two motion tokens; do NOT re-author)

The motion-spring-register sibling's WAVE-AMENDMENT already books BOTH motion tokens the cartoon cast
consumes. This item DEPENDS on them — re-authoring would be duplicative work.

- **`BD.W-MOTION-WEIGHT`** (motion-spring-register) — ships `--motion-weight` (`@property` inheriting,
  rest `0.618`, PRM→0) + the born-RED `proof-motion-weight-universal.mjs`. **The cartoon cast is the
  FIRST consumer:** `--cast-travel`/`--cast-spread`/the squash depth all read `--motion-weight`.
  No edit needed here beyond the dependency.
- **`BD.W-CARTOON-PUNCH`** (motion-spring-register) — ships `--ease-cartoon-punch` (raw `linear()`,
  anticipation dip + ~22% punch, NOT a SPRING_PRESETS/MOTION_CURVES entry) + the loud-register
  `--motion-weight: 1` coupling + `proof-cartoon-punch.mjs`. **AUGMENTED below** (§B) — the cartoon
  caster is the structural consumer that wave's "loud-register guard" expects.

---

## B. AUGMENT (existing wave — add the cartoon-shadow caster as the structural consumer)

### `BD.W-CARTOON-PUNCH.md` — AUGMENT (add the §3-builds caster consumer; do NOT re-author the token)
- **Action:** add a leg — the `.cartoon-surface` / `.cartoon-cast` carrier composes
  `--ease-cartoon-punch` on its press/hover/release transitions AND carries `--motion-weight: 1` in
  the same recipe (satisfying that wave's existing "loud-register guard" C-arm: a surface referencing
  the curve must resolve a local `--motion-weight ≥ 0.9`). This wave already DEMANDS such a consumer
  exists; cartoon-shadow PROVIDES it — the union is exact, no token re-author.
- **Reference:** add `Cite cartoon-shadow/GOLDEN.md §4 + DELTA-ASSAY.md §2 (H1/H2/H5)` to the wave's
  reference line.
- **Born-RED extension:** that wave's loud-register guard now has a concrete pass-subject
  (`.cartoon-surface` resolves `--motion-weight: 1`); the cartoon caster's own punch beats are gated
  by the NEW `BD.W-CARTOON-CASTER` G3 (below), not duplicated here.

---

## C. NEW WAVES (each born-RED — verified EMPTY/DEAD live)

### NEW `BD.W-CARTOON-CEL-INK.md` — the warm chromatic cel ink (the colour leg)
**Band 0 (foundations). Depends:** none (pure token re-author). **Reference:** `GOLDEN.md §2/§3` as
corrected by `DELTA-ASSAY.md §2 (H3/H4) + §3 Leg A`.

**Builds:**
1. `tokens/shadow.css`: `--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c,0.11) h)`
   (own warm ink, decoupled from `--shadow-color`, chroma-floored — the BA.W-NO-GRAY discipline) +
   the three strength rungs `--cartoon-ink-{lead,mid,contact}` via `color-mix(in oklab, --cartoon-ink
   {32,26,18}%, transparent)` (`in oklab` NOT `in srgb` — the landed gray-dilution defect).
2. RE-POINT `--shadow-cartoon-{sm,md,lg}` to the warm-ink **0-blur** form (lead+mid+contact all
   0-blur — H4 hard-edge), keeping the **landed down-LEFT** geometry (the direction is NOT the defect;
   REFINE-not-flip — DELTA-ASSAY §2 cast-direction fold), φ-cadenced offsets. RE-POINT the
   `--shadow-cartoon`/`-hover` aliases + `--shadow-modal`'s cartoon plane onto `--cartoon-ink-lead`.
3. `tokens/dark-arm.css`: the warm dark ink via the SAME `oklch(from var(--foreground) …)`
   construction (NOT a hardcoded `oklch(0.22 0.07 70)` — H3/R6), L-targeted ΔL ≥ 0.12 off `--card`'s
   L (a warm MID-tone offset that READS on the near-black card — H3), plain `.dark` ancestor (no
   `:global()`, no `light-dark()` — the recorded traps).
4. `@supports not (color: oklch(from white l c h))` → floor `--cartoon-ink` to a named
   `--cartoon-ink-fallback` warm sRGB literal (no dead literal — DELTA-ASSAY no-hardcoded-ref fold).
5. `prefers-contrast: more` AND `prefers-reduced-transparency: reduce` → floor the three strengths UP
   (PRT is NOT no-op — the cast is translucent ink, #3 R7).

**Born-RED gate — `scripts/proof-cartoon-cel-ink.mjs` (`tags:["local","ci"]`):**
- **G1-light:** lead-plane cast oklch **chroma ≥ 0.09** (technicolor-bold, NOT the 0.05 merely-non-gray
  floor — H4) AND lead+mid+contact **blur == 0px** (hard cel edge — H4) AND lead **α ≥ 0.28**. Born-RED:
  current lead resolves `color(srgb 0.11 0.098 0.09 / 0.12)` → chroma≈0, 1px blur, 0.12α (verified live).
- **G1-dark:** the cast oklch **|L_ink − L_card| ≥ 0.12 AND chroma ≥ 0.09** (figure-ground floor, NOT
  the `L ≤ 0.40` invisible-ink-enforcing arm — H3). Born-RED: current dark lead resolves
  `color(srgb 0.914 0.9 0.886 / 0.12)` → near-WHITE L≈0.90, chroma≈0 (verified live — the white flip).
- **G1-separable:** the CARTOON swatch's computed `box-shadow` ≠ the SOFT/ELEVATED swatch's.
- **G1-direction (sign-pin):** the lead-plane X-offset sign matches the landed down-LEFT (catches a
  future silent flip — DELTA-ASSAY fold).
- **No-dead-local:** the `@supports` fallback references `--cartoon-ink-fallback`, not an inline literal.

**Binding π — both modes, Chromium + WebKit (`/foundations/shadows`):** the CARTOON swatch reads a
visibly SATURATED warm cel line in light AND a VISIBLE warm offset in dark (a captured screenshot
delta — `delta-shadows-{light,dark}.png` already seed the RED state); the swatch is separable from
SOFT/ELEVATED.

---

### NEW `BD.W-CARTOON-CASTER.md` — the moving cast (an inert child + the press/move punch)
**Band 0 / Band B (cards) / Band D (motion). Depends:** `BD.W-CARTOON-CEL-INK` (the ink),
`BD.W-MOTION-WEIGHT` (the scalar), `BD.W-CARTOON-PUNCH` (the curve), the EXISTING `useLiquidPress`.
**Reference:** `GOLDEN.md §4` as corrected by `DELTA-ASSAY.md §2 (H1/H2/H5) + §3 Leg B`.

**Builds:**
1. **Register the drive props (H1 — proven-live-DEAD without this)** in `property-regs.css`:
   `@property --cartoon-press-t { syntax:"<number>"; inherits:true; initial-value:0 }`,
   `@property --cast-travel { syntax:"<length>"; inherits:false; initial-value:0px }`,
   `@property --cast-spread { syntax:"<number>"; inherits:false; initial-value:1 }` (+ keep the
   golden's `--cartoon-cast-dx/dy`). Without these the calc chain falls back to initials → no punch.
2. **The inert-child caster (H2 — `::before` is OCCUPIED on the real carrier)**: `<Card
   surface="cartoon">` emits `<span class="cartoon-cast" aria-hidden="true">` (Card.vue — a small,
   honest SFC edit, NOT "zero SFC"). `.cartoon-cast` (in `cards.css`, beside `.cartoon-surface`):
   `position:absolute; inset:0; z-index:-1; border-radius:inherit;` the moving ink-plate
   `box-shadow: var(--shadow-cartoon-md)` (set once per state-flip — NEVER animated, the §L7 paint-
   fence) + `translate: calc(--cast-travel + --cartoon-cast-dx) calc(--cast-travel + --cartoon-cast-dy)`,
   `scale: var(--cast-spread)`, both eased by `--ease-cartoon-punch` at a 1.15× lag (follow-through).
   `--cast-travel`/`--cast-spread` read `--motion-weight × --card-press-t`. **Leaves both glass
   pseudos (`::before` catch-light, `::after` grain) intact.**
3. **Reuse the press clock (DELTA-ASSAY pressVar fold)**: `.cartoon-cast` reads the ALREADY-written
   `--card-press-t` (Card's existing `useLiquidPress` drives it for every `pressable` card) — alias
   `--cartoon-press-t: var(--card-press-t)` on `.cartoon-surface`. **NO second press var, NO Card
   press-driver rewrite** (`useLiquidPress` is reused as-is).
4. **The press is a NON-uniform SQUASH (H5)**: `.cartoon-surface:active:not(:disabled) { scale: 1.04
   0.94 }` (widen X, compress Y — real squash & stretch, NOT a uniform shrink). The release overshoots
   via the punch curve; the caster's lag recoils late.
5. **The hover (DELTA-ASSAY §3 / #3 R8 — REPLACE the landed hover, not add)**: re-point the existing
   `.cartoon-surface:hover` to `:hover:not(:active):not(:disabled)` with `--ease-cartoon-punch` (was
   `--spring-smooth`) — ONE hover rule, no double-declaration.
6. **PRM/PRT carve**: `prefers-reduced-motion: reduce` → `--motion-weight: 0` (zeroes travel/spread/
   squash/lag in one assignment) + `transition: none`; the static bold stamp persists (legibility).
7. **Drag-track = DEFERRED/opt-in (DELTA-ASSAY drag fold)**: `usePointerVelocityField` is a
   renderer-driven Ref field (no rAF/setProperty/pointerup-clear) — wiring it to `--cartoon-cast-dx/dy`
   needs a thin NEW DOM bridge (`useCartoonCast`). NOT in this land; labeled honestly as future. The
   press/hover core is pure CSS + `useLiquidPress` (the honest zero-new-composable claim, press-leg
   scoped).

**Born-RED gate — `scripts/proof-cartoon-caster.mjs` + `tests-visual/cartoon-caster.spec.ts`
(`tags:["local","ci"]`, Chromium + WebKit, both modes):**
- **G3-exists:** a `.cartoon-cast` child exists with a non-`none` `translate`/`scale` AND under
  `:active` `getComputedStyle('.cartoon-cast').translate !== '0px'` (the live-DEAD bite — H1; the
  golden §8 "non-`none`" check would falsely pass the dead `0px`). Born-RED: NO caster today (verified).
- **G3-punch:** mid-press the host `scale < 1` on Y AND **scaleX ≠ scaleY** (non-uniform squash —
  H5; a uniform scale = a shrink = FAIL) AND the `.cartoon-cast` `translate` magnitude > rest AND
  `scale > 1` (the gap opens, the plate spreads).
- **G3-overshoot:** the release `translate` track (sampled across rAF, driven by the REAL
  `useLiquidPress` `--card-press-t` ramp — NOT the discrete-class spike, #2 R5) CROSSES PAST target
  (a monotonic settle = FAIL — follow-through must overshoot).
- **G3-paint-fence:** NO `box-shadow` value changes per-frame during the press (compositor-only; a
  per-frame box-shadow delta = paint-bound = FAIL — §L7).
- **G3-pseudo-intact:** the glass `::before` catch-light + `::after` grain still resolve on a cartoon
  Card (the caster did NOT clobber a pseudo — H2).
- **G3-PRM:** under PRM the `.cartoon-cast` `translate` holds at rest (zero travel) while the stamp
  persists.
- Run BOTH engines; a Chrome-only pass is not a pass.

**De-risk seed:** the `golden/spike.html` must be FIXED (register the three props per H1) and
RE-CAPTURED GREEN (pressed `.cartoon-cast` translate ~3.7px, scale ~1.11) before the src/ wave lands —
the current spike, when pressed, DISPROVES the caster (this assay's live readback).

---

### NEW `BD.W-CARTOON-DOCFIX.md` — design.md retired-ghost + §Shadows currency (the doc leg)
**Band 0 / Band E (history/spec). Depends:** the two waves above landed. **Reference:** `GOLDEN.md
§9` as corrected by `DELTA-ASSAY.md §3 Leg C`.

**Builds:** apply the GOLDEN §9 edit list to design.md — the ~499/501/1069/1077/1121/1716
`<CartoonCard>` / `.glass-cartoon` / `cartoon-card` retired-ghost refs → the live `<Card
surface="cartoon">` / `.cartoon-surface` / `.shadow-cartoon-*` carriers; UPDATE §Shadows (~397-413)
to the warm `--cartoon-ink` form (0-blur, landed down-LEFT, figure-ground dark arm, the **inert-child**
caster — NOT a `::after`/`::before` pseudo) and RESOLVE the §411 "warm tint DEFERRED to greenfield"
note (landed). Note `--motion-weight` + `--ease-cartoon-punch` are now SHIPPED (by the
`BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` siblings). Cite `cartoon-shadow/GOLDEN.md`.

**Born-RED gate — extends `proof:design-md-current`:** ZERO occurrences of `<CartoonCard>` /
`.glass-cartoon` / `cartoon-card` as LIVE-carrier prose in design.md; the §Shadows cartoon block
names `--cartoon-ink` (not raw `--shadow-color`/`rgba`) and the inert-child caster. Born-RED: those
ghost refs present today (verified — grep hits ~499/501/1069/1077/1121/1716).

---

## D. PRUNE / EXCISE — none (one non-action recorded)

- **No existing wave is pruned or excised.** `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` are DEPENDED
  on / AUGMENTED, not re-forked; the shadow token family, `.cartoon-surface`, the `.shadow-cartoon-*`
  utilities, and every consumer (metric-badge components.css:66, the swatches, `--shadow-modal`) keep
  their carriers + their down-LEFT geometry.
- **EXCISE from the golden's CORE scope: the `::before` caster** (H2 — it clobbers the occupied glass
  catch-light pseudo on the real carrier) → replaced by the inert `.cartoon-cast` child. **EXCISE the
  drag-track from the core land** (it needs a real new `useCartoonCast` DOM bridge — deferred/opt-in,
  named honestly, NOT "zero new composable").

---

## E. THE FILE-TOUCH MANIFEST (deft, extant-primitive reuse)

| File | Edit | Wave |
|---|---|---|
| `tokens/shadow.css` | `--cartoon-ink` + 3 strength rungs; re-point `--shadow-cartoon-{sm,md,lg}` to warm-ink 0-blur (down-LEFT kept); aliases + `--shadow-modal` plane → `--cartoon-ink-lead`; `@supports`→`--cartoon-ink-fallback` | CEL-INK |
| `tokens/dark-arm.css` | warm dark ink via `oklch(from --foreground …)`, ΔL≥0.12 off `--card`, plain `.dark` | CEL-INK |
| `property-regs.css` | `@property --cartoon-press-t/--cast-travel/--cast-spread` (+ keep `--cartoon-cast-dx/dy`) | CASTER |
| `cards.css` | `.cartoon-cast` child rule (moving ink-plate); REPLACE `.cartoon-surface` hover → `:hover:not(:active)` + `--ease-cartoon-punch`; press non-uniform squash; alias `--cartoon-press-t:var(--card-press-t)`; PRM/PRT carve | CASTER |
| `Card.vue` | emit `<span class="cartoon-cast" aria-hidden>` when `surface="cartoon"` (the ONLY SFC edit; press driver UNCHANGED) | CASTER |
| `golden/spike.html` | FIX (register 3 props) + RE-CAPTURE GREEN as the G3 seed | CASTER |
| `design.md §9 + §Shadows` | retired-ghost edit list + warm `--cartoon-ink` currency | DOCFIX |
| `scripts/proof-cartoon-cel-ink.mjs` / `proof-cartoon-caster.mjs` | NEW born-RED gates | CEL-INK, CASTER |
| `tests-visual/cartoon-caster.spec.ts` | NEW π (Chromium + WebKit, both modes, real `useLiquidPress` drive) | CASTER |

**NO** second motion-token authoring (DEPEND on the sibling waves), **NO** second press var, **NO**
`::before`/`::after` pseudo clobber (inert child), **NO** Card press-driver rewrite, **NO** drag DOM
bridge in core (deferred), **NO** legacy alias, **NO** parallel cartoon system.
