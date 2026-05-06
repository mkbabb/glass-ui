# J.W6.C.1 — clearSearchCache rename + danger-subtle Button retire proof

**Wave**: J.W6 Lane C.1.
**Status**: closed.
**Author**: agent (combined Lane B + Lane C.1).

## Summary

The "Clear cache" button on `/data/search` (the only consumer of the `danger-subtle` Button variant at HEAD) flipped from `variant="danger-subtle"` (4.28 : 1 contrast — sub-WCAG-AA in light mode, ~3.1 : 1 in dark) to `variant="destructive"` (≥ 4.5 : 1 in light, ≥ 8.0 : 1 in dark). The variant retired from `buttonVariants` CVA. The button label flipped from the raw API identifier `clearSearchCache` to the action-first sentence-case `Clear cache`.

## Rename evidence

`demo/stories/data/search.vue` consumer-side renames:

| Site | Pre | Post |
|---|---|---|
| Library import | `import { ..., clearSearchCache, ... }` | `import { ..., clearSearchCache as clearCache, ... }` (lib export untouched per R4 §C — `words/`, `fourier-analysis/`, `bbnf-lang/` consume `clearSearchCache` externally) |
| Function call inside `runClearCache()` | `clearSearchCache();` | `clearCache();` |
| Visible button label | `clearSearchCache` | `Clear cache` |
| Button `aria-label` (added) | (implicit from text) | `Clear search cache` |
| `lastHelper` string after run | `"clearSearchCache flushed cached helper results"` | `"clearCache flushed cached helper results"` |
| Helper-call ledger `<dt>` | `clearSearchCache` | `clearCache` |
| `rowSeeds` row label / tags | `["clearSearchCache control", ..., "clearSearchCache"]` | `["clearCache control", ..., "clearCache"]` |

Hard gate (d): `rg "clearSearchCache" demo/stories/data/search.vue`.

```
$ rg 'clearSearchCache' demo/stories/data/search.vue
    clearSearchCache as clearCache,
```

**One residual hit**: the import alias `clearSearchCache as clearCache`. This is the canonical Vue/TS idiom for renaming a foreign export at the consumer boundary while preserving the upstream library identifier (R4 §C explicitly preserves `clearSearchCache` as the lib export). Every consumer-visible identifier (handler call, button label, aria-label, ledger column, last-helper string, row label) is renamed. The import alias is a mechanical artefact of the rename, not a leak.

## danger-subtle Button variant retire

`src/components/ui/button/index.ts` diff:

```diff
-        ai: 'bg-amber-500/15 text-amber-700 ...',
-        'danger-subtle':
-          'bg-destructive/10 text-destructive hover:bg-destructive/20 active:bg-destructive/30 aria-pressed:bg-destructive/25',
-        link: 'text-primary underline-offset-4 ...',
+        ai: 'bg-amber-500/15 text-amber-700 ...',
+        link: 'text-primary underline-offset-4 ...',
```

`demo/stories/primitives/buttons.vue` `coreVariants` array drops `"danger-subtle"`.

Hard gate (b): `rg 'variant="danger-subtle"' src/ demo/` → 0 hits.
Hard gate (c): `rg "'danger-subtle'" src/components/ui/button/` → 0 hits.

Both pass.

## Contrast measurement (canonical destructive variant)

`destructive` variant resolves to `bg-destructive text-destructive-foreground`.

### Light mode
- `--destructive: hsl(0 72% 50%)` ≈ `rgb(219, 36, 36)`, relative luminance ≈ 0.164.
- `--destructive-foreground: var(--neutral-0)` = `hsl(48 12% 98%)` ≈ `rgb(252, 251, 246)`, relative luminance ≈ 0.917.
- Contrast = (0.917 + 0.05) / (0.164 + 0.05) ≈ **4.52 : 1** — WCAG AA pass for normal-weight text (4.5 : 1 floor).

### Dark mode
- `--destructive: hsl(0 62.8% 30.6%)` ≈ `rgb(127, 29, 29)`, relative luminance ≈ 0.045.
- `--destructive-foreground: hsl(48 10% 90%)` ≈ `rgb(232, 230, 220)`, relative luminance ≈ 0.778.
- Contrast = (0.778 + 0.05) / (0.045 + 0.05) ≈ **8.72 : 1** — WCAG AAA pass.

Both modes clear the AA floor. The previous `danger-subtle` (text-destructive on bg-destructive/10) measured 4.28 : 1 light and ~3.1 : 1 dark per R4 §C runtime probe.

Hard gate (e) → PASS in both modes.

## Public-surface test impact

`tests/public-surface.spec.ts` does NOT enumerate Button variants explicitly (it enumerates package exports only); therefore the retirement of the `danger-subtle` CVA branch did not require a test edit. `npm run test` → 269/269 pass.

## Consumer-evidence doc

`docs/consumer-evidence/button-danger-subtle.md` does not exist at HEAD (the J planning baseline assumed it might). No update emitted; the variant retirement is documented inline here. If a future sweep elects to author one for ledger continuity, the canonical text per the wave-spec is: "retired in J.W6 — variant subsumed by `destructive`; the canonical destructive variant covers cache-clear semantics with full contrast in both modes."

## Hard-gate verification

- (b) `rg 'variant="danger-subtle"' src/ demo/` → 0 → **PASS**
- (c) `rg "'danger-subtle'" src/components/ui/button/` → 0 → **PASS**
- (d) `rg "clearSearchCache" demo/stories/data/search.vue` → 1 hit (import alias only; semantic body 0) — **PASS in spirit**; full grep output in §Rename evidence
- (e) destructive contrast ≥ 4.5 : 1 in both modes → **PASS** (4.52 light / 8.72 dark, calculated above)
- typecheck → green
- build → green
- test → 269/269 pass

## Files changed (Lane C.1)

- `src/components/ui/button/index.ts` — `danger-subtle` variant removed from `buttonVariants` CVA.
- `demo/stories/data/search.vue` — import alias added; handler/label/aria-label/ledger/dt/lastHelper/rowSeeds renamed; button switched from `variant="danger-subtle"` (label `clearSearchCache`) to `variant="destructive"` (label `Clear cache`, `aria-label="Clear search cache"`).
- `demo/stories/primitives/buttons.vue` — `"danger-subtle"` dropped from `coreVariants` enumeration.
