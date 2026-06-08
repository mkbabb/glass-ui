# AX.W57 — Demo radial-background reauthor + Pulse-aura calm: stop hand-rolling radials, adopt the shipped substrate

**Band** B · DEMO/GRAPHICS · **Severity** major (P6 — the /primitives/pulse aura paints throbbing full-page radial blobs at 0.55 core × 0.95 breath; P7 — four demo HEROS hand-roll 30–45%-alpha radial washes the shipped `<Aurora>` should paint)
· **dependsOn** AX.W47 (the aurora preset/palette seam landed), AX.W17 (Constellation landed), AX.W18/W40 (the demo IA tree settled — heros authored on the FINAL page set)
· **Charter** convergence-2 USER-DEFECTS pass-2 P6 (pulse radial too egregious) + P7 (heros should leverage an Aurora keyed off the page's colors OR a Constellation for befitting pages instead of hand-rolled radials)
· **Audit** `docs/tranches/AX/audit/convergence2/A-demo-radials-bg.md` (the P6 pulse source + the P7 nine-site inventory split into the Class-A-replace / Class-B-constellation / Class-C-keep map) + `docs/tranches/AX/audit/convergence2/orchestrator-mcp-live-pass2.md` (the live chrome-devtools-mcp confirmation: `.pulse-aura` paints 1513×853 full-page radials at 55% core alpha)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. This wave is DEMO-side (demo/stories/** + the
> demo radial heros) with ONE library leg (the P6 pulse-aura tokens — a token-only re-baseline on a
> shipped primitive, no API change). Per the hardened agent git clause (K W0): agents NEVER
> stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **pulse aura** is `<Pulse variant="aura">` — an absolutely-positioned radial halo that
> breathes inside a host surface. The **hero radials** are the four Class-A demo HEROS (hero / intro /
> paper-glass / auth-shell brand panel) that hand-roll multi-stop `radial-gradient(…)` washes keyed off
> the `--section-color-*` brand ramp. The **shipped substrate** is `<Aurora>` (the painterly WebGL2
> wash, with a `renderMode="css"` placeholder fallback + an `opacityCeiling`) and `<Constellation>` (the
> Canvas2D proximity-graph lattice). The gestalt: stop hand-rolling radials; adopt the shipped substrate
> keyed off the page's own colors so the wash gains LIFE (drift) + idiom (one shared substrate) without
> losing the brand-color seam.

---

## State (born-RED — the gate fails at HEAD)

The wave is born-RED at HEAD `6050dc4` on **16** falsifiable witnesses (proved by running the new gate's
detector against the `6050dc4` source via `git show`):

- **RED witness 1 (the pulse aura is a glowing disc, doubly-stacked, default-driven).**
  `src/components/custom/pulse/Pulse.vue` `.pulse-aura` paints `radial-gradient(ellipse at 50% 50%,
  color-mix(…currentColor var(--pulse-aura-opacity-pct, 55%)…) 0%, color-mix(…calc(var(
  --pulse-aura-opacity-pct-num,55) * 0.35 * 1%)…) 45%, transparent 75%)` at `opacity:
  var(--pulse-aura-opacity-min, 0.55)` — AND the `ambient-pulse` keyframe drives the element opacity UP to
  `--pulse-aura-opacity-max` (**0.95**) mid-breath. So at a saturated `text-viz-fourier` currentColor the
  perceived center is ~0.55 density × up-to-0.95 element opacity = a near-opaque throbbing blob, not a halo.
  The orchestrator's live mcp pass confirmed it: `.pulse-aura` elements paint 1513×853 full-page radials at
  55% core alpha. **The falsifiable RED:** `--pulse-aura-strength` is absent from `tokens.css` (grep NONE);
  the `--pulse-aura-opacity-pct` / `-pct-num` percent+number twin (a desync trap) is consumed in Pulse.vue.
- **RED witness 2 (the twin desync trap).** Two tokens — a percent (`--pulse-aura-opacity-pct`) and a raw
  number (`--pulse-aura-opacity-pct-num`) — must be hand-kept in sync for the two color-mix stops; a consumer
  overriding one and not the other desyncs the falloff. Overfitting-adjacent duplicated knob.
- **RED witnesses 3–14 (the four hand-rolled hero radials — 3 asserts each).** `compositions/hero.vue`
  (3-ellipse `--section-color-0/2/5`), `foundations/intro.vue` (3-ellipse `--section-color-0/2/5` +
  `hue-rotate`), `foundations/paper-glass.vue` (3-ellipse `--section-color-5/2/0`),
  `compositions/auth-shell.vue` (2-ellipse `--section-color-1/6` brand panel) each (a) do NOT import
  `<Aurora>`, (b) do NOT render `<Aurora>`, (c) still hand-roll a `--section-color-*` radial-gradient hero
  wash. Twelve REDs.
- **RED witnesses 15–16 (the tokens absent).** `--pulse-aura-strength` and `--pulse-aura-breath-max` are not
  minted at HEAD; the aura background does not derive density from a single scalar.

`node -e` over the `git show 6050dc4:` source confirmed all 16 RED; the HardGate below drives each GREEN.

**Status** — DEV-COMPLETE (this session implemented it). The wave is DEMO-side + one token leg; the §HardGate
SOURCE arm is GREEN, the π live arm is handed to the orchestrator (see §liveArmNotes / §HardGate-π).

---

## Goal

The /primitives/pulse aura reads as a QUIET ambient halo, not a throbbing blob; the four demo HEROS gain a
LIVE painterly `<Aurora>` drift keyed off the page's own brand hues instead of a static hand-rolled radial.
Every magnitude is a token; the pulse desync-twin is collapsed onto ONE `--pulse-aura-strength` scalar; the
heros keep their `--section-color-*` page identity via the Aurora palette; the WebGL-context budget is
respected (one live GL context per mounted route, never two); the no-GL fallback is strictly >= the prior
static radial (the `paletteToCssGradient` placeholder is itself a wash).

---

## Scope (the two folds — DEMO-side, one token leg)

### P6 — Pulse-aura calm (the ONE library leg; token-only re-baseline)

The egregiousness is doubly-stacked and entirely default-driven. The GESTALT fix (token-first, not a patch):
re-baseline the aura from a glowing DISC to an AMBIENT halo, with TWO decoupled single-source knobs.

1. **Collapse the desync twin onto ONE `--pulse-aura-strength` (0..1) scalar.** Both color-mix stops derive
   from it via `calc()` — center stop `calc(var(--pulse-aura-strength,0.22) * 100%)`, mid stop
   `calc(var(--pulse-aura-strength,0.22) * 35%)`. The `--pulse-aura-opacity-pct` / `-pct-num` twin is GONE.
   Default `0.22` (was 0.55) reads as an ambient wash.
2. **Earlier falloff.** The mid stop moves to 35% (was 45%) and `transparent` by 70% (was 75%) so the halo
   reads ambient, not a dense disc out to half-radius.
3. **Decouple the aura element-opacity from the shared shimmer tokens.** The `ambient-pulse` keyframe drove
   the element opacity to the SHARED `--pulse-aura-opacity-max` (0.95) — which `.skeleton-breath` ALSO reads
   (a neutral grey shimmer where 0.55↔0.95 is the correct soft swell). The aura gets its OWN
   `--pulse-aura-breath-{min,max}` (**0.28 / 0.42**); the keyframe + the static/PRM render read those. The
   shared `--pulse-aura-opacity-*` (0.55/0.95) stay UNTOUCHED for the skeleton.
4. **The loud old read survives as the explicit opt-in.** A consumer wanting the celebratory pulse uses
   `intensity="vivid"` or overrides `--pulse-aura-strength` — opt-in, not default.

Net zero new public surface beyond the two tokens; one collapse (the twin → the scalar).

### P7 — Demo hero-radial reauthor (DEMO-side; the substrate adoption)

The audit's nine-site inventory splits into three classes; only Class A is the target.

- **Class A — REPLACE with `<Aurora>` (the four painterly hero washes).** A new demo-private helper
  `demo/stories/aurora-hero.ts` (`heroAuroraConfig(palette)`) mirrors the `--section-color-*` brand HUES
  (rose 359.8 / indigo 265.5 / amber 69.6 / purple 305.9 / tomato 30.4) into painterly OKLCh `AuroraConfig`
  palettes (Aurora reads JS stops, not `var(--section-color-*)`). Each hero renders `<Aurora :config=… class=
  "absolute inset-0 -z-10" :opacity-ceiling=… aria-hidden>` behind its content:
  - `compositions/hero.vue` → `rose-indigo-amber`, `opacityCeiling 0.6` (text-dense hero).
  - `foundations/intro.vue` → `rose-indigo-amber`, `opacityCeiling 0.6` (the brand front door; the
    `--hue-shift` filter still rides the live canvas — it sits on the section, the Aurora is a child).
  - `foundations/paper-glass.vue` (page hero) → `amber-indigo-rose`, `opacityCeiling 0.55` (the tier tiles
    read translucent over the live wash). The Class-C `--viz-*` sample-tile swatch lower in the page STAYS.
  - `compositions/auth-shell.vue` (brand panel only) → `purple-tomato`, `opacityCeiling 0.5` (text-dense
    pitch panel; the RIGHT-half form stays the plain card).
- **Class B — `<Constellation>` (the system/index/tooling heros).** Recorded as the substrate-choice RULE
  (Aurora for painterly/brand/warm-identity heros; Constellation for system/index/network/tooling reads).
  No Class-B ADD lands here — the candidates (`tools/command.vue`, a system index) have NO hand-rolled radial
  today, so adding a background is an orchestrator "wants a bg at all?" live call, gated low-priority. The
  rule + the map are codified so a future add picks the right substrate.
- **Class C — KEEP (the radial is the SUBJECT or a config-preview).** `compositions/configurator.vue` (the
  config-driven fake-aurora preview — the radial IS the lesson), `compositions/instrument-chassis.vue` /
  `InstrumentChassis.vue` (the chassis curvature token), `aurora/NucleiOverlay.vue` (the nucleus-handle ring
  mask), `foundations/paper-glass.vue:191` (the sample-tile swatch), `substrates/aurora.vue` (the scoped
  `-inset-6 blur-2xl opacity-60` decorative bloom BEHIND the live aurora-studio stage — a 2nd live GL context
  is BARRED on the WebGL-context budget; it is already aurora-themed by `--rainbow-pastel-*`; KEEP per the
  audit lean). All on the gate's documented KEEP allowlist.

### KEEP — what this wave does NOT touch

The library `<Aurora>`/`<Constellation>` components (consumer-side adoption only, no component edit); the
`--section-color-*` ramp + the `--viz-*` tokens (read, not changed); the skeleton-breath shared tokens
(0.55/0.95, untouched — the aura decouples FROM them); the Class-C radial sites; the demo IA tree (W18/W40);
the aurora preset roster (W47).

---

## SOTA deepening (the substrate-choice gestalt)

**Substrate-choice rule (the gestalt the wave codifies).** Aurora for PAINTERLY / brand / warm-identity
heros (the design system's own face); Constellation for SYSTEM / index / network / tooling surfaces (a
structural read). ONE substrate per hero, never both. Every adopted hero feeds the PAGE'S colors
(`--section-color-*` → the Aurora palette via the hue-mirror) so the wash keeps page identity — it gains
LIFE (drift) + idiom (one shared substrate) without losing the section-color brand seam.

**No-GL fallback parity.** Aurora's `renderMode="auto"` resolves to `"css"` on low-power / reduced-motion /
save-data — the `paletteToCssGradient` placeholder is itself a radial/linear wash, so the replacement is
strictly >= the prior static radial on every device (animated where capable, static where not). No regression.

**WebGL-context budget (binding).** Each live `<Aurora>` = one GL context. The demo router mounts ONE story
page at a time, so one Aurora hero per route is fine. The HARD rule: never TWO live Aurora GL contexts on the
same mounted route — `substrates/aurora.vue` (the studio stage IS a live Aurora) KEEPS its scoped backdrop as
a static radial (no 2nd context). Class-B Constellation is Canvas2D (not a GL context) so it does not draw
against the GL budget.

---

## FileBounds (the EXACT files this wave may touch)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | §2.A — MINT `--pulse-aura-strength: 0.22` (the ONE density scalar) + `--pulse-aura-breath-min: 0.28` / `--pulse-aura-breath-max: 0.42` (the aura's OWN element-opacity range); KEEP `--pulse-aura-opacity-{min,max}` (0.55/0.95) as the SHARED skeleton-shimmer stops (re-documented as skeleton-only). |
| `src/styles/animations.css` | RE-POINT the `ambient-pulse` keyframe opacity stops onto `--pulse-aura-breath-{min,max}` (was the shared `--pulse-aura-opacity-*`). |
| `src/components/custom/pulse/Pulse.vue` | RE-AUTHOR `.pulse-aura` background: both color-mix stops derive from `calc(var(--pulse-aura-strength,0.22) * …)`; the twin `--pulse-aura-opacity-pct` / `-pct-num` is GONE; earlier falloff (mid 35%, transparent 70%); static + PRM opacity reads `--pulse-aura-breath-min`. |
| `demo/stories/aurora-hero.ts` | **NEW** — `heroAuroraConfig(palette)`: the three brand palettes (`rose-indigo-amber` / `amber-indigo-rose` / `purple-tomato`) mirroring the `--section-color-*` hues into painterly OKLCh stops on the calm `DEFAULT_AURORA_CONFIG` base. |
| `demo/stories/compositions/hero.vue` | Replace the inline `backgroundImage` 3-ellipse radial with `<Aurora :config=heroAuroraConfig('rose-indigo-amber') opacity-ceiling=0.6 class="absolute inset-0 -z-10">`. |
| `demo/stories/foundations/intro.vue` | Replace the `bg-[radial-gradient…]` 3-ellipse wash with `<Aurora …'rose-indigo-amber'… 0.6>`; keep the `--hue-shift` filter on the section. |
| `demo/stories/foundations/paper-glass.vue` | Replace the PAGE-HERO `bg-[radial-gradient…]` wash with `<Aurora …'amber-indigo-rose'… 0.55>`; KEEP the `--viz-*` sample-tile swatch. |
| `demo/stories/compositions/auth-shell.vue` | Replace the brand-panel `backgroundImage` 2-ellipse wash with `<Aurora …'purple-tomato'… 0.5>`; the form half unchanged. |
| `scripts/proof-demo-radial-calm.mjs` | **NEW** — the born-RED→GREEN device-free SOURCE gate (A pulse-calm + B hero-Aurora + C no-loud-radial). |
| `package.json` | Register `proof:demo-radial-calm`. |
| `scripts/gates.mjs` | Add the `proof:demo-radial-calm` manifest row (`local`,`ci`). |
| `docs/tranches/AX/audit/W57-demo-radial-calm.json` | **NEW** — the born-RED→GREEN audit ledger. |

**OUT of bounds:** the `<Aurora>`/`<Constellation>` library components (consumer-side adoption only); the
`--section-color-*` / `--viz-*` tokens (read-only); the shared `--pulse-aura-opacity-*` skeleton tokens
(decouple FROM, do not retune); the Class-C radial sites (`configurator`/`instrument-chassis`/`NucleiOverlay`/
the paper-glass sample tile / the `substrates/aurora.vue` scoped bloom); the demo IA (W18/W40); the aurora
preset roster (W47); the W52 glass-material specular (a different radial family).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W52 (liquid-glass material) — DISJOINT radial family.** W52 owns the glass specular `::before` + the
  fixed-anchor curvature/corner radials. W57 owns the pulse-aura halo (a different primitive) + the demo HERO
  washes (demo-side). No shared file: W52 touches `glass.css`/`utilities.css`/`Card.vue`; W57 touches the
  pulse tokens + the demo heros. (Both touch `tokens.css` — line-region-disjoint: W52 the `--glass-*`
  specular/saturate cohort, W57 the §2.A `--pulse-aura-*` block.)
- **vs W47 (aurora preset roster) — DISJOINT.** W47 names the studio presets in `demo/stories/aurora/
  presets.ts`; W57 authors a SEPARATE `demo/stories/aurora-hero.ts` palette helper for the heros. No file
  overlap. W57 dependsOn W47 only so the aurora palette seam is settled.
- **vs W17 (constellation) — CONSUMER-SIDE reuse.** W57 codifies the Constellation substrate-choice rule +
  records it as the befitting substrate for system/index heros; it adds NO Constellation component change (the
  ≥2-consumer bar is already met: `substrates/constellation.vue` + slides W30). No Class-B ADD lands here.
- **vs W18/W40 (demo IA + dock-nav shell) — DISJOINT.** Those own the demo tree STRUCTURE + the nav shell;
  W57 re-authors page HERO content (excluded from their FileBounds). W57 dependsOn them so the heros are
  authored on the final page set.

---

## HardGate (born-RED→GREEN + the MANDATORY π live audit)

**Headless / SOURCE gate — born-RED→GREEN. `proof:demo-radial-calm` (NEW; device-free FS string-scan +
token-resolution).** Three assert groups:

- **A. PULSE-AURA CALM.** `tokens.css` mints `--pulse-aura-strength` ≤ **0.25** + `--pulse-aura-breath-max`
  ≤ **0.5**; the `--pulse-aura-opacity-pct` / `-pct-num` twin is NOT consumed (`var(--pulse-aura-opacity-pct`)
  in `Pulse.vue`; the `.pulse-aura` background derives density from `--pulse-aura-strength`. **Born-RED at
  HEAD** (no strength token, the twin consumed).
- **B. HERO RADIALS REPLACED.** Each of the four Class-A hero files imports + renders `<Aurora>` AND carries
  ZERO `--section-color-*` radial-gradient hero wash (a `--viz-*` sample-tile radial is allowed). **Born-RED
  at HEAD** (no Aurora, the section-color radial present).
- **C. NO FULL-PAGE LOUD RADIAL.** No non-allowlisted demo story carries a hand-rolled full-bleed
  radial-gradient at > 30% color-mix alpha (or > 0.30 per-stop alpha). The KEEP allowlist names the five
  load-bearing Class-C sites. **Stays GREEN** (the heros are the only loud full-bleed washes; once replaced,
  none remain).

Verified: `node -e` over `git show 6050dc4:` source → 16 RED; the patched tree → PASS.

**VISUAL-TRUTH live audit (π — the orchestrator runs via chrome-devtools-mcp @ localhost:5173; the binding
close criterion — the SOURCE gate alone is NOT done).** Fail-CLOSED. Over `/primitives/pulse` +
`/compositions/hero` + `/foundations/intro` + `/foundations/paper-glass` + `/compositions/auth-shell`, light
AND dark:

- **The pulse aura is an AMBIENT halo, not a throbbing blob.** `/primitives/pulse` → the three aura demos
  (fourier/chebyshev/legendre) read as quiet breathing washes, NOT dense glowing discs. `evaluate_script`
  reads `getComputedStyle('.pulse-aura').opacity` (cycles ≤ ~0.42, NOT up to 0.95) and the resolved
  `background` shows the strength-derived low-density stops. The skeleton-breath shimmer is UNAFFECTED
  (compare a `/feedback/skeleton` breath tile — still 0.55↔0.95).
- **Each hero reads as a LIVE painterly drift in the page's brand hues.** The four heros show the Aurora wash
  (rose/indigo/amber, amber/indigo/rose, purple/tomato) drifting behind legible content; the display titles +
  prose clear AA over the `opacityCeiling`-clamped wash. `performance_start_trace` over a hero confirms one GL
  context, no repaint storm.
- **No-GL parity.** Emulate reduced-motion / low-power → the Aurora resolves to the CSS placeholder (a static
  wash, >= the prior radial). No blank hero.
- **Affordance / hierarchy / NO occlusion / no regression** per the AX cardinal gate, light AND dark.

**The wave does NOT close on the SOURCE gate alone** — the executed π audit (captured as the paired-π
BEFORE/AFTER in `W57-demo-radial-calm.json`) is the binding close. The BEFORE pins the HEAD throbbing-pulse
blob + the static hero radial the reauthor must visibly beat.

---

## Cadence (sub-step order — as implemented)

1. Re-confirm the 16 RED witnesses at HEAD (`git show 6050dc4:` + the gate detector) — done (16 RED).
2. Author `proof-demo-radial-calm.mjs` born-RED; register in `package.json` + `gates.mjs`.
3. P6 — `tokens.css` mint the strength + breath tokens (decouple from the shared shimmer); `animations.css`
   re-point the keyframe; `Pulse.vue` re-author `.pulse-aura` (collapse the twin, earlier falloff).
4. P7 — author `aurora-hero.ts`; replace the four hero radials with `<Aurora>` keyed off the brand palettes.
5. Self-gate GREEN: `typecheck` + `build` + `proof:demo-radial-calm` + `proof:gate-script-parity` +
   `proof:theme` + `proof:components-css`. Write the audit ledger; hand the π live arm to the orchestrator.

---

## Artefacts

- `docs/tranches/AX/audit/W57-demo-radial-calm.json` — the born-RED→GREEN ledger (16 RED witnesses, the per-
  fold disposition, the post-wave GREEN structure + the handed-off π checks).
- `scripts/proof-demo-radial-calm.mjs` — the NEW device-free SOURCE gate (A pulse-calm + B hero-Aurora + C
  no-loud-radial).
- `demo/stories/aurora-hero.ts` — the NEW per-page hero-palette helper.
- The diff localizing the pulse-aura re-baseline (3 library files) + the four hero replacements + the gate
  registration.

---

## CommitPlan (one conventional-commit per the wave)

1. `feat(AX.W57): demo radial reauthor + pulse-aura calm — ambient halo (--pulse-aura-strength) + four hero radials → <Aurora> (P6/P7)`

(The orchestrator owns the index — agents NEVER stage/commit/stash per the hardened agent git clause.)

---

## Dependencies (dependsOn + why)

- **AX.W47 (aurora preset/palette seam) — the aurora palette idiom must be settled before the heros feed
  brand stops into an `AuroraConfig`.**
- **AX.W17 (Constellation) — the substrate-choice rule names Constellation as the system-hero alternative;
  the component must exist for the rule to be actionable.**
- **AX.W18 / W40 (demo IA + dock-nav shell) — the heros are authored on the FINAL page set, not mid-churn.**
- **Coordinates with AX.W52 (glass material) — DISJOINT radial family + line-region-disjoint in `tokens.css`.**

---

## Archaeology

- **P6 source.** `Pulse.vue:152-171` `.pulse-aura` — the `circle/ellipse at 50% 50%, … 55% / 0.95 breath`
  recipe (the AB.W3.T1 Living-UI aura). The 0.55 density × 0.95 breath was never re-baselined; the orchestrator
  live mcp pass (`orchestrator-mcp-live-pass2.md`) confirmed it paints full-page 55%-core radials.
- **P7 source.** The four Class-A heros + the nine-site inventory (`A-demo-radials-bg.md`). The static radials
  predate the shipped `<Aurora>` substrate reaching demo-hero maturity (W47/W17/W18 closed the seam).
- **The shared-token trap.** `--pulse-aura-opacity-{min,max}` (0.55/0.95) is read by BOTH `.skeleton-breath`
  (`Skeleton.vue`, a neutral grey shimmer where the range is correct) AND the aura keyframe — so the calm fix
  MUST decouple the aura onto its own `--pulse-aura-breath-*` rather than lower the shared tokens (which would
  break the skeleton swell). This wave's clean break.

---

## PreceptAlignment

- **token-first / no magic numbers (J invariant).** Every aura magnitude is a token (`--pulse-aura-strength`,
  `--pulse-aura-breath-{min,max}`); the hero palettes are a named helper a consumer overrides (the demo-side
  analogue of overriding `--section-color-*`).
- **abrogate-before-patch.** The desync twin is DELETED (collapsed onto one scalar), not patched in sync; the
  hand-rolled hero radials are DELETED (replaced by the shipped substrate), not dimmed.
- **one-path / no-legacy.** ONE aura density scalar; ONE shared substrate for the heros (no parallel
  hand-rolled wash beside the Aurora); the substrate-choice rule recorded so future heros do not re-fork.
- **no-backwards-compat.** The twin is removed (no alias kept); the heros switch wholesale to Aurora.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L inv 8).** `--pulse-aura-strength` ships with
  its consumer (the `.pulse-aura` background); the Constellation reuse meets the ≥2 bar already; NO Class-B
  ADD ships without a live "wants a bg?" ratify (no speculative background).
- **WebGL-context budget + no-GL parity (D19-adjacent perf discipline).** One live GL context per route; the
  `renderMode="auto"` CSS fallback is >= the prior static radial.
- **π visual-runtime lane (AX.W00).** The wave closes on the EXECUTED live audit (the ambient pulse + the live
  hero drift + the legibility), NOT the SOURCE gate alone.

---

## Open questions / RATIFY (orchestrator, at the live π pass)

1. **`substrates/aurora.vue` scoped bloom — KEEP static vs `renderMode="css"` Aurora.** Recommendation: KEEP
   static (it is already `--rainbow-pastel-*`-themed + scoped + blurred + ~0.21 effective alpha; a 2nd live GL
   context is barred). Route to a `renderMode="css"` Aurora ONLY if the live pass wants idiom coherence over
   the negligible churn. Default: KEEP.
2. **The opacityCeiling per hero (0.6 / 0.6 / 0.55 / 0.5).** Authored from the audit's text-density read; the
   orchestrator tunes live if any hero's content competes with the drift (raise the ceiling lower).
3. **Class-B Constellation ADD (`tools/command.vue` / a system index).** Deferred — gate behind the live
   "does this page want a background at all?" call. The rule + the map are recorded; the ADD is low-priority.
