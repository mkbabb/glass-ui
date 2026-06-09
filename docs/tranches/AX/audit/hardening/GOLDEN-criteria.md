# GOLDEN-criteria — the falsifiable done-definition that PERFECTS the component library

**Lane:** GOLDEN-criteria (adversarial red-team — convergence done-definition) · **Mode:** PLANNING / audit (no code) ·
**HEAD:** `89f235a` (3.8.0 + convergence W44-W61 spec-authored) · **Branch:** `at-dock-convergence` · **Verdict:** DEFERRED-CHRONIC

> The brief asks: what must be OBJECTIVELY TRUE for AX, complete, to PERFECT the library? This lane defines
> that checklist AND red-teams the tranche's CURRENT done-definition against it. The finding that bites:
> **AX has no falsifiable done-definition — its only close gate (`proof:live-verified-ledger`) is unwritten,
> owned by the LAST wave (W33), and shaped to pass on a prose stub.** Every criterion below is RED at HEAD.
> The library cannot be "perfected" against a definition that does not exist and cannot be machine-checked.

---

## THE GOLDEN CHECKLIST — 9 criteria, each OBJECTIVELY TRUE or RED, each with its current state

A criterion is GOLDEN only if it is (a) falsifiable by a named gate or a captured artefact, (b) verified at
AUTHORING time not at close, and (c) not satisfiable by a proxy (a prose file, a reasoned re-derive, a
manual-unblock). The table is the done-definition; the prose below each is the red-team of the current state.

| # | GOLDEN criterion (the done-definition) | Falsifier (the gate/artefact) | State @ HEAD |
|---|---|---|---|
| **G-1** | **Glass cohesion is MEASURED, not asserted.** Every glass surface class (5 rungs, `.glass-card`, `.glass-dock`, `.dock-icon-button`, `.glass-btn`) composes ONE model: the oklab tint wrapper, the unified rim, the unified grain, the SAME specular-armed hover discipline, a tier-correct under-shadow. `--glass-level` is the single knob, byte-identical at `level=1`. | a NEW `proof:glass-one-model` (does not exist) + `proof:glass-level` (W54, unwritten) | **RED** — 3 divergent impls; dock shell hand-rolled OFF the model; 19 dock/Button specular tracks bloom where Card is clean (I.W6); `grep glass-level src/` = 0 |
| **G-2** | **The dock is PERFECTED.** Morph (single scalar, live-captured), layers/rail, controls (home-left + nav + dividers, ALL docks one root), persistent-nav, mobile `--ui-scale`, glass-default selected state, squircle, collapsed pill correctly sized. | `proof:dock-region-model` + `proof:dock-unify-root` (W61, unwritten) + a captured morph rAF DELTA | **RED** — Q1 collapsed pill mis-sized (floor tokens UNDEFINED); Q3 hover imperceptible; W61/dock-unify spec-only; ZERO captured dock DELTA |
| **G-3** | **Zero chronic-defer carry.** No BOOK/ARCHIVE/pending-handoff item rides forward un-closed; every named-trigger disposition is machine-re-evaluated each close; the 4 immortal late-chronics (native-drawer, webgl-golden, phantom-classes, styling-hygiene) are BUILT or FORMALLY DELETED. | a NEW `proof:disposition-live` (does not exist) | **RED** — native-drawer BOOK'd 6× (trigger met at AT); `proof:webgl-golden` deferred 2 tranches; `proof:styling-hygiene` MIA + amnestied since AW.W20 |
| **G-4** | **Every `live-verified`/`complete` wave has a captured on-disk DELTA** (≥1 real `.png` per route × ≥2 viewports × light/dark, newer than the touched source), enforced at the wave-landing COMMIT, not at close. | `proof:live-verified-ledger` (SPEC'd, UNWRITTEN, owned by W33-last) requiring a real image not a section marker | **RED** — 0 PNGs in `audit/visual/`; 7 PROGRESS rows `live-verified (DEVELOPED)` over JSON `…live-pending`; gate is paper |
| **G-5** | **The publish is clean: tag ∈ master, ci.yml == manifest, no manual gate-unblock, no ratcheted budget.** A dry `--run release` against a clean tree is GREEN with zero hand-patches. | master-ancestry guard in `release.{sh,yml}` + `gates:verify-ci` IN the release set + a `--run release` dry-cut artefact | **RED** — ci.yml is 20 gates behind (CI RED on its own self-check); `gates:verify-ci` NOT in release set; 3.8.0 cut hand-patched 3 gates; budget breaching NOW (~103.5% gzip) |
| **G-6** | **No headless-green-over-broken survives.** Every named live BLOCKER (W46 blob, W48 glass-material, Q8 gate-pattern, W44 dark-contrast, Q2 aurora black-bar) is fixed AND live-captured; no published surface throws or paints black. | `proof:substrate-paints-color` (exists) + `proof:no-published-broken` (does not exist) + captured DELTAs | **RED** — blob/glass-material/gate-pattern all live-broken at HEAD; the class that motivated AX is recurring INSIDE AX (round 3, W19 RED-witness still RED while marked `live-verified`) |
| **G-7** | **MAXIMAL glass-first is the LANDED default AND legible.** A bare `<Button>` / story card / chrome paints glass over the rich backgrounds; W55 adaptive-darken keeps every content-on-glass-over-busy case ≥ 4.5:1; the opaque escape is the level-0 endpoint of ONE path. | `proof:glass-level` (W54) + `proof:adaptive-glass` (W55) + a contrast-readback π DELTA | **RED** — default button is opaque `bg-primary`; W54/W55 spec-only; `grep glass-backdrop\|contrast-color src/` = 0; dock-over-light unreadable (G2) |
| **G-8** | **Every page DEMONSTRATES the glass** (W60 page-redesign): each story in a glass card over a unique rich (aurora/constellation/fourier/paper/grid) per-page background with proper hierarchy. | `proof:page-redesign` (does not exist) + a per-page captured DELTA | **RED** — W60 spec-only, BLOCKED on W54 which is spec-only; the entire Batch-4 umbrella is un-landed |
| **G-9** | **PROGRESS == JSON == DELTA == live-truth** (no status inflation anywhere); the soundness ledger is tri-consistent AND each `complete` names a real pixel. | the H5-form `proof:live-verified-ledger` (JSON `complete` requires a `deltaArtefact` field) | **RED** — 7 PROGRESS/JSON mismatches at HEAD; W15/W16 flat `complete` in both while blob is live-broken (honest-but-stale class) |

**The done-definition in one line:** AX PERFECTS the library when G-1..G-9 are each GREEN by a NAMED gate or a
CAPTURED on-disk artefact — NOT by a commit-message claim, a reasoned re-derive, a prose DELTA, or a
manual-unblock. **At HEAD, 9 of 9 are RED, and 6 of the 9 falsifying gates DO NOT EXIST.**

---

## THE HEADLINE CHALLENGE (it bites): AX has no falsifiable done-definition

The tranche's entire close-discipline rests on ONE gate, `proof:live-verified-ledger`, and that gate is:
- **NOT IMPLEMENTED** — `ls scripts/proof-live-verified-ledger.mjs` → *No such file*; `grep -c
  live-verified-ledger package.json` → **0** (verified at HEAD).
- **OWNED BY THE LAST WAVE** — `MASTER-PLAN.md:39` places it in Batch 9 / W33-terminal; `PROGRESS.md:51` W33
  = `planned`. A close-gate that lands last cannot prevent the inflation that happens in batches 1-8 — it can
  only post-hoc discover it (which three hand-audits already did).
- **SHAPED TO PASS ON A STUB** — its device-free SOURCE arm (the only arm that runs in CI) checks for a DELTA
  file with section markers; the two existing DELTAs (`W01-DELTA.md`, `W02-DELTA.md`) carry exactly those
  markers and ZERO pixels (`find audit -name "*.png"` = 0). A grep-for-headings gate passes a captureless
  prose file.

So the library is being "perfected" against a definition that (a) doesn't exist as code, (b) lands too late
to bite, and (c) is satisfiable without the pixel it purports to require. **That is not a done-definition —
it is the headless-green proxy moved up one level: a GREEN ledger over an un-captured surface.** (Cross-ref
`CHRONIC-miss-cardinal.md` Challenges A-E, fully concurred — this lane elevates that finding from "the
cardinal lesson recurs" to "the tranche has no GOLDEN bar at all.")

---

## SOURCE-GROUNDED STATE OF THE 9 CRITERIA (verified at HEAD `89f235a`)

Every claim below was re-run directly, not taken from a sibling doc:

```
find docs/tranches/AX/audit -name "*.png"                → 0   (G-4 RED: zero captures)
ls scripts/proof-live-verified-ledger.mjs                → No such file   (G-4 gate is paper)
ls scripts/proof-no-orphaned-wave-claim.mjs              → No such file   (G-6 W19-class gate unbuilt)
ls scripts/proof-styling-hygiene.mjs                     → No such file   (G-3 MIA ci-tagged gate, amnestied)
ls scripts/proof-glass-card-tiers.mjs                    → No such file   (G-3 MIA gate)
grep -rc "glass-level" src/                              → 0   (G-1/G-7 RED: single knob does not exist)
grep -rl "glass-backdrop|contrast-color" src/           → (none)   (G-7 RED: adaptive seam absent)
ls -d src/components/custom/header-ribbon                → exists   (G-6 RED: W19 RED-witness #1 still RED while W19 = live-verified)
grep -n "HeaderRibbon" src/api/index.ts                  → :200-202   (W19 excision never landed)
npm run gates:verify-ci                                  → exit 1, "MISSING from ci.yml" ×20   (G-5 RED: CI fails its own self-check)
grep -c "live-verified (DEVELOPED)" PROGRESS.md          → 7   (G-9 RED: 7 inflated rows)
  W45 JSON status → "DEV-COMPLETE … TUNE owned by the orchestrator"
  W52 JSON status → "dev-complete-headless-green-live-pending"
  W56 JSON status → "dev-complete-headless-green-live-pending"
  W57 JSON status → "handed-to-orchestrator"
  W59 JSON status → "dev-complete-headless-green-live-pending"
                                                           (7 PROGRESS `live-verified` over JSON `live-pending` — the inflation is LIVE)
```

Every one of these is a falsifier the GOLDEN done-definition demands be GREEN, and every one is RED.

---

## CHALLENGES THAT FOUND A WEAKNESS (each falsifiable, source-grounded)

### C1 — The done-definition's ONLY enforcement gate is unwritten, last-owned, and stub-satisfiable (G-4, G-9)
`proof:live-verified-ledger` is the sole machine-check for "live-verified means a captured pixel." It does not
exist (`ls` = no file; `grep package.json` = 0), is owned by W33-last (`MASTER-PLAN.md:39`), and its SOURCE
arm passes on the two captureless prose DELTAs that are the protocol's only credited passes. A done-definition
whose enforcement is paper is not a definition.

### C2 — Six of the nine falsifying gates do not exist; the library cannot be measured against GOLDEN
`proof:glass-one-model` (G-1), `proof:dock-unify-root` (G-2), `proof:disposition-live` (G-3),
`proof:live-verified-ledger` (G-4), `proof:no-published-broken` (G-6), `proof:page-redesign` (G-8) are all
UNBUILT. Of the nine GOLDEN criteria, only G-5 (`gates:verify-ci`, which exits 1) and G-7's W54/W55 gates
(spec'd) have any concrete falsifier — and those are RED or unwritten. **6/9 GOLDEN criteria have no falsifier
at all**, so "perfected" is unmeasurable for two-thirds of the bar.

### C3 — The CI mirror fails its own self-check NOW: 20-gate drift, and the release path never checks it (G-5)
`npm run gates:verify-ci` exits 1 with 20 ci-tagged gates MISSING from `ci.yml` — so master CI is RED on its
last step (`ci.yml:349`). The release set does NOT include `gates:verify-ci` (it's a YAML-only step), so
`release.sh`/`release.yml` publish trusting a manifest whose CI mirror they never verify. A GOLDEN publish is
impossible while the gate that guards mirror-parity is itself outside the release set.
(Cross-ref `CHRONIC-miss-release.md` Challenges 1-2, concurred + re-verified.)

### C4 — The MAXIMAL-glass decision INVALIDATES the close-band sequencing; the budget will RED at the tag (G-5)
The MASTER-PLAN Batch-8 sequencing (W27a/b carve BEFORE rebaseline) was authored assuming a CSS-SHRINKING
close. The user then decided MAXIMAL glass-first (W54) + squircle (W56) + adaptive-glass (W55) — three
CSS-GROWING waves. The budget is already breaching (~103.5% gzip, `CHRONIC-defer-late LATE-6`). So a
release-tagged gate (`profile:budget`) is GUARANTEED RED at the 3.9.0 tag by a user decision the sequencing
predates, and no close-band wave owns "rebaseline AFTER the glass-first CSS, BEFORE the tag." GOLDEN-G5 cannot
be true without re-sequencing.

### C5 — "Dock perfected" (G-2) is contradicted at its two most load-bearing endpoints
The collapsed-pill floor tokens `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` are UNDEFINED
in all of `src/` (`DOCK-morph.md` C4), so the morph faithfully animates to an OVER-WIDE, loosely-padded box
with no aspect lock — Q1 is structurally unfixed, not merely untuned. And Q3 (hover imperceptible) directly
contradicts W52's `live-verified` mark. A dock cannot be "perfected" while its collapsed endpoint is
mis-proportioned and its hover affordance is invisible. Both are spec-only fixes (W61/W54).

### C6 — The cardinal lesson is recurring INSIDE AX for the THIRD time, AT HEAD, through AX's own ledger (G-6, G-9)
W19 is marked `live-verified (DEVELOPED)` while its OWN born-RED witness #1 is STILL RED:
`src/components/custom/header-ribbon/` exists and `src/api/index.ts:200-202` imports it — the header-ribbon
excision (W19's headline) NEVER landed. A `live-verified` wave whose own falsifiable witness is RED at HEAD is
the precise proof that the done-definition is not enforced. (Slip-history below; `CHRONIC-miss-cardinal.md` #5.)

### C7 — Tri-consistency (PROGRESS=JSON=DELTA) is NOT live-truth — three un-browser-run ledgers can agree (G-9)
W15/W16 are flat `complete` in BOTH PROGRESS and JSON, and the blob is live-BROKEN. The JSON status was a
REASONED re-derive ("Could NOT run a real browser"). A consistency gate reads the three records as AGREEING
and passes — three honest ledgers of the same un-verified state. GOLDEN-G9 must require each `complete` to
NAME a real pixel (the H5 inversion), or the consistency it checks is consistency-without-truth.

---

## CHRONIC (the done-definition slip-history — how many tranches has GOLDEN been deferred?)

The "capture the live DELTA / define the binding close" obligation has been named-and-deferred at EVERY layer:

| Round | Where | The deferral | Slip |
|---|---|---|---|
| 0 | N.W4 → O.W7 → P.W6 | the π visual-runtime LANE (the detector itself) tooling-deferred 3 consecutive tranches → permanent-archive | the 4-tranche detector deferral that caused the AW blowout |
| 1 | AW close | AV shipped 3.3.0 with a live dock-collapse regression + per-frame-throwing blob while FINAL marked work DONE | published-broken close (`CHRONIC-defer-late LATE-5`) |
| 2 | AX.W00 | π-lane stood up — but every live arm is "orchestrator-run; agent lane SKIPs" → the gate only bites in the hands of the skipper | round 1 (W09/W05 `complete` over `live-pending`) |
| 3 | AX convergence | 6 waves relabeled `live-verified (DEVELOPED)` via commit prose; 0 DELTAs | round 2 (S-cardinal) |
| 4 | AX pass-3 | W52 `live-verified` LIVE-CONTRADICTED by Q3 (hover imperceptible) | round 2.5 (user live re-find) |
| 5 | AX HEAD | W19 `live-verified` while its RED-witness #1 is RED; `proof:live-verified-ledger` still unwritten + W33-owned | round 3 (soundness-reconcile) + THIS lane |

**The done-definition has been deferred to "the next/last wave" at every one of 6 layers.** The frequency is
INCREASING per tranche-phase, and the enforcement has landed at NONE of them. The institution has produced
more PROSE about the binding close (CAPTURE-PROTOCOL, S-cardinal, soundness-reconcile, 28 hardening docs) than
structural enforcement of it (`proof:live-verified-ledger` = 0 bytes). This is the deferral-with-telemetry
disease the `CHRONIC-defer-early/late` lanes name as the corpus's structural disease, now applied to the
tranche's OWN done-definition.

Plus the release-path chronics that block GOLDEN-G5, each deferred 2-4 tranches: budget rebaseline (12+ cuts,
I→AX, never-down), ci.yml drift (20-deep, deferred W00→band-close→W33), styling-hygiene MIA gate (amnestied
AW.W20→AX), native-drawer BOOK (6×, trigger met at AT), webgl-golden (2 tranches), phantom-classes (4
tranches escape-hatched RED).

---

## HARDENING ACTIONS — the gestalt to make GOLDEN a LANDED, falsifiable bar (PLANNING, no code)

The permanent close is NOT another ledger pass and NOT the W33-owned gate as positioned. It is the set of
structural inversions that make each GOLDEN criterion un-mintable as GREEN without its real artefact, enforced
at AUTHORING time. Ordered by leverage:

### HA-1 — RATIFY this 9-criterion checklist as the AX FINAL gate, and MOVE its enforcement to a W00-extension that lands NOW
The single highest-leverage move. Adopt G-1..G-9 as the binding done-definition in `MASTER-PLAN.md` + a new
`AX/GOLDEN.md`. Author `proof:live-verified-ledger` (G-4/G-9) as a **W00-band extension** (W00 is the
gate-philosophy foundation, already `complete` — extending it is in-character), register it immediately, and
run it as a **commit-msg/pre-commit hook** on any commit whose message contains `live-verified` or edits a
PROGRESS cell to `live-verified`/`complete`. The hook REDs unless the matching `audit/visual/W<NN>-DELTA.md`
references ≥1 on-disk `.png` newer than the wave's touched source. This kills the round-2/3 transmission vector
(prose `live-verified (MCP)` commits) at authoring time, where W33-last cannot reach.

### HA-2 — BUILD the 6 missing falsifier gates, OR the corresponding GOLDEN criterion is undefinable
`proof:glass-one-model` (G-1: all glass classes compose the unified tint/rim/grain/specular/under-shadow),
`proof:dock-unify-root` (G-2), `proof:disposition-live` (G-3: machine-re-evaluates every BOOK/ARCHIVE trigger
each close), `proof:no-published-broken` (G-6: every headline surface has a captured DELTA before the tag),
`proof:page-redesign` (G-8), and the H5-form ledger (G-9: JSON `complete` requires a `deltaArtefact` field).
Six gates, each a born-RED→GREEN authoring-time forcing function. Without them, 6/9 of GOLDEN is unmeasurable
and "perfected" is a claim, not a fact.

### HA-3 — KILL the prose-DELTA loophole + retire the `(DEVELOPED)` compound label
The SOURCE arm must require a real image file, not section markers (`CHRONIC-miss-cardinal` H2). Re-author
`W01-DELTA.md` + `W02-DELTA.md` to attach actual captures or revert them to `live-pending` so the baseline is
honest (they currently count as the protocol's only 2 passes and pass nothing). DELETE `(DEVELOPED)` as a
status modifier — the legal statuses are `planned`/`in-progress`/`dev-complete`/`live-pending`/`live-verified`,
where `live-verified` is GATE-DEFINED (HA-1), not author-asserted. `(DEVELOPED)` is the linguistic vehicle of
the inflation; remove the exact phrase the orchestrator reaches for.

### HA-4 — Run the OWED live-capture sweep NOW as a prototype, discharging the chronic at its source
Before any more waves land: drive chrome-devtools-mcp over the 7 inflated waves (W45/W52/W53/W56/W57/W59 +
W19) at ≥2 viewports × light/dark, rAF-sample the morph waves (W45), measure the Q3 hover (W52), and write the
FIRST real `audit/visual/W<NN>-DELTA.md` set with PNGs. This (a) discharges the capture debt that has slipped
since W00, (b) is the only thing that can confirm/refute the 7 `live-verified` marks, and (c) will almost
certainly surface ≥1 of the user-reported live defects (Q3 hover, Q1 collapsed pill) that the marks claim are
fixed — converting the inevitable user-pass-4 re-find into a pre-fix.

### HA-5 — Re-sequence the close-band for a CSS-GROWING close + harden the release path
The MAXIMAL-glass decision (C4) breaks the carve-before-rebaseline sequencing. Mint the post-glass-first
budget rebaseline as the LAST act before the 3.9.0 tag (the EIGHTH conscious lift, sized to carry the
glass-first CSS), with a `proof:budget-gate-present` self-check so a later consolidation cannot silently delete
it. Add `gates:verify-ci` (or a `--emit-ci` codegen-fresh check) to the RELEASE set. Add a master-ancestry
guard (`git merge-base --is-ancestor $SHA origin/master`) to `release.{sh,yml}`. Author the two MIA scripts
(`proof-styling-hygiene`, `proof-glass-card-tiers`) or DELETE the registrations + `KNOWN_DANGLING` amnesty —
clean break, no perpetual allowlist. Run a `--run release` DRY-CUT against a clean tree NOW and capture which
gates drift; a release is GOLDEN only on a captured green `--run release`, not a passing `proof:all`.

### HA-6 — Make BOOK/ARCHIVE dispositions FALSIFIABLE, or forbid them (the G-3 close)
`proof:disposition-live`: a BOOK / ARCHIVED-on-2-consumer-gate item may carry forward ONLY if a gate
re-evaluates its named trigger each close and FAILS if the trigger is now MET but the item is still un-built.
Resolve the 4 immortal late-chronics at their owning AX waves to BUILD or FORMAL-REFUTE (ban a 7th
native-drawer BOOK; promote-or-delete `proof:webgl-golden`; scope-out-or-land `proof:phantom-classes`;
write-or-delete `proof:styling-hygiene`). A prose realisation-condition no gate reads is a silent defer with
paperwork — which is exactly how AX's done-definition has slipped 6 rounds deep.

---

## THE GESTALT FINDING

The library will be PERFECTED when G-1..G-9 are each GREEN by a NAMED gate or a CAPTURED on-disk artefact. At
HEAD, **9 of 9 are RED and 6 of the 9 falsifying gates do not exist** — so the tranche has no falsifiable
done-definition to perfect against. The one gate it does specify (`proof:live-verified-ledger`) is unwritten,
owned by the last wave, and shaped to pass on a captureless prose stub; the cardinal lesson it exists to
enforce is recurring through AX's own ledger for the third time, at HEAD, in W19. The done-definition has been
deferred to "the next/last wave" at all 6 layers of the slip-history, and the structural fix has landed at
none. **GOLDEN is not a status AX can reach by closing more waves — it is reachable only by inverting three
properties NOW: land the enforcement gate at authoring time (not W33-last), make `live-verified`/`complete`
require a real pixel a grep cannot fake, and BUILD the 6 missing falsifiers so two-thirds of the bar becomes
measurable at all.** Until then, "AX is complete" and "the library is perfected" are claims with no falsifier
— the precise failure the cardinal lesson names.
