# WAVE-AMENDMENT — the SCROLL-CHOREOGRAPHY system

> The CONCRETE tranche amendment, reconciled against the extant ~116-wave union set
> (`docs/tranches/BD/union/waves/` + the BB/BC scroll waves it threads). Reference implementation:
> `GOLDEN.md` (the three challenges FOLDED via `DELTA-ASSAY.md §3`). Each amended/new wave references
> the GOLDEN + carries a real born-RED gate. NO duplicative work — the scroll waves already exist and
> OWN their scope; this amendment SHARPENS them with the live-proven dead-pin + the keyframes.js
> liquid-weight spine + the `/motion-core` carve-out fix + the warm-glass/cartoon gestalt repair.

---

## Reconcile summary (disposition by wave)

| Wave (filename) | Disposition | What changes |
|---|---|---|
| **`BD.W-SCROLL-LIQUID-ENGINE.md`** (NEW) | **AUTHOR** | the engine seam (`useScrollScene` + `useScrollPin`) + the `--pin-t` pin re-invention + `--scroll-scrub`/`--ease-scroll-spring` tokens + the spring-scrubbed cascade easing swap + the warm-glass + cel-cast repair on the REAL component + the cross-engine JS-floor + the `./motion-curves` chrome route. The born-RED gate. |
| `BB.W-SCROLL-MOTION.md` | **AUGMENT** | DELETE the `--gl-pin` named timeline + `timeline-scope` gate; rewrite the pin phases as `--pin-t` readers (universal); KEEP `.scroll-build` + the `view()` cascade. |
| `BC.W-SCROLL-TRIGGER.md` | **AUGMENT** | the continuous `progress` ramp delegates to `useScrollScene` (scrub weight); discrete crossings + flip-delta + velocity/direction KEPT byte-for-byte; `scrollReader` REUSED. |
| `BC.W-SCROLL-CHROME.md` | **AUGMENT** | the scroll-stop snap + `collapseT` ramp carry spring weight via the **`./motion-curves` CSS curve** (NOT a JS import — keeps `/motion-core` keyframes-free); persistent-by-default KEPT. |
| `BD.W-SCROLL-FLUIDITY.md` | **REFRAME** | the rail slow-glide IS the `--scroll-scrub` `SmoothProgress` scrub; reconcile the no-Lenis fence with kf-as-the-sanctioned-in-house-smoother. |
| `BD.W-SCROLL-MINIMIZE.md` | **REFRAME** | the dock direction-read FEEDS `useScrollScene`'s direction/velocity (one reader); the collapse snap becomes the curve settle. |
| `W-LIQUID-ENTRANCE-GENERAL.md` | **CROSS-LINK** | it OWNS the `.scroll-build`/`.scroll-cascade` SQUISH keyframe edit (its Bug B). This scope does NOT re-edit those keyframes — only the cascade `linear → --ease-scroll-spring` EASING swap + the Safari-degrade-to-cel-slam `@supports`-else. |
| `BD.W-FLIP-SPINE.md` / `BD.W-MORPH-PUNCH-TOKENS` (ledger-named, not on disk) | **CROSS-LINK / DEPEND-ON** | `asElement` resolver idiom (FLIP-SPINE); `--motion-weight` + `--ease-cartoon-punch` via `var(…, fallback)` (MORPH-PUNCH-TOKENS — the SOLE authority, never re-authored). |
| every other wave | **NO CHANGE** | nothing else touched. |

**Net: 1 NEW author wave (2 new leaves) + 3 AUGMENT + 2 REFRAME (existing) + 2 CROSS-LINK + 1 DEPEND-ON.
ZERO re-fork, ZERO dup of the entrance-reveal squish scope, ZERO legacy alias.** The dead `--gl-pin`
timeline + the keyframes-free stiff clamp are EXCISED (the RE-INVENT — a clean break, no alias).

---

## NEW WAVE — `BD.W-SCROLL-LIQUID-ENGINE.md` (AUTHOR)

**Name**: W-SCROLL-LIQUID-ENGINE — the keyframes.js liquid-weight scroll spine: one `useScrollScene`
engine (synchronous `SmoothProgress`/`SpringProgress`/`springLinearStops` over the ONE
`createScrollReader`) → the `--pin-t` cartoon-slam pin (re-invented, every engine) + the `--scroll-scrub`
liquid weight + the spring-scrubbed cascade + the warm-glass/cel-cast gestalt repair, both modes, both
engines.

**Reference**: `docs/tranches/BD/greenfield/scroll-choreography/GOLDEN.md` (challenges FOLDED via
`DELTA-ASSAY.md §3`). The de-risk spike `golden/pin-spike.html` is the PROOF-OF-MECHANISM (re-prove over
the real `scrollReader.ts` before "proven on the shipped core" — DELTA-ASSAY §3.8).

**Opens after**: `BC.W-SCROLL-TRIGGER` (the `scrollReader` core + the reader it composes), `BB.W-SCROLL-MOTION`
(the recipe family it edits in place). CROSS-LINKS `W-LIQUID-ENTRANCE-GENERAL` (the squish-keyframe owner)
+ `BD.W-MORPH-PUNCH-TOKENS` (the `--motion-weight`/`--ease-cartoon-punch` authority).

**Agents**: 2 serial. `.1` — the engine + tokens + the pin re-invention + the cascade easing + the
`./motion-curves` chrome curve + the born-RED gate (the substrate). `.2` — the warm-glass + cel-cast +
colorful-field/defined-edge repair on the REAL `demo/stories/motion/scroll-choreography.vue` + the
`useScrollPin` wiring + the DELTA capture (the consumer + the gestalt).

### §0 — RE-GROUND (mandatory; re-grep at HEAD before any edit)
- kf@4.3.0 boundary: confirm `SmoothProgress`/`SpringProgress`/`springLinearStops = function`,
  `createScrollScene = undefined` (build on the synchronous primitives — `node -e` verified this pass).
- `scrollReader.ts` resolves the PASSED source, else window/document — NO `main.demo-main-scroller`
  auto-discovery (DELTA-ASSAY §0). `useScrollPin({ source })` passes it explicitly.
- `core/index.ts:23,96,106` re-exports the three scroll composables on `/motion-core`; the header forbids
  a static keyframes.js import (`:93`). `useDockSearch.ts:52,265` consumes `useScrollChrome` there.
- `./motion-curves` subpath EXISTS (`package.json` exports — verified) — the chrome-snap CSS-curve home.
- `--shadow-cartoon-md` SHIPS today (verified live, layered) — a DEPEND-ON, not a re-mint.
- `--scroll-scrub` / `--ease-scroll-spring` / `--motion-weight` / `--ease-cartoon-punch` EMPTY on :root.
- pin glass chroma 0.012 (near-gray — the BA.W-NO-GRAY repair target).

### Scope (the concrete edits)
1. **`src/composables/motion/useScrollScene.ts`** (create) — the seam: `{ source, range, scrub, snap,
   bindEl, property }`; composes `createScrollReader` + `SmoothProgress` (scrub) + `SpringProgress`
   (snap); writes the damped 0..1 to a custom prop + a reactive ref; owns NO perpetual rAF (`play()`
   auto-parks at rest). The scrub→damping mapping is a STATED function of `--scroll-scrub` (no magic
   affine constants — DELTA-ASSAY §3.7). Ships on `/motion` (keyframes-bearing).
2. **`src/composables/motion/useScrollPin.ts`** (create) — `useScrollScene` bound to the sticky stage,
   `property: "--pin-t"`, the FELT reveal on **`SpringProgress`** (overshoot — DELTA-ASSAY §3.6), the
   pure-lag legs on `SmoothProgress`. Per-tick `getBoundingClientRect` for the pin-slice ratio (real new
   measurement — DELTA-ASSAY §3.8); explicit `source` (the demo passes `main.demo-main-scroller`).
3. **`src/composables/motion/useScrollProgress.ts`** (modify) — internal re-platform: raw ratio →
   smoother target; returned ref → smoothed `current`; PRM → `.snap()`. The smoother is **peer-injected**
   (`{ smoother? }`) so the leaf stays import-free on `/motion-core`; only `/motion` callers wire a real
   `SmoothProgress`. **Public `Ref<number>` UNCHANGED** (DELTA-ASSAY §3.1).
4. **`src/styles/scroll-choreography.css`** (modify) — RE-INVENT `.scroll-pin`: DELETE
   `scroll-timeline-name: --gl-pin` + `timeline-scope: --gl-pin` + the whole `@supports (… timeline-scope:
   --gl-pin)` gate (`:228-282`); the stage is plain `position: sticky; inset-block-start: 0; contain:
   layout paint`; phases read `--pin-t` (DELTA-ASSAY §2d). Register `@property --pin-t` (typed). The
   cascade `linear → var(--ease-scroll-spring)` (`:164`); the Safari degrade → mount-clock cel-slam
   (one `@supports`-else reusing the `.scroll-build` mount keyframe — NOT a flat fade).
5. **`src/styles/tokens/scroll-tokens.css`** (modify) — the §2c tokens with φ-grounded values
   (`--scroll-scrub: 0.62` = 1/φ; `--scroll-scrub-pin: 0.382` = 1/φ²; reveal end `0.382`; squash floor
   `0.944` = 1 − 1/φ⁴; `--ease-scroll-spring` = the `springLinearStops` `--spring-gentle` twin +
   `@supports (animation-timing-function: linear(0,1))` cubic fallback).
6. **`./motion-curves` token** (modify) — the chrome-snap spring CSS curve (`--scroll-snap-spring`)
   consumable on `/motion-core` with ZERO JS import (DELTA-ASSAY §3.1).
7. **`useScrollTrigger.ts` / `useScrollChrome.ts`** (modify) — continuous `progress` → `useScrollScene`
   delegate (trigger); the snap → the `./motion-curves` CSS-curve settle (chrome); discrete events +
   persistent default + velocity gate KEPT byte-for-byte.
8. **`demo/stories/motion/scroll-choreography.vue`** (modify) — wire `useScrollPin({ source:
   mainScroller })`; **re-warm the pin reveal surface off the warm-cream six-layer composite (chroma >
   the BA.W-NO-GRAY floor, both modes) + add the colorful field behind + a defined edge** (DELTA-ASSAY
   §3.4); add the cel-cast `::after` carrying `var(--shadow-cartoon-md, …)`, its transform on a
   `+6ms·--motion-weight`-late clock, the `backdrop-filter` DECOUPLED onto a non-transformed wrapper
   (DELTA-ASSAY §3.3).
9. **`scripts/proof-scroll-liquid.mjs`** (create) + `package.json`/`scripts/gates.mjs` (modify) — the
   born-RED gate (below).

### The born-RED gate — `proof:scroll-liquid` (RED on HEAD, GREEN by the wave)
Device-free SOURCE clauses + the BINDING π/DELTA (real scroll gesture · frame-series · paired Chromium +
WebKit · both modes — the Live-verify-capture law). **Gate-authoring lesson (live-proven this pass):**
assert on the `translate`/`scale` LONGHANDS + `opacity` + `--pin-t`, NOT `getComputedStyle(...).transform`
— the longhands do not fold into the computed `transform` matrix (a working `--pin-t` reads
`transform:"none"` while `translate:"0px 1.57px"`, `scale:"0.997"` are live).

1. **R-PIN (RED on HEAD — captured):** sweep `main.demo-main-scroller`; `.scroll-pin-phase-reveal`
   `translate`/`scale`/`opacity` change monotonically across the pin slice (≥1 mid frame ≠ terminal) +
   an **overshoot** frame (the `SpringProgress` slam). HEAD: `translate:none·scale:none·opacity:1` ALL
   frames + `ScrollTimeline.currentTime === null` (**captured this pass** — `golden/delta-pin-born-red.png`).
2. **R-WEIGHT (RED on HEAD — liquid-weight proof):** scroll a fixed delta then HOLD; the pin/progress
   keeps converging AFTER the scroll stops over a settle-DURATION window (not merely ≥3 frames —
   DELTA-ASSAY §3.7). HEAD jumps 1:1, frozen the instant scroll stops.
3. **R-CASCADE (RED on HEAD):** `.scroll-cascade > *` resolved easing is the spring `linear(...)`, NOT
   `linear` (HEAD: `linear` — captured).
4. **R-SNAP (RED on HEAD):** a slow drag near a chrome-collapse midpoint, release; `collapseT` settles
   via the `./motion-curves` curve (pick the curve — overshoot OR critically-damped — then PROVE it;
   DELTA-ASSAY §3.10). HEAD: instant `apply(settled)`.
5. **R-KEYFRAMES (RED on HEAD):** the scroll spine imports `SmoothProgress`/`SpringProgress` from
   `@mkbabb/keyframes.js` on `/motion`; AND `/motion-core` (`useScrollChrome`/`useScrollTrigger`/
   `useScrollProgress`) imports NONE (the carve-out HELD — DELTA-ASSAY §3.1). HEAD: keyframes-free everywhere.
6. **R-WARM (RED on HEAD — the gestalt, live-confirmed):** `.scroll-pin-phase-reveal` background chroma
   > the BA.W-NO-GRAY floor, both modes, with a colorful field behind + a defined edge ON THE REAL
   element. HEAD: chroma ≈ 0.012 (near-gray — captured this pass).
7. **R-CEL (RED on HEAD):** the cel-cast `::after` exists on the real component, its TRANSFORM sweeps,
   carries `var(--shadow-cartoon-md, …)` (the box-shadow static-painted, never animated). HEAD: `::after
   { content: none }` — no cast.
8. **R-SAFARI (the cross-engine arm):** a REAL Playwright WebKit run of R-PIN + R-WEIGHT + the cascade
   `linear()`/cubic fallback + the decoupled-glass no-swim check (DELTA-ASSAY §3.3) — paired-engine
   DELTA, NOT a Chromium emulation. CONDITIONAL if WebKit is undrivable in-harness (say so).
9. **R-PRM (RED on HEAD):** under reduce, `--scroll-scrub → 0`, the smoother snaps 1:1, `--pin-t` tracks
   scroll 1:1 but the pin SNAPS to the phase boundary (no continuous scroll-coupled lift translate —
   DELTA-ASSAY §3.9), the CSS recipes stay terminal, discrete crossings still fire.

**Anti-evasion:** R-KEYFRAMES asserts BOTH the `/motion` import AND the `/motion-core` negative (a kf
import on the engine-free barrel reds). R-WARM/R-CEL assert on the REAL component (a spike DOM reds). Every
`var(--motion-weight, …)`/`var(--ease-cartoon-punch, …)`/`var(--shadow-cartoon-md, …)` carries a fallback;
re-prove the spike with the dep tokens ABSENT (the fallback path live — DELTA-ASSAY §3.11).

---

## AUGMENT 1 — `BB.W-SCROLL-MOTION.md`

**Concrete edits:** in §Scope item 3 (the `.scroll-pin` mint) + the File-Bounds `scroll-choreography.css`
row + the gate S3 clause: replace the `timeline-scope: --gl-pin` named-timeline mechanism with the
`--pin-t` JS-driven reader (DELTA-ASSAY §2d). The §Triumvirate "`timeline-scope` support" dispatch is
RESOLVED (the dead-pin is not a support gap — it is structural deadness on the FULLY-SUPPORTING engine;
Chrome resolves `timeline-scope: --x` true yet `currentTime` is null because `.scroll-pin` is not a scroll
port). Gate S3 re-points from "composes a named `scroll-timeline`/`timeline-scope`" to "composes
`position: sticky` + a `--pin-t` reader written by `useScrollPin`, no `animation-timeline` on the felt
reveal". KEEP S1 (`.scroll-build`), S2 (the `view()` cascade), S4 (the PRM/@supports outer-gate), S5
(no-Lenis), S6 (≥2 consumers). **The `.scroll-build` + the `view()` cascade structure is byte-untouched.**

**Born-RED delta:** the existing `proof:scroll-motion` S3 clause was authored to assert the named-timeline
mechanism that is now PROVEN DEAD (`currentTime: null`) — re-author S3 to the `--pin-t` mechanism;
`BD.W-SCROLL-LIQUID-ENGINE`'s `proof:scroll-liquid` R-PIN is the binding behavioural floor.

---

## AUGMENT 2 — `BC.W-SCROLL-TRIGGER.md`

**Concrete edits:** the continuous `progress` ramp (`useScrollTrigger.ts:207-211,286-290`) delegates to
`useScrollScene` (the scrub weight) on `/motion`; on `/motion-core` it keeps the import-free 1:1 clamp
(the peer-injection floor — DELTA-ASSAY §3.1). The discrete `onCross`/`onEnter`/`onLeave` + the
flip-delta debounce + the velocity/direction read are KEPT byte-for-byte (events cannot ride a CSS
timeline — JS on every engine). Optionally thread `velocity` into the `SmoothProgress` target (the
morph-more-on-move law). `scrollReader` is REUSED (no re-fork). **The VUE-ONLY/`/motion-core` header law
HOLDS** — the kf weight is the `/motion` `useScrollScene` lane, never a static import in this leaf.

**Born-RED delta:** R-WEIGHT (the `/motion` trigger progress settles after scroll stops) + R-KEYFRAMES
(`/motion-core` `useScrollTrigger` imports no kf).

---

## AUGMENT 3 — `BC.W-SCROLL-CHROME.md`

**Concrete edits (the carve-out-preserving route — DELTA-ASSAY §3.1):** the scroll-stop snap
(`useScrollChrome.ts:165-175` `apply(settled)`) + the `collapseT` ramp carry spring weight via a **CSS
curve** from `./motion-curves` (`transition-timing-function: var(--scroll-snap-spring)` /
`--ease-scroll-spring`), NOT a JS `SpringProgress` import — so `useScrollChrome` STAYS keyframes-free on
`/motion-core` and `useDockSearch` keeps its liquid weight with ZERO 125 KB engine regression. The
persistent-by-default + velocity-gate + direction read are KEPT verbatim. **Concede in the wave text: the
chrome collapse weight is the CSS curve, not the JS engine** — drop any "identical JS spine both engines"
overclaim for this leaf (DELTA-ASSAY §3.1).

**Born-RED delta:** R-SNAP (the collapse settles via the curve, not an instant jump) + R-KEYFRAMES
(`/motion-core` `useScrollChrome` imports no kf — the negative assert).

---

## REFRAME — `BD.W-SCROLL-FLUIDITY.md` + `BD.W-SCROLL-MINIMIZE.md`

- **`BD.W-SCROLL-FLUIDITY`** — the rail continuous slow-glide IS the `--scroll-scrub` `SmoothProgress`
  scrub from `useScrollScene`; the wave's "no-Lenis/no-momentum-lib" fence is reconciled with the truth
  that keyframes.js is the SANCTIONED in-house smoother (a first-party sibling, NOT a 3rd-party momentum
  dep). The rail's `<FadingScroll>` port reads the scrub weight; no second smoother.
- **`BD.W-SCROLL-MINIMIZE`** — the dock direction-read FEEDS `useScrollScene`'s direction/velocity (ONE
  reader, no second listener); the minimize collapse snap becomes the `./motion-curves` curve settle
  (shared with `BC.W-SCROLL-CHROME`). Still drives the shipped `collapse()`/`expand()` verbs.

Both REFRAME rows point at `BD.W-SCROLL-LIQUID-ENGINE` as the engine; neither re-authors a scroll reader.

---

## CROSS-LINK — `W-LIQUID-ENTRANCE-GENERAL.md`

It OWNS the `.scroll-build`/`.scroll-cascade` SQUISH keyframe edit (its AMENDMENT 2, Bug B: edit
`gl-page-build`/`gl-cascade-build` IN PLACE, never re-target `.scroll-build > *`). **`BD.W-SCROLL-LIQUID-ENGINE`
does NOT re-edit those keyframes** — it owns ONLY the cascade `linear → var(--ease-scroll-spring)` EASING
swap (`scroll-choreography.css:164`) + the Safari-degrade-to-cel-slam `@supports`-else. The two waves
touch the SAME recipe block but DISJOINT properties (entrance: the keyframe `scale:`/`translate:`
longhands; this: the `animation-timing-function` + the degrade arm) — sequence the seam, no co-write.

---

## No-duplicative-work ledger (vs the ~116-wave set)

- **NO new scroll reader** — `scrollReader` is REUSED; `useScrollScene` COMPOSES it.
- **NO second smoother** — kf `SmoothProgress`/`SpringProgress` is the ONE physics; the chrome curve is
  the SAME `springLinearStops` family baked to CSS.
- **NO re-mint of the punch tokens** — `BD.W-MORPH-PUNCH-TOKENS` is the sole authority (DEPEND-ON via
  `var(…, fallback)`); `--shadow-cartoon-md` SHIPS today (DEPEND-ON, not re-mint).
- **NO scroll re-fork** — the four extant composables AUGMENT in place; the `.scroll-build`/`view()`
  cascade structure is byte-untouched; the entrance squish edit is NOT duplicated.
- **NO `createScrollScene` phantom dep** — the synchronous primitives only.
- **EXCISED (the RE-INVENT, a clean break, no alias):** the `--gl-pin` named timeline + `timeline-scope`
  gate + the keyframes-free stiff clamp.
- **CORRECTED the GOLDEN's "zero prune" overclaim** — the dead timeline + the stiff clamp ARE excised;
  recorded as a RE-INVENT row, not hidden.

EXCISED FROM THE GOLDEN (the challenge folds): the `createScrollReader` "auto-resolves
main.demo-main-scroller" claim (false — explicit source); the `--scroll-scrub-pin: 0.50` non-φ value
(→ 0.382); the `damping = 0.06 + (1−scrub)·0.14` magic affine map (→ a stated function); the
`SmoothProgress`-for-the-felt-pin (→ `SpringProgress`, which overshoots); "compositor-only" for `--pin-t`
(→ bounded main-thread recalc); "byte-identical Safari by construction" (→ a real WebKit capture or
CONDITIONAL); the spike's warm-palette Potemkin (→ re-warm the REAL component); the "physics shim"
hand-wave for `/motion-core` chrome (→ the concrete `./motion-curves` CSS-curve route).
