# AW.W19 - Orphan resolution + speedtest/muster repatriation prune

## State

**Name**: W19 - Orphan resolution + speedtest/muster repatriation prune
**Opens after**: AW.W0 (the spot-verify ledger is the binding precondition — inv P7), the Band-D close (W14 owns the data-table tree; W19 touches no data-table path), AND — for the repatriate-prune families ONLY — the cross-repo native-first gate: the **speedtest AV repatriate-receive wave** + the **muster L repatriate-receive wave** must have landed native copies and rewired imports BEFORE glass-ui removes the source (inv-16′ native-first / prune-after; see `audit/repatriation/_DECISION.md:61-70`).
**Agents**: 1 serial
**Hard gate**: `proof:orphan-resolved` green (the 3 repatriated families + the 2 orphan families are GONE from glass-ui with zero residue; the 5 keep-shared atoms carry their keep rationale; `useBreakpoint` is re-instated to `/dom`) AND `proof:no-god-module` green (no `src/` file >500; the kept barrels carry their load-bearing rationale + no dangling import). `verify-export-types` MUST show the 5 retired subpaths GONE and the kept subpaths present.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, every W0-ledger candidate is resolved by the `audit/repatriation/_DECISION.md` verdict set (`:30-46`) one of exactly three ways:

- **REPATRIATE-PRUNE** (`_DECISION.md:32-37`, `:61-75`) — metric-cell, metric-stack (MetricStack+MetricRow), instrument-chassis (InstrumentChassis+ChassisDivider) are REMOVED from glass-ui with zero residue, AFTER speedtest + muster carry native copies + rewired imports. The operative lens is **GENERIC ATOM vs DOMAIN-SPECIFIC COMPOSITION** (`_DECISION.md:14-29`): these three are domain-specific instrument compositions (a metric readout tile, a metric ledger stack, an instrument chassis cluster) tied to the dashboard/instrument domain — speedtest and muster are the instrument/domain apps whose bespoke compositions belong native to them. All 3 repatriate.
- **PRUNE orphan** (`_DECISION.md:43-44`) — metric-pill (MetricPill, demo-only overfit) and instrument-rail (InstrumentRail, zero consumers anywhere — speedtest retired the rail posture at AN-D6) are deleted outright; no repatriation, no consumer to receive them.
- **KEEP-and-document** (`_DECISION.md:38-42`) — scrolling-text (ScrollingText, generic overflow marquee), pulse (Pulse, generic loading spinner), metric-badge (fourier ×13 + value.js), animated-digit (fourier CoefficientsSpectrum), status-dot (keyframes ×2) STAY in glass-ui. scrolling-text + pulse are GENERIC ATOMS by kind — exported public primitives that stay shared even though only speedtest/muster consume them today (the design-system-ships-proactively rule; "is exported" satisfies the overfit invariant). metric-badge/animated-digit/status-dot earn the one-line ≥2-GENERAL-app-consumer rationale at their barrels. All five stay.

Plus the inverse correction: **`useBreakpoint` is RE-INSTATED to `/dom`** — it was wrongly pruned at `cbbaeb0` despite a general-app consumer (value.js demo ×3 + speedtest `AdminDataSourceToggle.vue:7,73`). This survives unchanged from the prior W19 (it is generic, NOT speedtest-specific).

The prune is the LAST step; on prune, NO consumer resolves a dangling import because speedtest+muster imports already point local. W19 executes the resolved policy; it does not re-adjudicate the verdict set.

## 3. Scope

1. **REPATRIATE-PRUNE the 3 families** (`_DECISION.md:32-37,68,75-79`) — remove from glass-ui, with zero residue, each of: **metric-cell**, **metric-stack** (`MetricStack`+`MetricRow`), **instrument-chassis** (`InstrumentChassis`+`ChassisDivider`). None rides the root barrel (all three reach consumers via subpath only per `src/index.ts:71`). For each, strike ALL of:
   - the package dir (`src/components/custom/<family>/`);
   - the `src/subpaths/<family>.ts` one-line mirror barrel (all 3 have one);
   - the `src/api/index.ts` type entries (metric-cell/stack: `MetricCellAppearance`, `MetricCellProps`, `MetricStackProps`, `MetricRowProps` at `:201-206`; instrument-chassis: `InstrumentChassisPhase` at `:88`);
   - the `package.json` exports entry + the `typesVersions["*"]` entry (`:64-68,100-101` typesVersions; `:313-319,369-371` exports — metric-cell, metric-stack, instrument-chassis);
   - the `src/index.ts` root-barrel re-export (none of the 3 ride the root barrel — metric-cell/stack reach consumers via subpath only per `src/index.ts:71`; instrument-chassis at `:118` — confirm no root-barrel line survives for any of the 3; if a `src/components/custom/index.ts` barrel re-export exists, strike it too);
   - the demo stories (the metric-cell/stack stories, `demo/stories/compositions/instrument-chassis.vue`) + their `demo/stories/manifest.ts` entries (the metric entries);
   - the tests (`tests/components/custom/instrument-chassis/`, `tests/components/custom/metric-stack/`, + any metric-cell test dir);
   - the instrument-chassis CSS (`src/styles/instrument-chassis.css` + its `src/styles/index.css` import line) iff no surviving consumer references it.
   Clean break — no `legacy*` alias, no deprecate-and-keep, no orphaned subpath barrel, no dangling `api/index.ts` symbol, no dead `src/subpaths/*.ts` mirror.

2. **PRUNE the 2 orphans** (`_DECISION.md:37-38,58-59,76-79`) — delete outright, no repatriation:
   - **metric-pill** (`MetricPill`) — demo-only overfit. Delete `src/components/ui/metric-pill/`, the `src/index.ts:95` root-barrel re-export, and the `demo/stories/primitives/metric-pill.vue` story + its `manifest.ts:122` entry. (metric-pill has NO subpath mirror and NO `/api` symbol — it is ui/-resident, root-barrel-only.) NOTE: the audit established metric-pill does NOT compose into metric-cell — metric-cell imports only vue + cn (`_DECISION.md:58`), so removing metric-pill does not break metric-cell's repatriation.
   - **instrument-rail** (`InstrumentRail`) — zero consumers; speedtest retired the rail posture at AN-D6/D7/D11. Delete `src/components/custom/instrument-rail/`, `src/styles/instrument-rail.css` + its `src/styles/index.css` import, the `src/subpaths/instrument-rail.ts` mirror, the `package.json` export + typesVersions (`:103-104,373-375`), and the `src/index.ts:119` root-barrel re-export.

3. **KEEP-and-document the 5 keep-shared atoms** (`_DECISION.md:38-42,55-62,77-79`) — leave in glass-ui; add the one-line keep rationale at each barrel. Two keep-rationale shapes apply:
   - **scrolling-text** (`ScrollingText` — NOTE: on the ROOT barrel `src/index.ts:128`, STAYS there) — GENERIC ATOM (overflow marquee). speedtest is the sole consumer today (`AppSettingsButton.vue` ×4 + `ResultDetailSheet.vue` ×1), but it is general by kind + exported, so it stays shared regardless. Rationale shape: "generic atom / exported primitive" — re-evaluate if it stays single-consumer long-term (the re-lift trigger). Do NOT strike the `src/index.ts:128` root-barrel line.
   - **pulse** (`Pulse`) — GENERIC ATOM (loading spinner). speedtest ×7 + muster `CommandDock.vue:148`. General by kind + exported → stays shared. Rationale shape: "generic atom / exported primitive".
   - **metric-badge** — fourier ×13 (7 files) + value.js (`src/components/custom/metric-badge/index.ts`). fourier is the general-app keep; the `.metric-badge` CSS utilities stay (consumed by speedtest/fourier/muster).
   - **animated-digit** — fourier `CoefficientsSpectrum.vue:19,99` (`src/components/custom/animated-digit/index.ts`). speedtest does NOT consume it; fourier is the keep.
   - **status-dot** — keyframes demo ×2 (`src/components/custom/status-dot/index.ts`). keyframes is the general-app keep; muster ×6 corroborates but is not keep-justifying.
   Zero deletions for these five; their dirs, subpath mirrors, `package.json` exports, `/api` symbols (if any), and (scrolling-text) the root-barrel re-export all STAY. NOTE the keep-rationale gate accepts TWO valid shapes — a **generic-atom keep** (scrolling-text, pulse) cites "generic atom / exported primitive" and does NOT require a general-app consumer (the ≥2-consumer-OR-exported invariant: an exported generic primitive satisfies it on the exported leg); a **general-app keep** (metric-badge/animated-digit/status-dot) names a GENERAL-app consumer (fourier/value.js/keyframes).

4. **RE-INSTATE `useBreakpoint` to `/dom`** — restore `src/composables/dom/useBreakpoint.ts` from `cbbaeb0`'s parent (the file recovers cleanly from `cbbaeb0^:src/composables/dom/useBreakpoint.ts`) + re-export from `src/composables/dom/index.ts`. Document the ≥2 external consumers — value.js demo ×3 (`ImagePaletteExtractor.vue:91,120`, `palette-browser/composables/useCardMenu.ts:3,7`, `palette-browser/composables/useHoverPopover.ts:3,11`) + speedtest `AdminDataSourceToggle.vue:7,73` — as the load-bearing rationale at the barrel. This is the INVERSE of a repatriation: a generic primitive wrongly pruned, with a general consumer in value.js. No `/dom` media-query primitive survives the removal, so there is no kept substitute.

5. **Zero-residue discipline (inv P1)** — for every actual removal (the 3 repatriate-prunes + the 2 orphans), a `grep` for any retired symbol/subpath-mirror/api-symbol/package.json-export/root-barrel-line outside its deletion commit returns 0.

6. **Cross-repo native-first precondition (inv-16′; `_DECISION.md:66-75`).** The prune of the 3 repatriated families lands ONLY AFTER speedtest (all 3) + muster (all 3 — metric-cell/stack/instrument-chassis) carry native copies + rewired imports. W19 verifies this as a SEQUENCING GUARD (soft-warn if siblings absent on a clean CI runner — see §6.6), not a hard CI gate. The 2 orphans (metric-pill, instrument-rail) have no consumer and prune with no precondition.

7. **Update the W0 ledger to executed-state** in `audit/W19-repatriation-prune.md`: each candidate · its `_DECISION.md` verdict · action taken (repatriate-pruned | orphan-pruned | kept+documented | re-instated+documented) · the recorded keep rationale (generic-atom for scrolling-text/pulse; ≥2-GENERAL-consumer evidence for metric-badge/animated-digit/status-dot + re-instate) or the post-action `grep` proving zero residue (for every removal) · the cross-repo native-first confirmation (for the 3 repatriate-prunes).

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- a repatriate-prune reveals a glass-ui-internal consumer of one of the 3 families that the `_DECISION.md` census did NOT surface (an internal cross-import — e.g. metric-cell composing metric-badge) that would dangle on removal — the prune cannot proceed against an unledgered internal consumer; re-plan the removal order;
- the cross-repo native-first precondition cannot be confirmed (the speedtest/muster repatriate-receive waves have not landed) AND the prune is not deferrable within W19's window — escalate the sequencing rather than prune a still-live external dependency (inv-16′ violation = consumer resolves a dangling import);
- the `useBreakpoint` recovery from `cbbaeb0`'s parent cannot be restored without touching a path outside W19's File Bounds, or the recovered file does not typecheck against HEAD `/dom`;
- a third iteration of `typecheck`/`build` fails after the prune + keep-rationale + re-instate edits (a dangling import a removal left behind).

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/metric-cell/` | delete (repatriate-prune — `_DECISION.md:35`) |
| `src/components/custom/metric-stack/` | delete (repatriate-prune — `MetricStack`+`MetricRow`, `_DECISION.md:36`) |
| `src/components/custom/instrument-chassis/` | delete (repatriate-prune — `InstrumentChassis`+`ChassisDivider`, `_DECISION.md:37`) |
| `src/components/ui/metric-pill/` | delete (orphan-prune — demo-only, `_DECISION.md:43`) |
| `src/components/custom/instrument-rail/` | delete (orphan-prune — zero consumers, `_DECISION.md:44`) |
| `src/subpaths/{metric-cell,metric-stack,instrument-chassis,instrument-rail}.ts` | delete (the 4 mirror barrels; metric-pill has none; scrolling-text + pulse mirrors STAY — keep-shared atoms) |
| `src/styles/instrument-chassis.css`, `src/styles/instrument-rail.css` | delete + strike their `src/styles/index.css` imports |
| `src/index.ts` | modify-carve (strike the `:95` metric-pill, `:118` instrument-chassis, `:119` instrument-rail root-barrel re-exports + the cherry-pick header note lines `:53-54,71`; LEAVE the `:128` scrolling-text root-barrel line — keep-shared) |
| `src/api/index.ts` | modify-carve (strike `InstrumentChassisPhase` `:88` + the metric-cell/stack types `:201-206` + their comment block `:195-200`) |
| `package.json` | modify-carve (strike the 4 retired subpath exports + typesVersions for metric-cell/metric-stack/instrument-chassis/instrument-rail; register `proof:orphan-resolved`; the keep-shared subpaths' exports — scrolling-text/pulse/metric-badge/animated-digit/status-dot — STAY) |
| `src/components/custom/scrolling-text/index.ts` | modify-carve (KEEP rationale — generic atom / exported primitive; re-lift trigger if single-consumer long-term) |
| `src/components/custom/pulse/index.ts` | modify-carve (KEEP rationale — generic atom / exported primitive) |
| `src/components/custom/metric-badge/index.ts` | modify-carve (KEEP rationale — fourier ×13 + value.js general-app consumer) |
| `src/components/custom/animated-digit/index.ts` | modify-carve (KEEP rationale — fourier `CoefficientsSpectrum`) |
| `src/components/custom/status-dot/index.ts` | modify-carve (KEEP rationale — keyframes ×2) |
| `src/composables/dom/useBreakpoint.ts` | create (restore from `cbbaeb0^`) |
| `src/composables/dom/index.ts` | modify-carve (re-export `useBreakpoint` + the ≥2-external-consumer rationale) |
| `demo/stories/{primitives/metric-pill,compositions/instrument-chassis}.vue` + the metric-cell/stack stories | delete (scrolling-text + pulse stories STAY — keep-shared atoms) |
| `demo/stories/manifest.ts` | modify-carve (strike the `:122` metric-pill + the instrument-chassis + metric entries; LEAVE the `:124` scrolling-text + `:179` pulse entries) |
| `tests/components/custom/{instrument-chassis,metric-stack}/` + any metric-cell test dir | delete (scrolling-text + pulse test dirs STAY) |
| `scripts/proof-orphan-resolved.mjs` | create (born-RED on HEAD) |
| `scripts/proof-no-god-module.mjs` | modify (keep green; the `>500` global walk — already exists/registered) |
| `docs/tranches/AW/audit/W19-repatriation-prune.md` | create (the executed ledger) |

Do NOT touch: `docs/precepts/`, `src/components/ui/data-table/` (W14 owns the split; W19 reads its `DataTable.vue ≤380` ceiling, does not re-split), any aurora/blob/dock band surface, the `.metric-badge` CSS utilities (KEEP — all three of speedtest/fourier/muster consume them), the W0 ledger (W19 reads it + `_DECISION.md` as the binding verdict; it writes the executed-state ledger separately).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W19 opens after Band D so it shares no live `modify` path with W14 (data-table), W12 (glass-panel), W13 (affordance), or W15 (hygiene). The `proof:no-god-module` script already exists + is registered; W19 keeps it green (the prune only DELETES files, never grows one past 500) and reads W14's `DataTable.vue ≤380` sub-ceiling without re-splitting. The cross-repo edge (the speedtest/muster repatriate-receive waves) is a SEQUENCING dependency, not a file-bounds overlap — those waves write sibling repos only (inv-16′; glass-ui writes none of them).

## 5. Agent Units

### AW.W19.a Repatriation-prune + orphan-prune + keep-document + useBreakpoint re-instate

- Goal: the 3 repatriated families + the 2 orphans are GONE from glass-ui with zero residue; the 5 keep-shared atoms carry their keep rationale; `useBreakpoint` is re-instated to `/dom`; frozen by `proof:orphan-resolved` + `proof:no-god-module` + `verify-export-types`.
- Mechanism:
  - **Native-first precondition CHECK first** (§6.6): assert (soft-warn if siblings absent) that speedtest + muster each carry native copies of all 3 (metric-cell/stack/instrument-chassis), with their consuming imports rewired local, BEFORE any glass-ui removal. If absent on a populated checkout → block; if siblings absent on a clean CI runner → warn + record, do not hard-fail.
  - **Repatriate-prune** the 3: for each, delete the dir + subpath mirror + api symbols + package.json export/typesVersions + the root-barrel line (instrument-chassis only) + demo story + manifest entry + tests + (instrument-chassis) its CSS. `grep` each retired symbol → 0 surviving references.
  - **Orphan-prune** the 2: metric-pill (ui/ dir + `src/index.ts:95` + the demo story/manifest) and instrument-rail (dir + CSS + subpath + package.json + `src/index.ts:119`). `grep` → 0.
  - **Keep-document** the 5: append a one-line keep rationale comment at scrolling-text/pulse (generic atom / exported primitive — no general-app consumer required) and at metric-badge/animated-digit/status-dot (naming the ≥2 GENERAL-app consumers — fourier / value.js / keyframes). No deletion; scrolling-text stays on the root barrel.
  - **useBreakpoint re-instate**: restore `src/composables/dom/useBreakpoint.ts` from `cbbaeb0^`; re-export from `src/composables/dom/index.ts`; add the ≥2-external-consumer rationale (value.js demo ×3 + speedtest `AdminDataSourceToggle`).
  - `scripts/proof-orphan-resolved.mjs` (born-RED on HEAD): parse `audit/repatriation/_DECISION.md` (the verdict set) + `audit/W19-repatriation-prune.md` (the executed actions); assert each candidate's executed action matches its `_DECISION.md` verdict. For the 3 repatriate-prunes + 2 orphans, assert ZERO residue via grep — no surviving import, `src/subpaths/*.ts` mirror, `api/index.ts` symbol, `package.json` export/typesVersions, or root-barrel re-export for each family. For the 5 keeps, assert a keep rationale comment exists in the barrel — for scrolling-text/pulse a generic-atom rationale ("generic atom / exported primitive") is VALID without a general-app consumer (the exported leg of the ≥2-consumer-OR-exported invariant); for metric-badge/animated-digit/status-dot the rationale names a GENERAL-app consumer (fourier/value.js/keyframes — a rationale citing ONLY speedtest/muster FAILS for these three). For `useBreakpoint`, assert the file exists, the barrel re-exports it, and the rationale records ≥2 external consumers. Plus the cross-repo precondition assertion (§6.6) as a sequencing guard. Born RED on HEAD (the 5 removed families are present; no executed ledger; `useBreakpoint` absent from `/dom`; no keep rationales).
  - `scripts/proof-no-god-module.mjs` (already exists): kept green by the prune (DELETE-only); reads W14's `DataTable.vue ≤380` ceiling.
- Files: the 5 deleted families' dirs/subpaths/api/package.json/barrels/stories/manifest/tests, the 5 keep-rationale barrels, the restored `useBreakpoint.ts` + `/dom` barrel, `package.json`, the gate scripts, the executed ledger.
- Sub-gate: `npm run proof:orphan-resolved` + `npm run proof:no-god-module` green; `npm run typecheck` + `npm run build` green (no dangling import); `npm run verify-export-types` shows the 5 retired subpaths GONE + the keep-shared subpaths present + `/dom` re-exporting `useBreakpoint`.

## 6. Hard Gate

1. **Verdict-matched resolution.** `proof:orphan-resolved` green: every candidate's executed action matches its `_DECISION.md` verdict (`:32-44`) — the 3 repatriate-prunes + 2 orphans are removed with a zero-residue grep; the 5 keeps carry a keep rationale; `useBreakpoint` is re-instated. A repatriate/orphan family that survives, or a keep that was removed, is RED.
2. **Zero residue on the 5 removed families.** For each of metric-cell, metric-stack, instrument-chassis, metric-pill, instrument-rail: `grep` finds NO surviving import, `src/subpaths/*.ts` mirror, `api/index.ts` symbol, `package.json` export/typesVersions, or root-barrel re-export. Any survivor is RED. (scrolling-text + pulse are NOT removed — their dirs/subpaths/exports STAY.)
3. **The 5 keeps documented.** `proof:orphan-resolved` asserts each keep-shared atom carries a rationale. For scrolling-text + pulse a generic-atom rationale ("generic atom / exported primitive") is VALID and does NOT require a general-app consumer (the exported leg of the ≥2-consumer-OR-exported invariant). For metric-badge/animated-digit/status-dot the rationale must name a GENERAL-app consumer (fourier/value.js/keyframes); a rationale for these three citing ONLY speedtest/muster is RED (the `_DECISION.md:24-29` rule — instrument/domain apps do not keep-justify a composition, but they need not justify a generic atom).
4. **`useBreakpoint` re-instated.** `proof:orphan-resolved` asserts `src/composables/dom/useBreakpoint.ts` exists, `src/composables/dom/index.ts` re-exports it, and the barrel records ≥2 external consumers (value.js demo + speedtest `AdminDataSourceToggle`). Born RED on HEAD (HEAD's `/dom` lacks it).
5. **No god module.** `proof:no-god-module` green: no `src/` file >500 lines; `DataTable.vue ≤380` (W14's ceiling holds).
6. **Cross-repo native-first sequencing guard (soft).** The prune verifies (soft-warn, NOT a hard CI gate) that speedtest + muster each carry native copies of all 3 repatriated families (metric-cell/stack/instrument-chassis), with consuming imports rewired local, BEFORE the glass-ui removal. On a populated multi-repo checkout the absence of a native copy BLOCKS (inv-16′ — a consumer would resolve a dangling import). On a clean CI runner where siblings are absent, the guard WARNS + records and does not fail (siblings may not be present). It is a sequencing guard, not a CI hard gate.
7. **Build + types + export surface green.** `npm run build` + `npm run typecheck` pass; `npm run verify-export-types` shows the 5 retired subpaths GONE and the keep-shared subpaths (scrolling-text, pulse, metric-badge, animated-digit, status-dot) + `/dom` (now re-exporting `useBreakpoint`) PRESENT.

## 7. Format And Lint Cadence

- `npm run typecheck` after each family removal (catches a dangling import a deletion left) and after the `useBreakpoint` re-instate, and before close.
- `npm run proof:orphan-resolved` + `npm run proof:no-god-module` after the executed ledger lands.
- `npm run verify-export-types` after the prune + the `/dom` re-export land (confirms the 5 retired subpaths GONE, the keep-shared subpaths + `/dom` present).
- `npm run build` before close.
- `git diff --check` for whitespace.
- No formatter skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W19-repatriation-prune.md` — the executed ledger (candidate · `_DECISION.md` verdict · action {repatriate-pruned | orphan-pruned | kept+documented | re-instated+documented} · keep rationale {generic-atom | ≥2-GENERAL-consumer} record | zero-residue grep · cross-repo native-first confirmation for the 3).
- `scripts/proof-orphan-resolved.mjs` JSON artifact + the `proof:no-god-module` JSON artifact.
- The zero-residue grep transcript for the 5 removed families.
- The recorded keep rationale for the 5 keeps (generic-atom for scrolling-text/pulse; the fourier/value.js/keyframes import sites for metric-badge/animated-digit/status-dot) + `useBreakpoint`.
- The `verify-export-types` output: 5 retired subpaths GONE, keep-shared subpaths + `/dom` re-export present.
- The integration commit hashes.

## 9. Commit Plan

- `refactor(repatriate): prune metric-cell + metric-stack + instrument-chassis (native in speedtest+muster)` — the 3 repatriate-prunes with zero residue; body cites `_DECISION.md:32-37,66-75` and the native-first confirmation (speedtest all 3; muster all 3).
- `refactor(prune): delete metric-pill + instrument-rail orphans (zero consumers)` — the 2 orphan deletions; body cites `_DECISION.md:43-44` (metric-pill demo-only; instrument-rail retired at speedtest AN-D6).
- `docs(keep): scrolling-text + pulse generic-atom + metric-badge + animated-digit + status-dot keep rationale` — the 5 keep barrels; body names the generic-atom rationale for scrolling-text/pulse (overflow marquee / loading spinner, exported primitives) and fourier ×13 / fourier CoefficientsSpectrum / keyframes ×2 for metric-badge/animated-digit/status-dot.
- `feat(dom): re-instate useBreakpoint (≥2 external consumers — value.js + speedtest)` — restore from `cbbaeb0^` + re-export + rationale.
- `feat(gate): proof:orphan-resolved (repatriate + orphan + keep + re-instate)` — the gate; body cites `_DECISION.md` as the binding verdict + inv-16′ native-first sequencing.
- `docs(AW): W19 close — executed repatriation-prune ledger` — the artefact + status flip.

## 10. Dependencies

- **Depends on**: AW.W0 (the spot-verify ledger — inv P7) + `audit/repatriation/_DECISION.md` (the resolved verdict set W19 executes) + the Band-D close (W14's `DataTable.vue ≤380` ceiling) + — for the 3 repatriate-prunes ONLY — the **speedtest AV repatriate-receive wave** (`constellation/waves/speedtest-AV-adopt.md`) + the **muster L repatriate-receive wave** (`constellation/waves/muster-L-adopt.md`) landing native copies + rewired imports (inv-16′ native-first / prune-after).
- **Blocks**: AW.W21/W33 (the close wave registers `proof:orphan-resolved` in `gates.mjs` and the overfitting audit reads W19's executed ledger) AND the glass-ui 3.4.0 cut surface (W19 is the −5-family surface delta — 3 repatriated + 2 orphans — folded into the 3.4.0 dock-fix cut; the speedtest+muster version bumps to the pruned cut land AFTER, as clean version-only moves — `_DECISION.md:74-75`).

## 11. Archaeology

AV.W10 targeted metric-cell + metric-stack as orphans but a hidden dep restored them — the dep was the EXTERNAL speedtest+muster subpath consumer, invisible to a `src/`-scoped `rg`. The decisive lens the user refined (`_DECISION.md:14-29`) is **GENERIC ATOM vs DOMAIN-SPECIFIC COMPOSITION**, not a raw consumer-count: a component stays shared if it is a general UI primitive BY KIND (a value pill, a status dot, a number reel, an overflow marquee, a loading spinner) even with a single current consumer ("is exported" satisfies the overfit invariant); it repatriates if it is a domain-specific instrument COMPOSITION (a metric readout tile, a metric ledger stack, an instrument chassis cluster) tied to the dashboard/instrument domain. So the audit's "muster genuinely consumes metric-cell/stack/instrument-chassis" finding does NOT keep them shared — they are compositions, so muster ALSO gets native copies (REPATRIATE, not keep). The "speedtest-by-name is only in doc-comments, props are generic" finding for instrument-chassis is moot under the user's specificity call: it "is not general enough" regardless of prop neutrality (`_DECISION.md:24-29,37`). scrolling-text + pulse were briefly mis-sorted into the repatriate set, but they are GENERIC ATOMS by kind (an overflow marquee / a loading spinner) — they KEEP shared even though only speedtest/muster consume them today (`_DECISION.md:28-29,38-39,58-59`); the generic-atom keep needs no general-app consumer. `useBreakpoint` is the INVERSE near-miss: a generic primitive wrongly pruned at `cbbaeb0` despite a general consumer in value.js — W19 re-instates it. The guardrail against a repeat blind-prune OR a wrong keep is `proof:orphan-resolved`'s verdict-match assertion against `_DECISION.md` + the requirement that a composition-keep rationale name a GENERAL-app consumer (a generic-atom keep is valid on the exported leg alone).
