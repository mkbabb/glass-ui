# AY.W-LIQUID — the iOS-27 Siri liquid-glass facility: amorphous flex + squish as a SHARED primitive

**State:** OPEN (user-directed 2026-06-09: "audit of the new siri component, which is an amorphous
glass blob that flexes and squishes — our blobs and docks and other components should have this
facility") · **Repo:** glass-ui · **Band:** A (component perfection)
**Type:** spec-hardened plan → NARROW reference-capture arm → facility impl. The broad §2 SOTA lane
of the original draft is RE-SCOPED per `research-necessity/liquid-glass.md` (verdict MIXED: the
engine is ~85% divinable; the corpus contains ZERO Siri facets — `grep -io siri` over the 32-facet
corpus → 0 — and is WWDC25-era). The parameter scaffold is now COMPILED into this spec (§2); the
research arm (§7, the HC-liquid-research lane) arrives to the drafted table and fills ONLY the
three named blanks.
**Depends on:** W-COHERE (the set-cohesion contract the facility must join), W-GOD1 (the carved
SFCs are the integration sites), the W52/W53 axes (the shipped liquid-glass + elastic-stretch
precedents this EXTENDS, not duplicates).
**Hardened:** 2026-06-09 (HC-liquid-spec) from `research-necessity/liquid-glass.md` §4 +
`research-necessity/tabs-slider.md` §4 — every scaffold row file:line-grounded at HEAD.

## §1 — The target (what "Siri-like" means, concretely)

The iOS-26/27 Siri orb register: an amorphous glass volume that
- **flexes** — the silhouette deforms toward input (pointer/touch/focus), a soft directional lean
  with surface-tension resistance, not a rigid translate;
- **squishes** — volume-preserving deformation on press/impact (the scale X/Y reciprocal — the
  AX.W53 `--tab-indicator-max-stretch` precedent generalized), released on a spring;
- stays GLASS throughout — the refraction/specular/edge-gleam reads as one continuous material
  while deforming (the W52 liquid-glass model: thin edge catch-light over a diffuse bloom).

glass-ui already owns the PIECES: the blob's membrane wobble + centroid lean (mood), the
SegmentedTabs elastic indicator (volume-preserving stretch, capped low, snappy release), the W52
specular/edge model, the dock morph spring. What does NOT exist is the SHARED facility — each
component hand-rolls its own deformation; none reads as the Siri-register material response.

## §2 — The pre-answered parameter scaffold (compiled; NO research required for any row)

The facility implements THIS table. The research arm (§7) may RE-ANCHOR a band; it may not
re-derive the model. Every row is corpus- or code-grounded:

1. **Stretch form — tanh-SATURATED, not clamped.** The DOM stretch is
   `1 + tanh(|v|·k)·(cap − 1)`, NOT the corpus clamp form `1 + clamp(|v|·k, 0, max)`
   (dock-liquidglass-README §7). The blob LIVE-LEARNED past the clamp:
   `src/components/custom/goo-blob/shaders/metaball.frag.ts:198-215` records why (an unbounded
   spring velocity hits O(5–8)/s on a fast flick → a violent taffy-pull; a clamp plateaus
   abruptly; `tanh` stays smooth into the cap, so the fastest flick reads as a lively bounce,
   never a rubber-band snap — AX.W46 D5). The shader's `k = 1.6` is in its own normalized
   speed-units; the DOM `k` re-derives in the facility's velocity units with the SAME criterion
   (near-linear for a slow travel, saturating only the fast one).
2. **Caps — `--liquid-max-stretch: 1.08` default, tune band `1.06–1.10`.** Straight lift from
   `--tab-indicator-max-stretch` (`src/styles/tokens.css:1503`) + W53 §HandOff + corpus facet 18
   (the iOS-26.2-dialed-down restraint, ≤1.10). Press floor: `--scale-press: 0.96` /
   `--scale-press-btn` (`tokens.css:1476,1491`). The blob's free-body ceiling stays its own
   (`1 + uStretch`, tanh-saturated, `stretch: 0.5` at `goo-blob/types.ts:317`) — the DOM caps
   bind DOM bodies.
3. **Cap read — the cascade-read pattern, lifted verbatim.** `useTabIndicator.ts:181-183`
   resolves the cap via `getComputedStyle` per activation (per-instance retune, token-first,
   default in code). `--liquid-max-stretch` adopts this idiom exactly.
4. **Release clock — velocity-driven; the 60 ms second timer DIES.** `useTabIndicator.ts:143,
   186-194` (cleared at `:241`) releases `--stretch` on a `setTimeout(…, 60)` — the exact
   "no separate timer" flag in the synthesis (§1.1 W06: "the deform decays exactly as the spring
   settles") and a W-MOTION2 one-clock violation. The facility drives stretch from the spring's
   OWN live velocity (the seam exists: `useSpring`'s `SpringRef.velocity`;
   `useBlobPointer.ts:132` already consumes it), so release IS settle. Note the
   `useTabIndicator.ts:18-21` header already says "velocity-driven" while the impl is
   distance-driven (`:175-176`) — the re-point makes that doc TRUE instead of syncing it down.
5. **Spring/response bands — no new spring minted.** Press 0.25/ζ 0.7
   (`src/composables/motion/useSpringPress.ts:69-70`), dock morph 0.32/ζ 0.7
   (`dock/composables/dockMorphContext.ts:39`), glide/control register `--spring-snappy`
   (ζ≈0.85). The facility consumes the W-MOTION2 table; the engine is the house
   `useSpring`/`SpringProgress` kernel — never a parallel clock.
6. **Flex band — seeded from the blob's ONLY live-ratified lean.** Drive magnitude
   `pointerStrength: 0.18` (`goo-blob/types.ts:316`); the valence-signed, arousal-FLATTENED
   attraction `lerp(-0.2, 0.6, v)·(0.7 + 0.15·a)` (`useBlobMood.ts:74-80` — the AX.W46 D5
   anti-lunge re-solve); falloff 0.5 (`metaball.frag.ts:318-326` — coherence, not drama);
   banded by `CENTROID_SHIFT_MIN..MAX` (`tests-visual/blob-render.spec.ts:~572`, the "blob
   LEANS" π spec). Gate 1 is BORN against these numbers; §7's arm may re-anchor them.
7. **Squish-axis rules.** Stretch ALONG the travel/velocity axis, EXACT reciprocal
   perpendicular (`SegmentedTabs.vue:479` `scale: var(--stretch) calc(1 / var(--stretch))`;
   `metaball.frag.ts:185-216`, the area-preserving `D·R·uv` linear map). The facility API
   carries a dimensionality axis — `axis: "both" | "x-only"` — for 1-D bodies: the underline
   hairline squishes X-only (`SegmentedTabs.vue:637` `scale: var(--stretch) 1`; a 2 px rule
   cannot meaningfully compress Y).
8. **PRM — copy-down, CENTRALIZED.** Under `prefers-reduced-motion: reduce` the engine never
   animates transforms; flex/squish collapse to the static state change (opacity/tier only).
   The facility owns ONE live-monitored matchMedia and ABSORBS the per-consumer hand-rolls
   (`useTabIndicator.ts:145-150` local matchMedia; `dockMorphContext.ts` `respectReducedMotion`;
   the blob substrate's rAF freeze stays the blob's — the substrate owns its PRM).
9. **Press entry — pointer-only.** `useSpringPress.ts` header doctrine + corpus "never animate
   keyboard-initiated actions": the squish entry gates on pointer type; keyboard activation
   takes the static state change. Settled; not a research question.
10. **Material continuity — mechanism SETTLED, bands open.** The W52 specular is painted IN the
    element (box-relative `--specular-x/y`), so a raster `scale(sx, 1/sx)` carries it exactly;
    shader surfaces track by construction (SDF-normal lighting). The one watch item is
    corner-radius ellipse distortion under non-uniform scale — sub-perceptual at the ≤1.08 cap
    (the W53 indicator already ships it uncontested). Whether Apple does anything BEYOND this at
    the silhouette level is §7 blank 1.

## §3 — Objective (the facility)

### §3.0 — Name resolution (the three-name substrate collision, RESOLVED)

Three names point at one substrate family at HEAD — `useLiquidFlex` (this wave's draft),
`useLiquidMorph` (AX.W42, **un-landed**: `AX/PROGRESS.md:88` holds W42 at `planned`; no such file
in `src/`), and `useSquish` (the AX.W53 §"vs W23" future-substrate flag). **ONE name ships:
`useLiquidFlex`.** The fold, recorded:

- **`useSquish` is RETIRED-BY-FOLD, never minted.** Its whole domain (the shared
  volume-preserving squish atom: tab-indicator + carousel-indicator + dock-press) is an AXIS of
  `useLiquidFlex`, not a sibling composable. W53's flag resolves HERE — W53 was the first
  consumer of the facility this wave mints.
- **`useLiquidMorph` (AX.W42) is the DISJOINT lifecycle, not a competitor.** Morph = reshape
  BETWEEN two layout states (`--morph-t` 0→1, FLIP, `MorphGroup`); flex = transient deformation
  AROUND ONE rest state (rest → flex → squish → release, always returning to t=0). The
  disjunction is structural, not nominal. Both families ride the SAME house spring kernel
  (`useSpring`/`SpringProgress`) and the same §6-doctrine registers — no third bespoke
  deformation engine exists or may be minted. IF W42 ever builds, its spec RE-GROUNDS against
  this wave first: the deformation half of its family is taken; W42 keeps only the
  morph-between-states half.
- The shipped-voice hazard at `docs/tranches/AX/research/dock-liquidglass-README.md:3`
  (presenting `useLiquidMorph` as a landed substrate) is re-grounded by this hardening pass —
  one-line fix, landed alongside this spec edit.

### §3.1 — The facility

ONE shared primitive — `useLiquidFlex` (composable) + the `--liquid-*` token cohort — that any
component composes:

1. **The deformation engine:** a small state machine over (rest → flex-toward-input → squish-on-
   press → spring-release), driving CSS transform pairs (volume-preserving `scale(sx, 1/sx)` per
   §2.7, directional skew/translate within the §2.6 band) on the component's deformation root.
   Stretch is velocity-driven, tanh-saturated, capped per §2.1-2.3; release rides the spring's
   own settle per §2.4; springs ride the §2.5 registers — no second clock, no second matchMedia.
2. **The material-continuity contract:** the deforming root carries the glass tier + specular so
   the material deforms as ONE (the W52 axes read on the same element the transform deforms —
   §2.10's mechanism).
3. **The consumers (≥3, real):**
   - the BLOB — the mood lean upgraded to the flex model; the click squish becomes the shared
     squish (the W-BLOB3 interaction DELTA's bounce);
   - the DOCK — held/press states CONSUME the facility (the `dock-controls.css` press register
     re-points onto the `--liquid-*` squish — a consumption, NOT a dock-side research item);
   - SegmentedTabs — the bespoke stretch writer DELETES onto the facility.
     `useTabIndicator.ts` SURVIVES as the measure-path owner (single/multi slider styles, RO
     lifecycle) and consumes `useLiquidFlex` for the squish; the `--stretch` writer, the cap
     read, and the PRM gate move INTO the facility. Token renamed
     `--tab-indicator-max-stretch` → `--liquid-max-stretch` (clean break, no alias — the
     no-backwards-compat precept).
4. **The multi-select exemption is a CONTRACT, preserved + recorded.**
   `useTabIndicator.ts:138-140,152-157` early-returns under multi-select (N indicators pop
   in/out; nothing travels, so nothing squishes). The facility preserves the exemption
   explicitly, so gate 3's "behaviour-preserving" is checkable rather than vibes.
5. **PRM:** per §2.8 — the engine never animates transforms under reduce.

## §4 — HARD GATE

1. **FLEX-RESPONDS π readback (born-RED):** pointer-proximity drive on the blob demo — the
   silhouette centroid/extent readback deforms toward the pointer within the §2.6 band
   (`pointerStrength 0.18` seed; the `CENTROID_SHIFT_MIN..MAX` floor∧ceiling), and returns to
   rest on a measured spring (response/ζ within the §2.5 bands). The band is born against §2.6
   and re-anchored ONLY if §7's arm moves it.
2. **VOLUME-PRESERVED (with the 1-D degenerate exemption):** during squish, measured
   `sx · sy ≈ 1` within tolerance on every frame — for `axis: "both"` bodies ONLY. The 1-D
   underline body (`SegmentedTabs.vue:637`, X-only) instead asserts `sy === 1` exactly; the
   volume invariant binds 2-D bodies (else the deletion-proof REDs on underline by
   construction).
3. **ONE-FACILITY deletion-proof + the GATE-COUPLING clause (DECIDED: lockstep gate
   RE-STATEMENT, not an adapter).** SegmentedTabs' bespoke stretch writer is DELETED, re-pointed
   to the shared engine. A clean-break re-point REDs FOUR `scripts/proof-tabs-unified.mjs`
   clauses (`:171-190`): (a) the `--tab-indicator-max-stretch` token mint ≤1.10 in `tokens.css`
   (`:171-179`), (b) the reciprocal `scale:` literal in the SFC (`:181-186`), (c)
   `setProperty("--stretch")` AND the literal `--tab-indicator-max-stretch` asserted INSIDE
   `useTabIndicator.ts` (`:187-191`), (d) the PRM grep in that same composable (`:193-196`). So
   the draft's "`proof:tabs-unified` stays green" is true only with a LOCKSTEP RE-STATEMENT:
   the SAME change edits `proof-tabs-unified.mjs` §5 to the facility names —
   `--liquid-max-stretch` minted ≤1.10; the `setProperty`/cascade-read/PRM asserts re-pointed at
   the facility file (with `useTabIndicator.ts` asserted to CALL it); the SFC reciprocal literal
   unchanged. A thin adapter that keeps the literal token read + writer in `useTabIndicator.ts`
   purely to keep the old asserts green is REJECTED — it would preserve a dead token name
   against the no-backwards-compat rule and is gate-appeasement (the chronic-deferral Class-G
   counterfeit-close shape). `scripts/proof-tabs-unified.mjs` is therefore IN this wave's
   file-bounds (§5).
4. **MATERIAL-CONTINUITY:** the specular/edge-gleam tracks the deforming silhouette (a π sample
   of the gleam position vs the deformed bounds at mid-squish — satisfiable from §2.10's shipped
   mechanics, no Apple reference needed).
5. **PRM + DELTA + EXEMPTIONS:** no transform animation under reduce; the multi-select
   early-return preserved (asserted, per §3.1.4); captured light+dark flex/squish frame series
   per the cardinal protocol (real surface, IHDR-true dimensions).

## §5 — File-bounds

`src/composables/motion/useLiquidFlex.ts` (NEW) · `src/styles/tokens.css` (the `--liquid-*`
cohort; `--tab-indicator-max-stretch` retired) · `src/components/custom/tabs/SegmentedTabs.vue` +
`composables/useTabIndicator.ts` (the re-point) · `src/components/custom/goo-blob/` composables
(the flex-model consume) · `src/styles/dock-controls.css` (the press-register re-point) ·
`scripts/proof-tabs-unified.mjs` (the §4.3 lockstep re-statement) · the new facility proof script
+ `package.json` entry · CLAUDE.md (the SegmentedTabs squish glance-line re-sync) ·
`docs/tranches/AX/research/dock-liquidglass-README.md` (the §3.0 one-liner — landed with this
hardening).

## §6 — Scope fence

- EXTENDS W52 (specular/edge material) + W53 (elastic stretch) — does not re-litigate either; the
  shipped tokens stay the vocabulary.
- NOT a physics engine — capped parametric deformation bands, not soft-body simulation (KISS; the
  Siri register is a TUNED parametric response).
- NOT a second SOTA sweep — §2 is pre-answered; re-researching the squish math, caps, spring
  registers, engine architecture, group seam, PRM, or the material-continuity mechanism is churn
  against facets 0/4/5/14/16/17/18/26-30 and the shipped code.
- The aurora/fourier substrates are out of scope (they are fields, not bodies); constellation's
  warp already has its own spring model (W-CON2).
- The W42 morph family is out of scope per §3.0 — recorded disjunction, no build here.
- The segmented press-register doctrine question (snappy vs `--spring-smooth`, the raw `220` ms)
  routes to W-COHERE, not here.

## §7 — RESEARCH-ARM (the three named blanks; the HC-liquid-research lane fills them)

Re-scoped from the original §2 "dedicated SOTA lane" to a **time-boxed reference-capture arm**
(NECESSITY-MATRIX §3). The arm arrives to the §2 scaffold and fills ONLY these blanks — research
that arrives to an already-drafted parameter table is verifiable; research asked to produce the
whole model re-treads the corpus:

1. **Siri-orb reference bands** (iOS-26/27 footage / credible teardowns): observed max silhouette
   deformation %, flex onset/settle times, and silhouette-level vs transform-level deformation —
   this decides whether the DOM facility's capped scale pairs (§2.7) are a faithful transposition
   or whether a clip-path/border-radius channel is warranted. The W-AUR-PAINTERLY
   reference-anchored-bands discipline, scoped to ONE surface. (The 32-facet corpus provably
   contains zero Siri facets: `grep -io siri` → 0.)
2. **The Apple drive-signal model** — what modulates the Siri deformation (audio amplitude vs
   assistant state vs touch). Informs ONLY the web transposition mapping (pointer/press/focus)
   the blob already implements (§2.6); a few sources suffice.
3. **WWDC26 freshness delta-check** against the WWDC25-era 32-facet corpus — newly published
   Liquid Glass deformation/motion APIs (e.g. `.glassEffect` interactive-bounce parameters) that
   would supersede the inferred bands. **Carries the one glass-material rider at zero marginal
   cost:** has the multi-candidate `contrast-color()` syntax shipped (would let the W55 PE flip
   return the warm-ink pair instead of pure black)? [glass-material §5.1]

**Output contract:** band re-anchors to the §2 table (named row, old → new, source-cited);
anything beyond the three blanks is OUT of scope. The facility build re-grounds on the filled
table before its first commit.

## §8 — RESEARCH-RESULTS (HC-liquid-research, 2026-06-09 — the three blanks, filled)

Run the day after the WWDC26 keynote (June 8, 2026; sessions still publishing through June 12).
**Net: ZERO §2 re-anchors.** Every scaffold row survives contact with the reference corpus; the
research CONFIRMS the bands and resolves the one open mechanism question (§2.10 / blank 1's
silhouette-vs-transform fork) in favor of the shipped design. One additive observation (§8.1.c)
and one platform-blocked rider disposition (§8.3.b).

### §8.1 — Blank 1: Siri-orb reference bands

**a. Silhouette-level vs transform-level — ANSWERED: the Apple register has NO free soft-body
silhouette wobble.** It decomposes into three channels, each separately evidenced:

1. **Internal-flow within a near-stable silhouette** (the orb proper). The visionOS 27 Siri is
   "a giant, floating marble-like ball" — a stable sphere with internal material animation
   (Gizmodo, WWDC26-week). Every credible recreation of the Siri orb animates internal
   gradients/waves/glow inside a FIXED circular silhouette, never the boundary:
   metasidd/Orb (SwiftUI, mesh gradients + masked paths + shaders), SmoothUI `siri-orb` (web,
   "reactive wave animations and glowing effects," PRM-gated rotation), kopiro/siriwave (the
   canonical waveform replication — amplitude-driven sine superposition). The "amorphous" read
   is mostly INTERNAL flow, not boundary deformation.
2. **Container-geometry morph** (silhouette-level, but a CONTAINER width/height/corner-radius
   morph — the W42 morph-between-states family, NOT this wave's flex). iOS 27 moved Siri INTO
   the Dynamic Island (The Apple Post, 2026-06-08: the edge-glow is GONE; "a new animation
   appears directly within the Dynamic Island"; a glowing pill while processing, expanding into
   a translucent results panel). Footage-anchored Dynamic Island recreations converge on
   under-damped container springs: stiffness 400/damping 30 → ω₀=20 rad/s, ζ=0.75, settle ≈270 ms
   (cho.sh); stiffness 110/damping 12, 0.3 s → ζ≈0.57, settle ≈670 ms; the Compose recreation
   (sinasamaki) uses ζ=0.6 (width/height morph) and ζ=0.35 (the entry-squish arm, 1.5×-width
   overshoot on appear).
3. **Transform-level interactive bounce** (the control register). WWDC25 session 323 + the
   shipped `.glassEffect(.regular.interactive())`: "glass reacts to user interaction by scaling,
   bouncing, and shimmering." Apple publishes NO scale percentage; its own code register in the
   reference corpus is `.bouncy(duration: 0.35–0.4)` (≈ response 0.35–0.4 s / ζ 0.7) and
   `.spring(response: 0.3, dampingFraction: 0.6)` (conorluddy/LiquidGlassReference).

**Verdict for §2.7/§2.10:** the DOM facility's capped `scale(sx, 1/sx)` pairs ARE a faithful
transposition of channel 3 + the channel-1 restraint; a clip-path/border-radius channel is NOT
warranted for the flex facility (channel 2 is W42's fenced-out domain per §3.0/§6). §2.10's
"watch item" closes: nothing beyond transform-level happens at the control silhouette.

**b. Max silhouette deformation % — UNFILLED as a measured Apple number** (no published
quantitative teardown exists). Best inference: ≤8–10% non-uniform. The §2.2 band (1.08 default,
1.06–1.10) is CONSISTENT with the restrained register — community press-scale recreations sit
~1.05–1.15, and the iOS 26.x→27 arc DIALS DEFORMATION DOWN (NN/g legibility pushback; the iOS 27
intensity slider; the darker, "much more restrained" Siri branding vs the iOS-18 rainbow). KEEP
1.08; no re-anchor.

**c. Flex onset/settle times — CONFIRMED band.** Onset is effectively immediate (spring-driven
from input, no entry delay); settle ≈270–670 ms across the footage-anchored recreations;
Apple's own API register response 0.3–0.5 s / ζ 0.6–0.75. The house registers (§2.5: press
0.25/ζ0.7, dock morph 0.32/ζ0.7, snappy ζ≈0.85) sit INSIDE this envelope — no new spring,
confirmed. **Additive observation:** the Apple-faithful way to read "alive" WITHOUT deformation
is channel 1's internal flow — which glass-ui already owns as the W52 specular axis; §3.1.2's
material-continuity contract (specular rides the deforming root) is therefore not just
mechanically convenient but register-faithful.

### §8.2 — Blank 2: the Apple drive-signal model

**FILLED: STATE-FIRST, with audio amplitude as a modulation INSIDE the listening state.**

- **Listening** — the visual pulses with the rhythm/amplitude of the USER's speech: the iOS-18
  glow "pulse[s] with the rhythm of your speech in a pseudo-waveform" (Six Colors); the classic
  orb/waveform is amplitude-driven sine superposition (siriwave).
- **Thinking/processing** — an autonomous calm pulse, NOT audio-driven: iOS 27 shows "a glowing
  Siri icon and a 'searching' label in the Dynamic Island while Siri is processing" (Macworld
  leak, keynote-confirmed).
- **Responding** — keyed to output: the island expands into the translucent results panel; TTS
  animates the visual.
- **Touch** — the separate `.interactive()` bounce register (§8.1 channel 3), not mixed into the
  voice signal.

**Verdict for §2.6:** the web transposition (pointer proximity → flex drive; press → squish;
focus/state → tier) is a legitimate state-first mapping of the same model; the blob's
`pointerStrength 0.18` + valence-signed attraction band STANDS. Gate 1's band needs no re-anchor.
Datum for W-COHERE adjacency: the iOS 27 Siri register is DARKER and more restrained than the
iOS-18 rainbow — restraint is the direction of travel, not an artifact of glass-ui's taste.

### §8.3 — Blank 3: WWDC26 freshness delta (+ the `contrast-color()` rider)

**a. NO new Liquid Glass deformation/motion APIs at WWDC26.** The keynote (June 8) + the
"What's new in SwiftUI" session (wwdc2026/269) surface ZERO new deformation surface: the API set
remains the WWDC25 family (`.glassEffect`, `.interactive()`, `GlassEffectContainer`,
`glassEffectID`); session 269's Liquid Glass content is adoption/refinement ("apps automatically
adopt the updated Liquid Glass appearance on 2027 OS releases without code changes," toolbar
minimize-on-scroll, `appearsActive`). iOS 27's Liquid Glass changes are REFINEMENTS — headline:
a user-facing **system-wide intensity slider** ("an adjustment slider to control the intensity of
Liquid Glass," superseding the binary Clear/Tinted) — **Apple converged on exactly the one-knob
intensity model W54 shipped as `--glass-level`**; record this as external validation of the W54
mechanism. The §2 scaffold is NOT superseded. *Residual:* sessions publish through June 12 —
one cheap recheck of the design-track session list at facility-build time; nothing blocks.

**b. The multi-candidate `contrast-color()` syntax has NOT shipped.** The basic two-candidate
(black/white) form is Baseline Newly Available (April 2026: Chrome 147, Firefox 146, Safari 26.0
— matching the shipped W55 gate at `glass.css:384-404`). Candidate color lists + target contrast
ratios are CSS Color **Level 6 draft** (`drafts.csswg.org/css-color-6`), implemented by NO
engine. **Disposition:** the W55 PE flip stays anchored on the light-surface base returning
black/white; the warm-ink-pair refinement is BLOCKED-ON-PLATFORM (recheck trigger: any engine
shipping the css-color-6 candidate-list form), not a glass-ui gap. [glass-material §5.1 rider —
CLOSED for this cycle.]

### §8.4 — Sources

- The Apple Post 2026-06-08 — iOS 27 Siri animation in the Dynamic Island, edge-glow retired,
  swipe-to-ask: theapplepost.com/2026/06/08/70870/
- Gizmodo — visionOS 27 Siri "giant, floating marble-like ball":
  gizmodo.com/apples-vision-pro-will-stick-ai-siri-right-in-your-face-2000768744
- Macworld — iOS 27 leak: glowing pill + "searching" in the island, translucent results panel,
  restrained darker branding: macworld.com/article/3150626/
- TechCrunch / Tom's Guide / TechRadar WWDC26 keynote recaps (June 8–9, 2026) — Siri standalone
  app, Gemini-powered, Liquid Glass refinements only.
- Appleosophy 2026-06-08 — the iOS 27 Liquid Glass intensity slider.
- TechTimes 2026-06-08 — iOS 27 Liquid Glass refinement set (no new APIs).
- Apple WWDC25 session 323 (developer.apple.com/videos/play/wwdc2025/323/) — the
  `.interactive()` scale/bounce/shimmer register; WWDC26 session 269 (…/wwdc2026/269/) — the
  freshness check.
- conorluddy/LiquidGlassReference — Apple-register spring constants (`.bouncy(0.35–0.4)`,
  `.spring(response 0.3, dampingFraction 0.6)`).
- Dynamic Island footage-anchored recreations: cho.sh/w/9F7F85 (stiffness 400/damping 30),
  sinasamaki.com/dynamic-island/ (ζ 0.6 morph / 0.35 squish, 1.5× entry), Figma community file
  1149449035567721594.
- Orb recreations (internal-flow evidence): github.com/metasidd/Orb, smoothui.dev
  `siri-orb`, github.com/kopiro/siriwave.
- Six Colors — iOS 18 Siri glow pulses with speech rhythm (the listening drive-signal):
  sixcolors.com/post/2024/10/apple-intelligence-1-review/
- MDN `contrast-color` + drafts.csswg.org/css-color-6 + caniuse — shipped basic form (Chrome
  147/Firefox 146/Safari 26), multi-candidate = Level 6 draft, unshipped.
