# K.W-S Step 3 — speedtest cross-repo bundle evidence

**Date**: 2026-05-09
**Glass-ui state**: v0.9.3 candidate (additive subpath carve landed; root barrel re-exports preserved).
**Speedtest state**: branch `master`; `@mkbabb/glass-ui` linked at `file:../glass-ui` (resolves v0.9.3 with this wave's edits in dist/).

## Step 1 — inventory cross-reference

See `docs/tranches/K/audit/W-S-vueuse-inventory.md` for the three tables:

1. 14 direct vueuse-importing files (2 composables, 1 carousel composable, 11 components: Input, Textarea, 8 Combobox\*, useCarousel via createInjectionState).
2. Root-barrel re-export closure to vueuse-bearing surfaces (`src/index.ts:3` via `./components/ui` plus `src/index.ts:26,28` direct).
3. vueuse-FREE composables (the speedtest workload: `useInterval`, `useTimer`, plus 8 others).

## Step 2 — glass-ui file changes

| File | Change |
|---|---|
| `src/forms.ts` | NEW. Re-exports `Input`, `Textarea`, all `Combobox*` symbols (the vueuse-bearing forms surface). |
| `src/composables/dark.ts` | NEW. Re-exports `useGlobalDark`. |
| `src/composables/keyboard.ts` | NEW. Re-exports `registerShortcut`, `useRegisteredShortcuts`, `formatCombo`, `formatComboParts`, `isMac`, types. |
| `src/index.ts` | UNCHANGED. Phase 1 is additive only — root barrel keeps re-exporting all vueuse-bearing symbols for backward compat. |
| `package.json` | version `0.9.2` → `0.9.3`; `exports` adds `./forms`, `./composables/dark`, `./composables/keyboard`; matching `typesVersions` entries. |
| `vite.library.ts` | `libraryEntries` adds `forms`, `composables/dark`, `composables/keyboard`. |
| `CHANGELOG.md` | v0.9.3 entry. |
| `DESIGN.md` | NEW "Subpath surface" section. |

## Step 3 — speedtest validation transcript

### Pre-state (no vueuse manualChunk; v0.9.3 glass-ui in node_modules)

`vite.config.ts` `manualChunks` block:
```ts
manualChunks: {
    "maplibre": ["maplibre-gl"],
    "echarts": ["echarts"],
    "h3": ["h3-js"],
},
```

Build: `NODE_OPTIONS=--max-old-space-size=8192 npm run build`. Exit 0.

```
$ grep -c "modulepreload" dist/index.html
0
```

Entry chunk: `dist/assets/index-DoedWC0D.js`, 538.40 KB raw, **171,272 bytes gz** (gzip -c | wc -c).

### Post-state (vueuse manualChunk added; same v0.9.3 glass-ui)

Diff applied to speedtest `vite.config.ts`:
```diff
                         manualChunks: {
                             "maplibre": ["maplibre-gl"],
                             "echarts": ["echarts"],
                             "h3": ["h3-js"],
+                            "vueuse": ["@vueuse/core", "@vueuse/shared"],
                         },
```

Build: `NODE_OPTIONS=--max-old-space-size=8192 npm run build`. Exit 0.

```
$ grep -c "modulepreload" dist/index.html
1
$ grep "modulepreload" dist/index.html
      <link rel="modulepreload" crossorigin href="/assets/vueuse-Cyv4riDB.js">
```

Entry chunk: `dist/assets/index-CvgmEoPX.js`, 455.55 KB raw, **139,748 bytes gz**.
New vueuse leaf: `dist/assets/vueuse-Cyv4riDB.js`, 85.30 KB raw, **33,579 bytes gz**.

Inspecting the vueuse chunk's source-map sources:
```
$ grep -o "@vue/[a-z-]*\|@vueuse/[a-z-]*" dist/assets/vueuse-Cyv4riDB.js.map | sort -u
@vue/compiler-dom
@vue/reactivity
@vue/runtime-core
@vue/runtime-dom
@vue/shared
@vueuse/core
@vueuse/shared
```

The vueuse chunk's preamble carries `@vue/shared v3.5.11` — confirming Rollup hoisted `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core` + `@vue/runtime-dom` + `@vue/compiler-dom` into the vueuse leaf to satisfy both the entry chunk and the vueuse leaf as Vue consumers. Identical mechanism to V.W1.T7's vue-echarts trap and to W3.b.1's pre-WS measurement.

### Net effect

| Path | Pre | Post | Δ |
|---|---|---|---|
| Entry chunk gz | 171,272 B | 139,748 B | −31,524 B |
| New vueuse leaf gz | n/a | 33,579 B | +33,579 B |
| **Eager critical-path total** | **171,272 B** | **173,327 B** | **+2,055 B (regression of ~2 KB + 1 extra HTTP req)** |

The 30.78 KB "drop" on the entry chunk is misleading — the bulk of it is Vue runtime relocating into the vueuse chunk, not vueuse leaving the eager path. **Net effect on the eager critical path is a regression of ~2 KB plus an extra HTTP request.**

Visual-regression matrix not run — disposition is HALT before that step.

## Disposition

**HALT — Phase 1 additive-only does NOT break the SCC trap.** The `dist/index.html` modulepreload directive reappears the moment the vueuse manualChunk is applied. The mechanism is unchanged from W3.b.1's pre-WS measurement: Rollup walks the root barrel's `export *` from `./components/ui` (which transitively pulls Input + Textarea + Combobox\* + useCarousel — all vueuse-bearing) and from the direct `useGlobalDark` + `useKeyboardShortcuts` re-exports, then hoists the shared Vue runtime into the deeper vueuse bucket to satisfy both consumers.

**Phase 2 (root-barrel removal of vueuse-bearing symbols) is required.** This is a breaking change; the inventory shows speedtest currently does not import any of the vueuse-bearing symbols at the root-barrel surface (the worker only reaches `useInterval`/`useTimer`), so the migration cost on the existing primary consumer is zero — but other downstream consumers may exist. Recommendation: queue Phase 2 for L tranche / v1.0 with a major-version bump; the additive subpaths shipped here become the canonical access shape for those symbols.

The speedtest `dist/index.html` modulepreload-free state is preserved by leaving the vueuse manualChunk OUT of speedtest's `vite.config.ts`. The W3.b.1 disposition document is NOT yet annotated LANDED — the wave's stated hard gate (modulepreload-free WITH vueuse manualChunk applied) was not met.

## Speedtest vite.config.ts state at WS close

Reverted to its pre-WS shape (vueuse line removed). Orchestrator decides at WS close whether to leave it reverted or stage further follow-up; agent's recommendation is to leave it reverted and route the speedtest re-link commit to L when Phase 2 lands.

## Recommendation summary

1. Ship v0.9.3 with the additive subpath carve as documented (the public subpath surface is correct and useful even though Phase 1 alone doesn't break the SCC trap).
2. Update `CHANGELOG.md` v0.9.3 entry to record HONESTLY that Phase 1 is the additive prerequisite; the SCC trap fix completes only at Phase 2.
3. Queue Phase 2 (root-barrel removal of vueuse-bearing symbols) for L tranche / v1.0 — explicit major-version bump, breaking-change CHANGELOG entry, consumer-side migration guidance.
4. Speedtest's W3.b.1 disposition stays as `ACCEPT-AS-DEFERRED`; do not annotate LANDED. The follow-on annotation lands when v1.0 ships.
5. The visual-regression 9-cell matrix run is unnecessary at this point — no breaking change shipped at v0.9.3 (additive only) so visual diff is byte-identical.
