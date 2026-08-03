# MATERIAL W4 `f9b9d16e` — independent geometry, cascade, and visual critic C2

**Seat:** independent Sol x-high MATERIAL W4 geometry/cascade/visual critic, distinct from the
cross-package consumer critic  
**Date:** 2026-07-22 (America/New_York)  
**Scope:** `BJ.W-TRACK-DRY`, exact commit
`f9b9d16eed092e65b5aee7959141adad8e787ae9`; formation-only report; no product source,
test, workflow, retained-evidence, or existing-report edit; no commit  
**Overall verdict:** **DEFECT — useful structural fold / source-coordinate parity plausible / live
pixel parity RED / cascade contract RED / public CSS export RED / package and freeze RED**

The two extracted registers are a legitimate DRY opportunity. For the ordinary
`horizontal-tb` writing mode, the new zero-line plus `::before` construction re-derives the same
ideal dot-center equations as the old Slider and Progress rules across horizontal LTR, horizontal
RTL, inversion, vertical, and vertical inversion. That useful fact should be banked.

It does not close W4. The commit replaces component-scoped, unlayered mark selectors with globally
shipped, generic `.value-marks` / `.value-mark` selectors in `@layer components`; replaces two
component-specific public custom properties with the collision-prone, type-overloaded
`--track-bg`; masks inherited use of that new knob on Progress; leaves the current public
DESIGN/MIGRATION and a retained visual fixture on the retired names; and ships the required new
geometry only through the canonical `/styles` cascade, not the still-public `/styles.css` SFC
bundle. The compiled Slider and Progress render functions emit `glass-track-well` and
`value-mark*`, while `dist/glass-ui.css` contains **zero** rules for those classes. A consumer using
the published `@mkbabb/glass-ui/styles.css` path therefore loses mandatory position, clip, radius,
background, and mark paint that previously lived in the SFC bundle.

The renamed DOM-selector unit suites are 32/32 green, but they do not load a layout engine, read a
single computed mark rectangle, compare a pixel, exercise Progress's vertical CSS, inspect the
public CSS exports, or falsify the cascade collisions. Browser tooling is not callable in this
seat, so this report grants zero Chromium, Safari, viewport, PRM, forced-colors, interaction, or
pixel-identity credit.

## 0. Exact authority, byte pins, and moving-state fence

### 0.1 The requested “uncommitted W4 bundle” had already committed

The first read in this critic observed W4 already committed at `HEAD`; there was no uncommitted W4
slice to freeze. The exact authority is therefore the immutable commit, not a reconstructed dirty
diff:

| Authority | Identity |
| --- | --- |
| commit | `f9b9d16eed092e65b5aee7959141adad8e787ae9` |
| tree | `227a3625cbde0115255a7c1b3bc71a3bc8b175c3` |
| parent | `7de2ece1b9ed7b4512db1c2e4432699167ba1c1b` |
| authored/committed | `2026-07-22T02:21:35-04:00` |
| subject | `refactor(track): land BJ MATERIAL W4 — DRY the slider/progress track-well + value-marks` |
| ordered full commit patch SHA-256 | `769e865a2ba9f448ad448bbeb44e497778697982205e3a9526a9c867494f0ee2` |
| sorted changed-path manifest SHA-256 | `17ff4020aee1cbc7fda9bc77a2220853090827db2d8c11b7358a8e205829918d` |

At 2026-07-22 02:28:32 EDT the global shared worktree was materially dirty from other owners, but
all eleven W4 commit paths were clean:

| Moving-state witness | SHA-256 |
| --- | --- |
| sorted porcelain-v1 status | `ffb34ff192d7c264ccc2c3e2155ddfab624f31343e7988cb15d9b67836e4faed` |
| unstaged binary diff | `0bb41492d7378b058884171bcc9ce412e70e67145fe53cdd6ddc1aca8881ae74` |
| cached binary diff | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` (empty) |
| sorted untracked-path manifest | `be882fe712ecf26028c0cbf8ccacd07cca6b97b7b65b276482d9e9dcf744e58c` |
| W4-path porcelain status | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` (empty) |

No later moving checkout byte is treated as part of the exact W4 commit. The build readback below
was regenerated from this exact `HEAD` by `npm pack --dry-run`; it is build evidence, not retained
browser evidence.

### 0.2 Exact source and test bytes

| Artifact | Parent SHA-256 | W4 SHA-256 |
| --- | --- | --- |
| `src/components/slider/Slider.vue` | `af3aae3603122f55add3fdab8147aa39a60fb2727ee6b49da2c25518686dc339` | `85b254b8f8cd3f6a080ebe2f1f659719753d5f64ed1df5d9f9b052a8283ca75a` |
| `src/components/progress/Progress.vue` | `eb197494af9d34500f82e3f8115caef762b99a57ee0a7a76d335b17ed3581d06` | `c58e5ba32df0c6a4bcc2aedec837898e017f0076c79ba09c6fe44feb1be3bad9` |
| `src/styles/glass/track-well.css` | absent | `0dc542962a2dac1008cdf942ee2605c01f54b3ef8728e531e113a31ca3c6bd31` |
| `src/styles/glass/value-marks.css` | absent | `336775f46b097051067868641ce6dd7ece4f29dbdfc5de42abf89207a2677464` |
| `src/styles/glass.css` | — | `1cf7e9c4da819a3d8bb8b7db2baaceb01c784c565777b2112768a521e4a574b4` |
| `tests/styles/track-well-fold.test.ts` | absent | `fc086e6d68565e4bdca6b02a0653e77a7c9facf77ad7a3c4a41a09a28685c46d` |
| `tests/components/ui/slider/Slider.marks.test.ts` | — | `7b86ea996329384b5ad2a6b26ed02a42fbd11ef9fe5cc0f69a20c5c7212c6021` |
| `tests/components/ui/progress/Progress.test.ts` | — | `4516e5c61594da58b593982659c4c9889fd86489acde66c536f135a0f007a654` |

The exact targeted command

```text
npm exec vitest run -- \
  tests/styles/track-well-fold.test.ts \
  tests/components/ui/slider/Slider.marks.test.ts \
  tests/components/ui/progress/Progress.test.ts
```

passed **3 files / 32 tests** twice in this seat. That result is retained as DOM and value-domain
logic evidence only.

### 0.3 Built and packable bytes

`npm pack --dry-run --json` ran the package's `prepare` hook (`vite build && emit-types`) at exact
`f9b9d16e`; a second `--ignore-scripts` dry run pinned the resulting pack inventory:

| Package witness | Value |
| --- | --- |
| package id | `@mkbabb/glass-ui@7.0.0` |
| dry-run filename | `mkbabb-glass-ui-7.0.0.tgz` |
| package shasum | `8c7d8222b9c6f6ba8d72e357dcd7720aaf057c77` |
| integrity | `sha512-hKxxotod7jr/ill4bOVIYUOg4OX432ozV4pLL5gMxcEPP1/AFnfrwqK/qzBE7n9mihNoRxDi52FItITD0uMCYA==` |
| packed / unpacked size | 906,089 / 2,642,196 bytes |

| Built artifact | SHA-256 | W4 observation |
| --- | --- | --- |
| `dist/slider-Ck7_0JuN.js` | `a024afe26f4a143bce349310135a33813c62088dfce84450b67364b54c705c2f` | emits `slider-track glass-track-well`, `value-marks`, `value-mark` |
| `dist/progress-Co_LdjS6.js` | `02ed9bf5cb3bfd664deb68a7970fb2caa3631fe029b43921a5a1773d41c595ec` | emits `progress-rail glass-track-well`, `value-marks`, `value-mark` |
| `dist/styles/index.css` | `c64e1d3e0c62066664d5e1bc2a13cc27c1be44736393d3c40a8fef5359a902b9` | canonical `/styles`; imports the complete cascade |
| `dist/styles/glass.css` | `7396f5a5d2f182d6e071bc2819ef746d2709ce7494835826e860e12aaa03a4d8` | imports both W4 partials |
| `dist/styles/glass/track-well.css` | `99d2e589ee365230f284ed5e654b1379f38eded7c540e44db76bb3f7c28cab0c` | packed |
| `dist/styles/glass/value-marks.css` | `939314583aa6290bc4da951b59965f13ac6884e10c0bbfd7c695d33f50b58aca` | packed |
| `dist/glass-ui.css` | `ec99e5dd1ee66bf85d1c9bdc7564596abcda323d048b3b5eb55d039588deae92` | **zero** `glass-track-well`, `value-marks`, or `value-mark` occurrences |

The package successfully contains the new partials. That is not the same as proving every public
CSS export reaches them; §4 records the exact export failure.

### 0.4 Browser limitation

The supported Browser control surface is absent from the callable tool set in this seat. Only the
Node REPL helper is exposed; no Browser server/plugin operation is available. Per the user's Browser
discipline, no standalone Playwright, Computer Use, screenshot substitute, or hidden browser was
used. Source equations can prove an intended center; they cannot prove rasterization, clipping,
focus paint, animation, touch, Safari logical-property behavior, or pixel identity. Every such cell
remains RED.

## 1. Verdict matrix

| ID | Verdict | Exact judgment |
| --- | --- | --- |
| W4-GV-01 | **PASS, narrow** | Factoring `position`/clip/radius/background and the duplicate mark paint into shared source homes is a real structural reduction. Slider and Progress both compose the new classes. |
| W4-GV-02 | **PASS, source-coordinate only** | Under ordinary `horizontal-tb`, ideal center equations are equivalent for Slider LTR/RTL/inverted/vertical/vertical-inverted and Progress LTR/RTL/vertical. The direct Progress dot and the new pseudo-dot have the same mathematical center. |
| W4-GV-03 | **HOLD / pixel parity RED** | A size-bearing positioned box was replaced by a zero-width/zero-height line plus pseudo-element. Fractional layout rounding, logical-inset resolution, generated-box rasterization, and WebKit snapping can differ even when ideal equations match. No old/new pixel corpus exists. |
| W4-GV-04 | **DEFECT / false proof posture** | The 32 unit tests assert class names, inline percentages, props, counts, and events. JSDOM performs no layout; no test reads a mark rectangle or computed CSS. Renaming selectors while retaining the same expectations can stay green after a one-pixel or one-axis paint regression. |
| W4-GV-05 | **DEFECT / Progress vertical coverage** | `Progress.test.ts` verifies vertical root attributes, one fill, and three mark nodes. It never asserts `data-orientation` on the mark layer, the shared vertical selectors, bottom-origin geometry, RTL vertical centering, or pixels. `track-well-fold.test.ts` forwards vertical/inverted flags only for Slider. |
| W4-GV-06 | **DEFECT / generic global selectors** | Old mark rules were scoped and unlayered. New `.value-marks` / `.value-mark` rules are global, generic, and layered. Any unrelated app descendant with either ordinary class can be made absolute/zero-sized and receive a pseudo-dot. The in-repo zero-collision census does not make this safe for a published CSS library. |
| W4-GV-07 | **DEFECT / cascade downgrade** | Moving the mechanics from unlayered scoped selectors to `@layer components` deliberately lowers their cascade priority. Any unlayered consumer `.value-mark` rule now wins regardless of layer order, and old private-selector overrides no longer match. That may be desirable extensibility, but it is not pixel parity and has no collision/migration test. |
| W4-GV-08 | **DEFECT / generic custom property** | `--track-bg` is too broad for a public package namespace. It inherits into every descendant track well and is likely to collide with application CSS. Slider accepts an inherited value; Progress writes its own value, so the supposedly shared knob has inconsistent inheritance semantics. |
| W4-GV-09 | **DEFECT / type overload** | Slider spectrum requires `--track-bg` to accept a gradient/background image. Progress indeterminate inserts the same variable into `color-mix()`, which requires a color. One public knob therefore has two incompatible value grammars. “ONE colour knob” is already false for the canonical spectrum consumer. |
| W4-GV-10 | **DEFECT / Progress inheritance mask** | `.progress-rail { --track-bg: var(--progress-track-on-glass) }` is an unlayered local declaration. An ancestor's new `--track-bg` cannot retint Progress, while the same ancestor can retint Slider. Only an inline or sufficiently strong direct Progress declaration wins. |
| W4-GV-11 | **DEFECT / public API and docs** | `DESIGN.md` still documents `--slider-track-bg`; `MIGRATION.md` still instructs `--progress-track`; `tests-visual/on-glass-fg.spec.ts` still builds its fixture with `--progress-track`. The claimed clean break has no current public migration and its retained visual fixture cannot detect the new API. |
| W4-GV-12 | **DEFECT / `/styles.css` emitted path** | The compiled components require the new global classes, but public `./styles.css` resolves to `dist/glass-ui.css`, which has zero such rules. Canon/docs say CSS consumers may use `/styles` **or** `/styles.css`; only `/styles` reaches the partials. This is a real shipped-path geometry loss, not a browser-only suspicion. |
| W4-GV-13 | **HOLD / clipping and stacking** | Source order plausibly preserves clipping and fill-over-mark stacking: the well owns `overflow:hidden`; Slider range remains the later positioned sibling; Progress fill remains `z-index:1`. No live engine proves pseudo-dot antialiasing, near-end clipping, fill coverage, invalid/focus shadows, or spectrum thumb/range stacking. |
| W4-GV-14 | **HOLD / indeterminate and custom backgrounds** | Progress hides all children in indeterminate mode and repaints the rail gradient from `--track-bg`. Default source resolution is plausible; inherited retint is masked and a gradient-valued shared knob invalidates the `color-mix()` arm. No computed or pixel proof exists. |
| W4-GV-15 | **HOLD / PRM** | W4 adds no mark motion, and existing Progress/Slider PRM rules remain in source. That supports a no-new-motion argument, not actual PRM paint parity; the static indeterminate background, focus state, and drag settle still owe live comparison. |
| W4-GV-16 | **RED / forced colors** | Neither W4 register has a forced-colors contract. The terminal glass skin does not name track wells or value marks. Decorative marks may validly disappear, but that must be an explicit ruling while fill/track distinction and Slider focus remain perceivable; no candidate readback exists. |
| W4-GV-17 | **RED / package identity** | The dry-run artifact is still mutable `7.0.0` while deleting documented public knobs/classes and changing the required CSS import closure. It is not a unique 8.0 clean-break artifact and cannot receive freeze/release credit. |
| W4-GV-18 | **RED / Breath of Life and Goal of Glass** | DRY source structure does not establish frosted material quality, contextual transmission, engagement, or momentum. Slider spectrum/custom backgrounds and Progress lifecycle need actual rest/hover/focus/drag/mid/settle paint in Chromium and Safari. |

## 2. Geometry derivation: what is genuinely equivalent

Let the rail's physical width and height be `W` and `H`, the normalized interior mark position be
`p`, and the dot diameter be `s`. The value-domain helper rejects endpoints, so `0 < p < 1`, though
values arbitrarily close to either edge remain possible.

### 2.1 Slider

The old Slider already used a zero-width horizontal line and, for vertical, a zero-height
full-width line. W4 mostly moves that exact construction into the shared file and forwards axis
attributes to the mark-layer node.

| Slider posture (`horizontal-tb`) | Old center | New center | Source verdict |
| --- | --- | --- | --- |
| horizontal LTR | `(pW, H/2)` | `(pW, H/2)` | equivalent |
| horizontal RTL | `(W-pW, H/2)` | `(W-pW, H/2)` | equivalent through logical inline-start |
| horizontal LTR inverted | `(W-pW, H/2)` | `(W-pW, H/2)` | equivalent through inline-end |
| horizontal RTL + inverted | `(pW, H/2)` | `(pW, H/2)` | equivalent because logical inline-end maps physical left |
| vertical | `(W/2, H-pH)` | `(W/2, H-pH)` | equivalent through block-end |
| vertical inverted | `(W/2, pH)` | `(W/2, pH)` | equivalent through block-start |

The shared pseudo uses physical `left:50%; top:50%` inside a logical zero-line. That is equivalent
for the library's ordinary horizontal writing mode and direction cases. It is not proof for
vertical writing modes; neither old nor new code declares such support, so the final canon should
explicitly scope the guarantee rather than imply that “logical” means every writing mode.

### 2.2 Progress

Progress changes more. The old implementation positioned a real `s × s` dot and translated the
box by half its own size. The new implementation positions a zero-line and translates a generated
`s × s` pseudo-dot.

| Progress posture (`horizontal-tb`) | Old direct-dot derivation | New pseudo-dot derivation | Ideal center |
| --- | --- | --- | --- |
| horizontal LTR | left edge `pW`, then `translateX(-s/2)` | zero-line at `pW`, pseudo `left:50%`, then `-s/2` | `(pW, H/2)` |
| horizontal RTL | right edge `pW`; size box begins at `W-pW-s`, then `translateX(+s/2)` | zero-line at `W-pW`; pseudo physical-left plus `-s/2` | `(W-pW, H/2)` |
| vertical LTR | bottom edge `pH`; size box begins at `H-pH-s`, then `translateY(+s/2)` | zero-line at `H-pH`; pseudo `top:50%`, then `-s/2` | `(W/2, H-pH)` |
| vertical RTL | logical inline-start + `translateX(+s/2)` counter-centers the old size box | full-width line + physical `left:50%` centers independently of direction | `(W/2, H-pH)` |

The algebra supports the refactor. It does **not** prove raster identity. Engines may round the
percentage inset, size-bearing box, transform, and pseudo-element at different stages. A 33.3%
position on an odd-width rail at DPR 1 or 2 is the correct falsifier, especially in Safari. The
current tests inspect only the literal `--value-mark-position` string; they would pass if the
pseudo were one physical pixel off, fully clipped, behind the wrong fill, or absent from the loaded
CSS export.

### 2.3 Clipping, fill, and focus stack

The intended stack is defensible in source:

- `.glass-track-well` restores `position:relative`, `overflow:hidden`, and pill clipping;
- Slider's mark layer remains before `.slider-range`, so the later positioned range can cover the
  passed portion of the marks as before;
- Progress's `.progress-value-fill` retains `position:relative; z-index:1`, above the un-z-indexed
  mark layer;
- Slider invalid/focus box-shadows remain on `.slider-track`, outside the child paint; and
- spectrum's unlayered `.slider-track` background still outranks the layered well default.

Every one of those statements depends on the shared CSS actually being loaded. The `/styles.css`
export does not load it. Even on `/styles`, ideal stack order does not establish subpixel clipping,
generated-element antialiasing, or exact fill/mark occlusion; that is why old/new captures are a
terminal condition rather than an optional polish pass.

## 3. Cascade and public customization defects

### 3.1 Scoped names became generic global behavior

Before W4, the SFC compiler scoped `.slider-marks`, `.slider-mark`,
`.progress-value-marks`, and `.progress-value-mark` to their owners. Those rules were unlayered.
W4 replaces them with:

```css
@layer components {
    .value-marks { position: absolute; inset: 0; pointer-events: none; }
    .value-mark { position: absolute; inset-block: 0; inline-size: 0; }
    .value-mark::before { /* paints a dot */ }
}
```

This is not merely a rename. It changes three contract dimensions:

1. **reach:** the rules now match any consumer/application node with a commonplace class;
2. **priority:** any unlayered author rule beats the layered register, independent of specificity;
3. **override compatibility:** old deep selectors stop matching, while unrelated generic selectors
   can unexpectedly win or be mutated by Glass.

The library source happens to have no third `.value-mark` consumer today. A published library
cannot infer namespace safety from its own repository. The bounded answer is a Glass-owned class
family such as `.glass-value-marks` / `.glass-value-mark`, plus a mutation that restores the generic
names and damages an unrelated sentinel fixture.

### 3.2 `--track-bg` is both collision-prone and semantically incoherent

The old names were component-specific:

- Slider: `--slider-track-bg`, allowed to be the spectrum `linear-gradient(...)`;
- Progress: `--progress-track`, used as a color and mixed into the indeterminate gradient.

The new `--track-bg` is presented as one shared “colour knob,” but the shipped Slider demo writes a
gradient. Progress's indeterminate arm evaluates the same property inside `color-mix()`. A gradient
is valid for `background` and invalid as a `color-mix()` color operand. The one-knob fold therefore
erases a real type distinction instead of removing duplication.

Inheritance is also asymmetric:

```css
.progress-rail {
    --track-bg: var(--progress-track-on-glass);
}
```

Because that unlayered declaration sits on the rail, a wrapper-level `--track-bg` never reaches
Progress. Slider has no equivalent local assignment, so the same wrapper value reaches Slider.
Inline style on Progress can win; ordinary inheritance cannot. A shared consumer API with different
inheritance behavior is not one register.

The redress should preserve semantic typing rather than worship a smaller name count. Two bounded
options are coherent:

- retain `--slider-track-bg` and `--progress-track` as component-owned public inputs and bridge them
  into one private/prefixed shared well background; or
- make an explicit 8.0 break to collision-resistant, component-typed names, with a separate
  prefixed well default seam for direct `.glass-track-well` consumers.

One generic `--track-bg` should not survive either option. If an inheritable shared override is
kept, its precedence must be explicit. For example, the well can read a prefixed consumer override
before a component-owned default, instead of Progress assigning the consumer property itself.

### 3.3 Indeterminate, spectrum, and nested custom-property consequences

- **Progress indeterminate:** `> * { display:none }` still removes fill and marks, and the rail
  paints a gradient from the track color. Default paint is source-plausible. Wrapper-level retint is
  masked; gradient-valued retint invalidates the `color-mix()` declaration.
- **Slider spectrum:** the scoped unlayered background rule wins over the layered shared default and
  accepts the four migrated demo gradients. An unrelated ancestor `--track-bg` can now retint it,
  a collision the old component-prefixed name resisted.
- **Nested descendants:** custom properties inherit. A generic value intended for one Slider can
  retint any nested `.glass-track-well`; Progress's local assignment can similarly leak its warm
  default to nested descendants. A prefixed, typed seam makes that risk explicit and searchable.

These are public cascade facts. DOM-name unit tests cannot exercise them.

## 4. Built output and public migration are RED

### 4.1 `/styles` works in source shape; `/styles.css` does not

The package exports:

```text
./styles     -> ./dist/styles/index.css
./styles.css -> ./dist/glass-ui.css
```

The canonical `/styles` file imports `styles/glass.css`, which imports the two W4 partials, and also
folds in `../glass-ui.css`. That path is structurally complete.

The public `/styles.css` path is documented as a reachable SFC-only entry for a “cascade-free
consumer.” Before W4, the Slider/Progress position, clipping, radius, background, and mark rules
lived in their SFC styles and therefore existed in this bundle. After W4, the mandatory mechanics
live only in global partials. Exact built readback finds:

```text
dist/slider-Ck7_0JuN.js:       emits glass-track-well / value-marks / value-mark
dist/progress-Co_LdjS6.js:     emits glass-track-well / value-marks / value-mark
dist/styles/glass/*.css:       defines those classes
dist/glass-ui.css:             0 glass-track-well; 0 value-marks; 0 value-mark
```

`docs/canon/exports-and-subpaths.md:28-30` says CSS consumers use `/styles` **or** `/styles.css`.
That statement is no longer true for Slider/Progress. The closure test checks that the partials are
imported and packed; it does not instantiate both public export paths. This is an emitted-package
defect even before live paint.

The owner must choose and test one contract:

1. make `/styles.css` byte-complete for component-required global registers without double-loading
   them through `/styles`; or
2. explicitly remove/narrow `/styles.css` in the 8.0 break and make `/styles` the sole supported
   component styling path.

Leaving both exports while only one paints the components is not a clean break.

### 4.2 Public docs and the visual fixture teach retired names

Exact current bytes still say:

- `DESIGN.md:1117-1122`: Slider recipes share `--slider-track-bg`;
- `MIGRATION.md:130-135`: consumers set `--progress-track` on Progress; and
- `tests-visual/on-glass-fg.spec.ts:239-244`: the synthetic track reads
  `var(--progress-track,var(--progress-track-on-glass))`.

The visual fixture will continue to paint the fallback and can remain green without ever proving
the new knob or the actual Progress component. It is therefore a stale, false-green oracle for the
clean break. Historical tranche prose may retain old names as archaeology; current public canon,
migration, actual component fixtures, and installed-package probes may not.

### 4.3 The artifact is still 7.0.0

The dry-run package contains the new render functions, partials, and CSS break as
`@mkbabb/glass-ui@7.0.0`. That is neither immutable 7.0.0 parity nor an honest 8.0 clean break. W4
cannot enter a candidate freeze until the release ledger names the selector/custom-property break,
the consumer migration is complete, the two CSS export paths are adjudicated, and one uniquely
identified installed artifact passes the actual receivers.

## 5. Why 32/32 does not prove pixels

The new fold test proves only that Slider and Progress render the new classes. The Slider suite
proves sorted percentages, keyboard events, and forwarding of axis attributes. The Progress suite
proves percentages, ARIA, lifecycle state, one vertical root attribute, and node counts.

None of those suites:

- loads `dist/styles/index.css` or `dist/glass-ui.css`;
- obtains `getBoundingClientRect()` from a real layout engine;
- inspects `::before` computed style;
- compares direct-dot and pseudo-dot coordinates;
- detects the `/styles.css` missing-register defect;
- varies DPR, fractional rail width, or fractional mark position;
- measures LTR/RTL/inverted/vertical pixels;
- validates near-edge clipping and fill-over-mark stacking;
- reads custom-property inheritance or the gradient/color type split;
- activates PRM or forced colors; or
- runs Safari.

The test comment says paint parity is proven by the component suites plus a “live-π before/after.”
No candidate-bound live-π artifact was produced or referenced by the commit. Renaming
`.slider-mark` to `.value-mark` in a selector-based test is not visual parity; it is only keeping the
test attached to the new DOM.

## 6. Required bounded Luna x-high redress

The structural fold should be repaired, not discarded. The smallest convergent redress is:

1. **Namespace the shared selectors.** Keep `.glass-track-well`; rename the generic mark family to
   a Glass-owned prefix. Add a sentinel collision test proving unrelated `.value-mark` /
   `.value-marks` nodes retain normal flow and no generated dot.
2. **Reject the one generic custom property.** Preserve component-specific typed inputs or mint
   explicitly versioned, collision-resistant typed names. A spectrum background image and an
   indeterminate Progress color must not pretend to be one value grammar.
3. **Repair override precedence.** Prove direct and inherited consumer customization intentionally.
   Do not assign the public override property on Progress in a way that masks ancestor use. If the
   shared register needs a default seam, make it a separate prefixed internal/default property.
4. **Adjudicate the CSS exports.** Either make both public style exports complete for the compiled
   class contract or remove/narrow `/styles.css` in the 8.0 migration. Add an installed-package
   fixture for every retained export path.
5. **Truth up public docs and harnesses.** Update DESIGN, MIGRATION, current canon, actual demos, and
   `on-glass-fg.spec.ts`; historical tranche records remain historical. No mutable `7.0.0` credit.
6. **Add a real geometry fixture.** Mount production Slider and Progress with actual shipped CSS,
   not synthetic divs. Keep source/unit tests for structure, but do not label them paint parity.
7. **Run the live matrix in §7.** Retain exact source, packed/installed artifact, route, browser,
   OS, DPR, viewport, theme, media modes, and before/mid/settle captures.
8. **Fresh independent close.** After the bounded Luna cut, obtain two fresh Sol x-high critics: one
   for public/cross-package contract and one for geometry/material/cascade, then a third-pass
   adjudication against those exact bytes.

No component-local private selector, application shim, compatibility alias hidden under 7.0.0, or
parallel track primitive is warranted.

## 7. Terminal live-paint matrix and born-RED mutations

### 7.1 Actual receivers and states

Use production `<Slider>` and `<Progress>`, installed from the one candidate artifact, on a
structured warm-cream/glass substrate. At minimum:

| Receiver | Required postures |
| --- | --- |
| Slider standard | LTR, RTL, inverted, RTL+inverted; sm/md/lg; single/range; rest, hover, focus-visible, drag onset, mid-drag, release settle, invalid, disabled |
| Slider vertical | normal/inverted; LTR/RTL containers; rest, focus, drag, settle |
| Slider spectrum | four real gradient/custom-background consumers; horizontal/vertical; hover, focus, drag; transparent range; checker/alpha and high-chroma ramps |
| Progress determinate | default/gradient/liquid; 0/25/33.3/50/75/100%; LTR/RTL; error; loading/progressing/complete |
| Progress vertical | default/gradient/liquid; 25/33.3/50/75%; LTR/RTL containers; fill and marks |
| Progress indeterminate | horizontal/vertical; default/gradient/liquid where supported; custom track color; PRM static frame |
| Cascade sentinels | unrelated `.value-mark`/`.value-marks`; unrelated ancestor `--track-bg`; direct and inherited approved knob overrides; nested track well |
| Public export fixtures | installed package with `/styles`; installed package with every retained alternate CSS export |

Run at 390×844 and 1440×900, light and dark, DPR 1 and 2, current Chromium and Safari/WebKit,
normal motion and PRM. Add forced-colors where supported; if Safari cannot emulate it, retain a
Windows/Chromium forced-colors arm and source-canon the engine limitation.

### 7.2 Geometry and image predicates

- For marks at 25%, 33.3%, 50%, and 75%, record rail and painted-dot rectangles. Center error from
  the expected equation must be within the predeclared subpixel tolerance and old/new pixel diffs
  must stay within the approved antialias budget.
- In RTL/inverted/vertical cases, the mark and fill must share the same value origin; no mirrored
  mark over an unmirrored fill.
- Near-edge interior marks must clip identically at the pill boundary; no square leakage or vanished
  dot caused by the zero-line.
- Fill-over-mark stacking, invalid/focus ring stacking, and spectrum thumb/range stacking must match
  the approved reference at rest and interaction.
- PRM must preserve one informative static state without sweep/smear; forced colors must preserve
  value/focus structure. Decorative marks may disappear only by explicit owner ruling.
- A custom spectrum gradient must survive. A custom indeterminate Progress color must resolve in
  every stop. Approved ancestor/direct override behavior must be identical to the documented
  contract.
- The unrelated sentinel classes and generic ancestor property must remain unchanged by Glass.

### 7.3 Mutations that must turn the detector RED

1. Change pseudo `translate(-50%, -50%)` to `translate(50%, -50%)` — horizontal center shifts by one
   dot diameter.
2. Change vertical `inset-block-end` to `inset-block-start` — vertical values mirror.
3. Drop the `data-inverted` selector or forwarding — inverted Slider marks diverge from the fill.
4. Replace logical inline placement with physical `left` — RTL diverges.
5. Remove well `overflow:hidden` or pill radius — near-edge marks/fill leak.
6. Move marks above Progress `z-index:1` fill or below an unintended stacking context — fill/mark
   visibility changes.
7. Restore generic `.value-mark*` names — the unrelated sentinel is damaged.
8. Restore generic `--track-bg` — the unrelated ancestor or nested well is retinted.
9. Restore Progress's local public-knob assignment — inherited approved retint stops working.
10. Feed a gradient into the indeterminate color arm — the computed background must not silently
    become invalid.
11. Remove either W4 partial from a retained public CSS export — installed Slider/Progress geometry
    and marks disappear.
12. Restore the old custom-property name in one current public doc, demo, actual fixture, or live
    consumer — migration/census gate turns RED.
13. Shift a mark by 1px at DPR 1 or 2 — Chromium and Safari image/geometry probes turn RED.
14. Remove the PRM or forced-colors static/structural result — accessibility matrix turns RED.

## 8. Binding disposition

**Bank:** the existence of one shared well mechanic, one shared mark mechanic, the two-component
composition, the import closure on the canonical `/styles` path, and the ordinary-writing-mode
center equations.

**Reject as acceptance:** “pixel-identical,” the 32/32 unit close, the one generic class family, the
one generic custom property, the claim that Progress vertical is tested, the current public
clean-break posture, either public CSS export being presumed complete, and any release/freeze credit
for mutable 7.0.0.

**Route:** one bounded Luna x-high redress implementing the namespacing, typed override contract,
export closure, migration truth-up, and live fixture; then two fresh Sol x-high adversarial critics
and a third-pass adjudication against the uniquely identified installed artifact.

Until that lands, **MATERIAL W4 is a bankable structural source candidate and a failed terminal
contract. Do not report TRACK-DRY closed, do not freeze candidate 2 from `f9b9d16e`, and do not use
renamed DOM-selector units as Breath-of-Life, Goal-of-Glass, or pixel-parity evidence.**
