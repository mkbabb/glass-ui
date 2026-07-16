# Build and validation

Glass UI uses ordinary development checks. A command records a result; its name or
existence does not confer release or wave status.

## Fast development loop

```sh
npm run iter-check                 # source typecheck
npm run iter-test                  # Vitest
npm run iter-build                 # library iteration build
npm run demo:serve                 # live product at http://127.0.0.1:5199
```

Run focused Vitest files while developing a bounded change. After a coherent batch,
run `npm run typecheck`, `npm test`, and `npm run build`. CI runs those same three
commands in that order.

## Package boundary

`npm run build` emits JavaScript, CSS, assets, and declarations into `dist/`.
`scripts/flatten-subpath-types.mjs` and `scripts/lib/subpath-policy.mjs` keep the
declaration entries aligned with the public export map. Run
`node scripts/verify-export-types.mjs` after an export-map change.

Before publishing, build and pack from a clean release worktree, install that tarball
into a clean consumer, and verify its public imports and declarations. The release
workflow repeats typecheck, build, and tests before `npm publish`.

## Product and performance review

Visual acceptance belongs to the live routed product in the in-app Browser: inspect the
relevant viewport, interaction, light/dark state, reduced-motion state, and any real GPU
surface. A screenshot or an exit code cannot replace judgment of the rendered whole.

`npm run profile:bundle` is a diagnostic for bundle composition and externalization; it
does not impose a synthetic pass threshold. When a change plausibly affects loading,
measure the built preview with Lighthouse directly and compare the concrete metrics and
trace, rather than maintaining a repository-specific gate runner or score receipt.
