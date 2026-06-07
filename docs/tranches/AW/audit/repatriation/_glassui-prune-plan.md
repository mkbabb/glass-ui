# AW.W19 (re-scoped) — glass-ui repatriation-prune wave

Authored from the 8 per-family verdict digests under `docs/tranches/AW/audit/repatriation/`,
every surface re-verified against HEAD `src/`/`scripts/`/`package.json`/`demo/` TODAY (2026-06-07).

## Verdict roll-up (the 10 candidate families)

| family | verdict | reason | glass-ui action |
|--------|---------|--------|-----------------|
| metric-cell | KEEP-SHARED | muster `TravelMatrix.vue` consumes it (generic drive-time tile) | none |
| metric-stack (+ MetricRow) | KEEP-SHARED | muster `RankedVerdict.vue` + `WhyThisWonSheet.vue` | none |
| metric-badge | KEEP-SHARED | fourier (7 files/13 tags) + muster (2 files/6 tags) | none |
| **metric-pill** | **PRUNE** | overfit demo-only skin over MetricBadge; ZERO external consumers; cannot repatriate (speedtest never consumes it) | **glass-ui-internal delete** |
| **scrolling-text** | **REPATRIATE** | sole genuine consumer is speedtest (2 files/5 renders); 1 demo story only otherwise | **delete glass-ui → land native in speedtest** |
| animated-digit | KEEP-SHARED | fourier `CoefficientsSpectrum.vue` | none |
| instrument-chassis (+ ChassisDivider) | KEEP-SHARED | muster App shell `variant="spine"` + WinnerHero + InstrumentAside | none |
| **instrument-rail** | **PRUNE** | ORPHAN — zero consumers anywhere; speedtest deleted its only-ever use at AN-D6/D7/D11 | **clean delete (nothing lands native)** |
| status-dot | KEEP-SHARED | muster (6 files) + keyframes.js demo (2 files); zero speedtest | none |
| pulse | KEEP-SHARED | speedtest (7 sites) + muster `CommandDock.vue` | none |

Three families leave glass-ui. ONE (`scrolling-text`) is a cross-repo REPATRIATE coupled to
speedtest gaining a native copy. TWO (`metric-pill`, `instrument-rail`) are glass-ui-internal
PRUNES with zero consumer coordination — they can land in the same cut with no speedtest dependency.

The directive's "metric-cell composes MetricBadge — sever first?" premise is FALSE at HEAD
(verified: `MetricCell.vue`/`MetricStack.vue`/`MetricRow.vue` import only `vue` + `cn`; none
composes MetricBadge). The ONLY internal composition coupling in this whole set is
`MetricPill → MetricBadge` (`src/components/ui/metric-pill/MetricPill.vue:4`), and it severs the
RIGHT way: MetricPill is the thing being deleted; MetricBadge (its dependency) STAYS. So no
"sever an internal composition FIRST" step is required for any repatriating/pruning family —
deleting MetricPill leaves MetricBadge a fully-standing, still-consumed primitive.

---

## CROSS-REPO ORDERING (the load-bearing sequence)

`scrolling-text` is publish-coupled: speedtest pins `@mkbabb/glass-ui ^3.1.0`
(`speedtest/package.json:88`) and imports `@mkbabb/glass-ui/scrolling-text` at two sites
(`AppSettingsButton.vue:97`, `ResultDetailSheet.vue:6`). If glass-ui drops the subpath BEFORE
speedtest has a native copy, speedtest's next install/build breaks. Order so glass-ui NEVER ships
a dangling import AND speedtest NEVER resolves a removed subpath:

```
STEP 1  speedtest: land native ScrollingText.vue + rewrite its 2 imports to local
        → speedtest now self-contained for the marquee (still builds against the
          STILL-PRESENT /scrolling-text subpath — the local import simply shadows it).
STEP 2  speedtest: commit + (optionally) ship — speedtest no longer needs the subpath.
STEP 3  glass-ui: execute this wave (prune scrolling-text + metric-pill + instrument-rail).
STEP 4  glass-ui: build green + publish the pruned cut (next minor — e.g. 3.4.0).
STEP 5  speedtest: bump the glass-ui pin to the pruned cut (^3.4.0). Build stays green
        because STEP 1 already removed every /scrolling-text import.
```

STEP 1 MUST precede STEP 3. STEPS 3-4 are a single glass-ui cut (the two internal prunes ride
along — they have no speedtest dependency, so they do not constrain ordering, but folding them
into the same cut keeps the published-subpath-count delta atomic). STEP 5 is a one-line pin bump
after the publish. No backwards-compat alias at any step (no `/scrolling-text` re-export shim left
in glass-ui — clean break per the no-backwards-compat law, same lift-and-drop discipline as the
original v0.9.1 lift run in reverse).

---

## Family 1 — scrolling-text (REPATRIATE)

### A. Speedtest native copy (STEP 1 — MUST land first)

New file `speedtest/src/components/ScrollingText.vue` — copy
`glass-ui/src/components/custom/scrolling-text/ScrollingText.vue` (140 lines) VERBATIM, rewiring
its two intra-library imports (`ScrollingText.vue:15-16`):
- `import { useResizeObserver } from "../../../composables/dom/useResizeObserver"`
  → `import { useResizeObserver } from "@vueuse/core"` (speedtest pins `@vueuse/core ^14.2.1` at
  `package.json:90`; glass-ui's wrapper is itself vueuse-shaped — same `(target, callback)`
  signature. If the signature diverges on inspection, vendor glass-ui's 1-function body local.)
- `import { cn } from "../../../utils/cn"` → speedtest has NO local `cn` (confirmed: `src/utils/`
  holds `formatTime.ts`/`icons.ts`/`typedStorage.ts`/`utils.ts`, no cn). Use
  `import { cn } from "@mkbabb/glass-ui"` (cn is on the glass-ui root barrel and is a generic
  utility glass-ui legitimately keeps sharing) OR vendor a 3-line `cn` into `src/utils/utils.ts`.
  Recommend the root-barrel import — keeps the speedtest dep minimal, cn is not speedtest substrate.
- Copy the scoped `<style>` block verbatim — self-contained (`--scroll-distance`/`--scroll-duration`
  + `scrolling-text-pan` keyframe + PRM bracket; references no glass-ui token).

Speedtest import rewrites (2 sites — render markup unchanged, same `text?` prop + default slot):
- `src/components/AppSettingsButton.vue:97`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"`
  → `import ScrollingText from "./ScrollingText.vue"` (AppSettingsButton sits at `src/components/`).
- `src/components/dashboard/ResultDetailSheet.vue:6`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"`
  → `import ScrollingText from "../ScrollingText.vue"` (ResultDetailSheet is at
  `src/components/dashboard/`).

### B. glass-ui removal (STEP 3 — six deletions)

1. DELETE dir `src/components/custom/scrolling-text/` (`ScrollingText.vue` + `index.ts`).
2. DELETE subpath mirror `src/subpaths/scrolling-text.ts`.
3. ROOT BARREL `src/index.ts`: remove line 128 (`export * from "./components/custom/scrolling-text"`)
   AND its `// Custom composites — overflow-marquee primitive` comment (line 127); drop
   `scrolling-text` from the cherry-pick rationale comment (line 54, in the 7-package list).
4. `package.json`: remove the `"./scrolling-text"` export block (lines 389-392) AND the
   `typesVersions["*"]["scrolling-text"]` entry (lines 121-123).
5. GATE REGISTRIES (both hardcode the path/slug):
   - `scripts/proof-consumers-static.mjs:143` — drop the line
     `"src/components/custom/scrolling-text/index.ts",`.
   - `scripts/proof-storybook-ia.mjs:59` — drop `"scrolling-text",` from the `["data", [...]]` band.
6. DEMO STORY: delete `demo/stories/data/scrolling-text.vue` AND its manifest registration
   `demo/stories/manifest.ts:179` (`s("data", "scrolling-text", "Scrolling Text", …)`). A glass-ui
   demo cannot import the speedtest-native copy, so the story RETIRES (no re-point). The IA-registry
   drop in step 5 keeps `proof:storybook-ia` consistent with the removed story.
7. DELETE the gate's test fixture `tests/components/custom/scrolling-text/ScrollingText.test.ts`
   (+ the now-empty `tests/components/custom/scrolling-text/` dir).
8. PROSE: in `CLAUDE.md` decrement the published-subpath count (70 → 69 flat JS subpaths; the
   "75 entries total" exports line drops by 1) and strike the `scrolling-text` mentions in the
   `custom/` tree listing, the root-barrel cherry-pick prose, and the subpath enumeration block.

NO `src/api/index.ts` edit — scrolling-text publishes no type/constant there (confirmed: zero
`Scrolling` hits in the api barrel). NO `src/components/custom/index.ts` edit — that barrel does
not exist; the root barrel re-exports each custom package directly by path.

---

## Family 2 — metric-pill (PRUNE — glass-ui-internal, no speedtest move)

metric-pill never reaches speedtest (speedtest's `MetricPillCluster` is a retired-LOCAL component
and `.metric-pill-stack` is a speedtest-LOCAL CSS class — neither is glass-ui's `<MetricPill>`).
Its only render site anywhere is the glass-ui demo story (12 tags). Nothing lands native — clean
glass-ui delete. It lives under `ui/` (not `custom/`) and on the ROOT BARREL only (no subpath, no
`api/` entry, no `package.json` export). Sever order is trivial — MetricPill is the dependent;
MetricBadge (its import) STAYS, consumed by all three apps.

glass-ui removal (STEP 3 — five edits):
1. DELETE dir `src/components/ui/metric-pill/` (`MetricPill.vue` + `index.ts`).
2. `src/components/ui/index.ts:20`: remove `export * from "./metric-pill";`.
3. ROOT BARREL `src/index.ts:95`: remove `export * from "./components/ui/metric-pill";` (it sits in
   the alphabetical `ui/` block between `label` and `multi-select`).
4. DEMO STORY: delete `demo/stories/primitives/metric-pill.vue` AND its manifest registration
   `demo/stories/manifest.ts:122` (`s("primitives", "metric-pill", "Metric Pill", …)`).
5. GATE REGISTRY `scripts/proof-storybook-ia.mjs:45` — drop `"metric-pill",` from the
   `["primitives", [...]]` band.
6. CSS: remove the MetricPill density block in `src/styles/utilities.css` — the
   `T.W2.T3 — MetricPill density modifiers` comment + the two `.metric-pill[data-density=…]`
   attribute rules (≈470-487) AND the AS.W4 `@container style(--density: …)` companion pair
   (≈488-522, the `.metric-pill.metric-badge--label-stacked` rules). VERIFY no consumer references
   the `.metric-pill` class first (grep showed only speedtest's unrelated `.metric-pill-stack`
   local class). The `.metric-badge*` utilities (≈364+ and `:465-468`) STAY — they are
   MetricBadge's, consumed by all three apps.

NO `package.json`/`api/`/subpath edits — MetricPill was never published on any of those surfaces.
NO test deletion — no metric-pill test exists under `tests/` (confirmed).

---

## Family 3 — instrument-rail (PRUNE — orphan, clean delete, no speedtest move)

Zero consumers anywhere (verified: no `<InstrumentRail>` render or `import` in any of the 6 apps,
glass-ui internal, or demo). speedtest deleted its only-ever use at AN-D6/D7/D11. Nothing lands
native. On the ROOT BARREL + `/instrument-rail` subpath + `package.json` export; NO `api/` entry;
NO test; NO demo story (the `"rail"` IA-registry slug + `demo/stories/navigation/rail.vue` are the
"Dock Rail" GlassDock story — NOT InstrumentRail — and STAY).

glass-ui removal (STEP 3 — six edits):
1. DELETE dir `src/components/custom/instrument-rail/` (`InstrumentRail.vue` + `index.ts`).
2. DELETE CSS `src/styles/instrument-rail.css` AND remove its `@import "./instrument-rail.css";`
   from `src/styles/index.css:128` (also trim the rung-13 doc-comment at
   `src/styles/index.css:98-101`; renumber the trailing cascade-order prose if the list is numbered
   strictly — the import is positional, not numbered in code, so only the comment renumbers).
3. DELETE subpath mirror `src/subpaths/instrument-rail.ts`.
4. ROOT BARREL `src/index.ts`: remove line 119 (`export * from "./components/custom/instrument-rail"`)
   and drop `instrument-rail` from the cherry-pick rationale comment (line 53/the 7-package list).
5. `package.json`: remove the `"./instrument-rail"` export block (lines 373-375) AND the
   `typesVersions["*"]["instrument-rail"]` entry (lines 103-104).
6. GATE REGISTRY `scripts/proof-consumers-static.mjs:138` — drop the line
   `"src/components/custom/instrument-rail/index.ts",`. (NOT in `proof-storybook-ia.mjs` — confirmed
   absent; the IA `"rail"` slug is the unrelated Dock Rail story.)
7. PROSE: `CLAUDE.md` decrement the published-subpath count alongside the scrolling-text decrement
   (70 → 68 net once both leave; the exports "75 entries total" drops by 2 across both families) and
   strike the `instrument-rail` mentions in the `custom/` tree listing + the root-barrel cherry-pick
   prose + the subpath enumeration + the `styles/` cascade listing (rung 13).

NO `src/api/index.ts` edit (no entry). NO test deletion (none exists). NO demo deletion (none
exists). NO speedtest edit (zero live imports; the stale `InstrumentRail` comments in speedtest's
`SurveyWizard.vue`/`SurveyResultDock.vue` are non-blocking prose, out of scope for this wave).

---

## Net glass-ui surface delta after the wave

- Published flat JS subpaths: 70 → **68** (`/scrolling-text` + `/instrument-rail` retire;
  metric-pill had none). `package.json` exports entries: 75 → **73**.
- Dirs deleted: `src/components/custom/scrolling-text/`, `src/components/custom/instrument-rail/`,
  `src/components/ui/metric-pill/`.
- Subpath mirrors deleted: `src/subpaths/scrolling-text.ts`, `src/subpaths/instrument-rail.ts`.
- CSS deleted: `src/styles/instrument-rail.css` + its `index.css` import; the metric-pill density
  block in `utilities.css`.
- Root barrel (`src/index.ts`): 3 `export *` lines struck (scrolling-text custom, instrument-rail
  custom, metric-pill ui) + the cherry-pick rationale comment trimmed.
- `ui/index.ts`: 1 line struck (metric-pill).
- Gate registries: `proof-consumers-static.mjs` −2 lines, `proof-storybook-ia.mjs` −2 entries.
- Demo: 2 stories + 2 manifest entries deleted (scrolling-text, metric-pill).
- Tests: `tests/components/custom/scrolling-text/` deleted (the only test among the three).
- `src/api/index.ts`: **untouched** (none of the three families had an api entry).
- `src/components/custom/index.ts`: **does not exist** — no edit.

## Sequence-within-the-glass-ui-cut (so the build never sees a dangling import)

Order the glass-ui edits so the barrels lose the re-export BEFORE the dir disappears (a dir delete
under a live `export *` is the dangling-import failure mode):
```
3a  strike root-barrel lines (src/index.ts:95,119,128) + ui/index.ts:20  ← re-exports gone first
3b  strike package.json exports + typesVersions  ← publication surface gone
3c  strike gate registries (proof-consumers-static, proof-storybook-ia)
3d  delete demo stories + manifest entries
3e  delete the dirs + subpath mirrors + CSS + test (now unreferenced)
3f  npm run typecheck && npm run build  ← green = no dangling import
3g  npm run proof:consumers:static && npm run proof:storybook-ia && npm run verify-export-types
    && npm run proof:resolution  ← the export-enumerating gates auto-drop the removed subpaths
```
`verify-export-types`/`proof:resolution` enumerate `package.json.exports` dynamically (verified:
`verify-export-types.mjs:14` iterates `Object.entries(pkg.exports)`), so removing the export block
in 3b auto-removes the probe — no separate gate edit for those two.

## Summary (12 lines)

1. Three families leave glass-ui: scrolling-text (REPATRIATE→speedtest), metric-pill (PRUNE), instrument-rail (PRUNE). Seven KEEP-SHARED (muster/fourier/keyframes consumers block them).
2. scrolling-text is cross-repo: speedtest gains a native `src/components/ScrollingText.vue` FIRST (rewire `useResizeObserver`→`@vueuse/core`, `cn`→glass-ui root barrel), THEN glass-ui prunes, publishes, speedtest bumps the pin.
3. Cross-repo order is load-bearing: speedtest-native + 2 import rewrites → glass-ui prune → glass-ui publish (3.4.0) → speedtest `^3.4.0` bump. STEP 1 before STEP 3, no `/scrolling-text` alias shim.
4. metric-pill + instrument-rail are glass-ui-internal prunes with ZERO consumer coordination — they ride the same glass-ui cut, nothing lands native.
5. NO "sever an internal composition first" step needed: the only coupling (MetricPill→MetricBadge) severs correctly — MetricPill is deleted, MetricBadge stays (consumed by fourier+muster+speedtest).
6. scrolling-text removal: delete custom dir + subpath mirror + root-barrel line 128 + package.json `./scrolling-text` export + typesVersions + 2 gate registry lines + demo story/manifest + the tests/ fixture.
7. metric-pill removal: delete `ui/metric-pill/` + `ui/index.ts:20` + root-barrel line 95 + demo story/manifest + `proof-storybook-ia.mjs:45` + the `.metric-pill[data-density]` CSS block in utilities.css.
8. instrument-rail removal: delete custom dir + `instrument-rail.css` (+ its index.css import) + subpath mirror + root-barrel line 119 + package.json `./instrument-rail` export + typesVersions + `proof-consumers-static.mjs:138`.
9. No `src/api/index.ts` edits (none of the three had an api entry); no `src/components/custom/index.ts` (it does not exist — the root barrel re-exports each custom package by path).
10. Net delta: 70→68 flat JS subpaths, 75→73 export entries, 3 dirs + 2 subpath mirrors + 1 CSS file + 1 test deleted, 3 root-barrel lines + 1 ui-barrel line struck, 2 demo stories retired.
11. Within the glass-ui cut, strike re-exports (barrels/exports/gates) BEFORE deleting dirs so the build never sees a dangling `export *`; then typecheck+build+the 4 export-aware proofs verify green.
12. Blocking coordination = ONLY speedtest's `^3.1.0` pin on scrolling-text; the two internal prunes are unblocked. KEEP families (metric-cell/stack/badge, animated-digit, instrument-chassis, status-dot, pulse) are blocked-from-removal by muster/fourier/keyframes and stay untouched.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/_glassui-prune-plan.md
