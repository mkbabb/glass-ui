# AM.W3 — disposition ledger (16 gaps + close-ceremony findings)

The 16 consumer gaps from `GLASS-UI-gap-matrix.md`, each dispositioned with HEAD-verified evidence, plus two packaging-contract findings the close-ceremony proof gates surfaced.

## §1 — The 16 gaps

| Gap | Disposition | Evidence (HEAD-verified 2026-05-26) |
|---|---|---|
| 15 — tw-animate-css peer | **LANDED** AM.W0 | `package.json` peerDependencies + optionalPeerDependencies carry `tw-animate-css@^1.2.5`; commit `5befe07` |
| 1 — `--muted-foreground` AA | **LANDED** AM.W0 | light `--neutral-5` L45→L40 (5.23:1 vs page / 4.91:1 vs muted); dark L60→L62 (7.39:1); `audit/W0-token-contrast.md` |
| 4 — NumberField input aria | **LANDED** AM.W0 | `NumberFieldInput.vue` `inheritAttrs:false` + `v-bind="$attrs"` → reka Primitive(as=input); `audit/W0-forms-a11y.md` |
| 3 — GlassDock aria contract | **LANDED** AM.W0 (re-derive) + AM.W2 (doc) | dock root presentational, no aria-expanded; contract documented in CLAUDE.md §Component architecture; `audit/W0-forms-a11y.md` |
| 11 — Aurora config default | **LANDED** AM.W1 | `withDefaults({ config: () => DEFAULT_AURORA_CONFIG })`; `<Aurora />` no-config renders canonical; commit `6666d25` |
| renderMode — Aurora adaptive substrate | **LANDED** AM.W1 (consumer = muster E.W2) | `renderMode: "webgl"\|"css"\|"auto"` + device-tier resolver `renderMode.ts`; `"css"` short-circuits arm gate; `audit/W1-aurora-rendermode.md` |
| 14 — per-subpath size disclosure | **LANDED** AM.W2 | `profile-bundle.mjs` per-subpath table; `W4-subpath-sizes.md`; `audit/W2-bundle-disclosure.md` |
| 16 — Vite 8 manualChunks docs | **LANDED** AM.W2 | CLAUDE.md §Consumer wiring recipe + order/advancedChunks caveat |
| 13 — Tabs vs ToggleGroup docs | **LANDED** AM.W2 | CLAUDE.md §Component architecture decision matrix |
| 6 — per-subpath chunk strategy | **ALREADY-CLOSED** (lib) + **LANDED** (docs) AM.W2 | 76-entry split shakes Aurora's 49.9 KB out of `dist/glass-ui.js` (reaches 58 chunks, aurora.js absent); subpath-import discipline documented |
| 2 — DarkModeToggle aria-label | **ALREADY-CLOSED** | `src/components/custom/controls/DarkModeToggle.vue:61` binds `aria-label` + `aria-pressed`; no work |
| 5 — Badge `variant="warning"` | **ALREADY-CLOSED** | `src/components/ui/badge/index.ts:21-26` ships success/warning/info parity; no work |
| 7 — useScrollDockShrink graduation | **ARCHIVED** (1 consumer) | glass-ui has no scroll-shrink composable; value.js (the named 2nd consumer) ships no scroll-shrink pattern at HEAD. **Realisation condition**: ships in `src/composables/dom/` when a 2nd consumer materialises. muster keeps `useScrollShrink` dine-vote-private. |
| 8 — page-shell tokens | **ARCHIVED** (1 consumer) | glass-ui declares no `--page-rhythm`/`--page-gutter`/`--page-max-width`; value.js does not consume them at HEAD. **Realisation condition**: ≥ 2 consumers declaring identical page-shell rhythm. |
| 9 — `--press-lift` token | **ARCHIVED** (1 consumer) | glass-ui has no `--press-lift` (ships `--scale-press-btn` + `--lift-*`). **Realisation condition**: ≥ 2 consumers request the translate-Y press idiom. muster keeps it consumer-side at E.W7. |
| 12 — `<ChipField>` compound | **ARCHIVED** (1 consumer) | glass-ui has no chip-field primitive. **Realisation condition**: ≥ 2 consumers need the chip+field sibling pattern. muster's E.W3 `role="group"` sibling-redesign carries it in-tree. |
| 10 — pointer-tracked caustic | **CONSUMER-SIDE** | `--mouse-x`/`--mouse-y` are per-surface authoring channels with a JS pointer-move setter, not a token-first library primitive; glass-ui already publishes every depth ingredient (`--surface-tint-*`, `--glass-specular`). No library change. |

LANDED: 10. ALREADY-CLOSED: 3 (gaps 2, 5, 6-lib). ARCHIVED with realisation conditions: 4 (gaps 7, 8, 9, 12). CONSUMER-SIDE: 1 (gap 10). All 16 accounted — substrate-without-consumer-binary + zero-deferral invariants honoured (archive ≠ defer; each archive names its realisation condition).

## §2 — Close-ceremony packaging-contract findings

The AM.W3 proof gates surfaced two PRE-EXISTING release-gate failures (both predate AM; neither is a consumer gap nor an AM regression). AM is the packaging tranche, so the in-glass-ui ones are fixed at the root:

1. **`verify-export-types` rejected asset exports — FIXED.** The script blanket-forbade wildcard exports and TS-probed every subpath, so `./fonts/*` (the self-referential @font-face url() target the build resolves before base64-inlining; load-bearing at build time, confirmed by `proof:theme`) and `./styles.css` (a CSS alias) both failed. Fix: exempt trailing-`/*` asset-directory wildcards (verify the base dir exists instead) + skip `.css`-targeted exports from the TS probe. `scripts/verify-export-types.mjs`. Now green.
2. **`proof:package` probe referenced a retired subpath — FIXED.** The probe still imported `MetaballCanvas` from `@mkbabb/glass-ui/metaballs` (retired at `5e79443`, before AM) and the `@mkbabb/glass-ui/styles` CSS side-effect import lacked a module declaration. Fix: drop the metaballs import + declare the styles module in the probe's `global.d.ts`. `scripts/proof-package.mjs`. Now green.

## §3 — Out-of-scope pre-existing debt (named successor)

`proof:all` aggregate remains RED at `proof:consumers:static` — but every failure is in **sibling consumer repos**, not glass-ui or muster:

- speedtest imports `useTimer` / `ScrollingText` / `useResizeObserver` / `useTokenColor` from the root barrel instead of explicit subpaths (non-core-root-symbol violations);
- speedtest still references `@mkbabb/glass-ui/metaballs` (retired at `5e79443`) in CompleteBadge.vue + MeterColumn.vue (unknown-package-subpath);
- speedtest `styles/style.css` sources glass-ui/src directly + uses a non-canonical style path;
- keyframes.js demo imports `useTouchGate` from the root barrel;
- stale `.claude/worktrees/agent-*` copies in the speedtest repo amplify the same.

None introduced by AM; none a muster consumer gap; all predate AM (the metaballs ones broke at `5e79443`). Fixing them means editing speedtest + keyframes.js source — outside the muster mission and AM's consumer-gap scope. **Named successor**: a glass-ui-constellation consumer-import-discipline tranche (speedtest-side: migrate root-barrel imports to subpaths, drop the retired metaballs references, fix the style-path; plus a stale-worktree sweep). The in-glass-ui proof gates (`proof:package`, `proof:theme`, `proof:resolution`, `verify-export-types`) are all GREEN.

## §4 — Overfitting audit

Per `docs/precepts/audits/overfitting-audit.md` — every AM artefact has ≥ 2 sites, is exported, or is infra:

- `tw-animate-css` peer — the library's own CSS `@apply`s its utilities across ~11 components; not overfit.
- `--muted-foreground` darken — the library's own identity token, consumed library-wide; not overfit.
- NumberFieldInput aria forward — closes a real SR gap on a shipped primitive; not overfit.
- Aurora `renderMode` + `renderMode.ts` — `resolveRenderMode` is exported + used by Aurora.vue + consumed by muster E.W2; config-default helps all consumers; not overfit.
- `profile-bundle.mjs` per-subpath table — infra/profiling; not overfit.
- CLAUDE.md docs — documentation; not overfit.
- verify/proof script fixes — infra release gates; not overfit.

No overfit artefacts. AM ships no new whole primitive or subpath (the 4 candidate primitives ARCHIVED on the 2-consumer gate).
