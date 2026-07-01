# D8 — The 5.0.0 CUT STORY from first principles

**Lens:** is the joint BG+BH 5.0.0 cut coherent as a RELEASE a consumer experiences — ONE migration
doc, ONE changelog narrative, the export reshape + CLAUDE.md delete + feature waves landing as ONE
story? · **Date:** 2026-07-01 · **HEAD:** `976dc890` (`tranche/BG`) · **Base:** v4.2.0.

---

## Verdict

The cut *choreography* is architecturally sound and, in `publish-and-cut.md`, unusually well-reasoned:
the inv-11 linear-lineage spine (`4.2.0→4.3.0→4.4.0→5.0.0`, each tag an ancestor of the next), the
divergence-reconcile of the parked `release/4.3.0` (VERIFIED real on disk: `28cf1cd1`, NOT an ancestor
of `tranche/BG` — `git merge-base --is-ancestor` returns false), the `--run full` siblings-absent
pre-tag battery, the 5-step per-consumer consume-and-delete cadence — all correct, all grounded in a
binding constraint. The release MACHINE (`release.sh` + `release.yml`) is coherent and the union-not-
subset gate discipline is exactly right (it is what caught the BA 18-red close lie).

But the cut is NOT coherent as a *document a consumer opens*. Three of its four consumer-facing
artifacts are unbuilt or wrong at HEAD, and the cut story is spread across four homes that have already
drifted apart into **two number-contradictions the release gates will trip on**:

1. **The value.js peer target contradicts itself** — the protocol doc names `^1.2.0`, the amended plan
   and the gate literal name `^1.1.1`, and `^1.2.0` is explicitly documented to RED `proof:peer-conformance`.
2. **The by-name ask count contradicts itself** — the protocol doc says "3 asks (bbnf owes none)", the
   BH roster + the `proof:crossrepo-asks:bh` `>=4` covered-floor say **4** (bbnf owes the `--glass-blur-dock`
   retire). A cut executor reading `publish-and-cut §4` under-issues one ask and reds the gate.
3. **MIGRATION.md is still titled `v0.9.x → v1.0 → v2.0`** with ZERO 5.0.0 content, and the sole
   authoring wave (B4e) is specced as "slim + reshape," not "author the entire 5.0.0 surface from scratch."
4. **The 5.0.0 CHANGELOG entry has no wave owner** — it lives only in protocol prose, orphaned between
   the package.json-writer wave and the tag-fire wave.

None of these is a mechanism defect — they are the classic BB-disease in the cut layer: locally-correct
docs that never got reconciled into ONE story. The fix is a single-source-of-truth pass over the cut
choreography plus promoting B4e from a slimming wave to the cut-authoring wave. The release machine
needs no gate pruning; the "does the cut need 360 gates?" question resolves to *keep the union* (below).

---

## Findings (ranked)

### F1 (MAJOR) — the value.js peer target contradicts itself across cut docs; `^1.2.0` reds the release gate

`publish-and-cut.md:54` (§2.1) instructs the cut to bump value.js
`^0.13.0 || ^1.0.0 → ^1.2.0` ("keyframes 5.1.0 transitively deps value `^1.2.0`").

This is doubly wrong on disk:

- **The straddle is already gone.** `package.json` at HEAD has `"@mkbabb/value.js": "^1.0.0"` (single
  range, no `^0.13.0 ||`). So §2.1's *from* clause describes a state that no longer exists.
- **The target is the wrong number and the gate rejects it.** The authoritative amended plan —
  `BH PLAN.md:68` (B2.1-swap) and cursor rows `18.1` + `12.5` — targets **`^1.1.1`, NOT `^1.2.0`**, with
  an explicit rationale spelled out three times: *"`^1.2.0` excludes npm-latest 1.1.1 + reds
  `proof:peer-conformance`"* and *"the gate-file value-PIN … `1.2.0→1.1.1`"*. A cut operator who follows
  `publish-and-cut §2.1` verbatim writes `^1.2.0` and reds `proof:peer-conformance` in the `--run full`
  battery — aborting the tag.

The root cause is that `publish-and-cut §2.1` re-specifies a number that has a single authoritative
owner (B2.1-swap / cursor 18.1, "the LITERAL sole package.json writer"). The protocol doc should POINT
to that owner, not restate the range — the src single-writer discipline the tranche preaches, applied
to the doc.

### F2 (MAJOR) — MIGRATION.md is v2.0-titled with zero 5.0.0 content; B4e is under-specced as "slim," not "author"

`MIGRATION.md:1` reads `# MIGRATION—v0.9.x → v1.0 → v2.0`. The 4.0.0/4.1.0/4.2.0 migrations never
advanced the title — they rode as **16 appended blockquote entries** (`grep -c` over the `> **v…`/`ADDITIVE (4…`
forms = 16). A grep for `5.0.0` / `drop.*api` / `203` / `focus-ring-color` over MIGRATION.md returns
**nothing** — the entire 5.0.0 surface (the 203-row `/api` re-home table, the `--ring → --focus-ring-color`
rename row, the flat-barrel key-preserving note) does not exist yet.

A 4.x→5.0 consumer (muster/speedtest/atlas) opens the ONE doc they are told is the migration surface and
finds a title claiming it is about v2.0, followed by a chronologically-accreted blockquote pile with no
5.0.0 heading. That is the opposite of "one migration event, one MIGRATION.md reshape" (BH §2-#4).

The sole authoring wave, **B4e-doc-slim** (`BH PLAN.md:92`, cursor `18.8`), is specced as *"Slim
CHANGELOG/DESIGN/MIGRATION; reshape MIGRATION for the 5.0.0 by-name-ask map."* "Slim" and "reshape"
undersell the actual load: B4e must (a) retitle the doc, (b) author the entire 5.0.0 section + the
203-row table + the `--ring` row from a blank slate (nothing exists to "reshape"), and (c) collapse the
16 accreted 4.x blockquotes into a linear version ladder or archive them per the slim. The wave row
carries no acceptance criterion that the `## 5.0.0` heading, the 203-row table, and a non-v2.0 title
actually land — so a "slim that appended one paragraph" would pass an unwitnessed close.

### F3 (MAJOR) — the 5.0.0 CHANGELOG entry has no wave owner; a stale `## Unreleased` section rots mid-file

`publish-and-cut.md:62` (§2.3) mandates *"Append the 5.0.0 entry: the export reshape, the `--ring`
rename, the BG visual convergence summary, the lucide payload fix, the value de-straddle."* But **no
cursor row owns it**: `18.1` writes package.json, `18.8`/B4e "slims" CHANGELOG (its text names slimming +
MIGRATION-reshape, NOT authoring the 5.0.0 entry), `19.1` (BG.W-CUT) only fires the tag. The single
consumer-facing "what changed in 5.0.0" narrative is orphaned in protocol prose with no wave, no gate,
no acceptance.

Compounding: `CHANGELOG.md:212` carries a stale `## Unreleased` section (Tranche AX.W07 content) buried
**between `## 3.3.0` and `## 3.2.0`** — a mis-ordered dead section that has survived every 4.x cut. The
267 KB CHANGELOG that B4e is meant to slim still ships this artifact; the 5.0.0 authoring wave should
reconcile it in the same pass (an "Unreleased" section is a lie the moment a version ships).

### F4 (MAJOR) — the by-name ask count contradicts itself: `publish-and-cut §4` says 3, the roster + gate say 4

`publish-and-cut.md:85` (§4): *"The break touches exactly **3 by-name asks** … muster, speedtest, atlas.
Every other live consumer (bbnf-buddy, slides-K) keeps every key — **no ask owed**."* Row `141` (the cut
ledger) repeats "3 by-name asks (muster/speedtest/atlas)."

`BH PLAN.md:106` (B7 W-api-ask-roster): *"the full 5.0.0-BH-B7 by-name migration roster is **exactly 4
by-name asks** … (4) **bbnf-buddy** `bbnf-glass-blur-dock-retune-no-op` (the `--glass-blur-dock`
token-retire, `preset.css:230` live)."* And the gate that guards it — `proof:crossrepo-asks:bh` — carries
a **`>=4` covered-floor** that *"fails LOUD on source-doc drift."*

So the authoritative count is **4** (the gate reds below it), and `publish-and-cut §4` names 3 while
explicitly asserting bbnf owes nothing. A cut operator following §4 issues 3 asks, never issues the bbnf
`--glass-blur-dock` retire, and the `>=4` covered-floor reds. This is the SAME single-source-of-truth
failure as F1 — a count restated in a second home and drifted. (The bbnf ask is a *no-op* retune for
bbnf, which may be why §4 waved it off — but the BH roster still carries it as a gate-witnessed row with
`proof:retired-token-consumers` as its born-RED witness, so it is a row, not nothing.)

### F5 (MINOR) — `release.sh` header docstring describes a 4-gate matrix the body no longer runs

`release.sh:12-19` documents the flow as *"a) typecheck b) build c) verify-export-types d)
profile:budget --enforce."* The body (`release.sh:84`) runs only `node scripts/gates.mjs --run full`.
All four named gates ARE covered by the union (`verify-export-types` is gate row `gates.mjs:72`), so the
behaviour is correct — but the header lies about the flow, and a maintainer debugging a cut reads the
stale matrix. Release-machine doc-rot; one-block fix.

### F6 (MINOR, root-cause) — the cut story has no single canonical home; the 4-way spread is what produced F1 + F4

The 5.0.0 cut is described in four places: `publish-and-cut.md` (protocol), `BH PLAN.md §2/§7` (the
break), the cursor rows `18.1`/`18.8`/`19.1`, and `bh-interleave-map.md`. `publish-and-cut.md` is the
best of them and reads as the intended canonical home — but it re-specifies numbers owned elsewhere
(the value peer, the ask count) and has drifted on both. There is no "this is THE 5.0.0 cut doc; every
other mention back-points here" designation, so the numbers live in N homes and diverge.

---

## The ideal cut choreography (first-principles design)

The mechanism is right; the design fix is *single-sourcing the story and giving every consumer-facing
artifact a wave owner with an acceptance witness*.

**1 — MIGRATION.md is the ONE consumer-migration surface, authored as a linear ladder.** Retitle to a
version-agnostic `# MIGRATION` (or `… → 5.0.0`), lead with the 5.0.0 section as a first-class `##`
heading, the 203-row `/api` re-home as a real markdown TABLE (not prose — mirror the B4b
`dependencies.md` table-form lesson so a downstream parser can consume it), the `--ring` rename row with
the pinned landing commit + fallback-first guidance, and a one-line key-preserving note for the
flat-barrel moves + `src/subpaths/` delete. The 16 accreted 4.x blockquotes fold into proper `## 4.x.0`
sections or archive per the slim — a clean break, not another append.

**2 — the CHANGELOG 5.0.0 entry is a named deliverable, not protocol prose.** One `## 5.0.0` section:
export reshape (drop `./api`, 203 re-home, 3 orphan re-homes), the `--ring` rename, the BG visual
convergence one-paragraph summary, the lucide payload fix, the value de-straddle. Delete the dead
`## Unreleased` (line 212) in the same edit.

**3 — the release machine needs NO gate pruning; keep the union.** The D8 question — *"does the cut need
360 gates or the family floor?"* — resolves against the family floor. The cut runs `--run full` =
dedup(local ∪ ci ∪ release) ≈ **350 of 360** (tag counts on disk: local 346 / ci 319 / release 119).
This union-not-subset discipline (inv-θ) is EXACTLY what caught the BA `ci ⊂ local` 18-red close lie —
the 4.0.0 post-mortem that this whole cut protocol is built around. A "family floor" (one representative
gate per family at the tag) reintroduces the drift class the discipline exists to kill: a wave whose
close gate is not in the floor ships unguarded. The gates are device-free source asserts and run in
seconds; the union is cheap and load-bearing. **The over-contrivance the user names lives UPSTREAM** —
360 gate scripts, many single-wave born-RED close gates that never retire (cross-ref the gate-system
lens). The CUT running the union over them is correct; do not touch the release gate set.

**4 — the post-cut consumer cadence is already right; just fix the count.** `publish-and-cut §4`'s
5-step per-consumer cadence (bump → fallback-first → pin-the-commit → green-handshake → consume-and-delete)
is idiomatic and complete. It needs exactly one edit: 3 asks → 4, adding the bbnf `--glass-blur-dock`
retire row so it matches the gate-authoritative roster.

---

## Fold candidates

### FC1 — AMEND-WAVE: promote B4e from "slim" to the cut-AUTHORING wave (MIGRATION)

- **Kind:** amend-wave (cursor `18.8` / `BH PLAN §B4e`).
- **Gestalt approach:** B4e is currently a hygiene/slim wave; the cut's PRIMARY consumer surface
  (MIGRATION.md) is unbuilt, so B4e is actually the authoring wave and should be specced as one. Retitle
  MIGRATION off `v2.0`; author the 5.0.0 section from a blank slate (203-row TABLE + `--ring` row +
  key-preserving flat-barrel note); collapse the 16 accreted 4.x blockquotes into a linear ladder. Add
  an acceptance witness: a device-free arm asserting MIGRATION.md has a `## 5.0.0` heading, a
  203-row table, a `--focus-ring-color` row, and a title that no longer says `v2.0`. (Fable design arm:
  none — this is a doc-authoring wave, mechanical/prose; no DesignSync surface.)

### FC2 — AMEND-WAVE (or NEW-WAVE): give the 5.0.0 CHANGELOG entry a wave owner + reconcile the stale Unreleased

- **Kind:** amend-wave B4e (preferred — same doc-slim pass) OR a small new-wave `W-CHANGELOG-5.0.0`.
- **Gestalt approach:** the 5.0.0 "what changed" narrative is a first-class release artifact, not
  protocol prose — assign it explicitly. Deliverable: the `## 5.0.0` CHANGELOG section (the 5 items from
  §2.3) + delete the dead `## Unreleased` (CHANGELOG.md:212, mis-ordered between 3.3.0 and 3.2.0).
  Acceptance: `## 5.0.0` present, zero `## Unreleased`, section carries the export-reshape + `--ring` +
  value-de-straddle bullets.

### FC3 — PLAN-DOC-EDIT: fix the value.js peer target in `publish-and-cut §2.1` and stop restating owned numbers

- **Kind:** plan-doc-edit (`publish-and-cut.md:54`).
- **Gestalt approach:** single-writer discipline for the DOC. `publish-and-cut §2.1` must not
  re-specify the value.js range — B2.1-swap (cursor 18.1) is "the LITERAL sole package.json writer." Fix
  §2.1 to `^1.0.0 → ^1.1.1` (matching the authoritative owner + the gate literal) OR replace the number
  with a back-pointer ("the peer floor is B2.1-swap's; see cursor 18.1"). Drop the stale `^0.13.0 ||`
  straddle description (already de-straddled on disk). This closes the F1 release-red trap.

### FC4 — PLAN-DOC-EDIT: reconcile the ask count to 4 across the cut docs

- **Kind:** plan-doc-edit (`publish-and-cut.md:85` + `:141`).
- **Gestalt approach:** the BH B7 roster + `proof:crossrepo-asks:bh` `>=4` floor are authoritative. Edit
  `publish-and-cut §4` to name **4 by-name asks** (muster/speedtest/atlas + bbnf `--glass-blur-dock`
  retire), removing the "bbnf-buddy … no ask owed" clause. Note the bbnf ask is a no-op retune but still
  a gate-witnessed row. Closes the F4 gate-red trap.

### FC5 — PLAN-DOC-EDIT: designate `publish-and-cut.md` the ONE canonical cut home; back-point the rest

- **Kind:** plan-doc-edit (`publish-and-cut.md` header + `BH PLAN §2/§7` + the cut cursor rows).
- **Gestalt approach:** the number-drift in F1 and F4 is a symptom of the 4-way spread. Add a header line
  to `publish-and-cut.md` — "this is THE canonical 5.0.0 cut choreography; BH PLAN §2/§7 and the cursor
  cut-rows POINT here for numbers." Then every downstream mention states the obligation and back-references
  the numbers rather than restating them. Prevents the next drift.

### FC6 — PLAN-DOC-EDIT: refresh the stale `release.sh` header docstring

- **Kind:** plan-doc-edit (`release.sh:12-19`).
- **Gestalt approach:** one-block header rewrite: the flow is "runs `gates.mjs --run full` (the deduped
  local ∪ ci ∪ release union) + dist smoke-check + annotated tag," not the retired 4-gate matrix. Trivial
  release-machine coherence fix; fold into whatever wave touches the release path (or the B5c/gate pass).

---

## What is NOT a finding (verified sound — do not touch)

- **The inv-11 lineage spine + `release/4.3.0` divergence reconcile** — verified real (`28cf1cd1` NOT an
  ancestor of BG) and correctly handled by merging `release/4.3.0` onto master before its own tag. The
  three-tag cadence (4.3.0→4.4.0→5.0.0) is grounded in the additive-vs-major distinction (GU-1 must be
  `^4`-reachable), not over-contrivance.
- **The `--run full` siblings-absent pre-tag battery + `proof:close-battery-parity`** — the exact
  discipline that kills the BA close-lie class. Keep it.
- **`release.yml` gated provenance publish** (OIDC + `--run full` re-run on the clean runner) — coherent,
  matches the 3.2.0/4.0.0 precedent.
- **The 5-step consume-and-delete consumer cadence** (`publish-and-cut §4`) — idiomatic; only the count
  (F4) is wrong, not the mechanism.
