# BI.W-RATCHET-GROWTH — the ratchet reds the GROWING wave (GF5 disease cure)

Band B0 (cut-blocker mechanism). Born-RED at HEAD (the contract accepts self-grandfathered growth).

## Mandate

- **FAM-1 mechanism wave** (registry §12 note): "the ratchet contract must make GROWTH red the growing wave (not book a phantom future drain) — the GF5 'ratchet normalizes regrowth' disease."
- **H-4 / GF5**: files drained at 0.7/F6.5/W-COLOCATE re-grew past 500 by later BG waves; the ratchet "normalizes regrowth" — a growing wave rides green by adding its own baseline row + a (possibly phantom) carve-successor.
- **FAM-11**: the ratchet-growth contract is named in the gate-hardening batch.

## Design

The disease: `RATCHET_BASELINES` grandfathers a >500 file at its frozen count, and the BG.W-GOD-MODULE-STRUCTURAL contract REQUIRES a new grandfathered row to carry a companion carve-successor id. But a wave can (a) grow a file past 500 in its OWN diff and (b) add its OWN baseline row + a carve-successor that never lands (the phantom, cured on-disk by `BI.W-STYLE-REDRAIN`) — so growth is "normalized": the growing wave rides green by booking a future drain.

Cure (a contract change to the EXISTING gates `proof:no-god-module` + `proof:encapsulation`, NOT a new gate): a baseline row may exist ONLY for a file that was already >500 at the TRANCHE BASELINE, and it may only SHRINK. A wave whose diff INTRODUCES a new >500 file (a file ≤500 at tranche start crossing the bound) REDs IMMEDIATELY — no self-added baseline row can grandfather wave-introduced growth. The mechanism: a frozen `TRANCHE_BASELINE_MANIFEST` (the set of files >500 at tranche start + their frozen counts) is the ONLY legal source of baseline keys; a baseline key NOT in the manifest, or a manifest key whose live count EXCEEDS its frozen baseline, REDs. GROWTH reds the growing wave; drains (shrink or delete a manifest key) are the only legal ratchet moves.

Clean: this makes the `RATCHET_BASELINES == {}` cut-precondition monotonic-by-construction — a wave cannot re-inflate the map, only drain it.

## Work

- `scripts/proof-no-god-module.mjs` — add the `TRANCHE_BASELINE_MANIFEST` freeze (the set of legal baseline keys + frozen counts, pinned at BI start = the current over-500 non-shader set). RED any RATCHET_BASELINES key ABSENT from the manifest (a wave-introduced grow) OR any live count EXCEEDING its frozen baseline (a grandfathered file that grew MORE).
- `scripts/proof-encapsulation.mjs` — mirror the growth-red clause on its ratchet-row check (E1/C1, `proof-encapsulation.mjs:1288-1295`): a NEW encap ratchet row not in the manifest REDs.
- `scripts/proof-no-god-module.mjs` header — record the CONTRACT: baseline keys are frozen at tranche start, may only shrink/delete; a new key REDs the introducing wave.
- Self-test additions (both gates): a synthetic diff adding a baseline key NOT in the manifest REDs; a synthetic diff raising a manifest key's live count above its frozen baseline REDs; a shrink/delete of a manifest key GREENs.

## Acceptance

Gate: **`proof:no-god-module` + `proof:encapsulation` (growth-red clause)** — GREEN at close; the clause is BORN-RED via its self-test (the current contract ACCEPTS a self-added baseline row for wave-introduced growth — the synthetic "grow-and-self-grandfather" bite fails today, greens at the manifest freeze).

Clauses:
- R1 baseline keys ⊆ `TRANCHE_BASELINE_MANIFEST` (no wave-introduced key).
- R2 every manifest key's live count ≤ its frozen baseline (grandfathered files only shrink).
- R3 the contract recorded in the gate header (frozen-at-start, shrink-or-delete-only).
- Self-test bites: grow-and-self-grandfather → RED; regrow-past-baseline → RED; drain → GREEN.

## π/DELTA

None — device-free gate-contract change; zero pixel change.

## Obligations

- **Sequencing**: the manifest is FROZEN at the BI start snapshot; the drains (`BI.W-STYLE-REDRAIN`, `BI.W-ENCAP-REDRAIN`, D-DOCK, D-VIZ) shrink/delete manifest keys toward `RATCHET_BASELINES == {}` (the B10 close-state). This wave installs the mechanism that keeps them from re-inflating.

## Dispositions

- Terminalizes the **GF5** ("ratchet normalizes regrowth") disease at the CONTRACT level — the companion mechanism to `BI.W-STYLE-REDRAIN`'s phantom-successor on-disk cure. No re-book: growth reds the growing wave from BI forward.
