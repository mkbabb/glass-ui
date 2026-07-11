# BI PLAN FRAME — the working skeleton (orchestrator, 2026-07-11)

STATUS: WORKING FRAME. This document holds the band shape, the open decisions, and the design-problem
roster while the audit fleet (round 1+) and the design loops run. It is superseded by `PLAN.md` at
tranche formation; nothing here is final until the convergence bars pass.

## What BI is

**BI = the reformation tranche**: the union of (1) the post-BG audit repair mandate (the user's
2026-07-11 findings, `audit/USER-FINDINGS-2026-07-11.md`), (2) the greenfield redesigns the user
ordered (dock suite, carousel/pager, substrate physics, storybook meta-system), and (3) the reformed
BH-structure plan (`docs/tranches/BH/spec-structure/STRUCTURE-TRANCHE-PLAN.md`, 20 waves) — updated,
upgraded, unioned per the user's directive: "BH/BI are to be updated, upgraded, unioned, and reformed."

## Decision-0 — the 5.0.0 cut (USER decision; orchestrator recommendation recorded)

The BG+BH tree is CUT-READY (HEAD `dfaa2510`) and the tag is user-gated. The 2026-07-11 audit found
P0s in shipped surfaces (dock morph "does not work at all", carousel "totally broken",
liquid-playground/dock-gallery broken in Safari) and orders API-breaking greenfields (dock suite,
carousel, substrate deletions) plus the structure flatten — all clean breaks.

**Recommendation: HOLD the 5.0.0 tag.** Ship ONE cut at the BI close carrying the repairs, the
greenfields, and the flatten together (no interim major that is immediately re-broken; no legacy
aliases across two majors). The structure plan's `published(5.0.0)` precondition re-binds to the BI
cut. Counter-option (user may prefer): cut 5.0.0 now as the BG record, absorb BI as 6.0.0. Either way
the cut remains USER-GATED.

## Band skeleton (to be filled/resequenced by the audit + design outputs)

- **B0 — P0 repairs** (pre-design, mechanism-local): dead bindings and breakage that need no design
  loop — tabs draggable dead, grain toggle no-op, command jitter, expandable-container Esc, dock morph
  event wiring (interim repair or fold into D-DOCK if greenfield subsumes), Safari route breakage
  triage, badge alignment, metal border-image, button corner shadow artifact.
- **B1 — Geometry grammar**: the concentric-radius law + capsule-vs-card law, applied library-wide
  (family A rows); configurator sheet/section rounding + indent.
- **B2 — Glass simplification**: the surface-taxonomy consolidation (design problem D-GLASS),
  glass-panel prune, global blur dial-back, the duplicate-naming (pane/panel/card/plate) unification.
- **B3 — Dock greenfield** (design problem D-DOCK): the whole dock suite reinvented from iOS-27 first
  principles; rail; hover clip by construction; scroll-into-view; morph; Safari parity.
- **B4 — Carousel/pager greenfield** (design problem D-PAGER): dot-MORPH (goo worm) pager + carousel
  rebuild.
- **B5 — Substrates**: DELETE dot-flow-field/concentric/dot-matrix (+ gates, stories, exports);
  fourier physics rework + perf; blob physics rework + satellite demo; aurora vibrancy + setting-sun
  preset + interactability + larger studio canvas; constellation dedupe + interactive background
  standard (design problem D-VIZ).
- **B6 — Storybook meta-system** (design problem D-STORY): the codified story chassis (shrink-on-scroll
  title standard, live-component preview tiles, highlight.js code blocks, veil demarcation, section
  dividers, bidirectional scroll animations), meta-text purge (+ the never-again gate), page affordance
  redesign, /substrates index real previews.
- **B7 — Motion register** (design problem D-MOTION): the animation audit → register collapse
  (homogeneous overlay enter/exit), draw-in codification, accordion indent kill, dropdown bounce
  refinement, drawer/live-behind perf, tightness pass + duration options.
- **B8 — Prunes + consumer truth**: /data/metrics → speedtest relay, math-paper removal, hero demotion,
  hover-popover/popover/hover-card adjudication, compositions prune, zero-consumer exports.
- **B9 — Structure (the reformed BH-structure)**: the 20-wave flatten/colocation plan resequenced
  AFTER the prunes and greenfields (the family census must be post-prune); waves invalidated by
  deletions re-scoped.
- **B10 — Close**: chronic dispositions ledger, prompt-recap ledger, gates battery, the ONE cut
  (Decision-0), cross-repo relays.

## Design problems (each through the convergent design loop; ≥3 passes; Fable-owned)

| id | problem | user mandate |
|----|---------|--------------|
| D-DOCK | The dock suite, greenfield | UF-C1..C9 ("re-invented from ios27 first principles… Greenfield it") |
| D-PAGER | Carousel + pager dot-morph | UF-I1 ("Greenfield this with several workflows") |
| D-VIZ | Substrate physics + simplification | UF-E1..E9 (cursor-biased fourier, weighted blob, interactive auroras, viz deletions) |
| D-STORY | Storybook meta-component system | UF-F1..F10 ("codified… is this not extant?") |
| D-GLASS | Glass surface taxonomy + geometry grammar | UF-B1..B6, UF-A1..A8 ("grand simplification", rounding idiom) |
| D-MOTION | Motion register unification | UF-G1..G10 ("homogenous animation language") |

Loop mechanics per the user's design-loop prompt: round-0 portfolio (orthogonal formulations) →
research (≤8, batched 3) → synthesize → prototype (worktrees; run-or-spec-only) → adversarial critique
(convergence % + enumerated gaps) → agglomerate; ≥3 passes; 100% = zero open gaps + fresh adversarial
audit by non-authors + two consecutive clean passes. Partial routes banked with named re-triggers.

## Rulings on the ledger open questions (orchestrator; user may veto any at formation)

From `ledgers/CHRONIC-DISPOSITIONS.md` §6 + `ledgers/PROMPT-RECAP.md`:

1. **Baseline-gated standing-book batch (8 rows)** — RULED: RETIRE wholesale. Standing books are
   UF-P2 debt; each re-enters via `@supports` the day a touched surface pays the diff (the
   css-at-function precedent). No ruling conflict: "migrate-first-when-touched" is preserved as the
   RE-ENTRY path, not a standing row.
2. **inline-edit-primitive (10 closes un-converged)** — RULED: RETIRE-until-convergence, with the
   convergence trigger named in the retire rationale. A decade-of-closes hold IS the disease.
3. **aurora-medium lazy-chunk split** — RULED: RETIRE the book (the spliced `uMedium` dispatch is the
   decided identity, per the deep-glass-16px precedent). D-VIZ may re-open ONLY if its perf pass
   measures the medium GLSL as a material first-paint cost — that is a new trigger, not a re-book.
4. **border-progress** — RULED: RETIRE the subpath until the speedtest adoption lands (the honest
   0-real-consumer state; the "born ≥2" claim was false). Re-entry = the speedtest consume, already
   an ASK row. completion-seal: WATCHLIST with the demo-only status named in cut notes.
5. **metrics sextet scope** — USER-GATED (UF-K1 names three; the census found six). Recommendation:
   relocate metric-cell + metric-stack + instrument-chassis to speedtest; icon-tooltip/pulse/
   scrolling-text get per-item mechanism-distinctness adjudication in B8 (pulse and scrolling-text
   are plausibly general; icon-tooltip likely folds into the D-FACTOR tooltip cell).
6. **hover-popover** — SETTLED BY THE USER (UF-P7): hover becomes a trigger AXIS of the one anchored
   overlay; hover-popover and hover-card both dissolve as names; keepDockOpen rides the trigger axis
   as a parameter. D-FACTOR owns the union spec.
7. **Decision-0 (the cut)** — USER-GATED, standing recommendation unchanged: HOLD the tag; one cut at
   the BI close. (Round-1 strengthened it: the tree is not even honestly cut-ready today.)

## Orchestration ledger

- 2026-07-11: screenshots banked (25), USER-FINDINGS registry written, audit round 1 launched
  (wf_85ba3cb7-5a8; 12 lenses, opus, 3-wide).
- Concurrency: 3 agents total at any moment (the rate wall). Fable = orchestration/synthesis/design
  adjudication; opus = fanout; every spawn declares its model.
- Registry of finding families: `audit/AUDIT-REGISTRY.md` (created at round-1 synthesis).
- Convergence: the registry is stable when two consecutive passes surface nothing new.
