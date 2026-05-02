# F Research - Eight-Lane Audit Synthesis

This synthesis records the read-only prelude used to design F. Agent findings were treated as inputs, not authority. The tranche plan narrows them into one executable path that preserves E's package contract while repairing current drift in components, style, dock, Aurora, stories, consumers, and proof scripts.

## Documentation Ingested

Internal governance and tranche process:

- `docs/instructions/README.md`
- `docs/precepts/README.md`
- `docs/precepts/instructions/README.md`
- `docs/precepts/instructions/ORCHESTRATION.md`
- `docs/precepts/instructions/CONSUMING.md`
- `docs/precepts/instructions/LESSONS-LEARNED.md`
- `docs/precepts/instructions/tranche/{README,START,SPEC,RESEARCH,CHALLENGE,WAVE_SPEC,DOC_UPDATE_WAVE,AGENT_DISPATCH_TEMPLATE}.md`

Prior tranche lineage:

- `docs/tranches/C/**` selected plan, progress, final, and audit artifacts
- `docs/tranches/D/**` selected plan, progress, research, waves, final, and handoff artifacts
- `docs/tranches/D-II/**` selected plan and progress artifacts
- `docs/tranches/E/**` plan, progress, research, waves, audits, proof, and final artifacts

Appurtenant audit and style material:

- `docs/precepts/audits/overfitting-audit.md`
- `docs/audits/style-audit.md`
- Aurora design and implementation notes under `src/components/custom/aurora/**`

External references to keep W4/W5 current:

- Tailwind functions/directives and theme-variable namespace docs: https://tailwindcss.com/docs/functions-and-directives and https://tailwindcss.com/docs/theme
- Tailwind v4 release architecture notes: https://tailwindcss.com/blog/tailwindcss-v4
- MDN WebGL best practices: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
- MDN OffscreenCanvas: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
- Kyprianidis et al. 2013 NPR taxonomy: https://www.kyprianidis.com/p/tvcg2013/

## Lane A - Plan Lineage And Drift

Accepted findings:

- C and D established the standing rules: delete or wire substrate, prove consumers, avoid shims, commit natural milestones, and close with evidence.
- D-II showed why planning and current-state ledgers matter: implementation before tranche design created recovery work.
- E narrowed the package boundary, but F must account for consumers that still import non-core root symbols.
- Old plugin-first F is stale. E explicitly retired fixed CSS byte gates until stable baselines exist.

Plan implication:

- F starts with W0 ledgers and W1 proof/consumer enforcement, not style extraction.

## Lane B - Frontend Components, Composables, State

Accepted findings:

- `FuzzySearch.vue` and its composables mix modal/input/results/focus/cache concerns; the query-keyed module cache can leak stale results across instances.
- Consumer-provided `v-html` in UI components needs a trusted/sanitized boundary or a component/slot replacement.
- `DataTable.vue` can collapse row identity when `_id` is absent, and unused pagination state clouds the contract.
- `AuroraConfigDock.vue` is over 500 lines and mutates prop-owned config through a dense editor surface.
- Dock state uses global document/query behavior that should become scoped context/registry behavior.
- Empty custom directories should be populated by real ownership or removed.

Plan implication:

- F.W3 owns component safety and idiomatic Vue splits after W1 proof and W2 dock context.

## Lane C - Tailwind, CSS, Tokens, Styling

Accepted findings:

- Tailwind v4 theme variables use namespaces such as `--font-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--shadow-*`, `--blur-*`, and `--ease-*`; current theme aliases include inert/non-idiomatic names that do not generate expected utilities.
- Some `@theme` variables self-reference runtime tokens and should be replaced by deliberate theme/runtime bridges.
- `src/styles/index.css` is the only public CSS entry, but it imports every style module and broad component source.
- Dock CSS authority is split between `src/styles/dock.css` and scoped SFC styles.
- Z-index, viewport, motion, shimmer, notification, and story-surface styles include hard-coded or brittle rules.

Plan implication:

- F.W4 fixes theme and style authority before any plugin or byte target is considered.

## Lane D - Aurora Runtime, Shader, Studio

Accepted findings:

- Aurora has a real WebGL2 implementation and a substantial demo studio, but the public/runtime surface has drift.
- `brokenColor` is exposed in config/UI/uniform upload but appears unused by the shader.
- `strokeLayers: 2` is likely incorrect because oil flow is recomputed instead of using the alternate flow.
- `uDpr`, `hueShift`, `mediumSmooth`, and aspect-path variables need live-use or deletion decisions.
- `renderAt()` mutates runtime state while the animation loop can be active.
- `preserveDrawingBuffer: true` is load-bearing for capture but likely not needed for every live runtime.
- Aurora docs contain stale route paths.

Plan implication:

- F.W5 hardens the current single-pass WebGL2 path before visual expansion, with runtime and benchmark proof.

## Lane E - Dock, Rail, Navigation, Layering

Accepted findings:

- The vertical dock is a real `GlassDock variant="rail"` surface, but layer groups do not automatically inherit vertical orientation.
- Dock blur is not absent: the current dock tier is deliberately reduced. The issue is naming and proof, not reverting to heavy blur.
- `DockPopover` computes inline z-index while CSS names a token, creating split layering authority.
- Transition cleanup uses a hard-coded timeout rather than transition duration/runtime state.
- Click-away transition guarding is wired but not actually toggled.
- Teleport target detection depends on roles/classes rather than owned portal markers.
- Navigation stories partially consume dock substrate and partially rebuild raw buttons.

Plan implication:

- F.W2 owns dock context, layer inheritance, z-index, portal ownership, blur tokens, and navigation substrate.

## Lane F - Public Surface, Dead Code, Consumers

Accepted findings:

- E's intended package contract is sound, but consumer reality is wider than the documented core surface.
- `speedtest` and `bbnf-lang/playground` still show non-core root imports that should migrate to explicit subpaths rather than drive root shims.
- Broad internal barrels and public helper exports need consumer-backed retention or internalization.
- README and consumer-evidence docs contain stale references and incomplete evidence for newer consumers.

Plan implication:

- F.W0 records exact consumer/import drift. F.W1 migrates/enforces before any export trimming.

## Lane G - Velocity, Profiling, Proof

Accepted findings:

- Fast scripts exist, but profiling commands are mostly labels without machine-readable artifacts.
- Packed package fixture and runtime smoke proof exist in E docs, not in durable scripts.
- Consumer validation mixes static policy, package contract, and builds.
- Close proof does not yet cover export verification, packed fixture, runtime smoke, bundle snapshots, and consumer policy as one command tier.

Plan implication:

- F.W1 promotes proof scripts and artifacts before product implementation, so later waves can move faster with less ceremony.

## Lane H - Story And Demo Substrate

Accepted findings:

- Intro category cards use hash links while the router uses history mode.
- The configurator changes only one shadow variable while many surfaces hard-code other shadow classes/tokens.
- Story source-view substrate is declared but not wired.
- Flat stories bypass shared story navigation and keyboard/pager behavior.
- Some story grids and cards use brittle inline layout or raw surface styling instead of the shared primitives.

Plan implication:

- Story substrate fixes are split across W2/W4/W6 depending on whether they relate to navigation, style authority, or close proof.

## Rejected Or Narrowed Claims

- Rejected: "The vertical dock is not a true dock." It is a `GlassDock` variant; the defect is incomplete orientation/layer/style proof.
- Narrowed: "Default dock blur is missing." Current default blur is reduced by token. F should name, test, and preserve the tier unless W0 proves a real visual regression.
- Rejected: "Re-open old Tailwind plugin hard gates." Theme correctness and style authority must precede plugin or byte gates.
- Narrowed: "Aurora needs SOTA expansion now." F.W5 first fixes live runtime/shader mismatch, then validates any SOTA-inspired simplification or expansion against benchmarks.
- Rejected: "Keep compatibility root imports while consumers migrate." F uses one path and same-wave migration.

## Binding Decisions For F

1. F is a hardening tranche, not a plugin extraction tranche.
2. W0 produces current ledgers before implementation.
3. W1 promotes proof and consumer enforcement before product edits.
4. Dock, component, style, and Aurora work are separate waves with disjoint ownership.
5. Large-file splits are allowed only where they simplify consumed behavior.
6. Dead code and public-surface trims must be backed by consumer/static proof.
7. W6 closes with repeatable artifacts rather than ad hoc command transcripts.
