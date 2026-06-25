# design-language-edicts — LENS C: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

> Greenfield brainstorm for the design.md amendment that encodes the user's five
> elevated edicts. Lens C = maximum 1940s-technicolor FLOW & PUNCH: bold cartoon
> shadowing, exaggerated squash/stretch/morph, anticipation + follow-through +
> overlapping action + arcs, real weight & inertia — the boldest, most-alive
> variant that is still idiomatic + cross-engine. Deliverable below is the
> concrete proposed design.md amendment text + exact slot-in points (GOLDEN feeds
> the orchestrator vet+apply).

---

## 0. CORE IDEA (one paragraph)

design.md today is a *restraint document* — §L4 literally enumerates the Disney
principles it REFUSES to ship (staging/arc/secondary-action = "weak tier, lives
at the consumer"), and the cartoon shadows sit inert as three color tokens with
no motion attached. Lens C inverts the posture: glass-ui's identity is a
**warm-cream liquid-glass surface that MOVES like a 1940s Technicolor cartoon
cel** — it anticipates before it acts, squashes on impact, follows through past
its target, settles on an arc with real weight, and casts a bold layered-offset
shadow that *travels with the gesture*. The amendment does this WITHOUT bloating
design.md: it (a) **re-tiers §L4** from strong/medium/WEAK into a single
**Universal motion law** + a short "where it lives" column (anticipation/
follow-through/arc/overlap/staging move from "we don't ship" to "the substrate
ships the hook, the recipe arms it"); (b) **promotes the existing Cartoon-shadow
tokens to a §L6 register** (Technicolor Punch) that binds the static shadow to
motion — the shadow is a *moving cast*, not a decoration; (c) adds **one new
Philosophy pillar — Aristotelian Proportion** — making √φ the law for ALL
geometry, not just type; (d) names the **canonical iOS-27 bar** as a one-line
Philosophy clause pointing at IOS27-REFERENCE.md so design.md stops being
self-referential; (e) folds the **Chrome+Safari meatball mandate** into §L5 as a
fourth cross-engine bracket so it sits with the other non-negotiable carve-outs.
KISS: ~5 surgical edits, every one cross-references existing substrate (springs,
tokens, observers) rather than minting parallel systems.

**THE SINGLE BOLDEST MOVE:** delete the "Weak tier — we don't ship these" table
outright and replace §L4 with **"The Universal Cel Law"** — every primitive that
moves must, by default, carry the full cartoon arc (anticipation → squash →
overshoot → follow-through → arc-settle), driven by ONE new scalar token
`--motion-weight` (0→1, the "how much cartoon" knob) that scales the squash
depth, overshoot %, anticipation pull-back, and the cartoon-shadow travel
*together*. A primitive doesn't opt INTO liveliness anymore — it opts into
*stillness* (`--motion-weight: 0`) only with a documented reason. That is the
liquid-weight-universal law made literally first-class and measurable in one
knob, and it is the inversion design.md needs.

---

## 1. THE FIVE EDICTS → CONCRETE design.md AMENDMENTS

### EDICT 1 — The 8/12 laws applied universally (RE-TIER §L4)

**Slot-in:** REPLACE the entirety of current §L4 "Motion Tiers" (lines ~107–138,
the strong/medium/weak three-table split) with the new §L4 below. Same §L4
position, same cross-reference role; the strong-tier substrate mappings are
PRESERVED (no token is lost) — only the *posture* re-tiers.

> #### §L4 — The Universal Cel Law (motion principles applied universally)
>
> Disney's 12 principles of animation are the canonical taxonomy for UI motion.
> Earlier glass-ui split them strong/medium/weak and declined to ship the weak
> set. **That split is retired.** The liquid-weight-universal law (every element
> carries inertia, weight, bounce, squish; morphs MORE on move; never tight or
> springy-thin) elevates the former medium+weak principles toward **universal
> application**: anticipation, follow-through, overlapping action, arcs, and
> secondary action are now *expected of every moving primitive*, with the
> substrate to honor them. A primitive that moves flat — instant, fade-only, no
> pull-back, no overshoot, no arc — is **incomplete**, the same way a glass
> surface missing a §L1 layer is incomplete.
>
> **The weight knob — `--motion-weight` (0 → 1).** One scalar governs "how much
> cartoon." It co-scales four channels so they stay proportional and never
> read as four unrelated tics:
>
> | Channel | At `--motion-weight: 0` | At `--motion-weight: 1` | Substrate |
> |---|---|---|---|
> | Squash depth | scale 1.0 (none) | the §L3 squash + a vol-preserving X·Y counter-stretch | `--scale-press` × weight (see §L3) |
> | Overshoot | 0% (critically damped) | the `--spring-bouncy` ~9% arrival overshoot | §L2 spring presets, weight selects smooth→snappy→bouncy |
> | Anticipation pull-back | none | a ~3–5px reverse nudge before the主 move | composition recipe arms it; `useSpringOrchestrator` lead-in |
> | Cartoon-shadow travel | static cast | the offset cast slides opposite the motion (§L6) | `--shadow-cartoon-*` + `--motion-weight` (see §L6) |
>
> The canonical resting value is `--motion-weight: 0.62` (≈ 1/φ — the
> Aristotelian rung, see Philosophy → Proportion): present, alive, never manic.
> Dock controls and celebratory reveals push toward `1`; dense data tables and
> ambient system motion ease toward `0`.
>
> **Where each principle lives (the substrate ships the hook; the recipe arms
> the scene-level ones).** The library is no longer silent on any principle —
> it ships the *hook* for every one; scene-level principles are armed by a
> composition recipe, never absent:
>
> | # | Principle | Substrate hook (always present) | Armed by |
> |---|---|---|---|
> | 1 | Squash & stretch | `--scale-press` + vol-preserving counter-stretch | every primitive (§L3) |
> | 2 | **Anticipation** | `useSpringOrchestrator` lead-in window; `--motion-weight` | entrance/press recipes (was "weak→sheet only") |
> | 3 | **Staging** | `--glass-level` backdrop-dim + `--motion-weight` focal lift | overlay/modal recipes (was "we don't ship") |
> | 4 | Straight-ahead vs pose-to-pose | §L2 spring-vs-ease rule | decision rule |
> | 5 | **Follow-through / overlapping** | `useSpringOrchestrator` chaining + `--stagger-step` | every staggered group (was "discipline only") |
> | 6 | Slow in / slow out | `--ease-standard`, the `linear()` springs | universal |
> | 7 | **Arc** | `--motion-arc` (a translate-Y bow on a move's mid-frame) | move/dismiss recipes (was "we don't ship") |
> | 8 | **Secondary action** | `--stagger-step` cascade + `useSpringOrchestrator` | composition (was "we don't ship") |
> | 9 | Timing | `--duration-*` ladder | universal |
> | 10 | Exaggeration | `--spring-bouncy` overshoot; `--motion-weight` | universal, weight-scaled |
> | 11 | Solid drawing | §L1 seven-tier ladder + `--z-*`; §L6 cartoon-shadow depth | universal |
> | 12 | Appeal | Liquid-Glass refraction + §L6 Technicolor Punch + Aurora | the brand register |
>
> **New substrate tokens** (the only additions; values land in §Motion / §Easing):
> `--motion-weight` (0–1, default 0.62), `--motion-arc` (the mid-flight Y-bow
> amplitude, default `0.5rem` × weight), `--stagger-step` (the overlapping-action
> delay between siblings, default `40ms` × weight). All three are PRM-carved:
> under `prefers-reduced-motion`, `--motion-weight → 0`, arc → 0, stagger → 0
> (§L5 already disables overshoot; this extends the same cascade).
>
> **Selection rule.** A primitive picks `--motion-weight` once, at its rest. It
> does NOT hand-roll squash + overshoot + arc separately — it turns the one knob
> and the four channels move together. This is the §L3 "tap-squish is universal"
> rule generalized to all motion: one vocabulary, not scattered keyframes.

**Why this is idiomatic, not bloat:** it REUSES `--scale-press` (§L3), the three
springs (§L2), `useSpringOrchestrator` (§Composables), `--glass-level` (already
shipped), `--ease-standard`. The net-new is exactly THREE tokens
(`--motion-weight`, `--motion-arc`, `--stagger-step`) and they consolidate what
were previously scattered per-recipe magic numbers. The table is the same shape
as the old strong-tier table, so the document's rhythm is unbroken.

---

### EDICT 2 — Cartoon animation + shadowing as a first-class REGISTER (NEW §L6)

**Slot-in:** INSERT a new precept **§L6 — Technicolor Punch** immediately after
§L5 (Accessibility brackets), before the "---" that closes the Liquid Glass
section (~line 165). Update the section intro line 23 from "Five precepts" → "Six
precepts." Add the §L6 cross-reference row to the §L4-area cross-ref block (line
156–162). The existing Cartoon-shadow TOKENS (design.md §Shadows ~346) STAY where
they are as the substrate values — §L6 references them, it does not duplicate
them (the §L1→§Glass-Surfaces precedent).

> ### §L6 — Technicolor Punch (the cartoon register)
>
> Liquid Glass is the *material*; Technicolor Punch is the *attitude*. It is the
> 1940s-cartoon-cel register: bold layered-offset shadows + exaggerated
> squash/stretch + the snap-and-settle. Where §L1–L5 make a surface read as real
> glass, §L6 makes it read as *alive and drawn* — a hand-inked cel with weight,
> not a flat vector. It is a register a primitive OPTS INTO for its hero / dock /
> celebratory moments; it is not on every body-text label, but the substrate is
> always present.
>
> **The cartoon-shadow cast is a MOVING cast.** The `--shadow-cartoon-{sm,md,lg}`
> tokens (§Shadows) are a layered hard-offset triad (warm-tinted, `hsl(30 …)` —
> never neutral grey, honoring §3 warm-floor). Statically they read as a bold
> inked drop-shadow. Under §L6 the cast **travels with the gesture**: as a
> primitive translates or presses, its cartoon-shadow offset slides *opposite*
> the motion (the cel's light source stays fixed while the object moves), scaled
> by `--motion-weight`. The recipe:
>
> ```
> /* §L6 cartoon-shadow travel — compositor-safe, the offset is a token, the
>    travel is a transform on a ::after shadow-caster layer (NOT an animated
>    box-shadow — box-shadow is not compositor-cheap). */
> .punch {
>   --punch-dx: calc(-4px * var(--motion-weight));   /* rest offset */
>   --punch-dy: calc( 3px * var(--motion-weight));
> }
> .punch:active { --punch-dx: calc(-7px * var(--motion-weight)); } /* press deepens the cast */
> ```
>
> The cast deepens on press (the object lifts off its shadow) and snaps back on
> release with `--spring-snappy` — the "punch" is the shadow gap opening then
> slamming shut.
>
> **The snap-and-settle.** A §L6 entrance over-shoots its target by the
> `--spring-bouncy` ~9%, the cartoon-shadow lags one frame behind the body
> (overlapping action, §L4 #5), then both settle on an arc (§L4 #7). This is the
> "punch": arrive bigger than rest, shadow trailing, settle down with weight.
> Mechanism: `useSpringOrchestrator` chains the body spring and the shadow-caster
> spring with a one-frame `--stagger-step` offset; no new engine.
>
> **Substrate.** §L6 mints NO new tokens — it composes `--shadow-cartoon-*`
> (§Shadows), `--motion-weight` / `--motion-arc` / `--stagger-step` (§L4),
> `--spring-bouncy` / `-snappy` (§L2). It is a *recipe register*, the cartoon
> sibling of the §L1 six-layer glass composite.
>
> **a11y (§L5 inherits).** `prefers-reduced-motion` → the cast stops traveling
> (static offset only), no overshoot, no arc. `prefers-contrast: more` → the
> cartoon-shadow opacity floors up (the inked edge is a legibility asset under
> high contrast, unlike the soft glass shadow). `prefers-reduced-transparency`
> does NOT touch §L6 — the cartoon shadow is opaque ink, not a transmissive
> layer; it survives the transparency carve as a bonus legibility anchor.

**Why this is idiomatic, not bloat:** §L6 is structurally a twin of §L1 — a
short precept that NAMES a register and POINTS at the substrate tokens that
already exist (`--shadow-cartoon-*` since §Shadows ~346). The one CSS block is
illustrative recipe, matching the §L3 tap-choreography and §L1 six-layer
illustrative style already in the doc. It elevates the user's literal ask
("design.md already has §Cartoon shadows as tokens; elevate to a design register
with motion") with zero token duplication.

---

### EDICT 3 — Aristotelian proportion in ALL things (NEW Philosophy pillar)

**Slot-in:** The Philosophy section (lines 5–16) currently states "Four
principles govern the library." ADD a FIFTH pillar **Proportion** after
"Orthogonal variants" (line 15), and update line 7 "Four principles" → "Five
principles." This is the right home: Proportion is a *governing law*, not a
motion or glass precept — it sits with Token-first and Component-over-CSS as a
cross-cutting discipline.

> **Aristotelian proportion.** Nothing is arbitrary. The √φ (≈ 1.272) ladder
> already governs type (§Typography); the same proportion governs ALL geometry —
> radii, spacing, padding, card width, gap, the motion-weight rest value (1/φ ≈
> 0.62), the cartoon-shadow offset ratios. Concentric radii nest by φ (an inner
> element's radius = outer radius ÷ φ, so corners stay visually concentric).
> When a value could be any number, it is a φ-rung — `--space-*`, `--radius-*`,
> `--type-*` are all powers of √φ off a 1rem base. A magic number that is not a
> φ-rung (or a documented physical constant — a 1px hairline, a 60fps frame
> budget) is a defect the overfitting audit flags. Proportion is *why* the
> surface reads as composed rather than assembled: the eye registers the
> recurring ratio even when it can't name it.

**Cross-reference:** §Typography line 519 already says "golden-ratio (√φ ≈
1.272)"; the new pillar GENERALIZES that one line to all geometry and points back
at it. The §Radii and §Spacing token tables become the substrate this pillar
governs (they already largely follow φ — this names the law they obey, and makes
deviations auditable). KISS: one paragraph, no new token tables — it *names the
existing one's law*.

---

### EDICT 4 — The canonical iOS-27 bar (Philosophy clause, NOT a new section)

**Slot-in:** ADD a single clause to the §L (Liquid Glass) intro (line 21, which
already says "It is iOS-aligned (Liquid Glass material + spring physics + dynamic
surface life)"). EXTEND that sentence rather than minting a section — the bar is
a *standard the precepts already serve*, so it belongs as a pointer, not a
duplicate spec.

> *(append to line 21)* … The canonical bar is the **iOS-27 reference set**
> (`docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`): glass-ui ships
> reference-grade demos that MATCH or BETTER every behaviour there — perfected
> transmissive warm-cream glass (NEVER grey, §3 colorful-field + defined-edge),
> visible paper-grain morphism, audacious √φ type, and the §L6 cartoon register.
> Where the reference shows a behaviour, a glass-ui demo demonstrates it at parity
> or beyond; the precepts §L1–L6 are the vocabulary, IOS27-REFERENCE is the
> acceptance bar.

**Why a clause, not a section:** the user asked design.md to "name that glass-ui
builds reference-grade canonical ios27 demos." Naming is a one-line act. The full
behaviour-set + convergence % already lives in IOS27-REFERENCE.md (T1–T17); design.md
duplicating it would be the exact bloat the KISS edict forbids. The clause makes
IOS27-REFERENCE the binding bar and lets design.md stay the *precept source*.

---

### EDICT 5 — Meatballing + liquid PERFECT in Chrome AND Safari (§L5 fourth bracket)

**Slot-in:** The §L5 a11y/bracket table (lines 146–150) is the right home for
cross-cutting non-negotiable carve-outs. ADD a fourth row — a **cross-engine
bracket** — to that table, and ADD one prose clause after the "No silent
degradation" paragraph (line 154). It sits with the a11y brackets because, like
them, it is a *mandatory substrate carve every glass/goo primitive must honor or
be incomplete*.

> *(new row in the §L5 table)*
>
> | Engine fence | Subsystem constrained | Glass-ui behavior |
> |---|---|---|
> | **WebKit / Safari parity** | Goo / metaball / liquid-merge | Meatballing uses a STATIC inline-SVG `filter:url()` goo (sRGB color-interp, never `backdrop-filter:url()` — WebKit drops it); merges are real blob↔meatball metaball necks (thin-to-waist-then-snap), NEVER naive ellipsoids; all liquid motion is compositor-only (transform/opacity/the surface's OWN `filter` blur-settle, never a per-frame `backdrop-filter` re-blur). `@supports` + PRM floors guard every channel. The same paint must land in Chromium AND WebKit — verified per band, both engines. |
>
> *(new prose clause after line 154)*
>
> **Cross-engine is a hard gate, not a nicety.** A goo/liquid primitive that
> renders in Chrome but breaks in Safari is incomplete — the same incompleteness
> as a missing a11y bracket. The fragile leg is always `backdrop-filter` (per-frame
> re-blur, `filter:url()` on a backdrop): glass-ui's goo NEVER rides the backdrop
> filter — it is a static SVG goo over compositor transforms. The acceptance proof
> is a paired π capture in BOTH engines, not a single-engine green.

**Why §L5, not a new section:** the user framed this as a "stated cross-engine
mandate." §L5 is already the home of "all three are non-negotiable" carve-outs
with the exact same posture ("a primitive that ships X without honoring all is
incomplete"). Adding the engine fence as a fourth bracket reuses the document's
established non-negotiable-carve idiom and keeps the meatball law next to the PRM
floors it shares machinery with. KISS: one table row + one clause.

---

## 2. DELTA-ASSAY — proposed edicts vs design.md CURRENT text

| Edict | design.md CURRENT | The DELTA (contradiction / gap) | BD/union waves that ENCODE or CONTRADICT |
|---|---|---|---|
| **1. Universal laws** | §L4 (107–138) splits strong/medium/**WEAK**; explicitly: "Weak tier — we don't ship these" lists arc (#7), staging (#3), secondary-action (#8); medium tier says a primitive "does not ship anticipation/follow-through." | **DIRECT CONTRADICTION.** The liquid-weight-universal law (`feedback_liquid_weight_universal`) + BD §1 law demand these be UNIVERSAL. Current text disavows exactly the principles the user elevates. The amendment retires the weak table + adds `--motion-weight`/`--motion-arc`/`--stagger-step`. | ENCODES: `BE.W-ANTICIPATE-FOLLOW` (anticipation/follow-through made real), `BD.W-GOO-MORPH`/goo-morph triumvirate (overlapping action), `W-LIQUID-ENTRANCE-GENERAL` (squish/overshoot universal). CONTRADICTS-as-written: the §L4 weak-tier paragraph is now false vs `BE.W-ANTICIPATE-FOLLOW` shipping the substrate. |
| **2. Cartoon register §L6** | §Shadows ~346 has `--shadow-cartoon-{sm,md,lg}` as INERT tokens; no motion, no register, NOT a precept; §L4 #12 "Appeal" points only at Aurora + disco-grain. | **GAP, not contradiction.** The tokens exist but carry no motion + are not promoted to the §L precept structure. The user: "elevate to a design register with motion — the punch, snap-and-settle, exaggerated squash/stretch with flowing inertia." | ENCODES: `BE.W-DOCK-JUBILANCE` (celebration/punch), `BE.W-CELEBRATE-BURST`, `BD.W-PAGE-HEADER-FOLD` (cartoon-shadow on hero). No wave CONTRADICTS; §L6 names the register these waves already gesture at. |
| **3. Proportion pillar** | Philosophy = "Four principles" (token/component/four-state/orthogonal); √φ named ONLY in §Typography (519). No geometry-wide proportion law. | **GAP.** Proportion is type-local; the user wants it a first-class precept governing radii/spacing/padding/card-width/concentric-radii. | ENCODES: `BE.W-CONCENTRIC-RADIUS` (concentric φ radii — LITERAL match), the §Radii/§Spacing φ-ladders. The pillar names the law `BE.W-CONCENTRIC-RADIUS` already obeys; overfitting-audit (`feedback_overfitting_audit`) becomes the enforcement arm. |
| **4. iOS-27 bar** | §L intro (21) says "iOS-aligned" but design.md is SELF-referential — no pointer to IOS27-REFERENCE.md; the canonical-demo bar is unnamed. | **GAP.** The bar exists on disk (IOS27-REFERENCE T1–T17, ~72% convergence) but design.md doesn't cite it as the acceptance bar. | ENCODES: the entire IOS27-REFERENCE wave set (`W-DOCK-SCROLL-FISSION`, `W-DRAWER-DETENT-GLASS`, `W-DOCK-DEEP-TRANSMIT`, etc.). The clause binds design.md → that doc. No contradiction. |
| **5. Cross-engine §L5** | §L5 has 3 a11y brackets; NO cross-engine bracket. Meatball/Safari mandate lives only in BD §1 law + scattered wave notes, NOT in design.md's precept source. | **GAP.** The user keeps flagging WebKit (`feedback` recurrences). The mandate must be in the precept source, not just the tranche plan. | ENCODES: `DockGooFilter.vue` (Safari-safe static SVG goo), `fission-bridge.css`, the goo-morph Chrome+Safari triumvirate. CONTRADICTS-as-risk: any wave that reaches for `backdrop-filter:url()` (none should; the §L5 row makes it auditable). |

**Net assay:** Edict 1 is the only DIRECT CONTRADICTION (the weak-tier table must
die); Edicts 2–5 are GAPS the amendment fills idiomatically. Every edict already
has ≥1 BD/BE wave shipping its substrate — the amendment is design.md *catching up
to what the waves already build*, which is exactly the precept-source role. No
wave is invalidated; the §L4 weak-tier prose is the single passage rendered false
by the shipped substrate and the only mandatory deletion.

---

## 3. THE AMENDMENT FOOTPRINT (KISS scorecard)

| # | Edit | Location | Net new tokens | Net new prose |
|---|---|---|---|---|
| 1 | Re-tier §L4 → Universal Cel Law | §L4 (replace 107–138) | 3 (`--motion-weight`, `--motion-arc`, `--stagger-step`) | ≈ same length as current §L4 (one table swapped for one table + knob) |
| 2 | New §L6 Technicolor Punch | after §L5 (~165) | 0 (composes existing) | ~1 precept (twin of §L1 length) |
| 3 | Proportion pillar | Philosophy (after line 15) | 0 (names existing φ ladder) | 1 paragraph |
| 4 | iOS-27 bar clause | §L intro (line 21) | 0 | 1 sentence appended |
| 5 | Cross-engine bracket | §L5 table + 1 clause (146–154) | 0 | 1 table row + 1 clause |

**Total net-new substrate: 3 tokens.** Everything else composes the extant
vocabulary. Section count: §L1–L5 → §L1–L6; Philosophy 4 → 5 pillars. No token
deleted, no recipe forked, no parallel system. The doc grows by ~one precept's
worth of text while the *posture* flips from restraint to liveliness. This is the
deft union the BD law demands.

---

## 4. CROSS-ENGINE + a11y CARVE (consolidated)

- **`--motion-weight` cascade:** PRM → 0 (kills squash-extra/overshoot/arc/stagger
  in one assignment; §L5 already zeroes overshoot — this extends the same line).
  `prefers-reduced-transparency` → untouched (motion ≠ transparency). `prefers-
  contrast: more` → cartoon-shadow opacity floors UP (ink aids legibility).
- **Cartoon-shadow travel:** compositor-safe — the offset is a token, the travel
  is a `transform` on a `::after` caster layer, NEVER an animated `box-shadow`
  (box-shadow is not GPU-composited). Safari-clean.
- **Arc (`--motion-arc`):** a `translateY` bow on the mid-frame of a move via a
  `linear()` two-stop, compositor-only. PRM → 0 amplitude (straight path).
- **Meatball (§L5 row):** static inline-SVG goo, sRGB interp, no `backdrop-
  filter:url()`, real metaball necks, `@supports` + PRM floors, paired-engine π
  proof. (The existing `DockGooFilter.vue` already satisfies this; §L5 names the
  law it obeys.)

---

## 5. WHY LENS C (the audacious-cartoon-punch posture) IS THE RIGHT FRAME

The other lenses will optimize for fidelity (lens A) and cross-engine/perf (lens
B). Lens C's contribution to the GOLDEN synthesis is the **posture inversion**:
design.md must stop being a restraint document. The single `--motion-weight` knob
is the audacious move that also happens to be the KISS move — it consolidates four
scattered cartoon channels into one auditable, PRM-carvable, φ-rung-defaulted
scalar, so "maximum technicolor punch" and "deft idiomatic integration" become the
SAME edit rather than opposing forces. The boldest variant is also the cleanest:
one knob to rule the cel.
