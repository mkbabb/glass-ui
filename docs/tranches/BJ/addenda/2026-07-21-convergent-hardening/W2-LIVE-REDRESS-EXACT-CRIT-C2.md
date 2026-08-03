# MATERIAL W2 live redress — exact-diff Sol critic C2

**Seat:** independent Sol x-high exact-diff critic  
**Date:** 2026-07-22 (America/New_York)  
**Scope:** read-only inspection of the current W2-owned dirty slice only; this report is the sole write  
**Input adjudication:** `W2-DC566-ADJUDICATION-C2.md`, SHA-256
`acaa9cae8b5fbde6a9f3ed6c70ef71ff41d89f0df19a5df3f95c127a090cea29`  
**Verdict:** **BANK THE MECHANISM DIRECTION / REJECT “LANDED” / MATERIAL W2 + FREEZE RED**

## Executive ruling

The current dirty redress moves in the adjudicated direction: it restores a private 14px immersive
stage sample, threads that sample through `--glass-level`, removes the 2dppx 17px overlay writer,
adds an immersive Drawer story source, and starts reconciling public prose. Those directions are
bankable.

The slice is not a completed producer redress. Its new stage test substitutes only
`--glass-level: 1`; it never proves the actual Dialog or Drawer computed cascade at 14/4.2/0, any
accessibility mode, or either browser. Its no-DPR detector scans one source file instead of the public
CSS graph. Its “truth-up” leaves current source comments and a visible demo materially false, and its
new public wording misstates both the Dialog API seat and the quiet/resting relationship. The new
`8.0.0` migration row describes a landed cut while package and lock remain 7.0.0. Finally,
`BAND-MATERIAL` labels the uncommitted Opus slice `LANDED` and makes several claims stronger than the
available detectors.

No new standalone C0 runtime break was proven from this incomplete source snapshot. The release and
freeze remain hard RED because the current C1 contract, gate, package, receiver, and browser defects
could all green-light bytes that do not satisfy the adjudication.

## 1. Exact dirty snapshot

Snapshot captured at `2026-07-22T07:22:47Z`, rechecked without movement at
`2026-07-22T07:28:03Z`:

```text
HEAD  c0a8981486e37d60fad9fd74b441ad4b2d39e417
W2 diff SHA-256  a92a79f88a12c9b5430ec98a60fd03f3b204113ece9c087e63970638fa823f82
sorted whole-worktree porcelain SHA-256
      783a40fe048c6e1e4196bc99abcbc4afb2a33ba80c647bc63d6d881a3a3da3af
```

The W2 slice is 11 files, `298 insertions / 114 deletions`:

| file | numstat | current file SHA-256 |
|---|---:|---|
| `MIGRATION.md` | `34/0` | `e1dfc736e79f74d7bea3b563f378afbd4f40215e1855a990f2dbbc03d4069150` |
| `README.md` | `3/2` | `861cbd68f2bc4d18fa6d9eedd8d8f87f90e18d9812f9fe42dfef4cf50fddc285` |
| `demo/stories/containers/drawer.vue` | `39/0` | `fa466403aa66f84d8149ab91792449c37b2f430d0a9040c715395ddd536efea0` |
| `docs/canon/consumer-wiring.md` | `3/2` | `22ea182f15eab70298446bda0960d0ca77027aaf17a0dda39b058a3cc195532f` |
| `docs/canon/glass-system.md` | `7/4` | `6ff04e82ddeb2b2e732fa3a5686a4b7e994422934ac135ac2c8bd7d241c7f2cc` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `39/0` | `21d0e912779fa48b2ea695d75fbc92faeede9491f34e19e1d7676d903cb78581` |
| `src/components/drawer/styles.css` | `28/11` | `4d85304fb7d83166a9dfe550cc554e99985a0e81f7d01344a9a8a5b4f18cf617` |
| `src/styles/tokens/glass.css` | `84/70` | `9fe7c415da2d3ff93376a8f224fedbf227d22bb4d117bf63fb2f02fa0943928a` |
| `src/styles/tokens/light-dark.css` | `10/16` | `9b143f9d40eace6da26d092d361f65a00812716e86fd51cd630b6c6772e37619` |
| `tests-visual/glass-depth.spec.ts` | `7/6` | `4e1908c40d90f236c21194b26e9d8014a276f66756b282724ba7991be9dc0bba` |
| `tests/styles/glass-subtlety.test.ts` | `44/3` | `fc1e5cdf384e2fa40181f4bf88586445781b59be33fbcee1ad33ad4104d066bd` |

`git diff --check` is clean for this slice. Fresh mechanics:

```text
npx vitest run \
  tests/styles/glass-subtlety.test.ts \
  tests/components/ui/dialog/dialog-stage-ownership.test.ts \
  tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts \
  tests/components/ui/dialog/graded-backdrop.test.ts

Test Files  4 passed (4)
Tests       27 passed (27)
```

The requested Browser surface was attempted through the Browser skill for
`http://localhost:5173/containers/drawer`; browser discovery returned no available browser. No
standalone Playwright or Computer Use substitute was used. Therefore this report awards **zero
browser, computed-pixel, story-reach, Safari, or accessibility-mode acceptance**.

## 2. Ranked findings

### C1-1 — the 14/4.2/0 stage contract is asserted in prose, but the detector computes only 14

`tests/styles/glass-subtlety.test.ts:5-8,23-32` states its limitation and hard-wires every
`--glass-level` read to `1`. The new test at `:112-117` says “14px at level 1, 4.2px at level 0.3,
0px at level 0,” but calls the level-1-only helper once and matches only
`blur(calc(14px * 1))`. It never evaluates `.3` or `0`.

The component tests do not close that gap:

- `dialog-stage-ownership.test.ts` proves the `data-stage-immersive` marker toggles under PRM, not
  the computed `backdrop-filter` or the accessibility clarity levels;
- `Drawer.motion-lifecycle.test.ts` proves wrapper scale lifecycle and reduced-motion snap behavior,
  but does not assert the Drawer scrim marker under PRM or any computed filter; and
- no visual test contains `drawer-immersive`, `Open immersive drawer`, or `Immersive session`.

This is a real false-green class. Changing `a11y-fallback.css` from `.3` to `.6`, changing either
level-0 writer, or adding a later imported rule that wins the scrim cascade can leave all new W2
assertions green. Source substitution also cannot show whether the arbitrary wash utility or the
new unlayered selector wins in the built artifact, whether the prefixed Safari declaration exists,
or whether the browser serializes the calc to the intended filter.

**Bounded cure:** retain the source relationship test, but add installed-package fixtures that mount
the real `Dialog > DialogContent stage="immersive"` and the real `Drawer stage="immersive"`. In
Chromium and Safari, read `backdropFilter || webkitBackdropFilter` at explicit levels `1`, `.3`, and
`0`; exercise the real accessibility brackets where the engine can activate them; prove PRM removes
the immersive marker rather than merely computing zero; prove reduced transparency and forced colors
flatten the active marker; and retain composited pixels over a structured substrate. Mutations must
remove `--glass-level`, change 14, alter each bracket value, restore deep-radius use, add a later
cascade winner, or keep immersive under PRM and independently RED.

### C1-2 — the current canon truth-up is incomplete, and the unqualified deep continuum contradicts the dark arm

The redress changes `tokens/glass.css`, two canon pages, and one visual baseline, then
`BAND-MATERIAL:488-490` calls the docs true. Current, consumer-facing and source-of-record surfaces
still disagree:

| seat | current statement | current mechanism |
|---|---|---|
| `src/styles/tokens/glass-deep.css:52-55` | calm floating floor `11px / 1.18` | light calm floating is `11px / 1.6` |
| `src/styles/tokens/property-regs.css:260-267` | deep endpoint saturation `1.5` | light endpoint token is `1.8` |
| `src/styles/glass/deep.css:3-6` | shipped deep is `16px / 1.5` | light endpoint is `16px / 1.8` |
| `src/styles/tokens/dark-arm-glass.css:7-25` | light sits at `1.05`; dark values are machine-locked by `proof:glass-legibility` | light values are provisional `1.4/1.6`; the named proof does not judge filter saturation |
| `src/styles/tokens/dark-arm-glass.css:41-54` | dark deep is in lockstep with a light `1.5` continuum | dark overrides the whole deep composite with fixed `saturate(1.55) brightness(1.16)` and does not consume `--glass-saturate-deep-active` |
| `demo/stories/substrates/glass-material.vue:419-430` | visible labels `16px/1.5` and `13px/1.18` | the shown floating deep grade resolves about `14.5px/1.74` in light; calm is `11px/1.6`; dark uses another saturation recipe |
| `README.md:57-60` and `docs/canon/consumer-wiring.md:17-20` | quiet/resting 7px is “the unified base material” | the adjudication rules it a shared **radius leg**, with different composed roles |

The new ontology says deep is an `11→16px, 1.6→1.8` continuum without a mode qualifier. That is true
for the light recipe only. In dark, radius still grades but saturation is fixed at 1.55 with a 1.16
brightness companion. This pass must not silently retune the dark arm—the adjudication forbids a blind
paint change—but it also cannot publish one unqualified continuum that the dark implementation does
not have.

**Bounded cure:** true every current source comment and visible story; replace “unified base material”
with “shared 7px radius leg”; document the light and dark deep recipes separately; and route the
fixed-dark-vs-graded-dark choice to the retained structured-substrate Sol paint ruling. Prefer live
computed labels in the Glass Material story over another hard-coded number. Historical migration
sections may keep their historical values when clearly dated.

### C1-3 — the no-DPR mutation detector watches one file, not the public CSS graph

`tests/styles/glass-subtlety.test.ts:84-91` strips comments and searches only
`src/styles/tokens/light-dark.css`. It then source-resolves the base token from
`src/styles/tokens/glass.css`. The public `./styles` entry imports the wider token, glass, component,
and built SFC closure through `src/styles/index.css`; a later writer can arise in any reachable CSS
seat or emitted component payload.

An exact mutation that moves the retired rule unchanged from `light-dark.css` to
`src/styles/glass/ladder.css` (or another later public import) passes this detector: the scanned file
contains neither string, and the helper never reads the moved file. Equivalent
`-webkit-min-device-pixel-ratio` or range-syntax resolution conditions are also outside its predicate.
Thus `BAND-MATERIAL:476-480` overclaims that a restored branch REDs.

**Bounded cure:** build the public CSS artifacts, traverse both exported style entries, and use a CSS
AST to reject any conditional writer of `--glass-blur-overlay-radius` whose condition depends on
resolution/device-pixel ratio. Pair it with installed-artifact Chromium and Safari readback at DPR 1
and 2 proving 11px. Required mutations: restore the original block, move it to another imported
partial, use `-webkit-min-device-pixel-ratio`, use range syntax, and inject it into the built component
payload.

### C1-4 — the migration row names the wrong Dialog API seat and claims a version that does not exist

`MIGRATION.md:19-31` says `stage="immersive"` is accepted “on `Dialog`/`Drawer`” and concludes that
“Only `Dialog` and `Drawer` accept” it. `src/components/dialog/Dialog.vue:6-11` has no `stage` prop;
`src/components/dialog/DialogContent.vue:38-49` owns the Dialog-family stage axis. Drawer alone owns
the axis on its root (`Drawer.vue:55-61`). Following the migration prose literally gives a consumer a
non-contract prop at the wrong seat.

The same file says each version section records changes “that landed in that cut” (`MIGRATION.md:3-5`)
and now opens with `## 8.0.0`. Yet `package.json` and `package-lock.json` are clean at 7.0.0:

```text
package.json       7.0.0  SHA-256 39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb
package-lock.json  7.0.0  SHA-256 e6216e2188ea7d08fff572745be168dbf368df3d30baa10c2caa837bc817581f
```

There is no unique installed 8.0 package or Atlas integrity repin in this slice. The migration text is
therefore future-candidate prose presented as release fact.

**Bounded cure:** write the API exactly as
`<Dialog><DialogContent stage="immersive">…</DialogContent></Dialog>` versus
`<Drawer stage="immersive">…</Drawer>`. Do not publish a completed `8.0.0` row before the atomic
version/lock/build/pack/install/Atlas cut; either co-land it with that cut or label it explicitly as an
unreleased candidate in a document whose own contract permits that state.

### C1-5 — the Drawer story is a useful fixture skeleton, not demonstrated receiver truth

The new `/containers/drawer` source has the right basic semantic ingredients: a named trigger, a
`DrawerTitle`, a `DrawerDescription`, an explicit Dismiss action, and a stable content test id. That is
bankable. No test imports or visits that story, and the exact identifiers appear only in the story
source. The synthetic Drawer lifecycle tests do not prove that a user can scroll to the fourth story
section, activate the trigger, reach every action, receive a correctly named/described dialog, dismiss
by keyboard and pointer, or return focus on the real route.

This matters to the material proof as well: a source-mounted story does not show a 14px contextual
sample, recognizable substrate, hard-seam absence, or PRM parity. With Browser unavailable in this
seat, none of those observations occurred.

**Bounded cure:** test the real `/containers/drawer` route at 390 and 1440 in light/dark and normal/PRM,
Chromium and Safari. Scroll to the actual “Open immersive drawer” trigger, activate by pointer and
keyboard, assert role/name/description/focus trap/Escape/Dismiss/focus return, read the scrim filter,
and retain rest/onset/mid/settle frames over a structured backdrop. A mutation deleting the story or
breaking its trigger/title/description/focus return must RED.

### C1-6 — `BAND-MATERIAL` turns an in-flight Opus draft into formation fact

`BAND-MATERIAL:458-464` calls this uncommitted diff `LANDED` and says it “lands the producer-side arm.”
The same section then overstates its detectors and contradicts itself:

- `:473-474` reports 14/4.2/0 as if computed, although the test substitutes level 1 only;
- `:478-480` says a restored DPR branch REDs, although the detector is file-local;
- `:485-487` calls Dialog the sole production-demonstrated receiver while simultaneously claiming a
  real Drawer story demonstration; and
- `:488-493` calls the docs/package surface true while package identity is 7.0.0 and current canon/demo
  contradictions remain.

The heading truthfully records `opus` / `claude-opus-4-8`; that makes the bytes bankable as source
work, not Luna- or Sol-model-law acceptance. No source builder may self-promote them past the required
fresh Sol critics and exact package/browser proof.

**Bounded cure:** retitle the section `IN FLIGHT — SOURCE DRAFT / ACCEPTANCE RED`, pin this exact diff
digest, replace each completion claim with its proven scope, and append a committed receipt only after
the source cut exists. Keep package, material-paint, receiver, dual-engine, and unified
`R-COMPOSITED-SIGNAL` remainder explicitly RED.

## 3. Banked directions

The following can be carried into the bounded redress without reopening their design decision:

1. **Stage mechanism shape:** a private 14px immersive scrim role, multiplied by the existing
   `--glass-level`, independent of `--stage-t`, blur-only, mutually exclusive with graded backdrop.
2. **DPR ruling:** delete the 17px device-density writer; the ordinary overlay role remains 11px at
   DPR 1 and 2. The detector must still be widened.
3. **Ontology:** five calm semantic roles over three magnitudes; deep separate; stage effect separate;
   equal radius does not imply one material.
4. **Saturation posture:** do not blindly change 1.4/1.6 or the dark recipe in this mechanical cut;
   retain the structured-substrate Sol paint ruling and correct claims in the meantime.
5. **Receiver skeleton:** keep the new immersive Drawer story, but treat it as a fixture awaiting
   reach, semantics, computed-material, and dual-engine proof.
6. **Partial truth-ups:** keep the 7px primitive examples and the updated light calm/deep visual-test
   constants after correcting the remaining prose and demo.
7. **Atomic release:** no mutable 7.0.0 credit. W2 remains atomic with the truthful ordered
   composited-signal arm, one unique installed 8.0 artifact, exact Atlas lock/integrity, and fresh Sol
   critics.

## 4. Required close before another completion claim

1. Repair the current source/canon/demo truth table, including dark-mode qualification and the exact
   `DialogContent` API seat.
2. Replace the one-file DPR search with a public-graph and installed-artifact detector plus moved-rule
   mutations.
3. Add actual Dialog and Drawer computed 14/4.2/0 and PRM/accessibility-mode proofs; source
   substitution remains a supporting unit test only.
4. Exercise the real Drawer story’s reach and semantics at 390/1440 across Chromium/Safari and
   normal/PRM.
5. Retain the saturation A/B/falsifier paint matrix and unified `R-COMPOSITED-SIGNAL` arm as RED until
   exact evidence exists.
6. Commit and pin the bounded source cut; then build, pack, install, and repin one immutable 8.0
   artifact. Only after that may two fresh Sol exact-byte critics evaluate completion.

## Terminal verdict

**Reject the current dirty W2 slice as a landed producer redress, an honest complete canon, a born-RED
DPR gate, computed accessibility proof, demonstrated Drawer receiver, 8.0 release input, Atlas repin,
or Candidate-2 freeze input.** Bank the private 14px×level mechanism direction, 2dppx deletion,
ontology direction, and Drawer story skeleton. The next source iteration is bounded and does not need
a new material concept; it needs exact public truth, full-graph gates, real receiver/browser proof,
and the already-required immutable atomic release.
