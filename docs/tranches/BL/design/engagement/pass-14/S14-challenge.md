# D5 pass 14 · S14 challenge (§P13c-8.2 wave 1b): S14 attacked statically and by library-free engine reads in both engines

| field | value |
|---|---|
| seat | the S14 challenge (§P13c-8.2 wave 1b; §P13c2-7). A fresh Opus seat: it authored no D5 seat and was no critic in passes 3-13. **It scores no row.** Every finding below is for P-E14 to fold into S14, and record, before H14 starts |
| model | `claude-opus-5-5`, asserted from own system identity |
| status | **COMPLETE.** Every cell ran in both engines. `guarded` admitted every run and refused none. Nothing is held |
| base | HEAD `d69de2412`, docs only (the c4b part landed at `05520d9f9`). `P-E13.patch` `ffa64fc4054bf5368000f29bd3930b47743f115f` (this seat's `shasum`) was applied in this seat's own worktree `.claude/worktrees/bl/D5/p14/S14ch/wt` and read back by `pass-13/H13c/builds.sh`'s `th()` as src tree **`30f51077c3ec`**, the tree of record. Every `src` line cited below is from that tree |
| rulings | `../../audit/INBOUND.md` re-read at start (mtime 2026-11-04 23:02, last row **O-153**). A scan of O-150..O-153 for D5, CK-, engage, stage, held and loupe finds none, so nothing to fold. `../../FORMATION-PROGRESS.md` re-read at start (mtime 2026-11-05 01:10; last line: C-A13-complete-2 done, c4b running; c4b has since closed at `05520d9f9`). In force: O-103d (1)-(4), O-103f, Q-1 (c), Q-4 (b), O-118 (3), **O-87**. Standing law E-1, E-2, D-1, D-2, D-3, P-1, P-3 |
| read in full | `pass-14/P-E14.md` (S14 with its FOLD, all 377 lines); `S14-records/facts14.mjs` and its N12 log lines. In REGISTRY.md, read in chunks: "D5 · pass 13 · completion" (3434-3657), "completion 2" (3661-3770), the pass-13 part (3223-3433) and §P1-6 (283-330). `pass-13/P-E13.md` §7 (C-2, C-9). From cand13: `stage.ts` 120-200, 213-253 and 340-445; `settle.ts` 60-125; `useEngage.ts` 175-232 and 400-425; every consumer line of the eight `--engage-<role>-attack/-release` tokens (grep, §2 F13); `tokens/sizing.css` 118-126 and 326-340; `tokens/motion-registers.css` 170-187 |
| left unread, stated | **The rest of REGISTRY.md** (round 0, and passes 1-12 beyond §P1-6). The task asked for the whole file. This seat read the four parts the pass-14 plan rests on and stopped there. No finding below rests on an unread part: each one is against S14's own text, cand13's bytes, or a cell this seat ran. `H13c`, `E13c`, `CA13c` and `CE13c` beyond what REGISTRY and S14 quote |
| instruments | `S14ch-records/challenge14.mjs` (`shasum` `57ca8fd5eaea`): 11 cells, X1-X11. They are library-free: each page is set by `setContent`, and no glass-ui byte is loaded. One browser per run and a fresh context per cell; every context and the browser are closed in a `finally`. Logs: `logs/challenge14-chromium.log`, `challenge14-chromium-x10rr.log` (X10 read twice more), `challenge14-webkit.log`, `challenge14-webkit-x10rr.log`, `wk-queue.log` |
| engines | Chromium 149.0.7827.55 (headless shell, about 120 frames/s on this host) and Playwright WebKit 26.5 (about 60 frames/s), playwright 1.61.1, no GPU arguments. **Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every cell |
| loads | Chromium: 1-min load 16.0-18.2 (01:36-01:38). WebKit: 9.9-12.3, in **one** `--exclusive webkit --timeout 30` acquisition, queued 01:38:17, admitted 02:12:26 (a 34-min wait), exit 0 at 02:12:54. None of the cells measures a timing bound. X10 counts frames and has a rate in it, so it was read three times per engine. All three agree (§2 F7) |
| fences | No edit to tracked source and no git write in the checkout. P-E13 was applied only in this seat's worktree, which is removed at close. Writes in the checkout: this file and `S14ch-records/` only. No sibling repo was read or run. Nothing under `~/.claude` was read; the guard was only executed. No `find`, `fd`, `rg`, `du` or `tree` walk was made over `/`, `~` or `/Users` |

Short citations: `X1`..`X11` are this seat's cells, `N1`..`N14` are S14's cells, and `b.n`, `M<n>` and `§S14-x` are S14's sections and rows. "Both engines" means the two engines' log lines are identical to the figure unless the row says otherwise.

## 0 · In brief

S14's invariant (§S14-a) is the right statement. Its construction (§S14-b) separates the carrier from the place by the layout key K and the scroll offsets. This seat finds **eight places where the engine puts a member on the wrong side of K**, all read library-free in both engines (WebKit alone for two), plus **four members past S14's ranges by its own arithmetic**, and **five statement and enumeration gaps**. None is fixed here. Each finding names the S14 section it breaks and the member H14 needs as a cell.

| # | finding | where it breaks S14 | read | engines |
|---|---|---|---|---|
| F1 | **Scroll anchoring that leaves the host's chain unchanged** (the anchor node is in a sibling column) is classified "a scroll asked for" and carried: a **40.0 px cut**, page and scroller | b.4 rule; M13's range | X3 | both, identical |
| F2 | **A transform onset or end on a non-positioned ancestor changes K**, because the ancestor enters or leaves the `offsetParent` chain. The onset frame's carrier motion is glided against the carrier (an instant card scale 1.25: **10.19 px**). `will-change: transform` alone changes K | b.1 step 1, b.3 row 1, M5, M7, M15 | X1 (a)-(d); S14's own N12 log | both, identical |
| F3 | **`position: sticky` under a scroll**: the frame the scroll sticks the box changes the chain, so b.4 glides the scroll's pre-stick part (**10.0 px** here, at most one frame's scroll delta) | b.4 rule ("a chain change owns every S change"); P-E13 C-2 claimed sticky "by construction" | X2 | both, identical |
| F4 | **Another ResizeObserver's write in the same resize step is missed on its frame**: it paints unglided, and the next frame glides back from the pre-write place. In Chromium this happens when the observer was created after the stage's or delivers in a second round. **In WebKit it happens in all three orders** | b.1 (the read's place in the frame); N2 read rAF callbacks only | X7 | both; WebKit wider |
| F5 | **An `!important` `translate` on the host makes the probe and the glide inert** (0.000 px for a 40 px probe and a 40 px glide). S14 lists this limit as "moot for the chosen read", but it is not moot for the probe and the glide, which are `translate` animations | §S14-0 item 5, M3, b.1 steps 4-5 | X5 | both, identical |
| F6 | **A scroll-snap re-snap with the chain unchanged** (`scroll-snap-align: center`, the snapped item grows below the host) is carried: a **50.0 px cut** in WebKit. Chromium does not re-snap here. The library's own snap scrollers use `start`, which re-snaps in neither engine | b.4 rule | X4 | WebKit only |
| F7 | **b.6's carry rule misreads two members:** (i) equal steps on consecutive frames (one 16 px line per frame above the held control, 960 px/s, inside b.6's range) are carried, so every frame after the first cuts 16 px; (ii) a smooth layout animation whose per-frame rate is near 1 px gets integer-chain still frames, which reset s₋₁, so b.6 glides about 20 onsets per second (**13.5-13.8 px** glided in total in WebKit, **16.7-17.8 px** in Chromium, 3 of 3 reads each) | b.6, M18 | (i) by the statement; (ii) X10 | both |
| F8 | **A union read whose declaring class arrives after first style, under `transition: all … allow-discrete`, reads `stage-unset` for half the duration** (+0 and +116 ms, the value at +216). That is a false loud refusal, and the reach is written 1 | §S14-e N4 limit ("never refused"; "taken at the hold and on a resize") | X9 | WebKit only |
| F9 | **An ancestor's changing CSS zoom (M22, read now) changes the chain**: offsets in the host's unzoomed px, 80 → 72, and a 10.0 px painted move. a.2 lists zoom as a carrier, but the construction classifies it as a step and glides it. S14 contradicts itself here | a.2, M22 | X8 | both, identical |
| F10 | **The released host may never leave the stage.** `leave()` awaits every subtree animation with a finite `endTime`. A paused finite animation and a `view()`-timeline animation never settle. Under b.8's per-frame read for released hosts, the loop then runs at rest indefinitely (CK-16) | b.8, MIGRATION row 3 ("at rest nothing runs") | X11 + `stage.ts:420-424` | both, identical |
| F11 | **M6's stated bound understates M6's own range**: a sine carrier of 80 px at 200 ms moves up to 41.9 px per 16.7 ms frame, against "2.7 px a frame". M6 is also triggered by any K change, including a link's size change with the host's place unchanged (X1 (e)), not only "an insert above" | M6, b.4 limit 2 | arithmetic; X1 (e) | both |
| F12 | **b.6 × M5, not enumerated**: a layout change on the chain every frame during a carrier loop makes every frame a step frame. s − s₋₁ then holds the carrier's acceleration (**22.0 px per frame²** for 80 px at 200 ms; 2.4 at 600 ms), all above the 0.5 px floor, so the carrier is resisted every frame | §S14-c (no row), b.6 | arithmetic | — |
| F13 | **§S14-e's consumer enumeration is partial**: 5 of 10 CSS files that consume the envelope clocks, and an indirect consumer with a **fallback** (`segmented.css:261`) that computes a value the read refuses. Readers outside the four-function call graph: `--rung-class` (read, with a silent empty answer), `transformOrigin`, `currentCSSZoom` | §S14-e | grep at `30f51077c3ec` | — |
| F14 | **S14 misquotes its own N12 log**: "the chain's sum is the same under all five card kinds (110, 132)". The static card reads **110,131** in both engines. That 1 px is F2's mechanism | §S14-b.1 step 1, §S14-d N12 | `S14-records/logs/facts14-webkit.log` N12 | both |
| F15 | **MIGRATION wording**: row 7 says only `em`/`cq*` gutters set on a nearer element stop reaching the reach, but every nearer `--space-section` does; row 4 "No observer" leaves out the per-host `data-state` observer that stays, and the `data-engage-arming` attribute written at mount | §S14-g | bytes | — |

**Non-counterexamples, read** (§3): a consumer `transition: translate` or `transition: all` on the host starts no CSS transition from the probe or the glide (X6, both engines). Re-snap under `start` alignment, the library's form, does not happen (X4, both). Class arrival under `transition: all` without `allow-discrete` reads the value at once (X9, both). **Two of S14's owed reads are supplied:** M10 (X10: the painted move on a chain-unchanged frame is 0.13-0.95 px in Chromium and 0.25-0.72 px in WebKit, inside the limit "at most 1 px × the carrier's scale") and M22 (X8, F9).

## 1 · What was attacked, and how

The charter (§P13c-8.2 wave 1b) names four attacks: a member past S14's ranges, a fact unread in one engine, a consumer expression not enumerated, and a limit claimed away. Each finding below is tagged with one. The method was:
- **Against K.** A move whose K behaviour S14 asserts but did not read: transform onsets, sticky, anchoring outside the chain, re-snap, zoom, link sizes, the integer rounding of a slow animation.
- **Against the frame.** What else writes in the resize step where S14 reads (another ResizeObserver).
- **Against the probe and the glide.** Cascade rules that beat a WAAPI `translate` (`!important`), and consumer transitions on `translate`.
- **Against the declared read.** Class arrival under `allow-discrete`, and the whole consumer list by grep rather than S14's citations.
- **Against b.6 and b.8.** By the statement and by arithmetic on the ranges S14 itself gives.

## 2 · Findings

### F1 · Anchoring with the host's chain unchanged is cut (both engines) — a member past M13's range

**Cell X3.** Two columns in one scroller (and again on the page). The host is in the right column, and the page is scrolled to 500. A 40 px block is inserted at the top of the left column, above the engine's anchor node. Both engines, identical:

> `scroller: … scrollTop 500 → 540 · range 1820 → 1820 · host chain SAME · host painted Δ -40.000`
> `page: … scrollTop 500 → 540 · range 1320 → 1320 · host chain SAME · host painted Δ -40.000`

b.4's rule reads this frame as "the chain unchanged, S changed: a scroll asked for, carried". The adjustment is the engine's, made as a consequence of a layout change, which is exactly what a.2 puts in the place. The host is cut 40 px on the frame. M13's range ("page and scroller, insert and remove above") holds only inserts on the host's own chain. **The geometric rule in b.4 cannot tell an anchoring adjustment from a scroll someone asked for when the layout change that caused it is off the host's chain.** H14's cell: X3's two scenes, inserts of 20-200 px, with the anchor in a sibling column, a sibling grid cell and a sibling flex item.

### F2 · A transform onset or end changes K (both engines) — a fact unread, and a limit claimed away

**Cell X1.** A non-positioned card holds the host. Both engines, identical keys:

| case | K | sum | painted Δ on the read |
|---|---|---|---|
| (a) instant `scale: 1.25` on the card (D9's member) | CHANGED: `h(10,81)>g` → `h(10,41)>c(0,41,600x71)>g` | 110,131 → 110,132 | 10.188 px (both) |
| (b) a `rotate` transition from `none`, two frames in | CHANGED, the same way | 110,131 → 110,132 | −2.812 (Chromium) / −5.401 (WebKit) |
| (c) an `@keyframes` entrance with no fill, mid-run → after its end | CHANGED, back | 110,132 → 110,131 | 35.556 / 31.200 |
| (d) `will-change: transform` added, no transform | CHANGED | 110,131 → 110,132 | 0.000 |

N12 read that a transformed card is an `offsetParent`, so **a transform's onset and end change the `offsetParent` chain**. The per-link offsets change (81 → 41 relative to the new parent), and the sum moves by the rounding of one more link (131 → 132). b.3's first row ("any transform-family value on any ancestor, by any writer: K unchanged, carried") holds only while the transform runs. On the frame it begins or ends, S14 classifies the frame as a place step and glides s, which is the painted displacement and includes the carrier's own motion on that frame: 10.19 px against an instant scale, the first-frame sample of a transition, and the last frame of an entrance. Those are M15, M7 and CA13c §2.2's own members, on the wrong side for one frame each. S14 must state a K that is invariant under `offsetParent` membership changes (for example the chain's offsets resolved in one fixed ancestor's frame, or sizes and offsets of a fixed link set taken at the hold), and read it in both engines. **H14's cells:** X1 (a)-(d), plus `contain: paint`, `filter`, `perspective` and `offset-path` onsets on the card, each class-applied and transition-applied.

### F3 · `position: sticky` under a scroll (both engines) — a member past b.4

**Cell X2.** A 50 px sticky box at 100 px holds the host (scroller and page). Both engines, identical:

> `scrollTop 90 → 150 (ΔS 60) · chain CHANGED (Δsum y 50) · painted Δ -10.000`; stuck frames: `chain CHANGED (Δsum y 100) · painted Δ 0.000`

The sticky offset is on the chain (its `offsetTop` grows with the scroll while it is stuck). On the frame where the box sticks, b.4's "a frame whose chain changed attributes all its offset changes to that layout change" makes the frame a step, and it glides the 10 px of the asked-for scroll that went by before the box stuck. Stuck frames read s = 0, which is harmless. The same mechanism fires when the box unsticks and when the containing block's end pushes it. The glide is at most one frame's scroll delta, which M12's range puts at 1-400 px. **P-E13 C-2 listed `position: sticky` as "by construction, not driven"**, and S14 inherits that claim without a row. H14's cell: X2, sticky top and bottom, page and scroller, wheel deltas across the stick, unstick and containing-block-end boundaries. The library has no sticky engagement host, so this is a consumer member: a held Slider in a sticky toolbar.

### F4 · Another ResizeObserver's write in the stage's resize step (WebKit wider) — a fact unread in both engines

**Cell X7.** The stage's observer reads the host's top in its callback. Another observer inserts 40 px above the host in its own callback at frame 5. The host's top is 50 before the insert and 90 after.

| order | Chromium: the stage's read at frame 5 | WebKit |
|---|---|---|
| the other observer created **before** the stage's | **90.0, seen** | **50.0, missed** |
| the other observer created **after** the stage's | 50.0, missed | 50.0, missed |
| the write made in a **second** delivery round (a deeper target) | 50.0, missed | 50.0, missed |

When the read misses, the write is laid out and painted on that frame (N13: writes made in the resize step are laid out before paint), with no glide. On the next frame s is measured from the remembered pre-write P°, so the stage glides the host back to a place it already left: a cut, then a jump back, then the glide. cand13 creates its observer at the first hold (`stage.ts:372-375`, `startFrames`). So every observer created during a hold runs after it, and in WebKit every observer does. The library's own ResizeObserver users include `dock/composables/dockMorphMeasure.ts`, `data-table/composables/useDataTableResponsive.ts`, `fading-scroll/composables/useFadingScroll.ts`, `ToggleGroup.vue` and `morph/useSelectionIndicator.ts`. This seat did not drive them; whether each one writes above a held control is H14's to place. **N2 read only rAF callbacks.** S14 must state where its read sits relative to other observers' writes in each engine, or state the limit with this read. H14's cell: X7's three orders, both engines.

### F5 · An `!important` `translate` on the host (both engines) — a limit claimed away

**Cell X5.** Both engines, identical:

> `sheet translate 10px 0 !important: probe (40, 0) moves the box (0.000, 0.000) · a running add glide of 40 px paints 0.000 px`; the same for inline `!important` and for `translate: none !important`; `transform: rotate(10deg) !important` does not block (40.000)

S14-0 item 5 lists "an `!important` transform (moot for the chosen read)". The read is K, which is moot, but **the probe (b.1 step 4) and the glide (b.1 step 5) are `translate` animations, and an important author declaration beats them.** The probe map is then singular, and cand13's `translateFor` returns `null` on a singular map (`stage.ts:188`). So every step on such a host is cut. Whether that is loud is not stated. E-2 asks for the primary to work or fail loud. Tailwind's `!translate-*` important modifier is the ordinary consumer form. S14 must state this as a limit with this read and say what the stage does (one loud error by name, at the hold). H14's cell: X5's three blocking forms, with the `transform !important` control.

### F6 · A re-snap with the chain unchanged (WebKit only) — a member past b.4

**Cell X4.** A `y mandatory` scroller of 300 px items, with item 2 snapped and holding the host near its top. Item 2 grows 300 → 400 px below the host:

> WebKit `align center: … scrollTop 600 → 650 · host chain SAME · painted Δ -50.000`; Chromium `scrollTop 600 → 600 … no re-snap`; `align start`: no re-snap in either engine

On this cell WebKit re-snaps after the layout change and Chromium does not. Where the engine re-snaps, b.4 carries an engine adjustment as "a scroll asked for": a 50 px cut. The library's `carousel/styles.css:39` and `deck/styles/stage.css:115` use `start`, which did not re-snap here. So this is a consumer member in WebKit. H14's cell: X4 with `center` and `end`, both engines.

### F7 · b.6's carry rule (both engines) — a member past b.6's range, and a range claim

**(i) Equal steps on consecutive frames, by the statement.** b.6 glides s − s₋₁ and carries s₋₁. Take a list that grows by one 16 px line every frame above the held control (a streaming reply, a log tail, rows hydrated one per frame). That is 960 px/s, inside b.6's stated range of 0-1000 px/s. Frame 1: s = 16, glided. Every later frame: s − s₋₁ = 0, carried, so a **16 px cut per frame**. The invariant (a.3) makes each insert a place step to glide. **K cannot tell a constant-rate layout animation from a train of equal inserts**, so b.6 sorts by a mechanism again, the class §P13c-8.1 retired. Every-other-frame inserts are glided (the still frame between them resets s₋₁) and every-frame inserts are cut, so the treatment depends on the rate. H14's cell: one inserted line per frame, and per two frames, at 8-40 px.

**(ii) Integer still frames reset the carried velocity (X10).** An ancestor's `margin-top` ramps linearly. The chain is integer (N12), so at about 1 px or less per frame some moving frames leave every rounded offset unchanged. b.6 calls those still frames, resets s₋₁ to 0, and glides the next frame's whole step:

| ramp | engine (frames/s) | moving frames with the chain unchanged | b.6 onset glides, px glided over 1 s | reads |
|---|---|---|---|---|
| 40 px / 1 s (≈ 0.67 px per frame) | WebKit (60) | 20-21 of 60-61 | **20 glides, 13.52 / 13.78 / 13.75 px** | 3 of 3 |
| 100 px / 1 s (≈ 0.83 px per frame) | Chromium (120) | 20-21 of 120-121 | **20 glides, 17.81 / 16.88 / 16.73 px** | 3 of 3 |
| 12 px / 1 s | both | most | 0 (each step is under the 0.5 px floor) | 3 of 3 |
| 100 px / 1 s | WebKit (60) | 0 | 1 glide (the onset), 1.69-1.89 px | 3 of 3 |

So the claim that "a constant-rate layout animation is carried exactly after its first frame" fails in a band near one layout px per frame, which depends on the engine's frame rate. The held host trails a smooth animation by overlapping sub-px glides, 20 a second. Each glide is ≤ 1 px, so this is below the act's bound frame by frame. But it is a resisted carrier motion that the statement says does not happen. The loads were Chromium 16.7-18.2 and WebKit 10.3-12.3, and every read agreed. H14's cell: the ramp at 0.3-1.5 px per frame, both engines.

### F8 · Union read under `transition: all … allow-discrete` (WebKit only) — a fact unread in one engine, and a limit claimed away

**Cell X9.** `@property --u-time { syntax: "<time> | stage-unset"; initial-value: stage-unset }` (S14's syntax, N5) is declared by a class added after the element's first style:

> WebKit `transition: all 300ms linear allow-discrete · --u-time +0 stage-unset · +116 stage-unset · +216 0.21s · +402 0.21s`; without `allow-discrete`, and in Chromium under all three forms: `0.21s` at +0

In WebKit the ident-to-time change is a discrete transition under `allow-discrete`, so the read returns the refusal ident for half the duration. **That is a false loud refusal, and the reach or clock falls back to the refused path.** §S14-e's N4 paragraph says the declared read under `transition: all` "is never refused", and that "the read is taken at the hold and on a resize". The bytes take the commit reads one frame after mount and again on every `data-state` edge (`useEngage.ts:405-417`, the arming rAF and the `edges` observer). Members: a component whose `engage-*` class binds after mount, such as Chip's `static` ↔ selectable modes, read at the next edge or hold within one transition duration. S14 must state this limit with its read in each engine, and correct where the reads are taken. H14's cell: X9's three forms, both engines, with a Chip mode switch.

### F9 · M22 read: a changing ancestor zoom changes the chain (both engines) — S14 contradicts itself

**Cell X8.** Both engines, identical:

> `ancestor zoom 1 → 1.25: chain CHANGED · sum 110,130 → 110,122 · painted (Δx 2.500, Δy 10.000)`; `h(10,80,…)` → `h(10,72,…)`; `sibling above zoom 1 → 1.25: chain CHANGED · sum 110,130 → 110,140 · painted Δy 10.000`

Offsets are reported in the host's own unzoomed px, so an ancestor's zoom change rewrites the chain (80 → 72) while the paint moves 10 px. The construction classifies it as a step and glides it. But a.2 puts "CSS zoom" among the carrier's values, which are "carried and never resisted". S14 must choose one treatment and state it. Note that the sum is not invariant across zoom, so any K built on it needs a rule. The sibling-above case is a step either way. M22 moves from "unread" to read.

### F10 · The released host may never leave the stage (both engines) — a limit claimed away (CK-16)

**Cell X11**, which applies cand13's `leave()` filter (`stage.ts:420-424`: every subtree animation whose `endTime !== Infinity`, awaited through `finished`):

> both engines: `paused: 1 awaited (endTime 300) · settled within 1.5 s: NO`; `view() timeline: 1 awaited (endTime NaN) · settled within 1.5 s: NO`; the running control settles. (The 3 × 1 s row's "NO" means only that it outlasts the cell's 1.5 s window: it settles at its 3 s end.)

A paused finite animation's `finished` never resolves. A `view()`-timeline animation has `endTime` NaN, which passes the filter, and settles only if the scroll reaches its end. cand13 stops the frame loop at release, so this cost cand13 nothing per frame. **b.8 keeps the per-frame read running for every released host until `leave()` resolves.** So under S14, a paused or scroll-timeline animation anywhere in the host's subtree keeps the per-frame read running at rest indefinitely, and a long finite one keeps it running for its whole length. The library ships both forms: `animation-play-state: paused` in `sortable-list/styles.css:256`, `StatusDot.vue:286` and `Skeleton.vue:112`, and `view()` timelines in `styles/scroll-choreography.css:114, 120`. MIGRATION row 3's "at rest nothing runs" does not hold for these members. S14 must bound the exit read (for example by the host's own exit clock, not every subtree animation) and say so. H14's cell: X11's forms in a released host's subtree, with CK-16's 0 rAF/s reading.

### F11 · M6's bound and M6's trigger — a member past M6's stated range

- **The bound.** M6 says "by at most one frame's carrier motion (2.7 px a frame for 80 px in 500 ms)". That is the linear ramp. M5's range, which M6 inherits, includes a sine of amplitude 80 px and period 200 ms. Its peak velocity is 2π · 80 / 0.2 = **2513 px/s, or 41.9 px per 16.7 ms frame** (20.9 px at 120 frames/s). The extremal cell glides about 15× the stated figure: the held control comes apart from its card by up to 42 px and decays on the `dock` row.
- **The trigger.** M6 fires on any K change in a carrier frame, not only on "an insert above". X1 (e) reads K CHANGED with the host's place unchanged when 30 px is inserted below the host (the card's and the root link's sizes change), in both engines. Any layout change on any link of the chain while a carrier moves therefore glides that frame's carrier motion: a footer's text, a body height, a log below the control. S14 chose K to include link sizes for the Dialog's re-centring (b.1 step 1). That choice is what makes every size change on the chain a step.
- **A lead, not a ruling:** measure the step as the paint of the layout change under the current map (J · Δ in the frame where Δ occurs; N11's in-frame −Δ is exact), not as the painted displacement over the frame. That would leave the carrier's motion out of s by construction.

### F12 · b.6 composed with M5 — a member not enumerated

When a layout change happens on the chain every frame (a layout-property animation, or a page loop that changes a link's size every frame, as in F11's trigger) while a transform carrier loops, every frame is a step frame. Then s − s₋₁ contains the carrier's frame-to-frame change, which is its acceleration times the frame interval squared:
- for 80 px at 200 ms, 80 · (2π/0.2)² / 60² = **22.0 px**;
- for 80 px at 600 ms, **2.4 px**;
- both are above the 0.5 px floor.

So b.6 glides the carrier's acceleration every frame, and the carrier is resisted: finding 3's failure in a new form. No §S14-c row has this composition. H14's cell: M5's sine carrier with M18's ramp on the chain at the same time, and with a page loop writing a size-changing text node in the card.

### F13 · §S14-e's enumeration, by grep at `30f51077c3ec` — consumer expressions not enumerated

`grep -rn -E "engage-(press-drain|medium-exit|control-engage|signal-decay)-(attack|release)" src` finds consumers in ten CSS files. S14's table cites five of them (`control-bit.css`, `engage.css`, `segmented.css`, `sortable-list/styles.css`, `card/styles.css`). **Not enumerated:**
- `_shared/menu/menu.css` 25-28, 48-51, 68-72 and 86-89;
- `button/styles.css` 92-96, 286 and 292;
- `switch/styles.css` 51 and 71;
- `toggle-group/styles.css` 78-79 and 93-94;
- `configurator/styles.css` 562 and 572.

Each of these is a bare `var()` in a transition list, so the declared read equals it. **One indirect consumer computes something else:** `segmented.css` rebinds `--eyeglass-light-clock: var(--engage-control-engage-release)` (`:203`) and `var(--engage-control-engage-attack)` (`:225`), and consumes it at `:261` as `box-shadow var(--eyeglass-light-clock, var(--duration-fast))`. With the token unresolvable, the consumer silently runs `--duration-fast` while the read refuses loudly. That fails §S14-e's own rule that "the read takes exactly what that expression computes, in that consumer's context". It is also a masking fallback in the library's own consumer (E-2), owned by whoever owns `segmented.css`.

**Readers outside the four-function call graph** (`getComputedStyle` in `engage/`):
- `useEngage.ts:184` `commitsByClass` reads `--rung-class`. An empty read makes `pops` false, which skips the crest and panel reads silently.
- `useEngage.ts:218` reads the body's `transformOrigin` (the carry).
- `stage.ts:168` reads `currentCSSZoom` (the top-layer map).
- `useEngage.ts:414` reads `transitionProperty` (priming).

"By call, not by name" needs these callers too, each with its consumer and its refusal.

### F14 · S14 misquotes its N12 log

§S14-b.1 step 1 and §S14-d N12 say "the chain's sum is the same under all five card kinds (110, 132)". S14's own logs read `static card: … sum 110,131` against `110,132` for the other four, in both engines (`S14-records/logs/facts14-webkit.log`, N12; the Chromium log agrees). The extra rounded link is F2's mechanism, sitting in S14's own record.

### F15 · MIGRATION wording (CK-22)

- **Row 7** says "an `em` or `cq*` gutter set on a nearer element no longer reaches the reach". Any nearer `--space-section` stops reaching it, whatever its unit, because the read is declared on `:root`. The library sets the token on `:root` only (`tokens/sizing.css:124`, and `:336` inside a media query on `:root`). So this is a consumer path, and the row should say "any".
- **Row 4** ("No observer") is true of the document-wide observer. The per-host `data-state` observer (`useEngage.ts:412-413`) stays, and so does the `data-engage-arming` attribute that is written at mount and removed one frame later (`:409-415`), which a consumer's selectors and observers can see. The row should name both.

## 3 · Read, and not counterexamples

| cell | read | engines |
|---|---|---|
| X6 | a consumer `transition: translate 300ms` (the `menu.css:29` form), or `transition: all 300ms`, on the host: the paused add probe paints 40.000 and 0.000 after cancel; no CSS transition is started (`animations then: none`); the glide ends with no transition and paints 0.00 on each of the 6 frames after | both, identical |
| X4 `start` | the library's snap alignment: no re-snap when the snapped item grows below the host | both |
| X4 `center` | no re-snap in Chromium on this cell (WebKit re-snaps: F6) | Chromium |
| X9 | class arrival under `transition: all` without `allow-discrete`, or with no transition: the value at +0 | both |
| X10 → M10 | **M10's owed read**: the painted move on a frame whose integer chain is unchanged is at most 0.125-0.953 px in Chromium and 0.250-0.719 px in WebKit, inside S14's limit "at most 1 px × the carrier's scale" | both |
| X1 (e) | an insert below the host leaves the host's painted place unchanged (0.000) and s = 0. It is harmless alone. With a carrier on the same frame it is F11 | both |

## 4 · What P-E14 folds before H14 starts

| finding | S14 section | the change S14 owes (statement, not a cure chosen here) | H14 cell |
|---|---|---|---|
| F1, F3, F6 | b.4 | a classification of scroll that does not rest on "the host's chain unchanged": anchoring and re-snap caused off the chain, and chain changes caused by the scroll (sticky) | X3, X2, X4 + ranges |
| F2, F9, F14 | b.1 step 1, b.3 row 1, a.2, N12 | a K invariant under `offsetParent` membership (transform, `will-change`, `contain`, `filter`, `perspective`, `offset-path` onsets and ends), a zoom rule, and the corrected N12 sentence | X1 (a)-(d), X8 |
| F4 | b.1, N2 | the read's order against other resize observers, both engines, or the limit stated with X7 | X7 |
| F5 | §S14-0 item 5, M3 | the `!important` `translate` limit stated, with what the stage does (loud) | X5 |
| F7, F11, F12 | b.6, M6, M18, §S14-c | b.6 restated so a train of equal steps is glided and an integer still frame does not reset the velocity; M6's bound at its extremal cell; the M5 × M18 composition as a row | F7 (i), X10, F12's scene |
| F8 | §S14-e N4 | the `allow-discrete` limit in WebKit, and where the reads are actually taken | X9 + Chip mode switch |
| F10 | b.8, MIGRATION 3 | a bounded exit read | X11 forms |
| F13 | §S14-e | the complete consumer list; `segmented.css:261`'s fallback named; the `getComputedStyle` readers added to the call graph | static census |
| F15 | §S14-g | rows 4 and 7 reworded | — |

## 5 · Process

- **Machine law.** Every browser run went through `~/.claude/guard/guarded`, never `--light`:
  - Chromium: two calls, `--timeout 20` (all cells; it waited about 13 min for admission behind other seats' browser runs) and `--timeout 15` (X10 twice).
  - WebKit: **one** `--exclusive webkit --timeout 30` acquisition for the whole script plus X10 twice (`logs/wk-queue.log`: queued 01:38:17, admitted 02:12:26, exit 0 02:12:54).

  Headless shell, no GPU arguments, no browser MCP. One browser per run, a fresh context per cell, every context and the browser closed in a `finally`. 11 page loads per WebKit run, far under the 60-load restart rule. No page closed early. `guarded` refused nothing.
- **One cell was added before any run loaded the script.** X11 was added to `challenge14.mjs` while the Chromium call waited for admission; that call's log was still empty, so node had not started. Both engines read the same script, `57ca8fd5eaea`.
- **Fences.** P-E13 was applied only in `.claude/worktrees/bl/D5/p14/S14ch/wt` (`node_modules` symlinked; the checkout has no `tests-visual/node_modules`), read back as `30f51077c3ec`, and removed at close by `git worktree remove --force`. The now-empty parents `p14/S14ch` and `p14` that this seat created were removed by `rmdir`. No edit to tracked source and no git write in the checkout. No sibling repo was read or run. Nothing under `~/.claude` was read.
- **Reading.** REGISTRY.md was read in chunks, the four parts listed in the header. The rest is unread, as stated.
