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
3. **The close:** the full release battery, tag v11.0.1, push, and the CI publish as `latest`. Then tell value-js-63, value-js-65, sci-report-62 (atlas, per the owner's "Inform atlas always") and sci-report-58 (Gregg).
