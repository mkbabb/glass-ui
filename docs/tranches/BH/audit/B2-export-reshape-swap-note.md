# BH.B2-export-reshape — the FINAL pre-cut package.json swap (execution note)

Owner wave: `BH.B2-export-reshape` (B2.1-swap + B2.2 + B2.3 + B2.6 — the single package.json-deps writer, after WS5∧WS6∧WS12, before `BG.W-CUT`). Executed via the landed regen mechanism (`c98ac8c8`, EXACT_REPRODUCTION); the exports map was NEVER hand-edited.

## What landed (my file scope)

| File | Change |
|---|---|
| `scripts/lib/subpath-policy.mjs` | dropped `api` from `CURATED` + emptied `TYPES_OVERRIDE` (the single-source classification — the `/api` drop) |
| `scripts/regen-exports.mjs` | fixed the `--write` guard: it gates on SOURCE INTEGRITY (classified + fidelity) only, NOT on `EXACT_REPRODUCTION` — the prior `exit !== 0` guard deadlocked the B2.1-swap (a dropped `/api` makes EXACT_REPRODUCTION false pre-write, so the strict guard would never let the drop land). Matches the header's documented intent. |
| `package.json` | (a) `exports`/`typesVersions` re-pinned by `regen-exports --write` → `./api` + `typesVersions.api` DROPPED (94→93 export keys); (b) peer/dev bumps below |
| `vite.library.ts` | removed the hand-listed `api:` build entry (coupled: `proof:subpath-enumeration` BATCH-EQUIV requires `libraryEntries()` keys ≡ exports keys; a stale `api:` entry would emit an orphan `dist/api.js` + red the gate) |
| `package-lock.json` | `npm install` re-resolved the advanced spine (kf 5.2.0 + value 3.1.0) |

## The peer swap — the value floor RECONCILE (drift-driven)

The plan (row 462 / CHANGELOG, authored ~2026-07-05) said **kf `^5.1.0`** + **value floor = keyframes' own value dep** on the assumption kf 5.1.0 was latest (deps value `^1.2.0`) and value-latest was ~1.2.0. The npm registry DRIFTED since:

- **value.js latest is now `3.1.0`** (1.2.0 → 2.0.0 → 3.0.0 → 3.1.0, real majors).
- **keyframes.js latest is now `5.2.0`, and kf 5.2.0 deps value `^3.1.0`** (verified: `npm view @mkbabb/keyframes.js@5.2.0 dependencies` + the READ-ONLY sibling `~/Programming/keyframes.js/package.json`). kf did a value major bump (1→3) across the 5.1.0→5.2.0 minor.

`proof:peer-conformance` (`["release"]`, the binding close gate) demands the value peer ADMIT registry-latest (live `3.1.0`). No `^1.x` range can — so the DO's own requirement ("`proof:peer-conformance` GREEN") FORCES the value floor past 1.x. The CHANGELOG mandate — "the value peer floor rides to the single version keyframes' own value dep pins; no straddle survives" — applied to the CURRENT constellation (kf 5.2.0 → value `^3.1.0`) yields a single, honest, no-straddle range:

- **`@mkbabb/keyframes.js` peer + dev: `^5.0.0` → `^5.2.0`.**
- **`@mkbabb/value.js` peer + dev: `^1.0.0` → `^3.1.0`.**

Installed spine (lockfile): **kf 5.2.0, value 3.1.0**. Singleton identity: installed kf 5.2.0 value dep `^3.1.0` ⊆ glass-ui value peer `^3.1.0` — coherent, no dual-install.

### Empirical safety of the value 1→3 advance

- All 23 symbols glass-ui imports from `@mkbabb/value.js` EXIST in value 3.1.0's dist (verified against the READ-ONLY sibling). (The three "missing" names — `cssToOklch`/`oklchStopToHex`/`oklchToLinear` — are glass-ui's OWN, re-exported from its `composables/color` leaf, NOT value.js imports.)
- `npm run typecheck` — CLEAN against value 3.1.0 + kf 5.2.0.
- `npm run build` — CLEAN (exit 0, both the vite arm + the vue-tsc dts arm).
- `proof:blob-color-equivalence` — 19/19 pass under value 3.1.0 (the value CPU-port color math is stable).
- `proof:single-color-core`, `proof:blob-value-free`, `proof:motion-value-free`, `proof:color-acyclic` — PASS.

### Deviation from the literal "kf ^5.1.0"

The DO said "kf ^5.1.0". Set to **`^5.2.0`** instead — because kf `^5.1.0` is INTERNALLY INCOHERENT with value `^3.1.0`: kf 5.1.0 deps value `^1.2.0`, kf 5.2.0 deps value `^3.1.0`, so a `^5.1.0` range spans two value majors and a consumer resolving kf 5.1.0 would dual-install value against glass-ui's value `^3.1.0`. `^5.2.0` is the coherent singleton floor (kf 5.2.0 ⇒ value ^3.1.0). The orchestrator's OWN verification method ("verify with the sibling's package.json") points to kf 5.2.0 / value ^3.1.0; the `^5.1.0` number is the stale plan-time floor. `proof:peer-conformance` is indifferent between `^5.1.0`/`^5.2.0` (both admit latest 5.2.0); `^5.2.0` is the honest, no-consumer-hazard choice.

## Gate results (all DO-named GREEN)

| Gate | Result |
|---|---|
| `npm run build` | exit 0 (vite + vue-tsc dts) |
| `verify-export-types` | PASS — "All package export targets and type resolutions are valid." |
| `proof:subpath-enumeration` | PASS — 88 exports ≡ 88 libraryEntries, ENUM-COMPLETE + BATCH-EQUIV YES |
| `proof:peer-conformance` | PASS — kf `^5.2.0`✓ value `^3.1.0`✓ singleton ^3.1.0⊆^3.1.0✓ destraddled✓ |
| `diff -r dist/styles` (vs pre-build) | EMPTY (styles byte-identical; no styles surface touched) |
| `proof:subpath-classify` | PASS — EXACT_REPRODUCTION=true, failClosed, fidelity, C2/C3 teeth |
| `npm run typecheck` | CLEAN (exit 0) |
| `proof:resolution` / `proof:vueuse-free-root` / `proof:external-payload` / `proof:lineage-probe` / `proof:peer-optional` | PASS (coupled re-verify) |

`verify-siblings-intact --quiet` GREEN before AND after (no sibling moved; sibling reads were READ-ONLY).

## Residuals / owed follow-ups (out of THIS wave's file scope)

1. **`goo-blob → blob` FULL rename — NOT done here.** The subpath `/goo-blob` STAYS (the on-disk dir is still `src/components/custom/goo-blob/`; the regen keeps `/goo-blob` fail-closed). The component/dir/CSS/types rename spans `src/components/custom/**` — OUT of the B2-export-reshape file scope. The regen surface follows the disk: when the leaf/rename agent renames the dir + updates the `CUSTOM_CLASS` key, re-run `regen-exports --write` and the `/goo-blob → /blob` export flips automatically.
2. **`src/api/**` PHYSICAL delete (B2.2 "delete-drains") — NOT done here.** The `/api` EXPORT is dropped (package.json + typesVersions + the vite entry). `src/api/index.ts` + `types-extra.ts` remain on disk (out of file scope); `vue-tsc` therefore still emits an orphan `dist/api/*.d.ts` (unreferenced by any export — harmless; dist is gitignored). The api-fold agent owns the physical `rm src/api/**` (and the corresponding `files`/dist cleanup).
3. **`proof:peer-conformance` PINNED offline-mirror is STALE — gate-owner sync owed.** `proof-peer-conformance.mjs`'s `PINNED_LATEST` (`value 1.2.0` / `kf 5.1.0`) + `PINNED_KEYFRAMES_VALUE_DEP` (`^1.2.0`) are the offline fallback. They no longer match the live registry (value 3.1.0 / kf 5.2.0 / kf-value-dep ^3.1.0). ONLINE the gate reads live (GREEN with value ^3.1.0). A network-LESS runner would fall back to the stale pins and FALSE-red value ^3.1.0. Sync to `value 3.1.0` / `kf 5.2.0` / `^3.1.0` (gate file — outside this wave's scope). The networked close is GREEN as-is.
4. **`proof:constellation-spine` — born-RED, unchanged status.** `["local"], sibling:true`, born-RED at HEAD (its `COHERENT_VALUE = "0.13.0"` pre-1.0 pin means glass-ui's own value dep was already red before this wave; 19 violations, 17 from foreign siblings). Skips in the siblings-absent close. Owned by the "Batch-5 fleet adopt" (W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE), the authorized verdict-flipper. This wave adds clause-8 to it (value peer ≠ admit-1.0.0) — irrelevant to the cut (the gate skips). NOT fixable by any modern value range (peer-conformance wants admit-3.1.0, spine wants admit-0.13.0 — irreconcilable until the fleet-adopt rewrites the spine gate).
5. **`./styles/theme` ATLAS-N C4 subpath — NOT added.** Out of the narrowed DO (which named the `/api` drop + peer bumps) and would non-empty the `diff -r dist/styles` gate the row requires EMPTY. `dist/styles/theme/` + `theme.css` already exist in the build; exposing the standalone `./styles/theme` export is a styles-surface add owed to a separate wave.
6. **ci.yml re-emit (G4) — NOT owed by this wave's changes.** No gate TAG changed here (the gate registry `gates.manifest.mjs` is untouched), so `.github/workflows/ci.yml` is unaffected by this swap. (ci.yml shows as modified in the tree by OTHER close agents.)

## Paint re-verification flag

The value 1→3 advance is type-safe + color-math-equivalent per `proof:blob-color-equivalence` (device-free CPU port), but a runtime OKLCh/OETF refinement between value 1.2.0 and 3.1.0 could subtly shift painted color. The binding catcher is the close's `--run ship` Metal π + W-REFLECT3 gestalt (device-free gates + typecheck cannot see per-engine paint). Named here so the paint close re-verifies the warm-cream/no-gray/dark-material registers against the advanced value spine.
