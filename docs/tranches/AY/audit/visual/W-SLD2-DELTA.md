# AY.W-SLD2 — slider consumer-boundary gate clause · gate-output DELTA

This is a SOURCE/GATE wave (the spec declares "No live DELTA — source/gate wave").
The captured proof is the `proof:slider-two-only` born-RED → GREEN gate-output (exit
code + artefact JSON + the device-free detector canary + the end-to-end planted-line
bite), not a pixel screenshot. The wave closes the ONE hole AX.W59 left: the gate was
SOURCE-ONLY and never asserted the consumer boundary, so a consumer `<Slider
variant="rounded">` (the silent-no-op binding class, MEMORY
`feedback_glass_ui_binding_verification`) shipped green.

Captured 2026-06-09 against HEAD (`tranche/AY`).

## What landed

| File | Edit |
|---|---|
| `scripts/proof-slider-two-only.mjs` | clause (5) CONSUMER-BOUNDARY wired into `run()`; `EXPORT scanSliderVariants` + `compareSemver` (the testable seam); imports `CONSUMERS`/`resolveSibling`/`skipSibling` from `constellation.mjs`; new facts `consumerVariantHits` / `consumerUncheckableBinds` / `consumersScanned` / `consumersSkipped`; console summary surfaces clause 5. Clauses 1-4 unchanged. |
| `tests/scripts/proof-slider-two-only.detect.test.ts` (NEW) | the born-RED→GREEN device-free canary mirroring `dock-wrap-content-driven.detect.test.ts` — 9 cases over the exported detectors. |

`Slider.vue` / `index.ts` untouched (W-SLD1's surface). No new package.json script, no
new CI step — the existing `proof:slider-two-only` entry now runs the 5-clause gate.

## G1 — GREEN-AT-HEAD (the 5-clause fact block)

`node scripts/proof-slider-two-only.mjs` → **exit 0**. Console + artefact
`.cache/gates/AV-slider-two-only.json` (`status:"pass"`) carry the new fact block:

```
  variant keys        : standard, spectrum         (clause 1 KEYSET — unchanged)
  orphan selectors    : (none)                      (clause 2 ORPHAN-SCAN — unchanged)
  std knob radius     : 50% (aspect-ratio 1, circle true)  (clause 3 ROUND-KNOB — unchanged)
  range glass blur    : true
  spectrum squircle   : @supports-gated (height 100%)      (clause 4 SQUIRCLE — unchanged)
  consumers scanned   : glass-ui, keyframes.js, value.js, words/frontend,
                        bbnf-lang/playground, bbnf-buddy, speedtest    (clause 5)
  consumers skipped   : fourier-analysis/web (installed 3.1.0 < 3.9.0 (pre-two-only))
  consumer variant hits: 0 (uncheckable binds: 1)
```

`consumersScanned ≥ 1` (7 consumers including SELF), `consumerVariantHits: []`. The
version-pin scope BITES on a live sibling: `fourier-analysis/web` is present on disk but
its installed `@mkbabb/glass-ui` is `3.1.0` — BELOW the `TWO_ONLY_FLOOR` (3.9.0) — so its
removed-variant bindings would resolve against ITS OWN pre-collapse keyset (not a no-op
there) → it is a LOGGED out-of-scope skip, never a violation. `speedtest` is at exactly
`3.9.0` (== floor → in scope, scanned; its two `<Slider>` sites bind no variant → clean).

The ONE live `consumerUncheckableBinds: 1` is `demo/stories/forms/slider.vue:131`'s
`:variant="variant"` — a bound REF the gate cannot statically resolve. It is LOGGED in
the facts, NEVER flagged: a false-positive there would lie. This is the boundary's blind
spot recorded, not silently swallowed.

## G2 — BITE-RED, layer (a): the device-free detector canary

`npx vitest run tests/scripts/proof-slider-two-only.detect.test.ts` → **7 passed** (the
two `describe` blocks; 9 assertions across them). The exported `scanSliderVariants` is
driven against:

- RED fixture — `<Slider variant="rounded" />` (static) + `:variant="'rounded'"` (bound
  literal) → `hits.length === 2`, both `variant === "rounded"`, `uncheckable === 0`.
- GREEN fixture — `variant="spectrum"` (in-keyset) + default `<Slider />` (unbound) →
  `hits.length === 0`, `uncheckable === 0`.
- UNCHECKABLE fixture — `:variant="someRef"` → `hits.length === 0`, `uncheckable === 1`
  (blind-spot logged, NOT flagged).
- the word-boundary fence — `<SliderRoot>` / `<SliderControl>` are DISTINCT components, a
  removed-variant value there is NOT a glass-ui `<Slider>` no-op → 0 hits.
- the multi-line tolerance — `variant=` on a line BELOW the `<Slider` open tag is reached
  (the live demo/speedtest tag shape) → 1 hit.
- `compareSemver` — the version-pin order (`3.1.0 < 3.9.0`, `3.9.0 == 3.9.0`,
  `3.10.0 > 3.9.0`) + the pre-release/`v`-prefix normalization.

## G3 — BITE-RED, layer (b): the end-to-end planted-line bite (the load-bearing artefact)

Planting a real `<Slider variant="rounded" />` into a SCANNED self root (glass-ui's own
`demo/stories/forms/__sld2_bite_probe.vue`, a `CONSUMERS` self member) and running the
gate:

```
$ node scripts/proof-slider-two-only.mjs
  consumer variant hits: 1 (uncheckable binds: 1)

VIOLATIONS:
  ✗ consumer glass-ui/demo/stories/forms/__sld2_bite_probe.vue:2 binds Slider variant="rounded" — rounded ∉ [standard,spectrum]; the removed variant is a silent runtime no-op
  status: FAIL
$ echo $?
1
```

Removing the planted line flips the SAME run back to **exit 0**, `consumerVariantHits: 0`.
Together these are the deletion/injection proof that clause 5 is load-bearing — not a grep
that always passes. The probe file was removed after capture (the tree is clean; the
restored artefact reads `status:"pass"`).

The one-line falsifier: add `<Slider variant="rounded">` to any consumer `.vue` → clause 5
REDs naming the line; remove it → green. Widen `EXPECTED_KEYS` to include `"rounded"` →
BOTH the KEYSET clause (1) and the CONSUMER-BOUNDARY clause (5) re-permit it from the
single constant — no second hardcoded list to drift.

## G4 — DEFERRED (named successor, recorded — not a miss)

The speedtest version bump (it pins `^3.9.0`, resolving the shipped two-only build) is
**publish-gated → DEFERRED to W-PUB1** with W-PUB1 as the EXACT named successor. This
wave's gate does NOT require speedtest checked out (the consumer walk skips an absent
sibling gracefully); the build-green proof lands in W-PUB1 after AY publishes. The GATE
half of AUDIT-LEDGER row 9 ("migrate consumers") reads DONE; the version-bump half stays
W-PUB1.

## Verdict

**PASS.** The slider variant axis is now policed at BOTH boundaries: the library
cardinality (clauses 1-4, unchanged + green) AND the consumer call-site (clause 5,
green-at-HEAD, born-RED-proven by the device-free canary + the end-to-end planted-line
bite). `node scripts/proof-slider-two-only.mjs` exits 0; `npx vue-tsc --noEmit` exits 0;
`tests/scripts/proof-slider-two-only.detect.test.ts` 7-passed. The "migrate ALL consumers"
half AX.W59 left source-only gains its machine lock.
