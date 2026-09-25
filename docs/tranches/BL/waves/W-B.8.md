# W-B.8 · DotRing decided: BUILD the export, with the direct-wrap leave arm (RT-28D, RT-28E) · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the #28 split (RT-28D, RT-28E); F-71 inbound UIA-F-72 and A2-FO-L1-28 |
| depends on | W-B.1 |
| dependants | W-I.1 (DockControl's loading seat, UIA-F-132), W-L.1 (Button's loading mark replaces the leading seat, UIA-F-133) |
| ruler | seat, under W-B.2's rule: two consumer rows name it |

## 1 · What it closes

| id | item |
|---|---|
| RT-28E | the export question (`census-register-a.md:40`): three internal users, in no barrel |
| RT-28D | "the compound self-arm a DIRECT-wrap consumer would need for the extent draw-home" (BK EP:6687), triggered by a consumer that does not exist until the export |
| UIA-F-72, A2-FO-L1-28 | fourier asks for DotRing twice (O-59, O-74) |

## 2 · The defect at HEAD

- **Not public.** `package.json` `exports` has no `./dot-ring` (`node -e` over `exports` exits 1); `git grep -n 'export.*DotRing' -- src/index.ts` prints nothing. `src/components/_shared/feedback/DotRing.vue:25-28` states it is internal on purpose ("an indicator nobody asked for"). Users: `InfiniteScroll.vue:3,69`, `EasingPicker.vue:30,577`, `Button.vue:34,193`.
- **A direct wrap does not draw home.** The leave arms are written for a wrapped row: `.glass-dot-ring-leave-active .glass-dot-ring` and `.glass-dot-ring-leave-to .glass-dot-ring { --dot-ring-extent: 0 }` (`dot-ring.css:144-158`), descendant selectors only; `grep -c 'glass-dot-ring\.glass-dot-ring-leave'` → 0. Probe `probes/dot-ring-direct-wrap.mjs` (Chromium, the source CSS with `property-regs.css` via `page.setContent`), both shapes in their leave-to state: row wrap `--dot-ring-extent` **0**, opacity 1 on the ring (the row fades); direct wrap `--dot-ring-extent` **1**, opacity 0. A consumer that writes `<Transition name="glass-dot-ring"><DotRing v-if="busy" /></Transition>`, the natural form once exported, gets a fade with no re-fusion (`evidence/W-B.8/direct-wrap.json`).

## 3 · The cure

1. **Export DotRing** as a component with its own subpath `./dot-ring` (the per-component door `./status-dot` uses) and from the root barrel as the other components are; W-D.1's placement rule decides its directory, out of `_shared/`. The component keeps no props and stays `aria-hidden` (its README states the host announces).
2. **The direct-wrap arm.** The leave arms gain compound selectors, `.glass-dot-ring.glass-dot-ring-leave-active` (the extent transition on the exit reader) and `.glass-dot-ring.glass-dot-ring-leave-to { --dot-ring-extent: 0 }`, beside the row arms, with the reduced-motion ties the row arms have. One register serves both wraps; this is not a second path, since each selector matches one DOM shape.
3. The header comment at `DotRing.vue:25-28` states the public contract instead of the internal one.

## 4 · Files it touches

`package.json` (exports), `src/index.ts`, the subpath entry, `src/components/_shared/feedback/{DotRing.vue,dot-ring.css,README.md}` (moved per W-D.1 if it has landed), `tests/public-surface.spec.ts` (pins), a new `tests/components/feedback/dot-ring-leave.test.ts` (engine lane), `CHANGELOG.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B8-G1 · the subpath exists | `node -e 'process.exit(require("./package.json").exports["./dot-ring"] ? 0 : 1)'` | exit 0 | **exit 1** |
| B8-G2 · the root exports it | `git grep -q 'export.*DotRing' -- src/index.ts` | exit 0 | **exit 1** |
| B8-G3 · a direct wrap draws home | `npx vitest run tests/components/feedback/dot-ring-leave.test.ts` (the probe as an engine-lane test: both shapes read `--dot-ring-extent` 0 at leave-to) | exit 0 | the probe reads direct-wrap extent **1** (RED); the file is absent |
| B8-G4 · the arm test bites | delete the compound leave-to rule, run B8-G3 | exit 1 | — |
| B8-G5 · surface pinned | `npx vitest run tests/public-surface.spec.ts` with `./dot-ring` pinned | exit 0 | the pin is absent |

## 6 · π and DELTA obligations

| surface | themes | engines | π |
|---|---|---|---|
| DotRing leaving under a direct `<Transition>` and under a row wrap, frames across the exit | light, dark | Chromium; Playwright WebKit labelled; real Safari UNMEASURED (OW-3; RT-28C's `sqrt()`/`cos()` cell is W-A.6's) | per frame, `--dot-ring-extent` and the fused union area, beside the screenshots; before (HEAD: direct wrap never fuses) and after |

## 7 · MIGRATION rows

None: the export is additive. CHANGELOG: `DotRing` and `./dot-ring` added.

## 8 · Ledger rows

#28's RT-28D (BUILD, here) and RT-28E (BUILD, here); UIA-F-72, A2-FO-L1-28 (CURE, here). RT-28C stays W-A.6's.
