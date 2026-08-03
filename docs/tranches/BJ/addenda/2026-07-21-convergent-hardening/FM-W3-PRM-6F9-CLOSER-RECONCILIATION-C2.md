# FM W3 `6f9acf1f` PRM closer reconciliation C2

Date: 2026-07-22  
Existing owner: FEEDBACK/MOTION W3, global reduced-motion no-resurrection policy  
Disposition: **bank layer correction and zero-duration direction; product/gate/model/package/browser/acceptance remain RED**

## Exact landed inputs

Product commit:

- commit: `6f9acf1f23b34012982b47a89c4c32a124a68916`
- parent: `010bd33b45cd67d9b896394fda035ea166766413`
- tree: `53474a3dbed2b76c458e89986ca3afa11cd8e8ed`
- stable patch-id: `8127fa2cd90a860f59250f0c0e52b1548ebca694`
- build seat: `claude-opus-4-8`; this is not a Luna x-high implementation seat

Receipt-only follow-up:

- commit: `afdf9f77097fbfa69d881c09669b375e27b470ae`
- path: `docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md` only
- commit body: absent

Exact inspected landed identities:

| path | SHA-256 |
| --- | --- |
| `src/styles/utilities/a11y-overrides.css` | `50897fb7c5b57938f50f9b12c39416c1377886a9a03ad41e3d62f8ab80671205` |
| `tests/bj/prm-no-resurrection.test.ts` | `e65d17bc32de1e17b9630c26c5ba4c9c843de004ec2e72d19ed38dc05e2f5098` |
| retained proof JSON | `d8cf7b76f7f621c3fa313a828b675ec4acdb21d3c649391c236da63451da9e15` |
| `docs/tranches/BJ/waves/BAND-FEEDBACK.md` | `6c260eab…` |
| `docs/tranches/BJ/waves/BAND-A11Y.md` | `77e3de85…` |

The independent exact-byte Sol x-high closer challenged source semantics, mutations, package identity,
browser provenance, model law and commit discipline. It made no repository edit.

## Banked result

The cut removes the old global `0.1s` transition resurrection and its forced property allowlist. The
fallback now drives transition duration to zero and animation duration to an effectively instant value.
It also corrects the cascade explanation: for important declarations, an earlier named layer outranks an
unlayered important declaration; the relevant mechanism is layer order, not selector specificity. The
stale BAND-A11Y fence is superseded. These are useful producer-side corrections.

The `6f9acf1f` commit subject and body otherwise satisfy the repository's body-bearing Conventional Commit
shape. That formal process credit does not validate its evidence claims.

## Why the row remains RED

### 1. Delays still resurrect motion

The global rule changes durations but does not reset `transition-delay` or `animation-delay`. Genuine
Chromium reduced-motion probes falsify the claimed **INSTANT** contract:

- `transition-duration: 0s` with `transition-delay: 9s` retains the old visual state after 100 ms;
- `animation-duration: .01ms` with `animation-delay: 9s` remains at the animation's from-state.

The producer policy must also set `transition-delay: 0s !important` and
`animation-delay: 0s !important`, unless a future non-zero delay has an exact hashed, named authorization.
Reduced motion cannot mean “eventually, after a long invisible clock.”

### 2. The committed 7/7 gate has four exact false greens

All of these mutations leave the standing test GREEN when they must turn it RED:

| mutation | retained mutation SHA-256 | missed mechanism |
| --- | --- | --- |
| append a second PRM block with `:where(*) { transition-duration: 9s !important; transition-property: all !important; }` | `60c7f36e…` | scanner examines the first matching block only |
| append a universal `transition-delay: 9s !important` | `3404730f…` | delay is outside the policy model |
| change the authorized `0.1s` exception to `9s` | `e247587b…` | authorization hashing proves prose identity, not bounded declared values |
| append `transition: all 9s linear 9s !important` | `30f3a31e…` | shorthand and later-rule override are unmodelled |

The selector recognition is also loose enough to confuse approximate wildcard shapes, and the gate scans
only two source files. It does not prove the full built CSS graph, later cascade winners, shorthand
expansion, delay bounds, or source-to-package parity. A truthful gate must parse every effective PRM rule
from the generated public CSS closure, normalize longhands and shorthands, reject unauthorized clocks,
bound every authorization's values, and include later-cascade mutation arms.

### 3. The proof is not the shipped package

The repository still identifies the package as mutable `7.0.0` and publishes `dist` only. The packed
artifact inspected by the closer is not byte-identical to current source:

| surface | source SHA-256 | packed SHA-256 |
| --- | --- | --- |
| `a11y-overrides.css` | `50897fb7…` | `5b5158ed…` |
| transition policy companion | `076df346…` | `c1919926…` |

Therefore the committed claim that the proof covers the literal shipped `src` bytes is false. A scratch
7.0 tarball can demonstrate a local build shape but is neither the unique immutable 8.0 artifact nor the
exact source→pack→install→served package required for release or downstream credit.

### 4. Browser and receiver evidence is synthetic

The retained Chromium check is a useful mechanism falsifier, but the committed proof is a synthetic,
assertion-oriented fixture. It does not retain an executable browser harness, browser version, raw event
and computed-style log, immutable installed artifact identity, or any natural SCI/Atlas receiver. It also
contains no current Safari/VoiceOver proof. Bundled or emulated WebKit is not Safari.

Close still requires natural SCI focal-chip/plate-rim and VFT/USF focus/legend receivers, including a
receiver that authored `transition: none`, an element with no authored transition, authorized exceptions,
keyboard/AT state, and PRM normal↔reduce parity against the exact installed package.

### 5. Model and receipt discipline remain RED

The product cut was authored by Opus even though bounded implementation mechanics were routed to Luna
x-high. Historical attribution remains Opus; no prose may convert that seat into Luna credit.

Commit `afdf9f77` is an 18-line status/receipt-only change with no commit body. Its file content may retain
useful hashes, but the commit does not meet the repository rule for body-bearing status/gate changes that
explain why, evidence, and routed remainder.

## Born-RED continuation matrix

| mutation / arm | required result |
| --- | --- |
| add transition or animation delay to any wildcard policy | policy gate RED; computed PRM delay remains zero |
| add a later PRM wildcard block | generated-cascade gate evaluates the later winner and REDs |
| restore a transition shorthand with duration/delay | normalized shorthand arm RED |
| raise an authorized duration or delay beyond its declared bound | authorization/value gate RED |
| attach motion to an element whose receiver authored none | natural receiver clock detector RED |
| defeat a receiver-authored `transition: none` | natural receiver parity arm RED |
| omit a CSS leaf or pack stale CSS | source→build→pack→install→served identity gate RED |
| substitute a source fixture for installed package bytes | package-consumer arm RED |
| prove only Chromium or bundled WebKit | Safari/VoiceOver arm remains RED |

## Binding continuation

Preserve `6f9acf1f` as source-direction progress and preserve its actual Opus attribution. The next bounded
product/test redress is Luna x-high: zero both delay families, replace regex/count assertions with a
generated-public-CSS effective-policy gate, bind bounded value authorizations, and add every mutation above.
Then build, pack, install and serve one unique 8.0 artifact with exact byte identity; run the natural
SCI/Atlas receivers in Chromium and actual Safari/VoiceOver; and submit two fresh Sol x-high critics over
the unchanged candidate.

No SCI/Atlas selector override, local `!important`, consumer delay shim, source-only repin, mutable-7.0
credit, Opus-as-Luna label, bundled-WebKit-as-Safari claim, or terminal row close follows.
