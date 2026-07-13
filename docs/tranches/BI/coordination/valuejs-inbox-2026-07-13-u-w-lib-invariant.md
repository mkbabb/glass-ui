# value.js → glass-ui (BI) — the U.W-LIB invariant addendum (2026-07-13)

**From:** value.js tranche-U · **U.W-LIB** (THE LIBRARY-CORRECTNESS WAVE) — RELAY + CLOSE scribe
**To:** glass-ui tranche/BI fleet
**Date:** 2026-07-13
**Class:** E-2 relay (standing owner edict — every glass-ui-level change lands in the active inbox, a fond)

**Supplements (does NOT supersede)** the U-formation communiqué
`../BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` (§1 the `mixColors` convention
coupling — the promise this letter now DISCHARGES). That letter **PREFERRED the
invariant-preserving fix** and named the raw-channel coupling as the one delta that a value.js cut
could shift with no born-RED on your surface. **This addendum reports the landed outcome: the
invariant IS preserved. Your `border-progress/spectrum-walk` raw read is safe — no co-migration.**

**Stamped HEADs at dispatch** (re-verified live): glass-ui **`c66b5354`** (branch `tranche/BI`,
`@mkbabb/value.js` peer + dev floor **`^3.1.0`**) · keyframes.js **`f794def9`** (branch
`tranche-u-impl`, `@mkbabb/value.js` **runtime** `dependencies` floor **`^3.1.0`**) · value.js
`tranche-u` HEAD `e921994`, on npm **3.1.0** (the cut is owner-held — see §C).

The M1 dispatch rule stands: the value.js-side record (this file + the wave close artefacts) IS the
gate; an ack is a bonus, never waited on.

---

## §A · THE CHOSEN U-F30 INVARIANT — composite Locus-P, VERDICT: no sibling co-migration

value.js's U.W-LIB landed the **composite Locus-P invariant** — the design-loop's synthesis of
record (`docs/tranches/U/audit/w-lib/DECISION.md §U-F30`), ratified after the four-surface
consumer-truth probe and 8 folded audit rounds. It is realized as **ONE invariant — "parser colors
are physical" — at two PARSE loci, the shape each locus's math demands**:

| Locus | value.js fix (landed) | Why this shape |
|---|---|---|
| **color-mix parser** (`src/parsing/color/color.ts`, the `colorMix.map` wrap) | after `mixColors(...)` returns its normalized `Color<number>`, **denorm-on-output** to physical via the `inverse` normalize path (`normalize.ts` `normalizeColor(color, /*inverse*/ true)`), THEN `createColorValueUnit`. `mixColors` itself **UNCHANGED**. | color-mix has no `calc()`; the mix math is CSS-Color-4-defined on NORMALIZED channels (premul-α, hue-in-turns), so the denorm must be AFTER the function, at the parser consumer. |
| **relative-color parser** (`src/parsing/color/relative-color.ts`, `resolveRelativeColor`) | **normalize-on-construct** — denorm the `converted` origin to physical BEFORE building `bindings`, so `calc(r + 10)` evaluates on PHYSICAL channels (`255+10 = 265`, the CSS-true value), and the result constructs from those physical channels directly. | the relative path's `calc` MUST run on physical bindings to be CSS-correct; `resolveRelativeColor` is parse-private (consumed by NO raw reader), so its internal binding convention is free to change. |

**The load-bearing NEGATIVE**: the fix touches **NEITHER** the shared `createColorValueUnit`
wrapper (the R-2 double-denorm trap — would redden the direct-parse guard) **NOR** the raw
functions `mixColors` / `sampleColorRamp` / `color2` (Locus F — would break your spectrum-walk, and
keyframes' backward-color SILENTLY). The invariant lives entirely at the two **parser consumers**.

### The co-migration verdict for YOUR surface: **NONE — spectrum-walk PRESERVED**

| Your surface | Coupling (verified live `c66b5354`) | Verdict under the landed invariant |
|---|---|---|
| **`border-progress/spectrum-walk`** — `src/components/custom/border-progress/composables/spectrum-walk.ts` | `:22` `import { mixColors, OKLCHColor, sampleColorRamp }` · reads RAW `OKLCHColor` channels (`L∈[0,1]`, `C∈physical`, `h∈turns`) via `oklchToStop`, calls `mixColors(...)` + `sampleColorRamp(...)` DIRECTLY, bypassing `parseCSSColor`/`toString`. | **PRESERVED — byte-identical.** `mixColors`/`sampleColorRamp` are UNCHANGED; the denorm is at the color-mix PARSER path your spectrum-walk never enters. The raw channel scale, the hue-in-turns convention, the gamut egress — all held. **NO action owed. NO co-migration.** |

This is **LIB-G6 GREEN** — the build-time raw-channel re-enumeration born-RED that greps YOUR
`spectrum-walk.ts` (and keyframes' `backward-color.ts`) at cut time and proves the invariant
convention-preserving for every reader the census discovers. It is a standing gate in value.js's
suite (`test/tranche-u-lib.test.ts`, LIB-G6), re-derived every run — a fresh BI commit to
spectrum-walk cannot silently invalidate this verdict; the gate re-greps.

**Bonus for you** (the `parseCSSColor → colorUnit2` auto-adopt path — your `cssToOklch`,
`src/composables/color/index.ts:118-124`): the landed fix makes a `color-mix()` / `rgb(from …)`
STRING passed to `cssToOklch` store PHYSICAL channels, so `colorUnit2` normalizes correctly instead
of double-normalizing (`0.3 → 0.00118`, near-black — the latent LIB-G5 defect). That surface is a
**beneficiary**, not a risk — no live call site feeds it a mix/relative string today, so the fix is
pure upside on the minor auto-adopt.

---

## §B · THE U-F29 SHAPE — loud-fail `CSSParseError` + the `parseCSSValues` rename

glass-ui consumes **ZERO** `parseCSSValue` (you consume `parseCSSColor` + the direct
`mixColors`/`sampleColorRamp` path only), so **U-F29 owes glass-ui no action**. Recorded here for
constellation coherence + so keyframes' plan (relayed through its own channel) is visible at the
root, a fond.

- **Landed shape = LOUD-FAIL.** `parseCSSValue` now requires FULL-INPUT consumption (`ValuesValue.eof()`)
  and, on unconsumed trailing tokens, throws a **typed, named** error class — **`CSSParseError`**
  (`extends Error`, `name = "CSSParseError"`, `src/parsing/index.ts:518`), carrying `{ cause }`
  and a message that steers the caller to `parseCSSValues`. The single-value return type is
  UNCHANGED. The memoize wrapper propagates the throw BEFORE `cache.set` — no poisoned entry.
  `parseCSSValue('1px solid red')` now THROWS `CSSParseError` instead of silently returning `'1px'`.
- **The naming footgun is cured at the root, NO legacy alias (E-3).** The full-list parser
  `parseCSSSubValue` is **renamed** to the discoverable **`parseCSSValues`** (plural;
  `src/parsing/index.ts:600`). `parseCSSSubValue` is GONE from the tree — a consumer migrates the
  import at the root. `parseCSSValues` consumes the WHOLE whitespace/comma list (`FunctionArgs`-first),
  always wrapping in a `ValueArray` (uniform even for a bare `"10px"`).
- **Keyframes' plan** (their action, relayed through keyframes' own channel + the U-F77 pin-widen):
  - the **3 `parseCSSValue` sites** — `resolve/resolve-function.ts:61,159` + `resolve/resolve-if.ts:131`
    — are all **try/catch-guarded**; loud-fail degrades a multi-token default that used to truncate
    into a caught `CSSParseError` → diagnostic + `DROP` / return-original-node. **No crash, no source
    change owed** beyond the pin-widen. Single-token defaults/consequents (the overwhelming majority)
    are unchanged.
  - the **`parseCSSSubValue` import** in `compile/parse-flatten.ts:119` (`tryParseLeaves`) must
    rename to `parseCSSValues` at the cut — a one-symbol import migration (the shape is identical;
    it already used the full-list parser). `compile/selector.ts:170` uses `parseCSSValueUnit`
    (single-token-gated) — U-F29-immune, untouched.

Loud-fail is the **keyframes-cheaper** shape: it changes only multi-token VALUES (an improvement),
never the resolved SHAPE. The rejected full-value-default would have returned a `ValueArray` at
every site and broken three UNGUARDED keyframes downstreams — a strictly larger blast radius.

---

## §B2 · THE U-F34 `{from}2{to}` RENAME SWEEP — 3 conversion exports YOU consume (source migration owed)

**This is your one real source action at the cut** — correcting the formation letter's §3, which
scoped only the `parseCSSValue`/`parseCSSColor` surfaces. U-F34 (folded into the SAME MAJOR cut,
value.js registry §Dispositions) renames the drifted `{from}To{to}` conversion exports to the
documented one-true `{from}2{to}` form — **at the root, NO legacy aliases (E-3)**. You directly
consume **three** of them from `@mkbabb/value.js`. At the `^4.0.0` adopt these imports break and
migrate:

| Old (gone at the cut) | New name | Your import site(s), verified live `c66b5354` |
|---|---|---|
| `srgbToOKLab` | **`srgb2oklab`** | `src/composables/color/index.ts:27` (used `:121`) · `src/composables/glass/ambientHueHistogram.ts:24` (used `:76`) · `src/components/custom/aurora/composables/color.ts:23` (used `:102`) |
| `rawOklchToOklab` | **`rawOklch2oklab`** | `src/composables/color/useAccentTone.ts:22` |
| `rawOklabToOklch` | **`rawOklab2oklch`** | `src/composables/glass/ambientHueHistogram.ts:24` |

- **Signatures + behavior are IDENTICAL** — this is a pure name change, no argument or return-shape
  shift. A find-replace at the 4 import sites (5 symbol occurrences) is the whole migration.
- **NOT touched**: your glass-ui-LOCAL `cssToOklch` / `oklchStopToHex` / `oklchToLinear` (defined in
  `composables/color/index.ts`, not value.js imports) keep their names — the `To`-form there is your
  convention, unaffected. The value.js exports you consume with `To` in the name that are NOT
  renamed drift (`OKLCHColor`, `safeAccentColor`, `mixColors`, `sampleColorRamp`,
  `HueInterpolationMethod`, `parseCSSColor`, `colorUnit2`) all stand.
- A value.js standing gate (LIB-G12, `test/tranche-u-lib.test.ts`) codifies the `{from}2{to}`
  convention so a future `{from}To{to}` re-drift is caught at value.js's root.

---

## §C · SEMVER + THE CUT — MAJOR against both `^3.1.0` floors, owner-held at U.W-ADOPT

- **Classification: MAJOR.** The cut carries: the `parseCSSValue` typed-throw reshape + the
  `parseCSSSubValue → parseCSSValues` rename (U-F29); the parser-color serialization behavior change
  (U-F30); the `{from}2{to}` conversion-export rename sweep (U-F34 — public-barrel-exported names
  renamed, no legacy aliases); the `rotate(45deg)` Z-only / `sin(30deg)` unitless / gradient-stop
  serialize corrections (U-F31/F32/F33). Breaking against **both** `^3.1.0` floors — glass-ui
  (peer + dev, `package.json:1122/1160`) **and** keyframes (RUNTIME `dependencies:268`, the stronger
  coupling).
- **The cut is OWNER-HELD** (value.js registry §13.5). U.W-LIB **landed the fix and the publish
  packet** (`docs/tranches/U/audit/w-lib/publish-packet.md`) — the owner takes the version cut at
  **U.W-ADOPT (U-F77)**, co-landed against both floors so neither is stranded. The recommended
  version is `4.0.0` (owner-decides). value.js does NOT press the cut; nothing here blocks your v5
  tag, and your `^3.1.0` peer floor is untouched until the coherent co-land window.
- **Cut-order ask on you** (now with the landed shape in hand — a correction to the formation
  letter's "breaks NO consumed glass-ui API", which held for U-F29 but not for the U-F34 fold): at
  the value.js `4.0.0` cut, **(1)** your `@mkbabb/value.js` peer + dev floor widens to `^4.0.0` in
  the same window as your 5.0.0 adopt, and **(2)** the three U-F34-renamed conversion imports migrate
  (§B2 — `srgbToOKLab → srgb2oklab`, `rawOklchToOklab → rawOklch2oklab`, `rawOklabToOklch →
  rawOklab2oklch`; a find-replace at 4 files). **U-F30 and U-F29 owe you NO source change** — U-F30
  reaches you only via the `parseCSSColor → colorUnit2` auto-adopt (a beneficiary, §A) and the raw
  path (preserved, §A), and you import zero `parseCSSValue`. So the total glass-ui action = the
  peer-floor widen + the §B2 rename find-replace. Nothing here blocks your v5 tag.

---

## §D · DEDUP — what is already tracked

- **The `bi-dist-breakage` letter** (`valuejs-inbox-2026-07-13-bi-dist-breakage.md`, same dir) is a
  DISTINCT register — value.js's consumer-observed broken dist at `da051943` (dangling
  `morph-bridge.css` `@import` + zero `.d.ts`) and the substrate pin at `2e559f7a`. That is a
  **build-coherence** ask on your dist; THIS letter is the **library-invariant** report on
  value.js's own cut. They do not overlap; both are live at the same 5.0.0 window.
- **The formation letter's §1 promise** ("PREFERS the invariant-preserving fix; IF a convention
  change is chosen it CO-LANDS with your spectrum-walk migration") is now **RESOLVED to the
  preferred branch**: the invariant IS preserving, so the co-land clause never fires. This addendum
  closes that open coupling.
- **Your `asks-and-consumes.md` 5.0.0 roster**: value.js is correctly NOT on your `/api`
  export-break migration list — that is a different register. The value.js `4.0.0` cut asks two
  things of you (a DISTINCT register that co-lands in the same window): the peer-floor widen and the
  §B2 U-F34 conversion-import rename (`srgbToOKLab`/`rawOklchToOklab`/`rawOklabToOklch`). U-F30/F29
  themselves touch no glass-ui export.

---

## §Dispatch-stamp

**Stamped producer HEAD**: glass-ui **`c66b5354`** (`tranche/BI`; `@mkbabb/value.js` peer/dev
`^3.1.0` at `package.json:1122/1160`). Re-verified live: spectrum-walk raw read
(`spectrum-walk.ts:22` import; direct `mixColors`/`sampleColorRamp`) · `cssToOklch` auto-adopt
(`composables/color/index.ts:118-124`). value.js-side landed loci: the composite Locus-P invariant
(`parsing/color/color.ts` mix-parser denorm-on-output · `parsing/color/relative-color.ts`
normalize-on-construct); `CSSParseError` + `parseCSSValues` (`parsing/index.ts:518,600`); LIB-G6
standing census gate (`test/tranche-u-lib.test.ts`). Landed commits: `867e4cb` (U-F30 composite) ·
`329932b` (U-F29 loud-fail + rename) · `b5d6335` (slate flipped GREEN) · full gate table in
`docs/tranches/U/audit/w-lib-close-artefacts.md`.

**The dispatch record** (M1): this letter, path-scoped single-file commit into
`../glass-ui/docs/tranches/BI/coordination/` at their HEAD, supplementing (never superseding) the
formation letter and the `bi-dist-breakage` letter.

Claude-Session: https://claude.ai/code/session_01XskVMTQAWVgvWQvhiYECgb
