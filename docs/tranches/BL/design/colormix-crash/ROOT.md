# The WebKit page abort from a nested color-mix token

Base: `release/11.1.1` (`src` and `tests` unchanged since `48ab5d94e`). Cure: `cure.patch`, three files. `git apply --check` passes on a plain archive of 11.1.1 taken outside the glass-ui work tree, and applying it reproduces the cured tree byte for byte. Inside the work tree (under `trees/`), `git apply` skips every path outside the current directory, so a check there passes without testing anything.

This is the fix seat's round 2. It answers the round-3 critique (`critique-r3.md`, B1) and keeps the earlier work that still holds: the harness, the sweep, the isolation rounds, the hover rewrite, the reduced case and the WebKit report. Round 2 makes these changes:

- **The blob hunk is replaced.** The round-1 cure changed the dark `--shadow-color` producer in `dark-arm.css`. That file is now untouched, and `--blob-shadow-color` becomes `var(--shadow-color)`.
- **The gate gains a second case:** a color-mix whose two endpoints are one custom property.
- **Real consumer values are witnessed in WebKit.** A new probe reads the overrides each glass consumer declares in its own source and runs glass's detector with them added. The witness then applies those values in WebKit on both trees.

## Cause

Playwright WebKit 26.5 aborts the page process with SIGABRT (`std::terminate` in `WebCore::Style::Color::resolvedColor`, called from `toStyleColor(CSS::ColorMix)`; `record/webkit-backtrace.txt`). It does this whenever it applies a `color-mix()` whose two colour arms each contain a `color-mix()`.

An arm counts as containing a mix if it is any of these:

- a mix;
- a relative colour whose origin is a mix;
- a `light-dark()` holding a mix;
- a registered `<color>` property holding a mix.

The round-1 isolation records hold (`record/isolate-webkit.json`, `isolate2-webkit.json`, `isolate3-webkit.json`, `isolate4-webkit.json`):

- both arms holding a mix aborts, with or without a relative colour;
- one mixed arm renders, whatever it holds;
- every colour property aborts, on load as well as on hover;
- Chromium 149 resolves all of these.

A mix of one custom property with itself, `color-mix(in srgb, var(--x) 22%, var(--x))`, is that shape whenever `--x` is a mix, and glass cannot see the value a consumer gives `--x`. That is B1.

## Sweep (`probe/sweep.mjs`; `record/r2/sweep-base.json`, `sweep-cure.json`)

213 declarations on the base hold a `color-mix()`, and 105 of them have an arm that resolves to a mix:

| Class | Base | Cure |
|---|---|---|
| both arms hold a mix (aborts) | 11 | 0 |
| one mixed arm holding a relative colour (the brief's shape) | 23 | 23 |
| one mixed arm, no relative colour | 71 | 78 |

The 7 added to the last row are the 4 blob shadow rungs and the 3 Blob filters. Each now mixes `--blob-shadow-color` with `transparent`, so it has one mixed arm in dark. The round-1 cure moved these 7 into the brief's shape. This cure adds nothing to it.

**The crash shape: two roots, 11 declarations**

| Site | What it is | Base, WebKit | Cured, WebKit |
|---|---|---|---|
| `src/styles/tokens/glass.css:263` `--control-surface-bg-hover` | a mix of `--glass-plate-quiet` and `--glass-plate-resting` (`:166-167`), each a mix with a relative-colour arm | the root | `:265`, one mix |
| `src/styles/glass/control-surfaces.css:86` `.control-surface:hover` | applies it | aborts on hover: Select trigger, ToggleGroup item, a bare `.control-surface`, light and dark | renders |
| `src/components/_shared/disclosure/disclosure.css:90` `.disclosure-group-trigger:hover` | applies it | aborts on hover: Accordion trigger, light and dark | renders |
| `src/styles/tokens/shadow.css:108` `--blob-shadow-color` | `color-mix(in srgb, var(--blob-color, var(--shadow-color)) 22%, var(--shadow-color))` on `:root`, where `--blob-color` is never set (`Blob.vue:294` sets it on the wrapper), so `--shadow-color` mixed with itself; in dark `--shadow-color` (`dark-arm.css:92`) is a mix | the root, dark only | `:112`, `var(--shadow-color)` |
| `src/styles/tokens/shadow.css:113, 133, 142, 144` ambient, contact, hover, contact-hover | each mixes `--blob-shadow-color` with `transparent` | carry it | one mixed arm |
| `src/components/blob/Blob.vue:351, 356, 413` the `drop-shadow()` filters (rest, hover, reduced motion) | apply them | aborts on load in dark, with and without reduced motion | renders |

**The brief's shape, one mixed arm holding a relative colour: 23 declarations, none abort.** The sites and their witness cells are the same as in round 1:

- `feedback-tone.css:81`, `button/styles.css:167`;
- `icon-button.css:148, 245`, `tab-button.css:88`, `triggers.css:89`;
- `sheet/styles.css:375`;
- `control-bit.css:204, 205, 244, 249, 263, 270, 297, 306`;
- `control-surfaces.css:123`, `focus-veil.css:74`, `glass.css:116`, `dark-arm.css:292`;
- `glass-capsule.css:49`, `scale-paper.css:84`, `sizing.css:275`, `base-misc.css:272`.

Every one renders in WebKit on both trees.

## Consumer values (B1)

`probe/exposure.mjs` reads every custom property each consumer of glass declares in its own source, skipping bundles, caches, tests and vendored copies of glass. It adds those declarations as producers and runs glass's two-mix detector over glass's declarations. Producers are pooled across selectors and schemes, so a hit is a candidate, and `probe/consumers.mjs` settles each one in WebKit.

18 consumer repos were read. 8 set a token glass reads to a `color-mix()` (`record/r2/exposure-*.json`, `.txt`, with the producer chain behind each hit).

| Consumer value (as declared) | Candidate sites | WebKit, base | WebKit, cure |
|---|---|---|---|
| value.js: `.dark { --shadow-color: color-mix(in oklab, var(--foreground) 34%, var(--background)) }` | (on the base, already `shadow.css:108`) | Blob and its reduced-motion form abort on load in dark | render |
| value.js, more contrast: `--border` and `--muted-foreground` mixes | none | the hover root aborts; the rest render | render |
| hassio-config: `--glass-accent` set to a mix of a mix on its room `Card` | `rim.css:69` | renders: `Card` sets its border rung as a relative colour, so the accent is the only mixed arm | renders |
| hassio-config: `--control-checked-bg`, `--control-bit-fill`, `--shadow-md` mixes on its switch and bits | none | render | render |
| slides: `--glass-border-quiet`, `-resting`, `-floating` mixes, light and dark | `dock.css:147` | the hover root aborts; the dock plate renders. Its expanded end is `--glass-border-dock`, a relative colour, so the floating mix is the only mixed arm. The candidate came from pooling with `morph.css` and `adaptive-legibility.css`, which set the lerp to the floating token alone wherever both ends are floating | render |
| parkway: light `--glass-veil-ink` and dark `--card` mixes | 15 (plates, wells, control bits, dock press) | the hover root aborts; the rest render: the two values sit in different schemes | render |
| speedtest: `--card: color-mix(in oklab, var(--card) 92%, transparent)` | 7 | not run as written: the value refers to itself, so `--card` is invalid there, not a mix. Run instead as `--card` a mix under the light-backdrop ink flip (`ladder.css:277`): the hover root aborts and the rest render | render |

On the base, 12 of the 60 consumer cases abort, every one from the two roots (`record/r2/consumers-base-webkit.json`). On the cure, none of the 60 abort (`consumers-cure-webkit.json`).

The 60 cases cover these cells, in light and dark:

- the Blob and its reduced-motion form;
- a `Card`;
- a Select trigger and a bare control surface;
- a segmented tab and an invalid Input;
- checkbox, radio and switch bits;
- a dock plate and a dock icon button;
- a glass well and the configurator's loading shimmer.

## Cure

- `src/styles/tokens/glass.css:263` `--control-surface-bg-hover` is now one plate mix: the veil ink at the blended alpha, over `--card`.
  - The new value is `color-mix(in srgb, oklch(from var(--glass-veil-ink) l c h / calc(0.65 * var(--glass-veil-quiet) + 0.35 * var(--glass-veil-resting))) calc(var(--glass-level) * 100%), var(--card))`. The hunk is the same as in round 1.
  - At level 1 it equals the old value, and at level 0 both forms are `--card`.
- `src/styles/tokens/shadow.css:108` becomes `--blob-shadow-color: var(--shadow-color);`, the critic's `alt-blob-token.diff`. Its comment now says why this is not a mix with `--blob-color`.
  - The token resolves on `:root`, so the old mix was `--shadow-color` mixed with itself, which is that colour. No value changes.
  - The bead tint the old comment described never arrived. If it is wanted, it belongs on the wrapper, where `--blob-color` lives, as its own change with its own readings.
- `src/styles/tokens/dark-arm.css` is untouched. The dark `--shadow-color` stays the oklab mix with black, so Firefox 114 to 127 keep their dark shadows.
- `tests/styles/color-mix-endpoints.test.ts`: the detector flags a color-mix in either of two cases.
  - Its two endpoints each hold a mix through any `var()` chain or fallback (round 1).
  - Its two endpoints are the same custom property, as the `var()` or anywhere down its fallback chain (`namesOf`). This catches the blob form whatever glass's own producers say.
  - The fixture test adds two such forms, with the property a plain colour, and two that must pass.
  - On the base, the gate fails and names `glass.css:263` and `shadow.css:108` (`record/r2/test-on-base.txt`). On the cure it passes 3 of 3.

## Readings (`probe/readings.mjs`, Chromium 149, `record/r2/readings-chromium.json`)

Levels 1, 0.75, 0.5, 0.35, 0.3, 0.1 and 0, light and dark. Dark sets no level of its own, so the dark `:root` is at level 1.

| Token | Max ΔE OK | At level 1 | Alpha change |
|---|---|---|---|
| `--control-surface-bg-hover` | 8.0e-5 (light, 0.75) | light 1.3e-5, dark 8.1e-6 | 0 |
| `--shadow-color` | 0 | 0 | 0 |
| `--blob-shadow-color` | 3.6e-6 (dark) | light 4.5e-8, dark 3.6e-6 | 0 |
| the blob shadow colours at 20%, 38%, 26% and 44% | 0 | 0 | 0 |

Composited over the page and over the card, the largest difference is 4.9e-5. Every value is within the 0.01 bound.

## Witness (`probe/witness.mjs`, Playwright WebKit 26.5, `record/r2/witness-*-webkit.json`)

There are 27 cells, each in light and dark: 54 cells.

- **Cells.** The 22 from round 1, plus a `Card` on hover, a bare dock plate, a glass well, a segmented tab on hover, and the configurator's loading shimmer.
- **Base.** 10 of 54 abort: the four hover surfaces in each scheme, and in dark the Blob and its reduced-motion form, on load.
- **Cure.** None of the 54 abort.

## Tests run

Base and cure were each run on two kinds of tree:

- the sparse trees;
- a fuller archive of 11.1.1 with `demo`, `scripts` and the root files, but without `docs`, `.github` or a build.

On every run, both trees fail the same tests, all of which need files or builds these trees lack (`record/r2/tests.txt`). The cure adds 2 passing tests.

- `tests/styles` on the fuller trees: 478 passed against 476. Both fail the same 2: one needs `dist/`, one reads a docs file.
- `tests/gates`, `tests/design`, `tests/components/ui/surface`, `tests/components/custom/blob` and `tests/components/_shared`: 189 passed on each tree. Both fail the same 28, which read `docs/` or `.github/`, need `dist/` or `dist-demo/`, or need a git checkout.

## What this does not do, and what was not run

- **A consumer `--foreground` that is a mix still aborts glass**, on both trees (`record/r2/what-if-*-webkit.json`). No consumer sets one today, and the exposure probe found none.
  - With `--foreground: color-mix(in oklab, #1c1917 90%, #7c2d12)`, these abort: the checkbox on hover, checked and unchecked, and the dock plate on load. The segmented tab and the `Card` render.
  - Two endpoints that both draw their colour from `--foreground` are what does it. `probe/self-mix.mjs` (`record/r2/self-mix-cure.json`) names 4 such declarations on the cure: `dock.css:147`, `segmented.css:233`, and `control-bit.css:297` and `:306`.
  - The new gate case does not see these: the endpoints are not the property itself, but a mix or a relative colour of it. Curing them means rewriting the control-bit hover and the dock edge lerp, each with its own readings. That belongs to a later item if a consumer ever needs a mixed ink.
- **One mixed arm is open to the other arm's knobs.** Any of the 101 one-mixed-arm declarations aborts if a consumer sets a property its other arm reads to a mix. The exposure probe checks every value the 18 consumers declare today, and the witness found none that aborts on the cure. A new consumer value is checked by running `probe/exposure.mjs` and then `probe/consumers.mjs`.
- **The brief's shape is kept where it does not abort.** The brief asked that no relative colour sit inside a mix inside a mix. The 23 sites with one mixed arm holding a relative colour keep that shape, and none of them abort in WebKit on either tree. The cure removes only the shape that does abort, which is narrower than the brief. The orchestrator should accept that as a change from the brief or send it back.
- **The hover now reads the ink, the rungs and `--card` directly.** An override of `--glass-plate-quiet` or `--glass-plate-resting` no longer moves it. Neither is overridden in glass's `src` or in any of the 18 consumers.
- **Real Safari has not been checked.** Neither has Safari Technology Preview or iOS. Playwright WebKit has given the opposite result to Safari on glass before. Every abort and every clean run here is Playwright WebKit 26.5 (WebContent 625.1.21, macOS 26.4.1).
- **The 10.1 line is out of this item.**
  - `v10.1.6` carries both roots and `dock.css:131` (`record/sweep-10.1.6.json`).
  - value.js runs 10.1.3, so its dark Blob still aborts in WebKit until it moves to a release with this cure.
  - Patching 10.1.x needs its own item and witness.
- **keyframes' probe was not found** in `~/Programming/keyframes.js` or its checkouts. The isolation and witness pages stand in for it.
- **Not run:** the library build and its dist gates, the demo site, the browser test project, and the full unit suite.

## Files

- `cure.patch`: the cure.
- `WEBKIT-REPORT.md` and `reduced.html`: the report for bugs.webkit.org, for the owner to file, and its reduced case.
- `probe/`: the probes.
  - `sweep.mjs`, `isolate.mjs`, `readings.mjs`, `witness.mjs`, `reduced.mjs` and `self-mix.mjs`;
  - `exposure.mjs` (consumer source to candidate sites) and `consumers.mjs` (consumer values in WebKit);
  - the harness, which builds when copied into a tree as `cmx/` (`vite build --config cmx/vite.config.ts`).
- `record/r2/`: this round's records, cited above.
- `record/`: round 1's records. The isolation, sweep, backtrace, reduced-case and base-side records still hold. `witness-cured-webkit.json`, `sweep-cured.json` and `readings-chromium.json` describe the round-1 cure, which this round replaces.
- `record/critic-r3/`: the critic's records and probes.
