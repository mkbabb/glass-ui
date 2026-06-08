# AX.W00 — Visual-runtime (π) lane: the fail-CLOSED gate-philosophy foundation

**Band** π · gate-philosophy · **Severity** blocker · **dependsOn** — (FIRST wave) · **Status** planned

This is the structural precondition every downstream visual wave's close depends on. It stands up the fail-CLOSED π visual-runtime workspace, promotes the cardinal fail-open gate to fail-CLOSED, pins the gate-feasibility pre-solve keyframes device-proved, and makes "live re-diagnosis BEFORE the fix" a wave-open ritual. NOTHING is "done" until audited GREEN against the live product — the cardinal lesson of AW, made machinery here.

---

## State

**Born-RED.** The gate this wave erects must fail at HEAD before the wave, against a deliberately-broken render — the falsifiable RED witness:

1. **The fail-open SKIP is structurally live at HEAD.** `scripts/proof-dock-animation-live.mjs` (the only behavioral dock gate) dynamically imports `playwright`/`playwright-core` and, when absent, **exits SKIPPED with EXIT=0** (its own header documents: "When the harness is absent (a clean CI runner with no browser binary), the gate exits SKIPPED ... it does NOT hard-fail CI"). Verified at HEAD: `package.json` has **no `@playwright/test` / `playwright` devDependency** and **no `workspaces`** entry (`node -e "const p=require('./package.json'); p.devDependencies?.playwright"` → `undefined`). So on every CI runner the only behavioral assertion is structurally never exercised — slice 2 F1, slice 31 F3.
2. **No substrate paints-color gate exists.** `npm run` lists `proof:blob-*` (smin-normalized, gradient-unit-length, spec-premult, space-gamma, mood-resolved, tempo-suppression) and `proof:aurora-*` (space-gamma, oklch-interp, wgsl-equivalence, derive-gamut, tensor-field) — **every one is a CPU oracle / static-text analyzer**. None mounts a component, renders to a canvas, and reads back a pixel. A black live aurora and a flooded live blob both pass the entire fleet — slice 6 F2, 10 F1, 11 F1, 12 F4.
3. **No proof-script ↔ package.json parity meta-gate exists.** A `scripts/proof-*.mjs` with no matching `proof:*` package.json entry (or vice-versa) ships unenforced; there is no gate asserting the two sets are in bijection.

**RED witness (the wave's acceptance is its inverse).** With the π workspace stood up: deliberately black the aurora interior (force `gl.clearColor(0,0,0,1)` or feed the int-in-float black path) → `proof:substrate-paints-color` goes **RED** (maxChannel == 0 over the interior). Restore the WebGL2 paint → GREEN. Symmetrically: a dock that morphs its box on a different clock than its children → `proof:dock-animation-live` (now fail-CLOSED in the workspace) goes **RED** on the lead/lag assertion. If a deliberately-broken render does NOT turn the lane RED, the lane is not load-bearing and the wave has not closed.

---

## Goal

Stand up a separate, fail-CLOSED π visual-runtime workspace — render the real component on a real device, read back pixels, assert on the painted image — so that every downstream visual wave closes on "the real device paints the right picture," not on a green headless oracle over a black live canvas.

---

## Scope

The gestalt fix from slice 31 F7: glass-ui carries **ZERO browser dependency by design** (a correct library precept — `proof:vueuse-free-root`, the zero-dep publish surface). That precept is WHY every behavioral/visual gate is one of three fail-modes — a CPU oracle (green when the live render is black), a static bake (green when the runtime path is dead), or a fail-OPEN Playwright SKIP (never exercised on CI). "Green gate" and "visually true" fully decoupled. The architectural fix is NOT to add a browser dep to the library — it is to stand up a **separate visual-test workspace** that carries Playwright + a headless WebGPU/WebGL device as devDependencies, kept entirely off the zero-dep library publish surface, and run the fail-CLOSED π lane there:

1. **The π workspace.** A dedicated `tests-visual/` workspace (a `package.json` `workspaces` member, NOT in the published `dist`/`exports` surface) with `@playwright/test` + a headless WebGPU device (Dawn / Chrome-headless-new) as devDependencies. It drives the demo dev server (`vite`, route `/navigation/dock`, the `demo/stories/substrates/aurora.vue` + `goo-blob.vue` stages) and reads back canvas pixels. The library `package.json` `dependencies`/`peerDependencies` are untouched; `proof:resolution` + `proof:vueuse-free-root` stay green because the workspace is dev-only.
2. **`proof:substrate-paints-color`** (NEW, born-RED-capable). Render aurora (DEFAULT config + each preset at t=1) and blob (`BLOB_CONFIG_DEFAULTS`, N frames) on a real device; readPixels; assert `maxChannel > 0` over the interior (non-black luma floor) for aurora, and for blob a contained opaque-fraction band (roughly 10–45% of the canvas, transparent margin — catches the flood). The black/flooded live render is the exact class no CPU oracle reaches.
3. **`proof:dock-animation-live` PROMOTED** from the fail-open SKIP to **fail-CLOSED in the π workspace** — exit non-zero on a missing morph, never SKIP-with-EXIT=0. The promotion rides the gate-feasibility PRE-SOLVE below (the dock morph is NOT reliably live getBoundingClientRect-measurable).
4. **`proof:gate-script-parity`** (NEW meta-gate). Assert every `scripts/proof-*.mjs` has a matching `proof:*` `package.json` script entry and vice-versa (a bijection), so a proof script can never ship unregistered (the partially-hand-registered fleet AW shipped).
5. **The seven AW PENDING `browserVerify` items are ENUMERATED as named re-probe obligations** — aurora W4/W6/W7/W8, blob W9/W10/W11 — written into the π-lane manifest so none is silently assumed-done. Each is a named row the lane re-probes (or records as `pending-re-probe` with the obligation owner wave), never an implicit pass.
6. **The "live re-diagnosis BEFORE the fix" ritual** (slice 31 F2). The AW.W1 dock spec misdiagnosed the root-cause from a hypothesis (blamed `useLayerTransition` measurement; the live re-diagnosis falsified it — the real cause was `container-type: inline-size`). W00 codifies the ritual: every regression wave's §Archaeology records a LIVE re-diagnosis at HEAD before authoring the fix. W00 ships the ritual + the workspace that makes it executable.

### Gate-feasibility PRE-SOLVE (load-bearing — keyframes device-proved it)

keyframes.js measured the dock morph **NOT reliably live-measurable**: 181 rAF `getBoundingClientRect` samples over 1.5s captured NO morph because (a) native View-Transitions run on `::view-transition-*` SNAPSHOTS invisible to live-element geometry, (b) the FLIP `SpringProgress` clock is glass-ui-internal with no public consumer handle, (c) the state machine ignores synthetic pointer events and gates real collapse behind a 2.5s delay. So `proof:dock-animation-live` MUST NOT rely on live `getBoundingClientRect` alone. The π lane drives the morph **deterministically**:

- **Force the readable FLIP arm** (the demo harness already does this — it removes `Document.startViewTransition` so the composable reads `NATIVE_VT=false`, the live-DOM-measurable path; pair with a test-flag/PRM force so the arm is pixel-readable).
- **Lower the collapse-delay** in the harness route (drive collapse without waiting 2.5s).
- **Real `page.hover`, not synthetic dispatch** (the state machine ignores synthetic pointer events).
- **AND/OR expose the `SpringProgress` clock as a test seam** (a `__springProgress` handle gated to the visual workspace).
- **Token-peak parse as the flake-free secondary.** Parse `--spring-dock`'s `linear()` ramp and assert its peak ≤ the published `(0.32,0.7)` baseline (~+4.6%) — the trivially-falsifiable secondary that has no rAF flake surface. keyframes demoted its own dock gate to exactly this token-peak form (`assert --spring-dock linear() ramp peak ≤ +6%`).

W00 **PRE-SOLVES** this gate-feasibility; it does NOT discover it at impl (the converge-digest mandate: "a concrete gate-feasibility risk W00 must pre-solve, not discover at impl").

### Cross-constellation corroboration (this is a CONSTELLATION failure class)

Three independent repos re-discovered the SAME headless-green/visually-broken gap: **keyframes.js's H audit** (35 green gates + 637 tests over a visually-broken demo; ZERO pixel-diff infra — `toMatchSnapshot`/`toHaveScreenshot`/`pixelmatch` return zero across the repo), **speedtest's AT real-edge Playwright validation** (refuted two source-audit findings, surfaced FOUR live latent bugs), and **slides' H** ("e2e specs authored but NOT executed"). W00 adopts keyframes' named precepts **verbatim** — **"Runtime Truth Beats Source Claims"** (2026-04-29), with corroborators "Read-Only Audits Miss Runtime" (2026-05-05) and "Visual-Runtime Probe Coverage Stop-Rule" / "Visual Load-Bearing-ness Bar" (2026-05-06) — and reuses keyframes' **I-1/I-2 instrument design** as the π-lane template: re-source the SCENES manifest from the source-of-truth (not a drifted hand-list), and a named-region pixel baseline with **3-run anti-flake tolerance**.

### CLS-witness discipline + paired-π protocol (folded)

- **CLS witness discipline (speedtest W-RATCHET).** A CLS witness is the Lighthouse-JSON settled-trace OR a multi-trial median + a dial-height trace — **NEVER a single buffered-observer shot**. Baked into the lane's acceptance form.
- **The paired-π BEFORE/AFTER + DELTA.md compare-at-close protocol (muster ask).** The π lane captures BOTH states (the broken HEAD render AND the fixed render) and a delta artefact — not only a single fail-closed readback. Every downstream visual wave emits a `DELTA.md` (or paired before/after captures) at close.
- **The fourier two-co-mounted-docks VT-name collision** (`CanvasControlsDock` + `EditorControlsDock` both mint `glass-dock-1` → duplicate `view-transition-name` DROPS the morph snapshot + reds ~13 e2e) is added as a π-lane / W01 regression fixture — the live witness that VT is the wrong primitive for a layout morph.

---

## FileBounds

The EXACT files this wave may touch (for parallel-dispatch disjointness):

| File | Access | Why |
|---|---|---|
| `tests-visual/package.json` | create | the π workspace manifest (Playwright + headless WebGPU device devDeps; off the publish surface) |
| `tests-visual/playwright.config.ts` | create | the workspace's Playwright runner config (drives the `vite` demo dev server) |
| `tests-visual/pi-manifest.ts` | create | the SCENES manifest re-sourced from source-of-truth + the 7 AW PENDING browserVerify rows |
| `tests-visual/substrate-paints-color.spec.ts` | create | the aurora + blob readPixels spec (named-region baseline, 3-run anti-flake) |
| `tests-visual/dock-animation-live.spec.ts` | create | the deterministic-drive dock morph spec (forced FLIP arm + token-peak secondary) |
| `scripts/proof-substrate-paints-color.mjs` | create | the `proof:substrate-paints-color` gate driver (invokes the workspace spec) |
| `scripts/proof-gate-script-parity.mjs` | create | the proof-script ↔ package.json bijection meta-gate |
| `scripts/proof-dock-animation-live.mjs` | modify | promote the fail-open SKIP → fail-CLOSED in the π workspace; wire the deterministic-drive + token-peak secondary |
| `scripts/gates.mjs` | modify | register the 3 new/promoted gates in the single manifest with `{local, ci}` tags |
| `package.json` | modify | add the `workspaces: ["tests-visual"]` member + register `proof:substrate-paints-color`, `proof:gate-script-parity` |
| `docs/tranches/AX/PROGRESS.md` | modify | flip W00's status row |
| `docs/tranches/AX/audit/W00-pi-lane.json` | create | the π-lane evidence artefact (the RED-witness capture + the 7 PENDING rows) |
| `docs/tranches/AX/audit/W00-live-rediagnosis-ritual.md` | create | the codified wave-open ritual + the slice-31-F2 misdiagnosis archaeology |

**RATIFY-BEFORE-IMPL.** The π workspace location (`tests-visual/` vs a `pi/` workspace) and the headless device choice (Dawn standalone vs Chrome-headless-new vs `headless-gl`/SwiftShader for the WebGL2 floor) are a one-decision ratification at wave open — the recommended path is a `tests-visual/` workspace driving Chrome-headless-new (it carries both a WebGPU and a WebGL2 backend, and the demo dev server already serves the routes). Ratify before impl; record the device choice in `W00-pi-lane.json`.

**Do NOT touch:** any `src/*` (W00 writes no library source — it is the gate-philosophy DEV wave; the dock/aurora/blob FIXES are W01/W07/W08); `docs/precepts/` (submodule, read-only); any other `waves/AX.Wnn-*.md` (each wave owns its own status row update).

---

## Disjointness

Sibling waves W00 must NOT overlap, the shared files, and how collision is avoided:

- **W01 (dock single-scalar morph)** is the first IMPL consumer of `proof:dock-animation-live`. W00 **promotes the gate to fail-CLOSED** (`scripts/proof-dock-animation-live.mjs`, the harness contract) but writes NO `src/` — W01 owns every `src/components/custom/dock/**` + `dock.css` edit and re-runs the W00-erected gate. Boundary: W00 owns the gate machinery + the deterministic-drive design; W01 owns the morph implementation. They share `scripts/proof-dock-animation-live.mjs` only by sequencing — W00 lands the fail-CLOSED form FIRST (W01 `dependsOn AX.W00`), so W01 never co-edits it.
- **W07 (aurora unblock)** authors `proof:aurora-webgpu-render` (its own π-lane gate); W08 (blob unblock) authors `proof:blob-render`. W00 ships `proof:substrate-paints-color` as the SHARED substrate-paints non-black floor (the readPixels primitive both per-surface gates compose). Boundary: W00 owns the readPixels harness + the non-black/contained-band floor; W07/W08 own the per-surface parity assertions (per-i32-field parity, WebGL2-vs-WebGPU delta, opaque-fraction band tuning) in their OWN spec files. No shared `.spec.ts` file — W07/W08 add `tests-visual/aurora-*.spec.ts` / `blob-*.spec.ts` siblings.
- **`package.json`** is co-edited by nearly every wave (each registers its `proof:*`). W00's edits are confined to the `workspaces` member + its 2 new gate registrations + the line-level gate entries — disjoint from any other wave's registration line by gate id. The single `gates.mjs` manifest is the canonical registry; W00 lands its 3 rows, later waves append theirs.
- **`scripts/gates.mjs`** — W00 appends 3 manifest rows. Disjoint from sibling appends by row id; no row is rewritten.
- **`docs/tranches/AX/PROGRESS.md`** — W00 flips ONLY its own status row (seeded by the tranche-open). Every other wave owns its own row.

---

## Triumvirate

The implement / adversarially-verify / gate-author split (≤6 implementation agents; this wave runs 3):

- **Implement (1 agent).** Stand up the `tests-visual/` workspace (`package.json` member + Playwright config + the SCENES manifest re-sourced from source-of-truth + the 7 AW PENDING rows). Author the two `.spec.ts` probes (substrate-paints-color readPixels + the deterministic-drive dock spec). Promote `scripts/proof-dock-animation-live.mjs` to fail-CLOSED. Register in `gates.mjs` + `package.json`.
- **Adversarially-verify (1 read-only agent).** PROVE the lane is load-bearing by the RED-witness inverse: deliberately black the aurora interior and confirm `proof:substrate-paints-color` goes RED; deliberately desync the dock morph clock and confirm `proof:dock-animation-live` goes RED; remove a `proof:*` registration and confirm `proof:gate-script-parity` goes RED. A lane that stays green under a broken render is a FAILED wave — this agent's verdict is the acceptance. Also runs the keyframes-corroborated gate-feasibility check: confirm the deterministic-drive arm actually captures the morph (not the 181-sample no-morph trap) and the token-peak secondary is flake-free across 3 runs.
- **Gate-author (1 agent).** Author `scripts/proof-gate-script-parity.mjs` (the bijection meta-gate) + the `gates.mjs` `{local, ci}` tagging (per §4 note 21's at-LEAST-ci model — these are NOT release-lane gates, they are the visual-truth close-machinery; tag `['local','ci']`). Ensure each gate emits a byte-stable JSON artefact via `gate-output.mjs` and exits non-zero on a real violation (the fail-CLOSED contract — never SKIP-with-EXIT=0 in the workspace).

---

## HardGate

Born-RED → GREEN gates, each a precept-valid artefact (runtime observation / deletion / parity — NOT grep-only for runtime behaviour):

1. **`proof:substrate-paints-color`** (NEW, fail-CLOSED). On a real device: render aurora DEFAULT + each preset at t=1, readPixels, assert `maxChannel > 0` over the interior (non-black floor); render blob `BLOB_CONFIG_DEFAULTS` over N frames, readPixels, assert a contained opaque-fraction band (≈10–45%, transparent margin). Named-region baseline with 3-run anti-flake tolerance. RED at HEAD against a blacked/flooded render; GREEN on the live WebGL2 paint.
2. **`proof:dock-animation-live`** (PROMOTED to fail-CLOSED in the π workspace). Deterministic-drive (forced FLIP arm via removed `startViewTransition` + PRM/test-flag; lowered collapse-delay; real `page.hover`); sample the dock-root box geometry (padding-inline + border-radius + bounding width) AND a representative child's opacity/transform on the SAME rAF timeline; assert morph onsets in the SAME frame (lead/lag ≤ 1 frame). Token-peak parse of `--spring-dock` (`linear()` ramp peak ≤ the published `(0.32,0.7)` ~+4.6% baseline) as the flake-free secondary. **Exit non-zero — never SKIP-with-EXIT=0 — when the workspace is present.** (The library-side `scripts/proof-dock-animation-live.mjs` keeps the cheap structure-tier pre-checks for the zero-dep CI runner; the fail-CLOSED behavioral truth lives in the `tests-visual` workspace.)
3. **`proof:gate-script-parity`** (NEW meta-gate). Assert a bijection: every `scripts/proof-*.mjs` ↔ a `proof:*` `package.json` script, and every gate in `gates.mjs` resolves to a real script. RED at HEAD if any unregistered proof script exists; GREEN when the sets are in bijection.
4. **The 7 AW PENDING browserVerify rows** (aurora W4/W6/W7/W8, blob W9/W10/W11) are present in `tests-visual/pi-manifest.ts` as named re-probe obligations; the manifest gate asserts each row carries an owner wave + a `re-probed | pending-re-probe` verdict (no silent assumed-done).

### MANDATORY VISUAL-TRUTH live-audit clause (non-negotiable per AX.W00)

**This wave IS the visual-truth machinery — its acceptance is that a deliberately-broken render makes the lane go RED.** The close criterion is NOT a green headless proof. It is an EXECUTED live Playwright + frontend-design audit, on the appearance/interaction axis, run by the adversarial-verify agent:

- A deliberately-blacked aurora interior turns `proof:substrate-paints-color` **RED** (and the live frontend-design screenshot shows the black canvas the gate now catches); restoring the WebGL2 paint turns it GREEN.
- A deliberately-desynced dock morph clock turns `proof:dock-animation-live` **RED** on the lead/lag assertion; a live audit confirms the morph "reads as one continuous iOS spring" only when GREEN.
- The fourier two-co-mounted-docks VT-name collision fixture renders both route-morphs and is captured as a live regression witness.

A headless proof alone does NOT close this wave. The lane must demonstrably distinguish a black/flooded/desynced live render from a correct one, captured as a paired BEFORE/AFTER + `DELTA.md` artefact (CLS witnesses are settled-trace / multi-trial-median, never a single buffered-observer shot).

---

## Cadence

The sub-step order:

1. **Live re-diagnosis ritual + RED-witness capture (FIRST).** Confirm the fail-open SKIP is live at HEAD (`proof:dock-animation-live` SKIPs with EXIT=0, no Playwright devDep); confirm no substrate-paints gate exists; capture the deliberately-blacked/flooded RED witness. Codify the ritual doc.
2. **Stand up the `tests-visual/` workspace** (RATIFY the location + device choice first): `package.json` member + Playwright config + the SCENES manifest re-sourced from source-of-truth + the 7 AW PENDING rows.
3. **Author `proof:substrate-paints-color`** (readPixels aurora + blob; named-region baseline; 3-run anti-flake). Verify RED against a blacked render, GREEN on the live paint.
4. **Promote `proof:dock-animation-live`** to fail-CLOSED with the deterministic-drive + token-peak secondary. Verify it captures the morph (not the 181-sample no-morph trap).
5. **Author `proof:gate-script-parity`** (the bijection meta-gate) + register all 3 gates in `gates.mjs` + `package.json`.
6. **Adversarial RED-witness verification** (the acceptance): each gate goes RED under its deliberately-broken render. Emit `W00-pi-lane.json` + the paired BEFORE/AFTER `DELTA.md`.

---

## Artefacts

The audit JSON + evidence this wave emits:

- `docs/tranches/AX/audit/W00-pi-lane.json` — the π-lane evidence: the RED-witness capture (blacked-aurora → RED, desynced-dock → RED, unregistered-script → RED), the device choice ratified, the 7 AW PENDING browserVerify rows with owner-wave + verdict, the readPixels named-region baselines.
- `docs/tranches/AX/audit/W00-live-rediagnosis-ritual.md` — the codified wave-open ritual + the slice-31-F2 misdiagnosis archaeology (the AW.W1 hypothesis-vs-live-diagnosis lesson).
- The byte-stable JSON gate artefacts from `proof:substrate-paints-color`, `proof:dock-animation-live`, `proof:gate-script-parity` (via `gate-output.mjs`).
- The paired BEFORE/AFTER captures + a `DELTA.md` template (the compare-at-close protocol every downstream visual wave inherits).
- `docs/tranches/AX/PROGRESS.md` — W00 status flipped to complete with the green run-id.

---

## CommitPlan

Conventional-commit messages, one per sub-step:

- `docs(tranche-AX): W00 — live-rediagnosis ritual + RED-witness capture` — the ritual doc + the HEAD fail-open SKIP / no-substrate-gate witness; body cites slice 31 F2/F3/F7 + the "Runtime Truth Beats Source Claims" precept adopted verbatim.
- `test(pi-lane): stand up the tests-visual workspace off the publish surface` — the `package.json` workspaces member + Playwright config + the SCENES manifest (re-sourced from source-of-truth) + the 7 AW PENDING browserVerify rows; body notes the zero-dep library surface is untouched (`proof:vueuse-free-root`/`proof:resolution` stay green).
- `feat(gate): proof:substrate-paints-color — readPixels aurora + blob non-black/contained floor` — the readPixels spec + driver; body cites slices 6 F2, 10 F1, 11 F1, 12 F4 (the CPU-oracle blindspot) + the 3-run anti-flake I-1/I-2 instrument design.
- `feat(gate): proof:dock-animation-live promoted fail-open SKIP → fail-CLOSED π lane` — the deterministic-drive + token-peak secondary; body cites the keyframes 181-sample no-morph gate-feasibility pre-solve + the `(0.32,0.7)` token-peak baseline.
- `feat(gate): proof:gate-script-parity — proof-script ↔ package.json bijection meta-gate` — the meta-gate + the 3 `gates.mjs` registrations; body cites the partially-hand-registered AW fleet.
- `docs(AX): W00 close — π-lane evidence + paired-π DELTA protocol + status` — `W00-pi-lane.json` + the `DELTA.md` template + the status row flip; body records the RED-witness acceptance (each gate goes RED under a broken render).

---

## Dependencies

- **dependsOn:** — (FIRST wave). W00 OPENS FIRST; it has no predecessor. Per §1/§2, the π lane is the structural precondition every visual wave's close depends on.
- **Blocks (every visual wave):** W01–W06 (dock — `proof:dock-animation-live` is the W01 close gate), W07–W09 (graphics — `proof:substrate-paints-color` is the W07/W08 non-black/contained floor), W10–W17 (aurora/blob/constellation perfection), W18/W40 (storybook IA visual), W22/W36 (font/forced-colors visual). Each consumes the π workspace + the BEFORE/AFTER+DELTA compare-at-close protocol + the live-re-diagnosis ritual.
- **Why FIRST:** the cardinal AW failure (a fleet of green CPU/structure gates over a black live canvas, a flooded blob, a desynced dock, a blown-out specular) cannot be corrected wave-by-wave unless the close-criterion machinery exists before the first fix. The π lane converts every downstream "green" into "the real device paints the right image" — it must precede every wave that produces a paintable surface.

---

## Archaeology

The git commits / prior-tranche lineage the audit cited as evidence:

- **`scripts/proof-dock-animation-live.mjs` header (AV.W9.4).** Documents its own fail-open contract verbatim: "When the harness is absent (a clean CI runner with no browser binary), the gate exits SKIPPED ... it does NOT hard-fail CI." This is the structural fail-open SKIP W00 promotes — the live RED witness at HEAD.
- **AW.W1 dock-collapse misdiagnosis (slice 31 F2).** The AW.W1 spec blamed `useLayerTransition.ts` natural-size measurement and forbade touching `dock.css`; the live HEAD re-diagnosis (`W1-collapse-live.json`) falsified it — the real cause was `.glass-dock { container-type: inline-size }` introduced by AV.W16 (Tailwind v3→v4 container-query work), since fixed in 3.4.0. The plan's root-cause was a HYPOTHESIS, not a verified diagnosis; the correct fix emerged only from a live Playwright re-diagnosis. This is WHY the live-re-diagnosis ritual is W00 scope (§4 note 11, note in slice 31 F2).
- **AW shipped batch-1 onto `at-dock-convergence @ eaba94f` WITHOUT a formal close** — the close wave (renumbered W18→W21→W27→W33) never reached; the gate-fleet is partially hand-registered (the `proof:gate-script-parity` meta-gate's motivation). HEAD `eaba94f` is UNPUBLISHED; the registry line is 3.6.0 (the publish-currency gap, §4 note 12 — relevant context, not W00 scope).
- **keyframes.js H audit (`H/audit/a-gate-blindspots.md` ROOT-A/ROOT-B + §3; `a-historical-dock.md` §2 H-dock-4).** 35 green gates + 637 tests over a visually-broken demo; ZERO pixel-diff infra; the 181-sample no-morph capture; the named precepts "Runtime Truth Beats Source Claims" (2026-04-29) / "Read-Only Audits Miss Runtime" (2026-05-05) / "Visual-Runtime Probe Coverage Stop-Rule" + "Visual Load-Bearing-ness Bar" (2026-05-06). The I-1/I-2 instrument design (SCENES manifest re-sourced from source-of-truth; named-region pixel baseline, 3-run anti-flake) is the π-lane template.
- **speedtest AT real-edge validation (`AT.md §11.1-§11.2`, V1/V2/V4/V6).** Refuted two source-audit findings + surfaced four live latent bugs; the W-RATCHET CLS-witness discipline (settled-trace / multi-trial median, never a single buffered-observer shot). The "VT kills the dial CLS" claim (AT.md:50) was REFUTED by the live drive — the analogue of AW's dock-misdiagnosis.
- **fourier two-co-mounted-docks VT-name collision** (`CanvasControlsDock` + `EditorControlsDock` both mint `glass-dock-1` → duplicate `view-transition-name` → dropped morph snapshot + ~13 red e2e). The live, file-cited reproduction of why VT is the wrong primitive for a layout morph — a W00 π-lane / W01 regression fixture (§4 note 23).
- **The single-clock dock high-water `e82633e` / `e8380d7`** (keyframes a-historical-dock git archaeology) — the correct single-clock baseline the dock band measures against; context for the W00 token-peak `(0.32,0.7)` baseline.

---

## PreceptAlignment

The specific precepts this wave is pursuant to + must not violate (per §2b π-band row, pinned `63240e6`):

- **π visual-runtime lane** (`instructions/tranche/SPEC.md §"The π visual-runtime lane"`). The lane is a canonical close-ceremony lane, binding for every tranche that ships visual changes; its probe coverage MUST include ≥3 viewports, animation-timing samples (≥5 frames spanning the named duration) on every modified transition, contrast-vs-background measurement, and a per-story consumption sweep. W00 stands the lane up as fail-CLOSED machinery, not a build-verification-floor contingency. **Tooling-contingency clause honored:** the lane's full binding form requires working browser automation; the `tests-visual` workspace carries it as a devDependency so the π verdict is binding (not provisional). PURSUED.
- **Gates close on evidence — no grep-only runtime gate** (`README.md` "Gates close on evidence: test output, build output, runtime observation"; `instructions/tranche/SPEC.md §"Hard Gates"` — invalid: "grep found a source string for runtime behaviour", "API exists", "consumer will be wired later", "disabled feature flag with no restoration wave", "silent `console.warn` + return in a library-owned failure mode"). Every W00 gate is a runtime observation (readPixels / live rAF sampling) or a deletion/parity assert — never a grep over source for runtime behaviour. MUST NOT VIOLATE.
- **Fail-explicit on library-internal violations vs befitting-silent browser-API degradation** (`instructions/README.md §"Edicts"`; `SPEC.md §"Hard Gates"`). The two failure modes are NEVER collapsed. The promoted `proof:dock-animation-live` MUST exit non-zero (fail-explicit) in the workspace where the browser IS present — the current SKIP-with-EXIT=0 is exactly the "silent fallback in a library-owned failure mode" the precept forbids when the failure is a real wiring break, not a browser-API absence. (The zero-dep CI runner's harness-absent SKIP stays befitting-silent — the device genuinely is not present; the two are kept distinct.) MUST NOT VIOLATE.
- **No silent deferrals** (`instructions/README.md §"Edicts"`). The 7 AW PENDING browserVerify items are ENUMERATED as named re-probe obligations with owner waves — never silently assumed-done. The lane makes a deferred browserVerify a named row, not a phantom-owner re-defer. PURSUED.
- **Every wave is named + every unit declares goal + completion criteria** (`instructions/README.md §"Edicts"`; `TRANCHE-AND-WAVE-SPEC.md`). W00 carries the canonical `W<N> - <Title>` form; the Goal (forward-looking) and the HardGate (evidence-bearing completion) are paired and distinct. PURSUED.
- **Cross-repo π is binding on the consumer repos too** (§2b π-band row). The π lane is constellation-wide: slides' H non-execution, speedtest's AT real-edge validation, and keyframes' H audit each re-discovered the gap. W00 ships the protocol the consumer waves (W30 slides, W28 speedtest) inherit. PURSUED.
- **Hardened agent git clause** (K W0; `AGENT_DISPATCH_TEMPLATE.md`). W00 is tranche-development ONLY — agents NEVER stage/commit/stash/checkout/reset/restore; read-only git only; the orchestrator owns the index. The `CommitPlan` records the message set; the orchestrator commits. MUST NOT VIOLATE.
- **Zero-dep library publish surface preserved** (`proof:vueuse-free-root`, `proof:resolution`). The `tests-visual` workspace carries Playwright + the headless device as devDependencies ONLY, kept entirely off the published `dist`/`exports` surface — the library's zero-browser-dep precept (the very reason the gap exists) is preserved, not abandoned. MUST NOT VIOLATE.
