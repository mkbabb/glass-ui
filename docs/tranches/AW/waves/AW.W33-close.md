# AW.W33 - Gate-fleet close + READMEs + FINAL (LAST)

## State

**Name**: W33 - Gate-fleet close + READMEs + FINAL (LAST)
**Opens after**: ALL bands (W0-W32) — this is the close wave; it registers every AW gate (the four arcs + convergence + gate-pattern + orphan-prune + styling-assay + the GLASS-ATOMS band W22-W26 + the NEW-SCOPE band G W28-W32) and certifies the matrix green
**Agents**: 2 parallel (gate-fleet + READMEs/π-lane), then a serial orchestrator close
**Hard gate**: `proof:aw-final` green — the full AW matrix is green over a clean tree, `gates:verify-ci` green (no hand-listed gate drift), the four research-backed READMEs exist + cite their digest, the overfitting audit tallies zero orphans, the π visual-runtime lane ran (or recorded the build-verification floor + the re-probe obligation), and `FINAL.md` cites a green run-id per wave.
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, the tranche closes honestly: every AW `proof:*` gate is registered in `scripts/gates.mjs` with its `{local,ci,release,sibling}` tag (NOT hand-listed in `ci.yml`), `proof:aw-final` runs the full matrix green over a clean tree, `gates:verify-ci` fails closed on any drift, the four research-backed READMEs (dock, aurora, blob, constellation) ship and cite their digest, the overfitting audit confirms zero orphans (W19's executed ledger + the glass-atoms band's ≥2-consumer surfaces + the band-G demo-internal/restyle surfaces are the input), the π visual-runtime lane swept the visual-change waves (now including the band-G demo-nav/configurator/carousel/animation/lighthouse surfaces), and `FINAL.md` cites a green run-id per wave (inv-27 green-means-green). This is the close ceremony D-11 promised and the convergence digest flagged as having no wave file.

## 3. Scope

1. **Gate-fleet registration.** Register every AW gate minted across W0-W32 in `scripts/gates.mjs`'s `GATES` manifest, each with its `{local,ci,release,sibling}` tag — NOT hand-listed in `ci.yml`. The AW gate set: `proof:aw-w0-reground` (W0), `proof:dock-animation-live` + `proof:spring-tokens-synced` (W1/W2), `proof:dock-layering-polish` (W3), `proof:aurora-tensor-field` + the painterly arc gates (W4), `proof:aurora-oklch-interp` + `proof:aurora-derive-gamut` (W5), `proof:aurora-atoms-roundtrip` (W6), `proof:aurora-wgsl-equivalence` + `proof:aurora-backend-fallback` (W7), `proof:aurora-interaction-prm` (W8), `proof:blob-smin-normalized` + `proof:blob-gradient-unit-length` + `proof:blob-spec-premult` (W9), `proof:blob-interaction-prm` (W10), `proof:blob-color-equivalence` + `proof:blob-mood-resolved` + `proof:single-color-core` (W11), `proof:glass-panel-tiers` (W12), `proof:affordance-contrast` (W13), `proof:no-god-module` (W14), `proof:deck-progress-rail` (W16), `proof:constellation-substrate-single` (W17), `proof:input-invalid-aria` (W18), `proof:orphan-resolved` (W19), `proof:styling-hygiene` (W20), the GLASS-ATOMS band: `proof:glass-material-unified` (W22), `proof:glass-material-sota` (W23), `proof:glass-card-tiers` (W24), `proof:primitive-affordance` (W25), `proof:reka-binding-idiom` (W26), and the NEW-SCOPE band G: `proof:demo-dock-nav` + `proof:storybook-complete` (W28), `proof:configurator-glass-atoms` (W29), `proof:carousel-glass-atoms` (W30), `proof:animation-coherence` + `proof:design-md-current` + `proof:naming-consistency` (W31), `proof:lighthouse-demo` (W32). The authoritative gate names are the WAVE-FILE ids (per the harden-fixlist Cluster A — the `AW.md §2` table names are reconciled to these). `gates:verify-ci` confirms `ci.yml` carries no gate the manifest does not, and the manifest carries no gate `ci.yml` skips.
2. **`proof:aw-final`** — the aggregate close gate (mirrors `proof:au-final`; AV shipped at the 3.3.0 cut WITHOUT its own aggregate gate — `proof:av-final` is named in the `gates.mjs:285` retirement note but was never minted — so AW restores the close-gate ceremony). Run the full local matrix (`node scripts/gates.mjs --run local`) green over a clean `git status`; assert `gates:verify-ci` green; assert the four READMEs exist; assert the overfitting audit recorded zero orphans; assert the π-lane artefact (or the build-verification floor) exists; assert `FINAL.md` cites a run-id per wave. Register `"proof:aw-final"` in `package.json`. Add it to the `gates.mjs` manifest tagged `{release}` (it is the release-set close gate).
3. **The four research-backed READMEs.** Author `src/components/custom/dock/README.md`, `aurora/README.md`, `goo-blob/README.md`, `constellation/README.md` — each citing the research digest it lands (`dock-animation-digest`, `aurora-digest`/`aurora/PATH-FORWARD.md`, `blob-digest`/`blob/PATH-FORWARD.md`, `frontend-convergence-digest §convergence`). Each README documents the component's contract + the SOTA technique it realizes + the gate that freezes it.
4. **The overfitting audit.** Run the canned overfitting audit (`docs/audits/overfitting-audit.md`): every `src/` artefact has ≥2 sites OR is exported OR is a private demo helper; tally PROPS; confirm zero orphans (W19's executed ledger + the glass-atoms band's new surfaces — `--card-spacing`/`CardAction`/`--radius-field`/the `glass-material` mixin — and the band-G surfaces — the demo-dock-nav shell, the restyled Configurator/carousel, the DESIGN.md currency — are the input; the band-G demo-nav is DEMO-INTERNAL and the configurator/carousel restyles are existing-component refactors, NOT new speculative primitives, so they audit as demo-private OR existing-surface, not as a ≥2-consumer mint; the spot-verified candidates are either kept-with-≥2 or removed). Write the audit verdict to `audit/W33-overfitting.md`.
5. **The π visual-runtime lane.** Sweep the visual-change waves (W1-W3 dock, W4-W11 aurora/blob, W12-W13 component, W16-W17 convergence, W20 demo controls, W22-W26 glass-atoms, W28-W32 band-G demo-nav/storybook/configurator/carousel/animation/lighthouse): ≥3 viewports (375×667, 1280×800, 1440×900), ≥5 animation frames per state-toggle, WCAG-AA contrast-vs-background, a per-story consumption sweep. If browser automation is unavailable, record the build-verification floor + the named re-probe obligation (the tooling-contingency clause). Artefact: `audit/W33-pi-lane.md` + screenshots under `audit/screens/`.
6. **`FINAL.md`** — the close report citing a green run-id per wave (inv-27), the disposition crosswalk (every `AW.md §0` D-row → its wave → its green gate, including the band-G D-15+ rows), and the publish-hinge note (3.4.0 → npm is USER-DOMAIN, confirm-first).

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- `gates:verify-ci` reports drift that is NOT a missing manifest entry (a gate exists in `ci.yml` with no manifest home AND no wave authored it — a phantom gate) — the gate-fleet is inconsistent with the wave set, escalate;
- `proof:aw-final` cannot go green because a band gate is genuinely RED on a clean tree (a wave did not actually close) — this is not a close-wave-local failure; halt and re-dispatch the failing band, not the close;
- the π-lane sweep finds a born-RED visual regression on a wave that gated green (a gate passed but the visual is wrong — a gate-vs-runtime gap, the exact class AW.W1 exists to close) — escalate the implicated wave, do not paper over it in the close.

## 4. File Bounds

| File | Access |
|---|---|
| `scripts/gates.mjs` | modify (register the AW gate set in the `GATES` manifest) |
| `scripts/proof-aw-final.mjs` | create |
| `package.json` | modify (register `proof:aw-final`) |
| `src/components/custom/dock/README.md` | create |
| `src/components/custom/aurora/README.md` | create |
| `src/components/custom/goo-blob/README.md` | create |
| `src/components/custom/constellation/README.md` | create |
| `docs/tranches/AW/audit/W33-overfitting.md` | create |
| `docs/tranches/AW/audit/W33-pi-lane.md` | create |
| `docs/tranches/AW/audit/screens/` | create (the π-lane screenshots) |
| `docs/tranches/AW/FINAL.md` | create |
| `docs/tranches/AW/PROGRESS.md` | modify (flip every wave row to its green run-id) |

Do NOT touch: `docs/precepts/`, any band-owned `src/*` surface (the close wave registers + documents + certifies; it does not edit a component — a README is the only `src/`-tree write, and it is docs), `ci.yml` (the gate-fleet is registered in the MANIFEST; `ci.yml` keeps its explicit per-step visibility and is VERIFIED against the manifest by `--verify-ci`, not hand-edited to add gates).

## 4a. Disjointness

Two parallel units + a serial close:

- **AW.W33.a** owns the gate-fleet — `scripts/gates.mjs`, `scripts/proof-aw-final.mjs`, the `package.json` registration.
- **AW.W33.b** owns the READMEs + the audits + the π-lane — the four `README.md`, `W33-overfitting.md`, `W33-pi-lane.md`, the screens.
- The orchestrator close owns `FINAL.md` + the `PROGRESS.md` run-id flips (after a + b land).

No two units share a `modify` path. Unit b's overfitting audit reads W19's executed ledger + the glass-atoms band's surfaces + the band-G demo-internal/restyle surfaces (read-only). Sequence: a + b parallel; the orchestrator close serializes after both (it cites a's green matrix + b's READMEs/audit in `FINAL.md`).

## 5. Agent Units

### AW.W33.a The gate-fleet registration + proof:aw-final

- Goal: every AW gate registered in the `gates.mjs` manifest with its `{local,ci,release,sibling}` tag, `proof:aw-final` runs the full matrix green over a clean tree, and `gates:verify-ci` fails closed on drift.
- Mechanism: add each AW gate id (wave-file names, per Cluster A) — including the GLASS-ATOMS band (`proof:glass-material-unified` (W22), `proof:glass-material-sota` (W23), `proof:glass-card-tiers` (W24), `proof:primitive-affordance` (W25), `proof:reka-binding-idiom` (W26)) and the NEW-SCOPE band G (`proof:demo-dock-nav` + `proof:storybook-complete` (W28), `proof:configurator-glass-atoms` (W29), `proof:carousel-glass-atoms` (W30), `proof:animation-coherence` + `proof:design-md-current` + `proof:naming-consistency` (W31), `proof:lighthouse-demo` (W32)) — to the `GATES` array with its tag; author `proof:aw-final` aggregating the local matrix + the `gates:verify-ci` green + the four-README/overfitting/π-lane/FINAL existence checks; register it `{release}`. Run `proof:all` (the local filter) + `gates:verify-ci` green.
- Files: `scripts/gates.mjs`, `scripts/proof-aw-final.mjs`, `package.json`.
- Sub-gate: `npm run proof:all` green; `npm run gates:verify-ci` green (no drift); `npm run proof:aw-final` green over a clean `git status`.

### AW.W33.b The four READMEs + overfitting audit + π-lane

- Goal: the four research-backed READMEs ship + cite their digest, the overfitting audit tallies zero orphans, and the π lane sweeps the visual-change waves (or records the build-verification floor).
- Mechanism: author the four READMEs (each citing its digest + the gate that freezes it); run the overfitting audit against W19's executed ledger + the glass-atoms band's new surfaces + the band-G demo-internal/restyle surfaces; run the π-lane sweep (≥3 viewports, ≥5 frames, AA contrast, per-story sweep) or record the contingency floor.
- Files: the four `README.md`, `W33-overfitting.md`, `W33-pi-lane.md`, the screens dir.
- Sub-gate: the four READMEs exist + each cites a named digest; `W33-overfitting.md` records zero orphans; `W33-pi-lane.md` records the sweep (or the floor + the re-probe obligation).

## 6. Hard Gate

1. **Gate-fleet registered (no hand-listed gate).** Every AW gate minted W0-W32 — the four arcs + convergence + gate-pattern + orphan-prune + styling-assay + the GLASS-ATOMS band (`proof:glass-material-unified` (W22), `proof:glass-material-sota` (W23), `proof:glass-card-tiers` (W24), `proof:primitive-affordance` (W25), `proof:reka-binding-idiom` (W26)) + the NEW-SCOPE band G (`proof:demo-dock-nav` + `proof:storybook-complete` (W28), `proof:configurator-glass-atoms` (W29), `proof:carousel-glass-atoms` (W30), `proof:animation-coherence` + `proof:design-md-current` + `proof:naming-consistency` (W31), `proof:lighthouse-demo` (W32)) — appears in `scripts/gates.mjs`'s `GATES` manifest with a `{local,ci,release,sibling}` tag; `npm run gates:verify-ci` is green (no gate in `ci.yml` without a manifest home; no manifest gate `ci.yml` skips). Born RED on HEAD (the AW gates are not yet in the manifest).
2. **`proof:aw-final` green over a clean tree.** `npm run proof:aw-final` exits 0; `git status` is clean after `proof:all`; the full local matrix is green.
3. **Four READMEs exist + cite their digest.** `src/components/custom/{dock,aurora,goo-blob,constellation}/README.md` each exist and each `grep`-confirm a citation to its research digest (`dock-animation-digest`, `aurora`/`aurora-digest`, `blob`/`blob-digest`, `frontend-convergence-digest`).
4. **Overfitting audit — zero orphans.** `audit/W33-overfitting.md` records the PROPS tally + zero orphans, reading W19's executed ledger + the glass-atoms band's surfaces + the band-G demo-internal/restyle surfaces; every `src/` artefact has ≥2 sites OR is exported OR is a private demo helper (the band-G demo-nav audits demo-private; the Configurator/carousel restyles audit as existing-surface refactors, not new mints).
5. **π lane ran (or the floor recorded).** `audit/W33-pi-lane.md` records the sweep (≥3 viewports, ≥5 frames per state-toggle, AA contrast, per-story consumption sweep over the visual-change waves incl. band G) OR the build-verification floor + the named re-probe obligation (the tooling-contingency clause).
6. **`FINAL.md` cites a run-id per wave.** `docs/tranches/AW/FINAL.md` exists, cites a green run-id per wave (inv-27), and carries the D-row → wave → green-gate crosswalk (incl. the band-G D-15+ rows); `PROGRESS.md` is flipped to the green run-ids.

## 7. Format And Lint Cadence

- `npm run gates:verify-ci` after each gate-manifest batch.
- `npm run proof:all` + `npm run proof:aw-final` before close (the full matrix).
- `git diff --check` for whitespace on the READMEs + the audit docs.
- `node --check scripts/proof-aw-final.mjs` for the new ESM gate.
- No formatter skipped; `proof:aw-final` is itself the generated-format/aggregate check.

## 8. Verification Artefacts

- `scripts/proof-aw-final.mjs` JSON artifact (the matrix-green + verify-ci + existence-check record).
- The four READMEs (dock/aurora/goo-blob/constellation).
- `docs/tranches/AW/audit/W33-overfitting.md` + `W33-pi-lane.md` + the screens.
- `docs/tranches/AW/FINAL.md` (the close report) + the flipped `PROGRESS.md`.
- The green run-id per wave (cited in `FINAL.md`).

## 9. Commit Plan

- `feat(gates): register the AW gate fleet in gates.mjs + proof:aw-final` — the manifest entries (incl. the glass-atoms band + the band-G new-scope gates) + the aggregate gate; body cites the `{local,ci,release}` structural-equality contract + the wave-file gate ids (Cluster A reconciliation).
- `docs(readme): research-backed READMEs (dock/aurora/blob/constellation)` — the four READMEs; body names the digest each cites.
- `docs(AW): W33 — overfitting audit (zero orphans) + π visual-runtime lane` — the two audits + screens.
- `docs(AW): W33 close — FINAL.md + green run-id per wave` — the close report + the `PROGRESS.md` flip; body cites inv-27 (green-means-green).

## 10. Dependencies

- **Depends on**: ALL bands (W0-W32). `proof:aw-final` cannot go green until every band gate is green; the overfitting audit reads W19's executed ledger + the glass-atoms band's surfaces + the band-G demo-internal/restyle surfaces; the four READMEs document the W1-W17 surfaces; the π lane sweeps the visual-change waves (incl. band G).
- **Blocks**: the 3.4.0 publish hinge (E1, USER-DOMAIN, confirm-first) — the close certifies the matrix-green a release tag rides; agents never run the irreversible release step.

## 11. Archaeology

The charter's original W18 ("GATE-PATTERN CLOSE + READMEs") was content-swapped: the actual `AW.W18-gate-pattern.md` became the access-modal `aria-invalid` idiom (a legitimate ≥2-consumer wave), and the close ceremony — the gate-fleet registration + `proof:aw-final` + the four READMEs + the π lane + `FINAL.md` — fell out of every wave file (the convergence-digest flagged this: "the charter's real W18 close-wave has no file"). It was first restored as W21, then re-anchored to W27 when the GLASS-ATOMS band (W22-W26 — the glass-material/card/primitive-affordance/reka-idiom DRY-consolidation, per `audit/research/glass-atoms-digest.md`) inserted ahead of it, and finally re-anchored to **W33 LAST** when the NEW-SCOPE band G (W28-W32 — the storybook+demo-dock-nav, aurora-configurator, carousel, animation+DESIGN.md, lighthouse, per `RECAP.md ADDENDUM 3`) inserted ahead; the close must open after every band, so it moved to the tail (W21 retired in the first renumber). The gate names registered here are the WAVE-FILE ids (per the harden-fixlist Cluster A — the `AW.md §2` table's fabricated names — `proof:dock-collapse-live`, `proof:aw-final`-as-W18, etc. — are reconciled to the realized gates). The `gates.mjs` manifest + `gates:verify-ci` is the structural guarantee (local == ci == release) the close certifies — the same machinery `proof:au-final` rides.
