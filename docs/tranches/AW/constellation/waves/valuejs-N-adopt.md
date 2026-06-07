# N — value.js's glass-ui-adoption tranche (the flagship aurora+blob adoption)

> **HANDOFF ANNEX — authored in glass-ui's docs tree, applied by the value.js maintainer.**
> This is a glass-ui-authored draft of value.js's NEXT tranche (letter **N**; M is the live
> planning-only head — opened 2026-06-04, unratified). The value.js maintainer lifts this into
> `value.js/docs/tranches/N/` (clone the M.md/L.md shape), ratifies it like any value.js tranche,
> and applies every code change IN value.js's OWN repo on a clean checkout, gated on value.js's
> OWN green CI (`tsc` 0 · `eslint --max-warnings=0` 0 · `vitest` green · `playwright` = baseline,
> no drift past the known 12-pass/24-fail demo-fleet baseline). glass-ui owns ZERO bytes here.
> Every cited file:line is value.js HEAD `e8cc1fb` (branch `tranche-f-handoff`, value.js 0.11.0).
> Cross-tranche dependency: the glass-ui cuts named below (3.4.0 dock fix; the later aurora/blob
> cut) must publish first — N's cohort-gated waves sequence on them; N's unilateral waves do not.

## §0 — Why a new tranche

M is value.js's live head (planning-only, awaiting ratification — `M/M.md:6-7`; verified unexecuted:
`package.json:27` still carries `"development"`, the demo blob dirs still exist). N is warranted by a
named-forward demand M does not cover: the AW constellation audit (glass-ui `docs/tranches/AW/audit/
constellation/`) verified value.js as glass-ui's DEEPEST consumer (47 `@mkbabb/glass-ui*` import sites)
and the **flagship aurora+blob adoption target** under the UNION-COORDINATION contract. Five concrete
demands surfaced, three of them publish-gated on glass-ui's AW cuts. N is the adoption tranche.

## §1 — Thesis

value.js OWNS color (the Ottosson path: `parseCSSColor`, `colorUnit2`, `gamutMapOKLab`,
`interpolateHue`/`HueInterpolationMethod`, `mixColorsN` — `src/index.ts:119-167`). The glass-ui
substrates value.js's demo paints (aurora atmosphere, goo-blob hero) are color-DRIVEN surfaces — so
value.js is the canonical CONSUMER of glass-ui's derive-color + colorResolver-injection seams, and the
natural home for the DOM-free resolver glass-ui's `defaultBlobColorResolver` is itself built on. N
CONSUMES glass-ui's derive door; it never re-owns color math. It also clears a confirmed broken
binding (`useBreakpoint`, removed from glass-ui `/dom` in 3.3.0), the CSS-wiring lag, and the
demo's two heritage forks (goo-blob, watercolor-dot) the demo's OWN CLAUDE.md flags for extirpation.

## §2 — Recap-coverage (every demand → wave → disposition)

| # | Demand (audit-verified) | Wave | Kind | Disposition |
|---|---|---|---|---|
| 1 | Desktop top-dock hits the 3.3.0 simple-collapse regression (`Dock.vue:93`) | N.W1 | cohort | ADOPT — auto-fixes on glass-ui AW.W1 build (symlink) |
| 2 | `useBreakpoint` removed from glass-ui `/dom` in 3.3.0; 3 live sites | N.W2 | cohort/unilateral | RESOLVE — migrate local OR await glass-ui re-instate (§9 ask) |
| 3 | CSS-wiring: no `@source …/dist`; redundant `/styles.css` import | N.W3 | unilateral | FIX — version-independent, lands now |
| 4 | Blob fork → `@mkbabb/glass-ui/goo-blob` + value.js-native colorResolver | N.W4 | cohort | ADOPT — flagship resolver-injection showcase |
| 5 | Aurora derive-color: picker-tracked palette (`App.vue:210-211` deferred marker) | N.W5 | cohort | ADOPT — on AW.W5 derive door (later cut) |
| 6 | `AuroraPane.vue` live stub bound to retired schema | N.W6 | cohort | REBIND — on the AW.W4-8 aurora arc (later cut) |
| 7 | Watercolor-dot fork → `@mkbabb/glass-ui/watercolor-dot` | N.W4 | unilateral | ADOPT — subpath ships in 3.3.0 (no aurora/blob gate) |
| 8 | W9-W11 blob upgrades (lit droplet, soft-body pointer, mood/iridescence) | N.W7 | cohort | ADOPT — config-only, on the later blob cut |

NEGATIVE (do not over-build): `ConfigSliderPane`'s direct-mutation config model is FINE — do NOT
force `useConfiguratorState` per-preset cloning (only warranted if the panes grow named presets).
The OKLCh palette-generation logic (`useColorGeneration.ts` + `gamutMapSRGB`) correctly stays
value.js-owned — N's aurora derive CONSUMES glass-ui's door, it does not push harmony into value.js.

## §3 — Topology (the acyclic publish-spine)

value.js is the pure SINK (`M/M.md:138-154`): `glass-ui(lib)→value.js` (OKLab dedup) +
`keyframes(lib)→value.js` both point INTO it; the only `value.js→glass-ui` edge is demo-only
(unpublished) → no cycle. Binding order for N's cohort waves:

```
glass-ui AW.W1 (dock fix) ──cut 3.4.0──▶ value.js symlink rebuild auto-fixes N.W1
glass-ui AW.W5 (derive door) ─later cut─▶ N.W5 aurora-derive adoption
glass-ui AW.W4-8 (aurora arc) ─later cut─▶ N.W6 AuroraPane rebind
glass-ui AW.W9-11 (blob lit/mood) ─later─▶ N.W7 config-only opt-in
```

The colorResolver seam (AU.W7) already shipped in 3.3.0, so **N.W4's blob swap does NOT wait for
W9-11** — it lands on the dock-fixed 3.4.0 value.js bumps to anyway. N.W3 (CSS wiring) is
version-independent (lands on any installed pin). The demo MUST NOT bump to a published `^3.3.0` if
it mounts the collapse dock — its consume path is 3.4.0 (glass-ui AW.W1).

## §4 — Wave schedule

| Wave | Disposition | Kind | Lanes | Hard gate |
|---|---|---|---|---|
| **N.W0** | DEV/IMPL boundary — audit + ratify | — | A: confirm all 8 demands at value.js HEAD · B: ratify | `tsc` 0 + suites green baseline; no code |
| **N.W1** | Dock 3.4.0 dogfood | cohort | A: glass-ui `npm run build` after AW.W1 lands (value.js symlink picks it up — NO pin edit; file:../glass-ui) · B: verify `Dock.vue:93` desktop collapse↔expand width morph [inv-N-1] | playwright: desktop dock expands from collapsed (the `start-collapsed=isDesktop` path); no baseline drift |
| **N.W2** | `useBreakpoint` resolution | cohort∥unilateral | A: IF glass-ui re-instates `useBreakpoint` in `/dom` (the §9 ask) → bump only · B: ELSE migrate the 3 sites to a 5-line local `useMediaQuery` + update `demo/CLAUDE.md:150,208` [inv-N-2] | `tsc` 0 over the 3 files; the 3 `useBreakpoint(...)` calls resolve (no `undefined`) |
| **N.W3** | CSS-wiring conformance | unilateral | A: add explicit `@source` reaching the flat `dist/*.js` · B: delete the redundant `/styles.css` import + rewrite the stale header · C: de-stale `vite.config.ts` `development`-condition narrative [inv-N-3] | Tailwind build emits `text-destructive-foreground` (a glass-ui-only CVA class); exactly one `@import ".../styles"`, zero `/styles.css` |
| **N.W4** | Blob + watercolor extirpation | cohort | A: swap goo-blob fork → `/goo-blob`; re-point `index.ts` + `BlobPane.vue:7` · B: author value.js-native DOM-free colorResolver; inject at `HeroBlob.vue:5` · C: preserve `setMood`/`nudge` driver · D: swap watercolor fork → `/watercolor-dot`; re-point `Dock.vue:6` [inv-N-4][inv-N-5] | no `.vue`/shader/composable under `demo/@/components/custom/goo-blob/` (only a re-export `index.ts`); every `<GooBlob>` binds `:color-resolver`; the resolver module imports `@mkbabb/value.js`, NOT `document.createElement("canvas")` |
| **N.W5** | Aurora derive-color | cohort | A: replace `App.vue:212` static `structuredClone(DEFAULT_AURORA_CONFIG)` with a `computed`/`watch` off `cssColorOpaque` through glass-ui's AW.W5 derive door [inv-N-6] | the atmosphere palette tracks the live picker color; the derive CONSUMES value.js (NOT a re-impl) |
| **N.W6** | AuroraPane rebind | cohort | A: rebind `AuroraPane.vue` `:sections` against the live `AuroraConfig` axes (`warpAmount`/`softmaxBeta`/`nucleiDrift`/`breathDepth`/`saturation`/`medium`/`strokeMode`) on the AW.W4-8 cut [inv-N-7] | the pane renders a live slider table (not the empty "under rework" stub) |
| **N.W7** | W9-11 blob opt-in | cohort | A: opt into `lit` droplet/iridescence + wire the already-exposed `pointerAttraction`/`pointerStrength` sliders (`BlobPane.vue:73-75`) [inv-N-8] | config-only; the exposed pointer sliders produce felt deflection |

DEV/IMPL boundary is **N.W0→N.W1**. N.W3 is the only wave dispatchable with ZERO glass-ui dependency.

## §5 — Critical files + ownership (File-Bounds)

| Surface | Files (value.js HEAD `e8cc1fb`) | Wave |
|---|---|---|
| Desktop top-dock | `demo/@/components/custom/dock/Dock.vue:93` (`:start-collapsed="isDesktop"` + `#collapsed` `:197`) | N.W1 |
| Breakpoint binding | `ImagePaletteExtractor.vue:91,120` (`min-width:640px`); `palette-browser/composables/useHoverPopover.ts:3,11` (`hover:hover`); `.../useCardMenu.ts:3,7` (`hover:hover`) | N.W2 |
| CSS entry | `demo/@/styles/style.css:23-24` (redundant `/styles.css`), no `@source`; `vite.config.ts:30-37,60-104` (stale `development` narrative) | N.W3 |
| Blob fork | `demo/@/components/custom/goo-blob/**` (delete); `.../goo-blob/index.ts` (re-point); `HeroBlob.vue:5` (inject `:color-resolver`); `App.vue:109,218-219` (`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` import + provide stay); `BlobPane.vue:7`; new `demo/@/lib/blobColorResolver.ts` | N.W4 |
| Watercolor fork | `demo/@/components/custom/watercolor-dot/**` (delete); `Dock.vue:6` (re-point) | N.W4 |
| Aurora atmosphere | `demo/color-picker/App.vue:209-215` (the deferred-marker site; `cssColorOpaque` already provided `App.vue:140`) | N.W5 |
| Aurora pane | `demo/@/components/custom/panes/AuroraPane.vue:1-12` (stub header naming the retired schema) | N.W6 |
| Blob upgrades | `BlobPane.vue:73-75` (the `pointerAttraction`/`pointerStrength` sliders already authored) | N.W7 |

## §6 — Invariants

- **inv-N-1 — dock consume path is 3.4.0, never `^3.3.0`.** The desktop top-dock runs the simple
  two-layer collapse (`Dock.vue:93`, the 3.3.0 width-morph freeze). value.js is `file:../glass-ui` →
  a glass-ui `npm run build` after AW.W1 lands auto-fixes it (no pin edit). *Verified at close by* the
  N.W1 playwright check + `grep '"@mkbabb/glass-ui"' demo/package.json` showing `file:../glass-ui` (or
  `≥3.4.0` if ever registry-pinned), never `^3.3.0`.
- **inv-N-2 — `useBreakpoint` resolves.** No live import of a removed `/dom` symbol. *Verified by*
  `tsc` 0 over the 3 sites + a resolve probe; `grep useBreakpoint demo/@` returns 0 OR points at a
  local shim, never the dead glass-ui `/dom` import.
- **inv-N-3 — the content-scan reaches glass-ui's compiled templates.** Exactly one `@import
  "@mkbabb/glass-ui/styles"`, zero `@import ".../styles.css"`, one `@source` whose resolved target
  contains flat `dist/*.js` that grep-match `text-destructive-foreground`. *Verified by* a Tailwind
  build asserting the sentinel CVA class emits.
- **inv-N-4 — no local goo-blob fork.** `demo/@/components/custom/goo-blob/` carries no
  `.vue`/shader/composable — only a re-export `index.ts` → `@mkbabb/glass-ui/goo-blob`. *Verified by*
  `find demo/@/components/custom/goo-blob -name '*.vue' -o -name '*.glsl*' -o -path '*composables*'`
  = empty.
- **inv-N-5 — colorResolver is value.js-native + DOM-free.** Every `<GooBlob>` binds `:color-resolver`;
  the resolver module imports `@mkbabb/value.js`, NEVER `document.createElement("canvas")`. Feeds
  CONCRETE color strings (`cssColorOpaque`), never a raw `var(--token)` (the AW.W13 throw edge).
  *Verified by* `grep -L 'createElement."canvas"' demo/@/lib/blobColorResolver.ts` + the import grep.
- **inv-N-6 — aurora derive CONSUMES value.js, never re-owns.** The derived palette routes through
  glass-ui's AW.W5 door (which itself consumes value.js's `gamutMapOKLab`/`interpolateHue`); value.js
  does NOT re-implement gamut/harmony in the demo. *Verified by* reading `App.vue:209-215` — no inline
  OKLCh math, the derive is a glass-ui call.
- **inv-N-7 — AuroraPane binds the live schema.** No reference to the retired
  `useAuroraBlobs`/`AuroraBlobsConfig`. *Verified by* `grep -r 'AuroraBlobsConfig\|useAuroraBlobs'
  demo/@` = 0 + the pane renders a non-empty `:sections`.
- **inv-N-8 — blob upgrades are config-only.** N.W7 adds no local blob source; the `lit`/pointer
  axes ride the shipped `/goo-blob` config. *Verified by* inv-N-4 still holding after N.W7.

## §7 — Befitting-keep (heritage divergences that are NOT gaps)

- value.js's `useColorGeneration.ts` OKLCh harmonies + `gamutMapSRGB` STAY value.js-owned (the
  union-coordination contract — value.js owns color science). glass-ui's AW.W5 derive CONSUMES this;
  it never absorbs it.
- The `ConfigSliderPane` direct-mutation config model STAYS — `useConfiguratorState` per-preset
  cloning is only warranted if the panes grow named presets (not forced).
- The mix/gradient/swatch surfaces that render the local watercolor-dot at swatch scale
  (`MixResultDisplay.vue`, `SpectrumCanvas.vue`, …) re-point with the N.W4 watercolor swap; no
  schema reconciliation (the local `BlobConfig`/dot field sets are byte-identical to glass-ui's).

## §8 — Cohort coordination (→ `coordination/glass-ui.md`)

N is a cohort tranche — it sequences on glass-ui's AW cuts. The glass-ui-side asks N hands BACK
(authored as named-forward amendments to glass-ui's AW plan, applied in glass-ui's repo, not value.js's):

1. **`useBreakpoint` disposition (BLOCKS N.W2's lowest-churn path).** glass-ui removed it from
   `/dom` at AV `cbbaeb0` ("orphan" call) but value.js is a live ≥1 consumer (3 sites). Ask glass-ui
   to either re-instate it in `src/composables/dom/` (un-orphan; cross-check fourier/words) for a
   3.4.0 ship, OR confirm the retirement so N.W2 migrates locally. Lowest consumer churn = re-instate.
2. **AW.W5.1 `huePath` atom should import value.js's `HueInterpolationMethod`/`interpolateHue`
   (NOT a new glass-ui union).** value.js ALREADY ships `HueInterpolationMethod = "shorter"|"longer"|
   "increasing"|"decreasing"` + `interpolateHue` (`value.js/src/units/color/dispatch.ts:219,234`).
   A parallel glass-ui union duplicates a peer-owned type. This is a glass-ui-side AW.W5 amendment N
   names forward — value.js ships NOTHING new for it (the symbols already exist at HEAD).
3. **glass-ui's value.js peer pin is STALE.** `glass-ui/package.json:616,647` pins `^0.10.0`, which
   excludes value.js's 0.11.0 (the `interpolateHue`/`mixColorsN` AW.W5 needs). Ask glass-ui to widen
   to `^0.10.0 || ^0.11.0` (or `^0.11.0`) in its 3.4.0 cut, and re-pin its dev node_modules from
   registry-0.10.0 → 0.11.0. value.js's action: confirm those symbols are in the tagged 0.11.0 (they
   are, at HEAD `e8cc1fb`).
4. **value.js is the named AW.W10/W11 blob mood/interaction proof-of-life.** `HeroBlob.vue` already
   drives `setMood`/`nudge` and exposes `pointerAttraction` sliders — glass-ui's AW.W10 "demo
   exercises every mood OR excise" gate should target the value.js HeroBlob driver, not glass-ui's
   own empty story. Coordinate the wire-or-cut decision against value.js's live consumer.

Publish-spine reminder: value.js publishes FIRST when it cuts color; glass-ui cuts against it; the
demo consumes the new glass-ui. For N, the cohort waves sequence on glass-ui's already-planned AW
cuts (dock 3.4.0; the later aurora/blob cut) — no value.js color cut is on N's critical path.

## §9 — Successor + deferrals

- **N.W5/W6/W7 are deferred to the later glass-ui aurora/blob cut** (3.5.0+) — they do NOT block
  N's close. N may close with W0-W4 (dock + breakpoint + wiring + blob/watercolor swap) GREEN and
  W5-W7 booked as a cohort carry-forward, OR hold open until the aurora/blob cut publishes. The
  maintainer chooses at ratification.
- The dirty `docs/precepts` submodule is a known chronic (`M/M.md:173`) — N does NOT commit it
  (read-only-git; the orchestrator owns the index).
- No `proof:*.mjs` script — the proof-idiom is retired (`L/L.md:114`, `M/M.md:220`). Every N gate
  is STRUCTURAL (`tsc`/`eslint`/`vitest`/`playwright` + a close-time human grep).

## §10 — Mode + authority

N is value.js's eleventh-or-later tranche, authored as a glass-ui handoff annex and ratified by the
value.js maintainer. It binds value.js/** ONLY. The glass-ui-side asks in §8 are named-forward
amendments the glass-ui session applies in glass-ui's repo. N dispatches on the maintainer's
ratification; its cohort waves additionally gate on the glass-ui cuts named in §3.

**Invalid hard gates (rejected):** any committed `proof:*.mjs` script (retired); any gate that
asserts on glass-ui's internals (N tests value.js's CONSUMPTION, not glass-ui's implementation); any
gate that re-owns color math in the demo (inv-N-6 forbids it).

**Close gate (all green):** `tsc` 0 · `eslint --max-warnings=0` 0 · `vitest` green · `playwright` =
baseline (no drift past 12-pass/24-fail) · inv-N-1..N-8 verified by their close-greps. N is CLOSED.
