# BD.W-PRECEPTS-README-FRESHEN

## (1) Band + goal

**Band 6 — Precept canon.**

Freshen `docs/precepts/README.md §Layout` so the standing-doc index matches the BC-landed precept set: `motion-canon.md` is now (P1-P7) not (P1-P6); add `affordance-map.md` (BC.W-AFFORDANCE-MAP), `tunable-anim.md`, and `instructions/gestalt-first-capture.md` to the Layout tree. Optionally lock the README↔file-set parity with a thin `proof:precepts-index` gate (the `proof:precept-current` precedent).

## (2) Starting state — the exact on-disk reality

- **`docs/precepts/README.md §Layout` (VERIFIED, read in full, `:27-57`):** the Layout tree (a fenced `text` block, `:29-57`) lists `instructions/` (README/ORCHESTRATION/STYLE/TRANCHE-AND-WAVE-SPEC/CONSUMING/LESSONS-LEARNED + `style/CALIBRATION.md` + the `tranche/` set), `audits/overfitting-audit.md`, `glossary/meta-terms.md`, `cross-repo-dev-resolution.md`, and `motion-canon.md`. The `motion-canon.md` entry (`:54-56`) reads: "`motion-canon.md`  The binding motion principle-set **(P1-P6)** — spring-iff-spatial, compositor-only, the per-spring clock, PRM keeps-fade-drops-transform". The tree OMITS `affordance-map.md`, `tunable-anim.md`, and `instructions/gestalt-first-capture.md`.
- **`motion-canon.md` goes through P7 (VERIFIED):** `grep -nE '^##+ P[0-9]' motion-canon.md` returns P1 (`:17`), P2 (`:45`), P3 (`:53`), P4 (`:63`), P5 (`:76`), P6 (`:107`), **P7 (`:134` — "the ONE source + the ONE clock + the sanctioned off-spine SET")**. The README's "(P1-P6)" is stale by one principle; P7 is load-bearing (read by `proof:motion-one-clock`, `package.json:965`).
- **The three omitted precepts all PRESENT on disk, BC-dated (VERIFIED):**
  - `docs/precepts/affordance-map.md` (15274 bytes, `Jun 19`) — header (`:1`): "affordance-map — the interaction-affordance idiom (BC.W-AFFORDANCE-MAP)". Read by `proof:affordance-map` (`package.json:967`).
  - `docs/precepts/tunable-anim.md` (9573 bytes, `Jun 19`) — header (`:1`): "tunable-anim — the tunable-animation registry (the one motion-tuning index)". Read by `proof:tunable-anim` (`package.json:968`).
  - `docs/precepts/instructions/gestalt-first-capture.md` (4209 bytes, `Jun 19`) — header (`:1`): "Gestalt-first capture" (P1-P5, the per-wave capture discipline that abolishes the single-terminal-reflect deferral; codified BC.W-GESTALT-FIRST). It lives UNDER `instructions/` (not the precepts root), so its README entry belongs in the `instructions/` subtree of the Layout block.
- **No `proof:precepts-index` gate exists (VERIFIED):** `grep -n 'precepts-index' package.json` = absent (it would be a NEW optional gate).

The decision: FOLD-LEDGER `→BD.W-PRECEPTS-README-FRESHEN` — "Freshen + (optional) proof:precepts-index gate."

## (3) The build — the README freshen (a submodule commit, orchestrator-owned)

**A precept-submodule doc edit. Orchestrator owns the commit + the pointer bump (named in the BD plan → ι expects it).**

Edit `docs/precepts/README.md §Layout`:

1. **Fix the motion-canon principle count** (`:54-56`): "(P1-P6)" → "(P1-P7)", and extend the one-line gloss to name P7: "… the per-spring clock, PRM keeps-fade-drops-transform, **the ONE source + the ONE clock + the sanctioned off-spine SET (P7)**".
2. **Add `affordance-map.md`** to the precepts-root level of the Layout tree (beside `motion-canon.md`):
   ```
   affordance-map.md             The interaction-affordance idiom (P1-P5) —
                                 every interactive element answers the pointer
                                 the same liquid way; the FIVE-primitive closed
                                 affordance set (BC.W-AFFORDANCE-MAP)
   ```
3. **Add `tunable-anim.md`** to the precepts-root level:
   ```
   tunable-anim.md               The tunable-animation registry — the ONE index
                                 naming every animatable axis (each a token a
                                 consumer/live-demo re-tunes + reads back)
   ```
4. **Add `instructions/gestalt-first-capture.md`** to the `instructions/` subtree of the Layout tree (it lives under `instructions/`):
   ```
   gestalt-first-capture.md   The per-wave paint-capture discipline (P1-P5) —
                              abolishes the single-terminal-reflect deferral; a
                              wave verifies its OWN paint at its OWN close
                              (BC.W-GESTALT-FIRST)
   ```

The freshen makes the README — the entry-point index a fresh agent reads at tranche open — match the BC-landed binding precept set, so the new precepts are discoverable from the index, not only by directory-listing.

### (Optional) `proof:precepts-index` — the README↔file-set parity gate

If the optional BUILD ships (the `proof:precept-current` precedent — a thin gate that locks the doc from re-drifting): a glass-ui `scripts/proof-precepts-index.mjs` that asserts every `docs/precepts/*.md` + `docs/precepts/instructions/*.md` precept file is named in `README.md §Layout` (and vice-versa — every Layout entry resolves on disk). Born-RED on the CURRENT tree (affordance-map/tunable-anim/gestalt-first-capture are un-indexed → 3 violations); GREEN after the freshen. The gate gates its submodule-reading clause behind the absent-submodule skip-by-policy (BD.W-SUBMODULE-SKIP-POLICY's convention) + a self-test bite (a synthetic un-indexed precept file MUST flag). This is OPTIONAL — the freshen is the binding deliverable; the gate is the anti-re-drift lock (the candidate's "optionally lock").

Fences honored: the freshen is a precept-submodule doc edit (the `instructions/README.md §Gates`-style content is NOT touched — only `docs/precepts/README.md §Layout`). If the optional gate ships, it follows the established submodule-skip-by-policy + self-test convention.

## (4) The gate — born-RED → GREEN (the optional index gate, or device-free verification)

- **If `proof:precepts-index` ships (optional BUILD):** born-RED on the current tree (3 un-indexed precepts → 3 violations); GREEN after the freshen adds the 3 entries + fixes the P1-P7 count. The self-test bite: a synthetic un-indexed precept file MUST flag. The submodule-reading arm skips-by-policy on the absent submodule (CI); the synthetic self-test (inline fixture) keeps biting.
- **If no gate ships (the doc-only path):** device-free verification — every precept file on disk is named in `README.md §Layout` (the 3 added + the corrected count) and every Layout entry resolves on disk. The verification is a `ls docs/precepts/*.md docs/precepts/instructions/*.md` ⊆ README-named-set check, run by hand at the wave close.

## (5) Paint verification

**Device-free — doc wave (no paint).** NO `proof:ba-gestalt`. The artefact is the freshened README §Layout (P1-P7 + the 3 added entries) + (if shipped) the `proof:precepts-index` born-RED→GREEN. No painting surface is touched.

## (6) Fences + risks

- **SUBMODULE-COMMIT FENCE** (as BD.W-CLOSE-DISCIPLINE-CANON). The README freshen lands in the `docs/precepts` submodule; the orchestrator owns the commit + the pointer bump; ι expects it.
- **Place `gestalt-first-capture.md` under the `instructions/` subtree** — it lives at `docs/precepts/instructions/gestalt-first-capture.md`, NOT the precepts root; its Layout entry belongs in the `instructions/` block, not beside `motion-canon.md`.
- **The P1-P7 count must match motion-canon.md** — the README gloss tracks the doc (P7 at `:134`); do not write "(P1-P6)" or "(P1-P8)". The count is the load-bearing fact (P7 is read by `proof:motion-one-clock`).
- **Optional gate, not mandatory** — the freshen is the binding deliverable; the `proof:precepts-index` gate is the anti-re-drift lock (the candidate's "optionally"). If it ships, it carries the submodule-skip-by-policy + self-test convention (BD.W-SUBMODULE-SKIP-POLICY).
- **No glass-ui src/ touch** (unless the optional gate ships, which is a `scripts/` edit) — the freshen is a precept-submodule doc edit.
