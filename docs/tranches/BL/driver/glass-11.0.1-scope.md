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
