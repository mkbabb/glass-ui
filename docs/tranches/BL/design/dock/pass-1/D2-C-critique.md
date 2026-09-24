# D2 · pass 1 · D2-C · critique (the physical dock)

| field | value |
|---|---|
| seat | D2-C adversarial CRITIC, pass 1. I did not author the spec, the research report or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | checkout at `af92d594`; `git diff --quiet 857cb97f af92d594 -- src` holds, so `src/` is the prototype's base. `D2-C-proto.patch` is byte-identical to the prototype seat's scratch copy (`cmp`), and `git apply --check` then `git apply` succeed on a fresh HEAD worktree: 20 tracked files, +604 / −1,605, plus the 3 new composables |
| scratch | `K = …/scratchpad/D2/p1/D2-C-crit`. The worktree `$K/wt` is removed (`git worktree list` shows no D2-C-crit entry). Kept: the build `$K/out/builds/d2c`, 11 plant builds `$K/out/builds/plant-*`, the witness run `$K/out/run-d2c.txt`, plant runs `$K/out/plants/*.txt`, my probes `$K/probes.mjs`, `overlap.mjs`, `gestalt.mjs` and their JSON `$K/out/probes-*.json`, the plant script `$K/plant.mjs`, and shots `$K/shots/` |
| engines | Headless Chromium and Playwright WebKit from node, with playwright imported by absolute path from the checkout; no browser MCP. **Every WebKit number is Playwright WebKit (+shim). Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox)** |
| load | load average 44 at the start, 385 during the witness run and 51-170 during the plants (`uptime`). Other sessions were running vitest and builds on the machine |
| fences | My only write in the checkout is this file. My only git writes were `worktree add` and `worktree remove --force`. Plants were applied with Node string replacement and restored from in-memory backups; after all 11, `git diff --stat` read +604 / −1,605 again. I ran no vitest. The checkout's `node_modules/.vite/vitest/…/results.json` (13:54:30) and `.vite-temp` (13:55:06) changed during my session, but at those times I was running only harness witnesses and read-only probes, and `ps` showed other sessions' vitest processes |

## 1 · Before reading the family: the failures I expected a dock design to hide

I wrote these from `PORTFOLIO.md` §0-2 and `HARNESS.md` alone, before opening SPECS §D2-C, `D2-C.md` or the prototype.

1. **The seat-level morph.** W3 bounds faces against the *plate*. It never asks whether two seats paint over each other mid-morph, so a plate can grow smoothly while its content collides inside it.
2. **The layout footprint.** W3 reads the plate's painted rect, not the root's layout box. A design can paint a continuous plate while the box that its siblings see jumps in one frame.
3. **Scenes a family never enters.** Every cell that drives the dock through a platform API (for example `scrollIntoView` for the rail's scrolled end) is vacuous for a family that disowns that API.
4. **Bounds that move with the proposal.** When a family's fix is to change a token that a witness reads as its bound, the witness turns green without the dock changing.
5. **Dual triggers.** A primary trigger plus a backstop can hide a dead primary (E-2).
6. **Reduced motion as "instant everything".** Canon P6 keeps fades under PRM, while the W4 PRM cell counts only extent frames. A design that seats every lane, fades included, passes.
7. **Owning a platform behaviour.** A family that replaces the native scroller inherits every behaviour the scroller gave for free: tap-to-stop, AT reach, momentum and `scrollIntoView`. The witnesses test almost none of them.
8. **Hysteresis bounds that are looser than stated.** An oscillation of fixed amplitude around one threshold proves a band only wider than that amplitude.
9. **Engagement gates that stick.** "Focus within holds the dock open" behaves differently on engines that focus a clicked button.
10. **Weight and bounce read off a trace.** "Dead landing" passes W3, and D-1 asks for bounce. Whether any bounce is left is a gestalt question.

## 2 · Reproduction (my own run)

`node harness/run.mjs --build $K/out/builds/d2c --adapter $K/adapter-d2c.mjs` (the prototype seat's adapter, copied; against `adapter-head.mjs` it differs only in `config`, `posture()`, `rim()` and `compact()`), exit 1:

| witness | Chromium | Playwright WebKit (+shim) | total | prototype's claim |
|---|---|---|---|---|
| W1 | worst 0.137 px | worst ≤ 0.49 px | **32/32** | 32/32 |
| W2 | 0 scroll-container frames on every route; ring cut 0/0 | same | **10/10** | 10/10 |
| W3 | first expand passes; the other 6 cells fail on the window alone, 257.3-258.8 ms against allowances of 253.4-253.8 ms | first expand and warm expand fail (264 > 262, 265 > 263 ms); the other 5 pass | **6/14** | 8/14 |
| W4 | compact 214.13 → 179.88 px, band 161/76, PRM 0 frames; coarse latch and tap-pins FAIL | same | **12/16** | 12/16 |
| W5 | 0 device px outside in 5 rungs | same | **10/10** | 10/10 |

Every W3 cell's continuity (×0.64-0.66 of the bound), faces (≤ 0.15 px), landing (dead, 0 reversals) and owners (0 frames) pass in both engines. The failure is only the window, and the prototype's 8/14 against my 6/14 is Playwright WebKit frame jitter under a load average of 385. The claim reproduces.

## 3 · Can the witnesses fail on this family? (planted faults)

Each plant edits the patched source, builds as `plant-<name>`, and runs only its witness in both engines (`$K/plant.mjs`, `$K/out/plants/<name>.txt`).

| plant | edit | witness | result |
|---|---|---|---|
| `w1morph` | `.glass-dock[data-morphing] > .dock-plate { border-radius: 12px !important }` | W1 | **FAIL 20/32**: every morph-frame cell in both engines (5.99 / 6.00 px horizontal, 7.20 / 7.00 px vertical). Rests pass |
| `w1endlens` | the plate takes `border-radius: 50%` whenever the track's `s > 1` | W1 | **PASS 32/32. The witness cannot see it.** `rail·scrolled-end` reaches the end through `scrollIntoView`, which leaves a transform track at `s = 0`. The prototype's own reach-based read (`D2-C-proto/mine/railend.mjs`, `focus()` on the last seat, `s` → 168.5) reads the plant's corner at **19.845 px** (Chromium) and **19.783 px** (Playwright WebKit), against 0.137 / 0.011 px on the unplanted prototype |
| `w2auto` | run `overflow-x: auto` | W2 | **FAIL 2/10**: routes 1-4 in both engines, e.g. route 2 at 72/72 scroller frames |
| `w2trackclip` | `.dock-track { overflow: clip }` (a clip, not a scroller) | W2 | **FAIL 4/10**: 0 scroller frames, but ring cut 4.25 / 4.25 px (long runs) and 4.35 / 4.35 px (hover), both engines. The paint check sees `clip` |
| `w3bounce` | extent lane ζ 0.6, `rest` seat | W3 | **FAIL 0/14**: undesigned overshoot 16.5-36.7 px, 2 reversals, both engines |
| `w3nomo` | the MutationObserver callback no longer calls `check()`; ResizeObserver alone | W3 | **Content and swap cells PASS continuity in both engines** (×0.64-0.66). Only windows fail (2/14). See §4.5 |
| `w3noro` | the ResizeObserver callback is a no-op; MutationObserver alone | W3 | **Content and swap cells PASS continuity in both engines** (×0.65-0.66); 6/14, window only. See §4.5 |
| `clock26` | `--spring-dock-settle: 0.26s`, nothing else | W3 | **14/14**. Windows 249-266 ms, the same as the 210 ms build (§4.3); allowances 302.5-318.9 ms |
| `clock26late` | 0.26 s plus `data-morphing` removed 45 ms late | W3 | **FAIL 0/14**: the "closes within 2 frames of landing" check catches it (the window closes 3-6 frames, 47-53 ms, after landing) |
| `w4band` | `DEFAULT_BAND` 40 → 2 (enter 123, exit 116) | W4 | **`no-threshold-bounce` PASSES in both engines** with a 7 px band: 1 flip in 24 moves. See §4.4 |
| `w5rimout` | rim `translate: 0 6px`, plate `overflow: visible` | W5 | **FAIL**: 374-2,136 device px outside, 12.75-15.95 px deep, in every Chromium rung |

Each witness can fail on this family. Two cannot fail where they claim to (W1's scrolled-end cell, W4's band bound), and two of the family's own mechanisms are not load-bearing (§4.5).

## 4 · The checklist

### 4.1 Vacuous convergence

- **W1 `rail·scrolled-end` is vacuous here.** The prototype says so (§2.1, item 6), and `w1endlens` shows the consequence: a lens that appears only at a scrolled end passes 32/32. Before any transform-track family counts W1 as green, the harness needs one of two fixes: an adapter read `toEnd()` that uses the family's own reach, or a non-vacuity guard that fails the cell when the run's offset is still 0. The prototype's re-read by focus (0.137 / 0.011 px) is the real evidence for this cell, and it holds.
- **W2 is green by construction.** No element is a scroll container, so routes 2-4 cannot arm a range. That is the family's thesis, not vacuity, and `w2trackclip` shows the paint half still bites. W2 does not measure what the family gave up for it (§4.6).

### 4.2 Spec-cites-itself circularity

- **The clock ask moves the bound, not the dock.** No line in the patched `src/components/dock` reads `--spring-dock-settle`. The body lands on `DOCK_SPRING` (0.30, ζ 0.88) with eps 0.5 px, whatever the token says. `clock26` reads windows of 249-266 ms, the same as the 210 ms build's 248-269 ms. What turns W3 green is the allowance rising from about 253 to about 303-319 ms, because the harness derives `clockMs` from `--spring-dock-duration`.
  - The derivation is physical rather than arbitrary: 0.26 s is the closed-form 0.5 px horizon for D ≤ 600, which I re-derived from the report's node one-liner.
  - But "one token for CSS and JS" (`D2-C.md` §4 item 2) is not built. The token and `DOCK_SPRING` are two facts that must agree by hand (P-3).
- **The token has consumers outside the dock.** `--spring-dock-duration` also times `dock-in` (`transitions.css:88`, `literals.css:24`), the grasp veil (`glass/grasp.css:202,206`), value marks (`value-marks.css:82`) and the tab indicator (`scale-paper.css:55`). All of them stretch by 24 % under the ask, and none was measured.
- **What still bites at 0.26 s:** `clock26late` fails 0/14, so a late close is still caught by landing proximity. The window-length check itself loosens by about 50 ms: a body landing 50 ms later would pass.

### 4.3 Gates that cannot fail

| gate | shown | evidence |
|---|---|---|
| W1 `rail·scrolled-end` on a transform track | cannot fail | `w1endlens` 32/32 against 19.8 px by reach |
| W4 `no-threshold-bounce` "band wider than 8 px" (`HARNESS.md` §5) | fails only below about 4 px | `w4band`: 7 px passes, because the 24 moves are ±4 px around *enter*, so they never reach *exit* = enter − 7. Fix: oscillate ±(stated bound / 2 + 1) around the band's midpoint, or assert enter − exit ≥ 8 directly |
| W4 `prm·posture-morph` | blind to fades | it counts only extent frames; see §4.6 item 3 |
| W3 faces | blind to seat-on-seat and to layout | see §4.6 items 1-2 |
| the 9 RED `g-dock-lattice.test.ts` gates | unmeasured by me | I did not re-run vitest because of the fence (the prototype's own breach, its item 9). The prototype's 111/121 stands on its word |

### 4.4 The elegant-reduction trap

Items that read as one line in the spec and are the hard part:

1. **"The gesture."** The family replaces the platform scroller, and my first probe of a behaviour the scroller gave for free fails.
   - A flick, then a mouse tap on the moving track 30 ms later, activates a seat: `s6` in Chromium (the track caught at 111.5); `s7` in Playwright WebKit, where `s6` was under the pointer when read and the track kept moving 102.6 → 136.2 (`probes.mjs taptrack`).
   - UIKit's contract is that a tap on a decelerating scroll view stops it and does not activate.
   - `onPointerDown` holds the lane but leaves the click to fire.
2. **"Fling to the nearest rest, keeping the velocity."** `decayRest` only picks the target. The flight itself is the dock spring (response 0.30 s), so every flick lands in about 250 ms whatever its speed, not on UIKit's decay. Whether that reads as momentum on a phone is UNMEASURED (C-3).
3. **"Reach covers AT."** It covers focus and click only (C-1, C-2). A consumer `scrollIntoView` is a silent no-op, and the prototype had to re-derive W1's scrolled-end cell for exactly this reason.
4. **"The engagement gate: focus within holds c at 0."** After an ordinary mouse click on a seat, the seat keeps focus in both engines (`activeElement` = `t2`). Scrolling to 900 then leaves the dock uncompacted, 214.13 px with posture `pinned` (Chromium; Playwright WebKit 214.16). Real Safari does not focus a clicked button, so the engines would split there. UNMEASURED.
5. **"Endpoints: posture watcher plus ResizeObserver."** The prototype says the RO alone left a gap (D-4, ×7.1 in WebKit) and added a MutationObserver. The plants refute the need (§4.5).

### 4.5 Legacy aliases, shims and dual paths

- **The two content triggers each pass W3 alone.** In `w3nomo` (RO only) and `w3noro` (MO only), every content and swap cell holds continuity at ×0.64-0.66 in both engines. The ×7.1 / ×5.62 WebKit steps that D-4 attributes to "RO alone" do not reproduce on this source.
  - A plausible reading, not measured: the earlier failure was the harness's read landing between the DOM mutation and the RO delivery, a read the paint never showed.
  - Either way this is a dual path the witness cannot tell apart (E-1).
  - The MO has a cost: `check()` calls `getBoundingClientRect` in the microtask after every `class` mutation anywhere in the dock subtree.
  - Keep the one with a scene that needs it. The RO covers font swaps and resizes, which the MO cannot see; the MO covers nothing the witnesses show.
- **An identity alias:** `const outerCurrentLayer = outerActiveLayer;` (`GlassDock.vue:199` in the patched tree). HEAD's own comment at that site, which the patch deleted, ruled that exact form out: "an identity `computed` over one ref is a second name for that ref".
- **Stale prose:** about 48 comment lines across 16 dock files still describe `--dock-morph-t`, the cut cap, the snap scroller or the deleted composables (my `grep -c`, matching the prototype's "about 50"). In addition, 11 files under `tests/`, `tests-visual/` and `demo/` name the deleted internals and are unaudited.
- **A lane leak:** `DockCrossfade.vue:115` takes `useDockBody().lane(…)`, and `createDockBody` never removes a lane. Every crossfade mounted inside a dock adds a lane that is stepped and kept until the dock unmounts. The prototype names this risk (item 8); it is a defect by inspection.

### 4.6 Masked fallbacks and unverified gestalt

**Masked fallbacks.** None in the paint path: the plate, the rim clip and the track have one route each, and `w5rimout` and `w1morph` show the primaries fail loud. The only masking pair is the dual trigger in §4.5.

**Gestalt.** I captured the first expand frame by frame (`$K/shots/M-expand.png`, Chromium, 7 frames over 262 ms), the rests and the compact rung. I also viewed the prototype's `cmp-sections-430-light.png` and `cmp-bottomdock-430-dark.png`.

- **What is right.**
  - The plate is a true stadium in every frame; the HEAD lens and squash are gone.
  - The extent is continuous with no terminal snap.
  - The compact rung shrinks about the centre with the labels scaled by k = 0.84, and reads as one object.
  - The ring on the 14th seat of the long run paints whole.
- **What is not.**
  1. **Seats collide mid-morph** (`overlap.mjs`, first expand).
     - Prototype: 19 frames with two painting seats overlapping by more than 2 px, worst **38.8 px** (Chromium) / 39.2 px (Playwright WebKit).
     - The pairs are Home×One, Home×Two, Home×Three (the persistent Home slides through the entering face, which already sits at its target) and Play×Play (the held collapsed "P" over the entering "Play" chip).
     - HEAD reads 19 frames, worst 36.8 px (One×Play). So this is not a regression, but it is not cured.
     - In the captures, "H" draws over "1", "2" and "3" in turn, and a ghost "P" sits on "Play" until the last frame. W3 cannot see this.
  2. **The layout footprint jumps.** The root lays out at its target at once (D-1).
     - With a sibling sharing the row (`margin-inline: 0` on the root), the sibling moves **193.8 px in one frame** on both the collapse and the expand. HEAD reads 194 px.
     - During the collapse the plate paints outside the root for 24 frames, so it paints over that sibling.
     - W3 reads the plate, so it cannot see this either.
  3. **PRM drops the fade.** Every lane, the face crossfade included, is built with `respectReducedMotion: true`.
     - Under `reducedMotion: "reduce"` the posture flip's face opacities go `0/1 → 1/0` with **0 intermediate frames** in both engines (HEAD is the same).
     - Canon P6 and floor row 4 keep fades. The spec lists PRM as [probed], and the W4 PRM cell cannot see a fade.
  4. **No bounce on the primary motion.** The extent seats dead by rule (the crossing seat), and the squish swell peaks at +2.22 px on a 56 px plate. I cannot see it in the captures. D-1's bounce survives only in the track's rubber band. The morph reads as a clean, weighted stretch with a curtain reveal, not as a liquid body.
  5. **Hard cuts at the port edge.** The overflowing dock at 430 slices its trailing seat with a straight vertical edge inside a round plate. There is no fade and no cue (the prototype's §6). HEAD's cut cap was at least a cue, so this is a regression in engagement (D-2).
  6. **The BottomDock at 430 is broken.** The tab strip grows to 258 px and pushes prev/next-category off the port. The capture confirms the prototype's §6.
  7. **The rim** reads as a 3 px dark band under the plate, with the fill clipped by the corner. It is legible, but it is not a rim that lives in the glass.
- **Verdict on gestalt:** geometrically sound, and not yet "one liquid dock, iOS-27 grade". It stays short of that until seats choreograph with the plate, a bounce is designed rather than seated away, and the run's ends carry a cue.

**The cost of the paint path (P5).** The plate is resized through `inset`, a layout property, and the faces through a main-thread `clip-path` (S-17). Chromium CDP over one warm expand reads 34 layouts and 43 style recalcs, against HEAD's 66 and 69 (layout 1.56 ms vs 3.97 ms, style 40.8 ms vs 87.8 ms in 600 ms). So it is cheaper than HEAD. It is still not compositor-only: a main-thread stall freezes the whole dock, where a transform would keep moving. Not measured here.

### 4.7 Consumer-less substrate

- `DockBody.frames` ("an instrument for the idle budget") has no reader in `src/`.
- `useDockExtent` returns `extent` "for instruments", and `GlassDock.vue:227` destructures only `leavingLayer`.
- `scrollSource`, `compactOnScroll` and `rim` have a consumer letter (O-55, value.js), but no consumer mounts them yet. Nine props against the six-prop G-DOCK-BUDGET gate is an owner call (the prototype's §5).
- The spec's `bodyEpisode()` was not built. DockCrossfade takes a raw lane, which is simpler, and the spec should say so.

## 5 · Counterexamples (concrete)

| # | input | wrong output | engines |
|---|---|---|---|
| CX-1 | `long` dock; flick 80 px; tap the track 30 ms later | the tap activates a seat (`s6`; `s7` in WebKit, not the seat read under the pointer) | Chromium, Playwright WebKit |
| CX-2 | `compact` dock; mouse-click "Lots"; move away; scroll to 900 | stays 214.13 px, posture `pinned`; never compacts until blur | Chromium, Playwright WebKit (focus on click) |
| CX-3 | `morph` dock, `reducedMotion: reduce`; hover | face crossfade 0 → 1 in one frame; P6 fade lost | both |
| CX-4 | `morph` first expand | Home paints over One/Two/Three, up to 38.8 px, for 19 frames | both |
| CX-5 | `morph` with a sibling in the row | sibling jumps 193.8 px in one frame; plate paints over it for 24 frames on collapse | Chromium |
| CX-6 | plate lens only when `s > 1` (`w1endlens`) | W1 32/32 green; real corner 19.8 px at the reached end | both |
| CX-7 | compaction band 2 (a 7 px band) | W4 `no-threshold-bounce` green | both |
| CX-8 | delete either content trigger | W3 unchanged: continuity holds with RO alone or MO alone | both |
| CX-9 | `--spring-dock-settle: 0.26s` | W3 0/14 → 14/14 with windows unchanged; 5 non-dock consumers retimed, unmeasured | both |
| CX-10 | demo BottomDock at 430 | tab strip 46 → 258 px; prev/next-category off the port | Chromium (prototype §6, capture viewed) |

## 6 · Convergence

**54 %.** W1, W2 and W5 are sound, and W3's physics (continuity, faces, landing, owners) is sound. What remains:

**Open gaps (exact list):**

1. W3's window at the shipped 210 ms clock: 6/14 here, 8/14 in the prototype's runs. The 0.26 s ask moves the witness's bound, not the body. It is not bound to `DOCK_SPRING` (P-3), it retimes five non-dock consumers unmeasured, and `linear()` was not regenerated. An owner ruling is owed.
2. Floor row 3 is unbuilt: W4 coarse latch and tap-pins, 4 cells RED.
3. Floor row 4 is unbuilt: PRM drops the posture fade (CX-3).
4. Floor row 1 is unbuilt: `[data-dock-seat]` at any depth; wrappers are still one seat.
5. Tap-to-stop activates a seat (CX-1).
6. Focus after a click sticks the engagement gate (CX-2).
7. The dual content triggers (CX-8): delete one, keep the one a scene needs.
8. Seat collisions mid-morph (CX-4): persistent regions need a path that does not cross entering seats, or the entering face must travel with the plate.
9. The layout footprint jumps for in-flow docks (CX-5). The spec's max(from, to) hold was not built, and it would not cure this either.
10. No end cue on an overflowing run; a regression against HEAD's cap cue.
11. The BottomDock nested-scroller seat (CX-10), which is absent from the spec's consumer table.
12. DockProps 9 against the 6 budget (owner); 9 RED lattice gates; 11 test and demo files naming deleted internals; about 48 stale comment lines.
13. The `outerCurrentLayer` identity alias; the DockCrossfade lane leak.
14. D-1: no designed bounce on the extent; the swell is imperceptible at +2.2 px.
15. C-1 AT cursor, C-2 consumer `scrollIntoView`, C-3 iOS momentum, C-5 CSS size transitions, C-6 faces unclipped at rest (M-A), C-8 non-window scrollers: named by the family, still open.
16. Real Safari, iOS Safari, VoiceOver and TalkBack: UNMEASURED (owner's safaridriver checkbox).

**Owed by the harness, not by D2-C** (it blocks trust in any transform-track family):
- H-1: make W1 `rail·scrolled-end` non-vacuous (CX-6).
- H-2: make W4's band bound match its stated 8 px (CX-7).
- H-3: add a seat-on-seat overlap read and a root-footprint continuity read to W3 (CX-4, CX-5).
- H-4: make the PRM cell read fades (CX-3).

## 7 · Verdict

**BANK.** The family is sound where it claims soundness: the stadium holds in every frame, no scroll container exists, the rim sits inside the plate, and the one integrator carries velocity across retargets, which S-16 finds no CSS carrier does. Nothing is refuted, so it is not RETIRE. No missing primitive stalls it, so it is not BLOCK.

On the witness record it is dominated today. The D2-B critique reproduces D2-B at W3 14/14 at the shipped clock and W4 16/16. D2-C needs a register-wide token change to reach W3 green. It also takes on the platform scroller's whole contract, and fails the first unmeasured piece of it I probed (tap-to-stop).

**Re-trigger:** re-open D2-C if either of these happens:
- a native-scroller family fails a real-Safari or iOS Safari cell on the run's cross-axis paint or its snap lattice, which a transform track cures by construction;
- the owner rules the dock register's clock to its 0.5 px horizon (0.26 s) for the register as a whole.

On re-entry the family must first close gaps 2-8 and 13. Gap 7 means deleting a trigger, and gap 13 means deleting the alias and the leak.
