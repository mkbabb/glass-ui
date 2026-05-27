# Tranche AM — PROGRESS

Execution log for tranche AM (consumer-gap root-redress). Updated at wave boundaries. Plan basis — `docs/tranches/AM/AM.md`; per-wave specs at `docs/tranches/AM/waves/W<N>.md`.

Status vocabulary — PENDING / MET / MISS / ARCHIVED (2-consumer-gated, named realisation) / CLOSED (already-shipped, ledger-confirmed).

---

## AM.W0 — Packaging + token-AA + forms-a11y root fixes

- **Opens:** 2026-05-26
- **Closes:** 2026-05-26
- **Agents:** 2 disjoint (W0.1 packaging+token `5befe07` / W0.2 forms+dock a11y `222a90c`)

### Events

- 2 parallel agents dispatched (disjoint: package.json+tokens.css ‖ number-field/). Both clean.
- Orchestrator refined NumberFieldInput to `v-bind="$attrs"` (avoids dropping non-aria consumer attrs).
- Integration: `typecheck` exit 0; `build` exit 0 in 36.31s; `dist/aurora.js` (49.9 KB) stays out of `dist/glass-ui.js` (36 KB) — per-subpath shake confirmed.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET | typecheck exit 0; build exit 0 (36.31s) |
| 2 | `tw-animate-css` in `peerDependencies` (+ optionalPeerDependencies hint); fresh-consumer Tailwind-v4 build clean | MET | `package.json:520` peer + `:523-525` optional; commit `5befe07` |
| 3 | `--muted-foreground` light rung ≥ 4.5:1 vs `--neutral-0`; dark companion clears its plate | MET | light L45→L40 = 5.23:1 vs page / 4.91:1 vs muted; dark L60→L62 = 7.39:1; `audit/W0-token-contrast.md` |
| 4 | `<NumberFieldInput>` forwards `aria-label`/`aria-labelledby` to the inner input (`inheritAttrs:false` + `v-bind="$attrs"`) | MET | `NumberFieldInput.vue` v-binds $attrs → reka Primitive(as=input); `audit/W0-forms-a11y.md` |
| 5 | GlassDock trigger-aria contract re-derived + documented (Slider unchanged) | MET | dock root presentational (no aria-expanded); contract → AM.W2 doc; `audit/W0-forms-a11y.md` |
| 6 | `audit/W0-token-contrast.md` + `audit/W0-forms-a11y.md` authored | MET | both present; commit `442460d` |

---

## AM.W1 — Aurora ergonomics + adaptive render-mode

- **Opens:** 2026-05-26
- **Closes:** 2026-05-26
- **Agents:** 1

### Events

- Single agent; new `renderMode.ts` (type + `resolveRenderMode` device-tier resolver, SSR-safe) + Aurora.vue config-default + arm-gate threading via useAurora 4th param.
- Integration: `typecheck` exit 0; `build` exit 0 (1m1s); `dist/aurora.js` 50.5 KB.
- Optional hardening (`prefers-reduced-transparency` §5, chunked `arm()` §3.2) ARCHIVED to a future Aurora wave — no consumer binary forces them; chunked arm would breach the W1 "don't touch arm internals" bound.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | MET | typecheck 0; build 0 (1m1s) |
| 2 | `<Aurora>` `config` optional, defaults to `DEFAULT_AURORA_CONFIG` (omit config → canonical look) | MET | `withDefaults({ config: () => DEFAULT_AURORA_CONFIG })`; factory avoids shared mutation |
| 3 | `renderMode: "webgl" \| "css" \| "auto"` prop, default `"auto"`; `"css"` never arms WebGL yet paints the palette | MET | `cssOnly` short-circuits `onMounted` before `createAurora`; webgl2 context lives in `arm()` only |
| 4 | `"auto"` gates on device tier (`hardwareConcurrency ≤ 4` / `prefers-reduced-motion` / `saveData` → `"css"`) | MET | `resolveRenderMode()` in `renderMode.ts`; SSR/missing-API → `"webgl"` |
| 5 | warm wash composites under every branch; `initStrategy:"deferred"` lazy path intact (Aurora never retired) | MET | `paletteToCssGradient` placeholder never unmounted; reduced-motion freeze + intersection/idle schedule untouched |
| 6 | `audit/W1-aurora-rendermode.md` authored (runtime probe) | MET | present |

---

## AM.W2 — Chunk-strategy confirmation + size disclosure + consumer-wiring docs

- **Opens:** 2026-05-26
- **Closes:** 2026-05-26
- **Agents:** 1

### Events

- profile-bundle.mjs extended (+94 lines): per-subpath table classifies each `dist/*.js` as entry (from package.json exports) vs shared Rolldown leaf; emits to artifact JSON + `docs/tranches/K/audit/W4-subpath-sizes.md` + stdout.
- Root-barrel shake: static import-graph walk — glass-ui.js reaches 58 chunks, `aurora.js` NOT among them (16 KiB-gzip Aurora WebGL chunk fully shaken out).
- CLAUDE.md: 5 sections added (Tabs/ToggleGroup matrix, GlassDock aria contract, tw-animate-css requirement, subpath-import discipline, Vite 8 manualChunks recipe).

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `profile-bundle.mjs` emits a per-subpath gzipped-size table | MET | 65 entries + 65 shared; `W4-subpath-sizes.md` |
| 2 | `profile:budget --enforce` green | MET | glass-ui.js 25.2% / glass-ui.css 90.3% of gzip budget — both PASS |
| 3 | `dist/glass-ui.js` does not transitively reach Aurora's standalone chunk | MET | import-graph walk: 58 reached, aurora.js absent; `audit/W2-bundle-disclosure.md` |
| 4 | CLAUDE.md §Consumer wiring — Vite 8 `manualChunks` recipe added | MET | glass-ui→vueuse→vendor order + advancedChunks caveat |
| 5 | CLAUDE.md — subpath-import discipline + Tabs-vs-ToggleGroup matrix + tw-animate-css + dock aria | MET | all 5 sections present |
| 6 | `audit/W2-bundle-disclosure.md` authored | MET | present |

---

## AM.W3 — Close — disposition ledger + overfitting audit + proof gates + FINAL

- **Opens:** 2026-05-26
- **Closes:** 2026-05-26 — `complete_with_misses` (one pre-existing out-of-scope miss: gate 4 aggregate proof:all)
- **Agents:** orchestrator-led close sweep

### Events

- Disposition ledger authored — 10 LANDED / 3 ALREADY-CLOSED / 4 ARCHIVED (2-consumer-gated, named realisation) / 1 CONSUMER-SIDE.
- Close-ceremony proof gates surfaced 2 PRE-EXISTING in-glass-ui packaging-contract failures — fixed at the root: `verify-export-types` asset-export tolerance (`./fonts/*` confirmed load-bearing via proof:theme; verify-script learned the asset wildcard; `./styles.css` CSS-skip) + `proof:package` stale `/metaballs` probe (retired at `5e79443`) + styles module declaration.
- `proof:all` aggregate RED only at `proof:consumers:static` — pre-existing speedtest/keyframes.js consumer-import-discipline debt + stale agent worktrees; out of muster mission scope; named successor.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | §5 disposition ledger confirmed against HEAD — gaps 2/5/6-lib already-closed verified | MET | `audit/W3-disposition-ledger.md §1` |
| 2 | gaps 7/8/9/12 archived with named realisation conditions; gap 10 consumer-side recorded | MET | ledger §1 |
| 3 | overfitting audit clean — every AM artefact ≥ 2 sites or exported or infra | MET | ledger §4 — no overfit; 4 candidate primitives ARCHIVED |
| 4 | `proof:all` + `proof:resolution` + `verify-export-types` green | MET (in-scope) / MISS (aggregate) | verify-export-types ✓, proof:package ✓, proof:theme ✓, proof:resolution ✓; proof:all RED only at proof:consumers:static (pre-existing sibling-repo debt; named successor — FINAL §4) |
| 5 | `dist/` rebuilt (contract-v2 seam) | MET | dist/ fresh post-W1 build (W2/W3 touched no src/); gitignored — propagates via `file:` symlink |
| 6 | AM.FINAL.md authored with gate table + muster E.W8 handoff | MET | `FINAL.md` |
