# 10.1.5 — critique, round 6 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `f772419f4` (fix round 5,
`ce17ae234`, plus its rebind and records). I read every commit over `v10.1.4`, the full fix-5
`src/` diff, `critique-1.md` to `critique-5.md`, `implement.md` through fix round 5, every
`inbound-*.md` and the orchestrator notes, round 5's included.

Every browser run was admitted by `guarded`: Chromium (`chromium-headless-new`) and Playwright
WebKit 2287 (`--exclusive webkit`). One WebKit run waited about 1.5 h for the machine-wide
WebKit lock while other sessions' design chains held it. That was a wait, not a refusal, and I
reordered my queue so the Chromium work ran in the meantime.

## Probes

- **Spec:** `tests-visual/release-10-1-5-critic-6.spec.ts` (WebKit config
  `release-10-1-5-critic-6.config.ts`). It is critic-5's whole battery (critic-4's cells plus
  r5, r5b, r5c and r5d) re-run on the tip, on the same harness
  (`release-10-1-5/critic-4.{html,ts}`), plus round 6's cells. Round 6 aims at fix 5's three
  mechanisms: the layout-box reach (K1), the square flush keyframe (K2) and the yielding
  reserve pair under `--dock-run-yield` (K3).
  - **r6a, the yield under resize:** one page resized 1440 → 320 → 390 → 844 → 300 → 430 →
    1440, with the dock's cap following. At each width it reads the rest and the reached end
    seat. Configs: the house run with and without persistent regions, a 4-seat and a 5-seat
    tab dock.
  - **r6b, the room under the yield:** the dock's cap swept 0 to 24 px under its content in
    2 px steps. At each step: the rest, the focused end seat, and focus+hover.
  - **r6c, the reach seat by seat:** the roving toolbar driven by arrow keys from S1 to the
    end and back. Each settled seat's layout box is read against the port and its ring
    against the run's clip. Configs: house + persistent, cockpit, icons, an open seat
    (`aria-current`), RTL and vertical, at 320 and 390.
  - **r6d, the first pixel:** the run 0, 1, 2, 4 and 8 px off each flush edge, the edge seat
    hovered, then focus+hover. Configs: the vertical tab run, house 320, cockpit 320.
  - **r6e, the vertical cap:** a vertical dock's `max-block-size` swept under its content.
    It measured nothing (see "Not measured").
  - **r6f, the stale cap:** an overflowing run scrolled (none / end / end then 0 / mid), then
    its cap lifted so every seat fits. The corners are read at 0.3 s, at 1.5 s, and after a
    pointer pass.
  - **r6g, its mechanism:** `getAnimations()` on the plate before and after the lift.
  - **r6h:** a hovered wide tab on a vertical dock that fits (no timeline).
- **v10.1.4 arm:** r6a, r6b, r6d, r6f, r6g and r6h on `critic-4-v1014.{html,ts}` over
  `tests-visual/release-10-1-5/v1014/` (`git archive v10.1.4 src demo`, as in rounds 4 and 5).
- **Drivers:** `scripts/critic-6.sh`, `chain-critic-6.sh`, `chain2-critic-6.sh`,
  `g6-critic-6.sh`, `gates-critic-6.sh`.
- **Summaries:** `critic-6-summary.mjs` (battery rows) and `critic-6-frames.mjs` (collapse and
  layer-switch frames).
- **Rows:** `critic-6/<arm>/<project>/`, with the run log in `critic-6/runs.txt`.

| run | result |
|---|---|
| Chromium, r6 cells, branch | 10/10 (`probe-chromium`) |
| Chromium, critic-5 battery on the tip + r6f | 65/65 (`battery-chromium`) |
| Chromium, r6g + r6h, branch | 2/2 (`extra-chromium`) |
| Chromium, v10.1.4 arm | r6a/r6b/r6d 6/6, r6f/r6g/r6h 4/4 |
| WebKit 2287, whole spec, branch | 74/75. The failure was `r6c arrow reach coarse`, my probe's error: `document.activeElement` carried no witness at one step, and the cell banked nothing. The cell now records a lost-focus row. Re-run: 1/1, 216 LTR rows, no focus lost (`wk-extra`). Not reproduced, so not a finding |
| WebKit 2287, r6g + r6h, branch | 2/2 (`wk-extra`) |
| WebKit 2287, v10.1.4 arm | r6a/r6b/r6d/r6f/r6g/r6h 10/10 |
| g6 Chromium | release-10-1-5 37/37, release-10-1-4 23/23, release-10-1-3 60/60 |
| g6 WebKit 2287 | release-10-1-5 37/37, release-10-1-4 15 passed + 8 skips (`page.pdf`), release-10-1-3 58 passed + 2 skips (CDP swipe): the skip set of fix rounds 3 to 5 |
| g7 | `typecheck` exit 0 (`--light`). Then, in order: `build` 0, `demo:dist:build` 0, vitest 247/247 files (2397 passed, 10 expected fail, 1 skipped), `verify:package` terminal CLEAN at 10.1.5, no ratchet refusal (`critic-6/g7/`) |

## Verdict

Fix round 5's three cures hold in both engines, and I found no regression against v10.1.4.

- **K1 (reach from the layout box).** r5b and r5c land every end seat flush with its ring
  whole, at 320, 390 and 844, fine and coarse, with and without persistent regions, cockpit
  included. 0 rows bad in either engine. r6c walks every seat of the roving toolbar by
  arrow key, out and back, in house + persistent, cockpit, icons, a run with an open seat
  (`aria-current` on S3) and the vertical tab run, at 320 and 390. Every settled seat lies
  inside the port with its ring whole: 216/216 LTR rows per pointer, in both engines.
- **K2 (square flush edge).** The vertical tab run's S1 and S12 rings are whole at the flush
  edges (r5 and r6d: 0 cut). The 14.5 px cut is gone. One pixel off flush, a focused and
  hovered end seat on the horizontal run loses 0.54 to 0.74 px of ring (r6d), about the 0.5
  tolerance, and focus reaches it flush anyway.
- **K3 (the reserve yields).** At 320, the K3 scene (`tab:Home, icon, icon, tab:Settings`)
  rests uniform with `sw = cw` in every posture, in both engines. r6a resizes one page across
  widths and finds the yield following: 1 whenever the seats fit, 0 when they overflow. Every
  reached end seat is flush and ringed at every width.

The branch is not ready to tag, for one reason. **L1**, below, is r1's own defect: a dock with
nothing to scroll rests with a cut corner. It is pre-existing in both engines at v10.1.4, so it
is not a fix-5 regression. But no earlier round tested it, it breaks g1's own law, and a phone
rotation or a resize triggers it. The orchestrator should rule whether 10.1.5 carries the
cure.

## Defects (reproduced)

### L1: a run whose overflow vanishes while it is scrolled keeps a cut corner at rest (pre-existing at v10.1.4; r1/g1 class; medium; both engines)

r1's law is that a run that hides nothing rests round. It fails whenever the run's overflow
disappears while the run is scrolled off 0: a rotation, a viewport resize, a `max-inline-size`
change, or seats leaving. The run then has nothing to scroll (`sw = cw`, `scrollLeft 0`), but
the plate keeps a cut corner indefinitely. Pointer passes, a 1 px resize and a dispatched
`scroll` event all leave it in place.

- **r6f** (`critic-6/<engine>/r6f-stale-*.json`, 390, a run capped at 200 px, then the cap
  lifted to 1000 px). The four start positions behave like this:
  - **never scrolled:** rests round
  - **end, then back to 0, then lift:** rests round
  - **end, then lift:** stale
  - **mid, then lift:** stale

  | engine | arm | start position, then lift | `sw/cw` | corners (TL TR BR BL) |
  |---|---|---|---|---|
  | Chromium | branch | end | 360/360 | `16 28 28 16` (fine), `16 30 30 16` (coarse) |
  | Chromium | branch | mid | 360/360 | `16 28 28 16` |
  | WebKit 2287 | branch | end | 365/365 | `24.59 19.41 19.41 24.59` |
  | WebKit 2287 | branch | mid | 365/365 | `24.59 28 28 24.59` |
  | Chromium | v10.1.4 | end, mid | 340/340 | `calc(0% + 16px) 9999px 9999px calc(0% + 16px)` |
  | WebKit 2287 | v10.1.4 | end | 345/345 | `calc(35.8% + 4.5px) calc(14.2% + 11.5px) …` |
- **r6a** (one page resized across widths). The branch has rows with nothing to scroll and
  non-uniform corners:
  - Chromium fine: 5 of 14
  - Chromium coarse: 2 of 13
  - WebKit fine: 2 of 14
  - WebKit coarse: 6 of 13

  For example, Chromium at 1440: `720/720`, `16|28|28|16`. WebKit coarse at 1440:
  `760/760`, `28.41|17.59|17.59|28.41`. v10.1.4 shows the same rows in both engines.
- **Mechanism, read with `getAnimations()`** (r6g, `r6g-mechanism.json`). When the overflow
  vanishes, the `--dock-run` timeline goes inactive (`timeline.currentTime` null).
  - Chromium nulls the trailing arm's current time, but keeps the leading arm
    (`gl-dock-cap-inline-start`) at `currentTime 24%`, `progress 1`. So the leading corner
    holds the cut.
  - WebKit holds whichever arm last resolved with its old progress. That is why its values
    are fractional, and why on the icon-only run it released cleanly in r6g but not on the
    tab run in r6f.
  - Either way, the plate's cap is the residue of a scroll position the run no longer has.
    That is the cut-cap-at-rest symptom O-129 r1 names.
- **Why the battery missed it.** Every earlier cell opens a fresh page at each width, so the
  overflow never vanishes under a scrolled run.
- **Cure direction.** Do not rely on an inactive scroll timeline to release a held keyframe.
  The fact "the seats fit" already has one source of record, `publishYield`
  (`dockMorphMeasure.ts`).
  - Let the cap consume that fact: when the seats fit, the plate's and the run's
    scroll-driven animations are not applied (`animation: none`). Re-applying the animation
    when they overflow again gives a fresh timeline binding.
  - The flag needs a vertical reading too. `publishYield` writes 0 for a vertical run today.
  - Do not add a second flag beside `--dock-run-yield`. Either the yield becomes the
    selector's input (an attribute the same function writes), or the yield itself is read
    by a style query.
- **Gate (red on v10.1.4 and on this tip, both engines).** Open a run capped so it overflows.
  Scroll it to its end, and separately to mid. Lift the cap until every seat fits. Then
  `sw = cw` with four uniform `h/2` corners within 0.5 px, after 300 ms and after 1.5 s. The
  same must hold for a viewport resize 390 → 844 with a cap of `width − 30`.

## Not defects, recorded

- **The focus ring in the yield band (a bound of the round-5 ruling, better than v10.1.4).**
  The reserve yields to the room the seats leave, so when the room per side drops under the
  4 px ring (the dock capped 14 to 20 px under its content), a keyboard-focused end seat's
  ring is cut by the shortfall. Two pixels more, and the run overflows, so the full reserve
  returns with the ring whole (r6b).
  - Branch: up to 3.99 px in both engines, at `boxes 0px` (`cw = span`).
  - v10.1.4: the same seat loses 3.98 to 4 px at every cap in both engines, with focus+hover
    cuts of 3.77 to 13.6 px.

  The round-5 ruling admits no other room. I record the band so the gate's "the end seat's
  ring stays whole" is read as "whole wherever the yielded room is at least the ring".
- **WebKit: wide → narrow resize leaves the run mid-run (pre-existing).** After a resize from
  a width where the dock fits to one where it overflows, WebKit rests the run at `sl 73`,
  `169` or `265` rather than 0. That is the engine's snap re-evaluation after layout. v10.1.4
  does the same (`sl 73`, and coarse `383` and `331`). Chromium rests at 0. The corners
  report it honestly (cut both sides).
- **RTL reach (pre-existing, critique-5's record).** In an overflowing RTL run, reach writes
  a positive offset and the focused seat leaves the port. r5 shows 3 Chromium fine rows, 6
  Chromium coarse rows and 8 WebKit rows per pointer, all RTL. r6c RTL shows the same, plus
  one more thing: `ArrowLeft` on the RTL toolbar scrolls the run natively without moving the
  roving stop. The tip and critic-5's tip have the same RTL rows, so K1's layout-box rewrite
  changed nothing there. W-0.8 or a later patch should own it.
- **A wide vertical tab's fill past the plate (pre-existing, fix 5's stated trade).** A hovered
  120 px tab at a flush edge of the vertical run paints 9.86 px (Chromium) or 10.7 px (WebKit)
  of fill past the plate's 66 px arc. The same dock with nothing to scroll paints the same
  9.86 and 10.7 (r6h), and so does v10.1.4. K2 made the flush edge paint as a run that fits,
  as ruled.
- **K3 bound, focus+hover at 320 coarse.** One Chromium posture row, a focused hovered S1
  in the K3 scene, clips 0.91 px. That is inside the bound fix 5 records (0.9 to 1.6 px).
- **WebKit r6c lost focus, 1 of 2 runs.** Not reproduced on the instrumented re-run (above).

## What held (refutation attempts that failed)

- **g1 / r1 at rest:** the critic-4 battery on the tip, in both engines.
  - Every `dock postures` row at 320, 390, 430, 844 and 1440, fine and coarse, is uniform
    `h/2` with `sw = cw` and no ring clipped. The postures are rest, hover on each seat,
    focus, focus+hover and press. The one exception is the 0.91 px K3 bound above.
  - `r4 press and rtl` holds 125/125 per pointer. `r4 cockpit` holds 20/20.
  - O-155 rows equal critic-5's: two seats, root and plate, both themes, 390 and 1440.
- **The cut on a true overflow, and flush restoring the rest:** `dock overflow` 12/12 per
  pointer per engine. r5 at 0, a quarter pitch, mid and end shows `28|16|16|28`, all 16,
  then mirrored.
- **The run's clip (H1) on the tip:** visible fill past the plate's arc is at most 0.61 px
  (Chromium) and 0.63 px (WebKit) everywhere except the flush vertical tab above. No LTR
  ring is cut in either engine.
- **r2 / OD-16 / OD-18:** every collapse run settles at a uniform half-extent circle
  (`28px`; `30px` coarse). The last 20 % of frames are uniform, with no ghost: 193 frames in
  Chromium and 97 in WebKit. Layer switches are 217 frames (Chromium) and 109 (WebKit), all
  uniform with `sw = cw`.
- **OD-13 / OD-17, and critique-2's WebKit keyboard-modality cells:** `dock-tab-ring-kbd`
  in WebKit 2287 is 12/12 per pointer, ringed whole. It covers a key press, programmatic
  focus and hover, on S1, S4 and the layers' L1, at 390 and 1440. `dock ring postures` is
  8/8.
- **Critique-3's four static suspicions, re-run on the tip:** `r4-s1`, `r4-s2` and `r4-s3`
  are byte-identical to critic-5's rows in both engines.
  - S1: the trigger reserve equals the icon reserve.
  - S2: 4 → 4 observer constructions.
  - S3: `28px` corners with no `ResizeObserver`.
  - S4 (`<Input>`/`<Textarea>` at 14 px coarse) is unchanged and out of r6's scope.
- **Dock-edge room in an overflowing compact or cockpit dock:** r5b, r5c and r6c on cockpit
  at 320 and 390. Every end seat is reached flush and ringed, in both engines.
- **r5, r6, r7, O-133, O-150:** `slider`, `r4-slider`, `fields`, `r4-fields`, `r4-menu`,
  `r4-table`, `r4-segtabs` and `r5-segtabs` equal critic-5's rows in both engines. The only
  differences are a mid-drag spring sample and a mid-glide indicator sample. Concretely:
  - **Slider:** the thumb is visible and one size at min, mid and max, step edges, sm/lg,
    disabled, vertical, two thumbs, and dragged past both ends.
  - **Fields:** 16 px on coarse 390, 1.128 × the subtitle.
  - **Menu:** a 4 px `--icon-label-gap` on icon, checkbox, radio and sub-trigger items.
  - **O-133:** the strip is isolated, so the header paints over it.
  - **O-150:** every Table rule equals `--border`.
- **API and tokens:** `verify:package` is CLEAN (no export removed or renamed). Fix 5 adds one
  internal token, `--dock-run-yield`, and moves no existing value.

## Not measured

- **r6e (the vertical cap).** The harness's vertical dock stretches to its stage, so
  `max-block-size` on the dock never caps the run: the run's height followed the cap with
  the seats' span far under it. So r1 on a vertical run capped a few pixels short of its
  content is unmeasured. The vertical run keeps its padding reserve and does not yield, as
  fix 5 states.
- Real Safari: safaridriver is not enabled. Every WebKit cell is Playwright WebKit 2287.

## Owed

- **L1:** a ruling on whether 10.1.5 carries it. If it does, the cure above and its gate in
  both engines, then this spec's r6a/r6f/r6g (`release-10-1-5-critic-6.spec.ts`), g6 and g7.
- Nothing else is owed from this round.
