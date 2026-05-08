# K.WV — V-tranche post-hoc plan-folder write-up

**Opens after**: W0 close.
**Agents**: 1 (sequential historical write-up; docs-only).
**Hard gate**: `docs/tranches/V/V.md` authored against `0666be6..23ce73c` commit cohort; `waves/V.W{2,3,4}.md` per release; `FINAL.md` with absorbed-by-V ledger; precept invariant 3 (no tranche-letter shadow execution) satisfied retroactively.
**Status**: pending W0.

## Purpose

The 2026-05-08 reconciliation found that 67 commits between K open (`0666be6`) and HEAD (`23ce73c`) constitute an unwritten **V-tranche** — V.W2 foundation polish (v0.8.0 → v0.8.6) + V.W3 structural unions (cross v0.8.x) + V.W4 storybook + composables expansion (v0.8.4 → v0.9.0). The work shipped through commit messages and release notes only, with no `docs/tranches/V/` folder. Commit `6667370 feat(tests): smoke gate over storybook manifest (V.W4.T16)` references the V tranche numbering directly; release notes for `23ce73c` mention V.W2 / V.W3 / V.W4. But there is no V.md, no wave specs, no FINAL.md.

K invariant 3 (no tranche-letter shadow execution) is the binding precept. WV satisfies it retroactively by writing the V-tranche plan folder against the shipped commit cohort. The work itself isn't redone — it's already in master at HEAD. Only the documentation closes the loop.

## Scope

### Step 1 — Author `docs/tranches/V/V.md`

The V plan tranche-document. Sections:

- **Prelude**: V opens against J close `5bcf1ce`; closes at `23ce73c` (v0.9.0). Bridges the K opening and the K reconciliation moment.
- **Thesis**: V is the foundation-polish + structural-unions + storybook-expansion tranche. Where J converged the substrate via vocab.γ + α + β preconditions, V's V.W2 swept orphan tokens, V.W3 collapsed parallel primitives onto canonical chassis, and V.W4 expanded the public storybook surface to 24 composable entries + 9 missing primitive entries + token-tour pages.
- **Binding invariants**: catalog what V actually committed to (derive from commit log + release-note semantics).
- **Wave Schedule**: V.W2, V.W3, V.W4 with absorbed-from-K-open ledger.
- **Architectural transpositions executed**: 11+ (Section, ModalOverlay, LabeledField, menuItemVariants, density-rail, popover-animation grammar, `<MetricPill>`, `containerName` prop, `<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`, `useStoryDemo`).
- **Composable promotions**: `useTokenColor`, `useStagger`, `useAnimatedNumberMap` (v0.8.4) + 24 storybook entries (v0.9.0); 23 composables total in v0.9.0 release notes.
- **Token expansion**: `--icon-{2xl,3xl,hero}`, `--z-behind`, `--surface-tint-{quiet,floating,modal}`, `--opacity-disabled`, `.hairline-accent`, `--duration-shimmer` document.
- **Cross-tranche debt + deferrals**: items V didn't absorb (HEADLINE audacious-CTA, dispatch precept, bundle-budget gate, V.W5+ implications) — these are K's residuals.

### Step 2 — Author `docs/tranches/V/waves/V.W2.md`

V.W2 = foundation polish cohort, mapping to v0.8.0 → v0.8.6 commits. Hard-gate items derived from the commits:

- 12 orphan tokens excised (`afb2b34`)
- Duplicate `--leading` / `--tracking` retired in favor of `--type-*` canon (`c5e56a1`)
- `cartoon-shadow` collapsed; canonical glass tier adopted (`52cb1d8`)
- `<Notification>` consumes status-color foreground tokens (`221d783`)
- `<Sheet>` consumes canonical `.sheet-animate` (`89e6d40`)
- `<Button.glass>` consumes `.glass-wash` (`905a00e`)
- Popover-class shadow-md double-stack dropped on glass-floating (`69d6f7f`)
- GlassPanel migrated to 5-rung ladder (`f657d21`)
- Radii sweep: toggle/button/avatar/badge (`8912d4b`)
- Typography ladder migrations: Card + Label (`38b94ac`), Dialog/Sheet/Drawer titles (`cf3bf37`)
- Empty-wrapper-SFC KEEP-as-3-line-wrapper decisions for 11 SFCs (`6086fb1`)
- `useStagger` PRM brackets (`18aa1ca`)
- `useAnimatedNumber` clamp progress mode (`9d2b2ba`)
- v0.8.4 composable promotion (`useTokenColor` + `useStagger` + `useAnimatedNumberMap`)
- v0.8.5 release: `-webkit-backdrop-filter` drop + `release.sh` script tightening
- `<MetricPill>` primitive (`0601d62`); `<MetricBadge>` stacked (`96dd160`); `containerName` prop (`d62a836`)

### Step 3 — Author `docs/tranches/V/waves/V.W3.md`

V.W3 = structural unions cohort:

- `<Section>` sectioning primitive over typography ladder (`d2247c8`)
- Active-state vocabulary canon: BouncyToggle + UnderlineTabs (`3e925e1`)
- `<LabeledField>` parent SFC + `.labeled-field-label` utility, 4 wrappers compose (`05e1d44`)
- `<ModalOverlay>` collapses 3 scrim declarations onto _shared SFC (`43bee82`)
- `.popover-content` utility collapses 2 W1 survivors (`1841de5`)
- `menuItemVariants` collapses 9 menu/picker primitives onto shared CVA (`6e6916e`)
- Density-rail unification: GlassDock + DockGroup + MetricPill onto `data-density` canonical (`c3df06e`)
- `gold-shimmer` wrapped in PRM no-preference bracket (`55c544f`)
- Resource hints + `.browserslistrc` (`08ffbde`)
- Popover-animate + slide-in-from-side standardised on @utility (`c0b8992`)
- Hover-popover + floating-panel unified onto canon grammars (`7ed3b73`)
- Surface-tint tier aliases bridged: quiet/floating/modal (`44f2414`)
- Theme bridges + new icon + z-behind tokens (`a6aac47`)
- Tokens: `--icon-{2xl,3xl,hero}` (`4cc8571`, `a371fe7`), `--z-behind` (`ee34655`)
- Hairline-accent canonical (`b66891d`)
- Notification + slider canonical glass-blur (`21be437`); Notification + toast canonical tier shadows (`1c3355a`)
- `<Sheet>` canonical sheet-animate (`89e6d40`); button.glass canonical glass-wash (`905a00e`)
- `dark-mode-toggle` focus-visible ring (`5a8a7f8`)
- `<Badge>` success/warning/info variants (`5dfe6fb`)
- Menu-item three-state contract data-[disabled] selectors (`2e01d68`)
- Focus-ring `.glass-btn` unified onto box-shadow form (`0187c7d`)
- Opacity-disabled bridge + 12-component sweep (`a22f335`)
- v0.8.6 release: bundled patches per audit a/b/c/d

### Step 4 — Author `docs/tranches/V/waves/V.W4.md`

V.W4 = storybook + composables expansion cohort:

- `useStoryDemo` canonical play/reset/status harness (`227e1b0`)
- `<StorySection>` demo-side label + body chassis primitive (`deff97a`)
- `<ShowcaseFrame>` pad knob 5 rungs over rounded-card showcase chassis (`8136baf`)
- `<DockShowcaseFrame>` chassis-aware showcase frame for 13 dock sites (`60fd745`)
- `<TokenLadder>` + `<ToneSwatch>` token tour primitives (`cfbcb48`)
- 9 missing primitive entries (`fb38034`)
- `<Toaster>` story (`1fdfd4d`)
- `<Badge>` success/warning/info variants demo (`a686f78`)
- 24 composable storybook entries (`323d675`)
- Story typecheck reconcile: v-pre + ref-unwrap (`d7a90f4`)
- Token-tour pages: surface tints (`f8d3bed`), overlays & scrims (`879e9ff`), chart & chassis palette (`3828c15`)
- `<Toast>` raw Tailwind tones retired for semantic tokens (`ea7005d`)
- `<Badge>` story adopts `<StorySection>` (`1c9a487`)
- Storybook smoke-gate test (`6667370` — V.W4.T16)
- v0.9.0 release: chassis primitives + 23 composables + structural unions + foundation polish (`23ce73c`)

### Step 5 — Author `docs/tranches/V/FINAL.md`

V's retrospective. Sections:

- **Tranche thesis** + opening + closing dates.
- **Wave-by-wave table** with status + commit hash + close evidence.
- **Substrate convergence stats**: orphan tokens excised, primitives collapsed, composables promoted.
- **Process observations**: V shipped without a plan-folder structure. This was a precept violation per K invariant 3 (codified retroactively). The work itself was high-quality (61 commits over ~3 weeks; 5 mid-tranche releases), but the absent-plan-folder pattern meant later reconciliation faced unattributed work.
- **Cross-tranche debt + named-destination residuals**: items V flagged but didn't close (HEADLINE audacious-CTA → K W6; dispatch precept → K W0; bundle-budget gate → K W4; doc-drift → K W4 expanded; aurora chrome unification → K cross-tranche debt → L if pursued).
- **Authority**: V closes retroactively; its successor is K (already open since `0666be6`); K's reconciliation walks V's deltas.

### Step 6 — Verify K.md cross-citations

K.md already cites `0666be6..23ce73c` and v0.9.0 in its Prelude. After V is written up, verify K invariant 3 + K invariant 4 cross-reference WV's deliverables. No edits to K.md expected — it already names WV.

## File bounds

- May CREATE: `docs/tranches/V/V.md`
- May CREATE: `docs/tranches/V/waves/V.W2.md`, `V.W3.md`, `V.W4.md`
- May CREATE: `docs/tranches/V/FINAL.md`
- May CREATE: `docs/tranches/V/PROGRESS.md` (optional; minimal: states "tranche written up post-hoc")
- May READ: full git log, release notes, source files at HEAD for verification.

**MUST NOT TOUCH**:
- Any `src/`, `demo/`, or non-V `docs/tranches/` paths.
- W0 territory, W1 territory, W3 territory, W4 territory, W5 territory, W6 territory, W7 territory, WP territory.

## Hard gate

(a) `docs/tranches/V/V.md` exists with prelude + thesis + invariants + wave schedule + transpositions + cross-tranche debt sections.
(b) `docs/tranches/V/waves/V.W2.md`, `V.W3.md`, `V.W4.md` each cite their cohort commits with SHAs.
(c) `docs/tranches/V/FINAL.md` exists with retrospective + transposition catalog + named residuals.
(d) `docs/tranches/V/PROGRESS.md` exists (even if minimal) for parallel-folder hygiene with other tranches.
(e) K invariant 3 satisfied: V is no longer commit-message-only; the plan-folder structure exists.
(f) `npm run typecheck` + `npm run build` + `npm run test` green (sanity — WV is docs-only; should not regress anything).
(g) Proof doc `audit/WV-v-tranche-postwriteup-proof.md`:
   - Each V.W{2,3,4} commit cohort cited with attribution rationale.
   - Architectural transposition catalog cross-referenced against V.W3.md.
   - 12 orphan-token excision (`afb2b34`) verified to satisfy K invariant 8 (substrate-without-consumer binary).
(h) orchestrator commits WV close: `docs(tranche-k/wv): V-tranche post-hoc plan-folder write-up against 0666be6..23ce73c`.

## Required artifacts

- `docs/tranches/V/V.md`
- `docs/tranches/V/waves/V.W{2,3,4}.md`
- `docs/tranches/V/FINAL.md`
- `docs/tranches/V/PROGRESS.md`
- proof doc `audit/WV-v-tranche-postwriteup-proof.md`
- updated `docs/tranches/K/PROGRESS.md`
- WV close commit hash
