# GOLDEN.md — design.md amendment (LENS B: cross-engine / perf-first)

> The CONCRETE proposed design.md amendment encoding the five elevated edicts.
> KISS: integrate into the existing §L1–L5 precept structure + cross-reference;
> do NOT bloat. Every amendment names its **slot-in point** (revise-in-place vs.
> insert-after) and is written to be pasted verbatim. The lens is FLAWLESS Chrome
> AND Safari + performance — the substrate must be the *simplest mechanism that
> hits the bar*, compositor-only, `@supports`/PRM-floored, never a per-frame
> `backdrop-filter:url()`.

---

## 0. The core idea (1 paragraph)

design.md already carries every *substrate* the five edicts need — the warm-cream
six-layer composite (§L1, never gray), the spring trio (§L2), the squish canon
(§L3), the Disney taxonomy (§L4), the a11y brackets (§L5), the √φ type ladder
(§Typography), the cartoon-shadow tokens (§Shadows), and the goo-filter +
`useLiquidFlex` volume-preserving primitives. The edicts are **not new machinery —
they are a re-tiering and a naming**: promote §L4's weak/medium principles to
*expected* (anticipation/follow-through/overlap/arc/secondary become first-class,
backed by the springs and `useLiquidFlex` that already ship), name the 1940s
TECHNICOLOR CARTOON register as a motion register (the static `--shadow-cartoon-*`
tokens gain a *punch-and-settle* choreography), promote √φ from a typography
detail to a **Philosophy pillar** (Aristotelian proportion governs ALL geometry,
not just type), and name the canonical iOS-27 reference bar + the cross-engine
meatball mandate as binding precepts. The cross-engine fence is the load-bearing
constraint: I encode it ONCE as a new precept §L6 (the Cross-Engine Floor) that
every motion/glass/goo precept cross-references, rather than scattering "Safari-safe"
caveats through five sections — a single named floor that says exactly which
mechanisms are sanctioned (compositor `transform`/`opacity`/`filter` on the surface's
OWN box; static SVG `filter:url()` goo over a `position`-frozen layer; sRGB
color-interp; NEVER `backdrop-filter:url()` or per-frame backdrop re-blur in a loop)
and which fall back under PRM/`@supports`.

**The single boldest move:** add **§L6 — The Cross-Engine Floor** as a *sixth
canonical precept* and re-frame §L4's tiers around it. The current §L4 splits Disney
principles by *whether glass-ui ships them*; the boldest reframe makes the split
about *cost on the weakest engine*. The new §L4 has only TWO tiers — **Universal**
(every primitive ships it because it is compositor-cheap on WebKit: squash/stretch,
anticipation, follow-through, overlap, arc, exaggeration, slow-in/out, timing, solid
drawing, appeal — ten of twelve become universal) and **Staged** (the two genuinely
scene-level ones, staging + secondary-action, which a composition orchestrates). The
"weak tier — we don't ship these" table is **deleted entirely**: arcs and
follow-through are not weak, they are `transform`/`offset-path`/spring-chained motions
that cost nothing extra on the compositor and now ship as the liquid-weight-universal
default. This single re-tier is the literal encoding of the user's "liquid-weight
universal" + "elevate weak/medium toward universal" edicts, and it is honest about
cross-engine cost rather than honest about old library scope.

---

## 1. DELTA-ASSAY — proposed edicts vs. design.md current text

| # | Edict | design.md CURRENT | Verdict | Amendment |
|---|-------|-------------------|---------|-----------|
| 1 | 8/12 laws universal; weak/medium → expected | §L4 (L107–138) explicitly tiers anticipation/follow-through/overlap (medium) + staging/arc/secondary (weak, "we don't ship these") | **CONTRADICTS** | Rewrite §L4 to Universal/Staged two-tier; delete the weak table; add the `--anticipate-*`/`offset-path` arc substrate row |
| 2 | Cartoon shadow+motion as a register | §Shadows "Cartoon shadows (offset, layered)" (L346–360) = STATIC tokens only; `.glass-cartoon` (L448) static lift; no punch/snap motion | **PARTIAL** (tokens exist, motion absent) | Insert §L4.5 "Cartoon register" note + a §Shadows subsection "Cartoon motion (punch & settle)" cross-ref'd from §L4 |
| 3 | Aristotelian √φ proportion in ALL things | √φ named only in §Typography (L519) + `--leading-prose` 1.618 + `InstrumentRail` 0.382; NOT a Philosophy pillar; radii (L306–321) are arbitrary px (4/6/8/12) | **PARTIAL** (type only) | Add 5th Philosophy pillar "Aristotelian proportion"; annotate §Border Radius + §Duration as φ-derived where they are; flag the arbitrary px rungs as the consumer-override seam |
| 4 | Canonical iOS-27 bar (match-or-better) | §L preamble (L21) says "iOS-aligned"; IOS27-REFERENCE.md is the bar but design.md never names it as the precept north-star | **MISSING** | Add a §L preamble paragraph naming IOS27-REFERENCE.md as the binding reference bar + the warm-cream/never-gray/paper/√φ tie-in |
| 5 | Meatball+liquid PERFECT in Chrome AND Safari | Scattered: §L1 "glass cannot sample glass" (L56), §Glass `@supports` fallback (L454), §L5 PRM. No single cross-engine floor; no goo-filter mechanism named in §L | **MISSING** (machinery exists in code, not in precept) | Add **§L6 — The Cross-Engine Floor** as the sixth precept; cross-ref from §L1/§L4/§L5 |

**Net:** 2 contradictions (edict 1 the headline), 2 missing precepts (4, 5), 1
partial-promote (3) + 1 register-name (2). No edict requires *new code primitives* —
`useLiquidFlex`, `DockGooFilter`/`GlassGooFilter`, the spring trio, the cartoon tokens,
`offset-path` all ship. The amendment is **precept-naming, not engine-building.**

**BD/union waves that ENCODE these edicts** (the amendment makes design.md the source
they cite):
- `W-LIQUID-ENTRANCE-GENERAL` (T10, ~65%) — the universal liquid entrance = edict 1's universal squash/exaggeration; **Safari-verification is its literal open gate** = edict 5.
- `W-DOCK-SCROLL-FISSION` (T2) + `DockGooFilter`/`fission-bridge.css` — the metaball necks = edict 5's "real blob↔meatball merge, no naive ellipsoids."
- `W-DOCK-TAB-INDICATOR` (T4) — per-glyph scale-pop + accent-flood = edict 1 (overlap/secondary) + edict 2 (the punch).
- `BD.W-CONCENTRIC-RADIUS`, `InstrumentRail :ratio=0.382` = edict 3.
- The BD cartoon-card waves (`.glass-cartoon`/`<CartoonCard>`) = edict 2's static base; the motion is the GAP this amendment names.

**BD/union waves that CONTRADICT (must be re-read against the new §L4):**
- T13 `W-CAROUSEL-CADENCE` — "momentum YES, snap-bounce NO on content carousel." This is NOT contradicted; it is the **honest carve-out** the new §L4 must preserve: liquid-weight-universal applies to driver motions (taps, entrances, morphs), NOT to observer content-snap. The amendment MUST keep §L2's driver-vs-observer rule intact, else edict 1 over-springs the carousel (the user's own caution in T13).

---

## 2. THE AMENDMENT (paste-ready section text + slot-in points)

### 2.1 — Philosophy: add a 5th pillar (edict 3)

**SLOT-IN:** §Philosophy (L7) currently says "Four principles govern the library."
Change to "Five principles." Insert this pillar AFTER "Orthogonal variants." (L15):

> **Aristotelian proportion.** Geometry is golden, never arbitrary. The type ladder
> steps by √φ (≈1.272); long-form leading is φ (1.618); the cockpit rail is 1/φ²
> (0.382). Where a radius, a duration, a spacing, or a width is *free* to be
> proportioned, it derives from the φ family rather than a round px. This is a
> *bias*, not a tyranny — hit targets, optical corrections, and the 1px hairline
> stay literal. The library's own tokens evolve toward φ as its identity sharpens;
> consumers override the seam (§Border Radius, §Duration) when their brand wants a
> different rhythm. Concentric radii nest by the φ-offset rule (`inner = outer −
> gap`), never by a coincidental equal radius.

**SLOT-IN (annotation, no new tokens):** §Border Radius (L306) add a one-line note
under the table:

> The 4/6/8/12/16 px rungs are the literal-px **consumer-override seam** (Aristotelian
> pillar); the *derived* radii (`--radius-card` = 2xl, the concentric nest) follow the
> φ-offset rule. `BD.W-CONCENTRIC-RADIUS` encodes the nest.

### 2.2 — §L preamble: name the iOS-27 reference bar (edict 4)

**SLOT-IN:** §"Liquid Glass design language" (L19), AFTER the L23 sentence "Five
precepts compose the language." — but note this paragraph also announces the
precept-count change to **six** (see §2.5). Insert:

> **The reference bar.** glass-ui builds reference-grade canonical iOS-27 demos that
> MATCH or BETTER the analyzed reference set (`docs/tranches/BD/viz/video-audit/
> IOS27-REFERENCE.md` — the four video audits + the Maps card + Control Center). The
> bar is absolute: every surface clears or exceeds the reference on perfected glass
> morphism (the §L1 transmissive warm-cream six-layer composite — a COLORFUL FIELD
> behind glass + a defined edge, NEVER gray/dark/opaque, both modes), paper morphism
> (visible grain, §Glass grain overlay), audacious √φ typography (§Typography), and
> the liquid-weight motion register (§L4). "iOS-aligned" above is not aspiration; it
> is the measured floor.

### 2.3 — §L4: the two-tier re-write (edict 1 — THE HEADLINE)

**SLOT-IN:** REPLACE §L4 "Motion Tiers" body (L107–138, the strong/medium/weak
three-table block) with the following. The §L4 *heading* stays; only the tier prose
+ tables change:

> ### §L4 — Motion Tiers
>
> Disney's 12 principles are the canonical taxonomy for UI motion. I split them by
> **cost on the weakest engine** (§L6), not by library scope — the liquid-weight-
> universal law (every element carries weight, inertia, bounce, squish; morphs MORE
> on move; never tight/springy) makes ten of the twelve *universal*, because each is
> a compositor-cheap `transform`/`opacity`/`filter`/`offset-path` motion the springs
> (§L2) already drive. Only two are genuinely scene-level. The tiers are now **two**:
>
> **Universal tier — every primitive shipping motion honors these.** They are
> non-negotiable AND compositor-cheap on Chrome and Safari (§L6):
>
> | # | Principle | iOS embodiment | Glass-ui substrate |
> |---|---|---|---|
> | 1 | **Squash & stretch** | press → scale 0.96, bounce back; entrance squish ≈0.88 vol-preserving | `--scale-press` + `--spring-snappy` (§L3); `useLiquidFlex` X·Y≈1 |
> | 2 | **Anticipation** | a control dips back ~3–4px before it launches; tap pre-loads | `--anticipate-dip` (a short reverse-leg keyframe before the main spring); `useSpringOrchestrator` lead-in |
> | 5 | **Follow-through / overlapping action** | child glyph settles *after* its parent; label cross-fades trailing the slide | spring-chained `--stagger-*` offsets; `useSpringOrchestrator` chaining; the EFFECTS-trails-SPATIAL rule (T4) |
> | 6 | **Slow in / slow out** | every non-spring decelerates | `--ease-standard`; springs carry it intrinsically |
> | 7 | **Arc** | morphs travel a curved path, not a straight lerp | `offset-path` + `offset-distance` on the compositor (Chrome+Safari ✓); the goo-neck waist IS an arc (§L6) |
> | 9 | **Timing** | tap <250ms; transition 400–600ms; modal 500–800ms | `--duration-fast`/`-base`/`-slow` (§Duration) |
> | 10 | **Exaggeration** | spring overshoot; pull-to-refresh elastic stretch; the cartoon PUNCH | `--spring-snappy`/`-bouncy` (§L2); the §L4.5 cartoon register |
> | 11 | **Solid drawing** | depth shadow conveys z; cartoon offset-shadow gives 2.5-D weight | the §L1 seven-tier ladder + `--z-*`; `--shadow-cartoon-*` (§Shadows) |
> | 12 | **Appeal** | distinctive personality — refraction, blob morphs, the technicolor punch | `<Aurora>` + goo morphs + §L4.5 cartoon register |
>
> **Staged tier — a composition orchestrates these; no primitive bundles them.**
> They are scene-level by nature, not by cost:
>
> | # | Principle | Why it is scene-level | Composition site |
> |---|---|---|---|
> | 3 | **Staging** | backdrop-dim + non-focal desaturate is a scene decision, not a widget's | the consumer's modal/overlay composition; `<Aurora>` tone controls |
> | 8 | **Secondary action** | which sibling reacts to a primary is a cascade the scene owns | `useSpringOrchestrator` chains in a composition recipe (e.g. badge-updates-while-icon-morphs) |
>
> Principle 4 (straight-ahead vs. pose-to-pose) is not a tier — it is the §L2
> spring-vs-ease decision (gestures = straight-ahead spring; transitions = pose-to-pose
> keyframe).
>
> **The liquid-weight floor.** Every driver motion (a motion the user's finger or a
> route-change *caused*) carries weight: it anticipates, squishes, overshoots, and
> follows through. A motion that snaps tight with no give is a defect, not a style.
> The morph deforms MORE the faster it moves (`useLiquidFlex` velocity-coupled squish).
> **The one carve-out (do not violate):** *observer* content-snap — a content carousel
> settling, a list reordering under the user's scroll — stays calm-overdamped per the
> §L2 driver-vs-observer rule (an over-springy carousel reads cheap; iOS reserves the
> bounce for open/morph, not content-snap). Liquid-weight is universal on DRIVERS, not
> on every pixel that moves.

> *(Substrate forward-refs: `--anticipate-dip`, `--stagger-*`, and the `offset-path`
> arc recipe are named here as the §L4 vocabulary; their token values land in §Duration
> / §Motion when the encoding waves ship. The two springs + `useLiquidFlex` + the
> cartoon tokens already exist — this re-tier ships no new engine.)*

### 2.4 — §L4.5 + §Shadows: the cartoon register (edict 2)

**SLOT-IN (precept note):** INSERT a short §L4.5 immediately after §L4 (a *register*,
not a sixth precept — it is a flavour of §L4 motion):

> ### §L4.5 — The Cartoon Register (1940s technicolor)
>
> An optional motion+surface register, reached for editorial/playful/paper-design
> contexts. It composes the §Shadows `--shadow-cartoon-*` offset-layered tokens with
> an EXAGGERATED §L4 choreography: the **punch** (an over-shot squash-stretch on
> arrival, `--spring-bouncy` at a deeper amplitude than the system default), the
> **snap-and-settle** (the cartoon hold — overshoot, a beat of stillness, then settle),
> and a synchronized **shadow-throw** (the offset shadow lengthens on lift and snaps
> back on press, reading as a hard light source). It is a `.glass-cartoon` /
> `<CartoonCard>` opt-in, never the system default — the default register is the calm
> Liquid Glass spring. Cross-engine: pure `transform` + `box-shadow` interpolation,
> compositor-safe both engines (§L6); the shadow-throw animates `box-shadow` which is
> paint-bound, so it is gated to discrete state-flips (hover/press/arrival), never a
> steady-state loop.

**SLOT-IN (token recipe):** §Shadows, AFTER the "Cartoon shadows (offset, layered)"
block (after L360), add:

> #### Cartoon motion (punch & settle)
>
> The static `--shadow-cartoon-*` tokens gain a motion contract under the §L4.5
> register: on lift, the offset grows one rung (`sm→md→lg`) with the surface translate;
> on press, it collapses to `sm` as the surface squishes into its own shadow. The
> throw is the §L4 *solid drawing* cue (a 2.5-D hard-light read). Recipe lives in the
> `.glass-cartoon` stylesheet (state-flip transitions on `box-shadow` + `transform`),
> not a per-frame loop — paint-bound, so it is discrete-state only (§L6 paint-cost
> fence). PRM → the throw collapses to the static `-md` rung; no motion.

### 2.5 — §L6: The Cross-Engine Floor (edict 5 — THE NEW PRECEPT)

**SLOT-IN:** This makes the language **six precepts**. Update §L preamble L23 "Five
precepts compose the language" → "Six precepts compose the language." Update §L5's
cross-reference list (L156–162) + the L164 "name which tier" sentence to add §L6.
INSERT the new precept AFTER §L5 (after L154), before the "Cross-references" block:

> ### §L6 — The Cross-Engine Floor
>
> Every glass, motion, and meatball precept must render IDENTICALLY perfect in Chrome
> AND Safari/WebKit. This is a hard gate, not a best-effort — the reference bar (§L
> preamble) is iOS; a WebKit defect is a failed surface. The floor names exactly which
> mechanisms are sanctioned and which are forbidden, so every precept above
> cross-references ONE rule instead of re-litigating "Safari-safe" per section.
>
> **Sanctioned (identical on both engines):**
> - **Compositor channels only for animation** — `transform`, `opacity`, and a
>   surface's OWN `filter` (blur-settle, brightness) are GPU-composited on both engines.
>   `offset-path`/`offset-distance` (the §L4 arc) is compositor-cheap on both.
> - **Meatball goo = static SVG `filter:url()` over a frozen layer** — the
>   `feGaussianBlur`+`feColorMatrix` threshold goo (`DockGooFilter`/`GlassGooFilter`)
>   is applied to a layer whose *children* move on `transform`; the filter element
>   itself is static. The merge is a REAL metaball (two blurred shapes whose alpha
>   thresholds fuse at the waist — necks stretch, thin, and SNAP), never a naive
>   ellipsoid tween. `color-interpolation-filters: sRGB` is mandatory (WebKit defaults
>   to linearRGB and blows the threshold edge → halo/gray seam).
> - **`@supports` + PRM floors** — every glass/motion precept ships its degraded arm.
>
> **Forbidden (breaks or jank on WebKit):**
> - **`backdrop-filter: url(#goo)`** — NEVER. WebKit does not composite an SVG filter
>   reference through `backdrop-filter`; the goo must be a normal `filter` on the
>   surface's own layer (§L1 "glass cannot sample glass" is the adjacent trap).
> - **Per-frame `backdrop-filter` re-blur in a steady-state loop** — animating a
>   `backdrop-filter` blur radius every frame re-samples the backdrop each frame
>   (expensive both engines, pathological on WebKit). Backdrop-blur ENGAGE (T9) is
>   gated to the one-shot overlay-pull window only, never a loop.
> - **`light-dark()` wrapping an inset-shadow fragment** — computes the whole
>   `box-shadow` to none on both engines; per-mode arms only (the catch-light, §L1
>   layer 4).
> - **Naive ellipsoid "blob" tweens** masquerading as metaballs — they read as two
>   shapes sliding, not merging; the goo threshold is the only sanctioned merge.
>
> **The paint-cost fence.** Animations that are paint-bound (`box-shadow` throw §L4.5,
> `border-radius` morph, large `filter` regions) are gated to discrete state-flips or
> one-shot transitions, never steady-state loops. Steady-state motion uses transform/
> opacity only. A viz (Aurora, DotFlow) is GPU-only and offscreen-paused
> (`useIntersectionPause`); it is exempt from the compositor-channel rule because it
> owns its own canvas, but it inherits the PRM-freeze + park-when-hidden floor.
>
> A precept's spec is incomplete if it ships a motion or goo mechanism without naming
> its §L6 arm (which channel, which fallback, which fence).

**SLOT-IN (cross-ref housekeeping):** §L5 "Cross-references" list (L156) append:

> - §L6 Cross-engine arms → §Glass `@supports`/PRM fallbacks + §Motion Safari fences

And the L164 sentence "name which tier (§L1)…which a11y bracket (§L5)" → append
"…and which §L6 cross-engine arm (channel + fallback)."

---

## 3. KISS / DRY audit of this amendment

- **No duplication:** the cross-engine rules are stated ONCE in §L6; §L1/§L4/§L4.5/§L5
  cross-reference it. The cartoon motion contract lives in §Shadows (the token home);
  §L4.5 names the register and points there.
- **No new tokens invented in design.md prose beyond named forward-refs**
  (`--anticipate-dip`, `--stagger-*`) which the encoding waves define under their
  `§<feature>` block per the Feature-token-home rule (L180). The amendment names the
  vocabulary; the waves land the values.
- **No new engine:** every mechanism cited ships (`useLiquidFlex`, the goo filters, the
  spring trio, `offset-path`, the cartoon tokens). This is the survival-of-the-fittest
  posture — KEEP the substrate, REFINE the tiering, RE-INVENT nothing.
- **Net line delta:** §L4 shrinks (three tables → two, weak table deleted); §L6 + the
  Philosophy pillar + §L4.5 + the preamble paragraph add ~60 lines. The bloat is
  bounded and load-bearing — each addition is a named precept the encoding waves cite.

## 4. The a11y / PRM carve (the floor every edict inherits)

- `prefers-reduced-motion`: the universal-tier squash/anticipation/overshoot/arc/
  follow-through all collapse to the §L5 cross-fade arm; the cartoon punch collapses to
  the static `-md` shadow; liquid-weight becomes instant. The §L4 re-tier does NOT raise
  the PRM floor — it widens what is *available*, not what is *forced*.
- `prefers-reduced-transparency` / `prefers-contrast`: unchanged §L5 brackets; §L6's
  `@supports not (backdrop-filter)` solid arm is the goo/glass fallback.
- The §L6 paint-cost fence is itself an a11y/perf win: discrete-state paint motion +
  GPU-only viz + offscreen-park keeps the weakest engine (and the weakest device) at 60fps.
