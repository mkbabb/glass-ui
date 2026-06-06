# iOS-26 motion + partial design synthesis (8/18 lanes; research lanes re-run as text)

`applyFont`/`FONTS` from `demo/fonts.ts` have zero consumers in the demo — the font-switcher module is dead code, never imported by any .vue. That, combined with the `--font-body` dead write, completes the font diagnosis. I now have full grounding across all four deliverables. Producing the synthesis.

---

# glass-ui — iOS-26 / Modern-Tailwind / Speedtest-Ownership / Font synthesis

Grounded against HEAD (`at-dock-convergence`). Today 2026-06-06. Every Baseline date is cited from the AV SOTA-crosswalk (`docs/tranches/AV/audit/SOTA-crosswalk.md`) and the lane evidence.

---

## (1) THE iOS-26 DESIGN-EVOLUTION WAVE — toward Liquid Glass, keeping warm-cream

The library already owns the correct *architecture*: the analytic `springLinearStops()` solver feeds both the `--spring-*` CSS `linear()` tokens and the runtime `SpringProgress` driver, authored against iOS-canonical (response, ζ) pairs (`scripts/regen-spring-tokens.mjs` PRESETS; `tokens.css:144-163`). The evolution is convergence, not a rebuild. `linear()` crosses **Baseline Widely-Available 2026-06-11** ([caniuse linear-easing]; SOTA-crosswalk row 1) — five days out — so the foundation is now pure convergence.

Identity guard: warm-cream stays. Every fold below routes through an existing `--*` token or adds one; no hardcoded Apple-blue, no cool-grey glass. The iOS *behaviors* (lens, spring continuity, lift-on-touch) are re-expressed over the warm-cream palette (`--neutral-0..6` at hue 48, `--foreground hsl(24 10% 10%)`).

### Motion folds (the headline arm)

**Fold M1 — dock velocity-continuity (HEADLINE; C3 ADOPT).** This is the single iOS-grade interaction gap and it is confirmed in source. `useLayerTransition.ts:237` constructs `new SpringProgress({ response: 0.5, dampingFraction: 0.5 })` per swap from the static `DOCK_SPRING` const, and `disposeSpring()` at `:185` + the `new` at `:237` throw away in-flight velocity on every retarget. A rapid re-toggle restarts the morph from velocity 0 — the exact iOS anti-pattern. Apple's whole argument for springs: *"Springs are the only animation that maintains continuity both for static cases and cases with an initial velocity"* ([Animate with springs, WWDC23, sess. 10158]). The fix: on a retarget while a swap is live (`activeLayer` changes, `transitionId` still pending), read the live spring's current `(value, velocity)` and **set the new target on the existing solver** instead of dispose+reconstruct. The solver already tracks velocity; the wiring is the work. Bounded to the dock per **C4** (ambient WebGL stays on cheap static curves — SOTA-crosswalk C4). NOTE: the dock spring block is the dock-motion arm's seam, NOT the W3.5 FLIP-batching scope.

**Fold M2 — press squish-and-settle on a real spring (damping rule).** Dock-control press today is `scale var(--dock-press-spring)` where `--dock-press-spring` is a duration token + bouncy `linear()` curve (`dock-controls.css:48,75,208,216`). Correct direction, wrong physics: it's a fixed-time curve, not a momentum-gated spring. Apple's rule: *default to 100% damping (no overshoot) for taps; add bounce only when the driving gesture has momentum* ([Designing Fluid Interfaces, WWDC18, sess. 803] — the flashlight-button bounce teaches "press harder"). Convert the `:active` squish toward `--scale-press-dock` to a spring-back release; reserve bounce for momentumed surfaces (none today — taps settle smooth at ζ≈0.86).

**Fold M3 — quiet-at-rest / alive-on-touch contrast.** Liquid Glass *"lifts up temporarily when you interact, so the resting state stays visually quiet while it comes to life on touch"* ([Meet Liquid Glass, WWDC25, sess. 219]). Widen the delta: resting dock control stays low-specular/flat; hover+active lifts (`--scale-hover-dock`, specular `--glass-highlight` swap to `--glass-specular`, `--phase-color` tint). The hover specular already exists (`dock-controls.css:71`); the fold is *lowering* the resting register so the lift reads.

**Fold M4 — materialize-not-fade entrance.** *"Liquid Glass objects materialize in and out by gradually modulating light bending and lensing,"* not opacity ([WWDC25 sess. 219]). Extend the existing `@starting-style` + `transition-behavior: allow-discrete` grammar (`.glass-top-layer`, AQ.W5) to dock-layer/popover/tooltip enter-leave (SOTA-crosswalk row 3, NA 2024-08-06), and animate `backdrop-filter` blur + specular on entry, not just opacity. `allow-discrete` on a SEPARATE `transition-behavior` declaration — never the shorthand.

**Fold M5 — single-floating-plane morph for layer/tab swaps.** Typed/active View Transitions (`types` + `:active-view-transition-type()`, **NA 2026-01-13**, SOTA-crosswalk row 5) drive directional dock-layer slides as a PE tier above the base same-doc VT, so the old control set flows into the new as one plane (*"controls continually shape-shift"*) — replacing the hand-rolled FLIP-direction branching in `useLayerTransition`. `useViewTransition` is already in-tree (`composables/motion/useViewTransition.ts`).

**Deferred-with-trigger seeds (named, not built):** velocity-projection helper `projected = current + velocity²/(2·deceleration)` (FaceTime-PiP corner rule, WWDC18) for the first drag-to-dismiss; `duration/bounce` two-knob consumer surface (C5; exact conversion `stiffness=(2π/duration)²`, `damping=1−4π·bounce/duration`; shipped presets map cleanly — ζ=0.86→bounce≈0, ζ=0.65→≈+0.15, ζ=0.45→≈+0.30); axis-velocity elastic stretch (HIG motion-stretching); shared-element source→destination morph via keyframes `flipShared()`.

### Material / depth / color folds (the lens arm — ios26-glassui-gap lane)

The `ios26-glassui-gap` lane names five flat-glass-vs-lens gaps. Folds, all token-routed over warm-cream:

- **A — rim, not hairline.** `--glass-highlight` is a single inset top-edge line (`tokens.css:670`). iOS-26 glass carries a *rim*: top catch-light + bottom under-shadow. The substrate already has both halves (`--hairline-catch-light`, `--hairline-under-shadow`, `--border-hairline` at `:676-678`); the fold composes them into a `--glass-rim` recipe on the dock/floating tiers.
- **B — lens, not wash.** Dock blur is `blur(11px)` only (`--glass-blur-dock`, `:615`). A lens bends light. Compose a subtle `--glass-curvature-overlay` (already exists, `:691`) onto the dock/floating surface for the convex read.
- **C — concentric radii.** No inner-radius token exists (grep confirms). iOS nests radii: `inner = outer − padding`. Add a `--radius-inner` derivation so nested glass (dock control inside dock pill) reads concentric, not stacked-square.
- **D — adaptive tint.** Fixed `--glass-opacity-dock: 0.42`. The library already uses `light-dark()` at 72 sites and `color-scheme: light dark` (`:32`); the fold extends adaptivity to a backdrop-luminance-aware tint via the existing `--dock-fg-on-aurora` seam.
- **E — scroll-edge effect.** No scroll-edge treatment (grep confirms). iOS bars gain an edge-blur on scroll; route through the existing `scroll-driven.css` `@supports`-gated grammar.

### Baseline-grounded CSS techniques (all cited, all gated correctly)

| Technique | Baseline | Fold |
|---|---|---|
| `linear()` physics easing | WA 2026-06-11 | spring tokens (shipped); cubic-bezier → fallback-only |
| Individual transforms `scale`/`translate` | WA 2022-08-05 | press/hover declare only the changed axis (shipped) |
| `@starting-style` + `allow-discrete` | NA 2024-08-06 | M4 materialize entrance |
| Same-doc View Transitions | NA 2025-10-14 | M5 base tier (shipped seam) |
| Typed/active VT | NA 2026-01-13 | M5 directional slides (PE tier) |
| `color-mix(in oklch)` | WA 2025-11-09 | phase-tint crossfade (only 2 oklch mixes in lib today) |
| `@property` typed `<color>`/`<angle>` | NA 2024-07-09 | already 16 registrations |

### The gate

`proof:ios26-motion` (new): asserts (a) `useLayerTransition` has no `dispose()`+`new SpringProgress()` pair on the retarget path (the velocity-continuity invariant — grep guard, the inverse of today's `:185,237`); (b) every dock-control `scale`/`box-shadow` transition reads a `--spring-*` or `--dock-*-spring` token, not a raw cubic-bezier; (c) `:active-view-transition-type()` rules carry an `@supports` fallback. Composes with the existing `proof:dock-motion-single-source`, `proof:dock-motion-parity`, `proof:vt-names`. Plus the SOTA-crosswalk's `proof:frame-budget` (LoAF ≤16.7ms) as the objective jank gate (F7).

---

## (2) THE MODERN-TAILWIND WAVE — v4 idiom cohesion

The library is already v4-idiomatic in the main: `@theme` bridges every token (`theme.css`), `@utility` for every type/glass recipe, `color-mix`/`oklch` in tokens, 20 `@container` sites, `light-dark()` at 72 sites. The wave closes the remaining non-idiomatic lifts the `tailwind-theme-utility` lane found — all confirmed in source.

**Fold T1 — Progress.vue off deprecated v3 `theme()` function syntax (CONFIRMED).** `Progress.vue:181,194` use `theme(colors.secondary.DEFAULT)` and `theme(colors.primary.DEFAULT)` inside arbitrary-value wraps. Tailwind v4 deprecates the `theme()` function in favor of CSS vars ([Tailwind v4 upgrade guide — "use CSS variables instead of theme()"]). The bridges already exist: `var(--secondary)` / `var(--primary)` (theme.css:66,69). Replace `bg-[var(--progress-track,theme(colors.secondary.DEFAULT))]` → `bg-[var(--progress-track,var(--secondary))]`.

**Fold T2 — CarouselDots arbitrary wrap → utility (CONFIRMED).** `CarouselDots.vue:71-72` paints `bg-[var(--muted-medium)]` when the `bg-muted-medium` utility exists (theme.css:107, `--color-muted-medium`). Replace the arbitrary wrap with the bridged utility.

**Fold T3 — reconcile `transition-control` stale citation (CONFIRMED).** The `@utility transition-control` doc comment (utilities.css, after :694) claims a *"Toggle `card` variant"* consumer at ≥2 sites. But the card variant (`toggle/index.ts:33`) hand-rolls `transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-fast ease-standard` — a 6-property **superset** adding `opacity`+`transform` that `transition-control`'s 4-property recipe can't express, and never composes the utility. Two valid resolutions: (a) correct the citation to the real consumers (TabsTrigger, SelectTrigger); or (b) broaden `transition-control` into a `transition-surface` superset that the card variant can compose. The same hand-rolled-superset pattern recurs at `CarouselDots.vue:62` and `StackedIconGroup.vue:37` (both add transform/width/height) — argues for (b).

**Fold T4 — document the shimmer naming inversion as a registered exception.** `--animate-shimmer` reads `--duration-shimmer-fast` (3s) while the sweep variants read the unsuffixed `--duration-shimmer` (5s) — already documented inline (theme.css:346-360) as intentional (looping band-pass vs one-pass sweep want different tempos). Register it as a known exception so a modernization pass can't "fix" it.

**Non-folds (correct calls, recorded so the audit doesn't churn them):** the state-axis tokens `--scale-press`, `--scale-hover`, `--lift`, `--max-width-input` are consumed only as raw `var()` inside recipes (utilities.css), NOT bridged to `@theme` — correct: they're choreography constants with no per-element utility use case. Leave unbridged.

### The gate

`proof:tailwind-idiom` (new, two asserts): (a) **no `theme()` function** in any `.vue`/`.css` under `src/` (catches T1-class regressions — v4 deprecation); (b) **no `bg-[var(--x)]` / `text-[var(--x)]` arbitrary wrap that has a matching `--color-x` bridge in theme.css** (catches T2-class — the arbitrary-wrap-with-bridge lint the lane asks for). Plus a **theme-coverage proof**: every color/shadow/radius/blur primitive in tokens.css has a `--color-*`/`--shadow-*`/`--radius-*`/`--blur-*` bridge OR is on a listed raw-var holdout allowlist. Composes with the existing `proof:theme` and `proof:phantom-classes`.

---

## (3) THE SPEEDTEST-OWNERSHIP coordination

Five lanes audited the eight speedtest-origin promotions. The lanes **agree** on the four CORE-stay primitives but **conflict** on two — `useStagger` and `useAnimatedNumberMap` — which the inventory lane wants to MOVE to speedtest while three other lanes treat them as legitimate CORE promotions. Resolution below.

### The ledger

| Primitive | Subpath | Disposition | Rationale |
|---|---|---|---|
| `usePrioritizedTask` + `postTaskSafe` | /motion-core | **STAY CORE** | Pure `scheduler.postTask` wrapper, MessageChannel fallback, zero domain logic. Feature-detected via `supportsPostTask` (platformSupport.ts:23). Cross-repo: fourier/muster/speedtest equal examples. |
| `useYieldToMain` | /motion-core | **STAY CORE** | Pure `scheduler.yield` wrapper, used internally by `useRAFLoop` as INP lever. Engine-free. |
| `useBreakpoint` | /dom | **STAY CORE** | Reactive matchMedia. 2-consumer promotion trigger (SurveyWizard + AdminDataSourceToggle). General responsive primitive. |
| `useIdleReady` | /dom | **STAY CORE** | `requestIdleCallback` post-mount gate, 5-site speedtest promotion. Generic lazy-mount. |
| `useViewportReady` | /dom | **STAY CORE** | Two-stage IO + rIC gate, 2-site promotion. Domain-agnostic heavy-widget hydration. |
| `useViewTransition` | /motion | **STAY CORE** | `document.startViewTransition` wrapper. muster J.W5 coupling, not speedtest-owned. |
| **`useStagger`** | /motion-core | **MOVE → speedtest** | Header explicitly sources the climax row-tint cascade from `SpeedtestResults.vue:251-267`. Zero glass-ui internal consumers; only speedtest imports it. Speedtest test-flow pattern, not a zero-domain primitive. |
| **`useAnimatedNumberMap`** | /motion | **MOVE → speedtest** | Solves speedtest's `MetricPillCluster.vue:125-134` fan-out specifically. Used only in speedtest (useMetricResult, MetricGaugeCards). Metric-smoothing pattern, not general UI. |

**Resolving the conflict:** the `speedtest-breakpoint` and `speedtest-scheduling` lanes call `useStagger`/`useAnimatedNumberMap` "CORE promotions serving external consumers," but the **inventory lane's test is sharper and wins**: a primitive stays in glass-ui only if it has zero domain coupling AND ≥2 *distinct* consumer repos. Both fail — single-repo (speedtest only), and both encode a speedtest *animation pattern* (stagger cascade / metric smoothing), not a browser API. The four `STAY` composables are Baseline browser-API wrappers with feature-detected fallbacks; these two are not. Move them.

**Boundary is clean (speedtest-repo-audit + speedtest-boundary-spec lanes):** speedtest's `check:boundary` returns zero violations; all 45 subpath imports correctly routed (e.g. `from "@mkbabb/glass-ui/dock"`, never root); the only root import is `Skeleton` (root-barrel-approved). The inv-16 contract holds (glass-ui writable, speedtest READ-ONLY; glass-ui → speedtest, never reverse). The promoted *components* (AnimatedDigit, MetricCell, MetricStack/Row, ResponsiveTabs) and the speedtest Dock facade (`SpeedtestStatus`/`SurveyDockState` — app-specific, stays in speedtest) are all correctly scoped. `DockLayerGroup`/`GlassDock` stay in glass-ui as generic layout primitives.

### Name-forward asks (to the speedtest side — glass-ui is read-only there)

1. Land `speedtest/src/composables/motion/useStagger.ts` + `useAnimatedNumberMap.ts` (move + tests).
2. Repoint speedtest's `/motion`+`/motion-core` imports of those two to local ownership.
3. Re-export hygiene: confirm no third repo imports them (grep glass-ui examples + storybook — the inventory lane verified zero external consumers).

### glass-ui-side dispositions (what THIS repo does on greenlight)

1. Remove `useStagger` from `composables/motion/core/index.ts` and `useAnimatedNumberMap` from `composables/motion/index.ts` + the `/motion`/`/motion-core` subpath barrels.
2. Drop both from `src/api/index.ts` if listed; update `package.json` exports if either had a dedicated entry.
3. CHANGELOG + MIGRATION.md: document the ownership return as a clean break (no legacy alias — house no-backwards-compat rule).
4. Extend `check-glass-ui-boundary` (the speedtest-side script the audit references) to also assert dark/forms/motion are never root-exported — closes the SCC-regression class the repo-audit lane flagged.

---

## (4) THE FONT DIAGNOSIS + FIX (demo font loading)

**The fonts are NOT actually broken at first paint** — but the demo's font-switcher is dead, one write is a no-op, and one shipped face is orphaned. Three concrete defects:

**Defect 1 — the demo font-switcher module is dead code.** `demo/fonts.ts` exports `FONTS` (the option list) and `applyFont()`, but grep confirms **zero `.vue` files import them** — no consumer anywhere in `demo/`. The font-switcher UI was removed (or never wired) while the module survived. So "switching fonts in the demo does nothing" is literally true: there's no live caller.

**Defect 2 — `applyFont()` writes a dead token.** Even if re-wired, `applyFont` (`fonts.ts:49-52`) sets `--font-display` and `--font-body`. But the body cascade reads `--font-serif` (`typography.css:143: font-family: var(--font-serif)`), and **`--font-body` is consumed by nothing** (grep: declared only at fonts.ts:51). So a font switch would change display/heading utilities (which read `--font-display`) but never body text. The write targets the wrong variable.

**Defect 3 — Fraunces ships but is unconsumed (orphan face).** `fonts.css:159` ships a full variable Fraunces woff2 (67 KB, present at `dist/fonts/fraunces/`), referenced by `--font-stack-display: "Fraunces"` (tokens.css:43) → `--font-display` (theme.css:49). But the demo's `<html data-typography-preset="brand-uniform-sans">` (index.html:9) overrides `--font-display` to Plus Jakarta (typography.css:132-137 + demo.css:98-102). So the demo loads/ships Fraunces but never paints it — and `demo/fonts.ts:12` even comments "the legacy Fraunces option was retired." It's a shipped-but-dead face under the demo's own preset.

**What works (so the fix is surgical, not a rebuild):** all woff2 binaries exist in both `src/fonts/` and `dist/fonts/`; demo.css's `@font-face` rules use demo-resolvable relative paths (`../src/fonts/...`) — correct, because the published `fonts.css` uses bare `@mkbabb/glass-ui/fonts/...` specifiers that Vite can't resolve in dev (documented at demo.css:13-27). The `brand-uniform-sans` preset correctly cascades Plus Jakarta to body+display, so default demo text renders in the brand face.

### The fix

1. **`fonts.ts:51` — write the real token.** Change `--font-body` → `--font-serif` (the body cascade's actual variable), and keep `--font-display`. One-line fix; makes a re-wired switcher affect body text.
2. **Re-wire OR retire the switcher.** Either import `FONTS`/`applyFont` into the demo's settings/config surface (the live consumer), or delete `demo/fonts.ts` outright (it's dead — KISS, no orphan code). Given the demo dogfoods the brand corpus by design, **retire it** unless a font-picker UI is wanted.
3. **Decide Fraunces: consume or drop.** Either remove `data-typography-preset="brand-uniform-sans"` from a demo route so Fraunces actually paints (proving the shipped face), or, if the brand canon is Plus-Jakarta-only, **drop the Fraunces face from `fonts.css` + the woff2 from `src/fonts/dist`** and repoint `--font-stack-display` off `"Fraunces"`. The repo already half-retired it (demo/fonts.ts:12) — finish the break cleanly (no-backwards-compat).
4. **Gate:** extend `proof:font-axes` to assert no `--font-*` token is written-but-unconsumed (catches the `--font-body` dead-write class) and that every shipped `@font-face` family in `fonts.css` is referenced by a live `--font-stack-*` token (catches the Fraunces-orphan class).

---

## THE HEADLINES

1. **The dock velocity-continuity fold is the single iOS-grade interaction win, and it's confirmed in source:** `useLayerTransition.ts:185,237` dispose+reconstruct `SpringProgress` from the static `DOCK_SPRING` preset on every swap, restarting an interrupted morph from velocity 0 — the exact opposite of Apple's spring-continuity contract. The live solver already tracks velocity; re-seat on retarget instead of reconstructing.

2. **iOS-26 is convergence, not a rebuild — `linear()` goes Baseline WA 2026-06-11.** The spring architecture (analytic solver → tokens + driver) is correct end-to-end; the work is wiring (velocity continuity, materialize-not-fade entrance, single-plane VT morph) plus five token-routed lens folds (rim, lens, concentric radii, adaptive tint, scroll-edge) that keep warm-cream identity intact.

3. **The Tailwind wave is four confirmed lifts, not a sweep:** Progress.vue's deprecated v3 `theme()` syntax (`:181,194`), CarouselDots' arbitrary `bg-[var()]` wrap (`:71-72`) when `bg-muted-medium` exists, the stale `transition-control` citation claiming a Toggle-card consumer it never gained (the card variant hand-rolls a 6-property superset), and the registered shimmer naming inversion. Gate it with a no-`theme()` + no-arbitrary-wrap-with-bridge lint.

4. **Speedtest ledger: six STAY, two MOVE.** The four browser-API wrappers (`usePrioritizedTask`, `useYieldToMain`, `useBreakpoint`, `useIdleReady`, `useViewportReady`, `useViewTransition`) stay CORE; `useStagger` and `useAnimatedNumberMap` return to speedtest — single-repo, domain-coupled animation patterns, not zero-domain primitives. Boundary is clean (zero violations, inv-16 holds).

5. **The demo font "breakage" is three small defects, not a loading failure:** the font-switcher module (`demo/fonts.ts`) has zero live importers; `applyFont` writes `--font-body` which nothing consumes (the body cascade reads `--font-serif`); and Fraunces ships a 67 KB face the demo's own `brand-uniform-sans` preset never paints. Fix: write `--font-serif`, retire the dead switcher, and resolve Fraunces (consume or drop). Default demo text already renders correctly in the brand face.

**Relevant paths:** `src/components/custom/dock/composables/useLayerTransition.ts` (M1, lines 185/237) · `src/styles/dock-controls.css` (M2-M3) · `src/styles/tokens.css` (lens folds; spring presets 144-163) · `scripts/regen-spring-tokens.mjs` (spring source of truth) · `docs/tranches/AV/audit/SOTA-crosswalk.md` (Baseline dates, C3/C4/C5) · `src/components/ui/progress/Progress.vue:181,194` (T1) · `src/components/ui/carousel/CarouselDots.vue:62,71-72` (T2) · `src/styles/utilities.css` + `src/components/ui/toggle/index.ts:33` (T3) · `src/styles/theme.css:49-52,107` (font + color bridges) · `demo/fonts.ts:49-52`, `demo/demo.css`, `index.html:9`, `src/styles/fonts.css:159` (font fix) · `src/composables/motion/{useStagger,useAnimatedNumberMap}.ts` (speedtest MOVE).
