# historical-recap — brainstorm LENS-C (audacious cartoon-technicolor PUNCH)

> Greenfield re-interrogation of "the HISTORICAL analysis — a comprehensive, recency-weighted
> recap of EVERY user request/prompt across 100+ sessions + this session, cross-checked against
> the wave coverage; chronic/deferred items folded; nothing lost." Lens C: design the deliverable
> through the 1940s-technicolor register — bold layered-offset shadows + FLOW & PUNCH
> (anticipation · exaggeration · follow-through · overlapping action · arcs · squash & stretch with
> real WEIGHT & INERTIA), the boldest-yet-idiomatic variant. Tranche-DEV only (doc synthesis, no
> live route). Source-verified against the on-disk corpus + union waves.

---

## 0. THE REFRAME — the recap is not a TABLE, it is a PROOF OBJECT that ANIMATES its own completeness

The status-quo `MASTER-REQUEST-RECAP.md` is a flat markdown table: §A/§B/§C/§D rows, a "Status"
column, a "Carrier" column, a 62% number at the bottom. It is honest but **inert** — it cannot
*prove* nothing is lost, it can only *assert* it, and an assertion is exactly what the user's
recurring directive distrusts ("ensure they have been addressed", "guarantee nothing is lost",
"delineate any CHRONICALLY DEFERRED items"). The challenge fleet's whole job is to find the row
that lies.

Lens C's reframe: **the recap is a single LEDGER artifact whose every row is a closed accounting
entry — request → covering wave → source-verified citation → coverage state — and whose PRESENTATION
(when rendered as the demo's own "tranche coverage" surface) is a cartoon-technicolor coverage
instrument that physically ANIMATES the proof.** The document is the substance; the kinetic surface
is the PUNCH that makes "nothing lost" *legible at a glance* — a coverage meter that fills with
weight and overshoot, deferred-item chips that goo-split off the spine when folded, gap-flags that
flash a loud anticipation-dip-then-punch crimson until they are covered. Same data, but the
audacious register turns a spreadsheet into a **living balance sheet** that survives the adversarial
"which row lies?" challenge because every claim carries its on-disk citation and the surface
*renders red* the instant a citation is absent.

The boldest framing: **double-entry bookkeeping for user intent.** Every user ask is a DEBIT
(an obligation); every covering wave is the matching CREDIT (the discharge). The ledger BALANCES
or it doesn't. A gap is an unbalanced row — and the technicolor surface shows it as a row that
literally cannot square (the credit column flashes empty-crimson). Coverage % is the balance ratio.
"Nothing lost" = the books balance = the loud green PUNCH on the total line.

---

## 1. THE CORPUS — what the recap must absorb (read in full, source-verified)

The recap ingests SEVEN strata of user intent. I read the whole corpus; here is the de-duplicated
intent surface each stratum contributes (the recap's INPUT, before cross-check):

| Stratum | On-disk source (VERIFIED exists) | Intent contributed |
|---|---|---|
| **S1 — original Pass-D/E directives** | `MASTER-REQUEST-RECAP.md` §A (A1–A15) | audit/historical re-open; story-page-standard; liquid-entrance frame-by-frame; path-std; scroll-choreography; glass-over-aurora; dock audit; superfluous-language/glassy-cards; sticky titles; configurator-gallery-dock; dotflow rebuild; header-scale; paper-morphism; handmark; all-vizzes |
| **S2 — dock-as-hub + de-overfit** | §B (B1–B2) | generalized dock-as-hub API; NO hardcoded "maps"/facility refs |
| **S3 — the NEW design /goal items** | §C (C1–C6) + §D media | metallic aurora ×2; dotflow surpass; shadcn-abrogate + ios27-suffuse; abrogate-gray-glass; goo-morph-more-liquid; liquid-weight-universal; the 6 media-audit fleets |
| **S4 — refine triumvirate batch-1** | `viz/refine/USER-FEEDBACK-2026-06-23.md` (1–6) | gray glass everywhere; /motion/deck too fast/small/subtle; useLiquidReveal broken; select-animate smoother; toggle-chip incongruent; padding/x-glyphs |
| **S5 — refine batch-2 (nav docks emphatic)** | `…-batch2.md` (A1–A6,B1–B5,C1–C6,D1–D3) | category-nav dead; nav buttons flaky; broken rail; persistent-controls + scrolling-tabs dock; "Pick a story" FOUC; toggle-state invisible; warm-cream chrome; card-width=hero; blob/fourier/paper-grid/dot-matrix/goo-dot/concentric viz bugs; per-page custom aurora; macro-flower array; BLURRED-IMAGE-BG |
| **S6 — refine batch-3 (dock + animation overhaul)** | `…-batch3.md` (A1–A13,B1–B2,C1–C3,D1–D4) | grow-from-CENTER; shrunken states + longer hover; blur-too-extreme; icon-sync; dropdown-recolors-dock; popover/dropdown unify; draggable items; SPLIT/goo-fission V/H arbitrary; global smooth-gooey-inertia anim law; goo-Safari/Gemini-meatball; carousel/deck de-dup; corner-aliasing; toc-unreadable; buttons-like-tabs |
| **S7 — THIS session's greenfield directives** | `GREENFIELD-HARDENING-PLAN.md` §0/§2 (Band 0–E) | design-edicts; blend-morph-engine (SDF/Houdini, Safari-no-fallback); hero-overflow clamp; category-landing live-demos; configurator-presentation; the design-adherence consistency gate; AND the meta-asks: wave-spec-audit + **this very historical-recap** |

Plus the **project-memory + feedback strata** (the cross-session law, the items that recur as
PRECEPTS not features): `feedback_liquid_weight_universal`, `feedback_no_backwards_compat`,
`feedback_presets_in_consumer`, `feedback_tailwind_first`, `feedback_architectural_approach`,
`feedback_lightdark_inset_shadow`, `feedback_vue_scoped_global_drop`, `feedback_glass_ui_binding_verification`,
`feedback_chrome_devtools_mcp`, `feedback_live_verify_capture`, `feedback_opus_for_subagents`,
`feedback_analyze_in_full`, `feedback_greenfield_no_meta`, `feedback_overfitting_audit`,
`feedback_never_park_sibling_repos`, `project_bd_*` — these are **process law**, a distinct ledger
class (Class P) the status-quo recap underweights.

**The recency law (the user's explicit BIAS + WEIGHT):** S7 (this session) and S4–S6 (2026-06-23/24)
carry the heaviest weight; S1–S3 are real but older; the 100+-session pre-BD history is the LONG
TAIL. The ledger encodes recency as a first-class column (a **recency weight** w ∈ {NOW, RECENT,
PRIOR, TAIL}) so the coverage % can be reported BOTH raw and recency-weighted — the user asked for
weighting, so the headline number is the **recency-weighted** one, with the raw as a footnote.

---

## 2. THE LEDGER SCHEMA — double-entry, source-verified, six columns

Every user ask is ONE row. The schema is the substance (this survives the challenge; the technicolor
is its skin):

```
| ID | Request (verbatim-anchored) | w (recency) | Class | COVERING wave/item (the CREDIT) | Verify | State |
```

- **ID** — stable `R-S{stratum}-{n}` (e.g. `R-S6-A13` = the dock-fission BIG ONE). Stable IDs let
  the challenge fleet cite a row without ambiguity, and let a FOLD flip a row in place (no delete —
  the `feedback`/L-inv-8 no-silent-drop law applies to recap rows too).
- **Request** — the de-duplicated intent, anchored to its verbatim source (stratum + line). Dedup is
  explicit: e.g. "gray glass" appears in S3-C4, S4-1, S4-5, S5-B1, S5-B4, S6-D3 → ONE row
  `R-GLASS-GRAY` with all six origins listed (de-dup is a *merge with provenance*, never a drop).
- **w** — NOW / RECENT / PRIOR / TAIL.
- **Class** — F (feature) · B (bug/defect) · V (viz) · M (motion) · D (design-precept) · C (chassis)
  · P (process law). Class drives the headline grouping.
- **COVERING wave** — the on-disk wave/greenfield item that discharges it, with its DELTA-ASSAY
  convergence %. This is the CREDIT. **A row with no credit is a GAP.**
- **Verify** — does the cited wave file EXIST on disk? `ls` truth, not a claim. (Source-verify is the
  anti-"false addressed" arm.)
- **State** — COVERED (credit present + verified) · PARTIAL (credit present, conv < 90%) ·
  CHRONIC (raised ≥3 strata / ≥3 sessions, still PARTIAL) · GAP (no credit) · FOLDED (was a gap,
  now folded into a named wave this pass).

**Source-verify pass (the spine):** I confirmed by `ls` that every covering wave I cite EXISTS:
`W-NAV-DOCK-FIX`, `W-DOCK-CORE`, `W-GLASS-ABROGATE-GRAY`, `W-GOO-MORPH-REFINE`, `W-VIZ-RESPEC`,
`W-BLURRED-IMAGE-BG`, `W-ANIM-IOS27-TUNE`, `BD.W-PAPERGRID-WARP`, `BD.W-CONCENTRIC-LEVELSET`,
`BD.W-DOTFLOW-REBUILD`, `BD.W-STICKY-TITLE-CONDENSE`, `BD.W-CORNER-AA`, `BD.W-DOCK-SUBDOCK`, +37
greenfield items each carrying GOLDEN + DELTA-ASSAY + WAVE-AMENDMENT. The verify column is the
honest arm: a cited-but-absent wave renders the row RED, not green.

---

## 3. THE CARTOON-TECHNICOLOR SURFACE — the ledger rendered as a living balance sheet

When this recap is surfaced in the demo as a "tranche coverage" instrument (it composes the EXTANT
glass-ui primitives — `<Card>`, `<DataTable>`, `<ProgressBar>`, IconChip, `useDockFission`,
`useLiquidFlex`, `--ease-cartoon-punch`, the cartoon-shadow register), the technicolor lens turns the
six-column ledger into a kinetic proof. Every motion below is a Disney-principle made literal AND a
re-use of an existing primitive — no new engine, deft union.

### 3.1 The COVERAGE METER — a balance-bar that fills with WEIGHT, INERTIA, and PUNCH
The headline recency-weighted coverage % is a single bold horizontal **balance-bar** (composes
`<ProgressBar>` + the cartoon-shadow register). It does NOT slide in linearly — it fills with the
`--ease-cartoon-punch` curve: **anticipation** (a ~4% dip below 0 — the bar pulls back before it
launches), then a **weighty inertial fill** that overshoots the target ~22%, then a follow-through
settle to the true value (`--motion-weight: 0.9`, near-max cartoon). The fill is a warm-cream→amber
technicolor gradient over the §3 colorful field, NEVER gray. As it fills it casts a **moving
layered-offset cartoon shadow** that slides opposite the fill direction (the cel-light-source-fixed
law, `design.md §Shadows`) — the bar literally throws a shadow as it grows, reading 2.5-D. The number
counts up in sync (a `useLiquidFlex` squish on each digit-roll — digits squash-and-stretch as they
tick). PRM → the bar fills instantly to the true value, no punch, no travel.

### 3.2 DEFERRED/CHRONIC chips GOO-SPLIT off the spine when FOLDED — the metaball fold
The boldest single move. The chronic/deferred items are rendered as a cluster of capsule chips
docked on a "DEFERRED" spine-rail. When the recap FOLDS a deferred item into a covering wave, the
chip **goo-splits off the spine and morphs across to land on its new wave's row** — reusing the
SHIPPED `useDockFission` metaball engine + `DockGooFilter` (Safari-safe static SVG `filter:url()`,
`color-interpolation-filters: sRGB`, NO `backdrop-filter:url`, the real blob↔meatball neck that
stretches-thins-snaps, NEVER a naive ellipsoid tween — `design.md §L7`). The neck stretches as the
chip travels with real inertia (`useLiquidFlex` velocity-coupled squish: it morphs MORE the faster
it flies), thins to a metaball waist at the midpoint, then SNAPS onto the target row with a
follow-through bounce. This is the *literal visual proof of the fold* — you SEE the deferred item
leave the "unaddressed" pile and merge into a wave. The merge fires a one-shot **merge-splash**
ripple (the `fission-bridge.css` `--split` ripple precedent) in the wave's accent color. Cross-engine:
Chrome + Safari identical (the sRGB-forced metaball waist). PRM → instant topology swap, zero neck
frames (the chip just relocates).

### 3.3 GAP-FLAGS flash a loud ANTICIPATION-DIP-then-PUNCH crimson until covered
A row in GAP state (no credit) is the unbalanced ledger entry. Its credit cell flashes the
`--ease-cartoon-punch` register in **technicolor crimson**: it dips (anticipation), punches up
~22% scale, settles — a heartbeat that says "this is owed." It is LOUD by design (the user's whole
point: gaps must not hide). The instant the gap is FOLDED (3.2 fires) the crimson resolves to the
warm-green COVERED state with a final overshoot-settle. A GAP that the pass cannot fold stays
flashing crimson in the FINAL — an honest, un-suppressible "still owed" beacon. (This is the
anti-"false addressed" arm made VISIBLE: you cannot silently green a row; only a verified credit
turns it green.)

### 3.4 The CLASS LANES — recency arcs + follow-through cascade
The ledger groups into Class lanes (F/B/V/M/D/C/P). On reveal, the lanes cascade in with
`useStaggerReveal` follow-through (each lane's rows settle *after* the lane header — overlapping
action, `design.md` principle 5), and the NOW-weighted rows enter on a tighter, punchier arc than
the TAIL rows (recency is encoded in the MOTION — recent asks literally arrive with more energy,
older ones drift in calm). Each row's covering-wave IconChip does a `scale(0.85→1)` reveal-pop on
its `data-covered` flip. This is liquid-weight-universal on a DRIVER (the reveal), calm on the
TAIL observer rows — honoring the driver-vs-observer §L2 rule (the recap surface is not over-springy
everywhere; it reserves the punch for the recent/covered transitions).

### 3.5 The proportion + paper + glass floor (the binding precepts, applied)
- **Aristotelian proportion** — the ledger card width = √φ ladder; the coverage-bar height : width
  = 1/φ; lane spacing on the φ family; concentric radii on the nested chips. Nothing arbitrary.
- **Glass** — every surface is the warm-cream six-layer transmissive composite over a §3 colorful
  field with a defined edge, NEVER gray, both modes (the `W-GLASS-ABROGATE-GRAY` register).
- **Paper** — the ledger sits on a visible paper-grain morphism (the `--paper-grain-opacity` split)
  — it reads as a real ledger sheet.
- **Type** — the headline coverage % is the audacious √φ display tier; the row text the body ladder.

---

## 4. CROSS-CHECK + GAP REPORT — the recap's actual JOB (the substance the surface skins)

The recap's deliverable is the **consolidated ledger** + the **chronic/deferred fold** + the
**gap report** + the **coverage %**. From the corpus read, here is the cross-check verdict (the
recap that the technicolor surface renders):

**The strong finding: glass-ui is ASSEMBLY- and COVERAGE-bound, not request-bound.** Nearly every
user ask maps to an EXISTING wave (union/waves carries ~110 wave specs; greenfield carries 37 items
each with GOLDEN+DELTA+AMENDMENT). The dominant pattern, corroborated by `IOS27-REFERENCE.md`
(weighted ~72% convergence) and `MASTER-REQUEST-RECAP.md` (~62%), is **engine-ships / assembly-owed**,
not **request-uncovered**. So the recap's job is less "find uncovered asks" and more "PROVE each
ask's covering wave exists + cite it + flag the genuine residual gaps."

**The CHRONIC items (raised ≥3 strata, still PARTIAL — the FOLD targets):**
| Chronic ask | Strata raised | Covering wave (the fold) | Why chronic |
|---|---|---|---|
| **Gray glass everywhere** | S3-C4, S4-1, S4-5, S5-B1/B4, S6-D3 (6×) | `W-GLASS-ABROGATE-GRAY` + §3 field | the most-repeated single ask; PARTIAL until the warm-floor register lands on ALL surfaces |
| **Dock core broken (grow-center/sync/blur/split)** | S1-A7, S3, S5-A1–A6, S6-A1–A13 | `W-DOCK-CORE` + `W-NAV-DOCK-FIX` + `BD.W-DOCK-SUBDOCK` + `W-DOCK-SCROLL-FISSION` | engine 100%, ASSEMBLY 0% (IOS27 T2) — the canonical chronic-assembly item |
| **Goo not-liquid / Safari-broken** | S3-C5, S4-2, S6-C1 | `W-GOO-MORPH-REFINE` + `W-GOO-CAROUSEL-DECK` + `blend-morph-engine` | Safari + speed + meatball; the blend-morph-engine unifies the 7 forks |
| **Liquid-weight / smooth-not-springy UNIVERSAL** | S3-C6, S6-B1/B2, `feedback_liquid_weight_universal` | `W-ANIM-IOS27-TUNE` + `W-LIQUID-ENTRANCE-GENERAL` + `motion-spring-register` | a LAW that must be globally true, not per-component — chronic until the register is universal |
| **Procedural viz bugs (blob/fourier/paper-grid/concentric/dot-matrix/goo-dot)** | S1-A11, S5-C1–C6 | `W-VIZ-RESPEC` + `W-VIZ-BROKEN-FIX` + `BD.W-PAPERGRID-WARP` + `BD.W-CONCENTRIC-LEVELSET` + `BD.W-DOTFLOW-REBUILD` | multiple distinct vizzes, several "totally broken" |
| **useLiquidReveal broken** | S4-3 | `W-LIQUID-REVEAL-FIX` | a flat "doesn't work at all" — chronic if not yet root-caused |
| **"Pick a story" FOUC** | S5-A7 (flagged a MAJOR defect) | `W-NAV-DOCK-FIX` + `shell-layout` | a named major defect |
| **Hero-scroll on every page / sticky-title** | S5-C1, S6-D2, S1-A9 | `BD.W-STICKY-TITLE-CONDENSE` | repeated |

**The GAP REPORT (asks with NO clean covering wave, or under-weighted — flag as new items/folds):**
1. **The macro-FLOWER image ARRAY (S5-D2)** — a curated consumer asset array. `W-BLURRED-IMAGE-BG`
   covers the *technique*; the **asset array itself** is a consumer-asset deliverable not clearly
   homed. → FOLD into `W-BLURRED-IMAGE-BG` as an explicit asset-deliverable arm, OR a tiny
   `W-MACRO-FLOWER-ASSETS` consumer-asset item (presets-in-consumers law: it lives in the consumer).
2. **The "padding is awful" / x-close-glyphs bigger+stylized (S4-6)** — a real recurring polish ask
   with no dedicated wave (folds loosely into ios27-suffuse). → FLAG: needs an explicit
   `padding-canon`/glyph-scale arm (note `BC.W-PADDING-CANON` exists as prior-art; verify it covers
   the close-glyph scale, else fold).
3. **The PROCESS-LAW class (Class P)** — the status-quo recap UNDERWEIGHTS the precept/process asks
   (`feedback_*` memories: opus-for-subagents, analyze-in-full, no-backwards-compat, tailwind-first,
   never-park-siblings, the live-verify-capture law, the vue-scoped-:global drop). These are
   recurring USER directives that the recap must account for as a distinct class — they are not
   "features with a wave" but BINDING LAW the tranche execution must honor. → the recap adds a
   **Class P lane** that maps each process-law to the SEED §"binding disciplines" + the
   GREENFIELD-HARDENING-PLAN §1 LAW (cite the carrier; state is COVERED-as-law, not COVERED-as-wave).
4. **The 100+-session TAIL pre-BD asks** — the recap's weakest evidence is the deep history (the
   pre-BD sessions). Recency-weighting MITIGATES this (TAIL = lowest weight), but the recap must
   honestly flag that the TAIL is recap'd at LOWER FIDELITY (the FOLD-LEDGER's 213-item BC fold is
   the carried prior-art — `feedback`/FOLD-LEDGER Class J: "the BC ledger is the prior-art, almost
   nothing silently owed"). → the recap CITES the BC FOLD-LEDGER as the TAIL's coverage proof rather
   than re-deriving 100 sessions row-by-row (DRY: don't re-do the BC accounting; reference it).

**Coverage %:** recency-weighted, with NOW/RECENT classes ~70–80% (assembly-bound), TAIL covered-by-
reference (BC FOLD-LEDGER). The honest headline: **~75% recency-weighted COVERED+PARTIAL, ~3 genuine
GAPs flagged for fold, 0 silently-dropped** — and the surface renders the 3 gaps as flashing crimson
until the FINAL folds them, so "nothing lost" is provable, not asserted.

---

## 5. A11y / PRM / cross-engine carve (the binding floors)

- **PRM** — the coverage-bar fills instantly to the true value; the goo-fold chips relocate with no
  neck frames; the gap-crimson is a static color, no punch heartbeat; `--motion-weight: 0`. The
  ledger reads identically; only the punch is removed.
- **prefers-contrast: more** — the cartoon-shadow ink floors UP (legibility asset, `design.md §Shadows`);
  the gap-crimson gains a solid border. The verify column is always text, never color-only (an absent
  citation reads "✗ MISSING" in text, not just red — color is reinforcement, not the sole signal).
- **prefers-reduced-transparency** — the glass floors to the opaque warm-cream tier; the ink survives.
- **Cross-engine** — the ONLY GL/SVG-filter motion is the goo-fold (3.2), which reuses the
  Safari-verified `DockGooFilter` (static SVG, sRGB-forced waist, NO `backdrop-filter:url`); everything
  else is compositor-only transform/opacity. Chrome + Safari render identical.
- **Screen-reader** — the ledger is a real `<table>` (semantic), the coverage % is an `aria-live`
  announce on fold-completion ("coverage 75%, 3 gaps remaining"), each gap row carries
  `aria-describedby` its owed-reason. The proof is legible without any pixels.

---

## 6. DEFT INTEGRATION — reuse, no fork (the union)

Zero new engines. The recap COMPOSES: `<Card surface="cartoon">` (the cartoon-shadow register) ·
`<DataTable>`/`<table>` (the six-column ledger) · `<ProgressBar>` (the coverage meter) · IconChip
(the per-row covering-wave glyph) · `useDockFission` + `DockGooFilter` (the deferred-chip goo-fold) ·
`useLiquidFlex` (the velocity-squish on the fold + digit-roll) · `--ease-cartoon-punch` +
`--motion-weight` (the punch register) · `useStaggerReveal` (the lane follow-through cascade) ·
the §3 colorful field + the warm-cream glass floor + the paper-grain morphism. The DATA is a single
source-verified ledger `.md` (+ optional `.json` companion for the gate, mirroring the
`BD.W-FOLD-LEDGER.json` no-silent-drop pattern). The recap is a UNION of the extant ecosystem, not
a bolt-on — and its gate is the same no-silent-drop machine the FOLD-LEDGER already runs (every row
terminal, items == expectedCount, no delete).

---

## 7. The convergence gate (when this item is DONE)

The recap converges when: (1) every of the 7 strata's de-duplicated asks is a ledger row with a
recency weight + class; (2) every row's covering wave is CITED + source-verified by `ls` (verify
column green or honestly "✗ MISSING"); (3) the chronic items are enumerated + each FOLDED into a
named wave (the goo-fold made literal); (4) the gap report flags the genuine residual (≥3 above) +
folds each into a new/existing wave or honest crimson-flag; (5) the coverage % is reported
recency-weighted + raw; (6) the no-silent-drop attestation holds (no row deleted, every deferred
item terminal); (7) the surface honors the binding precepts (glass/paper/proportion/cartoon-punch/
liquid-weight) + the a11y/PRM/cross-engine carve. The challenge fleet's three lenses — any user
request MISSED, any chronic item not folded, any false "addressed" — each map to a ledger column
(MISSED → a missing row; not-folded → a CHRONIC-without-fold state; false-addressed → a verify-✗ that
the surface renders crimson). The technicolor surface makes each failure mode VISIBLE rather than
hidden — which is the whole point.

---

## CORE IDEA (1 paragraph) + the single BOLDEST move

**Core idea:** Reframe the historical recap from an inert status-table into a **source-verified
double-entry LEDGER** — every user ask across the 7 corpus strata is a DEBIT (obligation), every
covering wave its matching CREDIT (discharge with an on-disk-verified citation + DELTA-ASSAY
convergence %), recency-weighted (NOW/RECENT/PRIOR/TAIL — the user's explicit bias encoded as a
first-class column AND as motion energy), classed (F/B/V/M/D/C/**P**-process-law, the underweighted
process-precept class promoted to first-class), with the books either BALANCING (covered) or
flashing an honest, un-suppressible crimson GAP. The recap's substance is the ledger + the chronic-
fold + the gap report (~3 genuine gaps: macro-flower assets, padding/glyph-canon, the process-law
class) + the recency-weighted coverage % (~75% covered/partial, 0 silently-dropped, TAIL covered-by-
reference to the BC FOLD-LEDGER for DRY honesty); the cartoon-technicolor surface is its skin —
a living balance sheet that fills its coverage meter with anticipation-dip-overshoot-settle weight,
cascades its class lanes with follow-through arcs keyed to recency, and renders every claim's
verification honestly. **The single boldest move:** the **metaball GOO-FOLD** — when a chronic/deferred
item is folded into its covering wave, its capsule chip physically GOO-SPLITS off the "DEFERRED"
spine-rail and morphs across the ledger (reusing the shipped Safari-safe `useDockFission` +
`DockGooFilter` metaball engine — neck stretches, thins to a waist, SNAPS with a merge-splash ripple
in the wave's accent), turning the abstract bookkeeping act of "folding a deferred item so nothing
is lost" into a LITERAL, watchable, cross-engine liquid-glass animation: you SEE the orphan leave the
unaddressed pile and merge into a wave, and a gap that cannot be folded stays flashing crimson —
making "nothing lost" a thing you can WATCH happen, not a number you have to trust.
