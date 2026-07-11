# BI · D-MOTION · PASS-1 — the unified motion-register system

**Problem.** "General animation audit; timing curves tighter/more responsive, with options for
longer" + homogeneous animation language (popover enters like the dropdown; context-menu /
hover-card tightened; dropdown bounce refined); draw-in animations codified not ad-hoc (sheet
header divider too bouncy); accordion must not indent on click; drawer laggy; command palette
jitters.

**Synthesizer's ground-truth pass.** Every load-bearing file:line claim from both families was
re-verified against HEAD before this spec was written (§3 records the corrections). The central
diagnosis both families converge on is CONFIRMED: the physics engine is already sound and
single-sourced (SPRING_PRESETS → `scripts/regen-spring-tokens.mjs` → the `--spring-*` `linear()`
curves + the analytic `--spring-*-duration` settle clocks in
`src/styles/tokens/scheme-spring.css:101-129`), and the enter LANGUAGE is already homogeneous
(seven overlays ride ONE `.glass-reveal` recipe, `src/styles/glass/reveal.css:42-106`). What is
missing is (1) NAMED per-surface registers — `.glass-reveal` hardcodes `--spring-snappy` on
every leg (`reveal.css:68-72`), so tooltip ≡ dropdown ≡ dialog and "tighten the tooltip" is
inexpressible; (2) a TEMPO axis — no one knob makes everything a-bit-tighter or longer; (3) a
codified DRAW-IN register; (4) five concrete misbindings/defects with file:line owners; (5) a
universal literal-ban so the register table stays the only clock authority.

---

## §1 Verdict table

| Family | Verdict | Why (one line) |
|---|---|---|
| **MOTION-A** "the register table" | **ADVANCE** | Owns the right GOVERNANCE shape: one named register table in one CSS home, surfaces bind BY NAME on the shared recipe, the literal-ban gate goes universal. Its 8-name vocabulary becomes the canon. Its migration enumeration is partially stale (§3.1) and is SUPERSEDED by the P4 detector run. |
| **MOTION-C** "tempo axis + repairs" | **ADVANCE** | Owns the right MECHANICS: the curve⟂clock split makes tempo provably shape-preserving (`--spring-<name>-settle` × `--motion-tempo` → the kept `--spring-<name>-duration` name = zero consumer edits); the `--motion-weight` @property + site-local JS-getter precedent (`scheme-motion.css:182`, `property-regs.css:401`) makes the CSS↔JS parity path concrete; the five repairs are file:line-verified real defects. |

**Neither family is dominated; they are complementary halves and the leading composition is the
HYBRID (§2): C's mechanisms under A's names.** No BANK, no BLOCK, no RETIRE — both returns are
independently developed to mechanism level, and each covers a risk the other leaves open (A has
no CSS↔JS tempo story of C's rigor; C has no table home, no universal gate, and only 2 of A's 8
register names).

**The hybrid, exactly:**
- C's `.glass-reveal` tokenization (mint `--reveal-spring` / `--reveal-clock` reading the
  register bundle) is the ENABLING EDIT for A's `data-motion` binding axis — same mechanism at
  two granularities, merged: the register swaps knob vars on the ONE recipe body, never forks it.
- C's tempo emission (`regen-spring-tokens.mjs` settle/reader split + `@property
  --motion-tempo` + the `motionTempo(el)` JS reader) is THE tempo mechanism; A's
  `calc(* var(--motion-tempo))` wrapping of per-register clocks is subsumed by it (wrapping at
  the generated `--spring-<name>-duration` reader covers all 30 consumer sites for free).
- A's register TABLE + home file + literal-ban extension are THE governance layer; C's five
  repairs are the proof surfaces that the register model actually resolves the user's named
  defects.
- A's tempo default (1.0, identity) and C's (0.88, seeded-tighter) CONFLICT — adjudicated as
  open gap G3, resolved by the pass-2 A/B against the user's tightness judgment.

---

## §2 The hybrid architecture (mechanism level)

### 2.1 The register table — `src/styles/tokens/motion-registers.css` (the one net-new file)

`@import`-ed in the tokens cascade AFTER `scheme-spring.css` (it reads the generated
`--spring-*` / `--spring-*-duration` tokens; W-GLASS-CAL fence: those are READ-ONLY here).
Each register is a semantic name → a token bundle `{clock, ease, scale, rise, blur}`, seeded
from the tightest-reading HEAD values. The names (A's vocabulary, trimmed to
consumer-justified rungs — every register below has ≥2 real consumers or a named repair
behind it at HEAD; nothing speculative is minted):

| Register | Clock | Curve | scale / rise / blur | Consumers (HEAD) |
|---|---|---|---|---|
| `enter-overlay` | `--spring-snappy-duration` | `--spring-snappy` (+3.15%) | 0.88 / 0.5rem / 4px | Dialog, Sheet content — the focal hero surface earns presence. **Byte-identical to today's `.glass-reveal` default.** |
| `enter-menu` | `calc(--spring-smooth-duration)` (or `snappy × 0.8` — pass-2 calibrates) | `--spring-smooth` (+1.5%) | 0.96 / 4px / 2px | DropdownMenu, ContextMenu, Select, Command, Combobox — the utility whisper. **This IS the "dropdown bounce refined" fix.** |
| `enter-tooltip` | ~0.14s-class | `--ease-out-expo` (NO overshoot) | 0.97 / 0 / 0 | Tooltip, HoverCard — fastest, decelerating arrival. **This IS "tooltip/hover-card tightened."** |
| `exit` | `--duration-fast` | `--ease-out` (no overshoot, P2) | — | Every overlay's close leg (already the reveal.css exit shape — NAMED, not changed). |
| `draw-in` | `--draw-in-duration` | `--ease-out-expo` | scaleX 0→1 / clip-path wipe | The codified rule/divider/underline draw (§2.4). |
| `press` | `--spring-press-duration` (0.16s, exists at `scheme-spring.css:129`) | `--spring-press` | `--scale-press-*` | The bounded-control press cohort (`tap-squish`, `transition-control`). **Rule minted: press is a BOUNDED-CONTROL register, never a full-width-row register (§2.5 R1).** |
| `morph` | `--spring-dock-duration` | `--spring-dock` | compositor scale over reserved footprint | Dock V↔H, tab indicator — already correct; the table NAMES it. |
| `cascade` | `--lq-enter-duration` (`liquid-enter.css:59`, already = `--spring-snappy-duration`) | `--spring-snappy` | `--lq-enter-*` + 1/φ stagger | Page-build / list reveal — already correct; NAMED. |

`press`/`morph`/`cascade`/`exit` are NAMES over existing shipped recipes (zero paint change);
`enter-overlay/menu/tooltip` + `draw-in` are the four rungs that change behavior. KISS holds:
the table is ~40 lines of custom properties, not a framework.

### 2.2 The binding mechanism — tokenize the ONE recipe, bind by name

**Enabling edit (C):** `reveal.css` already parameterizes scale/blur/slide
(`--glass-reveal-enter-scale`, `--glass-reveal-blur`, `--glass-reveal-slide`,
`--lq-stretch-x/y` — verified at `reveal.css:46-60`) but hardcodes the CURVE + CLOCK
(`reveal.css:68-72`). Mint two more knobs on the base rule:

```css
.glass-reveal {
    --reveal-spring: var(--spring-snappy);
    --reveal-clock: var(--spring-snappy-duration);
    transition-duration: var(--reveal-clock), … ;
    transition-timing-function: var(--reveal-spring), var(--reveal-spring), var(--ease-out), … ;
}
```

**Binding axis (A):** `data-motion="<register>"` on the SAME `.glass-reveal` host — the house
`[data-surface]` axis precedent. `.glass-reveal[data-motion="menu"]` /
`[data-motion="tooltip"]` swap ONLY the knob vars (`--reveal-spring/--reveal-clock/
--glass-reveal-enter-scale/--glass-reveal-blur`) to the register bundle. The recipe BODY —
`@starting-style` from-state (`reveal.css:100-105`), data-state legs, coupled channels, PRM
carve (`reveal.css:210`) — stays ONE. Default (no attr) = `enter-overlay` = byte-identical.
Surfaces change ONE attribute; the library keeps the behavior. (C's thin-class form
`.reveal-utility` is the acceptable degenerate encoding; the data-attr is the canonical axis
because it reads as a register CHOICE, not a second recipe, and props thread onto attrs
cleanly.)

Non-reveal registers stay their existing recipes but RE-POINT their clocks at register/spring
tokens (the `src/styles/transitions.css` recipes — dropdown/dialog-scale/pop/fade-slide/
pane-swap/metric-swap, verified riding mixed `--duration-*` + `--spring-*-duration` clocks at
`transitions.css:15-165` — read the table instead of local picks). The table becomes the single
tightening point above the spring engine.

### 2.3 The tempo axis — `--motion-tempo` (C's mechanism, verbatim)

- `scripts/regen-spring-tokens.mjs` emits the raw analytic 2%-settle under a RENAMED token
  `--spring-<name>-settle`, plus a generated reader block that KEEPS the existing name:
  `--spring-<name>-duration: calc(var(--spring-<name>-settle) * var(--motion-tempo));`
  → all ~30 consumer sites + the aliases (`--tab-indicator-duration`, `--dock-motion-resize`,
  completion-seal's fallback read) inherit tempo with ZERO edits. NOT a clean-break rename for
  consumers — the public name is preserved as the reader; `-settle` is internal-generated.
- Register `--motion-tempo` in `src/styles/tokens/property-regs.css` as
  `@property { syntax: "<number>"; inherits: true; }` — the byte-for-byte `--ui-scale` /
  `--motion-weight` idiom (`property-regs.css:380,401`). `<number>` syntax keeps the calc
  always-valid. **Initial value: open gap G3 (1.0 identity vs 0.88 seeded-tighter).**
- NAMING FENCE: `--motion-weight` (squish/punch MAGNITUDE, `scheme-motion.css:182`, default
  0.618) and `--motion-tempo` (TIME) are orthogonal axes and must never be folded — weight
  scales how far the material deforms, tempo scales when it settles.
- **CSS↔JS parity (the P7 one-clock law):** a shared `motionTempo(el?)` reader (~10 lines,
  `src/composables/motion/`, cached getComputedStyle — the exact `--motion-weight` site-local
  JS-getter seam `scheme-motion.css:174` documents) multiplied into `response *= tempo` at
  spring construction in `useSpring` / `useSpringPress` / `useDockOrientationMorph` /
  `useDrawerSnap`. `duration ∝ response` (ωₙ = 2π/response), so scaling the CSS clock by tempo
  ≡ scaling response by tempo — proportionality by construction, proven live in P2.
- **Deliberate-weight carve:** the loud iOS-27 surfaces (dock morph, drawer, deck) re-pin
  `--motion-tempo: 1` on their scope — the existing `.liquid-stage { --motion-weight: 1 }` /
  `[data-reorder] { --motion-weight: 0 }` carve pattern (`scheme-motion.css:352-357`) reused,
  so the utility UI tightens while the BD.W-ANIM-IOS27-TUNE weight holds where it was
  deliberately landed.
- PRM: tempo × ~0.01ms is still ~0 — the universal `a11y-overrides.css` carve and the JS
  `respectReducedMotion` endpoint-snap win at every tempo. No interaction.

### 2.4 The draw-in register (`.draw-rule` / `[data-draw-in]`) — new `src/styles/draw-in.css`

The codified self-drawing rule: a hairline/divider/underline draws in via
`transform: scaleX(0→1)` (transform-origin: left/start) or `clip-path: inset()` wipe, on the
NO-OVERSHOOT arrival ease `--ease-out-expo` (reused from the §6 table — never re-minted), at
`--draw-in-duration: calc(<base> * var(--motion-tempo))`. **The law: a rule drawing itself
NEVER overshoots past full width — draw-in is a spatial channel on the expo arrival,
categorically NOT a spring.** This is the "sheet header divider too bouncy" fix: any ad-hoc
spring-riding divider re-points onto `.draw-rule`. PRM: keep opacity, snap scaleX→1.
Compositor-only (scaleX, never width — `proof:no-layout-animation` holds by construction).
It NAMES the shared arrival law; it does NOT re-author CompletionSeal's gold-draw or HandMark
draw-on (those keep their own recipes and are recorded as register MEMBERS, the ≥2-consumer
evidence).

### 2.5 The five named repairs (C's file:line set, all re-verified at HEAD)

- **R1 accordion indent** — `src/components/ui/accordion/AccordionTrigger.vue:27` composes
  `tap-squish` on a `flex flex-1 justify-between` full-width row; `:active` scale ~0.96 about
  center on a ~600px header = the perceived "indent." FIX: drop `tap-squish` (clean break, no
  alias); press feedback = `transition-control` surface tint + `transition-disclosure` chevron.
  Mints the register rule: press = bounded controls only. Gate arm asserts no full-width
  disclosure row binds the press register.
- **R2 dropdown bounce** — DropdownMenuContent on `.glass-reveal`'s hardcoded snappy +3.15%.
  FIX: `data-motion="menu"` (smooth +1.5%, tighter clock, 0.96 scale, 2px blur).
- **R3 popover-vs-dropdown** — timing is IDENTICAL at HEAD (both `.glass-reveal`); the felt
  divergence is transform-origin (Popover `align: 'center'` blooms symmetric; Dropdown
  `align: 'start'` blooms from the corner, both via `--reka-popper-transform-origin`,
  `reveal.css:61`). The register model makes the intent explicit; whether Popover binds
  `menu` (the ask's literal reading: "popover should enter like the dropdown") or stays focal
  is open gap G10, decided by capture.
- **R4 sheet divider** — library `SheetHeader.vue` carries NO divider (verified); the bouncy
  draw-in is demo/consumer-side. FIX: locate the actual surface (gap G8), re-point onto
  `.draw-rule`.
- **R5 command jitter** — TWO confirmed source defects in `src/styles/menu.css`:
  (a) `menu.css:58` `transition: translate var(--duration-fast) var(--spring-smooth)` — the P4
  violation (smooth CURVE on the generic 0.2s clock, the re-timed tail) → FIX:
  `var(--spring-smooth-duration)` (now tempo-scaled);
  (b) `menu.css:67-71` — the -1px hover-lift fires on `[data-highlighted]`, which reka sets for
  keyboard highlight too → every arrow/keystroke restarts a lift transition → FIX: scope the
  `translate` lift to `:hover` only; keyboard `[data-highlighted]` keeps the bg tint, no
  translate. Residual reka `scrollIntoView` scroll-jump hypothesis = gap G6.

### 2.6 The universal literal-ban (A's gate extension — EXTEND `scripts/proof-animation-coherence.mjs`, no fork)

(a) WIDEN the DURATION-BAND arm from the anchor set to ALL `src/styles/**/*.css` + all
`src/**/*.vue` `<style>` blocks, exempting only the token-definition homes
(`scheme-motion.css`, `scheme-spring.css`, `motion-registers.css`) and preserving the existing
`animation:`-period continuous-loop exemption (skeleton 6s, shimmer, DarkModeToggle).
(b) NEW TEMPLATE-DURATION arm: `.vue` `<template>` scan for Tailwind `duration-[Nms]` /
`duration-N` / `ease-[…]` / `delay-[Nms]` → RED (compose a register).
(c) NEW REGISTER-BINDING positive arm: every enrolled overlay content SFC carries
`.glass-reveal` (+ optional `data-motion`) — a raw entrance transition on an overlay REDs.
Each arm ships with a planted-violation self-test bite (house gate discipline).

---

## §3 HEAD-verification corrections (facts the pass-2 builder must not inherit wrong)

1. **A's raw-ms migration list is partially stale.** `GlassDock.vue` "320ms",
   `DockLayerGroup.vue` "150ms/120ms", `HoverPopover.vue` "150ms" are COMMENT hits at HEAD,
   not live transition values (verified by grep). The true violation list MUST come from the
   P4 detector run, not the family-A enumeration.
2. **`DRAWER_SNAP` is `{response: 0.5, dampingFraction: 0.74}`**
   (`src/components/ui/drawer/constants.ts:27`), not C's claimed 0.4/0.82. The "drawer laggy"
   diagnosis is OPEN (gap G7) — response 0.5 is slower than either family assumed; do not
   re-tune the spring before profiling whether the lag is the response, the gesture→spring
   handoff, or something layout-bound.
3. **`.glass-reveal` already has scale/blur/slide knobs** (`reveal.css:46-60`, incl. the
   BD.W-ANIM-IOS27-TUNE 0.88 enter-scale + `--lq-stretch-*` squish) — only the curve+clock
   need tokenizing. The register diff is smaller than either family stated.
4. **`--spring-press` + `--spring-press-duration` (0.16s) already exist**
   (`scheme-spring.css:129`) — the press register is a NAMING, not a mint.
5. **`.liquid-enter` already keys `--lq-enter-duration: var(--spring-snappy-duration)`**
   (`liquid-enter.css:59`) — the cascade register inherits tempo for free via the §2.3 reader.

---

## §4 Open-gap register (convergence blockers — pass 2 must close every one)

- **G1 — Safari `@starting-style` var-swap honesty.** Does Safari resolve the SWAPPED register
  custom properties (`--reveal-spring/--reveal-clock/--glass-reveal-enter-scale/-blur`) inside
  the `@starting-style` block at first paint on reka's mount-already-open path — or does a
  register-bound overlay one-frame-pop? Close: P1 frame-series on real Safari + Chrome, both
  modes, all three enter registers. THE gating risk for the whole register model.
- **G2 — CSS↔JS tempo coherence.** `motionTempo(el)` wired into `useSpring` / `useSpringPress`
  / `useDockOrientationMorph` / `useDrawerSnap` (`response *= tempo`); prove a CSS dropdown and
  a JS dock morph co-scale in proportion at tempo 0.85 and 1.2. Close: P2 capture + a
  `proof:motion-one-clock`-class assert.
- **G3 — the tempo DEFAULT (the A/C conflict).** 1.0 identity (A) vs 0.88 seeded-tighter (C).
  Interacts with the just-landed BD.W-ANIM-IOS27-TUNE deliberate weight. Close: P2 A/B at
  0.80/0.88/1.0 with the loud scopes pinned 1.0, judged against the user's "a bit tighter";
  also measure the tempo floor/ceiling (90%-travel ≥ ~80ms at 0.8; no dead sub-pixel tail
  at 1.4 — the canon quick-is-arrival note).
- **G4 — the regen round-trip.** The `-settle` + reader-block emission must leave
  `proof:spring-tokens-synced` + `proof:animation-coherence` green with ZERO consumer diffs
  (the reader keeps the `-duration` name). Close: P2 runs `regen-spring-tokens.mjs` + the gate
  suite.
- **G5 — the TRUE literal-violation list.** Run the widened detector over HEAD; tune the
  continuous-loop / JS-`:style` / draw-literal exemptions until only genuine transition
  orphans remain (§3.1: the A list is partly comments). Close: P4 output = the binding
  migration list.
- **G6 — command-jitter residual.** After the R5 clock-fix + lift-decouple, does a typing
  frame-series still jitter (reka `scrollIntoView` per keystroke)? Close: P3 capture; if yes,
  the further fix is scroll-anchoring/`block:'nearest'`, not curve work.
- **G7 — drawer-lag root cause.** Profile the open/drag/settle against `DRAWER_SNAP`
  {0.5, 0.74} (§3.2): spring response vs gesture handoff vs a non-compositor channel. Decide
  whether the drawer joins the tempo axis or holds pinned deliberate weight. Close: P2 trace
  (CDP Layout-flat + frame timings) + a re-tune only if the number says so.
- **G8 — the actual bouncy sheet-divider surface.** Library `SheetHeader.vue` has no divider;
  find the offending demo/consumer rule, re-point onto `.draw-rule`, and record the ≥2-member
  register evidence (divider + the named existing draw members). Close: P3.
- **G9 — the press-register census.** Beyond AccordionTrigger, enumerate every `tap-squish` /
  press-scale binding and assert bounded-control-only (the R1 rule as a gate arm). Close: P3 +
  the gate extension.
- **G10 — the register-to-surface assignment table.** Which register each of the ~9 overlay
  surfaces binds (esp. Popover: focal vs `menu` — the ask reads both ways; HoverCard:
  `tooltip` vs `menu`), decided by side-by-side capture and recorded as the binding table in
  the canon. Close: P1 capture review.

---

## §5 Pass-2 prototype slate

| # | Prototype | Family | Risk it proves |
|---|---|---|---|
| **P1** | `motion-registers.css` + `.glass-reveal` curve/clock tokenization + `data-motion` wired on real Popover / DropdownMenu / Tooltip; enter frame-series on real Chrome AND Safari (`:5199` demo, both modes) | HYBRID (A binding, C tokenization) | G1 (Safari @starting-style var-swap), G10 (assignment), the "visibly distinct registers" differentiation the ask wants |
| **P2** | Tempo end-to-end: regen `-settle`/reader emit + `@property --motion-tempo` + `motionTempo(el)` in useSpring/useDockOrientationMorph/useDrawerSnap + a `/motion/tempo` demo route (live 0.7→1.3 slider over dropdown + popover + dialog + draw-rule + JS dock morph + repaired accordion); captures at 0.85/1.0/1.2; gate suite green (`spring-tokens-synced`, `animation-coherence`, `no-layout-animation`) | C | G2 (CSS↔JS co-scale), G3 (default calibration), G4 (regen round-trip), G7 (drawer trace rides this route) |
| **P3** | The five repairs live: R1 accordion (no horizontal jump on press), R5 command palette typing frame-series before/after, `.draw-rule` + the located sheet divider; before/after captures both modes | C | G6, G8, G9 + proof the register model resolves the user's named defects |
| **P4** | The widened `proof:animation-coherence` arms run over HEAD → the exact violation/migration list, exemptions tuned, self-test bites planted | A | G5 (the true literal census; kills the stale enumeration) |

P1+P2 are the convergence gate: if G1 fails on Safari the binding mechanism falls back to
per-register `@starting-style` blocks (same table, fatter CSS — a known, honest fallback, not
a redesign); if G2 fails the tempo axis ships CSS-only with the JS surfaces pinned (explicitly
recorded, not silently divergent).

---

## §6 Design-quality bar (binding fences)

- **Compositor-only** (canon P5): every register animates scale/translate/opacity/filter
  longhands; draw-in is scaleX/clip-path, never width. `proof:no-layout-animation` green by
  construction.
- **PRM absolute** (P6): all registers funnel through the existing `a11y-overrides.css`
  universal carve + recipe-local keep-fade/drop-transform; draw-in snaps drawn; JS springs
  `respectReducedMotion` endpoint-seat. Tempo is a no-op under reduce.
- **Safari-honest / no masking fallback**: `linear()` (17.2+), `@starting-style` (17.5+),
  `allow-discrete` (17.4+) are Baseline and already shipped; the degrade is
  appear-in-one-frame, never hidden. No `@supports`-gated second path; the register swap is a
  plain custom-property re-point with no silent-no-op surface (deliberately NO style-queries).
- **KISS/DRY**: ONE recipe body (`.glass-reveal`), ONE spring source (SPRING_PRESETS + regen),
  ONE new token file, ONE new draw-in recipe, ONE gate extended (never forked). No second
  engine anywhere.
- **Clean breaks, no aliases**: accordion `tap-squish` dropped (no shim); ad-hoc divider
  bounce folded onto `.draw-rule`. The `-settle`/`-duration` split is NOT a consumer break —
  the public name is preserved as the generated reader (deliberate, recorded).
- **Warm identity untouched**: motion-only reform; zero color/plate/tint edits.
- **House axes respected**: `--motion-tempo` (TIME) ⟂ `--motion-weight` (MAGNITUDE) ⟂
  `--ui-scale` (GEOMETRY) — three registered inheriting scalars, never folded.
- **No speculative substrate**: every register rung has ≥2 consumers or a named repair at
  mint; `press`/`morph`/`cascade`/`exit` are names over shipped recipes.

## §7 File map

**New:** `src/styles/tokens/motion-registers.css` · `src/styles/draw-in.css` ·
`src/composables/motion/motionTempo.ts` (~10 lines).
**Extend:** `scripts/regen-spring-tokens.mjs` (settle + reader emission) ·
`src/styles/tokens/scheme-spring.css` (generated blocks) ·
`src/styles/tokens/property-regs.css` (`--motion-tempo` reg) ·
`src/styles/glass/reveal.css` (curve/clock tokenization + `data-motion` variants) ·
`src/styles/menu.css:58,67` (R5) · `src/styles/transitions.css` (clock re-points) ·
`src/components/ui/accordion/AccordionTrigger.vue:27` (R1) · the overlay content SFCs
(`data-motion`, 1 line each) · `scripts/proof-animation-coherence.mjs` (three arms) ·
`docs/precepts/motion-canon.md` (the §register-table section; P1-P7 unchanged).
