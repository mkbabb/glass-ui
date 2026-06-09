# AY.W-COLOCATE — Feature-dir colocation pattern + the localized design-idiom HOME

**Tranche** AY (glass-ui) · **Band** F (cohesion + structure) · **Kind** refactor (the BIG reading of the directive — a STRUCTURAL feature-dir convention + a design-idiom home, NOT a line-count split) · **State** OPEN

## State

**Name**: W-COLOCATE — Feature-dir colocation pattern + the localized design-idiom HOME
**Opens after**: AY.W-GOD1 (the four god-modules are carved <500 + the `Use<Name>Return` interfaces named + `proof:no-god-module` CI-promoted) AND AY.W-CSS1 (the `.css`-aware god-module gate + the cohesion-aware `@import`-partial carve of tokens/utilities/glass.css land; W-COLOCATE consumes the partial-carve precedent, it does NOT re-carve the central stylesheets). W-COLOCATE is the THIRD, structural step over the same surface — W-GOD1 carves logic, W-CSS1 carves the central CSS, W-COLOCATE makes the carved dirs CONFORM to ONE convention + names the idiom home. The three run in SERIES on the carved dirs (never in parallel — they share write scope on `src/components/custom/{goo-blob,constellation,tabs,dock}/` and `src/styles/`).
**Agents**: 1 serial primary (the convention + gate authoring + the idiom-home doc) — the carve is mechanical-but-cross-cutting and a single writer avoids barrel-rewrite races; the design-idiom-home document is the same agent (it cites the W-CSS1 partial carve it builds on).
**Hard gate**: `proof:colocation` (NET-NEW, registered `local`+`ci`, born-RED on the current inconsistent tree, flipped GREEN by the carve) asserts the feature-dir convention over the four carved god-module dirs (every `>500`-origin dir has its composables under `composables/`, its constants under a named `constants.ts` extracted from inline magic-numbers, its shaders/skeletons co-located, and a `README.md`); `docs/precepts/design-idioms.md` exists, is cited by `CONTRIBUTING.md` + `src/styles/index.css`, and enumerates the `@theme`/`@utility`/`@apply` idiom home with its cohesion-aware-partial composition rule; `npm run build` emits a `/styles` bundle byte-equivalent to the pre-wave bundle (zero CSS-output delta) AND a per-subpath JS chunk set whose EXPORT set is byte-identical to the pre-wave `dist/*.d.ts` (the public-surface no-delta proof, via `verify-export-types` + a dist export-name diff); `proof:no-god-module` + `proof:composable-return-types` + `proof:blob-render` + `proof:blob-color-equivalence` + `proof:constellation-warp-live` + `proof:tabs-unified` + `proof:dock-unify` stay GREEN across the restructure.
**Status**: planned

## Goal criterion

glass-ui's carved-from-god-module component packages speak ONE structural language — a feature-dir convention the user named verbatim: *"Complex components should be structured into sub-component dirs with components, composeables, constants, skeletons, thereof, if needed"* and *"Components and composeables should be colocated together when befitting."* Today the convention is HALF-LANDED and INCONSISTENT — `goo-blob`/`dock`/`tabs` already nest a `composables/` subdir (and `goo-blob` a `shaders/` subdir), but `constellation` is FLAT (its 510-line `constellationField.ts` sits at the package root, no `composables/`), zero package carries a `constants.ts` (every magic-number lives inline at the top of a composable — `MAX_SATS`/`TRAIL_N`/`POS_SCALE` in `useMetaballRenderer.ts:16-32`, `BASE_WIDTH`/`WARP_*` in `constellationField.ts:21,286-290`), and zero package carries a skeleton. The wave lands the convention CONSISTENTLY over exactly the four carved god-module dirs — composables under `composables/`, constants extracted to `constants.ts`, shaders/skeletons co-located when present — and DOCUMENTS the rule so the next complex component is built to it, not retro-fitted.

Paired with this, the design-idiom HOME the user asked for (*"we should have a localized area that defines all of our design idioms — but still leverages proper colocation"*) gets a SINGLE documented home: a `docs/precepts/design-idioms.md` that enumerates where each Tailwind-v4 idiom LIVES (`@theme` aliases in `theme.css`, `@utility` recipes scattered across `typography.css`/`utilities.css`/`glass.css`/`cards.css`/`paper.css`/`dock-controls.css`/`instrument-chassis.css`, `@apply` composition sites), names the cohesion-aware `@import`-partial rule (the dock.css/W-CSS1 precedent — carve by §-cohesion, preserve cascade order, NEVER a naive 500-line chop), and is CITED from `CONTRIBUTING.md` + the `src/styles/index.css` cascade header so a contributor finds the idiom home from the entry points they already read. The home is DOCUMENTED + the cascade COMPOSED through it — it does not re-locate the idioms (that would break the cascade order W-CSS1 just preserved); it makes the existing localization legible + binding.

A fresh contributor reading `CONTRIBUTING.md` can answer "where do composables/constants/skeletons go for a complex component?" and "where do I add a new `@utility` or `@theme` alias?" from the docs alone, and `proof:colocation` reds the moment a carved dir drifts off the convention.

A wave whose `proof:colocation` passes but whose goal is unmet — e.g. the dirs conform but the public-surface byte-equivalence proof was skipped, or the idiom-home doc is a stub that does not actually enumerate the `@utility`/`@theme` homes — closes `complete_with_misses`, not `complete`.

## Defect (verified, file:line)

The user's directive has TWO halves; AY's W-GOD1 (the line-count carve) and W-CSS1 (the central-CSS carve) are the SMALL reading of each and leave the STRUCTURAL convention + the idiom-home axis unaddressed. Verified against HEAD on `at-dock-convergence`:

### D1 — the colocation convention is HALF-LANDED and INCONSISTENT across the four carved dirs

The four god-modules (per H-godmodule F1, line counts unchanged since the AX ledger) live in dirs with DIVERGENT structure:

| dir | composables/ | shaders/ | constants.ts | skeleton | README.md |
|---|---|---|---|---|---|
| `src/components/custom/goo-blob/` | **YES** (`useMetaballRenderer.ts`, `useBlobMood.ts`, `useBlobPointer.ts`, `useBlobSatellites.ts`, `easing.ts`) | **YES** (`metaball.frag.ts` + 4) | **NO** (inline `MAX_SATS`/`TRAIL_N`/`MAX_BLOB_STOPS`/`POS_SCALE`/`UNIFORM_NAMES` at `useMetaballRenderer.ts:16-34`) | NO | YES |
| `src/components/custom/dock/` | **YES** (`useDockState.ts`, `useDockHold.ts`, `useLayerTransition.ts`, `dockContext.ts` + 2 ctx) | n/a | **NO** | NO | YES |
| `src/components/custom/tabs/` | **YES** (`useTabIndicator.ts`) | n/a | **NO** | NO | NO |
| `src/components/custom/constellation/` | **NO — FLAT** (`constellationField.ts` at package root, the cleanest function-family carve candidate per F1) | n/a | **NO** (inline `BASE_WIDTH`/`DEFAULT_PALETTE` exported; `WARP_RESPONSE`/`WARP_ZETA`/`WARP_OMEGA`/`WARP_DT_CLAMP` at `:286-290`) | NO | YES |

Confirmed by directory listing:
- `find src/components/custom -name "constants.ts"` → **0 results** (no package extracts its magic-numbers).
- `find src/components/custom -iname "*skeleton*"` → **0 results**.
- 7 of 35 `custom/` dirs nest `composables/`; 28 are flat. `constellation` is flat DESPITE owning a 510-line non-component module — exactly the "complex component, no sub-component-dir" case the directive names.

The inconsistency is the defect: the user asked for ONE convention ("structured into sub-component dirs with components, composeables, constants, skeletons, thereof, if needed"), and the four most-complex packages each implement a DIFFERENT subset of it. W-GOD1's "carve <500" makes the FILES small but does NOT make the DIRS conform — a 510→two-files-of-260 carve that leaves both at the package root is still off the convention. This is the BIG reading W-GOD1 explicitly does not cover (AY.md:200 — "W-GOD1's line-count split is the SMALL reading").

### D2 — there is NO localized design-idiom HOME; the idioms are scattered + undocumented

The Tailwind-v4 design idioms (`@theme`/`@utility`/`@apply`) are spread across 7+ `src/styles/` files with NO single documented home and NO contributor-facing rule for where a new one goes:

- `@utility` definitions: **28** in `typography.css`, **16** in `utilities.css`, **5** in `glass.css`, **3** in `paper.css`, **2** in `dock-controls.css`, **1** each in `instrument-chassis.css` + `cards.css` (verified by `grep -c "@utility"`).
- `@apply` composition sites: 4 in `glass.css`, 3 in `utilities.css`, 2 each in `instrument-rail.css` + `instrument-chassis.css`, 1 in `floating-panel.css`.
- `@theme` alias block: `theme.css` (the Tailwind color/font/radius bridge).
- `src/styles/index.css:38-114` documents the CASCADE ORDER (load-bearing, per L.W2 Lane B) — but it is a load-ORDER ledger, NOT a "here is where each IDIOM lives + where a new one goes" home. A contributor adding a `@utility` has no documented answer for which file it belongs in.
- `grep -rln "design idiom\|design-idiom\|idiom home"` over `src/` + `docs/precepts/` → **0 results** (the one timeline hit is unrelated prose). The directive's "localized area that defines all of our design idioms" does NOT exist.

W-CSS1's hard gate (AY.md:183) is "the `.css`-aware gate + the cohesion-aware partial carve + the var-in-arbitrary rule" — it bounds file SIZE and encodes the var syntax rule, but it does NOT author the idiom-HOME document or the "where does a new idiom go" convention. This is the under-specced axis H-past-conversation §c flagged ("AY's W-CSS1 ... does not address the 'localized design-idiom area + colocation' axis").

### Stale-base context (do NOT re-litigate — coordinate with W-GOD1/W-CSS1)

- The `composables/` colocation precedent ALREADY EXISTS (goo-blob/dock/tabs) — this wave EXTENDS it to constellation + adds the missing `constants.ts`, it does NOT invent the pattern.
- The cohesion-aware `@import`-partial precedent ALREADY EXISTS (`src/styles/dock/{shell,morph,density,layers,layer-group,overflow}.css` — the AX.W06 carve, all in one `@layer components` so the cascade is isomorphic; documented at `index.css:63-79`). W-CSS1 applies it to tokens/utilities/glass.css. This wave DOCUMENTS that rule as the idiom-home composition discipline — it does NOT re-carve the central CSS (W-CSS1's scope).
- The god-module CARVE (logic <500) is W-GOD1's; the central-CSS carve is W-CSS1's. W-COLOCATE runs AFTER both and operates on the ALREADY-CARVED dirs: it RELOCATES the carved sub-modules into `composables/` (constellation) + extracts `constants.ts` + writes the convention doc + the idiom-home doc. It must NOT change any public export (the no-delta proof).
- The `proof:no-god-module` `.css`-blindness + the orphan `proof:composable-return-types` are W-GOD1/W-CSS1 concerns; this wave only ASSERTS they stay green (it does not author them).

## Scope

1. **Land the feature-dir convention CONSISTENTLY over the four carved god-module dirs** (`goo-blob`, `dock`, `tabs`, `constellation`):
   - **constellation**: relocate the carved `constellationField.ts` modules into `src/components/custom/constellation/composables/` (the W-GOD1 carve produces ≥2 sub-modules from the 510-line module; e.g. `field.ts` for seed/step + `warp.ts` for the warp family + `draw.ts` for the draw-fn family — the exact split is W-GOD1's, this wave RELOCATES whatever it produces under `composables/`). The package `index.ts` re-exports through the relocated paths with ZERO export-name change.
   - **constants extraction**: for each of the four packages, extract the inline module-scope magic-number constants into a co-located `constants.ts` — `goo-blob/constants.ts` (`MAX_SATS`, `TRAIL_N`, `MAX_BLOB_STOPS`, `POS_SCALE`, `UNIFORM_NAMES`, `BLOB_LABEL` from `useMetaballRenderer.ts:16-34`), `constellation/constants.ts` (`BASE_WIDTH`, `DEFAULT_PALETTE`, `WARP_RESPONSE`, `WARP_ZETA`, `WARP_OMEGA`, `WARP_DT_CLAMP`), and the dock/tabs equivalents where they exist. The composables import from `./constants` (or `../constants`); the PUBLIC re-exports of `BASE_WIDTH`/`DEFAULT_PALETTE`/`BLOB_CONFIG_DEFAULTS` etc. stay byte-identical at the package barrel.
   - **shaders/skeletons**: `goo-blob/shaders/` already conforms (keep). No skeleton is invented (the directive says "thereof, **if needed**" — none of the four needs a loading skeleton; the gate does NOT require a skeleton, it requires that IF a package ships skeleton/shader assets they are co-located in a named subdir — goo-blob's `shaders/` is the worked example).
   - **README**: `tabs/` lacks a `README.md` (the only one of the four without) — author it to the bar of the existing three (goo-blob/dock/constellation READMEs).
2. **Author the design-idiom HOME** at `docs/precepts/design-idioms.md`: a single doc that (a) enumerates each Tailwind-v4 idiom's home — `@theme` aliases → `theme.css`; `@utility` recipes → the named files (typography/utilities/glass/cards/paper/dock-controls/instrument-chassis) WITH the rule for which file a NEW utility belongs in (by cohesion-domain, not arbitrarily); `@apply` composition discipline; (b) states the cohesion-aware `@import`-partial rule (the dock.css/W-CSS1 precedent — carve by §-section into partials in ONE `@layer`, preserve cascade order, assert import-order, NEVER a naive line-chop); (c) names the colocation convention's CSS half — where a per-component scoped style lives (SFC `<style scoped>` vs a central partial) and the rule for choosing.
3. **Compose the idiom home into the entry points**: cite `docs/precepts/design-idioms.md` from `CONTRIBUTING.md` (the "Conventions" section, alongside the existing CLAUDE.md cross-ref) AND from the `src/styles/index.css` cascade header (the cascade ledger gains a one-line pointer to the idiom-home doc that explains WHERE each idiom lives, complementing the load-ORDER it already documents).
4. **Author `proof:colocation`** (NET-NEW gate, `scripts/proof-colocation.mjs`, registered in `gates.mjs` with `tags: ["local", "ci"]`, wired into `package.json` scripts as `proof:colocation`) that asserts the convention over the four carved dirs (the §6 gate clauses) — born-RED on the current tree (constellation flat, no `constants.ts`, tabs README absent), flipped GREEN by the carve.
5. **Prove no public-surface delta**: capture the pre-wave `dist/*.d.ts` export-name set, run the restructure, rebuild, diff — the export set is byte-identical (a pure re-export-path-only diff). Capture the pre-wave `/styles` CSS bundle hash, rebuild, confirm byte-equivalence (this wave touches NO CSS rule — only the index.css cascade-header comment + the new doc; the bundle output is unchanged).
6. **Document the convention in CLAUDE.md**: the Structure section gains a one-line statement of the feature-dir colocation convention (components+composables under `composables/`+constants under `constants.ts`+co-located shaders/skeletons) with a cross-ref to `design-idioms.md` — replacing no existing prose, appending the convention to the existing `custom/` package description.

## 3a. Triumvirate Dispatch

- **Scope-reveal — the carve moved the target**: if W-GOD1's constellation carve produced a sub-module split that does not cleanly relocate under `composables/` (e.g. it left a component-coupled module that belongs at package root, not in `composables/`), the file-bounds are invalidated — the scope-reveal trigger fires; the orchestrator triumvirates (research the carved shape, amend the relocation map, redress). This wave does NOT re-carve; if the carve is wrong it routes BACK to W-GOD1.
- **Public-surface delta detected**: if the export-name diff (edit-site 5) shows ANY added/removed/renamed export, the restructure broke the public surface — this is a hard-stop, NOT local-recoverable by re-running; the orchestrator triumvirates (the relocation introduced a barrel error) before any close.
- **Diagnostic loop on the idiom-home composition**: if the design-idioms.md ↔ cascade-order reconciliation iterates THREE times without a coherent home (the idiom localization genuinely conflicts with the cascade order W-CSS1 set), halt — escalate to the orchestrator: the idiom home is DOCUMENTED-as-is (the cascade order wins; the doc records the as-built localization) rather than re-localized (re-locating idioms would break the cascade W-CSS1 preserved — that is out of scope).

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/constellation/composables/` (new dir) | create (relocate the W-GOD1-carved sub-modules here) |
| `src/components/custom/constellation/constants.ts` | create (extract `BASE_WIDTH`/`DEFAULT_PALETTE`/`WARP_*`) |
| `src/components/custom/constellation/index.ts` | modify (re-export paths only — export NAMES byte-identical) |
| `src/components/custom/constellation/constellationField.ts` | delete-or-thin (the W-GOD1 carve already split it; this wave relocates the products + removes the root file if fully relocated) |
| `src/components/custom/goo-blob/constants.ts` | create (extract `MAX_SATS`/`TRAIL_N`/`MAX_BLOB_STOPS`/`POS_SCALE`/`UNIFORM_NAMES`/`BLOB_LABEL`) |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify (import constants from `../constants`; no logic/return-shape change — `proof:composable-return-types` is the lock) |
| `src/components/custom/goo-blob/index.ts` | modify ONLY if a constant was publicly re-exported (keep export names byte-identical) |
| `src/components/custom/dock/constants.ts` | create (if dock has extractable module-scope constants post-carve) |
| `src/components/custom/dock/composables/*.ts` | modify (import from `../constants` if extracted; no return-shape change) |
| `src/components/custom/tabs/constants.ts` | create (if tabs has extractable constants) |
| `src/components/custom/tabs/composables/useTabIndicator.ts` | modify (import from `../constants` if extracted) |
| `src/components/custom/tabs/README.md` | create (to the bar of the other three) |
| `docs/precepts/design-idioms.md` | create (the localized design-idiom HOME) |
| `CONTRIBUTING.md` | modify (cite `design-idioms.md` + state the colocation convention in §Conventions) |
| `src/styles/index.css` | modify (cascade-header comment — add the one-line idiom-home pointer; NO CSS rule change) |
| `CLAUDE.md` | modify (Structure section — one-line colocation convention + cross-ref) |
| `scripts/proof-colocation.mjs` | create (the NET-NEW convention gate) |
| `scripts/gates.mjs` | modify (register `proof:colocation` with `tags:["local","ci"]` + re-emit `ci.yml`) |
| `package.json` | modify (add the `proof:colocation` script key) |
| `.github/workflows/ci.yml` | regenerate (via `gates.mjs --emit-ci` — the `proof:colocation` step appears) |
| `docs/tranches/AY/audit/AUDIT-LEDGER.md` | modify (the colocation row → DONE) |

Do NOT touch: any `<script setup>` LOGIC or composable RETURN SHAPE (W-GOD1 owns the carve + the return-type lock — this wave is relocation + constant-extraction only, the return shapes are frozen by `proof:composable-return-types`); any CSS RULE in `src/styles/*.css` (W-CSS1 owns the central-CSS carve — this wave only adds a comment-line pointer to `index.css`); the `src/styles/dock/*` partials (W-CSS1/AX.W06); the shader assets in `goo-blob/shaders/` (already conforming — keep); the `proof:no-god-module` / `proof:composable-return-types` scripts (W-GOD1's — this wave ASSERTS them green, does not edit them); the central-CSS `@import` partial carve (W-CSS1's).

## 4a. Disjointness

Single primary agent unit — no intra-wave path conflict. Cross-wave: W-COLOCATE shares write scope on `src/components/custom/{goo-blob,constellation,tabs,dock}/` with **W-GOD1** (the carve) and on `src/styles/` with **W-CSS1** (the central-CSS carve) — the State block sequences W-GOD1 → W-CSS1 → W-COLOCATE in SERIES so the four dirs + the stylesheets have ONE writer at a time. W-COLOCATE consumes the carved products + the partial-carve precedent; it never co-writes with either. The `goo-blob` composables are also touched by W-BLOB2 (the drawFrame edit) and constellation by W-CON1/W-CON2 (refitField + warp tune) — those content waves run in earlier batches (Batch 2) and CLOSE before this Batch-4 structural wave opens, so the line counts + the carve targets are settled before relocation. The `tabs` SFC is W-SB3's story-language scope only at the demo layer — no `src/` conflict.

## 5. Agent Units

### AY.W-COLOCATE.1 — Feature-dir convention + design-idiom home + the convention gate

- **Goal**: the four carved god-module dirs conform to ONE feature-dir convention (composables under `composables/`, constants in `constants.ts`, co-located shaders/skeletons, README present); the design-idiom home is documented + composed into the entry points; `proof:colocation` enforces it; zero public-surface delta.
- **Mechanism**:
  - **Relocate constellation**: move the W-GOD1-carved sub-modules into `constellation/composables/`; re-point `index.ts` re-exports to the new paths; delete the root `constellationField.ts` if fully relocated (or thin it to a barrel re-export of the `composables/` products). Verify `index.ts` export NAMES are byte-identical (the warp + draw + field + type exports unchanged).
  - **Extract constants**: for each of the four packages, lift the module-scope magic-number constants into a co-located `constants.ts` and re-import them in the composables via a relative `./constants`/`../constants`. Where a constant is PUBLICLY re-exported (`BASE_WIDTH`, `DEFAULT_PALETTE`, `BLOB_CONFIG_DEFAULTS`), the package `index.ts` re-exports it from `./constants` with the SAME export name — the public surface does not move.
  - **Author the tabs README** to the bar of goo-blob/dock/constellation (the component's variant axis + the indicator mechanism + the colocation map).
  - **Author `docs/precepts/design-idioms.md`**: the idiom-home enumeration (§D2), the cohesion-aware-partial composition rule (the dock.css/W-CSS1 precedent), and the colocation-convention CSS half.
  - **Compose the home**: cite `design-idioms.md` from `CONTRIBUTING.md §Conventions` + the `src/styles/index.css` cascade header (a one-line pointer); state the colocation convention in `CLAUDE.md` Structure.
  - **Author `proof:colocation`** (`scripts/proof-colocation.mjs`): assert the §6 clauses; register in `gates.mjs` `tags:["local","ci"]`; add the `package.json` key; regenerate `ci.yml`.
  - **Prove no-delta**: snapshot the pre-wave `dist/*.d.ts` export-name set + the `/styles` bundle hash (built from the pre-wave HEAD or the W-CSS1-closed base), restructure, rebuild, diff.
- **Files**: per §4 File Bounds.
- **Sub-gate**: `proof:colocation` GREEN over the four dirs; the export-name diff is empty; the `/styles` bundle byte-equivalent; `proof:no-god-module` + `proof:composable-return-types` + `proof:blob-render` + `proof:blob-color-equivalence` + `proof:constellation-warp-live` + `proof:tabs-unified` + `proof:dock-unify` all GREEN; `npm run typecheck` clean; `docs/precepts/design-idioms.md` exists + is cited from both entry points.

## 6. Hard Gate (completion criterion)

The wave closes only when ALL FIVE conditions hold:

1. **The feature-dir convention is LANDED + machine-enforced over the four carved dirs.** `npm run proof:colocation` is GREEN, and `proof-colocation.mjs` asserts, for each of `{goo-blob, constellation, tabs, dock}`: (a) every composable (a file matching `^use[A-Z]` or a `*Context.ts` DI module) lives under `<dir>/composables/` — NOT at the package root (this reds constellation TODAY: `constellationField.ts` at root); (b) a `<dir>/constants.ts` exists AND the package's composables contain NO surviving module-scope `const [A-Z_]{3,} =` magic-number declaration outside `constants.ts` (this reds goo-blob + constellation TODAY); (c) any `*.frag.ts`/`*.vert.ts`/`*.glsl.ts` shader OR `*Skeleton.vue` asset lives in a named `shaders/`/`skeleton/` subdir (goo-blob `shaders/` passes; reds a future root-level shader); (d) a `<dir>/README.md` exists (reds tabs TODAY). The gate is registered in `gates.mjs` with `tags:["local","ci"]` and APPEARS as a step in the regenerated `.github/workflows/ci.yml` (grep the emitted yml for `proof:colocation`). **Bite**: move a composable back to the package root, delete a `constants.ts`, inline a magic-number back into a composable, or delete the tabs README → `proof:colocation` reds; CI bites (it is `ci`-tagged + emitted). **Born-RED proof**: running the gate on the CURRENT HEAD (pre-carve) exits 1 with ≥4 violations (constellation-flat, goo-blob-no-constants, constellation-no-constants, tabs-no-README) — captured in the wave's PROGRESS entry as the before-state.

2. **The design-idiom HOME exists, enumerates every idiom, and is composed into the entry points.** `docs/precepts/design-idioms.md` exists and contains: (a) the `@theme`-alias home (`theme.css`); (b) the `@utility` home map naming each of the 7 files that own `@utility` recipes + the cohesion-domain rule for placing a NEW utility; (c) the `@apply` composition discipline; (d) the cohesion-aware `@import`-partial rule (the dock.css precedent — §-cohesion carve, one `@layer`, cascade-order-preserved). It is CITED by `CONTRIBUTING.md` (grep `CONTRIBUTING.md` for `design-idioms`) AND by `src/styles/index.css` (grep the cascade header for `design-idioms`). **Bite**: the doc is a stub missing the `@utility`/`@theme` home map, or neither entry point cites it → the manual document-reconciliation check fails (recorded in the gate's doc-presence clause: `proof-colocation.mjs` asserts `docs/precepts/design-idioms.md` is >1 KB AND both `CONTRIBUTING.md` + `src/styles/index.css` contain the literal `design-idioms` reference). **Reconciliation artefact**: a one-line statement in the wave PROGRESS entry that the doc's `@utility` home map enumerates exactly the 7 files `grep -c "@utility"` reports.

3. **ZERO public-surface delta — the restructure is a pure re-export-path diff.** Capture the pre-wave `dist/*.d.ts` export-name set (`node -e` over the built dts, sorted), run the restructure, `npm run build`, and diff the export-name set — the diff is EMPTY. AND `npm run verify-export-types` (the subpath dts publication probe) passes. AND the four touched subpath chunks (`dist/goo-blob.js`, `dist/constellation.js`, `dist/tabs.js`, `dist/dock.js`) export the same named symbols as pre-wave. **Bite**: a relocated barrel drops or renames an export → the export-name diff is non-empty → the wave does not close (this is the §3a triumvirate hard-stop). **Artefact**: `docs/tranches/AY/audit/W-COLOCATE-export-diff.txt` showing the empty diff (the deletion/structure proof).

4. **ZERO `/styles` CSS-bundle delta — the wave touches no CSS rule.** Capture the pre-wave `dist/glass-ui.css` (the `/styles` bundle) sha256, run the restructure (which adds only the `index.css` cascade-header COMMENT + the new doc — no CSS rule), `npm run build`, and confirm the new `dist/glass-ui.css` is byte-equivalent (sha256 match) modulo the comment-line. (If the cascade-header comment changes the byte stream, the gate asserts the RULE set is identical — strip comments + whitespace-normalize, compare; a comment-only delta is allowed, a rule delta is forbidden.) **Bite**: any CSS rule moved/added/removed in this wave → the rule-set comparison fails. **Artefact**: the build-diff recorded in the PROGRESS entry (the build-output proof).

5. **Every coexisting structural + behavioral gate stays GREEN across the restructure.** `npm run typecheck` (vue-tsc --noEmit) clean; `proof:no-god-module` GREEN (the relocation does not bloat any file back over 500); `proof:composable-return-types` GREEN (the constant-extraction + relocation preserved every `Use<Name>Return` shape — the W-GOD1-named interfaces are untouched); `proof:blob-render` + `proof:blob-color-equivalence` GREEN (the goo-blob constant-extraction did not change a rendered value — the constants are the SAME numbers, now imported); `proof:constellation-warp-live` GREEN (the relocated warp module still drives `field.warp.{x,y}` per frame); `proof:tabs-unified` + `proof:dock-unify` GREEN. **Bite**: any of these reds → the restructure changed behavior (not a pure structural move) → the wave does not close. **Artefact**: the proof-gate run logs (JSON via `gate-output.mjs`) attached to the close commit.

**Named successor on any miss**: if the export-name diff (condition 3) is non-empty and the cause is a W-GOD1 carve artefact (a sub-module that cannot relocate without a barrel change), the relocation routes BACK to W-GOD1 (re-carve), not patched here. If the design-idiom-home doc (condition 2) reveals a genuine idiom localization that CONFLICTS with the cascade order (re-locating an idiom would break the cascade W-CSS1 set), the doc records the as-built localization (the cascade wins) and the "re-localize the idiom" remainder is RETIRED with rationale (out of scope — cascade order is binding) rather than deferred. If `proof:colocation` cannot be CI-promoted because a fourth-dir relocation is genuinely blocked, the wave closes `complete_with_misses` with the gate `local`-tagged + the named successor the AY close (`proof:ay-final`'s structural-completeness clause).

## 7. Format And Lint Cadence

- `npm run typecheck` (vue-tsc --noEmit) after the relocation + constant-extraction (the import-path rewrites are the risk surface) and before close.
- `npm run proof:colocation` after the carve (the source-arm convention gate) and at close; capture the born-RED pre-carve run for the PROGRESS before-state.
- `npm run build` twice — once to snapshot the pre-wave dist export-set + `/styles` hash, once post-restructure for the no-delta diffs (conditions 3 + 4).
- `npm run verify-export-types` (the subpath dts publication probe) at close.
- The coexisting gates (`proof:no-god-module`, `proof:composable-return-types`, `proof:blob-render`, `proof:blob-color-equivalence`, `proof:constellation-warp-live`, `proof:tabs-unified`, `proof:dock-unify`) at close.
- `git diff --check` for the doc edits (`design-idioms.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `index.css` comment, README, AUDIT-LEDGER).
- Lint: `npm run lint` over `scripts/proof-colocation.mjs` (the new gate script is the only net-new JS/TS-logic surface — the package edits are import-path moves + constant declarations, validated by typecheck; the gate script's own run validates its logic).

## 8. Verification Artefacts

- `docs/tranches/AY/audit/W-COLOCATE-export-diff.txt` — the EMPTY public-surface export-name diff (the structure proof).
- The born-RED `proof:colocation` pre-carve run log (≥4 violations) + the GREEN post-carve run log (the gate's before/after).
- The `/styles` bundle sha256 before/after (the build-diff proof; rule-set byte-equivalence).
- `docs/precepts/design-idioms.md` — the localized design-idiom home (the document-presence artefact).
- The coexisting proof-gate JSON outputs (no-god-module / composable-return-types / blob-render / blob-color-equivalence / constellation-warp-live / tabs-unified / dock-unify).
- `.github/workflows/ci.yml` diff showing the `proof:colocation` step appended (the CI-promotion proof).
- The commit SHA of the close.

## 9. Commit Plan

- One orchestrator integration commit at close (single agent, structural-only surface): `refactor(structure): feature-dir colocation convention over the carved god-modules + the localized design-idiom home (AY.W-COLOCATE)`. Commit body REQUIRED (it lands a convention + a new gate): name the relocation (constellation → `composables/`), the four `constants.ts` extractions, the `design-idioms.md` home + its two citation sites, the `proof:colocation` CI-promotion, and the empty export-diff + byte-equivalent `/styles` proofs.
- The export-diff + the design-idioms doc commit with the same close commit (the no-delta proof is the evidence the commit asserts).
- No agent-owned worktree commits (single serial agent on the W-CSS1-closed base).

## 10. Dependencies

- **Depends on**: AY.W-GOD1 (the four god-modules carved <500 + the `Use<Name>Return` interfaces named + `proof:no-god-module` CI-promoted — this wave relocates the carved products); AY.W-CSS1 (the cohesion-aware `@import`-partial carve of tokens/utilities/glass.css + the `.css`-aware gate — this wave documents that precedent as the idiom-home composition rule); AY.W-CON1/W-CON2 + W-BLOB2 (the content waves that move the constellation/goo-blob line counts — closed in Batch 2 before this Batch-4 structural wave).
- **Blocks**: AY.W-CLOSE1 (`proof:ay-final`'s structural-completeness clause reads `proof:colocation` GREEN); the overfitting audit (W-CLOSE1) verifies every new `constants.ts` / `composables/` relocation has ≥2 sites or is a private extraction of an existing public constant — the colocation must not introduce an orphan.

## 11. Archaeology

The colocation convention half-landed organically — `goo-blob`/`dock`/`tabs` grew a `composables/` subdir as their composable count crossed ~3, but the convention was never NAMED, so `constellation` (a single large non-component module) stayed flat and no package ever extracted a `constants.ts`. The AX.W06 dock.css carve (`src/styles/dock/*`) is the cohesion-aware-partial precedent on the CSS side — it proved a god-module CSS file carves cleanly into single-axis `@import` partials in one `@layer` without a cascade-order break, and W-CSS1 generalizes it to the central stylesheets. This wave is the THIRD structural step (after W-GOD1's logic carve + W-CSS1's CSS carve): it makes the carved dirs speak ONE convention + names the idiom home the user asked for, so the next complex component is built to the convention rather than retro-fitted. New guardrail: `proof:colocation` is the forcing function — a future package that grows a root-level composable or inlines a magic-number block reds the gate; the convention cannot silently drift the way it did pre-AY. The directive's "if needed" is honored literally — no skeleton is invented for the four (none needs one); the gate enforces co-LOCATION of skeleton/shader assets WHEN present, not their existence.
