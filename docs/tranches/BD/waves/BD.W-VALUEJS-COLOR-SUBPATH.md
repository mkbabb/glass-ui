# BD.W-VALUEJS-COLOR-SUBPATH

## (1) Band + goal

**Band 8 — Cross-repo asks + republish-gated consumes (foreign-tree fenced). BOOKED — value.js /color subpath-gated.**

On value.js Tranche O publishing the `/color` subpath in its `0.14.x`+ dist, re-point the 7 live `@mkbabb/value.js` root-monolith import sites onto `@mkbabb/value.js/color` — the footprint-shrink over the ~145 KB monolith (the color leaves pull only the OKLCh/ramp math, not the whole value.js surface). Until that subpath ships in the consumed dist, this STAYS BOOKED — re-pointing against a non-existent subpath is the contrivance the apply-the-bar discipline forbids. glass-ui edits ZERO value.js tree (inv-26); the in-repo half is this glass-ui wave (the 7 re-points), the subpath publish is value.js's own.

## (2) Starting state — the exact on-disk reality

- **value.js exports ONLY `.` (no `/color`) (machine-verified, this read).** `node -e "Object.keys(require('./node_modules/@mkbabb/value.js/package.json').exports)"` → **`["."]`**. The installed value.js version is `0.13.0` (`node -e "require('./node_modules/@mkbabb/value.js/package.json').version"` → `0.13.0`). The `/color` subpath does NOT exist in the consumed dist — so `import @mkbabb/value.js/color` would fail to resolve.
- **The 7 live monolith import FILES (grep-verified, this read — `grep -rln 'from "@mkbabb/value.js"' src/`):**
  1. `src/composables/color/index.ts:29` — the OKLCh primitives + ColorResolver seam (the `/color` leaf's own barrel).
  2. `src/composables/color/useAccentTone.ts:22` — `import { OKLCHColor, safeAccentColor, rawOklchToOklab } from "@mkbabb/value.js"`.
  3. `src/composables/motion/curves.ts:26` AND `:225` — the value.js `ease*` family re-export + the bezier cores (TWO import statements, ONE file).
  4. `src/components/custom/easing/composables/useEasingPicker.ts:24` — the curve math (`CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms`).
  5. `src/components/custom/aurora/composables/color.ts:26` — the aurora OKLCh→linear color core.
  6. `src/components/custom/aurora/constants/presets.ts:26` — `import type { HueInterpolationMethod } from "@mkbabb/value.js"`.
  7. `src/components/custom/border-progress/composables/spectrum-walk.ts:22` — `import { mixColors, OKLCHColor, sampleColorRamp } from "@mkbabb/value.js"` (the value.js-bearing dynamic leaf of the BorderProgress spectrum walk).
- **The peer is ALREADY forward-compatible (VERIFIED).** `package.json` peerDependencies `@mkbabb/value.js: ^0.13.0 || ^1.0.0` (this read). The `^1.0.0` leg is the pre-guard for value.js O's DECIDED `0.14.x → 1.x` cut the subpath split rides — so NO peer widen is owed; the peer already admits the cut. `proof:constellation-spine` clause 8 reds DROPPING the `^1.0.0` leg.
- **The BC INFORM names the row BOOKED (VERIFIED).** `docs/tranches/BC/inbound/KF-INBOUND.md:23` (INFORM-4) + `docs/tranches/BC/coordination/KF-BC.md:109-115` (INFORM-4) — "(b) the subpath split lets BC `import @mkbabb/value.js/color` over the 145 KB monolith. … **VERIFIED LIVE — the `/color` subpath does NOT exist in the consumed dist:** … `exports` keys = `.` ONLY (no `/color`). … **Disposition: BOOK, NOT a new wave.** … authoring a `BC.W-KF-VALUEJS-COLOR` wave against a non-existent subpath would be a contrivance against the apply-the-bar discipline (the trigger is UNMET). … the named promotion trigger: **value.js Tranche O publishes the `/color` subpath in its `0.14.x`+ dist**." (Note: the BC INFORM-4 enumerated 6 non-easing sites; the BD count is 7 distinct files because `useAccentTone.ts` is a separate file from `color/index.ts` — re-counted this read.)

**The trigger has NOT fired.** value.js exports only `.` at the BD authoring. The disposition is BOOKED-with-trigger, NOT a build.

## (3) The build — BOOKED, no build this tranche (the subpath-gate fence)

**This wave builds NOTHING until value.js publishes the `/color` subpath in its `0.14.x`+ dist.** Re-pointing 7 import sites onto a subpath that does not resolve would break the build — the contrivance the apply-the-bar discipline forbids. The wave's BD-authoring product is the re-stamped BOOKED disposition + the carried trigger; the actual re-point is the value.js-subpath-gated successor.

**IF the trigger fires (value.js publishes `/color` in its `0.14.x`+ dist):**

1. **Verify the subpath-presence first.** Re-check the consumed dist (`node -e "Object.keys(require('./node_modules/@mkbabb/value.js/package.json').exports)"` includes `./color`) so the re-point is against a REAL published subpath, not an assumed one. NO peer-spine widen — the peer (`^0.13.0 || ^1.0.0`) already admits the `0.14.x → 1.x` cut.
2. **Re-point the 7 sites monolith → `/color`.** Change each `from "@mkbabb/value.js"` to `from "@mkbabb/value.js/color"` at the 7 files — BUT ONLY for the symbols the `/color` subpath exports (the OKLCh/ramp/mix math). A site importing a NON-color symbol (e.g. `curves.ts`'s `ease*` easing family is a MOTION concern, not a color one) STAYS on the monolith for that symbol — the re-point is per-symbol-correct, not a blanket file swap. Verify each re-pointed symbol resolves from `/color` (the subpath surface, value.js O authority) — a mismatch is FLAGGED + booked to the consumer site, never silently reconciled (the mismatch-flagging discipline).
3. **Capture the budget shrink.** Re-run `profile:budget` + the critical-path walk — the color leaves (`/color`, `/border-progress`, the aurora color core) drop the monolith weight off their chunks. Record the gzip delta (the footprint-shrink is the whole point).
4. **Reconcile the relay row.** Flip the BD asks-and-consumes value.js-/color row from BOOKED → SATISFIED + the shipping value.js version; reconcile the BC INFORM-4 row in lockstep (the no-silent-drop law).

**Fences honored:** NO value.js tree edit (inv-26 — the subpath publish is value.js's own). NO peer-spine widen (the peer already admits `^1.0.0`; `proof:constellation-spine` clause 8 reds dropping it). `proof:single-color-core` holds (the color MATH source stays value.js — the re-point changes the IMPORT PATH, not the math home). The per-symbol-correct re-point (a non-color symbol stays on the monolith) preserves correctness.

## (4) The gate — born-RED → GREEN (the subpath-gate machine-lock)

**The BOOKED disposition is the standing fact; the gate fires only on the re-point.**

- **The BD no-silent-drop gate (`proof:bd-crossrepo-asks`) carries the row.** The relay must name the value.js-/color ask + its BOOKED disposition + its trigger (value.js publishes `/color` in `0.14.x`+) + the 7 consumer sites — a dropped row reds the completeness arm. Born-RED if the BD relay omits the row.
- **`proof:single-color-core` is the standing anti-fork floor (VERIFIED-class).** It asserts the color math has ONE source (value.js) — so a re-point that re-implements color math (rather than re-importing it from `/color`) reds it. The re-point MUST be a path swap, not a math fork.
- **IF the re-point lands (post-publish):** a new born-RED clause asserts (a) the consumed value.js dist exports `./color` (the subpath-presence floor — never against an assumed subpath), (b) the 7 sites import the color symbols from `/color` (per-symbol-correct — a non-color symbol may stay on the monolith), (c) the budget shrink is recorded — born-RED on the pre-re-point tree (all 7 on the monolith), GREEN at the re-point. **The self-test bite:** a synthetic re-point against the non-existent `/color` subpath (the trigger-unmet state) MUST red; a re-point that drops the `^1.0.0` peer leg MUST red (`proof:constellation-spine` clause 8).

## (5) Paint verification

**Device-free** — a payload/import-path footprint-shrink, not a visual change (BB inv-4 — a perf re-point changes ZERO paint where the color math is byte-identical). The artefact is the budget-shrink delta + the resolved `/color` import paths. NO `proof:ba-gestalt` (zero pixels change — the color math is byte-identical, only the import path moves). The binding device-free assertion: `profile:budget` GREEN at the new (smaller) per-chunk ceilings + the 7 sites resolve from `/color`.

## (6) Fences + risks

- **SUBPATH-GATE (the cardinal fence).** value.js exports only `.` at BD; re-pointing against a non-existent `/color` subpath breaks the build — the contrivance the bar forbids. STAYS BOOKED until the consumed dist carries `./color`.
- **FOREIGN-TREE FENCE (inv-26, absolute).** glass-ui edits ZERO value.js tree — the subpath publish is value.js's own; the by-name ask is the only channel. A re-point wave's File Bounds touch ZERO `../value.js` path.
- **NO peer-spine widen.** The peer (`^0.13.0 || ^1.0.0`) ALREADY admits the `0.14.x → 1.x` cut the subpath split rides; `proof:constellation-spine` clause 8 reds dropping the `^1.0.0` leg. The re-point does not move the peer.
- **PER-SYMBOL-CORRECT re-point.** A non-color symbol (the `curves.ts` `ease*` motion family) STAYS on the monolith — the re-point is per-symbol, not a blanket file swap. A wrong-subpath import (a motion symbol from `/color`) is FLAGGED + booked, never silently reconciled.
- **`proof:single-color-core` holds.** The color math source stays value.js — the re-point changes the import PATH, not the math home; no math fork.
- **No-silent-drop.** The BOOKED row carries forward on the BD relay with its trigger; never silently dropped or re-booked without a re-stamp.
