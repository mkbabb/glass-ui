# Style Audit — Slice E: `src/composables/` (+ new usePrioritizedTask / useTextHighlight / platformSupport)

Self-audit run, 2026-06-03. READ-ONLY. Slice: `src/composables/{motion,dom,glass,sortable,sidebar,reactive}` plus the new `usePrioritizedTask`, `useTextHighlight`, and `src/utils/platformSupport.ts`. Axes applied: **1 (token alignment)**, **3 (interactive consistency)**, **5 (overlay+motion vocab)**, plus the duplicated-logic gap hunt. This is a glass-ui self-slice, so every finding is library-canon drift (no consumer to point at); legitimate missing-substrate surfaces as a GLASS-UI GAP.

## Preamble — scope character

This slice is overwhelmingly *behavioural* (rAF loops, observers, feature-detection, scheduler primitives), so axes 2/4/6/7 mostly don't bite — composables emit no CSS classes, no surface tiers, no typography. The one CSS-painting composable in the slice (`useGlassRenderer` — it imperatively writes `el.style.*`) is where axis-1 and the dark-unwind half of axis-7 land hard. The motion sub-tree is otherwise canon-clean on token *intent* (it reads `DAMPING`/`SNAP_THRESHOLD` constants, brackets PRM, names its presets) but carries two real single-source-of-truth duplications that have already drifted once each.

Verification: every token cited was grepped in `src/styles/tokens.css`; every duplicate count was grepped across `src/`.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site | Drift | Canon |
|---|------|-------|-------|
| 1.1 | `glass/useGlassRenderer.ts:198` | Imperatively writes `el.style.border = "1px solid rgba(255,255,255,0.25)"` — a raw light-mode white border literal. | The glass border recipe is `color-mix(in srgb, var(--foreground) N%, transparent)` (`tokens.css:652-657`, the `--glass-border-*` rung). A `rgba(255,255,255,0.25)` border is a baked light-mode value that paints an invisible (or inverted) edge in dark mode — it never unwinds. Should read `var(--glass-border-resting)` (or accept the tier and read the matching rung). |
| 1.2 | `glass/useGlassRenderer.ts:199-203` | Hand-rolled `box-shadow` triplet: `inset 0 0.5px 0 0 rgba(255,255,255,0.3)`, `inset 0 -0.5px 0 0 rgba(0,0,0,0.05)`, `0 4px 16px rgba(0,0,0,0.08)`. | Three separate canon collisions: (a) the inset catch-light is exactly `--glass-highlight: inset 0 0.5px 0 0 hsl(0 0% 100% / 0.25)` (`tokens.css:669`) / the `--border-hairline` pair (`tokens.css:673-676`); (b) the drop shadow `0 4px 16px rgba(0,0,0,0.08)` is byte-for-byte `--shadow-md: 0 4px 16px color-mix(in srgb, var(--shadow-color) 8%, transparent)` (`tokens.css:506`) but with `var(--shadow-color)` (=`var(--foreground)`, `tokens.css:375`) hardcoded to black. All three are dark-unwindable in canon, baked light-mode here. |
| 1.3 | `glass/useGlassRenderer.ts:97-100, 107-111` | Canvas specular/Fresnel gradients hardcode `rgba(255,255,255,0..0.25)` stops. | The specular catch-light token exists: `--glass-specular: inset 0 1.5px 0 0 hsl(0 0% 100% / 0.45)` with a `--glass-specular-dark` companion (`tokens.css:684-685`). These are canvas pixel writes (can't read a CSS var directly inside `createImageData`), so this is a *soft* drift — but the alpha ramp (0.02 / 0.06 / 0.12 / 0.15 / 0.25) is an independent magic ladder with no relation to the token's 0.45/0.30 pair. At minimum the white should resolve through `useTokenColor("--glass-specular-…")` rather than be inlined, so a re-themed specular tint reaches the canvas. |
| 1.4 | `glass/useGlassRenderer.ts:194` | `saturate(1.6) brightness(1.05)` + `blur(${blur * 0.15}px)` magic multipliers. | The glass blur+saturate cascade is tokenised per tier: `--glass-blur-floating: blur(16px) saturate(1.4)` (`tokens.css:610`), `--glass-blur-overlay: …saturate(1.5)` (`tokens.css:611`). The renderer invents its own `1.6`/`1.05` and a `blur * 0.15` derivation untethered from the `--glass-blur-*-radius` token ladder (`tokens.css:595-605`). |
| 1.5 | `glass/useGlassRenderer.ts:147` | `const blur = opts.blur ?? 16` — bare numeric default. | `16` is the `--glass-blur-floating-radius` value (`tokens.css:598`). A code default that happens to equal a token but doesn't reference it drifts silently the moment the token is retuned. |

No token drift found in the motion / dom / sidebar / reactive sub-trees: `useAnimatedNumber` reads `DAMPING`/`SNAP_THRESHOLD` from `motion/constants.ts`; `useStagger` documents and defaults to the `--motion-stagger-default` 80ms value (`tokens.css:130`) and names the tight/relaxed tiers; `useViewportReady`/`useScrollTracker` magic numbers (rootMargin, threshold, `idleTimeout`) are behavioural tuning, not visual tokens.

### Axis 3 — Interactive consistency

| # | Site | Drift | Canon |
|---|------|-------|-------|
| 3.1 | `useSpringPress.ts:55-58` (doc) + the composable's whole contract | `useSpringPress` ships press feedback as `value → transform: scale(1 - value*0.05)` in the example, i.e. a raw `0.05` press displacement. | The canonical press displacement is the `--scale-press-btn` token (CLAUDE.md "active (`scale-[var(--scale-press-btn)]`)"). The spring composable is *physics*, which is legitimately new substrate — but its documented usage example bakes a `0.05` scale delta instead of deriving from `--scale-press-*`. This is a doc/contract drift, not a code path; flagged so the example doesn't seed `0.05` into consumers when a `--scale-press-btn`-derived amplitude is the house value. See GAP-3. |

`useTouchGate` (hit-area / activation guard) and `useSidebarFollow` (scroll damping) carry no focus-visible / press / disabled obligations — they gate touch and scroll, not interactive controls. No ad-hoc hover/press/disabled state machines found in the slice.

### Axis 5 — Overlay + motion vocab

| # | Site | Drift | Canon |
|---|------|-------|-------|
| 5.1 | `useGlassRenderer.ts` (whole module) | Reimplements glass as imperative `el.style.backdropFilter` + canvas displacement maps, entirely outside the `.glass-*` ladder and the `--glass-*` token cascade. It composes no canonical tier, no Vue transition, no z-token. | This is the slice's biggest motion/overlay-vocab divergence: a second, parallel glass renderer that doesn't know about `glass.css`'s 5-rung ladder or the `--glass-blur-*` / `--glass-bg-*` / `--glass-border-*` tokens. Whether it should exist at all is a substrate question (it's the `svg-filter` tier escape hatch for Chromium refraction) — but as written it cannot be re-themed and breaks the token-first axis (J invariant 1). See UNION-1. |
| 5.2 | `useStaggerReveal.ts:65`, `useStagger.ts:125` | Both drive entrance reveals via JS `setTimeout` cascades. | This is *intentional and correct* — `useStaggerReveal` explicitly gates to the JS fallback path only when the native `view()` timeline is absent (`NATIVE_VIEW_TIMELINE`, line 26) and `useStagger` is the unconditional cousin by design. Noting it as **non-drift** so a future audit doesn't re-flag: the dual-path-single-writer rule is honoured (`supportsViewTimeline()`), and PRM is bracketed (`useStagger.ts:119`). |

`useSpringMount` (the Dialog/Sheet spring mount substrate) correctly brackets PRM via `useSpring`'s `respectReducedMotion` (`useSpringMount.ts:120`) and the spatial drag-dismiss degrades to an instant transform under PRM — axis-5 PRM-bracket clean. `useRAFLoop` gates the entire loop on `prefers-reduced-motion` (`useRAFLoop.ts:64,230-257`) — clean.

---

## GLASS-UI GAPS

Patterns the slice (and the wider `src/`) needs that the library doesn't yet expose cleanly.

### GAP-1 — No shared reactive `prefers-reduced-motion` primitive (hand-rolled at 6+ sites)

`prefersReducedMotion()` is hand-rolled identically (`window.matchMedia("(prefers-reduced-motion: reduce)").matches` with the SSR guard) at:
- `composables/motion/useStagger.ts:54-62` (private `prefersReducedMotion()`)
- `components/custom/typewriter/utils/timing.ts:101` (exported `prefersReducedMotion()` — a second public copy)
- `components/custom/tabs/BouncyToggle.vue:155`
- `components/custom/aurora/composables/runtime.ts:197`
- `components/custom/aurora/renderMode.ts:46`
- `components/custom/aurora/composables/useAurora.ts:198`

plus the `REDUCED_MOTION_QUERY` constant + live listener wiring in `composables/motion/useRAFLoop.ts:64,230-257`. That's **7 independent encodings of the same media-query string**, two of which are already *exported* public functions (typewriter) — a guaranteed drift source. The query string literal is repeated 6× with no single owner.

Proposal: a `useReducedMotion()` composable in `composables/motion/` returning a reactive `Readonly<Ref<boolean>>` (live across the `change` event, SSR-safe `false`), with a static `prefersReducedMotion()` snapshot export for the non-reactive call sites. `useRAFLoop` already owns exactly this listener machinery internally — lift it out and have `useRAFLoop`/`useStagger`/aurora/typewriter consume the one primitive. Placement: `src/composables/motion/useReducedMotion.ts`, re-exported through `motion/index.ts` and the engine-free `/motion-core` leaf (it's vueuse-free + keyframes-free, same tier as `useYieldToMain`).

### GAP-2 — Spring presets are declared twice (JS table ≠ CSS token generator), kept in sync by comment

`useSpringMount.ts:39-44` hardcodes a `SPRING_PRESETS: Record<SpringPreset, {response, dampingFraction}>` table with the four `(response, ζ)` pairs (`smooth 0.5/0.86`, `snappy 0.35/0.65`, `bouncy 0.5/0.45`, `gentle 0.7/1.0`). `scripts/regen-spring-tokens.mjs:30-52` declares **the same four pairs** as the source of truth for the `--spring-{smooth,snappy,bouncy,gentle}` CSS `linear()` tokens (`tokens.css:158-161`). The code comment (`useSpringMount.ts:34-38`) explicitly says it "MUST stay in lockstep" with the regen script — and it has already drifted once (the comment records the AM-W2-α `snappy ζ 0.85→0.65` / `bouncy ζ 0.65→0.45` retune that had to be applied in both places).

Proposal: a single exported `SPRING_PRESETS` map (the `(response, ζ)` pairs) in `composables/motion/` that BOTH `useSpringMount` imports AND `regen-spring-tokens.mjs` reads (the regen script is a Node `.mjs`, so it can import a plain TS/JS preset module compiled or shipped as a `.mjs` constant). This collapses the "lockstep by comment" coupling into a real import. The CSS `linear()` strings stay generated; the named keys stay the public contract per the regen-script header (`regen-spring-tokens.mjs:27-28`).

### GAP-3 — No `--scale-press-*` / `--scale-hover-*` value exposed to JS spring consumers

`useSpringPress` produces a 0..1 press signal but its documented binding bakes the displacement amplitude (`1 - value * 0.05`, `useSpringPress.ts:57`). The canonical press scale lives in `--scale-press-btn` (CSS token, per CLAUDE.md component contract) and there is no JS-reachable mirror, so any spring-press consumer reinvents the `0.05`. Hardcoded ≥ here + wherever consumers copy the example.

Proposal: either (a) expose the press/hover scale deltas as a small JS constant alongside the spring presets (one source, mirroring the CSS token), or (b) document the binding as reading the token via `useTokenColor`-style resolution so the spring amplitude tracks `--scale-press-btn`. (a) is lighter and avoids a getComputedStyle per press.

### GAP-4 — Document-visibility / pause gating logic duplicated (`useRAFLoop` ↔ `useIntersectionPause`)

`document.hidden` + `visibilitychange` listen/teardown + an `isDocumentHidden`/`isDocumentVisible` reactive ref is implemented separately in `composables/motion/useRAFLoop.ts:107,218-228,263` and `composables/motion/useIntersectionPause.ts:62-64,120-127,136`. Same platform seam, two encodings (one names it `isDocumentHidden`, the other `isDocumentVisible` — already a polarity divergence). Not a *visual* drift, but a duplicated-logic gap squarely in the slice.

Proposal: a `usePageVisible()` primitive (reactive `Ref<boolean>`, SSR-safe) in `composables/dom/`, consumed by both. Low-risk, both call sites already want the identical listener.

---

## UNION CANDIDATES

### UNION-1 — Two glass renderers: token-cascade `.glass-*` ladder vs. imperative `useGlassRenderer`

The library has two non-overlapping glass implementations:
- **Canon:** the `.glass-{wash,quiet,resting,floating,overlay}` 5-rung ladder (`glass.css`) reading the `--glass-bg-*` / `--glass-blur-*` / `--glass-border-*` / `--glass-highlight` token cascade (`tokens.css:584-685`) — fully token-first, dark-unwindable, `@supports`-gateable.
- **Drift:** `composables/glass/useGlassRenderer.ts` — imperative `el.style.*` writes with raw `rgba()` literals (findings 1.1-1.5), a parallel SVG-`feDisplacementMap` refraction tier that the token ladder knows nothing about.

These are the *same surface intent* (frosted glass with edge catch-light + drop shadow) expressed two ways. The canonical form is unambiguously the token-cascade ladder. The displacement-map refraction is a genuine capability the ladder lacks (Chromium-only true refraction), so the union isn't "delete the renderer" — it's **rebase the renderer onto the token cascade**: read `--glass-border-*`, `--glass-highlight`, `--shadow-md`, `--glass-blur-*` via `useTokenColor` (already in this slice — `dom/useTokenColor.ts`) instead of the baked `rgba()`s, so the refraction tier inherits the same dark-mode-correct, re-themable values the CSS ladder gets. That folds the second renderer back under the token-first axis without losing the Chromium refraction it uniquely provides. Also missing (axis-7, since this REimplements glass): no `@supports not (backdrop-filter)` / `prefers-reduced-transparency` fallback in the imperative path — `detectTier()` returns `"fallback"` (`useGlassRenderer.ts:24`) but the `createGlassFilter` path that writes the literals has no reduced-transparency guard.

---

## Tally

5 drift findings (axis 1: 5 incl. 1 soft; axis 3: 1 doc-contract; axis 5: 1 structural + 1 logged non-drift) — all concentrated in `useGlassRenderer.ts`; 4 GLASS-UI GAPS (shared reduced-motion primitive; spring-preset single-source; JS press-scale token; page-visibility primitive); 1 UNION CANDIDATE (rebase `useGlassRenderer` onto the `--glass-*` token cascade). Motion/dom/sidebar/reactive sub-trees are token-clean; the new `usePrioritizedTask`/`useTextHighlight`/`useYieldToMain`/`platformSupport`/`useViewTransition` leaves are canon-clean (feature-detected, dependency-free, PRM handled in CSS where applicable).
