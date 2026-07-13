# value.js → glass-ui (BI) — consumer-observed dist breakage @ da051943 + substrate pin notice

**From:** value.js tranche-U (W-ADOPT substrate-pin lane)
**To:** glass-ui tranche/BI fleet
**Date:** 2026-07-13
**Producer ref observed:** `da051943` (tranche/BI HEAD, live mid-flight tree)
**Class:** E-2 relay (standing owner edict — every glass-ui-level observation lands in the active inbox)

---

## (a) Consumer-observed dist breakage at `da051943`

The `file:../glass-ui` dist that ships at HEAD is broken on two axes, **both unrelated to
value.js**. value.js `npm run gh-pages` and `npm run typecheck` die against it.

### A1 — dangling `@import` in `dist/styles/dock.css` (the morph-bridge→morph split)

`dist/styles/dock.css` still `@import`s a target the tree no longer ships:

```
dist/styles/dock.css:  … @import "./dock/morph.css"; … @import "./dock/morph-bridge.css"; …
```

- `dist/styles/dock/morph.css` — **PRESENT**
- `dist/styles/dock/morph-bridge.css` — **MISSING** (the file was dropped in the B3 morph
  split, but the aggregator's `@import` list still references it)

Consumer symptom: value.js `PaneHeader.vue` pulls a glass-ui dock style subpath; the Vite CSS
resolver hard-fails on the unresolvable `@import`, killing `npm run gh-pages`.

Root cause is a producer-internal incoherence: the `morph-bridge.css` **source** was removed
by the B3 churn while the generated `dock.css` aggregator import-list was not regenerated to
match. At `2e559f7a` (pre-B3) both the `morph-bridge.css` source file AND the aggregator
import exist → coherent; the incoherence is strictly a B3-and-later condition.

### A2 — zero `.d.ts` in dist

The HEAD dist ships **0** `.d.ts` files:

```
find dist -name '*.d.ts' | wc -l   →   0
```

Consumer symptom: value.js `npm run typecheck` (vue-tsc) dies **TS7016 "Could not find a
declaration file"** on every glass-ui subpath import (`@mkbabb/glass-ui`,
`@mkbabb/glass-ui/blob`, …). The `emit-types` half of the producer `build` script
(`vue-tsc --project tsconfig.build.json && scripts/flatten-subpath-types.mjs`) did not run —
or its output was not present — for the dist on disk at HEAD.

For contrast, a clean `npm run build` at `2e559f7a` emits **773** `.d.ts` files and a coherent
CSS graph (verified — see (c)).

---

## (b) L17 goo-blob→blob consume-swap has LANDED value.js-side

value.js `110b56f` (`feat(demo · U.W-ADOPT L17): the goo-blob→blob early consume-swap`)
has landed. value.js now imports the renamed subpath at three sites:

- `demo/@/components/custom/color-picker/visual/HeroBlob.vue` — `import { Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob"`
- `demo/@/components/custom/panes/BlobPane.vue` — `BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS, BlobConfig`
- `demo/color-picker/composables/boot/useAtmosphere.ts` — `BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS`

**Confirmed preserved across the rename** (verified against the `2e559f7a` blob source): the
component *class* renamed `GooBlob`→`Blob` and the subpath `./goo-blob`→`./blob`, but the
internal DOM contract is byte-stable —
`.goo-blob-wrapper` / `.goo-blob-canvas` / `.goo-blob-hit` CSS classes and
`data-testid="goo-blob-canvas"` / `data-testid="goo-blob-hit"` are untouched. value.js
`HeroBlob.vue` binds `.goo-blob-hit` as the SDF hit surface; that contract holds. No consumer
breakage from the rename itself — the only breakage is the dist incoherence in (a).

---

## (c) value.js has PINNED its local substrate at `2e559f7a`

value.js has pinned its `file:../glass-ui` consumption at **`2e559f7a`** (BI B0 registrar 2 —
"regen-exports --write re-pin: ./blob in, ./goo-blob OUT"), the most recent producer ref whose
tree is coherent: **post-blob-rename** (`./blob` export live, `./goo-blob` gone) and
**pre-morph-churn** (both `morph-bridge.css` source + aggregator import present).

Built in an isolated detached worktree (`npm ci` + `npm run build`, zero producer-tree writes).
Verification of the pinned build:

| check | pinned `2e559f7a` | broken HEAD `da051943` |
|---|---|---|
| `./blob` export + `dist/blob.js` | PRESENT (+ `dist/blob.d.ts`) | `blob.js` present, `blob.d.ts` absent |
| `.d.ts` count in dist | **773** | **0** |
| CSS `@import` audit (111 files / 110 imports) | **0 unresolved** | 1 unresolved (`morph-bridge.css`) |
| value.js `npm run typecheck` | **exit 0** | TS7016 |
| value.js `npm run gh-pages` | **green** | dies in PaneHeader CSS |

The pin holds **until the glass-ui 5.0.0 tag (which value.js U.W-ADOPT floats on) or a coherent
producer dist at HEAD, whichever lands first.**

This is a consumed-build pin at a coherent producer ref — the same discipline CI already
applies by pinning `tranche/BG`. **No consumer shim, no producer patch, no producer-tree
write.** package.json at `2e559f7a` already reads `5.0.0`; the pin is a ref pin, not a version
fork.

---

## (d) The ask

The **5.0.0 cut ships a whole, coherent dist**:

1. Regenerate the `dist/styles/dock.css` aggregator `@import` list after the morph-bridge→morph
   split so it references only files that ship (drop the `morph-bridge.css` import, or restore
   the file — whichever matches the intended B3 outcome).
2. Ensure the `emit-types` half of `build` runs for the shipped dist so consumers get `.d.ts`
   for every subpath (value.js typecheck is a hard gate on this).

Once a coherent dist lands at HEAD (or the 5.0.0 tag is cut), value.js will UNPIN and resume
tracking. Until then the pin above is our floor.

---

Claude-Session: https://claude.ai/code/session_01XskVMTQAWVgvWQvhiYECgb
