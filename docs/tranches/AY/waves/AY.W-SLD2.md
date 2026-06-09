# AY.W-SLD2 — Slider consumer-boundary gate clause (no removed-variant import)

State: OPEN · Repo: glass-ui · Band B (slider) · Depends-on: W-SLD1 (the
two-only design reconcile) lands the variant keyset this clause polices.

## Prior art (doc-currency — read before you touch anything)

The slider zoo → two-only collapse ALREADY SHIPPED in AX.W59 (commit
`a730782`). At HEAD there is exactly ONE component
(`src/components/ui/slider/Slider.vue`) with exactly TWO variants —
`standard` + `spectrum` (`src/components/ui/slider/index.ts:42-45`) — and the
cardinality + design contract are machine-locked by `proof:slider-two-only`
(`scripts/proof-slider-two-only.mjs`, CI-promoted at `.github/workflows/ci.yml:190-191`,
green at HEAD). This wave does NOT re-collapse anything. It closes the ONE
remaining hole in that gate: the gate is SOURCE-ONLY and never asserts the
consumer boundary. This is NOT greenfield slider work — it is the lock on the
"migrate ALL consumers" half that AX.W59 never machine-bound.

## Defect (verified)

`proof:slider-two-only` reads ONLY two source strings —
`src/components/ui/slider/index.ts` and `src/components/ui/slider/Slider.vue`
(`scripts/proof-slider-two-only.mjs:48-49`, resolved in `cliPaths()`). Its four
clauses (KEYSET / ORPHAN-SCAN / CYLINDER-CAP / SQUIRCLE-SPECTRUM) freeze the
LIBRARY cardinality + the AX.W59 design contract, but **no clause looks at a
single consumer call-site.**

Consequence: the "migrate ALL consumers" half of the slider consolidation has
NO machine lock. A consumer SFC can write `<Slider variant="rounded" />` (or any
`X ∉ {standard,spectrum}`) and:

- the gate stays GREEN (it never reads consumer source);
- at runtime the CVA resolves an unknown `variant` key to `undefined` → the
  variant class is silently dropped → the slider paints the `standard` default
  with NO error, NO warning, NO visual tell that the author's intent was lost.

This is the exact **silent-no-op binding class** flagged in MEMORY
`feedback_glass_ui_binding_verification` (stale reka/CVA prop bindings that
"silently no-op; vue-tsc + units miss them, only e2e catches"). The hardening
finding cites it directly:

> H-slider Finding 5: *"It does NOT assert no consumer imports a removed variant
> — the 'migrate ALL consumers' half of W-SLD2 has no machine lock. A consumer
> could pass `variant="rounded"` and the gate stays green (the prop would just be
> ignored at runtime — a silent no-op)."*

Concrete defect coordinates:
- `scripts/proof-slider-two-only.mjs:48-49` — `cliPaths()` resolves only the two
  library source files; there is no `CONSUMERS` import, no consumer walk.
- `scripts/proof-slider-two-only.mjs:73-197` — `run()` has four clauses
  (1 KEYSET, 2 ORPHAN-SCAN, 3 CYLINDER-CAP, 4 SQUIRCLE-SPECTRUM); none scan a
  consumer call-site.
- Live confirmation of the no-op: the consumer that matters, speedtest
  `DashboardMapControls.vue:65,135`, uses the default `standard` variant on the
  `@mkbabb/glass-ui/slider` subpath (`:172`) — it IS migrated — but nothing
  PREVENTS a future site from passing a removed variant and shipping green.

## Goal criterion

The slider variant axis is policed at BOTH boundaries: the library cardinality
(the four existing clauses) AND the consumer call-site. After this wave, any
`<Slider>` usage anywhere in the constellation that binds a `variant` outside
`{standard,spectrum}` — static (`variant="rounded"`) or bound
(`:variant="'rounded'"`) — RED-fails the gate before it can ship a silent
runtime no-op. The "migrate ALL consumers" half of the slider consolidation
gains the machine lock it has been missing since AX.W59.

## Objective

EXTEND `proof:slider-two-only` with a FIFTH clause — **CONSUMER-BOUNDARY** —
that scans every `@mkbabb/glass-ui`-consuming source tree for `<Slider>`
variant bindings and REDs on any literal variant value `∉ {standard,spectrum}`.

This is the ROOT fix, not a consumer-side band-aid: the gate already OWNS the
library cardinality, so it is the correct single home for the consumer boundary
too — one gate, both ends of the contract. It REUSES the shipped constellation
consumer-scan machinery (`scripts/constellation.mjs` `CONSUMERS` +
`resolveSibling` + `skipSibling`; the file-walk idiom in
`scripts/proof-phantom-classes.mjs:280-333`) — NO new scan harness, NO new
sibling list (the ≥2-consumer / no-parallel-substrate bar: the consumer walk
already has multiple gate consumers).

Non-goals (explicitly OUT of this wave):
- The speedtest version bump (it pins `^3.9.0`, resolving the shipped two-only
  build) is **publish-gated → DEFERRED to W-PUB1.** This wave does not touch
  speedtest source and does not require speedtest checked out (the consumer walk
  gracefully skips an absent sibling).
- The rounded-knob-vs-cylinder design reconcile (H-slider Finding 2), the
  spectrum round-fallback fidelity (Finding 4), and the dock-with-slider story
  (Finding 5) are **W-SLD1 / W-DOCK3** scope — NOT here.

## Files / edit-sites

| File | Edit |
|---|---|
| `scripts/proof-slider-two-only.mjs` | ADD clause (5) CONSUMER-BOUNDARY; import `CONSUMERS`/`resolveSibling`/`skipSibling` from `./constellation.mjs`; extend the file-header doc-block to 5 clauses; add the `consumerVariantHits` fact + the per-repo skip log; surface the clause in the console summary. **EXPORT a pure detector `scanSliderVariants(src, file)`** (returns `{ hits: [{line, variant}], uncheckable: N }`) — the testable seam the bite drives, mirroring the `detectWrapSource`/`detectLiveWrap` exports of `proof-dock-wrap-content-driven.mjs:69,303`. NO change to clauses 1-4; the gate currently exports NOTHING (only the CLI guard at `:199`), so this is the new export surface. |
| `tests/scripts/proof-slider-two-only.detect.test.ts` (NEW) | The born-RED→GREEN device-free canary, mirroring `tests/scripts/dock-wrap-content-driven.detect.test.ts`: feeds `scanSliderVariants` in-test source strings — a RED fixture (`<Slider variant="rounded" />` AND `:variant="'rounded'"` → `hits.length === 2`), a GREEN fixture (`<Slider variant="spectrum" />` + default `<Slider />` → `hits.length === 0`), an UNCHECKABLE fixture (`:variant="someRef"` → `uncheckable === 1`, `hits.length === 0`, the blind-spot is logged NOT flagged). Lives under `tests/` per the no-test-in-src rule (the `tests/` mirror tree). |

No change to `Slider.vue` or `index.ts` (those are W-SLD1's surface). No new
package.json script, no new CI step — the existing
`proof:slider-two-only` entry (`package.json:588`, `scripts/gates.mjs:608` the
`id:`/`cmd:` block, `.github/workflows/ci.yml:190-191` the `- name:`/`run:` step)
now runs the 5-clause gate.

## The fifth clause — exact shape

The clause walks the constellation consumers and reds on an out-of-keyset
`<Slider>` variant binding. It MUST handle three binding forms and the two
out-of-band cases:

1. **Static string** — `variant="rounded"` (and `'rounded'`). Captured by an
   ERE over `\bvariant\s*=\s*["']([^"']+)["']` scoped to a line carrying a
   `<Slider` open-tag, OR a `<Slider … :variant=` literal.
2. **Bound literal** — `:variant="'rounded'"` / `:variant='"rounded"'`. The
   inner literal is extracted; a NON-literal bound expression
   (`:variant="someRef"`) is REPORTED-as-UNCHECKABLE in the facts (NOT a
   violation — the gate cannot statically resolve a ref; flagging it would be a
   false-positive — but it IS logged so the boundary's blind spot is recorded,
   not silently swallowed).
3. **Keyset source** — the allowed set is read from `EXPECTED_KEYS` (the same
   constant clauses 1-4 use), so widening the keyset in ONE place
   (`EXPECTED_KEYS`) re-permits a variant across BOTH the library KEYSET clause
   and this consumer clause — no second hardcoded list to drift.

Scan scope + absence policy (reuse the shipped idiom verbatim):
- Iterate `CONSUMERS` (constellation.mjs) — self (glass-ui `src`+`demo`) +
  siblings.
- For each, `resolveSibling(member)`: present → scan its `roots`; absent →
  `skipSibling("proof:slider-two-only", member)` (the graceful registry-default
  skip — an absent speedtest/words/bbnf on a clean CI runner is NEVER a
  violation; the LOGGED skip means absence is never a silent cap).
- File set: `*.vue` (the only markup carrying `<Slider variant=>`); the
  `SCAN_GLOBS` precedent in proof-phantom-classes is wider but the slider tag is
  Vue-template-only, so the clause may narrow to `*.vue` for speed (record the
  narrowing in the doc-block).
- An absent SELF (glass-ui) stays a HARD error (consistent with the existing
  source-file-missing exit at `:78-83`).

Facts emitted (artefact + console): `consumerVariantHits` (array of
`{repo,file,line,variant}` for out-of-keyset hits), `consumerUncheckableBinds`
(the `:variant="ref"` blind-spot count), `consumersScanned` /
`consumersSkipped`. A non-empty `consumerVariantHits` pushes a violation:
`"consumer <repo>/<file>:<line> binds Slider variant=\"<X>\" — X ∉ [standard,spectrum]; the removed variant is a silent runtime no-op"`.

## Hard gate (evidence-backed)

`proof:slider-two-only` stays GREEN at HEAD with all FIVE clauses, and the new
fifth clause is proven to BITE by a device-free detector canary (the exported
`scanSliderVariants` driven by a `.detect.test.ts`) PLUS an end-to-end planted-line
run. Three artefacts close this wave:

1. **GREEN-AT-HEAD** — `npm run proof:slider-two-only` exits 0 at HEAD; the
   console + the `.cache/gates/AV-slider-two-only.json` artefact show the new
   fact block (`consumersScanned ≥ 1`, `consumerVariantHits: []`,
   `consumersSkipped` listing any absent siblings via the logged skip). The four
   prior clauses are unchanged (KEYSET `[standard,spectrum]`, ORPHAN none,
   CYLINDER-CAP `var(--radius-pill)`/height 100%, SQUIRCLE @supports-gated).

2. **BITE-RED (the load-bearing artefact, two layers)** — (a) the DEVICE-FREE
   detector canary: `tests/scripts/proof-slider-two-only.detect.test.ts` drives the
   exported `scanSliderVariants` against a RED source string
   (`<Slider variant="rounded" />` + `:variant="'rounded'"`) and asserts
   `hits.length === 2`; against a GREEN string asserts `hits.length === 0`; against
   `:variant="someRef"` asserts `uncheckable === 1` (blind-spot logged, NOT flagged).
   `npm run test -- proof-slider-two-only.detect` passes (the born-RED→GREEN unit, the
   `dock-wrap-content-driven.detect` precedent). (b) the END-TO-END bite: planting a
   real `<Slider variant="rounded" />` line into a SCANNED root (glass-ui's own
   `demo/`, a `CONSUMERS` member) and running `npm run proof:slider-two-only` captures
   the gate exiting NON-ZERO with the violation `consumer demo/…:N binds Slider
   variant="rounded" — X ∉ [standard,spectrum]`; removing the line flips the same run
   back to exit 0. Together these are the deletion/injection proof that the clause is
   load-bearing, not a grep that always passes. The captured non-zero run output (the
   `VIOLATIONS:` block naming the planted line) + the passing detect-test output are
   the binding artefacts attached to the wave close.

3. **DEFERRED (named successor, recorded — not a miss)** — speedtest builds
   green against the AY-published glass-ui with its two `<Slider>` sites
   (`DashboardMapControls.vue:65,135`) intact and a version bump off `^3.9.0`:
   **publish-gated, owned by W-PUB1.** This wave's gate does NOT require
   speedtest checked out (the consumer walk skips it gracefully); the build-green
   proof lands in W-PUB1 after AY publishes.

Bite summary (the one-line falsifier): add `<Slider variant="rounded">` to any
consumer `.vue` → clause 5 REDs; remove it → green. Widen `EXPECTED_KEYS` to
include `"rounded"` → both KEYSET (clause 1) and CONSUMER-BOUNDARY (clause 5)
re-permit it from the single constant (no second list to drift).

## Completion criterion

All three artefacts above verify: gate green at HEAD with the 5-clause fact
block; the captured non-zero BITE run naming the planted `variant="rounded"`
line (and the green run when removed); the speedtest build-green explicitly
recorded as DEFERRED to W-PUB1 with W-PUB1 named as its successor. AUDIT-LEDGER
row 9 ("migrate consumers") can read DONE for the GATE half (the version-bump
half stays W-PUB1).

## Precept conformance

- **Root-not-consumer** — the fix lands in the LIBRARY's gate (the one home that
  already owns slider cardinality), not as a per-consumer lint; one gate polices
  both boundaries.
- **No-workaround / gestalt** — extends the existing gate's clause set rather
  than spawning a parallel `proof:no-bespoke-slider`; reuses the shipped
  constellation consumer-walk (no new scan harness).
- **≥2-consumer bar** — no new substrate; the consumer-walk machinery
  (`CONSUMERS`/`resolveSibling`) already has multiple gate consumers
  (proof-phantom-classes, proof-consumers-static, proof-resolution).
- **Cardinal DELTA** — the load-bearing artefact is a captured non-zero gate run
  (the BITE), not a "the clause exists" claim.
- **Greenfield-no-meta** — the gate doc-block describes the 5 clauses as the
  current contract; no "added in W-SLD2" / migration narration in source.
- **No-deferral discipline** — the ONE deferred item (speedtest version bump) is
  publish-gated with an EXACT named successor (W-PUB1), not "a future tranche".
