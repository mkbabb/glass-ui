# AX.W52 — Liquid-glass material overhaul: delete the central screen-disc → a thin bounded edge gleam, the realistic Safari-clean material identity, the hover+animation coherence pass, the gold-CTA promotion

**Band** B · GRAPHICS · **Severity** blocker (D19 — the user's loudest live defect: "the specular/radial effect is EGREGIOUS — a large diffuse central radial bloom washes out the whole surface … muddy, not glassy. DRAMATICALLY reduce or remove it … the specular HOVER is/was egregious … the general button HOVER is not smooth enough … animations need tuning")
· **dependsOn** AX.W00 (the π visual-runtime lane — the close machinery), AX.W09 (the moving-specular tokenization + the D11 fixed-anchor radial sweep — W52 SUPERSEDES/ABSORBS W09's radial arm; see DEDUP)
· **Charter** AX.md USER-DEFECTS ledger D19 (`docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md:32` — the NET-NEW liquid-glass material-overhaul blocker that "escalates + supersedes D11/W09's radial sweep into a full material identity pass") + the D19 "dedicated workflow per the user" clause
· **Audit** the four convergence research files under `docs/tranches/AX/audit/convergence/liquid-glass/` — `material-design.md` (the gestalt replacement: delete the central disc, strengthen the edge), `glow-stack-diagnosis.md` (the 13-layer radial ledger + the ranked REST-bloom culprits), `hover-animation.md` (the specular-hover + button-hover + animation-coherence diagnoses), `gold-cta.md` (the ASK-GU-GOLD promotion + the L1–L5 liquid-glass model lessons)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. Per the AX cardinal precept (§0 / AX.W00): this wave does NOT close
> on a green headless gate; it closes on a LIVE Playwright + frontend-design audit. Per the hardened agent
> git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **moving specular** is the pointer-tracked `.glass-material::before` catch-light (one shared
> recipe across the five `.glass-*` rungs + `.glass-card` + `.dock-icon-button`). The **central disc** is its
> HEAD geometry — a `radial-gradient(circle at X Y, … transparent 55%)` whose stops reach 55–75% of the
> plate half-diagonal, so on a small tile it is a whole-surface wash, not a catch-light. The **edge gleam**
> is the replacement — a small, bounded, pointer-anchored highlight (`circle var(--glass-specular-size,36%)`)
> that reads the surface curvature near the lit edge. The **liquid-glass identity** is the load-bearing cue
> stack the material KEEPS: backdrop blur + GENTLE saturate, the `--glass-edge-light` rim, the under-shadow
> floor, the warm-cream tint, the `#glass-refract` PE garnish.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `e2c9995` (3.8.0 + the AX integrated band) on **six** falsifiable witnesses,
each a source-true line-probe the new gate inverts. W09's moving-specular arm already lowered the *opacity*
(rest 0 / hover 0.22 / active 0.32) and softened the fixed-anchor radials — but it KEPT the central-disc
GEOMETRY + the `screen` blend, which is exactly why D19 escalates it (the geometry, not the alpha, is the
muddy-card defect). Source-confirmed at HEAD:

- **RED witness 1 (the headline — the central radial is GEOMETRICALLY a whole-surface disc, parse-falsifiable).**
  `glass.css:118-123` paints `.glass-material::before` as `radial-gradient(circle at var(--specular-x,50%)
  var(--specular-y,50%), hsl(40 30% 96% / 0.22) 0%, hsl(40 30% 96% / 0.08) 22%, transparent 55%)` with a
  `mask-image` reaching `transparent 75%` (`:128-133`). The `circle` has NO explicit size, so its stops run
  to 55%/75% of the plate's HALF-DIAGONAL — on a MetricCell (`.glass-wash`, ~80–110px, the speedtest detail
  tile) that fills essentially the ENTIRE plate. **The falsifiable RED:** *parse the `::before` background —
  at HEAD it is an unbounded `circle at …, … transparent 55%` reaching 55–75% (a centred wash) with NO
  `--glass-specular-size` token anywhere in `src/` (`grep -rn "glass-specular-size" src/` returns NONE) (RED).
  After the wave the gleam is `circle var(--glass-specular-size,36%) at …` with the falloff `transparent` by
  ≤ ~70% INSIDE the plate and the mask narrowed to the gleam — a bounded catch-light, never a whole-surface
  disc, with `--glass-specular-size` a minted `@property`/token (GREEN).*

- **RED witness 2 (the `mix-blend-mode: screen` lifts the whole tile toward white, parse-falsifiable).**
  `glass.css:134` composites the warm-cream core with `mix-blend-mode: screen`. `screen` = `1−(1−a)(1−b)` —
  a non-linear LIGHTENER that can only brighten + desaturate, and lifts MOST over mid-luminance backdrops
  (the speedtest card, the aurora bleed). At L=96% warm-cream that pushes the tile toward white — the literal
  "muddy, washed-out" tell. **RED:** *the blend is `screen` (RED). After the wave it is `plus-lighter`
  (additive but HDR-clamped — Safari 16.4+ — which does NOT over-white), with the un-blended low-alpha warm
  gleam as the graceful fallback on older engines (GREEN).*

- **RED witness 3 (the bloom WAKES ON HOVER on every glass surface, parse + computed-style falsifiable).**
  `tokens.css:1825-1827` is the intensity cohort `rest 0 / hover 0.22 / active 0.32` (dark `:1833-1834`
  `0.18/0.26`). `MetricCell` composes `.glass-wash` = a `.glass-material` group member, so at `:hover` it
  lifts to `0.22` and the whole-tile screen-bloom appears (the "egregious specular HOVER"). The
  `Card.vue:91-96` `specular="full"` local override makes it WORSE — rest `0.08` / hover `0.45` / active
  `0.6`, a near-opaque whole-tile white screen. **RED:** *hover resolves `0.22` (active `0.32`) over the
  full-plate screen disc, and `specular="full"` overrides to `0.45`/`0.6` (RED). After the wave hover ≤ 0.10
  / active ≤ 0.16 (dark `0.08`/`0.12`), `full` re-derived down to a gleam not a screen, and a DEFAULT content
  tile carries NO tracked glint (the bounded gleam is opt-in `subtle` only) (GREEN).*

- **RED witness 4 (the backdrop saturate is over-juiced, parse-falsifiable).** `tokens.css:669-670`:
  `--glass-blur-floating: blur(16px) saturate(1.4)`, `--glass-blur-overlay: blur(15px) saturate(1.5)`. A
  1.4–1.5× saturation boost on the BACKDROP (everything behind the glass) over-saturates the bleed-through —
  garish over a colored substrate, not the gentle ~1.1–1.2× light-concentration real liquid glass does.
  (`wash/quiet/resting` already sit at `saturate(1.05)` — fine; only floating/overlay over-juice.) **RED:**
  *floating/overlay carry `saturate(1.4)`/`saturate(1.5)` (RED). After: `saturate(1.18)`/`saturate(1.2)`
  (GREEN).*

- **RED witness 5 (the BUTTON hover desyncs — surface legs on a bezier, scale on a spring; large lift,
  parse-falsifiable).** `button/index.ts:29,36` carry `hover:scale-[var(--scale-hover)]` (= **1.08**, an 8%
  jump — `utilities.css:691,1023`); `.btn-pill` transitions bg/border/color/shadow/**transform** all on
  `--duration-fast var(--ease-standard)` (a plain bezier), while `.tap-squish` (`utilities.css:209`) springs
  the PRESS scale on `--spring-snappy`. So press feels alive and hover snaps mechanically — two halves of one
  control speaking different motion languages, with a `transform` leg in `.btn-pill`'s list that is DEAD for
  the `scale`-longhand variants. **RED:** *the hover scale is `1.08` snapped on `--ease-standard`; the press
  scale springs on `--spring-snappy`; `.btn-pill` lists a dead `transform` transition (RED). After: a smaller
  `--scale-hover-btn` (~1.03–1.04) on `--spring-smooth` (clean sub-perceptual settle), surface legs staying
  on the bezier, the dead `transform` leg retired, hover + press reading as ONE motion register (GREEN).*

- **RED witness 6 (no recorded easing-doctrine → the animation forks live, grep + parse-falsifiable).** The
  `--spring-*` vocab is already converged (W05) and there are near-zero hardcoded `ms`/`cubic-bezier()` in
  the sheets — but there is NO recorded rule for WHICH easing fits which job, so forks persist:
  `.btn-pill` beziers `transform` while `.tap-squish` springs the same `scale`; `.glass-btn`
  (`glass.css`) springs scale on `--spring-snappy` while `.btn-pill` beziers; `--ease-apple`
  (`cubic-bezier(0.25,0.1,0.25,1)`, `tokens.css:180`) survives as a SECOND smooth-ease authority beside
  `--spring-smooth`. **RED:** *two answers for the `scale` easing across `.btn-pill`/`.tap-squish`/`.glass-btn`;
  `--ease-apple` a live dual-authority (RED). After: ONE recorded doctrine (surface-props→bezier,
  transform/enter→spring, exit→bezier-no-overshoot) drives the token-only reconciliation — unified button
  scale-easing, `.glass-btn`↔`.btn-pill` reconciled, `--ease-apple` folded onto `--spring-smooth` or
  documented ambient-only (GREEN).*

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the six witnesses on
the live demo at `localhost:5173` (the §HardGate π checks): the central disc fills a hovered MetricCell, the
`screen` blend over the aurora reads muddy not glassy, `specular="full"` (if any story mounts it) is a white
screen, floating/overlay saturate reads garish, the button hover snaps while the press springs, and the
`scale` easing resolves to two registers across the four recipes. Capture the BEFORE π render (the muddy
speedtest-class card; the hover bloom; the button-hover desync) as the born-RED baseline in
`audit/W52-liquid-glass-material.json`. Do NOT proceed on the audit's word — re-prove (the cardinal AX
lesson; W09 shipped headless-green over a still-blooming live surface, which is exactly why D19 re-opens it).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

The glass material reads as REALISTIC, performant, Safari-compatible LIQUID GLASS — the egregious central
radial bloom DELETED and replaced by a thin, bounded, pointer-anchored EDGE gleam; the morphism INCREASED by
strengthening the edge (rim + gleam + refraction + gentle saturate) rather than adding paint; the specular
HOVER a whisper; the general button HOVER one coherent smooth lift on a spring; the animation easing governed
by ONE recorded doctrine; and the gold CTA (the user-loved "→ Next" model of tasteful glassy specular)
promoted to documented canon. Every magnitude a `--glass-*` token, no buried literal, the warm-cream house
identity + the rim + blur + under-shadow KEPT, the central screen-disc GONE — the surface reads MORE glassy
with LESS paint.

---

## Scope (the gestalt REPLACEMENT — no workaround, no legacy, no per-component patch)

The five compounding sources `material-design.md` §0 located are ONE architectural defect at ONE unified
source (`glass.css .glass-material::before`): a LARGE centred warm-cream disc painted with `screen` over an
over-saturated backdrop, one of four+ uncoordinated radial-glows, waking on hover on every tile. W09 lowered
the alpha but kept the geometry + the blend; D19's gestalt is to DELETE the disc and STRENGTHEN the edge.
Six folds, all token-routed:

1. **DELETE the central screen-disc → a thin BOUNDED pointer-anchored edge gleam (the headline —
   `material-design.md` §2a, `hover-animation.md` (a), `glow-stack-diagnosis.md` L1).** Re-author the
   `.glass-material::before` background at the ONE unified source: replace the unbounded
   `circle at X Y, … transparent 55%` (mask to 75%) with `radial-gradient(circle var(--glass-specular-size,36%)
   at var(--specular-x) var(--specular-y), hsl(40 35% 92% / 0.5) 0%, hsl(40 35% 92% / 0) 70%, transparent
   100%)` — an EXPLICIT-radius gleam (~36% of the plate) whose falloff is well INSIDE the plate, with the
   `mask-image` narrowed to the gleam (`black 0%, black 60%, transparent 100%` at the same size). KEEP the
   warm-cream `hsl(40 …)` house tint (L < 100% so the hue survives — the W09 fix; do NOT regress to pure
   white) + the `opacity: var(--specular-intensity)` driver (the Chromium-safe path — see fold 4-Safari). The
   gleam is OFF the `--specular-x/y` pointer so it reads as a tracked glint, not a centred wash.

2. **CHANGE `mix-blend-mode: screen` → `plus-lighter`, with the un-blended low-alpha gleam as fallback
   (`material-design.md` §2a/§5, `hover-animation.md` (a)2, `gold-cta.md` L3).** `screen` is the bloom
   amplifier — drop it for `plus-lighter` (additive, HDR-clamped, Safari 16.4+, does NOT lift the whole tile
   toward white). Author so a non-supporting engine degrades to a plain low-alpha overlay (no blend, no
   blowout), NOT a `screen` fallback. `gold-cta.md` L3 records the Safari-safe pattern for the INTRA-element
   case — `background-blend-mode` (isolation-safe, composites within the element's own background layers) over
   `mix-blend-mode` (composites against the backdrop, the Safari-quirky path); the gleam composites the
   pointer-radial against the backdrop, so `plus-lighter` (a `mix-blend-mode` Safari supports cleanly for
   specular, as iOS itself uses) is the right one, but the un-blended fallback is the no-workaround floor.

3. **DEFAULT content tiles carry NO tracked glint; the gleam is opt-in `subtle` only (`material-design.md`
   §2c/§7, perf §4).** The bounded gleam is the right behaviour for a hero/chrome surface; a default content
   tile (a MetricCell grid, a data Card) should attach ZERO pointermove repaint. KEEP the W09 `Card specular`
   vocabulary (`off|subtle|full`) — `off` (the §24-ratified content-Card default) resolves zero intensity +
   wires no pointer seam; `subtle` arms the bounded gleam; `full` re-derived DOWN (rest `0.08`→`0.04` / hover
   `0.45`→`0.18` / active `0.6`→`0.26` per `material-design.md` §8) so even the brightest opt-in is a gleam,
   not a screen. RETIRE-or-retune the over-bright `full` rung (`hover-animation.md` (a)4 floats deleting it;
   the conservative move is to re-derive it down — RATIFY, see Open Questions).

4. **REDUCE the intensity cohort + TAME the saturate + the `--glass-specular-size` knob (`material-design.md`
   §2c/§2e/§8).** `tokens.css §11b cohort`: hover `0.22`→**0.10**, active `0.32`→**0.16** (dark hover
   `0.18`→**0.08**, active `0.26`→**0.12**); rest stays `0`. `tokens.css:669-670`:
   `--glass-blur-floating … saturate(1.4)`→**`saturate(1.18)`**, `--glass-blur-overlay … saturate(1.5)`→
   **`saturate(1.2)`** (wash/quiet/resting already `1.05` — untouched). ADD ONE new token
   `--glass-specular-size: 36%` to `tokens.css §8` — the SINGLE overridable magnitude that BOUNDS the gleam
   geometry so it can never again become a whole-surface disc (the gestalt knob D19 names; register it
   `@property { syntax:"<percentage>"; inherits:false; initial-value:36% }` if a per-surface override is
   wanted, else a plain token). **Safari/Chromium discipline (HARD — `material-design.md` §5):** KEEP the
   intensity driving layer `opacity` (NEVER a per-stop `hsl()` alpha — the documented Chromium
   `@property`-var-in-hsl-alpha=0 trap; Safari/Chromium differ, `opacity` is cross-engine-safe); KEEP the
   `mask-image` + the `inset:0 + border-radius:inherit` fallback; VERIFY `-webkit-backdrop-filter` ships in
   `dist/glass-ui.css` (the single most important Safari check — without it every Safari glass surface paints
   flat; HEAD already emits it, the gate locks it).

5. **The hover SMOOTHING — unify the button hover-visual channel onto ONE register + a smaller spring lift
   (`hover-animation.md` (b), `material-design.md` §3b, `glow-stack-diagnosis.md` R4).** Introduce
   `--scale-hover-btn` (~**1.03–1.04**, a restrained lift) and route the button hover scale through
   `--spring-smooth` (a clean sub-perceptual settle, not a bounce); KEEP the surface legs (bg/border/color/
   shadow) on `--duration-fast var(--ease-standard)` (a bezier is the right register for a color cross-fade —
   a spring on a color reads as a wobble); make the `scale` transition EXPLICIT on the button base so hover +
   `.tap-squish` press are coherent (press keeps `--spring-snappy` via `.tap-squish`, or unify both to
   `--spring-smooth` for one register); RETIRE the dead `transform` leg from `.btn-pill`'s list (the `scale`
   longhand is what animates). KEEP the hover scale OPT-IN (the audacious CTAs + `btn-interactive`) — do NOT
   add a hover scale to every variant. It is already GPU-friendly (`scale`/`opacity`, no layout) — keep it.

6. **The animation COHERENCE doctrine + the gold-CTA promotion (`hover-animation.md` (c), `gold-cta.md`).**
   (a) **Record ONE easing doctrine** in `tokens.css §2` header + CLAUDE.md: surface-props (bg/border/color/
   shadow/opacity) → `--ease-standard` (bezier); transform hover/press/active (scale/translate/rotate) →
   `--spring-smooth` (settle) or `--spring-snappy` (crisp press); enter (mount/popover/dialog) →
   `--spring-bouncy`/`--spring-snappy`; exit (unmount/close) → `--ease-out`/`--ease-standard` (bezier, NO
   overshoot — an exit must never overshoot past gone); position-tracked (specular pointer) → `--ease-standard`.
   This FORMALIZES the already-correct `transitions.css` idiom. It drives token-only cleanups: unify the
   button scale-easing (fold 5), reconcile `.glass-btn`↔`.btn-pill` onto one register, fold `--ease-apple`
   onto `--spring-smooth` (or document it ambient-only). A COHERENCE pass — the values barely move; the win
   is every recipe reaching for the same easing for the same job, recorded so it stops drifting.
   (b) **Promote ASK-GU-GOLD to canon (docs-only — `gold-cta.md`).** The gold facility ALREADY ships
   (`@utility btn-audacious-gold` at `utilities.css:885-925`; the `gold-audacious` Button variant at
   `button/index.ts:35-36`; demo'd + gated; speedtest CONSUMES the library utility, no local redefinition) —
   the ask is stale at the code level. The ONE residual gap is CLAUDE.md canon: append `gold-audacious` to
   the Button-variant list (`CLAUDE.md:319`), add a one-sentence composition note (`:321`), append
   `btn-audacious-gold` to the utilities inventory (`:177`), and mark ASK-GU-GOLD satisfied in the routed-asks
   ledger. NO new variant, NO `gold` shorthand alias, NO `DockTabButton` variant (all exist or are
   redundant-substrate-without-a-second-consumer per inv-8). The gold CTA is ALSO the D19 MODEL (the L1–L5
   reference the implement lane converges toward — see §SOTA).

### KEEP — the load-bearing liquid-glass cues (do NOT touch; `material-design.md` §2b)

UNCHANGED, the cues that ARE liquid glass: the `--glass-edge-light` rim (`tokens.css:757`, the full-perimeter
`::after` inset ring — SOTA-correct, W09/D11 both ratify it; the fix STRENGTHENS its relative weight by
removing the disc that drowned it); the `--glass-under-shadow-*` floor (the 0.5px dark bottom hairline reading
glass thickness); the warm-cream `hsl(40 …)` in-srgb tint family (the house identity — the problem was never
the hue, it was the SIZE + BLEND + AMOUNT); the grain `::after` (verify-live only — `material-design.md` §2d:
if the tile still reads muddy after the bloom fix, the `overlay` blend is the next suspect, consider
`soft-light` in light mode too); the `#glass-refract` PE garnish (Chromium-only `@supports`-gated, free blur
fallback elsewhere); the blur ladder (`--glass-blur-*` radii — the morphism knob; do NOT raise any radius for
"more glass" — the morphism gains come from the edge, and the existing blur reads STRONGER once the bloom
drops). The `#glass-edge-light` rim is the radial family's PERIMETER member, NOT a central-bloom source — do
not conflate the two (the W09/D11 cross-ref that prevents the wrong fix).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **The speedtest MetricCell (`.glass-wash`) is the canonical D19 victim (`material-design.md` §0/§4).** The
  speedtest detail tile reads muddy because the central disc fills the ~80–110px plate on hover. The fix lands
  in glass-ui (the `.glass-material::before` re-author + the content-tile-no-glint default); speedtest gets it
  FREE via the AX publish + a pin bump (the consumer-adoption leg routes to W34, NOT executed here). Author
  the cross-ref note; write no sibling source.
- **The gold CTA is the reference, not a sibling edit (`gold-cta.md`).** L1–L5 (edge/perimeter specular over
  central radial; hover-gated over always-on; `background-blend-mode` over `mix-blend-mode` for intra-element;
  PRM-gated motion with complete static fallback; legibility-contract-per-state gated) feed the implement lane
  as design INPUT. The promotion is docs-only; speedtest's consumption (`Dock.vue:302`) is already inv-16-correct.

---

## SOTA deepening (liquid-glass research)

The convergence corpus + the iOS-26 / WWDC25 §219 liquid-glass literature name the gestalt REPLACEMENT and the
gold CTA as its model. Cited from the four research files:

**The material identity — what liquid glass actually is (`material-design.md` §1):** in priority order —
(1) backdrop blur + GENTLE saturation (~1.1–1.2×, NOT 1.4–1.5× color-juice) = the translucency; (2) a crisp
thin EDGE rim (the `--glass-edge-light` hairline — the single most important "this is glass" cue, KEEP);
(3) a thin specular EDGE gleam (small, off-centre, ~10–15% of the surface — REPLACES the central disc);
(4) an under-shadow floor (KEEP); (5) the warm-cream tint (KEEP the hue); (6) edge refraction (the
`#glass-refract` PE, KEEP gated). The transposition: **DELETE the central disc; KEEP the rim + blur +
under-shadow + warm tint; STRENGTHEN the EDGE** so the surface reads MORE glassy, not less. The geometry
shrink (36% vs 75% mask) is a PERF win too — a smaller pseudo repaints less.

**The gold CTA is the "tasteful glassy specular done right" MODEL (`gold-cta.md` L1–L5):**
- **L1 — specular as a thin EDGE catch-light, never a diffuse central bloom.** The gold hover swaps in
  `--glass-specular` (`inset 0 1.5px 0 0 hsl(0 0% 100% / 0.45)`) — a 1.5px inset top-edge highlight, a sharp
  specular RIM, the literal antithesis of the D19 central-disc defect. The legible-glass specular is a
  perimeter/edge phenomenon.
- **L2 — effect fires on HOVER only; rest is restrained quiet glass.** `btn-audacious-gold` rest = a faint
  8%/5% gold tint; all the drama (sweep, specular swap, ring) lives in `&:hover`. The anti-pattern is the
  always-on `[data-phase]` corner-halo D11/W09 flag — the gold CTA hover-gates by design. This is the correct
  register for D19's "specular HOVER fixed" + "button HOVER smoothed."
- **L3 — `background-blend-mode: overlay` (intra-element, isolation-safe, Safari-clean) over `mix-blend-mode`
  for any intra-element lens.** The Safari-compat compositing pattern the material overhaul mirrors where the
  effect is within the element's own layers (the gleam's pointer-radial-against-backdrop case keeps
  `plus-lighter` — the specular blend iOS itself uses — with the un-blended fallback).
- **L4 — PRM-gated motion with a COMPLETE static fallback.** The `btn-gold-bg-sweep` shimmer is wrapped in
  `@media (prefers-reduced-motion: no-preference)`; the static tint + specular always paint. The canonical
  motion discipline the "animations need tuning" doctrine adopts library-wide: motion is the enhancement; the
  static read is always complete + legible.
- **L5 — legibility contract baked into the variant + gated per state.** `gold-audacious` reserves
  `text-white` for hover/active (where the gold backplate darkens enough to clear AA), warm-ink `--foreground`
  at rest, with `proof-affordance-contrast.mjs:67-82` enforcing it. The muddy-card defect is PARTLY a
  legibility failure (a diffuse bloom lifting the plate's lightness toward the text) — the gold CTA's
  discipline (tint low at rest, white only where dark) is the template.

**The hover/animation SOTA (`hover-animation.md`):** the specular hover blooms because a 0.22-alpha
warm-cream radial with a SLOW falloff (transparent only at 55%) is `screen`-blended (a non-linear lightener);
the button hover is rough because a LARGE scale (1.08) snaps on a bezier while the press springs; the timing
TOKENS are already clean (W05) — the gap is a recorded DOCTRINE that unifies the scale-easing fork and retires
the last `--ease-apple` dual-authority. All token-resolved, Safari-safe, no new mechanism.

**Reconciliation note:** W52 RE-AUTHORS the `.glass-material::before` GEOMETRY + BLEND (W09 tokenized the
alpha; W52 fixes the size + the blend the alpha-tune left); it REDUCES the cohort W09 minted (a value
re-baseline on the existing knob); it ADDS the `--glass-specular-size` bound + the `--scale-hover-btn` lift +
the easing doctrine; it PROMOTES the gold CTA to canon (docs). It does NOT re-mint the cohort, re-author the
rim, or touch the WebGL blob (a different subsystem — D4, same principle, no code overlap).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/glass.css` | **RE-AUTHOR** the `.glass-material::before` recipe (`:108-141`): DELETE the unbounded `circle at X Y, … transparent 55%` (mask to 75%) → a bounded `circle var(--glass-specular-size,36%) at X Y, hsl(40 35% 92% / 0.5) 0%, …/0 70%, transparent 100%`; NARROW the `mask-image` to the gleam (60% inner, 100% outer); CHANGE `mix-blend-mode: screen` → `plus-lighter` with the un-blended low-alpha fallback; KEEP `opacity: var(--specular-intensity)` (the Chromium-safe path) + the `inset:0 + radius-inherit` mask fallback; soften the `.dark` arm (`:143-…`) to the lowered cohort; correct the recipe comment to the painted reality (bounded gleam, plus-lighter). Reconcile the `.glass-btn` scale-easing (`:408-420` region) onto the doctrine register (fold 5/6). **glass.css CO-WRITER serialization (HARDENING §G #28 + AX.md §4 note 30):** W52 owns the `.glass-material::before` specular region + the `.glass-btn` hover region — line-region-disjoint from W24 (`.glass-progress-rail`) + W42 (the `@supports --glass-refract-scale` append); the orchestrator serializes by line-region. |
| `src/styles/tokens.css` | ADD `--glass-specular-size: 36%` (§8; `@property`-registered if a per-surface override is wanted, else plain); CHANGE the `--glass-specular-intensity-{hover,active}` cohort (`:1826-1827`) to `0.10`/`0.16` + the `.dark` arm (`:1833-1834`) to `0.08`/`0.12`; CHANGE `--glass-blur-floating`/`--glass-blur-overlay` (`:669-670`) `saturate(1.4)`/`saturate(1.5)` → `saturate(1.18)`/`saturate(1.2)`; ADD `--scale-hover-btn` (~1.03–1.04, §the scale-token neighbourhood); record the easing DOCTRINE in the §2 header comment; fold `--ease-apple` (`:180`) onto `--spring-smooth` (or document it ambient-only). |
| `src/styles/utilities.css` | Reconcile the button hover-scale: re-point the `hover:scale`/`.tap-squish`/`btn-interactive` (`:209,:676-691,:1008-1023`) scale-easing onto the doctrine (hover→`--spring-smooth` `--scale-hover-btn`, press→`--spring-snappy`); RETIRE the dead `transform` leg from `.btn-pill`'s transition list (the `scale` longhand animates). (NO edit to `btn-audacious`/`btn-audacious-gold` — the gold promotion is docs-only; the `btn-audacious` corner radial is W09/D11's, untouched here — see DEDUP.) |
| `src/components/ui/button/index.ts` | Re-point the `hover:scale-[var(--scale-hover)]` on the audacious variants (`:29,:36`) to `--scale-hover-btn` IF the doctrine routes hover-scale through the new token; confirm the variant list is otherwise unchanged (no new variant). |
| `src/components/ui/card/Card.vue` | Re-derive the `specular="full"` local override (`:91-96`) DOWN (`0.08/0.45/0.6` → `0.04/0.18/0.26`) so even the brightest opt-in is a gleam not a screen; confirm the `off` default content-Card path wires no pointer glint (the §24-ratified content default). (NO change to the W09 `specular` prop SHAPE — `off|subtle|full` stays; W52 retunes the `full` rung only.) |
| `CLAUDE.md` | **DOCS (the ASK-GU-GOLD promotion).** Append `gold-audacious` to the Button-variant list (`:319`); add the one-sentence `gold-audacious` composition note (`:321`); append `btn-audacious-gold` to the `utilities.css` inventory line (`:177`). Record the easing DOCTRINE (a one-block addition near the Conventions/animation section). Documentation is part of the change. |
| `docs/tranches/AX/coordination/from-speedtest-AV-routed-asks.md` | Move the ASK-GU-GOLD row from "Open asks" to "Closed / satisfied by 3.8.0" with the note (`gold-cta.md` §2 text). (If the ledger path differs, the implement lane resolves it; read-only routing, not an edit to library source.) |
| `scripts/proof-liquid-glass-material.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration). Asserts: the `.glass-material::before` background is a BOUNDED `circle var(--glass-specular-size,…)` (NOT an unbounded `circle at …` reaching 55%/75%); the mask is narrowed; the blend is `plus-lighter` (NOT `screen`); `--glass-specular-size` is minted; the intensity cohort resolves at/below the ceiling (hover ≤ 0.10, active ≤ 0.16; dark ≤ 0.08/0.12); the saturate is ≤ 1.2; `--scale-hover-btn` is minted + read; the easing doctrine is recorded; `opacity` (not a per-stop hsl-alpha) carries the intensity (the Chromium-trap guard); `-webkit-backdrop-filter` is present in `dist/glass-ui.css` (the Safari prefix). |
| `package.json` | Register `proof:liquid-glass-material` + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W52-liquid-glass-material.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/W52-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol). |

**OUT of bounds:** the THREE fixed-anchor radials — `--glass-curvature-overlay` (chassis) + the two
`ellipse at 30% 30%` corner radials (`dock-controls.css` dock-primary + `utilities.css` `btn-audacious`) —
W09's D11 RE-OPEN owns them (the FIXED-anchor family; W52 owns the MOVING `::before`). W52 does NOT re-edit
the curvature overlay, the corner radials, the `--glass-radial-glow-*` sibling tokens, or `dock-controls.css`
(see DEDUP §W09). The `--glass-edge-light` rim (SOTA-correct, untouched). `useSpecularTracking.ts` (W09 owns
it; W52 CONSUMES it — the content-tile-no-glint default is a CONSUMPTION choice, not a re-author). The
`#glass-refract` filter graph + `--glass-refract-scale` lensing (W42/W20). The WebGL blob shader (D4 —
`metaball.frag.ts`; same principle, no code overlap). The aurora shader tree (W07-W14). The forced-colors
skin (W36). The `glass-specular-track.css` → `glass-material.css` rename (W25b). The dock morph driver
(W01/W42).

---

## Disjointness (sibling waves it must NOT overlap)

W52 is the MATERIAL-LOOK overhaul of the moving specular; it shares the specular region of `glass.css`/
`tokens.css` with the radial-glow family but is line-region-disjoint from its siblings:

- **vs AX.W09 (specular tune + D11 fixed-anchor radial sweep) — SHARED files, line-region-disjoint; W52
  SUPERSEDES W09's MOVING arm + ABSORBS the D19 escalation.** W09 owns: the `.glass-material::before` alpha
  tokenization (the `--glass-specular-intensity-*` cohort), the `useSpecularTracking` DRY extraction, the
  Card `specular` PROP, the dock double-specular retirement, AND the THREE fixed-anchor radials (curvature
  overlay + the two corner radials → the `--glass-radial-glow-*` axis). W52 owns: the `.glass-material::before`
  GEOMETRY + BLEND re-author (the central-disc→gleam + screen→plus-lighter the alpha-tune left), the cohort
  VALUE re-baseline DOWN (on W09's knob), the `--glass-specular-size` bound, the saturate tame, the
  `Card specular="full"` rung re-derive, the button-hover smoothing, the easing doctrine, the gold promotion.
  **Coordinate the shared `glass.css`/`tokens.css` specular region:** W52 runs AFTER W09 settles (dependsOn
  AX.W09) so the cohort + the composable + the prop are the fixed model W52 re-baselines; the cohort VALUE
  edit (W52) is line-disjoint from the cohort MINT (W09); the `--glass-specular-size` addition is new lines;
  the curvature/corner radials are W09's, NEVER touched here. If the orchestrator prefers, W52's moving-`::before`
  geometry arm could be folded INTO W09's re-open — but D19 is flagged NET-NEW blocker with a "dedicated
  workflow per the user," and the button-hover + easing-doctrine + gold scope EXCEED W09's radial focus, so a
  distinct wave keeps the material-identity overhaul enforceable at one close (RATIFY, see Open Questions).
- **vs AX.W42 (liquid-MORPH substrate) — orthogonal, distinct concern.** W42 is the reshape-spring substrate
  (`useLiquidMorph`/`--morph-t`/`MorphGroup` — the GEOMETRY morph between states); W52 is the material LOOK
  (the specular gleam + blend + saturate — how the glass SURFACE reads, independent of whether it is
  morphing). No conceptual overlap: the morph scalar and the material gleam are independent idioms. File
  overlap is the `glass.css` specular region (W52) vs the `@supports --glass-refract-scale` append (W42) —
  line-region-disjoint per the glass.css co-writer serialization. W52 does NOT touch `--morph-t`/
  `useLiquidMorph`; W42 does NOT touch the `.glass-material::before` specular recipe.
- **vs AX.W36 (forced-colors / WHC glass-language skin) — disjoint concern, adjacent file.** W36 ships the
  `@media (forced-colors: active)` structure-survival skin (tier panes → `CanvasText` borders, hue → bordered
  glyphs) and `display: none`s the decorative `::before` specular under WHC (chroma collapses). W52 re-authors
  the `::before` for the NORMAL (non-forced) render. They are disjoint: W36's forced-colors block yields the
  specular pseudo entirely (it paints nothing meaningful when chroma collapses); W52 fixes what it paints when
  it DOES. Coordinate only that W36's `display:none` on the `::before` still applies cleanly over W52's
  re-authored recipe (it does — the yield is wholesale, geometry-agnostic).
- **vs AX.W20 (primitive fix — GlassPanel/createGlassFilter retire), W23 (carousel), W38 (aurora-configurator
  glass-atoms restyle) — all dependsOn W09 (transitively W52).** These DOWNSTREAM waves consume the settled
  glass-atoms spine; they READ the material recipe, they do NOT re-edit it. No concurrent collision
  (sequential by dependsOn). W52's material re-author must land before these re-verify their glass surfaces.
- **vs AX.W34 (cross-repo consumer adoption).** W52 authors the speedtest MetricCell consumer-leg NOTE (the
  muddy tile reads clean after the bloom fix + a pin bump); the sibling-repo verification executes in W34.
  W52 writes NO sibling source.

### DEDUP (the explicit boundary vs the three named waves)

- **vs W42 (liquid-MORPH geometry) — DISTINCT AXIS.** W42 = the reshape spring (`--morph-t`, how an element
  changes SHAPE between states). W52 = the material LOOK (the specular gleam/blend/saturate, how the glass
  SURFACE reads). A surface can be glassy without morphing and morph without a gleam — the two are
  independent. W52 mints NO morph scalar, touches NO `useLiquidMorph`; W42 touches NO `.glass-material::before`
  specular recipe. The only shared surface is the `glass.css` region, line-region-serialized.
- **vs W36 (forced-colors) — DISTINCT MODE.** W36 = the WHC structure-survival skin (the glass language under
  the user's forced palette, where chroma + backdrop-filter + the specular pseudo all evaporate). W52 = the
  NORMAL-render material identity. W36 `display:none`s the `::before` W52 re-authors; the two never collide
  (W36 yields it wholesale; W52 fixes its normal paint). W52 authors NO forced-colors block.
- **vs W09 (the radial sweep — W52 SUPERSEDES/ABSORBS D11's RADIAL arm for the MOVING specular).** W09 owns
  the MOVING-specular ALPHA tokenization + the THREE FIXED-anchor radials (the D11 RE-OPEN — curvature overlay
  + corner radials). W52 owns the MOVING-specular GEOMETRY + BLEND re-author (the central-disc→gleam + screen→
  plus-lighter the D19 escalation demands — the thing W09's alpha-only tune left unfixed, the reason D19
  re-opens it). The split is sharp: **W09 = the FIXED-anchor radial-glow family + the moving-specular ALPHA;
  W52 = the moving-specular GEOMETRY/BLEND + the material identity (saturate, size-bound, full-rung re-derive)
  + the hover/animation/gold scope.** W52 does NOT re-edit the curvature overlay, the `30% 30%` corner
  radials, the `--glass-radial-glow-*` tokens, or `dock-controls.css` — those are W09's. W52 RE-BASELINES the
  cohort W09 minted (a value edit on the existing knob, not a re-mint). dependsOn AX.W09 sequences them so
  W09's tokenized model is the fixed substrate W52's geometry/blend overhaul rides.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W52's actual split (count 3):

- **Implement (≤1 agent — the surface is one cohesive material re-author).** Lands the
  `.glass-material::before` geometry+blend re-author + the `--glass-specular-size` bound (glass.css/tokens.css),
  the cohort VALUE re-baseline + the saturate tame (tokens.css), the `Card specular="full"` rung re-derive
  (Card.vue), the button-hover smoothing (`--scale-hover-btn` + the spring register + the dead-`transform`-leg
  retire, utilities.css/button/index.ts/glass.css `.glass-btn` reconcile), the easing-doctrine record
  (tokens.css §2 + CLAUDE.md), and the gold-CTA canon additions (CLAUDE.md + the routed-asks ledger). Lint +
  typecheck at every interval. The material recipe + the hover smoothing + the doctrine are line-disjoint
  within the shared files.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched tree:
  parses the `::before` background (asserts NOT an unbounded `circle at …` reaching 55%/75%; asserts the
  bounded `circle var(--glass-specular-size,…)` + the inside-the-plate falloff); asserts the blend is
  `plus-lighter` NOT `screen`; reads `getComputedStyle` for the cohort (asserts hover ≤ 0.10 / active ≤ 0.16,
  dark ≤ 0.08/0.12); asserts the saturate ≤ 1.2; asserts `--glass-specular-size` + `--scale-hover-btn` minted
  + read; asserts the `scale` easing resolves to ONE register across `.btn-pill`/`.tap-squish`/`.glass-btn`/
  `btn-interactive`; asserts `--ease-apple` is folded/documented; asserts the gold canon additions land.
  ADVERSARIAL twist: tries to make `proof:liquid-glass-material` PASS with the OLD unbounded `circle at …` +
  `screen` still present (confirms the gate REDs on the legacy geometry/blend); tries a per-stop hsl-alpha
  driving the intensity (confirms the Chromium-trap guard REDs); strips `-webkit-backdrop-filter` from a
  mock dist (confirms the Safari-prefix assertion REDs). DRIVES the VISUAL-TRUTH live audit (the binding
  close — see HardGate), incl. the HARD Safari/WebKit blend-parity pass.
- **Gate-author (≤1 agent).** Authors `proof-liquid-glass-material.mjs` (born-RED on the bounded-gleam +
  plus-lighter + reduced-cohort + saturate-tame + size-bound + hover-spring + easing-doctrine + Chromium-trap-
  guard + Safari-prefix assertions); confirms it FAILS at HEAD `e2c9995` (the unbounded disc + screen +
  0.22/0.32 cohort + 1.4/1.5 saturate present) and PASSES on the patched tree. Registers
  `proof:liquid-glass-material` in `package.json` + the W00 meta-gate parity. Gate-author is distinct from
  implementer (the gate must be able to FAIL the implementer's work — the AW false-GREEN class). The π live
  arm (the painted-pixels truth) rides the W00 readback, NOT a CPU text gate alone (the SOURCE arm proves the
  recipe STRUCTURE; the π arm proves the RENDER).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template — devise an in-FileBounds
idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY when genuinely
user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated
here. This wave's §3a triumvirate AUTO-TRIGGERS (authored from its FileBounds + HardGate):

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to touch the THREE
  fixed-anchor radials (`--glass-curvature-overlay` / the `ellipse at 30% 30%` corner radials / the
  `--glass-radial-glow-*` tokens / `dock-controls.css` — W09 owns the FIXED-anchor family), the
  `--glass-edge-light` rim (SOTA-correct), `useSpecularTracking.ts` (W09), the `#glass-refract` filter graph
  or `--glass-refract-scale` (W42/W20), the WebGL blob shader (D4), the aurora shader tree (W07-W14), the
  forced-colors skin (W36), or the `glass-specular-track.css` rename (W25b) — HALT + triumvirate (a
  material/radial/morph/a11y-substrate boundary the FileBounds did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:liquid-glass-material` cannot
  simultaneously assert the bounded gleam + plus-lighter + the reduced cohort (hover ≤ 0.10 / active ≤ 0.16)
  + the saturate ≤ 1.2 + the size-bound + the hover-spring + the easing doctrine + the Chromium-trap guard +
  the Safari prefix — OR if W09's `proof:glass-material-unified` REDs after the cohort re-baseline (the value
  edit desyncing the gate W09 owns) — escalate the gate design, do NOT relax a ceiling or split the gate to
  pass over a residual legacy disc/blend.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the re-authored material does NOT read as
  crisp glass (the central bloom GONE, the colored backdrop visible through the rungs, the hover gleam a
  whisper) after three authoring iterations, OR the button hover does NOT read as ONE coherent smooth lift
  after three retunes, dispatch research→plan→redress rather than re-tuning the gleam radius / spring constant
  ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3).** The W52-as-distinct-wave-vs-folded-into-W09
  disposition, the `specular="full"` retune-vs-retire decision, and the `plus-lighter`-vs-(`screen`-on-dark)
  blend-context decision are ratify-before-impl hinges — if any reaches impl un-ratified, take the recorded
  default (distinct wave; retune `full` down; `plus-lighter` everywhere with the un-blended fallback) and run
  the live-audit verification step, do NOT self-ratify a divergent choice.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:liquid-glass-material` (NEW; the device-free SOURCE +
registration arm).** A source-parse + token-resolution + deletion gate (the precept-valid artefact forms per
SPEC.md §Hard Gates — source-structure for the CSS-cascade contract; the PAINTED render is proven by the π
arm below, NEVER a text gate alone):

- **Egregious-radial magnitude reduced below a ceiling / removed.** Assert the `.glass-material::before`
  background is a BOUNDED gleam — a `circle var(--glass-specular-size,…)` (NOT an unbounded `circle at …`
  whose stops run to 55%/75%) with the falloff `transparent`/`/0` by ≤ ~70% INSIDE the plate, AND the
  `mask-image` narrowed to the gleam (≤ ~60% inner / 100% outer, NOT the HEAD 55%/75%). **Born-RED at HEAD**
  (the unbounded `circle at …, … transparent 55%`, mask to 75%).
- **Edge-refraction / material tokens exist.** Assert `--glass-specular-size` is minted; assert the
  `--glass-edge-light` rim is INTACT (untouched — the SOTA-correct edge cue the morphism rides); assert
  `--scale-hover-btn` is minted + read. **Born-RED at HEAD** (`grep "glass-specular-size" src/` = NONE).
- **The intensity cohort is at/below the ceiling.** Assert the resolved `--glass-specular-intensity-hover`
  ≤ 0.10 + `-active` ≤ 0.16 (dark ≤ 0.08/0.12); assert rest = 0; assert the `Card specular="full"` local
  override is re-derived DOWN (hover ≤ ~0.18 / active ≤ ~0.26, NOT 0.45/0.6). **Born-RED at HEAD** (0.22/0.32
  + the 0.45/0.6 full rung).
- **The saturate is calm.** Assert `--glass-blur-floating`/`--glass-blur-overlay` carry `saturate(≤ 1.2)`
  (NOT 1.4/1.5). **Born-RED at HEAD.**
- **No Chromium-`@property`-in-hsl trap.** Assert the intensity drives layer `opacity` (NOT a registered
  `@property` var nested in an `hsl()` alpha — the documented Chromium=0 trap); assert the per-stop alphas are
  literals. (A regression-guard; HEAD is already correct on this — the gate locks it stays so under the
  re-author.)
- **Safari `-webkit-` prefix present.** Assert `dist/glass-ui.css` carries `-webkit-backdrop-filter` (the
  single most important Safari check — without it every Safari glass surface paints flat; HEAD emits it, the
  gate locks it across the build). Assert the blend is `plus-lighter` (NOT `screen`) with the un-blended
  low-alpha fallback authored (a non-supporting engine degrades to a plain overlay, no blowout).
- **The easing doctrine + the gold canon.** Assert the `scale` easing resolves to ONE register across
  `.btn-pill`/`.tap-squish`/`.glass-btn`/`btn-interactive` (no `--ease-standard` on a transform alongside a
  `--spring-*` on the same property); assert `--ease-apple` is folded onto `--spring-smooth` or documented
  ambient-only; assert CLAUDE.md enumerates `gold-audacious` + `btn-audacious-gold`. **Born-RED at HEAD** (the
  scale-easing fork; `--ease-apple` a live dual-authority; CLAUDE.md omits the gold variant).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson — W09
shipped headless-green over a still-blooming live surface, which is WHY D19 re-opens it; a green SOURCE gate
over a still-muddy live render is NOT done).** A fail-CLOSED live Playwright + frontend-design pass the
ORCHESTRATOR runs via chrome-devtools-mcp @ `localhost:5173` — `getComputedStyle` reads + screenshots over
`/substrates/glass-material` (the Aurora backdrop behind) + the MetricCell story (`/data/metric-cell`, the
speedtest-class tile) + `/primitives/buttons`, in light AND dark, ideally with a Safari/WebKit pass:

- **The central bloom is GONE — crisp glass, not a wash.** Hover a `.glass-wash`/`.glass-card` tile: ASSERT
  no large central white/cream disc fills the tile; the hover reads as a thin bounded edge gleam (or NOTHING
  on a default content tile). `evaluate_script` reads `getComputedStyle(tile,'::before').opacity` at rest
  (= `0`) and on `:hover` (≤ 0.10), and the resolved `background` shows the bounded `circle <size>` + the
  `plus-lighter` blend. The colored aurora is VISIBLE through the rungs — translucent glass with a crisp rim,
  NOT a brightened/desaturated smear.
- **The `specular="full"` card is no longer a white screen.** If a story mounts `<Card specular="full">`,
  hover it: ASSERT a contained gleam, not a near-opaque whole-card white.
- **The saturate is calm.** A `.glass-floating`/`.glass-overlay` tile over the aurora: ASSERT the backdrop
  color through it reads natural, not over-saturated/garish.
- **The button hover is SMOOTH — ONE coherent lift.** Hover the `glass` + `default` + `primary-audacious`
  buttons slowly: ASSERT the color/bg/scale transition reads as ONE coherent lift (a small ~1.03–1.04 spring
  settle), no fast-color-snap-then-slow-scale desync; press-and-hold confirms the press scale still springs
  via `.tap-squish` and press/hover now read as ONE motion language; a plain `default` button gains NO hover
  scale (lift stays opt-in). A `performance_start_trace` over the hover/press cycle confirms compositor-only
  (Composite/Paint, NO Layout) on the `scale`.
- **The gold CTA is the model + UNCHANGED.** Hover the `gold-audacious` "→ Next" CTA: the gold sweep + the
  thin top-edge specular catch-light read as a tasteful celebration (the user-loved register); rest is
  warm-ink legible (not washed white); PRM-reduce keeps the static tint + specular (no shimmer). Side-by-side
  with `primary-audacious`, the gold hover is UNAFFECTED by the W52 material re-author (it overrides
  `background-image` on hover — the D11/gold coordination canary).
- **Safari parity (HARD constraint).** Verify the `plus-lighter` blend paints correctly in Safari/WebKit (NOT
  just Chromium — `plus-lighter` especially needs the WebKit check); confirm the un-blended low-alpha fallback
  paints a clean gleam (no blowout) where the blend is unsupported; confirm `-webkit-backdrop-filter` is in
  the computed style (the surface is blurred, not flat).
- **No repaint storm.** A `performance_start_trace` while sweeping the pointer across a MetricCell grid:
  ASSERT no sustained layout/paint thrash (the content-tile-no-glint default means default tiles attach zero
  pointermove repaint — the big perf win).
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND dark.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the HEAD muddy-card central bloom + the hover screen-lift + the button-hover
desync the re-author must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the six RED witnesses against HEAD `e2c9995` on
   the live demo: the unbounded central disc filling a hovered MetricCell, the `screen` muddy lift, the
   `specular="full"` white screen, the 1.4/1.5 saturate garish, the button hover/press desync, the
   two-register `scale` easing. Capture the BEFORE π render as the born-RED baseline in
   `audit/W52-liquid-glass-material.json`. Confirm W09 is settled (the cohort + the composable + the Card
   prop are the fixed model). Do NOT proceed on the audit's word — re-prove.
2. **Author the gate born-RED.** Author `proof-liquid-glass-material.mjs` (the bounded-gleam + plus-lighter +
   reduced-cohort + saturate-tame + size-bound + hover-spring + easing-doctrine + Chromium-trap-guard +
   Safari-prefix assertions); register `proof:liquid-glass-material` in `package.json` + the W00 meta-gate;
   confirm it FAILS at HEAD.
3. **Re-author the `.glass-material::before` — the central-disc→gleam + screen→plus-lighter.** `glass.css`:
   the bounded `circle var(--glass-specular-size,36%)` gleam, the narrowed mask, the `plus-lighter` blend +
   the un-blended fallback, the softened `.dark` arm, the corrected comment; `tokens.css`: mint
   `--glass-specular-size`, KEEP `opacity` driving intensity. Lint + typecheck.
4. **Reduce the cohort + tame the saturate.** `tokens.css`: cohort hover→0.10 / active→0.16 (dark 0.08/0.12);
   `--glass-blur-floating`/`-overlay` saturate→1.18/1.2. Lint + typecheck.
5. **Re-derive the `Card specular="full"` rung DOWN.** `Card.vue:91-96` `0.08/0.45/0.6` → `0.04/0.18/0.26`;
   confirm the `off` content-Card path wires no glint. Lint + typecheck.
6. **The button-hover smoothing.** Mint `--scale-hover-btn` (~1.03–1.04); route the hover scale through
   `--spring-smooth`; keep surface legs on the bezier; retire the dead `transform` leg from `.btn-pill`;
   reconcile `.glass-btn`↔`.btn-pill` onto one register (utilities.css/button/index.ts/glass.css). Lint +
   typecheck.
7. **Record the easing doctrine + fold `--ease-apple`.** `tokens.css §2` header + CLAUDE.md: the
   surface→bezier / transform/enter→spring / exit→bezier-no-overshoot rule; fold `--ease-apple` onto
   `--spring-smooth` (or document ambient-only).
8. **The gold-CTA promotion (docs).** CLAUDE.md: append `gold-audacious` to the variant list (`:319`), the
   composition note (`:321`), `btn-audacious-gold` to the utilities inventory (`:177`); move the ASK-GU-GOLD
   row to "satisfied" in the routed-asks ledger.
9. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:liquid-glass-material` passes; re-run W09's
   `proof:glass-material-unified` (confirm the cohort re-baseline did not red it); run the VISUAL-TRUTH live π
   audit (the central bloom gone, the hover gleam a whisper, the button hover smooth, the gold CTA unchanged,
   Safari parity) over flat + aurora, light + dark; capture the paired-π BEFORE/AFTER + DELTA
   (`W52-DELTA.md`); write `audit/W52-liquid-glass-material.json` to GREEN; author the speedtest MetricCell
   consumer-leg NOTE (routes to W34).

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps
3–8) and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W52-liquid-glass-material.json` — the born-RED→GREEN ledger: the six RED witnesses
  (the unbounded central disc, the screen blend, the hover-wakes bloom, the over-juiced saturate, the
  button-hover desync, the no-doctrine easing fork), the per-finding disposition (material-design §0(1-5) +
  glow-stack L1/R3/R4 + hover-animation (a)/(b)/(c) + gold-cta L1-L5), the W09-settled confirmation, and the
  post-wave GREEN structure + π-readback measurements.
- `docs/tranches/AX/audit/W52-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the muddy-card central bloom →
  crisp glass with a bounded gleam; the hover screen-lift → a whisper; the `specular="full"` white screen →
  a contained gleam; the button-hover desync → one coherent spring lift; the gold-CTA-unchanged canary; the
  Safari/WebKit `plus-lighter` parity A/B; over flat + aurora, light + dark.
- `scripts/proof-liquid-glass-material.mjs` — the NEW gate (bounded-gleam + plus-lighter + reduced-cohort +
  saturate-tame + size-bound + hover-spring + easing-doctrine + Chromium-trap-guard + Safari-prefix).
- The diff localizing the `.glass-material::before` re-author + the cohort re-baseline + the
  `--glass-specular-size`/`--scale-hover-btn` mints + the `Card specular="full"` retune + the button-hover
  reconcile + the easing-doctrine record + the gold canon additions.
- A consumer-NOTE annex (folded into the W34 coordination ledger, NOT executed here): the speedtest MetricCell
  `.glass-wash` muddy-tile re-verification (reads clean after the softened default + a pin bump).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(glass): born-RED proof:liquid-glass-material — bounded gleam + plus-lighter + reduced cohort + saturate-tame + size-bound + hover-spring + Chromium-trap + Safari-prefix (AX.W52 D19)`
2. `fix(glass): delete the central screen-disc → a bounded --glass-specular-size edge gleam + plus-lighter blend — crisp liquid glass not a central wash (AX.W52 D19 / material-design §2a)`
3. `fix(tokens): reduce the specular cohort (hover 0.10/active 0.16) + tame the floating/overlay saturate (1.18/1.2) — calm glass, not over-juice (AX.W52 D19)`
4. `fix(card): re-derive specular="full" down (0.04/0.18/0.26) — even the brightest opt-in is a gleam not a screen (AX.W52 D19)`
5. `fix(button): --scale-hover-btn (~1.03) on --spring-smooth + retire the dead btn-pill transform leg — one coherent smooth hover lift (AX.W52 D19 / hover-animation b)`
6. `docs(tokens): record the easing doctrine (surface→bezier, transform/enter→spring, exit→no-overshoot) + fold --ease-apple onto --spring-smooth (AX.W52 / hover-animation c)`
7. `docs(claude): promote gold-audacious + btn-audacious-gold to CLAUDE.md canon; mark ASK-GU-GOLD satisfied (AX.W52 / gold-cta)`
8. `chore(AX.W52): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + speedtest MetricCell consumer-leg note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  binding live-audit close criterion. W52 cannot close on the SOURCE gate alone (the cardinal AX lesson — a
  green CPU gate over a still-muddy live render is exactly the D19 gap W09 fell into); W00 stands up the lane
  it closes on + the paired-π BEFORE/AFTER + DELTA protocol it captures.
- **AX.W09 (specular tune + D11 fixed-anchor radial sweep) — HARD predecessor.** W09 mints the
  `--glass-specular-intensity-*` cohort, extracts `useSpecularTracking`, adds the Card `specular` prop,
  retires the dock double-specular, and tames the THREE fixed-anchor radials. W52 RE-BASELINES the cohort
  W09 minted + RE-AUTHORS the moving-`::before` GEOMETRY/BLEND the alpha-tune left + EXTENDS the material
  identity (saturate, size-bound, full-rung) + the hover/animation/gold scope. There is no settled cohort/
  composable/prop to re-baseline until W09 lands — running W52 before W09 would re-author a model W09 then
  rewrites. (The orchestrator MAY fold W52's moving-`::before` geometry arm into W09's re-open — RATIFY; D19
  is a flagged NET-NEW blocker with a dedicated workflow, and the button-hover + easing + gold scope exceed
  W09's radial focus, so a distinct wave keeps the material-identity overhaul enforceable at one close.)
- **Downstream (waves that consume the settled material spine):** W20 (primitive fix), W23 (carousel
  re-author), W38 (aurora-configurator glass-atoms restyle) — each READS the W52-corrected glass-material
  recipe; none re-edits it. W34 receives the speedtest MetricCell consumer-leg NOTE this wave authors.
- **Coordinates with AX.W42 (the morph substrate — orthogonal material-vs-geometry concern; line-region-
  disjoint glass.css), AX.W36 (forced-colors — disjoint normal-vs-WHC render mode), AX.W20/W25b (the refraction
  filter + the file rename — out of bounds).** None is a hard dependsOn (W52 consumes each settled surface if
  it lands first, else the published baseline) — declared so the orchestrator sequences the material overhaul
  after W09's tokenized model settles.

---

## Archaeology (the git / prior-tranche lineage + the research mandate)

- **D19 (the user defect — `docs/tranches/AX/audit/USER-DEFECTS-2026-06-08.md:32`).** "The specular/radial
  effect is EGREGIOUS — a large diffuse central radial bloom washes out the whole surface (speedtest-card
  screenshot: muddy, not glassy). DRAMATICALLY reduce or remove it. Components must stay + read OPTIMALLY
  glassy — realistic, natural, performant, Safari-compatible liquid glass. Increase liquid-glass morphism
  THROUGHOUT. The specular HOVER is/was egregious. The general button HOVER is not smooth enough. Animations
  need tuning." Flagged NET-NEW blocker, "dedicated workflow per the user," escalating + superseding D11/W09's
  radial sweep into a full material identity pass.
- **`8036370` (AV.W15) — the ORIGIN of the moving-specular recipe.** The `circle at …, … transparent 55%`
  central disc + the `screen` blend were authored here over a BUSY aurora/goo-blob backdrop where a
  screen-blend warm-cream core reads as a tasteful lens. Over glass-ui's own flat warm-cream substrate + on a
  small content tile the same recipe is a whole-surface wash.
- **`6bb442f` (AW.W22) — the BLAST RADIUS.** Promoted the `::before` from 3 opt-in components onto every
  `.glass-*` ladder rung + `.glass-card` + `.dock-icon-button`, so every content tile carries the central
  disc + lifts on hover system-wide.
- **AX.W09 (the alpha tokenization) — the prior pass D19 escalates.** W09 lowered the cohort opacity (rest 0 /
  hover 0.22 / active 0.32) + softened the fixed-anchor radials, but KEPT the central-disc geometry + the
  `screen` blend — which is precisely why the live audit re-surfaced D19. W09's status was
  `dev-complete-headless-green-live-pending`; D19 is the live-truth finding the cardinal lesson predicted.
- **HEAD `e2c9995` (the AX integrated band, UNPUBLISHED) — the audit baseline.** The unbounded central disc
  (`glass.css:118-123`), the `screen` blend (`:134`), the 0.22/0.32 cohort (`tokens.css:1826-1827`), the
  1.4/1.5 saturate (`:669-670`), the `specular="full"` 0.45/0.6 override (`Card.vue:91-96`), the 1.08 bezier
  hover-scale (`button/index.ts:29,36`), and the `scale`-easing fork are all live-proven here.
- **The gold facility (`a09b01a` landed in root; `374b98e` AW.W13 rest-text contrast fix) — the D19 MODEL.**
  The `@utility btn-audacious-gold` + the `gold-audacious` variant already ship; speedtest CONSUMES the
  library utility (`Dock.vue:302`); the ask is stale at the code level (`gold-cta.md` §Headline). The L1-L5
  lessons are the "what good looks like" reference the overhaul converges toward.
- **The convergence corpus (the four research files).** `material-design.md` (the gestalt replacement),
  `glow-stack-diagnosis.md` (the 13-layer ledger), `hover-animation.md` (the hover/animation diagnoses),
  `gold-cta.md` (the promotion + the model). All read in full before this spec — the recipe deltas, token
  deltas, and live checks are corpus-grounded, not speculative.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Pursuant to `docs/precepts/` (pinned `63240e6`); the band-B binding precepts (AX.md §2b) this wave pursues +
must not violate:

- **token-first / no magic numbers (J invariant — "every visual behaviour is a CSS custom property; no
  consumer edits library source for styling").** Every magnitude is a `--glass-*` token: the
  `--glass-specular-size` bound, the re-baselined cohort, the tamed saturate, the `--scale-hover-btn` lift —
  all overridable on `:root`. MUST NOT re-bury a literal (the gleam radius is the `--glass-specular-size`
  token, never an inline `36%`).
- **abrogate-before-patch (ask "can we delete?" before "can we patch?").** The fix DELETES the central
  screen-disc (the abrogation) rather than patching its alpha down again (the W09 patch D19 escalates); the
  edge gleam is the re-derivation. The `screen` blend is REPLACED, not dimmed.
- **one-path / no-legacy-code.** ONE moving-specular source (`.glass-material::before`), ONE bounded-gleam
  recipe across the five rungs + Card + dock; ONE easing doctrine that retires the `scale`-easing fork +
  the `--ease-apple` dual-authority. MUST NOT ship a parallel specular recipe or a second smooth-ease
  authority.
- **no-backwards-compat / no-redundant-alias (MEMORY no-backwards-compat).** The gold promotion is docs-only —
  NO new `gold` shorthand alias, NO parallel `DockTabButton` gold variant (the existing
  `@utility btn-audacious-gold` + `gold-audacious` variant are canon; minting a parallel name violates inv-8 +
  no-backwards-compat). The `specular="full"` rung is re-derived DOWN, not aliased.
- **substrate-with-consumer / no-overfitting (Design-Axis-3, L invariant 8).** `--glass-specular-size` ships
  with its consumer (the `.glass-material::before` gleam reads it); `--scale-hover-btn` ships with its
  consumer (the audacious variants + `btn-interactive` read it); the gold canon documents an ALREADY-consumed
  facility (speedtest + the demo). No speculative token.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (README §Edicts;
  SPEC.md §Hard Gates).** The pure-screen-disc-vs-"liquid-glass" mismatch is a library-internal contract
  violation (the recipe contradicts the material identity); the wave makes the painted material TRUE to the
  liquid-glass identity. The `plus-lighter`-unsupported degradation to a plain low-alpha overlay is a
  BEFITTING-silent browser-API path; the Safari `-webkit-backdrop-filter` autoprefix is a build-pipeline
  guarantee the gate locks. The two are never collapsed.
- **Safari-compatibility (the HARD D19 constraint).** `plus-lighter` (Safari 16.4+) over `screen`/`overlay`
  (Safari quirks); the un-blended fallback; `opacity`-driven intensity (never the Chromium-`@property`-in-hsl
  trap); the `mask-image` + `inset`/radius fallback; the `-webkit-backdrop-filter` build-pipeline emit. The
  Safari live pass is part of the binding close.
- **π visual-runtime lane (SPEC.md §π; AX.W00).** The wave closes on an EXECUTED live Playwright +
  frontend-design audit (the central bloom gone, the hover gleam a whisper, the button hover smooth, the gold
  CTA unchanged, Safari parity) over flat + aurora, light + dark — NOT the SOURCE gate alone (the cardinal AW
  failure this tranche corrects, the exact gap W09 fell into that re-surfaced D19).
- **Goal + completion criterion paired (README §Edicts; WAVE_SPEC §2a/§6).** The §Goal (crisp liquid glass,
  the central disc gone, the morphism increased via the edge, the hover smooth, the doctrine recorded, the
  gold promoted) and the §HardGate (born-RED→GREEN `proof:liquid-glass-material` + the visual-truth audit) are
  paired; a gate-pass with a goal-miss (the disc shrunk but still reads as a wash, or the hover still desyncs)
  closes `complete_with_misses`, not `complete`.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **W52 as a DISTINCT wave vs folded into W09's re-open — RATIFY.** D19 is a flagged NET-NEW blocker with a
   "dedicated workflow per the user"; the button-hover + easing-doctrine + gold scope EXCEED W09's radial
   focus, and the moving-`::before` GEOMETRY/BLEND is a different lever than W09's ALPHA tokenization.
   **Recommendation: distinct wave** (dependsOn AX.W09) — keeps the material-identity overhaul enforceable at
   one close + the gold/hover/doctrine scope coherent. The counter (fold the moving-`::before` geometry arm
   into W09) is viable if the orchestrator prefers a single specular owner-wave; RATIFY at wave-open.
2. **`specular="full"` — retune DOWN vs RETIRE — RATIFY.** `hover-animation.md` (a)4 floats deleting the
   `full` rung entirely (`off`/`subtle` is the whole vocabulary); the conservative move re-derives it down to
   a gleam (the busy-backdrop case the recipe was authored for survives, contained). **Recommendation: retune
   DOWN** (`0.04/0.18/0.26`) — preserves the busy-backdrop opt-in without the screen blowout; RATIFY against
   the live audit (delete entirely if no surface needs the brighter rung). No backwards-compat concern either
   way (clean break if deleted).
3. **The blend — `plus-lighter` everywhere vs `plus-lighter`-light / `screen`-on-dark — RATIFY.** `material-
   design.md` recommends `plus-lighter` everywhere (HDR-clamped, does not over-white) with the un-blended
   fallback; `hover-animation.md` notes `screen` lifts harder on light, so a per-context blend could keep
   `screen` on dark. **Recommendation: `plus-lighter` everywhere** (the simpler one-axis change; the lowered
   cohort + the bounded gleam already calm the dark arm) — add a per-context blend ONLY if the live audit
   reads a lift on either arm. The un-blended low-alpha overlay is the no-workaround fallback regardless.
4. **The grain `::after` `overlay` blend — leave vs `soft-light` in light mode — RATIFY at the live audit.**
   `material-design.md` §2d: leave the grain opacity, but if the tile still reads muddy after the bloom fix,
   the `overlay` blend over a busy backdrop is the next suspect (consider `soft-light` in light mode too,
   mirroring the dark arm). **Recommendation: leave it; revisit ONLY if the live audit still reads muddy
   after the disc→gleam fix** (the disc was the dominant source — the grain is sub-perceptual at 0.025). A
   `soft-light`-in-light change is a one-line follow if warranted, NOT a pre-emptive edit.
5. **`--glass-specular-size` — plain token vs `@property`-registered — RATIFY.** A plain token suffices for a
   `:root` override; `@property { syntax:"<percentage>"; inherits:false; initial-value:36% }` is warranted
   ONLY if a per-surface animated size is wanted (none at landing). **Recommendation: plain token** (the
   no-overfitting bar — register it ONLY when a consumer animates the size); revisit if the W42 lensing fold
   wants to spring the gleam size off `--morph-t` (that is W42's, not W52's).
