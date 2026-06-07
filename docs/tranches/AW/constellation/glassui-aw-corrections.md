# glassui-aw-corrections — glass-ui's OWN AW debt the constellation audit surfaced

This is NOT a sibling handoff. It is a precise fix-list of amendments to glass-ui's OWN AW wave
files (`docs/tranches/AW/...`). The orchestrator applies these; this doc only SPECs them. Every
item is verified at HEAD (`afdc485`, branch `at-dock-convergence`, 3.3.0 published) against the
constellation digests under `docs/tranches/AW/audit/constellation/`.

The through-line: the AW orphan-prune scoping was authored against an INTERNAL-only consumer view.
Three of the five items below (1, 2, 5) are the SAME structural blind spot — a `rg` scoped to
glass-ui `src/` cannot see external npm consumers reached over the flat subpaths, so the orphan
verdicts under-count and prune load-bearing surface. The other two (3, 4) are the value.js/keyframes
peer + color-ownership coordination edges the 3.4.0 cut must carry.

---

## Item 1 — AW.W19 metric-cell/stack: flip the default verdict from PRUNE to KEEP+document

**Defect.** `AW.W19-orphan-prune.md` defaults to DELETING `metric-cell` + `metric-stack`. The audit
proved both are LIVE, committed, type-compatible EXTERNAL consumers in speedtest:
- `metric-cell` — `speedtest/src/components/dashboard/ResultDetailSheet.vue:7` imports `MetricCell`
  from `@mkbabb/glass-ui/metric-cell`; rendered 4× (`:42,48,54,60`).
- `metric-stack`/`MetricRow` — `speedtest/src/components/speedtest/ResultStack.vue:116` imports
  `MetricRow, MetricStack` from `@mkbabb/glass-ui/metric-stack`; 2 `<MetricStack>` + 4 `<MetricRow>`
  sites — the complete-screen results UI, the central results display.
- Zero surface drift: every prop speedtest binds exists in installed 3.1.0 dts AND glass-ui HEAD
  source (`MetricRow.vue:34-86`, `MetricStack.vue:35-63` — which hard-reference speedtest by name at
  `MetricStack.vue:45,58`). No kept substitute exists (MetricBadge is an inline pill, not a labeled
  metric card/row stack). Per `speedtest-components-origin.md` Findings 2-6.

The `>=2-consumer` verdict is therefore **KEEP-and-document**, not prune. The two documented
consumers are speedtest (consumer #1, external over the subpath) + the glass-ui demo/story
(consumer #2, confirm in the demo sweep).

**Wrong text (cite, strike or invert each):**
- Title: `AW.W19-orphan-prune.md:1` `# AW.W19 - Orphan resolution + metric-cell/stack prune` → drop
  "prune", retitle `# AW.W19 - Orphan resolution (instrument/glyph/metric — keep-and-document)`.
- `:5` Name field carries "metric-cell/stack prune" — same retitle.
- `:19` Scope item 3 `Prune metric-cell / metric-stack cleanly per the W0 verdict ... delete both
  packages + their subpath mirrors ... + api/index.ts type entries` — REPLACE with a keep-and-document
  clause: record the ≥2 documented genuine consumers (speedtest `ResultDetailSheet.vue` ×4 +
  `ResultStack.vue` ×6, the demo) + a one-line load-bearing rationale at each package barrel; the
  metric-cell/stack hidden dep AV.W10 hit was the EXTERNAL speedtest subpath consumer — surfaced now,
  no migrate-off (there is no kept substitute to migrate onto).
- File Bounds table `:35-38` — strike the four `delete` rows
  (`src/components/custom/metric-cell/` delete, `src/components/custom/metric-stack/` delete,
  `src/subpaths/metric-cell.ts` delete, `src/subpaths/metric-stack.ts` delete); REPLACE with two
  `modify-carve (keep-and-document rationale)` rows on
  `src/components/custom/metric-cell/index.ts` + `src/components/custom/metric-stack/index.ts`.
- File Bounds `:43` `api/index.ts | modify-carve (remove the metric-cell/stack type entries)` →
  strike the removal (the metric-cell/stack types STAY on `/api`; speedtest's types resolve through
  them). If any doc-touch is wanted, it is a no-op keep.
- File Bounds `:44` `package.json | modify-carve (remove the /metric-cell + /metric-stack exports ...)`
  → strike the export removals; the two subpath exports STAY (speedtest imports over them).
- File Bounds `:45` `<the hidden-dep consumer path named in the W0 ledger> | modify-carve (migrate
  off metric-cell/stack)` → strike (no migrate-off; the external consumer is the keep rationale).
- Agent Units `:63` (the metric remove mechanism), Hard Gate `:72-73` (items 2+3: "hidden dep
  surfaced before prune" + the zero-residue grep), Commit Plan `:97-98` (the migrate + remove
  commits) — all REPLACE with the keep mechanism: add the ≥2-consumer note + load-bearing rationale
  to the two barrels; `proof:orphan-resolved` asserts the keep (≥2 documented consumers + rationale
  comment), NOT a removal grep, for metric-cell/stack.
- AW.md framing `D-10` row + the §0 line `AW.W19 the orphan-prune` + the Wave-roster `AW.W19` row +
  the §3 "Orphan-prune / styling-assay" surface-table row (`src/components/custom/{metric-cell,
  metric-stack}/ (prune)`, `src/subpaths/metric-{cell,stack}.ts`, `api/index.ts`, `package.json`
  exports (W19)) — re-author so metric-cell/stack read KEEP, not prune.

**Corrected scope.** W19 resolves instrument-chassis/rail + glyph-face/disco-glyph by their W0
verdict (unchanged — keep-and-document, per `AW.W19:17-18`), and ADDS metric-cell + metric-stack to
the keep-and-document set with their external speedtest consumers recorded. Zero deletions. W19's own
escape hatch already licenses this — Goal criterion `:13` and Hard-Gate §1 `:71` permit "≥2 documented
genuine consumers OR removed"; this item just flips the default assumption.

**Gate impact.** `proof:orphan-resolved` (`scripts/proof-orphan-resolved.mjs`, created in W19) must
assert metric-cell/stack as KEEP (≥2 documented consumers + rationale in the barrel), not a
zero-residue removal grep. The Hard-Gate §3 `grep -rn "MetricCell\|MetricStack\|..." src/ package.json
returns only the deletion-commit removals` clause (`:73`) is DELETED — metric-cell/stack stay
referenced everywhere. `verify-export-types` (`:76,82`) must show the metric-cell/stack subpaths still
PUBLISHED (not removed). `proof:no-god-module` is unaffected.

---

## Item 2 — AW.W0 consumer-count blindness: the spot-verify `rg` scopes glass-ui `src/` only

**Defect.** `AW.W0-spot-verify.md:22` resolves "zero consumers" claims only through INTERNAL aliases —
"a `custom/<x>/index.ts` barrel re-export, a subpath mirror in `src/subpaths/`, a root-barrel
cherry-pick in `src/index.ts`". Every alias it names is internal to glass-ui. The dominant consumers
of metric-cell/stack are EXTERNAL npm consumers reached over the `/metric-cell` + `/metric-stack`
subpaths (speedtest — Item 1). A consumer-count `rg` scoped to glass-ui `src/` returns ZERO and
mis-verdicts "prune" — the exact AV.W10 "hidden dep restored them" near-miss (`AW.W19:108`) repeating
because the dep is EXTERNAL, not internal. Per `speedtest-components-origin.md` Finding 5 +
`adoption-sequencing-dag.md` Finding 2.

**Wrong text (cite):**
- `AW.W0-spot-verify.md:22` alias-resolved-verdict clause — internal-only alias chain.
- `:13` Goal criterion "a verdict resolved through re-export aliases" — same internal scope.
- Hard Gate §3 `:66` "the alias chain walked" — internal only.

**Corrected scope.** Extend the W0 consumer-count probe with an EXTERNAL-CONSUMER clause: for any
subpath-EXPORTED primitive (`package.json` exports an entry for it), the consumer count INCLUDES
external npm consumers reached over that subpath. The probe sweeps the constellation consumer repos
(speedtest, value.js, fourier, muster, words, keyframes demos — the repos named in the constellation
digests) for `from "@mkbabb/glass-ui/<subpath>"` imports of the candidate symbol. At MINIMUM, if a
live cross-repo grep is not run, the ledger must DOCUMENT that the orphan verdict for any
subpath-exported candidate is provisional-pending-a-constellation-grep, and name speedtest +
value.js as the known external metric-cell/stack/useBreakpoint consumers so W19 cannot prune them
blind. Add to `:22` and the Goal criterion `:13`.

**Recommendation.** Run the live cross-repo grep — the six sibling repos are checked out adjacent
(`/Users/mkbabb/Programming/{speedtest,value.js,fourier-analysis,muster,words,keyframes.js}`); a
`grep -rl 'from "@mkbabb/glass-ui/metric-cell"'` over their `src/`+`demo/` trees is the durable
probe. Encode it in `scripts/proof-aw-w0-reground.mjs` as a soft-warn list, not a hard gate (the
sibling repos may be absent on a clean CI runner — fall back to the documented known-consumer roster).

**Gate impact.** `proof:aw-w0-reground` (`scripts/proof-aw-w0-reground.mjs`) gains the external-consumer
assertion: each subpath-exported retire candidate's ledger row records the external-consumer sweep
result (or the documented known-consumer roster + a provisional flag). The §3a triumvirate trigger
"a verbatim `rg` count contradicts the audit's claimed count by ≥1 genuine consumer" (`:32`) now
FIRES on the speedtest/value.js external metric-cell/stack consumers — which is correct; it forces
the Item-1 verdict flip at W0 rather than letting W19 prune blind.

---

## Item 3 — The peer widen (a NEW 3.4.0 concern): keyframes ^4 + value ^0.11

**Defect.** glass-ui `package.json` peer ranges are stale vs both upstreams' npm-latest:
- `:615` `@mkbabb/keyframes.js: "^2.2.0 || ^3.0.0"` — EXCLUDES npm-latest 4.0.0.
- `:616` `@mkbabb/value.js: "^0.10.0"` (= `>=0.10.0 <0.11.0`) — EXCLUDES npm-latest 0.11.0.
- devDeps `:646` keyframes `^2.2.0`, `:647` value `^0.10.0` — same staleness.

Both are flagged optional in `peerDependenciesMeta` (`:627-642`), so install emits WARN not ERESOLVE.
But (a) AW.W5's aurora derive-color CONSUMES value.js 0.11.0's `interpolateHue` /
`HueInterpolationMethod` (`value.js dispatch.ts:219,234`) — these ship only in the 0.11.0 line, so
the value.js widen is a HARD prerequisite for W5's gate being CI-green against the REGISTRY (the
`file:` symlink masks this locally); (b) keyframes 4.0.0 bundles value.js 0.11.0 as a HARD `dependencies`
entry (`keyframes.js/package.json:86`), so the FIRST keyframes-4 bump in any consumer that still
resolves value 0.10 against glass-ui creates a DUAL-value.js-instance trap on the shared color
singleton (two `Color` prototypes / two color caches — the `instanceof` + module-singleton break).
Per `peer-matrix.md` Findings 1-2 + `adoption-sequencing-dag.md` Finding 4.

**The asymmetry (load-bearing):**
- value.js widen = HARD prerequisite for AW.W5 (registry-green). Sequences BEFORE / IN the W5 cut.
- keyframes widen = ship-safe-INDEPENDENT. glass-ui's consumed `SpringProgress` surface is untouched
  by the keyframes-4 `tick→tickDt` rename (`useSpring.ts` drives via `play()`+`subscribe`, never the
  named stepper — `keyframes-valuejs-supplier-matrix.md` Finding 7). Pure range-widen, zero source
  change, landable any time. AW needs NOTHING new FROM keyframes.

**Recommendation — fold into a small DEDICATED early wave, NOT W26.** W26 is a reka/shadcn/Tailwind
idiom wave; its File Bounds (`AW.W26:4`) explicitly do NOT touch `package.json` peer/dev ranges (only
the `proof:reka-binding-idiom` script entry). The peer-widen is a publish/dependency-coordination
concern, not an idiom concern, and it must land BEFORE the aurora band's W5 cut (Item 4) — W26 is in
band F (W22-26), far downstream of W5 (band B). Authoring it as a band-D-adjacent or pre-W5 hygiene
wave keeps it on the critical sequencing path. **Recommended home: a new small wave `AW.W27-peer-
conformance` (the W27 slot is currently unused between W26 and W28), or fold into the W0/W15 hygiene
seam if a new wave is unwanted.** Rationale for a new wave over a fold: it carries its own born-RED
gate (`proof:peer-conformance`) + the dual-instance lock, and it has a hard sequencing edge (precedes
W5's registry-green) that a band-F idiom wave cannot honor.

**Scope of the new wave:**
- `package.json:615` widen keyframes to `"^2.2.0 || ^3.0.0 || ^4.0.0"`.
- `package.json:616` widen value.js to `"^0.10.0 || ^0.11.0"`.
- `package.json:646-647` rebaseline devDeps to the versions glass-ui builds/tests against post-widen
  (so the lockfile regen lands a coherent dev pin). VERIFY glass-ui's keyframes consumption
  (`src/composables/motion/useSpring.ts` + the spring sites) type-checks against keyframes 4.0.0 AND
  value.js's `/color` leaf (`src/composables/color/index.ts:18-25` — the 7 imported symbols) against
  0.11.0 BEFORE widening; both are verified present at the new versions
  (`keyframes-valuejs-supplier-matrix.md` Findings 3-7), so this is a range edit, not a source adapt.
- DUAL-INSTANCE SEQUENCING CONSTRAINT (record in the wave Archaeology): a keyframes-4 bump bundles
  value 0.11 HARD; the widen must land BOTH the value-^0.11 admit AND the keyframes-^4 admit together
  so a consumer never resolves glass-ui-wants-value-0.10 next to keyframes-4-forces-value-0.11. The
  single-value.js-instance invariant is the constraint.

**Gate impact (new, born-RED):**
- `proof:peer-conformance` — reads glass-ui's own `peerDependencies["@mkbabb/keyframes.js"]` +
  `["@mkbabb/value.js"]`, reads `npm view <pkg> version` (or a pinned offline fixture), asserts the
  registry-latest SATISFIES the declared range (`semver.satisfies`). Bite: revert either widen →
  RED (4.0.0 ∉ `^2.2.0||^3.0.0`; 0.11.0 ∉ `^0.10.0`).
- `proof:single-value-instance` (the dual-instance lock) — assert that across glass-ui + keyframes the
  resolved `@mkbabb/value.js` is a SINGLE version (no dedupe split). A constellation-level probe; can
  live as a consumer-validation step or a born-RED dependency-tree assertion.

---

## Item 4 — AW.W5 huePath: IMPORT value.js's `HueInterpolationMethod`, don't re-invent it

**Defect.** `AW.W5-aurora-color-derive.md:28` Scope item 3 plans a `huePath` atom with the union
`shorter | longer | increasing | decreasing` citing "MDN `<hue-interpolation-method>`". value.js
ALREADY ships exactly this: `HueInterpolationMethod = "shorter" | "longer" | "increasing" |
"decreasing"` (`value.js dispatch.ts:219`, barrel `index.ts:131`) + the four-branch arc impl
`interpolateHue(h1, h2, t, method)` (`dispatch.ts:234-268`). Per the UNION color-ownership contract
(value.js OWNS color; glass-ui composes), W5 minting a parallel glass-ui `type HuePath = "shorter"|...`
duplicates a peer-owned type — the no-duplicate-substrate invariant. The GLSL `samplePalette` hue-arc
is NECESSARILY a GLSL transcription (value.js cannot run on the GPU), but the CPU-side TYPE and the
gate's CPU REFERENCE must route through value.js, the same way the `OKLCH_MATRICES_GLSL` matrices are
already locked to value.js's Ottosson constants. Per `valuejs-aurora-color-seam.md` Finding 3.

**Wrong text (cite):**
- `AW.W5-aurora-color-derive.md:28` Scope item 3 — `Add a huePath uniform/atom (shorter | longer |
  increasing | decreasing, MDN <hue-interpolation-method>)`. The union is invented inline rather than
  imported.
- `:107` Agent Unit AW.W5.1 mechanism `Add uHuePath (int enum: shorter/longer/increasing/decreasing)`
  — the CPU-side TS enum behind the GLSL int must be value.js's type.
- `:112` Sub-gate `proof:aurora-oklch-interp` — asserts the matrices 1e-6 + the blue→yellow
  midpoint-chroma, but does NOT route the hue-arc CPU reference through value.js's `interpolateHue`.

**Corrected scope (add to AW.W5.1):**
- The aurora config `huePath` field TYPE is `import type { HueInterpolationMethod } from
  "@mkbabb/value.js"` — NOT a new glass-ui union. Re-export through `src/api/index.ts` as
  `AuroraHuePath` only if a public alias name is wanted (an alias of the value.js type, not a copy).
  File bound: the `aurora.frag.ts` uniform stays GLSL-int; the TS config field + the `uniformBridge.ts`
  thread (`:63,110`) take the value.js type.
- The `proof:aurora-oklch-interp` gate's midpoint-chroma / hue-arc CPU reference ROUTES THROUGH
  value.js's `interpolateHue` + `mixColorsN(space:"oklab"/"oklch")` (`dispatch.ts:234,277`). Gate
  sketch: TS-port the GLSL `samplePalette` hue-arc, assert it matches `interpolateHue(h1,h2,t,method)`
  to 1e-6 for each of the four methods over a vivid-pair matrix; assert the blue→yellow OKLab-rectangular
  midpoint holds chroma above the linear-`mix` midpoint. Bite: revert `samplePalette` to linear `mix()`
  → the midpoint-chroma assertion REDs (unchanged bite, with the value.js arc as the now-locked reference).

**Negative (record, do NOT push down).** AW.W5.2's `deriveHue`/`deriveAurora`/`deriveScene`/
`temperatureShift`/eased-L-C is correctly glass-ui aurora-DOMAIN — value.js has NO harmony/derive/
scheme/easing-ramp API (grep'd the whole `value.js/src/units/color/` tree), so there is NOTHING to
consume there and a value.js harmony API would be SPECULATIVE single-consumer substrate. Keep it in
`color.ts`. Per `valuejs-aurora-color-seam.md` Finding 2 + Anti-finding 2. (This means NO value.js-side
code wave is warranted by AW — only the publication discipline in Item 3.)

**Gate impact.** `proof:aurora-oklch-interp` (`scripts/proof-aurora-oklch-interp.mjs`) gains the
value.js-`interpolateHue` 1e-6 hue-arc reference assertion (locks the GLSL arc to value.js's arc).
Hard-coupled to Item 3's value.js widen: the gate is registry-green ONLY when the value.js peer admits
0.11.0 (the version carrying `interpolateHue`) — so Item 3's value.js widen HARD-PRECEDES this gate.

---

## Item 5 — value.js `useBreakpoint` re-instate: TWO external consumers → RE-INSTATE in glass-ui

**Defect.** `useBreakpoint` was REMOVED from glass-ui `/dom` in 3.3.0 (commit `cbbaeb0`, the AV tranche
"W17 speedtest-ownership: removed the 3 /dom orphans" — deleted `src/composables/dom/useBreakpoint.ts`,
82 lines). The AV orphan call treated it as a non-consumer orphan; the audit found it has TWO live
EXTERNAL consumers — the SAME internal-only-`rg` blind-spot class as Items 1+2:
- **value.js** — 3 live sites: `demo/@/components/custom/image-palette-extractor/ImagePaletteExtractor.vue:91,120`,
  `demo/@/components/custom/palette-browser/composables/useCardMenu.ts:3,7`,
  `demo/@/components/custom/palette-browser/composables/useHoverPopover.ts:3,11` — all
  `import { useBreakpoint } from "@mkbabb/glass-ui/dom"`. value.js's `file:` symlink resolves the built
  3.3.0 dist, so it fails to resolve `useBreakpoint` NOW (the stale-binding failure class in MEMORY
  `feedback_glass_ui_binding_verification`). Per `valuejs-consumption.md` Finding 2.
- **speedtest** — `src/components/admin/AdminDataSourceToggle.vue:7,73`
  `import { useBreakpoint } from "@mkbabb/glass-ui/dom"` (a documented `AJ-W6-β` glass-ui-first-class
  adoption). speedtest pins `^3.1.0` (lockfile-pinned 3.1.0, which STILL has `useBreakpoint`) — safe
  today, but a bump to 3.4.0 breaks this site. NEWLY VERIFIED this lane (not in the original brief —
  the brief framed this as value.js-only).

Two external consumers across two repos → the `>=2`-consumer verdict is unambiguously RE-INSTATE.
glass-ui's current `/dom` barrel exports `useResizeObserver, useTouchGate, useTokenColor, useClipboard,
useUserInvalidAria, useTextHighlight` — no media-query primitive remains, so there is no kept
substitute for either consumer to migrate onto without re-forking the removed file.

**Recommendation — RE-INSTATE in glass-ui.** Restore `src/composables/dom/useBreakpoint.ts` (the
82-line file deleted at `cbbaeb0` — recover from that commit's parent) + re-export from
`src/composables/dom/index.ts`. Lowest consumer churn (zero edits in value.js or speedtest; both bindings
resolve again). Document the ≥2 external consumers (value.js demo + speedtest `AdminDataSourceToggle`)
as the load-bearing rationale at the barrel — the same keep-and-document discipline as Item 1.

**Lands in: AW.W19 (the corrected keep-and-document wave) OR a small re-instate clause in the Item-3
peer-conformance wave.** Recommended: AW.W19, since W19 is already the orphan-RESOLUTION wave and this
is an orphan mis-verdict of exactly the Item-1 class (an AV prune that missed an external consumer).
Add `useBreakpoint` to W19's keep-and-document set with its restore + the ≥2-consumer record. This also
forces W0 (Item 2) to sweep `/dom` candidates for external consumers, catching the same class.

**Gate impact.** If re-instated in W19: `proof:orphan-resolved` records `useBreakpoint` as a
RE-INSTATED keep (restored file + ≥2 documented external consumers + barrel rationale).
`verify-export-types` shows `/dom` re-exporting `useBreakpoint`. A new optional consumer-probe
`proof:valuejs-dom-binding` (`node -e 'import("@mkbabb/glass-ui/dom").then(m=>{ if(!m.useBreakpoint)
process.exit(1) })'`) locks it born-RED-on-HEAD (HEAD's `/dom` lacks it → RED until restored). W0's
extended external-consumer sweep (Item 2) must include `/dom` candidates so this class cannot recur.

---

## Apply order

1. **Item 2 (AW.W0)** FIRST — it is the binding precondition (inv P7); the external-consumer
   sweep clause must land before W0 runs its ledger, because Items 1 + 5 are the verdicts that
   sweep produces. Without it the ledger under-counts and W19 prunes blind.
2. **Item 1 (AW.W19)** — flip metric-cell/stack to keep-and-document (consumes the W0 ledger Item 2
   produces). Re-author the AW.md D-10 / §0 / roster / surface-table framing in the same pass.
3. **Item 5 (AW.W19)** — add `useBreakpoint` re-instate to the corrected W19 keep set (same wave,
   same keep-and-document mechanism as Item 1).
4. **Item 3 (new AW.W27-peer-conformance, or W0/W15 fold)** — the peer widen + born-RED
   `proof:peer-conformance` + `proof:single-value-instance`. Lands BEFORE the W5 cut (the value.js
   widen is W5's hard prerequisite). The keyframes widen is independent and can ride the same commit.
5. **Item 4 (AW.W5)** — the huePath value.js-type import + the `interpolateHue` gate reference.
   HARD-DEPENDS on Item 3's value.js widen being live (the gate is registry-green only against
   value.js 0.11.0). Apply after Item 3.

The headline sequencing edge: **Item 3's value.js peer-widen HARD-PRECEDES Item 4's W5 gate** —
W5's `proof:aurora-oklch-interp` consumes value.js 0.11.0's `interpolateHue`, which glass-ui's
`^0.10.0` peer excludes; the gate is locally-green via the `file:` symlink but RED against the
registry until the widen lands. And **Items 1/2/5 are one defect class** — the internal-only
consumer-count `rg` — surfaced three times; fixing W0's sweep (Item 2) is the structural root.

## Gate-impact summary

| AW gate | Change | Item |
|---|---|---|
| `proof:aw-w0-reground` (W0) | + external-consumer sweep assertion (subpath-exported candidates count external npm consumers; known-consumer roster fallback); §3a under-count trigger now fires on speedtest/value.js | 2 |
| `proof:orphan-resolved` (W19) | metric-cell/stack assert KEEP (≥2 consumers + rationale) not removal grep; + `useBreakpoint` re-instate keep; Hard-Gate §3 zero-residue grep for MetricCell/MetricStack DELETED | 1, 5 |
| `verify-export-types` (W19) | metric-cell/stack subpaths stay PUBLISHED; `/dom` re-exports `useBreakpoint` | 1, 5 |
| `proof:peer-conformance` (NEW, W27/fold) | born-RED: registry-latest keyframes 4.0.0 + value 0.11.0 satisfy declared peer ranges | 3 |
| `proof:single-value-instance` (NEW, W27/fold) | born-RED: single resolved value.js across glass-ui + keyframes (dual-instance lock) | 3 |
| `proof:valuejs-dom-binding` (NEW, optional, W19) | born-RED-on-HEAD: `@mkbabb/glass-ui/dom` exports `useBreakpoint` | 5 |
| `proof:aurora-oklch-interp` (W5) | + value.js `interpolateHue` 1e-6 hue-arc CPU reference; registry-green gated on Item 3's value.js widen | 3, 4 |
| `proof:no-god-module` (W19) | unaffected | — |
