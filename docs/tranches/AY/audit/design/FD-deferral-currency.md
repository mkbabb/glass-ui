# FD-deferral-currency — the rolling deferral audit (owed-ledger at HEAD, pass 2)

**Lane** FD-deferral-currency · **Date** 2026-06-09 (21:30) · **Branch** `at-dock-convergence`,
HEAD `3622192` · **Supersedes in place** the 20:49 pass-1 of this same file (committed at HEAD).
**Inputs read in full:** all 13 `audit/hardening/hc2/*.md`, `USER-HINGE-REGISTER.md`,
`USER-DECISIONS-2026-06-09.md` + its slider addendum, the §0 RG blocks of
`AY.W-{CON1,DOCK2,FF2,BLOB2}.md`, `chronic-deferrals.md §3` (the A–G taxonomy), `EXECUTION-DAG.md`
— **plus the band pass-1 could not absorb:** the 8-lane reality fleet
(`audit/reality/RA-*.md`, written 19:56–20:56, committed 20:58) and the two sibling design lanes
(`FD-substrate-pages.md` 20:59, `FD-storybook.md` 21:03), all landing AFTER pass-1 was written.
**Live verification this pass:** every pass-1 witness RE-RUN at HEAD (§0); three of the reality
fleet's highest-stakes claims independently REPRODUCED with my own probes + captures (§2);
3 new PNGs into `captures/FD-deferral-currency/` (`FD-defer2-*`), joining pass-1's 5.

**Verdict: DESIGN-DEFECTS — recalibrated toward the BROKEN boundary.** Pass-1's read stands (the
Batch-2 work underneath is strong; the close layer carries gate-passing residue + fabricated
evidence + one shipped regression + one user-decision supersession). What pass-1 could not see is
now on the ledger: the reality fleet found, and this pass reproduced, **shipped library surfaces
that are behaviorally BROKEN while their gates are green** — the W54 opaque escape is a dead
public API, a fired Toast can never be dismissed, the DockLayerGroup switcher rail is broken at
rest and its layer switch blanks the dock for ~650ms. The library as a whole is not broken (the
typography system graded TRULY-SOTA; the dock expand morph, the blob's lean/drag, and the aurora
preset roster are genuinely excellent) — but the publish-blocking set GREW this evening, and none
of the new defects has an owner wave.

---

## §0 — Currency check: every pass-1 witness re-verified at HEAD (this pass, not quoted)

| witness | HEAD state (re-run 21:10–21:25) |
|---|---|
| `W-CON1-{refit,autodrift}-mobile-*.png` | **still 1280×721** (fabricated-mobile; IHDR re-read this pass) |
| `W-GLASS-*.png` / `W-DOCK2-*.png` | **0 / 0 on disk** |
| `.cache/gates/AY-dock-rail-cohesion.json` | **still `fail`** (mtime 16:40 — never re-run over the landed `DockLayerGroup.vue:221` fix) |
| `.cache/gates/AX-dock-animation-live.json` | **still `fail`** (the synthetic born-RED occupying the slot; no real-surface GREEN ever persisted) |
| `.cache/gates/AX-aurora-painterly-statistics.json` | **still `fail`** (mtime 19:44 — the hc2 re-run against the stale `selectOption` driver) |
| R1 IHDR assert | `grep IHDR proof-live-verified-ledger.mjs` → **0** |
| W-CARRY manifest | `deferred-ledger-manifest.json` **does not exist**; register **still 3 items** |
| R3 `user-hinge` disposition | **0 hits** in `proof-disposition-live.mjs` |
| R4 ratchet | **0 hits** (`RATCHET\|baseline`) in `proof-no-god-module.mjs` |
| slides `proof-no-bespoke-constellation.mjs` | **does not exist** |
| Firefox slider-blur regression | **CONFIRMED in dist at HEAD** (built 18:47): `.slider-range` blur ships `-webkit-backdrop-filter:var(--slider-range-blur,…)` with **no unprefixed sibling** in `dist/glass-ui.css` |
| `VISUAL-ALLOWLIST.json` | still `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]` — the 6 pixel-changing closes never self-added |
| `:5173` port squat | **STILL LIVE** (PID 43028, the foreign `sci-report/usf/web` vite) — re-probed this pass |
| blob fleet artefacts | the 4 `pass` artefacts hc2 restored (19:37–19:39) HOLD |
| `AY-live-verified-ledger.json` | re-ran `pass` at 21:09 (the commit hook) — **over the same fabricated 1280×721 set** (R1 still unbuilt, so the gate still cannot see it) |
| stale-header batch (Tier 5) | all re-confirmed byte-for-byte: `layers.css:235` 0.55 fallback, `GlassDock.vue:2-6` 421-line banner (file is 624), `Slider.vue:242` scaleX comment, `proof-slider-two-only.mjs:6` INTEGRATED-CYLINDER header, `gates.mjs:370` dead W6 note |
| USER-DECISIONS slider addendum | BINDING, unabsorbed — and the addendum's named disposition owner (**the FD-slider-design lane**) has produced **no doc at HEAD** (`find FD-slider*` → 0); item #15 is still fully open |

Pass-1's §0 table is therefore CURRENT in every row. Nothing was discharged between the two passes.

---

## §0.5 — THE POST-CURRENCY DELTA: the reality band is UNROUTED

The `wf-ay-reality-audit` fleet was a BINDING user directive (`USER-DECISIONS-2026-06-09.md`:
"truly audit each implementation… not gate-green, not spec-said-so"). Its 8 lanes + the two design
lanes landed after pass-1 and found a defect band that **no AY wave owns**: `MASTER-RECAP` (18:41)
predates the fleet; `W-TRIAGE` is scoped to the 14 AX residual waves; no wave spec or DAG row
names any RA finding. This is the §4 Class-F/B signature (findings with no machine row) at fleet
scale — the T5 dead-pointer shape, recurring one layer up, within hours of being named.

Three of the band's headline claims were independently REPRODUCED by this lane (probes + captures
in §2) — they are not single-witness:

1. **The W54 opaque escape is a dead public API** (RA-glass-default §4; reproduced). Element
   `.glass-opaque` AND ancestor `--glass-level: 0` are byte-identical to baseline
   (`oklab(… / 0.65)` + `blur(12px)`); only `:root` works. `<Card tier="opaque">` silently
   paints resting glass. Root cause: the recipes consume `var(--glass-level)` inside the `:root`
   token definitions (substitution-vs-inheritance — the exact trap CLAUDE.md documents for
   `--glass-bg-dock`, shipped again through the same hole). `proof:glass-level` is regex-over-source
   — gate-green, behaviorally dead. The a11y brackets survive only because they happen to write
   at `:root`.
2. **A fired Toast can never be dismissed** (RA-anim-suite §6; reproduced — close-X clicked,
   still `data-state="open"`; still open 9s post-fire vs the documented ~5s dwell). Root cause:
   `use-toast.ts` hands `onOpenChange` (the React prop name); reka emits `update:open` — the
   listener key never binds, while the spread `open: true` keeps the root controlled-open. The
   memorized stale-reka-binding class, live on a shipped surface. Same frame shows the SYSTEMIC
   twin: the glass Card's `backdrop-filter` makes it the containing block for the `fixed`
   ToastViewport — toasts anchor to the card, not the viewport (a W54-wide trap for every fixed
   overlay inside glass).
3. **DockLayerGroup is broken on its own story** (RA-dock-anim §C; rail-at-rest reproduced —
   my `/dock/layers` rest frame shows the switcher rail as bare "A / L / L" letters, no icons,
   the outer two spilling OUTSIDE the glass capsule). RA's three-instrument capture additionally
   shows the layer SWITCH blanking the dock to an empty ~14px capsule for ~650ms before the new
   layer pops in complete in one frame — measured-green (box glides), paints-broken, and NO
   instrument in the W-DOCK1/W-DOCK2 set covers the layer-switch surface.

The rest of the band, verified by the RA lanes (captures on disk under `audit/reality/`):

4. **Blob pause→resume DESTROYS the render** (RA-blob C1): the page's own `DockBackgroundToggle`
   resume path erupts into full-frame strobing and settles as a charcoal slab — bead gone,
   reproduced twice (diverged-state signature ≈ unclamped dt on resume). The WCAG-2.2.2 control
   breaks the surface it pauses; the intersection-park path is clean.
5. **Blob config half-broken** (RA-blob B): `pointerAttraction` drops the SIGN (at −1 the bead
   lunges TOWARD the pointer, stronger than default); `stretch` has no measurable effect; the
   seed/harmony → hero color feed is DEAD (palette dots update, hero body byte-identical — the
   blurb's "fed LIVE to the one hero" is false as rendered).
6. **All five aurora-studio dropdowns are dead controls** (RA-aurora-config 1): literal
   `:is-open="false"` controlled binds with no `@update:open` (`AuroraAtomsPanel.vue` ×4,
   `config/MediumLayer.vue` ×1) — the headline medium picker is dead chrome and the Texture atom
   is unreachable. The component works elsewhere; the LabeledSelect required-controlled-`isOpen`
   API is the footgun. AND the spec built to catch this (`tests-visual/aurora-atoms-render.spec.ts`)
   FAILS at HEAD — stale native-`<select>` driver vs the reka re-skin, the same class as the
   painterly-statistics arm (#20). It is not wired as a `proof:*` (no package.json entry), so the
   failure is also invisible.
7. **Dock collapse blemishes** (RA-dock-anim §B): a one-frame hard cut-out of ALL content at
   collapse onset (W-DOCK1's "N/A (clip)" cell is exactly where it hides) + the −53% undershoot
   squash (the symmetric ±4.5% ring extrapolates the 38px pill to 17px). Plus the first-expand
   ~157ms stall and one unreproduced parked-pointer auto-collapse (state-machine audit note).
8. **Overlay enters speak tw-animate `ease`, not the §6 spring register** (RA-anim-suite):
   Dialog/Popover/Dropdown all enter on generic `ease`; the W13 spring-enter prop is mounted by
   NO story; `proof:animation-coherence` waves `animation:` shorthands through, so the gate
   cannot see the dialect gap. The SegmentedTabs indicator's declared `--spring-snappy` never
   paints positional overshoot on the anchor-inset path (squish imperceptible on adjacent hops).
9. **The Drawer story trigger is a silent no-op** (RA-anim-suite §4) — zero DOM mutations on
   click (the live-behind composition works only because it bypasses the trigger). Library-vs-story
   diagnosis owed; E11 already names the Drawer at the close.
10. **The hero-consumption plumbing is broken for 2 of 3 substrates** (RA-flow-fields §4 +
    FD-storybook §2 + FD-substrate-pages §5, three independent lanes converging):
    `compositions/hero`'s constellation renders 0px (the scoped `.constellation { position:
    relative; block-size: 100% }` beats `.story-hero-bg`'s absolute placement → h=0);
    auth-shell's fourier paints 100% occluded behind the full-coverage 0.8α card; the staged
    model itself (StoryHero) erases its declared substrate. No π spec covers either hero page.
11. **Gold CTA hover paints white-over-pale-gold** (FD-storybook defect 4) — the AW.W13
    "white over SATURATED gold" contract, gated by `proof:affordance-contrast`, is not what
    paints at the settled hover state. Gate-truth class.
12. **The front-door category index is dead** (FD-storybook defect 1) — 8 hash-hrefs on a
    web-history router; stale IA; opaque slabs in the glass hero.
13. **FD-primitives is an ORPHANED lane** — 65 captures on disk under
    `design/captures/FD-primitives/` with NO findings doc anywhere (the inverse of the W-GLASS
    shape: pixels with no doc). One Class-G line: recover or strike.

Calibration, named as readily (the fleet graded these EXCELLENT live): the typography system
(TRULY-SOTA, the one unqualified verdict); the dock expand morph (120Hz, real spring, lockstep —
"the eye agrees with the instrument"); the blob lean/drag ("the best interaction frames I captured
anywhere"); all 13 aurora presets visibly distinct with per-preset clone persistence exactly per
contract; the idle-quiet discipline (0 animations at idle on every route that should be); exits
uniformly clean. The defects above sit INSIDE genuinely strong work — which is exactly why they
must not ride to the tag.

---

## §1 — THE OWED-LEDGER (the BUILD QUEUE seed, ordered)

Class per `chronic-deferrals.md §3`: A live-capture debt · B consumer-#2/BOOK backlog · C cross-repo
· D god-module growth · E mobile/device fidelity · F user hinge · G ledger staleness/promise-relapse.
**BLOCKS** = must be GREEN/true before W-PUB1 (via E11/E12/E15/E16, or because publishing over it
falsifies a close claim or ships a known defect). **TRAIL** = can land after the tag without
falsifying the close. Numbering continues pass-1 (#1–41 unchanged and re-verified; #42+ new).

### Tier 1 — mechanisms first (unchanged from pass-1; every witness re-confirmed)

| # | item | owner wave | class | blocks? | size |
|---|---|---|---|---|---|
| 1 | **R1 IHDR dimension assert** in `proof-live-verified-ledger.mjs` (+ slides twin + synthetic self-test row) | W-CARDINAL-INFRA | E/A | **BLOCKS** | ~8 lines ×2 |
| 2 | **Port-squat identity probe** before `reuseExistingServer` attach — the trap is STILL ARMED (PID 43028 on :5173, re-probed this pass) | W-CARDINAL-INFRA | G | **BLOCKS** | ~10 lines |
| 3 | **W-CARRY as written** — manifest JSON (29 bookIds pre-authored), completeness clause, register 3→~29 | W-CARRY | B | **BLOCKS** (E12) | copy-in |
| 4 | **R4 god-module RATCHET** + CI promotion + the tag flip (W-GOD1 step 0 per HC-god1) — violators 4→6 this tranche | W-GOD1 | D | **BLOCKS** | baseline + ~15 lines |
| 5 | **R6 GREEN-on-real-surface clause** + artefact provenance stamp | W-CARDINAL-INFRA / W-CLOSE1 | G/A | **BLOCKS** (live RED instances: #9, #10) | ~20 lines |
| 6 | **R3 `user-hinge` register disposition**; until landed W-CLOSE1's FINAL re-prints USER-HINGE-REGISTER §B verbatim | W-CARRY / W-CLOSE1 | F | **BLOCKS** (manual fallback acceptable) | ~15 lines |
| 7 | **`proof:no-bespoke-constellation.mjs`** built in slides NOW, born-RED (copy-in at `AY.W-CON3.md §5`) | W-CON3 spec / L.W-ADOPT | C | TRAIL (build now, flips post-publish) | copy-in |

PLUS one Tier-1 rider this pass surfaced: **#42a — route the reality band.** The single cheapest
mechanism move of all: a disposition row per §0.5 item (owner wave named or minted), exactly the
machine-row discipline R3/W-CARRY exists for. Until routed, items #42–#52 below are this doc's
prose only — the recurrence of the class this tranche was formed to kill.

### Tier 2 — NEW: the reality band's shipped breakage (no owner wave at HEAD; all must be routed)

| # | item | proposed owner | class | blocks? | size |
|---|---|---|---|---|---|
| 42 | **The `--glass-level` escape no-op** — `<Card tier="opaque">`/`.glass-opaque`/ancestor sets are dead (only `:root` works; reproduced §2). Fix = element-level substitution (re-declare the level-bearing recipe legs at the rung classes) or re-spec the escape honestly `:root`-only AND make `tier="opaque"` paint solid directly. PLUS the behavioral gate arm (π readback, the `adaptive-glass.spec.ts` pattern) so `proof:glass-level` can ever fail | W-GLASS finisher (it already owns the `--glass-level` re-author) | A/G | **BLOCKS W-PUB1 OUTRIGHT** — a shipped, documented public API that does nothing (the #24 bar) | CSS re-plumb + ~30-line spec |
| 43 | **Toast dismissal dead** (`onOpenChange` → `onUpdate:open` in `use-toast.ts`/Toaster spread) + **#48 the fixed-in-glass containing-block trap** (portal the ToastViewport; mint the precept line — every `position:fixed` overlay inside a W54 glass surface re-anchors) | un-owned — mint into W-TRIAGE-adjacent or the W-ANIM1 build phase | A/G | **BLOCKS OUTRIGHT** — a shipped interactive surface that cannot complete its documented contract (capture shows the prose contradicted in-frame) | ~5 lines + portal move |
| 44 | **Blob pause→resume render destruction** (unclamped dt on the `paused`-prop resume; intersection path clean). The WCAG-2.2.2 control breaks its own surface; a "motion resumes" assertion would PASS the wreckage — the gate needs a post-resume integrity readback (mask-area/L band) | W-COHERE E1-adjacent / the blob band finisher | A | **BLOCKS** (a11y control class) | dt clamp + gate arm |
| 45 | **DockLayerGroup broken**: (a) switcher rail broken AT REST (reproduced — bare letters spilling from the capsule); (b) layer switch blanks ~650ms then pops (RA 3-instrument evidence); (c) NO gate covers the layer-switch surface (W-DOCK1 overview-only; dock-animation-live collapse↔expand-only) | W-DOCK2 RG-extension (its own component, its own close) | A/G | **BLOCKS** (the dock is the tranche's headline; W-DOCK2 cannot close `live-verified` over a broken sibling surface) | fix + one spec arm |
| 46 | **Aurora studio dead selects ×5** (`:is-open="false"` literal; medium picker dead, Texture unreachable) + the **LabeledSelect footgun** (required controlled `isOpen`, no uncontrolled default) + the **stale `aurora-atoms-render` driver** (fails at HEAD, unwired as proof:*) | demo fix = minutes; footgun + spec re-drive = W-SB1 / W-AUR-PAINTERLY finisher (joins #20, same stale-driver class) | A/G | **BLOCKS** close-honesty (the BINDING reality directive asked "ACTUALLY robust configurator?" — the answer is NO while the headline atom is dead) | `v-model:is-open` ×5 + API default + spec re-drive |
| 47 | **Blob engine defects**: `pointerAttraction` sign dropped (shy-away lunges); `stretch` atom no-op; hero color feed dead post-mount (`paletteStops` not reactive) | the blob band finisher / W-COHERE E1 | A | sign-drop **BLOCKS** (shipped prop does the opposite of its contract); stretch + color-feed TRAIL into W-COHERE | engine fixes |
| 49 | **Drawer story trigger silent no-op** — diagnose library-vs-story (live-behind path works, so likely the trigger seam) | W-SB1 triage; if library-level → joins #43's bar | A | **BLOCKS pending diagnosis** (E11 names the Drawer) | diagnosis first |
| 50 | **Gate-truth additions from the band**: `proof:animation-coherence` blind to `animation:` shorthands (the overlay-enter dialect invisible); `proof:glass-cohesion` coverage hole (inventories only files already carrying a glass marker — Progress/ToggleGroup invisible); `proof:affordance-contrast` vs the painted gold-CTA hover (#11 in §0.5) | W-ANIM1 (already specs the falsifiable rubric — widen its rows) / W-GLASS / W-A11Y-PERF | G | TRAIL as gates, but the W-ANIM1/W-SB1 SPECS must be widened BEFORE dispatch (the #33 pattern — else the rows are missed) | spec widening |
| 51 | **Hero-consumption plumbing** — constellation h=0 (scoped-root positioning contract vs `.story-hero-bg`), fourier 100% occluded, StoryHero full-coverage card erases every declared substrate; no π spec on any hero page. Three lanes converged on this independently | W-SB1 spec-widening (pre-dispatch, binding) + the root-positioning CONTRACT decision is library-side (Constellation vs FourierField disagree) | A/B | TRAIL to W-SB1/W60 — but the W-SB1 spec widening is a PRE-DISPATCH obligation | spec + chassis fix |
| 52 | **FD-primitives orphan** — 65 committed captures, no findings doc; recover the lane output or strike the captures with a note | finisher-settle (Tier 5 batch) | G | TRAIL (one sitting) | doc |

### Tier 3 — the PAST-DUE and BLOCKING captures (pass-1 Tier 2, unchanged; all re-confirmed)

| # | item | owner wave | class | blocks? |
|---|---|---|---|---|
| 8 | **W-DOCK2 RG1** — own-surface light+dark frame-series on `/dock/overview` (0 PNGs at HEAD); W-COHERE G4 rides it (E16) | W-DOCK2 | A | **BLOCKS** |
| 9 | **W-DOCK2 RG2** — persisted GREEN `proof:dock-animation-live` on the REAL surface (slot still holds the synthetic born-RED FAIL); persist with the provenance stamp (#5) | W-DOCK2 | A/G | **BLOCKS** |
| 10 | **`proof:dock-rail-cohesion` re-run + persist** — fix in source since 16:40, artefact still `fail`, PROGRESS claims "HG5 LANDED" | W-DOCK2 finisher | G | **BLOCKS** (minutes) — and now rides WITH #45 (same component, one sitting) |
| 11 | **W-GLASS capture arm** — the 8 named PNGs + a PERSISTED π PASS of `glass-cohesion.spec.ts`; requalify `W-GLASS-DELTA.md:114`; restamp `planned`→`dev-complete` | W-GLASS | A/G | **BLOCKS** (E11) — now rides WITH #42 (same wave, one close) |
| 12 | **W-CON1 RG2** — the fabricated-mobile re-capture, PAST-DUE (working 390 protocol exists; ~30 min) | W-CON1 | E/A | **BLOCKS** |
| 13 | **W-BLOB2 RG2/RG3** — demonstrative mood-lean series + cream-default mood frame (mood hero still seeds RED, `blob.vue:32,:67` — RA-blob re-confirmed live) | W-BLOB2 / W-COHERE | A | **BLOCKS** |
| 14 | **W-BLOB3 two numbers** — `[W-BLOB3-π]` centroid lines + the G4 frame-budget number into the DELTA; fix the false "no twin" sentence; allowlist line | W-BLOB3 finisher | A/G | **BLOCKS** (cheap) |
| 15 | **W-SLD1 THIRD restatement** — the BINDING addendum supersedes resolution (b): continuous-rounded-cylinder standard + the value.js spectrum reference; `isCircle` clause re-locked onto integrated-continuous geometry; recapture (current PNGs clip the knob's bottom arc); H7 ratification runs against the NEW standard. **NEW this pass: the addendum's named disposition lane (FD-slider-design) produced no doc — the supersession has NO live owner artefact; treat as un-started** | W-SLD1 build phase + the FD-slider-design lane (re-dispatch) | F/A | **BLOCKS** |
| 16 | **W-CON1 RG3** — the shear arm (portrait→landscape transpose, sx≠sy coverage ≥0.9) | W-CON1 | A | **BLOCKS** (lower priority than #12) |

### Tier 4 — gate-truth repairs on closed waves (pass-1 Tier 3, unchanged)

| # | item | owner | blocks? |
|---|---|---|---|
| 17 | **Freeze tautology fix** (`overlayPulseRadius` recomputes its expected constant — a live-`now` regression keeps the gate GREEN) + the freeze PARK (`paintStatic`; the frozen canvas repaints at 60fps forever) | W-CON3 finisher | **BLOCKS** |
| 18 | **Cool-tolerance regression** (spec ±5% / gate 6% / binding run 5.2% / mobile 13.1% ungated / self-contradicting `:18` comment) | W-CON2 finisher | **BLOCKS** |
| 19 | **Asymmetric-ramp spec amendment** (`--constellation-well-ramp` comment LIES at both declaration sites) | W-CON2 spec + W-DOC1 | **BLOCKS** |
| 20 | **Painterly-statistics selector fix** (stale `selectOption` vs reka LabeledSelect; artefact `fail` at HEAD under a live-verified row) — now ONE class with #46's atoms-render driver: fix both in one re-drive pass | W-AUR-PAINTERLY finisher | **BLOCKS** |
| 21 | **T5 dead-pointer re-route** (×4 sites into the terminally-RETIRED W-AUR-WEBGPU-DECIDE; H8 default (c)→(a)) | W-AUR-PAINTERLY / hinge H8 | **BLOCKS** (the re-point is unconditional) |
| 22 | **The −5/3 radii respacing** (`mediums.glsl.ts:385-387` byte-unchanged; H8's default path) | W-AUR-PAINTERLY finisher | as H8's default path |
| 23 | **Aurora gate-hardening riders** (foreign-server sentinel → #2; 0.0012 A-margin disclosure; residual ratchet floors) | W-AUR-PAINTERLY finisher | TRAIL |

### Tier 5 — W-A11Y-PERF pre-dispatch hardening + the shipped regression (pass-1 Tier 4, unchanged)

| # | item | owner | blocks? |
|---|---|---|---|
| 24 | **Firefox slider-blur regression** in `dist/glass-ui.css` (webkit-only decls; O-2a scope must widen to `dist/glass-ui.css` + strip the SFC hand pairs) | W-A11Y-PERF O-2a | **BLOCKS W-PUB1 OUTRIGHT** |
| 25 | **O-1 strict-ancestor no-op re-derivation** (`@container style()` evaluates against the PARENT; the spec aims the bucket at the rung element). NOTE the family resemblance to #42 — TWO W54/W55 mechanisms shipped/specced through inheritance-vs-substitution traps; whoever fixes #42 should hold both models in hand | W-A11Y-PERF spec owner | **BLOCKS** (spec-edit before any build agent runs) |
| 26 | **Supersede `proof:liquid-glass-material` clause 5** (false-GREEN webkit substring regex) | W-A11Y-PERF G2 | **BLOCKS** |
| 27 | **O-5 contrast oracle** (passes at exactly 4.6:1 over solid `--card`, zero headroom; the glass-aware re-derive is GUARANTEED born-RED) | W-A11Y-PERF | **BLOCKS** (E11) |
| 28 | **C6 per-rung AA** (extend `KINDS` to all five rungs) + **C7 cascade-guard** (non-inheriting floor + synthetic ancestor-defeat assert) | W-A11Y-PERF / W-GLASS | **BLOCKS** (E11) |

### Tier 6 — restamps, allowlist curation, honesty edits (pass-1 Tier 5 + one)

| # | item | owner | blocks? |
|---|---|---|---|
| 29 | **Allowlist curation breach ×6** (add W-CON2/CON3/AUR-PAINTERLY/BLOB3/DOCK3/SLD1; makes the two fabricated DELTA claims retroactively true; amend the two wave-spec engine misstatements) | W-CARDINAL-INFRA curation | **BLOCKS** |
| 30 | **R7 restamp batch** (AUDIT-LEDGER rows 2+10; W-FF2 `planned`→`live-verified` EARNED; W-GLASS `planned`→`dev-complete`; W-SLD2 9→7 cases; W-SLD1 judgment-pending rider; W-DOCK3 released-frame re-word) | finisher-settle | **BLOCKS** (cheap) |
| 31 | **Stale gate/source headers** (`proof-slider-two-only.mjs:6,10,435`; `Slider.vue:242`; `GlassDock.vue:2-6` banner; `gates.mjs:370`; `layers.css:235`) — all re-confirmed this pass | W-DOC1 / W-GOD1 | TRAIL |
| 32 | **`--glass-backdrop-luma` RETIRE-or-RESERVE** (zero consumers; invariant-answerable, default RETIRE) | W-GLASS disposition | **BLOCKS** (one line) |
| 33 | **W-DOC1 spec widening** (aurora README ledger ×5 ACES + tree + mediums + gates + WebGPU orphans; blob README stop literal; F1.3/F1.5 notes) — MUST be widened BEFORE dispatch | W-DOC1 | TRAIL (pre-dispatch obligation) |
| 52 | (from Tier 2) FD-primitives orphan — fold into this batch | finisher-settle | TRAIL |

### Tier 7 — user hinges to SURFACE at close (unchanged; W-CLOSE1 re-prints §B verbatim)

| # | hinge | default-if-silent | blocks? |
|---|---|---|---|
| 34 | **H4/H5/H6** — G-4 VT / G-5 drawer-spring / G-6 cartoon-quiet: book or retire | BOOK with n:2 trigger; H5 strongest retire | **BLOCKS** W-CARRY Leg 3 (defaults dischargeable) |
| 35 | **H7 slider ratification** — SUPERSEDED-IN-PART by the addendum (#15); target is the cylinder restatement | per #15 | **BLOCKS** via #15 |
| 36 | **H8 aurora ceiling** — accept single-pass A/β or fresh Kuwahara wave | (c)→(a): respacing (#22) then accept-as-register | **BLOCKS** as surfacing obligation |
| 37 | **H9 feedback-coder audience lock** | (a) research | TRAIL (L-side) |

### Tier 8 — cross-repo trailers (unchanged)

| # | item | owner | blocks? |
|---|---|---|---|
| 38 | **W-DOCK3 L re-home row** (the verify-row exists in NO L doc) | L.W-ADOPT / L close checklist | TRAIL (author now) |
| 39 | **H3 round-4 slides row** (no slides-side REFINEMENT-DECISIONS row) | slides round 4 | TRAIL |
| 40 | **HC-L-deck batch** (D1 copy-gate RED blocks every L close; D3 meta title; D5 zero L captures/vacuous ledger; 8-of-13 specs stale; L PROGRESS doubly stale; D7 underline unowned) | L tranche | TRAIL HINGE 1 |
| 41 | **W-LIQUID facility-build recheck** (WWDC26 session-list through June 12; `contrast-color()` multi-candidate BLOCKED-ON-PLATFORM) | W-LIQUID | TRAIL |

**Explicitly NOT on this ledger:** the planned-wave band (W-FF2 build, W-SCALE1/2, W-SB1-3, W-IC1,
W-CONVERGE, W-CSS1, W-LEG1, W-COLOCATE, W-LIVE1, W-NDA, W-TRIAGE, W-CONSUMER, W-DELTA0, W-GOD1
carves, W-COHERE, W-UNDERLINE, W-MOTION2, W-ANIM1, W-BLOB-GLASS, W-LIQUID) — scheduled work with
authored specs, blocking W-PUB1 via E15 by construction. BUT three of those specs now carry
PRE-DISPATCH widening obligations from this pass: **W-SB1** (#50/#51 + the FD-storybook/
FD-substrate-pages gap tables), **W-ANIM1** (#50's animation-shorthand blindness + the overlay
enter-dialect rows + the tabs anchor-path spring gap), and **W-DOC1** (#33). The reality band's
design-improvement rows (substrate self-staging, blob page recomposition, fourier warm-start,
front-door index) are W-SB1/W60 INPUTS, not deferral debt — they are listed in the two FD docs'
own gap tables and must be folded at spec-widening time.

---

## §2 — The live drive (this pass: 3 reproductions + the pass-1 set re-affirmed)

New captures (`captures/FD-deferral-currency/FD-defer2-*.png`, driven on :5199 after an identity
probe — the page title IS the glass-ui demo; the :5173 squat remains armed):

- **`FD-defer2-glass-opaque-noop.png`** — three plates over loud stripes: `glass-resting`,
  `glass-resting glass-opaque`, ancestor `--glass-level: 0`. All three identically translucent;
  computed readback byte-identical (`oklab(0.9858… / 0.65)` + `blur(12px) saturate(1.05)` on all
  three). The shipped opt-out from the MAXIMAL glass default does not exist off `:root`. As a
  designer: the stripes pouring through a plate labeled "opaque" is the single frame that should
  open the W-GLASS finisher's brief.
- **`FD-defer2-toast-undismissable.png`** — the "Saved draft" toast still open ~9s after firing,
  after its close X was clicked (probe: `open0:1, closeClicked:true, afterClose:1, afterDwell:1`)
  — anchored to the story card's TOP-right while the prose beneath it reads "Toasts render
  bottom-right on desktop… Swipe or close-button dismiss." One frame, three falsified contract
  clauses (placement, dismissal, dwell).
- **`FD-defer2-dock-layers-rest.png`** — `/dock/layers` AT REST: the "Switcher rail" specimen
  renders as three bare letters (A/L/L), no icons, the outer two spilling outside the glass
  capsule. The manifest's "Figma-style switcher rail" claim does not paint, before any
  interaction. (My layer-SWITCH probe mis-clicked a BottomDock nav tab and was discarded — the
  two mislabeled frames were deleted rather than kept; RA-dock-anim's three-instrument capture of
  the ~650ms blank-out stands as the evidence of record.)

Pass-1's five captures and judgments stand (re-affirmed on disk): the dock overview reads as ONE
quiet glass system in both schemes (the strongest owed-capture surface in the queue — #8 remains
~an hour against a surface that will grade well); the slider's light-mode track invisibility and
the addendum-vs-shipped register mismatch are real (#15); the fourier hero is gate-green and
visually thin (the W-FF2 RG verdicts visible in one frame); the blob mood hero still seeds RED.

Process note, repeated with feeling: this pass dodged the :5173 squat (still live, PID 43028) and
the SwiftShader wedge (my first drive hung exactly as RA-anim-suite's method note warns; the
ANGLE/Metal flags fixed it). Two tribal-knowledge traps a design auditor must know to produce
honest artefacts — both have Tier-1 mechanism rows (#2) or belong in the capture protocol.

---

## §3 — Shape of the queue (the orchestrator's read, updated)

- **The publish-blocking set grew from 2 to 5 outright.** Pass-1: #24 (Firefox slider blur) +
  #15 (the slider supersession). This pass adds #42 (glass-opaque dead API), #43 (toast
  undismissable), and #44 (blob resume wreck) at the same bar — known shipped defects in the
  artefact the tag would publish. #45/#46 block through close-honesty rather than the artefact
  itself, but #45 rides the same component as the already-blocking #10.
- **Mechanism-first is now thrice-proven.** hc2 scored 1/7 mechanisms built; the port squat then
  poisoned five artefacts the same day; and tonight a fleet-scale defect band landed with NO
  routing row (#42a) — three independent demonstrations in one day that the prose→machine-row
  conversion is the binding constraint. Tier 1 is still each ≤40 lines.
- **The reality band's fixes cluster cheaply.** #43 is a one-key rename + a portal move; #46's
  demo half is five `v-model:is-open` bindings; #42's honest fallback (re-spec `:root`-only +
  make `tier="opaque"` paint solid directly) is small if the element-path re-plumb is deferred
  with a recorded decision. The expensive-looking items (#44 dt clamp, #45 layer-switch FLIP) are
  bounded engine fixes with existing harnesses.
- **Pairing rule for the finishers:** #42+#11 (one W-GLASS close), #45+#10+#8/#9 (one dock
  sitting), #46+#20 (one stale-driver re-drive pass), #47+#13 (one blob sitting). The queue
  collapses to ~6 working sessions plus the planned band.
- **The fastest honest path to HINGE 1:** Tier 1 (+#42a routing) → the Tier 2 breakage paired
  into the Tier 3 capture sittings as above → Tier 4 finisher amendments → Tier 5 (spec
  re-derivations FIRST: #25, #26) → Tier 6 restamp batch → planned band per the DAG (with the
  W-SB1/W-ANIM1/W-DOC1 specs widened pre-dispatch) → W-CARRY/W-CLOSE1 with Tier 7 re-printed
  verbatim.
