# scrolling-text — REPATRIATE verdict

Family surface: ONE symbol, `ScrollingText` (overflow-detection horizontal marquee).
`src/components/custom/scrolling-text/index.ts:1` exports `{ default as ScrollingText } from "./ScrollingText.vue"`.
On the glass-ui ROOT BARREL (cherry-picked custom export) at `src/index.ts:128`
(`export * from "./components/custom/scrolling-text"`) AND the flat subpath
`@mkbabb/glass-ui/scrolling-text` (`src/subpaths/scrolling-text.ts:1`). NOT in `src/api/index.ts`
(no type/constant published — confirmed: zero `Scrolling` hits in api barrel read TODAY).

## Consumer census

Census ran TODAY across all 6 consumer repos (speedtest, fourier-analysis, value.js,
keyframes.js, muster, words) + glass-ui internal `src/` + `demo/`, excluding the family's own
dir, the barrels, and the api/subpath re-exports.

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| speedtest | `src/components/AppSettingsButton.vue:97` (import) + `:38,:39,:52,:56` (render) | `ScrollingText` | 4 | a (speedtest) |
| speedtest | `src/components/dashboard/ResultDetailSheet.vue:6` (import) + `:99` (render) | `ScrollingText` | 1 | a (speedtest) |
| fourier-analysis | — | — | 0 | — (no source hit) |
| value.js | — | — | 0 | — (no source hit) |
| keyframes.js | — | — | 0 | — (no source hit) |
| muster | — | — | 0 | — (no source hit) |
| words | — | — | 0 | — (no source hit) |
| glass-ui INTERNAL | — | — | 0 | — (no glass-ui component composes `ScrollingText`) |
| glass-ui DEMO | `demo/stories/data/scrolling-text.vue:4` (import) + `:68,:90,:104` (render) | `ScrollingText` | 3 | d (demo story only) |

Import discipline note: both speedtest sites import from the FLAT subpath
`@mkbabb/glass-ui/scrolling-text` (not the root barrel) — confirmed at
`AppSettingsButton.vue:97` and `ResultDetailSheet.vue:6`. These are REAL import+render, not stale
comments or barrel re-exports.

What the 5 speedtest renders bind (all speedtest-domain network data):
- `AppSettingsButton.vue:38` → `resolvedClientIp` (the user's IP, IPv4/IPv6)
- `AppSettingsButton.vue:39` → `resolvedIpInfo.org` (ISP / org name)
- `AppSettingsButton.vue:52` → `resolvedLookedUpIp.row['Entity Name']`
- `AppSettingsButton.vue:56` → `resolvedLookedUpIp.row['Entity ID']`
- `ResultDetailSheet.vue:99` → `row.session.clientIp` (the result's client IP)

Every binding is a long monospaced network identifier that overflows a narrow popover/sheet —
precisely the IPv6-overflow use case this component was lifted FROM speedtest to solve (the
glass-ui CLAUDE.md credit: "ScrollingText overflow-marquee, lifted from speedtest v0.9.1"; the
speedtest A6-synthesis "Lift ScrollingText" task at `docs/audits/2026-05-08-pre-W/...`).

## Verdict + rationale

REPATRIATE. The ONLY genuine import+render consumer is speedtest (2 files, 5 renders). The single
non-speedtest render site is a glass-ui DEMO STORY (class d), which is NOT a 2nd consumer under
glass-ui's own substrate-without-consumer-binary invariant (a demo story never was). There is no
glass-ui-INTERNAL composition consumer (no other glass-ui component renders `ScrollingText` — it is
purely barrel/subpath-exposed) and no generic non-speedtest app consumer (0 hits across
fourier/value.js/keyframes/muster/words).

Specificity lens (the user's overriding test): although `ScrollingText` is mechanically a generic
"text-that-overflows-pans" marquee, in PRACTICE it has exactly one home — the speed-test instrument
domain, where it exists to pan overflowing IP/ISP/entity strings inside cramped result popovers.
It was lifted FROM speedtest and every live render binds a network identifier. There is no second
genuine consumer to anchor it in the shared library. Per the user directive
("speedtest-specific items should be REMOVED from glass-ui and placed natively within speedtest")
and the >=2-genuine-consumer law, it repatriates.

Honesty flag: `ScrollingText` is the LEAST speedtest-coupled of the candidate families — it carries
NO hardcoded speedtest reference in its own source (unlike metric-stack, which hard-references
speedtest by name), takes only a generic `text?` prop + default slot, and is theoretically reusable
as a marquee anywhere. If a FUTURE non-speedtest app wants an overflow marquee, this is a clean
generic primitive. But "theoretically reusable" is exactly the overfit-substrate trap glass-ui's
invariant guards against: today it has 1 genuine consumer + 1 demo. The conservative read is
REPATRIATE now (move it native to its only consumer); re-lift to glass-ui IF and WHEN a 2nd genuine
consumer appears — same trigger that lifted it the first time. This is a clean break, no alias.

## Move plan

What LEAVES glass-ui (4 edits + 1 demo decision):
1. DELETE dir `src/components/custom/scrolling-text/` (`ScrollingText.vue` + `index.ts`).
2. DELETE subpath mirror `src/subpaths/scrolling-text.ts`.
3. REMOVE root-barrel line `src/index.ts:128` (`export * from "./components/custom/scrolling-text"`)
   and drop `scrolling-text` from the cherry-pick rationale comment at `src/index.ts:54`.
4. REMOVE `package.json` export entry `"./scrolling-text"` (lines ~389–392) AND the
   `typesVersions["*"]["scrolling-text"]` entry (lines ~121–123). Decrement the published-subpath
   count in CLAUDE.md prose (70 flat JS subpaths → 69; the "scrolling-text" mention in the custom/
   tree listing + the root-barrel cherry-pick list + the subpath enumeration).
5. UPDATE the two internal gate registries that name it:
   - `scripts/proof-consumers-static.mjs:143` — drop `"src/components/custom/scrolling-text/index.ts"`
     from the census list.
   - `scripts/proof-storybook-ia.mjs:59` — drop `"scrolling-text"` from the IA registry.
6. DEMO STORY: `demo/stories/data/scrolling-text.vue` either retires (zero library symbol left) or
   re-points its import to the native speedtest copy — but a glass-ui demo cannot import speedtest,
   so this story should RETIRE (delete) on repatriation, along with any story-index registration.
   (The `metaball`/storybook IA gate change in step 5 already accounts for the IA registry.)

Where it LANDS native in speedtest:
- New file `src/components/ScrollingText.vue` (the `AppSettingsButton.vue` sits at
  `src/components/`, `ResultDetailSheet.vue` at `src/components/dashboard/`; a shared component at
  `src/components/ScrollingText.vue` serves both). Copy `ScrollingText.vue` verbatim, rewiring its
  two intra-library imports:
  - `useResizeObserver` from `"../../../composables/dom/useResizeObserver"` →
    `import { useResizeObserver } from "@vueuse/core"` (speedtest already pins `@vueuse/core ^14.2.1`
    at `package.json:90` and uses it across 4+ files; glass-ui's `useResizeObserver` is itself a thin
    vueuse-shaped wrapper, so the vueuse import is the clean native substitute). VERIFY the call
    signature matches `useResizeObserver(target, callback)` — if glass-ui's wrapper diverges, vendor
    its 1-function body into a speedtest local instead.
  - `cn` from `"../../../utils/cn"` → speedtest has NO local `cn` (confirmed: `src/utils/` has no
    cn.ts, no clsx/twMerge usage). Either (a) `import { cn } from "@mkbabb/glass-ui"` (cn IS on the
    glass-ui root barrel via `src/utils/index.ts` → `export * from "./utils"`), keeping the lib dep
    minimal, OR (b) vendor a 3-line local `cn` into `src/utils/utils.ts` (clsx + dedup) to fully
    sever the marquee from glass-ui. Recommend (a) — `cn` is a generic utility glass-ui legitimately
    shares, not speedtest-domain substrate.
- Copy the scoped `<style>` block verbatim (it is self-contained — `--scroll-distance`/
  `--scroll-duration` custom props + the `scrolling-text-pan` keyframe + PRM bracket; references no
  glass-ui token).

Import rewrites speedtest needs (2 files):
- `src/components/AppSettingsButton.vue:97`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"` →
  `import ScrollingText from "../ScrollingText.vue"` (relative; AppSettingsButton is at
  `src/components/`, so `./ScrollingText.vue`).
- `src/components/dashboard/ResultDetailSheet.vue:6`:
  `import { ScrollingText } from "@mkbabb/glass-ui/scrolling-text"` →
  `import ScrollingText from "../ScrollingText.vue"` (ResultDetailSheet is at
  `src/components/dashboard/`, so `../ScrollingText.vue`).
- Render sites unchanged (`:38,:39,:52,:56` in AppSettingsButton; `:99` in ResultDetailSheet) — same
  `<ScrollingText :text=… class=… />` API; the native copy preserves the `text?` prop + default slot.

Sequencing: this is a publish-coupled move (speedtest pins `@mkbabb/glass-ui ^3.1.0`). Land the
native speedtest copy + import rewrites FIRST (speedtest works against the still-present subpath),
THEN cut the glass-ui removal in the next glass-ui minor and bump speedtest's pin. OR (cleaner under
the no-backwards-compat law) land both in one coordinated cut: remove from glass-ui, ship native in
speedtest, in lockstep — same lift-and-drop discipline as the original v0.9.1 lift, run in reverse.

## Blocking coordination

NONE. Zero non-speedtest consumers (fourier/value.js/keyframes/muster/words all 0 source hits,
verified TODAY) and zero glass-ui-internal composition consumers. The only non-speedtest render site
is the glass-ui demo story (retires with the move). No SPLIT is needed — there is no shared generic
core to retain, because there is no 2nd consumer to retain it for. The single soft cost is the
publish-sequencing above (speedtest's `^3.1.0` glass-ui pin). The two internal gate registries
(`proof-consumers-static.mjs`, `proof-storybook-ia.mjs`) update mechanically in the same cut.

## Summary

ScrollingText (overflow-marquee, lifted FROM speedtest v0.9.1) has exactly ONE genuine
import+render consumer: speedtest, across 2 files — `AppSettingsButton.vue` (4 renders: clientIp,
ISP org, entity name, entity ID) and `ResultDetailSheet.vue` (1 render: clientIp). Every live
binding is a long monospaced network identifier overflowing a cramped popover/sheet — the exact
speed-test-instrument use case it was lifted to solve. The only other render site is a glass-ui
DEMO STORY (class d — not a genuine 2nd consumer under glass-ui's own invariant). Zero non-speedtest
app consumers (fourier/value.js/keyframes/muster/words all 0), zero glass-ui-internal composition
consumers (no other glass-ui component renders it; it is purely barrel/subpath-exposed). VERDICT:
REPATRIATE. Move `ScrollingText.vue` native to `speedtest/src/components/ScrollingText.vue`, rewiring
its two lib-internal imports (`useResizeObserver` → `@vueuse/core` already pinned; `cn` → keep from
`@mkbabb/glass-ui` root barrel or vendor 3 lines). Remove the glass-ui dir + subpath +
root-barrel line + package.json `./scrolling-text` export + typesVersions entry + 2 internal gate
registry lines; retire the demo story. Rewrite the 2 speedtest import lines to a relative
`ScrollingText.vue`. NO blocking coordination — zero non-speedtest consumers; the only cost is
publish-sequencing the speedtest `^3.1.0` pin. Honesty flag: this is the LEAST speedtest-coupled
candidate (no hardcoded speedtest reference in its source, generic `text?` prop), so it is a clean
generic marquee — but it still has only 1 genuine consumer today, so it repatriates now and re-lifts
IF a 2nd genuine consumer ever appears (same trigger as the original lift).
