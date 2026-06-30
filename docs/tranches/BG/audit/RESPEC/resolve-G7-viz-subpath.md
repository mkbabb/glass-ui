# G7 — viz-subpath cross-ownership seam · CORRECTED-APPROACH SPEC

**Gap:** BG-WS5 ↔ BH-B7 viz-subpath cross-ownership. **Mode:** spec (confirm-step + lock + ordering).
**Date:** 2026-06-30 · **HEAD:** `6369ad6e` · branch `tranche/BG` · cut 5.0.0.
**Fence honoured:** read-mostly under `glass-ui/` only; `verify-siblings-intact --quiet` exit 0 before+after; wrote ONLY `RESPEC/`.
**Convergence:** 40 → **85** (the seam is CONFIRMED key-preserving; the locking mechanism is LIVE-AND-GREEN; the only true residual is one HUMAN classify call, pre-derived below).

---

## 0. VERDICT (the one-paragraph answer)

G7 is a CONFIRM-STEP, not a build — and it CONFIRMS GREEN. **WS5 as specced drops/renames ZERO consumed viz subpath keys.** The two SLIDES-consumed keys (`/constellation`, `/fourier-field`) and the two un-consumed substrate-delete keys (`/concentric`, `/paper-grid`) all PRESERVE their published key: `W-VIZ-DEMIGRATE` is an *internal* substrate swap (WGSL→`useCanvas2D`), `W-VIZ-SUBSTRATE-DELETE` removes only the WebGPU `.wgsl.ts` primary and KEEPS the GLSL fallback + the component dir + its `index.ts`. So the SLIDES migration is a **visual re-baseline, NOT an import re-point** — and BG-WS5 owns it (it produces the new Canvas2D render; the consumer re-approves its baseline fallback-first). No by-name ask is owed. The G7 *risk* is the hypothetical: a future WS5 wave that DOES drop a key would let a real break fall between BH-B7 (which assumes key-preservation) and BG-WS5. This spec LOCKS that hole with two mechanisms — one already LIVE — and pins the ordering so it can never go silent.

---

## 1. THE SEAM, EXACTLY (verified on disk)

| WS5 wave | Viz keys touched | Key fate | Consumer disposition |
|---|---|---|---|
| `BG.W-VIZ-DEMIGRATE` (M4) | `/constellation`, `/fourier-field` | **PRESERVED** — internal WGSL→`useCanvas2D` swap; `index.ts` survives | **VISUAL re-baseline** (slides + atlas re-approve fallback-first) — NO import re-point, NO ask |
| `BG.W-VIZ-SUBSTRATE-DELETE` (M4) | `/concentric`, `/paper-grid` | **PRESERVED** — only `*.wgsl.ts` primary deleted; GLSL fallback + dir kept | none (zero sibling consumers) |
| `BG.W-DOTFLOW-REBUILD` | `/dot-flow-field` | **PRESERVED** — compute stays WebGPU | **VISUAL re-baseline** (atlas re-approves) — NO ask |
| *(booked)* `W-VIZ-SUBSTRATE-DELETE2` | `/goo-blob`, `/dot-matrix`, `/goo-dot-matrix` | **PRESERVED** (GLSL fallback kept) | none (zero sibling consumers) |
| `BG.W-VIZ-*` renames | `/canvas`, `/motion-curves`, `/fourier-math` | name≠dir internal renames, **key unchanged** | none (zero live consumers) |

**Live evidence:**
- `src/components/custom/{constellation,fourier-field,concentric,paper-grid}/index.ts` all present; `src/subpaths/{constellation,fourier-field,concentric,paper-grid}.ts` all present.
- `scripts/lib/subpath-policy.mjs` `CUSTOM_CLASS` classes all four `PUBLISH` (lines 72–81).
- `PROCEDURAL-SUITE.md:18-19,72-73` — concentric/paper-grid are WebGPU-PRIMARY **with a GLSL fallback that is the SAME pure fragment** (`parity: verified`) — deleting the WGSL primary leaves a live component, not an empty dir.
- `consumer-constellation.md:33-36,102-106,152-154` — the demigrate is RECONCILED as key-preserving: *"`/fourier-field`+`/constellation` keys PRESERVED, re-render on Canvas2D → visual re-baseline only, no import re-point — this is BG-WS5's slides viz-subpath migration."*
- `BH/coordination/asks-and-consumes.md:25` — *"BG-WS5 owns the viz-subpath migration with slides as the named consumer … if WS5 deletes/renames either, the slides migration is BG-WS5's, not BH-B7's. Confirm BG-WS5 carries it."* → **CONFIRMED: it carries it as a re-baseline; no key drops in the specced waves.**
- `BH/PLAN.md:106` (B7 cross-ref) + `:116` (residual #1) — the post-WS12 re-baseline is the agreed home for any surfaced key delta + the human PUBLISH-vs-INTERNAL call.

**The two named viz-subpath consumers (≥2, read-only grep, recorded in `consumer-constellation.md`):**
1. **slides** — `/fourier-field`×4, `/constellation`×2 (visual re-baseline; no `/api`, no `--ring`).
2. **atlas** (bbnf-buddy/EcfApparatus) — `/constellation`×1, `/dot-flow-field`×1 (visual re-baseline).

These two are the ≥2 consumers the lock names; a third synthetic appears as the gate self-test bite.

---

## 2. WHY IT CANNOT GO SILENT — the LIVE tripwire (already landed + GREEN)

The fail-closed classification gate is NOT a thing to build — it LANDED in the BH [C] concurrent band (task #53, B2.1-mech) and runs GREEN today:

- **`scripts/lib/subpath-policy.mjs`** — the SINGLE-SOURCE classification. EVERY `src/components/{ui,custom}/<dir>` + `src/composables/<subtree>` MUST carry an explicit `PUBLISH | INTERNAL | CURATED` entry. A dir on disk with NO entry = HARD ERROR (`classifyAll` collects `unclassified`; the generator exits 1). A classified dir absent from disk = `stale` (reported).
- **`proof:subpath-classify`** (`scripts/proof-subpath-classify.mjs`, `gates.mjs:377`, tags `["local","ci"]`) — the gate over it. Three RAN cases, verified live this pass:
  - **C1 real** → exit 0, `failClosed=true`, `EXACT_REPRODUCTION=true`, `fidelityFailed=0` (the regen reproduces `package.json` exports + `typesVersions` with ZERO add/drop/mismatch).
  - **C2 `--inject-unclassified`** → exit 1 (a synthetic BG-added dir with no class is a HARD ERROR — the fail-closed teeth).
  - **C3 `--break-fidelity`** → exit 1 (a vanished hand-mapped source flags — the fidelity teeth).
- **What C1-real catches FOR FREE:** the moment WS6's `siri-island/` + `siri-waveform/` (or any novel WS5 dir) land on disk WITHOUT a `CUSTOM_CLASS` entry, **C1 goes RED in `--run full`** (real mode, not inject) — `proof:subpath-classify` is the live forcing-function that DEMANDS the human PUBLISH-vs-INTERNAL classification before the surface can regen.

**The one gap this gate does NOT cover:** it catches a NOVEL dir and a STALE entry, but it does not, on its own, force a CONSUMER-MIGRATION DISPOSITION when a *consumed* key drops. That is Lock-1 below.

---

## 3. THE CORRECTED APPROACH — two locks at two phases

### Lock-1 (WS5 build-time) — the viz-key-disposition completeness clause

**Owner gate:** EXTEND `proof:crossrepo-asks` in place (it already owns the no-silent-drop completeness law W1 + the per-ask disposition W2 — `scripts/proof-crossrepo-asks.mjs:12-19,61`). NO new gate; NO new key.

**The clause (`W4-viz-subpath-disposition`):**
```
For each viz subpath key K in VIZ_SUBPATH_KEYS
  (= {constellation, fourier-field, concentric, paper-grid, dot-flow-field,
      dot-matrix, goo-blob, goo-dot-matrix, aurora, fourier-math}):
  consumed(K) := K ∈ the consumer-constellation viz-consumer roster
                 (constellation→{slides,atlas}; fourier-field→{slides};
                  dot-flow-field→{atlas})
  IF consumed(K):
    EITHER  K resolves to a PUBLISH dir in subpath-policy.mjs CUSTOM_CLASS
            (key PRESERVED  →  disposition row = "visual re-baseline,
             key-preserved, owner BG-WS5")  ← born-GREEN at HEAD
    OR      K is absent/stale (key DROPPED/RENAMED)  →  a matching
            consumer-migration ROW MUST exist in
            docs/tranches/BH/coordination/asks-and-consumes.md naming the
            consumer(s) + the import-re-point ask + owner BG-WS5.
  ELSE (un-consumed): a drop needs only a recorded RETIRE note (no ask).
```
- **Born-GREEN at HEAD** (every consumed key present; the dispositions are the recorded "visual re-baseline" rows already in `consumer-constellation.md:140-154`). It REDs ONLY if a WS5 wave drops/renames a CONSUMED key without flipping its disposition to an import-re-point ask in the roster. → **A WS5 key-drop CANNOT land without simultaneously recording the disposition that B7 will issue. The break can no longer fall between the tranches.**
- **The exact wave that proves it during build:** `BG.W-VIZ-DEMIGRATE` (M4) — the wave that touches `/constellation` + `/fourier-field`. Its gate set co-runs the extended `proof:crossrepo-asks` `W4`; with the demigrate landed key-preserving, `W4` asserts the "visual re-baseline, key-preserved" disposition for both keys with **slides + atlas as the ≥2 named consumers**.
- **Self-test bite:** a synthetic VIZ_SUBPATH_KEYS member dropped from a stubbed policy map with NO roster row MUST RED (the third, synthetic consumer-case proving the clause is not vacuous).

### Lock-2 (post-WS12 re-baseline) — the HUMAN PUBLISH-vs-INTERNAL classify + mechanical regen

The fail-closed `proof:subpath-classify` C1-real (§2) is the tripwire; the human call is the response. **Pre-derived recommendations** (read off the WS6 wave file lists so the human call is a confirm, not a research task):

| Novel dir (WS5/WS6) | Recommended class | Why (from the wave spec) |
|---|---|---|
| `siri-island/` | **PUBLISH** | `bg-build-map.md:271` lists `src/subpaths/siri-island.ts` + `api/index.ts` explicitly → an intentional subpath. |
| `siri-waveform/` | **INTERNAL** | `bg-build-map.md:277-281` lists NO subpath file; it is a WebGL2 render leaf composed BY `SiriIsland` (the `goo-filter`/aurora-shader internal-leaf precedent). **HUMAN to confirm** — WS6 could decide the waveform is independently useful → flip PUBLISH. This single flip is the one genuine residual call. |
| any WS5 viz dir | (none expected) | WS5 adds NO new dir; if one appears, classify against its wave's file list (subpath-file present → PUBLISH, else INTERNAL). |

**The mechanical re-baseline procedure (BH B2.1-swap, [WS12]):**
1. Add the confirmed `CUSTOM_CLASS` entries to `scripts/lib/subpath-policy.mjs` (siri-island=PUBLISH, siri-waveform=INTERNAL/confirmed).
2. Re-run `regen-exports.mjs` against the LANDED post-WS12 surface → regen `package.json` exports + `typesVersions` (captures WS6 +1 siri-island subpath, WS5 viz substrate changes — DERIVED, never the 4.2.0 snapshot).
3. Re-run `regen-api-migration.mjs` → re-baseline the 203-row `/api` fold map against the post-WS12 symbol set.
4. Glob-swap + delete `src/subpaths/` (79 files); re-author `flatten-subpath-types.mjs`.
5. Re-pin `proof:subpath-enumeration` (`gates.mjs:910`) — ENUM-COMPLETE / NO-ORPHAN-CHUNK / BATCH-EQUIV over the post-WS12 `dist/`.
6. `npm run gates:emit-ci` → assert `proof:gen-ci-fresh` GREEN (a drifted `ci.yml` refuses to publish).
7. `verify-export-types` post-build GREEN (the binding symbol-set proof on real dist).

---

## 4. THE ORDERING CONSTRAINT (the load-bearing answer)

The DAG edges that make the seam impossible to break, in order:

```
WS5 (viz)  ─ Lock-1 fires HERE (proof:crossrepo-asks W4 at BG.W-VIZ-DEMIGRATE)
   │          → any consumed-key drop records its disposition AT WS5 build,
   │            never deferred to the cut → no gap between BH-B7 and BG-WS5
   ▼
WS6 (siri) ─ siri-island/ + siri-waveform/ land on disk
   │          → proof:subpath-classify C1-real turns RED (novel unclassified dir)
   ▼
WS7…WS12 (capstone)
   ▼
POST-WS12 RE-BASELINE (BH B2.1-swap + B2.2 /api-fold)  ── Lock-2 fires HERE
   │   HARD edge: runs STRICTLY AFTER max(last WS5 viz wave, last WS6 siri wave,
   │              WS12 capstone) AND STRICTLY BEFORE BG.W-CUT's --run full
   │   → human classifies the surfaced dirs; regen; re-pin; re-emit ci.yml
   ▼
BH-B7 (W-api-ask-roster) at the cut, AFTER B2.2
   │   → its cross-reference clause CONFIRMS BG-WS5 carried the viz migration
   │     (reads the recorded dispositions; issues ZERO viz ask because keys preserved)
   ▼
BG.W-CUT  ── --run full includes {proof:subpath-classify (C1 EXACT_REPRODUCTION),
   │           proof:crossrepo-asks (W4 dispositions complete),
   │           proof:subpath-enumeration (re-pinned), verify-export-types} = the final net
   ▼
B4f (CLAUDE.md delete) — absolute last act
```

**The two HARD edges to encode in the build engine (`bg-bh-execute.wf.js` ordering):**
1. **`Lock-1 @ WS5`** — the `proof:crossrepo-asks` `W4` clause is part of `BG.W-VIZ-DEMIGRATE`'s gate set (fires at the WS5 build, not at the cut).
2. **`RE-BASELINE after WS5 ∧ WS6 ∧ WS12, before CUT`** — the regen/classify/enumeration-re-pin/ci-re-emit is a single ordered wave (BH B2.1-swap) gated on all three landings; it is the ONLY window where the human PUBLISH-vs-INTERNAL call happens, and it is upstream of `--run full`.

---

## 5. ≥2 CONSUMERS · VERIFYING π · THE PROVING WAVE

- **≥2 consumers (Lock-1):** slides (`/constellation`×2, `/fourier-field`×4) + atlas (`/constellation`×1, `/dot-flow-field`×1) — both viz-subpath consumers, both owed only a visual re-baseline; the gate's synthetic dropped-key case is the 3rd bite.
- **≥2 consumers (the classification mechanism):** `scripts/lib/subpath-policy.mjs` feeds BOTH `libraryEntries()` (`vite.library.ts`) AND `regen-exports.mjs` — the single-source-feeds-two structural assert already locked by `proof:subpath-classify`.
- **Verifying π (device-free + post-build, no Metal/Safari capture owed for G7 itself):**
  - `proof:subpath-classify` C1/C2/C3 RAN-cases — device-free, GREEN today; RED on a novel unclassified dir.
  - `proof:crossrepo-asks` `W4` — device-free; born-GREEN; REDs on an undisposed consumed-key drop.
  - `proof:subpath-enumeration` re-pinned + `verify-export-types` — the binding POST-BUILD symbol-set proofs (owed at B2.1 after the real post-WS12 build).
  - The viz VISUAL re-baseline π is **inherited from WS5's own gates** (`BG.W-VIZ-DEMIGRATE` "crisp DPR arc" + `proof:viz-resize-upload-only` + the previews-render gate) — G7 mints NO new capture.
- **The exact wave(s) that prove it during build:**
  - WS5: **`BG.W-VIZ-DEMIGRATE`** proves Lock-1 (disposition completeness with slides+atlas named).
  - Post-WS12: **BH `B2.1-swap`** proves Lock-2 (classify siri dirs + regen + re-pin + `verify-export-types`).
  - Cut: **`BG.W-CUT`** `--run full` is the final net (all four gates above co-run siblings-absent).

---

## 6. RESIDUAL (what a develop agent still owes — bounded, ~15%)

1. **Write the `proof:crossrepo-asks` `W4-viz-subpath-disposition` clause** (≈40 LOC + 1 self-test bite) — the only NEW gate code; born-GREEN, with the synthetic dropped-key bite.
2. **The ONE genuine HUMAN call:** confirm `siri-waveform` = INTERNAL (recommended) vs PUBLISH at the post-WS12 re-baseline — a 5-minute read of the landed WS6 dir against its wave spec, not a research task. siri-island=PUBLISH is already explicit.
3. **Wire the two HARD ordering edges** into `bg-bh-execute.wf.js` (Lock-1 in WS5's gate set; the RE-BASELINE wave gated on WS5∧WS6∧WS12). These are schedule edges, not new logic.
4. **`buildPhaseDeferred`:** the binding `verify-export-types` + `proof:subpath-enumeration` re-pin require the real POST-WS12 `npm run build` — deferred by necessity, but de-risked: a mechanical re-run of proven scripts (`regen-exports.mjs` proved 96/96 EXACT_REPRODUCTION; `regen-api-migration.mjs` proved 203-row union-complete) + one ≈40-LOC clause + one confirm-call. No design risk remains.
