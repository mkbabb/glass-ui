# G - Design-Language Vocabulary Expansion

G follows F's interaction/style/rendering hardening. F closed token correctness, style authority, public-surface trim, dock-as-one-family, and Aurora runtime — the substrate is now coherent enough that an additive vocabulary tranche can land without contradicting itself. The opening thesis is named by the user: refine glass-ui's design language along *glassmorphic + paper + cream + colorful flourishes + mathematical + modern skeuomorphic with shadowing + bold + audacious + large typography + large/audacious iconography*. G is the tranche that crystallizes the implicit identity into named, exposed, story-documented primitives — and absorbs the cross-consumer drift that has accumulated against the missing names.

## Prelude

The planning prelude read F's FINAL.md, the tranche/precept documentation, the canonical style audit (`docs/audits/style-audit.md`), the overfitting audit (`docs/audits/overfitting-audit.md`), and dispatched seven parallel read-only research lanes — one for `@mkbabb/glass-ui` itself, one each for six prospective consumers (`speedtest`, `fourier-analysis/web`, `words/frontend`, `keyframes.js`, `value.js`, `bbnf-lang/playground`). Each lane applied all seven style-audit axes plus a design-language extension lens against its disjoint slice. Per-lane reports are in `docs/tranches/G/research/A-glass-ui-self.md` through `G-bbnf-lang-playground.md`; the orchestrator synthesis is `docs/tranches/G/research/00-synthesis.md`.

The synthesis surfaces ~215+ drift rows that converge on ≤25 canonical replacements, ~43+ deduplicated library gaps, ~23 risk-register entries (consumer-preset territory), and 3 silent-failure visuals where consumers reference classes that never landed in canon. The user-named axes map onto concrete primitives, each with cited call sites clearing the `feedback_overfitting_audit` ≥2-call-site bar. (Counts will be re-tallied in W0 once the bbnf-lang/playground lane folds into the synthesis.)

## Thesis

G makes the eleven-axis design language a consumable vocabulary instead of an implicit one. Every axis the user named — cream, paper-without-blur, colorful flourishes, mathematical, modern skeuomorphic shadowing (folded into the existing cartoon-shadow family — no new bevel vocabulary), bold/audacious large typography, large/audacious iconography — already lives in glass-ui as either tokens-without-utilities, utilities-without-stories, dead recipes, or unrealized type-axis settings. G names them, exposes them through `@theme`, builds the missing primitives that ≥2 consumers already evidence, fixes the silent failures, and proves the result by producing per-consumer migration ledgers — no consumer-repo edits land in this tranche; that scope is owned by each consumer's own follow-up. No backwards-compatibility shims, no consumer-specific tokens, no preset bloat — clean breaks per `feedback_no_backwards_compat` and presets-stay-in-consumers per `feedback_presets_in_consumer`.

## Design POV (frontend-design lens applied)

G is a **bold-maximalist** tranche, not a refined-minimalist one. The user-named axes are deliberately audacious; restraint is the wrong default. Choices flow from one commitment:

- **Substrate**: warm cream (hue 48) is the identity, named publicly, paired with paper texture and `--neutral-{0..5}` warm-charcoal for type. Not generic neutral gray.
- **Typography**: Fraunces with per-rung axis tuning — display-mega and display-ultra get specific WONK/SOFT/wdth combinations so audacious sizes feel softer and slightly wider, not pinched.
- **Iconography**: extends to 4.5rem `--icon-mega`. Stamped, embossed, and accent-tinted variants. Empty-state and feature glyphs are 32–72px, not 16–24px.
- **Color**: `--rainbow-{vivid,pastel}`, gold family, viz-basis hues. Surfaces ship rainbow-stroke and gold-shimmer utilities so flourishes are first-class, not consumer hand-rolls.
- **Motion**: `--ease-apple-spring`, golden-ratio frequencies (`1/φ²` for breath cadence), per-rung Fraunces axis transitions tied to scroll. Quiet by default, audacious on demand.
- **Modern skeuomorphic**: extended cartoon-shadow with accent-tinted recipe (`--shadow-cartoon-accent`); bevel vocabulary explicitly out of scope. Shadow-as-flourish, not shadow-as-physics.
- **Mathematical**: opt-out impossible — `math.css` is default-included; `<MathFormula>`, `<MathGlyph>`, `<ProductionRule>` ship as primary primitives; golden-ratio spacing exposed via `--space-phi-{1..4}`.
- **Mascot**: the Blob primitive is the design language's character expression at every scale (swatch to hero). Specified in full at `docs/tranches/G/blob/SPEC.md`.

W4 stories evidence this commitment in every composition. A "design fidelity gate" in W4 requires that each new story land a deliberate design choice visible in <2 seconds of looking; corporate-safe demos fail the gate.

## Sub-tranche structure

G has one dedicated sub-tranche, the Blob primitive, because its scope (WebGL renderer rewrite + 11 greenfield improvements + the deepest cross-consumer absorption in the tranche) is large enough to need its own discipline.

- **Sub-tranche β — Blob**: `docs/tranches/G/blob/`. Spec at `SPEC.md`; waves at `waves/Wβ0.md` through `Wβ3.md`. Runs as its own track from G.W3 onward; final close folds back into G.W5's overfitting audit.

The Blob sub-tranche is sequenced to allow Wβ0 to start in parallel with G.W0, since their inputs are disjoint (G.W0 reads consumer code; Wβ0 reads the spec). Wβ1 cannot start until G.W1 ships the new tokens it consumes (`--ease-apple-spring`, `--blob-*` tokens, `--space-phi-*`).

## Binding Invariants

1. C, D, D-II, E, F precepts still bind: KISS, no quick fixes, no workarounds, no legacy codepaths, no silent deferrals, consumed substrate, evidence over claims.
2. No backwards-compatibility shims. Token renames and surface-tier additions are clean breaks; orphan tokens (`--accent-pink`, `--shadow` alias) get removed.
3. Every new src/ artefact (token, utility, component, composable) must clear the `feedback_overfitting_audit` ≥2 call-site bar — either ≥2 prospective sites in this repo + cited consumer sites, or it is a primitive other proposals depend on. Single-site additions belong in consumer presets per `feedback_presets_in_consumer`.
4. Tailwind-first per `feedback_tailwind_first`: new utilities are expressed via `@theme` + `@utility`, never pasted from external CSS. Rainbow-pastel exposure goes through `@theme` so `bg-rainbow-pastel-*` resolves natively.
5. One style authority per family. Paper tier and glass tier are siblings, not overlap. Math typography is default-included via the `src/styles/index.css` cascade so `<MathSurface>` works without per-consumer remembering — KaTeX `@font-face` boilerplate stays consumer-side.
6. Cream is the existing identity made nameable, not a new color. Cream tokens land in `src/styles/tokens.css` as canon defaults — `bg-cream` becomes a public surface noun. Named themed presets (palette tooling, etc.) still live in consumers per `feedback_presets_in_consumer`.
7. Every new surface (paper-1..4, cream-surface, formula-block) must carry `prefers-reduced-transparency`, `prefers-contrast: more`, and `@supports not (backdrop-filter)` fallbacks where applicable. **No new skeuomorphic shadow vocabulary** — the modern-skeuomorphic axis is delivered by extending the existing `--shadow-cartoon-*` family with an accent-tinting recipe (`--shadow-cartoon-accent` consuming `--cartoon-accent-color`). No bevel/inset pair.
8. New components compose canonical glass tier + z-token + Vue Transition + interactive vocabulary; no bespoke recipes.
9. Storybook is the oracle. Every new token, utility, and component lands a story; if a story can't be written, the API isn't ready.
10. DESIGN.md numeric drift (z-index claims contradicting tokens, icon-utility claims unsupported by source) is a docs-only fix in W1 — no source changes from doc reconciliation.
11. Five silently-broken consumer references (`gold-shimmer` text, `dashed-well`, `stagger-children`, `rainbow-vivid`/`rainbow-pastel`, `active-scale`/`disabled-base`) are each resolved by either shipping the canonical utility in W2 or naming the consumer cleanup as a migration-ledger item in W5. The `active-scale`/`disabled-base` pair is *not* re-added (F.W4 removed them as redundant with `.interactive-item` + Tailwind one-liners; W5 ledger names the migration).
12. W5 is proof-by-ledger, not consumer-repo edits. For each consumer, W5 produces a migration ledger (`W5-{consumer}-migration.md`) enumerating the exact edits required and the projected drift drop, against a measured baseline established in W0. No edits land in the consumer repos as part of this tranche.
13. Runtime tokens (`spectrumColor`, `goldenShimmer`, `chartNeutrals`, `vizColorsHex`, `NAMED_EASING_BEZIER`) ship under the existing `@mkbabb/glass-ui/tokens` subpath — no new public subpath. Surface-trim discipline from F holds.
14. Watercolor / blob / metaball primitives lifted from `value.js` (`useWatercolorBlob`, `useMetaballRenderer`, watercolor SVG filter pack, `<Swatch variant="watercolor">`, `<HeroBlob>`/`<GooBlob>` general primitive) land in `src/components/custom/blob/` and `src/components/custom/svg-filters/`. Mulberry32 PRNG promotes with them.

## Artifacts

- Research synthesis: `docs/tranches/G/research/00-synthesis.md`
- Per-lane reports: `docs/tranches/G/research/{A..F}-*.md` (six lanes)
- Initial challenge: `docs/tranches/G/audit/W0-challenge.md` (W0)
- Wave specifications: `docs/tranches/G/waves/W0.md` through `W5.md`
- Agent dispatch template: `docs/tranches/G/dispatch/AGENT.md`
- Progress log: `docs/tranches/G/PROGRESS.md` (W0)

## Wave Schedule

### Main track

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Ledger consolidation + measured baselines + challenge | 3 | parallel read-only audit + orchestrator synthesis | gap list classified (vocabulary / convergence / silent-failure-or-dead-code); DESIGN.md drift scoped; **measured drift baseline per consumer**; W1-W5 amended with exact files+symbols | open |
| W1 | Token foundations | 1-2 | implementation on `src/styles/tokens.css`, `theme.css`, `typography.css` + DESIGN.md docs sync | new tokens compile under Tailwind v4 (incl. `--blob-*` consumed by sub-tranche β); retired tokens have zero references; DESIGN.md numeric drift closed | pending |
| W2 | Surface CSS + utilities | 2-3 | implementation on `src/styles/{paper,glass,cards,utilities}.css` + new `math.css` + `prism-theme.css` | new utilities apply; generated `.icon-{xs..mega}` exist; silent failures resolved (incl. `code-badge`, `blue-shimmer`); a11y fallbacks shipped; math.css default-included via `index.css` cascade | pending |
| W3 | Components + CVA branches + composables (excluding Blob family) | 4-5 | implementation on disjoint component families | new components mount in dev; CVA branches type-check; slot-class props cover prior `:deep()` sites; runtime-tokens additions under `@mkbabb/glass-ui/tokens` (no new subpath); `useMonacoTheme()`, `<PipelineFlow>`, `<LiveSnippet>` ship | pending |
| W4 | Storybook taxonomy | 2 | implementation on `demo/stories/manifest.ts` + new story files | every new token/utility/component has a story; refactored compositions consume new primitives; design-fidelity gate clears every new story | pending |
| W5 | Consumer migration ledgers + close | 1 (orchestrator) | proof-by-ledger; no consumer-repo edits | 6 migration ledgers; overfitting audit re-runs clean (incl. Blob items); residuals ≤5 | pending |

### Sub-tranche β (Blob primitive)

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| Wβ0 | Spec lock + reference shader review | 1-2 | spec finalization + read-only shader compile smoke | five SPEC.md §11 questions decided; GLSL reference compiles; Wβ1-Wβ3 amended | open (parallel with W0) |
| Wβ1 | Composables + WebGL renderer | 3 | implementation on `src/composables/blob/`, `src/composables/utils/`, `src/composables/motion/` | seven composables independently testable; WebGL2 + Canvas2D fallback both render; deterministic seeds; cleanup contract verified | pending Wβ0 + W1 |
| Wβ2 | `<Blob>`, `<Swatch>`, `<SvgFilters>` | 2 | implementation on `src/components/custom/{blob,swatch,svg-filters}/` | components render; PRM/RT/contrast-more contracts visually confirmed | pending Wβ1 |
| Wβ3 | Story + stress test + sub-tranche close | 1 | story + perf profile + close | `primitives/blob` story is bold-maximalist (frontend-design fidelity); SPEC.md §9 perf budget met; value.js migration targets reachable; BLOB-FINAL.md | pending Wβ2 |

The sub-tranche close folds into G.W5's overfitting audit (Blob exports counted alongside the rest of W3's additions).

## Out of scope (explicit)

- Plugin extraction (still deferred; F left this for a later tranche).
- Bundle/CSS size floors as hard gates (F established baselines; G's deltas are measurements, not gates).
- Consumer-repo edits. Consumer migrations land in each consumer's own follow-up tranche; W5 produces ledgers, not edits.
- Consumer-specific tokens or presets (per `feedback_presets_in_consumer`).
- New skeuomorphic shadow vocabulary. The modern-skeuo axis is delivered by extending the existing cartoon-shadow family with accent-tinting; no bevel/inset pair, no `.glass-skeuo` tier, no `Switch variant="skeuo"`.
- New public subpath. Runtime additions live under existing `@mkbabb/glass-ui/tokens`.
- `--accent-pink`, `--section-heading`, `--accent-red` orphan tokens — retired in W1, not preserved.
- `brand-uniform-sans` typography preset — retired (single-presence orphan); the symmetric `brand-uniform-display` does *not* ship (consumer-side preset territory).
- `.active-scale` / `.disabled-base` re-add — F.W4 removed them as redundant with `.interactive-item` + Tailwind one-liners; W5 migration ledger names the consumer-side fix.
- Color-math primitives, color-picker family, KaTeX `@font-face` boilerplate, SRS mastery system, motion-engine domain composables, palette-browser API, Monaco editor theming, formal-grammar parsing — all consumer territory per the synthesis risk register.
- Aurora visual expansion (F closed this; G touches only what new flourish utilities surface).
- Dock orientation work beyond the `:keepOpenWhile` slot prop and `defineDockActionBar` factory (F closed dock as one family).
