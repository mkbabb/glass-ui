# AW.W31 - Animation-language coherence + DESIGN.md currency + naming consistency

## State

**Name**: W31 - Animation-language coherence + DESIGN.md currency + naming consistency
**Opens after**: the animated-surface bands land their retunes — W1-W3 (dock motion), W4-W11 (aurora/blob), W25 (`.tap-squish`/press parity). W31 reconciles the *language* across them once each band has set its own clock; it does not re-tune any single band.
**Agents**: 3 parallel (W31.a animation-coherence · W31.b DESIGN.md currency · W31.c naming consistency)
**Hard gate**: `proof:animation-coherence` (ONE motion-token source — every `--spring-*`/`--scale-press*`/`.tap-squish` channel on the animated surfaces resolves from `scripts/regen-spring-tokens.mjs` + the `tokens.css` press cohort, and NO hand-rolled `cubic-bezier()`/`linear()`/inline ζ survives on the dock/aurora/blob/primitive animated surfaces) + `proof:design-md-current` (`src/components/custom/aurora/DESIGN.md` reflects the post-AW aurora — the W5 shared-color splice, the W4 painterly mediums, the W7 WebGPU/multi-pass relaxation — with no stale single-pass/`color.ts`-local invariant) + `proof:naming-consistency` (every `AW.W<N>` wave header matches the `# AW.W<N> - <Title>` Title-case-hyphen form, the charter §2 headlines match their wave files, and no `src/`-or-other-wave-doc cites the phantom `--glass-edge-light-{wash..overlay}` family).
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, the four animated surfaces (dock, aurora, blob, the `ui/` primitives) speak ONE motion language — every spring reads from the single `regen-spring-tokens.mjs` → `--spring-*` source, every press reads the `--scale-press*` cohort through `.tap-squish`, and no hand-rolled easing survives the W2/W3/W25 sweeps — AND the aurora `DESIGN.md` is current with the post-AW shape (it is the design document of record, distinct from the W33 README that documents the consumer contract), AND component/file/token/gate naming + wave verbiage are consistent across the tranche per a documented convention. This is a RECONCILE wave over surfaces the prior waves already retuned; it mints no new motion primitive and no new component.

## 3. Scope

This is a coherence/reconcile/docs wave. The dock, aurora, blob, and `ui/` primitives are ALREADY-SHIPPED surfaces with consumers; W1-W3/W4-W11/W25 retuned each in isolation. W31 does NOT mint a new motion primitive, a new spring preset, or a second consumer — it audits that the bands converged onto the ONE existing token source and folds the residual forks the cogency audit found. The DESIGN.md and naming arms are pure documentation.

1. **Resolve the residual motion forks the audit flagged.** Sweep the four animated surfaces for any easing authority that is NOT the `regen-spring-tokens.mjs` → `--spring-*` source or the `--scale-press*` press cohort:
   - the dock `useLayerTransition.ts` residual — verify W2 left no hand-rolled inline ζ / literal `cubic-bezier()` on the composable's spring construction and that the `TabsIndicator` rail (`dock.css:835`) reads the retuned `--dock-motion-resize` (= `--spring-dock`) token, carrying no stale literal easing (the audit's Lane 1 δ / Band-A Finding);
   - any hand-rolled `cubic-bezier()`/`linear()` literal on the aurora/blob CSS host or the dock controls that survived the W2/W3/W25 sweeps (the W2 opacity-companion path, the W3 rail/stagger/hover-scale folds, the W25 `.tap-squish`/`--scale-press` press canon);
   - the `.tap-squish` press idiom (`utilities.css:201`) and the dock/button/slider press recipes all resolve through the `--scale-press` (0.96) / `--scale-press-sm` (0.97) / `--scale-press-dock` cohort and the `--spring-snappy` release-spring — ONE press vocabulary, no per-atom literal scale or per-atom easing.
   This is the audit fold: "any hand-rolled easing surviving the W2/W3/W25 sweeps" + "the dock `useLayerTransition` residual" (cogency-audit §"fold into existing dock/aurora/blob animation-language waves").

2. **Mint `proof:animation-coherence` (born-RED).** A static-analysis gate over the animated-surface file set (`src/components/custom/dock/**`, `aurora/**`, `goo-blob/**`, the `ui/` press recipes in `src/styles/utilities.css`, `dock.css`, `dock-controls.css`) that:
   - asserts the ONLY spring-token source is `scripts/regen-spring-tokens.mjs` (the `--spring-*` block in `tokens.css` is generator-equal — it composes with, does not duplicate, `proof:spring-tokens-synced`);
   - asserts NO raw `cubic-bezier(` or `linear(` literal appears on an animated-surface property OUTSIDE the generated `--spring-*` block (i.e. no hand-rolled spring/easing on the dock/aurora/blob/primitive transition/animation declarations);
   - asserts every press surface (`.tap-squish`, the button/slider/dock-icon press recipes) resolves `scale:` from a `--scale-press*` var, never a literal `0.9x`.
   Born-RED witness: at HEAD (pre-sweep) at least one residual literal exists on an animated surface (the gate names the file:line); GREEN after W31.a folds it onto the token cohort.

3. **Bring `src/components/custom/aurora/DESIGN.md` current with the post-AW aurora.** The doc is at v4.1 (2026-04), authored BEFORE the AW aurora band. Three post-AW deltas make it stale:
   - **§7 + §9 color home moved.** v4.1 names `oklchToLinear()`/`flattenPalette()` in `composables/color.ts` (local). AW.W5 splices the OKLCh matrices into the SHARED `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the chunk aurora + blob both consume — the single-color-core contract `proof:single-color-core` freezes). DESIGN.md must name the shared chunk as the OKLCh source and the in-shader OKLCh interpolation arm (W5.1), not only the CPU `color.ts` flatten.
   - **§2 invariant 8 + §3 non-invariant "no multi-pass" relaxed.** v4.1 invariant 8 reads "Single draw, single shader, zero deps" and §3 lists "No multi-pass pipelines." AW.W7 is the HINGE wave that RELAXES the single-pass constraint: it stages a WebGPU-first `createGPUCanvas` substrate with a tested WebGL2 single-pass fallback, a WGSL color/noise twin gated to its GLSL twin at 1e-6, and multi-pass painterly passes (smoothed structure tensor + anisotropic Kuwahara) on the WebGPU path. DESIGN.md must re-state invariant 8 as the FALLBACK contract (WebGL2 stays single-pass-universal) and record the WebGPU multi-pass as the capability-gated enhancement (not a violated invariant).
   - **§2/§4 painterly mediums extended.** AW.W4 adds the structure-tensor/ETF orientation field, real impasto (height→normal→relit), the van-Gogh atomic-stroke medium, and the reworked oil-pastel medium. DESIGN.md's `medium`/`strokeMode` axis (§2.4, §4 step 2) must name the new mediums and the tensor-orientation `strokeOrient:"tensor"` axis.
   Bump the doc to v5.0 (the post-AW cut) with a §"Spec deltas (v4.1 → v5.0)" block citing W4/W5/W7. This is the DESIGN.md the audit fold "DESIGN.md currency → fold into close/docs waves" names; W33 owns the consumer READMEs, W31 owns the DESIGN document of record.

4. **Confirm no other DESIGN.md is stale.** `find src -name DESIGN.md` returns ONLY `aurora/DESIGN.md` at HEAD (the blob ships `goo-blob/README.md`, not a DESIGN.md). The gate asserts the inventory: if a band wave lands a new DESIGN.md (none planned), it joins the currency check; today the aurora doc is the sole currency target. No blob DESIGN.md is minted (overfit guard — the blob's contract lives in its README per W33).

5. **Mint `proof:design-md-current` (born-RED).** A static gate that, for each `src/**/DESIGN.md`, asserts the post-AW currency markers: the aurora doc names the SHARED `procedural-color.glsl.ts` (not only `color.ts`), names the WebGPU/multi-pass relaxation of invariant 8 (the `createGPUCanvas`/WGSL/Kuwahara terms), names the W4 painterly mediums (van-Gogh, structure-tensor, real-impasto), and carries the v5.0 version marker. Born-RED witness: at HEAD the doc is v4.1 + says "Single draw, single shader" + "No multi-pass pipelines" + color in `color.ts` only — the gate fails on the stale markers; GREEN after W31.b rewrites the deltas.

6. **Naming consistency across the tranche (the naming-verbiage fold).** Reconcile the drift the audit's Lane 5 named, recording the CONVENTION (not re-naming shipped src/ symbols, which would break consumers — no-legacy bars an alias, so the shipped names stay; the convention is documented, divergent DOCS are normalized):
   - **Wave-headline style.** The aurora waves W4-W8 carry ALLCAPS-en-dash headlines (`AW.W4 — AURORA-PAINTERLY`); the rest carry Title-case-hyphen (`AW.W1 - Dock ...`). Normalize the charter §2 wave-table headlines + the wave-file `# AW.W<N> -` headers to ONE style: Title-case + ` - ` (hyphen-space), e.g. `AW.W4 - Aurora painterly`. The wave-spec canon (`WAVE_SPEC.md §1`) names `W<N> - <Title>` as the display form — adopt it uniformly.
   - **Component/file naming convention DOCUMENTED.** PascalCase SFC exports (`GlassDock.vue` → `GlassDock`) inside kebab-case package dirs (`dock/`) is the SHIPPED, idiomatic shadcn-vue convention — record it as the rule (a file in `docs/tranches/AW/` naming-convention note or a §in the close FINAL), NOT a rename. The audit's "folder case ≠ export case" is by-design, not a defect.
   - **Token-family naming.** Strike the phantom `--glass-edge-light-{wash..overlay}` per-rung family hedge (it does not exist at HEAD — `tokens.css` carries only `--glass-edge-light` + `--glass-edge-light-dark`); the rim is UNIFORM across rungs by design. Record: no per-rung edge-light family is minted; a future rung-stepped variation is a triumvirate trigger (this overlaps the W22 token-unify note — W31 only confirms the docs consistency, it does NOT touch `glass.css`).
   - **Gate-naming convention.** `proof:<feature>-<descriptor>` is the established pattern; the two W31 gates (`proof:animation-coherence`, `proof:design-md-current`) conform. Confirm no wave file cites a gate id that diverges from its registered name (this composes with the W33 `gates:verify-ci` blocker B4 wave-id reconciliation — W31 confirms the VERBIAGE, W33 confirms the MANIFEST).

7. **Mint `proof:naming-consistency` (born-RED, fold).** A static doc gate that asserts: (a) every `AW.W<N>` wave-file header matches the `# AW.W<N> - <Title>` Title-case-hyphen form (no ALLCAPS-en-dash); (b) the charter §2 wave-table headlines match their wave-file headers (no off-by-one verbiage drift); (c) no `src/` source nor any OTHER AW wave doc cites the phantom `--glass-edge-light-{wash..overlay}` per-rung family (the grep scope EXCLUDES this wave file — `AW.W31-animation-designmd.md` is the doc that NAMES the phantom to reject it, so it is the canonical exemption; a naive whole-tranche substring would self-falsify against this note + W22's rejection note, so the gate exempts a rejection-context citation). Born-RED witness: at HEAD the W4-W8 aurora headers are ALLCAPS-en-dash — the gate fails; GREEN after W31.c normalizes them. (KISS — this is a thin doc-lint, not a third heavy gate; if the orchestrator folds it into `proof:design-md-current`'s doc-scan, that is acceptable per the §6 Hard Gate note.)

## 3a. Triumvirate Dispatch

A triumvirate is mandatory when:

- **the file bounds expand into a band-owned `src/` surface.** W31.a edits NO component logic — if folding a residual fork requires changing a spring SOLVER (not just a CSS literal → token swap or a stale-token reference fix), that is a band wave's surface (W2/W3/W25), not W31; re-plan, do not fold the solver change into a coherence wave;
- **`proof:animation-coherence` finds a residual fork that is a DESIGN CHOICE, not a defect** (e.g. a non-spring `linear()` deliberately on a non-physical surface — a marquee, a shimmer keyframe). The third such finding halts: the gate's allow-list (the non-physical animation surfaces — shimmer, marquee, sparkle-sweep keyframes that are intentionally NOT spring-driven) must be authored in the plan, not discovered ad-hoc, or the gate over-reaches and flags legitimate non-physical motion;
- **the DESIGN.md rewrite reveals a W4/W5/W7 contract the wave specs did NOT land** (a third diagnostic-loop divergence between the DESIGN.md delta and the realized aurora source) — escalate to reconcile the wave spec, do not document an aspirational contract.

## 4. File Bounds

| File | Access |
|---|---|
| `docs/tranches/AW/waves/AW.W31-animation-designmd.md` | create (this file) |
| `src/components/custom/aurora/DESIGN.md` | modify (the v4.1 → v5.0 currency rewrite — DOCS) |
| `scripts/proof-animation-coherence.mjs` | create (the static motion-token-source + no-hand-rolled-easing gate) |
| `scripts/proof-design-md-current.mjs` | create (the DESIGN.md currency-marker gate) |
| `scripts/proof-naming-consistency.mjs` | create (the doc-lint headline/charter/token-name gate) |
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify (ONLY a stale-literal-easing → `--spring-dock`-token reference fix, IF the gate finds a residual; NO solver change) |
| `src/styles/dock.css` | modify (ONLY a stale `TabsIndicator` rail literal → `--dock-motion-resize` token fix, IF the gate finds a residual) |
| `docs/tranches/AW/AW.md` | modify (the §2 wave-table headline normalization — DOCS) |
| `docs/tranches/AW/waves/AW.W4-aurora-painterly.md` | modify (header `# AW.W4 - Aurora painterly` normalize — DOCS) |
| `docs/tranches/AW/waves/AW.W5-aurora-color-derive.md` | modify (header normalize — DOCS) |
| `docs/tranches/AW/waves/AW.W6-aurora-options.md` | modify (header normalize — DOCS) |
| `docs/tranches/AW/waves/AW.W7-aurora-webgpu.md` | modify (header normalize — DOCS) |
| `docs/tranches/AW/waves/AW.W8-aurora-interactive.md` | modify (header normalize — DOCS) |
| `package.json` | modify (register the three `proof:*` scripts) |

Do NOT touch: `docs/precepts/` (NEVER); any band-owned motion SOLVER (`useLayerTransition.ts` spring construction beyond a stale-token reference, the W25 `.tap-squish` recipe authorship, `scripts/regen-spring-tokens.mjs` PRESETS — the retunes are W2/W25's surface, W31 only AUDITS them); `src/styles/glass.css` (the `--glass-edge-light` token is W22's surface — W31 only confirms the DOCS naming, not the token); `src/components/custom/goo-blob/README.md` + the four W33 READMEs (W33's surface); `scripts/gates.mjs` (the gate MANIFEST registration is W33's close ceremony — W31 mints the scripts + registers the `package.json` `proof:*` entries, W33 adds them to the manifest).

## 4a. Disjointness

Three agent units, file-disjoint:
- **W31.a** owns the two motion gates (`proof-animation-coherence.mjs`) + the residual-fork fixes (`useLayerTransition.ts`, `dock.css` — token-reference-only) + the `package.json` entry for `proof:animation-coherence`.
- **W31.b** owns `aurora/DESIGN.md` + `proof-design-md-current.mjs` + its `package.json` entry.
- **W31.c** owns the headline/charter/token-name doc-lint (`proof-naming-consistency.mjs`) + the `AW.md` §2 table + the five aurora wave-file headers + its `package.json` entry.

`package.json` is touched by all three (each adds ONE `proof:*` script line). To avoid a write-conflict, the orchestrator either (a) sequences the three `package.json` edits, or (b) has a SINGLE unit land all three script registrations after a/b/c's scripts exist. No two units share any OTHER `modify` path. The aurora wave-file headers (W31.c) are header-line-only; W31.b touches `aurora/DESIGN.md`, not the aurora WAVE files — disjoint.

## 4b. Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W31.a | `/Users/mkbabb/Programming/glass-ui-aw-w31-a` | n/a (Node/JS repo) |
| AW.W31.b | `/Users/mkbabb/Programming/glass-ui-aw-w31-b` | n/a |
| AW.W31.c | `/Users/mkbabb/Programming/glass-ui-aw-w31-c` | n/a |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch; the `package.json` script registrations are integrated on the orchestrator's serial close (option b above) so the three units never race the manifest line.

## 5. Agent Units

### AW.W31.a Animation-coherence sweep + the one-motion-source gate

- Goal: the dock/aurora/blob/primitive animated surfaces resolve every spring from the single `regen-spring-tokens.mjs` source and every press from the `--scale-press*` cohort, with no hand-rolled `cubic-bezier()`/`linear()`/literal-scale surviving the W2/W3/W25 sweeps.
- Mechanism: author `scripts/proof-animation-coherence.mjs` — scan the animated-surface file set; fail on (i) any `--spring-*` definition outside the generated block, (ii) any raw `cubic-bezier(`/`linear(` on an animated transition/animation property outside the generated `--spring-*` block and the authored allow-list (shimmer/marquee/sparkle-sweep non-physical keyframes), (iii) any `scale:` literal on a press surface. Run it born-RED at HEAD (it names the residual file:line), then fold each residual: swap the dock `useLayerTransition.ts` / `dock.css` `TabsIndicator` stale literal onto the `--spring-dock`/`--dock-motion-resize` token reference (NO solver change). Re-run GREEN.
- Files: `scripts/proof-animation-coherence.mjs`, `src/components/custom/dock/composables/useLayerTransition.ts`, `src/styles/dock.css`, `package.json`
- Sub-gate: `npm run proof:animation-coherence` is born-RED at HEAD (≥1 residual named), GREEN after the fold; `npm run typecheck` + `npm run build` stay green (the token-reference swaps are inert visually — the retuned tokens already paint).

### AW.W31.b DESIGN.md currency rewrite + the currency gate

- Goal: `aurora/DESIGN.md` reflects the post-AW aurora (W5 shared-color splice, W4 painterly mediums, W7 WebGPU/multi-pass relaxation) at v5.0, and a gate freezes the currency markers.
- Mechanism: rewrite the three stale arms (§7/§9 color home → shared `procedural-color.glsl.ts`; §2 invariant 8 + §3 non-invariant → the WebGL2-single-pass-FALLBACK + WebGPU-multi-pass-enhancement re-statement; §2.4/§4 mediums → the van-Gogh/structure-tensor/real-impasto/reworked-oil-pastel extension), add a §"Spec deltas (v4.1 → v5.0)" citing W4/W5/W7, bump the status line to v5.0. Author `scripts/proof-design-md-current.mjs` asserting the currency markers for every `src/**/DESIGN.md`. Born-RED at HEAD (v4.1 stale markers), GREEN after the rewrite.
- Files: `src/components/custom/aurora/DESIGN.md`, `scripts/proof-design-md-current.mjs`, `package.json`
- Sub-gate: `npm run proof:design-md-current` is born-RED at HEAD (the v4.1 single-pass/`color.ts`-only markers fail), GREEN after; the rewrite cites W4/W5/W7 by wave id + the shared-chunk path; `git diff --check` clean.

### AW.W31.c Naming-consistency doc-lint + headline normalization

- Goal: the AW wave-file headers + charter §2 table speak ONE headline style, no doc cites a phantom token family, and the component/file/gate naming convention is recorded.
- Mechanism: normalize the W4-W8 aurora wave-file headers + the `AW.md` §2 table headlines to `# AW.W<N> - <Title>` Title-case-hyphen; strike the phantom `--glass-edge-light-{wash..overlay}` family hedge wherever a doc HEDGES it as-if-it-exists (the rejection notes in this wave file + W22 STAY — they name it to reject it); record the PascalCase-SFC-in-kebab-dir convention (a §note, not a rename — no-legacy bars an alias, the shipped names stay). Author `scripts/proof-naming-consistency.mjs` asserting (a) header style, (b) charter↔file headline match, (c) no phantom token-family citation in `src/**` or any OTHER wave doc (grep scope EXCLUDES this wave file + exempts a reject-this-family line — distinguishing a HEDGE-as-if-it-exists from a NAMED-to-reject mention so the gate is falsifiable-then-greenable). Born-RED at HEAD (the ALLCAPS-en-dash aurora headers), GREEN after.
- Files: `scripts/proof-naming-consistency.mjs`, `docs/tranches/AW/AW.md`, `AW.W4`/`W5`/`W6`/`W7`/`W8` wave-file headers, `package.json`
- Sub-gate: `npm run proof:naming-consistency` is born-RED at HEAD (≥1 ALLCAPS-en-dash header), GREEN after; the convention note exists; `git diff --check` clean.

## 6. Hard Gate

1. `npm run proof:animation-coherence` — GREEN. The gate (`scripts/proof-animation-coherence.mjs`) asserts over the animated-surface file set (`src/components/custom/dock/**`, `aurora/**`, `goo-blob/**`, `src/styles/{utilities,dock,dock-controls}.css`): (a) the ONLY `--spring-*` definitions live in the `regen-spring-tokens.mjs`-generated `tokens.css` block (one motion-token source); (b) NO raw `cubic-bezier(`/`linear(` literal sits on an animated transition/animation property outside that block and the authored non-physical allow-list (shimmer/marquee/sparkle); (c) every press surface resolves `scale:` from a `--scale-press*` var. Born-RED at HEAD (≥1 residual literal named by file:line), GREEN after W31.a's fold. Composes with — does not duplicate — `proof:spring-tokens-synced` (that gate proves generator-equality; this gate proves no-fork-outside-the-generator).
2. `npm run proof:design-md-current` — GREEN. The gate (`scripts/proof-design-md-current.mjs`) asserts, for every `src/**/DESIGN.md`: the aurora doc names the SHARED `procedural-color.glsl.ts` color source (not only `color.ts`), names the WebGPU/multi-pass relaxation (`createGPUCanvas`/WGSL/Kuwahara/multi-pass terms re-stating invariant 8 as the WebGL2 fallback), names the W4 painterly mediums (van-Gogh/structure-tensor/real-impasto), and carries the v5.0 version marker citing W4/W5/W7. Born-RED at HEAD (v4.1 + "Single draw, single shader" + "No multi-pass pipelines" + `color.ts`-only), GREEN after W31.b's rewrite.
3. `npm run proof:naming-consistency` — GREEN (or folded into gate 2's doc-scan per the KISS note). Asserts: every `AW.W<N>` wave header matches `# AW.W<N> - <Title>` (no ALLCAPS-en-dash); the charter §2 headlines match their wave files; no `src/` source nor any OTHER AW wave doc cites the phantom `--glass-edge-light-{wash..overlay}` family (the grep EXCLUDES this wave file + exempts a rejection-context citation — this doc + W22 both NAME the phantom to reject it, so a naive whole-tranche substring would self-falsify; the gate scopes to `src/**` + the other wave docs and treats a reject-this-family line as compliant). Born-RED at HEAD (the W4-W8 ALLCAPS-en-dash headers), GREEN after W31.c.
4. `npm run typecheck` clean; `npm run build` green — the residual-fork token-reference swaps are visually inert (the W2/W25 retuned tokens already paint), so the build is unchanged.
5. `git diff --check` clean over all docs (DESIGN.md, AW.md, the wave-file headers).

## 7. Format And Lint Cadence

This is a coherence + docs wave. `npm run typecheck` after the `useLayerTransition.ts`/`dock.css` token-reference fixes (W31.a). `npm run build` once at close to confirm the token swaps are inert. Prettier over the three new `.mjs` gate scripts + `package.json`. `git diff --check` for whitespace over every doc touched (DESIGN.md, AW.md, the five aurora wave headers). The three new `proof:*` gates run born-RED then GREEN as the wave's own evidence cadence; the full local matrix re-runs at the W33 close (W31's gates are registered in the manifest there).

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W31-animation-coherence.json` — the born-RED residual ledger (the file:line of each hand-rolled easing/literal-scale on an animated surface at HEAD) + the GREEN re-run (zero residuals).
- The `git diff` of `aurora/DESIGN.md` (v4.1 → v5.0) — the three deltas + the new §"Spec deltas (v4.1 → v5.0)".
- The `git diff` of the W4-W8 aurora wave-file headers + the `AW.md` §2 table (the headline normalization).
- The three new gate scripts' born-RED + GREEN run logs.

## 9. Commit Plan

- `feat(motion): one-source animation-coherence gate + fold the residual dock-rail literal onto --spring-dock` — the `proof-animation-coherence.mjs` + the `useLayerTransition.ts`/`dock.css` token-reference fix (body: the one-motion-source contract, the residual forks the audit named, the non-physical allow-list rationale, why the token swap is visually inert).
- `docs(aurora): DESIGN.md v4.1 → v5.0 — shared-color splice, painterly mediums, WebGPU multi-pass relaxation` — the DESIGN.md rewrite + `proof-design-md-current.mjs` (body: the three post-AW deltas citing W4/W5/W7, the invariant-8-as-fallback re-statement, the DESIGN-doc-vs-README split with W33).
- `docs(AW): normalize wave headlines + strike phantom token-family hedge + naming convention` — the headline normalization + `proof-naming-consistency.mjs` + the convention note (body: the Lane 5 naming-verbiage fold, the PascalCase-in-kebab-dir convention recorded not renamed).
- `chore(gates): register proof:animation-coherence + proof:design-md-current + proof:naming-consistency in package.json` — the three script entries (the `gates.mjs` manifest registration is W33's close).
- `docs(AW): W31 close — coherence ledger + DESIGN.md diff + status`.

## 10. Dependencies

- **Depends on**: W1-W3 (the dock motion retunes must LAND before W31 can audit them converged), W4-W11 (the aurora/blob bands set the surfaces the DESIGN.md documents + the animation-coherence gate scans), W25 (the `.tap-squish`/press-canon parity is the press cohort W31 audits as ONE vocabulary).
- **Blocks**: W33 (the close registers W31's three gates in the `gates.mjs` manifest, ships the `FINAL.md` run-ids, and the W33 READMEs cite the now-current DESIGN.md; W31's `proof:design-md-current` GREEN is a precondition for the W33 overfitting/π-lane close).

## 11. Archaeology

- The audit's animation-language + DESIGN.md + naming-verbiage findings (cogency-audit-full.md: Lane 5 naming-verbiage §"FOLD/WAVE-SEED LIST"; the H-fold ledger "Animation-audit → fold into existing dock/aurora/blob animation-language waves ✓ · DESIGN.md currency → fold into close/docs waves ✓") seeded folds into the BAND waves (W2/W3/W25) and the close (W33). The new band G (W28-W32) lifts the cross-cutting COHERENCE arm — the reconcile that no single band owns — into its own wave so the one-motion-language verdict, the DESIGN.md currency, and the naming consistency each carry a falsifiable gate rather than riding as an unverified fold note inside a band wave. The audit's Band-A Finding 1 (the dual-write `DOCK_SPRING` + `regen-spring-tokens.mjs` lockstep) is W2's surface; W31 only AUDITS that W2 landed it onto the one source.
- New guardrail: `proof:animation-coherence` is the standing gate that a future band cannot re-introduce a hand-rolled spring/easing on an animated surface without the gate flagging it — the one-motion-source invariant becomes machine-enforced, not a convention. `proof:design-md-current` is the standing gate that a future aurora change cannot drift the DESIGN.md back to stale without failing closed.

## 12. Naming convention (recorded, not renamed)

The naming arm (W31.c) RECORDS the tranche's naming convention; it renames NO
shipped `src/` symbol (no-legacy bars an alias — the shipped names stay). The
convention, machine-checked where falsifiable by `proof:naming-consistency`:

- **Component / file casing.** PascalCase SFC exports (`GlassDock.vue` →
  `GlassDock`) inside kebab-case package dirs (`dock/`). This is the SHIPPED,
  idiomatic shadcn-vue convention — the audit's "folder case ≠ export case" is
  BY-DESIGN, not a defect. Recorded as the rule; NOT a rename.

- **Wave-headline style.** Every `docs/tranches/AW/waves/AW.W<N>-*.md` first line
  is `# AW.W<N> - <Title>` — the id↔title separator is ` - ` (hyphen-space), the
  `WAVE_SPEC.md §1` display form. An en-dash LATER in the title body (e.g.
  `Lighthouse audit — glass-ui demo`) is fine; only the id↔title separator is
  the convention anchor. W31.c normalized the six deviating headers (W4-W8 + W27)
  off the ALLCAPS-en-dash form onto this; the charter §2 bold lead-ins for W4-W8
  match. `proof:naming-consistency` clause (a)/(b) freezes it.

- **Token-family naming.** The `--glass-edge-light` rim is UNIFORM across the
  five glass rungs by design — there is NO `--glass-edge-light-{wash..overlay}`
  per-rung family at HEAD (`tokens.css` carries only `--glass-edge-light` +
  `--glass-edge-light-dark`). A future rung-stepped variation is a triumvirate
  trigger, not a silent mint. `proof:naming-consistency` clause (c) strikes any
  doc that HEDGES the phantom family as-if-it-exists (this wave file + W22 NAME
  it to reject it — the canonical rejection-context exemptions; a
  rejection-framed mention is compliant). This overlaps W22's token-unify note;
  W31 confirms only the DOCS consistency, it does NOT touch `glass.css`.

- **Gate-naming convention.** `proof:<feature>-<descriptor>` is the established
  pattern; the three W31 gates (`proof:animation-coherence`,
  `proof:design-md-current`, `proof:naming-consistency`) conform. The
  `gates.mjs` MANIFEST registration is W33's close ceremony — W31 mints the
  scripts + registers the `package.json` `proof:*` entries.

## 13. Implementation ledger (W31 close)

- **W31.a animation-coherence.** `scripts/proof-animation-coherence.mjs` + the
  `package.json` entry. Born-RED witness at base `246f535`: ONE residual press
  literal — `src/styles/utilities.css:176` `.interactive-item:active { scale:
  0.98 }`, the sole per-atom literal scale surviving the W2/W3/W25 sweeps. Fold:
  `0.98 → var(--scale-press-sm)` (0.97, the soft press rung the button + slider
  recipes consume — ONE press vocabulary; the delta is sub-perceptual). GREEN
  after: 5 `--spring-*` defs all in the regen-generated §2 EASING block, zero
  hand-rolled `cubic-bezier(`/`linear(` easing fork on any animated surface
  (the dock `useLayerTransition.ts` rides a `DOCK_SPRING` solver-param object
  mirroring the generator PRESETS — NOT a literal — and the `TabsIndicator`
  rail already reads `--dock-motion-resize` = `--spring-dock`, so no dock
  residual remained; no solver change). Non-physical allow-list
  (shimmer/marquee/sparkle-sweep) authored in the gate, not discovered ad-hoc.

- **W31.b DESIGN.md currency.** `aurora/DESIGN.md` v4.1 → v5.0 +
  `scripts/proof-design-md-current.mjs` + the `package.json` entry. The W5
  shared-color splice is the REALIZED delta (the shared
  `procedural-color.glsl.ts` chunk + in-shader `mixPaletteOklchArc` /
  `brokenColorJitter`); the W4 painterly mediums + W7 WebGPU/multi-pass
  relaxation are documented as the STAGED forward contract (the README marks
  them `(planned — AW.W7)` / `planned (AW.W4)` at base `246f535` — W4/W7 have
  NOT landed the aurora source yet, so DESIGN.md frames invariant 8 as the
  WebGL2-single-pass FALLBACK contract and the WebGPU multi-pass as the
  capability-gated forward enhancement, matching the realized source + the
  README's framing — documenting the design-of-record, not an aspirational
  shipped contract).

- **W31.c naming-consistency.** `scripts/proof-naming-consistency.mjs` + the
  `package.json` entry + the six header normalizations (W4-W8 + W27) + the five
  charter §2 bold lead-ins + this §12 convention note.
