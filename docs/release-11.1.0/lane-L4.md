# glass-ui 11.1.0 · lane L4 (type and material)

The build seat for lane L4 on `release/11.1.0`, run by claude-opus-5-5. It read `lane-L1.md`,
`lane-L2.md`, `lane-L3.md` and both orchestrator notes first. The restraint note adds O-204 (3)
(the Blob wrapper's paint containment) to this lane. It then read the INBOUND rows O-163, O-173,
O-175, O-185 and O-204, and the addenda in W-E.11 (O-173 G2) and W-C.5 (O-175). Every build, test
and browser run went through `~/.claude/guard/guarded`, and every WebKit run held `--exclusive webkit`.
The guard refused nothing. Heavy runs queued for a slot, at load up to 40, for up to 20 minutes.
The kernel zone warning printed `ARMED` at inuse ≈ 30k throughout.

Commits (read from `git log`): `429cae999` holds the code, the README, the CHANGELOG section and the
unit test. `d4b06c675` holds the grain as gradient background dots (see the run history). The records commit carries this file, plus the ratchet rebind if the gates needed one
(see Gates).

Records: `lane-L4/probe.mjs` (scheme, grain and blob, on the vite-served `harness/`),
`fontprobe.mjs` (fonts, on a built package), `consumer.mjs` with `consumer/` (a Vite consumer
build). The chain is `chain.sh` → `witness.sh` → `runprobe.sh`. Readings are in
`out/{green,red}-{chromium,webkit}.json` and `*-fonts.json`, with logs beside them,
`out/consumer-{green,red}.json` and `out/chain.log`. Cropped paint is in `out/png/`, and
run 1 is kept in `out/run1/`. The gates are `gates.sh`, `e2e.sh` and `e2e-webkit.config.ts`, with
results in `gates/`.

**RED trees.** The source tree is `git archive v11.0.0` (tranche records excluded) at
`.cache/l4-v1100`, with `node_modules` symlinked and the harness copied in. The harness imports the
library by relative source path, so one page runs on both trees. The package is the published
11.0.0 tarball (`npm pack @mkbabb/glass-ui@11.0.0`, `.cache/l4-pack/package`), which is v11.0.0's
`dist/`. The branch package is this worktree's `dist/`, built from the code commit's tree.

**Engines.** Chromium is Playwright's headless shell. WebKit is build 2287, pinned by
`executablePath`, as in lanes L1 to L3.

**Run history** (`out/chain.log`). Run 1 had two findings, and both were fixed before run 2.
(a) The dev server injects the library's pre-paint script, which sets `.dark` and an inline
`color-scheme` from the OS, so the scheme cells never saw "no class". The scheme scene now clears
both first, which models daraksha: a consumer that sets `.dark` itself and runs no script. (b) The
first grain cure, the SVG moved from `background` to `mask-image`, passed in Chromium. WebKit still
reported an LCP entry naming `div.dock-plate` with the SVG URL, so WebKit counts a `url()` mask
as content. Run 2 painted a gradient dot field as the mask: green in both engines. The gates then
failed it. `G-DOCK-RUN` ("no edge fade survives on either axis", `g-dock-lattice.test.ts`) bans
any `mask-image` in the dock band. A mask is not needed, because a gradient background is not an
LCP candidate either. So run 3 paints the same dots as `background-image` gradients, committed as
`d4b06c675`. Run 3 is the record, and run 2 is kept in `out/run2/`.

## The matrix (run 3)

| run | O-175 (2) | O-185 | O-204 (3) | O-173 G2 | O-163 | exit |
| --- | --- | --- | --- | --- | --- | --- |
| branch · Chromium headless shell | 4/4 | 8/8 | 6/6 | 8/8 | 2/2 | 0, 0 |
| branch · WebKit 2287 | 4/4 | 8/8 | 6/6 | 6/6 (CLS n/a) | 2/2 | 0, 0 |
| v11.0.0 · Chromium headless shell | 2/4 | 0/8 | 2/6 | 2/8 | 0/2 | 1, 1 |
| v11.0.0 · WebKit 2287 | 2/4 | 0/8 | 2/6 | 0/6 | 0/2 | 1, 1 |

Exits are probe, then fontprobe (guarded's exit is the conjunction). The v11.0.0 passes are hold
lines. O-175's "light OS with `.dark` equals dark OS with `.dark`" held on 11.0.0 too. The blob's
offscreen park held on 11.0.0 too. The layout shift of a page that loads no face is 0. Every
claim of the items is RED on 11.0.0.

## O-163 · IBM Plex Sans

**What changed.** IBM Plex Sans (v3.201, OFL-1.1) ships in two styles, upright and italic. Each is
a variable woff2 file, wght 100..700, Latin subset, at `src/fonts/ibm-plex-sans/ibm-plex-sans-latin.woff2`
and `…-italic-latin.woff2`. These are byte-identical to the files parkway self-hosts, with their
`OFL.txt` beside them. Both are published under `dist/fonts/ibm-plex-sans/` through the existing
`./fonts/*` export. The faces are declared only in `src/styles/font-files.css`, with `swap`, and
they ship only as files: the inlined `styles/fonts` sheet does not carry them, so its consumers
pay nothing. A consumer selects Plex through `--font-stack-text`.

**Files.** `src/fonts/ibm-plex-sans/{ibm-plex-sans-latin.woff2, ibm-plex-sans-italic-latin.woff2, OFL.txt}`,
`src/styles/font-files.css`, `src/fonts/README.md` and `README.md`.

**Witness.** `fontprobe.mjs` serves the package. Its page links `dist/styles/font-files.css` and
sets lines in Plex 400, 500 and italic. Green: a `FontFace` "IBM Plex Sans" in each style, with
status `loaded`, and its woff2 request answered 200 from `/dist/fonts/ibm-plex-sans/`.

| reading (390 and 1440) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| Plex faces loaded (normal, italic) | none | none | both | both |

Paint: `out/png/{green,red}-*-fonts-*.png`. The `document.fonts.check` readings are not evidence.
They return `true` on 11.0.0 for faces that do not exist (no matching face means nothing to wait
for), so the verdict reads the loaded `FontFace` set instead.

## O-173 G2 · fonts as files

**What changed.** There is a new export, `@mkbabb/glass-ui/styles/font-files` →
`dist/styles/font-files.css`. It declares every packaged face: Plus Jakarta Sans and Fira Code
(latin and latin-ext) and IBM Plex Sans. Each `url()` points at the woff2 file shipped beside it,
`url("../fonts/<family>/<face>.woff2")`. The source `src/styles/font-files.css` is
`@import "./fonts.css"` plus the Plex faces, so the brand faces stay declared once. At build,
`linkFonts` (`vite.style-fold.ts`) flattens that `@import` into the published sheet and rewrites
the package URLs to relative file URLs. It runs before `inlineFonts`, which still inlines
`fonts.css`. The two now share one URL pattern, `PACKAGE_FONT_URL`. A bundler that follows the
sheet hashes and copies each file, and the browser fetches a face only when text uses it. The
latin Jakarta file's stable path for a preload is
`@mkbabb/glass-ui/fonts/plus-jakarta-sans/plus-jakarta-sans-latin.woff2`, reachable through
`./fonts/*`. The README shows the Vite `?url` preload. It is not a new explicit export key,
because the wildcard already names it.

**Not shipped: the break.** The addendum asks that `fonts.css` itself keep `url()`s. Two
consumers emit that sheet verbatim, and neither follows a `url()`: speedtest imports
`@mkbabb/glass-ui/styles/fonts?url` (`index.html:359`), and value.js's `vite-defer-glass-fonts.ts`
emits it as a standalone asset. For them, relative URLs would 404 every face. A minor must not
break a consumer, so `./styles/fonts` is unchanged. The build's `dist/styles/fonts.css` is
byte-identical to 11.0.0's (`cmp`, 132,840 bytes). The file delivery ships as the new, additive
entry. Making files the only delivery is a major (open gap).

**Files.** `src/styles/font-files.css` (new), `src/styles/fonts.css` (header only),
`vite.style-fold.ts`, `vite.style-assets.ts`, `scripts/lib/subpath-policy.mjs`, `package.json`,
`README.md` and `src/fonts/README.md`.

**Witness, consumer bundler** (`consumer.mjs`, one guarded run, both packages). A Vite consumer
whose entry CSS is `@import "@mkbabb/glass-ui/styles/font-files"`, resolved through the
package's own `exports` entry.

| reading | v11.0.0 package | branch package |
| --- | --- | --- |
| `./styles/font-files` export | absent (build cannot resolve it) | `./dist/styles/font-files.css` |
| consumer entry CSS | n/a | 1,986 bytes |
| data URIs in the consumer CSS | n/a | 0 |
| woff2 files Vite copied and hashed | n/a | 6 (27.3 KB, 21.7 KB, 36.3 KB, 13.3 KB, 40.2 KB, 44.9 KB) |
| verdict / exit | RED · 1 | GREEN · 0 |

The `consumer red exit 0` line in `chain.log` is the shell's exit from the `echo` after
`consumer.mjs`, not the reading. The verdict is `pass` in `out/consumer-{green,red}.json`.

**Witness, browser** (`fontprobe.mjs`, 390 and 1440; fonts are theme-independent, so light only).

| reading | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| `font-files.css` status / bytes / data URIs | 404 | 404 | 200 / 2,145 / 0 | 200 / 2,145 / 0 |
| Jakarta (400 and 600 from one variable face) and Fira Code loaded | no | no | yes | yes |
| woff2 requests, all 200 under `/dist/fonts/` | none | none | 3 (Jakarta latin, Fira latin, Plex) | 3 |
| layout-shift sum | 0 | n/a (no API) | 0 | n/a (no API) |

Latin-ext faces were not requested, because the text is Latin. That is the unicode-range split
working.

## O-175 (2) and (3) · the class is the mode; the shadow tokens

**(2) What changed.** `tokens/scheme-motion.css` changes `:root { color-scheme: light dark }` to
`color-scheme: light`. `.dark { color-scheme: dark }` (dark-arm.css) was already there. Every
`light-dark()` token resolves against the used scheme, so with the class absent the OS can no
longer resolve them dark. The class is the one authority. A consumer that wants the OS default
sets the class from `prefers-color-scheme`. The shipped pre-paint script and `useGlobalDark`
already do, so their consumers see no change. Part (1), the dark `--shadow-color`, is not touched
here (10.1.5, forward in 11.0.1).

**(3) What changed.** The README's Design Tokens section gains a "Shadow tokens" table, the one
record of the public set: `--shadow-color`; the five `--glass-shadow-{wash,quiet,resting,floating,overlay}`
and `--glass-shadow-capsule`; `--glass-under-shadow-{quiet,default,vivid}`;
`--shadow-cartoon`, `-hover`, `-sm`, `-md` and `-lg`; `--shadow-dock` and `--shadow-dock-collapsed`;
and the seam `--shadow-dock-override`. All are documented as public and stable within a major.
None is made private, because removing consumer reach to a token a consumer sets (daraksha sets
all five families) would break it in a minor. Every other `--shadow-*` is stated internal.

**Files.** `src/styles/tokens/scheme-motion.css` and `README.md`. Test:
`tests/styles/shadow-token-surface.test.ts` (it reads the README table and asserts the five
consumer families are listed and that each listed token is declared or read as a seam in `src`).

**Witness (2).** Four states, the OS scheme (context `colorScheme`) crossed with `.dark`. Each
reads the html `color-scheme`, the page ground, a card, its ink, muted ink, and a popover's plate
and ink.

| reading (390 and 1440; both engines identical) | v11.0.0 | branch |
| --- | --- | --- |
| dark OS, no class: html `color-scheme` | `light dark` | `light` |
| dark OS, no class: card / ink | `rgb(53,42,34)` / `rgb(233,230,226)` (dark arm) | `rgb(253,245,236)` / `rgb(28,25,23)` (= light OS) |
| dark OS, no class == light OS, no class (6 values) | 6 differ | equal |
| light OS, `.dark` == dark OS, `.dark` (hold line) | equal | equal |

Paint: `out/png/*-o175-*` (the card per state).

**Witness (3).** `shadow-token-surface.test.ts`, run under `guarded --light` against each tree's
README and `src`: v11.0.0 exits 1 (2 of 2 fail: `expected [] to include '--shadow-dock-override'`),
and the branch exits 0 (2 of 2). Logs: `out/shadow-tokens-{red,green}.log`.

## O-185 · the dock grain is never an LCP entry

**What changed.** `.dock-plate::after` painted `--paper-clean-texture`, an SVG `url()`, as its
`background`. It now paints a generated dot field of foreground ink: three `radial-gradient` dot
lattices at co-prime pitches (7, 11×13 and 17×19 px) as `background-image`, so the pattern
repeats only every few hundred pixels. Opacity (`--glass-grain-opacity`), the overlay blend and
the dark soft-light arm are unchanged. A gradient is never an LCP candidate in either engine. It
is not the SVG as a mask, because WebKit counts a `url()` mask as content too (run 1). It is not a
mask at all, because the dock band carries no `mask-image` (`G-DOCK-RUN`, run 2).
`scale-paper.css`'s compose-your-own note now says that `--paper-clean-texture` is a `url()`
image, which browsers count as content, and that glass decoration does not paint it. The token
stays for consumers.

**Files.** `src/components/dock/styles/dock.css`, `src/components/dock/styles/shell.css` (a
comment) and `src/styles/tokens/scale-paper.css` (a comment).

**Witness.** A GlassDock of five glyph controls and one 12 px word: the page's only `url()` paint
is the grain on 11.0.0, and there is none on the branch. A buffered `largest-contentful-paint`
observer is installed before navigation and read 1.5 s after load (WebKit 2287 supports the type).
The probe also reads the pseudo's computed `background-image` and `mask-image`.

| reading (390 and 1440, light and dark) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| LCP entries | `div.dock-plate`, 13,716 px², the SVG data URL | `p` 187, then `div.dock-plate` 13,716 | `p` 210 only | `p` 187 only |
| `::after` background-image / mask-image | SVG `url()` / none | SVG `url()` / none | `radial-gradient(…)` ×3 / none | same |

**Paint.** The plate crops (`out/png/*-o185-*`), compared branch against v11.0.0 per engine and
cell: the largest channel delta is 0 in light and 1 in dark, with means of 0.000 and 0.014 to
0.038. At `--glass-grain-opacity` (0.025, the probe read `0.025` in both themes) both grains sit at or below one
8-bit step, so the plate reads the same. The CHANGELOG says "at the same faint strength", not
that the dot field and the noise are the same texture.

## O-204 (3) · the blob paints past its box

**What changed.** `.goo-blob-wrapper` drops `content-visibility: auto` (and its
`contain-intrinsic-size`). `content-visibility: auto` turns paint containment on whenever it is
set, not only while the box is skipped (the old comment said otherwise), so it clipped the 160 %
canvas to the wrapper. The orchestrator note offered two cures, the existing observer path or
`contain` without `paint`. This uses both. `contain: layout style` stays (no paint), and the
offscreen park is the renderer's own `IntersectionObserver`, which `useMetaballRenderer` already
composes (`composeIntersectionPark: true`, 200 px margin). That is why nothing new was needed to
keep the park. The visibility leaf's `content-visibility` listener stays for consumer ancestors
that set it. A consumer's own clipping ancestor still clips (value's anchor), and that remains
the consumer's.

**Files.** `src/components/blob/Blob.vue` (style block) and `src/components/blob/README.md`.

**Witness.** Reach: one body of raw radius 0.62 (0.3875 uv, past the wrapper's 0.3125 edge,
inside the canvas's 0.5), no satellites, tempo 0, in a 200 px wrapper on open ground. The probe
samples the full-page screenshot 10 px outside each wrapper edge, compares it with the ground
150 px away (green when the max channel Δ > 40 on all four sides) and confirms the body drew
(centre Δ > 40). Park: the default animated blob, counting `requestAnimationFrame` calls (wrapped
before mount) over 1 s visible, 1 s scrolled 4000 px away, and 1 s back.

| reading (light 390; every cell the same pattern) | v11.0.0 Chromium | v11.0.0 WebKit | branch Chromium | branch WebKit |
| --- | --- | --- | --- | --- |
| Δ 10 px outside right / left / top / bottom | 14 / 16 / 10 / 20 | 11 / 14 / 7 / 19 | 124 / 144 / 101 / 165 | 125 / 142 / 104 / 162 |
| dark: the same four | 14 / 15 / 10 / 20 | 11 / 12 / 8 / 18 | 214 / 190 / 220 / 173 | 214 / 189 / 220 / 172 |
| computed `content-visibility` | `auto` | `auto` | `visible` | `visible` |
| park frames: visible / away / back (390; 1440 alike) | 98 / 0 / 87 | 98 / 0 / 98 | 63 / 0 / 65 | 98 / 0 / 98 |

Paint: `out/png/*-o204-*`. 11.0.0 draws the disc cut to a square with clipped corners. The branch
draws the whole disc. The v11.0.0 deltas of 7 to 20 are the drop-shadow at the clip edge.

## Gates

`lane-L4/gates.sh` runs the build-side gates as ONE guarded heavy run on the committed tree
(`d4b06c675`). `lane-L4/e2e.sh` runs the touched e2e specs as guarded browser runs. Logs and JSON
are in `lane-L4/gates/`, and exit codes are in `gates/chain.log`. The first gate run, on
`429cae999` and kept in `gates/run1/`, is where `G-DOCK-RUN` failed the masked grain (see the run
history). Before each commit, `typecheck` was clean, and the changed suites (`tests/styles`,
`tests/components/blob`, `tests/components/custom/dock`, `tests/gates`,
`tests/composables/dark`) ran under `guarded --light`. `boot-graph`'s staleness case was red
there only until `demo:dist:build` ran.

| gate (on `d4b06c675`) | result | exit |
| --- | --- | --- |
| `npm run build` | built; `dist/styles/fonts.css` byte-identical to 11.0.0's | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` | 275 files; 2545 passed, 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` | `G-BUNDLE-RATCHET` increase 3007136 > 2917350 | 1 |
| ratchet rebind 2917350 → 3007136 (+89,786 B), committed with this record | | |
| `npm run verify:package` | CLEAN; roster 292/292 | 0 |

**The rebind's reason.** The content bytes grow by this lane's shipped files. The two Plex woff2
files are 85,156 B (40,240 + 44,916), the reason the row asked for. `dist/styles/font-files.css`
is 2,145 B. The rest (about 2.5 KB) is the `linkFonts` pass, the new export entry, and the grain's
gradient rule against the shorter SVG `var()` it replaces. The roster is unchanged: `@font-face`
rules and a stylesheet export are not `@theme` or `@utility` entries.

**e2e specs these items touch** (`blob-render` and `blob-pause-seam` for the Blob,
`dark-semantic-contrast` for the scheme, `font-cascade-live` for the faces, `dock-plate-clearance`
for the plate), each engine, each tree, compared by title:

| run | passed | failed | exit |
| --- | --- | --- | --- |
| branch · Chromium headless shell | 7 | 6 | 1 |
| v11.0.0 · Chromium headless shell | 7 | 6 | 1 |
| branch · WebKit 2287 | 7 | 6 | 1 |
| v11.0.0 · WebKit 2287 | 6 | 7 | 1 |

No title fails on the branch alone. The six shared failures are 11.0.0's, and they are identical
in both engines on both trees. In `blob-render`, the stock blob's interior-corner empty fraction is
0.453 against a 0.7 floor, and the hover-flick centroid shift is −0.002 against ≥ 0.012. Both
specs read `BLOB_CONFIG_DEFAULTS`, which this lane does not change. The four
`dock-plate-clearance` cells fail at `page.goto` with `ERR_CONNECTION_REFUSED` on
`localhost:5199`, a server the spec expects and neither config starts. The one difference runs
the other way: WebKit's `blob-pause-seam` "PARKS the render loop" fails on 11.0.0 and passes on
the branch. `dark-semantic-contrast`, `font-cascade-live` and Chromium's `blob-pause-seam` pass
on both.

## CHANGELOG

The 11.1.0 entry gains a "Type and material" section with six bullets, one per item: IBM Plex
Sans and how to select it; the `styles/font-files` entry, when to choose it over `styles/fonts`,
the preload path and the `file:`-link note; the `.dark` class as the theme, what changes for a
consumer with no pre-paint script, and how to follow the system; the public shadow tokens; the
dock grain and LCP, and that a consumer's `--glass-grain-opacity: 0` workaround can go; and the
blob's paint past its box.

## Open gaps

- **O-173 G2, the break.** `./styles/fonts` still inlines base64 (unchanged bytes), because
  speedtest's `?url` import and value.js's verbatim-emit plugin would 404 every face on relative
  URLs. Making files the only delivery, and retiring the inlined sheet, is a major. Those two
  consumers move to `styles/font-files` or self-host first.
- **W-E.11's own cure** (`font-display: swap` for Jakarta, the demo preload, the per-platform
  advance-width-calibrated fallbacks) was not in this lane's scope. The brand faces keep
  `optional` in both sheets. Plex uses `swap` and has no calibrated fallback face.
- **Plex coverage.** Latin only, no latin-ext. The OFL texts in `src/fonts/*/OFL.txt` are not
  copied into `dist/` (true for all three families since before this release; the closure copies
  only referenced files).
- **O-175 (2), the inline mirror.** `useGlobalDark` and the pre-paint script still write
  `html.style.colorScheme` alongside the class. It always agrees with the class, so it is
  redundant, not a second authority. W-C.5 item 4's deletion is left for a major, because it is
  observable.
- **O-175 (2), consumer impact.** A consumer that set no class and relied on the OS to paint
  dark gets light. On 11.0.0 that page was half-dark (the class-keyed rules stayed light), so
  this is a cure. It is a visible change, and the CHANGELOG states it.
- **O-185.** Only the dock's grain was a glass `url()` paint. `paper.css`'s
  `.paper-grain-overlay` and paper ground (a coloured raster tooth) still paint `url()`
  backgrounds. They are page-paper registers, not glass decoration, and a mask would lose their
  colour. A consumer page made mostly of paper can still see an LCP entry name them.
- **O-204 (3).** It was measured in the headless shell (SwiftShader WebGL) and WebKit 2287, not
  Chromium on ANGLE Metal: a GPU witness needs full Chrome for Testing, which the machine law
  reserves for a named need. The owner's "more pronounced, less shaded" satellites (O-204's other
  parts) are not this lane's.
- **LCP in WebKit** is read through Playwright WebKit 2287's own `largest-contentful-paint`
  support. Real Safari is unmeasured.
