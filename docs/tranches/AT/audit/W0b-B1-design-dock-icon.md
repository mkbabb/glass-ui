# AT.W0b — B1 (FRONTEND-DESIGN): the GlassDock pill + the DockIconButton icon system

**Lens:** B1 — senior frontend/interaction design of the dock chassis + the icon affordance.
**Scope:** `GlassDock.vue` (pill chassis, expand/collapse, density, variants, overflow),
`DockIconButton.vue` + the dock-control family (`DockTabButton`, `DockSelectTrigger`,
`DockDropdownTrigger`), `dock.css` (the full style authority), `useDockState` / `useLayerTransition`,
the dock tokens in `tokens.css §10/§11`, the dock tests, and the dock CLAUDE.md contract (orientation,
aria, slider keep-dock-open). The focus the prompt names: the pill (glass tier, expand/collapse, density)
+ the icon button (hover / active / press / 44px coarse floor).
**Disposition:** authored audit/design slice. NO src/ written; NO sibling written; read-only git. Build ON
`audit/W0-L4` (the dock-item dispositions) + `audit/W0-L6` (blob lens — disjoint, no dock content) +
`AT.md §W7` (the dock overflow-collapse item). SOTA via WebSearch/WebFetch, cited inline.

---

## 0. Executive summary — the load-bearing findings

The GlassDock system is **structurally excellent and motion-mature** — the FLIP/View-Transition
crossfade machinery (`useLayerTransition.ts`), the three-state hold-counted state machine
(`useDockState.ts`), the density ladder, the 44px coarse floor (`dock.css:1149`), the typed-key DI,
and the aria contract are all SOTA-grade and recently hardened (AP→AS). The audit found **no
structural rot**. What it found is a **design-maturity gap between the chassis and the icon
affordance**: the pill is a beautifully-engineered glass surface, but the icon buttons riding inside
it are flat, uniform, and motion-poor relative to 2025 dock SOTA (macOS Tahoe Liquid Glass, the
Motion/shadcn web-dock family). Seven findings, ranked:

1. **[HEADLINE — design gap] No proximity magnification.** Every dock-control affordance gets a
   single uniform hover scale (`--scale-hover-dock: 1.1`, `dock.css:746`). The defining gesture of a
   *dock* — the macOS neighbor-falloff magnification (a hovered icon swells, neighbors taper via a
   Gaussian) — is entirely absent. This is THE thing that makes a row-of-icons read as a "dock"
   rather than a "toolbar." It is the single largest perceptual gap vs SOTA and the natural AT
   headline-adjacent dock slice. §3.

2. **[HEADLINE — contract debt] The `overflow`/`wrap`/`containerName` 3-prop accretion is real, and
   the AT plan is internally split on it.** `AT.md §W7` says "GlassDock overflow-collapse (retire
   `wrap`) — clean break"; `audit/W0-L4 #11` downgrades it to "a CONTRACT clarification… ADDITIVE, not
   supersede… zero src risk." **The designer's read sides with W7, not L4**: `wrap` and `overflow` are
   NOT cleanly additive — they fight at the layout layer (§4), and the three-axis matrix
   (`grow|scroll` × `wrap on|off` × `containerName set|unset`) is an 8-cell behaviour space of which
   ~3 cells are degenerate or contradictory. The gestalt move is ONE `overflow` enum that absorbs
   `wrap`. §4.

3. **[correctness — design] Press-scale inconsistency across the control family.** `DockIconButton`
   presses to `--scale-press-dock: 0.92` (`dock.css:750`), but the canonical iOS-glass press value the
   rest of the library uses is `--scale-press: 0.96` / `--scale-press-btn: 0.97` (`tokens.css:982,990`,
   per DESIGN.md §L3). 0.92 is an 8% squash — visibly harder than every other pressable surface in the
   system. The dock reads as "punchier" than the buttons it sits next to. §5.

4. **[design gap] The pill is glass, but the icons are not.** The chassis composes a paper-grain
   `::after`, a backdrop blur, and a border (`dock.css:163,71-74`) — a genuine glass surface. The icon
   buttons at rest are `background: transparent` with a muted-foreground tint (`dock.css:709-727`); on
   hover they get a flat `--muted` fill (`dock.css:744`). There is no specular edge, no
   inner-highlight, no lensing — the 2025 Liquid-Glass vocabulary the library already owns
   (`--glass-specular`, `--glass-highlight`, `--border-hairline`, `tokens.css:668-683`) is applied to
   the chassis but withheld from the affordances. The `data-tier="secondary"` path (`dock.css:990`)
   proves the recipe exists; it is just not the default. §6.

5. **[correctness — stale contract] DockGroup / `/dock-group` is RETIRED, but the prompt, CLAUDE.md,
   and `motion-core.ts:13` still reference it as live.** `src/index.ts:64` records "dock-group retired
   alongside (AI.W5-γ/δ)"; there is no `src/components/custom/dock-group/`, no `dock-group.css`. The
   CLAUDE.md "Subpath naming pairs" + "Structure" sections still document `@mkbabb/glass-ui/dock-group`
   as a shipping subpath. This is a doc-vs-reality drift AT's W7 docs pass must reconcile. §7.

6. **[design gap] The collapsed→expanded morph is width-only; the icons don't choreograph.** The
   chassis width FLIPs beautifully (`useLayerTransition`), but the icons inside the expanding layer
   appear/disappear via a binary opacity crossfade (`dock.css:413-446`). SOTA docks (macOS genie, Arc,
   Linear's command surfaces) *stagger* their contents — a brief per-item rise/fade as the container
   opens. glass-ui already ships `useStaggerReveal` (`composables/motion/`); the dock does not consume
   it. §8 — proposed as a LIGHT slice, gated on reduced-motion.

7. **[hardening — gate] No dock binding-verification guard, and no visual-state test for the icon
   four-state contract.** The booked-not-built dock binding guard is already in `AT.md §W6`; this lens
   adds the design-specific shape it should take (§9) — the four pressable dock controls
   (`DockIconButton`/`DockTabButton`/`DockSelectTrigger`/`DockDropdownTrigger`) must each prove they
   emit the focus-visible ring + the press scale, the exact silent-no-op class the MEMORY
   binding-verification note warns about.

**The AT fold (proposed):** a single **dock-design slice** — call it **AT.W7.D (dock interaction
refinement)** — folding findings 1, 3, 4, 6 (the magnification + press-scale + glass-affordance +
stagger refinements, all token-first, all reduced-motion-gated) ALONGSIDE the W7 overflow-collapse
(finding 2) and the W7 docs reconcile (finding 5), with finding 7's guard landing in W6. Rationale and
exact gates in §10. None of this touches the blob headline; it is file-disjoint from W2–W5 and rides
the AS-residual W6/W7 fold the plan already opened.

---

## 1. What the dock IS today — the honest baseline (file:line)

The dock is a **mature, multi-variant chassis**. Cataloguing it precisely so the refinements land as
augmentation, not re-derivation:

**Chassis (`GlassDock.vue`):**
- 3 variants — `dock` (horizontal floating), `rail` (vertical stadium-pill), `instrument-strip`
  (vertical chassis-strip, `dock.css:264`). `rail`/`instrument-strip` force `orientation: vertical`
  (`GlassDock.vue:113`).
- 4 density rungs — `compact|comfortable|spacious|audacious` (`dock.css:89-146`), each setting a full
  cohort of `--dock-*` padding/gap/control-size tokens.
- Expand/collapse via the 3-state machine (`useDockState`): `collapsed → hover → pinned`, hold-counted
  (`keepOpenCount`), with `collapseDelay: 2000ms` default. Touch-gated (`useTouchGate`), focus-parity
  (`onFocusIn`/`onFocusOut`), click-away via a deferred capture-phase listener.
- Width animation: the outer collapsed↔expanded pair is a `useLayerTransition` FLIP (or a native
  View-Transition on supporting engines, `useLayerTransition.ts:121`). Genuinely SOTA — zero
  `width: auto` non-interpolation, axis-aware.
- Surface: `--glass-bg-dock` (0.42α card mix, `tokens.css:648`) + `backdrop-filter` blur +
  `1.5px` border + paper-grain `::after` (`dock.css:163`) + `--shadow-dock` (a soft 20px ambient glow,
  `tokens.css:545`). Plus reactive surface-lift on `[data-held]` and `:has([data-state="open"])`
  (`dock.css:330,343`).

**Affordances (the control family):**
- `DockIconButton` — fixed `--dock-control-size` square (2.5rem comfortable), `border-radius:
  --radius-pill`, transparent at rest, muted-fg tint, hover `--muted` fill + `scale 1.1`, press
  `scale 0.92`, active token-ladder (`--dock-active-*`, `dock.css:775`). `compact` variant auto-sizes.
- `DockTabButton` — auto-width text tab, `--dock-tab-h` density-keyed min-height, `data-tier="primary"`
  composes the `btn-audacious` disco recipe + phase-tinting (`dock.css:930-978`); `data-tier="secondary"`
  gives a quiet glass surface.
- `DockSelectTrigger` / `DockDropdownTrigger` — reka-ui trigger wrappers; select does NOT hover-scale
  (so dropdown content anchors cleanly), dropdown DOES (matches icon-button).
- Shared four-state contract: focus-visible ring + disabled paint expressed ONCE as a comma group over
  the family (`dock.css:32-46`) — good cohesion.

**The 44px coarse floor (SHIPPED, correct):** `@media (pointer: coarse)` lifts `--dock-control-size`
and `--size-icon-btn` to `--dock-touch-target: 2.75rem` (`dock.css:1134-1138`), with a button-level
`min-block/inline-size` floor for standalone (no-dock-ancestor) buttons (`dock.css:1149-1152`). This is
WCAG 2.5.5-correct and the density-presence-selector specificity fix (`.glass-dock[data-density]`,
`dock.css:1135`) is a real, well-documented bug close (AP.W3 R0G-6). **Do not re-touch this** — `W0-L4
#24` correctly KILLs re-minting it.

**Verdict:** the engineering floor is high. Every refinement below is design polish + one contract
collapse, NOT remediation. This matters for the AT framing: the dock is forward work, not debt.

---

## 2. SOTA reference frame (cited)

The 2025 dock/icon-button state of the art, distilled from the research pass (findings tagged
KNOWLEDGE vs WEB):

**macOS Tahoe Liquid Glass dock (WEB).** The Dock adopts Liquid Glass — translucent, light-reflecting,
*refractive*: "if you move one element over another… you see a liquid-like refraction effect"
([MacRumors, macOS Tahoe](https://www.macrumors.com/2025/09/15/apple-releases-macos-tahoe/)). The
specular highlight "appears around the edges of the glass object as a rim light effect, with its
intensity varying based on the angle of the surface normal relative to a fixed light direction"
([kube.io / 1ar.io via search](https://kube.io/blog/liquid-glass-css-svg/)). Magnification + size are
user-tunable; the genie/scale is the dock's signature.

**Magnification implementation — the Gaussian falloff (WEB, high-value).** The modern web dock (Motion
+ shadcn family) drives per-icon scale by a **Gaussian bell curve**:
`scale = (magnification − 1) × exp(−d² / (2 × distance²)) + 1`, with defaults **magnification 1.8,
distance radius 120px, icon 40px, gap 4px**, animated by a **spring (stiffness 400, damping 25, mass
0.4)** on a shared `mouseX` MotionValue so neighbors taper smoothly with **zero re-renders**; icons use
**`origin-bottom`** so they scale upward "matching macOS behavior"
([unlumen UI dock](https://ui.unlumen.com/components/dock); [react-osx-dock](https://github.com/lukehorvat/react-osx-dock)).
Tooltips animate `duration 0.13, ease easeOut`. Accessibility: `focus-visible:ring` + `aria-label`.

**Icon-button state best-practice (WEB).** Hover should "confirm interactivity through color tint,
shadow, or a slight scale"; press should read as a tactile "inset/pushed-in" with a quick animation,
**100–300ms**; every state needs a *distinct* treatment combining "color, depth, motion, or icon
changes," never color alone; touch targets **≥ 44×44px**; honor reduced-motion; "standardize
interaction patterns in your design system and stick to them"
([Mockplus button states](https://www.mockplus.com/blog/post/button-state-design);
[Justinmind microinteractions](https://www.justinmind.com/web-design/micro-interactions)).

**Command-surface family (WEB/KNOWLEDGE).** Linear/Figma/Arc command + toolbar docks favor a quiet
at-rest read with a single decisive active state and spring-eased reveals; bottom-docked toolbars are
the dominant placement ([Untitled UI command menus](https://www.untitledui.com/components/command-menus);
[Arc browser interface, Figma community](https://www.figma.com/community/file/1228728710215940920/arc-browser-interface)).

**Liquid Glass on the web (WEB).** The refraction look is achievable with `backdrop-filter` +
SVG `feDisplacementMap` + a specular rim (`inset` highlight); glassmorphism = blur + opacity, Liquid
Glass adds **refraction degree + edge specular**
([LogRocket Liquid Glass](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/);
[glass-refraction](https://github.com/Z1Code/glass-refraction)).

**The gap, stated plainly:** glass-ui's chassis is at Liquid-Glass parity (blur + grain + reactive
lift); its **affordances are at 2019 flat-Material parity** (transparent → flat fill, uniform scale).
SOTA has moved the *icons* to glass + proximity-magnified. That is the design delta AT can close.

---

## 3. [HEADLINE] Proximity magnification — the missing dock gesture

### 3.1 The weakness, at file:line

`dock.css:743-751`:
```css
.dock-icon-button:hover:not(:disabled) { … scale: var(--scale-hover-dock); }  /* 1.1, uniform */
.dock-icon-button:active:not(:disabled) { scale: var(--scale-press-dock); }   /* 0.92 */
```
Every hovered control scales identically; neighbors do nothing. A row of `DockIconButton`s is, in
motion terms, a *toolbar* — n independent buttons — not a *dock*. The defining dock affordance (the
cursor "lensing" the row, neighbors swelling and tapering) does not exist anywhere in `dock.css` or the
composables. This is the single biggest perceptual distance from SOTA (§2).

### 3.2 The gestalt proposal — `useDockMagnify`, opt-in, token-first, reduced-motion-gated

A NEW internal composable + an opt-in chassis prop, modeled on the published web-dock physics (§2) but
expressed in glass-ui's token + keyframes.js idiom:

- **`<GlassDock magnify>`** (default `false` — the dock stays calm by default; magnification is a
  *flavor*, the same opt-in posture as `overflow="scroll"`). When set, the chassis tracks pointer X
  (horizontal) / Y (vertical) over its control row and writes a per-control `--dock-magnify-scale`
  custom property; each `.dock-icon-button` already animates `scale`, so the paint path is free.
- **The falloff is a token.** `--dock-magnify-max: 1.5` (peak scale — softer than macOS 1.8, tuned to
  glass-ui's restraint), `--dock-magnify-radius: 96px` (the `distance` term), driven CPU-side by the
  Gaussian `(max−1)·exp(−d²/(2·r²))+1`. Consumers retune both; a consumer wanting macOS-faithful sets
  `--dock-magnify-max: 1.8; --dock-magnify-radius: 120px`.
- **Spring, not transition.** Use `@mkbabb/keyframes.js` (already a peer, already the spring runtime)
  to ease the scale toward target — the web-dock `stiffness 400 / damping 25 / mass 0.4` maps to a
  glass-ui `--spring-snappy`-class config; this is the difference between a "follows the cursor" feel
  and a laggy one. NO per-frame Vue re-render — write the CSS var imperatively (the
  `useLayerTransition` precedent for direct-DOM writes).
- **`transform-origin` axis-aware.** Horizontal docks `origin: bottom` (icons rise — matching macOS,
  §2); vertical rails `origin: left`/`right` per `railPosition`. The chassis must NOT clip the swell —
  this composes with the `overflow` collapse (§4): magnify implies `overflow: visible` on the layer.
- **Reduced-motion: hard off.** `@media (prefers-reduced-motion: reduce)` zeroes `--dock-magnify-max`
  to `1` — magnification is pure decoration, exactly the class the global PRM gate
  (`utilities.css`) already strips. Cite: SOTA "ignoring reduced motion… can make microinteractions
  hard to use" ([Justinmind](https://www.justinmind.com/web-design/micro-interactions)).

### 3.3 The ≥2-distinct-consumer-context test (inv: no overfitting)

Magnification clears the bar only if ≥2 distinct contexts want it. Candidate contexts:
(a) a glass-ui demo story (`demo/stories/.../dock-magnify.vue`) — the binding glass-ui consumer, the
exact `deriveAurora`-at-W7 precedent the plan already uses for goo-blob;
(b) any consumer floating an app-launcher-style dock (the macOS-dock use case — speedtest/bbnf-buddy
app chrome is the latent 2nd). **Honest read:** today this is a 1-firm-consumer (the demo) feature.
**Disposition: this is the slice's design-risk.** Two clean exits: (i) ship it as a demo-led flavor
with the motive stated honestly (like goo-blob's thin consumer breadth, `AT.md §DEC-AT-5`), OR (ii)
**BOOK it** until a 2nd app-chrome consumer converges, and land §4/§5/§6 (the unconditionally-good
refinements) in W7 without it. The lens RECOMMENDS (ii) for the core sequence and (i) only if AT wants
a visible dock-design headline; either way the gate below is the same.

### 3.4 Hard gate (if folded)
`useDockMagnify` writes `--dock-magnify-scale` only when `magnify` is set; PRM zeroes the swell
(asserted by a unit reading the var under a mocked `matchMedia`); the chassis does not clip
(`overflow: visible` on the magnify layer); a no-`magnify` dock is byte-identical to 3.2.0 (the
parity-de-risk the plan favors). Off the default path → no payload cost for non-magnify consumers.

---

## 4. [HEADLINE] The `overflow` / `wrap` / `containerName` collapse — siding with W7

### 4.1 The accretion, mapped

Three independent props govern "what happens when content exceeds the pill":
- `wrap?: boolean` (`GlassDock.vue:18`) → `.dock-wrap`: multi-line flex-wrap, `--radius-2xl`,
  `max-width` clamp, separators hidden, with a `@media (min-width: 640px)` rule that *un-wraps* on
  desktop (`dock.css:1089-1112`).
- `overflow?: "grow" | "scroll"` (`GlassDock.vue:70`) → `grow` (visible overflow) or `scroll`
  (`.dock-scroll-x`/`.dock-scroll-y` scroll port).
- `containerName?: string` (`GlassDock.vue:83`) → establishes a container-query subject + lifts the
  `overflow: hidden` clip (`dock.css:85`).

### 4.2 Why they are NOT cleanly additive (the L4 #11 claim, refuted)

`W0-L4 #11` calls `wrap` and `overflow` "ADDITIVE, not supersede… zero src risk." The designer's read:
**they overlap and partially contradict.** They are three answers to ONE question (the overflow
strategy):
- `wrap=true` + `overflow="scroll"` is **undefined**: does over-cap content wrap OR scroll? The CSS
  has `.dock-wrap .dock-layer--full { flex-wrap: wrap }` AND `.dock-scroll-x .dock-layer--full
  { overflow-x: auto }` — both can match; the result is layout-dependent and untested (no test covers
  the cross-product).
- `wrap` *is* an overflow strategy ("when content exceeds the pill, flow to a second line"). It belongs
  in the SAME enum as `grow`/`scroll`, not in a parallel boolean. The current shape lets a consumer
  express the contradictory `overflow="grow" wrap` (grow visibly AND wrap — two different escape
  valves).
- The desktop-un-wrap media query (`dock.css:1089`) hard-codes a `640px` breakpoint INTO the wrap
  behaviour — a viewport assumption baked into a layout prop, the antithesis of token-first.

This is the textbook "3-prop accretion" the user's architectural-approach memory targets (gestalt
redesign over incremental patches).

### 4.3 The gestalt — ONE `overflow` enum

```ts
overflow?: "grow" | "wrap" | "scroll"   // clean break: `wrap` folds in; the boolean retires
```
- `grow` (default) — historical visible-overflow.
- `wrap` — multi-line (absorbs the old `wrap=true`; the `--radius-2xl`, clamp, hidden-separators all
  move under `overflow="wrap"`; the `640px` media query becomes a `--dock-wrap-unwrap-min` token a
  consumer can disable, NOT a baked breakpoint).
- `scroll` — the scroll port.

`containerName` stays separate — it is genuinely orthogonal (it governs container-query *subject*
establishment + clip-lifting, not the overflow *strategy*). But the docs must say so explicitly (it
currently reads as a third overflow knob).

This is a **clean break, no back-compat alias** (per the user's no-legacy memory + L invariant 4) —
the W7 framing is correct; L4 #11's "docs-only, zero src" framing under-reads the contradiction. The
src change is small (rename the boolean to an enum value, fold the CSS selectors) but it IS a src
change and a clean break, not a doc clarification.

### 4.4 Hard gate
One `overflow` enum; `wrap` boolean gone (`rg 'wrap\?' src/components/custom/dock = 0`); the
cross-product `wrap × scroll` is now unrepresentable (type-level); the `640px` literal is a token; the
existing `scroll-overflow.test.ts` + a new `overflow="wrap"` case green; no consumer can express the
contradictory grow+wrap.

---

## 5. [correctness] Press-scale inconsistency — 0.92 vs the 0.96/0.97 canon

### 5.1 The defect
`--scale-press-dock: 0.92` (`tokens.css:983`) is consumed by `.dock-icon-button:active`,
`.dock-tab-button:active`, `.dock-select-trigger:active`, `.dock-dropdown-trigger:active`
(`dock.css:750,895,1045`). The rest of the library presses to `--scale-press: 0.96` (the "canonical
iOS Liquid Glass press value every primitive reaches for unless it has a documented reason",
`tokens.css:985-986`) or `--scale-press-btn: 0.97`. **0.92 has no documented reason** — there is no
comment justifying why the dock presses 4–5% harder than every Button beside it. An 8% squash on a
2.5rem icon is a perceptible 2px collapse; next to a 0.96 Button it reads as inconsistent "weight."

### 5.2 The design call
Two defensible resolutions; the lens RECOMMENDS the first:
- **(A, recommended) Retune to the canon.** `--scale-press-dock → 0.96` (or alias it to `--scale-press`
  outright). One value, system-consistent press weight, the SOTA "standardize and stick to it" guidance
  ([Mockplus](https://www.mockplus.com/blog/post/button-state-design)). Clean break, no alias.
- **(B) Keep 0.92 but DOCUMENT the reason.** If the dock *intends* a punchier press (a defensible
  "these are denser, more frequent taps" argument), the token MUST carry the DESIGN.md §L3-style
  rationale comment the other press tokens carry. A magic number without a reason is the defect; a
  documented divergence is a decision.

Either is cheap. (A) is the gestalt-consistency move; (B) is the minimum. **(A) folds into the W7
control-size-vocabulary slice** (which already touches the dock + Button + Select sizing vocab —
`AT.md §W7`).

### 5.3 Hard gate
`rg 'scale-press-dock' tokens.css` resolves to `0.96`/`var(--scale-press)` OR carries a `/* reason: … */`
comment; a unit/snapshot asserts the dock press value matches (or documents its divergence from) the
Button press value.

---

## 6. [design gap] Glass the affordances, not just the chassis

### 6.1 The asymmetry
The chassis is glass (§1); the icon buttons are flat. At rest a `DockIconButton` is
`background: transparent` + a muted tint (`dock.css:727`); on hover it gets a flat opaque `--muted`
fill (`dock.css:744`) — a Material-2-era treatment. The library OWNS the Liquid-Glass affordance
vocabulary (`--glass-specular` inset rim, `--glass-highlight` inner top-light, `--border-hairline`
catch-light, `tokens.css:668-683`) and ALREADY applies it via `data-tier="secondary"`
(`dock.css:990-1005`) — proving the recipe composes on a dock control. It is simply not the default
hover read.

### 6.2 The proposal — a glass hover, not a flat fill
Retune `.dock-icon-button:hover` (and the trigger family) from the flat `--muted` fill toward the
quiet-glass recipe the `secondary` tier already uses: a translucent `color-mix(var(--card) …)` surface
+ `--glass-highlight` inner top-light + the catch-light hairline, with the fill tracking
`--btn-hover-color` for the glyph. This is **token-only** (no new tokens — reuse `--glass-highlight`,
`--glass-specular`, `--card`), and it makes the hover read as "the glass lifts under the cursor" rather
than "a gray box appears." Pair with the §3 swell for the full Liquid-Glass dock feel. Keep the active
token-ladder (`--dock-active-*`) untouched — it is already consumer-overridable and correct.

**Active-state legibility (SOTA "distinct per state, not color alone").** The active default is
`--muted` bg + `--foreground` color with NO transform/border/shadow (`dock.css:775-781`,
`--dock-active-*` defaults). Against the proposed glass hover, the active state may under-differentiate
(both become "filled"). The lens flags this as a **design-review line-item**, not a forced change: if
the hover goes glass, verify active still reads as decisively "selected" (an inner-shadow inset or the
`--dock-active-border` default-on would do it) — the kind of thing only a visual confirmation settles
(the P5/π visual-evidence precedent the plan adopts in W7).

### 6.3 Hard gate
Token-only (no new tokens introduced — `rg` the diff for `--dock-` additions = 0 beyond the §3 magnify
pair if folded); the hover recipe references `--glass-highlight`/`--card`, not a flat `--muted`; a
paired-π `baseline|close/` visual capture confirms hover + active remain distinct (the W7 visual
protocol). PRM does not break it (glass fill is not motion).

---

## 7. [stale contract] DockGroup / `/dock-group` is retired — reconcile the docs

### 7.1 The drift
- **Reality:** no `src/components/custom/dock-group/`, no `dock-group.css`; `src/index.ts:64`
  ("`dock-group` retired alongside (AI.W5-γ/δ)") and `src/motion-core.ts:13` ("Pairs with `/motion`
  like `/dock` ↔ `/dock-group`") are the only mentions, and the second is a now-FALSE analogy (it
  references a retired pair as if live).
- **Docs that still claim it ships:** the CLAUDE.md "Structure" tree lists `dock-group/  # DockGroup
  chassis-strip wrapper`; the "Subpath naming pairs (canonical)" section documents
  `@mkbabb/glass-ui/dock-group (DockGroup chassis-strip wrapper…)` as a live subpath; the AT B1 prompt
  itself lists `dock-group/ (DockGroup chassis)` as a source to read (it does not exist).

### 7.2 The call
This is a **W7 docs-reconcile** item (the plan already has a "docs/contract pass," `W0-L4 §5`). Strip
the `/dock-group` subpath claims from CLAUDE.md (Structure + Subpath naming pairs), and fix the false
`/dock` ↔ `/dock-group` analogy in `motion-core.ts:13` (it should reference a LIVE pair, e.g.
`/dock` ↔ `/aurora`, or drop the analogy). This composes with the §4 overflow-contract docs update and
the CLAUDE.md GlassDock-prop reconcile — one coherent dock-docs pass. **Note for the AT authors:** the
`instrument-strip` variant (`dock.css:264`) is the surviving "chassis-strip" capability — the retired
DockGroup's role folded into a GlassDock variant, which is the right gestalt (one chassis, variants)
and worth a one-line CLAUDE.md note so the retirement reads as a consolidation, not a loss.

### 7.3 Hard gate
`rg 'dock-group' CLAUDE.md = 0` (or only as a retirement note); `motion-core.ts:13` references no
retired pair; `git grep '/dock-group'` finds no live-subpath claim.

---

## 8. [design gap] Stagger the expand — LIGHT slice

### 8.1 The gap
When the dock expands, the chassis width FLIPs and the full layer crossfades in as ONE opacity block
(`dock.css:413-436`). SOTA reveal grammar staggers container contents (a brief per-item rise/fade) so
the expansion reads as "the dock unfurls" rather than "a wider box appears." glass-ui ships
`useStaggerReveal` + `useStagger` (`composables/motion/`, on the root barrel) and a `.gl-list-item`
View-Transitions recipe (`view-transition.css`) — the substrate exists; the dock does not consume it.

### 8.2 The proposal (light, optional)
On the collapsed→expanded transition, apply a short staggered entry to the `.dock-layer--full`
children (or the active `DockLayer`'s items) — `useStaggerReveal` with a ~20–30ms per-item delay, a
small translate-up + fade, capped so a 6-icon dock fully reveals in < 200ms (SOTA hover/reveal window,
§2). **Reduced-motion: collapse to a single fade** (the existing crossfade). This is genuinely
optional — a "delight" slice, not a correctness one. The lens flags it as **the weakest of the four
design slices** (its ≥2-context story is thin — it benefits every dock but no consumer has *asked*),
and recommends it BOOK unless AT wants the dock-design slice to be visibly complete.

### 8.3 Hard gate (if folded)
PRM collapses to the current single fade (asserted); the stagger is capped (< 200ms total for ≤ 8
items); reuses `useStaggerReveal` (no new motion primitive — overfitting-clean); byte-identical when
PRM is on.

---

## 9. [hardening] The dock binding-verification guard — the design shape

`AT.md §W6` already books "the dock binding-verification guard." This lens specifies the
**design-state** shape it should take (complementing whatever reka-ui prop-binding shape W6 chooses),
grounded in the MEMORY binding-verification note ("stale reka-ui prop/emit bindings silently no-op;
only e2e catches them"):

A **four-state-contract conformance test** over the pressable dock controls. For each of
`DockIconButton`, `DockTabButton`, `DockSelectTrigger`, `DockDropdownTrigger`, assert (in jsdom where
possible, flagged as visual-confirmation where not):
- the focus-visible ring resolves (the shared `:focus-visible` group, `dock.css:32`) — a regression
  here is the exact silent-no-op class (a `:where()` zeroing the class would drop the ring, the bug the
  `dock.css:25-31` comment explicitly guards against);
- the `:active` press scale is the family value (ties to §5 — the test PINS the press constant, so a
  future drift back to an undocumented 0.92 fails);
- the active-state selectors (`.is-active` / `[aria-expanded="true"]` / `[aria-pressed="true"]`,
  `dock.css:775`) each light the active paint (a stale active selector silently leaves a "selected"
  control looking unselected — the binding-verification failure class for active state).

This is cheap, jsdom-runnable for the class-presence assertions, and closes the design-regression door
the §5 retune and §6 glass-hover open.

### 9.1 Hard gate
The conformance test exists; each of the 4 controls proves focus-ring + press-scale + active-paint;
the press constant is pinned (drift fails the test).

---

## 10. The AT fold — proposed wave shape + gates

The dock work is **file-disjoint from the blob headline (W2–W5)** and rides the AS-residual W6/W7 fold.
Proposed disposition, mapped to the existing plan:

| # | Finding | Class | Fold | Gate (§) |
|---|---|---|---|---|
| 2 | `overflow`/`wrap` collapse → one enum | contract / clean break | **W7** (already booked — confirm W7, NOT L4-#11 docs-only) | §4.4 |
| 3 | Press-scale 0.92 → 0.96 (or document) | correctness | **W7** (with the control-size-vocab slice) | §5.3 |
| 5 | DockGroup/`/dock-group` doc reconcile | stale contract | **W7** (docs pass) | §7.3 |
| 6 | Glass the icon hover (token-only) | design polish | **W7.D (new dock-design slice)** | §6.3 |
| 1 | Proximity magnification (`useDockMagnify`) | design headline / opt-in | **W7.D if ≥2 ctx, else BOOK** | §3.4 |
| 8 | Stagger the expand (`useStaggerReveal`) | delight / light | **W7.D optional, else BOOK** | §8.3 |
| 7 | Dock binding/four-state guard | hardening / gate | **W6** (already booked — adopt the §9 shape) | §9.1 |

**Recommended minimal AT delta (no plan-restructure):**
- **W6** absorbs finding 7's concrete shape (no new wave — it is the already-booked guard).
- **W7** absorbs findings 2, 3, 5 (overflow collapse + press canon + docs reconcile) — all already in
  the W7 ambit; this lens just CONFIRMS W7's "retire wrap" reading against L4's softer one, and adds
  the press-scale + DockGroup-doc items to the W7 docs/contract pass.
- A small **W7.D dock-design slice** (or a W7 sub-lane) carries finding 6 (glass hover — unconditionally
  good, token-only, cheap) and OPTIONALLY findings 1 + 8 (magnification + stagger) IF the dock-design
  headline is wanted AND the ≥2-context bar is met by the demo-led precedent. The lens recommends
  shipping 6 unconditionally and treating 1/8 as the visible-delight stretch — exactly the "value is the
  refinement, breadth is honest" posture the plan already uses for goo-blob (`§DEC-AT-5`).

**Why not a bigger dock wave:** the dock is structurally sound (§1). A heavy dock tranche would
manufacture work; the gestalt move is FOUR token-first refinements + one contract collapse + one doc
reconcile, all riding the fold the plan already opened. No new substrate, no blast radius into the blob
waves, no overfitting beyond the §3/§8 ≥2-context honesty the lens flags explicitly.

---

## 11. Anti-findings (what is GOOD — do not touch)

So the AT authors don't "fix" working things:
- **The FLIP / View-Transition crossfade** (`useLayerTransition.ts`) — SOTA, axis-aware, recently
  hardened. Leave it.
- **The 44px coarse floor** (`dock.css:1134-1152`) — WCAG-correct, the specificity fix is a real bug
  close (AP.W3 R0G-6). `W0-L4 #24` correctly KILLs re-minting. Leave it.
- **The shared four-state `:where()`/comma-group contract** (`dock.css:32-46`) — good cohesion, the
  non-`:where()` choice for focus-ring is deliberate and documented (a `:where()` would zero the class
  and let hover override the ring). Leave it; §9 just GUARDS it.
- **The typed-key DI + `useDockState` hold-counting** — clean, the O.W2 consolidation. Leave it.
- **The aria contract** (presentational root, `aria-expanded` on the trigger child) — correct, axe-clean.
  Leave it.
- **The `data-tier` recipe + `btn-audacious` composition** — the right way to do a loud tier; §6 just
  proposes making a QUIET version of it the default hover.

---

## 12. Sources

- [macOS Tahoe / Liquid Glass dock — MacRumors](https://www.macrumors.com/2025/09/15/apple-releases-macos-tahoe/)
- [macOS Tahoe review (Liquid Glass refraction) — MacRumors](https://www.macrumors.com/2025/08/01/macos-tahoe-review/)
- [unlumen UI — web dock (Gaussian magnification, spring config)](https://ui.unlumen.com/components/dock)
- [react-osx-dock (neighbor-scale falloff)](https://github.com/lukehorvat/react-osx-dock)
- [Mockplus — button state design (2025 best practices)](https://www.mockplus.com/blog/post/button-state-design)
- [Justinmind — web micro-interactions / reduced-motion](https://www.justinmind.com/web-design/micro-interactions)
- [Untitled UI — command menus (Linear/Figma/Arc family)](https://www.untitledui.com/components/command-menus)
- [Arc browser interface — Figma community](https://www.figma.com/community/file/1228728710215940920/arc-browser-interface)
- [kube.io — Liquid Glass refraction with CSS + SVG](https://kube.io/blog/liquid-glass-css-svg/)
- [LogRocket — Liquid Glass effects with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [glass-refraction (specular + chromatic edge)](https://github.com/Z1Code/glass-refraction)

(Magnification physics constants + spring config are WEB-sourced from the unlumen/react-osx-dock
implementations; the macOS genie/refraction behavioral framing is WEB-sourced from the MacRumors/kube.io
material; the glass-ui file:line + token critique is first-hand from the HEAD source read.)
