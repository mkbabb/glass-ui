# BJ REFINEMENT — the wave set

Date: 2026-07-24 · **Tranche development only.** No source edits land from this document.

Every wave: an owner, a falsifiable change, born-RED gates with a RED-at-HEAD condition, π/DELTA
obligations, and what it breaks. Families and evidence are in `REGISTRY.md`; the laws and the close are in
`REFINEMENT.md`. **Nothing here restates a count, a roster, or a line number another file owns.**

Gate budget: **40–60 for the whole library.** Present state is 1,095 `it()` cases. Each wave's proposal is
summed at the band fold and cut there. A gate that restates a token value is not an invariant.

π/DELTA cells: `chromium-desktop` (1440×900) · `chromium-mobile` (iPhone 15 Pro) · `webkit-desktop` ·
`webkit-mobile`. **The WebKit cells are blocked by `W-WEBKIT-CRASH` and are the first thing that wave
unblocks.**

---

# BAND 0 — TRUTH

Nothing downstream is verifiable until these land. BJ's close ends in an 8.0.0 publish; publishing over
Band 0 repeats 7.0.0's mistake at a higher version.

## W-WEBKIT-CRASH — the demo crashes WebKit on every route

**Owns:** the Safari arm of everything.

Playwright WebKit crashes deterministically (**5/5, lead-reproduced at HEAD against the live dev server**)
loading the demo, on content Chromium renders without a single page error. It is a renderer crash: no
`pageerror`, no console output.

### ⚠ SEVERITY RE-SCOPED — real Safari does NOT crash

Safari remote automation was enabled mid-session and the shipping browser was measured directly via
`safaridriver` (W3C WebDriver, Safari **26.4** / platform 26.4.1):

| harness | result |
|---|---|
| Playwright `webkit` (engine build) | **CRASH 5/5**, every route, dev and bundled |
| **Real Safari 26.4** | **renders every route** — `/` at **302 DOM nodes, exactly matching Chromium's 302**; aurora 1,402; dock 773; `backdrop-filter` resolving on 4–17 elements per route; **no horizontal overflow at 402px**; 8 routes × 2 viewports, zero crashes |

> **This wave was written as a product-blocking S0 — "the library does not render in a first-class
> engine." That framing is withdrawn. The library renders correctly in the browser users actually have.
> What crashes is the test harness.**

**What survives, and it is still worth doing.** The construct is real: a threshold on the population of
`color-mix()`-valued custom properties (~38 survive, ~46 crash, 249 shipped), with the `@supports` guards
innocent. It costs us WebKit-engine CI coverage, it is a latent fragility in a shape WebKit demonstrably
dislikes, and the combinatorial minting it exposes is a genuine design smell. But it is **no longer a
release blocker, no longer Band 0, and no longer evidence that Safari is unsupported.**

**Band 0 → Band 6.** The π/DELTA matrix's WebKit cells are **unblocked immediately** via `safaridriver`,
which was the only reason this wave gated the others.

**The generalisable law, now recorded in memory:** *Playwright's `webkit` is the engine build, not the
Safari app; they can give opposite answers, and neither discharges the other.* Bank `webkit-engine` and
`safari-app` as **separate cells**. This one inverted a verdict — an S0 that gated an entire band turned
out to be a harness artifact, and the only thing that caught it was checking the real browser.

### ⚠ THE CSS ATTRIBUTION IS WITHDRAWN — the bisect was measuring its own artifact

An earlier draft of this wave asserted "blocking stylesheets prevents it, therefore the crash is in the
318 KB stylesheet." **That inference is invalid and is struck.** The lead re-ran it with a render baseline
and every avoidance result collapses:

| trial | result | nodes in DOM |
|---|---|---|
| **chromium** control, 6 s | OK | **216** ← what a real render looks like |
| webkit control, 1 s | **CRASH** | — |
| webkit control, 6 s | **CRASH** | — |
| webkit, all CSS blocked | "OK" | — (textLen 0) |
| webkit, CSS truncated to 25 / 50 / 75% | "OK" | — (textLen 0) |
| webkit, **CSS re-served byte-identical through an interceptor** | "OK" | **11** |

Two things kill the conclusion. First, **re-serving the identical bytes avoids the crash** — so the crash
cannot be a function of the CSS *content*. Second, and decisively, every "OK" run has **11 DOM nodes
against Chromium's 216**: the app never mounted. Each intervention that "prevented the crash" also
prevented the application from booting, so the bisect was measuring *whether the app started*, not *which
CSS is fatal*. A green result with an empty DOM is not a green result.

**What the dev-server bisect actually established:** nothing about CSS. It established only that WebKit
crashes when the demo mounts. The dev server serves CSS *through* the JS module graph, so aborting a
stylesheet also breaks boot — the confound was structural.

### THE CRASH IS LOCALISED — bisected on the BUILT demo, with mount as the precondition

Re-run against `vite preview` of `dist-demo`, where the stylesheet is a real `<link>` and can be
manipulated without breaking the module graph. **Chromium baseline: 302 nodes.** Any trial under 60 nodes
is VOID, not passing.

| trial | result |
|---|---|
| chromium baseline | OK, **302 nodes** |
| webkit control | **CRASH** |
| main sheet aborted / empty / first 25% / first 50% | OK, **302 nodes** — full mount, no crash |
| main sheet first 75% | **CRASH** |
| main sheet passthrough (byte-identical) | **CRASH** ← the dev-server confound is gone |

Binary search on the truncation point, 7 trials:

```
last good   70.313%  (byte 224,036)
first crash 71.875%  (byte 229,015)      window = 4,979 bytes
```

The window is the **glass token block** — the ladder's blur/saturate tokens and the
`--glass-bg-*` ramp, each wrapped in `@supports (color:color-mix(in lab, red, red))`, including the nested
`color-mix(in oklab, color-mix(in srgb, var(--card) calc(…), transparent), …)` that mints `--glass-bg-dock`.

**Hypothesis tests against the FULL sheet** (not truncated, so mount is never in question):

| intervention | result |
|---|---|
| full sheet (control) | **CRASH** |
| drop all 249 `@supports (color:color-mix…)` blocks | **OK, 302 nodes** |
| flatten every `color-mix()` to `var(--card)` | **OK, 302 nodes** |
| neutralise `--glass-bg-dock`'s nested `color-mix` **only** | **CRASH** |

So it is **not one declaration** — it is the *population*. Bisecting on how many of the 249 blocks are
retained:

```
keep 124 → CRASH      keep 62 → CRASH      keep 46 → CRASH
keep  38 → OK (302)   keep 31 → OK (302)
                      ⇒ threshold between 38 and 46
```

**Discriminating test — and it refuted the first cure this seat proposed.** An earlier draft of this
section concluded "the guards are a legacy feature-detect, delete them." That was written before the cure
was tested. Tested:

| intervention | result |
|---|---|
| control | **CRASH** |
| **unwrap the `@supports` guards, KEEP the `color-mix()` declarations** | **CRASH** ← the proposed cure does not work |
| keep all 249 `@supports` blocks, replace `color-mix()` inside them with `var(--card)` | **OK, 302 nodes** |

> **The `@supports` wrapper is innocent. The crashing construct is the population of `color-mix()`
> custom-property declarations itself** — a threshold effect surviving ~38 and dying by ~46, against 249
> shipped. Removing the guards while keeping the declarations changes nothing.

**The change is therefore NOT "delete the guards."** It is to reduce how many `color-mix()`-valued custom
properties WebKit must resolve. Population at HEAD: **120 `color-mix()`-valued custom-property
declarations across 92 distinct property names**, inside 249 `@supports` blocks. Largest families:
`--surface-tint-*` (22), `--glass-bg-*` (10), `--glass-border-*` (9), `--cartoon-ink-*` (9).

**A trim will not work — measured.** Flattening the three largest families (~41 declarations) in
combination:

| intervention | result |
|---|---|
| flatten `--surface-tint-*` | **CRASH** |
| + `--glass-bg-*` | **CRASH** |
| + `--glass-border-*` | **CRASH** |

Against a survival threshold of ~38 of 249, clearing it requires removing roughly **85%** of the
population. **This is a restructure of how the ladder mints colour, not a tuning exercise**, and any wave
that books it as a trim is mis-scoped. The direction: the library mints combinatorially — ladder rungs ×
the `--glass-*` ramp × per-mode arms, each an independent `color-mix(in srgb, var(--card) calc(…),
transparent)`. Emit **flat resolved colours** for the rungs and keep `color-mix()` only where a live
scalar genuinely drives it. The `--glass-level` scalar is worth keeping; it need not mint a distinct
`color-mix()` per rung per mode.

The guards are still a legacy ladder for a Baseline feature and should go on the no-masking-fallback
edict — but **removing them does not fix the crash** and must not be sold as the fix.

Independently of the crash, split the monolith: 318 KB in one stylesheet is its own defect.

**The gate must assert the cure, not the correlate.** `G-WK-COLORMIX-BUDGET`: the emitted stylesheet
declares fewer than 38 `color-mix()`-valued custom properties. **RED — 249.** And `G-WK-BOOT` (above)
remains the real proof, because a budget is a proxy and the mount is the product.

**Method note, recorded because it is this tranche's disease in miniature and I walked into it twice.**
First the dev-server bisect "proved" CSS by disabling the app. Then the built-demo bisect correctly
localised the construct — and I wrote a cure from the localisation *without testing the cure*, which the
very next trial refuted. **Localising a defect and knowing its remedy are two different results, and only
one of them was measured.**

**The generalisable trap, which is this tranche's own disease in miniature:** an intervention that makes a
symptom disappear by disabling the subject is not a diagnosis. This one survived into a wave spec because
the avoidance result was checked and the render was not.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-WK-BOOT` | A WebKit page load of `/` **mounts** — `document.querySelectorAll('*').length` within 25% of the Chromium baseline (216 nodes) — **and** does not emit `crash`. The node-count arm is mandatory: without it the gate passes on a blank page. | **RED — crashes 5/5** at HEAD, lead-reproduced. |
| `G-CSS-SPLIT` | No single emitted stylesheet exceeds 128 KB. | **RED — 318,630 bytes.** |

**π/DELTA:** all four cells on `/`, `/substrates/aurora`, `/dock/overview`. The webkit cells are
*currently uncapturable* — that is this wave's proof of completion.

**Honesty note.** Playwright's WebKit is the engine build, not the shipping Safari app. This wave carries a
standing obligation to re-confirm on **real Safari** via `safaridriver` once the owner enables Safari →
Settings → Developer → *Allow Remote Automation*. Until then no wave may claim a Safari result.

## W-PKG-TRUTH — the published package is broken

**Owns:** family A, L-10, Z-7.

7.0.0 is live on npm and a README-conformant install produces a main entry that throws (the root barrel
hard-requires a peer declared **optional**), while the entire type surface is empty under `node16`/
`nodenext`. `@mkbabb/glass-ui/styles` silently overrides a consumer's Tailwind `@theme`
(`--spacing`, `--radius*`, `--text-base`, `--container-lg`, `--font-weight*`). 143 of 172 no-fallback
custom properties in `./styles.css` resolve to nothing. The one dynamic-import optionality boundary has no
rejection handler. 26.6 KB of component CSS ships unreachable from any export entry. The root barrel is a
**wildcard re-export**, so undocumented symbols joined the public API.

**The change.** Make the optional peer genuinely optional or genuinely required — no third state. Fix type
resolution under `node16`/`nodenext`. Namespace or drop every `@theme` token that is not ours to set.
Give every published custom property a fallback or delete it. Add the rejection handler. Drop unreachable
CSS from the tarball. Replace the wildcard barrel with an explicit export list.

**The peer is `@mkbabb/keyframes.js`, not `value.js` — lead-corrected against the built artifact.** The
audit misattributed it. Walking `exports["."] → dist/glass-ui.js` (65 modules): value.js is **not**
statically reachable from the root entry; keyframes.js **is**, via
`glass-ui.js → button-*.js → useLiquidPress-*.js → useSpring-*.js`, whose line 3 reads
`import { SpringProgress } from "@mkbabb/keyframes.js"` (source
`src/composables/motion/spring/useSpring.ts`), while `peerDependenciesMeta` marks it `optional: true`.

The chain runs through **`Button`** — an unconditional root export and the most-used component in the
library — so a conformant install without the peer throws on import of *any* root symbol. Either
`useSpring` loses its static keyframes.js dependency (a local damped-harmonic solver already exists in
`scripts/regen-spring-tokens.mjs`, and `MOTION-CANON.md` §0 reproduces the shipped generator exactly), or
keyframes.js stops being declared optional. **`value.js` needs no action here — its quarantine is real and
the built graph confirms it.**

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-PACK-INSTALL` | `npm pack`, install the tarball into a clean fixture with **no optional peer**, `import { Button }` — resolves, type-checks under **`moduleResolution: node16`**, does not throw. The fixture uses its own tsconfig, never the repo's. | **RED, both arms lead-reproduced** — runtime throws via the keyframes.js chain; `tsc` under node16 emits `TS2305: Module '"@mkbabb/glass-ui"' has no exported member 'Button'` while the same probe under `bundler` is clean. |
| `G-THEME-BLEED` | The published `./styles` declares no `@theme` token outside the `--glass-*` / `--paper-*` / `--spring-*` namespaces. | **RED — overrides `--spacing`, `--radius*`, `--text-base`, `--container-lg`, `--font-weight*`.** |
| `G-BARREL-EXPLICIT` | The root barrel contains zero `export *`. | **RED.** |
| `G-BUNDLE-RATCHET` | Tarball bytes ≤ the value in `.bundle-ratchet`; the file may only decrease without an owner mark. | authored GREEN at the current figure — a **ratchet**, cures Z-7 |
| `G-SURFACE-OWNED` | `tests/public-surface.spec.ts` has a named owner of record, and any commit widening the root barrel must touch it in the same commit. | **RED — the pin is owned by no wave; two symbols widened the root and it was never updated.** |

### The release gate is armed and pointed at a RED suite (`BJ-1`) — lead-verified

This is the single most immediate ship-blocker in the tranche, and it was verified directly rather than
inherited:

```
src/composables/glass/index.ts:38
    export { armGlassRefract, supportsBackdropRefract } from "./supportsBackdropRefract";
git show HEAD:tests/public-surface.spec.ts | grep -c armGlassRefract   →  0
npx vitest run tests/public-surface.spec.ts                            →  2 failed | 160 passed
.github/workflows/release.yml:48   run: npm test
.github/workflows/release.yml:50   run: npm publish --ignore-scripts --access public --provenance
```

`BJ.W-REFRACT-LATCH` widened the package root; the surface pin is a cross-cutting invariant owned by **no
wave in the tranche**, so the wave self-certified GREEN against its own band gate and left the pin RED. The
mechanism generalises past this instance: **a band gate cannot certify a cross-cutting pin.** Either the two
symbols join `rootRuntimeExports` or they leave the root barrel per the intended bootstrap contract — but
the wave that widens a surface must own the pin that describes it.

**Breakage:** the wildcard removal drops undocumented symbols. Rides 8.0.0 with a named migration row.

## W-GATE-TRUTH — the battery does not exist, and where it does it is RED

**Owns:** family E, Z-1, Z-2, L-12, Y-2, Y-6.

The governed-gate apparatus exists **only in the working tree** — HEAD has no battery. What runs is RED
(2 failed / 60 passed), one failure being a governed seat with a stale roster row. `caseIdentity` — the
anti-erosion device — is a static-vs-static string compare with zero runtime binding. Raw-regex-over-source
gates cannot tell a live CSS rule from a commented-out one, and the orphan-CSS reach walker counts
**commented-out imports as live graph edges**. `placeholder-contrast.test.ts` computes no contrast. The
"≤60 gates" collapse was a labelling change: 48 governed seats inside a 2,614-assertion battery. 176
Playwright specs exist and **exactly one** is reachable from any runner; 16 are `_`-prefixed one-off
tranche captures. The `./styles.css` manifest gate returns **green when its artifact is absent**. Both
vitest projects run the whole suite, so every test executes twice under `EventTarget` monkey-patching.

**The change.** Commit the apparatus or delete it — the working-tree state is not a third option. Then cut
to the keep-list: 40–60 gates, each guarding a product invariant, each with a mutation proving it fails.
Delete the 16 throwaway capture specs and either wire the Playwright suite to a runner or delete it. Fix
the vitest project split. Make close stamps machine-emitted (Law 4).

**The CSS-reachability invariant is a union.** `@import` closure from `src/styles/index.css` reaches 110 of
124 `src/**/*.css`; the other 13 are reached by SFC `<style src="./styles.css">`; `fonts.css` is a
deliberate separate export. A gate modelling one mechanism false-positives, the other false-negatives.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-BATTERY-EXISTS` | The governed battery is tracked at HEAD and `npm test` exits 0. | **RED — untracked; suite RED.** |
| `G-GATE-BUDGET` | Governed gate count ∈ [40, 60]; adding one requires retiring one. | **RED — 1,095 cases.** |
| `G-MUTATION-BITE` | Every governed gate has a recorded mutation that flips it RED; the harness re-runs them. | **RED — tautological assertions present.** |
| `G-CSS-REACH-UNION` | Every `src/**/*.css` is reachable by `@import` closure **or** by SFC `<style src>`; both are modelled; comments are stripped before the walk. | **RED — walker counts commented-out imports.** |
| `G-DOC-CONSTANTS` | Every constant quoted in `README`/`DESIGN.md`/`docs/canon` matches source. | **RED — see family L.** |

**π/DELTA:** none (non-visual).

## W-PROCESS-CURE — make the disease structurally impossible

**Owns:** family X, Z-4, Z-6.

The five laws of `REFINEMENT.md` §2, as hooks and scripts rather than prose.

**The change.**
1. `commit-msg` hook: reject a commit citing a document not committed in the same tree. (240 untracked
   governing documents were cited as binding; a commit exists solely to retract a status claim describing
   uncommitted bytes.)
2. Close stamps emitted by script from commit trailers and gate exit codes. **A stamp naming a SHA not
   reachable from the default branch fails** — that is Z-4's cure (H and I closed on a branch that never
   merged).
3. Status vocabulary reduced to what a runner emits: PASS / FAIL / ABSENT. (Z-6.)
4. Convergence measured on the content-only projection; provenance to a sidecar; round cap 3; exit
   artifact is a merged commit.
5. Doc-budget check at close: tranche doc lines ≤ 0.25 × the `src` lines the tranche changed.
6. **Delete the model-caste routing.** Opus 5 for all tasks. A route to a seat with no landed commits is a
   hard failure. Enforce the model trailer in `commit-msg` or delete the law — advisory rules are pure
   adjudication surface (it is 0.5% enforced and has cost multiple documents).

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-CITE-COMMITTED` | No commit body cites a path absent from its own tree. | **RED — steers 10–34 untracked and cited.** |
| `G-STAMP-EMITTED` | Every wave close stamp is script-generated and names a reachable SHA. | **RED — hand-authored.** |
| `G-DOC-BUDGET` | tranche doc lines ≤ 0.25 × `src` lines changed. | **RED — BJ is ≈43:1 the wrong way.** |

---

# BAND 1 — REDUCTION

## W-DELETE — execute the deletion rows

**Owns:** C-1…C-5, Y-7. Every row closed by the owner's own words (`ASK.md` §closed).

Delete from `src/`, `demo/`, `package.json` exports, and the story manifest, atomically per component:
`instrument-chassis`, `metric` (pending `ASK.md` R-1), `completion-seal`, `deck` (zero usage sites
anywhere), `carousel` (below the ≥2 bar; relay names `words`), the six `compositions` pages and the
category, and the `motion/tempo`, `motion/reveal`, `motion/scroll` pages. Land the **relocations**
`BJ.W-REDUCE-DELETE` skipped — a CSS register currently cites a module it deleted.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-NO-ORPHAN-EXPORT` | Every `package.json` export subpath resolves to a built file, and every deleted component is absent from `src/`, `demo/`, exports, and the manifest. | **RED — all named dirs present and exported.** |

**π/DELTA:** `chromium-desktop`+`mobile` on the story index before/after (route count falls).
**Breakage:** rides 8.0.0 behind `R-PUBLIC-8-LEDGER`; the sibling census is re-run **fresh at ship**, never trusted from formation time.

## W-DEAD-EXPORT — 118 exports with no internal consumer

**Owns:** C-6, C-7, C-8.

There is an export-reachability gate for CSS and **none for TS/JS**. 118 runtime exports have zero internal
consumers; 5 are 100% dead. Four published motion composables (627 lines) have no `src` or `demo` consumer.
`engageEnvelopes.ts` is a 117-line published register whose only reader is a test asserting it against
constants declared beside it.

**Born-RED gate:** `G-EXPORT-REACH` — every runtime export has ≥2 sites, or is demo-exercised and
documented, or is absent. **RED — 118 violations.**

## W-SHIM-PURGE — the no-legacy edict, enforced

**Owns:** family D (D-1…D-7).

Delete `floatingContentAttrs` (a 30-entry retired-prop deny-list applied at runtime on 6 components that
silently swallows `asChild`); `useCanvasLifecycle` (alias-of-record on two public subpaths, zero
consumers); the 8 re-export shims; the dead `dprPolicy` branch; two of the three `NATIVE_SCROLL_TIMELINE`
ladders; the three `void`-kept dead meta-arrays in `_shared/axes.ts`; the consumerless `touch-hit-area`.

**Born-RED gate:** `G-NO-SHIM` — zero re-export-only modules, zero runtime deny-lists of retired props,
zero `void`-kept dead arrays. **RED — each enumerated above with its file.**

## W-SELECTION-ONE — one selection engine

**Owns:** D-6. `useSelectionGroup` documents itself as the ONE engine for dock + SegmentedTabs +
ToggleGroup; **SegmentedTabs bypasses it.** Either it is the engine or the claim is deleted.
**Born-RED gate:** `G-ONE-SELECTION` — no component implements roving selection outside `useSelectionGroup`. **RED.**

## W-DAG-REDUCE — the ruthless purge, re-authored

**Owns:** C-9, Z-3, J-3, A05.
**Runs LAST in Band 1, and only after `W-COMMENT-DIET`.** This is a hard edge, not a preference — see below.

**Two adversarial critics independently rejected this wave's first formulation.** `REDUCTION.md` §1 records
every killed claim with its refuting command. The three that matter here:

- The **−6,000 procedural restructure is fiction.** `src/composables/glass/webgpu/` already exists at
  1,228 LOC inside a 4,740-LOC shared substrate, and all four fields already compose it. The residue is
  1,921 LOC of per-shader uniform packing; realistic ceiling ≈ **−800**. That claim was 46% of the headline.
- **Six of thirteen proposed folds are refuted by a capability the target cannot express** —
  expandable-container, scroll-progress-rim, search, table, alert, infinite-scroll.
- **The frontier was ranked by a metric that is one-third prose.** `src/components/` is 34.0% comment;
  the dock is 51.7%; `src/styles/tokens/` is 72.8%. Ranking by raw LOC is how a 74-line `budget.ts` leak
  scored as a 21,000-line restructure.

**The re-authored charter.** Apply the ≥2-consumer bar **once**, terminally, against
**comment-normalised** line counts and against `src/composables/glass/` as the *starting state* — retiring
the immortal `min-consumers` book that has ridden 10–11 tranches (Z-3). Lead census at HEAD:
**42 of 62 components (38,204 LOC, 67% of the component tree) have zero `src/` consumers.** The three never
examined by any prior tranche are named explicitly and decided here: `constellation` (2,442 / 2 stories),
`fourier-field` (2,885 / 2 stories), `typewriter` (1,409 / 1 story).

**Survives from the original proposal** (both critics converged on the same list): `useTabRovingFocus` out
of `components/tabs/` (a verified layering inversion — `useSelectionGroup.ts:13` imports from a *component*
tree); `aurora/constants/budget.ts` → `composables/glass/budget` (74 lines, 4 importers, one commit); the
`_shared/feedback` tone consolidation **without** deleting alert; deleting `paper-backdrop` /
`header-ribbon` / `animated-digit`.

**`useDockAwareSurface` is deferred to after `W-DOCK`, by ruling.** The leak set is real and verified — five
components import `../dock/composables/dockContext`, slider additionally imports `useDockHold`. Extracting
the shared surface *first* would cement the contrived API into the shared layer before it is replaced.

**Owed and never previously accounted:** `package.json` declares **72 subpaths**. Every delete or demote
removes a published entry point plus its `typesVersions` row; `configurator` is additionally a root-barrel
export. No prior "what breaks" column named this.

**Born-RED gates:**

| gate | assertion | RED at HEAD |
|---|---|---|
| `G-OVERFIT` | Every `src/` artefact has ≥2 sites, or is exported and earned, or is a named private demo helper. | **RED** — 42 of 62 components have zero `src/` consumers; `F2` finds 118 runtime exports with no internal consumer and 5 that are 100% dead. |
| `G-NO-INWARD-DOCK` | No component outside `src/components/dock/` imports from it. | **RED** — 5 components import `dockContext`; slider imports `useDockHold`. |

## W-TIMELINE — greenfield

**Owns:** C-5, K-6. F16: "very poorly defined, buggy, and likely many facilities overfit? Redesign from the
ground up." Five variants ship at HEAD (2,254 LOC; the largest component stylesheet in the bundled demo at
13,887 bytes). Collapse to one continuous Timeline; the scrubber is a Slider in disguise and the segmented
variant is consumerless — the wave proves or refutes both before cutting. The keyboard scrubber must show
its value (K-6).

---

# BAND 2 — MATERIAL

## W-AURORA-MEDIUM — the primary paints worse than its own fallback

**Owns:** B-1, B-2, B-3. **This is F08's root cause and A13's blocker.**

`src/components/aurora/constants/shaders/aurora-mediums.wgsl.ts:399-401` — on the WebGPU primary, mediums
3 (oil), 5 (vangogh), 6 (oil-pastel) and 7 (kuwahara) all `return mediumKuwahara(col, p, t)`. Four named
mediums render identically. The file's own comment concedes the WebGL2 fallback carries the full per-dab
stroke cascade. Live: `[data-renderer="webgpu"]` is the live path.

**The change.** Port the per-dab stroke cascade to WGSL so oil, van-Gogh and oil-pastel are genuinely
distinct — the owner's A13 asks for exactly these three. Then, and only then, judge preset duplication.
Fix `data-state` reaching a terminal value.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-MEDIUM-DISTINCT` | Any two distinct `medium` values produce a mean-pixel-delta above threshold on the **same renderer**. | **RED — 4 mediums identical on WebGPU.** |
| `G-PRIMARY-NOT-POORER` | For each medium, the WebGPU render is not measurably less detailed than the WebGL2 render. | **RED.** |

**π/DELTA:** paired per-medium captures, both renderers, all four cells. **F08 is not discharged by a
preset cut** — it is discharged when the mediums differ.

## W-FROST — blurred and frosted, not shiny and bright

**Owns:** I-1, I-2, I-3, I-6, Y-5, and L-3's coupled doc repair.

F48's headline — "glass blur for ALL glass components slightly more subtle" — **shipped as prose with zero
value change.** The owner 2026-07-24: our tabs and slider glass are "far too trite, shiny, and bright — not
like blurred and frosted glass"; the iOS-27 micro demo's glass is good, and F1's glass is good — **so the
target exists in-repo and the delta is measurable against it.**

The exemplar supplies the law: **content is never frosted, chrome is never solid; the world is DIMMED,
never blurred; all frost is plate-local.** The Photos scrim is a pure black-alpha dim to α≈0.45–0.55 with
**no blur component at any frame**, and hue, chroma and small text stay legible through it.

Also executes `ASK-26`'s recorded DECLINE, which was ruled and never run (Y-5): strip the `--glass-halo-*`
cohort and its test. **No chrome-special behaviour** — any engine-conditional glass arm is a defect (I-3).

### The frost target is now a measured quadruple, not an adjective

`IOS27-ARCHIVE.md` §1/§5i photometrically measured transmission through the iOS Maps detent sheet over a
live map — the operational definition of "blurred and frosted" versus "shiny and bright":

| channel | measurement | reading |
|---|---|---|
| mean luminance | 114.3 → 111.6 (**−2%**) | the glass is **near-transparent to overall brightness** |
| standard deviation | 55.6 → 44.4 (**80% kept**) | large-scale structure survives |
| high-frequency detail (mean \|dI/dx\|) | 9.87 → 1.01 (**10% kept**) | fine detail is destroyed — this is the blur doing its job |
| saturation | 0.127 → 0.206 (**+62%**) | colour is **amplified**, not muted |

> **iOS glass is near-zero veil + heavy blur + strong saturate. Ours is a milky veil — a
> `color-mix(--card, transparent)` at high opacity. That is the whole of "trite, shiny, and bright."**

The corrective finding: **our blur radius is not the problem.** `--glass-blur-quiet-radius: 7px` sits
inside the measured iOS band. The defect is the veil opacity (`tokens/glass.css:314-316`,
`--glass-bg-quiet` / `--glass-bg-floating`) and an absent saturate arm.

### THE MECHANISM, MEASURED LIVE — the two named components have no frost at all

Computed styles on the running built demo (Chromium 1440×900), on exactly the two surfaces the owner named:

| surface | `backdrop-filter` | `background` | the shine |
|---|---|---|---|
| `.segmented-tabs` (`/navigation/tabs`) | **`none`** | `color(srgb 0.992 0.961 0.925 / 0.5)` | `rgba(255,255,255,0.30) 0 1px 0 0 inset`, plus `rgba(255,255,255,0.18) -1px 0 …` |
| `.glass-track-well` (`/forms/slider`) | **`none`** | `color(srgb 0.965 0.953 0.937 / 0.5)` | — |
| `.glass-liquid-fill` (the slider's *fill*) | `blur(7px) saturate(1.4) brightness(1.02)` | `oklab(0.88 …/0.88)` | — |

> **Neither named surface is glass.** Both are ~50% opaque cream veils with **no blur whatsoever**, and the
> tabs plate carries **white inset specular highlights** at 0.30 and 0.18 alpha. That is the whole of
> "far too trite, shiny, and bright — not like blurred and frosted glass": there is no frost to be
> unfrosted, and the brightness is a literal white inset edge.

The slider is internally inconsistent in a way that proves the diagnosis: its **fill** is properly frosted
(`blur(7px) saturate(1.4)`) while the **track it sits in** has no `backdrop-filter` at all. The component
already contains the correct material one element away from the wrong one.

This also settles which half of §the frost target is actionable: **the blur radius genuinely is not the
defect** — where blur exists it is 7px, inside the measured iOS band. The defect is that the ladder's
frost is *absent* on these plates and replaced by a veil plus a specular rim.

**The change, made specific.** `.segmented-tabs` and `.glass-track-well` adopt a real ladder rung
(`--glass-blur-quiet` at minimum), drop the veil alpha toward the measured transmission target, and delete
the white inset highlights — the specular rim is a hairline and stays one. Neither should mint its own
material; both are control surfaces and belong on `control-surfaces.css`.

### ⚠ CONTRADICTION — recorded, with the instrument that settles it

`MOTION-CANON.md` §9 item 10 rules that on warm cream a bright specular rim plus high saturate reads as
**plastic**, and prescribes pulling `--glass-saturate-*` **down** on the calm rungs. `IOS27-ARCHIVE.md`
§5i measures transmission saturation at **+62%** and prescribes raising it. **Both are lead-authored, both
carry evidence, and they prescribe opposite directions on the same token.**

They are not straightforwardly reconcilable and neither is discarded here. The resolution is instrumental,
not rhetorical: **the quadruple above becomes the gate, and it decides the token values.** Ship whatever
`(veil, blur, saturate)` triple lands our surfaces inside the measured band over a live substrate — and if
no triple satisfies both the quadruple and the cream-plastic read, that is a real finding about our
substrate differing from iOS's saturated wallpaper, and it gets recorded as one rather than argued.

**The saturate direction is not settled by this document.** It is settled by the first paired capture.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-FROST-TRANSMISSION` | Over a live substrate, every frosted rung keeps ≥70% of backdrop σ, ≤20% of high-frequency detail, and shifts mean luminance ≤10%. Measured, not asserted. | **RED — the milky veil fails the luminance arm; the missing saturate fails the chroma arm.** |
| `G-GLASS-HAS-FROST` | Every surface carrying a glass class resolves a non-`none` `backdrop-filter` in the browser. | **RED, lead-measured live** — `.segmented-tabs` and `.glass-track-well` both compute `backdrop-filter: none`. |
| `G-NO-WHITE-SPECULAR` | No glass surface declares a white inset `box-shadow` above 0.12 alpha. | **RED** — `.segmented-tabs` carries `rgba(255,255,255,0.30) 0 1px 0 0 inset`. |
| `G-RUNG-ONLY` | Every glass surface resolves to one of the five ladder rungs; a one-off blur literal in `src/` fails. | **RED — raw literals present.** |
| `G-SCRIM-NO-BLUR` | Modal/popover scrims apply opacity only, never `backdrop-filter`. | **RED** — `dialog/ModalOverlay.vue:83` applies `[backdrop-filter:var(--glass-blur-wash)]`. |
| `G-NO-ENGINE-BRANCH` | Zero engine-conditional branches in glass CSS or glass composables. | **RED.** |

`G-SPECULAR-CEILING` is **struck** — it was authored against "the in-repo reference surface," which is an
adjectival target. `G-FROST-TRANSMISSION` replaces it with a measurement.

**π/DELTA:** all four cells, light and dark, on `/navigation/tabs`, `/forms/slider`, `/containers/dialog`,
`/feedback/alert`. F28 is discharged by `G-RUNG-ONLY` — that is what "ensure this is intentional" means.

## W-RADIUS-ROLE — radius expresses role

**Owns:** I-4. F09, F12, F15, F17, F19, F45, CFR-01. Alert is byte-identical to the complaint state and
still rounds at 10px against the 16px card canon.
**Born-RED gate:** `G-RADIUS-ROLE` — every radius resolves to a role token (`card` / `field` / `pill` /
`control`); zero raw radius literals in `src/`. **RED — SortableList `999px`, segmented raw radii, Alert 10px.**

## W-GRADIENT-BLUR — the focus primitive

**Owns:** I-5, F49/F50, and the ChatGPT slider's attention gradient. The mechanism question — *graded blur
radius* vs *uniform blur under a gradient mask* — is settled by `MOTION-CANON.md` §5 from the IMG_2287/2288
analysis, and the wave implements whichever it proves. Consumers: popover, dialog, drawer, slider-engaged.
**Born-RED gate:** `G-GRADIENT-BLUR` — the primitive exists, is token-driven, and is applied at its named
consumers. **RED — absent.**

## W-REFRACT-LATCH — already chartered; this supplies its exact born-RED

**Owns:** D-8. At HEAD `armed = true` is set **before** the throwing probe and the negative arm never calls
`removeAttribute`, so a stale `data-glass-refract="on"` survives an honest rejection. The ~20-line cure
exists **uncommitted** in the working tree. The multi-Document defect — module-global `armed`
(`supportsBackdropRefract.ts:52`, guard at `:144`) — survives in **both**, so a second Document (iframe,
multi-root SPA, test host) never arms.

**The change.** Commit the working-tree cure; move `armed` off the module global to per-Document state.
**Born-RED gate:** `G-REFRACT-TOTAL` — a negative arm strips the attribute; a throwing probe leaves `armed`
clear; a second Document arms independently. **RED on all three at HEAD.**

*This wave is the tranche's proof that Law 3 works: 43 documents and 13,264 lines did not land 20 lines.*

---

# BAND 3 — MOTION

## W-SPRING-RETUNE — four of eight springs are monotone

**Owns:** G-1, and L-4's coupled doc repair. `smooth`, `press`, `dock`, `orb-drop` ship `overshoot +0.0%`
while their register text promises weight and rebound; `scheme-spring.css` itself says such a row "is a row
to RE-TUNE". Nobody did. Every motion wave inherits this until it is fixed, so it lands first in the band.

**The diagnosis changed under measurement, and the change matters.** `MOTION-CANON.md` §0 derives the
governing identity: a row's peak appears in its shipped curve **iff `M > B`**, where `M = exp(-ζπ/√(1-ζ²))`
and `B` is the settle band the `linear()` is normalised over. At `B = 2%` that is ζ < 0.78. **There is no
"tiny rebound" region** — a spring either bounces visibly (ζ ≤ 0.62) or lands dead (ζ ≥ 0.78); between them
the peak arrives in the last 10–20% of the clock, a late tick, the worst read of the three.

> **The four monotone rows are therefore not a tuning bug. They are the table honestly refusing to ship a
> curve that cannot exist.** The fix for `press` is to **delete the false claim, not to lower the damping.**

The real defect the exemplars force is different and was not previously seen: **the 2% settle band is
calibrated for a press and is wrong for a large-amplitude row.** 2% of a 0.04 scale delta is invisible; 2%
of a 425px stroke is 8.5px, plainly visible. The Siri results expansion measured **475ms** visual settle
against a 302ms 2%-band settle — the eye read settle at ≈0.5%.

**The change.** Add `settleBand: 0.02 | 0.005` to `SpringPresetRow`; `regen-spring-tokens.mjs` feeds it to
both the `linear()` horizon and the `-settle` token, so curve/clock parity survives untouched. **Eight rows
become six**, each owning exactly one job:

| row | response | ζ | band | settle | peak | the one job |
|---|---|---|---|---|---|---|
| `press` | 0.20 | 0.80 | 2% | 0.12s | monotone | the touch answer |
| `transient` | 0.22 | 1.00 | 2% | 0.20s | monotone | the anchored materialization |
| `dock` | 0.30 | 0.88 | 2% | 0.21s | monotone | the coordinated travel |
| `panel` | 0.40 | 0.71 | 0.5% | 0.45s | **+4.2% at 53% of clock** | the fired deploy |
| `bloom` | 0.42 | 0.90 | 0.5% | 0.37s | monotone | the room-sized growth |
| `world` | 0.48 | 1.00 | 0.5% | 0.57s | monotone | the world's recession |

**Exactly one row rebounds, and it is the long stroke.** Across five exemplars and ~40 quantified channels
the maximum observed positional overshoot is **4.7%**, on a clip edge. `bouncy`'s 9.5% is above the entire
measured corpus — that is our error, not the exemplar's. Deleted: `smooth` (30 refs), `snappy` (74),
`bouncy` (17); `orb-drop` → `transient` (it had **zero** consumers), `gentle` → `world`. Riders rehomed per
`MOTION-CANON.md` §1.

Validation against disk before any edit: `dock (0.35, 0.82)` → 0.219s (file says 0.22s ✓); `gentle (0.82,
1.00)` → 0.761s (0.76s ✓); `orb-drop (0.22, 1.00)` → 0.204s (0.2s ✓). The solver reproduces the shipped
generator, so the new rows are predictions the generator will confirm or refute.

**Born-RED gates:**

| gate | assertion | RED at HEAD |
|---|---|---|
| `G-SPRING-HONEST` | A preset's register text may mention rebound **iff `M > B`** for its own row. Presets are regenerated from the table, never hand-edited. | **RED — 4 rows.** `springPresets.ts:120` says `press` has "a subtle rebound" at ζ=0.80, where M=1.5% < B=2%. |
| `G-SPRING-ONE-JOB` | No two rows own the same job; every row has ≥1 rider. | **RED** — `orb-drop` and `panel` have zero CSS consumers; `smooth`/`press` and `snappy`/`dock` duplicate jobs. |

**Coupled doc repair (L-4):** `DOC-4` — DESIGN.md's spring table is wrong on **all four** damping ratios,
all three overshoot figures, and quotes `linear()` payloads that no longer exist. `utilities/base.css:~185`
asserts `--spring-smooth` is ζ=0.86; disk says 0.80. Both regenerate from the table or are deleted.

## W-ENGAGE-LADDER — breath of life, made checkable

**Owns:** G-2, A01, A11, R-4. Neither slider variant the owner specified exists in the type surface;
`BI.W-ENGAGE-AFFORD` is spec-only with zero implementation on any mainline.

Implements the ladder from `MOTION-CANON.md` §4: rest → hover → press → engaged → modal, each rung with a
stated magnitude and curve. Ships the slider **grow-on-engage** and the **modal-expansion** variants,
stacked, as the owner specified. At-rest posture follows `ASK.md` **R-4**.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-ENGAGE-RUNG` | Every interactive component implements ≥1 engagement rung beyond hover, from the shared token set. | **RED.** |
| `G-ENGAGE-PRM` | Every rung has a `prefers-reduced-motion` terminal-parity arm. | **RED.** |

**π/DELTA:** rest vs engaged, all four cells, on slider, button, tabs, dock control.

## W-FEEDBACK-MOTION — toast, progress, skeleton

**Owns:** G-3. F20 (toast "awful; should be exactly like our refined dialog"), F21 (scroll-progress rim
broken), F22 (loop jitter), F24 (skeleton too slow). Toast adopts the canon's entry grammar — plate
materialises in place from the anchor origin, scrim dims without blur, exit is fade-led and never springs.

## W-ROUTE-MOTION — story and dock page transitions

**Owns:** F-4. F06 and F07 are **byte-identical to the complaint state**. One typed transition grammar,
one mechanism per nav class. F06's "flash the screen" is a paint-order defect, not a duration defect —
the wave proves which before tuning anything.
**Born-RED gate:** `G-NO-FLASH` — no route change produces a frame whose mean luminance deviates beyond
threshold from both its endpoints. **RED.**

## W-DISSOLVE — the iOS-27 vaporize

**Owns:** the owner's "notification vaporizing and dissolving effect… should be re-deployed in our own
facilities". Mechanism from `MOTION-CANON.md`. Consumers: toast dismissal, notification dismissal, and the
close-affordance the owner marked (the `×` sitting **on** the corner border, partially outside the element).

## W-HANDMARK — greenfield

**Owns:** G-4. F34–F40; owner ruling 2026-07-17 grants **full first-principles surface authority**.
Byte-identical to the pre-feedback commit. Live at `/motion/handmark`: the underline under "future"/"here"
renders as **two disjoint segments with a visible gap and blunt chopped ends**, uniform stroke width, no
pressure or velocity taper. Remove all meta-text ("SE") per F40.
**Born-RED gate:** `G-INK-CONTINUOUS` — a mark spanning N words emits one continuous path with
velocity-tapered width and no inter-segment gap. **RED.**

---

# BAND 4 — DOCK

## W-DOCK — greenfield the contrived API

**Owns:** H-1, H-3, K-7. Owner 2026-07-24: *"The dock API likely is fully contrived and should be
replaced."* 7,974 LOC · 45 files · 20 CSS partials · 19 props · live class soup `expanded pinned
always-expanded`. Its `index.ts` is a manifesto of retirements. The pinned state has no keyboard path.

`useDockOrientationMorph` was retired on the claim that *"the platform cannot continuously interpolate a
flex-column→row topology change."* The Music exemplar shows the claim is **true but irrelevant**: iOS never
interpolates layout topology either — it measures two end states and bridges them with transform +
crossfade. The retirement conceded a capability to a constraint that was never binding.

**The change.** Replace with the primitive set in `MOTION-CANON.md` §6 and the cross-fold's dock section.
Public API stated in full, in one file, with every prop earned.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-DOCK-SURFACE` | `GlassDock` exposes ≤8 props, each with ≥2 sites or a documented consumer. | **RED — 19.** |
| `G-DOCK-KEYBOARD` | Every dock state, including pinned, is reachable and operable by keyboard. | **RED.** |

## W-DOCK-FISSION — restore what was wrongly retired

**Owns:** H-2. `useDockFission` + `DOCK_SPLIT_SIGNATURES` are DEFINITION-ABSENT, retired as "a demo-only
spectacle AND the prime Safari suspect" — and the owner now names fission/fusion, the double dock, and
orientation/size flexibility as **the headline capability**, citing the Music dock.

The Safari half of the rationale is answered by construction: the retirement's stated risk was stacking
goo `filter:url()` over `backdrop-filter`, and the exemplar achieves fission with **transform + crossfade
over measured end states**, no SVG filter at all.

Delivers: the double dock (now-playing stacked on the main dock at rest) → scroll collapse into one →
fission (controls gird left, search girds right, now-playing centre), choreographed as one timeline.
Measured target: member travel 250–350 ms on spring(0.30–0.35s, ζ 0.85–1.0).

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-FISSION-EXISTS` | The dock expresses ≥2 simultaneous islands from one source roster, and returns to fusion. | **RED — definition-absent.** |
| `G-NO-STACKED-URL-FILTER` | No dock surface composites `filter: url(#…)` over `backdrop-filter`. | authored GREEN — a **fence**, stated honestly as such |

**π/DELTA:** the full choreography as a frame sequence, all four cells.

## W-DOCK-OVERFLOW — the affordance F47 asked for

**Owns:** H-4, H-5. F47: a scrolling dock gives no indication that more items exist, and clicking an
edge-occluded item does not scroll the dock to it. F27: the horizontal dock is still a vertical scroll
container by a CSS coercion its own source comment acknowledges and does not fix. **Live-verified:** at
`/motion/handmark` the dock clips its own active label ("Hand Mar…").
**Born-RED gates:** `G-DOCK-EDGE-HINT` — an overflowing dock renders a directional affordance at each
overflowing edge (**RED**); `G-DOCK-RECENTER` — selecting an edge-occluded item scrolls it fully into view
(**RED**); `G-DOCK-AXIS` — a horizontal dock does not scroll vertically (**RED**).

---

# BAND 5 — STORY

## W-PREVIEW-CARD — author the tiles the ladder already resolves

**Owns:** F-1, F-2. F01, F02 and F46 are **one defect**.

**The machinery is already correct** — this is the wave's most important fact and it was misdiagnosed
twice. `SectionPreviewCard` implements a four-rung ladder (`demo/chassis/landing/storyTile.ts:41-52`):
`authored` (a co-located `<cat>/<id>.tile.vue`) → `still` (a frozen data-URI raster for GL routes) →
`identity` (the terminal floor: a div containing only the story's title). `demo/stories/manifest.ts:158`
already ships the `./*/*.tile.vue` glob and its resolver. Nothing is broken.

**Only 4 `.tile.vue` files exist for 120 stories.** Live-measured across all twelve landings: **98 cards —
88 `identity` (90%), 6 `still`, 4 `authored`.** Eight landings are 100% blank; only `/substrates` is
fully populated, because its GL routes have frozen rasters. F02 — "most of the cards are blank white" — is
a **content** gap, not a component defect.

**The change.** Author the missing tiles. Each is a bounded, inert, 0-GL vignette of its story's headline
component — the four that exist are the pattern. For GL/substrate routes, extend the frozen-still registry
rather than authoring a live tile. Delete the duplicated title: the `identity` rung prints the story name
inside the tile and the card prints it again immediately below, which is F10's "clearer hierarchy" in
miniature. Then deliver F01's expressive sizing — varied tile sizes, masonry — and stop clipping
descriptions at the fold.

**Born-RED gates**
| id | assertion | RED at HEAD |
|---|---|---|
| `G-TILE-COVERAGE` | Every landing card resolves to `authored` or `still`; the `identity` rung is reachable only as a genuine error floor and is unused in a healthy tree. | **RED — 88 of 98 cards are `identity`.** |
| `G-NO-DUP-TITLE` | No card renders its title more than once. | **RED — identity tile + `<span>` both print it.** |

**π/DELTA:** `/`, `/foundations`, `/motion`, all four cells. **`W-PERF` re-measures A17 after this lands** —
a blank tile is not slow, it is empty.

## W-STORY-TAXONOMY — the meta-framework (A06)

Codify the page types and standardise content, margins, padding, intro, scroll animation, hero, header and
code-context across every story. One chassis, N page types, zero bespoke pages.

## W-STORY-PROPORTION — aristotelian proportion (A10, F10, F14, F31, J-1, J-2)

Heroes burn 240–400px on a title plus one line and repeat the page name up to three times (`/substrates/aurora`
prints "Aurora" as title, eyebrow and section heading). **Delete the `optical-bench` hero ornament** — a
hand-authored `linear-gradient(102deg, …)` span with an organic border-radius, plus a `WatercolorDot` used
as a decorative `<span>` rather than mounted as a component (which is exactly why it has no procedural
hover). A library's landing page is built from its own primitives or from nothing.

**Born-RED gates:** `G-ONE-NAME` — a page prints its own name once (**RED**); `G-COLUMN-WIDTH` — at
1440×900 no story content column is narrower than 60% of the frame (**RED**); `G-MOBILE-FIT` — at 390×844
nothing overflows horizontally and nothing is occluded by the dock (**RED**). These three are F10, F14 and
F31's definitions of done, per `ASK.md` R-6.

---

# BAND 6 — STRUCTURE AND PERFORMANCE

## W-BOOT-SHELL — three seconds of empty DOM

**Owns:** family M rows M-1, M-2, M-3, M-6, M-7, M-8.

Measured against the built demo (`demo:dist:build` → `vite preview`) and the dev server, driven by
Playwright. **The app shows literally nothing for ~3 s**: mount is gated on the deepest lazy route chunk and
`index.html` ships no fallback shell. The bundle is **287 JS chunks with a 1,091-byte median** and one route
issues **104 requests** — 1.67 s of FCP is round-trip serialization, not bytes. The decorative shell WebGL
field sits **on the critical render path with no error boundary**, so a single failed chunk yields a
permanently blank app. Dev ships 16.8 MB / 303 modules per page (reka-ui and `@lucide/vue` through root
barrels, no `optimizeDeps`). The configurator sheet mounts on every route while never visible. The brand
woff2 lands at 3.7 s, past its own `font-display: optional` window, with no preload.

**The change.** Ship a static shell in `index.html` that paints before any chunk resolves. Raise the
manualChunks floor so the median chunk is a useful unit of work. Move the decorative field off the critical
path and behind an error boundary — **a decorative substrate must never be able to blank the product**,
which is the no-masking-fallback edict read in the other direction. Add `optimizeDeps` entries. Mount the
configurator lazily on first open. Preload the brand face or drop `optional`.

| gate | assertion | RED at HEAD |
|---|---|---|
| `G-FIRST-PAINT` | Something is painted within 1 s on a cold load of every route, with JS chunk delivery throttled. | **RED — ~3 s of empty DOM.** |
| `G-SHELL-SURVIVES-CHUNK-LOSS` | With the decorative field's chunk blocked, the app still renders. | **RED — permanently blank.** |

**π/DELTA:** cold-load filmstrip at 0/500/1000/2000/3000 ms, all four cells, before and after.

## W-FRAME-DISCIPLINE — no route ever goes quiet

**Owns:** family M rows M-4, M-5, M-10.

**Every page schedules rAF at display rate forever, including static specimen pages** — no route reaches a
quiescent frame. `/substrates/constellation` mounts **9 canvases** and runs at **27 fps** on a weak GPU
against a "one GL context per route" budget that is a doc comment, not an invariant. A per-frame
Vue-reactive inline custom-property write is unregistered (so it inherits) on a filtered element that also
carries a CSS transition on the same property.

**This wave is where BREATH OF LIFE gets its boundary.** `MOTION-CANON.md` §4 rules the tension explicitly:
breath is a **floor, not a loop**. A control at rest displays engagement by a non-zero material response to
the pointer field, truthful state reporting, and a ≤1-frame answer to any state change — **never** by a
decorative idle animation. Only an *ambient substrate* may idle, at sub-interactive tempo (period ≥1 s,
~10× slower than any gesture beat) with a clamped amplitude floor ≥0.30 of peak. A page that never goes
quiet is not alive; it is burning the user's battery to look busy.

| gate | assertion | RED at HEAD |
|---|---|---|
| `G-QUIESCENT` | Every route reaches a frame with zero scheduled rAF within 2 s of settle, absent pointer input. Ambient substrates idle at period ≥1 s and are exempt only where declared. | **RED — no route ever quiesces.** |
| `G-ONE-CONTEXT` | ≤1 WebGL/WebGPU context per route, enforced not documented. | **RED — 9 canvases on `/substrates/constellation`.** |

**π/DELTA:** a 5 s trace per substrate route, before and after, banked with the fps figure.

## W-COLOCATION — the A07 edict

Components colocated with their sub-components, composables, skeletons, constants and styles, recursively.
Only genuinely module-level composables remain in `composables/`; same for styles. Long directories broken
into cohesive modules.
**Born-RED gate:** `G-COLOCATED` — no component-specific module lives outside its component directory. **RED.**

## W-COMMENT-DIET — source is not a tranche document

**Owns:** X-4b, L-11, and half of the DOC family.
**PROMOTED. This wave runs in Band 1 and gates `W-DAG-REDUCE`.** It was drafted here as a Band-6 tidy-up;
both adversarial critics independently identified it as the largest and safest reduction in the library and
as a *precondition* for any size-ranked decision. Its position in this file is historical; its position in
the DAG is early.

Lead census at HEAD (`.ts`/`.vue`/`.css`/`.mjs`, block continuations counted):

| directory | non-blank | comment | code | share |
|---|---|---|---|---|
| `src/` | 80,117 | **31,539** | 48,578 | **39.4%** |
| `src/components/` | 52,932 | **18,018** | 34,914 | **34.0%** |
| `src/components/dock/` | 7,424 | **3,838** | 3,586 | **51.7%** |
| `src/styles/` | 11,953 | **7,433** | 4,520 | **62.2%** |
| `src/styles/tokens/` | 4,172 | **3,039** | 1,133 | **72.8%** |

**Three reasons this is early, not late:**

1. **It is larger than the entire reduction plan.** 18,018 comment lines in components alone, against a
   banked reduction of ~2,700 code lines — at zero API risk, zero consumer churn, no primitives, no fold
   order, no greenfields, and no export-map surgery.
2. **It is `W-DAG-REDUCE`'s input.** A frontier ranked by a number that is one-third prose is not ranked.
   `src/styles/tokens/` is 72.8% comment — the tokens are outnumbered three-to-one by commentary about the
   tokens.
3. **The prose is where the lies live.** This wave closes `DOC-1`…`DOC-14` (shipped documentation that
   contradicts HEAD: README imports two symbols that do not exist; DESIGN.md's z-index table is wrong on
   the six highest rungs, its glass-tier table lies about every blur radius and saturate factor, its spring
   table is wrong on all four damping ratios, and it documents ten retired components as current API). It
   also forces `G-3`/`G-4` — two gates that count **commented-out CSS as live**, so prose currently defeats
   the detectors.

**The change.** A comment states the contract, the invariant, or the trap. It does not state what the code
used to be, which tranche changed it, or that a rule was followed. History lives in git. The corpus records
53× "clean break", 48× "no alias", 24× "byte-isomorphic", plus obituaries for deleted files; 94 backticked
token references name registers that have since drifted.

**Born-RED gates:**

| gate | assertion | RED at HEAD |
|---|---|---|
| `G-COMMENT-RATIO` | Comment ≤ 20% of `src`; no comment names a tranche, wave, or round. | **RED — 39.4%.** |
| `G-DOC-TRUTH` | No shipped doc names a symbol, token or component absent from `src/`. | **RED** — see `DOC-1`…`DOC-14`. |
| `G-DETECTOR-BLIND` | No source-scanning gate counts a commented-out declaration as live. | **RED** — `G-3`, `G-4`. |

## W-REPO-WEIGHT — 4 GB of git for an 87k-line library

**Owns:** X-4c. **9,373 tracked images under `docs/tranches` totalling 2.7 GB**; all tracked images 4.2 GB;
`.git` **4.0 GB**; largest single asset 8.7 MB. Every clone, CI job and worktree lane pays it.

**The change.** Stop committing evidence to the product repo: captures go to a gitignored path (this
refinement's own audit matrix already does — 23 MB, outside the tree). Add the ignore rules. **Whether to
rewrite history to reclaim the 4 GB is an owner call** — it is the one irreversible action here, and it is
not taken without a mark.
**Born-RED gate:** `G-NO-EVIDENCE-COMMIT` — no image is added under `docs/`. **RED.**

---

# Cross-cutting: what no wave owns

Checked at the band fold. Anything visible in `REGISTRY.md` with no owning wave above is a silent drop and
is **close-blocking**. ~~At authoring time the list is empty; it is re-derived, not trusted, at close.~~

**⊕ CORRECTED (BK row #14 PHANTOM-REPAIR, 2026-08-03 — TR #14's third named act).** The struck
sentence was **false at authoring time**, as `ECOUTE.md:139` convicted: the list was 3 wave names
(`W-A11Y`, `W-DOC-TRUTH`, `W-PERF`) carrying ~22 `REGISTRY.md` findings, plus A12. The corrected
sentence: *this file is not the ownership index — the ownership index is
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md` §A, and a `REGISTRY.md` row is
homed when its disposition cell names a TR row id, not when a `## W-` heading appears here.* The
three names were never phantom waves: their bodies are `docs/tranches/BJ/waves/BAND-A11Y.md` (359
lines), `BAND-DOC-TRUTH.md` (283), `BAND-PERF.md` (660), seated as **TR #31 · #61 · #69**
(`TERMINAL-ROSTER.md:181`, `:211`, `:219`) and re-pointed in `REGISTRY.md` this date. A12 stands as a
live gap and is TR #50's. The re-derive-at-close duty is unchanged, and its instrument is now the TR
id column — never `grep -c '^## W-' WAVES.md`, which is blind to `waves/BAND-*.md` (`ECOUTE.md:374`).

**Coverage note, stated honestly:** the WebKit cells of every π/DELTA obligation above are currently
**uncapturable** because of `W-WEBKIT-CRASH`. No wave may claim a WebKit or Safari result until that wave
lands and, for Safari proper, until the owner enables Allow Remote Automation. This is a named gap, not a
silent one.
