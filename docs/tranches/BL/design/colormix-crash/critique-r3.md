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
