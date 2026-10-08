# D2-B′ critique, pass 3: the measured scene on floor v2

| | |
|---|---|
| Seat | D2 pass 3, route D2-B′ (measured scene, one integrator), CRITIC. I did not author the route |
| Model | `claude-opus-5-5`, asserted from own system identity |
| Tree | checkout HEAD `0eb1de5d` (`src/` identical to the prototype's `aea214b9` base) + `pass-3/floor-v2.patch` (sha256 `deb90ecc…`) + `pass-3/D2-Bp-proto.patch` (sha256 `f9bf42af…`, matches the prototype's header). Both applied clean in a throwaway worktree, removed after the runs |
| Builds | `proto` = HEAD + floor v2 + route; `base` = HEAD + floor v2 (route patch reversed, built, re-applied). `harness/build.mjs`, outputs in scratch |
| Adapter | `pass-3/adapter-floor-v2.mjs`, unchanged, no shim: every Playwright WebKit cell is unshimmed |
| Engines | headless Chromium and **Playwright WebKit** (Playwright from the checkout's `node_modules`). Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| Tools | `pass-3/D2-Bp-p3-run.sh` (`full dark`, `PROTO=proto`, `REC_DIR=D2-Bp-crit-records`); `pass-3/D2-Bp-crit-run.sh` (this seat's chain); `pass-3/D2-Bp-crit-probes.mjs` (this seat's `lune` arm, R5); `pass-3/D2-Bp-p3-probes.mjs`; `pass-2/D2-G-crit-probes.mjs`; `pass-2/D2-Bp-probes.mjs` |
| Records | `pass-3/D2-Bp-crit-records/`. Every log opens and closes with `uptime`, and every cell carries its own load |
| Load | 1-minute load average 33-168 over the seat (other seats' browsers). The full light reading ran at 59-168. Every red cell seen above load 60 was re-run twice at 32-61 |

## 0 · In brief

**Verdict: ADVANCE, 19 of 24 = 79 %.**

**What I reproduced.** The prototype's central claims hold:
- A swap never blanks. Retarget is 12/12 with 0 blank and 0 overlap frames, and every swap trough is ≥ 1.0 of the lower rest.
- Leaving seats leave by the clip.
- A stall at the flip replays from rest in both engines (ST 10/10 light).
- Hit follows paint. That covers the plate's own corners, which the route's `hit` arm never sampled (this seat's `lune` arm: 0 of 40 corner points hit the dock).
- Floor v2's N-1..N-4 hold under the route.

**Five rows are open:**
- **P1** (Q-12) and **P3** (Q-4) are OWNER-BLOCKED.
- **P2** is the shared `long-run-v` keyboard cell.
- **B2.** Every posture flip and swap paints 1-3 film tiles of spliced glyphs at the wipe's hard seam, in both engines: "B ols", "A B ls B", "Ꮀ". The prototype records this as an open look question; this seat reads it as the row's failure.
- **B3.** `GlassDock.vue:61` still says DockProps has "SIX members". It has 7. The file is touched by the route.

**New red cells.** Three appeared in the loaded first reading: Playwright WebKit `swap-short` blank, `anchor-end·warm-collapse` trajectory, and W8 `form-expand` pacing. None reproduced in two reruns each (**NOT-REPRODUCED**).

## 1 · What this seat re-ran

| Run | Log (`D2-Bp-crit-records/`) | Load | Result |
|---|---|---|---|
| full, light, both engines, `--safari` | `full-light.log` | 59-168 | see §3. Safari UNMEASURED (owner's safaridriver checkbox) |
| dark: ST, W3, FM, W1 `card\|vmorph` | `ST-dark.log`, `W3-dark.log`, `FM-dark.log`, `W1-dark.log` | 45-87 | ST 5/10 with 5 UNMEASURED (Playwright WebKit video rests disagree with the DOM, an instrument fault); W3 53/58 with 5 OB, 0 fail; FM Chromium 6× "no trigger marker" (instrument); W1 14/20 with 6 OB |
| **dark W1 (all), W2, W4, W5, W6, W7**: the prototype ran none of these dark | `dark-w*.log` | 55-68 | W1 38/44 with 6 OB; W2 14/16 (`long-run-v` ×2); W4 26/26; W5 12/12; W6 8/8; W7 40/40 |
| W3 `swap-short`, `swap-long`, `anchor-end·warm-collapse`, ×2 | `rerun-W3-swap-{1,2}.log` | 32-48 | every cell PASS or OB in both engines, both runs |
| W8 ×2 | `rerun-W8-{1,2}.log` | 58-61 | 12/15, 3 UNMEASURED consumers, both runs |
| route probes `retarget,hit,trough`, 2 reps, both engines | `probes-proto.log` | 34-40 | §4 |
| the other route's critic arms `vagree,stall,seam,ghosts` | `crit-proto.log` | 36-44 | §4 |
| `lune` (new arm, R5) on proto and base | `lune-proto.log`, `lune-base.log` | 40-45 | §4 |
| `plead` cost, Chromium 1× and 4×, proto and base | `cost-proto.log`, `cost-base.log` | 40-49 | §6 |
| `vue-tsc --noEmit`; vitest on the dock suites and `drive-tokens` | worktree (scratch) | — | exit 0; 19 files, 156 pass, 1 expected fail |

## 2 · The adapter (H-6)

- `node harness/adapter-law.mjs pass-3/adapter-floor-v2.mjs` gives L-1..L-5 hold, with 44 changed lines against `adapter-head.mjs`. I read the diff.
- The changed reads are all DOM: `posture()` (compact class), `budget()` (minus computed main-axis margins), `rim()`, `compact()`, `badge()`, and `config` binding the grouped `scroll` prop. No read derives from the route's lanes or custom properties.
- `extent()` is `paintedRect(.dock-plate)`. B′ moves the plate by inline `inset` and gives every unit an `inset(… round …)` clip. `lib.mjs insetOf` parses exactly that form (`round` stripped), so the paint floor and the leaving rule see the scene's clips. Without that, H3-1 / H3-3 would be vacuous on this route. They are not.
- `budget()` reads computed margins, which include the route's `--dock-flow-*` margins in flight. W2 reads the budget at rest, where `clearFlow()` has run. That holds on the cells run, so it is not a defect, but it is a coupling to note.

**H-6 holds.**

## 3 · The checklist (REGISTRY P2-4 §4.5, fixed, 24 rows)

| Row | Verdict | Evidence (this seat's records) | Counterexample when it fails |
|---|---|---|---|
| **P1** stadium in every rung and orientation (W1, both themes) | **FAIL (OWNER-BLOCKED, Q-12)** | light: Chromium 19/19 + 3 OB; Playwright WebKit 18/20 + 1 UM. Dark: 38/44 + 6 OB. Every `morph`, `vmorph`, rest and rail cell green | `card·first-expand`, `warm-collapse`, `warm-expand`: rest radii 27.93 / 23.93 px. Light Playwright WebKit reads these FAIL, not OB ("fitted r spread 3.74-3.75 px", bound 2.5, load 151-161); dark reads OB. Either way the card law waits on Q-12 |
| **P2** run scrolls on genuine overflow, paint box apart from the port (W2) | **FAIL (shared, F-19)** | 7/8 per engine, both themes | `route1·long-run-v`: seats need 592 px vs budget 536; keyboard reach 10/11 (Seat 1 missing), both engines, both themes. Same on floor v2 |
| **P3** one continuous extent morph (W3) | **FAIL (OWNER-BLOCKED, Q-4)** | light: Chromium 25/25 + 4 OB; Playwright WebKit 25/27 + 2 OB. Dark: 53/58 + 5 OB. Reruns: 0 non-OB fails | `window` only, each holding Q-4's lenient reading. Chromium `warm-collapse` 258.8 ms vs 256.7; `reversal` 266.7 ms after the retarget vs 256.8; `anchor-end·warm-*` 258.3-259.3 ms vs 256.8. Playwright WebKit `lead-add` 285 ms vs 278.6; `reversal` 264 vs 260.6. First-reading `swap-short` blank and `anchor-end·warm-collapse` trajectory (32 % of D, load 95-103) pass in both reruns: **NOT-REPRODUCED** |
| **P4** state inputs (W4) | PASS | 13/13 per engine, light and dark | — |
| **P5** rim clipped by the dock's radius (W5) | PASS | 6/6 per engine, light and dark | — |
| **F1** corner; seats at any depth | PASS | W1 rests; W2 every route but `long-run-v` (incl. `route6`) | — |
| **F2** rim as a plate child on the one source | PASS | W5 incl. `h·compact` | — |
| **F3** hover gate, coarse press | PASS | W4 coarse cells, both engines | — |
| **F4** the P4 machine | PASS | W4 compact cells, both engines | — |
| **F5** endpoint model, one trigger per fact | PASS | source census: one `MutationObserver` (`useDockContent.ts:33`), one `ResizeObserver` (`useDockScene.ts:1188`); `first-expand` continuous | — |
| **F6** crash-free edge | PASS | 0 crashed in every light and dark table | — |
| **F7** `g-dock-lattice` as invariants | PASS | dock suites 19 files, 156 pass, 1 expected fail; `vue-tsc` exit 0 | — |
| **N1** no margin of its own; container's alignment | PASS | `anchor-end·warm-*` anchored-edge drift 0 px, both engines, both themes | — |
| **N2** one content observer; nothing published without a reader | PASS | `stretch·lead-add` PASS (seat step ×0.62 / ×0.63); the lattice gate's "one MutationObserver" and "every custom property has a reader" pass | — |
| **N3** scoped size hand-off | PASS | `lattice` (seat step ×0.6 / ×0.61, 0 errors); `infanim` (0 page errors, window 0/241 and 0/195 frames); `seat-transition` (trajectory 0.57 % / 0.47 % of D) | — |
| **N4** gutter and `#badge` | PASS | W7 40/40 light and dark; gutter 12 px (bound ≥ 8), badge shares 0 px with the glyph | — |
| **R1** continuity and seat rows with the paint floor on every W3 cell | PASS | every W3 cell `blank` longest run 0 after reruns; retarget 0 blank of 26-33 moving frames ×12; seat overlap 0 frames everywhere | — (the one red `blank`, Playwright WebKit `swap-short` 2 of 22 at load 103, is NOT-REPRODUCED in 2/2 reruns) |
| **R2** leaving seats by the gap-free rule | PASS | `compaction`, `lead-remove`, `content-remove`, `swap-*` leaving 0 failing (e.g. swap-long seat 1: 0.98 → 0.09 over 15 frames, 125 ms); retarget leaving 0 failing ×12 | — |
| **R3** the reversal hands its velocity on | PASS | trajectory after the retarget 0.88 px (tol 7.98) Chromium; 0.61 px (tol 8.25) Playwright WebKit | — (the window is P3's) |
| **R4** no one-frame leap after any of the five block timings | PASS | ST light 10/10 (5 per engine). Travel recorded in §4. Dark Playwright WebKit ST is UNMEASURED (instrument; floor v2 shows the same) | — |
| **R5** hit follows paint (Q-7 default, at the arc) | PASS | `hit`: painted centres 11/11, 25/25 (Chromium) and 11/11, 26/26 (Playwright WebKit); clipped-away centres 0 hits. `lune`: corner points outside the arc hit the dock 0/40 per engine, at rest and in flight | — |
| **B1** every cell in both engines under H3, reviewed adapter | PASS | every witness ran in both engines and both themes (§1); H-6 holds (§2). The UNMEASURED cells are the fence (W8 consumers), the headless bound (O-66 §2) and two shared dark instruments (ST video, FM marker) | — |
| **B2** filmstrip gestalt against D-1 and D-2 | **FAIL** | the content travels with the glass (F-9 met: `kept40` 0.78, `kept80` 0.48-0.49); no trough (≥ 1.0) | CX-1 (§5): every flip and swap paints 1-3 tiles of glyphs spliced at the wipe's hard seam, in both engines |
| **B3** `DockProps` count; prose sweep of every touched file | **FAIL** | 7 members (`fitContent`, `backdropMode`, `shape`, `orientation`, `collapse`, `backgroundCanvas`, `scroll`); the route adds 0. No deleted names remain in the touched files | CX-2 (§5): `src/components/dock/GlassDock.vue:61` reads "SIX members" |

**Passing: 19 of 24 = 79 %.**
- Owner-blocked: P1, P3.
- Shared: P2, plus B3's stale line, which floor v2 also carries.
- Route-owned: B2.

## 4 · The obligations, re-read

**Obligation 1: coverage at seat depth, a swap never blanks.**
- W3 `swap-long` and `swap-short` blank 0 after reruns.
- Retarget at 40, 80 and 120 ms, 2 reps, both engines: 0 blank frames and 0 overlap frames in every cell; the tightest leaving seat drops 0.93 → 0.12 over 13 frames.
- Trough, lowest moving-frame ink against the lower rest:

  | | Chromium | Playwright WebKit |
  |---|---|---|
  | `swap-long` | 1.08-1.11 | 1.06-1.07 |
  | `swap-short` | 1.40 | 1.40-1.41 |

- **MET.**

**Obligation 2: compact-rung leaving seats by clip or fade.**
- W3 `compaction` leaving 0 failing.
- `ghosts`: o = 1 throughout, 0 clones. The seats leave by clip.
- **MET.**

**Obligation 3: the stall arms, replay in paint.**
- ST light 10/10.
- The other route's `stall` arm (screencast, 25 fps):
  - **Playwright WebKit.** Rests through the 1.2 s block (0-2 px of travel in the block window), then replays from rest: 102 → 135 → 260 → 382 → 382 → 450 → 474 → 482 (`same-task`) and 102 → 153 → 153 → 308 → 412 → 454 → 476 (`1raf`). The steps of 142-155 px sit beside duplicated video frames, which is peak spring velocity over 40-80 ms, not a leap.
  - **Chromium.** Reads `movedBeforeBlockEnd` with 283-354 px in the window. The arm's block-end marker leads the video, as the prototype's record also shows. ST, which carries the continuity bound, passes.
- **MET.**

**Obligation 4: Q-7 on the prototype.**
- `hit` as in §3.
- **Gap in the route's own arm:** it never samples the plate's corners. This seat's `lune` arm does: 0/4 at rest and 0/16 in flight per direction and engine, on proto and on base (`R` 28 px in flight; the pill's computed 9999 px at rest).
- **MET.**

**Both-a: F-9, the warm collapse carries its content.**
- `kept40` is 0.78 in both engines; `kept80` is 0.49 (Chromium) and 0.48 (Playwright WebKit).
- The strips show the faces clipped by the closing edge, never cleared.
- **MET.**

**Both-b: no near-blank trough.**
- Every trough ≥ 1.0 (warm-expand 1.14-1.31).
- **MET.** But the absence of a trough is bought by the hard seam (§5 CX-1).

**Both-c: the other route's critic arms run on this route.**
- `vagree`: worst out in flight 0-0.29 px, both engines.
- `stall`: as above.
- `seam`: Chromium plate 30.88 at centre / 51.07 elsewhere; Playwright WebKit 30.5 / 48.47.
- `ghosts`: as above.
- **Run.**

## 5 · Counterexamples

### CX-1 · The wipe's hard seam splices glyphs (B2)

The exchange clips the outgoing unit at a moving edge and shows the incoming unit only where nothing else paints. The two meet at one vertical seam, so the glyphs on either side of it join into one false glyph. In this seat's light film strips (`FM` PASS 12/12; the strips are scratch captures, while the verdict lines with their tile counts are in `full-light.log`):

| Strip | Spliced tiles |
|---|---|
| Chromium `swap-short` | tile 4 "A' B ols Brushes"; tile 5 "A B ls B"; tiles 6-8 a stranded "s" sliver beside "B" inside the closing plate, about 120 ms |
| Playwright WebKit `swap-long` | tile 2 "A B ols Bru" |
| Chromium `first-expand` | tile 3: "P" and "1" spliced into one glyph |
| Playwright WebKit `warm-collapse` | tile 3: "1" spliced with "P" |

The prototype's own banked strips show the same (`pass-3/D2-Bp-proto-records/b8/film/strip-chromium-swap-long.png` tile 3 "Bools", `strip-chromium-warm-collapse.png` tile 3).

No witness fails on it:
- `seatOverlap` counts painted rects that intersect, and the seam makes them abut.
- The paint floor counts any 1 × 1 px of the entering face.

Against D-1 (liquid quality) and D-2 (an affordance that bests iOS 27), a frame that reads as a corrupted word is the gestalt failure. A frame that reads as a blank one would be too. The route traded pass 2's blank for a splice. **Owner: route.** The in-family cure the prototype names is a feathered mask, or an exclusion lane wider than one face.

### CX-2 · Stale count in a touched file (B3)

`src/components/dock/GlassDock.vue:61`: "The prop contract is ONE shape (DockProps, in useDockShellProps): SIX members". `useDockShellProps.ts:64-110` declares 7.
- The line predates both patches: HEAD's own DockProps had 6.
- Floor v2 added `scroll`.
- Both floor v2 and the route touch `GlassDock.vue` (the route changes 100+ / 128− lines in it).
- The prototype's sweep (§9) grepped for deleted names, not for facts that changed.

**Owner:** shared (floor v2 and the route), a one-line cure.

## 6 · Cost (not a checklist row; for Q-15)

`plead`, Chromium, prepend a seat, re-read at load 40-49:

| Throttle | Seats | B′ p95 / max / > 25 ms | B′ RunTask ms per frame | Base p95 / max / > 25 ms | Base morph frames |
|---|---|---|---|---|---|
| 1× | 0-40 | 9.4-10.0 / ≤ 10.4 / 0 | 0.35-0.89 | — | 0 |
| 4× | 20 | 23.9 / 40.8 / 2 | 2.15 | 10.1 / 26.2 / 1 | 0 |
| 4× | 40 | 25.2 / 68.4 / 4 | 2.60 | 10.0 / 10.3 / 0 | 0 |

This reproduces the prototype's open item (25.7 / 66.6 / 3 at load 21-27). The base animates no lead, so it pays nothing. At 4× with 40 seats the morph has 11 frames against 25 at 0 seats.

## 7 · Vacuous greens found

1. **The route's `hit` arm** never tests the corner lunes, which is the substance of Q-7 (arc against rectangle). This seat's `lune` arm closes it, and R5 still passes.
2. **H3-1 / `seatOverlap` cannot see a splice.** Abutting clips intersect by 0, and the paint floor accepts a 1 px sliver of the entering face. Recorded for next pass (§9), not minted here.
3. **The prototype's dark reading** covered ST, W3, FM and W1 `card|vmorph` only. Its "both themes" for P2, P4 and P5 rested on light alone. This seat ran W1, W2, W4-W7 dark: the results match light.
4. **No other vacuity found.** The `inset(… round …)` clips are parsed by the instrument (§2), so R1 and R2 judge the scene's real paint.

## 8 · Verdict

**ADVANCE, 79 % (19/24).**
- Every route-owned mechanism row passes. That covers the content (R1, R2), the stall (R4), the hit (R5), the morph's continuity, and floor v2 held under the route.
- The two route-touched failures are B2 (the seam, a look defect inside the family's own exchange, cured by a mask or a wider lane) and B3 (one stale line).
- P1 and P3 wait on the owner (Q-12, Q-4); P2 waits on F-19.
- The BANK re-trigger is not met (§6: 1× stays under 10.4 ms).
- **Not CONVERGED:** 5 rows are open, owner-blocked included.
- **Winner rule (§4.5):** this list now stands measured for B′. A winner still needs G measured on the same list with the same `stall` tool, and Q-15.

## 9 · Next pass (new defect classes, recorded, not minted)

- **The splice.** A witness that sees two units abutting at a seam inside a glyph run (an exchange's out and in clips meeting at one edge) and a minimum width for a painted sliver. CX-1 is invisible to H3-1, H-3b and H3-3.
- **Prose sweep by fact.** The sweep must check counts and claims in touched files, not only deleted names (CX-2).
- **Dark instruments.** Playwright WebKit ST video rests disagree with the DOM in dark (5/5 UNMEASURED). Chromium FM's corner marker is not found in dark (6/6). Both are shared with floor v2.
- **W1 card verdict flips by theme and load.** Light Playwright WebKit reads FAIL (spread 3.74-3.75 px at load 151-161); dark reads OB.
- **The 4× lead cost** (§6), for Q-15.

## 10 · Open gaps (checklist rows that do not pass)

1. **P1** (OWNER-BLOCKED, Q-12): W1 `card` ×3, rest radii 27.93 / 23.93 px; light Playwright WebKit reads FAIL on fitted r spread 3.74-3.75 px.
2. **P2** (shared, F-19): W2 `route1·long-run-v` keyboard 10/11, Seat 1 missing, both engines, both themes.
3. **P3** (OWNER-BLOCKED, Q-4): W3 `window` on `warm-collapse`, `reversal` and `anchor-end·warm-*` (Chromium) and `lead-add` and `reversal` (Playwright WebKit). Each holds Q-4's lenient reading.
4. **B2** (route): the hard seam splices glyphs for 1-3 tiles on every flip and swap, both engines (CX-1).
5. **B3** (shared): `GlassDock.vue:61` "SIX members" against 7 (CX-2).

Outside the checklist: real Safari **UNMEASURED (owner's safaridriver checkbox)** in every cell; the W8 consumer cells are UNMEASURED (value.js fenced; keyframes and fourier need headed real-GPU runs).
