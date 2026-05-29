# Tranche AO — Audit Lane GAMMA — Empirical State at HEAD

**Scope: what builds/typechecks/proves GREEN at glass-ui 2.1.0 (commit `4869b74`), the real bundle-budget headroom, the dts-build cost, and drift vs the AN FINAL's claims.**

Read-only on source/git. No source mutated (`git status -- src/ styles/` clean). All numbers measured on this machine at HEAD.

## Gate table

| Gate | Command | Exit | Number | HOLD / DRIFT |
|---|---|---|---|---|
| typecheck | `npm run typecheck` | 0 | `vue-tsc --noEmit` clean | HOLD |
| build | `npm run build` (8 GB heap prefix) | 0 | **6.9 s total** (vite ~0.8 s + emit-types ~6 s); peak RSS ≈ 769 MB | HOLD (build green) — see DRIFT-1 on the 8 GB claim |
| dist d.ts count | `ls dist/*.d.ts` | — | **64** flat `.d.ts` | HOLD |
| dist total files | `ls dist` | — | 201 | HOLD |
| proof:theme | `npm run proof:theme` | 0 | theme/style proof passed | HOLD (AN gate 2 now empirically MET) |
| verify-export-types | `npm run verify-export-types` | 0 | all export targets + type resolutions valid | HOLD (AN gate 9 now empirically MET) |
| proof:resolution | `npm run proof:resolution` | 0 | contract-v2 satisfied across constellation | HOLD (AN gate 9/10 now empirically MET) |
| proof:package | `npm run proof:package` | 0 | package proof passed | HOLD |
| profile:budget --enforce | `npm run profile:budget -- --enforce` | 0 | both bundles PASS (see headroom below) | HOLD (AN gate 3/9 now empirically MET) |
| demo boot | `npm run dev` | ready 242 ms; HTTP 200; **0 console errors** | settled render clean (dock caps, brand font, glass blur, aurora hero all apply) | HOLD |
| registry version | `npm view @mkbabb/glass-ui version` | — | **2.1.0** (matches local `package.json`); tarball 639 files / 1.93 MB unpacked | HOLD |

**AN FINAL MET-pending-orchestrator-build rows (gates 1, 9, 10) are now empirically MET.** Every build/proof gate is GREEN at HEAD. No gate the AN FINAL claims green is actually red.

## Headline 1 — Bundle-budget headroom (the single most constraining number for AO)

The budget gate enforces only the two aggregate bundles. Per-subpath chunks are reported but **not** capped.

| Bundle | raw | raw cap | raw % | gzip | gzip cap | gzip % |
|---|---|---|---|---|---|---|
| `dist/glass-ui.js` | 36 479 | 190 000 | 19.2% | **8 632** | 33 700 | **25.6%** |
| `dist/glass-ui.css` | 43 090 | 48 000 | 89.8% | **7 805** | 8 650 | **90.2%** |

- **CSS is the binding constraint at 90.2% gzip (7805 / 8650) — only ~845 B gzip / ~4.9 KiB raw of headroom.** This is the same number the AN FINAL recorded (no drift). AO is near-breach on CSS: any new token block, glass rung, or utility recipe must be paid for by removing equivalent CSS, or the gate breaks. The JS bundle, by contrast, has enormous headroom (25.6% gzip), so AO additions are CSS-bound, not JS-bound.
- Largest per-subpath chunks (uncapped, informational): `aurora.js` 50.5 KiB / 16.5 KiB-gzip, `typewriter.js` 19.5 / 5.67, `dock.js` 16.1 / 5.23, `DataTable` 15.3 / 4.28, `timeline.js` 14.0 / 4.15. None is gated; the per-subpath split is for consumer sizing, not enforcement.

## Headline 2 — dts-build cost (the 8 GB workaround is RETIREABLE, not load-bearing)

**DRIFT-1 (documentation, high-signal for AO).** CLAUDE.md §Build still states the build invokes `vite-plugin-dts` → `api-extractor` per library entry with `rollupTypes: true`, that the 42-entry matrix walk peaks at ≈6.7 GB RSS, and that the 8 GB `NODE_OPTIONS=--max-old-space-size=8192` bump is the "documented baseline" needed to clear Node's 4 GB default heap. **This is stale.** At HEAD:

- `vite-plugin-dts` and `api-extractor` are **gone** — no longer in `package.json` deps, and `vite.config.ts` (lines 148–155) documents the deliberate retirement: dts is emitted out-of-band by `vue-tsc --project tsconfig.build.json` (the `emit-types` script, second half of `build`), explicitly because vite-plugin-dts's bundled api-extractor TS pin drifted and "dominated build time (~62% of the ~2½min build)."
- Measured cost at HEAD: full `npm run build` = **6.9 s** (vite arm ~0.8 s, 2415 modules; emit-types arm ~6–8 s standalone). The dts arm peak RSS measured standalone is **≈ 699 MB** — well under Node's default 4 GB heap.
- **Conclusion: the 8 GB heap bump is no longer load-bearing.** The dominant 6.7 GB allocator the CLAUDE.md text cites (api-extractor) no longer exists in the toolchain. `build` still carries the `--max-old-space-size=8192` prefix, but it is dead weight — `emit-types` (vue-tsc) peaks under 1 GB. AO can retire the prefix and rewrite the CLAUDE.md §Build paragraph to describe the actual `vue-tsc` out-of-band emit. The build is also ~20x faster than the "~2½min" the stale text implies (6.9 s vs ~150 s).

## Headline 3 — Drift summary

- **DRIFT-1 (above):** CLAUDE.md §Build is stale on the dts toolchain (api-extractor / vite-plugin-dts / 6.7 GB / 8 GB-required). The real toolchain is `vue-tsc`, ~700 MB peak, 8 GB prefix dead. The vite.config.ts comment already documents the truth; CLAUDE.md was never resynced. This is the one substantive drift AO should fix.
- **No GREEN→RED drift.** Every gate the AN FINAL marks MET or MET-pending-orchestrator-build is empirically GREEN at HEAD (exit 0 across typecheck, build, proof:theme, verify-export-types, proof:resolution, proof:package, profile:budget --enforce).
- **CSS budget — no numeric drift.** Re-measured 90.2% gzip, identical to the AN FINAL's 7805/8650. The near-breach is real and persistent.
- **Demo — no drift.** The transient broken render the user saw earlier is not present in the settled state. Clean boot (242 ms), HTTP 200, zero console errors, all visual layers (vertical dock rail with glyph caps, horizontal nav dock pill, Plus Jakarta Sans brand font, glass blur, aurora gradient hero) apply.

## Two most important empirical facts for AO planning

1. **CSS budget headroom is ~845 B gzip (90.2% of cap).** AO is CSS-bound. New visual canon must be CSS-neutral or pay its own way by deleting dead CSS. JS has ~10 KiB gzip of slack — additions there are cheap.
2. **The 8 GB dts workaround is retireable.** The build is `vue-tsc`-based, ~7 s, <1 GB peak; the api-extractor/6.7 GB rationale in CLAUDE.md §Build is stale. AO can drop the `--max-old-space-size=8192` prefix and resync the doc.

## Authority / evidence
- Measured at commit `4869b74`, glass-ui 2.1.0, on darwin.
- Build toolchain truth: `vite.config.ts:148–155` (out-of-band vue-tsc dts comment); `package.json` `build` + `emit-types` scripts.
- Budget caps + headroom: `npm run profile:budget -- --enforce` output (iter-build).
- Baseline claims audited: `docs/tranches/AN/FINAL.md` §8 gate table; CLAUDE.md §Build.
