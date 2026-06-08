# AX.W24 — Deck-progress LIBRARY-side: export the `/deck-progress` subpath + fix the rail recipe

**Band** I · DECK · **Severity** major · **dependsOn** AX.W00 · **Charter** AX.md §3 (the `### AX.W24`
block, lines 1258-1292) + the §1 summary row (line 132) + §2 band-I line (line 186) + §2b band-I precept
row (line 221) + §4 note 6 (there is NO `/deck` family to build — §10 is narrower than its phrasing, lines
2020-2023) + §4 note 18 (the slides `.deck-progress` → `<DeckProgress>` replacement is W32 NOT W24, lines
2133-2139) + §4 note 12 (publish-currency, not code, gates the consumer leg, lines 2057-2067) · **Audit**
`deep-audit-corpus.json` slice `slides-primitive-deck` (index 22, findings F0=de-dock-placement-met-but-
unadopted / F1=cascade-layer-inversion / F2=glow-clip-mismatch / F3=proof-not-registered / F4=/deck-family-
scope, + the SLICE VERDICT) + `constellation-analysis-corpus.json` `result[30]`
(`harden:storybook-primitives-sliders` — the W24/W32 double-assignment correction + the "make W24
library-side only" action + the π-lane computed-style-readback consumer naming) + `result[13]`
(`idiom:slides` — the version-pin staleness precondition: `useCountup`/`DeckProgress` require the AX bump
FIRST).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED at HEAD `eaba94f` on four falsifiable witnesses, each re-proven LIVE against HEAD (the
§0 cardinal "re-verify before acting" — not trusted from the audit):

- **RED witness 1 (no `/deck-progress` subpath — slides literally cannot import `DeckProgress` on the
  minimal-payload path).** `DeckProgress` ships ONLY via the root barrel (`src/index.ts:133` `export * from
  "./components/custom/deck-progress"`) + the `DeckProgressProps` type on `src/api/index.ts:157-158`. There
  is NO `src/subpaths/deck-progress.ts` (verified: `ls src/subpaths/deck-progress.ts` → "No such file"),
  and ZERO `deck-progress` references in `package.json` (verified: `grep -c deck-progress package.json` →
  0 — no `./deck-progress` `exports` block, no `typesVersions['*']['deck-progress']`). The falsifiable RED:
  *`node -e 'import("@mkbabb/glass-ui/deck-progress")'` FAILS to resolve (no `dist/deck-progress.js` chunk,
  no `exports` entry); a consumer that imports `DeckProgress` must drag the entire root barrel (RED). After:
  `src/subpaths/deck-progress.ts` mirror exists, the `./deck-progress` contract-v2 `exports` block +
  `typesVersions` entry resolve, `dist/deck-progress.js` + `dist/deck-progress.d.ts` emit, the subpath
  import resolves on the minimal path (GREEN).*

- **RED witness 2 (the `--progress-rail-fill` / `--progress-rail-track` token-override contract is a SILENT
  NO-OP — the cascade-layer inversion).** `.glass-progress-rail` is authored in `@layer components`
  (`src/styles/glass.css:31` `@layer components {` encloses the recipe at `:577-592`). Its
  `background: var(--progress-rail-fill, var(--primary))` on the indicator and `background:
  var(--progress-rail-track, …)` on the track are OUTRANKED by the `bg-primary` / `bg-secondary` Tailwind
  utilities `ProgressDefault.vue:26,32` bakes inline — those utilities live in `@layer utilities`, which
  ALWAYS outranks `@layer components` regardless of source order. The recipe ADVERTISES "a consumer
  overrides `:root { --progress-rail-fill }` to retint with zero library edit" (`glass.css:573-574`
  comment), which is FALSE for the two color axes. The falsifiable RED: *render `<DeckProgress :value=50>`
  under `:root { --progress-rail-fill: hsl(120 80% 40%) }` (a distinct hue) and read the indicator's
  computed `background-color` — it paints `--primary` (the `bg-primary` utility), NOT the override (RED).
  After: the override hue WINS (GREEN).*

- **RED witness 3 (the leading-edge glow is CLIPPED away — the overflow mismatch).** The glow is a
  rightward `box-shadow: var(--progress-rail-glow-x,4px) 0 var(--progress-rail-glow-blur,8px) …` on
  `.glass-progress-rail > *` (`glass.css:586-591`). The indicator is `w-full` translated by
  `translateX(-X%)` inside an `overflow-hidden` root (`ProgressDefault.vue:26,32-33`); the `4px 0 8px`
  shadow extends RIGHTWARD into the hidden-overflow region and is CLIPPED. The advertised "leading-edge
  glow on the fill's trailing edge" is largely or entirely invisible. The falsifiable RED: *the painted
  indicator carries NO visible glow past the fill boundary at any `:value` (RED — the rightward shadow is
  eaten by the parent clip). After: the glow renders as a trailing INSET edge inside the clip (GREEN).*

- **RED witness 4 (`proof:deck-progress-rail` is NOT REGISTERED + is a string-scan, never a render).** The
  gate SCRIPT exists (`scripts/proof-deck-progress-rail.mjs`) and PASSES when invoked directly, but `npm
  run proof:deck-progress-rail` does NOT resolve (verified: `grep -c '"proof:deck-progress-rail"'
  package.json` → 0 — the scripts entry was dropped in the AW batch-1 reconcile; the AW.W16 File-Bounds
  required it). Worse, the script only STRING-ASSERTS that the recipe READS `--progress-rail-*` tokens +
  that `DeckProgress.vue` composes `<Progress>` — it never RENDERS, so it is GREEN while witnesses 2 and 3
  paint broken (the exact headless-green/visually-broken gap). The falsifiable RED: *`npm run
  proof:deck-progress-rail` exits non-zero "script not found" (RED — unregistered); and even when invoked
  directly it asserts a string the contract VIOLATES at paint time (a render gate would RED on the
  cascade/clip defects). After: the `proof:deck-progress-rail` scripts entry is registered + GATES-array
  tagged, and the gate is UPGRADED from string-scan to a render assertion that REDS on the cascade
  inversion + the clipped glow until they are fixed (GREEN only when the rail actually paints the look).*

The wave is RED at HEAD on all four; the HardGate drives each to GREEN. **Out-of-scope at HEAD by design
(NOT a RED witness):** the slides `.deck-progress` `<div>`+`::after` replacement, the `--progress-rail-*`
token override IN slides, and the consumer-#2 clearance of the binary invariant — those are W32's
(§4 note 18). The de-dock PAGE-BOTTOM placement (§10.1) is ALREADY MET in slides today (DeckView.vue
`position:fixed; bottom: env(safe-area-inset-bottom); z-index:40` below the dock) via the hand-rolled bar
— W24 does NOT touch slides; it makes the library rail ADOPTABLE so W32 can converge onto it.

---

## Goal

glass-ui ships a minimal-payload `@mkbabb/glass-ui/deck-progress` subpath AND a `.glass-progress-rail`
recipe that actually PAINTS the advertised look — the `--progress-rail-fill`/`--progress-rail-track`
token-override wins the cascade and the leading-edge glow renders inside the clip — verified by a registered
`proof:deck-progress-rail` gate UPGRADED from string-scan to a live render assertion, so the slides
consumer-port (W32) lands against a correct, importable rail with zero further library edit.

---

## Scope (the gestalt fix — no workaround, no legacy, LIBRARY-SIDE ONLY)

§4 note 6 is binding: there is NO `/deck` family to build (the slides deck engine —
`useDeck`/`useDeckNav`/`DeckPager`/`deckSpring`/`reveal`/`pagerWindow` — is correctly slides-local
single-consumer logic; lifting it would manufacture substrate-without-consumer, the precise anti-pattern
the binary invariant forbids; the `/deck` name stays RESERVED/unused). §4 note 18 is binding: W24 is
LIBRARY-SIDE ONLY; the slides `.deck-progress` replacement + the `--progress-rail-*` override + the
consumer-#2 clearance ALL ride W32. The ONLY library surface in scope is the bottom-bar rail LOOK + its
publication path. Four folds:

**(1) Add the `/deck-progress` flat subpath (F0 enablement).** Create the TRIVIAL one-line mirror
`src/subpaths/deck-progress.ts` (`export * from "../components/custom/deck-progress";` — the AV.W5.A batch
pattern; the `vite.library.ts` `src/subpaths/*.ts` glob auto-resolves the `dist/deck-progress.js` chunk,
no manual chunk edit). Add the contract-v2 `./deck-progress` `exports` block (`{ "types":
"./dist/deck-progress.d.ts", "import": "./dist/deck-progress.js" }`) + the
`typesVersions['*']['deck-progress']` entry (`["dist/deck-progress.d.ts"]`) to `package.json`, mirroring
the `./metric-cell` / `./status-dot` neighbours. The `flatten-subpath-types.mjs` step keeps
`dist/deck-progress.d.ts` flat (zero surface delta beyond the new chunk). `DeckProgress` STAYS on the root
barrel too (it is a cherry-picked custom composite, vueuse-free — like `scrolling-text`); the subpath is
the ADDITIVE minimal-payload path, not a demotion (no `src/index.ts` edit). This is the
substrate-with-consumer enablement: slides CANNOT be consumer #2 on the minimal path until the subpath
exists (the W32 port resolves `@mkbabb/glass-ui/deck-progress`).

**(2) Fix the cascade-layer inversion (F1) — the token-read root-cause, not a layer-juggle workaround.**
The recipe restyles the WRONG surface: it tries to override a color the inner `ProgressDefault` hardcodes
as a `bg-primary`/`bg-secondary` UTILITY, which by construction cannot lose to a component-layer rule. The
GESTALT fix (audit F1 gestaltFix option (b), the cleaner token-first path): make `ProgressDefault.vue` read
its fill/track from `--progress-fill` / `--progress-track` tokens — exactly as the `gradient` variant
ALREADY does (`Progress.vue:32-33` documents "gradient = rail respects `--progress-track`; indicator
respects `--progress-fill`"; the `default` variant is the ONLY one not token-retintable). Replace
`ProgressDefault.vue:26` `bg-secondary` → a `background: var(--progress-track, <neutral>)` and `:32`
`bg-primary` → `background: var(--progress-fill, var(--primary))` (or the idiomatic Tailwind arbitrary the
gradient variant uses), so the `default` variant is token-retintable AT THE SOURCE. Then
`.glass-progress-rail` sets those tokens (`--progress-fill: var(--progress-rail-fill, var(--primary))` +
`--progress-track: …`) + the geometry — no longer fighting a utility from a losing layer. This also closes
the latent "the default Progress variant is the only one not token-retintable" defect. (Rejected
alternative: re-authoring `.glass-progress-rail` in `@layer utilities` — it papers the symptom by
out-ranking `bg-primary` on source order but leaves the `default` variant un-retintable for every OTHER
consumer; the token-read fix is the one-path root-cause.)

**(3) Fix the leading-edge glow clip mismatch (F2) — a trailing INSET edge inside the clip.** A
leading-edge GLOW is fundamentally an OUTSIDE-the-fill effect; the `ProgressDefault` `overflow-hidden` clip
is LOAD-BEARING (it keeps the `w-full translateX` indicator from spilling). Stop fighting the clip:
re-author the glow on `.glass-progress-rail > *` as a TRAILING (right/leading-edge) INSET effect that lives
INSIDE the clip — an `inset` box-shadow or a `linear-gradient` brightening on the indicator's right portion
that reads as a moving position head WITHOUT extending past the fill boundary (exactly what the slides
hand-rolled bar does — a tight edge glow that survives its own `overflow:hidden`, `DeckView.vue:256-260`).
Re-token the glow axes (`--progress-rail-glow-*`) to the inset form. The recipe never lifts
`overflow-hidden` (that would re-break the default progress look for every other consumer).

**(4) Register + upgrade the `proof:deck-progress-rail` gate (F3) — string-scan → render assertion.** Add
the `"proof:deck-progress-rail": "node scripts/proof-deck-progress-rail.mjs"` entry to `package.json`
`scripts` + register the gate in the `scripts/gates.mjs` `GATES` array (id/cmd/tags — `["local","ci"]`).
UPGRADE the script from a string-scan to a real RENDER assertion (per W00's π-lane computed-style readback
capability — the harden critique names DeckProgress as a π-lane consumer alongside the font/carousel/card
gates): mount `<DeckProgress :value=50>` under a `:root { --progress-rail-fill: <distinct hue> }` override
and assert (a) the painted indicator `background-color` IS the override hue (witness 2 — the cascade fix),
(b) a visible glow renders inside the fill boundary (witness 3 — the inset glow), (c) the rail height reads
as the hairline `--progress-rail-h`. Keep the existing reserved-guard clauses (no `src/subpaths/deck.ts`,
no `./deck` exports, no `deckProgress()` math leaf — `/deck` stays reserved). The render half lands in the
W00 π-workspace (the DOM-cascade computed-style readback, NOT GPU readPixels); the registration + the
reserved-guard string clauses stay in-repo.

**Ratify-before-impl** (recorded below, §Open questions): (a) the cascade fix CHANNEL — token-read at
`ProgressDefault` source (recommended, fixes the latent default-variant gap) vs `@layer utilities`
re-author (papers the symptom). (b) the glow form — inset box-shadow vs right-edge `linear-gradient`
brightening. Both are scoped here so W32 lands against a settled recipe.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/subpaths/deck-progress.ts` | **CREATE** — `export * from "../components/custom/deck-progress";` (the trivial mirror; the `vite.library.ts` glob auto-resolves the chunk). |
| `package.json` | MODIFY — add the `./deck-progress` `exports` block (contract-v2 `{types,import}`) + the `typesVersions['*']['deck-progress']` entry + the `"proof:deck-progress-rail"` `scripts` entry. NO other export touched. |
| `src/styles/glass.css` | MODIFY — the `.glass-progress-rail` recipe (`:577-592`): set `--progress-fill`/`--progress-track` from `--progress-rail-*` (the cascade fix consumes ProgressDefault's new token-read) + re-author the glow (`:586-591`) as a trailing INSET edge inside the clip + correct the advertised-contract comment (`:573-574`). |
| `src/components/ui/progress/ProgressDefault.vue` | MODIFY — `:26` `bg-secondary` → token-read `--progress-track` (neutral fallback); `:32` `bg-primary` → `--progress-fill` (`var(--primary)` fallback). The `default` variant becomes token-retintable at source (parity with the `gradient` variant). NO change to `translateX`/`overflow-hidden` (load-bearing). |
| `scripts/proof-deck-progress-rail.mjs` | MODIFY — upgrade from string-scan to a render assertion (the override-hue WINS + the inset glow renders + the hairline height); KEEP the reserved-guard clauses (no `deck.ts` subpath, no `./deck` export, no math leaf). |
| `scripts/gates.mjs` | MODIFY — register `proof:deck-progress-rail` in the `GATES` array (id/cmd/tags `["local","ci"]`). |
| `docs/tranches/AX/audit/W24-deck-progress.json` | **CREATE** — the born-RED→GREEN ledger (the four witnesses + per-finding F0-F4 disposition + post-wave GREEN measurements + the paired-π render capture). |

**OUT of bounds (W24 does NOT touch):**
- `src/index.ts` (DeckProgress STAYS on the root barrel — the subpath is additive, NOT a demote; no
  cherry-pick-list edit).
- `src/components/custom/deck-progress/DeckProgress.vue` (the wrapper is correct — it forwards `class`,
  composes `<Progress>`, declares no chrome; the rail-LOOK fix lives in the CSS recipe + ProgressDefault,
  not the wrapper).
- `src/components/ui/progress/Progress.vue` / `ProgressGradient.vue` / `ProgressSectioned.vue` (the gradient
  variant ALREADY reads the tokens; only `ProgressDefault` is brought to parity).
- ANY slides repo file (`slides/src/deck/DeckView.vue`, `slides/src/styles/deck.css`,
  `slides/package.json` — the `.deck-progress` → `<DeckProgress>` replacement + the `--progress-rail-*`
  override + the pin-bump ALL ride W32; §4 note 18).
- `demo/stories/navigation/deck-progress.vue` (the existing consumer-#1 Deck story — it is the render-gate
  FIXTURE; it renders unchanged. The gate may add a `:root` override variant for the assertion, but the
  story SFC is not rewritten).
- `MIGRATION.md` (no DeckProgress retirement; the prune-survivor honesty repair is W21/W29's, not this
  wave's).
- The `/deck` engine (`useDeck`/`useDeckNav`/`DeckPager`) — RATIFIED slides-local (§4 note 6 / F4); NOT
  lifted.

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W32 (Slides motion + form adoption — the cross-repo CONSUMER half).** This is the load-bearing
  split (§4 note 18 / harden `result[30]`). W24 is LIBRARY-SIDE; W32 is SLIDES-SIDE. **Disjoint by repo:**
  W24 writes ONLY glass-ui src (the subpath + the recipe + the gate); W32 writes ONLY slides src (replace
  the `.deck-progress` `<div>`+`::after` with `<DeckProgress :value class="<viewport-pin>"/>` importing
  `@mkbabb/glass-ui/deck-progress`, override `--progress-rail-*` in the consumer, delete the hand-rolled
  rail CSS + `--deck-progress-*` tokens, clear the binary invariant). W32 dependsOn W24 + W31 — it cannot
  port until W24 ships the importable, correct rail AND slides bumps its `@mkbabb/glass-ui` pin to the AX
  release (the idiom:slides ordered precondition: `DeckProgress` requires the AX bump; `vReveal` is
  adoptable against the live `^3.4.0`, but DeckProgress + useCountup are NOT in 3.4.0). **W24 does NOT
  claim "making slides consumer #2"** — that clearance is W32's. The binary invariant stays UNcleared until
  W32 lands; W24's audit json records "consumer-#2 clearance: routed to W32 (gated on the AX publish)."
- **vs W33 (AX close — gate-fleet registration).** Slice 22 F3 routed the `proof:deck-progress-rail`
  REGISTRATION to AX.W33 in the raw audit; the charter MOVES the registration into W24 (the wave that owns
  the gate) so the rail closes on its OWN registered+upgraded gate, not on a back-of-tranche fleet sweep.
  **Disjoint:** W24 registers + upgrades `proof:deck-progress-rail`; W33 runs the FLEET-LEVEL meta-gate
  (every `scripts/proof-*.mjs` has a `proof:*` entry + a GATES row) that W24's registration must SATISFY,
  and the `proof:ax-final` aggregate. W24 must not author the fleet meta-gate (that is W00/W33); W33 must
  not re-implement the deck-progress render assertion (W24 owns it).
- **vs W00 (π visual-runtime lane).** W00 stands up the π-workspace + its DOM-cascade computed-style/
  screenshot readback capability (the harden critique names DeckProgress as one of the four π-lane
  consumers — font/carousel-dot/card-toggle/deck-progress — that need computed-style readback, NOT GPU
  readPixels). **Disjoint:** W00 builds the readback machinery + the meta-gate (every proof script
  registered); W24 CONSUMES the machinery for the deck-progress render assertion and SATISFIES the
  meta-gate by registering its gate. W24 dependsOn W00 (it cannot run the render gate without the lane).
- **vs W23 (Carousel indicator re-author — the SIBLING var-in-arbitrary/Progress-family wave).** W23 fixes
  the carousel-dots `scale-[var(--scale-hover)]` non-emit (the Tailwind-v4 var-in-arbitrary class, "same
  family as the §13 W24 card-lift @utility non-emit"). W24's recipe does NOT use a var-in-arbitrary class
  (the deck rail is a CSS recipe + token-read, not a Tailwind arbitrary), so the two are DISJOINT by
  mechanism — but if any rail class introduced a var-in-arbitrary, it would join W23's tranche-wide
  no-dead-arbitrary-var-class sweep. **Disjoint by surface:** W23 touches `CarouselDots.vue` /
  `GlassCarousel*.vue`; W24 touches the `Progress`/deck-progress surface. Both are Progress-adjacent visual
  rails but share NO file. (Charter `result[30]` notes neither cross-references the other's var-in-arbitrary
  occurrence; W24 carries no var-in-arbitrary class, so it is clean of that family.)
- **vs W25b (CSS monolith carves — glass.css disposition).** W25b explicitly does NOT carve `glass.css`
  for length (single cohesion axis, §4 note 19). **Disjoint:** W24 modifies the `.glass-progress-rail`
  recipe IN PLACE inside `glass.css`; W25b leaves `glass.css` un-carved. If both land in one window the
  shared file is `glass.css` but DIFFERENT regions (W24: the `:577-592` rail recipe; W25b: no glass.css
  edit at all) — no semantic conflict.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (subpath publication — independent):
  `src/subpaths/deck-progress.ts` mirror + the `package.json` `./deck-progress` `exports` block +
  `typesVersions` entry + the `proof:deck-progress-rail` scripts entry; run `npm run build` +
  `verify-export-types` + `proof:resolution` (the subpath probe). Arm B (the rail-recipe correctness —
  the cascade + glow fix): `ProgressDefault.vue` token-read (`bg-secondary`→`--progress-track`,
  `bg-primary`→`--progress-fill`) + the `glass.css` `.glass-progress-rail` token-set + the inset-glow
  re-author + the contract-comment correction. `vue-tsc` + `npm run build` at every interval; render the
  demo Deck story under a `:root` override after each change to confirm the override hue paints (the
  render canary). The two arms share `package.json` (Arm A adds exports/typesVersions/scripts; Arm B adds
  nothing to package.json) — disjoint blocks, sequence the package.json writes if co-landing.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree:
  (1) `node -e 'import("@mkbabb/glass-ui/deck-progress")'` RESOLVES + `dist/deck-progress.js` +
  `dist/deck-progress.d.ts` emit + the `./deck-progress` exports/typesVersions resolve; (2) renders
  `<DeckProgress :value=50>` under `:root { --progress-rail-fill: hsl(120 80% 40%) }` and asserts the
  indicator computed `background-color` IS the override (NOT `--primary`) — the cascade fix; (3) asserts a
  visible glow renders INSIDE the fill boundary at multiple `:value`s (NOT clipped); (4) `npm run
  proof:deck-progress-rail` RESOLVES + the upgraded render assertion REDS on a deliberately-reverted recipe
  (the gate actually bites). ADVERSARIAL twists: (a) reverts ONLY the `ProgressDefault` token-read (leaves
  `.glass-progress-rail` setting tokens) and confirms the render gate REDS (proving the gate catches the
  cascade-layer class, not just a string); (b) confirms the `/deck` reserved-guard clauses still RED on a
  squatted `src/subpaths/deck.ts` or `./deck` export (the subpath added is `deck-progress`, NOT `deck`);
  (c) confirms `DeckProgress` STILL resolves from the root barrel (the additive subpath did NOT demote it);
  (d) confirms NO slides file was touched (the W24/W32 boundary held).
- **Gate-author (≤1 agent).** Authors the render half of `proof:deck-progress-rail` (in the W00 π-workspace
  DOM-cascade readback — the override-hue-wins + inset-glow-renders + hairline-height assertions), registers
  the scripts entry + the `GATES` row, and confirms the gate FAILS at `eaba94f` (unregistered + string-scan
  over a broken-paint contract) and PASSES on the patched tree (registered + render-true). Confirms the W33
  fleet meta-gate (every proof script registered) is SATISFIED by the new entry.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement
+ 1 verify + 1 gate.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`npm run build` GREEN + `dist/deck-progress.js` + `dist/deck-progress.d.ts` EMIT** — the
   `vite.library.ts` `src/subpaths/*.ts` glob auto-resolves the new chunk; `flatten-subpath-types.mjs`
   keeps the `.d.ts` flat. **Born-RED** at HEAD (no subpath file → no chunk); GREEN after. A build artefact.
2. **`verify-export-types` + `proof:resolution` GREEN for `./deck-progress`** — the subpath publication
   probe (`node -e 'import("@mkbabb/glass-ui/deck-progress")'` + the tsc consumer-probe) resolves the new
   `exports`/`typesVersions` entry to the emitted dist. **Born-RED** at HEAD (the import 404s — no exports
   entry); GREEN after. A resolution artefact (the L.W0 Lane III binary-publication form).
3. **`proof:deck-progress-rail` REGISTERED + RENDER-true** — `npm run proof:deck-progress-rail` RESOLVES
   (the scripts entry + GATES row exist) AND the upgraded render assertion passes: (a) the
   `--progress-rail-fill` override hue WINS the indicator's computed `background-color` (the cascade fix),
   (b) a visible glow renders inside the fill boundary (the inset-glow fix), (c) the rail reads as the
   hairline `--progress-rail-h`. **Born-RED** at HEAD on BOTH axes (unregistered; and a render gate would
   RED on the cascade inversion + clipped glow). GREEN after registration + the two recipe fixes. A render
   artefact (NOT a grep-for-source-string-as-runtime gate — the precept-valid form).
4. **The reserved-guard clauses HOLD** — `proof:deck-progress-rail` still REDS on a squatted
   `src/subpaths/deck.ts`, a `./deck` exports entry, or a `deckProgress()` math leaf. The subpath added is
   `deck-progress`; `/deck` stays reserved (§4 note 6 / F4). A deletion/absence artefact.
5. **`proof:ProgressDefault`-parity** (folded into the render gate): the `default` Progress variant is now
   token-retintable from `--progress-fill`/`--progress-track` at source (parity with `gradient`). Asserts
   a `:root { --progress-fill: <hue> }` retints a bare `<Progress variant="default">` (the latent
   default-variant defect closed). **Born-RED** at HEAD (default hardcodes `bg-primary`); GREEN after.

These are build / resolution / render artefacts (the precept-valid forms per SPEC.md §Hard Gates) — NOT
grep-only runtime gates.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass over the demo Deck Progress story (`navigation/deck-progress`, the consumer-#1 render
fixture), in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900):
- **The rail paints the LOOK** (the slice's own close criterion: "live audit that the rail paints the look
  — thin track, token fill, leading-edge glow"): the track reads as a hairline sliver (NOT a 16px bar), the
  fill paints the token color, AND the leading-edge glow renders as a moving position head at the fill's
  trailing edge — at multiple `:value` positions across the morph.
- **The token-override RETINTS live:** apply a `:root { --progress-rail-fill: <NCSU-red-like distinct hue> }`
  in the story (or via the π-lane harness) and confirm the painted fill IS the override (the W32 consumer
  retint will work) — the cascade fix is visually confirmed, not just asserted in computed-style.
- **No occlusion / affordance hold:** the rail does not occlude content; spacing/padding/hierarchy hold;
  no console error; the demo's consumer-pinned chrome (the absolute bottom-edge pin) reads correctly.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, showing the dead-token / clipped-glow BEFORE
vs the retinting / glowing AFTER) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `eaba94f`
   live: no `src/subpaths/deck-progress.ts` + zero `deck-progress` in package.json; render the demo Deck
   story under a `:root { --progress-rail-fill }` override and confirm the fill paints `--primary` NOT the
   override (the cascade inversion); confirm the rightward glow is clipped; confirm `npm run
   proof:deck-progress-rail` does not resolve. Record in `audit/W24-…json` as the born-RED baseline. Do
   NOT proceed on the audit's word — re-prove.
2. **Add the `/deck-progress` subpath (F0).** Create `src/subpaths/deck-progress.ts` mirror; add the
   `./deck-progress` `exports` block + `typesVersions` entry to `package.json`. `npm run build` +
   `verify-export-types` + `proof:resolution` — confirm the chunk emits + the import resolves.
3. **Fix the cascade-layer inversion (F1).** Bring `ProgressDefault.vue` to token-read parity
   (`bg-secondary`→`--progress-track`, `bg-primary`→`--progress-fill`); set those tokens from
   `--progress-rail-*` in `.glass-progress-rail`. Render the demo story under a `:root` override; confirm
   the override hue now WINS. `vue-tsc` + `npm run build`.
4. **Fix the glow clip mismatch (F2).** Re-author the `.glass-progress-rail > *` glow as a trailing INSET
   edge inside the clip; re-token the glow axes. Render at multiple `:value`s; confirm a visible glow inside
   the fill boundary.
5. **Register + upgrade `proof:deck-progress-rail` (F3).** Add the scripts entry + the GATES row; upgrade
   the script to the π-lane render assertion (override-wins + inset-glow + hairline-height) while keeping
   the reserved-guard clauses. Confirm it REDS at `eaba94f` and on a reverted recipe; GREEN on the patched
   tree.
6. **Gates GREEN + close.** Run the render gate, `verify-export-types`, `proof:resolution`, the
   default-variant retint assertion; run the VISUAL-TRUTH live audit (light/dark × 3 viewports); capture
   the paired-π BEFORE/AFTER + DELTA; route the slides consumer-port NOTE to W32 (gated on the AX
   pin-bump/publish); write `audit/W24-…json` to GREEN with the "consumer-#2 clearance routed to W32 — the
   binary invariant stays UNcleared until W32 lands" annotation.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W24-deck-progress.json` — the born-RED→GREEN ledger: the four RED witnesses (no
  subpath; the cascade-layer inversion; the clipped glow; the unregistered string-scan gate), the
  per-finding (F0-F4) disposition, the post-wave GREEN measurements (the subpath resolves +
  `dist/deck-progress.{js,d.ts}` emit; the override hue wins the computed `background-color`; the inset glow
  renders; the registered render gate REDS on revert), and the explicit "consumer-#2 clearance routed to
  W32 — binary invariant UNcleared until W32" annotation + the `/deck`-engine-stays-slides-local F4 ratify.
- The post-build `dist/` proof: `dist/deck-progress.js` + `dist/deck-progress.d.ts` ARE NOW EMITTED (the
  subpaths-glob auto-resolve evidence) + `node -e 'import("@mkbabb/glass-ui/deck-progress")'` resolves.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the demo Deck story BEFORE (the
  `--progress-rail-fill` override IGNORED — fill paints `--primary`; the glow clipped) vs AFTER (the
  override hue painting; the inset glow rendering) at ≥ 3 viewports × light/dark.
- A consumer-port NOTE annex (routed to W32, NOT executed here): slides replaces its `.deck-progress`
  `<div>`+`::after` with `<DeckProgress :value class>` importing `@mkbabb/glass-ui/deck-progress`, overrides
  `--progress-rail-*`, deletes the hand-rolled rail + `--deck-progress-*` tokens, clears the binary
  invariant — gated on the AX pin-bump + publish (§4 note 12 publish-currency).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(deck): W24 born-RED baseline — no /deck-progress subpath + the cascade-layer inversion + clipped glow + unregistered gate (AX.W24)`
2. `feat(subpaths): export the /deck-progress flat subpath — src/subpaths mirror + contract-v2 exports + typesVersions (AX.W24 F0)`
3. `fix(progress): token-read the default variant fill/track (--progress-fill/--progress-track) so .glass-progress-rail wins the cascade (AX.W24 F1)`
4. `fix(glass): re-author the deck-rail leading-edge glow as a trailing inset edge inside the clip (AX.W24 F2)`
5. `feat(gates): register proof:deck-progress-rail + upgrade string-scan → render assertion (override-wins + inset-glow) (AX.W24 F3)`
6. `chore(AX.W24): audit ledger GREEN + paired-π retint/glow capture + route the slides consumer-port to W32`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the render-gate + close machinery.** The upgraded
  `proof:deck-progress-rail` render assertion (override-hue-wins + inset-glow-renders) needs W00's
  DOM-cascade computed-style/screenshot readback capability — the harden critique (`result[30]`) names
  DeckProgress as one of the FOUR π-lane consumers (font / carousel-dot / card-toggle / deck-progress) that
  need computed-style readback, NOT GPU readPixels. W24 cannot close on a string-scan over a broken-paint
  contract (the exact AW cardinal failure: the gate is green while the override is a silent no-op and the
  glow is clipped); W00 stands up the lane it closes on. (Charter `### AX.W24` dependsOn AX.W00, line 1259.)
- **Downstream — AX.W32 (the slides CONSUMER half) dependsOn AX.W24 + AX.W31.** W32 replaces the slides
  `.deck-progress` `<div>`+`::after` with `<DeckProgress>` importing `@mkbabb/glass-ui/deck-progress`,
  overrides `--progress-rail-*`, deletes the hand-rolled rail, and CLEARS the binary invariant (making
  slides consumer #2). W32 CANNOT port until W24 ships (a) the importable subpath and (b) the
  cascade-correct + glow-true recipe (a broken recipe forces a fork, the F1/F2 "blocks a clean port"
  finding), AND until slides bumps its `@mkbabb/glass-ui` pin to the AX release (the idiom:slides ordered
  precondition — DeckProgress is NOT in the live `^3.4.0`; it requires the AX bump, gated on the AX PUBLISH
  per §4 note 12). The W24→W32 split is the §4 note 18 / `result[30]` double-assignment correction. The
  binary invariant stays UNcleared until W32 lands — **W24 does NOT claim "making slides consumer #2."**
- **AX.W33 (close) — the fleet-level registration meta-gate.** W24's `proof:deck-progress-rail`
  registration SATISFIES the W33 fleet meta-gate (every `scripts/proof-*.mjs` has a `proof:*` entry + a
  GATES row) and is rolled into `proof:ax-final`. W24 owns the gate's registration + render upgrade; W33
  owns the fleet aggregate. (Slice 22 F3 routed the registration to W33; the charter MOVED it to W24 so the
  rail closes on its own registered gate — §3 W24 scope, line 1271.)

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`a62c76f`** ("feat(tranche-AW): W16 (rail) — `.glass-progress-rail` recipe + DeckProgress `:value`
  wrapper + proof:deck-progress-rail") — the AW.W16 LIBRARY-HALF landing: the recipe, the wrapper, the
  proof script. The cascade-layer inversion (F1) + the clipped glow (F2) were minted HERE — the recipe
  assumed plain class-vs-class specificity (`.glass-progress-rail` vs `.bg-primary`) but Tailwind v4 puts
  utilities in a NAMED layer that always outranks `@layer components`; and the rightward `4px 0 8px` glow
  was authored against a clip the `<Progress>` substrate owns. The defects shipped GREEN because the proof
  script never rendered (the string-scan blindspot — the cardinal AW lesson).
- **`1df7783`** ("feat(tranche-AW): W16 (demo) — deck-progress navigation story (consumer #1)") — the demo
  Deck story (`demo/stories/navigation/deck-progress.vue`), consumer #1. It is the render-gate FIXTURE; it
  does NOT override `--progress-rail-fill` (so it is a clean witness for the cascade inversion — a `:root`
  override would lose to `bg-primary`).
- **`50b2926`** ("chore(gates): sanction the W16 DeckProgress root export + deck-progress demo story") — the
  AW batch-1 reconcile where the `proof:deck-progress-rail` `scripts` block registration was DROPPED (F3 —
  "likely a casualty of the AW batch-1 integration reconciliation where the W16 commits were merged but the
  scripts-block registration got lost"). The dual-commit pairing (a62c76f duplicated as 763b7ed in the
  reconcile) is the named provenance of the registration loss.
- **The AW.W16 two-consumer ledger** (`docs/tranches/AW/waves/AW.W16-deckprogress.md:13,118-126`) — named
  slides H.W1 as "consumer #2 — PORT, adopts the library rail LOOK, deletes its hand-rolled rail CSS." That
  port NEVER ran (slides H W2-W11 blocked behind the user's WIP — REQUIREMENTS §171); `grep
  DeckProgress|glass-progress-rail` over `slides/src` returns ZERO. So the primitive has exactly ONE
  consumer (the demo) — substrate-without-a-real-consumer, the precise anti-pattern the binary invariant
  forbids. W24 makes the rail ADOPTABLE (subpath + correct recipe); W32 ADOPTS it (consumer #2).
- **slides `DeckView.vue:105,238-263` + `slides/src/styles/deck.css:285-297`** — the parallel hand-rolled
  `.deck-progress` `<div>`+`::after` rail with a DIFFERENT fill mechanic (`transition: width` vs the
  library's `translateX`) + its own `--deck-progress-*` tokens. The de-dock PAGE-BOTTOM placement (§10.1)
  IS correctly done here (`position:fixed; bottom: env(safe-area-inset-bottom); z-index:40` below the dock)
  — so the user-visible requirement is MET, but via a hand-rolled bar that bypasses the library primitive.
  W32 converges it onto `<DeckProgress>`. The slides `::after` glow (`DeckView.vue:256-260`) is a TIGHT
  inset-ish edge that survives ITS clip — the exact pattern W24's F2 inset-glow fix adopts.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: DeckProgress on the root
  barrel only (no subpath), the recipe in `@layer components` (cascade-losing), the glow clipped, the gate
  unregistered + string-scan. §4 note 12: the published registry line is 3.6.0 / consumers pin 3.4.0; the
  consumer leg (W32) is gated on the AX cut PUBLISHING.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-I binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (precepts/README.md "Substrate and consumer land together.
  A primitive that is not consumed is unfinished work."; SPEC.md §"Every wave lands substrate with its
  consumer or deletes the substrate," line 86).** DeckProgress is substrate-without-a-real-consumer at HEAD
  (one demo consumer; the slides port never ran). W24 does NOT clear the bar by itself — it ENABLES the
  consumer (the `/deck-progress` subpath + the cascade-correct recipe slides can adopt with zero library
  edit). The §2b clause is explicit: "the binary invariant stays UNcleared until W32 lands the slides
  consumer." MUST NOT manufacture a fake second consumer in the demo to fake the bar (the demo stays
  consumer #1; W32 is the real consumer #2). MUST NOT retire the primitive instead — the audit's option (B)
  retire-it path is NOT chosen because the de-dock placement is met + slides WILL adopt once the recipe is
  correct + importable (the convergence is forward, not a retirement).
- **one-path / no-legacy-code (the no-backwards-compat memory; SPEC.md §"Execute the plan … no shadow APIs
  or temporary compatibility layers").** The cascade fix is the ROOT-CAUSE token-read at `ProgressDefault`
  source (the one-path fix that also closes the latent default-variant gap), NOT the `@layer utilities`
  re-author that papers the symptom while leaving the default variant un-retintable. The glow fix is a
  single inset-edge re-author, NOT a forked second track. There is ONE rail recipe, ONE fill mechanic
  (`<Progress>` `translateX`), ONE token-read path. MUST NOT ship a parallel rail or a `default`-variant
  shadow path. The slides hand-rolled rail is RETIRED in W32 (one direction, no parallel rails — the
  audit's "do not keep two parallel rails" gestalt).
- **no-overfitting (precepts/README.md "No overfitting. A public surface, helper … needs a current consumer
  and evidence."; precepts/audits/overfitting-audit.md).** The `/deck` engine
  (`useDeck`/`useDeckNav`/`DeckPager`) is RATIFIED slides-local (§4 note 6 / F4) — lifting it would
  manufacture substrate-without-consumer; W24 does NOT lift it, and the reserved-guard gate clauses keep
  `/deck` un-squatted. The `deckProgress(index,total)` math leaf is NOT added (the `100·(k+1)/N` math stays
  consumer-side — a one-liner, not a library-worthy abstraction). The subpath added is `deck-progress`
  (the LOOK), not `deck` (the engine).
- **cascade-layer correctness (§2b band-I "one-path (cascade-layer correctness)").** The recipe wins the
  cascade idiomatically — the `default` Progress variant reads `--progress-fill`/`--progress-track` at
  source (parity with the `gradient` variant), so `.glass-progress-rail` sets tokens rather than fighting a
  utility from a losing `@layer`. MUST NOT leave the advertised `:root { --progress-rail-fill }` contract a
  silent no-op (the F1 root cause).
- **Gates close on evidence (precepts/README.md line 13; SPEC.md §Hard Gates lines 94-109 — build/test/
  runtime/render/diff, NOT "grep found a source string for runtime behaviour" line 108).** The gate is
  UPGRADED from a string-scan (which is green while the paint is broken — the precept-forbidden grep-only
  runtime gate) to a RENDER assertion (the override hue wins the computed `background-color`; the inset glow
  renders) — the precept-valid runtime-behaviour form. Plus build (`npm run build` chunk emit) + resolution
  (`verify-export-types`/`proof:resolution` subpath probe) artefacts. The close is the executed live
  Playwright + frontend-design audit (the rail paints the look + the override retints live), never a
  headless proof alone — the cardinal AX precept (the slice's own close criterion: "Verify the chosen look
  with a live Playwright screenshot, not the string-scan gate").
- **no-silent-deferrals (precepts/instructions/tranche/SPEC.md §"consumer will be wired later" is NOT a
  valid gate, line 109; the §16.4 zero-loss).** The slides consumer-port is NOT silently dropped — it is
  ROUTED to W32 (which dependsOn W24 + W31) with the explicit ordered precondition (the AX pin-bump +
  publish) and the binary-invariant-UNcleared annotation in the audit json. The `/deck` engine F4 is
  CHECKMARKED ratified-slides-local with evidence, not silently assumed. The registration (F3) is DONE in
  W24, not deferred to the W33 fleet sweep (the charter moved it forward so the rail closes on its own
  registered gate).
- **canonical-readme-shape (precepts/canonical-readme-shape.md) — N/A this wave** (no README authored;
  DeckProgress is a thin wrapper documented inline + in the demo story). Noted for completeness so the
  band-I precept set is not silently partial.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The cascade-fix CHANNEL (RATIFY-BEFORE-IMPL).** F1 offers two paths: (a) token-read at
   `ProgressDefault` source (`bg-secondary`→`--progress-track`, `bg-primary`→`--progress-fill`) — the
   audit's recommended option (b), which ALSO fixes the latent "the default Progress variant is the only one
   not token-retintable" defect and brings it to parity with the `gradient` variant; vs (b) re-author
   `.glass-progress-rail` in `@layer utilities` (or as a Tailwind `@utility`) so it ranks alongside
   `bg-primary` and source order wins. **Recommendation: (a) the token-read at source** — it is the
   one-path root-cause (the default variant becomes token-retintable for EVERY consumer, not just the deck
   rail), matches the existing `gradient`-variant idiom, and avoids a layer-juggle that papers the symptom.
   RATIFY (a) before impl; it touches `ProgressDefault.vue` (in FileBounds), which (b) would not.
2. **The glow FORM (RATIFY-BEFORE-IMPL).** F2 prescribes a trailing edge INSIDE the clip but leaves the
   primitive open: an `inset` box-shadow vs a `linear-gradient` brightening on the indicator's right
   portion. **Recommendation: a `linear-gradient` right-edge brightening** (the slides bar's surviving
   pattern, `DeckView.vue:256-260`) — it reads as a moving position head, composes cleanly with the
   token-read fill, and is unambiguously inside the clip; an `inset` box-shadow is the fallback if the
   gradient muddies the fill color. RATIFY the form before impl so the render gate asserts the right axis.
3. **Whether to ADD the `:root`-override variant to the demo story or keep the override π-lane-side
   (RATIFY).** The render gate needs a `:root { --progress-rail-fill: <distinct hue> }` fixture. **Option
   A:** add a second `<DeckProgress>` instance under a scoped override to the demo Deck story (visible in
   the storybook, dogfoods the retint). **Option B:** apply the override only in the π-lane harness (keeps
   the story clean). **Recommendation: B** (the override is a gate-fixture concern, not a product demo;
   the story stays the canonical consumer-#1 look) — but RATIFY since A makes the retint visually
   dogfooded in the live storybook. Either way the demo story SFC stays out of FileBounds beyond a possible
   additive override block.
4. **The W24-vs-W32 binary-invariant annotation wording (RATIFY).** W24's audit json must record that the
   substrate-with-consumer bar stays UNcleared until W32 lands (DeckProgress has one real consumer until
   then). **Recommendation:** the audit json closes GREEN with an explicit "consumer-#2 clearance: routed to
   W32 (gated on the AX pin-bump + publish per §4 note 12); binary invariant UNcleared until W32" line — so
   W24 is not falsely held open on a cross-repo session it does not own, and the close is not falsely
   claiming the bar is cleared. RATIFY that a GREEN W24 with an UNcleared binary invariant (explicitly
   routed) is a valid close, distinct from a silent deferral.
