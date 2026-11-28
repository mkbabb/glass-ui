# Critique, round 3: the WebKit abort from a nested color-mix token

Critic: claude-opus-5-5, 2026-11-24. I did not write the cure. Verdict: **does not hold**, on one finding (B1). Everything else I checked holds.

## What I ran

All on my own plain archives of `release/11.1.1` under `trees/opus-r3-*`. They are still there, because the permission system denied my `rm -rf`. `trees/` is gitignored, and the four `opus-r3-*` folders and two `.build.log` files can be removed by hand. The branch is at `b9b96cb76`, a docs merge over the `48ab5d94e` that ROOT cites; `src` and `tests` are the same at both. Records and my two probes are in `record/critic-r3/`.

- `git apply --check cure.patch` passes on the archive, and the cured tree differs from the base in the three files only.
- The harness, built on each tree with glass's CSS targets.
- The item's witness (my copy), Playwright WebKit 26.5, 44 cells. Base: 10 abort (Select trigger, ToggleGroup item, Accordion trigger and a bare `.control-surface` on hover, in each scheme; the Blob and its reduced-motion form on load in dark). Cure: none. This matches the record.
- The item's readings (my copy), Chromium 149. The hover token's largest ΔE OK is 8.0e-5 (light, level 0.75). At level 1 it is 1.3e-5 in light and 8.1e-6 in dark, and alpha is unchanged in every cell. `--shadow-color` and `--blob-shadow-color` are identical. This matches the record.
- The gate. The cured test file passes 3 of 3. The new test, copied onto the base, fails and names `glass.css:263` and `shadow.css:108`.
- `tests/styles` on both trees. Each fails the same five (three files and two tests that read files the sparse tree lacks). Each also hit one load timeout in `glass-subtlety.test.ts`, and that file passes 36 of 36 alone on both trees.
- **The brief's shape, checked independently.** I re-ran the sweep on the cured tree, keeping the full resolved values. Then I applied up to 12 resolved paths per site, as literal `background-color` values, in WebKit (`probe/literal.mjs`). This covered all 40 sites that still have a mixed arm, 30 of them with a relative colour inside. None aborts and every value parses (`literal-cure-webkit.json`). The control in the same probe: the old hover, resolved to literals, aborts, and the cured hover renders (`literal-control-webkit.json`). The narrower crash shape that ROOT gives (both arms hold a mix) stands.

## Blocking

**B1. The blob cure changes the producer, not the shape, so value.js still aborts on the cured tree.** value.js is one of the two consumers that reported this.

- `--blob-shadow-color` (`shadow.css:108`) is declared on `:root`. `--blob-color` is never set there, because `Blob.vue:294` sets it on the wrapper. So the token always resolves to `--shadow-color` mixed with itself. Whenever `--shadow-color` is a mix, that is the abort shape. The base witness shows the bead tint never arrives: with `color="var(--primary)"`, the light blob shadow reads `#1c1917` at 0.2, the foreground alone.
- glass's own comments name `--shadow-color` as the knob a consumer sets, and value.js sets it. Its `demo/styles/foundation.css:707` declares, under `.dark`, `--shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background))`. value.js renders glass's Blob (`demo/picker/visual/HeroBlob.vue`) and toggles `.dark` on the root. Its installed glass is 10.1.3, which ships the same token.
- Witness (`probe/consumer.mjs`, `consumer-cure-webkit.json`): on the cured harness, the Blob in dark aborts the page once value.js's override is added. Any consumer `--shadow-color` that is a mix, in light, aborts it the same way. A plain-colour override, daraksha's form, renders.
- The cure also costs something, as ROOT says: the dark `--shadow-color` now needs relative-colour support, so Firefox 114 to 127, which the target list still names, lose every dark shadow.
- **What I tested instead** (`alt-blob-token.diff`; `git apply --check` passes on the base): keep the hover hunk and the test, leave `dark-arm.css` as it is, and write `--blob-shadow-color: var(--shadow-color);` at `shadow.css:108`. A colour mixed with itself is that colour, and no consumer sets `--blob-color` or `--blob-shadow-color` in CSS, so no value changes. Results:
  - witness: 0 of 44 abort (`witness-alt-webkit.json`);
  - value.js's dark override and a light shadow that is a mix both render (`consumer-alt-webkit.json`);
  - readings: `--blob-shadow-color` ΔE OK 3.6e-6, and the 20% and 44% shadow colours are 0 (`readings-alt-chromium.json`);
  - the gate passes 3 of 3;
  - the seven blob declarations leave the relative-colour count, and the Firefox cost goes away.

  If the bead tint is wanted, it belongs on the wrapper, where `--blob-color` lives, as its own change with its own readings.
- The gate cannot see this, because `mixOfMixes` follows only glass's own producers. One added case would cover it: flag a mix whose two arms reduce to the same `var()`, or treat `--shadow-color` as a mix in the fixture.

## Not blocking

- **The narrower shape is a change from the brief.** The brief asked that no relative colour sit inside a mix inside a mix, and for a test that fails on any nested form. ROOT keeps 23 such sites and adds 7. The isolation records and my literal pass both support the narrower rule, and ROOT says so under "What this does not do". The orchestrator should accept it as a change from the brief. With the alternative above, the added 7 go away.
- The hover now reads the ink, the rungs and `--card` directly, so an override of `--glass-plate-quiet` or `--glass-plate-resting` no longer moves it. Neither is overridden in glass's `src` or in atlas, value.js, keyframes, fourier, daraksha, gaggle or the Home Assistant source.
- With `--card` and `--glass-veil-ink` both mixes, the page aborts at rest on every tree, base included. That comes from the plates, not the hover. No consumer sets either as a mix. A `--card` that is a mix on its own aborts the base on hover and renders on the cure.
- The 10.1 line is out of this item: `v10.1.6` carries both roots and `dock.css:131`, and value.js runs 10.1.3. If 10.1.x is patched, it needs its own item and witness.
- Real Safari and Safari Technology Preview are unchecked, as the brief requires the record to say. WEBKIT-REPORT.md asks for both before it is filed. The report text has no private names or site URLs and is signed as the brief asks.
- keyframes' probe is not in `~/Programming/keyframes.js` or in its `.worktrees` checkouts, which confirms ROOT.

## To close

Adopt `alt-blob-token.diff` in place of the `dark-arm.css` hunk, or show why it is wrong. Add the self-mix case to the gate. Re-run the witness with value.js's dark override as a cell.


---

# Critique, round 3, second critic: the fix seat's round 2

Critic: claude-opus-5-5, 2026-11-27. I did not write the cure. This reads `cure.patch` and `ROOT.md` as they stand on 2026-11-24 22:23, after the fix seat answered the first critique above. Verdict: **holds after fixes**. The patch holds in every check I ran. One blocking finding is against the record, not the patch: the abort comes from one Playwright WebKit build, and three other installed builds render every value the report says aborts.

## What I ran

All on my own plain archives of `release/11.1.1` at `e12ad9f02` (`src` and `tests` the same as `48ab5d94e`), under `trees/k6-*`, removed when I was done. Records and my probe are in `record/critic-k6/`. `report-rows-webkit.json` there is build 2311.

- **The patch.** Inside the glass-ui work tree, `git apply --check cure.patch` prints "Skipped patch" for all three files and exits 0, as ROOT warns. With git's repository search stopped at `trees/` (`GIT_CEILING_DIRECTORIES`), the check passes and the patch applies. The cured tree differs from the base in the three files only.
- **The harness**, built on each tree with glass's CSS targets. The built hover token is one mix on the cure. Lightning CSS puts its usual first-arm fallback in front of it on both trees.
- **Witness**, my copy, Playwright WebKit 26.5 (build 2311), 54 cells:
  - base: 10 abort. These are the Select trigger, ToggleGroup item, Accordion trigger and bare `.control-surface` on hover, in each scheme, and in dark the Blob and its reduced-motion form on load;
  - cure: none abort;
  - WebKit applies the cured hover rather than dropping it: the hover reads alpha 0.114 in light and 0.154 in dark, which is 0.65 of the quiet rung plus 0.35 of the resting rung;
  - `.control-surface` is used only by the Select trigger and the ToggleGroup item, and `.disclosure-group-trigger` only by the Accordion trigger, so the four hover cells cover every surface that reads the hover token.
- **Readings**, my copy, Chromium 149. The hover token's largest ΔE OK is 8.0e-5 (light, level 0.75). At level 1 it is 1.3e-5 in light and 8.1e-6 in dark. Alpha is unchanged in every cell. `--blob-shadow-color` is within 3.6e-6, and the 20% and 44% shadow colours are identical. This matches the record.
- **Gate.** The cured file passes 3 of 3. The new test, copied onto the base, fails and names `glass.css:263` and `shadow.css:108`. Replacing the cured hover with a mix of `--control-surface-bg` and `--glass-plate-resting`, or restoring the old blob token, makes it fail again (`gate-mutants.txt`).
- **Consumer values**, my copy of `consumers.mjs`, WebKit 26.5, on the cure:
  - none of the 60 consumer cases abort, and 5 of the 14 what-if rows abort, row for row as in `record/r2/what-if-cure-webkit.json`;
  - with value.js's dark `--shadow-color`, the dark Blob renders and its shadow takes value.js's ink (`0.298 0.291 0.283 / 0.2`, against glass's own `0.005 0.005 0.004 / 0.2`), so the override is live and not ignored;
  - on the base, the value.js cases abort: the dark Blob on load, and the hover root.
- **Consumer source**, read-only:
  - none of atlas, value.js, keyframes, fourier, daraksha, gaggle, hassio-config, slides, parkway, speedtest, gregg, chicago or feedback-coder sets `--glass-plate-quiet`, `--glass-plate-resting`, `--control-surface-bg-hover`, `--blob-color` or `--blob-shadow-color` in CSS, a Vue template or a script;
  - speedtest sets `--control-surface-bg` in one scope, which the cure does not touch;
  - value.js reads `--glass-plate-resting` in a contrast probe, and the cure leaves that token as it was;
  - I searched consumer scripts and templates for custom properties written as a `color-mix()`. I found two, value.js's `--md-color-h3` and a parked slides deck's `--feedback-mark-color`, and neither is a glass token.
- **The dock edge.** ROOT says `dock.css:147` is safe under slides' mixed borders, because the scopes that alias both ends to `--glass-border-floating` also set the lerp outright. That holds. `adaptive-legibility.css:99-100` and `morph.css:396-397` set both, and their selectors outrank `.dock-plate` in the same layer.
- **Comment gates.** The census finds no prose-class or commented-out-declaration hits in the two changed token files, before or after (`G-COMMENT-RATIO` and its dead-declaration arm). The rostered `it()` titles in `color-mix-endpoints.test.ts` are unchanged, so `gate-register` sees no drift.
- **The report's table**, my own probe (`probe/report-rows.mjs`), one page per row, 28 rows and `reduced.html`. In WebKit 26.5 every row comes out as the report says. Chromium resolves `reduced.html` to `oklab(0.583088 0.0367287 -0.0180101)`, the value the report gives.
- **The same rows in the three other WebKit builds installed here**, each driven by the Playwright that ships it: 26.4 (build 2287, value.js's Playwright 1.60.0) and 27.2 (builds 2370 and 2388, hassio-config's 1.64.1 and speedtest's 1.65.0). See B1.
- **keyframes' probe** is not in `~/Programming/keyframes.js` or its sibling checkouts. This confirms ROOT.

## Blocking

**B1. The abort belongs to one WebKit build, and the record and report call it WebKit's.**

- In Playwright WebKit 26.4 (build 2287) and 27.2 (builds 2370 and 2388), every row the report lists as aborting renders, `reduced.html` included. This covers all 11 value rows, all 8 properties, the two registered `<color>` arms, and the hover rule. Each resolves to the colour Chromium gives, to within serialisation: `reduced.html` is `oklab(0.583092 0.036702 -0.018022)` (`report-rows-webkit-2287.json`, `-2370.json`, `-2388.json`). Only 26.5 (build 2311, glass's own Playwright 1.61.1) aborts.
- glass's own 11.1.1 base renders in 27.2 too (`witness-base-webkit-2388.json`). In build 2388, these cells run with no abort, in both schemes:
  - the Select trigger, ToggleGroup item, Accordion trigger and bare `.control-surface` take the old hover, `oklab(0.28 0.012 0.033 / 0.114)` in light and `oklab(0.17 0.010 0.028 / 0.154)` in dark;
  - the Blob and its reduced-motion form load.
- The 10.1.5 critic's records agree. In WebKit 2287, on 2026-11-09, they read the dark `--blob-shadow-color`, a mix of two mixes, as a background colour without an abort (`docs/release-10.1.5/critic-8/probe/branch/webkit/c8a-fine.json`).
- The patch does not depend on this. Its colours are equal and it removes a mix of a colour with itself. Glass's own browser tests, gaggle (1.61.1) and fourier (1.61.0) all drive the aborting build. Which shipping Safari, if any, carries the 26.5 build's change is not known.
- What has to change:
  - **WEBKIT-REPORT.md:** say that the abort reproduces in Playwright WebKit 26.5 (build 2311) and not in 26.4 (build 2287) or 27.2 (builds 2370 and 2388), so it looks like a regression that a later trunk build has already fixed. As written, the owner would file it as a live trunk bug. File it only if Safari Technology Preview or a shipping Safari aborts on `reduced.html`. If one does, the bisect range from 2287 to 2311 belongs in the report.
  - **ROOT.md:** give the same window under Cause and under what was not run, and stop calling it a WebKit abort without the build.

## Not blocking

- **The gate's self-mix case misses two common spellings** (`gate-mutants.txt`):
  - a weight written as `var()`, as in `color-mix(in srgb, var(--x) var(--w), var(--x))`. glass writes weights this way throughout (`var(--blob-shadow-strength)` is one), so the blob form with a `var()` weight passes the gate;
  - a weight written as `min()` or `clamp()`.

  `namesOf` gives up whenever an endpoint has two words left after it drops numeric and `calc()` weights. One fix is to take every top-level `var()` word of each endpoint as a candidate and flag a shared name. These gaps are smaller and need not hold the item:
  - a `color-mix()` written without `in <space>` puts its endpoints at `args[0..1]` and is skipped (glass writes none);
  - a registered `<color>` property whose `initial-value` is a mix is not a producer.
- **The cure reaches neither reporter.** keyframes and value.js both pin glass 10.1.3. So do fourier; atlas takes `^10.1.0`, and daraksha, slides and parkway pin 10.1.4. Only gaggle (11.0.0), hassio-config (11.1.0) and speedtest (11.0.1) are on 11. ROOT's 10.1 bullet names value.js alone. Whether a 10.1.x item is needed is the orchestrator's call, and B1 bears on it: value.js tests with Playwright 1.60, whose WebKit does not abort.
- **The new `shadow.css` comment gives one cause where there are two.** It says the self-mix became a mix of two mixes "with a consumer's `--shadow-color` that is a `color-mix()`". glass's own dark `--shadow-color` (`dark-arm.css:92`) is one, which is why the base Blob aborts in dark with no consumer value. Something like "whenever `--shadow-color` is a `color-mix()`, as glass's own dark value is" would cover both.
- **The gate file's header counts were already out of date and are now further off.** The header says 75 resolved endpoint contexts over 23 files, 4 in `shadow.css` and 2 in `tokens/glass.css`. My count is 67 over 19 files on the base (22 in `shadow.css`, 3 in `glass.css`) and 54 over 19 on the cure (11 and 1) (`gate-header-counts.txt`). The cure edits this header, so it could correct the figures or drop them.
- **The narrower shape departs from the brief.** I agree with the first critic and with ROOT. The isolation records, the first critic's literal pass and my report rows all show that one mixed arm renders, relative colour or not. The 23 sites the brief named are kept, and the orchestrator should rule on that change from the brief.
- **The owner's laws hold:**
  - the patch touches no transition, so each hover eases as it did before;
  - no fallback is added;
  - each change is at the token that produces the shape, not at the rule that applies it.
- **Real Safari has not been checked**, which the record and report both say. B1 makes that check matter more: three of four Playwright builds say the shape is safe.

## To close

1. Correct WEBKIT-REPORT.md and ROOT.md with the build window (B1).
2. Optionally, widen `namesOf` to `var()` weights and correct the `shadow.css` comment.
