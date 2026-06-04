# AT.W0b · Lens B3 — FRONTEND-DESIGN: the dock animation + slide system

A senior motion-design read of glass-ui's dock motion at HEAD (3.2.0, post-AS),
benchmarked against 2025-2026 SOTA, building **on** the existing AT plan and the
AQ.W6 §Design 7 dock-VT disposition rather than re-deriving it. The lens this
file owns: `useLayerTransition` (the FLIP + the View-Transitions fork),
`useDockState` (the collapse/expand state machine that *drives* the slide), the
width/height axis-aware morph, the spring feel (`@mkbabb/keyframes.js` `linear()`
springs), and whether the dock should adopt the AS `startViewTransition`/
`useViewTransition` substrate.

**The headline up front:** the dock has *already* adopted the View-Transitions
substrate (AQ.W6 §Design 7 — `useLayerTransition.ts:121-133` forks on
`startViewTransition`, importing it from `composables/motion/useViewTransition`).
That work is sound and not in question. What this lens surfaces is a set of
**residual motion-fidelity gaps the AQ.W6 fork left** — chief among them a
**spring-curve divergence between the two motion paths** that means the dock's
"feel" is *not the same* whether the browser runs the native VT path or the JS
FLIP fallback — plus a small clutch of micro-interaction and slide-system
refinements that meet the ≥2-distinct-context bar. None of this is in the current
AT plan (AT is a blob-primitives + AS-residual-fold tranche; the dock appears
only as the W6 "binding-verification guard" and the W7 "overflow-collapse," both
of which are *non-motion* asks). **B3 proposes a focused AT dock-motion wave —
provisionally `AT.W4.5` (dock-motion) — sequenced ∥ the blob waves, file-disjoint
from them.** Detailed proposals in §6; wave spec in §7.

---

## §0 — Method + scope

Read in full: `GlassDock.vue`, `DockLayerGroup.vue`, `DockLayer.vue` (via the
group), `DockTabButton.vue`, `useDockState.ts`, `useLayerTransition.ts`,
`dockContext.ts`, `isTeleportedTarget.ts`, `dock.css` (1154 lines),
`useViewTransition.ts` (the AS substrate), `view-transition.css`, `tokens.css`
§2 (the spring fleet) + §10 (dock geometry), the dock `__tests__/`, and the
AQ.W6 §Design 7 disposition (`AQ/design/W1.3-motion-anchor.md:549-605`).

SOTA: WebSearch (June 2026), cited inline + collected in §8. Where a finding is
knowledge-only (cutoff Jan 2026) I mark it **[K]**; web-confirmed is **[W]**.

The dock-group chassis (`src/components/custom/dock-group/`) is a static
flex-strip wrapper with **no motion of its own** (it composes child docks); I
confirmed it carries no transition/FLIP/VT logic, so it is out of this lens's
motion scope beyond noting its motion is wholly inherited from its child
`<GlassDock>`s.

---

## §1 — The current motion architecture, mapped

Three distinct motion subsystems compose the dock. Naming them precisely matters
because the AT plan and the AQ history blur "slide," "FLIP," and "morph."

### 1.1 — The **collapse/expand slide** (the macOS-dock-analog)

`useDockState.ts` is a **3-state machine** (`collapsed | hover | pinned`,
`:20`) driving a ref-counted hold system (`keepOpenCount`, `:92`). The *visual*
slide is the collapsed→expanded **width** change of a horizontal dock — the
"summary pill blooms into the full control row" motion. This is glass-ui's
closest analog to the macOS-dock reveal.

The width is **not** animated by `useDockState` — it is animated by
`useLayerTransition` driving the inner `.dock-layers` grid (`GlassDock.vue:186-194`,
`dock.css:380-384`). `useDockState` only flips the `expanded` boolean; the CSS
class swap (`.collapsed` ↔ `.expanded`, `GlassDock.vue:323`) + the
`useLayerTransition` FLIP-or-VT do the rest. The dock root itself transitions
only *padding / box-shadow / transform / background / border* (`dock.css:185-192`)
— width is deliberately **off** the root transition list because `width: auto`
does not interpolate (the R1+R6 "binary jerk" the comment at `dock.css:180-184`
documents). This is a correct, hard-won architecture.

### 1.2 — The **layer-pane crossfade + size morph** (the Figma-switcher analog)

`<DockLayerGroup>` + `<DockLayer>` stack panes on a 1/1 CSS grid
(`dock.css:664-707`) and crossfade opacity + morph the stack's `width`/`height`
between panes. Same `useLayerTransition` primitive, same fork. The crossfade is a
`visibility`-gated opacity transition (`dock.css:413-446`) with a clever
hit-test contract (`visibility:hidden` removes the inactive pane from
`elementFromPoint` while keeping it in flow for FLIP measurement). This is
genuinely good engineering.

### 1.3 — The **micro-interactions** (hover/press scale, chevron rotate, held-glow)

Per-control `scale:` transforms on `--dock-motion-fast` (`dock.css:729-734`,
`:743-751`), chevron `rotate: 180deg` on open (`dock.css:1085-1087`), the
`[data-held]` background-tier lift on `--duration-fast` (`dock.css:330-337`), and
the `:has([data-state="open"])` surface response (`dock.css:343-346`). These are
the "feel in the small."

### 1.4 — The shared timing tokens

```
--dock-motion-fast:     var(--duration-fast)   var(--ease-standard)   // cubic-bezier(.4,0,.2,1)
--dock-motion-standard: var(--duration-normal) var(--ease-standard)
--dock-motion-resize:   var(--duration-normal) var(--spring-snappy)   // the linear() spring
```
(`dock.css:21-23`). Only the **resize** token is spring-driven; fast/standard
are the standard material cubic-bezier. The VT path's curve comes from a
*different* token: `--vt-ease: var(--ease-apple-spring)` (`tokens.css:1240`),
which is `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (`tokens.css:176`).

---

## §2 — SOTA benchmark (June 2026)

### 2.1 — Spring physics is the modern default; `linear()` is the native vehicle [W]

The 2025-2026 consensus is unambiguous: **springs over Béziers** for any
size/position morph. Josh Comeau: "Bézier curves are great, but there are
certain things they just can't do, and it's hard to make nice-looking Béziers
but easy to make nice-looking springs." A convincing CSS spring needs "40+ data
points" via `linear()`
([joshwcomeau.com](https://www.joshwcomeau.com/animation/linear-timing-function/)).
`linear()` browser support reached ~88% by Oct 2025 [W]. glass-ui is **ahead of
the curve here** — it already ships a 4-spring `linear()` fleet
(`--spring-{smooth,snappy,bouncy,gentle}`) generated analytically from
`@mkbabb/keyframes.js` `springLinearStops()` solving the damped-harmonic
oscillator (`tokens.css:133-161`), with iOS-canonical (response, ζ) pairs. This
is best-in-class token infrastructure. **The gap is not the springs — it's that
the dock's VT path doesn't use them** (§3).

### 2.2 — View-Transitions are the native morph substrate, and the dock is on it [W]

The View Transitions API morphs an element between DOM states by tracking
position/size/etc. and animating old→new
([MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)).
2026 best practice applies modern easing — including cubic-bezier or
`linear()` springs — to `::view-transition-group()`
([weskill.org 2026](https://blog.weskill.org/2026/04/view-transitions-api-building-native.html)).
glass-ui's dock is **correctly** on this substrate (AQ.W6). The dock is therefore
*already* "View-Transitions-ready" — that box is checked. The question this lens
must answer is the *quality* of the morph, not its existence.

### 2.3 — Interruptibility + velocity-preservation is the spring advantage [W]

The defining property of physics-based motion is **interruptibility**: "a spring
animation uses the velocity it had when it was re-targeted, making the movement
feel smooth and natural"
([animations.dev](https://animations.dev/learn/animation-theory/spring-animations);
[motion.dev](https://motion.dev/docs/react-transitions)). React-spring/Motion
take "the element's current inertia into account when interrupted, unlike CSS
transitions." **This is the dimension where the dock is weakest** (§4): both the
CSS-transition FLIP and the native VT swap are *non-interruptible* — a mid-flight
expand→collapse re-target snaps to a fresh curve with zero inherited velocity.

### 2.4 — The macOS dock is a magnification + slide system; web reimpls are spring-driven [W]

The canonical macOS dock combines **magnification** (icons enlarge under the
pointer — a per-icon distance-falloff scale) with **slide** (icons part to make
room). 2025 web reimplementations (e.g. the Motion-based
[joeylene.com/labs/2025/mac-dock-animation](https://joeylene.com/labs/2025/mac-dock-animation))
do the magnification with springs and a neighbor-influence falloff. glass-ui's
dock does a **uniform hover scale** (`--scale-hover-dock: 1.1`, every control the
same, `dock.css:746`) — it deliberately is *not* a magnification dock, and that
is a legitimate design choice (a control dock, not a launcher). I do **not**
propose adding macOS magnification — it would be overfit substrate with no
consumer (KILL, per the no-overfitting precept). I note it only to bound the
comparison: the dock's "slide" is a *reveal* slide (collapse/expand), not a
*magnification* slide, and should be judged as such.

### 2.5 — Gesture-driven slide [W]

SOTA mobile slide systems (vaul, Motion drag) bind the slide to pointer position
during a drag, then **hand off velocity to a spring on release**
([motion.dev](https://motion.dev/docs/react-transitions): "well adapted to
transition from a swipe or drag to an animation after release"). glass-ui's dock
has a `useTouchGate` (`GlassDock.vue:268-300`) that gates touch-scroll vs
touch-expand, but the expand itself is a **discrete** state flip, not a
position-tracked drag. The Slider keep-dock-open contract *is* pointer-anchored
(it holds the dock open for a drag's duration). A position-tracked dock-reveal
drag is **not** warranted (no consumer; the touch-gate's discrete expand is the
right ergonomic for a control dock — confirmed against the CLAUDE.md slider
contract rationale). **No proposal here** beyond noting it as a considered-and-
rejected option.

---

## §3 — FINDING 1 (HEADLINE): the two motion paths feel different — spring-curve divergence

This is the central design defect and the strongest AT candidate.

The AQ.W6 design doc states the intent precisely
(`AQ/design/W1.3-motion-anchor.md:580-581`):

> "The `--dock-motion-resize` spring (the FLIP-era token) maps to `--vt-ease` on
> the native path via the §3 group recipe."

But the **implementation that landed does not honor that mapping**:

- The JS-FLIP fallback animates `width`/`height` with `--dock-motion-resize`
  = `var(--duration-normal) var(--spring-snappy)` (`dock.css:22`, `:383`,
  `:668-669`). `--spring-snappy` is the **real iOS-canonical `linear()` spring**
  — (response 0.35s, ζ=0.85), 48 analytic stops, +6.8% overshoot peaking at the
  16% slot (`tokens.css:159`, comment `:146`).

- The native VT path animates `::view-transition-group(.gl-dock-layer)` with
  `animation-timing-function: var(--vt-ease, ...)` (`view-transition.css:55`),
  and `--vt-ease: var(--ease-apple-spring)` (`tokens.css:1240`) = the
  **cubic-bezier** `(0.175, 0.885, 0.32, 1.275)` (`tokens.css:176`).

These are **two different curves**:

| Path | Curve | Overshoot | Stops |
|---|---|---|---|
| JS FLIP fallback | `--spring-snappy` `linear()` | +6.8% (16% slot), settles by ~44% | 48 analytic |
| Native VT | `--ease-apple-spring` cubic-bezier | ~+27.5% terminal control point (`y2=1.275`) | 4 control pts |

The cubic-bezier's `(.32, 1.275)` final control point overshoots **far harder
and later** than the `linear()` spring's micro-overshoot, and a cubic-bezier
*cannot* reproduce a damped-oscillator settle (the recoil-and-resettle the
`linear()` stops encode). So a user on a VT-supporting engine (every Chromium +
Safari ≥18, the supermajority) gets a *bouncier, looser* dock morph than the
spec'd snappy spring; a user on the FLIP fallback (Firefox, older Safari) gets
the *crisp* spring. **The dock's identity motion is engine-dependent.** [K] —
this is a code-vs-comment divergence I confirmed at file:line; the perceptual
characterization is design judgment.

This is the *exact* class of defect AT exists to fold (the W6 "quiet-wrong
paths"): the mapping the design intended silently did not land, and no gate
catches it because both paths "work" — they just feel different.

**The fix is a one-line token re-point plus a gate.** The `linear()` spring is a
valid `animation-timing-function` value (it is a `<easing-function>`), so:

```css
/* tokens.css — point the VT ease at the SAME spring the FLIP path uses */
--vt-ease: var(--dock-motion-resize-ease, var(--spring-snappy));
```

(or, more precisely, expose `--dock-resize-spring: var(--spring-snappy)` as the
single shared curve token both `--dock-motion-resize` and `--vt-ease` consume, so
"the dock's resize feel" is one value with one home). Then both paths run the
**same damped-oscillator curve** and the dock feels identical on every engine.
SOTA explicitly supports `linear()` in `::view-transition-group` [W]
([weskill.org 2026](https://blog.weskill.org/2026/04/view-transitions-api-building-native.html)).

> **Nuance worth stating:** `--ease-apple-spring` (the cubic-bezier) is used
> *widely* across glass-ui as the general "apple bounce" — it is not wrong as a
> token, it is wrong *here* as the dock-resize curve. The fix is dock-local: a
> dedicated `--dock-resize-spring` shared between the FLIP and VT recipes, NOT a
> global re-point of `--vt-ease` (which the J.W5 verdict re-rank and other VT
> consumers also read; changing it globally would be a cross-consumer blast). The
> `::view-transition-group(.gl-dock-layer)` recipe gets its OWN
> `animation-timing-function: var(--dock-resize-spring)`, overriding the generic
> `.gl-list-item` group's `--vt-ease`. Clean, surgical, file-disjoint.

---

## §4 — FINDING 2: neither path is interruptible — the re-target snap

SOTA's defining spring property is velocity-preserving interruption (§2.3). The
dock has **none** on either path:

- **FLIP fallback:** `useLayerTransition.ts:105-186` `watch(activeLayer)` cancels
  the prior transition (`++transitionId`, `clearCleanup`) and starts a *fresh*
  pin→measure→animate from the current rendered size — but the CSS `width`
  transition that drives it restarts its `--spring-snappy` curve **from t=0 with
  zero velocity**. A mid-expand collapse therefore decelerates-then-reverses
  rather than carrying the expand's momentum into the collapse. The
  `transitionId` guard prevents *races/leaks* (good) but does not preserve
  *velocity* (the SOTA bar).

- **Native VT:** worse. A rapid re-trigger **skips** the in-flight transition —
  `useViewTransition.ts:92-95` explicitly swallows the `ready` rejection
  ("Transition was skipped") to avoid an unhandled `pageerror`. So a fast
  expand→collapse on the VT path doesn't reverse-with-velocity; it **hard-cuts**
  the first morph and starts the second from the post-skip DOM state. This is the
  documented View-Transitions limitation: the API is **not interruptible** — a
  second `startViewTransition` aborts the first
  ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)) [W].

**Design read:** for the dock's *primary* motion (a deliberate hover-then-settle
reveal with a 2000ms collapse delay, `GlassDock.vue:92`), interruption is rare —
the user hovers, the dock blooms, they use it, it collapses. Mid-flight reversal
is an **edge case**, not the hot path. So this is a *real* gap vs SOTA but a
*low-severity* one for this component. **I do NOT propose a JS spring re-target
engine for the dock** — that would be over-engineering for an edge case and would
re-introduce the `ResizeObserver`/rAF machinery AQ.W6 deliberately retired
(no-legacy / gestalt precepts). 

What I *do* propose (cheap, high-value): **honor `prefers-reduced-motion` velocity
expectations and the skip path gracefully.** The current PRM behavior is sound
(`view-transition.css:27-33` zeroes VT animation; the FLIP's `width` is stripped
by the global PRM gate). The one concrete refinement: the FLIP fallback's
re-target currently does a `transition: none` unpin/measure/re-pin reflow
(`useLayerTransition.ts:155-164`) on **every** swap even when interrupting — this
forces a synchronous layout mid-animation (a jank source). A `will-change` hint
on `.dock-layers`/`.dock-layer-stack` during an active transition (added on swap,
removed on `transitionend`) would let the compositor keep the layer promoted.
**Booked as a W4.5 sub-item, not a headline** — it is a polish, not a defect.

---

## §5 — FINDING 3 (cluster): micro-interaction + slide-system polish (each ≥2-context-checked)

A swept read surfaced these. Each is checked against the ≥2-distinct-consumer-
context bar; I mark BOOK (carry) vs PROPOSE (fold into W4.5) vs KILL (reject).

### 5.1 — PROPOSE — the hover-scale curve is `--dock-motion-fast` (cubic-bezier), not a spring

`.dock-icon-button:hover { scale: var(--scale-hover-dock) }` transitions `scale`
on `--dock-motion-fast` = `--ease-standard` (`dock.css:729-734`). The press
(`:active { scale: 0.92 }`) likewise. SOTA micro-interactions on macOS-class
docks are spring-driven [W] — the scale should *settle with a micro-overshoot*,
not a Bézier ease. The library **already ships** the exact curve:
`--spring-snappy` (the snappy micro-overshoot is precisely the "tactile button"
feel). A `--dock-motion-press: var(--duration-fast) var(--spring-snappy)` on the
`scale` transition (only) of the icon/tab/trigger controls would give the dock
the same physical-button feel the rest of the iOS-canonical fleet promises.
**Contexts:** every dock control (icon/tab/select/dropdown) across every dock
consumer (speedtest cockpit, bbnf-buddy tools layer, the demo stories) — far more
than 2. **This is the highest-ROI feel upgrade: one token, the curve already
exists, every dock control benefits.** PROPOSE → W4.5.

### 5.2 — PROPOSE — the chevron rotate is also non-spring

`.dock-select-trigger__chevron { transition: rotate --dock-motion-fast }`
(`dock.css:1082`). A 180° flip that *snaps with a hair of overshoot* (the
`--spring-snappy` curve) reads as a physical detent vs the linear-ish Bézier.
Same one-token fix, same contexts. Fold into 5.1's `--dock-motion-press` (rotate
+ scale share the "discrete control feedback" register). PROPOSE → W4.5.

### 5.3 — BOOK — the layer crossfade is `--dock-motion-fast` opacity only; no slide-cross

The pane crossfade (`dock.css:415-418`) is a pure opacity fade. SOTA's
`:only-child` slide trick (a pane present in only one state *slides* rather than
crossfades — `view-transition.css:44-45` already ships `gl-vt-slide-in/out` for
the `.gl-list-item` group) is **not** applied to the dock layer group. A
directional slide (new pane enters from the rail-side, old exits opposite) would
read more spatially than a flat crossfade for a *switcher* (DockLayerGroup is
Figma-switcher-like). BUT: the dock layer panes are **size-morphing** (the stack
animates width/height), and a slide *plus* a size-morph can fight. This needs a
visual proof, not a blind add. **Contexts:** DockLayerGroup consumers are
currently thin (the demo + bbnf-buddy). BOOK until a 2nd firm consumer + a visual
proof — do not overfit.

### 5.4 — KILL — macOS magnification (neighbor-falloff hover scale)

Considered (§2.4); rejected. No consumer; the dock is a control dock, not a
launcher; uniform hover-scale is the correct register. Adding distance-falloff
magnification would be overfit substrate. KILL.

### 5.5 — KILL — position-tracked gesture-drag reveal

Considered (§2.5); rejected. The discrete touch-gate expand is the right
ergonomic for a control dock; no consumer wants a draggable reveal. KILL.

### 5.6 — BOOK — `--dock-collapsed-hover-scale` (1.1) on the collapsed pill

`.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale) }`
(`dock.css:312-317`) is a Bézier scale on the *whole dock pill* at rest. This is
the "the pill invites you" affordance. Spring-curving it (5.1's token) would make
the invite read as a physical lift. Fold candidate into 5.1's sweep IF the sweep
lands — same token, free. Note as part of 5.1's scope, not separate.

### 5.7 — OBSERVE (no action) — the `[data-held]` glow timing is correct as-is

The held-state background lift on `--duration-fast var(--ease-standard)`
(`dock.css:330-337`) is *intentionally* a fast Bézier — it tracks pointer
movement as a "held-cursor cue, not a state change" (the comment is explicit).
Spring overshoot here would read as a glitch. **Leave it.** Noting it so the
W4.5 sweep does NOT blanket-spring it — the spring sweep is *scale/rotate
discrete-feedback only*, never the surface-tier fades.

---

## §6 — Consolidated B3 proposals (augment AT)

| # | Proposal | Severity | Contexts | Disposition |
|---|---|---|---|---|
| **B3-1** | **Spring-fidelity unification.** Mint `--dock-resize-spring: var(--spring-snappy)`; both `--dock-motion-resize` (FLIP) and the `::view-transition-group(.gl-dock-layer)` recipe consume it, so the native VT path and the JS FLIP fallback run the **identical damped-oscillator curve**. Closes the AQ.W6 code-vs-design divergence (`--vt-ease` cubic-bezier ≠ the spec'd `--dock-motion-resize` spring). | **HIGH** (engine-dependent identity motion) | every dock consumer × both engines | **FOLD → W4.5 (headline)** |
| **B3-2** | **Spring micro-feedback.** `--dock-motion-press: var(--duration-fast) var(--spring-snappy)` on the `scale`/`rotate` transitions of icon/tab/select/dropdown controls + chevron + collapsed-pill hover (5.1/5.2/5.6). Discrete-feedback ONLY — never the surface-tier fades (5.7). | MED (feel) | every dock control × every consumer | **FOLD → W4.5** |
| **B3-3** | **FLIP `will-change` promotion** during an active transition on `.dock-layers`/`.dock-layer-stack` (added on swap, cleared on `transitionend`) to stop the mid-animation synchronous-reflow jank (§4). | LOW (polish) | the FLIP fallback path | **FOLD → W4.5 (sub-item)** |
| B3-4 | Directional `:only-child` slide for DockLayerGroup pane swaps (5.3). | LOW | thin (demo + 1) | **BOOK** (2nd consumer + visual proof) |
| B3-5 | macOS magnification (5.4); gesture-drag reveal (5.5). | — | 0 | **KILL** (overfit) |

### Why this is a legitimate AT fold and not scope-creep

- **It is the same defect class AT already folds.** The AT plan's W6 is explicitly
  "the R4/R6 quiet-wrong paths" + "the dock binding-verification guard." B3-1 is a
  quiet-wrong path of exactly that kind: a design intent (`--dock-motion-resize`
  → `--vt-ease`) that silently did not land, with no gate to catch it. It sits
  natively beside the W6 "no silent-no-op regression" charter.
- **The dock binding-verification guard (already in AT.W6) is the natural home
  for the B3-1 gate.** That guard exists to catch dock prop/binding regressions
  the typechecker misses. A `proof:dock-motion-parity` assertion — "the VT-group
  recipe's `animation-timing-function` resolves to the same custom-property as
  `--dock-motion-resize`'s easing" — is a one-grep extension of the same gate.
- **It is file-disjoint from the blob waves** (touches `dock.css`, `tokens.css`,
  `view-transition.css`, dock SFCs — zero overlap with `aurora/`, `goo-blob/`,
  `watercolor-dot/`, `useWebGLCanvas`). It can run ∥ W2-W5 with no merge contention.
- **No legacy, gestalt, no overfitting.** B3-1/2 *re-use* the existing `linear()`
  spring fleet (no new curve invented); B3-3 is additive; B3-4/5 are correctly
  BOOK/KILL'd against the ≥2-context bar.

---

## §7 — Proposed wave spec: `AT.W4.5` — dock motion-fidelity fold

**Phase:** IMPL. **Sequence:** ∥ AT.W2-W5 (file-disjoint from the blob graph);
gated independently. **Position:** between W4 and W5 by number, but runnable any
time after W1 (no dependency on the WebGL substrate).

| Slice | Deliverable | Hard gate |
|---|---|---|
| **W4.5-a (headline)** | **Spring-fidelity unification (B3-1).** Mint `--dock-resize-spring: var(--spring-snappy)` in `tokens.css` §10; `--dock-motion-resize` consumes it; `::view-transition-group(.gl-dock-layer)` in `view-transition.css` gets `animation-timing-function: var(--dock-resize-spring)` (overriding the generic `.gl-list-item` `--vt-ease`). | `proof:dock-motion-parity` — a grep/CSS-assert that the dock VT-group recipe's timing function and `--dock-motion-resize`'s easing resolve to the SAME token; **fails closed** if they diverge again (the AQ.W6 regression class). Visual line-item: VT-path morph and FLIP-path morph captured side-by-side (`baseline/close/` per the π protocol AT adopts in W7) — confirm identical settle. |
| **W4.5-b** | **Spring micro-feedback (B3-2).** `--dock-motion-press: var(--duration-fast) var(--spring-snappy)`; re-point the `scale`/`rotate` transition components of `.dock-icon-button`, `.dock-tab-button`, `.dock-select-trigger`, `.dock-dropdown-trigger`, `.dock-select-trigger__chevron`, `.glass-dock.collapsed:hover` onto it. Surface-tier fades (`[data-held]`, `:has([data-state=open])`) UNCHANGED. | Unit/CSS-assert: the named controls' `scale`/`rotate` transitions use `--dock-motion-press`; the `[data-held]` fade still uses `--duration-fast var(--ease-standard)` (5.7 guard — no blanket-spring). |
| **W4.5-c** | **FLIP `will-change` promotion (B3-3).** Add `will-change: width` (h) / `height` (v) to `.dock-layers`/`.dock-layer-stack` for the active-transition window; clear on `transitionend`. Fallback-path-only (native VT manages its own compositing). | No new reflow in the FLIP path's swap (manual perf line); `will-change` is present during transition + absent at rest (unit). |

**Reduced-motion:** unchanged — all three slices ride the existing PRM gates
(`view-transition.css:27-33` zeroes VT animation; the global PRM rule strips
`width`/`scale` from the FLIP transitions). The spring tokens *only* change the
curve when motion is allowed; PRM still snaps. Stated explicitly so the wave
does not re-litigate PRM.

**Wave-count impact on AT:** AT becomes **10 waves** (W0-W8 + W4.5), or W4.5 folds
into W6 as a "dock-motion" sub-lane if the user prefers to keep the 9-wave shape
(W6 is already "correctness + the dock binding-guard," and B3-1's gate is a W6-
guard extension). **Recommendation: fold into W6 as Lane "dock-motion"** — it
keeps AT's wave count at 9, co-locates B3-1's gate with the dock binding-guard it
extends, and respects the "the AS-residual fold is W6-W7" structure. The W4.5
numbering above is the alternative if the user wants it sequenced as its own wave.

---

## §8 — Sources

- Josh W. Comeau — *Springs and Bounces in Native CSS* (the `linear()` spring
  case; "40+ data points"; "easy to make nice-looking springs") —
  https://www.joshwcomeau.com/animation/linear-timing-function/
- MDN — *View Transition API* (morph mechanics; non-interruptible / skip-on-
  re-trigger) — https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- weskill.org (2026) — *View Transitions API: Building Native-Feeling Web Apps*
  (cubic-bezier + modern easing on `::view-transition-group`) —
  https://blog.weskill.org/2026/04/view-transitions-api-building-native.html
- animations.dev — *Spring animations* (velocity-preserving interruption) —
  https://animations.dev/learn/animation-theory/spring-animations
- Motion — *React transitions* / *Layout Animations* (interruptible springs;
  velocity hand-off from drag) — https://motion.dev/docs/react-transitions ,
  https://motion.dev/docs/react-layout-animations
- joeylene.com (2025) — *Mac's Dock Animation* (Motion/spring web reimpl of the
  macOS dock magnification + slide) — https://joeylene.com/labs/2025/mac-dock-animation

**Internal references (file:line):** `useLayerTransition.ts:56-133` (the VT
fork), `useDockState.ts:20,92` (the state machine + hold), `dock.css:21-23`
(motion tokens), `dock.css:180-192,380-384,664-669` (the FLIP transitions),
`dock.css:729-734,1082-1087,312-317` (micro-interactions), `tokens.css:158-161`
(the `linear()` spring fleet), `tokens.css:176,1239-1240` (`--ease-apple-spring`
+ `--vt-ease`), `view-transition.css:44-59` (the VT group recipes + slide
keyframes), `useViewTransition.ts:80-103` (the substrate + skip-swallow),
`AQ/design/W1.3-motion-anchor.md:549-605` (the AQ.W6 §Design 7 disposition the
fork implemented), `AQ/FINAL.md:35,69-71`.

---

## §9 — One-paragraph verdict

The dock's motion architecture is **strong and already modern**: it sits on the
View-Transitions substrate (AQ.W6), ships a best-in-class analytic `linear()`
spring fleet, and has a correct FLIP fallback with a sound hit-test contract. It
is **View-Transitions-ready (done), partially spring-based (the FLIP resize only),
and not interruptible (an acceptable edge-case gap for a control dock).** The one
real *defect* is that the AQ.W6 fork left the native VT path on a **cubic-bezier
`--ease-apple-spring`** while the FLIP path runs the **`--spring-snappy`
`linear()` spring** — so the dock's identity morph **feels different on different
engines**, contradicting the design doc's own stated mapping. AT should fold a
**dock motion-fidelity slice** (B3-1 spring unification + its parity gate, B3-2
spring micro-feedback, B3-3 FLIP `will-change`) — re-using the spring fleet the
library already owns, file-disjoint from the blob headline, ideally as a
**W6 "dock-motion" lane** co-located with the dock binding-verification guard the
gate extends. No JS re-target engine, no macOS magnification, no gesture-drag —
those are correctly KILL/BOOK against the no-overfitting bar.
