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

Before opening a PR, the structural gates must pass:

```bash
npm run verify:package         # subpath dts publication probe
npm run profile:bundle         # bundle-budget gate (hard mode: `-- --enforce`; run locally — CI does not run it)
```

CI runs `typecheck` + `demo:dist:build` + `test` + `build` on every PR + push to
`master`, plus the visual pixel-floor gate in its own job
(`.github/workflows/ci.yml`).

## Version bumps + releasing

There is no changesets flow. Bump the version in `package.json` directly (SemVer:
patch for compatible fixes, minor for compatible features, major only for an actual
public break), land it on `master`, then push the matching tag:

```bash
git tag v1.2.3 && git push origin v1.2.3
```

The tag triggers `.github/workflows/release.yml`, which builds + verifies + publishes
to npm with provenance.

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

TypeScript `strict` + `verbatimModuleSyntax`
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
skeletons in `skeleton/` (each "if needed"), and a `README.md`. The convention's CSS
half is `design-idioms.md` §7.

## PR flow

1. Branch off `master`.
2. Make the change + add/update tests.
3. Ensure `npm run build` + `npm run typecheck` + `npm test` + `npm run verify:package`
   all exit 0.
4. Open the PR — CI runs the same gates.
