# AY.W-CONSUMER — Consumer-staleness ledger (the {receiver, close-gate} cross-walk)

> **Tranche** AY (glass-ui) · **Band** E (the AX close) · **Track** cross-repo · **Type** content + consumer-migration · **Mode** tranche-development until greenlit.
> **Depends** — none on the glass-ui side (the surface the consumers must resolve against is HEAD, already cut). Hard INPUT to **W-CLOSE1** (`proof:ay-final`'s carry-closure clause cites this ledger) and to **W-CARRY** (the register-completeness sweep reads the consumer-side receivers).
> **Folds** the dropped DRAFT wave **AY-DRAFT.md W5** (`§2:248-262`, "Consumer-adoption ledger (W34 port)") back into the named `W-*` system. Originally AX.W34's `{receiver, close-gate}` cross-walk; pulled forward because its carry-closure feed is load-bearing for the terminal close.

---

## §0 — Goal criterion + completion criterion

**Goal criterion.** Every present-consumer sibling's `@mkbabb/glass-ui[/sub]` import resolves against glass-ui's CURRENT published surface — no consumer carries an import of a symbol glass-ui DELETED or a subpath glass-ui RETIRED. Where a consumer cannot migrate inside this tranche, its stale import is not silently carried: it is recorded in a `{receiver-wave, close-gate}` ledger row that names the EXACT downstream wave (in the consumer's OWN tranche) that will discharge it and the gate that will witness the discharge. The reverse cross-repo staleness gate — born-RED at HEAD — flips GREEN, and stays the forcing function that keeps it green on every future glass-ui bump.

**Completion criterion (the hard gate, restated below in §6).** `proof:consumer-staleness` flips born-RED → GREEN: zero stale imports across the present consumer set OR each surviving stale import is enumerated in `docs/tranches/AY/audit/W-CONSUMER-ledger.md` with a non-empty `{receiver-wave, close-gate}` terminal AND the gate's allowlist mechanism reads that ledger so an UN-LEDGERED stale import still goes RED. The ledger doc is cited by `proof:ay-final` (the W-CLOSE1 carry-closure clause) — a `grep` from `proof-ay-final.mjs` resolves the W-CONSUMER-ledger path.

---

## §1 — Defect (live-verified at HEAD, `at-dock-convergence`, 2026-06-09)

`proof:consumer-staleness` (`scripts/proof-consumer-staleness.mjs`, registered at `package.json:552`) is the REVERSE cross-repo staleness gate AX.W62 born-RED. For every present consumer sibling it asserts each glass-ui import resolves against the current published surface — (A) the subpath is a published `exports` key, (B) each named import is in that subpath's actual export set (parsed from the flat `dist/<sub>.d.ts`). It is born-RED awaiting AX.W34's discharge.

**The live re-measurement corrects the DRAFT's stale count.** AY-DRAFT.md (`§1:105-108`) and AY.md (`:186`) both record the gate as "born-RED on **12** real stale imports across **4** siblings." Re-run at HEAD with the (B) deleted-symbol arm armed (it requires the flat `dist/*.d.ts`, emitted by `npm run emit-types`; on a never-built tree the arm soft-skips and the gate passes VACUOUSLY — itself a finding, see §3), the TRUE born-RED state is **5 stale imports across 2 siblings**:

| # | sibling | file:line | stale import | subpath | kind |
|---|---|---|---|---|---|
| 1 | fourier-analysis/web | `src/components/equation/EquationView.vue:13` | `UnderlineTabs` | `@mkbabb/glass-ui/tabs` | deleted-symbol |
| 2 | fourier-analysis/web | `src/components/visualization/GalleryView.vue:13` | `UnderlineTabs` | `@mkbabb/glass-ui/tabs` | deleted-symbol |
| 3 | fourier-analysis/web | `src/components/visualization/VisualizationView.vue:27` | `UnderlineTabs` | `@mkbabb/glass-ui/tabs` | deleted-symbol |
| 4 | words/frontend | `src/components/custom/search/components/controls/LookupControlsPanel.vue:119` | `BouncyToggle` | `@mkbabb/glass-ui/tabs` | deleted-symbol |
| 5 | words/frontend | `src/components/custom/search/components/controls/WordlistControlsPanel.vue:156` | `BouncyToggle` | `@mkbabb/glass-ui/tabs` | deleted-symbol |

All 5 are the **AX.W53 tabs-unification clean break** (`d4c2910` "feat(tranche-AX): tabs-unify — the unified SegmentedTabs"). W53 deleted `BouncyToggle` / `BouncyTabs` / `UnderlineTabs` / `ResponsiveTabs` and the `/responsive-tabs` subpath, subsuming all four into ONE `SegmentedTabs` with a `variant` axis. The deleted symbols are still imported by two consumers; on the next glass-ui bump these are a **hard module-resolution failure** (the named export does not exist on `@mkbabb/glass-ui/tabs`) — exactly the W53 break-class the gate was authored to catch.

The DRAFT's "12 across 4" was a session-limit-era snapshot (the `project_workflow_stale_worktree_trap` chronic — a ledger authored at the cap and never re-grounded). The other two then-stale siblings (speedtest, and a third) have since partially migrated: speedtest now carries only a code-COMMENT and a test-STUB referencing `UnderlineTabs` (`AdminSettingsView.vue:7`, `AdminDataView.append.test.ts:125`), neither an `import … from` the gate flags. This wave records the corrected count on the record per the cardinal-DELTA discipline (measure, don't trust the inherited ledger).

**Receiver surface (live-confirmed).** The migration target is `SegmentedTabs` on `@mkbabb/glass-ui/tabs` (`src/components/custom/tabs/index.ts:5`, `export { default as SegmentedTabs }`). The migration is DROP-IN — `UnderlineTabs` and `BouncyToggle` both took `:options` + `:model-value`/`@update:model-value`, and `SegmentedTabs` keeps that exact API (`SegmentedTabsProps.options: SegmentedTabOption[]`, `multiSelect?: boolean`, `variant?: "segmented" | "pill" | "underline"`, default `segmented`). Per the W53 ARIA-role-per-variant contract: `UnderlineTabs` → `<SegmentedTabs variant="underline">` (panel-nav, `role="tablist"`); `BouncyToggle` → `<SegmentedTabs>` (segmented default, `role="group"`). No prop reshape, no emit rename.

---

## §2 — Objective

Author the `{receiver, close-gate}` consumer-adoption ledger and discharge every stale import — either the consumer MIGRATES to the AY surface (`SegmentedTabs`) or its stale row carries an explicit `{receiver-wave, close-gate}` terminal naming the downstream wave (in the CONSUMER's own tranche) that will land the migration and the gate that witnesses it.

This is a CROSS-REPO content wave with a glass-ui-side gate. The two consumer migrations (fourier-analysis/web, words/frontend) are coordination-doc-gated: glass-ui does not own those repos' source, so the migration is either (a) executed in the consumer repo under a coordination doc this wave authors, or (b) recorded as a `{receiver-wave, close-gate}` deferral that lets the gate go green via its ledger-allowlist while the consumer-side wave remains open. The wave PREFERS migration (the clean break is the canon — no backwards-compat alias re-introduces `UnderlineTabs`); the deferral path exists only for a consumer whose own tranche cannot accommodate the change in this cycle.

**Root-not-consumer note.** The gate lives in glass-ui (the publisher owns the forcing function). The FIX of a stale import lives in the consumer (glass-ui does NOT add a `UnderlineTabs` re-export alias — that would re-introduce the retired family the W53 clean break deleted, violating the no-backwards-compat invariant). The ledger is the seam: it records, per stale import, who discharges it and when.

---

## §3 — The vacuous-pass sub-defect (gate hardening, in-scope)

`proof:consumer-staleness` soft-skips the (B) deleted-symbol arm when `dist/*.d.ts` is absent (`proof-consumer-staleness.mjs:194-197`, `distMissing`), printing a loud NOTE but exiting GREEN with 0 violations. At HEAD `dist/` carries the chunk `.js` set but NO flat `.d.ts` (a `vite build` arm without the `emit-types` arm), so a bare `npm run proof:consumer-staleness` passes VACUOUSLY — the 5 real violations are invisible until `emit-types` runs. The script's own header (`:18-20`) names `build` as the CI/release predecessor that lands the full bite, so the soft-skip is by design for the standalone invocation. But the AY close must not blesss a vacuous green: **the W-CONSUMER hard gate (§6) is asserted with the dts present** (the gate command is `npm run emit-types && npm run proof:consumer-staleness`, or the gate runs as a `build`-predecessor step in CI per `gates.mjs --emit-ci`), so the (B) arm is armed when the close reads it. The wave records this precondition explicitly; it does NOT change the soft-skip behaviour (that is correct for the never-built developer tree).

---

## §4 — Files / edit-sites

| # | path | repo | edit |
|---|---|---|---|
| E1 | `docs/tranches/AY/audit/W-CONSUMER-ledger.md` | glass-ui | **NEW.** The `{receiver, close-gate}` ledger (the §5 table, machine-readable). One row per stale import: `{repo, file:line, stale-symbol, subpath, kind, disposition: MIGRATED\|DEFERRED, receiver-wave, close-gate}`. MIGRATED rows record the consumer SHA that landed the fix; DEFERRED rows record the consumer-tranche wave + the gate. |
| E2 | `scripts/proof-consumer-staleness.mjs` | glass-ui | Add the **ledger-allowlist clause**: parse `docs/tranches/AY/audit/W-CONSUMER-ledger.md` for DEFERRED rows; a violation whose `{repo, file:line, symbol}` matches a DEFERRED row with a NON-EMPTY `{receiver-wave, close-gate}` is downgraded from RED to an ALLOWED-WITH-TERMINAL notice (printed, counted separately, does NOT fail the gate). An UN-ledgered violation or a DEFERRED row with an empty terminal stays RED. This is the mechanism that lets the gate go green WITHOUT re-introducing the deleted symbol. Bite preserved: a NEW stale import nobody ledgered → RED. |
| E3 | `../fourier-analysis/web/src/components/equation/EquationView.vue` + `visualization/GalleryView.vue` + `visualization/VisualizationView.vue` | fourier-analysis/web | **Consumer migration (coordination-doc-gated).** `import { UnderlineTabs } from "@mkbabb/glass-ui/tabs"` → `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs"`; the three `<UnderlineTabs … />` tags → `<SegmentedTabs variant="underline" … />` (same `:options`/`:model-value` bindings; verified drop-in). OR a DEFERRED ledger row → an `fourier`-tranche receiver wave. |
| E4 | `../words/frontend/src/components/custom/search/components/controls/LookupControlsPanel.vue` + `WordlistControlsPanel.vue` | words/frontend | **Consumer migration.** `import { BouncyToggle } from '@mkbabb/glass-ui/tabs'` → `import { SegmentedTabs } from '@mkbabb/glass-ui/tabs'`; the two `<BouncyToggle … />` tags → `<SegmentedTabs … />` (segmented default; same `:options`/`:model-value`). OR a DEFERRED ledger row → a `words`-tranche receiver wave. |
| E5 | `docs/tranches/AY/coordination/from-AY-W-CONSUMER-tabs-migration.md` | glass-ui | **NEW.** The cross-repo coordination doc: the 5 sites, the drop-in mapping (`UnderlineTabs` → `variant="underline"`, `BouncyToggle` → segmented default), the SHA at which glass-ui's `SegmentedTabs` is the canonical surface (`d4c2910`), and the binding-verification note (per MEMORY `feedback_glass_ui_binding_verification` — a stale reka-ui prop silently no-ops; the consumer must e2e-verify the migrated tab renders, not just typecheck). |

The wave writes NO `src/` of glass-ui (it is content + a script clause + cross-repo migration). The glass-ui surface is FIXED; the consumers move to it.

---

## §5 — The ledger shape (W-CONSUMER-ledger.md)

The ledger is the deliverable. Each stale import is one row; the gate (E2) reads it. The terminal is `{receiver-wave, close-gate}` — `receiver-wave` is the EXACT wave (in the consumer's OWN tranche, NOT a glass-ui wave) that discharges the row; `close-gate` is the artefact that witnesses the discharge.

| repo | file:line | stale-symbol | subpath | disposition | receiver-wave | close-gate | landed-SHA |
|---|---|---|---|---|---|---|---|
| fourier-analysis/web | `equation/EquationView.vue:13` | `UnderlineTabs` | `/tabs` | MIGRATED \| DEFERRED | (consumer tranche wave) | `proof:consumer-staleness` GREEN over this site | (SHA if MIGRATED) |
| fourier-analysis/web | `visualization/GalleryView.vue:13` | `UnderlineTabs` | `/tabs` | … | … | … | … |
| fourier-analysis/web | `visualization/VisualizationView.vue:27` | `UnderlineTabs` | `/tabs` | … | … | … | … |
| words/frontend | `…/controls/LookupControlsPanel.vue:119` | `BouncyToggle` | `/tabs` | … | … | … | … |
| words/frontend | `…/controls/WordlistControlsPanel.vue:156` | `BouncyToggle` | `/tabs` | … | … | … | … |

A MIGRATED disposition needs no `receiver-wave` (the row is discharged at this SHA; the gate sees no violation). A DEFERRED disposition MUST carry both a `receiver-wave` and a `close-gate` — an empty terminal is the FAILURE the gate's allowlist refuses (it stays RED). "Deferred to a future tranche" is NOT a valid terminal (the named-successor discipline); the destination must be an exact consumer-tranche wave ID.

The ledger header records the corrected born-RED count (5/2, not 12/4) with the re-measurement note, per the cardinal-DELTA discipline.

---

## §6 — HARD GATE (evidence-backed)

**`proof:consumer-staleness` flips born-RED → GREEN, with the (B) deleted-symbol arm armed (dts present) and the ledger-allowlist clause landed.**

The gate is GREEN when, for every present consumer sibling, every glass-ui import either (a) resolves against the current published surface (the symbol exists on the subpath — the MIGRATED path), OR (b) matches a DEFERRED row in `docs/tranches/AY/audit/W-CONSUMER-ledger.md` carrying a NON-EMPTY `{receiver-wave, close-gate}` terminal (the deferral path). Zero UN-ledgered violations; zero DEFERRED rows with an empty terminal.

**The verifying command (the artefact):**
```
npm run emit-types && npm run proof:consumer-staleness
```
must exit 0 with `violations : 0` (MIGRATED-only outcome) OR `violations : 0` + an `allowed-with-terminal : N` count where every one of the N is a ledger DEFERRED row (deferral outcome). The gate writes its artefact to the `GATE_CONSUMER_STALENESS_OUT` path (`proof-consumer-staleness.mjs:250-271`) recording the consumers checked, files scanned, and the violation/allowed breakdown — the JSON artefact is the captured evidence.

**The born-RED → GREEN DELTA is the proof.** Before (HEAD, at write-time): the command exits 1 with the 5 violations enumerated in §1 (captured in this spec). After: the command exits 0. The DELTA between the two runs (5 RED → 0 RED) is the artefact the close reads — not a "we migrated" claim, the actual exit-code + violation-count flip.

**The ledger-citation half:** `proof:ay-final` (authored in W-CLOSE1) resolves `docs/tranches/AY/audit/W-CONSUMER-ledger.md` (a path-exists + the carry-closure clause reads its DEFERRED rows into the un-receivered-carry assertion). A `grep -l "W-CONSUMER-ledger" scripts/proof-ay-final.mjs` returns the file once W-CLOSE1 lands; this wave's gate asserts the ledger doc EXISTS and is well-formed (every row has the 8 columns; every DEFERRED row has a non-empty terminal), so the citation has a target.

**Bite verification (the gate is not tautological):**
- Delete a `dist/*.d.ts` and re-run WITHOUT `emit-types` → the (B) arm soft-skips → the gate must NOT silently pass the close (the close command pins `emit-types` first; the standalone soft-skip prints its loud NOTE).
- Add a NEW stale import to any consumer with no ledger row → RED (un-ledgered violation).
- Set a DEFERRED row's `receiver-wave` or `close-gate` to empty → RED (empty terminal refused).
- Re-introduce `UnderlineTabs` as a glass-ui re-export alias to "fix" it → REJECTED at review (no-backwards-compat invariant); the only green paths are MIGRATE or LEDGER-WITH-TERMINAL.

---

## §7 — Agent unit count

ONE implementation agent (the gate clause E2 + the two coordination-gated consumer migrations E3/E4 + the ledger E1/E5 are one coherent cross-repo content unit; the consumer edits are mechanical drop-in tag/import renames). Within the AY dual ceiling (≤6 impl, ≤7 audit).

---

## §8 — Cross-references

- Folds **AY-DRAFT.md §2 W5** (`:248-262`) into the named system; the DRAFT's "12 across 4" count is corrected to the live 5/2 here.
- Hard input to **AY.W-CLOSE1** (`proof:ay-final` carry-closure clause cites this ledger) and **AY.W-CARRY** (register-completeness reads the consumer receivers).
- `scripts/proof-consumer-staleness.mjs` — the gate (AX.W62 Gate 3); E2 adds the ledger-allowlist clause.
- `scripts/constellation.mjs:36-105` — the `CONSUMERS` list (the present-sibling resolution + graceful absent-skip).
- AX.W53 (`d4c2910`) — the tabs-unification clean break that DELETED the imported family; `SegmentedTabs` is the canonical receiver.
- MEMORY `project_workflow_stale_worktree_trap` (the stale-count chronic this wave's re-measurement corrects) + `feedback_no_backwards_compat` (why the fix is MIGRATE, not a re-export alias) + `feedback_glass_ui_binding_verification` (the consumer must e2e-verify the migrated tab renders).
