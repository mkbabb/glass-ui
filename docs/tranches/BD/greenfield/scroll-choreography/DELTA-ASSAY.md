# DELTA-ASSAY — SCROLL-CHOREOGRAPHY (golden vs current → the UNION path)

> The golden-vs-current delta + the deft integration path: precisely how to evolve the CURRENT
> toward `GOLDEN.md` reusing extant primitives, KISS, no legacy, no dual-path. The three challenges
> (`challenge/1.md` correctness/KISS, `challenge/2.md` cross-engine/perf, `challenge/3.md`
> gestalt/design-fidelity) are FOLDED into the verdict — every hardening they demand is bound into
> the union below or the wave amendment's born-RED gate.
>
> **Live-verified, this pass** (Chrome :5173, 2026-06-24; `golden/delta-pin-born-red.png`): the
> defect is REAL and reproduces to the GOLDEN's stated numbers.

---

## 0 — The live readback (the captured DELTA, not a claim)

Driven on the REAL scroll port `main.demo-main-scroller` (`/motion/scroll-choreography`,
`/motion/scroll-system`, `/motion/scroll-vt`):

| probe | result | evidence |
|---|---|---|
| scroller geometry | `scrollHeight 4164 / clientHeight 806` (extent 3358) | matches GOLDEN to the pixel |
| **R-PIN (dead pin)** | **RED** | `.scroll-pin-phase-reveal` reads `transform:none · translate:none · scale:none · opacity:1 · --pin-t:""` at ALL six fractions [0,.2,.4,.55,.7,1.0]; bound animation `gl-pin-reveal` on a `ScrollTimeline` with **`currentTime: NULL`, `playState: running`** (parked at `from` forever) |
| **engine (Chrome)** | scroll/view/timeline-scope/linear ALL `true` | the pin is dead **on the engine that fully supports the native feature** — universal STRUCTURAL deadness, not a Safari degrade |
| cascade | `linear` + `view()` + `gl-cascade-build`, timeline `currentTime` NON-null | the cascade leg is FIT; only the easing is the swap target |
| `--scroll-scrub` | **EMPTY** | the golden liquid-weight knob does not exist |
| `--ease-scroll-spring` | **EMPTY** | the spring-scrub cascade ease does not exist |
| `--motion-weight` / `--ease-cartoon-punch` | **EMPTY** | the cartoon-punch tokens are NOT shipped (`BD.W-MORPH-PUNCH-TOKENS` is not on disk — same phantom the entrance-reveal row caught) |
| `--shadow-cartoon-md` | **PRESENT** (`-4px 3px 1px … , 0 4px 1px … , -4px 4px 2px …`, layered) | challenge 3 was WRONG that it is phantom — it ships today; it is a real DEPEND-ON, NOT a re-mint |
| `--spring-gentle` | PRESENT (ζ≈0.85 linear-stop set) | the `--ease-scroll-spring` source twin exists |
| **pin glass chroma** | **NEAR-GRAY** | `.scroll-pin-phase-reveal` background `oklab(0.721 0.00495 0.0109 / 0.6)` → chroma ≈ 0.012 — a **BA.W-NO-GRAY violation** (challenge 3's load-bearing gestalt finding, confirmed) + `backdrop-filter: blur(8px) saturate(1.4) brightness(1.02)` (the transform-on-glass WebKit trap, challenge 2 R1) |
| chrome subpath | `/motion/scroll-system` advertises **`@mkbabb/glass-ui/motion-core`** | the engine-free subpath is live; `useDockSearch.ts:52,265` consumes `useScrollChrome` off it |
| `scroll-vt` | NO `.scroll-pin`; HAS `.scroll-cascade` + `.scroll-progress` + view-transition | scroll-vt carries no pin spine (out of pin scope) but DOES inherit the cascade easing swap |
| **R-WEIGHT (stiffness)** | **RED** | the scroll axes are 1:1 clamps; `useScrollProgress`/`useScrollTrigger`/`useScrollChrome`/`scrollReader` all fence keyframes.js OUT by header law and write `progress = clamp01(pos/extent)` each tick — zero inertia, zero settle |
| keyframes.js@4.3.0 boundary | `SmoothProgress/SpringProgress/springLinearStops = function`; `createScrollScene = undefined` | the GOLDEN's de-risk is CORRECT — build on the synchronous primitives, never the phantom |

**Verdict: the GOLDEN's diagnosis SURVIVES live, intact.** The pin is genuinely dead, the stiff clamp
is genuinely keyframes-free, the cascade is genuinely surgical-scope, and the synchronous-primitive
pivot is the right KISS call. The three challenges do NOT kill it — they harden HOW it integrates.

---

## 1 — Survival-of-the-fittest ledger (KEEP · REFINE · RE-INVENT)

### KEEP (fit — touch nothing)
- **`scrollReader.ts`** — the ONE rAF-coalesced, VUE-FREE listener core; `position()`/`extent()`/
  `schedule()`/`stop()`. `useScrollScene` COMPOSES it; no fourth listener, no re-fork.
- **`useScrollProgress`'s public `Ref<number>` surface + the `NATIVE_SCROLL_TIMELINE` early-return**
  (`useScrollProgress.ts:28,80`) — the dual-path single-writer floor; consumed by `useAurora.ts:238`,
  `FadingScroll`. The internal re-platform must NOT change the signature.
- **`.scroll-build`** (mount-clock `@keyframes`, `scroll-choreography.css:65-126`) — fires on every
  engine, works; its squish edit is OWNED by entrance-reveal, NOT this scope.
- **`.scroll-cascade`'s `view()` axis + per-child implicit stagger** (`:139-201`) — `view(block)`
  resolves non-null live; only the easing changes.
- **`.smooth-scroll`** (native, PRM-gated, zero runtime, `:296-300`).
- **`useScrollChrome`'s persistent-by-default + velocity-gate + direction read + flip-delta debounce**
  — the iOS-27 lesson, byte-equivalent. `useScrollTrigger`'s discrete `onCross/onEnter/onLeave` (events
  cannot ride a CSS timeline — JS on every engine).
- **`supportsScrollTimeline` / `supportsCssTimeline.ts`** — the garbage-value-rejection harden.

### REFINE (weak — evolve in place, no fork)
- **The cross-engine doctrine**: native-primary → **JS-liquid-primary for every FELT axis**, native
  `view()`/`scroll()` demoted to a progressive compositor handoff for COSMETIC legs only.
- **Liquid weight is absent everywhere** → the `--scroll-scrub` `SmoothProgress` damping becomes the
  DEFAULT on the felt axes (`useScrollProgress`'s number, the pin, the chrome collapse).
- **The cascade easing** `linear → var(--ease-scroll-spring)` (a `springLinearStops` `linear()` twin of
  `--spring-gentle`) — spring WEIGHT on the scrubbed entrance, ZERO JS (compositor stays).
- **`useScrollChrome`'s instant `apply(settled)` snap → a `SpringProgress`/curve settle** (the liquid
  weight the collapse lacks); the `collapseT` ramp → `SmoothProgress` inertia.

### RE-INVENT (broken — replace the mechanism, no legacy alias)
- **`.scroll-pin`** — DELETE `scroll-timeline-name: --gl-pin` + `timeline-scope: --gl-pin` + the whole
  `@supports (… timeline-scope: --gl-pin)` gate (`scroll-choreography.css:228-282`). The stage becomes
  plain `position: sticky; inset-block-start: 0`; the phases read a JS-written spring-damped `--pin-t`.
  Works on EVERY engine (Safari 15+) with no timeline primitive.
- **The keyframes-free stiff clamp** — DELETED (no alias); `useScrollScene` is the one engine the
  others compose or wrap.

---

## 2 — The UNION path (the deft integration — KISS, DRY, reuse extant primitives)

### 2a — ONE new seam: `useScrollScene` (the engine), `useScrollPin` (the thin pin)
`ScrollScene`/`createScrollScene` resolve to `undefined` at kf@4.3.0 (verified). `ScrollScene` is itself
a thin composition of `SmoothProgress` (scrub) + `SpringProgress` (snap) + a parsed range — and those
three ARE synchronously exported. So `useScrollScene` is built directly on them over the SHIPPED
`scrollReader.ts`, exactly the factoring `ScrollScene` performs, **zero async load, zero net dep**. If a
future kf bumps `createScrollScene` to a static export, the internals swap behind an unchanged signature.

- `src/composables/motion/useScrollScene.ts` (**NEW leaf**) — `{ source, range, scrub, snap, bindEl,
  property }`; composes `createScrollReader` + `SmoothProgress`/`SpringProgress`; writes the damped 0..1
  to a custom prop AND a reactive ref; owns NO perpetual rAF (`SmoothProgress.play()` runs only while
  unsettled, auto-parks at rest — the no-momentum-loop fence). Keyframes-bearing → ships on `/motion`.
- `src/composables/motion/useScrollPin.ts` (**NEW thin**) — `useScrollScene({ scrub:
  --scroll-scrub-pin, snap: phaseSnaps, property: "--pin-t" })` bound to the sticky stage.

### 2b — The four extant composables: AUGMENT, never re-fork
- `useScrollProgress` — internal re-platform: raw ratio → `setTarget`; returned ref → smoothed
  `current`; PRM → `.snap()`. **Public `Ref<number>` UNCHANGED.**
- `useScrollTrigger` — continuous `progress` delegates to `useScrollScene` (scrub weight); discrete
  crossings + flip-delta + velocity/direction KEPT byte-for-byte; thread `velocity` into the
  `SmoothProgress` target (the morph-more-on-move law).
- `useScrollChrome` — the snap → a spring settle; `collapseT` ramp → `SmoothProgress`; persistent
  default + velocity gate KEPT.

### 2c — Tokens (in `src/styles/tokens/scroll-tokens.css` — the existing home, verified)
```css
--scroll-scrub: 0.62;     /* 1/φ — the ONE liquid-weight knob; PRM → 0 (1:1 snap) */
--scroll-scrub-pin: 0.382; /* 1/φ² — the pin drifts HEAVIER (lower scrub = more lag, see §3 polarity) */
--ease-scroll-spring: linear(/* springLinearStops({response:.5,dampingFraction:.85}) — the --spring-gentle twin */);
--scroll-snap-spring: var(--spring-gentle);          /* ζ=0.85 — the §L4 scroll curve */
--scroll-pin-phase-reveal-end-frac: 0.382;           /* 1/φ² — the reveal window (calc-friendly) */
--scroll-pin-squash-floor: 0.944;                    /* 1 − 1/φ⁴ — the vol-preserving squash depth */
/* DEPEND-ON via var(…, fallback) — ship GREEN before these land:
     --motion-weight, --ease-cartoon-punch  → BD.W-MORPH-PUNCH-TOKENS (not on disk yet)
     --shadow-cartoon-md                     → SHIPS TODAY (verified live) — a real DEPEND-ON */
```

### 2d — The pin recipe (RE-INVENT, in place — `scroll-choreography.css`)
```css
@property --pin-t { syntax: "<number>"; inherits: true; initial-value: 0; } /* challenge 2 R1 — typed */
.scroll-pin { position: relative; block-size: var(--scroll-pin-stage-height, 320vh); }
.scroll-pin-stage { position: sticky; inset-block-start: 0; contain: layout paint; } /* bounded recalc */
.scroll-pin-phase-reveal {
  --t: clamp(0, calc(var(--pin-t, 0) / var(--scroll-pin-phase-reveal-end-frac, 0.382)), 1);
  opacity: var(--t);
  translate: 0 calc((1 - var(--t)) * var(--scroll-pin-lift, 2.5rem));
  scale: calc(var(--scroll-pin-squash-floor, 0.944) + (1 - var(--scroll-pin-squash-floor, 0.944)) * var(--t));
  /* will-change added on pin-enter, removed on settle (challenge 2 R1) — never the 320vh lifetime */
}
```

---

## 3 — The challenge hardenings, FOLDED (each bound to a mechanism or a gate clause)

All three challenges agree the ENGINE survives and is strong; their refutations are about INTEGRATION
honesty. Every one is resolved here (not buried in a parenthetical):

1. **The `/motion-core` keyframes-free invariant (challenge 1 R1 TOP, challenge 2 R2, challenge 3 S7).**
   `useScrollProgress`/`useScrollTrigger`/`useScrollChrome` ship on the engine-free `/motion-core`
   barrel (`core/index.ts:23,96,106`); the header forbids a static `@mkbabb/keyframes.js` import.
   A naive re-platform breaks it for THREE leaves and drags ~125 KB onto `useDockSearch`. **RESOLUTION
   (the verified KISS route): `./motion-curves` subpath EXISTS** (confirmed in `package.json` exports).
   - The chrome snap/collapse rides a **CSS** curve: `transition-timing-function:
     var(--scroll-snap-spring)` / `--ease-scroll-spring` (a baked `springLinearStops` stop-set living in
     a curves token consumable by `/motion-core` with NO JS engine import). The dock keeps its liquid
     weight WITHOUT pulling the engine. `useScrollChrome` stays keyframes-free.
   - `useScrollProgress`'s smoother is **peer-injected**: `useScrollProgress({ smoother? })` stays
     import-free; only `/motion` `useScrollScene` wires a real `SmoothProgress`. `/motion-core` callers
     get the honest 1:1 clamp (a documented floor); `/motion` callers get weight. **Concede openly: the
     `/motion-core` floor is NOT weighted** — drop the "identical both engines on every felt axis"
     overclaim for the engine-free path; the dock's collapse weight comes from the CSS curve, not the JS.
   - **The DELTA-ASSAY §5 row is NOT "ZERO prune"** — it is one RELOCATE-class decision (CSS-curve route,
     no relocation needed) recorded explicitly. The "zero prune" claim is corrected here.
2. **"Compositor-only" is FALSE for the `--pin-t` leg (challenge 2 R1 TOP).** A JS `setProperty("--pin-t")`
   is a bounded main-thread style recalc on a `contain`-isolated subtree, NOT a compositor animation.
   **Re-label** honestly (keep `proof:no-layout-animation` — translate/scale/opacity don't reflow; drop
   "compositor"). Register `@property --pin-t` (typed → cheaper calc + lets the optional native
   `scroll(nearest)` cosmetic-parallax composite). Scope `will-change: transform` to the active phase
   window (added on enter, removed on settle), `contain: layout paint` on the stage.
3. **Transform-on-backdrop-filter glass-swim in WebKit (challenge 2 R1).** The pin card is `glass-card`
   with `backdrop-filter: blur(8px) saturate(1.4) brightness(1.02)`; transforming it forces a WebKit
   backdrop re-sample per frame. **DECOUPLE**: the `backdrop-filter` lives on a NON-transformed wrapper;
   the moving `translate`/`scale` rides an inner non-filtered content layer. The cartoon cel cast is an
   `::after` transform (never an animated `box-shadow`).
4. **The near-gray pin glass — a NO-GRAY violation (challenge 3 TOP, live-confirmed chroma 0.012).** The
   shipping recipe paints bare opacity/translate/scale onto a near-neutral `glass-card`; §3's "colorful
   field + defined edge" is absent. **The wave MUST re-warm the pin surface off the warm-cream six-layer
   composite (chroma > the BA.W-NO-GRAY floor, both modes) + add the colorful field behind + a defined
   edge ON THE REAL `scroll-choreography.vue`, not a spike.** The gate asserts a non-gray chroma readback
   on the real element.
5. **The cartoon register lives only in a throwaway spike on invented DOM (challenge 3 TOP).** The real
   `.scroll-pin-phase-reveal` has `::after { content: none }`; the spike's `.scroll-pin-card::after` cel
   cast is not in the DOM. **The wave adds the cel-cast `::after` to the REAL component** carrying the
   real `--shadow-cartoon-md` (SHIPS today — verified; NOT a phantom). Fix every `--shadow-cartoon-md`
   reference to consume via `var(--shadow-cartoon-md, …)` (it exists, but ship GREEN-safe).
6. **`SmoothProgress` cannot overshoot; the felt pin must use `SpringProgress` (challenge 3 S4).** The
   GOLDEN promises "anticipation dip → overshoot → settle" but `SmoothProgress` is a monotone low-pass
   lag. **Drive the FELT pin reveal on `SpringProgress`** (ζ≈0.85 — ONE spring identity shared with the
   cascade's `--ease-scroll-spring`); reserve `SmoothProgress` for the pure-lag legs (progress number,
   chrome `collapseT`). The gate asserts an overshoot frame in R-PIN.
7. **The φ-proportion knobs were laundered (challenge 1 R3, challenge 2, challenge 3 S2/S3).**
   `--scroll-scrub-pin: 0.50` is NOT 1/φ-family. **Corrected**: `--scroll-scrub-pin: 0.382` (1/φ²),
   reveal end `0.382` (1/φ²), squash floor `0.944` (1 − 1/φ⁴). The spike's `damping = 0.06 + (1−scrub)·
   0.14` magic affine map is **dropped**: feed `--scroll-scrub` to `SpringProgress`/`SmoothProgress`
   damping by a STATED mapping (scrub = normalized lag → damping = f(scrub), f written once + justified),
   no free constants. R-WEIGHT gates on a settle-DURATION window, not merely "keeps moving ≥3 frames"
   (a too-fast damping passes the frame count while feeling tight).
8. **`createScrollReader` does NOT auto-resolve `main.demo-main-scroller` (challenge 1 R2, challenge 3 S1).**
   It resolves the PASSED source, else window/document. **`useScrollPin({ source })` takes an explicit
   source** (the demo passes `main.demo-main-scroller`); the pin-slice ratio needs a per-tick
   `getBoundingClientRect` the shipped reader does not do — that is real new measurement code in
   `useScrollPin`, NOT a mechanical lift of the spike's re-inlined reader. The spike proved the IDIOM;
   the production wave proves it over the REAL `scrollReader.ts` before claiming "proven on the shipped
   core."
9. **PRM tracks 1:1 but a scroll-coupled translate is still vestibular (challenge 2 a11y, challenge 3 S5).**
   Resolve the self-contradiction: under PRM `--pin-t` tracks scroll 1:1 (correct phase per position,
   zero interpolation) — NOT "terminal phase regardless of position" (which would drop the user
   mid-narrative). But the pin SNAPS to the phase boundary (threshold `--t ≥ 0.5 → 1`) rather than a
   continuous scroll-coupled lift. R-PRM gates on a mid-scroll frame showing the mid phase WITHOUT a
   continuous lift translate.
10. **R-SNAP + R-SAFARI are asserted-not-captured (challenge 1 R4/R5, challenge 2 R1/gate, challenge 3 S6).**
    R-SNAP gets a chrome-snap micro-proof (the CSS-curve settle crossing + returning, OR a critically-
    damped no-overshoot settle — pick the curve, then prove it). R-SAFARI is a **real Playwright WebKit**
    run of R-PIN + R-WEIGHT + the cascade `linear()`/cubic fallback, captured as the paired-engine DELTA
    — NOT a Chromium emulation. If WebKit is undrivable in-harness, R-SAFARI is marked CONDITIONAL, not
    GREEN.
11. **The `--motion-weight` cel-cast needs a comma-fallback (challenge 3 S8).** Every `var(--motion-weight,
    …)` / `var(--ease-cartoon-punch, …)` / `var(--shadow-cartoon-md, …)` read carries a fallback; the
    spike is re-proven with the dep tokens ABSENT (the fallback path live, since `--motion-weight` is
    EMPTY on :root today — verified).

---

## 4 — The deft-integration summary (one paragraph)

The current is a **REFINE-dominant union with ONE surgical RE-INVENT**: keep `scrollReader` + the
`useScrollProgress` public surface + `.scroll-build`/`.scroll-cascade`/`.smooth-scroll` + the persistent
chrome (all fit); add `--scroll-scrub` liquid weight + a `SpringProgress`-driven `--pin-t` that replaces
the dead `--gl-pin` named timeline on EVERY engine; thread the chrome snap through the `./motion-curves`
CSS spring so the engine-free `/motion-core` barrel stays keyframes-free (no 125 KB regression on
`useDockSearch`); re-warm the pin glass off the warm-cream composite + add the cel-cast `::after` on the
real `--shadow-cartoon-md` (which ships today). ONE new seam (`useScrollScene` + `useScrollPin`) over the
synchronous kf primitives, no `createScrollScene` phantom, no Lenis/GSAP, no legacy alias. The four
extant composables AUGMENT in place; nothing is re-forked.

---

## 5 — Disposition vs the existing wave set (reconciled — see WAVE-AMENDMENT.md for the concrete edits)

| existing wave (filename) | disposition | one-line |
|---|---|---|
| `BB.W-SCROLL-MOTION.md` | **AUGMENT** | delete the `--gl-pin` timeline + `timeline-scope` gate; pin phases → `--pin-t` readers; `.scroll-build` + the `view()` cascade KEPT |
| `BC.W-SCROLL-TRIGGER.md` | **AUGMENT** | continuous `progress` delegates to `useScrollScene`; discrete crossings + flip-delta + velocity KEPT byte-for-byte; `scrollReader` REUSED |
| `BC.W-SCROLL-CHROME.md` | **AUGMENT** | snap → `./motion-curves` CSS spring (NOT a JS import — keeps `/motion-core` keyframes-free); persistent default KEPT |
| `BD.W-SCROLL-FLUIDITY.md` | **REFRAME** | the rail slow-glide IS the `--scroll-scrub` `SmoothProgress`; reconcile no-Lenis with kf-is-the-sanctioned-in-house-smoother |
| `BD.W-SCROLL-MINIMIZE.md` | **REFRAME** | the dock direction-read FEEDS `useScrollScene`; the collapse snap becomes the curve settle |
| `W-LIQUID-ENTRANCE-GENERAL.md` | **CROSS-LINK** | OWNS the `.scroll-build`/`.scroll-cascade` SQUISH keyframe edit (Bug B); this scope owns ONLY the cascade `linear → --ease-scroll-spring` easing swap + the cel-slam Safari degrade — no double-edit |
| `BD.W-FLIP-SPINE.md` | **CROSS-LINK** | shared `asElement` resolver idiom; the pin source-resolution reuses it |
| `BD.W-MORPH-PUNCH-TOKENS` (ledger-named, **not on disk**) | **DEPEND-ON** | `--motion-weight` + `--ease-cartoon-punch` via `var(…, fallback)`; the pin cartoon register ships GREEN before it lands |
| **NEW `BD.W-SCROLL-LIQUID-ENGINE`** | **AUTHOR** | `useScrollScene` + `useScrollPin`; the `--pin-t` pin re-invention; `--scroll-scrub` + the spring cascade; the warm-glass + cel-cast on the real component; the cross-engine JS-floor + the `./motion-curves` chrome route |

**Net: 3 AUGMENT + 2 REFRAME (existing) + 1 NEW author wave (2 new leaves) + 2 CROSS-LINK + 1 DEPEND-ON.
ZERO re-fork, ZERO dup of the entrance-reveal squish scope, ZERO legacy alias.** The "zero prune" claim
is corrected: the dead `--gl-pin` timeline + the keyframes-free stiff clamp are EXCISED (a clean break,
no alias) — that is the RE-INVENT, recorded as such, not hidden.
