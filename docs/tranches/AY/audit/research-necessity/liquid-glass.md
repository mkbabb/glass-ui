# Research-necessity audit — lane: liquid-glass (the W-LIQUID Siri flex+squish facility)

**Question.** `AY.W-LIQUID.md` §2 names a fresh dedicated SOTA research lane (the iOS-26/27 Siri orb
deformation model). Validate or refute that necessity: how much of the §2 "falsifiable parameter
model" (max deformation %, response/damping bands, squish-axis rules, drive model, material
continuity, PRM) is already derivable from the shipped W52/W53 axes + the blob membrane code + the
existing 32-facet AX liquid-glass corpus — and what genuinely needs external reference study?

**Verdict: MIXED — refute the lane as scoped, validate a narrow reference-capture arm.**
The deformation ENGINE model is ~85% divinable from corpus + code (architecture, volume-preservation
math, caps, spring registers, squish-axis rules, PRM posture, material-continuity mechanism — all
settled, most of it shipped TWICE). The genuine research residue is exactly the part the corpus
provably does not contain: the Siri-orb-specific reference bands and drive signals. `grep -io siri`
over `docs/tranches/AX/research/liquidglass-research-corpus.json` returns **0**; the 5 "orb" hits are
all incidental (squircle/calc-size/scrim contexts). The corpus is WWDC25-era; W-LIQUID targets an
iOS-27 surface. That gap is real — but it is a **targeted reference-study** (footage band-extraction
per the W-AUR-PAINTERLY discipline + a WWDC26-freshness check), NOT a second 32-facet SOTA sweep.
Re-running the broad sweep would re-tread facets 0/4/5/14/16/17/18/26-30 verbatim.

---

## 1. The existing corpus (read in full)

| Artefact | What it already settles for W-LIQUID |
|---|---|
| `docs/tranches/AX/research/liquidglass-research-corpus.json` (32 facets) | The Liquid Glass material model, squish physics (facet 18), spring canon (facet 14), restraint rules, PRM floor, specular lockstep. **Zero Siri coverage.** |
| `docs/tranches/AX/research/liquidglass-synthesis.md` §1.1 (W06) + §1.4 | The volume-preserving squash derivation verbatim: `scale: var(--squash) calc(1/var(--stretch))`, `stretch = 1 + clamp(|v|·k, 0, maxStretch)`, cap LOW ~1.06–1.10, the unused `velocity` ref on `useSpring` named as the seam, "reciprocal pairing is non-negotiable." |
| `docs/tranches/AX/research/dock-liquidglass-README.md` §7 "Squish" | The full press-deform recipe: `scale:` longhand (stacking-context note), instant-on-touch-down/spring-on-release, specular brightening in lockstep, velocity-live stretch with no separate timer, PRM strips the deform (vestibular trigger). |
| `docs/tranches/AX/waves/AX.W52-liquid-glass-material-overhaul.md` | The D19 edge-over-bloom material model + §6 easing doctrine + the press/hover scale registers the deforming root must keep reading. |
| `docs/tranches/AX/waves/AX.W53-tabs-unify.md` | The shipped elastic-stretch atom with exact magnitudes (§HandOff: cap `1.08`, tune band `1.06–1.10`, `--spring-snappy`, press `0.97`, 60ms release) — AND §"vs W23": a shared `useSquish`/`--*-max-stretch` family is ALREADY flagged as the future substrate W53 is the first consumer of. W-LIQUID is the second naming of that same facility. |
| `docs/tranches/AX/waves/AX.W42-liquid-morph-substrate.md` (675 lines, **state: planned** per `AX/PROGRESS.md:88`) | A complete spec for `useLiquidMorph` + `MorphGroup` + the `idle\|morphing\|settled` lifecycle — the morph half of the same facility family, never landed. |
| AX.W54/W55 waves | The `--glass-level` / `--glass-tint-*` axes the deforming root carries (W-LIQUID §3.2's material-continuity contract is "compose these on the deformation root" — already specified). |
| `src/components/custom/goo-blob/README.md` + `RESEARCH.md` | The blob's own research corpus (32-agent sweep, settled per `H-blob` F1 — W-BLOB3 §scope-fence explicitly forbids re-running it). |

## 2. The as-built deformation inventory (the facility's pieces, shipped)

Every behaviour in W-LIQUID §1's target list already exists in at least one component:

- **Squish (volume-preserving, capped, spring-released)** — shipped TWICE:
  - DOM/CSS: `src/components/custom/tabs/SegmentedTabs.vue:479` (`scale: var(--stretch) calc(1 / var(--stretch))`), `:637` (the underline X-only degenerate case `var(--stretch) 1`), `:441` (rest `--stretch: 1`); writer `src/components/custom/tabs/composables/useTabIndicator.ts:152-195` (cap read off the cascade, default `1.08`; PRM early-return at `:158`).
  - Shader: `src/components/custom/goo-blob/shaders/metaball.frag.ts:194-215` — `sa = 1.0 + tanh(speed * 1.6) * uStretch`, exactly `1/sa` perpendicular (area-preserving anisotropic map, `:185`), tanh-SATURATED per AX.W46 D5 so a fast flick caps smoothly instead of taffy-pulling.
- **Flex-toward-input (soft directional lean, surface-tension resistance)** — shipped on the blob:
  `metaball.frag.ts:318-326` (signed attraction: lean IN / shy AWAY, falloff 0.5),
  `useBlobPointer.ts:24-36,132` (spring-smoothed pointer + live velocity),
  `useBlobMood.ts:65-80` (the valence-signed, arousal-flattened lean magnitude — the AX.W46 D5
  anti-lunge re-solve: `lerp(-0.2, 0.6, v)·(0.7 + 0.15·a)`, config `pointerStrength 0.18`),
  and BANDED by `tests-visual/blob-render.spec.ts:572` (`CENTROID_SHIFT_MIN..MAX`, floor∧ceiling).
- **Squish-on-press, spring-release** — `src/composables/motion/useSpringPress.ts:62-98`
  (press→1/release→0 on response 0.25 / ζ 0.7, pointer-only by design); click-impulse as a one-shot
  underdamped oscillator `useBlobPointer.ts:62-66,134-138` (symplectic Euler).
- **The interruptible one-clock engine + group seam** —
  `src/components/custom/dock/composables/dockMorphContext.ts:39` (`DOCK_SPRING {response:0.32, ζ:0.7}`),
  `:125-241` (ONE `SpringProgress`, velocity-continuity rebase mid-flight, `respectReducedMotion` at `:216`).
- **The token cohort precedent** — `src/styles/tokens.css`: `--scale-press: 0.96` (~`:1476`),
  `--scale-press-btn: 0.97`, `--scale-hover-btn: 1.05`, `--scale-hover-dock: 1.1`,
  `--tab-indicator-max-stretch: 1.08`; the spring registers + §2 easing-doctrine table (`:172-192`).

What does NOT exist (confirmed): no `useLiquidFlex`, no `useLiquidMorph`, no `useSquish`, no
`MorphGroup` in `src/` — the only `MorphGroup` mentions are dockMorphContext comments naming it as
the W42 generalization-to-come. W-LIQUID §1's "no shared facility" claim is accurate at HEAD.

## 3. Grading W-LIQUID §2's research-brief items against the above

| §2 asks for | Derivable without new research? | Source |
|---|---|---|
| max deformation % | **YES** — DOM cap 1.06–1.10 (default 1.08); press floor 0.96/0.97; blob free-body ceiling `1 + uStretch` tanh-saturated | corpus facet 18; W53 §HandOff; tokens.css; metaball.frag.ts:215 |
| response/damping bands | **YES** — press 0.25/ζ0.7, dock 0.32/ζ0.7, snappy ζ≈0.85 (+~6.8%), the (duration, bounce) canon + the "iOS dialed DOWN" restraint rule | dock-liquidglass-README §4; useSpringPress.ts:69-70; dockMorphContext.ts:39 |
| squish-axis rules | **YES** — stretch ALONG travel/velocity axis, exact reciprocal perpendicular; X-only degenerate case for 1-D bodies | SegmentedTabs.vue:479,637; metaball.frag.ts:185-215 |
| volume-preservation constraints | **YES** — shipped twice; gate 2's `sx·sy ≈ 1` is checkable against either implementation today | same |
| what drives flex (proximity? audio? state) | **NO — the genuine gap.** The web-side answer (pointer/press/focus) is a design transposition the blob already models; the APPLE-side drive (audio amplitude vs assistant state vs touch) is unrecorded — zero Siri facets | corpus grep: 0 |
| material-continuity tricks | **MECHANISM yes, BANDS no** — shader surfaces track by construction (SDF-normal lighting); DOM raster transforms carry the painted W52 specular/edge with the deform; `--specular-x/y` are box-relative so pointer tracking survives the scale pair at ≤8% caps. Whether Apple does anything BEYOND this at the silhouette level is teardown-only | glass.css specular axes; metaball.frag.ts surface block |
| PRM/a11y story | **YES** — all three precedents gate; corpus's "deform is vestibular-trigger, strip under reduce" | useTabIndicator.ts:158; dockMorphContext.ts:216; dock-liquidglass-README §7/§8 |
| the engine/state machine | **YES** — rest→flex→squish→release maps onto useSpringPress press/release + W42's `idle\|morphing\|settled` spec; the group seam is dockMorphContext generalized | AX.W42 §RED-2, dockMorphContext.ts |

Score: 6 of 8 fully divinable, 1 split (mechanism/bands), 1 genuine gap.

## 4. Divined refinements (no new research required)

1. **Adopt the tanh-saturated stretch form over the corpus's clamp form.** The synthesis prescribes
   `1 + clamp(|v|·k, 0, max)` (dock-liquidglass-README.md §7); the blob LIVE-LEARNED past it —
   `metaball.frag.ts:198-215` records why (clamp plateaus abruptly; `tanh` stays smooth into the cap,
   AX.W46 D5). The shared facility's DOM stretch should be `1 + tanh(|v|·k)·(cap−1)`. Corpus + code
   answer this; research would not.
2. **Re-derive the tabs squish onto velocity at the re-point, killing the timer.** `useTabIndicator.ts:186-194`
   is distance-driven with a 60ms `setTimeout` release — the synthesis already flags the live-velocity
   form ("the deform decays exactly as the spring settles — no separate timer", §1.1 W06) and the
   unused `velocity` seam exists (`useSpring`'s `SpringRef`; `useBlobPointer.ts:132`). W-LIQUID gate 3's
   deletion-proof should land this as the behaviour-preserving-or-better swap.
3. **Seed the DOM flex band from the blob's banded lean, not from scratch.** `pointerStrength 0.18`,
   the flattened arousal multiplier (`useBlobMood.ts:74-79`), falloff 0.5, and the measured
   `CENTROID_SHIFT_MIN..MAX` band (`tests-visual/blob-render.spec.ts:572`) are the house's only
   LIVE-RATIFIED flex magnitudes. Gate 1's "within the researched band" can be born against these and
   re-anchored if the reference study moves them.
4. **`--liquid-max-stretch` defaults to 1.08 with the 1.06–1.10 tune band** — straight lift from
   `--tab-indicator-max-stretch` (tokens.css) + corpus facet 18 + W53 §HandOff. No external input needed.
5. **Reconcile `useLiquidFlex` (W-LIQUID) with the un-landed `useLiquidMorph` (AX.W42) BEFORE build.**
   W42 is still `planned` (AX/PROGRESS.md:88) and specs the same family (one spring scalar, MorphGroup,
   3-state lifecycle); W53 §"vs W23" already named the squish atom's future home (`useSquish`). Three
   names now point at one substrate family. The facility wave must either fold flex+squish INTO the
   W42 shape (deformation as a second axis cohort on the same engine) or record the explicit
   disjunction (morph = reshape between layout states; flex = transient deform around ONE state) —
   otherwise glass-ui mints its third bespoke deformation engine, the exact disease W-LIQUID names.
6. **Material continuity gate 4 is satisfiable from shipped mechanics.** The π sample of gleam-vs-bounds
   at mid-squish needs no Apple reference: the specular is painted IN the element (`.glass-material::before`,
   box-relative `--specular-x/y`), so a raster `scale(sx, 1/sx)` carries it exactly; the only artifact
   to watch is corner-radius ellipse distortion under non-uniform scale — sub-perceptual at the ≤1.08
   cap (the W53 indicator already ships it uncontested).
7. **PRM clause is copy-down, not research.** All three precedents + corpus §8's four-guard floor;
   the facility centralizes what each consumer hand-rolls (`useTabIndicator.ts:145-150`'s local
   matchMedia is the duplication the substrate absorbs).
8. **The press register stays pointer-only** (useSpringPress.ts header + corpus "never animate
   keyboard-initiated actions") — gate the facility's squish entry on pointer type, settled doctrine.

## 5. Genuine research gaps (what ONLY fresh external study answers)

1. **Siri-orb reference bands (the validated narrow lane).** Frame-by-frame study of iOS-26/27 Siri
   footage / credible teardowns: observed max silhouette deformation %, flex onset/settle times, and
   whether the deform is silhouette-level (SDF-like, the blob register) or transform-level (the capped
   scale/skew register) — this decides whether the DOM facility's transform pairs are a faithful
   transposition or whether a clip-path/border-radius channel is warranted. This is the
   W-AUR-PAINTERLY reference-anchored-bands discipline, scoped to ONE surface.
2. **The Apple drive-signal model.** What modulates the Siri deformation (audio amplitude, assistant
   state transitions, touch) — needed only to inform the web transposition mapping (pointer/press/
   focus), which the blob already implements; a few sources suffice.
3. **WWDC26 freshness check.** The corpus is WWDC25-era and its latest data point is "iOS 26.2 dialed
   down." WWDC26 is contemporaneous (June 2026): a targeted check for newly published Liquid Glass
   deformation/motion APIs (e.g. `.glassEffect` interactive-bounce parameters) that would supersede
   the corpus's inferred bands. Cheap, time-boxed, and the only item with genuine staleness risk.

Explicitly NOT gaps: the squish math, the caps, the spring registers, the engine architecture, the
group seam, PRM, the material-continuity mechanism, the specular model — re-researching these is churn
against facets 0/4/5/14/16/17/18/26-30 and the shipped code.

## 6. README state

- The facility itself has no README — correct, it is unbuilt (`useLiquidFlex`/`useLiquidMorph` absent
  from `src/`, confirmed by grep).
- `src/components/custom/dock/README.md` is accurate at the level audited (single-authority morph,
  FLIP/VT split; no false useLiquidMorph claim).
- **STALE-VOICE hazard:** `docs/tranches/AX/research/dock-liquidglass-README.md:3` presents
  "`useLiquidMorph` (AX.W42) is the substrate the dock is the FIRST consumer of" in shipped voice
  while `AX/PROGRESS.md:88` holds W42 at `planned` and no such file exists. A W-LIQUID implementer
  re-grounding from that research README would mis-read the substrate as landed. One-line re-ground
  note warranted when W-LIQUID's spec is hardened.
- `src/components/custom/goo-blob/README.md` carries the colorResolver-DI narration W-BLOB3 strips —
  in-flight (Batch-2 finisher), noted not graded.

## 7. Recommendation for the W-LIQUID §2 lane

Re-scope §2 from "a dedicated SOTA lane" to a **time-boxed reference-capture arm** with three
deliverables: (a) the Siri-orb observed-band table (max deform %, onset/settle, silhouette-vs-transform),
(b) the drive-signal note, (c) the WWDC26 delta-check against the 32-facet corpus. Everything else in
§2's brief (volume-preservation constraints, squish-axis rules, PRM, material continuity mechanism,
the parameter scaffold) should be COMPILED from §4 above into the facility spec before the research
arm runs, so the arm only fills the named blanks — research that arrives to an already-drafted
parameter table is verifiable; research asked to produce the whole model re-treads the corpus.
