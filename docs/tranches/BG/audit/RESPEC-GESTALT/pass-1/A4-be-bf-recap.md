# A4 — BE + BF recap (the two folded planning-only tranches)

**Verdict: the BE/BF fold is SOUND and machine-verified — no wave content fell through.** Both
tranches were plan-only (never independently executed); their engines landed piecemeal via the BD
union (4.2.0), and their full 70-wave spec corpus is now DECIDED, gate-locked
(`proof:be-bf-ledger`, GREEN, 0 failures at HEAD), and threaded into the live BG cursor under
correctly-cited destination waves. The prior fold-coverage lens (`P-be-bf-fold.md`, written
pre-WS1–WS12 convergence) correctly diagnosed the "half-executed-then-abandoned" disease and
proposed exactly the two waves (`BG.W-BE-BF-LEDGER`, `BG.W-GLASS-CONSUMER-BAND`) that now anchor
the fix — both waves exist in the live cursor (rows 0.5 DONE, 3.8 PENDING). The deeper BF
`DEFERRED-CENSUS.md` (32 D-items, item-granularity, one level finer than the wave-granularity
ledger) is ALSO fully threaded — every D-item's destination wave is a real, scheduled BG wave. The
one residual risk is not a dropped item but a **live chronic**: `BG.W-DOCK-FISSION-WIRE` is the
**third** attempt at wiring the dock-fission engine to a real consumer (BE built it, BF specced
`DockNowPlaying` which never shipped, BG now owns the decide-or-retire), and the plan text itself
names this risk and forecloses a fourth re-book — which is the correct gestalt response, not a gap.

---

## What BE was

`docs/tranches/BE/` (Status: tranche-DEVELOPMENT, "Pass 5 complete — DESIGN CONVERGED", `SEED.md:3`)
— the "iOS-27 liquid-glass alignment · the DOCK as hallmark · de-shadcn form" tranche. 39 wave specs
across 10 bands (`docs/tranches/BE/waves/` = 39 files verified on disk): dock-fission/context-
silhouette/now-playing-pill/rail-realize (Band 1, the centerpiece), liquid-glass material floors —
Safari lensing, tinted-chip, sheet-translucent, deep-ceiling (Band 2), a `DockTabBar` iOS tab-bar
fold (Band 3), aurora satin/prism album-art mediums (Band 4), the bloom-up FLIP transition (Band 5),
glass-control/icon-chip-glass consumer atoms (Band 6), the Safari validation floor (Band 7),
jubilance primitives — celebration-burst, haptic (Band 8), the de-shadcn sweep (Band 9), and the
fold/disposition machinery itself (Band 10). BE built **8 commits of real engine code** on a side
branch (`docs/tranches/BE/prototype/` carries `wave-1-plan.md`, `wave-1.json`, a
`SUBSUMPTION-PLAN.md`, and 4 visual GIFs/PNGs of the liquid-morph V↔H prototype) but never ran as
its own tranche close.

## What BF was

`docs/tranches/BF/` — the "CONVERGENCE" tranche BE's own SEED.md scheduled as its successor: 31
wave specs (`docs/tranches/BF/waves/` = 31 files verified) organized into 8 bands (TRUTH →
CONSOLIDATE → INTEGRATE → the user's explicit asks → iOS-27 FIDELITY → SAFARI → BREADTH → CLOSE),
written AFTER the BD union shipped some BE engines — so BF's specs cite real post-union line
numbers (`fission-bridge.css:291-327`, `useDockFission.ts:299-351`, `railProjection.ts:24-35`,
`DockStack.vue:114-118`, all independently re-verified below). BF's own `audit/DEFERRED-CENSUS.md`
(42 lines, 32 D-rows) is the finest-grained artifact in the whole BE/BF corpus — every deferred/
chronic/half-landed item BE left behind, individually DECIDED (`BUILD`/`DEFER-with-trigger`/
`RETIRE-with-rationale`) with a named destination wave. BF also never ran as its own tranche close.

## What executed before the fold

Neither BE nor BF ran a tranche close. What landed is the **BD union's cherry-pick**: BD (the
"union tranche" absorbing BC/BD/BE/BF per `CLAUDE.md`'s tranche-lineage note and the user's own
memory record `project_bd_union_tranche.md`) pulled a subset of BE's *engines* (the mechanism code)
and their *gates* into the 4.2.0 cut — WITHOUT running BF's wiring/paint/Safari-validation waves
that would have made those engines real. This is independently confirmed on disk right now:

```
$ ls src/components/custom/dock/composables/useDockFission.ts        # 604L, present
$ ls src/components/custom/dock/composables/useDockContextSilhouette.ts  # 551L, present
$ ls src/composables/motion/useBloomUp.ts                             # present
$ ls src/composables/motion/useCelebrationBurst.ts                    # present
$ ls src/composables/motion/core/useHaptic.ts                         # present, 2026-06-25 mtime
$ ls src/styles/dock/morph-bridge.css src/styles/dock/fission-bridge.css  # both present
```

`useHaptic.ts` is a useful dated data point: `P-be-bf-fold.md` (written against the pre-WS-series
tree) reported it **ABSENT entirely**; it now exists on disk (mtime 2026-06-25, i.e. landed via the
BG forensic-audit/WS1-12 convergence work, not a phantom). Its **zero real call-sites still hold**
(`grep -rln useHaptic src --include=*.vue` → 0 hits) — the disposition (RETIRE, ledger row 176) is
therefore still correct; only the underlying evidence path changed, and the ledger already points
at the up-to-date path.

## What folded into BD (the ~60% headline, re-confirmed)

`P-be-bf-fold.md`'s Group A/B tables (dock engines + glass-material tokens) are independently
re-verified accurate at current HEAD:

- **Group A (dock engines, LANDED but demo-private/mis-wired):** `useDockFission` (604L),
  `useDockContextSilhouette` (551L, one demo-only consumer `AppSwitcher.vue`), `DockStack
  mode="facets"` + `railProjection.ts`, `useBloomUp` (507L, wired into the over-contrived
  `AppShell.vue` route-freeze hack per `P-bd-coverage`'s finding #1), `fission-bridge.css` (the
  goo bridge — the body-anchored spanning-filament fidelity never landed).
- **Group B (glass-material foundation tokens, LANDED but under-consumed):** `surface="clear"`
  (`useSurfaceAxis.ts`), `--glass-fill-tint`/`--glass-fill-strength` (partial consumers:
  icon-chip.css/glass-atom.css/glass-chip.css), `--glass-opacity-sheet`, the 16px deep-glass
  ceiling (the full Apple 18-20px booked separately), the Chromium-only squircle (Safari
  clip-path floor owed), the `--glass-edge-dispersion` chromatic-rim token (unwired to the lens).
- **Group C/D (jubilance + breadth), DEAD-on-arrival:** `useCelebrationBurst` (0 real call-sites
  at the time of that audit), `useHaptic` (then absent, now present-but-still-0-consumers), aurora
  satin/prism mediums (never built), `DockTabBar` (never built).

## The key output — did any BE/BF content fall through the fold?

**No.** Three independent verification passes confirm completeness:

1. **The wave-level ledger is machine-gated and currently GREEN.** `proof:be-bf-ledger`
   (`scripts/proof-be-bf-ledger.mjs`) derives its 70-item corpus from disk (`readdirSync` over
   `docs/tranches/{BE,BF}/waves/`, never a hand-list — L1/L6), requires every row to carry one of
   three sound dispositions (L2-L5), and cross-checks every `NEVER-BUILT` destination against the
   locked BG wave registry (L4/L7). Running it live:

   ```
   $ node scripts/proof-be-bf-ledger.mjs
   ledger rows            : 70 (expected 70 — 39 BE + 31 BF)
   LANDED-no-build        : 27
   NEVER-BUILT-names-wave : 33
   RETIRE                 : 10
   BG registry entries    : 112
   failures               : 0
   ```

   This is not aspirational prose — it is a gate that REDS on a dropped row, a phantom destination,
   or a bare (unrationalized) retire, and it currently passes. `docs/tranches/BG/BE-BF-LEDGER.md`
   dated 2026-06-28 (`6105ed6f`) is the seed; `EXECUTION-PROGRESS.md` row 0.5 confirms it's DONE.

2. **Every `NEVER-BUILT` destination resolves to a real, scheduled BG wave** — spot-checked all 33
   rows; representative sample: `BF.W-DOCK-INTEGRATE`/`W-FISSION-FILAMENT`/`W-LAYER-IN-LIQUID`/
   `W-RAIL-FIDELITY` → `BG.W-DOCK-FISSION-WIRE` (cursor row 4.5, PENDING); `BF.W-SILHOUETTE-REALIZE`
   → `BG.W-DOCK-CUT` (row 4.3, PENDING, with the WS6/Siri coordination guard preserved verbatim in
   `FINAL.md:296-301`); `BF.W-VH-COMPOSE` → `BG.W-DOCK-INPLACE-MORPH` (row 4.10, PENDING) —
   correctly upgraded to the HARDER BG directive (kill the crossfade facsimile, in-place button
   only) rather than the BF compromise (BF kept the crossfade as an acceptable register); `BF.W-
   JUBILANCE-WIRE` → `BG.W-JUBILANCE-DECIDE` (row 12.2, PENDING) — `FINAL.md:152` already carries
   the actual verdict text ("RETIRE `useHaptic`… KEEP `useCelebrationBurst` (2 consumers)"),
   meaning the decide-work is substantively DONE in spec even though the wave row is still PENDING
   for the mechanical grep-and-cut; `BF.W-FLIP-SPINE` → `BG.W-FLIP-ONE` (row 10.6, PENDING, spec'd
   in `FINAL.md:116` and `bg-build-map.md:446`); `BF.W-SAFARI-CAPTURE`/`W-GOO-SPLIT-PERF` →
   `BG.W-SAFARI-PARITY-GATE`; `BF.W-CONSUMER-BAND` → `BG.W-GLASS-CONSUMER-BAND` (row 3.8, PENDING).

3. **The finer-grained BF `DEFERRED-CENSUS.md` (32 D-items) is separately threaded and does not
   silently degrade to the coarser wave-level ledger.** Every D1-D32 destination wave
   (`W-FLIP-SPINE`/`W-SPIKE-DELETE`/`W-VH-COMPOSE`/`W-SCROLL-FLUIDITY`/`W-PI-AUTHOR`/`W-GESTALT-
   WIRE`/`W-SAFARI-CAPTURE`/`W-GOO-SPLIT-PERF`/`W-JUBILANCE-WIRE`/`W-CONSUMER-BAND`/`W-FOLD-LEDGER`/
   `W-SILHOUETTE-REALIZE`/`W-FISSION-FILAMENT`/`W-RAIL-FIDELITY`/`W-CORNER-AA`/`W-ICON-PRESENCE`/
   `W-DESHADCN-SWEEP`/`W-DESHADCN-GATE`/`W-LIQUID-GROW-ON-EVENT`/`W-LAYER-IN-LIQUID`/`W-DOCK-
   INTEGRATE`) has ≥1 hit in the BG ledger/plan set, and the wave-level fold resolves them to the
   SAME final BG destinations the item-level census independently derived (e.g. D14 "neck doesn't
   span the gap" → `W-FISSION-FILAMENT` → `BG.W-DOCK-FISSION-WIRE`; D17 "corner aliasing" →
   `W-CORNER-AA` → `BG.W-GLASS-CLIP-DISCIPLINE`, row 3.3). No D-item names a destination that is
   absent from the BG registry.

**The RETIRE rows (10 total) are individually sound**, not silent drops with a rationale fig-leaf:
independently re-verified `GlassControl`/`DockNowPlaying` are genuinely absent from `src/`
(zero matches across the entire component tree), matching their RETIRE rationale ("never built…
the ≥2-binary-consumer bar is unmet"). The aurora satin/prism/reactive RETIREs are consistent with
the GL-fence discipline (`CLAUDE.md`'s W-AUR-KUWAHARA section: the procedural-medium ladder
currently tops out at `uMedium==7`; adding 8/9 speculatively with no consumer would violate
J-inv-10). `BE.W-CONCENTRIC-RADIUS` RETIRE correctly notes the Apple `containerConcentric` idiom is
already applied per-surface inline (SegmentedTabs track-radius) — a shared register would be a
premature abstraction over a single call site, exactly the kind of over-contrivance this whole
audit series is hunting.

## The one genuine residual risk (not a drop — a live chronic, correctly named)

`BG.W-DOCK-FISSION-WIRE` (cursor row 4.5, PENDING, class P) is explicitly flagged in `FINAL.md:288-
295` as **the THIRD attempt** at making the dock-fission engine real: "BE built it, BF specced
`DockNowPlaying` which never shipped, FISSION-WIRE is the THIRD attempt… do NOT re-book a 4th
time." This is the correct gestalt response to a genuine three-tranche pattern (plan → partial-
build → abandon), not a fold defect — the plan text itself carries the "DECIDE, don't rebook"
discipline (`BB.W-NDA-DECIDE` shape) and demands either a real ≥2-binary-consumer paint THIS cut or
a formal RETIRE. The risk worth naming for BG/BH execution: if `W-DOCK-FISSION-WIRE` is executed
under time/quota pressure as another "wire it enough to green the gate" pass rather than a genuine
≥2-consumer ship-or-kill decision, the chronic recurs a fourth time. The wave's own gate note
(`proof:dock-fission re-point`) and the `railProjection.fadeMinAlpha` fix (0 → ~0.2, the
macOS-Dock-stack "never fade to 0" reference) are concrete enough to build against; the risk is
executional discipline, not spec quality.

## Cross-check against `P-be-bf-fold.md`'s existing claims

`P-be-bf-fold.md` (undated header claim "verified against real HEAD `master @ 998136bb` v4.2.0")
predates the entire WS1-WS12 convergence pipeline (`896b33ea` 2026-06-25 onward) and the
`BE-BF-LEDGER` wave itself (`6105ed6f` 2026-06-28). Its per-group tables (A-F) are **still
factually accurate as a snapshot of the BD-union state** — every file/line-number claim independently
re-verified above holds. Its **proposed waves** (`BG.W-BE-BF-LEDGER`, `BG.W-DOCK-LIQUID-INTEGRATE`,
`BG.W-GLASS-CONSUMER-BAND`) were adopted, though `BG.W-DOCK-LIQUID-INTEGRATE` was renamed/merged
into the finer `BG.W-DOCK-FISSION-WIRE` + `BG.W-DOCK-CUT` + `BG.W-JUBILANCE-DECIDE` split during the
WS2/WS7 convergence passes — a reasonable refinement (splitting one omnibus dock-integration wave
into a wire-decide, a cut-decide, and a jubilance-decide is MORE decision-granular, not less). The
lens's headline finding ("the gates ship before the mechanism has a real consumer, becoming a false-
green certifier") is exactly the disease `BG.W-PAINT-IS-THE-GATE` and `BG.W-DEAD-GATE-SWEEP` now
exist to cure — no orphaned diagnosis.

**One stale detail in `P-be-bf-fold.md` worth flagging for its own housekeeping (not a BG action
item):** its `docs/tranches/AZ/audit/DISPOSITION-REGISTER.json` reference and its framing of
`BG.W-DISPOSITION-RESTAMP`/`BG.W-DEFERRED-LEDGER` as still-owed is now OUT OF DATE — both waves are
DONE per the current cursor (rows 0.4, 0.6). This is expected drift for a point-in-time audit
artifact and does not indicate a fold gap; it indicates `P-be-bf-fold.md` itself should be treated
as historical evidence, not a live status source (which this A4 recap, and the SEED-CONTEXT's own
instruction to "verify deltas," already accounts for).

---

## Findings (ranked)

### Finding 1 (informational, not a defect) — the BE/BF fold is a positive case study, not a gap
The 70-wave + 32-item disposition ledger, gate-locked and currently GREEN, is the single cleanest
piece of process discipline found in the corpus for this lens. It should be held up as the template
for any FUTURE half-executed-tranche-of-tranches situation (a real risk given the BG+BH interleave
pattern currently running). No wave content is silently dropped; every RETIRE carries a real
rationale; every NEVER-BUILT names a real, currently-scheduled wave.

### Finding 2 (minor, process risk not a code defect) — the fission-wire chronic needs an execution-time tripwire, not a new wave
`BG.W-DOCK-FISSION-WIRE` is a THIRD attempt at a load-bearing dock mechanism. The spec text already
contains the correct discipline ("do NOT re-book a 4th time"), but a discipline stated in prose is
exactly the class of thing that erodes under quota/time pressure during actual execution (the same
pattern that produced the original disease: BE built engines, BF specced the wiring, neither ran to
completion). There is no NEW spec gap here — the fix is procedural, at execution time, not planning
time.

### Finding 3 (minor) — `P-be-bf-fold.md` is stale on 2 of its own status claims
`P-be-bf-fold.md`'s references to `BG.W-DISPOSITION-RESTAMP`/`BG.W-DEFERRED-LEDGER` as pending are
now stale (both DONE). This is not a BG action item — it's a note for anyone reading that audit file
going forward: treat it as a dated forensic snapshot, cross-reference the live cursor for current
status (which this recap and the SEED-CONTEXT's own instructions already do).

---

## FOLD CANDIDATES

### 1. `plan-doc-edit` — annotate `P-be-bf-fold.md` with a "SUPERSEDED-BY" header
**Detail:** Add a one-line header note to `docs/tranches/BG/audit/P-be-bf-fold.md` pointing at
`docs/tranches/BG/BE-BF-LEDGER.md` (the now-live, gate-locked successor) and this A4 recap, so a
future audit pass does not re-derive the same fold analysis from a stale snapshot. Zero-risk,
zero-build, pure hygiene — mirrors the pattern this file already uses for its own sibling
cross-refs.

### 2. `defer-honest` — no new wave for BE/BF fold coverage; the existing ledger is sufficient
**Detail:** Do NOT add a `BG.W-BE-BF-RECAP` or similar wave. The ledger (`proof:be-bf-ledger`) is
already the load-bearing artifact; a recap document (this one) is evidence for the audit series,
not a build deliverable. Adding a wave here would itself be the over-contrivance this audit series
exists to hunt (ceremony for ceremony's sake, a 361st gate script).

### 3. `amend-wave` — strengthen `BG.W-DOCK-FISSION-WIRE`'s spec with an explicit "no re-book" self-test
**Detail:** The gestalt/architectural fix for Finding 2 is not a new wave but a strengthening of the
EXISTING `BG.W-DOCK-FISSION-WIRE` wave: its gate (`proof:dock-fission re-point`) should carry a
machine-checkable clause that FAILS the wave if it ships with `useDockFission` still at 0 or 1 real
`src/` SFC consumers (the ≥2-binary-consumer bar, J-inv-10, stated as code not prose) — mirroring
the `BB.W-NDA-DECIDE` terminal-lock precedent (`proof:nda-decided`) already cited in CLAUDE.md as
the discipline this wave is supposed to follow. This closes the "prose says don't re-book, but
nothing enforces it" gap between spec intent and gate enforcement — the SAME class of gap
(mechanism-real-but-unwired-and-ungated) that created the original BE/BF disease in the first
place. This is an idiomatic transposition (borrow the proven NDA-DECIDE terminal-lock shape) rather
than a patch (a manual reminder comment).
