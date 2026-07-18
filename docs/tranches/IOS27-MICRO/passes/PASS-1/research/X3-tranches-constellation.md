# X3 — the tranches hitherto + the sibling constellation (IOS27-MICRO pass 1, research)

verified-model: claude-fable-5
Seat X3, 2026-07-18. Inputs read in full: `analysis/MARKS.md`, `CHARTER.md`,
`BJ/formation/greenfields/GF-DOCK-PASS3.md` (REFABLE redo — claims treated as unverified),
`BJ/formation/ios27/IOS27-CODEX.md` (same caveat), `BJ/PLAN.md` (the liquid-weight +
breath-of-life laws + §3-§5), the glass-ui motion/dock source at HEAD, and a READ-ONLY sweep of
the sibling repos under `/Users/mkbabb/Programming` (atlas, slides, slides-K, speedtest,
value.js, bbnf-buddy, keyframes.js, sci-report, muster, fourier-analysis, feedback-coder).
The approach-family registry was not read (per seat charter).

---

## 1. What the repo already holds — the in-tree prior art, per hallmark

The task's six hallmarks land on a surface that is NOT empty. The velocity/momentum story in
particular already exists in four scattered forms; the new facility is a unification problem
before it is an invention problem.

### 1.1 The spring register (the one clock authority)
- `src/composables/motion/spring/springPresets.ts` — SPRING_PRESETS, 7 rows
  (smooth/snappy/bouncy/gentle/dock/press/transient), the no-second-authority root; the CSS
  `--spring-*` token generator and every JS consumer read this one table.
  **Current dock row: (response 0.30, ζ 0.82).**
- **Discrepancy flagged:** MARKS.md §2 cites the overpull springback as "kin to glass-ui's
  springPreset('dock') {0.68,0.64}" — that pair is the BG-era value, retuned since. The
  measured iOS overpull register (ζ≈0.5–0.65, ~2–2.5Hz, one visible overshoot, settle ≤250ms)
  matches NEITHER the current dock row (0.30/0.82 — stiffer, more damped, no overshoot read)
  nor bouncy (0.60/0.60 — too slow). An overpull/detent register is likely a NEW pair; the
  "presets-in-consumers" law in the same file governs where it lives (per-primitive local
  defaults stay local; only a genuinely shared register earns a global row + CSS token).
- `springProjection.ts` — spring → CSS linear() stops (48 samples, 2% settle band); any new
  register that wants a CSS arm rides this path for free.
- `motionTempo.ts` — `--motion-tempo` is the ONE registered inheriting TIME scalar; the fence
  is explicit: `--motion-tempo` (time) ⟂ `--motion-weight` (magnitude) ⟂ `--ui-scale`
  (geometry), never folded. A desync multi-clock facility (hallmark 5's fade-4x-faster-than-
  stretch) is a new dimension NOT covered by tempo — tempo co-scales all clocks together,
  which is exactly what the desync law forbids batching into one.

### 1.2 The four existing velocity/momentum systems
1. **kf `Draggable`** (`keyframes.js` 6.0.0, `src/animation/orchestration/drag/draggable.ts`) —
   pointer-capture follow, velocity-windowed sample buffer, snap-aware fling (`DragOptions.snap`
   re-seats the spring toward the nearest declared target from `(value, releaseVelocity)`).
   glass-ui's law: it wires this, owns no hand-rolled sampler (the useDragMorph D1/D2 fence).
2. **`SpringProgress` analytic velocity** — `useDockSpring` (`components/dock/composables/`) is
   the sole `new SpringProgress` site for the dock band; `onFrame(value, velocity)` exposes live
   analytic velocity; velocity-continuous re-base on interruption; PRM = one-frame jump
   (`respectReducedMotion: true`). `useDockMorph` complements position AND velocity on
   mid-flight reversal.
3. **`usePointerVelocityField`** (`motion/pointer/`, ships on engine-free `/motion-core`) — the
   full derived chain: smoothed position → velocity → acceleration → flick `burst` +
   `engagement` envelope + a hand-rolled mass-spring-damper `attractor`. Push-API only
   (`tick(delta)` fed by the host's existing rAF — the no-own-rAF discipline); PRM = tick(0)
   freeze; frame-rate independent (per-second derivatives). Today consumed by the procedural-viz
   family only.
4. **`useLiquidFlex` + `writeVelocityWeight`** (`motion/spring/`, `motion/core/`) — the
   saturating `tanh(|ṫ|·k)` velocity term → `--flex-vel` (registered `inherits:false`, one
   element invalidated) → transient `--motion-weight` boost (rest 0.618 = 1/φ, fast travel
   →~0.96, self-extinguishing). "Elements morph MORE the faster they move" is already the
   single-scalar law; site-local cap derivation off the element's own token.

The exhortation's hallmark 6 ("MOMENTUM and VELOCITY and ACCELERATION tracking … ALL of our
components should have such a facility") is therefore best read as: one published facility that
unifies 1–4 (or composes them behind one contract), not a fifth parallel system. The pointer
field already carries acceleration; the drag/fling path already carries release velocity; what
no component-facing surface carries today is **gesture-position scrubbing with velocity-seeded
release** as a generic contract (MARKS §6 design note 1: position under gesture = scrub,
position after release = spring seeded with release velocity).

### 1.3 The dock/morph surface at HEAD
- `GlassDock` + `useDockShellProps` (`startCollapsed`/`collapseDelay`/`alwaysExpanded`,
  `DockBackdropMode`, `DockInteraction`) + exposed `expand()`/`collapse()`/`expanded` — the
  template-ref API atlas wraps.
- `useDockMorph` (outer face → shared `--dock-morph-t` scalar), `DockCrossfade` (two-child
  opacity overlap on `--dock-t`, measure-once peak reserve), `DockLayerGroup` (`railHolds`
  reference-count = `keepOpen()`), `useDockClickIntegrity` + `useDockTouchGate` (wired INSIDE
  GlassDock since 3.13.0 — slides depends on that wiring).
- `useSelectionIndicator`/`useSelectionGroup` — the traveling pill, velocity-continuous,
  `--stretch` travel-squish; GF-DOCK-PASS3 §7 concedes this is at-parity reuse, NOT the
  eyeglass lens (magnification, press-charge bloom, oversized arrival, chromatic rim — all
  absent; the refractive register is a flagged ASK intersecting the Q051 `filter:url()` gate).
- Motion primitives on `/motion`: `useSpring`, `useSpringMount`, `useLiquidPress`,
  `useSpringPress`, `useDragMorph`, `useElementMorph` (the single FLIP runner),
  `useLiquidReveal`, `useBloomUp`, `useDockCtaReceive`, the numeric family. On `/motion-core`:
  `useLiquidFlex`, `useLeadTrail`, `usePointerVelocityField`, `useRoutePointer`, `useStagger`,
  `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`, `useReducedMotion`,
  `useIntersectionPause`, `useViewTransition`, `useYieldToMain`, `motionTempo`,
  `writeVelocityWeight`.
- **Codex name-rot note:** codex law 9 says "extend useLiquidMorph to named x/y/z scalars" —
  `useLiquidMorph` does not exist anywhere in the tree at HEAD. The nearest live surfaces are
  `useLiquidFlex` (velocity term) and `useElementMorph` (FLIP runner). The codex predates the
  BI restructure; treat its API names as stale, its laws as the durable part.

### 1.4 Per-hallmark gap census (exists / missing)
| hallmark | exists at HEAD | missing vs MARKS |
|---|---|---|
| 1 dock→card growth | `useDockMorph` on DOCK_SPRING; DockCrossfade | the height-keyed reveal ladder (per-element fade+rise as a function of expansion fraction); sides-breathe +4–5% with pinned bottom; icons emerging clipped from the bottom margin |
| 2 magnetic overpull | `useDragMorph` fling-snap; `--stretch` caps | overpull past a bound with VOLUME compression (content deforming with container, bottom-anchored); asymmetric bound stiffness (−21% vs −1%); the pre-commit ~40px taffy zone; one-overshoot springback register |
| 3 liquid tab lens | `useSelectionIndicator` `--stretch` neck | continuity as ONE body (bridge, never blink); press-charge bloom + whole-bar glow; oversized arrival + cool-down; ~5–8% magnification; chromatic rim; sibling legibility under the bloom (the best-iOS move) |
| 4 two-tier material | glass tokens, `--radius-dock`, the 7px shared blur; BAND-MATERIAL owns the ladder | the explicit container-vs-control two-tier budget as tokens; 1px top rim light as a named role; specular-only-on-engagement enforcement |
| 5 desync multi-clock | nothing named — every choreography rides ONE spring scalar | three channels three clocks (blur cliff ≤100ms / fade / stretch ~1:4); close inversion + the empty-blur beat; depth-graded travel (+20%/row); scrub-interruptible with the medium persisting across cycles |
| 6 momentum facility | the four systems of §1.2 | ONE component-facing contract: scrub-under-gesture, velocity-seeded release, magnetic detents crossed at speed (~170ms catch), overshoot only when arriving fast |

---

## 2. What has been tried and what failed — the lesson ledger this campaign inherits

- **The AW halt (the founding trauma):** headless-green/visually-broken — dock broken, specular
  extreme, aurora dark — every gate green. Consequence: the live-π discipline (PLAN §3) — a
  visual claim needs a captured DELTA (screenshot + paired-π), screenshot/computed-style only,
  NEVER `getContext` on a live canvas (context-steal), localhost not 127.0.0.1, oklab parsing in
  the paint arm, ONE serialized browser seat. Any IOS27-MICRO prototype claim is bound by this.
- **Dock history:** 3.4.0 dock-collapse fix was container-type removal; the 2026-06-10 six-verdict
  batch (dock re-architecture, morph hover flicker, iOS hover register, dynamic darkening); the
  slides-M dock-lag root-fix loop closed only when 3.13.0 wired `useDockClickIntegrity` inside
  GlassDock and slides retired its interim guards. Lesson: dock physics defects were repeatedly
  cured by MOVING logic into the library, with consumers then deleting their workarounds — the
  overpull/growth facility should expect the same adoption pattern.
- **The broken-4.0 dual-driver race** (recorded in atlas `useDockCollapse` header): two drivers
  on the collapse state + content-blur-at-rest; retired at the BC close by making the morph
  layout-isolated. Lesson: ONE spring owner per surface (`useDockSpring`'s whole design) — the
  multi-clock facility must desynchronize CHANNELS without re-minting multiple owners of one
  geometric scalar.
- **CSS traps with prior blood:** `light-dark()` inset-shadow fragments compute the whole
  box-shadow to none (plain per-mode arms only); Vue scoped `:global(.dark) .x` silently drops
  (3rd recurrence); no masking fallbacks — primary works in paint or fails loud.
- **Q051 / Safari:** `filter:url()` goo is user-gated (fission fork parked both ways); GF-DOCK
  keeps every non-gated wave free of it; the `--stretch` neck is the delivered no-filter
  approximation. The lens hallmark (3) will press on this gate again — the codex's "metaball
  necks never crossfade" vs Safari 2026 filter risk is the standing tension.
- **GF-DOCK-PASS3 (62%, REFABLE redo — unverified):** the snap-detented filmstrip model, the
  `role="toolbar"`+roving keyboard decision, census-anchored occlusion, α/β/γ dissolved. Every
  π obligation OWED, zero paint. This campaign's findings feed its pass-4 (CHARTER). Even
  under REFABLE, two of its constraints look durable because they are grounded in user feedback
  rows, not design taste: the block axis provably dead (F27) and no feelable interior scroll
  (codex law 6 kin). A dock-to-card growth prototype that adds vertical gesture travel must not
  re-open F27 — the growth is the CARD's travel, not a dock scroll.
- **Open defects shipped into 7.0.0:** V-A95 (reverse-drag black backdrop present-race) and the
  chip/glass-atom @import orphan. Neither blocks this campaign but both sit on surfaces
  (aurora canvas, chip CSS) a prototype page might touch — do not diagnose their symptoms as
  new choreography bugs.
- **The PLAN-level laws verbatim-relevant here:** liquid-weight (ALL motion carries
  inertia/weight/bounce; a wave shipping weightless motion fails challenge on this law alone)
  and breath-of-life (every component displays engagement at rest and on interaction; the PRM
  arm and compositor-only constraint are the law's own guardrails, not exceptions). Plus the
  A08/J11 law: every wave closes with a two-fresh-critic challenge pass. ≤3 concurrent seats;
  hallmark design work runs the DesignSync+Fable lane.

---

## 3. The consumer surface — contracts a new facility must not strand

Constellation dependents on `@mkbabb/glass-ui` (package.json census, this seat):

| repo | pinned | glass-ui surface consumed | strand risk for this campaign |
|---|---|---|---|
| **atlas** | 6.0.0 | `/dock`: GlassDock, DockTrigger, DockControl, DockSeparator; exposed `expanded`/`expand()`/`collapse()` via template ref; `useDockShellProps` knobs (`startCollapsed`, `collapseDelay`, `alwaysExpanded`); `/fading-scroll`, `/scroll-progress-rim`, `/dropdown-menu`, `/button`, `/controls`, `/drawer`; `/handmark` `HandShape` type; root `supportsViewTimeline` | HIGH — atlas `useDockCollapse` is a priority FSM (manual>register>scroll) wrapped AROUND the exposed dock API; it also mints its own `INSTRUMENT_SPRING` register. Renaming/removing the exposed collapse API or the shell props breaks a live wrap. Atlas also consumes kf directly (SpringProgress, NumericAnimation, ManualTimeline, RAFPlayback, MorphSVG) — a momentum facility that changes kf peer expectations touches it twice. |
| **slides / slides-K** | 3.13.0 | `/dock`: GlassDock, DockIconButton; `/button`; depends on `useDockClickIntegrity` wired INSIDE GlassDock (collapsed-tap pass-through scoping — DeckView comment); `deckSpring.ts` lazy-imports `@mkbabb/keyframes.js`; constellation deck has its own warp-spring physics | MEDIUM — anything that re-architects GlassDock's internal tap/touch gating re-opens the slides-M dock-lag class. Slides is 4 majors behind; its migration rides its own tranche per the consumer-updates ruling. |
| **speedtest** | ^4.0.1 | `/motion`: `useSpringPress` + `SpringPressRef` (pre-allocated outside v-for — R5 lesson recorded in-source); `/motion-core`: `useStagger`, `yieldToMain`, `startViewTransition`, `RAFLoopTiming`; direct kf: NumericAnimation, SpringProgress, SmoothProgress, ManualTimeline, ElementMorph, springTimingFunction, stagger; its Dock.vue is LOCAL (NumericAnimation), not GlassDock | MEDIUM — `useStagger` is on BJ REDUCTION W3's delete list (easing→demo, useStagger cut) while speedtest imports it from `/motion-core`: a live Q060 relay row, and a warning that "motion-core is engine-free plumbing" still has external consumers. Any reshaping of `/motion`//`/motion-core` membership by the momentum facility needs the family-B census first. |
| **value.js** | ^7.0.0 | root + `/forms` components only (demo/ui wrappers) | LOW — no motion contracts. The only ^7 consumer; everything else trails. |
| **bbnf-buddy** | ^3.9.0 | root components, `/dark`, `/toggle-chip`, `/sortable-list` | LOW for this campaign — but `/toggle-chip` no longer exists in the 7.0.0 export map (`/chip` does); already-stranded-at-bump, a pre-existing relay row, not this campaign's doing. |
| **sci-report** | — | consumes `@mkbabb/atlas` 4.0.0, not glass-ui directly | second-order only |
| **muster, fourier-analysis, feedback-coder** | — | no direct glass-ui dep at HEAD | Q060 rows are metric/kf-subpath relays, out of scope here |
| **keyframes.js** | peer ^6.0.0 | the engine AUTHORITY: Draggable (drag+snap fling), SpringProgress, NumericAnimation, SmoothProgress, ManualTimeline, ElementMorph, springTimingFunction; exports `.` + `./engine` | The standing law (motion barrel header): engine primitives are imported from kf directly; glass-ui never re-exports them. A momentum facility needing new engine capability (e.g. an overpull/rubber-band bound on Draggable, or a multi-clock group) lands in kf FIRST, then glass-ui wires it — the useDragMorph precedent (kf 5.1.0 grew `DragOptions.snap` for exactly this). |

**The governing contract laws (memory + PLAN, binding):** consumer dependence never preserves
an obsolete API — delete/shift on merit, the consumer updates via a marked addendum in ITS
tranche; cross-repo relays land BEFORE the breaking wave ships (the header-ribbon lesson);
sibling repos are READ-ONLY and never parked.

---

## 4. What the sweep implies for the six hallmarks (X3's synthesis)

1. **Build on the four velocity systems, do not add a fifth.** The universal facility is a
   published contract over: gesture scrub (kf Draggable follow), release-velocity seeding
   (SpringProgress re-seat — already the useDockSpring/useDragMorph idiom), derived
   acceleration (usePointerVelocityField's chain), and the CSS-visible velocity channel
   (`--flex-vel`/`--motion-weight`). The one genuinely new physics primitive MARKS demands is
   the **bounded overpull** (resistive displacement + volume compression + one-overshoot
   release) and the **magnetic detent crossed at speed** (~170ms weak-well catch) — both are
   engine-shaped (kf-first per the authority law), then wired.
2. **The multi-clock facility is new ground.** Nothing at HEAD runs desynchronized channels;
   `--motion-tempo` deliberately co-scales everything. The CC choreography (blur cliff ≤100ms,
   fade ~4x faster than stretch ~600ms, close inversion, medium persisting across interrupted
   cycles) needs per-channel clocks derived from ONE gesture scalar — which preserves the
   one-owner lesson (§2) while satisfying the desync law: one scalar, many response curves,
   never many owners.
3. **The reveal ladder is height-mapped, not time-mapped** (MARKS §6, Find My proof). That is a
   pure function of the expansion fraction — cheap, scrub-safe, PRM-trivial (the fraction still
   maps under instant snap). It composes with the existing `--dock-morph-t` scalar.
4. **The lens hallmark collides with Q051.** Press-charge bloom, oversized arrival, and
   magnification are achievable compositor-only (scale + filter-free glow via layered
   opacity/box-shadow); the continuous goo BRIDGE is the part that historically demanded
   `filter:url()`. GF-DOCK's `--stretch` neck is the sanctioned approximation; whether this
   campaign proposes more is a design call that must be written against the Q051 gate
   explicitly, not around it. iOS's own defect (sibling labels unreadable ~300ms under the
   bloom) is the stated best-it opening.
5. **Dock API stability matters more than dock internals.** Atlas and slides both wrap
   GlassDock's OUTER contract (exposed methods, shell props, internal tap-gating). The
   hallmarks land as new facilities + internal choreography; the exposed dock API should
   change only with family-B census + relay, per the ordering law.
6. **PRM and Safari floors are already idiomatic:** `respectReducedMotion` one-frame jump
   (springs), tick(0) freeze (pointer field), compositor-only transforms, no-own-rAF push
   APIs, rAF-delta 0 for idle motion, the R3b idle budget. The new facilities inherit these
   patterns rather than minting new gates.

---

## 5. Unknowns

Resolved this seat:
- The dock spring at HEAD is (0.30, 0.82) — MARKS' "{0.68,0.64}" kinship cite is the BG-era
  pair; the measured overpull register matches neither current row.
- `useLiquidMorph` (codex law 9's extension target) does not exist at HEAD — codex API names
  are stale post-BI-restructure; laws remain usable.
- Velocity/momentum tracking exists in four in-tree systems (kf Draggable, SpringProgress
  analytic velocity, usePointerVelocityField, useLiquidFlex/writeVelocityWeight) — the
  facility ask is unification, and the kf-first authority law governs any new physics.
- The full consumer strand map (§3): atlas (dock collapse wrap, HIGH), slides (click-integrity
  wiring, MEDIUM), speedtest (useStagger on the BJ delete list while externally consumed,
  MEDIUM), value.js/bbnf-buddy (LOW), sci-report/muster/fourier (none direct).
- No sibling repo consumes a glass-ui gesture/drag composable today — useDragMorph,
  usePointerVelocityField, and the dock springs have zero external importers; the momentum
  facility's design space is open in-library, constrained only at the dock component API.

Remaining (for later passes; not X3-resolvable):
- REFABLE's verdict on GF-DOCK-PASS3 — which filmstrip claims survive the redo; this campaign
  feeds its pass-4 but cannot assume its §4 geometry.
- Q051 row 1 (fission/`filter:url()`) — user-gated; bounds how the lens bridge may be built.
- Whether the overpull/detent register earns a global SPRING_PRESETS row + CSS token or stays
  a per-primitive local default (the presets-in-consumers seam) — a design ruling.
- Whether kf 6.x `Draggable` can express the resistive overpull bound (rubber-band ratio +
  compression channel) without engine changes — needs a kf-side read (engine internals not
  swept this seat).
- The exact rubber-band ratio and the 24fps springback fit (ζ, f) — MARKS lists both as
  under-resolved corpus moments needing denser bursts.
