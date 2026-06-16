# BB — the constellation dependency-modernization band (Batch C foundation + the Batch 5 generalizations)

**USER-DIRECTED 2026-06-16 ("every single repo in our constellation is using the latest version of all packages — no exceptions. No legacy. NO quick solutions, NO workarounds: idiomatic, gestalt approaches… architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable. NO legacy code.").** Adds to `BB.md`. The cross-repo `BB-AMENDMENT-crossrepo.md` band (W-PEER-SPINE / W-ADOPT-RECONCILE / W-LINEAGE-PROBE / W-SLIDES-DRIVE / W-CROSSREPO-ASKS) is the EXISTING `@mkbabb`-adopt home; this amendment GENERALIZES it from the value.js/keyframes singleton to the WHOLE shared spine (vue · vueuse · reka · tailwind · vite · ts + the full `@mkbabb` family) and adds a NEW pre-BB foundation batch (Batch C) so the toolchain BB's own feature work needs (latest vite/TS for the WebGPU suite; the value.js `^0.13.0` peer for W-BORDER-PROGRESS's `sampleColorRamp` consume) is in place before the bands that consume it.

**This is planning/specs only.** Every fact below is read-confirmed against disk + the live registry (the glass-ui peer block at `package.json:819-821,858-860`, the three stale gate scripts, the kf→value dep chain). No edits made to any manifest, lockfile, or source. The Spec phase is the only writer, and only under `docs/tranches/BB/`.

---

## §0 — THE GESTALT (the one-paragraph thesis)

The constellation is NOT "N repos each running `npm update`." It is ONE shared singleton spine (vue · vueuse · reka · tailwind · vite · ts + the `@mkbabb/*` family) that must resolve to ONE coherent latest set across EVERY member, so there is no dual-instance, no peer-mismatch, no stale lineage, no multi-major union, no dist-tag, no ancient major. The legacy is CONCENTRATED, not diffuse: the hub (glass-ui) is the CLEANEST member on the build toolchain (already TS 6.0.3 + Vite 8.0.13 + vueuse 14.3.0 + tailwind 4.3.0 + the full latest spine installed — re-confirmed on disk at `package.json:866-878`) but carries the TWO load-bearing PUBLISHED-CONTRACT defects: the keyframes multi-major peer union (`:819`) and the value.js broken-singleton cap (`:821`). The leaves keyframes.js + value.js are the FORWARD EDGE (already TS6/Vite8/rolldown-native). speedtest is the leading CONSUMER (TS6/Vite8). The lag is in fourier · slides · sci-report (TS5/Vite7 + stale glass-ui lineage caps) and the dead island `colors` (TS4, zero consumers). The headline architectural fact: **the value.js spine break is hub-rooted and gates the whole constellation** — no consumer can resolve a single coherent value.js until glass-ui widens its peer to `^0.13.0`. That one hub edit is the keystone; everything else cascades from it.

---

## §1 — THE ONE COHERENT LATEST SPINE (the manifest table)

The exact target for every shared singleton, chosen so each resolves to ONE instance everywhere. Caret form is the published idiom (broad floor for libraries, the resolver dedups to the single installed latest); exact pins are explicitly re-carated. One line per spine member.

### The build/runtime singleton spine

| Singleton | Coherent-latest target | Caret discipline | Lagging members to lift |
|---|---|---|---|
| **vue** | 3.5.38 | `^3.5` (lib peer) · `^3.5.38` (app floor) | slides `^3.5.13`, speedtest **`3.5.34` exact → re-caret `^3.5`** (NEW-G), fourier/sci-report re-resolve only |
| **@vueuse/core** | 14.3.0 | `^14` (peer) · `^14.3.0` (app) | speedtest `^14.2.1`; all else converged. **ONE irreducible dual** (vaul-vue, §2 CLASS-2) |
| **reka-ui** | 2.9.10 | `^2.9` | all members behind-patch within range — re-lock only |
| **tailwindcss** (+ `@tailwindcss/vite`/`/postcss`/`/cli` in lockstep) | 4.3.1 | `^4.3.1` (tighten the wide `^4.0` floors) | slides/sci-report wide `^4.0` floors → tighten; all resolve forward |
| **vite** | 8.0.16 | `^8` | **fourier `^7`, slides `^7`, sci-report `^7` → `^8`** (the Rolldown major); glass-ui/kf/value/speedtest already on 8 |
| **typescript** | 6.0.3 | `^6` | **colors `^4.1.3`, fourier `^5.8`, slides `^5.7`, value-api/ `^5.7`, pencil-boil `^5.7` → `^6`**; glass-ui/kf/value-root/speedtest already on 6 |
| **vue-tsc** (lockstep with TS6) | 3.3.5 | `^3.3.5` | **fourier `^2.0`, slides `^2.2.0`, sci-report `^2` → `^3`** (vue-tsc 3 targets the TS6 language-tools; ATOMIC with the TS6 bump) |
| **vitest** (+ `@vitest/coverage-v8`) | 4.1.9 | `^4.1.9` | value-root+api `^3.2.4` → `^4` (LOCKSTEP across both value.js test programs); all else minor catch-up |
| **@lucide/vue** | 1.20.0 | `^1.16.0` (peer floor — KEEP wide) · dev `^1.20.0` | the v1-rename target; **fourier must MIGRATE off deprecated `lucide-vue-next`** (35 sites, NEW-A) |
| **@types/node** | `^24` (LTS-aligned, above `engines.node >=22`) | one fleet-wide major | **split-major hazard** (22/24/25) — glass-ui/value-root/speedtest-root already `^24`; collapse fourier `^25`, value-api/speedtest-server `^22` onto `^24`; sci-report `^22` is an engine-aligned intentional floor (lift only if the fleet agrees, else record the exception) |

### The `@mkbabb/*` family spine + the caret discipline

| `@mkbabb` package | Coherent target | THE discipline that ends the legacy |
|---|---|---|
| **parse-that** | `^0.9.0` | already coherent at HEAD across kf + value; the dual-installs (fourier 0.8.2, sci-report 0.8.2 nested) collapse to ONE 0.9.0 *downstream of* the value.js bump (value 0.13.0 deps parse-that `^0.9.0`) — NOT an independent edit |
| **value.js** | `^0.13.0` | **THE BROKEN-SINGLETON FIX.** glass-ui peer + dev `^0.10.0`/`^0.11.0` → `^0.13.0` (singleton IDENTITY, not tolerated-overlap). Every direct consumer (fourier `^0.10.0`, speedtest `^0.11.2`, sci-report `^0.11.1`) → `^0.13.0`. kf already deps `^0.13.0` at 4.3.0 |
| **keyframes.js** | `^4.3.0` (clean `^4`) | **THE MULTI-MAJOR-UNION FIX.** glass-ui peer `^2.2.0 \|\| ^3.0.0 \|\| ^4.0.0` → `^4.0.0` (clean caret, no union). kf-vue subpackage peer `>=4.2.0` → `^4.0.0` (clean caret, no open lower-bound). Consumers: fourier `^2.2.0`/slides `^3.0.0` → `^4.3.0`; speedtest/sci-report already `^4.1.0` → `^4.3.0` |
| **pencil-boil** | `^0.4.1` | **THE DIST-TAG FIX.** fourier `latest` → `^0.4.1`. glass-ui/sci-report already clean `^0.4.1` |
| **latex-paper** | `^0.2.x` (REPUBLISH-GATED) | transitive leaf of fourier; its OWN peers `vite ^6\|\|^7` (no 8) + `katex ^0.16` (no 0.17) + `parse-that ^0.7.1` (no 0.9) BLOCK fourier's spine advance. Must republish with widened peers FIRST (BEAT 4) |
| **glass-ui** | `^4.0.0` (next cut 4.1.0) | **THE STALE-LINEAGE FIX.** fourier `^3.1.0`, slides `3.13.0` (exact), speedtest `^3.10.0`, sci-report `^3.12.0` → `^4.0.0`. The hub republishes a peer-widen minor (the 4.1.0 fold-all cut; §A4 cadence) |
| **colors** | RETIRE (§3 T6) | unpublished island, zero consumers, superseded by value.js's color engine |

### The value.js pre-1.0 lockstep regime (the caret-discipline forward note)

value.js is pre-1.0, where **every minor is a breaking change** (`^0.13.0` admits `0.13.x` only — NOT `0.14.0`). This is why the broken-singleton RECURS: a kf minor that bumps its value.js dep floor (0.11 → 0.13) silently strands any consumer cap one minor back. The forward discipline: **until value.js cuts 1.0.0, the entire constellation moves its value.js range in LOCKSTEP on every value minor** — there is no "broad caret floor" safety the way `^14` gives vueuse. The `proof:constellation-spine` gate (§6) carries a comment noting this is a *pre-1.0 lockstep regime*, NOT a permanent one; when value.js reaches 1.0.0 the family migrates to `^1` broad-caret floors and the lockstep-per-minor obligation dissolves (a value 1.x minor becomes non-breaking by semver). **The cleanest architectural move — flagged as a candidate headline, NOT assumed:** promote value.js to 1.0.0 as part of BB so the family can adopt normal caret semantics and the recurring break ends structurally (a value.js-tranche-N decision, recorded for the user's call, not a glass-ui edit).

---

## §2 — THE LEGACY-CLASS LEDGER

Every instance of the 6 classes (+ the new classes found), grouped by class, each with the repo + the clean-break fix. "No legacy / clean break, no alias" governs every row.

### CLASS 1 — MULTI-MAJOR UNION (`||` ranges)

| Repo | Where | Fix |
|---|---|---|
| **glass-ui** | peer `@mkbabb/keyframes.js: ^2.2.0 \|\| ^3.0.0 \|\| ^4.0.0` (`package.json:819`, confirmed on disk) | → `^4.0.0`. The `^2`/`^3` arms are pure legacy once the fleet is on kf 4. **Enables code deletion** — §3 T1 |
| **sci-report** | `pinia: ^2.3 \|\| ^3.0` (app-local; resolves 3.0.4, the `^2.3` arm dead) | → `^3.0` |

*(Latent/inherited: fourier's direct kf `^2.2.0` sits at the bottom of glass-ui's union; collapsing the union is the consumer half of the fix.)*

### CLASS 2 — BROKEN SINGLETON / DUAL INSTALL (the W-PEER-SPINE break, GENERALIZED)

| Repo | Manifestation | Fix |
|---|---|---|
| **glass-ui (ROOT CAUSE)** | peer value `^0.10.0 \|\| ^0.11.0` (`:821`) caps below kf 4.3.0's value `^0.13.0`. CONFIRMED-LIVE on disk: installed kf 4.2.0 deps value `^0.11.2` (`node_modules/@mkbabb/keyframes.js/package.json`) — the un-widened range BARELY intersects at 0.11.2 and does NOT intersect kf 4.3.0's `^0.13.0` | peer + dev value → `^0.13.0`; dev kf `^4.1.0` → `^4.3.0` (lockstep) |
| **keyframes.js** | `npm ls @mkbabb/value.js` → ELSPROBLEMS: installed 0.13.0 INVALID against glass-ui's peer. Masked by `.npmrc legacy-peer-deps=true` | NO kf edit; **DELETE `.npmrc legacy-peer-deps` once the hub peer widens** (concrete legacy deletion the bump enables — sequenced after BEAT 3) |
| **fourier** | direct value `^0.10.0` + glass-ui peer + kf 4.3.0 dep → triple-cap conflict | direct value → `^0.13.0`, in lockstep with the hub widen |
| **speedtest** | LATENT — engages on glass-ui → 4.0.0: peer `^0.13.0` vs held direct `^0.11.2` + unbumped kf | all three (glass-ui `^4`, kf `^4.3.0`, value `^0.13.0`) move together or dual-install results |
| **sci-report** | direct value `^0.11.1` caps below kf 4.3.0's `^0.13.0`; GATED on hub peer widen | direct value → `^0.13.0` (BLOCKED until hub peer widens) |
| **value.js (intra-repo)** | root demo zod `^3.x` (vee-validate-constrained) vs api/ zod `^4.4.3` — two zod majors in ONE repo | unify on zod 4 — UPSTREAM-GATED (NEW-E) |

**Two transitive dual-installs to track:**
- **parse-that** (fourier 0.8.2-nested, sci-report 0.8.2-nested) — collapses to ONE 0.9.0 *downstream of* the value.js → 0.13.0 bump. Not independent.
- **@vueuse/core 10.x** (sci-report nested 10.11.1; same in glass-ui itself) — **IRREDUCIBLE**: vaul-vue@0.4.1 (the Drawer substrate) HARD runtime-deps `@vueuse/core ^10.8.0`, latest vaul-vue still 0.4.1, no upstream fix. **This is the LONE dual-install the BB bump CANNOT clear.** Recorded as a constellation-scope architectural DECISION (fork vaul-vue to widen the vueuse dep, OR replace the Drawer substrate) booked to a successor — NOT a BB-blocking item.

### CLASS 3 — STALE-LINEAGE CAP on `@mkbabb/glass-ui`

| Repo | Range | Fix + carried breaks |
|---|---|---|
| **fourier** | `^3.1.0` (3 majors back) | → `^4.0.0`. **HARD BREAKS:** UnderlineTabs → SegmentedTabs (3 sites), lucide-vue-next → @lucide/vue (35 sites) |
| **slides** | `3.13.0` exact (d6 lineage) | → `^4.0.0`. **API-CLEAN** (zero retired-surface usage); risk is VISUAL token-default shifts only |
| **speedtest** | `^3.10.0` (d6 lineage) | → `^4.0.0`. 61 import sites across ~40 subpaths; e2e/visual sweep mandatory (the BA surface changes) |
| **sci-report** | `^3.12.0` (the named d6 stale-lineage version) | → `^4.0.0`. **HARD BREAKS:** `useRouteTransition` REMOVED (GalleryView.vue 2 sites), `supportsViewTimeline` pulled off the public surface (useScrollProgress.ts) |

### CLASS 4 — DIST-TAG / STAR (`latest`/`*`/pre-release-`next`)

| Repo | Dep | Fix |
|---|---|---|
| **fourier** | `@mkbabb/pencil-boil: latest` | → `^0.4.1` |
| **fourier** | `lucide-vue-next: latest` (ALSO deprecated) | → MIGRATE to `@lucide/vue ^1.20.0` (NEW-A) |
| **fourier** | `tw-animate-css: latest` | → `^1.4.0` |
| **value.js** | `v-calendar: ^3.1.2` rides the `next` PRE-RELEASE dist-tag (latest stable 2.4.2) | resolve the 3.x-track decision explicitly + pin highest stable 3.x (or drop to 2.4.2 if 3.x abandoned) — the pre-release-lineage trap |

### CLASS 5 — ANCIENT MAJOR

| Repo | Dep(s) | Fix |
|---|---|---|
| **colors** | TS `^4.1.3` · eslint `^7` · @typescript-eslint/* `^4` · prettier `^2` (the entire 2021 toolchain) | RETIRE the repo (T6); if kept, collapse to TS6 + eslint10-flat + ts-eslint-8-umbrella + prettier3 |
| **fourier** | TS `^5.8`, vite `^7`, vue-tsc `^2.0`, pinia `^2.3`, vue-router `^4.5`, katex `^0.16` | TS6+vue-tsc3+vite8 trio (lockstep); pinia `^3`; vue-router `^5`; katex `^0.17` (latex-paper-gated) |
| **slides** | TS `^5.7`, vite `^7`, vue-tsc `^2.2.0`, vue-router `^4.5`, pptxgenjs `^3.12.0`, @types/node `^22` | TS6+vue-tsc3+vite8 trio; vue-router `^5`; pptxgenjs `^4` |
| **sci-report** | TS `^5.8`, vite `^7`, vue-tsc `^2`, vue-router `^4.5` | TS6+vue-tsc3+vite8 trio; vue-router `^5` |
| **value.js (api/)** | TS `^5.7` (vs root TS6), @hono/node-server `^1`, dotenv `^16`, mongodb `^6`, node-cron `^3`, mongodb-memory-server `^10` | api/ → TS6 (intra-repo unify); the api-stack majors (hono-server 2, dotenv 17, mongodb 7, node-cron 4, mms 11) |
| **pencil-boil** | TS `^5.7` | → `^6` (safe no-op; source erasable-syntax-clean) |

**Class-5-adjacent (split major within one repo):** value.js (TS root-6/api-5, @types/node root-24/api-22), speedtest (@types/node root-24/server-22, server/worker/client Node-target split). Unify each intra-repo.

### CLASS 6 — FILE LINK

| Repo | Link | DECISION (vs contract-v2) |
|---|---|---|
| **value.js** | `@mkbabb/glass-ui: file:../glass-ui` (demo-only) | **KEEP** — contract-v2's dev posture IS the file:link symlink + dist-resolution + build:watch freshness. dist-resolution already enforced (vite alias → dist, glass-ui dist-only exports). NO registry-resolve change wanted in dev |
| **value.js** | `@mkbabb/keyframes.js: file:../keyframes.js` | **DELETE OUTRIGHT** — ORPHAN: imported in ZERO src/demo/scripts/test/e2e files (exhaustive grep). Phantom devDep, pure dead weight. (NEW finding) |

*(No file:links in glass-ui's own manifest, fourier, slides, speedtest, sci-report, pencil-boil, colors — all registry-resolving consumers, contract-v2-correct.)*

### NEW CLASSES (found across the surveys)

- **NEW-A — DEPRECATED PACKAGE:** fourier `lucide-vue-next` (officially deprecated: "Please use @lucide/vue instead"), 35 import sites. Compound legacy (star-pin + deprecated). → migrate all 35 sites to `@lucide/vue`.
- **NEW-B — DEAD/ORPHAN DEPS:** fourier `tailwind-merge ^3.0` (zero usages — glass-ui's `cn()` supersedes), fourier `clsx ^2.1` + `class-variance-authority ^0.7` (zero DIRECT usages — glass-ui peers carry them); value.js `@mkbabb/keyframes.js` file:link (orphan, above). → prune.
- **NEW-C — PHANTOM/GARBAGE PIN:** colors `typescript-eslint: ^0.0.1-alpha.0` (placeholder alpha predating the real umbrella, coexisting redundantly with the legacy @typescript-eslint/* split). → delete or collapse onto the modern umbrella.
- **NEW-D — DEAD-UPSTREAM CONFIG:** colors + speedtest `eslint-config-google ^0.14.0` (literal-latest but ABANDONED since 2020/2023, eslintrc-format, incompatible with ESLint 9+ flat-config). → retire entirely (bumping eslint strands it).
- **NEW-E — UPSTREAM-BLOCKED BUMP (do NOT force):** zod 3 → 4 in keyframes.js + value.js-root — gated by `@vee-validate/zod` peer `zod ^3.24.0`. Leave at zod 3 until vee-validate ships a zod-4 peer. NOT laziness — a hard upstream constraint.
- **NEW-F — REPUBLISH-PREREQUISITE LEAF:** `@mkbabb/latex-paper 0.2.1` peers `vite ^6\|\|^7` (no 8) + `katex ^0.16` (no 0.17) + `parse-that ^0.7.1` (no 0.9). Blocks fourier's vite-8/katex-0.17/single-parse-that advance. Must republish with widened peers (BEAT 4).
- **NEW-G — PINNED-EXACT singletons:** speedtest `vue: 3.5.34` + `vue-router: 5.0.7` (no caret) — freeze the shared singletons behind latest and break lockstep float. → re-caret `^3.5` / `^5`.
- **NEW-H — STALE GATE PINS in glass-ui (the BUMP BLOCKER — confirmed on disk):** the gate scripts hard-pin the stale versions and RED on the bump BY DESIGN.
  - `proof-peer-conformance.mjs` — `KEYFRAMES4_VALUE_DEP = "^0.10.0"` (`:37`) + `PINNED_LATEST {kf 4.0.0, value 0.11.1}` (`:31-33`) + the `semver.intersects` dual-install model (`:81-91`). All now FACTUALLY FALSE: kf 4.3.0 deps value `^0.13.0`, not `^0.10.0`. (the T1.1 COLLAPSE target.)
  - `proof-motion-suite.mjs` — VERSION STAMP `/^4\.1\./` on kf + `/^0\.1[01]\./` on value (`:114,119`) — both born-RED on the bump (kf → 4.3.x, value → 0.13.x). (the T1.2 RE-ENUMERATE target — a deliberate "bump forces a re-run" tripwire.)
  - `proof-design-md-current.mjs` — doc-currency version strings. **Nuance (read-confirmed):** this gate is value.js's OWN design.md currency arm (v4.1 → v5.0 markers), NOT a glass-ui kf/value version stamp. The brief lists it as a re-anchor target; the spec records it as a value.js-side doc-currency item (BEAT 1's intra-repo work), not a glass-ui BEAT-3 gate re-anchor. Re-confirm at HEAD before touching.
- **NEW-I — BROKEN PACKAGE METADATA (colors):** `main: "index.js"` points at a non-existent file; no `type:module`/`exports`/`types`/`files`; stray compiled `src/*.js` checked in beside `src/*.ts`. Unconsumable as published-shaped ESM. (Moot if retired.)
- **NEW-J — DOC-vs-REALITY DRIFT (glass-ui):** CLAUDE.md still claims the `@/* → src/` tsconfig alias (retired per v0.8.2; NO tsconfig declares it) + the stale peer ranges in the deps table. Fold the CLAUDE.md deps-table + alias line into the bump.

---

## §3 — THE ARCHITECTURAL TRANSPOSITIONS (the delete-legacy-code wins)

The deduped real simplifications — each a major bump that lets us DELETE legacy, not just re-pin. Per the "architectural transpositions for elegance/simplicity/performance are necessary and desirable; no legacy code" mandate.

### T1 — The kf-union-removal code deletion in glass-ui (the keystone simplification)

Three deletions enabled by collapsing the keyframes peer `^2\|\|^3\|\|^4` → `^4` + the value peer → `^0.13.0`:

1. **`scripts/proof-peer-conformance.mjs` — collapse the dual-instance INTERSECTION model to a single-singleton IDENTITY assertion.** Today the gate models "does glass-ui's value peer INTERSECT kf4's value dep so npm dedups?" (`semver.intersects`, the `KEYFRAMES4_VALUE_DEP` constant `:37`, the `PINNED_LATEST` pins `:31-33`, the multi-combo prose `:5-22` — all confirmed on disk and now factually FALSE: kf 4.3.0 deps value `^0.13.0`, not the pinned `^0.10.0`). With the fleet in lockstep there is ONE coherent value range; the gate simplifies from "ranges intersect" to "glass-ui value peer == kf's value dep floor" — a strict singleton check, **DELETING the `KEYFRAMES4_VALUE_DEP` constant + the intersection branch + the multi-combo prose**. The broken-singleton stops being a tolerated-overlap and becomes an enforced IDENTITY. This is the architectural simplification the bump exists to enable.
2. **`scripts/proof-motion-suite.mjs` — RE-ENUMERATE (not widen) the VERSION STAMP.** The `/^4\.1\./` + `/^0\.1[01]\./` regexes (`:114,119`) are a deliberate "bump forces a re-run" tripwire. Re-run the manifest against kf 4.3.x + value 0.13.x and re-pin the regexes to the new majors. **Honor the tripwire — do NOT loosen to a wildcard.**
3. **`src/composables/motion/useNumericTransition.ts` (the multi-major compat COMMENT) + `proof-design-md-current.mjs`.** The "assignable to every supported keyframes major (2.2/3/4)" comment + the doc-currency version strings are stale legacy commentary deletable at clean `^4`. (The callable-vs-string narrowing may survive for the value.js dynamic-boundary reason; only the multi-major justification is deletable.)

### T2 — The Vite-7 → 8 unification (the reference-config lift)

The kf, value.js, and speedtest configs are ALREADY the Rolldown-native idiom — they are the REFERENCE the laggards converge TO, NOT repos needing Vite work:
- **kf**: `rolldownOptions.output.advancedChunks` + the documented manualChunks → advancedChunks removal.
- **value.js**: `rolldownOptions.output.codeSplitting.groups` + `attachDebugInfo:'none'` + the regex external — **LIFT this as the canonical Vite-8 transposition target.**
- **fourier/slides/sci-report**: each already uses the **Rolldown-COMPATIBLE single-arg `manualChunks(id)` form** (fourier object-form, slides/sci-report single-arg). The vite 7 → 8 bump is therefore **LOW/ZERO-friction code-wise** — a version bump + a re-verify that `output.advancedChunks` is NOT also set (Rolldown ignores manualChunks if both are). No idiom rewrite forced. (fourier's blocker is latex-paper's vite peer cap, NOT the plugin: `@vitejs/plugin-vue 6.0.7` already peers `vite ^5\|\|^6\|\|^7\|\|^8`.)

### T3 — The TS-5/4 → 6 modernization

- **colors** TS4 → 6 (with the full eslint-trio collapse) — moot if retired (T6).
- **fourier/slides/sci-report** TS5 → 6 + vue-tsc 2 → 3 (ATOMIC lockstep; vue-tsc 3 uses the workspace TS, deleting the vue-tsc-2-pinned-TS skew). **No tsconfig legacy flags to delete** — all three are already the modern `moduleResolution:bundler` + `verbatimModuleSyntax` + ES2022 shape; the bump is a version move, not a config rewrite.
- **value.js api/** TS5 → 6 (intra-repo unify; verify Node16 resolution stays clean under TS6).
- **pencil-boil** TS5 → 6 — safe no-op (source erasable-syntax-clean; tsconfig already TS6-idiomatic; `tsc --noEmit` stays green).

### T4 — The 3.12 → 4.0 glass-ui API-break migrations (consumer-side)

The desirable simplifications the glass-ui major bump FORCES (delete an indirection, not just rename):
- **sci-report**: `useRouteTransition().navigate(...)` (2 sites) → bare `navigate(fn, {types})` — one fewer indirection object, the library-canonical idiom. + `supportsViewTimeline`: either glass-ui re-exports it on /motion-core (it's dependency-free, root-safe) OR the consumer inlines the 2-line native `CSS.supports` check + DELETES the cross-package coupling on a private leaf.
- **fourier**: UnderlineTabs (3 sites) → `SegmentedTabs variant="underline"` (3 bespoke tab dialects collapse to ONE engine with the centered-indicator + spring-squish + ARIA-per-variant the old lacked); lucide-vue-next (35 sites) → `@lucide/vue` (unifies onto the hub's peer, one icon-package instance); DELETE 3 dead deps (tailwind-merge + the two redundant peer-dupes, NEW-B).
- **speedtest**: the deep 61-site adopt (Button glass-first default, disco/audacious retirement, SegmentedTabs std, feedback-tone collapse, dark-material) — runtime-visual breaks vue-tsc+units MISS (per [[feedback_glass_ui_binding_verification]]); an **e2e/visual sweep is mandatory**. Plus: re-derive the keyframes-engine chunk buckets in the 1048-line vite.config.mjs (FOSSIL kf-2.2.0 prose against kf 4.3.0's broader dynamic-engine emit — the single largest cleanup surface); re-baseline the route-weight/budget caps post-4.0.0; fold the local `cn()` onto glass-ui's exported `cn()` + retire `tailwind-merge`.
- **slides**: API-CLEAN (zero retired-surface usage verified) — VISUAL re-verify only (W-DARK-MATERIAL token re-anchor, W-GLASS-CAL spring re-timing reaching `--spring-deck`, W55 tint seam); opportunity to DELETE feedback-coder theme.css scoped overrides the 4.0.0 defaults now supersede. (Coordinated with W-SLIDES-DRIVE — the driven exception.)

### T5 — The file-link → contract-v2 DECISION

**Confirmed posture: KEEP the file:links, registry-resolve nothing in dev.** Contract-v2 (`docs/precepts/cross-repo-dev-resolution.md`, invariant 30) wants exactly the dev symlink + dist-resolution + build:watch freshness that value.js already runs (vite alias → dist, glass-ui dist-only exports). The glass-ui file:link in value.js is contract-v2-CORRECT. The ONLY file-link action is **deleting the ORPHAN keyframes.js file:link** (zero importers — the value.js intra-repo work). kf is the reference that registry-resolution-in-dev ALSO works — but no consumer needs to ADOPT it; the fleet is already split correctly (leaves file-link siblings; consumers registry-resolve).

### T6 — The colors publish-vs-vendor-vs-RETIRE decision

**RECOMMENDATION: RETIRE.** colors is a 2021 pure-TS island (last commit 2021-03-22, npm 404, node_modules absent), ZERO constellation consumers (no package.json deps it, no code imports `@mkbabb/colors`; the only mentions are two fourier docs that explicitly call it unrelated), and its functionality (hex/rgba/hsla + gradient interpolation across color keyframes) is fully SUPERSEDED by the live published `@mkbabb/value.js 0.13.0` (`src/units/color/`). Spending a wave modernizing 7 dead devDeps + rebuilding broken package metadata on a zero-consumer island CONTRADICTS the "no legacy, gestalt, delete-don't-patch" mandate. The cleanest "delete legacy code" outcome in the whole tranche is to **archive/deprecate colors and let value.js stand as the constellation's color authority.** (Keep-path fully specced as the fallback IF the user insists: TS6 + eslint10-flat + ts-eslint-8-umbrella + prettier3, delete `.eslintrc.json` + eslint-config-google + the phantom alpha pin, add type:module/exports/types/files, delete stray `src/*.js`, regen lockfile.)

### T7 — The pencil-boil "latest" → pin (trivial)

fourier `@mkbabb/pencil-boil: latest` → `^0.4.1`. pencil-boil itself needs only TS5 → 6 + a lockfile refresh (vue resolved 3.5.29 stale vs 3.5.38). Its vue peer floor `^3.5.0` STAYS broad (correct leaf-peer idiom — do NOT tighten to exact).

---

## §A1 — THE BATCH C FOUNDATION (the pre-BB spine-to-latest + glass-ui self-modernization + the born-RED gate)

**Batch C runs WITH/BEFORE Batch 0** (the integrity floor). The rationale: BB's feature work needs the latest toolchain to be IN PLACE before the bands that consume it — the WebGPU suite (Batch V) needs latest vite/TS; the value.js peer-widen UNBLOCKS W-BORDER-PROGRESS's (Batch P) `sampleColorRamp` consume; the gate harness (Batch 0's `proof:gate-script-parity`/`proof:gate-manifest-sound`) must be sound before Batch C extends gates. So Batch C is sequenced as a **pre-Batch-0 foundation that lands the hub's own modernization** (glass-ui edits are DIRECT — the hub is not a driven foreign tree), with the cross-repo CONSUMER adopt deferred to the GENERALIZED Batch 5 (§A2). Three waves:

### W-SPINE-LATEST — glass-ui's own toolchain + family-spine to coherent-latest (the hub self-modernization)

- **Charge:** bring glass-ui's OWN manifest to the §1 coherent-latest spine in lockstep — the keyframes multi-major union (`:819`) → `^4.0.0`, the value broken-singleton cap (`:821`) → `^0.13.0`, the dev kf `^4.1.0` (`:858`) → `^4.3.0`, the dev value `^0.10.0` (`:860`) → `^0.13.0`, the @lucide/vue dev `^1.16.0` → `^1.20.0`, and the in-range catch-ups (reka `^2.9.7` → `^2.9`-floor-at-latest, tailwind `^4.3.0` → `^4.3.1`, vite `^8.0.13` → `^8`, @types/node to the fleet `^24`). The build/runtime singletons (vue/vueuse/ts) are ALREADY latest on disk (`:866-878`) — re-lock only, no edit. **This is the keystone hub edit** the whole constellation waits on (the value `^0.13.0` peer is what restores the single-instance intersection against kf 4.3.0's `^0.13.0` value dep — the dual-install fix, not a cosmetic).
- **The T1 code deletions ride here, atomic with the bump:** the `proof-peer-conformance.mjs` intersection-model collapse to the singleton-IDENTITY check (DELETE `KEYFRAMES4_VALUE_DEP` + `PINNED_LATEST` stale pins + the multi-combo prose); the `proof-motion-suite.mjs` VERSION STAMP RE-ENUMERATE to kf 4.3.x/value 0.13.x (honor the tripwire — re-pin, never wildcard); the `useNumericTransition.ts` multi-major compat-comment deletion; the CLAUDE.md deps-table + `@/*`-alias-line fold (NEW-J).
- **The registry single-owner rule:** W-SPINE-LATEST OWNS `package.json` + the three gate scripts + CLAUDE.md for Batch C; the siblings emit rows. The orchestrator owns the install/lockfile leg (the agent edits the manifest, the orchestrator re-resolves).
- **Hard gate:** `proof:constellation-spine` (the W-SPINE-CONSTELLATION wave below mints it, born-RED) + the existing `proof:peer-conformance`/`proof:peer-optional`/`proof:motion-suite` stay GREEN after the collapse/re-enumerate. `npm run typecheck` + `npm run build` GREEN against the bumped devDeps (the lib must build against the version a 0.13.x consumer holds — the devDep-lags-peer trap closed). A value 0.13.x API drift that breaks the build is a scope-reveal → triumvirate, never a silent pin-back.
- **GENERALIZES `BB.W-PEER-SPINE`:** W-PEER-SPINE's narrow "widen value `^0.12`/`^0.13`" is SUBSUMED — W-SPINE-LATEST does the clean-break `^0.13.0` IDENTITY (no `||` union of value minors; the lockstep regime per §1) + the kf union collapse + the T1 deletions. W-PEER-SPINE's spine-arm on `proof:peer-optional` is RECONCILED into `proof:constellation-spine`'s clause 1 (the identity check). See §A3 for the reconciliation.

### W-SPINE-CONSTELLATION — the born-RED `proof:constellation-spine` gate (the durable machine-lock)

- **Charge:** mint `scripts/proof-constellation-spine.mjs` (§6) — the born-RED cross-repo probe that machine-locks the coherent-latest invariant across every constellation member's `package.json`. It is the cross-repo TWIN of `proof:webgl-substrate-single` (ONE substrate within a repo → ONE coherent spine across the fleet) and the GENERALIZATION of `proof:peer-conformance` (one repo's peer-conformance → the fleet's spine-conformance). Register in `package.json` + `gates.mjs` tagged `["local"]` (a cross-repo gate cannot block a single repo's ci/release while the fleet is mid-adopt — the `proof:ba-gestalt` born-RED → promote model). The single authorized verdict-flipper is the Batch 5 closure (W-SPINE-ADOPT) when every member resolves the coherent set.
- **The six clauses** (§6): (1) spine resolves to ONE coherent set + the value-peer == kf-value-dep IDENTITY; (2) no multi-major `||` on any `@mkbabb/*`; (3) no dist-tag/star/pre-release-next on any `@mkbabb` or shared singleton; (4) no stale-lineage glass-ui cap (`^4.x`); (5) no ancient major (TS `^6`, vite `^8`, vue-tsc `^3`); (6) the BB-invariant-11 registry-consumer probe before any prune. Each born-RED on the pre-bump tree.
- **Hard gate:** `proof:constellation-spine` itself (born-RED) + `proof:gate-script-parity`/`proof:gate-manifest-sound` stay GREEN after the registration.
- **The pre-1.0 lockstep comment** (§1) rides in the gate header — the regime is pre-1.0, not permanent; the value.js → 1.0.0 promotion candidate (the headline) is recorded as the dissolve trigger.

### W-SPINE-LEDGER — the legacy-class ledger + the dependency-order book (the planning artefact made machine-readable)

- **Charge:** author `docs/tranches/BB/audit/spine/legacy-class-ledger.md` (the §2 ledger, MACHINE-marked so `proof:constellation-spine` clause-by-clause cross-references it) + `docs/tranches/BB/audit/spine/dependency-order-book.md` (the §A4 publish beats + the cascade summary). This is the glass-ui-SIDE record of the WHOLE-constellation plan (the by-name asks for the foreign trees, the leaf/consumer modernization scope), the planning artefact the Batch 5 adopt waves consume. No source/manifest edit (it is a doc + the gate's cross-reference target).
- **Hard gate:** none net-new (it feeds `proof:constellation-spine` + `proof:constellation-adopt`); `git diff --check` only. It is a content artefact (inv-26 — content-only coordination for the foreign-tree scope).

---

## §A2 — THE BATCH 5 GENERALIZATIONS (the consumers adopt the coherent set; leaves → glass-ui → consumers)

The EXISTING cross-repo band (`BB-AMENDMENT-crossrepo.md §A2/§A3`) is GENERALIZED from the value.js/keyframes singleton to the WHOLE spine. The leaf-publisher modernization + the per-consumer modernization join as NAMED waves. The dependency-ORDER (leaves → glass-ui → consumers, §A4) is the spine.

### W-PEER-SPINE → GENERALIZED into W-SPINE-LATEST (Batch C) + the residue

`BB.W-PEER-SPINE` was the narrow "widen value `^0.12`/`^0.13` on `proof:peer-optional`." The constellation mandate SUPERSEDES it: the clean-break `^0.13.0` IDENTITY (no minor `||` union — the lockstep regime) + the kf union collapse land in **W-SPINE-LATEST (Batch C)**, the keystone hub edit. W-PEER-SPINE's machine-lock RECONCILES into `proof:constellation-spine` clause 1. **W-PEER-SPINE is NOT a separate count at HEAD** — it is the predecessor name of the Batch C W-SPINE-LATEST hub-edit (recorded so the arithmetic is unambiguous; the Batch 5 row becomes a back-pointer to Batch C). See §A3.

### W-ADOPT-RECONCILE → GENERALIZED (the consumers adopt the coherent SET + the stale-prop-binding probe)

`BB.W-ADOPT-RECONCILE` owned the cross-repo adopt LOOP (consumer-staleness + phantom-classes + resolution + the fourier `^3.1→^4` re-pin book). The generalization: the re-pin book becomes the **MULTI-EDGE coherent-set adopt** (glass-ui `^3.1→^4`, kf `^2.2→^4.3`, value `^0.10→^0.13` in LOCKSTEP — a glass-ui-only re-pin leaves a peer mismatch, per the coherence-harden §1 hardening) across ALL FOUR consumers (fourier · slides · speedtest · sci-report), and the loop gains the **stale-PROP-binding probe** ([[feedback_glass_ui_binding_verification]] — sci-report's `variant=rail` break is a SILENT no-op; `proof:consumer-staleness` detects deleted SYMBOLS + retired CSS-classes but NOT stale prop bindings). The per-consumer adopt is recorded as BOOKS (inv-16 — the consumer applies in ITS tranche, except slides the driven exception); the SURFACE adopt is the per-consumer e2e/visual sweep (the gate locks the SPINE, the π/visual gates lock the SURFACE — the honest scope note, §6).

### W-LINEAGE-PROBE → GENERALIZED (the registry-consumer probe over the WHOLE coherent set)

`BB.W-LINEAGE-PROBE` mechanized invariant 11's "registry-consumer probe before any prune" + enrolled the Atlas (sci-report/usf/web) + slides. The generalization: `proof:constellation-spine` clause 6 IS the registry-consumer probe in the spine gate (the constellation membership the probe walks is the SAME `constellation.mjs` CONSUMERS both waves read). The two stay file-disjoint (W-LINEAGE-PROBE owns the PRUNE-side probe; `proof:constellation-spine` owns the SPINE-side coherence; clause 6 cross-references the lineage probe, never re-implements it).

### W-SLIDES-DRIVE → CARRIES the slides spine-lift (the one driven exception)

`BB.W-SLIDES-DRIVE` drives slides Tranche N. The generalization folds the slides 6-major build-spine lift (glass-ui 3.13.0-exact → `^4.0.0` + kf `^3` → `^4.3.0` (flips value.js dep → peer — verify ONE deduped value.js) + TS6/vue-tsc3/vite8 trio + vue-router 5 + pptxgenjs 4 + the @types/node `^24` collapse) INTO the slides drive — slides is the ONE foreign tree BB edits directly. API-clean → visual re-verify pass (T4). The DELETE of the feedback-coder theme.css scoped overrides the 4.0.0 defaults supersede is the slides-side "no legacy code" win.

### W-LEAF-MODERNIZE — the leaf-publisher modernization (BEATs 0–2 + 4; the foreign-tree fence, by-name asks)

- **Charge:** record the by-name asks + consume contracts for the LEAF modernization (value.js / keyframes.js / pencil-boil / latex-paper) — the foreign-tree fence HOLDS (glass-ui edits ZERO leaf tree; the asks are content-only per inv-26; each publish stays user-domain). The asks:
  - **value.js (BEAT 1):** delete the orphan keyframes.js file:link (NEW finding, T5); intra-repo unify (api/ TS6, @types/node one `^24` major, vitest 3 → 4 LOCKSTEP root+api); the v-calendar dist-tag decision (CLASS-4); the zod-4 unify BOOKED behind vee-validate (NEW-E); the vite-plugin-dts 4 → 5 probe (could delete the rootDir flatten workaround); the value.js → 1.0.0 promotion candidate (the headline — the lockstep-regime dissolve, §1). No new publish REQUIRED for the consumer spine (0.13.0 is the resolved latest); a patch republish only if the orphan-delete/intra-unify warrants a stamp.
  - **keyframes.js (BEAT 2):** DELETE `.npmrc legacy-peer-deps=true` (now unmasked — but ONLY AFTER BEAT 3/Batch-C widens the hub peer, else kf's own install re-fails; sequenced after the hub edit); clean-caret the kf-vue peer `>=4.2.0` → `^4.0.0`; possibly delete the value.js-0.12.0 serializer fold (VERIFY value 0.13.0's serializer emits the canonical space-joined form first); harden the cross-realm `as any` casts (non-blocking successor).
  - **pencil-boil (BEAT 0):** TS5 → 6 + lockfile refresh; no version bump for the dep edit unless desired (consumers pin `^0.4.1` against current); the vue peer floor `^3.5.0` STAYS broad (T7).
  - **latex-paper (BEAT 4, fourier-gated):** republish 0.2.x with widened peers — `vite ^6\|\|^7` add `^8`, `katex ^0.16` add `^0.17`, `parse-that ^0.7.1` → `^0.9.0` (NEW-F). A fourier PREREQUISITE — fourier cannot reach vite-8/katex-0.17/single-parse-that until it lands.
- **Hard gate:** `proof:constellation-spine` reads the leaf manifests (present-on-disk) — every leaf's spine row turns GREEN as the leaf modernizes. No glass-ui gate edit beyond the cross-reference. The leaf publishes are USER-DOMAIN.
- **Execution boundary:** DRIVEN/COORDINATED under the user's "every repo, no exceptions" authorization; each leaf publish stays user-domain. colors is the RETIRE decision (T6), not a publish.

### W-CONSUMER-MODERNIZE — the consumer modernization (BEAT 5; fourier · speedtest · sci-report; slides via W-SLIDES-DRIVE)

- **Charge:** record the per-consumer coherent-set adopt + the 6-major build-spine lift + the per-consumer e2e/visual sweep obligation (the gate locks the SPINE; the surface needs the sweep, §6). The asks (each a recorded BOOK — the consumer applies in ITS tranche, inv-16; DRIVEN/COORDINATED under the user's authorization; each publish/deploy stays user-domain):
  - **speedtest:** glass-ui `^3.10.0` → `^4.0.0` + kf → `^4.3.0` + value → `^0.13.0` (all three LOCKSTEP) + the 61-site e2e/visual sweep + the vite.config fossil-prose re-derivation (the largest cleanup surface, T4) + re-caret vue/vue-router (NEW-G) + eslint 9 → 10/retire eslint-config-google (NEW-D) + vue-sonner 1 → 2 + @vueuse `^14.2.1` → `^14.3.0` + the @types/node split collapse onto `^24`.
  - **sci-report (the named Atlas):** glass-ui `^3.12.0` → `^4.0.0` (the 2 API-break migrations T4 — `useRouteTransition` removed, `supportsViewTimeline` off-surface) + value → `^0.13.0` (GATED on Batch C) + kf → `^4.3.0` + vite/TS/vue-tsc trio + pinia union-collapse (CLASS-1) + vue-router 4 → 5.
  - **fourier (gated on BEAT 4 latex-paper):** glass-ui `^3.1.0` → `^4.0.0` (UnderlineTabs 3 sites + lucide-vue-next 35 sites, T4/NEW-A) + value → `^0.13.0` + kf `^2.2.0` → `^4.3.0` + vite-8 (latex-paper-gated) + TS6/vue-tsc3 + pinia 3 + vue-router 5 + katex 0.17 (latex-paper-gated) + the 3 dist-tag pins (CLASS-4) + the 3 dead-dep prunes (NEW-B).
- **Hard gate:** `proof:constellation-spine` reads the consumer manifests + the per-consumer e2e/visual sweep is the SURFACE lock (the binding-verification memo — vue-tsc+units MISS runtime-visual breaks). The consumer publishes/deploys are USER-DOMAIN.

---

## §A3 — THE W-PEER-SPINE RECONCILIATION (no double-count, no orphan)

`BB.W-PEER-SPINE` (Batch 5, the narrow value `^0.12`/`^0.13` peer-optional widen) is SUPERSEDED by **W-SPINE-LATEST (Batch C)** — the clean-break `^0.13.0` IDENTITY + the kf union collapse + the T1 deletions, the keystone hub edit. The reconciliation, recorded so the arithmetic is unambiguous:

- **The Batch 5 W-PEER-SPINE ROW becomes a back-pointer to Batch C W-SPINE-LATEST** (the hub edit MOVED earlier — the value-peer-widen is the foundation the Batch P/V feature work needs, so it is pre-Batch-0, not a late Batch 5). The PROGRESS row + the EXECUTION-DAG node re-point; no NET wave is removed (the work is the same; the placement moved + generalized).
- **The narrow `proof:peer-optional` spine-arm RECONCILES into `proof:constellation-spine` clause 1** (the value-peer == kf-value-dep IDENTITY check). `proof:peer-optional`'s four OPTIONALITY witnesses stay GREEN (the widen is range-only — value.js is still out of the root bundle, still optional); the spine-RANGE assert moves to the cross-repo gate (the right home — it is a fleet invariant, not a single-repo optionality fact).
- **`proof:peer-conformance` COLLAPSES (T1.1)** — its intersection model is superseded by the IDENTITY check; the stale `KEYFRAMES4_VALUE_DEP`/`PINNED_LATEST` constants DELETE. W-ADOPT-RECONCILE's booked "reconcile the stale conformance constant" is DISCHARGED by the collapse (no longer a Batch-5 book — it lands in Batch C's W-SPINE-LATEST atomic with the bump).

**Arithmetic (recorded for EXECUTION-DAG §6):** Batch C adds **3 net-new waves** (W-SPINE-LATEST, W-SPINE-CONSTELLATION, W-SPINE-LEDGER). Batch 5 adds **2 net-new waves** (W-LEAF-MODERNIZE, W-CONSUMER-MODERNIZE) and CONVERTS W-PEER-SPINE into a back-pointer (no longer a standalone count — its work moved to W-SPINE-LATEST). Net: **+3 (Batch C) + 2 (Batch 5 new) − 1 (W-PEER-SPINE folded) = +4 waves.** 64 → **68.** (W-ADOPT-RECONCILE / W-LINEAGE-PROBE / W-SLIDES-DRIVE / W-CROSSREPO-ASKS are GENERALIZED in place — extended scope, not new rows.)

---

## §A4 — THE DEPENDENCY ORDER (the safe modernization sequence + publish beats)

Leaves first, so consumers adopt a coherent set. CASCADING bumps flagged (a leaf republish forces a consumer re-pin). This is the spine of Batch C → Batch 5.

```
BEAT 0  (no-publish prep)     parse-that · pencil-boil · colors-RETIRE-decision         [W-LEAF-MODERNIZE prep]
BEAT 1  (leaf republish)      value.js → 0.13.x (already latest; +orphan-delete +intra-unify)  [W-LEAF-MODERNIZE]
BEAT 2  (leaf republish)      keyframes.js → 4.3.x (deps value ^0.13; +.npmrc delete AFTER BEAT 3)  [W-LEAF-MODERNIZE]
BEAT 3  (HUB — the keystone)  glass-ui → 4.1.0 peer-widen + gate collapse/re-enumerate   [Batch C: W-SPINE-LATEST]
BEAT 4  (leaf, fourier-gated) latex-paper → 0.2.x widened peers                           [W-LEAF-MODERNIZE]
BEAT 5  (consumers adopt)     fourier · slides · speedtest · sci-report                   [W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE]
```

**The beats in detail:**
- **BEAT 0** — parse-that already `^0.9.0` everywhere (no edit; the dual-installs collapse downstream of value.js). pencil-boil TS5 → 6 + lockfile refresh (no version bump needed for the dep edit). colors: the RETIRE decision (T6) — no publish.
- **BEAT 1 — value.js (LEAF).** Already published 0.13.0 (the coherent latest). BB work: delete the orphan keyframes.js file:link; intra-repo unify; v-calendar decision; zod-4 BOOKED behind vee-validate. No new publish REQUIRED for the consumer spine; a patch republish only if the orphan-delete warrants a stamp.
- **BEAT 2 — keyframes.js (LEAF).** Already 4.3.0 deps value `^0.13.0`. BB work: DELETE `.npmrc legacy-peer-deps` (sequenced AFTER BEAT 3 — kf's own install re-fails until the hub peer widens); clean-caret the kf-vue peer; the serializer-fold verify.
- **BEAT 3 — glass-ui (THE HUB / keystone, Batch C W-SPINE-LATEST).** The load-bearing edit the whole constellation waits on. Per BB §4 (USER-DECIDED fold-all → ONE 4.1.0), the peer-widen lands INSIDE BB and ships at the single **4.1.0** cut (NO interim 4.0.1). Per BB invariant 11 (no out-of-band lineage publish) + the 4.0.0-published lesson ([[project_glassui_400_published]] — the close MUST run `--run release`, not `--run local`: a build blocker + 6 gate drifts surfaced only at tag-push last time), the publish originates from a master-ancestor commit through the gated `release.sh` path. The user owns the irreversible publish leg.
- **BEAT 4 — latex-paper (LEAF, fourier-gated).** Republish 0.2.x widened peers (NEW-F). Sequenced before fourier's adopt, after the hub (so it builds against the coherent spine).
- **BEAT 5 — the consumers adopt** (parallelizable once BEAT 3 lands): slides (W-SLIDES-DRIVE, driven), speedtest/sci-report/fourier (W-CONSUMER-MODERNIZE books, DRIVEN/COORDINATED; each publish/deploy user-domain).

**Cascading-bump summary:**
- value 0.13.0 (BEAT 1) FORCES every consumer's direct value → `^0.13.0` + collapses the parse-that dual (cascade).
- glass-ui peer-widen (BEAT 3) UNBLOCKS kf's `.npmrc` delete + every consumer's value resolution (the keystone cascade).
- latex-paper republish (BEAT 4) UNBLOCKS fourier's vite-8/katex-0.17 (single-consumer cascade).
- The IRREDUCIBLE non-cascade: @vueuse-10-via-vaul-vue persists through every beat (CLASS-2 booked successor).

---

## §A5 — THE EXECUTION BOUNDARY + THE FENCES

- **glass-ui — DIRECT.** The hub edits (W-SPINE-LATEST peer-widen, the gate collapse/re-enumerate, the doc fold, the BEAT-3 publish prep) land directly on the glass-ui tree under Batch C. The publish (4.1.0) is the user's irreversible leg.
- **slides — DRIVEN (W-SLIDES-DRIVE).** The canonical driven exception. BB drives the slides adopt + the 6-major spine lift; the user owns publish/deploy. The site is HELD DOWN (holding page awaiting re-publish greenlight).
- **The leaves (keyframes.js, value.js, pencil-boil, latex-paper) + the other consumers (fourier, speedtest, sci-report) — DRIVEN/COORDINATED** under the user's explicit "every repo, no exceptions" 2026-06-16 authorization (W-LEAF-MODERNIZE + W-CONSUMER-MODERNIZE). Each foreign tree is edited under the driven model; **each publish stays user-domain** (every irreversible registry/deploy leg is the user's).
- **colors — RETIRE (driven decision)** (T6), not a publish.
- **Read-only git fences (binding everywhere):** agents are read-only on git across ALL repos (never stage/commit/stash/checkout/reset/restore — the orchestrator owns the index, per K W0/AGENT_DISPATCH_TEMPLATE). The Spec phase is the ONLY writer, and ONLY under `docs/tranches/BB/`. No `npm install/update/add` during planning; read-only registry queries (`npm view`, `npm outdated --json`) + file reads only.
- **Untouched by dep work:** presets-in-consumers (named themed presets stay in consumers; the library's own default tokens are its identity) + the GL-shader fence (aurora.frag/metaball.frag byte-untouched; the value.js color-seam fence NOT widened by dep work).
- **Subagent spawns pass `model: opus` explicitly** (never inherit the session loop model — [[feedback_opus_for_subagents]]).

---

## §6 — THE GATE SHAPE: `proof:constellation-spine`

A born-RED cross-repo probe that machine-locks the coherent-latest invariant. The structural sibling of the existing cross-repo gates (`proof:webgl-substrate-single`, `proof:peer-conformance`, the kf `proof:deps-current` floor+protocol+realm gate) — scoped to the WHOLE constellation's dep manifests, not one repo's. Minted by W-SPINE-CONSTELLATION (Batch C).

### What it asserts (each born-RED on the pre-bump tree, GREEN at close)

Walking every constellation member's `package.json` (the hub + the 4 leaves + the 4 consumers, paths enumerated as gate facts — re-grounded against the present-on-disk subset, registry-default for absent members):

1. **Spine resolves to ONE coherent set.** Each shared singleton (vue/vueuse/reka/tailwind/vite/ts + the `@mkbabb` family) resolves to the SAME major across every member; no member caps a singleton below the coherent-latest floor. The dual-instance INTERSECT check (lifted from `proof:peer-conformance`'s collapse) is now an IDENTITY assertion: **glass-ui's value peer == kf's value dep floor** (T1.1) — the broken-singleton stops being a tolerated overlap.
2. **No multi-major union** — no `||` range on any `@mkbabb/*` dep/peer (catches glass-ui's kf union + any re-introduction). The app-local pinia union (sci-report) is in scope OR explicitly allowlisted as app-state (a recorded decision — the `@mkbabb` family is the binding scope; an app-local Vue-ecosystem union is the consumer's call, allowlisted with the reason).
3. **No dist-tag/star/pre-release-next** — no `latest`/`*`/pre-release-`next` on any `@mkbabb/*` OR shared-singleton range (catches fourier's 3 stars + value.js's v-calendar `next`).
4. **No stale-lineage cap on `@mkbabb/glass-ui`** — every consumer's glass-ui range admits the latest major (`^4.x`), no `^3.x`/exact-3.13.0 cap.
5. **No ancient major** — TS ≥ the fleet floor (`^6`), Vite ≥ `^8`, vue-tsc ≥ `^3` on every JS member (catches colors-TS4, the TS5/Vite7 trio).
6. **The dual-instance / registry-consumer probe** — the BB-invariant-11 probe: before any prune, probe `npm view @mkbabb/glass-ui versions/time/dist-tags` + the known-consumer constellation; a published-but-off-mainline export forces a named fold/migration line (the d6 lineage lesson made structural). Cross-references W-LINEAGE-PROBE (the PRUNE-side probe), never re-implements it.

### Tagging + lifecycle (the `proof:ba-gestalt` born-RED → promote model)

- **Born-RED** anchored to the pre-bump tree (the kf union + value cap + the 4 stale-lineage caps + the Vite7/TS5 lag all FAIL).
- **Tagged `["local"]`** so it does NOT block ci/release mid-tranche (a cross-repo gate cannot gate a single repo's release while the fleet is mid-adopt).
- **The single authorized verdict-flipper** is the Batch 5 closure (W-CONSUMER-MODERNIZE + W-SLIDES-DRIVE landing the last consumer) — it PROMOTES the gate to the operative close set when every member resolves the coherent set GREEN.

### Relationship to the existing gates + W-PEER-SPINE

- **It SUPERSEDES + simplifies `proof:peer-conformance`** — that gate's dual-range-intersection model is the FALSE-at-HEAD pin (NEW-H); T1.1 collapses it to the singleton-identity check, and `proof:constellation-spine` is the cross-repo generalization.
- **It is the cross-repo TWIN of `proof:webgl-substrate-single`/the kf `proof:deps-current` realm-convergence gate** — those prove ONE substrate/ONE parse-that realm WITHIN a repo; this proves ONE coherent spine ACROSS the fleet. Same anti-drift shape (a future agent re-introducing a union/star/stale-cap REDs the census).
- **W-SPINE-LATEST is the wave that lands the singleton fix (BEAT 3); `proof:constellation-spine` is the gate that machine-locks it stays fixed** — the gate is the durable artifact; W-SPINE-LATEST is the one-time correction. Clause-1's identity check IS the W-PEER-SPINE invariant made permanent (the broken-singleton class cannot recur unaudited).

### The honest scope note for the gate

The gate reads manifest RANGES + resolution; it does NOT exercise the glass-ui 4.0.0 API-compat against the consumers' import sites (the 61 speedtest sites, the 35 fourier lucide sites, the 2 sci-report API breaks). Those are e2e/visual-sweep obligations ([[feedback_glass_ui_binding_verification]] — stale reka/glass-ui bindings silently no-op; vue-tsc+units MISS runtime-visual breaks). The spec budgets a per-consumer e2e/visual adoption pass in BEAT 5 (W-CONSUMER-MODERNIZE) — `proof:constellation-spine` locks the SPINE; the per-consumer π/visual gates lock the SURFACE.

---

## §7 — Files of record (absolute; the load-bearing anchors)

- glass-ui `package.json` (peers confirmed on disk: kf union `:819`, value cap `:821`, dev kf `:858`, dev value `:860`, the already-latest build spine `:866-878`), `scripts/proof-peer-conformance.mjs` (`:5-22` prose, `:31-33` `PINNED_LATEST`, `:37` `KEYFRAMES4_VALUE_DEP`, `:81-91` intersect — the T1.1 collapse target), `scripts/proof-motion-suite.mjs` (`:114,119` VERSION STAMP — the T1.2 re-enumerate target), `scripts/proof-design-md-current.mjs` (the value.js-side doc-currency arm — re-confirm the scope at HEAD), `src/composables/motion/useNumericTransition.ts` (the multi-major compat comment), `docs/precepts/cross-repo-dev-resolution.md` (contract-v2 — the T5 decision basis).
- keyframes.js `.npmrc` (the legacy-peer-deps delete), `packages/keyframes-vue/package.json` (the `>=4.2.0` clean-caret), `src/animation/utils.ts` (the maybe-dead serializer fold).
- value.js `package.json` (the orphan keyframes file:link delete; the glass-ui file:link KEEP), `api/package.json` (the intra-repo TS/types/vitest split).
- fourier `web/package.json` (the 3 stars + stale caps + dead deps), `web/vite.config.ts` (Rolldown-ready).
- slides `package.json` (the 3.13.0-exact pin).
- speedtest `package.json` + `vite.config.mjs` (the fossil kf-2.2.0 chunk prose).
- sci-report `usf/web/package.json` (the `^3.12.0` Atlas cap), `src/views/GalleryView.vue` + `src/platform/composables/useScrollProgress.ts` (the 2 API breaks).
- colors `/Users/mkbabb/Programming/colors/package.json` (the RETIRE candidate).

---

*This is the path-forward synthesis for the constellation dependency-modernization band. It GENERALIZES the existing cross-repo amendment (the value.js/keyframes singleton → the whole spine) + adds the Batch C pre-BB foundation (the hub self-modernization + the born-RED `proof:constellation-spine`) + names the leaf/consumer modernization waves + the dependency-order publish beats. No implementation — tranche development only. The Spec phase wrote only under `docs/tranches/BB/`.*
