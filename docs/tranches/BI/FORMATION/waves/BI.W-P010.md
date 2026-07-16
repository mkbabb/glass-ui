# BI.W-P010 — Semantic public entries

**Status:** DONE — `bb5c1e5c`

The package exposes semantic entries rather than a source-subpath mirror. Build and
declaration generation share the retained entry map.

## Glass 7 Value capability boundary

The shipped semantic-entry rule remains unchanged. Glass source and build
externalization now consume exactly `@mkbabb/value.js/color`,
`@mkbabb/value.js/css`, and `@mkbabb/value.js/easing`, checked against Value V.W17's
rehearsal tarball. The package root, prefix matchers, legacy/private entries, aliases,
and forwarding paths are not part of that projection.

- `/color` owns the 17 failure-explicit color factories and the `Result`-returning
  `convertColor`, `mixColors`, `mapColorToGamut`, `safeAccentColor`,
  `interpolateHue`, and `toRgba8` operations.
- `/css` owns `parseCssColor`, `serializeCssColor`, and `parseTimingFunction`.
  Its `CssColor` union is limited to the 13 CSS-spellable spaces: `rgb`, `hsl`,
  `hwb`, `lab`, `lch`, `oklab`, `oklch`, `xyz`, `srgb-linear`, `display-p3`,
  `a98-rgb`, `prophoto-rgb`, and `rec2020`. The `/color`-only `hsv`, `kelvin`,
  `ictcp`, and `jzazbz` values require an explicit `convertColor` to one of those
  CSS spaces before serialization.
- `/easing` owns failure-explicit `CubicBezier`, `steppedEase`, `linearEasing`, and
  `easing`; CSS timing text remains solely in `/css`.

The rehearsal proves source and declaration compatibility, not an immutable dependency
boundary. P127 keeps the registry lock and release coordinates open until the published
producer bytes are installed and verified; this wave predicts none of them.
