# STAB2 — stability critique, pass 2, COHERENCE lens (fresh Fable seat, wrote none of it)

Scope: the STAB1 fix round (commit `43895cfe`, "all 4 MAJORs + 4 MINORs cured across PLAN/ASK/MATERIAL/PERF")
held against disk. STAB1 ran TWO passes — `STAB1-COHERENCE.md` (2 MAJOR + 2 MINOR) and `STAB1-COMPLETENESS.md`
(2 MAJOR + 2 MINOR) — and the fix round addressed both. My job: (1) verify the four COHERENCE-pass fixes
landed and stayed coherent; (2) critique the NEW material the fix added (MATERIAL W7, the BAND-PERF W2
addendum, the PLAN liquid-weight law, the MATERIAL-count bump); (3) spot re-scan 6 fresh ASK rows + 5 fresh
PLAN citations. Lens = COHERENCE only. I assumed residual faults and hunted them. TRANCHE-DEVELOPMENT: this
is the only file written; no source, no commits.

Method: read the fix diff in full; re-read PLAN.md + ASK.md end-to-end; read the W7 section (BAND-MATERIAL),
the W2 addendum + W4 body (BAND-PERF), the liquid-weight + A08 laws (PLAN §3), BAND-REDUCTION HandMark floor,
BAND-GATES orphan gate, BAND-COLOCATION Move C, both STAB1 files, GF-HANDMARK-PASS3 §4/§7.2/§8/§14,
REGISTRY Round-3b + §16-18, ASSEMBLY-CROSSWALK counts; verified the publish tag/sha on git, glass-chip in
dist, DataTable/easing/fourier/constellation/reveal on disk, and re-grepped the demo tree at its real root.

---

## Verdicts

- **PLAN.md — AMEND(2)** — 1 MAJOR (HandMark Q-HM-2 conditional) + 1 MINOR (§6 arithmetic).
- **ASK.md — CLEAN** — the ASK-7 ghost cite is dropped; 6 fresh rows all ground to disk/sources. (One
  pre-existing §4 looseness recorded as NOTE-4, not counted against the fix.)
- **New material — MATERIAL W7 (`BJ.W-CSS-CLOSURE-RESTORE`) — AMEND(1)** — internally sound, gate real,
  Move C cited correctly; 1 MINOR (stale family attribution un-swept).
- **New material — BAND-PERF W2 addendum — AMEND(1)** — R3b numbers consistent; 1 MAJOR (route-swap CLS
  gate overlaps W4's transition-CLS territory).
- **New material — the liquid-weight law — CLEAN** — rides the A08/J11 challenge-pass law coherently.
- **New material — MATERIAL (7) count — AMEND(1)** — PLAN roster/DAG/§5 all say 7; but the band file's
  own intro still says "Six waves." 1 MAJOR (intra-band count contradiction).

Finding counts: **BLOCKER 0 · MAJOR 3 · MINOR 2 · NOTE 4.**

---

## Fix verification (the four STAB1-COHERENCE cures)

- **1a — PLAN §6 count (COHERENCE MAJOR-1): CURED, one residual.** `grep` for "only ones reserved" /
  "10 ASK rows are the only" = 0 hits; §6 now reads "the rows reserved for the user … assemble into the
  **26-row** `ASK.md`." The killer claim is gone and 26 is explicit. RESIDUAL (MINOR-1 below): the
  source-breakdown "10 from the feedback-ledger crosswalk plus the greenfield and material/story sets"
  does not reconcile to 26.
- **1b — PLAN §0 provenance (COHERENCE MINOR-2): CURED.** §0 now cites `REGISTRY.md:16-18` for the
  dating authorization only (disk-true — those lines say "The dating is authorized," nothing about
  provenance), and cites the publish fact separately. Corroboration on disk: `git rev-list -n1 v7.0.0`
  = `4ab121286…` = the cited `4ab12128`; the q060 outbound
  (`BI/coordination/glass-outbound-2026-07-17-q060-glass7-live.md:13-15`) confirms "published to npm …
  **npm provenance**, `dist-tags.latest = 7.0.0` … HEAD `4ab12128`, tag `v7.0.0`." Only the CI run-ID
  `29617310925` is uncorroborated on disk (it lives in Actions, not the repo — NOTE-1).
- **1c — HandMark surface (COHERENCE MAJOR-2): mechanically applied, semantically PARTIAL (MAJOR-1).**
  Both sites now read `19→~8` (PLAN §1 :85-88 + the GF-HANDMARK roster :233-237), and
  `BAND-REDUCTION.md:156-159` does say `19 → ~8` with the keep-list `brush, shape, color, seed,
  animation, appear, box, drawMs` and "it MUST land at this surface." The count contradiction is gone.
  BUT the new "further cut CONDITIONAL on ASK Q-HM-2" claim is itself incoherent — see MAJOR-1.
- **1d — ASK-7 ghost cite (COHERENCE MINOR-1): CURED.** `grep 'Wave 5 stub'` in ASK.md = 0; ASK-7's
  evidence is now `SUPERFLUITY.md §4 (F16); BAND-REDUCTION.md W5` (both valid). Clean.

---

## Findings

### MAJOR-1 — the HandMark "further cut CONDITIONAL on ASK Q-HM-2" mis-scopes the conditional; the appear/drawMs keep-vs-delete contradiction persists. (partial cure of COHERENCE MAJOR-2)
- **Claim (PLAN.md:85-88 + :233-237):** land at `~8` keeping `appear/box/drawMs`, "with the greenfield's
  **further cut CONDITIONAL on ASK Q-HM-2**."
- **Disk truth:** Q-HM-2 is **ASK-19**, whose scope is *box/bracket shapes only* ("Retire box/bracket
  entirely, or keep as ≥2ch-only shapes?", evidence `GF-HANDMARK-PASS3.md §7.2/§14`). It rules on the
  `box` shape — **not** the `appear` or `drawMs` props. And `GF-HANDMARK-PASS3.md §8` (:223-235) deletes
  `appear` and `drawMs` **unconditionally**: `drawMs` is in the census-dead 11, `appear` "folds to a
  sensible default … retired on merit" — both in the delete-13, neither gated on any ASK. So under the
  fix's own logic (keep appear/drawMs unless Q-HM-2 says cut), appear/drawMs stay — while the greenfield
  deletes them regardless. `BAND-REDUCTION` ("MUST land" keeping appear/drawMs at ~8) and the greenfield
  (delete them at ~5) STILL disagree; the fix relabeled the contradiction with a conditional that does
  not cover the disputed props.
- **Why it's a coherence fault:** the same executor-divergence pass-1 named survives — a BAND-REDUCTION
  reader keeps appear/drawMs (no ASK authorizes cutting them); a greenfield reader deletes them. The
  count is reconciled; the per-prop fate is not.
- **Required fix:** state the appear/drawMs deletion as an *unconditional greenfield merit/census cut*
  (independent of any ASK), and scope the Q-HM-2 conditional to the `box`/`bracket` shapes it actually
  governs; reconcile BAND-REDUCTION's ~8 keep-list to the greenfield's ~5 (drop appear/box/drawMs) so
  the two binding docs agree.

### MAJOR-2 — BAND-MATERIAL still says "Six waves"; the W7 mint left the band's own count stale. (intra-band count contradiction introduced by the fix)
- **Claim (fix):** MATERIAL is now 7 waves — PLAN §1 DAG (:42 "MATERIAL (7)"), §2 roster (:183 "7 waves"),
  §5 (:308 "MATERIAL W7") all updated; `grep 'MATERIAL (6)'` in PLAN = 0.
- **Disk truth:** `BAND-MATERIAL.md:31` still reads **"Six waves:"**, and its intro table (:33-42) lists
  only W1-W6. The W7 section is appended at :700 with a lone one-row table at :723 — *outside* the intro
  table. The band header contradicts its own body (7 waves) and PLAN (7).
- **Why it's a coherence fault:** an executor scanning BAND-MATERIAL's intro builds 6 waves and can miss
  W7 (the very defect W7 exists to cure). PLAN says 7, the band says 6.
- **Required fix:** update `BAND-MATERIAL.md:31` to "Seven waves:" and add the W7 row to the intro table
  (:33-42).

### MAJOR-3 — the BAND-PERF W2 addendum's route-swap CLS gate overlaps W4's transition-CLS territory; the same metric is double-gated. (new-material territory collision)
- **Claim (BAND-PERF.md:510-516, W2 addendum):** W2 gains gate "the ForcedReflow insight absent from a
  fresh mount trace + **the route-swap CLS ≤ 0.01**," citing "CLS 0.04 at the route swap."
- **Disk truth:** `REGISTRY.md:329-330` attributes the CLS to the *transition*: "Route transition into
  blob: 119ms freeze … but **the swap injects CLS 0.04 — the transition should reserve space**." That is
  W4's territory — and W4 already carries it: `BAND-PERF.md:507-508` "R3b baselines seed the gates: 119ms
  warm transition freeze … **+ CLS 0.04 at the swap (reserve space)**." So the identical route-swap CLS
  0.04 is now gated by BOTH W2 (≤0.01) and W4 (reserve-space), with no split rule.
- **Why it's a coherence fault:** double-ownership of one cure. Whichever wave reserves the swap space
  first makes the other's CLS gate auto-GREEN — a `gate:vacuous-no-assertion` the completion model
  (PLAN §3) forbids. The blob *ForcedReflow* (idle/mount churn) is legitimately W2's per REGISTRY
  ("Family E's headline gate becomes a rAF-budget/idle-frame gate **+ the blob forced-reflow fix**"); the
  route-swap CLS is W4's.
- **Required fix:** the clean split — W2 owns the ForcedReflow gate only; delete "route-swap CLS ≤ 0.01"
  from the W2 addendum and leave the swap-CLS reserve-space cure to W4 (or state an explicit delineation
  if a blob-mount CLS is genuinely distinct from the transition CLS, which REGISTRY does not support).

### MINOR-1 — PLAN §6's "10 + greenfield + material/story" does not reconcile to the stated 26. (residual arithmetic gap after the MAJOR-1 cure)
- **Claim (PLAN.md:325-327):** the 26 rows = "10 from the feedback-ledger crosswalk plus the greenfield
  and material/story sets."
- **Disk truth:** ASK.md is §1 family-C = **13** rows (ASK-1..13), §2 greenfield/misc = **11** (ASK-14..24),
  §3 material/story = **2** (ASK-25/26). The "10" is the crosswalk *disposition* count
  (`ASSEMBLY-CROSSWALK.md:231` "10 ASK") and maps to only 7 ASK.md rows; the B1-B5 component census
  (ASK-8..12) and the F16 timeline (ASK-7) are NOT from the feedback-ledger crosswalk and go unmentioned.
  Summing the named buckets gives 23, not 26.
- **Why it's a coherence fault (minor):** the killer "only 10" claim is cured and 26 is explicit, but a
  reader doing the arithmetic finds a 3-row gap and an incomplete source enumeration.
- **Required fix:** enumerate by section — "13 family-C reduction + 11 greenfield/misc + 2 material/story
  = 26" — or note that the 10 crosswalk dispositions expand, with the B1-B5 census + the F16 timeline,
  into the 13-row family-C block.

### MINOR-2 — the W7 mint left three conflicting family attributions for the chip fix un-swept. (stale cross-references after "one terminal owner")
- **Claim (fix / STAB1-COMPLETENESS MAJOR-1):** the orphan-partial fix gets "ONE terminal owner" —
  `BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7, family F); PLAN §5 (:308) now names it.
- **Disk truth:** the other docs still name different families and none cross-refs W7:
  `BAND-GATES.md:410` "the CSS re-home of glass-chip/glass-atom (**Family C/H**)";
  `BAND-REDUCTION.md:71-72` "a **family-G** born-RED fix wave … Out." `grep 'CSS-CLOSURE|MATERIAL W7|W7'`
  across BAND-GATES/REDUCTION/COLOCATION = 0. Three attributions (C/H, family-G, family-F) for one fix.
- **Why it's a coherence fault (minor):** the concrete owning WAVE is now singular (an executor hunting a
  wave finds only W7), but the coordination-family labels contradict it and undercut the "one owner" cure.
- **Required fix:** repoint `BAND-GATES.md:410` and `BAND-REDUCTION.md:71-72` to `MATERIAL W7`
  (family F), or add a one-line "owner = MATERIAL W7" pointer in each.

---

## What checked out (so the amends are not mistaken for a failed fix round)

- **W7 is internally sound.** The `orphan-CSS-partial` gate it flips DOES exist born-RED in BAND-GATES
  (:29 table, :241-249 gate B, :278 test file, :288 RED-at-HEAD); the disk premise holds
  (`grep -c glass-chip dist/glass-ui.css` = **0**, verified). Gates (a)-(d) are coherent and honestly
  stated (dist rule-count > 0, live re-verify per R3a, byte-delta with the light-dark/inset-shadow trap
  watched). It cites COLOCATION Move C correctly — `BAND-COLOCATION.md:110/432` states exactly "cascade
  position ≠ file location," which is the principle W7 invokes. No contradiction with MATERIAL W1-W6.
- **The liquid-weight law is coherent with the A08/J11 law it rides.** PLAN §3 (:265-269) hooks the
  edict to the challenge pass ("a wave shipping motion that reads weightless **fails its challenge pass**
  on this law alone"), which the A08/J11 law (:279-283) establishes as every wave's close. Its named
  owners all exist (`PAGER-DOT-MORPH`=FM W6, `ROUTE-PENDING`=PERF W4, FEEDBACK-MOTION band, dock
  goo-morph). Matches the standing "Liquid-weight universal" edict. CLEAN.
- **The R3b numbers in the W2 addendum are consistent with REGISTRY.** `52,225 RunTasks / 3,115ms` ≈
  REGISTRY's "~52k / ~3.11s"; LCP `391/405/488ms` + render-delay `~99%` are verbatim (`REGISTRY.md:322-323`);
  TBT `208-283ms` spans REGISTRY's "~208-210ms light / 283ms blob." (The precise figures + the
  ForcedReflow "~142ms window" trace to `R3B-DIGEST.md`, not REGISTRY's approximations — NOTE-3.)
- **6 fresh ASK rows ground to disk/sources.** ASK-8 DataTable = 457 LOC on disk (cited 458, off-by-one,
  immaterial); ASK-4's six cut symbols all exist (`useScrollPin/useScrollScene/useStagger/
  useStaggerReveal/useBloomUp/useLiquidReveal`); ASK-9 FourierField exists with the cited
  color/colorResolver/freeze seams; ASK-10 Constellation exists with the physics; ASK-11 EasingPicker +
  EasingConfigurator both present; ASK-2 completion-seal is cross-repo (not disk-checkable) but internally
  consistent.
- **5 fresh PLAN citations hold.** glass-chip dist=0 (confirmed); text-sm/text-xs is heavy in the real
  demo tree (`demo/` at repo root, 396 raw occurrences — the "218 demo / 251 codemod" are curated "site"
  counts, plausible, not refuted); eyebrow 65/128 not refutable by literal grep (the idiom is a class
  pattern, not the word); Typewriter `20→~9` is consistent with BAND-REDUCTION's "11 dead"; DataTable
  ~458. NOTE: my first `src/demo` grep returned 0 — a wrong-path artifact; the demo lives at repo-root
  `demo/`, verified before flagging (per the stale-worktree caution). No citation fault.

---

## Notes (corpus-hygiene; not counted against a capstone/item)

- **NOTE-1 — the CI run-ID `29617310925` is uncorroborated on disk** (only in PLAN.md:23). Expected — run
  IDs live in Actions, not the repo — and the tag/sha/provenance-green it accompanies are all corroborated.
- **NOTE-2 — the "STAB1 MAJOR-1/MAJOR-2/MINOR-1" labels in W7 + the BAND-PERF addendum reference the
  COMPLETENESS pass, unqualified.** W7's header says "(STAB1 MAJOR-1 cure)" while its body says "Minted at
  STAB1-**COMPLETENESS**"; STAB1-COHERENCE *also* has a MAJOR-1 (the ASK count) and MAJOR-2 (HandMark) —
  different findings. Add "-COMPLETENESS" to the labels to disambiguate.
- **NOTE-3 — the W2 addendum's precise R3b figures (52,225 / 3,115ms / ~142ms) are digest numbers, not
  REGISTRY-verbatim** (REGISTRY carries approximations). Consistent, but the commit's "match the REGISTRY
  fold verbatim" framing overstates; cite `R3B-DIGEST.md` for the precise figures.
- **NOTE-4 (pre-existing) — ASK.md §4 closing (:255-256) says "the four greenfield identity calls,"** but
  §2 carries 11 rows (ASK-14..24, incl. dot-flow ASK-23 + pixel-floor ASK-24). Not introduced by the fix;
  recorded for completeness.

---

## Register (evidence anchors, one line each)

| # | sev | site | disk truth |
|---|-----|------|-----------|
| MAJOR-1 | MAJOR | PLAN.md:85-88,233-237 vs GF-HANDMARK-PASS3 §8 | Q-HM-2 = box/bracket only; appear/drawMs deleted unconditionally — contradiction persists |
| MAJOR-2 | MAJOR | BAND-MATERIAL.md:31 vs PLAN :42/:183/:308 | band says "Six waves"; PLAN says 7; W7 appended outside the intro table |
| MAJOR-3 | MAJOR | BAND-PERF.md:513-516 vs :507-508 + REGISTRY:329-330 | route-swap CLS 0.04 double-gated across W2 + W4; REGISTRY assigns it to the transition |
| MINOR-1 | MINOR | PLAN.md:325-327 | "10 + greenfield + material/story" sums to 23, not the stated 26 |
| MINOR-2 | MINOR | BAND-GATES.md:410 + BAND-REDUCTION.md:71-72 | chip fix still "Family C/H" / "family-G"; W7 is family F, un-swept |
| NOTE-1 | NOTE | PLAN.md:23 | run-ID only in PLAN (CI-only; tag/sha/provenance corroborated) |
| NOTE-2 | NOTE | BAND-MATERIAL.md:700 + BAND-PERF.md:510 | "STAB1 MAJOR-1/2" labels are COMPLETENESS's, unqualified |
| NOTE-3 | NOTE | BAND-PERF.md:511-513 | precise R3b figures trace to R3B-DIGEST, not REGISTRY verbatim |
| NOTE-4 | NOTE | ASK.md:255-256 | "four greenfield identity calls" vs §2's 11 rows (pre-existing) |

Single worst finding: **MAJOR-1** — the fix reconciled the HandMark *count* (both sites now ~8) but the
"further cut CONDITIONAL on ASK Q-HM-2" bridge is mis-scoped: Q-HM-2 governs only box/bracket shapes, so
the appear/drawMs keep-vs-delete contradiction between BAND-REDUCTION's "MUST land" ~8 floor and the
greenfield's unconditional ~5 delete survives — STAB1-COHERENCE MAJOR-2 is relabeled, not resolved.
