# AW.W6 — AURORA-OPTIONS (the atoms of control — the few intuitive knobs over the full schema)

## 2. State

**Name**: W6 — AURORA-OPTIONS (collapse the ~28-field schema to ~7 intuitive atoms; keep the wispy-sky default)
**Opens after**: HEAD — pure-TS, independent of the GLSL waves. SHOULD open after AW.W5 lands `deriveAurora`'s new harmonies + `deriveScene` (the `seed`/`harmony` atoms route through them) and after AW.W4 lands the `vangogh`/`oil-pastel` mediums (the `medium` atom enumerates them), so the atom mapper resolves the final medium/harmony set. Sequenced after W4+W5 for a single resolver pass; could open at HEAD against the current set if W4/W5 slip.
**Agents**: 1 — AW.W6.1 (the `resolveAtoms` mapper + the configurator two-tier disclosure). Single pure-TS lane; no shader edit, no parallel split.
**Hard gate**: one born-RED gate green — `proof:aurora-atoms-roundtrip` (`resolveAtoms` is a TOTAL function — every atom combination produces a valid in-range `AuroraConfig` respecting every `budget.ts` cap — AND the default atoms resolve to the wispy-sky `DEFAULT_AURORA_CONFIG`). `typecheck` + `build` + the existing gate matrix stay green.
**Status**: planned

**Type:** IMPL (API ERGONOMICS — the user-mandated "simplify the option set; keep the wispy-sky default"). Not publish-blocking; the full `AuroraConfig` schema is UNCHANGED (the power-user escape hatch) — the atoms are a SUPERSET door (a new thin surface ADDED over the schema; no field removed, no prior behavior replaced), NOT a back-compat alias.
**Scope source:** `docs/tranches/AW/aurora/PATH-FORWARD.md` §3 (the simplified option set — the two-tier "atoms of control" model), `docs/tranches/AW/waves/aurora-wave-seeds.md` W3 (options simplification), and the SOTA digest (`docs/tranches/AW/audit/research/aurora-digest.md` Lanes 1/3 — the Stripe/paper.design productized two-tier control surface; progressive disclosure).

**Precepts in force.** No legacy / no back-compat — `resolveAtoms` is the NEW consumer door, NOT a parallel config path; nothing is removed from `AuroraConfig` (the simplification is in the PRESENTED surface, not the schema — the full config stays whole as the progressive-disclosure escape hatch). Gestalt: a thin atom surface over the author schema (the Stripe/paper.design productized model — ~4-7 knobs shown, the full surface revealed on demand) rather than deleting expressive fields. KISS: ≤7 atoms; one slider fans to several config fields where the underlying axes co-vary (mood → saturation + warpAmount + valueVariance + breath). DRY: the `seed`/`harmony` atoms route through AW.W5's `deriveAurora`/`deriveScene` (no duplicate palette derivation); the `medium` atom enumerates AW.W4's medium union (no duplicate medium list); the `zones` atom drives the existing nuclei machinery. `resolveAtoms` is a PURE, testable function — no shader change, no runtime side effect. The wispy-sky default (`DEFAULT_AURORA_CONFIG`, `presets.ts:148`) is the canonical default the default atoms MUST resolve to (machine-asserted), and is otherwise byte-UNTOUCHED.

## 2a. Goal criterion

This wave succeeds if a consumer can configure a stunning aurora backdrop from ≤7 intuitive atoms — seed color, harmony, mood/energy, medium, texture amount, motion, zones — with `resolveAtoms(atoms)` deterministically expanding them to a valid in-range `AuroraConfig`, while the full ~28-field schema stays whole as a progressive-disclosure "Advanced" escape hatch and the default atoms resolve EXACTLY to the wispy-sky default. The reader's test: `resolveAtoms` is a total function (every atom combination yields a valid config respecting every `budget.ts` cap, no NaN, no out-of-range field); `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG` (the wispy-sky default is preserved through the new door); the configurator shows the ≤7 atoms with the full surface collapsed under an "Advanced" disclosure. Pure-TS, WebGL2-ships now.

## 3. Scope

1. **The `resolveAtoms(atoms) → AuroraConfig` pure mapper.** A pure, total function expanding the Tier-1 atoms to the full config. The Tier-1 atoms (≤7):
   - **seed** (one OKLCh/hex) → drives AW.W5's `deriveAurora`.
   - **harmony** (analogous · complementary · triad · split-comp · tetrad · mono) → AW.W5's `AuroraHarmony` union.
   - **mood / energy** (calm ↔ vivid, one slider) → fans to `saturation` + `warpAmount` + `valueVariance` + breath together (the co-varying axes).
   - **medium** (smooth · watercolor · pastel · oil-pastel · van-gogh) → AW.W4's `AuroraMedium` union.
   - **texture amount** (0..1) → the medium's dominant texture knob (`strokeAmount`/`wetEdge`/`canvasGrain` per medium).
   - **motion** (still · breathing · drifting) → the four motion fields.
   - **zones** (2–6) → nuclei count, auto-arranged on a rule-of-thirds/golden prior, hand-tunable in Advanced.

   **The interactivity flag SHAPE (declared here, default OFF; behavior wired in W8).** Per the PLAN, the `interactivity` flag (the `light | flow | scroll | wake` axis enumeration) enters `AuroraConfig` in THIS wave with a default of OFF, so the atom door can EXPOSE it as a Tier-1 (or Advanced) toggle. W6 declares only the flag's TYPE + default-off — it wires NO behavior (the cursor-as-light/velocity/scroll/wake axes are AW.W8's, which depends on W4+W7). The roundtrip gate asserts `DEFAULT_ATOMS` resolve the flag to OFF so the wispy-sky default stays non-interactive. (If W8 lands the flag first because of slip, W6 CONSUMES the existing flag rather than re-declaring it — no duplicate; the orchestrator sequences so exactly one wave declares it.)
2. **The two-tier configurator disclosure.** A collapsed "Advanced" disclosure on the aurora configurator chrome exposing the full `AuroraConfig` surface; Tier-1 atoms shown by default (progressive disclosure — essentials shown, complexity revealed on demand). The configurator consumes glass-ui's `Configurator`/`ConfiguratorLayer` (the `dividers` + `density` contract) — no new disclosure primitive.
3. **The `AuroraAtoms` type + the `DEFAULT_ATOMS` constant** — the Tier-1 atom shape + the default atoms that resolve to the wispy-sky default. Export from the aurora barrel + register the type on `@mkbabb/glass-ui/api` (the canonical public types surface).
4. **Keep `DEFAULT_AURORA_CONFIG` untouched** (`presets.ts:148`) — the `medium:"smooth"` atmospheric pole every wave leaves untouched; the default atoms MUST resolve to it.
5. **The born-RED gate** — `proof:aurora-atoms-roundtrip` (§6).
6. **DESIGN.md §options + README update** — document the two-tier model (the atoms door + the full schema escape hatch), the atom→config mapping table, and the "default atoms = wispy-sky default" invariant.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **An atom combination cannot resolve to a valid in-range config.** If the total-function gate finds an atom combination (e.g. `zones:6` × `medium:vangogh` × `mood:vivid`) that produces a config field out of its `budget.ts` cap (the energy-graded van-Gogh at 6 zones at max vivid may exceed a stroke-layer or nuclei cap), the redress is whether to CLAMP the atom→config mapping (mood ceiling per medium) or to RAISE the budget cap — a config-contract decision about the atom space's reach, not a local clamp. Halt and triumvirate; `resolveAtoms` MUST be total.
- **The default atoms do not deep-equal the wispy-sky default.** If `resolveAtoms(DEFAULT_ATOMS)` does not reproduce `DEFAULT_AURORA_CONFIG` exactly (a field the atom mapper cannot reach, or a default the atoms over-constrain), the redress is whether the atom set is missing an axis (a field the default sets that no atom controls) — which is a SCOPE reveal (the ≤7 atoms are insufficient to express the default) requiring a plan augment, not a local default tweak. Halt and triumvirate; the wispy-sky default is the non-negotiable preservation.
- **The configurator disclosure needs a primitive glass-ui lacks.** If the two-tier disclosure cannot be built from `Configurator`/`ConfiguratorLayer` + the existing `Collapsible`/disclosure surface (the Advanced tier needs a behavior the shipped components don't carry), that is a library-convergence reveal (a new disclosure primitive needs ≥2 consumers) — escalate, do NOT build a one-off aurora-local disclosure component.
- **Any diagnostic loop reaches its third iteration** on the roundtrip total-function fuzz (an atom combination keeps producing an invalid config across redress attempts) — halt; the atom space is over-reaching the valid config region, a contract defect, not a fuzz-seed tweak.

File-bound expansion BEYOND the §4 table (a shader edit, a new disclosure primitive in `src/components/ui/`, a `budget.ts` cap raise) invalidates the pure-TS-thin-surface scope and triggers the triumvirate.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/composables/atoms.ts` | create (the `resolveAtoms` pure mapper — a clean-create co-located module, NOT a `configSource.ts` modify; `resolveAtoms` is a pure atom→config mapper, so it gets its own leaf rather than threading into the config-source plumbing) |
| `src/components/custom/aurora/constants/presets.ts` | modify (the `AuroraAtoms` type + `DEFAULT_ATOMS` constant) |
| `src/components/custom/aurora/index.ts` | modify (export `resolveAtoms`, `AuroraAtoms`, `DEFAULT_ATOMS`) |
| `src/api/index.ts` | modify (register `AuroraAtoms` on the canonical public types surface) |
| `src/components/custom/aurora/__tests__/atoms.test.ts` | create (the total-function fuzz + the default-roundtrip assert) |
| `src/components/custom/aurora/DESIGN.md` | modify (the two-tier options note + the atom→config table) |
| `scripts/proof-aurora-atoms-roundtrip.mjs` | create |
| `scripts/gates.mjs` | modify (register the gate) |
| `package.json` | modify (scripts only — the gate entry) |
| `demo/stories/aurora/*` (the aurora configurator story — the two-tier disclosure) | modify (demo-private; the Tier-1 atoms shown + the Advanced disclosure) |
| `docs/tranches/AW/PROGRESS.md` | modify (record the green run + the roundtrip result) |

Do NOT touch: any shader partial (`aurora.frag.ts`, `composition.glsl.ts`, `flow.glsl.ts`, `brush.glsl.ts`, `mediums.glsl.ts`, `tonemap.glsl.ts` — this wave is pure-TS, the shader is unchanged) · `color.ts` (AW.W5 owns `deriveAurora`/`deriveScene` — `resolveAtoms` CONSUMES them, does not edit them) · `budget.ts` (the cap source — `resolveAtoms` RESPECTS the caps, never raises one; a cap raise is the §3a triumvirate) · `DEFAULT_AURORA_CONFIG`'s VALUES (`presets.ts:148` — byte-unchanged; the default atoms resolve TO it, they do not redefine it) · `src/components/ui/configurator/*` (the `Configurator` primitive — the aurora story CONSUMES it, does not edit it). **No new glass-ui disclosure primitive — the two-tier surface is built from the shipped `Configurator`/`Collapsible`.**

## 4a. Disjointness

Single agent unit — no intra-wave disjointness to confirm. The wave is file-disjoint from the parallel-eligible AW.W4 (shaders) and AW.W5 (color GLSL/CPU); it touches `presets.ts` (the atom TYPE + `DEFAULT_ATOMS`, additive — disjoint from W4's `AuroraMedium` union edit and W5's `deriveScene` mapping IF sequenced after them; if run in parallel with W4/W5 it would share `presets.ts` → it is SEQUENCED after W4+W5 per §2 State to avoid the shared-file race). No two units in this wave write the same path.

## 4b. Worktree Plan

Single agent, single lane — no sibling-worktree split required. The wave opens after AW.W4 + AW.W5 commit (it branches from their integrated HEAD so `presets.ts` already carries the final `AuroraMedium`/`AuroraHarmony` sets the atom mapper enumerates). One worktree:

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| AW.W6.1 (atoms + configurator) | `/Users/mkbabb/Programming/glass-ui-aw-w6` | branches from the W4+W5-integrated HEAD; owns the mapper + the atom type + the test + the gate + the demo story |

No `CARGO_TARGET_DIR` (Node/Vite repo). The orchestrator runs `git worktree add` and owns the close integration.

## 5. Agent Units

### AW.W6.1 The resolveAtoms mapper + the two-tier configurator disclosure

- **Goal**: a consumer configures the aurora from ≤7 intuitive atoms via a pure, total `resolveAtoms(atoms) → AuroraConfig` mapper, with the full schema preserved as a progressive-disclosure "Advanced" tier and the default atoms resolving exactly to the wispy-sky default.
- **Mechanism**:
  - **The `AuroraAtoms` type + `DEFAULT_ATOMS` (`presets.ts`).** Define the Tier-1 atom shape (seed, harmony, mood, medium, textureAmount, motion, zones) + the `DEFAULT_ATOMS` constant whose `resolveAtoms` output deep-equals `DEFAULT_AURORA_CONFIG`.
  - **`resolveAtoms(atoms) → AuroraConfig` (a clean-create `composables/atoms.ts`).** A pure mapper:
    - `seed` + `harmony` → AW.W5's `deriveAurora(seed, {harmony, …})` for the palette.
    - `mood` (one 0..1 slider) → fan to `saturation` + `warpAmount` + `valueVariance` + breath (the co-varying energy axes; a monotone mapping each).
    - `medium` → the `AuroraMedium` union value (+ the medium's preset defaults).
    - `textureAmount` → the medium's dominant texture knob (`strokeAmount`/`wetEdge`/`canvasGrain`, switched on `medium`).
    - `motion` → the four motion fields (still = all zero; breathing = breath only; drifting = breath + flow drift).
    - `zones` → nuclei count, auto-arranged on a rule-of-thirds/golden prior (the nuclei layout from a deterministic placement prior, not centered).
    - Every output field CLAMPED to its `budget.ts` cap — `resolveAtoms` is TOTAL (no input yields an invalid config).
  - **The configurator disclosure (`demo/stories/aurora/*`).** The aurora configurator story shows the ≤7 atoms by default; the full `AuroraConfig` surface lives under an "Advanced" `Collapsible`/disclosure (progressive disclosure). Consume glass-ui's `Configurator`/`ConfiguratorLayer` — no new primitive.
  - **Exports (`index.ts` + `src/api/index.ts`).** Export `resolveAtoms`, `AuroraAtoms`, `DEFAULT_ATOMS`; register `AuroraAtoms` on the `@mkbabb/glass-ui/api` canonical types surface.
- **Files**: `composables/atoms.ts` (create — the `resolveAtoms` mapper), `presets.ts` (modify), `index.ts` (modify), `src/api/index.ts` (modify), `atoms.test.ts` (create), `DESIGN.md` (modify), `demo/stories/aurora/*` (modify), `scripts/proof-aurora-atoms-roundtrip.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-atoms-roundtrip` GREEN + bite-verified — assert `resolveAtoms` is a total function (a fuzz over every atom-combination matrix produces a valid in-range `AuroraConfig` respecting every `budget.ts` cap — no NaN, no out-of-range field) AND `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG`. Bite: change a `DEFAULT_ATOMS` value so the default no longer resolves to the wispy-sky default → RED; OR remove a `budget.ts` clamp so a vivid×6-zone combination overflows → RED. `atoms.test.ts` green under `vitest run`. Pure-TS, WebGL2-ships now.

## 6. Hard Gate

W6 closes when every condition below is evidence-backed:

1. **AW.W6.1** — `resolveAtoms(atoms) → AuroraConfig` is a pure, total mapper over the ≤7 Tier-1 atoms (seed, harmony, mood, medium, textureAmount, motion, zones); `AuroraAtoms` + `DEFAULT_ATOMS` are defined and exported (+ `AuroraAtoms` on `@mkbabb/glass-ui/api`). `proof:aurora-atoms-roundtrip` GREEN + bite-verified (total-function fuzz + default-roundtrip; the two bites RED).
2. **The default atoms resolve to the wispy-sky default** — `resolveAtoms(DEFAULT_ATOMS)` deep-equals `DEFAULT_AURORA_CONFIG` (machine-asserted in the gate). `DEFAULT_AURORA_CONFIG`'s values are byte-unchanged.
3. **The full schema is preserved** — `AuroraConfig` is UNCHANGED (no field removed); the atoms are a thin surface over it; the configurator's "Advanced" disclosure exposes the full surface.
4. **No shader change** — every shader partial is byte-unchanged (pure-TS wave); the existing shader gates (`proof:aurora-space-gamma`, `proof:single-color-core`) GREEN.
5. **No new glass-ui primitive** — the two-tier disclosure is built from the shipped `Configurator`/`Collapsible`; no new component in `src/components/ui/`.
6. **The budget caps are RESPECTED, not raised** — `budget.ts` byte-unchanged; `resolveAtoms` clamps every output to the existing caps.
7. **No regression.** The existing gate matrix stays GREEN: `npm run typecheck`, `npm run build`, the aurora unit suite, the public-API gates (`verify-export-types`, `proof:resolution` — the new exports resolve through the subpath). `PROGRESS.md` records the green run id + the roundtrip result.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:aurora-atoms-roundtrip` | `scripts/proof-aurora-atoms-roundtrip.mjs` | `["local","ci"]` | break a `DEFAULT_ATOMS` value (default ≠ wispy-sky) → RED; OR remove a `budget.ts` clamp so a vivid×6-zone combination overflows → RED |

Follows the house gate template (`scripts/proof-aurora-space-gamma.mjs`): a vitest-driven total-function fuzz + the deep-equal roundtrip over the TS atom path, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on violation. Register in `package.json` + `gates.mjs` ONLY after the mapper lands (`gates:verify-ci` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after the mapper + the type land and at close.
- `npm run build` — after the new exports land (the subpath chunk re-emits) and at close.
- `proof:aurora-atoms-roundtrip` + `npm run verify-export-types` + `npm run proof:resolution` (the new exports resolve) + the no-regression existing-gate matrix — at close.
- `vitest run src/components/custom/aurora/__tests__/atoms.test.ts` — after the mapper.
- `git diff --check` on `DESIGN.md` + `PROGRESS.md` at close.

No formatter is intentionally skipped; the roundtrip gate (total-function + default-preservation) is the binding evidence; the demo configurator is the visual evidence (the ≤7 atoms shown, the Advanced disclosure collapsed).

## 8. Verification Artefacts

- The `proof:aurora-atoms-roundtrip` JSON gate artefact (byte-stable) — born-RED (pre-mapper) AND green (post-mapper).
- The `atoms.test.ts` run output (the total-function fuzz over the atom-combination matrix + the default-roundtrip deep-equal) green.
- The aurora configurator demo story screenshot (the ≤7 atoms shown, the "Advanced" disclosure collapsed) — recorded in `PROGRESS.md`.
- DESIGN.md the two-tier options note + the atom→config mapping table + the "default atoms = wispy-sky default" invariant.
- The green CI run id + integration commit hash + the `verify-export-types`/`proof:resolution` pass (the new exports resolve) — `docs/tranches/AW/PROGRESS.md`.

## 9. Commit Plan

- **AW.W6.1 implementation commit** — `feat(tranche-AW): W6 — aurora resolveAtoms ≤7-atom door + two-tier configurator disclosure + born-RED proof:aurora-atoms-roundtrip` (body: the seven atoms, the mood-fan, the rule-of-thirds zone prior, the total-function contract, the default-atoms = wispy-sky invariant, the progressive-disclosure model, the `@mkbabb/glass-ui/api` registration).
- **Orchestrator integration + docs commit** — `docs(tranche-AW): W6 close — DESIGN.md two-tier options + PROGRESS green run id + roundtrip result` (body: status/close).

## 10. Dependencies

- **Depends on**: **AW.W4** (the `AuroraMedium` union with `vangogh`/`oil-pastel`) + **AW.W5** (the `AuroraHarmony` union with split-comp/tetrad + `deriveAurora`/`deriveScene`). The `medium`/`harmony`/`seed` atoms enumerate/route through them; the wave opens after both integrate so the atom mapper resolves the final medium/harmony set in one pass. (If W4/W5 slip, W6 could open at HEAD against the current set and re-sync — but the clean path is after.)
- **Blocks**: nothing in the aurora arc. The README (the AW aurora README, this wave's docs sibling) documents the atom door; the consumer-facing simplification is the door H (slides) and other consumers reach for.

**No deferred fold** — the options simplification is complete in one wave (the full schema stays whole as the escape hatch; the atoms are the door). The rule-of-thirds nuclei auto-arrangement is a deterministic placement prior inside `resolveAtoms`, not a separate primitive.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The options-complexity gap is named in PATH-FORWARD §3: the config is ~28 fields (`presets.ts:68-106`); the configurator exposes nearly all of them across six tabs — a surface for *an author tuning a shader*, not *a consumer choosing a backdrop*. The fix is the two-tier "atoms of control" model (a thin consumer surface over the full author schema — nothing removed from `AuroraConfig`). The technique is the Stripe/paper.design productized two-tier control surface (gradient-stripe README; shaders.paper.design/grain-gradient — ~4-7 knobs shown, the full surface revealed) + progressive disclosure (UXPin — show essentials, reveal complexity on demand). The wispy-sky default (`DEFAULT_AURORA_CONFIG`, `presets.ts:148`, `medium:"smooth"`) is the canonical default the user explicitly asked to preserve — the default atoms resolve to it (machine-asserted), the gap between "author schema" and "consumer door" closed without deleting expressive power. All accessed 2026-06-06.
