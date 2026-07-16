# BI.W-P127 — Dependency, peer, generator, and lockfile singularity

**Status:** IN PROGRESS — package hygiene and the Value 4 source cut are implemented; immutable producer bytes and the resulting lock remain open
**Topological stratum:** BI.S25
**Formation family:** package-contract
**Core centers:** C10_CONSTELLATION_ASSAY, C3_MOTION, C6_COMPONENT_APOTHEOSIS, C7_KEYFRAMES_INTEGRATION, C9_PRUNE
**Terminal owner:** glass-ui orchestrator
**Evidence root:** `docs/tranches/BI/evidence/BI.W-P127`

## Intent

Make package metadata follow the post-apotheosis import graph, remove the shadcn generator contract, and reconcile the value/keyframes/pencil-boil peer line without duplicate engines.

Glass source, types, build externalization, bundle profiling, and the Value peer
manifest now consume the clean Value 4 contract through exactly `/color`, `/css`, and
`/easing`. That implementation was checked against the Value V.W17 rehearsal tarball;
the rehearsal is not a published producer boundary and is not written into the lock.
The registry artifact, final Keyframes range, regenerated lock, and Glass 7 release
bytes remain open until their immutable inputs exist and are tested together.

## Authoritative Value 4 consumer contract

Glass accepts only
`@mkbabb/value.js/color`, `@mkbabb/value.js/css`, and
`@mkbabb/value.js/easing`; root, package-prefix, `/units`, `/parsing`, private-dist,
alias, shim, and forwarding forms remain rejected.

- `/color` exposes the 17 final-object factories (`rgb`, `hsl`, `hsv`, `hwb`, `lab`,
  `lch`, `oklab`, `oklch`, `xyz`, `kelvin`, `linearSrgb`, `displayP3`, `a98Rgb`,
  `prophotoRgb`, `rec2020`, `ictcp`, and `jzazbz`) as
  `Result<Color<S>, ColorIssue>`. Glass also consumes the failure-explicit
  `convertColor`, `mixColors`, `mapColorToGamut`, `safeAccentColor`,
  `interpolateHue`, and `toRgba8` operations. `Result` failure uses `error`, and
  public hue interpolation is degree-in/degree-out.
- `/css` defines `CssColor` as exactly the CSS-spellable `rgb`, `hsl`, `hwb`, `lab`,
  `lch`, `oklab`, `oklch`, `xyz`, `srgb-linear`, `display-p3`, `a98-rgb`,
  `prophoto-rgb`, and `rec2020` spaces. Consequently
  `parseCssColor(source): ParseResult<CssColor>` and
  `serializeCssColor(color: CssColor): Result<string, ColorIssue>` do not accept
  arbitrary `AnyColor`. The `/color`-only `hsv`, `kelvin`, `ictcp`, and `jzazbz`
  spaces must pass through an explicit `convertColor` to a chosen CSS-native space.
  `parseTimingFunction` also belongs only to `/css`.
- `/easing` keeps CSS parsing out and exposes `linear` plus failure-explicit
  `CubicBezier`, `steppedEase`, `linearEasing`, and `easing` operations. Their
  invalid domains are represented by the closed `EasingIssue` result contract,
  never an identity/default fallback.

The exact failure-explicit operations consumed by Glass are:

```ts
convertColor<S extends SpaceId>(color: AnyColor, space: S): Result<Color<S>, ColorIssue>
mixColors<S extends SpaceId>(
  from: AnyColor,
  to: AnyColor,
  progress: number,
  options: { readonly space: S; readonly hue?: HueInterpolationMethod },
): Result<Color<S>, ColorIssue>
mapColorToGamut<S extends SpaceId>(
  color: Color<S>,
  target: RgbGamut,
): Result<Color<S>, ColorIssue>
safeAccentColor(
  accent: AnyColor,
  surface: AnyColor,
  options: { readonly minimumRatio: number; readonly gamut: RgbGamut },
): Result<Color<"oklch">, ColorIssue>
interpolateHue(
  fromDegrees: number,
  toDegrees: number,
  progress: number,
  method?: HueInterpolationMethod,
): Result<number, ColorIssue>
toRgba8(
  color: AnyColor,
  options: { readonly gamut: "clip" },
): Result<RGBA8, ColorIssue>

linear(progress: number): number
CubicBezier(x1: number, y1: number, x2: number, y2: number): Result<EasingFunction, EasingIssue>
steppedEase(count: number, position?: JumpPosition): Result<EasingFunction, EasingIssue>
linearEasing(stops: readonly LinearEasingStop[]): Result<EasingFunction, EasingIssue>
easing(name: string): Result<EasingFunction, EasingIssue>
```

`ColorIssue.code` is closed to `color_invalid_input`, `color_non_finite`,
`color_out_of_range`, `color_missing_channel`, `color_missing_alpha`,
`color_progress_out_of_range`, and `contrast_unreachable`. `EasingIssue.code` is
closed to `easing_non_finite`, `bezier_x_out_of_range`, `step_count_invalid`,
`jump_position_invalid`, `linear_stop_invalid`, and `easing_name_unknown`.

## Current execution truth

- `components.json` and the generator-only package surface are deleted; no generator
  alias or hidden `src/utils` target remains.
- Glass source imports, Vite externalization, and `profile:bundle` recognize exactly
  `@mkbabb/value.js/color`, `@mkbabb/value.js/css`, and
  `@mkbabb/value.js/easing`. The package root, old subpaths, prefixes, lookalikes,
  and private distribution paths are rejected.
- Color parsing is full-consuming and failure-explicit. Non-opaque CSS colors are
  rejected at the named Glass boundary. Color conversion, gamut mapping, painted-band
  contrast, RGBA projection, and degree-domain hue interpolation use Value's public
  final-object operations without catch-to-default behavior.
- Easing constructors are failure-explicit; both bezier and stepped readouts are
  reparsed through `/css`, and the former identity fallback is absent.
- The manifest declares Value `^4.0.0`. The lock still records the last published
  producer graph and must not be represented as the final Glass graph.
- Immutable pencil-boil `0.9.2` is already the optional peer boundary. The clean
  export cut is a justified Glass 7 major: the packed map moves from 82 to 73 keys,
  removes 11 subpaths (`./color-swatch`, `./controls`, `./focus-scope`, `./icon-chip`,
  `./icon-tooltip`, `./metric-badge`, `./metric-cell`, `./metric-stack`,
  `./motion-curves`, `./notification`, and `./spa-view`), and adds
  `./dark-mode-toggle` plus `./metric`, without aliases or shims. The compatible
  Keyframes range remains evidence-derived.

## Remaining closure

1. Consume the published Value 4 artifact and verify its bytes and declarations match
   the rehearsal contract used for the source cut.
2. Establish the compatible immutable Keyframes boundary without a nested older Glass
   core or forced npm resolution.
3. Regenerate one lock from those registry artifacts and reject `file:` links,
   duplicate semantic engines, unused peers, and peer/dev range disagreement.
4. Build, pack, and install the resulting Glass artifact in an isolated consumer before
   assigning release coordinates.

## Ordinary acceptance

- `src/**` contains none of the removed Value root, `/parsing`, `/units`, or private
  imports.
- Type checking, focused color/easing tests, the library build, and the demo production
  build pass against the rehearsal declarations.
- Built JavaScript retains only the three exact external Value entries.
- The README-wired `profile:bundle` command reports those entries and rejects root,
  old, prefix, and lookalike forms.
- A final lock, pack, and isolated install remain required after immutable producer
  publication; no receipt runner, mutation farm, cursor, or attestation script is a
  substitute for those checks.

The source-base package retained shadcn generation metadata, styling scaffolds, and a
pencil-boil `^0.4.1` peer. Those are historical context only; the current package graph
must be judged from its imports and packed bytes.
