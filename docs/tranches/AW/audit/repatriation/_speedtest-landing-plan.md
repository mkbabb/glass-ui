# Speedtest native-landing plan — AV-adopt tranche handoff annex

The per-family repatriation digests (this dir) verdict EXACTLY ONE family REPATRIATE and ZERO
SPLIT. This annex is the speedtest-side native-landing spec for the AV-adopt tranche
(the speedtest-W<n>-repatriate wave). All file:line read TODAY (2026-06-07).

## Disposition roll-up (from the 8 verdict digests)

| family | verdict | speedtest native-landing? |
|--------|---------|---------------------------|
| **scrolling-text** | **REPATRIATE** | **YES — the only landing in this annex** |
| instrument-rail | PRUNE (orphan; 0 consumers anywhere) | NO — nothing lands; clean glass-ui deletion |
| metric-pill (MetricPill) | PRUNE (glass-ui demo-only) | NO — speedtest never consumed it |
| metric-cell | KEEP-SHARED (muster `TravelMatrix.vue:88`) | NO |
| metric-stack (MetricStack/MetricRow) | KEEP-SHARED (muster ×2 files) | NO |
| metric-badge (MetricBadge) | KEEP-SHARED (fourier ×7 + muster ×2) | NO |
| animated-digit | KEEP-SHARED (fourier `CoefficientsSpectrum.vue:99`) | NO |
| instrument-chassis (+ChassisDivider) | KEEP-SHARED (muster App shell + WinnerHero) | NO |
| status-dot / pulse | KEEP-SHARED (muster; Pulse also speedtest ×7) | NO |

So the speedtest AV-adopt repatriate wave has a SINGLE moving part: `ScrollingText`. Every
KEEP-SHARED family above is BLOCKED-from-repatriation by a genuine non-speedtest app consumer
(muster/fourier) — speedtest keeps importing each over its unchanged glass-ui subpath; no
speedtest edit. The two PRUNEs (instrument-rail, MetricPill) are glass-ui-internal deletions
with NO speedtest landing (speedtest does not consume either; the speedtest `MetricPillCluster`
+ `.metric-pill-stack` hits are a retired-local component and a local CSS class, not the
glass-ui symbol — see metric-badge-pill.md). This annex therefore specs ONLY the ScrollingText
native landing.

---

## ScrollingText — native landing spec

### What speedtest consumes today (verified TODAY)

Exactly TWO import sites, FIVE render sites, ZERO other consumers (grep over `src/` clean):

| file:line | role | binds |
|-----------|------|-------|
| `src/components/AppSettingsButton.vue:97` | import `{ ScrollingText } from "@mkbabb/glass-ui/scrolling-text"` | — |
| `src/components/AppSettingsButton.vue:38` | render `:text="resolvedClientIp"` `class="mt-1 block font-mono text-prose"` | client IP |
| `src/components/AppSettingsButton.vue:39` | render `:text="resolvedIpInfo.org"` `class="mt-0.5 block text-prose italic text-muted-foreground"` | ISP/org |
| `src/components/AppSettingsButton.vue:52` | render `:text="resolvedLookedUpIp.row['Entity Name']"` `class="mt-1 block text-prose text-th-accent"` | entity name |
| `src/components/AppSettingsButton.vue:56` | render `:text="resolvedLookedUpIp.row['Entity ID']"` `class="mt-0.5 block font-mono text-body text-muted-foreground"` | entity ID |
| `src/components/dashboard/ResultDetailSheet.vue:6` | import `{ ScrollingText } from "@mkbabb/glass-ui/scrolling-text"` | — |
| `src/components/dashboard/ResultDetailSheet.vue:99` | render `:text="row.session.clientIp ?? '—'"` `class="text-mono-small"` | result client IP |

Every binding is a long monospaced network identifier overflowing a cramped popover/sheet —
the exact use case the marquee was lifted FROM speedtest (v0.9.1) to solve. No non-speedtest
consumer exists (fourier/value.js/keyframes/muster/words all 0 — see scrolling-text.md).

### WHERE it lands

`speedtest/src/components/ScrollingText.vue` — a **top-level shared component**, the
established speedtest idiom for a leaf reused across areas (`AppSettingsButton.vue`,
`CellularWarningDialog.vue`, `Dock.vue` all sit flat at `src/components/`). It serves BOTH
consumers: `AppSettingsButton.vue` (at `src/components/`) and `ResultDetailSheet.vue` (at
`src/components/dashboard/`). speedtest has NO `shared/`/`common/` subdir (confirmed:
`find src/components -maxdepth 1 -type d` → only `speedtest/ admin/ dashboard/ survey/`), so the
flat top-level home is the idiomatic, lowest-coupling choice — not a contrived new folder.

### HOW the source moves (de-glass-ui-ify the two internal imports)

Copy `glass-ui/src/components/custom/scrolling-text/ScrollingText.vue` VERBATIM — template,
script, and the entire scoped `<style>` block — into `speedtest/src/components/ScrollingText.vue`.
The SFC has TWO glass-ui-internal imports to rewire (`ScrollingText.vue:15-16`); everything else
(the `text?` + `class?` props, the measure logic, the `--scroll-distance`/`--scroll-duration`
custom props, the `scrolling-text-pan` keyframe, the PRM bracket) is self-contained and
references ZERO glass-ui token — copy as-is.

**Dep 1 — `useResizeObserver`** (`ScrollingText.vue:15`):
`import { useResizeObserver } from "../../../composables/dom/useResizeObserver"`
→ `import { useResizeObserver } from "@mkbabb/glass-ui/dom"`.
RATIONALE: speedtest ALREADY consumes this exact leaf over this exact subpath —
`src/components/speedtest/composables/meter/meterGeometry.ts:28` imports
`{ useResizeObserver } from "@mkbabb/glass-ui/dom"` and calls it `useResizeObserver(meterRef, () => {…})`
at `:110`. The signature is identical to ScrollingText's two calls
(`useResizeObserver(containerRef, measure)` / `(contentRef, measure)`, where `measure` ignores
its `(rect, entry)` args). `useResizeObserver` is a generic DOM leaf glass-ui legitimately
shares (NOT speed-test substrate) — per the CLAUDE.md repatriation rubric, cn/dom-leaves STAY
glass-ui; only the bespoke component repatriates. So this is the canonical native substitute,
NOT a vueuse swap. (The scrolling-text.md digest proposed `@vueuse/core` as the substitute; that
also works since speedtest pins `@vueuse/core ^14.2.1`, but `@mkbabb/glass-ui/dom` is strictly
better here — it is the SAME implementation speedtest already wires for its meter, so no new
substrate seam and no risk of a glass-ui-wrapper↔vueuse signature divergence. USE
`@mkbabb/glass-ui/dom`.)

**Dep 2 — `cn`** (`ScrollingText.vue:16`):
`import { cn } from "../../../utils/cn"` → speedtest has NO local `cn` and NO `clsx`/`tailwind-merge`
dep (confirmed: `src/utils/` holds `formatTime/icons/typedStorage/utils.ts` only, no cn; grep for
`clsx`/`cn` in `src/utils/` empty). The component's single `cn` call is
`cn('scrolling-text', props.class)` (`ScrollingText.vue:5`) — and EVERY forwarded `class` at the
5 render sites is a list of NON-conflicting single-bucket utilities (`mt-1 block font-mono text-prose`,
`text-mono-small`, …) with zero merge-pair collisions. So glass-ui's 200-line conflict-dedup `cn`
is overkill here. Two clean options:
  - **(A, recommended) keep `cn` from glass-ui:**
    `import { cn } from "@mkbabb/glass-ui"` (`cn` is on the glass-ui ROOT BARREL via
    `src/utils/cn.ts` → `utils` → `src/index.ts`). speedtest already pins glass-ui ^3.1.0; `cn` is
    a generic utility glass-ui shares, same posture as `useResizeObserver`. Zero new code,
    behaviour-identical.
  - **(B, full-sever) vendor a 2-line join** into `speedtest/src/utils/utils.ts`:
    `export const cn = (...a: (string | undefined | false | null)[]) => a.filter(Boolean).join(" ")`.
    Safe because no render site passes a conflicting Tailwind pair; the simple join reproduces the
    observed output exactly. Pick (B) only if speedtest wants ZERO glass-ui import in this file.

RECOMMENDATION: **(A) + `@mkbabb/glass-ui/dom`** — i.e. the native ScrollingText keeps importing
two GENERIC glass-ui LEAVES (`cn` root-barrel, `useResizeObserver` /dom subpath) and severs only
the BESPOKE component. This is the rubric-correct split: cn/dom-leaves stay glass-ui, the
speed-test-domain marquee repatriates. speedtest already depends on both leaves, so the native
copy adds NO new glass-ui surface.

### Import-site rewrites speedtest needs (2 edits — USE the `@src` alias, not relative)

speedtest's local-component idiom is the `@src/*` alias (`Dock.vue:18`:
`import AppSettingsButton from "@src/components/AppSettingsButton.vue"`; `@src` → `src` per
`tsconfig.json:19` + `vite.config.mjs:42`). The scrolling-text.md digest proposed relative
`../ScrollingText.vue` paths — OVERRIDE that with the alias for idiom-consistency:

- `src/components/AppSettingsButton.vue:97`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"`
  → `import ScrollingText from "@src/components/ScrollingText.vue"`
  (NAMED→DEFAULT: the native SFC default-exports; the glass-ui subpath named-exported it. So the
  brace import becomes a default import. Relative `./ScrollingText.vue` also valid since
  AppSettingsButton sits at `src/components/`, but `@src/` matches the house idiom.)
- `src/components/dashboard/ResultDetailSheet.vue:6`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"`
  → `import ScrollingText from "@src/components/ScrollingText.vue"`
  (same NAMED→DEFAULT change; relative would be `../ScrollingText.vue`.)
- ALL 5 render sites unchanged — the native SFC preserves the `<ScrollingText :text=… class=… />`
  API (`text?: string` + `class?` props + default slot) byte-for-byte.

### glass-ui leaves speedtest STILL consumes after the move

`cn` (root barrel, option A) and `useResizeObserver` (`@mkbabb/glass-ui/dom`) STAY glass-ui
dependencies of speedtest — both are generic leaves, not speed-test substrate, and speedtest
already consumes `useResizeObserver` independently in `meterGeometry.ts`. ONLY the
`@mkbabb/glass-ui/scrolling-text` SUBPATH import is severed. speedtest's other ~20 glass-ui
subpath imports (sheet, badge, separator, metric-cell, popover, button, forms, controls, dock,
pulse, metric-stack, instrument-chassis, metric-badge, …) are ALL unaffected — every one resolves
a KEEP-SHARED family.

### glass-ui departure cut (cross-reference — the lockstep other half)

speedtest cannot land native until glass-ui removes the family in the SAME coordinated cut (the
no-backwards-compat law forbids a dangling alias). The glass-ui removal footprint, line-verified
TODAY (full detail in scrolling-text.md §Move plan):
- DELETE dir `src/components/custom/scrolling-text/` + `src/subpaths/scrolling-text.ts`.
- root barrel `src/index.ts:128` (`export *`) + trim the cherry-pick comment mention at `:54`.
- `package.json`: remove `./scrolling-text` export (`:389-392`) + `typesVersions["*"]["scrolling-text"]`
  (`:121-123`). Decrement the published-subpath count in CLAUDE.md prose.
- gate registries: `scripts/proof-consumers-static.mjs:143` (drop the census path) +
  `scripts/proof-storybook-ia.mjs:59` (drop `"scrolling-text"`).
- demo: RETIRE `demo/stories/data/scrolling-text.vue` + its `demo/stories/manifest.ts:179` entry
  (a glass-ui demo cannot import the speedtest-native copy; it deletes).
- NO `src/api/index.ts` change — scrolling-text was never on the api barrel (grep empty, confirmed).

### Sequencing (the speedtest wave's hinge)

speedtest pins `@mkbabb/glass-ui ^3.1.0`. Two valid orders:
1. **Lockstep (cleaner under no-backwards-compat):** in one coordinated cut, glass-ui removes the
   family AND speedtest lands the native copy + rewrites the 2 imports — the original v0.9.1
   lift-and-drop run in reverse. Bump speedtest's pin to the glass-ui minor that drops the subpath.
2. **Land-native-first:** speedtest lands `ScrollingText.vue` + rewrites the 2 imports against the
   still-present subpath (speedtest works green), THEN the next glass-ui minor cuts the removal,
   THEN speedtest's pin advances. Lower risk; two PRs.
Recommend **(1)** per the no-shim invariant — the subpath is a clean break with exactly one
external consumer (speedtest), so a lockstep cut leaves no window where a dangling
`/scrolling-text` import resolves nothing.

### Blocking coordination

NONE. Zero non-speedtest consumers of ScrollingText (fourier/value.js/keyframes/muster/words all
0, verified in scrolling-text.md). The only non-speedtest render is the glass-ui demo story, which
retires with the move. No SPLIT — there is no shared generic core to retain because there is no
2nd consumer to retain it for. The single soft cost is the publish-sequencing above.

---

## Summary

1. Of the 8 candidate families, EXACTLY ONE repatriates to speedtest: **ScrollingText**. Zero SPLITs.
2. The other 7: instrument-rail + MetricPill PRUNE (glass-ui-internal deletes, no speedtest landing); metric-cell/metric-stack/metric-badge/animated-digit/instrument-chassis/status-dot/pulse all KEEP-SHARED (blocked by genuine muster/fourier consumers).
3. ScrollingText has exactly 2 speedtest import sites (`AppSettingsButton.vue:97`, `ResultDetailSheet.vue:6`) + 5 render sites — all binding overflowing network identifiers; no other consumer anywhere.
4. LANDS at `speedtest/src/components/ScrollingText.vue` (flat top-level — the speedtest idiom for a leaf shared across `AppSettingsButton`/`dashboard`; no `shared/` subdir exists).
5. Copy the SFC verbatim (template + script + scoped style — references zero glass-ui token); rewire only the 2 internal imports.
6. `useResizeObserver` → `@mkbabb/glass-ui/dom` (speedtest ALREADY consumes this exact leaf at `meterGeometry.ts:28,110`, identical `(target, callback)` signature) — NOT a vueuse swap.
7. `cn` → keep from `@mkbabb/glass-ui` root barrel (option A, recommended) OR vendor a 2-line filter-join into `src/utils/utils.ts` (option B) — render sites pass no conflicting Tailwind pairs, so the simple join is behaviour-safe.
8. Rubric-correct split: the GENERIC leaves (cn, useResizeObserver) STAY glass-ui; only the BESPOKE marquee repatriates. speedtest already depends on both leaves — zero new glass-ui surface.
9. Import rewrites: both sites NAMED→DEFAULT `import ScrollingText from "@src/components/ScrollingText.vue"` (the `@src` alias is the house idiom per `Dock.vue:18` — overrides the digest's relative-path proposal). All 5 render sites unchanged (identical `:text`/`class` API).
10. glass-ui departure (lockstep other half): delete the dir + subpath barrel + root-barrel line `src/index.ts:128` + `package.json` `./scrolling-text` (`:389-392`) + typesVersions (`:121-123`) + 2 gate-registry lines (`proof-consumers-static.mjs:143`, `proof-storybook-ia.mjs:59`) + retire the demo story (`manifest.ts:179`); no api/ change.
11. Sequencing: lockstep cut (remove from glass-ui + land native in speedtest in one coordinated move) per the no-backwards-compat law; bump speedtest's `^3.1.0` pin to the glass-ui minor that drops the subpath.
12. NO blocking coordination — zero non-speedtest consumers; speedtest is clean at HEAD (inv-16) and can take the native copy.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/_speedtest-landing-plan.md
