# Q.R11 — Consumer Resolver-Config Sweep (round-2 consumer audit)

**Lane**: Q.R11 — round-2 consumer audit, the 4 un-audited consumers.
**Date**: 2026-05-18.
**Mode**: READ-ONLY audit. No source mutations; no mutating git in any repo. Consumer builds / typechecks / a dev server were run for diagnosis (explicitly allowed by the dispatch).
**Verdict summary**: the value.js B-1 latent-breakage class is **NOT isolated to value.js**. It is fleet-wide. All 4 swept consumers' **production builds + typechecks fail** with the identical `Failed to resolve entry for package "@mkbabb/keyframes.js"`. Dev servers still boot (the `development` export condition resolves to `src/`). One consumer (bbnf-buddy) additionally carries the value.js `<Card variant="pane">` stale-API class at 6 sites.

---

## §1 Scope

Round-1 deeply audited value.js + keyframes.js (the user-named-broken consumers) and established the gestalt root cause: the AD.W4 `development`-conditional-exports flip changed the dev-time resolution model, and keyframes.js's library `dist/` (`dist/keyframes.js` + `dist/keyframes.d.ts`) was **deleted** by the AD.W4 freshness-gate retirement wave — while keyframes.js's `package.json` `exports` still point `import → ./dist/keyframes.js` and `types → ./dist/keyframes.d.ts`.

This lane sweeps the OTHER 4 consumers for the same latent failure class plus general functional state:

- `/Users/mkbabb/Programming/fourier-analysis` (`web/` subdir)
- `/Users/mkbabb/Programming/bbnf-buddy`
- `/Users/mkbabb/Programming/words/frontend`
- `/Users/mkbabb/Programming/speedtest`

Reference state:
- glass-ui `@ d244dd5` — `package.json` `version: 1.8.5`. `dist/` is fresh (built 02:10, after HEAD 02:03) and `.gitignore`d.
- keyframes.js `@ master` — `version: 2.1.0`. `git status`: `D dist/keyframes.d.ts`, `D dist/keyframes.js` (both deleted in the working tree).
- keyframes.js `exports["."]`: `development → ./src/animation/index.ts`, `types → ./dist/keyframes.d.ts`, `import → ./dist/keyframes.js`.

---

## §2 Per-consumer resolver-config desync table

**No consumer in this sweep carries a hard `resolve.alias` to a `dist/` path** — that specific value.js B-1 mechanism (a `vite.config.ts` alias `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js`) is unique to value.js. But the *latent breakage* propagates anyway, through the `package.json` `exports` map of the linked keyframes.js package.

| Consumer | `@mkbabb/*` vite alias | `package.json` pin | node_modules resolution | keyframes.js `dist/` reachable? | Verdict |
|---|---|---|---|---|---|
| **fourier-analysis/web** | none (only `@ → ./src`) | `glass-ui: file:../../glass-ui`; `keyframes.js: ^2.0.0`; `value.js: ^0.4.6`; `latex-paper: ^0.2.1` | `glass-ui` SYMLINK→`../../../../glass-ui`; `keyframes.js` SYMLINK→`../../../../keyframes.js` (npm dedup-hoisted the `file:` sibling over the `^2.0.0` range — so the deleted-dist sibling IS what resolves); `value.js` real dir v0.4.6 | NO — symlink target's `dist/keyframes.js` deleted | **BROKEN** (build + typecheck) |
| **bbnf-buddy** | none (only `@ → ./src`) | `glass-ui: file:../glass-ui`; `keyframes.js: file:../keyframes.js`; `value.js: file:../value.js`; `pencil-boil: file:../pencil-boil` | all 3 `@mkbabb/*` SYMLINK to siblings | NO — `keyframes.js/dist/keyframes.js` deleted | **BROKEN** (build + typecheck) |
| **words/frontend** | none for `@mkbabb/*` (aliases only `@` + `@mkbabb/latex-paper` → local `./latex-paper/src`) | `glass-ui: file:../../glass-ui`; `keyframes.js: ^2.0.0`; `latex-paper: file:./latex-paper` | resolved via PARENT `words/node_modules/@mkbabb/`: `glass-ui`→symlink, `keyframes.js`→symlink, `parse-that`→dir. `frontend/node_modules/@mkbabb` is EMPTY (npm hoisted to workspace root). | NO — parent-symlinked keyframes.js sibling's `dist/` deleted | **BROKEN** (build + typecheck) |
| **speedtest** | none for `@mkbabb/*` (aliases `@src`/`@styles`/etc.); `dedupe: ["vue","reka-ui"]`; `server.fs.allow` extends to `../glass-ui` + `../keyframes.js` | `glass-ui: file:../glass-ui`; `keyframes.js: file:../keyframes.js` | `glass-ui` + `keyframes.js` SYMLINK to siblings; `value.js` ABSENT (not a direct dep) | NO — `keyframes.js/dist/keyframes.js` deleted | **BROKEN** (build); typecheck BROKEN |

**The `latex-paper` aliases (fourier-analysis via `@mkbabb/latex-paper/vite`; words/frontend hard aliases to `./latex-paper/src/...`)** are NOT desynced — they point at `src/` paths that exist, and `latex-paper` is a separate package family unaffected by the keyframes.js dist deletion. No `dist/`-alias desync anywhere in the 4-consumer sweep.

**Note on the speedtest `vite.config.ts` `manualChunks`** (lines 445-451): the production-build `manualChunks` function tests `id.includes("/keyframes.js/dist/")` and `id.includes("/value.js/dist/")`. Those `dist/`-path string-matches are now dead branches — no module ID will ever match a deleted `dist/`. Not a *breakage* (the `/@mkbabb/keyframes.js/` branch alongside still catches the `src/` resolution), but it is **stale config debt** of the same desync class: the chunk-carve config was written against a `dist/`-resolution era that AD.W4 ended.

---

## §3 Per-consumer functional state

### fourier-analysis/web — BROKEN

| Check | Command | Result |
|---|---|---|
| Build | `npm run build` (`vue-tsc -b && vite build`) | **FAIL** — `vue-tsc -b` errors before `vite build` runs: `src/composables/useFourierMorph.ts(14,27): error TS2307: Cannot find module '@mkbabb/keyframes.js'`; `src/stores/animation.ts(3,27): error TS2307` (same). Build never reaches `vite build`. |
| Typecheck | (folded into build via `vue-tsc -b`) | **FAIL** — 2 errors, both `TS2307` on `@mkbabb/keyframes.js`. |
| Dev server | not separately probed; `development` condition path verified healthy via bbnf-buddy (§ below) — fourier consumes keyframes via the same symlinked sibling | dev EXPECTED-CLEAN (resolves keyframes.js `src/animation/index.ts`) |

### bbnf-buddy — BROKEN

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run typecheck` (`vue-tsc --noEmit`) | **FAIL** — `src/animation/easing.ts(26,8)`, `src/animation/runtime.ts(43,8)`, `src/poses/css.ts(20,34)`: `TS2307: Cannot find module '@mkbabb/keyframes.js'`. Plus 3 *pre-existing, keyframes-unrelated* errors: `runtime.ts(191,41)` + `css.ts(228,34)` `TS2322` (`unknown`→`number`), `composables/wasm/morph.ts(177,9)` `TS2322` (`WirePair[]` mismatch). |
| Build | `npx vite build` (production) | **FAIL** — `[commonjs--resolver] Failed to resolve entry for package "@mkbabb/keyframes.js"`. Production build uses the `import` condition → deleted `dist/keyframes.js`. |
| Dev server | `npm run dev` (`vite`) | **CLEAN** — boots in 168 ms, `http://localhost:5173/` returns HTTP 200. `/@fs/.../glass-ui/src/composables/motion/useAnimatedNumber.ts` → 200; `/@fs/.../keyframes.js/src/animation/index.ts` → 200. Dev resolves the `development` condition → `src/animation/index.ts` (which exists), so the dev path is healthy. |

### words/frontend — BROKEN

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run type-check` (`vue-tsc --noEmit`) | **FAIL** — `src/components/custom/icons/FancyF.vue(57,39)` + `src/utils/animations.ts(3,39)`: `TS2307: Cannot find module '@mkbabb/keyframes.js'`. npm reports the lifecycle script failed (`code 2`). |
| Build | `npx vite build` (production) | **FAIL** — `[commonjs--resolver] Failed to resolve entry for package "@mkbabb/keyframes.js"`. `npm run build` is `vue-tsc --noEmit && vite build` — typecheck fails first regardless. |
| Dev server | not separately probed; same `development`-condition path as bbnf-buddy | dev EXPECTED-CLEAN |

### speedtest — BROKEN

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run check:client` (`vue-tsc --noEmit`) | **FAIL** — `src/components/speedtest/composables/useMeterCompletion.ts(20,37)` + `(21,34)`, `useMeterRenderer.ts(17,32)`: `TS2307: Cannot find module '@mkbabb/keyframes.js'`. (The full `npm run check` also runs server/worker/boundary checks — not separately probed; `check:client` is the keyframes-touching leg.) |
| Build | `npx vite build --mode production` | **FAIL** — `[vite-plugin-pwa:build] Failed to resolve entry for package "@mkbabb/keyframes.js"`. Production build uses the `import` condition → deleted `dist/keyframes.js`. |
| Dev server | not separately probed; `development`-condition path | dev EXPECTED-CLEAN |

**Aggregate**: 4 of 4 consumers — **production build BROKEN, typecheck BROKEN, dev server clean**. The breakage is uniform and single-rooted.

---

## §4 Stale glass-ui API usage findings

### bbnf-buddy — `<Card variant="pane" flush>` (value.js R2 class — 6 sites)

bbnf-buddy imports `Card` directly from `@mkbabb/glass-ui` (`BodyEditor.vue:2 — import { Card, CardContent } from "@mkbabb/glass-ui"`) and passes **`variant="pane"` + `flush`**, neither of which is a glass-ui `Card` prop.

glass-ui `Card` (`src/components/ui/card/Card.vue:19-32`) exposes only:
- `tier?: CardTier` (default `"resting"`) — the 5-rung glass ladder
- `shadow?: boolean` (default `true`)
- `grain?: boolean` (default `true`)

`variant` and `flush` fall through as inert DOM attributes; the card silently renders `tier:"resting"` + `shadow:true` + `grain:true`. This is the **exact value.js B-class defect** (`Qalpha` §5, R2) replicated in bbnf-buddy.

Affected sites (6):
- `src/editor/components/BodyEditor.vue:37` — `<Card variant="pane" flush>`
- `src/editor/components/SelectionInfo.vue:176` — `<Card variant="pane" flush class="selection-info" ...>`
- `src/editor/components/BehaviorsEditor.vue:102` — `<Card variant="pane" flush>`
- `src/editor/components/OffsetEditor/OffsetEditor.vue:165` — `<Card variant="pane" flush>`
- `src/editor/components/LayersPanel.vue:149` — `variant="pane"` (multi-line tag)
- `src/editor/components/EditorPanel.vue:100` — `variant="pane"` (multi-line tag)

Canonical migration (per `Qalpha` R2): `variant="pane"` → `tier="wash" :shadow="false"`. `flush` has no glass-ui equivalent — bbnf-buddy must drop it or replace with explicit padding overrides.

### fourier-analysis/web, words/frontend, speedtest — CLEAN on glass-ui API surface

- `<Card variant="...">` grep: 0 hits in fourier-analysis, words/frontend, speedtest.
- fourier-analysis P.W5 site `ConvergenceTimeline.vue` imports `Slider` from `@mkbabb/glass-ui` — a real export.
- bbnf-buddy P.W5 site `ToolsLayer.vue` imports `Badge` from `@mkbabb/glass-ui` + `DockIconButton` from `@mkbabb/glass-ui/dock` — both real exports.
- No other stale glass-ui v1.8.x prop/export mismatch surfaced in the 4-consumer grep sweep.

---

## §5 P.W5 cross-repo write verification

| Repo | P.W5 commit | Subject | Touched-site status @ HEAD |
|---|---|---|---|
| fourier-analysis | `4df1a06` | `feat(p.w5-b): glass-ui CR-2 cross-walk — dock typed-context migration + useClipboard + HoverCard + GlassScrubber adoption` (7 files; glass-ui v1.8.2 surface) | **RESOLVES** — `ConvergenceTimeline.vue` imports `Slider` from `@mkbabb/glass-ui` (real export). The P.W5 writes themselves are sound; the consumer's build failure is the §3 keyframes.js dist deletion, NOT a P.W5 write error. |
| bbnf-buddy | `dafb99f` | `feat(p.w5-d): glass-ui CR-5 :deep retire + useLeaveTimer inline` (4 files; glass-ui v1.8.2 surface) | **RESOLVES** — `ToolsLayer.vue` imports `Badge` + `DockIconButton` (real exports). `poses/css.ts` is one of the keyframes.js `TS2307` sites — but that failure is the dist deletion, not the P.W5 `:deep`/`useLeaveTimer` edit. The P.W5 write is sound. |
| words/frontend | `5c1b2b8` | `feat(p.w5-e): glass-ui consumer adoption — Fira Code CDN drop + scale-on-hover` (11 files) | **RESOLVES** — the P.W5 edits are CSS-class/icon adoptions across 11 SFCs; none introduce a broken glass-ui symbol. `FancyF.vue` (a P.W5-touched file) imports `CSSKeyframesAnimation` from `@mkbabb/keyframes.js` — a real keyframes.js export (`src/animation/index.ts:870`), failing only via the dist deletion. |

**Verdict**: all 3 P.W5 cross-repo writes still resolve at the symbol/import-graph level. None of the P.W5-touched sites is the *cause* of any consumer breakage. The keyframes.js dist deletion is an orthogonal, later, fleet-wide regression that happens to co-locate with some P.W5-touched files (because P.W5 and keyframes.js consumption both gravitate to animation code).

---

## §6 Latent-breakage catalog

| Consumer | dev server | production build | typecheck | Classification |
|---|---|---|---|---|
| value.js (round-1) | **BROKEN** (hard `dist/` vite alias → 500 on boot) | broken | n/a | **CURRENTLY BROKEN** — hardest case; even dev is down |
| **fourier-analysis/web** | clean (`development` cond) | **BROKEN** | **BROKEN** | **CURRENTLY BROKEN** (build + CI path) |
| **bbnf-buddy** | clean (`development` cond) | **BROKEN** | **BROKEN** | **CURRENTLY BROKEN** (build + CI path) + stale-API debt (§4) |
| **words/frontend** | clean (`development` cond) | **BROKEN** | **BROKEN** | **CURRENTLY BROKEN** (build + CI path) |
| **speedtest** | clean (`development` cond) | **BROKEN** | **BROKEN** | **CURRENTLY BROKEN** (build + CI path) |

**Refinement of the round-1 model.** Round-1 framed the value.js B-1 as a *hard-alias-to-deleted-dist* desync. The 4-consumer sweep shows the alias was only value.js's *aggravating factor* — it broke value.js's **dev** server too. The 4 swept consumers carry **no `dist/` alias**, so their dev servers survive (the `development` export condition routes to `src/`). But every one of them is still **CURRENTLY BROKEN** for `npm run build` and any `vue-tsc` typecheck — because:

- **Production build** uses the `import` condition → `keyframes.js/dist/keyframes.js` → **deleted** → `Failed to resolve entry`.
- **Typecheck** (`vue-tsc`) uses the `types` condition → `keyframes.js/dist/keyframes.d.ts` → **deleted** → `TS2307: Cannot find module`.

So the catalog is: **0 clean, 5 currently broken** (the 4 swept + value.js). No consumer is merely "latently" broken — the latency already expired. `npm run build` / CI is red across the entire `@mkbabb/*` consumer fleet. Only interactive `npm run dev` masks it, which is why the user perceived it as intermittent ("totally broken" on some surfaces).

The single root cause: **keyframes.js shipped a `development` export condition (AD.W4) and deleted its `dist/` (AD.W4 freshness-retire) but never removed the now-dangling `import` + `types` conditions from `package.json` `exports`.** keyframes.js's `package.json` is internally inconsistent — it advertises `dist/` artefacts that its own working tree deleted.

---

## §7 Recommended Q-wave remediations

### R-A — keyframes.js `package.json` exports map (HEADLINE; the single fleet-wide fix)

**Destination**: `keyframes.js/package.json` `exports["."]`. The map currently advertises three conditions; two dangle. Two idiomatic paths for the Q plan:

- **(a) — gestalt, preferred.** keyframes.js commits to a build-artefact-free dev story end-to-end: keep `development → ./src/animation/index.ts`, and repoint `types` + `import` so they ALSO resolve without a checked-in `dist/`. For `types`, point at the source (`./src/animation/index.ts` carries its own `.ts` types) or emit `dist/*.d.ts` as a *build* product the publish step produces (not a checked-in artefact). For `import`, the published-to-npm tarball must contain `dist/keyframes.js` — so the fix is: **`dist/` is a build/publish output, never committed, never expected to exist in a `file:`-linked working tree.** Then consumer production builds against a `file:`-linked keyframes.js must resolve the `development` condition too — achieved by having every consumer's *production* Vite config also pass `mode:"development"`'s conditions, OR (cleaner) keyframes.js exposes a `default` condition pointing at `src/`. A `default → ./src/animation/index.ts` fallback is the minimal, correct closure: it makes `import`/build/`types` all resolve to source when `dist/` is absent, and the published tarball can still ship `dist/` for npm-range consumers via condition ordering.
- **(b) — band-aid.** Run keyframes.js `npm run build` and re-commit `dist/keyframes.js` + `dist/keyframes.d.ts`. Restores the status quo ante but re-introduces the checked-in build artefact the AD.W4 freshness-retire wave was explicitly moving away from. Weaker; do not adopt as the Q resolution.

Path (a) is the gestalt fix and the only one consistent with the AD.W4 architecture. **This single change unblocks all 5 consumers' builds + typechecks simultaneously** — it is the highest-leverage Q-wave item.

This is a keyframes.js-repo write. It is the round-2 analog of round-1's B-1 headline and supersedes round-1's value.js-local R1 framing: the fix belongs in keyframes.js, not in each consumer.

### R-B — value.js hard-alias retirement (round-1 B-1; still required)

**Destination**: `value.js/vite.config.ts`. Retire the `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` hard alias entirely (round-1 Qζ §6 path (a)). Once R-A lands, bare-specifier resolution of `@mkbabb/keyframes.js` works for value.js's dev server too. The hard alias is a pre-`development`-condition legacy artefact and is actively harmful. R-A + R-B together fully close the value.js B-1.

### R-C — bbnf-buddy `<Card variant="pane" flush>` migration (value.js R2 class; 6 sites)

**Destination**: the 6 bbnf-buddy SFCs in §4. Rewrite `<Card variant="pane" flush>` → `<Card tier="wash" :shadow="false">`, dropping `flush` (no glass-ui equivalent; replace with explicit padding utilities if the flush look is load-bearing). A bbnf-buddy cross-repo write wave. This is the bbnf-buddy half of the user's "glass-cards broken" report — the same un-migrated-API debt class as value.js's 11-SFC defect.

### R-D — speedtest `vite.config.ts` `manualChunks` dead-branch cleanup (MINOR; stale config)

**Destination**: `speedtest/vite.config.ts:445-451`. The `id.includes("/keyframes.js/dist/")` + `id.includes("/value.js/dist/")` match arms are dead post-AD.W4 (no module ID resolves through a deleted `dist/`). Harmless but stale — fold into a speedtest config-hygiene pass. The `/@mkbabb/keyframes.js/` + `/@mkbabb/value.js/` arms alongside still catch the `src/` resolution, so the chunk carve survives; this is cleanup, not a fix.

### R-E — glass-ui `Card` silent prop-swallow (round-1 R3; substrate cohesion)

**Destination**: `glass-ui/src/components/ui/card/Card.vue`. Round-1 flagged that `Card` silently swallowing an unknown `variant` prop is the *cohesion gap* that let value.js's debt rot undetected. This sweep proves it is not value.js-specific — bbnf-buddy carries the identical `variant="pane"` debt, independently. The substrate-side decision item stands: either `Card` exposes a named `pane`-like preset (so `variant`/`tier` intent is first-class), or the silent attr-fallthrough is documented as a known sharp edge. A Q-design decision, not a code mandate.

### R-F — consumer build/CI gate audit (process; the gate that would have caught this)

**Destination**: Q process recommendation. Every swept consumer's `npm run build` is currently red, yet the user only noticed via interactive runtime. The `development`-condition dev server masks a broken production build. Q should recommend the cross-repo dev-resolution contract (round-1 Qζ §6 item 4) be a first-class cohesion surface: when any `@mkbabb/*` library flips export conditions or retires `dist/`, **every consumer's `npm run build` is in the blast radius** and must be re-run before the library change is considered closed. A keyframes.js-side CI gate ("does `npm run build` pass in ≥ 1 file-linked consumer") would have caught R-A at AD.W4.

---

## §8 Status

**COMPLETE** — round-2 consumer resolver sweep. All 4 dispatched consumers audited: resolver-config desync table (§2), functional state with live build/typecheck results (§3), stale glass-ui API findings (§4), P.W5 cross-repo write verification (§5), latent-breakage catalog (§6), 6 concrete Q-wave remediations (§7).

**Headline finding**: the value.js B-1 latent-breakage class is **fleet-wide, not value.js-specific**. All 4 swept consumers (fourier-analysis/web, bbnf-buddy, words/frontend, speedtest) are **CURRENTLY BROKEN** for `npm run build` and `vue-tsc` typecheck — uniform `Failed to resolve entry for package "@mkbabb/keyframes.js"` / `TS2307`. The single root cause is **keyframes.js's `package.json` `exports` map advertising `import → ./dist/keyframes.js` + `types → ./dist/keyframes.d.ts` after the AD.W4 freshness-retire wave deleted those artefacts**. Dev servers survive only because the `development` export condition routes to `src/`. The fix (R-A) is one keyframes.js `package.json` change and unblocks the entire fleet at once. bbnf-buddy additionally carries the value.js `<Card variant="pane">` stale-API defect at 6 sites (R-C). All 3 P.W5 cross-repo writes resolve correctly — they are not the cause of any breakage.

No source mutations made. No mutating git in any repo. The only side effects were consumer builds/typechecks and one short-lived bbnf-buddy dev server (killed), all explicitly allowed by the dispatch.
