# BJ REFINEMENT — the plan of record

Date: 2026-07-24 · Phase: **tranche development only.** No source edits land from this document.
HEAD at audit: `0371836d` · package 7.0.0 live on npm.

This refines BJ. It opens no new tranche. It supersedes the BJ surfaces named in §5 and leaves the rest
of BJ standing.

---

## §1 — Why BJ needs refining, measured

BJ's formation is thorough and its execution did not happen. Both halves of that sentence are measured,
not asserted.

| measure | value |
|---|---|
| BJ markdown files | 484 |
| `docs/tranches` total lines | 858,514 |
| `src` lines (`.vue`/`.ts`/`.css`) | 86,899 |
| standing ratio | **9.9 : 1** |
| BJ execution week (07-17 → 07-23): docs ± | 191,172 |
| same week: `src` ± | 8,427 |
| commits that week touching **zero** `src` files | **149 of 181 — 82.3%** |
| untracked addenda produced in one ~20h span | 172,112 lines / 206 files |
| combined process : product for the week | **≈ 43 : 1** |
| BJ waves chartered | 50 |
| BJ waves wholly **absent** at HEAD | **21** |
| net component reduction against "purge to the core" | 66 → 63 dirs, 74 → 72 exports — **4.5%** |
| `npm test` at HEAD | **RED** |
| governed gate battery at HEAD | **does not exist** — working tree only |
| BJ `FINAL.md` | none |

The failure is not effort and it is not care. It is that the machinery rewarded producing documents and
did not reward changing source. Three mechanisms did that, and §2 removes all three.

---

## §2 — The six laws (the refinement's actual content)

These are not process decoration. Each one closes a measured mechanism, and each is machine-checkable.

### Law 1 — A finding needs a path and a failing command

> A finding is admissible only if it names a path under `src/`, `tests/`, `demo/`, `scripts/`, or
> `package.json` **and** a command whose output demonstrates it, or a live browser observation with the
> exact element and computed value. **A finding whose subject is another document is inadmissible.**

*Closes:* critic seats filing against the corpus. BJ duplicated derived data (counts, rosters, phase
lists, SHAs) across `PLAN.md`, `APOTHEOSIS.md`, the cursor and the band files, so every cure that
chartered a wave invalidated three or four copies, which the next round's critics correctly reported.
Six stability rounds produced 30 files / 7,054 lines at **13.6% yield and zero changed `src`**. BJ
diagnosed this for *counts* and swept once; the same mechanism then recurred for hashes and for SHAs
because a sweep is not a rule.

### Law 2 — Convergence is measured on content, never on provenance

> Provenance — parent hashes, critic hashes, schema versions — lives in git or in a sidecar, never inside
> the artifact being compared. The convergence predicate is defined over the content-only projection.
> **Round cap: 3.** The exit artifact is a merged commit. A handoff document is a failure result.

*Closes:* the non-terminating gate. `GATE-SEMANTIC-ROSTER-C{8..19}` embedded
`supersedesRosterSha256`, `parentFormationSha256`, `criticSha256.{A,B}` and an incrementing
`schemaVersion` **inside itself**, so every round produced a byte-different artifact even at zero content
change — and byte-different is, to the loop, a delta. Two-consecutive-clean was unreachable by
construction. Thirteen re-issues, 19,484 lines in 3h21m; `diff C17 C18` = 24 lines of which 23 are
provenance and one is a prose clause growing into a paragraph.

### Law 3 — The seat that reproduces a bounded defect lands it

> No model caste may hold a bounded fix. A route to a seat with no landed commits is a **hard failure**,
> not a valid disposition. **Model law, per the owner 2026-07-24: Opus 5 for all tasks.** Sol/Luna and the
> Fable/Opus split are both discharged and non-operative.

*Closes:* the absorbing sink. "Luna x-high" was reserved for bounded product edits and **authored zero
commits, ever** (`git log --all --format='%B' | grep -ci 'model: *luna'` → 0) while **103 files** routed
obligations to it. Proven end-to-end on one file: `supportsBackdropRefract.ts`, 174 lines, governed by
**43 documents / 13,264 lines** — 57 doc lines per source line changed — ending with the defects live at
HEAD and a ~20-line cure sitting uncommitted.

### Law 4 — Status is emitted, never authored

> A wave's close stamp is a machine-appended block carrying a runner exit code and the SHA it ran
> against. **No seat may hand-write one.** A wave with no emitted stamp is not closed. Wave→SHA→status is
> derived from commit trailers and gate exit codes; hand-authored restatement of anything git already
> knows is forbidden.

*Closes:* the drifting mirror. BJ's terminal five commits produced **17 source lines and 220 doc lines**,
four of the five being pure meta — including a commit whose entire purpose was retracting a "CURED, 16
tests GREEN" claim that described uncommitted bytes. `CLAUDE-SOL-IMPL-RECEIPTS.md` is 509 lines of which
13% is redress/strike/supersede language.

### Law 5 — The corpus is versioned, and it is smaller than what it changes

> A commit may not cite a document that is not itself committed (enforced in `commit-msg`). Tranche doc
> lines must not exceed **0.25 ×** the `src` lines the tranche actually changes, checked at close;
> over-budget documents are deleted, not archived.

*Closes:* the untracked authority stream — **240 uncommitted governing documents** cited by commits as
binding, including every steer from STEER-10 to STEER-34, and a superseding authority that was itself
untracked. And it inverts the ratio: this refinement set is a dozen files, and it governs a band whose
expected `src` delta is in the thousands of lines.

### Law 6 — An owner row closes only against the owner's own artefact

> Every owner row carries a **`(route, selector, property)` triple** taken from the complaint itself — the
> element in the screenshot, the named route, the named component. The row closes only against a probe
> whose RED-at-HEAD condition is *that* triple, measured at the pre-complaint commit and re-measured at the
> closing SHA, with both values in the stamp. **A probe authored after the complaint, or aimed at a
> different element, does not close the row.**

*Closes:* **verdict laundering by proximity** — and this law exists because the first five did not catch
it. `ECOUTE.md` §2 measured every one of the 76 owner rows against `2a949abe` (the last commit before the
feedback): **one is closed.** Thirty-five were never addressed; the rest read as worked because a *file*
changed while the *property the owner named* never moved. The taxonomy:

- **Codemod adjacency (8 rows).** One commit rewrote nearly every story file, so any row anchored to one
  acquired a diff. Three rounding complaints closed against a colocation path, an `aria-live` region, and
  a one-word edit. **No radius changed.**
- **Documentation as delivery.** F48's headline — "glass blur for ALL glass components slightly more
  subtle" — shipped as a token-file precept with all five blur radii **byte-identical** (1/7/7/11/11px).
  A13's only delta is a comment in `uniformBridge.ts` newly asserting "a real painterly read on both
  backends, never a silent smooth degrade" — while `aurora-mediums.wgsl.ts` routes four named mediums to
  one function. **The prose was updated to make the defect sound deliberate.**
- **Ruling as remedy.** `G-CFG-4` was recorded as a *regression guard* — an explicit decision to change
  nothing. F33's dot half closed by **RATIFICATION**, "ALREADY-AT-BAR": a green-on-arrival pin against a
  complaint.

**Why Laws 1–5 all miss it.** Law 1 governs the admissibility of *findings*, not the sufficiency of
*closures*, and every laundered row cites a real path. Law 4 is closest and still insufficient: a
machine-emitted GREEN proves a runner exited 0 against a SHA, and `G-CFG-4` **passed** — it was authored
to assert that nothing changed. **No prior law required a gate to be born-RED against the owner's own
complaint**, so a wave could author both the probe and the property it probes.

**And the error runs both ways.** The same audit found two rows this refinement recorded as open that had
already been fixed — `BJ.W-TOAST-DIALOG-PARITY` (`937aa510`) and `BJ.W-PROGRESS-RIM-REPLACE` (`19ea4ce1`),
both landing real source changes with paired π captures. Lead-verified. **A corpus built to diagnose
status inflation inherited a status deflation**, which is the same defect with the sign flipped, and Law 6
catches it in both directions because the triple is measured at both commits.

**This document is bound by its own laws.** Its evidence is `REGISTRY.md` and `ROUND-1-FINDINGS.md`, every
row of which carries a path and a command or a live computed value — and Law 6 was adopted because an
adversarial pass proved the first five insufficient, which is the only reason a law should ever be added.

---

## §3 — The bands

Order is a dependency order, not a priority order. Each band's waves live in `WAVES.md`; the per-component
wave specs are emitted by the per-component triumvirates and folded there.

```
BAND 0 — TRUTH ─────────────────────── nothing downstream is verifiable without it
  W-WEBKIT-CRASH    the engine we call first-class crashes 5/5 on every route
  W-PKG-TRUTH       family A · the package ships broken to consumers today
  W-GATE-TRUTH      family E · commit or delete the battery; collapse to real invariants
  W-PROCESS-CURE    family X, N-9 · the six laws, as hooks and scripts
        │
        ├── BAND 1 — REDUCTION ──────── family C, D · the ask BJ never executed
        │     W-COMMENT-DIET  ◀── PROMOTED. gates W-DAG-REDUCE; see below
        │     W-DELETE · W-DEAD-EXPORT · W-SHIM-PURGE · W-SELECTION-ONE
        │     W-DAG-REDUCE (re-authored) · W-TIMELINE
        │
        ├── BAND 2 — MATERIAL ───────── family B, I · glass identity + the renderer lie
        │     W-AURORA-MEDIUM · W-FROST · W-RADIUS-ROLE
        │     W-GRADIENT-BLUR · W-REFRACT-LATCH
        │
        ├── BAND 3 — MOTION ─────────── family G · breath of life, made checkable
        │     W-SPRING-RETUNE · W-ENGAGE-LADDER · W-FEEDBACK-MOTION
        │     W-ROUTE-MOTION · W-DISSOLVE · W-HANDMARK
        │
        ├── BAND 4 — DOCK ───────────── family H · owner: "fully contrived, should be replaced"
        │     W-DOCK (greenfield) · W-DOCK-FISSION · W-DOCK-OVERFLOW
        │
        ├── BAND 5 — STORY ──────────── family F, J · the surface the owner actually looks at
        │     W-PREVIEW-CARD · W-STORY-TAXONOMY · W-STORY-PROPORTION
        │
        └── BAND 6 — STRUCTURE + PERF ─ family M, X-4 · A07 colocation, weight, and the boot
              W-BOOT-SHELL · W-FRAME-DISCIPLINE
              W-COLOCATION · W-REPO-WEIGHT
```

**Ordering laws, only where real:**

- **Band 0 is first and is not negotiable.** BJ's §7 close ends in an 8.0.0 tag-push publish. Publishing
  over family A repeats the 7.0.0 mistake at a higher version, and no wave below can prove itself against
  a battery that does not exist at HEAD and is RED where it does. `release.yml:48` runs `npm test`
  immediately before `npm publish --provenance` at `:50`, and that suite is **RED right now**.
- **`W-WEBKIT-CRASH` gates every Safari verdict and every new primitive.** The demo crashes WebKit 5/5 on
  every route, dev and bundled, blocked by disabling CSS, in one 318 KB stylesheet. Until it is bisected,
  every entry in `MOTION-CANON.md` §8 is a prediction, not a proof. The largest single CSS contributor is
  the dock (4,207 lines / 25 partials) — the same component Band 4 replaces, so the two inform each other.
- **`W-COMMENT-DIET` precedes `W-DAG-REDUCE`.** This is the ordering change the adversarial critics forced.
  `src/components/` is **34.0% comment**, the dock **51.7%**, `src/styles/tokens/` **72.8%**. A frontier
  ranked by a number that is one-third prose is not ranked — it is how a 74-line `budget.ts` leak scored as
  a 21,000-line restructure. The prose pass is also **larger than the entire reduction plan**, at zero API
  risk, and it closes the DOC family and the two detectors that read commented-out code as live.
- **`W-AURORA-MEDIUM` precedes any aurora preset cut.** F08 ("presets are duplicative") is a *renderer*
  defect: on the live WebGPU primary, four named mediums return the same function
  (`aurora-mediums.wgsl.ts:387-403`). Cutting presets first deletes the evidence and fixes nothing.
- **`W-DOCK` precedes the `useDockAwareSurface` extraction.** Both critics reached this independently. Five
  components already import `../dock/composables/dockContext` and slider additionally imports
  `useDockHold`; extracting the shared surface first would cement the condemned API into the shared layer
  before it is replaced.
- **`W-SPRING-RETUNE` precedes every motion wave.** Every wave consuming `--spring-*` inherits the table's
  defects until it is corrected — though note the defect is **not** what it was thought to be: see
  `MOTION-CANON.md` §0, where the four monotone rows turn out to be the table honestly refusing to ship a
  curve that cannot exist, and the real error is a settle band calibrated for a press and applied to a
  425 px stroke.
- **`W-DOCK` consumes the motion canon.** The Music exemplar supplies its choreography; building the dock
  before the canon is settled re-invents it.
- **`W-PREVIEW-CARD` precedes `W-BOOT-SHELL`.** A17's slow-load diagnosis was taken against a card that
  renders nothing. A blank tile is not slow, it is empty — re-measure against the fixed card.

---

## §4 — The completion model

A wave is DONE when its born-RED gates flip GREEN with an **emitted** stamp, under these conditions:

- **Born-RED discipline.** Every gate names its RED-at-HEAD condition with a `file:line` or a computed
  value, and ships a mutation proving it can fail. A gate that would pass at HEAD is not born-RED and is
  rewritten or dropped. Refactor-safety and null-DELTA gates are stated honestly as such.
- **The gate budget is 40–60 for the whole library.** Present state is **1,095 `it()` cases across 217
  files** — 18–27× the ceiling. A gate that restates a token value is not an invariant. Every wave's gate
  proposal is summed at the band fold and cut to budget there.
- **CSS reachability is a union, not a closure.** `@import` from `src/styles/index.css` reaches 110 of 124
  `src/**/*.css`; the remaining 13 are reached by SFC `<style src="./styles.css">`. A gate modelling one
  mechanism false-positives; modelling the other, false-negatives. The invariant is the union.
- **π / DELTA.** Every visual claim carries a paired before/after capture naming route, engine, and
  viewport — **Chromium and WebKit, desktop and mobile.** Observe via screenshot and computed style only;
  never `getContext` on a live canvas (the context-steal trap). Serve on `localhost`, not `127.0.0.1`.
  Read the machine report, never a piped exit code.
- **Two challenges per wave**, run by seats that did not author it, assuming the wave is wrong.
- **No wave closes by copying derived data.** A wave that lands a roster, a count, or a line-anchored
  cross-reference another file owns has planted the next round's finding. It cites the owner instead.
- **Honesty about engines.** A primary that paints a poorer picture than its own fallback is a defect, not
  a graceful degrade. Per the owner 2026-07-24: **no chrome-special behaviour for any glass item.**

---

## §5 — What this refinement supersedes

Named explicitly, so nothing is superseded by silence.

| BJ surface | disposition |
|---|---|
| `EXECUTION-PROGRESS.md` §model-enforcement (Sol/Luna supersession) | **SUPERSEDED** by Law 3. Opus 5 for all tasks. Historical receipts keep the model that actually ran. |
| `PLAN.md` §4 SOL/LUNA SUPERSESSION + the Fable/Opus tier text | **SUPERSEDED** by Law 3. |
| `addenda/2026-07-21-convergent-hardening/` — 192 files, 42,633 lines, C1…C67 | **CLOSED as discovery.** Its findings are folded into `REGISTRY.md` where they carry a path and a command; the rest is superseded by Laws 1, 2 and 5. `FRESH-OPUS-EYES-DEVELOPMENT-HANDOFF-C67.md`'s read-order and steering-edict list remain valid as history. No C68 is minted. |
| `ASK.md` — 33 owner-gated rows | **REDUCED** to the rows in this folder's `ASK.md`. Most were already decided by the owner's own feedback or by a standing edict; re-asking them is what made the ruling surface a blocker. |
| `BJ.W-GATE-COLLAPSE` | **SUPERSEDED** by `W-GATE-TRUTH` — it is absent at HEAD and its acceptance instrument reported success without measuring. |
| `BAND-REDUCTION` scheduling of F08 as a preset cut | **RE-ROOTED** onto `W-AURORA-MEDIUM`. The defect is in the shader, not the preset table. |
| `GF-DOCK-PASS3` wave-shape | **SUPERSEDED** by `W-DOCK` under the owner's 2026-07-24 ruling that the dock API is contrived and should be replaced. Its research stands as input. |
| The execution cursor's close criterion ("landing bytes can never mark a row done") | **STRUCK.** Law 4 replaces it. |
| The 21 absent chartered waves | **RE-SCOPED, not re-booked.** Each appears in `WAVES.md` under a band, or is retired with a reason. |

**Left standing:** `FEEDBACK-LEDGER.md` (the owner's words are the record), the nine `BAND-*.md` research
bodies as input, `formation/` as input, `IOS27-MICRO/FINAL/` as executed history.

---

## §6 — The close

BJ closes when:

1. Band 0 is GREEN with emitted stamps — the package installs and imports cleanly from a packed tarball
   under `node16`/`nodenext`, the battery exists at HEAD and is GREEN, and the six laws are enforced by
   hooks and scripts rather than by prose.
2. Every band's waves are DONE per §4, each with two challenges by non-authors.
3. Every `FEEDBACK-LEDGER.md` row F01–F50 and A01–A17 is FIXED-with-evidence, or carries a one-line
   retire-with-reason. **A row marked "touched" by a global codemod is not fixed** — F43, F45 and F46 are
   re-opened on exactly that ground.
4. The π/DELTA obligations are captured across all four cells (Chromium/WebKit × desktop/mobile).
5. `ASK.md` in this folder is marked by the owner.
6. The overfitting audit runs: every `src/` artefact has ≥2 sites, or is exported and earned, or is a
   named private demo helper.
7. `R-PUBLIC-8-LEDGER` is GREEN — the complete v7-tag→candidate export-map and public barrel/type diff,
   the migration map, and a fresh consumer census — **before** the 8.0.0 cut.
8. The close runs `--run release`, not `--run local` (the 7.0.0 lesson).
9. `FINAL.md` is written. BJ currently has none.
10. The doc budget of Law 5 holds: this refinement's line count ≤ 0.25 × the `src` lines the band changed.

`docs/precepts/` is read-only. No legacy code: no aliases, no shims, no dual paths, no masking fallbacks.
