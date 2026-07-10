# Glass-UI Design Language

A primitive design system for glassmorphic Vue 3 interfaces. Token-driven, component-first, four-state interactive, kinetically typographic, orthogonally variant.

## Philosophy

Five principles govern the library.

**Token-first.** Every visual behavior is a CSS custom property. Consumers override via a preset CSS file imported after the library. No consumer edits library source for styling. Visual parity between consumers is a side effect of token discipline.

**Component over CSS class.** Interactive elements are Vue components, not utility-class recipes. Components bundle their four-state contract—you cannot forget a hover variant, a focus ring, a disabled style. Static patterns (glass surfaces, typography, decorative utilities) are CSS classes.

**Four-state interactive contract.** Every interactive element implements rest, hover, active, and disabled states. Focus-visible adds a ring. `aria-pressed` / `.is-active` adds semantic toggling. Scale, color, and opacity compose—never hardcoded transforms scattered across components.

**Orthogonal variants.** Surface tier (opacity + blur + border + shadow) is independent of semantic variant (intent) is independent of structural variant (shape geometry). A ghost Button sits flat on any Card variant. These axes never collapse into one vocabulary.

**Aristotelian proportion + the iOS-27 canon.** Geometry is golden, never arbitrary: the type ladder steps by √φ (≈1.272), long-form leading is φ (1.618), the rest motion-weight is 1/φ (≈0.62), and every free radius / spacing / measure derives from the φ family rather than a round px (§L6). And the library is not "iOS-inspired" — it builds **reference-grade canonical iOS-27 Liquid-Glass demos that MATCH or BETTER** the analyzed reference set (`docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`, the bar T1–T17): perfected transmissive warm-cream glass (a colorful field behind glass + a defined edge, NEVER gray/dark/opaque, both modes), visible paper grain, audacious √φ type, cartoon flow & punch, golden proportion, and liquid weight on all motion. A primitive that merely *approximates* the reference has not shipped. Proportion is a *bias*, not a tyranny — hit targets, optical corrections, and the 1px hairline stay literal.

---

## Liquid Glass design language

The four philosophy pillars describe HOW we ship the library. This section describes WHAT we ship — the design language those pillars carry. It is iOS-aligned (Liquid Glass material + spring physics + dynamic surface life) and idiomatic to the web (CSS custom properties, `backdrop-filter`, `linear()` easings, `@property`-typed interpolation). The reference bar is absolute and external: every surface clears or exceeds `IOS27-REFERENCE.md` (T1–T17). "iOS-aligned" is not aspiration — it is the measured floor; a primitive's spec is incomplete until it cites the reference target (`T1`…`T17`) it matches-or-betters.

Seven precepts compose the language. Each precept is canonical: when a primitive ships a surface, motion, tap response, motion tier, or a11y bracket, it consumes from this vocabulary rather than minting its own.

### §L1 — Liquid Glass

Liquid Glass is the iOS 26 material — a real-time refractive surface, not a Gaussian frost. Traditional `UIBlurEffect` *scattered* light through a convolution; Liquid Glass *bends and concentrates* light, closer to physical glass than to plastic. We adopt that mental model: glass-ui surfaces are lensing layers, not blur swatches.

**The six-layer composite.** Every glass surface composes six optical layers. A primitive that omits one reads as iOS-7-flat, not iOS-26-liquid. We require all six (or the documented degraded fallback under §L5):

1. **Backdrop blur + saturation** — the refraction proxy. `backdrop-filter: blur(<r>) saturate(<f>)` per tier. The saturation channel matters as much as the blur radius; it carries the "concentrated light" reading.
2. **Surface tint (rgba background)** — the light-vs-dark admit-through. Light-mode and dark-mode tints differ; the dark-mode tint is denser to compensate for the lower contrast floor.
3. **Edge rim (border)** — the boundary halo that holds the surface against its backdrop. `border: 1px solid var(--glass-border-<tier>)`. Carried by the per-tier border opacity.
4. **Inner shadow / catch-light** — the upper-edge specular streak (`inset 0 0.5px 0 0 hsl(0 0% 100% / 0.25)` via `--glass-highlight`) that reads as "this surface has an edge that catches the room light."
5. **Drop shadow** — adaptive depth shadow under the tile; depth scales with z-elevation. Per-tier `--glass-shadow-<tier>`.
6. **Grain overlay** — the micro-texture (`paper-grain-overlay`, 3.5% in light / 6% in dark, `overlay` → `soft-light` blend) that prevents the surface from reading as flat-shaded plastic.

The substrate values live in `tokens.css §11..§14` and `glass.css`; the consumer composition is `.glass-<tier>` + `paper-grain-overlay` + (optionally) the K W6 `btn-audacious` dynamic-refraction recipe for the animated end of the canon. See §Glass Surfaces for the token table.

**The seven tiers.** I promulgate seven glass tiers as the canonical surface ladder. Each tier names what the surface IS in the composition, not which utility class it happens to use. The light-α / blur / border / shadow values cascade through §Glass Surfaces:

| Tier | Class | Role | When it lands | iOS analogue |
|---|---|---|---|---|
| **Wash** | `.glass-wash` | Permeable veil over a kinetic backdrop | Dock substrate, input chrome, hover bg — anywhere the backdrop must read through | TabBar / Toolbar |
| **Quiet** | `.glass-quiet` | Inline workspace chrome — present but recessive | Sidebar, inline panel, secondary chrome | Sidebar / inline panel |
| **Resting** | `.glass-resting` | Canonical translucent + frosted plate; the default a primitive reaches for | Cards, sheets, the `<GlassPanel>` default surface | Sheet / Card |
| **Floating** | `.glass-floating` | Elevated transient surface | Popovers, tooltips, dropdowns, context menus | Popover / ContextMenu |
| **Overlay** | `.glass-overlay` | Modal-over-modal; takeover surface | Dialogs, command palette, action sheets | Dialog / Action Sheet |
| **Dock** | `.glass-dock` | Translucent plate over backdrop motion; `blur(0)` floor by design so the backdrop's blur reads through | DynamicIsland / Dock / floating action bar | DynamicIsland / Dock |
| **Chassis** | `.glass-chassis` (via `<InstrumentChassis>`) | Engraved-bezel composition substrate hosting multi-region content | A meter + readout pair, a survey + flow-status pair, any multi-region instrument | NavigationStack container |

The table above is the **vocabulary**. When I describe a primitive's surface I name the tier ("popover content is `floating`"; "dock is `dock`"; "modal is `overlay`"), and the reader knows the entire substrate cascade those words invoke.

**Tier selection rule.** Reach for the lowest tier that still meets the legibility floor. A surface that does not need to admit backdrop pixels should NOT use `wash` — use `resting`. A surface that does not need elevation depth should NOT use `floating` — use `resting`. The ladder is monotone in visual weight; over-reach (every card as `floating`) is the canonical anti-pattern.

**Glass cannot sample glass.** Two overlapping `backdrop-filter` surfaces produce a black/incorrect composite — each layer's filter sees the other's filter output, not the underlying content. Overlapping glass surfaces must share a single composition container (the iOS equivalent is `GlassEffectContainer`). At glass-ui this means: monotone Z-stack per §Composition (Aurora → Dock → Card → Modal), never two `.glass-<tier>` surfaces directly overlapping at the same z-tier without a parent container managing the composite.

### §L2 — Spring Physics

I promulgate spring physics as the canonical motion vocabulary. A spring describes feeling: response time + damping + overshoot. The substrate exposes both an **API canon** (the parameters consumers reason about) and three **named presets** (the curves consumers reach for).

**API canon — `response` + `dampingFraction`.** The SwiftUI Generation-A API (`spring(response:dampingFraction:blendDuration:)`) is the lingua franca; we adopt the same parameter names so iOS-fluent consumers don't context-switch:

- `response` — time to reach target (seconds). Lower = faster. Tap responses sit at `0.35s`; sheet entrances at `0.5s`; sidebar slides at `0.55s`.
- `dampingFraction` — `0` = pure bounce, `1` = critically damped. Tap responses sit at `0.8`; sheets at `0.85`; bouncy reveals at `0.65`; ambient transitions at `0.85+`.
- `blendDuration` — cross-fade window when interrupting another animation. Defaults to `0`; only matters for gesture-velocity continuity.

The keyframes.js `useSpringOrchestrator` composable (§Composables) accepts both this physical API and the perceptual API (`{ duration, bounce }`, iOS-17+); the CSS-only path consumes the three `linear()`-spring curves below.

**Three canonical springs.** The iOS-17 named-preset trio is the workhorse vocabulary; each names a **feeling**, not a curve shape:

| Preset | ζ (damping) | Bounce | Overshoot | Feels like | When it lands |
|---|---|---|---|---|---|
| `--spring-smooth` | 1.0 | 0.0 | 0% | "Sustained glide" | Pane swap, metric crossfade, sheet present, list reorder — anywhere the system speaks calmly |
| `--spring-snappy` | 0.65 | 0.15 | ~7% | "Confident tap" | Tap release, toggle flip, dropdown enter, dock layer swap — anywhere the user just touched a pixel |
| `--spring-bouncy` | 0.45 | 0.30 | ~20% | "Playful arrival" | Sheet entrance, modal entrance, toast arrival, blob morph, celebratory reveal |

The `--spring-gentle` curve (ζ=0.85, < 1% overshoot) lives alongside as the patient-settle variant for scroll-driven choreography and ambient transitions; it is the smooth-bouncy bridge for cases where `smooth` reads as too inert. See §Easing → Spring curves for the full `linear()` interpolation values.

**The Cartoon punch curve — `--ease-cartoon-punch` (§Easing).** The four springs are the calm Liquid-Glass vocabulary; their overshoot is bounded to ≤10% by invariant (a tighter, "pointed" spring is the too-springy defect). The **Cartoon register** (§L4 → universal exaggeration; §Shadows → the moving cast) reaches *past* that ceiling for its deliberate exaggeration via a **shaped `linear()` keyframe**, not a spring: `--ease-cartoon-punch` anticipates (a real ~4% dip *below* origin — the §L4 anticipation principle made a curve, which no damped spring can express, since a single damped spring approaches its target monotonically from one side), then overshoots ~22%, then settles. It ships as a plain CSS easing token in §Easing — NOT a `SPRING_PRESETS` row (the ≤10% overshoot invariant + the analytic spring solver stay intact) and NOT a typed `MOTION_CURVES` entry (`MotionCurveKind` is the closed `"spring" | "bezier"` union; a hand-shaped `linear()` is neither, so it lives as a raw `--ease-*` custom property, requiring no engine extension). It is loud by design and opt-in; the workhorse remains `snappy`. PRM collapses it to `--ease-standard` like every spring (§L5).

**Two cubic-bezier fallbacks** coexist as the substrate-cheap path for micro-interactions and the iOS-native decelerate register:

- `--motion-ease-apple-spring` (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`) — single-step elastic overshoot for switches and micro-hovers that don't want the multi-stop `linear()` cost.
- `--ease-standard` (`cubic-bezier(0.4, 0, 0.2, 1)`) — calm decelerate; the default for non-spring exits and time-bound system-driven motion.

**Spring selection rule — "if the user's finger touched a pixel, use a spring."** A press-release is `snappy` (the user demanded the motion). A sheet entrance is `bouncy` (the surface arrived to greet). A pane swap is `smooth` (sustained, no overshoot). System-driven time-bound motion (progress bars, auto-advancing carousels, scripted onboarding) uses `--ease-standard`, not a spring — those are observer motions, not driver motions. When unsure, default to `snappy`: it is the iOS workhorse.

### §L3 — Tap Choreography

Every interactive primitive squishes on press. Tap-squish is `transform: scale()`, not opacity, not bg-tint — opacity flips and bg-tints are interactive-rest indicators, not press feedback. No primitive may ship a press-feedback that is NOT squish-press.

**Canonical rung — 0.96.** The single canonical press-scale is `0.96` (the iOS `.regular` control rung). Consumers reach for `--scale-press` and get the canonical squish. The substrate ships two adjacent rungs for outlier cases, but the default — and the rung every primitive should pick unless it has a documented reason — is `0.96`:

- `--scale-press` (0.96) — **canonical**. The single rung consumers reach for.
- `--scale-press-btn` (0.97; aliased `--scale-press-sm`) — slightly softer; legacy button + slider rung kept for back-compat.
- `--scale-press-dock` (0.92) — deeper; dock-control rung that compensates for the smaller hit target.

**The choreography.** A tap is a three-phase sequence, all carried by tokens:

1. **Press (`:active`).** Surface scales to `--scale-press` (0.96) immediately. Touch-point illumination optional: a radial-gradient white at 0.15 α, ~60px radius, centered on touch — the iOS "your finger landed here" cue. Hold-without-release ≥ 1s engages shimmer (1.5s loop, 0.08 α sweep).
2. **Release.** Spring carries the return: `--spring-snappy` on a `scale(0.96 → 1)` keyframe. Duration ~`response: 0.35s`, `dampingFraction: 0.8`. The ~7% overshoot reads as the surface "popping" back, not just untransforming.
3. **Settle.** Spring damps to rest; no residual transform. Hover state (if applicable) resumes from rest, not from the press transform.

The `useTouchGate` composable mediates the pointer / touch event distinction so the squish fires on touchstart (immediate) on touch devices and on pointerdown (with hover-aware delay) on hover devices. The `useSpringOrchestrator` composable carries the release.

**Tap-squish is universal.** Buttons squish. Sliders squish. Dock controls squish (deeper, per `--scale-press-dock`). Cards that opt into interactivity squish. Custom chips squish. A primitive that wants press feedback consumes the squish-press recipe; it does not invent a new press metaphor.

### §L4 — Motion Tiers

Disney's 12 principles are the canonical taxonomy for UI motion. **The library ships substrate for all twelve** — the *Liquid Weight is Universal* law: every **driver** motion (a motion the user's finger or a route-change caused) carries weight, inertia, bounce, and squish; it anticipates, overshoots, follows through, and travels an arc, and it morphs MORE the faster it moves (`useLiquidFlex` velocity-coupled squish). Motion that snaps tight with no give — instant, fade-only, no settle — is the anti-pattern, not a style. The principles split into two tiers by **who orchestrates them** (one primitive vs a scene), never by whether the library ships them.

**`--motion-weight` (0 → 1, rest `0.62 ≈ 1/φ`).** One scalar names *how much cartoon* a surface carries; it co-scales the squash depth, the overshoot share, the anticipation pull-back, and the cartoon-shadow travel together so they read as one proportioned deformation, never four unrelated tics. A primitive picks it once at rest (`0` = still, with a documented reason; dock / celebration push toward `1`). It is **driver-scoped**: an *observer* content-snap — a content carousel settling, a list reordering under the user's scroll — stays calm-overdamped per the §L2 driver-vs-observer rule (an over-springy carousel reads cheap; iOS reserves the bounce for open/morph). Liquid weight is universal on DRIVERS, not on every pixel that moves. PRM → `--motion-weight: 0` (the §L5 cascade zeroes the extra squash, overshoot, anticipation, arc, and stagger in one assignment). The token's value lands in §Motion per the Feature-token-home rule.

**Universal tier — every primitive shipping driver motion honors these:**

| # | Principle | iOS-27 embodiment | Glass-ui substrate (live) |
|---|---|---|---|
| 1 | **Squash & stretch** | press → scale 0.96, bounce back; vol-preserving X·Y squish on move | `--scale-press` + `--spring-snappy` (§L3); `useLiquidFlex` (X·Y≈1) |
| 2 | **Anticipation** | a control dips before it launches; a sheet pulls back before sliding up | `--ease-cartoon-punch` pre-dip (§L2 / §Easing); `--motion-weight` |
| 5 | **Follow-through / overlap** | a child glyph settles *after* its parent; a label cross-fades trailing the indicator glide | `useStagger` / `useStaggerReveal` per-element delay (× `--motion-weight`) |
| 6 | **Slow in / slow out** | every non-spring decelerates | `--ease-standard`; springs carry it intrinsically |
| 7 | **Arc** | a morph travels a curved path, not a straight lerp | the fission `--split-dx`/`--split-dy` two-axis travel + the `useLiquidReveal` source-rect FLIP path — a real curve, not a line |
| 9 | **Timing** | tap < 250ms; transition 400–600ms; modal 500–800ms | `--duration-fast` / `-base` / `-slow` (§Duration) |
| 10 | **Exaggeration** | spring overshoot; pull-to-refresh elastic; the cartoon PUNCH | `--spring-bouncy` (§L2) → the cartoon `--ease-cartoon-punch` ceiling |
| 11 | **Solid drawing** | glass depth conveys z; the cartoon layered-offset shadow gives a 2.5-D pop | the §L1 seven-tier ladder + `--z-*`; the §Shadows Cartoon register |
| 12 | **Appeal** | distinctive personality — refraction, blob/meatball morph, technicolor punch | `<Aurora>` + the meatball goo (§L7) + the Cartoon register |

**Scene-orchestrated tier — a composition orchestrates these from the universal substrate; the library *enables* them, no longer disclaims them:**

| # | Principle | Why it is scene-level | How the library enables it |
|---|---|---|---|
| 3 | **Staging** | backdrop-dim + non-focal desaturate is a scene decision, not a widget's | the drawer `--glass-drawer-t → scrim / page-scale` coupling + `<Aurora>` tone controls — the substrate provides the scrim + scale tokens, the consumer stages |
| 8 | **Secondary action** | which sibling reacts to a primary is a cascade the scene owns | `useStagger` / `useStaggerReveal` chains in a composition recipe + the tab-indicator glide (`--tab-indicator-*`) carrying a trailing label cross-fade |

Principle 4 (straight-ahead vs. pose-to-pose) is not a tier — it is the §L2 spring-vs-ease decision (gestures = straight-ahead spring; transitions = pose-to-pose keyframe).

Every principle now names its **live** substrate; the difference between the tiers is orchestration scope, not whether the library ships it. A primitive's spec names which principles it exercises, which `--motion-weight` it rests at, and which spring/curve (§L2) carries the motion.

### §L5 — Accessibility brackets

Apple's HIG mandates three a11y fallbacks for Liquid Glass; glass-ui inherits the mandate. **All three are non-negotiable.** A primitive that ships a glass surface or a spring motion without honoring all three is incomplete.

Each bracket disables a specific subsystem rather than degrading the entire vocabulary uniformly. The tokens honor the media queries automatically — consumers do not roll their own checks.

| User preference | Subsystem disabled | Glass-ui behavior |
|---|---|---|
| `prefers-reduced-transparency` | Transparency / blur | Surface α → 1.0; `backdrop-filter` → none; grain → 0; rim → solid border. Glass becomes opaque tinted surface; legibility floor guaranteed. |
| `prefers-reduced-motion` | Springs + morphs + ambient motion | Springs → `--ease-standard` (no overshoot); rubber-band → cross-fade; `<Aurora>` pauses via `useIntersectionPause` siblings; tilt-gyro and shimmer off; tap-squish duration → instant or replaced with subtle opacity cue. |
| `prefers-contrast: more` | Vibrancy + thin rim | Rim opacity → 1.0; rim width × 2; text color → max contrast (`--text-strong` floor); vibrancy / saturation boost off; contrast ratio guaranteed against the worst-case underlying content (WCAG 4.5:1 against any backdrop pixel, not just the midtone). |

**Worst-case contrast.** The contrast requirement on glass surfaces is NOT against the midtone backdrop — it is against the **worst-case** underlying content. A glass surface over `<Aurora>` must hold WCAG 4.5:1 against the brightest pixel Aurora can paint AND against the darkest. The §Glass Surfaces accessibility fallback rules + the §Default Color Palette text-color tokens encode this floor; primitives composing glass over kinetic backdrops must verify the floor at consumer build-time (Playwright-MCP visual contrast probe is the canonical verification path).

**No silent degradation.** A glass surface MUST NOT silently fall back when `prefers-reduced-transparency` is on without also retiring the grain + the catch-light + the saturate boost — those layers are the refraction; without the blur they read as decorative noise on a solid plate. The §Glass Surfaces "Accessibility fallbacks" rules carry the cascade; primitives consume those rules by composing the tier classes (`.glass-<tier>`) rather than by hand-rolling the layer recipe.

### §L6 — Aristotelian Proportion

Proportion is a governing axis, peer to glass and motion. **Nothing dimensional is arbitrary**: radii, spacing, padding, card width, the rest motion-weight, and the type ladder derive from the golden section (φ ≈ 1.618) and its root (√φ ≈ 1.272). The type ladder already obeys this (§Typography, √φ steps) — the proven exemplar; §L6 extends the law to all dimensional tokens.

- **Type** — the √φ ladder (`--type-*`), unchanged.
- **Radius** — the √φ-derived ladder (§Border Radius); **concentric** nested radii subtract the gap (`r_inner = r_outer − gap`) so corners stay parallel (the iOS concentric-radius law; `BD.W-CONCENTRIC-RADIUS`).
- **Spacing / padding** — the canonical gaps step by √φ from a base; a card's padding and its corner radius share the proportion so it reads as one proportioned object.
- **Card width / measure** — long-form measure targets the golden ratio of its column; hero stages target φ² of the body rung.
- **Motion** — the rest `--motion-weight` is `1/φ ≈ 0.62` (§L4): present, alive, never manic.

**Selection rule.** When a primitive needs a free dimension it reaches for the nearest φ-ladder token, never a hand-picked px. A new dimension earns a √φ-indexed rung; a non-φ value that is not a documented physical constant (1px hairline, hit-target floor, 60fps budget) is a defect the overfitting audit flags.

**A11y carve.** Proportion is geometry, not motion or transparency — it has NO PRM / reduced-transparency bracket; it holds identically across all a11y states. (That is why it is its own precept, not folded into §L1 or §L4.)

### §L7 — The Cross-Engine Floor

Every glass, motion, and meatball precept must render **identically perfect in Chrome AND Safari/WebKit** — a hard gate, not best-effort (the reference bar is iOS; a WebKit defect is a failed surface). The floor names the sanctioned + forbidden mechanisms ONCE so every precept cross-references one rule instead of re-litigating "Safari-safe" per section.

**Sanctioned (identical on both engines):**
- **Compositor channels only for steady-state animation** — `transform`, `opacity`, and a surface's OWN `filter` (blur-settle, brightness) are GPU-composited on both engines.
- **Meatball goo = a STATIC inline-SVG `filter: url()` over a frozen layer** — the `feGaussianBlur` + `feColorMatrix` alpha-threshold goo (`DockGooFilter` / `GlassGooFilter` / `#glass-goo`, `fission-bridge.css`) is applied to a layer whose *children* move on `transform`; the filter element itself is static. The merge is a **real metaball** — two blurred shapes whose alpha thresholds fuse at the waist (necks stretch, thin, and SNAP), **never a naive ellipsoid tween**. **`color-interpolation-filters: sRGB` is mandatory**: WebKit renders SVG filters in sRGB *regardless* of the `color-interpolation-filters` value (a known WebKit limitation — see `WatercolorDot.vue`), while Chrome/FF honor `linearRGB`; declaring `sRGB` forces Chrome to match WebKit's forced-sRGB threshold so the waist reads identically on both (the live filters already set it).
- **`@supports` + PRM floors** — every glass / motion / goo precept ships its degraded arm (`@supports not (backdrop-filter)` solid arm; PRM → instant topology swap, zero neck frames).

**Forbidden (breaks or janks on WebKit):**
- **`backdrop-filter: url(#…)` for the goo or any steady-state** — WebKit drops an SVG-filter reference through `backdrop-filter`; the goo is a normal `filter` on the surface's own layer (the §L1 "glass cannot sample glass" trap is adjacent). *Sanctioned exception:* a **`@supports (backdrop-filter: url(#…))`-GATED, Chromium-only refraction enhancement with a plain-blur WebKit fallback** (the live `glass-refract` lens, `glass-refract.css`) — the gate + the fallback arm are what make it cross-engine-honest, never an un-gated declaration.
- **A goo `filter: url(#…)` on an ANCESTOR of a transmissive glass surface** — an ancestor `filter` creates an isolated rendering buffer that KILLS `backdrop-filter` on EVERY descendant (both Chrome and WebKit), so the glass renders a flat opaque slab instead of transmitting the field behind it (a §3 / BA.W-NO-GRAY violation — the dock-hub goo-tear lesson). The goo metaball neck/bridge and a transmissive glass surface are mutually exclusive *under a shared ancestor filter*. The neck must be a **SIBLING** layer (the `fission-bridge.css` / goo-morph pattern — the goo rides its own layer next to the glass, never wrapping it), never an ancestor of the glass.
- **Per-frame `backdrop-filter` re-blur in a steady-state loop** — re-samples the backdrop every frame (pathological on WebKit). Backdrop-blur ENGAGE is gated to a one-shot overlay-pull window, never a loop.
- **`light-dark()` wrapping an inset-shadow fragment** — computes the whole `box-shadow` to none on both engines (the live `feedback_lightdark_inset_shadow` trap); per-mode arms only.
- **Naive ellipsoid "blob" tweens** masquerading as metaballs — they read as two shapes sliding, not merging; the goo threshold is the only sanctioned merge.

**The paint-cost fence.** Paint-bound animations (the cartoon `box-shadow` throw, a `border-radius` morph, a large `filter` region) are gated to discrete state-flips or one-shot transitions, never steady-state loops; steady-state motion uses transform/opacity only. A viz (Aurora, DotFlow) owns its own canvas (GPU-only, offscreen-paused via `useIntersectionPause`) and inherits the PRM-freeze + park-when-hidden floor.

A precept's spec is incomplete if it ships a motion or goo mechanism without naming its §L7 arm (which channel, which fallback, which fence). The acceptance proof is a **paired-engine π capture** (Chromium AND WebKit), never a single-engine green.

**Cross-references.** The substrate values for the seven precepts live elsewhere in this document:

- §L1 Glass tier values → §Glass Surfaces (token table + accessibility fallbacks)
- §L2 Spring curve values → §Easing → Spring curves
- §L3 Press / lift / focus scales → §Interactive States
- §L4 Duration tokens → §Duration; z-stack → §Z-Index Stack; motion primitives → §Motion + §Composables; `--motion-weight` → §Motion
- §L5 A11y fallback rules → §Glass Surfaces → Accessibility fallbacks
- §L6 Proportion → §Border Radius (√φ ladder + concentric rule) + §Typography (√φ exemplar)
- §L7 Cross-engine arms → §Glass `@supports`/PRM fallbacks + the goo filters + §Motion Safari fences

A primitive's section in this document SHOULD name which tier (§L1), which spring or curve (§L2), which tap rung (§L3), which motion principle + `--motion-weight` (§L4), which a11y bracket (§L5), which §L6 proportion rung, and which §L7 cross-engine arm (channel + fallback) it consumes. Specs that ship without naming their precept-level vocabulary are incomplete.

---

## Token Architecture

Tokens live in `src/styles/tokens.css` under `:root`, with `.dark` overrides. Consumers wire in this order:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "./preset.css";        /* consumer token overrides */
@variant dark (&:where(.dark, .dark *));
```

### Feature token home rule (Q-coh-4)

**Feature tokens live in `tokens.css` under a `§<feature>` block. Feature recipes consume them from the feature's own stylesheet.**

Rationale: tokens.css is the single consumer-overridable contract surface. When a feature's knobs are in tokens.css and its recipes are in the feature's CSS file, every override site is predictable—consumers know to look in tokens.css, and the feature stylesheet is free of raw literals. Splitting token assignments between tokens.css and a second file (utilities.css, dock.css, etc.) creates a cascade-order dependency that is silent and fragile; the W3 dock split-brain (Qβ-F1 / Qβ-F4) is the canonical failure mode.

The rule has two parts:

1. **Token definition belongs in `tokens.css`** under the named `§<feature>` block (`§16 TIMELINE`, `§10 DOCK GEOMETRY`, etc.). This is the single place consumers override.
2. **Recipe consumption belongs in the feature's stylesheet** (`dock.css`, `cards.css`, the feature SFC's non-scoped `<style>` block for portal contracts, etc.). The recipe reads `var(--feature-token)` from the cascade; it never hardcodes the value.

**Worked example — timeline vs. dock drift.** Timeline is the model:

```
tokens.css     §16 TIMELINE      ← --timeline-dot-size, --timeline-scrubber-height, …
GlassTimeline.vue (scoped)       ← reads var(--timeline-dot-size) etc.; no literals
```

The pre-Q3 dock was the violation:

```
tokens.css     §10 DOCK GEOMETRY ← --dock-active-*, --dock-touch-target
dock.css       (density rungs)   ← --dock-padding-*, --dock-control-size, …
utilities.css  (density rungs)   ← --dock-tab-h-*, --dock-label-size  ← SPLIT-BRAIN
```

W3 Lane A consolidates the utilities.css density assignments into dock.css, making dock match the timeline shape.

**Forward reference — W4 token promotions.** The metric-stack value-clamp tokens (`--metric-stack-value-clamp-*`) and the timeline dot-fill tokens (`--timeline-dot-fill`, `--timeline-dot-stroke`) that land in W4 are required to follow this rule: they define in tokens.css under the relevant `§<feature>` block, and the feature stylesheet or SFC reads them. No new tokens may be assigned inside utilities.css or a secondary feature file.

---

## Duration

Eight timings form a rhythmic vocabulary:

| Token                | Value    | Typical use                                 |
|----------------------|----------|---------------------------------------------|
| `--duration-instant` | 0.1s     | Near-instant feedback (fade visibility)     |
| `--duration-fast`    | 0.2s     | Quick UI feedback (hover, small transforms) |
| `--duration-normal`  | 0.3s     | Standard transitions                        |
| `--duration-slow`    | 0.45s    | Deliberate reveal                           |
| `--duration-panel`   | 0.55s    | Slide/dock expand                           |
| `--duration-xl`      | 1.0s     | Long ambient animation                      |
| `--duration-xxl`     | 1.5s     | Page-level mood                             |
| `--duration-linger`  | 2.5s     | Background atmosphere, shimmer              |

Shimmer-specific durations: `--duration-shimmer-fast` 3s · `--duration-shimmer` 5s · `--duration-shimmer-slow` 8s.

Dock internals: `--duration-popup-swap` 180ms.

---

## Easing

### Spring curves (`linear()`—modern CSS)

Generated from damped spring physics. Use `easing-function: var(--spring-*)` or Tailwind `ease-spring-*`.

- **`--spring-smooth`** (ζ=1.0, critically damped, zero overshoot):
  ```
  linear(0, 0.0974, 0.2816, 0.4656, 0.6189, 0.7361, 0.821, 0.8806, 0.9213,
         0.9487, 0.9668, 0.9787, 0.9864, 0.9914, 0.9945, 0.9966, 0.9978,
         0.9987, 0.9992, 0.9995, 0.9997, 0.9998, 0.9999, 0.9999, 1)
  ```

- **`--spring-snappy`** (ζ=0.65, ~7% overshoot, quick settle):
  ```
  linear(0, 0.0727, 0.2386, 0.4363, 0.6262, 0.7861, 0.9075, 0.9902, 1.0395,
         1.0628, 1.068, 1.0619, 1.0501, 1.0366, 1.0239, 1.0133, 1.0054,
         1.0001, 0.997, 0.9956, 0.9954, 0.9959, 0.9967, 0.9976, 0.9985,
         0.9992, 0.9997, 1, 1.0002, 1.0003, 1.0003)
  ```

- **`--spring-bouncy`** (ζ=0.45, ~20% overshoot, elastic settle):
  ```
  linear(0, 0.0492, 0.1748, 0.3455, 0.5335, 0.7169, 0.8796, 1.0117, 1.1087,
         1.1706, 1.2005, 1.2039, 1.1874, 1.1575, 1.1206, 1.0818, 1.0454,
         1.0141, 0.9895, 0.9723, 0.962, 0.958, 0.959, 0.9635, 0.9703,
         0.9781, 0.986, 0.9931, 0.9991, 1.0036, 1.0066, 1.0082, 1.0087,
         1.0082, 1.007, 1.0055, 1.0039, 1.0023, 1.0009)
  ```

- **`--spring-gentle`** (ζ=0.85, barely perceptible overshoot, slow ease):
  ```
  linear(0, 0.1018, 0.3031, 0.5094, 0.6812, 0.8083, 0.8945, 0.9486, 0.98,
         0.9964, 1.0038, 1.0061, 1.006, 1.0049, 1.0036, 1.0024, 1.0015,
         1.0008, 1.0004, 1.0002, 1.0001, 1, 1, 1, 1)
  ```

### Cartoon punch (`linear()`—shaped keyframe, NOT a spring)

The Cartoon register's motion half (§L2, §Shadows). A shaped `linear()` with an explicit negative anticipation leg: it dips below origin (anticipation — a thing no damped spring can express), crosses 1.0, peaks ~1.22 (the punch overshoot, deliberately past the spring ≤10% fence — which is why it is a *register*, not a spring), then settles. Compositor-safe (drives `transform` only). Opt-in, loud by design. PRM → `--ease-standard`. Not a `SPRING_PRESETS` row and not a typed `MOTION_CURVES` entry — a raw CSS easing token.

- **`--ease-cartoon-punch`**:
  ```
  linear(0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%, 1.18,
         1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1)
  ```

### Cubic-bezier (fallback, exits, non-spring)

- `--ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)`—decelerate
- `--ease-out`: `cubic-bezier(0, 0, 0.2, 1)`
- `--ease-in`: `cubic-bezier(0.4, 0, 1, 1)`
- `--ease-out-expo`: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## Z-Index Stack

Twelve-tier stacking, plus two out-of-band tiers:

| Token             | Value | Surfaces                             |
|-------------------|-------|--------------------------------------|
| `--z-background`  | 0     | Aurora, decorative layers            |
| `--z-content`     | 10    | Main content                         |
| `--z-controls`    | 20    | Inline controls                      |
| `--z-bar`         | 30    | Status bars                          |
| `--z-header`      | 35    | Headers                              |
| `--z-dock`        | 40    | Docks                                |
| `--z-panel`       | 45    | Floating editor panels               |
| `--z-overlay`     | 50    | Full-screen overlays                 |
| `--z-hovercard`   | 60    | Hover cards                          |
| `--z-tooltip`     | 60    | Tooltips (coequal with hover cards)  |
| `--z-popover`     | 70    | Popovers, dropdowns                  |
| `--z-modal`       | 80    | Dialogs, sheets                      |
| `--z-fullscreen`  | 90    | Fullscreen takeovers                 |
| `--z-toast`       | 100   | Toast notifications                  |
| `--z-max`         | 9999  | Emergency escape hatch               |
| `--z-debug`       | 99999 | Debug overlays                       |

---

## Border Radius

| Token            | Value              | Pixel (at 16 px base) | Use                        |
|------------------|--------------------|-----------------------|----------------------------|
| `--radius`       | 0.5rem             | 8 px                  | Default                    |
| `--radius-sm`    | 4px                | 4 px                  | Tight corners (kbd, badge) |
| `--radius-md`    | 6px                | 6 px                  | Medium                     |
| `--radius-lg`    | var(--radius)      | 8 px                  | Interactive                |
| `--radius-xl`    | 12px               | 12 px                 | Panels                     |
| `--radius-2xl`   | 1rem               | 16 px                 | Large cards, dialogs       |
| `--radius-pill`  | 9999px             | 9999 px               | Pills                      |
| `--radius-card`  | var(--radius-2xl)  | 16 px                 | Card surfaces              |
| `--radius-panel` | var(--radius-xl)   | 12 px                 | Panels                     |
| `--radius-dialog`| var(--radius-2xl)  | 16 px                 | Modal dialogs              |
| `--radius-input` | var(--radius)      | 8 px                  | Inputs                     |
| `--radius-button`| var(--radius)      | 8 px                  | Buttons                    |
| `--radius-badge` | var(--radius-pill) | 9999 px               | Badges                     |
| `--radius-dock`  | var(--radius-pill) | 9999 px               | Dock container             |

**φ-derivation + the concentric rule (§L6).** The ladder is the √φ family, not arbitrary px: read `sm` (4px) as the base, `md` ≈ base·√φ, `--radius`/`lg` ≈ base·φ (the live 8px default), `xl` ≈ base·φ·√φ (12px), `2xl` ≈ base·φ² (16px) — the live values already sit on the ladder, so this is a derivation re-statement, not a visual break. **Nested surfaces are concentric**: an inner radius is `calc(var(--radius-outer) − var(--gap))` so the corners of a chip inside a card stay parallel to the card's (the iOS concentric-radius law; `BD.W-CONCENTRIC-RADIUS`). A new free radius earns a √φ-indexed rung, never a magic number.

---

## Shadows

### Elevation scale

```
--shadow-xs:   0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
--shadow-sm:   0 2px 8px rgba(0,0,0,0.06);
--shadow-md:   0 4px 16px rgba(0,0,0,0.08);
--shadow-lg:   0 4px 20px rgba(0,0,0,0.12);
--shadow-xl:   0 8px 24px rgba(0,0,0,0.14);
--shadow-2xl:  0 25px 50px -12px rgba(0,0,0,0.25);
```

### Uniform-cast shadow (offset 0)

```
--shadow-uniform: 0 0 12px color-mix(in srgb, var(--shadow-color) 8%, transparent);
```

Offset-0 elevation token, no directional Y bias. Use case: dock-hosted icons (rightmost child of a horizontal dock pill, where the dock's `--shadow-dock` `0 4px 20px` downward cast reads as a per-icon right-edge halo). Consumers compose via `--shadow-dock-override: var(--shadow-uniform)` per-instance, or attach to per-icon-button shadow stacks where directional cast is wrong-shape. Same color-mix recipe family as the sized rungs above; reads as a peer elevation. Added Z.W2.T3a per A2 §B7.

### Cartoon shadows (offset, layered) — the Cartoon register

The cartoon shadow is not just an elevation token — it is the **visual half of the Cartoon register** (its motion half is `--ease-cartoon-punch`, §L2). The 1940s-technicolor reading: a surface pops off the page in bold, layered offset planes that **punch** when it moves. The live token source (`src/styles/tokens/shadow.css`) is the `color-mix` form below — **never raw `rgba(0,0,0,…)`** (the prior doc showed stale hardcoded black). The cast rides `--shadow-color` (which resolves to `var(--foreground)`), so it re-tints by construction across light/dark — a near-black ink stamp in light, near-white in dark:

```
--shadow-cartoon-sm: -3px 2px 1px color-mix(in srgb, var(--shadow-color) 10%, transparent),
                      0   3px 1px color-mix(in srgb, var(--shadow-color) 10%, transparent),
                     -3px 3px 1px color-mix(in srgb, var(--shadow-color)  6%, transparent);
--shadow-cartoon-md: -4px 3px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                      0   4px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                     -4px 4px 2px color-mix(in srgb, var(--shadow-color)  8%, transparent);
--shadow-cartoon-lg: -6px 4px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                      0   6px 1px color-mix(in srgb, var(--shadow-color) 12%, transparent),
                     -6px 6px 2px color-mix(in srgb, var(--shadow-color)  8%, transparent);
```

> A *warm-tinted* (technicolor-color) cartoon cast — re-pointing the cartoon family off the neutral `--shadow-color`/`--foreground` toward a warm or chromatic ink — is a deliberate token decision deferred to the `cartoon-shadow` greenfield (`docs/tranches/BD/greenfield/cartoon-shadow/`), not asserted here.

**The cast is a MOVING cast.** Under the register, the offset travels with the gesture: as a surface translates or presses, the cartoon-shadow offset slides *opposite* the motion (the cel's light source stays fixed while the object moves), scaled by `--motion-weight`. The travel is a `transform` on a `::after` shadow-caster layer — **never an animated `box-shadow`** (box-shadow is paint-bound, not compositor-cheap; §L7). The cast deepens on press (the object lifts off its shadow) and snaps back on release. A surface enters the register by composing a cartoon-shadow rung (the `.shadow-cartoon-{sm,md,lg}` utilities, or `<Card surface="cartoon">` / the `.cartoon-surface` utility, which read `--shadow-cartoon` directly) **with** `--ease-cartoon-punch` on its interactive transitions + the exaggerated `--scale-press` snap-and-settle. The register is opt-in (loud by design) — the default glass surface stays the calm six-layer composite. PRM → static cast, no travel, no punch. `prefers-contrast: more` → the cast opacity floors UP (the inked edge is a legibility asset); `prefers-reduced-transparency` does NOT touch it (opaque ink, not a transmissive layer — it survives as a bonus legibility anchor).

### Card flat-offset shadows

```
--shadow-card:       4px 4px 0px 0px rgba(0,0,0,0.50);
--shadow-card-hover: 5px 5px 0px 0px rgba(0,0,0,0.60);
```

### Dock shadows

```
--shadow-dock:           0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.15);
--shadow-dock-collapsed: 0 2px 12px rgba(0,0,0,0.20), 0 0 0 1px rgba(0,0,0,0.15);
```

### Glass-tier shadows

```
--glass-shadow-subtle:   var(--shadow-sm), var(--glass-highlight);
--glass-shadow-default:  var(--shadow-md), var(--glass-highlight);
--glass-shadow-medium:   var(--shadow-lg), var(--glass-highlight);
--glass-shadow-elevated: var(--shadow-xl), 0 0 0 0.5px color-mix(in srgb, var(--shadow-color) 5%, transparent), var(--glass-highlight);
```

---

## Glass Surfaces

Five tiers compose background opacity, backdrop-blur, border, shadow, grain. Dark mode boosts opacity and shifts grain blend (`overlay` → `soft-light`) for legibility. v0.8.0 renamed and extended the ladder: the prior four-rung ladder (subtle / default / medium / elevated) becomes a five-rung ladder (wash / quiet / resting / floating / overlay)—`quiet` is a new mid-low rung, `overlay` is a new modal-over-modal rung, and the others are renamed for tier semantics rather than utility-class register.

| Tier      | Class               | Light opacity | Dark opacity | Blur                          | Border               | Shadow                     | Use                                 |
|-----------|---------------------|---------------|--------------|-------------------------------|----------------------|----------------------------|-------------------------------------|
| Wash      | `.glass-wash`       | 30%           | 38%          | `blur(1px) saturate(1.05)`    | 8% foreground        | `--glass-shadow-wash`      | Dock bg, input bg, hover overlays   |
| Quiet     | `.glass-quiet`      | 50%           | 58%          | `blur(3px)`                   | 10% foreground       | `--glass-shadow-quiet`     | Inline workspace chrome             |
| Resting   | `.glass-resting`    | 65%           | 72%          | `blur(12px) saturate(1.05)`   | 12% foreground       | `--glass-shadow-resting`   | Cards, the canonical plate; **`<GlassPanel>` default** (canonical translucent + frosted)          |
| Floating  | `.glass-floating`   | 80%           | 88%          | `blur(16px) saturate(1.4)`    | 15% foreground       | `--glass-shadow-floating`  | Popovers, tooltips, dropdowns       |
| Overlay   | `.glass-overlay`    | 95%           | 96%          | `blur(24px) saturate(1.5)`    | 18% foreground       | `--glass-shadow-overlay`   | Dialogs, command palette, modals    |

### Tokens per tier

For each tier, `--glass-bg-{tier}` (rgba), `--glass-blur-{tier}` (full filter string), `--glass-border-{tier}` (color-mix result), `--glass-shadow-{tier}` (box-shadow), `--glass-blur-{tier}-radius` (raw blur radius). Grain overlay:

- Light mode: 3.5% opacity, blend `overlay`
- Dark mode: 6% opacity, blend `soft-light`

**Dock-specific blur**—`--glass-blur-dock` is its own token so floating and rail docks read as feather-light overlays rather than heavy blurred slabs. As of J.W3.C the radius is `0px` (compositor floor) + the `saturate()` channel is omitted; the dock's translucent register is carried by `--glass-bg-dock` (32 % card opacity) bleeding the backdrop through. `GlassDock` references `var(--glass-blur-dock, var(--glass-blur-wash))`; consumers can override the dock token at `:root` without touching the five tier blurs.

### N7 dock-blur perceptual audit (N.W2 Lane B—NO-OP)

User feedback at N open suggested "top dock blur is a bit much, and generally our dock blurs need to be resolved to be more subtle." Source-of-truth audit at HEAD:

| Surface | `backdrop-filter` value | Blur radius |
|---|---|---|
| `.glass-dock` (any dock; horizontal or vertical) | `blur(var(--glass-blur-dock-radius))` | **`0px`** |
| `.glass-wash`, `.glass-quiet`, ..., `.glass-overlay` | `blur(<tier-radius>) saturate(<tier-factor>)` | `1` / `3` / `12` / `16` / `24` px |

The dock filter contributes ZERO blur—the compositor still emits a backdrop-filter pass (the property is set + composes the `saturate(1.05)` from `--glass-blur-wash` if the dock token is missing, but with the dock token present the `saturate` channel is also omitted), but the radius is at the floor. Any perceived dock blur visible at the page level is contributed by the **backdrop** the dock sits over (e.g., the `<Aurora>` ambient layer); the dock is purely a translucent plate of `--glass-bg-dock` (32 % opacity) admitting backdrop pixels through.

Per N invariant 22 (audit-verdict spot-verification gate): the user's perception was real, but the source is the page-composition stacking, not the dock substrate. The right adjustment lives at the consumer site (reduce backdrop blur per-page; or lower aurora opacity; or use `<Aurora>`'s tone controls), not at the library token. The library token already holds the floor.

NO-OP for N.W2 Lane B. No token change; no cascade adjustment. The audit lands here for posterity.

### Canonical translucent + frosted (N.W1 Lane A—`<GlassPanel>` default)

`<GlassPanel>` (`src/components/custom/glass-panel/GlassPanel.vue`) defaults
to `variant="resting"`, which composes the `.glass-resting` recipe above:
**65% background opacity + 12 px backdrop-blur + 1.05 saturation + 12%
foreground border + grain overlay**. This is the canonical
"translucent + frosted" surface; consumers asking for "the translucent
frosted panel" should reach for `<GlassPanel>` (or `<Card>` for the
cartoon-shadowed sibling) without a tier override. No additional tier
ships at v1.1.1—per the N KISS posture (V2 + V4 + wire-before-retire),
the existing resting rung already satisfies the brief; we verify the
rendering rather than invent.

Per N invariant 22 (audit-verdict spot-verification gate), this lane
verified at HEAD: `GlassPanel.vue`'s `VARIANT_CLASS.resting`
binding (line ~19) → `.glass-resting` utility → token recipe in
`src/styles/glass.css`. The grain overlay `::after` rule renders via
`paper-grain-overlay` composition. Visual inspection at consumer
build-time is the canonical verification path; library-side rendering
verification is asynchronous (Playwright-MCP or equivalent).

### Convenience shorthands

- `.glass-card`—**static surface utility**: `.glass-resting` + `border-radius: var(--radius-card)` + offset card shadow. No hover lift; interactive cards live in `<Card>` (which composes its own hover via the `surface` ladder — `surface="cartoon"` → `.cartoon-surface`, or a hover tier) or in components that explicitly opt into a hover variant.
- `.glass-pill`—`.glass-resting` + pill radius + press feedback (scale 0.97 on active)
- `.cartoon-surface`—**the cartoon decoration utility** (`cards.css`), composed by `<Card surface="cartoon">`: a 2px inked bezel + the layered-offset cel-shadow stamp (`--shadow-cartoon-md` → `-lg` on hover), and (the Cartoon register, §Shadows) the moving caster that punches on interaction. It composes ON TOP of the host's resolved glass tier — it is NOT itself a tier. (The former `.glass-cartoon` recipe + the `<CartoonCard>` sibling primitive are retired; this is the live carrier.)

### Accessibility fallbacks

- `@media (prefers-reduced-transparency)` → opacity 1, blur none, grain 0
- `@media (prefers-contrast: more)` → opacity 88%–100% per tier
- `@supports not (backdrop-filter)` → solid color fallback at boosted opacity

---

## Interactive States

Every interactive element implements the four-state contract plus focus and toggle.

| State                     | Behavior                         | Token                                                            |
|---------------------------|----------------------------------|------------------------------------------------------------------|
| Rest                      | Default appearance               |—                                                               |
| Hover                     | Scale up, or bg tint             | `--scale-hover` (1.08) · `--scale-hover-dock` (1.1)              |
| Active / pressed          | Scale down                       | `--scale-press` (0.96, the canonical iOS rung — see §L3) · `--scale-press-btn` (0.97; aliases `--scale-press-sm`) · `--scale-press-dock` (0.92) |
| Disabled                  | Reduced opacity, no pointer events | `--opacity-disabled` (0.50)                                    |
| Focus-visible             | Ring + glow                      | `--focus-ring-shadow`: 0 0 0 2px rgba(ring, 0.30), 0 0 8px rgba(ring, 0.15) |
| `aria-pressed` / `.is-active` | Tinted bg, full-opacity text | Component-scoped                                                 |

### Composable base classes

- `.btn-interactive`—scale-based four-state + focus ring
- `.interactive-item`—bg-tint four-state (50% accent) + focus ring
- `.active-scale`—atomic `:active { transform: scale(0.97) }`
- `.disabled-base`—atomic `:disabled { opacity + pointer-events }`
- `.focus-ring`—atomic `:focus-visible { box-shadow: var(--focus-ring-shadow) }`

### Press-scale tokens

Three press amplitudes ship — one canonical and two outliers. I name
the canon at §L3 (the iOS `.regular` control rung); the table below
records the substrate values the canon resolves to.

- **`--scale-press` (0.96)** — **canonical Liquid Glass press.** The
  single rung every primitive should reach for unless it has a
  documented reason. This is the iOS `.regular` control rung; §L3
  ratifies it as the universal tap-squish target and routes the
  `.tap-squish` utility through this token. Buttons, sliders, cards,
  chips, list rows — anything that wants press feedback consumes
  `var(--scale-press)`.
- **`--scale-press-sm` (0.97; aliased as `--scale-press-btn`)** —
  sub-canonical, slightly softer. The legacy button + slider recipes
  consume the `-btn` alias; this exists for surfaces where the full
  0.96 squish reads as too dramatic (small inline controls, dense
  toolbar rungs). New surfaces should NOT reach for `-sm` without
  cause — default to `--scale-press` per §L3.
- **`--scale-press-dock` (0.92)** — deeper press for the dock-control
  register; compensates for the smaller hit target so the squish reads
  at the same perceptual weight as the canonical 0.96 rung on a larger
  surface.

The P.W4 4-rung `--scale-press-{xs,sm,md,lg}` ladder was retired at
Q.W4 Lane D: the `xs`/`md`/`lg` rungs were minted as preemptive
consumer-facing substrate for a words/frontend `active:scale-[X.XX]`
absorption that never landed — a fleet-wide grep found zero
`var(--scale-press-{xs,md,lg})` consumers. Substrate-without-consumer
is binary (N invariant 23); the unused rungs are gone.

The AL-W10 SLIM reconciliation (audit G-W1-2 / G-W1-4 F-2) lifted
`--scale-press` from 0.95 → 0.96 so the token value matches the §L3
canonical rung; the older "generic pressed scale" framing here is
retired in favour of the explicit canon-vs-outlier distinction above.

---

## Typography

Scale: golden-ratio (√φ ≈ 1.272), base 1rem (16 px).

### Self-host font policy

Glass-ui self-hosts its font subsystem under `src/fonts/`. Faces must ship under an OFL-1.1-compatible (or equivalent) license that permits redistribution + subsetting + bundling. The library exposes a `--font-brand-{sans,serif,mono}` cascade so consumers wire their preset typography (the brand display sans, the canonical mono) without re-introducing third-party CDN dependencies on the LCP-critical path.

#### Canonical face families (v1.5.0)

The library ships two OFL face families as bundled woff2 assets. Both pair their primary face with a paired calibrated `... Fallback` face that wraps the platform's system stack via `local()` + Capsize-derived `size-adjust` / `ascent-override` / `descent-override` overrides; the swap from fallback to primary is geometry-neutral, zero CLS contribution.

| Family                  | Role                  | License | Subsets         | `font-display` | Path                                                 |
|-------------------------|-----------------------|---------|-----------------|----------------|------------------------------------------------------|
| **Plus Jakarta Sans**   | Brand display sans    | OFL 1.1 | latin, latin-ext| `optional`     | `src/fonts/plus-jakarta-sans/*.woff2`                |
| **Fira Code**           | Canonical mono        | OFL 1.1 | latin, latin-ext| `swap`         | `src/fonts/fira-code/*.woff2`                        |

Both are variable fonts—a single woff2 per subset covers the full wght axis (Plus Jakarta Sans: 200..800; Fira Code: 300..700). The `font-display` policy differs by register: `optional` for the LCP-critical display sans (paint never blocks on font); `swap` for the post-LCP mono (FOUT acceptable; geometry stays no-shift via the fallback face).

The OFL license file ships next to the binaries (`OFL.txt` per family) and the canonical attribution lives in `CHANGELOG.md` v1.5.0.

#### Path D candidate matrix—Plus Jakarta Sans selection rationale

The brand display sans family was selected by speedtest's AC.W6b 5-way visual-fidelity test against the pre-substitution General Sans baseline (Fontshare ITF-FFL) at 1200×766 hero size + 96 px body sample. Five OFL-1.1 candidates were evaluated:

| # | Candidate            | Source                          | Notes                                                                |
|---|----------------------|---------------------------------|----------------------------------------------------------------------|
| 1 | **Plus Jakarta Sans**| Tokotype / Gumpita Rahayu       | **Selected.** Geometric humanist; closest character match to General Sans; well-tested at hero sizes; variable wght 200..800. |
| 2 | Onest                | IndianTypeFoundry               | Geometric humanist; mild width contrast; reads slightly wider.       |
| 3 | Manrope              | Mikhail Sharanda                | More geometric; tighter letter-spacing; diverges from General Sans's humanist warmth. |
| 4 | Inter                | RSMS                            | Modern grotesque; very neutral; loses brand audacity.                |
| 5 | Geist                | Vercel                          | Modern grotesque; very crisp; too geometric for the brand.           |

Plus Jakarta Sans matched General Sans's "4" open-top + "9" hook-tail + "2" rounded-curl + "8" balanced-lobe gestures at hero size; the "Mbps" lowercase register tracked near-identically. Receipts at `speedtest/docs/tranches/AC/artefacts/W6b/visual-fidelity/`.

#### Capsize metric calibration

For each primary face, the paired `... Fallback` face's metric overrides are derived programmatically via `@capsizecss/core`'s `createFontStack` against the bundled latin woff2 + the appropriate system fallback chain. The methodology is:

1. Read the primary face's `unitsPerEm` + `ascent` + `descent` + `xWidthAvg` from the bundled woff2 (`@capsizecss/unpack`).
2. Compare against the system fallback's metrics (from `@capsizecss/metrics/{appleSystem,segoeUI,roboto,arial,robotoMono}`).
3. Emit `size-adjust` (scales the fallback's x-width to the primary's), `ascent-override` (sets the fallback's ascent to the primary's normalized ratio), `descent-override` (same for descent).

The four sans fallbacks (per platform) + the unified mono fallback are listed in `CHANGELOG.md` v1.5.0 with their derived values. All values sit within the W6b Triumvirate gate `0.95 ≤ size-adjust ≤ 1.13`; the `-apple-system` rung is the upper edge because Plus Jakarta Sans runs slightly wider than San Francisco at the same px (112.36%—within tolerance, well below the 1.20 threshold that signals a face mismatch).

#### Consumer activation

Consumers default to the library's pre-existing `--font-stack-sans` ("Helvetica Neue" → Arial Nova → Arial → system-ui → sans-serif). To engage the bundled Plus Jakarta Sans face, override `--font-brand-sans` at the consumer's `:root`:

```css
:root {
    --font-brand-sans: "Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif;
    --font-display: var(--font-brand-sans);
    --font-serif:   var(--font-brand-sans);
}
```

Combined with `[data-typography-preset="brand-uniform-sans"]` on `<html>` (or the equivalent direct token override at `:root`), the display + serif voices collapse to Plus Jakarta Sans across the consumer's surface.

The canonical mono (`--font-mono` / `--font-stack-mono`) ships with `"Fira Code"` first by default—every glass-ui consumer gets the self-hosted mono without any wiring beyond importing `@mkbabb/glass-ui/styles`.

#### Forward-compatibility

Future tranches should not re-introduce non-OFL display sans-serif at glass-ui. The OFL gate is the canonical contract—adding a face means picking an OFL family + running the visual-fidelity test against the existing brand display + landing the Capsize calibration. Non-OFL licenses (Fontshare ITF-FFL, Adobe Type EULA, Monotype commercial) are out per the project's "no third-party CDN dependency on the LCP-critical path" + "no transport-restricted distribution" precepts.

### Size tokens

| Token               | Value                                     | Px (at 16)  | Tailwind  | Use                          |
|---------------------|-------------------------------------------|-------------|-----------|------------------------------|
| `--type-micro`      | 0.6875rem                                 | 11          | `text-2xs`| Badges, fine print           |
| `--type-caption`    | 0.75rem                                   | 12          | `text-xs` | Labels, timestamps           |
| `--type-small`      | 0.875rem                                  | 14          | `text-sm` | Secondary body               |
| `--type-body`       | 1rem                                      | 16          | `text-base` | Default body copy          |
| `--type-prose`      | 1.125rem                                  | 18          | `text-lg` | Long-form reading            |
| `--type-subheading` | 1.272rem                                  | 20.4        | `text-xl` | Card titles, labels          |
| `--type-heading`    | 1.618rem                                  | 25.9        | `text-2xl`| Subsection heads             |
| `--type-title`      | 2.058rem                                  | 32.9        | `text-3xl`| Page heads                   |
| `--type-display-1`  | clamp(1.618rem, 1.2rem + 1.6vw, 2.618rem) | 25.9–41.9   | `text-4xl`| Display                      |
| `--type-display-2`  | clamp(2.058rem, 1.5rem + 2.2vw, 3.33rem)  | 32.9–53.3   | `text-5xl`| Large display                |
| `--type-display-3`  | clamp(2.618rem, 2rem + 3vw, 4.236rem)     | 41.9–67.8   | `text-6xl`| Extra-large display          |
| `--type-display-4`  | clamp(3.33rem, 2.5rem + 4vw, 5.382rem)    | 53.3–86.1   |—        | Splash (custom)              |
| `--type-display-5`  | clamp(4.236rem, 3.5rem + 6vw, 6.854rem)   | 67.8–109.7  |—        | Mega hero (custom)           |
| `--type-display-mega`      | clamp(5.382rem, 4rem + 9vw, 11.089rem)   | 86.1–177.4  |—        | Poster: section / pane title (v1.0.3) |
| `--type-display-hero`      | clamp(6.854rem, 4.5rem + 12vw, 17.942rem) | 109.7–287.1 |—       | Poster: page hero / metric value (v1.0.3) |
| `--type-display-audacious` | clamp(8.728rem, 5rem + 16vw, 22rem)      | 139.6–352   |—        | Fast.com-scale single number (v1.0.3) |

Consumers extending beyond display-audacious add tokens in their preset—the library exposes the mechanism, not every conceivable step.

### Audacious display tier (`--type-display-mega` / `-hero` / `-audacious`)

Added in **v1.0.3** (AA.W3.5). Three rungs above `display-5` for
poster-type consumers—the speedtest hero number, dashboard pane
titles where the consumer wants the number/title to win the visual
hierarchy, marketing-surface headlines. Same vw-axis as
`display-1..5`, so the size is consumer-agnostic; a consumer that
needs container-query precision (e.g. speedtest's `.metric-col`
container) wraps its own clamp with these tokens as the ceiling:

```css
/* speedtest SpeedtestResults.vue:763—cqi axis with audacious ceiling */
font-size: clamp(6rem, calc(38cqi * 3 / max(3, var(--digit-count))), var(--type-display-audacious));
```

The φ-ladder progression (`√φ ≈ 1.272` between steps) continues
unbroken—every rung is one consistent step up the scale. Peak
sizes (at viewport ≥ 1440):

- `display-mega` → 177.4 px (φ^9/2—pane titles, section heads)
- `display-hero` → 287.1 px (φ^5—hero numbers, metric values)
- `display-audacious` → 352 px (φ^11/2—fast.com peg for a single hero number)

The matching `.text-display-mega`, `.text-display-hero`,
`.text-display-audacious` utilities mirror the `.text-display-5`
shape—Fraunces with `WONK=1 / SOFT=0` and `var(--font-display-weight)`
by default; the `data-typography-preset="brand-uniform-sans"`
:root override still maps `--font-display` → `var(--font-brand-sans)`
so consumers in the brand-uniform-sans register get their stack at
the audacious size without any extra wiring.

Opt-out: consumers that want their own ceiling can ignore the tokens
entirely (and the existing `display-1..5` rungs remain)—the
audacious tier is additive, not a default. Consumers that consume
the tokens but want a smaller ceiling can reset them locally:
`:root { --type-display-audacious: 12rem; }`.

### Line height

| Token                | Value  | Use                                    |
|----------------------|--------|----------------------------------------|
| `--leading-micro`    | 1.2    | Very tight (micro text)                |
| `--leading-caption`  | 1.3    | Captions                               |
| `--leading-small`    | 1.4    | Small body copy                        |
| `--leading-body`     | 1.5    | Default body text                      |
| `--leading-prose`    | 1.618  | Long-form reading (golden)             |
| `--leading-heading`  | 1.2    | Headlines                              |
| `--leading-display`  | 1.1    | Display / hero text (tight)            |

### Letter spacing

| Token                 | Value       | At body (px) | Use                  |
|-----------------------|-------------|--------------|----------------------|
| `--tracking-tight`    | −0.025em    | −0.4         | Headers, display     |
| `--tracking-normal`   | 0           | 0            | Default body         |
| `--tracking-wide`     | 0.025em     | 0.4          | Captions, labels     |
| `--tracking-wider`    | 0.05em      | 0.8          | Uppercase mono       |
| `--tracking-caps`     | 0.1em       | 1.6          | Section labels (caps)|

### Typography Tokens

| Token            | Value                                                       | Semantic Use                                          |
|------------------|-------------------------------------------------------------|-------------------------------------------------------|
| `--font-display` | Fraunces (variable; `opsz`/`wght`/`SOFT`/`WONK`)            | Ornamental display voice; headings with personality   |
| `--font-serif`   | Computer Modern Serif → Georgia fallback                    | Body, prose, headings, math                           |
| `--font-brand-sans` | Helvetica Neue → Arial → system-ui                       | Brand/system sans stack used by presets and overrides |
| `--font-sans`    | `var(--font-brand-sans)`                                    | System sans fallback (rarely direct)                  |
| `--font-mono`    | Fira Code → Fira Mono → monospace                           | Code, monospace, admin labels                         |
| `--font-display-variation-settings` | `"WONK" 1, "SOFT" 0`                    | Display font axis defaults                            |
| `--font-display-weight` | 400                                                 | Display utility weight default                        |

```css
--font-display: "Fraunces", Georgia, serif;                                         /* display voice */
--font-serif:   "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif; /* body serif */
--font-brand-sans: "Helvetica Neue", "Arial Nova", Arial, system-ui, sans-serif;    /* independent brand/system sans */
--font-sans:    var(--font-brand-sans);                                             /* system sans */
--font-mono:    "Fira Code", "Fira Mono", monospace;
--font-display-variation-settings: "WONK" 1, "SOFT" 0;
--font-display-weight: 400;
```

Consumers override these tokens at `:root` (not just `@theme` at-rules
— `@theme` may not propagate into already-emitted `@utility` rules at
evaluation time, so consumer-side cascade leaks are real). Consumers
that need a uniform sans voice set `--font-brand-sans` and apply the
root preset:

```html
<html data-typography-preset="brand-uniform-sans">
```

The preset maps `--font-serif` and `--font-display` to
`--font-brand-sans`, normalizes display font variation settings, and
sets `--font-display-weight` for a non-Fraunces display stack.

`--font-sans` was previously aliased to `--font-serif`, which collapsed the
two semantic identities and confused consumers that overrode `--font-serif`
for branding. It now resolves to its own system stack; consumers override
per-app for brand sans without touching the serif voice.

`.dock-label` is pinned to `var(--font-display)` so dock typography stays
consistent regardless of consumer body cascade tweaks.

Fraunces axes available: `wght` (300–700), `opsz`, `WONK` (0–1), `SOFT` (0–100).

### Semantic typography classes

| Class                  | Font         | Size                 | Weight | Line    | Tracking  | Axes                        |
|------------------------|--------------|----------------------|--------|---------|-----------|-----------------------------|
| `.text-display-audacious` | display   | `--type-display-audacious` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0     |
| `.text-display-hero`   | display      | `--type-display-hero` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0          |
| `.text-display-mega`   | display      | `--type-display-mega` | display-weight | 1.1 | tight | `WONK` 1, `SOFT` 0          |
| `.text-display-5`      | display      | `--type-display-5`   | 300    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-4`      | display      | `--type-display-4`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-3`      | display      | `--type-display-3`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display-2`      | display      | `--type-display-2`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-display`        | display      | `--type-display-1`   | 350    | 1.1     | tight     | `WONK` 1, `SOFT` 0          |
| `.text-title`          | display      | `--type-title`       | 400    | 1.2     | tight     |—                          |
| `.text-heading`        | display      | `--type-heading`     | 500    | 1.2     | normal    |—                          |
| `.text-subheading`     | serif        | `--type-subheading`  | 600    | 1.5     | normal    |—                          |
| `.text-prose`          | serif        | `--type-prose`       | 400    | 1.618   | normal    |—                          |
| `.text-body`           | serif        | `--type-body`        | 400    | 1.5     | normal    |—                          |
| `.text-small`          | serif        | `--type-small`       | 400    | 1.4     | normal    |—                          |
| `.text-caption`        | serif        | `--type-caption`     | 400    | 1.3     | wide      |—                          |
| `.text-micro`          | serif        | `--type-micro`       | 500    | 1.2     | wide      |—                          |
| `.text-mono-caption`   | mono         | `--type-caption`     |—     | 1.3     | wider     | `text-transform: uppercase` |
| `.text-mono-small`     | mono         | `--type-small`       |—     | 1.4     | normal    |—                          |
| `.section-label`       | mono         | `--type-caption`     |—     |—      | caps      | `text-transform: uppercase`, muted-foreground color |

### Kinetic typography utilities

- **`.text-breathe`**—`animation: weight-breathe 4s ease-in-out infinite` (wght 300 → 500 → 300)
- **`.text-wonk-hover`**—rest `font-variation-settings: "WONK" 0, "SOFT" 100`; hover toggles to `"WONK" 1, "SOFT" 0`; transition 450 ms `--spring-smooth`
- **`.scroll-weight-reveal`**—`animation: weight-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 30%` (wght 100 → 400 + opacity 0.3 → 1)
- **`.char-stagger > .char`**—per-char `fade-in` 300 ms `--spring-smooth backwards`; `animation-delay: calc(var(--char-index, 0) * 30ms)`
- **`.text-glass-legible`**—halo text-shadow `0 0 12px color-mix(in srgb, var(--background) 50%, transparent), 0 0 4px color-mix(in srgb, var(--background) 30%, transparent)`

All kinetic utilities respect `prefers-reduced-motion`: transforms eliminated, opacity fades preserved at `--duration-instant`.

---

## Buttons

### `Button` CVA component (primary API)

Base class `.btn-pill`:
- border-radius pill
- padding `0.5rem 1rem`
- font-size 1rem
- gap `0.375rem` (6 px)
- transition `all 200ms var(--ease-standard)`
- `:focus-visible` → `outline: none; box-shadow: var(--focus-ring-shadow)`
- `:disabled` → `opacity: 0.50; pointer-events: none`
- `[aria-pressed="true"]` → 15% primary bg, 30% primary border

### Variants

| Variant              | Rest                                                                                            | Hover                                                       |
|----------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| `default`            | Primary bg, primary-foreground text                                                             | `bg-primary/90`                                             |
| `primary-audacious`  | Primary bg + `@utility btn-audacious` recipe (disco-grain + sparkle-sweep + specular-highlight) | `scale-[var(--scale-hover)]` + recipe-internal hue lift     |
| `destructive`        | Destructive bg, destructive-foreground text                                                     | `bg-destructive/90`                                         |
| `outline`            | Border 70%, bg 60%, foreground text                                                             | 60% accent bg, 90% border                                   |
| `secondary`          | Secondary bg                                                                                    | `bg-secondary/80`                                           |
| `accent`             | `.btn-pill-accent` (opaque theme accent)                                                        | 90% opacity                                                 |
| `ghost`              | Transparent, 85% foreground                                                                     | 12% foreground bg                                           |
| `glass`              | `.glass-wash` + default border                                                                  | `--glass-shadow-resting`                                    |
| `glass-wash`         | `.glass-wash`                                                                                   | 60% border                                                  |
| `ai`                 | amber-500/15 bg, amber-700 text                                                                 | amber-500/25                                                |
| `link`               | Text-only, underline on hover                                                                   | underline                                                   |

`destructive` is the canonical "danger" variant (clears WCAG AA).

#### `primary-audacious`—K W6 architectural transposition (K HEADLINE)

K W6 lifted the disco-grain + sparkle-sweep + specular-highlight composite from `dock.css` (where it had lived under `.dock-tab-button[data-tier="primary"]`) into a canonical `@utility btn-audacious` in `src/styles/utilities.css`. The composite reads:

- **Disco-grain texture**—radial gradient noise band over the primary fill, anchored to `--primary` so the recipe inherits theme hue automatically.
- **Sparkle-sweep glyph**—`@keyframes sparkle-sweep` (already in `animations.css:151`) drives a diagonal specular streak across the button face on a long cadence, PRM-gated via `prefers-reduced-motion: no-preference` (matches the `.gold-shimmer` precedent).
- **Specular-highlight backplate**—soft white-stop highlight at upper-left composing against the disco-grain layer for the "polished plastic" reading.

Existing tokens consumed: `--primary`, `--shadow-cartoon`, `--surface-tint-*`, `--scale-press-btn`, `--scale-hover`, `--duration-sparkle`, `--ease-apple-spring`. No new keyframes were introduced.

**Phase-color decoupling—Option B (per K W6 decision per Rε E3 recommendation)**: the canonical `@utility btn-audacious` recipe binds the radial to `--primary`, NOT to `--phase-color`. The recipe is reusable from any audacious primary-CTA context without inheriting an instrument-chassis phase cascade. The dock primary tier composes the canonical recipe via class-list inclusion (`btn-audacious` on `.dock-tab-button[data-tier="primary"]`) AND retains a dock-local extension that overrides the radial with `--phase-color` when a dock descendant of `<InstrumentChassis>` sets the phase variable. This keeps the canonical recipe axis-agnostic (≥ 2 consumer bar met: `<Button variant="primary-audacious">` + dock primary tier) while preserving the chassis-aware phase-tint flourish where it earns its keep.

All variants scale `var(--scale-press-btn)` on `:active`.

### Sizes

| Size      | Class          | Height        | Padding                |
|-----------|----------------|---------------|------------------------|
| `default` | `h-10`         | 40 px         | `px-4 py-2`            |
| `xs`      | `h-7`          | 28 px         | `px-2`                 |
| `sm`      | `h-9`          | 36 px         | `px-3`                 |
| `lg`      | `h-11`         | 44 px         | `px-8`                 |
| `icon`    | `h-10 w-10`    | 40 × 40 px    | 0                      |

### `.glass-btn` (CSS class)

Standalone circular icon button for non-Vue contexts.
- Size `--size-icon-btn` = 2.5rem (40 px)
- Border-radius pill
- Border 1.5px `--glass-border-subtle`
- Background `--glass-bg-subtle`
- Backdrop-filter `--glass-blur-subtle`

---

## Badges

### `Badge` CVA component

Pill primitive for inline metadata, status chips, and count indicators. CVA root composes `focus-ring inline-flex items-center rounded-full border font-semibold transition-colors`; the `variant` axis paints fill+border and the `size` axis governs typography + padding.

### Variants

| Variant       | Rest                                                  |
|---------------|-------------------------------------------------------|
| `default`     | Primary bg, primary-foreground text, transparent border |
| `secondary`   | Secondary bg, secondary-foreground text                |
| `destructive` | Destructive bg, destructive-foreground text            |
| `outline`     | Foreground text on transparent fill, border-from-context |

### Sizes (J.W6 size axis)

| Size  | Typography           | Padding         | Use                                                        |
|-------|----------------------|-----------------|------------------------------------------------------------|
| `sm`  | `text-xs leading-4`  | `px-2 py-0.5`   | Sits inside `text-xs` rows or compact inline metadata      |
| `md`  | `text-sm leading-5`  | `px-2.5 py-1`   | **Default.** Aligns baseline-to-baseline with `text-sm` row text—canonical for table status cells |
| `lg`  | `text-base leading-6`| `px-3 py-1.5`   | Standalone callouts inside `text-base` body copy           |

The `md` default matches the baseline of the most common surrounding context (table rows + card body—both `text-sm`). Consumers nesting a Badge inside an explicitly compact context (`text-xs` mono cells, dense filter rows) opt down to `size="sm"`.

### Section-tone recipe (table status cells)

Tables and tag-input chips frequently need a per-section tinted chip whose hue tracks `--section-color-N`. The canonical recipe—composed by demo consumers (`stories/data/table.vue`, `stories/data/tags-input.vue`)—is the triplet:

```
bg-section-N/15 text-section-N border-section-N/30
```

paired with `<Badge variant="outline" size="md">`. The `outline` variant supplies the focus-ring/border substrate and yields foreground text; the section triplet then overrides fill, foreground, and border with the section-tinted hue. The recipe is intentionally **not** lifted into a `tone` axis on `badgeVariants`—the section-N family is a 13-rung tinted ladder, not a 4-state semantic tone (`success/warning/destructive/info`), and a CVA-side enumeration would be overfit to the current demo consumers (1 src consumer count). When a second consumer surfaces with semantic tone needs (success/warning/destructive/info), introduce a `tone` axis at that point.
- Color `var(--muted-foreground)`
- Hover: 85% bg lighten, 20% foreground border, 15% foreground color, `transform: scale(1.08)`
- Active: `transform: scale(0.95)`
- Focus-visible: `box-shadow: var(--focus-ring-shadow)`
- Disabled: 50% opacity, `cursor: not-allowed`
- `.is-active` / `[aria-pressed="true"]`: 10% foreground bg, 25% foreground border

---

## Dock

The dock is a first-class composable system. Three principles: a dock is a positioned container; buttons inside a dock are dock-specific components; layered content is orchestrated by `DockLayer` / `DockLayerGroup`.

### Dock subsystem—typed-context DI shape (O.W2; invariant 25)

`<GlassDock>` surfaces its state to descendants through one typed
provide: `DOCK_CONTEXT_KEY: InjectionKey<DockContext>`. The 6 prior
string-keyed provides (`glassDockContext`, `glassDockId`,
`dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`) collapse
into this single context. `dockExpanded` is permanently retired
(no downstream consumers).

```ts
interface DockContext {
    id: string;
    orientation: ComputedRef<"horizontal" | "vertical">;
    keepOpen: () => void;
    release: () => void;
    held: ComputedRef<boolean>;
}
```

Two paired helpers expose the context:

- `useDockContext()`—strict. Throws when called outside a
  `<GlassDock>`. Use for primitives that MUST live inside a dock
  (e.g., a custom dock-internal control).
- `useOptionalDockContext()`—befitting silent default. Returns
  `DockContext | null`. Use for primitives that MAY render outside
  a dock (Slider, HoverPopover, PopoverContent, SelectContent,
  DropdownMenuContent—every one of them composes the optional
  helper because each can render standalone).

This shape is the canonical reference for invariant 25
(typed-key + helper-pair DI). The same pattern lives at
`src/components/custom/dock/composables/dockLayerContext.ts`
(DockLayer ↔ DockLayerGroup) and
`src/components/ui/toggle-group/toggleGroupContext.ts`
(ToggleGroup ↔ ToggleGroupItem).

### Components

| Component              | Shape                                             | Hover                                                  | Use                                             |
|------------------------|---------------------------------------------------|--------------------------------------------------------|-------------------------------------------------|
| `GlassDock`            | Pill container, height ≈ 55 px                    |—                                                     | Outer dock surface                              |
| `DockIconButton`       | Fixed square `--size-icon-btn` (40 × 40 px); `compact` prop auto-sizes to content | Bg darken + `--scale-hover-dock` (1.1)       | Icon-only buttons inside a dock                 |
| `DockSelectTrigger`    | Variable width, text + chevron                    | Bg darken only (no scale—anchors popover)            | `<Select>` triggers inside a dock               |
| `DockDropdownTrigger`  | Variable width, text + icon + chevron             | Bg darken + scale (1.1)                                | `<DropdownMenu>` triggers inside a dock         |
| `DockLayer`            | Grid cell, fades in/out by slot key               |—                                                     | Layer-active switching                          |
| `DockLayerGroup`       | Grid wrapper, animates width across layers        |—                                                     | Multi-layer dock (expanded / collapsed / compact) |

### Geometry

```css
--size-icon-btn:         2.5rem;   /* 40 px */
--dock-h:                calc(var(--size-icon-btn) + 0.75rem + 3px);  /* ≈ 55 px */
--dock-margin:           0.5rem;
--dock-menubar-reserve:  4rem;
```

### Position prop

- `fixed`—viewport-anchored (`fixed bottom-[--dock-pos] left-1/2 -translate-x-1/2`)
- `inline`—flow-anchored (`margin: 0 auto`)
- `sticky`—scroll-container anchored (`position: sticky; top: 0`)

### Other props

- `always-expanded`—disable idle-collapse
- `collapse-delay`—auto-collapse timer (default 2000 ms)
- `start-collapsed`—initial state
- `fit-content`—adapt width to content vs stretch
- `wrap`—multi-line responsive dock (mobile rounded-rect, desktop pill)
- `orientation`—`horizontal` (default) or `vertical`
- `density`—`compact | comfortable | spacious`; controls padding, gaps, layer height, and inherited dock control sizing through root-overridable CSS variables
- `<template #collapsed>`—summary content shown when compacted

### Density variables

`comfortable` is the default and keeps the historical dimensions. The
`compact` and `spacious` classes set these variables, each with a
consumer-overridable density token fallback:

```css
--dock-padding-block
--dock-padding-inline
--dock-control-size
--dock-layer-height
--dock-layer-gap
--dock-trigger-padding-block
--dock-trigger-padding-inline
--dock-tab-padding-block
--dock-tab-padding-inline
```

Density overrides are named by tier, for example
`--dock-density-compact-control-size`,
`--dock-density-compact-padding-block`,
`--dock-density-spacious-layer-height`, and
`--dock-density-spacious-gap`.

### Utilities

- `.dock-separator`—1 px vertical divider, 50% dock-h tall, 15% foreground
- `.dock-spacer`—`flex: 1` for pushing items apart
- `.dock-label` (typography.css `@utility`—AB.W1.T5)—canonical register
  for text labels INSIDE `.dock-tab-button` (Start, Next, Submit, Done, New
  Test, survey labels). `font-family: var(--font-serif)` picks up the
  consumer's brand-uniform-sans preset; `font-size: var(--dock-label-size,
  var(--type-subheading))` composes the audacious-dock label-size knob
  (14–15px at narrow viewports, falls back to `--type-subheading` at
  desktop); `font-weight: 500` (medium rung—present but NOT bold). Use
  this instead of `.text-heading` for dock control labels; `.text-heading`
  is the heading register and reads as literal bold inside a dock pill.
- `DarkModeToggle size="control"` follows `--control-size` and `--control-icon-padding`.
- `DarkModeToggle size="dock"` follows `--dock-control-size` and `--dock-icon-padding`; a toggle placed inside `.glass-dock` defaults to dock sizing unless an explicit `sm`, `lg`, or `control` size is supplied.

### Layer transitions

- `DockLayerGroup` owns the stacked layer grid with scoped `.dock-layer-stack` sizing.
- `DockLayer` owns active/leaving panes through `.dock-layer-item-host`.
- `useLayerTransition` performs the FLIP size animation for layer swaps.

### Orientation

`GlassDock` accepts `orientation?: "horizontal" | "vertical"` (default `"horizontal"`). Horizontal docks animate `width` on expand/collapse and lay children out in a row; vertical docks animate `height` and stack children in a column. The prop is threaded through `useDockTransition` as its `axis` ref—both `useDockTransition` and `useLayerTransition` are axis-aware, keying their FLIP logic off a computed `dim` (`"width" | "height"`) rather than a hardcoded dimension. Vertical consumers just set the prop; no other consumer changes are required.

### Multi-layer composition

Beyond the built-in two-layer grid (the default slot + the `collapsed` slot), richer docks compose `DockLayerGroup` with one or more `DockLayer` children. Each `DockLayer` registers itself with its parent via `provide`/`inject`; the group renders an optional Figma-style switcher rail from the registered descriptors (`showRail` + `railPosition`) and drives crossfade + size FLIP transitions between layers. Only the active layer is interactive—inactive layers receive `inert` and `pointer-events: none`.

```vue
<GlassDock orientation="vertical">
    <DockLayerGroup v-model:active="tab" orientation="vertical">
        <DockLayer id="assets" label="Assets" :icon="Package">…</DockLayer>
        <DockLayer id="layers" label="Layers" :icon="Layers">…</DockLayer>
        <DockLayer id="libs" label="Libraries" :icon="Library">…</DockLayer>
    </DockLayerGroup>
</GlassDock>
```

---

## Variant Taxonomy

Three orthogonal vocabularies. Never mix.

### Surface tier (glass)

Applied to floating surfaces. v0.8.0 retired the four-rung `variant="subtle | default | medium | elevated"` enum on `Card` in favour of a `tier` prop naming a single class on the five-rung canon `wash | quiet | resting | floating | overlay`. Adjacent surface-bearing primitives (`PopoverContent`, `DropdownMenuContent`, `HoverCardContent`, `DialogContent`, `SheetContent`, `TooltipContent`, `.floating-panel`) hard-code `glass-floating` directly because the popover family always wants the elevated rung; they don't need a `tier` prop.

```vue
<Card>...</Card>                              <!-- default tier="resting" -->
<Card tier="floating">...</Card>              <!-- explicit elevated rung -->
<Card tier="resting" as="section">...</Card>  <!-- polymorphic root via reka-ui Primitive -->
<Card :shadow="false">...</Card>              <!-- nested: drop the surface shadow -->
<Card :grain="false">...</Card>               <!-- drop the ::after grain overlay -->
```

`<ScrollPane>` and `<CartoonCard>` are sibling primitives lifted from the retired `variant="pane"` and `variant="cartoon"` rungs. `<ScrollPane>` is `glass-wash` + `overflow:auto` + `scrollbar-hidden` + grain disabled (the grain overlay conflicts with overflow:auto repaint). `<CartoonCard>` resolves through `.glass-cartoon`.

### Semantic variant (intent)

Used on `Button`: `default | primary-audacious | secondary | ghost | outline | destructive | accent | link | ai | glass | glass-wash`. Scoped to intent, independent of elevation. A ghost button sits flat on any tier. `primary-audacious` (K W6) composes the canonical `@utility btn-audacious` recipe over the primary intent—see `## Buttons → primary-audacious` for the disco-grain + sparkle-sweep + specular-highlight composite and the phase-color decoupling decision (Option B). `destructive` is the canonical danger variant.

### Structural variant (geometry)

`Card` no longer carries a structural `variant` enum (v0.8.0). Cards distinguish their structural register via the new `tier` prop (the surface ladder) plus the `<ScrollPane>` and `<CartoonCard>` sibling primitives (the structural lifts).

### `<CardHeader shrink>` — scroll-driven 3-lane choreography (AI.W1-α)

`<CardHeader>` carries an additive `shrink?: boolean` modifier. When `shrink` is true, the header binds to the `--card-scroll` named scroll-timeline and runs a 3-lane choreography as the host scrolls:

1. **Header padding shrink** (0..120px scroll range) — top/bottom padding collapses from `1rem`/`0.5rem` to `0.5rem`/`0.25rem`.
2. **Title font-size shrink** (0..120px) — `[data-slot="card-title"]` glyph scales from `var(--type-heading)` down to `var(--type-prose)`.
3. **Description grid-row collapse** (0..80px — the faster fade) — `[data-slot="card-description"]` collapses its `1fr` → `0fr` grid row while fading opacity → 0; the slot retires entirely past the 80px boundary.

The selectors hook on `[data-slot="card-title"]` + `[data-slot="card-description"]` so consumer `class=` overrides cannot suppress the choreography. The default `shrink=false` path is byte-identical to the pre-W1 thin static wrapper — the existing 5+ consumers see no change.

**Required ancestor**: the choreography reads the `--card-scroll` named timeline, which is emitted by the canonical `.card-scroll-host` utility. Apply `.card-scroll-host` to the scroll-overflow ancestor (typically the `<Card>` host's scroll wrapper). Without that ancestor the named timeline never emits and the choreography sits idle — silent no-op, no crash.

```vue
<Card tier="wash" :shadow="false" :grain="false" class="card-scroll-host overflow-y-auto">
  <CardHeader shrink class="sticky top-0 z-1 backdrop-blur-md">
    <CardTitle>Account</CardTitle>
    <CardDescription>Billing summary</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>
```

The sticky-position + backdrop-blur classes (and the `--card-header-bg` tint token) stay consumer-side — the SFC composes the choreography; the host card composes the surface.

**Named timeline + tokens**

| Symbol | Type | Default | Use |
|---|---|---|---|
| `--card-scroll` | named scroll-timeline | (emitted by `.card-scroll-host`) | The timeline `<CardHeader shrink>` binds to. `block` axis. |
| `--card-header-bg` | color | `color-mix(in srgb, var(--card) 60%, transparent)` | Canonical sticky-header backdrop tint. Auto-dark via `--card`. |
| `.card-scroll-host` | `@utility` | (in `utilities.css`) | The scroll-overflow host that emits `--card-scroll` + isolates it via `contain: layout style paint`. |

**PRM contract**: the scoped CSS forces `animation-duration: 0.01ms` on all three lanes under `@media (prefers-reduced-motion: reduce)`. Reduced-motion users see the rest-state (full padding, full title size, full description visibility); the scroll-timeline degrades gracefully when the user has no scrolled offset — the explicit PRM bracket belt-and-braces the contract.

**Slider variants**: shipped via `sliderVariants` CVA (J.W5.A) with both a `variant` axis and a `size` axis. All share tokens `--slider-track-bg`, `--slider-track-height`, `--slider-thumb-bg`, `--slider-thumb-size`, `--slider-thumb-border-color`, `--slider-range-bg`, `--slider-thumb-shadow`. Restyle on a wrapper, never via `:deep()`.

| Variant         | Track                       | Thumb                                | Use                              |
|-----------------|-----------------------------|--------------------------------------|----------------------------------|
| `standard`      | 6 px muted/50               | 14 px circle                         | Default                          |
| `spectrum`      | 24 px secondary             | thin bar                             | Range selection                  |
| `timeline`      | 24 px glass-blurred         | 24 px disc                           | Video/timeline scrubbing (slider variant—see also the standalone `<GlassTimeline>` primitive below) |
| `glass-pill`    | pill substrate w/ gradient  | halo on hover (`--surface-tint-12`)  | Audacious primary control        |
| `glass-cartoon` | cartoon-surface track       | cartoon-shadow disc                  | Editorial / paper-design context |

| Size  | Track height | Thumb size | Use                   |
|-------|--------------|------------|-----------------------|
| `sm`  | 4 px         | 12 px      | Density-tight UIs     |
| `md`  | 6 px         | 16 px      | Default               |
| `lg`  | 12 px        | 24 px      | Hero / featured       |

### Slider keep-dock-open contract

`<Slider>` exposes `keepDockOpen?: boolean` (default `true`). When a Slider is a descendant of a `<GlassDock>`, the contract is bidirectional and pointer-anchored:

1. **Acquire**—`pointerdown` on the slider thumb injects a `dockKeepOpen` token via the dock's `useDockState` provide tree. While the token is held, the dock's idle-collapse timer is suspended.
2. **Release**—`pointerup` / `pointercancel` (attached at window scope so the gesture survives the cursor leaving the dock) drops the token.
3. **Visual binding**—the Slider subscribes to the dock's reactive `dockHeld` flag (the OR-reduction of all currently-held tokens) and reflects it via `data-held` on its root, intensifying the thumb-halo via a denser `--surface-tint` rung in scoped CSS.
4. **Substrate response**—`.glass-dock[data-held]` in `src/styles/dock.css` tier-shades the dock background up while any descendant holds a token.

The cross-substrate proof story lives at `demo/stories/compositions/dock-with-slider.vue` (K W7)—three cells exercising the contract: standard slider (Volume), `glass-pill` variant (Brightness), and a multi-slider mixer demonstrating multi-token reference-counting.

**Slider-only contract—Option B per K W7 decision**: `<NumberField>` is NOT a consumer of `keepDockOpen`. NumberField interactions are keyboard- and discrete-button (chevron tap)—they have no continuous-interaction window for which keep-open matters. The K plan originally floated an Option A where NumberField also acquired the token; W7 picked Option B (Slider-only) on the rationale that the contract's load-bearing semantics are pointer-drag + thumb-halo intensification—neither of which applies to NumberField. The contract is documented as Slider-only; future consumers must demonstrate a pointer-anchored continuous-interaction model before joining.

### Theming discipline

When a consumer needs to override component internals, the first resort is a documented CSS custom property. `:deep()` is a last resort—it indicates a missing token or slot-class prop.

Slot-class props (e.g., `ScrollPaneHeader` → `title-class`, `description-class`) expose internal elements for controlled styling.

### Custom-property cascade pattern (AC.W6d)

The canonical mechanism for letting a consumer retint or reshape a primitive's internals without `:deep()` is a **declarative custom-property cascade**: the primitive declares a token at the surface it owns (with a default value), and the consumer overrides that token at any ancestor in the cascade. Vue's scoped-CSS isolation is irrelevant to custom properties—they walk the DOM tree freely.

**Three-rung anatomy:**

1. **Primitive owns the consumption point**: the primitive's internal CSS reads `var(--token-name, <default>)`. The default keeps the primitive useful out of the box.
2. **Primitive surfaces the token in DESIGN.md**: a token row in the component's section, with the property name, accepted value type, and default. This is the contract.
3. **Consumer overrides via inline style OR a wrapper class**: `<Primitive :style="{ '--token-name': '...' }">` or `.consumer-wrap { --token-name: ...; }`. Either form reaches every descendant via the cascade.

**Worked example—MetricRow per-row phase tint.** The primitive's value cell consumes `var(--phase-color)`; the consumer sets `--phase-color: <hex>` on each row via the `phaseColor` prop (which serializes to the inline style). No `:deep` reach, no slot-class plumb—the cascade alone carries the override.

**Worked example—Timeline continuous-fill opacity.** `<ContinuousTimeline>` reads `var(--timeline-continuous-fill-opacity, 1)` on its internal `.continuous-region-fill` selector. The consumer sets the variable on the wrapping context (`.timeline-wrap { --timeline-continuous-fill-opacity: 0.74; }`) and the cascade flows into the primitive's internal selectors. Replaces the prior `:deep(.continuous-region-fill) { opacity: ... }` workaround.

**When the cascade pattern fails (and `:deep` is genuinely warranted):**

- The primitive doesn't yet declare the cascading token. **Fix the primitive**—add the token + DESIGN.md row + a CHANGELOG entry; the consumer's `:deep` is a symptom, not a solution.
- The property must address a structural slot (e.g., a specific child's `grid-template-rows`). **Add a slot-class prop** (per the `ScrollPaneHeader` precedent)—that's the cascade analogue for class-based overrides.
- The override needs to traverse a portal boundary (e.g., reka-ui's `HoverCardPortal`). **Use a non-scoped `<style>` block** in the primitive's SFC that targets the portaled class (the `.timeline-popover` precedent in `ContinuousTimeline.vue`).

The acceptance bar for adding a new custom-property cascade is two-fold: (a) the override is single-property (a token, not a structural rewrite), and (b) the primitive has at least one consumer demonstrating the override path. The cohort shipped at v1.6.0—`--phase-color` on `MetricRow`, `--digit-count` on `AnimatedDigit`/`MetricRow`, `--timeline-dot-size-touch` on the timeline dots—each cleared both bars.

---

## Timeline Primitive

`<GlassTimeline>` is the canonical primitive for time-axis displays: scrubbing, multi-phase progress, and per-section status indication. Three variants form an orthogonal taxonomy. **Note**: the `timeline` slider variant in the table above is a *separate* primitive (a `<Slider>` with the timeline visual treatment for video-style scrubbing); `<GlassTimeline>` is a standalone Vue component with its own variant enum.

### `variant="scrubber"` (default; pre-Z baseline)

Single-track normalized 0..1 scrubber with full keyboard a11y: `role="slider"` + arrow-key step (0.01) + shift-arrow step (0.1). Optional tooltip caret via `:label` prop. Pointer + keyboard models converge on the same `update:modelValue` event surface.

```vue
<GlassTimeline v-model="position" label="0:23 / 4:12" />
```

### `variant="segmented"` (Z.W2.T1)

Adjacent gradient bands—N rectangles in a row, one per phase, with boundary dots emitting `hover` + `click` events. Per-segment gradient (either `{from, to}` pair or raw CSS gradient string), lifecycle state (`pending | active | completed`), and optional payload surface via the events. Used by multi-phase progress UIs where each phase is conceptually independent.

```vue
<GlassTimeline
  variant="segmented"
  :segments="phases"
  @hover="onPhaseHover"
  @click="onPhaseClick"
/>
```

### `variant="continuous"` (AA.W1.T1)

ONE rounded-pill rail substrate with N absolute-positioned region children spanning prev-boundary → current-boundary. Same `TimelineSegment[]` data shape as `segmented`—only the rendering geometry differs. Visual: 1 pill with N internal gradient regions + optional seam dividers at boundaries + boundary dots overlaid at each region's right edge. Used by multi-phase progress UIs where the phases are conceptually one progression bar (the speedtest ping → download → upload pipeline is the canonical consumer).

```vue
<GlassTimeline
  variant="continuous"
  :segments="phases"
  @hover="onPhaseHover"
  @click="onPhaseClick"
/>
```

### `TimelineSegment` data shape

```ts
interface TimelineSegment {
    key: string;                                          // stable id; emitted on hover/click
    label: string;                                        // display name; surfaces in dot aria-label
    state: "pending" | "active" | "completed";            // lifecycle—drives fill + dot affordance
    progress?: number;                                    // 0..1, overrides state-default fill
    gradient?: { from: string; to: string } | string;    // `{from,to}` pair or raw CSS gradient
    value?: unknown;                                      // hover/click event payload
    weight?: number;                                      // continuous-variant width share (default 1)
}
```

`weight` is only honoured by the `continuous` variant (region widths are computed as `weight / sum(weights)`); the `segmented` variant distributes via CSS flex (`--timeline-segment-flex`).

### `#detail` slot — continuous variant only (AI.W1-δ)

The `continuous` variant emits an optional `#detail` scoped slot rendered as a sibling of the rail wrap. The primitive owns the effective-segment resolution (`hovered ?? current` — hover trumps current; the current-phase reading restores on hover-leave) so consumers do not re-derive the binding per render. Slot payload:

```ts
{
  segment:    TimelineSegment | null;      // the effective segment (hovered ?? current; null when idle)
  source:     "hovered" | "current" | "idle";
  currentKey: string | null;               // the original currentSegmentKey prop (null when unset)
  hoveredKey: string | null;               // the transient hovered marker key (null when no hover)
}
```

Consumers own the choreography. The canonical shape is a Vue `<Transition mode="out-in">` keyed on the segment's stable `key`, swapping the active-segment body with an idle placeholder:

```vue
<GlassTimeline variant="continuous" :segments="phases" :current-segment-key="active.key" ...>
  <template #detail="{ segment, source }">
    <Transition name="phase-detail" mode="out-in">
      <div v-if="segment" :key="`detail-${segment.key}`" :data-source="source">
        <span class="phase-detail-label">{{ segment.label }}</span>
        <span class="phase-detail-value">{{ segment.value }}</span>
        <span class="phase-detail-state">{{ segment.state }}</span>
      </div>
      <div v-else key="detail-idle" class="phase-detail-idle">
        Waiting…
      </div>
    </Transition>
  </template>
</GlassTimeline>
```

**Two-keyed-children shape (load-bearing)**: Vue's `<Transition mode="out-in">` requires the two branches to be siblings of the `<Transition>` element, not a single `v-if` block. A naive refactor to one `v-if` inside the Transition silently breaks the fade-swap on segment-key change. The two-branch shape (`v-if="segment"` + `v-else` idle) is the canonical recipe — replicate it verbatim.

**Variant scope**: continuous-only per option γ (post-RD-3 §3). The scrubber + segmented variants do not carry the `#detail` slot. Consumers needing a similar surface on those variants must compose their own panel; the slot's payload shape (`{ segment, source, currentKey, hoveredKey }`) is the recommended pattern to copy.

**Height reservation**: the mount carries `min-height: var(--timeline-detail-min-height, 1.25rem)` so idle ↔ active transitions do not reflow the surrounding layout. Consumers override via the cascade (`.timeline-wrap { --timeline-detail-min-height: 4rem; }`).

### Tokens (`§16 TIMELINE`)

| Token | Default | Use |
|---|---|---|
| `--timeline-scrubber-height`            | `0.5rem`           | Scrubber-variant rail height |
| `--timeline-segmented-height`           | `0.625rem`         | Segmented-variant rail height |
| `--timeline-continuous-height`          | `0.75rem`          | Continuous-variant rail height |
| `--timeline-dot-size`                   | `0.875rem`         | Boundary dot diameter (segmented + continuous; pointer: fine) |
| `--timeline-dot-size-touch`             | `1.25rem`          | Boundary dot diameter under `@media (pointer: coarse)` |
| `--timeline-touch-target`               | `44px`             | WCAG 2.5.5 target-size floor for the dot `::before` hit-area (AC.W6d F2.I-04) |
| `--timeline-segment-flex`               | `1 1 0`            | Per-cell flex distribution (segmented) |
| `--timeline-continuous-seam-opacity`    | `0.25`             | Continuous inter-region 1px divider opacity (`0` to suppress) |
| `--timeline-continuous-seam-color`      | `color-mix(...)`   | Seam tint (composes from opacity by default) |
| `--timeline-segment-default-gradient`   | wash → mid wash    | Fallback gradient when `segment.gradient` is omitted |
| `--timeline-segment-gradient-ping`      | (chart-ping)       | Per-phase canonical default—`ping` |
| `--timeline-segment-gradient-download`  | (chart-download)   | Per-phase canonical default—`download` |
| `--timeline-segment-gradient-upload`    | (chart-upload)     | Per-phase canonical default—`upload` |
| `--timeline-segment-gradient-jitter`    | (chart-jitter)     | Per-phase canonical default—`jitter` |
| `--timeline-detail-min-height`          | `1.25rem`          | Continuous `#detail` slot mount min-height (idle ↔ active transition reflow guard; AI.W1-δ) |

### A11y contract

- **Scrubber**: `role="slider"` + `aria-valuemin/max/now` + keyboard arrow-key step. `aria-valuenow` is always rendered as a numeric attribute (the binding coerces via `Number(modelValue ?? 0)`; AA.W1.T2 / A4 §S-16 fix). Defaults to `0` when `modelValue` is `undefined` or `null`.
- **Segmented**: `role="group"` on the wrapper, per-dot `<button>` with composed `aria-label` (`"{label}: {state}"`). Per-segment payload surfaces via the `hover` + `click` events.
- **Continuous**: `role="group"` on the wrapper, plus an **Option C structural split** (AB.W2.T4 / A4 §nested-interactive) under the wrapper:
  - `.continuous-track[role="progressbar"]` with `aria-valuemin="0"`, `aria-valuemax=N`, `aria-valuenow` derived from completed-segment-count + fractional active progress (rounded to 2 decimals). The rail is **non-interactive**—it carries no focusable descendants, satisfying axe `nested-interactive` (serious; WCAG 2.0 A—4.1.2). Each region renders a `.continuous-region-fill` child that paints the per-phase gradient up to the inline `--continuous-fill-width` (load-bearing: the var actually paints, it is not merely computed; W3 will lean on this substrate for the phase-bus echo).
  - `.continuous-markers[role="list"]` carries the interactive `<button class="continuous-dot">` markers as `<li role="listitem">` siblings. Each button has composed `aria-label` (`"{label}: {state}"`), per-segment data hooks (`data-state`, `data-current`, `data-completed`), and a `<HoverPopover>` wrap that surfaces `{ label, value, description, state }` on hover (color-coded via the segment's gradient endpoint).
  - The `currentSegmentKey?: string` prop stamps `data-current="true"` on the matching marker so consumers (panel rendering, W3 raised-rivet styling) can distinguish active phase from transient hovered phase without DOM surgery. Hover affects only the floating popover; the data-current marker survives hover-leave.

The continuous variant's event surface adds `hoverEnd` (mirror of `hover`) so consumers can blend hover-over-current in panels via `effective = hovered ?? current`. The events fire from the HoverPopover's debounced `update:open` cadence (inherits `hoverOpenDelay` + `closeDelay`), eliminating the pointer-skim flicker the raw `@mouseenter`/`@mouseleave` model produced when the popover content overlapped the trigger.

All variants respect `prefers-reduced-motion: reduce` by collapsing band / region / dot transitions to `0.01ms`.

**Target-size compliance (AC.W6d F2.I-04—WCAG 2.5.5 AAA)**: each interactive dot (segmented + continuous) paints at 14px visible diameter under `pointer: fine` but grows an invisible `::before` halo extending the pointer hit-area to 44 × 44 (`inset: -15px` against the 14px box: `14 + 15 + 15 = 44`). Under `@media (pointer: coarse)` the visible dot promotes to `--timeline-dot-size-touch` (default 20px) and the halo's inset recomputes via `calc((var(--timeline-touch-target) - var(--timeline-dot-size-touch)) / -2)` so the total hit-area stays at 44 × 44 across the lifted geometry. Consumers that override the touch token receive a halo that tracks the override automatically.

---

## Configurator

The configurator family is the canonical chrome for live token / preset editing in storybook + consumer admin surfaces. Four primitives compose:

- `<Configurator>`—outer shell (FAB + sheet + persistence).
- `<ConfiguratorLayer>`—labelled group of related rows (typography, glass tier, density, etc.).
- `<ConfiguratorRow>`—single labelled control (slider, select, color, switch).
- `useConfiguratorState`—reactive preset state (active key, draft buffer, commit / reset / cycle, persistence).

The family reaches the ≥ 2-consumer bar via:
1. `demo/stories/primitives/configurator.vue` (V-tranche fb38034—primitive-side story consuming `<ConfiguratorRow>` + `useConfiguratorState`).
2. `demo/stories/aurora.vue` (L.W7 Lane B—`cloneMode: "per-preset"` consumer; absorbed the retired `useAuroraStudio` parallel chrome).

(A third consumer, `demo/stories/motion/metaballs.vue`, retired at AL.W4 alongside the MetaballCanvas publisher per G-W3-3 §6.)

**Clone modes**. `useConfiguratorState<T>` ships two clone-mode strategies via the `cloneMode` option:

- `"commit-on-write"` (default)—single live `config` reactive object. `selectPreset(key)` overwrites `config` with that preset's baseline; edits do NOT persist across preset switches.
- `"per-preset"`—each preset slot holds an independent live clone. `selectPreset(key)` snapshots the current `config` into the outgoing slot, then loads the incoming slot's clone into `config`. Edits persist per slot across switches. Matches aurora's shape (slider edits survive a preset round-trip).

`defaultClone` calls `toRaw(value)` before `structuredClone` so Vue reactive proxies snapshot cleanly; JSON-clone is the fallback for shapes `structuredClone` rejects. Consumers can override via `options.clone`.

**Configurator P0 absorb (K W7)**: `useConfiguratorState.ts:85-87` previously declared `let activeKey: string | undefined`—non-reactive—so `studio.activePreset` returned a stale computed value and templates binding it never updated when `selectPreset` mutated the local. K W7 replaced the plain `let` with `const activeKey = ref<string | undefined>(...)`; `selectPreset` / `resetCurrent` / `cyclePreset` mutate `activeKey.value`. The "Maximum recursive updates exceeded" runtime error on `/motion/metaballs` (Lighthouse P0-1) is gone. A bidirectional `colorDraft ↔ cfg.colors` watch-write loop in `metaballs.vue` was eliminated by Strategy 1 (KISS—drop `colorDraft` entirely; iterate `cfg.colors` directly via `studio.config`).

**Aurora chrome Option-A unification (L W7 Lane B—Rε §A.8)**: the prior `useAuroraStudio` + per-preset clone map collapsed into a `cloneMode: "per-preset"` consumer of the canonical `useConfiguratorState<AuroraConfig>`. Closes K cross-tranche-debt item; retires the Option-B-with-rationale note. Aurora is now the second consumer of the canonical state primitive (third overall counting `primitives/configurator.vue`). F-ε-3 (`/motion/metaballs` recursion warning surfaced under L W6 Lighthouse) probed clean post-unification under the 2-preset-swap + 4-color-mutation reproduction pattern—see `docs/tranches/L/audit/W7-B-aurora-option-a-unification-proof.md`.

---

## Overlays

| Type             | Components                                  | Tier       | Transition                              | Z-index             |
|------------------|---------------------------------------------|------------|-----------------------------------------|---------------------|
| Dialog           | `Dialog`, `DialogContent`                   | elevated   | `dialog-scale`                          | `--z-modal` (80)    |
| Popover          | `Popover`, `PopoverContent`                 | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (70)  |
| Dropdown         | `DropdownMenu`, `DropdownMenuContent`       | elevated   | `.popover-animate .slide-in-from-side`  | `--z-popover` (70)  |
| Sheet            | `Sheet`, `SheetContent`                     |—         | slide from side                         | `--z-modal` (80)    |
| Hover card       | `HoverCard`, `HoverCardContent`             |—         | `fade-slide`                            | `--z-hovercard` (60)|
| Tooltip          | `Tooltip` + `TooltipProvider`               |—         | fade                                    | `--z-tooltip` (60)  |
| Floating panel   | `.floating-panel`                           | medium     | `floating-panel-in`                     | `--z-overlay` (50)  |

`--popover-offset` (6 px) governs anchor-to-content spacing. `--popover-viewport-pad` (8 px) keeps popovers from viewport edges.

---

## Motion

### Vue Transition classes

Reusable sets in `transitions.css`. Each defines enter/leave-active + enter-from/leave-to.

| Name              | Effect                                 | Enter                          | Leave                           | Use                            |
|-------------------|----------------------------------------|--------------------------------|---------------------------------|--------------------------------|
| `fade`            | Opacity                                | 200 ms `--ease-standard`       | 200 ms `--ease-standard`        | Simple show/hide               |
| `fade-slide`      | Opacity + translateY                   | 300 ms `--ease-out`            | 200 ms `--ease-in`              | Dropdown items, list entries   |
| `expand-fade`     | Opacity + max-height                   | 300 ms `--spring-smooth`       | 300 ms `--ease-in`              | Collapsible sections           |
| `dialog-scale`    | Opacity + scale + translateY           | 450 ms `--spring-bouncy`       | 300 ms `--ease-standard`        | Modal entrance                 |
| `pop`             | Scale + opacity                        | 200 ms `--spring-bouncy`       | 200 ms `--ease-out`             | Badge / toast entrance         |
| `dropdown`        | Opacity + translateY + scale           | 300 ms `--spring-snappy`       | 100 ms opacity-only             | Dropdown menus                 |
| `tab-fade`        | Opacity                                | 200 ms `--ease-standard`       | 200 ms `--ease-standard`        | Tab content swap               |
| `pane-swap`       | Opacity + translateX (mode="out-in")   | 300 ms `--spring-smooth`       | 300 ms `--ease-out`             | Pane content swap              |
| `metric-swap`     | Opacity + translateY + scale(0.95)     | 300 ms `--spring-smooth`       | 200 ms `--ease-standard`        | Metric value crossfade         |
| `pane-slide`      | Opacity + max-height                   | 550 ms `--spring-gentle`       | 550 ms `--ease-out`             | Collapsible panes              |
| `pane-left`       | translateX(−110%) + rotate(−2°)        | 450 ms `--spring-snappy`       | 300 ms `--ease-out`             | Left pane nav                  |
| `pane-right`      | translateX(110%) + rotate(2°)          | 450 ms `--spring-snappy`       | 300 ms `--ease-out`             | Right pane nav                 |

All transitions respect `prefers-reduced-motion`: fades preserved at 150 ms, transforms eliminated.

### Keyframe entrance animations

- `floating-panel-in`—opacity 0 → 1, blur 4px → 0, scale 0.96 → 1
- `dialog-in`—opacity + scale(0.95) + translateY(8 px)
- `scale-in`—opacity + scale(0.95)
- `fade-in`—opacity + translateY(6 px)
- `slide-up`—opacity + translateY(16 px)
- `dock-in`—opacity + translateY(14 px) + scale(0.96); opt-in via `.dock-in` utility on a dock wrapper (panel duration, `--spring-snappy`)

### Kinetic typography keyframes

- `weight-breathe`—font-variation-settings wght 300 → 500 → 300 over 4 s (ease-in-out)
- `weight-reveal`—wght 100 → 400, opacity 0.3 → 1 (scroll-timeline driven)
- `gold-shimmer-slide`—`background-position: 200% → -200%` over 6 s linear

`animations.css` owns shimmer keyframes only. Text shimmer utility
classes, including `.gold-shimmer`, live in `utilities.css`.

### Utility animations

- `rainbow-hue`—hue-rotate 0 → 360°
- `shimmer-sweep`—background-position sweep
- `shake`—translateX ±4 px over 0.5 s

---

## Composables

Library-tier composables decompose into three rough registers. The first register exposes platform primitives behind a Vue-shaped seam (timers, intersection, resize, dark mode). The second wraps `@mkbabb/keyframes.js` motion primitives so consumers don't reach into the engine directly. The third wraps cross-cutting orchestration patterns that consumers were rolling by hand.

| Composable | Register | Purpose |
|---|---|---|
| `useGlobalDark` | platform | Single shared dark-mode ref + toggle. |
| `useInterval` / `useTimer` | platform | Lifecycle-clean `setInterval` / `setTimeout` wrappers. |
| `useResizeObserver` | platform | ResizeObserver behind `onScopeDispose`. |
| `useTouchGate` | platform | Pointer-event coalescing for touch + mouse. |
| `useKeyboardShortcuts` | platform | Scoped keybinding registration. |
| `useTokenColor` | platform | Reactive read of a CSS custom property; re-resolves on dark-mode transitions. Replaces ad-hoc `getComputedStyle(html).getPropertyValue("--xxx")` reads in canvas + Aurora consumers. |
| `useStagger` | orchestration | Fixed-count timed reveal cascade—`revealed.value[i]` flips true at `initialDelayMs + i * delayMs`. Distinct from `useStaggerReveal`: that one gates on IntersectionObserver thresholds; this one fires on a pure timer. The two compose. |
| `useStaggerReveal` | orchestration | IntersectionObserver-gated entrance choreography for grids and lists. |
| `useAnimatedNumber` | motion (`/motion`) | Hysteresis-smoothed live numeric tracking via keyframes.js `SmoothProgress`. |
| `useAnimatedNumberMap` | motion (`/motion`) | N-up `useAnimatedNumber` fan-out behind a `Record<K, ComputedRef<number \| null>>`. Replaces hand-rolled per-key smoother arrays where consumers can't run the composable inside a `v-for`. |
| `useSpringOrchestrator` | motion (`/motion`) | Multi-spring snapshot engine for choreographed transitions. |
| `useRAFLoop` | motion (`/motion`) | rAF loop with start/stop/dispose + per-frame timing. |
| `useDarkModeSync` | motion (`/motion`) | Reactive bridge between `useGlobalDark` and animation engine state. |
| `useScrollProgress` | motion (`/motion`) | Scroll-position-driven progress ref. |
| `useIntersectionPause` | motion (`/motion`) | Pause/resume long-running animation when target is offscreen. |
| `useGlassRenderer` | glass | Glass-surface renderer wiring (filter, mask, backdrop). |
| `useSidebarFollow` / `useTreeIndex` / etc. | sidebar | Sidebar layout + active-section tracking. |
| `useInfiniteScroll` | data | Infinite scroll engine wired to a backing source. |
| `useSortable` | data | SortableJS wrapper preserving Vue reactivity. |

### When to add a new composable

Reach for a new composable when:
1. The pattern duplicates across two or more consumers (the "lifts on first duplication" rule).
2. The consumer wraps a library primitive in a hand-rolled scheduler / fan-out / lifecycle loop. That's a library gap; fix it upstream.
3. The platform API needs an `onScopeDispose` cleanup pair to be safe inside Vue components.

The composables registry is consumed via the root `@mkbabb/glass-ui` barrel for cross-domain primitives, or via path-specific entries (e.g. `@mkbabb/glass-ui/sidebar`) for domain-bounded composables.

**Heavy-peer-bearing subpaths (canon).** Three composable families are
carved off the root barrel into flat subpaths so consumers opt into the
heavy peers explicitly and bundlers shake them when unused:

| Subpath | Heavy peer | Symbols | Closure ref |
|---|---|---|---|
| `@mkbabb/glass-ui/forms` + `/dark` + `/keyboard` + `/carousel` | `@vueuse/core` | `Input`, `Textarea`, `Combobox*`, `useGlobalDark`, `useKeyboardShortcuts`, `registerShortcut`, `formatCombo`, `useCarousel`, `Carousel*` | L.W1 Lane C (vueuse SCC trap closure, v1.0) |
| `@mkbabb/glass-ui/motion` | `@mkbabb/keyframes.js` | `useSpringOrchestrator`, `useAnimatedNumber`, `useAnimatedNumberMap`, `useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`, `useIntersectionPause`, `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD` (+ types `RAFLoopTiming`, `PausableRuntime`, `AnimatedNumber`, `UseAnimatedNumberOptions`, `SpringSnapshot`) | AI.W3 R3 (keyframes static-reach closure, v2.0) |

Acceptance bar for adding a new heavy-peer subpath: (a) the peer's
transitive footprint is ≥ ~30 KB gz in the consumer's entry chunk, AND
(b) at least one cross-repo consumer reaches glass-ui without touching
the peer (so the carve genuinely shakes bytes off that consumer). The
canon is small on purpose — `forms`/`dark`/`keyboard`/`carousel`/`motion`
are the only carve-outs to date; every other public composable rides the
root barrel.

The motion subpath additionally rolls in keyframes-free composables
(`useStagger`, `useStaggerReveal`, `useScrollProgress`, `useRAFLoop`,
`useIntersectionPause`, `installDarkModeSync`) because the sub-tree's
`index.ts` walks every leaf with `export *` — Rollup treats the
sub-tree as one SCC, so the move is all-or-nothing. The motion subpath
is the canonical home for every kinetic composable; consumers reach
`/motion` for any kinetic primitive regardless of whether it currently
touches keyframes.js.

---

## Module-scope process-singleton registries (canonical pattern)

A small number of library-owned subsystems coordinate cross-instance
state through module-scope registries:

- `gateRegistry` (touch-gate)
- `instances` (sortable lists)
- `activeTimers` (typewriter ambient animations)
- `toasts` (useToast queue + `toastTimeouts` Map)
- `generatedRowIds` (DataTable; `src/components/ui/data-table/DataTable.vue:61`—`WeakMap<object, symbol>` keying per-row-id stability across re-renders; GC'd with row objects)
- `warnedRowIdentityIssues` (DataTable; `src/components/ui/data-table/DataTable.vue:62`—`Set<string>` suppressing DEV warnings to once-per-row-kind across the process)

Plus two vueuse-wrapped registries on the `/dark` and `/keyboard`
subpaths (`useGlobalDark`, `useShortcutRegistry`)—these use vueuse's
`createGlobalState` primitive rather than raw module-state, and are
SCC-carved into their own subpaths per L.W1 Lane C.

These assume ONE library copy per JS process—the common case for a
peer-dep'd library where the bundler dedupes the package. Multi-library-
copy environments (rare; e.g., a consumer that bundles two different
glass-ui versions into one page) would observe state divergence between
the copies. Per Rδ verification: no DI-able alternative is cleaner; the
process-singleton pattern is canonical for these substrates.

The `useToast` subsystem additionally preserves shadcn-vue parity, so
consumers migrating from shadcn-vue retain a drop-in compatible API.
See `docs/tranches/O/audit/W4-Lane-C-useToast-decision.md` for the
disposition rationale.

---

## Layout & Sizing Tokens

### Icons

```
--icon-xs: 0.75rem   (12 px)
--icon-sm: 0.875rem  (14 px)
--icon-md: 1rem      (16 px)
--icon-lg: 1.25rem   (20 px)
--icon-xl: 1.5rem    (24 px)
```

Utility classes `.icon-xs`..`.icon-xl` set width + height.

### Input & form constraints

```
--mask-fade-width:     1rem    (16 px)
--max-width-input:     24rem   (384 px)
--input-min-width-sm:  5rem    (80 px)
--min-width-input-sm:  var(--input-min-width-sm)
```

### Chassis sizing—dock-adjusted viewport (AB.W1)

```
--chassis-max-block-size: calc(
    100dvh
    - var(--dock-footer-space, 5.75rem)
    - var(--page-padding-top, 0rem)
    - 1rem
)
```

A guardrail for consumer-app chassis cards (e.g. speedtest's
`.results-card`). The recipe subtracts the consumer-owned
`--dock-footer-space` (dock height + dock inset + card-edge inset) and
`--page-padding-top` from the dynamic viewport, then keeps one further
rem of breathing room so the card never butts the dock—the user
mandate is `≥ 1rem visible gap above dock`.

Consumers should:

1. **Centre the card vertically inside the dock-adjusted viewport.**
   The dock-adjusted viewport is `100dvh − dock-footer-space − page-padding-top`;
   the chassis lives above the dock, not behind it.

2. **Clamp internal regions to that area before any scroll falls out.**
   In a meter-and-readout chassis the yielding order is:
   meter → readout → timeline → (last resort) `overflow-y: auto` with
   `scrollbar-gutter: stable both-edges` + scroll-shadow guards.

3. **Treat scroll as a documented fallback, never the primary passing
   path.** Clamp-first / no-scroll-first is the canon. If `overflow-y:
   auto` is needed it must be after every internal region has reached
   its minimum.

Speedtest's AB.W1.T2 consumes the token to repair B1 (chassis-too-tall
occlusion), B10 (mobile/desktop fit) and H3 (mobile-375 CLS 0.926 → ≤
0.15) at the chassis level.

### Chart dimensions (consumer-facing tokens)

```
--chart-height-compact: 15rem   (240 px)
--chart-height-default: 22.5rem (360 px)
--chart-height-large:   25rem   (400 px)
--chart-margin:         1.25rem (20 px)
```

Tailwind exposure: `h-chart-compact`, `h-chart-default`, `h-chart-large`; `min-w-input-sm`; `m-chart-margin`, `mx-chart-margin`, `my-chart-margin`, and related spacing utilities backed by `--spacing-chart-margin`.

### Divider colors (for charts, overlays, echarts)

```
--color-divider-subtle: rgba(128, 128, 128, 0.05)
--color-divider-medium: rgba(128, 128, 128, 0.4)
--color-divider-strong: rgba(128, 128, 128, 0.7)
```

Also exposed as literal constants via `@mkbabb/glass-ui/tokens` for Canvas 2D / echarts consumers that can't resolve CSS variables.

### Lift offsets (hover-lift utilities)

```
--lift-sm: -1px
--lift-md: -2px
--lift-lg: -4px
```

### Stacking overlaps (StackedIcons)

```
--stack-overlap-sm: 0.375rem (6 px)
--stack-overlap-md: 0.5rem   (8 px)
--stack-overlap-lg: 0.625rem (10 px)
```

### Border opacity scale

```
--border-opacity-light:  0.15
--border-opacity-medium: 0.25
--border-opacity-strong: 0.60
```

### Animation offsets

```
--animation-slide-sm: 3px
--animation-slide-md: 6px
--animation-slide-lg: 8px
```

### Paper textures

```
--paper-texture-size:    200px 200px
--paper-clean-texture:   url("data:image/svg+xml,...")   /* baseFrequency 0.65, 4 octaves */
--paper-aged-texture:    url("data:image/svg+xml,...")   /* baseFrequency 0.5, 5 octaves */
```

Classes `.paper-texture` and `.paper-texture-aged` apply the overlay with `multiply` blend (light) / `screen` blend (dark).

---

## Texture system

The canonical paper-texture substrate is two composable `@utility` declarations plus one wrapper SFC. Consumers never reach inside scoped styles to retint texture—they override the `--paper-*` CSS custom properties at `:root`, which cascades through the utilities transparently.

### Substrate

- `<PaperBackdrop>` (`src/components/custom/paper-backdrop/PaperBackdrop.vue`)—the wrapper SFC. Props: `opacity?: number | string`, `frequency?: "clean" | "aged"`, `class?`. Renders a single `<div class="paper-underpaint" aria-hidden="true">`; the `frequency="aged"` prop swaps `backgroundImage` to `var(--paper-aged-texture)` inline.
- `paper-underpaint` (`src/styles/paper.css:12`)—`@utility` declaration. `position: fixed; inset: 0; z-index: -1; pointer-events: none` plus the canonical feTurbulence-noise SVG data-url at 60 × 60 tile. Bound to `--glass-grain-opacity` for the alpha rung and `multiply` / `soft-light` blend (light / dark mode).
- `paper-grain-overlay` (`src/styles/paper.css:29`)—`@utility` declaration. `::after` overlay variant for individual surfaces (the underpaint is fullscreen-fixed; the overlay is a card-shaped pseudo-element). Same texture / opacity / blend cascade.

### Custom-property cascade pattern

Consumers retint texture via `:root` overrides:

```css
:root {
    /* Swap the texture image data-url. */
    --paper-clean-texture: url("data:image/svg+xml,...");
    --paper-aged-texture:  url("data:image/svg+xml,...");

    /* Or recolor the grain blend strength (used by both utilities). */
    --glass-grain-opacity: 0.18;
}
```

The cascade parallels the `--phase-color-*` substrate documented at AC.W6c / v1.5.1—consumers never edit library source; they declare overrides at `:root` (or a scoped ancestor) and the utilities cascade through. Per the J invariant (token-first), no consumer needs to fork `PaperBackdrop.vue` to add a third frequency—they ship `--paper-handmade-texture: url(...)` at `:root` and apply `class="paper-grain-overlay"` with an inline `style="background-image: var(--paper-handmade-texture)"` override.

### Migration path—consumers shipping a parallel `useTextureSystem` composable

Per P11/a §G3 + §I2, words/frontend ships ~500 LOC of parallel substrate at HEAD: `useTextureSystem.ts` (162 LOC) + `TextureCard.vue` / `TextureBackground.vue` / `TextureOverlay.vue` (341 LOC). The composable + 3 SFCs reconstruct the `--paper-clean-texture` / `--paper-aged-texture` switching plus blend-mode + intensity register that the canonical substrate already covers. The migration shape:

1. Drop `useTextureSystem.ts` + the 3 texture SFCs (~500 LOC).
2. Replace `<TextureCard>` / `<TextureBackground>` / `<TextureOverlay>` call sites with raw `class="paper-grain-overlay"` (per-surface overlay) or `<PaperBackdrop>` (fullscreen substrate). The `frequency` prop replaces the `:type="clean | aged"` consumer-side switch.
3. Override `--paper-*-texture` / `--glass-grain-opacity` at `:root` (or a scoped ancestor) when retinting is needed—consumers stop dispatching `setTextureType('aged')` programmatically and start declaring tone in CSS.
4. The local `texture-paper-{clean,aged,handmade,kraft}` Tailwind plugin block (in consumer-side `tailwind.config.ts`) collapses to two utilities—`paper-underpaint` and `paper-grain-overlay`—both already shipped via `@import '@mkbabb/glass-ui/styles'`.

Pin against the types from the owning subpath (the `/api` discovery layer was folded at 5.0.0):

```ts
import type { PaperBackdropFrequency, PaperBackdropProps, PaperBackdrop } from "@mkbabb/glass-ui/paper-backdrop";
```

The `PaperBackdropFrequency` union is the canonical surface enum; consumers exposing a domain-specific texture knob (e.g. a settings panel "Texture: clean / aged") type their prop against this rather than redeclaring `"clean" | "aged"` locally.

---

## Default Color Palette

Consumer-overridable HSL tokens. Light values; dark overrides in `.dark {}`.

```
--background:          hsl(0 0% 100%)
--foreground:          hsl(222.2 84% 4.9%)
--card:                hsl(0 0% 100%)
--primary:             hsl(222.2 47.4% 11.2%)
--secondary:           hsl(210 40% 96.1%)
--accent:              hsl(210 40% 96.1%)
--destructive:         hsl(0 84.2% 60.2%)
--muted:               hsl(210 40% 96.1%)
--muted-foreground:    hsl(215.4 16.3% 46.9%)
--ring:                hsl(222.2 84% 4.9%)
```

### Status

```
--color-status-active:  hsl(142 71% 45%)   /* green */
--color-status-paused:  hsl(48 96% 53%)    /* amber */
--color-status-idle:    var(--muted-foreground)
```

### Gold

```
--color-gold:       hsl(43 74% 49%)   /* #D49819 */
--color-gold-light: hsl(51 100% 50%)  /* #FFD900 */
--color-gold-dark:  hsl(34 87% 38%)   /* #B56D11 */
```

### Rainbow vivid / pastel (7 hues each, 0° → 300°)

`--rainbow-red`, `--rainbow-orange`, `--rainbow-yellow`, `--rainbow-green`, `--rainbow-blue`, `--rainbow-indigo`, `--rainbow-violet`, plus `--rainbow-pastel-*` desaturated counterparts.

### Blue shimmer

```
--shimmer-blue-dark:  hsl(224 76% 40%)
--shimmer-blue-mid:   hsl(217 91% 60%)
--shimmer-blue-light: hsl(213 94% 68%)
```

### Heatmap (10 levels)

`--heatmap-{1..10}-bg` and `--heatmap-{1..10}-fg`, pale red → deep red in light mode, inverted in dark mode.

---

## Reference — where the rest lives

The component catalog, per-package subpath surface, runtime-token reference, and
consumer-wiring guide are single-sourced at their canonical homes (this design doc
does not duplicate them):

- **Component catalog + structure** — generated from disk in `docs/canon/structure.md`
  (the source of truth; each package also carries its own colocated `README.md`).
- **Subpath surface + import shapes** — `package.json` `exports` + the per-version
  `MIGRATION.md` (`## 5.0.0` records the `/api` fold + the `goo-blob` → `blob` rename).
- **Consumer wiring** (`@import`, `@source`, `manualChunks`, the critical/deferred CSS
  split) — the project canon.
- **The demo storybook** — `demo/stories/` + `demo/stories/manifest.ts`; run `npm run dev`.
