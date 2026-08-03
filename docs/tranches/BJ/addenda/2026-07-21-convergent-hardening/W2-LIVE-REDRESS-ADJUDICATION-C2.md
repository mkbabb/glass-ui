# MATERIAL W2 live redress — third-pass Sol adjudication C2

**Seat:** independent third-pass Sol x-high live-redress adjudicator
**Date:** 2026-07-22 (America/New_York)
**Scope:** formation only; this report is the sole write; no product, source, test,
package, evidence, gate, consumer, or prior-report byte was edited
**Primary producer target:** `20e064f1a376407250909d47bd343b1a12955d29` / tree
`725978be503de7ce45a5b603c9c94b09104a8c3b` / exact patch SHA-256
`a92a79f88a12c9b5430ec98a60fd03f3b204113ece9c087e63970638fa823f82`
**Companion comment target:** `a0b8eb341823a8527ed5b5c54e166f3da87dd291` / tree
`84098550dcd883c7ee2975e14411045e4bfa4af4`
**Binding verdict:** **BANK MECHANISM / FORWARD REDRESS REQUIRED / MATERIAL W2,
MODEL LAW, PACKAGE, ATLAS, AND CANDIDATE-2 FREEZE RED**

## Executive ruling

The exact-diff critic is sustained on all six material findings. The later history movement changes
one predicate, not the result: the eleven producer paths are no longer dirty. Their exact dirty patch
was committed without byte change as `20e064f1`, followed by receipt-only commit `da7415b5`. Therefore
the phrase “uncommitted Opus draft” is now historical, while “committed Opus producer partial with
acceptance RED” is current.

`a0b8eb34` and `20e064f1` are two different cuts. The former changes only four comments in two token
files; it cannot receive credit for the eleven-path mechanism/canon/test body. The latter is exactly
that body: its patch SHA and all eleven file hashes equal the critic's previously dirty snapshot.
Preserve both commits and the two receipt commits; do not rewrite or squash history.

The source mechanism direction remains bankable: private `14px × --glass-level` immersive blur,
no `--stage-t` radius ramp, blur-only stage effect, graded exclusion, removal of the 17px 2dppx writer,
real DialogContent/Drawer receiver wiring, and a useful Drawer story skeleton. The current 27 passing
unit tests do not compute `14/4.2/0` in a browser, the DPR detector sees one file instead of the public
CSS graph, current canon/demo prose remains false and unqualified in light versus dark, migration
guidance names the wrong Dialog API seat and presents unreleased 8.0 as a completed cut, the real
Drawer route has no reach/semantics/paint proof, and `BAND-MATERIAL` still overstates its evidence.

No new standalone runtime break is established by this formation pass. W2 is nevertheless hard RED:
a completion claim can still green over wrong cascade bytes, a moved DPR writer, false public API,
an unreachable or semantically broken receiver, mutable 7.0.0 package bytes, or the incomplete ordered
composited signal.

## 1. Exact inputs, bytes, and movement fence

### 1.1 Formation inputs

The selected input files were read completely. The steer changed while this audit was active; both
forms were read. The initial steer was SHA-256
`36a4979d7749b303651d59aabc89c709d03308b0041bc323ae6b4f8fd2ef8a78` / 4,645 bytes and
described the eleven paths as dirty. Its current corrected form is the byte pinned below and records
the later `20e064f1`/`da7415b5` commits.

| input | bytes | SHA-256 |
|---|---:|---|
| `W2-DC566-ADJUDICATION-C2.md` | 28,669 | `acaa9cae8b5fbde6a9f3ed6c70ef71ff41d89f0df19a5df3f95c127a090cea29` |
| `W2-LIVE-REDRESS-EXACT-CRIT-C2.md` | 17,322 | `e62cb843d8a8acacb824731e9583c660b6fad5d87e79c367ffc9232ad653f9f8` |
| `SOL-TO-CLAUDE-LIVE-STEER-7.md` (current) | 4,844 | `65016415508e2a3796e7b48733af28644b8da0315a20ea01835f2ba1e70dd919` |
| `CLAUDE-SOL-IMPL-RECEIPTS.md` | 16,383 | `b313baae5c18fd4fadc36610cc3c50890c8dfed00ee71eeeecbe5062a4a1e53d` |

The newline-delimited `SHA-256 bytes path` manifest for those four current inputs hashes to
`964903c03916681eea6c320cbdc01bd2be84defc9457a0a8039c845a7f1012f4`.

### 1.2 Split-commit truth

```text
a0b8eb341823a8527ed5b5c54e166f3da87dd291
tree   84098550dcd883c7ee2975e14411045e4bfa4af4
parent c0a8981486e37d60fad9fd74b441ad4b2d39e417
patch SHA-256 48a99d8076e1c697d33382fdd59be4dab555340f9c62c63aaeea2dd15af463cc
3/4 src/styles/tokens/dark-arm-glass.css
1/1 src/styles/tokens/glass-deep.css

e3806c221d03653efbe9bb22b7312170606b2369
tree   ba9680bbb490c1b0336042c48444e8f1914af80e
parent a0b8eb341823a8527ed5b5c54e166f3da87dd291
receipt only; patch SHA-256
7d72a19864695b92da152cfaf9e04d5ed535b7e2b86d468146f5920b5563d281

20e064f1a376407250909d47bd343b1a12955d29
tree   725978be503de7ce45a5b603c9c94b09104a8c3b
parent e3806c221d03653efbe9bb22b7312170606b2369
11 files; 298 insertions / 114 deletions
patch SHA-256 a92a79f88a12c9b5430ec98a60fd03f3b204113ece9c087e63970638fa823f82

da7415b58cb3591d75092bbcf1e2d20d53deab12
tree   0bfa7a3deac15bb7a8ea2cb5fddd5302341efb1b
parent 20e064f1a376407250909d47bd343b1a12955d29
receipt only; patch SHA-256
03aab38f06deb002a60ffb74d8777a40183c8bc52b3736a2d6e361512b9b2388
```

The first explicit checkout pin during this pass was `20e064f1` / tree `725978be…`. The checkout then
advanced to `da7415b5` / tree `0bfa7a3d…`; `git diff 20e064f1..da7415b5` changes only
`docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md`. A path-scoped diff confirms all eleven W2
producer files are byte-identical across that movement. The W2 finding target is therefore stable at
the `20e064f1` patch even though HEAD moved for its receipt.

### 1.3 Exact eleven-path body

| file | numstat | bytes | SHA-256 |
|---|---:|---:|---|
| `MIGRATION.md` | `34/0` | 202,174 | `e1dfc736e79f74d7bea3b563f378afbd4f40215e1855a990f2dbbc03d4069150` |
| `README.md` | `3/2` | 11,701 | `861cbd68f2bc4d18fa6d9eedd8d8f87f90e18d9812f9fe42dfef4cf50fddc285` |
| `demo/stories/containers/drawer.vue` | `39/0` | 16,905 | `fa466403aa66f84d8149ab91792449c37b2f430d0a9040c715395ddd536efea0` |
| `docs/canon/consumer-wiring.md` | `3/2` | 4,381 | `22ea182f15eab70298446bda0960d0ca77027aaf17a0dda39b058a3cc195532f` |
| `docs/canon/glass-system.md` | `7/4` | 5,893 | `6ff04e82ddeb2b2e732fa3a5686a4b7e994422934ac135ac2c8bd7d241c7f2cc` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `39/0` | 104,239 | `21d0e912779fa48b2ea695d75fbc92faeede9491f34e19e1d7676d903cb78581` |
| `src/components/drawer/styles.css` | `28/11` | 19,401 | `4d85304fb7d83166a9dfe550cc554e99985a0e81f7d01344a9a8a5b4f18cf617` |
| `src/styles/tokens/glass.css` | `84/70` | 37,950 | `9fe7c415da2d3ff93376a8f224fedbf227d22bb4d117bf63fb2f02fa0943928a` |
| `src/styles/tokens/light-dark.css` | `10/16` | 13,664 | `9b143f9d40eace6da26d092d361f65a00812716e86fd51cd630b6c6772e37619` |
| `tests-visual/glass-depth.spec.ts` | `7/6` | 10,248 | `4e1908c40d90f236c21194b26e9d8014a276f66756b282724ba7991be9dc0bba` |
| `tests/styles/glass-subtlety.test.ts` | `44/3` | 6,737 | `fc1e5cdf384e2fa40181f4bf88586445781b59be33fbcee1ad33ad4104d066bd` |

Their ordered byte manifest hashes to
`993e1a5befde900af76213ecb6231b17bf397a653da35d623da0686f8abe39b1`. These values exactly match the
critic's dirty snapshot. This proves commit transport, not critic satisfaction.

### 1.4 Exact public source/package seams

The public CSS source closure was derived from the CSS exports and relative `@import` graph, not from
the tested file name. `package.json` exports `./styles → ./dist/styles/index.css`, the separate
`./styles/fonts` and `./styles/theme` entries, and `./styles.css → ./dist/glass-ui.css`. The three
source-backed CSS roots reach 111 CSS files; the ordered per-file SHA manifest hashes to
`2124ec794182a782d7e78a01f2fd22b907a1467371df3c5cf2fa3e8d3774e162`. After comments are stripped,
the closure currently has one radius declaration (`11px`) and no resolution-conditioned live writer.
That is current-state evidence only; the committed detector does not traverse this closure or the
build-only SFC-emitted `glass-ui.css` payload.

| seam | bytes | SHA-256 |
|---|---:|---|
| `src/styles/index.css` | 17,835 | `03b1befc29f0454152315ad85f83d04e7d64e24f5f4baeffce418be4fd1fe3e1` |
| `src/components/dialog/Dialog.vue` | 1,421 | `1022657f587dba4f31e8eb7ef0f7ddc905ed13de34b3a9e43e6e368db1e72d74` |
| `src/components/dialog/DialogContent.vue` | 23,811 | `4143222d5e9d769326657bd779c431545e812f79472476dda68b24f2c0099dac` |
| `src/components/drawer/Drawer.vue` | 8,262 | `4ee23f149801e1a1be0a7f6b035d18c557d94e67d9c2e24cdc5649c0a15f3c24` |
| `src/components/drawer/DrawerOverlay.vue` | 2,343 | `6acc97ffafcaa4388cf90ff1d569d4c209ad6699cd3adac51c8b2fec8565b669` |
| `src/components/drawer/composables/useDrawerSnap.ts` | 21,540 | `92c90048f900466c44541037529eed53ab9ed14e6a417a20e1a48391766b255b` |
| `src/styles/tokens/property-regs.css` | 19,340 | `9928e0eb6c7a9115c9c02a70279194970bc3f5832c3c39f3a979422c9687fcba` |
| `src/styles/glass/deep.css` | 6,921 | `5c0836f601a4663644c4fba6335d8686735e63acbdd4d5019526ec21b60a14f3` |
| `demo/stories/substrates/glass-material.vue` | 23,510 | `0aca6709b6733c701c015b10636411bf9163208016737ee3e36914e35ea52567` |
| `package.json` | 17,646 | `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` |
| `package-lock.json` | 135,703 | `e6216e2188ea7d08fff572745be168dbf368df3d30baa10c2caa837bc817581f` |

The ignored current build directory was inspected only as a non-immutable convenience surface:
`dist/glass-ui.css` is SHA-256 `908167f264f0eee4f6552b8ce5fd062d3c0473da81a12d6b3a1c4707e52885e9` and
`dist/styles/index.css` is SHA-256
`c64e1d3e0c62066664d5e1bc2a13cc27c1be44736393d3c40a8fef5359a902b9`. It contains the private
14px declaration and emitted `-webkit-backdrop-filter` pair, but it is ignored, unpacked, uninstalled,
and still belongs to package identity 7.0.0. It earns no release or installed-cascade credit.

## 2. Six exact critic findings — adjudicated

### 2.1 `14/4.2/0` computed proof — SUSTAINED

`tests/styles/glass-subtlety.test.ts` says happy-dom has no CSS cascade engine. Its `flatten` helper
unconditionally replaces every `var(--glass-level)` with `1`. The stage case then asserts only
`blur(calc(14px * 1))`; the `4.2px` and `0px` values exist only in its test name/comment. It neither
mounts DialogContent nor Drawer, applies the terminal accessibility cascade, checks a later winner,
nor reads `backdropFilter || webkitBackdropFilter` from an engine.

The receiver unit tests establish useful but narrower facts. Dialog toggles the immersive scrim marker
off under PRM. Drawer's PRM case checks the wrapper's scale marker and endpoint scalar but does not check
the scrim's immersive marker. Neither suite computes filter paint. The fresh mechanics run was green:

```text
Test Files  4 passed (4)
Tests       27 passed (27)
```

That result banks source/component mechanics only. A later cascade winner, a changed 0.3/0 bracket, a
missing WebKit pair, or a Drawer scrim that retained immersive under PRM could still escape.

**Disposition:** keep and parameterize the source relationship assertion so it honestly proves source
arithmetic at 1/.3/0, add the missing Drawer marker unit assertion, and call neither computed proof.
Actual mounted computed and pixel proof remains in the routed browser arm.

### 2.2 Canon, demo, and dark qualification — SUSTAINED

`a0b8eb34` correctly removes four stale comments: light 1.05, light-deep 1.5, calm 1.18, and the false
`proof:glass-legibility` lock. It does not true the rest of the public/current graph:

| current seat | false or incomplete claim | actual current mechanism |
|---|---|---|
| `src/styles/tokens/property-regs.css:260-274` | deep endpoint `saturate 1.5` | light endpoint is 1.8 |
| `src/styles/glass/deep.css:3-6` | shipped endpoint `16px / 1.5` | light endpoint is `16px / 1.8` |
| `src/styles/tokens/dark-arm-glass.css:41-54` | dark deep is “in LOCKSTEP” with the light saturation LERP | radius is shared; dark replaces saturation with fixed `1.55` plus brightness `1.16` |
| `demo/stories/substrates/glass-material.vue:419-430` | visible `16px/1.5` and `13px/1.18` | this floating deep sample is light ~`14.5px/1.74`; calm light is `11px/1.6`; dark uses `14.5px/1.55 brightness(1.16)` and calm `11px/1.28 brightness(1.10)` |
| `README.md:57-60`, `consumer-wiring.md:17-20` | quiet/resting are “the unified base material” | they share a 7px radius leg but have different composed roles |
| `docs/canon/glass-system.md:34-42`, `MIGRATION.md:32-39` | unqualified `1.6→1.8` deep continuum | true for light saturation; dark saturation is fixed 1.55 with brightness 1.16 while radius still grades |

The current value direction is not reopened. A dark repaint without structured paint would violate the
prior ruling. The lawful cure is qualification and truth: describe light and dark composition
separately, remove “in lockstep,” call 7px a shared radius leg, and make the visible demo report the
actual mode/tier values (prefer computed labels; exact mode-qualified static labels are the bounded
fallback). Historical values remain when explicitly historical.

### 2.3 Full public-CSS-graph DPR detector — SUSTAINED

The committed detector strips comments from only `src/styles/tokens/light-dark.css`, rejects two strings
there, then resolves the base token from `src/styles/tokens/glass.css`. The public source closure is 111
CSS files and the published style draw also contains the SFC-emitted `dist/glass-ui.css`. Moving the old
writer verbatim into `src/styles/glass/ladder.css`, another imported partial, or an emitted SFC style
leaves the current test green. So do equivalent `-webkit-min-device-pixel-ratio` and range-syntax
conditions outside its predicate.

The graph currently contains no live resolution writer. That is bankable current-state fact, not a
born-RED invariant. The ordinary gate must derive both public CSS exports from `package.json`, traverse
the built `./styles` closure including the SFC payload, parse CSS at-rules, and reject any declaration of
`--glass-blur-overlay-radius` beneath a resolution/device-pixel-ratio condition. A source-closure check
may support it, but cannot replace the built public draw.

### 2.4 Exact API seat and unreleased 8.0 prose — SUSTAINED

`DialogProps` contains `open`, `defaultOpen`, `modal`, and `unmountOnHide`; it has no `stage`.
`DialogContentProps.stage` owns the Dialog-family axis. Drawer owns `stage` on its root. The exact public
guidance is:

```vue
<Dialog>
    <DialogContent stage="immersive">…</DialogContent>
</Dialog>

<Drawer stage="immersive">…</Drawer>
```

`MIGRATION.md` instead says the prop is on `Dialog`/`Drawer` and that only `Dialog` and `Drawer` accept
it. `CommandDialog` is correctly excluded, but that does not cure the wrong Dialog seat.

The file's own header says every version section records changes that landed in that cut, yet it opens
with `## 8.0.0` while package and lock root are both 7.0.0. There is no unique installed 8.0 tarball or
Atlas integrity repin. The smallest truthful pre-release form is `## Unreleased (target: 8.0.0)` (or a
separate candidate document), with no claim that package 8.0 exists. The versioned 8.0 heading may be
promoted only in the atomic package cut.

### 2.5 Drawer receiver reach, semantics, and paint — SUSTAINED WITH SOURCE CREDIT

The receiver mechanism is real: `Drawer.stage` resolves immersive, PRM degrades it to dim,
`useDrawerSnap` applies `data-stage-immersive` to the owned scrim, `DrawerOverlay` registers that portal
root, and the shared CSS selector consumes the private blur token. The new story also has a named
trigger, `DrawerTitle`, `DrawerDescription`, named buttons, an explicit Dismiss close, and a stable test
id. Bank those source facts.

No test imports or visits that story. The exact strings `drawer-immersive`, `Open immersive drawer`, and
`Immersive session` occur only in story source plus audit prose. Nothing proves a 390px user can reach
the fourth section, activate by pointer and keyboard, receive the right accessible dialog name and
description, remain focus-contained, dismiss with Escape and Dismiss, or return focus. Nothing captures
the structured backdrop at rest/onset/mid/settle, light/dark, normal/PRM, 390/1440, Chromium/WebKit.

Therefore “source-mounted fixture skeleton” is current truth; “production-demonstrated Drawer receiver”
is not. The WebKit project currently runs only three named specs, so a new W2 receiver spec must also be
admitted to that project's `testMatch`; merely adding a Chromium-default spec does not create a dual-
engine gate.

### 2.6 `BAND-MATERIAL` status and claims — SUSTAINED, WITH COMMIT-STATE CORRECTION

The exact critic was right that the section self-promoted uncommitted bytes at its snapshot. History
subsequently committed those exact bytes as `20e064f1`; the word `LANDED` can now mean only “source
commit exists.” It still cannot mean accepted producer close, W2 complete, package release, or freeze
input.

The current section does not pin `20e064f1` or its patch. It reports `14/4.2/0` as though the test
computed all three, claims a restored DPR branch REDs despite the one-file detector, calls Dialog sole
production-demonstrated while immediately treating the new Drawer source as demonstration, and calls
docs/package truth complete despite the contradictions and package 7.0.0.

**Required status:** `COMMITTED PRODUCER DRAFT / ACCEPTANCE RED`, pinned to `20e064f1`, tree and patch
digest, with `a0b8eb34` identified as a separate four-comment cut. Each bullet must name its proven
scope: source relationship, current no-writer state, fixture skeleton, incomplete canon, unreleased
candidate prose, and routed browser/package/signal acceptance.

## 3. Bank / reject ledger

| item | bank | reject / limitation |
|---|---|---|
| split history | `a0b8eb34` four comments; `20e064f1` exact eleven-path body; receipt commits preserved | any claim that `a0b8eb34` is the complete producer cut; any history rewrite |
| stage mechanism | private 14px radius, multiplied by `--glass-level`, off `--stage-t`, no saturation/brightness, graded exclusion | computed `14/4.2/0`, accessibility paint, prefix/cascade acceptance |
| DPR decision | old 17px writer deleted; current source graph has one 11px base writer and no live resolution writer | full-graph mutation protection or DPR 1/2 installed readback |
| ontology | five calm roles / three magnitudes; deep and stage separate | unqualified light-only deep continuum; “unified base material” |
| saturation | hold current light 1.4/1.6 and deep 1.8 as provisional; do not blindly repaint dark | identity/T42 credit or completion before structured paint |
| receivers | DialogContent and Drawer wiring; Command excluded; Drawer story skeleton | production-demonstrated Drawer reach, semantics, focus, material, or dual-engine paint |
| docs | some 7/11/1.8 corrections and the four `a0` comments | current canon/demo/API/release truth as a whole |
| package | ignored build mechanically contains the new source and WebKit pair | immutable or installed 8.0, packed README truth, Atlas integrity |
| composited signal | `626540ad` makes one translucent field distinguish dark/light underlays in a narrow fixture | ordered alpha/gradient stack, source-intent/provider truth, real Atlas CSS/shader path |
| band status | a committed Opus source partial exists | accepted Luna producer close, Sol terminal acceptance, or freeze input |

## 4. Smallest lawful Luna x-high forward redress

Luna must not invent a new material, repaint saturation, add a Command stage API, reintroduce a DPR
fork, or release 8.0. The bounded forward correction is:

1. **Truth current prose and demo.** Change `property-regs.css` and `glass/deep.css` from 1.5 to the
   qualified light 1.6→1.8 truth; remove dark “in LOCKSTEP” from `dark-arm-glass.css`; document graded
   radius plus fixed dark saturation/brightness; change README and consumer canon to “shared 7px
   radius leg”; qualify canon/migration by mode; replace the Glass Material story's false visible
   numbers with live computed labels or exact light/dark tier labels.
2. **Fix API and release tense.** Use `DialogContent stage="immersive"` versus
   `Drawer stage="immersive"`; keep Command excluded. Rename the row to
   `Unreleased (target: 8.0.0)` until package/lock/build/install/Atlas exist.
3. **Make the local source test honest.** Parameterize its source resolver at 1/.3/0 and assert
   14/4.2/0 as source arithmetic, not computed CSS. Extend the Drawer PRM unit to assert the owned
   scrim loses and regains `data-stage-immersive`.
4. **Install a real public-graph gate.** Derive public CSS entries from `package.json`; after build,
   traverse `dist/styles/index.css` plus `dist/glass-ui.css`; parse media at-rules; reject an overlay-
   radius declaration under `resolution`, `min/max-resolution`, range resolution, or
   `-webkit-*-device-pixel-ratio`. Include pure synthetic predicate tests so the gate is not dependent
   on mutating the working tree.
5. **Truth the wave receipt.** Retitle the W2 C2 section as committed producer draft / acceptance RED,
   pin `20e064f1`/tree/patch, separate `a0b8eb34`, and replace every computed/public-graph/demo/release
   overclaim with its exact source-only scope. Keep the browser, package, Atlas, paint, and
   `R-COMPOSITED-SIGNAL` remainder RED.

The expected producer-path boundary is limited to the existing truth surfaces plus the smallest new
gate helper/test and, only if a direct CSS-parser dependency is required, its dev-dependency lock
change. In concrete terms:

```text
MIGRATION.md
README.md
demo/stories/substrates/glass-material.vue
docs/canon/consumer-wiring.md
docs/canon/glass-system.md
docs/tranches/BJ/waves/BAND-MATERIAL.md
src/components/drawer/styles.css                  # “demonstrated” → fixture truth only
src/styles/glass/deep.css
src/styles/tokens/dark-arm-glass.css
src/styles/tokens/property-regs.css
tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts
tests/styles/glass-subtlety.test.ts
tests/gates/<public-CSS-DPR-gate>.test.ts           # new
scripts/<public-CSS-DPR-verifier>.mjs              # only if the built gate uses a script
package.json + package-lock.json                   # only for a direct parser dev-dependency/hook
```

`demo/stories/containers/drawer.vue`, `src/components/drawer/Drawer.vue`,
`DrawerOverlay.vue`, `useDrawerSnap.ts`, `src/styles/tokens/glass.css`, and
`src/styles/tokens/light-dark.css` require no mechanism change unless the new gate exposes a real
defect. Do not fold browser evidence, package release, Atlas, or composited-signal source changes into
this truth/gate correction merely to enlarge the commit.

## 5. Born-RED mutation matrix

| arm | GREEN obligation | mutation that must RED | seat |
|---|---|---|---|
| stage source relation | private 14 × level at 1/.3/0; no stage-t/saturation/deep read | 14→11/16; remove level; add stage-t; restore deep token; add saturation | Luna unit/source gate |
| stage actual cascade | mounted DialogContent and Drawer read 14/4.2/0 from unprefixed or WebKit property | later rule wins; remove emitted prefix; change either a11y bracket; keep immersive under PRM | routed browser/package |
| DPR graph | every built public CSS entry has no resolution-conditioned overlay-radius writer | original 2dppx block; move to another imported partial; WebKit device-pixel syntax; range syntax; inject into SFC payload | Luna build gate |
| DPR runtime | installed overlay reads 11px at DPR 1 and 2 in both engines | any density resolves a non-11 value | routed browser/package |
| canon/demo | source comments, canon, README, migration, visible story agree and qualify light/dark | restore 1.5, 1.18, 13px, unified material, unqualified 1.6→1.8, or wrong Dialog seat | Luna truth review + browser label read |
| API | DialogContent and Drawer alone expose the stage axis; Command excluded | publish `<Dialog stage>` or a prose-only Command receiver | Luna type/source + installed declarations |
| Drawer receiver | real route is reachable, named/described, focus-contained, dismissible, returns focus, and paints contextual 14px | delete/move story beyond reach; break trigger/title/description/Escape/Dismiss/focus return; flatten substrate | routed browser |
| saturation | structured direct+nested Tabs/Slider matrix distinguishes contextual frost from lower and plastic arms | opaque/plastic falsifier or materially different saturation still greens | routed Sol paint |
| release | unique installed 8.0 tarball, packed README, source/archive/package hashes, lock and Atlas integrity agree | reuse 7.0.0; workspace/HMR resolution; mutate tarball without lock failure | package/Atlas owner |
| composited signal | ordered already-composited stack and source intent survive real CSS/shader routes | drop/reorder layer; discard alpha/gradient; fixed white; wrap explicit null; strip selector; sample transparent canvas; add opacity shim | routed signal + Atlas |
| status/model law | receipt names exact commit, model, proven scope, and RED remainder | self-promote source GREEN or relabel Opus as Luna/Sol acceptance | formation review |

## 6. Explicit staging and commit boundary

The eleven-path body is already committed as `20e064f1`; it must not be staged again, amended, squashed
into `a0b8eb34`, or credited to that comment cut. The lawful correction is a new forward Luna x-high
commit on top of `da7415b5` (or its later descendant), after re-pinning HEAD.

Before staging, inspect both index and worktree. Stage only the concrete redress paths in §4; use neither
`git add -A` nor `git commit -a`. Preserve the owner's unrelated dirty
`ASK.md`, `PLAN.md`, `EXECUTION-PROGRESS.md`, and `waves/BAND-REDUCTION.md`; preserve all untracked Sol
addenda and steer files. In particular, this adjudication is a Sol-owned formation artifact and must
not enter the Luna producer commit. If a direct parser dependency is unnecessary, leave package and
lock entirely untouched.

The producer commit may bank truth/gate correction but must say acceptance remains RED. Browser evidence
is a later pinned evidence arm. The unique version/lock/build/pack/install and Atlas integrity repin are
the final release/consumer arm after both material and composited-signal source converge. These commits
may remain reviewable separately; W2 acceptance is atomic across them.

## 7. Routed tails that remain RED

### Browser/material

- Mount the real DialogContent and real Drawer receiver from installed package bytes.
- Read `backdropFilter || webkitBackdropFilter` at explicit level 1/.3/0; exercise actual reduced
  transparency, forced colors, contrast, and PRM where the engine supports emulation, with explicit
  level fixtures covering unsupported media emulation.
- Prove the installed overlay is 11px at DPR 1 and 2.
- Visit `/containers/drawer` at 390 and 1440, light/dark, normal/PRM, Chromium and WebKit; prove trigger
  reach, pointer/keyboard activation, role/name/description, focus trap, Escape, Dismiss, focus return,
  and rest/onset/mid/settle structured-substrate paint without hard seams.
- Admit the W2 spec explicitly to the current WebKit `testMatch` allowlist.
- Retain the direct+nested SegmentedTabs/Slider saturation A/B/falsifier matrix. Current 1.4/1.6 and
  dark fixed 1.55 remain provisional until Sol rules the retained paint.

### Package/consumer

- After both W2 source arms converge, set package and lock root to one unique 8.0.0 identity.
- Build, pack, retain SHA-512 integrity, install the tarball in an isolated consumer, and prove no
  workspace alias, HMR source, or mutable file link resolves.
- Reconcile source/archive/package CSS and declaration hashes; verify the packed README and exact API.
- Repin Atlas's real lock/integrity to that tarball and capture its real receiver. No 7.0.0 derivative
  earns credit.

### Unified `R-COMPOSITED-SIGNAL`

The exact source hashes remain the prior adjudication's values:

```text
src/composables/glass/backdropLuminanceSample.ts
1ca7cf5761b00e8bb70863ddee916ac9d0f2ac6ee1a032d8c86bd1d45d4fa354
src/composables/glass/backdropSampleMath.ts
bd968a785742b03495e5574eb441bfd4dbce59777e42b3514953782f56d700ce
src/components/dock/GlassDock.vue
5c9be8abf9aaa06ddb70b3e564d6962416c56aa9af08f0ecedd7915a06121a5a
tests/composables/glass/backdropLuminanceSample.test.ts
48d37f627f7d1cf67a18c1765da25304d23d5e88a38a547ab6c105e90d180c2f
```

`626540ad` proves one uniform translucent pixel over a dark versus light opaque triple. The live resolver
still takes the first background with alpha at least .5, drops its alpha, omits ordered lower layers and
gradients, and falls back to white. `GlassDock.vue` wraps every prop form in a getter, thereby collapsing
omitted versus explicit-null versus late-null intent and stripping the public selector-string form.
The narrow test does not represent Atlas's CSS placeholder, transparent/armed shader canvas, group
opacity/cross-fade, and page stack.

The routed cure remains: ordered already-composited background reduction with alpha and gradient
contribution; honest element/getter/selector/null/omitted source intent; provider timing; transparent-
canvas fail-loud behavior; one existing luma→tint axis only; real Atlas CSS-default and shader paths;
and independent mutations for order, alpha, gradient, selector, late getter, null, canvas transparency,
package identity, and any opacity shim.

## 8. Model-law and atomic freeze verdict

The receipts and commit messages truthfully identify the implementation model as Opus
`claude-opus-4-8`. Those bytes may be banked as implementation input. They are not a Luna x-high
producer close and cannot self-award Sol x-high critic credit. This report is a fresh Sol formation
adjudication of `20e064f1`; it is not pre-approval of the required forward Luna bytes. Any source, test,
gate, docs, package, evidence, or consumer byte changed by the redress resets exact-byte acceptance and
requires the prescribed fresh independent critics.

The atomic verdict is **RED**. Blur mechanics, public truth, full-graph DPR gate, actual receiver paint,
saturation judgment, ordered composited signal, immutable 8.0 package, installed readback, Atlas lock,
and model-law acceptance have not converged on one exact candidate. No subset may become MATERIAL W2
DONE, Candidate-2 freeze input, or Atlas/package credit by being committed alone.

## Terminal ruling

**Bank `a0b8eb34` as a four-comment source truth-up and `20e064f1` as the exact committed eleven-path
mechanism draft. Reject either as a complete W2 producer close, computed 14/4.2/0 proof, full-public-
graph DPR gate, honest complete canon, demonstrated Drawer receiver, released 8.0 migration/package,
ordered composited-signal close, Luna/Sol model-law acceptance, Atlas repin, or Candidate-2 freeze
input.** Apply the bounded forward Luna truth/gate redress without repainting values, then complete the
routed browser, signal, immutable package, and Atlas arms and run fresh exact-byte critics.
