# Overlays — Greenfield (Lens C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> The floating/overlay glass-tier family from first principles: **Sheet · Drawer ·
> Dialog · Popover · DropdownMenu · Tooltip · HoverCard · ContextMenu · Command**.
> One floating-glass register, one reveal recipe, one scrim/staging grammar — a
> UNION over the shipped overlays, not a fork. Lens C reaches for the boldest
> still-idiomatic variant: a surface that *pops off the page in cel planes*,
> *anticipates before it launches*, *overshoots then settles with real mass*, and
> at the drawer's full extent *snaps from transmissive glass to a solid plate while
> the page recedes and scales under it* — the 1940s-technicolor reading of an iOS-27
> overlay.

---

## 0. Live-verified status quo (chrome-devtools, real open/close, both modes)

A real paint read over the live routes (`/containers/drawer`, `/containers/popover`,
`/containers/dropdown-menu`, drawer at detent t=0.4, both modes). The numbers are the
honest born-state, not arithmetic:

| Surface | Light bg (OKLab) | Dark bg (OKLab) | backdrop-filter | verdict |
|---|---|---|---|---|
| Drawer sheet @ t=0.4 | `oklab(0.974 +0.0057 +0.0137 / .95)` | `oklab(0.295 +0.011 +0.019 / .96)` | `blur(20px) saturate(1.6)` | **WARM both modes** (positive a·b; L tracks `--card`) |
| Popover panel | `oklab(0.936 +0.0056 +0.0133 / .808)` | — | `blur(13px) saturate(1.6)` | warm, `glass-floating glass-reveal` |
| Dropdown panel | — | `oklab(0.379 +0.0099 +0.0169 / .894)` | `blur(13px) saturate(1.28) brightness(1.1)` | warm, `glass-floating glass-reveal` |
| Scrim | `color(srgb .11 .098 .09 / .8)` | (warm-ink) | `blur(1px) saturate(1.4)` | warm-brown dim, NOT flat black |

**The five facts that drive this design:**

1. **Warm-glass: already PASS.** Every overlay surface reads warm transmissive glass
   in BOTH modes — positive OKLab a·b, lightness tracking `--card`
   (`hsl(30 85% 96%)` light / `hsl(26 22% 17%)` dark) via the
   `color-mix(in oklab, <rung>, --glass-tint-source --glass-tint-strength)` seam.
   The §3 "colorful field behind glass + defined edge, NEVER gray" floor holds.
   The brief's §3 root-cause hunt (#1 flat-field, #2 dormant-tint) is **already
   closed** on these surfaces by BA.W-NO-GRAY + the warm `--card` floor. *Lens C
   does not re-fight the warm-floor — it INHERITS it and amplifies the punch.*

2. **Drawer detent → opacity: DEAD (born-RED, confirmed).** The sheet bg α is a
   **fixed ~0.95** at t=0.4 — it does NOT track the snap fraction. The peek sheet is
   already near-opaque; the full sheet is the same plate. `--glass-drawer-t` drives
   `translateY` ONLY (`DrawerContent.vue` inline transform). The opposite of iOS T6.

3. **Page-scale: DEAD (born-RED, confirmed).** `main`/`body` transform = `none`.
   `shouldScaleBackground` is declared + documented on `Drawer.vue` and **reads
   nothing** — zero `scale(` in the cascade, zero pixels animated. A live dead-knob
   LIE, exactly as flagged.

4. **Popover ⇄ Dropdown: already ~85% congruent.** BC.W-OVERLAY-UNIFORM landed the
   union — both compose `glass-floating glass-reveal` + the shared
   `{glass·veil·opaque}` surface axis + the φ `--overlay-pad-*` ladder + origin-aware
   `transform-origin`. The residual gaps are (a) the **trigger geometry** is
   un-unified (a popover trigger and a dropdown trigger have no shared register), and
   (b) a minor saturate-channel drift (1.6 vs 1.28+brightness-companion — a dark-arm
   companion, correct, not a defect). *Lens C does not re-fork — it closes the
   trigger seam + names the ONE register.*

5. **Reveal: `.glass-reveal` ships and is GOOD but CALM.** Scale 0.88 squish + fade +
   `filter` blur-settle, on `--spring-snappy`'s own clock, origin-anchored at the
   popper edge, PRM-carved (opacity-only floor), Safari-safe (the decongest rides the
   surface's OWN `filter`, never `backdrop-filter`). But it is the *calm* spring —
   **no anticipation pre-dip, no past-fence punch**. The cartoon register
   (`--ease-cartoon-punch`) is NOT yet applied to any overlay (and the token itself
   is **not yet declared in `src/styles/`** — it is a design.md §L2/§Easing spec, a
   BUILD-DAG dep this design depends-on, never assumes-extant).

**The honest scope:** warm-glass is WON; congruence is 85%-WON; the real work is
(a) the drawer detent→glass/scrim/scale coupling (born-RED), (b) the dead-knob
removal/wiring, (c) the cartoon-punch GRADE on the reveal, (d) the trigger seam.
Lens C's contribution is the *loudest still-idiomatic* take on each.

---

## 1. The core idea — ONE register, THREE coupled scalars, a CARTOON arrival

Every overlay in the family is the same animal: a **floating warm-glass plate** that
**blooms from an anchor with cartoon punch**, sits over a **warm-dimmed staged scene**,
and **dismisses as the squish-fade inverse**. The differences between a tooltip and a
full drawer are not different *recipes* — they are different *values of three shared
scalars* on the one register:

```
  --overlay-reveal-t   0→1   the bloom progress (scale·fade·blur-settle·punch)   ALL overlays
  --overlay-scrim-t    0→1   the scene-stage (scrim dim + page desaturate)        modal overlays
  --glass-drawer-t     0→1   the detent fraction (the drawer's snap position)     drawer/sheet only
```

The bold move is that **all three scalars feed the SAME `--glass-level` clarity
machinery** that already exists (`tokens/glass.css`: every rung is
`1 - (1 - opacity)·--glass-level`, level→0 = solid `--card`). So "opaque at full
extent" is not a new opacity system — it is **`--glass-level` driven by `1 -
--glass-drawer-t`** on the drawer scope. One knob, already wired through all five
rungs, the a11y brackets, and the tint seam. KISS to the bone.

### The register, named

`.glass-overlay-surface` — the ONE floating-glass recipe the whole family composes
(it is `glass-floating` + `glass-reveal` + the surface axis + the φ pad ladder, given
a name so the family reads as ONE thing). Every panel root carries it. No per-overlay
glass fork survives.

---

## 2. THE BOLDEST MOVE — the Drawer "tectonic settle": detent → glass/scrim/scale, as ONE cartoon arc

This is Lens C's headline. The drawer does not merely "go opaque at full" — it
**performs a tectonic settle**: as you fling it to full, the *page sinks and scales
away*, the *scrim deepens*, and the *glass freezes from transmissive to solid plate*,
all three coupled to the one `--glass-drawer-t` and all arriving on the **bouncy
spring with a cartoon overshoot** so the full sheet *lands with weight* — a heavy
slab settling onto a recessed stage, not a fade.

### The three couplings (all off the existing `--glass-drawer-t`, all compositor-or-paint-cheap)

```css
/* drawer.css — the detent-coupled tectonic settle. ALL three read the ONE scalar
   the house useDrawerSnap SpringProgress already writes. No new JS, no new engine. */

.glass-drawer[data-glass-drawer-snap-points="true"] {
  /* (A) GLASS FREEZE — the detent drives --glass-level. At peek (t≈.12) the sheet is
     transmissive glass (level high → low opacity, blur reads through); at full (t=1)
     level→0 = the solid --card plate + blur(0). The lerp is the SAME --glass-level
     machinery every rung already obeys, so the tint seam + a11y brackets ride along.
     Clamped so peek never goes fully clear (legibility floor) and full lands solid. */
  --glass-level: calc(1 - var(--glass-drawer-t) * 0.92);   /* peek≈0.89 → full≈0.08 */

  /* The blur ALSO eases toward 0 at full — a solid plate has no backdrop to bend.
     Rides the surface's resting --glass-blur-overlay scaled by the same fraction. */
}

/* (B) SCRIM DEEPEN — the scrim opacity tracks the detent (the scene stages HARDER as
   the sheet commits). The warm --overlay-scrim-ink is the existing fixed warm-black. */
.glass-drawer-overlay {                      /* the DrawerOverlay scrim element */
  --drawer-scrim-t: var(--glass-drawer-t);
  background: color-mix(in srgb, var(--overlay-scrim-ink)
              calc(28% + var(--drawer-scrim-t) * 44%), transparent);   /* .28→.72 */
}

/* (C) PAGE RECEDE + SCALE — shouldScaleBackground REALIZED. The page-behind scales
   DOWN + desaturates as the sheet rises, so the modal moment reads as a recessed
   stage (iOS T6 / §L4 staging principle 3). A SINGLE transform on the page-root
   wrapper, compositor-only, behind the scrim. The 0.95 floor is the iOS amount. */
[data-drawer-staging] {
  scale: calc(1 - var(--glass-drawer-t, 0) * 0.05);          /* 1 → 0.95 */
  filter: saturate(calc(1 - var(--glass-drawer-t, 0) * 0.35));
  border-radius: calc(var(--glass-drawer-t, 0) * var(--radius-panel));
  transition: scale var(--spring-snappy-duration) var(--spring-snappy);
}
```

**`shouldScaleBackground` — the dead-knob, RESOLVED (no legacy):** the prop is
*wired*, not removed. `Drawer.vue` provides a `--glass-drawer-t` mirror onto a
`[data-drawer-staging]` page-root marker (the consumer wraps their app root, or the
demo shell provides it) so the scalar reaches the page wrapper through the portal
boundary. When `shouldScaleBackground` is false, the marker is absent and coupling
(C) is a no-op — but it is no longer a *lie*: the knob now gates a real, painted
effect. (Per the no-backwards-compat law, if a wave decides the prop name is wrong,
RENAME it cleanly — but it must paint pixels or not exist.)

**The cartoon arc:** the drawer's snap spring is re-pointed from the calm
`DRAWER_SNAP {0.50, 0.74}` (near-critical, ≤4% give) to a **detent-aware** clock —
the *commit-to-full* fling rides a touch more give (the heavy slab lands with a
single bounded settle), while the *intermediate* peek↔half snaps stay calm (an
observer-ish reseat). The bold reading: full-commit gets the bouncy mass; mid-detent
nudges stay overdamped. This honors §L2 driver-vs-observer (the user-driven fling is
the driver; it earns the weight) without making every snap springy.

**Born-RED gate (honest):** a π frame-series proving (1) the composited sheet bg α is
**translucent at peek/half AND near-opaque at full**, BOTH modes (born-RED on the
current fixed-0.95 plate); (2) the page-root `scale` is **<1 at full and 1 at closed**
(born-RED on the current `transform:none`); (3) the scrim α **rises with the detent**
(born-RED on the fixed-0.8). No getComputedStyle over a hardcoded field — the read is
over the real `[data-glass-drawer]` at three captured detents.

---

## 3. The CARTOON-PUNCH reveal — `--ease-cartoon-punch` graded onto `.glass-reveal`

`.glass-reveal` is the family floor and it is good. Lens C makes it **loud** by
routing its SPATIAL legs through the cartoon register **as an opt-in punch tier**,
never replacing the calm default (the workhorse stays `--spring-snappy`).

### The mechanism — a punch variant, not a re-fork

```css
/* glass/reveal.css — the cartoon PUNCH tier. Composes ON TOP of .glass-reveal;
   re-points ONLY the SPATIAL timing-function to the cartoon curve. The EFFECTS legs
   (opacity, blur-settle) STAY on --ease-out (a fade must never bounce — §L2). */

.glass-reveal.glass-reveal--punch {
  --glass-reveal-enter-scale: 0.82;     /* a deeper squish — the louder bloom */
  transition-timing-function:
     var(--ease-cartoon-punch),   /* scale  — anticipation dip + ~22% overshoot */
     var(--ease-cartoon-punch),   /* translate */
     var(--ease-out),             /* opacity — no bounce */
     var(--ease-out),             /* filter blur-settle — no bounce */
     linear, linear;
}
```

`--ease-cartoon-punch` is the design.md §L2/§Easing **shaped `linear()`**: a real
~4% anticipation dip *below origin* (which no damped spring can express — the
`--spring-bouncy` token only overshoots from one side), crossing 1.0, peaking ~1.22,
then settling. **SOURCE-VERIFY: this token is NOT yet declared in `src/styles/`** —
it is a Band-0 BUILD-DAG dependency (`feedback_*` + design.md §Easing line 308). This
design **depends-on** it; the overlay wave is downstream of the Band-0 cartoon-punch
landing. (If Band-0 has not minted it, the overlay wave's first step mints it from the
design.md curve spec — anticipation leg + 1.22 peak — as a raw `--ease-*` token, NOT a
`SPRING_PRESETS` row and NOT a `MOTION_CURVES` entry; the ≤10% spring fence stays
intact.)

### Which overlay gets which tier (the §L4 `--motion-weight` carve)

| Overlay | reveal tier | rationale |
|---|---|---|
| Tooltip, HoverCard | `.glass-reveal` (calm) | quiet informational surfaces — punch would be noise |
| Popover, Dropdown, ContextMenu, Command | `.glass-reveal` (calm) | frequent, fast; calm snappy keeps them crisp |
| **Dialog, Sheet** | **`.glass-reveal--punch`** | the deliberate takeover moment — the loud cartoon bloom |
| **Drawer (full-commit leg)** | bouncy mass settle (§2) | the tectonic landing |

The punch is **opt-in + loud by design** (the §Shadows / §L2 cartoon-register
doctrine). The default overlay stays the calm six-layer glass. This is the
"survival of the fittest — REFINE what is weak" discipline: the calm reveal is fit
and kept; the takeover surfaces gain the punch they were missing.

### The cartoon SHADOW — the cel-plane pop

Dialog + Sheet compose `.shadow-cartoon-lg` (the existing §Shadows cartoon rung,
`--shadow-cartoon` reading `--shadow-color: var(--foreground)`, re-tinting per mode by
construction). On the punch bloom the **layered-offset cast travels opposite the
scale** via a `::after` shadow-caster transform (never an animated `box-shadow` —
§L7), scaled by `--motion-weight`, so the dialog *punches off the scrim in bold cel
planes* as it lands, then the cast settles. PRM → static cast, no travel.

---

## 4. Popover ⇄ Dropdown congruence — close the TRIGGER seam (the panel is already one)

The panels are already congruent (§0 fact 4). The unaddressed half is the **trigger**.
Lens C names ONE trigger register the whole anchored-overlay family shares:

```css
/* glass/overlay-trigger.css — the ONE anchored-overlay trigger register.
   Popover, Dropdown, ContextMenu(area), HoverCard, Tooltip triggers compose it. */
.overlay-trigger {
  /* The press choreography (§L3) — the trigger dips on press (useLiquidPress /
     --scale-press), and on OPEN it carries a subtle data-state lift so the trigger
     and its bloomed panel read as ONE coupled gesture (the panel blooms FROM the
     pressed trigger). */
  transition: scale var(--spring-snappy-duration) var(--spring-snappy);
}
.overlay-trigger[data-state="open"] { scale: 0.97; }   /* the trigger seats while open */
```

The **bold congruence move:** the panel's `transform-origin`
(`--reka-popper-transform-origin`, already wired) is the *pressed-trigger rect*, so
across popover AND dropdown the panel **blooms out of the same point it was launched
from** — the trigger and panel are visibly ONE register. Same trigger press, same
origin-anchored bloom, same `glass-overlay-surface` panel, same φ pad ladder. The
only sanctioned difference is the **pad rung** (menus tight `--spacing(1)`, popovers
breathing `1rem` — both on the φ ladder) — a content-density choice, not a fork.

"Why are these different — at least style them the same" → **they are now ONE
register end to end** (trigger geometry + bloom origin + panel glass + reveal),
parameterized only by content padding.

---

## 5. The scrim / staging grammar — ONE warm-dim scene, three intensities

The scrim already exists (`ModalOverlay`, warm `--overlay-scrim-ink hsl(24 10% 10%)`,
three rungs glass/dim/clear, `blur(1px)`). Lens C unifies the *staging* across the
modal overlays (Dialog, Sheet, Drawer, Command) onto the §L4-principle-3 substrate:

- **Warm dim, never flat black** — kept (`--overlay-scrim-ink` is warm-brown). The §3
  warm-floor reaches the scrim too.
- **Page recede + desaturate** — the drawer's `[data-drawer-staging]` coupling (§2C)
  generalizes to a `--overlay-scrim-t` the modal overlays can drive (Dialog/Command =
  a fixed 1; Drawer = the detent fraction). ONE staging recipe, the consumer stages
  per §L4 ("the substrate provides the scrim + scale tokens, the consumer stages").
- **Scrim bloom is coupled to the panel** — the scrim fades in on the SAME clock as
  the panel blooms, so the scene stages AS the surface arrives (not a two-step).

§L7 fence: the scrim's `backdrop-filter: blur(1px)` is a one-shot fade-in, never a
steady-state per-frame re-blur. The page-recede is a compositor `scale`+`filter`, not
a layout property.

---

## 6. Cross-engine (Chrome + Safari) — the §L7 arms, named per channel

| Channel | Chrome | Safari | fence |
|---|---|---|---|
| reveal scale/translate | `scale:`/`translate:` longhands | same | compositor-only; never `transform:` (no stacking-context mint) |
| reveal blur-settle | `filter: blur()` on the surface's OWN pixels | same | NEVER `backdrop-filter` (would clobber the resting glass plate) — already correct |
| glass plate | `backdrop-filter: blur() saturate()` | `-webkit-backdrop-filter` companion | the §L1 floor; `@supports not (backdrop-filter)` → `--glass-level: 0` solid arm |
| cartoon-punch | `--ease-cartoon-punch` (`linear()`) | `linear()` is WebKit-supported | PRM → `--ease-standard`; opt-in |
| drawer glass-freeze | `--glass-level` lerp | same | no goo/filter on any ANCESTOR of the sheet (§L7) — the glass-freeze is a `--glass-level` change, not an ancestor filter |
| page recede | `scale`+`filter:saturate` on page-root | same | compositor-cheap; one-shot per open |
| scrim | warm `color-mix` α + 1px blur | `-webkit` companion | one-shot fade, no loop |

**Goo/§L7 note:** this family carries NO metaball goo — the overlays are glass
plates, not blob morphs — so the "goo filter on an ancestor of glass" trap is N/A
*except* the drawer detent: the glass-freeze MUST be a `--glass-level` lerp (a
descendant-safe opacity change), never an ancestor `filter`, or it would kill the
sheet's `backdrop-filter` and flat-slab the glass (the §3 / dock-hub goo-tear
lesson). The design is explicitly built on `--glass-level`, which is exactly the
ancestor-filter-free path.

---

## 7. A11y / PRM carve

- **Focus trap + escape + roving** — inherited from reka (`DialogContent`,
  `DropdownMenuContent`, etc.) end to end; the redesign touches LOOK + MOTION only,
  never the headless a11y substrate. Command palette keeps its roving + type-ahead.
- **PRM** — `.glass-reveal`'s existing carve (spatial→none, opacity-fade survives,
  blur→0) covers the calm tier; the `--punch` tier collapses `--ease-cartoon-punch →
  --ease-standard` (§L2). The drawer detent under PRM: the `useDrawerSnap`
  SpringProgress already jumps `--glass-drawer-t` to target in one frame — so the
  glass-freeze + scrim + page-scale **snap deterministically to their endpoints**,
  zero motion frames (the couplings are pure functions of t — they inherit the
  instant snap for free). The cartoon-shadow → static cast, no travel.
- **`prefers-reduced-transparency`** — `--glass-level: 0` (a11y-fallback.css) makes
  every overlay an opaque warm-tinted plate; the drawer glass-freeze is already
  heading there at full, so this bracket just pins it across all detents.
- **`prefers-contrast: more`** — rim opacity → 1, rim ×2, text → `--text-strong`; the
  cartoon cast opacity floors UP (the inked edge is a legibility asset).

---

## 8. DEFT integration — the union (what survives, what's refined, what's reinvented)

**KEEP (fit):** the warm `--card` floor + oklab tint seam (warm-glass is WON); the
`glass-floating`/`glass-overlay` tiers; `.glass-reveal` (the calm floor);
`useDrawerSnap` SpringProgress + the detent ladder + `--glass-drawer-t`; `ModalOverlay`
+ the warm scrim rungs; the surface axis; the φ `--overlay-pad-*` ladder; the
BC.W-OVERLAY-UNIFORM panel congruence; all reka a11y substrates.

**REFINE (weak):** `.glass-reveal` gains the opt-in `--punch` tier (cartoon arrival on
Dialog/Sheet); the trigger seam gains the `.overlay-trigger` register; the scrim
gains the `--overlay-scrim-t` staging coupling; the panel `transform-origin` becomes
the pressed-trigger rect for popover⇄dropdown bloom congruence.

**REINVENT (broken):** the drawer detent→glass/scrim/scale coupling (the dead-knob
lie → a real tectonic settle off `--glass-level`); `shouldScaleBackground` wired to
paint pixels (or cleanly renamed/removed — no lie survives).

**No new engine, no new fork.** Every coupling rides scalars + machinery that already
ship. The single net-new artifacts: one `.overlay-trigger` register, one
`.glass-reveal--punch` variant, the drawer's three `--glass-drawer-t` couplings, and
the dependency on the Band-0 `--ease-cartoon-punch` token (depend-on, source-verified
as not-yet-extant).

---

## 9. DELTA-ASSAY — reconcile vs the 116-wave set (no dup)

| Existing wave (IOS27-REFERENCE) | Lens-C overlay coverage | reconcile |
|---|---|---|
| **W-DRAWER-DETENT-GLASS** (T6, ~50%, NOT on disk) | §2 — the detent→glass/scrim/scale tectonic settle + dead-knob wiring | **THIS IS that wave, graded LOUD.** Lens C = its cartoon-mass realization. No dup — it *is* W-DRAWER-DETENT-GLASS's body. |
| W-LIQUID-ENTRANCE-GENERAL (T10, ~65%) | §3 — the cartoon-punch GRADE on `.glass-reveal` for takeover overlays | **Sibling, not dup.** T10 generalizes the *calm* squish to all surfaces; Lens C adds the *punch tier* for the takeover overlays specifically. Lens C's §3 is the overlay-family slice + the cartoon escalation. |
| BC.W-OVERLAY-UNIFORM (shipped) | §4 — the panel congruence | **Already landed.** Lens C only ADDS the trigger seam (the un-done half). |
| BE.W-SHEET-TRANSLUCENT (shipped) | the `--glass-bg-sheet` warm plate | **Inherited.** Lens C builds the detent coupling ON this. |

**The amendment this produces:** `W-DRAWER-DETENT-GLASS` is the home wave for §2
(detent coupling + dead-knob). A NEW small wave `W-OVERLAY-PUNCH-REVEAL` carries §3+§4
(the `.glass-reveal--punch` tier + the `.overlay-trigger` seam) — downstream of the
Band-0 `--ease-cartoon-punch` mint. No third wave; §5–§7 are sub-clauses of those two.
ZERO dup with the 116-set: §2 = W-DRAWER-DETENT-GLASS's missing body; the rest is one
new overlay-punch wave + inheritance.

---

## 10. The gestalt bar (what "shipped" means here)

A π capture, BOTH modes, real open/close gestures, over the real routes:

1. **Warm:** every overlay surface OKLab a·b positive, L tracking `--card` (PASS at
   born-state — the regression fence, not the headline).
2. **Drawer:** sheet α translucent @ peek/half, near-opaque @ full; page-root scale <1
   @ full, =1 @ closed; scrim α rising with detent — all born-RED today, all GREEN
   after §2.
3. **Reveal:** Dialog/Sheet bloom shows the anticipation dip + ~1.22 overshoot
   (cartoon punch), the calm overlays show the snappy bloom — born-RED on the
   uniform-calm reveal.
4. **Congruence:** popover + dropdown share trigger register + bloom origin + panel
   glass — born-RED on the un-unified trigger.
5. **Cross-engine:** the same frame-series in Chromium AND WebKit (the paired-engine
   π, §L7).

Gestalt: **every overlay reads warm floating glass + a liquid (and, for takeovers,
cartoon-PUNCH) reveal; the drawer detent performs the tectonic settle; popover and
dropdown are visibly ONE register — both modes, real gestures, paired engines.**
