# BH Coherence Re-Spec — PASS 2 · Cluster C3+C6-minor (the 3-item fixup bundle)

**Date:** 2026-06-30 · **HEAD:** `f7dd6146` (branch `tranche/BG`, BH shares it) · **siblings-intact:** exit 0 (before + after) · **mode:** spec.

This is the RESOLUTION spec for the three minor-confirmed items bundled from the C3 and C6 clusters:

- **(a) C3 — the DEFER-to-BG-fold relabel** (this cluster is already resolved by BG's own fold; BH references it, does not re-derive).
- **(b) the `:186→:151` line-anchor correction** (a stale line-number reference that drifted; the fix uses a content-anchored gate-string, not a hardcoded line number — the recurring dead-knob / anchor-drift friction class).
- **(c) C6 — the interleave `:101` "+2 siri" 5th site** (siri-island is PUBLISHED, siri-waveform is INTERNAL — confirmed; the interleave doc's "+2 siri" fix set undercounts its own occurrence sites by one).

All three are **coherence-completeness text corrections** — bounded plan-text / cross-reference amendment, **zero feasibility restart, no new friction class**. Every claim below is disk-verified this pass (anchors shown), not carried from prose.

---

## §0 The write-fence rule that governs all three

Two of the three items touch text that lives in the **BG tree** (`docs/tranches/BG/execution/bh-interleave-map.md`, `docs/tranches/BG/audit/RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md`). The absolute write-fence forbids a BH pass from writing the BG-tree interleave map. This is not a friction — it is the STRUCTURAL reason all three collapse to "DEFER + cross-reference," not "re-author":

> The BG fold (`AMENDED-COHERENCE-PLAN.md:214-215`) ALREADY owns every BH-side interleave edit AND the BG-tree gate re-anchor. BH's job in these three items is to **verify the BG fold carries them, record the cross-reference, and correct only the BH-tree copies BH is permitted to write** (`PLAN.md`). The two-fold-race is avoided by construction: exactly one tranche writes each line.

Disk anchor (the BG fold row that owns these edits, `AMENDED-COHERENCE-PLAN.md:214`):

> `docs/tranches/BG/execution/bh-interleave-map.md §2 + §4` | … B4f gate (`:151-152`, re-anchored at HEAD — MR-5) → `proof:claude-deletable` GREEN (C1/C2-de-blinded-**16**/C3) … | `docs/tranches/BH/PLAN.md:93` (B4f) + B5c | B4f gate → `proof:claude-deletable` GREEN form; B5c soft-cleanup note (same MR folds)

So: the BG fold's **MR-5 already re-anchored the B4f gate at `:151-152`** (item b is BG-owned and CONFIRMED), and the BG fold's last row **already owns the BH-tree `PLAN.md:93` + B5c edits** (item a's defer target). Both are disk-real.

---

## §1 Item (a) — C3 DEFER-to-BG-fold relabel (T3 A1/A2 → verify-and-cross-reference)

### The finding

C3's pass-1 direction was **RESOLVED-IN-DIRECTION**: T3's A1 (the bh-interleave-map §2/§4 doc edits) and A2 (the 16-reader re-home cross-reference) are NOT independent re-authors — the BG fold already owns them. This item finalizes that relabel.

### Disk verification (the BG fold owns the BH-doc census edits)

`AMENDED-COHERENCE-PLAN.md:214-215` (verified this pass) explicitly enrolls:

1. **`bh-interleave-map.md §2 + §4`** — "ADD the G3(WS7)→B4b-content(WS12) hard-collision row + the `.githooks/commit-msg` B0→G3 row + the G7(WS5)→crossrepo-asks edge; B4f gate (`:151-152`, re-anchored at HEAD — MR-5) → `proof:claude-deletable` GREEN".
2. **`docs/tranches/BH/PLAN.md:93` (B4f) + B5c** — "B4f gate → `proof:claude-deletable` GREEN form; B5c soft-cleanup note (same MR folds)".
3. The census MR note directly below (`:216`): "**The census is 16, not 15** (MR-1). Every count the develop pass writes is 16; the soft-cleanup set is derived (string-grep ∖ 16-hard), not hand-listed."

### The RESOLUTION (relabel, do not re-author)

| Prior T3 item | New label | Rationale (disk-grounded) |
|---|---|---|
| **A1** (bh-interleave-map §2/§4 doc edits) | **DEFER to BG fold** (`AMENDED-COHERENCE-PLAN.md:214`, MR-5) | The BG fold owns these exact lines. The write-fence forbids BH writing them. BH records the cross-reference only. |
| **A2** (16-reader re-home cross-reference) | **DEFER to BG fold** (EXEC row 18.10 + bg-build-map G5 pin 16 + DE-BLINDED C2 detector) | The 16-pin and the de-blinded detector are already folded. BH's PLAN.md:99 says "16 CLAUDE-readers" — **AGREE** (both 16, §6 of COHERENCE.md). No re-author owed. |
| **A3** (the `15 BG-append` vs `16 reader` numeral-collision disambiguation) | **KEEP — net-new** | Live on PLAN:42 (`"15 BG specs append"` = WRITE-into-CLAUDE count) and interleave:98. Disjoint from the 16-reader census (a WRITE count ≠ a READER census). Not covered by the BG fold. |
| **A4** (the 2-crash / 14-silent-false-fail ENOENT taxonomy) | **KEEP — net-new** | The 2 bare `readFileSync` crashers (structure-sync:74, doc-consistency:197) vs the 14 guarded silent-false-fail readers. Corrects PLAN:16's "they ENOENT-break" (which describes only the 2 crashers). Not in the AMENDED plan. |

**Net effect of item (a):** A1/A2 become no-op-for-BH (DEFER + one cross-reference line pointing at `AMENDED-COHERENCE-PLAN.md:214-215` and EXEC row 18.10); A3/A4 remain the genuine net-new value BH's develop pass authors into `PLAN.md`. No two-fold race; the write-fence is honored by construction.

---

## §2 Item (b) — the `:186→:151` line-anchor correction (content-anchored, not line-numbered)

### The finding

C3's pass-1 direction named "Anchor B4f gate at interleave:151 (not :186)." T3's A2 had cited the B4f `rg -l` gate at `bh-interleave-map.md:186`; that is a **stale, drifted line number** pointing at PROSE, not at the executable gate spec.

### Disk verification (the two `rg CLAUDE` sites are DISTINCT — one is the gate, one is prose)

Grep over `bh-interleave-map.md` this pass returns exactly two `rg`-CLAUDE sites:

- **`:151`** — the **executable gate spec** (the bare machine-runnable form the B4f gate anchors):
  > ``rg -l 'CLAUDE\.md' scripts/proof-*.mjs`` = 0 · the file is gone · every redistributed contract has a live gate at its new home.

- **`:186`** — a **PROSE restatement** embedded in the "Absolute-last act" narrative (NO `-l`, NO `= 0`, a summary sentence, not a runnable gate):
  > … B4b-content redistributes the contracts; gate = ``rg CLAUDE.md scripts/proof-*.mjs`` = 0 + file gone.

Anchoring the B4f gate at `:186` points at the narrative summary; anchoring at `:151` points at the actual `rg -l … = 0` gate string the C5-hard-edge + `proof:claude-deletable` born-RED are wired against. **The `:151` anchor is correct; `:186` is the drift.**

### Cross-check against the BG fold (the fix is already BG-owned)

The BG fold's MR-5 pre-empted this exact drift: `AMENDED-COHERENCE-PLAN.md:214` reads "B4f gate (`:151-152`, re-anchored at HEAD — MR-5)". So the BG fold ALREADY re-anchored at `:151-152`. Item (b) is a CONFIRM + cross-reference, not a BH-tree edit into the BG file.

### The RESOLUTION (content-anchor, per the anchor-drift friction class)

The recurring friction is **anchor-drift** (a hardcoded line number that goes stale when the doc grows/shrinks — the same dead-knob / stale-line class the seed friction taxonomy names). The durable fix is NOT "swap :186 for :151 and hope :151 never drifts" — it is to **content-anchor the reference**:

> **B4f gate anchor:** the machine-runnable form ``rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0` (currently `bh-interleave-map.md:151-152`, MR-5-re-anchored) — NOT the prose "Absolute-last act" restatement (`:186`). Any future doc-growth re-drift is caught by the content string, not the numeral.

Where a numeral IS carried (for a human reader), it is written as **"content-string @ line-N (as of HEAD f7dd6146)"** so the string is the load-bearing anchor and the numeral is an as-of hint, not a hard dependency. This is the same discipline the C6 `:101` fix (§3) applies — enumerate the CONTENT-occurrence sites, not a frozen numeral.

**Where BH writes it:** the BH-tree copy is `PLAN.md:93` (the B4f gate line) — BH's develop pass writes the content-anchored form there. The BG-tree `bh-interleave-map.md:151` re-anchor is DEFER-to-BG-fold (already MR-5-owned; write-fence).

---

## §3 Item (c) — C6 the interleave `:101` "+2 siri" 5th site

### The finding

C6's pass-1 direction was **RESOLVED-IN-DIRECTION** with the A3 correction: `"+2 siri"` → `"+1 /siri-island (siri-waveform INTERNAL; /api rises above 203)"`. The pass-1 proto (T6) listed the "+2 siri" occurrence sites as **40 / 168 / 112** (interleave) plus PLAN **:68 / :116** — but MISSED `bh-interleave-map.md:101`. T6's own verifying grep (`grep "+2 siri" → 0` post-fold) would FAIL because `:101` still carries the stale phrase. This item adds the 5th site to the fix set.

### Disk verification (the complete "+2 siri" occurrence census)

Grep over both interleave sides this pass returns the COMPLETE set:

| Site | File | Line | Text (verbatim, HEAD f7dd6146) | Tree | Who writes |
|---|---|---|---|---|---|
| 1 | `PLAN.md` | :68 | "captures WS6's **+2 siri** subpaths + WS5's viz deletes/renames" | BH | BH develop pass |
| 2 | `PLAN.md` | :116 | "against the landed surface (WS6 **+2 siri**, WS5 viz deletes/renames)" | BH | BH develop pass |
| 3 | `bh-interleave-map.md` | :40 | "re-baseline checkpoint (captures WS6 **+2 siri**, WS5 viz deletes/renames)" | BG | DEFER-to-BG-fold |
| 4 | `bh-interleave-map.md` | **:101** | "`vite.library.ts` \| **WS6** (**+2 siri** subpath entries)" | BG | DEFER-to-BG-fold |
| 5 | `bh-interleave-map.md` | :168 | "so WS6's **+2 siri** subpaths + WS5's viz deletes/renames are" | BG | DEFER-to-BG-fold |

(A sixth site, interleave ~:112, is a prose restatement in the merge-checkpoint region — C6-A2 already tracks the interleave prose band; the FIVE occurrence-sites carrying the literal `"+2 siri"` string are the ones above, and `:101` is the one T6 missed.)

### The published/internal split — CONFIRMED (why it is "+1", not "+2")

`bg-build-map.md` (verified this pass):

- **`:396`** — siri-island lists `src/subpaths/siri-island.ts` + `api/index.ts` → **PUBLISHED** (a real subpath surface entry).
- **`:402-404`** — siri-waveform has NO `src/subpaths/` line — "a WebGL2 leaf composed BY SiriIsland" → **INTERNAL**.
- **`:1174-1177`** — the human-confirm row: "siri-island = PUBLISH (`bg-build-map.md` lists `src/subpaths/siri-island.ts`); siri-waveform = INTERNAL (no subpath file …); HUMAN to confirm — the one genuine residual call."

So the vite.library.ts subpath-surface delta from the siri dir is **+1 published subpath (`/siri-island`)**, NOT +2. siri-waveform adds NO subpaths line. The `/api` surface rises ABOVE 203 because siri-island adds a published export (not a pure path-swap). The `"+2 siri subpath entries"` phrasing at `:101` is doubly wrong: (i) the COUNT (should be +1 published), and (ii) the site was omitted from T6's fix list.

### The RESOLUTION (add :101 to the fix set + content-anchor the grep)

1. **The `"+2 siri"` fix set is FIVE sites, not four:** `PLAN.md:68`, `PLAN.md:116`, `bh-interleave-map.md:40`, **`bh-interleave-map.md:101`**, `bh-interleave-map.md:168`. The BH develop pass rewrites the two PLAN sites; the three interleave sites are DEFER-to-BG-fold (write-fence — the BG fold's `AMENDED-COHERENCE-PLAN` census edits own the interleave §2/§4 re-count).

2. **The corrected string** (all five sites): `"+2 siri"` → **`"+1 /siri-island subpath (siri-waveform INTERNAL — a WebGL2 leaf composed by SiriIsland; /api rises above 203)"`**. At the tabular `:101` row specifically, the cell reads `WS6` `(+1 /siri-island published subpath entry)`.

3. **The verifying grep must be content-anchored, not count-frozen** (the SAME anchor-drift discipline as item b): the post-fold verify is `grep -rn "+2 siri" docs/tranches/BH/PLAN.md → 0` for the BH-side sites (BH-owned), AND a cross-reference note that the BG-fold's interleave re-count zeroes the three BG-side sites. A single `grep "+2 siri"` over both trees is the completeness check — if it returns >0 after the joint fold, a site was missed (this is exactly the T6 failure mode `:101` would have re-triggered).

---

## §4 The bundled resolution — one table

| Item | Cluster | Type | BH-tree action (BH writes) | BG-tree action (DEFER — write-fence) | Verify |
|---|---|---|---|---|---|
| (a) | C3 | relabel | Record A1/A2 = DEFER-to-BG-fold + cross-ref `AMENDED-COHERENCE-PLAN:214-215` / EXEC 18.10; KEEP A3/A4 net-new in PLAN | none — the BG fold owns the interleave §2/§4 + PLAN:93/B5c edits | 16-pin AGREE both sides; no two-fold race |
| (b) | C3/anchor | anchor-correct | Write the content-anchored B4f gate form at `PLAN.md:93` (``rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0` string, `:151` as-of hint, NOT `:186`) | none — MR-5 already re-anchored interleave at `:151-152` | :151 is the gate string; :186 is prose (both disk-confirmed) |
| (c) | C6 | count+site-fix | Rewrite `PLAN.md:68` + `:116` `"+2 siri"` → `"+1 /siri-island (waveform INTERNAL; /api>203)"` | none — the three interleave sites (40/**101**/168) are BG-fold-owned; :101 is the ADDED 5th site | `grep "+2 siri" → 0` post-joint-fold (content-anchored, catches :101) |

---

## §5 Convergence

**convergencePct: 96** (ready-to-amend-the-plan).

All three items are **disk-decisively confirmed** this pass:
- (a) the BG fold (`AMENDED-COHERENCE-PLAN:214-215`) demonstrably owns the interleave/PLAN doc edits → DEFER is correct + write-fence-forced;
- (b) `:151` = the executable `rg -l … = 0` gate, `:186` = prose (both grepped verbatim), and MR-5 pre-anchored `:151-152` → the correction is BG-owned + confirmed, and the durable form is content-anchored;
- (c) the complete "+2 siri" site census is FIVE (`:101` is the confirmed 5th, T6-missed), and siri-island PUBLISHED / siri-waveform INTERNAL is triple-confirmed in bg-build-map (`:396`/`:402`/`:1174`), so "+1 not +2" holds.

The residual 4% is not a doubt in any item — it is that the BH develop pass must MECHANICALLY execute the two BH-tree PLAN.md rewrites (items b and c) and record the three cross-references (item a), which happens at fold time, not in this spec. **No feasibility restart. No new friction class. The three items are bounded plan-text corrections, ready to fold.**

siblings-intact exit 0 (after).
