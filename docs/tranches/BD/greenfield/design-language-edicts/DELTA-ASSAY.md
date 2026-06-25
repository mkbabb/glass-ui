# DELTA-ASSAY — design-language-edicts (the DESIGN.md precept vocabulary itself)

> The golden-vs-current delta + the UNION path for the `design-language-edicts` item
> (ledger §6 row 0). Target: `DESIGN.md` (repo-root, the precept source — the animation +
> visual precept vocabulary every component/viz/page adheres to). Synthesized from `GOLDEN.md`
> + the three adversarial challenges (`challenge/1.md` correctness/KISS, `2.md` cross-engine/
> Safari, `3.md` design-fidelity/gestalt) + a LIVE inspection at HEAD on `localhost:5173`
> (foundations/intro · motion/deck · substrates/aurora, both modes, getComputedStyle).
>
> **Verdict: REFINE (not re-invent).** The GOLDEN's spine is fit — the §1 phantom-audit is
> honest, the §L4 two-tier re-tier is the right move, the gate is genuinely born-RED. But the
> challenge fleet LANDED six refutations that must be folded before the amendment can ship
> without re-committing the exact prose-lie class it was built to remove. This assay folds the
> hardenings into the UNION path. Convergence after fold: **88%** (see §5).

---

## 0. The headline delta — one paragraph

`DESIGN.md`'s §L precept block is structurally the right home; the five edicts need the
GOLDEN's two structural moves (§L4 re-tier + §L6/§L7 new precepts) and three in-place revisions
(Philosophy pillar, cartoon register, √φ radius) — BUT three of the GOLDEN's mechanisms, as
written, would plant fresh prose-lies. The UNION path KEEPS the fit moves and CORRECTS the
three broken ones using the **live** substrate verified at HEAD: (1) the cartoon punch curve is
a **raw CSS `linear()` token**, NOT a `MOTION_CURVES` row (the curve table is a closed
`"spring"|"bezier"` union — a row is an undisclosed engine change, the opposite of KISS);
(2) the cartoon shadow is reframed as opaque **cel INK** (dark-by-design, warm-tinted through
the shared `--shadow-color`≡`--foreground` ramp — verified live: dark-mode warm-cream,
light-mode dark ink, which is *correct* for a 1940s ink line and is NOT the gray-glass defect);
only the orphaned raw `rgb(0 0 0 /…)` primitives get retired; (3) the §L6 radius ladder is
honest **"φ-family-anchored, optically tuned"**, not a false "√φ ladder the live values already
sit on" (they do not — 8→12 is ×1.5, 12→16 is ×1.33, neither √φ). Plus three citation fixes:
the §L7 sRGB mechanism is inverted (WebKit *forces* sRGB, doesn't *default to linearRGB*); the
"NEVER `backdrop-filter:url()`" absolute is falsified by the live `@supports`-gated glass-refract
path (split it: forbidden for the goo merge, sanctioned-with-fence for the Chromium refraction
enhancement); and `<CartoonCard>` is a RETIRED phantom — the live carrier is `<Card
surface="cartoon">` + the `cartoon-surface` `@utility` (cards.css:178).

---

## 1. WHAT THE GOLDEN GOT RIGHT — KEEP (the fit spine)

Live + grep verified at HEAD; these survive every challenge clean and carry forward unchanged:

| Move | Verification | Disposition |
|---|---|---|
| **§1 phantom-audit** (`useSpringOrchestrator`, `offset-path` → ∅ in `src/`; demoted to forward-refs) | grep at HEAD: both ∅. The real substrate (`useStagger`/`useStaggerReveal`/`useSpringMount`/`useLiquidMorph` `--split-dx/--split-dy`/`useLiquidFlex`) all EXIST. | **KEEP** — the strongest, hardest-to-fake part. |
| **§L4 two-tier re-tier** (delete "weak — we don't ship these"; Universal / Scene-orchestrated under *Liquid-Weight-Universal*) | `DESIGN.md:130` literally ships the disclaimer + `:127` cites the phantom `useSpringOrchestrator`. The re-tier maps every Disney principle to a grep-verifiable live primitive. | **KEEP** — the headline; this is the edict-1 fix. |
| **The spring fence stays untouched** (cartoon punch NOT a `SPRING_PRESETS` row) | `springPresets.ts:59` "every overshoot ∈ [0%,10%]"; live `--spring-bouncy` peaks **1.0934 (9.3%)** — fence holds. | **KEEP** — correct call. |
| **§L6 + §L7 as PEER precepts** (proportion + cross-engine are genuinely-missing governing axes) | DESIGN.md has §L1–§L5 only; proportion is √φ for type but arbitrary px for radius; cross-engine is scattered. | **KEEP** the *structure*; CORRECT the *content* (§2). |
| **`--motion-weight` driver-scoped** (preserves the T13 carousel observer carve) | The §L2 driver-vs-observer rule is live; over-springy content-snap reads cheap. | **KEEP** — pre-empts the obvious attack. |
| **§3 colorful-field-behind-glass + defined edge is LIVE** | aurora route: GL canvas 1728×2378 (real field); dock glass `bg: color(srgb 0.35 0.30 0.25 /0.56)` warm-transmissive + `backdrop blur(9px) saturate(1.3) brightness(1.12)` + warm edge. NOT gray. | **KEEP** — the glass precept already clears the bar; the amendment only names it. |
| **The born-RED gate** | `bash golden/gate.sh` → exit 1, 8 RED lines, every grep verifies against live DESIGN.md (the disclaimer at :130, raw rgba prose at :349-359, the old counts). | **KEEP** — genuinely born-RED, not fake. EXTEND it (§4). |

---

## 2. WHAT IS WEAK / BROKEN — REFINE (the six folded refutations)

Each is a GOLDEN mechanism that, as written, plants a prose-lie or an undisclosed engine
change. The UNION correction reuses live substrate, KISS/DRY, no legacy.

### D1 — Cartoon punch is a RAW CSS `linear()` token, NOT a `MOTION_CURVES` row (challenge3 R1, TOP)

**Broken:** GOLDEN §0/§2c/§2d insist `--ease-cartoon-punch` is "a shaped `MOTION_CURVES` entry"
AND that the amendment "ships no new engine, KISS/DRY." Both cannot be true. Live
`curves.ts:35`: `MotionCurveKind = "spring" | "bezier"` — a **closed** union; every row's `js`
twin is `springTimingFunction` or `CSSCubicBezier` (both analytic). A 16-stop `linear()` with a
negative anticipation leg is neither. Adding it needs a third `MotionCurveKind` + a polyline
sampler + `twinOf` teaching — a real engine change, the exact "new engine" the GOLDEN disclaims.

**UNION fix:** `--ease-cartoon-punch` is a **raw CSS `linear()` token in `src/styles/.../tokens`**
(an `--ease-*` custom property), with **NO `MOTION_CURVES` row** — it is never sampled in JS,
only used as a CSS `animation-timing-function`/`transition-timing-function`. It has no JS twin
and needs none. This is the *truer* KISS (challenge3's option a). The §2c/§2d/§4 "MOTION_CURVES
entry" framing is corrected to "CSS `--ease-*` token, no JS twin." The spring fence (§L2,
`SPRING_PRESETS`) is untouched. The curve still does the one thing a damped spring physically
cannot — a real pre-dip below origin — verified by `golden/cartoon-punch.html` (instrument:
min −19.8px below a 90px-start origin = a true sub-zero anticipation).

### D2 — The settle TAIL must be monotone-after-peak (challenge3 R4)

**Weak:** the prototype `linear()` tail `…1.22, 1.18, 1.09, 1.02, 0.985, 0.98, 0.99, 0.997, 1`
**undershoots to 0.98** — a second zero-crossing (a settle wobble ~1.8px on the 90px travel).
That is the "pointed/springy settle" micro-texture the house explicitly RETIRED (`springPresets.ts`:
"the OLD pointed bouncy 12.6% / dock 10.7% are RETIRED"). The liquid-weight edict says weight
YES, "tight/springy" NO. A register may be loud on the *punch* but the *settle* must not
re-introduce the retired wobble.

**UNION fix:** flatten the tail to a monotone approach after the peak: `…1.22 66%, 1.12, 1.06,
1.025, 1.008, 1.001, 1` — overshoot-then-settle, NO reversal past rest. The born-RED π asserts
**tail monotonicity after the peak** (no sample dips below 1.0 after the 1.22 peak). The
anticipation pre-dip (before launch) is preserved; only the post-peak rubber is removed.

### D3 — The cartoon shadow is opaque cel INK (dark-by-design), NOT the gray-glass defect; only the orphaned raw-black primitives retire (challenge1 R3, challenge3 R2 — RECONCILED against live)

**The mis-frame (both directions):** GOLDEN §1 row 4 claims "the token is ALREADY warm
color-mix, only the prose lies." Challenge3 R2 counters "the PRIMARY `--shadow-cartoon` uses
`var(--foreground)` = black-floored, a gray-glass defect." **Live inspection resolves BOTH:**
- `shadow.css:9` declares `--shadow-cartoon: …color-mix(in srgb, var(--foreground) 8%, transparent)`.
- BUT live: `--foreground` ≡ `--shadow-color` ≡ `light-dark(hsl(24 10% 10%), hsl(30 14% 90%))`
  — the SAME ink ramp. Dark mode → warm-cream `hsl(30 14% 90%)`; light mode → near-black ink
  `hsl(24 10% 10%)`.
- A 1940s technicolor cel shadow IS a dark, opaque ink line in light mode — that is **design-
  correct**, not a defect. The BA.W-NO-GRAY warm floor governs the **glass material** (a
  transmissive layer), NOT the **cartoon ink stamp** (an opaque cast). The challenge's "black-
  floor = gray-glass" conflates the two registers.

**UNION fix (the honest middle):**
1. §2f is reframed: the cartoon shadow is **opaque cel INK** — dark-by-design, warm-TINTED
   through the shared `--shadow-color`≡`--foreground` ramp (dark-mode warm-cream, light-mode
   dark ink). It is NOT a transmissive glass layer; the warm-floor edict does not demand it be
   light. The GOLDEN's "NEVER raw black" overclaim is softened to "warm-tinted via the shared
   ink ramp; opaque ink, not glass."
2. The genuinely-orphaned raw `--shadow-cartoon-color: rgb(0 0 0 /.12)` + `…-color-soft`
   (`shadow.css:88-89`) are **retired** (NO LEGACY — grep confirms no consumer reads them; the
   rungs use `--shadow-color`). That is the only real token change.
3. §1 row 4's claim is corrected to: "the cartoon RUNG tokens (`-sm/-md/-lg`) and the primary
   `--shadow-cartoon` resolve through `--shadow-color`/`--foreground` (the shared warm-in-dark /
   ink-in-light ramp); the orphaned `*-color` raw-black primitives are retired here."
4. The carrier is `<Card surface="cartoon">` overlaying the `cartoon-surface` `@utility`
   (`cards.css:178`) — **NOT** the retired `<CartoonCard>` / `.glass-cartoon` (both removed at
   C.W5/Q.W3; cards.css:2-4,169 documents the retirement). §2f's phantom carrier is corrected.

### D4 — The MOVING cast is a NAMED new primitive with its own born-RED gate, not a hand-wave (challenge3 R5)

**Broken:** §2f asserts the cartoon cast "travels via a `transform` on a `::after` shadow-caster
layer" — but the live cartoon shadow is a multi-offset `box-shadow` (`--shadow-cartoon-md` = 3
layered offsets); NO transformable caster layer exists (grep: only static `box-shadow:
var(--shadow-cartoon-md)`). The "moving cast" is the ONE genuinely-new mechanism and it is
hand-waved — the same phantom sin §1 condemns.

**UNION fix:** the moving cast is named as a **small new primitive the encoding wave builds** —
a `::after` (or `::before`) ink-caster pseudo-element on the `cartoon-surface` `@utility` that
paints the offset planes once (static `box-shadow` on the pseudo, NOT the host), and
`transform: translate(…)` (scaled by `--motion-weight`, opposite the gesture) animates the
pseudo — compositor-only, never an animated `box-shadow` (§L7 paint fence). It is DRY (a
pseudo on the extant `@utility`, not a forked component) and gets its own born-RED gate line +
a §L7 arm (PRM → static cast, no travel). It is presented as build-owed, not already-integrable.

### D5 — §L6 radius is "φ-FAMILY-anchored, optically tuned", not a false "√φ ladder" (challenge1 R1, challenge3 R6 — TOP of challenge1)

**Broken (arithmetically):** GOLDEN §2g claims the live radii "mostly already sit on the √φ
ladder — a derivation re-statement, not a visual break." FALSE. Live (verified):
`--radius: 0.625rem` (10px, NOT the 0.5rem the GOLDEN read from stale DESIGN.md),
`--radius-md: 6px`, `--radius-xl: 12px`, `--radius-2xl: 1rem` (16px). A true `base=4 ×√φ` ladder
is `4, 5.09, 6.47, 8.23, 10.47, 13.3` — 12 is ~15% off, 16 is ~20% off. 8→12 = ×1.5; 12→16 =
×1.33. Neither √φ nor φ. The GOLDEN's "(holds)" overrides the derivation to keep the legacy px
and CALLS the override "holds" — proportion-as-post-hoc-rationalization, which self-fails §L6's
own "a non-φ value … is a defect the overfitting audit flags."

**UNION fix (challenge1 option B, the honest hybrid — chosen over option A because the live
radii are load-bearing across the whole component set and a wholesale 12→10.5/16→13.3 break is
out of scope for a precept-naming wave):** §L6 names the radius axis **"φ-family-anchored,
optically tuned"**: the small rungs (`--radius-xs/-sm/-md` = 4/4/6) sit in the √φ region; the
larger rungs (`--radius-xl: 12`, `--radius-2xl: 16`) are declared **documented optical/hit-
target anchors** (the same carve §L6 already grants the 1px hairline), NOT "on the ladder." The
**concentric rule** (`r_inner = r_outer − gap`) is the real, enforceable proportion law and is
KEPT. The §2g derivation column is deleted (no fabricated "≈"); `--radius` is corrected to the
live `0.625rem`. NO false ladder; the values that ARE anchors are *documented* anchors, so they
stop being self-flagged defects.

### D6 — §L7 cross-engine: fix the inverted sRGB mechanism + split the `backdrop-filter:url()` rule (challenge2 R1+R2, the cross-engine TOP)

**Broken (two factual inversions against the live tree):**
1. **sRGB rationale inverted.** GOLDEN §L7: "WebKit defaults to linearRGB and blows the
   threshold edge." Live `WatercolorDot.vue:150-153`: "Safari renders SVG filters in sRGB
   **regardless of** `color-interpolation-filters` (a known WebKit limitation)." WebKit does NOT
   default to linearRGB; it FORCES sRGB. The `sRGB` declaration is a correct *prescription*
   (Chrome/FF match Safari's forced-sRGB neck instead of diverging into linearRGB-lighten) but
   the GOLDEN's stated *mechanism* is backwards — a fresh engine-behavior phantom.
2. **"NEVER `backdrop-filter:url()`" is absolute-false.** Live `useGlassRenderer.ts:203` ships
   `el.style.backdropFilter = url(#${id}) blur(…) saturate(1.6) brightness(1.05)`,
   `@supports`-gated (`glass-refract.css:106`, `surfaces.css:311`) with an un-gated blur base for
   WebKit. An absolute "NEVER" makes the live glass-refract path born-LEGACY on day one — the
   exact NO-LEGACY sin.

**UNION fix:**
1. Rewrite the §L7 sRGB clause to the CORRECT mechanism, citing the source of truth:
   "WebKit renders SVG-filter compositing in sRGB *regardless of* the `color-interpolation-
   filters` attribute (the `WatercolorDot.vue` note); declare `sRGB` so Chrome/FF MATCH Safari's
   forced-sRGB neck rather than diverging into the linearRGB-lighten mismatch (the goo-filter
   README bug-136418)." Acknowledge the decorative-mark `linearRGB` exception
   (`WatercolorDot.vue:176` deliberately sets linearRGB) so the precept does not read as a
   blanket law the tree already violates.
2. SPLIT the `backdrop-filter:url()` rule into two:
   - **Forbidden:** `backdrop-filter: url(#goo)` as the metaball-MERGE mechanism (the goo is a
     normal `filter` on the surface's own layer; WebKit bug 245510).
   - **Sanctioned-with-fence:** `@supports (backdrop-filter: url(#…))`-gated refraction
     ENHANCEMENTS (the `glass-refract` lens) are permitted IFF they ship an un-gated blur base
     as the WebKit floor — the enhancement is a Chromium bonus, never the legibility-load-
     bearing layer. This makes the live `useGlassRenderer`/`glass-refract` path conformant, not
     instant-legacy.

### D7 (folded into D6's gate) — §L7 needs a paired-engine born-RED gate + a measurable waist metric (challenge2 R1/R5, challenge3 R3)

**Weak:** §L7 is the headline cross-engine edict yet `gate.sh` has ZERO cross-engine assertions
(`grep -c "WebKit|Safari|sRGB|backdrop|goo" gate.sh` → 0); the de-risk artifact
(`cartoon-punch-verified.png`) is single-engine; and "real metaball waist" has no measurable
line (an encoder could ship two never-fusing `feGaussianBlur` circles and pass every string-grep).
The GOLDEN's own §L7 says "the acceptance proof is a paired-engine π capture, never a
single-engine green" — and then ships a single-engine green.

**UNION fix:** the WAVE-AMENDMENT's born-RED gate is a TWO-FILE gate: (1) the doc-string
`gate.sh` (extended with the corrected token/prose greps), AND (2) a `gate-engine.mjs` — a
Playwright **Chromium AND WebKit** paired-π arm asserting: (i) the `--ease-cartoon-punch`
surface shows the sub-zero anticipation dip + monotone-after-peak settle in BOTH engines; (ii)
the goo merged-waist alpha cross-section stays above threshold for ≥N px (a connected neck) in
BOTH engines — RED if the two shapes are alpha-disconnected at any merge frame (the naive-
ellipsoid signature). The "see §7" dangling pointer is fixed (cite the real artifact path +
add the WebKit capture).

---

## 3. THE UNION PATH (deft integration — how DESIGN.md evolves toward the GOLDEN)

KISS/DRY, reuse extant primitives, no dual-path, no legacy. The amendment is **precept-naming
over live substrate** — it ships almost no new engine (one small ink-caster pseudo for D4 + one
raw `--ease-*` token for D1; everything else is doc + the orphaned-token retirement).

1. **Philosophy** — add the FIFTH pillar (proportion + iOS-27 canon), "Four → Five principles".
   *(GOLDEN §2a, unchanged — survives clean.)*
2. **§L preamble** — "Five → Seven precepts" (grows by §L6 + §L7); name the IOS27-REFERENCE.md
   T1–T17 bar as the measured floor. *(GOLDEN §2b, unchanged.)*
3. **§L2** — name the cartoon curve's home as a **CSS `--ease-*` token** (D1 correction), not a
   spring. *(GOLDEN §2c, corrected.)*
4. **§Easing** — add `--ease-cartoon-punch` as a raw `linear()` value with the **monotone-after-
   peak tail** (D1+D2), explicitly "no JS twin, not a `MOTION_CURVES` row."
5. **§L4** — REPLACE the three-tier strong/medium/weak body with the two-tier Universal /
   Scene-orchestrated model under *Liquid-Weight-Universal*; `--motion-weight` driver-scoped;
   every principle cites a live primitive; delete the disclaimer + the phantom
   `useSpringOrchestrator` citation. *(GOLDEN §2e — the headline, survives clean.)*
6. **§Shadows** — elevate "Cartoon shadows" to the **cel-INK register** (D3): warm-tinted via
   the shared `--shadow-color`/`--foreground` ramp (opaque ink, not glass; dark-mode cream,
   light-mode ink); the MOVING cast is a **named build-owed ink-caster pseudo** on the
   `cartoon-surface` `@utility` (D4); the carrier is `<Card surface="cartoon">` (not the retired
   `<CartoonCard>`); retire the orphaned raw `*-color` primitives.
7. **§L6 (NEW)** — Aristotelian Proportion as **"φ-family-anchored, optically tuned"** (D5): type
   is √φ (the proven exemplar), radius is φ-region-small + documented optical anchors (12/16),
   the **concentric rule** is the enforceable law; `--radius` corrected to `0.625rem`; the false
   √φ-ladder derivation column deleted.
8. **§L7 (NEW)** — The Cross-Engine Floor (D6): corrected sRGB mechanism (WebKit forces sRGB;
   cite WatercolorDot + goo-filter README); the SPLIT `backdrop-filter:url()` rule (forbidden for
   goo-merge, sanctioned-`@supports`-gated for glass-refract); the paint-cost fence; the
   measurable waist metric; the paired-engine π acceptance bar.
9. **Cross-ref housekeeping** — §L5 cross-references + the line-164 "name which tier" sentence
   gain §L6 + §L7. *(GOLDEN §2h tail, unchanged.)*

**Reused live primitives (no fork):** `useStagger`/`useStaggerReveal`/`useSpringMount` (follow-
through/overlap), `useLiquidFlex` (velocity-coupled squish), `useLiquidMorph` `--split-dx/-dy` +
`useLiquidReveal` (the real arc), `--scale-press`+`--spring-snappy` (squash), the
`cartoon-surface` `@utility` + `<Card surface="cartoon">` (the register carrier), `--shadow-
color`/`--shadow-cartoon-*` (the ink), `DockGooFilter`/`GlassGooFilter`/`fission-bridge.css`
(the sRGB metaball), `glass-refract.css`/`useGlassRenderer` (the `@supports`-gated refraction),
`--dock-stagger-step` (renamed/derived from a global `--stagger-step` per D-note below).

**The one token-rename to flag (NO LEGACY):** the live stagger token is `--dock-stagger-step`
(`shell.css:53`, dock-scoped). The GOLDEN's universal cascade names a global `--stagger-step`.
The encoding wave derives the dock token FROM the global (one token, dock reads the global) and
authors each cartoon channel (squish/overshoot/anticipation/arc/stagger) as
`calc(base * var(--motion-weight))` at its token home so the PRM-zero cascade actually
propagates (challenge2 R4 — the cascade is a spec obligation the channel-authors own, not a free
CSS property).

---

## 4. WHAT CARRIES THE EDICTS DOWNSTREAM (the ally waves — no duplicative work)

DESIGN.md is the precept SOURCE; these existing union/BE waves are the ENCODERS that already
implement pieces of the edicts. The amendment does NOT duplicate them — it gives them a precept
to cite. Reconciled against the live tree (paths corrected vs the GOLDEN's §4):

| Edict piece | Existing encoder wave (resolved path) | Relation |
|---|---|---|
| Anticipation pre-dip + follow-through | `BE/waves/BE.W-ANTICIPATE-FOLLOW.md` (ships `useAnticipate` — the pre-dip leg) | the §L4 anticipation/follow-through substrate; the §L2 cartoon-curve sibling |
| Cartoon celebration burst (Appeal/Exaggeration) | `BE/waves/BE.W-CELEBRATE-BURST.md` (`useCelebrationBurst`) | the §L4 Appeal exemplar |
| Concentric radius (§L6 rule) | `BD/union/waves/BD.W-CONCENTRIC-RADIUS.md` **and** `BE/waves/BE.W-CONCENTRIC-RADIUS.md` | the §L6 concentric law encoder (cite the resolvable path, not a top-level `BD.W-CONCENTRIC-RADIUS.md` which does not exist — challenge1 R2) |
| Universal squish/anticipation entrance | ledger row D `liquid-entrance` (the `W-LIQUID-ENTRANCE-GENERAL` greenfield, not yet a union wave) | the §L4 Universal-tier exemplar |
| Meatball waist (T2, §L7) | `BD/union/waves/W-DOCK-SCROLL-FISSION.md` + `W-GOO-CAROUSEL-DECK.md` | the §L7 metaball-merge encoder |
| Global iOS-27 motion calibration | `BD/union/waves/W-ANIM-IOS27-TUNE.md` | the §L2/§L4 motion-register encoder (touches design.md) |
| Warm-no-gray glass (§3 field) | `BD/union/waves/W-GLASS-ABROGATE-GRAY.md` | the §3 glass-material encoder (touches design.md) |
| Full-design-language demo congruence | `BD/union/waves/BD.W-DESIGN-LANGUAGE-CONGRUENCE.md` | wires paper/type/golden onto DEMO surfaces — DOWNSTREAM of the precept; does NOT amend DESIGN.md |
| Cross-tranche doc/disposition canon | `BD/union/waves/BD.W-PRECEPT-CANON.md` | zero-pixel doc/disposition layer — NOT a DESIGN.md precept amendment |

**The gap (why a NEW wave is needed):** NONE of the 116 union waves AMENDS `DESIGN.md`'s precept
vocabulary itself — the §L4 re-tier, the cartoon-curve token, the §L6/§L7 new precepts, the
cel-ink register, the φ-radius reframe. `W-ANIM-IOS27-TUNE` and `W-GLASS-ABROGATE-GRAY` touch
design.md but only in their narrow register (motion calibration / glass tokens), not the precept
STRUCTURE. `BD.W-DESIGN-LANGUAGE-CONGRUENCE` is demo-surface-facing; `BD.W-PRECEPT-CANON` is a
zero-pixel disposition layer. So the WAVE-AMENDMENT authors **one new wave**
(`BD.W-DESIGN-PRECEPT-AMENDMENT`) that owns the DESIGN.md amendment + the two-file born-RED gate,
and AUGMENTS the two design.md-touching waves with a cite-the-precept reference. See
`WAVE-AMENDMENT.md`.

---

## 5. CONVERGENCE — 88%

| Dimension | State | %  |
|---|---|---|
| §1 phantom-audit (honesty foundation) | fit, KEEP | 100 |
| §L4 two-tier re-tier (edict 1) | fit, KEEP | 100 |
| Cartoon curve mechanism (edict 2 motion) | corrected D1 (raw `--ease-*`, no MOTION_CURVES row) + D2 (monotone tail) | 90 |
| Cartoon shadow register (edict 2 visual) | corrected D3 (cel-ink reframe) + D4 (named caster) | 80 |
| §L6 proportion (edict 3) | corrected D5 (φ-anchored, not false ladder) | 85 |
| iOS-27 canon (edict 4) | fit, KEEP | 100 |
| §L7 cross-engine (edict 5) | corrected D6 (sRGB mechanism + split rule) + D7 (paired gate) | 75 |
| Gate (born-RED honesty) | fit doc-gate + owed paired-engine arm | 80 |

The 12% remaining is the build-time work the WAVE-AMENDMENT owns: authoring the corrected
DESIGN.md prose, the `gate-engine.mjs` paired-engine arm, the ink-caster pseudo primitive, and
the `--motion-weight`/`--stagger-step` channel-authoring. The DESIGN of the amendment is
convergent at the precept-vocabulary level; the remaining delta is mechanical encode-time, not
architectural.
