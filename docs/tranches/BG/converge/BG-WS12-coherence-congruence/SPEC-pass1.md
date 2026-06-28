# BG-WS12 · Coherence · Congruence (the CAPSTONE) — SPEC pass 1

> Status: SYNTHESIS pass-1. WS12 is the LAST workstream. Its binding bar — *a fresh
> dual-engine (Chrome+Safari) both-modes capture of EVERY page reads as ONE coherent
> iOS-27 system* — is **structurally unobtainable at HEAD** (`5ddb2e94`): the whole BG
> tranche is spec-only, `git diff master..HEAD -- src/ demo/` is EMPTY, and HEAD src ==
> BD-shipped 4.2.0 == the broken surface every BG audit condemns. The pass-1 deliverable
> is therefore (a) the cross-cutting incoherence **CENSUS** against HEAD, (b) the
> **coherence-GATE born-RED on 4.2.0**, and (c) the harmonizing-wave SPECS. The binding
> congruence **capture** rides the post-integration tree (WS1–WS11 LANDED). This honest
> cap is stated up front, not discovered at close — every other WS carries the identical
> cap.

---

## 1 · GESTALT GOAL

WS1–WS11 each converged ONE domain in isolation. WS12 is the capstone that makes them
cohere into **ONE warm/weighty/liquid iOS-27 system** — glass + the glass/paper
morphism, the SAME register at the right tier on every surface, ONE spring family, ONE
motion language, congruent √φ type / color / proportion / suffusion — with **NO
per-component/per-page drift**.

The capstone has ONE governing principle (the SOTA design-system finding, overlayqa):
**visual regression detects change from a baseline; it does NOT detect deviation from
the SYSTEM SPEC.** glass-ui's ~156 per-surface π specs are regression; `proof:ba-gestalt`
is a per-surface VERDICT; **neither can see a stray spring / blur / easing / tint / hue
that coheres LOCALLY but breaks the SYSTEM.** WS12 builds the cross-SURFACE system-spec
comparison the per-surface gates structurally cannot see, and runs it BESIDE the
regression π (the SOTA "you need BOTH").

WS12 is **HARMONIZATION, not MINT** (the cardinal capstone law). It must NOT re-derive
WS1–WS11's mechanisms. Its waves are: **CENSUS** (find residual cross-cutting drift the
isolated per-WS convergence missed) + **VERIFY-THE-RECONCILE-HOLDS** (each domain
register reads consistently surface-to-surface) + **GATE** (lock no-drift) + a small set
of genuinely-un-owned cross-cutting BUILDS (the clock-fence discharge, the
glass-on-glass anti-stacking rule, the Regular/Clear variant map, the hue-at-L
root-cause predicate, the demo-backdrop congruence). Any incoherence WS12 finds that IS
owned by a WS1–WS11 wave is a cross-seam VERIFY, never a re-own; re-minting a primitive
here violates the capstone role and fails the convergence bar.

The artifact shape is the **AY FDR2-SYNTHESIS precedent** (`docs/tranches/AY/audit/
design-r2/FDR2-SYNTHESIS.md`) — a proven full-surface review: a per-surface × axis
scorecard, a §3 cross-surface incongruence list, a §4 calibration-of-the-exceptional, a
§5 feed-forward-to-owning-wave. We adopt it 1:1; we do not invent a census format.

---

## 2 · MECHANISM (idiomatic, concrete)

### 2.1 The three coherence axes (the rubric every page+component is scored against)

1. **Design-language coherence** — every surface reads the SAME glass register at the
   RIGHT tier (WS3 unified blur-peer + WS8 iOS-27 bevel/SOTA ladder), the SAME WS9
   warm-lit paper tooth + handmark voice, the SAME warm-near-neutral cartoon ink (WS3
   cast-declip). A component pulled from one page to another resolves byte-identical
   blur/tint/rim/bevel/ink.
2. **Animation congruence** — every motion speaks the motion-canon P1–P7 + the Disney-12
   vocabulary (staging/stagger · squash&stretch · follow-through/overlapping ·
   slow-in/slow-out) + ONE spring family (the 6-row `SPRING_PRESETS` after WS4's tidy) +
   liquid-weight; NO fork, NO flat-where-spring-belongs, NO jank-tail, NO rogue
   `SpringProgress`/easing/blur, ONE clock per register.
3. **Whole-system congruence** — √φ type at the right call-site rung, the section/viz
   color ramp threaded consistently, φ-proportion, the eyebrow/icon/suffusion
   one-color-event rule, ONE backdrop per context.

### 2.2 The CANONICAL SOURCES the census measures against (single source per axis)

| Axis-token | Canonical source (the ONE table) | Rogue = anything off it |
|---|---|---|
| Spring (response,ζ) | `src/composables/motion/springPresets.ts` `SPRING_PRESETS` (→6 rows post-WS4) | a `new SpringProgress({r,ζ})` whose pair is NOT a row AND not a sanctioned-driver/value-checked-allowlist entry |
| Spring clock | `--spring-<name>-duration` (scheme-spring.css, generated) | a `--spring-<name>` curve leg paired with a generic `--duration-*` |
| Blur radius | the 6-rung `--glass-blur-*-radius` calm ladder (wash1/quiet8/resting8/floating10/overlay10/dock8 post-WS3-peer) + opt-in `--glass-blur-deep` [14,20] | a raw `blur(Npx)`/`backdrop-filter` literal off the primitives |
| Easing | the §6 `--ease-*` table (scheme-motion.css) | a raw `cubic-bezier()` in a transition/animation not routed through a token |
| Tint | the 2-pair canon post-WS3 (plate `--glass-tint-*` in oklab + rim `--glass-accent-*`) | a 3rd chromatic `color-mix(in oklab, plate, hue strength)` axis |
| Cast ink | `--cartoon-ink` = warm-near-neutral (chroma ≤ ~0.05, the doc's "near-black ink stamp") | the `max(c, 0.11)` 5.5× floor → oxblood |
| Backdrop | ONE warm field per context (iOS reference: ONE backdrop per context) | the 4-register `CATEGORY_DEFAULT_BG` map + a cool preset on a warm page |
| Radius nesting | concentric — a nested radius DERIVES from its container's | an independent magic radius on a nested surface |
| Glass layering | the 3-layer iOS hierarchy (content=no-glass / chrome=glass / overlay=fills+vibrancy on glass) | a glass-tier surface nested inside another glass-tier surface (glass cannot sample glass) |

### 2.3 The GATE design — a SYSTEM-spec comparison, NOT a 4th per-surface regression

`proof:coherence-census` (`scripts/proof-coherence-census.mjs`, `[ci]` device-free) is
the cross-surface drift lock. It is **born-RED on 4.2.0** (the F1–F5 trap inverted: a
coherence gate GREEN on the broken HEAD is disqualified). Arms:

- **A1 hue-at-L root-cause predicate** (the chronic's single hole — ~10 gates assert
  chroma ≥ floor, ZERO assert hue-at-L). For every chroma-FLOORED token
  (`--cartoon-ink`, `--paper-grain-tooth` source, the dark surface-tint ink), compute
  the RESULTING OKLab hue AT its RESULTING L and assert it lands in the warm-amber band
  (H ≈ 55–80°) AND the resulting chroma is in the token's INTENDED band — catching BOTH
  the maroon over-floor (cartoon-ink C 0.11 → oxblood at L0.18) AND a metallic
  over-saturate. This is the over-correction-class catcher the gestalt loop has lacked.
- **A2 rogue-spring** — import `SPRING_PRESETS`; every `new SpringProgress`/
  `springTimingFunction` driver in `src/` resolves a NAMED row OR a sanctioned driver
  (`usePointerVelocityField`, `useDragMorph`, the named viz fences) OR a value-checked
  allowlist entry. Born-RED on DECK_SPRING `{0.5,0.85}` (stale vs smooth `{0.58,0.8}`),
  Card.vue:228 press `{0.28,0.78}` (≠ press `{0.2,0.8}`), the loose response literals.
- **A3 rogue-blur** — every `backdrop-filter`/`filter: blur()` plate resolves a
  `--glass-blur-*-radius` primitive or the deep family; a raw `blur(Npx)` off both reds.
- **A4 rogue-easing** — every transition/animation timing-function names a `--ease-*`/
  `--spring-*` token; born-RED on HandMark.vue:87 `cubic-bezier(.16,1,.3,1)` (the
  `--ease-out-expo` re-spelled).
- **A5 anti-stacking** (the NEW Apple census class) — no `glass-{tier}` surface nested
  inside another `glass-{tier}` surface in the source/render tree (glass cannot sample
  glass; the top element uses fills/vibrancy/transparency). The sanctioned exceptions
  (the WS8 chrome-over-content fidelity rungs, the dock-over-overlay 3-layer hierarchy)
  are a NAMED positive allowlist.
- **A6 concentric-radius** — a nested rounded surface's radius derives from its
  container (`containerConcentric` analogue), not an independent literal.
- **A7 clock-fence DRAINED** — `CLOCK_FENCE_PENDING == []` (WS12 discharges it; see
  W-ANIMATION-CONGRUENCE), and `proof:motion-one-clock` M3(a) is WIDENED to scan
  `animation:`/`--animate-*` shorthands (the gap that let the 4 entrance aliases drift).
- **A8 cross-engine fences** — ZERO `!!(window).chrome`/userAgent sniffing; every
  `backdrop-filter:url()` lens inside `@supports(backdrop-filter:url(...))`; ZERO
  inset-shadow fragment inside `light-dark()`; ZERO `:global(.dark)` in scoped blocks;
  `-webkit-backdrop-filter` present on every glass surface; every `light-dark()`/`oklch`/
  `contrast-color()`/`animation-timeline` behind `@supports` with an un-gated floor.
- **A9 value-check the documentary pairs** — `SPRING_DEFAULTS_ALLOWLIST` pairs and the
  `useSpringPress` JSDoc are value-checked against live source (the rot that hid
  DECK_SPRING/Card-press going stale).

The gate is **necessary-not-sufficient**: the BINDING artifact is the paint. WS12 does
NOT fork a second close gate — it **ENROLLS** per-page coherence verdicts into WS7's
`proof:ba-gestalt` roster (`bg-gestalt-roster.md`) and rides WS7's `W-PAINT-IS-THE-GATE`
tag-block. The device-free census is the cross-cutting lock; the per-surface verdict is
the regression; the close runs BOTH (the SOTA "you need both").

### 2.4 The CAPTURE instrument (how WS12 obtains its evidence pre/post integration)

The binding capture is a **dual-engine** (real Chrome + real Safari.app on AS-Tahoe per
the WS8 C-SAFARI chronic — NOT Playwright-bundled webkit for the fidelity capture)
**both-modes** capture of EVERY page, motion-ON, full field live. Because client-nav is
FROZEN at HEAD (WS1's `<Transition>` ⊥ `animation` collision stacks page corpses —
`main.children` 2→3 persists), WS12 **HARD-LOADS each route** (full page reload per
route) so each capture is corpse-free; this is the acquirable instrument until WS1 lands.
The captures fold onto the EXISTING `proof:ba-gestalt` resolves-on-disk + `isRealPng` +
`pngDimensions` + `surface-hash` mechanism (one decoder, no parallel gate).

---

## 3 · THE CROSS-CUTTING INCOHERENCE CENSUS (FDR2 §3 shape — LIVE at HEAD)

Each row: the drift · the canonical register it must thread · the OWNING wave (route, do
not re-own). Verified live at HEAD `5ddb2e94`.

| # | Cross-cutting drift (verified) | Canonical register | Owner (route) |
|---|---|---|---|
| C1 | Blur dialects: dock 9 ≠ resting 10 ≠ button/floating 13 (the "dock must be a peer" defect) | `--glass-blur-*-radius` peer ladder | **WS3** W-GLASS-BLUR-PEER · WS12 VERIFY |
| C2 | Maroon cast: `--cartoon-ink` `oklch(from fg .14..18 max(c,0.11) h)` → oxblood `oklch(0.18 0.11 56)` on EVERY cartoon-surface + both docks; contradicts DESIGN.md:398 "near-black ink stamp" | `--cartoon-ink` warm-near-neutral C ≤ ~0.05 | **WS3** C-CAST-CLIP · WS12 VERIFY + A1 predicate |
| C3 | Tint sprawl: 5–7 disjoint chromatic axes (`--glass-tint-*`/`-accent-*`/`-fill-*`/`-ambient-*`/`--accent-fill-*`/`--feedback-tone-*`/`--selection-accent-*`) | the 2-pair canon (plate + rim) | **WS3** tint-collapse · WS12 VERIFY |
| C4 | Paper metallic: `--paper-grain-tooth` `feColorMatrix saturate=0` over `feTurbulence` (anisotropic `baseFrequency .04 .09`) → "disgusting metallic" speckle | warm-lit `feDiffuseLighting` tooth | **WS9** W-PAPER-GRAIN-REAL · WS12 VERIFY |
| C5 | Clock-fence: 8 `CLOCK_FENCE_PENDING` sites — ONE `--spring-smooth` runs at 0.2s/0.3s/0.45s (three durations, one register), deferred across 5 BC waves that never executed | `--spring-<name>-duration` | **WS12** W-ANIMATION-CONGRUENCE (single owner; WS2-coord on dock legs) |
| C6 | `animation:`/`--animate-*` blind spot: the 4 entrance aliases (theme/literals.css:18-21) pair a spring linear() with a generic wall clock, UNCAUGHT by M3(a) | `--spring-<name>-duration` | **WS12** W-ANIMATION-CONGRUENCE + gate widen |
| C7 | Off-table springs: DECK_SPRING `{0.5,0.85}` STALE (smooth retuned 0.58/0.8), Card.vue:228 press `{0.28,0.78}` ≠ press register | `springPreset()`-derived | **WS12** W-ANIMATION-CONGRUENCE (un-owned) |
| C8 | Off-token easing: HandMark.vue:87 `cubic-bezier(.16,1,.3,1)` = `--ease-out-expo` re-spelled | `var(--ease-out-expo)` | **WS12** W-ANIMATION-CONGRUENCE (un-owned) + WS9-(f) coord |
| C9 | Easing-on-wrong-job: `--card-shrink-ease` rides `--ease-cartoon-punch` (anticipation dip + 1.22 overshoot) on a SCROLL SCRUB (non-monotonic) | no-overshoot on scroll-scrub | **WS4** W-12-LAWS-UNIVERSAL · WS12 VERIFY |
| C10 | 4-morph-engine vs ONE-engine-prose LIE: useLiquidMorph (462L, 0 consumers, own dead spring), useMorphField() (0 callsites, sold as "the ONE WELD"), the real WELD is `useLiquidFlex` | ONE morph engine | **WS4** W-DEAD-COMPOSABLE-CUT · WS12 VERIFY |
| C11 | FLIP-trio duplication: useLiquidReveal/useBloomUp/useDockCtaReceive hand-roll identical ElementMorph+rAF ×3; kf `flipShared` imported NEVER used | ONE `useFlip` runner | **WS4** W-FLIP-ONE · WS12 VERIFY |
| C12 | Backdrop incoherence: `CATEGORY_DEFAULT_BG` 4-register map (paper/aurora/grid/constellation) + `DockStage` OPENAI_SKY cool-cerulean preset on warm pages → blue-box-in-warm-page rectangular seam; warm-cream glass reads as a pale lozenge on a flat blue plate | ONE warm field per context | **WS12** W-PAGE-COMPONENT-AUDIT (demo-side; WS1-field-coord) |
| C13 | Goo re-fork: AppShell.vue:625 hand-rolls `<filter id="shell-dock-morph-goo">` byte-near GooFilter's unified graph | `<GooFilter id>` single mount | **WS12** W-PAGE-COMPONENT-AUDIT (WS1-coord on AppShell) |
| C14 | Scroll-reader dual-path: useScrollProgress hand-rolls its OWN `addEventListener("scroll")` (the second listener scrollReader.ts forbids), 1 consumer | `createScrollReader` ONE core | **WS12** W-ANIMATION-CONGRUENCE (un-owned DRY) |
| C15 | Mislocated demo surface: liquid-morph.css (850L, demo-only) lives in `src/styles/glass/`, inflating the lib god-module gate + polluting the identity tree | demo tree | **WS4** encapsulation (WS12-fallback) |
| C16 | God-module: api/index.ts re-grew 483→505 past the BB.W-CARVE5 floor; CLAUDE.md "ratchet ∅" claim STALE; 13 reducible >500-line files | ≤500-line colocated | **WS4** encapsulation · WS12 census-route |
| C17 | Hero over-scale: compositions/hero.vue:98 renders card H1 at `text-display-hero` (245-287px) — a poster/metric-peg rung on a card title | nearest φ-ladder token | **WS1**/§L6 · WS12 VERIFY (call-site, not systemic) |
| C18 | V↔H mode contradiction: morph-showcase declares crossfade DEAD while AppShell ships VT-crossfade DEFAULT | teardrop-everywhere | **WS2** W-VH-MORPH-IN-DOCK · WS12 VERIFY |
| C19 | VT Chrome-only: `startViewTransition` no-ops on Safari → page-transition/shell-morph/category-switch language structurally DIFFERENT across engines (a congruence break by construction) | a shared CSS-driven transition congruent on both engines | **WS1**-coord · WS12 cross-engine VERIFY |
| C20 | Anti-stacking UN-GATED: no rule forbids a glass-tier surface nested in another (glass menu-row on glass card, glass button on glass panel) | 3-layer iOS hierarchy | **WS12** W-DESIGN-LANGUAGE-UNIFY (NEW build) |
| C21 | Regular/Clear un-mapped: no canon for which surface picks Regular (legibility-adaptive) vs Clear (high-transparency + required dimming) | the variant map | **WS12** W-GLASS-PAPER-CONGRUENCE (NEW codify) |

**§4 calibration-of-the-exceptional (do NOT "harmonize" these — they are CORRECT):**
- The WS8 chrome(`uMetalFidelity` 1.0 full-drapery) ≠ content(≤0.6 sheen / opaque-fall)
  fidelity rungs are a SANCTIONED material divergence (a11y necessity: content over a
  refracting ridge FAILS 4.5 dark — 4.10/4.04 body, 2.11/2.08 muted). WS12 records
  chrome-glass ≠ content-glass as INTENDED, reads it as one system at two tiers.
- `--surface-tint-*` is `in srgb` (brand-overlay); the glass-tint axis is `in oklab`
  (perceptual) — TWO correct paths (design-idioms §9). `cn` over tailwind-merge;
  `.focus-ring` over inline ring; ConfiguratorRow ≠ LabeledField. A sweep that "fixes"
  these to one form is a documented anti-pattern — cited so the prototype fleet never
  proposes it.
- The motion bounce ceiling stays congruent with Apple's ≤0.4 "may feel too exaggerated"
  cap (bouncy ζ0.6 ≈ bounce 0.30 is the loudest, correctly under). The "quick" read is
  the spring's EARLY arrival (~100-120ms 90%-travel), NOT the 2%-settle clock — do NOT
  truncate snappy (re-introduces W-GLASS-CAL tail-jank).

---

## 4 · FILES TOUCHED

**New (WS12-owned):**
- `scripts/proof-coherence-census.mjs` — the system-spec gate (§2.3 A1–A9), `[ci]`,
  born-RED on 4.2.0.
- `docs/tranches/BG/audit/coherence/WS12-CENSUS.md` — the FDR2-shape artifact (scorecard
  + §3 incongruence list + §4 calibration + §5 feed-forward routing table).
- `docs/tranches/BG/audit/coherence/regular-clear-map.md` — the Regular/Clear variant map
  + the 3-layer glass hierarchy + anti-stacking allowlist.
- `tests-visual/coherence-congruence.spec.ts` — the per-page dual-engine both-modes
  coherence π (enrolled into the `proof:ba-gestalt` roster, not a parallel gate).
- `docs/consumer-evidence/*` — n/a (WS12 mints no primitive).

**Edited (WS12 cross-cutting discharge — one-token swaps + de-forks):**
- `src/styles/menu.css:58`, `src/styles/utilities/base.css:275`, `src/styles/cards.css`,
  `src/components/custom/configurator/ConfiguratorLayer.vue:203`,
  `src/components/ui/slider/Slider.vue`, `src/styles/dock/layer-group.css:270-272`
  (WS2-coord) — the 8 `CLOCK_FENCE_PENDING` legs: `--duration-{fast,normal}` →
  `--spring-<name>-duration`.
- `src/styles/theme/literals.css:18-21` — the 4 `--animate-*` entrance aliases:
  `--duration-{normal,panel}` → `--spring-{smooth,snappy}-duration`.
- `src/components/custom/deck/constants.ts:24` — DECK_SPRING → `springPreset('smooth')`
  (kills the CSS↔JS 0.5/0.85-vs-0.58/0.8 divergence + the stale comment).
- `src/components/ui/card/Card.vue:228` — drop the response/ζ override; keep ONLY
  shrinkDepth/maxStretch (the legit per-surface knobs) → Card+Button share the `press`
  register.
- `src/components/custom/handmark/HandMark.vue:87` — `cubic-bezier(.16,1,.3,1)` →
  `var(--ease-out-expo)` (WS9-(f) coord).
- `src/composables/motion/useScrollProgress.ts` — internals onto `createScrollReader`
  (keep the `/motion-core` public API) OR fold the single useAurora consumer onto
  `useScrollTrigger` + delete the 111L leaf.
- `demo/layout/AppShell.vue:625` — `<filter id="shell-dock-morph-goo">` → `<GooFilter
  id="shell-dock-morph-goo">` (WS1-coord).
- `demo/stories/dock/DockStage.vue:30` — OPENAI_SKY cool default → the warm Dawn/
  warm-vibrant identity (demo-side, WS1-field-coord).
- `demo/stories/manifest.ts:181` — the `CATEGORY_DEFAULT_BG` 4-register decision (collapse
  to ONE warm identity, reconciling the one-GL-per-route budget via the shared armed
  canvas; WS1-field-coord).
- `scripts/proof-motion-one-clock.mjs` — widen M3(a) to scan `animation:`/`--animate-*`;
  drain `CLOCK_FENCE_PENDING`; value-check `SPRING_DEFAULTS_ALLOWLIST`.
- `scripts/proof-ba-gestalt.mjs` (WS7-coord) — enroll the per-page coherence verdict
  rows; the `REQUIRED_SURFACES` BG-route re-derivation is WS7's.
- `src/composables/motion/useSpringPress.ts:26-35` — refresh the stale JSDoc.
- `CLAUDE.md` — strike the stale "ratchet ∅ (BB.W-CARVE5)" claim; add the §Shadows
  one-line cartoon-ink chroma fence + the anti-stacking + Regular/Clear notes.

**Routed to owning waves (WS12 VERIFY only, NO edit):** WS3 (blur/cast/tint), WS4
(morph/FLIP/spring-table/12-laws/god-module/liquid-morph.css), WS8 (bevel/Safari/
fidelity-rungs), WS9 (paper tooth/GU-1 key-light), WS1 (routing/field/AppShell), WS2
(dock-engine/V↔H), WS7 (close oracle/roster).

---

## 5 · THE BG.W-* WAVE BREAKDOWN

All waves carry the cardinal laws (no-legacy clean breaks, KISS/DRY/DEFT, foreign-tree
fence ABSOLUTE, the substitution-vs-inheritance re-declare-at-scope discipline, the
@layer-loses-to-unlayered cascade-trap, plain `.dark .x` not `:global()`, compositor-only
motion under the universal PRM carve, the one-GL-per-route + offscreen-pause budget).

### BG.W-COHERENCE-CENSUS (FIRST · zero-pixel · the seed of the gate)
The FDR2-shape cross-cutting inventory (§3 above), born documenting the broken 4.2.0
baseline so the post-WS1–WS11 census MEASURES the convergence. Produces
`WS12-CENSUS.md` (scorecard per surface×axis + the §3 incongruence list C1–C21 + §4
calibration + §5 feed-forward routing table). Records the POSITIVE design-language
finding (the glass-blur register is structurally coherent at the token layer — zero
raw-px backdrop-filter, single `--glass-level` source, uniform `--glass-edge-light`
bevel) so the WS12 glass-coherence pass focuses on LIVE-PAINT register-at-the-right-tier
JUDGEMENT, not token drift. Zero src edits.

### BG.W-COHERENCE-GATE (the structural lock · born-RED on 4.2.0)
`proof:coherence-census.mjs` (§2.3 A1–A9). The load-bearing arm is **A1 (hue-at-L)** —
the over-correction-class catcher that the chronic root-cause lacked (the single hole
that produced BOTH the maroon AND the metallic over-corrections). Widen
`proof:motion-one-clock` M3(a) to `animation:`/`--animate-*` (A7) + value-check the
allowlist (A9). ENROLL the per-page coherence verdict into WS7's `proof:ba-gestalt`
roster (necessary-not-sufficient; the paint is binding). The gate MUST go RED on the 4
live HEAD defects (oxblood cast, blur divergence dock9/resting10/floating13, a glass-on-
glass stack, an off-table spring) — a gate GREEN on HEAD is disqualified (the F1–F5
trap). Runs as a tag PRECONDITION (rides WS7's `--run full`), never local-only.

### BG.W-DESIGN-LANGUAGE-UNIFY (axis 1 · VERIFY + the new anti-stacking BUILD)
VERIFY the WS3 blur-peer (dock==card==button==menu==resting), the WS3 tint-collapse to
plate+rim, the WS3/WS8 maroon→warm ink, the WS8 iOS-27 bevel SUFFUSE-UNIVERSAL, the WS9
warm-lit paper tooth all LANDED and read as ONE register at the right tier. BUILD the
anti-glass-stacking rule (C20, the NEW Apple census class — A5). Record the WS8
chrome(full-drapery)≠content(sheen/opaque) fidelity rungs as a SANCTIONED divergence
(§4), not drift. The binding test: a glass surface pulled page-to-page resolves
byte-identical blur/tint/rim/bevel.

### BG.W-ANIMATION-CONGRUENCE (axis 2 · the cross-page residual the source-gates can't see)
DISCHARGE all 8 `CLOCK_FENCE_PENDING` legs (C5 — the single owner the distributed
5-wave deferral waited for; WS2-coord on the dock-engine layer-group legs). Re-time the 4
`--animate-*` entrance aliases (C6). Re-derive the off-table springs: DECK_SPRING →
`springPreset('smooth')`, Card press → drop the override (C7). Fold HandMark easing →
`--ease-out-expo` (C8). Close the scroll-reader dual-path (C14). VERIFY WS4's
morph-engine-one/FLIP-one/spring-table-tidy landed (≤6 rows, ONE morph engine via
`useLiquidFlex`, ONE `useFlip` runner) and `--card-shrink-ease` no-overshoot (C9, C10,
C11). CODIFY the system motion-rule (the Disney-12 rubric: every motion reads as ONE of
staging/stagger · squash&stretch · follow-through/overlapping · slow-in/slow-out; a
motion fitting none is a fork to harmonize) + the proportion fence (cartoon-punch on
STATE-CHANGE beats ONLY: topology flip / celebration / dock open, NEVER a scroll scrub /
every hover — liquid-weight-universal is the light-bending fade everywhere, NOT
everywhere-gel). Compositor-only + PRM-carve re-verified after each swap
(`proof:no-layout-animation` stays GREEN).

### BG.W-GLASS-PAPER-CONGRUENCE (the morphism spine)
BIND the Liquid-Glass content-fence (glass on CHROME only / paper+material on CONTENT —
the four-layer canon, Apple HIG "content is a nav/floating material"). CODIFY the
Regular-vs-Clear variant map (C21): **Regular** (legibility-adaptive, the W55
luminosity-adjust) for text-bearing/content/chrome; **Clear** (high-transparency +
REQUIRED dimming layer) ONLY for the dock/overlay-over-live-aurora case — a Clear glass
over an un-dimmed busy backdrop is the legibility drift. VERIFY the ONE-key-light spine
(WS9 GU-1 `--glass-key-direction` unifies glass specular + under-shadow fill + paper
tooth-shadow azimuth — one light source governs all three). VERIFY the WS3↔WS8 ambient
seam (the bloom 4th-channel writer `useBloomUp.ts:340` and WS3's plate-pair re-point are
coherent — no double-write/clobber; AGREE keep-or-re-point, never delete). Own the
concentric-radius derivation (A6 — a nested radius derives from its container, the
discipline glass-ui's W-CARD-PAD √φ ladder applies to padding).

### BG.W-PAGE-COMPONENT-AUDIT (the iterated capstone sweep · post-integration paint)
The per-page (11 categories) + per-component wave-by-wave sweep against all 3 axes on a
fresh DUAL-ENGINE (real Chrome + real Safari.app) both-modes capture of EVERY page
(hard-loaded routes until WS1 lands). Owns the demo-side congruence harmonizations:
re-point DockStage OPENAI_SKY → warm (C12), decide the `CATEGORY_DEFAULT_BG` 4-register
map (C12, WS1-field-coord), de-fork the AppShell goo filter → `<GooFilter>` + the census
clause (C13), move liquid-morph.css → demo (C15, WS4-fallback). Each pass sweeps a band
for residual drift and specs the harmonization; loops to congruence (the AI-tool audit
cadence = every batch). The binding artifact is the post-integration dual-engine capture
laid side-by-side: does the backdrop read as ONE warm system; does any glass surface read
as a pale lozenge on a flat plate; is any cartoon cast red/maroon; does any component
pulled across pages carry its identity unchanged.

**Sequencing (hard):** routing(WS1) → motion-spine(WS4) → glass-unify(WS3/WS8) → paper
(WS9) → **THEN** WS12 captures the harmonized whole. CENSUS + GATE run NOW (born-RED);
DESIGN-LANGUAGE-UNIFY/ANIMATION-CONGRUENCE/GLASS-PAPER-CONGRUENCE VERIFY-arms + the
PAGE-COMPONENT-AUDIT paint run POST-LAND.

---

## 6 · ACCEPTANCE / REAL-PAINT-π BAR

1. **`proof:coherence-census` born-RED on 4.2.0, GREEN post-harmonization** — RED on the
   4 live HEAD defects (oxblood cast `oklch(0.18 0.11 56)`, blur divergence
   dock9/resting10/floating13, a glass-on-glass stack, an off-table spring). A GREEN on
   HEAD disqualifies the gate (the headless-green trap, shipped 3×).
2. **A1 hue-at-L** RED on cartoon-ink (resulting H ≈ 56° at L0.18 with C0.11 — oxblood)
   AND a synthetic metallic-saturate; GREEN on the corrected warm-near-neutral ink.
3. **`CLOCK_FENCE_PENDING == []`** + `proof:motion-one-clock` GREEN with M3(a) widened to
   `animation:` (the 4 entrance aliases now caught + re-timed); ONE `--spring-smooth`
   resolves ONE duration everywhere.
4. **The per-page dual-engine both-modes capture** (enrolled into `proof:ba-gestalt`,
   resolves-on-disk + isRealPng + pngDimensions + surface-hash) reads as ONE coherent
   iOS-27 system across EVERY page on BOTH Chrome AND Safari — with the EXPLICIT bar that
   the SVG lens is a Chrome-only ENHANCEMENT (Safari silently drops SVG-backdrop-filter →
   flat blur), so the Safari capture reads as ONE system on the `@supports` blur+tint+rim
   FLOOR alone. A component pulled across pages resolves byte-identical
   blur/tint/rim/bevel/ink.
5. **The motion congruence π** — menu-row hover, `.tap-squish` press, dock layer-group
   morph, and the fade/scale/slide/dock-in entrances captured Chrome+Safari both-modes
   read identical smooth/snappy settle across surfaces (the binding "one motion language"
   the headless gate cannot prove).
6. **No regression** — `proof:no-layout-animation`, `proof:glass-cohesion`,
   `proof:animation-coherence`, `proof:surface-axis`, `proof:no-gray`,
   `proof:safari-webgl` all stay GREEN after every WS12 swap; the bundle budget
   re-bases BEFORE any growth lands (index.css gzip 140k / aurora.js gzip 54k ceilings).

---

## 7 · FOLDED DEFERRED ITEMS (no silent drop — the chronic compounded twice already)

- **BF 32-row DEFERRED-CENSUS + BE/BF un-executed waves** — every row folds to a WS1–WS12
  wave OR an explicit RETIRE-with-rationale; the missing `proof:be-fold-ledger` floor
  gate is built (a capstone that converges inheriting 32 un-decided deferrals repeats the
  disease). WS12's CENSUS carries the fold ledger; WS7's close runs it.
- **The chronic ROOT-CAUSE gate** (the hue-at-L hole WS3 §6 surfaced to "WS7
  probe-vocabulary widen") — OWNED here as A1, the archetypal coherence-gate predicate.
- **The CLOCK_FENCE_PENDING set** (deferred across BC.W-AFFORDANCE-MAP /
  W-CONTROL-SMOOTH / W-DOCK-ENGINE / W-CONFIG-RIGHT / W-SELECTION-CARD — none executed) —
  DISCHARGED here (the single owner).
- **The `CATEGORY_DEFAULT_BG` 4-register decision** + the DockStage cool-preset re-point —
  DECIDED here (demo-side, WS1-field-coord), not left as "a deferred WS decision."
- **The ℱ persistent brand slot** (P-design F7 "REMOVE") + the top scroll-progress
  hairline (verify it is the WS11 glassy rail, not the F6 stray bar) + the substrates
  "Aurora Studio" purple-h2 second-hue glance — verified-and-closed in the page audit.
- **CLAUDE.md reconcile** — strike the stale "ratchet ∅" claim; the GooFilter.vue:11
  stale header (references deleted GlassGooFilter/DockGooFilter); the useSpringPress
  JSDoc; the DRAWER_SNAP doc↔code drift (CLAUDE.md says 0.4/0.82, code 0.5/0.74).

---

## 8 · OPEN RISKS

- **R1 · No evidence surface at HEAD (highest severity).** The binding capture depends on
  WS1–WS11 LANDING (empty diff at HEAD). WS12 pass-1 delivers CENSUS + born-RED GATE +
  specs ONLY; the congruence VERDICT rides the post-integration tree. Stated honestly —
  do not self-report convergence on faith.
- **R2 · The gate must be born-RED, full-page, multi-region, both-modes, motion-ON,
  dual-engine.** If it greens on the broken HEAD it is the F1–F5 vacuous-gate trap. The
  prototype must prove RED on the 4 defects before the spec is trusted.
- **R3 · Predecessor specs are "verification frontiers," not buildable-converged** — WS3
  self-states its cross-engine PAINT is NOT bound; WS12's congruence can collide with
  mechanisms that still CHANGE when they actually build. The VERIFY-arms re-run after each
  domain lands (the iterated loop).
- **R4 · Safari risk is real but mis-located** — backdrop-filter url()+blur WORK on
  WebKit 26.4; the actual breaks are `startViewTransition` no-op (C19, a structural
  cross-engine transition-language divergence), a possible silent goo-filter no-apply, and
  `-webkit-backdrop-filter` literal VALUE-correctness (a `blur(0px)` literal ships flat).
  The dual-engine capture + A8 fences own these.
- **R5 · Clock-fence discharge collides with WS2's dock-engine rebuild** — the 3
  layer-group legs are WS2's box-morph register; WS12 discharges the clock UNDER WS2's
  reconcile by coordination, never a conflicting edit. If WS2 re-times the legs itself,
  WS12's discharge is a recorded no-op there.
- **R6 · The substitution-vs-inheritance dead-knob trap (≥3rd recurrence) + an unowned
  paint delta** — every token re-thread re-declares the COMPOSED token at the scope
  (never :root-only); every flat-utility→token swap drops the flat utility + `@import`
  after. The blur-peer collapse is NOT byte-identical (drops brightness(1.02), saturate
  1.6→1.4 on glass buttons) — that delta is WS3's to own; WS12 VERIFIES it is intended,
  never claims byte-identity.
- **R7 · Anti-stacking detection tractability** — if every glass surface legitimately
  nests glass (the 3-layer hierarchy is the norm, not the exception), A5 must be a
  named-allowlist + manual-audit item, not a blanket source ban. The prototype decides
  whether a tractable heuristic exists.

---

*Pass-1 synthesis. The capstone is real at HEAD only as CENSUS + born-RED GATE + specs;
the congruence verdict is a POST-INTEGRATION instrument. This honest cap is the spec.*
