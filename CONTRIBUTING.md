# Contributing to glass-ui

## Clone + install

```bash
git clone git@github.com:mkbabb/glass-ui.git
cd glass-ui
npm install
```

glass-ui's runtime deps are all peer deps; `npm install` pulls the dev toolchain
(Vite 8, vue-tsc, the test runner). The library consumes `@mkbabb/keyframes.js`
through the npm registry — no local checkout of a sibling is required to build.

## Develop

```bash
npm run dev          # demo storybook dev server
npm run build        # library → dist/glass-ui.js + glass-ui.css + index.d.ts + per-subpath chunks
npm run build:watch  # rebuild on change (use during active npm-link periods)
npm run typecheck    # vue-tsc --noEmit
npm test             # unit + public-surface suite
```

Before opening a PR, the proof gates must pass — these are the structural invariants
codified as scripts:

```bash
npm run proof:all              # package + consumers + runtime + theme + resolution + phantom-classes
npm run profile:budget         # bundle-budget gate (--enforce in CI)
npm run verify-export-types    # subpath dts publication probe
```

CI runs `build` + `typecheck` + `test` + the proof gates on every PR + push to
`master` (`.github/workflows/ci.yml`).

## Version bumps + releasing

Version bumps run through **changesets** (`.changeset/config.json`). For any change
that touches `src/`, `package.json`, build config, or the public surface, author a
changeset:

```bash
npx changeset            # pick major/minor/patch + write the summary
```

The changeset lands in your PR. On merge to `master`, the changesets workflow batches
accepted changesets into a `Version Packages` PR; merging that PR bumps the version,
updates `CHANGELOG.md`, and cuts the `v*.*.*` tag. The tag triggers
`.github/workflows/release.yml`, which builds + verifies the proof gates + publishes to
npm via `NPM_TOKEN`.

**Never `npm publish` from a dev machine** — the publish operation belongs to CI on
tag. See [`docs/precepts/cross-repo-dev-iteration.md`](./docs/precepts/cross-repo-dev-iteration.md).

## Cross-repo feature work

When a feature is in-flight across glass-ui + a consumer (muster, speedtest, …) at the
same time, use the `npm link` pattern documented at
[`docs/precepts/cross-repo-dev-iteration.md`](./docs/precepts/cross-repo-dev-iteration.md).
The published `latest` tag is the consumer-default; `npm link` + `build:watch` is the
active-feature escape hatch, retired the moment the feature publishes and the consumer
reinstalls the registry version.

## Conventions

See `CLAUDE.md` for the full set. In brief: TypeScript `strict` + `verbatimModuleSyntax`
(`import type` for all type-only imports); named exports only (no defaults); the
shadcn-vue component pattern (reka-ui `Primitive` / `useForwardPropsEmits`, CVA for
variants, `cn()` for class composition); token-first styling (every visual behaviour is
a CSS custom property); a new structural invariant is codified as a proof script, not
left to review.

**Design idioms — the localized home.** Where each Tailwind-v4 idiom lives
(`@theme` aliases → `theme.css`; `@utility` recipes → their cohesion-domain file;
the cohesion-aware `@import`-partial carve rule; the `var-in-arbitrary` syntax)
is enumerated in `docs/precepts/design-idioms.md`. A new `@theme` alias,
`@utility`, or scoped component style is placed per that doc, not ad hoc.

**Feature-dir colocation.** A complex component (a god-module candidate) is
structured into a sub-component dir — components at the package root, composables
under `composables/`, constants in `constants.ts`, shaders in `shaders/`,
skeletons in `skeleton/` (each "if needed"), and a `README.md`. Enforced by
`proof:colocation`; the convention's CSS half is `design-idioms.md` §7.

## PR flow

1. Branch off `master`.
2. Make the change + add/update tests.
3. Author a changeset (`npx changeset`).
4. Ensure `npm run build` + `npm run typecheck` + `npm test` + `npm run proof:all` all exit 0.
5. Open the PR — CI runs the same gates.
