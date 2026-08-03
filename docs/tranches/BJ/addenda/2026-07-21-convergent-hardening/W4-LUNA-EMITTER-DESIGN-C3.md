# W4 Luna emitter design C3

Date: 2026-07-22  
Existing owner: MATERIAL W4 `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK`  
Disposition: **normative Luna implementation packet; product and acceptance remain RED**

## Frozen input

This design starts from product commit `abb1eba22cf9429c8c5ccf3a8b13fe032ca4404b` and the
current formation HEAD `0371836dfeeb3b7982250d612f93b5347a1d29d4`. It binds the two independent
Sol x-high critics and reconciliation:

- `W4-ABB1-SOL-CRIT-CONTRACT-C2.md` — `fe62935d2f50804d3dfa4d7ebe9824ab44489d11f1d00ff431e61a69019ade6a`;
- `W4-ABB1-SOL-CRIT-PACKAGE-C2.md` — `379fb6c541c5387146b27f9c5c43afe79789eb7e1d6292378afd23c05340c30b`;
- `W4-ABB1-OPUS-CLOSER-RECONCILIATION-C2.md` — `95cbbfaaa561751423b96830b2ec1d5cb2f40375ef0446fb00b567e4ed06cbb6`.

Moving input hashes are evidence only:

| input | SHA-256 |
| --- | --- |
| `vite.style-assets.ts` | `28f152d160c10c525aca579024284e4f6c5d55ceeedb9390dd0b510a76edb3c1` |
| `scripts/gen-component-styles.mjs` | `0992957ec97fdd78d95b91cded6269e26f356457014cf9b1b8cda6c42172a13e` |
| `tests/styles/typed-track-seam.test.ts` | `7bf51b7c768d8a7ef6630b4ae66754de0ecf77eb55a943ac7890fcd3bf774b7b` |
| `src/styles/glass/track-well.css` | `e7f6e835cc4aefbc9ecf8f6d1a09baf9a73852393bc66522e7842d4ef5e2596d` |
| `src/styles/glass/value-marks.css` | `aa07fd878af16aeb5fad4c78d8170cbdbba2a3346d51fed86edfc935d4964e8a` |

## Why the current lifecycle is invalid

The ordinary build runs Vite, type emission, then a standalone manifest generator. Watch and iterated
builds run only Vite. `publishStyleAssets()` is shared by the canonical and iterated Vite configs, and its
existing `closeBundle` publisher does run at the end of Vite watch cycles. The omission occurs because the
component manifest generator remains outside Vite in the one-shot command tail. The reproduced result is a
split: a one-shot build can contain `component-styles.css`, while watch and iterated builds emit
`glass-ui.css` without that exported file.

This is not a timing preference. Rollup's official plugin contract says:

- `writeBundle` is the last hook after a successful `bundle.write(...)` and receives the complete bundle
  for that current output;
- `closeBundle` is for cleanup and may be invoked after a build error;
- `this.addWatchFile` is valid from plugin hooks other than `closeBundle` and makes changes trigger a
  rebuild.

Vite's official plugin contract says output-generation hooks other than `closeBundle` are omitted only
for the development server, not for a Vite production build or its watch mode. Rolldown independently
documents `writeBundle` as running after all output files are written and exposes `addWatchFile` on the
plugin context.

Primary references:

- <https://rollupjs.org/plugin-development/#writebundle>
- <https://rollupjs.org/plugin-development/#closebundle>
- <https://rollupjs.org/plugin-development/#this-addwatchfile>
- <https://vite.dev/guide/api-plugin.html#universal-hooks>
- <https://rolldown.rs/reference/Interface.FunctionPluginHooks#writebundle>
- <https://rolldown.rs/reference/Interface.PluginContext#addwatchfile>

## Selected KISS topology

There is one lifecycle owner: the existing `publishStyleAssets()` Vite plugin. A pure deterministic
`scripts/lib/component-style-manifest.mjs` serializer may be invoked by that plugin and unit-tested in
isolation; it may not write public output on its own. `writeBundle` is selected because it is
successful-output-only and supplies current-output proof; a carefully guarded `closeBundle(error)` could be
made correct, but is not the selected topology. Do not add a second plugin, daemon, mutex, generation JSON,
or post-Vite generator.

### `configResolved`

Fail before the disk pipeline unless all of these are true:

1. the resolved repository root is this package root;
2. the effective output directory is this repository's existing `dist`;
3. library formats are exactly `['es']`; and
4. `rolldownOptions.output` is not an array and cannot redirect `dir`.

`writeBundle` rechecks its normalized `outputOptions.dir` before touching disk. This converts a future
multi-output/redirected-output configuration into an explicit failure instead of racing two writers or
publishing styles to a directory different from the JavaScript output.

### `buildStart`

On every build cycle, the plugin:

1. calls `this.addWatchFile()` for the exact two W4 partials;
2. requires both inputs to be regular, non-empty files.

It must **not** proactively delete or truncate `dist/component-styles.css`. The failed command/run remains
RED and cannot receive current-cycle credit.

### `writeBundle(outputOptions, bundle)`

Replace the current `closeBundle` owner with this post-ordered hook:

```ts
writeBundle: {
    order: "post",
    async handler(outputOptions, bundle) { /* one-owner pipeline */ },
}
```

Do not add the deprecated/needless `sequential` compatibility flag. In each successful written-output
cycle the hook must:

1. prove that the current `OutputBundle` contains a non-empty `glass-ui.css` asset;
2. execute the existing ordered copy/fold/utility/font/WebKit/minify pipeline;
3. require these exact regular, non-empty manifest members after that pipeline:
   - `./styles/glass/track-well.css`;
   - `./styles/glass/value-marks.css`;
   - `./glass-ui.css`;
4. serialize exactly those three imports, in that order, once each;
5. write and close a deterministic temporary file beside `dist/component-styles.css`;
6. atomically rename that temporary file over the final manifest; and
7. remove only the temporary file and rethrow on failure, never deliberately unlinking the final.

The manifest must not contain timestamps, random IDs, absolute paths, mutable source digests, or machine
specific text. The build command's non-zero failure is the truth boundary; a surviving last-known-good file
is never described as output of the failed cycle.

Under `iter-build` (`emptyOutDir:false`), the failure rule preserves the prior manifest. Under canonical
one-shot/watch, Vite may already have emptied `dist` before a later failure; no stronger last-known-good
retention guarantee is claimed.

Only one Vite process may write repository `dist` at a time. Concurrent watch plus iterative/cold build is
unsupported because the existing copy/minify pipeline already races; a manifest mutex would not make that
larger transaction safe. Tests use isolated archives/output directories.

### Retire the split owner

After the Vite owner and its mutations pass:

- remove `node scripts/gen-component-styles.mjs` from `build`;
- delete the standalone writer if no other caller remains, retaining only a pure serializer when useful;
- update generator/style-fold/migration prose to name `publishStyleAssets()` as the only owner; and
- keep both `vite.config.ts` and `vite.iter.config.ts` on that same plugin.

No direct `dist` writer remains outside this owner for the component manifest.

## Born-RED detector matrix

Each mutation is applied alone to a fresh archive, with pre/mutated/restored hashes retained. A cumulative
working-tree sequence or `git checkout` as proof is invalid.

| id | mutation | required failure |
| --- | --- | --- |
| E1 | restore the standalone post-build generator as the only writer | watch/iter ownership detector |
| E2 | emit from `closeBundle` despite a non-null build error or without current-output proof | failed-build/current-output lifecycle detector |
| E3 | delete `writeBundle` emission | artifact-absence detector |
| E4 | omit either `addWatchFile`, semantically edit that partial so its copied output hash must change, then restore | watch rebuild detector |
| E5 | seed a stale manifest in `iter-build` and skip replacement | stale-output detector |
| E6 | make one member absent, empty, directory or symlink-to-directory | regular/non-empty member detector |
| E7 | remove, reorder or duplicate one import | exact manifest detector |
| E8 | append an undeclared fourth import | exact manifest detector |
| E9 | with `emptyOutDir:false` and a known prior final, write non-atomically and throw mid-write | atomicity/last-known-good detector |
| E10 | mutate the config to two formats/output entries | pre-pipeline single-output configuration detector |
| E11 | reintroduce timestamp/random/absolute-path bytes | deterministic-byte detector |
| E12 | remove one of the two Vite config registrations | build-mode parity detector |
| E13 | redirect `outDir` or `output.dir` | explicit configuration failure; repository `dist` remains untouched |

The positive matrix is clean one-shot build, `vite build --watch` with a real edit/rebuild/restore cycle,
and `iter-build`. Each cycle records the source input hashes, final manifest hash, three member hashes and
build result. Watch proof records initial/rebuild `BUNDLE_END` versus `ERROR` and controlled shutdown; the
process exit obtained by terminating an indefinite watcher is not itself build-cycle evidence. The
iterative failure arm records whether its known prior artifact survives; canonical output claims no such
guarantee.

## Boundary

This design does not close W4. It does not validate the public CSS graph, typed writer census, package,
pixels, consumers, locks, Safari/VoiceOver, or model law. Those are specified separately. The Opus
`abb1eba2` source partial remains banked; Luna x-high owns the bounded emitter implementation. No consumer
repin, CSS copy, selector shim, mutable 7.0 credit, or history rewrite follows.
