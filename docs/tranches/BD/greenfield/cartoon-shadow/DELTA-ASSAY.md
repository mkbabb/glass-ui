# DELTA-ASSAY — cartoon-shadow register (golden-vs-current + the UNION path)

> The survival-of-the-fittest delta for the CARTOON-SHADOW register: `--shadow-cartoon-{sm,md,lg}` /
> `--cartoon-shadow-*` tokens, the `.shadow-cartoon-*` utilities, the `.cartoon-surface` carrier
> (`<Card surface="cartoon">`), the layered-offset cel-ink stamp, and the NEW moving cast (design.md
> §Shadows) that punches on move. Reference implementation: **`GOLDEN.md`** AS HARDENED BY the three
> challenges (`challenge/1.md`, `2.md`, `3.md`) — folded inline below. Live-inspected on Chrome
> :5173 (both modes) + the golden spike's pressed state. Tranche-DEV only (build is W-CUT/user-gated).

---

## 0. The live verdict (re-measured against the CURRENT src/, both modes — corrected)

`/foundations/shadows`, `getComputedStyle` (2026-06-24, Chrome :5173). This corrects the GOLDEN §0
table (challenge #3 R4 lands: the golden audited a stale `srgb` readback and mis-stated geometry):

| Token | LIVE resolved value | Defect |
|---|---|---|
| `--shadow-color` | `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))` | **`light-dark()`-wrapped** (via `--foreground`). NOT plain — so the cast FLIPS to near-cream in dark. |
| `--shadow-cartoon-md` lead | `color(srgb 0.11 0.098 0.09 / 0.12)` (light) | **R≈G≈B near-black, chroma≈0, 12% α, in `srgb`** — a desaturated GRAY SMUDGE. Geometry is **down-LEFT** (`-4px 3px`), NOT down-right as §0 claimed. |
| same, DARK | `color(srgb 0.914 0.9 0.886 / 0.12)` | **near-WHITE (L≈0.90) at 12% over the `rgb(53 42 34)` card** — the iOS-7 sticker-glow the GOLDEN itself bans. THE live dark defect §0 missed. |
| legacy `.shadow-cartoon` swatch | `color(srgb 0.11 0.098 0.09 / 0.08)` | even fainter (8% α) — barely separable from `.shadow-soft`. |
| `--motion-weight` | **EMPTY** on `:root` | design.md §L4 fiction — never shipped. |
| `--ease-cartoon-punch` | **EMPTY** on `:root` | design.md §Easing fiction — never shipped. |

**Five live failures:** (1) light ink is a weak desaturated `srgb` gray smudge; (2) **dark ink is a
near-WHITE sticker-glow** (`light-dark()`/`--foreground` flip — the headline dark defect); (3) the
moving cast / punch / weight scalar were **never built**; (4) the stamp planes are mixed-blur
(1–2px), not hard cel edges; (5) design.md still cites the retired `<CartoonCard>` / `.glass-cartoon`
as live. The bar: **a BOLD warm-chromatic technicolor cel stamp, INKED in light and VISIBLE in dark,
that PUNCHES on interaction** — both modes, both engines.

---

## 1. The union verdict — **REFINE** (the strategy is fit; the spec ships broken; the fixes are KISS)

The GOLDEN's strategy is a genuine deft union — own warm ink decoupled from `--shadow-color`,
transform-only caster, reuse the two extant composables, ship the two motion tokens. All three
challenges independently confirm the MECHANISM survives (chromatic ink, cross-engine-safe opaque
register, no transmissive/metaball attack surface, born-RED G2). **But the spec as written is dead on
arrival in two places (proven live) and mis-tuned in three.** None require re-invention. So:
**REFINE** — keep the architecture, fold the five challenge hardenings, land it.

### What the CURRENT does well — **KEEP**
- The carrier topology is right: `.cartoon-surface` is a decoration-only `@utility` ON a glass tier
  (not a tier), composed by `<Card surface="cartoon">`; `--shadow-cartoon-{sm,md,lg}` + the
  `.shadow-cartoon-*` utilities + the aliases are a clean, single-source token family. **No re-fork.**
- The phantom `--glass-bg-cartoon` fall-through was ALREADY dropped (cards.css:170-177) — not to be
  resurrected.
- `--shadow-color` decoupling is the right move: the cartoon ink should be its OWN token so retuning
  the cast never disturbs every elevation `box-shadow`.
- `useLiquidPress` (with a `pressVar` option, `--card-press-t` written today, compositor-only,
  PRM-instant) and `usePointerVelocityField` both EXIST — the "reuse, zero new composable" claim for
  the **press leg** is honest.

### What is weak — **REFINE**
- The ink: `color-mix(in srgb, --shadow-color N%)` at 8–12% → a desaturated near-black gray. Replace
  with an OWN `--cartoon-ink` (warm, chroma-floored, oklab-mixed, bold 18–32%). **KEEP the token
  family + carriers; REFINE the recipe.**
- The geometry: mixed 1–2px blur on every plane. REFINE to 0-blur lead+mid (hard cel edge).
- The dark arm: the `--foreground`/`light-dark()` flip → white. REFINE to a warm ink with a
  figure-ground floor (see §3).
- The hover transition uses `--spring-smooth`; REFINE to `--ease-cartoon-punch` (the §L2 coupling).

### What is broken — **RE-INVENT (the mechanism, not the architecture)**
- The moving cast / punch / weight scalar do not exist. They are NEW build — but they RE-USE extant
  primitives (`useLiquidPress`, `usePointerVelocityField`) and AUGMENT the existing
  `BD.W-CARTOON-PUNCH` wave (which already ships the `linear()` token). Not a parallel system.

---

## 2. The five load-bearing challenge hardenings (FOLDED into the golden — each blocks the land)

### H1 (BLOCKING, proven live) — the press caster is DEAD ON ARRIVAL: unregistered drive props
Challenge #1 R1. The GOLDEN §4b registers `@property --cartoon-cast-dx/dy` but NOT
`--cartoon-press-t`, `--cast-travel`, or `--cast-spread`. An unregistered custom prop is an untyped
string; a `calc()` built from it cannot resolve to a `<length>`/`<number>` for `translate`/`scale`,
so it falls back to the property's initial value. **The punch never fires.**

**Live proof** (Chrome, the golden spike, pressed state, this assay):
```
hostPressT          : 1                       ← the host var IS set
beforeCastTravel    : calc(6px * 0.62 * 1)    ← a LITERAL STRING, never a length
beforeCastSpread    : calc(1 + 0.18 * 0.62 * 1)
::before translate  : 0px        ← DEAD (should be ~3.72px)
::before scale      : 1          ← DEAD (should be ~1.11)
```
Registering `--cartoon-press-t` alone mid-run did NOT revive it (`translate` still `0px`) — because
`--cast-travel`/`--cast-spread` are ALSO unregistered, so the calc chain still can't type-resolve on
the pseudo. **The §1 "single boldest move", §4's whole caster, §7's PRESS/DRAG bar, and §8's G3 are
all non-functional as written, in BOTH engines.** This is the recorded `@property`/oklab-paint-arm
trap (a value that "looks computed" but resolves to the invalid initial).

**FOLD:** register all three —
```css
@property --cartoon-press-t { syntax: "<number>"; inherits: true;  initial-value: 0;  }
@property --cast-travel     { syntax: "<length>"; inherits: false; initial-value: 0px; }
@property --cast-spread     { syntax: "<number>"; inherits: false; initial-value: 1;  }
```
in `property-regs.css` (the registration home). Fix the spike identically, RE-CAPTURE the pressed
readback as the G3 seed. G3 must assert `getComputedStyle(el,'::before').translate !== '0px'` under
`:active` (the §8 "non-`none`" check would falsely pass a dead `0px`).

### H2 (BLOCKING) — `::before` is NOT free on the real carrier → caster rides an inert CHILD span
Challenge #1 R2 + #2 partial + #3 R8. §4a's "specular is off → `::before` is free" conflates
*intensity 0* with *the pseudo not existing*. The truth in src/: `<Card surface="cartoon">` ALWAYS
composes a `glass-${tier}` base (Card.vue), and `glass/material.css` paints
`.glass-resting::before, .glass-floating::before, .glass-card::before { content:""; … z-index:1 }`
**unconditionally** — only `--specular-intensity` is gated to 0. The `::before` slot is OCCUPIED.
cards.css:45-46 records this verbatim ("a glass tier already claims BOTH pseudos"). A
`.cartoon-surface::before { z-index:-1; box-shadow; translate }` would CLOBBER the catch-light
`::before` and flip its z-index — a real cascade collision the PRM/PRT specular guards then fight.

**FOLD:** the caster rides a **dedicated inert child element** — `<Card surface="cartoon">` emits a
`<span class="cartoon-cast" aria-hidden="true">` (Option-a, the cleaner union: costs one inert span,
leaves BOTH glass pseudos intact, stays transform-only/compositor-cheap). The `.cartoon-cast` child
carries the moving ink-plate box-shadow + the `translate`/`scale`. Rewrite §4a to state the truth.
This is a small, honest Card.vue edit — NOT "zero SFC change."

### H3 (BLOCKING gestalt) — DARK ink must clear a figure-ground FLOOR, not be dogmatically dark
Challenge #3 R1 + R6. The GOLDEN dark arm pins `--cartoon-ink: oklch(0.22 0.07 70)` (L≈0.22) — but
the dark `--card` is `rgb(53 42 34)` (L≈0.27). A dark ink ~5% L away from the card at 46% α is
**near-invisible** (the same smudge defect reborn in dark). And it's a HARDCODED literal (hue 70 magic
number), abandoning the `oklch(from --foreground …)` adaptive construction the §0 best-of-three
claims. The "cel cast is dark INK on a LIGHT cel" premise inverts on a near-BLACK card: there is no
light ground for dark ink to read against.

**FOLD:** the dark ink is a warm MID-tone offset that clears a contrast floor *against the card* —
built by the SAME `oklch(from var(--foreground) …)` construction as light (one mechanism, both
modes, a consumer `--foreground` retune carries through), L-targeted to sit **ΔL ≥ 0.12 AWAY from
`--card`'s L** (lighter on a dark card, darker on a light card — same as every adaptive-edge token).
Change G1-dark from "L ≤ 0.40" (which ENFORCES the invisible defect) to "**|L_ink − L_card| ≥ 0.12
AND chroma ≥ 0.09**" — a figure-ground gate, which is what "presence on a dark ground" means. Still a
warm chromatic cel, never a neutral glow — just VISIBLE. (This is NOT the white sticker-glow: a warm
chromatic mid-tone with held hue reads as a LIT cel edge, not an iOS-7 white halo.)

### H4 (gestalt) — TECHNICOLOR, not "merely non-gray"; hard-edge ALL planes
Challenge #3 R2. Light ink at chroma 0.07 / lead L≈0.21 reads as a soft taupe, not a saturated cel
line; and the contact rung carries 1–2px blur (3 of 9 planes blur).

**FOLD:** raise the chroma floor to `max(c, 0.11)` and lower lead L toward 0.14–0.16 (deep-umber cel
line). Make the contact rung **0-blur too** (the cel is hard-edged throughout; if a contact anchor is
wanted, a 4th hard 0-blur plane at higher offset, not a blurred one). G1 ink-chroma gate is **C ≥
0.09** (technicolor-bold), not ≥ 0.05 (merely-non-gray).

### H5 (gestalt) — the press is a SQUASH (non-uniform), not a uniform shrink-and-flee
Challenge #3 R3. The GOLDEN press is `scale: 0.96` (uniform) + `translate: -3px -3px` (up-left)
simultaneous → reads as "the card got smaller and ran away," not "squashed down onto its cast"
(§L4 #2 squash & stretch is NON-uniform: widen X as you compress Y). The gap-direction also inverts
the metaphor (the gap OPENS on press where "squash onto the cast" implies it should narrow first).

**FOLD:** make the press squash NON-uniform — `scale: 1.04 0.94` (widen X, compress Y). Re-storyboard
the press/release gap so it matches the narrative: press DROPS toward the cast (anticipation dip,
gap narrows) → release OVERSHOOTS up (gap punches open) → the caster's 1.15× lag closes it late
(follow-through). Add a G3 arm: **press-state body scaleX ≠ scaleY** (a uniform scale = a shrink =
FAIL).

### Minor folds (recorded, non-blocking)
- **Drag-track honesty** (#2 R1): `usePointerVelocityField` is a renderer-driven Ref physics field
  with **NO rAF, NO setProperty, NO pointerup-clear** — wiring it to write `--cartoon-cast-dx/dy` IS
  a thin new DOM bridge. The drag leg is **deferred / opt-in**, labeled honestly as needing that
  bridge; it is NOT in the core land. The press/hover path (pure CSS + `useLiquidPress`) is the
  zero-new-composable core. **Keep the "zero new composable" claim scoped to the press leg only.**
- **pressVar wiring** (#2 R2 + #3 R8): Card.vue hardcodes `pressVar: "--card-press-t"`. The DRY fix:
  `.cartoon-cast` reads the **already-written `--card-press-t`** (or aliases
  `--cartoon-press-t: var(--card-press-t)` on `.cartoon-surface`) — ONE press clock, NO second var,
  NO Card.vue press-driver rewrite. (Card.vue's only edit is emitting the `.cartoon-cast` span per
  H2.)
- **Cast direction** (#1 R3 / #2 R3 / #3 R4): the "upper-left key light" justification is FICTION
  (the house specular is top-edge / pointer-tracked, the elevation family is straight-down, the
  landed cartoon is down-LEFT). KEEP down-LEFT (the landed direction — the *direction* isn't the
  defect, the gray/blur/weakness is; REFINE-not-flip per the BD mandate), DELETE the key-light claim.
  This also keeps "same consumers" honest (metric-badge components.css:66, the swatches,
  `--shadow-modal`'s plane all keep their cast geometry). Pin the sign in a G1 assert so a future
  drift is caught.
- **No-hardcoded-ref** (#1 R4 / #3 R6): the `@supports` sRGB fallback gets a named
  `--cartoon-ink-fallback` token (no dead literal); the dark ink is `oklch(from …)`-derived per H3.
- **PRT honesty** (#3 R7): the cast is a 11–32%-α translucent ink, NOT opaque. Drop the "opaque ink
  survives PRT untouched" claim; treat PRT like `prefers-contrast: more` (floor the strengths UP).
- **`light-dark()`-on-`--shadow-color` family sweep** (#3 R5): decoupling cartoon from
  `--shadow-color` is correct; the dark ink uses the plain `.dark` arm. No `--cartoon-ink-*` plane
  is listed alongside an `inset` rung (audit confirms `--shadow-modal` has no inset rung) → the
  `light-dark()` inset-void trap does not bite this family. Recorded; no extra sweep needed.

---

## 3. The UNION path — how to evolve the current toward the golden (KISS, no legacy, no dual-path)

The cartoon-shadow item's exclusive scope is **THE INK + THE CASTER CARRIER + THE DOCFIX**. The two
motion TOKENS (`--motion-weight`, `--ease-cartoon-punch`) are ALREADY booked by the
motion-spring-register sibling (`BD.W-MOTION-WEIGHT`, `BD.W-CARTOON-PUNCH`) — this item DEPENDS on
them and does not re-author them (the cross-wave reconciliation, §4 below).

### Leg A — THE INK (re-author the token recipe in place; no new class, no new file)
`tokens/shadow.css`: add `--cartoon-ink` (own, warm, `oklch(from --foreground …)`, chroma-floored
`max(c,0.11)`, lead L≈0.14–0.16) + the three strength rungs (`--cartoon-ink-lead/-mid/-contact`,
`color-mix(in oklab …)` at ~32/26/18%, floored up per-contrast). RE-POINT the three
`--shadow-cartoon-{sm,md,lg}` rungs to the warm-ink **0-blur** form, keeping the **landed down-LEFT**
geometry (φ-cadenced offsets). `tokens/dark-arm.css`: the warm dark ink via the SAME `oklch(from …)`
construction, L-targeted ΔL ≥ 0.12 off `--card` (plain `.dark` arm). `@supports` floor →
`--cartoon-ink-fallback` warm sRGB literal. PRM/PRT/contrast carves. **Pure token re-author — the
`.shadow-cartoon-*` utilities + `.cartoon-surface` + aliases + all consumers are byte-stable in
shape, only the cast color/blur change.**

### Leg B — THE CASTER (the moving cast: an inert child + the press/move beats)
Register `@property --cartoon-press-t/--cast-travel/--cast-spread` (+ keep `--cartoon-cast-dx/dy`) in
`property-regs.css` (H1). `<Card surface="cartoon">` emits `<span class="cartoon-cast" aria-hidden>`
(H2). `.cartoon-cast` (in `cards.css`, beside `.cartoon-surface`): the moving ink-plate box-shadow
(`--shadow-cartoon-md`, set once per state-flip — never animated, the §L7 paint-fence) + the
`translate`/`scale` driven by `calc(travel × --motion-weight × --card-press-t)`, eased by
`--ease-cartoon-punch` with a 1.15× lag (follow-through). Press = NON-uniform squash `scale: 1.04
0.94` on the host (H5); hover = lift up-left + lg rung. `.cartoon-cast` reads the **already-written
`--card-press-t`** (no second var, no Card press-driver rewrite). Drag-track = deferred/opt-in (the
honest `usePointerVelocityField` bridge note). **REUSES `useLiquidPress` as-is; ONE inert span; a
handful of tokens.**

### Leg C — THE DOCFIX (design.md §9 + §Shadows currency)
Apply the GOLDEN §9 retired-ghost edit list (the ~499/501/1069/1077/1121/1716 `<CartoonCard>` /
`.glass-cartoon` / `cartoon-card` ghosts → the live `<Card surface="cartoon">` / `.cartoon-surface` /
`.shadow-cartoon-*` carriers) + update §Shadows (~397-413) to the warm `--cartoon-ink` form, the
inert-child caster (NOT a `::after`), the figure-ground dark arm, and RESOLVE the §411 "warm tint
DEFERRED to greenfield" note (it is now landed). Cite `cartoon-shadow/GOLDEN.md`.

---

## 4. Reconcile vs the 116 union waves (no duplicative work)

| Wave (extant) | Status | This item's action |
|---|---|---|
| `BD.W-MOTION-WEIGHT` (motion-spring-register WAVE-AMENDMENT §B) | books `--motion-weight` scalar + PRM carve | **DEPEND, do NOT re-author.** Cartoon is the first weight consumer; the cast travel/spread/squash read it. |
| `BD.W-CARTOON-PUNCH` (motion-spring-register WAVE-AMENDMENT §B) | books `--ease-cartoon-punch` `linear()` + the loud-register weight=1 coupling + its born-RED gate | **AUGMENT** — add the cartoon-shadow caster as the structural consumer (the `.cartoon-cast` transitions ride this curve); the `--motion-weight: 1` coupling on the loud surface is satisfied by `.cartoon-surface`. Do NOT duplicate the token build. |
| `W-GLASS-ABROGATE-GRAY` / `BA.W-NO-GRAY` | warm-floor discipline | the `max(c,0.11)` chroma floor + oklab-mix APPLY this discipline to the cast — same idiom, no new wave. |
| `BD.W-NO-HARDCODED-REF` | no dead literals | the `--cartoon-ink-fallback` token + `oklch(from …)`-derived dark ink satisfy it. |
| dock-fission / glass-material / aurora | — | UNTOUCHED. The only cross-wave seam is `--motion-weight` (the §L4 universal), owned by `BD.W-MOTION-WEIGHT`. |

**No existing wave is pruned or excised.** The cartoon-shadow item adds the INK + caster-carrier +
docfix as NEW/AUGMENT legs that plug into the already-booked motion tokens. Same token names, same
carriers, same consumers. No re-fork, no legacy, no parallel system.

---

## 5. Convergence

**REFINE, ~80%.** Architecture FIT + the carrier topology landed + the two motion tokens already
booked by a sibling wave (no duplication) → the spine is solid. The 20% remaining is build-time:
the five challenge hardenings (H1 register-the-props proven-live-dead, H2 inert-child not `::before`,
H3 dark figure-ground, H4 technicolor+hard-edge, H5 non-uniform squash) must land, plus the real
WebKit paint pass on the caster (the spike proved the mechanism DEAD as written — the seed must be
re-captured GREEN before src/ lands), and the G1/G3 gate re-calibration. DELTA-ASSAY +
WAVE-AMENDMENT written; `delta-shadows-light.png` + `delta-shadows-dark.png` captured (the live
gray-smudge / white-flip deltas).
