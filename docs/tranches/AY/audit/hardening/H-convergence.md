# H-convergence — the CONVERGENT OPTIMUM acceptance bar (AY + L)

Adversarial hardening lane. The job: define concretely, per-band, what "AY + L PERFECTED"
MEANS — the all-green checklist that means STOP — and red-team the AY/L plans against the
LIVE repo state. The headline finding is that AY.md + AUDIT-LEDGER.md are STALE: they plan
(and mark UNADDRESSED/DEFERRED) a large fraction of work AX already SHIPPED with green gates
and on-disk DELTAs. The convergence bar must be re-anchored on the live gate fleet, not on the
ledger's prose status.

Verdict: **GAPS-FOUND** — the plan is not wrong in aim, but its acceptance bar is mis-calibrated
(claims-as-undone-what-is-done; under-specs the cardinal-lesson carry-debt; no net concrete
STOP checklist), and three concrete convergence holes have no gate.

---

## §0 — the convergence bar (the all-green STOP checklist)

This is the deliverable: the per-band, evidence-bearing acceptance set. "AY + L perfected"
== every row GREEN with a NAMED artefact. Rows marked **[DONE-VERIFY]** are already green at
HEAD (re-confirm, do not rebuild); **[OPEN]** is genuine remaining work; **[DEBT]** is a
cardinal-lesson carry the plan under-names.

### Band A — SOTA component perfection
| # | criterion | binding artefact | state |
|---|---|---|---|
| A1 | Constellation warp-on-click lands the focal mark on the nearest node, spring-eased | `proof:constellation-warp-live` (π spec reads `field.warp.{x,y}` per frame) + a DELTA png | **[DONE-VERIFY]** engine shipped AX.W17; gate exists |
| A2 | Constellation ≥2 easter eggs fire, PRM-inert | a NEW gate (none exists) + capture | **[OPEN]** no konami/supernova/gravity-well in `constellationField.ts` |
| A3 | Constellation alpha tuned both modes (`--constellation-alpha`) | `proof:constellation-tokens` + light+dark capture | **[DONE-VERIFY]** token exists; tune+capture owed |
| A4 | Aurora full OKLAB/OKLCH in-shader, simplified atoms | `proof:aurora-oklch-interp` + `proof:aurora-space-gamma` + `proof:aurora-atoms-roundtrip` | **[DONE-VERIFY]** gates exist green-able |
| A5 | Aurora van-Gogh/oil-pastel reads pigment-true + distinct (the "stunning" bar) | `proof:aurora-painterly-statistics` (real-GPU π) | **[OPEN]** artefact = `status:fail`; born-RED, never passed live |
| A6 | Blob visual/lighting/interaction perfected | `proof:blob-*` fleet (smin/spec/mood/live-truth) green + DELTA | **[DONE-VERIFY → spot-check]** fleet exists; live-truth owed |
| A7 | Dock shell↔items LOCKSTEP (≤1-frame split), one-scalar morph | `proof:dock-animation-live` + `proof:dock-opacity-lockstep` (PASS at HEAD) + DELTA | **[DONE-VERIFY]** both gates green; W45-DELTA captured |
| A8 | Dock-with-slider works; slides progress bar is a PAGE element not dock-baked | a NEW gate or the existing dock-hold contract + capture | **[OPEN]** the composition story moved/absent; needs re-grounding |
| A9 | Fourier-field abstracted to a glass-ui element OR formally booked w/ trigger | export OR a booked-substrate row | **[OPEN]** research preserved (`W43-fourier-field-SOTA.md`); not abstracted |

### Band B — library-wide systems
| # | criterion | binding artefact | state |
|---|---|---|---|
| B1 | ONE comfort scalar `--ui-scale`; every control h/font/glyph derives; WCAG-44 coarse floor | `proof:ui-scale` (PASS) + the π render-grows arm | **[DONE-VERIFY]** source green; π lockstep render owed |
| B2 | slider zoo → EXACTLY standard + spectrum; all consumers migrated | `proof:slider-two-only` (PASS) + `proof:speedtest-boundary` | **[DONE-VERIFY]** cardinality + design frozen green |

### Band C — storybook + docs
| # | criterion | binding artefact | state |
|---|---|---|---|
| C1 | named-route prune actioned (header-ribbon/native-top-layer/use-token-color resolved) | `proof:no-orphan-demo-route` (PASS) + manual route triage | **[OPEN-PARTIAL]** gate green but 3 named routes still present in demo/ |
| C2 | sidebar re-sectioned (aurora/blob surfaced; dock consolidated); speedtest boundary | `proof:storybook-ia` + `proof:speedtest-boundary` (PASS) | **[DONE-VERIFY]** |
| C3 | consistent animation/design/interaction language across EVERY story | `proof:story-language` + `proof:animation-coherence` + cross-component audit | **[DONE-VERIFY]** gates exist |
| C4 | research-backed READMEs (dock/constellation/aurora/blob) cite their research | each README present + a cited RESEARCH.md | **[OPEN]** READMEs exist; NO `RESEARCH.md` docs exist to cite |

### Band D/E — chassis + the AX close
| # | criterion | binding artefact | state |
|---|---|---|---|
| E1 | 4 god-modules carved <500, return-shapes byte-identical | `proof:no-god-module` (.css-aware, in CI) | **[OPEN]** 694/689/608/510 all still present |
| E2 | legacy-gate hardening (no-retired-survivor, tag-parity, var-in-arbitrary, commentary) | `proof:no-legacy-commentary` + the legacy fleet | **[DONE-VERIFY]** |
| E3 | the 7 AX `dev-landed · live-pending (DELTA owed)` rows flipped to live-verified | `proof:live-verified-ledger` + 7 DELTAs (W19/W45/W52/W53/W56/W57/W59) | **[DEBT]** the cardinal carry AY.md does NOT name as a wave |
| E4 | AX FINAL.md written; `proof:ay-final` green; budget rebaseline | `proof:ay-final` (ABSENT — must be authored) + FINAL.md | **[OPEN]** no FINAL.md; no `proof:ay-final` gate exists |
| E5 | master-merge + provenance publish | npm tag + provenance run | **[OPEN]** USER-DOMAIN hinge |

### Band L — slides convergence
| # | criterion | binding artefact | state |
|---|---|---|---|
| L1 | 5/6/7 cohesive close arc; slide 6 xray-redolent (vs the real site) | storyboard review + capture vs `xray.friday.institute` | **[OPEN]** |
| L2 | nutrition-label claim TRUE | `SlideAsk.vue:75` reworded; conformance gate | **[OPEN]** "will publish" still reads as a claim |
| L3 | mobile uncramped, xray full-height, Open-AI-XRAY btn removed, no occlusion (all 7) | portrait captures + axe | **[OPEN]** chronic F→H→AX |
| L4 | access-key modal glass-styled; locked slides blurred+lock; pptx light/dark popover | modal/locked/pptx captures | **[OPEN]** DeckGate.vue + DeckSettings.vue exist, restyle owed |
| L5 | slides DELETES bespoke `constellation.ts`, consumes `@mkbabb/glass-ui/constellation` | `proof:no-bespoke-constellation` (ABSENT) + deck builds on lib | **[OPEN]** bespoke copy PRESENT; slides pins glass-ui 3.7.0 (not AY) |
| L6 | feedback-coder honesty pass (1,845 / 0.72 / one-human's-level / S5) | each claim true+sourced + capture | **[OPEN]** |
| L7 | deck DEPLOYED live (slides.friday.institute 200 + DELTA) | live HTTP 200 + capture | **[OPEN]** held at 3765d52, NOT deployed |

**STOP == every row [DONE-VERIFY] re-confirmed green AND every [OPEN]/[DEBT] row closed green
with its named artefact.** No row may close on a prose claim — the `proof:live-verified-ledger`
gate makes `live-verified` un-mintable without an on-disk PNG DELTA (the founding chronic).

---

## §1 — adversarial findings (source-grounded)

### F1 — AY.md + AUDIT-LEDGER are STALE; they plan-as-undone what AX shipped green
The ledger marks #2 warp **UNADDRESSED**, #9 slider **DEFERRED**, #4 touch/type **DEFERRED**,
#5 dock-lockstep **CHRONIC**. But at HEAD these gates PASS:
- `proof:slider-two-only` → PASS (`.cache/gates/AV-slider-two-only.json`); standard+spectrum frozen.
- `proof:ui-scale` → PASS; the `--ui-scale` master comfort scalar + WCAG-44 coarse clamp shipped (AX.W51).
- `proof:dock-opacity-lockstep` → PASS; fade↔morph on ONE token, 0-frame split by construction (AU.W2/AW.W2).
- `proof:glass-one-model` → PASS; `proof:no-orphan-demo-route` → PASS; `proof:speedtest-boundary` → PASS.
- Constellation warp engine SHIPPED (`constellationField.ts:64-271` — the AX.W17 focal-warp spring), exported on `/constellation` (`package.json:316`), gated by `proof:constellation-warp-live`.

**The convergence risk:** AY re-runs research→impl loops to "deliver" already-shipped work,
burning ~10 of 22 waves on confirm-not-build. The plan must be re-anchored: most Band B/C +
half of Band A are **VERIFY-not-BUILD**. Fold-into: a NEW pre-wave AY.W0 reground that runs
the full gate fleet and re-stamps the ledger to the live truth BEFORE any impl wave dispatches.

### F2 — the cardinal-lesson DEBT is un-named (the 7 DELTA-owed carriers)
`docs/tranches/AX/PROGRESS.md:232` names 7 rows `dev-landed · live-pending (DELTA owed)`:
W19/W45/W52/W53/W56/W57/W59. These are headless-green over an UN-captured live surface — the
exact founding chronic the `proof:live-verified-ledger` gate (AX.W62) was built to forbid.
AY.md's Band E has NO wave that flips these to live-verified. A close that ships `proof:ay-final`
green while 7 carriers stay live-pending re-mints the inflation. Fold-into: **W-CLOSE1 MUST
absorb the 7-DELTA capture** as a HARD GATE clause (`proof:live-verified-ledger` green over the
flipped rows), or a dedicated AY.W-DELTA carry-wave.

### F3 — `proof:ay-final` does NOT exist; AX FINAL.md is absent
`package.json` has no `proof:ay-final` script (grep confirms ABSENT). `docs/tranches/AX/FINAL.md`
does not exist. W-CLOSE1's hard gate ("`proof:ay-final` green") cites a gate that must first be
AUTHORED. Under-specced: the wave spec must specify the gate's CLAUSES (FINAL.md presence + the
inheritance cross-walk + the budget rebaseline diff + the no-open-live-pending assert) — else
"green" is undefined.

### F4 — the aurora "stunning" bar is the ONLY genuine artistic OPEN, and its gate is born-RED
`proof:aurora-painterly-statistics` wrote `status:fail` to its artefact (`.cache/gates/AX-aurora-painterly-statistics.json`)
— the van-Gogh/oil-pastel/crayon/oil "pigment-true + distinct" assert times out (no live π
harness running). The gate's fail-closed contract (`scripts/proof-aurora-painterly-statistics.mjs:25-29`)
exits NON-ZERO when the device IS present and the statistics miss. This is the real W-AUR3
work, and it CANNOT close on a source gate — it needs a real-GPU dev-Mac live capture (the
binding close per the script's own comment). The convergence bar for A5 must require the
real-GPU artefact, not the SwiftShader skip-to-green path.

### F5 — easter eggs (A2), fourier abstraction (A9), READMEs-cite-research (C4): genuinely OPEN, NO gate
- No `konami|supernova|gravity-well|double-tap|flock` token anywhere in `src/components/custom/constellation/`.
- No `RESEARCH.md` exists for aurora/blob/dock/constellation — the READMEs exist but cannot
  "cite their research" (C4 is unsatisfiable as written). The W-*1 research waves must PRODUCE
  the RESEARCH.md, and W-DOC1's gate must assert the README links it.
- Fourier-field: `W43-fourier-field-SOTA.md` research preserved; not abstracted. W-FF2's
  hard gate must honor the ≥2-consumer bar (export OR formally book with a trigger) — as
  written it is exempt-by-OR, which is correct, but the booking trigger is unspecified.

### F6 — dock-with-slider (A8): the composition story moved; no live gate
CLAUDE.md cites `demo/stories/compositions/dock-with-slider.vue` as the proof story, but that
path does not resolve (the dock+slider composition now lives folded into `demo/stories/dock/`).
The Slider keepDockOpen contract source exists, but there is NO `proof:dock-with-slider`
gate and no captured DELTA of the integration working. AND the user's "slides bottom progress
bar must NOT be baked into the dock" half is a SLIDES (L) concern with no glass-ui-side assert.
A8 is under-specced: it needs (a) a re-grounded composition story, (b) a live capture of a
drag holding the dock open, (c) the L-side assert that the progress rail is a page element
(`proof:deck-progress-rail` EXISTS in glass-ui — verify it binds the slides case).

### F7 — the `[DONE-VERIFY]` rows need the π render-arm, not just the source gate
The cardinal lesson: a green source gate over a still-broken live render is NOT done. `proof:ui-scale`
(B1) explicitly says its source arm proves the calc STRUCTURE; "the π arm proves the render
grows." Every `[DONE-VERIFY]` row carries this dual-arm obligation. The convergence bar must
state, per row, WHICH arm is satisfied and which is owed — a single bit ("gate passes") is the
inflation vector. This is the deepest H-convergence requirement: the STOP checklist is not
"all gates green," it is "all gates green AND every visual-load-bearing row has a fresh DELTA."

---

## §2 — chronic misses (carried ≥2 tranches)
- **Mobile slide polish (L3)** — squish/occlusion/negative-space/xray-full-height recur F→H→AX→L.
- **Aurora/blob "stunning" artistic bar (A5/A6)** — core unblocked across AX, the artistic-fidelity
  bar (van-Gogh painterly) never met live; the gate is born-RED.
- **Constellation root-cause convergence (L5)** — slides STILL ships bespoke `constellation.ts`
  + pins glass-ui 3.7.0; the glass-ui side is DONE but the consume never happened (gated on AY publish).
- **The 7 DELTA-owed carriers (E3)** — the cardinal-lesson debt, carried from AX into AY un-named.

## §3 — convergence criteria (the bar this lane defines)
"AY + L PERFECTED" == the §0 checklist all-green, where green means: (1) every proof gate in the
fleet PASSES on a clean tree (`npm run proof:all` + the named per-band gates); (2) every
visual-load-bearing row has a FRESH on-disk PNG DELTA in `audit/visual/` (cardinal lesson —
`proof:live-verified-ledger` green, ZERO `live-pending`/`(DEVELOPED)` rows in PROGRESS);
(3) the 4 god-modules are <500 (`proof:no-god-module` CI-promoted); (4) slides DELETES the
bespoke `constellation.ts`, pins the AY-published glass-ui, builds green, and deploys to a live
HTTP-200 with a captured DELTA; (5) `proof:ay-final` (authored) + AX FINAL.md + budget
rebaseline land; (6) the named storybook routes are resolved; (7) the aurora painterly bar
passes on a real-GPU capture (not a SwiftShader skip). STOP is binary: any [OPEN]/[DEBT] row
without its named artefact blocks the close.
