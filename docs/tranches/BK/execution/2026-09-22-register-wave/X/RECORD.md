# Lane X — 10-2 `ringsAt`, 10-3 `ColorResolver` + `defaultBlobColorResolver`, 10-4 R-6-LIGHT (c)

**Seat** implement · **model** `claude-opus-5-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a4668a47-faa/agent-a563f90bd2dd775d6.jsonl`,
the `"model"` field, found by grepping the workflows tree for `LANE X · rows 10-2 (ringsAt)`;
matched against `claude-opus-5*` with `&&` before the first repo byte) · **date** 2026-09-22 ·
**base** `master` @ `695d4925` · **ruling of record**
`docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §1 10-2/10-3/10-4, on the
grounds of O-20 LEDGER §CUT-3, §CUT-4/5 and O-26 LEDGER §R-6-LIGHT (the measured set from
`execution/2026-09-18-o26-cure/A/RECORD.md` §R-6-LIGHT).

## Step-0 baseline

`git status --short` at first byte: empty. `HEAD` = `695d4925f1945060005c717537fea97b9c61781b`.
Receipt (`node scripts/gate-register.mjs`) at baseline:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

## Born-RED (witnesses written first, run on the old bytes)

- `tests/public-surface.spec.ts` `retiredSubpathRuntimeMembers` gains two rows
  (`fourier-field`/`ringsAt`, `color`/`defaultBlobColorResolver`) read through two new
  namespace imports (`ColorSurface`, `FourierFieldSurface`); plus one type-level door, a
  `// @ts-expect-error` over `import type { ColorResolver as _RetiredColorResolver } from
  "@glass/composables/color"` (the mirror of the O-20 GAP nameability imports beside it).
  **RED** (`vitest run tests/public-surface.spec.ts -t 'does not export retired'`, log
  `scratchpad/regwave/X-red-surface.log`) → `× does not export retired 'fourier-field' member
  'ringsAt'` · `× does not export retired 'color' member 'defaultBlobColorResolver'` ·
  `Tests 2 failed | 13 passed | 81 skipped (96)`.
- `tests/components/custom/aurora/atoms.test.ts` "interactivity is discriminated by medium"
  gains "admits light only on the media whose texture writes impasto (oil, vangogh)": a
  `// @ts-expect-error` over `{ medium: { kind: "crayon" }, interactivity: { light: true } }`
  and a positive `vangogh` arm with `light: true`.
  **RED** (`vue-tsc --noEmit -p tsconfig.test.json`, log `scratchpad/regwave/X-tsc-red2.log`)
  → exactly two errors, both the witnesses: `atoms.test.ts(273,9): error TS2578: Unused
  '@ts-expect-error' directive.` · `public-surface.spec.ts(56,1): error TS2578: Unused
  '@ts-expect-error' directive.` · `exit 2`.

## Fence as measured

`grep -rn 'ringsAt\|ColorResolver\|defaultBlobColorResolver' src demo tests` at HEAD. Two
facts move the fence the prompt named, neither widening it past the ruling:

- The fourier-field tree lives at `src/components/fourier-field/**`, not
  `src/composables/fourier-field/**` (no such directory). Its barrel `index.ts:12` is the one
  in-house importer of `ringsAt`, so it is in the fence by the importer clause.
- In-house sites of the color names: `src/composables/color/index.ts` (the definitions),
  `tests/components/custom/blob/resolveColor.test.ts` (the ONE composition site — the const's
  caller), and prose-only `ColorResolver` mentions in `src/composables/dom/useResolveTokenColor.ts:6,:14`
  and `src/composables/dom/index.ts:16`. `TokenColorResolver` (`useTokenColor.ts`) is a
  different name and untouched.
- 10-4 moves two in-house importers of the narrowed `AuroraAtoms` type, which the three-name
  grep cannot see: `configToAtoms` in `atoms.ts` itself, and
  `demo/stories/substrates/aurora/AuroraConfigDock.vue:135` (the demo's atoms→config door),
  both TS2322 under the narrowed union (log `X-tsc-src2.log`). Both are the ruling's
  necessary consequence — the demo is in no other lane's fence — so both were cured; stated
  here, not implied.
- The bracket the driver owes RULINGS §3 fence row X (:119), per adjudication XB-6, verbatim:
  `[2026-09-22 · X close — fence ratified to include `demo/stories/substrates/aurora/AuroraConfigDock.vue` `<script>` (10-4's narrowed union fails vue-tsc there; X-tsc-src2.log:1) and `src/composables/dom/index.ts:16` (a docblock naming `ColorResolver`, returned by the measured importer grep); both in no other lane's fence]`.

## 10-2 · `ringsAt`

**Ruling.** "Off the `./fourier-field` barrel; the function stays exported from `mint.ts`
(the test is its external site); the tautology test struck; the two behavioural tests kept;
the demo story NOT wired to it."

**Edits.** `src/components/fourier-field/index.ts:12` — `ringsAt` dropped from the named
re-export (`mintSpectrum` and `type MintedSpectrum` stay). `renderer/mint.ts:150` unchanged.
`tests/components/fourier-field/FourierField.smoke.test.ts` — `ringsAt` now imported from
`@glass/components/fourier-field/renderer/mint` (:28-32); the tautology case "draws no ring
narrower than the stroke drawing it" (:196-206 at HEAD; O-20 cited :196-201, the first six lines of it) struck — it
re-derived `2·amplitude·pxPerModel ≥ stroke` and compared `ringsAt` to itself; its only
consumer of `FOURIER_STROKE_RUNGS` went with it, so that import narrowed to
`FOURIER_QUANTUM_FINE` (:34). The two behavioural cases ("sheds rings as the stage shrinks",
"never elides a term from the SUM") kept verbatim. Demo not touched.

**Witness.** `tests/public-surface.spec.ts` retired row `fourier-field`/`ringsAt`.
RED → `× does not export retired 'fourier-field' member 'ringsAt'` (`X-red-surface.log`).
GREEN → `Tests 15 passed | 81 skipped (96)` (`X-green-surface.log`).

**Residue.** `src/components/fourier-field/README.md:31` still names `ringsAt` when
describing the ring law — true of `mint.ts`, which still exports it; it does not claim the
barrel. Left.

## 10-3 · `ColorResolver` + `defaultBlobColorResolver`

**Ruling.** "Both deleted from `./color` in one decision." (O-20 CUT-4/5: "the type exists
only as the const's annotation; the const is a one-line composition of two exports on the
same subpath.")

**Measured first.** The CURE-NOW docs half had already landed (O-20 lane E2): the two
docblocks at HEAD (`color/index.ts:36-47`, `:153-159`) already said "NO shipped component
takes one" and "stays published until the 10.0.0 cut, which is the owner's". There is no
separate color barrel or hand-written d.ts: `./color` → `dist/color.{js,d.ts}` is emitted from
`src/composables/color/index.ts`; the root barrel `src/index.ts` names neither.

**Edits.** `src/composables/color/index.ts` — the `ColorResolver` docblock + type (old
:36-48) and the `defaultBlobColorResolver` docblock + const (old :153-161) deleted whole; no
replacement name. `tests/components/custom/blob/resolveColor.test.ts` — the one caller:
the import becomes `{ cssToOklch, oklchToGammaRgb }` and each of the four calls is inlined
as `oklchToGammaRgb(cssToOklch(…))`; the header comment names the composition instead of the
const. Prose: `src/composables/dom/useResolveTokenColor.ts:6,:14` now say "the renderer's
`(css) => rgb` resolve" (the O-20 row's own rewrite), `src/composables/dom/index.ts:16`
"the renderer's color resolve".

**Witness.** `tests/public-surface.spec.ts` — retired row `color`/`defaultBlobColorResolver`
(runtime) and the `@ts-expect-error` type door on `ColorResolver` (:53-57).
RED → `× does not export retired 'color' member 'defaultBlobColorResolver'`
(`X-red-surface.log`) · `public-surface.spec.ts(56,1): error TS2578: Unused
'@ts-expect-error' directive.` (`X-tsc-red2.log`).
GREEN → `Tests 15 passed | 81 skipped (96)` · `vue-tsc --noEmit -p tsconfig.test.json`
`exit 0` (`X-tsc-test3.log`).

## 10-4 · R-6-LIGHT (c)

**Ruling.** "The atoms-door union narrows to the honest type: `light` is admitted only on
arms whose medium carries `impasto > 0`, per the set Lane A MEASURED; `light?: never` on
every other arm."

**The set.** Lane A (`o26-cure/A/RECORD.md` §R-6-LIGHT): `impasto` is written non-zero only
at `atoms-fields.ts:181`, reached by the `oil` and `vangogh` arms of `applyTexture`. Re-measured
at HEAD: unchanged (`atoms-fields.ts:178-183`); the demo's three presets with a non-zero
`impasto` literal are `oil` (`demo/.../aurora/presets.ts:219/:226`, `:259/:266`) and
`vangogh` (`:300/:309`) — the same set. `{oil, vangogh}`.

**Edits.** `src/components/aurora/composables/atoms.ts` — a private
`type AuroraImpastoMedium = "oil" | "vangogh"` with a one-line JSDoc; `AuroraAtoms` goes from
two arms to three: smooth (`AuroraSmoothInteractivityAtom`, `light?: never`), the other
textured media `Exclude<AuroraMedium, "smooth" | AuroraImpastoMedium>`
(`AuroraSmoothInteractivityAtom`, `light?: never`), and the impasto media
(`AuroraPainterlyInteractivityAtom`, `light?: boolean`); the union's docblock and the two
interface one-liners say which. `configToAtoms` — the non-smooth return splits: a
non-impasto medium projects the field axes only (a comment line says why); oil/vangogh keep
the `light` projection. `resolveAtoms` untouched (its `kind !== "smooth"` read type-checks and
only a cast could now reach it with `light` on a non-impasto arm). Demo
`AuroraConfigDock.vue:135-161` — the atoms literal branches three ways to match (impasto arm
carries the whole `interactivity`; other textured arms and smooth carry `field`, the three
field axes); the post-resolve `light` re-apply below it is unchanged, so the demo's resolved
config is byte-for-byte what it was. `tests/components/custom/aurora/atoms.test.ts:150-155`
(the TOTAL fuzz's `check`) — same three-way branch; the non-impasto literal rebuilds
`{ kind, amount }` from the narrowed `medium.kind` (a spread of a union-typed nested
discriminant cannot select an arm).

**Witness.** `atoms.test.ts` "admits light only on the media whose texture writes impasto
(oil, vangogh)" (:274-284 after the cure; :272-282 on the RED run, before the fuzz `check` gained two lines).
RED → `atoms.test.ts(273,9): error TS2578: Unused '@ts-expect-error' directive.`
(`X-tsc-red2.log`). GREEN → `vue-tsc --noEmit -p tsconfig.test.json` `exit 0`
(`X-tsc-test3.log`); `vue-tsc --noEmit` `exit 0` (`X-tsc-src3.log`); targeted vitest
(`atoms`, `resolveColor`, `FourierField.smoke`) `Test Files 3 passed (3) · Tests 58 passed
(58)` (`X-targeted.log`).

**Residue.** The published names `AuroraSmoothInteractivityAtom` and
`AuroraPainterlyInteractivityAtom` are kept (a rename is not ruled); the "Smooth" interface now
also types the non-impasto textured arm, and its docblock says so. The demo's light toggle
(`sections/AuroraMotionSection.vue:41-43`) still shows for every non-smooth medium — demo UX,
not the type; left for the adjudicator.

## Build, dist, battery, receipt

**Build.** `npm run build` under `scratchpad/build.lock` (acquired, released on exit) →
`exit 0` (`X-build.log`). `dist/fourier-field.js` export list: `DEFAULT_FOURIER_CONFIG,
FOURIER_FIGURES, FOURIER_FIGURE_KEYS, FourierField, dftFromPoints, makeEllipticSpectrum,
makeHarmonicFigure, mintSpectrum, partialSumAt, positionsAt` — no `ringsAt`; 0 hits in
`dist/fourier-field.{js,d.ts}`. `dist/color.js` export list: `cssToOklch, deriveBlobPalette,
deriveHue, gamutMapStop, oklchStopToHex, oklchToGammaRgb, oklchToLinear, useAccentTone,
warmCatchLight` — no `defaultBlobColorResolver`; neither color name appears anywhere in
`dist/`. `ringsAt` still has a declaration at `dist/components/fourier-field/renderer/mint.d.ts:50`
(no entry reaches it), which is what the ruling asks for.

**Typecheck.** `vue-tsc --noEmit` `exit 0` (`X-tsc-src3.log`) · `vue-tsc --noEmit -p
tsconfig.test.json` `exit 0` (`X-tsc-test3.log`).

**Battery.** `npx vitest run` (log `scratchpad/regwave/X-X-vitest.log`) → `Test Files 2 failed |
231 passed (233)` · `Tests 2 failed | 2240 passed | 10 expected fail (2252)`. Both reds are
outside this lane's fence:
- `tests/gates/orphan-css-partial.test.ts` "every top-level style rule the reach union ships
  sits inside an @layer" — Lane L's born-RED 10-1 cascade arm, work in progress (the file is
  dirty in L's fence).
- `tests/gates/boot-graph.test.ts` "the dist-demo it measures is NEWER than every source" —
  `dist-demo/index.html` built 2026-09-18, sources newer (this wave's edits across lanes,
  including this lane's demo file). A stale-artefact arm; the fresh demo build is the driver's
  close step. Not touched.

**Receipt.** `node scripts/gate-register.mjs` →
`seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`
— unchanged from the baseline. `.published-roster` holds CSS names only (theme tokens and
utilities), so the three JS names never sat in it and `rosterSha256` does not move.

**`verify:package`** (`node scripts/verify-export-types.mjs`, `X-verify-package.log`) →
`G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2849999 > 2562566`. The +287,433 B is
Lane C's 10-6 (`package.json` `files` gains `MIGRATION.md`, 288,389 B); this lane's own edits
remove bytes. The rebind is the driver's act on the committed tree; no threshold touched.

## Files touched (for the driver's pathspec commit)

```
src/components/fourier-field/index.ts
src/composables/color/index.ts
src/composables/dom/index.ts
src/composables/dom/useResolveTokenColor.ts
src/components/aurora/composables/atoms.ts
demo/stories/substrates/aurora/AuroraConfigDock.vue
tests/public-surface.spec.ts
tests/components/fourier-field/FourierField.smoke.test.ts
tests/components/custom/blob/resolveColor.test.ts
tests/components/custom/aurora/atoms.test.ts
docs/tranches/BK/coordination/glass-outbound-2026-09-22-consumers-10.0.0.md
docs/tranches/BK/execution/2026-09-22-register-wave/X/RECORD.md
```

`tests/public-surface.spec.ts` is shared with no other lane's fence by name; this lane's hunks
are the imports at :53-59 and the two retired rows at :421-425.

## Where a LEDGER row and RULINGS differ

None in substance. The O-20 CUT-3 row cites the tautology test at `:196-201`; at HEAD it sat at
`:196-206` (`:195` is the `describe`, which stays) — the citation was the first six lines of
the case, not a moved case. O-20 CUT-4/5 names `dist/composables/color/index.d.ts:40-41,:66-67` and
`useResolveTokenColor.ts:17`; the d.ts docblocks were already rewritten by O-20 lane E2 and are
now deleted with the names, and the `ColorResolver` prose in `useResolveTokenColor.ts` sat at
`:6` and `:14`. The O-26 R-6-LIGHT (c) row says "`light?: never` on the smooth arm; the honest
type is 'light only where impasto > 0'"; RULINGS 10-4 adds "`light?: never` on every other
arm", which is what landed. RULINGS wins where it is more specific.

## FOR LANE R

**MIGRATION §10.0.0 rows**, in the removal-table grammar (`| removed | migration |`, first cell
the backticked bare name):

```
_Two names leave `./color`_

| removed | migration |
| --- | --- |
| `ColorResolver` | Nothing replaces the type. It annotated `defaultBlobColorResolver` and nothing else; no shipped component takes a resolver (the `<FourierField colorResolver>` prop went at 9.0.0 — see _The `<FourierField>` `colorResolver` prop is removed_ under 9.0.0). Write `(css: string) => [number, number, number]` if you still need the shape. |
| `defaultBlobColorResolver` | Call `oklchToGammaRgb(cssToOklch(css))` — both still on `@mkbabb/glass-ui/color`; that composition was the whole body. If you imported it only to bind `<FourierField :color-resolver>`, delete the import and the binding and keep the `color` you pass. |

_`ringsAt` leaves `./fourier-field`_

| removed | migration |
| --- | --- |
| `ringsAt` | Nothing replaces it on a public entry. It was a CPU copy of the renderer's ring rule (a ring is drawn iff twice the term's amplitude reaches the mark stroke, both in device px) with no readers anywhere; the function stays internal. If you need the count, compute it from `mintSpectrum(...)` with that same rule. |
```

And a type-narrowing row for 10-4 (not a removal; the `| was | now |` grammar of MIGRATION.md:3685,:3729):

```
_`AuroraAtoms` admits `interactivity.light` only on the impasto media_

| was | now |
| --- | --- |
| `AuroraAtoms` with `medium.kind` other than `"oil"`/`"vangogh"` and `interactivity.light` | `light?: never` there (type error). It never painted: `light` steers `uLightDir`, whose only reader multiplies every term by `uImpasto`, and only the oil/vangogh texture amount writes `impasto`. Delete `light`, or switch the medium to `oil`/`vangogh` with an `amount` above 0. `configToAtoms` no longer projects `light` for a non-impasto medium. |
```

**Consumer recipes** (measured, read-only): slides `Slide01.vue:11,:32-38` → drop the import, the
`:color-resolver` binding and `variant="hero"`, keep `color="var(--viz-fourier)"`; slides
`Slide05.vue:24,:43` → the same, keep `color="var(--viz-chebyshev)"`, drop `variant="final"`.
atlas `ColorScale.ts` → no change (the hit is atlas's own `MarkColorResolver`, `:407`; the file
imports nothing from glass-ui). value.js → 0 hits; sci-report (source is `dashboards/`, not `src/`; pin `7.0.0`, HEAD `735ce1c8`) → 4 same-substring hits on atlas's `publishMarkColorResolver`, no glass-ui `./color`/`./fourier-field` import, nothing to change. `ringsAt` → 0 readers.

**Letter path**: `docs/tranches/BK/coordination/glass-outbound-2026-09-22-consumers-10.0.0.md`.

**Committed prose the 10-3 cut makes false (R brackets, MIGRATION's spaced late-row convention, `[2026-09-22 · register wave 10-3 — …]`)**

- `MIGRATION.md:73-76` — "`ColorResolver` and `defaultBlobColorResolver` both still ship on
  `./color` and are **unchanged by this cut**. … so a consumer may keep importing
  `defaultBlobColorResolver` for its own use". True of 9.0.0; both are deleted at 10.0.0 per
  RULINGS 10-3.
- `MIGRATION.md:1469` — the `ColorResolver` census row: "Ships on `./color` at 9.0.0 and is
  live; … so nothing has moved yet." It moved at 10.0.0.
- `MIGRATION.md:55` — the `<FourierField :color-resolver>` row: "Drop the `import {
  defaultBlobColorResolver } from "@mkbabb/glass-ui/color"` above it too, unless the file uses
  it for something else." At 10.0.0 the import has no export to bind; delete it
  unconditionally.
- `CHANGELOG.md:45-46` — "`ColorResolver` and `defaultBlobColorResolver` are untouched and
  still ship on `./color`". True of the 9.0.0 entry; the 10.0.0 entry records the deletion.

**CHANGELOG facts** (counted on the HEAD build before → after this lane, not against the 9.0.0
tarball, which other cures since have also moved): `./color` runtime exports 10 → 9 and its
types lose `ColorResolver`; `./fourier-field` runtime exports 11 → 10 (dist export lists
quoted above); `AuroraAtoms`
becomes a three-arm union (smooth / non-impasto textured / oil+vangogh).

## Cure round 1

Seat: X cure, round 1 · model id `claude-opus-5-5` (own transcript
`wf_a4668a47-faa/agent-a116b78165a45430d.jsonl`) · from `scratchpad/regwave/X-adjudication-1.json`
(adjudicator `claude-fable-5-1`, verdict CURE-ROUND; XB-1..4, XB-7 ACCEPT; XB-5, XB-6 AMEND;
no REJECTED item applied — XB-5's dash half stays, the RECORD keeps the O-20 spaced form).

- **1** (XB-1) Letter census paragraph → over `sci-report/dashboards` (`node_modules` excluded), seven files (two slides
  imports, five atlas-name hits). Re-measured before writing: `../sci-report/src` absent;
  `dashboards/package.json:17` pins `7.0.0`; HEAD `735ce1c8`; the four `publishMarkColorResolver`
  files at the named lines. Applied.
- **2** (XB-1) Letter `### value.js, sci-report` body → the four named files, no glass-ui
  `./color`/`./fourier-field` import. Applied.
- **3** (XB-7) Letter "That makes it the O-20 slides adopt row, same file." → "The O-20 slides
  adopt row asks for the same edit in the same file." Applied.
- **4** (XB-3) Letter em dashes tightened, run last: `grep -c ' — '` → 0; title reads
  `# 10.0.0—three published names leave …`. Applied.
- **5** (XB-1) RECORD FOR LANE R census line → value.js 0 hits; sci-report `dashboards/`, 4
  atlas-name hits, nothing to change. No other "three files"/"sci-report/src" in the RECORD
  (the `0 hits in dist/…` sentence under Build is a different fact and stays). Applied.
- **6** (XB-2) FOR LANE R gains "Committed prose the 10-3 cut makes false" — MIGRATION.md:73-76,
  :1469, :55 and CHANGELOG.md:45-46, each quoted with the fact. Lines re-read at HEAD before
  quoting. Applied.
- **7** (XB-4) 10-4 draft row → `| was | now |`, now-cell opens `light?: never` there (type
  error), the explanatory sentences kept; header sentence names the grammar. Applied.
- **8** (XB-4) `ColorResolver` draft row cites _The `<FourierField>` `colorResolver` prop is
  removed_ under 9.0.0 by heading. Applied.
- **9** (XB-5) The tautology case line figures → `:196-206` (`:195` the kept `describe`) in §10-2
  and "Where a LEDGER row and RULINGS differ". Applied.
- **10** (XB-7) `tests/components/custom/blob/resolveColor.test.ts:7-8` comment rewritten
  (both ≤ 83 columns, :9 continues). Comment-only; `npx vitest run` on the file → `Test Files 1
  passed (1)` · `Tests 4 passed (4)` (`X-cure1-resolveColor.log`). Applied.
- **11** (XB-6) The XB-6 bracket the driver owes RULINGS §3 :119 quoted verbatim under "Fence as
  measured". Applied.
- **12** Verify: letter `' — '` count 0; the census greps return only the corrected sentences;
  receipt `node scripts/gate-register.mjs` →
  `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`
  — unchanged (`X-cure1-receipt.log`). The files-touched list already names the letter, this
  RECORD and `resolveColor.test.ts`; no new file.
