# GOLDEN.md — the design.md amendment (canonical synthesis)

> The single canonical spec that encodes the five elevated edicts into `DESIGN.md`
> (repo-root, the precept source). Synthesized from `brainstorm/lens-a` (PURE iOS-27
> fidelity), `lens-b` (cross-engine / perf-first), `lens-c` (audacious cartoon punch).
> It takes the strongest move from each, resolves the cross-lens tensions against the
> **live** glass-ui substrate (read at HEAD, not from the lenses' assumptions), and
> lands ONE coherent, deftly-integrable amendment — a union, KISS/DRY, no parallel
> fork, no legacy. Every block names its exact slot-in point and is paste-ready.
>
> BINDING LAW: `DESIGN.md` precept block + `docs/tranches/BD/GREENFIELD-HARDENING-PLAN.md §1`
> + `docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md` (T1–T17, the acceptance bar).

---

## 0. The golden design — one paragraph

`DESIGN.md`'s §L precept block is the right home and the right shape; the five edicts
need **two surgical structural moves + three in-place revisions**, all inside the existing
§L structure, reusing the live substrate. **(A)** Re-tier §L4 from the three-tier
`strong/medium/WEAK` taxonomy — which literally ships a paragraph *disclaiming*
anticipation, arc, staging, secondary-action — into a **two-tier Universal / Scene-orchestrated**
model under one law (**Liquid Weight is Universal**): the library now ships substrate
for all twelve principles; the split is *orchestration scope* (one primitive vs a scene),
never "we don't ship it." Each principle names its **real, live** substrate (the audit
corrected the lenses' phantom citations — see §1). **(B)** Add the **Cartoon register**
as the visual+motion exaggeration ceiling: the existing warm `--shadow-cartoon-*` tokens
(already `color-mix`, NOT raw black — DESIGN.md's prose is the stale one) gain a *moving
cast* + a **bespoke `--ease-cartoon-punch` keyframe** that expresses the one thing a damped
spring physically cannot — **anticipation** (a real pre-dip below origin) → overshoot →
settle. The cartoon curve is NOT a `SPRING_PRESETS` row (that would shatter the live
overshoot ∈ [0%,10%] invariant + the analytic solver); it is a shaped `MOTION_CURVES`
entry, opt-in, loud-by-design. **(C)** A `--motion-weight` scalar (default `0.62 ≈ 1/φ`)
governs *how much cartoon* a surface carries — but scoped to **driver** motion only, never
forced on observer content-snap (the T13 carousel carve survives). **(D)** Add **§L6 —
Aristotelian Proportion** as a peer precept (proportion is a genuinely-missing governing
axis: type is √φ but radii are arbitrary px) + re-derive §Border Radius to the √φ ladder
with the concentric rule. **(E)** Fold the **Cross-Engine Floor** into §L5 as a fourth
non-negotiable bracket (the meatball Chrome+Safari mandate: static SVG goo, sRGB interp,
never `backdrop-filter:url()`, compositor-only, real metaball waist) — it sits with the
a11y carve-outs it shares the "incomplete-without-it" posture with. And name the **iOS-27
canon** as a Philosophy pillar + a §L preamble clause pointing at IOS27-REFERENCE.md.

**The single boldest move (the keystone):** the §L4 two-tier collapse + the
`--ease-cartoon-punch` anticipation curve. Together they convert the user's two loudest
edicts — *liquid-weight-universal* + *cartoon flow & punch* — from prose aspiration the
library disclaims into **a tier every primitive honors + a curve a primitive reaches for**,
which is the only way DESIGN.md's "name your precept vocabulary" contract can carry them.

---

## 1. THE AUDIT CORRECTION — what the lenses got wrong (load-bearing)

The three lenses cite substrate that does **not** exist at HEAD. The GOLDEN cites only
the live, grep-verified primitives. This is the single most important synthesis act —
a precept that cites a phantom is a lie the overfitting audit flags.

| Lens claim | Live truth (grep-verified at HEAD) | GOLDEN resolution |
|---|---|---|
| **`useSpringOrchestrator`** drives anticipation/follow-through/chaining (lens A 2c, lens B 2.3, lens C) | **MISSING from `src/`** — it is a *keyframes.js* composable, not glass-ui. The real orchestration is `useStagger` / `useStaggerReveal` / `useSpringMount` / `useSpring` (`src/composables/motion/`). | §L4 cites `useStagger` + `useStaggerReveal` + `useSpringMount` (the real follow-through/overlap substrate). |
| **`offset-path`/`offset-distance`** already ships the arc, "compositor-cheap on both" (lens B 2.3 row 7) | **Zero usages** in `src/` (`grep offset-path` → ∅). | §L4 arc cites the **real** arc substrate: the fission `--split-dx/--split-dy` two-axis travel + `useLiquidReveal` source-rect FLIP path (`useLiquidMorph.ts`) — a real curved travel, not a straight lerp. `offset-path` is named ONLY as a *forward-ref the encoding wave may add*, never as extant. |
| **`--spring-cartoon` ζ≈0.35, ~30% overshoot + pre-dip** as a 4th `SPRING_PRESETS` row (lens A 2c) | **Violates the live invariant** (`springPresets.ts`): *"every overshoot ∈ [0%,10%]; >10% is the too-springy defect."* And a single damped spring **cannot** dip below origin (monotone one-sided approach) — anticipation is physically inexpressible as a spring. | Cartoon punch is a **bespoke `MOTION_CURVES` keyframe `--ease-cartoon-punch`** with an explicit negative leg, NOT a spring preset. The spring fence is untouched. |
| Cartoon shadows are raw `rgba(0,0,0,…)` — "fix the prose to warm color-mix" (lens A 2e, lens C) | The **token source** `src/styles/tokens/shadow.css:92` is ALREADY `color-mix(in srgb, var(--shadow-color) 10%, transparent)` (warm-floor compliant). Only **DESIGN.md §Shadows lines 349-359 prose** still shows raw black. | The fix target is the **DESIGN.md prose**, not the token. §2f corrects the doc to match the live warm token (no token change). |
| `--motion-weight` co-scales four channels **universally** (lens C) | Fights the **live T13 carousel carve** + the §L2 driver-vs-observer rule (an over-springy content-snap reads cheap). | Keep the scalar (it is the DRY win), but **scope it to driver motion**; the observer carve is restated as an explicit fence in §L4. |

Net: every edict's substrate exists, but under its **real** name. The amendment is
precept-naming over live primitives — no new engine, KISS/DRY, no fork.

---

## 2. THE AMENDMENT (paste-ready, with exact slot-in points)

### 2a. Philosophy — add a FIFTH pillar (edicts 3 + 4)

**SLOT-IN:** §Philosophy line 7 `"Four principles govern the library."` → `"Five principles
govern the library."`. INSERT after the "Orthogonal variants." pillar (after line 15):

> **Aristotelian proportion + the iOS-27 canon.** Geometry is golden, never arbitrary:
> the type ladder steps by √φ (≈1.272), long-form leading is φ (1.618), the rest motion-weight
> is 1/φ (≈0.62), and every free radius / spacing / measure derives from the φ family rather
> than a round px (§L6). And the library is not "iOS-inspired" — it builds **reference-grade
> canonical iOS-27 Liquid-Glass demos that MATCH or BETTER** the analyzed reference set
> (`docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`, the bar T1–T17): perfected
> transmissive warm-cream glass (a COLORFUL FIELD behind glass + a defined edge, NEVER
> gray/dark/opaque, both modes), visible paper grain, audacious √φ type, cartoon flow & punch,
> golden proportion, and liquid weight on all motion. A primitive that merely *approximates*
> the reference has not shipped. Proportion is a *bias*, not a tyranny — hit targets, optical
> corrections, and the 1px hairline stay literal.

*(ONE pillar consolidates edicts 3 + 4 — proportion-as-law + the canonical-demo bar are both
"WHY we ship" statements peer to the four extant pillars. DRY: it names the law; the detail
lives in §L6 + IOS27-REFERENCE.md, not duplicated here.)*

### 2b. §L preamble — name the bar + the precept count (edict 4)

**SLOT-IN:** §"Liquid Glass design language" line 23 `"Five precepts compose the language."`
→ `"Six precepts compose the language."`. APPEND to line 21 (after `"…@property-typed
interpolation)."`):

> The reference bar is absolute and external: every surface clears or exceeds
> `IOS27-REFERENCE.md` (T1–T17). "iOS-aligned" is not aspiration — it is the measured floor;
> a primitive's spec is incomplete until it cites the reference target (`T1`…`T17`) it
> matches-or-betters.

### 2c. §L2 — name the cartoon curve's HOME (edict 2, the motion half)

The cartoon punch is NOT a spring (§1: it would break the overshoot ≤10% fence and a damped
spring cannot anticipate). **SLOT-IN:** §L2, after the `--spring-gentle` paragraph (after
line 78), add:

> **The Cartoon punch curve — `--ease-cartoon-punch` (§Easing).** The springs are the calm
> Liquid-Glass vocabulary; their overshoot is bounded to ≤10% by invariant (a tighter,
> "pointed" spring is the too-springy defect). The **Cartoon register** (§L4 → Cartoon, §Shadows)
> reaches *past* that ceiling for its deliberate exaggeration via a **shaped keyframe**, not a
> spring: `--ease-cartoon-punch` anticipates (a real ~4% dip **below** origin — the §L4
> anticipation principle made a curve, which no damped spring can express), then overshoots
> ~22%, then settles. It is loud by design and opt-in; the workhorse remains `snappy`. PRM
> collapses it to `--ease-standard` like every spring (§L5). The `linear()` value lands in
> §Easing → Spring curves alongside the four springs.

### 2d. §Easing → Spring curves — the cartoon `linear()` (edict 2)

**SLOT-IN:** §Easing → Spring curves, after the `--spring-gentle` block (after line 268), add:

> - **`--ease-cartoon-punch`** (cartoon register; anticipate → overshoot → settle — NOT a
>   damped spring; a shaped keyframe with an explicit negative anticipation leg). Verified
>   in `golden/cartoon-punch.html` (the prototype below):
>   ```
>   linear(0, -0.012, -0.038 33%, 0 42%, 0.62, 0.93, 1.12, 1.22 66%, 1.18,
>          1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1)
>   ```
>   The first three stops dip below 0 (anticipation pull-back); the curve crosses 1.0 and
>   peaks ~1.22 (the punch overshoot, deliberately past the spring ≤10% fence — this is why
>   it is a *register*, not a spring); the tail settles. Compositor-safe (drives `transform`
>   only). PRM → `--ease-standard`.

### 2e. §L4 — RE-TIER to Universal / Scene-orchestrated (edict 1, THE HEADLINE)

**SLOT-IN:** REPLACE the entire §L4 body (lines 109-138, the three strong/medium/weak tables
+ the closing paragraph). The §L4 heading stays; insert:

> Disney's 12 principles are the canonical taxonomy for UI motion. **The library ships
> substrate for all twelve** — the *Liquid Weight is Universal* law: every **driver** motion
> (a motion the user's finger or a route-change caused) carries weight, inertia, bounce, and
> squish; it anticipates, overshoots, follows through, and travels an arc, and it morphs MORE
> the faster it moves (`useLiquidFlex` velocity-coupled squish). Motion that snaps tight with
> no give — instant, fade-only, no settle — is the anti-pattern, not a style. The principles
> split into two tiers by **who orchestrates them** (one primitive vs a scene), never by
> whether the library ships them.
>
> **`--motion-weight` (0 → 1, rest `0.62 ≈ 1/φ`).** One scalar names *how much cartoon* a
> surface carries; it co-scales the squash depth, the overshoot share, the anticipation
> pull-back, and the cartoon-shadow travel together so they read as one proportioned
> deformation, never four unrelated tics. A primitive picks it once at rest (`0` = still,
> with a documented reason; dock/celebration push toward `1`). It is **driver-scoped**: an
> *observer* content-snap — a content carousel settling, a list reordering under the user's
> scroll — stays calm-overdamped per the §L2 driver-vs-observer rule (T13: an over-springy
> carousel reads cheap; iOS reserves the bounce for open/morph). Liquid-weight is universal
> on DRIVERS, not on every pixel that moves. PRM → `--motion-weight: 0` (the §L5 cascade
> zeroes the extra squash, overshoot, anticipation, arc, and stagger in one assignment).
>
> **Universal tier — every primitive shipping driver motion honors these:**
>
> | # | Principle | iOS-27 embodiment | Glass-ui substrate (live) |
> |---|---|---|---|
> | 1 | **Squash & stretch** | press → scale 0.96, bounce back; vol-preserving X·Y squish on move | `--scale-press` + `--spring-snappy` (§L3); `useLiquidFlex` (X·Y≈1) |
> | 2 | **Anticipation** | a control dips before it launches; a sheet pulls back before sliding up | `--ease-cartoon-punch` pre-dip (§L2/§Easing); `--motion-weight` |
> | 5 | **Follow-through / overlap** | child glyph settles *after* its parent; label cross-fades trailing the indicator glide | `useStagger` / `useStaggerReveal` per-element delay; `--stagger-step` (× `--motion-weight`) |
> | 6 | **Slow in / slow out** | every non-spring decelerates | `--ease-standard`; springs carry it intrinsically |
> | 7 | **Arc** | a morph travels a curved path, not a straight lerp | the fission `--split-dx/--split-dy` two-axis travel + `useLiquidReveal` source-rect FLIP (`useLiquidMorph.ts`) — a real curve, not a line |
> | 9 | **Timing** | tap < 250ms; transition 400–600ms; modal 500–800ms | `--duration-fast`/`-base`/`-slow` (§Duration) |
> | 10 | **Exaggeration** | spring overshoot; pull-to-refresh elastic; the cartoon PUNCH | `--spring-bouncy` (§L2) → the cartoon `--ease-cartoon-punch` ceiling |
> | 11 | **Solid drawing** | glass depth conveys z; the cartoon layered-offset shadow gives 2.5-D pop | the §L1 seven-tier ladder + `--z-*`; the §Shadows Cartoon register |
> | 12 | **Appeal** | distinctive personality — refraction, blob/meatball morph, technicolor punch | `<Aurora>` + the meatball goo (§L6) + the Cartoon register |
>
> **Scene-orchestrated tier — a composition orchestrates these from the universal substrate;
> the library *enables* them, no longer disclaims them:**
>
> | # | Principle | Why it is scene-level | How the library enables it |
> |---|---|---|---|
> | 3 | **Staging** | backdrop-dim + non-focal desaturate is a scene decision, not a widget's | the drawer `--glass-drawer-t → scrim/page-scale` coupling (`W-DRAWER-DETENT-GLASS`); `<Aurora>` tone controls — the substrate provides the scrim+scale tokens, the consumer stages |
> | 8 | **Secondary action** | which sibling reacts to a primary is a cascade the scene owns | `useStagger` chains in a composition recipe + the one-shot `--*-flood-t` accent-wash precedent (the tab-indicator commit flood) |
>
> Principle 4 (straight-ahead vs. pose-to-pose) is not a tier — it is the §L2 spring-vs-ease
> decision (gestures = straight-ahead spring; transitions = pose-to-pose keyframe).
>
> Every principle now names its **live** substrate; the difference between the tiers is
> orchestration scope, not whether the library ships it. A primitive's spec names which
> principles it exercises, which `--motion-weight` it rests at, and which spring/curve (§L2)
> carries the motion.

*(The "weak — we don't ship these" paragraph + table is DELETED; its three principles move
to the scene-orchestrated tier, each pointing at a REAL extant mechanism — the fission
offsets are a real arc, the drawer scrim is real staging, the accent-flood is real
secondary-action. No prose lie remains. The `--motion-weight` / `--stagger-step` tokens are
forward-refs whose values land in §Motion per the Feature-token-home rule; the cited
composables + `--split-*` + `useLiquidFlex` already ship — this re-tier ships no new engine.)*

### 2f. §Shadows → "Cartoon shadows" — ELEVATE to the register + FIX the stale prose (edict 2)

**SLOT-IN:** §Shadows, the "Cartoon shadows (offset, layered)" block (lines 346-360). The
token block shown there is **stale** — it shows raw `rgba(0,0,0,…)` but the live source
(`src/styles/tokens/shadow.css:92`) is already warm `color-mix(in srgb, var(--shadow-color)
10%, transparent)`. Correct the shown values to the live warm token AND add the register prose:

> ### Cartoon shadows (offset, layered) — the Cartoon register
>
> The cartoon shadow is not just an elevation token — it is the **visual half of the Cartoon
> register** (its motion half is `--ease-cartoon-punch`, §L2). The 1940s-technicolor reading:
> a surface pops off the page in bold, **warm-tinted** (`color-mix` against `--shadow-color`,
> the BA.W-NO-GRAY warm floor — **NEVER raw black**; the rungs ship as
> `color-mix(in srgb, var(--shadow-color) <p>%, transparent)`, three layered offsets per rung),
> layered offset planes, and **punches** when it moves.
>
> *(replace the stale `rgba(0,0,0,…)` block with the live `--shadow-cartoon-{sm,md,lg}` =
> `color-mix(in srgb, var(--shadow-color) {10/12/8}%, transparent)` triads from
> `tokens/shadow.css`.)*
>
> **The cast is a MOVING cast.** Under the register, the offset travels with the gesture: as a
> surface translates or presses, the cartoon-shadow offset slides *opposite* the motion (the
> cel's light source stays fixed while the object moves), scaled by `--motion-weight`. The
> travel is a `transform` on a `::after` shadow-caster layer — **never an animated `box-shadow`**
> (box-shadow is paint-bound, not compositor-cheap; §L6). The cast deepens on press (the object
> lifts off its shadow) and snaps back on release. A surface enters the register by composing a
> cartoon-shadow rung **with** `--ease-cartoon-punch` on its interactive transitions + the
> exaggerated `--scale-press` snap-and-settle. `<CartoonCard>` / `.glass-cartoon` is the
> canonical carrier (§Glass Surfaces); the register is opt-in (loud by design) — the default
> glass surface stays the calm six-layer composite. PRM → static cast, no travel, no punch.
> `prefers-contrast: more` → the cast opacity floors UP (the inked edge is a legibility asset,
> unlike the soft glass shadow); `prefers-reduced-transparency` does NOT touch it (the cartoon
> shadow is opaque ink, not a transmissive layer — it survives as a bonus legibility anchor).

### 2g. NEW §L6 — Aristotelian Proportion (edict 3)

**SLOT-IN:** INSERT as a peer precept AFTER §L5 (after line 154), before the "Cross-references"
block (line 156). Update §L5's cross-reference list + the line-164 "name which tier" sentence
to add §L6 (and the §L7 of 2h).

> ### §L6 — Aristotelian Proportion
>
> Proportion is a governing axis, peer to glass and motion. **Nothing dimensional is
> arbitrary**: radii, spacing, padding, card width, the rest motion-weight, and the type
> ladder derive from the golden section (φ ≈ 1.618) and its root (√φ ≈ 1.272). The type ladder
> already obeys this (§Typography, √φ steps) — the proven exemplar; §L6 extends the law to all
> dimensional tokens.
>
> - **Type** — the √φ ladder (`--type-*`), unchanged.
> - **Radius** — a √φ-derived ladder (§Border Radius, re-authored below); **concentric** nested
>   radii subtract the gap (`r_inner = r_outer − gap`) so corners stay parallel (the iOS
>   concentric-radius law; `BD.W-CONCENTRIC-RADIUS` encodes it).
> - **Spacing / padding** — the canonical gaps step by √φ from a base; a card's padding and its
>   corner radius share the proportion so it reads as one proportioned object.
> - **Card width / measure** — long-form measure targets the golden ratio of its column; hero
>   stages target φ² of the body rung.
> - **Motion** — the rest `--motion-weight` is `1/φ ≈ 0.62` (§L4): present, alive, never manic.
>
> **Selection rule.** When a primitive needs a free dimension it reaches for the nearest
> φ-ladder token, never a hand-picked px. A new dimension earns a √φ-indexed rung, not a magic
> number; a non-φ value that is not a documented physical constant (1px hairline, 60fps budget)
> is a defect the overfitting audit flags.
>
> **A11y carve.** Proportion is geometry, not motion or transparency — it has NO PRM /
> reduced-transparency bracket; it holds identically across all a11y states. (This is why it
> is its own precept, not folded into §L1 or §L4.)

**SLOT-IN (re-author §Border Radius, lines 306-321):** the current ladder is arbitrary
(4/6/8/12/16px). Re-derive from a base × √φ — most live values already sit on or near the
ladder, so this is a *derivation re-statement + the concentric rule*, not a visual break:

> | Token | φ-derivation | Value | Use |
> |---|---|---|---|
> | `--radius-sm` | base | 4px | kbd, badge inner |
> | `--radius-md` | base·√φ | ~5px → 5px | medium |
> | `--radius` / `--radius-lg` | base·φ | ~6.5px → **8px** *(holds the live default)* | default, interactive |
> | `--radius-xl` | base·φ·√φ | ~10px → **12px** *(holds)* | panels |
> | `--radius-2xl` | base·φ² | ~13px → **16px** *(holds)* | cards, dialogs |
> | `--radius-pill` | — | 9999px | pills (unchanged) |
>
> **Concentric rule.** Nested surfaces compute `--radius-inner = calc(var(--radius-outer) −
> var(--gap))` so corners stay parallel. NO LEGACY: the arbitrary-px framing is retired; the
> ladder is the √φ derivation, the live values mostly already on it.

### 2h. NEW §L7 — The Cross-Engine Floor (edict 5)

**SLOT-IN:** This makes the language **seven precepts** (update §L preamble line 23 → "Seven
precepts" — supersedes 2b's "Six"; the count grows by §L6 + §L7). INSERT after §L6, before
the Cross-references block. (Placing the meatball mandate as its OWN precept — over lens-A/C's
"fold into §L5 as a bracket" — because cross-engine correctness is orthogonal to a11y: an
a11y bracket *degrades* a subsystem for a user-preference, the cross-engine floor *forbids a
mechanism* for an engine; conflating them muddies both. It is a peer, like §L6.)

> ### §L7 — The Cross-Engine Floor
>
> Every glass, motion, and meatball precept must render **identically perfect in Chrome AND
> Safari/WebKit** — a hard gate, not best-effort (the reference bar is iOS; a WebKit defect is
> a failed surface). The floor names the sanctioned + forbidden mechanisms ONCE so every
> precept above cross-references one rule instead of re-litigating "Safari-safe" per section.
>
> **Sanctioned (identical on both engines):**
> - **Compositor channels only for steady-state animation** — `transform`, `opacity`, and a
>   surface's OWN `filter` (blur-settle, brightness) are GPU-composited on both engines.
> - **Meatball goo = a STATIC inline-SVG `filter:url()` over a frozen layer** — the
>   `feGaussianBlur` + `feColorMatrix` alpha-threshold goo (`DockGooFilter` / `GlassGooFilter`,
>   `fission-bridge.css`) is applied to a layer whose *children* move on `transform`; the filter
>   element itself is static. The merge is a **real metaball** — two blurred shapes whose alpha
>   thresholds fuse at the waist (necks stretch, thin, and SNAP), **never a naive ellipsoid
>   tween**. `color-interpolation-filters: sRGB` is mandatory (WebKit defaults to linearRGB and
>   blows the threshold edge → halo/gray seam; the live filters already set sRGB).
> - **`@supports` + PRM floors** — every glass/motion/goo precept ships its degraded arm
>   (`@supports not (backdrop-filter)` solid arm; PRM → instant topology swap, zero neck frames).
>
> **Forbidden (breaks or janks on WebKit):**
> - **`backdrop-filter: url(#goo)`** — NEVER; WebKit drops an SVG-filter reference through
>   `backdrop-filter`. The goo is a normal `filter` on the surface's own layer (the §L1 "glass
>   cannot sample glass" trap is adjacent).
> - **Per-frame `backdrop-filter` re-blur in a steady-state loop** — re-samples the backdrop
>   every frame (pathological on WebKit). Backdrop-blur ENGAGE (T9) is gated to the one-shot
>   overlay-pull window only, never a loop.
> - **`light-dark()` wrapping an inset-shadow fragment** — computes the whole `box-shadow` to
>   none on both engines (the live `feedback_lightdark_inset_shadow` trap); per-mode arms only.
> - **Naive ellipsoid "blob" tweens** masquerading as metaballs — they read as two shapes
>   sliding, not merging; the goo threshold is the only sanctioned merge.
>
> **The paint-cost fence.** Paint-bound animations (the cartoon `box-shadow` throw §Shadows,
> `border-radius` morph, large `filter` regions) are gated to discrete state-flips or one-shot
> transitions, never steady-state loops; steady-state motion uses transform/opacity only. A
> viz (Aurora, DotFlow) owns its own canvas (GPU-only, offscreen-paused via
> `useIntersectionPause`) and inherits the PRM-freeze + park-when-hidden floor.
>
> A precept's spec is incomplete if it ships a motion or goo mechanism without naming its §L7
> arm (which channel, which fallback, which fence). The acceptance proof is a **paired-engine π
> capture** (Chromium AND WebKit), never a single-engine green.

**SLOT-IN (cross-ref housekeeping, line 156-164):** append to the §L5 Cross-references list:
> - §L6 Proportion → §Border Radius (√φ ladder + concentric rule) + §Typography (√φ exemplar)
> - §L7 Cross-engine arms → §Glass `@supports`/PRM fallbacks + the goo filters + §Motion Safari fences

And the line-164 sentence → append: `"…which §L6 proportion rung, and which §L7 cross-engine arm
(channel + fallback)."`

---

## 3. The cross-engine + a11y/PRM carve (consolidated)

| Mechanism | PRM | reduced-transparency | contrast: more | Cross-engine (§L7) |
|---|---|---|---|---|
| Springs (smooth/snappy/bouncy/gentle) | → `--ease-standard` (no overshoot) | — | — | `linear()` on transform/opacity; both engines |
| `--ease-cartoon-punch` | → `--ease-standard` (pre-dip + punch vanish) | — | — | transform only; both engines |
| `--motion-weight` cascade | → 0 (squash-extra/overshoot/anticipation/arc/stagger all zero) | untouched (motion ≠ transparency) | — | scalar; engine-agnostic |
| Cartoon-shadow moving cast | → static cast, no travel | untouched (opaque ink, not glass) | opacity floors UP (legibility asset) | `transform` on `::after` caster; never animated `box-shadow` |
| §L6 Proportion | NO bracket (geometry invariant) | NO bracket | NO bracket | engine-agnostic |
| Meatball goo | → instant topology swap, zero neck frames | `@supports not (backdrop-filter)` solid arm | — | static SVG `filter:url()`, sRGB, never `backdrop-filter:url`; real waist |

---

## 4. Delta-assay (proposed edicts vs current DESIGN.md)

| Edict | DESIGN.md CURRENT | Verdict | The amendment |
|---|---|---|---|
| 1 universal laws | §L4 (109-138): weak tier "we don't ship anticipation/arc/staging/secondary"; medium "not primitive-level" | **DIRECT CONTRADICTION** | 2c+2d (cartoon curve) + 2e (re-tier; delete the disclaimer; `--motion-weight` driver-scoped) |
| 2 cartoon register | §Shadows: tokens only; **prose stale-lies** they are `rgba(0,0,0)` (live: warm `color-mix`); no motion | under-claimed + factual drift | 2c+2d (curve) + 2f (register + prose fix to the live warm token) |
| 3 proportion | only §Typography is √φ; §Border Radius arbitrary px; no precept | **MISSING axis** | 2a (pillar) + 2g (§L6 + φ radius) |
| 4 ios27 canon | §L preamble "iOS-aligned"; no match-or-better; no reference-doc citation law | under-stated | 2a (pillar) + 2b (preamble clause) |
| 5 meatball cross-engine | scattered (§L1 "glass cannot sample glass", §Glass `@supports`, §L5 PRM); not a precept | **MISSING precept** | 2h (§L7) |

**BD/union waves that ENCODE these (allies):** `BD.W-DOCK-SCROLL-FISSION` (T2 meatball waist),
`W-LIQUID-ENTRANCE-GENERAL` (T10 universal squish/anticipation), `BD.W-DOCK-TAB-INDICATOR`
(T4 secondary-action accent-flood + per-glyph pop), `BD.W-DRAWER-DETENT-GLASS` (T6 staging via
scrim/scale), `BD.W-CONCENTRIC-RADIUS` (the §L6 concentric rule), `BB.W-DISPLAY-TRACKING` (T15
√φ type), `BE.W-ANTICIPATE-FOLLOW` / `BE.W-CELEBRATE-BURST` / `BE.W-DOCK-JUBILANCE` (the cartoon
punch + anticipation/follow-through made real). **Wave to RECONCILE:** `W-CAROUSEL-CADENCE`
(T13) — NOT contradicted; it is the honest observer carve the new §L4 explicitly preserves
("driver-scoped, not every pixel").

---

## 5. Acceptance bar + the born-RED gate sketch

**Acceptance bar (the GOLDEN ships only when):**
1. §L4's "weak tier" table + "we don't ship these" paragraph are GONE; every Disney principle
   names a live-grep-verifiable substrate; `useSpringOrchestrator` / `offset-path` appear
   **only** as forward-refs, never as extant claims.
2. `--ease-cartoon-punch` exists in §Easing with a `linear()` whose **first stops are negative**
   (anticipation) and whose **peak exceeds 1.10** (past the spring fence) — and it is NOT in
   `SPRING_PRESETS` (the ≤10% invariant intact).
3. §Shadows cartoon prose shows warm `color-mix`, not `rgba(0,0,0)`.
4. §L6 + §L7 exist as peer precepts; §L preamble says "Seven precepts"; Philosophy says "Five
   principles"; the Cross-references + line-164 sentence name §L6 + §L7.
5. §Border Radius is the √φ ladder + the concentric rule, live values held.

**Born-RED gate sketch (a π / readback that proves it — run at amendment-apply time):**

```sh
# docs/tranches/BD/greenfield/design-language-edicts/golden/gate.sh
# Born-RED on the CURRENT DESIGN.md; GREEN only after the amendment lands.
D=DESIGN.md
fail=0
# (1) the disclaimer must be DELETED
grep -q "Weak tier — we don't ship these" $D && { echo "RED: §L4 weak-tier disclaimer still present"; fail=1; }
grep -q "do not have first-class glass-ui substrate" $D && { echo "RED: §L4 'we don't ship' prose present"; fail=1; }
# (2) the cartoon curve exists AND is NOT a spring preset
grep -q "ease-cartoon-punch" $D || { echo "RED: --ease-cartoon-punch absent"; fail=1; }
grep -q "spring-cartoon" src/composables/motion/springPresets.ts && { echo "RED: cartoon snuck into SPRING_PRESETS (breaks ≤10% fence)"; fail=1; }
# (3) cartoon shadow prose is warm, not raw black
awk '/Cartoon shadows \(offset, layered\)/{f=1} f&&/rgba\(0,0,0/{print "RED: §Shadows cartoon prose still raw rgba(0,0,0)"; exit 1}' $D || fail=1
# (4) the new precepts + counts
grep -q "§L6 — Aristotelian Proportion" $D || { echo "RED: §L6 absent"; fail=1; }
grep -q "§L7 — The Cross-Engine Floor" $D || { echo "RED: §L7 absent"; fail=1; }
grep -q "Seven precepts compose the language" $D || { echo "RED: precept count not bumped to Seven"; fail=1; }
grep -q "Five principles govern the library" $D || { echo "RED: Philosophy pillar count not bumped to Five"; fail=1; }
# (5) phantom-citation guard — the lenses' phantoms must NOT appear as extant substrate
grep -q "useSpringOrchestrator" $D && echo "WARN: useSpringOrchestrator cited (phantom — must be forward-ref only)"
[ $fail -eq 0 ] && echo "GREEN: all five edicts encoded" || { echo "GATE RED ($fail)"; exit 1; }
```

The live π (the *visual* born-RED proof, run per band against `localhost:5173` in BOTH
engines): a `--ease-cartoon-punch` test surface must show a **measurable pre-dip below its
rest position** in a frame-series (RED on any monotone-approach spring), and the goo waist
must read identically in Chromium AND WebKit (RED on a naive-ellipsoid or a linearRGB gray
seam) — proved by the prototype below.

---

## 6. The prototype (de-risks the boldest mechanism)

`golden/cartoon-punch.html` — a throwaway spike (greenfield dir, NOT `src/`) that de-risks the
single thing a damped spring physically cannot do: **anticipation** (a pre-dip below origin).
It proves the `--ease-cartoon-punch` `linear()` actually dips below rest before launching and
overshoots past the spring fence, in a real browser, on `transform` only (compositor-safe,
both engines). Verified live on `localhost` — see §7. This is the keystone risk; the goo
cross-engine waist is already shipped + sRGB-verified in `DockGooFilter`/`fission-bridge.css`
(§1), so it needs no new spike — only the §L7 mandate that states the law it already obeys.
