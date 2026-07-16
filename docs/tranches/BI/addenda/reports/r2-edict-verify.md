# R2 Edict/Product Verification — Adversarial Round

Repo: `/Users/mkbabb/Programming/glass-ui` (READ-ONLY; another agent's live uncommitted transaction)
Branch: `master` @ HEAD `e5b3a209`. Working tree heavily modified (~hundreds of demo/src files M/D).
`package.json` version = `6.0.0`; `CHANGELOG.md` top section = `7.0.0 (unreleased)` — the in-flight
transaction is preparing 7.0.0 but the package.json bump has not landed. `dist/` is NOT git-tracked
(0 tracked files) — it is a build artifact present in the working tree; `package.json "files": ["dist"]`.

---

## Claim 1 [meta-leak-dist] — VERDICT: CORRECTED

The claimed mechanism is wrong; the underlying leak is real and far broader than claimed.

- SRC (working tree): `src/composables/motion/useDragMorph.ts` embeds `BD.W-ANIM-IOS27-TUNE` at
  **line 37** and **line 179** — both in **code comments** (not 36-37). At HEAD the same string sits
  at lines 37 and 172. TRUE that src carries the string.
- BUT src is **not shipped**: `package.json "files": ["dist"]`.
- The specific claim — that the useDragMorph comment ships in the package — is **FALSE**:
  `grep -c 'BD.W-ANIM-IOS27-TUNE' dist/useDragMorph-aF0u96sF.js` = **0**. Vite strips JS comments in
  the production build, so the useDragMorph comment does NOT survive into shipped JS.
- HOWEVER the exact string DOES ship — via a different file:
  `dist/components/drawer/constants.d.ts:11: * BD.W-ANIM-IOS27-TUNE re-tuned {0.4, 0.82} → ...`
  (JSDoc comments are preserved in emitted `.d.ts` type declarations, which are shipped).
- The broader leak is large: **109 shipped dist files carry `B[A-Z]\.W-` tokens** — 4 `.js` + 105 `.d.ts` —
  plus 1 `'tranche'` (`dist/components/configurator/ConfiguratorLayer.vue.d.ts`).
  The 4 `.js` files leak via **shader-string literals** (not stripped, they are string content):
  - `dist/aurora.js`: BB.W-AUR-KUWAHARA, BC.W-VIZ-AURORA, BD.W-AUR-VIVIDNESS, BG.W-AUR-METAL-FINISH
  - `dist/blob.js`: BC.W-CARVE6, BC.W-GOOBLOB-MEATBALL, BD.W-GOO-CAROUSEL-DECK, BC.W-WEBGPU-EVERYWHERE, …
  - `dist/fourier-field.js`: BD.W-FOURIER-LOOM, BG.W-FOURIER-BEAUTY, BI.W-FOURIER-RIBBON
  - `dist/liquid-grid.js`: BD.W-PAPERGRID-FACE, BG.W-GRID-AFFINE

Bottom line: the no-meta edict IS violated in the shipped package (real defect), but not through the
useDragMorph.ts path named — the JS comment is stripped. The leak channel is `.d.ts` JSDoc (105 files)
+ shader string literals in 4 `.js` bundles.

---

## Claim 2 [meta-leak-demo] — VERDICT: CORRECTED (edict still violated)

The exact specified command, run on the working tree:
`grep -rEn 'B[A-Z]\.W-|tranche' demo/ --include='*.vue' --include='*.ts' | wc -l` = **259** (not ~152),
across **97 files**. All 259 are `B[A-Z]\.W-` wave tokens; **0** are literal `'tranche'`.
(HEAD carried more — the in-flight transaction is REDUCING the count, not the reverse.)

Classification (no user-visible UI strings found):
- **214** lines carry an explicit comment marker (`//`, `/*`, leading `*`, `<!--`) on the matched line.
- **15** lines have no on-line marker but are all **continuation lines inside multi-line comment blocks**
  (HTML `<!-- … -->` tails, JSDoc continuations) — verified by inspection; e.g.
  `demo/shell/AppShell.vue:196`, `demo/stories/motion/deck.vue:81` (ends `-->`),
  `demo/stories/foundations/paper-glass.vue:126`.
- **0** user-visible UI strings (no meta token appears in rendered template text).
- **0** route ids carry meta tokens (all `router.ts` hits are comments).

10 sample refs: `demo/main.ts:15`, `demo/main.ts:112`, `demo/router.ts:12`, `demo/router.ts:31`,
`demo/router.ts:46`, `demo/chassis/landing/vizPreviewStill.ts:2`, `demo/shell/AppShell.vue:196`,
`demo/shell/configurator/PresetEditor.vue:186`, `demo/stories/foundations/paper-glass.vue:270`,
`demo/stories/dock/_frame/DockStage.vue:98`.

Number is CORRECTED (259, not 152). The DEMETA edict (which per the wave covers comments) is still
violated — 259 comment-borne meta refs remain — but none are user-visible.

---

## Claim 3 [god-module-regrowth] — VERDICT: CONFIRMED (with honest judgment)

`wc -l` on the working tree, all near-exact:

| file | claimed | actual |
|---|---|---|
| `src/components/slider/Slider.vue` | ~641 | **641** |
| `src/components/aurora/composables/atoms.ts` | ~592 | **592** |
| `src/components/pager-dots/PagerDots.vue` | ~580 | **580** |
| `src/components/blob/composables/useMetaballRenderer.ts` | ~547 | **547** |
| `src/components/easing/EasingPicker.vue` | ~541 | **541** |
| `src/components/blob/shaders/metaball.frag.ts` | ~537 | **537** |
| `src/components/blob/shaders/metaball.wgsl.ts` | ~527 | **527** |
| `src/components/aurora/composables/runtime.ts` | ~520 | **519** |
| `src/components/dock/styles/shell.css` | ~505 | **505** |

An exhaustive `find src -type f … | awk '$1>500'` returns **exactly these 9 files and no others**.

Honest judgment (largest is 641 — no catastrophic 1000+ modules):
- **Legitimately long, single-concern** (not god-modules): `metaball.frag.ts` / `metaball.wgsl.ts`
  (shader source strings), `dock/styles/shell.css` (one component's stylesheet), and `Slider.vue`
  — its 641 is mostly a 402-line scoped `<style>` (script 1-196, template 198-237, style 239-641).
- **Genuine density / god-module candidates**: `aurora/composables/atoms.ts` (592, 13 exports incl.
  `nucleiPrior`/`resolveAtoms`/`configToAtoms`), `aurora/composables/runtime.ts` (519 logic),
  `useMetaballRenderer.ts` (547 render logic), `EasingPicker.vue` (344-line `<script>` block),
  `PagerDots.vue` (264-line script + 192 style).

Line-count claim: CONFIRMED exactly. "God-module regrowth" as a blanket label is partly overstated —
about half the list is cohesive shader/stylesheet bulk.

---

## Claim 4 [eyeglass-absent] — VERDICT: REFUTED

The eyeglass/lens selection effect is present — folded into the **pill default**, exactly as the
directive intended (not as a distinct third variant).

- `SegmentedTabsVariant = "pill" | "underline"` (SegmentedTabs.vue:59). The pill indicator element
  carries the **`glass-lens`** class (`SegmentedTabs.vue:385`, alongside `glass-capsule`).
- `.glass-lens` is a real, defined material: `src/styles/glass-refract.css:76` (`.glass-lens { … }`),
  the renamed `.glass-refract` opt-in (glass-refract.css:63).
- The loupe spring register exists: `src/styles/tokens/scheme-spring.css:107` `--spring-eyeglass`
  (+ `--spring-eyeglass-settle`, `--spring-eyeglass-duration`); `src/styles/index.css:216` names the
  "data-eyeglass iOS-27 loupe register".
- `MIGRATION.md:624-642` documents `BI.W-TABS-FACTOR` — "the eyeglass loupe becomes THE `pill` default
  + the variant cull"; the old `<SegmentedTabs eyeglass>` opt-in boolean was DELETED because a bare
  `<SegmentedTabs>` now paints the loupe (UF-H1: "eyeglass should become the default tabs"). Sizing
  knobs `--eyeglass-proud` (default 1.12) / `--eyeglass-settled` (0.84) are the documented magnify axis.

The premise that a separate eyeglass VARIANT should exist is contradicted by the directive itself.
Nuance: no demo story is explicitly labeled "eyeglass" (`grep eyeglass demo/stories` → none), but the
default tabs story (`demo/stories/navigation/tabs.vue`) renders the loupe as the pill default. Claim is
REFUTED — the effect is not absent; it is the default.

---

## Claim 5 [masking-unwired] — VERDICT: CONFIRMED

- `scripts/no-masking-manifest.mjs` exists (17804 bytes, mtime Jul 15 16:59).
- Referenced by **no** `package.json` script (full scripts block inspected: build/dev/test/typecheck/
  release/iter/profile only — none reference it), **no** CI workflow (`grep .github/` → empty),
  **no** test.
- Only live references are **tranche-formation planning JSON** under
  `docs/tranches/BI/FORMATION/` (`waves.json`, `package-script-dispositions.json`, etc.) — not
  executable wiring.
- The companion gate `scripts/proof-no-masking-fallback.mjs` referenced in those docs **does not even
  exist** (`ls` → No such file).
- Other "no-masking" hits (`vite.style-fold.ts:291`, `demo/chassis/code/useCodeHighlight.ts`,
  `tests/setup.ts:98`, `constellationField.test.ts:492`) are the CSS `@supports` fallback design
  principle in **comments** — not live enforcement of the manifest, and no test asserts on it.

The no-masking property has NO live enforcement. CONFIRMED.

---

## Claim 6 [pi-suite-unwired] — VERDICT: CONFIRMED

- `tests-visual/` holds **172** `*.spec.ts` files (`find … | wc -l` = 172), including a **webkit**
  Playwright project (`tests-visual/playwright.config.ts:117 name: "webkit"`; projects also:
  `chromium-headless-new` :66, `coarse-touch` :87). The WebKit project is the `BC.W-SAFARI-WEBGL`
  cross-engine lane (config:105-117).
- It is a **private workspace**: root `package.json workspaces: ["tests-visual"]` (line 14 — the only
  "tests-visual" occurrence in root package.json); `tests-visual/package.json` is
  `@mkbabb/glass-ui-tests-visual` `private: true`, explicitly "DEV-ONLY … NOT in glass-ui
  dependencies … NOT in dist/exports".
- Invoked by **no** root npm script (root `npm test` = `vitest run`), **no** CI workflow, **no**
  release step:
  - `.github/workflows/ci.yml` runs only `npm ci` → `npm run typecheck` → `npm test` → `npm run build`.
  - `grep playwright|tests-visual|visual .github/workflows/` → empty; `scripts/release.sh` → empty.
- What WOULD run it: only from inside the workspace — `cd tests-visual && npm test`
  (= `playwright test`), or `npm test -w tests-visual`, or the granular `test:substrate` /
  `test:dock` / `test:touch` scripts in `tests-visual/package.json`.

CONFIRMED — the π suite is entirely disconnected from any automated (CI/release/root) run.

---

## Claim 7 [splitchars-toggle-deleted] — VERDICT: CONFIRMED (documented clean-break)

- `src/components/split-chars/` and `src/components/toggle/` **do not exist** in the working tree.
  `git status --short` shows unstaged deletions: ` D split-chars/README.md`, ` D SplitChars.vue`,
  ` D split-chars/index.ts`, ` D toggle/Toggle.vue`, ` D toggle/index.ts`. HEAD `git ls-tree` confirms
  both dirs existed at HEAD. The in-flight transaction deletes them outright.
- Export keys removed: working-tree `package.json` has **no** `"./split-chars"` and **no** `"./toggle"`
  subpath export (grep matched only the unrelated `toggle-group` and `typewriter` keys).
- Documented successor story (this is an intentional clean-break, not silent loss):
  - `MIGRATION.md:25` — standalone `Toggle` / `toggleVariants` / `ToggleVariants` → use
    `ToggleGroupItem` inside `ToggleGroup`, or a native `<button aria-pressed>`. (The claim's "toggle
    folded into button/toggle-group" hypothesis is CORRECT.)
  - `MIGRATION.md:23` — `SplitChars` / `useCharStagger` → "Render ordinary accessible text. Own
    product-specific grapheme treatment at that product boundary." SplitChars is **removed**, NOT
    folded into typewriter (the claim's "folded into typewriter" guess is wrong; the story is
    "render plain text / product-owned").
  - Removal lives under `CHANGELOG.md` `## 7.0.0 (unreleased)` (top section), e.g. line 62
    "Typewriter is text, not a hidden glyph control", line 75 `semantics?: "toggle" | "tabs"`.

CONFIRMED deletion + export removal. This contradicts any "P079/P089 apotheosis" narrative, but the
deletion is deliberate and documented in the 7.0.0 CHANGELOG + MIGRATION — a clean-break, not an
accident.

---

## Cross-cutting note
The tree is mid-transaction preparing 7.0.0: CHANGELOG names `7.0.0 (unreleased)` while `package.json`
still reads `6.0.0`. `dist/` reflects a prior build state and is untracked; the meta-leak finding
(Claim 1) is independent of the exact version and holds for whatever `dist/` gets shipped unless the
build is reconfigured to strip `.d.ts` JSDoc and shader-string meta tokens.
