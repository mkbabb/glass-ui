# B2-dock — adversarial hardening of AY.W-DOCK2 (entering-child onset lockstep gate)

**Lane** B2-dock · **Wave** AY.W-DOCK2 · **Verdict** GAPS-FOUND
**Scope** the dock-lockstep chronic IMPL half — is the user's actual lag (shell shrinks,
items lag) GENUINELY fixed in the as-built, or did the gate just get re-defined to pass?
Does the captured DELTA SHOW the lockstep? Is the gate non-tautological + binding the real onset?

---

## What is GENUINELY landed (red-team confirmed, not just claimed)

These I verified by running gates, born-RED edits, and reading source — they hold up:

- **The tautology IS demoted (D1).** `proof-dock-animation-live.mjs:463-476` keeps the
  box-vs-scalar onset Δ as a non-binding `facts.onsetDeltaMs` with NO `violations.push`.
  The structural sanity comment is corrected. This is real, not cosmetic.
- **The REAL entering-child witness exists + is born-RED-able (HG1).** The gate now samples
  `.dock-layer--full`'s last child opacity (`:180-196`), computes `lastChildVsBoxMs`
  (`:506`), and pushes a violation past `LOCKSTEP_BUDGET_MS` (`:510-514`). The D1 blind-spot
  guard (`:494-499`) REDs an unsampled child. `node scripts/proof-dock-lockstep-bornred.mjs`
  fires the violation on the lag arm and clears on `--head`. The selector is correct: I
  confirmed `GlassDock.vue:576` makes `.dock-layer--full` carry `dock-layer.is-active`, so
  `.dock-layer--full > *` IS the `.dock-layer.is-active > *` the stagger CSS targets.
- **HG3 dead-witness fix is REAL.** `proof-spring-tokens-synced.mjs` now reads
  `DOCK_SPRING` from the canonical `dockMorphContext.ts` (`:33-35,70-72`). I born-RED-proved
  it: editing `dockMorphContext.ts:39` to `dampingFraction:0.45` reds the gate with 4
  violations (was GREEN before reading the vestigial copy). Confirmed.
- **HG5 single-indicator + one-clock are REAL + born-RED-able.** `:indicator="false"` at
  `DockLayerGroup.vue:221`; rail indicator re-pointed off `--dock-motion-resize` to
  `--spring-snappy` (`layer-group.css:199-214`). Removing the real attr reds the gate
  (`single-indicator: false`, FAIL) — verified after correcting a flawed first test.
- **HG4 drift-guard is born-RED-able** (device-free `detectFlipDriftGuard`: HEAD 5/5 markers
  + BOOKED present → 0 violations; stripping the BOOKED marker → 1 violation).
- **§F1 documented + §F2/HG4/persistence BOOKED** with real markers in source
  (`GlassDock.vue:185-200`, `CLAUDE.md:378-380`, `dockMorphContext.ts:325`,
  `DockLayerGroup.vue:184`, `useLayerTransition.ts:36`). The persistence BOOK is honest —
  the rail genuinely still sits inside the clipped `--full` pane and vanishes on collapse;
  landing it outside needs a `GlassDock` chrome slot the band lacks. typecheck exit 0.

The substrate is sound and the gate is no longer a tautology. That part of the wave's
thesis is delivered. The gaps below are about WHAT THE GATE ACTUALLY WITNESSES and whether
the GREEN side is captured at all.

---

## FINDINGS (still wrong / not perfected / not captured)

### F1 — [HEADLINE / BLOCKING] The captured DELTA does NOT show the lockstep. HG6 is OWED; zero W-DOCK2 PNGs exist.
The prompt's core question — "Does the captured DELTA SHOW the lockstep (items fade in sync
with the shell)?" — answers **NO**. `ls docs/tranches/AY/audit/visual/` has **zero
`W-DOCK2-*.png`** files. The DELTA itself admits it (`W-DOCK2-DELTA.md:10-12,232-234,286-291`:
"the own-surface live frame-series DELTA (HG6) is OWED ... this row is `live-pending`").
W-DOCK2 is on `VISUAL-ALLOWLIST.json` but has no captured own-surface frame-series. The
cardinal lesson (MEMORY: "live-verified needs a captured DELTA artefact, not a
commit-message claim") is unmet for this wave's headline. The component is NOT live-verified.

### F2 — [BLOCKING] There is NO captured GREEN run of the gate against the REAL `/dock/overview` dock.
The persisted live artifact `.cache/gates/AX-dock-animation-live.json` (mtime 16:02, the
W-DOCK2 landing) is status `fail` with `enteringChildOnsetMs: 708`, `lastChildVsBoxOnsetDeltaMs:
700.9` — i.e. the state-of-record is the BORN-RED run against the **synthetic fixture**, not a
GREEN run against the real collapsible dock. Every "GREEN" in the DELTA is either (a) the
device-free `--head` synthetic arm with a **fabricated** 66.7ms onset (`bornred.mjs:89`
hardcodes `FRAME + 60`), or (b) prose claiming the π-twin asserts it on a real device. The
route fix (`pi-manifest.ts:82` → `resolveScene("dock","overview")`) IS landed correctly, but
the gate was never exercised GREEN on the real dock in a persisted artefact. So W-DOCK2 has
no captured proof that the real dock passes its own new gate — the entire GREEN side rests on
synthetic timelines + an un-exercised route fix.

### F3 — [SUBSTANTIVE] The budget (537ms) does NOT bind the user's perceived-lag number; the goal was silently re-framed.
The user's chronic complaint is "items lag a few ms" (perceptually ~tens-to-hundreds of ms).
`LOCKSTEP_BUDGET_MS ≈ 537ms` (`proof-dock-animation-live.mjs:116-117`). A real 150–400ms lag
**PASSES** this gate. The wave re-frames the goal from "items fade in lockstep with the shell"
to "the deliberate stagger is bounded by a 537ms ceiling," justified by W-DOCK1's
captured-ABSENT verdict (the trail IS the deliberate macOS cascade). That re-frame is
**defensible and evidence-grounded** (W-DOCK1's 12 real captures show `box↔scalar Δ = 0`), but
it must be read clearly: this gate does NOT witness the perceived-lag magnitude — it witnesses
only a gross "second-clock re-added" regression. The born-RED proves discrimination only at
EXTREMES (700ms RED vs 60ms GREEN); a regression landing the last child at, say, 450ms would
sail through and the born-RED would never catch it. The gate is non-tautological but LOOSE.

### F4 — [SUBSTANTIVE] The gate samples a child that is NOT at the cap-onset rung it claims; the budget over-estimates the real dock.
The gate comment (`:172`) and the live spec claim they sample "the `nth-child(n+6)` cap
rung — the largest-onset child." But the capture dock (`overview.vue:284-297`,
`data-testid="dock-capture"`) has exactly **5** `.dock-layer--full` children (Volume button,
Slider div, Separator, Mix button, Slider div). The CSS cap is `nth-child(n+6)` — needs a 6th
child. With 5 children the last child is `nth-child(5)`, onset `step×4 = 0.32`, NOT the
`step×5 = 0.40` the budget derives from. So the gate's stated worst-case child does not exist
on the surface it measures: the budget (537ms, derived on 0.40) over-estimates relative to the
real last-child onset (~0.32). This makes GREEN even safer/looser and means the gate never
actually exercises its own ceiling against a real cap-rung child.

### F5 — [MINOR / latent drift] The "0.4-vs-0.55 reconciliation" (HG2) left the source fallback at 0.55.
`layers.css:235` STILL declares `var(--dock-stagger-window-size, 0.55)`. HG2's reconciliation
fixed only the BUDGET DERIVATION (uses the shipped `shell.css:51` value 0.4). The shipped
cascade value always wins, so this is mostly harmless — but it is a documented-as-reconciled,
source-unchanged inconsistency. If `--dock-stagger-window-size` is ever unset by a consumer,
the window becomes 0.55 and the 537ms budget (derived on 0.40) under-estimates the resulting
ceiling. The fallback should match the shipped value (0.4) or be removed.

### F6 — [MINOR / inflation] The HG4 BOOK carries a fabricated "external consumer value.js" justification.
`W-DOCK2-DELTA.md:172-176` says the FLIP fold can't land because it "breaks the `/dock`
`useLayerTransition` public re-export (an external consumer — value.js, 'routes to AX.W34')."
value.js is a color-normalization library — it has no reason to consume a dock FLIP composable.
I confirmed `useLayerTransition` has exactly ONE live src consumer (`DockLayerGroup.vue:101`)
plus the `/dock` re-export — the clean single-consumer fold target the spec itself named. The
BOOK is fully defensible on the W-GOD1-carve-collision grounds ALONE; the value.js claim is
invented corroboration (the MEMORY "cardinal-lesson inflation" pattern). It should be struck.

### F7 — [SUBSTANTIVE / deferred-residue] The drift-guard guards FUTURE marker-divergence but does NOT close the EXISTING behavioral drift.
D4 explicitly found the two FLIP engines ALREADY drifted: the orchestrator re-bases sibling
targets (`dockMorphContext.ts:296-303`), the standalone `useLayerTransition` has NO sibling
logic — so a standalone vs nested `<DockLayerGroup>` have DIFFERENT mid-flight retarget
behavior TODAY. `detectFlipDriftGuard` is a string-MARKER match (does each engine contain
`--dock-morph-from`, `data-morphing`, `max-content`, etc.) — it does NOT assert behavioral
equivalence, so the existing sibling-rebase divergence passes the guard unflagged. The DELTA
frames it as "a divergence in the shared dance cannot ship silently," but the divergence that
ALREADY shipped is exactly what the marker-guard cannot see. Real behavioral unification waits
on W-GOD1; the guard is a tripwire for new string-drift only, not a closure of D4.

---

## Deferred / booked (legitimately, not silently)
- HG4 FLIP-engine fold → AY.W-GOD1 (defensible: W-GOD1 carves the same FLIP code; clean
  single-consumer fold, but the value.js justification in F6 is bogus).
- §F2 `#persistent` first-mount FLIP mis-seat → AY.W-GOD1 (honest reproduction in source).
- Rail persistence-on-collapse → AY.W-GOD1 (honest: needs a GlassDock chrome slot the band lacks).
- HG6 own-surface light+dark frame-series DELTA — OWED, orchestrator-captured (F1 above).

## Gestalt
The gate is no longer a tautology — that is real and born-RED-proven (HG1/HG3/HG5 all fire on
synthetic edits). The substrate (single `--dock-morph-t` scalar) is correctly kept, not
churned. BUT the wave is NOT perfected end-to-end against the user's bar: (1) it has NO
captured visual DELTA and NO captured GREEN-on-real-dock artefact — the headline live proof is
entirely OWED + synthetic (F1, F2, BLOCKING); (2) the binding budget is 537ms while the user's
complaint is a few-ms-to-tens-of-ms lag, so the gate witnesses only a gross regression, not the
perceived number, and the born-RED only discriminates at extremes (F3); (3) the gate samples a
5-child dock that has no cap-rung child, so its own ceiling is never exercised against the
worst case it claims to bind (F4). The wave converts a tautology into a LOOSE-but-real gate
and books the hard parts to W-GOD1 — solid engineering, but "stunning/perfect, captured" is not
met: the as-built proves the gate CAN red, not that the real dock GREENs, and shows no pixels.
