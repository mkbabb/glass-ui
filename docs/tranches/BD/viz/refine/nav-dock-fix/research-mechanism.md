# RESEARCH-3 — the FIX MECHANISM (glass-ui internals; no re-fork, no-dual-path)

The exact tokens/recipes to retune for the nav-dock defects (GRAY-GLASS + MOTION),
mapped onto the SHIPPED token chains. Compose existing primitives; extend the gates,
never re-fork. North star: iOS-27 Liquid Glass six-layer composite + glass+PAPER
morphism + BA.W-NO-GRAY warm-chroma floor (glass is warm MATERIAL, never gray) +
the liquid-weight-universal law (inertia/weight/bounce/squish on ALL motion). NO
legacy, compositor-only, PRM-carved, Safari-compatible.

---

## 0. Source map (the chains to touch — all read, line-cited)

| Concern | File | Symbol |
|---|---|---|
| Glass tier opacity/blur/saturate ladder | `src/styles/tokens/glass.css` | `--glass-opacity-*`, `--glass-blur-*-radius`, `--glass-saturate-*`, `--glass-blur-dock` (L142) |
| Composed bg recipe (AX.W54 `--glass-level`) | `src/styles/tokens/glass.css` | `--glass-bg-dock` (L252), `--glass-bg-{wash..overlay}` |
| Adaptive tint seam (W55 + BC continuous) | `src/styles/tokens/glass-fx.css` | `--glass-tint-source`/`-strength`/`-ink`, `--glass-tint-strength-floor` (4%, L202), `--glass-tint-strength-aa` (20%, L185), `--glass-backdrop-luma-knee` (0.6, L173) |
| Dock plate self-tint clamp | `src/styles/dock/morph.css` | `.glass-dock` tint clamp (L427–445), `--glass-bg-dock` reads (L111/148) |
| Dock control register | `src/styles/tokens/sizing.css` | `--dock-control-hover-bg` (L307=`--glass-bg-resting`), `--dock-control-active-bg` (L308=`--glass-bg-floating`), `--dock-control-press-bg` (L401), `--dock-selected-accent` (L394) |
| Dock control paint | `src/styles/dock-controls/icon-button.css` | `.dock-icon-button` hover/active/press |
| Dark arm (the model to mirror) | `src/styles/tokens/dark-arm.css` | `--glass-blur-dock` (L259, has `saturate(1.30) brightness(1.12)`), `--glass-saturate-*` (L249–253), `--card` (L74), `--surface-tint-*` (L341) |
| No-gray gate | `scripts/proof-no-gray.mjs` | `WARM_PLATE_FLOOR` (0.010), `WARM_HUE_LO/HI` (45/85), the FIX-A/B/C census asserts |
| Stack-rail (facet carousel) | `src/styles/dock/stack-rail.css` | `--spring-dock` clock, `--dock-facet-accent-strength` (48%), member fan-out |
| Motion clocks | `src/styles/tokens/scheme-motion.css` | `--spring-*`, `--spring-*-duration` |

---

## 1. THE GRAY-GLASS DEFECT — root cause (empirical)

The base tokens are NOT the problem. Live OKLab math (`hslToRgb`→`rgbToOklab`):

- Light `--card` = `hsl(30 85% 96%)` → **OKLab L 0.974, C 0.0147, H 70.9°** — warm,
  above the gate's `WARM_PLATE_FLOOR` 0.010, in the warm register [45,85].
- The dock plate (`--card@0.42` over the warm `--neutral-0` page) preserves C 0.0147 H 70.9°.

So the chroma floor is met. **The gray-read is OPTICAL, three converging causes:**

**Cause A — the LIGHT dock blur has NO saturate/brightness companion (the dominant cause).**
`glass.css:142` — `--glass-blur-dock: blur(calc(--glass-blur-dock-radius * --glass-level))`
— `blur()` ALONE. The dark arm (`dark-arm.css:259`) carries
`saturate(1.30) brightness(1.12)`. iOS-27 Liquid Glass concentrates light
(`saturate ~1.4–1.8`, the apple-glass §4 load-bearing knob). Over a flat warm-cream
page the un-saturated light dock backdrop-filter pulls the cream toward neutral — a
pale flat slab, not luminous warm glass. **The dock is the ONLY surface in light mode
with no saturate companion** (wash/quiet/resting carry `--glass-saturate-* = 1.4`).

**Cause B — the perimeter hairline is sub-threshold (no silhouette).**
`--glass-border-dock` = `color-mix(in srgb, var(--foreground) 4%, transparent)`
(`glass.css:316`). At 4% α the warm-ink rim is below the read-threshold (BC.W-BLACK-BAR
deliberately dropped it to kill a "black bar"), so the dock has no edge over a flat
backdrop. The directional rim (`--glass-rim-top`/`-bottom`) is the intended silhouette
device — but in light mode `--glass-rim-top` is a WHITE catch-light that vanishes
against a near-white page.

**Cause C — over a flat backdrop the blur refracts nothing, so the adaptive tint never
engages.** The PaperBackdrop / static-wash routes give `--glass-backdrop-luma` ≈ below
the 0.6 knee, so the dock holds the 4% floor (`morph.css:436` clamp) — correct (no
gray-darken), but it also means NO warm-tint lift either. The plate is left as bare
`--card@0.42` with no light-concentration.

**The net:** a warm-cream-but-FLAT translucent slab that reads gray-ish because nothing
makes it read as luminous warm MATERIAL. This is the [[feedback-glass-ui-binding-verification]]
class — gate-green (chroma floor met), visually-gray (optical).

---

## 2. THE GRAY-GLASS FIX — precise token retunes (compositor-only, token-first)

### FIX-1 — give the LIGHT dock blur its saturate + warm light-concentration companion (THE headline)

`src/styles/tokens/glass.css` — change the light `--glass-blur-dock` to mirror the dark
arm's transmissive lift (the symmetric closure the dark arm already has):

```css
/* WAS: blur only — the flat-slab gray-read root */
/* --glass-blur-dock: blur(calc(var(--glass-blur-dock-radius) * var(--glass-level))); */

/* FIX-1 — the dock concentrates light like every other tier (apple-glass §4). The
   saturate lifts the cream's chroma through the plate; the small brightness is the
   light-concentration the quiet rung already carries. Mirrors dark-arm.css:259. */
--glass-blur-dock:
    blur(calc(var(--glass-blur-dock-radius) * var(--glass-level)))
    saturate(var(--glass-saturate-dock, 1.4))
    brightness(1.02);
```

Mint the named knob beside the ladder saturates (`glass.css` `--glass-saturate-*` block,
~L113): `--glass-saturate-dock: 1.4;` (the wash/quiet/resting register — the dock is a
calm chrome strip, NOT the floating 1.6). The dark arm keeps its own `saturate(1.30)`
(already on `dark-arm.css:259` — leave it, or re-point to `--glass-saturate-dock: 1.30`
in the `.dark` block for the symmetric token, consumer-overridable). **Compositor-only**
(`backdrop-filter` is a paint/composite op, no layout). **PRM/reduced-transparency-safe**:
the `prefers-reduced-transparency: reduce` bracket already maps `--glass-blur-dock: none`
(glass.css a11y bracket), so the saturate drops with the blur. **Safari**: the build owns
the `-webkit-backdrop-filter` prefix pass (`vite.style-assets.ts`); `saturate()`/`brightness()`
inside `backdrop-filter` is Baseline.

### FIX-2 — lift the dock perimeter hairline to a readable warm rim (the silhouette)

`src/styles/tokens/glass.css:316`:

```css
/* WAS: --glass-border-dock: color-mix(in srgb, var(--foreground) 4%, transparent); */
/* FIX-2 — the dock is FLOATING chrome over an unknown backdrop (unlike a content card
   on the page), so it earns a readable warm hairline (the iOS-27 edge-rim layer). 8%
   warm-ink is still a whisper, never the BC.W-BLACK-BAR "black bar" (that was a content
   card over a near-white plate — the dock floats, different case). */
--glass-border-dock: color-mix(in srgb, var(--foreground) 8%, transparent);
```

This is the warm-INK rim (`--foreground` H≈56°), NOT a gray line — it carves the
silhouette in the warm register. Keep `--glass-rim-top`/`-bottom` (the directional
catch-light/under-shadow) — they compose ON TOP.

### FIX-3 — warm the dock's RESTING tint floor a hair (optional, the luminous lift)

The dock currently holds `--glass-tint-strength-floor` (4%) over a calm backdrop, tinting
toward `--glass-tint-ink` (= `--foreground`, warm near-black). Over a near-white page that
4% warm-ink darken is the correct sub-perceptual silhouette. **Do NOT raise this** — raising
the darken toward ink is exactly the AZ gray-slab regression (`glass-fx.css:187` warns:
20% → oklab(0.785) gray). The luminous warmth comes from FIX-1 (saturate), not from more
ink-darken. **Recorded as a deliberate NO-CHANGE** (the substitution trap: the fix is
saturate-up, not tint-darken-up).

### FIX-4 — the dock control hover/active reads warm glass, not a gray step

`src/styles/tokens/sizing.css:307-308` — the hover/active already read `--glass-bg-resting`
/ `--glass-bg-floating` (warm-cream tiers). With FIX-1's saturate companion now on the dock
backdrop, the hover plate (`resting@0.65`, C 0.0147) reads warm. **No token change needed**
— FIX-1 fixes the hover/active read transitively (they compose the same `--card` ladder).
Verify in π: hover over a dock control must read warm-cream-brighter, not gray.

### FIX-5 — the facet-carousel chips inherit the warm read

`stack-rail.css:178` — `.dock-stack-member` paints `var(--glass-bg-floating)` +
`var(--glass-blur-floating)` (already saturate 1.6, warm). The facet chips (`--dock-facet-chip`,
L270) add the per-instance `--glass-accent` rim. **No change** — they ride the floating tier
which already has the warm companion. The accent strength (`--dock-facet-accent-strength: 48%`,
L49) is the consumer's context hue (presets-in-consumers).

---

## 3. THE GATE IMPACT — extend `proof:no-gray`, never weaken it

`proof:no-gray` is SOURCE-arm device-free + the binding π (`tests-visual/no-gray.spec.ts`).
The current asserts (`WARM_PLATE_FLOOR` 0.010, hue [45,85]) ALREADY PASS at HEAD because
the base `--card` chroma is met — the gate does NOT currently catch the optical gray-slab
(it composites `--card@α` over the page, not through the saturate filter). **The fix
strengthens the surface; the gate must gain a dock-saturate witness so the optical-gray
class is machine-caught.**

### Gate extension (add witnesses, no weakening of any existing floor):

1. **`dock-blur-has-saturate-light`** — assert the light `--glass-blur-dock` carries a
   `saturate()` term (parse `glass.css`): the flat-slab root cannot regress silently.
   Born-RED on HEAD (`blur()` only), GREEN after FIX-1. Mirror the dark-arm assert.
2. **`dock-blur-saturate-lockstep`** — the light dock saturate ≥ 1.2 (the
   light-concentration floor) AND the dark arm carries its own (the §2c per-mode pair).
3. **`dock-border-readable-light`** — the light `--glass-border-dock` α ≥ 6% (the
   silhouette floor) — catches a regression back to the sub-threshold 4%.
4. **π readback addition (`tests-visual/no-gray.spec.ts`)** — add a DOCK arm: render the
   live `.glass-dock` over the demo PaperBackdrop, `getComputedStyle` the composited plate,
   assert it resolves warm (C ≥ floor, H ∈ [45,85]) AND reads as MATERIAL not flat — the
   binding optical truth the source arm cannot prove. This is the [[feedback-live-pi-oklab-paint-arm]]
   discipline (the paint-arm parses `oklab()` from `getComputedStyle`).

The existing `WARM_PLATE_FLOOR`/`WARM_HUE_*` asserts stay UNCHANGED (no floor moved). The
extension is ADDITIVE — a saturate-presence witness + a π dock arm. `proof:no-gray` stays
the single home (extend-in-place, no new gate — the W-PRUNE-CONSOLIDATE no-dual-path
discipline). Keep `surface-tint-stays-srgb` GREEN (FIX-1 touches `backdrop-filter`, not the
`--surface-tint-*` in-srgb fence).

---

## 4. THE MOTION DEFECT — liquid-weight-universal on the nav-dock

The [[feedback-liquid-weight-universal]] law: ALL motion carries inertia/weight/bounce/squish.
The nav-dock surfaces to audit:

### MOTION sources (existing clocks — READ-ONLY, thread them, never re-tune the spring)

| Surface | Current | Target |
|---|---|---|
| Dock control press (`icon-button.css:93`) | `scale: var(--scale-press-dock)` on `--dock-press-spring` (= `--spring-smooth`, no-overshoot tap) | KEEP — a tap is no-momentum (Apple "Designing Fluid Interfaces": 100% damping for taps). Correct per §6. |
| Collapse↔expand morph (`dockMorphContext`) | `--dock-morph-t` on `DOCK_SPRING` (response 0.32, ζ 0.7) | KEEP — has the overshoot weight already. |
| Facet fan-out (`stack-rail.css:195`) | scale/translate on `--spring-dock` + `--spring-dock-duration`, staggered `--dock-stack-stagger * --i` | KEEP — already springy, staggered, compositor-only, PRM-carved. |
| Route page-enter (`AppShell.vue` `fade-slide`) | opacity `--ease-out` + transform `--spring-smooth` | KEEP — the §6 settle register. |
| Summary-chip / category nav click | `tap-squish` (CSS `:active:scale`) | KEEP. |

**Finding: the nav-dock MOTION is already liquid-weight-compliant** — the springs
(`DOCK_SPRING`, `--spring-dock`, `--spring-smooth`) carry the inertia/bounce, the squish
rides `useLiquidFlex`/`tap-squish`, all compositor-only + PRM-carved. The motion clocks are
the W-GLASS-CAL FENCE (read-only; `--spring-*-duration` generated from the SPRING_PRESETS
table). **Do NOT re-tune a spring** — that reds `proof:animation-coherence` /
`proof:spring-tokens-synced`.

### The ONE motion gap (per W-DOCK-SCROLL-FISSION + the goo-morph triumvirate)

The dock collapse/expand is a box-morph; the **goo-morph BETWEEN states** (the worm/
liquid-weight transition the user named — pager dots, dock split) is the
W-DOCK-SCROLL-FISSION assembly: `useDockFission` + `DockGooFilter` + `fission-bridge.css`
are SHIPPED but UNWIRED to the live nav-dock. **This is an ASSEMBLY wave, not a token
retune** — out of THIS research's scope (which is the gray-glass token mechanism + the
motion-clock audit). The motion FIX is: confirm the clocks are correct (they are), and
flag the fission-wire as the separate W-DOCK-SCROLL-FISSION wave. No motion TOKEN change
is owed by the nav-dock-fix.

---

## 5. THE COMPLETE FIX LEDGER (what an implementer changes)

| # | File | Change | Gate impact |
|---|---|---|---|
| FIX-1 | `tokens/glass.css` ~L142 | `--glass-blur-dock` += `saturate(var(--glass-saturate-dock,1.4)) brightness(1.02)`; mint `--glass-saturate-dock: 1.4` in the saturate block | `proof:no-gray` new `dock-blur-has-saturate-light` witness (born-RED→GREEN) |
| FIX-2 | `tokens/glass.css:316` | `--glass-border-dock` 4% → 8% warm-ink | `proof:no-gray` new `dock-border-readable-light` witness |
| FIX-3 | — | NO-CHANGE (tint-darken stays 4% floor; the luminous lift is saturate, not ink-darken) | recorded |
| FIX-4 | — | NO-CHANGE (hover/active inherit FIX-1 transitively) | π hover arm |
| FIX-5 | — | NO-CHANGE (facet chips ride floating tier, already warm) | — |
| GATE | `scripts/proof-no-gray.mjs` | add 3 source witnesses + π dock arm; no floor weakened | extend-in-place |
| MOTION | — | NO-CHANGE (clocks already liquid-weight; fission-wire is W-DOCK-SCROLL-FISSION) | — |

**The headline:** the gray-glass fix is ONE token + ONE rim α — give the light dock its
saturate companion (the symmetric closure the dark arm already has). The warm-cream
identity is intact at the base; the gray-read is the missing light-concentration filter.
Compositor-only, PRM-carved, Safari-safe, no spring re-tune, no `--surface-tint-*` touch,
no second recipe — compose the existing `--glass-saturate-*` register, extend `proof:no-gray`
in place.

### The dark-arm symmetry note (do NOT skip)

The dark `--glass-blur-dock` (`dark-arm.css:259`) already has `saturate(1.30) brightness(1.12)`
— the dark arm was correct, the LIGHT arm was the orphan. FIX-1 closes the light/dark
asymmetry (the same class as BB.W-DARK-INK-WARM closed for the surface-tint ink). After
FIX-1, both modes carry the dock light-concentration — the §2c per-mode pair idiom satisfied.
Consider re-pointing the dark `saturate(1.30)` to `saturate(var(--glass-saturate-dock,1.30))`
in the `.dark` block so the named knob is the single retune point in both modes (optional;
the value stays 1.30 dark / 1.4 light).
