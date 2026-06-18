# BC — the de-shadcn / de-reka first-principles design brainstorm + the Atlas fold

> The user directive (2026-06-18): "From first principles, design our components to abrogate ANY
> styling of shadcn and default reka. Look at the iOS-27 Safari tab switcher for our tabs styling,
> and the Apple website for other glass elements — though we want to BEST that in look and feel with
> our own paper and glassmorphism aesthetic. Brainstorm approaches. Refine our extant waves."
> Plus the Atlas ask (A-1..A-9). **Card is the only NEW component of the Atlas set.**
>
> This RE-OPENS BC for the added scope (the original 70 waves stay CONVERGED; this adds a small wave-set
> + refines the styling DNA of the existing component/tabs/glass waves). Tranche-development only.

---

## 0 — The governing principle: reka = BEHAVIOR, glass-ui = 100% of the MATERIAL

The `ui/` components are shadcn-vue-pattern wrappers over reka-ui. Two layers of inherited skin leak:
1. **shadcn-vue default styling** — the neutral chrome vocabulary (`bg-background`, `border-input`,
   `ring-ring`, the default `rounded-md`, the `text-muted-foreground` placements, the shadow-sm
   slabs). It is a *generic* design system; it is NOT ours.
2. **default reka-ui skin** — reka is headless, but a few primitives ship structural defaults +
   data-state classes the wrapper inherits without re-skinning.

**The principle (the fence):** reka provides ONLY behavior — focus management, ARIA, state machines,
portal, roving-tabindex, collision. **glass-ui provides 100% of the paint, from first principles, in
the paper + glassmorphism aesthetic.** No shadcn-neutral token survives in the visual layer. This is
the styling-DNA companion to the existing component-over-class + token-first axes.

---

## 1 — Brainstorm: the five approaches

### A — The headless/skin SPLIT + a born-RED gate (the architecture)
Keep reka's headless primitives; route ALL paint through glass-ui's CVA + the `@theme`/`@utility`/
`@apply` cascade. Author **`proof:no-shadcn-default`** — a born-RED gate that reds any shadcn-neutral
token in a `ui/` component off a tiny justified allowlist: `bg-background`/`bg-muted`/`border-input`/
`ring-ring`/the bare `rounded-md` default/`shadow-sm`. The legibility-allowlist (avatar/label/
separator/skeleton/table — the AX.W54 opaque set) is the only sanctioned survivor. This makes the
de-shadcn a STRUCTURAL invariant, not a one-time sweep that drifts back.

### B — Material-first reskin (every surface is glass or paper, never a flat slab)
Every interactive surface resolves a glass tier (`--glass-bg-*`) or a paper register
(`.paper-ink-mark` / paper-grain); every control is a glass-pill / glass-well (`.input-pill` /
`.control-surface`); every overlay is a `glass-floating` plate with the liquid-reveal bloom. The
shadcn flat-neutral slab is abolished. This is mostly ALREADY the glass-first canon (AX.W54) — the
gap is the *residual* shadcn classes the wrappers still carry (the A6/A7 cleanup-assay surfaces them);
this wave makes "zero shadcn-neutral" the binding bar.

### C — Tabs from the iOS-27 Safari tab switcher (refines `BC.W-TABS-IOS` + `BC.W-LIQUID-TAB`)
The Safari (iOS 26/27) tab model is the reference: tabs are **glass capsules**; the active one is a
**liquid-glass plate** that slides + morphs between positions; the tab-switcher view fans them into a
**grid of glass cards** with a source-rect bloom. Applied:
- **pill register** = small glass CAPSULES (the value.js-demo small-pill, rounded-pill, NOT the
  squared shadcn `rounded-md` tab). The track is `glass-quiet`; the active indicator is the
  `glass-floating` "selected-reads-as-glass" plate (W-REGISTER-IOS), never a saturated fill.
- **the active indicator** glides on `--spring-snappy` at the calibrated `--tab-indicator-duration`
  and SQUISHES on travel (volume-preserving, released-at-arrival) — and the spring is EASED (the
  user's "too abrupt" → the `snappy` register, perceptual arrival ~100-120ms, the settle clock NOT
  truncated; the abrupt jump replaced by the coupled scale+fade on the spring's own clock).
- **`BC.W-LIQUID-TAB`** = pull-an-active-tab → it morphs + squishes to the drop slot (useDragMorph +
  the kf Draggable rubberBand), the iOS pull-tab feel.
- **the underline variant** = the `.paper-ink-mark` hairline (the paper material), the editorial twin.
- reka's `Tabs` provides ONLY the roving-tabindex + `role=tablist/tab` + panel wiring; glass-ui owns
  every pixel of the capsule, plate, squish, and bloom. NO reka/shadcn tab skin survives.

### D — Glass elements that BEST apple.com (refines the Band-1 glass waves + the deep tier)
apple.com glass = glass-over-PHOTO (lensing via the squircle displacement n=1.5, specular catch-light,
adaptive tint, materialization). glass-ui takes ALL of that (the W-LENSING/W-LIQUID-REVEAL/
W-GLASS-LEGIBILITY-MEASURED specs already encode it) AND **bests it with the identity Apple does not
have**: glass-over-**PAPER-GRID-MATH**. The plate floats over the warm-cream paper underpaint + the
blueprint grid + the audacious √φ type + the colorful icon POPs — so the material REVEALS our paper/
grid/math identity beneath, not just a hero photo. The **deep-glass tier** (`--glass-depth`, BB.W-DEEP-GLASS)
is the "beat Apple" register for the hero glass + the CTA. The differentiator, stated: **Apple's
material is glass; ours is glass on craft.**

### E — The component-by-component reskin census (the execution shape; converges with the cleanup assay)
Each `ui/` + `custom/` component gets a first-principles reskin verdict in the census the cleanup
assay (A6 non-idiomatic-Tailwind + A7 design-idioms) is already producing. The de-shadcn wave OWNS the
binding bar (zero shadcn-neutral) + the gate; the assay supplies the per-component findings. They
merge into ONE reskin plan — no duplicate effort.

---

## 2 — The Atlas fold (A-1..A-9 → BC waves; Card is the only NEW component)

| Atlas item | what | BC home | new component? |
|---|---|---|---|
| **4.0.0→4.1.0 publish** | the hard blocker for atlas Phase B/C/D | **BC.W-CUT** (the honest 4.x cut; drives the atlas `^3.12.0`→`^4.x` adopt) | no |
| **A-1** (re-scoped) | vertical-rail collapse↔expand height-morph; now SMOOTHNESS POLISH (collapse-to-logo ships glass-independently) | **BC.W-DOCK-ENGINE / DOCK-VERTICAL-FIX** (Band 2) — Atlas = named 3rd consumer | no |
| **A-2** | `--glass-accent` per-instance data-hue rim seam | **BB.W-GLASS-ACCENT** (BUILT source) → **BC.W-VISUAL-RECONCILE** re-verifies on the fixed floor | no (seam) |
| **A-3** | silver/bronze metal-shimmer family | **BB.W-METAL-SHIMMER** (BUILT) → **BC.W-VISUAL-RECONCILE** | no (seam) |
| **A-5** | marks deltas: underline `amplitude` knob (wobble÷stroke ≥0.6) + hull `se` empty-fragment guard | **BC.W-VISUAL-RECONCILE** (HandMark re-walk) + **W-CROSSREPO-ASKS** (the pencil-boil by-name ask) | no (seam) |
| **A-6** | the ring/circle positioned-mark DX (px→marking-space projection) | **HandMark DX** — booked nice-to-have via W-CROSSREPO-ASKS | no (DX) |
| **A-7** | the boil-budget surface (expose the boil scheduler's active-subscriber count) | **HandMark/pencil-boil DX** — booked nice-to-have | no (DX) |
| **A-8** (ROOT BUG) | the giant-radial-glow defect (a spurious large radial halo over-paints a glass surface on a viz) | **NEW: `BC.W-GLASS-GLOW-FIX`** (Band 1) — root the leaking glow/radial rule; the atlas confirms the surface | no (defect fix) |
| **A-9** (ROOT SIZING) | the in-dock dark-toggle oversized (visible in the phone "Theme" row) | **fold into BC.W-DOCK-ENGINE** — clamp `--dock-control-glyph-size`/padding at the dock register | no (token clamp) |
| **ExpandableContainer `::part()`/slot seam** (I-ARCH AR-7) | the expand-fullscreen chrome hook | **NEW small seam: `BC.W-EXPANDABLE-PART`** (containers) — expose `::part()`/slots | no (seam) |
| **the I5 selection card** | a glass card with the `--glass-accent` data-hue rim + the metal-shimmer selected-border | **NEW COMPONENT: `BC.W-SELECTION-CARD`** — `<Card variant="selection">` (the ONE new component; composes A-2 + A-3, no new sub-system) | **YES — the only one** |

**The "Card is the only new component" fence (machine-checkable):** of the Atlas set, exactly ONE new
component (`BC.W-SELECTION-CARD`) is minted; A-2/A-3/A-5/A-6/A-7 are SEAMS on existing primitives,
A-8/A-9 are fixes, the `::part()` is a seam on the existing ExpandableContainer. A second new component
from this set reds the fence.

---

## 3 — The new + refined wave-set (RE-OPENS BC for the added scope)

**NEW waves (5):**
- `BC.W-DESHADCN` (Band 1, cross-cutting) — reka=behavior / glass-ui=100%-material; the `proof:no-shadcn-default` gate; the per-component reskin bar (merges the cleanup-assay A6/A7 census).
- `BC.W-SELECTION-CARD` (Band 1) — the I5 `<Card variant="selection">`, the only new component.
- `BC.W-GLASS-GLOW-FIX` (Band 1) — the A-8 giant-radial-glow root defect.
- `BC.W-EXPANDABLE-PART` (containers) — the A-9-adjacent ExpandableContainer `::part()`/slot seam.
- (A-9 dock-toggle clamp folds INTO `BC.W-DOCK-ENGINE`, not a new wave.)

**REFINED extant waves (cite the de-shadcn DNA + the new specs):**
- `BC.W-TABS-IOS` + `BC.W-LIQUID-TAB` — the iOS-27 Safari tab-switcher capsule/plate/squish + the
  eased spring (§1-C).
- `BC.W-GLASS-IDENTITY` + `BC.W-GLASS-LEGIBILITY-MEASURED` + `BC.W-DIALOG-GLASS` + `BC.W-BUTTON-GLASS-IOS`
  — the apple-glass-bested-with-paper direction + the de-shadcn material-first reskin (§1-B/D).
- `BC.W-VISUAL-RECONCILE` — adds the Atlas A-2/A-3/A-5 re-verify on the fixed floor + the I5-card consume.
- `BC.W-DOCK-ENGINE` — folds the A-9 dark-toggle clamp.
- `BC.W-CUT` / `BC.W-ATLAS-ASK` — the 4.1.0 publish drives the atlas adopt; A-6/A-7 booked.

---

## 4 — The refinement workflow (fires after the cleanup assay `we4oos254`)

A research+refine workflow: (1) SOTA research — the iOS-27 Safari tab switcher (the capsule/morph/
switcher-grid model) + apple.com glass elements (nav/cards/buttons, the lensing+specular params),
deep-read + measured; (2) author the 4 new wave specs + fold A-9; (3) refine the extant waves to cite
the de-shadcn DNA + the tab-switcher + apple-glass specs; (4) incorporate the cleanup-assay per-component
findings into the reskin census; (5) re-challenge the added wave-set to convergence. Rate-safe batches.
