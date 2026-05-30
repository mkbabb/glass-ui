# Tranche AP — Audit Lane GAMMA — Measured Empirical State (post-AO, v3.0.0 staged)

Measured on darwin at HEAD `e3ac16d` (AO close), `package.json` version **3.0.0**. Read-only on source/git — every number below is a captured gate run on this machine, not a doc-claim relay. The two source edits visible in `git status` to `docs/tranches/F/audit/*.json` are the proof gates' own idempotent baseline re-writes triggered by running them, not lane mutations.

## 1. Gate matrix

| Gate | Command | Exit | glass-ui-internal? | Result |
|---|---|---|---|---|
| typecheck | `npm run typecheck` | **0** | yes | `vue-tsc --noEmit` clean |
| build | `npm run build` | **0** | yes | vite 0.45 s + emit-types; peak RSS **735 MiB** (770 555 904 B) — no 8 GB prefix, confirms AO drop |
| test | `npx vitest run` | **0** | yes | **45 files / 521 tests pass**, 0 fail (~2.6 s) |
| verify-export-types | `npm run verify-export-types` | **0** | yes | subpath dts publication probe clean |
| proof:resolution | `npm run proof:resolution` | **0** | yes | contract-v2 satisfied |
| proof:theme | `npm run proof:theme` | **0** | yes | theme/style proof passed |
| proof:package | `npm run proof:package` | **0** | yes | package surface proof passed |
| proof:runtime | `npm run proof:runtime` | **0** | yes | runtime smoke passed |
| proof:consumers:build | `npm run proof:consumers:build` | **0** | cross-repo | speedtest builds against built dist — PASS (7.37 s) |
| profile:budget --enforce | `npm run profile:budget -- --enforce` | **0** | yes | both gated bundles PASS (see §2) |
| **proof:consumers:static** | `npm run proof:consumers:static` | **1** | **NO — stale-worktree noise** | 78 violations, **all** under `speedtest/.claude/worktrees/` (see §4) |
| **proof:phantom-classes** | `npm run proof:phantom-classes` | **1** | **NO — consumer pending handoff** | 29 documented-pending sites, all in `fourier-analysis` (see §4) |

**Score: 10 GREEN / 2 RED.** Every glass-ui-internal gate is green. Both reds are cross-repo/consumer-domain and self-document as such — neither flags a glass-ui src/ or demo/ defect.

## 2. CSS draw + bundle reality

### The headline CSS number — confirmed

The budget gate measures the **fully-resolved consumer CSS draw** of `dist/styles/index.css` (the 17-rung cascade + the folded `../glass-ui.css` SFC scoped bundle; fonts excluded — `fonts.css` is a separate `/styles/fonts` subpath):

| Gated bundle | raw | raw cap | raw % | gzip | gzip cap | gzip % |
|---|---|---|---|---|---|---|
| `dist/styles/index.css` | 308 758 | 340 000 | 90.8% | **74 995** | 82 500 | **90.9%** |
| `dist/glass-ui.js` | 36 507 | 190 000 | 19.2% | 8 642 | 33 700 | 25.6% |

**The ~75 KiB-gzip claim from the AO close is exact (74 995).** Independent manual concat of the 17 rungs + `glass-ui.css` (fonts excluded) gzips to 72 968 — within ~2 KiB of the gate's own resolver, confirming the number is real and the fonts-exclusion is correct.

**CSS is the binding constraint at 90.9% of cap** — only ~7.5 KiB-gzip headroom. JS has vast slack (25.6%). AP additions remain CSS-bound, identical posture to AO.

### Per-rung gzip breakdown (post-consolidation, heaviest first)

| Rung | gzip | raw | Note |
|---|---|---|---|
| `tokens.css` | 22 454 | 76 123 | dominant non-font rung — the full token cascade |
| `dock.css` | 10 208 | 42 982 | heaviest component rung (post dedup) |
| `utilities.css` | 9 856 | 36 351 | `@utility` recipes |
| `glass-ui.css` (SFC bundle) | 7 818 | 43 090 | folded `<style scoped>` corpus |
| `instrument-chassis.css` | 4 789 | 15 448 | |
| `typography.css` | 4 478 | 19 550 | |
| `theme.css` | 3 913 | 19 332 | |
| `animations.css` | 2 891 | 8 804 | |
| `glass.css` | 2 599 | 10 139 | |
| `transitions.css` | 2 272 | 8 587 | |
| `drawer.css` | 2 212 | 5 353 | |
| (remaining 7 rungs) | < 1.7 KiB each | | instrument-rail, glyph-face, paper, cards, hover-popover, floating-panel, disco-glyph |

> `fonts.css` measures 103 844 gzip / 139 272 raw — base64-inlined OFL woff2 corpus — but it is the **separate** `@mkbabb/glass-ui/styles/fonts` subpath, NOT part of the `index.css` draw the gate caps. The AM-W1-α entry-path weight split is holding.

**Is the CSS settled or does it warrant more consolidation?** Three rungs carry ~58% of the non-font gzip: `tokens.css` (22.5 KiB), `dock.css` (10.2 KiB), `utilities.css` (9.9 KiB). `tokens.css` is irreducible identity (the token cascade IS the library). The genuine consolidation surface, if AP needs headroom, is `dock.css` (10.2 KiB for one component family is the outlier) and the SFC `glass-ui.css` bundle. At 90.9% the gate will trip on any non-trivial new rung — so AP is one mistake from RED, but there is no acute over-weight rung crying out for a forced pass; the AO consolidation pass landed and the cascade reads settled. Treat further consolidation as opt-in headroom-buying, not as remediation.

### Per-subpath JS sizes (uncapped, informational)

| Chunk | gzip | raw |
|---|---|---|
| `aurora.js` | 16 480 | 51 165 |
| `glass-ui.js` (root barrel) | 8 654 | 36 507 |
| `typewriter.js` | 5 644 | 19 501 |
| `dock.js` | 5 189 | 16 145 |
| `search.js` | 4 591 | 13 825 |
| `DataTable-*.js` | 4 278 | 15 335 |
| `timeline.js` | 4 127 | 14 017 |
| `carousel.js` | 3 383 | 11 938 |

`aurora.js` stays the standalone WebGL outlier (16.5 KiB-gzip) the root barrel does NOT transitively reach. None of these are gated.

## 3. The v3.0.0 staged state

- **Version: `3.0.0`** in `package.json` (confirmed).
- **CHANGELOG head: `## 3.0.0` → Major Changes** — the AO entry (self-measurement truth, CSS-architecture pass, legacy purge, speedtest-AQ consumer-gap fold). BREAKING: `useSpringOrchestrator` alias removed → `useNumericTransition`.
- **Changeset: consumed.** `.changeset/` holds only `README.md` + `config.json` — no pending `.md`. The version bump + changelog are baked; the changeset was applied.
- **dist completeness after canonical `npm run build`: COMPLETE.** 64 flat `dist/*.d.ts` + `dist/index.d.ts` present, `dist/glass-ui.js` present, 201 total dist files.
- **iter-build-is-dts-free behavior: CONFIRMED.** Running `profile:budget` (which invokes `vite.iter.config.ts`) leaves `dist/` with **0** `.d.ts` files and collapses `dist/styles/index.css` to the 6 039 B / 2 441-gzip `@import` manifest. A subsequent canonical `npm run build` restores all 64 d.ts and the full styles tree. The AO `publishStyleAssets`-shared-across-configs fix means iter-build no longer WIPES the canonical styles permanently, but iter-build still emits no dts and rewrites the styles index to the thin manifest form — so a `profile:budget` run is NOT a publishable dist. Order matters: always `npm run build` last before any publish/inspection that needs d.ts. (This audit re-ran the canonical build after `profile:budget` to restore ground truth.)

## 4. Cross-repo proof scan — quantified

### proof:consumers:static — 78 violations, 100% stale-worktree noise

| Category | Count |
|---|---|
| glass-ui-canonical (own `src/`/`demo/`) | **0** |
| real consumer `src/` (speedtest live tree, fourier, words, bbnf) | **0** |
| **`speedtest/.claude/worktrees/agent-*` stale copies** | **78** |

Every single violation is under three stale agent worktrees inside the speedtest sibling: `agent-a050c1b8ba816955a`, `agent-a677c61f98a1d5dac`, `agent-a71a6ea7bd3f20b5f`. The flagged symbols (`ScrollPane`, `DAMPING`, `SNAP_THRESHOLD`, `useAnimatedNumber`, `useDarkModeSync`) are root-barrel-import-discipline nits in throwaway agent checkouts, not the live speedtest tree.

**This is a scan-scope defect worth fixing in AP.** `scripts/proof-consumers-static.mjs` line 28 `ignoredDirs` = `{.git, .vite, dist, build, coverage, node_modules, .output, .nuxt}` — it does **NOT** exclude `.claude` or `worktrees`. The `walk()` (line 136) therefore descends into `speedtest/.claude/worktrees/agent-*/src/` and treats stale agent copies as live consumer source. Adding `.claude` (and/or `worktrees`) to `ignoredDirs` is a one-line fix that turns this gate GREEN locally with zero loss of signal — the live consumer trees are already clean.

### proof:phantom-classes — 29 sites, 100% documented-pending consumer

All 29 hits are in `fourier-analysis/web/src/` (retired classes `glass-subtle`, `glass-medium`, `glass-elevated`, `cartoon-card`, `shadow-cartoon`). The gate's own output: *"glass-ui src/+demo/ and the non-pending consumers are CLEAN."* These are the Q.W4 Lane F un-applied migration patch (`docs/tranches/Q/audit/W4-Lane-F-fourier.patch`) awaiting the fourier team's handoff. `PROOF_PHANTOM_ALLOW_PENDING=1` greens it glass-ui-side; never wired into CI.

### CI reality — refining the AO claim

The AO close said the two reds are "entirely consumer-domain + absent from CI." **Measured verdict: the consumer-domain half is CONFIRMED; the "absent from CI" half needs the precise mechanism.** Both gates ARE wired into `ci.yml` (proof:consumers:static line 54, proof:phantom-classes line 73) and DO run every PR. They pass in CI because the sibling consumer repos do not exist on the GitHub Actions runner, and both scripts guard absent roots with `existsSync` (consumers-static `walk()` line 137; phantom-classes line 317 `if (!existsSync(root)) continue`). So in CI:

- **proof:consumers:static** scans only glass-ui-resolvable roots → no `.claude/worktrees` → GREEN.
- **proof:phantom-classes** sweeps only glass-ui `src/`+`demo/` → no fourier → GREEN.

So neither red can ever fail CI from these causes — they are **local-only reds driven entirely by the developer's sibling-repo working state** (a stale speedtest worktree; an un-applied fourier patch). The AO close's substantive claim holds: nothing glass-ui owns is broken.

## 5. Stray / dirty tree

| Item | State | Disposition |
|---|---|---|
| `docs/precepts` submodule | dirty: `M cross-repo-dev-resolution.md`, `?? canonical-readme-shape.md`, `?? cross-repo-dev-iteration.md`; at `f27627e` | uncommitted submodule WIP — out of glass-ui's commit scope, owned by precepts repo |
| `ao-gamma-demo.jpeg` (92 KB) | untracked | stray AO-lane screenshot — delete |
| `muster-*.jpeg` ×7 (~1.9 MB total) | untracked | stray design-pass screenshots — delete |
| `build_time.txt`, `emit_time.txt` | untracked | stray AO timing scratch files — delete |
| `docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md` | `M` tracked | AO-era edit, presumably intentional |
| `docs/tranches/F/audit/*.json` ×5 | `M` tracked | **gate self-writes from THIS audit run** (consumers-static, consumers-build, runtime-smoke, package, theme baselines) — idempotent, expected |
| `docs/tranches/K/audit/W4-*.{json,md}` | `M` tracked | budget-profile self-writes |

**Cleanable:** the 8 stray root files (7 jpegs + 2 txt + ao-gamma-demo = ~2 MB of screenshots/scratch) should be removed or gitignored. The precepts submodule WIP is the precepts repo's business. The `docs/tranches/*/audit/*.json` modifications are gate artifacts, not lane edits — they re-write to identical-or-current baselines whenever the proofs run.

## Verdict — broken vs environmental

- **Genuinely broken in glass-ui: nothing.** 10/12 gates green; the 2 reds touch zero glass-ui src/demo source.
- **proof:consumers:static RED** is environmental (stale speedtest `.claude/worktrees`) AMPLIFIED by a real scan-scope defect — `ignoredDirs` should exclude `.claude`/`worktrees`. Fixable in AP, one line, no signal loss.
- **proof:phantom-classes RED** is purely environmental — an un-applied fourier-analysis migration patch (cross-repo handoff). Not a glass-ui defect; `PROOF_PHANTOM_ALLOW_PENDING=1` is the documented escape.
- **CSS draw is real and tight: 74 995 gzip = 90.9% of cap.** Settled post-AO-consolidation; no acute over-weight rung, but ~7.5 KiB-gzip from breach.
- **Most surprising finding:** both "RED" gates are actually wired INTO CI and run every PR — they pass there only because the consumer sibling repos are absent on the runner (`existsSync` guards skip them). The reds are a pure artifact of the local developer's sibling-repo working state, NOT gates excluded from CI. The AO "absent from CI" phrasing undersells this: they run, they're just structurally unfailable from the consumer-domain causes.
