# 11.0.1 and 11.0.2 (re-cut 2026-11-12: the owner's fourth report of the hover ellipse)

**11.0.1 is the small one:** release/10.1.5's cures brought forward onto 11.0.0, and nothing else (the hover ellipse, the squared end, the dark halo, the rest of that patch). Driver: `glass-11.0.1.js`. It does not wait for 10.1.5 to publish; it merges that branch's tip, whose source is frozen since its clean round.

**11.0.2 is everything else this file lists below** (O-212 and O-214 by cherry-pick, O-219, O-223 with O-244, O-227, O-232, O-235, O-240, O-241's second witness, the O-245 read), cut from master after 11.0.1 merges. Read "11.0.1" below as "11.0.2" for every item except the forward merge.

**11.1.0 does not tag until v11.0.1 is merged into it** (its close stops otherwise); it does not wait for 11.0.2, whose two Select commits it already carries.

---

# glass-ui 11.0.1: scope

11.0.1 is the 11 line's patch. The release that cuts it reads this file.

1. **Forward-merge release/10.1.5** once 10.1.5 is published under `--tag v10`. That brings every 10.1.5 cure: O-155/O-165/O-193, O-182, O-186/O-187, O-201, O-205, O-207 and all critic-round cures. Resolve the merge so both the 11.0.0 behaviour and each 10.1.5 cure survive.
2. **O-212, the Select plate clips its own rows. This bug exists only on the 11 line** (introduced by 16274926d, U/B7 G1-6; not in 10.1.5). value.js color, `/#/generate`, Preset select at 1440×900, on glass 11.0.0 and reka 2.10.1:
   - `.select-content` is 352 px wide with `overflow: hidden`, from `src/styles/glass/overlay-plate.css:333` `max-inline-size: min(22rem, 100vw - 2rem)`.
   - The viewport is 386 px, because `SelectContent.vue:152` forces `min-w-(--reka-select-trigger-width)` and the trigger is 386 px.
   - So the viewport overflows the plate by 34 px and sits 3 px left of it. Every row loses its right ~27 px, the highlighted pill runs square into the plate edge (the concentric-radius law breaks), and the cut strip hit-tests to `<html>`.
   - value's smoke D-11 (`e2e/smoke/ss8-b19-color-chips.spec.ts:174`) passed on 10.1.3 and is RED on 11.0.0.

   The cure is one bound for both: the plate and the viewport agree on the same inline-size rule. Either the plate's max follows the trigger width up to the viewport cap, or the viewport's min is clamped by the plate's max. Rows never overflow the plate, and a trigger wider than the plate's bound never forces the list wider than its plate. Gates, in both engines at 390 and 1440, light and dark, with triggers of 200, 352, 386 and 600 px:
   - every row's box lies inside the plate's box;
   - the highlighted pill keeps its concentric inset on all four corners;
   - `elementFromPoint` at each row's right edge minus 12 px hits the row;
   - the gate is RED on v11.0.0.
   **O-213 (fourier, via value-js-65) is folded into the same bound.** The cap `100vw - 2rem` counts the stable scrollbar gutter as usable width. The owner ruled on 2026-11-10 that `:where(html) { scrollbar-gutter: stable }` stays, so the cap must measure the inline extent the page actually lays out in, never `100vw`. The same cap also kept a consumer-measured anchored panel narrower than its anchor at 390 (352 against 358). The one bound therefore lets a plate follow its anchor's or trigger's width up to the layout viewport less the 1rem gutters. Added gates: at 360 and 390 with a classic scrollbar (the 15 px gutter reserved), no plate passes the layout viewport less 1rem on either side; and an anchored panel 358 px wide is never clamped below its anchor.
2b. **O-214: after a pointer open, the focus ring lands on the selected row, not the trigger (11-line only; not explained by the 11.0.0 CHANGELOG).** value.js color, `/#/`, the dock's "Select view" combobox at 1024×768, light and dark, opened by mouse. Focus lands on the checked row (it carries `data-highlighted`, and `:focus-visible` matches), and the row draws `outline: 2px solid` (the foreground at 0.48). The open trigger shows no ring. On 10.1.3 the ring was on the trigger and the row was bare. The likely source is the 11.0.0 overlay rework (16274926d and its follow-ups, which changed `SelectContent.vue` and `overlay-plate.css`). Reproduce it, name the root, and cure it there:
- A pointer open paints no keyboard ring on any row; the highlight pill alone marks the row (restraint: one indicator).
- A keyboard open still paints the ring where focus is.
- The trigger's ring follows `:focus-visible` exactly as on 10.1.3.

Gates, in both engines, light and dark, at 390 and 1440:
- After a mouse open, no row computes a visible outline or ring.
- After a keyboard open (Enter, Space, ArrowDown), the focused row's ring is visible at 3:1 or better.
- Value's two goldens (the dock view-select open, light and dark) match 10.1.3's ring placement.
- RED on v11.0.0.
3. **The close:** the full release battery, tag v11.0.1, push, and the CI publish as `latest`. Then tell value-js-63, value-js-65, sci-report-62 (atlas, per the owner's "Inform atlas always") and sci-report-58 (Gregg).

5. O-219: a Slider at its minimum keeps a visible fill (floor = the thumb size). Witness RED on 11.0.0 at min, both engines.

6. O-223: `useGlobalDark({ storageKey })`, threaded to `useDark`, one-shot like `initialValue`; pairs with `darkModeSyncScript({ storageKey })`. Witness: one fresh key in both places opens on `initialValue` in a browser that holds `auto` under the default key.

## Order and sources (Fable second look, 2026-11-10; this section wins over the numbering above)

- 11.0.1 is cut from master after the demo-deploy branch merges (master already carries the dist-tag publish step, `scripts/dist-tag.mjs`).
- The cures for O-212 (with O-213's cap), O-214 and O-219 are written once, on `release/11.1.0`, one commit per row, source and tests only. 11.0.1 cherry-picks those commits; their hashes are listed in the `release-11.1.0` worktree at `docs/release-11.1.0/fix-2.md` under "11.0.1 cherry-picks". Do not write them a second time.
- O-223 (`useGlobalDark({ storageKey })`) is built here.
- The close (tag v11.0.1, CI publish, notify the consumers) is the LAST step, after every item above.
- 11.1.0 does not tag until `v11.0.1` is merged into `release/11.1.0`.
- O-227 is built here: the dock plate edge lerps its strength inside one `color-mix()` with one translucent arm, so unshimmed Playwright WebKit loads a GlassDock page (RED on v11.0.0). The border's computed colour matches 11.0.0's at t = 0, 0.5 and 1 in Chromium.
- O-232 is built here: every control inside a `backdrop-mode="static"` dock computes `backdrop-filter: none` at rest, hover, press and active (RED on v11.0.0, both engines).
- O-235 is built here: the blob's deceleration kick fires once per episode, not every frame (`blobSimulation.ts:132-136`), and the body radius stays inside the box. Gate in vitest over the simulation (sweep, drag, release), plus one Chromium cell 100 ms after release.
- The 11.0.1 cherry-picks exist on `release/11.1.0` (read from its git log, 2026-11-11): `617d62f73` is O-212 with O-213's overlay cap, `b6393d385` is O-214. O-219 (the Slider at its minimum) was NOT built there, because the Slider rework (K12) was reverted to 11.2.0: build O-219 here, on reka's thumb as it stands.
- **O-240:** FIRST run daraksha's glass-only repro (`~/Programming/daraksha/test/glass-repro/dock-press-scroll.html`, branch `o1110-finish`, read-only; copy it into this release's records) on the tip after the 10.1.5 merge. If the active layer no longer rests scrolled, record that and keep the repro as the witness. If it still does, cure it at the root: a layer that fits rests at scroll 0 and nothing writes scroll on `pointerdown`. Witness under `prefers-reduced-motion: reduce`, mouse and touch, both engines: a quick press on a seat lands its click on that seat.
- **O-241:** run daraksha's `dock-cutcap.html?radius-dock=1.875rem&active=page&end=1` on the tip as a second witness for the open narrow-active face, with the end seat: four equal plate corners.
- **O-244:** with `initialValue` set, a toggle stores the concrete mode, never `auto` (built with O-223).
- After the 10.1.5 merge, read daraksha's dark gloss frame against the dark plate cure (O-245): say whether the warm glow is the same halo.


## Added 2026-11-12 for 11.0.2 (atlas U/OW-R2, branch u/ow-integ-glass f9c58b03f; review each commit before it lands)

- O-261: PagerDots worm measures the dot from a worm body's offsetWidth (the 301 px neck; the owner's teleporting dots).
- O-262: dock morph origins when a consumer hides collapsed content (three parts); reviewed against 11.0.1's dockMorphMeasure, reversal family and release spec re-witnessed in both engines.
- O-263: the run contains overscroll on its scroll axis only.
- Order for 11.0.2: O-223 + O-244 (stored auto), O-240 (the quick press under Reduce Motion), then the rest.
- O-266: a breakpoint change mid-open holds the old content's size and snaps at the settle (the eight `O-101 ·` cells of release-10-1-2, RED on v11.0.0 and v11.0.1); third in 11.0.2's order.
- O-267 (FIRST in 11.0.2, before O-223): a focused Slider has no focus indicator under forced colors (regression in 10.1.5 and 11.0.1); the track takes a real outline there; audit every `outline: none` the 10.1.5 patch added. One source-and-tests commit so the 10.1.x line can cherry-pick it as 10.1.6.
- O-268: while curing O-266, count the layouts a dock's idle fold costs on a scrolling page (color saw 37 where 5 are allowed) and cure it if the fold lays out per frame.
- O-269: in dark, a dock control's hover and active fill lightens the plate (today it is a light-scheme ink and reads darker); witness by luminance against the plate, both engines.
- O-271: dock rows overflow 4 to 8 px when a persistent region sits beside the layers (fourier; regression in 11.0.1).
- O-270: every dock seat (control, trigger, tab) takes a corner of half its block size.
- O-273: `--slider-thumb-bg` (default `var(--card)`) for the scrubber thumb; additive.
- O-282: the dock must not shift when a seat is hovered (owner, 2026-11-12). Cure the cause in glass and add the 0 px hover spec, as written in `docs/release-11.0.2/orchestrator-note-dock-hover-shift.md` (binding). A critic that finds no such spec on the tree files it as a blocking defect.
- O-294 (with O-280, O-283): the Slider geometry cure of W-B.18, as written in `docs/release-11.0.2/orchestrator-note-slider-geometry.md` (binding). A critic that finds it absent files a blocking defect.
- O-295: reproduce the pager dots "giant rectangle" on v11.0.1 and on the branch after the dot-measure fix; if the component can show its neck outside its bodies, cure it here with a witness; say what you found either way.
- O-288 and O-300 (a): the fold keeps content inside the plate and tweened, and a slotted control keeps its own transitions, as written in `docs/release-11.0.2/orchestrator-note-dock-fold-content.md` (binding).
- After build C: the rulings in `docs/release-11.0.2/orchestrator-note-after-build-C.md` are binding (O-219 restated with the least paint; O-271 owed; O-288 and O-300 owed; the ResizeObserver trace; the O-295 cell). A critic reads that note first.
- Before the tag: the branch carries master's browser-free workflows, as written in `docs/release-11.0.2/orchestrator-note-ci-browser-free.md` (binding).
