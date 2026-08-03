# W8 `b5e70155` closer reconciliation C2

Date: 2026-07-22  
Existing owner: MATERIAL W8 `BJ.W-REFRACT-LATCH`  
Disposition: **bank mount-arm removal; integration/model/package/browser/acceptance remain RED**

## Exact landed inputs

Mount-arm commit:

- commit: `b5e7015524b750c63f683dcbc59a9c516c1e9da3`
- tree: `3ae2342c118f9951de46e8b744cb4b99b33c75a2`
- parent: `0169e93534e754dea50e2a80dd499a26a2a955c4`
- stable patch-id: `c91a1e28d7a224adbaea26ae2dceb3bcb4b030a3`
- paths: `src/components/tabs/SegmentedTabs.vue`, `MIGRATION.md`,
  `docs/tranches/BJ/waves/BAND-MATERIAL.md`
- build seat: `claude-opus-4-8`

Post-critic receipt correction:

- commit: `010bd33b45cd67d9b896394fda035ea166766413`
- tree: `7f951a9b02c124f8c78d00b4c65fdf42f52539e7`
- parent: `b5e7015524b750c63f683dcbc59a9c516c1e9da3`
- path: `docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md` only

Exact inspected file identities after the cut:

| path | SHA-256 |
| --- | --- |
| `src/components/tabs/SegmentedTabs.vue` | `28bc80dbfea63f9857ed90f38c8ec29270acd6717b552a2862645b6e69368578` |
| `src/composables/glass/supportsBackdropRefract.ts` | `421c0023251d4830a7c0d879535bd24d8a0dcbebfa445ceb2da37c83812c5a71` |
| `src/styles/glass-refract.css` | `24bd8523ce91cfd89fec33a45dfabda9c7c54d7743c030114a8c0025fb1ee720` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `d68ac368ee3fa6cddeaa996eadf4df538422aad5fc81cdd2aee6df530f495a6b` |
| `MIGRATION.md` | `fce4fc0b865d233403604ec44200b597add773bc3f2af9f3ef13b010d13cc37a` |
| current receipt after `010bd33b` | `0421bacca7ea4101cd5d8dfb5ce4ca2f874d3b8d83d998af0a75dfefa894cda3` |
| unchanged tabs unit suite | `040c3839acb8921bc8c07e33c8e722c586c16b1ab65189f529d7b304bff34d3f` |
| unchanged W8 visual suite | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |

A local ignored build produced `dist/tabs.js` SHA-256
`2d8b99268e192cfff81a45374a0dfdb809ed77663561cc5abf795670fbabbc21` and
`dist/glass-ui.js` SHA-256
`7d37551c64b85bd653936ebdb451f4005e860c2805e296f847f9f10fbaa5a8a1`.
Those files corroborate the source closure; they are not committed or immutable package evidence.

## Banked result

The forward cut cleanly removes `onMounted(armGlassRefract)` and its import from `SegmentedTabs`.
No dangling symbol remains. The local build's public `/tabs` chunk contains no refraction/probe symbol
or probe-chunk dependency, while the package-root barrel continues to export `armGlassRefract` through
`dist/glass-ui.js`. The migration direction is also corrected: refraction is one explicit application-
root bootstrap, not a component-owned document mutation; absent bootstrap is an explicit blur-only
state.

Commit `010bd33b` corrects the previously stale receipt row, records the `f0d32d69→b5e70155` forward
revert and labels W8 integration/acceptance RED. That receipt fix is bankable process progress.

## Why W8 remains RED

### 1. The installer mechanism did not change

`supportsBackdropRefract.ts` is byte-identical to the rejected pre-cut source. It retains module-global
state rather than per-`Document` ownership, fixed id `gl-refract-probe`, uncaught `CSS.supports`, arming
before verdict, stale `data-glass-refract="on"` after a false/error and duplicate DOM-ready listener
possibilities. Component removal does not cure those defects.

Fresh exact local-runtime falsifiers against the built bytes reproduced:

```json
{
  "staleAttr": "on",
  "firstThrow": "Error: audit-forced-supports-throw",
  "afterRetry": null
}
```

Two pre-body calls registered two DOM-ready listeners. After a false verdict in document one, a
replacement document received zero support calls and retained stale `on`. The Canvas2D fragment-filter
probe also remains only a proxy for the shipped inline-data-URI backdrop compositor.

### 2. The removal is a one-time state, not a retained invariant

No committed unit, gate or package test changed. Re-adding the component import/hook or changing chunk
composition can restore the `/tabs` probe dependency while all current suites remain GREEN. The ignored
local build is evidence of present state, not a born-RED watcher.

### 3. The only root witness is not the public consumer contract

`demo/main.ts` is a valid source witness but imports through the private `@glass/composables/glass` alias.
It does not prove an installed consumer can import the public package root. Value.js, keyframes, Atlas and
SCI remain unadopted. Q's Gallery/VFT receivers are therefore still OFF by omission on the current consume
edge.

Read-only current censuses find zero `armGlassRefract` calls across value.js, keyframes, Atlas and SCI;
value.js and SCI do contain real pill `SegmentedTabs` receivers. Glass, Atlas and SCI still consume/depend
on mutable `7.0.0` identities, value.js declares `^7.0.0`, and keyframes still declares no Glass dependency.

### 4. The three paint arms remain absent

The existing visual suite still proves only the unarmed OFF floor. It does not prove the real exported-root
ON path, a forced false-positive engine path, an observable garnish delta, or immediate failure on the
first painted sharp twin. Its recapture behavior can still select a favorable later frame.

### 5. No immutable package or actual Safari receiver exists

The local ignored `dist` build has no source→pack→install→served identity chain. No unique 8.0 artifact,
exact consumer lock, Chromium installed fixture, actual Safari video path or VoiceOver receiver proof was
added. Bundled WebKit remains discovery, not Safari.

### 6. Model and commit truth are contradictory

The workflow metadata and `b5e70155` commit body identify `claude-opus-4-8`, while
`BAND-MATERIAL.md` says `model claude-opus-4-8, Luna x-high seat`. That phrase is false: an Opus-authored
seat did not become Luna by implementing a Luna-routed contract. The commit body also adds explicit model
authorship despite repository commit discipline forbidding AI/tool authorship.

The new prose also overstates unresolved mechanism truth: “idempotent” is only module-local rather than
per-document; “OFF on WebKit” comes from bundled Playwright WebKit/proxy evidence, not actual Safari or a
standing armed-side detector; and “one call arms every surface” is conditional on a detector that can throw
or irreversibly lock false. Treat those as intended contract, not current acceptance.

Preserve history, but correct the prose forward and keep terminal model-law RED. Receipt commit
`010bd33b` changes gate/status truth and carries 43 lines yet has no body explaining why, evidence or routed
remainder. The file content contains useful detail; the commit still does not satisfy body-bearing broad
status-change discipline.

## Born-RED continuation matrix

| mutation / arm | required result |
| --- | --- |
| restore `SegmentedTabs` import/hook | committed source/build ownership gate RED; `/tabs` probe closure RED |
| omit a real app-root call | installed application fixture RED before lens interaction |
| reuse the fixed probe id or preseed a colliding element | detector remains deterministic; collision mutation RED |
| make either `CSS.supports` call throw | no throw, root reconciles OFF, repeat remains usable |
| start with stale root `on`, then return false/error | stale attribute is removed immediately |
| call in two documents or before/after readiness | one effective per-document install; no leaked listeners/nodes |
| neutralize displacement/specular but retain syntactic URL | real-ON observable-garnish arm RED |
| omit root export or pack stale `/tabs` | package/install/served identity gate RED |
| delete the latched selector or force detector false on a functional engine | real-ON paint arm RED |
| force detector true while backdrop paint drops | false-positive arm RED rather than accepting a sharp lens |
| first painted twin is sharp | immediate RED; no recapture laundering |

## Binding continuation

Preserve `b5e70155` and `010bd33b` without amendment. A prospective Luna x-high cut completes the
per-document total/reversible/collision-safe installer, direct lifecycle mutations and retained `/tabs`
ownership gate. Then wire one public package-root call through every first-party app, build/pack/install one
immutable 8.0 artifact, prove OFF/real-ON/false-positive/first-sharp arms in Chromium and actual Safari,
and run Q's Gallery/VFT natural receivers plus two fresh unchanged-byte Sol x-high critics.

No component auto-arm, duplicate detector, engine skin, consumer shim, source-only repin, Opus-as-Luna
label, bundled-WebKit-as-Safari or terminal W8 close follows.

Independent exact-byte checks for this reconciliation: `git diff --check` GREEN; tabs unit suite 13/13
GREEN but ownership-blind; `npm run iter-check` GREEN; recursively generated `/tabs` closure 19 JS files
with zero refraction runtime symbols. No actual Safari, immutable package, installed consumer or new browser
acceptance exists.
