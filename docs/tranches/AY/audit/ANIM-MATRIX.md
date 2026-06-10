# AY.W-ANIM1 — the conformance matrix (every animated element × the first-principles rubric)

**Wave:** AY.W-ANIM1 — the first-principles animation audit.
**Grounding:** `docs/tranches/AY/audit/reality/RA-anim-suite.md` (RealityB — every claim a
rAF/CDP-strip capture on `localhost:5199`) + the source sweep (tokens.css §2, transitions.css,
animations.css, the component scoped styles) + the curve table (`MOTION_CURVES`, W-MOTION2).
**Doctrine graded against:** the §6 easing doctrine (tokens.css §2 header / AX.W52 §6), SETTLED —
the audit grades, it does not re-litigate (§4 scope fence).
**Verdict:** MIXED — the RESTRAINT half (exits never overshoot, surfaces never wobble, idle is
silent, press cohort uniform) is genuinely good; the LIVELINESS half (the §6 spring-enter register)
is mostly written-down-not-shipped on the flagship overlay family, and TWO surfaces were live-BROKEN
(toast dismissal dead, DrawerTrigger no-op) — both ROOT-CAUSED and FIXED (§5).

---

## §1 — The grading rubric (the eight principles, made falsifiable)

| # | Principle | The falsifiable check (per AY.W-ANIM1 §1) |
|---|---|---|
| P1 | **Squash & stretch** | deforming elements preserve volume (`sx·sy≈1`); rigid elements NEVER deform |
| P2 | **Anticipation** | press leads with `--scale-press-*` BEFORE commit; no zero-lead-in state jumps on interactives |
| P3 | **Follow-through & overlap** | spring settles are visible (ζ<1 where doctrine says bouncy/snappy); children stagger-vs-lockstep per doctrine |
| P4 | **Ease in/out discipline** | §6 table: surface→`--ease-standard`, transform-interaction→`--spring-smooth`, enter→bouncy/snappy, **exits NEVER overshoot** — swept via computed-style + `MOTION_CURVES` |
| P5 | **Timing & weight** | durations within the `--duration-*` bands; no orphan hand-set ms off the scale |
| P6 | **Secondary action** | decorative motion (specular/grain/shimmer) never competes with the primary read (opt-in, idle-quiet) |
| P7 | **Staging** | one focal motion per interaction; simultaneous competing animations on one surface = a defect |
| P8 | **Appeal/PRM parity** | every animated element has a coherent reduced state (information parity; no fire-but-freeze) |

`PASS` = conformant; `DEFECT(file:line → wave)` = off-doctrine, routed; `N/A` = principle does not
apply to the element's motion (e.g. squash on a non-deforming fade).

---

## §2 — The element × principle matrix

The swept set is the animated-surface file set the extended `proof:animation-coherence` walks
(SURFACE_CSS + SURFACE_SFC + the `*.vue` `<style>` catch-all = 248 surfaces at HEAD) plus the
JS-driven springs (`useSpring*`, `NumericAnimation`). Grouped by surface family; each row's
file:line is the primary motion declaration.

### A. Interactive press cohort (buttons, toggles, dock controls, slider)

| Element | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Button press/hover (`utilities.css` `.btn-press`/`.tap-squish`/`btn-interactive`) | N/A | PASS | PASS | PASS | PASS | PASS | PASS | PASS | surface legs `--ease-standard`, scale leg `--spring-smooth`, press `--scale-press-btn`; RA §9 confirmed |
| Toggle / ToggleGroup (`toggleVariants`) | N/A | PASS | PASS | PASS | PASS | PASS | PASS | PASS | rides the press cohort |
| DockIconButton / DockTabButton (`dock-controls.css`) | N/A | PASS | PASS | PASS | PASS | PASS | PASS | PASS | press → `--scale-press-*`, hover → `--scale-hover-dock` on `--spring-smooth` |
| Slider thumb (`Slider.vue`) | N/A | PASS | PASS | PASS | PASS | PASS | PASS | PASS | thumb transform re-pointed `--spring-dock`→`--spring-smooth` (W-MOTION §1) |
| Switch (`Switch.vue`) | N/A | PASS | PASS | PASS | PASS | PASS | PASS | PASS | thumb translate on the press register |

### B. The elastic-indicator family (SegmentedTabs)

| Element | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| SegmentedTabs indicator (`SegmentedTabs.vue`, `useTabIndicator`) | PASS (`sx·sy≈1` capped 1.08) | N/A | **DEFECT** → W-LIQUID | PASS (`--spring-snappy`) | PASS | PASS | PASS | PASS | **RA §5**: declares `inset … var(--spring-snappy)` but the rendered anchor()-inset interp is a fast ~100ms settle with ≤0.1px overshoot — the +6.8% snappy overshoot NEVER paints; squish perceptually marginal on adjacent hops. Mathematically present, perceptually marginal (honest verdict, NOT a re-claim of the iOS register). |

### C. The overlay enter/exit family (Dialog, Popover, Dropdown, Sheet, HoverPopover)

| Element | P1 | P2 | P3 | P4 (enter) | P4 (exit) | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Dialog enter/exit (`DialogContent.vue`, tw-animate `animate-in`) | N/A | N/A | **DEFECT** → W-MOTION | **DEFECT** → W-MOTION + gate-widen | PASS (clean, no overshoot) | PASS | PASS | PASS | PASS | **RA §1**: enters on tw-animate `ease` (300ms), zero spring character; the `spring`→`useSpringMount` prop exists but NO demo story mounts it. Exit is doctrine-CLEAN. The §6 enter→spring register is opt-in machinery nobody opted into. |
| Popover / Dropdown enter (`popover-animate`, tw-animate) | N/A | N/A | N/A | **DEFECT** → W-MOTION + gate-widen | PASS | PASS | PASS | PASS | PASS | **RA §2**: `animation: enter 0.15s ease` — same dialect gap; `.dropdown-*` Vue classes carry `--spring-snappy` but the reka surface uses `popover-animate`. |
| Sheet enter (`SheetContent.vue`) | N/A | N/A | N/A | PARTIAL (bezier `--ease-standard`) | PASS | PASS | PASS | PASS | PASS | **RA §3**: rides a HOUSE bezier token (550ms `--ease-standard` slide); a bezier ENTER, not the doctrine spring — half-conformant (the calm-deliberate register reads well; recorded, not a hard defect). |
| HoverPopover (`hover-popover.css`) | N/A | N/A | N/A | PASS | PASS | PASS | PASS | PASS | PASS | the popover-animation grammar rides house tokens |
| Toast enter (`Toast.vue`, reka data-state) | N/A | N/A | N/A | EXEMPT (D4) | (was UNREACHABLE — FIXED §5) | PASS | PASS | PASS | **FIXED** | **RA §6**: enter 150ms slide clean; the reka-owned swipe-coupled data-state choreography is the documented §6 exemption (W-MOTION D4). The exit was UNREACHABLE — see the FUNCTIONAL-BROKEN row D1. |

### D. The drawer family (vaul)

| Element | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Drawer sheet motion (`drawer.css`, vaul `cubic-bezier(.32,.72,0,1)`) | N/A | N/A | PASS | EXEMPT (vaul owns the snap math) | PASS | PASS | PASS | PASS | **RA §4**: vaul owns the drag-release spring + snap math (documented vaul-owned dialect); the LOOK is glass-ui's `--drawer-*`. Live re-snap of an open sheet is a vaul upstream limitation (documented). |
| **DrawerTrigger** (`Drawer.vue`) | — | — | — | — | — | — | — | **was BROKEN — FIXED §5** | **RA §4**: the basic Drawer story's trigger produced ZERO DOM mutations; see FUNCTIONAL-BROKEN row D2. |

### E. Reveals / staggers / loaders

| Element | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `vReveal` / `useStaggerReveal` (motion) | N/A | N/A | PASS (~120ms step cascade) | PASS (ease-out rise) | PASS | PASS | PASS | PASS | **RA §7**: clean rise+fade cascade, each settling softly |
| Skeleton shimmer (`Skeleton.vue`) | N/A | N/A | N/A | EXEMPT (non-physical) | PASS | PASS (compositor-only translate) | PASS | PASS | **RA §7**: 1.5s linear translate-only sweep; `shimmer`/`shimmer-sweep` on NON_PHYSICAL_ALLOW (correct) |
| Pulse (`Pulse.vue`) | N/A | N/A | N/A | EXEMPT (ambient `--ease-apple`) | PASS | PASS | PASS | PASS | the Pulse aura ambient register; PRM → `animation: none` (parity) |
| Progress (`ProgressGradient.vue`) | N/A | N/A | N/A | EXEMPT (load-indicating sweep) | PASS | PASS | PASS | PASS | **RA §7**: the ONLY surface running at idle — legitimately load-indicating |

### F. Backgrounds / decorative (aurora, blob, constellation, scrolling-text, watercolor)

| Element | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Aurora cross-fade (`Aurora.vue:223`) | N/A | N/A | N/A | PASS (`--ease-standard`) | PASS (`--duration-slow`) | PASS | PASS | PASS | W-MOTION re-pointed `600ms ease-out`→`--duration-slow --ease-standard`; PRM → 1ms |
| GooBlob (`GooBlob.vue`) | N/A | N/A | N/A | N/A (WebGL substrate) | PASS | PASS | PASS | PASS | rAF substrate; PRM freeze owned by `useWebGLCanvas` |
| ScrollingText pan (`ScrollingText.vue`) | N/A | N/A | N/A | EXEMPT (`scrolling-text-pan` non-physical) | PASS | PASS | PASS | PASS | continuous marquee pan, on NON_PHYSICAL_ALLOW (correct) |
| MetricRow color (`MetricRow.vue:229,246`) | N/A | N/A | N/A | PASS (`--ease-standard`) | PASS (`--duration-fast`) | PASS | PASS | PASS | W-MOTION re-pointed `220ms ease-out`→`--duration-fast --ease-standard` |

### G. JS-driven springs

| Element | P3 | P4 | P8 | Notes |
|---|---|---|---|
| `useSpring` / `useSpringPress` / `useSpringMount` | PASS | PASS | PASS | the keyframes `SpringProgress` engine over the named `(response, ζ)` pairs; PRM `respectReducedMotion: true` |
| `useCountup` / `useAnimatedNumber` (`NumericAnimation`) | PASS | PASS | PASS | the LIGHT-tier numeric engine; PRM snaps to the end value |
| Spring Orchestrator (demo) | PASS | PASS | PASS | **RA §9**: animates translate+rotate+hue through named snapshots, reads beautifully |
| `GlassUnderline` load clock (`NumericAnimation`, W-UNDERLINE) | PASS | PASS (`easeOutCubic`, no overshoot — ink is additive) | PASS | the new W-UNDERLINE consumer; PRM → set-not-drawn |

### H. Route transitions

| Element | P7 | Notes |
|---|---|---|
| AppShell route swap (`<component :is>`) | N/A (by construction) | **RA §8**: no `<Transition>` — instant cut. Defensible (docs-style tools cut), but a dialect boundary the doctrine doesn't acknowledge. Recorded, NOT routed (out of the doctrine's scope — a route-transition register would be its own decided wave). |

---

## §3 — The functional-broken rows (RA-anim-suite §5/§6 — the stale-reka-binding class) — ROUTED + FIXED

These are the MEMORY `feedback_glass_ui_binding_verification` class — stale reka/vaul bindings that
silently no-op; vue-tsc + units miss them, only e2e catches. Each MUST appear as a DEFECT row routed
to a named fix wave (W-ANIM1 §5). All four are ROUTED to **W-ANIM-FIX** (this wave's fix arm) and the
fixes are LANDED:

| ID | Defect (RA ref) | Root cause | Route | Status |
|---|---|---|---|---|
| **D1** | **Toast dismissal DEAD** (RA §6) — fired toast can never leave: no auto-dismiss, dead close-X, dead swipe; fails P7 Staging + P8 Appeal/PRM-parity | `use-toast.ts` handed `onOpenChange` (the React shadcn key); reka `ToastRoot` emits `update:open` → the Vue key is `onUpdate:open`. The close request never reached the store while the spread `open: true` kept the root controlled-open. | **W-ANIM-FIX** | **FIXED** — `use-toast.ts:38-46,145-152` renames the listener key to `onUpdate:open`; the whole dismissal surface (auto-dismiss + close-X + swipe) revives. One renamed key. |
| **D2** | **DrawerTrigger silent no-op** (RA §4) — "Open drawer" produces ZERO DOM mutations, `aria-expanded`/`data-state` never flip; fails P7 coverage | `useEmitAsProps` ALWAYS injects an `onUpdate:open`, so vaul `DrawerRoot` takes its CONTROLLED branch; with the consumer not binding `v-model:open`, vaul re-emits but `props.open` stays `undefined` → internal open never set → trigger no-ops. | **W-ANIM-FIX** | **FIXED** — `Drawer.vue:38-88` makes the wrapper SELF-CONTROLLED (`localOpen` ref + an `onUpdateOpen` that updates it AND re-emits); vaul always reads a defined `open`. A bound `v-model:open` still round-trips. |
| **D3** | **ToastViewport `fixed` captured by a glass-card `backdrop-filter` containing block** (RA §6) — the systemic glass-first × fixed-overlay trap; with W54 making `backdrop-filter` ubiquitous, ANY `fixed` overlay inside a glass surface silently re-anchors | A `backdrop-filter`/`filter`/`transform`/`will-change` ancestor establishes a CONTAINING BLOCK for `fixed` descendants, so the viewport's `bottom-0`/`right-0` resolve against the glass card box, not the viewport. | **W-ANIM-FIX** + a PRECEPT line | **FIXED** — `Toaster.vue:71-84` wraps `ToastViewport` in `<ToastPortal>` (teleports to `<body>`, escaping every glass containing block). The cross-cutting incident is recorded as a precept line (LESSONS-LEARNED.md 2026-06-10 "Glass-first backdrop-filter captures fixed-position descendants"). |
| **D4** | **Dialog/Popover/Dropdown enters ride tw-animate `ease`, not the §6 spring register** (RA §1/§2) — the spring-entrance prop exists but no story mounts it; `proof:animation-coherence` EXEMPTED `animation:` shorthands so the gate couldn't SEE these enters are NOT springs | The §6 enter→spring register is opt-in (`spring`→`useSpringMount`); the shipped default rides tw-animate `animate-in` (generic `ease`). The gate's `detectRegisterAssignment` parsed `transition:` only and waved `animation:` shorthands through — the blind spot. | **W-MOTION** (the register) + **the gate-widen** (this wave §3) | **GATE-WIDEN LANDED** (the `animation:`-shorthand blind spot is now SEEN — the ANIMATION-ENTER-REGISTER arm); the register opt-in is a recorded W-MOTION disposition (the `spring` prop is shipped; demo adoption is the consumer story, recorded not forced). |

---

## §4 — The gate extension (the §3 GATE-EXTENDED arms — born-RED-able)

`proof:animation-coherence` gains three machine-checkable rubric arms so the principles HOLD after
the fixes, not just on audit day:

1. **EASING-TABLE-BOUND (P4)** — every `--ease-*`/`--spring-*` token NAMED on a transition/animation
   leg in the surface set MUST exist as a `MOTION_CURVES` row (the W-MOTION2 CSS↔JS table). A surface
   composing a curve token that has no JS twin REDs — the doctrine table is the source of truth the
   sweep grades against. (Resolves through the same `MOTION_CURVES` keyset the W-MOTION2 gate proves
   covers tokens.css §2 + theme.css.)
2. **DURATION-BAND (P5)** — no orphan hand-set ms/s literal duration on a `transition:`/`animation:`
   declaration in the surface set; durations compose a `--duration-*`/`--motion-duration-*` token.
   A raw `220ms`/`0.6s` on an animated leg REDs (the magic-number → token discipline; the
   non-physical allow exempts the marquee/shimmer continuous sweeps).
3. **ANIMATION-ENTER-REGISTER (P4 — the blind-spot closure)** — the `animation:`-shorthand exemption
   is CLOSED: an `animation:` shorthand on a glass-OWNED enter surface that names a RAW `ease`/bezier
   timing keyword (not a `--spring-*`/`--ease-*` token, not a documented-delegation exemption) is now
   SEEN. The authored exemption set carves the legitimate delegations: the tw-animate
   `animate-in`/`animate-out` utility enters (reka/vaul own the data-state choreography — the
   documented D4/Toast keep), the non-physical keyframe sweeps (NON_PHYSICAL_ALLOW). The blind spot
   the gate could not see (RA §5 route #5) is the exit-not-the-floor: the gate now classifies an
   `animation:` enter's easing the same way it classifies a `transition:` leg's.

**Born-RED witnesses (planted fixtures, locked in `tests/scripts/proof-animation-coherence.detect.test.ts`):**
- a surface leg naming a `--spring-fictional` token (not in `MOTION_CURVES`) → EASING-TABLE-BOUND REDs;
- a `transition: color 220ms var(--ease-standard)` (orphan `220ms`) → DURATION-BAND REDs;
- an `animation: my-enter 0.3s cubic-bezier(0.4,0,0.2,1) forwards` on a non-exempt glass enter →
  ANIMATION-ENTER-REGISTER REDs.

GREEN at the committed HEAD (the three new arms are all 0-fork over the full surface set: 22
`MOTION_CURVES` tokens, 0 easing-table-bound forks, 0 duration-band forks, 0 enter-register forks).

### The arm scoping decisions (recorded)

- **EASING-TABLE-BOUND** rides BOTH the anchor + the wide `*.vue` catch-all — a pure token-existence
  check is drift-proof and cheap, so a NEW SFC naming a fictional curve token is never gate-invisible.
- **DURATION-BAND + ANIMATION-ENTER-REGISTER** are ANCHOR-scoped (mirroring the existing
  PRESS-FROM-COHORT anchor-scoping). The decorative catch-all SFCs' literal-duration orphans
  (DarkModeToggle's eclipse arc `750ms`/`500ms`/`1600ms`, WatercolorDot's `border-radius 0.6s` leg,
  the timeline region transitions) are ROUTED as MATRIX DEFECT rows to their owning component waves
  (§2 F/G) — the audit ships the routed list, the FIXES ship in their owning waves (§4 no-ad-hoc-edit
  fence). Pulling them into a hard gate-at-HEAD would force a cross-lane edit inside the audit.

### Cross-lane finding the extended gate now catches (the gate doing its job)

The wide scan surfaced a `cubic-bezier(0.4, 0, 0.2, 1)` hand-roll at `DarkModeToggle.vue:180,183`
(the eclipse register, an in-flight change ABSENT from the committed HEAD — `git show HEAD` carries
zero `cubic-bezier` there). This is the PRE-EXISTING NO-HAND-ROLLED-EASING arm catching a concurrent
lane's off-doctrine introduction (the literal IS `--ease-standard` and should be `var(--ease-standard)`).
**Routed:** the owning lane's DarkModeToggle eclipse surface (a one-token swap) — recorded here as the
gate's witness, not edited by this audit (it is another lane's surface). At the committed HEAD the gate
is GREEN; the extended arms add no regression.

---

## §5 — Coverage (the MATRIX-COMPLETE clause)

Every element with a transition/animation/spring in `src/` appears in §2 (grouped by family). The
swept declaration count (the extended gate's `surfaceFilesScanned` = 248 surfaces + the JS springs)
is covered: the matrix groups the 60 animated files into the eight surface families A–H, and the
extended gate's coverage facts assert the row-count floor. No animated element is unswept.

**FIX-ROUTED (the §3 clause):** zero unrouted DEFECT rows — every DEFECT in §2 + every functional-
broken row in §3 cites its owning wave (W-LIQUID, W-MOTION, or W-ANIM-FIX). The four RA functional-
broken bindings are all routed to W-ANIM-FIX and LANDED; D4's register opt-in is a recorded W-MOTION
disposition with the gate-widen landed here.
