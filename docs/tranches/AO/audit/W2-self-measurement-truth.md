# AO.W2 — Self-measurement truth + legacy purge — audit

Closes AO.W2. The budget gate measures the real consumer artifact (inv α), the dist-wipe footgun is closed (inv β), the dead 8 GB heap prefix is gone at all 6 sites with CLAUDE.md §Build resynced, and the `useSpringOrchestrator` inv-47 alias is deleted. Two file-disjoint carves (gate/build truth ‖ motion-alias delete); orchestrator-verified combined.

## D1 — the gate measures the real consumer artifact (inv α)

`scripts/profile-bundle.mjs` gained `combinedStylesDraw(distRoot)` — it resolves EVERY `@import` in `dist/styles/index.css` (the 17 sibling cascade rungs `./tokens.css` … PLUS the folded `../glass-ui.css`) and gzips the concatenation. The CSS budget key swapped from `dist/glass-ui.css` (the SFC-only false witness) to `dist/styles/index.css`.

```
[PASS] dist/styles/index.css — raw 323680 / 360000 (89.9%); gzip 80786 / 89000 (90.8%)
```

The gated number is **80786 gzip** — the fully-resolved `/styles` draw — not the 7818-gzip SFC fragment. The cascade arm (tokens.css 26 KiB, dock.css 10.7, utilities.css 10.4, …) is now inside the gated number. The interim ceiling is 89000 gzip (the measured draw + ~10% headroom); W4 re-bases it precisely post-consolidation.

## D1 verification — gate fails on a synthetic cascade-arm regression (W2 #3)

Because `profile:budget` rebuilds dist from src internally, the probe injects into SRC (a dist-side injection would be overwritten by the rebuild). Backed up `src/styles/tokens.css`, appended ~4000 high-entropy custom properties (`--ao-probe-N: hsl(N N% N%) calc(Npx + N%)`), ran the gate, restored from backup (no git):

```
[FAIL] dist/styles/index.css — raw 569100 / 360000 (158.1%); gzip 144142 / 89000 (162.0%)
profile:budget exit: 1
```

The cascade-arm regression moved the gated number 80786 → 144142 gzip and tripped the gate (exit 1). The SFC-only gate would have been blind — `tokens.css` is not in `dist/glass-ui.css`. This is the inv-α property the false witness lacked. `git diff -- src/styles/tokens.css` empty after restore.

## D2 — the dist-wipe footgun closed (inv β)

`publishStyleAssets()` moved verbatim into a shared `vite.style-assets.ts` module; both `vite.config.ts` and `vite.iter.config.ts` import it (iter-build is now canonical-minus-dts). Root cause: `emptyOutDir` defaults true and `vite.iter.config.ts` previously carried only `[tailwindcss(), vue()]`, so every iter-build (hence every `profile:budget`) wiped `dist/styles` and never recreated it.

Footgun check — after a `profile:budget` run (which calls iter-build internally):

```
dist/styles/index.css STILL PRESENT (footgun CLOSED ✓)
dist/fonts STILL PRESENT ✓
```

The AN.W7 / muster-G.W3 "re-run the canonical build last" workaround is no longer necessary.

## D3 — dead 8 GB heap prefix dropped + §Build resynced

`NODE_OPTIONS=--max-old-space-size=8192` removed at all 6 sites — `package.json` build + build:watch, `scripts/release.sh`, `.github/workflows/release.yml`, `.github/workflows/ci.yml` live-env + its stale comment. Adjacent stale-rationale comment blocks (release.sh, ci.yml) dropped for greenfield voice; the dead api-extractor lineage scrubbed from the `vite.config.ts` plugin-array comment + the `release.yml` header.

```
grep -rn 'max-old-space-size' package.json scripts/release.sh .github/  →  0 matches
```

Build under DEFAULT heap (no prefix): exit 0, **peak RSS 742260736 bytes ≈ 708 MB** — an order of magnitude under Node's ~4 GB default, confirming the prefix was dead weight for the vanished api-extractor toolchain. CLAUDE.md §Build resynced to the real `vue-tsc --project tsconfig.build.json` out-of-band dts emit (no api-extractor / vite-plugin-dts / 6.7 GB / 8 GB / "~2½min" prose).

## DELETE the inv-47 `useSpringOrchestrator` alias

`src/composables/motion/useSpringOrchestrator.ts` deleted; the `export *` dropped from `motion/index.ts`; the 3 demo sites + 2 test cases migrated to `useNumericTransition`; the v3.0-retire / @deprecated comments scrubbed in `motion.ts` + `index.ts`; and the "renamed from useSpringOrchestrator" comment in `useNumericTransition.ts:10-14` (the 9th touch the grep gate would otherwise catch) scrubbed. The alias was an identity alias (`useSpringOrchestrator = useNumericTransition`, `UseSpringOrchestratorOptions = UseNumericTransitionOptions`) so every call site was a pure symbol swap; the demo snippet's fictional `.play()/.reverse()/.snap()` corrected to the real `{ start, stop, progress, playing }`. Demo URL slug `use-spring-orchestrator` kept (inv 43, no rename).

```
grep -rn 'useSpringOrchestrator' src/         →  0 matches
grep -rn 'UseSpringOrchestratorOptions' src/  →  0 matches
```

Clean break, no replacement alias.

## Gate table

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | typecheck + build exit 0 under DEFAULT heap | MET | typecheck 0; build 0, peak RSS 708 MB |
| 2 | gate measures `dist/styles` (~80.8 KiB), not the SFC fragment | MET | `[PASS] dist/styles/index.css — gzip 80786/89000` |
| 3 | gate fails-on-synthetic-cascade-regression | MET | tokens.css probe → 144142 gzip, FAIL exit 1; restored clean |
| 4 | gate passes-on-HEAD | MET | 90.8%, exit 0 |
| 5 | dist-wipe footgun closed | MET | dist/styles + dist/fonts present after profile:budget |
| 6 | heap-prefix grep = 0 | MET | 0 matches at the 6 sites |
| 7 | alias grep = 0 + demo/tests migrated + typecheck | MET | 0 matches; typecheck 0 |

All 7 MET. W2 closes.
