# BM study, pass 4: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing. Apart from this file, the only thing I wrote in the repo is the owed check `pass-4/critique-B-check.mjs`, kept there because its run was refused and is owed. My arithmetic is in my scratchpad.

**What I read.**
- The study: `CHARTER.md`; `UNION.md` whole (§4's pass-4 line; §2; Q1, Q9, Q19; rows F7, F9, M1, M2, I12, I22); `union-fold.md`; `INBOUND.md`; `READINGS.md` (nothing published, nothing returned).
- `DESIGN.md`: pass 4's §6, §5.0, §3.9, and every line marked "amended in pass 4", with §1, §2.1, §3.2, §4.1 to §4.7 for the laws and the ledger it leans on.
- Pass 4's files: `pass-3/fold.md` (folded by pass 4), every file under `pass-4/`, and `pages/P4-bud.html`, `R1.html` and `R7.html`.
- Behind the claims:
  - glass-ui source: `src/styles/glass/reveal.css:95-292`, `src/styles/animations.css:191-230`, `src/styles/tokens/motion-registers.css:55-90`, `src/styles/tokens/glass.css:55-90`, `src/styles/tokens/scheme-spring.css:59-61`, `src/styles/glass/overlay-plate.css:14-63`, `src/components/dock/styles/dock.css:55-80` and `:166-180`, `src/components/dock/styles/shell.css:48-58` (on master and on `bl/dock/wi8` @ `d48c19ec8`), `src/components/toast/Toast.vue:9-23`.
  - Records: commit `8d3dc8d2d` and its CHANGELOG entry; BL `audit/INBOUND.md:146` (O-171), `:235` (O-260), `:313` (O-338); BL `waves/W-R.1.md:21-28`, `:164`; `docs/release-10.1.5/inbound-O-132.md`; `docs/precepts/README.md:84-100`.

**What I ran.**
- `shape/geometry.mjs`, copied unchanged to my scratchpad, under `guarded --light`. It reproduces `geometry.json` exactly, every lane and frame (timestamp aside).
- The P4-bud curve against its rows' fade, in Node. The `present` cubic `(0.197, 0, 0.124, 0.808)` reaches 84 % of the height when the rows reach 0.16 opacity, so A to D show no word outside their plate. Dropped as an objection.
- The sketches' bytes: 195, 267 and 224 B by Python's `gzip -9`, against the pass's ≤ 190, 268 and 220. The gap is the gzip header. Dropped.
- `critique-B-check.mjs` (P4-bud's E over its seat; the capsule window's box and hit region when folded, in headless Chromium): **refused** at 20:02:47 on the kernel zone, `data.kalloc.1024` at 14.11M, and again at 20:12:51 (14.14M). Both cells are fixed by the CSS specs alike in both engines, so the objections below rest on the stylesheets. The run would show them.

**Verdict.** The geometry is sound and reproducible:
- the capsule window is exact at every width;
- A's corners and edge, and D's corners, are as stated;
- the thread split is WebKit's, as UNION I12 gives it.

The decisions built on it are stated past the evidence in five ways:
- **The proposed default overturns an owner order the pass does not cite.** It also misreads the menu entrance that ships today. The sketch as written cuts the menu in and out under reka (B4-1, B4-2).
- **The thread column assumes the token swap the owner has not taken** (B4-3).
- **The 12.0.0 premise does not hold for the dock** as the source stands (B4-4).
- **The window is exact only in paint.** Its box and hit region are the widest capsule (B4-5).
- **P4-bud is not a clean reading.** E is drawn over its own glass seat, and the ask is long. It omits Frost, which the decision names, and it omits the failure where the blur dies (B4-6, B4-7).

P4-bud should not be published until B4-6 is cured.

---

## Objections

### B4-1 (blocking). The proposed default, E, reverses the owner's O-171 order, and the pass misreads today's menu entrance

**Claim.** §6.4 item 3: "E is the default. The panel enters at its own size by opacity and a 0.96 scale from its control … It is today's menu entrance (`motion-registers.css:76-81`) with the `clip-path` strip, the slide and the blur leg taken out." C and D, the morphs, ship "only if the owner amends" the ceiling or P5. §2.1's "DropdownMenu and Select content" row is amended to E, and the Popover and Dialog rows to "its shape channel is the menu's".

**Evidence.**
- **The owner's order.** O-171, BL `audit/INBOUND.md:146`, "owner order 2026-11-05 eve: every height and width animated, no needless fade". Its R-1 reads "the `data-reveal="menu"` plate grows from its trigger as geometry (no blur, opacity held)", placed in W-F.4 and shipped in 11.1.0 (`8d3dc8d2d`). The CHANGELOG says: "Menus grow from their trigger. `Select`, `DropdownMenu` and the other menus no longer bloom and fade in."
- **What ships today.** The menu register sets `--glass-reveal-enter-scale: 1` and zeroes the blur and slide. Its comment: "A menu does not bloom: it grows from its trigger as geometry … no scale, no squish, no blur, no slide" (`reveal.css:106-118`). The grow says "There is no blur and no fade in: opacity is 1 from the first frame" (`reveal.css:267-272`). The `--enter-menu-*` values at `motion-registers.css:76-81` are the register that this neutralises. So E is not today's entrance with parts taken out. It brings back the scale and the fade that O-171 removed.
- **The pass's own rule.** DESIGN §1 (`DESIGN.md:15`): "a part the owner ordered is never cut by a study law". E wins on law 5 and the ceiling, and C loses on P5, but P5's text is a draft for the owner (§4.6; "P5 and P7 are drafted, not applied", §4.10). O-171 appears nowhere in DESIGN.md or UNION.md.
- **What the sites asked.** value.js asks for "a trigger growing into its menu" (FORTY-SECOND D), gaggle for "Find growing out of its seat", and Home Assistant for "the floor menu from its trigger" ([IN value.js 2; gaggle 2; HA 2]). By the pass's own account, E "does not take the control's shape".

**Remedy.**
- Cite O-171. Strike "today's menu entrance … taken out".
- State the shipped, owner-ordered grow (C's class; today's strip opens along one axis from a strip the trigger's height) as the standing default. Put it to the owner with the law it fails and the measurement: `clip-path` runs on the page's thread in WebKit, and its curve is a `linear()` token. E and D are the alternatives he may take.
- Restore §2.1's three rows to "pending the owner on P4-bud", and label C on P4-bud as today's, ordered under O-171.

### B4-2 (major). E as sketched has no tweened entrance and no exit that reka lets paint

**Claim.** `shape/sketch/bud-bloom.next.css` describes the entrance as "One node, two properties, two animations per open, nothing added" and the exit as "the same two properties on 0.6 of the clock (P0a)". It is priced at ≤ 190 B (§6.6).

**Evidence.**
- The sketch is a bare `transition` with a `[data-state="closed"]` rule, and has no `@starting-style`.
- glass-ui's reveal records why that fails. "Reka mounts the portaled Dialog/Sheet/Popover content already `data-state="open"` at first paint, so the `[closed]→[open]` transition had NO prior computed style and the whole enter landed in ONE ~44ms frame" (`reveal.css:145-158`). The cure is the `@starting-style` block at `:160-164`.
- On exit: "A transition-only Dialog or Popover exit paints zero frames because reka-ui `usePresence` gates the portaled-overlay unmount on `getComputedStyle(node).animationName` … a transition-only exit is TORN DOWN (~11ms, <1 frame)" (`reveal.css:185-191`). The library's cure is the `glass-reveal-out` keyframe.
- So in the library the sketch would cut in and cut out, against law 7 and the owner's "nothing changes instantly".
- The sketch contains no exit rule at 0.6 of the clock. As a transition, the close would run the full 200 ms on the entrance curve, if it painted at all.
- P4-bud mounts its lanes ahead of time, so the page cannot show either fault.

**Remedy.** Express E on the existing `.glass-reveal` recipe, which already carries `@starting-style` and the `glass-reveal-out` exit. The menu register would read `--enter-menu-scale`, with blur and slide at 0. Re-price E with what it changes in `reveal.css:110-118` and its exit. Say that the exit keyframe is reka's presence gate (UNION M2's workaround, which stays until Q11).

### B4-3 (major). "Compositor" in §6.2 and §6.3 assumes the token swap the owner has not taken, and §6.5 argues from the opposite assumption

**Claim.** §6.2 gives A, D and E the WebKit thread "compositor", and §6.3 says the window is "both on the compositor". §6.7 adds: "A, D, E and F keep gliding where B and C stall."

**Evidence.**
- The sketches ease on `var(--spring-present)` and `var(--spring-dock)` (`bud-bloom.next.css`, `bud-windows.next.css`, `capsule-window.next.css`). These are 48-stop `linear()` tokens today (`scheme-spring.css:60-61`).
- WebKit hands `linear()` to its compositor only from the 27.3 beta. In 27.2, every iOS 26 Safari and Home Assistant's WKWebView on iOS 26, those legs run on the page's thread whatever they animate (UNION I22; DESIGN §4.1, `:266`).
- The swap to single `cubic-bezier()` tokens is a proposal: "The study proposes D, and the owner decides with Q7(d) beside it" (§4.3, `:310`).
- P4-bud runs every lane on the proposed cubic (its header comment). Its Busy page reading therefore reads the proposal, not the shipped tokens.
- §6.5 argues against R7's B because its "`backdrop-filter` transition also runs on a `linear()` spring curve, which WebKit hands to its compositor only from 27.3". That is the same condition, applied in the other direction. R7 runs both its lanes on `linear()` (`R7.html:127-135`), so the condition does not separate them.
- Law 7 (`DESIGN.md:25`; §4.6): a leg under 167 ms must be a compositor leg, or it shows fewer than five frames in Low Power Mode. E's exit at 0.6 of 200 ms is 120 ms.
- None of this has a reading: R2 is unpublished.

**Remedy.**
- Carry the condition in the thread column: "compositor if the owner takes the single-curve tokens (§4.3) and R2's lane D glides; on today's `linear()` tokens, the page's thread in 27.2, iOS 26 and WKWebView."
- State E's advantage over C under each token branch. On `linear()` tokens in 27.2, both run on the page's thread.
- Strike or even out §6.5's `linear()` argument.

### B4-4 (major). The 12.0.0 premise does not hold for the dock as the source stands, and "samples no backdrop" needs `none`, not a zero radius

**Claim.** §6.1: from 12.0.0 the floating and overlay rungs sample no backdrop, and "Those rungs carry every surface that changes shape: the dock's fold, a menu or popover out of its control, a dialog, a sheet and the theme seat's split." §6.4 item 1: the window "waits for 12.0.0, when chrome has no backdrop". §6.5 lists the dock among the chrome that "samples no backdrop (O-260)".

**Evidence.**
- **The dock reads the resting rung, not the floating one.**
  - `shell.css:58`: `--dock-surface-blur: var(--glass-blur-resting);`.
  - `dock.css:73-78`: `backdrop-filter: var(--dock-surface-blur)`.
  - Both hold on master and on `bl/dock/wi8` @ `d48c19ec8`.
  - O-260 sets resting to 8 px (`BL/audit/INBOUND.md:235`). Applied to the tokens, it leaves the dock's fold, and the theme seat that wears "a dock bg", blurring at 8 px in 12.0.0. O-260's sentence that the dock samples no backdrop states the owner's intent, and needs the dock re-pointed to hold.
  - Menus, sheets, dialogs and toasts do compose `.glass-floating` (`overlay-plate.css:14-15`, `SelectContent.vue:138`, `Toast.vue:23`), so for them the premise holds.
- **A zero radius is still a backdrop layer.**
  - The composed rung is `blur(calc(R * level)) saturate(…)` (`tokens/glass.css:88-92`). At R = 0 it resolves to `blur(0px) saturate(1)`, which is a filter, not `none`.
  - Pass 4's own fold accepted that "a `blur(0)` filter is still a backdrop layer" (`pass-3/fold.md`, B3-9).
  - Home Assistant's bound counts blur layers in WKWebView: "each fused surface is a blur layer … at most one live lens or fuse at a time" ([IN HA 2]).
- §5.0 still records Home Assistant's "these modals should be more glassy", given four days after O-260, as the owner's open question (`DESIGN.md:468`).

**Remedy.**
- Make two conditions explicit and send them to W-R.1 and BL through §3.9:
  - the dock's `--dock-surface-blur` moves to the zero rung;
  - the zero rungs are written as `backdrop-filter: none`.
- Until both land, the fold's and the split's 12.0.0 path is conditional, and §6.1's "every surface that changes shape" reads "every one but the dock".

### B4-5 (major). The capsule window is exact in paint only: its box and hit region are the widest capsule, displaced past the fixed end at rest

**Claim.** §6.3: "When the window is the part's own element and the glass its `::before`, nothing is added: one property per node and two animations per change, both on the compositor." §6.7: "The dock folds with both ends round at every frame." §6.8 asks atlas only whether its suites read "the dock root's box during a fold".

**Evidence.** These are from the sketch's own values, with P4-bud's figures (a 236 × 52 dock, `--from` 184 px).
- **The box.** Folded, the window is translated −184 px. The plate's `::before` at +184 px paints the disc at [L, L + 52]. The window element's own box is [L − 184, L + 52], so 184 px of it lies beyond the disc's fixed end, outside the open dock's footprint. That is the folded resting state, not a frame of the motion.
  - `getBoundingClientRect` includes the transform, so it reports a 236 px box for a 52 px disc.
  - The window's own border box takes taps, unless `pointer-events` says otherwise.
  - The other arrangement, with the window still and only the plate moving, keeps the box at the open footprint. That is still 184 px of invisible, hit-testable dock beside the disc.
- **The dock's own hit rules.** glass-ui separates the plate that absorbs taps from the margin that passes them through (`dock.css:64-67`: "The pill IS a surface … the reserved-footprint pass-through is the TRANSPARENT MARGIN's job").
- **atlas's bounds.** atlas fails "any box that moves on hover, open or fold", and its head-row corner seat is agreed at "0 px² over the title at rest" ([IN atlas 2, 5]).
- **The content.** Children of the window ride its `translate`. The seats inside the folded dock slide 184 px toward the disc, unless a wrapper counter-translates them, which is a third animated node per fold. P4-bud's F keeps its content outside the window instead (`.dots` is a sibling of `.fw`), and four dots fade on fold (`.folded .dots i + i { opacity: 0 }`). That is six transitions per fold on the page, not two.

**Remedy.**
- State the window's box and hit region at rest, and specify them, for instance with `pointer-events: none` on the window and `auto` on its `::before` and seats. The window's clip then bounds the hit area.
- Count the content's motion in "two animations per change".
- Put the folded rest box to atlas with the in-motion box.
- Run `critique-B-check.mjs` once the zone allows.

### B4-6 (major). P4-bud draws E over its own glass seat, overlaps two frosts on A to D's first frames, and its ask is not one look

**Claim.** P4-bud is the reading for Q1 and for the 11.3.0 condition (§6.4 items 1, 3 and 4; §6.8). Its script comment says "E opens beside it".

**Evidence.**
- **E is drawn over the seat.** `.seat` is at `left: 16px; top: 16px`, 44 px square, `z-index: 1`. `.lane` is at the same `left: 16px; top: 16px`, 250 × 188, `z-index: 2`, and `.pE` fills it with `inset: 0` and `transform-origin: 22px 22px`. The script hides the seat only `pick !== "e"`.
  - So E's frosted panel samples the seat's frosted circle and its glyph for as long as it is open: glass over glass (law 1), with F3's doubled ink under the word "New tab". The owner is asked to report "a square patch" in exactly that place.
  - A menu in the library opens beside its trigger at the popper's side offset, so the page also misdraws E's geometry.
- **The seat overlaps A to D's first frames.** `.seat { transition: opacity 80ms ease-out }` is not slowed by Slow ×4. For 80 ms, 40 % of a 200 ms open (10 % slowed), each lane's frost is born over the seat's. A's first frame is a near-square 44 px frosted plate over a frosted circle. That is how a "darker square" would look, and it comes from the page, not the lane.
- **The ask.** "Pick each letter A to E and tap Open a few times, with Slow ×4 on and off, then with Busy page on. Send the letters whose corners stop looking round or show a square patch, the letters that stutter when busy, and the one that best grows out of its button; then the same for the fold, F or G." That is three answers over seven lanes and three settings.
  - §6.8 adds "all with Frost on and off", but the ask never names Frost. The Frost-off case is the 12.0.0 case.
  - No Low Power Mode cell is asked, though E's exit is 120 ms (B4-3).
- **Nothing on the page asks whether the blur survives.** No question asks whether F's frost matches G's. glass-ui has met the failure where a backdrop under a root "blur[s] NOTHING — not less, nothing" (`dock.css:166-173`, Chrome 148, for `clip-path` and a blend).
  - A rounded `overflow: clip` is not a backdrop root by the spec, so this is a risk, not a finding. If WebKit does isolate the plate's backdrop under the window, F shows no square patch and passes the ask.
  - Every lane also sits under the stage's own rounded `overflow: hidden` (`.stage`, 8 px). An isolation failure would show on every lane alike, and only the Frost toggle would tell.
- **No edge or shadow is drawn.** `.glass` is a veil and a frost only. The edge column of §6.2 (A's thinning; C's and D's missing edge) and its shadow paragraph, which carry part of A's refusal and D's cost, are not on the page.

**Remedy.**
- Draw E beside its seat, or hide the seat for E as for the others.
- Hand the seat's glass to the lane at frame 0, by an `opacity` tween of the seat's frost as R5 does, so no frost is ever born over another.
- Add the plate's 1 px edge.
- Split the ask into three short steps: the corners, then Busy page, then the fold. Each step should name Frost on and off and ask "does F's frost look like G's?".

### B4-7 (major). The window's two release paths and the O-132 sentence are stated past their reading

**Claim.**
- §6.4 item 1: the window "ships in 11.3.0 if P4-bud's F, with Frost on, shows no square patch … Otherwise it waits for 12.0.0, when chrome has no backdrop."
- §6.7: "The square-cornered frame the owner reported in Safari (O-132) has no lane that draws it."
- §6.4 item 2: "A's first frame is the square-cornered plate the owner saw in Safari."

**Evidence.**
- **11.3.0 reads one failure mode of two.** A window whose blur silently stops (B4-6) passes it. That breaches the no-masking-fallback law: the primary path works in paint or fails loud.
- **12.0.0 is not condition-free.** The window still needs WebKit to clip a composited, translated `::before` by its translated, rounded `overflow: clip` parent, backdrop or not. P4-bud's F with Frost off is that reading, and item 1 does not name it (and see B4-4).
- **§6.7 contradicts §6.4 item 4**, which says "D and F rest on WebKit clipping a backdrop by an ancestor's rounded `overflow: clip`, which no source the reads cite settles".
- **O-132 has two parts.** O-132's frame is "a squared rounded rectangle, with a darker square ghost behind it" (`inbound-O-132.md:5`). value.js's WebKit trace in the same file put the squared caps down to the morph's non-uniform scale (rx 3.6 against ry 28) and a radius snap at settle. It did not name the ghost. F avoids the first part by geometry; the second is unread for F.
- **A's identification is an inference.** It is supported by that trace for the caps (Playwright WebKit, not Safari), which the pass does not cite. No reading of A exists.

**Remedy.**
- Make item 1 two conditions: no square patch, and F's frost equal to G's, both with Frost on.
- Make the 12.0.0 path conditional on F with Frost off.
- Rewrite §6.7's sentence as "no lane draws the squared plate by its geometry; whether F or D draws the ghost is P4-bud's reading", and cite the trace in item 2.

### B4-8 (minor). Provisional decisions are handed on as settled

**Claim and evidence.**
- §2.1's amended cells for Popover and Dialog ("its shape channel is the menu's") and for the GlassDock fold ("the shape is the capsule window") carry no "provisional" (`DESIGN.md:53`, `:55`, `:58`). The DropdownMenu cell does (`:51`).
- §6.3 gives the window to pass 5 as the reason equal slots "are then no longer needed to keep the mark on `translate`" (Q15), and to pass 7 for the fold and the split. Both rest on P4-bud's F, which is unread.
- No page has been published after four passes ("Pages published: (none yet)", `READINGS.md`). So every "provisional until pass 9" depends on a publish that no pass controls.

**Remedy.**
- Mark the three cells.
- Write §6.3's uses as "if P4-bud's F holds".
- Name publication of R1, R7 and P4-bud as the gate to the orchestrator.

### B4-9 (minor). "E nets between −156 and −346 B in every site's sheet" is not a bound

**Evidence.**
- Both sides are standalone `gzip -9` figures. §3.2 calls its removals "an upper bound on the saving inside a site's larger bundle", and §6.6 calls the additions an upper bound. Upper bounds on both sides bound the net in neither direction.
- Home Assistant has no sheet: its CSS ships inside the entry's script (§4.7).
- E's change to the menu register and its exit keyframe are unpriced (B4-2).

**Remedy.** Give the two figures as upper bounds, and leave the per-entry net, with Home Assistant's 0.2 kB margin, to pass 10's built bundles, as §4.7 already does.

### B4-10 (minor). The fold's count of pass 3's rulings is wrong

**Evidence.** §6's head says "21 objections, 17 accepted, 4 accepted in part". `pass-3/fold.md` rules 18 accepted (16, plus B3-1 "with A1" and B3-2 "with A7") and 3 in part (A2, A4, A10). Its own closing line says "Two remedies were set aside in part" and lists three.

**Remedy.** Correct both lines.

---

## Dropped on the second reading

- **The lanes' words outside their plate.** On the `present` cubic the rows reach 0.16 opacity when the plate is at 84 % of its height, and the last row's words are inside by 65 % of the clock. No word shows outside a plate. Dropped.
- **The sketches' bytes.** 195, 267 and 224 B by Python's gzip against 190, 268 and 220. The difference is the header. Dropped.
- **A content plate that changes shape.** Home Assistant's tile into its sheet, and colour's picker card from its seat, grow the sheet or card plate, which is overlay or floating. The tile stays. ExpandableContainer composes `.glass-floating`. Dropped.
- **Backdrop roots under the window.** The pass says neither `overflow: clip` nor `translate` makes a backdrop root, which matches the spec list it cites. The risk that WebKit does otherwise is B4-6's question, not an error of fact. Dropped as a separate objection.
- **E hit-testable at opacity 0.** A tap during the fade could land on an unseen row, but the menu opens beside its trigger, not under the finger. Speculative. Dropped.
- **"An edge thinned to a fifth of a pixel".** The figure is 0.176. Not material. Dropped.
- **The retry cadence.** The second attempt came under the 10-minute floor, and the pass recorded it itself. Dropped.

## What the pass does not touch, checked

- **gaggle's GPU words.** No lane is GPU-backed, and no chunk changes.
- **Mount cost (atlas).** E reads nothing at mount. D's size read is per open, and D is not proposed as the default.
- **One live blur (Home Assistant).** E adds no blur layer. The window in 11.3.0 keeps the dock's one backdrop.
- **The geometry.** `F_window` is exact. Two equal-height capsules offset along their axis meet in a capsule, since the nearer cap is always the narrower. `G_scale`'s 7.28 px and A's 7.79 px reproduce.

## Retry

`critique-B-check.mjs` was refused at 20:02:47 on the kernel zone (`data.kalloc.1024` at 14.11M), and again at 20:12:51 (14.14M), after the 10-minute floor. The zone has only climbed since the pass's own refusals (14.04M to 14.09M), and it falls only on a reboot, so I stopped there. The check is owed with its command at its head. The pass's page check (`check/page-check.mjs`) and probe (`shape/probe.mjs`) stay owed as the pass recorded. No objection above waits on a run, because both cells are fixed by the CSS specs, and no headless engine draws WebKit's backdrop or the iPhone's.
