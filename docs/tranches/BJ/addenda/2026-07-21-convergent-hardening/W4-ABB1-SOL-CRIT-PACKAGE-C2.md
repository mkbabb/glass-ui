# W4 `abb1eba2` Sol package / integration critic C2

Date: 2026-07-22  
Existing owner: MATERIAL W4 `BJ.W-TRACK-DRY` / 8.0 package transaction  
Disposition: **package, browser and consumer acceptance RED**

## Clean build and dry-pack result

An isolated archive of exact commit `abb1eba22cf9429c8c5ccf3a8b13fe032ca4404b` completed the one-shot
`npm run build`. A subsequent `npm pack --dry-run --json --ignore-scripts` reported:

| field | value |
| --- | --- |
| package id | `@mkbabb/glass-ui@7.0.0` |
| tarball name | `mkbabb-glass-ui-7.0.0.tgz` |
| shasum | `22aa42c131ee579876a8104dd73e770429df8e13` |
| integrity | `sha512-MKXNoeU2YVZTX9Ns604VdYC1AAHQw+rXw0miK3taAl3ZZtdsIdsqY5W5XeVLpqV3tsxk6aa5RXc7FvUYAJ7zAw==` |
| entries | 889 |
| packed `dist/component-styles.css` | present, 336 bytes |

This proves that the one-shot generator can place the intended files in a local dry pack. It does not
prove the immutable 8.0 package transaction.

## No unique 8.0 identity exists

The breaking DOM/property/export ledger is documented as 8.0 while the package remains `7.0.0`.
There is no unique `8.0.0-w4.<commit>` tarball, fresh registry/install fixture, exact lock/integrity update,
or source→pack→install→served byte equality. A local dry pack with the extant 7.0 identity cannot be
distinguished from the already consumed 7.0 package and may not authorize a downstream repin.

The release arm must create one immutable candidate, install it without workspace substitution, and prove
that package root, `./styles`, `./styles.css`, Slider and Progress all resolve from those exact bytes.

## Public subpath parity is unproved

The candidate asserts that canonical `./styles` is complete and `./styles.css` gains the shared W4
registers. No package test imports both subpaths from a fresh installation and proves:

- each required selector exists exactly once in the effective graph;
- both typed properties reach their production reader;
- the component-only entry does not pull the full token/theme graph;
- the canonical entry does not double-apply the W4 partials;
- omission, reorder, duplication and stale-output mutations each turn RED.

The isolated `build:watch` and `iter-build` failures additionally prove that a locally correct one-shot dry
pack is not sufficient package integrity.

## Downstream transaction is entirely outstanding

The adjudicated consumers remain exact and unchanged:

- Glass internal writers;
- four value.js Slider writers;
- keyframes PlaybackRibbon plus its missing declared Glass dependency;
- SCI `filter-fy-slider`, `filter-pop-slider`, `filter-enroll-slider`, `filter-cost-slider` and
  `filter-peradm-slider`;
- Atlas `dim-dial-slider` / `PercentileRangeSlider`.

There is no live SCI/Atlas Progress receiver and no consumer private track override. That narrows the
receiver matrix; it does not waive it. Neither consumer repository has an authorized immutable 8.0 lock,
and their installed 7.0 bytes are non-probative for the new DOM and CSS together.

## Visual evidence is synthetic and incomplete

The cut changes source tests and one synthetic foreground visual. It does not retain the required
production Slider/Progress matrix:

- standard and spectrum Slider, determinate and every indeterminate Progress variant;
- horizontal/vertical, RTL, Slider inversion, fractional rail dimensions and DPR 1/2;
- mark clipping, fill/mark ordering, inherited overrides and invalid Progress gradient rejection;
- both public CSS entries;
- normal/PRM/forced-colors;
- Chromium and actual Safari, with VoiceOver where interaction/state is claimed;
- the six no-override Q/Atlas Slider families after exact repin.

DOM class presence and source regexes cannot establish paint equivalence, reach or accessibility.

## Mutation receipt is invalid

The workflow closer's mutation sequence used path restoration with `git checkout` inside the active
candidate and reported a cumulative 2→3→4→8→9 failure progression. That is neither isolated mutation
testing nor a recoverable proof record: restoration erased candidate edits before reapplication, and later
failure counts included prior mutations. The final claim that five mutations each bit their owning gate is
not supported by clean one-mutation-at-a-time candidates.

The independent false-green probes in the sibling contract critic are controlling. Future mutation proof
uses isolated disposable archives, hashes every pre/post candidate, and records one mutation per run.

## Model and process boundary

The product cut was authored by an Opus workflow after implementation mechanics had been routed to Luna
x-high. Its commit body calls itself `MODEL-AGNOSTIC`; the workflow's structured close also represented the
commits as authored by the user. Neither statement changes provenance. The source earns zero Luna/model-law
credit.

Follow-up commit `57c982145153597bfb57efa20e9c615223689d6f` changes a coordination/status receipt with no
commit body, violating the body-bearing status-change rule. Later commit `0371836d…` truthfully records the
Opus halt; it does not retroactively cure the product seat, mutation record, package evidence or bodyless
receipt. Preserve history and correct forward.

## Release disposition

`abb1eba2` is a source-direction partial only. W4 stays model, detector, package, consumer, browser and
acceptance RED. Luna first supplies the bounded source/gate/build correction. Two fresh Sol x-high critics
then inspect unchanged bytes. Only after an immutable installed 8.0 candidate and the natural receiver
matrix may value.js, keyframes, Atlas or SCI repin.

No scratch 7.0 tarball, local `dist`, workspace link, source fixture, bundled WebKit, synthetic-only visual,
private selector or downstream shim earns credit.
