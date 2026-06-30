# PT-2 — G4 `BG.W-CLOSEFIX-9SITE` re-baseline against the moved frontier + explicit precond encoding

**Mode:** spec (corrected approach) · **Pass:** 1 · **Targets:** C2 [HIGH] + C11 [MED] (DAG defect + carve→re-grow chain) · **Date:** 2026-06-30
**Branch:** tranche/BG · **HEAD:** `4c761b64` · **Author:** PT-2 prototyping agent (READ-MOSTLY; recorded findings only, zero src/demo/scripts/CLAUDE.md edits)
**Feasibility verdict:** **TRUE** — the full 9-site carve+retirement is already spiked on disk against the CURRENT 527/510 frontier (`c0f6e1ee`, worktree-only, 20 files, all gates flip); the amendments are plan-doc edits + one gate-binding, no design unknown.

---

## 0. The defect, re-verified on disk (not trusted from prose)

| Claim under audit | Live-tree truth (this pass) |
|---|---|
| `ladder.css` > 500 (R1 live) | **527L** — confirmed; NOT in `RATCHET_BASELINES` → `proof:no-god-module` reds it NOW |
| `dock/shell.css` > 500 (R2 live) | **510L** — confirmed; NOT in `RATCHET_BASELINES` → `proof:no-god-module` reds it NOW |
| `--glass-blur-dock` chain present | **present in SRC** (`tokens/glass.css:103,166-167`, `dark-arm.css:286`, `bridges.css:334`) |
| dock-blur re-point is G4's edit | **ALREADY SHIPPED by WS3 3.6 `cd9ce46`** — `dock/shell.css:29` reads `--dock-surface-blur: var(--glass-blur-resting)`; G4 must NOT re-apply it |
| "dist byte-identical to HEAD (dead token already tree-shaken)" | **TRUE at the current HEAD** — `grep -c glass-blur-dock dist/glass-ui.css` = **0** (3.6 made the chain unread → the bundler already dropped it; SRC still carries 4 declaration lines that emit nothing) |
| G4 "LANDS FIRST, before WS1" | **counterfactual** — WS1 (2.1 `89dc3dee`, 2.2 DONE) + WS3 (3.5 PENDING but 3.6 `cd9ce46`, 3.7 `6ec81de`) already landed; G4 row is `12.0` in the WS7 block with a high seq |
| G4 named as precond by a WS1/WS3 wave | **ZERO** — 3.5 GLASS-TINT-UNIFY `*Precond:*`="WS1-GATED", 14.1 PAPER-GRAIN-REAL `*Precond:*`="GU-1 token", WS8.1 SUFFUSE-UNIVERSAL un-preconditioned on G4 |
| the 9-site diff is feasible against the moved frontier | **PROVEN** — spike `c0f6e1ee` carves 527→470 + 510→459 from the live tree + fully retires the chain across 20 files; all 15 affected device-free gates flip in the diff |

**The feasibility spike (`c0f6e1ee`, branch `worktree-wf_521a777b-791-7`, NOT an ancestor of HEAD):**
`R1` carve `ladder.css 527→470` (grain `.glass-*::after` cohort → NEW `glass/grain-overlay.css`) + `shell.css 510→459`
(`.dock-persistent` region tail → NEW `dock/shell-regions.css`), byte-isomorphic. `R2` chain DELETION (the 4 SRC declaration
lines become retirement-record comments; `--blur-dock` bridge + `--glass-saturate-dock` deleted). `R3` `ci.yml` regen.
`R4` `category-card-warm → [local,ci,release]`. Cascade: `glass-cal B1/B3`, `glass-depth D3`, `no-god import-order`,
`dock-shrink-blur S3`, `theme-style`, the spine unit test, `glass-cal.spec` π. The spike is the existence proof; this spec
re-baselines its SPEC TEXT so the integrator builds it without a false byte-diff red or a double-applied re-point.

---

## 1. Re-baseline A — site (b) is the chain DELETION only, not the dock re-point (WS3 3.6 already shipped it)

**The stale text** (`bg-build-map.md:448-450`, `EXECUTION-PROGRESS.md:226`): "R2 FULL RETIREMENT of the `--glass-blur-dock`
chain … the dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (8px peer, verified 0 orphan readers)."
The parenthetical frames the dock re-point as a PRE-EXISTING FACT, but a fresh integrator reading "RETIREMENT … the dock paints
via `--dock-surface-blur`" can re-author `shell.css:29` (it is already there) → a double-edit / no-op churn, and can diff bytes
against the 4.2.0 base the spec was written at → a false red.

**The corrected text** (amend `bg-build-map.md:448-450` + `EXECUTION-PROGRESS.md:226`, prepend the PRECONDITION-FACT clause):

> **R2 — `--glass-blur-dock` chain DELETION (the dock re-point is a LANDED PRECONDITION-FACT, NOT G4's edit).**
> WS3 3.6 (`cd9ce46`) already re-pointed the dock backdrop source to `--dock-surface-blur: var(--glass-blur-resting)`
> (`dock/shell.css:29`, 8px peer) — **G4 does NOT touch `shell.css:29`.** G4's R2 is the now-orphan chain-token DELETION:
> the composite `--glass-blur-dock` (`glass.css:166-167`), its `--glass-blur-dock-radius` (`glass.css:103`) +
> `--glass-saturate-dock` inputs, the dark arm (`dark-arm.css:286`), and the `--blur-dock` bridge (`bridges.css:334`) —
> replaced by 4 retirement-record comments (the spike's exact form). **0 GLASS-UI-INTERNAL orphan readers** — but see §6
> (the bbnf-buddy EXTERNAL override is a coordination ask, not an internal reader; the "0 readers" claim is
> internal-only and MUST be re-scoped).

---

## 2. Re-baseline B — the byte-identical invariant, re-anchored to the live HEAD and split by part

**The stale invariant** (`bg-build-map.md:466`, `EXECUTION-PROGRESS.md:226`): "dist `glass-ui.css` BYTE-IDENTICAL to the HEAD
baseline." Untestable as written — "HEAD" drifted (the spec means 4.2.0; the live tip is `4c761b64`, post-3.6/3.7).

**The corrected invariant** — split the diff into its two byte-classes, each independently re-derived against the live tip:

- **(i) R1/R2 CARVE = dist byte-IDENTICAL (pure relocation).** Moving the grain `.glass-*::after` cohort and the
  `.dock-persistent` region into NEW partials opened in the SAME `@layer components`, `@import`-ed at the SAME cascade slot
  (`glass/grain-overlay.css` immediately after `ladder.css`; `dock/shell-regions.css` after `shell.css` before `morph.css`),
  changes ZERO compiled bytes. This holds against ANY base (it is a relocation, not a value change) — the BB.W-CARVE byte-identity
  discipline; spike-confirmed.
- **(ii) R2 token DELETION = dist byte-NEUTRAL because the token is ALREADY tree-shaken at the live HEAD.** `grep -c
  glass-blur-dock dist/glass-ui.css` = **0** at `4c761b64` (3.6 made the chain unread; the bundler already dropped the
  unreferenced custom-property declarations). Deleting the SRC declarations therefore removes nothing FROM dist — the dist delta
  for R2 is **exactly empty**. (Custom-property declarations are NOT generally tree-shaken; this one IS, *because 3.6 already
  severed every internal read* — which is precisely why the invariant is only meaningful against the post-3.6 tip, not 4.2.0.)

**The corrected verifying check** (the wave captures its OWN baseline — no fixed external SHA):

> G4 builds `dist/glass-ui.css` at its precond commit (the tip it lands on), stashes the bytes, applies the 9-site diff,
> rebuilds, and asserts `git diff --no-index <pre> <post>` is **EMPTY** AND `grep -c glass-blur-dock dist/glass-ui.css` stays
> **0** across the diff. The invariant is "dist byte-identical to ITS OWN precond build," not "to a 4.2.0 SHA."

---

## 3. The ordering fix — accept the inversion, encode the precond where `ready()` reads it

**The contradiction:** the band-DAG (`bg-build-map.md:962`) orders `WS1→WS3→WS2→…→WS7→WS8→WS9` — so WS3 (3.5 GLASS-TINT-UNIFY)
and WS9 (14.1 PAPER-GRAIN-REAL) schedule BEFORE WS7 (12.0 CLOSEFIX-9SITE). But CLOSEFIX must carve the leaves those waves edit
FIRST. The "LANDS FIRST before WS1" prose is now counterfactual (WS1 done) AND was never machine-encoded — no wave carries G4 in
its `preconds`. The execute engine's `ready(w)` (`bg-bh-execute.wf.js:98-100`) gates purely on
`w.preconds.every(p => map[p].status === 'DONE')`, and the DAG LOADER reads `preconds` from each wave's `*Precond:*` build-map
field. **Prose "lands first" is invisible to `ready()`.**

**Corrected approach — three coordinated encodings:**

### 3a. Retract "LANDS FIRST"; re-state as "lands NEXT, before every still-PENDING ladder/shell editor"
Amend `bg-build-map.md:442/443` + `:218/979` + `EXECUTION-PROGRESS.md:32/218`: replace "LANDS FIRST, before WS1" with
**"lands NEXT — before the still-PENDING ladder/shell editors (GLASS-TINT-UNIFY · SUFFUSE-UNIVERSAL · PAPER-GRAIN-REAL); the
already-landed WS1/WS3-3.6/3.7 inversion is ACCEPTED and the byte-baseline is re-derived against the live tip (§2)."**

### 3b. Add the binding precond edge to EVERY still-PENDING ladder/shell-touching wave (the roster, complete)
The complete set of un-landed waves whose write-set includes `ladder.css` or `dock/shell.css` (verified by grep this pass):

| Wave (cursor row) | Touches | Current `*Precond:*` | Corrected `*Precond:*` |
|---|---|---|---|
| **3.5 BG.W-GLASS-TINT-UNIFY** | `ladder.css` (`:181`) | "WS1-GATED (M5 strictly AFTER WS1)" | "WS1-GATED … **+ BG.W-CLOSEFIX-9SITE** (builds on the carved `ladder.css`)" |
| **WS8.1 BG.W-GLASS-SUFFUSE-UNIVERSAL** | `dock/shell.css` (`:616`) | (WS1 shell-aurora gated) | "… **+ BG.W-CLOSEFIX-9SITE** (builds on the carved `shell.css`)" |
| **14.1 BG.W-PAPER-GRAIN-REAL** | `ladder.css`+`dock/shell.css` (`:699`) | "GU-1 token" | "GU-1 token **+ BG.W-CLOSEFIX-9SITE** (the grain `::after` carve target — §4)" |

These edits land in the build-map `*Precond:*` fields (the LOADER's source) so the DAG node's `preconds` array carries
`BG.W-CLOSEFIX-9SITE`. `ready()` then blocks each editor until G4 reaches `DONE` — **regardless of seq ordinal**. G4 is `[H]`
(headless, not paint-gated), so it reaches `DONE` (not `PAINT-PENDING`) and is a clean releasing precond (no PAINT-PENDING-stall
interaction — that class is PT-6's, and it does not bite here BECAUSE G4 is `[H]`).

### 3c. Re-seq CLOSEFIX-9SITE low so it is not starved among ready waves (belt to 3b's suspenders)
`composeBatch` (`:105`) sorts `readyNow` by `seq`. G4's only precond is STAGE-0 (DONE) → it is ready NOW, but its row sits in the
WS7/Phase-12 block with a high ordinal, so it would schedule AFTER other ready waves. Re-assign G4's seq to a LOW ordinal
**(seq ≈ 0.6 — immediately after STAGE-0 seq=0, ahead of any WS1+ wave)** in the LOADER's seq derivation (the build-map
`EXECUTION-ORDER NOTE:218` already asserts "lands FIRST in the build order"; make it a low seq, not just prose). With 3b's
precond edges as the binding correctness guarantee and 3c as the scheduling hint, the inversion is impossible: every leaf-editor
waits for the carve, and the carve runs in the next batch.

---

## 4. The C11 compounding fix — PAPER-GRAIN-REAL's grain re-point target is STALE post-carve

**The defect (verified on disk):** the grain `.glass-*::after` cohort (reads `--glass-grain-opacity` + the paper texture)
currently lives in `ladder.css:463-501+`. G4 carves it OUT into `glass/grain-overlay.css` (spike `ladder.css` has **0**
`glass-grain-opacity` occurrences; the cohort is wholly in `grain-overlay.css`). PAPER-GRAIN-REAL (`:699`) re-points the grain
tooth in **`ladder.css`** — a target that, after G4, **no longer holds the grain rules** (no-op, or grain re-introduced into the
just-carved monolith → re-reds R1).

**Corrected — re-point the WS9 Files list to the carved leaf (conditional on the 3b precond):**
- `bg-build-map.md:699` Files: `re-point cards.css`/**`glass/grain-overlay.css`** (was `ladder.css`)/`dock/shell.css`.
- The **`dock/shell.css` target STAYS VALID** — verified: the shell grain `::after` (`shell.css:267-270`,
  `--paper-clean-texture` + `--glass-grain-opacity`) is NOT carved out (only the `.dock-persistent` region tail moved to
  `shell-regions.css`); the spike's `shell.css` retains the grain `::after` at the same lines. No re-point needed for shell.
- `cards.css` is untouched by G4 — STAYS.
- Add a one-line note in WS9: "the grain `::after` cohort lives in `glass/grain-overlay.css` post-G4 (BG.W-CLOSEFIX-9SITE
  precond); re-point THERE, not in the carved-empty `ladder.css`."

---

## 5. The post-WS9 re-carve owner — bind `proof:no-god-module` per-wave (no new wave minted)

**The defect (C11):** G4 carves `ladder 527→470` / `shell 510→459`, but 3.5 GLASS-TINT-UNIFY (`ladder.css`), WS8.1
SUFFUSE-UNIVERSAL (`shell.css`), and 14.1 PAPER-GRAIN-REAL (`ladder.css`→`grain-overlay.css` + `shell.css`) all ADD CSS AFTER.
The R1/R2 close-reds can silently re-open between the carve and BG.W-CUT, and the current re-carve owner is a VERBAL commitment
("BG.W-DEMO-STYLE-REHOME tracks the line budget").

**Corrected — the standing gate IS the owner (no heavyweight new re-carve wave):**
`proof:no-god-module` (`scripts/proof-no-god-module.mjs`, `HARD_LIMIT=500`) is **`.css`-aware** (`:206` joins `.css` to the
recursive filter; `:38` the bound) and **`ci`-tagged** (`gates.mjs:635`), so it is in the narrowed per-wave green-signal set
(it is NOT one of the born-RED-by-design trio ba-gestalt/ship-attestation/close-sweep — C5/PT-6). Therefore a re-grow past 500 at
3.5 / WS8.1 / 14.1 **reds AT that wave's own close**, and the wave that pushed a leaf over owns the in-wave re-carve (the
"re-grow caught at the landing wave" model the WS3 header already gestures at). Concretely:
- Add `proof:no-god-module` to the `*Gate:*` line of 3.5, WS8.1, 14.1 (it already runs in the per-wave `--run local`/`--run ci`
  cadence; naming it makes the re-grow-owner contract explicit).
- The re-carve TARGET convention (if a leaf re-grows): carve the NEWLY-ADDED tail into the SAME-named-cohort partial
  (grain → `grain-overlay.css`; a tint tail → a new `tint-*.css` adjacent partial), opened in the same `@layer`, registered in
  `read-css-monoliths.mjs glass.order` / `read-dock-css.mjs DOCK_PARTIAL_ORDER` — the exact discipline G4 itself uses.
- (BH note) B2.6 styles-colocation must ENUMERATE the 2 new G4 partials (`glass/grain-overlay.css`, `dock/shell-regions.css`)
  with registered `@import`-order, marked KEEP-global (they are cascade-load-bearing, not SFC-scoped).

---

## 6. The bbnf-buddy EXTERNAL `--glass-blur-dock` break — a coordination row, NOT an internal reader (C10/PT-2)

**Verified (read-only sibling sweep, arrays + `--exclude-dir` per the method note):** the ONLY external consumer of the retiring
token is `~/Programming/bbnf-buddy/src/styles/preset.css:230` — `--glass-blur-dock: var(--glass-blur-cartoon)` (where
`--glass-blur-cartoon: blur(22px) saturate(1.6)`, `:223`). This is a deliberate live dock-cartoon-theme override. G4's chain
retirement + the 3.6 dock re-point onto `--dock-surface-blur: var(--glass-blur-resting)` (8px) make the bbnf override a **silent
asymmetric partial no-op**: bbnf's sibling dock-token overrides (`--glass-bg-dock`, `:229`) still resolve, but its dock BLUR
silently reverts 22px → 8px. G4's "0 orphan readers" census was glass-ui-INTERNAL-only and missed it.

**Corrected — record a by-name coordination ask (the foreign-tree fence: glass-ui RECORDS, never edits bbnf):**
- Re-scope G4's R2 claim from "0 orphan readers" to "**0 glass-ui-internal readers; 1 EXTERNAL override (bbnf-buddy
  `preset.css:230`) owed a B7-style migration**."
- Add a row to `docs/tranches/BB/coordination/asks-and-consumes.md` (the inv-26 by-name relay): "bbnf-buddy — re-point the
  `--glass-blur-dock` dock-cartoon override onto the new dock-blur seam (`--dock-surface-blur` re-declare, or re-declare the
  composed dock surface) on its next `@mkbabb/glass-ui` bump; the `--glass-blur-dock` chain is RETIRED at BG.W-CLOSEFIX-9SITE."
- This is the inv-11-for-TOKENS gap the seed §3.7 names — the constellation roster was a one-time scout; a standing
  retired-token × sibling-grep at the cut is the durable cure (route to the disposition/prune-census token arm, not G4 itself).
- **Speedtest `.glass-refract` (`CompleteBadge.vue:16`) is G1's, NOT G4's** — it is finalized by BG.W-GLASS-SOTA-LADDER deleting
  `glass-refract.css`; note + route to G1's roster, do not fold here.

---

## 7. The verifying checks (concrete, the "does the fix hold" bar)

1. **The carve+retirement holds against the live frontier** — already PROVEN by spike `c0f6e1ee` (527→470, 510→459, chain
   retired, 20 files, all 15 device-free gates flip in the diff). Re-run as the wave: `proof:no-god-module` flips **GREEN**
   (ladder ≤500, shell ≤500, NO stale `RATCHET_BASELINES` rows for either — they were never baseline rows, so nothing to drain);
   `proof:glass-cal` B1/B3 + `proof:glass-depth` D3 + `proof:dock-shrink-blur` S3 + `proof:theme-style` GREEN; the
   `InstrumentChassis.spine-variant` unit + `glass-cal.spec` EXPECT_RADII flipped.
2. **dist byte-neutrality** — `git diff --no-index <pre-G4 dist> <post-G4 dist>` EMPTY; `grep -c glass-blur-dock dist/glass-ui.css`
   stays **0**; `grep -rn glass-blur-dock src/styles/` returns ONLY retirement-record comments (0 active declarations).
3. **The dock re-point is NOT double-applied** — `git show <G4>:src/styles/dock/shell.css | grep -n dock-surface-blur` is
   byte-identical to HEAD (G4 did not touch `:29`).
4. **The ordering is machine-enforced** — the DAG nodes for 3.5 / WS8.1 / 14.1 carry `BG.W-CLOSEFIX-9SITE` in `preconds`;
   `ready()` returns false for each until G4 is `DONE`; G4's seq is low (≈0.6) so it schedules in the next batch. A dry-run of
   the LOADER over the amended maps shows G4 ahead of all three leaf-editors.
5. **The re-grow guard has teeth** — `proof:no-god-module` is named in the `*Gate:*` of 3.5/WS8.1/14.1; a synthetic +60-line
   append to `ladder.css` reds it (the standing bite already in the gate, `proof-no-god-module.mjs:26`).
6. **PAPER-GRAIN-REAL re-points the carved leaf** — its Files list reads `glass/grain-overlay.css` (not `ladder.css`); a build
   shows the warm-tooth re-point lands in `grain-overlay.css` and `ladder.css` stays ≤500 (no grain re-introduction).
7. **the external break is registered** — `asks-and-consumes.md` carries the bbnf-buddy `--glass-blur-dock` migration row; glass-ui
   edits ZERO bytes under `~/Programming/bbnf-buddy` (foreign-tree fence; `verify-siblings-intact.mjs` exit 0 before+after).
8. **`--run full` siblings-absent /tmp** PASS (typecheck/test/build/budget) on the post-G4 tree (the spike's own close target).

---

## 8. Feasibility verdict

**FEASIBLE — the fix holds.** The 9-site carve+retirement is not a hypothesis; spike `c0f6e1ee` implemented it against the EXACT
527/510 live frontier (20 files, byte-isomorphic carve, chain retired to comments, all affected gates flip). The PT-2 corrections
are entirely plan-doc + one gate-binding:
- (A) re-word R2 so site (b) is the chain DELETION and the 3.6 dock re-point is a landed precondition-fact (not re-applied);
- (B) re-anchor the byte-identical invariant to the wave's OWN precond build, split into the byte-identical CARVE + the
  byte-NEUTRAL token-deletion (the token is already tree-shaken from dist at HEAD — verified 0 occurrences);
- (C) encode `BG.W-CLOSEFIX-9SITE` in the `preconds` of the 3 still-PENDING ladder/shell editors (3.5/WS8.1/14.1) — where
  `ready()` actually reads — + a low seq so it is not starved;
- (D) re-point PAPER-GRAIN-REAL's grain target `ladder.css`→`glass/grain-overlay.css` (shell stays valid);
- (E) bind `proof:no-god-module` as the standing per-wave re-carve owner on the 3 editors (no new wave minted);
- (F) record the bbnf-buddy external `--glass-blur-dock` override as a by-name coordination ask (foreign-tree fence honored).

No design unknown, no feasibility risk, no restart. The single residual that is NOT a doc-edit — the bbnf external break — is a
cross-repo coordination row (correctly OUT of glass-ui's tree), and the durable cure (retired-token × sibling-grep at the cut) is
the inv-11-for-TOKENS gap the seed already names, routed to the disposition/prune-census token arm.
