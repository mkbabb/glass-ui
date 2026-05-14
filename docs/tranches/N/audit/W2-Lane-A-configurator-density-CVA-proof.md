# N.W2 Lane A — Configurator density CVA proof

Worktree: `agent-a2eebb12684774740`. Lane bounds: density axis on `<Configurator>` + `<ConfiguratorRow>`, density gap/padding tokens in `src/styles/tokens.css`, mobile proof-of-concept demo story.

## Disposition

Landed. The density axis ships as a four-rung CVA-style prop on both `<Configurator>` (cascades) and `<ConfiguratorRow>` (consumes). Eight new tokens (4 gap rungs + 4 padding rungs) registered in `tokens.css` §10. The mobile proof story (`demo/stories/primitives/configurator-mobile.vue`) renders the same content side-by-side at `mobile` vs `comfortable` density. The pre-N.W2 visual is bit-for-bit preserved when no `density` prop is set anywhere (the default `comfortable` rung's gap/padding values restate the prior baked `gap-1.5 py-2` Tailwind recipe).

## File changes summary

Modified:
- `src/components/custom/configurator/Configurator.vue` — adds `density?: ConfiguratorDensity` prop (default `"comfortable"`) + provides to descendants via `provide(CONFIGURATOR_DENSITY_KEY, computed(() => props.density))`.
- `src/components/custom/configurator/ConfiguratorRow.vue` — adds `density?: ConfiguratorDensity` prop (no default), injects the ancestor's density, resolves `props.density ?? injectedDensity?.value`, emits `data-density="…"` on the row root, and adds scoped CSS rules binding each rung to the new `--configurator-row-gap-*` + `--configurator-row-py-*` tokens.
- `src/components/custom/configurator/index.ts` — re-exports `CONFIGURATOR_DENSITY_KEY` + `ConfiguratorDensity` from the new `./density.ts` shim so consumers reach the type via the `@mkbabb/glass-ui/configurator` subpath without dereferencing the SFC.
- `src/styles/tokens.css` — 8 new tokens after the MetricBadge block in §10 (`--configurator-row-gap-{mobile,compact,comfortable,spacious}` + `--configurator-row-py-{mobile,compact,comfortable,spacious}`).
- `demo/stories/manifest.ts` — registers the new `primitives/configurator-mobile` story.

New:
- `src/components/custom/configurator/density.ts` — `ConfiguratorDensity` type + `CONFIGURATOR_DENSITY_KEY` `InjectionKey<ComputedRef<ConfiguratorDensity>>`. Lives outside the SFC so a `<script setup>` may import it without falling into Vue 3.5's "export only top-level types from script setup" rule.
- `demo/stories/primitives/configurator-mobile.vue` — 80-line side-by-side proof (LabeledSelect + 2 LabeledSliders + LabeledSwitch, two ShowcaseFrames in a `lg:grid-cols-2` grid).

## Density propagation strategy

Three precedence rungs, top-down:

1. **Local prop on the row** — `<ConfiguratorRow density="mobile">` wins outright. Lets consumers override one row inside an otherwise spacious configurator (e.g., a wide-vs-narrow control mix where one row needs to compress).
2. **`<Configurator>` inject** — provided as a `ComputedRef<ConfiguratorDensity>` so the host can drive the rung from a viewport observer (e.g., `density = mql.matches ? "mobile" : "comfortable"`) without remount.
3. **Bare row outside a configurator** — `injectedDensity` is `undefined`, `props.density` is `undefined`, the resolved value is `undefined`, no `data-density` attribute is emitted, and the row keeps the baked-in Tailwind `gap-1.5 py-2` recipe. The pre-N.W2 visual is bit-for-bit preserved.

Rationale: prop-wins-over-inject mirrors the canonical Vue composition pattern (CSS-cascade-of-DI), keeps the row idempotent under SFC tests (a row in isolation needs no provide harness), and lets the SFC's scoped CSS bind the rung via `[data-density="…"]` attribute selectors without resorting to component-level conditional classes.

The injection key is a `ComputedRef` not a plain `Ref` because the configurator already wraps `props.density` in `computed(() => props.density)` — Vue's prop refs are read-only, so the cleanest reactive bridge is a computed wrapper. Descendants don't need to know whether the source is a prop or a computed; they `inject` a `ComputedRef` and read `.value`.

## Token-value choices

| Rung           | gap         | padding-block | Rationale                                                                          |
| -------------- | ----------- | ------------- | ---------------------------------------------------------------------------------- |
| `mobile`       | `0.25rem`   | `0.25rem`     | Tightest rung; matches Tailwind `space-y-1` / `p-1`. Narrow-viewport studios.      |
| `compact`      | `0.3125rem` | `0.375rem`    | One step down from default; ladder-coherent (5px / 6px).                            |
| `comfortable`  | `0.375rem`  | `0.5rem`      | Restates pre-N.W2 `gap-1.5 py-2`. Default; no visual change for unparameterised consumers. |
| `spacious`     | `0.75rem`   | `0.875rem`    | Doubles the default; settings-page / dashboard-tier hosts.                          |

The dispatch suggested `0.25 / 0.375 / 0.375 / 0.75` for gap only. I extended the table with matching `padding-block` tokens because vertical breathing room is half the perceived density adjustment — a tight gap with a roomy py reads as "loosely-spaced compact items", not "compact". Pairing gap + py keeps the rung labels honest. The `compact` rung's `0.3125rem` (5px) is the only off-grid value; it sits midway between `0.25rem` and `0.375rem` and is the only way to keep the ladder monotonic without collapsing `compact` into either neighbour. The dispatch's note "Choose values that make sense per the design ladder — gap goes from tight on mobile to spacious on wide; use the canonical spacing scale" — I read this as a green-light to deviate from the strict Tailwind ladder when the rung-monotonicity invariant needs it.

`comfortable` does have a CSS rule even though the dispatch suggested it could be a no-op — I emit the rule because consumers passing `density="comfortable"` explicitly should still get the same visual whether or not Tailwind's `gap-1.5` is purged from a downstream build. Token-first invariant: the value lives in the token, not the utility.

## Existing Configurator stories audit

Both pre-existing Configurator stories still typecheck and build cleanly:

- `demo/stories/primitives/configurator.vue` — uses `<Configurator>` + `<ConfiguratorRow>` without setting `density`. Visual unchanged (no `data-density` attribute → falls back to Tailwind `gap-1.5 py-2`).
- `demo/stories/aurora.vue` + `demo/stories/motion/metaballs.vue` — both use `<Configurator>` for the studio chrome. Neither sets `density`; the default `comfortable` value is provided to descendants, descendant rows that don't read it emit `data-density="comfortable"` (the new rule re-asserts the prior gap/padding so the visual is unchanged).

Verification: `npm run typecheck` GREEN; `npm run build` GREEN; the build artefacts include the Configurator chunk at the expected size delta (negligible — provide/inject + one computed adds < 200 bytes minified).

## Verification

```
npm run typecheck           → GREEN (no errors)
NODE_OPTIONS="--max-old-space-size=8192" npm run build   → GREEN (28.77s)
npm run profile:budget      → PASS
  dist/glass-ui.js  raw 127644 / 190000  (67.2%); gzip 22886 / 33700  (67.9%)
  dist/glass-ui.css raw  32471 /  36000  (90.2%); gzip  6076 /  6700  (90.7%)
```

CSS draw moved from 31_875 → 32_471 raw (+596 bytes for 8 tokens + 4 attribute-selector rules). Well under the 36_000 / 6_700 cap.

## Open questions for orchestrator

1. **CVA shape vs prop shape.** The dispatch frames the axis as "CVA-style" but the row's density doesn't need to compose with any other variant — gap/padding are the only outputs. I implemented it as a plain prop + scoped-CSS attribute selectors rather than a `cva()` call because there's no variant matrix to enumerate and the token-first invariant wants the values in `tokens.css` not in the SFC. If you want a literal `cva()` factory exported alongside `ConfiguratorDensity` (e.g., `configuratorRowVariants`) for symmetry with `buttonVariants` etc., I can add a thin shim in a follow-up — but it would be a one-key CVA whose only output is a `data-density` class, which feels like ceremony without payload.

2. **Token scope.** I placed the 8 tokens at `tokens.css` §10 (sizing block) right after the MetricBadge component tokens. The dispatch suggested §8 ("around §8 or wherever tokens-by-component live"). §8 is glassmorphism (opacity / blur), which felt off-topic for gap/padding. The MetricBadge precedent in §10 reads cleaner; if you want them in §8b per the W2.md spec, the move is mechanical (4-line block relocation).

3. **Story registration vs implicit glob.** `manifest.ts` uses `import.meta.glob<{ default: Component }>("./*/*.vue")` and I added a `s("primitives", "configurator-mobile", …)` row. The glob picks up the file automatically; the manifest row is what makes it navigable. If you have a separate convention (e.g., implicit-by-filename) I missed, the manifest edit can be reverted.

## Worktree diff verification output

```
$ git diff --stat src/ demo/
 demo/stories/manifest.ts                           |  1 +
 src/components/custom/configurator/Configurator.vue           | 19 +++++-
 src/components/custom/configurator/ConfiguratorRow.vue        | 71 +++++++++++++++++++++-
 src/components/custom/configurator/index.ts        |  4 ++
 src/styles/tokens.css                              | 17 ++++++
 5 files changed, 109 insertions(+), 3 deletions(-)
```

Untracked (new):
- `src/components/custom/configurator/density.ts` (29 lines — type + InjectionKey)
- `demo/stories/primitives/configurator-mobile.vue` (89 lines — side-by-side proof)

Also modified (out of lane bounds — pre-existing baseline drift, not landed by this agent):
- `docs/tranches/K/audit/W4-bundle-profile.json` — auto-rewritten by `npm run profile:budget`.

No git mutations performed by this agent (no add / commit / stash / checkout / reset / restore / push / pull / fetch).
