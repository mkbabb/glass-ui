> **HANDOFF ANNEX — glass-ui-authored, words/floridify-applied.** This file is authored in glass-ui's
> own docs tree (`glass-ui/docs/tranches/AW/constellation/waves/`) as a constellation handoff annex. It
> is NOT glass-ui work. The words/floridify maintainer LIFTS it into words' own `docs/tranches/B/` on a
> clean words checkout, applies it in words' repo, and gates it on **words' own green CI** (which B.W0
> stands up — words has no CI today). glass-ui sessions own only `glass-ui/**` (inv-16); the only file
> glass-ui writes is this annex. Every cite below reads words' ACTUAL HEAD (`master`, `d11640d`, installed
> glass-ui `3.0.0`) from the AW constellation audit digests; no cite is invented. The sequencing edge —
> the words pin must NOT float past 3.0.0 until glass-ui **3.4.0** (AW.W1 dock-collapse fix) publishes —
> is the load-bearing constraint (inv-16': words applies the bump on its own checkout after 3.4.0 lands).

# Tranche B — the glass-ui-currency baseline (words/floridify)

B is words/floridify's **second** tranche (A=Phase 1, the modern-web baseline; the lineage is A-only at
HEAD, so the next letter is B — plain bbnf letter spine, not Greek). The app is a mature Vue 3.5 +
vue-router 4 + Pinia + Clerk frontend over a FastAPI + MongoDB + AI-synthesis backend (`floridify`).
words is the constellation's **broadest glass-ui consumer** — 143 import lines across 23 subpaths,
pinned `@mkbabb/glass-ui ^3.0.0` (`frontend/package.json:27`), installed `3.0.0` from the npm REGISTRY
(not a `file:` link) — and the **most version-stale** (three minors behind npm-latest 3.3.0; four behind
the 3.4.0 the dock fix ships). B earns words its glass-ui-currency baseline: it crosses the biggest
version gap in the fleet (`^3.0.0`→`^3.4.0`), closes the latent content-scan binding-gap, kills a
user-visible dark-mode FOUC defect, reveals the one stubbed screen on an already-adopted primitive, and
sweeps consumer hygiene. words **builds no new glass-ui surface** — it adopts (or deletes), and its
dependency on the AW tranche reduces to token/class-NAME stability invariants on already-planned glass-ui
waves (named-forward, §Cross-repo perimeter).

B runs **frontend-only**. There is no backend touch (A.W3 owned the FastAPI security layer; B is wholly
words' Vue/CSS frontend + its CI floor).

**CRITICAL PRECONDITION — words has NO CI and a DEAD test stub.** words has no `.github/workflows/` dir
at all; `frontend/package.json` declares `test: vitest` but there is no `vitest` dependency and no
`vitest.config.*` — the `test` script is a dead stub. The only real gate is `build`
(`vue-tsc --noEmit && vite build`), run by nothing. **No adoption gate is meaningful until a born-RED CI
floor exists**, so B.W0 stands up CI + a real test runner BEFORE any adoption wave. This is the inverted
form of A.W0 (A scaffolded the tranche format over an existing-enough toolchain; B must scaffold the
toolchain itself).

B is in DEVELOPMENT now. W0 (CI floor + format scaffold) and W1 (the bump design slice) are DEV; W2-W5
are authored-now-run-later — the implementation phase opens only on explicit user authorization. The
dev/impl boundary sits between W1 and W2.

## § Thesis

words is a deep, well-built glass-ui consumer carrying one structural debt and three local defects, all
findable only from inside the app:

1. **The version pin is three minors stale and one of its three GlassDock mounts is on the
   3.3.0-regressed collapse path.** `frontend/package.json:27` pins `^3.0.0`, lockfile-resolved to
   `3.0.0` (`package-lock.json:886-888`, the npmjs registry tarball — NOT a `file:../glass-ui` link like
   value.js/keyframes). words mounts `<GlassDock>` at three sites: `WordListView.vue:22` and
   `WordListView.vue:109` are both `always-expanded` (no collapse morph — IMMUNE), but
   `ThemeSelector.vue:6` is `<GlassDock ref="dockRef" manual :start-collapsed="!editModeEnabled">` with a
   `#collapsed` slot (`:8`) and programmatic `dockRef.value?.expand()` (`:178`) / `.collapse()` (`:186`)
   — the EXACT simple two-layer collapse path the 3.3.0 GlassDock regression freezes (the width morph
   sticks at collapsed width on first expand). It is admin-gated (`v-if="isMounted && isAdmin"`,
   `ThemeSelector.vue:3`) so the blast radius is the admin definition-edit toolbar — but a naive
   `npm update` to `^3.3.0` would visibly break it. words must NOT bump to 3.3.0; the consume path is
   **3.4.0** (glass-ui AW.W1 dock fix). The 3.0.0 dock prop surface words uses (`manual`,
   `start-collapsed`, `always-expanded`, exposed `expand()`/`collapse()`, `orientation`) is present and
   unchanged at 3.4.0, so the bump is **prop-stable — zero code change at the mount**; the only blocker
   is the morph bug. words' peer stack (vue `3.5.35`, reka-ui `2.9.8`, tailwindcss `4.3.0`,
   `@vueuse/core 14.3.0`, embla `8.6.0`, `@lucide/vue 1.17.0`, keyframes `2.2.0`) ALREADY satisfies
   3.4.0's ranges — no peer migration friction.

2. **The binding `@source` content-scan directive is ABSENT — glass-ui-internal CVA utilities silently
   vanish.** `src/assets/index.css:1-6` carries three of the four consumer-wiring requirements (
   `@import 'tailwindcss'` :1, `@import 'tw-animate-css'` :2, `@import '@mkbabb/glass-ui/styles'` :3,
   `@variant dark` :6) but **NO `@source "…/node_modules/@mkbabb/glass-ui/dist"`** anywhere in `src/`
   (`grep -rn "@source"` → empty). The vite config uses `@tailwindcss/vite` (`vite.config.ts:7,42`),
   whose content scan excludes `node_modules`; glass-ui's transitive `@source "../components"` resolves
   to the `.d.ts`-only `dist/components` tree and does NOT reach the compiled utility strings, which live
   in the flat `dist/*.js` chunks. So glass-ui-internal-only CVA classes (`text-destructive-foreground`,
   `rounded-pill`, the dock/aurora layout utilities) are not generated unless words coincidentally
   authors the same class in its own `src/`. It renders today because words' broad own-source utility use
   (36 glass-atom sites, 62 `duration-fast`) happens to materialize the overlapping set — a latent,
   fragile silent-vanish. This fix is **VERSION-INDEPENDENT** (lands now, against installed 3.0.0, no
   glass-ui publish dependency).

3. **The dark-mode anti-FOUC script reads a DEAD localStorage key — dark users flash light on every cold
   load.** `index.html:42-47` reads `localStorage['ui-state'].theme` and toggles `.dark` from it. But the
   `ui` Pinia store NO LONGER holds `theme` — `stores/ui/ui-state.ts:9` defines only
   `sidebarOpen`/`sidebarCollapsed` with the explicit comment (`:5`) "Theme / dark-mode is managed by
   glass-ui's useGlobalDark." `useGlobalDark` (`App.vue:29`) is built on vueuse `useDark` with DEFAULT
   options, so the real persisted key is vueuse's **`vueuse-color-scheme`** — NOT `ui-state.theme`. The
   FOUC script therefore always falls to `'light'`; a dark-mode user sees a white flash before hydration
   on every cold load. This is a real user-visible defect the import-graph lanes could not detect; it is
   **words-side and 3.3.0-independent**. glass-ui's pre-paint `darkModeSyncScript()` string-emitter
   (AU.W9) is NOT in the installed 3.0.0 dist (it lands on a later cut), so the cheapest correct fix
   today is one line: repoint the inline snippet at `vueuse-color-scheme`.

4. **The Word-of-the-Day screen is a literal "coming soon" stub on a primitive words already owns.**
   `views/Home.vue:74-77` carries a `word-of-the-day` search mode whose body is
   `Word of the Day mode coming soon...`. When words builds it, the headline-reveal fit is `TypewriterText`
   — which words ALREADY adopts for the animated word title (`AnimatedTitle.vue:11`, with a tuned
   ngram/error-rate/cursor config :21-34) over an inner glass `Card`. This is the single concrete new-UI
   surface where a glass-ui primitive cleanly applies AND the primitive is already wired, so adoption cost
   is near-zero.

5. **Consumer hygiene: one stray dependency clone, one partially-dead token override, three dead deps.**
   (a) A gitignored, untracked `frontend/glass-ui/` directory is a stale 3.1.1 source clone of the
   dependency — `git check-ignore` flags it, `git ls-files` count = 0, no `vite.config.ts`/`tsconfig`/
   `src` reference to it; a leftover local-link experiment, harmless to the build, removable. (b)
   `theme.css:86-89` (+ dark arm `:125-128`) overrides `--shadow-cartoon-color{,-soft,-hover,-hover-soft}`
   on `:root`/`.dark`, but glass-ui's live `.shadow-cartoon-{sm,md,lg}` utilities (consumed at 10+ words
   sites — `Sidebar.vue:7`, `NotificationToast.vue:14`, `SidebarContent.vue:20,58,75,103`, …) are built
   from `var(--shadow-color)`, NOT `--shadow-cartoon-color` — so this four-token override is a partial
   dead-orphan that does not retint the stamp words actually paints (the stamp IS still dark-adaptive via
   `--shadow-color`←`--foreground`, by construction, so it works by accident, but the override block does
   nothing the consumer thinks). Reconcile-or-delete. (c) `vue-sonner`/`sonner` (glass-ui's `/toast` is
   the real toast path — `plugins/toast.ts:1`, `App.vue:18`) and `tailwind-merge` (glass-ui ships `cn()`
   with its own deduplicator — `SidebarHeader.vue:78`) are declared deps with zero `src/` usage — dead,
   removable.

B closes each item against its real consumer site. The bump is the one cross-repo edge (sequenced on the
3.4.0 publish); everything else is words-local and most of it is publish-independent. The whole tranche is
**adopt-or-delete** — B mints zero new words-side glass-ui primitive (its only net-new artefacts are the
CI floor itself and the Word-of-the-Day reveal, the latter composing an already-adopted primitive).

## § Binding question

Can words earn its glass-ui-currency baseline — a born-RED CI floor (a real `vue-tsc`/`vitest` runner
words has never had) standing up FIRST, then the `^3.0.0`→`^3.4.0` bump sequenced on the glass-ui AW.W1
dock-collapse fix (the prop-stable bump that un-freezes the admin `ThemeSelector` dock without touching
its mount), the absent `@source` content-scan directive added to close the silent-CVA-vanish class, the
dark-mode FOUC anti-flash script repointed at vueuse's real `vueuse-color-scheme` key, the Word-of-the-Day
stub revealed on the already-adopted `TypewriterText`, and the hygiene sweep (the stray 3.1.1 clone, the
partially-dead cartoon-color override, three dead deps) — without regressing the 143 glass-ui import sites,
the Clerk-auth or dark-mode toggle flows, or the two `always-expanded` dock surfaces, and proven by an
honest after-state (a green CI run, a repin-survival check, a dark-cold-load capture, a build-emitted-CSS
assertion)?

## § Goal criterion

B succeeds when the glass-ui-currency baseline is earned, sequenced, and proven:

- **CI floor + format scaffold (W0)** — `docs/tranches/B/` stands up (the A-shape: `B.md` + `PROGRESS.md`
  + `FINAL.md`); a `.github/workflows/ci.yml` runs `build` (`vue-tsc --noEmit && vite build`) as the
  born-RED floor on push + PR; the dead `test: vitest` stub is RESOLVED — either a real `vitest`
  dependency + `vitest.config.ts` is wired (and `test` runs a real ≥1-spec suite) OR the dead stub is
  deleted and the floor is `build`-only (the decision recorded with rationale in W1). This wave is the
  PRECONDITION — no later adoption gate is meaningful without it.
- **The bump (W1 design → W2 impl)** — `frontend/package.json:27` `^3.0.0`→`^3.4.0`, `npm install`,
  lockfile re-pinned, ONLY AFTER glass-ui 3.4.0 (AW.W1) publishes. The admin `ThemeSelector` dock expands
  smoothly on first click (the morph un-freeze, validated). No code change at any of the 23 subpath
  import sites (the W1 design slice proves every consumed symbol survives the 3.0.0→3.4.0 export delta).
  **A prop-stable consume, not a migration.**
- **Content-scan fix (W2)** — `@source "…/node_modules/@mkbabb/glass-ui/dist"` added to
  `src/assets/index.css` after line 3 (the relative depth verified at edit time — see §Cross-repo
  perimeter), so glass-ui's compiled CVA utilities are scanned. Version-independent; lands in the same PR
  as the bump for review coherence but does not depend on the 3.4.0 publish.
- **FOUC fix (W2)** — `index.html:42-47` repointed at `vueuse-color-scheme` (with vueuse's
  `JSON.parse`-or-bare fallback); a dark-mode user no longer flashes light on cold load. Words-side,
  publish-independent.
- **Word-of-the-Day reveal (W3)** — `Home.vue:74-77`'s "coming soon" stub is replaced with the real mode,
  its headline rendered on `TypewriterText` (the already-tuned `AnimatedTitle` config reused) over an
  inner glass `Card`. The single new-UI screen; adoption cost near-zero (the primitive is already wired).
- **Hygiene (W4)** — the stray `frontend/glass-ui/` 3.1.1 clone deleted; the partially-dead
  `--shadow-cartoon-color*` override (`theme.css:86-89,125-128`) reconciled or removed; `vue-sonner`,
  `sonner`, `tailwind-merge` removed from `package.json`. All words-side, publish-independent.
- **Gates green** — the CI floor green throughout (typecheck + build, plus the real test suite if W0 wired
  one); every adoption wave carries its born-RED prose-acceptance gate (§ Hard gates in PROGRESS); the
  overfitting audit clean at close (B's only net-new words-side artefacts are the CI floor and the
  Word-of-the-Day reveal — the former is the gate substrate, the latter composes an already-adopted
  primitive; everything else is a bump, a one-line fix, or a deletion).

## § Completion criterion

The development half (W0-W1) completes when the CI floor exists and goes green (a `ci.yml` run on a PR,
the dead-test-stub decision recorded), the `docs/tranches/B/` scaffold stands up, and the W1 bump-design
slice verifies — the 3.0.0→3.4.0 export-delta survival check (every one of the 23 subpaths + every named
symbol words imports still resolves at 3.4.0), the `ThemeSelector` morph-unfreeze validation plan, and the
`@source` relative-depth + FOUC-key fixes designed. The implementation half (W2-W5) completes when every
wave's hard gate verifies (the green-CI repin run, the build-emitted-CSS sentinel assertion, the
dark-cold-load capture, the Word-of-the-Day render, the deletion proofs) and the close ceremony —
overfitting audit + `B/FINAL.md` + the honest after-state — lands. The bump (W2) is gated on the glass-ui
3.4.0 publish; W2's content-scan + FOUC fixes, W3, W4 are publish-independent and may land ahead of it.

## § Wave sequence

words mints no new glass-ui wave; B is an adoption + currency + hygiene tranche. The waves order on one
hard edge: the CI floor (W0) precedes every gate, and the bump (W2) is gated on the glass-ui 3.4.0 publish.

| Wave | Disposition | Contents |
|---|---|---|
| **W0** | DEV | CI floor + format scaffold — stand up `docs/tranches/B/` (A-shape); add `.github/workflows/ci.yml` running `build` (`vue-tsc --noEmit && vite build`) as the born-RED floor on push+PR; RESOLVE the dead `test: vitest` stub (wire a real `vitest` + `vitest.config.ts` + ≥1 spec, OR delete the stub — recorded in W1). The PRECONDITION wave. |
| **W1** | DEV — boundary | Bump design slice — the 3.0.0→3.4.0 export-delta survival check (the 23 subpaths + every named symbol words imports verified to resolve at 3.4.0, mirroring keyframes' `proof-repin-safe.mjs` pack-and-assert pattern in words' own dialect); the `ThemeSelector` morph-unfreeze validation plan; the `@source` relative-depth resolution; the FOUC-key fix design; the dead-test-stub decision recorded. **END OF DEV BOUNDARY.** |
| **W2** | IMPL | The bump + the two latent-defect fixes — `^3.0.0`→`^3.4.0` (`frontend/package.json:27`, gated on the glass-ui 3.4.0 publish), `npm install`, lockfile re-pin; ADD `@source "…/dist"` to `src/assets/index.css` (publish-independent); REPOINT `index.html:42-47` FOUC script at `vueuse-color-scheme` (publish-independent). The bump is prop-stable — no mount code changes. |
| **W3** | IMPL | Word-of-the-Day reveal — replace the `Home.vue:74-77` "coming soon" stub with the real mode, headline on `TypewriterText` (reusing the `AnimatedTitle` tuned config) over an inner glass `Card`. The one new-UI screen; near-zero adoption cost. |
| **W4** | IMPL | Hygiene sweep — delete the stray `frontend/glass-ui/` 3.1.1 clone; reconcile-or-delete the partially-dead `--shadow-cartoon-color*` override (`theme.css:86-89,125-128`); remove `vue-sonner`/`sonner`/`tailwind-merge` dead deps. |
| **W5** | IMPL (LAST) | Measure + close — the honest after-state (a green CI run id; the repin-survival check passing; a dark-cold-load Playwright capture showing `<html class="dark">` before first paint; the build-emitted-CSS sentinel for `text-destructive-foreground`); the overfitting audit + `B/FINAL.md`. |

Ordering rationale: W0 stands up the CI floor FIRST — without it no later gate is verifiable (words has no
CI today). W1 designs the bump before touching the pin (the export-delta survival check must prove no
symbol breaks across three minors, and the `ThemeSelector` morph-unfreeze must be validated, not assumed).
W2 lands the bump alongside the two publish-independent latent-defect fixes (they share the frontend
write scope and no consumer overlap); the bump arm is gated on the 3.4.0 publish, the `@source` + FOUC
arms are not. W3 is an isolated feature screen. W4 is an isolated deletion sweep. W5 measures the
after-state honestly and closes. The dev/impl boundary sits at W1|W2 — implementation opens on explicit
user authorization.

### Spine mapping (the glass-ui-currency edges — BIND or REFUTE per named consumer site)

words' B is not a modern-web-spine tranche (A bound that spine); B's "spine" is the set of glass-ui
adoption-and-currency edges the constellation AW audit named. Each edge binds where words has a real
consumer site and refutes in-record where it does not (the >=2-consumer / no-speculative-substrate
invariant operationalized at author time):

| Adoption edge (AW-named) | Lever in words | Disposition |
|---|---|---|
| Dock-collapse fix (glass-ui AW.W1 → 3.4.0) | `ThemeSelector.vue:6` `manual :start-collapsed` admin dock | **BOUND** — the `^3.0.0`→`^3.4.0` bump, folded into B.W2; gated on the 3.4.0 publish |
| `@source` content-scan binding requirement | `src/assets/index.css` (absent) | **BOUND** — folded into B.W2 (publish-independent) |
| Dark-mode FOUC primitive (`darkModeSyncScript()`, AU.W9) | `index.html:42-47` (dead key) | **BOUND as a one-line local fix** — repoint at `vueuse-color-scheme`; the glass-ui `darkModeSyncScript()` front door is NOT in the installed 3.0.0 dist, so the local repoint is the cheapest correct fix today (re-evaluate adopting the glass-ui helper on a later cut if it ships a consumer-supplied-key variant — words reads its own Pinia store, which the generic helper cannot know) |
| `TypewriterText` reveal | `Home.vue:74-77` Word-of-the-Day stub | **BOUND** — folded into B.W3; the primitive is already adopted (`AnimatedTitle.vue:11`) |
| Command / Combobox palette | the bespoke multi-mode `SearchBar` shell (348 lines) | **REFUTED** — `SearchBar` composes an auto-growing `<textarea role="searchbox">` (`SearchInput.vue:2`) with inline ghost-text autocomplete (`AutocompleteOverlay.vue:13-15`), lookup/wordlist/word-of-the-day mode-switching, AI-query detection, and 18 dedicated composables. glass-ui `Command`/`Combobox` is a flat single-list filter — it cannot host this multi-mode scroll-aware orchestrator. The bespoke shell is the right design; forcing `Command` would regress it. words imports zero `Command` symbols. |
| Etymology tree primitive | `Etymology.vue` flat prose | **REFUTED** — `Etymology.vue:25-43` renders `etymology.text` through `parseContentBlocks` plus two flat fields (`language`/`period`); there is no recursive/nested origin structure and no tree component. glass-ui ships no tree primitive anyway. Honest negative — no tree fit. |
| `ScrollingText` overflow-marquee | definition titles | **REFUTED** — definition titles use `truncate`/`line-clamp` (`WordListView.vue:17-18`), not overflow-marquee; zero `ScrollingText` usage, no surface demand. |
| Aurora / GooBlob / glass-atoms showcase | — | **REFUTED** — words is a dictionary reading app on cards + docks + dialogs; no aurora/blob/constellation mount on any screen. No AURORA (AW.W4-W8) / BLOB (AW.W9-W11) / band-G demo-shell demand. Inventing one would be speculative substrate. |

The dock-fix + `@source` + FOUC + TypewriterText edges bind because words has a named consumer site for
each. The Command, etymology-tree, scrolling-text, and aurora/blob edges refute because words either has a
correctly-bespoke alternative (the `SearchBar` shell) or no consumer site at all — these are findings, not
gaps.

## § Inherited invariants

words inherits the constellation precepts (in-tree via the committed submodule, advanced in A.W0).
Load-bearing for B:

- **No backwards-compat alias** — the bump RETIRES the `^3.0.0` pin for `^3.4.0` cleanly; no dual-pin, no
  shim. The hygiene sweep DELETES the stray 3.1.1 clone and the dead deps rather than keeping them as dead
  fallbacks. The FOUC fix REPLACES the dead-key read; it does not keep both reads live.
- **Substrate-without-consumer is binary** — B mints exactly two net-new words-side artefacts: the CI
  floor (the gate substrate, a precondition with no overfit — every wave is its consumer) and the
  Word-of-the-Day reveal (which COMPOSES the already-adopted `TypewriterText`, not a new primitive). No
  new shared substrate, no speculative aurora/blob/atoms adoption. The four REFUTED edges (§Spine mapping)
  honor this bar by NAME.
- **Presets in consumers** — words' `ThemedCard` mastery-themed card system, its `themed-cards/` CSS tree,
  and its `.mastery-bar-{gold,silver,bronze}` gradients are consumer IDENTITY, not glass-ui-convergence
  candidates. B does not pull them toward glass-ui; it keeps them local (the partially-dead
  `--shadow-cartoon-color*` override in W4 is reconciled BECAUSE it is dead, not because it is a preset —
  legitimate presets stay).
- **The overfitting audit runs at close** — `docs/precepts/audits/overfitting-audit.md` against every B
  artefact. The CI floor and the Word-of-the-Day reveal are the only net-new artefacts; both pass (the
  floor is the gate path for every wave; the reveal is an already-adopted-primitive composition). The bump,
  the `@source` line, the FOUC repoint, and the W4 deletions are not new artefacts.
- **Writing style** — precise, no grandiloquence, no editorializing; em dashes without spaces.

## § Cross-repo perimeter

B is almost entirely words-internal. The one cross-repo touch is **inward**: words consumes glass-ui
**3.4.0** (the AW.W1 dock-collapse fix) through the published package via the contract-v2 dev-resolution
(the built `dist/`, not a source reach-around) — the bump edits `frontend/package.json:27` `^3.0.0`→
`^3.4.0` and re-pins the lockfile. No outward publish (words is a leaf SPA, not a publisher). The bump is
**sequenced on the glass-ui 3.4.0 publish** — words applies it on its own checkout AFTER 3.4.0 lands on
npm; until then the `^3.0.0` pin stays put (a naive `npm update` to `^3.3.0` would freeze the admin
`ThemeSelector` dock — the danger the audit named).

**`@source` relative-depth note (resolve at edit time).** words' `frontend/node_modules/@mkbabb/` is
empty; glass-ui resolves at the REPO-ROOT `node_modules` (`words/node_modules/@mkbabb/glass-ui` = the
installed version). The `@source` from `frontend/src/assets/index.css` must reach the resolved
`dist` — compute the up-depth at edit time and point it at the real install (do NOT point it at the stale
vendored `frontend/glass-ui/` 3.1.1 dir, which W4 deletes). The conformance gate (§ Hard gates) asserts
the resolved target contains flat `*.js` chunks grep-matching a sentinel utility, which catches a
wrong-depth `@source`.

**Token/class-NAME stability asks — NAMED-FORWARD to the glass-ui AW waves (the only outward edges).**
words reads glass-ui's class names and motion tokens pervasively and inherits the AW visual upgrades free
IFF the NAMES survive the consolidation. These are not B work — they are coordination asks the words
maintainer files against glass-ui's AW tranche (each gated on the relevant AW wave):

- **AW.W22-W26 (glass-atoms band) — keep the glass-atom class NAMES.** words uses `.glass-wash` (17×),
  `.glass-floating` (10×), `.glass-quiet` (5×), `.glass-overlay` (4×) across 36 template+CSS sites. The
  band-F consolidation onto a unified `.glass-material` spine MUST keep these names as live public CSS
  classes (or ship a documented rename + a `/styles` alias). words inherits the visual upgrade free if the
  names hold; a silent rename to `.glass-material`-keyed classes breaks 36 sites. **NAMED-FORWARD → glass-ui AW.W22-W26.**
- **AW.W24 (glass-card perfection) — keep `Card*` subcomponent names + the `--paper-*-texture` tokens.**
  words composes glass `CardContent`/`CardHeader` at 8 definition sites (`Etymology.vue:50`,
  `DefinitionDisplay.vue`, …) and reads `--paper-clean-texture` at `App.vue:94` + in `ThemedCard.vue:4`.
  W24 must not rename `CardContent`/`CardHeader` or the `--paper-{clean,aged}-texture` tokens.
  **NAMED-FORWARD → glass-ui AW.W24.**
- **AW.W30 (carousel redesign) — keep the `Carousel*` API + `CarouselApi`/`useCarousel` on `/carousel`.**
  words mounts the full `Carousel*` family + `CarouselApi` type from `/carousel` at
  `ImageCarousel.vue:84-90` (the high-traffic definition image surface, mounted in
  `DefinitionDisplay.vue:91`). The W30 restyle must hold the `Carousel`/`CarouselContent`/`CarouselItem`/
  `CarouselNext`/`CarouselPrevious` exports + the `useCarousel`/`CarouselApi` types stable. words inherits
  the restyle free on the 3.4.0+ bump with zero code change if the API holds. **NAMED-FORWARD → glass-ui AW.W30** (ask: add a consumer-probe to W30's gate asserting `@mkbabb/glass-ui/carousel` still exports the family).
- **AW.W31 (animation-coherence audit) — FREEZE the motion-token NAMES.** words reads glass-ui motion
  tokens 180+ times — `--ease-*` 65×, `duration-fast` 62×, `ease-spring-snappy` 35× (the `@theme` alias
  → `--spring-snappy`), `duration-normal` 20×, `--spring-*` 14×, plus raw `var(--ease-spring-snappy)`/
  `var(--ease-spring-smooth)` in `transitions.css:91-104`. W31 may RETUNE values freely, but must PRESERVE
  the NAMES `--ease-spring-{snappy,smooth,bouncy,gentle}`, `--ease-standard`, `--spring-*`, and
  `--duration-{fast,normal,slow}` — a rename/removal breaks 180+ words sites. **NAMED-FORWARD → glass-ui AW.W31** (ask: `proof:animation-coherence` asserts the pre-W31 canon token names still resolve at HEAD).

These four asks are coordination edges, NOT B scope — words consumes the stability invariant; it builds
nothing. They are recorded here so the words maintainer can mirror them into glass-ui's AW
ADOPTION-ASKS ledger; glass-ui's AW.W22-W26/W24/W30/W31 wave gates already carry the consumer-stability
clauses per the AW audit.

Push/npm/commit authority stays the user's per the standing agent git clause; the orchestrator owns the
index and the gates; agents are edit-only / read-only-git.

## § Successor

B closes words' glass-ui-currency baseline. Named-forward contingencies (each an exact destination, not a
vague "future tranche"):

- **glass-ui dark-mode FOUC front door** — B.W2 repoints the inline script at `vueuse-color-scheme`
  locally because `darkModeSyncScript()` (AU.W9) is not in the installed 3.0.0 dist. If a later glass-ui
  cut ships a `darkModeSyncScript()` variant that reads a consumer-supplied storage key (words needs its
  own Pinia-persisted key), words swaps the local snippet for the glass-ui front door. Named successor:
  the next words tranche's wiring wave, gated on that glass-ui variant shipping.
- **glass-ui-adoption asks A.W5 ASK-1/ASK-2** — A's grand-audit fold carried two glass-ui adoption asks
  (ASK-1 self-hosted Fraunces `@font-face`; ASK-2 `useTextHighlight` CSS-Custom-Highlight composable),
  each gating an A.W5 sub-item. Neither is in the AW wave list, so both are likely still un-shipped — they
  stay gated on glass-ui shipping the surfaces, NOT folded into B. If A's impl half has not run at B's
  open, B inherits the A.W5/A.W6 IMPL waves (verify at words HEAD whether A's impl half landed; if not, A
  runs first or B absorbs them). Named successor: A.W5's gated sub-items, or a B follow-up if A is fully
  closed.
- **`view-transition-name` word-morph reveal** — A refuted motion/VT for lack of a named site; the
  word-lookup → definition transition (`useRouteOrchestration.ts:60`) is the candidate the grand-audit
  named, folded into A.W6. If A.W6 has not run, it converges in a words motion wave, not B (B is currency
  + hygiene, not a motion tranche).

### Booked (not folded — owner: words maintainer)

- **floridify Mongo-bind upstream hardening (fourier-hub Ask 7 / N7).** The fourier constellation hub
  ledger (`fourier-analysis/docs/constellation/ADOPTION-ASKS.md:91-96,115`) carries an OPEN P2 ask owned
  by the floridify maintainer: harden floridify's Mongo bind so the database is reachable only on the
  app's internal bridge network (acceptance: an external port scan / `docker port <mongo-container>` shows
  NO published Mongo port; floridify's services still connect). Status: OPEN, re-affirmed at fourier G.W8.
  It is a DEPLOY-POSTURE / compose-network item, NOT a glass-ui adoption, and it is NOT in words' own
  tranche docs (orphaned between the hub ledger and words' tree; `docker-compose.yml` is dirty at HEAD so
  a bind change MAY be in-flight uncommitted). **BOOK → words maintainer** — fold it as a security/deploy
  row IF B (or a successor) takes a deploy wave; acceptance = `docker port` shows no published Mongo port +
  functional parity. It is correctly the user's domain (P2, floridify-maintainer-owned), not B-folded
  here.

No B successor tranche is opened here; the named-forwards are watched conditions and the Mongo-bind row is
a booked maintainer item, not committed work.
