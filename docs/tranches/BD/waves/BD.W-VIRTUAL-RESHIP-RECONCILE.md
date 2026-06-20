# BD.W-VIRTUAL-RESHIP-RECONCILE — resolve the /virtual RETIRED-vs-reshipped contradiction + correct the /pager subpath-name mismatch

- **Band:** 7 (CLAUDE.md coherence) · **Source dim:** CMD · Doc-only (+ an optional thin gate fold).
- **One-line goal:** Reconcile the direct self-contradiction between CLAUDE.md:422 (says `/virtual` was RETIRED at L.W3) and :196 (the BC.W-VIRTUAL-WINDOW HOMECOMING) + the live `./virtual` export, and correct :144 "subpath /pager" to the real export key `./pager-dots`.

---

## 1. Band + goal

A direct contradiction between two sections of the SAME doc is the worst coherence failure — a planner reading :422 concludes `/virtual` is dead while it is a live BC headline (the homecoming). This wave makes the doc internally consistent with itself AND with `package.json` exports. Two precise edits: the /virtual reconcile and the /pager naming fix.

## 2. Starting state — the exact on-disk reality (VERIFIED by reading)

**The /virtual contradiction (both lines read + the export checked):**

- **CLAUDE.md:422** (verbatim): *"The `@mkbabb/glass-ui/pagination` and `@mkbabb/glass-ui/virtual` subpaths were RETIRED at L.W3 (0 production consumers; substrate-without-consumer-binary invariant)."*
- **CLAUDE.md:196** (verbatim, the `composables/virtual/` structure line): *"the re-homed virtualized-section-windowing leaf (BC.W-VIRTUAL-WINDOW — the HOMECOMING: v0.9.4 → retired v1.0 (MIGRATION §3.2-3.4, '0 consumers') → returned BC, two binary consumers overturning the verdict: live words DefinitionContentView + booked dock-search). … Subpath /virtual ONLY, OFF the root barrel … Machine-locked by proof:virtual-window (VW1-VW5 + per-clause self-test) + the byte-faithful fixture + the π capture."*
- **package.json exports:** `./virtual` is **PRESENT** (verified `node -e`). `./pagination` is **absent** (verified — genuinely still retired).

So :422 is HALF wrong: `/pagination` IS still retired (correct), but `/virtual` was RESHIPPED at BC (the homecoming, :196). The two glass-ui-doc sections directly contradict, and :422 contradicts the live export.

**The /pager naming mismatch (line read + exports checked):**

- **CLAUDE.md:144** (verbatim, the `pager-dots/` structure line): *"PagerDots + .glass-pager-ring — the unified pager-dot register (BA.W-PAGER; **subpath /pager**)."*
- **package.json exports:** `./pager` is **absent**, `./pager-dots` is **PRESENT** (verified). So "subpath /pager" names a NON-EXISTENT export key; the real key is `./pager-dots`.

(The CANDIDATE-WAVES.md also flags a "/pager mismatch" at the same line — confirmed: the `pager-dots/` dir's subpath is `./pager-dots`, not `./pager`.)

## 3. The build — precisely what changes

**Two precise doc edits (CLEAN, no alias):**

### Edit 1 — :422 the /virtual reconcile

Split the claim so it tells the truth on BOTH subpaths:

> "The `@mkbabb/glass-ui/pagination` subpath was RETIRED at L.W3 (0 production consumers; substrate-without-consumer-binary invariant). The `@mkbabb/glass-ui/virtual` subpath was likewise retired at v1.0 (L.W3, MIGRATION §3.2-3.4 '0 consumers') but RETURNED at BC.W-VIRTUAL-WINDOW (the HOMECOMING — two binary consumers overturning the verdict: live words DefinitionContentView + booked dock-search; see the `composables/virtual/` structure entry); `./virtual` is a live published subpath at HEAD."

This makes :422 agree with :196 (the homecoming) AND with the live `./virtual` export — the contradiction is closed, the L.W3 retirement is preserved as HISTORY (the homecoming is the explicit overturn-with-rationale, the no-silent-resurrection discipline: the v1.0 retirement is named, the BC return is named, the ≥2-consumer trigger that fired it is named).

### Edit 2 — :144 the /pager → /pager-dots correction

Change "subpath /pager" → "subpath /pager-dots" (the real export key). The PagerDots register text is otherwise correct; only the subpath name is wrong.

## 4. The gate — the optional thin fold (born-RED → GREEN)

This is doc-only; the primary verification is device-free (§5). An OPTIONAL born-RED arm folds into a sibling gate (the CANDIDATE-WAVES.md sketch: "fold into proof:claude-structure-sync or proof:subpath-enumeration"):

- **Recommended home: extend `proof:subpath-enumeration`** (it already imports `package.json` exports + has the canonical export-key set). Add a CLAUDE.md-coherence clause:
  - **SUBPATH-PROSE-SOUND:** scan CLAUDE.md for every `subpath /X` / `@mkbabb/glass-ui/X` reference and assert each names a REAL export key (or is explicitly flagged RETIRED). Born-RED on HEAD (`subpath /pager` names no `./pager` key) → GREEN after the :144 fix.
  - **NO-LIVE-RETIRED-CLAIM:** assert no CLAUDE.md prose claims a subpath is RETIRED while its `./X` export key is live in package.json. Born-RED on HEAD (:422 claims `/virtual` retired while `./virtual` is a live export) → GREEN after the :422 reconcile.
  - A self-test bite: a synthetic CLAUDE.md fixture claiming "subpath /nonexistent" or "/virtual RETIRED" while the export is live MUST flag.

If the orchestrator prefers the doc-only route (no gate code), the verification is the device-free assertion in §5 — but the gate is the stronger close (it prevents a future re-introduction of the same contradiction class, the no-silent-drift discipline).

## 5. Paint verification — the device-free assertion (no paint)

DOC-only — **zero pixels** (BB inv-4: no `proof:ba-gestalt` verdict; the W-PRUNE-CONSOLIDATE precedent). The binding verification:

- **The internal-coherence assertion:** after the build, a grep of CLAUDE.md for `/virtual` finds :196 (homecoming, live) and :422 (now: "retired at v1.0 → RETURNED at BC, live at HEAD") in AGREEMENT — no section contradicts another. A grep for `subpath /pager` finds :144 naming the REAL `./pager-dots` key.
- **The export-truth assertion:** every `subpath /X` reference in CLAUDE.md resolves to a `./X` key in `package.json` exports (or is explicitly RETIRED with `./X` absent — `/pagination` stays the correct retired case).
- If the optional gate ships: born-RED on HEAD (the two violations) → GREEN after the build, on `[local,ci]` device-free.

The BC anti-disease law (no source-green close) is satisfied: a doc-coherence wave's "paint" is the doc's internal consistency, machine-/grep-checkable — there is no painted surface, and the verification IS the coherence check.

## 6. Fences + risks

- **The /pagination retirement is PRESERVED.** :422 keeps `/pagination` as RETIRED (it IS still absent from exports — verified). Only the `/virtual` clause is reconciled; do NOT accidentally resurrect `/pagination` (no `./pagination` key exists, and no homecoming landed for it).
- **NO-SILENT-RESURRECTION.** The /virtual reconcile names the v1.0 retirement (history) AND the BC return AND the ≥2-consumer trigger (the homecoming's J-inv-10 overturn). The doc must not simply delete the retirement line — it records the full lineage (retire → return-with-rationale), the no-silent-drop discipline (a subpath that died and came back carries its overturn rationale in the doc).
- **The :196 homecoming entry is AUTHORITATIVE.** :422 is re-pointed to AGREE with :196 (the structure entry is the canonical /virtual home — it carries the full off-root-barrel rationale, the SESSION_HEIGHT_CACHE memory note, the proof:virtual-window lock). :422 cross-references it rather than re-stating the detail.
- **No-silent-drop (CMD Class H).** This discharges FOLD-LEDGER Class H row 2 ("/virtual RETIRED-vs-reshipped contradiction + /pager mismatch").
- **No gate-name invention.** If the gate fold ships, it extends `proof:subpath-enumeration` (a REAL gate at package.json:875) — it does NOT invent a `proof:subpath-prose` name unless the orchestrator authors the script. The doc-only route is the safe fallback.
