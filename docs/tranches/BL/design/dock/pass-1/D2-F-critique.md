# D2 · pass 1 · D2-F · critique

| field | value |
|---|---|
| seat | adversarial CRITIC for family D2-F (discrete rungs, carried by the user agent). I did not author the spec, the research seat or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity (Opus) |
| HEAD | `dd979e28`. Worktree `$C/wt` cut at HEAD, `D2-F-proto.patch` applied (sha1 `5180da4b`, matching the prototype's record), 39 files, +603/−3,665; `src/` alone 27 files, +247/−2,640, plus `useDockChart.ts` (182) and `rungs.css` (111) |
| engines | Chromium 149.0.7827.55 headless; Playwright WebKit 26.5 headless (Playwright 1.61.1), which is not Safari, and whose dock cells carry the harness `+shim`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** for every cell |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-F-crit/`, called `$C`. Builds in `$C/out/builds/{crit,pW1,pW2,pW2b,pW3a,pW3b,pW4,pW5,pW5b}`, full run `$C/out/run-crit.log`, plant runs `$C/out/plant-*.log`, mid-morph frames `$C/midmorph/`, `$C/midmorph-pW3b/`, strips `$C/strip-chromium.png`, `$C/strip-pW3b.png`, probes `$C/probe.mjs`, `$C/probe-wk.mjs`, `$C/demo.mjs`, `$C/shared.mjs`, `$C/dupname.mjs` |
| writes | this file only, in the checkout. The worktree was removed with `git worktree remove --force` before return. Vitest ran with `cacheDir` in `$C`; the checkout's `node_modules/.vite` count of files newer than the run start read 1 before and 1 after (a file another seat wrote) |
| verdict | **RETIRE** the family's center (the user agent as the morph carrier). Salvage four parts into whichever family advances (§7). Convergence **28 %** |

## 1 · Step 1: failures I expected a dock design to hide (written before reading the D2-F spec)

From `PORTFOLIO.md` §0-2 and `HARNESS.md`, before I opened `SPECS.md` §F, `D2-F.md` or `D2-F-proto.md`:

1. **An adapter that defines its own truth.** Every witness reads `window.__dockProbe`. A family that moves the DOM writes its own adapter, and can make `extent()` or `paintingSeats()` agree with the property by construction.
2. **Vacuous morph cells.** A morph that lands in one frame gives W1 one distinct extent. Every sample is a rest, and a rest is round.
3. **Overflow cured by deletion.** W2 asks that the run not scroll when its seats fit. A design that drops the seats that do not fit satisfies it and loses destinations. W2 counts painting seats only.
4. **Paint outside the measured box.** Faces, rings or shadows painted by a node the adapter does not name (a pseudo, a snapshot, a projection).
5. **Interruption.** None of W1-W5 interrupts a running morph. A carrier that cannot retarget passes all five.
6. **Content changes the dock does not own.** O-64 R-2. A design keyed to posture changes is blind to `v-if` seats.
7. **Engine asymmetry.** A mechanism that exists in Chromium only, with a fallback that paints in WebKit. That is E-2's masked fallback, and D-4.
8. **The lens.** No witness reads the backdrop blur. A backdrop-root or clip change can kill it silently (S-28).
9. **A rim that paints but reports nothing.** W5 checks containment and "paints something". A track with a dead fill passes.
10. **Hit-testing and consumer side effects.** Nothing in W1-W5 clicks during a morph, and nothing checks what the library writes onto consumer elements.
11. **Timing margins.** W3 windows sit within a few ms of their allowance (S-4). A green that depends on machine load is not a green.
12. **Gestalt.** Five numeric greens can coexist with a morph that reads as a cross-fade and not as one body with weight and bounce (D-1, D-2).

Items 1, 2, 3, 5-10 and 12 all turned out to apply to D2-F (§3, §4).

## 2 · Reproduction on my own build

`node harness/run.mjs --build $C/out/builds/crit --adapter $C/adapter-f.mjs` (adapter byte-copied from the prototype's scratch), log `$C/out/run-crit.log`:

| witness | prototype claim (d2f2) | my run | agreement |
|---|---|---|---|
| W1 | 32/32; Chromium in-morph worst 0.19-0.22 px; WebKit morph cells 1 distinct extent | **32/32**. Chromium in-morph worst 0.184-0.219 px over 8-11 samples with 5-8 distinct extents. Playwright WebKit morph cells: 4 samples each, **1 distinct extent** | yes |
| W2 | 10/10 | **10/10**. 0 scroller frames on every route; ring cut 0/0; long-h reads "seats need 328 px vs budget 360 (fit)", long-v "520 vs 560 (fit)" | yes |
| W3 | 6/14 printed, 5/14 real; WebKit swap-long "passes" with D 0 px | **5/14 printed**. Chromium 5/7 (content add/remove 179.33 px in one frame, ×9.34 / ×8.54 the bound). Playwright WebKit **0/7**, and this time swap-long is a real FAIL: 245.06 px in one frame | partly: the WebKit swap-long cell flips between vacuous PASS and FAIL across runs, so that witness cell is nondeterministic on this family |
| W4 | 16/16 | **16/16**. Compact 214.13 → 191.69 px (Chromium), 214.16 → 191.72 (Playwright WebKit); band enter 160 / exit 64, 1 flip | yes |
| W5 | 10/10 | **10/10**. Ink 1508/260/1340/260/1966 (Chromium) | yes |
| dock unit tests | 92 passed, 3 failed, 1 expected fail | **92 / 3 / 1** (`GlassDock.click-integrity` ×2, G-DOCK-BUDGET) | yes |
| click at +100 ms into a rung change | Chromium RED (lands on `MAIN`) | Chromium: `elementFromPoint` → `MAIN`, click → `MAIN`; band point → `MAIN`. Playwright WebKit: `t1` receives it (no transition) | yes |
| resting lens | 0.23 after the scoped-name cure | HEAD 0.23, D2-F 0.23 (`lensdock.mjs`) | yes |

W3 margins are thin: Chromium warm-collapse window 251.5 ms against 253.6 allowed (2.1 ms), first expand 268.1 against 276.6.

## 3 · Planted violations: which greens are live

Each plant is one CSS or TS line added to the patched tree, built as its own label, with only the named witness run. Logs are `$C/out/plant-<label>.log`.

| plant | what it breaks | witness result | reading |
|---|---|---|---|
| `pW1`: `::view-transition-group(dock-plate) { border-radius: 30% }` | the morph silhouette becomes a lens | **W1 26/32, exit 1**. The 6 Chromium morph cells FAIL at 4.33-7.23 px. **All 6 Playwright WebKit morph cells still PASS** | Chromium's W1 morph cells are live. **WebKit's are proven vacuous**: they pass with a lensed morph because there is no morph to sample |
| `pW2`: `.dock-run { overflow-x: auto }` | the run is a scroll container again | **W2 0/10, exit 1** (36/36, 73/73, 239/239 scroller frames) | live |
| `pW3a`: `::view-transition-group(*) { animation-timing-function: steps(3, jump-none) }` | the extent jumps in thirds | **W3 0/14, exit 1**. Chromium 193.81 px steps, ×4.68-4.85 the bound | continuity is live |
| `pW3b`: `::view-transition-group-children(dock-box) { overflow: visible }` and unshrunk snapshots | seats paint outside the plate | **W3 still 5/14, "faces out 0 px" in all 14 cells**. The frames (`$C/strip-pW3b.png`) show "Play / Settings / Square" painting wholly outside the plate group at +172 to +280 ms | **the faces check cannot fail.** The family's adapter clips `paintingSeats()` to `extent()` during a transition, and reads each seat's DOM box (its final position), not the image the user sees |
| `pW4`: default band `exit 64 → 158` | hysteresis collapses to 2-4 px | **W4 14/16, exit 1**: 24 flips in 24 moves, both engines | live |
| `pW5`: rim `inset-inline: 0` | the rim reaches the corners | **W5 0/10, exit 1**: 208-269 device px outside, 7.07-8.49 px deep | containment is live |
| `pW2b`: `.dock-more { display: none }` | 8 of 14 long-run seats vanish with no affordance at all | **W2 still 10/10, exit 0** | **W2 cannot see lost destinations.** Folding makes route 1's "exceeds" case a "fits" case |
| `pW5b`: `.dock-rim-fill { animation: none; transform: scaleX(0) }` | the rim never reports progress | **W5 still 10/10, exit 0**; ink 1508 against 1508 unplanted | **W5 reads only the track.** A dead fill is green |

So the greens that the family's claims actually rest on split this way:
- **Live:** W1 Chromium, W2 overflow, W3 continuity, W4, and W5 containment.
- **Cannot fail:** W1 WebKit morph cells, W3 faces, W2 reachability, and W5 fill.

## 4 · New measurements

### 4.1 · The mid-morph picture (the gestalt check)

`$C/strip-chromium.png`, 8 frames of the first expand. Chromium, `morph` scene, DSF 1.
- From the first transition frame, a pale stadium paints at the **final** extent: the dock box's new image.
- The plate group grows inside that stadium.
- The collapsed pill lingers as a third, inner stadium.
- Glyphs double as they cross-fade: "P" sits over "1", and reads "Ᵽ1".
- The tail label is cut mid-word ("Sc").

This reproduces the prototype's §3.2. Read as a user sees it, the morph is three pills cross-fading, not one liquid body. The dock spring is ζ 0.88 run through a `linear()` curve over 210 ms, so there is no visible bounce either: its overshoot is 0.3 % of D (S-14). **Not iOS-27 grade under D-1 and D-2.**

The rest state is clean. `/dock/controls` and the 430 px grid (`D2-F-proto/shots/cmp-controls-1440.png`, `grid-430-light.png`) show whole stadiums and a tidy More seat.

### 4.2 · The lens is gone for the whole morph, on the prototype build

`$C/probe.mjs`, section 3. Chromium, stripes on the scope, sharpness measured inside the plate:

| state | sharpness |
|---|---|
| collapsed rest | 0.29 |
| four samples mid-expand | 29.15, 30.83, 29.43, 30.25 |
| expanded rest | 0.16 |

This re-measures Q2 on the prototype itself. For every rung change, in the one engine that morphs, the glass is a flat tint over a sharp page.

### 4.3 · Interruption

`$C/probe.mjs`, section 1. Hover-expand, then a click-away at +90 ms into the transition.

**Chromium.** The extent strip reads `138:107.45 · 164:164.81 · 187:489.66 · 213:485.06 · 239:426.84 …`:
- one step of **299.03 px** at 180 ms, jumping to the expanded endpoint the user had just left;
- then a glide back down to 102 px.

**Playwright WebKit.** One step of 387.72 px each way.

D-1 fails on every interrupted rung change. Chromium cannot cure this by design, because a new transition captures the committed DOM (Q3, S-16).

### 4.4 · Fold: what the More seat is worth

`$C/probe.mjs` section 2 and `probe-wk.mjs`, `long` scene, identical in both engines:
- 14 seats, of which 8 are folded, and the selected seat "3" is kept;
- Tab plus ArrowRight reach `1…6` and `More (8)`;
- a click on More sets `aria-expanded="true"` and opens nothing (menus before and after: 0).

**8 of 14 destinations have no path by pointer, keyboard or AT.** `aria-haspopup="menu"` with no menu is an accessibility lie. On the demo at 1440 px, `/dock/controls` folds 4 seats (`$C/demo.mjs`), including the "Overview" label seat that HEAD kept one scroll away.

### 4.5 · The scope is the consumer's box, and it is large

`$C/demo.mjs`, D2-F demo build, 1440×900. Each dock's scope (its parent) against the dock:

| dock | scope | dock |
|---|---|---|
| SidebarDock | 80×900 | 64×653 |
| overview icon docks | 1216×122 | 56×56 |
| bottom dock | 1360×68 | 963×56 |
| overflow | 1296×136 | 548×56 |

For the length of every rung change, the whole scope is a pass-through for hit testing (§2). On the overview page, that is a 1216×122 band for a 56 px pill.

`/dock/sections` has **two docks sharing one parent**, so they share one scope. The demo pair is always-expanded, so I could not drive it there. A scratch page in Chromium (`$C/dupname.mjs`) shows what happens when two docks do transition:
- two docks carrying `dock-box` at once make `startViewTransition` reject with `InvalidStateError: Transition was aborted because of invalid state`, and the change commits in one frame;
- a sibling's transition on the same scope preempts the first: the group read 264 px, then the DOM read 500 px in one frame, at +122 ms.

`GlassDock.vue:159-162` writes `--dock-vt-plate-{bg,border,border-width,radius}` inline onto the scope, and the `finished` handler removes only `data-rung-transition`. So the four properties stay on the consumer's element for good. `:has(> .glass-dock)::view-transition-group(*)` also retimes every view-transition group the consumer names inside that scope.

### 4.6 · The rim is bound to the root whatever the source

`rungs.css` hard-codes `animation-timeline: scroll(root block)`. `GlassDock.vue:331` uses `scrollSource` only to stamp `data-source`.

Suppose a consumer passes an element, as in the common app shell where `<main>` scrolls and the document does not:
- the compact rung reads the element (`useDockChart` `bindSource`);
- the rim reads the root, and sits at `scaleX(0)` forever, silently.

That is two sources for one fact (P-3, floor row 2) and a dead primary with no signal (E-2). §3's `pW5b` shows W5 cannot see it.

## 5 · The checklist

| item | answer | evidence |
|---|---|---|
| **Vacuous convergence** | **Yes, in four places** | W1 WebKit morph cells pass under a 30 % lens (`pW1`). W3 faces reads 0 px with seats painted wholly outside (`pW3b`). W2 is 10/10 with More deleted (`pW2b`). W5 is 10/10 with a dead fill (`pW5b`). W3 WebKit swap-long is vacuous in one run and red in the next (§2) |
| **Spec cites itself** | **Yes** | W3's green "faces out 0 px" comes from the family's own `adapter-f.mjs`, which clips `paintingSeats()` to the family's own `extent()`. The prototype's "these totals match the spec's probe totals" compares the probe with itself through that adapter. SPECS F.3 carries the research seat's numbers, and SPECS F.1's "W1 in-frame 0.388 px" is the same seat. None of them is an independent reading of the pixels a user sees, and §4.1 contradicts them |
| **Gates that cannot fail** | **W3 faces, W5 fill, W2 reachability, W1 WebKit morph** | §3 |
| **The elegant-reduction trap** | **Yes; the center is the trap** | "The user agent draws every in-between" is the step that holds everything up. What the user agent does not do is the whole hard part: hit testing (§4.5), the lens (§4.2), retargeting (§4.3), content changes (W3 179.33 px), WebKit (W3 0/7) and silhouette coherence (§4.1). Q5's "5 rungs, 23 edges" also depends on three non-table mechanisms that exist only because the transition steals hit testing. And C-7's capacity turned F into a measuring family: `fold()` unfolds and reads every seat's box on every observer tick and every transition, which is the D2-B work F's center was meant to avoid |
| **Legacy aliases, shims, dual paths** | **The clean break is real; one structural dual path remains** | 2,640 `src/` lines deleted, no aliases, 0 non-comment `data-morphing` or `--dock-morph-t` reads left. The 23 `data-morphing` mentions left are all comments (B-14). The dual path is scoped transition versus instant commit, chosen by `"startViewTransition" in HTMLElement.prototype`. On one target engine the second path is the only path |
| **Masked fallbacks** | **Yes** | WebKit's instant commit paints a working dock while the primary (the morph) is dead. The "loud" signal is a `console.warn` no user sees, so a Safari user gets a dock with no motion at all: E-2 in letter and D-1 in effect. The rim's element source is dead without a signal (§4.6). The plate paint is a one-shot `getComputedStyle` read (B-12), so a veil change mid-morph paints stale |
| **Unverified gestalt** | **Verified by me, and it fails in motion** | Rest: yes. Motion: three stacked pills, doubled glyphs, cut labels, no lens, no bounce, and a 299 px jump on interruption. This does not read as one liquid dock with weight and bounce (§4.1-4.3) |
| **Consumer-less substrate** | **Partly** | `scrollSource`, `compactOnScroll` and `rim` answer value.js's O-55 R-1 and R-2, so there is an asker, but no consumer mounts them yet and the rim cannot serve an element source (§4.6). The More seat and capacity machinery serve no consumer at 390 px or wider. At 360 px they serve keyframes only, and there they hide 2 seats behind a menu that does not exist (`D2-F.md` Q4) |

## 6 · Counterexamples

1. **An interrupted hover** (Chromium): leave or click away within ~100 ms of a hover-expand. The dock jumps 299 px to the abandoned endpoint in one frame, then glides back (§4.3).
2. **A click during any rung change** (Chromium): a scroll-to-top that un-compacts the dock, followed by a tap on a seat, lands on `MAIN`. So does any point in a 1216 px scope band (§2, §4.5).
3. **Two docks in one parent** (`/dock/sections` layout) changing rung within 250 ms of each other: the second preempts the first, which jumps in one frame. Changing together, they abort with `InvalidStateError` and both jump (§4.5, scratch).
4. **An app shell with a scrolling `<main>`**, given `:scroll-source="() => mainEl"` and `rim`: compaction works and the rim never fills (§4.6).
5. **The long run at 360 px**: 8 destinations vanish behind a More seat that opens nothing (§4.4).
6. **Safari** (by Playwright WebKit proxy, with Safari itself UNMEASURED): every rung, swap and content change lands in one frame, and nothing morphs at all (W3 0/7).
7. **keyframes' scene switch** (O-64 R-2): a content change of 16.79 px, and the harness's 179.33 px, land in one frame in both engines. The family cannot see a DOM change before it happens.
8. **The warm expand under load**: the Chromium window closed 2.1 ms inside its allowance on this run (§2). The family's one live motion green is load-sensitive.

## 7 · Verdict

**RETIRE the center; salvage four parts.**

BLOCK would say the family stalls at one missing primitive, element-scoped view transitions in WebKit, and would come back when WebKit ships them. The measurements say otherwise. Everything in the table below except the last row was measured in **Chromium, the engine that has the primitive**:

| defect | why WebKit shipping the API would not cure it |
|---|---|
| the scope's hit-testing pass-through | a property of the pseudo overlay |
| the lens dropping for the whole morph | the same, under the scoped transition |
| no retarget (+220.8 px in Q3, +299 px here) | S-16: every user-agent carrier reverses into a wall |
| content changes that cannot be routed | a transition must start before the DOM changes |
| the triple silhouette | the dock-box snapshot model (§4.1) |
| shared-scope preemption | one transition per scope |
| WebKit | the only row the missing primitive explains |

Five of these are specified behaviour of View Transitions, not implementation gaps. They contradict D-1 (interruption and weight), D-2 (engagement: the lens, the stagger), W3's content cells and E-2 (hit testing, the consumer scope). So the center is refuted on its own best engine.

**Salvage for the family that advances** (each is measured and independent of the view-transition carrier):
1. **`useDockChart`**: a typed statechart, 5 rungs, 23 edges, 182 lines, replacing `useDockState` and `useDockClickIntegrity`. W4 16/16 in both engines, and `pW4` shows the check is live.
   - Its three transition-coupled mechanisms (pointer-position hover, frozen boundary events, `resync`) go away with the view transition.
2. **No scroll container, with capacity by summed seat extents.** W2 is live on overflow (`pW2`).
   - It still needs a real More menu and the owner's ruling on More versus a scroller.
   - It needs a reachability check in W2 (§8).
3. **The rim as a static seat inside a size-contained plate** (`inset-inline: calc(0.6 * 50cqmin)`). Containment is live (`pW5`).
   - It must bind the same source as the chart, not `scroll(root)`.
4. **The scoped-name finding.** A resting `view-transition-name` makes the dock a backdrop root in Chromium and kills the lens: 28.00 against 0.23. Any family that touches view transitions must know this.

**Re-trigger** for reopening the center: a user-agent morph carrier that meets all four of these:
- it retargets with velocity;
- it keeps hit testing on its subject;
- it keeps `backdrop-filter` live inside the group;
- it ships in both Chromium and WebKit.

None is on any public roadmap as of this reading: WebKit standards-positions #611 is open with 0 comments (`D2-F.md` Q1).

## 8 · Convergence and open gaps

**Convergence: 28 %.**

The family closes P1 at rest and in Chromium frames, closes P2 (overflow, but not reachability), closes P4, and closes P5 containment. It leaves P3 open in both engines, in different ways. Its motion gestalt fails, and four of its greens cannot fail.

Open gaps (exact list):
1. **Real Safari:** every cell is UNMEASURED (owner's safaridriver checkbox).
2. **No morph in Playwright WebKit:** W3 0/7. The instant-commit path is a masked fallback (E-2) behind a `console.warn`.
3. **Chromium click-through** across the whole scope for every rung change. Scopes measure up to 1360×68 and 1216×122 around 56-963 px docks.
4. **The lens is absent for the whole morph:** 29-31 against 0.16-0.29 at rest.
5. **No retarget:** a 299.03 px one-frame jump on a click-away at +90 ms (Chromium), 387.72 px (Playwright WebKit).
6. **Content changes are one frame:** 179.33 px (Chromium) and 179.39 px (Playwright WebKit). This is structural.
7. **The mid-morph silhouette:** the outer final-extent stadium, the growing plate and the lingering collapsed pill. Glyphs double and labels are cut. No bounce.
8. **The W3 faces check cannot fail** through `adapter-f.mjs` (`pW3b`). A harness-level pixel faces read is owed.
9. **W1's Playwright WebKit morph cells are vacuous** (`pW1`), and the W3 WebKit swap-long cell is nondeterministic across runs.
10. **The More seat opens nothing.** 8 of 14 `long` destinations are unreachable, and W2 cannot see it (`pW2b`). The owner has not ruled on More versus a scroller.
11. **The rim is bound to `scroll(root)` whatever `scrollSource` says,** so an element source is dead. W5 cannot see a dead fill (`pW5b`).
12. **The library writes four custom properties onto the consumer's scope and never removes them.** It also retimes every view-transition group the consumer names in that scope.
13. **Shared-scope docks:** preemption and duplicate-name aborts (scratch-measured; the `/dock/sections` layout has such a pair). Not driven on the real dock.
14. **The reveal stagger is lost** (D-2). There is no replacement.
15. **The selected-seat accent shift on `/dock/controls`** is not isolated. It is visible in the prototype's before/after composite. My HEAD demo scan read 0 docks, so it was not re-sampled.
16. **DockProps is 9 against the six-member budget**, and 2 click-integrity tests are RED.
17. **The capacity cost:** a synchronous unfold, measure and fold on every ResizeObserver or MutationObserver tick and every transition. It is unmeasured.
18. **The plate's grain is not painted during the morph,** and its paint is a one-shot read (B-12).
19. **Stale comments:** 23 `data-morphing` and `--dock-morph-t` mentions remain in `src/` comments.
20. **Composition was not run** for the fourier CanvasControlsDock scope or value.js's four-layer dock.
