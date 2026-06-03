# AS — W0b path forward (the second deep audit + visual evidence + style audit)

Synthesizes three parallel workflows run this round (development only, no
implementation): the 6-lens deep audit (`W0b-L1/L3/L4`), the visual-evidence
protocol (`visual/W-*` — the booked paired-π protocol, now executed), and the
self style audit (`docs/audits/runs/2026-06-03-glass-ui-self/`). The headline:
the AS W3/W4/W5 cut is largely correct and the rounded-corner chronic is CLOSED,
but the adversarial audit found **two release-blocking gate-RED regressions** (one
from the parallel cohort session, one a P9 gap) plus four medium/low defects — all
fold into an **AS.W2b** gate-fix wave that must precede any 3.2.0 tag. Implementation
is deferred; this is the tranche record.

## The headline answer — rounded corners are CLOSED

The visual comparison (`visual/W-cmp-configurator.md`) confirms, from live captures
+ the shipped artefact: the demo configurator renders rounded outer corners + clean
straight inner dividers (the container clip owns rounding; no per-section radius
deforming the hairline); P9's `dist/styles/components.css` emits
`.rounded-panel{border-radius:var(--radius-panel)}` (+ the component vocabulary)
with NO preflight leak; the AN.W2 probe is inverted (a bare consumer with no
`@source` glob now paints `rounded-panel`). The chronic is closed at the library
AND for consumers. Aurora/blob is mathematically correct (`W-cmp-aurora-blob.md`:
6/6 OKLab equivalence, `deriveAurora` correctly booked-not-shipped, the watercolor
medium renders).

## Gate-RED — the two release blockers (AS.W2b, must precede 3.2.0)

AS.W2's own newly-unified `local == ci == release` gate matrix is RED at HEAD —
the structural gate fleet catches two real regressions:

- **R1 — `@mkbabb/value.js` is not externalized (the cohort's inv-K-2 packaging bug).**
  `6d3e151` rewired `aurora/composables/color.ts` onto value.js's color core and
  promoted value.js to a peerDependency, but never added it to `vite.library.ts`
  `libraryExternal` (`:121` lists `@mkbabb/keyframes.js` only). Confirmed: `aurora.js`
  inlines the whole 78 KB value.js (`grep oklab dist/aurora.js` = 19 hits), gzip
  16564→47636 (**+187.6%**), failing `profile:budget` (a ci+release gate). This
  INVERTS inv-K-2's own dedup intent — every aurora consumer now ships a duplicate
  value.js. **Fix: add `@mkbabb/value.js` to `libraryExternal` (mirror keyframes.js).
  Do NOT rebase the baseline.** value.js exposes only `"."` — confirm the color core
  resolves through the bare specifier, or the cohort adds a `/color` subpath.
- **R2 — the `inv-K-4` / contract-v2 conflict (a sibling-session committed invariant).**
  `6d3e151` re-added the `development` export condition (68 keys) to glass-ui's own
  `package.json` — the exact key contract-v2 abrogates (`docs/precepts/cross-repo-dev-resolution.md`,
  CLAUDE.md). AS.W2's hardened `proof:resolution` fails closed on the self repo
  (verified live: 2 publisher violations — glass-ui + value.js). The two committed
  states are mutually contradictory: AS.W2 hardened the enforcement; the cohort
  committed the violation. **This is a precept decision, not a code patch** — see
  §Contract decision below.

## AS.W2b — the medium/low defects (fold; implementation deferred)

- **R3 — P9 ships `var(--spacing)` against an undefined token.** `components.css`
  carries 140 `var(--spacing)` declarations (`p-*`, `gap-*`, `inset-*`) but
  `--spacing` is defined NOWHERE in `dist/styles` (the preflight-strip dropped the
  `:root` `@theme` block where Tailwind emits `--spacing: 0.25rem`). So spacing
  utilities silently no-op in a bare consumer — P9's "bare consumer paints" is
  PARTIAL (rounding/color/sizing resolve; spacing does not). **Fix: keep glass-ui's
  own `--spacing` base in the emitted cascade (consistent with shipping its own
  radius/color bases), and add a `proof:components-css` gate** asserting
  `components.css` is present, carries the `rounded-panel` rule, defines every
  custom prop it references (`--spacing`, `--radius-*`), and has zero `@layer base`.
  Also: `dist/styles/index.css` is at **98% of the P9-rebased ceiling** — one CSS
  edit from RED; budget headroom is not "modest", revisit the ceiling or trim.
- **R4 — P4 `useTextHighlight` multi-instance collision.** FuzzySearch hardcodes the
  registry name `"glass-search-mark"`; two FuzzySearch instances collide on the
  process-global `CSS.highlights` registry (the second `set()` overwrites the first;
  either `dispose()` deletes the shared entry, killing the other's paint). A
  multi-instance regression vs the per-component `<mark>` splitter it replaced.
  **Fix: per-instance `useId()`-suffixed name + a multi-instance test.**
- **R5 — `proof:vt-names` has no committed fixture test.** The hardened gate (the 4
  new mint-form detectors + the dataflow tracer) was proven on six throwaway
  fixtures that were deleted — the gate that makes inv-η structural is itself
  unguarded. **Fix: commit the 6 fixtures as a vitest spec (known-bad + known-good).**
  Chronic meta-teeth class across the proof fleet.
- **R6 — two correctness nits.** G1's `@supports (container-type: inline-size)` probes
  SIZE-query support, not STYLE-query support (the attribute fallback preserves paint,
  but the probe is wrong — G2's negative-probe idiom is the correct counterexample);
  `usePrioritizedTask`'s `signal: options.signal ?? controller.signal` drops the
  controller signal when an explicit signal is passed, contradicting the "abort()
  cancels every task" docstring (fix: `AbortSignal.any([controller.signal, options.signal])`).

## The contract decision (R2) — needs your call, re-framed

You answered "strip for publish (contract-v2)" when I described the `development`
keys as an uncommitted revertible edit. The reality: they are a **sibling session's
committed invariant `inv-K-4`** ("dev source-resolution" — so value.js's demo +
glass-ui's own dev resolve glass-ui from source), landed in `6d3e151` + `571f25f`
on top of the AS commits. Stripping reverts that session's committed work (which it
may re-add). The two coherent resolutions:

- **Reconcile (recommended):** treat `inv-K-4` as the intended contract evolution —
  amend contract-v2 to re-allow `development` in lockstep across the gate
  (`proof:resolution`), CLAUDE.md, and the precept doc; 3.2.0 ships with
  dev-source-resolution. Honors both sessions; the `development` condition is
  publish-safe (npm consumers ignore unknown conditions). Requires the value.js-K
  cohort's agreement (they own half).
- **Strip:** revert only the 68 `development` keys from glass-ui's `package.json`
  (preserve inv-K-2's color-core work), publish contract-v2-clean, and flag the
  cohort that inv-K-4 was rolled back in glass-ui — risking a tug-of-war if they are
  live.

Either way, **R1 + R3 must land first** (the gate is RED on more than the contract).

## Deferred + chronic ledger (folded per the explicit ask — see W0b-L4)

Carried/ruled this round: P2 `deriveAurora` BOOKED (no live ≥2; correctly not
half-shipped — confirmed); P5 Fraunces BOOKED (woff2 asset-gated); P3
Metaballs+BlobDot post-v1.0.0 (the watercolor medium is the live blob surface; the
net-new primitive stays named-forward); P7 KILLED (DEC-3); G3 cross-doc-VT
demo-or-named-forward; G5/G6/G8 + the demo-gated pilots + the watched conditions
(inline-edit, dock panel-host, shadcn-parity) WATCHED; the bbnf-lang dist-alias
fossil name-forward (inv-16); the precepts re-sync (still stale vs canonical) +
M-CI/M-DEPLOY/M-MEASURE + value.js-J/fourier-J cohort execution + WAVE-C application
name-forward to the owning arms. NEW chronic: R5 (untested gates) + R3 (no
components.css gate) — the gate-fleet meta-teeth class.

## Visual-evidence protocol — executed

The booked paired-π protocol (`constellation-adoption-2026-06-02.md §c`) is now run:
the 102 loose root scratch PNGs (gitignored, 42 MB) are archived + categorized into
`docs/tranches/AS/audit/visual/archive/2026-06-03/<surface>/` (13 surface dirs; root
back to 0); the demo app was captured (the AS-affected route set, light+dark, in
`as-verify/`); the before/after comparison ran (configurator/rounded-corners ✓,
aurora/blob ✓, dock/tokens). Named-forward: a per-tranche capture convention in the
precepts so root scratch stops re-accumulating; the 2 sha1-confirmed exact dups +
the 35 superseded iteration-rungs are archived (not deleted) for a manual prune.

## Path forward

AS does NOT close clean yet. **AS.W2b** (gate-RED fix wave): R1 (externalize
value.js) + R3 (P9 `--spacing` + the `proof:components-css` gate) — glass-ui-owned,
land first; R2 (the contract decision) — cross-repo, your call. Then **AS follow-up**:
R4 (P4 collision) + R5 (vt-names fixtures) + R6 (G1 probe + G4 signal). Then W6
close + the 3.2.0 publish (provenance + the repaired CI) once the gate matrix is
green. Implementation awaits your authorization (this round is tranche-dev only).
