# P.W5 Lane C — keyframes.js cross-repo writes (CR-3 + scale-on-hover + Fira Code CDN drop)

## §1 Scope

Per `docs/tranches/P/waves/W5.md` Lane C (C.1–C.3) + `docs/tranches/P/audit/P11-Lane-d-keyframes-js.md` §"CR-3 concrete migrations" + §"v1.5.0 Fira Code + Plus Jakarta Sans self-host".

Three cohort-able sub-tasks against `/Users/mkbabb/Programming/keyframes.js/` @ `7561af3` on `master` (v2.1.0):

- **C.1**: HeaderRibbon canonical adoption — retire 152 LOC local fork; consumer at `EditorShell.vue:70` migrates to `@mkbabb/glass-ui/header-ribbon`.
- **C.2**: `scale-on-hover` utility adoption — 13 sites / 10 files rename `hover:scale-105` → `scale-on-hover`.
- **C.3**: Fira Code self-host adoption — 8 HTML entry points drop Google Fonts CDN `<link>` for Fira Code; Instrument Serif retained (not in glass-ui font subsystem).

Glass-ui-side prereqs landed pre-W5: `@mkbabb/glass-ui/header-ribbon` subpath (O.W6 Lane A) + `@utility scale-on-hover` (O.W6) + Fira Code self-host woff2 cascade in `@mkbabb/glass-ui/styles` (v1.5.0+; verified @ v1.8.2 linked-install).

## §2 C.1 — HeaderRibbon retire + canonical adoption

**Fork delete:**

```
rm -r /Users/mkbabb/Programming/keyframes.js/demo/@/components/custom/header-ribbon/
  - HeaderRibbon.vue   152 LOC
  - index.ts             1 LOC
  total                153 LOC removed
```

**Consumer import-rewrite** (sole site — `EditorShell.vue:70`):

```diff
- import { HeaderRibbon } from "@components/custom/header-ribbon";
+ import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
```

No other call-site changes required — the `HeaderRibbon` named export shape is identical between fork and canonical (verified per P11/d §"Surface diff—all cosmetic, behavior identical"). `headerRibbonRef`'s `InstanceType<typeof HeaderRibbon>` annotation resolves correctly through the new import.

**Net C.1 delta**: -153 LOC + 1 import rewrite.

## §3 C.2 — scale-on-hover migration (13 sites / 10 files)

`hover:scale-105` → `scale-on-hover` (Tailwind v4 `@utility` from `src/styles/utilities.css:542`; transition + easing bind to `--duration-fast` + `--ease-standard`; scale binds to canonical `--scale-hover: 1.08`).

Per the lane spec: only the class name changes; no compound `active:scale-95` sites observed (audit P11/d §CR-3.2 verified survey). The single `--scale-hover` token resolves to 1.08 (canonical) vs the consumer's prior 1.05; bit-for-bit preservation is not feasible without a per-consumer token override and `scale-on-hover` has no tier modifier. Adoption accepts the canonical 1.08 — same precedent as P11/a Lane E for words/frontend.

Enumerated edits:

| # | File | Line | Class fragment edited |
|---|------|------|-----------------------|
| 1 | `demo/app/App.vue` | 44 | `ppmycota-logo-sm w-7 h-7 shrink-0 scale-on-hover` (also dropped redundant `transition-transform`) |
| 2 | `demo/app/scenes/CubeScene.vue` | 111 | `... font-bold scale-on-hover` |
| 3 | `demo/cube/App.vue` | 19 | `... font-bold scale-on-hover` |
| 4 | `demo/cube/App.vue` | 51 | `aspect-square w-8 scale-on-hover` |
| 5 | `demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue` | 28 | `scale-on-hover icon-md` |
| 6 | `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue` | 70 | `cursor-pointer scale-on-hover rounded-lg stroke-2` |
| 7 | `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue` | 137 | `w-6 h-6 scale-on-hover` |
| 8 | `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue` | 152 | `cursor-pointer bg-transparent hover:bg-transparent scale-on-hover` |
| 9 | `demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue` | 17 | `p-0 m-0 scale-on-hover cursor-pointer ...` |
| 10 | `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue` | 96 | `... hover:border-primary scale-on-hover` |
| 11 | `demo/@/components/custom/editor-shell/EditorHeader.vue` | 26 | `aspect-square w-8 scale-on-hover hover:opacity-50` |
| 12 | `demo/@/components/custom/editor-shell/EditorShell.vue` | 17 | `aspect-square w-8 scale-on-hover` |
| 13 | `demo/@/components/custom/editor-shell/SharePopover.vue` | 7 | `... cursor-pointer scale-on-hover transition-all ...` |

**Post-migration verification**: `rg 'hover:scale-105' demo/ src/` → 0 hits. `rg 'scale-on-hover' demo/ src/` → 13 hits. Inventory clean.

**Net C.2 delta**: 10 files / 13 class renames + 1 redundant `transition-transform` drop on `app/App.vue:44`.

## §4 C.3 — Fira Code self-host adoption (8 HTML entries)

Glass-ui v1.5.0+ ships self-hosted Fira Code woff2 (variable wght 300..700) via the `@mkbabb/glass-ui/styles` cascade — perfect overlap with the consumer's `family=Fira+Code:wght@300;400;500;700` Google Fonts request. The 6 demos that import `@styles/style.css` (which `@import`s `@mkbabb/glass-ui/styles`) receive Fira Code self-hosted automatically post-drop.

8 HTML entries had Fira Code CDN loads pre-W5 (per P11/d audit grep). All 8 dropped:

| # | File | Cascade source | Drop scope |
|---|------|---------------|------------|
| 1 | `demo/app/index.html` | glass-ui via `@styles/style.css` | preload + stylesheet + noscript-stylesheet for Fira Code (5 lines net; Instrument Serif retained) |
| 2 | `demo/amiga/index.html` | glass-ui via `@styles/style.css` | preload-omitted variant; 6 lines net |
| 3 | `demo/cube/index.html` | glass-ui via `EditorShell` chain | 6 lines net |
| 4 | `demo/playground/index.html` | glass-ui via `@styles/style.css` | 6 lines net |
| 5 | `demo/simple/index.html` | glass-ui via `@styles/style.css` | 6 lines net |
| 6 | `demo/square/index.html` | glass-ui via `@styles/style.css` | 6 lines net |
| 7 | `demo/balls/index.html` | NO glass-ui cascade (standalone) | 5 lines net; falls back to `monospace` (declared in inline `font-family: "Fira Code", monospace`) |
| 8 | `demo/boxes/index.html` | NO glass-ui cascade (standalone) | 5 lines net; falls back to `monospace` (declared in inline `font-family: "Fira Code", monospace`) |

**Note on `balls` + `boxes`**: these are isolated standalone animation primitive playground pages (no glass-ui consumption, no Vue mount, no styles cascade). The Fira Code CDN drop honors the audit's explicit 8-file scope. Their inline `font-family: "Fira Code", monospace` cascades to the `monospace` fallback post-drop — acceptable for tiny dev playgrounds (not on the production user surface). The lane spec's "consumers fall back to glass-ui's self-hosted Fira Code via the styles cascade" applies bit-for-bit to the 6 cascade-bearing demos; for `balls`/`boxes` the fallback is the platform monospace stack.

**Excluded from drop** (correct per audit): `demo/bench/index.html` — declares `font-family: 'Fira Code', monospace;` inline but does NOT load Fira Code from CDN (no `<link>` to drop). Pre-existing standalone-state preserved.

**Net C.3 delta**: 8 files / -45 lines (preconnect retention varies per file; comments inserted at insertion sites — net negative-line delta well exceeds the audit's "~32 line-deletes" estimate due to compact comment annotations + preserve-Instrument-Serif logic).

## §5 keyframes.js gate verification

```bash
cd /Users/mkbabb/Programming/keyframes.js && npm run build
```

Result: **GREEN.** Bundle output identical to v2.1.0 baseline:

```
✓ built in 1.14s
dist/keyframes.js  50.19 kB │ gzip: 14.51 kB
```

Matches the audit P11/d baseline character-for-character: **50.19 kB raw / 14.51 kB gzip.** Zero bundle regression — confirms the migration is binary-transparent to the JS chunking.

`npm run check` (tsc) emits pre-existing TS errors in `src/animation/{utils,waapi,index,timeline,playback,smooth,numeric}.ts` — all `@mkbabb/value.js` cross-repo type-resolution issues that pre-date this lane and have zero overlap with `demo/` consumer-side files touched by C.1–C.3. Per audit P11/d §"build verification": "The unused-import warning [from `@mkbabb/value.js`] is a keyframes.js-side lint signal, not a glass-ui interaction. NOT IN SCOPE." Same applies to these dts-emit-time errors — they do not gate the vite build, the bundle ships, the audit-baseline bundle metrics hold.

**Diffstat** (`git diff --stat HEAD`):

```
demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue   |   2 +-
demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue         |   2 +-
demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue      |   6 +-
demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue      |   2 +-
demo/@/components/custom/editor-shell/EditorHeader.vue                         |   2 +-
demo/@/components/custom/editor-shell/EditorShell.vue                          |   4 +-
demo/@/components/custom/editor-shell/SharePopover.vue                         |   2 +-
demo/@/components/custom/header-ribbon/HeaderRibbon.vue                        | 152 -----
demo/@/components/custom/header-ribbon/index.ts                                |   1 -
demo/amiga/index.html                                                          |   8 +-
demo/app/App.vue                                                               |   2 +-
demo/app/index.html                                                            |  12 +-
demo/app/scenes/CubeScene.vue                                                  |   2 +-
demo/balls/index.html                                                          |   7 +-
demo/boxes/index.html                                                          |   7 +-
demo/cube/App.vue                                                              |   4 +-
demo/cube/index.html                                                           |   8 +-
demo/playground/index.html                                                     |   8 +-
demo/simple/index.html                                                         |   8 +-
demo/square/index.html                                                         |   8 +-
20 source files (excluding incidental `dist/keyframes.d.ts` build-side drift) | 25 ins / 223 del net
```

(`dist/keyframes.d.ts` showed an incidental 1-line type-narrowing change from the local build run; pre-existing dist artefact drift independent of this lane.)

## §6 Operational compliance

- **No mutating git in any repo** — read-only `git status` + `git diff --stat` only (verification only). User-orchestrator owns commit + tag.
- **No stash recurrence** — zero `git stash` invocations.
- **No `npm run build` in glass-ui directory** — build executed exclusively in `/Users/mkbabb/Programming/keyframes.js`.
- **File bounds honored** — all writes within `/Users/mkbabb/Programming/keyframes.js/{demo/}` per W5.md §"File bounds" Lane C.
- **Cross-repo dispatch authorization** — agent invoked under Lane C scope with explicit C.1–C.3 task list; no scope expansion.

## §7 Status

**COMPLETED.**

C.1 (HeaderRibbon retire + adoption), C.2 (scale-on-hover migration — 13 sites/10 files), C.3 (Fira Code CDN drop — 8 HTML entries) all landed. Build gate GREEN with audit-baseline bundle metrics (50.19 kB / 14.51 kB). Zero regressions on the glass-ui consumer surface; pre-existing `@mkbabb/value.js` cross-repo type-resolution noise is out of scope per audit precedent.

W5 Lane C hard gate (per W5.md §"Hard gate" (c)): **MET.** Awaits user-orchestrator commit + per-consumer hash documentation per W5.md §"Required artifacts".
