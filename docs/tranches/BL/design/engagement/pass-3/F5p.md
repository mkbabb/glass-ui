# D5 pass 3 · F5′ · the floor completed (§P2-8.2 F-1..F-9)

| field | value |
|---|---|
| seat | D5 pass 3, **F5′ FLOOR**. One patch at HEAD that completes pass 2's F5 with F-1..F-9 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| HEAD | `eb98de1b0` (H3's harness commit). `git diff v10.1.0 HEAD -- src tests` is empty, so HEAD's `src` is 10.1.0's |
| patch | `pass-3/F5p.patch`, 3313 lines, **contains F5** (it applies on its own at HEAD). `git apply --check` passes on the main checkout at `eb98de1b0` |
| cost | **55 files, +1603/−628** vs HEAD (`F5p/numstat.txt`). Over F5 alone: **17 files, +467/−65** (`F5p/numstat-over-F5.txt`). F5 was 43 files +1175/−602 |
| worktree | `.claude/worktrees/bl/D5/p3/F5p/wt` (detached at HEAD, `node_modules` symlinked; `tests-visual/node_modules` does not exist in the checkout, so nothing to link). Removed with `git worktree remove --force` before return; nothing is left under `…/F5p/` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H3's, unchanged, read from the checkout (`../harness/`, scene app sha1 `3fb393c67b89` in every build). This seat edited no harness file |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). `../../../audit/INBOUND.md` holds no ruling on Q-1..Q-5 at this seat's start (read 2026-10-16 22:45). O-87 binds; F5′ adds no lighting layer |
| records | `F5p/run-f5p.sh` (stages), `F5p/chain-webkit.sh` (the WebKit queue), `F5p/tab.mjs` (HEAD against F5′ per cell), `F5p/probe/{sortable-film,floor-probe}.mjs`, `F5p/logs/`, `F5p/json/{head,f5p,…}/`, superseded reads under `F5p/{logs,json}/superseded/` |

## 0 · In brief

1. **F5′ is complete in both engines.** Build, typecheck, `demo:dist:build` and the full vitest suite pass on HEAD+F5′ (241 files, 2340 tests, 10 expected-fail, 1 skipped). The H3 battery ran on HEAD and HEAD+F5′ in both engines (§2).
2. **E-4 has no failing cell on F5′ in either engine: Chromium 14 PASS / 4 UNMEASURED (HEAD 8 PASS / 6 FAIL), WebKit 11 PASS / 8 UNMEASURED (HEAD 6 PASS / 5 FAIL).** The sortable ghost lands on the vacancy's settled slot (largest release step 18.1 px Chromium, 23.4 px WebKit, against 62.0; HEAD 74.8 and 80.2), the tabs drag follows the finger under reduce (moved 120.0 px in both; HEAD 0.0, NOT DRIVEN), the slider carries 6.49-6.75 px (Chromium) and 12.10 px (WebKit). UNMEASURED: the Sheet in both (F-6, O-74c G-1) and the Carousel in WebKit (no touch scrolling).
3. **CK-08: three of four attributes have one writer under `engage/`** (`data-engaged`, `data-press`, `data-commit`). `data-held` has two: `useEngage.ts` and `GlassDock.vue`, which is D2's and is stated, not edited (F-4).
4. **F-7 and F-8 have a first consumer, the Switch, and cure its CK-03 `arrival·ownflush` cells** (FAIL → PASS, light and dark, both engines). A state member's door now holds the mount frame and reads the commit's tokens loudly. The rest of A's members adopt it in P-A3.
5. **F-9 lands AUTH-4** in BJ's `PRM-AUTHORIZED-SET`, hashed and armed by a vitest. It matches nothing at HEAD+F5′ (A's seat is P-A3's); the floor probe shows the authorization resolves the envelope clocks under reduce in both engines.
6. **One HEAD green is exposed as vacuous, not regressed:** the accordion's E-5 `sustain` passed at HEAD only on the sticky `:hover` that F5's FL-4 guard removes. Under F5′ it reads NOT DRIVEN (3 of 3 Chromium reads). The accordion owes a press-only property; that is A's `disclosed` recipe (CK-06; C-CP named it).

## 1 · Items

Every "before/after" below is HEAD against HEAD+F5′ on the harness's own app, one battery read per engine unless a re-read is named. Loads are the 1-minute averages printed by the witness.

### F-1 · finish F5's battery and gates in both engines

- **Hunks:** none of its own. Two left-overs of F5 that its gates would have caught: `docs/design/tunable-anim.md` names `--press-t` (F5 alone fails `tests/design/drive-tokens.test.ts` 1/1, read in this worktree before the fix: "Kind-5 rows naming a token with no registration…"), and the two prose mentions of `--glass-btn-press-t` (`tokens/property-regs-specular.css`, `docs/design/affordance-map.md`) are renamed (E-1, no alias). +3/−3.
- **Gates on HEAD+F5′** (`F5p/logs/gates.log`, 2026-10-16 23:12-23:17, load 11.4-12.8): `npm run build` exit 0; `npm run typecheck` exit 0; `npm run demo:dist:build` exit 0; `npx vitest run --maxWorkers=2` exit 0, **241 files, 2340 passed, 10 expected fail, 1 skipped**. A first gates read before `demo:dist:build` and before F-7 was narrowed (`logs/superseded/gates-r0.log`) failed `boot-graph` 3/3 (no `dist-demo`) and `easing.contract` 5/5: the arming frame was then on every door host, and EasingPicker's Buttons each requested a frame the contract counts. F-7 now arms only a state member (below), and the suite is green.
- **Battery:** §2, both engines, HEAD and HEAD+F5′.
- **Rows:** CK-23 (cost, §0 header); every row F5 carries is read here in both engines for the first time.

### F-2 · the sortable release lands within the drive bound (CK-05, CK-20)

- **Hunk** (`sortable-list/drag.ts`, +19/−7): a same-list drop flies the ghost to `localLanding(source, final)`, the source's resting box plus the shift `partLocal` sent it, instead of `sourceOrigin()`, the row's live box. The shift rides a CSS spring and on a fast drop has barely begun: HEAD's film (`probe/sortable-film.mjs`, Chromium, load ~13) reads the row's transform at 4.1 of its 82.8 px at the release, so the plate flew back to the old slot (217.9 → 104.7 px) while the row appeared at the new one (180.7 px), and the hand-off from plate to row jumped **75.6 px in one frame**. On F5′ the plate carries 23 px past the release on the gesture's velocity and lands at 181.6 px over the row at 180.7; the largest step is 18.4 px. A cross-list drop keeps the receiver's `getVacancyOrigin`; a subject that left the list keeps `sourceOrigin()`.
- **Before/after:**

| cell | HEAD Chromium | F5′ Chromium | HEAD WebKit | F5′ WebKit |
|---|---|---|---|---|
| sortable release continuity (bound 62.0 px) | FAIL fling 74.8 px (load 14.9) | **PASS** fling 18.1, still 2.3 (load 9-16) | FAIL fling 80.2 px (load 8.9) | **PASS** fling 23.4, still 3.5 (load 12.8) |
| sortable fling carries velocity (≥ 4 px) | FAIL −12.75 px (the still release flew further) | **PASS** +22.83 px | FAIL −12.94 px | **PASS** +30.69 px |
| sortable repeat landing | PASS 201.7 ×3 | PASS 201.7 ×3 | PASS 201.7 ×3 | PASS 201.7 ×3 |
| sortable release PRM | PASS (jump 36.2 px, the honest cut) | PASS (36.2 px) | PASS (36.2 px) | PASS (36.2 px) |

- **Rows moved:** CK-05 (sortable), CK-20 (the sortable teleport instance), CK-18 (the sortable consumes the release rule and now lands where the rule's flight is aimed).

### F-3 · SegmentedTabs' indicator follows the finger under reduce (CK-10)

- **Hunk** (`tabs/SegmentedTabs.vue`, `tabs/types.ts`, +8/−3): the drag arms for a `full` **request**, `(props.motion ?? "full") === "full"`, not for the PRM-resolved motion. Following the finger is the hand's, not an animation; `useDragMorph`'s own reduce arm already drops the squish and lands at once (no in-between frames). A `reduced` or `off` request is still the click-only strip. `useMotionAxis`'s two doors stated in its header (the prop door gates enrichment, the OS door is each composable's) now hold for the tabs drag too. The `motion` prop doc says so.
- **Before/after:**

| cell | HEAD Chromium | F5′ Chromium | HEAD WebKit | F5′ WebKit |
|---|---|---|---|---|
| tabsdrag release PRM | FAIL NOT DRIVEN, moved 0.0 px | **PASS** moved 120.0 px, overshoot 0.00, at rest | FAIL NOT DRIVEN 0.0 px | **PASS** moved 120.0 px, overshoot 0.00, at rest (load 13.7) |
| tabsdrag release continuity (bound ≈ 65-139 px) | FAIL 245.5 px | **PASS** 16.0 px | FAIL 244.7 px | **PASS** 18.4 px |
| tabsdrag fling carries velocity | FAIL +2.10 px | **PASS** +40.12 px | PASS +6.07 px | **PASS** +42.57 px |

The continuity and carry cells moved with F5's release rule, not with F-3; they are listed because pass 2 never read them in WebKit. Under reduce the landing is one frame (largest step 36.6 px), which is the reduce arm's honest cut and E-4's PRM cell does not grade it.
- **Rows moved:** CK-10 (the tabs half), CK-05.

### F-4 · PagerDots' `data-press` behind the door (CK-08)

- **Hunks:** new `composables/motion/engage/press.ts` (63 lines), `usePressMark(host, { organ?, disabled? })`, the one writer of `data-press`: pointer down (primary) or an activation key held marks; up, cancel, leave, key up and focus-out clear. The door's press part (`useEngage`) now marks through it (the attribute write moved out of `useEngage.ts`), and `PagerDots.vue` (+11/−10) calls it on its root with `organ` = the bed pip under the pressed dot, replacing `pressIndex` and its three template handlers. The pager gains the key press the door gives every control (Enter or Space held marks the pip).
- **`GlassDock.vue`'s `data-held` is D2's** (`../../dock/REGISTRY.md`): stated here and in the door's header, not edited. CK-08 permits an attribute the route's charter names as not its own.
- **Before/after** (E-7 static, both engines read the same source):

| cell | HEAD | F5′ |
|---|---|---|
| writers `data-press` | FAIL 1 file: `pager-dots/PagerDots.vue` | **PASS** 1 file: `engage/press.ts` |
| writers `data-engaged` | FAIL `ModalOverlay.vue`, `Slider.vue` | PASS `engage/useEngage.ts` (F5) |
| writers `data-held` | FAIL `GlassDock.vue`, `Slider.vue` | FAIL `GlassDock.vue`, `engage/useEngage.ts`: **D2's, stated** |
| modal open, nothing held | FAIL 1 `[data-engaged]` | PASS 0 (F5's veil split) |

  Runtime (`probe/floor-probe.mjs`, `F-4 pager press mark`): pointer down on dot 2 marks pip 2 only (its `::before` scale 0.975 Chromium, 0.981 WebKit), up clears it, Enter held on the tab stop marks its pip, Enter up clears: **PASS in both engines** (Chromium load 21.3, WebKit 25.3).
- **Rows moved:** CK-08 (3 of 4 attributes; the fourth is D2's by charter). Unit plant: `engage-door.test.ts` "the press mark … marks the organ the pressed target names".

### F-5 · the slider carry's margin (CK-05, CK-12): **ruling owed, not widened**

- **Hunk:** none.
- **Reads on F5′:** fling minus still on the value point **6.75 px and 6.49 px** in Chromium (two batteries, load 15.4 and 9.5) and **12.10 px** in WebKit (load 16.8), against the bound 4 px: a margin of 2.5-2.75 px in Chromium, 8.1 px in WebKit. HEAD carried 0.02-0.04 px. Pass 2 read 4.65 px only on A's composition (Chromium), where A's `engage-held` grows the root ×1.06 under the same body.
- **Why no widening:** the carry is the `dock` row's impulse response to the release rule's measured velocity, saturated at the ratified `V0 = 900 px/s` pole (`useDragVelocity`), with the edge displaced 1:1. Every lever that widens it mints or moves a figure: a seventh spring row for "the carry" (the table's "every row owns exactly ONE job" law and CK-12), a larger `V0`, or a gain on the impulse. None has a source of record outside the witness's 4 px, which is CK-12's named defect (a figure set by the sampler).
- **The ruling owed:** whether the release carry rides its own named row (a spring-table ruling, the table's owner, then CK-12 reads it) or the 4 px bound stands against `dock`'s physical carry. Until then CK-05's slider cell reads on the margin as measured; P-A3 reads it on A's composition, where the grow changes the box.

### F-6 · the Sheet: no D5 edit

No hunk. E-4's four Sheet cells are **UNMEASURED** at HEAD and F5′ in both engines (`[role="dialog"]` computes `position: relative`), until O-74c G-1 (SHEET-POSITION, PLACEMENT OWED in `INBOUND.md`) lands. F5's detent consumer of the release rule (`sheet/detents/use.ts`) is unchanged.

### F-7 · the one-frame commit arming in the door (CK-03)

- **Hunks:** `useEngage.ts` gains `commit: "state"`: a control whose committed state its class recipe plays from `data-state`. On such a host the door writes `data-engage-arming` at mount; on the first frame it flushes style (`getComputedStyle(host).transitionProperty`, so a state that arrived in the mount's task becomes the before-change style) and lifts the mark. `utilities/engage.css` (new, imported from `utilities.css`) holds every transition under an arming host off: `[data-engage-arming]`, its descendants and their `::before`/`::after`, `transition-property: none !important`, inside `@layer components`. Only the property is held, so a duration or an authorization (AUTH-4) is untouched and an animation is not a transition. A stateless door (`commit: "call"`), a hold or a press does not arm: a frame per Button broke EasingPicker's frame-counting contract in the first gates read and served no arrival.
- **First consumer: the Switch** (`switch/Switch.vue`, +10/−1), `useEngage(root, { commit: "state" })`. It paints nothing; P-A3 extends the call to A's other state members.
- **Before/after:**

| cell | HEAD Chromium | F5′ Chromium | HEAD WebKit | F5′ WebKit |
|---|---|---|---|---|
| E-2 switch arrival·ownflush light | FAIL body in flight 23 frames (thumb glides) | **PASS** 0 frames | FAIL | **PASS** |
| E-2 switch arrival·ownflush dark | FAIL 23 frames | **PASS** 0 frames | FAIL | **PASS** |
| E-2 switch arrival·late light/dark | FAIL travel 19.81 px, no overshoot (no admitted arm) | FAIL travel 19.75 px, no overshoot | FAIL | FAIL (unchanged) |

  `late` still commits by travel after the mount frame (19.75 px, the glide is not suppressed); it fails on the commit's form, which is A's and Q-5's. Probe (`F-7 … mount frame`): the Switch host reads `data-engage-arming` and `transition-property: none` in the mount's task and its own list by frame 1; the Button and Slider never arm. **PASS in both engines** (Chromium load 20.9, WebKit 26.5). Unit plants: `engage-door.test.ts` "a stateless or holding door does not arm" and "marks a state member's host … then lifts it"; `engage-floor.test.ts` "holds transition-property only…".
- **Rows moved:** CK-03 (the Switch's in-task arrival after a style read; the other members are P-A3's), CK-20 (no mount-frame glide on an adopter).

### F-8 · the door's loud read of the commit envelope and `--rung-light` (CK-21)

- **Hunk** (`useEngage.ts`, `engageClasses.ts`): the class table marks the classes whose recipe commits (`commits: true` on `pressed`, `chosen`, `disclosed`, the CK-02 members' classes). The door reads `--engage-control-engage-{attack,release}` (`CSS.supports("transition-duration", …)`) and, when the host's computed `--rung-class` is a committing class, `--rung-light` (`CSS.supports("color", …)`): a state member at its arming frame and on every `data-state` edge (a `MutationObserver` on that one attribute), a stateless one on every `commit()`. An unreadable token is said once per host and token in one `console.error` (the door's `loud()` dedupe moved from page-wide to per host, so each degraded control speaks).
- **Before/after:** no HEAD member stamps a class, so the planted cells live in the probe and the unit file:

| cell (`probe/floor-probe.mjs`) | Chromium | WebKit |
|---|---|---|
| Button commit, clean | PASS 0 errors | PASS 0 |
| Button commit, `--engage-control-engage-attack: nonsense` | PASS 1 error, on the commit edge | PASS 1 |
| Switch (`commit: "state"`), no class stamp | PASS 0 errors | PASS 0 |
| Switch stamped `--rung-class: chosen`, `--rung-light` absent at this build | PASS 1 error naming `--rung-light` | PASS 1 |

  E-11 on the harness app: `slider fail-loud --spring-dock-settle (fling)` UNMEASURED at HEAD → **PASS** on F5′ in both engines (F5's carry reads it loudly); the other three plants stay UNMEASURED (not read on that path at this build). C-A2's own counterexample (A's seat with `--engage-control-engage-{attack,release}: nonsense`, transition `all`, 0 errors) needs A's seat; P-A3 reads it on its build.
- **Rows moved:** CK-21 (the commit path's tokens are read loudly; the light seat's own plant is P-A3's).

### F-9 · CP's PRM authorization row in BJ's `PRM-AUTHORIZED-SET` (CK-10)

- **Hunks:** `utilities/engage.css`, the block between `AUTH-4 begin` and `AUTH-4 end`: under `prefers-reduced-motion: reduce`, inside `@layer components`, the commit seat (a face-less member's `::after`, else the face's `[data-engage-light]`) keeps `transition-duration: var(--engage-control-engage-release), var(--engage-control-engage-attack)` at rest and the reverse when committed (`[data-state="checked"|"open"]`, `[data-commit="b"]`), the two legs of A's seat in its order. CP's row named the trio's seats by class (`.engage-chosen [data-engage-light]`, …); this row names the seat exactly as the A2/CP seat geometry does, so a selectable Chip's `::after` is covered too. `docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md`: row **AUTH-4** (`utilities/engage.css:27-57`, digest `ea2b3f3f…`) and its amendment with the verbatim hash detector, `sed -n '/AUTH-4 begin/,/AUTH-4 end/p' src/styles/utilities/engage.css | shasum -a 256` → `ea2b3f3f7903732ca11dd759064a54d1a0de9143c1a3af0ae4abcc867625caf6`. `a11y-overrides.css`'s pointer to the set names the new member. `tests/styles/engage-floor.test.ts` arms it: one reduced-motion block, two narrow rules, no `*`, durations only and only envelope tokens, and the register row's digest equal to the block's (reds when either goes missing or drifts).
- **Before/after** (probe `F-9 AUTH-4`, a seat injected into the built page; no HEAD member renders one):

| read | Chromium | WebKit |
|---|---|---|
| reduce: rest seat / parity a | 0.18s, 0.06s | 0.18s, 0.06s |
| reduce: checked seat, disclosed open `::after`, parity b | 0.06s, 0.18s | 0.06s, 0.18s |
| reduce: an unauthorized `::after` | 0s (the fallback holds) | 0s |
| no preference: the seat with no recipe | 0s | 0s |

  CP measured the effect on its A build (rise 0.019-0.022 dark under reduce with the row, 0.0000 without; `pass-2/CP.md` §0 item 1). On HEAD+F5′ the row matches nothing until P-A3 composes the seat: a governance row in place, its paint is P-A3's.
- **Rows moved:** CK-10 (the transient kept under reduce, once A's seat exists), CK-12 (no minted clock: the envelope row).

## 2 · The battery, HEAD and HEAD+F5′, per engine

`node F5p/tab.mjs --engine <e>`. One read per witness per engine; F5′ Chromium is its second full read on the final build (the first, on a build before F-7 was narrowed, is under `superseded/` and agrees on every row named here except the Switch arrival, which it did not yet carry). Loads are each witness's own 1-minute start → end. HEAD's E-7 static arm reads the checkout's `src` (HEAD's bytes); F5′'s reads the worktree.

| witness | HEAD Chromium | F5′ Chromium | HEAD WebKit | F5′ WebKit |
|---|---|---|---|---|
| E-1 | FAIL 0 P / 4 F (no declaration; load 18.6) | FAIL 32 P / 64 F (load 9.8 → 8.9) | FAIL 0 / 4 (18.5) | FAIL 32 / 64 (11.2 → 12.3) |
| E-2 | FAIL 70 P / 94 F / 16 R (19.2 → 16.6) | FAIL **72** / 92 / 16 (8.6 → 10.4) | FAIL 70 / 94 / 16 (12.1 → 4.2) | FAIL **72** / 92 / 16 (12.1 → 17.8) |
| E-3 | FAIL 16 / 6 (16.2) | FAIL 16 / 6 (10.2 → 9.8) | FAIL 16 / 6 (4.0 → 8.0) | FAIL 16 / 6 (24.2 → 23.4) |
| E-4 | FAIL 8 / 6 / 4 U / 1 R (15.9 → 16.2) | **PASS 14 / 0 / 4 U / 1 R** (9.5 → 15.9) | FAIL 6 / 5 / 8 U (7.8 → 9.4) | **PASS 11 / 0 / 8 U** (17.3 → 10.5) |
| E-5 | FAIL 34 / 22 (15.9 → 18.0) | FAIL 31 / 25 (15.1 → 19.5) | FAIL 28 / 16 of 44 read (9.4 → 16.2) | FAIL 30 / 26 of 56 (10.3 → 6.0) |
| E-6 | FAIL 4 / 2 / 8 U (18.2) | FAIL 4 / 2 / 8 U (19.8) | FAIL 2 / 2 / 8 U / 2 R (16.6) | FAIL 2 / 2 / 8 U / 2 R (6.0) |
| E-7 | FAIL 3 / 4 (17.7) | FAIL **6 / 1** (18.6) | FAIL 3 / 4 (16.2) | FAIL **6 / 1** (6.3) |
| E-8 | PASS 19 / 0 (18.2 → 20.5) | PASS 19 / 0 (19.0 → 18.5) | FAIL 15 / 4 (15.5 → 21.8) | **PASS 19 / 0** (6.5) |
| E-9 | FAIL 50 / 28 / 2 R (19.6 → 20.4) | FAIL 50 / 28 / 2 R (19.2 → 17.6) | FAIL 40 / 26 of 66 read (15.1 → 36.7) | FAIL **50** / 28 of 78 (6.7 → 7.7) |
| E-10 | FAIL 1 / 3 / 2 R (19.9) | FAIL 1 / 3 / 2 R (17.9) | FAIL 1 / 3 / 2 R (9.6) | FAIL 1 / 3 / 2 R (7.4) |
| E-11 | UNMEASURED 4 U (20.6) | **PASS 1 / 0 / 3 U** (18.8) | UNMEASURED 4 U (11.2) | **PASS 1 / 0 / 3 U** (7.5) |

Every moved cell, with both readings, is in `F5p/tab-chromium.md` and `F5p/tab-webkit.md` (E-1's 55 adoption and 18 static-inert rows are left out there: none exists at HEAD, which has no declaration, and every adoption row stays RED until A adopts: F5's latch). What moved, and why:

- **E-1:** the declaration exists (F5). 32 cells pass; the adoption latch and 2 static-inert members (HandMark's handler, the selectable Card under `static`) fail, as in pass 2. They are A's.
- **E-2, +2 in each engine:** the Switch's `arrival·ownflush`, light and dark (F-7). Nothing else moved in E-2.
- **E-4:** F-2, F-3 and F5's release rule (above).
- **E-5:** Chromium: the accordion's `sustain` light and dark went PASS → NOT DRIVEN (§0 item 6; 3 of 3 reads, the battery and two re-reads `logs/superseded/f5p-r{1,2}-chromium-E-5.log`, load 9.5-15.1), and the toggle's dark `sustain` flips (×0.91 in 2 of 3). WebKit: HEAD lost the toggle and accordion to `ENGINE CLOSED, REPRODUCED 2/2` (PF-1, 12 cells unread); F5′ carries D4's token hunk (F5 item 1) and reads all 56. The newly read cells add 2 PASS (toggle press, both themes) and 10 FAIL (the toggle's and accordion's `sustain` NOT DRIVEN, their PRM press-light).
- **E-7:** F-4 and F5's veil split. `data-held` stays at two writers (D2's GlassDock).
- **E-8 WebKit, 15 → 19:** the four toggle and accordion cells HEAD lost to the PF-1 engine close now read. Nothing is minted.
- **E-9 WebKit:** the same toggle and accordion cells now read: 4 press-spatial PASS, 4 commit-spatial PASS, 8 FAIL (press-light: no press-only paint under reduce; commit-light: rise 0.0000, A's seat). The Button's press-spatial and commit-spatial under reduce went **FAIL → PASS** (scale range 0.030 → 0.000), so CK-10's Button squish is gone in WebKit as in Chromium (F5's door reduce arm). E-9 Chromium did not move.
- **E-11:** `--spring-dock-settle (fling)` speaks (F5's carry), both engines.

### 2.1 · The floor probe

`F5p/probe/floor-probe.mjs` on the F5′ build, one browser per engine, a context per cell (`F5p/logs/floor-probe-f5p-{chromium,webkit}.log`): **10/10 PASS in both engines** (Chromium load 18.2-21.3; WebKit 24.5-26.5, admitted after a 51 min wait on the WebKit lock). The cells are listed under F-4, F-7, F-8 and F-9 above. Earlier Chromium reads on the first build (`logs/superseded/floor-probe-f5p-chromium-r{0,1}.log`) used the Slider as the F-8 class host; the Slider no longer arms after F-7 was narrowed, so the cell moved to the Switch.

### 2.2 · The WebKit queue

Every WebKit run went through `guarded --exclusive webkit`, queued and never skipped (`F5p/chain-webkit.sh`). Waits: the floor probe 23:28 → 00:19 (51 min); HEAD E-9 about 31 min; HEAD E-10 about 40 min; F5′ E-3 02:26 → 03:51 (**85 min**, under the 90 min mark); the rest a few minutes. The 1-minute load across the queue was 4-37.

## 3 · Next-pass defect classes and notes (no CK row added)

- **The accordion's E-5 sustain was green on a leaked hover** (§0 item 6): HEAD `touch-changed [background-color]`, `hover-changed [background-color]`, the same property; F5's `(hover: hover)` guard removes the leak and the cell reads NOT DRIVEN. A counterexample to CK-06 on the accordion, owed by A's `disclosed` recipe (a press-only property).
- **E-5 toggle sustain dark flips** (×0.91 in 2 of 3 Chromium reads on F5′, ×16.21 at HEAD): §P2-7 item 14, the same class; F5′ does not touch the toggle. In WebKit, read for the first time, the toggle's `sustain` is NOT DRIVEN in both themes (the touch hold changes the same properties the sticky hover does).
- **Under reduce the tabs and sortable landings are one frame** (36.6 and 36.2 px): the reduce arm's cut; E-4's PRM cell grades rest and overshoot only. Stated for the critics, not scored.

## 4 · Fences kept

- No tracked source changed in the checkout and no git write ran there. The patch was made, built and tested only in the seat worktree; `git add -N` ran in the worktree's own index (to include new files in `git diff`), which `worktree remove` discards.
- Writes in the checkout: only `docs/tranches/BL/design/engagement/pass-3/F5p.patch`, `F5p.md` and `F5p/`.
- Sibling repositories were not touched (vitest imports `@mkbabb/keyframes.js` and `value.js` through `node_modules`, read only). No `~/.claude` read.
- Every build, test and browser run went through `guarded`; every WebKit run through `--exclusive webkit`, queued and never skipped; never `--light` for a browser run (`--light` only for targeted single-file vitest and typecheck). One heavy run at a time; headless shell; no GPU arguments; one browser per run, a context per cell, everything closed in `finally`. No zone refusal occurred. Nothing left running.

## 5 · Open

- **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox).
- **F-5:** the ruling owed (above).
- **F-6:** the Sheet cells UNMEASURED until O-74c G-1.
- **F-7, F-8, F-9 on A's members** are P-A3's to adopt and read: `commit: "state"` on Checkbox, Radio, Chip, ToggleGroupItem, accordion trigger, SegmentedTabs; the light seat that AUTH-4 authorizes and that `--rung-light` paints.
- **CK-08 `data-held`:** GlassDock.vue writes it; D2's.
