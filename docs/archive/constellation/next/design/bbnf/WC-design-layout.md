# WC — BBNF Playground: Layout, Spatial Composition & glass-ui Idioms

LENS: Layout, spatial composition & component idioms. SPEC ONLY — no app edits, no builds.
SCOPE: `/Users/mkbabb/Programming/bbnf-lang/playground` — the `/playground` route (split-pane editors + GlassDock control rail).

---

## AESTHETIC DIRECTION

The playground is a **grammar workbench** — it should read as a precision instrument, not two stacked text boxes. Today it is honest but timid: `PlaygroundPage.vue:119-155` renders a perfectly symmetric mirror — `LeftPane` (a `Card variant="pane"`) | hand-rolled divider | `RightPane` (an identical `Card variant="pane"`). Two interchangeable rectangles split 50/50 is the most predictable layout possible; nothing tells the eye that the LEFT is *authoring* (source of truth) and the RIGHT is *derived* (the machine's answer). The whole surface floats on a flat `bg-background` (`main.css:11-13`) with zero atmospheric depth, while glass-ui ships an Aurora WebGL backdrop and a 5-rung glass ladder that the app never reaches for.

Direction: lean into the **authoring → derived asymmetry** and give the workbench a substrate. The two panes are the same component but should NOT be the same tier — the input side sits forward (a `floating`-rung surface, the thing you touch), the output side recedes (a `quiet`/`resting` rung, glass you read through). Anchor the whole stage on a single low-saturation Aurora wash keyed to the active example's pastel tone, so the background quietly answers "which grammar am I in." The typography axis is already strong and on-brand — keep Instrument Serif as the characterful display, JetBrains/font-mono for code — do not touch it; this is purely a spatial + tier + motion refinement.

---

## TOP REFINEMENTS (surface → glass-ui lever)

### 1. Break the mirror — tier the two panes (authoring forward, derived back)
`PlaygroundPage.vue:120,147` wraps both panes identically and `EditorPanel.vue:38` gives BOTH `Card variant="pane"` with the SAME `!shadow-none`. The result is two flat equal rectangles. Make the split express hierarchy:
- **LeftPane (authoring):** `Card variant="floating"` (or keep `pane` but restore shadow) — the forward, touchable surface. Bias the default split ratio off 50/50 toward the source (`useSplitPane` initial fraction ≈ 0.46 input, so the authored grammar reads as primary, output as response). This is a single-prop change at `EditorPanel.vue:38` driven by which pane it is.
- **RightPane (derived):** `Card variant="quiet"` or `glass-resting` rung — recessed, read-through glass. The derived AST/format literally sits *behind* the authoring plane.

glass-ui lever: the existing **5-rung glass ladder** (`glass.css` `.glass-{wash,quiet,resting,floating,overlay}`) and `Card` `variant` prop. Pass `variant` down through `EditorPanel`'s prop surface instead of hardcoding `pane`.

### 2. Atmospheric substrate — Aurora wash keyed to the active example tone
The stage at `PlaygroundPage.vue:116` is `bg-background` flat. The app already computes a per-example pastel tone (`toneMaps.ts`, `preset-bbnf.css:26-31` `--pastel-*`) and a `--color-${color}` per tab (`EditorPanel.vue:44`). Mount `Aurora` from `@mkbabb/glass-ui/aurora` as an absolutely-positioned backdrop layer (z-index below the split container) with a low `intensity` and 1–2 nuclei tinted to the **current example's pastel** — a quiet living wash that shifts when you swap grammars. Pair with `useConfiguratorState<AuroraConfig>` (`cloneMode='per-preset'`) so each example owns its preset.

glass-ui lever: `Aurora` + `useAurora` (standalone ~16 KiB WebGL chunk, root barrel does NOT drag it in) + `AuroraConfig`/`DEFAULT_AURORA_CONFIG` from `/api`. Honor `prefers-reduced-motion` by falling back to a static `paper-backdrop` / `.paper-texture` fill.

### 3. Replace the hand-rolled divider with the dock/separator idiom
`PlaygroundPage.vue:131-145` is ~15 lines of bespoke `<button>` reinventing a resize grip: manual `border-border/50 bg-card/35`, a nested `inset-[1px] bg-card/70 backdrop-blur-xl` span, a `GripVertical`. This is a raw div reinventing a glass primitive. glass-ui ships `.dock-separator` (used correctly right next door at `ControlsBar.vue:42,65`) and the dock surface tokens. Re-express the divider against the **same separator/glass tokens** the dock uses, so the resize seam visually belongs to the same instrument as the control rail rather than being a one-off card sliver. Keep the pointer/keydown contract from `useSplitPane`; only the skin changes.

glass-ui lever: `.dock-separator` token + `glass-quiet`/`floating-panel` surface tokens for the grip handle. Cross-reference the `InstrumentChassis` `RegionDivider` groove idiom for the visual language of a seam between two instrument regions.

### 4. Promote the editor stage into an InstrumentChassis
The split container (`PlaygroundPage.vue:117-179`) is a plain `absolute inset-0 ... flex flex-col` div holding two cards + a control dock at the bottom. That is exactly the shape `InstrumentChassis` exists for — a bezel'd instrument housing with groove `RegionDivider`s between regions and a bottom control strip. Wrapping the stage in `InstrumentChassis` (from the root barrel) gives the workbench a deliberate machined edge, unifies the bottom `GlassDock` rail as a chassis region rather than a floating island (`ControlsBar.vue:32` is `absolute bottom-0`), and replaces ad-hoc `border-b border-border/50` seams (`EditorPanel.vue:39`) with the chassis groove language. Phase can map to pipeline state (`isProcessing` → `ping`, errors → a destructive tint, clean → `ready`/`complete`) via `InstrumentChassisPhase`.

glass-ui lever: `InstrumentChassis` + `RegionDivider` (root barrel, cherry-picked) + `InstrumentChassisPhase` union (use `ping` for the generic processing state — do NOT invent a `parsing` member).

### 5. One orchestrated page-load over scattered fades
Entry today is incidental: a `page-fade` opacity tween (`main.css:83-85`) plus per-pane `Transition name="mobile-pane"` swaps. There is no sense of the instrument *assembling*. Replace the flat page-fade with a single **staggered reveal** — chassis bezel settles, then LeftPane authoring surface, then the divider seam, then the derived RightPane, then the dock rail rises into place (`ControlsBar` is already `start-collapsed` — let it animate up as the final stagger beat). One orchestrated load sequence reads as intent; the current scattered micro-fades read as default.

glass-ui lever: `useStaggerReveal` / `useSpringOrchestrator` (composables `motion/` sub-tree, root barrel) to sequence the chassis → panes → divider → dock beats off a single timeline.

---

## NOTES / GUARDRAILS

- **Refinement, not redesign.** Every item reuses an existing glass-ui primitive the app already depends on (`@mkbabb/glass-ui@^3.0.0`); none requires new library work. The Aurora and InstrumentChassis chunks are already published subpaths/root-barrel exports.
- **Typography is already correct** — Instrument Serif display + font-mono body is distinctive and on-brand (`EditorPanel.vue:43`, `preset-bbnf.css:8`). Do not regress it to a generic stack.
- **Density vs negative space:** the bottom dock collapse (`ControlsBar.vue:33` `:start-collapsed` `:collapse-delay="2000"`) is a deliberate, good negative-space move — preserve it. The refinements add depth/hierarchy, not clutter.
- **Mobile path** (`PlaygroundPage.vue:158-178`) already swaps single panes; tier (#1) and substrate (#2) apply there too — the single visible pane should still be the *forward* tier, Aurora still washes behind.

## FILE WRITTEN
`/Users/mkbabb/Programming/glass-ui/docs/constellation/next/design/bbnf/WC-design-layout.md`
