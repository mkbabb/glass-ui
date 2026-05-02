# F - Interaction, Style, And Rendering Contract Hardening

F follows E's publication contract cutover. E proved the package can publish through explicit subpaths, but the post-E audit shows substrate drift inside the product: current consumers still exceed the intended root contract, some public/internal boundaries are wider than their evidence, several component contracts are brittle, Tailwind v4 token wiring is partly inert, dock layering has duplicated authority, and Aurora exposes shader/runtime controls that are not all live.

F is not the old Tailwind plugin tranche. Plugin extraction and byte floors stay out of the opening thesis until token/theme correctness, style authority, public-surface proof, and runtime profiling are made machine-verifiable. The tranche completes one path: prove the current contract, repair the highest-risk interaction/style/rendering seams, and close with fast, repeatable package/consumer/runtime/profile evidence.

## Prelude

The planning prelude read the tranche/precept documentation, C through E tranche artifacts, selected audit/profiling/style docs, and the current Aurora lineage notes. Eight audit lanes were dispatched from the requested parallel analysis:

- Plan/process lineage and remaining bindings.
- Vue component, composable, state, and store contracts.
- Tailwind v4, CSS, token, and style authority.
- Aurora runtime, shader, oil/painterly, and studio architecture.
- Dock, rail, navigation, layering, animation, and blur contract.
- Public surface, dead code, consumer drift, and docs drift.
- Testing, build, profiling, package proof, and velocity substrate.
- Demo/story substrate and story navigation consistency.

The first six lanes ran immediately; the final two ran as soon as agent slots freed. All were read-only. Product implementation is not part of this planning step.

## Thesis

F makes the library easier to change quickly by reducing false surfaces and brittle behavior. Every public symbol, style token, dock behavior, search/result state, table identity, and Aurora config knob must either be consumed and proved or be removed/internalized. The implementation waves are deliberately ordered so proof substrate comes first, component and style changes have exact file ownership, and Aurora changes are validated by runtime and benchmark evidence rather than visual enthusiasm.

## Binding Invariants

1. C, D, D-II, and E precepts still bind: KISS, no quick fixes, no workarounds, no legacy codepaths, no silent deferrals, consumed substrate, evidence over claims.
2. No root compatibility shims or deprecation barrels. Consumer drift is fixed by migration and static enforcement.
3. No unsafe consumer-provided HTML string API remains unless it is explicitly named as trusted, sanitized, and tested.
4. Public subpath exports keep only source-, story-, test-, or consumer-backed surface. Internal composables and helper registries stay internal.
5. Dock is one component family. `GlassDock variant="rail"` is the vertical dock variant; layer groups inherit orientation, z-index comes from tokens, transition timing comes from CSS/runtime state, and owned portals are explicitly marked.
6. The default dock blur remains a reduced dock-specific tier. Rail subtlety is a token decision, not an absent dock implementation.
7. Tailwind v4 theme namespaces must be valid. No self-referential theme variables, inert aliases, undefined shimmer/progress tokens, or broad global component utilities without ownership.
8. One style authority per component family. Duplicated dock CSS between global styles and scoped SFC blocks must converge before any plugin extraction is considered.
9. Large components over 500 lines are split only when the split reduces real complexity and is consumed in the same wave.
10. Aurora public config fields and uniforms must map to live shader behavior or be removed. Capture and live rendering are separate runtime modes if profiling supports that split.
11. Fast proof scripts must produce artifacts, not labels. Close requires package, consumer, runtime, style, bundle, and benchmark evidence.
12. Bundle/CSS numbers are measurements until F establishes stable baselines and realistic floors.

## Artifacts

- Research synthesis: `docs/tranches/F/research/00-eight-lane-audit-synthesis.md`
- Initial challenge: `docs/tranches/F/audit/W0-challenge.md`
- Wave specifications: `docs/tranches/F/waves/W0.md` through `docs/tranches/F/waves/W6.md`
- Agent dispatch template: `docs/tranches/F/dispatch/AGENT.md`
- Progress log: `docs/tranches/F/PROGRESS.md`

## Wave Schedule

| Wave | Title | Agents | Mode | Hard Gate | Status |
|---|---|---:|---|---|---|
| W0 | Current-state ledgers + challenge | 8 | parallel read-only audit + orchestrator synthesis | ledgers classify package, consumers, components, style, dock, Aurora, story, and velocity; W1-W5 bounds are exact | complete |
| W1 | Proof substrate + consumer contract enforcement | 4-5 | implementation on scripts/docs plus disjoint consumer lanes | package fixture, static consumer policy, consumer builds, and runtime smoke commands produce artifacts and pass | complete |
| W2 | Dock, rail, layering, and navigation substrate | 3-4 | implementation on dock/nav files with orchestrator-owned shared styles | vertical dock/layer behavior, z-index, transitions, portal ownership, and blur tokens are proved on dock routes | planned |
| W3 | Component contracts and Vue idioms | 4-5 | implementation on disjoint component families | unsafe HTML, stale search cache, row identity, lifecycle cleanup, and large-component splits are fixed and tested | planned |
| W4 | Tailwind theme and style authority | 4 | implementation on style/token/story-surface files | Tailwind v4 theme compile proof passes; duplicated/global brittle CSS is removed or localized with parity evidence | planned |
| W5 | Aurora runtime, shader, and studio hardening | 4 | implementation on Aurora library/studio with benchmark evidence | public config matches live shader behavior; capture/live modes, oil flow, thumbnails, and studio splits are proved | planned |
| W6 | Runtime/profile close and residual audit | 6 + orchestrator | parallel re-audit + close | close command exits 0; residuals are <= 5 or a named next tranche is opened before final | planned |

## W0 Close

W0 closed the planning gate without product/source/config/consumer edits. W1 through W5 are now amended from the W0 ledgers and are dispatchable in order.

## Critical Paths

1. **Consumer and public-surface truth first.** If active consumers import retired/non-core root symbols, migrate them and enforce the policy before trimming exports or styling contracts.
2. **Dock before style consolidation.** Dock behavior and portal/layer ownership inform which CSS authority survives.
3. **Component safety before broad polish.** Unsafe HTML and stale state have higher priority than purely cosmetic refactors.
4. **Theme correctness before plugin work.** Tailwind v4 utility generation must be valid before measuring any CSS split or plugin.
5. **Aurora correctness before visual expansion.** Dead uniforms, oil-flow defects, and capture/live behavior are fixed before new painterly media or SOTA-inspired modes.
6. **Close proof is one command tier.** Fast checks aid development, but close must prove package, consumers, runtime routes, style compile, bundle/profile, and residual audit together.

## Explicit Non-Goals

- No legacy root shims or deprecation barrels.
- No broad rewrite of every component API.
- No monorepo/package split.
- No hard CSS byte floor in F.W0.
- No WebGPU or OffscreenCanvas migration unless W5 profiling proves the need and current browser support is acceptable.
- No new Aurora medium family before the current shader/runtime contract is corrected.
- No cosmetic story restyling unless it repairs substrate reuse, source display, route behavior, or brittle CSS.

## Brittleness Window

F may temporarily break local demos or consumer imports inside an implementation wave, but each wave closes its own breakage before the next wave starts.

```yaml
breaking_changes_during_wave: yes
allowed_window: within the active wave only
suspended_gates:
  - local story route smoke may fail while a touched route is being refactored
  - consumer static policy may fail while that consumer lane is actively migrating
  - style compile probes may fail while W4 token/theme namespaces are being corrected
restoration: same wave hard gate
forbidden:
  - committing a wave with compatibility shims
  - closing a wave with known consumer drift unless the wave explicitly opened a named residual tranche
  - treating grep-only evidence as runtime proof
```
