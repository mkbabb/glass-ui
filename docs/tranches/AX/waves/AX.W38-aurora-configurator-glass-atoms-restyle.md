# AX.W38 — Aurora-Configurator glass-atoms RESTYLE (the dropped AW.W29)

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W09, AX.W10

This is the chronically-deferred AW.W29 — authored in full (`docs/tranches/AW/waves/AW.W29-aurora-configurator.md`), DELIVERED never (zero git commits, AW non-close), then DROPPED AGAIN in the AX renumber when slice-31's `routesToWave='AX.W26'` was re-pointed onto "TS god-module." AX re-homes it as a real component wave on the glass-atoms spine. The AW.W29 scope is ported VERBATIM here; the AX-specific deltas are the π-lane visual-truth close (W00 machinery), the W09/W10 sequencing + disjointness, and the AS-FINAL A-1/A-2 RATIFY-BEFORE-IMPL decision recorded below.

---

## State (born-RED)

The gate MUST fail at HEAD (`at-dock-convergence @ eaba94f`) before the wave. The Configurator chrome predates the glass-atoms band (W22-W26 shipped `.glass-material`, `.tap-squish`, `transition-control`, `--radius-control`/`--radius-field` — verified present at HEAD in `src/styles/utilities.css` + `theme.css`), so the shipped Configurator family still hand-rolls its interaction literals OFF that spine. Falsifiable RED witnesses, each line-cited at HEAD:

1. **Flat opaque active chip.** The active preset chip is `border-foreground/40 bg-foreground text-background` (`Configurator.vue:237`) — an opaque high-contrast stamp, NOT a `glass-*` tier (no `backdrop-filter`, no glass token). A `getComputedStyle` probe over the `:aria-selected="true"` chip resolves `backdrop-filter: none` + a solid foreground background today.
2. **No press-spring.** The preset chip carries `transition-colors` + a `focus-ring` with no press transform (`Configurator.vue:235`); the per-row reset carries `transition-colors … active:scale-[var(--scale-press,0.97)]` — a RAW scale literal, not the `.tap-squish` press-spring (`ConfiguratorRow.vue:91`); the layer trigger is `transition-colors hover:bg-foreground/5 focus-ring` with no press transform at all (`ConfiguratorLayer.vue:103`).
3. **`transition-colors` not `transition-control`.** All three interactive controls (chip, layer trigger, row reset) animate only `color`/`background`, never the uniform border/shadow/focus/transform `transition-control` recipe.
4. **No `data-slot` anywhere.** `grep -rn "data-slot" src/components/custom/configurator/` returns ZERO — no `configurator`/`configurator-preset`/`configurator-layer`/`configurator-layer-trigger`/`configurator-row`/`configurator-reset` slot is present on any root.

**Born-RED witness:** `npm run proof:configurator-glass-atoms` (created in this wave) exits non-zero on `eaba94f` — its computed-style probe over the aurora-story-rendered Configurator finds the active chip resolving an opaque foreground fill (no glass tier), no `.tap-squish` channel on chip/trigger/reset, `transition-colors` on all three, and no `data-slot` on any sub-surface root. The gate goes GREEN only after the restyle lands.

---

## Goal

The shipped Configurator surface (`Configurator.vue` / `ConfiguratorLayer.vue` / `ConfiguratorRow.vue` + the aurora studio chrome that consumes them) reads as the SAME glass-atoms design language the rest of glass-ui speaks after W09 — warm-cream glass material, iOS-26 press-spring, the unified radius geometry, the canonical focus-ring — WITHOUT minting a new component, CVA variant, or token.

---

## Scope (the gestalt fix — DRY restyle onto the EXISTING spine, no workaround/no legacy)

A DRY restyle that routes the Configurator's hand-rolled interaction literals onto the EXISTING glass-atoms band recipes the W22-W26 band landed (and W09 re-tuned for the specular/subtle spine). It mints NO primitive, NO CVA variant, and NO token — it COMPOSES `.glass-material` / `.tap-squish` / `transition-control` / `--radius-control` / `--radius-field` / `.focus-ring`. The state/logic/layout machinery (the `useConfiguratorState` per-preset clone, the `density.ts` axis, the `grid-template-rows: 0fr↔1fr` recursion-free reveal, the `inert`/`aria-expanded`/`role` collapse contract, the `asideSide`/`asideWidth` aside-grid layout) is PRESERVED VERBATIM — this is a VISUAL restyle, not a rewrite. Six sub-surface routings, each born-RED:

1. **Preset chips → glass-tier active (the chip idiom).** `Configurator.vue:227-245` — the default preset-row chips trade their flat `border-foreground/40 bg-foreground text-background` active state for the glass-tier active idiom (a translucent active fill over the backdrop — the wash/quiet glass-tint rung — not the opaque `bg-foreground` stamp); the rest chip keeps a subtle glass-tint; both compose `.tap-squish` (press-spring) + `transition-control`. The `role="tablist"`/`role="tab"`/`:aria-selected` a11y contract is preserved verbatim; only the visual + interaction classes change.
2. **Layer trigger → glass-tier button + focus-ring + press-spring.** `ConfiguratorLayer.vue:103` — the section-header trigger composes `.tap-squish` (so it springs on activation like every band atom), migrates `transition-colors` → `transition-control`, and re-asserts the existing `.focus-ring` under the full four-state contract. The chevron rotation (`group-data-[state=open]:rotate-180`) stays, but its `transition-transform duration-200` aligns onto the canonical `--spring-*`/`--duration-*` channel (one motion vocabulary — coordinated with the W05 spring-vocabulary canon). The `aria-expanded`/`aria-controls`/`role`/`inert` collapse contract is preserved verbatim.
3. **Control rows → glass-material + transition-control.** `ConfiguratorRow.vue:71-107` — the per-row reset composes `.tap-squish` (replacing the raw `active:scale-[var(--scale-press,0.97)]` literal at line 91) + `transition-control`; the row's interactive affordance geometry adopts the `--radius-control` rung so the row family speaks ONE radius dialect with the band radius geometry. The density-axis CSS (`data-density` + the `@container style(--density)` companion) is UNTOUCHED — correct and orthogonal.
4. **Reset affordance → glass-pill button (LIBRARY-owned per-row reset only).** The per-row reset in `ConfiguratorRow.vue:88-96` reads as the canonical glass-pill control: `rounded-pill` (already present) + glass-tint hover + `.tap-squish` + `transition-control` + `.focus-ring`. The `RotateCcw` glyph + `:aria-label` are preserved. NOTE: the footer reset at `Configurator.vue:268-274` is `<slot name="footer" :reset="…">` — a CONSUMER SLOT, not a library button; there is no library-owned footer reset element to restyle. The gate probes the row reset (real, library-owned) + the chip + the layer trigger.
5. **`data-slot` sweep.** Per the W26 blanket `data-slot` idiom, every sub-surface root carries a slot: `data-slot="configurator"` (`Configurator.vue` root), `configurator-preset` (chip `<button>`), `configurator-layer` (`ConfiguratorLayer.vue` root) + `configurator-layer-trigger` (header button), `configurator-row` (`ConfiguratorRow.vue` root) + `configurator-reset` (reset button). Pure-additive, zero visual delta — the probe + any consumer e2e read these slots.
6. **The aurora story is the proof surface.** `demo/stories/substrates/aurora.vue` composes `<Configurator>` (its canonical consumer); the gate PROBES the rendered Configurator inside this story. The story is NOT re-authored. If the hand-authored aurora chrome (`demo/stories/aurora/AuroraConfigDock.vue` — the `DockLayerGroup`+`DockLayer` chrome per the Configurator §Per-preset rationale) carries a preset/reset control reading off-idiom against the restyled Configurator, ONLY those control class strings align onto the same band recipes (demo-internal, no library surface delta) — the hand-authored `DockLayerGroup` chrome STAYS (documented design choice, not a gap).

### RATIFY-BEFORE-IMPL — the AS-FINAL A-1/A-2 self-booked configurator asks

The constellation §16 analysis surfaced two configurator asks glass-ui SELF-BOOKED to its successor with kill-date `AT/3.3.0` (`docs/tranches/AS/FINAL.md:146-155`), still UNDISCHARGED, with consumer #1 = fourier's J.W5/K control-pane hierarchy lens (which rides `.chassis-divider` + a fourier-local ladder MEANWHILE precisely because glass-ui owes these). The AX charter routes the configurator-glass-atoms restyle to W38 and the root-barrel/metric-pill reconcile to W21 — **neither currently homes A-1/A-2.** They are recorded here as the natural visual-restyle adjacency, but the disposition is a USER/orchestrator decision:

- **A-1 — `ConfiguratorLayer`/`ConfiguratorRow` machined-groove inter-row divider opt-in.** Today a flat `border-b border-border/40` (`ConfiguratorLayer.vue:94`) + the opt-in `dividers` prop's `border-t border-border/30` (line 149). The ask: a token-first opt-in (a `Configurator` panel `data-attr`) porting the `.instrument-rail` twin-line groove (catch-light over under-shadow, dark-aware) onto the configurator chassis, reusing `--surface-tint-*`. **RECOMMENDED PATH (RATIFY-BEFORE-IMPL): DEFER A-1 out of W38.** W38 is bounded to COMPOSE-only (no `src/styles/` edit, no new token); A-1 mints a new groove recipe (a `src/styles/` write + a token), which is a scope class W38 explicitly forbids (a triumvirate trigger). A-1 is ALSO source-coupled to W29 (the `.instrument-rail` twin-line-divider `@utility` it ports FROM is EXCISED by W29's instrument-rail prune — A-1 must capture the groove recipe into the configurator's own CSS BEFORE that prune or lose its source) and to W25b (the `utilities.css`/`tokens.css` carve that frees the `index.css` 99.5%-budget headroom A-1 needs). RECOMMENDATION: fold A-1 into W21 (the configurator-reconcile wave) or a W25b-sequenced configurator-css sub-wave, NOT W38. Record the ratification verdict before impl.
- **A-2 — `label`/`sub` bound to the typography ladder.** Today magic literals `text-small font-semibold` (`ConfiguratorLayer.vue:112`) + `text-micro font-mono` (line 115). The ask: a class-swap to the typography-ladder rungs (≈0 net CSS — the rungs ship). **RECOMMENDED PATH (RATIFY-BEFORE-IMPL): A-2 IS in-scope for W38 IF ratified** — it is a pure class-string swap on the EXACT files W38 already touches (`ConfiguratorLayer.vue`), composes-only (no token, no `src/styles/` edit), and the typography-ladder rungs already ship. Caveat: it restyles EVERY configurator label across all consumers, so it is π-lane-visual-verification-gated (a before/after on the ladder-bound headers, light/dark), NOT a blind swap — exactly the verification W38's π-lane close already runs. RECOMMENDATION: ACCEPT A-2 into W38's bullet-2 (layer trigger) restyle; record the ratification before impl. If the orchestrator declines (font/ladder reconcile is W22-owned), DEFER with W22 as the home.

Consumer #2 for both = a glass-ui demo story (the aurora story is the existing witness). Cite fourier #1 + the demo story #2 as the ≥2-consumer witness if either lands.

---

## FileBounds (the EXACT files this wave may touch)

| File | Access |
|---|---|
| `src/components/custom/configurator/Configurator.vue` | modify-carve — the preset-chip active/rest/press classes + the root + chip `data-slot` ONLY. NOT the grid/aside layout, NOT the density provide, NOT the `<slot name="footer">` reset hook (consumer-filled). |
| `src/components/custom/configurator/ConfiguratorLayer.vue` | modify-carve — the trigger glass-button + `.tap-squish` + `transition-control` + the chevron motion channel + the layer/trigger `data-slot` ONLY (+ the A-2 ladder class-swap IF ratified). NOT the `grid-template-rows` reveal machinery, NOT the `inert`/`aria` contract. |
| `src/components/custom/configurator/ConfiguratorRow.vue` | modify-carve — the reset glass-pill + `.tap-squish` + `transition-control` + `--radius-control` + the row/reset `data-slot` ONLY. NOT the `<style scoped>` density block, NOT the inject resolution. |
| `demo/stories/substrates/aurora.vue` | modify — ONLY if a story-local control reads off-idiom against the restyled Configurator (class-string alignment, no structural change). |
| `demo/stories/aurora/AuroraConfigDock.vue` | modify-carve — ONLY the preset/reset control class strings if they now clash with the restyled Configurator (demo-internal; the hand-authored `DockLayerGroup` chrome STAYS). |
| `scripts/proof-configurator-glass-atoms.mjs` | create — the gate's structural + computed-style probe over the aurora-story-rendered Configurator. |
| `package.json` | modify-carve — register the `proof:configurator-glass-atoms` script entry ONLY. |
| `docs/tranches/AX/audit/W38-configurator-glass-atoms.json` | create — the audit evidence artefact (per-sub-surface glass-atoms matrix + before/after computed-style pairs + π-lane verdict). |

**Do NOT touch:** `docs/precepts/` (NEVER — submodule, read-only); `src/styles/*` (the band recipes are W22-W26/W09-owned and COMPOSED here, not edited — a needed style edit is a triumvirate trigger; this is the W38↔W25b disjointness seam); `src/styles/tokens.css`/`theme.css` (NO new token); `src/components/custom/configurator/density.ts` + `useConfiguratorState.ts` (the density axis + per-preset clone state — correct, orthogonal); the `ConfiguratorLayer.vue` `grid-template-rows` reveal machinery + the `inert`/`aria-expanded`/`role` collapse contract (PRESERVED verbatim); the `Configurator.vue` aside-grid / `asideSide`/`asideWidth` layout; any other `src/components/` surface (bounded to the configurator package + its demo consumer).

---

## Disjointness (sibling waves it must NOT overlap)

- **AX.W09 (Specular tune-to-subtle).** W09 owns the glass-atoms/specular SPINE (`src/styles/glass*.css`, the specular intensity ladder, `useSpecularTracking`). W38 RIDES that spine — it composes the W09-tuned `.glass-material` rim/specular, it does NOT edit it. SHARED FILES: none — W09 writes `src/styles/`, W38 writes `src/components/custom/configurator/`. Collision avoided by sequencing W38 AFTER W09 (so the chip's glass-tier active reads the FINAL subtle specular, not a mid-churn blown-out one) + the FileBounds `src/styles/` exclusion.
- **AX.W10 (Aurora options converge — FUNCTIONAL atoms door).** W10 collapses the option model + rebuilds `AuroraConfigDock` to drive the atoms (an "atoms" tab as default, the raw layers become Advanced) + routes the panel into the manifest — a STRUCTURAL/FUNCTIONAL edit of the aurora demo chrome. W38 is the VISUAL restyle of the configurator chrome. SHARED FILES: `demo/stories/aurora/AuroraConfigDock.vue` (W10 restructures it; W38 may class-align off-idiom controls) and potentially `demo/stories/substrates/aurora.vue`. Collision avoided by sequencing W38 STRICTLY AFTER W10 (per charter §4 note c — "sequence W38 after W10 so the two configurator edits don't collide"): W10 lands the final structure, W38 restyles the final structure's controls. W38's `AuroraConfigDock.vue` access is class-string-alignment-only (modify-carve), never structural.
- **AX.W21 (Primitive recategorize — configurator root-barrel reconcile + metric-pill).** W21 owns the configurator `/api`/root-barrel reconcile (export rationale, NOT visual). W38 owns the configurator VISUAL restyle. SHARED FILE: `src/components/custom/configurator/index.ts` (W21's surface) is NOT in W38's FileBounds — W38 touches the three SFCs only, never the barrel. Disjoint by file. (A-1, if it lands in W21 per the RATIFY-BEFORE-IMPL note, is W21's scope, not W38's.)
- **AX.W22 (Font register reconciliation).** If A-2 (ladder-bind) is DEFERRED rather than accepted into W38, its home is W22 (the typography/font canon). Recorded as the deferral seam.
- **AX.W25b (CSS monolith carves).** A-1 (machined groove) is source-coupled to W25b's `utilities.css`/`tokens.css` carve + W29's instrument-rail prune. W38 does NOT touch `src/styles/`, so it is disjoint from W25b by construction; A-1 (if homed) sequences with/after W25b, NOT in W38.

W38 is a SINGLE implementation agent unit (1 serial) — no intra-wave path contention; the disjointness is entirely cross-wave and resolved by the W09→W10→W38 sequence + the `src/styles/` exclusion.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (1 impl agent).** Restyle the three SFCs + align any off-idiom aurora-chrome control (demo-internal) + add the six `data-slot` attributes. Composes-only — no token, no CVA variant, no `src/styles/` edit.
- **Adversarially-verify (read-only audit lane — β/π).** A read-only lane drives the π-lane live audit (the appearance/interaction axis below) AND adversarially confirms the restyle did NOT regress the recursion-free reveal, the `inert`/`aria` collapse contract, or the density axis — the M.W2 Lane A reka-`<Presence>` recursion race the component was specifically rebuilt to avoid is the named regression risk when `.tap-squish` transforms compose onto the layer trigger.
- **Gate-author (the implement agent, distinct sub-step).** Author `scripts/proof-configurator-glass-atoms.mjs` — the structural + computed-style probe over the aurora-story-rendered Configurator (NOT a headless data-slot grep alone — a real computed-style read). Register the `proof:configurator-glass-atoms` package.json entry.

**Triumvirate-escalation triggers** (port from AW.W29 §3a): the restyle requires MINTING a new token (a `--configurator-*` glass tint or a press channel the band does not expose) rather than composing the existing recipes — the file bounds would expand into `tokens.css`/`theme.css`, the "compose the band, no new token" precept is implicated; composing `.tap-squish` onto the layer trigger regresses the `grid-template-rows: 0fr↔1fr` reveal (the press-scale transform fights the height transition or re-introduces the M.W2 Lane A recursion race) — escalate, do not stack a third transform; a third diagnostic iteration on the probe still surfaces a sub-surface NOT resolving its band recipe — re-derive the sub-surface→recipe composition, do not patch inline; the restyle would require editing the density-axis CSS or the aside grid-flip logic — those are out of scope, a needed edit is a scope reveal.

---

## HardGate (born-RED → GREEN + the MANDATORY π-lane VISUAL-TRUTH clause)

**Gate id:** `proof:configurator-glass-atoms` — a node structural script + a computed-style probe over the Configurator AS RENDERED in the aurora demo story (the story is the proof surface, not a separate harness). Each condition is born-RED on HEAD with the verified HEAD state cited:

1. **Preset chip glass-tier active.** A `getComputedStyle` probe over the active (`:aria-selected="true"`) chip asserts it resolves a `glass-*` tier — a non-`none` `backdrop-filter` ∨ a glass-token background — NOT the opaque `bg-foreground`/`text-background` stamp (`Configurator.vue:237`). (Born-RED.)
2. **Press-spring on chip + trigger + reset.** A grep + computed-style probe asserts the chip, the layer trigger, and the row reset each compose the press-spring — `.tap-squish` ∨ `--scale-press*` on a `--spring-*` channel — with the `prefers-reduced-motion: reduce` reset reachable on each. Pre-fix the chip + reset carry `transition-colors` + a raw `active:scale-[var(--scale-press,0.97)]` literal (`Configurator.vue:235`, `ConfiguratorRow.vue:91`) and the trigger has NO press transform (`ConfiguratorLayer.vue:103`). (Born-RED.)
3. **`transition-control` on the three interactive controls.** A computed-style/grep probe asserts the chip, trigger, and library-owned row reset each resolve `transition-control`, NOT the bare `transition-colors`. (Born-RED.)
4. **Semantic radius geometry.** A computed-radius probe asserts the row's interactive affordance (the reset hit-target) + the layer trigger resolve a semantic radius token (`--radius-control`/`--radius-pill`/`--radius-field`), not a one-off literal. (Born-RED.)
5. **focus-ring on the layer trigger.** A computed-style probe asserts the trigger paints the canonical `.focus-ring` on `:focus-visible` — the four-state contract is complete (hover ∧ press ∧ focus ∧ disabled-where-applicable). (Re-asserted under the four-state contract — the press rung is born-RED per gate 2.)
6. **`data-slot` coverage.** The structural script asserts every sub-surface root resolves a `data-slot`: `configurator`, `configurator-preset`, `configurator-layer`, `configurator-layer-trigger`, `configurator-row`, `configurator-reset`. Pre-fix NONE present. (Born-RED.)
7. **No new primitive / variant / token / style-file edit.** `git diff` shows no new `src/components/custom/<dir>/`, no new CVA variant key, no `src/styles/tokens.css`/`theme.css` change, and no edit to the band style recipes — the wave COMPOSES them.
8. **Build + types green.** `npm run build` (the `/styles` bundle byte-stable — the wave composes styles, does not edit them) and `npm run typecheck` pass; `git diff --check` clean.

**MANDATORY VISUAL-TRUTH (π lane — non-negotiable per AX.W00; NOT a headless proof alone).** The wave does NOT close on the green `proof:configurator-glass-atoms` gate. It closes on an EXECUTED live π-lane Playwright + frontend-design audit of the restyled configurator chrome on the LIVE aurora story (`demo/stories/substrates/aurora.vue`), AFTER W10 has landed the functional atoms-door structure — driving the appearance/interaction axis on a real device, ≥3 viewports, both light + dark: the active preset chip reads as a translucent glass-tier pill (NOT an opaque stamp) over the live AuroraStage backdrop; the layer trigger, chip, and row reset SPRING on press (the `.tap-squish` is visible, not just present in CSS); the focus-ring paints on keyboard focus; the A-2 ladder-bound headers (if ratified) read at the correct typographic rung in both schemes; NO control reads off-idiom against the restyled surface; affordance/hierarchy/spacing/padding intact with no visual occlusion against the aurora canvas. A paired-π BEFORE/AFTER + DELTA capture (per the W00 protocol) is the evidence. A frontend-design audit verdict (affordance, hierarchy, the glass-language coherence read) is recorded. **A headless data-slot grep is explicitly insufficient** (charter §3 gate clause).

---

## Cadence (sub-steps order)

1. **Wave-open live re-diagnosis (the W00 ritual).** On the LIVE aurora story, re-confirm the four born-RED witnesses by computed-style read (NOT from this spec's hypothesis) — record the pre-fix glass-tier/press/transition/data-slot state. Confirm W09 (specular spine) + W10 (functional atoms door) have LANDED and are green.
2. **Ratify A-2 / A-1 disposition.** Record the RATIFY-BEFORE-IMPL verdict (A-2 into W38 bullet-2, or deferred to W22; A-1 deferred to W21/W25b-sequenced — recommended) before any class edit.
3. **Preset chips restyle** — `Configurator.vue` chip active/rest/press onto glass-tier + `.tap-squish` + `transition-control`.
4. **Layer trigger restyle** — `ConfiguratorLayer.vue` glass-tier button + `.tap-squish` + `transition-control` + retained `.focus-ring` + chevron motion channel (+ A-2 ladder swap if ratified).
5. **Control rows + row reset restyle** — `ConfiguratorRow.vue` reset glass-pill + `.tap-squish` + `transition-control` + `--radius-control`.
6. **`data-slot` sweep** — the six attributes across the three SFCs.
7. **Aurora-chrome class alignment** — IF an `AuroraConfigDock.vue` / `aurora.vue` control reads off-idiom (demo-internal, class-only).
8. **Gate-author** — `scripts/proof-configurator-glass-atoms.mjs` + the `package.json` entry; run born-RED→GREEN.
9. **`npm run typecheck` + `npm run build`** (the `/styles` bundle byte-stable).
10. **π-lane VISUAL-TRUTH close** — the executed live Playwright + frontend-design audit (the close criterion); paired-π BEFORE/AFTER + DELTA capture; emit the audit json.

---

## Artefacts (the audit json + evidence)

- `docs/tranches/AX/audit/W38-configurator-glass-atoms.json` — the per-sub-surface glass-atoms matrix (which band recipe each of the three interactive controls composes), the active-chip glass-tier computed-style PAIR (pre flat `bg-foreground` / post glass-tier), the press-spring + `transition-control` + semantic-radius + `.focus-ring` + `data-slot` resolution table, the A-1/A-2 ratification verdict, and the π-lane VISUAL-TRUTH verdict (before/after/delta).
- π-lane Playwright screenshots at ≥3 viewports, light + dark, under `docs/tranches/AX/audit/screens/W38-*`: the restyled Configurator inside the aurora story (preset chips active/rest, a layer trigger mid-press, the rows + reset over the live AuroraStage backdrop). The paired-π BEFORE/AFTER + DELTA set.
- The green `proof:configurator-glass-atoms` run-id cited in the wave Status at close.
- The integration commit hash.

---

## CommitPlan (conventional-commit, one per sub-step)

- `feat(configurator): preset chips → glass-tier active + press-spring + transition-control` — the `Configurator.vue` chip restyle; body cites the flat `bg-foreground` HEAD active state retired onto the glass-atoms idiom.
- `feat(configurator): layer trigger → glass-tier button + focus-ring + press-spring` — the `ConfiguratorLayer.vue` trigger restyle + chevron motion channel (+ A-2 ladder bind if ratified); body notes the `grid-template-rows` reveal + `inert`/`aria` contract preserved verbatim.
- `feat(configurator): control rows → glass-material + transition-control; row reset → glass-pill` — the `ConfiguratorRow.vue` per-row reset restyle; body cites the raw `active:scale` literal retired onto `.tap-squish`.
- `chore(configurator): blanket data-slot across the sub-surfaces (shadcn-2025)` — the six `data-slot` additions; body cites the W26 idiom.
- `chore(demo): align off-idiom aurora-chrome controls onto the restyled Configurator` — the demo-internal class alignment, IF needed; body notes the hand-authored DockLayerGroup chrome stays.
- `test(gate): proof:configurator-glass-atoms born-RED→GREEN` — the runtime gate over the aurora-story Configurator + the audit json + the π-lane screens.
- `docs(ax): W38 status → complete with the green run-id + π-lane verdict` — the wave-close status commit.

(Per the AX §0 hardened agent git clause — agents NEVER stage/commit; the orchestrator owns the index. This CommitPlan is the orchestrator's commit ledger.)

---

## Dependencies

- **dependsOn AX.W09** — the glass-atoms/specular spine W38 RIDES. W09 tunes the specular to subtle (warm-cream low-alpha core + the tokenized intensity ladder) and retires the dock double-specular; the chip's glass-tier active + the layer trigger's glass-material must read the FINAL subtle specular, not a mid-churn blown-out one. (Charter §3: "Sequence AFTER W09 — the glass-atoms/specular spine it rides.")
- **dependsOn AX.W10** — the FUNCTIONAL atoms-door wiring that rebuilds `AuroraConfigDock` (the "atoms" tab default, the raw layers → Advanced disclosure, the manifest route). W38 restyles the FINAL structure W10 lands, so the two configurator edits don't collide. (Charter §3 + §4 note c.)
- **Transitive on the W22-W26 glass-atoms band** — W38 COMPOSES `.glass-material` (W22), `--card-spacing` (W24), `--radius-field`/`--radius-control` + `.tap-squish` + `transition-control` + the four-state contract (W25), the blanket `data-slot`/CVA idiom (W26). Verified present at HEAD (`eaba94f`, batch-1 integrated) in `src/styles/utilities.css` + `theme.css`.
- **dependsOn AX.W00** (transitive, band-wide) — the π visual-runtime lane is W38's close-criterion machinery.
- **Blocks:** nothing on the library critical path (the Configurator is a leaf surface with one demo consumer). W38 is itself a `dependsOn` of **AX.W39** (Lighthouse — it measures the FINAL surface AFTER the glass-atoms waves land) and **AX.W33** (close — gate-fleet registration of `proof:configurator-glass-atoms`).

---

## Archaeology (the git / prior-tranche lineage the audit cited)

- **AW.W29 — authored, never delivered.** The full wave spec `docs/tranches/AW/waves/AW.W29-aurora-configurator.md` exists (D-16 "the aurora CONFIGURATOR redesign"), with the `proof:configurator-glass-atoms` gate fully designed. `git log --all | grep -iE 'W29|aurora-configurator'` returns ONLY the AW planning commit `293a84b` ("Band G — the new-scope waves (W28-W32) + close to W33"). ZERO implementation commits. AW had no FINAL.md and no `proof:aw-final` close (`scripts/proof-aw-final.mjs` MISSING). (deep-audit-corpus slice-31 / aw-delivery: "W29/W30/W32/W33 are pure deferrals"; constellation gestaltFix: "the Configurator restyle and Carousel restyle become real component waves on the band-F glass-atoms spine … NO renumber-deferral.")
- **The AX renumber double-drop.** Slice-31's `routesToWave='AX.W26'` (Configurator restyle) was renumbered onto "TS god-module" in the AX charter, dropping the glass-atoms restyle's home — recovered as W38 (charter §4 note c, §3 W38 block; deep-audit-corpus routesToWave evidence).
- **The configurator's well-structured lineage** (NOT a revisit of the logic — context for the reader): the J.W4.A canonical studio shell, the L.W7 Lane B per-preset clone unification (`useConfiguratorState` `cloneMode`), the M.W2 Lane A recursion-free CSS reveal (`grid-template-rows: 0fr↔1fr`, replacing the reka-`<Presence>` recursion race — `docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md`), the N.W2 Lane A density axis. The defect is purely COSMETIC drift: the surface predates W22-W26 and hand-rolls its interaction literals.
- **The self-booked A-1/A-2** — `docs/tranches/AS/FINAL.md:146-155` (the kill-date `AT/3.3.0` self-booking); fourier `K/K.md:81,115,130,149` + `J/J.md:68,267` (the BOOK-with-kill-date); constellation-analysis-corpus finding (the "constellation debt lost" class §16.4 exists to catch).
- **Live re-diagnosis BEFORE the fix (the W00 ritual).** The four born-RED witnesses were re-confirmed against HEAD source at spec-authoring time: `Configurator.vue:237` (flat `bg-foreground` active), `:235` (`transition-colors` + `focus-ring`), `ConfiguratorRow.vue:91` (raw `active:scale-[var(--scale-press,0.97)]`), `ConfiguratorLayer.vue:103` (trigger no press), `grep -rn "data-slot" src/components/custom/configurator/` → ZERO. The execution pass re-confirms LIVE (computed-style, not source-grep).

---

## PreceptAlignment (the SPECIFIC precepts this wave pursues + must not violate)

Per the §2b C·AURORA band-binding precepts (`docs/precepts/` pinned `63240e6`):

- **substrate-with-consumer / wire-before-retire** (`LESSONS-LEARNED.md:419,544-545`; `SPEC.md:158`). The Configurator is an ALREADY-SHIPPED primitive with a LIVE consumer (the aurora studio shell — the proof surface). W38 dogfoods/restyles it; it does NOT mint a new speculative surface. PURSUANT: the restyle exercises the artefact's intent at default tone (β visual-load-bearing-ness — the glass-tier active chip must be visible over the live AuroraStage backdrop, not invisible near-cream-on-cream). The A-1/A-2 RATIFY note carries the ≥2-consumer witness (fourier #1 + demo story #2) so no surface ships substrate-without-consumer.
- **no-overfitting** (`README.md §Edicts` no-overfitting; `LESSONS-LEARNED.md:542-545`). MUST NOT violate: no new token, no new CVA variant, no new primitive — the wave composes the EXISTING band recipes (the `git diff` gate-8 enforces this). The A-1 deferral is pursuant — A-1 mints a recipe + token and is therefore OUT of the compose-only W38 scope.
- **one-path / no-legacy-code** (`README.md §Edicts`). PURSUANT: the raw `active:scale-[var(--scale-press,0.97)]` literal + the `transition-colors` ad-hoc class are RETIRED onto the single band canon (`.tap-squish` press-spring + `transition-control`) — no second motion vocabulary survives on the configurator surface. The chevron motion channel aligns onto the canonical `--spring-*`/`--duration-*` (coordinated with the W05 one-spring-vocabulary canon).
- **canonical-readme-shape** (`docs/precepts/canonical-readme-shape.md`) — band-bound for C·AURORA; W38 emits its audit json + the π-lane verdict in the canonical evidence shape (the close-wave README live-currency captures route through W33).
- **π visual-runtime lane** (`SPEC.md:216-246` "The π visual-runtime lane"; AX.W00). NON-NEGOTIABLE close criterion: the wave closes on an executed live Playwright + frontend-design audit (appearance/interaction axis), never on the headless gate alone — the structural antidote to the cardinal AW failure (green headless over visually-broken). The paired-π BEFORE/AFTER + DELTA protocol applies.
- **Gates close on evidence (no grep-only runtime gate)** (`SPEC.md §Hard Gates`). The `proof:configurator-glass-atoms` gate is a computed-style RUNTIME probe over the rendered story, NOT a data-slot grep — a precept-valid runtime/computed-style artefact form (charter §3 explicitly forbids the headless grep close).
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation** (`README.md §Edicts`; AX §0). PURSUANT: a sub-surface NOT resolving its band recipe is a library-internal violation the gate fails LOUDLY on (born-RED→GREEN); there is no fall-through/graceful-degrade path for a missing glass tier.

MUST NOT VIOLATE: the `inert`/`aria-expanded`/`role` collapse contract, the `grid-template-rows` recursion-free reveal, the density axis, and the per-preset clone state are PRESERVED VERBATIM — a regression there (especially re-introducing the M.W2 Lane A reka-`<Presence>` recursion race) is a triumvirate-escalation, not an inline patch.
