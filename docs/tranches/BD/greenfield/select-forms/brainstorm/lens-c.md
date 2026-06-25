# SELECT (forms) — GREENFIELD brainstorm · LENS-C (AUDACIOUS 1940s-TECHNICOLOR FLOW & PUNCH)

> The SELECT trigger→menu reveal + the shared menu glass, re-imagined from first principles through
> the cartoon-animation lens: anticipation, exaggeration, follow-through, overlapping action, arcs,
> squash & stretch with real WEIGHT — while staying idiomatic (composes the EXTANT `.glass-reveal` /
> `.glass-menu-row` / `--glass-tint-*` seams; no re-fork) and cross-engine. DEFT union, not a bolt-on.

---

## 0. LIVE INTERROGATION (the honest born-RED, painted-pixel, both modes)

Live `/forms/select`, REAL click on the trigger (the menu is a `SelectPortal` popover, `data-side=top`
here because the trigger sits high). Measured `getComputedStyle` + an **HONEST composite of the live
menu rgba over the live painted backdrop pixel** (read via `document.elementFromPoint` behind the
portal — NOT a hardcoded field; the recurring parse-oklab-over-purple fraud is avoided by reading the
ACTUAL flat page pixel the glass sits on).

| Read | LIGHT | DARK |
|---|---|---|
| Page pixel BEHIND the menu (live `elementFromPoint`) | `rgb(251,250,248)` — flat near-white, **C≈0.005** | `rgb(11,10,9)` — near-black |
| `--field-h` on this route | **UNSET** (the warm field script has NOT landed here) | UNSET |
| Menu fill (live) | `oklab(0.936 0.0056 0.0133 / 0.808)` | `oklab(0.379 0.0099 0.0169 / 0.894)` |
| `--glass-tint-strength` (resolved) | `clamp(4%, …)` → **4% floor** (calm backdrop) | `clamp(12%,…)`→12% |
| **COMPOSITED menu over the real page** | rgb `[243,236,229]` · **L 0.946 · C 0.0122** | rgb `[68,58,51]` · **L 0.357 · C 0.018** |
| Highlighted item (composited) | L 0.93 · **C 0.0132**, ΔL vs surface only **0.016** | C ~0.018 |
| Reveal: scale | `0.88 → 1` on `--spring-snappy` (linear(), +3.2% overshoot) | same |
| Reveal: blur-settle | `4px → 0` (`filter`, compositor-safe) | same |
| Reveal: duration / origin | `0.4s` / origin `0px 382px` = anchored at the trigger edge ✔ | same |
| Item entrance | **NONE** — all rows materialize as one rigid slab with the panel | — |

**VERDICT (born-RED, both honest):**
- **§2 MENU = near-gray.** LIGHT composited **C 0.0122 < the 0.02 warm-floor** — the exact `.glass-capsule`
  defect (tabs measured 0.0128). The menu is warm-*leaning* (b>0) but too weak to READ as warm glass. **Two
  root causes confirmed LIVE, both as the brief predicts:** (#1) the flat near-white page (C≈0.005) gives the
  glass almost nothing warm to transmit — `--field-h` is unset on this route, no colorful field; (#2) the
  `--glass-tint-strength` calm FLOOR is only **4%** — even pointed at the warm-ink it barely tints. DARK reads
  C 0.018 — better (the deep page lets the 12% lift register) but still sub-0.02.
- **§3 item HIGHLIGHT = invisible.** Composited ΔL surface→highlight is **0.016**, ΔC **0.001** — the active row
  is nearly indistinguishable from the plate. There is no warm accent; the `-1px` lift is the only real signal.
- **§1 OPEN animation = wired but FLAT, not "smooth & refined", not cartoon.** The `.glass-reveal` bloom EXISTS
  (origin-anchored scale 0.88→1 + blur-settle on a snappy spring) — that is the *refined floor* and it is
  correct. What it LACKS, against the user's "smoother and refined" + this lens's PUNCH mandate: (a) **no
  overlapping action** — every row arrives rigid with the slab (the single biggest "stiff" tell); (b) **no
  anticipation** — the trigger does nothing before the panel blooms; (c) it rides `snappy` (+3.2%), the most
  neutral spring, where a picker WELLING open wants the weightier gooey carry.

Artefacts: `brainstorm/artefacts/select-open-light.png`, `select-open-dark.png`,
`composite.mjs` / `comp_dark.mjs` (the honest composite math + the live backdrop pixels).

---

## 1. THE CORE IDEA — the menu is a **warm liquid that WELLS up from the trigger lip and POURS its rows down**

One gestalt unifies the surface fix and the motion fix: the menu is not a *plate that appears* — it is a
**warm liquid that wells out of the trigger's mouth**. That single metaphor dictates everything:

1. **The surface** must read as warm *fluid* glass (the §2/§3 NO-GRAY fix) — a real warm FLOOR baked into the
   floating tier, so the menu is cream even over a flat page, AND the route feeds it a colorful field to transmit.
2. **The open** is the liquid *welling*: the panel blooms from the trigger lip (anchor-origin, already correct),
   the trigger gives a tiny **anticipation dip** (squash before the pour), and the rows **POUR in with overlapping
   action** — a staggered cascade down the list, each row arriving a beat after the one above on an arc, so the
   eye reads the menu *filling* like liquid, not *flashing* like a slab. The active row lands last with a warm
   accent SPLASH. That is the 1940s-technicolor FLOW & PUNCH, expressed in the idiom that already ships.

**Everything composes the EXTANT seams.** No new reveal engine, no menu-row fork, no parallel glass tier. The
welling is a re-parameterization of `.glass-reveal`; the pour is ONE new `@property`-driven stagger channel on
`.glass-menu-row`; the warm surface is the `.glass-capsule` warm-floor pattern lifted onto `.glass-floating`.

---

## 2. THE WARM SURFACE — the NO-GRAY fix (§2/§3 root causes #1 + #2)

### 2a. Root cause #2 (the dormant floor) — a REAL warm-admit FLOOR on `.glass-floating`, the `.glass-capsule` precedent

The tabs amendment already proved the fix: `.glass-capsule` got a **warm-admit floor** so the selected indicator
clears C ≥ 0.02 regardless of backdrop. The Select menu IS `.glass-floating` (`glass/ladder.css:212`), whose
`--glass-tint-strength` floors at `--glass-tint-strength-floor: 4%` over a calm backdrop. **Raise the floating-tier
floor's warm ADMITTANCE, not by re-tinting (the brief forbids a re-tint) but by lifting the floor token toward a
chroma-clearing minimum** — the menu over ANY backdrop composites ≥ 0.02 warm.

The clean mechanism is a `--glass-tint-strength-floor-warm` knob the floating tier reads INSTEAD of the bare 4%
floor, sized so `color-mix(in oklab, <floating bg>, --glass-tint-ink, floor)` clears C 0.02 at the worst case (the
flat near-white). Live math: the menu fill at 4% reads C 0.0122; the warm-ink source (`hsl(24 10% 10%)` light /
`hsl(30 14% 90%)` dark) carries the warm axis, so lifting the floor to **~8–9%** roughly doubles the admitted
warm content → composited C clears 0.02 BOTH modes (DARK already at 0.018 needs only a nudge). This is a
**FLOOR token edit on the existing `:where(.glass-floating,.glass-overlay)` seam** (`ladder.css:224`), NOT a new
declaration on the menu — so EVERY floating overlay (Dialog/Popover/DropdownMenu/Select) inherits the warm floor
in ONE edit (DRY). The continuous `--glass-backdrop-luma` darken-on-bright clamp is UNTOUCHED above the floor.

> **Why not just bump `--glass-tint-strength-floor` globally?** Because the content tiers (`.glass-card` et al.)
> share that token and a global bump would over-warm a calm CARD on a light page. The floating/overlay band is
> the band that "floats over an UNKNOWN surface" (the seam's own words) — it is exactly the band that must
> self-warm. So the warm floor is the floating-band-scoped knob, leaving the content-tier floor at its calm 4%.

### 2b. Root cause #1 (no field behind) — CONSUME the route field, do not assert it

The flat-page condition is the other half. The Select route paints `rgb(251,250,248)` flat — `--field-h` is UNSET.
The page-background greenfield ships `warmFieldHue(category)` → one `--field-h` per route → an `<Aurora field>`
behind the page. The Select **DEFT fix is to CONSUME it**: the forms-select story declares its `--field-h` (a warm
forms hue ∈ [25,95]) so the page paints a colorful warm field, and the menu's backdrop-filter then transmits a
REAL warm backdrop — the composited menu warms further, free, with no menu-side code. **This is a DEPEND on
`BD.W-FIELD-SCRIPT`, not a menu fork.** The warm FLOOR (2a) is the guarantee that holds even if a consumer paints
a flat page; the field (2b) is the amplifier that makes it sing. Both, per the brief: the floor is the REAL decl,
the field is the consume — neither is a prose assertion.

### 2c. The audacious PAPER + CARTOON-SHADOW chrome (the lens punch on the surface)

The menu is glass, but the lens wants 1940s-technicolor weight. Two idiomatic adds, both extant:
- **Cartoon under-shadow.** The menu drops the layered-offset `--shadow-cartoon-lg` (cards.css:191 precedent) UNDER
  its existing soft elevation shadow — a bold 2nd offset shadow so the panel reads as a physical card lifted off
  the page (both modes: the dark-arm ships `--shadow-cartoon-color` white-on-dark). This is the "bold layered-offset
  shadowing" mandate, one token, no new shadow.
- **Paper grain** at sub-perceptual strength on the menu fill (the paper-morphism `--paper-grain` overlay, default
  near-off) so the warm cream has TOOTH, not a dead flat fill — the "PAPER morphism visible" binding law, composed
  not re-authored.

---

## 3. THE OPEN — the WELLING + the POUR (§1, the FLOW & PUNCH)

The reveal is THREE coupled beats on the ONE clock, an elevation of `.glass-reveal`'s SPATIAL/EFFECTS split toward
the cartoon register — anticipation → bloom → overlapping pour → accent splash.

### 3a. ANTICIPATION (the squash before the pour) — on the TRIGGER, one beat, ~60ms

Before the panel blooms, the trigger gives a **tiny squash-dip** (`scale: 1 .94` for ~60ms then release) — the
liquid gathering before it pours. This is the `--glass-btn-press-t` / `tap-squish` register the trigger ALREADY
carries on press (SelectTrigger composes `tap-squish`); the anticipation is the press-squish reading as the
wind-up. PRM-gated to nothing. It costs zero new tokens — the press squish IS the anticipation when it precedes
an open. (Refinement only: ensure the squish settles INTO the open rather than fighting it — sequence on the
`press` spring, then hand off to the reveal clock.)

### 3b. THE BLOOM (the well) — re-tune `.glass-reveal` toward the WEIGHTIER gooey carry

The bloom EXISTS and is anchored correctly (origin at the trigger lip — the menu wells FROM its mouth, verified
`transform-origin: 0px 382px`). The refinement the user asked for ("smoother, refined") + the lens (PUNCH):
- **Keep the origin-anchored scale 0.88→1 + blur-settle** (correct, idiomatic, compositor-safe). This is the
  refined floor — do NOT break it.
- **Move the menu's reveal off the neutral `snappy` onto a WEIGHTIER carry for the OPEN** via a menu-scoped
  `--glass-reveal-*` clock override that reads the booked **`--ease-cartoon-punch`** (the raw `linear()` with a
  bolder overshoot than snappy's +3.2%) — so the panel WELLS with a gooey settle, not a crisp snap. The exit stays
  the no-overshoot `--ease-out` (a closing surface must never overshoot past gone — the §6 doctrine, untouched).
- **Deepen the squish START** from 0.88 → ~0.84 on the menu scope ONLY (a bolder grow-from-small = more PUNCH),
  bounded so the overshoot peak stays ≤ the ≤10% "touch of overshoot" band (the BD.W-ANIM-IOS27-TUNE invariant —
  the cartoon-punch curve must stay within the un-pointed band; this is a known fence, respected).

### 3c. THE POUR (overlapping action — the single boldest, most ALIVE move)

**This is the move that converts a stiff slab-flash into a liquid pour.** The rows do not arrive with the panel —
they **CASCADE in, top-to-bottom, each a beat after the one above**, on an arc (a hair of `translate-y` + opacity +
a micro scale-pop), so the menu reads as liquid POURING down the list and SETTLING. The active/selected row lands
LAST with the warm-accent splash (the highlight bg + the dot pop).

Mechanism — DEFT, one channel, no per-row JS:
- ONE new `@property --menu-pour-t` registered on the menu (a 0→1 scalar the reveal clock drives, the
  `--progress`/`--glass-accent` registered-precedent — NOT a CSS transition list, the imperative-vs-interpolated
  discipline the tabs amendment fenced).
- Each `.glass-menu-row` reads its OWN stagger delay from its index via the CSS `--menu-row-index` the viewport
  sets (or a pure-CSS `nth-child`-derived `--i` for the zero-JS floor), and maps `--menu-pour-t` through a per-row
  windowed ease so row N begins its arc when the pour front reaches it: `clamp(0, (pour-t - i*step)/window, 1)`.
  The row's `opacity` + `translate-y` (the arc) + a `scale: calc(1 + .03*(1-rowProgress))` settle ride that mapped
  scalar. **No transition, no per-row timer** — one driven scalar, N windowed reads. PRM → the whole pour collapses
  to the opacity-only fade (the `.glass-reveal` PRM precedent: spatial snaps, opacity survives).
- The stagger `step` is φ-proportioned to the row count so the cascade reads as ONE flowing event (~total ≤ the
  reveal clock), never a slow drip (the liquid-weight-universal "morph, don't drip" reading).

> **Cross-link, no re-mint:** the per-glyph scale-pop + accent-flood the tabs amendment ships (`--tab-flood-t`,
> the glyph-pop register) is the SAME family as this row-pour + accent-splash. The Select pour CONSUMES the booked
> `--ease-cartoon-punch` + `--motion-weight` and the registered-scalar discipline; it does not fork a parallel
> stagger engine. If a shared `useStaggerReveal` projection is warranted it is factored ONCE for menu + tabs +
> dock-tab, not authored per-component.

### 3d. THE ARC + FOLLOW-THROUGH

The pour rides an ARC, not a straight slide: each row's `translate-y` eases in with a tiny **over-travel then
settle** (follow-through — the row drops a hair past home and rebounds, the liquid sloshing to rest), bounded to
the ≤10% overshoot band. The chevron on the trigger, already rotating 180° on open, rides the SAME weighty clock so
the trigger and the pour read as ONE coordinated event (overlapping action between trigger and panel).

---

## 4. THE ITEM HIGHLIGHT — the warm accent SPLASH (§3)

The live highlight (C 0.0132, ΔL 0.016) is invisible. The fix composes `.glass-menu-row`'s EXISTING `--menu-row-bg`
+ `--menu-row-lift` (no fork) with three lens adds:
- **A REAL warm accent**, not a grey lift. Re-point `--menu-row-bg` to admit the **`--glass-accent`** warm hue (the
  cards/buttons rim accent, already a registered `@property` defaulting to `transparent` = no-op at rest) at a
  perceptible strength on highlight, so the active row clears a clear ΔC/ΔL against the plate (target ΔL ≥ 0.05,
  ΔC ≥ 0.02 — a warm accent that READS, both modes). This is the menu joining the SAME warm-accent register cards
  and tabs read — DRY.
- **The lift becomes a tiny squash-pop** on entry (the active row lands with `scale: 1.02` settling to 1 on the
  `press` spring) — the splash the pour ends on. The `-1px` translate stays (the existing lift).
- **The dot** (SelectItemIndicator) gets a micro scale-pop as it paints (the selected-state PUNCH), on the same
  `press` clock — the decorative confirm of the choice.

All on `.glass-menu-row` / `menuItemVariants` — ONE recipe, all 13 menu/picker SFCs inherit it (the menu.css canon),
no Select-local fork.

---

## 5. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **Glass surface:** `backdrop-filter: blur() saturate()` is the extant floating tier — works both engines; the
  warm FLOOR is a `color-mix(in oklab,…)` fill on the surface's OWN pixels (no engine-specific path). NO
  `backdrop-filter: url()` anywhere (the meatballing fence is irrelevant here — the menu has no goo filter; if a
  future accent-flood wants additive blend it uses `mix-blend-mode: plus-lighter in srgb` under `@supports`, the
  tabs precedent).
- **Reveal:** `scale`/`translate`/`filter`/`opacity` longhands — all compositor-safe, both engines. `linear()`
  timing functions are Safari 17.4+; the floor is the bezier `--ease-out` for older engines (the existing
  `.glass-reveal` already degrades this way). `@property --menu-pour-t` / `--menu-row-index`: Safari 16.4+; the
  `nth-child`-derived `--i` zero-JS floor covers the registration-absent case, and absent BOTH the menu simply
  reveals as the un-staggered slab (graceful — today's behavior, never broken).
- **a11y:** reka owns the roving focus / `aria-activedescendant` / `role=listbox`/`option` / `aria-selected` —
  UNTOUCHED. The pour is purely visual (decorative); the dot stays `aria-hidden` (the AN.W4 discipline). Keyboard
  open (Enter/Space/↓) reaches the SAME reveal (data-state driven, not click-bound).
- **PRM:** the anticipation squish → none, the pour spatial channels → none (opacity-only fade survives, the row
  still materializes), the highlight splash → the flat warm bg cross-fade (no scale, no lift). The warm SURFACE is
  unaffected (color is not motion). One `@media (prefers-reduced-motion: reduce)` carve, the existing precedent.

---

## 6. DEFT INTEGRATION LEDGER (union, not bolt-on — what is REUSED vs NEW)

| Concern | Mechanism | Status |
|---|---|---|
| Menu warm surface (§2 #2) | warm-admit FLOOR token on `:where(.glass-floating,.glass-overlay)` (`ladder.css:224`) | **AUGMENT** the `.glass-capsule` warm-floor pattern onto the floating band |
| Colorful field behind (§2 #1) | route declares `--field-h` (warm forms hue) → `<Aurora field>` transmitted | **DEPEND** `BD.W-FIELD-SCRIPT` (consume, no fork) |
| Open bloom | origin-anchored scale+blur-settle | **KEEP** `.glass-reveal` (refined floor, correct) |
| Open WEIGHT + bolder squish | menu-scoped `--glass-reveal-enter-scale` ~0.84 + `--ease-cartoon-punch` clock | **RE-TUNE** (menu scope only); **DEPEND** `BD.W-CARTOON-PUNCH` |
| Anticipation | trigger press-squish as wind-up | **REUSE** `tap-squish` / `press` spring |
| The POUR (overlapping action) | ONE `@property --menu-pour-t` driven, N windowed per-row reads on `.glass-menu-row` | **NEW** (the boldest move; one channel, zero per-row JS); **DEPEND** `--motion-weight` |
| Item highlight accent | `--menu-row-bg` admits `--glass-accent` warm hue + press-pop | **AUGMENT** `.glass-menu-row` (no fork) |
| Cartoon shadow + paper grain | `--shadow-cartoon-lg` + sub-perceptual `--paper-grain` | **COMPOSE** extant tokens |

**No new glass tier. No menu-row fork. No second reveal engine.** The whole design is re-parameterizations + one
driven scalar + two depends on already-booked tokens.

---

## 7. DELTA-ASSAY → the wave-amendment (reconcile vs the 116-wave set; no dup)

The gestalt is **fully covered by AUGMENTING extant waves + DEPENDING booked tokens** — NO new standalone wave:

- **AUGMENT `BA.W-MENU-GLASS`** (the menu register) — add the highlight warm-accent (`--glass-accent` admit) + the
  pour channel hooks on `.glass-menu-row`. Add a born-RED arm: highlight ΔC/ΔL vs the plate clears the threshold.
- **AUGMENT the floating-tier warm-floor** — this is the SAME warm-floor RE-INVENT the tabs `BD.W-TAB-IOS-CAPSULE`
  amendment ships for `.glass-capsule`; the Select menu is the floating-band sibling. CROSS-LINK to the tabs C6
  arm (the capsule meanChroma ≥ 0.02 born-RED) and add the twin: **menu meanChroma ≥ 0.02 over a LIVE flat page,
  both modes** — born-RED on HEAD (LIGHT C 0.0122, the honest composite).
- **AUGMENT `BB.W-LIQUID-REVEAL` / the overlay reveal** — the menu-scoped weightier clock + bolder squish + the
  pour stagger. The reveal RECIPE is kept; the menu re-parameterizes it. Born-RED: no per-row stagger channel
  exists (the slab-flash, live-confirmed).
- **DEPEND (no edit, consume booked):** `BD.W-CARTOON-PUNCH` (`--ease-cartoon-punch`), `BD.W-MOTION-WEIGHT`
  (`--motion-weight`), `BD.W-FIELD-SCRIPT` (`--field-h` per route).
- **RECONCILE vs `BC.W-OVERLAY-UNIFORM`** (the shared surface axis the Select content already composes) — the warm
  floor lands on the shared floating band the overlay-uniform wave governs; no competing surface decl. **PRUNE:
  none.**

**The chroma GATE RULE (binding):** the menu meanChroma arm MUST read the ACTUAL painted menu over the ACTUAL
painted page (the screenshot/composite-of-live-backdrop method this brainstorm used — composite the live menu rgba
over the live `elementFromPoint` backdrop pixel), NOT `getComputedStyle` over a hardcoded field. A born-RED that
reports the HONEST gray over the real flat page (LIGHT C 0.0122) is CORRECT — that is exactly what this pass found,
and the warm-floor fix is what clears it.

---

## 8. THE SINGLE BOLDEST MOVE

**The POUR.** The menu does not appear as a slab — its rows **cascade in top-to-bottom with overlapping action, on
an arc with a follow-through sloosh, the active row landing last with a warm-accent splash** — driven by ONE
registered `--menu-pour-t` scalar windowed per row (zero per-row JS, PRM-collapses to a clean fade), so the menu
reads as warm liquid POURING out of the trigger's mouth and settling. It is the literal 1940s-technicolor FLOW &
PUNCH — anticipation, overlapping action, arcs, follow-through — expressed entirely in the idiom that already ships.
